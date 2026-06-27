/**
 * Google Apps Script for HSE System - Form Settings Module
 * 
 * موديول إعدادات النماذج - النسخة المحسنة
 * 
 * هذا الموديول يدير إعدادات النماذج في Google Sheets
 * البيانات تُحفظ بصيغة عادية (كل صف = سجل واحد) مثل المقاولين
 * فقط مدير النظام يمكنه إضافة أو تعديل الإعدادات
 * 
 * الجداول:
 * - Form_Sites: المواقع
 * - Form_Places: الأماكن الفرعية (مرتبطة بالموقع)
 * - Form_Departments: الإدارات المسؤولة
 * - Form_SafetyTeam: فريق السلامة
 */

// أسماء الجداول
const FORM_SETTINGS_SHEETS = {
    SITES: 'Form_Sites',
    PLACES: 'Form_Places',
    DEPARTMENTS: 'Form_Departments',
    SAFETY_TEAM: 'Form_SafetyTeam',
    LEGACY: 'Form_Settings_DB' // الجدول القديم للتوافق
};

/**
 * التحقق من صلاحيات المستخدم (مدير النظام فقط)
 */
function checkFormSettingsPermission(userData, actorUserDataOpt) {
    try {
        var candidates = [];
        if (userData && typeof userData === 'object') candidates.push(userData);
        if (actorUserDataOpt && typeof actorUserDataOpt === 'object' &&
            actorUserDataOpt !== userData) {
            candidates.push(actorUserDataOpt);
        }

        if (candidates.length === 0) {
            return { hasPermission: false, message: 'يجب تسجيل الدخول أولاً' };
        }

        var adminRoles = {
            'admin': true,
            'administrator': true,
            'مدير': true,
            'مدير النظام': true,
            'system admin': true
        };

        for (var c = 0; c < candidates.length; c++) {
            var ud = candidates[c];
            var userRole = String(ud.role || '').trim().toLowerCase();
            if (adminRoles[userRole]) {
                return { hasPermission: true, message: 'صلاحية صحيحة' };
            }

            var userPermissions = ud.permissions || {};
            if (typeof userPermissions === 'string') {
                try {
                    userPermissions = JSON.parse(userPermissions);
                } catch (e) {
                    userPermissions = {};
                }
            }

            if (userPermissions['admin'] === true ||
                userPermissions['manage-settings'] === true ||
                userPermissions['form-settings'] === true) {
                return { hasPermission: true, message: 'صلاحية صحيحة' };
            }
        }

        if (actorUserDataOpt && typeof checkAdminPermissionsAuthoritative === 'function' &&
            checkAdminPermissionsAuthoritative(actorUserDataOpt)) {
            return { hasPermission: true, message: 'صلاحية صحيحة' };
        }
        if (actorUserDataOpt && typeof checkAdminPermissions === 'function' &&
            checkAdminPermissions(actorUserDataOpt)) {
            return { hasPermission: true, message: 'صلاحية صحيحة' };
        }

        return {
            hasPermission: false,
            message: 'ليس لديك صلاحية للوصول إلى إعدادات النماذج. يجب أن تكون مدير النظام فقط.'
        };
    } catch (error) {
        Logger.log('Error checking form settings permissions: ' + error.toString());
        return { hasPermission: false, message: 'حدث خطأ أثناء التحقق من الصلاحيات' };
    }
}

/**
 * إنشاء جداول إعدادات النماذج إذا لم تكن موجودة
 */
