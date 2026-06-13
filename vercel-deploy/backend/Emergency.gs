/**
 * Google Apps Script for HSE System - Emergency Module
 * 
 * موديول الطوارئ - النسخة المحسنة
 */

/**
 * ============================================
 * تنبيهات الطوارئ (Emergency Alerts)
 * ============================================
 */

/**
 * إضافة تنبيه طوارئ
 */
function addEmergencyAlertToSheet(alertData) {
    try {
        if (!alertData) {
            return { success: false, message: 'بيانات التنبيه غير موجودة' };
        }
        
        const sheetName = 'EmergencyAlerts';
        
        // إضافة حقول تلقائية
        if (!alertData.id) {
            alertData.id = generateSequentialId('EMA', sheetName);
        }
        if (!alertData.createdAt) {
            alertData.createdAt = new Date();
        }
        if (!alertData.updatedAt) {
            alertData.updatedAt = new Date();
        }
        if (!alertData.status) {
            alertData.status = 'نشط';
        }
        if (!alertData.priority) {
            alertData.priority = 'medium';
        }
        
        return appendToSheet(sheetName, alertData);
    } catch (error) {
        Logger.log('Error in addEmergencyAlertToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة التنبيه: ' + error.toString() };
    }
}

/**
 * تحديث تنبيه طوارئ
 */
