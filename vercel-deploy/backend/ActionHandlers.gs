/**
 * ActionHandlers Registry
 */
var ActionHandlers = {
    'saveToSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && payload.sheetName != null && payload.data !== undefined && typeof clampPayloadToDefaultHeaders === 'function') {
                        payload.data = clampPayloadToDefaultHeaders(payload.sheetName, payload.data);
                    }
                    if (typeof validatePayloadForSheetWrite === 'function') {
                        const vr = validatePayloadForSheetWrite(payload.sheetName, payload.data);
                        if (!vr.valid) {
                            if (typeof logSecurityEvent === 'function') {
                                logSecurityEvent('payload_validation_failed', { action: action, reason: vr.message, severity: 'high' });
                            }
                            result = { success: false, message: vr.message, errorCode: 'PAYLOAD_VALIDATION_FAILED' };
                            // // break;
                        }
                    }
                    // المعرف الرسمي من الخادم أولاً (Script Properties / Config) ثم العميل للتطوير فقط
                    spreadsheetId = getSpreadsheetId();
                    if (!spreadsheetId || String(spreadsheetId).trim() === '') {
                        spreadsheetId = payload.spreadsheetId || postData.spreadsheetId || '';
                    }

                    // تنظيف spreadsheetId
                    if (spreadsheetId && typeof spreadsheetId === 'string') {
                        spreadsheetId = spreadsheetId.trim();
                    }

                    Logger.log('saveToSheet called with spreadsheetId: ' + (spreadsheetId ? spreadsheetId.substring(0, 10) + '...' : 'NOT PROVIDED'));

                    // إذا لم يكن spreadsheetId محدد، نستخدم getSpreadsheetId() كـ fallback
                    if (!spreadsheetId || spreadsheetId === '') {
                        spreadsheetId = getSpreadsheetId();
                        Logger.log('Using default spreadsheetId from Config.gs: ' + (spreadsheetId ? spreadsheetId.substring(0, 10) + '...' : 'NOT FOUND'));
                    }

                    if (!spreadsheetId || spreadsheetId.trim() === '') {
                        result = {
                            success: false,
                            message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.'
                        };
                    } else {
                        result = saveToSheet(payload.sheetName, payload.data, spreadsheetId);
                    }
        return result;
    },
    'appendToSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && payload.sheetName != null && payload.data !== undefined && typeof clampPayloadToDefaultHeaders === 'function') {
                        payload.data = clampPayloadToDefaultHeaders(payload.sheetName, payload.data);
                    }
                    if (typeof validatePayloadForSheetWrite === 'function') {
                        const vr = validatePayloadForSheetWrite(payload.sheetName, payload.data);
                        if (!vr.valid) {
                            if (typeof logSecurityEvent === 'function') {
                                logSecurityEvent('payload_validation_failed', { action: action, reason: vr.message, severity: 'high' });
                            }
                            result = { success: false, message: vr.message, errorCode: 'PAYLOAD_VALIDATION_FAILED' };
                            // // break;
                        }
                    }
                    // البحث عن spreadsheetId في عدة أماكن
                    let appendSpreadsheetId = payload.spreadsheetId ||
                                             postData.spreadsheetId ||
                                             getSpreadsheetId();

                    // تنظيف spreadsheetId
                    if (appendSpreadsheetId && typeof appendSpreadsheetId === 'string') {
                        appendSpreadsheetId = appendSpreadsheetId.trim();
                    }

                    Logger.log('appendToSheet called with spreadsheetId: ' + (appendSpreadsheetId ? appendSpreadsheetId.substring(0, 10) + '...' : 'NOT PROVIDED'));

                    // إذا لم يكن spreadsheetId محدد، نستخدم getSpreadsheetId() كـ fallback
                    if (!appendSpreadsheetId || appendSpreadsheetId === '') {
                        appendSpreadsheetId = getSpreadsheetId();
                        Logger.log('Using default spreadsheetId from Config.gs: ' + (appendSpreadsheetId ? appendSpreadsheetId.substring(0, 10) + '...' : 'NOT FOUND'));
                    }

                    if (!appendSpreadsheetId || appendSpreadsheetId.trim() === '') {
                        result = {
                            success: false,
                            message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.'
                        };
                    } else {
                        result = appendToSheet(payload.sheetName, payload.data, appendSpreadsheetId);
                    }
        return result;
    },
    'initializeSheets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        const initSpreadsheetId = payload.spreadsheetId ||
                                             payload.data?.spreadsheetId ||
                                             postData.spreadsheetId ||
                                             getSpreadsheetId();
                    Logger.log('initializeSheets called with spreadsheetId: ' + (initSpreadsheetId ? 'provided' : 'using default'));
                    result = initializeSheets(initSpreadsheetId);
                    // بعد التهيئة، نتأكد من إصلاح رأس ورقة Users
                    if (result && result.success) {
                        try {
                            fixUsersSheetHeaders(initSpreadsheetId || getSpreadsheetId());
                        } catch (fixError) {
                            Logger.log('Warning: Could not fix Users sheet headers: ' + fixError.toString());
                        }
                    }
        return result;
    },
    'readFromSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        const readSheetName = payload.sheetName || (typeof payload === 'string' ? payload : null);
                    const readSpreadsheetId = payload.spreadsheetId ||
                                             postData.spreadsheetId ||
                                             getSpreadsheetId();
                    Logger.log('readFromSheet called with spreadsheetId: ' + (readSpreadsheetId ? readSpreadsheetId.substring(0, 10) + '...' : 'NOT PROVIDED'));
                    if (!readSheetName) {
                        result = { success: false, message: 'Sheet name is required for readFromSheet action' };
                    } else {
                        Logger.log('readFromSheet called with sheetName: ' + readSheetName);
                        var readRaw = readFromSheet(readSheetName, readSpreadsheetId);
                        if (readSheetName === 'DailyObservations' && payload.observationsRequestContext) {
                            readRaw = filterDailyObservationsForRequestContext(readRaw, payload.observationsRequestContext);
                        }
                        result = { success: true, data: readRaw };
                    }
                    // // break;

                // ✅ NEW: Batch read multiple sheets in ONE request
        return result;
    },
    'batchReadSheets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        const sheetNames = payload.sheetNames || [];
                        const batchSpreadsheetId = payload.spreadsheetId ||
                                                   postData.spreadsheetId ||
                                                   getSpreadsheetId();

                        Logger.log('batchReadSheets called with ' + sheetNames.length + ' sheets');

                        if (!Array.isArray(sheetNames) || sheetNames.length === 0) {
                            result = { success: false, message: 'sheetNames array is required for batchReadSheets' };
                        } else {
                            // Limit batch size to prevent timeout
                            const maxBatchSize = 15;
                            if (sheetNames.length > maxBatchSize) {
                                result = {
                                    success: false,
                                    message: 'Batch size too large. Maximum ' + maxBatchSize + ' sheets per request.',
                                    maxBatchSize: maxBatchSize
                                };
                            } else {
                                const batchResults = {};
                                const failedSheets = [];

                                for (let i = 0; i < sheetNames.length; i++) {
                                    const sheetName = sheetNames[i];
                                    try {
                                        // ✅ Use CacheService for frequently-read sheets
                                        const cache = CacheService.getScriptCache();
                                        const cacheKey = 'batch_' + sheetName + '_v1';
                                        const cached = cache.get(cacheKey);

                                        if (cached) {
                                            // Return cached data
                                            batchResults[sheetName] = JSON.parse(cached);
                                            Logger.log('Cache HIT for batch sheet: ' + sheetName);
                                        } else {
                                            // Read from sheet
                                            var sheetData = readFromSheet(sheetName, batchSpreadsheetId);

                                            // Special filtering
                                            if (sheetName === 'DailyObservations' && payload.observationsRequestContext) {
                                                sheetData = filterDailyObservationsForRequestContext(sheetData, payload.observationsRequestContext);
                                            }

                                            batchResults[sheetName] = sheetData;

                                            // ✅ Cache for 3 minutes (180 seconds)
                                            // Only cache if data is not too large (< 100KB)
                                            try {
                                                const dataSize = JSON.stringify(sheetData).length;
                                                if (dataSize < 100000) { // 100KB limit
                                                    cache.put(cacheKey, JSON.stringify(sheetData), 180);
                                                    Logger.log('Cached batch sheet: ' + sheetName + ' (' + dataSize + ' bytes)');
                                                }
                                            } catch (cacheError) {
                                                Logger.log('Cache write failed for ' + sheetName + ': ' + cacheError.toString());
                                            }
                                        }
                                    } catch (sheetError) {
                                        Logger.log('Error reading sheet ' + sheetName + ': ' + sheetError.toString());
                                        failedSheets.push({ sheetName: sheetName, error: sheetError.toString() });
                                        batchResults[sheetName] = null;
                                    }
                                }

                                result = {
                                    success: true,
                                    data: batchResults,
                                    failedSheets: failedSheets,
                                    totalSheets: sheetNames.length,
                                    successfulSheets: sheetNames.length - failedSheets.length
                                };
                            }
                        }
                    } catch (batchError) {
                        Logger.log('batchReadSheets error: ' + batchError.toString());
                        result = { success: false, message: 'Batch read failed: ' + batchError.toString() };
                    }
        return result;
    },
    'testConnection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        // اختبار الاتصال - إجراء بسيط للتحقق من أن الخلفية تعمل
                    Logger.log('testConnection called - testing backend connectivity');
                    result = {
                        success: true,
                        message: 'الاتصال بالخلفية يعمل بنجاح',
                        timestamp: new Date().toISOString(),
                        serverTime: new Date().toISOString()
                    };
        return result;
    },
    'getPublicIP': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        // جلب الـ Public IP عبر الخادم (تجنب CORS/ETP في المتصفح)
                    Logger.log('getPublicIP called');
                    if (typeof getPublicIP === 'function') {
                        result = getPublicIP();
                    } else {
                        result = { success: false, message: 'getPublicIP function is not available on the backend' };
                    }
                    // // break;

                // ============================================
                // إحداثيات المواقع (Map Coordinates)
                // ============================================
        return result;
    },
    'PTW_MAP_COORDINATES': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = saveMapCoordinates(payload);
        return result;
    },
    'saveMapCoordinates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        Logger.log('saveMapCoordinates called');
                    result = saveMapCoordinates(payload);
        return result;
    },
    'getMapCoordinates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        Logger.log('getMapCoordinates called');
                    result = getMapCoordinates();
        return result;
    },
    'PTW_DEFAULT_COORDINATES': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getMapCoordinates();
        return result;
    },
    'saveDefaultCoordinates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        Logger.log('saveDefaultCoordinates called');
                    result = saveDefaultCoordinates(payload);
        return result;
    },
    'getDefaultCoordinates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        Logger.log('getDefaultCoordinates called');
                    result = getDefaultCoordinates();
        return result;
    },
    'initMapCoordinatesTable': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        Logger.log('initMapCoordinatesTable called');
                    result = initMapCoordinatesTable(payload.spreadsheetId || getSpreadsheetId());
                    // // break;

                // ============================================
                // إدارة المستخدمين (Users)
                // ============================================
        return result;
    },
    'addUser': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addUserToSheet(payload);
        return result;
    },
    'updateUser': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateUserInSheet(payload.userId || payload.id, payload.updateData || payload);
        return result;
    },
    'getUsersMeta': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getUsersMeta();
        return result;
    },
    'resetUserPassword': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = resetUserPassword(payload.userId || payload.id || payload.email, payload.newPassword);
        return result;
    },
    'deleteUser': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteUserFromSheet(payload.userId || payload.id, actorUserData);
        return result;
    },
    'fixUsersSheetHeaders': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = fixUsersSheetHeaders(payload.spreadsheetId || postData.spreadsheetId || getSpreadsheetId());
        return result;
    },
    'fixMissingSheetHeaders': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = fixMissingSheetHeaders(payload.spreadsheetId || postData.spreadsheetId || getSpreadsheetId());
                    // // break;

                // ============================================
                // الحوادث والسلامة (Incidents & Safety)
                // ============================================
        return result;
    },
    'addIncident': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addIncidentToSheet(payload);
        return result;
    },
    'updateIncident': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateIncident(payload.incidentId || payload.id, payload.updateData || payload);
        return result;
    },
    'getIncident': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getIncident(payload.incidentId || payload.id);
        return result;
    },
    'getAllIncidents': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllIncidents(payload.filters || {});
        return result;
    },
    'deleteIncident': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteIncident(payload.incidentId || payload.id, payload.userData || {});
        return result;
    },
    'getIncidentStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getIncidentStatistics(payload.filters || {});
        return result;
    },
    'getIncidentAnalysisSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getIncidentAnalysisSettings();
        return result;
    },
    'saveIncidentAnalysisSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = saveIncidentAnalysisSettings(payload);
        return result;
    },
    'addIncidentNotification': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addIncidentNotificationToSheet(payload);
        return result;
    },
    'getAllIncidentNotifications': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllIncidentNotifications(payload.filters || {});
        return result;
    },
    'addSafetyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSafetyAlertToSheet(payload);
        return result;
    },
    'updateSafetyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateSafetyAlert(payload.alertId || payload.id, payload.updateData || payload);
        return result;
    },
    'getSafetyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getSafetyAlert(payload.alertId || payload.id);
        return result;
    },
    'getAllSafetyAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllSafetyAlerts(payload.filters || {});
        return result;
    },
    'deleteSafetyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteSafetyAlert(payload.alertId || payload.id);
        return result;
    },
    'addNearMiss': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addNearMissToSheet(payload);
        return result;
    },
    'updateNearMiss': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateNearMiss(payload.nearMissId || payload.id, payload.updateData || payload);
        return result;
    },
    'getNearMiss': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getNearMiss(payload.nearMissId || payload.id);
        return result;
    },
    'getAllNearMisses': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllNearMisses(payload.filters || {});
        return result;
    },
    'deleteNearMiss': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteNearMiss(payload.nearMissId || payload.id);
        return result;
    },
    'addPTW': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addPTWToSheet(payload);
        return result;
    },
    'updatePTW': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updatePTW(payload.ptwId || payload.id, payload.updateData || payload);
        return result;
    },
    'getPTW': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getPTW(payload.ptwId || payload.id);
        return result;
    },
    'getAllPTWs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPTWs(payload.filters || {});
        return result;
    },
    'deletePTW': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deletePTW(payload.ptwId || payload.id, actorUserData);
        return result;
    },
    'getPTWAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getPTWAlerts();
                    // // break;
                // ============================================
                // Issuing Authorities - المصرح لهم بالتوقيع على تصاريح العمل
                // ============================================
        return result;
    },
    'getAllIssuingAuthorities': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllIssuingAuthorities();
        return result;
    },
    'addIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addIssuingAuthority(payload);
        return result;
    },
    'updateIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateIssuingAuthority(payload.id || payload.recordId, payload);
        return result;
    },
    'deleteIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteIssuingAuthority(payload.id || payload.recordId, payload.userData || payload.user);
        return result;
    },
    'getIssuingAuthoritiesForPermitType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getIssuingAuthoritiesForPermitType(payload.permitType);
        return result;
    },
    'getAllContractorIssuingAuthorities': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllContractorIssuingAuthorities();
        return result;
    },
    'addContractorIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addContractorIssuingAuthority(payload);
        return result;
    },
    'updateContractorIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateContractorIssuingAuthority(payload.id || payload.recordId, payload);
        return result;
    },
    'deleteContractorIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteContractorIssuingAuthority(payload.id || payload.recordId, payload.userData || payload.user);
        return result;
    },
    'getContractorIssuingAuthoritiesForPermitType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getContractorIssuingAuthoritiesForPermitType(payload.permitType);
        return result;
    },
    'getEmployeeByCode': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getEmployeeByCode(payload.employeeCode || payload.code);
        return result;
    },
    'initIssuingAuthoritiesTable': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = initIssuingAuthoritiesTable();
        return result;
    },
    'addViolation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addViolationToSheet(payload);
        return result;
    },
    'deleteViolationFromSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteViolationFromSheet(payload.id);
                    // // break;

                // ============================================
                // التدريب (Training)
                // ============================================
        return result;
    },
    'addTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addTrainingToSheet(payload);
        return result;
    },
    'updateTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateTraining(payload.trainingId || payload.id, payload.updateData || payload);
        return result;
    },
    'getTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getTraining(payload.trainingId || payload.id);
        return result;
    },
    'getAllTrainings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllTrainings(payload.filters || {});
        return result;
    },
    'deleteTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteTraining(payload.trainingId || payload.id);
        return result;
    },
    'getTrainingStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getTrainingStatistics(payload.filters || {});
        return result;
    },
    'addEmployeeTrainingMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addEmployeeTrainingMatrixToSheet(payload);
        return result;
    },
    'updateEmployeeTrainingMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateEmployeeTrainingMatrix(payload.employeeId || payload.id, payload.updateData || payload);
        return result;
    },
    'getEmployeeTrainingMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getEmployeeTrainingMatrix(payload.employeeId || payload.id);
        return result;
    },
    'addContractorTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addContractorTrainingToSheet(payload);
        return result;
    },
    'addAnnualTrainingPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addAnnualTrainingPlanToSheet(payload);
        return result;
    },
    'getAllTrainingSessions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllTrainingSessions(payload.filters || {});
        return result;
    },
    'getAllTrainingCertificates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllTrainingCertificates(payload.filters || {});
        return result;
    },
    'getAllTrainingAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllTrainingAttendance(payload.filters || {});
        return result;
    },
    'getAllContractorTrainings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllContractorTrainings(payload.filters || {});
        return result;
    },
    'getTrainingModuleBundle': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getTrainingModuleBundle(payload || {});
                    // // break;

                // ============================================
                // العيادة الطبية (Clinic)
                // ============================================
        return result;
    },

































    'addEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addEmployeeToSheet(payload);
        return result;
    },
    'updateEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateEmployee(payload.employeeId || payload.id, payload.updateData || payload);
        return result;
    },
    'getEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getEmployee(payload.employeeId || payload.id);
        return result;
    },
    'getAllEmployees': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllEmployees(payload.filters || {});
        return result;
    },
    'deactivateEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deactivateEmployee(payload.employeeId || payload.id);
        return result;
    },
    'deleteEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteEmployee(payload.employeeId || payload.id);
        return result;
    },
    'deleteAllEmployees': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteAllEmployees(payload);
        return result;
    },
    'getEmployeeStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getEmployeeStatistics(payload.filters || {});
        return result;
    },
    'getOrCreatePublicProfileToken': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getOrCreatePublicProfileToken(payload || {});
        return result;
    },
    'getAllAppEmergencyNumbers': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllAppEmergencyNumbers();
        return result;
    },
    'upsertAppEmergencyNumber': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = upsertAppEmergencyNumber(payload || {});
        return result;
    },
    'deleteAppEmergencyNumber': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteAppEmergencyNumber(payload || {});
        return result;
    },
    'addApprovedContractor': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addApprovedContractorToSheet(payload);
        return result;
    },
    'updateApprovedContractor': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateApprovedContractor(payload.approvedContractorId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllApprovedContractors': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllApprovedContractors(payload.filters || {});
        return result;
    },
    'deleteApprovedContractor': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteApprovedContractor(payload.approvedContractorId || payload.id, actorUserData);
        return result;
    },
    'addContractorEvaluation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addContractorEvaluationToSheet(payload);
        return result;
    },
    'updateContractorEvaluation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateContractorEvaluation(payload.evaluationId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllContractorEvaluations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllContractorEvaluations(payload.filters || {});
        return result;
    },
    'getContractorEvaluations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getContractorEvaluations(payload.contractorId || payload.id);
        return result;
    },
    'getContractorDetailedAnalytics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getContractorDetailedAnalytics(payload);
                    // // break;

                // طلبات اعتماد المقاولين
        return result;
    },
    'addContractorApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addContractorApprovalRequest(payload);
        return result;
    },
    'updateContractorApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateContractorApprovalRequest(payload.requestId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllContractorApprovalRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllContractorApprovalRequests(payload.filters || {});
        return result;
    },
    'approveContractorApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = approveContractorApprovalRequest(payload.requestId || payload.id, payload.userData || payload);
        return result;
    },
    'rejectContractorApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = rejectContractorApprovalRequest(payload.requestId || payload.id, payload.rejectionReason || '', payload.userData || payload);
                    // // break;

                // طلبات حذف المقاولين
        return result;
    },
    'addContractorDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addContractorDeletionRequest(payload);
        return result;
    },
    'updateContractorDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateContractorDeletionRequest(payload.requestId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllContractorDeletionRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllContractorDeletionRequests(payload.filters || {});
        return result;
    },
    'approveContractorDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = approveContractorDeletionRequest(payload.requestId || payload.id, payload.userData || payload);
        return result;
    },
    'rejectContractorDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = rejectContractorDeletionRequest(payload.requestId || payload.id, payload.rejectionReason || '', payload.userData || payload);
                    // // break;

                // ============================================
                // السلامة العامة (Safety)
                // ============================================
        return result;
    },
    'addBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addBehaviorToSheet(payload);
        return result;
    },
    'updateBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateBehavior(payload.behaviorId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllBehaviors': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllBehaviors(payload.filters || {});
        return result;
    },
    'getBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getBehavior(payload.behaviorId || payload.id);
        return result;
    },
    'deleteBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteBehavior(payload.behaviorId || payload.id);
        return result;
    },
    'addContractorBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addContractorBehaviorToSheet(payload);
        return result;
    },
    'updateContractorBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateContractorBehavior(payload.behaviorId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllContractorBehaviors': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllContractorBehaviors(payload.filters || {});
        return result;
    },
    'getContractorBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getContractorBehavior(payload.behaviorId || payload.id);
        return result;
    },
    'deleteContractorBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteContractorBehavior(payload.behaviorId || payload.id);
        return result;
    },
    'addChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addChemicalSafetyToSheet(payload);
        return result;
    },
    'updateChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateChemicalSafety(payload.chemicalId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllChemicalSafety(payload.filters || {});
        return result;
    },
    'getChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getChemicalSafety(payload.chemicalId || payload.id);
        return result;
    },
    'deleteChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteChemicalSafety(payload.chemicalId || payload.id);
        return result;
    },
    'addObservation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addObservationToSheet(payload);
        return result;
    },
    'updateObservation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateObservation(payload.observationId || payload.id, payload.updateData || payload);
        return result;
    },
    'getObservation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getObservation(payload.observationId || payload.id);
                    if (result && result.success && result.data && payload.observationsRequestContext) {
                        var _gof = filterDailyObservationsForRequestContext([result.data], payload.observationsRequestContext);
                        if (_gof.length === 0) {
                            result = { success: false, message: 'غير مصرح بعرض هذه الملاحظة' };
                        }
                    }
        return result;
    },
    'transitionObservationWorkflow': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = transitionObservationWorkflow(payload);
        return result;
    },
    'notifyObservationWorkflowEvent': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = notifyObservationWorkflowEvent(payload);
        return result;
    },
    'getAllObservations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllObservations(payload.filters || {});
        return result;
    },
    'deleteObservation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteObservation(payload.observationId || payload.id);
        return result;
    },
    'deleteAllObservations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteAllObservations();
        return result;
    },
    'getObservationStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getObservationStatistics(payload.filters || {});
        return result;
    },
    'addObservationComment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addObservationComment(
                        payload.observationId || payload.id || payload.data?.observationId,
                        payload.commentData || payload.data?.commentData || payload.data || payload
                    );
        return result;
    },
    'addObservationUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addObservationUpdate(
                        payload.observationId || payload.id || payload.data?.observationId,
                        payload.updateData || payload.data?.updateData || payload.data || payload
                    );
        return result;
    },
    'updateObservationStatus': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateObservationStatus(
                        payload.observationId || payload.id || payload.data?.observationId,
                        payload.statusData || payload.data?.statusData || payload.data || payload
                    );
        return result;
    },
    'exportDailyObservationsPptReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = exportDailyObservationsPptReport(payload);
        return result;
    },
    'setDailyObservationsPptTemplateId': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = setDailyObservationsPptTemplateId(payload.templateId || payload.templateID || payload);
        return result;
    },
    'getDailyObservationsPptTemplateId': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getDailyObservationsPptTemplateId();
        return result;
    },
    'addObservationSite': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addObservationSiteToSheet(payload);
                    // // break;

                // ============================================
                // ISO والجودة (ISO & Quality)
                // ============================================
        return result;
    },
    'addISODocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addISODocumentToSheet(payload);
        return result;
    },
    'updateISODocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateISODocument(payload.documentId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllISODocuments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllISODocuments(payload.filters || {});
        return result;
    },
    'addISOProcedure': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addISOProcedureToSheet(payload);
        return result;
    },
    'updateISOProcedure': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateISOProcedure(payload.procedureId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllISOProcedures': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllISOProcedures(payload.filters || {});
        return result;
    },
    'addISOForm': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addISOFormToSheet(payload);
        return result;
    },
    'updateISOForm': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateISOForm(payload.formId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllISOForms': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllISOForms(payload.filters || {});
        return result;
    },
    'addSOPJHA': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSOPJHAToSheet(payload);
        return result;
    },
    'updateSOPJHA': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateSOPJHA(payload.sopId || payload.id, payload.updateData || payload);
        return result;
    },
    'getSOPJHA': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getSOPJHA(payload.sopId || payload.id);
        return result;
    },
    'getAllSOPJHAs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllSOPJHAs(payload.filters || {});
        return result;
    },
    'deleteSOPJHA': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteSOPJHA(payload.sopId || payload.id);
        return result;
    },
    'getDocumentCodes': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getDocumentCodes(payload || {});
        return result;
    },
    'addDocumentCode': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = (typeof addDocumentCode === 'function' ? addDocumentCode : addDocumentCodeToSheet)(postData.data || payload);
        return result;
    },
    'updateDocumentCode': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateDocumentCode((postData.data || payload).id, (postData.data || payload));
        return result;
    },
    'deleteDocumentCode': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteDocumentCode((postData.data || payload).id);
        return result;
    },
    'getDocumentVersions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getDocumentVersions(payload || {});
        return result;
    },
    'addDocumentVersion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addDocumentVersionToSheet(postData.data || payload);
        return result;
    },
    'updateDocumentVersion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateDocumentVersion((postData.data || payload).id, (postData.data || payload));
        return result;
    },
    'getDocumentCodeAndVersion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getDocumentCodeAndVersion(payload || {});
        return result;
    },
    'addRiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addRiskAssessmentToSheet(payload);
        return result;
    },
    'updateRiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateRiskAssessment(payload.riskId || payload.id, payload.updateData || payload);
        return result;
    },
    'getRiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getRiskAssessment(payload.riskId || payload.id);
        return result;
    },
    'getAllRiskAssessments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllRiskAssessments(payload.filters || {});
        return result;
    },
    'deleteRiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteRiskAssessment(payload.riskId || payload.id);
        return result;
    },
    'addLegalDocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addLegalDocumentToSheet(payload);
        return result;
    },
    'updateLegalDocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateLegalDocument(payload.documentId || payload.id, payload.updateData || payload);
        return result;
    },
    'getLegalDocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getLegalDocument(payload.documentId || payload.id);
        return result;
    },
    'getAllLegalDocuments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllLegalDocuments(payload.filters || {});
        return result;
    },
    'deleteLegalDocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteLegalDocument(payload.documentId || payload.id);
        return result;
    },
    'getLegalDocumentAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getLegalDocumentAlerts();
                    // // break;

                // ============================================
                // HSE الشامل (HSE Modules)
                // ============================================
        return result;
    },
    'addHSEAudit': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addHSEAuditToSheet(payload);
        return result;
    },
    'updateHSEAudit': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateHSEAudit(payload.auditId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllHSEAudits': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllHSEAudits(payload.filters || {});
        return result;
    },
    'addHSENonConformity': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addHSENonConformityToSheet(payload);
        return result;
    },
    'updateHSENonConformity': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateHSENonConformity(payload.nonConformityId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllHSENonConformities': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllHSENonConformities(payload.filters || {});
        return result;
    },
    'addHSECorrectiveAction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addHSECorrectiveActionToSheet(payload);
        return result;
    },
    'updateHSECorrectiveAction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateHSECorrectiveAction(payload.actionId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllHSECorrectiveActions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllHSECorrectiveActions(payload.filters || {});
        return result;
    },
    'addHSEObjective': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addHSEObjectiveToSheet(payload);
        return result;
    },
    'updateHSEObjective': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateHSEObjective(payload.objectiveId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllHSEObjectives': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllHSEObjectives(payload.filters || {});
        return result;
    },
    'addHSERiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addHSERiskAssessmentToSheet(payload);
        return result;
    },
    'updateHSERiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateHSERiskAssessment(payload.riskId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllHSERiskAssessments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllHSERiskAssessments(payload.filters || {});
                    // // break;

                // ============================================
                // البيئة (Environmental)
                // ============================================
        return result;
    },
    'addEnvironmentalAspect': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addEnvironmentalAspectToSheet(payload);
        return result;
    },
    'addEnvironmentalMonitoring': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addEnvironmentalMonitoringToSheet(payload);
        return result;
    },
    'addSustainability': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSustainabilityToSheet(payload);
        return result;
    },
    'addCarbonFootprint': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addCarbonFootprintToSheet(payload);
        return result;
    },
    'addWasteManagement': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addWasteManagementToSheet(payload);
        return result;
    },
    'addEnergyEfficiency': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addEnergyEfficiencyToSheet(payload);
        return result;
    },
    'addWaterManagement': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addWaterManagementToSheet(payload);
        return result;
    },
    'addRecyclingProgram': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addRecyclingProgramToSheet(payload);
                    // // break;

                // ============================================
                // المعدات والفحوصات (Equipment & Inspections)
                // ============================================
        return result;
    },
    'addFireEquipment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addFireEquipmentToSheet(payload);
        return result;
    },
    'updateFireEquipment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateFireEquipment(payload.equipmentId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllFireEquipment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllFireEquipment(payload.filters || {});
        return result;
    },
    'addFireEquipmentAsset': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addFireEquipmentAssetToSheet(payload);
        return result;
    },
    'updateFireEquipmentAsset': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateFireEquipmentAsset(payload.assetId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllFireEquipmentAssets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllFireEquipmentAssets(payload.filters || {});
        return result;
    },
    'deleteFireEquipment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteFireEquipmentAsset(payload.assetId || payload.id);
        return result;
    },
    'addFireEquipmentInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addFireEquipmentInspectionToSheet(payload);
        return result;
    },
    'updateFireEquipmentInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateFireEquipmentInspection(payload.inspectionId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllFireEquipmentInspections': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllFireEquipmentInspections(payload.filters || {});
        return result;
    },
    'getFireEquipmentInspectionAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getFireEquipmentInspectionAlerts();
        return result;
    },
    'saveOrUpdateFireEquipmentAsset': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = saveOrUpdateFireEquipmentAsset(payload);
        return result;
    },
    'addFireEquipmentApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addFireEquipmentApprovalRequest(payload);
        return result;
    },
    'updateFireEquipmentApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateFireEquipmentApprovalRequest(payload.requestId || payload.id, payload.updateData || payload);
        return result;
    },
    'getFireEquipmentApprovalRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getFireEquipmentApprovalRequests(payload.filters || {});
        return result;
    },
    'deleteFireEquipmentApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteFireEquipmentApprovalRequest(payload.requestId || payload.id);
        return result;
    },
    'addPPE': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addPPEToSheet(payload);
        return result;
    },
    'updatePPE': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updatePPE(payload.ppeId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllPPE': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPPE(payload.filters || {});
        return result;
    },
    'deletePPE': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deletePPE(payload.ppeId || payload.id || payload);
        return result;
    },
    'addPPEMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addPPEMatrixToSheet(payload);
        return result;
    },
    'updatePPEMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updatePPEMatrix(payload.employeeId || payload.id, payload.updateData || payload);
        return result;
    },
    'getPPEMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getPPEMatrix(payload.employeeId || payload.id);
        return result;
    },
    'getAllPPEMatrices': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPPEMatrices(payload.filters || {});
        return result;
    },
    'getAllPPEStockItems': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPPEStockItems(payload.filters || {});
        return result;
    },
    'addOrUpdatePPEStockItem': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addOrUpdatePPEStockItem(payload);
        return result;
    },
    'addPPETransaction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addPPETransaction(payload);
        return result;
    },
    'getAllPPETransactions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPPETransactions(payload.filters || {});
        return result;
    },
    'getPPEItemsList': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getPPEItemsList();
        return result;
    },
    'deletePPEStockItem': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deletePPEStockItem(payload.itemId || payload);
        return result;
    },
    'getLowStockItems': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getLowStockItems();
        return result;
    },
    'addPeriodicInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addPeriodicInspectionToSheet(payload);
        return result;
    },
    'updatePeriodicInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updatePeriodicInspection(payload.inspectionId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllPeriodicInspections': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPeriodicInspections(payload.filters || {});
        return result;
    },
    'addPeriodicInspectionCategory': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addPeriodicInspectionCategoryToSheet(payload);
        return result;
    },
    'updatePeriodicInspectionCategory': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updatePeriodicInspectionCategory(payload.categoryId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllPeriodicInspectionCategories': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPeriodicInspectionCategories();
        return result;
    },
    'addPeriodicInspectionChecklist': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addPeriodicInspectionChecklistToSheet(payload);
        return result;
    },
    'updatePeriodicInspectionChecklist': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updatePeriodicInspectionChecklist(payload.checklistId || payload.id, payload.updateData || payload);
        return result;
    },
    'getPeriodicInspectionChecklist': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getPeriodicInspectionChecklist(payload.checklistId || payload.id);
        return result;
    },
    'getChecklistsByCategory': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getChecklistsByCategory(payload.categoryId || payload.id);
        return result;
    },
    'addPeriodicInspectionSchedule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addPeriodicInspectionScheduleToSheet(payload);
        return result;
    },
    'updatePeriodicInspectionSchedule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updatePeriodicInspectionSchedule(payload.scheduleId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllPeriodicInspectionSchedules': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPeriodicInspectionSchedules(payload.filters || {});
        return result;
    },
    'addPeriodicInspectionRecord': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addPeriodicInspectionRecordToSheet(payload);
        return result;
    },
    'updatePeriodicInspectionRecord': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updatePeriodicInspectionRecord(payload.recordId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllPeriodicInspectionRecords': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPeriodicInspectionRecords(payload.filters || {});
        return result;
    },
    'getPeriodicInspectionAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getPeriodicInspectionAlerts();
        return result;
    },
    'addViolationType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addViolationTypeToSheet(payload);
                    // // break;

                // ============================================
                // الميزانية ومؤشرات الأداء (Budget & KPIs)
                // ============================================
        return result;
    },
    'addBudget': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addBudgetToSheet(payload);
        return result;
    },
    'addSafetyBudget': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addBudgetToSheet(payload);
        return result;
    },
    'updateBudget': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateBudget(payload.budgetId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllBudgets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllBudgets(payload.filters || {});
        return result;
    },
    'addSafetyBudgets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSafetyBudgetsToSheet(payload);
        return result;
    },
    'updateSafetyBudget': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateSafetyBudget(payload.budgetId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllSafetyBudgets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllSafetyBudgets(payload.filters || {});
        return result;
    },
    'addSafetyBudgetTransaction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSafetyBudgetTransactionToSheet(payload);
        return result;
    },
    'updateSafetyBudgetTransaction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateSafetyBudgetTransaction(payload.transactionId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllSafetyBudgetTransactions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllSafetyBudgetTransactions(payload.filters || {});
        return result;
    },
    'getBudgetStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getBudgetStatistics(payload.filters || {});
        return result;
    },
    'addKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };

        return result;
    },
    'addSafetyPerformanceKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addKPIToSheet(payload);
        return result;
    },
    'updateKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateKPI(payload.kpiId || payload.id, payload.updateData || payload);
        return result;
    },
    'getKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getKPI(payload.kpiId || payload.id);
        return result;
    },
    'getAllKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllKPIs(payload.filters || {});
        return result;
    },
    'deleteKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteKPI(payload.kpiId || payload.id);
                    // // break;

                // ============================================
                // KPI Annual Plans (الخطط السنوية لمؤشرات الأداء)
                // ============================================
        return result;
    },
    'getKPIAnnualPlans': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getKPIAnnualPlans(payload.filters || {});
        return result;
    },
    'saveKPIAnnualPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = saveKPIAnnualPlan(payload);
        return result;
    },
    'deleteKPIAnnualPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteKPIAnnualPlan(payload.planId || payload.id);
                    // // break;

                // ============================================
                // HSE Monitoring Plans (خطط متابعة HSE)
                // ============================================
        return result;
    },
    'getHSEMonitoringPlans': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getHSEMonitoringPlans(payload.filters || {});
        return result;
    },
    'saveHSEMonitoringPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = saveHSEMonitoringPlan(payload);
        return result;
    },
    'deleteHSEMonitoringPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteHSEMonitoringPlan(payload.planId || payload.id);
        return result;
    },
    'updateHSEMonitoringMonthlyExecution': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateHSEMonitoringMonthlyExecution(payload.planId || payload.id, payload.monthData || payload);
                    // // break;

                // ============================================
                // متابعة الإجراءات (Action Tracking)
                // ============================================
        return result;
    },
    'addActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addActionTrackingToSheet(payload);
        return result;
    },
    'updateActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateActionTracking(payload.actionId || payload.id, payload.updateData || payload);
        return result;
    },
    'deleteActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteActionTracking(payload.actionId || payload.id);
        return result;
    },
    'getActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getActionTracking(payload.actionId || payload.id);
        return result;
    },
    'getAllActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllActionTracking();
        return result;
    },
    'addActionComment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addActionComment(payload.actionId || payload.id, payload);
        return result;
    },
    'addActionUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addActionUpdate(payload.actionId || payload.id, payload);
        return result;
    },
    'createActionFromModule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = createActionFromModule(payload.sourceModule, payload.sourceId, payload.sourceData || payload);
        return result;
    },
    'getActionTrackingSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getActionTrackingSettings();
        return result;
    },
    'saveActionTrackingSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {}
                        };
                    }
                    result = saveActionTrackingSettings(payload);
        return result;
    },
    'getActionTrackingKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getActionTrackingKPIs();
                    // // break;

                // ============================================
                // تتبع المشاكل وحلولها (Issue Tracking)
                // ============================================
        return result;
    },
    'addIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addIssueToSheet(payload.data || payload);
        return result;
    },
    'updateIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateIssue(
                        payload.issueId || payload.id || payload.data?.issueId,
                        payload.data || payload.updateData || payload
                    );
        return result;
    },
    'deleteIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteIssue(payload.issueId || payload.id || payload.data?.issueId);
        return result;
    },
    'getIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getIssue(payload.issueId || payload.id || payload.data?.issueId);
        return result;
    },
    'getAllIssues': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllIssues(payload.filters || payload.data?.filters || {});
        return result;
    },
    'addSolutionToIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSolutionToIssue(
                        payload.issueId || payload.id || payload.data?.issueId,
                        payload.solutionData || payload.data?.solutionData || payload.data || payload
                    );
        return result;
    },
    'addCommentToIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addCommentToIssue(
                        payload.issueId || payload.id || payload.data?.issueId,
                        payload.commentData || payload.data?.commentData || payload.data || payload
                    );
        return result;
    },
    'getIssueStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getIssueStatistics(payload.filters || payload.data?.filters || {});
                    // // break;

                // ============================================
                // إدارة التغيرات (Change Management - مشابه SAP MoC)
                // ============================================
        return result;
    },
    'getAllChangeRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllChangeRequests(payload.filters || payload.data?.filters || {});
        return result;
    },
    'getChangeRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getChangeRequest(payload.requestId || payload.id || payload.data?.requestId);
        return result;
    },
    'addChangeRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addChangeRequestToSheet(payload.data || payload);
        return result;
    },
    'updateChangeRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateChangeRequest(
                        payload.requestId || payload.id || payload.data?.requestId,
                        payload.updateData || payload.data || payload
                    );
        return result;
    },
    'getChangeRequestStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getChangeRequestStatistics(payload.filters || payload.data?.filters || {});
        return result;
    },
    'getNextChangeRequestNumber': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getNextChangeRequestNumber();
                    // // break;

                // ============================================
                // إعدادات النماذج (Form Settings) - النسخة المحسنة
                // ============================================
        return result;
    },
    'saveFormSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = saveFormSettingsToSheet(payload);
        return result;
    },
    'getFormSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getFormSettingsFromSheet();
        return result;
    },
    'initFormSettingsTables': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = initFormSettingsTables();
                    // // break;

                // إعدادات الشركة (Company Settings)
                // ============================================
        return result;
    },
    'saveCompanySettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = saveCompanySettingsToSheet(payload);
        return result;
    },
    'getCompanySettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getCompanySettingsFromSheet(payload.userData || payload.user || {});
        return result;
    },
    'initCompanySettingsTable': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = initCompanySettingsTable();
                    // // break;

                // المواقع (Sites)
        return result;
    },
    'addSite': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = addSiteToSheet(payload);
        return result;
    },
    'updateSite': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updateSiteInSheet(payload.siteId || payload.id, payload);
        return result;
    },
    'deleteSite': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteSiteFromSheet(payload.siteId || payload.id, payload.userData || payload.user);
        return result;
    },
    'getAllSites': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllSitesFromSheet();
                    // // break;

                // الأماكن الفرعية (Places)
        return result;
    },
    'addPlace': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = addPlaceToSheet(payload);
        return result;
    },
    'updatePlace': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updatePlaceInSheet(payload.placeId || payload.id, payload);
        return result;
    },
    'deletePlace': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deletePlaceFromSheet(payload.placeId || payload.id, payload.userData || payload.user);
        return result;
    },
    'getAllPlaces': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllPlacesFromSheet(payload.siteId);
                    // // break;

                // الإدارات (Departments)
        return result;
    },
    'addDepartment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = addDepartmentToSheet(payload);
        return result;
    },
    'updateDepartment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updateDepartmentInSheet(payload.deptId || payload.id, payload);
        return result;
    },
    'deleteDepartment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteDepartmentFromSheet(payload.deptId || payload.id, payload.userData || payload.user);
        return result;
    },
    'getAllDepartments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllDepartmentsFromSheet();
                    // // break;

                // فريق السلامة (Safety Team)
        return result;
    },
    'addSafetyMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = addSafetyMemberToSheet(payload);
        return result;
    },
    'updateSafetyMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updateSafetyMemberInSheet(payload.memberId || payload.id, payload);
        return result;
    },
    'deleteSafetyMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteSafetyMemberFromSheet(payload.memberId || payload.id, payload.userData || payload.user);
        return result;
    },
    'getAllSafetyMembers': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllSafetyMembersFromSheet();
                    // // break;

                // ============================================
                // إدارة أنواع المخالفات (Violation Types Management)
                // ============================================
        return result;
    },
    'saveViolationTypes': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = saveViolationTypesToSheet(payload);
        return result;
    },
    'getViolationTypes': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getViolationTypesFromSheet();
        return result;
    },
    'updateViolationType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updateViolationTypeInSheet(payload.typeId || payload.id, payload.updateData || payload);
        return result;
    },
    'deleteViolationType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = deleteViolationTypeFromSheet(payload.typeId || payload.id, payload.userData || payload.user);
                    // // break;

                // ============================================
                // الطوارئ (Emergency)
                // ============================================
        return result;
    },
    'addEmergencyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addEmergencyAlertToSheet(payload);
        return result;
    },
    'updateEmergencyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateEmergencyAlert(payload.alertId || payload.id, payload.updateData || payload);
        return result;
    },
    'getAllEmergencyAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllEmergencyAlerts(payload.filters || {});
        return result;
    },
    'addEmergencyPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addEmergencyPlanToSheet(payload);
        return result;
    },
    'updateEmergencyPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateEmergencyPlan(payload.planId || payload.id, payload.updateData || payload);
        return result;
    },
    'getEmergencyPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getEmergencyPlan(payload.planId || payload.id);
        return result;
    },
    'getAllEmergencyPlans': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllEmergencyPlans(payload.filters || {});
        return result;
    },
    'deleteEmergencyPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteEmergencyPlan(payload.planId || payload.id);
                    // // break;

                // ✅ تحديثات خطط الطوارئ (Emergency Plans Updates)
        return result;
    },
    'upsertEmergencyPlanUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = upsertEmergencyPlanUpdate(payload.sectionKey, payload);
        return result;
    },
    'getAllEmergencyPlanUpdates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllEmergencyPlanUpdates(payload.filters || {});
        return result;
    },
    'getEmergencyPlanUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getEmergencyPlanUpdate(payload.sectionKey);
        return result;
    },
    'deleteEmergencyPlanUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteEmergencyPlanUpdate(payload.sectionKey);
                    // // break;

                // ============================================
                // السجلات والذكاء الاصطناعي (Logs & AI)
                // ============================================
        return result;
    },
    'addAuditLog': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addAuditLogToSheet(payload);
        return result;
    },
    'getAllAuditLogs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllAuditLogs(payload.filters || {});
        return result;
    },
    'addUserActivityLog': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addUserActivityLogToSheet(payload);
        return result;
    },
    'getAllUserActivityLogs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllUserActivityLogs(payload.filters || {});
        return result;
    },
    'getUserActivityLogs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getUserActivityLogs(payload.userId || payload.id, payload.filters || {});
        return result;
    },
    'getLogStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getLogStatistics(payload.filters || {});
        return result;
    },
    'getDailyUserSessionActivityReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getDailyUserSessionActivityReport(payload.filters || payload || {});
        return result;
    },
    'addAIAssistantSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addAIAssistantSettingsToSheet(payload);
        return result;
    },
    'addUserAILog': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addUserAILogToSheet(payload);
                    // // break;

                // ============================================
                // إدارة السلامة والصحة المهنية (Safety & Health Management)
                // ============================================
        return result;
    },
    'addSafetyTeamMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSafetyTeamMemberToSheet(payload);
        return result;
    },
    'updateSafetyTeamMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateSafetyTeamMember(payload.memberId, payload.updateData || payload);
        return result;
    },
    'getSafetyTeamMembers': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        result = getSafetyTeamMembers();
                    } catch (error) {
                        Logger.log('Error calling getSafetyTeamMembers: ' + error.toString());
                        result = {
                            success: false,
                            message: 'خطأ في استدعاء getSafetyTeamMembers: ' + error.toString(),
                            errorCode: 'FUNCTION_ERROR'
                        };
                    }
        return result;
    },
    'getSafetyTeamMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getSafetyTeamMember(payload.memberId || payload.id);
        return result;
    },
    'deleteSafetyTeamMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteSafetyTeamMember(payload.memberId || payload.id);
        return result;
    },
    'saveOrganizationalStructure': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = saveOrganizationalStructureToSheet(payload);
        return result;
    },
    'getOrganizationalStructure': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        result = getOrganizationalStructure();
                    } catch (error) {
                        Logger.log('Error calling getOrganizationalStructure: ' + error.toString());
                        result = {
                            success: false,
                            message: 'خطأ في استدعاء getOrganizationalStructure: ' + error.toString(),
                            errorCode: 'FUNCTION_ERROR'
                        };
                    }
        return result;
    },
    'updateOrganizationalStructureOrder': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateOrganizationalStructureOrder(payload);
        return result;
    },
    'saveJobDescription': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = saveJobDescriptionToSheet(payload);
        return result;
    },
    'getJobDescription': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getJobDescription(payload.memberId || payload.employeeId);
        return result;
    },
    'updateJobDescription': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateJobDescription(payload.jobDescriptionId || payload.id, payload.updateData || payload);
        return result;
    },
    'addSafetyTeamKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSafetyTeamKPIToSheet(payload);
        return result;
    },
    'calculateSafetyTeamKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = calculateSafetyTeamKPIs(payload.memberId, payload.period);
        return result;
    },
    'getSafetyTeamKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getSafetyTeamKPIs(payload.memberId, payload.period);
        return result;
    },
    'generateSafetyTeamPerformanceReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = generateSafetyTeamPerformanceReport(payload.memberId, payload.startDate, payload.endDate);
        return result;
    },
    'savePerformanceReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = savePerformanceReportToSheet(payload);
        return result;
    },
    'addSafetyTeamAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSafetyTeamAttendanceToSheet(payload);
        return result;
    },
    'addSafetyTeamLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSafetyTeamLeaveToSheet(payload);
        return result;
    },
    'getSafetyTeamAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getSafetyTeamAttendance(payload.memberId, payload.startDate, payload.endDate);
        return result;
    },
    'getSafetyTeamLeaves': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getSafetyTeamLeaves(payload.memberId, payload.startDate, payload.endDate);
        return result;
    },
    'deleteSafetyTeamAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteSafetyTeamAttendance(payload.attendanceId || payload.id);
        return result;
    },
    'updateSafetyTeamAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateSafetyTeamAttendance(payload.attendanceId || payload.id, payload.updateData || payload);
        return result;
    },
    'deleteSafetyTeamLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteSafetyTeamLeave(payload.leaveId || payload.id);
        return result;
    },
    'updateSafetyTeamLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateSafetyTeamLeave(payload.leaveId || payload.id, payload.updateData || payload);
        return result;
    },
    'generateAttendanceReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = generateAttendanceReport(payload.memberId, payload.period, payload.year, payload.month);
        return result;
    },
    'getSafetyHealthManagementSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        result = getSafetyHealthManagementSettings();
                    } catch (error) {
                        Logger.log('Error calling getSafetyHealthManagementSettings: ' + error.toString());
                        result = {
                            success: false,
                            message: 'خطأ في استدعاء getSafetyHealthManagementSettings: ' + error.toString(),
                            errorCode: 'FUNCTION_ERROR'
                        };
                    }
        return result;
    },
    'saveSafetyHealthManagementSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = saveSafetyHealthManagementSettings(payload);
        return result;
    },
    'updateLeaveTypes': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateLeaveTypes(payload.leaveTypes);
        return result;
    },
    'updateAttendanceStatuses': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateAttendanceStatuses(payload.statuses);
        return result;
    },
    'updateKPITargets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateKPITargets(payload.targets);
        return result;
    },
    'addCustomKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        result = addCustomKPI(payload);
                    } catch (error) {
                        Logger.log('Error calling addCustomKPI: ' + error.toString());
                        result = {
                            success: false,
                            message: 'خطأ في استدعاء addCustomKPI: ' + error.toString(),
                            errorCode: 'FUNCTION_ERROR',
                            hint: 'تأكد من أن ملف SafetyHealthManagement.gs موجود وأن الدالة addCustomKPI معرّفة بشكل صحيح'
                        };
                    }
        return result;
    },
    'updateCustomKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        result = updateCustomKPI(payload.kpiId, payload.updateData);
                    } catch (error) {
                        Logger.log('Error calling updateCustomKPI: ' + error.toString());
                        result = {
                            success: false,
                            message: 'خطأ في استدعاء updateCustomKPI: ' + error.toString(),
                            errorCode: 'FUNCTION_ERROR'
                        };
                    }
        return result;
    },
    'deleteCustomKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        result = deleteCustomKPI(payload.kpiId);
                    } catch (error) {
                        Logger.log('Error calling deleteCustomKPI: ' + error.toString());
                        result = {
                            success: false,
                            message: 'خطأ في استدعاء deleteCustomKPI: ' + error.toString(),
                            errorCode: 'FUNCTION_ERROR'
                        };
                    }
        return result;
    },
    'calculateAllCustomKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        result = calculateAllCustomKPIs(payload.memberId, payload.period);
                    } catch (error) {
                        Logger.log('Error calling calculateAllCustomKPIs: ' + error.toString());
                        result = {
                            success: false,
                            message: 'خطأ في استدعاء calculateAllCustomKPIs: ' + error.toString(),
                            errorCode: 'FUNCTION_ERROR'
                        };
                    }
        return result;
    },
    'updateSafetyTeamKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateSafetyTeamKPI(payload.kpiId || payload.id, payload.updateData || payload);
        return result;
    },
    'addSafetyTeamTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addSafetyTeamTask(payload);
        return result;
    },
    'updateSafetyTeamTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateSafetyTeamTask(payload.taskId || payload.id, payload.updateData || payload);
        return result;
    },
    'getSafetyTeamTasks': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getSafetyTeamTasks(payload.memberId, payload.status);
        return result;
    },
    'deleteSafetyTeamTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteSafetyTeamTask(payload.taskId || payload.id);
                    // // break;

                // ============================================
                // User Tasks Management (مهام المستخدمين)
                // ============================================
        return result;
    },
    'addUserTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addUserTask(payload);
        return result;
    },
    'updateUserTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateUserTask(payload.taskId || payload.id, payload.updateData || payload);
        return result;
    },
    'deleteUserTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteUserTask(payload.taskId || payload.id);
        return result;
    },
    'getAllUserTasks': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllUserTasks();
        return result;
    },
    'getUserTasksByUserId': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getUserTasksByUserId(payload.userId || payload.user_id);
        return result;
    },
    'updateTaskCompletionRate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = updateTaskCompletionRate(
                        payload.taskId || payload.task_id,
                        payload.completionRate || payload.completion_rate,
                        payload.userId || payload.user_id
                    );
        return result;
    },
    'addUserInstruction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addUserInstruction(payload);
        return result;
    },
    'getUserInstructionsByUserId': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getUserInstructionsByUserId(payload.userId || payload.user_id);
                    // // break;

                // ============================================
                // الذكاء الاصطناعي (AI)
                // ============================================
        return result;
    },
    'analyzeHSEData': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = analyzeHSEData(payload.options || payload);
        return result;
    },
    'detectPatterns': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = detectPatterns(payload.moduleName, payload.options || {});
        return result;
    },
    'getSmartRecommendations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getSmartRecommendations(payload.userId, payload.context || {});
        return result;
    },
    'processAIQuestion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = processAIQuestion(payload.question || payload.query, payload.context || {});
                    // // break;

                // ============================================
                // الإشعارات (Notifications)
                // ============================================
        return result;
    },
    'addNotification': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = addNotification(payload);
        return result;
    },
    'getUserNotifications': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getUserNotifications(payload.userId || payload.user_id);
        return result;
    },
    'getUnreadNotificationsCount': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getUnreadNotificationsCount(payload.userId || payload.user_id);
        return result;
    },
    'markNotificationAsRead': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = markNotificationAsRead(payload.userId || payload.user_id, payload.notificationId || payload.id);
        return result;
    },
    'deleteNotification': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteNotification(payload.userId || payload.user_id, payload.notificationId || payload.id);
                    // // break;

                // ============================================
                // إدارة الموديولات (Module Management - Admin Only)
                // ============================================
        return result;
    },
    'getAllModules': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllModules();
        return result;
    },
    'getModuleInfo': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getModuleInfo(payload.moduleId || payload.id);
        return result;
    },
    'updateModule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || '',
                            id: payload.userId || payload.id
                        };
                    }
                    result = updateModule(payload.moduleId || payload.id, payload.updateData || payload, payload.userData || payload.user);
        return result;
    },
    'deleteModule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || '',
                            id: payload.userId || payload.id
                        };
                    }
                    result = deleteModule(payload.moduleId || payload.id, payload.userData || payload.user);
                    // // break;

                // ============================================
                // رفع الملفات إلى Google Drive
                // ============================================
        return result;
    },
    'uploadFileToDrive': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        if (payload.base64Data && payload.fileName && payload.mimeType) {
                            // رفع ملف واحد
                            result = uploadFileToDrive(
                                payload.base64Data,
                                payload.fileName,
                                payload.mimeType,
                                payload.moduleName || null
                            );
                        } else if (payload.files && Array.isArray(payload.files)) {
                            // رفع عدة ملفات دفعة واحدة
                            result = uploadMultipleFilesToDrive(
                                payload.files,
                                payload.moduleName || null
                            );
                        } else {
                            result = {
                                success: false,
                                message: 'يجب إرسال base64Data و fileName و mimeType، أو مصفوفة files'
                            };
                        }
                    } catch (error) {
                        Logger.log('Error in uploadFileToDrive: ' + error.toString());
                        result = {
                            success: false,
                            message: 'حدث خطأ أثناء رفع الملف: ' + error.toString()
                        };
                    }
        return result;
    },
    'deleteFileFromDrive': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = deleteFileFromDrive(payload.fileId);
        return result;
    },
    'processAttachmentsForSave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        try {
                        const processedAttachments = processAttachmentsForSave(
                            payload.attachments || [],
                            payload.moduleName || null
                        );
                        result = {
                            success: true,
                            attachments: processedAttachments
                        };
                    } catch (error) {
                        Logger.log('Error in processAttachmentsForSave: ' + error.toString());
                        result = {
                            success: false,
                            message: 'حدث خطأ أثناء معالجة المرفقات: ' + error.toString()
                        };
                    }
                    // // break;

                // ============================================
                // النسخ الاحتياطي (Backup System)
                // ============================================
        return result;
    },
    'createManualBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || '',
                            id: payload.userId || payload.id
                        };
                    }
                    result = createManualBackup(payload.userData || payload.user, payload.spreadsheetId || postData.spreadsheetId);
        return result;
    },
    'createAutomaticBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = createAutomaticBackup();
        return result;
    },
    'getAllBackups': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAllBackups(payload.filters || {});
        return result;
    },
    'getBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getBackup(payload.backupId || payload.id);
        return result;
    },
    'deleteBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || '',
                            id: payload.userId || payload.id
                        };
                    }
                    result = deleteBackup(payload.backupId || payload.id, payload.userData || payload.user);
        return result;
    },
    'restoreFromBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || '',
                            id: payload.userId || payload.id
                        };
                    }
                    result = restoreFromBackup(payload.backupId || payload.id, payload.userData || payload.user, payload.options || {});
        return result;
    },
    'setupAutomaticBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = setupAutomaticBackup();
        return result;
    },
    'disableAutomaticBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = disableAutomaticBackup();
        return result;
    },
    'getAutomaticBackupStatus': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getAutomaticBackupStatus();
        return result;
    },
    'getBackupSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getBackupSettings();
        return result;
    },
    'saveBackupSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || '',
                            id: payload.userId || payload.id
                        };
                    }
                    result = saveBackupSettings(payload, payload.userData || payload.user);
        return result;
    },
    'getBackupStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = getBackupStatistics();
        return result;
    },
    'downloadBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = downloadBackup(payload.backupId || payload.id);
        return result;
    },
    'importBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || '',
                            id: payload.userId || payload.id
                        };
                    }
                    // يقبل fileId أو fileUrl أو أي نص يحتوي ID
                    result = importBackupFromFile(
                        payload.fileId || payload.fileUrl || payload.file || payload.driveFileId,
                        payload.userData || payload.user,
                        payload.options || {}
                    );
        return result;
    },
    'importBackupFromFile': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || '',
                            id: payload.userId || payload.id
                        };
                    }
                    // يقبل fileId أو fileUrl أو أي نص يحتوي ID
                    result = importBackupFromFile(
                        payload.fileId || payload.fileUrl || payload.file || payload.driveFileId,
                        payload.userData || payload.user,
                        payload.options || {}
                    );
        return result;
    },
    'testBackupSystem': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        result = testBackupSystem();

        return result;
    },
};


