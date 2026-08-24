/**
 * ==============================================================================
 * Gate Security & Visitor Management System - Backend Controller
 * الشركة العالمية للانتاج والتصنيع الزراعي (ICAPP)
 * إدارة السلامة والصحة المهنية وتتبع الزوار والمقاولين
 * ==============================================================================
 */

/**
 * تسجيل دخول زائر / مقاول جديد في جدول GateVisitors
 */
function submitGateVisitorCheckIn(payload) {
    try {
        if (!payload || typeof payload !== 'object') {
            return { success: false, message: 'بيانات الزائر غير صالحة' };
        }

        var sheetName = 'GateVisitors';
        var sheet = getOrCreateGateVisitorsSheet(sheetName);
        var recordId = payload.id || ('VIS-' + Utilities.formatDate(new Date(), 'GMT+2', 'yyyyMM') + '-' + Math.floor(1000 + Math.random() * 9000));
        var now = new Date();
        var entryDate = payload.entryDate || Utilities.formatDate(now, 'GMT+2', 'yyyy-MM-dd');
        var entryTime = payload.entryTime || Utilities.formatDate(now, 'GMT+2', 'HH:mm:ss');

        var name = String(payload.name || '').trim();
        var org = String(payload.org || '').trim();
        var idNumber = String(payload.idNumber || '').trim();
        var phone = String(payload.phone || '').trim();
        var vehicle = String(payload.vehicle || 'بدون').trim();
        var site = String(payload.site || '').trim();
        var area = String(payload.area || '').trim();
        var host = String(payload.host || '').trim();
        var purpose = String(payload.purpose || 'زيارة عمل').trim();
        var badge = String(payload.badge || '').trim();

        // رفع التوقيع الرقمي إلى Google Drive إذا وُجد
        var sigUrl = '';
        if (payload.signature && String(payload.signature).length > 50 && typeof uploadFileToDrive === 'function') {
            try {
                var sigFilename = 'Sig_' + recordId + '_' + Date.now() + '.png';
                var uploadRes = uploadFileToDrive(payload.signature, sigFilename, 'image/png', 'GateVisitors');
                if (uploadRes && uploadRes.success) {
                    sigUrl = uploadRes.fileId ? ('https://drive.google.com/uc?export=view&id=' + uploadRes.fileId) : (uploadRes.directLink || '');
                }
            } catch(sigErr) {
                Logger.log('⚠️ تعذر رفع توقيع الزائر: ' + sigErr.toString());
            }
        }

        var rowData = [
            recordId,           // 1. Record ID
            entryDate,          // 2. Entry Date
            entryTime,          // 3. Entry Time
            name,               // 4. Visitor Name
            org,                // 5. Organization / Company
            idNumber,           // 6. National ID / Passport
            phone,              // 7. Phone Number
            vehicle,            // 8. Vehicle Plate
            site,               // 9. Target Site / Factory
            area,               // 10. Target Hall / Area
            host,               // 11. Host Person & Dept
            purpose,            // 12. Visit Purpose
            badge,              // 13. Assigned Badge #
            'بالداخل (Onsite)',  // 14. Status
            '',                 // 15. Exit Time
            0,                  // 16. Duration Minutes
            sigUrl,             // 17. Signature URL
            now.toISOString()   // 18. Created At Timestamp
        ];

        sheet.appendRow(rowData);
        Logger.log('✅ تم تسجيل دخول الزائر بنجاح: ' + recordId + ' - ' + name);

        return {
            success: true,
            id: recordId,
            message: 'تم تسجيل دخول الزائر بنجاح وتوثيقه في السجل السحابي'
        };

    } catch(err) {
        Logger.log('❌ خطأ في submitGateVisitorCheckIn: ' + err.toString());
        return {
            success: false,
            message: 'حدث خطأ أثناء حفظ الزائر في قاعدة البيانات: ' + err.message
        };
    }
}

/**
 * تسجيل خروج الزائر وتحديث السجل وحساب مدة الزيارة
 */