function initFormSettingsTables(spreadsheetId) {
    try {
        if (!spreadsheetId) spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) return { success: false, message: 'معرف Google Sheets غير محدد' };
        
        const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        const createdSheets = [];
        
        // جدول المواقع
        if (!spreadsheet.getSheetByName(FORM_SETTINGS_SHEETS.SITES)) {
            const sitesSheet = spreadsheet.insertSheet(FORM_SETTINGS_SHEETS.SITES);
            const sitesHeaders = ['id', 'name', 'description', 'isActive', 'sortOrder', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
            sitesSheet.getRange(1, 1, 1, sitesHeaders.length).setValues([sitesHeaders]);
            sitesSheet.getRange(1, 1, 1, sitesHeaders.length).setFontWeight('bold').setBackground('#f0f0f0');
            createdSheets.push(FORM_SETTINGS_SHEETS.SITES);
        }
        
        // جدول الأماكن الفرعية
        if (!spreadsheet.getSheetByName(FORM_SETTINGS_SHEETS.PLACES)) {
            const placesSheet = spreadsheet.insertSheet(FORM_SETTINGS_SHEETS.PLACES);
            const placesHeaders = ['id', 'siteId', 'siteName', 'name', 'description', 'isActive', 'sortOrder', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
            placesSheet.getRange(1, 1, 1, placesHeaders.length).setValues([placesHeaders]);
            placesSheet.getRange(1, 1, 1, placesHeaders.length).setFontWeight('bold').setBackground('#f0f0f0');
            createdSheets.push(FORM_SETTINGS_SHEETS.PLACES);
        }
        
        // جدول الإدارات
        if (!spreadsheet.getSheetByName(FORM_SETTINGS_SHEETS.DEPARTMENTS)) {
            const deptsSheet = spreadsheet.insertSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS);
            const deptsHeaders = ['id', 'name', 'description', 'isActive', 'sortOrder', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
            deptsSheet.getRange(1, 1, 1, deptsHeaders.length).setValues([deptsHeaders]);
            deptsSheet.getRange(1, 1, 1, deptsHeaders.length).setFontWeight('bold').setBackground('#f0f0f0');
            createdSheets.push(FORM_SETTINGS_SHEETS.DEPARTMENTS);
        }
        
        // جدول فريق السلامة
        if (!spreadsheet.getSheetByName(FORM_SETTINGS_SHEETS.SAFETY_TEAM)) {
            const safetySheet = spreadsheet.insertSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM);
            const safetyHeaders = ['id', 'name', 'position', 'phone', 'email', 'isActive', 'sortOrder', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
            safetySheet.getRange(1, 1, 1, safetyHeaders.length).setValues([safetyHeaders]);
            safetySheet.getRange(1, 1, 1, safetyHeaders.length).setFontWeight('bold').setBackground('#f0f0f0');
            createdSheets.push(FORM_SETTINGS_SHEETS.SAFETY_TEAM);
        }
        
        return { 
            success: true, 
            message: createdSheets.length > 0 ? 'تم إنشاء الجداول: ' + createdSheets.join(', ') : 'جميع الجداول موجودة',
            createdSheets: createdSheets
        };
    } catch (error) {
        Logger.log('Error initializing form settings tables: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إنشاء الجداول: ' + error.toString() };
    }
}

/**
 * استبدال كامل لورقة إعدادات النماذج (Form_Sites / Form_Places …)
 * saveToSheet العام يعمل upsert ولا يحذف الصفوف اليتيمة — هذا ينظّف الشيت بالكامل.
 */
function replaceFormSettingsSheetData_(sheetName, data, spreadsheetId) {
    try {
        if (!spreadsheetId) spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) {
            return { success: false, message: 'معرف Google Sheets غير محدد' };
        }
        initFormSettingsTables(spreadsheetId);
        const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        const sheet = spreadsheet.getSheetByName(sheetName);
        if (!sheet) {
            return { success: false, message: 'الورقة غير موجودة: ' + sheetName };
        }

        const rows = Array.isArray(data) ? data : [];
        const headers = getDefaultHeaders(sheetName);
        if (!headers || headers.length === 0) {
            return { success: false, message: 'لا يمكن تحديد رؤوس الورقة: ' + sheetName };
        }

        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

        const lastRow = sheet.getLastRow();
        if (lastRow > 1) {
            sheet.deleteRows(2, lastRow - 1);
        }

        if (rows.length === 0) {
            invalidateHseSheetCaches(sheetName);
            SpreadsheetApp.flush();
            return { success: true, message: 'تم مسح بيانات ' + sheetName };
        }

        const values = rows.map(function(item) {
            return headers.map(function(header) {
                return toSheetCellValue_(header, item[header], sheetName);
            });
        });

        if (values.length === 1) {
            sheet.getRange(2, 1, 1, headers.length).setValues(values);
        } else {
            sheet.getRange(2, 1, values.length, headers.length).setValues(values);
        }

        invalidateHseSheetCaches(sheetName);
        SpreadsheetApp.flush();
        return { success: true, message: 'تم استبدال بيانات ' + sheetName + ' (' + rows.length + ' سجل)' };
    } catch (error) {
        Logger.log('Error in replaceFormSettingsSheetData_: ' + error.toString());
        return { success: false, message: 'فشل استبدال بيانات ' + sheetName + ': ' + error.toString() };
    }
}

function dedupeFormSettingsSitesForRead_(sites) {
    const seen = {};
    const result = [];
    (sites || []).forEach(function(site) {
        const key = normalizeFormSettingsNameKey_(site && site.name);
        if (!key) {
            result.push(site);
            return;
        }
        if (seen[key]) return;
        seen[key] = true;
        result.push(site);
    });
    return result;
}

function formSettingsPlaceDedupeKey_(place) {
    const siteId = String(place && place.siteId || '').trim();
    const siteNameKey = normalizeFormSettingsNameKey_(place && place.siteName);
    const nameKey = normalizeFormSettingsNameKey_(place && place.name);
    const sitePart = siteId || ('n:' + siteNameKey);
    return sitePart + '\u0000' + nameKey;
}

function dedupeFormSettingsPlacesForRead_(places) {
    const seen = {};
    const result = [];
    (places || []).forEach(function(place) {
        const nameKey = normalizeFormSettingsNameKey_(place && place.name);
        if (!nameKey) {
            result.push(place);
            return;
        }
        const key = formSettingsPlaceDedupeKey_(place);
        if (seen[key]) return;
        seen[key] = true;
        result.push(place);
    });
    return result;
}

/**
 * إزالة الصفوف المكررة من الشيت عند القراءة (يتيمة لا تظهر بالواجهة)
 */
function maybeRepairFormSettingsSheetDuplicates_(sheetName, rawRows, dedupedRows, spreadsheetId) {
    if (!Array.isArray(rawRows) || !Array.isArray(dedupedRows)) return;
    if (rawRows.length <= dedupedRows.length) return;
    try {
        const repairResult = replaceFormSettingsSheetData_(sheetName, dedupedRows, spreadsheetId);
        if (repairResult && repairResult.success) {
            Logger.log('Repaired duplicate rows in ' + sheetName + ': ' + rawRows.length + ' -> ' + dedupedRows.length);
        }
    } catch (error) {
        Logger.log('Failed to repair duplicates in ' + sheetName + ': ' + error.toString());
    }
}

// ============================================
// دوال المواقع (Sites)
// ============================================

/**
 * إضافة موقع جديد
 */
