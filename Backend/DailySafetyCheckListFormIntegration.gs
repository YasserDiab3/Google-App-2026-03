/**
 * ============================================================
 * ربط نموذج الفحص اليومي للسلامة (Google Form) بجدول التطبيق
 * ============================================================
 *
 * جدول الفورم:
 *   مصنع 1 (ICAPP 1): البيانات من العمود B إلى Y
 *   مصنع 2 (ICAPP 2): البيانات من العمود Y إلى AQ
 *
 * البيانات الأساسية (الموقع، التاريخ، المفتش، الوردية) تُقرأ دائماً من A,B,C,D,E.
 * التاريخ يُخزّن بصيغة YYYY-MM-DD فقط. عمود "الملاحظات الموجودة أثناء المرور" → notes.
 *
 * الفورم:     https://docs.google.com/forms/d/1Ca-Xz2nvqwf45S8aivFLrvlDqJapAwhvFeVIoWfB7jk/
 * جدول الفورم: https://docs.google.com/spreadsheets/d/1dqCGcfLKxjyx0beFjunRymVb_lva-JLSv7Ssy31EVEI/edit
 * جدول المشروع: https://docs.google.com/spreadsheets/d/1EanavJ2OodOmq8b1GagSj8baa-KF-o4mVme_Jlwmgxc/edit
 */

var FORM_SHEET_ID = '1dqCGcfLKxjyx0beFjunRymVb_lva-JLSv7Ssy31EVEI';
var APP_SPREADSHEET_ID = '1EanavJ2OodOmq8b1GagSj8baa-KF-o4mVme_Jlwmgxc';
var FORM_RESPONSES_SHEET_NAME = 'Form Responses 1';
var LAST_PROCESSED_ROW_KEY = 'LAST_PROCESSED_ROW_DAILY_SAFETY_FORM';

var COL_A = 0;
var COL_B = 1;
var COL_X = 23; // عمود X لملاحظات مصنع 1
var COL_F = 5;
var COL_Y = 24;
var COL_AQ = 42; // عمود AQ لملاحظات مصنع 2
var QUESTION_COUNT = 18;

/**
 * تحويل نص التاريخ (مع أو بدون وقت) إلى تاريخ فقط بصيغة YYYY-MM-DD
 */
