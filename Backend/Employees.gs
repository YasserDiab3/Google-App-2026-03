/**
 * Google Apps Script for HSE System - Employees Module
 * 
 * موديول الموظفين - النسخة المحسنة
 */

/**
 * ============================================
 * Employees Cache Helpers (ScriptProperties + CacheService)
 * - هدفها تقليل وقت getAllEmployees/readFromSheet المتكرر
 * - يتم "كسر" الكاش عند أي تعديل (إضافة/تحديث/حذف)
 * ============================================
 */
function _getEmployeesCacheVersion_() {
    try {
        const props = PropertiesService.getScriptProperties();
        const v = props.getProperty('employees_cache_v');
        return v ? String(v) : '1';
    } catch (e) {
        return '1';
    }
}

function _bumpEmployeesCacheVersion_() {
    try {
        const props = PropertiesService.getScriptProperties();
        const current = Number(props.getProperty('employees_cache_v') || '1');
        const next = String((isNaN(current) ? 1 : current) + 1);
        props.setProperty('employees_cache_v', next);
        // لا نعتمد على إزالة جميع المفاتيح (غير متاحة)، النسخة تكسر الكاش تلقائياً
        return next;
    } catch (e) {
        return null;
    }
}

function _stableStringify_(obj) {
    try {
        if (!obj || typeof obj !== 'object') return JSON.stringify(obj || {});
        const keys = Object.keys(obj).sort();
        const normalized = {};
        for (var i = 0; i < keys.length; i++) {
            normalized[keys[i]] = obj[keys[i]];
        }
        return JSON.stringify(normalized);
    } catch (e) {
        return JSON.stringify(obj || {});
    }
}

/**
 * إضافة موظف
 */
function addEmployeeToSheet(employeeData) {
    try {
        if (!employeeData) {
            return { success: false, message: 'بيانات الموظف غير موجودة' };
        }
        
        const sheetName = 'Employees';
        
        // إضافة حقول تلقائية
        if (!employeeData.id) {
            employeeData.id = generateSequentialId('EMP', sheetName);
        }
        if (!employeeData.createdAt) {
            employeeData.createdAt = new Date();
        }
        if (!employeeData.updatedAt) {
            employeeData.updatedAt = new Date();
        }
        
        const result = appendToSheet(sheetName, employeeData);
        // كسر كاش الموظفين بعد الإضافة
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
        }
        return result;
    } catch (error) {
        Logger.log('Error in addEmployeeToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الموظف: ' + error.toString() };
    }
}

/**
 * تحديث موظف
 */
function updateEmployee(employeeId, updateData) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'Employees';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const employeeIndex = data.findIndex(e => e.id === employeeId);
        
        if (employeeIndex === -1) {
            return { success: false, message: 'الموظف غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[employeeIndex][key] = updateData[key];
            }
        }
        
        const result = saveToSheet(sheetName, data, spreadsheetId);
        // كسر كاش الموظفين بعد التحديث
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
        }
        return result;
    } catch (error) {
        Logger.log('Error updating employee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الموظف: ' + error.toString() };
    }
}

/**
 * الحصول على موظف محدد
 */
function getEmployee(employeeId) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'Employees';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        
        // البحث بالـ ID أو employeeNumber أو sapId
        const employee = data.find(e => 
            e.id === employeeId || 
            e.employeeNumber === employeeId || 
            e.sapId === employeeId
        );
        
        if (!employee) {
            return { success: false, message: 'الموظف غير موجود' };
        }
        
        return { success: true, data: employee };
    } catch (error) {
        Logger.log('Error getting employee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الموظف: ' + error.toString() };
    }
}

/**
 * الحصول على جميع الموظفين
 */
