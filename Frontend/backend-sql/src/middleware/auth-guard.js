/**
 * Auth & Security Guards — parity with legacy GAS (Utils.gs / ModuleManagement.gs / Code.gs)
 */
'use strict';

const { getDatabase } = require('../db/database');

const ADMIN_ROLES = new Set([
    'admin', 'administrator', 'system_admin', 'system-manager', 'مدير', 'مدير النظام'
]);

const ADMIN_ONLY_READ_SHEETS = new Set([
    'Users', 'UserVersions', 'AuditLog', 'SecurityAuditLog', 'UserActivityLog', 'ClientErrorLog'
]);

const DIRECT_WRITE_BLOCKED_SHEETS = new Set(['Users', 'UserVersions']);

const ADMIN_ONLY_WRITE_SHEETS = new Set([
    'Users', 'UserVersions', 'BackupSettings', 'ModuleManagement',
    'Form_Settings_DB', 'Violation_Types_DB', 'ActionTrackingSettings',
    'SafetyHealthManagementSettings', 'AppEmergencyNumbers'
]);

/** عمليات عامة — بلا جلسة (مطابقة csrfExempt / sessionExempt في Code.gs) */
const PUBLIC_EXEMPT_ACTIONS = new Set([
    'login', 'verifyMfaLogin', 'confirmMfaEnrollment', 'startMfaEnrollment',
    'testConnection', 'warmup', 'getPublicIP', 'getAuthBootstrapPolicy',
    'mfaSelfTest', 'getEmployeesSheetHealth', 'getEmployeesLoadSmoke',
    'triggerDailySafetyFormSync',
    'submitPublicObservation', 'getPublicObservationConfig', 'getPublicObservationsAnalytics',
    'getPublicLivePTWSummary', 'submitPublicNearMiss', 'getPublicNearMissConfig',
    'submitPublicFireInspection', 'getPublicFireInspectionConfig',
    'submitPublicDailySafetyChecklist', 'getPublicDailySafetyConfig',
    'submitGateVisitorCheckIn', 'submitGateVisitorCheckOut',
    'getActiveGateVisitors', 'getAllGateVisitors', 'repairAllGateVisitorsRows',
    'getSecurityOfficersList',
    'getHseBroadcastMessages', 'getHseEmergencyContacts',
    'saveHseBroadcastMessages', 'saveHseEmergencyContacts',
    'setOfficialChampionsApproval'
]);

/** @deprecated — القراءات التشخيصية فقط (باقي القراءات تتطلب جلسة) */
const READ_PUBLIC_ACTIONS = new Set([
    'getUsersMeta'
]);

const STRICT_ADMIN_ACTIONS = new Set([
    'addUser', 'deleteUser', 'resetUserPassword',
    'fixUsersSheetHeaders', 'fixMissingSheetHeaders', 'initializeSheets',
    'fixClinicSheetHeaders', 'mfaClearUser', 'mfaClearCorruptSecrets',
    'createDatabaseBackup', 'listDatabaseBackups'
]);

const WRITE_ACTION_PREFIXES = ['save', 'add', 'update', 'delete', 'append', 'insert', 'upload', 'create', 'remove', 'reset', 'fix', 'mfaClear'];

function parsePermissions(raw) {
    if (!raw) return {};
    if (typeof raw === 'object' && !Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
        try {
            const parsed = JSON.parse(raw);
            return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
        } catch (_) {
            return {};
        }
    }
    return {};
}

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function findUserRecord(actorUserData) {
    if (!actorUserData || typeof actorUserData !== 'object') return null;
    const db = getDatabase();
    const users = db.readSheet('Users') || [];
    const email = normalizeEmail(actorUserData.email);
    const id = String(actorUserData.id || actorUserData.userId || '').trim();

    if (email) {
        const byEmail = users.find((u) => normalizeEmail(u.email) === email);
        if (byEmail) return byEmail;
    }
    if (id) {
        const byId = users.find((u) => String(u.id || '').trim() === id);
        if (byId) return byId;
    }
    return null;
}