function formatDateOnly(dateInput) {
  if (!dateInput) return '';
  var s = (typeof dateInput === 'string') ? dateInput.trim() : String(dateInput);
  if (!s) return '';
  var d = new Date(s.replace(/\//g, '-'));
  if (isNaN(d.getTime())) return s.split(' ')[0] || s;
  var y = d.getFullYear();
  var m = ('0' + (d.getMonth() + 1)).slice(-2);
  var day = ('0' + d.getDate()).slice(-2);
  return y + '-' + m + '-' + day;
}

/**
 * تطبيع الطابع الزمني لإرسال الفورم إلى نص ISO ثابت المقارنة.
 * المدخل: Date object أو نص (مثل "8/4/2026 8:26:49").
 * الناتج: "YYYY-MM-DD HH:mm:ss" — ثابت ومستقر للمقارنة بين السجلات.
 */
function normalizeFormSubmittedAt_(value) {
  if (value === undefined || value === null) return '';
  var s = String(value).trim();
  if (!s) return '';
  var d;
  if (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]') {
    d = value;
  } else {
    d = new Date(s.replace(/\//g, '-'));
  }
  if (isNaN(d.getTime())) return s;
  var p = function (n) { return ('0' + n).slice(-2); };
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
    ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
}

/**
 * عد الخلايا غير الفارغة في صف إجابات الفورم
 */
function countNonEmptyFormCells(rowData) {
  if (!rowData || !rowData.length) return 0;
  var nonEmpty = 0;
  for (var c = 0; c < rowData.length; c++) {
    if (rowData[c] !== null && rowData[c] !== undefined && String(rowData[c]).trim() !== '') {
      nonEmpty++;
    }
  }
  return nonEmpty;
}

/**
 * فتح ورقة إجابات الفورم
 */
function getDailySafetyFormResponsesSheet() {
  var spreadsheet = SpreadsheetApp.openById(FORM_SHEET_ID);
  var sheet = spreadsheet.getSheetByName(FORM_RESPONSES_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
  }
  return sheet;
}

/**
 * هل يحتوي الصف على إجابات أسئلة مصنع 1 (الأعمدة F–X)؟
 */
function hasFactory1QuestionData(rowData) {
  if (!rowData || rowData.length <= COL_F) return false;
  for (var c = COL_F; c < COL_Y && c < rowData.length; c++) {
    if (rowData[c] !== null && rowData[c] !== undefined && String(rowData[c]).trim() !== '') {
      return true;
    }
  }
  return false;
}

/**
 * هل يحتوي الصف على إجابات أسئلة مصنع 2 (الأعمدة Y–AQ)؟
 */
function hasFactory2QuestionData(rowData) {
  if (!rowData || rowData.length <= COL_Y) return false;
  for (var c = COL_Y; c < Math.min(COL_Y + QUESTION_COUNT + 2, rowData.length); c++) {
    if (rowData[c] !== null && rowData[c] !== undefined && String(rowData[c]).trim() !== '') {
      return true;
    }
  }
  return false;
}

/**
 * هل اسم الموقع يشير إلى مصنع 2؟
 */
function isSiteNameFactory2(siteName) {
  var siteB = (siteName || '').toString().trim().toLowerCase();
  if (!siteB) return false;
  return siteB.indexOf('2') >= 0 ||
    siteB.indexOf('icapp 2') >= 0 ||
    siteB.indexOf('icapp2') >= 0 ||
    siteB.indexOf('مصنع 2') >= 0 ||
    siteB.indexOf('مصنع2') >= 0;
}

/**
 * هل اسم الموقع يشير إلى مصنع 1؟
 */
function isSiteNameFactory1(siteName) {
  var siteB = (siteName || '').toString().trim().toLowerCase();
  if (!siteB) return false;
  return siteB.indexOf('1') >= 0 ||
    siteB.indexOf('icapp 1') >= 0 ||
    siteB.indexOf('icapp1') >= 0 ||
    siteB.indexOf('مصنع 1') >= 0 ||
    siteB.indexOf('مصنع1') >= 0;
}

/**
 * تحديد المصانع المطلوب استخراجها من صف واحد (قد يُرجع مصنعاً واحداً أو اثنين)
 * @returns {boolean[]} مصفوفة: false = مصنع 1، true = مصنع 2
 */
function getFactoriesForFormRow(rowData, headers) {
  var hasF1 = hasFactory1QuestionData(rowData);
  var hasF2 = hasFactory2QuestionData(rowData);
  if (hasF1 && hasF2) {
    return [false, true];
  }
  if (hasF2 && !hasF1) {
    return [true];
  }
  if (hasF1 && !hasF2) {
    return [false];
  }
  return [isFactory2Row(rowData, headers)];
}

/**
 * معالجة البيانات من جدول إجابات الفورم وحفظها في DailySafetyCheckList
 * يُعالج كل الصفوف الجديدة من lastProcessedRow+1 حتى آخر صف (وليس آخر صف فقط).
 */
function processFormDataFromSheet() {
  var lock = null;
  try {
    try {
      lock = LockService.getScriptLock();
      if (!lock.waitLock(15000)) {
        return { success: true, skipped: true, message: 'عملية مزامنة أخرى قيد التشغيل' };
      }
    } catch (lockEx) {
      Logger.log('processFormDataFromSheet lock timeout: ' + lockEx.toString());
    }

    // إصلاح ذاتي: لو المشغّل الزمني ضاع (redeploy جديد) نعيد تثبيته قبل المعالجة
    try { ensureDailySafetySyncTrigger_(); } catch (e) {}

    var sheet = getDailySafetyFormResponsesSheet();
    if (!sheet) {
      return { success: false, message: 'ورقة إجابات الفورم غير موجودة' };
    }

    var lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return { success: false, message: 'لا توجد إرسالات جديدة' };
    }

    var properties = PropertiesService.getScriptProperties();
    var lastProcessedRow = parseInt(properties.getProperty(LAST_PROCESSED_ROW_KEY) || '0', 10);

    if (lastProcessedRow > lastRow) {
      lastProcessedRow = 0;
      properties.setProperty(LAST_PROCESSED_ROW_KEY, '0');
    }

    if (lastRow <= lastProcessedRow) {
      return { success: false, message: 'لا توجد إرسالات جديدة' };
    }

    var startRow = lastProcessedRow > 0 ? lastProcessedRow + 1 : 2;
    return processFormRowsRange(sheet, startRow, lastRow, true);
  } catch (error) {
    Logger.log('processFormDataFromSheet (DSC): ' + error.toString());
    return { success: false, message: 'حدث خطأ: ' + error.toString() };
  } finally {
    if (lock) {
      try { lock.releaseLock(); } catch (e) {}
    }
  }
}

/**
 * إعادة معالجة نطاق صفوف من جدول إجابات الفورم (استرجاع الصفوف المتخطاة).
 * لا يُحدّث مؤشر lastProcessedRow — آمن للتشغيل اليدوي بعد الإصلاح.
 *
 * @param {number} fromRow - أول صف (≥ 2)
 * @param {number} toRow - آخر صف (اختياري: آخر صف في الورقة)
 */
function reprocessDailySafetyFormRows(fromRow, toRow) {
  try {
    var sheet = getDailySafetyFormResponsesSheet();
    if (!sheet) {
      return { success: false, message: 'ورقة إجابات الفورم غير موجودة' };
    }

    var startRow = parseInt(fromRow, 10) || 2;
    if (startRow < 2) startRow = 2;

    var endRow = parseInt(toRow, 10);
    if (!endRow || isNaN(endRow)) {
      endRow = sheet.getLastRow();
    }
    if (endRow < startRow) {
      return { success: false, message: 'نطاق صفوف غير صالح (fromRow > toRow)' };
    }

    return processFormRowsRange(sheet, startRow, endRow, false);
  } catch (error) {
    Logger.log('reprocessDailySafetyFormRows: ' + error.toString());
    return { success: false, message: 'حدث خطأ: ' + error.toString() };
  }
}

/**
 * معالجة نطاق صفوف من جدول إجابات الفورم وحفظها في DailySafetyCheckList
 *
 * @param {boolean} updateLastProcessed - إذا true يُحدَّث LAST_PROCESSED_ROW بعد آخر صف ناجح
 */
function processFormRowsRange(sheet, startRow, endRow, updateLastProcessed) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var properties = PropertiesService.getScriptProperties();
  var processedCount = 0;
  var skippedDuplicateCount = 0;
  var failedRows = [];
  var savedRecords = [];
  var lastSuccessRow = startRow - 1;
  var numCols = sheet.getLastColumn();

  // قراءة النطاق دفعة واحدة — أسرع + يقلل استهلاك quota (بدل getRange داخل الحلقة)
  var block = sheet.getRange(startRow, 1, endRow - startRow + 1, numCols).getValues();

  for (var idx = 0; idx < block.length; idx++) {
    var rowData = block[idx];
    var row = startRow + idx;

    if (countNonEmptyFormCells(rowData) < 2) {
      lastSuccessRow = row;
      continue;
    }

    var records = mapFormRowToDailySafetyCheckListRecords(rowData, headers);
    if (!records || records.length === 0) {
      // صف غير قابل للتحويل: لا نكسر الحلقة — نسجّل ونكمل حتى لا نحجز الصفوف الأحدث.
      failedRows.push({ row: row, message: 'فشل تحويل بيانات الصف' });
      lastSuccessRow = row;
      continue;
    }

    var rowOk = true;
    for (var r = 0; r < records.length; r++) {
      var result = saveDailySafetyCheckListFromForm(records[r], { skipDuplicates: true });
      if (!result || !result.success) {
        rowOk = false;
        failedRows.push({
          row: row,
          message: (result && result.message) ? result.message : 'فشل الحفظ'
        });
        break;
      }
      if (result.skipped) {
        skippedDuplicateCount++;
      } else {
        savedRecords.push(records[r]);
        processedCount++;
      }
    }

    if (!rowOk) {
      // فشل حفظ (قد يكون مؤقتاً): لا نقدم المؤشر — تُعاد محاولة الصف في الدورة التالية
      // مع الاستمرار في معالجة بقية الصفوف (لا break كُلية تعطل النقل).
      continue;
    }
    lastSuccessRow = row;
  }

  if (updateLastProcessed && lastSuccessRow >= startRow) {
    properties.setProperty(LAST_PROCESSED_ROW_KEY, String(lastSuccessRow));
  }

  if (processedCount === 0 && skippedDuplicateCount === 0 && failedRows.length === 0) {
    return { success: false, message: 'لا توجد بيانات كافية في النطاق المحدد' };
  }

  var ok = failedRows.length === 0;
  var msg = ok
    ? ('تمت معالجة ' + processedCount + ' سجل/سجلات من الصفوف ' + startRow + '–' + lastSuccessRow)
    : ('تمت معالجة ' + processedCount + ' سجل/سجلات ورفض ' + failedRows.length + ' صف/صفوف' +
       ' (أولها الصف ' + failedRows[0].row + ': ' + failedRows[0].message + ').' +
       ' لإعادة معالجتها يدوياً: reprocessDailySafetyFormRows(' + failedRows[0].row + ', ' + lastSuccessRow + ')');
  return {
    success: ok,
    message: msg,
    processedCount: processedCount,
    skippedDuplicateCount: skippedDuplicateCount,
    failedRows: failedRows,
    lastRow: lastSuccessRow,
    data: savedRecords.length === 1 ? savedRecords[0] : savedRecords,
    originalSheet: FORM_SHEET_ID,
    appSheet: APP_SPREADSHEET_ID
  };
}

/**
 * تحديد هل الصف لمصنع 2 (البيانات في Y–AQ) عند وجود مصنع واحد فقط
 */
function isFactory2Row(rowData, headers) {
  var hasF1 = hasFactory1QuestionData(rowData);
  var hasF2 = hasFactory2QuestionData(rowData);
  if (hasF2 && !hasF1) return true;
  if (hasF1 && !hasF2) return false;
  if (hasF2 && hasF1) {
    var siteB = (rowData[COL_B] || '').toString().trim();
    if (isSiteNameFactory2(siteB)) return true;
    if (isSiteNameFactory1(siteB)) return false;
    return false;
  }
  return false;
}

/**
 * تحويل صف واحد إلى سجل أو سجلين (مصنع 1 و/أو مصنع 2)
 */
function mapFormRowToDailySafetyCheckListRecords(rowData, headers) {
  if (!rowData || !headers || rowData.length === 0) return [];
  var factories = getFactoriesForFormRow(rowData, headers);
  var records = [];
  for (var i = 0; i < factories.length; i++) {
    var rec = mapFormRowToDailySafetyCheckList(rowData, headers, factories[i]);
    if (rec) records.push(rec);
  }
  return records;
}

/**
 * تحويل صف من جدول إجابات الفورم إلى كائن مطابق لـ DailySafetyCheckList
 * مصنع 1: أسئلة من F. مصنع 2: أسئلة من Y.
 * الموقع، التاريخ، المفتش، الوردية تُقرأ دائماً من A,B,C,D,E فقط.
 *
 * @param {boolean|undefined} forceFactory2 - إذا true/false يُجبر المصنع؛ وإلا يُستنتج تلقائياً
 */
function mapFormRowToDailySafetyCheckList(rowData, headers, forceFactory2) {
  if (!rowData || !headers || rowData.length === 0) return null;

  var useFactory2 = (forceFactory2 === true || forceFactory2 === false)
    ? forceFactory2
    : isFactory2Row(rowData, headers);
  var firstQuestionCol = useFactory2 ? COL_Y : COL_F;

  var siteName = (rowData[COL_B] !== undefined && rowData[COL_B] !== null && String(rowData[COL_B]).trim() !== '')
    ? String(rowData[COL_B]).trim() : '';
  var dateStr = (rowData[2] !== undefined && rowData[2] !== null && String(rowData[2]).trim() !== '')
    ? String(rowData[2]).trim() : ((rowData[COL_A] !== undefined && rowData[COL_A] !== null) ? String(rowData[COL_A]).trim() : '');
  var inspectorName = (rowData[3] !== undefined && rowData[3] !== null && String(rowData[3]).trim() !== '')
    ? String(rowData[3]).trim() : '';
  var rawShift = (rowData[4] !== undefined && rowData[4] !== null && String(rowData[4]).trim() !== '')
    ? String(rowData[4]).trim() : '';

  dateStr = formatDateOnly(dateStr);
  if (rawShift === 'الاولي' || rawShift === 'الأولى') rawShift = 'الأولى';
  if (rawShift === 'الثانية') rawShift = 'الثانية';
  if (rawShift === 'الثالية' || rawShift === 'الثالثة') rawShift = 'الثالثة';
  if (rawShift === 'مطابق' || rawShift === 'غير مطابق') rawShift = '';

  var rawFormTimestamp = (rowData[COL_A] !== undefined && rowData[COL_A] !== null)
    ? normalizeFormSubmittedAt_(rowData[COL_A])
    : '';

  var out = {
    id: '',
    siteId: siteName || '',
    siteName: siteName || '',
    date: dateStr || '',
    inspectorName: inspectorName || '',
    shift: rawShift || '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: '',
    q15Reading: '',
    q16: '', q17: '',
    notes: '',
    formSubmittedAt: rawFormTimestamp,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  var questionKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q15Reading', 'q16', 'q17'];
  for (var i = 0; i < questionKeys.length && (firstQuestionCol + i) < rowData.length; i++) {
    var val = rowData[firstQuestionCol + i];
    if (val !== undefined && val !== null) {
      out[questionKeys[i]] = String(val).trim();
    }
  }

  var notesValue = '';
  var notesColIndex = useFactory2 ? COL_AQ : COL_X;

  if (rowData.length > notesColIndex &&
      rowData[notesColIndex] !== undefined &&
      rowData[notesColIndex] !== null &&
      String(rowData[notesColIndex]).trim() !== '') {
    notesValue = String(rowData[notesColIndex]).trim();
  } else {
    var notesStart = useFactory2 ? COL_Y : 0;
    var notesEnd = useFactory2 ? Math.min(COL_Y + QUESTION_COUNT + 5, headers.length) : headers.length;
    for (var c = notesStart; c < notesEnd && c < headers.length; c++) {
      var h = (headers[c] || '').toString().trim();
      if (h === 'الملاحظات الموجودة أثناء المرور' || h.indexOf('ملاحظات') >= 0 || h.toLowerCase() === 'notes') {
        if (rowData[c] !== undefined && rowData[c] !== null && String(rowData[c]).trim() !== '') {
          notesValue = String(rowData[c]).trim();
        }
        break;
      }
    }
  }
  out.notes = notesValue;

  if (!out.date) out.date = formatDateOnly(new Date());

  return out;
}

/**
 * هل يوجد سجل مطابق مسبقاً في DailySafetyCheckList (لتجنب التكرار عند إعادة المعالجة)؟
 */
function dailySafetyFormRecordExists(recordData) {
  if (!recordData) return false;
  var existing = [];
  try {
    existing = typeof readFromSheet === 'function'
      ? readFromSheet('DailySafetyCheckList', APP_SPREADSHEET_ID)
      : [];
  } catch (e) {
    Logger.log('dailySafetyFormRecordExists read error: ' + e.toString());
    return false;
  }
  if (!Array.isArray(existing) || existing.length === 0) return false;

  var date = formatDateOnly(recordData.date);
  var site = String(recordData.siteName || recordData.siteId || '').trim();
  var inspector = String(recordData.inspectorName || '').trim();
  var shift = String(recordData.shift || '').trim();
  var formTs = String(recordData.formSubmittedAt || '').trim();

  for (var i = 0; i < existing.length; i++) {
    var r = existing[i];
    if (!r) continue;
    if (formatDateOnly(r.date) === date &&
        String(r.siteName || r.siteId || '').trim() === site &&
        String(r.inspectorName || '').trim() === inspector &&
        String(r.shift || '').trim() === shift) {
      // مفتاح ثانوي: طابع زمني للإرسال من الفورم.
      // إذا كان موجوداً في السجلين، يجب أن يتطابق حتى نعتبره تكراراً (يميّز تقارير متعددة لنفس اليوم/الموقع/المفتش/الوردية).
      var existingTs = String(r.formSubmittedAt || '').trim();
      if (!formTs || !existingTs || formTs === existingTs) {
        return true;
      }
    }
  }
  return false;
}

/**
 * حفظ سجل من الفورم مع خيار تخطي المكرر
 */
function saveDailySafetyCheckListFromForm(recordData, options) {
  options = options || {};
  if (options.skipDuplicates && dailySafetyFormRecordExists(recordData)) {
    return { success: true, skipped: true, message: 'السجل موجود مسبقاً في DailySafetyCheckList' };
  }
  return saveDailySafetyCheckListToAppSheet(recordData);
}

/**
 * توليد رقم تقرير يومي بصيغة DSC-YYYY-MM-DD-SH-NN (فريد وقابل للفرز الزمني):
 * DD = يوم الشهر (رقمان)، SH = كود الوردية (1/2/3)، NO = ترتيب السجل لنفس اليوم والوردية.
 *
 * @param {string} dateStr - التاريخ بصيغة YYYY-MM-DD
 * @param {string} shift - الوردية (الأولى/الثانية/الثالثة)
 * @param {Array} existingRecords - السجلات الموجودة لحساب أعلى ترتيب
 * @returns {string} رقم التقرير
 */
function generateDailySafetyCheckListReportNumber(dateStr, shift, existingRecords) {
  var parts = dscExtractDateParts(dateStr);
  var shiftMap = { 'الأولى': '1', 'الثانية': '2', 'الثالثة': '3' };
  var sh = shiftMap[shift] || '0';
  var maxNo = 0;
  var list = Array.isArray(existingRecords) ? existingRecords : [];
  var keyDate = parts.y + '-' + parts.m + '-' + parts.d;
  for (var i = 0; i < list.length; i++) {
    var r = list[i];
    if (!r) continue;
    var rParts = dscExtractDateParts(r.date);
    var rKeyDate = rParts.y + '-' + rParts.m + '-' + rParts.d;
    var rSh = shiftMap[r.shift] || '0';
    if (rKeyDate !== keyDate || rSh !== sh) continue;
    var rn = String(r.reportNumber || '').trim();
    var m = rn.match(/^DSC-\d{4}-\d{2}-\d{2}-[1-3]-(\d+)$/);
    var no = m ? parseInt(m[1], 10) : 0;
    if (isNaN(no)) no = 0;
    if (no > maxNo) maxNo = no;
  }
  return 'DSC-' + keyDate + '-' + sh + '-' + String(maxNo + 1).padStart(2, '0');
}

/**
 * استخراج أجزاء التاريخ (سنة/شهر/يوم) من قيمة date
 * (Date object أو نص YYYY-MM-DD أو أي نص يُحلَّل) — بصيغة موحّدة للأرقام.
 * @returns {{y:string, m:string, d:string}}
 */
function dscExtractDateParts(v) {
  var y = '', m = '', d = '';
  var s = String(v || '');
  var iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    return { y: iso[1], m: iso[2], d: iso[3] };
  }
  var dt = new Date(v);
  if (!isNaN(dt.getTime())) {
    y = String(dt.getFullYear());
    m = String(dt.getMonth() + 1).padStart(2, '0');
    d = String(dt.getDate()).padStart(2, '0');
  }
  return { y: y, m: m, d: d };
}

/**
 * حفظ السجل في ورقة DailySafetyCheckList في جدول التطبيق
 */
function saveDailySafetyCheckListToAppSheet(recordData) {
  try {
    if (!recordData) {
      return { success: false, message: 'بيانات السجل غير موجودة' };
    }

    var sheetName = 'DailySafetyCheckList';
    if (!recordData.id) {
      recordData.id = typeof generateSequentialId === 'function'
        ? generateSequentialId('DSC', sheetName, APP_SPREADSHEET_ID)
        : 'DSC-' + Date.now();
    }
    if (!recordData.siteId && recordData.siteName) {
      recordData.siteId = recordData.siteName;
    }
    if (!recordData.createdAt) {
      recordData.createdAt = new Date();
    }
    if (!recordData.updatedAt) {
      recordData.updatedAt = new Date();
    }

    // رقم تقرير تلقائي DSC-YYYY-MM-DD-SH-NN إن لم يُحدّد (منتظر للفورم/الإدخال اليدوي)
    if (!recordData.reportNumber || String(recordData.reportNumber).trim() === '') {
      try {
        var existingList = (typeof readFromSheet === 'function')
          ? readFromSheet(sheetName, APP_SPREADSHEET_ID)
          : [];
        recordData.reportNumber = generateDailySafetyCheckListReportNumber(
          recordData.date, recordData.shift, existingList);
      } catch (e) {
        Logger.log('generate reportNumber fallback: ' + e.toString());
        recordData.reportNumber = '';
      }
    }

    var res = typeof appendToSheet === 'function'
      ? appendToSheet(sheetName, recordData, APP_SPREADSHEET_ID)
      : { success: false, message: 'دالة appendToSheet غير متوفرة' };

    if (res && res.success) {
      try { invalidateHseSheetCaches(sheetName); } catch (e) {}
    }
    return res;
  } catch (error) {
    Logger.log('saveDailySafetyCheckListToAppSheet: ' + error.toString());
    return { success: false, message: 'حدث خطأ: ' + error.toString() };
  }
}

/**
 * إصلاح تسلسل أرقام ومتطلبات DailySafetyCheckList
 * - يصلح المعرفات المكررة (DSC_0655) والمشوهة بمنحها id جديد فريد (DSC_0656)
 * - يضمن أن reportNumber فريد لكل تقرير
 */
function repairDailySafetyCheckListSequence() {
  var lock = null;
  try {
    try {
      lock = LockService.getScriptLock();
      lock.waitLock(30000);
    } catch (e) {}

    var sheetName = 'DailySafetyCheckList';
    try { invalidateHseSheetCaches(sheetName); } catch (e) {}
    
    var spreadsheet = SpreadsheetApp.openById(APP_SPREADSHEET_ID);
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) return { success: false, message: 'الورقة غير موجودة' };

    var values = sheet.getDataRange().getValues();
    if (!values || values.length < 2) {
      return { success: true, message: 'لا توجد صفوف لإصلاحها', data: { fixedCount: 0 } };
    }

    var headers = values[0].map(function(h) { return String(h || '').trim(); });
    var idCol = headers.indexOf('id');
    var reportNoCol = headers.indexOf('reportNumber');
    var siteCol = headers.indexOf('siteName');
    var dateCol = headers.indexOf('date');
    var inspectorCol = headers.indexOf('inspectorName');
    var shiftCol = headers.indexOf('shift');
    var formTsCol = headers.indexOf('formSubmittedAt');

    if (idCol < 0) return { success: false, message: 'عمود id غير موجود' };

    var usedIds = {};
    var usedReportNums = {};
    var maxNum = 0;

    for (var r1 = 1; r1 < values.length; r1++) {
      var curId = String(values[r1][idCol] || '').trim();
      var m = curId.match(/^DSC_(\d+)$/i);
      if (m) {
        var n = parseInt(m[1], 10);
        if (!isNaN(n) && n > maxNum) maxNum = n;
      }
    }

    var nextFreeId = maxNum + 1;
    var fixedCount = 0;
    var seenRecordKeys = {};
    var rowsToDelete = [];

    for (var r2 = 1; r2 < values.length; r2++) {
      var row = values[r2];
      var rId = String(row[idCol] || '').trim();
      var rRepNo = reportNoCol >= 0 ? String(row[reportNoCol] || '').trim() : '';
      var rDate = dateCol >= 0 ? formatDateOnly(row[dateCol]) : '';
      var rSite = siteCol >= 0 ? String(row[siteCol] || '').trim() : '';
      var rInsp = inspectorCol >= 0 ? String(row[inspectorCol] || '').trim() : '';
      var rShift = shiftCol >= 0 ? String(row[shiftCol] || '').trim() : '';
      var rTs = formTsCol >= 0 ? String(row[formTsCol] || '').trim() : '';

      // 1) فحص التكرار التام ونفس طابع الوقت
      var dupKey = rDate + '|' + rSite + '|' + rInsp + '|' + rShift + '|' + rTs;
      if (rDate && rSite && rInsp && seenRecordKeys[dupKey]) {
        rowsToDelete.push(r2 + 1);
        fixedCount++;
        continue;
      }
      seenRecordKeys[dupKey] = true;

      // 2) إصلاح ID المكرر
      var idNum = null;
      var idMatch = rId.match(/^DSC_(\d+)$/i);
      if (idMatch) idNum = parseInt(idMatch[1], 10);

      var needNewId = (!rId || idNum === null || usedIds[rId]);
      if (needNewId) {
        var freshPadded = String(nextFreeId).padStart(4, '0');
        var newId = 'DSC_' + freshPadded;
        nextFreeId++;
        sheet.getRange(r2 + 1, idCol + 1).setValue(newId);
        usedIds[newId] = true;
        fixedCount++;
      } else {
        usedIds[rId] = true;
      }

      // 3) إصلاح reportNumber المكرر
      if (reportNoCol >= 0) {
        var needNewRepNo = (!rRepNo || usedReportNums[rRepNo]);
        if (needNewRepNo) {
          var shiftMap = { 'الأولى': '1', 'الثانية': '2', 'الثالثة': '3' };
          var dp = dscExtractDateParts(rDate);
          var ck = dp.y + '-' + dp.m + '-' + dp.d;
          var sh2 = shiftMap[rShift] || '0';
          var baseRep = 'DSC-' + ck + '-' + sh2 + '-';

          var subNo = 1;
          while (usedReportNums[baseRep + String(subNo).padStart(2, '0')]) {
            subNo++;
          }
          var newRepNo = baseRep + String(subNo).padStart(2, '0');
          sheet.getRange(r2 + 1, reportNoCol + 1).setValue(newRepNo);
          usedReportNums[newRepNo] = true;
          fixedCount++;
        } else {
          usedReportNums[rRepNo] = true;
        }
      }
    }

    // حذف الصفوف المكررة من الأسفل للأعلى
    if (rowsToDelete.length > 0) {
      for (var d = rowsToDelete.length - 1; d >= 0; d--) {
        sheet.deleteRow(rowsToDelete[d]);
      }
    }

    try { invalidateHseSheetCaches(sheetName); } catch (e) {}
    return { success: true, message: 'تم إصلاح أرقام الملاحظات وتصفية التكرارات بنجاح', data: { fixedCount: fixedCount, deletedRows: rowsToDelete.length } };
  } catch (err) {
    Logger.log('repairDailySafetyCheckListSequence error: ' + err.toString());
    return { success: false, message: 'حدث خطأ أثناء الإصلاح: ' + err.toString() };
  } finally {
    if (lock) { try { lock.releaseLock(); } catch (e) {} }
  }
}