function addSiteToSheet(siteData) {
    try {
        if (!siteData || !siteData.name) {
            return { success: false, message: 'يجب إدخال اسم الموقع' };
        }
        
        // التحقق من الصلاحيات
        const userData = siteData.userData || siteData.user || {};
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        initFormSettingsTables(spreadsheetId);
        
        // إنشاء سجل الموقع
        const site = {
            id: siteData.id || Utilities.getUuid(),
            name: siteData.name,
            description: siteData.description || '',
            isActive: siteData.isActive !== false ? 'نشط' : 'غير نشط',
            sortOrder: siteData.sortOrder || 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: userData.name || userData.email || 'System',
            updatedBy: userData.name || userData.email || 'System'
        };
        
        return appendToSheet(FORM_SETTINGS_SHEETS.SITES, site, spreadsheetId);
    } catch (error) {
        Logger.log('Error in addSiteToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الموقع: ' + error.toString() };
    }
}

/**
 * تحديث موقع
 */
function updateSiteInSheet(siteId, updateData) {
    try {
        if (!siteId) {
            return { success: false, message: 'معرف الموقع غير محدد' };
        }
        
        // التحقق من الصلاحيات
        const userData = updateData.userData || updateData.user || {};
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(FORM_SETTINGS_SHEETS.SITES, spreadsheetId);
        const index = data.findIndex(s => s.id === siteId);
        
        if (index === -1) {
            return { success: false, message: 'الموقع غير موجود' };
        }
        
        // تحديث البيانات
        if (updateData.name !== undefined) data[index].name = updateData.name;
        if (updateData.description !== undefined) data[index].description = updateData.description;
        if (updateData.isActive !== undefined) data[index].isActive = updateData.isActive ? 'نشط' : 'غير نشط';
        if (updateData.sortOrder !== undefined) data[index].sortOrder = updateData.sortOrder;
        data[index].updatedAt = new Date().toISOString();
        data[index].updatedBy = userData.name || userData.email || 'System';
        
        return saveToSheet(FORM_SETTINGS_SHEETS.SITES, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error in updateSiteInSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الموقع: ' + error.toString() };
    }
}

/**
 * حذف موقع
 */
function deleteSiteFromSheet(siteId, userData, siteNameOpt) {
    try {
        if (!siteId && !siteNameOpt) {
            return { success: false, message: 'معرف الموقع غير محدد' };
        }
        
        // التحقق من الصلاحيات
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        
        // حذف الموقع
        const normalizedSiteId = String(siteId || '').trim();
        const normalizedSiteName = String(siteNameOpt || '').trim().toLowerCase();
        const sites = readFromSheet(FORM_SETTINGS_SHEETS.SITES, spreadsheetId);
        let filteredSites = sites.filter(function(s) {
            return String(s.id || '').trim() !== normalizedSiteId;
        });
        
        if (filteredSites.length === sites.length && normalizedSiteName) {
            filteredSites = sites.filter(function(s) {
                return String(s.name || '').trim().toLowerCase() !== normalizedSiteName;
            });
        }
        
        if (filteredSites.length === sites.length) {
            return { success: false, message: 'الموقع غير موجود' };
        }
        
        const removedSiteIds = sites
            .filter(function(s) {
                const sid = String(s.id || '').trim();
                if (!sid) return false;
                return !filteredSites.some(function(fs) {
                    return String(fs.id || '').trim() === sid;
                });
            })
            .map(function(s) {
                return String(s.id || '').trim();
            });
        
        // حذف الأماكن المرتبطة بالموقع
        const places = readFromSheet(FORM_SETTINGS_SHEETS.PLACES, spreadsheetId);
        const filteredPlaces = places.filter(function(p) {
            const placeSiteId = String(p.siteId || '').trim();
            if (normalizedSiteId && placeSiteId === normalizedSiteId) {
                return false;
            }
            return removedSiteIds.indexOf(placeSiteId) === -1;
        });
        
        // حفظ البيانات — استبدال كامل لإزالة الصفوف المحذوفة والمكررة
        const sitesSave = replaceFormSettingsSheetData_(FORM_SETTINGS_SHEETS.SITES, filteredSites, spreadsheetId);
        if (!sitesSave || !sitesSave.success) {
            return sitesSave || { success: false, message: 'فشل حذف الموقع من جدول المواقع' };
        }
        const placesSave = replaceFormSettingsSheetData_(FORM_SETTINGS_SHEETS.PLACES, filteredPlaces, spreadsheetId);
        if (!placesSave || !placesSave.success) {
            return placesSave || { success: false, message: 'فشل حذف الأماكن المرتبطة من جدول الأماكن' };
        }
        
        return { success: true, message: 'تم حذف الموقع وجميع الأماكن المرتبطة به بنجاح' };
    } catch (error) {
        Logger.log('Error in deleteSiteFromSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الموقع: ' + error.toString() };
    }
}

/**
 * الحصول على جميع المواقع
 */
function getAllSitesFromSheet() {
    try {
        const spreadsheetId = getSpreadsheetId();
        initFormSettingsTables(spreadsheetId);
        
        const sites = readFromSheet(FORM_SETTINGS_SHEETS.SITES, spreadsheetId);
        
        // ترتيب حسب sortOrder ثم الاسم
        sites.sort((a, b) => {
            const orderDiff = (parseInt(a.sortOrder) || 0) - (parseInt(b.sortOrder) || 0);
            if (orderDiff !== 0) return orderDiff;
            return (a.name || '').localeCompare(b.name || '', 'ar');
        });
        
        const dedupedSites = dedupeFormSettingsSitesForRead_(sites);
        maybeRepairFormSettingsSheetDuplicates_(FORM_SETTINGS_SHEETS.SITES, sites, dedupedSites, spreadsheetId);
        
        return { success: true, data: dedupedSites, count: dedupedSites.length };
    } catch (error) {
        Logger.log('Error in getAllSitesFromSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة المواقع: ' + error.toString(), data: [] };
    }
}

// ============================================
// دوال الأماكن الفرعية (Places)
// ============================================

/**
 * إضافة مكان جديد
 */
function addPlaceToSheet(placeData) {
    try {
        if (!placeData || !placeData.name || !placeData.siteId) {
            return { success: false, message: 'يجب إدخال اسم المكان ومعرف الموقع' };
        }
        
        // التحقق من الصلاحيات
        const userData = placeData.userData || placeData.user || {};
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        initFormSettingsTables(spreadsheetId);
        
        // الحصول على اسم الموقع
        const sites = readFromSheet(FORM_SETTINGS_SHEETS.SITES, spreadsheetId);
        const site = sites.find(s => s.id === placeData.siteId);
        
        // إنشاء سجل المكان
        const existingPlaces = readFromSheet(FORM_SETTINGS_SHEETS.PLACES, spreadsheetId);
        const place = {
            id: placeData.id || generateSequentialId('PLA', FORM_SETTINGS_SHEETS.PLACES, spreadsheetId),
            siteId: placeData.siteId,
            siteName: site ? site.name : placeData.siteName || '',
            name: placeData.name,
            description: placeData.description || '',
            isActive: placeData.isActive !== false ? 'نشط' : 'غير نشط',
            sortOrder: placeData.sortOrder || 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: userData.name || userData.email || 'System',
            updatedBy: userData.name || userData.email || 'System'
        };
        
        return appendToSheet(FORM_SETTINGS_SHEETS.PLACES, place, spreadsheetId);
    } catch (error) {
        Logger.log('Error in addPlaceToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة المكان: ' + error.toString() };
    }
}

/**
 * تحديث مكان
 */
function updatePlaceInSheet(placeId, updateData) {
    try {
        if (!placeId) {
            return { success: false, message: 'معرف المكان غير محدد' };
        }
        
        // التحقق من الصلاحيات
        const userData = updateData.userData || updateData.user || {};
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(FORM_SETTINGS_SHEETS.PLACES, spreadsheetId);
        const index = data.findIndex(p => p.id === placeId);
        
        if (index === -1) {
            return { success: false, message: 'المكان غير موجود' };
        }
        
        // تحديث البيانات
        if (updateData.name !== undefined) data[index].name = updateData.name;
        if (updateData.description !== undefined) data[index].description = updateData.description;
        if (updateData.isActive !== undefined) data[index].isActive = updateData.isActive ? 'نشط' : 'غير نشط';
        if (updateData.sortOrder !== undefined) data[index].sortOrder = updateData.sortOrder;
        data[index].updatedAt = new Date().toISOString();
        data[index].updatedBy = userData.name || userData.email || 'System';
        
        return saveToSheet(FORM_SETTINGS_SHEETS.PLACES, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error in updatePlaceInSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث المكان: ' + error.toString() };
    }
}

/**
 * حذف مكان — بالمعرّف أو بالموقع+الاسم (يشمل الصفوف المكررة)
 */
function deletePlaceFromSheet(placeRef, userData) {
    try {
        var placeId = '';
        var siteId = '';
        var siteName = '';
        var placeName = '';

        if (placeRef && typeof placeRef === 'object') {
            placeId = placeRef.placeId || placeRef.id || '';
            siteId = placeRef.siteId || '';
            siteName = placeRef.siteName || '';
            placeName = placeRef.placeName || placeRef.name || '';
            userData = userData || placeRef.userData || placeRef.user || {};
        } else {
            placeId = placeRef;
        }

        if (!String(placeId || '').trim() && !String(placeName || '').trim()) {
            return { success: false, message: 'معرف المكان أو اسمه غير محدد' };
        }

        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }

        const spreadsheetId = getSpreadsheetId();
        const normalizedPlaceId = String(placeId || '').trim();
        const normalizedSiteId = String(siteId || '').trim();
        const normalizedSiteName = String(siteName || '').trim();
        const normalizedPlaceNameKey = normalizeFormSettingsNameKey_(placeName);

        const data = readFromSheet(FORM_SETTINGS_SHEETS.PLACES, spreadsheetId);
        const filteredData = data.filter(function(p) {
            const pid = String(p.id || '').trim();
            if (normalizedPlaceId && pid === normalizedPlaceId) {
                return false;
            }
            if (normalizedPlaceNameKey) {
                const pNameKey = normalizeFormSettingsNameKey_(p.name);
                if (pNameKey !== normalizedPlaceNameKey) {
                    return true;
                }
                const psiteId = String(p.siteId || '').trim();
                const pSiteName = String(p.siteName || '').trim();
                if (normalizedSiteId && psiteId === normalizedSiteId) {
                    return false;
                }
                if (normalizedSiteName && pSiteName === normalizedSiteName) {
                    return false;
                }
            }
            return true;
        });

        if (filteredData.length === data.length) {
            return { success: false, message: 'المكان غير موجود في قاعدة البيانات', notFound: true };
        }

        const removedCount = data.length - filteredData.length;
        const replaceResult = replaceFormSettingsSheetData_(FORM_SETTINGS_SHEETS.PLACES, filteredData, spreadsheetId);
        if (replaceResult && replaceResult.success) {
            replaceResult.removedCount = removedCount;
            replaceResult.message = 'تم حذف المكان بنجاح' + (removedCount > 1 ? ' (' + removedCount + ' صف)' : '');
        }
        return replaceResult;
    } catch (error) {
        Logger.log('Error in deletePlaceFromSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف المكان: ' + error.toString() };
    }
}

/**
 * الحصول على جميع الأماكن
 */
function getAllPlacesFromSheet(siteId) {
    try {
        const spreadsheetId = getSpreadsheetId();
        initFormSettingsTables(spreadsheetId);
        
        let places = readFromSheet(FORM_SETTINGS_SHEETS.PLACES, spreadsheetId);
        
        // فلترة حسب الموقع إذا تم تحديده
        if (siteId) {
            places = places.filter(p => p.siteId === siteId);
        }
        
        // ترتيب حسب sortOrder ثم الاسم
        places.sort((a, b) => {
            const orderDiff = (parseInt(a.sortOrder) || 0) - (parseInt(b.sortOrder) || 0);
            if (orderDiff !== 0) return orderDiff;
            return (a.name || '').localeCompare(b.name || '', 'ar');
        });
        
        const dedupedPlaces = dedupeFormSettingsPlacesForRead_(places);
        if (!siteId) {
            maybeRepairFormSettingsSheetDuplicates_(FORM_SETTINGS_SHEETS.PLACES, places, dedupedPlaces, spreadsheetId);
        }
        
        return { success: true, data: dedupedPlaces, count: dedupedPlaces.length };
    } catch (error) {
        Logger.log('Error in getAllPlacesFromSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الأماكن: ' + error.toString(), data: [] };
    }
}

// ============================================
// دوال الإدارات (Departments)
// ============================================

/**
 * إضافة إدارة جديدة
 */
function addDepartmentToSheet(deptData) {
    try {
        if (!deptData || !deptData.name) {
            return { success: false, message: 'يجب إدخال اسم الإدارة' };
        }
        
        // التحقق من الصلاحيات
        const userData = deptData.userData || deptData.user || {};
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        initFormSettingsTables(spreadsheetId);
        
        // إنشاء سجل الإدارة
        const dept = {
            id: deptData.id || Utilities.getUuid(),
            name: deptData.name,
            description: deptData.description || '',
            isActive: deptData.isActive !== false ? 'نشط' : 'غير نشط',
            sortOrder: deptData.sortOrder || 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: userData.name || userData.email || 'System',
            updatedBy: userData.name || userData.email || 'System'
        };
        
        return appendToSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS, dept, spreadsheetId);
    } catch (error) {
        Logger.log('Error in addDepartmentToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الإدارة: ' + error.toString() };
    }
}

