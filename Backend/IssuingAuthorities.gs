/**
 * Google Apps Script for HSE System - Issuing Authorities Module
 *
 * موديول إدارة الأشخاص المصرح لهم بالتوقيع على تصاريح العمل
 *
 * قيم الصلاحية لكل نوع تصريح:
 *   G = مصرح بالتوقيع في كل الحالات
 *   Y = مصرح بالتوقيع بعد التنسيق مع مدير السلامة والصحة المهنية
 *   X = غير مصرح له بالتوقيع على هذا النوع
 */

const ISSUING_AUTHORITIES_SHEET = 'PTWIssuingAuthorities';

// أنواع التصاريح المدعومة وحقولها
const PERMIT_TYPE_FIELDS = {
    coldWork:      'الأعمال الباردة',
    loto:          'عزل مصادر الطاقة',
    hotWork:       'الأعمال الساخنة',
    workAtHeight:  'العمل على ارتفاعات',
    confinedSpace: 'دخول الأماكن المغلقة',
    excavation:    'الحفر',
    contractorPTW: 'تصريح دخول مقاول',
    liftingPlan:   'خطة الرفع'
};

/**
 * التحقق من صلاحيات إدارة Issuing Authorities (مدير النظام فقط)
 */
function checkIssuingAuthoritiesPermission(userData) {
    try {
        if (!userData) {
            return { hasPermission: false, message: 'يجب تسجيل الدخول أولاً' };
        }
        const userRole = (userData.role || '').toLowerCase();
        if (userRole === 'admin') {
            return { hasPermission: true, message: 'صلاحية صحيحة' };
        }
        let permissions = userData.permissions || {};
        if (typeof permissions === 'string') {
            try { permissions = JSON.parse(permissions); } catch (e) { permissions = {}; }
        }
        if (permissions['admin'] === true || permissions['manage-ptw-authorities'] === true) {
            return { hasPermission: true, message: 'صلاحية صحيحة' };
        }
        return { hasPermission: false, message: 'ليس لديك صلاحية إدارة قائمة المصرح لهم بالتوقيع. هذه العملية للمدير فقط.' };
    } catch (error) {
        Logger.log('Error checking issuing authorities permission: ' + error.toString());
        return { hasPermission: false, message: 'حدث خطأ أثناء التحقق من الصلاحيات' };
    }
}

/**
 * إنشاء جدول PTWIssuingAuthorities إذا لم يكن موجوداً
 */
