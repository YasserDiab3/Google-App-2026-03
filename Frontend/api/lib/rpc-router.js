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

    const handler = ActionRegistry[action];
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
