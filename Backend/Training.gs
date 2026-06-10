/**
 * Google Apps Script for HSE System - Training Module
 * 
 * موديول التدريب - النسخة المحسنة
 */

/**
 * إضافة تدريب
 */
function addTrainingToSheet(trainingData) {
    try {
        if (!trainingData) {
            return { success: false, message: 'بيانات التدريب غير موجودة' };
        }
        
        const sheetName = 'Training';
        
        // إضافة حقول تلقائية
        if (!trainingData.id) {
            trainingData.id = generateSequentialId('TRN', sheetName);
        }
        if (!trainingData.createdAt) {
            trainingData.createdAt = new Date();
        }
        if (!trainingData.updatedAt) {
            trainingData.updatedAt = new Date();
        }
        if (!trainingData.status) {
            trainingData.status = 'مخطط';
        }
        
        return appendToSheet(sheetName, trainingData);
    } catch (error) {
        Logger.log('Error in addTrainingToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة التدريب: ' + error.toString() };
    }
}

/**
 * تحديث تدريب
 */
function updateTraining(trainingId, updateData) {
    try {
        if (!trainingId) {
            return { success: false, message: 'معرف التدريب غير محدد' };
        }
        
        const sheetName = 'Training';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const trainingIndex = data.findIndex(t => t.id === trainingId);
        
        if (trainingIndex === -1) {
            return { success: false, message: 'التدريب غير موجود' };
        }
        
        // تحديث البيانات
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[trainingIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating training: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث التدريب: ' + error.toString() };
    }
}

/**
 * الحصول على تدريب محدد
 */
function getTraining(trainingId) {
    try {
        if (!trainingId) {
            return { success: false, message: 'معرف التدريب غير محدد' };
        }
        
        const sheetName = 'Training';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const training = data.find(t => t.id === trainingId);
        
        if (!training) {
            return { success: false, message: 'التدريب غير موجود' };
        }
        
        return { success: true, data: training };
    } catch (error) {
        Logger.log('Error getting training: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة التدريب: ' + error.toString() };
    }
}

/**
 * الحصول على جميع التدريبات
 */
function getAllTrainings(filters = {}) {
    try {
        const sheetName = 'Training';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.trainer) {
            data = data.filter(t => t.trainer === filters.trainer);
        }
        if (filters.status) {
            data = data.filter(t => t.status === filters.status);
        }
        if (filters.startDate) {
            data = data.filter(t => {
                if (!t.startDate) return false;
                return new Date(t.startDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(t => {
                if (!t.startDate) return false;
                return new Date(t.startDate) <= new Date(filters.endDate);
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
        Logger.log('Error getting all trainings: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة التدريبات: ' + error.toString(), data: [] };
    }
}

/**
 * حذف تدريب
 */
function deleteTraining(trainingId, userData) {
    try {
        if (typeof checkAdminPermissions !== 'function' || !checkAdminPermissions(userData || {})) {
            return {
                success: false,
                message: 'ليس لديك صلاحية الحذف. الحذف متاح لمدير النظام فقط.',
                errorCode: 'DELETE_ADMIN_ONLY'
            };
        }
        if (!trainingId) {
            return { success: false, message: 'معرف التدريب غير محدد' };
        }
        
        const sheetName = 'Training';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(t => t.id !== trainingId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'التدريب غير موجود' };
        }
        
        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting training: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف التدريب: ' + error.toString() };
    }
}

/**
 * إضافة مصفوفة تدريب موظف
 */
function addEmployeeTrainingMatrixToSheet(matrixData) {
    try {
        if (!matrixData) {
            return { success: false, message: 'بيانات المصفوفة غير موجودة' };
        }
        
        const sheetName = 'EmployeeTrainingMatrix';
        
        // إضافة حقول تلقائية
        if (!matrixData.id) {
            matrixData.id = generateSequentialId('ETM', sheetName);
        }
        if (!matrixData.createdAt) {
            matrixData.createdAt = new Date();
        }
        if (!matrixData.updatedAt) {
            matrixData.updatedAt = new Date();
        }
        
        return appendToSheet(sheetName, matrixData);
    } catch (error) {
        Logger.log('Error in addEmployeeTrainingMatrixToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة المصفوفة: ' + error.toString() };
    }
}

/**
 * تحديث مصفوفة تدريب موظف
 */
function updateEmployeeTrainingMatrix(employeeId, updateData) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'EmployeeTrainingMatrix';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const matrixIndex = data.findIndex(m => m.employeeId === employeeId);
        
        if (matrixIndex === -1) {
            return { success: false, message: 'مصفوفة التدريب غير موجودة' };
        }
        
        updateData.updatedAt = new Date();
        updateData.lastUpdated = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[matrixIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating training matrix: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث المصفوفة: ' + error.toString() };
    }
}

/**
 * الحصول على مصفوفة تدريب موظف
 */
function getEmployeeTrainingMatrix(employeeId) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'EmployeeTrainingMatrix';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const matrix = data.find(m => m.employeeId === employeeId);
        
        if (!matrix) {
            return { success: false, message: 'مصفوفة التدريب غير موجودة' };
        }
        
        return { success: true, data: matrix };
    } catch (error) {
        Logger.log('Error getting training matrix: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة المصفوفة: ' + error.toString() };
    }
}

/**
 * إضافة تدريب مقاول
 */
function addContractorTrainingToSheet(trainingData) {
    try {
        if (!trainingData) {
            return { success: false, message: 'بيانات التدريب غير موجودة' };
        }

        const sheetName = 'ContractorTrainings';

        // إضافة حقول تلقائية
        if (!trainingData.id) {
            trainingData.id = generateSequentialId('CTR', sheetName);
        }
        if (!trainingData.createdAt) {
            trainingData.createdAt = new Date();
        }
        if (!trainingData.updatedAt) {
            trainingData.updatedAt = new Date();
        }

        return appendToSheet(sheetName, trainingData);
    } catch (error) {
        Logger.log('Error in addContractorTrainingToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة التدريب: ' + error.toString() };
    }
}

/**
 * تحديث تدريب مقاول
 * ✅ إصلاح حرج: بدون هذه الدالة، أي تعديل على سجل تدريب مقاول كان يفشل بصمت
 * (لأن action 'updateContractorTraining' غير موجود في ActionHandlers)، ما يجعل
 * البيانات في الذاكرة المحلية تختلف عن Google Sheets، وعند الجلب التالي بعد
 * نافذة الـ60 ثانية، يتم استبدال القيم الجديدة بالقيم القديمة من الشيت،
 * فيبدو للمستخدم وكأن الوقت/البيانات تغيّرت تلقائياً.
 */
function updateContractorTraining(trainingId, updateData) {
    try {
        if (!trainingId) {
            return { success: false, message: 'معرف التدريب غير محدد' };
        }
        if (!updateData || typeof updateData !== 'object') {
            return { success: false, message: 'بيانات التحديث غير صالحة' };
        }

        const sheetName = 'ContractorTrainings';
        const spreadsheetId = getSpreadsheetId();

        // ✅ استخدام updateSingleRowInSheet لتحديث الصف بشكل مباشر بدون قراءة/كتابة كل الورقة
        // updateSingleRowInSheet يستخدم toSheetCellValue_ الذي يحوّل حقول الوقت بصيغة UTC fraction
        // مما يحافظ على الوقت الصحيح بعد القراءة عبر readFromSheet (الذي يستخدم getUTCHours/Minutes)
        updateData.id = trainingId;
        updateData.updatedAt = new Date();

        const result = updateSingleRowInSheet(sheetName, trainingId, updateData, spreadsheetId);

        if (result && result.success) {
            return { success: true, message: 'تم تحديث تدريب المقاول بنجاح', data: updateData };
        }

        // ✅ احتياطي: لو فشل التحديث المباشر، نلجأ إلى saveToSheet (UPSERT)
        const allData = readFromSheet(sheetName, spreadsheetId);
        const idx = Array.isArray(allData) ? allData.findIndex(t => t && String(t.id) === String(trainingId)) : -1;

        if (idx === -1) {
            return { success: false, message: 'تدريب المقاول غير موجود' };
        }

        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                allData[idx][key] = updateData[key];
            }
        }

        return saveToSheet(sheetName, allData, spreadsheetId);
    } catch (error) {
        Logger.log('Error in updateContractorTraining: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث تدريب المقاول: ' + error.toString() };
    }
}

