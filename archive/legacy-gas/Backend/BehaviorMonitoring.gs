/**
 * Google Apps Script for HSE System - Behavior Monitoring Module
 * 
 * موديول مراقبة السلوك - النسخة المنفصلة والمحسنة
 * 
 * هذا الموديول يتعامل مع:
 * - إضافة سجلات مراقبة السلوك
 * - تحديث السجلات
 * - الحصول على السجلات مع فلاتر متقدمة
 */

/**
 * توحيد مفاتيح الصفوف القادمة من الجدول (رؤوس عربية / أسماء بديلة) مع الحقول القياسية.
 * @param {Object} row
 * @returns {Object}
 */
function normalizeBehaviorSheetRow_(row) {
    if (!row || typeof row !== 'object') return row;
    var out = {};
    for (var k in row) {
        if (row.hasOwnProperty(k)) out[k] = row[k];
    }
    function first(keys) {
        for (var i = 0; i < keys.length; i++) {
            var kk = keys[i];
            if (!row.hasOwnProperty(kk)) continue;
            var v = row[kk];
            if (v !== undefined && v !== null && String(v).trim() !== '') return v;
        }
        return null;
    }
    function fill(canon, keys) {
        var v = first(keys);
        if (v === null) return;
        if (out[canon] === undefined || out[canon] === null || String(out[canon]).trim() === '') {
            out[canon] = v;
        }
    }
    fill('isoCode', ['isoCode', 'ISO', 'IsoCode', 'كود ISO']);
    fill('employeeCode', ['employeeCode', 'الكود الوظيفي', 'EmployeeCode']);
    fill('employeeNumber', ['employeeNumber', 'employeeCode', 'الكود الوظيفي']);
    fill('employeeName', ['employeeName', 'اسم الموظف', 'EmployeeName']);
    fill('department', ['department', 'القسم', 'employeeDepartment', 'Department']);
    fill('job', ['job', 'position', 'الوظيفة', 'المسمى الوظيفي', 'jobTitle', 'Position']);
    fill('factory', ['factory', 'factoryId', 'Factory', 'FactoryId']);
    fill('factoryId', ['factoryId', 'factory']);
    fill('factoryName', ['factoryName', 'اسم المصنع', 'المصنع', 'الموقع', 'موقع العمل', 'siteName', 'Site']);
    fill('subLocation', ['subLocation', 'subLocationId', 'SubLocation']);
    fill('subLocationId', ['subLocationId', 'subLocation']);
    fill('subLocationName', ['subLocationName', 'الموقع الفرعي', 'موقع فرعي', 'المكان', 'SubLocationName']);
    fill('behaviorType', ['behaviorType', 'نوع التصرف', 'Type']);
    fill('rating', ['rating', 'التقييم']);
    fill('description', ['description', 'الوصف', 'ملاحظات', 'Notes', 'Description', 'details']);
    fill('correctiveAction', ['correctiveAction', 'الإجراء التصحيحي']);
    fill('correctiveActionDetails', ['correctiveActionDetails', 'تفاصيل الإجراء']);
    fill('date', ['date', 'Date', 'التاريخ', 'behaviorDate']);
    fill('photo', ['photo', 'صورة', 'Photo', 'image']);
    return out;
}

/**
 * ============================================
 * إضافة سجل مراقبة سلوك
 * ============================================
 * 
 * @param {Object} behaviorData - بيانات السجل
 * @returns {Object} نتيجة العملية
 */
function addBehaviorToSheet(behaviorData) {
    try {
        if (!behaviorData) {
            return { success: false, message: 'بيانات السجل غير موجودة' };
        }
        
        const sheetName = 'BehaviorMonitoring';
        
        // إضافة حقول تلقائية
        if (!behaviorData.id) {
            behaviorData.id = generateSequentialId('BHM', sheetName);
        }
        if (!behaviorData.createdAt) {
            behaviorData.createdAt = new Date();
        }
        if (!behaviorData.updatedAt) {
            behaviorData.updatedAt = new Date();
        }
        
        return appendToSheet(sheetName, behaviorData);
    } catch (error) {
        Logger.log('Error in addBehaviorToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة السجل: ' + error.toString() };
    }
}

/**
 * ============================================
 * تحديث سجل مراقبة سلوك
 * ============================================
 * 
 * @param {String} behaviorId - معرف السجل
 * @param {Object} updateData - البيانات المحدثة
 * @returns {Object} نتيجة العملية
 */
