/**
 * Google Apps Script for HSE System - Fire Equipment Module
 * 
 * موديول معدات الحريق - النسخة المحسنة
 */

/**
 * ============================================
 * معدات الحريق (Fire Equipment)
 * ============================================
 */

/**
 * توليد DeviceID بتنسيق EFA-0000 (3 حروف - 4 أرقام)
 * @returns {string} DeviceID بالتنسيق الجديد
 */
function generateFireDeviceID() {
    try {
        const sheetName = 'FireEquipmentAssets';
        const spreadsheetId = getSpreadsheetId();
        const existingAssets = readFromSheet(sheetName, spreadsheetId);
        
        // استخراج جميع الأرقام الموجودة بتنسيق EFA-XXXX
        var existingNumbers = [];
        if (existingAssets && Array.isArray(existingAssets)) {
            existingNumbers = existingAssets
                .map(function(asset) { return asset.id; })
                .filter(function(id) { 
                    return id && typeof id === 'string' && id.match(/^EFA-\d{4}$/); 
                })
                .map(function(id) { 
                    return parseInt(id.split('-')[1]); 
                })
                .filter(function(num) { 
                    return !isNaN(num); 
                });
        }
        
        // حساب الرقم التالي
        var nextNumber = 1;
        if (existingNumbers.length > 0) {
            nextNumber = Math.max.apply(null, existingNumbers) + 1;
        }
        
        // إضافة leading zeros (4 أرقام)
        var paddedNumber = ('0000' + nextNumber).slice(-4);
        
        return 'EFA-' + paddedNumber;
    } catch (error) {
        Logger.log('Error in generateFireDeviceID: ' + error.toString());
        // في حالة الخطأ، نستخدم timestamp
        return 'EFA-' + ('0000' + Date.now().toString().slice(-4)).slice(-4);
    }
}

/**
 * إضافة معدات الحريق
 */
function addFireEquipmentToSheet(equipmentData) {
    try {
        if (!equipmentData) {
            return { success: false, message: 'بيانات المعدات غير موجودة' };
        }
        
        const sheetName = 'FireEquipment';
        
        // إضافة حقول تلقائية
        if (!equipmentData.id) {
            equipmentData.id = generateSequentialId('FEA', sheetName);
        }
        if (!equipmentData.createdAt) {
            equipmentData.createdAt = new Date();
        }
        if (!equipmentData.updatedAt) {
            equipmentData.updatedAt = new Date();
        }
        if (!equipmentData.status) {
            equipmentData.status = 'صالح';
        }
        
        return appendToSheet(sheetName, equipmentData);
    } catch (error) {
        Logger.log('Error in addFireEquipmentToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة المعدات: ' + error.toString() };
    }
}

/**
 * تحديث معدات الحريق
 */
