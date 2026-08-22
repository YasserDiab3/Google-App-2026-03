/**
 * إنشاء وتطبيق قالب PPT افتراضي تلقائياً — تظهر بأعلى قائمة Apps Script (a_...)
 */
function a_createDefaultPptTemplate() {
    return createDefaultDailyObservationsPptTemplate();
}

/**
 * Google Apps Script for HSE System - Daily Observations Module
 * 
 * موديول الملاحظات اليومية - النسخة المنفصلة والمحسنة
 * 
 * هذا الموديول يتعامل مع:
 * - إضافة ملاحظات يومية
 * - تحديث الملاحظات
 * - الحصول على الملاحظات مع فلاتر متقدمة
 * - حذف الملاحظات
 * - إحصائيات الملاحظات
 * - ربط تلقائي مع Action Tracking
 */

/**
 * ============================================
 * الحصول على معرف الملاحظة التالي من الخادم (مصدر الحقيقة)
 * ============================================
 * 
 * يُستخدم من الواجهة عند إنشاء ملاحظة جديدة لضمان تسلسل مستمر بدون تكرار أو قفزات،
 * حتى مع وجود بيانات محلية قديمة أو مستخدمين متزامنين.
 * 
 * @param {Object} payload - بيانات إضافية (غير مطلوبة)
 * @returns {Object} نتيجة العملية مع id و isoCode
 */
function getNextObservationId(payload) {
    try {
        var sheetName = 'DailyObservations';
        var identity = generateNextObservationIdentity(sheetName);
        if (!identity || !identity.id) {
            return { success: false, message: 'تعذر توليد رقم الملاحظة' };
        }
        return {
            success: true,
            data: {
                id: identity.id,
                isoCode: identity.isoCode || getObservationIsoCodeFromId(identity.id)
            }
        };
    } catch (err) {
        Logger.log('getNextObservationId: ' + err.toString());
        return { success: false, message: 'خطأ في توليد رقم الملاحظة: ' + err.toString() };
    }
}

/**
 * ============================================
 * إصلاح تسلسل أرقام الملاحظات اليومية (صفوف قديمة)
 * ============================================
 * 
 * - يضمن أن رقم isoCode يطابق رقم id لكل صف (مع حفظ الشهر YYYYMM الأصلي).
 * - يصلح التكرارات (نفس الرقم لصفّين) والمعرّفات المشوّهة (DOB-101_dup_.. / UUID)
 *   بإعادة ترقيم الصفوف الأحدث برقم جديد مستمر (يُحفظ السجل الأقدم).
 * - لا يعيد ترقيم الصفوف السليمة ولا يضغط الأرقام (لا يتلف المراجع القديمة).
 * 
 * @param {Object} payload - { spreadsheetId (اختياري) }
 * @returns {Object} نتيجة العملية مع تقرير { fixedIsoCodeCount, renumberedCount, totalRows }
 */
function repairObservationSequence(payload) {
    var result = { success: false, message: '' };
    var lock = null;
    try {
        var sheetName = 'DailyObservations';
        var targetSpreadsheetId = (payload && payload.spreadsheetId) || getSpreadsheetId();
        if (!targetSpreadsheetId) {
            return { success: false, message: 'Spreadsheet ID غير محدد' };
        }

        try {
            lock = LockService.getScriptLock();
            lock.waitLock(30000);
        } catch (lockEx) {
            Logger.log('repairObservationSequence lock failed: ' + lockEx.toString());
        }

        try {
            invalidateHseSheetCaches(sheetName);
        } catch (e) {}
        var spreadsheet = SpreadsheetApp.openById(targetSpreadsheetId);
        var sheet = spreadsheet.getSheetByName(sheetName);
        if (!sheet) {
            return { success: false, message: 'الورقة غير موجودة: ' + sheetName };
        }

        var range = sheet.getDataRange();
        var values = range.getValues();
        if (!values || values.length < 2) {
            return { success: true, message: 'لا توجد صفوف لإصلاحها', data: { fixedIsoCodeCount: 0, renumberedCount: 0, totalRows: 0 } };
        }

        var headerRow = values[0].map(function(h) { return String(h || '').trim(); });
        var idCol = headerRow.indexOf('id');
        var isoCol = headerRow.indexOf('isoCode');
        if (idCol < 0) {
            return { success: false, message: 'عمود id غير موجود في الورقة' };
        }

        var now = new Date();
        var curMonth = String(now.getFullYear()) + (String(now.getMonth() + 1).length === 1 ? '0' + String(now.getMonth() + 1) : String(now.getMonth() + 1));

        // جمع كل الأرقام المستخدمة (من id و isoCode) لضمان عدم إعادة استخدام أي رقم
        var usedNums = {};
        function markNum(n) {
            if (n !== null && !isNaN(n) && n > 0) usedNums[n] = true;
        }
        for (var r1 = 1; r1 < values.length; r1++) {
            markNum(extractObservationIdNumber_(values[r1][idCol]));
            if (isoCol >= 0) markNum(extractObservationIdNumber_(values[r1][isoCol]));
        }
        var maxUsed = 0;
        for (var key in usedNums) {
            if (usedNums[key]) {
                var numVal = parseInt(key, 10);
                if (numVal > maxUsed) maxUsed = numVal;
            }
        }
        var nextFree = maxUsed + 1;
        function takeNextFree() {
            while (usedNums[nextFree]) nextFree += 1;
            usedNums[nextFree] = true;
            return nextFree;
        }

        var seenIds = {};
        var fixedIsoCodeCount = 0;
        var renumberedCount = 0;
        var updatedRows = [];

        for (var r2 = 1; r2 < values.length; r2++) {
            var row = values[r2];
            var curId = (row[idCol] === null || row[idCol] === undefined) ? '' : String(row[idCol]).trim();
            var curIso = (isoCol >= 0 && row[isoCol] !== null && row[isoCol] !== undefined) ? String(row[isoCol]).trim() : '';
            if (!curId && !curIso) continue; // صف فارغ

            var idNum = extractObservationIdNumber_(curId);
            var newId = curId;
            var newIso = curIso;
            var changed = false;

            // 1) id مكرر (نفس الرقم لصفّين) أو id مشوّه → إعادة ترقيم برقم جديد مستمر
            if (idNum === null || seenIds[idNum]) {
                var freshNum = takeNextFree();
                var numStr = String(freshNum);
                while (numStr.length < 4) numStr = '0' + numStr;
                var monthM = String(curIso || '').match(/^OBS-(\d{6})-/i);
                var monthKeep = monthM ? monthM[1] : curMonth;
                newId = 'DOB-' + numStr;
                newIso = 'OBS-' + monthKeep + '-' + numStr;
                changed = true;
                renumberedCount += 1;
            } else {
                seenIds[idNum] = true;
                // 2) رقم isoCode لا يطابق رقم id → تصحيح isoCode (مع الحفاظ على الشهر)
                if (isoCol >= 0) {
                    var isoNum = extractObservationIdNumber_(curIso);
                    if (isoNum !== idNum) {
                        var monthM2 = String(curIso || '').match(/^OBS-(\d{6})-/i);
                        var monthKeep2 = monthM2 ? monthM2[1] : curMonth;
                        var numStr2 = String(idNum);
                        while (numStr2.length < 4) numStr2 = '0' + numStr2;
                        newIso = 'OBS-' + monthKeep2 + '-' + numStr2;
                        changed = true;
                        fixedIsoCodeCount += 1;
                    }
                }
            }

            if (changed) {
                updatedRows.push({ row: r2 + 1, id: newId, iso: isoCol >= 0 ? newIso : '' });
            }
        }

        // كتابة التغييرات (الصفوف المتغيرة فقط)
        for (var u = 0; u < updatedRows.length; u++) {
            var upd = updatedRows[u];
            sheet.getRange(upd.row, idCol + 1).setValue(upd.id);
            if (isoCol >= 0 && upd.iso) {
                sheet.getRange(upd.row, isoCol + 1).setValue(upd.iso);
            }
        }

        try {
            invalidateHseSheetCaches(sheetName);
        } catch (e) {}

        result = {
            success: true,
            message: 'تم إصلاح تسلسل أرقام الملاحظات بنجاح',
            data: { fixedIsoCodeCount: fixedIsoCodeCount, renumberedCount: renumberedCount, totalRows: values.length - 1 }
        };
        Logger.log('repairObservationSequence: fixedIso=' + fixedIsoCodeCount + ', renumbered=' + renumberedCount + ', totalRows=' + (values.length - 1));
        return result;
    } catch (err) {
        Logger.log('repairObservationSequence: ' + err.toString());
        return { success: false, message: 'خطأ في إصلاح التسلسل: ' + err.toString() };
    } finally {
        try {
            if (lock) lock.releaseLock();
        } catch (relEx) {}
    }
}

/**
 * ============================================
 * إضافة ملاحظة يومية
 * ============================================
 * 
 * @param {Object} observationData - بيانات الملاحظة
 * @returns {Object} نتيجة العملية
 */
function addObservationToSheet(observationData) {
    try {
        if (!observationData) {
            return { success: false, message: 'بيانات الملاحظة غير موجودة' };
        }

        const sheetName = 'DailyObservations';

        // لا نغيّر id أبداً إذا كان موجوداً. الجديد فقط: id بتنسيق DOB-NNNN (تسلسل مستمر)
        if (!observationData.id) {
            observationData.id = generateDailyObservationId(sheetName);
        }
        // تسجيل isoCode في الجدول = OBS-YYYYMM- + الرقم من id (مثال: DOB-2988 → OBS-202602-2988)
        observationData.isoCode = getObservationIsoCodeFromId(observationData.id);
        if (!observationData.createdAt) {
            observationData.createdAt = new Date();
        }
        if (!observationData.updatedAt) {
            observationData.updatedAt = new Date();
        } 
        if (!observationData.status) {
            observationData.status = 'مفتوح';
        }
        // سير اعتماد الملاحظات (قيم workflowStage بالإنجليزية للتخزين)
        if (!observationData.workflowStage) {
            observationData.workflowStage = 'pending_specialist';
        }
        if (!observationData.submittedAt) {
            observationData.submittedAt = new Date().toISOString();
        }
        
        // معالجة attachments - التأكد من تحويلها إلى JSON string مع الروابط
        if (observationData.attachments && Array.isArray(observationData.attachments)) {
            observationData.attachments = stringifyAttachments(observationData.attachments);
        } else if (observationData.attachments && typeof observationData.attachments === 'object') {
            observationData.attachments = stringifyAttachments([observationData.attachments]);
        } else if (!observationData.attachments) {
            observationData.attachments = '[]';
        }
        
        // معالجة images - إذا كانت موجودة كـ array
        if (observationData.images && Array.isArray(observationData.images)) {
            const processedImages = [];
            for (let i = 0; i < observationData.images.length; i++) {
                const image = observationData.images[i];
                if (typeof image === 'string' && image.startsWith('data:')) {
                    try {
                        const uploadResult = uploadFileToDrive(
                            image,
                            'observation_' + (observationData.id || Utilities.getUuid()) + '_' + Date.now() + '_' + i + '.jpg',
                            'image/jpeg',
                            'DailyObservations'
                        );
                        if (uploadResult && uploadResult.success) {
                            processedImages.push(uploadResult.directLink || uploadResult.shareableLink);
                        } else {
                            processedImages.push(image);
                        }
                    } catch (imageError) {
                        Logger.log('خطأ في رفع صورة الملاحظة: ' + imageError.toString());
                        processedImages.push(image);
                    }
                } else {
                    processedImages.push(image);
                }
            }
            // ✅ لا تستخدم JSON - دع toSheetCellValue_() تتعامل معها
            observationData.images = processedImages;
        }
        
        const result = appendToSheet(sheetName, observationData);

        if (result.success && String(observationData.workflowStage || '') === 'pending_specialist') {
            try {
                notifyObservationWorkflowEmails('new_pending_specialist', observationData, []);
            } catch (notifyErr) {
                Logger.log('notifyObservationWorkflowEmails new: ' + notifyErr.toString());
            }
        }
        
        // إنشاء إجراء تلقائي في Action Tracking إذا كان هناك إجراء تصحيحي
        if (result.success && observationData.correctiveAction) {
            try {
                createActionFromModule('Observations', observationData.id || '', {
                    date: observationData.date || '',
                    description: observationData.description || observationData.observation || '',
                    correctiveAction: observationData.correctiveAction,
                    department: observationData.department || '',
                    location: observationData.location || '',
                    supervisor: observationData.supervisor || '',
                    createdBy: observationData.createdBy || 'System',
                    ...observationData
                });
            } catch (error) {
                Logger.log('Error creating auto action from observation: ' + error.toString());
                // لا نوقف العملية إذا فشل إنشاء الإجراء التلقائي
            }
        }
        
        return result;
    } catch (error) {
        Logger.log('Error in addObservationToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الملاحظة: ' + error.toString() };
    }
}

/**
 * ============================================
 * تحديث ملاحظة يومية
 * ============================================
 *
 * @param {String} observationId - معرف الملاحظة
 * @param {Object} updateData - البيانات المحدثة
 * @returns {Object} نتيجة العملية
 */
function updateObservation(observationId, updateData) {
    try {
        if (!observationId) {
            return { success: false, message: 'معرف الملاحظة غير محدد' };
        }

        const sheetName = 'DailyObservations';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const observationIndex = data.findIndex(o => o.id === observationId);

        if (observationIndex === -1) {
            return { success: false, message: 'الملاحظة غير موجودة' };
        }

        // عدم تغيير id أبداً — الاحتفاظ بالمعرف المسجل كما هو
        if (updateData.hasOwnProperty('id')) delete updateData.id;
        
        // معالجة الصور المرفعة بعد التنفيذ
        if (updateData.afterExecutionImages && Array.isArray(updateData.afterExecutionImages)) {
            const processedImages = [];
            for (let i = 0; i < updateData.afterExecutionImages.length; i++) {
                const image = updateData.afterExecutionImages[i];
                if (typeof image === 'string' && image.startsWith('data:')) {
                    try {
                        const uploadResult = uploadFileToDrive(
                            image,
                            'after_execution_' + observationId + '_' + Date.now() + '_' + i + '.jpg',
                            'image/jpeg',
                            'DailyObservations/AfterExecution'
                        );
                        if (uploadResult && uploadResult.success) {
                            processedImages.push({
                                url: uploadResult.shareableLink || uploadResult.directLink,
                                uploadedAt: new Date().toISOString(),
                                uploadedBy: updateData.updatedBy || 'System'
                            });
                        } else {
                            processedImages.push(image);
                        }
                    } catch (imageError) {
                        Logger.log('خطأ في رفع صورة بعد التنفيذ: ' + imageError.toString());
                        processedImages.push(image);
                    }
                } else if (typeof image === 'object') {
                    // صورة موجودة مسبقاً
                    processedImages.push(image);
                }
            }
            updateData.afterExecutionImages = processedImages;
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[observationIndex][key] = updateData[key];
            }
        }

        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating observation: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الملاحظة: ' + error.toString() };
    }
}

/**
 * ============================================
 * الحصول على ملاحظة محددة
 * ============================================
 * 
 * @param {String} observationId - معرف الملاحظة
 * @returns {Object} نتيجة العملية مع بيانات الملاحظة
 */
function getObservation(observationId) {
    try {
        if (!observationId) {
            return { success: false, message: 'معرف الملاحظة غير محدد' };
        }
        
        const sheetName = 'DailyObservations';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const observation = data.find(o => o.id === observationId);
        
        if (!observation) {
            return { success: false, message: 'الملاحظة غير موجودة' };
        }
        
        return { success: true, data: observation };
    } catch (error) {
        Logger.log('Error getting observation: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الملاحظة: ' + error.toString() };
    }
}

/**
 * ============================================
 * الحصول على جميع الملاحظات
 * ============================================
 * 
 * @param {Object} filters - فلاتر البحث (اختياري)
 * @param {String} filters.supervisor - المشرف
 * @param {String} filters.observationType - نوع الملاحظة
 * @param {String} filters.status - الحالة
 * @param {String} filters.department - الإدارة
 * @param {Date} filters.startDate - تاريخ البداية
 * @param {Date} filters.endDate - تاريخ النهاية
 * @returns {Object} نتيجة العملية مع قائمة الملاحظات
 */
