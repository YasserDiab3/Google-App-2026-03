/**
 * Google Apps Script for HSE System - PTW Module
 * 
 * موديول تصاريح العمل - النسخة المحسنة
 */

/**
 * إضافة تصريح عمل
 */
function addPTWToSheet(ptwData) {
    try {
        if (!ptwData) {
            return { success: false, message: 'بيانات التصريح غير موجودة' };
        }

        const iaReject = validatePtwApproversAgainstIssuingAuthorities_(ptwData);
        if (iaReject && iaReject.valid === false) {
            return { success: false, message: iaReject.message || 'فشل التحقق من معتمدي تصريح العمل وفق قائمة المصرّح لهم.' };
        }

        const sheetName = 'PTW';
        
        // إضافة حقول تلقائية
        if (!ptwData.id) {
            ptwData.id = generateSequentialId('PTW', sheetName);
        }
        if (!ptwData.createdAt) {
            ptwData.createdAt = new Date();
        }
        if (!ptwData.updatedAt) {
            ptwData.updatedAt = new Date();
        }
        if (!ptwData.status) {
            ptwData.status = 'قيد المراجعة';
        }
        
        return appendToSheet(sheetName, ptwData);
    } catch (error) {
        Logger.log('Error in addPTWToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة التصريح: ' + error.toString() };
    }
}

/**
 * تحديث تصريح عمل
 */
