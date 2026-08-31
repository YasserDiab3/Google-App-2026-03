/**
 * Safety Calendar — أحداث مخصصة للتقويم
 */

function addSafetyCalendarCustomEvent(eventData) {
    try {
        if (!eventData) {
            return { success: false, message: 'بيانات الحدث غير موجودة' };
        }

        const sheetName = 'SafetyCalendarCustomEvents';

        if (!eventData.id) {
            eventData.id = Utilities.getUuid();
        }
        if (!eventData.createdAt) {
            eventData.createdAt = new Date();
        }
        eventData.updatedAt = new Date();
        if (eventData.enabled === undefined || eventData.enabled === null || eventData.enabled === '') {
            eventData.enabled = true;
        }
        if (!eventData.recurring) {
            eventData.recurring = 'once';
        }
        if (!eventData.startDate && eventData.date) {
            eventData.startDate = eventData.date;
        }

        return appendToSheet(sheetName, eventData);
    } catch (error) {
        Logger.log('Error in addSafetyCalendarCustomEvent: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الحدث: ' + error.toString() };
    }
}

function updateSafetyCalendarCustomEvent(eventId, updateData) {
    try {
        if (!eventId) {
            return { success: false, message: 'معرف الحدث غير موجود' };
        }

        updateData.updatedAt = new Date().toISOString();
        if (updateData.date && !updateData.startDate) {
            updateData.startDate = updateData.date;
        }

        return updateSingleRowInSheet('SafetyCalendarCustomEvents', eventId, updateData, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in updateSafetyCalendarCustomEvent: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الحدث: ' + error.toString() };
    }
}

function deleteSafetyCalendarCustomEvent(eventId) {
    try {
        if (!eventId) {
            return { success: false, message: 'معرف الحدث غير موجود' };
        }

        return deleteRowById('SafetyCalendarCustomEvents', eventId, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in deleteSafetyCalendarCustomEvent: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الحدث: ' + error.toString() };
    }
}

function getAllSafetyCalendarCustomEvents() {
    try {
        const sheetName = 'SafetyCalendarCustomEvents';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const processed = [];

        for (let i = 0; i < data.length; i++) {
            const row = Object.assign({}, data[i]);
            if (row.enabled === 'false' || row.enabled === 0 || row.enabled === '0') {
                row.enabled = false;
            } else if (row.enabled === 'true' || row.enabled === 1 || row.enabled === '1') {
                row.enabled = true;
            } else if (row.enabled === undefined || row.enabled === null || row.enabled === '') {
                row.enabled = true;
            }
            if (!row.startDate && row.date) {
                row.startDate = row.date;
            }
            processed.push(row);
        }

        return { success: true, data: processed };
    } catch (error) {
        Logger.log('Error in getAllSafetyCalendarCustomEvents: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء جلب الأحداث: ' + error.toString(), data: [] };
    }
}