function getAllObservations(filters = {}) {
    try {
        const sheetName = 'DailyObservations';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.supervisor) {
            data = data.filter(o => o.supervisor === filters.supervisor);
        }
        if (filters.observationType) {
            data = data.filter(o => o.observationType === filters.observationType);
        }
        if (filters.status) {
            data = data.filter(o => o.status === filters.status);
        }
        if (filters.department) {
            data = data.filter(o => o.department === filters.department);
        }
        if (filters.startDate) {
            data = data.filter(o => {
                if (!o.date) return false;
                return new Date(o.date) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(o => {
                if (!o.date) return false;
                return new Date(o.date) <= new Date(filters.endDate);
            });
        }
        
        // دالة مساعدة لاستخراج الرقم من رقم الملاحظة للترتيب
        const extractObservationNumber = (isoCode) => {
            if (!isoCode) return 0;
            const match = String(isoCode).match(/(\d+)$/);
            return match ? parseInt(match[1], 10) : 0;
        };
        
        // ترتيب حسب رقم الملاحظة من الأقدم للأحدث
        data.sort((a, b) => {
            const numA = extractObservationNumber(a.isoCode);
            const numB = extractObservationNumber(b.isoCode);
            return numA - numB;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all observations: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الملاحظات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * حذف ملاحظة
 * ============================================
 * 
 * @param {String} observationId - معرف الملاحظة
 * @returns {Object} نتيجة العملية
 */
function deleteObservation(observationId) {
    try {
        if (!observationId) {
            return { success: false, message: 'معرف الملاحظة غير محدد' };
        }
        
        const sheetName = 'DailyObservations';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(o => o.id !== observationId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'الملاحظة غير موجودة' };
        }
        
        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting observation: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الملاحظة: ' + error.toString() };
    }
}

/**
 * ============================================
 * حذف جميع الملاحظات
 * ============================================
 * 
 * @returns {Object} نتيجة العملية
 */
function deleteAllObservations() {
    try {
        const sheetName = 'DailyObservations';
        const spreadsheetId = getSpreadsheetId();
        
        // حفظ مصفوفة فارغة (سيحذف جميع البيانات)
        const result = saveToSheet(sheetName, [], spreadsheetId);
        
        if (result.success) {
            return { success: true, message: 'تم حذف جميع الملاحظات بنجاح' };
        } else {
            return { success: false, message: result.message || 'فشل حذف جميع الملاحظات' };
        }
    } catch (error) {
        Logger.log('Error in deleteAllObservations: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف جميع الملاحظات: ' + error.toString() };
    }
}

/**
 * ============================================
 * الحصول على إحصائيات الملاحظات
 * ============================================
 * 
 * @param {Object} filters - فلاتر البحث (اختياري)
 * @returns {Object} نتيجة العملية مع الإحصائيات
 */
function getObservationStatistics(filters = {}) {
    try {
        const allObservations = getAllObservations(filters);
        if (!allObservations.success) {
            return { success: false, message: 'فشل في قراءة الملاحظات' };
        }
        
        const observations = allObservations.data;
        const stats = {
            total: observations.length,
            byType: {},
            byStatus: {},
            bySupervisor: {},
            byDepartment: {},
            withCorrectiveAction: 0,
            trend: 'stable'
        };
        
        observations.forEach(obs => {
            // حسب النوع
            const type = obs.observationType || 'Unknown';
            stats.byType[type] = (stats.byType[type] || 0) + 1;
            
            // حسب الحالة
            const status = obs.status || 'Unknown';
            stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
            
            // حسب المشرف
            if (obs.supervisor) {
                stats.bySupervisor[obs.supervisor] = (stats.bySupervisor[obs.supervisor] || 0) + 1;
            }
            
            // حسب الإدارة
            if (obs.department) {
                stats.byDepartment[obs.department] = (stats.byDepartment[obs.department] || 0) + 1;
            }
            
            // مع إجراء تصحيحي
            if (obs.correctiveAction) {
                stats.withCorrectiveAction++;
            }
        });
        
        // حساب الاتجاه
        const now = new Date();
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        const recent = observations.filter(obs => {
            if (!obs.date) return false;
            return new Date(obs.date) >= threeMonthsAgo;
        });
        const older = observations.filter(obs => {
            if (!obs.date) return false;
            const obsDate = new Date(obs.date);
            return obsDate < threeMonthsAgo && obsDate >= new Date(now.getFullYear(), now.getMonth() - 6, 1);
        });
        
        if (recent.length > older.length * 1.2) {
            stats.trend = 'increasing';
        } else if (recent.length < older.length * 0.8) {
            stats.trend = 'decreasing';
        }
        
        return { success: true, data: stats };
    } catch (error) {
        Logger.log('Error getting observation statistics: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حساب الإحصائيات: ' + error.toString() };
    }
}

/**
 * ============================================
 * إدارة Template ID لتصدير PPT
 * ============================================
 */

/**
 * ضبط Template ID لتصدير PPT للملاحظات اليومية
 * 
 * @param {string|Object} templateIdOrPayload - File ID لملف Google Slides Template أو payload يحتوي على templateId
 * @returns {Object} نتيجة العملية
 */
function setDailyObservationsPptTemplateId(templateIdOrPayload) {
    try {
        let templateId;
        if (typeof templateIdOrPayload === 'string') {
            templateId = templateIdOrPayload;
        } else if (templateIdOrPayload && typeof templateIdOrPayload === 'object') {
            templateId = templateIdOrPayload.templateId || templateIdOrPayload.templateID || templateIdOrPayload.id;
        }
        
        if (!templateId || typeof templateId !== 'string' || templateId.trim() === '') {
            return { success: false, message: 'يرجى تحديد Template ID صحيح.' };
        }
        
        templateId = templateId.trim();
        
        // التحقق من صحة Template ID بمحاولة الوصول للملف
        try {
            const templateFile = DriveApp.getFileById(templateId);
            const mimeType = templateFile.getMimeType();
            if (mimeType !== 'application/vnd.google-apps.presentation') {
                return { 
                    success: false, 
                    message: 'الملف المحدد ليس ملف Google Slides. يرجى تحديد ملف Google Slides Template.' 
                };
            }
        } catch (fileError) {
            return { 
                success: false, 
                message: 'لا يمكن الوصول للملف المحدد. تأكد من صحة Template ID وصلاحيات الوصول.' 
            };
        }
        
        // حفظ في Script Properties
        const props = PropertiesService.getScriptProperties();
        props.setProperty('DAILY_OBSERVATIONS_PPT_TEMPLATE_ID', templateId);
        
        return { 
            success: true, 
            message: 'تم ضبط Template ID بنجاح.',
            templateId: templateId
        };
    } catch (error) {
        Logger.log('Error in setDailyObservationsPptTemplateId: ' + error.toString());
        return { 
            success: false, 
            message: 'حدث خطأ أثناء ضبط Template ID: ' + error.toString() 
        };
    }
}

/**
 * بناء شريحة "الغلاف" (Cover Slide) بشكل احترافي مع دعم إضافة شعار الشركة تلقائياً
 */
function _dob_buildCoverSlide_(coverSlide, department, dateLabel, logoUrl, isEnglish) {
    if (!coverSlide) return;
    try {
        var elements = coverSlide.getPageElements();
        for (var i = elements.length - 1; i >= 0; i--) {
            try { elements[i].remove(); } catch(e) {}
        }
        coverSlide.getBackground().setSolidFill('#ffffff');

        // 1) شريط ذهبي علوي نحيف
        const topStripe = coverSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 5);
        topStripe.getFill().setSolidFill('#d97706');
        topStripe.getBorder().setTransparent();

        // 2) الشعار الأيسر (تناسب الأبعاد 100% بدون تشويه)
        let insertedLeftLogo = false;
        if (logoUrl) {
            try {
                const logoBlob = _dob_getImageBlobFromUrl_(logoUrl);
                if (logoBlob) {
                    const img = coverSlide.insertImage(logoBlob);
                    const origW = img.getWidth();
                    const origH = img.getHeight();
                    const maxW = 180;
                    const maxH = 55;
                    if (origW > 0 && origH > 0) {
                        const ratio = Math.min(maxW / origW, maxH / origH);
                        const newW = origW * ratio;
                        const newH = origH * ratio;
                        img.setWidth(newW);
                        img.setHeight(newH);
                        img.setLeft(35);
                        img.setTop(20 + (maxH - newH) / 2);
                    } else {
                        img.setLeft(35);
                        img.setTop(20);
                        img.setWidth(maxW);
                        img.setHeight(maxH);
                    }
                    img.setTitle('COVER_LOGO');
                    img.setDescription('COVER_LOGO');
                    insertedLeftLogo = true;
                }
            } catch(lErr) {
                Logger.log('Cover Slide Logo insertion error: ' + lErr);
            }
        }

        if (!insertedLeftLogo) {
            const logoLeft = coverSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 35, 22, 170, 48);
            logoLeft.getFill().setSolidFill('#ffffff');
            logoLeft.getBorder().setWeight(2);
            logoLeft.getBorder().getLineFill().setSolidFill('#dc2626');
            logoLeft.setTitle('COVER_LOGO');
            logoLeft.setDescription('COVER_LOGO');
            const logoLeftTxt = logoLeft.getText();
            logoLeftTxt.setText('AMERICANA');
            logoLeftTxt.getTextStyle().setFontFamily(isEnglish ? 'Arial' : 'Cairo').setFontSize(18).setBold(true).setForegroundColor('#dc2626');
            try { logoLeftTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER); } catch(e) {}
        }

        // 3) عنوان النظام الأيمن العلوي
        const logoRight = coverSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 440, 22, 245, 48);
        logoRight.getFill().setTransparent();
        logoRight.getBorder().setTransparent();
        const logoRightTxt = logoRight.getText();
        logoRightTxt.setText(isEnglish ? 'HSE Management System\nSafety & Health Department' : 'نظام السلامة والصحة المهنية\nHSE Management System');
        logoRightTxt.getTextStyle().setFontFamily(isEnglish ? 'Arial' : 'Cairo').setFontSize(12).setBold(true).setForegroundColor('#047857');
        try { logoRightTxt.getParagraphStyle().setParagraphAlignment(isEnglish ? SlidesApp.ParagraphAlignment.LEFT : SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        // 4) كارت العنوان الرئيسي في الأوسط (تصميم تنفيذي راقٍ)
        const centerCard = coverSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 60, 110, 600, 155);
        centerCard.getFill().setSolidFill('#0f172a');
        centerCard.getBorder().setWeight(2);
        centerCard.getBorder().getLineFill().setSolidFill('#d97706');
        const cardText = centerCard.getText();
        cardText.setText(isEnglish 
            ? 'Daily Safety Observations Report\nMonthly Summary & Action Plan\nAmericana Group'
            : 'تقرير الملاحظات والحيودات اليومية\nDaily Safety Observations Report\nمجموعة أمريكانا - Americana Group');
        
        try {
            cardText.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
            var cardParas = cardText.getParagraphs();
            if (cardParas.length >= 1) {
                cardParas[0].getRange().getTextStyle().setFontFamily(isEnglish ? 'Arial' : 'Cairo').setFontSize(24).setBold(true).setForegroundColor('#ffffff');
            }
            if (cardParas.length >= 2) {
                cardParas[1].getRange().getTextStyle().setFontFamily('Arial').setFontSize(16).setBold(true).setForegroundColor('#fbbf24');
            }
            if (cardParas.length >= 3) {
                cardParas[2].getRange().getTextStyle().setFontFamily(isEnglish ? 'Arial' : 'Cairo').setFontSize(13).setBold(false).setForegroundColor('#94a3b8');
            }
        } catch(pErr) {
            cardText.getTextStyle().setFontFamily(isEnglish ? 'Arial' : 'Cairo').setFontSize(20).setBold(true).setForegroundColor('#ffffff');
        }

        // 5) كارت بيانات الإدارة والتاريخ
        const blueBox = coverSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, isEnglish ? 60 : 410, 285, 250, 95);
        blueBox.getFill().setSolidFill('#1e40af');
        blueBox.getBorder().setWeight(1.5);
        blueBox.getBorder().getLineFill().setSolidFill('#3b82f6');
        const blueBoxTxt = blueBox.getText();
        blueBoxTxt.setText(isEnglish 
            ? `Department : ${department || '{{DEPARTMENT}}'}\n\nReport Date : ${dateLabel || '{{REPORT_DATE}}'}`
            : `الإدارة : ${department || '{{DEPARTMENT}}'}\n\nتاريخ التقرير : ${dateLabel || '{{REPORT_DATE}}'}`);
        blueBoxTxt.getTextStyle().setFontFamily(isEnglish ? 'Arial' : 'Cairo').setFontSize(13).setBold(true).setForegroundColor('#ffffff');
        try {
            blueBoxTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
        } catch(e) {}

        // 6) شريط كحلي سفلي
        const bottomStripe = coverSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 405, 720, 5);
        bottomStripe.getFill().setSolidFill('#0f172a');
        bottomStripe.getBorder().setTransparent();

    } catch(err) {
        Logger.log('_dob_buildCoverSlide_ error: ' + err);
    }
}

/**
 * بناء شريحة "نظرة عامة على التقرير" (الداشبورد الإحصائي الأول)
 */
function _dob_buildOverviewSlide_(slide, observations, department, reportDateStr) {
    if (!slide) return;
    try {
        slide.getPageElements().forEach(function(el) { try { el.remove(); } catch(e) {} });
        slide.getBackground().setSolidFill('#f8fafc');

        const total = (observations && observations.length) ? observations.length : 0;
        let high = 0, med = 0, low = 0;
        let open = 0, prog = 0, closed = 0;

        if (Array.isArray(observations)) {
            observations.forEach(function(o) {
                const r = String(o.riskLevel || '').toLowerCase();
                const s = String(o.status || '').toLowerCase();
                if (r.includes('عالي') || r.includes('حرجة') || r.includes('high') || r.includes('critical')) high++;
                else if (r.includes('متوسط') || r.includes('medium')) med++;
                else low++;

                if (s.includes('مغلق') || s.includes('closed') || s.includes('مكتمل')) closed++;
                else if (s.includes('جاري') || s.includes('progress') || s.includes('قيد')) prog++;
                else open++;
            });
        }

        // 1) الهيدر الكحلي العلوي
        const header = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 45);
        header.getFill().setSolidFill('#0f172a');
        header.getBorder().setTransparent();
        const hTxt = header.getText();
        hTxt.setText('نظرة عامة على التقرير');
        hTxt.getTextStyle().setFontFamily('Cairo').setFontSize(20).setBold(true).setForegroundColor('#ffffff');
        try { hTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        // خط ذهبي تحت الهيدر
        const stripe = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 45, 720, 4);
        stripe.getFill().setSolidFill('#d97706');
        stripe.getBorder().setTransparent();

        // 2) السطر الفرعي
        const subTitle = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 10, 52, 700, 20);
        subTitle.getFill().setTransparent();
        subTitle.getBorder().setTransparent();
        const subTxt = subTitle.getText();
        subTxt.setText(`نوع التقرير: الملاحظات اليومية  ·  الإدارة: ${department}  ·  تاريخ التقرير: ${reportDateStr}`);
        subTxt.getTextStyle().setFontFamily('Cairo').setFontSize(10).setForegroundColor('#64748b');
        try { subTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        // 3) 4 كروت إحصائية علوية
        const cardsData = [
            { label: 'إجمالي الملاحظات', val: total, color: '#0f172a', left: 540 },
            { label: 'أولوية عالية / حرجة', val: high, color: '#dc2626', left: 365 },
            { label: 'أولوية متوسطة', val: med, color: '#d97706', left: 190 },
            { label: 'حالات مفتوحة', val: open, color: '#0284c7', left: 15 }
        ];

        cardsData.forEach(function(c) {
            const card = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, c.left, 75, 165, 80);
            card.getFill().setSolidFill('#ffffff');
            card.getBorder().setWeight(1);
            card.getBorder().getLineFill().setSolidFill('#cbd5e1');

            const topBar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, c.left + 5, 77, 155, 4);
            topBar.getFill().setSolidFill(c.color);
            topBar.getBorder().setTransparent();

            const cTxt = card.getText();
            cTxt.setText(`${c.val}\n${c.label}`);
            cTxt.getTextStyle().setFontFamily('Cairo').setFontSize(10).setForegroundColor('#64748b');
            try { cTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER); } catch(e) {}

            const valRange = cTxt.getRange(0, String(c.val).length);
            valRange.getTextStyle().setFontSize(24).setBold(true).setForegroundColor(c.color);
        });

        // 4) صندوقان إحصائيان سفليان
        // الصندوق الأيمن: توزيع الحالات
        const statusBox = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 365, 165, 340, 150);
        statusBox.getFill().setSolidFill('#ffffff');
        statusBox.getBorder().setWeight(1);
        statusBox.getBorder().getLineFill().setSolidFill('#cbd5e1');
        const sTxt = statusBox.getText();
        sTxt.setText(`توزيع الحالات\n\n- مفتوح : ${open}\n- جاري العمل : ${prog}\n- مغلق : ${closed}`);
        sTxt.getTextStyle().setFontFamily('Cairo').setFontSize(12).setBold(true).setForegroundColor('#1e293b');
        try { sTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        // الصندوق الأيسر: توزيع الأولويات
        const prioBox = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 15, 165, 340, 150);
        prioBox.getFill().setSolidFill('#ffffff');
        prioBox.getBorder().setWeight(1);
        prioBox.getBorder().getLineFill().setSolidFill('#cbd5e1');
        const pTxt = prioBox.getText();
        pTxt.setText(`توزيع الأولويات\n\n- عالي / حرج : ${high}\n- متوسط : ${med}\n- منخفض : ${low}`);
        pTxt.getTextStyle().setFontFamily('Cairo').setFontSize(12).setBold(true).setForegroundColor('#1e293b');
        try { pTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        // 5) صندوق تنبيه سفلي
        const alertBox = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 15, 325, 690, 40);
        alertBox.getFill().setSolidFill(high > 0 ? '#fef2f2' : '#f0fdf4');
        alertBox.getBorder().setWeight(1.5);
        alertBox.getBorder().getLineFill().setSolidFill(high > 0 ? '#fca5a5' : '#86efac');
        const aTxt = alertBox.getText();
        aTxt.setText(high > 0 ? `⚠️ ملاحظات عالية الأولوية مفتوحة ( ${high} ) : تتطلب متابعة وإغلاق عاجل` : `✅ جميع الملاحظات ذات الأولوية العالية تم معالجتها بشكل تام.`);
        aTxt.getTextStyle().setFontFamily('Cairo').setFontSize(12).setBold(true).setForegroundColor(high > 0 ? '#991b1b' : '#166534');
        try { aTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER); } catch(e) {}
    } catch(err) {
        Logger.log('_dob_buildOverviewSlide_ error: ' + err);
    }
}