/**
 * حذف تدريب مقاول
 */
function deleteContractorTraining(trainingId) {
    try {
        if (!trainingId) {
            return { success: false, message: 'معرف التدريب غير محدد' };
        }

        const sheetName = 'ContractorTrainings';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);

        const filtered = Array.isArray(data)
            ? data.filter(t => t && String(t.id) !== String(trainingId))
            : [];

        if (Array.isArray(data) && filtered.length === data.length) {
            return { success: false, message: 'تدريب المقاول غير موجود' };
        }

        return saveToSheet(sheetName, filtered, spreadsheetId);
    } catch (error) {
        Logger.log('Error in deleteContractorTraining: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف تدريب المقاول: ' + error.toString() };
    }
}

/**
 * إضافة موقع ملاحظة
 */
function addObservationSiteToSheet(siteData) {
    try {
        if (!siteData) {
            return { success: false, message: 'بيانات الموقع غير موجودة' };
        }
        
        const sheetName = 'ObservationSites';
        
        // إضافة حقول تلقائية
        if (!siteData.id) {
            siteData.id = generateSequentialId('OBS', sheetName);
        }
        if (!siteData.createdAt) {
            siteData.createdAt = new Date();
        }
        if (!siteData.updatedAt) {
            siteData.updatedAt = new Date();
        }
        if (!siteData.status) {
            siteData.status = 'نشط';
        }
        
        return appendToSheet(sheetName, siteData);
    } catch (error) {
        Logger.log('Error in addObservationSiteToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الموقع: ' + error.toString() };
    }
}

