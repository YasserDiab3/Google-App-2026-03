/**
 * Google Apps Script for HSE System - Main Entry Point
 * 
 * هذا هو الملف الرئيسي الذي يتعامل مع جميع الطلبات
 *
 * تعليمات الاستخدام:
 * 1. افتح https://script.google.com
 * 2. أنشئ مشروع جديد
 * 3. انسخ جميع الملفات .gs إلى المشروع
 * 4. أنشئ جدول Google Sheets جديد
 * 5. انسخ معرف الجدول من الرابط وأضفه في Config.gs
 * 6. انشر التطبيق: Deploy → New Deployment → Web App
 * 7. اختر "Execute as: Me" و "Who has access: Anyone"
 * 8. انسخ رابط الويب والصقه في إعدادات التطبيق
 *
 * الملفات المطلوبة:
 * - Config.gs (يحتوي على getSpreadsheetId())
 * - Utils.gs (يحتوي على setCorsHeaders(), saveToSheet(), appendToSheet(), readFromSheet(), initializeSheets())
 * - Users.gs (يحتوي على addUserToSheet(), updateUserInSheet())
 * - SafetyHealthManagement.gs (يحتوي على دوال إدارة السلامة والصحة المهنية)
 * - جميع ملفات الموديولات الأخرى
 */

/**
 * ============================================
 * معالجة طلبات POST
 * ============================================
 */
// بصمة نسخة عامة (global) ليصل إليها ActionHandlers وغيره
var BUILD_TAG = 'HSE_WEBAPP_BUILD_2026-06-26_cear_sheet_v292';

