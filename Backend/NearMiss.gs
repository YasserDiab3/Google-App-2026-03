/**
 * Google Apps Script for HSE System - NearMiss Module
 * 
 * موديول الحوادث الوشيكة - النسخة المحسنة
 */

/**
 * إضافة حادث وشيك
 */
function addNearMissToSheet(nearMissData) {
    try {
        if (!nearMissData) {
            return { success: false, message: 'بيانات الحادث الوشيك غير موجودة' };
        }
        
        const sheetName = 'NearMiss';
        
        // إضافة حقول تلقائية
        if (!nearMissData.id) {
            nearMissData.id = generateSequentialId('NRM', sheetName);
        }
        if (!nearMissData.createdAt) {
            nearMissData.createdAt = new Date();
        }
        if (!nearMissData.updatedAt) {
            nearMissData.updatedAt = new Date();
        }
        if (!nearMissData.status) {
            nearMissData.status = 'جديد';
        }
        
        // معالجة attachments - التأكد من تحويلها إلى JSON string مع الروابط
        if (nearMissData.attachments && Array.isArray(nearMissData.attachments)) {
            nearMissData.attachments = stringifyAttachments(nearMissData.attachments);
        } else if (nearMissData.attachments && typeof nearMissData.attachments === 'object') {
            nearMissData.attachments = stringifyAttachments([nearMissData.attachments]);
        } else if (!nearMissData.attachments) {
            nearMissData.attachments = '[]';
        }
        
        const result = appendToSheet(sheetName, nearMissData);
        
        // إنشاء إجراء تلقائي في Action Tracking إذا كان هناك إجراء تصحيحي
        if (result.success && (nearMissData.correctiveProposed || nearMissData.correctiveDescription)) {
            try {
                createActionFromModule('NearMiss', nearMissData.id || '', {
                    date: nearMissData.date || '',
                    description: nearMissData.description || '',
                    correctiveAction: nearMissData.correctiveProposed || nearMissData.correctiveDescription || '',
                    department: nearMissData.department || '',
                    location: nearMissData.location || '',
                    observerName: nearMissData.observerName || '',
                    createdBy: nearMissData.createdBy || 'System',
                    ...nearMissData
                });
            } catch (error) {
                Logger.log('Error creating auto action from near miss: ' + error.toString());
                // لا نوقف العملية إذا فشل إنشاء الإجراء التلقائي
            }
        }
        
        return result;
    } catch (error) {
        Logger.log('Error in addNearMissToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الحادث الوشيك: ' + error.toString() };
    }
}

/**
 * تحديث حادث وشيك موجود
 */
