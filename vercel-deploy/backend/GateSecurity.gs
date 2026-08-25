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
        var registeredBy = String(payload.registeredBy || payload.securityOfficer || 'مسؤول الأمن').trim();

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
            registeredBy,       // 14. Security Officer / Registered By
            'بالداخل (Onsite)',  // 15. Status
            '',                 // 16. Exit Time
            0,                  // 17. Duration Minutes
            sigUrl,             // 18. Signature URL
            now.toISOString()   // 19. Created At Timestamp
        ];

        sheet.appendRow(rowData);
        Logger.log('✅ تم تسجيل دخول الزائر بنجاح: ' + recordId + ' - ' + name + ' (القائم بالتسجيل: ' + registeredBy + ')');

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
/**
 * تهيئة وتصحيح شيت GateVisitors مع الترويسة المعتمدة وتنسيق الأعمدة (19 عموداً قانونياً)
 */
function getOrCreateGateVisitorsSheet(sheetName) {
    sheetName = sheetName || 'GateVisitors';
    var ss = SpreadsheetApp.getActiveSpreadsheet() || (typeof getSpreadsheetId === 'function' ? SpreadsheetApp.openById(getSpreadsheetId()) : null);
    if (!ss) throw new Error('تعذر الوصول إلى Google Spreadsheet');

    var sheet = ss.getSheetByName(sheetName);
    var canonicalHeaders = [
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
        'Security Officer / Registered By',
        'Status',
        'Exit Time',
        'Duration (Minutes)',
        'Signature URL',
        'Created At Timestamp'
    ];

    if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        sheet.appendRow(canonicalHeaders);
        var headerRange = sheet.getRange(1, 1, 1, canonicalHeaders.length);
        headerRange.setBackground('#1e40af');
        headerRange.setFontColor('#ffffff');
        headerRange.setFontWeight('bold');
        headerRange.setHorizontalAlignment('center');
        sheet.setFrozenRows(1);
        Logger.log('✅ تم إنشاء وتهيئة شيت GateVisitors بنجاح');
    } else {
        // فحص وتصحيح الترويسة وترحيل الأعمدة تلقائياً
        var headerValues = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), canonicalHeaders.length)).getValues()[0];
        var needsHeaderRepair = false;
        if (headerValues.length < 19 || String(headerValues[13] || '').indexOf('Security Officer') === -1) {
            needsHeaderRepair = true;
        }

        if (needsHeaderRepair) {
            sheet.getRange(1, 1, 1, canonicalHeaders.length).setValues([canonicalHeaders]);
            var headerRange = sheet.getRange(1, 1, 1, canonicalHeaders.length);
            headerRange.setBackground('#1e40af');
            headerRange.setFontColor('#ffffff');
            headerRange.setFontWeight('bold');
            headerRange.setHorizontalAlignment('center');
            sheet.setFrozenRows(1);

            // إصلاح الصفوف القديمة التي كانت 18 عموداً
            var dataRange = sheet.getDataRange();
            var allData = dataRange.getValues();
            if (allData.length > 1) {
                var repaired = false;
                for (var r = 1; r < allData.length; r++) {
                    var row = allData[r];
                    // إذا كان العمود 14 به بالداخل أو تم الخروج بدلاً من اسم مسؤول الأمن
                    var val14 = String(row[13] || '');
                    if (val14.indexOf('بالداخل') !== -1 || val14.indexOf('تم الخروج') !== -1) {
                        row.splice(13, 0, 'مسؤول الأمن');
                        repaired = true;
                    }
                    while (row.length < 19) row.push('');
                    if (row.length > 19) row = row.slice(0, 19);
                    allData[r] = row;
                }
                if (repaired) {
                    sheet.getRange(1, 1, allData.length, 19).setValues(allData);
                    Logger.log('✅ تم تصليح ترحيل البيانات وضبط 19 عموداً لجميع الصفوف المسجلة');
                }
            }
        }
    }
    return sheet;
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
        var sheet = getOrCreateGateVisitorsSheet(sheetName);
        var data = sheet.getDataRange().getValues();
        if (data.length <= 1) {
            return { success: false, message: 'لا توجد بيانات مسجلة بالجدول' };
        }

        var targetId = String(payload.id).trim();
        var now = new Date();
        var exitDate = payload.exitDate || Utilities.formatDate(now, 'GMT+2', 'yyyy-MM-dd');
        var exitTime = payload.exitTime || Utilities.formatDate(now, 'GMT+2', 'HH:mm:ss');
        var foundRow = -1;
        var entryDateStr = '';
        var entryTimeStr = '';

        for (var i = 1; i < data.length; i++) {
            var rowId = String(data[i][0] || '').trim();
            if (rowId === targetId || rowId.toLowerCase() === targetId.toLowerCase() || (targetId.indexOf(rowId) !== -1 && rowId.length > 3)) {
                foundRow = i + 1; // 1-indexed row in sheet
                entryDateStr = (data[i][1] instanceof Date) ? Utilities.formatDate(data[i][1], 'GMT+2', 'yyyy-MM-dd') : String(data[i][1] || '').trim();
                entryTimeStr = (data[i][2] instanceof Date) ? Utilities.formatDate(data[i][2], 'GMT+2', 'HH:mm:ss') : String(data[i][2] || '').trim();
                break;
            }
        }

        if (foundRow === -1) {
            Logger.log('⚠️ لم يتم العثور على الزائر برقم: ' + targetId);
            return { success: false, message: 'لم يتم العثور على سجل الزائر برقم: ' + targetId };
        }

        // حساب المدة المستغرقة بالدقائق
        var durationMinutes = 0;
        try {
            if (entryDateStr && entryTimeStr) {
                var cleanTime = entryTimeStr.replace(/[^0-9:]/g, ' ').trim();
                var cleanDate = entryDateStr.replace(/[^0-9-]/g, '').trim();
                var entryDateTime = new Date(cleanDate + 'T' + (cleanTime.length === 5 ? cleanTime + ':00' : cleanTime));
                if (!isNaN(entryDateTime.getTime())) {
                    var diffMs = now.getTime() - entryDateTime.getTime();
                    durationMinutes = Math.max(1, Math.round(diffMs / (1000 * 60)));
                }
            }
        } catch(timeErr) {
            durationMinutes = 0;
        }

        // تحديث الأعمدة القانونية المعتمدة (العمود 15 للحالة، 16 لوقت الخروج، 17 للمدة)
        var statusCol = 15;
        var exitCol = 16;
        var durationCol = 17;

        sheet.getRange(foundRow, statusCol).setValue('تم الخروج (Departed)');
        sheet.getRange(foundRow, exitCol).setValue(exitTime + ' (' + exitDate + ')');
        sheet.getRange(foundRow, durationCol).setValue(durationMinutes);

        Logger.log('✅ تم تسجيل خروج الزائر بنجاح في قاعدة البيانات: ' + targetId + ' - صف: ' + foundRow);

        return {
            success: true,
            id: targetId,
            exitTime: exitTime + ' (' + exitDate + ')',
            durationMinutes: durationMinutes,
            message: 'تم تسجيل خروج الزائر بنجاح وتحديث مدة التواجد (' + durationMinutes + ' دقيقة)'
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

/**
 * استرجاع سجل جميع الزوار والمقاولين (المتواجدين والذين غادروا)
 */
function getAllGateVisitors(payload) {
    try {
        var sheetName = 'GateVisitors';
        var sheet = getOrCreateGateVisitorsSheet(sheetName);
        var data = sheet.getDataRange().getValues();
        if (data.length <= 1) return { success: true, allCount: 0, activeCount: 0, visitors: [] };

        var visitors = [];
        var activeCount = 0;
        var todayStr = Utilities.formatDate(new Date(), 'GMT+2', 'yyyy-MM-dd');
        var todayCount = 0;
        var monthPrefix = todayStr.slice(0, 7);
        var monthCount = 0;

        for (var i = 1; i < data.length; i++) {
            var row = data[i];
            var rowId = String(row[0] || '').trim();
            if (!rowId) continue;

            var statusVal = String(row[14] || row[13] || '').trim();
            var exitVal = String(row[15] || '').trim();

            var isInside = (statusVal.indexOf('بالداخل') !== -1) && (statusVal.indexOf('تم الخروج') === -1);
            var hasNotExited = (!exitVal || exitVal === '' || exitVal === '0' || exitVal === '-');
            var isActive = isInside && hasNotExited;

            var entryD = (row[1] instanceof Date) ? Utilities.formatDate(row[1], 'GMT+2', 'yyyy-MM-dd') : String(row[1] || '').trim();
            var entryT = (row[2] instanceof Date) ? Utilities.formatDate(row[2], 'GMT+2', 'HH:mm:ss') : String(row[2] || '').trim();
            var exitT = (row[15] instanceof Date) ? Utilities.formatDate(row[15], 'GMT+2', 'HH:mm:ss') : String(row[15] || '').trim();

            if (isActive) activeCount++;
            if (entryD === todayStr) todayCount++;
            if (entryD.indexOf(monthPrefix) === 0) monthCount++;

            visitors.push({
                id: rowId,
                entryDate: entryD,
                entryTime: entryT,
                name: String(row[3] || ''),
                org: String(row[4] || ''),
                idNumber: String(row[5] || ''),
                phone: String(row[6] || ''),
                vehicle: String(row[7] || ''),
                site: String(row[8] || ''),
                area: String(row[9] || ''),
                host: String(row[10] || ''),
                purpose: String(row[11] || ''),
                badge: String(row[12] || ''),
                registeredBy: String(row[13] || 'مسؤول الأمن'),
                status: isActive ? 'بالداخل (Onsite)' : (statusVal || 'تم الخروج (Departed)'),
                exitTime: exitT,
                durationMinutes: Number(row[16]) || 0,
                signatureUrl: String(row[17] || '')
            });
        }

        return {
            success: true,
            allCount: visitors.length,
            activeCount: activeCount,
            todayCount: todayCount,
            monthCount: monthCount,
            visitors: visitors
        };

    } catch(err) {
        Logger.log('❌ خطأ في getAllGateVisitors: ' + err.toString());
        return { success: false, message: err.message, allCount: 0, activeCount: 0, visitors: [] };
    }
}

function getActiveGateVisitors(payload) {
    try {
        var sheetName = 'GateVisitors';
        var sheet = getOrCreateGateVisitorsSheet(sheetName);
        var data = sheet.getDataRange().getValues();
        if (data.length <= 1) return { success: true, activeCount: 0, activeVisitors: [] };

        var activeVisitors = [];

        for (var i = 1; i < data.length; i++) {
            var row = data[i];
            var rowId = String(row[0] || '').trim();
            if (!rowId) continue;

            var statusVal = String(row[14] || row[13] || '').trim();
            var exitVal = String(row[15] || '').trim();

            // فحص هل الزائر لا يزال بالداخل
            var isInside = (statusVal.indexOf('بالداخل') !== -1) && (statusVal.indexOf('تم الخروج') === -1);
            var hasNotExited = (!exitVal || exitVal === '' || exitVal === '0' || exitVal === '-');

            if (isInside && hasNotExited) {
                var entryD = (row[1] instanceof Date) ? Utilities.formatDate(row[1], 'GMT+2', 'yyyy-MM-dd') : String(row[1] || '');
                var entryT = (row[2] instanceof Date) ? Utilities.formatDate(row[2], 'GMT+2', 'HH:mm:ss') : String(row[2] || '');

                activeVisitors.push({
                    id: rowId,
                    entryDate: entryD,
                    entryTime: entryT,
                    name: String(row[3] || ''),
                    org: String(row[4] || ''),
                    idNumber: String(row[5] || ''),
                    phone: String(row[6] || ''),
                    vehicle: String(row[7] || ''),
                    site: String(row[8] || ''),
                    area: String(row[9] || ''),
                    host: String(row[10] || ''),
                    purpose: String(row[11] || ''),
                    badge: String(row[12] || ''),
                    registeredBy: String(row[13] || 'مسؤول الأمن'),
                    status: 'بالداخل (Onsite)',
                    signatureUrl: String(row[17] || '')
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
        return { success: false, message: err.message, activeCount: 0, activeVisitors: [] };
    }
}