function doPost(e) {
    var __t0 = Date.now();
    Logger.log('🚀 [DOPOST] ===== doPost تم استدعاؤها =====');
    Logger.log('🏷️ [DOPOST] BUILD_TAG: ' + BUILD_TAG);
    Logger.log('🚀 [DOPOST] الوقت: ' + new Date().toISOString());
    
    try {
        // ============================================
        // 1. التحقق من وجود الطلب
        // ============================================
        let postData;

        if (!e) {
            Logger.log('Warning: doPost() called but e is null. This may be a CORS preflight or malformed request.');
            const errorResponse = ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'No request data received. Request object is null.',
                errorCode: 'NULL_REQUEST_OBJECT',
                hint: 'الطلب وصل إلى doPost() ولكن بدون بيانات. قد يكون هذا طلب CORS preflight.',
                troubleshooting: {
                    step1: 'إذا كان هذا طلب CORS preflight، فهو متوقع وسيتم إرسال الطلب الفعلي بعد ذلك',
                    step2: 'تحقق من أن الطلب يستخدم POST method بشكل صحيح',
                    step3: 'تأكد من إرسال JSON في body الطلب (ليس فارغاً)',
                    step4: 'تحقق من Content-Type header (يجب أن يكون text/plain;charset=utf-8)',
                    step5: 'تحقق من URL - يجب أن ينتهي بـ /exec وليس /dev',
                    step6: 'أعد نشر Web App إذا استمرت المشكلة',
                    step7: 'افحص Console في المتصفح (F12) لرؤية تفاصيل الطلب المرسل'
                }
            }));
            return setCorsHeaders(errorResponse);
        }

        // ============================================
        // 2. التحقق من وجود البيانات في الطلب
        // ============================================
        Logger.log('doPost() called. e keys: ' + Object.keys(e).join(', '));
        if (e.postData) {
            Logger.log('postData type: ' + e.postData.type);
            Logger.log('postData length: ' + (e.postData.contents ? e.postData.contents.length : 0));
        } else {
            Logger.log('postData is missing. e has keys: ' + Object.keys(e).join(', '));
        }

        if (!e.postData || !e.postData.contents) {
            Logger.log('Warning: No postData received. e keys: ' + Object.keys(e).join(', '));
            const errorResponse = ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'No data received in request body',
                errorCode: 'NO_DATA',
                hint: 'تأكد من إرسال البيانات في body الطلب بتنسيق JSON. قد يكون هذا طلب CORS preflight.',
                received: {
                    hasPostData: !!e.postData,
                    hasContents: !!(e.postData && e.postData.contents),
                    eKeys: Object.keys(e),
                    parameterKeys: e.parameter ? Object.keys(e.parameter) : []
                },
                troubleshooting: {
                    step1: 'إذا كان هذا طلب CORS preflight، فهو متوقع وسيتم إرسال الطلب الفعلي بعد ذلك',
                    step2: 'تحقق من أن الطلب يستخدم POST method',
                    step3: 'تأكد من إرسال JSON في body الطلب (ليس فارغاً)',
                    step4: 'تحقق من Content-Type header (يجب أن يكون text/plain;charset=utf-8)',
                    step5: 'افحص Console في المتصفح (F12) → Network tab → افحص الطلب المرسل',
                    step6: 'تأكد من أن body يحتوي على JSON صحيح: {"action": "...", "data": {...}}'
                }
            }));
            return setCorsHeaders(errorResponse);
        }

        // ============================================
        // 3. تحليل JSON
        // ============================================
        try {
            postData = JSON.parse(e.postData.contents);
        } catch (parseError) {
            Logger.log('Error parsing JSON: ' + parseError.toString());
            Logger.log('Received data (first 200 chars): ' + e.postData.contents.substring(0, 200));
            const errorOutput = ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'Invalid JSON format in request body',
                errorCode: 'JSON_PARSE_ERROR',
                error: parseError.toString(),
                receivedDataPreview: e.postData.contents.substring(0, 200),
                hint: 'تأكد من أن البيانات المرسلة بتنسيق JSON صحيح',
                troubleshooting: {
                    step1: 'تحقق من تنسيق JSON (يجب أن يكون صحيحاً)',
                    step2: 'تأكد من استخدام JSON.stringify() قبل الإرسال',
                    step3: 'تحقق من عدم وجود أحرف خاصة غير صحيحة'
                }
            }));
            return setCorsHeaders(errorOutput);
        }

        // حماية إضافية: حد أقصى لحجم الطلب لتقليل إساءة الاستخدام
        const maxRequestBytes = 1024 * 1024; // 1MB
        if (e.postData.contents.length > maxRequestBytes) {
            Logger.log('Security: Request body too large: ' + e.postData.contents.length + ' bytes');
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'حجم الطلب كبير جداً',
                errorCode: 'REQUEST_TOO_LARGE'
            })));
        }

        if (!postData || typeof postData !== 'object' || Array.isArray(postData)) {
            Logger.log('Security: Invalid request envelope type');
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'صيغة الطلب غير صحيحة',
                errorCode: 'INVALID_REQUEST_ENVELOPE'
            })));
        }

        // ============================================
        // 4. استخراج action و payload
        // ============================================
        let action = postData.action;
        const rawPayload = postData.data || postData;
        const payload = (typeof sanitizeRequestObject === 'function')
            ? sanitizeRequestObject(rawPayload, 0)
            : rawPayload;

        // دمج هوية الطلب (postData.userData) مع payload.userData مع حماية من prototype pollution
        if (postData.userData && typeof postData.userData === 'object' && payload && typeof payload === 'object' && !Array.isArray(payload)) {
            const _safePickUserData = function(src) {
                if (!src || typeof src !== 'object') return {};
                const allowed = ['email', 'id', 'name', 'role', 'permissions'];
                const out = {};
                for (var i = 0; i < allowed.length; i++) {
                    const k = allowed[i];
                    if (Object.prototype.hasOwnProperty.call(src, k) && k !== '__proto__' && k !== 'constructor' && k !== 'prototype') {
                        out[k] = src[k];
                    }
                }
                return out;
            };
            const env = _safePickUserData(postData.userData);
            const innerUd = _safePickUserData(payload.userData);
            payload.userData = Object.assign({}, innerUd, env);
        }

        // ✅ Debug logging لمعرفة ما يتم استخراجه
        Logger.log('🔍 [CODE.GS] postData.action: ' + JSON.stringify(action));
        Logger.log('🏷️ [CODE.GS] BUILD_TAG: ' + BUILD_TAG);
        Logger.log('🔍 [CODE.GS] postData.data exists: ' + !!postData.data);
        Logger.log('🔍 [CODE.GS] postData.data type: ' + typeof postData.data);
        Logger.log('🔍 [CODE.GS] postData.keys: ' + Object.keys(postData || {}).join(', '));
        Logger.log('🔍 [CODE.GS] payload type: ' + typeof payload);
        Logger.log('🔍 [CODE.GS] payload is null: ' + (payload === null));
        Logger.log('🔍 [CODE.GS] payload is undefined: ' + (payload === undefined));
        Logger.log('🔍 [CODE.GS] payload keys: ' + (payload ? Object.keys(payload).join(', ') : 'N/A'));

        // تنظيف action (إزالة المسافات والحروف غير المرئية)
        if (action && typeof action === 'string') {
            action = action.trim();
        }

        // نبضة تسخين خفيفة — تُبقي السكربت دافئاً قبل login (بلا بيانات)
        // الاسم warmup (بدون __) يمرّ عبر نمط action؛ __warmup للتوافق الخلفي
        if (action === 'warmup' || action === '__warmup') {
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: true,
                serverMs: Date.now() - __t0,
                build: BUILD_TAG
            })));
        }

        // اختبار ذاتي لـ MFA/TOTP — بدون CSRF، للتحقق بعد النشر
        if (action === 'mfaSelfTest' && typeof mfaSelfTest_ === 'function') {
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify(mfaSelfTest_())));
        }

        // إعادة بناء وتزامن نموذج المرور اليومي من الخادم تلقائياً
        if (action === 'triggerDailySafetyFormSync') {
            var syncRes = (typeof rebuildAndRepairDailySafetyCheckListFromForm === 'function')
                ? rebuildAndRepairDailySafetyCheckListFromForm()
                : (typeof processFormDataFromSheet === 'function' ? processFormDataFromSheet() : { success: false, message: 'DNE' });
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify(syncRes)));
        }

        // SEC: mfaClearUser / mfaClearCorruptSecrets لم تعد تُنفَّذ هنا بدون مصادقة.
        // المسار الآمن: ActionHandlers + جلسة + CSRF + مدير نظام (strictAdminActions).
        // الاستعادة الطارئة بدون جلسة: clasp run emergencyClearUserMfa / emergencyClearCorruptMfaSecrets

        // حماية إضافية: تقييد شكل action لمنع القيم غير المتوقعة
        const actionPattern = /^[a-zA-Z][a-zA-Z0-9_]{1,79}$/;
        if (typeof action === 'string' && !actionPattern.test(action)) {
            Logger.log('Security: Invalid action format: ' + action);
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'صيغة action غير صالحة',
                errorCode: 'INVALID_ACTION_FORMAT'
            })));
        }

        // التحقق من وجود action
        if (!action || typeof action !== 'string' || action === '') {
            Logger.log('Error: No action provided in request. postData keys: ' + Object.keys(postData).join(', '));
            Logger.log('postData content: ' + JSON.stringify(postData).substring(0, 500));
            const errorOutput = ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'يجب تحديد action في الطلب',
                errorCode: 'ACTION_MISSING',
                received: {
                    action: action,
                    hasAction: !!action,
                    actionType: typeof action,
                    postDataKeys: Object.keys(postData),
                    postDataPreview: JSON.stringify(postData).substring(0, 200)
                },
                hint: 'تأكد من إرسال action في payload. مثال: {"action": "saveToSheet", "data": {...}}',
                troubleshooting: {
                    step1: 'تحقق من أن payload يحتوي على حقل "action"',
                    step2: 'تأكد من أن action هو string وليس null أو undefined',
                    step3: 'تحقق من تنسيق JSON المرسل',
                    step4: 'راجع Execution Logs في Google Apps Script لمزيد من التفاصيل'
                }
            }));
            return setCorsHeaders(errorOutput);
        }

        Logger.log('Processing action: "' + action + '" (length: ' + action.length + ')');
        Logger.log('postData keys: ' + Object.keys(postData).join(', '));
        if (postData.spreadsheetId) {
            Logger.log('spreadsheetId found in postData: ' + postData.spreadsheetId.substring(0, 10) + '...');
        }
        if (payload && payload.spreadsheetId) {
            Logger.log('spreadsheetId found in payload: ' + payload.spreadsheetId.substring(0, 10) + '...');
        }

        // ============================================
        // 5. التحقق من CSRF Token (محسن للأمان)
        // ============================================
        const requestToken = postData.csrfToken || '';
        const clientSessionId = String(postData.clientSessionId || (postData.data && postData.data.clientSessionId) || '').trim();
        const userHint = String(
            (postData.userData && (postData.userData.email || postData.userData.id || postData.userData.name)) ||
            (postData.data && postData.data.email) ||
            ''
        ).trim();
        const requestSessionKey = (typeof buildRequestSessionKey === 'function')
            ? buildRequestSessionKey(action, requestToken, clientSessionId, userHint)
            : [action, requestToken, clientSessionId, userHint].join('|');
        const clientRequestedSkipCSRF = postData.skipCSRFCheck === true || postData.skipCSRF === true;

        // لا نسمح للعميل بتجاوز CSRF نهائياً
        if (clientRequestedSkipCSRF) {
            Logger.log('Security: Client attempted to bypass CSRF check. action=' + action);
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'طلب غير آمن: لا يمكن تجاوز التحقق الأمني',
                errorCode: 'CSRF_BYPASS_REJECTED',
                action: action
            })));
        }

        // قائمة بالـ actions التي لا تتطلب CSRF token (عمليات قراءة عامة فقط — P2.2 مضيّقة)
        const readOnlyActions = [
            'getSafetyTeamMembers', 'getSafetyTeamMember', 'getOrganizationalStructure',
            'getJobDescription', 'getSafetyTeamKPIs', 'getSafetyHealthManagementSettings',
            'getActionTrackingSettings', 'getAllActionTracking', 'getActionTracking',
            'testConnection',
            'warmup',
            'getDocumentCodes', 'getDocumentVersions', 'getDocumentCodeAndVersion',
            // Read-only utility actions
            'getPublicIP',
            // SEC-01: سياسة bootstrap (قراءة فقط — لا أسرار)
            'getAuthBootstrapPolicy',
            // ✅ مؤشر تحديثات المستخدمين (للـ sync الفوري بين الأجهزة)
            'getUsersMeta',
            'triggerDailySafetyFormSync',
            // ✅ طلبات موافقة العيادة — أُخرجت من readOnly (P0.3)
            // getAllMedicationDeletionRequests, getAllSupplyRequests, getAllClinicVisitDeletionRequests
            // ✅ P2.2: أُخرج — getContractorDetailedAnalytics, getEmployeeByCode,
            // getAllContractorApprovalRequests, getAllContractorEvaluationApprovalRequests,
            // getAllContractorDeletionRequests, ensure/repairContractorEvaluationApprovalRequestsSheet
            'getAllAppEmergencyNumbers',
            'getAllIssuingAuthorities',
            'getIssuingAuthoritiesForPermitType',
            'getAllContractorIssuingAuthorities',
            'getContractorIssuingAuthoritiesForPermitType',
            // تشخيص دخان موظفين (عدادات فقط — بدون قائمة كاملة)
            'getEmployeesSheetHealth',
            'getEmployeesLoadSmoke',
            'getPublicObservationConfig', 'getPublicObservationsAnalytics', 'getPublicLivePTWSummary',
            'getHseBroadcastMessages', 'getHseEmergencyContacts'
            // تقرير الجلسات اليومي (قراءة فقط — يتطلب CSRF + مدير)
            // getDailyUserSessionActivityReport, getAllUserActivityLogs, getUserActivityLogs, getLogStatistics, getAllAuditLogs
            // ✅ P2.2: قراءات PPE أُخرجت — تتطلب CSRF + جلسة (مثل باقي القراءات الحساسة)
            // getAllPPE, getPPEMatrix, getAllPPEMatrices, getAllPPEStockItems, getAllPPETransactions, getPPEItemsList
        ];

        // قائمة بالـ actions الحساسة التي تتطلب CSRF token إلزامي
        const sensitiveActions = [
            'saveToSheet', 'appendToSheet', 'deleteFromSheet', 'updateUserInSheet',
            'addUserToSheet', 'addUser', 'deleteUser', 'updateUser', 'changePassword',
            'deleteFromSheet', 'updateSheetData'
        ];
        const strictAdminActions = [
            'addUser', 'deleteUser', 'updateUser', 'resetUserPassword', 'fixUsersSheetHeaders',
            'fixMissingSheetHeaders', 'initializeSheets',
            'fixClinicSheetHeaders', 'mfaClearUser', 'mfaClearCorruptSecrets'
        ];
        const isDeleteAction = (typeof action === 'string') && action.indexOf('delete') === 0;
        const actorUserData = (postData && postData.userData) || (payload && payload.userData) || (payload && payload.user) || null;

        const isReadOnlyAction = readOnlyActions.includes(action);
        const isSensitiveAction = sensitiveActions.includes(action);

        // العمليات المعفاة من CSRF (pre-authentication — لا يمكن أن تملك CSRF token صالح)
        // SEC: أُزيل fixClinicSheetHeaders / mfaClear* — تتطلب جلسة مدير + CSRF
        // SEC: initializeSheets وكتابات HSE الداخلية تتطلب CSRF — كتابات HSE العامة عبر PIN فقط (pinProtectedWriteActions)
        const pinProtectedWriteActions = ['saveHseBroadcastMessages', 'saveHseEmergencyContacts'];
        const csrfExemptActions = ['login', 'verifyMfaLogin', 'warmup', 'testConnection', 'mfaSelfTest', 'getEmployeesSheetHealth', 'getEmployeesLoadSmoke', 'triggerDailySafetyFormSync', 'submitPublicObservation', 'getPublicObservationConfig', 'getPublicObservationsAnalytics', 'setOfficialChampionsApproval', 'getPublicLivePTWSummary', 'submitPublicNearMiss', 'getPublicNearMissConfig', 'submitPublicFireInspection', 'getPublicFireInspectionConfig', 'submitPublicDailySafetyChecklist', 'getPublicDailySafetyConfig', 'submitGateVisitorCheckIn', 'submitGateVisitorCheckOut', 'getActiveGateVisitors', 'getAllGateVisitors', 'repairAllGateVisitorsRows', 'getSecurityOfficersList', 'getHseBroadcastMessages', 'getHseEmergencyContacts'];
        const isPinProtectedWrite = pinProtectedWriteActions.indexOf(action) !== -1;
        const isCsrfExempt = csrfExemptActions.includes(action) || isPinProtectedWrite;

        // التحقق من CSRF Token - إلزامي لجميع العمليات غير القراءة
        if (!isCsrfExempt && (isSensitiveAction || !isReadOnlyAction)) {
            if (!requestToken || requestToken.length < 32) {
                Logger.log('Security: CSRF token missing or too short for action: ' + action);
                const errorOutput = ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'طلب غير آمن: CSRF token مفقود أو غير صحيح',
                    errorCode: 'CSRF_TOKEN_MISSING',
                    action: action
                }));
                return setCorsHeaders(errorOutput);
            }

            // التحقق من تنسيق CSRF Token
            const hexPattern = /^[0-9a-f]{32,}$/i;
            if (!hexPattern.test(requestToken)) {
                Logger.log('Security: CSRF token format invalid for action: ' + action);
                const errorOutput = ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'طلب غير آمن: تنسيق CSRF token غير صحيح',
                    errorCode: 'CSRF_TOKEN_INVALID',
                    action: action
                }));
                return setCorsHeaders(errorOutput);
            }

            // التحقق من CSRF Token باستخدام validateCSRFToken
            if (typeof validateCSRFToken === 'function' && !validateCSRFToken(requestToken, { sessionKey: requestSessionKey, ttlSec: 7200 })) {
                Logger.log('Security: CSRF token validation failed for action: ' + action);
                if (typeof logSecurityEvent === 'function') {
                    logSecurityEvent('csrf_validation_failed', { action: action, session: requestSessionKey, severity: 'high' });
                }
                const errorOutput = ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'طلب غير آمن: فشل التحقق من CSRF token',
                    errorCode: 'CSRF_TOKEN_VALIDATION_FAILED',
                    action: action
                }));
                return setCorsHeaders(errorOutput);
            }
        }

        // حماية أساسية ضد flood/abuse
        if (typeof checkRateLimit === 'function') {
            const rl = checkRateLimit(requestSessionKey, 180, 60);
            if (!rl.allowed) {
                if (typeof logSecurityEvent === 'function') {
                    logSecurityEvent('rate_limit_blocked', { action: action, current: rl.current, limit: rl.limit, severity: 'medium' });
                }
                return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'تم تجاوز الحد المسموح من الطلبات، حاول لاحقاً',
                    errorCode: 'RATE_LIMIT_EXCEEDED'
                })));
            }
        }

        // P2.1 / SEC-04: جلسة خادم موقعة
        // - كتابات (غير readOnly): هوية + sessionToken إلزاميان دائماً
        // - قراءات مع userData: التحقق من الجلسة كما كان
        const sessionExemptActions = [
            'login', 'verifyMfaLogin',
            'testConnection', 'warmup', 'getPublicIP', 'invalidateServerSession',
            'saveHseBroadcastMessages', 'saveHseEmergencyContacts',
            'getAuthBootstrapPolicy', 'mfaSelfTest', 'getEmployeesSheetHealth', 'getEmployeesLoadSmoke',
            'submitPublicObservation', 'getPublicObservationConfig', 'getPublicObservationsAnalytics', 'getPublicLivePTWSummary',
            'submitPublicNearMiss', 'getPublicNearMissConfig',
            'submitPublicFireInspection', 'getPublicFireInspectionConfig',
            'submitPublicDailySafetyChecklist', 'getPublicDailySafetyConfig',
            'submitGateVisitorCheckIn', 'submitGateVisitorCheckOut', 'getActiveGateVisitors', 'getAllGateVisitors', 'repairAllGateVisitorsRows', 'getSecurityOfficersList'
        ];
        const isSessionExempt = sessionExemptActions.indexOf(action) !== -1;
        var needsSessionForWrite = !isReadOnlyAction;
        if (!isSessionExempt && needsSessionForWrite) {
            var hasActorIdentity = !!(actorUserData && (actorUserData.email || actorUserData.id));
            if (!hasActorIdentity) {
                if (typeof logSecurityEvent === 'function') {
                    logSecurityEvent('session_gate_missing_actor', {
                        action: action,
                        severity: 'high'
                    });
                }
                return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'رفض أمني: بيانات المستخدم المنفذ وجلسة صالحة مطلوبان لهذه العملية',
                    errorCode: 'SESSION_ACTOR_REQUIRED',
                    action: action
                })));
            }
            var sessionToken = String(postData.sessionToken || (payload && payload.sessionToken) || '').trim();
            if (typeof validateServerSessionToken_ === 'function') {
                var sessionGate = validateServerSessionToken_(sessionToken, actorUserData);
                if (!sessionGate.ok) {
                    if (typeof logSecurityEvent === 'function') {
                        logSecurityEvent('session_gate_denied', {
                            action: action,
                            errorCode: sessionGate.errorCode,
                            actor: actorUserData.email || actorUserData.id || '',
                            severity: 'high'
                        });
                    }
                    return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                        success: false,
                        message: sessionGate.message || 'جلسة غير صالحة',
                        errorCode: sessionGate.errorCode || 'SESSION_REQUIRED',
                        action: action
                    })));
                }
            }
        }

        // ربط العمليات الإدارية الحرجة بهوية مستخدم واضحة (متوافق مع الإنتاج: لا يطبق إلا على قائمة حرجة)
        if (strictAdminActions.includes(action)) {
            const actor = actorUserData;
            const hasActorIdentity = !!(actor && (actor.email || actor.id || actor.name));
            if (!hasActorIdentity) {
                if (typeof logSecurityEvent === 'function') {
                    logSecurityEvent('missing_actor_identity', { action: action, severity: 'high' });
                }
                return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'رفض أمني: بيانات المستخدم المنفذ مطلوبة لهذه العملية',
                    errorCode: 'ACTOR_IDENTITY_REQUIRED',
                    action: action
                })));
            }
            if (typeof checkAdminPermissionsAuthoritative === 'function' && !checkAdminPermissionsAuthoritative(actor)) {
                if (typeof logSecurityEvent === 'function') {
                    logSecurityEvent('strict_admin_denied', { action: action, actor: actor.email || actor.id || '', severity: 'high' });
                }
                return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'ليس لديك صلاحية لتنفيذ هذه العملية الإدارية.',
                    errorCode: 'STRICT_ADMIN_DENIED',
                    action: action
                })));
            }
        }

        // فرض مركزي: أي عملية حذف لا تُسمح إلا لمدير النظام
        if (isDeleteAction) {
            const hasActorIdentity = !!(actorUserData && (actorUserData.email || actorUserData.id || actorUserData.name));
            if (!hasActorIdentity) {
                if (typeof logSecurityEvent === 'function') {
                    logSecurityEvent('delete_missing_actor_identity', { action: action, severity: 'high' });
                }
                return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'رفض أمني: بيانات المستخدم المنفذ مطلوبة لعمليات الحذف',
                    errorCode: 'DELETE_ACTOR_IDENTITY_REQUIRED',
                    action: action
                })));
            }
            var adminOk = (typeof checkAdminPermissionsAuthoritative === 'function')
                ? checkAdminPermissionsAuthoritative(actorUserData)
                : (typeof checkAdminPermissions === 'function' && checkAdminPermissions(actorUserData));
            if (!adminOk) {
                if (typeof logSecurityEvent === 'function') {
                    logSecurityEvent('delete_permission_denied', {
                        action: action,
                        actor: actorUserData.email || actorUserData.id || actorUserData.name || '',
                        severity: 'high'
                    });
                }
                return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'ليس لديك صلاحية الحذف. الحذف متاح لمدير النظام فقط.',
                    errorCode: 'DELETE_ADMIN_ONLY',
                    action: action
                })));
            }
        }

        // ============================================
        // 6. معالجة الطلب حسب action
        // ============================================
        let result = { success: false, message: '' };

        try {
            if (action === 'submitPublicNearMiss' && typeof submitPublicNearMiss === 'function') {
                result = submitPublicNearMiss(payload || postData.data || postData || {});
            } else if (action === 'getPublicNearMissConfig' && typeof getPublicNearMissConfig === 'function') {
                result = getPublicNearMissConfig();
            } else if (action === 'sendWeeklyDailyObservationsDigest' && typeof sendWeeklyDailyObservationsDigest === 'function') {
                result = sendWeeklyDailyObservationsDigest();
            } else if (action === 'submitPublicObservation' && typeof submitPublicObservation === 'function') {
                result = submitPublicObservation(payload || postData.data || postData || {});
            } else if (action === 'getPublicObservationConfig' && typeof getPublicObservationConfig === 'function') {
                result = getPublicObservationConfig();
            } else if (action === 'getPublicObservationsAnalytics' && typeof getPublicObservationsAnalytics === 'function') {
                result = getPublicObservationsAnalytics(payload || postData.data || postData || {});
            } else if (action === 'setOfficialChampionsApproval' && typeof setOfficialChampionsApproval === 'function') {
                result = setOfficialChampionsApproval(payload || postData.data || postData || {});
            } else if (action === 'getPublicLivePTWSummary' && typeof getPublicLivePTWSummary === 'function') {
                result = getPublicLivePTWSummary(payload || postData.data || postData || {});
            } else if (action === 'submitPublicFireInspection' && typeof submitPublicFireInspection === 'function') {
                result = submitPublicFireInspection(payload || postData.data || postData || {});
            } else if (action === 'getPublicFireInspectionConfig' && typeof getPublicFireInspectionConfig === 'function') {
                result = getPublicFireInspectionConfig(payload || postData.data || postData || {});
            } else if (action === 'submitPublicDailySafetyChecklist' && typeof submitPublicDailySafetyChecklist === 'function') {
                result = submitPublicDailySafetyChecklist(payload || postData.data || postData || {});
            } else if (action === 'getPublicDailySafetyConfig' && typeof getPublicDailySafetyConfig === 'function') {
                result = getPublicDailySafetyConfig();
            } else if (action === 'submitGateVisitorCheckIn' && typeof submitGateVisitorCheckIn === 'function') {
                result = submitGateVisitorCheckIn(payload || postData.data || postData || {});
            } else if (action === 'submitGateVisitorCheckOut' && typeof submitGateVisitorCheckOut === 'function') {
                result = submitGateVisitorCheckOut(payload || postData.data || postData || {});
            } else if (action === 'getActiveGateVisitors' && typeof getActiveGateVisitors === 'function') {
                result = getActiveGateVisitors(payload || postData.data || postData || {});
            } else if (action === 'getAllGateVisitors' && typeof getAllGateVisitors === 'function') {
                result = getAllGateVisitors(payload || postData.data || postData || {});
            } else if (action === 'repairAllGateVisitorsRows' && typeof repairAllGateVisitorsRows === 'function') {
                result = repairAllGateVisitorsRows(payload || postData.data || postData || {});
            } else if (action === 'getSecurityOfficersList' && typeof getSecurityOfficersList === 'function') {
                result = getSecurityOfficersList(payload || postData.data || postData || {});
            } else if (action === 'getHseBroadcastMessages' && typeof getHseBroadcastMessages === 'function') {
                result = getHseBroadcastMessages();
            } else if (action === 'saveHseBroadcastMessages' && typeof saveHseBroadcastMessages === 'function') {
                var hseBroadcastPayload = Object.assign({}, payload || postData.data || postData || {});
                hseBroadcastPayload._actorUserData = actorUserData;
                result = saveHseBroadcastMessages(hseBroadcastPayload);
            } else if (action === 'getHseEmergencyContacts' && typeof getHseEmergencyContacts === 'function') {
                result = getHseEmergencyContacts();
            } else if (action === 'saveHseEmergencyContacts' && typeof saveHseEmergencyContacts === 'function') {
                var hseContactsPayload = Object.assign({}, payload || postData.data || postData || {});
                hseContactsPayload._actorUserData = actorUserData;
                result = saveHseEmergencyContacts(hseContactsPayload);
            } else if (typeof ActionHandlers[action] === 'function') {
                const spreadsheetId = getSpreadsheetId() || postData.spreadsheetId || '';
                result = ActionHandlers[action](payload, postData, action, actorUserData, spreadsheetId);
            } else if (action === 'upsertClinicStaffLeaveQuota' && typeof upsertClinicStaffLeaveQuota === 'function') {
                result = upsertClinicStaffLeaveQuota(payload || {}, actorUserData);
            } else if (action === 'getClinicStaffLeaveBalances' && typeof getClinicStaffLeaveBalances === 'function') {
                result = getClinicStaffLeaveBalances(payload || {}, actorUserData);
            } else if (action === 'verifyMfaLogin' && typeof verifyMfaLogin === 'function') {
                result = verifyMfaLogin(
                    (payload && (payload.challengeToken || payload.token)) || '',
                    (payload && payload.email) || '',
                    (payload && (payload.code || payload.otp)) || ''
                );
            } else if (action === 'startMfaEnrollment' && typeof startMfaEnrollment === 'function') {
                var mfaActor = actorUserData || (postData && postData.userData);
                if (!mfaActor || !mfaActor.email) {
                    result = { success: false, message: 'مطلوب تسجيل الدخول', errorCode: 'AUTH_REQUIRED' };
                } else {
                    result = startMfaEnrollment(mfaActor);
                }
            } else if (action === 'confirmMfaEnrollment' && typeof confirmMfaEnrollment === 'function') {
                var mfaConfirmActor = actorUserData || (postData && postData.userData);
                if (!mfaConfirmActor || !mfaConfirmActor.email) {
                    result = { success: false, message: 'مطلوب تسجيل الدخول', errorCode: 'AUTH_REQUIRED' };
                } else {
                    result = confirmMfaEnrollment((payload && (payload.code || payload.otp)) || '', mfaConfirmActor);
                }
            } else if (action === 'disableMfa' && typeof disableMfa === 'function') {
                var mfaDisableActor = actorUserData || (postData && postData.userData);
                if (!mfaDisableActor || !mfaDisableActor.email) {
                    result = { success: false, message: 'مطلوب تسجيل الدخول', errorCode: 'AUTH_REQUIRED' };
                } else {
                    result = disableMfa(payload || {}, mfaDisableActor);
                }
            } else if (action === 'reconcileMissingApprovedContractors' && typeof reconcileMissingApprovedContractorsFromRequests === 'function') {
                var reconActor = actorUserData || (payload && payload.userData) || (postData && postData.userData) || {};
                result = reconcileMissingApprovedContractorsFromRequests(payload || {}, reconActor);
            } else if (action === 'reprocessDailySafetyFormRows' && typeof reprocessDailySafetyFormRows === 'function') {
                var adminFailDsc = (typeof actionRequireAdmin_ === 'function')
                    ? actionRequireAdmin_(actorUserData, action)
                    : null;
                if (adminFailDsc) {
                    result = adminFailDsc;
                } else {
                    var fromRowDsc = payload && (payload.fromRow != null ? payload.fromRow : payload.from);
                    var toRowDsc = payload && (payload.toRow != null ? payload.toRow : payload.to);
                    if (fromRowDsc == null || fromRowDsc === '') {
                        result = { success: false, message: 'يجب تحديد fromRow (رقم صف بداية النطاق في جدول الفورم)' };
                    } else {
                        result = reprocessDailySafetyFormRows(fromRowDsc, toRowDsc);
                    }
                }
            } else {
                result = {
                    success: false,
                    message: 'الـ action "' + action + '" غير معترف به.',
                    errorCode: 'ACTION_NOT_RECOGNIZED'
                };
            }
        } catch (switchError) {
            if (typeof centralizedLog === 'function') {
                centralizedLog('ERROR', 'Error in ActionHandler', { error: switchError.toString(), action: action });
            }
            result = {
                success: false,
                message: 'خطأ في معالجة الطلب: ' + switchError.toString(),
                errorCode: 'SWITCH_ERROR'
            };
        }

        // إشعار تدقيقي لعمليات الحذف الناجحة (داخل النظام + بريد إلكتروني)
        if (isDeleteAction && result && result.success) {
            try {
                notifyAdminsOnDeleteAction_(action, payload, actorUserData, result);
            } catch (notifyErr) {
                Logger.log('Delete notify warning for action "' + action + '": ' + notifyErr.toString());
            }
        }

        // ============================================
        // 7. إرجاع النتيجة مع CORS headers
        // ============================================
        const output = ContentService.createTextOutput(JSON.stringify(result));
        return setCorsHeaders(output);

    } catch (error) {
        Logger.log('Error in doPost: ' + error.toString());
        Logger.log('Error stack: ' + (error.stack || 'No stack trace'));
        const errorOutput = ContentService.createTextOutput(JSON.stringify({
            success: false,
            message: 'حدث خطأ داخلي في الخادم. يرجى المحاولة لاحقاً.',
            errorCode: 'INTERNAL_ERROR'
        }));
        return setCorsHeaders(errorOutput);
    }
}

