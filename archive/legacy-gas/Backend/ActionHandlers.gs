/**
 * ActionHandlers Registry
 */

/** بوابة مدير — تُرجع كائن خطأ جاهز أو null */
function actionRequireAdmin_(actorUserData, actionName, extraFields) {
    if (typeof requireAdminActor_ !== 'function') return null;
    var gate = requireAdminActor_(actorUserData, actionName);
    if (!gate.ok) {
        var fail = {
            success: false,
            message: gate.message,
            errorCode: gate.errorCode,
            action: gate.action
        };
        if (extraFields && typeof extraFields === 'object') {
            for (var k in extraFields) {
                if (extraFields.hasOwnProperty(k)) fail[k] = extraFields[k];
            }
        }
        return fail;
    }
    return null;
}

/** بوابة هوية مسجّلة — تُرجع كائن خطأ جاهز أو null */
function actionRequireAuth_(actorUserData, actionName, extraFields) {
    if (typeof requireAuthenticatedActor_ !== 'function') {
        return {
            success: false,
            message: 'بوابة المصادقة غير متاحة',
            errorCode: 'AUTH_GATE_UNAVAILABLE',
            action: actionName
        };
    }
    var gate = requireAuthenticatedActor_(actorUserData, actionName);
    if (!gate.ok) {
        var fail = {
            success: false,
            message: gate.message,
            errorCode: gate.errorCode,
            action: gate.action
        };
        if (extraFields && typeof extraFields === 'object') {
            for (var k in extraFields) {
                if (extraFields.hasOwnProperty(k)) fail[k] = extraFields[k];
            }
        }
        return fail;
    }
    return null;
}

/**
 * هوية الموافق من الخادم (Users) — لا تُؤخذ من payload العميل.
 */
function buildServerActorStamp_(actorUserData) {
    var sheetUser = null;
    try {
        if (typeof getCachedActorRecordForActor_ === 'function') {
            sheetUser = getCachedActorRecordForActor_(actorUserData);
        }
    } catch (_e) { sheetUser = null; }
    var src = sheetUser || actorUserData || {};
    return {
        id: src.id || src.userId || '',
        email: src.email || '',
        name: src.name || src.fullName || '',
        role: src.role || '',
        stampedAt: new Date().toISOString(),
        stampedByServer: true
    };
}