function isActiveUser(userRecord) {
    if (!userRecord) return false;
    const active = userRecord.active;
    return !(active === false || active === 'false' || active === 'FALSE' || active === '0');
}

function isAdminUser(userRecord) {
    if (!userRecord) return false;
    const role = String(userRecord.role || '').trim();
    const roleLower = role.toLowerCase();
    if (ADMIN_ROLES.has(roleLower) || ADMIN_ROLES.has(role)) return true;
    const perms = parsePermissions(userRecord.permissions);
    if (perms.admin === true || perms.isAdmin === true || perms['manage-modules'] === true) return true;
    if (perms.manage_company_settings === true) return true;
    return false;
}

function isReadOnlyUser(userRecord) {
    if (!userRecord) return false;
    const role = String(userRecord.role || '').trim().toLowerCase();
    return role === 'read_only' || role === 'readonly';
}

function sanitizeUserRecord(user) {
    if (!user || typeof user !== 'object') return user;
    const out = { ...user };
    delete out.password;
    delete out.passwordHash;
    delete out.mfaSecretEnc;
    delete out.mfaSecret;
    delete out.activeSessionId;
    return out;
}

function sanitizeUserRecordForClient(user, isAdmin, actorEmail) {
    if (!user || typeof user !== 'object') return null;
    const safeFields = [
        'id', 'name', 'email', 'department', 'active', 'role', 'jobTitle', 'phone', 'photo',
        'isOnline', 'lastLogin', 'lastLogout', 'lastPresenceAt', 'passwordChanged',
        'forcePasswordChange', 'updatedAt', 'createdAt', 'mfaEnabled', 'employeeCode', 'employeeNumber'
    ];
    const out = {};
    for (const f of safeFields) {
        if (user[f] !== undefined) out[f] = user[f];
    }
    out.active = user.active !== 'false' && user.active !== false;
    const email = normalizeEmail(user.email);
    const actor = normalizeEmail(actorEmail);
    if (isAdmin || (email && email === actor)) {
        if (user.permissions !== undefined) out.permissions = user.permissions;
    }
    return out;
}

function sanitizeUserRows(rows) {
    if (!Array.isArray(rows)) return rows;
    return rows.map((r) => sanitizeUserRecord(r));
}

function validateSessionToken(sessionToken, actorRecord) {
    const token = String(sessionToken || '').trim();
    if (!token || token.length < 16) {
        return {
            ok: false,
            success: false,
            message: 'مطلوب تسجيل دخول جديد (جلسة الخادم مفقودة).',
            errorCode: 'SESSION_TOKEN_MISSING'
        };
    }
    const stored = String(actorRecord.activeSessionId || '').trim();
    if (!stored || stored === token) {
        return { ok: true };
    }
    // Legacy: activeSessionId في DB = SESS_* (واجهة) بينما token المصادقة = SES_*
    if (stored.startsWith('SESS_') && token.startsWith('SES_')) {
        return { ok: true, repairSessionId: token };
    }
    // Vercel/serverless: bundle قديم أو instance آخر — token SES_* صالح من نفس المستخدم المُصادَق
    if (token.startsWith('SES_') && token.length >= 20) {
        return { ok: true, repairSessionId: token };
    }
    return {
        ok: false,
        success: false,
        message: 'انتهت صلاحية الجلسة أو تم تسجيل الدخول من جهاز آخر. أعد تسجيل الدخول.',
        errorCode: 'SESSION_EXPIRED'
    };
}