function getAllEmployees(filters = {}) {
    try {
        const sheetName = 'Employees';

        // كسر كاش قبل أي قراءة — مرة واحدة بعد إصلاح العرض
        try {
            const props = PropertiesService.getScriptProperties();
            if (props.getProperty('employees_ui_restore_v4') !== '1') {
                try { _bumpEmployeesCacheVersion_(); } catch (_b0) {}
                try { invalidateHseSheetCaches('Employees'); } catch (_i0) {}
                props.setProperty('employees_ui_restore_v4', '1');
            }
            if (props.getProperty('employees_names_stable_v1') !== '1') {
                try { _bumpEmployeesCacheVersion_(); } catch (_b1) {}
                try { invalidateHseSheetCaches('Employees'); } catch (_i1) {}
                props.setProperty('employees_names_stable_v1', '1');
            }
        } catch (_preCacheErr) {}

        // ✅ الكاش أولاً بعد كسر النسخة القديمة
        var cacheKey = null;
        try {
            const cache = CacheService.getScriptCache();
            const v = _getEmployeesCacheVersion_();
            cacheKey = 'hse_employees_all_v' + v + '_f:' + _stableStringify_(filters || {});
            const cached = cache.get(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed && parsed.success === true && Array.isArray(parsed.data)) {
                    var cachedData = parsed.data;
                    if (typeof normalizeEmployeesRowColumnDrift_ === 'function') {
                        cachedData = cachedData.map(function(row) {
                            return normalizeEmployeesRowColumnDrift_(row);
                        });
                    }
                    return { success: true, data: cachedData, count: cachedData.length, source: 'cache' };
                }
            }
        } catch (eCacheRead) {
            // ignore cache errors - fall back to sheet read
        }

        // صيانة لمرة واحدة فقط عند غياب الكاش
        try { maybeRepairEmployeesColumnDriftOnce_(); } catch (_driftRepairErr) {}

        let data = readFromSheet(sheetName, getSpreadsheetId());

        // تطبيع انزلاق أعمدة على كل صف قبل أي تصفية (status=تاريخ / resignationDate=رقم)
        if (typeof normalizeEmployeesRowColumnDrift_ === 'function') {
            data = (data || []).map(function(row) {
                return normalizeEmployeesRowColumnDrift_(row);
            });
        }
        
        // ✅ تصفية الموظفين النشطين فقط (ما لم يُطلب خلاف ذلك)
        // مهم: أي status غير inactive الصريح يُعرض (تواريخ منزلقة كانت تخفي الجميع)
        if (filters.includeInactive !== true) {
            data = data.filter(e => {
                if (!e) return false;
                const raw = String(e.status === undefined || e.status === null ? '' : e.status).trim().toLowerCase();
                if (raw === 'inactive' || raw === 'غير نشط' || raw === 'false' || raw === '0') {
                    return false;
                }
                if (raw === '' || raw === 'active' || raw === 'نشط' || raw === 'true' || raw === '1') return true;
                if (e.status === true || e.status === 1) return true;
                // status منزلق (تاريخ/رقم) → اعتبره نشطاً
                return true;
            });
        }
        
        // تطبيق الفلاتر
        if (filters.department) {
            data = data.filter(e => e.department === filters.department);
        }
        if (filters.branch) {
            data = data.filter(e => e.branch === filters.branch);
        }
        if (filters.location) {
            data = data.filter(e => e.location === filters.location);
        }
        if (filters.position) {
            data = data.filter(e => e.position === filters.position);
        }
        if (filters.job) {
            data = data.filter(e => e.job === filters.job);
        }
        if (filters.gender) {
            data = data.filter(e => e.gender === filters.gender);
        }
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            data = data.filter(e => 
                (e.name && e.name.toLowerCase().includes(searchTerm)) ||
                (e.employeeNumber && e.employeeNumber.toLowerCase().includes(searchTerm)) ||
                (e.email && e.email.toLowerCase().includes(searchTerm))
            );
        }
        
        // ترتيب حسب الاسم
        data.sort((a, b) => {
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });

        const result = { success: true, data: data, count: data.length };

        // حفظ في الكاش — 10 دقائق (يُكسر فوراً عند bump بعد كتابة)
        try {
            if (cacheKey) {
                const cache = CacheService.getScriptCache();
                cache.put(cacheKey, JSON.stringify(result), 600);
            }
        } catch (eCacheWrite) {
            // ignore
        }

        return result;
    } catch (error) {
        Logger.log('Error getting all employees: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الموظفين: ' + error.toString(), data: [] };
    }
}

/**
 * إلغاء تفعيل موظف (Soft Delete) - بدلاً من الحذف الكامل
 * ✅ يتم تعطيل الموظف بدلاً من حذفه من قاعدة البيانات
 */
function deactivateEmployee(employeeId) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'Employees';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        // ✅ استخدام updateSingleRowInSheet بدلاً من قراءة وكتابة الشيت بالكامل
        const updateData = {
            status: 'inactive',
            resignationDate: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
            updatedAt: new Date().toISOString()
        };
        
        const result = updateSingleRowInSheet(sheetName, employeeId, updateData, spreadsheetId);
        
        // كسر كاش الموظفين بعد التحديث
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
        }
        return result;
    } catch (error) {
        Logger.log('Error deactivating employee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إلغاء تفعيل الموظف: ' + error.toString() };
    }
}

/**
 * حذف موظف (Hard Delete) - محفوظ للتوافق مع الكود القديم
 * ⚠️ يُنصح باستخدام deactivateEmployee بدلاً من هذه الدالة
 * @deprecated استخدم deactivateEmployee بدلاً من هذه الدالة
 */
function deleteEmployee(employeeId) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'Employees';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        // ✅ استخدام deleteRowById لحذف صف واحد بسرعة
        const result = deleteRowById(sheetName, employeeId, spreadsheetId);
        
        // كسر كاش الموظفين بعد الحذف
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
        }
        return result;
    } catch (error) {
        Logger.log('Error deleting employee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الموظف: ' + error.toString() };
    }
}

/**
 * حذف جميع الموظفين (محمي برقم سري) - عملية خطيرة
 * @param {object} payload - { pin: string }
 */
function deleteAllEmployees(payload) {
    try {
        const pin = payload && (payload.pin || payload.password || payload.secret);
        const verify = verifyEmployeesDeletePin(pin);
        if (!verify.ok) {
            return { success: false, message: verify.message };
        }

        const sheetName = 'Employees';
        const spreadsheetId = getSpreadsheetId();

        // حفظ قائمة فارغة => حذف كل الصفوف (مع إبقاء الهيدر)
        const result = saveToSheet(sheetName, [], spreadsheetId);
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
            return { success: true, message: 'تم حذف جميع بيانات الموظفين بنجاح' };
        }
        return result || { success: false, message: 'فشل حذف بيانات الموظفين' };
    } catch (error) {
        Logger.log('Error in deleteAllEmployees: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف جميع الموظفين: ' + error.toString() };
    }
}

/**
 * إصلاح صفوف Employees التي انزلقت أعمدتها بعد append بترتيب رؤوس افتراضي.
 * يعمل على القيم الخام في الورقة (قبل تطبيع القراءة).
 */
