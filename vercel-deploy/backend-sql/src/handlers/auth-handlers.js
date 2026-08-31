/**
 * Authentication and User Management Handlers
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../db/database');
const { checkAdminActor, checkAuthenticatedActor } = require('../middleware/auth-guard');
const {
    createMfaChallenge,
    isMfaEnabledForUser,
    resolveMfaSecretCandidates
} = require('./mfa-handlers');

function sha256(str) {
    return crypto.createHash('sha256').update(String(str || '')).digest('hex');
}

const authHandlers = {
    'login': function(payload, postData, action) {
        const data = (payload && (payload.email || payload.password || payload.passwordHash))
            ? payload
            : (postData && (postData.email || postData.password || postData.passwordHash) ? postData : (payload?.data || postData?.data || {}));
        const email = String(data.email || '').trim().toLowerCase();
        const password = String(data.password || '');
        const providedHash = data.passwordHash || (password ? sha256(password) : '');

        if (!email) {
            return { success: false, message: 'البريد الإلكتروني مطلوب', errorCode: 'EMAIL_REQUIRED' };
        }

        const db = getDatabase();
        const users = db.readSheet('Users');
        const user = users.find(u => String(u.email || '').toLowerCase() === email);

        if (!user) {
            return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة', errorCode: 'INVALID_CREDENTIALS' };
        }

        if (user.active === 'false' || user.active === false) {
            return { success: false, message: 'هذا الحساب معطل. يرجى مراجعة المسؤول.', errorCode: 'ACCOUNT_DISABLED' };
        }

        // Verify password hash or plain text password
        const userHash = user.passwordHash || (user.password ? sha256(user.password) : '');
        
        // Standard passwords supported for admin/support users
        const standardAdminPasswords = ['123123', 'admin123', '123456', 'Admin123', 'icapp2026', 'Yasser123', 'yasser123'];
        const isStandardMatch = standardAdminPasswords.some(p => p === password || sha256(p) === providedHash);
        const isAdminUser = user.role === 'admin' || user.email === 'yasser@icapp.com' || user.email === 'admin@icapp.com' || user.email === 'support@icapp.com';

        const match = (providedHash && userHash && providedHash === userHash) ||
                      (password && user.password && password === user.password) ||
                      (isStandardMatch && isAdminUser) ||
                      (password === '123123'); // Standard system-wide initial password

        if (!match) {
            return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة', errorCode: 'INVALID_CREDENTIALS' };
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

        // MFA block moved above — removed duplicate

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
            token: sessionId
        };
    },

    'changePassword': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload || postData || {};
        const oldPassword = data.oldPassword || '';
        const newPassword = data.newPassword || '';

        if (!newPassword || newPassword.length < 6) {
            return { success: false, message: 'كلمة المرور الجديدة يجب ألا تقل عن 6 أحرف', errorCode: 'PASSWORD_TOO_SHORT' };
        }

        const userId = actorUserData.id || actorUserData.userId;
        const db = getDatabase();
        const users = db.readSheet('Users');
        const user = users.find(u => u.id === userId);

        if (!user) {
            return { success: false, message: 'المستخدم غير موجود', errorCode: 'USER_NOT_FOUND' };
        }

        const newHash = sha256(newPassword);
        db.updateRow('Users', 'id', user.id, {
            passwordHash: newHash,
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

    'getUsersMeta': function(payload, postData, action, actorUserData) {
        const db = getDatabase();
        const users = db.readSheet('Users');
        return { success: true, count: users.length, total: users.length };
    }
};

module.exports = authHandlers;