function updateNearMiss(nearMissId, updateData) {
    try {
        if (!nearMissId) {
            return { success: false, message: 'معرف الحادث الوشيك غير محدد' };
        }
        
        const sheetName = 'NearMiss';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const nearMissIndex = data.findIndex(nm => nm.id === nearMissId);
        
        if (nearMissIndex === -1) {
            return { success: false, message: 'الحادث الوشيك غير موجود' };
        }
        
        // تحديث البيانات
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[nearMissIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating near miss: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الحادث الوشيك: ' + error.toString() };
    }
}

/**
 * الحصول على حادث وشيك محدد
 */
function getNearMiss(nearMissId) {
    try {
        if (!nearMissId) {
            return { success: false, message: 'معرف الحادث الوشيك غير محدد' };
        }
        
        const sheetName = 'NearMiss';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const nearMiss = data.find(nm => nm.id === nearMissId);
        
        if (!nearMiss) {
            return { success: false, message: 'الحادث الوشيك غير موجود' };
        }
        
        return { success: true, data: nearMiss };
    } catch (error) {
        Logger.log('Error getting near miss: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الحادث الوشيك: ' + error.toString() };
    }
}

/**
 * الحصول على جميع الحوادث الوشيكة
 */
function getAllNearMisses(filters = {}) {
    try {
        const sheetName = 'NearMiss';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.department) {
            data = data.filter(nm => nm.department === filters.department);
        }
        if (filters.location) {
            data = data.filter(nm => nm.location === filters.location);
        }
        if (filters.type) {
            data = data.filter(nm => nm.type === filters.type);
        }
        if (filters.status) {
            data = data.filter(nm => nm.status === filters.status);
        }
        if (filters.startDate) {
            data = data.filter(nm => {
                if (!nm.date) return false;
                return new Date(nm.date) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(nm => {
                if (!nm.date) return false;
                return new Date(nm.date) <= new Date(filters.endDate);
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
        Logger.log('Error getting all near misses: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الحوادث الوشيكة: ' + error.toString(), data: [] };
    }
}

/**
 * حذف حادث وشيك
 */
function deleteNearMiss(nearMissId) {
    try {
        if (!nearMissId) {
            return { success: false, message: 'معرف الحادث الوشيك غير محدد' };
        }
        
        const sheetName = 'NearMiss';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(nm => nm.id !== nearMissId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'الحادث الوشيك غير موجود' };
        }
        
        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting near miss: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الحادث الوشيك: ' + error.toString() };
    }
}



/**
 * استرجاع التكوين لنموذج الحوادث الوشيكة العام
 */
function getPublicNearMissConfig() {
    try {
        var sheetName = 'NearMiss';
        var spreadsheetId = getSpreadsheetId();
        
        // 1. قراءة المصانع والمواقع
        var sites = [];
        try {
            if (typeof getAllSites === 'function') {
                sites = getAllSites();
            } else {
                var sitesSheet = getSheetByName('ObservationSites') || getSheetByName('Sites');
                if (sitesSheet) {
                    var sData = readAllRowsWithHeaders(sitesSheet) || [];
                    sites = sData.map(function(r) { return r.name || r.siteName || r.factoryName || ''; }).filter(Boolean);
                }
            }
        } catch (sErr) {}

        if (!sites || sites.length === 0) {
            sites = ['ICAPP-1', 'ICAPP-2', 'ICAPP-3', 'ICAPP-4', 'الموقع العام'];
        }

        // 2. قراءة الإدارات
        var departments = [];
        try {
            var deptSheet = getSheetByName('Departments');
            if (deptSheet) {
                var dData = readAllRowsWithHeaders(deptSheet) || [];
                departments = dData.map(function(r) { return r.name || r.departmentName || ''; }).filter(Boolean);
            }
        } catch (dErr) {}

        if (!departments || departments.length === 0) {
            departments = ['السلامة والصحة المهنية', 'الإنتاج', 'الصيانة الميكانيكية', 'الصيانة الكهربائية', 'الجودة', 'المخازن واللوجستيات', 'الموارد البشرية', 'المرافق والخدمات العامة'];
        }

        var logoUrl = '';
        try {
            var compSheet = getSheetByName('CompanySettings');
            if (compSheet) {
                var cData = readAllRowsWithHeaders(compSheet) || [];
                if (cData.length > 0 && cData[0].logoUrl) logoUrl = cData[0].logoUrl;
            }
        } catch(lErr) {}

        return {
            success: true,
            sites: sites.map(function(s) { return typeof s === 'string' ? { name: s, places: [] } : s; }),
            departments: departments,
            companyLogo: logoUrl
        };
    } catch(e) {
        return { success: false, message: e.toString() };
    }
}

/**
 * تسجيل حادث وشيك عام من خلال النموذج الميداني
 */
function submitPublicNearMiss(payload) {
    try {
        if (!payload) return { success: false, message: 'لا توجد بيانات' };

        var sheetName = 'NearMiss';
        var spreadsheetId = getSpreadsheetId();
        
        var id = generateSequentialId('NRM', sheetName);
        var isoCode = 'NM-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
        
        var record = {
            id: id,
            isoCode: isoCode,
            type: payload.observationType || payload.type || 'سقوط أشياء',
            severity: payload.riskLevel || payload.severity || 'متوسط',
            date: payload.date || new Date().toISOString().split('T')[0],
            observerName: payload.observerName || 'فاعل خير (سري)',
            phone: payload.observerPhone || payload.phone || '',
            location: payload.location || ((payload.siteName || '') + (payload.locationName ? ' - ' + payload.locationName : '')),
            siteName: payload.siteName || '',
            subLocation: payload.locationName || payload.subLocation || '',
            department: payload.responsibleDepartment || payload.department || '',
            description: payload.details || payload.description || '',
            potentialConsequences: payload.potentialConsequences || '',
            correctiveProposed: payload.correctiveAction || '',
            correctiveDescription: payload.correctiveAction || '',
            attachments: '[]',
            status: 'جديد',
            reportedBy: payload.observerName || 'Public Form',
            isAnonymous: payload.isAnonymous ? 'نعم' : 'لا',
            gpsLocation: payload.gpsLocation || '',
            gpsMapLink: payload.gpsMapLink || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // رفع الصورة المرفقة إن وُجدت
        if (payload.image && String(payload.image).startsWith('data:image/')) {
            try {
                var folderName = 'HSE_NearMiss_Attachments';
                var uploadRes = uploadFileToDrive(payload.image, 'image-1', folderName, 'image/jpeg', 'NearMiss', id);
                if (uploadRes && uploadRes.success) {
                    var directLink = 'https://drive.google.com/uc?export=view&id=' + uploadRes.fileId;
                    record.attachments = JSON.stringify([{
                        name: 'image-1',
                        url: directLink,
                        type: 'image/jpeg',
                        id: uploadRes.fileId
                    }]);
                }
            } catch (uErr) {
                Logger.log('Near miss photo upload error: ' + uErr.toString());
            }
        }

        var res = appendToSheet(sheetName, record);
        
        // ربط تلقائي مع CAPA
        if (record.correctiveProposed) {
            try {
                if (typeof addActionTrackingToSheet === 'function') {
                    addActionTrackingToSheet({
                        id: 'ACT_NRM_' + id,
                        title: 'إجراء تصحيحي لحادث وشيك: ' + isoCode,
                        actionType: 'Corrective',
                        sourceModule: 'NearMiss',
                        sourceId: isoCode,
                        description: record.correctiveProposed,
                        hazardDescription: record.description,
                        site: record.siteName,
                        location: record.subLocation,
                        responsibleDepartment: record.department,
                        assignedTo: record.department,
                        priority: (record.severity === 'عالي' || record.severity === 'كارثي' || record.severity === 'وشيك') ? 'High' : 'Medium',
                        status: 'Open',
                        createdAt: new Date().toISOString(),
                        createdBy: record.observerName
                    });
                }
            } catch(aErr) {}
        }

        // إرسال تنبيه فوري لحالات الخطورة العالية
        if (record.severity === 'عالي' || record.severity === 'كارثي' || record.severity === 'وشيك') {
            try {
                var emails = getActiveUserEmailsByRole('safety_manager') || [];
                if (emails.length > 0) {
                    emails.forEach(function(em) {
                        try {
                            MailApp.sendEmail({
                                to: em,
                                subject: '🚨 [بلاغ عاجل] رصد حادث وشيك عالي الخطورة (' + isoCode + ')',
                                htmlBody: '<div dir="rtl" style="font-family: Arial; padding:15px; border:1px solid #dc2626; border-radius:8px;">' +
                                    '<h3 style="color:#dc2626; margin:0 0 10px 0;">🚨 بلاغ حادث وشيك عالي الخطورة</h3>' +
                                    '<p><b>الرقم المرجعي:</b> ' + isoCode + '</p>' +
                                    '<p><b>الموقع:</b> ' + record.location + '</p>' +
                                    '<p><b>التصنيف:</b> ' + record.type + '</p>' +
                                    '<p><b>الوصف وما كاد أن يحدث:</b> ' + record.description + '</p>' +
                                    '<p><b>الإجراء المتخذ:</b> ' + record.correctiveProposed + '</p>' +
                                '</div>'
                            });
                        } catch(mErr) {}
                    });
                }
            } catch(nErr) {}
        }

        return {
            success: true,
            id: id,
            isoCode: isoCode,
            message: 'تم تسجيل الحادث الوشيك بنجاح'
        };
    } catch(e) {
        return { success: false, message: e.toString() };
    }
}