function repairEmployeesColumnDrift(payload) {
    try {
        const spreadsheetId = (payload && payload.spreadsheetId) || getSpreadsheetId();
        if (!spreadsheetId) {
            return { success: false, message: 'معرف الجدول غير محدد' };
        }
        const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        const sheet = spreadsheet.getSheetByName('Employees');
        if (!sheet) {
            return { success: false, message: 'ورقة Employees غير موجودة' };
        }
        const dataRange = sheet.getDataRange();
        if (!dataRange || dataRange.getNumRows() <= 1) {
            return { success: true, message: 'لا توجد صفوف لإصلاحها', repairedCount: 0 };
        }
        const values = dataRange.getValues();
        const headers = values[0].map(function(h) {
            return (h === null || h === undefined) ? '' : String(h).trim();
        });
        let repairedCount = 0;
        for (let r = 1; r < values.length; r++) {
            const obj = {};
            for (let c = 0; c < headers.length; c++) {
                const h = headers[c];
                if (!h) continue;
                obj[h] = values[r][c];
            }
            if (!isEmployeesRowColumnDrifted_(obj)) continue;
            const fixed = normalizeEmployeesRowColumnDrift_(obj);
            const rowVals = headers.map(function(h) {
                if (!h) return '';
                return toSheetCellValue_(h, fixed[h], 'Employees');
            });
            sheet.getRange(r + 1, 1, 1, rowVals.length).setValues([rowVals]);
            repairedCount++;
        }
        try { invalidateHseSheetCaches('Employees'); } catch (_e) {}
        try { _bumpEmployeesCacheVersion_(); } catch (_e2) {}
        SpreadsheetApp.flush();
        return {
            success: true,
            message: repairedCount > 0
                ? ('تم إصلاح ' + repairedCount + ' صف موظف منزلق الأعمدة')
                : 'لا توجد صفوف منزلقة تحتاج إصلاحاً',
            repairedCount: repairedCount
        };
    } catch (error) {
        Logger.log('Error in repairEmployeesColumnDrift: ' + error.toString());
        return { success: false, message: 'فشل إصلاح أعمدة الموظفين: ' + error.toString() };
    }
}

/**
 * تشغيل إصلاح الانزلاق مرة واحدة بعد نشر الإصلاح (ScriptProperties).
 */
function maybeRepairEmployeesColumnDriftOnce_() {
    try {
        const props = PropertiesService.getScriptProperties();
        const mark = 'employees_col_drift_repaired_v2';
        if (props.getProperty(mark) === '1') {
            return { success: true, skipped: true, repairedCount: 0 };
        }
        const result = repairEmployeesColumnDrift({});
        props.setProperty(mark, '1');
        return result;
    } catch (e) {
        Logger.log('maybeRepairEmployeesColumnDriftOnce_: ' + e.toString());
        return { success: false, message: e.toString() };
    }
}

/** تطبيع مفتاح تكرار موظف (رقم وظيفي / SAP / id) */
function _normalizeEmployeeDupKey_(value) {
    if (value === null || value === undefined) return '';
    if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
        return '';
    }
    var s = String(value).trim();
    if (!s) return '';
    if (s === 'active' || s === 'inactive') return '';
    if (typeof looksLikeEmployeeSheetDateValue_ === 'function' && looksLikeEmployeeSheetDateValue_(value)) {
        return '';
    }
    // أرقام شائعة بصيغة 112819 أو 112819.0 من Sheets
    if (/^\d+(\.0+)?$/.test(s)) {
        s = String(parseInt(s, 10));
    }
    return s.toLowerCase();
}

/** درجة اكتمال صف لاختيار الفائز عند التكرار (أعلى = أفضل) */
function _employeeDupRowScore_(obj) {
    if (!obj || typeof obj !== 'object') return -1000;
    var score = 0;
    var fields = [
        'name', 'department', 'job', 'position', 'hireDate', 'birthDate',
        'branch', 'location', 'gender', 'email', 'phone', 'nationalId',
        'insuranceNumber', 'photo', 'sapId'
    ];
    for (var i = 0; i < fields.length; i++) {
        var v = obj[fields[i]];
        if (v !== null && v !== undefined && String(v).trim() !== '') score += 2;
    }
    var st = String(obj.status || '').trim().toLowerCase();
    if (st === 'active' || st === 'inactive' || st === 'نشط' || st === 'غير نشط') score += 6;
    if (typeof looksLikeEmployeeSheetDateValue_ === 'function' && looksLikeEmployeeSheetDateValue_(obj.status)) {
        score -= 12;
    }
    if (typeof isEmployeesRowColumnDrifted_ === 'function' && isEmployeesRowColumnDrifted_(obj)) {
        score -= 10;
    }
    var emp = String(obj.employeeNumber || '').trim();
    var id = String(obj.id || '').trim();
    if (emp && id && emp === id) score += 6;
    if (typeof looksLikeEmployeeSheetDateValue_ === 'function' && looksLikeEmployeeSheetDateValue_(obj.id)) {
        score -= 12;
    }
    if (!String(obj.name || '').trim()) score -= 8;
    if (!_normalizeEmployeeDupKey_(obj.employeeNumber) && !_normalizeEmployeeDupKey_(obj.sapId)) {
        score -= 20;
    }
    return score;
}

/**
 * قراءة صفوف Employees الخام + تطبيع انزلاق للتحليل فقط.
 * لا يكتب في الورقة.
 */
function _loadEmployeesSheetRowsForDupAnalysis_(spreadsheetId) {
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName('Employees');
    if (!sheet) {
        return { ok: false, message: 'ورقة Employees غير موجودة' };
    }
    var dataRange = sheet.getDataRange();
    if (!dataRange || dataRange.getNumRows() <= 1) {
        return {
            ok: true,
            spreadsheet: ss,
            sheet: sheet,
            headers: [],
            rows: [],
            totalRows: 0
        };
    }
    var values = dataRange.getValues();
    var headers = values[0].map(function(h) {
        return (h === null || h === undefined) ? '' : String(h).trim();
    });
    var rows = [];
    for (var r = 1; r < values.length; r++) {
        var raw = {};
        for (var c = 0; c < headers.length; c++) {
            var h = headers[c];
            if (!h) continue;
            raw[h] = values[r][c];
        }
        var normalized = (typeof normalizeEmployeesRowColumnDrift_ === 'function')
            ? normalizeEmployeesRowColumnDrift_(raw)
            : raw;
        rows.push({
            sheetRow: r + 1,
            raw: raw,
            data: normalized
        });
    }
    return {
        ok: true,
        spreadsheet: ss,
        sheet: sheet,
        headers: headers,
        rows: rows,
        totalRows: rows.length
    };
}

