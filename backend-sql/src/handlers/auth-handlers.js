/**
 * Authentication and User Management Handlers
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../db/database');
const { checkAdminActor, checkAuthenticatedActor, sanitizeUserRecord, sanitizeUserRows, requireAuthenticatedActor, checkAdminPermissionsAuthoritative, sanitizeUserRecordForClient, isAdminUser } = require('../middleware/auth-guard');
const {
    createMfaChallenge,
    isMfaEnabledForUser,
    resolveMfaSecretCandidates
} = require('./mfa-handlers');

function sha256(str) {
    return crypto.createHash('sha256').update(String(str || ''), 'utf8').digest('hex');
}

function normalizeStoredPasswordHash(raw) {
    if (raw == null || raw === '') return '';
    if (typeof raw === 'object') {
        if (raw.value != null) return String(raw.value).trim();
        const values = Object.values(raw);
        if (values.length === 1 && values[0] != null) return String(values[0]).trim();
        return '';
    }
    const s = String(raw).trim();
    if (!s || s === '***' || s.toLowerCase() === 'null' || s.toLowerCase() === 'undefined') return '';
    return s;
}

function isSha256Hex(value) {
    return /^[a-f0-9]{64}$/i.test(String(value || '').trim());
}

function passwordsMatch(password, user) {
    const plain = String(password || '').trim();
    const storedHash = normalizeStoredPasswordHash(user && user.passwordHash);
    const storedPlain = String((user && user.password) || '').trim();
    const inputHash = plain ? sha256(plain) : '';

    if (isSha256Hex(storedHash) && inputHash && storedHash.toLowerCase() === inputHash.toLowerCase()) {
        return true;
    }
    if (isSha256Hex(storedPlain) && inputHash && storedPlain.toLowerCase() === inputHash.toLowerCase()) {
        return true;
    }
    if (plain && storedPlain && storedPlain !== '***' && !isSha256Hex(storedPlain) && plain === storedPlain) {
        return true;
    }
    return false;
}

const authHandlers = {
    'login': function(payload, postData, action) {
        const data = (payload && (payload.email || payload.password || payload.passwordHash))
            ? payload
            : (postData && (postData.email || postData.password || postData.passwordHash) ? postData : (payload?.data || postData?.data || {}));
        const email = String(data.email || '').trim().toLowerCase();
        const password = String(data.password || '').trim();

        if (!email) {
            return { success: false, message: 'البريد الإلكتروني مطلوب', errorCode: 'EMAIL_REQUIRED' };
        }
        if (!password && !normalizeStoredPasswordHash(data.passwordHash)) {
            return { success: false, message: 'كلمة المرور مطلوبة', errorCode: 'PASSWORD_REQUIRED' };
        }

        const db = getDatabase();
        const users = db.readSheet('Users');
        if (!Array.isArray(users) || users.length === 0) {
            return {
                success: false,
                message: 'تعذر قراءة حسابات المستخدمين من الخادم. يرجى المحاولة لاحقاً.',
                errorCode: 'USERS_UNAVAILABLE'
            };
        }
        const user = users.find(u => String(u.email || '').trim().toLowerCase() === email);

        if (!user) {
            return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة', errorCode: 'INVALID_CREDENTIALS' };
        }

        const activeVal = user.active;
        const isInactive = activeVal === false || activeVal === 'false' || activeVal === 'FALSE'
            || activeVal === 'inactive' || activeVal === '0' || activeVal === 0;
        if (isInactive) {
            return { success: false, message: 'هذا الحساب معطل. يرجى مراجعة المسؤول.', errorCode: 'ACCOUNT_DISABLED' };
        }

        const providedHash = normalizeStoredPasswordHash(data.passwordHash);
        const match = passwordsMatch(password, user) ||
            (isSha256Hex(providedHash) && isSha256Hex(normalizeStoredPasswordHash(user.passwordHash))
                && providedHash.toLowerCase() === normalizeStoredPasswordHash(user.passwordHash).toLowerCase());

        if (!match) {
            return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة', errorCode: 'INVALID_CREDENTIALS' };
        }

        // تنظيف جلسة SESS_* القديمة من Excel/استيراد — لا تحجب دخولاً جديداً
        const staleSid = String(user.activeSessionId || '').trim();
        if (staleSid.startsWith('SESS_') || (user.isOnline === 'TRUE' && staleSid && !staleSid.startsWith('SES_'))) {
            try {
                db.updateRow('Users', 'id', user.id, {
                    isOnline: 'false',
                    activeSessionId: ''
                });
                user.isOnline = 'false';
                user.activeSessionId = '';
            } catch (_) {}
        }

        // Parse permissions if stored as JSON string
        let perms = user.permissions;
        if (typeof perms === 'string') {
            try { perms = JSON.parse(perms); } catch (_) { perms = []; }
        }

        const now = new Date().toISOString();
        const sessionId = 'SES_' + crypto.randomBytes(16).toString('hex');

        // MFA: كلمة المرور صحيحة — اطلب TOTP قبل إكمال الجلسة
        if (isMfaEnabledForUser(user)) {
            const secretEncLogin = String(user.mfaSecretEnc || '').trim();
            const secretCandidates = resolveMfaSecretCandidates(secretEncLogin);
            if (!secretEncLogin || !secretCandidates.length) {
                return {
                    success: false,
                    message: 'حسابك يتطلب مصادقة ثنائية لكن كود التفعيل غير مكتمل. يرجى التواصل مع مدير النظام.',
                    errorCode: 'MFA_SECRET_CORRUPT'
                };
            }
            const challengeToken = createMfaChallenge(email, user);
            if (!challengeToken) {
                return { success: false, message: 'تعذر بدء خطوة المصادقة الثنائية. حاول لاحقاً.' };
            }
            return {
                success: true,
                mfaRequired: true,
                challengeToken,
                message: 'مطلوب رمز المصادقة الثنائية'
            };
        }

        // Update presence / lastLogin (بعد اجتياز MFA أو بدون MFA)
        try {
            db.updateRow('Users', 'id', user.id, {
                lastLogin: now,
                lastPresenceAt: now,
                isOnline: 'true',
                activeSessionId: sessionId
            });
        } catch (_) {}

        const sanitizedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'user',
            department: user.department || '',
            employeeCode: user.employeeCode || '',
            permissions: perms || [],
            photo: user.photo || '',
            activeSessionId: sessionId,
            lastLogin: now
        };

        return {
            success: true,
            message: 'تم تسجيل الدخول بنجاح',
            user: sanitizedUser,
            userData: sanitizedUser,
            token: sessionId,
            sessionToken: sessionId
        };
    },

    'changePassword': function(payload, postData, action, actorUserData) {
        const gate = requireAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload || postData || {};
        const oldPassword = data.oldPassword || '';
        const newPassword = data.newPassword || '';

        if (!newPassword || newPassword.length < 6) {
            return { success: false, message: 'كلمة المرور الجديدة يجب ألا تقل عن 6 أحرف', errorCode: 'PASSWORD_TOO_SHORT' };
        }

        const user = gate.sheetUser;
        const oldHash = sha256(oldPassword);
        const storedHash = user.passwordHash || (user.password ? sha256(user.password) : '');
        const oldMatch = (oldPassword && user.password && oldPassword === user.password) ||
            (oldHash && storedHash && oldHash === storedHash);

        if (!oldMatch) {
            return { success: false, message: 'كلمة المرور الحالية غير صحيحة', errorCode: 'INVALID_OLD_PASSWORD' };
        }

        const newHash = sha256(newPassword);
        const db = getDatabase();
        db.updateRow('Users', 'id', user.id, {
            passwordHash: newHash,
            password: '',
            updatedAt: new Date().toISOString()
        });

        return { success: true, message: 'تم تغيير كلمة المرور بنجاح' };
    },

    'getUsers': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const db = getDatabase();
        const users = db.readSheet('Users').map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            department: u.department,
            employeeCode: u.employeeCode,
            active: u.active !== 'false' && u.active !== false,
            photo: u.photo,
            lastLogin: u.lastLogin,
            isOnline: u.isOnline
        }));

        return { success: true, users: users, data: users };
    },

    'getUsersForApp': function(payload, postData, action, actorUserData) {
        const gate = requireAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const isAdmin = checkAdminPermissionsAuthoritative(actorUserData);
        const actorEmail = String(actorUserData?.email || '').trim();
        const db = getDatabase();
        const users = (db.readSheet('Users') || [])
            .map((u) => sanitizeUserRecordForClient(u, isAdmin, actorEmail))
            .filter((u) => u && u.email);
        return { success: true, users, data: users, total: users.length };
    },

    'getUsersMeta': function(payload, postData, action, actorUserData) {
        const gate = requireAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const db = getDatabase();
        const users = db.readSheet('Users');
        return { success: true, count: users.length, total: users.length };
    },

    'updateUser': async function(payload, postData, action, actorUserData) {
        const gate = requireAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload || postData || {};
        const userId = data.userId || data.id;
        const updateData = data.updateData || {};
        if (!userId) {
            return { success: false, message: 'معرف المستخدم مطلوب', errorCode: 'USER_ID_REQUIRED' };
        }

        const db = getDatabase();
        const users = db.readSheet('Users') || [];
        const idStr = String(userId).trim();
        const target = users.find((u) =>
            u && (String(u.id || '').trim() === idStr
                || String(u.email || '').trim().toLowerCase() === idStr.toLowerCase())
        );
        if (!target) {
            return { success: false, message: 'المستخدم غير موجود', errorCode: 'USER_NOT_FOUND' };
        }

        const actorEmail = String(actorUserData?.email || gate.sheetUser?.email || '').trim().toLowerCase();
        const targetEmail = String(target.email || '').trim().toLowerCase();
        const isSelf = !!(actorEmail && targetEmail && actorEmail === targetEmail);
        const isAdmin = checkAdminPermissionsAuthoritative(actorUserData);

        if (!isAdmin && !isSelf) {
            return {
                success: false,
                message: 'ليس لديك صلاحية تحديث هذا المستخدم',
                errorCode: 'PERMISSION_DENIED'
            };
        }

        const selfSafeFields = new Set(['photo', 'phone', 'updatedAt']);
        const processed = {};
        for (const [key, val] of Object.entries(updateData || {})) {
            if (val === undefined) continue;
            if (isAdmin) {
                if (key === 'passwordHash' && val === '***') continue;
                if (key === 'password' && (val === '***' || val === '')) continue;
                processed[key] = val;
            } else if (selfSafeFields.has(key)) {
                processed[key] = val;
            }
        }

        if (processed.password && String(processed.password).trim() && processed.password !== '***') {
            processed.passwordHash = sha256(String(processed.password).trim());
            processed.password = '';
        }

        if (!Object.keys(processed).length) {
            return { success: false, message: 'لا توجد حقول مسموح تحديثها', errorCode: 'NO_ALLOWED_FIELDS' };
        }

        processed.updatedAt = new Date().toISOString();
        db.updateRow('Users', 'id', target.id, processed);

        if (processed.photo) {
            try {
                const attachmentStore = require('../services/attachment-store');
                await attachmentStore.saveProfilePhotoMeta(target.id, {
                    photo: String(processed.photo).trim(),
                    updatedAt: processed.updatedAt
                });
            } catch (err) {
                console.error('[updateUser] profile meta persist failed:', err.message);
            }
        }

        return { success: true, message: 'تم تحديث المستخدم بنجاح', id: target.id };
    },

    'deleteUser': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload || postData || {};
        const userId = String(data.userId || data.id || '').trim();
        if (!userId) {
            return { success: false, message: 'معرف المستخدم غير محدد', errorCode: 'USER_ID_REQUIRED' };
        }

        const db = getDatabase();
        const users = db.readSheet('Users') || [];
        const target = users.find((u) =>
            u && (String(u.id || '').trim() === userId
                || String(u.email || '').trim().toLowerCase() === userId.toLowerCase())
        );
        if (!target) {
            return { success: false, message: 'المستخدم غير موجود', errorCode: 'USER_NOT_FOUND' };
        }

        const actorEmail = String(gate.sheetUser?.email || actorUserData?.email || '').trim().toLowerCase();
        const targetEmail = String(target.email || '').trim().toLowerCase();
        const sameId = String(gate.sheetUser?.id || '') === String(target.id || '');
        if (sameId || (actorEmail && targetEmail && actorEmail === targetEmail)) {
            return {
                success: false,
                message: 'لا يمكنك حذف حسابك الخاص',
                errorCode: 'SELF_DELETE_FORBIDDEN'
            };
        }

        const activeAdmins = users.filter((u) =>
            u && isAdminUser(u) && u.active !== false && u.active !== 'false'
        );
        if (isAdminUser(target) && activeAdmins.length <= 1) {
            return {
                success: false,
                message: 'لا يمكن حذف آخر مدير في النظام',
                errorCode: 'LAST_ADMIN'
            };
        }

        let changes = 0;
        try {
            changes = db.deleteRows('Users', 'id', target.id) || 0;
        } catch (err) {
            return {
                success: false,
                message: `فشل حذف المستخدم: ${err.message || err}`,
                errorCode: 'DELETE_USER_ERROR'
            };
        }

        if (changes < 1) {
            return { success: false, message: 'فشل حذف المستخدم', errorCode: 'DELETE_FAILED' };
        }

        return {
            success: true,
            message: 'تم حذف المستخدم بنجاح',
            id: target.id,
            changes
        };
    }
};

module.exports = authHandlers;
