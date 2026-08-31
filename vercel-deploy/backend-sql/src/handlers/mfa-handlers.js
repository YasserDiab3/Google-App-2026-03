/**
 * MFA enrollment / login handlers
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../db/database');
const { checkAuthenticatedActor, checkAdminActor } = require('../middleware/auth-guard');
const {
    MFA_ENROLL_TOTP_WINDOW,
    generateTotpSecret,
    verifyTotpCode,
    encryptMfaSecret,
    verifyTotpAgainstSecretEnc,
    buildOtpAuthUri,
    isMfaEnabledForUser,
    resolveMfaSecretCandidates
} = require('../services/mfa-totp');
const {
    createMfaChallenge,
    validateMfaChallenge,
    getMfaChallenge,
    consumeMfaChallenge,
    storeMfaEnrollmentPending,
    peekMfaEnrollmentPending,
    clearMfaEnrollmentPending,
    isTotpCodeAlreadyUsed,
    markTotpCodeConsumed,
    buildMfaChallengeSafeUser
} = require('../services/mfa-challenge-store');

function sha256(str) {
    return crypto.createHash('sha256').update(String(str || '')).digest('hex');
}

function verifyUserPassword(db, email, password) {
    const users = db.readSheet('Users');
    const user = users.find(u => String(u.email || '').toLowerCase() === email);
    if (!user) return { success: false };
    const userHash = user.passwordHash || (user.password ? sha256(user.password) : '');
    const providedHash = password ? sha256(password) : '';
    const match = (providedHash && userHash && providedHash === userHash) ||
        (password && user.password && password === user.password);
    return { success: !!match, user };
}

function attachSession(user) {
    const now = new Date().toISOString();
    const sessionId = 'SES_' + crypto.randomBytes(16).toString('hex');
    let perms = user.permissions;
    if (typeof perms === 'string') {
        try { perms = JSON.parse(perms); } catch (_) { perms = []; }
    }
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
        lastLogin: now,
        mfaEnabled: isMfaEnabledForUser(user)
    };
    return {
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        user: sanitizedUser,
        userData: sanitizedUser,
        token: sessionId
    };
}

const mfaHandlers = {
    verifyMfaLogin(payload, postData) {
        const data = payload || postData?.data || postData || {};
        const email = String(data.email || '').trim().toLowerCase();
        const token = String(data.challengeToken || data.token || '').trim();
        const otp = String(data.code || data.otp || '').replace(/\s/g, '');

        if (!email || !token || !otp) {
            return { success: false, message: 'بيانات المصادقة الثنائية ناقصة' };
        }
        if (!validateMfaChallenge(token, email)) {
            return { success: false, message: 'انتهت صلاحية جلسة المصادقة. أعد تسجيل الدخول.' };
        }
        if (isTotpCodeAlreadyUsed(email, otp)) {
            return { success: false, message: 'تم استخدام هذا الرمز مسبقاً. انتظر رمزاً جديداً.' };
        }

        const cached = getMfaChallenge(token);
        const db = getDatabase();
        let user = null;
        let secretEnc = '';

        if (cached?.mfaSecretEnc) {
            secretEnc = String(cached.mfaSecretEnc).trim();
            user = db.readSheet('Users').find(u => u.id === cached.userId || String(u.email || '').toLowerCase() === email);
        } else {
            user = db.readSheet('Users').find(u => String(u.email || '').toLowerCase() === email);
            if (!user || !isMfaEnabledForUser(user)) {
                return { success: false, message: 'المصادقة الثنائية غير مفعّلة لهذا الحساب' };
            }
            secretEnc = String(user.mfaSecretEnc || '').trim();
        }

        if (!secretEnc) {
            return {
                success: false,
                message: 'لم يتم العثور على مفتاح المصادقة الثنائية لهذا الحساب.',
                errorCode: 'MFA_SECRET_MISSING'
            };
        }

        let totpCheck = verifyTotpAgainstSecretEnc(secretEnc, otp, { window: 10 });
        if (!totpCheck.ok && user) {
            const freshEnc = String(user.mfaSecretEnc || '').trim();
            totpCheck = verifyTotpAgainstSecretEnc(freshEnc, otp, { window: 10 });
        }

        if (!totpCheck.ok) {
            return {
                success: false,
                message: 'رمز المصادقة الثنائية غير صحيح أو منتهٍ. انتظر رمزاً جديداً من التطبيق وأعد المحاولة.',
                errorCode: 'MFA_CODE_INVALID'
            };
        }

        if (!markTotpCodeConsumed(email, otp, 180)) {
            return { success: false, message: 'تم استخدام هذا الرمز مسبقاً. انتظر رمزاً جديداً.' };
        }
        if (!consumeMfaChallenge(token, email)) {
            return { success: false, message: 'تعذر إتمام جلسة المصادقة. أعد تسجيل الدخول.' };
        }

        if (!user) {
            user = db.readSheet('Users').find(u => String(u.email || '').toLowerCase() === email);
        }
        const safeUser = cached?.safeUser || buildMfaChallengeSafeUser(user) || attachSession(user).user;
        try {
            db.updateRow('Users', 'id', user.id, {
                lastLogin: new Date().toISOString(),
                lastPresenceAt: new Date().toISOString(),
                isOnline: 'true'
            });
        } catch (_) {}

        return {
            success: true,
            message: 'تم تسجيل الدخول بنجاح',
            user: safeUser,
            userData: safeUser,
            token: 'SES_' + crypto.randomBytes(16).toString('hex')
        };
    },

    startMfaEnrollment(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const email = String(actorUserData.email || '').trim().toLowerCase();
        if (!email) {
            return { success: false, message: 'مطلوب تسجيل الدخول', errorCode: 'AUTH_REQUIRED' };
        }
        if (isMfaEnabledForUser(actorUserData)) {
            return { success: false, message: 'المصادقة الثنائية مفعّلة بالفعل' };
        }

        const db = getDatabase();
        const user = db.readSheet('Users').find(u => String(u.email || '').toLowerCase() === email);
        if (user && isMfaEnabledForUser(user)) {
            return { success: false, message: 'المصادقة الثنائية مفعّلة بالفعل' };
        }

        const pending = peekMfaEnrollmentPending(email);
        const secret = pending || generateTotpSecret();
        if (!pending && !storeMfaEnrollmentPending(email, secret)) {
            return { success: false, message: 'تعذر بدء التسجيل. حاول لاحقاً.' };
        }

        return {
            success: true,
            secret,
            otpauthUrl: buildOtpAuthUri(email, secret, 'HSE-04-2026'),
            message: 'امسح رمز QR ثم أدخل الرمز للتأكيد'
        };
    },

    confirmMfaEnrollment(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const email = String(actorUserData.email || '').trim().toLowerCase();
        const otp = String(payload?.code || payload?.otp || '').replace(/\s/g, '');
        if (!email || !otp) {
            return { success: false, message: 'رمز التأكيد مطلوب' };
        }

        const pendingSecret = peekMfaEnrollmentPending(email);
        if (!pendingSecret) {
            return { success: false, message: 'انتهت جلسة التسجيل. أعد المحاولة من البداية.' };
        }
        if (!verifyTotpCode(pendingSecret, otp, { window: MFA_ENROLL_TOTP_WINDOW })) {
            return { success: false, message: 'رمز التأكيد غير صحيح. تأكد من مزامنة وقت الجهاز وحاول رمزاً جديداً.' };
        }

        const db = getDatabase();
        const user = db.readSheet('Users').find(u => String(u.email || '').toLowerCase() === email);
        if (!user) {
            return { success: false, message: 'المستخدم غير موجود' };
        }

        const enc = encryptMfaSecret(pendingSecret);
        const now = new Date().toISOString();
        db.updateRow('Users', 'id', user.id, {
            mfaEnabled: 'true',
            mfaSecretEnc: enc,
            mfaEnrolledAt: now,
            updatedAt: now
        });
        clearMfaEnrollmentPending(email);

        return {
            success: true,
            message: 'تم تفعيل المصادقة الثنائية بنجاح',
            mfaEnabled: true,
            mfaEnrolledAt: now
        };
    },

    disableMfa(payload, postData, action, actorUserData) {
        const targetEmail = String(payload?.email || actorUserData?.email || '').trim().toLowerCase();
        const password = String(payload?.password || '');
        const actorEmail = String(actorUserData?.email || '').trim().toLowerCase();

        if (!targetEmail) {
            return { success: false, message: 'البريد الإلكتروني مطلوب' };
        }

        const isSelf = actorEmail && actorEmail === targetEmail;
        if (!isSelf) {
            const adminGate = checkAdminActor(actorUserData, action);
            if (!adminGate.ok) return adminGate;
        } else {
            const gate = checkAuthenticatedActor(actorUserData, action);
            if (!gate.ok) return gate;
            if (!password) {
                return { success: false, message: 'كلمة المرور مطلوبة لتعطيل المصادقة الثنائية' };
            }
            const db = getDatabase();
            const verify = verifyUserPassword(db, targetEmail, password);
            if (!verify.success) {
                return { success: false, message: 'كلمة المرور غير صحيحة' };
            }
        }

        const db = getDatabase();
        const user = db.readSheet('Users').find(u => String(u.email || '').toLowerCase() === targetEmail);
        if (!user) {
            return { success: false, message: 'المستخدم غير موجود' };
        }

        db.updateRow('Users', 'id', user.id, {
            mfaEnabled: 'false',
            mfaSecretEnc: '',
            mfaEnrolledAt: '',
            updatedAt: new Date().toISOString()
        });
        clearMfaEnrollmentPending(targetEmail);

        return { success: true, message: 'تم تعطيل المصادقة الثنائية بنجاح', mfaEnabled: false };
    }
};

module.exports = {
    mfaHandlers,
    createMfaChallenge,
    isMfaEnabledForUser,
    resolveMfaSecretCandidates,
    attachSession
};