/**
 * دالة مساعدة لمعالجة الحالات غير المعروفة
 */
function handleUnrecognizedAction(action) {
    Logger.log('Action not recognized: "' + action + '" (type: ' + typeof action + ', length: ' + (action ? action.length : 0) + ')');

    const safetyHealthActions = [
        'getSafetyTeamMembers', 'getSafetyTeamMember', 'addSafetyTeamMember', 'updateSafetyTeamMember',
        'getOrganizationalStructure', 'saveOrganizationalStructure',
        'getJobDescription', 'saveJobDescription',
        'getSafetyTeamKPIs', 'getSafetyHealthManagementSettings', 'saveSafetyHealthManagementSettings',
        'updateLeaveTypes', 'updateAttendanceStatuses', 'updateKPITargets',
        'addCustomKPI', 'updateCustomKPI', 'deleteCustomKPI', 'calculateAllCustomKPIs',
        'calculateSafetyTeamKPIs', 'generateSafetyTeamPerformanceReport', 'updateSafetyTeamKPI'
    ];

    const isSafetyHealthAction = safetyHealthActions.includes(action);

    return {
        success: false,
        message: 'الـ action "' + action + '" غير معترف به. يرجى التأكد من إضافة جميع الملفات المطلوبة إلى مشروع Google Apps Script وإعادة نشر Web App.',
        errorCode: 'ACTION_NOT_RECOGNIZED',
        action: action,
        actionType: typeof action,
        actionLength: action ? action.length : 0,
        hint: isSafetyHealthAction
            ? 'هذا الـ action يتطلب ملف SafetyHealthManagement.gs. تأكد من إضافة الملف وإعادة نشر Web App.'
            : 'تأكد من أن جميع الملفات المطلوبة موجودة في المشروع وأن جميع الدوال معرّفة بشكل صحيح',
        recognizedActions: isSafetyHealthAction ? safetyHealthActions : undefined
    };
}

// ✅ دمج معالجات العيادة من ClinicHandlers.gs
if (typeof ClinicHandlers !== 'undefined') {
    Object.assign(ActionHandlers, ClinicHandlers);
    Logger.log('✅ [ActionHandlers] تم دمج ' + Object.keys(ClinicHandlers).length + ' من معالجات العيادة.');
}