function updatePTW(ptwId, updateData) {
    try {
        if (!ptwId) {
            return { success: false, message: 'معرف التصريح غير محدد' };
        }
        
        const sheetName = 'PTW';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const ptwIndex = data.findIndex(ptw => ptw.id === ptwId);
        
        if (ptwIndex === -1) {
            return { success: false, message: 'التصريح غير موجود' };
        }

        const merged = Object.assign({}, data[ptwIndex], updateData || {});
        const iaReject = validatePtwApproversAgainstIssuingAuthorities_(merged);
        if (iaReject && iaReject.valid === false) {
            return { success: false, message: iaReject.message || 'فشل التحقق من معتمدي تصريح العمل وفق قائمة المصرّح لهم.' };
        }

        // تحديث البيانات
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[ptwIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating PTW: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث التصريح: ' + error.toString() };
    }
}

/**
 * الحصول على تصريح عمل محدد
 */
function getPTW(ptwId) {
    try {
        if (!ptwId) {
            return { success: false, message: 'معرف التصريح غير محدد' };
        }
        
        const sheetName = 'PTW';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const ptw = data.find(p => p.id === ptwId);
        
        if (!ptw) {
            return { success: false, message: 'التصريح غير موجود' };
        }
        
        return { success: true, data: ptw };
    } catch (error) {
        Logger.log('Error getting PTW: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة التصريح: ' + error.toString() };
    }
}

/**
 * الحصول على جميع تصاريح العمل
 */
function getAllPTWs(filters = {}) {
    try {
        const sheetName = 'PTW';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.department) {
            data = data.filter(ptw => ptw.department === filters.department);
        }
        if (filters.location) {
            data = data.filter(ptw => ptw.location === filters.location);
        }
        if (filters.workType) {
            data = data.filter(ptw => ptw.workType === filters.workType);
        }
        if (filters.status) {
            data = data.filter(ptw => ptw.status === filters.status);
        }
        if (filters.responsible) {
            data = data.filter(ptw => ptw.responsible === filters.responsible);
        }
        if (filters.startDate) {
            data = data.filter(ptw => {
                if (!ptw.startDate) return false;
                return new Date(ptw.startDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(ptw => {
                if (!ptw.endDate) return false;
                return new Date(ptw.endDate) <= new Date(filters.endDate);
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
        Logger.log('Error getting all PTWs: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة التصاريح: ' + error.toString(), data: [] };
    }
}

/**
 * حذف تصريح عمل
 */
function deletePTW(ptwId, userData) {
    try {
        if (typeof checkAdminPermissions !== 'function' || !checkAdminPermissions(userData || {})) {
            return {
                success: false,
                message: 'ليس لديك صلاحية الحذف. الحذف متاح لمدير النظام فقط.',
                errorCode: 'DELETE_ADMIN_ONLY'
            };
        }
        if (!ptwId) {
            return { success: false, message: 'معرف التصريح غير محدد' };
        }
        
        const sheetName = 'PTW';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(ptw => ptw.id !== ptwId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'التصريح غير موجود' };
        }
        
        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting PTW: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف التصريح: ' + error.toString() };
    }
}

/**
 * الحصول على التصاريح المنتهية أو المستحقة
 */
function getPTWAlerts() {
    try {
        const sheetName = 'PTW';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const now = new Date();
        
        const alerts = {
            expired: [],
            expiringSoon: [],
            pendingApproval: []
        };
        
        data.forEach(ptw => {
            // التصاريح المنتهية
            if (ptw.endDate) {
                const endDate = new Date(ptw.endDate);
                if (endDate < now && ptw.status !== 'منتهي' && ptw.status !== 'مكتمل') {
                    alerts.expired.push(ptw);
                } else if (endDate >= now && endDate <= new Date(now.getTime() + 24 * 60 * 60 * 1000)) {
                    // تنتهي خلال 24 ساعة
                    alerts.expiringSoon.push(ptw);
                }
            }
            
            // التصاريح قيد المراجعة
            if (ptw.status === 'قيد المراجعة' || ptw.status === 'Pending') {
                alerts.pendingApproval.push(ptw);
            }
        });
        
        return { success: true, data: alerts };
    } catch (error) {
        Logger.log('Error getting PTW alerts: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء الحصول على التنبيهات: ' + error.toString() };
    }
}

/**
 * تنظيف السجلات المكررة واليتيمة التي تتجاوز المعرف 1399 من جدول PTWRegistry
 */
function cleanupPtwRegistryDatabase_() {
    var spreadsheetId = getSpreadsheetId();
    var regSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('PTWRegistry');
    
    var regData = readFromSheet('PTWRegistry', spreadsheetId);
    
    var maxValidId = 1399;
    var rowsToKeep = [];
    var headers = regSheet.getDataRange().getValues()[0];
    
    var seenPermitIds = {};
    var seenIds = {};
    
    for (var i = 0; i < regData.length; i++) {
        var row = regData[i];
        if (!row) continue;
        var pid = String(row.permitId || '').trim();
        var id = String(row.id || '').trim();
        
        var pidNum = extractNumericFromPrefixedId_(pid, 'PTW');
        var idNum = extractNumericFromPrefixedId_(id, 'REG');
        
        // 1. استبعاد أي سجل يتجاوز 1399
        if (pidNum !== null && pidNum > maxValidId) continue;
        if (idNum !== null && idNum > maxValidId) continue;
        
        // 2. معالجة التكرار
        var isManual = row.isManualEntry === true || row.isManualEntry === 'true' || row.approvalCircuitOwnerId === '__manual__';
        
        if (isManual) {
            // للتصاريح اليدوية، يجب أن يكون المعرف REG_XXX فريداً
            if (id && seenIds[id]) continue;
            if (id) seenIds[id] = true;
            rowsToKeep.push(row);
        } else {
            // للتصاريح العادية، يجب أن يكون permitId فريداً
            if (pid && seenPermitIds[pid]) continue;
            if (pid) {
                seenPermitIds[pid] = true;
                rowsToKeep.push(row);
            }
        }
    }
    
    Logger.log('PTWRegistry original rows: ' + regData.length);
    Logger.log('PTWRegistry rows to keep: ' + rowsToKeep.length);
    
    regSheet.clearContents();
    
    var outputValues = [headers];
    for (var j = 0; j < rowsToKeep.length; j++) {
        var rowObj = rowsToKeep[j];
        var rowVal = [];
        for (var h = 0; h < headers.length; h++) {
            var val = rowObj[headers[h]];
            rowVal.push(val !== undefined ? val : '');
        }
        outputValues.push(rowVal);
    }
    
    regSheet.getRange(1, 1, outputValues.length, headers.length).setValues(outputValues);
    invalidateHseSheetCaches('PTWRegistry');
    
    return {
        success: true,
        originalCount: regData.length,
        newCount: rowsToKeep.length,
        deletedCount: regData.length - rowsToKeep.length
    };
}


/**
 * ⚡ استرجاع الرادار الحي لتصاريح العمل السارية والميدانية لبوابة النماذج (Live PTW Radar)
 * متاح للاستعلام الخفيف السريع مع كاش لمدة 60 ثانية وحصر المواقع في (ICAPP-1, ICAPP-2, WH)
 */
/**
 * ⚡ استرجاع الرادار الحي لتصاريح العمل السارية والميدانية لبوابة النماذج (Live PTW Radar)
 * يقرأ ويدمج كافة التصاريح النشطة من جدولي (PTWRegistry و PTW) مع كاش 60 ثانية وحصر المواقع في (ICAPP-1, ICAPP-2, WH)
 */
/**
 * ⚡ استرجاع الرادار الحي لتصاريح العمل السارية والميدانية لبوابة النماذج (Live PTW Radar Engine v3)
 * يقرأ ويدمج كافة التصاريح النشطة والمغلقة اليوم من (PTWRegistry و PTW) مع حساب دورة الحياة، أوقات الصلاحية، والتوزيع الجغرافي
 */
function getPublicLivePTWSummary(payload) {
    try {
        var force = payload && (payload.force === true || payload.force === 'true');
        var cacheKey = 'PUBLIC_LIVE_PTW_RADAR_V3';
        var cache = null;
        try {
            cache = CacheService.getScriptCache();
            if (cache && !force) {
                var cachedStr = cache.get(cacheKey);
                if (cachedStr) {
                    var parsed = JSON.parse(cachedStr);
                    parsed.fromCache = true;
                    return parsed;
                }
            }
        } catch(cErr) {}

        var spreadsheetId = getSpreadsheetId();
        var ss = SpreadsheetApp.getActiveSpreadsheet() || (spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : null);
        if (!ss) return { success: false, message: 'Spreadsheet not found' };

        var sheetNames = ['PTWRegistry', 'PTW'];
        var activeList = [];
        var siteCounts = { 'ICAPP-1': 0, 'ICAPP-2': 0, 'WH': 0 };
        var statusCounts = { active: 0, pending: 0, expiringSoon: 0, closedToday: 0 };
        var hotCount = 0;
        var heightCount = 0;
        var confinedCount = 0;
        var electricalCount = 0;
        var coldCount = 0;
        var highRiskCount = 0;
        var seenIds = {};

        var now = new Date();
        var todayStr = Utilities.formatDate(now, 'GMT+2', 'yyyy-MM-dd');
        var currentHours = now.getHours();
        var currentMinutes = now.getMinutes();
        var currentTimeTotalMinutes = (currentHours * 60) + currentMinutes;

        for (var sIdx = 0; sIdx < sheetNames.length; sIdx++) {
            var sName = sheetNames[sIdx];
            var sheet = ss.getSheetByName(sName);
            if (!sheet) continue;

            var lastRow = sheet.getLastRow();
            var lastCol = sheet.getLastColumn();
            if (lastRow <= 1) continue;

            var headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
            var colMap = {};
            for (var h = 0; h < headerRow.length; h++) {
                colMap[String(headerRow[h] || '').trim().toLowerCase()] = h;
            }

            var colId = colMap['permitid'] !== undefined ? colMap['permitid'] : (colMap['id'] !== undefined ? colMap['id'] : 0);
            var colPaper = colMap['paperpermitnumber'] !== undefined ? colMap['paperpermitnumber'] : -1;
            var colDate = colMap['opendate'] !== undefined ? colMap['opendate'] : (colMap['startdate'] !== undefined ? colMap['startdate'] : (colMap['date'] !== undefined ? colMap['date'] : 1));
            var colType = colMap['permittype'] !== undefined ? colMap['permittype'] : (colMap['permittypedisplay'] !== undefined ? colMap['permittypedisplay'] : (colMap['worktype'] !== undefined ? colMap['worktype'] : 4));
            var colLoc = colMap['location'] !== undefined ? colMap['location'] : (colMap['locationid'] !== undefined ? colMap['locationid'] : 8);
            var colSubLoc = colMap['sublocation'] !== undefined ? colMap['sublocation'] : -1;
            var colParty = colMap['requestingparty'] !== undefined ? colMap['requestingparty'] : (colMap['authorizedparty'] !== undefined ? colMap['authorizedparty'] : (colMap['department'] !== undefined ? colMap['department'] : 6));
            var colDesc = colMap['workdescription'] !== undefined ? colMap['workdescription'] : -1;
            var colSupervisor = colMap['supervisor1'] !== undefined ? colMap['supervisor1'] : (colMap['responsible'] !== undefined ? colMap['responsible'] : -1);
            var colTimeFrom = colMap['timefrom'] !== undefined ? colMap['timefrom'] : -1;
            var colTimeTo = colMap['timeto'] !== undefined ? colMap['timeto'] : -1;
            var colStatus = colMap['status'] !== undefined ? colMap['status'] : -1;
            var colClosure = colMap['closuredate'] !== undefined ? colMap['closuredate'] : (colMap['enddate'] !== undefined ? colMap['enddate'] : -1);

            var allValues = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

            for (var i = allValues.length - 1; i >= 0; i--) {
                var row = allValues[i];
                if (!row) continue;

                var pId = String(row[colId] || ('PTW-' + sName + '-' + (i + 1))).trim();
                if (!pId || seenIds[pId]) continue;

                var rawDate = colDate !== -1 ? row[colDate] : null;
                var dtClean = '';
                if (rawDate instanceof Date) {
                    dtClean = Utilities.formatDate(rawDate, 'GMT+2', 'yyyy-MM-dd');
                } else {
                    var ds = String(rawDate || '').trim();
                    dtClean = ds.indexOf('T') !== -1 ? ds.split('T')[0] : ds.split(' ')[0];
                }

                var st = colStatus !== -1 ? String(row[colStatus] || '').trim() : '';
                var closureVal = colClosure !== -1 ? row[colClosure] : null;
                var isClosed = (st === 'مغلق' || st === 'منتهي' || st === 'ملغي' || st === 'Closed' || st === 'Cancelled' || st.indexOf('اكتمل') !== -1 || st.indexOf('مكتمل') !== -1 || st.indexOf('آمن') !== -1 || st.indexOf('جبري') !== -1 || st.indexOf('قسري') !== -1 || st.toLowerCase().indexOf('forced') !== -1 || (closureVal && String(closureVal).trim() !== '' && String(closureVal).trim() !== '-'));
                
                var isClosedToday = (isClosed && dtClean === todayStr);
                var isPending = (st === 'جديد' || st === 'معلق' || st === 'قيد الاعتماد' || st === 'Pending' || st === 'Draft');
                var isActive = (!isClosed && (st === 'مفتوح' || st === 'ساري' || st === 'نشط' || st === 'قيد التنفيذ' || st === 'معتمد' || st === 'Open' || st === 'Active' || st === 'In Progress' || (!isPending && st !== '')));

                if (!isActive && !isPending && !isClosedToday) continue;

                var paperNo = colPaper !== -1 ? String(row[colPaper] || '').trim() : '';
                var pType = colType !== -1 ? String(row[colType] || 'تصريح عمل عام').trim() : 'تصريح عمل عام';
                var rawLoc = colLoc !== -1 ? String(row[colLoc] || '').trim() : '';
                var rawSubLoc = colSubLoc !== -1 ? String(row[colSubLoc] || '').trim() : '';
                var party = colParty !== -1 ? String(row[colParty] || 'مقاول / قسم منفذ').trim() : 'مقاول / قسم منفذ';
                var desc = colDesc !== -1 ? String(row[colDesc] || '').trim() : '';
                var supervisor = colSupervisor !== -1 ? String(row[colSupervisor] || '').trim() : '';
                var tFrom = colTimeFrom !== -1 ? String(row[colTimeFrom] || '08:00').trim() : '08:00';
                var tTo = colTimeTo !== -1 ? String(row[colTimeTo] || '17:00').trim() : '17:00';

                // حصر الموقع في: ICAPP-1, ICAPP-2, WH
                var site = 'ICAPP-1';
                var combinedLoc = (rawLoc + ' ' + rawSubLoc).toUpperCase();
                if (combinedLoc.indexOf('ICAPP-2') !== -1 || combinedLoc.indexOf('مصنع 2') !== -1 || combinedLoc.indexOf('مصنع2') !== -1) {
                    site = 'ICAPP-2';
                } else if (combinedLoc.indexOf('WH') !== -1 || combinedLoc.indexOf('مخازن') !== -1 || combinedLoc.indexOf('مخزن') !== -1) {
                    site = 'WH';
                } else {
                    site = 'ICAPP-1';
                }

                // حساب وقت انتهاء الصلاحية
                var isExpiringSoon = false;
                var minutesRemaining = 999;
                var timeRemainingText = 'ساري طوال الوردية';

                if (tTo && tTo.indexOf(':') !== -1) {
                    var parts = tTo.split(':');
                    var toH = parseInt(parts[0], 10);
                    var toM = parseInt(parts[1], 10) || 0;
                    if (!isNaN(toH)) {
                        var targetTotalMinutes = (toH * 60) + toM;
                        minutesRemaining = targetTotalMinutes - currentTimeTotalMinutes;
                        if (minutesRemaining > 0 && minutesRemaining <= 120) {
                            isExpiringSoon = true;
                            timeRemainingText = 'متبقي ' + minutesRemaining + ' دقيقة';
                        } else if (minutesRemaining <= 0 && isActive) {
                            timeRemainingText = 'منتهي - بانتظار الإغلاق';
                        } else if (minutesRemaining > 120) {
                            var remH = Math.floor(minutesRemaining / 60);
                            var remM = minutesRemaining % 60;
                            timeRemainingText = 'متبقي ' + remH + ' س و ' + remM + ' د';
                        }
                    }
                }

                // تصنيف نوع التصريح والخطورة
                var typeKey = 'general';
                var isHot = (pType.indexOf('ساخن') !== -1 || pType.indexOf('لحام') !== -1 || pType.indexOf('قطع') !== -1 || pType.toLowerCase().indexOf('hot') !== -1);
                var isHeight = (pType.indexOf('ارتفاع') !== -1 || pType.toLowerCase().indexOf('height') !== -1);
                var isConfined = (pType.indexOf('مغلق') !== -1 || pType.toLowerCase().indexOf('confined') !== -1);
                var isElectrical = (pType.indexOf('كهرب') !== -1 || pType.toLowerCase().indexOf('elect') !== -1);

                if (isHot) {
                    hotCount++;
                    highRiskCount++;
                    typeKey = 'hot';
                } else if (isHeight) {
                    heightCount++;
                    highRiskCount++;
                    typeKey = 'height';
                } else if (isConfined) {
                    confinedCount++;
                    highRiskCount++;
                    typeKey = 'confined';
                } else if (isElectrical) {
                    electricalCount++;
                    typeKey = 'electrical';
                } else {
                    coldCount++;
                    typeKey = 'cold';
                }

                var statusKey = 'active';
                if (isClosed) {
                    statusKey = 'closed';
                    statusCounts.closedToday++;
                } else if (isPending) {
                    statusKey = 'pending';
                    statusCounts.pending++;
                } else if (isExpiringSoon) {
                    statusKey = 'expiringSoon';
                    statusCounts.expiringSoon++;
                    statusCounts.active++;
                } else {
                    statusCounts.active++;
                }

                if (!isClosed) {
                    siteCounts[site] = (siteCounts[site] || 0) + 1;
                }

                seenIds[pId] = true;

                if (activeList.length < 75) {
                    activeList.push({
                        id: pId,
                        paperNo: paperNo,
                        type: pType,
                        typeKey: typeKey,
                        site: site,
                        location: (rawLoc || site) + (rawSubLoc ? (' - ' + rawSubLoc) : ''),
                        party: party,
                        description: desc || pType,
                        supervisor: supervisor || 'مشرف السلامة والعمليات',
                        date: dtClean || todayStr,
                        timeFrom: tFrom,
                        timeTo: tTo,
                        status: st || (isClosed ? 'مغلق' : 'ساري'),
                        statusKey: statusKey,
                        isExpiringSoon: isExpiringSoon,
                        minutesRemaining: minutesRemaining,
                        timeRemainingText: timeRemainingText,
                        isHighRisk: (isHot || isHeight || isConfined)
                    });
                }
            }
        }

        var result = {
            success: true,
            summary: {
                activeTotal: statusCounts.active,
                pending: statusCounts.pending,
                expiringSoon: statusCounts.expiringSoon,
                closedToday: statusCounts.closedToday,
                hotWork: hotCount,
                heightWork: heightCount,
                confinedSpace: confinedCount,
                electricalWork: electricalCount,
                coldWork: coldCount,
                highRisk: highRiskCount
            },
            bySite: siteCounts,
            activeList: activeList,
            timestamp: now.toISOString()
        };

        try {
            if (cache) {
                var jsonStr = JSON.stringify(result);
                if (jsonStr.length < 90000) {
                    cache.put(cacheKey, jsonStr, 60);
                }
            }
        } catch(cPutErr) {
            Logger.log('Cache put error in live PTW: ' + cPutErr.toString());
        }

        return result;

    } catch(err) {
        Logger.log('❌ خطأ في getPublicLivePTWSummary: ' + err.toString());
        return { success: false, message: err.message };
    }
}