function submitGateVisitorCheckOut(payload) {
    try {
        if (!payload || !payload.id) {
            return { success: false, message: 'معرف الزائر مطلوب لتسجيل الخروج' };
        }

        var sheetName = 'GateVisitors';
        var ss = SpreadsheetApp.getActiveSpreadsheet() || (typeof getSpreadsheetId === 'function' ? SpreadsheetApp.openById(getSpreadsheetId()) : null);
        if (!ss) return { success: false, message: 'تعذر فتح جدول البيانات' };

        var sheet = ss.getSheetByName(sheetName);
        if (!sheet) return { success: false, message: 'جدول الزوار غير موجود' };

        var data = sheet.getDataRange().getValues();
        var targetId = String(payload.id).trim();
        var badge = String(payload.badge || '').trim();
        var foundRow = -1;
        var entryTimestamp = null;

        for (var i = 1; i < data.length; i++) {
            var rowId = String(data[i][0]).trim();
            var rowBadge = String(data[i][12]).trim();
            var rowStatus = String(data[i][13]).trim();

            if ((rowId === targetId || (badge && rowBadge === badge)) && rowStatus.indexOf('بالداخل') !== -1) {
                foundRow = i + 1; // 1-indexed for Sheet
                var entryDateStr = String(data[i][1]).trim();
                var entryTimeStr = String(data[i][2]).trim();
                try {
                    entryTimestamp = new Date(entryDateStr + ' ' + entryTimeStr).getTime();
                } catch(e) {}
                break;
            }
        }

        if (foundRow === -1) {
            return { success: false, message: 'لم يتم العثور على زائر نشط بهذا المعرف أو تم تسجيل خروجه مسبقاً' };
        }

        var now = new Date();
        var exitTime = payload.exitTime || Utilities.formatDate(now, 'GMT+2', 'HH:mm:ss');
        var durationMin = 0;
        if (entryTimestamp) {
            durationMin = Math.round((now.getTime() - entryTimestamp) / 60000);
            if (durationMin < 0) durationMin = 0;
        }

        sheet.getRange(foundRow, 14).setValue('تم الخروج (Checked Out)');
        sheet.getRange(foundRow, 15).setValue(exitTime);
        sheet.getRange(foundRow, 16).setValue(durationMin);

        Logger.log('🚪 تم تسجيل خروج الزائر بنجاح سطر: ' + foundRow + ' - مدة: ' + durationMin + ' دقيقة');

        return {
            success: true,
            message: 'تم تسجيل خروج الزائر بنجاح وتحديث مدة الزيارة (' + durationMin + ' دقيقة)'
        };

    } catch(err) {
        Logger.log('❌ خطأ في submitGateVisitorCheckOut: ' + err.toString());
        return {
            success: false,
            message: 'حدث خطأ أثناء تسجيل الخروج: ' + err.message
        };
    }
}

/**
 * استرجاع قائمة الزوار المتواجدين حالياً بالمصانع
 */
function getActiveGateVisitors(payload) {
    try {
        var sheetName = 'GateVisitors';
        var ss = SpreadsheetApp.getActiveSpreadsheet() || (typeof getSpreadsheetId === 'function' ? SpreadsheetApp.openById(getSpreadsheetId()) : null);
        if (!ss) return { success: true, activeVisitors: [] };

        var sheet = ss.getSheetByName(sheetName);
        if (!sheet) return { success: true, activeVisitors: [] };

        var data = sheet.getDataRange().getValues();
        if (data.length <= 1) return { success: true, activeVisitors: [] };

        var todayStr = Utilities.formatDate(new Date(), 'GMT+2', 'yyyy-MM-dd');
        var activeVisitors = [];

        for (var i = 1; i < data.length; i++) {
            var row = data[i];
            var dateVal = String(row[1]).trim();
            var statusVal = String(row[13]).trim();

            if (statusVal.indexOf('بالداخل') !== -1 && (!row[14] || String(row[14]).trim() === '')) {
                activeVisitors.push({
                    id: String(row[0]),
                    entryDate: String(row[1]),
                    entryTime: String(row[2]),
                    name: String(row[3]),
                    org: String(row[4]),
                    idNumber: String(row[5]),
                    phone: String(row[6]),
                    vehicle: String(row[7]),
                    site: String(row[8]),
                    area: String(row[9]),
                    host: String(row[10]),
                    purpose: String(row[11]),
                    badge: String(row[12]),
                    status: 'بالداخل (Onsite)',
                    signatureUrl: String(row[16] || '')
                });
            }
        }

        return {
            success: true,
            activeCount: activeVisitors.length,
            activeVisitors: activeVisitors
        };

    } catch(err) {
        Logger.log('❌ خطأ في getActiveGateVisitors: ' + err.toString());
        return { success: false, message: err.message, activeVisitors: [] };
    }
}

/**
 * تهيئة وإنشاء شيت GateVisitors مع الترويسة المعتمدة وتنسيق الأعمدة
 */
function getOrCreateGateVisitorsSheet(sheetName) {
    var ss = SpreadsheetApp.getActiveSpreadsheet() || (typeof getSpreadsheetId === 'function' ? SpreadsheetApp.openById(getSpreadsheetId()) : null);
    if (!ss) throw new Error('تعذر الوصول إلى Google Spreadsheet');

    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        var headers = [
            'Record ID',
            'Entry Date',
            'Entry Time',
            'Visitor Name',
            'Organization / Company',
            'National ID / Passport',
            'Phone Number',
            'Vehicle Plate',
            'Target Site',
            'Target Hall / Area',
            'Host Person & Dept',
            'Visit Purpose',
            'Badge #',
            'Status',
            'Exit Time',
            'Duration (Minutes)',
            'Signature URL',
            'Created At Timestamp'
        ];

        sheet.appendRow(headers);
        var headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setBackground('#1e40af');
        headerRange.setFontColor('#ffffff');
        headerRange.setFontWeight('bold');
        headerRange.setHorizontalAlignment('center');
        sheet.setFrozenRows(1);
        Logger.log('✅ تم إنشاء وتهيئة شيت GateVisitors بنجاح');
    }
    return sheet;
}