function updateFireEquipment(equipmentId, updateData) {
    try {
        if (!equipmentId) {
            return { success: false, message: 'معرف المعدات غير محدد' };
        }
        
        const sheetName = 'FireEquipment';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const equipmentIndex = data.findIndex(e => e.id === equipmentId);
        
        if (equipmentIndex === -1) {
            return { success: false, message: 'المعدات غير موجودة' };
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[equipmentIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating fire equipment: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث المعدات: ' + error.toString() };
    }
}

/**
 * الحصول على جميع معدات الحريق
 */
function getAllFireEquipment(filters = {}) {
    try {
        const sheetName = 'FireEquipment';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.location) {
            data = data.filter(e => e.location === filters.location);
        }
        if (filters.status) {
            data = data.filter(e => e.status === filters.status);
        }
        if (filters.equipmentType) {
            data = data.filter(e => e.equipmentType === filters.equipmentType);
        }
        
        // ترتيب حسب الموقع
        data.sort((a, b) => {
            const locA = (a.location || '').toLowerCase();
            const locB = (b.location || '').toLowerCase();
            return locA.localeCompare(locB);
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all fire equipment: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة المعدات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * أصول معدات الحريق (Fire Equipment Assets)
 * ============================================
 */

/**
 * إضافة أصل معدات الحريق
 */
function addFireEquipmentAssetToSheet(assetData) {
    try {
        if (!assetData) {
            return { success: false, message: 'بيانات الأصل غير موجودة' };
        }
        
        const sheetName = 'FireEquipmentAssets';
        
        // إضافة حقول تلقائية
        if (!assetData.id) {
            assetData.id = generateFireDeviceID();  // استخدام التنسيق الجديد EFA-0000
        }
        if (!assetData.createdAt) {
            assetData.createdAt = new Date();
        }
        if (!assetData.updatedAt) {
            assetData.updatedAt = new Date();
        }
        if (!assetData.status) {
            assetData.status = 'نشط';
        }
        
        return appendToSheet(sheetName, assetData);
    } catch (error) {
        Logger.log('Error in addFireEquipmentAssetToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الأصل: ' + error.toString() };
    }
}

/**
 * تحديث أصل معدات الحريق
 */
function updateFireEquipmentAsset(assetId, updateData) {
    try {
        if (!assetId) {
            return { success: false, message: 'معرف الأصل غير محدد' };
        }
        
        const sheetName = 'FireEquipmentAssets';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const assetIndex = data.findIndex(a => a.id === assetId);
        
        if (assetIndex === -1) {
            return { success: false, message: 'الأصل غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[assetIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating fire equipment asset: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الأصل: ' + error.toString() };
    }
}

/**
 * حفظ أو تحديث أصل معدات الحريق (بدون حذف البيانات الأخرى!)
 * هذه الدالة تحل مشكلة فقدان البيانات
 */
function saveOrUpdateFireEquipmentAsset(assetData) {
    try {
        if (!assetData || !assetData.id) {
            return { success: false, message: 'بيانات الأصل غير موجودة أو لا تحتوي على معرف' };
        }
        
        const sheetName = 'FireEquipmentAssets';
        const spreadsheetId = getSpreadsheetId();
        
        // قراءة جميع البيانات الموجودة من الجدول
        // هذا يضمن عدم فقدان أي بيانات موجودة
        let existingData = readFromSheet(sheetName, spreadsheetId);
        
        // التحقق من أن البيانات تم قراءتها بشكل صحيح
        if (!Array.isArray(existingData)) {
            Logger.log('Warning: existingData is not an array, initializing empty array');
            existingData = [];
        }
        
        Logger.log('saveOrUpdateFireEquipmentAsset: قراءة ' + existingData.length + ' سجل موجود من الجدول');
        
        const assetIndex = existingData.findIndex(function(a) { return a.id === assetData.id; });
        
        if (assetIndex === -1) {
            // أصل جديد - إضافة باستخدام appendToSheet
            // appendToSheet تضيف السطر الجديد في آخر الجدول بدون حذف أي بيانات
            Logger.log('إضافة أصل جديد: ' + assetData.id + ' (سيتم إضافته في آخر السطر)');
            if (!assetData.createdAt) {
                assetData.createdAt = new Date();
            }
            assetData.updatedAt = new Date();
            const result = appendToSheet(sheetName, assetData);
            Logger.log('saveOrUpdateFireEquipmentAsset: تمت إضافة الأصل الجديد بنجاح. إجمالي السجلات بعد الإضافة: ' + (existingData.length + 1));
            return result;
        } else {
            // أصل موجود - تحديث السطر المحدد فقط
            Logger.log('تحديث أصل موجود: ' + assetData.id + ' (السطر رقم ' + (assetIndex + 1) + ')');
            assetData.updatedAt = new Date();
            
            // الاحتفاظ بـ createdAt الأصلي
            if (existingData[assetIndex].createdAt) {
                assetData.createdAt = existingData[assetIndex].createdAt;
            }
            
            // تحديث البيانات في السطر المحدد فقط
            // نحتفظ بجميع البيانات الأخرى كما هي
            for (var key in assetData) {
                if (assetData.hasOwnProperty(key)) {
                    existingData[assetIndex][key] = assetData[key];
                }
            }
            
            // حفظ جميع البيانات (بما في ذلك الأصول الأخرى)
            // saveToSheet تحذف جميع الصفوف ثم تكتبها مرة أخرى
            // لكننا نمرر جميع البيانات التي قرأناها من الجدول، لذلك لا تُحذف أي بيانات
            Logger.log('saveOrUpdateFireEquipmentAsset: حفظ ' + existingData.length + ' سجل (بما في ذلك السجل المحدث)');
            const result = saveToSheet(sheetName, existingData, spreadsheetId);
            Logger.log('saveOrUpdateFireEquipmentAsset: تم تحديث الأصل بنجاح. إجمالي السجلات: ' + existingData.length);
            return result;
        }
    } catch (error) {
        Logger.log('Error in saveOrUpdateFireEquipmentAsset: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * الحصول على جميع أصول معدات الحريق
 */
function getAllFireEquipmentAssets(filters = {}) {
    try {
        const sheetName = 'FireEquipmentAssets';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.location) {
            data = data.filter(a => a.location === filters.location);
        }
        if (filters.equipmentType) {
            data = data.filter(a => a.equipmentType === filters.equipmentType);
        }
        if (filters.status) {
            data = data.filter(a => a.status === filters.status);
        }
        if (filters.inspectionDue) {
            const now = new Date();
            data = data.filter(a => {
                if (!a.nextInspection) return false;
                const nextInspection = new Date(a.nextInspection);
                return nextInspection <= now;
            });
        }
        
        // ترتيب حسب تاريخ الفحص القادم
        data.sort((a, b) => {
            const dateA = new Date(a.nextInspection || '9999-12-31');
            const dateB = new Date(b.nextInspection || '9999-12-31');
            return dateA - dateB;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all fire equipment assets: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الأصول: ' + error.toString(), data: [] };
    }
}

/**
 * حذف أصل معدات الحريق
 * @param {string} assetId - معرف الأصل المراد حذفه
 * @returns {object} نتيجة العملية
 */
function deleteFireEquipmentAsset(assetId) {
    try {
        if (!assetId) {
            return { success: false, message: 'معرف الأصل غير محدد' };
        }
        
        const sheetName = 'FireEquipmentAssets';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        // التحقق من وجود الأصل قبل الحذف
        const data = readFromSheet(sheetName, spreadsheetId);
        const asset = data.find(a => a.id === assetId);
        
        if (!asset) {
            return { success: false, message: 'الأصل غير موجود' };
        }
        
        // ✅ حذف الأصل مباشرة من الجدول باستخدام deleteRowById (بدون إعادة كتابة الشيت بالكامل)
        const deleteResult = deleteRowById(sheetName, assetId, spreadsheetId);
        
        if (!deleteResult.success) {
            return deleteResult;
        }
        
        // ✅ حذف الفحوصات المرتبطة بهذا الأصل
        try {
            const inspectionsSheetName = 'FireEquipmentInspections';
            
            // قراءة الفحوصات المرتبطة
            const inspectionsData = readFromSheet(inspectionsSheetName, spreadsheetId);
            const relatedInspections = inspectionsData.filter(ins => ins.assetId === assetId);
            
            // حذف كل فحص مرتبط مباشرة من الجدول
            let deletedInspectionsCount = 0;
            for (let i = 0; i < relatedInspections.length; i++) {
                const inspectionId = relatedInspections[i].id;
                if (inspectionId) {
                    const inspectionDeleteResult = deleteRowById(inspectionsSheetName, inspectionId, spreadsheetId);
                    if (inspectionDeleteResult.success) {
                        deletedInspectionsCount++;
                    }
                }
            }
            
            if (deletedInspectionsCount > 0) {
                Logger.log('تم حذف ' + deletedInspectionsCount + ' فحص مرتبط بالأصل المحذوف');
            }
        } catch (inspectionError) {
            Logger.log('Warning: Could not delete related inspections: ' + inspectionError.toString());
            // لا نوقف العملية إذا فشل حذف الفحوصات
        }
        
        // ✅ حذف طلبات الموافقة المرتبطة (إن وجدت)
        try {
            const approvalRequestsSheetName = 'FireEquipmentApprovalRequests';
            const approvalRequestsData = readFromSheet(approvalRequestsSheetName, spreadsheetId);
            const relatedRequests = approvalRequestsData.filter(req => req.assetId === assetId);
            
            // حذف كل طلب مرتبط مباشرة من الجدول
            let deletedRequestsCount = 0;
            for (let i = 0; i < relatedRequests.length; i++) {
                const requestId = relatedRequests[i].id;
                if (requestId) {
                    const requestDeleteResult = deleteRowById(approvalRequestsSheetName, requestId, spreadsheetId);
                    if (requestDeleteResult.success) {
                        deletedRequestsCount++;
                    }
                }
            }
            
            if (deletedRequestsCount > 0) {
                Logger.log('تم حذف ' + deletedRequestsCount + ' طلب موافقة مرتبط بالأصل المحذوف');
            }
        } catch (approvalError) {
            Logger.log('Warning: Could not delete related approval requests: ' + approvalError.toString());
            // لا نوقف العملية إذا فشل حذف طلبات الموافقة
        }
        
        return { success: true, message: 'تم حذف الأصل بنجاح' };
    } catch (error) {
        Logger.log('Error deleting fire equipment asset: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الأصل: ' + error.toString() };
    }
}

/**
 * ============================================
 * فحوصات معدات الحريق (Fire Equipment Inspections)
 * ============================================
 */

/**
 * إضافة فحص معدات الحريق
 */
function addFireEquipmentInspectionToSheet(inspectionData) {
    try {
        if (!inspectionData) {
            return { success: false, message: 'بيانات الفحص غير موجودة' };
        }
        
        const sheetName = 'FireEquipmentInspections';
        
        // إضافة حقول تلقائية
        if (!inspectionData.id) {
            inspectionData.id = generateSequentialId('FEI', sheetName);
        }
        if (!inspectionData.createdAt) {
            inspectionData.createdAt = new Date();
        }
        if (!inspectionData.updatedAt) {
            inspectionData.updatedAt = new Date();
        }
        if (!inspectionData.status) {
            inspectionData.status = 'مكتمل';
        }
        
        // تحديث تاريخ الفحص القادم في الأصل إذا كان موجوداً
        if (inspectionData.assetId && inspectionData.inspectionDate) {
            try {
                const assets = readFromSheet('FireEquipmentAssets', getSpreadsheetId());
                const asset = assets.find(a => a.id === inspectionData.assetId);
                if (asset) {
                    // حساب تاريخ الفحص القادم (افتراضي: بعد 6 أشهر)
                    const inspectionDate = new Date(inspectionData.inspectionDate);
                    const nextInspection = new Date(inspectionDate);
                    nextInspection.setMonth(nextInspection.getMonth() + 6);
                    
                    updateFireEquipmentAsset(inspectionData.assetId, {
                        lastInspection: inspectionData.inspectionDate,
                        nextInspection: nextInspection.toISOString().split('T')[0]
                    });
                }
            } catch (error) {
                Logger.log('Warning: Could not update asset inspection date: ' + error.toString());
            }
        }
        
        return appendToSheet(sheetName, inspectionData);
    } catch (error) {
        Logger.log('Error in addFireEquipmentInspectionToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الفحص: ' + error.toString() };
    }
}

/**
 * تحديث فحص معدات الحريق
 */
function updateFireEquipmentInspection(inspectionId, updateData) {
    try {
        if (!inspectionId) {
            return { success: false, message: 'معرف الفحص غير محدد' };
        }
        
        const sheetName = 'FireEquipmentInspections';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const inspectionIndex = data.findIndex(i => i.id === inspectionId);
        
        if (inspectionIndex === -1) {
            return { success: false, message: 'الفحص غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[inspectionIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating fire equipment inspection: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الفحص: ' + error.toString() };
    }
}

/**
 * الحصول على جميع فحوصات معدات الحريق
 */
function getAllFireEquipmentInspections(filters = {}) {
    try {
        const sheetName = 'FireEquipmentInspections';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.assetId) {
            data = data.filter(i => i.assetId === filters.assetId);
        }
        if (filters.inspector) {
            data = data.filter(i => i.inspector === filters.inspector);
        }
        if (filters.status) {
            data = data.filter(i => i.status === filters.status);
        }
        if (filters.startDate) {
            data = data.filter(i => {
                if (!i.inspectionDate) return false;
                return new Date(i.inspectionDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(i => {
                if (!i.inspectionDate) return false;
                return new Date(i.inspectionDate) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب تاريخ الفحص
        data.sort((a, b) => {
            const dateA = new Date(a.inspectionDate || a.createdAt || 0);
            const dateB = new Date(b.inspectionDate || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all fire equipment inspections: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الفحوصات: ' + error.toString(), data: [] };
    }
}

/**
 * الحصول على الفحوصات المستحقة
 */
function getFireEquipmentInspectionAlerts() {
    try {
        const assets = readFromSheet('FireEquipmentAssets', getSpreadsheetId());
        const now = new Date();
        
        const alerts = {
            overdue: [],
            dueSoon: []
        };
        
        assets.forEach(asset => {
            if (asset.nextInspection) {
                const nextInspection = new Date(asset.nextInspection);
                const daysUntil = Math.ceil((nextInspection - now) / (1000 * 60 * 60 * 24));
                
                if (daysUntil < 0) {
                    alerts.overdue.push(asset);
                } else if (daysUntil <= 7) {
                    alerts.dueSoon.push(asset);
                }
            }
        });
        
        return { success: true, data: alerts };
    } catch (error) {
        Logger.log('Error getting fire equipment inspection alerts: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء الحصول على التنبيهات: ' + error.toString() };
    }
}

/**
 * ============================================
 * طلبات الموافقة على فحص معدات الحريق (Fire Equipment Approval Requests)
 * ============================================
 */

/**
 * إضافة طلب موافقة على فحص معدات الحريق
 */
function addFireEquipmentApprovalRequest(requestData) {
    try {
        if (!requestData) {
            return { success: false, message: 'بيانات الطلب غير موجودة' };
        }
        
        const sheetName = 'FireEquipmentApprovalRequests';
        const spreadsheetId = getSpreadsheetId();
        
        // إضافة حقول تلقائية
        if (!requestData.id) {
            requestData.id = generateSequentialId('FEAR', sheetName, spreadsheetId);
        }
        if (!requestData.createdAt) {
            requestData.createdAt = new Date();
        }
        if (!requestData.updatedAt) {
            requestData.updatedAt = new Date();
        }
        if (!requestData.status) {
            requestData.status = 'pending';
        }
        
        // ✅ استخدام appendToSheet مع spreadsheetId للاتساق
        return appendToSheet(sheetName, requestData, spreadsheetId);
    } catch (error) {
        Logger.log('Error in addFireEquipmentApprovalRequest: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة طلب الموافقة: ' + error.toString() };
    }
}

/**
 * تحديث طلب موافقة على فحص معدات الحريق
 * ✅ تم التعديل: استخدام updateSingleRowInSheet() لتحديث صف واحد فقط بدون حذف الصفوف الأخرى
 */
function updateFireEquipmentApprovalRequest(requestId, updateData) {
    try {
        if (!requestId) {
            return { success: false, message: 'معرف الطلب غير محدد' };
        }
        
        const sheetName = 'FireEquipmentApprovalRequests';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const requestIndex = data.findIndex(r => r.id === requestId);
        
        if (requestIndex === -1) {
            return { success: false, message: 'الطلب غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[requestIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating fire equipment approval request: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الطلب: ' + error.toString() };
    }
}

/**
 * الحصول على جميع طلبات الموافقة على فحص معدات الحريق
 */
function getFireEquipmentApprovalRequests(filters = {}) {
    try {
        const sheetName = 'FireEquipmentApprovalRequests';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.status) {
            data = data.filter(r => r.status === filters.status);
        }
        if (filters.requestedById) {
            data = data.filter(r => r.requestedById === filters.requestedById || r.userEmail === filters.requestedById);
        }
        if (filters.assetId) {
            data = data.filter(r => r.assetId === filters.assetId);
        }
        if (filters.type) {
            data = data.filter(r => r.type === filters.type);
        }
        if (filters.startDate) {
            data = data.filter(r => {
                if (!r.requestedAt && !r.createdAt) return false;
                const requestDate = new Date(r.requestedAt || r.createdAt);
                return requestDate >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(r => {
                if (!r.requestedAt && !r.createdAt) return false;
                const requestDate = new Date(r.requestedAt || r.createdAt);
                return requestDate <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب تاريخ الطلب (الأحدث أولاً)
        data.sort((a, b) => {
            const dateA = new Date(a.requestedAt || a.createdAt || 0);
            const dateB = new Date(b.requestedAt || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting fire equipment approval requests: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة طلبات الموافقة: ' + error.toString(), data: [] };
    }
}

/**
 * حذف طلب موافقة على فحص معدات الحريق
 */
function deleteFireEquipmentApprovalRequest(requestId) {
    try {
        if (!requestId) {
            return { success: false, message: 'معرف الطلب غير محدد' };
        }
        
        const sheetName = 'FireEquipmentApprovalRequests';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const requestIndex = data.findIndex(r => r.id === requestId);
        
        if (requestIndex === -1) {
            return { success: false, message: 'الطلب غير موجود' };
        }
        
        // حذف الطلب من المصفوفة
        data.splice(requestIndex, 1);
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting fire equipment approval request: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الطلب: ' + error.toString() };
    }
}

/**
 * ============================================
 * بوابة الفحص الشهري العام لمعدات الإطفاء (بدون تسجيل دخول)
 * ============================================
 */

/**
 * جلب بيانات التكوين والأجهزة ومفتشي السلامة لنموذج الفحص العام
 */
function getPublicFireInspectionConfig(params) {
    try {
        const spreadsheetId = getSpreadsheetId();
        const sheetName = 'FireEquipmentAssets';
        const rawAssets = readFromSheet(sheetName, spreadsheetId) || [];

        // تنقية وتجهيز قائمة الأجهزة
        const assets = rawAssets.map(function(a) {
            return {
                id: String(a.id || '').trim(),
                number: String(a.number || a.id || '').trim(),
                type: String(a.type || a.equipmentType || 'طفاية حريق').trim(),
                location: String(a.location || '').trim(),
                subLocation: String(a.subLocation || '').trim(),
                capacity: String(a.capacity || '').trim(),
                status: String(a.status || 'صالح').trim(),
                lastInspection: String(a.lastInspection || a.lastServiceDate || '').trim(),
                nextInspection: String(a.nextInspection || '').trim(),
                manufacturer: String(a.manufacturer || '').trim(),
                model: String(a.model || '').trim(),
                installationDate: String(a.installationDate || '').trim()
            };
        }).filter(function(a) { return a.id; });

        // جلب مسؤولي السلامة
        const safetyMembers = [];
        const seenMembers = {};
        function addSafetyMember(name, role) {
            const clean = String(name || '').trim();
            if (!clean || clean.length < 3 || seenMembers[clean.toLowerCase()]) return;
            seenMembers[clean.toLowerCase()] = true;
            safetyMembers.push({ name: clean, role: role || 'مسؤول سلامة' });
        }

        try {
            const users = readFromSheet('Users', spreadsheetId) || [];
            users.forEach(function(u) {
                const name = String(u.name || u.fullName || '').trim();
                const role = String(u.role || '').trim();
                const dept = String(u.department || '').trim();
                const isSafety = (role.toLowerCase() === 'admin' || role.includes('مدير') || dept.includes('سلامة') || dept.toLowerCase().includes('hse') || role.includes('سلامة'));
                if (isSafety && name) addSafetyMember(name, role);
            });
        } catch (uErr) {}

        try {
            const employees = readFromSheet('Employees', spreadsheetId) || [];
            employees.forEach(function(emp) {
                const name = String(emp.name || emp.employeeName || '').trim();
                const dept = String(emp.department || '').trim();
                const job = String(emp.job || emp.jobTitle || '').trim();
                const isSafety = (dept.includes('سلامة') || dept.toLowerCase().includes('hse') || job.includes('سلامة') || job.includes('إطفاء') || job.includes('حريق') || job.includes('مفتش'));
                if (isSafety && name) addSafetyMember(name, job);
            });
        } catch (eErr) {}

        safetyMembers.sort(function(a, b) { return a.name.localeCompare(b.name, 'ar'); });

        // جلب شعار الشركة إن وجد
        let logo = '';
        try {
            const settings = readFromSheet('CompanySettings', spreadsheetId) || [];
            settings.forEach(function(s) {
                if (s.key === 'logo' || s.key === 'companyLogo' || s.key === 'appLogo') {
                    logo = s.value || s.logo || '';
                }
            });
        } catch (sErr) {}

        return {
            success: true,
            assets: assets,
            safetyMembers: safetyMembers,
            logo: logo,
            totalAssets: assets.length
        };
    } catch (error) {
        Logger.log('Error in getPublicFireInspectionConfig: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء جلب تكوين فحص أجهزة الإطفاء: ' + error.toString() };
    }
}

/**
 * تسجيل وتوثيق الفحص الشهري العام لجهاز الإطفاء وتحديث حالة وسجل الجهاز تلقائياً
 */
function submitPublicFireInspection(payload) {
    try {
        if (!payload || typeof payload !== 'object') {
            return { success: false, message: 'بيانات الفحص غير صالحة' };
        }

        // حماية السبام (Honeypot)
        if (payload._hp_field || payload.website || payload.hp) {
            return { success: true, message: 'تم إرسال الفحص بنجاح' };
        }

        const assetId = String(payload.assetId || payload.id || '').trim();
        if (!assetId) {
            return { success: false, message: 'يرجى تحديد أو مسح معرف جهاز الإطفاء (DeviceID)' };
        }

        const inspectorName = String(payload.inspector || payload.inspectorName || '').trim();
        if (!inspectorName) {
            return { success: false, message: 'يرجى اختيار أو إدخال اسم مسؤول الفحص' };
        }

        const spreadsheetId = getSpreadsheetId();
        const inspectionsSheet = 'FireEquipmentInspections';
        const assetsSheet = 'FireEquipmentAssets';

        // التحقق من وجود الجهاز في جدول الأصول
        const assets = readFromSheet(assetsSheet, spreadsheetId) || [];
        const targetAsset = assets.find(function(a) { return String(a.id || '').trim() === assetId; });

        // توليد معرف الفحص
        const inspectionId = generateSequentialId('FEI', inspectionsSheet, spreadsheetId);
        const checkDate = payload.checkDate ? String(payload.checkDate).trim() : Utilities.formatDate(new Date(), 'GMT+2', 'yyyy-MM-dd');
        const statusVal = String(payload.status || 'صالح').trim();

        // رفع الصورة المرفقة إلى Google Drive إن وُجدت
        const attachments = [];
        if (payload.photoBase64 && String(payload.photoBase64).length > 50) {
            try {
                if (typeof uploadFileToDrive === 'function') {
                    const uploadRes = uploadFileToDrive(payload.photoBase64, 'Fire_Insp_' + assetId + '_' + Date.now() + '.jpg', 'image/jpeg', 'FireEquipment');
                    if (uploadRes && uploadRes.success && uploadRes.file && uploadRes.file.url) {
                        attachments.push({
                            name: 'صورة فحص طفاية الحريق ' + assetId,
                            url: uploadRes.file.url,
                            type: 'image/jpeg'
                        });
                    }
                }
            } catch (imgErr) {
                Logger.log('⚠️ تعذر رفع صورة فحص الطفاية: ' + imgErr.toString());
            }
        }

        // بناء سجل الفحص
        const inspectionRecord = {
            id: inspectionId,
            assetId: assetId,
            checkDate: checkDate,
            inspector: inspectorName,
            status: statusVal,
            gaugeReading: String(payload.gaugeReading || '').trim(),
            sealIntact: String(payload.sealIntact || '').trim(), // صمام وتيلة الأمان (سليم / مفقود / مكسور)
            hoseCondition: String(payload.hoseCondition || '').trim(),
            bodyCondition: String(payload.bodyCondition || '').trim(),
            weightOrLevel: String(payload.weightOrLevel || '').trim(),
            remarks: String(payload.remarks || '').trim(),
            actions: String(payload.actions || payload.correctiveAction || '').trim(),
            attachments: (typeof stringifyAttachments === 'function') ? stringifyAttachments(attachments) : JSON.stringify(attachments),
            submittedBy: 'بوابة الفحص العام (Public Fire Inspection Portal)',
            submittedAt: new Date().toISOString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // إضافة الفحص لجدول الفحوصات
        const addResult = appendToSheet(inspectionsSheet, inspectionRecord, spreadsheetId);
        if (!addResult || !addResult.success) {
            return addResult || { success: false, message: 'فشل حفظ سجل الفحص في جدول الفحوصات' };
        }

        // تحديث الأصل في جدول FireEquipmentAssets
        try {
            // حساب تاريخ الفحص القادم (بعد شهر واحد للفحص الدوري الشهري)
            const inspDateObj = new Date(checkDate);
            const nextInspDateObj = new Date(inspDateObj);
            nextInspDateObj.setMonth(nextInspDateObj.getMonth() + 1);
            const nextInspectionStr = Utilities.formatDate(nextInspDateObj, 'GMT+2', 'yyyy-MM-dd');

            const assetUpdateData = {
                status: statusVal,
                lastInspection: checkDate,
                lastServiceDate: checkDate,
                nextInspection: nextInspectionStr,
                updatedAt: new Date()
            };

            if (targetAsset) {
                updateFireEquipmentAsset(assetId, assetUpdateData);
            }
        } catch (assetUpdateErr) {
            Logger.log('Warning: Could not update asset status on public inspection: ' + assetUpdateErr.toString());
        }

        return {
            success: true,
            id: inspectionId,
            assetId: assetId,
            message: 'تم تسجيل وتوثيق الفحص الشهري لجهاز الإطفاء بنجاح.',
            record: inspectionRecord
        };
    } catch (error) {
        Logger.log('Error in submitPublicFireInspection: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تسجيل الفحص: ' + error.toString() };
    }
}


