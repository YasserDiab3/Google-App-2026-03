/**
 * Authentication and User Management Handlers
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../db/database');
const { checkAdminActor, checkAuthenticatedActor } = require('../middleware/auth-guard');

function sha256(str) {
    return crypto.createHash('sha256').update(String(str || '')).digest('hex');
}

const authHandlers = {
    'login': function(payload, postData, action) {
        const data = payload || postData || {};
        const email = String(data.email || '').trim().toLowerCase();
        const password = String(data.password || '');
        const providedHash = data.passwordHash || (password ? sha256(password) : '');

        if (!email) {
            return { success: false, message: 'البريد الإلكتروني مطلوب', errorCode: 'EMAIL_REQUIRED' };
        }

        const db = getDatabase();
        const users = db.readSheet('Users');
        let user = users.find(u => String(u.email || '').toLowerCase() === email);

        // Fallback matching for administrative login aliases
        if (!user && (email.startsWith('admin@') || email.includes('admin'))) {
            user = users.find(u => String(u.role || '').toLowerCase() === 'admin');
        }

        if (!user) {
            return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة', errorCode: 'INVALID_CREDENTIALS' };
        }

        if (user.active === 'false' || user.active === false) {
            return { success: false, message: 'هذا الحساب معطل. يرجى مراجعة المسؤول.', errorCode: 'ACCOUNT_DISABLED' };
        }

        // Verify password hash or plain text password
        const userHash = user.passwordHash || (user.password ? sha256(user.password) : '');
        const match = (providedHash && userHash && providedHash === userHash) || (password && user.password && password === user.password);

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
        
        // Update presence / lastLogin
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
    }
};

module.exports = authHandlers;
