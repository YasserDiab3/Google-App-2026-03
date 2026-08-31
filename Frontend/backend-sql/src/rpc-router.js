/**
 * RPC Router & Dispatcher - SQL Backend (GAS contract parity)
 */
'use strict';

const genericSheetOps = require('./handlers/generic-sheet-ops');
const authHandlers = require('./handlers/auth-handlers');
const moduleHandlers = require('./handlers/module-handlers');
const fileHandlers = require('./handlers/file-handlers');
const { getEntityActionHandlers } = require('./handlers/entity-action-resolver');
const { mfaHandlers } = require('./handlers/mfa-handlers');
const companySettingsHandlers = require('./handlers/company-settings-handlers');
const ppeHandlers = require('./handlers/ppe-handlers');
const formSettingsHandlers = require('./handlers/form-settings-handlers');
const {
    enforceRpcSecurity,
    checkSheetReadAccess,
    checkSheetDirectWriteAccess,
    sanitizeUserRows
} = require('./middleware/auth-guard');

// Combine all handlers into a single unified registry
// entity handlers أولاً — module-handlers تتجاوزها عند التعارض
const ActionRegistry = {
    ...getEntityActionHandlers(),
    ...genericSheetOps,
    ...authHandlers,
    ...mfaHandlers,
    ...moduleHandlers,
    uploadFileToDrive: (p) => fileHandlers.uploadFileToDrive(p),
    getProfileImage: (p) => fileHandlers.getProfileImage(p),
    getCompanySettings: companySettingsHandlers.getCompanySettings,
    saveCompanySettings: companySettingsHandlers.saveCompanySettings,
    getPPEItemsList: ppeHandlers.getPPEItemsList,
    getAllPPE: ppeHandlers.getAllPPE,
    addPPE: ppeHandlers.addPPE,
    updatePPE: ppeHandlers.updatePPE,
    getFormSettings: formSettingsHandlers.getFormSettings,
    saveFormSettings: formSettingsHandlers.saveFormSettings,
    initializeSheets: () => ({
        success: true,
        message: 'قاعدة SQL جاهزة — لا حاجة لتهيئة Google Sheets'
    })
};

// Automated & On-Demand Backup Actions
const { createBackup, listBackups } = require('./services/backup-service');
ActionRegistry['createDatabaseBackup'] = () => createBackup();
ActionRegistry['listDatabaseBackups'] = () => ({ success: true, data: listBackups() });

/**
 * Dispatches an incoming RPC request
 * @param {Object} reqBody The POST body sent by the frontend
 * @returns {Object} JSON response object matching GAS structure
 */
function handleRpcRequest(reqBody) {
    if (!reqBody || typeof reqBody !== 'object') {
        return {
            success: false,
            message: 'No request data received. Request object is null or invalid JSON.',
            errorCode: 'NULL_REQUEST_OBJECT'
        };
    }

    const action = reqBody.action;
    if (!action) {
        return {
            success: false,
            message: 'اسم الإجراء (action) مطلوب في الطلب',
            errorCode: 'ACTION_REQUIRED'
        };
    }

    const payload = reqBody.payload || reqBody.data || {};
    const postData = reqBody;
    const actorUserData = reqBody.actorUserData || reqBody.userData || payload.actorUserData || payload.userData || null;
    const spreadsheetId = reqBody.spreadsheetId || payload.spreadsheetId || '';

    let handler = ActionRegistry[action];
    
    // Dynamic Table CRUD Resolver for all 144 sheets
    if (!handler || typeof handler !== 'function') {
        const securityGate = enforceRpcSecurity(action, reqBody);
        if (!securityGate.ok) return securityGate;

        const { headersMap } = require('./db/headers-schema');
        const { getDatabase } = require('./db/database');
        const sheetKeys = Object.keys(headersMap || {});

        // Check if action matches getAll<SheetName>, get<SheetName>s, add<SheetName>, save<SheetName>, update<SheetName>, delete<SheetName>
        for (const sheetName of sheetKeys) {
            const lowerSheet = sheetName.toLowerCase();
            const lowerAction = action.toLowerCase();

            if (lowerAction === `getall${lowerSheet}` || lowerAction === `get${lowerSheet}s` || lowerAction === `get${lowerSheet}`) {
                handler = function(p, postData, act, actorUserData) {
                    const readGate = checkSheetReadAccess(sheetName, actorUserData, act);
                    if (!readGate.ok) return readGate;
                    const db = getDatabase();
                    let records = db.readSheet(sheetName);
                    if (sheetName === 'Users') records = sanitizeUserRows(records);
                    return { success: true, data: records, count: records.length, sheetName: sheetName };
                };
                break;
            } else if (lowerAction === `add${lowerSheet}` || lowerAction === `save${lowerSheet}` || lowerAction === `insert${lowerSheet}`) {
                handler = function(p, postData, act, actorUserData) {
                    const writeGate = checkSheetDirectWriteAccess(sheetName, actorUserData, act);
                    if (!writeGate.ok) return writeGate;
                    const db = getDatabase();
                    const row = p?.data || p || {};
                    if (!row.id) row.id = `${sheetName.substring(0, 3).toUpperCase()}_${Date.now()}`;
                    row.createdAt = row.createdAt || new Date().toISOString();
                    row.updatedAt = new Date().toISOString();
                    db.insertRow(sheetName, row);
                    return { success: true, message: `تم حفظ البيانات في ${sheetName} بنجاح`, data: row, id: row.id };
                };
                break;
            } else if (lowerAction === `update${lowerSheet}`) {
                handler = function(p, postData, act, actorUserData) {
                    const writeGate = checkSheetDirectWriteAccess(sheetName, actorUserData, act);
                    if (!writeGate.ok) return writeGate;
                    const db = getDatabase();
                    const id = p?.id || p?.recordId;
                    const updateData = p?.updateData || p?.data || p || {};
                    updateData.updatedAt = new Date().toISOString();
                    db.updateRow(sheetName, 'id', id, updateData);
                    return { success: true, message: `تم تحديث البيانات في ${sheetName} بنجاح`, id: id };
                };
                break;
            } else if (lowerAction === `delete${lowerSheet}`) {
                handler = function(p, postData, act, actorUserData) {
                    const writeGate = checkSheetDirectWriteAccess(sheetName, actorUserData, act);
                    if (!writeGate.ok) return writeGate;
                    const db = getDatabase();
                    const id = p?.id || p?.recordId;
                    db.deleteRows(sheetName, 'id', id);
                    return { success: true, message: `تم حذف السجل من ${sheetName} بنجاح`, id: id };
                };
                break;
            }
        }
    }

    if (!handler || typeof handler !== 'function') {
        return {
            success: false,
            message: `الإجراء غير معروف: ${action}`,
            errorCode: 'ACTION_NOT_RECOGNIZED',
            action: action
        };
    }

    const securityGate = enforceRpcSecurity(action, reqBody);
    if (!securityGate.ok) return securityGate;

    try {
        const result = handler(payload, postData, action, actorUserData, spreadsheetId);
        return result || { success: true };
    } catch (err) {
        console.error(`[RPC ERROR] Exception in action "${action}":`, err);
        return {
            success: false,
            message: `خطأ في الخادم أثناء تنفيذ ${action}: ${err.message}`,
            errorCode: 'INTERNAL_SERVER_ERROR',
            action: action
        };
    }
}

module.exports = {
    handleRpcRequest,
    ActionRegistry
};