/**
 * تحديث إدارة
 */
function updateDepartmentInSheet(deptId, updateData) {
    try {
        if (!deptId) {
            return { success: false, message: 'معرف الإدارة غير محدد' };
        }
        
        // التحقق من الصلاحيات
        const userData = updateData.userData || updateData.user || {};
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS, spreadsheetId);
        const index = data.findIndex(d => d.id === deptId);
        
        if (index === -1) {
            return { success: false, message: 'الإدارة غير موجودة' };
        }
        
        // تحديث البيانات
        if (updateData.name !== undefined) data[index].name = updateData.name;
        if (updateData.description !== undefined) data[index].description = updateData.description;
        if (updateData.isActive !== undefined) data[index].isActive = updateData.isActive ? 'نشط' : 'غير نشط';
        if (updateData.sortOrder !== undefined) data[index].sortOrder = updateData.sortOrder;
        data[index].updatedAt = new Date().toISOString();
        data[index].updatedBy = userData.name || userData.email || 'System';
        
        return saveToSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error in updateDepartmentInSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الإدارة: ' + error.toString() };
    }
}

/**
 * حذف إدارة
 */
function deleteDepartmentFromSheet(deptId, userData) {
    try {
        if (!deptId) {
            return { success: false, message: 'معرف الإدارة غير محدد' };
        }
        
        // التحقق من الصلاحيات
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS, spreadsheetId);
        const filteredData = data.filter(d => d.id !== deptId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'الإدارة غير موجودة' };
        }
        
        return saveToSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error in deleteDepartmentFromSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الإدارة: ' + error.toString() };
    }
}

