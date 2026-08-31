/**
 * Google Apps Script for HSE System - Periodic Equipment Module
 * قاعدة بيانات المعدات (كلارك، سلالم، استكر، وغيرها) — الفحوصات الدورية
 */

/**
 * توليد معرف جهاز بتنسيق PEA-0000
 */
function generatePeriodicEquipmentAssetID() {
    try {
        const sheetName = 'PeriodicEquipmentAssets';
        const spreadsheetId = getSpreadsheetId();
        const existingAssets = readFromSheet(sheetName, spreadsheetId);
        var existingNumbers = [];
        if (existingAssets && Array.isArray(existingAssets)) {
            existingNumbers = existingAssets
                .map(function(asset) { return asset.id; })
                .filter(function(id) {
                    return id && typeof id === 'string' && id.match(/^PEA-\d{4}$/);
                })
                .map(function(id) { return parseInt(id.split('-')[1]); })
                .filter(function(num) { return !isNaN(num); });
        }
        var nextNumber = existingNumbers.length > 0 ? Math.max.apply(null, existingNumbers) + 1 : 1;
        return 'PEA-' + ('0000' + nextNumber).slice(-4);
    } catch (error) {
        Logger.log('Error in generatePeriodicEquipmentAssetID: ' + error.toString());
        return 'PEA-' + ('0000' + Date.now().toString().slice(-4)).slice(-4);
    }
}

// ============================================
// أنواع المعدات (Periodic Equipment Types)
// ============================================

function getAllPeriodicEquipmentTypes() {
    try {
        const sheetName = 'PeriodicEquipmentTypes';
        var data = readFromSheet(sheetName, getSpreadsheetId());
        if (!Array.isArray(data)) data = [];
        data.sort(function(a, b) {
            var orderA = typeof a.order === 'number' ? a.order : 999;
            var orderB = typeof b.order === 'number' ? b.order : 999;
            if (orderA !== orderB) return orderA - orderB;
            return String(a.name || '').localeCompare(String(b.name || ''), 'ar');
        });
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error in getAllPeriodicEquipmentTypes: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة أنواع المعدات: ' + error.toString(), data: [] };
    }
}

function savePeriodicEquipmentType(typeData) {
    try {
        if (!typeData || !typeData.name) {
            return { success: false, message: 'اسم النوع مطلوب' };
        }
        const sheetName = 'PeriodicEquipmentTypes';
        const spreadsheetId = getSpreadsheetId();
        var existingData = readFromSheet(sheetName, spreadsheetId);
        if (!Array.isArray(existingData)) existingData = [];

        if (!typeData.id) {
            typeData.id = generateSequentialId('PET', sheetName);
        }
        if (!typeData.createdAt) typeData.createdAt = new Date();
        typeData.updatedAt = new Date();
        if (typeData.active === undefined) typeData.active = true;

        var index = existingData.findIndex(function(t) { return t.id === typeData.id; });
        if (index === -1) {
            return appendToSheet(sheetName, typeData);
        }
        if (existingData[index].createdAt) {
            typeData.createdAt = existingData[index].createdAt;
        }
        for (var key in typeData) {
            if (typeData.hasOwnProperty(key)) {
                existingData[index][key] = typeData[key];
            }
        }
        return saveToSheet(sheetName, existingData, spreadsheetId);
    } catch (error) {
        Logger.log('Error in savePeriodicEquipmentType: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حفظ نوع المعدة: ' + error.toString() };
    }
}

function deletePeriodicEquipmentType(typeId) {
    try {
        if (!typeId) {
            return { success: false, message: 'معرف النوع غير محدد' };
        }
        const sheetName = 'PeriodicEquipmentTypes';
        const spreadsheetId = getSpreadsheetId();
        var data = readFromSheet(sheetName, spreadsheetId);
        if (!Array.isArray(data)) data = [];

        var type = data.find(function(t) { return t.id === typeId; });
        if (!type) {
            return { success: false, message: 'النوع غير موجود' };
        }
        if (type.isDefault === true || type.isDefault === 'true') {
            return { success: false, message: 'لا يمكن حذف النوع الافتراضي' };
        }

        var assets = readFromSheet('PeriodicEquipmentAssets', spreadsheetId);
        if (Array.isArray(assets) && assets.some(function(a) { return a.typeId === typeId; })) {
            return { success: false, message: 'لا يمكن حذف النوع لوجود أجهزة مرتبطة به' };
        }

        data = data.filter(function(t) { return t.id !== typeId; });
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error in deletePeriodicEquipmentType: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف نوع المعدة: ' + error.toString() };
    }
}

// ============================================
// أجهزة المعدات (Periodic Equipment Assets)
// ============================================

function getAllPeriodicEquipmentAssets(filters) {
    filters = filters || {};
    try {
        const sheetName = 'PeriodicEquipmentAssets';
        var data = readFromSheet(sheetName, getSpreadsheetId());
        if (!Array.isArray(data)) data = [];

        if (filters.typeId) {
            data = data.filter(function(a) { return a.typeId === filters.typeId; });
        }
        if (filters.status) {
            data = data.filter(function(a) { return a.status === filters.status; });
        }
        if (filters.location) {
            data = data.filter(function(a) { return a.location === filters.location; });
        }

        data.sort(function(a, b) {
            return String(a.assetNumber || a.id || '').localeCompare(String(b.assetNumber || b.id || ''), 'ar');
        });

        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error in getAllPeriodicEquipmentAssets: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الأجهزة: ' + error.toString(), data: [] };
    }
}