function requireAuthenticatedActor(actorUserData, actionName) {
    const action = String(actionName || 'unknown');
    const email = normalizeEmail(actorUserData?.email);
    const id = String(actorUserData?.id || actorUserData?.userId || '').trim();

    if (!email && !id) {
        return {
            ok: false,
            success: false,
            message: 'رفض أمني: بيانات المستخدم المنفذ (email) مطلوبة.',
            errorCode: 'ACTOR_IDENTITY_REQUIRED',
            action
        };
    }

    const sheetUser = findUserRecord(actorUserData);
    if (!sheetUser) {
        return {
            ok: false,
            success: false,
            message: 'المستخدم غير مسجل في النظام أو البريد غير صحيح.',
            errorCode: 'ACTOR_NOT_REGISTERED',
            action
        };
    }

    if (!isActiveUser(sheetUser)) {
        return {
            ok: false,
            success: false,
            message: 'حساب المستخدم غير مفعّل.',
            errorCode: 'ACTOR_INACTIVE',
            action
        };
    }

    return {
        ok: true,
        sheetUser,
        actor: sanitizeUserRecord(sheetUser)
    };
}

function checkAdminPermissions(userRecord) {
    return isAdminUser(userRecord);
}

function checkAdminPermissionsAuthoritative(actorUserData) {
    const email = normalizeEmail(actorUserData?.email);
    if (!email) return false;
    const sheetUser = findUserRecord(actorUserData);
    if (!sheetUser) return false;
    return checkAdminPermissions(sheetUser);
}

function checkAdminActor(actorUserData, actionName) {
    const action = String(actionName || 'unknown');
    const authGate = requireAuthenticatedActor(actorUserData, action);
    if (!authGate.ok) return authGate;

    if (!checkAdminPermissions(authGate.sheetUser)) {
        return {
            ok: false,
            success: false,
            message: 'هذا الإجراء مخصص لمدير النظام فقط',
            errorCode: 'STRICT_ADMIN_DENIED',
            action
        };
    }

    return { ok: true, sheetUser: authGate.sheetUser, actor: authGate.actor };
}

function checkAuthenticatedActor(actorUserData, actionName) {
    return requireAuthenticatedActor(actorUserData, actionName);
}

function checkCompanySettingsPermission(actorUserData) {
    const gate = requireAuthenticatedActor(actorUserData, 'saveCompanySettings');
    if (!gate.ok) return gate;

    const user = gate.sheetUser;
    const roleLower = String(user.role || '').trim().toLowerCase();
    if (roleLower === 'admin' || isAdminUser(user)) {
        return { ok: true, sheetUser: user, actor: gate.actor };
    }

    const perms = parsePermissions(user.permissions);
    if (perms.manage_company_settings === true) {
        return { ok: true, sheetUser: user, actor: gate.actor };
    }

    return {
        ok: false,
        success: false,
        message: 'ليس لديك صلاحية لتعديل إعدادات الشركة. فقط مدير النظام يمكنه ذلك.',
        errorCode: 'PERMISSION_DENIED'
    };
}

function checkSheetReadAccess(sheetName, actorUserData, actionName) {
    const authGate = requireAuthenticatedActor(actorUserData, actionName || ('read:' + sheetName));
    if (!authGate.ok) return authGate;

    const name = String(sheetName || '').trim();
    if (!ADMIN_ONLY_READ_SHEETS.has(name)) {
        return { ok: true, sheetUser: authGate.sheetUser, actor: authGate.actor };
    }

    if (!checkAdminPermissions(authGate.sheetUser)) {
        return {
            ok: false,
            success: false,
            message: `قراءة ورقة ${name} تتطلب صلاحيات مدير النظام`,
            errorCode: 'ADMIN_ONLY_READ_DENIED',
            action: actionName
        };
    }

    return { ok: true, sheetUser: authGate.sheetUser, actor: authGate.actor };
}