function notifyAdminsOnDeleteAction_(action, payload, actorUserData, result) {
    try {
        const spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) return;

        const users = readFromSheet('Users', spreadsheetId);
        if (!users || !Array.isArray(users) || users.length === 0) return;

        const actorName = (actorUserData && (actorUserData.name || actorUserData.email || actorUserData.id)) || 'مستخدم غير معروف';
        const actorId = (actorUserData && (actorUserData.email || actorUserData.id || actorUserData.name)) || '';
        const relatedId = (payload && (payload.id || payload.userId || payload.ptwId || payload.incidentId || payload.recordId || payload.approvedContractorId)) || '';
        const message = 'تم تنفيذ ' + action + ' بواسطة: ' + actorName + (relatedId ? (' | السجل: ' + relatedId) : '');

        const admins = users.filter(function(u) {
            if (!u || u.active === false) return false;
            return (typeof checkAdminPermissions === 'function') ? checkAdminPermissions(u) : false;
        });

        admins.forEach(function(admin) {
            const adminUserId = admin.email || admin.id;
            if (!adminUserId) return;

            if (typeof addNotification === 'function') {
                addNotification({
                    userId: adminUserId,
                    type: 'delete_audit',
                    priority: 'high',
                    title: 'تنبيه حذف في النظام',
                    message: message,
                    relatedId: relatedId || action,
                    relatedType: action
                });
            }

            if (admin.email) {
                try {
                    MailApp.sendEmail({
                        to: admin.email,
                        subject: 'تنبيه حذف - نظام HSE',
                        htmlBody: '<div dir="rtl" style="font-family:Arial,sans-serif;">'
                            + '<h3 style="margin:0 0 8px;">تنبيه تدقيقي لعملية حذف</h3>'
                            + '<p style="margin:0 0 6px;"><b>الإجراء:</b> ' + action + '</p>'
                            + '<p style="margin:0 0 6px;"><b>المنفذ:</b> ' + actorName + '</p>'
                            + '<p style="margin:0 0 6px;"><b>معرف المنفذ:</b> ' + actorId + '</p>'
                            + '<p style="margin:0 0 6px;"><b>المعرّف المرتبط:</b> ' + (relatedId || '-') + '</p>'
                            + '<p style="margin:0;"><b>النتيجة:</b> ' + (result.message || 'تم التنفيذ بنجاح') + '</p>'
                            + '</div>'
                    });
                } catch (mailErr) {
                    Logger.log('Delete audit email failed for ' + admin.email + ': ' + mailErr.toString());
                }
            }
        });
    } catch (error) {
        Logger.log('Error in notifyAdminsOnDeleteAction_: ' + error.toString());
    }
}

