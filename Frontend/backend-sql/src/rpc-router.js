/**
 * RPC Router & Dispatcher - 100% Contract Parity with Google Apps Script doPost / ActionHandlers
 * Includes Hybrid Dual-Write Background Mirroring to Google Sheets.
 */
'use strict';

const genericSheetOps = require('./handlers/generic-sheet-ops');
const authHandlers = require('./handlers/auth-handlers');
const moduleHandlers = require('./handlers/module-handlers');
const { dispatchBackgroundMirror } = require('./services/mirror-sync');

// Combine all handlers into a single unified registry
const ActionRegistry = {
    ...genericSheetOps,
    ...authHandlers,
    ...moduleHandlers
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
    const actorUserData = reqBody.actorUserData || payload.actorUserData || null;
    const spreadsheetId = reqBody.spreadsheetId || payload.spreadsheetId || '';

    let handler = ActionRegistry[action];
    
    // Dynamic Table CRUD Resolver for all 144 sheets
    if (!handler || typeof handler !== 'function') {
        const { headersMap } = require('./db/headers-schema');
        const { getDatabase } = require('./db/database');
        const sheetKeys = Object.keys(headersMap || {});

        // Check if action matches getAll<SheetName>, get<SheetName>s, add<SheetName>, save<SheetName>, update<SheetName>, delete<SheetName>
        for (const sheetName of sheetKeys) {
            const lowerSheet = sheetName.toLowerCase();
            const lowerAction = action.toLowerCase();

            if (lowerAction === `getall${lowerSheet}` || lowerAction === `get${lowerSheet}s` || lowerAction === `get${lowerSheet}`) {
                handler = function() {
                    const db = getDatabase();
                    const records = db.readSheet(sheetName);
                    return { success: true, data: records, count: records.length, sheetName: sheetName };
                };
                break;
            } else if (lowerAction === `add${lowerSheet}` || lowerAction === `save${lowerSheet}` || lowerAction === `insert${lowerSheet}`) {
                handler = function(p) {
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
                handler = function(p) {
                    const db = getDatabase();
                    const id = p?.id || p?.recordId;
                    const updateData = p?.updateData || p?.data || p || {};
                    updateData.updatedAt = new Date().toISOString();
                    db.updateRow(sheetName, 'id', id, updateData);
                    return { success: true, message: `تم تحديث البيانات في ${sheetName} بنجاح`, id: id };
                };
                break;
            } else if (lowerAction === `delete${lowerSheet}`) {
                handler = function(p) {
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

    try {
        const result = handler(payload, postData, action, actorUserData, spreadsheetId);
        
        // Asynchronous non-blocking mirror sync to Google Sheets (Hybrid Mode)
        if (result && result.success !== false && !reqBody._isHybridMirror) {
            dispatchBackgroundMirror(action, payload, actorUserData, postData);
        }

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