function updateEmergencyAlert(alertId, updateData) {
    try {
        if (!alertId) {
            return { success: false, message: 'معرف التنبيه غير محدد' };
        }
        
        const sheetName = 'EmergencyAlerts';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const alertIndex = data.findIndex(a => a.id === alertId);
        
        if (alertIndex === -1) {
            return { success: false, message: 'التنبيه غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[alertIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating emergency alert: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث التنبيه: ' + error.toString() };
    }
}

/**
 * الحصول على جميع تنبيهات الطوارئ
 */
function getAllEmergencyAlerts(filters = {}) {
    try {
        const sheetName = 'EmergencyAlerts';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.type) {
            data = data.filter(a => a.type === filters.type);
        }
        if (filters.priority) {
            data = data.filter(a => a.priority === filters.priority);
        }
        if (filters.status) {
            data = data.filter(a => a.status === filters.status);
        }
        if (filters.active) {
            data = data.filter(a => a.status === 'نشط' || a.status === 'active');
        }
        
        // ترتيب حسب الأولوية والتاريخ
        data.sort((a, b) => {
            const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
            const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
            if (priorityDiff !== 0) return priorityDiff;
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all emergency alerts: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة التنبيهات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * خطط الطوارئ (Emergency Plans)
 * ============================================
 */

/**
 * إضافة خطة طوارئ
 */
function addEmergencyPlanToSheet(planData) {
    try {
        if (!planData) {
            return { success: false, message: 'بيانات الخطة غير موجودة' };
        }
        
        const sheetName = 'EmergencyPlans';
        
        // إضافة حقول تلقائية
        if (!planData.id) {
            planData.id = generateSequentialId('EMP', sheetName);
        }
        if (!planData.createdAt) {
            planData.createdAt = new Date();
        }
        if (!planData.updatedAt) {
            planData.updatedAt = new Date();
        }
        if (!planData.status) {
            planData.status = 'نشط';
        }
        
        return appendToSheet(sheetName, planData);
    } catch (error) {
        Logger.log('Error in addEmergencyPlanToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الخطة: ' + error.toString() };
    }
}

/**
 * تحديث خطة طوارئ
 */
function updateEmergencyPlan(planId, updateData) {
    try {
        if (!planId) {
            return { success: false, message: 'معرف الخطة غير محدد' };
        }
        
        const sheetName = 'EmergencyPlans';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const planIndex = data.findIndex(p => p.id === planId);
        
        if (planIndex === -1) {
            return { success: false, message: 'الخطة غير موجودة' };
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[planIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating emergency plan: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الخطة: ' + error.toString() };
    }
}

/**
 * الحصول على خطة طوارئ محددة
 */
function getEmergencyPlan(planId) {
    try {
        if (!planId) {
            return { success: false, message: 'معرف الخطة غير محدد' };
        }
        
        const sheetName = 'EmergencyPlans';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const plan = data.find(p => p.id === planId);
        
        if (!plan) {
            return { success: false, message: 'الخطة غير موجودة' };
        }
        
        return { success: true, data: plan };
    } catch (error) {
        Logger.log('Error getting emergency plan: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الخطة: ' + error.toString() };
    }
}

/**
 * الحصول على جميع خطط الطوارئ
 */
function getAllEmergencyPlans(filters = {}) {
    try {
        const sheetName = 'EmergencyPlans';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.type) {
            data = data.filter(p => p.type === filters.type);
        }
        if (filters.status) {
            data = data.filter(p => p.status === filters.status);
        }
        if (filters.needsReview) {
            const now = new Date();
            data = data.filter(p => {
                if (!p.nextReview) return false;
                const nextReview = new Date(p.nextReview);
                return nextReview <= now;
            });
        }
        
        // ترتيب حسب الاسم
        data.sort((a, b) => {
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all emergency plans: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الخطط: ' + error.toString(), data: [] };
    }
}

/**
 * حذف خطة طوارئ
 */
function deleteEmergencyPlan(planId) {
    try {
        if (!planId) {
            return { success: false, message: 'معرف الخطة غير محدد' };
        }

        const sheetName = 'EmergencyPlans';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(p => p.id !== planId);

        if (filteredData.length === data.length) {
            return { success: false, message: 'الخطة غير موجودة' };
        }

        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting emergency plan: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الخطة: ' + error.toString() };
    }
}

/**
 * ============================================
 * تحديثات خطط الطوارئ (Emergency Plans Updates)
 * ============================================
 */

/**
 * إضافة أو تحديث سجل تحديثات خطط الطوارئ
 */
function upsertEmergencyPlanUpdate(sectionKey, updateData) {
    try {
        if (!sectionKey) {
            return { success: false, message: 'مفتاح القسم غير محدد' };
        }

        const sheetName = 'EmergencyPlansUpdates';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const existingIndex = data.findIndex(p => p.sectionKey === sectionKey);

        if (existingIndex !== -1) {
            // تحديث السجل الموجود
            updateData.updatedAt = new Date();
            if (!updateData.id) {
                updateData.id = data[existingIndex].id;
            }
            for (var key in updateData) {
                if (updateData.hasOwnProperty(key)) {
                    data[existingIndex][key] = updateData[key];
                }
            }
            return saveToSheet(sheetName, data, spreadsheetId);
        } else {
            // إضافة سجل جديد
            if (!updateData.id) {
                updateData.id = generateSequentialId('EPU', sheetName);
            }
            updateData.createdAt = new Date();
            updateData.updatedAt = new Date();
            if (!updateData.isActive) {
                updateData.isActive = true;
            }
            return appendToSheet(sheetName, updateData);
        }
    } catch (error) {
        Logger.log('Error in upsertEmergencyPlanUpdate: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حفظ تحديثات خطة الطوارئ: ' + error.toString() };
    }
}

/**
 * الحصول على جميع تحديثات خطط الطوارئ
 */
function getAllEmergencyPlanUpdates(filters = {}) {
    try {
        const sheetName = 'EmergencyPlansUpdates';
        let data = readFromSheet(sheetName, getSpreadsheetId());

        // تطبيق الفلاتر
        if (filters.sectionKey) {
            data = data.filter(p => p.sectionKey === filters.sectionKey);
        }
        if (filters.isActive !== undefined) {
            data = data.filter(p => String(p.isActive) === String(filters.isActive));
        }
        if (filters.siteId) {
            data = data.filter(p => p.siteId === filters.siteId);
        }

        // ترتيب حسب order ثم createdAt
        data.sort((a, b) => {
            const orderDiff = (Number(a.order) || 0) - (Number(b.order) || 0);
            if (orderDiff !== 0) return orderDiff;
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });

        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all emergency plan updates: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة تحديثات خطط الطوارئ: ' + error.toString(), data: [] };
    }
}

/**
 * الحصول على تحديث خطة طوارئ محدد
 */
function getEmergencyPlanUpdate(sectionKey) {
    try {
        if (!sectionKey) {
            return { success: false, message: 'مفتاح القسم غير محدد' };
        }

        const sheetName = 'EmergencyPlansUpdates';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const record = data.find(p => p.sectionKey === sectionKey);

        if (!record) {
            return { success: false, message: 'السجل غير موجود' };
        }

        return { success: true, data: record };
    } catch (error) {
        Logger.log('Error getting emergency plan update: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة تحديث خطة الطوارئ: ' + error.toString() };
    }
}

/**
 * حذف تحديث خطة طوارئ
 */
function deleteEmergencyPlanUpdate(sectionKey) {
    try {
        if (!sectionKey) {
            return { success: false, message: 'مفتاح القسم غير محدد' };
        }

        const sheetName = 'EmergencyPlansUpdates';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(p => p.sectionKey !== sectionKey);

        if (filteredData.length === data.length) {
            return { success: false, message: 'السجل غير موجود' };
        }

        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting emergency plan update: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف تحديث خطة الطوارئ: ' + error.toString() };
    }
}

// ============================================
// خرائط المصنع للطوارئ (Factory Safety Maps)
// ============================================

/** منع تخزين base64 في خلايا Sheets (حد 50000 حرف) — رفع الصور إلى Drive */
function sanitizeEmergencyFloorPlanData_(data, options) {
    if (!data) return data;
    var isUpdate = options && options.isUpdate === true;
    var imageRef = data.imageDriveId ? String(data.imageDriveId) : '';
    if (imageRef.indexOf('data:image') === 0) {
        try {
            var uploadResult = uploadFileToDrive(
                imageRef,
                'floor_plan_' + (data.id || Utilities.getUuid()) + '_' + Date.now() + '.jpg',
                'image/jpeg',
                'EmergencyFloorPlans'
            );
            if (uploadResult && uploadResult.success && uploadResult.fileId) {
                data.imageDriveId = uploadResult.fileId;
            } else if (isUpdate) {
                delete data.imageDriveId;
            } else {
                data.imageDriveId = '';
            }
        } catch (uploadErr) {
            Logger.log('sanitizeEmergencyFloorPlanData_ image: ' + uploadErr.toString());
            if (isUpdate) delete data.imageDriveId;
            else data.imageDriveId = '';
        }
    }
    if (data.drawStampsJson && String(data.drawStampsJson).length > 45000) {
        try {
            var parsed = JSON.parse(String(data.drawStampsJson));
            if (parsed && parsed.customImages) delete parsed.customImages;
            if (parsed && parsed.stamps) {
                parsed.stamps = parsed.stamps.map(function(s) {
                    if (s && s.customImage) delete s.customImage;
                    return s;
                });
            }
            data.drawStampsJson = JSON.stringify(parsed);
        } catch (jsonErr) {
            data.drawStampsJson = '';
        }
    }
    if (data.drawStampsJson && String(data.drawStampsJson).length > 45000) {
        data.drawStampsJson = '';
    }
    return data;
}

function addEmergencyFloorPlan(data) {
    try {
        if (!data || !data.name) return { success: false, message: 'اسم المخطط مطلوب' };
        var sheetName = 'EmergencyFloorPlans';
        if (!data.id) data.id = generateSequentialId('FP', sheetName);
        if (!data.isActive) data.isActive = 'true';
        if (!data.qrToken) {
            data.qrToken = 'QR-' + Utilities.getUuid().replace(/-/g, '').substring(0, 16);
        }
        if (data.qrAnchorX == null || data.qrAnchorX === '') data.qrAnchorX = 0.5;
        if (data.qrAnchorY == null || data.qrAnchorY === '') data.qrAnchorY = 0.85;
        if (!data.createdAt) data.createdAt = new Date();
        if (!data.updatedAt) data.updatedAt = new Date();
        data = sanitizeEmergencyFloorPlanData_(data, { isUpdate: false });
        if (!data.imageDriveId) {
            return { success: false, message: 'صورة المخطط مطلوبة — تعذر رفع الصورة إلى Drive' };
        }
        var result = appendToSheet(sheetName, data);
        return result && result.success
            ? { success: true, data: { id: data.id }, message: result.message }
            : result;
    } catch (error) {
        Logger.log('Error in addEmergencyFloorPlan: ' + error.toString());
        return { success: false, message: 'خطأ في إضافة مخطط الطوارئ: ' + error.toString() };
    }
}

function updateEmergencyFloorPlan(planId, updateData) {
    try {
        if (!planId) return { success: false, message: 'معرف المخطط غير محدد' };
        var sheetName = 'EmergencyFloorPlans';
        updateData.id = planId;
        updateData.updatedAt = new Date();
        updateData = sanitizeEmergencyFloorPlanData_(updateData, { isUpdate: true });
        var result = updateSingleRowInSheet(sheetName, planId, updateData, getSpreadsheetId());
        if (result && result.success) return { success: true, message: 'تم تحديث المخطط', data: updateData };
        var allData = readFromSheet(sheetName, getSpreadsheetId());
        var idx = Array.isArray(allData) ? allData.findIndex(function(r) { return r && String(r.id) === String(planId); }) : -1;
        if (idx === -1) return { success: false, message: 'المخطط غير موجود' };
        for (var k in updateData) { if (updateData.hasOwnProperty(k)) allData[idx][k] = updateData[k]; }
        return saveToSheet(sheetName, allData, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in updateEmergencyFloorPlan: ' + error.toString());
        return { success: false, message: 'خطأ في تحديث المخطط: ' + error.toString() };
    }
}

function getAllEmergencyFloorPlans(options) {
    try {
        if (options && options.skipCache) {
            invalidateHseSheetCaches('EmergencyFloorPlans');
        }
        var data = readFromSheet('EmergencyFloorPlans', getSpreadsheetId());
        return Array.isArray(data) ? data : [];
    } catch (error) {
        Logger.log('Error in getAllEmergencyFloorPlans: ' + error.toString());
        return [];
    }
}

function deleteEmergencyFloorPlan(planId) {
    try {
        if (!planId) return { success: false, message: 'معرف المخطط غير محدد' };
        var sheetName = 'EmergencyFloorPlans';
        var data = readFromSheet(sheetName, getSpreadsheetId());
        var filtered = Array.isArray(data) ? data.filter(function(r) { return r && String(r.id) !== String(planId); }) : [];
        if (filtered.length === data.length) return { success: false, message: 'المخطط غير موجود' };
        return saveToSheet(sheetName, filtered, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in deleteEmergencyFloorPlan: ' + error.toString());
        return { success: false, message: 'خطأ في حذف المخطط: ' + error.toString() };
    }
}

// عناصر الخريطة (أجهزة إطفاء، مخارج، طرق هروب...)
function addEmergencyMapItem(data) {
    try {
        if (!data || !data.floorPlanId || !data.itemType) return { success: false, message: 'المخطط ونوع العنصر مطلوبان' };
        var sheetName = 'EmergencyMapItems';
        if (!data.id) data.id = generateSequentialId('MI', sheetName);
        if (!data.createdAt) data.createdAt = new Date();
        if (!data.updatedAt) data.updatedAt = new Date();
        var result = appendToSheet(sheetName, data);
        return result && result.success
            ? { success: true, data: { id: data.id }, message: result.message }
            : result;
    } catch (error) {
        Logger.log('Error in addEmergencyMapItem: ' + error.toString());
        return { success: false, message: 'خطأ في إضافة عنصر الخريطة: ' + error.toString() };
    }
}

function updateEmergencyMapItem(itemId, updateData) {
    try {
        if (!itemId) return { success: false, message: 'معرف العنصر غير محدد' };
        var sheetName = 'EmergencyMapItems';
        updateData.id = itemId;
        updateData.updatedAt = new Date();
        var result = updateSingleRowInSheet(sheetName, itemId, updateData, getSpreadsheetId());
        if (result && result.success) return { success: true, message: 'تم تحديث العنصر', data: updateData };
        var allData = readFromSheet(sheetName, getSpreadsheetId());
        var idx = Array.isArray(allData) ? allData.findIndex(function(r) { return r && String(r.id) === String(itemId); }) : -1;
        if (idx === -1) return { success: false, message: 'العنصر غير موجود' };
        for (var k in updateData) { if (updateData.hasOwnProperty(k)) allData[idx][k] = updateData[k]; }
        return saveToSheet(sheetName, allData, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in updateEmergencyMapItem: ' + error.toString());
        return { success: false, message: 'خطأ في تحديث عنصر الخريطة: ' + error.toString() };
    }
}

function getAllEmergencyMapItems(filters) {
    try {
        var data = readFromSheet('EmergencyMapItems', getSpreadsheetId());
        if (!Array.isArray(data)) return [];
        if (filters && filters.floorPlanId) data = data.filter(function(r) { return String(r.floorPlanId) === String(filters.floorPlanId); });
        if (filters && filters.itemType) data = data.filter(function(r) { return r.itemType === filters.itemType; });
        return data;
    } catch (error) {
        Logger.log('Error in getAllEmergencyMapItems: ' + error.toString());
        return [];
    }
}

function deleteEmergencyMapItem(itemId) {
    try {
        if (!itemId) return { success: false, message: 'معرف العنصر غير محدد' };
        var sheetName = 'EmergencyMapItems';
        var data = readFromSheet(sheetName, getSpreadsheetId());
        var filtered = Array.isArray(data) ? data.filter(function(r) { return r && String(r.id) !== String(itemId); }) : [];
        if (filtered.length === data.length) return { success: false, message: 'العنصر غير موجود' };
        return saveToSheet(sheetName, filtered, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in deleteEmergencyMapItem: ' + error.toString());
        return { success: false, message: 'خطأ في حذف عنصر الخريطة: ' + error.toString() };
    }
}

// ============================================
// عرض عام لخريطة الطوارئ (QR بدون تسجيل دخول)
// ============================================

function _fmPublicEscHtml_(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function _fmPublicItemTypeMeta_() {
    return {
        fire_extinguisher: { label: 'مطفأة حريق', color: '#ef4444' },
        fire_hose: { label: 'خرطوم حريق', color: '#dc2626' },
        fire_alarm: { label: 'إنذار حريق', color: '#f97316' },
        emergency_exit: { label: 'مخرج طوارئ', color: '#22c55e' },
        escape_route: { label: 'طريق هروب', color: '#16a34a' },
        assembly_point: { label: 'نقطة تجمع', color: '#3b82f6' },
        first_aid: { label: 'إسعافات أولية', color: '#ec4899' },
        hazmat: { label: 'مواد خطرة', color: '#a855f7' },
        evacuation_chair: { label: 'كرسي إخلاء', color: '#06b6d4' },
        fire_panel: { label: 'لوحة إطفاء', color: '#64748b' }
    };
}

function getPublicEmergencyMapByToken_(planId, token) {
    try {
        var pid = String(planId || '').trim();
        var tok = String(token || '').trim();
        if (!pid || !tok) {
            return { success: false, message: 'معرف المخطط أو رمز QR غير صالح' };
        }
        var plans = getAllEmergencyFloorPlans();
        var plan = (plans || []).find(function(p) {
            return p && String(p.id) === pid;
        });
        if (!plan) {
            return { success: false, message: 'المخطط غير موجود' };
        }
        if (String(plan.isActive || 'true').toLowerCase() === 'false') {
            return { success: false, message: 'هذا المخطط غير متاح حالياً' };
        }
        if (!plan.qrToken || String(plan.qrToken).trim() !== tok) {
            return { success: false, message: 'رمز QR غير صالح لهذا المخطط' };
        }
        var items = getAllEmergencyMapItems({ floorPlanId: pid }) || [];
        var activeItems = items.filter(function(it) {
            return it && String(it.status || 'active').toLowerCase() !== 'inactive';
        });
        return {
            success: true,
            data: {
                plan: plan,
                items: activeItems
            }
        };
    } catch (error) {
        Logger.log('getPublicEmergencyMapByToken_ error: ' + error.toString());
        return { success: false, message: 'تعذر تحميل خريطة الطوارئ' };
    }
}

function getPublicEmergencyMapData(planId, token) {
    var gate = getPublicEmergencyMapByToken_(planId, token);
    if (!gate.success) return gate;
    var plan = gate.data.plan || {};
    var img = getDriveImageDataUrl(plan.imageDriveId);
    return {
        success: true,
        data: {
            plan: {
                id: plan.id,
                name: plan.name,
                factoryName: plan.factoryName,
                floor: plan.floor || plan.subLocationName,
                imageWidth: plan.imageWidth,
                imageHeight: plan.imageHeight,
                qrAnchorX: parseFloat(plan.qrAnchorX),
                qrAnchorY: parseFloat(plan.qrAnchorY),
                geoNwLat: parseFloat(plan.geoNwLat),
                geoNwLng: parseFloat(plan.geoNwLng),
                geoSeLat: parseFloat(plan.geoSeLat),
                geoSeLng: parseFloat(plan.geoSeLng)
            },
            items: (gate.data.items || []).map(function(it) {
                return {
                    id: it.id,
                    itemType: it.itemType,
                    label: it.label,
                    x: parseFloat(it.x),
                    y: parseFloat(it.y),
                    status: it.status
                };
            }),
            imageDirectLink: (img && img.success && img.directLink) ? img.directLink : '',
            imageDataUrl: (img && img.success && img.dataUrl && String(img.dataUrl).length < 500000) ? img.dataUrl : ''
        }
    };
}

function getPublicEmergencyMapImage(planId, token) {
    var gate = getPublicEmergencyMapByToken_(planId, token);
    if (!gate.success) return null;
    var img = getDriveImageDataUrl(gate.data.plan.imageDriveId);
    if (!img || !img.success || !img.dataUrl) return null;
    try {
        var parts = String(img.dataUrl).split(',');
        if (parts.length < 2) return null;
        var mimeMatch = String(parts[0] || '').match(/^data:([^;]+)/);
        var mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        var bytes = Utilities.base64Decode(parts[1]);
        return ContentService.createBlob(bytes, mime, 'emergency-map.jpg');
    } catch (err) {
        Logger.log('getPublicEmergencyMapImage blob error: ' + err.toString());
        return null;
    }
}

function buildPublicEmergencyMapHtml_(planId, token, scriptBaseUrl) {
    var gate = getPublicEmergencyMapByToken_(planId, token);
    if (!gate.success) {
        var errMsg = _fmPublicEscHtml_(gate.message || 'تعذر عرض الخريطة');
        return '<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>خريطة الطوارئ</title></head>'
            + '<body style="margin:0;font-family:system-ui,Arial,sans-serif;background:#f1f5f9;padding:20px;">'
            + '<div style="max-width:520px;margin:40px auto;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:22px;text-align:center;">'
            + '<h2 style="margin:0 0 10px;color:#0f172a;">تعذر فتح الخريطة</h2>'
            + '<p style="margin:0;color:#64748b;">' + errMsg + '</p></div></body></html>';
    }

    var plan = gate.data.plan || {};
    var items = gate.data.items || [];
    var typeMeta = _fmPublicItemTypeMeta_();
    var esc = _fmPublicEscHtml_;
    var base = String(scriptBaseUrl || '').trim();
    var joiner = base.indexOf('?') >= 0 ? '&' : '?';
    var imageUrl = base + joiner + 'action=publicEmergencyMapImage&planId=' + encodeURIComponent(String(planId))
        + '&token=' + encodeURIComponent(String(token));

    var title = esc(plan.name || 'خريطة الطوارئ');
    var subtitle = esc((plan.factoryName || '') + (plan.subLocationName || plan.floor ? ' — ' + (plan.subLocationName || plan.floor) : ''));

    var markersHtml = '';
    for (var i = 0; i < items.length; i++) {
        var it = items[i] || {};
        var meta = typeMeta[it.itemType] || { label: it.itemType || 'عنصر', color: '#64748b' };
        var px = Math.max(0, Math.min(100, parseFloat(it.x) * 100 || 0));
        var py = Math.max(0, Math.min(100, parseFloat(it.y) * 100 || 0));
        markersHtml += '<div class="fm-pub-marker" style="left:' + px + '%;top:' + py + '%;background:' + esc(meta.color) + ';" title="' + esc(meta.label) + '"></div>';
    }

    var anchorX = parseFloat(plan.qrAnchorX);
    var anchorY = parseFloat(plan.qrAnchorY);
    if (isNaN(anchorX)) anchorX = 0.5;
    if (isNaN(anchorY)) anchorY = 0.85;

    var geoNwLat = parseFloat(plan.geoNwLat);
    var geoNwLng = parseFloat(plan.geoNwLng);
    var geoSeLat = parseFloat(plan.geoSeLat);
    var geoSeLng = parseFloat(plan.geoSeLng);
    var hasGeo = !isNaN(geoNwLat) && !isNaN(geoNwLng) && !isNaN(geoSeLat) && !isNaN(geoSeLng)
        && Math.abs(geoSeLng - geoNwLng) > 0.000001 && Math.abs(geoNwLat - geoSeLat) > 0.000001;

    var configJson = JSON.stringify({
        anchorX: anchorX,
        anchorY: anchorY,
        hasGeo: hasGeo,
        geo: hasGeo ? { nwLat: geoNwLat, nwLng: geoNwLng, seLat: geoSeLat, seLng: geoSeLng } : null
    }).replace(/</g, '\\u003c');

    return '<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8">'
        + '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5,user-scalable=yes">'
        + '<meta name="theme-color" content="#003865"><title>' + title + '</title>'
        + '<style>'
        + '*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}'
        + 'body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Tahoma,Arial,sans-serif;background:#0f172a;color:#fff;min-height:100vh;}'
        + '.fm-pub-header{padding:14px 16px 10px;background:linear-gradient(135deg,#003865,#1e40af);}'
        + '.fm-pub-header h1{margin:0;font-size:18px;font-weight:800;}'
        + '.fm-pub-header p{margin:4px 0 0;font-size:12px;opacity:.9;}'
        + '.fm-pub-status{margin:10px 16px 0;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,.08);font-size:12px;line-height:1.5;}'
        + '.fm-pub-viewport{margin:12px 16px 16px;border-radius:14px;overflow:hidden;background:#1e293b;border:2px solid rgba(255,255,255,.12);touch-action:none;}'
        + '.fm-pub-map-wrap{position:relative;transform-origin:0 0;will-change:transform;}'
        + '.fm-pub-map-img{display:block;width:100%;height:auto;user-select:none;-webkit-user-drag:none;}'
        + '.fm-pub-markers{position:absolute;inset:0;pointer-events:none;}'
        + '.fm-pub-marker{position:absolute;width:14px;height:14px;border-radius:999px;border:2px solid #fff;transform:translate(-50%,-50%);box-shadow:0 2px 8px rgba(0,0,0,.35);}'
        + '.fm-pub-you{position:absolute;z-index:20;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;transition:left .35s ease,top .35s ease;}'
        + '.fm-pub-you-dot{width:18px;height:18px;border-radius:999px;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 6px rgba(37,99,235,.25);animation:fmPulse 1.8s infinite;}'
        + '.fm-pub-you-label{background:#2563eb;color:#fff;font-size:11px;font-weight:700;padding:3px 8px;border-radius:999px;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.25);}'
        + '@keyframes fmPulse{0%,100%{box-shadow:0 0 0 6px rgba(37,99,235,.25);}50%{box-shadow:0 0 0 12px rgba(37,99,235,.12);}}'
        + '.fm-pub-legend{margin:0 16px 18px;padding:12px;border-radius:12px;background:rgba(255,255,255,.06);font-size:11px;color:#cbd5e1;}'
        + '.fm-pub-legend b{color:#fff;}'
        + '</style></head><body>'
        + '<div class="fm-pub-header"><h1>' + title + '</h1><p>' + subtitle + '</p></div>'
        + '<div class="fm-pub-status" id="fm-pub-status">جاري تحديد موقعك...</div>'
        + '<div class="fm-pub-viewport" id="fm-pub-viewport"><div class="fm-pub-map-wrap" id="fm-pub-map-wrap">'
        + '<img id="fm-pub-map-img" class="fm-pub-map-img" src="' + esc(imageUrl) + '" alt="مخطط الطوارئ">'
        + '<div class="fm-pub-markers">' + markersHtml + '</div>'
        + '<div class="fm-pub-you" id="fm-pub-you" style="left:' + (anchorX * 100) + '%;top:' + (anchorY * 100) + '%;">'
        + '<div class="fm-pub-you-dot"></div><div class="fm-pub-you-label">أنت هنا</div></div>'
        + '</div></div>'
        + '<div class="fm-pub-legend"><b>استجابة طوارئ</b> — امسح الرمز للوصول المباشر. النقطة الزرقاء توضح موقعك على المخطط.'
        + (hasGeo ? ' يتم تحديث الموقع تلقائياً.' : ' الموقع تقريبي من نقطة QR.') + '</div>'
        + '<script>window.__FM_PUBLIC_MAP__=' + configJson + ';<\/script>'
        + '<script>(function(){'
        + 'var cfg=window.__FM_PUBLIC_MAP__||{};'
        + 'var you=document.getElementById("fm-pub-you");'
        + 'var statusEl=document.getElementById("fm-pub-status");'
        + 'var wrap=document.getElementById("fm-pub-map-wrap");'
        + 'var viewport=document.getElementById("fm-pub-viewport");'
        + 'function setPos(x,y){if(!you)return;x=Math.max(0.02,Math.min(0.98,x));y=Math.max(0.02,Math.min(0.98,y));you.style.left=(x*100)+"%";you.style.top=(y*100)+"%";}'
        + 'function gpsToMap(lat,lng){if(!cfg.hasGeo||!cfg.geo)return null;var g=cfg.geo;var x=(lng-g.nwLng)/(g.seLng-g.nwLng);var y=1-((lat-g.seLat)/(g.nwLat-g.seLat));return{x:Math.max(0.02,Math.min(0.98,x)),y:Math.max(0.02,Math.min(0.98,y))};}'
        + 'function applyAnchor(){setPos(cfg.anchorX||0.5,cfg.anchorY||0.85);}'
        + 'function setStatus(msg){if(statusEl)statusEl.textContent=msg;}'
        + 'applyAnchor();'
        + 'if(navigator.geolocation){'
        + 'navigator.geolocation.watchPosition(function(pos){'
        + 'var mapped=gpsToMap(pos.coords.latitude,pos.coords.longitude);'
        + 'if(mapped){setPos(mapped.x,mapped.y);setStatus("تم تحديد موقعك على المخطط (دقة ±"+Math.round(pos.coords.accuracy||0)+"م)");}'
        + 'else{applyAnchor();setStatus("تم عرض موقعك عند نقطة QR — فعّل إحداثيات المخطط لتحديد أدق");}'
        + '},function(err){applyAnchor();setStatus(err&&err.code===1?"تم عرض موقعك عند نقطة QR — اسمح بالوصول للموقع لتحديث أدق":"تم عرض موقعك عند نقطة QR");},{enableHighAccuracy:true,maximumAge:4000,timeout:15000});'
        + '}else{applyAnchor();setStatus("تم عرض موقعك عند نقطة QR");}'
        + 'var scale=1,tx=0,ty=0,pointers=new Map();'
        + 'function applyTransform(){if(wrap)wrap.style.transform="translate("+tx+"px,"+ty+"px) scale("+scale+")";}'
        + 'viewport.addEventListener("wheel",function(e){e.preventDefault();var d=e.deltaY>0?0.9:1.1;scale=Math.max(0.6,Math.min(4,scale*d));applyTransform();},{passive:false});'
        + 'viewport.addEventListener("pointerdown",function(e){viewport.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});});'
        + 'viewport.addEventListener("pointermove",function(e){if(!pointers.has(e.pointerId))return;var p=pointers.get(e.pointerId);tx+=e.clientX-p.x;ty+=e.clientY-p.y;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});applyTransform();});'
        + 'viewport.addEventListener("pointerup",function(e){pointers.delete(e.pointerId);});'
        + '})();<\/script></body></html>';
}