/**
 * تُستدعى من المشغّل الزمني (كل دقيقة)
 */
function checkForNewDailySafetyFormSubmissions() {
  try {
    var result = processFormDataFromSheet();
    if (result && result.success) {
      Logger.log('DSC Form: تمت معالجة ' + (result.processedCount || 0) + ' سجل/سجلات');
    } else if (result && result.message) {
      Logger.log('DSC Form: ' + result.message);
    }
  } catch (error) {
    Logger.log('checkForNewDailySafetyFormSubmissions: ' + error.toString());
  }
}

/**
 * إعداد المشغّل الزمني (تشغيل يدوي مرة واحدة)
 */
function setupDailySafetyFormTrigger() {
  try {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === 'checkForNewDailySafetyFormSubmissions') {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
    ScriptApp.newTrigger('checkForNewDailySafetyFormSubmissions')
      .timeBased()
      .everyMinutes(1)
      .create();
    Logger.log('تم إعداد مشغّل الفحص اليومي (كل دقيقة)');
    return { success: true, message: 'تم إعداد المشغّل بنجاح' };
  } catch (error) {
    Logger.log('setupDailySafetyFormTrigger: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * إصلاح ذاتي: يتأكد من وجود مشغّل المزامنة الزمني، ويُثبّته لو ضاع
 * (بعد redeploy/nشر جديد قد تُفقد المشغّلات). يُستدعى من sync والـ trigger نفسه.
 * @returns {boolean}
 */
function ensureDailySafetySyncTrigger_() {
  try {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === 'checkForNewDailySafetyFormSubmissions') {
        return true;
      }
    }
    ScriptApp.newTrigger('checkForNewDailySafetyFormSubmissions')
      .timeBased()
      .everyMinutes(1)
      .create();
    Logger.log('DSC Form: أعيد تثبيت المشغّل الزمني (كان مفقوداً)');
    return true;
  } catch (error) {
    Logger.log('ensureDailySafetySyncTrigger_: ' + error.toString());
    return false;
  }
}

/**
 * تشخيص حالة المزامنة — يشغّله المدير من المحرر أو من Console.
 * يعرض مؤشر آخر صف، آخر صف بالورقة، وجود المشغّل، وعينة تواريخ الورقتين.
 */
function dscDebugSyncStatus() {
  try {
    var out = {};
    try {
      out.lastProcessedRow = parseInt(PropertiesService.getScriptProperties().getProperty(LAST_PROCESSED_ROW_KEY) || '0', 10);
    } catch (e) { out.lastProcessedRow = 'ERR: ' + e.toString(); }

    try {
      var fSheet = getDailySafetyFormResponsesSheet();
      out.formSheetName = fSheet ? fSheet.getName() : '';
      out.formLastRow = fSheet ? fSheet.getLastRow() : -1;
      var tsCol = [];
      if (fSheet) {
        var lastIdx = Math.max(2, out.formLastRow - 3);
        tsCol = fSheet.getRange(lastIdx, 1, out.formLastRow - lastIdx + 1, 1).getValues();
        out.formLastTimestamps = tsCol.map(function(r){ return String(r[0]); });
      }
    } catch (e) { out.formPart = 'ERR: ' + e.toString(); }

try {
      var fl = typeof readFromSheet === 'function'
        ? readFromSheet('DailySafetyCheckList', APP_SPREADSHEET_ID)
        : [];
      out.appArrayCount = Array.isArray(fl) ? fl.length : -1;
      out.appLastDate = '';
      if (Array.isArray(fl) && fl.length) {
        var lastRec = fl[fl.length - 1];
        out.appLastDate = String(lastRec.date || '');
        out.appLastSite = String(lastRec.siteName || lastRec.siteId || '');
      }
    } catch (e) { out.appPart = 'ERR: ' + e.toString(); }

    try {
      var trigs = ScriptApp.getProjectTriggers();
      out.triggerCount = trigs.length;
      out.hasSyncTrigger = trigs.some(function(t){ return t.getHandlerFunction() === 'checkForNewDailySafetyFormSubmissions'; });
    } catch (e) { out.triggerPart = 'ERR: ' + e.toString(); }

    return out;
  } catch (error) {
    return { success: false, message: 'dscDebugSyncStatus: ' + error.toString() };
  }
}

/**
 * فحص التكرار — يحدد ما إذا كانت سجلات DailySafetyCheckList تحوي تكرارات حقيقية
 * (نفس إرسال الفورم محفوظ أكثر من مرة) قبل أي قرار بالمسح.
 *
 * يفحص: سجلات التطبيق (بالمفتاح الكامل date+site+inspector+shift+formSubmittedAt)
 * ومقارنتها بعدد الصفوف الفعلية في ورقة الفورم.
 * لا يُعدّل أي بيانات.
 */
function dscAuditDuplicates() {
  try {
    var out = { success: true };

    // 1) سجلات التطبيق — قراءة خام مباشرة من الورقة (دون تمرير readFromSheet الذي يزيل التكرار)
    try {
      var appSpreadsheet = SpreadsheetApp.openById(APP_SPREADSHEET_ID);
      var appSheet = appSpreadsheet.getSheetByName('DailySafetyCheckList');
      if (appSheet) {
        var appLastRow = appSheet.getLastRow();
        var appLastCol = appSheet.getLastColumn();
        out.appRawRows = appLastRow > 1 ? appLastRow - 1 : 0; // بدون صف الرؤوس
        var appHeaders = appLastRow >= 1 ? appSheet.getRange(1, 1, 1, appLastCol).getValues()[0] : [];
        var idx = {};
        for (var h = 0; h < appHeaders.length; h++) {
          idx[String(appHeaders[h] || '').trim()] = h;
        }
        var appBlock = appLastRow > 1 ? appSheet.getRange(2, 1, appLastRow - 1, appLastCol).getValues() : [];
        var seen = {};
        var seenNoTs = {};
        var dupKeys = [];
        var dupNoTsKeys = [];
        var dupIdCount = 0;
        var dupIdExamples = [];
        var idSeen = {};
        var get = function (row, col) {
          if (col === undefined || col < 0 || !row) return '';
          var v = row[col];
          return (v === undefined || v === null) ? '' : String(v).trim();
        };
        for (var i = 0; i < appBlock.length; i++) {
          var r = appBlock[i];
          var date = formatDateOnly(get(r, idx.date));
          var site = get(r, idx.siteName) || get(r, idx.siteId);
          var inspector = get(r, idx.inspectorName);
          var shift = get(r, idx.shift);
          var ts = get(r, idx.formSubmittedAt);
          var id = get(r, idx.id);
          if (id) {
            if (idSeen[id]) { dupIdCount++; if (dupIdExamples.length < 10) dupIdExamples.push(id); }
            else idSeen[id] = true;
          }
          var key = date + '|' + site + '|' + inspector + '|' + shift + '|' + ts;
          if (ts) {
            if (seen[key]) { dupKeys.push(key); } else { seen[key] = true; }
          } else {
            var legacyKey = date + '|' + site + '|' + inspector + '|' + shift;
            if (seenNoTs[legacyKey]) { dupNoTsKeys.push(legacyKey); } else { seenNoTs[legacyKey] = true; }
          }
        }
        out.appRecords = appBlock.length;
        out.uniqueRecordsWithTimestamp = Object.keys(seen).length;
        out.legacyRecordsWithoutTimestamp = Object.keys(seenNoTs).length;
        out.exactDuplicatesWithTimestamp = dupKeys.length;
        out.possibleDuplicatesLegacy = dupNoTsKeys.length;
        out.duplicateIds = dupIdCount;
        out.duplicateIdExamples = dupIdExamples;
        if (dupKeys.length > 0) {
          out.duplicateExamples = [];
          for (var j = 0; j < dupKeys.length && j < 5; j++) out.duplicateExamples.push(dupKeys[j]);
        }
      } else {
        out.appPart = 'ورقة DailySafetyCheckList غير موجودة';
      }
    } catch (e) { out.appPart = 'ERR: ' + e.toString(); }

    // 2) صفوف الفورم
    try {
      var fSheet = getDailySafetyFormResponsesSheet();
      out.formSheetName = fSheet ? fSheet.getName() : '';
      out.formLastRow = fSheet ? fSheet.getLastRow() : -1;
      if (fSheet) {
        var lastRow = fSheet.getLastRow();
        var numCols = fSheet.getLastColumn();
        if (lastRow >= 2) {
          var headers = fSheet.getRange(1, 1, 1, numCols).getValues()[0];
          var block = fSheet.getRange(2, 1, lastRow - 1, numCols).getValues();
          var dataRows = 0;
          var expectedRecords = 0;
          for (var k = 0; k < block.length; k++) {
            if (countNonEmptyFormCells(block[k]) < 2) continue;
            dataRows++;
            var factories = getFactoriesForFormRow(block[k], headers);
            expectedRecords += factories.length;
          }
          out.formDataRows = dataRows;
          out.expectedRecords = expectedRecords; // سجلات مفترضة = صف لكل مصنع
        }
      }
    } catch (e) { out.formPart = 'ERR: ' + e.toString(); }

    // 3) خلاصة
    out.conclusion = (out.uniqueRecordsWithTimestamp || 0) === 0
      ? 'لا توجد سجلات بطابع زمني — كل السجلات قديمة (مستحيل التمييز الدقيق).'
      : (out.exactDuplicatesWithTimestamp > 0
          ? 'يوجد ' + out.exactDuplicatesWithTimestamp + ' تكراراً مؤكداً (نفس إرسال الفورم أكثر من مرة).'
          : 'لا توجد تكرارات مؤكدة بين السجلات ذات الطابع الزمني.');
    if (out.possibleDuplicatesLegacy > 0) {
      out.conclusion += ' سجلات قديمة قد تبدو مكررة (بلا طابع زمني) لكن قد تكون تقارير مستقلة لنفس اليوم.';
    }
    if (out.expectedRecords && out.appRecords) {
      out.comparison = 'الفورم ينتج ~' + out.expectedRecords + ' سجل، والتطبيق فيه ' + out.appRecords + '.';
    }
    Logger.log('DSC AUDIT: ' + JSON.stringify(out));
    return out;
  } catch (error) {
    return { success: false, message: 'dscAuditDuplicates: ' + error.toString() };
  }
}

/**
 * مسح كامل لجدول DailySafetyCheckList وإعادة المزامنة من الفورم.
 * تحذير: إجراء لا رجعة فيه — يحذف كل السجلات ويعيد استيراد الفورم من الصفر.
 */
function resetDailySafetyCheckListAndResync() {
  try {
    var sheetName = 'DailySafetyCheckList';
    var spreadsheet = SpreadsheetApp.openById(APP_SPREADSHEET_ID);
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: 'ورقة ' + sheetName + ' غير موجودة' };
    }

    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      // الكتابة مكانيًا غير ممكنة هنا لأن reset يعتمد على إعادة إلحاق — نمسح القيم فقط
      sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
    }

    PropertiesService.getScriptProperties().setProperty(LAST_PROCESSED_ROW_KEY, '0');

    var result = processFormDataFromSheet();
    return {
      success: result && result.success !== false,
      message: (result && result.message) || 'اكتملت المزامنة',
      clearedRecords: lastRow - 1,
      processedCount: result && result.processedCount ? result.processedCount : 0,
      result: result
    };
  } catch (error) {
    Logger.log('resetDailySafetyCheckListAndResync: ' + error.toString());
    return { success: false, message: 'حدث خطأ: ' + error.toString() };
  }
}

