/**
 * Generic Sheet Operations Handler (Parity with ActionHandlers.gs)
 */
'use strict';

const { getDatabase } = require('../db/database');
const { checkSheetDirectWriteAccess, checkAuthenticatedActor, checkSheetReadAccess, sanitizeUserRows } = require('../middleware/auth-guard');

const genericSheetOps = {
    'readFromSheet': function(payload, postData, action, actorUserData) {
        const sheetName = payload?.sheetName || postData?.sheetName;
        if (!sheetName) {
            return { success: false, message: 'اسم الورقة مطلوب', errorCode: 'SHEET_NAME_REQUIRED' };
        }

        const readGate = checkSheetReadAccess(sheetName, actorUserData, action);
        if (!readGate.ok) return readGate;

        const db = getDatabase();
        try {
            let rows = db.readSheet(sheetName, null, { listMode: true });
            if (sheetName === 'Users') rows = sanitizeUserRows(rows);
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
        let raw = payload?.sheetNames || postData?.sheetNames || payload?.sheets || postData?.sheets || payload?.sheetsList || postData?.sheetsList || [];
        if (typeof raw === 'string') {
            raw = raw.split(',').map(s => s.trim()).filter(Boolean);
        }
        const sheetNames = Array.isArray(raw) ? raw : [];
        if (sheetNames.length === 0) {
            return { success: false, message: 'قائمة الأوراق مطلوبة', errorCode: 'SHEET_NAMES_REQUIRED' };
        }

        const db = getDatabase();
        const result = {};
        const failedSheets = [];

        const aliases = {
            'safetymembers': 'SafetyTeamMembers',
            'factories': 'Form_Sites',
            'sites': 'Form_Sites',
            'places': 'Form_Places',
            'companysettings': 'Company_Settings',
            'officers': 'SecurityOfficers',
            'observations': 'DailyObservations',
            'dailysafety': 'DailySafetyCheckList',
            'nearmisses': 'NearMiss',
            'fireequipment': 'FireEquipmentAssets',
            'fireinspections': 'FireEquipmentInspections',
            'contractors': 'ApprovedContractors'
        };

        let totalCount = 0;
        for (const name of sheetNames) {
            const readGate = checkSheetReadAccess(name, actorUserData, action);
            if (!readGate.ok) {
                failedSheets.push({ sheet: name, sheetName: name, error: readGate.message, errorCode: readGate.errorCode });
                result[name] = [];
                continue;
            }
            try {
                let rows = db.readSheet(name, null, { listMode: true });
                if ((!rows || rows.length === 0) && aliases[name.toLowerCase()]) {
                    const aliasTarget = aliases[name.toLowerCase()];
                    const aliasRows = db.readSheet(aliasTarget, null, { listMode: true });
                    if (aliasRows && aliasRows.length > 0) {
                        rows = aliasRows;
                    }
                }
                if (name === 'Users' || aliases[name.toLowerCase()] === 'Users') {
                    rows = sanitizeUserRows(rows || []);
                }
                result[name] = rows || [];
                totalCount += (result[name] ? result[name].length : 0);
            } catch (err) {
                failedSheets.push({ sheet: name, sheetName: name, error: err.message });
                result[name] = [];
            }
        }

        return {
            success: true,
            data: result,
            totalSheets: sheetNames.length,
            successfulSheets: sheetNames.length - failedSheets.length,
            failedSheets,
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
            // Upsert: update existing rows by id, insert new ones
            let inserted = 0, updated = 0;
            for (const row of rows) {
                if (row.id) {
                    const existing = db.readFromSheet(sheetName, { id: row.id });
                    if (existing && existing.length > 0) {
                        db.updateRow(sheetName, 'id', row.id, row);
                        updated++;
                        continue;
                    }
                }
                db.appendToSheet(sheetName, row);
                inserted++;
            }
            return {
                success: true,
                message: `تم حفظ البيانات في ورقة ${sheetName} بنجاح`,
                count: rows.length,
                inserted,
                updated,
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
        const id = payload?.id || postData?.id || payload?.recordId || postData?.recordId;
        const updateData = payload?.updateData || payload?.data || postData?.updateData || postData?.data;

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

// Aliases for multi-sheet batch operations
genericSheetOps['batchReadFromSheets'] = genericSheetOps['batchReadSheets'];
genericSheetOps['readFromSheets'] = genericSheetOps['batchReadSheets'];
genericSheetOps['batchRead'] = genericSheetOps['batchReadSheets'];

module.exports = genericSheetOps;