/**
 * تحليل مكررات Employees — قراءة فقط.
 * المفتاح الأساسي: employeeNumber ثم sapId للصفوف بدون رقم وظيفي.
 */
function _analyzeEmployeeDuplicates_(spreadsheetId) {
    var loaded = _loadEmployeesSheetRowsForDupAnalysis_(spreadsheetId);
    if (!loaded.ok) return loaded;

    var byKey = {};
    var orphans = [];
    var driftedRows = [];
    var emptyish = [];

    for (var i = 0; i < loaded.rows.length; i++) {
        var row = loaded.rows[i];
        var d = row.data || {};
        if (typeof isEmployeesRowColumnDrifted_ === 'function' && isEmployeesRowColumnDrifted_(row.raw || d)) {
            driftedRows.push(row.sheetRow);
        }
        var empKey = _normalizeEmployeeDupKey_(d.employeeNumber);
        var sapKey = _normalizeEmployeeDupKey_(d.sapId);
        var idKey = _normalizeEmployeeDupKey_(d.id);
        var name = String(d.name || '').trim();
        var key = empKey || sapKey || idKey;
        if (!key) {
            orphans.push({
                sheetRow: row.sheetRow,
                name: name,
                reason: 'no_key'
            });
            if (!name) {
                emptyish.push(row.sheetRow);
            }
            continue;
        }
        if (!byKey[key]) byKey[key] = [];
        byKey[key].push({
            sheetRow: row.sheetRow,
            key: key,
            employeeNumber: String(d.employeeNumber || '').trim(),
            sapId: String(d.sapId || '').trim(),
            id: String(d.id || '').trim(),
            name: name,
            status: String(d.status || '').trim(),
            score: _employeeDupRowScore_(d),
            data: d
        });
    }

    var duplicateGroups = [];
    var rowsToDelete = [];
    var keepRows = [];
    var uniqueKeys = 0;

    Object.keys(byKey).forEach(function(key) {
        var group = byKey[key];
        uniqueKeys++;
        if (group.length === 1) {
            keepRows.push(group[0].sheetRow);
            return;
        }
        group.sort(function(a, b) {
            if (b.score !== a.score) return b.score - a.score;
            return b.sheetRow - a.sheetRow; // الأحدث في الورقة عند التعادل
        });
        var winner = group[0];
        keepRows.push(winner.sheetRow);
        var losers = group.slice(1);
        for (var li = 0; li < losers.length; li++) {
            rowsToDelete.push({
                sheetRow: losers[li].sheetRow,
                key: key,
                name: losers[li].name,
                reason: 'duplicate_of_row_' + winner.sheetRow,
                winnerSheetRow: winner.sheetRow
            });
        }
        duplicateGroups.push({
            key: key,
            count: group.length,
            keepSheetRow: winner.sheetRow,
            keepName: winner.name,
            keepScore: winner.score,
            deleteSheetRows: losers.map(function(x) { return x.sheetRow; })
        });
    });

    // صفوف يتيمة بلا مفتاح وبلا اسم → مرشحة للحذف الآمن
    for (var oi = 0; oi < orphans.length; oi++) {
        if (!orphans[oi].name) {
            rowsToDelete.push({
                sheetRow: orphans[oi].sheetRow,
                key: '',
                name: '',
                reason: 'empty_orphan',
                winnerSheetRow: null
            });
        }
    }

    // إزالة تكرار صفوف الحذف إن وُجد
    var deleteMap = {};
    var uniqueDeletes = [];
    for (var di = 0; di < rowsToDelete.length; di++) {
        var sr = rowsToDelete[di].sheetRow;
        if (deleteMap[sr]) continue;
        deleteMap[sr] = true;
        uniqueDeletes.push(rowsToDelete[di]);
    }
    uniqueDeletes.sort(function(a, b) { return b.sheetRow - a.sheetRow; });

    return {
        ok: true,
        spreadsheet: loaded.spreadsheet,
        sheet: loaded.sheet,
        headers: loaded.headers,
        totalRows: loaded.totalRows,
        uniqueKeys: uniqueKeys,
        duplicateGroupCount: duplicateGroups.length,
        duplicateExtraRows: uniqueDeletes.filter(function(x) { return x.reason.indexOf('duplicate_') === 0; }).length,
        orphanCount: orphans.length,
        emptyOrphanCount: emptyish.length,
        driftedCount: driftedRows.length,
        rowsToDeleteCount: uniqueDeletes.length,
        keepCount: loaded.totalRows - uniqueDeletes.length,
        duplicateGroups: duplicateGroups,
        rowsToDelete: uniqueDeletes,
        orphanSample: orphans.slice(0, 20),
        driftedSample: driftedRows.slice(0, 20)
    };
}

/**
 * تقرير مكررات موظفين — قراءة فقط، لا يوقف الإنتاج ولا يكتب.
 * @param {object} payload - { sampleLimit?: number }
 */