/**
 * إضافة خطة تدريب سنوية
 */
function addAnnualTrainingPlanToSheet(planData) {
    try {
        if (!planData) {
            return { success: false, message: 'بيانات الخطة غير موجودة' };
        }
        
        const sheetName = 'AnnualTrainingPlans';
        
        // إضافة حقول تلقائية
        if (!planData.id) {
            planData.id = generateSequentialId('ATP', sheetName);
        }
        if (!planData.createdAt) {
            planData.createdAt = new Date();
        }
        if (!planData.updatedAt) {
            planData.updatedAt = new Date();
        }
        if (!planData.status) {
            planData.status = 'قيد التنفيذ';
        }
        
        return appendToSheet(sheetName, planData);
    } catch (error) {
        Logger.log('Error in addAnnualTrainingPlanToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الخطة: ' + error.toString() };
    }
}

/**
 * الحصول على إحصائيات التدريب
 */
function getTrainingStatistics(filters = {}) {
    try {
        const allTrainings = getAllTrainings(filters);
        if (!allTrainings.success) {
            return { success: false, message: 'فشل في قراءة التدريبات' };
        }
        
        const trainings = allTrainings.data;
        const stats = {
            total: trainings.length,
            byStatus: {},
            byTrainer: {},
            totalParticipants: 0,
            averageParticipants: 0,
            completionRate: 0,
            upcoming: 0,
            completed: 0
        };
        
        const now = new Date();
        trainings.forEach(training => {
            // حسب الحالة
            const status = training.status || 'Unknown';
            stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
            
            // حسب المدرب
            if (training.trainer) {
                stats.byTrainer[training.trainer] = (stats.byTrainer[training.trainer] || 0) + 1;
            }
            
            // عدد المشاركين
            const participants = training.participantsCount || 
                (training.participants ? 
                    (typeof training.participants === 'string' ? 
                        (training.participants.match(/,/g) || []).length + 1 : 
                        (Array.isArray(training.participants) ? training.participants.length : 0)) : 0);
            stats.totalParticipants += participants;
            
            // التدريبات القادمة
            if (training.startDate) {
                const startDate = new Date(training.startDate);
                if (startDate > now) {
                    stats.upcoming++;
                }
            }
            
            // التدريبات المكتملة
            if (status === 'مكتمل' || status === 'Completed') {
                stats.completed++;
            }
        });
        
        stats.averageParticipants = trainings.length > 0 ? (stats.totalParticipants / trainings.length) : 0;
        stats.completionRate = trainings.length > 0 ? (stats.completed / trainings.length) * 100 : 0;
        
        return { success: true, data: stats };
    } catch (error) {
        Logger.log('Error getting training statistics: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حساب الإحصائيات: ' + error.toString() };
    }
}

/**
 * إضافة سجل حضور تدريب إلى قاعدة البيانات
 */