function initIssuingAuthoritiesTable(spreadsheetId) {
    try {
        if (!spreadsheetId) spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) return { success: false, message: 'معرف Google Sheets غير محدد' };
        const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        if (!spreadsheet.getSheetByName(ISSUING_AUTHORITIES_SHEET)) {
            const sheet = spreadsheet.insertSheet(ISSUING_AUTHORITIES_SHEET);
            const headers = getDefaultHeaders(ISSUING_AUTHORITIES_SHEET);
            sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
            sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#c8d8e8');
            Logger.log('تم إنشاء جدول PTWIssuingAuthorities');
        }
        return { success: true, message: 'تم التحقق من الجدول' };
    } catch (error) {
        Logger.log('Error in initIssuingAuthoritiesTable: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * الحصول على جميع السجلات
 */
function getAllIssuingAuthorities() {
    try {
        initIssuingAuthoritiesTable();
        const spreadsheetId = getSpreadsheetId();
        const records = readFromSheet(ISSUING_AUTHORITIES_SHEET, spreadsheetId);
        return {
            success: true,
            data: records || [],
            count: (records || []).length
        };
    } catch (error) {
        Logger.log('Error in getAllIssuingAuthorities: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString(), data: [] };
    }
}

/**
 * إضافة سجل جديد
 */
function addIssuingAuthority(data) {
    try {
        if (!data) return { success: false, message: 'البيانات غير موجودة' };
        const permCheck = checkIssuingAuthoritiesPermission(data.userData || data.user);
        if (!permCheck.hasPermission) return { success: false, message: permCheck.message };

        initIssuingAuthoritiesTable();

        const recordData = {
            id:            generateSequentialId('IA', ISSUING_AUTHORITIES_SHEET),
            name:          String(data.name || '').trim(),
            departmentId:  String(data.departmentId || '').trim(),
            departmentName:String(data.departmentName || '').trim(),
            email:         String(data.email || '').trim(),
            phone:         String(data.phone || '').trim(),
            isActive:      data.isActive !== false,
            coldWork:      validatePermitValue(data.coldWork),
            loto:          validatePermitValue(data.loto),
            hotWork:       validatePermitValue(data.hotWork),
            workAtHeight:  validatePermitValue(data.workAtHeight),
            confinedSpace: validatePermitValue(data.confinedSpace),
            excavation:    validatePermitValue(data.excavation),
            contractorPTW: validatePermitValue(data.contractorPTW),
            liftingPlan:   validatePermitValue(data.liftingPlan),
            sortOrder:     data.sortOrder || 0,
            notes:         String(data.notes || '').trim(),
            createdAt:     new Date(),
            updatedAt:     new Date(),
            createdBy:     String((data.userData || data.user || {}).name || (data.userData || data.user || {}).email || '').trim(),
            updatedBy:     String((data.userData || data.user || {}).name || (data.userData || data.user || {}).email || '').trim()
        };

        if (!recordData.name) return { success: false, message: 'اسم الشخص مطلوب' };

        const result = appendToSheet(ISSUING_AUTHORITIES_SHEET, recordData);
        if (result && result.success) {
            return { success: true, message: 'تم إضافة السجل بنجاح', data: recordData };
        }
        return { success: false, message: result.message || 'فشل الحفظ' };
    } catch (error) {
        Logger.log('Error in addIssuingAuthority: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * تحديث سجل موجود
 */
function updateIssuingAuthority(recordId, data) {
    try {
        if (!recordId) return { success: false, message: 'معرف السجل غير محدد' };
        if (!data)     return { success: false, message: 'البيانات غير موجودة' };

        const permCheck = checkIssuingAuthoritiesPermission(data.userData || data.user);
        if (!permCheck.hasPermission) return { success: false, message: permCheck.message };

        const spreadsheetId = getSpreadsheetId();
        const records = readFromSheet(ISSUING_AUTHORITIES_SHEET, spreadsheetId);
        const idx = records.findIndex(r => r.id === recordId);
        if (idx === -1) return { success: false, message: 'السجل غير موجود' };

        const existing = records[idx];
        records[idx] = Object.assign({}, existing, {
            name:          data.name          !== undefined ? String(data.name).trim()          : existing.name,
            departmentId:  data.departmentId  !== undefined ? String(data.departmentId).trim()  : existing.departmentId,
            departmentName:data.departmentName!== undefined ? String(data.departmentName).trim(): existing.departmentName,
            email:         data.email         !== undefined ? String(data.email).trim()         : existing.email,
            phone:         data.phone         !== undefined ? String(data.phone).trim()         : existing.phone,
            isActive:      data.isActive      !== undefined ? data.isActive                     : existing.isActive,
            coldWork:      data.coldWork      !== undefined ? validatePermitValue(data.coldWork)     : existing.coldWork,
            loto:          data.loto          !== undefined ? validatePermitValue(data.loto)         : existing.loto,
            hotWork:       data.hotWork       !== undefined ? validatePermitValue(data.hotWork)      : existing.hotWork,
            workAtHeight:  data.workAtHeight  !== undefined ? validatePermitValue(data.workAtHeight) : existing.workAtHeight,
            confinedSpace: data.confinedSpace !== undefined ? validatePermitValue(data.confinedSpace): existing.confinedSpace,
            excavation:    data.excavation    !== undefined ? validatePermitValue(data.excavation)   : existing.excavation,
            contractorPTW: data.contractorPTW !== undefined ? validatePermitValue(data.contractorPTW): existing.contractorPTW,
            liftingPlan:   data.liftingPlan   !== undefined ? validatePermitValue(data.liftingPlan)  : existing.liftingPlan,
            sortOrder:     data.sortOrder     !== undefined ? data.sortOrder : existing.sortOrder,
            notes:         data.notes         !== undefined ? String(data.notes).trim() : existing.notes,
            updatedAt:     new Date(),
            updatedBy:     String((data.userData || data.user || {}).name || (data.userData || data.user || {}).email || '').trim()
        });

        const result = saveToSheet(ISSUING_AUTHORITIES_SHEET, records, spreadsheetId);
        if (result && result.success) {
            return { success: true, message: 'تم التحديث بنجاح', data: records[idx] };
        }
        return { success: false, message: result.message || 'فشل التحديث' };
    } catch (error) {
        Logger.log('Error in updateIssuingAuthority: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * حذف سجل
 */
function deleteIssuingAuthority(recordId, userData) {
    try {
        if (!recordId) return { success: false, message: 'معرف السجل غير محدد' };
        const permCheck = checkIssuingAuthoritiesPermission(userData);
        if (!permCheck.hasPermission) return { success: false, message: permCheck.message };
        return deleteRowById(ISSUING_AUTHORITIES_SHEET, recordId);
    } catch (error) {
        Logger.log('Error in deleteIssuingAuthority: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * الحصول على قائمة المرشحين المؤهلين لاعتماد تصريح حسب نوعه
 * يُستخدم من PTW عند توليد workflow
 *
 * @param {string} permitType - نوع التصريح (coldWork | loto | hotWork | workAtHeight | confinedSpace | excavation | contractorPTW | liftingPlan)
 * @returns {{ success: boolean, authorities: Array }}
 *   كل عنصر: { id, name, email, phone, permitLevel: 'G'|'Y', requiresHseCoApproval: boolean }
 */
function getIssuingAuthoritiesForPermitType(permitType) {
    try {
        if (!permitType || !PERMIT_TYPE_FIELDS[permitType]) {
            return { success: false, message: 'نوع التصريح غير معروف: ' + permitType, authorities: [] };
        }

        const allResult = getAllIssuingAuthorities();
        if (!allResult.success) return { success: false, message: allResult.message, authorities: [] };

        const active = allResult.data.filter(r => r.isActive !== false && r.isActive !== 'false');
        const qualified = active
            .filter(r => {
                const val = String(r[permitType] || 'X').toUpperCase().trim();
                return val === 'G' || val === 'Y';
            })
            .map(r => {
                const val = String(r[permitType] || 'X').toUpperCase().trim();
                return {
                    id:                    r.id,
                    name:                  r.name,
                    departmentId:          r.departmentId,
                    departmentName:        r.departmentName,
                    email:                 r.email,
                    phone:                 r.phone,
                    permitLevel:           val,
                    requiresHseCoApproval: val === 'Y'
                };
            })
            .sort((a, b) => {
                // G يأتي قبل Y في الترتيب
                if (a.permitLevel === 'G' && b.permitLevel !== 'G') return -1;
                if (b.permitLevel === 'G' && a.permitLevel !== 'G') return 1;
                return 0;
            });

        return { success: true, authorities: qualified, permitType, count: qualified.length };
    } catch (error) {
        Logger.log('Error in getIssuingAuthoritiesForPermitType: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString(), authorities: [] };
    }
}

/**
 * التحقق من صحة قيمة الصلاحية (G/Y/X)
 */
function validatePermitValue(val) {
    if (!val) return 'X';
    const v = String(val).toUpperCase().trim();
    if (v === 'G' || v === 'Y' || v === 'X') return v;
    return 'X';
}