var ActionHandlers = {
    'saveToSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    // P0.1: بوابة هوية دائماً (حتى بدون sheetName)
                    var writeGate = (typeof checkSheetDirectWriteAccess_ === 'function')
                        ? checkSheetDirectWriteAccess_(
                            (payload && payload.sheetName != null) ? payload.sheetName : '',
                            actorUserData,
                            action
                        )
                        : ((typeof requireAuthenticatedActor_ === 'function')
                            ? requireAuthenticatedActor_(actorUserData, action)
                            : { ok: false, success: false, message: 'بوابة الكتابة غير متاحة', errorCode: 'WRITE_GATE_UNAVAILABLE' });
                    if (!writeGate.ok) {
                        result = writeGate;
                        return;
                    }
                    if (!payload || payload.sheetName == null || String(payload.sheetName).trim() === '') {
                        result = { success: false, message: 'اسم الورقة مطلوب', errorCode: 'SHEET_NAME_REQUIRED' };
                        return;
                    }
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
                            return;
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
                    return;


        })();
        return result;
    },
    'appendToSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    // P0.1: بوابة هوية دائماً (حتى بدون sheetName)
                    var appendWriteGate = (typeof checkSheetDirectWriteAccess_ === 'function')
                        ? checkSheetDirectWriteAccess_(
                            (payload && payload.sheetName != null) ? payload.sheetName : '',
                            actorUserData,
                            action
                        )
                        : ((typeof requireAuthenticatedActor_ === 'function')
                            ? requireAuthenticatedActor_(actorUserData, action)
                            : { ok: false, success: false, message: 'بوابة الكتابة غير متاحة', errorCode: 'WRITE_GATE_UNAVAILABLE' });
                    if (!appendWriteGate.ok) {
                        result = appendWriteGate;
                        return;
                    }
                    if (!payload || payload.sheetName == null || String(payload.sheetName).trim() === '') {
                        result = { success: false, message: 'اسم الورقة مطلوب', errorCode: 'SHEET_NAME_REQUIRED' };
                        return;
                    }
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
                            return;
                        }
                    }
                    // البحث عن spreadsheetId في عدة أماكن
                    appendSpreadsheetId = payload.spreadsheetId ||
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
                    return;


        })();
        return result;
    },
    'initializeSheets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var adminGate = actionRequireAdmin_(actorUserData, action);
                    if (adminGate) { result = adminGate; return; }

                    initSpreadsheetId = payload.spreadsheetId ||
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
                    return;


        })();
        return result;
    },
    'readFromSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    const readSheetName = payload.sheetName || (typeof payload === 'string' ? payload : null);
                    readSpreadsheetId = payload.spreadsheetId ||
                                             postData.spreadsheetId ||
                                             getSpreadsheetId();
                    Logger.log('readFromSheet called with spreadsheetId: ' + (readSpreadsheetId ? readSpreadsheetId.substring(0, 10) + '...' : 'NOT PROVIDED'));
                    if (!readSheetName) {
                        result = { success: false, message: 'Sheet name is required for readFromSheet action' };
                    } else {
                        var readGate = (typeof checkSheetReadAccess_ === 'function')
                            ? checkSheetReadAccess_(readSheetName, actorUserData, action)
                            : { ok: true };
                        if (!readGate.ok) {
                            result = readGate;
                            return;
                        }
                        Logger.log('readFromSheet called with sheetName: ' + readSheetName);
                        if (payload.skipCache && typeof invalidateHseSheetCaches === 'function') {
                            invalidateHseSheetCaches(readSheetName);
                        }
                        var readRaw = readFromSheet(readSheetName, readSpreadsheetId);
                        if (readSheetName === 'DailyObservations' && payload.observationsRequestContext) {
                            readRaw = filterDailyObservationsForRequestContext(readRaw, payload.observationsRequestContext);
                        }
                        result = { success: true, data: readRaw };
                    }
                    return;

                // ✅ NEW: Batch read multiple sheets in ONE request

        })();
        return result;
    },
    'batchReadSheets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    try {
                        const sheetNames = payload.sheetNames || [];
                        const batchSpreadsheetId = payload.spreadsheetId ||
                                                   postData.spreadsheetId ||
                                                   getSpreadsheetId();

                        Logger.log('batchReadSheets called with ' + sheetNames.length + ' sheets');

                        if (!Array.isArray(sheetNames) || sheetNames.length === 0) {
                            result = { success: false, message: 'sheetNames array is required for batchReadSheets' };
                        } else if ((typeof requireAuthenticatedActor_ === 'function') &&
                                   !requireAuthenticatedActor_(actorUserData, 'batchReadSheets').ok) {
                            // فحص الهوية مرة واحدة قبل المعالجة (memoized داخلياً)
                            result = requireAuthenticatedActor_(actorUserData, 'batchReadSheets');
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
                                        var batchReadGate = (typeof checkSheetReadAccess_ === 'function')
                                            ? checkSheetReadAccess_(sheetName, actorUserData, 'batchReadSheets:' + sheetName)
                                            : { ok: true };
                                        if (!batchReadGate.ok) {
                                            failedSheets.push({ sheet: sheetName, error: batchReadGate.message });
                                            continue;
                                        }
                                        // ✅ Use CacheService for frequently-read sheets
                                        // طلبات الاعتماد/الحذف تتغير باستمرار — لا نعتمد على كاش batch قديم
                                        const skipCache = !!(payload && payload.skipCache) ||
                                            sheetName === 'ContractorApprovalRequests' ||
                                            sheetName === 'ContractorEvaluationApprovalRequests' ||
                                            sheetName === 'ContractorDeletionRequests' ||
                                            sheetName === 'ApprovedContractors';
                                        const cache = CacheService.getScriptCache();
                                        const cacheKey = 'batch_' + sheetName + '_v2';
                                        const cached = skipCache ? null : cache.get(cacheKey);

                                        if (cached) {
                                            // Return cached data
                                            batchResults[sheetName] = JSON.parse(cached);
                                            Logger.log('Cache HIT for batch sheet: ' + sheetName);
                                        } else {
                                            if (skipCache && typeof invalidateHseSheetCaches === 'function') {
                                                invalidateHseSheetCaches(sheetName);
                                            }
                                            // Read from sheet
                                            var sheetData = readFromSheet(sheetName, batchSpreadsheetId);

                                            // Special filtering
                                            if (sheetName === 'DailyObservations' && payload.observationsRequestContext) {
                                                sheetData = filterDailyObservationsForRequestContext(sheetData, payload.observationsRequestContext);
                                            }

                                            batchResults[sheetName] = sheetData;

                                            // ✅ Cache for 3 minutes (180 seconds) — يُتخطى عند skipCache (مزامنة يدوية)
                                            // Only cache if data is not too large (< 100KB)
                                            try {
                                                const dataSize = JSON.stringify(sheetData).length;
                                                if (!skipCache && dataSize < 100000) { // 100KB limit
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
                    return;


        })();
        return result;
    },
    'testConnection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    // اختبار الاتصال - إجراء بسيط للتحقق من أن الخلفية تعمل
                    Logger.log('testConnection called - testing backend connectivity');
                    result = {
                        success: true,
                        message: 'الاتصال بالخلفية يعمل بنجاح',
                        timestamp: new Date().toISOString(),
                        serverTime: new Date().toISOString()
                    };
                    return;


        })();
        return result;
    },
    'getAuthBootstrapPolicy': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            try {
                result = (typeof getAuthBootstrapPolicy === 'function')
                    ? getAuthBootstrapPolicy()
                    : { success: false, message: 'getAuthBootstrapPolicy unavailable' };
            } catch (e) {
                result = { success: false, message: 'getAuthBootstrapPolicy: ' + (e && e.toString ? e.toString() : e) };
            }
        })();
        return result;
    },
    'getPublicIP': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    // جلب الـ Public IP عبر الخادم (تجنب CORS/ETP في المتصفح)
                    Logger.log('getPublicIP called');
                    if (typeof getPublicIP === 'function') {
                        result = getPublicIP();
                    } else {
                        result = { success: false, message: 'getPublicIP function is not available on the backend' };
                    }
                    return;

                // ============================================
                // إحداثيات المواقع (Map Coordinates)
                // ============================================

        })();
        return result;
    },
    'PTW_MAP_COORDINATES': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    Logger.log('saveMapCoordinates called');
                    result = saveMapCoordinates(payload);
                    return;


        })();
        return result;
    },
    'saveMapCoordinates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    Logger.log('saveMapCoordinates called');
                    result = saveMapCoordinates(payload);
                    return;


        })();
        return result;
    },
    'getMapCoordinates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    Logger.log('getMapCoordinates called');
                    result = getMapCoordinates();
                    return;


        })();
        return result;
    },
    'PTW_DEFAULT_COORDINATES': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    Logger.log('saveDefaultCoordinates called');
                    result = saveDefaultCoordinates(payload);
                    return;


        })();
        return result;
    },
    'saveDefaultCoordinates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    Logger.log('saveDefaultCoordinates called');
                    result = saveDefaultCoordinates(payload);
                    return;


        })();
        return result;
    },
    'getDefaultCoordinates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    Logger.log('getDefaultCoordinates called');
                    result = getDefaultCoordinates();
                    return;


        })();
        return result;
    },
    'initMapCoordinatesTable': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    Logger.log('initMapCoordinatesTable called');
                    result = initMapCoordinatesTable(payload.spreadsheetId || getSpreadsheetId());
                    return;

                // ============================================
                // إدارة المستخدمين (Users)
                // ============================================

        })();
        return result;
    },
    'login': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = loginUser(payload.email, payload.password);
        })();
        return result;
    },
    'verifyMfaLogin': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = verifyMfaLogin(
                payload.challengeToken || payload.token,
                payload.email,
                payload.code || payload.otp
            );
        })();
        return result;
    },
    'mfaClearUser': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            var clearEmail = (payload && payload.email) || (postData && postData.email) || '';
            if (typeof emergencyClearUserMfa !== 'function') {
                result = { success: false, message: 'دالة الاستعادة غير متاحة', errorCode: 'MFA_CLEAR_UNAVAILABLE' };
                return;
            }
            result = emergencyClearUserMfa(clearEmail);
            try {
                if (typeof logSecurityEventSoft_ === 'function') {
                    logSecurityEventSoft_('mfa_emergency_clear_user', {
                        email: String(clearEmail || ''),
                        actor: (actorUserData && (actorUserData.email || actorUserData.id)) || '',
                        severity: 'high'
                    });
                }
            } catch (_le) { /* ignore */ }
        })();
        return result;
    },
    'mfaClearCorruptSecrets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            if (typeof emergencyClearCorruptMfaSecrets !== 'function') {
                result = { success: false, message: 'دالة الاستعادة غير متاحة', errorCode: 'MFA_CLEAR_CORRUPT_UNAVAILABLE' };
                return;
            }
            result = emergencyClearCorruptMfaSecrets();
            try {
                if (typeof logSecurityEventSoft_ === 'function') {
                    logSecurityEventSoft_('mfa_emergency_clear_corrupt', {
                        actor: (actorUserData && (actorUserData.email || actorUserData.id)) || '',
                        severity: 'high'
                    });
                }
            } catch (_le) { /* ignore */ }
        })();
        return result;
    },
    'invalidateServerSession': function(payload, postData, action, actorUserData, spreadsheetId) {
        var token = (postData && postData.sessionToken) || (payload && payload.sessionToken) || '';
        if (typeof invalidateServerSessionToken_ === 'function') {
            return invalidateServerSessionToken_(token);
        }
        return { success: true };
    },
    'touchUserPresence': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            try { result = touchUserPresence(payload || {}, actorUserData); }
            catch (e) { result = { success: false, message: 'touchUserPresence: ' + (e && e.toString ? e.toString() : e) }; }
        })();
        return result;
    },
    'markUserOffline': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            try { result = markUserOffline(payload || {}, actorUserData); }
            catch (e) { result = { success: false, message: 'markUserOffline: ' + (e && e.toString ? e.toString() : e) }; }
        })();
        return result;
    },
    'startMfaEnrollment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var actor = actorUserData || (postData && postData.userData);
            if (!actor || !actor.email) {
                result = { success: false, message: 'مطلوب تسجيل الدخول', errorCode: 'AUTH_REQUIRED' };
                return;
            }
            result = startMfaEnrollment(actor);
        })();
        return result;
    },
    'confirmMfaEnrollment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var actor = actorUserData || (postData && postData.userData);
            if (!actor || !actor.email) {
                result = { success: false, message: 'مطلوب تسجيل الدخول', errorCode: 'AUTH_REQUIRED' };
                return;
            }
            result = confirmMfaEnrollment(payload.code || payload.otp, actor);
        })();
        return result;
    },
    'disableMfa': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var actor = actorUserData || (postData && postData.userData);
            if (!actor || !actor.email) {
                result = { success: false, message: 'مطلوب تسجيل الدخول', errorCode: 'AUTH_REQUIRED' };
                return;
            }
            result = disableMfa(payload, actor);
        })();
        return result;
    },
    'addUser': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            // فحص صلاحيات Admin — إضافة مستخدمين محجوزة للمديرين فقط
            var actor = actorUserData || (postData && postData.userData);
            if (!actor || !actor.email) {
                result = { success: false, message: 'مطلوب تسجيل الدخول لتنفيذ هذه العملية.', errorCode: 'AUTH_REQUIRED' };
                return;
            }
            if (typeof checkAdminPermissionsAuthoritative === 'function' && !checkAdminPermissionsAuthoritative(actor)) {
                if (typeof logSecurityEvent === 'function') {
                    logSecurityEvent('addUser_unauthorized', { actor: actor.email || '', severity: 'high' });
                }
                result = { success: false, message: 'ليس لديك صلاحية لإضافة مستخدمين.', errorCode: 'ADMIN_REQUIRED' };
                return;
            }
            result = addUserToSheet(payload);
        })();
        return result;
    },
    'updateUser': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) {
                        result = adminFail;
                        return;
                    }
                    result = updateUserInSheet(payload.userId || payload.id, payload.updateData || payload, actorUserData, { internalCall: false });
                    return;

        })();
        return result;
    },
    'changePassword': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            try { result = changeUserPassword(payload || {}, actorUserData); }
            catch (e) { result = { success: false, message: 'changePassword: ' + (e && e.toString ? e.toString() : e) }; }
        })();
        return result;
    },
    'getUsersMeta': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getUsersMeta();
                    return;

        })();
        return result;
    },
    'resetUserPassword': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = resetUserPassword(payload.userId || payload.id || payload.email, payload.newPassword);
                    return;

        })();
        return result;
    },
    'deleteUser': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteUserFromSheet(payload.userId || payload.id, actorUserData);
                    return;

        })();
        return result;
    },
    'fixUsersSheetHeaders': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = fixUsersSheetHeaders(payload.spreadsheetId || postData.spreadsheetId || getSpreadsheetId());
                    return;

        })();
        return result;
    },
    'fixMissingSheetHeaders': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = fixMissingSheetHeaders(payload.spreadsheetId || postData.spreadsheetId || getSpreadsheetId());
                    return;

                // ============================================
                // الحوادث والسلامة (Incidents & Safety)
                // ============================================

        })();
        return result;
    },
    'addIncident': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addIncidentToSheet(payload, actorUserData);
                    return;

        })();
        return result;
    },
    // ✅ تنظيف الصفوف المكررة في IncidentsRegistry
    // يُستدعى تلقائياً من الواجهة عند اكتشاف تكرارات محلية،
    // ويمكن استدعاؤه يدوياً للصيانة. آمن للاستدعاء المتكرر (idempotent).
    'cleanupIncidentsRegistry': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, removed: 0, kept: 0, message: '' };
        (function() {
            try {
                result = cleanupIncidentsRegistryDuplicates(spreadsheetId);
            } catch (e) {
                result = { success: false, removed: 0, kept: 0, message: 'فشل تنظيف التكرارات: ' + (e && e.toString ? e.toString() : e) };
            }
        })();
        return result;
    },
    'cleanupPtwRegistryDatabase': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, removed: 0, kept: 0, message: '' };
        (function() {
            try {
                if (typeof cleanupPtwRegistryDatabase_ === 'function') {
                    result = cleanupPtwRegistryDatabase_();
                } else {
                    result = { success: false, message: 'cleanupPtwRegistryDatabase_ not found' };
                }
            } catch (e) {
                result = { success: false, message: 'فشل تنظيف السجل: ' + (e && e.toString ? e.toString() : e) };
            }
        })();
        return result;
    },
    // ✅ تتبّع إصدار التطبيق لكل مستخدم
    // 1) reportUserVersion: تُستدعى من الواجهة بعد تسجيل الدخول + heartbeat
    // 2) getAllUserVersions: للمدير لعرض كل المستخدمين وإصداراتهم
    // 3) getUserVersionStats: إحصائيات مجمعة (للكروت)
    'reportUserVersion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            try { result = reportUserVersion(payload); }
            catch (e) { result = { success: false, message: 'reportUserVersion: ' + (e && e.toString ? e.toString() : e) }; }
        })();
        return result;
    },
    'getAllUserVersions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, data: [], total: 0 };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action, { data: [], total: 0 });
            if (adminFail) { result = adminFail; return; }
            try { result = getAllUserVersions(payload || {}); }
            catch (e) { result = { success: false, data: [], total: 0, message: 'getAllUserVersions: ' + (e && e.toString ? e.toString() : e) }; }
        })();
        return result;
    },
    'getUserVersionStats': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            try { result = getUserVersionStats(payload || {}); }
            catch (e) { result = { success: false, message: 'getUserVersionStats: ' + (e && e.toString ? e.toString() : e) }; }
        })();
        return result;
    },
    'getUserVersionsDashboard': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, data: [], stats: null, total: 0 };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action, { data: [], stats: null, total: 0 });
            if (adminFail) { result = adminFail; return; }
            try { result = getUserVersionsDashboard(payload || {}); }
            catch (e) { result = { success: false, data: [], stats: null, total: 0, message: 'getUserVersionsDashboard: ' + (e && e.toString ? e.toString() : e) }; }
        })();
        return result;
    },
    'getUsersForApp': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, data: [] };
        (function() {
            try { result = getUsersForApp(actorUserData); }
            catch (e) { result = { success: false, message: 'getUsersForApp: ' + (e && e.toString ? e.toString() : e), data: [] }; }
        })();
        return result;
    },
    'getDataIntegritySnapshot': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, counts: {} };
        (function() {
            try { result = getDataIntegritySnapshot(payload || {}, actorUserData); }
            catch (e) { result = { success: false, message: 'getDataIntegritySnapshot: ' + (e && e.toString ? e.toString() : e), counts: {} }; }
        })();
        return result;
    },
    'updateIncident': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateIncident(payload.incidentId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getIncident': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getIncident(payload.incidentId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllIncidents': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllIncidents(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteIncident': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteIncident(payload.incidentId || payload.id, payload.userData || {});
                    return;

        })();
        return result;
    },
    'getIncidentStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getIncidentStatistics(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getIncidentAnalysisSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getIncidentAnalysisSettings();
                    return;

        })();
        return result;
    },
    'saveIncidentAnalysisSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = saveIncidentAnalysisSettings(payload);
                    return;

        })();
        return result;
    },
    'addIncidentNotification': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addIncidentNotificationToSheet(payload, actorUserData);
                    return;

        })();
        return result;
    },
    'getAllIncidentNotifications': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllIncidentNotifications(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addSafetyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSafetyAlertToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateSafetyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSafetyAlert(payload.alertId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getSafetyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getSafetyAlert(payload.alertId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllSafetyAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllSafetyAlerts(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteSafetyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteSafetyAlert(payload.alertId || payload.id);
                    return;

        })();
        return result;
    },
    'addNearMiss': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addNearMissToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateNearMiss': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateNearMiss(payload.nearMissId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getNearMiss': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getNearMiss(payload.nearMissId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllNearMisses': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllNearMisses(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteNearMiss': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteNearMiss(payload.nearMissId || payload.id);
                    return;

        })();
        return result;
    },
    'addPTW': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addPTWToSheet(payload);
                    return;

        })();
        return result;
    },
    'updatePTW': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updatePTW(payload.ptwId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getPTW': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getPTW(payload.ptwId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllPTWs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPTWs(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deletePTW': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deletePTW(payload.ptwId || payload.id, actorUserData);
                    return;

        })();
        return result;
    },
    'getPTWAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getPTWAlerts();
                    return;
                // ============================================
                // Issuing Authorities - المصرح لهم بالتوقيع على تصاريح العمل
                // ============================================

        })();
        return result;
    },
    'getAllIssuingAuthorities': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllIssuingAuthorities();
                    return;

        })();
        return result;
    },
    'addIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addIssuingAuthority(payload);
                    return;

        })();
        return result;
    },
    'updateIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateIssuingAuthority(payload.id || payload.recordId, payload);
                    return;

        })();
        return result;
    },
    'deleteIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteIssuingAuthority(payload.id || payload.recordId, payload.userData || payload.user);
                    return;

        })();
        return result;
    },
    'getIssuingAuthoritiesForPermitType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getIssuingAuthoritiesForPermitType(payload.permitType, payload.approvalRole);
                    return;

        })();
        return result;
    },
    'getIssuingAuthoritiesForPermitTypeAndRole': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getIssuingAuthoritiesForPermitTypeAndRole(payload.permitType, payload.approvalRole);
                    return;

        })();
        return result;
    },
    'getAllContractorIssuingAuthorities': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllContractorIssuingAuthorities();
                    return;

        })();
        return result;
    },
    'addContractorIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addContractorIssuingAuthority(payload);
                    return;

        })();
        return result;
    },
    'updateContractorIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateContractorIssuingAuthority(payload.id || payload.recordId, payload);
                    return;

        })();
        return result;
    },
    'deleteContractorIssuingAuthority': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteContractorIssuingAuthority(payload.id || payload.recordId, payload.userData || payload.user);
                    return;

        })();
        return result;
    },
    'getContractorIssuingAuthoritiesForPermitType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getContractorIssuingAuthoritiesForPermitType(payload.permitType);
                    return;

        })();
        return result;
    },
    'getEmployeeByCode': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action);
                    if (authFail) { result = authFail; return; }
                    result = getEmployeeByCode(payload.employeeCode || payload.code);
                    return;

        })();
        return result;
    },
    'initIssuingAuthoritiesTable': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = initIssuingAuthoritiesTable();
                    return;

        })();
        return result;
    },
    'addViolation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addViolationToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateViolation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var violationId = payload.violationId || payload.id || (payload.updateData && payload.updateData.id);
                    var updateData = payload.updateData || payload;
                    result = updateViolationInSheet(violationId, updateData);
                    return;

        })();
        return result;
    },
    'deleteViolationFromSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteViolationFromSheet(payload.id);
                    return;

                // ============================================
                // التدريب (Training)
                // ============================================

        })();
        return result;
    },
    'addTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addTrainingToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateTraining(payload.trainingId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getTraining(payload.trainingId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllTrainings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllTrainings(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteTraining(payload.trainingId || payload.id);
                    return;

        })();
        return result;
    },
    'getTrainingStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getTrainingStatistics(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addEmployeeTrainingMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addEmployeeTrainingMatrixToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateEmployeeTrainingMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateEmployeeTrainingMatrix(payload.employeeId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getEmployeeTrainingMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getEmployeeTrainingMatrix(payload.employeeId || payload.id);
                    return;

        })();
        return result;
    },
    'addContractorTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addContractorTrainingToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateContractorTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    // ✅ يدعم استدعاء الواجهة: { trainingId, updateData } أو الكائن المباشر
                    var trainingId = (payload && (payload.trainingId || payload.id)) || '';
                    var updateData = (payload && payload.updateData) ? payload.updateData : payload;
                    result = updateContractorTraining(trainingId, updateData);
                    return;

        })();
        return result;
    },
    'deleteContractorTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var trainingId = (payload && (payload.trainingId || payload.id)) || '';
                    result = deleteContractorTraining(trainingId);
                    return;

        })();
        return result;
    },
    'addAnnualTrainingPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addAnnualTrainingPlanToSheet(payload);
                    return;

        })();
        return result;
    },
    'getAllTrainingSessions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllTrainingSessions(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getAllTrainingCertificates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllTrainingCertificates(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getAllTrainingAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllTrainingAttendance(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getAllContractorTrainings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllContractorTrainings(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getTrainingModuleBundle': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getTrainingModuleBundle(payload || {});
                    return;

                // ============================================
                // العيادة الطبية (Clinic)
                // ============================================

        })();
        return result;
    },
    // ============================================
    // التدريبات القانونية (Legal Trainings)
    // ============================================
    'addLegalTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = addLegalTrainingToSheet(payload);
                    return;
        })();
        return result;
    },
    'updateLegalTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var trainingId = payload.trainingId || payload.id;
                    var updateData = payload.updateData || payload;
                    result = updateLegalTraining(trainingId, updateData);
                    return;
        })();
        return result;
    },
    'getAllLegalTrainings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = getAllLegalTrainings(payload.filters || {});
                    return;
        })();
        return result;
    },
    'deleteLegalTraining': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = deleteLegalTraining(payload.trainingId || payload.id, actorUserData);
                    return;
        })();
        return result;
    },
    'getLegalTrainingStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = getLegalTrainingStatistics(payload.filters || {});
                    return;
        })();
        return result;
    },
    // ============================================
    // حضور التدريبات القانونية (Legal Training Attendees)
    // ============================================
    'addLegalTrainingAttendee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = addLegalTrainingAttendee(payload);
                    return;
        })();
        return result;
    },
    'updateLegalTrainingAttendee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var attendeeId = payload.attendeeId || payload.id;
                    var updateData = payload.updateData || payload;
                    result = updateLegalTrainingAttendee(attendeeId, updateData);
                    return;
        })();
        return result;
    },
    'getAllLegalTrainingAttendees': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = getAllLegalTrainingAttendees(payload.filters || {});
                    return;
        })();
        return result;
    },
    'deleteLegalTrainingAttendee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = deleteLegalTrainingAttendee(payload.attendeeId || payload.id, actorUserData);
                    return;
        })();
        return result;
    },
    // ============================================
    // سجل التشريعات والقوانين (Legal Register)
    // ============================================
    'addLegalRegister': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = addLegalRegisterToSheet(payload); })();
        return result;
    },
    'updateLegalRegister': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var registerId = payload.registerId || payload.id;
            var updateData = payload.updateData || payload;
            result = updateLegalRegister(registerId, updateData);
        })();
        return result;
    },
    'getAllLegalRegisters': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = getAllLegalRegisters(payload.filters || {}); })();
        return result;
    },
    'deleteLegalRegister': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = deleteLegalRegister(payload.registerId || payload.id, actorUserData); })();
        return result;
    },
    'getLegalRegisterStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = getLegalRegisterStatistics(payload.filters || {}); })();
        return result;
    },
    'addClinicVisit': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    if (typeof requireAuthenticatedActor_ === 'function') {
                        var authGateAdd = requireAuthenticatedActor_(actorUserData, 'addClinicVisit');
                        if (!authGateAdd.ok) {
                            result = authGateAdd;
                            return;
                        }
                    }

                    Logger.log('🚀 [CODE.GS] ===== addClinicVisit action تم استدعاؤها =====');
                    Logger.log('🚀 [CODE.GS] الوقت: ' + new Date().toISOString());
                    Logger.log('🏷️ [CODE.GS] BUILD_TAG: ' + BUILD_TAG);
                    Logger.log('🚀 [CODE.GS] postData keys: ' + Object.keys(postData || {}).join(', '));
                    Logger.log('🚀 [CODE.GS] postData.data exists: ' + !!postData.data);
                    Logger.log('🚀 [CODE.GS] postData.data type: ' + typeof postData.data);
                    Logger.log('🚀 [CODE.GS] payload type: ' + typeof payload);
                    Logger.log('🚀 [CODE.GS] payload is null: ' + (payload === null));
                    Logger.log('🚀 [CODE.GS] payload is undefined: ' + (payload === undefined));
                    Logger.log('🚀 [CODE.GS] payload keys: ' + (payload ? Object.keys(payload).join(', ') : 'N/A'));
                    Logger.log('🚀 [CODE.GS] payload.createdBy: ' + JSON.stringify(payload?.createdBy));
                    Logger.log('🚀 [CODE.GS] payload.email: ' + JSON.stringify(payload?.email));
                    Logger.log('🚀 [CODE.GS] payload.id: ' + JSON.stringify(payload?.id));
                    Logger.log('🚀 [CODE.GS] payload.employeeName: ' + JSON.stringify(payload?.employeeName));

                    // ✅ إصلاح جذري: محاولة استخدام postData.data مباشرة إذا كان payload فارغاً
                    let visitDataToUse = payload;
                    if (!visitDataToUse || typeof visitDataToUse !== 'object' || Object.keys(visitDataToUse).length === 0) {
                        Logger.log('⚠️ [CODE.GS] payload فارغ، محاولة استخدام postData.data مباشرة');
                        visitDataToUse = postData.data;
                    }

                    // ✅ محاولة أخرى: إذا كان postData يحتوي على البيانات مباشرة (بدون data)
                    if (!visitDataToUse || typeof visitDataToUse !== 'object' || Object.keys(visitDataToUse).length === 0) {
                        Logger.log('⚠️ [CODE.GS] postData.data فارغ، محاولة استخدام postData مباشرة (بدون action)');
                        const postDataCopy = {};
                        for (var key in postData) {
                            if (postData.hasOwnProperty(key) && key !== 'action' && key !== 'csrfToken' && key !== 'skipCSRFCheck' && key !== 'skipCSRF') {
                                postDataCopy[key] = postData[key];
                            }
                        }
                        if (Object.keys(postDataCopy).length > 0) {
                            visitDataToUse = postDataCopy;
                            Logger.log('✅ [CODE.GS] تم استخدام postData مباشرة، عدد الحقول: ' + Object.keys(visitDataToUse).length);
                        }
                    }

                    // ✅ التحقق النهائي
                    if (!visitDataToUse || typeof visitDataToUse !== 'object' || Object.keys(visitDataToUse).length === 0) {
                        Logger.log('❌ [CODE.GS] لا يمكن العثور على بيانات الزيارة!');
                        Logger.log('❌ [CODE.GS] postData كامل: ' + JSON.stringify(postData).substring(0, 500));
                        result = { success: false, message: 'بيانات الزيارة غير موجودة أو غير صحيحة' };
                    } else {
                        Logger.log('✅ [CODE.GS] تم العثور على بيانات الزيارة، عدد الحقول: ' + Object.keys(visitDataToUse).length);
                        result = addClinicVisitToSheet(visitDataToUse);
                        // إضافة بصمة نسخة في النتيجة لتسهيل التتبع من الواجهة
                        try {
                            if (result && typeof result === 'object') {
                                result._buildTag = BUILD_TAG;
                            }
                        } catch (e) {}
                        Logger.log('✅ [CODE.GS] addClinicVisitToSheet اكتملت. النتيجة: ' + JSON.stringify(result));
                    }
                    Logger.log('🚀 [CODE.GS] ===== addClinicVisit action اكتملت =====');
                    return;

        })();
        return result;
    },
    'fixClinicSheetHeaders': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            result = fixClinicSheetHeaders();
        })();
        return result;
    },
    'compactClinicSheets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            result = compactClinicSheets();
        })();
        return result;
    },
    'updateClinicVisit': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    if (typeof requireAuthenticatedActor_ === 'function') {
                        var authGateUpd = requireAuthenticatedActor_(actorUserData, 'updateClinicVisit');
                        if (!authGateUpd.ok) {
                            result = authGateUpd;
                            return;
                        }
                    }
                    result = updateClinicVisit(payload.visitId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'migrateContractorVisits': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            result = migrateContractorVisits();
        })();
        return result;
    },
    'debugMigration': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            result = debugMigration();
        })();
        return result;
    },
    'getAllClinicVisits': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            if (typeof requireAuthenticatedActor_ === 'function') {
                var authGate = requireAuthenticatedActor_(actorUserData, 'getAllClinicVisits');
                if (!authGate.ok) {
                    result = authGate;
                    return;
                }
            }
            result = getAllClinicVisits(payload.filters || {});
        })();
        return result;
    },
    'addMedication': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action);
                    if (authFail) { result = authFail; return; }
                    result = addMedicationToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateMedication': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateMedication(payload.medicationId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'deleteMedication': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteMedication(payload.medicationId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllMedications': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllMedications(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getMedicationAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getMedicationAlerts();
                    return;

        })();
        return result;
    },
    'addSickLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSickLeaveToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateSickLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSickLeave(payload.leaveId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllSickLeaves': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllSickLeaves(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addInjury': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addInjuryToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateInjury': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateInjury(payload.injuryId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllInjuries': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllInjuries(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addClinicInventory': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addClinicInventoryToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateClinicInventory': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateClinicInventory(payload.inventoryId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllClinicInventory': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllClinicInventory(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addMedicationDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action);
                    if (authFail) { result = authFail; return; }
                    result = addMedicationDeletionRequest(payload);
                    return;

        })();
        return result;
    },
    'updateMedicationDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateMedicationDeletionRequest(payload.requestId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllMedicationDeletionRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    // P0.3: CSRF + هوية (لم تعد readOnly عامة)
                    var authFail = actionRequireAuth_(actorUserData, action, { data: [] });
                    if (authFail) { result = authFail; return; }
                    result = getAllMedicationDeletionRequests(payload.filters || {});
                    return;

        })();
        return result;
    },
    'approveMedicationDeletion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = approveMedicationDeletion(payload.requestId || payload.id, buildServerActorStamp_(actorUserData));
                    return;

        })();
        return result;
    },
    'rejectMedicationDeletion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = rejectMedicationDeletion(payload.requestId || payload.id, buildServerActorStamp_(actorUserData), payload.reason);
                    return;

        })();
        return result;
    },
    'addSupplyRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action);
                    if (authFail) { result = authFail; return; }
                    result = addSupplyRequest(payload);
                    return;

        })();
        return result;
    },
    'updateSupplyRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action);
                    if (authFail) { result = authFail; return; }
                    result = updateSupplyRequest(payload.requestId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllSupplyRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    // P0.3: CSRF + هوية (لم تعد readOnly عامة)
                    var authFail = actionRequireAuth_(actorUserData, action, { data: [] });
                    if (authFail) { result = authFail; return; }
                    result = getAllSupplyRequests(payload.filters || {});
                    return;

        })();
        return result;
    },
    'approveSupplyRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = approveSupplyRequest(payload.requestId || payload.id, buildServerActorStamp_(actorUserData));
                    return;

        })();
        return result;
    },
    'rejectSupplyRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = rejectSupplyRequest(payload.requestId || payload.id, buildServerActorStamp_(actorUserData), payload.reason);
                    return;

        })();
        return result;
    },
    'addClinicVisitDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action);
                    if (authFail) { result = authFail; return; }
                    result = addClinicVisitDeletionRequest(payload);
                    return;

        })();
        return result;
    },
    'updateClinicVisitDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = updateClinicVisitDeletionRequest(payload.requestId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllClinicVisitDeletionRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    // P0.3: CSRF + هوية (لم تعد readOnly عامة)
                    var authFail = actionRequireAuth_(actorUserData, action, { data: [] });
                    if (authFail) { result = authFail; return; }
                    result = getAllClinicVisitDeletionRequests(payload.filters || {});
                    return;

        })();
        return result;
    },
    'approveClinicVisitDeletion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    // P0.2: موافقة حذف زيارة — مدير فقط + ختم موافق من الخادم
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = approveClinicVisitDeletion(payload.requestId || payload.id, buildServerActorStamp_(actorUserData));
                    return;

        })();
        return result;
    },
    'rejectClinicVisitDeletion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = rejectClinicVisitDeletion(payload.requestId || payload.id, buildServerActorStamp_(actorUserData), payload.reason);
                    return;

        })();
        return result;
    },
    'deleteClinicVisit': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = deleteClinicVisit(payload.visitId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllClinicStaff': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = getAllClinicStaff(payload && payload.filters ? payload.filters : payload || {});
        })();
        return result;
    },
    'addClinicStaff': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            result = addClinicStaff(payload);
        })();
        return result;
    },
    'updateClinicStaff': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            result = updateClinicStaff(payload.staffId || payload.id, payload.updateData || payload);
        })();
        return result;
    },
    'deleteClinicStaff': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }
            result = deleteClinicStaff(payload.staffId || payload.id);
        })();
        return result;
    },
    'getClinicStaffAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = getClinicStaffAttendance(payload && payload.filters ? payload.filters : payload || {}, actorUserData);
        })();
        return result;
    },
    'addClinicStaffTimeOffRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = addClinicStaffTimeOffRequest(payload, actorUserData);
        })();
        return result;
    },
    'getClinicStaffTimeOffRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = getClinicStaffTimeOffRequests(payload && payload.filters ? payload.filters : payload || {}, actorUserData);
        })();
        return result;
    },
    'approveClinicStaffTimeOffRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = approveClinicStaffTimeOffRequest(
                payload.requestId || payload.id,
                actorUserData,
                payload.notes || payload.reviewNotes || ''
            );
        })();
        return result;
    },
    'rejectClinicStaffTimeOffRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = rejectClinicStaffTimeOffRequest(
                payload.requestId || payload.id,
                actorUserData,
                payload.reason || payload.reviewNotes || ''
            );
        })();
        return result;
    },
    'cancelClinicStaffTimeOffRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = cancelClinicStaffTimeOffRequest(payload.requestId || payload.id, actorUserData);
        })();
        return result;
    },
    'getClinicStaffLeaveBalances': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = getClinicStaffLeaveBalances(payload || {}, actorUserData);
        })();
        return result;
    },
    'upsertClinicStaffLeaveQuota': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = upsertClinicStaffLeaveQuota(payload, actorUserData);
        })();
        return result;
    },
    'getClinicStaffSystemActivities': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = getClinicStaffSystemActivities(
                payload && payload.filters ? payload.filters : payload || {},
                actorUserData
            );
        })();
        return result;
    },
    'recordClinicStaffLogin': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var authFail = actionRequireAuth_(actorUserData, action);
            if (authFail) { result = authFail; return; }
            // إلزام هوية الجلسة — لا punch-in نيابة عن مستخدم آخر
            var safe = Object.assign({}, payload || {});
            if (actorUserData) {
                if (actorUserData.id) safe.userId = actorUserData.id;
                if (actorUserData.email) {
                    safe.email = actorUserData.email;
                    safe.userEmail = actorUserData.email;
                }
                if (actorUserData.name) {
                    safe.userName = actorUserData.name;
                    safe.name = actorUserData.name;
                }
            }
            result = recordClinicStaffLogin(safe);
        })();
        return result;
    },
    'recordClinicStaffLogout': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var authFail = actionRequireAuth_(actorUserData, action);
            if (authFail) { result = authFail; return; }
            var safe = Object.assign({}, payload || {});
            if (actorUserData) {
                if (actorUserData.id) safe.userId = actorUserData.id;
                if (actorUserData.email) {
                    safe.email = actorUserData.email;
                    safe.userEmail = actorUserData.email;
                }
                if (actorUserData.name) {
                    safe.userName = actorUserData.name;
                    safe.name = actorUserData.name;
                }
            }
            result = recordClinicStaffLogout(safe);
        })();
        return result;
    },
    'updateClinicStaffAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = updateClinicStaffAttendance(payload, actorUserData);
        })();
        return result;
    },
    'updateContractor': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = {
                success: false,
                message: 'تحديث المقاول عبر هذا المسار غير متاح حالياً. استخدم مسار الاعتماد/التحديث المعتمد في الموديول.',
                errorCode: 'UPDATE_CONTRACTOR_DISABLED'
            };
        })();
        return result;
    },
    'getContractor': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
 // - تم الإزالة
                //
        })();
        return result;
    },
    'getAllContractors': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
 // - تم الإزالة
                //
        })();
        return result;
    },
    'deleteContractor': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
 // - تم الإزالة

        })();
        return result;
    },
    'addEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addEmployeeToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateEmployee(payload.employeeId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getEmployee(payload.employeeId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllEmployees': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllEmployees(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getEmployeesSheetHealth': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = getEmployeesSheetHealth();
                    return;
        })();
        return result;
    },
    'getEmployeesLoadSmoke': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = getEmployeesLoadSmoke();
                    return;
        })();
        return result;
    },
    'deactivateEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deactivateEmployee(payload.employeeId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteEmployee': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteEmployee(payload.employeeId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteAllEmployees': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteAllEmployees(payload);
                    return;

        })();
        return result;
    },
    'repairEmployeesColumnDrift': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = repairEmployeesColumnDrift(payload || {});
                    return;

        })();
        return result;
    },
    'reportEmployeeDuplicates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = reportEmployeeDuplicates(payload || {});
                    return;

        })();
        return result;
    },
    'cleanupDuplicateEmployees': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = cleanupDuplicateEmployees(payload || {});
                    return;

        })();
        return result;
    },
    'getEmployeeStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getEmployeeStatistics(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getOrCreatePublicProfileToken': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getOrCreatePublicProfileToken(payload || {});
                    return;

        })();
        return result;
    },
    'getAllAppEmergencyNumbers': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllAppEmergencyNumbers();
                    return;

        })();
        return result;
    },
    'upsertAppEmergencyNumber': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = upsertAppEmergencyNumber(payload || {});
                    return;

        })();
        return result;
    },
    'deleteAppEmergencyNumber': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteAppEmergencyNumber(payload || {});
                    return;

        })();
        return result;
    },
    'addApprovedContractor': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addApprovedContractorToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateApprovedContractor': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateApprovedContractor(payload.approvedContractorId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllApprovedContractors': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var acFilters = (payload && payload.filters) ? payload.filters : {};
                    var acSid = (typeof resolveContractorSpreadsheetId_ === 'function')
                        ? resolveContractorSpreadsheetId_(payload, postData)
                        : (spreadsheetId || getSpreadsheetId());
                    result = getAllApprovedContractors(acFilters, acSid);
                    return;

        })();
        return result;
    },
    'deleteApprovedContractor': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteApprovedContractor(payload.approvedContractorId || payload.id, actorUserData);
                    return;

        })();
        return result;
    },
    'addContractorEvaluation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addContractorEvaluationToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateContractorEvaluation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateContractorEvaluation(payload.evaluationId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllContractorEvaluations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllContractorEvaluations(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getContractorEvaluations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getContractorEvaluations(payload.contractorId || payload.id);
                    return;

        })();
        return result;
    },
    'getContractorDetailedAnalytics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action);
                    if (authFail) { result = authFail; return; }
                    result = getContractorDetailedAnalytics(payload);
                    return;

                // طلبات اعتماد المقاولين

        })();
        return result;
    },
    'addContractorApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var addSid = (typeof resolveContractorSpreadsheetId_ === 'function')
                        ? resolveContractorSpreadsheetId_(payload, postData)
                        : (spreadsheetId || getSpreadsheetId());
                    result = addContractorApprovalRequest(payload, addSid);
                    return;

        })();
        return result;
    },
    // ───────── دائرة اعتماد المخالفات ─────────
    'addViolationApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = addViolationApprovalRequest(payload); })();
        return result;
    },
    'getAllViolationApprovalRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = getAllViolationApprovalRequests(payload); })();
        return result;
    },
    'approveViolationApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = approveViolationApprovalRequest(payload); })();
        return result;
    },
    'rejectViolationApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = rejectViolationApprovalRequest(payload); })();
        return result;
    },
    'getViolationApprovalSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = getViolationApprovalSettings(payload); })();
        return result;
    },
    'updateViolationApprovalSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = updateViolationApprovalSettings(payload); })();
        return result;
    },
    'updateContractorApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateContractorApprovalRequest(payload.requestId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllContractorApprovalRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action, { data: [] });
                    if (authFail) { result = authFail; return; }
                    var filters = (payload && payload.filters) ? payload.filters : {};
                    if (payload && payload.forceRefresh === true) {
                        filters.forceRefresh = true;
                    }
                    var sid = (typeof resolveContractorSpreadsheetId_ === 'function')
                        ? resolveContractorSpreadsheetId_(payload, postData)
                        : (spreadsheetId || getSpreadsheetId());
                    result = getAllContractorApprovalRequests(filters, sid);
                    return;

        })();
        return result;
    },
    'approveContractorApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = approveContractorApprovalRequest(payload.requestId || payload.id, payload.userData || payload);
                    return;

        })();
        return result;
    },
    'reconcileMissingApprovedContractors': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = reconcileMissingApprovedContractorsFromRequests(payload || {}, actorUserData || payload.userData || {});
                    return;

        })();
        return result;
    },
    'addContractorEvaluationApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var addSid = (typeof resolveContractorSpreadsheetId_ === 'function')
                        ? resolveContractorSpreadsheetId_(payload, postData)
                        : (spreadsheetId || getSpreadsheetId());
                    result = addContractorEvaluationApprovalRequest(payload, addSid);
                    return;
        })();
        return result;
    },
    'updateContractorEvaluationApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = updateContractorEvaluationApprovalRequest(payload.requestId || payload.id, payload.updateData || payload);
                    return;
        })();
        return result;
    },
    'getAllContractorEvaluationApprovalRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action, { data: [] });
                    if (authFail) { result = authFail; return; }
                    var filters = (payload && payload.filters) ? payload.filters : {};
                    if (payload && payload.forceRefresh === true) {
                        filters.forceRefresh = true;
                    }
                    var sid = (typeof resolveContractorSpreadsheetId_ === 'function')
                        ? resolveContractorSpreadsheetId_(payload, postData)
                        : (spreadsheetId || getSpreadsheetId());
                    result = getAllContractorEvaluationApprovalRequests(filters, sid);
                    return;
        })();
        return result;
    },
    'ensureContractorEvaluationApprovalRequestsSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var adminFail = actionRequireAdmin_(actorUserData, action);
        if (adminFail) return adminFail;
        var sid = (typeof resolveContractorSpreadsheetId_ === 'function')
            ? resolveContractorSpreadsheetId_(payload, postData)
            : (spreadsheetId || getSpreadsheetId());
        return ensureContractorEvaluationApprovalRequestsSheet_(sid);
    },
    'repairContractorEvaluationApprovalRequestsSheet': function(payload, postData, action, actorUserData, spreadsheetId) {
        var adminFail = actionRequireAdmin_(actorUserData, action);
        if (adminFail) return adminFail;
        var sid = (typeof resolveContractorSpreadsheetId_ === 'function')
            ? resolveContractorSpreadsheetId_(payload, postData)
            : (spreadsheetId || getSpreadsheetId());
        if (typeof repairContractorEvaluationApprovalRequestsSheet === 'function') {
            return repairContractorEvaluationApprovalRequestsSheet(sid);
        }
        return ensureContractorEvaluationApprovalRequestsSheet_(sid);
    },
    'approveContractorEvaluationApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = approveContractorEvaluationApprovalRequest(payload.requestId || payload.id, payload.userData || payload);
                    return;
        })();
        return result;
    },
    'rejectContractorEvaluationApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = rejectContractorEvaluationApprovalRequest(payload.requestId || payload.id, payload.rejectionReason || '', payload.userData || payload);
                    return;
        })();
        return result;
    },
    'rejectContractorApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = rejectContractorApprovalRequest(payload.requestId || payload.id, payload.rejectionReason || '', payload.userData || payload);
                    return;

                // طلبات حذف المقاولين

        })();
        return result;
    },
    'addContractorDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addContractorDeletionRequest(payload);
                    return;

        })();
        return result;
    },
    'updateContractorDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateContractorDeletionRequest(payload.requestId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllContractorDeletionRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action, { data: [] });
                    if (authFail) { result = authFail; return; }
                    var filters = (payload && payload.filters) ? payload.filters : {};
                    if (payload && payload.forceRefresh === true) {
                        filters.forceRefresh = true;
                    }
                    var sid = (typeof resolveContractorSpreadsheetId_ === 'function')
                        ? resolveContractorSpreadsheetId_(payload, postData)
                        : (spreadsheetId || getSpreadsheetId());
                    result = getAllContractorDeletionRequests(filters, sid);
                    return;

        })();
        return result;
    },
    'approveContractorDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = approveContractorDeletionRequest(payload.requestId || payload.id, payload.userData || payload);
                    return;

        })();
        return result;
    },
    'rejectContractorDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = rejectContractorDeletionRequest(payload.requestId || payload.id, payload.rejectionReason || '', payload.userData || payload);
                    return;

                // ============================================
                // السلامة العامة (Safety)
                // ============================================

        })();
        return result;
    },
    'addBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addBehaviorToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateBehavior(payload.behaviorId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllBehaviors': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllBehaviors(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getBehavior(payload.behaviorId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteBehavior(payload.behaviorId || payload.id);
                    return;

        })();
        return result;
    },
    'addContractorBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addContractorBehaviorToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateContractorBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateContractorBehavior(payload.behaviorId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllContractorBehaviors': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllContractorBehaviors(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getContractorBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getContractorBehavior(payload.behaviorId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteContractorBehavior': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteContractorBehavior(payload.behaviorId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteBehaviorsBatch': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteBehaviorsBatch(payload.ids || payload);
                    return;

        })();
        return result;
    },
    'deleteContractorBehaviorsBatch': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteContractorBehaviorsBatch(payload.ids || payload);
                    return;

        })();
        return result;
    },
    'addChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addChemicalSafetyToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateChemicalSafety(payload.chemicalId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllChemicalSafety(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getChemicalSafety(payload.chemicalId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteChemicalSafety': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteChemicalSafety(payload.chemicalId || payload.id);
                    return;

        })();
        return result;
    },
    'addObservation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addObservationToSheet(payload);
                    return;

        })();
        return result;
    },
    'getNextObservationId': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getNextObservationId(payload || {});
                    return;

        })();
        return result;
    },
    'repairObservationSequence': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = repairObservationSequence(payload || {});
                    return;

        })();
        return result;
    },
    'updateObservation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateObservation(payload.observationId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getObservation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getObservation(payload.observationId || payload.id);
                    if (result && result.success && result.data && payload.observationsRequestContext) {
                        var _gof = filterDailyObservationsForRequestContext([result.data], payload.observationsRequestContext);
                        if (_gof.length === 0) {
                            result = { success: false, message: 'غير مصرح بعرض هذه الملاحظة' };
                        }
                    }
                    return;

        })();
        return result;
    },
    'transitionObservationWorkflow': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = transitionObservationWorkflow(payload);
                    return;

        })();
        return result;
    },
    'notifyObservationWorkflowEvent': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = notifyObservationWorkflowEvent(payload);
                    return;

        })();
        return result;
    },
    'getAllObservations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllObservations(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteObservation': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteObservation(payload.observationId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteAllObservations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteAllObservations();
                    return;

        })();
        return result;
    },
    'getObservationStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getObservationStatistics(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addObservationComment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addObservationComment(
                        payload.observationId || payload.id || payload.data?.observationId,
                        payload.commentData || payload.data?.commentData || payload.data || payload
                    );
                    return;

        })();
        return result;
    },
    'addObservationUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addObservationUpdate(
                        payload.observationId || payload.id || payload.data?.observationId,
                        payload.updateData || payload.data?.updateData || payload.data || payload
                    );
                    return;

        })();
        return result;
    },
    'updateObservationStatus': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateObservationStatus(
                        payload.observationId || payload.id || payload.data?.observationId,
                        payload.statusData || payload.data?.statusData || payload.data || payload
                    );
                    return;

        })();
        return result;
    },
    'exportDailyObservationsPptReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = exportDailyObservationsPptReport(payload);
                    return;

        })();
        return result;
    },
    'setDailyObservationsPptTemplateId': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = setDailyObservationsPptTemplateId(payload.templateId || payload.templateID || payload);
                    return;

        })();
        return result;
    },
    'getDailyObservationsPptTemplateId': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getDailyObservationsPptTemplateId();
                    return;

        })();
        return result;
    },
    'createDefaultDailyObservationsPptTemplate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = createDefaultDailyObservationsPptTemplate();
                    return;

        })();
        return result;
    },
    'addObservationSite': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addObservationSiteToSheet(payload);
                    return;

                // ============================================
                // ISO والجودة (ISO & Quality)
                // ============================================

        })();
        return result;
    },
    'addISODocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addISODocumentToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateISODocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateISODocument(payload.documentId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllISODocuments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllISODocuments(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addISOProcedure': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addISOProcedureToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateISOProcedure': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateISOProcedure(payload.procedureId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllISOProcedures': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllISOProcedures(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addISOForm': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addISOFormToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateISOForm': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateISOForm(payload.formId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllISOForms': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllISOForms(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addSOPJHA': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSOPJHAToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateSOPJHA': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSOPJHA(payload.sopId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getSOPJHA': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getSOPJHA(payload.sopId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllSOPJHAs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllSOPJHAs(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteSOPJHA': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteSOPJHA(payload.sopId || payload.id);
                    return;

        })();
        return result;
    },
    'getDocumentCodes': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getDocumentCodes(payload || {});
                    return;

        })();
        return result;
    },
    'addDocumentCode': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = (typeof addDocumentCode === 'function' ? addDocumentCode : addDocumentCodeToSheet)(postData.data || payload);
                    return;

        })();
        return result;
    },
    'updateDocumentCode': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateDocumentCode((postData.data || payload).id, (postData.data || payload));
                    return;

        })();
        return result;
    },
    'deleteDocumentCode': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteDocumentCode((postData.data || payload).id);
                    return;

        })();
        return result;
    },
    'getDocumentVersions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getDocumentVersions(payload || {});
                    return;

        })();
        return result;
    },
    'addDocumentVersion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addDocumentVersionToSheet(postData.data || payload);
                    return;

        })();
        return result;
    },
    'updateDocumentVersion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateDocumentVersion((postData.data || payload).id, (postData.data || payload));
                    return;

        })();
        return result;
    },
    'getDocumentCodeAndVersion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getDocumentCodeAndVersion(payload || {});
                    return;

        })();
        return result;
    },
    'addRiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addRiskAssessmentToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateRiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateRiskAssessment(payload.riskId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getRiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getRiskAssessment(payload.riskId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllRiskAssessments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllRiskAssessments(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteRiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteRiskAssessment(payload.riskId || payload.id);
                    return;

        })();
        return result;
    },
    'addLegalDocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addLegalDocumentToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateLegalDocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateLegalDocument(payload.documentId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getLegalDocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getLegalDocument(payload.documentId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllLegalDocuments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllLegalDocuments(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteLegalDocument': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteLegalDocument(payload.documentId || payload.id);
                    return;

        })();
        return result;
    },
    'getLegalDocumentAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getLegalDocumentAlerts();
                    return;

                // ============================================
                // HSE الشامل (HSE Modules)
                // ============================================

        })();
        return result;
    },
    'addHSEAudit': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addHSEAuditToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateHSEAudit': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateHSEAudit(payload.auditId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllHSEAudits': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllHSEAudits(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addHSENonConformity': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addHSENonConformityToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateHSENonConformity': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateHSENonConformity(payload.nonConformityId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllHSENonConformities': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllHSENonConformities(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addHSECorrectiveAction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addHSECorrectiveActionToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateHSECorrectiveAction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateHSECorrectiveAction(payload.actionId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllHSECorrectiveActions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllHSECorrectiveActions(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addHSEObjective': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addHSEObjectiveToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateHSEObjective': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateHSEObjective(payload.objectiveId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllHSEObjectives': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllHSEObjectives(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addHSERiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addHSERiskAssessmentToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateHSERiskAssessment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateHSERiskAssessment(payload.riskId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllHSERiskAssessments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllHSERiskAssessments(payload.filters || {});
                    return;

                // ============================================
                // البيئة (Environmental)
                // ============================================

        })();
        return result;
    },
    'addEnvironmentalAspect': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addEnvironmentalAspectToSheet(payload);
                    return;

        })();
        return result;
    },
    'addEnvironmentalMonitoring': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addEnvironmentalMonitoringToSheet(payload);
                    return;

        })();
        return result;
    },
    'addSustainability': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSustainabilityToSheet(payload);
                    return;

        })();
        return result;
    },
    'addCarbonFootprint': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addCarbonFootprintToSheet(payload);
                    return;

        })();
        return result;
    },
    'addWasteManagement': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addWasteManagementToSheet(payload);
                    return;

        })();
        return result;
    },
    'addEnergyEfficiency': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addEnergyEfficiencyToSheet(payload);
                    return;

        })();
        return result;
    },
    'addWaterManagement': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addWaterManagementToSheet(payload);
                    return;

        })();
        return result;
    },
    'addRecyclingProgram': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addRecyclingProgramToSheet(payload);
                    return;

                // ============================================
                // المعدات والفحوصات (Equipment & Inspections)
                // ============================================

        })();
        return result;
    },
    'addFireEquipment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addFireEquipmentToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateFireEquipment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateFireEquipment(payload.equipmentId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllFireEquipment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllFireEquipment(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addFireEquipmentAsset': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addFireEquipmentAssetToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateFireEquipmentAsset': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateFireEquipmentAsset(payload.assetId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllFireEquipmentAssets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllFireEquipmentAssets(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteFireEquipment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteFireEquipmentAsset(payload.assetId || payload.id);
                    return;

        })();
        return result;
    },
    'getPublicFireInspectionConfig': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = getPublicFireInspectionConfig(payload);
            return;
        })();
        return result;
    },
    'submitPublicFireInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = submitPublicFireInspection(payload);
            return;
        })();
        return result;
    },
    'addFireEquipmentInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addFireEquipmentInspectionToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateFireEquipmentInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateFireEquipmentInspection(payload.inspectionId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllFireEquipmentInspections': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllFireEquipmentInspections(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getFireEquipmentInspectionAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getFireEquipmentInspectionAlerts();
                    return;

        })();
        return result;
    },
    'approveFireEquipmentInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = approveFireEquipmentInspection(payload.inspectionId || payload.id, payload.approverData || actorUserData, payload.reviewNotes || payload.notes);
            return;
        })();
        return result;
    },
    'rejectFireEquipmentInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = rejectFireEquipmentInspection(payload.inspectionId || payload.id, payload.approverData || actorUserData, payload.reason || payload.reviewNotes);
            return;
        })();
        return result;
    },
    'getPendingFireInspections': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            result = getPendingFireInspections(spreadsheetId);
            return;
        })();
        return result;
    },
    'saveOrUpdateFireEquipmentAsset': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = saveOrUpdateFireEquipmentAsset(payload);
                    return;

        })();
        return result;
    },
    'addFireEquipmentApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addFireEquipmentApprovalRequest(payload);
                    return;

        })();
        return result;
    },
    'updateFireEquipmentApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateFireEquipmentApprovalRequest(payload.requestId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getFireEquipmentApprovalRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getFireEquipmentApprovalRequests(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteFireEquipmentApprovalRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteFireEquipmentApprovalRequest(payload.requestId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllPeriodicEquipmentTypes': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = getAllPeriodicEquipmentTypes();
                    return;
        })();
        return result;
    },
    'savePeriodicEquipmentType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = savePeriodicEquipmentType(payload);
                    return;
        })();
        return result;
    },
    'deletePeriodicEquipmentType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = deletePeriodicEquipmentType(payload.typeId || payload.id);
                    return;
        })();
        return result;
    },
    'getAllPeriodicEquipmentAssets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = getAllPeriodicEquipmentAssets(payload.filters || {});
                    return;
        })();
        return result;
    },
    'saveOrUpdatePeriodicEquipmentAsset': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = saveOrUpdatePeriodicEquipmentAsset(payload);
                    return;
        })();
        return result;
    },
    'deletePeriodicEquipmentAsset': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = deletePeriodicEquipmentAsset(payload.assetId || payload.id);
                    return;
        })();
        return result;
    },
    'getAllPeriodicEquipmentInspections': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = getAllPeriodicEquipmentInspections(payload.filters || {});
                    return;
        })();
        return result;
    },
    'addPeriodicEquipmentInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = addPeriodicEquipmentInspection(payload);
                    return;
        })();
        return result;
    },
    'addPPE': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addPPEToSheet(payload);
                    return;

        })();
        return result;
    },
    'updatePPE': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updatePPE(payload.ppeId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllPPE': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPPE(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deletePPE': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deletePPE(payload.ppeId || payload.id || payload);
                    return;

        })();
        return result;
    },
    'addPPEMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addPPEMatrixToSheet(payload);
                    return;

        })();
        return result;
    },
    'updatePPEMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updatePPEMatrix(payload.employeeId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getPPEMatrix': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getPPEMatrix(payload.employeeId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllPPEMatrices': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPPEMatrices(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getAllPPEStockItems': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPPEStockItems(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addOrUpdatePPEStockItem': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addOrUpdatePPEStockItem(payload);
                    return;

        })();
        return result;
    },
    'addPPETransaction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addPPETransaction(payload);
                    return;

        })();
        return result;
    },
    'getAllPPETransactions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPPETransactions(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getPPEItemsList': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getPPEItemsList();
                    return;

        })();
        return result;
    },
    'deletePPEStockItem': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deletePPEStockItem(payload.itemId || payload);
                    return;

        })();
        return result;
    },
    'getLowStockItems': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getLowStockItems();
                    return;

        })();
        return result;
    },
    'addPeriodicInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addPeriodicInspectionToSheet(payload);
                    return;

        })();
        return result;
    },
    'updatePeriodicInspection': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updatePeriodicInspection(payload.inspectionId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllPeriodicInspections': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPeriodicInspections(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addPeriodicInspectionCategory': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addPeriodicInspectionCategoryToSheet(payload);
                    return;

        })();
        return result;
    },
    'updatePeriodicInspectionCategory': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updatePeriodicInspectionCategory(payload.categoryId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllPeriodicInspectionCategories': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPeriodicInspectionCategories();
                    return;

        })();
        return result;
    },
    'addPeriodicInspectionChecklist': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addPeriodicInspectionChecklistToSheet(payload);
                    return;

        })();
        return result;
    },
    'updatePeriodicInspectionChecklist': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updatePeriodicInspectionChecklist(payload.checklistId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getPeriodicInspectionChecklist': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getPeriodicInspectionChecklist(payload.checklistId || payload.id);
                    return;

        })();
        return result;
    },
    'getChecklistsByCategory': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getChecklistsByCategory(payload.categoryId || payload.id);
                    return;

        })();
        return result;
    },
    'addPeriodicInspectionSchedule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addPeriodicInspectionScheduleToSheet(payload);
                    return;

        })();
        return result;
    },
    'updatePeriodicInspectionSchedule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updatePeriodicInspectionSchedule(payload.scheduleId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllPeriodicInspectionSchedules': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPeriodicInspectionSchedules(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addPeriodicInspectionRecord': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addPeriodicInspectionRecordToSheet(payload);
                    return;

        })();
        return result;
    },
    'updatePeriodicInspectionRecord': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updatePeriodicInspectionRecord(payload.recordId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllPeriodicInspectionRecords': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPeriodicInspectionRecords(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getPeriodicInspectionAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getPeriodicInspectionAlerts();
                    return;

        })();
        return result;
    },
    'addViolationType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addViolationTypeToSheet(payload);
                    return;

                // ============================================
                // الميزانية ومؤشرات الأداء (Budget & KPIs)
                // ============================================

        })();
        return result;
    },
    'addBudget': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addBudgetToSheet(payload);
                    return;

        })();
        return result;
    },
    'addSafetyBudget': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addBudgetToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateBudget': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateBudget(payload.budgetId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllBudgets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllBudgets(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addSafetyBudgets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSafetyBudgetsToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateSafetyBudget': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSafetyBudget(payload.budgetId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllSafetyBudgets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllSafetyBudgets(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addSafetyBudgetTransaction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSafetyBudgetTransactionToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateSafetyBudgetTransaction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSafetyBudgetTransaction(payload.transactionId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllSafetyBudgetTransactions': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllSafetyBudgetTransactions(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getBudgetStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getBudgetStatistics(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addKPIToSheet(payload);
                    return;

        })();
        return result;
    },
    'addSafetyPerformanceKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addKPIToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateKPI(payload.kpiId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getKPI(payload.kpiId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllKPIs(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteKPI(payload.kpiId || payload.id);
                    return;

                // ============================================
                // KPI Annual Plans (الخطط السنوية لمؤشرات الأداء)
                // ============================================

        })();
        return result;
    },
    'getKPIAnnualPlans': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getKPIAnnualPlans(payload.filters || {});
                    return;

        })();
        return result;
    },
    'saveKPIAnnualPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = saveKPIAnnualPlan(payload);
                    return;

        })();
        return result;
    },
    'deleteKPIAnnualPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteKPIAnnualPlan(payload.planId || payload.id);
                    return;

                // ============================================
                // HSE Monitoring Plans (خطط متابعة HSE)
                // ============================================

        })();
        return result;
    },
    'getHSEMonitoringPlans': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getHSEMonitoringPlans(payload.filters || {});
                    return;

        })();
        return result;
    },
    'saveHSEMonitoringPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = saveHSEMonitoringPlan(payload);
                    return;

        })();
        return result;
    },
    'deleteHSEMonitoringPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteHSEMonitoringPlan(payload.planId || payload.id);
                    return;

        })();
        return result;
    },
    'updateHSEMonitoringMonthlyExecution': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateHSEMonitoringMonthlyExecution(payload.planId || payload.id, payload.monthData || payload);
                    return;

                // ============================================
                // متابعة الإجراءات (Action Tracking)
                // ============================================

        })();
        return result;
    },
    'addActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addActionTrackingToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateActionTracking(payload.actionId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'deleteActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteActionTracking(payload.actionId || payload.id);
                    return;

        })();
        return result;
    },
    'getActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getActionTracking(payload.actionId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllActionTracking': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllActionTracking();
                    return;

        })();
        return result;
    },
    'addActionComment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addActionComment(payload.actionId || payload.id, payload);
                    return;

        })();
        return result;
    },
    'addActionUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addActionUpdate(payload.actionId || payload.id, payload);
                    return;

        })();
        return result;
    },
    'createActionFromModule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = createActionFromModule(payload.sourceModule, payload.sourceId, payload.sourceData || payload);
                    return;

        })();
        return result;
    },
    'getActionTrackingSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getActionTrackingSettings();
                    return;

        })();
        return result;
    },
    'saveActionTrackingSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {}
                        };
                    }
                    result = saveActionTrackingSettings(payload);
                    return;

        })();
        return result;
    },
    'getActionTrackingKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getActionTrackingKPIs();
                    return;

                // ============================================
                // تتبع المشاكل وحلولها (Issue Tracking)
                // ============================================

        })();
        return result;
    },
    'addIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addIssueToSheet(payload.data || payload);
                    return;

        })();
        return result;
    },
    'updateIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateIssue(
                        payload.issueId || payload.id || payload.data?.issueId,
                        payload.data || payload.updateData || payload
                    );
                    return;

        })();
        return result;
    },
    'deleteIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteIssue(payload.issueId || payload.id || payload.data?.issueId);
                    return;

        })();
        return result;
    },
    'getIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getIssue(payload.issueId || payload.id || payload.data?.issueId);
                    return;

        })();
        return result;
    },
    'getAllIssues': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllIssues(payload.filters || payload.data?.filters || {});
                    return;

        })();
        return result;
    },
    'addSolutionToIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSolutionToIssue(
                        payload.issueId || payload.id || payload.data?.issueId,
                        payload.solutionData || payload.data?.solutionData || payload.data || payload
                    );
                    return;

        })();
        return result;
    },
    'addCommentToIssue': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addCommentToIssue(
                        payload.issueId || payload.id || payload.data?.issueId,
                        payload.commentData || payload.data?.commentData || payload.data || payload
                    );
                    return;

        })();
        return result;
    },
    'getIssueStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getIssueStatistics(payload.filters || payload.data?.filters || {});
                    return;

                // ============================================
                // إدارة التغيرات (Change Management - مشابه SAP MoC)
                // ============================================

        })();
        return result;
    },
    'getAllChangeRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllChangeRequests(payload.filters || payload.data?.filters || {});
                    return;

        })();
        return result;
    },
    'getChangeRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getChangeRequest(payload.requestId || payload.id || payload.data?.requestId);
                    return;

        })();
        return result;
    },
    'addChangeRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addChangeRequestToSheet(payload.data || payload);
                    return;

        })();
        return result;
    },
    'updateChangeRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateChangeRequest(
                        payload.requestId || payload.id || payload.data?.requestId,
                        payload.updateData || payload.data || payload
                    );
                    return;

        })();
        return result;
    },
    'getChangeRequestStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getChangeRequestStatistics(payload.filters || payload.data?.filters || {});
                    return;

        })();
        return result;
    },
    'getNextChangeRequestNumber': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getNextChangeRequestNumber();
                    return;

                // ============================================
                // إعدادات النماذج (Form Settings) - النسخة المحسنة
                // ============================================

        })();
        return result;
    },
    'saveFormSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = saveFormSettingsToSheet(payload, actorUserData);
                    return;

        })();
        return result;
    },
    'getFormSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getFormSettingsFromSheet();
                    return;

        })();
        return result;
    },
    'initFormSettingsTables': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = initFormSettingsTables();
                    return;

                // إعدادات الشركة (Company Settings)
                // ============================================

        })();
        return result;
    },
    'saveCompanySettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = saveCompanySettingsToSheet(payload);
                    return;

        })();
        return result;
    },
    'getCompanySettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getCompanySettingsFromSheet(payload.userData || payload.user || {});
                    return;

        })();
        return result;
    },
    'getEmailSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = getEmailSettings(payload || {});
                    return;
        })();
        return result;
    },
    'saveEmailSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = actorUserData || payload.userData || payload.user || {};
                    } else if (payload && actorUserData) {
                        payload.userData = payload.userData || actorUserData;
                    }
                    result = saveEmailSettings(payload || {});
                    return;
        })();
        return result;
    },
    'sendDirectEmail': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    result = sendDirectEmail(payload || {});
                    return;
        })();
        return result;
    },
    'sendTestEmail': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = actorUserData || {};
                    } else if (payload && actorUserData) {
                        payload.userData = payload.userData || actorUserData;
                    }
                    result = sendTestEmail(payload || {});
                    return;
        })();
        return result;
    },
    'initCompanySettingsTable': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = initCompanySettingsTable();
                    return;

                // المواقع (Sites)

        })();
        return result;
    },
    'addSite': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = addSiteToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateSite': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updateSiteInSheet(payload.siteId || payload.id, payload);
                    return;

        })();
        return result;
    },
    'deleteSite': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteSiteFromSheet(
                        payload.siteId || payload.id,
                        payload.userData || payload.user,
                        payload.siteName || payload.name || ''
                    );
                    return;

        })();
        return result;
    },
    'getAllSites': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllSitesFromSheet();
                    return;

                // الأماكن الفرعية (Places)

        })();
        return result;
    },
    'addPlace': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = addPlaceToSheet(payload);
                    return;

        })();
        return result;
    },
    'updatePlace': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updatePlaceInSheet(payload.placeId || payload.id, payload);
                    return;

        })();
        return result;
    },
    'deletePlace': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = actorUserData || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = deletePlaceFromSheet(payload, payload.userData || payload.user || actorUserData);
                    return;

        })();
        return result;
    },
    'getAllPlaces': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllPlacesFromSheet(payload.siteId);
                    return;

                // الإدارات (Departments)

        })();
        return result;
    },
    'addDepartment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = addDepartmentToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateDepartment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updateDepartmentInSheet(payload.deptId || payload.id, payload);
                    return;

        })();
        return result;
    },
    'deleteDepartment': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteDepartmentFromSheet(payload.deptId || payload.id, payload.userData || payload.user);
                    return;

        })();
        return result;
    },
    'getAllDepartments': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllDepartmentsFromSheet();
                    return;

                // فريق السلامة (Safety Team)

        })();
        return result;
    },
    'addSafetyMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = addSafetyMemberToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateSafetyMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updateSafetyMemberInSheet(payload.memberId || payload.id, payload);
                    return;

        })();
        return result;
    },
    'deleteSafetyMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteSafetyMemberFromSheet(payload.memberId || payload.id, payload.userData || payload.user);
                    return;

        })();
        return result;
    },
    'getAllSafetyMembers': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllSafetyMembersFromSheet();
                    return;

                // ============================================
                // إدارة أنواع المخالفات (Violation Types Management)
                // ============================================

        })();
        return result;
    },
    'saveViolationTypes': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = saveViolationTypesToSheet(payload);
                    return;

        })();
        return result;
    },
    'getViolationTypes': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getViolationTypesFromSheet();
                    return;

        })();
        return result;
    },
    'updateViolationType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = updateViolationTypeInSheet(payload.typeId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'deleteViolationType': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    if (payload && !payload.userData && !payload.user) {
                        payload.userData = payload.userData || payload.user || {
                            role: payload.role || '',
                            permissions: payload.permissions || {},
                            name: payload.name || '',
                            email: payload.email || ''
                        };
                    }
                    result = deleteViolationTypeFromSheet(payload.typeId || payload.id, payload.userData || payload.user);
                    return;

                // ============================================
                // الطوارئ (Emergency)
                // ============================================

        })();
        return result;
    },
    'addEmergencyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addEmergencyAlertToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateEmergencyAlert': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateEmergencyAlert(payload.alertId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getAllEmergencyAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllEmergencyAlerts(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addEmergencyPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addEmergencyPlanToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateEmergencyPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateEmergencyPlan(payload.planId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getEmergencyPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getEmergencyPlan(payload.planId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllEmergencyPlans': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllEmergencyPlans(payload.filters || {});
                    return;

        })();
        return result;
    },
    'deleteEmergencyPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteEmergencyPlan(payload.planId || payload.id);
                    return;

                // ✅ تحديثات خطط الطوارئ (Emergency Plans Updates)

        })();
        return result;
    },
    'upsertEmergencyPlanUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = upsertEmergencyPlanUpdate(payload.sectionKey, payload);
                    return;

        })();
        return result;
    },
    'getAllEmergencyPlanUpdates': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllEmergencyPlanUpdates(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getEmergencyPlanUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getEmergencyPlanUpdate(payload.sectionKey);
                    return;

        })();
        return result;
    },
    'deleteEmergencyPlanUpdate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteEmergencyPlanUpdate(payload.sectionKey);
                    return;

        })();
        return result;
    },
    // ============================================
    // خرائط المصنع للطوارئ (Factory Safety Maps)
    // ============================================
    'addEmergencyFloorPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = addEmergencyFloorPlan(payload); })();
        return result;
    },
    'updateEmergencyFloorPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = updateEmergencyFloorPlan(payload.planId || payload.id, payload.updateData || payload); })();
        return result;
    },
    'getAllEmergencyFloorPlans': function(payload, postData, action, actorUserData, spreadsheetId) {
        var plans = getAllEmergencyFloorPlans({ skipCache: !!(payload && payload.skipCache) });
        return { success: true, data: Array.isArray(plans) ? plans : [] };
    },
    'getDriveImageDataUrl': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getDriveImageDataUrl(payload && (payload.fileIdOrUrl || payload.fileId || payload.imageDriveId || payload.url));
    },
    'deleteEmergencyFloorPlan': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = deleteEmergencyFloorPlan(payload.planId || payload.id); })();
        return result;
    },
    'addEmergencyMapItem': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = addEmergencyMapItem(payload); })();
        return result;
    },
    'updateEmergencyMapItem': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = updateEmergencyMapItem(payload.itemId || payload.id, payload.updateData || payload); })();
        return result;
    },
    'getAllEmergencyMapItems': function(payload, postData, action, actorUserData, spreadsheetId) {
        var items = getAllEmergencyMapItems(payload.filters || {});
        return { success: true, data: Array.isArray(items) ? items : [] };
    },
    'deleteEmergencyMapItem': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() { result = deleteEmergencyMapItem(payload.itemId || payload.id); })();
        return result;
    },
    'addAuditLog': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addAuditLogToSheet(payload);
                    return;

        })();
        return result;
    },
    'getAllAuditLogs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = getAllAuditLogs(payload.filters || {});
                    return;

        })();
        return result;
    },
    'addUserActivityLog': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addUserActivityLogToSheet(payload);
                    return;

        })();
        return result;
    },
    'getAllUserActivityLogs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = getAllUserActivityLogs(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getUserActivityLogs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = getUserActivityLogs(payload.userId || payload.id, payload.filters || {});
                    return;

        })();
        return result;
    },
    'getLogStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = getLogStatistics(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getDailyUserSessionActivityReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = getDailyUserSessionActivityReport(payload.filters || payload || {});
                    return;

        })();
        return result;
    },
    'addClientErrorLog': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var authFail = actionRequireAuth_(actorUserData, action);
                    if (authFail) { result = authFail; return; }
                    result = addClientErrorLogToSheet(payload || {}, actorUserData);
                    return;
        })();
        return result;
    },
    'getAllClientErrorLogs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = getAllClientErrorLogs((payload && payload.filters) || payload || {});
                    return;
        })();
        return result;
    },
    'getClientErrorStats': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = getClientErrorStats((payload && payload.filters) || payload || {});
                    return;
        })();
        return result;
    },
    'updateClientErrorStatus': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = updateClientErrorStatus(payload || {}, actorUserData);
                    return;
        })();
        return result;
    },
    'addAIAssistantSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addAIAssistantSettingsToSheet(payload);
                    return;

        })();
        return result;
    },
    'addUserAILog': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addUserAILogToSheet(payload);
                    return;

                // ============================================
                // إدارة السلامة والصحة المهنية (Safety & Health Management)
                // ============================================

        })();
        return result;
    },
    'addSafetyTeamMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSafetyTeamMemberToSheet(payload);
                    return;

        })();
        return result;
    },
    'updateSafetyTeamMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSafetyTeamMember(payload.memberId, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getSafetyTeamMembers': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'getSafetyTeamMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getSafetyTeamMember(payload.memberId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteSafetyTeamMember': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteSafetyTeamMember(payload.memberId || payload.id);
                    return;

        })();
        return result;
    },
    'saveOrganizationalStructure': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = saveOrganizationalStructureToSheet(payload);
                    return;

        })();
        return result;
    },
    'getOrganizationalStructure': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'updateOrganizationalStructureOrder': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateOrganizationalStructureOrder(payload);
                    return;

        })();
        return result;
    },
    'saveJobDescription': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = saveJobDescriptionToSheet(payload);
                    return;

        })();
        return result;
    },
    'getJobDescription': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getJobDescription(payload.memberId || payload.employeeId);
                    return;

        })();
        return result;
    },
    'updateJobDescription': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateJobDescription(payload.jobDescriptionId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'addSafetyTeamKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSafetyTeamKPIToSheet(payload);
                    return;

        })();
        return result;
    },
    'calculateSafetyTeamKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = calculateSafetyTeamKPIs(payload.memberId, payload.period);
                    return;

        })();
        return result;
    },
    'getSafetyTeamKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getSafetyTeamKPIs(payload.memberId, payload.period);
                    return;

        })();
        return result;
    },
    'generateSafetyTeamPerformanceReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = generateSafetyTeamPerformanceReport(payload.memberId, payload.startDate, payload.endDate);
                    return;

        })();
        return result;
    },
    'savePerformanceReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = savePerformanceReportToSheet(payload);
                    return;

        })();
        return result;
    },
    'addSafetyTeamAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSafetyTeamAttendanceToSheet(payload);
                    return;

        })();
        return result;
    },
    'addSafetyTeamLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSafetyTeamLeaveToSheet(payload);
                    return;

        })();
        return result;
    },
    'getSafetyTeamAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getSafetyTeamAttendance(payload.memberId, payload.startDate, payload.endDate);
                    return;

        })();
        return result;
    },
    'getSafetyTeamLeaves': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getSafetyTeamLeaves(payload.memberId, payload.startDate, payload.endDate);
                    return;

        })();
        return result;
    },
    'deleteSafetyTeamAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteSafetyTeamAttendance(payload.attendanceId || payload.id);
                    return;

        })();
        return result;
    },
    'updateSafetyTeamAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSafetyTeamAttendance(payload.attendanceId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'deleteSafetyTeamLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteSafetyTeamLeave(payload.leaveId || payload.id);
                    return;

        })();
        return result;
    },
    'updateSafetyTeamLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSafetyTeamLeave(payload.leaveId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'generateAttendanceReport': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = generateAttendanceReport(payload.memberId, payload.period, payload.year, payload.month);
                    return;

        })();
        return result;
    },
    'getSafetyHealthManagementSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'saveSafetyHealthManagementSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = saveSafetyHealthManagementSettings(payload);
                    return;

        })();
        return result;
    },
    'updateLeaveTypes': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateLeaveTypes(payload.leaveTypes);
                    return;

        })();
        return result;
    },
    'updateAttendanceStatuses': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateAttendanceStatuses(payload.statuses);
                    return;

        })();
        return result;
    },
    'updateKPITargets': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateKPITargets(payload.targets);
                    return;

        })();
        return result;
    },
    'addCustomKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'updateCustomKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'deleteCustomKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'calculateAllCustomKPIs': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'updateSafetyTeamKPI': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSafetyTeamKPI(payload.kpiId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'addSafetyTeamTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSafetyTeamTask(payload);
                    return;

        })();
        return result;
    },
    'updateSafetyTeamTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSafetyTeamTask(payload.taskId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'getSafetyTeamTasks': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getSafetyTeamTasks(payload.memberId, payload.status);
                    return;

        })();
        return result;
    },
    'deleteSafetyTeamTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteSafetyTeamTask(payload.taskId || payload.id);
                    return;

                // ============================================
                // User Tasks Management (مهام المستخدمين)
                // ============================================

        })();
        return result;
    },
    'addUserTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addUserTask(payload);
                    return;

        })();
        return result;
    },
    'updateUserTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateUserTask(payload.taskId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'deleteUserTask': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteUserTask(payload.taskId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllUserTasks': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllUserTasks();
                    return;

        })();
        return result;
    },
    'addSafetyCalendarCustomEvent': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addSafetyCalendarCustomEvent(payload);
                    return;

        })();
        return result;
    },
    'updateSafetyCalendarCustomEvent': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateSafetyCalendarCustomEvent(payload.eventId || payload.id, payload.updateData || payload);
                    return;

        })();
        return result;
    },
    'deleteSafetyCalendarCustomEvent': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteSafetyCalendarCustomEvent(payload.eventId || payload.id);
                    return;

        })();
        return result;
    },
    'getAllSafetyCalendarCustomEvents': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllSafetyCalendarCustomEvents();
                    return;

        })();
        return result;
    },
    'getUserTasksByUserId': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getUserTasksByUserId(payload.userId || payload.user_id);
                    return;

        })();
        return result;
    },
    'updateTaskCompletionRate': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = updateTaskCompletionRate(
                        payload.taskId || payload.task_id,
                        payload.completionRate || payload.completion_rate,
                        payload.userId || payload.user_id
                    );
                    return;

        })();
        return result;
    },
    'addUserInstruction': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addUserInstruction(payload);
                    return;

        })();
        return result;
    },
    'getUserInstructionsByUserId': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getUserInstructionsByUserId(payload.userId || payload.user_id);
                    return;

                // ============================================
                // الذكاء الاصطناعي (AI)
                // ============================================

        })();
        return result;
    },
    'analyzeHSEData': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = analyzeHSEData(payload.options || payload);
                    return;

        })();
        return result;
    },
    'detectPatterns': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = detectPatterns(payload.moduleName, payload.options || {});
                    return;

        })();
        return result;
    },
    'getSmartRecommendations': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getSmartRecommendations(payload.userId, payload.context || {});
                    return;

        })();
        return result;
    },
    'suggestInvestigationAnalysis': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = suggestInvestigationAnalysis(payload || {});
                    return;

        })();
        return result;
    },
    'processAIQuestion': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = processAIQuestion(payload.question || payload.query, payload.context || {});
                    return;

                // ============================================
                // الإشعارات (Notifications)
                // ============================================

        })();
        return result;
    },
    'addNotification': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = addNotification(payload);
                    return;

        })();
        return result;
    },
    'getUserNotifications': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getUserNotifications(payload.userId || payload.user_id);
                    return;

        })();
        return result;
    },
    'getUnreadNotificationsCount': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getUnreadNotificationsCount(payload.userId || payload.user_id);
                    return;

        })();
        return result;
    },
    'markNotificationAsRead': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = markNotificationAsRead(payload.userId || payload.user_id, payload.notificationId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteNotification': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteNotification(payload.userId || payload.user_id, payload.notificationId || payload.id);
                    return;

                // ============================================
                // إدارة الموديولات (Module Management - Admin Only)
                // ============================================

        })();
        return result;
    },
    'getAllModules': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAllModules();
                    return;

        })();
        return result;
    },
    'getModuleInfo': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getModuleInfo(payload.moduleId || payload.id);
                    return;

        })();
        return result;
    },
    'updateModule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'deleteModule': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

                // ============================================
                // رفع الملفات إلى Google Drive
                // ============================================

        })();
        return result;
    },
    'uploadFileToDrive': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;


        })();
        return result;
    },
    'deleteFileFromDrive': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = deleteFileFromDrive(payload.fileId);
                    return;


        })();
        return result;
    },
    'processAttachmentsForSave': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

                // ============================================
                // النسخ الاحتياطي (Backup System)
                // ============================================

        })();
        return result;
    },
    'createManualBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'createAutomaticBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = createAutomaticBackup();
                    return;

        })();
        return result;
    },
    'getAllBackups': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = getAllBackups(payload.filters || {});
                    return;

        })();
        return result;
    },
    'getBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = getBackup(payload.backupId || payload.id);
                    return;

        })();
        return result;
    },
    'deleteBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'restoreFromBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
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
                    return;

        })();
        return result;
    },
    'setupAutomaticBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = setupAutomaticBackup();
                    return;

        })();
        return result;
    },
    'disableAutomaticBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = disableAutomaticBackup();
                    return;

        })();
        return result;
    },
    'getAutomaticBackupStatus': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getAutomaticBackupStatus();
                    return;

        })();
        return result;
    },
    'getBackupSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getBackupSettings();
                    return;

        })();
        return result;
    },
    'saveBackupSettings': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

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
                    return;

        })();
        return result;
    },
    'getBackupStatistics': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = getBackupStatistics();
                    return;

        })();
        return result;
    },
    'downloadBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }
                    result = downloadBackup(payload.backupId || payload.id);
                    return;

        })();
        return result;
    },
    'importBackup': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }

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
                    return;

        })();
        return result;
    },
    'importBackupFromFile': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
                    var adminFail = actionRequireAdmin_(actorUserData, action);
                    if (adminFail) { result = adminFail; return; }

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
                    return;

        })();
        return result;
    },
    'testBackupSystem': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {

                    result = testBackupSystem();
                    return;

                // ============================================
                // Action غير معترف به
                // ============================================

        })();
        return result;
    },
    'reprocessDailySafetyFormRows': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }

            if (typeof reprocessDailySafetyFormRows !== 'function') {
                result = { success: false, message: 'دالة reprocessDailySafetyFormRows غير متوفرة' };
                return;
            }

            var fromRow = payload && (payload.fromRow != null ? payload.fromRow : payload.from);
            var toRow = payload && (payload.toRow != null ? payload.toRow : payload.to);
            if (fromRow == null || fromRow === '') {
                result = { success: false, message: 'يجب تحديد fromRow (رقم صف بداية النطاق في جدول الفورم)' };
                return;
            }

            result = reprocessDailySafetyFormRows(fromRow, toRow);
            return;
        })();
        return result;
    },
    'syncDailySafetyFormData': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }

            if (typeof processFormDataFromSheet !== 'function') {
                result = { success: false, message: 'دالة processFormDataFromSheet غير متوفرة' };
                return;
            }

            // إصلاح ذاتي للمشغّل الزمني إن ضاع بعد redeploy
            try {
                if (typeof ensureDailySafetySyncTrigger_ === 'function') ensureDailySafetySyncTrigger_();
            } catch (e) {}

            result = processFormDataFromSheet();
            return;
        })();
        return result;
    },
    'repairDailySafetyCheckListSequence': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }

            if (typeof repairDailySafetyCheckListSequence !== 'function') {
                result = { success: false, message: 'دالة repairDailySafetyCheckListSequence غير متوفرة' };
                return;
            }

            result = repairDailySafetyCheckListSequence();
            return;
        })();
        return result;
    },
    'syncDailySafetyCheckListForm': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }

            if (typeof processFormDataFromSheet !== 'function') {
                result = { success: false, message: 'دالة processFormDataFromSheet غير متوفرة' };
                return;
            }

            result = processFormDataFromSheet();
            return;
        })();
        return result;
    },
    'rebuildDailySafetyCheckListFromForm': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        (function() {
            var adminFail = actionRequireAdmin_(actorUserData, action);
            if (adminFail) { result = adminFail; return; }

            if (typeof rebuildAndRepairDailySafetyCheckListFromForm !== 'function') {
                result = { success: false, message: 'دالة rebuildAndRepairDailySafetyCheckListFromForm غير متوفرة' };
                return;
            }

            result = rebuildAndRepairDailySafetyCheckListFromForm();
            return;
        })();
        return result;
    },
};