function reportEmployeeDuplicates(payload) {
    try {
        var spreadsheetId = (payload && payload.spreadsheetId) || getSpreadsheetId();
        if (!spreadsheetId) {
            return { success: false, message: 'معرف الجدول غير محدد' };
        }
        var sampleLimit = 25;
        if (payload && payload.sampleLimit) {
            sampleLimit = Math.max(5, Math.min(100, parseInt(payload.sampleLimit, 10) || 25));
        }

        // إصلاح انزلاق خفيف أولاً إن لزم (مرة واحدة) لتحسين دقة المفاتيح — لا يحذف صفوفاً
        try { maybeRepairEmployeesColumnDriftOnce_(); } catch (_e) {}

        var analysis = _analyzeEmployeeDuplicates_(spreadsheetId);
        if (!analysis.ok) {
            return { success: false, message: analysis.message || 'فشل التحليل' };
        }

        var groupsSample = (analysis.duplicateGroups || []).slice(0, sampleLimit).map(function(g) {
            return {
                key: g.key,
                count: g.count,
                keepSheetRow: g.keepSheetRow,
                keepName: g.keepName,
                deleteSheetRows: g.deleteSheetRows
            };
        });
        var deleteSample = (analysis.rowsToDelete || []).slice(0, sampleLimit);

        return {
            success: true,
            message: analysis.rowsToDeleteCount > 0
                ? ('وُجد ' + analysis.duplicateGroupCount + ' مجموعة مكررة — صفوف زائدة للحذف: ' + analysis.rowsToDeleteCount)
                : 'لا توجد مكررات تحتاج تنظيفاً',
            dryRun: true,
            totalRows: analysis.totalRows,
            uniqueKeys: analysis.uniqueKeys,
            duplicateGroupCount: analysis.duplicateGroupCount,
            duplicateExtraRows: analysis.duplicateExtraRows,
            orphanCount: analysis.orphanCount,
            emptyOrphanCount: analysis.emptyOrphanCount,
            driftedCount: analysis.driftedCount,
            rowsToDeleteCount: analysis.rowsToDeleteCount,
            keepCount: analysis.keepCount,
            duplicateGroupsSample: groupsSample,
            rowsToDeleteSample: deleteSample,
            orphanSample: analysis.orphanSample,
            driftedSample: analysis.driftedSample
        };
    } catch (error) {
        Logger.log('Error in reportEmployeeDuplicates: ' + error.toString());
        return { success: false, message: 'فشل تقرير المكررات: ' + error.toString() };
    }
}

/**
 * نسخ احتياطي لورقة Employees داخل نفس الملف قبل الحذف.
 */
function _backupEmployeesSheetInPlace_(spreadsheet, sourceSheet) {
    var ts = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Africa/Cairo', 'yyyyMMdd_HHmmss');
    var backupName = 'Employees_backup_' + ts;
    // تجنّب تعارض الاسم
    var existing = spreadsheet.getSheetByName(backupName);
    if (existing) {
        backupName = backupName + '_' + String(Date.now()).slice(-4);
    }
    var copied = sourceSheet.copyTo(spreadsheet);
    copied.setName(backupName);
    try {
        spreadsheet.setActiveSheet(copied);
        spreadsheet.moveActiveSheet(spreadsheet.getNumSheets());
        spreadsheet.setActiveSheet(sourceSheet);
    } catch (_moveErr) {}
    return backupName;
}

/**
 * تنظيف مكررات Employees بأمان:
 * - افتراضي dryRun=true (لا حذف)
 * - للحذف: pin + execute:true
 * - نسخة احتياطية داخل الملف قبل الحذف
 * - حذف من الأسفل للأعلى فقط للصفوف الزائدة
 * لا يمس أوراق/موديولات أخرى ولا يوقف الإنتاج.
 *
 * @param {object} payload - { pin, execute?: boolean, dryRun?: boolean, alsoDeleteEmptyOrphans?: boolean }
 */
function cleanupDuplicateEmployees(payload) {
    var lock = null;
    try {
        payload = payload || {};
        var execute = payload.execute === true || payload.dryRun === false;
        var dryRun = !execute;

        if (execute) {
            var pin = payload.pin || payload.password || payload.secret;
            var verify = verifyEmployeesDeletePin(pin);
            if (!verify.ok) {
                return { success: false, message: verify.message, dryRun: false };
            }
        }

        var spreadsheetId = payload.spreadsheetId || getSpreadsheetId();
        if (!spreadsheetId) {
            return { success: false, message: 'معرف الجدول غير محدد' };
        }

        // إصلاح انزلاق الأعمدة أولاً (آمن) حتى لا يُحذف صف سليم بالخطأ
        try { repairEmployeesColumnDrift({}); } catch (_repairErr) {}

        var analysis = _analyzeEmployeeDuplicates_(spreadsheetId);
        if (!analysis.ok) {
            return { success: false, message: analysis.message || 'فشل التحليل' };
        }

        var toDelete = analysis.rowsToDelete || [];
        if (payload.alsoDeleteEmptyOrphans === false) {
            toDelete = toDelete.filter(function(x) { return x.reason !== 'empty_orphan'; });
        }

        var summary = {
            success: true,
            dryRun: dryRun,
            totalRows: analysis.totalRows,
            uniqueKeys: analysis.uniqueKeys,
            duplicateGroupCount: analysis.duplicateGroupCount,
            rowsToDeleteCount: toDelete.length,
            keepCount: analysis.totalRows - toDelete.length,
            deletedCount: 0,
            backupSheetName: null,
            duplicateGroupsSample: (analysis.duplicateGroups || []).slice(0, 20).map(function(g) {
                return {
                    key: g.key,
                    count: g.count,
                    keepSheetRow: g.keepSheetRow,
                    keepName: g.keepName,
                    deleteSheetRows: g.deleteSheetRows
                };
            }),
            rowsToDeleteSample: toDelete.slice(0, 25)
        };

        if (toDelete.length === 0) {
            summary.message = 'لا توجد صفوف مكررة/يتيمة للحذف';
            return summary;
        }

        if (dryRun) {
            summary.message = 'معاينة فقط: سيُحذف ' + toDelete.length + ' صفاً ويُبقى ' + summary.keepCount + ' (لم يُحذف شيء)';
            return summary;
        }

        lock = LockService.getScriptLock();
        try {
            lock.waitLock(30000);
        } catch (lockErr) {
            return {
                success: false,
                message: 'الورقة مشغولة حالياً. أعد المحاولة بعد لحظات دون إيقاف النظام.',
                dryRun: false
            };
        }

        var backupName = _backupEmployeesSheetInPlace_(analysis.spreadsheet, analysis.sheet);
        summary.backupSheetName = backupName;

        // حذف من الأسفل للأعلى حتى لا تتزحلق أرقام الصفوف
        toDelete.sort(function(a, b) { return b.sheetRow - a.sheetRow; });
        var deleted = 0;
        for (var i = 0; i < toDelete.length; i++) {
            var rowNum = toDelete[i].sheetRow;
            if (!rowNum || rowNum < 2) continue;
            try {
                analysis.sheet.deleteRow(rowNum);
                deleted++;
            } catch (delErr) {
                Logger.log('cleanupDuplicateEmployees deleteRow ' + rowNum + ': ' + delErr.toString());
            }
        }

        try { invalidateHseSheetCaches('Employees'); } catch (_c1) {}
        try { _bumpEmployeesCacheVersion_(); } catch (_c2) {}
        SpreadsheetApp.flush();

        summary.deletedCount = deleted;
        summary.keepCount = Math.max(0, analysis.totalRows - deleted);
        summary.message = 'تم حذف ' + deleted + ' صف مكرر/يتيم. النسخة الاحتياطية: ' + backupName;
        return summary;
    } catch (error) {
        Logger.log('Error in cleanupDuplicateEmployees: ' + error.toString());
        return { success: false, message: 'فشل تنظيف المكررات: ' + error.toString() };
    } finally {
        if (lock) {
            try { lock.releaseLock(); } catch (_rl) {}
        }
    }
}