function addTrainingAttendanceToSheet(attendanceData) {
    try {
        if (!attendanceData) {
            return { success: false, message: 'بيانات الحضور غير موجودة' };
        }
        
        const sheetName = 'TrainingAttendance';
        
        // إضافة حقول تلقائية
        if (!attendanceData.id) {
            attendanceData.id = generateSequentialId('TAT', sheetName);
        }
        if (!attendanceData.createdAt) {
            attendanceData.createdAt = new Date();
        }
        if (!attendanceData.updatedAt) {
            attendanceData.updatedAt = new Date();
        }
        
        return appendToSheet(sheetName, attendanceData);
    } catch (error) {
        Logger.log('Error in addTrainingAttendanceToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة سجل الحضور: ' + error.toString() };
    }
}

/**
 * تحديث سجل حضور تدريب
 */
function updateTrainingAttendance(attendanceId, updateData) {
    try {
        if (!attendanceId) {
            return { success: false, message: 'معرف سجل الحضور غير محدد' };
        }
        
        const sheetName = 'TrainingAttendance';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const attendanceIndex = data.findIndex(a => a.id === attendanceId);
        
        if (attendanceIndex === -1) {
            return { success: false, message: 'سجل الحضور غير موجود' };
        }
        
        // تحديث البيانات
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[attendanceIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating training attendance: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث سجل الحضور: ' + error.toString() };
    }
}

/**
 * الحصول على جميع سجلات حضور التدريب
 */
function getAllTrainingAttendance(filters = {}) {
    try {
        const sheetName = 'TrainingAttendance';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.employeeCode) {
            data = data.filter(a => a.employeeCode === filters.employeeCode);
        }
        if (filters.trainingId) {
            data = data.filter(a => a.trainingId === filters.trainingId);
        }
        if (filters.startDate) {
            data = data.filter(a => {
                if (!a.date) return false;
                return new Date(a.date) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(a => {
                if (!a.date) return false;
                return new Date(a.date) <= new Date(filters.endDate);
            });
        }
        if (filters.factory) {
            data = data.filter(a => a.factory === filters.factory || a.factoryName === filters.factory);
        }
        
        // ترتيب حسب التاريخ
        data.sort((a, b) => {
            const dateA = new Date(a.date || a.createdAt || 0);
            const dateB = new Date(b.date || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all training attendance: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة سجلات الحضور: ' + error.toString(), data: [] };
    }
}

/**
 * حذف سجل حضور تدريب
 */
function deleteTrainingAttendance(attendanceId, userData) {
    try {
        if (typeof checkAdminPermissions !== 'function' || !checkAdminPermissions(userData || {})) {
            return {
                success: false,
                message: 'ليس لديك صلاحية الحذف. الحذف متاح لمدير النظام فقط.',
                errorCode: 'DELETE_ADMIN_ONLY'
            };
        }
        if (!attendanceId) {
            return { success: false, message: 'معرف سجل الحضور غير محدد' };
        }
        
        const sheetName = 'TrainingAttendance';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(a => a.id !== attendanceId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'سجل الحضور غير موجود' };
        }
        
        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting training attendance: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف سجل الحضور: ' + error.toString() };
    }
}

/**
 * حفظ بيانات تحليل التدريب
 */
function saveTrainingAnalysisData(analysisData) {
    try {
        if (!analysisData) {
            return { success: false, message: 'بيانات التحليل غير موجودة' };
        }
        
        const sheetName = 'TrainingAnalysisData';
        const spreadsheetId = getSpreadsheetId();
        
        // إضافة حقول تلقائية
        if (!analysisData.id) {
            analysisData.id = generateSequentialId('TAD', sheetName, spreadsheetId);
        }
        if (!analysisData.createdAt) {
            analysisData.createdAt = new Date();
        }
        analysisData.updatedAt = new Date();
        
        // قراءة البيانات الموجودة
        const existingData = readFromSheet(sheetName, spreadsheetId);
        
        // إذا كان هناك بيانات موجودة، نحدثها، وإلا نضيف جديدة
        if (existingData && existingData.length > 0) {
            existingData[0] = analysisData;
            return saveToSheet(sheetName, existingData, spreadsheetId);
        } else {
            return appendToSheet(sheetName, analysisData);
        }
    } catch (error) {
        Logger.log('Error saving training analysis data: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حفظ بيانات التحليل: ' + error.toString() };
    }
}

/**
 * الحصول على بيانات تحليل التدريب
 */
function getTrainingAnalysisData() {
    try {
        const sheetName = 'TrainingAnalysisData';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        
        if (!data || data.length === 0) {
            return { success: true, data: null };
        }
        
        return { success: true, data: data[0] };
    } catch (error) {
        Logger.log('Error getting training analysis data: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة بيانات التحليل: ' + error.toString() };
    }
}

/**
 * الحصول على جميع جلسات التدريب
 * ملاحظة: جلسات التدريب قد تكون جزءاً من Training أو في جدول منفصل
 */
function getAllTrainingSessions(filters = {}) {
    try {
        // محاولة قراءة من جدول TrainingSessions إذا كان موجوداً
        let sheetName = 'TrainingSessions';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // إذا لم يكن الجدول موجوداً، نستخدم Training كبديل
        if (!data || data.length === 0) {
            sheetName = 'Training';
            data = readFromSheet(sheetName, getSpreadsheetId());
            // تصفية فقط التدريبات التي لها جلسات
            data = data.filter(t => t.sessions || t.sessionDate || t.sessionTime);
        }
        
        // تطبيق الفلاتر
        if (filters.trainingId) {
            data = data.filter(s => s.trainingId === filters.trainingId);
        }
        if (filters.startDate) {
            data = data.filter(s => {
                const sessionDate = s.sessionDate || s.startDate || s.date;
                if (!sessionDate) return false;
                return new Date(sessionDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(s => {
                const sessionDate = s.sessionDate || s.startDate || s.date;
                if (!sessionDate) return false;
                return new Date(sessionDate) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب التاريخ
        data.sort((a, b) => {
            const dateA = new Date(a.sessionDate || a.startDate || a.date || a.createdAt || 0);
            const dateB = new Date(b.sessionDate || b.startDate || b.date || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all training sessions: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة جلسات التدريب: ' + error.toString(), data: [] };
    }
}

/**
 * الحصول على جميع شهادات التدريب
 * ملاحظة: الشهادات قد تكون جزءاً من TrainingAttendance أو في جدول منفصل
 */
function getAllTrainingCertificates(filters = {}) {
    try {
        // محاولة قراءة من جدول TrainingCertificates إذا كان موجوداً
        let sheetName = 'TrainingCertificates';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // إذا لم يكن الجدول موجوداً، نستخدم TrainingAttendance كبديل
        if (!data || data.length === 0) {
            sheetName = 'TrainingAttendance';
            data = readFromSheet(sheetName, getSpreadsheetId());
            // تصفية فقط السجلات التي لها شهادات
            data = data.filter(a => a.certificateNumber || a.certificateDate || a.certificateIssued);
        }
        
        // تطبيق الفلاتر
        if (filters.employeeCode) {
            data = data.filter(c => c.employeeCode === filters.employeeCode);
        }
        if (filters.trainingId) {
            data = data.filter(c => c.trainingId === filters.trainingId);
        }
        if (filters.startDate) {
            data = data.filter(c => {
                const certDate = c.certificateDate || c.issueDate || c.date;
                if (!certDate) return false;
                return new Date(certDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(c => {
                const certDate = c.certificateDate || c.issueDate || c.date;
                if (!certDate) return false;
                return new Date(certDate) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب التاريخ
        data.sort((a, b) => {
            const dateA = new Date(a.certificateDate || a.issueDate || a.date || a.createdAt || 0);
            const dateB = new Date(b.certificateDate || b.issueDate || b.date || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all training certificates: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة شهادات التدريب: ' + error.toString(), data: [] };
    }
}

/**
 * الحصول على جميع تدريبات المقاولين
 */
function getAllContractorTrainings(filters = {}) {
    try {
        const sheetName = 'ContractorTrainings';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.contractorId) {
            data = data.filter(t => t.contractorId === filters.contractorId);
        }
        if (filters.contractorName) {
            data = data.filter(t => t.contractorName === filters.contractorName);
        }
        if (filters.startDate) {
            data = data.filter(t => {
                const trainingDate = t.date || t.trainingDate || t.startDate;
                if (!trainingDate) return false;
                return new Date(trainingDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(t => {
                const trainingDate = t.date || t.trainingDate || t.startDate;
                if (!trainingDate) return false;
                return new Date(trainingDate) <= new Date(filters.endDate);
            });
        }
        if (filters.status) {
            data = data.filter(t => t.status === filters.status);
        }
        
        // ترتيب حسب التاريخ
        data.sort((a, b) => {
            const dateA = new Date(a.date || a.trainingDate || a.startDate || a.createdAt || 0);
            const dateB = new Date(b.date || b.trainingDate || b.startDate || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all contractor trainings: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة تدريبات المقاولين: ' + error.toString(), data: [] };
    }
}

/**
 * تحميل مجمّع لموديول التدريب في استدعاء واحد — يقلل طلبات HTTP ووقت انتظار طابور الواجهة.
 * @param {Object} payload - { filters: {...} } اختياري
 */
function getTrainingModuleBundle(payload) {
    try {
        var filters = (payload && payload.filters) ? payload.filters : {};
        var r1 = getAllTrainings(filters);
        var r2 = getAllTrainingSessions(filters);
        var r3 = getAllTrainingCertificates(filters);
        var r4 = getAllTrainingAttendance(filters);
        var r5 = getAllContractorTrainings(filters);
        var r6 = getAllLegalTrainings(filters);
        var r7 = getAllLegalTrainingAttendees(filters);
        return {
            success: true,
            data: {
                training: (r1 && r1.success && r1.data) ? r1.data : [],
                trainingSessions: (r2 && r2.success && r2.data) ? r2.data : [],
                trainingCertificates: (r3 && r3.success && r3.data) ? r3.data : [],
                trainingAttendance: (r4 && r4.success && r4.data) ? r4.data : [],
                contractorTrainings: (r5 && r5.success && r5.data) ? r5.data : [],
                legalTrainings: (r6 && r6.success && r6.data) ? r6.data : [],
                legalTrainingAttendees: (r7 && r7.success && r7.data) ? r7.data : []
            }
        };
    } catch (error) {
        Logger.log('Error in getTrainingModuleBundle: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحميل بيانات التدريب: ' + error.toString(), data: null };
    }
}

// ============================================
// التدريبات القانونية (Legal Trainings)
// ============================================

/**
 * إضافة تدريب قانوني
 */
function addLegalTrainingToSheet(trainingData) {
    try {
        if (!trainingData) {
            return { success: false, message: 'بيانات التدريب القانوني غير موجودة' };
        }

        const sheetName = 'LegalTrainings';

        if (!trainingData.id) {
            trainingData.id = generateSequentialId('LTR', sheetName);
        }
        if (!trainingData.createdAt) {
            trainingData.createdAt = new Date();
        }
        if (!trainingData.updatedAt) {
            trainingData.updatedAt = new Date();
        }
        if (!trainingData.status) {
            trainingData.status = 'مخطط';
        }
        if (!trainingData.complianceStatus) {
            trainingData.complianceStatus = 'مخطط';
        }

        var result = appendToSheet(sheetName, trainingData);
        if (result && result.success) {
            return {
                success: true,
                data: { id: trainingData.id },
                message: result.message,
                rowNumber: result.rowNumber
            };
        }
        return result;
    } catch (error) {
        Logger.log('Error in addLegalTrainingToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة التدريب القانوني: ' + error.toString() };
    }
}

/**
 * تحديث تدريب قانوني
 */
function updateLegalTraining(trainingId, updateData) {
    try {
        if (!trainingId) {
            return { success: false, message: 'معرف التدريب القانوني غير محدد' };
        }
        if (!updateData || typeof updateData !== 'object') {
            return { success: false, message: 'بيانات التحديث غير صالحة' };
        }

        const sheetName = 'LegalTrainings';
        const spreadsheetId = getSpreadsheetId();

        updateData.id = trainingId;
        updateData.updatedAt = new Date();

        var result = updateSingleRowInSheet(sheetName, trainingId, updateData, spreadsheetId);

        if (result && result.success) {
            return { success: true, message: 'تم تحديث التدريب القانوني بنجاح', data: updateData };
        }

        var allData = readFromSheet(sheetName, spreadsheetId);
        var idx = Array.isArray(allData) ? allData.findIndex(function(t) { return t && String(t.id) === String(trainingId); }) : -1;

        if (idx === -1) {
            return { success: false, message: 'التدريب القانوني غير موجود' };
        }

        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                allData[idx][key] = updateData[key];
            }
        }

        return saveToSheet(sheetName, allData, spreadsheetId);
    } catch (error) {
        Logger.log('Error in updateLegalTraining: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث التدريب القانوني: ' + error.toString() };
    }
}

/**
 * الحصول على تدريب قانوني محدد
 */
function getLegalTraining(trainingId) {
    try {
        if (!trainingId) {
            return { success: false, message: 'معرف التدريب القانوني غير محدد' };
        }

        const sheetName = 'LegalTrainings';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const training = data.find(function(t) { return t && t.id === trainingId; });

        if (!training) {
            return { success: false, message: 'التدريب القانوني غير موجود' };
        }

        return { success: true, data: training };
    } catch (error) {
        Logger.log('Error in getLegalTraining: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة التدريب القانوني: ' + error.toString() };
    }
}

/**
 * الحصول على جميع التدريبات القانونية
 */
function getAllLegalTrainings(filters) {
    filters = filters || {};
    try {
        const sheetName = 'LegalTrainings';
        var data = readFromSheet(sheetName, getSpreadsheetId());

        if (filters.category) {
            data = data.filter(function(t) { return t && t.category === filters.category; });
        }
        if (filters.status) {
            data = data.filter(function(t) { return t && t.status === filters.status; });
        }
        if (filters.complianceStatus) {
            data = data.filter(function(t) { return t && t.complianceStatus === filters.complianceStatus; });
        }
        if (filters.department) {
            data = data.filter(function(t) { return t && t.department === filters.department; });
        }
        if (filters.startDate) {
            data = data.filter(function(t) {
                var d = t.scheduledDate || t.actualDate;
                if (!d) return false;
                return new Date(d) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(function(t) {
                var d = t.scheduledDate || t.actualDate;
                if (!d) return false;
                return new Date(d) <= new Date(filters.endDate);
            });
        }

        data.sort(function(a, b) {
            var dateA = new Date(a.scheduledDate || a.actualDate || a.createdAt || 0);
            var dateB = new Date(b.scheduledDate || b.actualDate || b.createdAt || 0);
            return dateB - dateA;
        });

        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error in getAllLegalTrainings: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة التدريبات القانونية: ' + error.toString(), data: [] };
    }
}

/**
 * حذف تدريب قانوني
 */
function deleteLegalTraining(trainingId, userData) {
    try {
        if (typeof checkAdminPermissions !== 'function' || !checkAdminPermissions(userData || {})) {
            return {
                success: false,
                message: 'ليس لديك صلاحية الحذف. الحذف متاح لمدير النظام فقط.',
                errorCode: 'DELETE_ADMIN_ONLY'
            };
        }
        if (!trainingId) {
            return { success: false, message: 'معرف التدريب القانوني غير محدد' };
        }

        const sheetName = 'LegalTrainings';
        const spreadsheetId = getSpreadsheetId();

        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return {
                success: false,
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.'
            };
        }

        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(function(t) { return t && t.id !== trainingId; });

        if (filteredData.length === data.length) {
            return { success: false, message: 'التدريب القانوني غير موجود' };
        }

        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error in deleteLegalTraining: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف التدريب القانوني: ' + error.toString() };
    }
}

/**
 * إحصائيات التدريبات القانونية
 */
function getLegalTrainingStatistics(filters) {
    filters = filters || {};
    try {
        var result = getAllLegalTrainings(filters);
        if (!result.success) {
            return { success: false, message: 'فشل في قراءة التدريبات القانونية' };
        }

        var trainings = result.data;
        var now = new Date();
        var stats = {
            total: trainings.length,
            compliant: 0,
            nonCompliant: 0,
            expiringSoon: 0,
            planned: 0,
            completed: 0,
            overdue: 0,
            byCategory: {},
            byFrequency: {},
            complianceRate: 0
        };

        trainings.forEach(function(t) {
            var status = t.complianceStatus || t.status || '';

            if (status === 'ممتثل') stats.compliant++;
            else if (status === 'غير ممتثل') stats.nonCompliant++;
            else if (status === 'قارب على الانتهاء') stats.expiringSoon++;
            else if (status === 'مخطط') stats.planned++;

            if (t.status === 'مكتمل') stats.completed++;

            if (t.expiryDate) {
                var expiry = new Date(t.expiryDate);
                if (expiry < now && t.status !== 'مكتمل') stats.overdue++;
            }

            var cat = t.category || 'غير مصنف';
            stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;

            var freq = t.frequency || 'غير محدد';
            stats.byFrequency[freq] = (stats.byFrequency[freq] || 0) + 1;
        });

        stats.complianceRate = trainings.length > 0
            ? Math.round((stats.compliant / trainings.length) * 100)
            : 0;

        return { success: true, data: stats };
    } catch (error) {
        Logger.log('Error in getLegalTrainingStatistics: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حساب الإحصائيات: ' + error.toString() };
    }
}

// ============================================
// حضور التدريبات القانونية (Legal Training Attendees)
// ============================================

function addLegalTrainingAttendee(attendeeData) {
    try {
        if (!attendeeData) {
            return { success: false, message: 'بيانات الحضور غير موجودة' };
        }
        if (!attendeeData.legalTrainingId) {
            return { success: false, message: 'معرف التدريب القانوني مطلوب' };
        }

        var sheetName = 'LegalTrainingAttendees';

        if (!attendeeData.id) {
            attendeeData.id = generateSequentialId('LTA', sheetName);
        }
        if (!attendeeData.createdAt) {
            attendeeData.createdAt = new Date();
        }
        if (!attendeeData.updatedAt) {
            attendeeData.updatedAt = new Date();
        }
        if (!attendeeData.attendanceStatus) {
            attendeeData.attendanceStatus = 'حاضر';
        }

        var result = appendToSheet(sheetName, attendeeData, getSpreadsheetId());
        if (result && result.success) {
            return { success: true, message: 'تم إضافة المتدرب بنجاح', data: attendeeData };
        }
        return result || { success: false, message: 'فشل في إضافة المتدرب' };
    } catch (error) {
        Logger.log('Error in addLegalTrainingAttendee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة المتدرب: ' + error.toString() };
    }
}

function updateLegalTrainingAttendee(attendeeId, updateData) {
    try {
        if (!attendeeId) {
            return { success: false, message: 'معرف سجل الحضور غير محدد' };
        }

        var sheetName = 'LegalTrainingAttendees';
        var spreadsheetId = getSpreadsheetId();

        updateData.id = attendeeId;
        updateData.updatedAt = new Date();

        var result = updateSingleRowInSheet(sheetName, attendeeId, updateData, spreadsheetId);
        if (result && result.success) {
            return { success: true, message: 'تم تحديث بيانات المتدرب بنجاح', data: updateData };
        }

        var allData = readFromSheet(sheetName, spreadsheetId);
        var idx = Array.isArray(allData) ? allData.findIndex(function(a) { return a && String(a.id) === String(attendeeId); }) : -1;
        if (idx === -1) {
            return { success: false, message: 'سجل الحضور غير موجود' };
        }
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                allData[idx][key] = updateData[key];
            }
        }
        return saveToSheet(sheetName, allData, spreadsheetId);
    } catch (error) {
        Logger.log('Error in updateLegalTrainingAttendee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث بيانات المتدرب: ' + error.toString() };
    }
}

function getAllLegalTrainingAttendees(filters) {
    try {
        var sheetName = 'LegalTrainingAttendees';
        var spreadsheetId = getSpreadsheetId();
        var data = readFromSheet(sheetName, spreadsheetId);

        if (!Array.isArray(data)) data = [];

        if (filters && filters.legalTrainingId) {
            data = data.filter(function(a) { return a && String(a.legalTrainingId) === String(filters.legalTrainingId); });
        }
        if (filters && filters.employeeCode) {
            data = data.filter(function(a) { return a && String(a.employeeCode) === String(filters.employeeCode); });
        }
        if (filters && filters.department) {
            data = data.filter(function(a) { return a && a.department === filters.department; });
        }

        return { success: true, data: data };
    } catch (error) {
        Logger.log('Error in getAllLegalTrainingAttendees: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء جلب بيانات الحضور: ' + error.toString(), data: [] };
    }
}

function deleteLegalTrainingAttendee(attendeeId, userData) {
    try {
        if (!attendeeId) {
            return { success: false, message: 'معرف سجل الحضور غير محدد' };
        }

        var sheetName = 'LegalTrainingAttendees';
        var spreadsheetId = getSpreadsheetId();
        var data = readFromSheet(sheetName, spreadsheetId);

        var filtered = Array.isArray(data)
            ? data.filter(function(a) { return a && String(a.id) !== String(attendeeId); })
            : [];

        if (Array.isArray(data) && filtered.length === data.length) {
            return { success: false, message: 'سجل الحضور غير موجود' };
        }

        return saveToSheet(sheetName, filtered, spreadsheetId);
    } catch (error) {
        Logger.log('Error in deleteLegalTrainingAttendee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف سجل الحضور: ' + error.toString() };
    }
}

