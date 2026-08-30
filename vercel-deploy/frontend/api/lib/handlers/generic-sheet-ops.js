/**
 * Generic Sheet Operations Handler (Parity with ActionHandlers.gs)
 */
'use strict';

const { getDatabase } = require('../db/database');
const { checkSheetDirectWriteAccess, checkAuthenticatedActor } = require('../middleware/auth-guard');

const genericSheetOps = {
    'readFromSheet': function(payload, postData, action, actorUserData) {
        const sheetName = payload?.sheetName || postData?.sheetName;
        if (!sheetName) {
            return { success: false, message: 'اسم الورقة مطلوب', errorCode: 'SHEET_NAME_REQUIRED' };
        }

        const db = getDatabase();
        try {
            const rows = db.readSheet(sheetName);
            return {
                success: true,
                data: rows,
                sheetName: sheetName,
                count: rows.length,
                timestamp: new Date().toISOString()
            };
        } catch (err) {
            return {
                success: false,
                message: `فشل قراءة الورقة ${sheetName}: ${err.message}`,
                errorCode: 'READ_SHEET_ERROR'
            };
        }
    },

    'batchReadSheets': function(payload, postData, action, actorUserData) {
        const sheetNames = payload?.sheetNames || postData?.sheetNames || [];
        if (!Array.isArray(sheetNames) || sheetNames.length === 0) {
            return { success: false, message: 'قائمة الأوراق مطلوبة', errorCode: 'SHEET_NAMES_REQUIRED' };
        }

        const db = getDatabase();
        const result = {};

        let totalCount = 0;
        for (const name of sheetNames) {
            try {
                result[name] = db.readSheet(name);
                totalCount += (result[name] ? result[name].length : 0);
            } catch (err) {
                result[name] = [];
            }
        }

        return {
            success: true,
            data: result,
            totalSheets: sheetNames.length,
            successfulSheets: sheetNames.length,
            failedSheets: [],
            count: totalCount,
            timestamp: new Date().toISOString()
        };
    },

    'saveToSheet': function(payload, postData, action, actorUserData) {
        const sheetName = payload?.sheetName || postData?.sheetName;
        if (!sheetName) {
            return { success: false, message: 'اسم الورقة مطلوب', errorCode: 'SHEET_NAME_REQUIRED' };
        }

        const gate = checkSheetDirectWriteAccess(sheetName, actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload?.data !== undefined ? payload.data : postData?.data;
        const rows = Array.isArray(data) ? data : (data ? [data] : []);

        const db = getDatabase();
        try {
            db.saveToSheet(sheetName, rows);
            return {
                success: true,
                message: `تم حفظ البيانات في ورقة ${sheetName} بنجاح`,
                count: rows.length,
                timestamp: new Date().toISOString()
            };
        } catch (err) {
            return {
                success: false,
                message: `فشل حفظ البيانات في ${sheetName}: ${err.message}`,
                errorCode: 'SAVE_SHEET_ERROR'
            };
        }
    },

    'appendToSheet': function(payload, postData, action, actorUserData) {
        const sheetName = payload?.sheetName || postData?.sheetName;
        if (!sheetName) {
            return { success: false, message: 'اسم الورقة مطلوب', errorCode: 'SHEET_NAME_REQUIRED' };
        }

        const gate = checkSheetDirectWriteAccess(sheetName, actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload?.data !== undefined ? payload.data : postData?.data;
        if (!data) {
            return { success: false, message: 'البيانات مطلوبة للإضافة', errorCode: 'DATA_REQUIRED' };
        }

        const db = getDatabase();
        try {
            const rows = Array.isArray(data) ? data : [data];
            db.insertRows(sheetName, rows);
            return {
                success: true,
                message: `تمت الإضافة إلى ورقة ${sheetName} بنجاح`,
                count: rows.length,
                timestamp: new Date().toISOString()
            };
        } catch (err) {
            return {
                success: false,
                message: `فشل الإضافة إلى ${sheetName}: ${err.message}`,
                errorCode: 'APPEND_SHEET_ERROR'
            };
        }
    },

    'updateRow': function(payload, postData, action, actorUserData) {
        const sheetName = payload?.sheetName || postData?.sheetName;
        const id = payload?.id || postData?.id || payload?.data?.id;
        const updateData = payload?.data || postData?.data;

        if (!sheetName || !id || !updateData) {
            return { success: false, message: 'المعطيات غير مكتملة للتعديل', errorCode: 'INVALID_UPDATE_PAYLOAD' };
        }

        const gate = checkSheetDirectWriteAccess(sheetName, actorUserData, action);
        if (!gate.ok) return gate;

        const db = getDatabase();
        try {
            const changes = db.updateRow(sheetName, 'id', id, updateData);
            return {
                success: true,
                message: changes > 0 ? 'تم التعديل بنجاح' : 'لم يتم العثور على السجل',
                changes: changes
            };
        } catch (err) {
            return {
                success: false,
                message: `فشل التعديل: ${err.message}`,
                errorCode: 'UPDATE_ROW_ERROR'
            };
        }
    },

    'deleteRow': function(payload, postData, action, actorUserData) {
        const sheetName = payload?.sheetName || postData?.sheetName;
        const id = payload?.id || postData?.id;

        if (!sheetName || !id) {
            return { success: false, message: 'اسم الورقة ومعرف السجل مطلوبان', errorCode: 'INVALID_DELETE_PAYLOAD' };
        }

        const gate = checkSheetDirectWriteAccess(sheetName, actorUserData, action);
        if (!gate.ok) return gate;

        const db = getDatabase();
        try {
            const changes = db.deleteRows(sheetName, 'id', id);
            return {
                success: true,
                message: changes > 0 ? 'تم الحذف بنجاح' : 'لم يتم العثور على السجل',
                changes: changes
            };
        } catch (err) {
            return {
                success: false,
                message: `فشل الحذف: ${err.message}`,
                errorCode: 'DELETE_ROW_ERROR'
            };
        }
    }
};

module.exports = genericSheetOps;