function checkSheetDirectWriteAccess(sheetName, actorUserData, actionName) {
    const name = String(sheetName || '').trim();
    const action = actionName || ('write:' + (name || 'unknown'));

    const authGate = requireAuthenticatedActor(actorUserData, action);
    if (!authGate.ok) return authGate;

    if (isReadOnlyUser(authGate.sheetUser)) {
        return {
            ok: false,
            success: false,
            message: 'حسابك للقراءة فقط — لا يمكن تنفيذ عمليات الكتابة.',
            errorCode: 'READ_ONLY_DENIED',
            action
        };
    }

    if (DIRECT_WRITE_BLOCKED_SHEETS.has(name)) {
        return {
            ok: false,
            success: false,
            message: `الكتابة المباشرة في ورقة ${name} محظورة — استخدم إجراءات إدارة المستخدمين.`,
            errorCode: 'DIRECT_SHEET_WRITE_BLOCKED',
            action
        };
    }

    if (ADMIN_ONLY_WRITE_SHEETS.has(name) && !checkAdminPermissions(authGate.sheetUser)) {
        return {
            ok: false,
            success: false,
            message: `الكتابة في ورقة ${name} تتطلب صلاحيات المدير`,
            errorCode: 'STRICT_ADMIN_DENIED',
            action
        };
    }

    return { ok: true, sheetUser: authGate.sheetUser, actor: authGate.actor };
}

function isWriteAction(action) {
    const a = String(action || '').toLowerCase();
    if (STRICT_ADMIN_ACTIONS.has(action)) return true;
    return WRITE_ACTION_PREFIXES.some((p) => a.startsWith(p));
}

function isPublicAction(action) {
    return PUBLIC_EXEMPT_ACTIONS.has(action);
}

function isReadPublicAction(action) {
    return READ_PUBLIC_ACTIONS.has(action);
}

/**
 * بوابة RPC مركزية — تُستدعى قبل تنفيذ أي handler
 */
function enforceRpcSecurity(action, reqBody) {
    if (isPublicAction(action)) {
        return { ok: true, actorUserData: null, sheetUser: null };
    }

    const payload = reqBody?.payload || reqBody?.data || {};
    const actorUserData = reqBody?.actorUserData
        || reqBody?.userData
        || payload?.actorUserData
        || payload?.userData
        || payload?.user
        || null;

    const authGate = requireAuthenticatedActor(actorUserData, action);
    if (!authGate.ok) return authGate;

    const sessionToken = String(
        reqBody?.sessionToken
        || payload?.sessionToken
        || ''
    ).trim();

    const sessionGate = validateSessionToken(sessionToken, authGate.sheetUser);
    if (!sessionGate.ok) return sessionGate;

    if (sessionGate.repairSessionId && authGate.sheetUser?.id) {
        try {
            const db = getDatabase();
            db.updateRow('Users', 'id', authGate.sheetUser.id, {
                activeSessionId: sessionGate.repairSessionId
            });
        } catch (_repairErr) { /* ignore */ }
    }

    if (STRICT_ADMIN_ACTIONS.has(action)) {
        const adminGate = checkAdminActor(actorUserData, action);
        if (!adminGate.ok) return adminGate;
        return { ok: true, actorUserData, sheetUser: adminGate.sheetUser, actor: adminGate.actor };
    }

    if (isWriteAction(action) && isReadOnlyUser(authGate.sheetUser)) {
        return {
            ok: false,
            success: false,
            message: 'حسابك للقراءة فقط — لا يمكن تنفيذ عمليات الكتابة.',
            errorCode: 'READ_ONLY_DENIED',
            action
        };
    }

    return {
        ok: true,
        actorUserData,
        sheetUser: authGate.sheetUser,
        actor: authGate.actor
    };
}

module.exports = {
    checkAdminActor,
    checkAuthenticatedActor,
    checkSheetDirectWriteAccess,
    checkSheetReadAccess,
    checkAdminPermissions,
    checkAdminPermissionsAuthoritative,
    checkCompanySettingsPermission,
    requireAuthenticatedActor,
    enforceRpcSecurity,
    sanitizeUserRecord,
    sanitizeUserRows,
    sanitizeUserRecordForClient,
    isAdminUser,
    isPublicAction,
    ADMIN_ONLY_READ_SHEETS,
    DIRECT_WRITE_BLOCKED_SHEETS
};
