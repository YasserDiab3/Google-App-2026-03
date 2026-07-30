/**
 * Google Apps Script for HSE System - PTW Module
 * 
 * موديول تصاريح العمل - النسخة المحسنة
 */

/**
 * إضافة تصريح عمل
 */
function addPTWToSheet(ptwData) {
    try {
        if (!ptwData) {
            return { success: false, message: 'بيانات التصريح غير موجودة' };
        }

        const iaReject = validatePtwApproversAgainstIssuingAuthorities_(ptwData);
        if (iaReject && iaReject.valid === false) {
            return { success: false, message: iaReject.message || 'فشل التحقق من معتمدي تصريح العمل وفق قائمة المصرّح لهم.' };
        }

        const sheetName = 'PTW';
        
        // إضافة حقول تلقائية
        if (!ptwData.id) {
            ptwData.id = generateSequentialId('PTW', sheetName);
        }
        if (!ptwData.createdAt) {
            ptwData.createdAt = new Date();
        }
        if (!ptwData.updatedAt) {
            ptwData.updatedAt = new Date();
        }
        if (!ptwData.status) {
            ptwData.status = 'قيد المراجعة';
        }
        
        return appendToSheet(sheetName, ptwData);
    } catch (error) {
        Logger.log('Error in addPTWToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة التصريح: ' + error.toString() };
    }
}

/**
 * تحديث تصريح عمل
 */