/**
 * بناء شريحة "ملخص تنفيذي للملاحظات" (الداشبورد الإحصائي الثاني)
 */
function _dob_buildExecutiveSummarySlide_(slide, observations, department, reportDateStr) {
    if (!slide) return;
    try {
        slide.getPageElements().forEach(function(el) { try { el.remove(); } catch(e) {} });
        slide.getBackground().setSolidFill('#f8fafc');

        const total = (observations && observations.length) ? observations.length : 0;
        let high = 0, med = 0, low = 0;
        let open = 0, prog = 0, closed = 0;

        if (Array.isArray(observations)) {
            observations.forEach(function(o) {
                const r = String(o.riskLevel || '').toLowerCase();
                const s = String(o.status || '').toLowerCase();
                if (r.includes('عالي') || r.includes('حرجة') || r.includes('high') || r.includes('critical')) high++;
                else if (r.includes('متوسط') || r.includes('medium')) med++;
                else low++;

                if (s.includes('مغلق') || s.includes('closed') || s.includes('مكتمل')) closed++;
                else if (s.includes('جاري') || s.includes('progress') || s.includes('قيد')) prog++;
                else open++;
            });
        }

        const closedRate = total > 0 ? Math.round((closed / total) * 100) : 0;
        const openWorkload = open + prog;

        // 1) الهيدر الكحلي العلوي
        const header = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 45);
        header.getFill().setSolidFill('#0f172a');
        header.getBorder().setTransparent();
        const hTxt = header.getText();
        hTxt.setText('ملخص تنفيذي للملاحظات');
        hTxt.getTextStyle().setFontFamily('Cairo').setFontSize(20).setBold(true).setForegroundColor('#ffffff');
        try { hTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        // خط ذهبي تحت الهيدر
        const stripe = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 45, 720, 4);
        stripe.getFill().setSolidFill('#d97706');
        stripe.getBorder().setTransparent();

        // 2) السطر الفرعي
        const subTitle = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 10, 52, 700, 20);
        subTitle.getFill().setTransparent();
        subTitle.getBorder().setTransparent();
        const subTxt = subTitle.getText();
        subTxt.setText('لوحة دعم القرار — مؤشرات مخاطر وإغلاق للمساءلة الإدارية');
        subTxt.getTextStyle().setFontFamily('Cairo').setFontSize(10).setForegroundColor('#64748b');
        try { subTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        // 3) 4 كروت إحصائية علوية
        const cardsData = [
            { label: 'معدل الإغلاق', val: `${closedRate}%`, color: '#d97706', left: 540 },
            { label: 'حرج مفتوح', val: high, color: '#dc2626', left: 365 },
            { label: 'عبء العمل المتبقي', val: openWorkload, color: '#0284c7', left: 190 },
            { label: 'إجمالي الملاحظات', val: total, color: '#0f172a', left: 15 }
        ];

        cardsData.forEach(function(c) {
            const card = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, c.left, 75, 165, 75);
            card.getFill().setSolidFill('#ffffff');
            card.getBorder().setWeight(1);
            card.getBorder().getLineFill().setSolidFill('#cbd5e1');

            const topBar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, c.left + 5, 77, 155, 4);
            topBar.getFill().setSolidFill(c.color);
            topBar.getBorder().setTransparent();

            const cTxt = card.getText();
            cTxt.setText(`${c.val}\n${c.label}`);
            cTxt.getTextStyle().setFontFamily('Cairo').setFontSize(10).setForegroundColor('#64748b');
            try { cTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER); } catch(e) {}

            const valRange = cTxt.getRange(0, String(c.val).length);
            valRange.getTextStyle().setFontSize(22).setBold(true).setForegroundColor(c.color);
        });

        // 4) مصفوفة المخاطر والتوزيع التنفيذي
        const matrixBox = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 365, 160, 340, 135);
        matrixBox.getFill().setSolidFill('#ffffff');
        matrixBox.getBorder().setWeight(1);
        matrixBox.getBorder().getLineFill().setSolidFill('#cbd5e1');
        const mTxt = matrixBox.getText();
        mTxt.setText(`مصفوفة المخاطر (أولوية × حالة)\n\n- عالي / حرج :  مفتوح (${high})  |  جاري (0)  |  مغلق (0)\n- متوسط :  مفتوح (${med})  |  جاري (0)  |  مغلق (0)\n- منخفض :  مفتوح (${low})  |  جاري (0)  |  مغلق (0)`);
        mTxt.getTextStyle().setFontFamily('Cairo').setFontSize(10).setBold(true).setForegroundColor('#1e293b');
        try { mTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        const statusChartBox = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 15, 160, 340, 135);
        statusChartBox.getFill().setSolidFill('#ffffff');
        statusChartBox.getBorder().setWeight(1);
        statusChartBox.getBorder().getLineFill().setSolidFill('#cbd5e1');
        const scTxt = statusChartBox.getText();
        scTxt.setText(`توزيع الحالات (أعمدة)\n\n- إجمالي الملاحظات: ${total}\n- الملاحظات المفتوحة: ${open}\n- الملاحظات المغلقة: ${closed}`);
        scTxt.getTextStyle().setFontFamily('Cairo').setFontSize(10).setBold(true).setForegroundColor('#1e293b');
        try { scTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        // 5) توصيات للإدارة
        const recBox = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 15, 305, 690, 80);
        recBox.getFill().setSolidFill('#eff6ff');
        recBox.getBorder().setWeight(1.5);
        recBox.getBorder().getLineFill().setSolidFill('#3b82f6');
        const rTxt = recBox.getText();
        rTxt.setText(
            'توصيات للإدارة:\n' +
            `1. تصعيد فوري لـ ${high} ملاحظة عالية الأولوية ما زالت مفتوحة وتحديد مالك وموعد خلال 48 ساعة.\n` +
            `2. معدل الإغلاق الحالي (${closedRate}%) دون المستهدف التشغيلي — مراجعة عوائق التنفيذ أسبوعياً.\n` +
            `3. عبء العمل المتبقي ${openWorkload} ملاحظة — توزيع المسؤوليات بين الإدارات وتفعيل المتابعة.`
        );
        rTxt.getTextStyle().setFontFamily('Cairo').setFontSize(10).setForegroundColor('#1e3a8a');
        try { rTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT); } catch(e) {}

        const headerRange = rTxt.find('توصيات للإدارة:');
        if (headerRange && headerRange.length) {
            headerRange[0].getTextStyle().setFontSize(11).setBold(true).setUnderline(true).setForegroundColor('#1d4ed8');
        }
    } catch(err) {
        Logger.log('_dob_buildExecutiveSummarySlide_ error: ' + err);
    }
}

/**
 * إنشاء قالب Google Slides افتراضي وتطبيقه تلقائياً
 * @returns {Object} نتيجة التوليد مضافاً إليها templateId و presentationUrl
 */
function createDefaultDailyObservationsPptTemplate() {
    try {
        if (typeof SlidesApp === 'undefined') {
            return { success: false, message: 'خدمة SlidesApp غير متوفرة في المشروع.' };
        }

        const presentation = SlidesApp.create('قالب تقارير الملاحظات اليومية (Americana / ICAPP Template)');
        const slides = presentation.getSlides();
        const blankLayout = (typeof SlidesApp !== 'undefined' && SlidesApp.PredefinedLayout && SlidesApp.PredefinedLayout.BLANK) 
            ? SlidesApp.PredefinedLayout.BLANK 
            : undefined;
        
        // ==========================================
        // الشريحة الأولى (الغلاف)
        // ==========================================
        const coverSlide = slides[0];
        _dob_buildCoverSlide_(coverSlide, '{{DEPARTMENT}}', '{{REPORT_DATE}}', null);

        // ==========================================
        // الشريحة الثانية (نظرة عامة على التقرير - الداشبورد 1)
        // ==========================================
        const overviewSlide = blankLayout ? presentation.appendSlide(blankLayout) : presentation.appendSlide();
        _dob_buildOverviewSlide_(overviewSlide, [], '{{DEPARTMENT}}', '{{REPORT_DATE}}');

        // ==========================================
        // الشريحة الثالثة (نموذج تفاصيل الملاحظة)
        // ==========================================
        const itemTemplateSlide = blankLayout ? presentation.appendSlide(blankLayout) : presentation.appendSlide();
        itemTemplateSlide.getBackground().setSolidFill('#ffffff');

        const rightHeader = itemTemplateSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 360, 10, 345, 38);
        rightHeader.getFill().setSolidFill('#94a3b8');
        rightHeader.getBorder().setWeight(1.5);
        rightHeader.getBorder().getLineFill().setSolidFill('#000000');
        const rHeadTxt = rightHeader.getText();
        rHeadTxt.setText('وصف الملاحظة');
        rHeadTxt.getTextStyle().setFontFamily('Cairo').setFontSize(20).setBold(true).setForegroundColor('#000000');

        const leftHeader = itemTemplateSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 10, 10, 340, 38);
        leftHeader.getFill().setSolidFill('#94a3b8');
        leftHeader.getBorder().setWeight(1.5);
        leftHeader.getBorder().getLineFill().setSolidFill('#000000');
        const lHeadTxt = leftHeader.getText();
        lHeadTxt.setText('الصورة التوضيحية');
        lHeadTxt.getTextStyle().setFontFamily('Cairo').setFontSize(20).setBold(true).setForegroundColor('#000000');

        const rightBodyBox = itemTemplateSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 360, 52, 345, 340);
        rightBodyBox.getFill().setSolidFill('#bfdbfe');
        rightBodyBox.getBorder().setWeight(1.5);
        rightBodyBox.getBorder().getLineFill().setSolidFill('#000000');

        try {
            if (SlidesApp.ContentAlignment && SlidesApp.ContentAlignment.TOP) {
                rightBodyBox.setContentAlignment(SlidesApp.ContentAlignment.TOP);
            }
        } catch (cErr) { /* ignore */ }

        try {
            rightBodyBox.setMarginLeft(12);
            rightBodyBox.setMarginRight(12);
            rightBodyBox.setMarginTop(10);
            rightBodyBox.setMarginBottom(10);
        } catch (mErr) { /* ignore */ }

        const bodyTxt = rightBodyBox.getText();
        bodyTxt.setText(
            'رقم الملاحظة : {{OBS_NO}}\n' +
            'التاريخ : {{OBS_DATE}}\n' +
            'المكان : {{OBS_LOCATION}}\n' +
            '\n' +
            'الملاحظة :\n' +
            '{{OBS_DETAILS}}\n' +
            '\n' +
            'الإجراء التصحيحي :\n' +
            '{{CORRECTIVE_ACTION}}\n' +
            '\n' +
            'مدى الخطورة : {{RISK_LEVEL}}\n' +
            'تاريخ التنفيذ المقترح : {{TARGET_DATE}}\n' +
            'المسئول عن التنفيذ : {{RESPONSIBLE}}\n' +
            'الحالة : {{STATUS}}'
        );

        try {
            bodyTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT);
            const paras = bodyTxt.getParagraphs();
            for (let i = 0; i < paras.length; i++) {
                paras[i].getRange().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT);
            }
        } catch (alignErr) {
            Logger.log('Alignment error: ' + alignErr);
        }

        bodyTxt.getTextStyle()
            .setFontFamily('Cairo')
            .setFontSize(11)
            .setBold(true)
            .setUnderline(false)
            .setForegroundColor('#000000');

        const redLabels = [
            'رقم الملاحظة',
            'التاريخ',
            'المكان',
            'الملاحظة',
            'الإجراء التصحيحي',
            'مدى الخطورة',
            'تاريخ التنفيذ المقترح',
            'المسئول عن التنفيذ',
            'الحالة'
        ];

        redLabels.forEach(function(lbl) {
            try {
                const matches = bodyTxt.find(lbl);
                if (matches && matches.length) {
                    matches.forEach(function(m) {
                        m.getTextStyle()
                            .setFontFamily('Cairo')
                            .setFontSize(11)
                            .setBold(true)
                            .setUnderline(true)
                            .setForegroundColor('#dc2626');
                    });
                }
            } catch (lblErr) { /* ignore */ }
        });

        const leftBodyBox = itemTemplateSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 10, 52, 340, 340);
        leftBodyBox.getFill().setSolidFill('#f8fafc');
        leftBodyBox.getBorder().setWeight(1.5);
        leftBodyBox.getBorder().getLineFill().setSolidFill('#000000');
        leftBodyBox.setTitle('OBS_IMAGE');
        leftBodyBox.setDescription('OBS_IMAGE');
        const leftTxt = leftBodyBox.getText();
        leftTxt.setText('صورة الملاحظة\n[OBS_IMAGE]');
        leftTxt.getTextStyle().setFontFamily('Cairo').setFontSize(14).setForegroundColor('#94a3b8').setBold(true);

        // ==========================================
        // الشريحة الرابعة (الملخص التنفيذي)
        // ==========================================
        const execSummarySlide = blankLayout ? presentation.appendSlide(blankLayout) : presentation.appendSlide();
        _dob_buildExecutiveSummarySlide_(execSummarySlide, [], '{{DEPARTMENT}}', '{{REPORT_DATE}}');

        // ==========================================
        // الشريحة الخامسة (النهاية)
        // ==========================================
        const endSlide = blankLayout ? presentation.appendSlide(blankLayout) : presentation.appendSlide();
        endSlide.getBackground().setSolidFill('#ffffff');
        
        const endShape = endSlide.insertShape(SlidesApp.ShapeType.ELLIPSE, 130, 120, 460, 140);
        endShape.getFill().setSolidFill('#e2e8f0');
        endShape.getBorder().setTransparent();
        const endText = endShape.getText();
        endText.setText('شكراً لالتزامكم بمعايير السلامة والصحة المهنية\nSafety First');
        endText.getTextStyle().setFontFamily('Cairo').setFontSize(22).setBold(true).setForegroundColor('#000000');

        presentation.saveAndClose();

        const templateId = presentation.getId();
        
        // ضبط المعرف تلقائياً في Script Properties
        setDailyObservationsPptTemplateId(templateId);

        return {
            success: true,
            message: 'تم إنشاء القالب المطابق للتصميم في Google Drive وتطبيقه بنجاح.',
            templateId: templateId,
            presentationUrl: presentation.getUrl()
        };
    } catch (error) {
        Logger.log('Error in createDefaultDailyObservationsPptTemplate: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إنشاء القالب الافتراضي: ' + error.toString() };
    }
}

/**
 * الحصول على Template ID الحالي لتصدير PPT
 * 
 * @returns {Object} Template ID الحالي
 */
function getDailyObservationsPptTemplateId() {
    try {
        const props = PropertiesService.getScriptProperties();
        const templateId = String(props.getProperty('DAILY_OBSERVATIONS_PPT_TEMPLATE_ID') || '').trim();
        
        if (!templateId) {
            return { 
                success: false, 
                message: 'لم يتم ضبط Template ID بعد.',
                templateId: null
            };
        }
        
        // التحقق من صحة Template ID
        try {
            const templateFile = DriveApp.getFileById(templateId);
            return { 
                success: true, 
                templateId: templateId,
                fileName: templateFile.getName(),
                fileUrl: templateFile.getUrl()
            };
        } catch (fileError) {
            return { 
                success: false, 
                message: 'Template ID غير صحيح أو لا يمكن الوصول للملف.',
                templateId: templateId
            };
        }
    } catch (error) {
        Logger.log('Error in getDailyObservationsPptTemplateId: ' + error.toString());
        return { 
            success: false, 
            message: 'حدث خطأ أثناء قراءة Template ID: ' + error.toString(),
            templateId: null
        };
    }
}

/**
 * ============================================
 * تصدير تقرير الملاحظات اليومية إلى PowerPoint (PPTX)
 * ============================================
 *
 * يعتمد على Template في Google Slides يحتوي على 3 شرائح:
 * 1) شريحة الغلاف (ثابتة): تحتوي Placeholders:
 *    - {{DEPARTMENT}}
 *    - {{REPORT_DATE}}
 * 2) شريحة الملاحظة (Template): سيتم تكرارها لكل ملاحظة وتعبئة Placeholders:
 *    - {{OBS_NO}}
 *    - {{ISO_CODE}}
 *    - {{OBS_DATE}}
 *    - {{OBS_LOCATION}}
 *    - {{OBS_TYPE}}
 *    - {{OBS_DETAILS}}
 *    - {{CORRECTIVE_ACTION}}
 *    - {{RISK_LEVEL}}
 *    - {{TARGET_DATE}}
 *    - {{RESPONSIBLE}}
 *    - {{STATUS}}
 *    - (اختياري) {{SHIFT}}, {{OBSERVER}}
 *
 * صورة الملاحظة:
 * - ضع عنصر Shape (مستطيل/نص) في الشريحة الثانية واجعل Title أو Description = OBS_IMAGE
 * - سيتم استبداله بصورة الملاحظة (إذا وُجدت).
 *
 * الإعدادات عبر Script Properties:
 * - DAILY_OBSERVATIONS_PPT_TEMPLATE_ID: (مطلوب) File ID لعرض Google Slides Template
 * - REPORTS_OUTPUT_FOLDER_ID: (اختياري) Folder ID لحفظ الملفات الناتجة
 * 
 * يمكن تمرير templateId في payload كبديل لـ Script Properties
 */