/**
 * الحصول على جميع الإدارات
 */
function getAllDepartmentsFromSheet() {
    try {
        const spreadsheetId = getSpreadsheetId();
        initFormSettingsTables(spreadsheetId);
        
        const departments = readFromSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS, spreadsheetId);
        
        // ترتيب حسب sortOrder ثم الاسم
        departments.sort((a, b) => {
            const orderDiff = (parseInt(a.sortOrder) || 0) - (parseInt(b.sortOrder) || 0);
            if (orderDiff !== 0) return orderDiff;
            return (a.name || '').localeCompare(b.name || '', 'ar');
        });
        
        return { success: true, data: departments, count: departments.length };
    } catch (error) {
        Logger.log('Error in getAllDepartmentsFromSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الإدارات: ' + error.toString(), data: [] };
    }
}

// ============================================
// دوال فريق السلامة (Safety Team)
// ============================================

/**
 * إضافة عضو فريق سلامة جديد
 */
function addSafetyMemberToSheet(memberData) {
    try {
        if (!memberData || !memberData.name) {
            return { success: false, message: 'يجب إدخال اسم العضو' };
        }
        
        // التحقق من الصلاحيات
        const userData = memberData.userData || memberData.user || {};
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        initFormSettingsTables(spreadsheetId);
        
        // إنشاء سجل العضو
        const member = {
            id: memberData.id || Utilities.getUuid(),
            name: memberData.name,
            position: memberData.position || '',
            phone: memberData.phone || '',
            email: memberData.email || '',
            isActive: memberData.isActive !== false ? 'نشط' : 'غير نشط',
            sortOrder: memberData.sortOrder || 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: userData.name || userData.email || 'System',
            updatedBy: userData.name || userData.email || 'System'
        };
        
        return appendToSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM, member, spreadsheetId);
    } catch (error) {
        Logger.log('Error in addSafetyMemberToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة العضو: ' + error.toString() };
    }
}

