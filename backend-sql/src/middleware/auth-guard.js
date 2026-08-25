/**
 * Auth & Security Guards - Parity with Backend/ActionHandlers.gs security logic
 */
'use strict';

function checkAdminActor(actorUserData, actionName) {
    if (!actorUserData || typeof actorUserData !== 'object') {
        return {
            ok: false,
            success: false,
            message: 'صلاحيات المدير مطلوبة لتنفيذ هذا الإجراء',
            errorCode: 'STRICT_ADMIN_DENIED',
            action: actionName
        };
    }

    const role = String(actorUserData.role || '').toLowerCase();
    if (role !== 'admin' && role !== 'manager' && actorUserData.isAdmin !== true) {
        return {
            ok: false,
            success: false,
            message: 'هذا الإجراء مخصص للمديرين فقط',
            errorCode: 'STRICT_ADMIN_DENIED',
            action: actionName
        };
    }

    return { ok: true };
}

function checkAuthenticatedActor(actorUserData, actionName) {
    if (!actorUserData || typeof actorUserData !== 'object') {
        return {
            ok: false,
            success: false,
            message: 'هوية المستخدم مطلوبة لتنفيذ هذا الإجراء',
            errorCode: 'ACTOR_IDENTITY_REQUIRED',
            action: actionName
        };
    }

    const hasId = actorUserData.id || actorUserData.userId || actorUserData.email;
    if (!hasId) {
        return {
            ok: false,
            success: false,
            message: 'جلسة المستخدم غير صالحة أو منتهية',
            errorCode: 'ACTOR_IDENTITY_REQUIRED',
            action: actionName
        };
    }

    return { ok: true };
}

function checkSheetDirectWriteAccess(sheetName, actorUserData, actionName) {
    // Admin always allowed
    const authCheck = checkAuthenticatedActor(actorUserData, actionName);
    if (!authCheck.ok) return authCheck;

    const role = String(actorUserData.role || '').toLowerCase();
    if (role === 'admin') return { ok: true };

    // Sensitive admin-only sheets
    const adminOnlySheets = [
        'Users', 'UserVersions', 'BackupSettings', 'ModuleManagement',
        'Form_Settings_DB', 'Violation_Types_DB', 'ActionTrackingSettings',
        'SafetyHealthManagementSettings', 'AppEmergencyNumbers'
    ];

    if (adminOnlySheets.includes(sheetName)) {
        return {
            ok: false,
            success: false,
            message: `الكتابة في ورقة ${sheetName} تتطلب صلاحيات المدير`,
            errorCode: 'STRICT_ADMIN_DENIED',
            action: actionName
        };
    }

    return { ok: true };
}

module.exports = {
    checkAdminActor,
    checkAuthenticatedActor,
    checkSheetDirectWriteAccess
};
