/**
 * CrudHelpers.gs — دوال مساعدة موحّدة لتقليل تكرار أنماط CRUD بين الموديولات.
 *
 * الاستخدام: من الموديولات domain استدعِ appendEntityRow_(...) أو تحديث مشابه بدلاً من
 * تكرار: validate → appendToSheet / updateSingleRowInSheet بنفس الشكل في كل ملف.
 *
 * ملاحظة: التحقق من الحقول الخاصة بالنطاق يبقى في ملف الموديول.
 */

/**
 * إضافة كائن إلى ورقة بعد التأكد من وجود id و timestamps بسيطة.
 * @param {string} sheetName
 * @param {Object} data
 * @param {string|null} spreadsheetId
 * @return {Object} نتيجة appendToSheet
 */
function appendEntityRow_(sheetName, data, spreadsheetId) {
    try {
        if (!sheetName || !data || typeof data !== 'object') {
            return { success: false, message: 'appendEntityRow_: بيانات غير صالحة' };
        }
        var row = Object.assign({}, data);
        if (!row.id) {
            row.id = Utilities.getUuid();
        }
        if (!row.createdAt) {
            row.createdAt = new Date();
        }
        if (!row.updatedAt) {
            row.updatedAt = new Date();
        }
        return appendToSheet(sheetName, row, spreadsheetId || getSpreadsheetId());
    } catch (e) {
        Logger.log('appendEntityRow_: ' + e.toString());
        return { success: false, message: String(e) };
    }
}