/**
 * تحديث عضو فريق سلامة
 */
function updateSafetyMemberInSheet(memberId, updateData) {
    try {
        if (!memberId) {
            return { success: false, message: 'معرف العضو غير محدد' };
        }
        
        // التحقق من الصلاحيات
        const userData = updateData.userData || updateData.user || {};
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM, spreadsheetId);
        const index = data.findIndex(m => m.id === memberId);
        
        if (index === -1) {
            return { success: false, message: 'العضو غير موجود' };
        }
        
        // تحديث البيانات
        if (updateData.name !== undefined) data[index].name = updateData.name;
        if (updateData.position !== undefined) data[index].position = updateData.position;
        if (updateData.phone !== undefined) data[index].phone = updateData.phone;
        if (updateData.email !== undefined) data[index].email = updateData.email;
        if (updateData.isActive !== undefined) data[index].isActive = updateData.isActive ? 'نشط' : 'غير نشط';
        if (updateData.sortOrder !== undefined) data[index].sortOrder = updateData.sortOrder;
        data[index].updatedAt = new Date().toISOString();
        data[index].updatedBy = userData.name || userData.email || 'System';
        
        return saveToSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error in updateSafetyMemberInSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث العضو: ' + error.toString() };
    }
}

/**
 * حذف عضو فريق سلامة
 */
function deleteSafetyMemberFromSheet(memberId, userData) {
    try {
        if (!memberId) {
            return { success: false, message: 'معرف العضو غير محدد' };
        }
        
        // التحقق من الصلاحيات
        const permissionCheck = checkFormSettingsPermission(userData);
        if (!permissionCheck.hasPermission) {
            return { success: false, message: permissionCheck.message, errorCode: 'PERMISSION_DENIED' };
        }
        
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM, spreadsheetId);
        const filteredData = data.filter(m => m.id !== memberId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'العضو غير موجود' };
        }
        
        return saveToSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error in deleteSafetyMemberFromSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف العضو: ' + error.toString() };
    }
}

/**
 * الحصول على جميع أعضاء فريق السلامة
 */
function getAllSafetyMembersFromSheet() {
    try {
        const spreadsheetId = getSpreadsheetId();
        initFormSettingsTables(spreadsheetId);
        
        const members = readFromSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM, spreadsheetId);
        
        // ترتيب حسب sortOrder ثم الاسم
        members.sort((a, b) => {
            const orderDiff = (parseInt(a.sortOrder) || 0) - (parseInt(b.sortOrder) || 0);
            if (orderDiff !== 0) return orderDiff;
            return (a.name || '').localeCompare(b.name || '', 'ar');
        });
        
        return { success: true, data: members, count: members.length };
    } catch (error) {
        Logger.log('Error in getAllSafetyMembersFromSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة أعضاء فريق السلامة: ' + error.toString(), data: [] };
    }
}

// ============================================
// دوال التوافق مع النظام القديم
// ============================================

/**
 * تطبيع اسم للمقارنة (منع التكرار بدون حساسية لحالة الأحرف)
 */
function normalizeFormSettingsNameKey_(name) {
    return String(name || '').trim().toLowerCase();
}

/**
 * التحقق من عدم تكرار أسماء المواقع أو الأماكن داخل نفس الموقع
 */
function validateFormSettingsSitesNoDuplicates_(sites) {
    if (!Array.isArray(sites)) {
        return { valid: false, message: 'صيغة المواقع غير صحيحة.' };
    }
    const siteKeys = {};
    for (var i = 0; i < sites.length; i++) {
        var site = sites[i] || {};
        var siteName = String(site.name || '').trim();
        if (!siteName) {
            return { valid: false, message: 'يرجى إدخال اسم لكل موقع.' };
        }
        var siteKey = normalizeFormSettingsNameKey_(siteName);
        if (siteKeys[siteKey]) {
            return { valid: false, message: 'اسم الموقع «' + siteName + '» مكرر. لا يمكن حفظ موقعين بنفس الاسم.' };
        }
        siteKeys[siteKey] = true;
        var places = Array.isArray(site.places) ? site.places : [];
        var placeKeys = {};
        for (var j = 0; j < places.length; j++) {
            var place = places[j] || {};
            var placeName = String(place.name || '').trim();
            if (!placeName) {
                return { valid: false, message: 'يرجى إدخال اسم لجميع الأماكن داخل الموقع «' + siteName + '».' };
            }
            var placeKey = normalizeFormSettingsNameKey_(placeName);
            if (placeKeys[placeKey]) {
                return { valid: false, message: 'اسم المكان «' + placeName + '» مكرر داخل الموقع «' + siteName + '».' };
            }
            placeKeys[placeKey] = true;
        }
    }
    return { valid: true };
}