/**
 * ============================================
 * معالجة طلبات GET
 * ============================================
 * ملاحظة: يُفضل استخدام POST لجميع العمليات، GET مخصص فقط للقراءة البسيطة
 */
function doGet(e) {
    try {
        // التحقق من وجود postData (قد يحدث إذا كان URL خاطئ)
        if (e && e.postData && e.postData.contents) {
            Logger.log('Warning: POST data received in doGet(). This usually means URL is wrong (ends with /dev instead of /exec)');
            return ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'Invalid request. POST data received in doGet(). URL may be incorrect.',
                errorCode: 'WRONG_URL_ENDPOINT',
                hint: 'URL يجب أن ينتهي بـ /exec وليس /dev. أعد نشر Web App واستخدم رابط /exec',
                troubleshooting: {
                    step1: 'تحقق من URL في الإعدادات - يجب أن ينتهي بـ /exec',
                    step2: 'إذا كان URL ينتهي بـ /dev، استبدله برابط /exec',
                    step3: 'أعد نشر Web App: Deploy → Manage deployments → Edit → New version → Deploy',
                    step4: 'انسخ رابط /exec الجديد والصقه في الإعدادات'
                },
                note: 'ملاحظة: ملف google-apps-script.gs غير مطلوب. الملف الرئيسي هو Code.gs'
            })).setMimeType(ContentService.MimeType.JSON);
        }

        // إذا تم الوصول للرابط مباشرة بدون parameters
        if (!e) {
            return ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'Google Apps Script is running. Please use POST method with action parameter for data operations.',
                info: 'This Web App handles HSE System data operations. Use POST requests with JSON payload.',
                status: 'active'
            })).setMimeType(ContentService.MimeType.JSON);
        }

        // التحقق من وجود parameters
        if (!e.parameter || Object.keys(e.parameter).length === 0) {
            return ContentService.createTextOutput(JSON.stringify({
                success: false,
                status: 'active',
                message: 'وصل الطلب إلى (doGet) بدلاً من (doPost). يرجى التأكد من إعداد النشر "Who has access: Anyone" وأن الرابط ينتهي بـ /exec.',
                errorCode: 'REACHED_DOGET_STATUS',
                info: 'This Web App handles HSE System data operations.',
                usage: {
                    method: 'POST (recommended)',
                    description: 'Use POST method with JSON payload for all data operations',
                    example: {
                        action: 'initializeSheets',
                        data: {
                            spreadsheetId: 'YOUR_SPREADSHEET_ID'
                        }
                    }
                },
                getRequest: {
                    method: 'GET',
                    description: 'For simple data reading only',
                    example: '?action=getData&sheetName=Users&spreadsheetId=YOUR_SPREADSHEET_ID',
                    note: 'GET requests are limited. Use POST for better reliability.'
                },
                currentSpreadsheetId: getSpreadsheetId() || 'Not configured',
                hint: 'To test, add parameters: ?action=getData&sheetName=Users'
            })).setMimeType(ContentService.MimeType.JSON);
        }

        const action = e.parameter.action;
        const sheetName = e.parameter.sheetName;
        const spreadsheetId = e.parameter.spreadsheetId || getSpreadsheetId();
        const getActionPattern = /^[a-zA-Z][a-zA-Z0-9_]{1,79}$/;
        if (action && !getActionPattern.test(String(action))) {
            if (typeof logSecurityEvent === 'function') {
                logSecurityEvent('invalid_get_action_format', { action: String(action), severity: 'medium' });
            }
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'صيغة action غير صالحة في GET',
                errorCode: 'INVALID_GET_ACTION_FORMAT'
            })));
        }

        const allowedGetActions = {
            getData: true,
            getProfileImage: true,
            publicProfileCard: true,
            getPublicProfileData: true,
            publicEmergencyMap: true,
            getPublicEmergencyMapData: true,
            publicEmergencyMapImage: true,
            getPublicObservationConfig: true,
            getPublicFireInspectionConfig: true,
            getActiveGateVisitors: true,
            getSecurityOfficersList: true
        };
        if (action && !allowedGetActions[action]) {
            if (typeof logSecurityEvent === 'function') {
                logSecurityEvent('blocked_get_action', { action: String(action), severity: 'low' });
            }
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'هذا الإجراء غير مسموح عبر GET. استخدم POST.',
                errorCode: 'GET_ACTION_NOT_ALLOWED',
                action: action
            })));
        }

        // تكوين نموذج فحص أجهزة الإطفاء العامة
        if (action === 'getPublicFireInspectionConfig') {
            const configResult = (typeof getPublicFireInspectionConfig === 'function')
                ? getPublicFireInspectionConfig(e.parameter || {})
                : { success: false, message: 'getPublicFireInspectionConfig not defined' };
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify(configResult)).setMimeType(ContentService.MimeType.JSON));
        }

        // تكوين نموذج الملاحظات العامة
        if (action === 'getPublicObservationConfig') {
            const configResult = (typeof getPublicObservationConfig === 'function')
                ? getPublicObservationConfig()
                : { success: false, message: 'getPublicObservationConfig not defined' };
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify(configResult)).setMimeType(ContentService.MimeType.JSON));
        }

        // استرجاع الزوار المتواجدين حالياً بالمصنع
        if (action === 'getActiveGateVisitors') {
            const visitorsResult = (typeof getActiveGateVisitors === 'function')
                ? getActiveGateVisitors(e.parameter || {})
                : { success: false, message: 'getActiveGateVisitors not defined' };
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify(visitorsResult)).setMimeType(ContentService.MimeType.JSON));
        }

        // استرجاع قائمة مسؤولي الأمن الإداري
        if (action === 'getSecurityOfficersList') {
            const officersResult = (typeof getSecurityOfficersList === 'function')
                ? getSecurityOfficersList(e.parameter || {})
                : { success: false, message: 'getSecurityOfficersList not defined' };
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify(officersResult)).setMimeType(ContentService.MimeType.JSON));
        }

        // معالجة طلب getProfileImage: إرجاع صورة الملف الشخصي من Drive كـ data URI (يعمل بعد النشر)
        if (action === 'getProfileImage') {
            const fileId = (e.parameter.id || '').trim();
            if (!fileId) {
                const errOut = ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'معرف الملف (id) مطلوب لـ getProfileImage'
                })).setMimeType(ContentService.MimeType.JSON);
                return setCorsHeaders(errOut);
            }
            try {
                const file = DriveApp.getFileById(fileId);
                const blob = file.getBlob();
                const mimeType = blob.getContentType() || 'image/jpeg';
                const base64 = Utilities.base64Encode(blob.getBytes());
                const dataUri = 'data:' + mimeType + ';base64,' + base64;
                const output = ContentService.createTextOutput(JSON.stringify({
                    success: true,
                    dataUri: dataUri
                })).setMimeType(ContentService.MimeType.JSON);
                return setCorsHeaders(output);
            } catch (err) {
                Logger.log('getProfileImage error for id ' + fileId + ': ' + err.toString());
                const errOut = ContentService.createTextOutput(JSON.stringify({
                    success: false,
                    message: 'الملف غير موجود أو لا يمكن الوصول إليه'
                })).setMimeType(ContentService.MimeType.JSON);
                return setCorsHeaders(errOut);
            }
        }

        // بطاقة الملف العام (HTML) عبر token
        if (action === 'publicProfileCard') {
            const token = String(e.parameter.token || '').trim();
            const profileResult = getPublicProfileByToken(token);
            if (!profileResult || profileResult.success === false || !profileResult.data) {
                const message = (profileResult && profileResult.message) ? profileResult.message : 'الرابط غير صالح أو منتهي الصلاحية';
                const htmlError = HtmlService.createHtmlOutput(
                    '<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Public Profile</title></head><body style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;"><div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;"><h2 style="margin:0 0 8px;color:#0f172a;">تعذر عرض البطاقة</h2><p style="margin:0;color:#475569;">' + message + '</p></div></body></html>'
                );
                return htmlError;
            }

            const p = profileResult.data || {};
            const esc = function(v) {
                return String(v || '')
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;');
            };

            const pubPhoto = p.photoPublic || '';
            const photoIsData = pubPhoto && String(pubPhoto).indexOf('data:') === 0;
            const photoIsHttp = pubPhoto && /^https?:\/\//i.test(String(pubPhoto));
            let photoBlock = '';
            if (photoIsData || photoIsHttp) {
                photoBlock = '<img src="' + esc(pubPhoto) + '" alt="photo" style="width:92px;height:92px;border-radius:999px;object-fit:cover;border:3px solid rgba(255,255,255,.35);box-shadow:0 4px 12px rgba(0,0,0,.2);">';
            } else {
                photoBlock = '<div style="width:92px;height:92px;border-radius:999px;background:rgba(255,255,255,.2);color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;">👤</div>';
            }

            const ecList = p.emergencyContacts || [];
            let emRows = '';
            for (var ei = 0; ei < ecList.length; ei++) {
                const ec = ecList[ei] || {};
                const lab = String(ec.label || 'طوارئ').trim();
                const ph = String(ec.phone || '').trim();
                const tel = ph.replace(/[^\d+]/g, '');
                emRows += '<tr><td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;color:#0f172a;">' + esc(lab) + '</td>'
                    + '<td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;text-align:left;direction:ltr;">'
                    + (ph ? '<a href="tel:' + esc(tel) + '" style="color:#0d9488;font-weight:700;text-decoration:none;">' + esc(ph) + '</a>' : '—')
                    + '</td></tr>';
            }
            const emSection = (emRows)
                ? ('<h3 style="margin:0 0 8px;font-size:15px;color:#0f172a;">أرقام طوارئ المؤسسة</h3>'
                    + '<table style="width:100%;border-collapse:collapse;font-size:14px;"><tbody>' + emRows + '</tbody></table>')
                : '<p style="margin:0;color:#94a3b8;font-size:13px;">لا توجد أرقام طوارئ مسجّلة حالياً</p>';

            const hireBlock = (p.hireDateDisplay) ? (
                '<div style="grid-column:1/-1;border:1px solid #e2e8f0;border-radius:10px;padding:10px;background:#f8fafc;">'
                    + '<div style="color:#64748b;font-size:12px;">تاريخ التعيين</div>'
                    + '<div style="color:#0f172a;font-weight:700;">' + esc(p.hireDateDisplay) + '</div>'
                    + (p.tenureText ? '<div style="color:#475569;font-size:12px;margin-top:4px;">مدة الخدمة: ' + esc(p.tenureText) + '</div>' : '')
                    + '</div>'
            ) : (
                '<div style="grid-column:1/-1;border:1px solid #e2e8f0;border-radius:10px;padding:10px;"><div style="color:#64748b;font-size:12px;">تاريخ التعيين</div><div style="color:#0f172a;font-weight:700;">—</div></div>'
            );

            const html = '<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>بطاقة الموظف</title><style>body{-webkit-text-size-adjust:100%;}</style></head><body style="margin:0;font-family:system-ui,-apple-system,\'Segoe UI\',Arial,sans-serif;background:linear-gradient(180deg,#e0f2f1 0%,#f1f5f9 40%);min-height:100vh;padding:16px;box-sizing:border-box;">'
                + '<div style="max-width:800px;margin:0 auto;">'
                + '<div style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,.08);">'
                + '<div style="padding:20px 22px;background:linear-gradient(125deg,#0f766e 0%,#115e59 50%,#134e4a 100%);color:#fff;">'
                + '<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">'
                + '<div style="flex:1;min-width:200px;">'
                + '<div style="font-size:12px;letter-spacing:.04em;opacity:.85;">بطاقة موظف معتمدة</div>'
                + '<h1 style="margin:6px 0 0;font-size:22px;font-weight:800;">' + esc(p.fullName || '—') + '</h1>'
                + '<p style="margin:6px 0 0;font-size:14px;opacity:.95;">' + esc(p.position || '—') + '</p>'
                + '<p style="margin:4px 0 0;font-size:12px;opacity:.85;">' + esc(p.department || '—') + '</p></div>'
                + photoBlock
                + '</div><p style="margin:12px 0 0;font-size:12px;opacity:.8;">' + esc(p.companyName || 'HSE') + '</p></div>'
                + '<div style="padding:18px 20px 22px;">'
                + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-bottom:12px;">'
                + '<div style="border:1px solid #e2e8f0;border-radius:10px;padding:10px;"><div style="color:#64748b;font-size:12px;">الرقم الوظيفي</div><div style="color:#0f172a;font-weight:700;">' + esc(p.employeeNumber || '—') + '</div></div>'
                + '<div style="border:1px solid #e2e8f0;border-radius:10px;padding:10px;"><div style="color:#64748b;font-size:12px;">الهاتف</div><div style="color:#0f172a;font-weight:700;direction:ltr;text-align:right;">' + esc(p.phone || '—') + '</div></div>'
                + '<div style="border:1px solid #e2e8f0;border-radius:10px;padding:10px;grid-column:1/-1;word-break:break-all;"><div style="color:#64748b;font-size:12px;">البريد الإلكتروني</div><div style="color:#0f172a;font-weight:600;">' + esc(p.email || '—') + '</div></div>'
                + (p.branch ? ('<div style="border:1px solid #e2e8f0;border-radius:10px;padding:10px;"><div style="color:#64748b;font-size:12px;">الفرع</div><div style="color:#0f172a;font-weight:700;">' + esc(p.branch) + '</div></div>') : '')
                + (p.location ? ('<div style="border:1px solid #e2e8f0;border-radius:10px;padding:10px;"><div style="color:#64748b;font-size:12px;">الموقع</div><div style="color:#0f172a;font-weight:700;">' + esc(p.location) + '</div></div>') : '')
                + hireBlock
                + '</div>'
                + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:16px;">'
                + '<div style="border:1px solid #ccfbf1;border-radius:10px;padding:10px;background:#f0fdfa;"><div style="color:#0f766e;font-size:11px;">دورات تدريبية</div><div style="color:#0f172a;font-weight:800;font-size:18px;">' + esc(p.trainingSessions || 0) + '</div></div>'
                + '<div style="border:1px solid #fee2e2;border-radius:10px;padding:10px;background:#fffbeb;"><div style="color:#b45309;font-size:11px;">مخالفات مسجّلة</div><div style="color:#0f172a;font-weight:800;font-size:18px;">' + esc(p.violationsCount || 0) + '</div></div>'
                + '<div style="border:1px solid #e0e7ff;border-radius:10px;padding:10px;background:#f5f3ff;"><div style="color:#4f46e5;font-size:11px;">مهمات وقاية</div><div style="color:#0f172a;font-weight:800;font-size:18px;">' + esc(p.ppeCount || 0) + '</div></div>'
                + '</div>'
                + '<div style="border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;background:#fafafa;">' + emSection + '</div>'
                + '<p style="margin:16px 0 0;font-size:11px;color:#94a3b8;">بطاقة عامة محدودة — لعرض معلومات التعريف الأساسية فقط. لا تُبنى لها صلاحيات دخول للنظام.</p>'
                + '</div></div></div></body></html>';
            return HtmlService.createHtmlOutput(html);
        }

        // API عام (JSON) عبر token - بيانات محدودة
        if (action === 'getPublicProfileData') {
            const token = String(e.parameter.token || '').trim();
            const profileResult = getPublicProfileByToken(token);
            const output = ContentService.createTextOutput(JSON.stringify(profileResult || { success: false, message: 'فشل جلب بيانات الملف العام' }))
                .setMimeType(ContentService.MimeType.JSON);
            return setCorsHeaders(output);
        }

        // خريطة طوارئ عامة (HTML) — بدون تسجيل دخول
        if (action === 'publicEmergencyMap') {
            const planId = String(e.parameter.planId || e.parameter.factoryMap || '').trim();
            const token = String(e.parameter.token || e.parameter.qr || '').trim();
            let scriptBase = '';
            try {
                if (typeof ScriptApp !== 'undefined' && ScriptApp.getService) {
                    scriptBase = String(ScriptApp.getService().getUrl() || '').trim();
                }
            } catch (_scriptErr) { /* ignore */ }
            const html = buildPublicEmergencyMapHtml_(planId, token, scriptBase);
            return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
        }

        if (action === 'getPublicEmergencyMapData') {
            const planId = String(e.parameter.planId || e.parameter.factoryMap || '').trim();
            const token = String(e.parameter.token || e.parameter.qr || '').trim();
            const mapResult = getPublicEmergencyMapData(planId, token);
            const output = ContentService.createTextOutput(JSON.stringify(mapResult || { success: false, message: 'فشل جلب بيانات الخريطة' }))
                .setMimeType(ContentService.MimeType.JSON);
            return setCorsHeaders(output);
        }

        if (action === 'publicEmergencyMapImage') {
            const planId = String(e.parameter.planId || e.parameter.factoryMap || '').trim();
            const token = String(e.parameter.token || e.parameter.qr || '').trim();
            const blob = getPublicEmergencyMapImage(planId, token);
            if (blob) return blob;
            const errOut = ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'تعذر تحميل صورة المخطط'
            })).setMimeType(ContentService.MimeType.JSON);
            return setCorsHeaders(errOut);
        }

        // معالجة طلب getData — مُعطّل في الإنتاج (منع قراءة علنية)
        if (action === 'getData') {
            const deniedOutput = ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'قراءة البيانات عبر GET غير متاحة. استخدم POST مع مصادقة.',
                errorCode: 'GET_READ_DISABLED'
            }));
            return setCorsHeaders(deniedOutput);
        }

        // إذا لم يكن action معروفاً
        const receivedParams = {
            action: action || 'none',
            sheetName: sheetName || 'none',
            spreadsheetId: spreadsheetId ? 'provided' : 'none',
            allParameters: e.parameter
        };
        
        const output = ContentService.createTextOutput(JSON.stringify({
            success: false,
            message: 'Invalid request. This request reached doGet() instead of doPost().',
            errorCode: 'WRONG_HTTP_METHOD',
            received: receivedParams,
            hint: 'Use POST method with action in JSON payload. Make sure URL ends with /exec (not /dev)',
            troubleshooting: {
                step1: 'تحقق من أن URL ينتهي بـ /exec وليس /dev',
                step2: 'تأكد من استخدام POST method وليس GET',
                step3: 'تأكد من إرسال JSON payload مع action و data',
                step4: 'أعد نشر Web App إذا استمرت المشكلة',
                step5: 'تحقق من Execution Logs في Google Apps Script لمزيد من التفاصيل'
            },
            note: 'ملاحظة: ملف google-apps-script.gs غير مطلوب. الملف الرئيسي هو Code.gs',
            supportedGetActions: ['getProfileImage', 'publicProfileCard', 'getPublicProfileData', 'publicEmergencyMap', 'getPublicEmergencyMapData', 'publicEmergencyMapImage'],
            recommendedMethod: 'POST',
            commonIssues: {
                issue1: 'URL ينتهي بـ /dev بدلاً من /exec → استخدم رابط /exec',
                issue2: 'الطلب يتم إرساله كـ GET → استخدم POST method',
                issue3: 'البيانات غير موجودة في body → أرسل JSON في body الطلب',
                issue4: 'Web App غير منشور بشكل صحيح → أعد نشر Web App'
            }
        }));
        return setCorsHeaders(output);

    } catch (error) {
        Logger.log('Error in doGet: ' + error.toString());
        const errorOutput = ContentService.createTextOutput(JSON.stringify({
            success: false,
            message: 'حدث خطأ داخلي في الخادم.'
        }));
        return setCorsHeaders(errorOutput);
    }
}

