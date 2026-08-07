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
  try {
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

  for (var i = 0; i < existing.length; i++) {
    var r = existing[i];
    if (!r) continue;
    if (formatDateOnly(r.date) === date &&
        String(r.siteName || r.siteId || '').trim() === site &&
        String(r.inspectorName || '').trim() === inspector &&
        String(r.shift || '').trim() === shift) {
      return true;
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

    return typeof appendToSheet === 'function'
      ? appendToSheet(sheetName, recordData, APP_SPREADSHEET_ID)
      : { success: false, message: 'دالة appendToSheet غير متوفرة' };
  } catch (error) {
    Logger.log('saveDailySafetyCheckListToAppSheet: ' + error.toString());
    return { success: false, message: 'حدث خطأ: ' + error.toString() };
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