/**
 * إعادة بناء كامل لجدول DailySafetyCheckList من الفورم دفعة واحدة.
 * أسرع بكثير من المزامنة الصفية (processFormDataFromSheet) — يقرأ كل الفورم
 * مرة واحدة، يحوّل كل الصفوف في الذاكرة، يكتب الورقة دفعة واحدة.
 * يصلح عندما تكون الورقة فارغة/ممسوحة أو بعد تغيير بنية البيانات.
 * لا يعتمد على مؤشر LAST_PROCESSED_ROW — يعيد بناء كل شيء من الصفر.
 *
 * @returns {{success:boolean, message:string, importedCount?:number, skippedEmpty?:number}}
 */
function rebuildDailySafetyCheckListFromForm() {
  try {
    var fSheet = getDailySafetyFormResponsesSheet();
    if (!fSheet) {
      return { success: false, message: 'ورقة إجابات الفورم غير موجودة' };
    }

    var lastRow = fSheet.getLastRow();
    if (lastRow < 2) {
      return { success: false, message: 'لا توجد إرسالات' };
    }

    var numCols = fSheet.getLastColumn();
    var headers = fSheet.getRange(1, 1, 1, numCols).getValues()[0];
    var block = fSheet.getRange(2, 1, lastRow - 1, numCols).getValues();

    var allRecords = [];
    var seenKeys = {};
    var skippedEmpty = 0;

    for (var idx = 0; idx < block.length; idx++) {
      var rowData = block[idx];
      if (countNonEmptyFormCells(rowData) < 2) {
        skippedEmpty++;
        continue;
      }
      var recs = mapFormRowToDailySafetyCheckListRecords(rowData, headers);
      if (!recs || recs.length === 0) continue;
      for (var r = 0; r < recs.length; r++) {
        var rec = recs[r];
        var date = formatDateOnly(rec.date || '');
        var site = String(rec.siteName || rec.siteId || '').trim();
        var inspector = String(rec.inspectorName || '').trim();
        var shift = String(rec.shift || '').trim();
        var ts = String(rec.formSubmittedAt || '').trim();
        var key = date + '|' + site + '|' + inspector + '|' + shift + '|' + ts;
        if (seenKeys[key]) {
          continue;
        }
        seenKeys[key] = true;
        allRecords.push(rec);
      }
    }

    if (allRecords.length === 0) {
      return { success: false, message: 'لا توجد سجلات قابلة للتحويل في الفورم' };
    }

    // توليد معرّفات تسلسلية فريدة محلياً (DSC_0001, DSC_0002, ...) — بلا قراءة الورقة في كل مرة
    var nextNum = 1;
    var shiftMap = { 'الأولى': '1', 'الثانية': '2', 'الثالثة': '3' };
    var shiftCounters = {}; // key = DD-SH → ترتيب السجل لنفس اليوم والوردية
    for (var k = 0; k < allRecords.length; k++) {
      var padded = String(nextNum).padStart(4, '0');
      allRecords[k].id = 'DSC_' + padded;
      if (!allRecords[k].siteId && allRecords[k].siteName) {
        allRecords[k].siteId = allRecords[k].siteName;
      }
      if (!allRecords[k].createdAt) allRecords[k].createdAt = new Date();
      if (!allRecords[k].updatedAt) allRecords[k].updatedAt = new Date();

      // رقم تقرير DSC-YYYY-MM-DD-SH-NN (فريد وقابل للفرز الزمني)
      var dp = dscExtractDateParts(allRecords[k].date);
      var ck = dp.y + '-' + dp.m + '-' + dp.d;
      var sh2 = shiftMap[allRecords[k].shift] || '0';
      var ck2 = ck + '-' + sh2;
      if (!shiftCounters[ck2]) shiftCounters[ck2] = 0;
      shiftCounters[ck2]++;
      allRecords[k].reportNumber = 'DSC-' + ck2 + '-' + String(shiftCounters[ck2]).padStart(2, '0');

      nextNum++;
    }

    var sheetName = 'DailySafetyCheckList';
    var spreadsheet = SpreadsheetApp.openById(APP_SPREADSHEET_ID);
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: 'ورقة ' + sheetName + ' غير موجودة' };
    }

    var headersList = getDefaultHeaders(sheetName);

    var rows = [headersList.slice()];
    for (var m = 0; m < allRecords.length; m++) {
      var recRow = [];
      for (var h = 0; h < headersList.length; h++) {
        var v = allRecords[m][headersList[h]];
        recRow.push(v === undefined || v === null ? '' : v);
      }
      rows.push(recRow);
    }

    // ضبط عمود reportNumber كنص حتى لا يحوّل Google Sheets الأرقام مثل "02-1-1" إلى تواريخ
    var rnColIdx = headersList.indexOf('reportNumber') + 1; // 1-indexed (عمود B)
    if (rnColIdx > 0) {
      var rnColRows = Math.max(rows.length, sheet.getLastRow());
      sheet.getRange(2, rnColIdx, rnColRows, 1).setNumberFormat('@');
    }

    // الكتابة مكانيًا فوق الصفوف الحالية (بدون deleteRows للكل — الورقة فيها صفوف مجمّدة)
    var totalExisting = sheet.getLastRow();
    var BATCH = 100;
    for (var startRow = 0; startRow < rows.length; startRow += BATCH) {
      var endRow = Math.min(startRow + BATCH, rows.length);
      var chunk = rows.slice(startRow, endRow);
      sheet.getRange(startRow + 1, 1, chunk.length, headersList.length).setValues(chunk);
    }

    // حذف الصفوف الزائدة فقط من الأسفل (إن وُجدت) — لا يُحذف كل الصفوف أبدًا
    if (totalExisting > rows.length) {
      var frozenRows = sheet.getFrozenRows();
      var canDelete = totalExisting - rows.length;
      var maxDeletable = totalExisting - frozenRows - 1;
      if (canDelete <= maxDeletable) {
        sheet.deleteRows(rows.length + 1, canDelete);
      }
    }

    try {
      invalidateHseSheetCaches(sheetName);
    } catch (e) {}

    PropertiesService.getScriptProperties().setProperty(LAST_PROCESSED_ROW_KEY, String(lastRow));

    return {
      success: true,
      message: 'تمت إعادة بناء ' + allRecords.length + ' سجل بنجاح',
      importedCount: allRecords.length,
      skippedEmpty: skippedEmpty
    };
  } catch (error) {
    Logger.log('rebuildDailySafetyCheckListFromForm: ' + error.toString());
    return { success: false, message: 'حدث خطأ: ' + error.toString() };
  }
}