function _dob_formatObsNo_(obs, idx, tz) {
    if (!obs) return String(idx + 1);
    const iso = String(obs.isoCode || obs.code || '').trim();
    if (/^OBS-\d{6}-\d+/i.test(iso) || /^DOB-\d+/i.test(iso)) return iso;
    const rawId = String(obs.id || obs.observationIndex || (idx + 1)).trim();
    if (/^OBS-\d{6}-\d+/i.test(rawId) || /^DOB-\d+/i.test(rawId)) return rawId;
    
    let numStr = rawId.replace(/\D/g, '') || String(idx + 1);
    while (numStr.length < 4) numStr = '0' + numStr;
    
    let dateObj = obs.date ? new Date(obs.date) : new Date();
    if (isNaN(dateObj.getTime())) dateObj = new Date();
    const yyyymm = Utilities.formatDate(dateObj, tz || Session.getScriptTimeZone(), 'yyyyMM');
    return 'OBS-' + yyyymm + '-' + numStr;
}

function exportDailyObservationsPptReport(payload) {
    try {
        payload = payload || {};
        const department = String(payload.department || payload.departmentName || '').trim();
        const reportDate = payload.reportDate ? new Date(payload.reportDate) : new Date();
        const observations = Array.isArray(payload.observations) ? payload.observations : [];

        if (!department) {
            return { success: false, message: 'يرجى تحديد الإدارة قبل التصدير.' };
        }
        if (observations.length === 0) {
            return { success: false, message: 'لا توجد ملاحظات لتصديرها لهذه الإدارة.' };
        }

        // الحصول على Template ID من payload أولاً، ثم من Script Properties
        const props = PropertiesService.getScriptProperties();
        let templateId = String(payload.templateId || payload.templateID || '').trim();
        if (!templateId) {
            templateId = String(props.getProperty('DAILY_OBSERVATIONS_PPT_TEMPLATE_ID') || '').trim();
        }

        let templateFile = null;
        let isValidSlidesTemplate = false;

        if (templateId) {
            try {
                templateFile = DriveApp.getFileById(templateId);
                if (templateFile && templateFile.getMimeType() === 'application/vnd.google-apps.presentation') {
                    isValidSlidesTemplate = true;
                }
            } catch (checkErr) {
                Logger.log('Template file check error: ' + checkErr);
            }
        }

        // إذا كان القالب غير موجود أو ليس ملف Google Slides أصلي (مثلاً ملف .pptx مفرود)، قم بتوليد قالب افتراضي أصلي
        if (!isValidSlidesTemplate) {
            Logger.log('DAILY_OBSERVATIONS_PPT_TEMPLATE_ID is missing or not a Google Slides presentation. Creating default template...');
            var autoCreateRes = createDefaultDailyObservationsPptTemplate();
            if (autoCreateRes && autoCreateRes.success && autoCreateRes.templateId) {
                templateId = autoCreateRes.templateId;
                templateFile = DriveApp.getFileById(templateId);
            } else {
                return {
                    success: false,
                    message: 'لم يتم ضبط Template ID وفشل التوليد التلقائي: ' + ((autoCreateRes && autoCreateRes.message) || '')
                };
            }
        }

        const outputFolderId = String(props.getProperty('REPORTS_OUTPUT_FOLDER_ID') || '').trim();
        var outputFolder = null;
        if (outputFolderId) {
            try { outputFolder = DriveApp.getFolderById(outputFolderId); } catch(folderErr) {
                Logger.log('PPT Export: REPORTS_OUTPUT_FOLDER_ID invalid, using root: ' + folderErr);
            }
        }

        const tz = Session.getScriptTimeZone();
        const dateLabel = Utilities.formatDate(reportDate, tz, 'yyyy-MM-dd');
        const safeDept = department.replace(/[\\\/:*?"<>|]/g, '-');
        const baseName = 'Daily_Observations_' + safeDept + '_' + dateLabel;

        // نسخ الـ Template مع حماية ضد أخطاء التحويل
        var copiedFile = null;
        try {
            copiedFile = outputFolder
                ? templateFile.makeCopy(baseName + '_TEMPLATE_COPY', outputFolder)
                : templateFile.makeCopy(baseName + '_TEMPLATE_COPY');
        } catch (copyErr) {
            Logger.log('PPT Export: makeCopy failed (' + copyErr + '). Forcing fresh native template...');
            try { props.deleteProperty('DAILY_OBSERVATIONS_PPT_TEMPLATE_ID'); } catch(dp){}
            var retryCreate = createDefaultDailyObservationsPptTemplate();
            if (!retryCreate || !retryCreate.success || !retryCreate.templateId) {
                return { success: false, message: 'Failed to create fresh PPT template after copy error: ' + copyErr };
            }
            templateId = retryCreate.templateId;
            templateFile = DriveApp.getFileById(templateId);
            copiedFile = outputFolder
                ? templateFile.makeCopy(baseName + '_TEMPLATE_COPY', outputFolder)
                : templateFile.makeCopy(baseName + '_TEMPLATE_COPY');
        }

        const presId = copiedFile.getId();
        const presentation = SlidesApp.openById(presId);

        const slides = presentation.getSlides();
        if (!slides || slides.length < 3) {
            return { success: false, message: 'Template غير صالح: يجب أن يحتوي على 3 شرائح على الأقل.' };
        }

        const coverSlide = slides[0];
        let overviewSlide = null;
        let itemTemplateSlide = null;
        let execSummarySlide = null;

        if (slides.length >= 5) {
            overviewSlide = slides[1];
            itemTemplateSlide = slides[2];
            execSummarySlide = slides[3];
        } else if (slides.length >= 3) {
            overviewSlide = slides[1];
            itemTemplateSlide = slides[2];
            execSummarySlide = presentation.appendSlide();
        } else {
            overviewSlide = presentation.appendSlide();
            itemTemplateSlide = slides[1] || presentation.appendSlide();
            execSummarySlide = presentation.appendSlide();
        }

        let logoUrl = String(payload.logoUrl || payload.logo || '').trim();
        if (!logoUrl) {
            try {
                if (typeof getCompanySettings === 'function') {
                    const cSettings = getCompanySettings();
                    if (cSettings && cSettings.logo) logoUrl = cSettings.logo;
                }
            } catch(csErr) {}
        }

        const language = String(payload.language || 'ar').toLowerCase();
        const isEnglish = (language === 'en');
        Logger.log('PPT Export: language=' + language + ', isEnglish=' + isEnglish);
        const deptLabel = isEnglish ? _dob_translateToEnglish_(department) : department;

        // 1) تعبئة الغلاف
        _dob_buildCoverSlide_(coverSlide, deptLabel, dateLabel, logoUrl, isEnglish);
        _dob_replaceAllTextSafe_(presentation, coverSlide, {
            '{{DEPARTMENT}}': deptLabel || '',
            '{{REPORT_DATE}}': dateLabel || ''
        }, isEnglish);
        // زرع الشعار في placeholder إن وُجد
        if (logoUrl) {
            try {
                var logoBlob = _dob_getImageBlobFromUrl_(logoUrl);
                if (logoBlob) _dob_replaceImagePlaceholder_(coverSlide, logoBlob, 'COVER_LOGO');
            } catch(logoErr) { Logger.log('Cover logo insert error: ' + logoErr); }
        }

        // 2) تحديث شريحة النظرة العامة (الداشبورد 1)
        if (overviewSlide) {
            _dob_buildOverviewSlide_(overviewSlide, observations, deptLabel, dateLabel);
        }

        // 3) تجهيز شرائح الملاحظات عبر تكرار نموذج الشريحة الأصلي لكل ملاحظة مستقلة
        var imageBlobCache = {};
        observations.forEach(function (obs, idx) {
            const slide = itemTemplateSlide.duplicate();
            // الرقم التسلسلي: isoCode من النظام أولاً، ثم id، ثم observationIndex من الفرونت، ثم idx+1
            const obsNo = _dob_formatObsNo_(obs, idx, tz);
            Logger.log('PPT obs[' + idx + '] obsNo=' + obsNo + ' isoCode=' + (obs.isoCode||'') + ' id=' + (obs.id||''));
            const obsDate = _dob_formatDateTimeSafe_(obs.date, tz);
            const targetDate = _dob_formatDateSafe_(obs.expectedCompletionDate, tz);

            // *** جلب الصورة وزرعها أولاً قبل replaceAllTextSafe ***
            // (replaceAllTextSafe يمر على كل الـ shapes وقد يمسح نص [OBS_IMAGE])
            var primaryImageUrl = obs.imageUrl || obs.image || obs.photo || obs.fileUrl || obs.picture || '';
            if (!primaryImageUrl && Array.isArray(obs.images) && obs.images.length > 0) {
                primaryImageUrl = obs.images[0];
            }
            if (!primaryImageUrl && Array.isArray(obs.photos) && obs.photos.length > 0) {
                primaryImageUrl = obs.photos[0];
            }
            if (!primaryImageUrl && Array.isArray(obs.attachments) && obs.attachments.length > 0) {
                var a = obs.attachments[0];
                primaryImageUrl = (a && typeof a === 'object') ? (a.directLink || a.shareableLink || a.url || (a.cloudLink && a.cloudLink.url) || a.data || '') : String(a || '');
            }

            Logger.log('PPT obs ' + obsNo + ' imageUrl: ' + (primaryImageUrl ? primaryImageUrl.substring(0, 80) : 'NONE'));

            var blob = null;
            if (primaryImageUrl) {
                try {
                    blob = imageBlobCache[primaryImageUrl];
                    if (!blob) {
                        blob = _dob_getImageBlobFromUrl_(primaryImageUrl);
                        if (blob) imageBlobCache[primaryImageUrl] = blob;
                    }
                } catch (imgErr) {
                    Logger.log('PPT Export: failed to fetch image for obs ' + obsNo + ': ' + imgErr);
                }
            }
            // زرع الصورة (أو تفريغ النص) قبل أي استبدال نصي
            _dob_replaceImagePlaceholder_(slide, blob, 'OBS_IMAGE');

            var details = isEnglish ? _dob_translateToEnglish_(obs.details) : String(obs.details || '');
            var correctiveAction = isEnglish ? _dob_translateToEnglish_(obs.correctiveAction) : String(obs.correctiveAction || '');
            var riskLevel = isEnglish ? _dob_translateToEnglish_(obs.riskLevel) : String(obs.riskLevel || '');
            var responsible = isEnglish ? _dob_translateToEnglish_(obs.responsibleDepartment) : String(obs.responsibleDepartment || '');
            var status = isEnglish ? _dob_translateToEnglish_(obs.status) : String(obs.status || '');
            var shift = isEnglish ? _dob_translateToEnglish_(obs.shift) : String(obs.shift || '');
            var obsType = isEnglish ? _dob_translateToEnglish_(obs.observationType) : String(obs.observationType || '');
            var siteName = isEnglish ? _dob_translateToEnglish_(obs.siteName) : String(obs.siteName || '');
            var locationName = isEnglish ? _dob_translateToEnglish_(obs.locationName) : String(obs.locationName || '');
            var location = _dob_joinLocation_(siteName, locationName);

            _dob_replaceAllTextSafe_(presentation, slide, {
                '{{OBS_NO}}': obsNo,
                '{{ISO_CODE}}': String(obs.isoCode || ''),
                '{{OBS_DATE}}': obsDate,
                '{{OBS_LOCATION}}': location,
                '{{OBS_TYPE}}': obsType,
                '{{OBS_DETAILS}}': details,
                '{{CORRECTIVE_ACTION}}': correctiveAction,
                '{{RISK_LEVEL}}': riskLevel,
                '{{TARGET_DATE}}': targetDate,
                '{{RESPONSIBLE}}': responsible,
                '{{STATUS}}': status,
                '{{SHIFT}}': shift,
                '{{OBSERVER}}': String(obs.observerName || '')
            }, isEnglish);
        });


        // 4) حذف نموذج الشريحة الأصلي غير المعبأ
        try {
            itemTemplateSlide.remove();
        } catch (rmErr) {
            Logger.log('PPT Export: failed to remove itemTemplateSlide: ' + rmErr);
        }

        // 5) تحديث شريحة الملخص التنفيذي (الداشبورد 2) ونقلها قبل الشريحة الأخيرة
        if (execSummarySlide) {
            _dob_buildExecutiveSummarySlide_(execSummarySlide, observations, department, dateLabel);
            try {
                execSummarySlide.move(presentation.getSlides().length - 1);
            } catch(mErr) { /* ignore */ }
        }

        presentation.saveAndClose();

        // تفعيل المشاركة لملف التقرير المولد
        try {
            copiedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (shareErr) {
            Logger.log('PPT setSharing error: ' + shareErr);
        }

        const directPresViewUrl = 'https://docs.google.com/presentation/d/' + presId + '/edit';
        const directPresDownloadUrl = 'https://docs.google.com/presentation/d/' + presId + '/export/pptx';

        return {
            success: true,
            fileId: presId,
            fileName: baseName + '.pptx',
            viewUrl: directPresViewUrl,
            downloadUrl: directPresDownloadUrl
        };
    } catch (error) {
        Logger.log('Error in exportDailyObservationsPptReport: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إنشاء تقرير PPT: ' + error.toString() };
    }
}

var _dob_translationCache_ = {};

function _dob_translateToEnglishFast_(text) {
    if (!text || typeof text !== 'string') return '';
    text = text.trim();
    if (!text) return '';
    if (_dob_translationCache_[text]) return _dob_translationCache_[text];

    if (!/[\u0600-\u06FF]/.test(text)) {
        _dob_translationCache_[text] = text;
        return text;
    }

    const dictionary = {
        'مفتوح': 'Open',
        'مغلق': 'Closed',
        'قيد التنفيذ': 'In Progress',
        'جاري': 'In Progress',
        'تحت المراجعة': 'Under Review',
        'منخفض': 'Low',
        'متوسط': 'Medium',
        'عالي': 'High',
        'حرج': 'Critical',
        'الأولى': '1st Shift',
        'الثانية': '2nd Shift',
        'الثالثة': '3rd Shift',
        'الاولى': '1st Shift',
        'إدارة الخدمات': 'Services Dept.',
        'إدارة المخازن': 'Warehouse Dept.',
        'إدارة الصيانة': 'Maintenance Dept.',
        'إدارة الإنتاج': 'Production Dept.',
        'إدارة السلامة والصحة المهنية': 'HSE Dept.',
        'إدارة الجودة': 'Quality Dept.',
        'رقم الملاحظة': 'Observation No.',
        'التاريخ': 'Date',
        'المكان': 'Location',
        'الملاحظة': 'Observation Details',
        'الإجراء التصحيحي': 'Corrective Action',
        'مدى الخطورة': 'Risk Level',
        'تاريخ التنفيذ المقترح': 'Target Date',
        'المسئول عن التنفيذ': 'Responsible Dept.',
        'الحالة': 'Status',
        'وصف الملاحظة': 'Observation Description',
        'الصورة التوضيحية': 'Photo / Evidence'
    };

    if (dictionary[text]) {
        _dob_translationCache_[text] = dictionary[text];
        return dictionary[text];
    }

    _dob_translationCache_[text] = text;
    return text;
}

function _dob_translateToEnglish_(text) {
    return _dob_translateToEnglishFast_(text);
}

function _dob_replaceAllTextSafe_(presentation, slide, replacements, isEnglish) {
    if (!replacements) return;
    const rlm = isEnglish ? '' : '\u200F'; // Unicode Right-to-Left Mark لفرض الاتجاه العربي يميناً
    Object.keys(replacements).forEach(function (key) {
        let rawVal = replacements[key] === null || replacements[key] === undefined ? '' : String(replacements[key]).trim();
        const value = rawVal ? (isEnglish ? rawVal : (rlm + rawVal + rlm)) : '';
        try {
            if (slide && typeof slide.replaceAllText === 'function') {
                slide.replaceAllText(key, value);
            } else if (presentation && typeof presentation.replaceAllText === 'function') {
                presentation.replaceAllText(key, value);
            }
        } catch (e) {
            // تجاهل - قد تكون الشريحة لا تحتوي على النص
        }
    });

    if (slide && typeof slide.getShapes === 'function') {
        try {
            var shapes = slide.getShapes();
            var redLabels = isEnglish ? [
                'Observation No.', 'Date', 'Location', 'Observation Details',
                'Corrective Action', 'Risk Level', 'Target Date',
                'Responsible Dept.', 'Status'
            ] : [
                'رقم الملاحظة', 'التاريخ', 'المكان', 'الملاحظة',
                'الإجراء التصحيحي', 'مدى الخطورة', 'تاريخ التنفيذ المقترح',
                'المسئول عن التنفيذ', 'الحالة'
            ];

            for (var i = 0; i < shapes.length; i++) {
                var sh = shapes[i];
                if (!sh || !sh.getText) continue;
                var txt = sh.getText();
                var str = txt.asString();
                if (!str) continue;

                if (isEnglish) {
                    var labelMap = {
                        'رقم الملاحظة': 'Observation No.',
                        'التاريخ': 'Date',
                        'المكان': 'Location',
                        'الملاحظة': 'Observation Details',
                        'الإجراء التصحيحي': 'Corrective Action',
                        'مدى الخطورة': 'Risk Level',
                        'تاريخ التنفيذ المقترح': 'Target Date',
                        'المسئول عن التنفيذ': 'Responsible Dept.',
                        'الحالة': 'Status',
                        'وصف الملاحظة': 'Observation Description',
                        'الصورة التوضيحية': 'Photo / Evidence'
                    };
                    Object.keys(labelMap).forEach(function(arK) {
                        if (str.indexOf(arK) !== -1) {
                            try {
                                if (slide && typeof slide.replaceAllText === 'function') {
                                    slide.replaceAllText(arK, labelMap[arK]);
                                }
                            } catch(e) {}
                        }
                    });
                    txt = sh.getText();
                    str = txt.asString();
                }

                var isObsBox = redLabels.some(function(lbl) { return str.indexOf(lbl) !== -1; });
                if (isObsBox) {
                    try {
                        var align = isEnglish ? SlidesApp.ParagraphAlignment.LEFT : SlidesApp.ParagraphAlignment.RIGHT;
                        txt.getParagraphStyle().setParagraphAlignment(align);
                        var paras = txt.getParagraphs();
                        for (var p = 0; p < paras.length; p++) {
                            paras[p].getRange().getParagraphStyle().setParagraphAlignment(align);
                        }
                    } catch (_aErr) {}

                    redLabels.forEach(function(lbl) {
                        if (!isEnglish) {
                            try {
                                var curTxt = txt.asString();
                                // Regex: match lines where value comes BEFORE label (inverted order)
                                // e.g. "القيمة : العنوان" → should be "العنوان : القيمة"
                                var escapedLbl = lbl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                                var revRegex = new RegExp('([^\n:]+?)\\s*:\\s*(' + escapedLbl + ')\\s*$', 'gm');
                                var testStr = curTxt;
                                if (revRegex.test(testStr)) {
                                    revRegex.lastIndex = 0; // reset after test
                                    var fixedTxt = curTxt.replace(revRegex, rlm + '$2 : ' + rlm + '$1');
                                    txt.setText(fixedTxt);
                                }
                            } catch(_revErr) { Logger.log('Regex fix error for "' + lbl + '": ' + _revErr); }
                        }

                        try {
                            const matches = txt.find(lbl);
                            if (matches && matches.length) {
                                matches.forEach(function(m) {
                                    m.getTextStyle()
                                        .setFontFamily(isEnglish ? 'Arial' : 'Cairo')
                                        .setBold(true)
                                        .setUnderline(true)
                                        .setForegroundColor('#dc2626');
                                });
                            }
                        } catch (_lErr) {}
                    });
                }
            }

            // ✅ Pass إضافي: ضبط اتجاه النص لكل الـ shapes التي تحتوي نصاً عربياً
            // (يشمل خانة التفاصيل والإجراء التصحيحي وأي نص حر)
            if (!isEnglish) {
                for (var si = 0; si < shapes.length; si++) {
                    try {
                        var sTxt = shapes[si].getText();
                        var sStr = sTxt.asString().trim();
                        if (!sStr) continue;
                        // إذا يحتوي حروفاً عربية → فرض RTL
                        if (/[\u0600-\u06FF]/.test(sStr)) {
                            sTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT);
                            var sParas = sTxt.getParagraphs();
                            for (var sp = 0; sp < sParas.length; sp++) {
                                try {
                                    sParas[sp].getRange().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.RIGHT);
                                } catch(_pa) {}
                            }
                        }
                    } catch(_siErr) {}
                }
            }
        } catch (_shErr) {
            Logger.log('Post-replacement styling error: ' + _shErr);
        }
    }
}

function _dob_formatDateTimeSafe_(value, tz) {
    try {
        if (!value) return '';
        const d = value instanceof Date ? value : new Date(value);
        if (isNaN(d.getTime())) return '';
        return Utilities.formatDate(d, tz || Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
    } catch (e) {
        return '';
    }
}

function _dob_formatDateSafe_(value, tz) {
    try {
        if (!value) return '';
        const d = value instanceof Date ? value : new Date(value);
        if (isNaN(d.getTime())) return '';
        return Utilities.formatDate(d, tz || Session.getScriptTimeZone(), 'yyyy-MM-dd');
    } catch (e) {
        return '';
    }
}

function _dob_joinLocation_(siteName, locationName) {
    const s = String(siteName || '').trim();
    const l = String(locationName || '').trim();
    if (s && l) return s + ' - ' + l;
    return s || l || '';
}

function _dob_extractDriveFileId_(url) {
    if (!url) return '';
    const s = String(url).trim();
    const match1 = s.match(/\/file\/d\/([a-zA-Z0-9_-]{20,})/);
    if (match1 && match1[1]) return match1[1];
    const match2 = s.match(/[?&]id=([a-zA-Z0-9_-]{20,})/);
    if (match2 && match2[1]) return match2[1];
    const match3 = s.match(/\/d\/([a-zA-Z0-9_-]{20,})/);
    if (match3 && match3[1]) return match3[1];
    if (/^[a-zA-Z0-9_-]{20,80}$/.test(s)) return s;
    return '';
}

function _dob_getImageBlobFromUrl_(url) {
    if (!url || typeof url !== 'string') return null;
    url = url.trim();
    if (!url) return null;

    // 1) Base64 Data URL (فك تشفير سريع)
    if (url.startsWith('data:image/')) {
        try {
            const parts = url.split(',');
            const mimeMatch = parts[0].match(/:(.*?);/);
            const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
            const bytes = Utilities.base64Decode(parts[1]);
            return Utilities.newBlob(bytes, mime, 'obs_image');
        } catch(b64Err) {
            Logger.log('Base64 image decode error: ' + b64Err);
        }
    }

    // 2) Google Drive File ID (جلب مباشر عبر DriveApp مع fallback OAuth)
    const fileId = _dob_extractDriveFileId_(url);
    if (fileId) {
        // محاولة 1: DriveApp مباشر
        try {
            var file = DriveApp.getFileById(fileId);
            if (file) return file.getBlob();
        } catch(driveErr) {
            Logger.log('DriveApp fetch error for fileId ' + fileId + ': ' + driveErr);
        }
        // محاولة 2: تنزيل مباشر عبر OAuth token (يحل مشكلة الصلاحيات)
        try {
            var directUrl = 'https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media';
            var resp = UrlFetchApp.fetch(directUrl, {
                headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
                muteHttpExceptions: true,
                timeoutWithNoResponse: 3000
            });
            if (resp.getResponseCode() === 200) {
                Logger.log('Drive image fetched via OAuth for fileId: ' + fileId);
                return resp.getBlob();
            } else {
                Logger.log('Drive OAuth fetch status ' + resp.getResponseCode() + ' for fileId: ' + fileId);
            }
        } catch(oauthErr) {
            Logger.log('Drive OAuth fetch error for fileId ' + fileId + ': ' + oauthErr);
        }
        // محاولة 3: رابط التنزيل المباشر العام
        try {
            var publicUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;
            var resp2 = UrlFetchApp.fetch(publicUrl, { muteHttpExceptions: true, followRedirects: true, timeoutWithNoResponse: 3000 });
            if (resp2.getResponseCode() === 200) {
                var ct = resp2.getHeaders()['Content-Type'] || '';
                if (ct.indexOf('image') !== -1) return resp2.getBlob();
            }
        } catch(pubErr) {
            Logger.log('Drive public download error for fileId ' + fileId + ': ' + pubErr);
        }
        return null;
    }

    // 3) المسارات النسبية للصور (المرفوعة بالنظام)
    if (url.startsWith('/') || url.startsWith('uploads/')) {
        var domain = 'https://clinic-repo.vercel.app';
        try {
            var fullUrl = domain + (url.startsWith('/') ? url : '/' + url);
            var resp = UrlFetchApp.fetch(fullUrl, { muteHttpExceptions: true, timeoutWithNoResponse: 3000 });
            if (resp.getResponseCode() === 200) return resp.getBlob();
        } catch(relErr) {
            Logger.log('Relative image fetch error: ' + relErr);
        }
    }

    // 4) HTTP / HTTPS direct URL fallback
    if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
            const resp = UrlFetchApp.fetch(url, {
                muteHttpExceptions: true,
                followRedirects: true,
                validateHttpsCertificates: false,
                timeoutWithNoResponse: 3000
            });
            if (resp.getResponseCode() === 200) {
                return resp.getBlob();
            }
        } catch(fetchErr) {
            Logger.log('UrlFetchApp fetch error for ' + url + ': ' + fetchErr);
        }
    }

    return null;
}