/**
 * الحصول على إحصائيات الموظفين
 */
function getEmployeeStatistics(filters = {}) {
    try {
        const allEmployees = getAllEmployees(filters);
        if (!allEmployees.success) {
            return { success: false, message: 'فشل في قراءة الموظفين' };
        }
        
        const employees = allEmployees.data;
        const stats = {
            total: employees.length,
            byDepartment: {},
            byBranch: {},
            byLocation: {},
            byPosition: {},
            byGender: {},
            byJob: {}
        };
        
        employees.forEach(emp => {
            // حسب الإدارة
            if (emp.department) {
                stats.byDepartment[emp.department] = (stats.byDepartment[emp.department] || 0) + 1;
            }
            
            // حسب الفرع
            if (emp.branch) {
                stats.byBranch[emp.branch] = (stats.byBranch[emp.branch] || 0) + 1;
            }
            
            // حسب الموقع
            if (emp.location) {
                stats.byLocation[emp.location] = (stats.byLocation[emp.location] || 0) + 1;
            }
            
            // حسب المنصب
            if (emp.position) {
                stats.byPosition[emp.position] = (stats.byPosition[emp.position] || 0) + 1;
            }
            
            // حسب الجنس
            if (emp.gender) {
                stats.byGender[emp.gender] = (stats.byGender[emp.gender] || 0) + 1;
            }
            
            // حسب الوظيفة
            if (emp.job) {
                stats.byJob[emp.job] = (stats.byJob[emp.job] || 0) + 1;
            }
        });
        
        return { success: true, data: stats };
    } catch (error) {
        Logger.log('Error getting employee statistics: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حساب الإحصائيات: ' + error.toString() };
    }
}

/**
 * إنشاء/جلب token عام لبطاقة الملف الشخصي للمستخدم الحالي
 * payload: { userId, email, forceRotate }
 */
function getOrCreatePublicProfileToken(payload) {
    try {
        const data = payload || {};
        const userId = String(data.userId || '').trim();
        const email = String(data.email || '').trim().toLowerCase();
        const forceRotate = data.forceRotate === true;

        if (!userId && !email) {
            return { success: false, message: 'userId أو email مطلوبان' };
        }

        const sheetName = 'Users';
        const spreadsheetId = getSpreadsheetId();
        const users = readFromSheet(sheetName, spreadsheetId);
        const user = (users || []).find(function(u) {
            if (!u) return false;
            const byId = userId && String(u.id || '').trim() === userId;
            const byEmail = email && String(u.email || '').trim().toLowerCase() === email;
            return byId || byEmail;
        });

        if (!user || !user.id) {
            return { success: false, message: 'المستخدم غير موجود' };
        }

        const now = new Date();
        const existingToken = String(user.profilePublicToken || '').trim();
        const expiryStr = String(user.profilePublicTokenExpiry || '').trim();
        const expiryDate = expiryStr ? new Date(expiryStr) : null;
        const isTokenValid = existingToken && expiryDate && !isNaN(expiryDate.getTime()) && expiryDate.getTime() > now.getTime();

        var token = existingToken;
        var expiresAt = expiryStr;
        if (!isTokenValid || forceRotate) {
            token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '').slice(0, 8);
            expiresAt = new Date(now.getTime() + (180 * 24 * 60 * 60 * 1000)).toISOString();
            const updateResult = updateSingleRowInSheet(sheetName, user.id, {
                profilePublicToken: token,
                profilePublicTokenExpiry: expiresAt,
                updatedAt: new Date()
            }, spreadsheetId);
            if (!updateResult || updateResult.success === false) {
                return { success: false, message: 'فشل حفظ token العام للمستخدم' };
            }
        }

        return {
            success: true,
            data: {
                token: token,
                expiresAt: expiresAt
            }
        };
    } catch (error) {
        Logger.log('Error in getOrCreatePublicProfileToken: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إنشاء token الملف العام: ' + error.toString() };
    }
}

/**
 * تطبيع token من مسح QR (إزالة مسافات/أحرف غير مرئية)
 */