/**
 * دالة واحدة تجمع: إعادة بناء كل سجلات DailySafetyCheckList من الفورم
 * (مع توليد أرقام تقارير DSC-YYYY-MM-DD-SH-NN) ثم فحص عمود reportNumber فوراً.
 * النتيجة تُسجَّل في السجل كخطّين: DSC REBUILD: ... ثم DSC DIAG: ...
 */
function dscRebuildAndVerify() {
  var rebuildResult = rebuildDailySafetyCheckListFromForm();
  Logger.log('DSC REBUILD: ' + JSON.stringify(rebuildResult));
  var diagResult = dscDiagnoseReportNumberColumn();

  // تحقق مباشر بعد الكتابة: اقرأ الورقة مرة أخرى واحسب الصيغ + اعرض عينات
  var verify = null;
  try {
    var appSpreadsheet = SpreadsheetApp.openById(APP_SPREADSHEET_ID);
    var appSheet = appSpreadsheet.getSheetByName('DailySafetyCheckList');
    if (appSheet) {
      var lastRow = appSheet.getLastRow();
      var headersV = appSheet.getRange(1, 1, 1, appSheet.getLastColumn()).getValues()[0];
      var rnIdx = headersV.indexOf('reportNumber');
      var block = appSheet.getRange(2, 1, Math.max(lastRow - 1, 0), appSheet.getLastColumn()).getValues();
      var newF = 0, oldF = 0, empt = 0, other = 0, samples = [];
      for (var i = 0; i < block.length; i++) {
        var v = block[i][rnIdx];
        var s = (v === undefined || v === null) ? '' : String(v).trim();
        if (!s) { empt++; continue; }
        if (/^DSC-\d{4}-\d{2}-\d{2}-[1-3]-\d+$/.test(s)) newF++;
        else if (/^\d{1,2}-\d{1,2}-(19|20)\d{2}$/.test(s)) oldF++;
        else { other++; if (samples.length < 5) samples.push(s); }
      }
      verify = {
        spreadsheetId: APP_SPREADSHEET_ID,
        spreadsheetUrl: appSpreadsheet.getUrl(),
        sheetName: appSheet.getSheetName(),
        sheetId: appSheet.getSheetId(),
        frozenRows: appSheet.getFrozenRows(),
        lastRow: lastRow,
        newFormat: newF,
        oldDateLike: oldF,
        empty: empt,
        other: other,
        otherSamples: samples
      };
    }
  } catch (e) {
    verify = { error: e.toString() };
  }
  Logger.log('DSC VERIFY_AFTER_WRITE: ' + JSON.stringify(verify));

  return {
    appSpreadsheetId: APP_SPREADSHEET_ID,
    formSpreadsheetId: FORM_SHEET_ID,
    rebuild: rebuildResult,
    diag: diagResult,
    verifyAfterWrite: verify
  };
}