function _dob_replaceImagePlaceholder_(slide, imageBlob, placeholderKey) {
    if (!slide) return;
    const targetKey = placeholderKey || 'OBS_IMAGE';

    const elements = slide.getPageElements();
    let placeholder = null;
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        try {
            const title = String(el.getTitle && el.getTitle() ? el.getTitle() : '').trim();
            const desc = String(el.getDescription && el.getDescription() ? el.getDescription() : '').trim();
            if (title === targetKey || desc === targetKey || title.indexOf(targetKey) !== -1 || desc.indexOf(targetKey) !== -1) {
                placeholder = el;
                break;
            }
            // دعم placeholder كنص داخل shape (مثل [OBS_IMAGE] أو صورة الملاحظة)
            if (el.getPageElementType && el.getPageElementType() === SlidesApp.PageElementType.SHAPE) {
                const txt = el.asShape().getText().asString();
                if (txt && (txt.indexOf(targetKey) !== -1 || txt.indexOf('OBS_IMAGE') !== -1 || txt.indexOf('صورة الملاحظة') !== -1)) {
                    placeholder = el;
                    break;
                }
            }
        } catch (e) {
            // ignore
        }
    }

    if (!placeholder) return;

    if (!imageBlob) {
        // إذا لم تتوفر صورة أو فشل الجلب، نقوم بتفريغ نص [OBS_IMAGE] حتى لا تظهر كلمة الرمز بالتقرير
        try {
            if (placeholder.getPageElementType && placeholder.getPageElementType() === SlidesApp.PageElementType.SHAPE) {
                placeholder.asShape().getText().setText('لا توجد صورة مرفقة للملاحظة');
                try {
                    placeholder.asShape().getText().getTextStyle().setFontFamily('Cairo').setFontSize(13).setForegroundColor('#94a3b8').setBold(false);
                    placeholder.asShape().getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
                } catch(_stErr) {}
            }
        } catch(e) {}
        return;
    }

    const left = placeholder.getLeft();
    const top = placeholder.getTop();
    const width = placeholder.getWidth();
    const height = placeholder.getHeight();

    try {
        placeholder.remove();
    } catch (e) {
        // ignore
    }

    try {
        const img = slide.insertImage(imageBlob);
        const origW = img.getWidth();
        const origH = img.getHeight();
        if (origW > 0 && origH > 0 && width > 0 && height > 0) {
            const ratio = Math.min(width / origW, height / origH);
            const newW = origW * ratio;
            const newH = origH * ratio;
            img.setWidth(newW);
            img.setHeight(newH);
            img.setLeft(left + (width - newW) / 2);
            img.setTop(top + (height - newH) / 2);
        } else {
            img.setLeft(left);
            img.setTop(top);
            img.setWidth(width);
            img.setHeight(height);
        }
    } catch(insertErr) {
        Logger.log('Error inserting image into slide: ' + insertErr);
    }
}

/**
 * ============================================
 * إضافة تعليق على ملاحظة
 * ============================================
 * 
 * @param {String} observationId - معرف الملاحظة
 * @param {Object} commentData - بيانات التعليق
 * @returns {Object} نتيجة العملية
 */