function updateBehavior(behaviorId, updateData) {
    try {
        if (!behaviorId) {
            return { success: false, message: 'معرف السجل غير محدد' };
        }
        
        const sheetName = 'BehaviorMonitoring';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const behaviorIndex = data.findIndex(b => b.id === behaviorId);
        
        if (behaviorIndex === -1) {
            return { success: false, message: 'السجل غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[behaviorIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating behavior: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث السجل: ' + error.toString() };
    }
}

/**
 * ============================================
 * الحصول على جميع سجلات مراقبة السلوك
 * ============================================
 * 
 * @param {Object} filters - فلاتر البحث (اختياري)
 * @param {String} filters.employeeId - معرف الموظف
 * @param {String} filters.behaviorType - نوع السلوك
 * @param {Date} filters.startDate - تاريخ البداية
 * @param {Date} filters.endDate - تاريخ النهاية
 * @returns {Object} نتيجة العملية مع قائمة السجلات
 */
function getAllBehaviors(filters = {}) {
    try {
        const sheetName = 'BehaviorMonitoring';
        var raw = readFromSheet(sheetName, getSpreadsheetId());
        let data = (raw || []).map(function (row) { return normalizeBehaviorSheetRow_(row); });
        
        // تطبيق الفلاتر
        if (filters.employeeId) {
            data = data.filter(b => b.employeeId === filters.employeeId);
        }
        if (filters.behaviorType) {
            data = data.filter(b => b.behaviorType === filters.behaviorType);
        }
        if (filters.startDate) {
            data = data.filter(b => {
                if (!b.date) return false;
                return new Date(b.date) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(b => {
                if (!b.date) return false;
                return new Date(b.date) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب التاريخ
        data.sort((a, b) => {
            const dateA = new Date(a.date || a.createdAt || 0);
            const dateB = new Date(b.date || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all behaviors: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة السجلات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * الحصول على سجل مراقبة سلوك محدد
 * ============================================
 * 
 * @param {String} behaviorId - معرف السجل
 * @returns {Object} نتيجة العملية مع بيانات السجل
 */
function getBehavior(behaviorId) {
    try {
        if (!behaviorId) {
            return { success: false, message: 'معرف السجل غير محدد' };
        }
        
        const sheetName = 'BehaviorMonitoring';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const behavior = data.find(b => b.id === behaviorId);
        
        if (!behavior) {
            return { success: false, message: 'السجل غير موجود' };
        }
        
        return { success: true, data: normalizeBehaviorSheetRow_(behavior) };
    } catch (error) {
        Logger.log('Error getting behavior: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة السجل: ' + error.toString() };
    }
}

/**
 * ============================================
 * حذف سجل مراقبة سلوك
 * ============================================
 * 
 * @param {String} behaviorId - معرف السجل
 * @returns {Object} نتيجة العملية
 */
function deleteBehavior(behaviorId) {
    try {
        if (!behaviorId) {
            return { success: false, message: 'معرف السجل غير محدد' };
        }

        // حذف الصف فعلياً من الورقة — saveToSheet لا يحذف الصفوف (upsert فقط)
        return deleteRowById('BehaviorMonitoring', String(behaviorId).trim(), getSpreadsheetId());
    } catch (error) {
        Logger.log('Error deleting behavior: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف السجل: ' + error.toString() };
    }
}

// ===== تصرفات المقاولين — ورقة ContractorBehaviorMonitoring (منفصلة عن الموظفين) =====

/**
 * توحيد مفاتيح صف ورقة تصرفات المقاولين.
 * @param {Object} row
 * @returns {Object}
 */
function normalizeContractorBehaviorSheetRow_(row) {
    if (!row || typeof row !== 'object') return row;
    var out = {};
    for (var k in row) {
        if (row.hasOwnProperty(k)) out[k] = row[k];
    }
    function first(keys) {
        for (var i = 0; i < keys.length; i++) {
            var kk = keys[i];
            if (!row.hasOwnProperty(kk)) continue;
            var v = row[kk];
            if (v !== undefined && v !== null && String(v).trim() !== '') return v;
        }
        return null;
    }
    function fill(canon, keys) {
        var v = first(keys);
        if (v === null) return;
        if (out[canon] === undefined || out[canon] === null || String(out[canon]).trim() === '') {
            out[canon] = v;
        }
    }
    fill('isoCode', ['isoCode', 'ISO', 'IsoCode', 'كود ISO']);
    fill('contractorId', ['contractorId', 'ContractorId', 'معرف المقاول']);
    fill('contractorName', ['contractorName', 'اسم المقاول', 'ContractorName', 'companyName']);
    fill('contractorWorker', ['contractorWorker', 'عامل المقاول', 'اسم العامل', 'ContractorWorker']);
    fill('department', ['department', 'القسم', 'Department', 'contractorDepartment']);
    fill('job', ['job', 'position', 'الوظيفة', 'المسمى الوظيفي', 'jobTitle', 'Position', 'contractorPosition']);
    fill('factory', ['factory', 'factoryId', 'Factory', 'FactoryId']);
    fill('factoryId', ['factoryId', 'factory']);
    fill('factoryName', ['factoryName', 'اسم المصنع', 'المصنع', 'الموقع', 'موقع العمل', 'siteName', 'Site']);
    fill('subLocation', ['subLocation', 'subLocationId', 'SubLocation']);
    fill('subLocationId', ['subLocationId', 'subLocation']);
    fill('subLocationName', ['subLocationName', 'الموقع الفرعي', 'موقع فرعي', 'المكان', 'SubLocationName']);
    fill('behaviorType', ['behaviorType', 'نوع التصرف', 'Type']);
    fill('rating', ['rating', 'التقييم']);
    fill('description', ['description', 'الوصف', 'ملاحظات', 'Notes', 'Description', 'details']);
    fill('correctiveAction', ['correctiveAction', 'الإجراء التصحيحي']);
    fill('correctiveActionDetails', ['correctiveActionDetails', 'تفاصيل الإجراء']);
    fill('date', ['date', 'Date', 'التاريخ', 'behaviorDate']);
    fill('photo', ['photo', 'صورة', 'Photo', 'image']);
    return out;
}

function addContractorBehaviorToSheet(behaviorData) {
    try {
        if (!behaviorData) {
            return { success: false, message: 'بيانات السجل غير موجودة' };
        }
        var sheetName = 'ContractorBehaviorMonitoring';
        if (!behaviorData.id) {
            behaviorData.id = generateSequentialId('BHC', sheetName);
        }
        if (!behaviorData.createdAt) {
            behaviorData.createdAt = new Date();
        }
        if (!behaviorData.updatedAt) {
            behaviorData.updatedAt = new Date();
        }
        return appendToSheet(sheetName, behaviorData);
    } catch (error) {
        Logger.log('Error in addContractorBehaviorToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة سجل المقاول: ' + error.toString() };
    }
}

function updateContractorBehavior(behaviorId, updateData) {
    try {
        if (!behaviorId) {
            return { success: false, message: 'معرف السجل غير محدد' };
        }
        var sheetName = 'ContractorBehaviorMonitoring';
        var spreadsheetId = getSpreadsheetId();
        var data = readFromSheet(sheetName, spreadsheetId);
        var behaviorIndex = data.findIndex(function (b) { return b.id === behaviorId; });
        if (behaviorIndex === -1) {
            return { success: false, message: 'السجل غير موجود' };
        }
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[behaviorIndex][key] = updateData[key];
            }
        }
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating contractor behavior: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث السجل: ' + error.toString() };
    }
}

function getAllContractorBehaviors(filters) {
    try {
        filters = filters || {};
        var sheetName = 'ContractorBehaviorMonitoring';
        var raw = readFromSheet(sheetName, getSpreadsheetId());
        var data = (raw || []).map(function (row) { return normalizeContractorBehaviorSheetRow_(row); });
        if (filters.contractorId) {
            data = data.filter(function (b) { return b.contractorId === filters.contractorId; });
        }
        if (filters.behaviorType) {
            data = data.filter(function (b) { return b.behaviorType === filters.behaviorType; });
        }
        if (filters.startDate) {
            data = data.filter(function (b) {
                if (!b.date) return false;
                return new Date(b.date) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(function (b) {
                if (!b.date) return false;
                return new Date(b.date) <= new Date(filters.endDate);
            });
        }
        data.sort(function (a, b) {
            var dateA = new Date(a.date || a.createdAt || 0);
            var dateB = new Date(b.date || b.createdAt || 0);
            return dateB - dateA;
        });
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting contractor behaviors: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة السجلات: ' + error.toString(), data: [] };
    }
}

function getContractorBehavior(behaviorId) {
    try {
        if (!behaviorId) {
            return { success: false, message: 'معرف السجل غير محدد' };
        }
        var sheetName = 'ContractorBehaviorMonitoring';
        var data = readFromSheet(sheetName, getSpreadsheetId());
        var behavior = data.find(function (b) { return b.id === behaviorId; });
        if (!behavior) {
            return { success: false, message: 'السجل غير موجود' };
        }
        return { success: true, data: normalizeContractorBehaviorSheetRow_(behavior) };
    } catch (error) {
        Logger.log('Error getting contractor behavior: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة السجل: ' + error.toString() };
    }
}

function deleteContractorBehavior(behaviorId) {
    try {
        if (!behaviorId) {
            return { success: false, message: 'معرف السجل غير محدد' };
        }
        // حذف الصف فعلياً من الورقة — saveToSheet لا يحذف الصفوف (upsert فقط)
        return deleteRowById('ContractorBehaviorMonitoring', String(behaviorId).trim(), getSpreadsheetId());
    } catch (error) {
        Logger.log('Error deleting contractor behavior: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف السجل: ' + error.toString() };
    }
}

/**
 * حذف جماعي لسجلات مراقبة سلوك الموظفين من الورقة (يحذف الصفوف فعلياً).
 * @param {Array<String>} ids - قائمة معرفات السجلات المراد حذفها
 * @returns {Object} نتيجة العملية
 */
function deleteBehaviorsBatch(ids) {
    try {
        if (!ids || !Array.isArray(ids)) {
            return { success: false, message: 'معرفات غير صالحة' };
        }
        return deleteBehaviorRowsFromSheet_('BehaviorMonitoring', ids);
    } catch (error) {
        Logger.log('Error in deleteBehaviorsBatch: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف السجلات: ' + error.toString() };
    }
}

/**
 * حذف جماعي لسجلات تصرفات المقاولين من الورقة (يحذف الصفوف فعلياً).
 * @param {Array<String>} ids - قائمة معرفات السجلات المراد حذفها
 * @returns {Object} نتيجة العملية
 */
function deleteContractorBehaviorsBatch(ids) {
    try {
        if (!ids || !Array.isArray(ids)) {
            return { success: false, message: 'معرفات غير صالحة' };
        }
        return deleteBehaviorRowsFromSheet_('ContractorBehaviorMonitoring', ids);
    } catch (error) {
        Logger.log('Error in deleteContractorBehaviorsBatch: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف السجلات: ' + error.toString() };
    }
}

/**
 * تنفيذ الحذف الجماعي عبر deleteRowById مع جمع النتائج.
 * @param {String} sheetName - اسم الورقة
 * @param {Array<String>} ids - قائمة المعرفات
 * @returns {Object} نتيجة العملية
 */
function deleteBehaviorRowsFromSheet_(sheetName, ids) {
    var spreadsheetId = getSpreadsheetId();
    var deletedCount = 0;
    var notFoundCount = 0;
    var realErrors = [];
    for (var i = 0; i < ids.length; i++) {
        var id = String(ids[i] || '').trim();
        if (!id) continue;
        try {
            var res = deleteRowById(sheetName, id, spreadsheetId);
            if (res && res.success) {
                deletedCount++;
                continue;
            }
            var msg = (res && res.message) || 'خطأ غير معروف';
            if (String(msg).indexOf('غير موجود') !== -1) {
                notFoundCount++;
            } else {
                realErrors.push(id + ': ' + msg);
            }
        } catch (err) {
            realErrors.push(id + ': ' + err.toString());
        }
    }
    return {
        success: realErrors.length === 0,
        deletedCount: deletedCount,
        notFoundCount: notFoundCount,
        realErrors: realErrors,
        message: 'تم حذف ' + deletedCount + ' سجل' + (notFoundCount ? ' — ' + notFoundCount + ' غير موجود' : '') + (realErrors.length ? ' — ' + realErrors.length + ' فشل' : '')
    };
}

/**
 * ============================================
 * الحصول على تكوين نموذج الملاحظات العامة (المصانع والمواقع الفرعية)
 * ============================================
 */
function getBehaviorMonitoringPublicConfig() {
    try {
        var factories = [];
        try {
            if (typeof readFromSheet === 'function') {
                var facData = readFromSheet('Factories', getSpreadsheetId()) || [];
                factories = facData.map(function(f) {
                    return { id: f.id || '', name: f.name || f.factoryName || '' };
                }).filter(function(f) { return f.name; });
            }
        } catch (e) {}

        if (!factories.length) {
            factories = [
                { id: 'FAC-1', name: 'مصنع الأغذية الرئيسي' },
                { id: 'FAC-2', name: 'مصنع المخبوزات والحلويات' },
                { id: 'FAC-3', name: 'المستودعات والخدمات اللوجستية' }
            ];
        }

        return {
            success: true,
            factories: factories,
            categories: [
                { id: 'unsafe_act', name: 'سلوك غير آمن (Unsafe Act)', color: '#ef4444', icon: 'fa-user-times' },
                { id: 'unsafe_condition', name: 'حالة غير آمنة (Unsafe Condition)', color: '#f59e0b', icon: 'fa-exclamation-triangle' },
                { id: 'safe_behavior', name: 'سلوك آمن وإيجابي (Safe Behavior)', color: '#10b981', icon: 'fa-check-circle' },
                { id: 'environmental', name: 'ملاحظة بيئية (Environmental)', color: '#06b6d4', icon: 'fa-leaf' }
            ]
        };
    } catch (err) {
        return { success: false, message: err.toString() };
    }
}