function _profileTokenNormalize_(token) {
    return String(token || '').trim().replace(/[\s\u200B-\u200D\uFEFF]+/g, '');
}

/**
 * تنسيق تاريخ التعيين ومدة الخدمة (للعربية)
 */
function _formatHireAndTenureAr_(hireRaw) {
    if (!hireRaw) {
        return { hireDateDisplay: '', tenureText: '' };
    }
    const d = (hireRaw instanceof Date) ? hireRaw : new Date(hireRaw);
    if (isNaN(d.getTime())) {
        return { hireDateDisplay: '', tenureText: '' };
    }
    const tz = Session.getScriptTimeZone() || 'Etc/GMT';
    const hireDateDisplay = Utilities.formatDate(d, tz, 'dd/MM/yyyy');
    const now = new Date();
    if (d.getTime() > now.getTime()) {
        return { hireDateDisplay: hireDateDisplay, tenureText: '—' };
    }
    var years = now.getFullYear() - d.getFullYear();
    var months = now.getMonth() - d.getMonth();
    var days = now.getDate() - d.getDate();
    if (days < 0) {
        months -= 1;
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }
    if (years < 0) {
        years = 0;
        months = 0;
    }
    const parts = [];
    if (years > 0) {
        parts.push(years + (years === 1 ? ' سنة' : ' سنوات'));
    }
    if (months > 0) {
        parts.push(months + (months === 1 ? ' شهراً' : ' أشهر'));
    }
    if (parts.length === 0) {
        parts.push('أقل من شهر');
    }
    return { hireDateDisplay: hireDateDisplay, tenureText: parts.join(' و') };
}

/**
 * صورة للبطاقة العامة: رفع صورة Drive كـ data URI (تجاوز حظر الربط المباشر)
 */
function _getProfilePhotoDataUriForCard_(photoUrl) {
    if (!photoUrl) {
        return '';
    }
    const s = String(photoUrl);
    if (s.indexOf('drive.google.com') === -1) {
        if (/^https?:\/\//i.test(s)) {
            return s;
        }
        return s;
    }
    const m = s.match(/[?&]id=([^&]+)/) || s.match(/\/file\/d\/([^/]+)/);
    if (!m) {
        return s;
    }
    try {
        const file = DriveApp.getFileById(String(m[1]).trim());
        const blob = file.getBlob();
        const mime = blob.getContentType() || 'image/jpeg';
        if (String(mime).indexOf('image/') !== 0) {
            return '';
        }
        return 'data:' + mime + ';base64,' + Utilities.base64Encode(blob.getBytes());
    } catch (e) {
        Logger.log('_getProfilePhotoDataUriForCard_: ' + e.toString());
        return '';
    }
}

/**
 * أرقام طوارئ المؤسسة النشطة (للبطاقة العامة والملف)
 */
function _loadActiveAppEmergencyNumbers_() {
    const rows = readFromSheet('AppEmergencyNumbers', getSpreadsheetId()) || [];
    const out = [];
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        if (!r) {
            continue;
        }
        const a = r.isActive;
        if (a === false || a === 'false' || a === '0' || a === 0) {
            continue;
        }
        const phone = String(r.phone || '').trim();
        if (!phone) {
            continue;
        }
        out.push({
            label: String(r.label || '').trim(),
            phone: phone,
            sortOrder: Number(r.sortOrder) || 0
        });
    }
    out.sort(function (x, y) {
        return (x.sortOrder - y.sortOrder) || String(x.label).localeCompare(String(y.label), 'ar');
    });
    return out;
}

/**
 * جميع سجلات أرقام الطوارئ (للمدير)
 */
function getAllAppEmergencyNumbers() {
    try {
        const rows = readFromSheet('AppEmergencyNumbers', getSpreadsheetId()) || [];
        const list = rows.map(function (r) {
            if (!r) {
                return null;
            }
            const a = r.isActive;
            const isActive = !(a === false || a === 'false' || a === '0' || a === 0);
            return {
                id: r.id,
                label: r.label,
                phone: r.phone,
                sortOrder: Number(r.sortOrder) || 0,
                isActive: isActive
            };
        }).filter(function (x) {
            return x !== null;
        });
        list.sort(function (a, b) {
            return (a.sortOrder - b.sortOrder) || String(a.label || '').localeCompare(String(b.label || ''), 'ar');
        });
        return { success: true, data: list };
    } catch (error) {
        Logger.log('Error in getAllAppEmergencyNumbers: ' + error.toString());
        return { success: false, message: error.toString(), data: [] };
    }
}

/**
 * إضافة أو تعديل رقم طوارئ مؤسسي (مدير فقط)
 */