/**
 * تشخيص عمود reportNumber — يقرأ الورقة مباشرة (خام) ويفحص:
 * 1) عدد السجلات، 2) توزيع صيغ reportNumber (الجديدة DSC-YYYY-MM-DD-SH-NN / القديمة DD-MM-YYYY / فارغة)،
 * 3) عينات أول/آخر 5 سجلات (date + shift + reportNumber + formSubmittedAt).
 * لا يعدّل أي شيء. يشغّله المدير من المحرر.
 */
function dscDiagnoseReportNumberColumn() {
  try {
    var out = { success: true };
    try {
      var appSpreadsheet = SpreadsheetApp.openById(APP_SPREADSHEET_ID);
      var appSheet = appSpreadsheet.getSheetByName('DailySafetyCheckList');
      if (!appSheet) {
        return { success: false, message: 'ورقة DailySafetyCheckList غير موجودة' };
      }
      var lastRow = appSheet.getLastRow();
      var lastCol = appSheet.getLastColumn();
      out.appLastRow = lastRow;
      out.appLastCol = lastCol;
      if (lastRow < 2) {
        out.message = 'لا توجد سجلات';
        Logger.log('DSC DIAG: ' + JSON.stringify(out));
        return out;
      }
      var headers = appSheet.getRange(1, 1, 1, lastCol).getValues()[0];
      var idx = {};
      for (var h = 0; h < headers.length; h++) idx[String(headers[h] || '').trim()] = h;
      out.headerIndexReportNumber = idx.reportNumber;
      out.hasDateCol = idx.date !== undefined;
      out.hasShiftCol = idx.shift !== undefined;
      out.hasFormSubmittedAtCol = idx.formSubmittedAt !== undefined;

      var block = appSheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
      var newFormat = 0, oldDateLike = 0, emptyRn = 0, otherFormat = 0;
      var otherSamples = [];
      var get = function (row, col) {
        if (col === undefined || col < 0 || !row) return '';
        var v = row[col];
        return (v === undefined || v === null) ? '' : String(v).trim();
      };
      for (var i = 0; i < block.length; i++) {
        var r = block[i];
        var rn = get(r, idx.reportNumber);
        if (!rn) {
          emptyRn++;
        } else if (/^DSC-\d{4}-\d{2}-\d{2}-[1-3]-\d+$/.test(rn)) {
          newFormat++;
        } else if (/^\d{1,2}-\d{1,2}-(19|20)\d{2}$/.test(rn)) {
          oldDateLike++;
        } else {
          otherFormat++;
          if (otherSamples.length < 5) otherSamples.push(rn);
        }
      }
      out.reportNumber_NewFormat_DD_SH_NO = newFormat;
      out.reportNumber_OldDateLike_DD_MM_YYYY = oldDateLike;
      out.reportNumber_Empty = emptyRn;
      out.reportNumber_Other = otherFormat;
      out.reportNumber_OtherSamples = otherSamples;

      out.first5 = [];
      out.last5 = [];
      for (var j = 0; j < block.length && j < 5; j++) {
        out.first5.push({
          id: get(block[j], idx.id),
          date: get(block[j], idx.date),
          shift: get(block[j], idx.shift),
          reportNumber: get(block[j], idx.reportNumber),
          formSubmittedAt: get(block[j], idx.formSubmittedAt)
        });
      }
      for (var k = Math.max(0, block.length - 5); k < block.length; k++) {
        out.last5.push({
          id: get(block[k], idx.id),
          date: get(block[k], idx.date),
          shift: get(block[k], idx.shift),
          reportNumber: get(block[k], idx.reportNumber),
          formSubmittedAt: get(block[k], idx.formSubmittedAt)
        });
      }
      out.message = 'تم الفحص: ' + (lastRow - 1) + ' سجل';
    } catch (e) {
      out.readPart = 'ERR: ' + e.toString();
    }
    Logger.log('DSC DIAG: ' + JSON.stringify(out));
    return out;
  } catch (error) {
    return { success: false, message: 'dscDiagnoseReportNumberColumn: ' + error.toString() };
  }
}