function saveOrUpdatePeriodicEquipmentAsset(assetData) {
    try {
        if (!assetData) {
            return { success: false, message: 'بيانات الجهاز غير موجودة' };
        }
        if (!assetData.id) {
            assetData.id = generatePeriodicEquipmentAssetID();
        }

        const sheetName = 'PeriodicEquipmentAssets';
        const spreadsheetId = getSpreadsheetId();
        var existingData = readFromSheet(sheetName, spreadsheetId);
        if (!Array.isArray(existingData)) existingData = [];

        var assetIndex = existingData.findIndex(function(a) { return a.id === assetData.id; });

        if (assetIndex === -1) {
            if (!assetData.createdAt) assetData.createdAt = new Date();
            assetData.updatedAt = new Date();
            if (!assetData.status) assetData.status = 'صالح';
            if (!assetData.qrCodeData) assetData.qrCodeData = String(assetData.id);
            if (!assetData.assetNumber) assetData.assetNumber = assetData.id;
            return appendToSheet(sheetName, assetData);
        }

        assetData.updatedAt = new Date();
        if (existingData[assetIndex].createdAt) {
            assetData.createdAt = existingData[assetIndex].createdAt;
        }
        for (var key in assetData) {
            if (assetData.hasOwnProperty(key)) {
                existingData[assetIndex][key] = assetData[key];
            }
        }
        return saveToSheet(sheetName, existingData, spreadsheetId);
    } catch (error) {
        Logger.log('Error in saveOrUpdatePeriodicEquipmentAsset: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

function deletePeriodicEquipmentAsset(assetId) {
    try {
        if (!assetId) {
            return { success: false, message: 'معرف الجهاز غير محدد' };
        }
        const sheetName = 'PeriodicEquipmentAssets';
        const spreadsheetId = getSpreadsheetId();
        var data = readFromSheet(sheetName, spreadsheetId);
        if (!Array.isArray(data)) data = [];

        var exists = data.some(function(a) { return a.id === assetId; });
        if (!exists) {
            return { success: false, message: 'الجهاز غير موجود' };
        }

        data = data.filter(function(a) { return a.id !== assetId; });

        // حذف الفحوصات المرتبطة
        try {
            var inspSheet = 'PeriodicEquipmentInspections';
            var inspections = readFromSheet(inspSheet, spreadsheetId);
            if (Array.isArray(inspections)) {
                inspections = inspections.filter(function(i) { return i.assetId !== assetId; });
                saveToSheet(inspSheet, inspections, spreadsheetId);
            }
        } catch (inspErr) {
            Logger.log('Warning: could not clean inspections for asset: ' + inspErr.toString());
        }

        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error in deletePeriodicEquipmentAsset: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الجهاز: ' + error.toString() };
    }
}

// ============================================
// فحوصات المعدات (Periodic Equipment Inspections)
// ============================================

function getAllPeriodicEquipmentInspections(filters) {
    filters = filters || {};
    try {
        const sheetName = 'PeriodicEquipmentInspections';
        var data = readFromSheet(sheetName, getSpreadsheetId());
        if (!Array.isArray(data)) data = [];

        if (filters.assetId) {
            data = data.filter(function(i) { return i.assetId === filters.assetId; });
        }

        data.sort(function(a, b) {
            var dateA = new Date(a.inspectionDate || a.createdAt || 0);
            var dateB = new Date(b.inspectionDate || b.createdAt || 0);
            return dateB - dateA;
        });

        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error in getAllPeriodicEquipmentInspections: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الفحوصات: ' + error.toString(), data: [] };
    }
}

function addPeriodicEquipmentInspection(inspectionData) {
    try {
        if (!inspectionData) {
            return { success: false, message: 'بيانات الفحص غير موجودة' };
        }

        const sheetName = 'PeriodicEquipmentInspections';
        if (!inspectionData.id) {
            inspectionData.id = generateSequentialId('PEI', sheetName);
        }
        if (!inspectionData.createdAt) inspectionData.createdAt = new Date();
        inspectionData.updatedAt = new Date();
        if (!inspectionData.status) inspectionData.status = 'مكتمل';

        if (inspectionData.assetId && inspectionData.inspectionDate) {
            try {
                var nextInspection = new Date(inspectionData.inspectionDate);
                nextInspection.setMonth(nextInspection.getMonth() + 1);
                updatePeriodicEquipmentAssetDates(inspectionData.assetId, {
                    lastInspection: inspectionData.inspectionDate,
                    nextInspection: nextInspection.toISOString().split('T')[0]
                });
            } catch (updateErr) {
                Logger.log('Warning: could not update asset inspection dates: ' + updateErr.toString());
            }
        }

        return appendToSheet(sheetName, inspectionData);
    } catch (error) {
        Logger.log('Error in addPeriodicEquipmentInspection: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الفحص: ' + error.toString() };
    }
}

function updatePeriodicEquipmentAssetDates(assetId, updateData) {
    try {
        if (!assetId) return { success: false, message: 'معرف الجهاز غير محدد' };
        const sheetName = 'PeriodicEquipmentAssets';
        const spreadsheetId = getSpreadsheetId();
        var data = readFromSheet(sheetName, spreadsheetId);
        if (!Array.isArray(data)) return { success: false, message: 'لا توجد بيانات' };
        var index = data.findIndex(function(a) { return a.id === assetId; });
        if (index === -1) return { success: false, message: 'الجهاز غير موجود' };
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[index][key] = updateData[key];
            }
        }
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error in updatePeriodicEquipmentAssetDates: ' + error.toString());
        return { success: false, message: error.toString() };
    }
}