/**
 * حفظ إعدادات النماذج (للتوافق مع النظام القديم)
 * هذه الدالة تحول البيانات القديمة إلى الجداول الجديدة
 */
function saveFormSettingsToSheet(settingsData, actorUserData) {
    try {
        const userData = settingsData.userData || settingsData.user || actorUserData || {};
        const permissionCheck = checkFormSettingsPermission(userData, actorUserData);
        
        if (!permissionCheck.hasPermission) {
            return { 
                success: false, 
                message: permissionCheck.message || 'ليس لديك صلاحية لحفظ إعدادات النماذج',
                errorCode: 'PERMISSION_DENIED'
            };
        }
        
        const spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) {
            return { success: false, message: 'معرف Google Sheets غير محدد' };
        }
        
        // تهيئة الجداول
        initFormSettingsTables(spreadsheetId);
        
        // تحليل البيانات إذا كانت بصيغة JSON
        let sites = settingsData.sites || [];
        let departments = settingsData.departments || [];
        let safetyTeam = settingsData.safetyTeam || [];
        
        if (typeof sites === 'string') {
            try { sites = JSON.parse(sites); } catch (e) { sites = []; }
        }
        if (typeof departments === 'string') {
            try { departments = JSON.parse(departments); } catch (e) { departments = []; }
        }
        if (typeof safetyTeam === 'string') {
            try { safetyTeam = JSON.parse(safetyTeam); } catch (e) { safetyTeam = []; }
        }

        const duplicateCheck = validateFormSettingsSitesNoDuplicates_(sites);
        if (!duplicateCheck.valid) {
            return {
                success: false,
                message: duplicateCheck.message || 'لا يمكن حفظ مواقع أو أماكن مكررة.',
                errorCode: 'DUPLICATE_ENTRY'
            };
        }
        
        // قراءة الإدارات وفريق السلامة فقط — المواقع/الأماكن تُبنى من الواجهة مباشرة (استبدال كامل)
        const existingDepartments = readFromSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS, spreadsheetId);
        const existingSafetyTeam = readFromSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM, spreadsheetId);
        
        const nowIso = new Date().toISOString();
        const actorName = userData.name || userData.email || 'System';
        
        const sitesToSave = [];
        const placesToSave = [];
        
        sites.forEach(function(site, siteIndex) {
            const siteId = String(site.id || '').trim() || Utilities.getUuid();
            
            sitesToSave.push({
                id: siteId,
                name: site.name || '',
                description: site.description || '',
                isActive: 'نشط',
                sortOrder: siteIndex,
                createdAt: site.createdAt || nowIso,
                updatedAt: nowIso,
                createdBy: site.createdBy || actorName,
                updatedBy: actorName
            });
            
            if (Array.isArray(site.places)) {
                site.places.forEach(function(place, placeIndex) {
                    const placeId = String(place.id || '').trim() || Utilities.getUuid();
                    placesToSave.push({
                        id: placeId,
                        siteId: siteId,
                        siteName: site.name || '',
                        name: place.name || '',
                        description: place.description || '',
                        isActive: 'نشط',
                        sortOrder: placeIndex,
                        createdAt: place.createdAt || nowIso,
                        updatedAt: nowIso,
                        createdBy: place.createdBy || actorName,
                        updatedBy: actorName
                    });
                });
            }
        });
        
        // معالجة الإدارات
        const departmentsToSave = [];
        departments.forEach((dept, index) => {
            const deptName = typeof dept === 'string' ? dept : dept.name;
            if (!deptName) return;
            
            const existingDept = existingDepartments.find(d => d.name === deptName);
            
            departmentsToSave.push({
                id: existingDept?.id || Utilities.getUuid(),
                name: deptName,
                description: typeof dept === 'object' ? (dept.description || '') : '',
                isActive: 'نشط',
                sortOrder: index,
                createdAt: existingDept?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: existingDept?.createdBy || userData.name || userData.email || 'System',
                updatedBy: userData.name || userData.email || 'System'
            });
        });
        
        // معالجة فريق السلامة
        const safetyToSave = [];
        safetyTeam.forEach((member, index) => {
            const memberName = typeof member === 'string' ? member : member.name;
            if (!memberName) return;
            
            const existingMember = existingSafetyTeam.find(m => m.name === memberName);
            
            safetyToSave.push({
                id: existingMember?.id || Utilities.getUuid(),
                name: memberName,
                position: typeof member === 'object' ? (member.position || '') : '',
                phone: typeof member === 'object' ? (member.phone || '') : '',
                email: typeof member === 'object' ? (member.email || '') : '',
                isActive: 'نشط',
                sortOrder: index,
                createdAt: existingMember?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: existingMember?.createdBy || userData.name || userData.email || 'System',
                updatedBy: userData.name || userData.email || 'System'
            });
        });
        
        // حفظ البيانات في الجداول — استبدال كامل (لا upsert) لضمان حذف المحذوفات والصفوف المكررة
        const sitesSave = replaceFormSettingsSheetData_(FORM_SETTINGS_SHEETS.SITES, sitesToSave, spreadsheetId);
        if (!sitesSave || !sitesSave.success) {
            return sitesSave || { success: false, message: 'فشل حفظ جدول المواقع' };
        }
        const placesSave = replaceFormSettingsSheetData_(FORM_SETTINGS_SHEETS.PLACES, placesToSave, spreadsheetId);
        if (!placesSave || !placesSave.success) {
            return placesSave || { success: false, message: 'فشل حفظ جدول الأماكن' };
        }
        if (departmentsToSave.length > 0) {
            saveToSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS, departmentsToSave, spreadsheetId);
        }
        if (safetyToSave.length > 0) {
            saveToSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM, safetyToSave, spreadsheetId);
        }
        
        Logger.log('Form settings saved successfully to new tables');
        return { success: true, message: 'تم حفظ إعدادات النماذج بنجاح' };
    } catch (error) {
        Logger.log('Error in saveFormSettingsToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حفظ إعدادات النماذج: ' + error.toString() };
    }
}