/**
 * إصلاح جراحي لعمود reportNumber — يعيد توليد كل الأرقام بصيغة DSC-YYYY-MM-DD-SH-NN
 * ويكتبها كـ نص (تنسيق @) حتى لا يحوّلها Google Sheets إلى تواريخ تلقائيًا.
 * يعالج السجلات القائمة فقط (لا يلمس الفورم ولا يعيد البناء).
 */
function dscFixReportNumberColumn() {
  try {
    var spreadsheet = SpreadsheetApp.openById(APP_SPREADSHEET_ID);
    var sheet = spreadsheet.getSheetByName('DailySafetyCheckList');
    if (!sheet) {
      return { success: false, message: 'ورقة DailySafetyCheckList غير موجودة' };
    }
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow < 2) {
      return { success: false, message: 'لا توجد سجلات' };
    }

    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var idx = {};
    for (var h = 0; h < headers.length; h++) idx[String(headers[h] || '').trim()] = h;
    var dateIdx = idx.date;
    var shiftIdx = idx.shift;
    var rnIdx = idx.reportNumber;
    if (dateIdx === undefined || shiftIdx === undefined || rnIdx === undefined) {
      return { success: false, message: 'الأعمدة المطلوبة (date/shift/reportNumber) غير موجودة' };
    }

    var block = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
    var shiftMap = { 'الأولى': '1', 'الثانية': '2', 'الثالثة': '3' };
    var shiftCounters = {};
    var newValues = [];
    var regenerated = 0;

    for (var i = 0; i < block.length; i++) {
      var r = block[i];
      var dp = dscExtractDateParts(r[dateIdx]);
      var ck = dp.y + '-' + dp.m + '-' + dp.d;
      var sh = shiftMap[String(r[shiftIdx] || '').trim()] || '0';
      var ck2 = ck + '-' + sh;
      if (!shiftCounters[ck2]) shiftCounters[ck2] = 0;
      shiftCounters[ck2]++;
      var newRn = 'DSC-' + ck2 + '-' + String(shiftCounters[ck2]).padStart(2, '0');
      newValues.push([newRn]);
      regenerated++;
    }

    // تنسيق النطاق كنص قبل الكتابة حتى لا يحوّل Sheets القيم إلى تواريخ
    sheet.getRange(2, rnIdx + 1, newValues.length, 1).setNumberFormat('@');
    sheet.getRange(2, rnIdx + 1, newValues.length, 1).setValues(newValues);

    // فحص فوري بعد الكتابة
    var check = sheet.getRange(2, rnIdx + 1, newValues.length, 1).getValues();
    var newFormat = 0, oldDateLike = 0, empty = 0, other = 0, samples = [];
    for (var j = 0; j < check.length; j++) {
      var v = check[j][0];
      var s = (v === undefined || v === null) ? '' : String(v).trim();
      if (!s) { empty++; }
      else if (/^DSC-\d{4}-\d{2}-\d{2}-[1-3]-\d+$/.test(s)) { newFormat++; }
      else if (/^\d{1,2}-\d{1,2}-(19|20)\d{2}$/.test(s)) { oldDateLike++; }
      else { other++; if (samples.length < 5) samples.push(s); }
    }

    var out = {
      success: true,
      regenerated: regenerated,
      verifyAfterWrite: {
        newFormat: newFormat,
        oldDateLike: oldDateLike,
        empty: empty,
        other: other,
        otherSamples: samples
      }
    };
    Logger.log('DSC FIX COLUMN: ' + JSON.stringify(out));
    return out;
  } catch (error) {
    Logger.log('dscFixReportNumberColumn: ' + error.toString());
    return { success: false, message: 'dscFixReportNumberColumn: ' + error.toString() };
  }
}