function addObservationComment(observationId, commentData) {
    try {
        const sheetName = 'DailyObservations';
        const spreadsheetId = getSpreadsheetId();
        
        if (!spreadsheetId) {
            return { success: false, message: 'معرف Google Sheets غير محدد' };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const observationIndex = data.findIndex(o => o.id === observationId);
        
        if (observationIndex === -1) {
            return { success: false, message: 'الملاحظة غير موجودة' };
        }
        
        const observation = data[observationIndex];
        
        // ✅ تحليل التعليقات الحالية
        let comments = [];
        try {
            if (Array.isArray(observation.comments)) {
                comments = observation.comments;
            } else if (typeof observation.comments === 'string' && observation.comments) {
                try {
                    comments = JSON.parse(observation.comments);
                } catch (e) {
                    comments = [];
                }
            }
        } catch (e) {
            comments = [];
        }
        
        // إضافة التعليق الجديد
        comments.push({
            id: 'CMT-' + Date.now().toString(),
            user: commentData.user || 'System',
            comment: commentData.comment || '',
            timestamp: new Date().toISOString()
        });
        
        // ✅ حفظ كـ array (بدون JSON.stringify)
        observation.comments = comments;
        observation.updatedAt = new Date().toISOString();
        
        // ✅ إضافة سجل زمني
        let timeLog = [];
        try {
            if (Array.isArray(observation.timeLog)) {
                timeLog = observation.timeLog;
            } else if (typeof observation.timeLog === 'string' && observation.timeLog) {
                try {
                    timeLog = JSON.parse(observation.timeLog);
                } catch (e) {
                    timeLog = [];
                }
            }
        } catch (e) {
            timeLog = [];
        }
        
        timeLog.push({
            action: 'comment_added',
            user: commentData.user || 'System',
            timestamp: new Date().toISOString(),
            roleLabel: 'تعليق',
            actionDetail: 'تم إضافة تعليق على الملاحظة',
            note: 'تعليق: تم إضافة تعليق على الملاحظة'
        });
        
        // ✅ حفظ كـ array
        observation.timeLog = timeLog;
        
        // ✅ تحديث الصف مباشرة
        return updateSingleRowInSheet(sheetName, observationId, {
            comments: observation.comments,
            timeLog: observation.timeLog,
            updatedAt: observation.updatedAt
        }, spreadsheetId);
    } catch (error) {
        Logger.log('Error in addObservationComment: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة التعليق: ' + error.toString() };
    }
}

/**
 * ============================================
 * إضافة تحديث على ملاحظة
 * ============================================
 * 
 * @param {String} observationId - معرف الملاحظة
 * @param {Object} updateData - بيانات التحديث
 * @returns {Object} نتيجة العملية
 */
function addObservationUpdate(observationId, updateData) {
    try {
        const sheetName = 'DailyObservations';
        const spreadsheetId = getSpreadsheetId();
        
        if (!spreadsheetId) {
            return { success: false, message: 'معرف Google Sheets غير محدد' };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const observationIndex = data.findIndex(o => o.id === observationId);
        
        if (observationIndex === -1) {
            return { success: false, message: 'الملاحظة غير موجودة' };
        }
        
        const observation = data[observationIndex];
        
        // ✅ تحليل التحديثات الحالية
        let updates = [];
        try {
            if (Array.isArray(observation.updates)) {
                updates = observation.updates;
            } else if (typeof observation.updates === 'string' && observation.updates) {
                try {
                    updates = JSON.parse(observation.updates);
                } catch (e) {
                    updates = [];
                }
            }
        } catch (e) {
            updates = [];
        }
        
        // إضافة التحديث الجديد
        updates.push({
            id: 'UPD-' + Date.now().toString(),
            user: updateData.user || 'System',
            update: updateData.update || '',
            progress: updateData.progress || 0,
            timestamp: new Date().toISOString()
        });
        
        // ✅ حفظ كـ array
        observation.updates = updates;
        observation.updatedAt = new Date().toISOString();
        
        // ✅ إضافة سجل زمني
        let timeLog = [];
        try {
            if (Array.isArray(observation.timeLog)) {
                timeLog = observation.timeLog;
            } else if (typeof observation.timeLog === 'string' && observation.timeLog) {
                try {
                    timeLog = JSON.parse(observation.timeLog);
                } catch (e) {
                    timeLog = [];
                }
            }
        } catch (e) {
            timeLog = [];
        }
        
        timeLog.push({
            action: 'update_added',
            user: updateData.user || 'System',
            timestamp: new Date().toISOString(),
            roleLabel: 'تحديث التنفيذ',
            actionDetail: 'تم إضافة تحديث على سير التنفيذ',
            note: 'تحديث التنفيذ: تم إضافة تحديث على سير التنفيذ'
        });
        
        // ✅ حفظ كـ array
        observation.timeLog = timeLog;
        
        // ✅ تحديث الصف مباشرة
        return updateSingleRowInSheet(sheetName, observationId, {
            updates: observation.updates,
            timeLog: observation.timeLog,
            updatedAt: observation.updatedAt
        }, spreadsheetId);
    } catch (error) {
        Logger.log('Error in addObservationUpdate: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة التحديث: ' + error.toString() };
    }
}

/**
 * ============================================
 * تحديث حالة ملاحظة
 * ============================================
 * 
 * @param {String} observationId - معرف الملاحظة
 * @param {Object} statusData - بيانات الحالة (status, updatedBy)
 * @returns {Object} نتيجة العملية
 */
function updateObservationStatus(observationId, statusData) {
    try {
        const sheetName = 'DailyObservations';
        const spreadsheetId = getSpreadsheetId();
        
        if (!spreadsheetId) {
            return { success: false, message: 'معرف Google Sheets غير محدد' };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const observationIndex = data.findIndex(o => o.id === observationId);
        
        if (observationIndex === -1) {
            return { success: false, message: 'الملاحظة غير موجودة' };
        }
        
        const observation = data[observationIndex];
        const oldStatus = observation.status || '';
        const newStatus = statusData.status || oldStatus;
        
        // تحديث الحالة
        observation.status = newStatus;
        observation.updatedAt = new Date().toISOString();
        
        // ✅ إضافة سجل زمني
        let timeLog = [];
        try {
            if (Array.isArray(observation.timeLog)) {
                timeLog = observation.timeLog;
            } else if (typeof observation.timeLog === 'string' && observation.timeLog) {
                try {
                    timeLog = JSON.parse(observation.timeLog);
                } catch (e) {
                    timeLog = [];
                }
            }
        } catch (e) {
            timeLog = [];
        }
        
        // إضافة سجل تغيير الحالة
        if (newStatus !== oldStatus) {
            timeLog.push({
                action: 'status_changed',
                user: statusData.updatedBy || statusData.user || 'System',
                timestamp: new Date().toISOString(),
                roleLabel: 'تغيير الحالة',
                actionDetail: 'من ' + String(oldStatus || '—') + ' إلى ' + String(newStatus || '—'),
                note: 'تغيير الحالة: من ' + String(oldStatus || '—') + ' إلى ' + String(newStatus || '—'),
                oldStatus: oldStatus,
                newStatus: newStatus
            });
        }
        
        // ✅ حفظ كـ array
        observation.timeLog = timeLog;
        
        // ✅ تحديث الصف مباشرة
        return updateSingleRowInSheet(sheetName, observationId, {
            status: observation.status,
            timeLog: observation.timeLog,
            updatedAt: observation.updatedAt
        }, spreadsheetId);
    } catch (error) {
        Logger.log('Error in updateObservationStatus: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الحالة: ' + error.toString() };
    }
}

// ===== سير اعتماد الملاحظات + فلترة حسب المستخدم + بريد =====

/**
 * تطبيع اسم إدارة للمقارنة
 */
function _dobNormalizeDept_(s) {
    return String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * تحليل حقل permissions للمستخدم (JSON)
 */
function _dobParseUserPermissions_(raw) {
    if (!raw) return {};
    if (typeof raw === 'object') return raw;
    try {
        return JSON.parse(String(raw));
    } catch (e) {
        return {};
    }
}

/**
 * هل يملك المستخدم صلاحية تفصيلية في مديول الملاحظات؟
 */
function _dobUserHasDailyObsDetail_(perms, key) {
    const p = perms || {};
    const nested = p['daily-observationsPermissions'] || p['dailyObservationsPermissions'] || {};
    return nested[key] === true;
}

/**
 * جمع بريد المستخدمين النشطين الذين لديهم مفتاح صلاحية تفصيلي
 */
function getActiveUserEmailsWithDailyObsPermission(permissionKey) {
    try {
        const key = String(permissionKey || '').trim();
        if (!key) return [];
        const users = readFromSheet('Users', getSpreadsheetId()) || [];
        const emails = [];
        const seen = {};
        users.forEach(function (u) {
            if (!u || u.active === false || u.active === 'false') return;
            const email = String(u.email || '').trim();
            if (!email || seen[email]) return;
            const perms = _dobParseUserPermissions_(u.permissions);
            if (_dobUserHasDailyObsDetail_(perms, key)) {
                seen[email] = true;
                emails.push(email);
            }
        });
        return emails;
    } catch (e) {
        Logger.log('getActiveUserEmailsWithDailyObsPermission: ' + e.toString());
        return [];
    }
}

/**
 * بريد مستخدمي إدارة معيّنة (حقل department في Users)
 */
function getActiveUserEmailsByDepartment(departmentName) {
    const target = _dobNormalizeDept_(departmentName);
    if (!target) return [];
    try {
        const users = readFromSheet('Users', getSpreadsheetId()) || [];
        const emails = [];
        const seen = {};
        users.forEach(function (u) {
            if (!u || u.active === false || u.active === 'false') return;
            const email = String(u.email || '').trim();
            if (!email || seen[email]) return;
            if (_dobNormalizeDept_(u.department) === target) {
                seen[email] = true;
                emails.push(email);
            }
        });
        return emails;
    } catch (e) {
        Logger.log('getActiveUserEmailsByDepartment: ' + e.toString());
        return [];
    }
}

/**
 * بريد المستخدمين النشطين حسب role (مثل safety_officer)
 */
function getActiveUserEmailsByRole(roleName) {
    const target = String(roleName || '').toLowerCase().trim();
    if (!target) return [];
    try {
        const users = readFromSheet('Users', getSpreadsheetId()) || [];
        const emails = [];
        const seen = {};
        users.forEach(function (u) {
            if (!u || u.active === false || u.active === 'false') return;
            const email = String(u.email || '').trim();
            if (!email || seen[email]) return;
            if (String(u.role || '').toLowerCase() === target) {
                seen[email] = true;
                emails.push(email);
            }
        });
        return emails;
    } catch (e) {
        Logger.log('getActiveUserEmailsByRole: ' + e.toString());
        return [];
    }
}

/**
 * إشعارات داخل التطبيق (ورقة Notifications) لنفس مستلمي البريد عندما يكون userId = البريد
 */
function _dobPushInAppForEmails_(emails, title, message, relatedObservationId) {
    if (!emails || !emails.length) return;
    var rid = String(relatedObservationId || '').trim();
    var msg = String(message || '').slice(0, 2000);
    var ttl = String(title || '').slice(0, 200);
    emails.forEach(function (e) {
        var uid = String(e || '').trim();
        if (!uid || uid.indexOf('@') === -1) return;
        try {
            addNotification({
                userId: uid,
                type: 'daily_observation',
                priority: 'medium',
                title: ttl,
                message: msg,
                relatedId: rid,
                relatedType: 'DailyObservation',
                read: false
            });
        } catch (err) {
            Logger.log('_dobPushInAppForEmails_: ' + err.toString());
        }
    });
}

/**
 * رسالة بريد لحدث سير العمل (لا يوقف العملية عند الفشل)
 */
function _dobSendWorkflowEmail_(toList, subject, body) {
    // احترام إعدادات المدير: إن وُجدت خدمة البريد وتوقف auto للملاحظات — لا ترسل
    try {
        if (typeof isEmailModuleAllowed_ === 'function') {
            const gate = isEmailModuleAllowed_('daily-observations', 'auto');
            if (!gate.allowed) {
                Logger.log('_dobSendWorkflowEmail_ skipped: ' + (gate.reason || 'disabled'));
                return;
            }
        }
    } catch (gateErr) {
        Logger.log('_dobSendWorkflowEmail_ gate: ' + gateErr.toString());
    }
    const recipients = (toList || []).filter(function (e) {
        return e && String(e).indexOf('@') !== -1;
    });
    if (recipients.length === 0) return;
    const subj = '[HSE — ملاحظات] ' + String(subject || '').slice(0, 200);
    const text = String(body || '');
    recipients.forEach(function (email) {
        try {
            MailApp.sendEmail({
                to: email,
                subject: subj,
                body: text
            });
        } catch (mailErr) {
            Logger.log('MailApp.sendEmail failed for ' + email + ': ' + mailErr.toString());
        }
    });
}

/**
 * إشعار بريد حسب مرحلة / حدث
 */
function notifyObservationWorkflowEmails(eventKey, observation, extraEmails) {
    const obs = observation || {};
    const id = String(obs.isoCode || obs.id || '');
    const dept = String(obs.responsibleDepartment || '');
    const detailsShort = String(obs.details || '').slice(0, 280);
    const base = 'رقم الملاحظة: ' + id + '\nالإدارة المسؤولة: ' + dept + '\nالمرحلة: ' + String(obs.workflowStage || '') + '\n\n' + detailsShort;

    const merge = function (a, b) {
        const m = {};
        (a || []).concat(b || []).forEach(function (e) {
            const x = String(e || '').trim();
            if (x) m[x] = true;
        });
        return Object.keys(m);
    };

    if (eventKey === 'new_pending_specialist') {
        const to = merge(
            merge(
                getActiveUserEmailsWithDailyObsPermission('observations-specialist-review'),
                getActiveUserEmailsByRole('safety_officer')
            ),
            extraEmails
        );
        _dobSendWorkflowEmail_(to, 'ملاحظة جديدة بانتظار مراجعة مسؤول السلامة (أخصائي)', base);
        _dobPushInAppForEmails_(to, 'ملاحظة جديدة — بانتظار السلامة', base, obs.id);
    } else if (eventKey === 'pending_manager') {
        const to = merge(getActiveUserEmailsWithDailyObsPermission('observations-manager-approve'), extraEmails);
        _dobSendWorkflowEmail_(to, 'ملاحظة بانتظار اعتماد مدير السلامة', base);
        _dobPushInAppForEmails_(to, 'ملاحظة بانتظار اعتماد مدير السلامة', base, obs.id);
    } else if (eventKey === 'pending_department') {
        const to = merge(getActiveUserEmailsByDepartment(dept), extraEmails);
        _dobSendWorkflowEmail_(to, 'تسجيل ملاحظة تتطلب إجراءً من إدارتكم', base);
        _dobPushInAppForEmails_(to, 'ملاحظة تتطلب إجراءً من إدارتكم', base, obs.id);
    } else if (eventKey === 'department_update_from_safety') {
        const to = merge(getActiveUserEmailsByDepartment(dept), [obs.assignedToEmail], extraEmails);
        var bodyExtra = base + '\n\nتم تسجيل إجراء من إدارة السلامة.\nالإجراء التصحيحي: ' + String(obs.correctiveAction || '').slice(0, 280);
        _dobSendWorkflowEmail_(to, 'تحديث ملاحظة من إدارة السلامة', bodyExtra);
        _dobPushInAppForEmails_(to, 'تحديث ملاحظة من السلامة', bodyExtra, obs.id);
    } else if (eventKey === 'rejected_or_return') {
        const to = merge([], [obs.submittedByEmail], extraEmails);
        const spec = getActiveUserEmailsWithDailyObsPermission('observations-specialist-review');
        var finalTo = merge(to, spec);
        var subj = 'تحديث على ملاحظة (رفض أو إرجاع)';
        var bodyFull = base + '\n\nالسبب: ' + String(obs.rejectionReason || '');
        _dobSendWorkflowEmail_(finalTo, subj, bodyFull);
        _dobPushInAppForEmails_(finalTo, subj, bodyFull, obs.id);
    } else if (eventKey === 'closed') {
        const to = merge([obs.submittedByEmail], getActiveUserEmailsByDepartment(dept), extraEmails);
        _dobSendWorkflowEmail_(to, 'تم إغلاق ملاحظة', base);
        _dobPushInAppForEmails_(to, 'تم إغلاق ملاحظة', base, obs.id);
    }
}

/**
 * هل السياق يسمح برؤية جميع الملاحظات؟
 */
function _dobContextCanViewAll_(ctx) {
    if (!ctx) return true;
    const role = String(ctx.role || '').toLowerCase();
    if (role === 'admin') return true;
    if (role === 'safety_officer') return true;
    const perms = ctx.dailyObservationsPermissions || ctx['daily-observationsPermissions'] || {};
    if (perms['observations-specialist-review'] === true) return true;
    if (perms['observations-manager-approve'] === true) return true;
    if (perms['observations-view-all'] === true) return true;
    return false;
}

/**
 * فلترة صفوف DailyObservations حسب مستخدم الطلب (يُستدعى من readFromSheet)
 */
function filterDailyObservationsForRequestContext(rows, ctx) {
    if (!Array.isArray(rows)) return [];
    if (!ctx || _dobContextCanViewAll_(ctx)) {
        return rows;
    }

    const perms = ctx.dailyObservationsPermissions || ctx['daily-observationsPermissions'] || {};
    var deptScope = perms['observations-view-department'] !== false;

    const userDept = _dobNormalizeDept_(ctx.department);
    const userEmail = String((ctx.email || ctx.userEmail || '')).trim().toLowerCase();
    const userName = String((ctx.name || ctx.userName || '')).trim().toLowerCase();

    return rows.filter(function (obs) {
        if (!obs) return false;
        const stage = String(obs.workflowStage || '').trim();
        const resp = _dobNormalizeDept_(obs.responsibleDepartment);
        const subEmail = String(obs.submittedByEmail || '').trim().toLowerCase();
        const observer = String(obs.observerName || '').trim().toLowerCase();

        const isSubmitter = (userEmail && subEmail && userEmail === subEmail) ||
            (userName && observer && userName === observer);

        // بيانات قديمة بلا workflowStage: نعرض للإدارة إن طابقت المسؤولية
        if (!stage) {
            if (isSubmitter) return true;
            if (deptScope && userDept && resp && userDept === resp) return true;
            return false;
        }

        if (isSubmitter) return true;

        const early = (stage === 'pending_specialist' || stage === 'pending_manager' || stage === 'returned_specialist');
        if (early) return false;

        if (deptScope && userDept && resp && userDept === resp) {
            return (
                stage === 'pending_department' ||
                stage === 'in_progress' ||
                stage === 'closed' ||
                stage === 'rejected'
            );
        }
        return false;
    });
}

/**
 * دفع سجل في timeLog
 */
function _dobAppendTimeLog_(observation, entry) {
    var timeLog = [];
    try {
        if (Array.isArray(observation.timeLog)) {
            timeLog = observation.timeLog;
        } else if (typeof observation.timeLog === 'string' && observation.timeLog) {
            timeLog = JSON.parse(observation.timeLog);
        }
    } catch (e) {
        timeLog = [];
    }
    timeLog.push(entry);
    observation.timeLog = timeLog;
}

/** تطبيع دور الممثل: يدعم admin ومدير النظام ومسئول السلامة كما في الجدول */
function _dobActorIsAdmin_(roleRaw) {
    var r0 = String(roleRaw || '').trim();
    var s = r0.toLowerCase();
    return s === 'admin' || s === 'system_admin' || r0 === 'مدير النظام' || r0 === 'مدير';
}

function _dobActorIsSafetyOfficer_(roleRaw) {
    var r0 = String(roleRaw || '').trim();
    var s = r0.toLowerCase();
    return s === 'safety_officer' || r0 === 'مسئول السلامة' || r0 === 'مسؤول السلامة';
}

/**
 * انتقال مرحلة سير اعتماد الملاحظة
 * payload: { observationId, action, comments, rejectionReason, correctiveAction, expectedCompletionDate,
 *   actor: { name, email, role, dailyObservationsPermissions } }
 */
function transitionObservationWorkflow(payload) {
    try {
        payload = payload || {};
        const observationId = payload.observationId || payload.id;
        if (!observationId) {
            return { success: false, message: 'معرف الملاحظة غير محدد' };
        }
        const action = String(payload.action || '').trim();
        const actor = payload.actor || {};
        const actorName = String(actor.name || 'System');
        const actorEmail = String(actor.email || '');
        var roleRaw = String(actor.role || '').trim();
        var isAdminUser = _dobActorIsAdmin_(roleRaw);
        var isSafetyOfficerUser = _dobActorIsSafetyOfficer_(roleRaw);
        const perms = actor.dailyObservationsPermissions || {};

        const sheetName = 'DailyObservations';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const idx = data.findIndex(function (o) { return o.id === observationId; });
        if (idx === -1) {
            return { success: false, message: 'الملاحظة غير موجودة' };
        }
        var obs = data[idx];
        var stage = String(obs.workflowStage || '').trim() || 'pending_specialist';

        var comments = String(payload.comments || '').trim();
        var rejectionReason = String(payload.rejectionReason || '').trim();

        // مسؤول السلامة (أخصائي) = safety_officer | مدير السلامة = مدير النظام (admin) | صلاحيات تفصيلية
        var hasSpecialist = isAdminUser || isSafetyOfficerUser || perms['observations-specialist-review'] === true;
        var hasManager = isAdminUser || perms['observations-manager-approve'] === true;
        var hasDept = _dobNormalizeDept_(actor.department) === _dobNormalizeDept_(obs.responsibleDepartment);

        var nowIso = new Date().toISOString();
        var updates = {};

        function fail(msg) {
            return { success: false, message: msg };
        }

        if (action === 'assign_responsible') {
            var aName = String(payload.assignedToName || '').trim();
            var aEmail = String(payload.assignedToEmail || '').trim();
            if (!aName) return fail('يرجى إدخال اسم المسؤول المعيّن');
            var specialistStages = (stage === 'pending_specialist' || stage === 'returned_specialist' || stage === 'pending_manager');
            var deptStages = (stage === 'pending_department' || stage === 'in_progress');
            var canSpec = hasSpecialist && specialistStages;
            var canDept = (hasDept || isAdminUser) && deptStages;
            if (!(isAdminUser || canSpec || canDept)) {
                return fail('لا صلاحية لتعيين المسؤول في هذه المرحلة');
            }
            obs.assignedToName = aName;
            obs.assignedToEmail = aEmail;
            _dobAppendTimeLog_(obs, {
                action: 'assign_responsible',
                user: actorName,
                timestamp: nowIso,
                roleLabel: 'تعيين المتابعة',
                actionDetail: 'المعيّن: ' + aName + (aEmail ? ' — ' + aEmail : ''),
                note: 'تعيين المتابعة: المعيّن: ' + aName + (aEmail ? ' — ' + aEmail : '')
            });
            if (aEmail) {
                var baseLocal = 'رقم الملاحظة: ' + String(obs.isoCode || obs.id || '') + '\nالإدارة: ' + String(obs.responsibleDepartment || '') + '\n' + String(obs.details || '').slice(0, 280);
                _dobSendWorkflowEmail_([aEmail], 'تعيينكم مسؤولاً عن متابعة ملاحظة', baseLocal + '\n\nالمعيّن: ' + aName);
                _dobPushInAppForEmails_([aEmail], 'تعيينكم مسؤولاً عن متابعة ملاحظة', baseLocal + '\n\nالمعيّن: ' + aName, obs.id);
            }
        } else if (action === 'specialist_forward') {
            if (!hasSpecialist) return fail('لا صلاحية لمراجعة مسؤول السلامة (أخصائي)');
            if (stage !== 'pending_specialist' && stage !== 'returned_specialist') {
                return fail('المرحلة الحالية لا تسمح بهذا الإجراء');
            }
            var asgN = String(payload.assignedToName != null ? payload.assignedToName : '').trim();
            var asgE = String(payload.assignedToEmail != null ? payload.assignedToEmail : '').trim();
            if (asgN) obs.assignedToName = asgN;
            if (asgE) obs.assignedToEmail = asgE;
            obs.workflowStage = 'pending_manager';
            obs.specialistReviewedBy = actorName;
            obs.specialistReviewedAt = nowIso;
            obs.specialistComments = comments || obs.specialistComments || '';
            _dobAppendTimeLog_(obs, {
                action: 'specialist_forward',
                user: actorName,
                timestamp: nowIso,
                roleLabel: 'أخصائي السلامة',
                actionDetail: 'تمرير لمدير السلامة',
                note: 'أخصائي السلامة: تمرير لمدير السلامة'
            });
            notifyObservationWorkflowEmails('pending_manager', obs, [actorEmail]);
        } else if (action === 'manager_approve') {
            if (!hasManager) return fail('لا صلاحية لاعتماد مدير السلامة (مدير النظام)');
            if (stage !== 'pending_manager') {
                return fail('المرحلة الحالية لا تسمح بالاعتماد');
            }
            var asgN2 = String(payload.assignedToName != null ? payload.assignedToName : '').trim();
            var asgE2 = String(payload.assignedToEmail != null ? payload.assignedToEmail : '').trim();
            if (asgN2) obs.assignedToName = asgN2;
            if (asgE2) obs.assignedToEmail = asgE2;
            obs.workflowStage = 'pending_department';
            obs.managerApprovedBy = actorName;
            obs.managerApprovedAt = nowIso;
            obs.managerComments = comments || obs.managerComments || '';
            obs.rejectionReason = '';
            _dobAppendTimeLog_(obs, {
                action: 'manager_approve',
                user: actorName,
                timestamp: nowIso,
                roleLabel: 'مدير السلامة',
                actionDetail: 'اعتماد وإرسال للإدارة',
                note: 'مدير السلامة: اعتماد وإرسال للإدارة'
            });
            notifyObservationWorkflowEmails('pending_department', obs, [actorEmail]);
        } else if (action === 'manager_reject' || action === 'admin_reject') {
            if (action === 'admin_reject') {
                if (!isAdminUser) return fail('الرفض الإداري لمدير النظام فقط');
                var adminOkStage = (
                    stage === 'pending_manager' ||
                    stage === 'pending_specialist' ||
                    stage === 'returned_specialist' ||
                    stage === 'pending_department' ||
                    stage === 'in_progress'
                );
                if (!adminOkStage) return fail('لا يمكن الرفض في هذه المرحلة');
            } else {
                if (!hasManager) return fail('لا صلاحية لرفض مدير السلامة');
                if (stage !== 'pending_manager') {
                    return fail('الرفض متاح من مدير السلامة في مرحلة بانتظار الاعتماد');
                }
            }
            if (!rejectionReason) return fail('يرجى إدخال سبب الرفض');
            obs.workflowStage = 'rejected';
            obs.rejectionReason = rejectionReason;
            obs.status = 'مغلق';
            _dobAppendTimeLog_(obs, {
                action: 'rejected',
                user: actorName,
                timestamp: nowIso,
                roleLabel: action === 'admin_reject' ? 'مدير النظام' : 'مدير السلامة',
                actionDetail: 'رفض الملاحظة — ' + rejectionReason,
                note: (action === 'admin_reject' ? 'مدير النظام' : 'مدير السلامة') + ': رفض الملاحظة — ' + rejectionReason
            });
            notifyObservationWorkflowEmails('rejected_or_return', obs, [actorEmail]);
        } else if (action === 'manager_return_specialist' || action === 'admin_return_specialist') {
            if (action === 'admin_return_specialist' && !isAdminUser) return fail('إرجاع المدير الإداري لمدير النظام فقط');
            if (!(hasManager || isAdminUser)) return fail('لا صلاحية للإرجاع');
            if (stage !== 'pending_manager') {
                return fail('الإرجاع متاح في مرحلة بانتظار اعتماد مدير السلامة');
            }
            if (!rejectionReason) return fail('يرجى إدخال سبب الإرجاع');
            obs.workflowStage = 'returned_specialist';
            obs.rejectionReason = rejectionReason;
            _dobAppendTimeLog_(obs, {
                action: 'return_specialist',
                user: actorName,
                timestamp: nowIso,
                roleLabel: action === 'admin_return_specialist' ? 'مدير النظام' : 'مدير السلامة',
                actionDetail: 'إرجاع لمسؤول السلامة (أخصائي) — ' + rejectionReason,
                note: (action === 'admin_return_specialist' ? 'مدير النظام' : 'مدير السلامة') + ': إرجاع لمسؤول السلامة (أخصائي) — ' + rejectionReason
            });
            notifyObservationWorkflowEmails('rejected_or_return', obs, [actorEmail]);
        } else if (action === 'department_update') {
            if (!hasDept && !isAdminUser) return fail('فقط إدارة التنفيذ يمكنها تحديث الإجراء');
            if (stage !== 'pending_department' && stage !== 'in_progress') {
                return fail('لا يمكن تحديث الإجراء في هذه المرحلة');
            }
            var corr = String(payload.correctiveAction != null ? payload.correctiveAction : '').trim();
            var exp = payload.expectedCompletionDate ? String(payload.expectedCompletionDate) : '';
            if (!corr) return fail('يرجى إدخال الإجراء التصحيحي');
            if (!exp) return fail('يرجى تحديد تاريخ الإغلاق المتوقع');
            obs.correctiveAction = corr;
            obs.expectedCompletionDate = exp;
            obs.workflowStage = 'in_progress';
            obs.departmentActionBy = actorName;
            obs.departmentActionAt = nowIso;
            obs.status = 'جاري';
            _dobAppendTimeLog_(obs, {
                action: 'department_update',
                user: actorName,
                timestamp: nowIso,
                roleLabel: 'مدير الإدارة',
                actionDetail: 'حفظ الإجراء التصحيحي وموعد الإغلاق',
                note: 'مدير الإدارة: حفظ الإجراء التصحيحي وموعد الإغلاق'
            });
            if (isAdminUser && !hasDept) {
                notifyObservationWorkflowEmails('department_update_from_safety', obs, [actorEmail]);
            }
        } else if (action === 'close_observation') {
            if (!(hasManager || hasSpecialist || isAdminUser)) {
                return fail('لا صلاحية لإغلاق الملاحظة');
            }
            if (stage !== 'in_progress' && stage !== 'pending_department') {
                return fail('لا يمكن الإغلاق في هذه المرحلة');
            }
            obs.workflowStage = 'closed';
            obs.status = 'مغلق';
            _dobAppendTimeLog_(obs, {
                action: 'closed',
                user: actorName,
                timestamp: nowIso,
                roleLabel: 'إدارة السلامة',
                actionDetail: 'إغلاق الملاحظة بعد التنفيذ',
                note: 'إدارة السلامة: إغلاق الملاحظة بعد التنفيذ'
            });
            notifyObservationWorkflowEmails('closed', obs, [actorEmail]);
        } else {
            return fail('إجراء غير معروف');
        }

        obs.updatedAt = nowIso;
        updates = {
            workflowStage: obs.workflowStage,
            specialistReviewedBy: obs.specialistReviewedBy,
            specialistReviewedAt: obs.specialistReviewedAt,
            specialistComments: obs.specialistComments,
            managerApprovedBy: obs.managerApprovedBy,
            managerApprovedAt: obs.managerApprovedAt,
            managerComments: obs.managerComments,
            departmentActionBy: obs.departmentActionBy,
            departmentActionAt: obs.departmentActionAt,
            rejectionReason: obs.rejectionReason,
            correctiveAction: obs.correctiveAction,
            expectedCompletionDate: obs.expectedCompletionDate,
            status: obs.status,
            assignedToName: obs.assignedToName || '',
            assignedToEmail: obs.assignedToEmail || '',
            timeLog: obs.timeLog,
            updatedAt: obs.updatedAt
        };

        var res = updateSingleRowInSheet(sheetName, observationId, updates, spreadsheetId);
        if (res && res.success) {
            return { success: true, message: 'تم تحديث سير الملاحظة', data: obs };
        }
        return res || { success: false, message: 'فشل الحفظ' };
    } catch (error) {
        Logger.log('transitionObservationWorkflow: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * إشعار بريد لملاحظة موجودة (بعد الحفظ المجمع saveToSheet من الواجهة)
 */
function notifyObservationWorkflowEvent(payload) {
    try {
        payload = payload || {};
        var id = payload.observationId || payload.id;
        var ev = String(payload.event || 'new_pending_specialist');
        if (!id) return { success: false, message: 'معرف الملاحظة غير محدد' };
        var r = getObservation(id);
        if (!r.success || !r.data) return { success: false, message: 'الملاحظة غير موجودة' };
        notifyObservationWorkflowEmails(ev, r.data, []);
        return { success: true };
    } catch (e) {
        Logger.log('notifyObservationWorkflowEvent: ' + e.toString());
        return { success: false, message: e.toString() };
    }
}

/**
 * ============================================
 * الحصول على تكوين نموذج الملاحظات العامة (المواقع، الأماكن، الإدارات، مسؤولي السلامة)
 * قراءة سريعة مع تخزين مؤقت CacheService لتفادي أي تأخير
 * ============================================
 */
function getPublicObservationConfig() {
    try {
        var cache = null;
        try {
            cache = CacheService.getScriptCache();
            if (cache) {
                var cachedStr = cache.get('PUBLIC_OBS_CONFIG_CACHE_V17');
                if (cachedStr) {
                    return JSON.parse(cachedStr);
                }
            }
        } catch (cGetErr) {}

        var spreadsheetId = getSpreadsheetId();
        
        // 1. المواقع والأماكن الفعلية من النظام
        var sitesMap = {};

        // أ) من شيت ObservationSites
        try {
            var obsSites = readFromSheet('ObservationSites', spreadsheetId) || [];
            obsSites.forEach(function(item) {
                var s = String(item.name || item.siteName || item.site || '').trim();
                var p = String(item.placeName || item.locationName || item.place || '').trim();
                if (s) {
                    if (!sitesMap[s]) sitesMap[s] = { name: s, places: [] };
                    if (p && sitesMap[s].places.indexOf(p) === -1) {
                        sitesMap[s].places.push(p);
                    }
                }
            });
        } catch (e1) {}

        // ب) من شيت Factories و SubLocations
        try {
            var factories = readFromSheet('Factories', spreadsheetId) || [];
            factories.forEach(function(f) {
                var fName = String(f.name || f.factoryName || '').trim();
                if (fName && !sitesMap[fName]) {
                    sitesMap[fName] = { name: fName, places: [] };
                }
            });
            var subLocs = readFromSheet('SubLocations', spreadsheetId) || [];
            subLocs.forEach(function(sl) {
                var fName = String(sl.factoryName || sl.factory || sl.siteName || '').trim();
                var slName = String(sl.name || sl.subLocationName || sl.locationName || '').trim();
                if (fName && sitesMap[fName] && slName && sitesMap[fName].places.indexOf(slName) === -1) {
                    sitesMap[fName].places.push(slName);
                }
            });
        } catch (e2) {}

        // ج) من السجلات الفعلية في DailyObservations (لضمان شمول كل المواقع والأماكن المستخدمة حقيقة)
        var dailyObs = [];
        try {
            dailyObs = readFromSheet('DailyObservations', spreadsheetId) || [];
            dailyObs.forEach(function(d) {
                var s = String(d.siteName || d.site || '').trim();
                var p = String(d.locationName || d.placeId || d.place || '').trim();
                if (s) {
                    if (!sitesMap[s]) sitesMap[s] = { name: s, places: [] };
                    if (p && sitesMap[s].places.indexOf(p) === -1) {
                        sitesMap[s].places.push(p);
                    }
                }
            });
        } catch (e3) {}

        var sites = [];
        for (var sKey in sitesMap) {
            if (sitesMap.hasOwnProperty(sKey)) {
                sites.push(sitesMap[sKey]);
            }
        }
        sites.sort(function(a, b) { return a.name.localeCompare(b.name, 'ar'); });

        // 2. مسؤولو فريق السلامة والصحة المهنية فقط (مع الاستبعاد الصارم لأي موظف مستقيل)
        function normalizeArabicKey(name) {
            return String(name || '')
                .trim()
                .toLowerCase()
                .replace(/^(م\/|أ\/|د\/|مهندس\/|أستاذ\/|دكتور\/|mr\.|eng\.)\s*/i, '')
                .replace(/[أإآ]/g, 'ا')
                .replace(/ة/g, 'ه')
                .replace(/ى/g, 'ي')
                .replace(/\s+/g, ' ');
        }

        function isEmployeeResigned(emp) {
            if (!emp) return false;
            if (emp.isActive === false || emp.active === false || emp.isActive === 'false' || emp.active === 'false') return true;
            var s = String(emp.status || emp.employeeStatus || emp.workStatus || emp.employmentStatus || '').trim().toLowerCase();
            if (!s) return false;
            return s.indexOf('مستقيل') !== -1 || s.indexOf('استقال') !== -1 || s.indexOf('منتهي') !== -1 || s.indexOf('فصل') !== -1 || s.indexOf('ترك') !== -1 || s.indexOf('resign') !== -1 || s.indexOf('terminated') !== -1 || s.indexOf('inactive') !== -1 || s.indexOf('left') !== -1;
        }

        // خريطة أسماء الموظفين المستقيلين لمنع ظهورهم نهائياً
        var resignedNamesMap = {};
        var employees = [];
        try {
            employees = readFromSheet('Employees', spreadsheetId) || [];
            employees.forEach(function(emp) {
                var name = String(emp.name || emp.employeeName || '').trim();
                if (name && isEmployeeResigned(emp)) {
                    resignedNamesMap[normalizeArabicKey(name)] = true;
                }
            });
        } catch (e) {}

        var observersMap = {};
        var safetyMembers = [];

        function registerSafetyMember(name, role, dept) {
            var cleanName = String(name || '').trim();
            if (!cleanName || cleanName.indexOf('مجهول') !== -1 || cleanName.indexOf('عامة') !== -1 || cleanName.length < 3) return;
            // استبعاد أي أسماء مستخدمين إنجليزية أو أدوات نظام
            if (/[a-zA-Z]/.test(cleanName) || !/[\u0600-\u06FF]/.test(cleanName)) return;
            var lower = cleanName.toLowerCase();
            if (lower.includes('admin') || lower.includes('support') || lower.includes('system') || lower.includes('tool') || lower.includes('hse.local')) return;
            var key = normalizeArabicKey(cleanName);
            // منع المستقيلين أو المكررين
            if (!key || observersMap[key] || resignedNamesMap[key]) return;
            observersMap[key] = true;
            safetyMembers.push({
                name: cleanName,
                role: role || 'فريق السلامة والصحة المهنية',
                department: dept || 'السلامة والصحة المهنية',
                isSafetyTeam: true
            });
        }

        // أ) من شيت Employees (مسؤولو وفنيو إدارة السلامة والصحة المهنية فقط - غير المستقيلين)
        try {
            employees.forEach(function(emp) {
                if (isEmployeeResigned(emp)) return;
                var name = String(emp.name || emp.employeeName || '').trim();
                var dept = String(emp.department || '').trim().toLowerCase();
                var job = String(emp.job || emp.jobTitle || emp.position || '').trim().toLowerCase();

                // استبعاد سلامة الغذاء والجودة والتصنيع والمطاعم
                if (job.indexOf('غذاء') !== -1 || job.indexOf('food') !== -1 || dept.indexOf('جودة') !== -1 || dept.indexOf('تصنيع') !== -1) {
                    return;
                }

                // إدارة السلامة والصحة المهنية حصراً
                var isHseDept = (dept.indexOf('سلامة') !== -1 || dept.indexOf('hse') !== -1 || dept.indexOf('صحة مهنية') !== -1);
                var isHseJob = (
                    job.indexOf('سلامة وصحة') !== -1 || job.indexOf('سلامه وصحة') !== -1 || job.indexOf('السلامة والصحة') !== -1 ||
                    job.indexOf('سلامة مهنية') !== -1 || job.indexOf('أخصائي سلامة') !== -1 || job.indexOf('اخصائى سلامه') !== -1 ||
                    job.indexOf('فني سلامة') !== -1 || job.indexOf('فنى سلامة') !== -1 || job.indexOf('مشرف سلامة') !== -1 ||
                    job.indexOf('مدير السلامة') !== -1 || job.indexOf('مفتش سلامة') !== -1 || job.indexOf('مسؤول سلامة') !== -1 ||
                    job.indexOf('hse officer') !== -1 || job.indexOf('hse specialist') !== -1 || job.indexOf('hse manager') !== -1
                );

                if (name && isHseDept && isHseJob) {
                    registerSafetyMember(name, emp.job || emp.jobTitle || 'أخصائي سلامة وصحة مهنية', emp.department || 'إدارة السلامة والصحة المهنية');
                }
            });
        } catch (empErr) {}

        // ب) من إعدادات فريق السلامة في CompanySettings (إن وُجدت أسماء إضافية معتمدة)
        try {
            var compSettings = readFromSheet('CompanySettings', spreadsheetId) || [];
            compSettings.forEach(function(cs) {
                if (cs.key === 'safetyTeam' || cs.key === 'safetyTeamMembers' || cs.key === 'hseTeam') {
                    var rawList = cs.value || cs.safetyTeam || '';
                    if (typeof rawList === 'string') {
                        rawList.split(/[\n,]/).forEach(function(item) {
                            var clean = item.trim();
                            // تجنب الحسابات البرمجية أو الأسماء الإنجليزية الوهمية
                            if (clean && !clean.toLowerCase().includes('support') && !clean.toLowerCase().includes('admin') && !clean.toLowerCase().includes('tool')) {
                                registerSafetyMember(clean, 'مسؤول سلامة وصحة مهنية');
                            }
                        });
                    }
                }
            });
        } catch (csTeamErr) {}

        safetyMembers.sort(function(a, b) {
            return a.name.localeCompare(b.name, 'ar');
        });

        // 3. الإدارات الفعلية الموجودة بقاعدة بيانات النظام حصراً (بدون أي إضافات خارجية)
        var departmentsMap = {};
        var departments = [];

        function normalizeDeptKey(str) {
            return String(str || '')
                .trim()
                .toLowerCase()
                .replace(/[أإآ]/g, 'ا')
                .replace(/ة/g, 'ه')
                .replace(/ى/g, 'ي')
                .replace(/[^\w\u0600-\u06FF]/g, '');
        }

        function registerDept(deptStr) {
            if (!deptStr) return;
            var clean = String(deptStr).trim().replace(/\s+/g, ' ');
            if (clean && clean.length >= 2) {
                var normKey = normalizeDeptKey(clean);
                if (normKey && !departmentsMap[normKey]) {
                    departmentsMap[normKey] = true;
                    departments.push(clean);
                }
            }
        }

        var companyLogo = '';
        try {
            var compSettings = readFromSheet('CompanySettings', spreadsheetId) || [];
            if (compSettings && compSettings.length > 0) {
                var first = compSettings[0];
                companyLogo = String(first.logo || first.companyLogo || '').trim();
                if (first.formDepartments || first.departments) {
                    String(first.formDepartments || first.departments).split(/[\n,]/).forEach(registerDept);
                }
            }
            compSettings.forEach(function(cs) {
                if (cs.key === 'logo' || cs.key === 'companyLogo') companyLogo = cs.value || companyLogo;
                if (cs.key === 'formDepartments' || cs.key === 'departments') {
                    if (typeof cs.value === 'string') cs.value.split(/[\n,]/).forEach(registerDept);
                }
            });
        } catch (csErr) {}

        try {
            employees.forEach(function(e) { registerDept(e.department); });
        } catch (eDeptErr) {}

        if (!companyLogo) companyLogo = 'icons/icapp-logo.png';
        departments.sort(function(a, b) { return a.localeCompare(b, 'ar'); });

        var configResult = {
            success: true,
            sites: sites,
            companyLogo: companyLogo,
            safetyMembers: safetyMembers,
            departments: departments,
            observationTypes: [
                { value: 'سلوك غير آمن', label: 'سلوك غير آمن (Unsafe Act)', icon: 'fa-user-times', color: '#ef4444' },
                { value: 'حالة غير آمنة', label: 'حالة غير آمنة (Unsafe Condition)', icon: 'fa-triangle-exclamation', color: '#f59e0b' },
                { value: 'سلوك آمن وإيجابي', label: 'سلوك آمن وإيجابي (Safe Behavior)', icon: 'fa-circle-check', color: '#10b981' },
                { value: 'ملاحظة بيئية', label: 'ملاحظة بيئية (Environmental)', icon: 'fa-leaf', color: '#06b6d4' },
                { value: 'خطر حريق', label: 'خطر حريق (Fire Hazard)', icon: 'fa-fire-flame-curved', color: '#f97316' },
                { value: 'أخرى', label: 'أخرى (Other)', icon: 'fa-ellipsis', color: '#64748b' }
            ],
            shifts: ['وردية صباحية', 'وردية مسائية', 'وردية ليلية'],
            riskLevels: [
                { value: 'منخفض', label: 'منخفض (Low)', color: '#10b981' },
                { value: 'متوسط', label: 'متوسط (Medium)', color: '#f59e0b' },
                { value: 'عالي', label: 'عالي (High)', color: '#ef4444' },
                { value: 'حرج', label: 'حرج (Critical)', color: '#991b1b' }
            ]
        };

        try {
            if (cache) {
                cache.put('PUBLIC_OBS_CONFIG_CACHE_V17', JSON.stringify(configResult), 1800);
            }
        } catch (cPutErr) {}

        return configResult;
    } catch (err) {
        Logger.log('Error in getPublicObservationConfig: ' + err.toString());
        return { success: false, message: err.toString() };
    }
}

/**
 * ============================================
 * إرسال ملاحظة من النموذج العام مباشرة إلى جدول الملاحظات اليومية DailyObservations
 * ============================================
 */
function submitPublicObservation(payload) {
    try {
        if (!payload || typeof payload !== 'object') {
            return { success: false, message: 'بيانات الملاحظة غير صالحة' };
        }

        // مكافحة السبام (Honeypot)
        if (payload._hp_field || payload.website || payload.hp) {
            return { success: true, message: 'تم إرسال الملاحظة بنجاح' };
        }

        var sheetName = 'DailyObservations';
        var obsId = generateDailyObservationId(sheetName);
        var isoCode = getObservationIsoCodeFromId(obsId);
        var dateVal = payload.date ? String(payload.date).trim() : Utilities.formatDate(new Date(), 'GMT+2', 'yyyy-MM-dd HH:mm:ss');
        
        var attachments = [];
        if (payload.photoBase64 && String(payload.photoBase64).length > 50) {
            try {
                if (typeof uploadFileToDrive === 'function') {
                    var uploadRes = uploadFileToDrive(payload.photoBase64, 'Obs_' + obsId + '_' + Date.now() + '.jpg', 'image/jpeg', 'DailyObservations');
                    if (uploadRes && uploadRes.success) {
                        var fileId = uploadRes.fileId || '';
                        var unifiedUrl = fileId ? ('https://drive.google.com/uc?export=view&id=' + fileId) : (uploadRes.directLink || uploadRes.shareableLink || '');
                        var shareLink = fileId ? ('https://drive.google.com/file/d/' + fileId + '/view') : (uploadRes.shareableLink || uploadRes.directLink || '');
                        if (unifiedUrl) {
                            attachments.push({
                                id: fileId || Utilities.getUuid(),
                                name: 'image-1',
                                url: unifiedUrl,
                                directLink: unifiedUrl,
                                shareableLink: shareLink,
                                fileId: fileId,
                                type: 'image/jpeg',
                                uploadedAt: new Date().toISOString()
                            });
                        }
                    }
                }
            } catch (imgErr) {
                Logger.log('⚠️ تعذر رفع صورة الملاحظة العامة: ' + imgErr.toString());
            }
        }

        var siteName = payload.siteName || payload.site || payload.factory || payload.factoryName || '';
        var locationName = payload.locationName || payload.place || payload.subLocation || payload.subLocationName || '';
        var observerName = payload.observerName || payload.reporterName || 'ملاحظة عامة (مجهول)';
        if (payload.reporterPhone) {
            observerName += ' (' + payload.reporterPhone + ')';
        }

        var subCategory = (payload.subCategory || '').trim();
        var detailsText = (payload.details || payload.description || '').trim();
        if (subCategory && !detailsText.includes(subCategory)) {
            detailsText = '[' + subCategory + '] ' + detailsText;
        }

        var gpsCoords = String(payload.gpsCoordinates || payload.coordinates || payload.gps || '').trim();
        var mapsUrl = String(payload.mapsUrl || (gpsCoords ? ('https://maps.google.com/?q=' + encodeURIComponent(gpsCoords)) : '')).trim();
        var gpsAcc = payload.gpsAccuracy ? (' (دقة: ±' + Math.round(payload.gpsAccuracy) + 'م)') : '';

        var remarksText = subCategory ? ('التصنيف الفرعي: ' + subCategory) : 'المصدر: نموذج عام ميداني';
        if (gpsCoords) {
            remarksText += ' | إحداثيات GPS: ' + gpsCoords + gpsAcc;
        }

        var obsRecord = {
            id: obsId,
            isoCode: isoCode,
            siteId: siteName,
            siteName: siteName,
            placeId: locationName,
            locationName: locationName,
            observationType: payload.observationType || payload.behaviorType || 'سلوك غير آمن',
            subCategory: subCategory,
            date: dateVal,
            shift: payload.shift || 'الأولى',
            details: detailsText,
            correctiveAction: (payload.correctiveAction || '').trim(),
            responsibleDepartment: payload.responsibleDepartment || payload.department || 'السلامة والصحة المهنية',
            riskLevel: payload.riskLevel || 'متوسط',
            observerName: observerName,
            expectedCompletionDate: payload.expectedCompletionDate || payload.expectedDate || '',
            status: payload.status || 'Open',
            workflowStage: 'pending_specialist',
            gpsCoordinates: gpsCoords,
            gpsAccuracy: payload.gpsAccuracy || '',
            mapsUrl: mapsUrl,
            submittedBy: 'نموذج عام (Public Form)',
            submittedByEmail: '',
            submittedAt: new Date().toISOString(),
            remarks: remarksText,
            attachments: stringifyAttachments(attachments),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        
        // التأكد التلقائي من وجود أعمدة GPS والتصنيف الفرعي في الشيت
        try {
            var ss = SpreadsheetApp.openById(getSpreadsheetId());
            var sheet = ss.getSheetByName(sheetName);
            if (sheet) {
                var lastCol = sheet.getLastColumn();
                if (lastCol > 0) {
                    var curHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h) { return String(h || '').trim(); });
                    var needed = ['gpsCoordinates', 'gpsAccuracy', 'mapsUrl', 'subCategory'];
                    var missing = needed.filter(function(col) { return curHeaders.indexOf(col) === -1; });
                    if (missing.length > 0) {
                        sheet.getRange(1, lastCol + 1, 1, missing.length).setValues([missing]);
                        var newRange = sheet.getRange(1, lastCol + 1, 1, missing.length);
                        newRange.setFontWeight('bold');
                        newRange.setBackground('#f0f0f0');
                    }
                }
            }
        } catch (hdrErr) {
            Logger.log('Header ensure error: ' + hdrErr.toString());
        }

        var result = appendToSheet(sheetName, obsRecord);
        if (result && result.success) {
            // إرسال تنبيه عاجل للمخاطر الحرجة وعالية الخطورة
            try {
                if (typeof notifyObservationWorkflowEmails === 'function') {
                    notifyObservationWorkflowEmails('new_pending_specialist', obsRecord);
                syncObservationToCAPA_(obsRecord);
                }
            } catch (nErr) {
                Logger.log('Workflow alert notify error: ' + nErr.toString());
            }

            return {
                success: true,
                id: obsRecord.isoCode || obsRecord.id,
                message: 'تم تسجيل الملاحظة اليومية بنجاح، شكراً لمشاركتكم في حماية بيئة العمل.'
            };
        }
        return result || { success: false, message: 'فشل حفظ الملاحظة' };
    } catch (e) {
        Logger.log('Error in submitPublicObservation: ' + e.toString());
        return { success: false, message: 'حدث خطأ أثناء إرسال الملاحظة: ' + e.toString() };
    }
}



/**
 * مزامنة الملاحظة الحرجة أو ذات الإجراء التصحيحي مع خطة متابعة الإجراءات (CAPA)
 */
function syncObservationToCAPA_(obsRecord) {
    try {
        if (!obsRecord || !obsRecord.correctiveAction || String(obsRecord.correctiveAction).trim().length === 0) return;
        if (typeof addActionTrackingToSheet !== 'function') return;

        var actionData = {
            id: 'ACT_OBS_' + (obsRecord.id || Utilities.getUuid()),
            title: 'إجراء تصحيحي لملاحظة: ' + (obsRecord.isoCode || obsRecord.id),
            actionType: 'Corrective',
            sourceModule: 'DailyObservations',
            sourceId: obsRecord.isoCode || obsRecord.id,
            description: obsRecord.correctiveAction,
            hazardDescription: obsRecord.details || '',
            site: obsRecord.siteName || '',
            location: obsRecord.locationName || '',
            responsibleDepartment: obsRecord.responsibleDepartment || '',
            assignedTo: obsRecord.responsibleDepartment || '',
            priority: (obsRecord.riskLevel === 'حرج' || obsRecord.riskLevel === 'عالي') ? 'High' : 'Medium',
            status: 'Open',
            dueDate: obsRecord.expectedCompletionDate || '',
            createdAt: new Date().toISOString(),
            createdBy: obsRecord.observerName || 'نظام الملاحظات اليومية'
        };

        addActionTrackingToSheet(actionData);
    } catch (e) {
        Logger.log('syncObservationToCAPA_ error: ' + e.toString());
    }
}

/**
 * إرسال التقرير التنفيذي الأسبوعي للملاحظات اليومية إلى إدارة السلامة
 */
function sendWeeklyDailyObservationsDigest() {
    try {
        var sheet = getSheetByName('DailyObservations');
        if (!sheet) return { success: false, message: 'ورقة الملاحظات غير موجودة' };
        
        var rawData = readAllRowsWithHeaders(sheet) || [];
        var now = new Date();
        var oneWeekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        
        var weekObs = rawData.filter(function(r) {
            if (!r.date && !r.createdAt) return false;
            var d = new Date(r.date || r.createdAt);
            return !isNaN(d.getTime()) && d >= oneWeekAgo;
        });

        var totalCount = weekObs.length;
        var closedCount = weekObs.filter(function(r) { return r.status === 'Closed' || r.status === 'مغلق'; }).length;
        var criticalCount = weekObs.filter(function(r) { return r.riskLevel === 'حرج' || r.riskLevel === 'عالي'; }).length;
        var closureRate = totalCount > 0 ? Math.round((closedCount / totalCount) * 100) : 100;

        var htmlBody = '<div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">' +
            '<div style="background: #1e3a8a; color: #fff; padding: 18px 24px;">' +
                '<h2 style="margin:0; font-size: 1.2rem;">📊 التقرير التنفيذي الأسبوعي للملاحظات الميدانية (HSE)</h2>' +
                '<p style="margin: 4px 0 0 0; font-size: 0.85rem; opacity: 0.85;">ملخص نشاط السلامة خلال آخر 7 أيام</p>' +
            '</div>' +
            '<div style="padding: 20px; background: #f8fafc;">' +
                '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; margin-bottom: 20px;">' +
                    '<div style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;"><div style="font-size: 1.3rem; font-weight: bold; color: #2563eb;">' + totalCount + '</div><div style="font-size: 0.75rem; color: #64748b;">إجمالي الملاحظات</div></div>' +
                    '<div style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;"><div style="font-size: 1.3rem; font-weight: bold; color: #16a34a;">' + closureRate + '%</div><div style="font-size: 0.75rem; color: #64748b;">نسبة المعالجة والإغلاق</div></div>' +
                    '<div style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;"><div style="font-size: 1.3rem; font-weight: bold; color: #dc2626;">' + criticalCount + '</div><div style="font-size: 0.75rem; color: #64748b;">مخاطر حرجة</div></div>' +
                '</div>' +
                '<p style="font-size: 0.85rem; color: #334155; margin-bottom: 12px;">تم توثيق هذا التقرير آلياً عبر منظومة السلامة والصحة المهنية الرقمية.</p>' +
            '</div>' +
        '</div>';

        var recipients = getActiveUserEmailsWithDailyObsPermission('observations-manager-approve') || [];
        if (recipients.length === 0) recipients = getActiveUserEmailsByRole('safety_manager');
        
        if (recipients.length > 0) {
            recipients.forEach(function(email) {
                try {
                    MailApp.sendEmail({
                        to: email,
                        subject: '📊 [HSE Weekly] التقرير التنفيذي الأسبوعي للملاحظات الميدانية',
                        htmlBody: htmlBody
                    });
                } catch(mErr) {}
            });
        }
        return { success: true, message: 'تم إرسال التقرير الأسبوعي بنجاح' };
    } catch(e) {
        return { success: false, message: e.toString() };
    }
}