/**
 * الحصول على إعدادات النماذج (للتوافق مع النظام القديم)
 * هذه الدالة تجمع البيانات من الجداول الجديدة وتعيدها بالصيغة القديمة
 */
function getFormSettingsFromSheet() {
    try {
        const spreadsheetId = getSpreadsheetId();
        
        if (!spreadsheetId) {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد',
                data: getDefaultFormSettings()
            };
        }
        
        // تهيئة الجداول
        initFormSettingsTables(spreadsheetId);
        
        // قراءة البيانات من الجداول الجديدة
        const sitesResult = getAllSitesFromSheet();
        const placesResult = getAllPlacesFromSheet();
        const departmentsResult = getAllDepartmentsFromSheet();
        const safetyResult = getAllSafetyMembersFromSheet();
        
        const sites = sitesResult.success ? sitesResult.data : [];
        const places = placesResult.success ? placesResult.data : [];
        const departments = departmentsResult.success ? departmentsResult.data : [];
        const safetyTeam = safetyResult.success ? safetyResult.data : [];
        
        // ✅ إصلاح: تحويل البيانات إلى الصيغة القديمة للتوافق مع ربط صحيح للأماكن بالمواقع
        // ✅ إصلاح: استخدام String() لضمان المقارنة الصحيحة بين siteId و site.id
        const formattedSites = sites.map(site => {
            const siteId = String(site.id || '').trim();
            // ✅ إصلاح: فلترة الأماكن باستخدام String() لضمان المطابقة الصحيحة
            const sitePlaces = places.filter(p => {
                const placeSiteId = String(p.siteId || '').trim();
                return placeSiteId === siteId && placeSiteId !== '';
            }).map(p => ({
                id: p.id || '',
                name: p.name || ''
            }));
            
            return {
                id: site.id,
                name: site.name,
                description: site.description || '',
                places: sitePlaces // ✅ إصلاح: جميع الأماكن المرتبطة بالموقع
            };
        });
        
        const formattedDepartments = departments.map(d => d.name);
        const formattedSafetyTeam = safetyTeam.map(m => m.name);
        
        const result = {
            id: 'FORM-SETTINGS-1',
            sites: formattedSites,
            departments: formattedDepartments,
            safetyTeam: formattedSafetyTeam,
            updatedAt: new Date().toISOString(),
            updatedBy: 'System'
        };
        
        return { success: true, data: result };
    } catch (error) {
        Logger.log('Error in getFormSettingsFromSheet: ' + error.toString());
        return { 
            success: false, 
            message: 'حدث خطأ أثناء قراءة إعدادات النماذج: ' + error.toString(),
            data: getDefaultFormSettings()
        };
    }
}

/**
 * الحصول على الإعدادات الافتراضية
 */
function getDefaultFormSettings() {
    return {
        id: 'FORM-SETTINGS-1',
        sites: [],
        departments: [],
        safetyTeam: [],
        updatedAt: new Date().toISOString(),
        updatedBy: 'System'
    };
}

// ============================================
// دوال مساعدة للتحقق من وجود البيانات
// ============================================

/**
 * التحقق من وجود موقع بنفس الاسم
 */
function isSiteExists(siteName) {
    try {
        const sites = readFromSheet(FORM_SETTINGS_SHEETS.SITES, getSpreadsheetId());
        return sites.some(s => s.name.toLowerCase() === siteName.toLowerCase());
    } catch (error) {
        return false;
    }
}

/**
 * التحقق من وجود مكان بنفس الاسم في موقع معين
 */
function isPlaceExists(siteId, placeName) {
    try {
        const places = readFromSheet(FORM_SETTINGS_SHEETS.PLACES, getSpreadsheetId());
        return places.some(p => p.siteId === siteId && p.name.toLowerCase() === placeName.toLowerCase());
    } catch (error) {
        return false;
    }
}

/**
 * التحقق من وجود إدارة بنفس الاسم
 */
function isDepartmentExists(deptName) {
    try {
        const departments = readFromSheet(FORM_SETTINGS_SHEETS.DEPARTMENTS, getSpreadsheetId());
        return departments.some(d => d.name.toLowerCase() === deptName.toLowerCase());
    } catch (error) {
        return false;
    }
}

/**
 * التحقق من وجود عضو فريق سلامة بنفس الاسم
 */
function isSafetyMemberExists(memberName) {
    try {
        const members = readFromSheet(FORM_SETTINGS_SHEETS.SAFETY_TEAM, getSpreadsheetId());
        return members.some(m => m.name.toLowerCase() === memberName.toLowerCase());
    } catch (error) {
        return false;
    }
}
