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
        var rowLength = 19;

        for (var i = 1; i < data.length; i++) {
            var rowId = String(data[i][0]).trim();
            if (rowId === targetId) {
                foundRow = i + 1; // 1-indexed row in sheet
                rowLength = data[i].length;
                entryDateStr = String(data[i][1]).trim();
                entryTimeStr = String(data[i][2]).trim();
                break;
            }
        }

        if (foundRow === -1) {
            return { success: false, message: 'لم يتم العثور على سجل الزائر برقم: ' + targetId };
        }

        // حساب المدة المستغرقة بالدقائق
        var durationMinutes = 0;
        try {
            if (entryDateStr && entryTimeStr) {
                var entryDateTime = new Date(entryDateStr + 'T' + entryTimeStr);
                if (!isNaN(entryDateTime.getTime())) {
                    var diffMs = now.getTime() - entryDateTime.getTime();
                    durationMinutes = Math.max(1, Math.round(diffMs / (1000 * 60)));
                }
            }
        } catch(timeErr) {
            durationMinutes = 0;
        }

        // تحديد موضع أعمدة الحالة والخروج والمدة بذكاء
        var statusCol = 15;
        var exitCol = 16;
        var durationCol = 17;
        
        var targetRow = data[foundRow - 1];
        for (var colIdx = 0; colIdx < targetRow.length; colIdx++) {
            var cellVal = String(targetRow[colIdx] || '');
            if (cellVal.indexOf('بالداخل') !== -1) {
                statusCol = colIdx + 1;
                exitCol = colIdx + 2;
                durationCol = colIdx + 3;
                break;
            }
        }

        sheet.getRange(foundRow, statusCol).setValue('تم الخروج (Departed)');
        sheet.getRange(foundRow, exitCol).setValue(exitTime + ' (' + exitDate + ')');
        sheet.getRange(foundRow, durationCol).setValue(durationMinutes);

        Logger.log('✅ تم تسجيل خروج الزائر بنجاح: ' + targetId + ' - مدة الزيارة: ' + durationMinutes + ' دقيقة');

        return {
            success: true,
            id: targetId,
            exitTime: exitTime,
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
function getActiveGateVisitors(payload) {
    try {
        var sheetName = 'GateVisitors';
        var ss = SpreadsheetApp.getActiveSpreadsheet() || (typeof getSpreadsheetId === 'function' ? SpreadsheetApp.openById(getSpreadsheetId()) : null);
        if (!ss) return { success: true, activeCount: 0, activeVisitors: [] };

        var sheet = ss.getSheetByName(sheetName);
        if (!sheet) return { success: true, activeCount: 0, activeVisitors: [] };

        var data = sheet.getDataRange().getValues();
        if (data.length <= 1) return { success: true, activeCount: 0, activeVisitors: [] };

        var activeVisitors = [];

        for (var i = 1; i < data.length; i++) {
            var row = data[i];
            
            // فحص وجود حالة 'بالداخل' في أي من أعمدة الصف
            var isInside = false;
            var statusColIdx = -1;
            for (var c = 0; c < row.length; c++) {
                var val = String(row[c] || '').trim();
                if (val.indexOf('بالداخل') !== -1) {
                    isInside = true;
                    statusColIdx = c;
                    break;
                }
            }

            // فحص هل تم الخروج
            var exitVal = (statusColIdx !== -1 && statusColIdx + 1 < row.length) ? String(row[statusColIdx + 1] || '').trim() : '';

            if (isInside && (!exitVal || exitVal === '' || exitVal === '0')) {
                activeVisitors.push({
                    id: String(row[0] || ''),
                    entryDate: (row[1] instanceof Date) ? Utilities.formatDate(row[1], 'GMT+2', 'yyyy-MM-dd') : String(row[1] || ''),
                    entryTime: (row[2] instanceof Date) ? Utilities.formatDate(row[2], 'GMT+2', 'HH:mm:ss') : String(row[2] || ''),
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
                    registeredBy: String(statusColIdx === 14 ? row[13] : 'مسؤول الأمن'),
                    status: 'بالداخل (Onsite)',
                    signatureUrl: String(row[row.length - 2] || '')
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

/**
 * استرجاع قائمة مسؤولي الأمن الإداري والقائمين بالتسجيل
 */
function getSecurityOfficersList() {
    try {
        var sheetName = 'SecurityOfficers';
        var ss = SpreadsheetApp.getActiveSpreadsheet() || (typeof getSpreadsheetId === 'function' ? SpreadsheetApp.openById(getSpreadsheetId()) : null);
        if (!ss) return { success: true, officers: getDefaultSecurityOfficers_() };

        var sheet = getOrCreateSecurityOfficersSheet(sheetName);
        var data = sheet.getDataRange().getValues();
        
        if (data.length <= 1) {
            seedDefaultSecurityOfficers_(sheet);
            return { success: true, officers: getDefaultSecurityOfficers_() };
        }

        var officers = [];
        for (var i = 1; i < data.length; i++) {
            var row = data[i];
            var name = String(row[1] || '').trim();
            var isActive = row[5] !== false && String(row[5]).toLowerCase() !== 'false';
            if (name && isActive) {
                officers.push({
                    id: String(row[0] || ('SEC-' + i)),
                    name: name,
                    role: String(row[2] || 'مسؤول أمن إداري'),
                    site: String(row[3] || 'جميع المواقع'),
                    phone: String(row[4] || '')
                });
            }
        }

        return {
            success: true,
            officers: officers.length > 0 ? officers : getDefaultSecurityOfficers_()
        };

    } catch(err) {
        Logger.log('❌ خطأ في getSecurityOfficersList: ' + err.toString());
        return { success: true, officers: getDefaultSecurityOfficers_() };
    }
}

function getDefaultSecurityOfficers_() {
    return [
        { id: 'SEC-01', name: 'أ/ مسعد فرج', role: 'مسؤول أمن إداري', site: 'الموقع العام' },
        { id: 'SEC-02', name: 'أ/ محمود عبد النبي', role: 'مسؤول أمن إداري', site: 'ICAPP-1' },
        { id: 'SEC-03', name: 'أ/ أحمد عبد الحميد', role: 'أمن البوابة الرئيسية', site: 'ICAPP-2' },
        { id: 'SEC-04', name: 'أ/ رجب إبراهيم', role: 'أمن البوابة', site: 'WH' },
        { id: 'SEC-05', name: 'أ/ إبراهيم حسن', role: 'أمن البوابة', site: 'الموقع العام' },
        { id: 'SEC-06', name: 'أ/ أحمد سالم', role: 'مشرف أمن إداري', site: 'ICAPP-1' },
        { id: 'SEC-07', name: 'أ/ طارق فتحي', role: 'مشرف أمن', site: 'ICAPP-2' },
        { id: 'SEC-08', name: 'مسؤول الأمن المناوب (بوابة الدخول)', role: 'أمن مناوب', site: 'جميع المواقع' }
    ];
}

function seedDefaultSecurityOfficers_(sheet) {
    var defs = getDefaultSecurityOfficers_();
    defs.forEach(function(o) {
        sheet.appendRow([
            o.id,
            o.name,
            o.role,
            o.site,
            o.phone || '',
            true,
            new Date().toISOString(),
            new Date().toISOString()
        ]);
    });
}

/**
 * تهيئة وإنشاء شيت SecurityOfficers
 */
function getOrCreateSecurityOfficersSheet(sheetName) {
    var ss = SpreadsheetApp.getActiveSpreadsheet() || (typeof getSpreadsheetId === 'function' ? SpreadsheetApp.openById(getSpreadsheetId()) : null);
    if (!ss) throw new Error('تعذر الوصول إلى Google Spreadsheet');

    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        var headers = [
            'ID',
            'Name',
            'Role',
            'Site',
            'Phone',
            'Is Active',
            'Created At',
            'Updated At'
        ];

        sheet.appendRow(headers);
        var headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setBackground('#047857');
        headerRange.setFontColor('#ffffff');
        headerRange.setFontWeight('bold');
        headerRange.setHorizontalAlignment('center');
        sheet.setFrozenRows(1);
        seedDefaultSecurityOfficers_(sheet);
        Logger.log('✅ تم إنشاء وتهيئة شيت SecurityOfficers بنجاح');
    }
    return sheet;
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
            'Security Officer / Registered By',
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
    } else {
        // إذا كان الشيت موجوداً، تأكد من تحديث الرؤوس إذا كانت أقل من 19 عمود
        var lastCol = sheet.getLastColumn();
        if (lastCol < 19) {
            sheet.getRange(1, 1, 1, 19).setValues([[
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
            ]]);
        }
    }
    return sheet;
}