/**
 * ============================================
 * معالجة طلبات OPTIONS (لـ CORS Preflight)
 * ============================================
 * هذه الدالة مهمة لدعم CORS بشكل صحيح
 * ملاحظة: في بعض الحالات، قد يتم توجيه طلبات OPTIONS إلى doPost() بدلاً من doOptions()
 * لذلك نحتاج للتعامل معها في كلا الدالتين
 */
function doOptions(e) {
    try {
        Logger.log('doOptions() called for CORS preflight request');

        if (e) {
            Logger.log('doOptions() e keys: ' + Object.keys(e).join(', '));
        } else {
            Logger.log('doOptions() called with null e (this is normal for CORS preflight)');
        }

        // Google Apps Script يدعم CORS تلقائياً عند النشر مع "Who has access: Anyone"
        // نرجع استجابة فارغة بنجاح للسماح بـ CORS preflight requests
        // استخدام JSON فارغ بدلاً من string فارغ لضمان MIME type صحيح
        const output = ContentService.createTextOutput('{}');
        output.setMimeType(ContentService.MimeType.JSON);

        // ملاحظة: Google Apps Script يضيف CORS headers تلقائياً عند:
        // 1. نشر Web App مع "Who has access: Anyone"
        // 2. استخدام ContentService.createTextOutput()
        // 3. تعيين MIME type بشكل صحيح

        return output;

    } catch (error) {
        Logger.log('Error in doOptions: ' + error.toString());
        Logger.log('Error stack: ' + (error.stack || 'No stack trace'));

        // حتى في حالة الخطأ، نعيد استجابة مع CORS headers
        const errorOutput = ContentService.createTextOutput(JSON.stringify({
            success: false,
            message: 'Error in doOptions: ' + error.toString(),
            errorCode: 'OPTIONS_ERROR',
            hint: 'حدث خطأ في معالجة طلب CORS preflight'
        }));
        errorOutput.setMimeType(ContentService.MimeType.JSON);
        return errorOutput;
    }
}