function upsertAppEmergencyNumber(payload) {
    try {
        const data = payload || {};
        const userData = data.userData || data;
        if (typeof checkAdminPermissions !== 'function' || !checkAdminPermissions(userData)) {
            return {
                success: false,
                message: 'ليس لديك صلاحية لإدارة أرقام الطوارئ. هذه العملية محجوزة للمدير.',
                errorCode: 'PERMISSION_DENIED'
            };
        }
        const sheetName = 'AppEmergencyNumbers';
        const spreadsheetId = getSpreadsheetId();
        const label = String(data.label || '').trim();
        const phone = String(data.phone || '').trim();
        if (!label || !phone) {
            return { success: false, message: 'يجب إدخال التسمية ورقم الاتصال' };
        }
        const sortOrder = (data.sortOrder != null && data.sortOrder !== '') ? Number(data.sortOrder) : 0;
        const isActive = !(data.isActive === false || data.isActive === 'false' || data.isActive === '0' || data.isActive === 0);
        const id = String(data.id || '').trim();
        const now = new Date();
        if (id) {
            return updateSingleRowInSheet(sheetName, id, {
                label: label,
                phone: phone,
                sortOrder: isNaN(sortOrder) ? 0 : sortOrder,
                isActive: isActive,
                updatedAt: now
            }, spreadsheetId);
        }
        const newId = generateSequentialId('AEN', sheetName, spreadsheetId, 'id');
        return appendToSheet(sheetName, {
            id: newId,
            label: label,
            phone: phone,
            sortOrder: isNaN(sortOrder) ? 0 : sortOrder,
            isActive: isActive,
            createdAt: now,
            updatedAt: now
        });
    } catch (error) {
        Logger.log('Error in upsertAppEmergencyNumber: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * حذف سجل رقم طوارئ (مدير فقط)
 */
function deleteAppEmergencyNumber(payload) {
    try {
        const data = payload || {};
        const userData = data.userData || data;
        if (typeof checkAdminPermissions !== 'function' || !checkAdminPermissions(userData)) {
            return {
                success: false,
                message: 'ليس لديك صلاحية لحذف أرقام الطوارئ.',
                errorCode: 'PERMISSION_DENIED'
            };
        }
        const id = String(data.id || '').trim();
        if (!id) {
            return { success: false, message: 'المعرف مطلوب' };
        }
        return deleteRowById('AppEmergencyNumbers', id, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in deleteAppEmergencyNumber: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * جلب بيانات الملف العام بالاعتماد على token (بيانات محدودة وآمنة)
 */
function getPublicProfileByToken(token) {
    try {
        const tokenValue = _profileTokenNormalize_(token);
        if (!tokenValue) {
            return { success: false, message: 'token مطلوب' };
        }

        const spreadsheetId = getSpreadsheetId();
        const users = readFromSheet('Users', spreadsheetId);
        const now = new Date();
        const user = (users || []).find(function(u) {
            if (!u) return false;
            const t = _profileTokenNormalize_(u.profilePublicToken);
            if (!t || t !== tokenValue) return false;
            const expiry = new Date(String(u.profilePublicTokenExpiry || ''));
            return !!expiry && !isNaN(expiry.getTime()) && expiry.getTime() > now.getTime();
        });

        if (!user) {
            return { success: false, message: 'token غير صالح أو منتهي الصلاحية' };
        }

        const employees = readFromSheet('Employees', spreadsheetId) || [];
        const userEmail = String(user.email || '').trim().toLowerCase();
        const userName = String(user.name || '').trim().toLowerCase();
        const userId = String(user.id || '').trim().toLowerCase();
        const employee = employees.find(function(emp) {
            if (!emp) return false;
            const empEmail = String(emp.email || '').trim().toLowerCase();
            const empName = String(emp.name || '').trim().toLowerCase();
            const empId = String(emp.id || emp.employeeNumber || '').trim().toLowerCase();
            return (userEmail && empEmail && userEmail === empEmail)
                || (userId && empId && userId === empId)
                || (userName && empName && userName === empName);
        }) || {};

        const fullName = String(employee.name || user.name || '').trim();
        const employeeNumber = String(employee.employeeNumber || employee.id || '').trim();
        const department = String(employee.department || user.department || '').trim();
        const position = String(employee.position || employee.job || '').trim();
        const branch = String(employee.branch || '').trim();
        const location = String(employee.location || '').trim();
        const phone = String(employee.phone || '').trim();
        const email = String(employee.email || user.email || '').trim();
        const photo = String(employee.photo || user.photo || '').trim();
        const hireInfo = _formatHireAndTenureAr_(employee.hireDate);
        const photoPublic = _getProfilePhotoDataUriForCard_(photo);
        const emergencyContacts = _loadActiveAppEmergencyNumbers_();

        const norm = function(v) { return String(v || '').trim().toLowerCase(); };
        const matchesProfile = function(record) {
            if (!record) return false;
            const rId = norm(record.employeeId || record.employeeNumber || record.employeeCode || record.id);
            const rName = norm(record.employeeName || record.name || record.personName);
            const rEmail = norm(record.email);
            return (employeeNumber && rId && norm(employeeNumber) === rId)
                || (fullName && rName && norm(fullName) === rName)
                || (email && rEmail && norm(email) === rEmail);
        };

        const training = readFromSheet('Training', spreadsheetId) || [];
        const violations = readFromSheet('Violations', spreadsheetId) || [];
        const ppe = readFromSheet('PPE', spreadsheetId) || [];

        var trainingSessions = 0;
        training.forEach(function(item) {
            const participants = String(item && item.participants || '').toLowerCase();
            if (matchesProfile(item) || (fullName && participants.indexOf(norm(fullName)) !== -1)) {
                trainingSessions += 1;
            }
        });

        var violationsCount = 0;
        violations.forEach(function(item) {
            if (matchesProfile(item)) violationsCount += 1;
        });

        var ppeCount = 0;
        ppe.forEach(function(item) {
            if (matchesProfile(item)) {
                const qty = Number(item.quantity || 0);
                ppeCount += (isNaN(qty) ? 0 : qty);
            }
        });

        return {
            success: true,
            data: {
                fullName: fullName,
                employeeNumber: employeeNumber,
                department: department,
                position: position,
                branch: branch,
                location: location,
                phone: phone,
                email: email,
                photo: photo,
                photoPublic: photoPublic,
                hireDateDisplay: hireInfo.hireDateDisplay,
                tenureText: hireInfo.tenureText,
                emergencyContacts: emergencyContacts,
                companyName: 'SafetyHub | ICAPP',
                trainingSessions: trainingSessions,
                violationsCount: violationsCount,
                ppeCount: ppeCount
            }
        };
    } catch (error) {
        Logger.log('Error in getPublicProfileByToken: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء جلب بيانات الملف العام: ' + error.toString() };
    }
}