function updatePTW(ptwId, updateData) {
    try {
        if (!ptwId) {
            return { success: false, message: 'معرف التصريح غير محدد' };
        }
        
        const sheetName = 'PTW';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const ptwIndex = data.findIndex(ptw => ptw.id === ptwId);
        
        if (ptwIndex === -1) {
            return { success: false, message: 'التصريح غير موجود' };
        }

        const merged = Object.assign({}, data[ptwIndex], updateData || {});
        const iaReject = validatePtwApproversAgainstIssuingAuthorities_(merged);
        if (iaReject && iaReject.valid === false) {
            return { success: false, message: iaReject.message || 'فشل التحقق من معتمدي تصريح العمل وفق قائمة المصرّح لهم.' };
        }

        // تحديث البيانات
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[ptwIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating PTW: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث التصريح: ' + error.toString() };
    }
}

/**
 * الحصول على تصريح عمل محدد
 */
function getPTW(ptwId) {
    try {
        if (!ptwId) {
            return { success: false, message: 'معرف التصريح غير محدد' };
        }
        
        const sheetName = 'PTW';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const ptw = data.find(p => p.id === ptwId);
        
        if (!ptw) {
            return { success: false, message: 'التصريح غير موجود' };
        }
        
        return { success: true, data: ptw };
    } catch (error) {
        Logger.log('Error getting PTW: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة التصريح: ' + error.toString() };
    }
}

/**
 * الحصول على جميع تصاريح العمل
 */
function getAllPTWs(filters = {}) {
    try {
        const sheetName = 'PTW';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.department) {
            data = data.filter(ptw => ptw.department === filters.department);
        }
        if (filters.location) {
            data = data.filter(ptw => ptw.location === filters.location);
        }
        if (filters.workType) {
            data = data.filter(ptw => ptw.workType === filters.workType);
        }
        if (filters.status) {
            data = data.filter(ptw => ptw.status === filters.status);
        }
        if (filters.responsible) {
            data = data.filter(ptw => ptw.responsible === filters.responsible);
        }
        if (filters.startDate) {
            data = data.filter(ptw => {
                if (!ptw.startDate) return false;
                return new Date(ptw.startDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(ptw => {
                if (!ptw.endDate) return false;
                return new Date(ptw.endDate) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب تاريخ البدء
        data.sort((a, b) => {
            const dateA = new Date(a.startDate || a.createdAt || 0);
            const dateB = new Date(b.startDate || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all PTWs: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة التصاريح: ' + error.toString(), data: [] };
    }
}

/**
 * حذف تصريح عمل
 */
function deletePTW(ptwId, userData) {
    try {
        if (typeof checkAdminPermissions !== 'function' || !checkAdminPermissions(userData || {})) {
            return {
                success: false,
                message: 'ليس لديك صلاحية الحذف. الحذف متاح لمدير النظام فقط.',
                errorCode: 'DELETE_ADMIN_ONLY'
            };
        }
        if (!ptwId) {
            return { success: false, message: 'معرف التصريح غير محدد' };
        }
        
        const sheetName = 'PTW';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(ptw => ptw.id !== ptwId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'التصريح غير موجود' };
        }
        
        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting PTW: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف التصريح: ' + error.toString() };
    }
}

/**
 * الحصول على التصاريح المنتهية أو المستحقة
 */
function getPTWAlerts() {
    try {
        const sheetName = 'PTW';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const now = new Date();
        
        const alerts = {
            expired: [],
            expiringSoon: [],
            pendingApproval: []
        };
        
        data.forEach(ptw => {
            // التصاريح المنتهية
            if (ptw.endDate) {
                const endDate = new Date(ptw.endDate);
                if (endDate < now && ptw.status !== 'منتهي' && ptw.status !== 'مكتمل') {
                    alerts.expired.push(ptw);
                } else if (endDate >= now && endDate <= new Date(now.getTime() + 24 * 60 * 60 * 1000)) {
                    // تنتهي خلال 24 ساعة
                    alerts.expiringSoon.push(ptw);
                }
            }
            
            // التصاريح قيد المراجعة
            if (ptw.status === 'قيد المراجعة' || ptw.status === 'Pending') {
                alerts.pendingApproval.push(ptw);
            }
        });
        
        return { success: true, data: alerts };
    } catch (error) {
        Logger.log('Error getting PTW alerts: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء الحصول على التنبيهات: ' + error.toString() };
    }
}

/**
 * تنظيف السجلات المكررة واليتيمة التي تتجاوز المعرف 1399 من جدول PTWRegistry
 */
function cleanupPtwRegistryDatabase_() {
    var spreadsheetId = getSpreadsheetId();
    var regSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('PTWRegistry');
    
    var regData = readFromSheet('PTWRegistry', spreadsheetId);
    
    var maxValidId = 1399;
    var rowsToKeep = [];
    var headers = regSheet.getDataRange().getValues()[0];
    
    var seenPermitIds = {};
    var seenIds = {};
    
    for (var i = 0; i < regData.length; i++) {
        var row = regData[i];
        if (!row) continue;
        var pid = String(row.permitId || '').trim();
        var id = String(row.id || '').trim();
        
        var pidNum = extractNumericFromPrefixedId_(pid, 'PTW');
        var idNum = extractNumericFromPrefixedId_(id, 'REG');
        
        // 1. استبعاد أي سجل يتجاوز 1399
        if (pidNum !== null && pidNum > maxValidId) continue;
        if (idNum !== null && idNum > maxValidId) continue;
        
        // 2. معالجة التكرار
        var isManual = row.isManualEntry === true || row.isManualEntry === 'true' || row.approvalCircuitOwnerId === '__manual__';
        
        if (isManual) {
            // للتصاريح اليدوية، يجب أن يكون المعرف REG_XXX فريداً
            if (id && seenIds[id]) continue;
            if (id) seenIds[id] = true;
            rowsToKeep.push(row);
        } else {
            // للتصاريح العادية، يجب أن يكون permitId فريداً
            if (pid && seenPermitIds[pid]) continue;
            if (pid) {
                seenPermitIds[pid] = true;
                rowsToKeep.push(row);
            }
        }
    }
    
    Logger.log('PTWRegistry original rows: ' + regData.length);
    Logger.log('PTWRegistry rows to keep: ' + rowsToKeep.length);
    
    regSheet.clearContents();
    
    var outputValues = [headers];
    for (var j = 0; j < rowsToKeep.length; j++) {
        var rowObj = rowsToKeep[j];
        var rowVal = [];
        for (var h = 0; h < headers.length; h++) {
            var val = rowObj[headers[h]];
            rowVal.push(val !== undefined ? val : '');
        }
        outputValues.push(rowVal);
    }
    
    regSheet.getRange(1, 1, outputValues.length, headers.length).setValues(outputValues);
    invalidateHseSheetCaches('PTWRegistry');
    
    return {
        success: true,
        originalCount: regData.length,
        newCount: rowsToKeep.length,
        deletedCount: regData.length - rowsToKeep.length
    };
}

