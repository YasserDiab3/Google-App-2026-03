/**
 * Google Apps Script for HSE System - Utility Functions
 * 
 * الدوال المساعدة المشتركة
 */

/**
 * ============================================
 * Error Codes للتحسين
 * ============================================
 */
const ERROR_CODES = {
    INVALID_SPREADSHEET_ID: 'E001',
    INVALID_SHEET_NAME: 'E002',
    INVALID_DATA: 'E003',
    SHEET_NOT_FOUND: 'E004',
    HEADERS_MISSING: 'E005',
    DATA_READ_ERROR: 'E006',
    DATA_WRITE_ERROR: 'E007',
    PERMISSION_DENIED: 'E008',
    UNKNOWN_ERROR: 'E999'
};

/**
 * ============================================
 * نظام Cache بسيط لتحسين الأداء
 * ============================================
 */

// متغير global لحفظ الـ cache خلال نفس الجلسة
var _sessionCache = {};

/**
 * الحصول على بيانات من الـ cache
 * @param {string} key - مفتاح البيانات
 * @param {number} maxAge - العمر الأقصى بالثواني (افتراضي: 60 ثانية)
 * @return {*} - البيانات المحفوظة أو null إذا لم توجد أو انتهت صلاحيتها
 */
function getCachedData(key, maxAge) {
    maxAge = maxAge || 60; // 60 ثانية افتراضياً
    
    try {
        if (_sessionCache[key]) {
            const cached = _sessionCache[key];
            const age = (new Date().getTime() - cached.timestamp) / 1000;
            
            if (age <= maxAge) {
                return cached.data;
            } else {
                // حذف البيانات المنتهية الصلاحية
                delete _sessionCache[key];
            }
        }
    } catch (error) {
        Logger.log('Error getting cached data: ' + error.toString());
    }
    
    return null;
}

/**
 * حفظ بيانات في الـ cache
 * @param {string} key - مفتاح البيانات
 * @param {*} data - البيانات المراد حفظها
 */
function setCachedData(key, data) {
    try {
        _sessionCache[key] = {
            data: data,
            timestamp: new Date().getTime()
        };
    } catch (error) {
        Logger.log('Error setting cached data: ' + error.toString());
    }
}

/**
 * حذف بيانات من الـ cache
 * @param {string} key - مفتاح البيانات
 */
function clearCachedData(key) {
    try {
        if (key) {
            delete _sessionCache[key];
        } else {
            // حذف كل الـ cache
            _sessionCache = {};
        }
    } catch (error) {
        Logger.log('Error clearing cached data: ' + error.toString());
    }
}

/**
 * إعداد CORS headers
 * ملاحظة: Google Apps Script يدعم CORS تلقائياً عند النشر مع "Who has access: Anyone"
 * لكن يمكننا إضافة headers إضافية للتحسين
 * 
 * ⚠️ مهم: للتأكد من عمل CORS بشكل صحيح:
 * 1. افتح Google Apps Script Editor
 * 2. اضغط Deploy > Manage Deployments
 * 3. اضغط Edit (أيقونة القلم) على Deployment الحالي
 * 4. تأكد من:
 *    - Execute as: Me
 *    - Who has access: Anyone (مهم جداً!)
 * 5. اضغط Deploy
 * 6. انسخ الرابط الجديد (يجب أن ينتهي بـ /exec)
 */
function setCorsHeaders(output) {
    if (!output) {
        output = ContentService.createTextOutput('');
    }
    
    try {
        // تعيين MIME type
        output = output.setMimeType(ContentService.MimeType.JSON);
        
        // ملاحظة: Google Apps Script لا يدعم setHeader() مباشرة
        // CORS يتم التعامل معه تلقائياً عند النشر بشكل صحيح
        // لكن يمكننا استخدام HtmlService في بعض الحالات الخاصة
        
        // التأكد من أن output هو ContentService.TextOutput
        // هذا يساعد Google Apps Script على إضافة CORS headers تلقائياً
        
        return output;
    } catch (e) {
        Logger.log('Error in setCorsHeaders: ' + e.toString());
        // حتى في حالة الخطأ، نعيد output مع MIME type صحيح
        try {
            return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.JSON);
        } catch (e2) {
            return output;
        }
    }
}

/**
 * ============================================
 * Public IP (Server-side) - to avoid browser CORS/ETP blocks
 * ============================================
 */
function getPublicIP() {
    try {
        // Cache for a short period to reduce external calls
        const cache = CacheService.getScriptCache();
        const cacheKey = 'hse_public_ip_ipify_v1';
        const cached = cache.get(cacheKey);
        if (cached) {
            return { success: true, data: { ip: cached, source: 'cache' } };
        }

        const url = 'https://api.ipify.org?format=json';
        const resp = UrlFetchApp.fetch(url, {
            method: 'get',
            muteHttpExceptions: true,
            followRedirects: true
        });

        const status = resp.getResponseCode();
        const text = resp.getContentText();
        if (status < 200 || status >= 300) {
            return {
                success: false,
                message: 'Failed to fetch public IP from ipify',
                status: status,
                response: text ? text.substring(0, 200) : ''
            };
        }

        let parsed;
        try {
            parsed = JSON.parse(text);
        } catch (e) {
            return { success: false, message: 'Invalid JSON from ipify', response: text ? text.substring(0, 200) : '' };
        }

        const ip = parsed && parsed.ip ? String(parsed.ip) : '';
        if (!ip) {
            return { success: false, message: 'ipify response missing ip field', response: text ? text.substring(0, 200) : '' };
        }

        // 5 minutes cache
        cache.put(cacheKey, ip, 300);
        return { success: true, data: { ip: ip, source: 'ipify' } };
    } catch (error) {
        Logger.log('Error in getPublicIP: ' + error.toString());
        return { success: false, message: 'Server error while getting public IP', error: error.toString() };
    }
}

/**
 * ============================================
 * نظام Logging محسّن
 * ============================================
 */

/**
 * مستويات Logging
 */
const LOG_LEVELS = {
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    INFO: 'INFO',
    DEBUG: 'DEBUG'
};

/**
 * تسجيل رسالة مع مستوى محدد
 * @param {string} level - مستوى السجل (ERROR, WARNING, INFO, DEBUG)
 * @param {string} message - الرسالة
 * @param {Error} error - كائن الخطأ (اختياري)
 */
function logMessage(level, message, error) {
    try {
        const timestamp = new Date().toISOString();
        let logMessage = '[' + timestamp + '] [' + level + '] ' + message;
        
        if (error) {
            logMessage += '\nError: ' + error.toString();
            if (error.stack) {
                logMessage += '\nStack: ' + error.stack;
            }
        }
        
        Logger.log(logMessage);
        
        // في حالة ERROR، يمكن إضافة إشعارات إضافية هنا
        if (level === LOG_LEVELS.ERROR) {
            // يمكن إضافة إشعارات إضافية للخطأ
        }
    } catch (e) {
        // إذا فشل Logging، نستخدم Logger.log العادي
        Logger.log('Error in logMessage: ' + e.toString());
        Logger.log(message);
    }
}

/**
 * التحقق من CSRF Token (للتحسين الأمني)
 * ملاحظة: بسبب مشكلة CORS مع custom headers في Google Apps Script،
 * نتحقق من CSRF token في payload فقط
 */
function validateCSRFToken(requestToken, options) {
    // دعم التوافق مع الاستدعاء القديم: validateCSRFToken(token)
    options = options || {};

    // إذا لم يتم إرسال token، نرفض الطلب
    if (!requestToken || requestToken.length < 32) {
        return false;
    }

    // التحقق من أن token هو hexadecimal string (SHA-256 hash)
    const hexPattern = /^[0-9a-f]{32,}$/i;
    if (!hexPattern.test(requestToken)) {
        return false;
    }

    // في حال عدم تمرير sessionKey نكتفي بالتوافق القديم
    const sessionKey = String(options.sessionKey || '').trim();
    if (!sessionKey) return true;

    // ربط token بالجلسة مع TTL في CacheService
    const ttlSec = Math.max(300, Math.min(86400, Number(options.ttlSec || 7200)));
    const cacheKey = 'csrf_binding_v2:' + requestToken;
    const cache = CacheService.getScriptCache();

    try {
        const cached = cache.get(cacheKey);
        if (!cached) {
            const payload = {
                sessionKey: sessionKey,
                createdAt: new Date().toISOString()
            };
            cache.put(cacheKey, JSON.stringify(payload), ttlSec);
            return true;
        }

        const parsed = JSON.parse(String(cached));
        if (!parsed || !parsed.sessionKey) return false;

        const storedSessionKey = String(parsed.sessionKey || '');
        if (storedSessionKey === sessionKey) {
            return true;
        }

        // توافق رجعي: صيغة قديمة كانت action|token|session|user
        // الصيغة الجديدة: session|user|tokenPrefix
        const storedParts = storedSessionKey.split('|');
        const reqParts = String(sessionKey).split('|');
        if (storedParts.length >= 4 && reqParts.length >= 3) {
            const legacySession = String(storedParts[2] || '').trim();
            const legacyUser = String(storedParts[3] || '').trim().toLowerCase();
            const legacyTokenPrefix = String(storedParts[1] || '').trim().substring(0, 16);
            const reqSession = String(reqParts[0] || '').trim();
            const reqUser = String(reqParts[1] || '').trim().toLowerCase();
            const reqTokenPrefix = String(reqParts[2] || '').trim();

            if (legacySession === reqSession && legacyUser === reqUser && legacyTokenPrefix === reqTokenPrefix) {
                // ترحيل تلقائي إلى الصيغة الجديدة لتجنب فشل لاحق
                const migratedPayload = {
                    sessionKey: sessionKey,
                    createdAt: parsed.createdAt || new Date().toISOString(),
                    migratedAt: new Date().toISOString(),
                    legacySessionKey: storedSessionKey
                };
                cache.put(cacheKey, JSON.stringify(migratedPayload), ttlSec);
                return true;
            }
        }

        return false;
    } catch (error) {
        Logger.log('validateCSRFToken session-bind error: ' + error.toString());
        return false;
    }
}

/**
 * تنظيف آمن لكائنات الطلب لمنع prototype pollution
 */
function sanitizeRequestObject(input, depth) {
    const maxDepth = 8;
    const currentDepth = Number(depth || 0);
    if (currentDepth > maxDepth) return null;

    if (input === null || input === undefined) return input;

    if (typeof input === 'string') {
        return input.replace(/\u0000/g, '');
    }

    if (typeof input !== 'object') return input;

    if (Array.isArray(input)) {
        return input.map(function(item) {
            return sanitizeRequestObject(item, currentDepth + 1);
        });
    }

    const out = {};
    const blockedKeys = { '__proto__': true, 'constructor': true, 'prototype': true };
    Object.keys(input).forEach(function(key) {
        if (blockedKeys[key]) return;
        out[key] = sanitizeRequestObject(input[key], currentDepth + 1);
    });
    return out;
}

/**
 * تحديد هوية سياقية للطلب (لـ rate-limit و CSRF session binding)
 */
function buildRequestSessionKey(action, token, sessionId, userHint) {
    const tokenPart = String(token || '').trim().substring(0, 16);
    const sessionPart = String(sessionId || '').trim().substring(0, 120);
    const userPart = String(userHint || '').trim().toLowerCase().substring(0, 120);
    return [sessionPart, userPart, tokenPart].join('|');
}

/**
 * SEC-04: إصدار sessionToken موقّع في CacheService بعد login ناجح
 * CacheService TTL الأقصى 21600 ثانية (6 ساعات) — نستخدمه كحد أقصى.
 */
function issueServerSessionToken_(userLike) {
    try {
        var email = '';
        var userId = '';
        if (userLike) {
            email = String(userLike.email || '').trim().toLowerCase();
            userId = userLike.id != null ? String(userLike.id) : '';
        }
        if (!email && !userId) return null;

        var bytes = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
        var token = String(bytes).toLowerCase();
        var ttlSec = 21600; // 6h max CacheService
        var payload = JSON.stringify({
            email: email,
            userId: userId,
            issuedAt: Date.now()
        });
        CacheService.getScriptCache().put('sess_v1:' + token, payload, ttlSec);
        return {
            sessionToken: token,
            expiresAt: Date.now() + (ttlSec * 1000),
            ttlSec: ttlSec
        };
    } catch (e) {
        Logger.log('issueServerSessionToken_ error: ' + e.toString());
        return null;
    }
}

/**
 * التحقق من sessionToken وربطه بهوية المُنفِّذ إن وُجدت
 */
function validateServerSessionToken_(sessionToken, actorUserData) {
    var token = String(sessionToken || '').trim().toLowerCase();
    if (!token || token.length < 32) {
        return { ok: false, errorCode: 'SESSION_TOKEN_MISSING', message: 'مطلوب تسجيل دخول جديد (جلسة الخادم مفقودة).' };
    }
    try {
        var raw = CacheService.getScriptCache().get('sess_v1:' + token);
        if (!raw) {
            return { ok: false, errorCode: 'SESSION_EXPIRED', message: 'انتهت صلاحية الجلسة. أعد تسجيل الدخول.' };
        }
        var data = JSON.parse(raw);
        var actorEmail = '';
        if (actorUserData && actorUserData.email) {
            actorEmail = (typeof normalizeSheetScalarField_ === 'function')
                ? normalizeSheetScalarField_(actorUserData.email).toLowerCase()
                : String(actorUserData.email).trim().toLowerCase();
        }
        if (actorEmail && data.email && actorEmail !== data.email) {
            if (typeof logSecurityEvent === 'function') {
                logSecurityEvent('session_user_mismatch', { actor: actorEmail, sessionEmail: data.email, severity: 'high' });
            }
            return { ok: false, errorCode: 'SESSION_USER_MISMATCH', message: 'رفض أمني: الجلسة لا تطابق المستخدم.' };
        }
        // تمديد انزلاقي
        CacheService.getScriptCache().put('sess_v1:' + token, raw, 21600);
        return { ok: true, session: data };
    } catch (e) {
        Logger.log('validateServerSessionToken_ error: ' + e.toString());
        return { ok: false, errorCode: 'SESSION_VALIDATE_ERROR', message: 'تعذر التحقق من الجلسة.' };
    }
}

function invalidateServerSessionToken_(sessionToken) {
    try {
        var token = String(sessionToken || '').trim().toLowerCase();
        if (!token) return { success: true };
        CacheService.getScriptCache().remove('sess_v1:' + token);
        return { success: true };
    } catch (e) {
        return { success: false, message: e.toString() };
    }
}

/**
 * إرفاق sessionToken بنتيجة login ناجحة (بدون MFA)
 * @param {Object} result
 * @param {Object} userLike
 * @param {{skipSheetTouch?:boolean}=} options — MFA: لا تكتب Users (تجنب قفل الشيت → مهلة → HTML من Google)
 */
function attachServerSessionToLoginResult_(result, userLike, options) {
    try {
        if (!result || result.success !== true || result.mfaRequired) return result;
        options = options || {};
        var sess = issueServerSessionToken_(userLike || result.user);
        if (sess && sess.sessionToken) {
            result.sessionToken = sess.sessionToken;
            result.sessionExpiresAt = sess.expiresAt;
            var uid = userLike && userLike.id != null ? userLike.id : (result.user && result.user.id);
            if (uid != null) {
                // الحضور دائماً في الكاش — ورقة Users لا تحمل حالة اتصال
                if (typeof setPresenceInCache_ === 'function') {
                    setPresenceInCache_(uid, {
                        isOnline: true,
                        lastPresenceAt: new Date().toISOString(),
                        activeSessionId: String(sess.sessionToken).substring(0, 80)
                    });
                }
                // lastLogin سجل تاريخي على الشيت — يُكتب لاحقاً مع أول نبضة حضور، لا داخل طلب الدخول
                if (options.skipSheetTouch) {
                    try {
                        CacheService.getScriptCache().put(
                            'pending_last_login:' + String(uid),
                            new Date().toISOString(),
                            86400
                        );
                    } catch (_pl) { /* ignore */ }
                } else if (typeof _fastTouchUserLoginFields_ === 'function') {
                    try {
                        _fastTouchUserLoginFields_(uid, { lastLogin: new Date().toISOString() });
                    } catch (_touchErr) { /* ignore */ }
                }
            }
        }
    } catch (e) {
        Logger.log('attachServerSessionToLoginResult_ error: ' + e.toString());
    }
    return result;
}

/**
 * Rate limit بسيط باستخدام CacheService
 */
function checkRateLimit(limitKey, limit, windowSec) {
    const maxHits = Math.max(5, Number(limit || 60));
    const windowSeconds = Math.max(10, Number(windowSec || 60));
    const cacheKey = 'rl_v1:' + String(limitKey || 'anon');
    const cache = CacheService.getScriptCache();

    try {
        const raw = cache.get(cacheKey);
        const current = raw ? Number(raw) : 0;
        const next = current + 1;
        cache.put(cacheKey, String(next), windowSeconds);
        return {
            allowed: next <= maxHits,
            current: next,
            limit: maxHits,
            windowSec: windowSeconds
        };
    } catch (error) {
        Logger.log('checkRateLimit error: ' + error.toString());
        return { allowed: true, current: 0, limit: maxHits, windowSec: windowSeconds };
    }
}

/**
 * يقلّص كائن/صفوف البيانات إلى حقول الرؤوس الافتراضية للورقة فقط، مع مطابقة غير حسّاسة لحالة الأحرف.
 * يزيل الحقول غير المعرفة في getDefaultHeaders (مثل locationEntries أو أسماء legacy) فيتجنّب فشل المزامنة
 * عندما تكون نسخة Web App قديمة جزئياً أو يحتوي الطابور المحلي على مفاتيح زائدة.
 */
function clampPayloadToDefaultHeaders(sheetName, data) {
    var safeSheetName = String(sheetName || '').trim();
    if (!safeSheetName || data === null || data === undefined) {
        return data;
    }
    var headers = typeof getDefaultHeaders === 'function' ? (getDefaultHeaders(safeSheetName) || []) : [];
    if (!headers.length) {
        return data;
    }
    var canonByLower = {};
    for (var hi = 0; hi < headers.length; hi++) {
        var hn = String(headers[hi]);
        canonByLower[hn.toLowerCase()] = hn;
    }
    function clampRow(row) {
        if (!row || typeof row !== 'object' || Array.isArray(row)) {
            return row;
        }
        var out = {};
        var keys = Object.keys(row);
        var dropped = [];
        for (var ki = 0; ki < keys.length; ki++) {
            var key = keys[ki];
            var lk = String(key).replace(/^\uFEFF/, '').trim().toLowerCase();
            var canon = canonByLower[lk];
            if (canon) {
                out[canon] = row[key];
            } else {
                dropped.push(String(key));
            }
        }
        if (dropped.length && (safeSheetName === 'PTWRegistry' || safeSheetName === 'PTW')) {
            Logger.log('clampPayloadToDefaultHeaders dropped keys sheet=' + safeSheetName + ': ' +
                dropped.slice(0, 20).join(', ') + (dropped.length > 20 ? ' ...' : ''));
        }
        return out;
    }
    if (Array.isArray(data)) {
        var arrOut = [];
        for (var ai = 0; ai < data.length; ai++) {
            arrOut.push(clampRow(data[ai]));
        }
        return arrOut;
    }
    return clampRow(data);
}

/**
 * فحص عام سريع للبيانات الواردة قبل الكتابة
 */
function validatePayloadForSheetWrite(sheetName, data) {
    const result = { valid: true, message: '' };
    const safeSheetName = String(sheetName || '').trim();
    if (!safeSheetName) {
        return { valid: false, message: 'sheetName مطلوب' };
    }

    const headers = getDefaultHeaders(safeSheetName) || [];
    if (!headers.length) return result; // لا نكسر الوحدات القديمة

    const records = Array.isArray(data) ? data : [data];
    const allowed = {};
    headers.forEach(function(h) { allowed[String(h)] = true; });

    for (var i = 0; i < records.length; i++) {
        const row = records[i];
        if (!row || typeof row !== 'object' || Array.isArray(row)) continue;
        const keys = Object.keys(row);
        for (var k = 0; k < keys.length; k++) {
            const key = keys[k];
            if (!allowed[key]) {
                return {
                    valid: false,
                    message: 'حقل غير مسموح في البيانات: ' + key + ' (sheet=' + safeSheetName + ')'
                };
            }
        }
    }

    return result;
}

/**
 * سجل أمني مركزي لمحاولات الرفض/الهجوم
 */
function logSecurityEvent(eventName, details) {
    try {
        const spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) return;
        const ss = SpreadsheetApp.openById(spreadsheetId);
        const sheetName = 'SecurityAuditLog';
        let sheet = ss.getSheetByName(sheetName);
        if (!sheet) {
            sheet = ss.insertSheet(sheetName);
            sheet.getRange(1, 1, 1, 5).setValues([['timestamp', 'event', 'details', 'source', 'severity']]);
        }

        const payload = details && typeof details === 'object' ? details : { value: String(details || '') };
        sheet.appendRow([
            new Date().toISOString(),
            String(eventName || 'unknown'),
            JSON.stringify(payload).substring(0, 45000),
            'Code.gs',
            String(payload.severity || 'medium')
        ]);
    } catch (error) {
        Logger.log('logSecurityEvent error: ' + error.toString());
    }
}

/**
 * تسجيل أمني خفيف لمسار MFA — Logger دائماً؛ كتابة الشيت فقط إن توفّر القفل فوراً
 */
function logSecurityEventSoft_(eventName, details) {
    try {
        Logger.log('SEC_SOFT ' + String(eventName || '') + ' ' + JSON.stringify(details || {}).substring(0, 500));
        var lock = LockService.getScriptLock();
        if (!lock.tryLock(0)) return;
        try {
            logSecurityEvent(eventName, details);
        } finally {
            try { lock.releaseLock(); } catch (_e) { /* ignore */ }
        }
    } catch (e) {
        Logger.log('logSecurityEventSoft_ error: ' + e.toString());
    }
}

/**
 * ============================================
 * ضوابط الوصول للأوراق والعمليات الإدارية
 * ============================================
 */

/** أوراق لا تُقرأ عبر readFromSheet/batchReadSheets/getData إلا لمدير النظام */
function getAdminOnlyReadSheetNames_() {
    return ['Users', 'UserVersions', 'AuditLog', 'SecurityAuditLog', 'UserActivityLog', 'ClientErrorLog'];
}

/** أوراق لا تُكتب مباشرة عبر saveToSheet/appendToSheet */
function getDirectWriteBlockedSheetNames_() {
    return ['Users', 'UserVersions'];
}

function isAdminOnlyReadSheet_(sheetName) {
    var name = String(sheetName || '').trim();
    if (!name) return false;
    var list = getAdminOnlyReadSheetNames_();
    for (var i = 0; i < list.length; i++) {
        if (list[i] === name) return true;
    }
    return false;
}

function isDirectWriteBlockedSheet_(sheetName) {
    var name = String(sheetName || '').trim();
    if (!name) return false;
    var list = getDirectWriteBlockedSheetNames_();
    for (var i = 0; i < list.length; i++) {
        if (list[i] === name) return true;
    }
    return false;
}

/**
 * فرض هوية منفّذ + صلاحية مدير (مع consult Users sheet عند الإمكان).
 * @returns {{ ok: boolean, success?: boolean, message?: string, errorCode?: string, action?: string }}
 */
function requireAdminActor_(actorUserData, actionName) {
    var action = String(actionName || 'unknown');
    var hasIdentity = !!(actorUserData && (actorUserData.email || actorUserData.id || actorUserData.name));
    if (!hasIdentity) {
        if (typeof logSecurityEvent === 'function') {
            logSecurityEvent('admin_required_missing_identity', { action: action, severity: 'high' });
        }
        return {
            ok: false,
            success: false,
            message: 'رفض أمني: بيانات المستخدم المنفذ مطلوبة لهذه العملية.',
            errorCode: 'ACTOR_IDENTITY_REQUIRED',
            action: action
        };
    }
    var isAdmin = (typeof checkAdminPermissionsAuthoritative === 'function')
        ? checkAdminPermissionsAuthoritative(actorUserData)
        : ((typeof checkAdminPermissions === 'function') && checkAdminPermissions(actorUserData));
    if (!isAdmin) {
        if (typeof logSecurityEvent === 'function') {
            logSecurityEvent('admin_required_denied', {
                action: action,
                actor: actorUserData.email || actorUserData.id || '',
                severity: 'high'
            });
        }
        return {
            ok: false,
            success: false,
            message: 'ليس لديك صلاحية تنفيذ هذه العملية. متاح لمدير النظام فقط.',
            errorCode: 'ADMIN_ONLY',
            action: action
        };
    }
    return { ok: true };
}

/**
 * فرض هوية مسجّل دخول موجودة في ورقة Users (بدون ثقة بـ role من العميل).
 * @returns {{ ok: boolean, success?: boolean, message?: string, errorCode?: string, action?: string, sheetUser?: Object }}
 */
/**
 * ذاكرة مؤقتة لسجلّات المستخدمين خلال نفس تنفيذ الطلب فقط (كل doPost = تنفيذ منفصل في GAS).
 * تمنع قراءة ورقة Users كاملةً بشكل متكرر داخل batchReadSheets (كانت تسبب بطئاً/timeout).
 */
var __AUTH_ACTOR_RECORD_CACHE_ = {};

function getCachedActorRecordByEmail_(email) {
    var e = String(email || '').trim().toLowerCase();
    if (!e) return null;
    if (Object.prototype.hasOwnProperty.call(__AUTH_ACTOR_RECORD_CACHE_, e)) {
        return __AUTH_ACTOR_RECORD_CACHE_[e];
    }
    var rec = (typeof resolveActorRecordFromUsersSheet_ === 'function')
        ? resolveActorRecordFromUsersSheet_({ email: e })
        : ((typeof getUserRecordFromUsersSheetByEmail_ === 'function') ? getUserRecordFromUsersSheetByEmail_(e) : null);
    __AUTH_ACTOR_RECORD_CACHE_[e] = rec;
    return rec;
}

function getCachedActorRecordForActor_(actorUserData) {
    if (!actorUserData) return null;
    var email = (typeof normalizeSheetScalarField_ === 'function')
        ? normalizeSheetScalarField_(actorUserData.email).toLowerCase()
        : String(actorUserData.email || '').trim().toLowerCase();
    if (email && Object.prototype.hasOwnProperty.call(__AUTH_ACTOR_RECORD_CACHE_, email)) {
        return __AUTH_ACTOR_RECORD_CACHE_[email];
    }
    var rec = (typeof resolveActorRecordFromUsersSheet_ === 'function')
        ? resolveActorRecordFromUsersSheet_(actorUserData)
        : getCachedActorRecordByEmail_(email);
    if (email) {
        __AUTH_ACTOR_RECORD_CACHE_[email] = rec;
    }
    return rec;
}

/**
 * SEC-01 مرحلة 1 — Kill-switch خادم لحساب bootstrap (admin@hse.local)
 * الخاصية: HSE_BOOTSTRAP_DISABLED = 'true' | 'false'
 * الافتراضي عند عدم الضبط: false (لا تغيير سلوك حتى التفعيل الصريح).
 * التراجع الفوري: setProperty('HSE_BOOTSTRAP_DISABLED','false')
 */
var HSE_BOOTSTRAP_ADMIN_EMAIL_ = 'admin@hse.local';
var HSE_BOOTSTRAP_DISABLED_PROP_ = 'HSE_BOOTSTRAP_DISABLED';

function isBootstrapEmailServer_(email) {
    try {
        var e = String(email || '').trim().toLowerCase();
        return e === HSE_BOOTSTRAP_ADMIN_EMAIL_;
    } catch (err) {
        return false;
    }
}

function isServerBootstrapDisabled_() {
    try {
        var raw = PropertiesService.getScriptProperties().getProperty(HSE_BOOTSTRAP_DISABLED_PROP_);
        if (raw === null || raw === undefined || raw === '') return false;
        var v = String(raw).trim().toLowerCase();
        return v === 'true' || v === '1' || v === 'yes';
    } catch (e) {
        return false;
    }
}

function getAuthBootstrapPolicy() {
    try {
        var props = PropertiesService.getScriptProperties();
        var raw = props.getProperty(HSE_BOOTSTRAP_DISABLED_PROP_);
        var disabled = isServerBootstrapDisabled_();
        return {
            success: true,
            data: {
                bootstrapDisabled: disabled,
                propertyRaw: raw === null ? null : String(raw),
                bootstrapEmail: HSE_BOOTSTRAP_ADMIN_EMAIL_,
                rollbackHint: "PropertiesService set HSE_BOOTSTRAP_DISABLED=false",
                checkedAt: new Date().toISOString()
            }
        };
    } catch (e) {
        Logger.log('getAuthBootstrapPolicy error: ' + e.toString());
        return { success: false, message: 'getAuthBootstrapPolicy: ' + e.toString() };
    }
}

/** تفعيل kill-switch (مرحلة 1) — لا يمس جلسات المستخدمين الحقيقيين */
function enableSec01Phase1KillSwitch_() {
    try {
        var props = PropertiesService.getScriptProperties();
        props.setProperty(HSE_BOOTSTRAP_DISABLED_PROP_, 'true');
        props.setProperty('HSE_BOOTSTRAP_DISABLED_AT', new Date().toISOString());
        props.setProperty('HSE_BOOTSTRAP_DISABLED_REASON', 'SEC-01 phase1 kill-switch');
        if (typeof logSecurityEvent === 'function') {
            logSecurityEvent('bootstrap_kill_switch_enabled', { severity: 'medium', phase: '1' });
        }
        return getAuthBootstrapPolicy();
    } catch (e) {
        return { success: false, message: 'enableSec01Phase1KillSwitch_: ' + e.toString() };
    }
}

/** تراجع فوري لمرحلة 1 */
function disableSec01Phase1KillSwitch_() {
    try {
        var props = PropertiesService.getScriptProperties();
        props.setProperty(HSE_BOOTSTRAP_DISABLED_PROP_, 'false');
        props.setProperty('HSE_BOOTSTRAP_DISABLED_AT', new Date().toISOString());
        props.setProperty('HSE_BOOTSTRAP_DISABLED_REASON', 'SEC-01 phase1 rollback');
        if (typeof logSecurityEvent === 'function') {
            logSecurityEvent('bootstrap_kill_switch_disabled', { severity: 'medium', phase: '1' });
        }
        return getAuthBootstrapPolicy();
    } catch (e) {
        return { success: false, message: 'disableSec01Phase1KillSwitch_: ' + e.toString() };
    }
}

function requireAuthenticatedActor_(actorUserData, actionName) {
    var action = String(actionName || 'unknown');
    var email = actorUserData && actorUserData.email
        ? ((typeof normalizeSheetScalarField_ === 'function')
            ? normalizeSheetScalarField_(actorUserData.email).toLowerCase()
            : String(actorUserData.email).trim().toLowerCase())
        : '';

    // SEC-01 مرحلة 1: رفض ممثل bootstrap عند تفعيل kill-switch الخادم
    if (email && typeof isBootstrapEmailServer_ === 'function' && isBootstrapEmailServer_(email) &&
        typeof isServerBootstrapDisabled_ === 'function' && isServerBootstrapDisabled_()) {
        if (typeof logSecurityEvent === 'function') {
            logSecurityEvent('bootstrap_actor_rejected', { action: action, actor: email, severity: 'high' });
        }
        return {
            ok: false,
            success: false,
            message: 'حساب التجهيز الافتراضي معطّل من الخادم. استخدم حساباً من قاعدة المستخدمين.',
            errorCode: 'BOOTSTRAP_DISABLED',
            action: action
        };
    }

    if (!email && !(actorUserData && actorUserData.id)) {
        if (typeof logSecurityEvent === 'function') {
            logSecurityEvent('auth_required_missing_email', { action: action, severity: 'high' });
        }
        return {
            ok: false,
            success: false,
            message: 'رفض أمني: بيانات المستخدم المنفذ (email) مطلوبة.',
            errorCode: 'ACTOR_IDENTITY_REQUIRED',
            action: action
        };
    }
    var sheetUser = getCachedActorRecordForActor_(actorUserData);
    if (!sheetUser) {
        if (typeof logSecurityEvent === 'function') {
            logSecurityEvent('auth_required_unknown_user', { action: action, actor: email, severity: 'high' });
        }
        return {
            ok: false,
            success: false,
            message: 'المستخدم غير مسجل في النظام أو البريد غير صحيح.',
            errorCode: 'ACTOR_NOT_REGISTERED',
            action: action
        };
    }
    if (sheetUser.active === false || sheetUser.active === 'false' || sheetUser.active === 'FALSE') {
        return {
            ok: false,
            success: false,
            message: 'حساب المستخدم غير مفعّل.',
            errorCode: 'ACTOR_INACTIVE',
            action: action
        };
    }
    return { ok: true, sheetUser: sheetUser };
}

function checkSheetReadAccess_(sheetName, actorUserData, actionName) {
    var authGate = requireAuthenticatedActor_(actorUserData, actionName || ('read:' + sheetName));
    if (!authGate.ok) return authGate;
    if (!isAdminOnlyReadSheet_(sheetName)) return { ok: true };
    return requireAdminActor_(actorUserData, actionName || ('read:' + sheetName));
}

/**
 * P0.1: كل كتابة مباشرة عبر saveToSheet/appendToSheet تتطلب هوية مسجّلة في Users.
 * أوراق Users/UserVersions تبقى محظورة/مدير كما كانت.
 */
function checkSheetDirectWriteAccess_(sheetName, actorUserData, actionName) {
    var name = String(sheetName || '').trim();
    var action = actionName || ('write:' + (name || 'unknown'));
    var authGate = requireAuthenticatedActor_(actorUserData, action);
    if (!authGate.ok) return authGate;
    if (!isDirectWriteBlockedSheet_(name)) return { ok: true };
    if (name === 'UserVersions') {
        if (typeof logSecurityEvent === 'function') {
            logSecurityEvent('direct_write_blocked', {
                sheet: name,
                action: actionName,
                actor: actorUserData && (actorUserData.email || actorUserData.id || ''),
                severity: 'high'
            });
        }
        return {
            ok: false,
            success: false,
            message: 'الكتابة المباشرة على ورقة UserVersions غير مسموحة. استخدم reportUserVersion.',
            errorCode: 'DIRECT_SHEET_WRITE_BLOCKED',
            sheetName: name
        };
    }
    return requireAdminActor_(actorUserData, action);
}

/**
 * لقطة عدّ صفوف الأوراق للمطابقة مع الواجهة (مدير فقط)
 */
function getDataIntegritySnapshot(payload, actorUserData) {
    var adminGate = requireAdminActor_(actorUserData, 'getDataIntegritySnapshot');
    if (!adminGate.ok) return adminGate;
    var sheets = (payload && Array.isArray(payload.sheetNames)) ? payload.sheetNames : null;
    if (!sheets || sheets.length === 0) {
        sheets = ['Users', 'Incidents', 'NearMiss', 'Employees', 'Training', 'PTW', 'Violations', 'ClinicVisits', 'ApprovedContractors'];
    }
    var spreadsheetId = getSpreadsheetId();
    var counts = {};
    for (var i = 0; i < sheets.length; i++) {
        var name = String(sheets[i] || '').trim();
        if (!name) continue;
        try {
            var data = readFromSheet(name, spreadsheetId);
            counts[name] = Array.isArray(data) ? data.length : 0;
        } catch (e) {
            counts[name] = -1;
        }
    }
    return { success: true, counts: counts, serverTime: new Date().toISOString() };
}

/**
 * إنشاء ورقة جديدة مع الرؤوس الديناميكية
 * @param {Spreadsheet} spreadsheet - جدول البيانات
 * @param {string} sheetName - اسم الورقة
 * @param {object|array} data - البيانات (اختياري - لاستخراج الرؤوس)
 */
function createSheetWithHeaders(spreadsheet, sheetName, data = null) {
    try {
        let sheet = spreadsheet.getSheetByName(sheetName);
        
        if (!sheet) {
            sheet = spreadsheet.insertSheet(sheetName);
            
            // إضافة الرؤوس الديناميكية أو الافتراضية
            const headers = data ? getHeaders(sheetName, data) : getDefaultHeaders(sheetName);
            if (headers && headers.length > 0) {
                sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
                // تنسيق الرؤوس
                const headerRange = sheet.getRange(1, 1, 1, headers.length);
                headerRange.setFontWeight('bold');
                headerRange.setBackground('#f0f0f0');
                headerRange.setFontSize(11);
            }
        }
        
        return sheet;
    } catch (error) {
        Logger.log('Error creating sheet: ' + error.toString());
        throw error;
    }
}

/**
 * تحديث رؤوس الورقة إذا لزم الأمر (ديناميكي)
 */
function ensureSheetHeaders(sheet, sheetName, data) {
    try {
        // الحصول على الرؤوس المطلوبة من البيانات الفعلية
        let requiredHeaders = getHeaders(sheetName, data);
        if (!requiredHeaders || requiredHeaders.length === 0) {
            // إذا لم تكن هناك رؤوس، نستخدم الافتراضية
            requiredHeaders = getDefaultHeaders(sheetName);
        }
        
        // لورقة Users، نتأكد من وجود passwordHash دائماً
        if (sheetName === 'Users') {
            const defaultHeaders = getDefaultHeaders('Users');
            if (!requiredHeaders.includes('passwordHash') && defaultHeaders.includes('passwordHash')) {
                // إضافة passwordHash بعد email إذا كان موجوداً
                const emailIndex = requiredHeaders.indexOf('email');
                if (emailIndex >= 0) {
                    requiredHeaders.splice(emailIndex + 1, 0, 'passwordHash');
                } else {
                    // إذا لم يكن email موجوداً، نضيف passwordHash بعد name
                    const nameIndex = requiredHeaders.indexOf('name');
                    if (nameIndex >= 0) {
                        requiredHeaders.splice(nameIndex + 1, 0, 'passwordHash');
                    } else {
                        // إذا لم يكن name موجوداً، نضيف passwordHash في البداية
                        requiredHeaders.unshift('passwordHash');
                    }
                }
            }
        }
        
        // قراءة الرؤوس الحالية
        let existingHeaders = [];
        try {
            const lastColumn = sheet.getLastColumn();
            if (lastColumn > 0) {
                const headerRange = sheet.getRange(1, 1, 1, lastColumn);
                existingHeaders = headerRange.getValues()[0];
            }
        } catch (e) {
            existingHeaders = [];
        }
        
        // لورقة Users، نتأكد من وجود passwordHash في الرؤوس الحالية
        if (sheetName === 'Users' && existingHeaders.length > 0) {
            if (!existingHeaders.includes('passwordHash')) {
                // إضافة passwordHash إلى الرؤوس الحالية
                const emailIndex = existingHeaders.indexOf('email');
                if (emailIndex >= 0) {
                    existingHeaders.splice(emailIndex + 1, 0, 'passwordHash');
                } else {
                    const nameIndex = existingHeaders.indexOf('name');
                    if (nameIndex >= 0) {
                        existingHeaders.splice(nameIndex + 1, 0, 'passwordHash');
                    } else {
                        existingHeaders.unshift('passwordHash');
                    }
                }
                // تحديث الرؤوس في الورقة
                sheet.getRange(1, 1, 1, existingHeaders.length).setValues([existingHeaders]);
                const headerRange = sheet.getRange(1, 1, 1, existingHeaders.length);
                headerRange.setFontWeight('bold');
                headerRange.setBackground('#f0f0f0');
                headerRange.setFontSize(11);
                Logger.log('Added passwordHash to existing Users sheet headers');
            }
        }
        
        // ✅ إصلاح خاص لشيتات العيادة: إذا كان العمود الأول "Column 1" → نغيّره إلى "id"
        // هذا يمنع إضافة عمود id مكرر في النهاية ويضمن أن البيانات تُكتب في العمود الصحيح
        if ((sheetName === 'ClinicVisits' || sheetName === 'ClinicContractorVisits') &&
            existingHeaders.length > 0 &&
            String(existingHeaders[0] || '').trim() === 'Column 1') {
            existingHeaders[0] = 'id';
            Logger.log('ensureSheetHeaders: fixed Column 1 → id for ' + sheetName);
        }

        // ✅ التحقق من الحاجة للتحديث
        // مهم جداً: لا نغيّر ترتيب الرؤوس الموجودة لورقة Employees تلقائياً
        // لأن تغيير ترتيب الهيدر فقط بدون إعادة ترتيب الأعمدة/البيانات يسبب "تزحلق" القيم (خصوصاً التواريخ)
        // لذلك: نضيف الأعمدة الناقصة فقط، ونحافظ على ترتيب الهيدر الحالي.
        // ولا نعيد الكتابة فقط لأن ترتيب الافتراضي يختلف عن الموجود (كان يسبب قفل Users مع نبضات الحضور).
        let mergedHeaders = existingHeaders.slice(); // دمج على الموجود
        let headersUpdated = false;

        // ✅ إضافة الحقول الجديدة من requiredHeaders إلى existingHeaders (بدون إعادة ترتيب)
        requiredHeaders.forEach(header => {
            if (!mergedHeaders.includes(header)) {
                mergedHeaders.push(header);
                headersUpdated = true;
                Logger.log('Adding new header to ' + sheetName + ': ' + header);
            }
        });
        
        // ✅ إذا كانت الرؤوس فارغة أو أُضيفت أعمدة ناقصة فقط
        const needUpdate = existingHeaders.length === 0 || 
                          existingHeaders[0] === '' || 
                          headersUpdated;
        
        if (needUpdate) {
            // ✅ استخدام mergedHeaders بدلاً من requiredHeaders فقط
            const finalHeaders = mergedHeaders.length > 0 ? mergedHeaders : requiredHeaders;
            
            // تحديث الرؤوس
            sheet.getRange(1, 1, 1, finalHeaders.length).setValues([finalHeaders]);
            
            // تنسيق الرؤوس
            const headerRange = sheet.getRange(1, 1, 1, finalHeaders.length);
            headerRange.setFontWeight('bold');
            headerRange.setBackground('#f0f0f0');
            headerRange.setFontSize(11);
            
            Logger.log('Updated sheet headers for ' + sheetName + ': ' + finalHeaders.join(', '));
            return true; // تم التحديث
        }
        
        return false; // لا حاجة للتحديث
    } catch (error) {
        Logger.log('Error ensuring headers: ' + error.toString());
        return false;
    }
}

/**
 * استخراج الرؤوس من البيانات الفعلية (ديناميكي)
 */
function extractHeadersFromData(data) {
    try {
        if (!data) return [];
        
        // إذا كانت البيانات مصفوفة، نأخذ أول عنصر
        let sampleItem = Array.isArray(data) ? (data.length > 0 ? data[0] : null) : data;
        
        if (!sampleItem || typeof sampleItem !== 'object') return [];
        
        // استخراج جميع المفاتيح من الكائن
        const allKeys = Object.keys(sampleItem);
        const priorityKeys = ['id', 'isoCode', 'title', 'name', 'type', 'code', 'number'];
        const timestampKeys = ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
        
        // فصل المفاتيح حسب الأولوية
        const priority = [];
        const standard = [];
        const timestamps = [];
        
        allKeys.forEach(key => {
            if (priorityKeys.some(pk => key.toLowerCase().includes(pk.toLowerCase()))) {
                priority.push(key);
            } else if (timestampKeys.some(tk => key.toLowerCase().includes(tk.toLowerCase()))) {
                timestamps.push(key);
            } else if (key.startsWith('_') || key === 'password') {
                // تجاهل الحقول الخاصة (password النصية فقط، passwordHash يجب أن يُحفظ)
                return;
            } else {
                standard.push(key);
            }
        });
        
        // ترتيب نهائي: المفاتيح ذات الأولوية، ثم العادية، ثم الطوابع الزمنية
        return [...priority, ...standard, ...timestamps];
    } catch (error) {
        Logger.log('Error extracting headers: ' + error.toString());
        return [];
    }
}

/**
 * ============================================
 * Validation للبيانات
 * ============================================
 */

/**
 * التحقق من صحة البيانات قبل الحفظ
 * @param {object|array} data - البيانات المراد التحقق منها
 * @param {string} sheetName - اسم الورقة
 * @return {object} - كائن يحتوي على نتائج التحقق { valid: boolean, errors: array }
 */
function validateSheetData(data, sheetName) {
    const errors = [];
    
    try {
        // التحقق من وجود البيانات
        if (!data) {
            errors.push('البيانات فارغة أو غير موجودة');
            return { valid: false, errors: errors, errorCode: ERROR_CODES.INVALID_DATA };
        }
        
        // التحقق من نوع البيانات
        if (!Array.isArray(data) && typeof data !== 'object') {
            errors.push('نوع البيانات غير صحيح - يجب أن يكون كائن أو مصفوفة');
            return { valid: false, errors: errors, errorCode: ERROR_CODES.INVALID_DATA };
        }
        
        // إذا كانت مصفوفة، التحقق من كل عنصر
        if (Array.isArray(data)) {
            if (data.length === 0) {
                // مصفوفة فارغة مقبولة
                return { valid: true, errors: [], errorCode: null };
            }
            
            // التحقق من أن جميع العناصر هي كائنات
            data.forEach((item, index) => {
                if (typeof item !== 'object' || item === null || Array.isArray(item)) {
                    errors.push('العنصر في الموضع ' + index + ' ليس كائناً صحيحاً');
                }
            });
        } else {
            // إذا كان كائن واحد، التحقق من أنه ليس null
            if (data === null) {
                errors.push('الكائن فارغ (null)');
            }
        }
        
        // التحقق من وجود الرؤوس للورقة
        if (sheetName) {
            const headers = getDefaultHeaders(sheetName);
            if (!headers || headers.length === 0) {
                // لا نعتبر هذا خطأ - قد تكون ورقة جديدة
                logMessage(LOG_LEVELS.INFO, 'No default headers found for sheet: ' + sheetName);
            }
        }
        
        // إذا كانت هناك أخطاء، نرجعها
        if (errors.length > 0) {
            return { valid: false, errors: errors, errorCode: ERROR_CODES.INVALID_DATA };
        }
        
        return { valid: true, errors: [], errorCode: null };
        
    } catch (error) {
        logMessage(LOG_LEVELS.ERROR, 'Error in validateSheetData: ' + error.toString(), error);
        errors.push('خطأ أثناء التحقق من البيانات: ' + error.toString());
        return { valid: false, errors: errors, errorCode: ERROR_CODES.UNKNOWN_ERROR };
    }
}

/**
 * الحصول على الرؤوس النهائية (الديناميكية أو الافتراضية)
 */
function getHeaders(sheetName, data) {
    // لورقة Users، نستخدم الرؤوس الافتراضية دائماً لضمان وجود password و passwordHash
    if (sheetName === 'Users') {
        const defaultHeaders = getDefaultHeaders('Users');
        // التأكد من وجود password و passwordHash في الرؤوس
        const emailIndex = defaultHeaders.indexOf('email');
        if (emailIndex >= 0) {
            // التأكد من وجود password بعد email
            if (!defaultHeaders.includes('password')) {
                defaultHeaders.splice(emailIndex + 1, 0, 'password');
            }
            // التأكد من وجود passwordHash بعد password
            if (!defaultHeaders.includes('passwordHash')) {
                const passwordIndex = defaultHeaders.indexOf('password');
                if (passwordIndex >= 0) {
                    defaultHeaders.splice(passwordIndex + 1, 0, 'passwordHash');
                } else {
                    defaultHeaders.splice(emailIndex + 2, 0, 'passwordHash');
                }
            }
        } else {
            // إذا لم يكن email موجوداً
            if (!defaultHeaders.includes('password')) {
                defaultHeaders.splice(1, 0, 'password');
            }
            if (!defaultHeaders.includes('passwordHash')) {
                defaultHeaders.splice(2, 0, 'passwordHash');
            }
        }
        return defaultHeaders;
    }

    // ✅ لورقة Employees، نستخدم الرؤوس الافتراضية دائماً لضمان ثبات ترتيب الأعمدة
    // هذا يمنع أي لخبطة/اختلاف في الأعمدة عند الاستيراد أو الحفظ التلقائي
    if (sheetName === 'Employees') {
        return getDefaultHeaders('Employees');
    }

    // ✅ أوراق المقاولين: نستخدم الرؤوس الافتراضية دائماً لتثبيت ترتيب الأعمدة
    // هذا يمنع انزلاق الأعمدة خصوصاً عند التحديث/الاعتماد (updateSingleRowInSheet).
    if (sheetName === 'ContractorApprovalRequests' ||
        sheetName === 'ContractorEvaluationApprovalRequests' ||
        sheetName === 'ContractorDeletionRequests' ||
        sheetName === 'ApprovedContractors' ||
        sheetName === 'ContractorEvaluations' ||
        sheetName === 'ContractorTrainings') {
        return getDefaultHeaders(sheetName);
    }

    // ✅ Clinic visits sheets: enforce default headers to avoid storing JSON blobs (e.g., medications array)
    // and to keep columns stable across sync.
    if (sheetName === 'ClinicVisits' || sheetName === 'ClinicContractorVisits') {
        return getDefaultHeaders(sheetName);
    }

    // ✅ Medications: enforce default headers to keep column order stable across sync
    if (sheetName === 'Medications') {
        return getDefaultHeaders('Medications');
    }

    // ✅ PTWRegistry: نستخدم الرؤوس الافتراضية دائماً لضمان تخزين نص/رقم فقط وتوافق الخلايا
    if (sheetName === 'PTWRegistry') {
        return getDefaultHeaders('PTWRegistry');
    }
    
    // ✅ سجل حضور التدريب للموظفين: ترتيب أعمدة ثابت
    if (sheetName === 'TrainingAttendance') {
        return getDefaultHeaders('TrainingAttendance');
    }

    // ✅ التدريبات القانونية وحضورها: ترتيب أعمدة ثابت
    if (sheetName === 'LegalTrainings' || sheetName === 'LegalTrainingAttendees') {
        return getDefaultHeaders(sheetName);
    }

    // ✅ سجل نشاط المستخدم: رؤوس ثابتة؛ ensureSheetHeaders يضيف الأعمدة الجديدة للأوراق القديمة دون إعادة ترتيب الصفوف
    if (sheetName === 'UserActivityLog') {
        return getDefaultHeaders('UserActivityLog');
    }

    if (sheetName === 'ClientErrorLog') {
        return getDefaultHeaders('ClientErrorLog');
    }

    // ✅ PTW: دمج الرؤوس الافتراضية مع مفاتيح أول صف في البيانات — يضمن ظهور أعمدة جديدة (مثل مسار الاعتماد) حتى لو أقدم صف لا يحتويها
    if (sheetName === 'PTW') {
        const dynamicHeaders = extractHeadersFromData(data);
        const defaults = getDefaultHeaders('PTW');
        if (!dynamicHeaders || dynamicHeaders.length === 0) {
            return defaults;
        }
        const seen = {};
        const merged = [];
        dynamicHeaders.forEach((h) => {
            if (h && !seen[h]) {
                seen[h] = true;
                merged.push(h);
            }
        });
        defaults.forEach((h) => {
            if (h && !seen[h]) {
                seen[h] = true;
                merged.push(h);
            }
        });
        return merged;
    }
    
    // ✅ إعدادات النماذج: رؤوس ثابتة لضمان تطابق الكتابة مع replaceFormSettingsSheetData_
    if (sheetName === 'Form_Sites' || sheetName === 'Form_Places' ||
        sheetName === 'Form_Departments' || sheetName === 'Form_SafetyTeam') {
        return getDefaultHeaders(sheetName);
    }

    // للأوراق الأخرى، نستخدم الرؤوس الديناميكية أو الافتراضية
    const dynamicHeaders = extractHeadersFromData(data);
    if (dynamicHeaders && dynamicHeaders.length > 0) {
        return dynamicHeaders;
    }
    
    // إذا لم تنجح، استخدام الافتراضيات
    return getDefaultHeaders(sheetName);
}

/**
 * ============================================
 * Sheet value helpers (especially Dates)
 * ============================================
 */
function unwrapQuotedString_(s) {
    if (s === null || s === undefined) return '';
    let v = String(s).trim();
    if (!v) return '';
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        try {
            const parsed = JSON.parse(v);
            if (typeof parsed === 'string') return parsed.trim();
        } catch (e) {
            // ignore
        }
        return v.substring(1, v.length - 1).trim();
    }
    return v;
}

function isDateObject_(value) {
    try {
        return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
    } catch (e) {
        return false;
    }
}

function isDateLikeField_(header) {
    const h = String(header || '').trim();
    if (!h) return false;
    // Common timestamp/date fields across the system
    const known = [
        'approvalDate', 'expiryDate',
        'createdAt', 'updatedAt',
        'approvedAt', 'rejectedAt',
        'inspectionDate', 'evaluationDate',
        'lastReview', 'nextReview',
        'date'
    ];
    if (known.includes(h)) return true;
    // heuristic: ends with Date/At
    return /(?:Date|At)$/i.test(h);
}

function isTimestampLikeField_(header) {
    const h = String(header || '').trim();
    if (!h) return false;
    if (/^timestamp$/i.test(h)) return true;
    if (/DateTime$/i.test(h)) return true;
    if (/(?:At)$/i.test(h)) return true;
    if (h === 'lastLogin' || h === 'lastPresenceAt') return true;
    return false;
}

function shouldPreserveSheetDateTimeAsText_(sheetName, header) {
    const sheet = String(sheetName || '').trim();
    const h = String(header || '').trim();
    if (!h) return false;

    // قاعدة عامة: *At / timestamp / *DateTime تُحفظ كنص تاريخ+ساعة
    // يمنع قطع الوقت إلى yyyy-MM-dd ثم ظهور 03:00:00 بتوقيت +3
    if (isTimestampLikeField_(h)) return true;

    const textDateTimeFieldsBySheet = {
        'PTW': ['startDate', 'endDate', 'closureTime'],
        'PTWRegistry': ['openDate', 'timeFrom', 'timeTo', 'closureDate']
    };

    return Array.isArray(textDateTimeFieldsBySheet[sheet]) && textDateTimeFieldsBySheet[sheet].includes(h);
}

function normalizeSheetDateTimeText_(value, timeZone) {
    if (value === null || value === undefined || value === '') return '';

    const tz = String(timeZone || Session.getScriptTimeZone() || 'UTC').trim() || 'UTC';
    const formatDateTimeText = function(dateValue) {
        return Utilities.formatDate(dateValue, tz, "yyyy-MM-dd'T'HH:mm:ss");
    };

    if (isDateObject_(value)) {
        return formatDateTimeText(value);
    }

    const textValue = unwrapQuotedString_(value);
    if (!textValue) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(textValue)) {
        return textValue;
    }

    const parsedDate = new Date(textValue);
    if (!isNaN(parsedDate.getTime())) {
        return formatDateTimeText(parsedDate);
    }

    return textValue;
}

/**
 * ============================================
 * Safe cell formatting (NO JSON in Sheets)
 * ============================================
 */
function safeJoin_(arr, sep) {
    try {
        return (arr || []).filter(v => v !== null && v !== undefined && String(v).trim() !== '').join(sep || ' | ');
    } catch (e) {
        return '';
    }
}

function formatUserSummary_(obj) {
    try {
        if (!obj) return '';
        if (typeof obj === 'string') return obj.trim();
        const name = (obj.name || obj.displayName || '').toString().trim();
        const email = (obj.email || '').toString().trim();
        const id = (obj.id || '').toString().trim();
        const parts = [];
        if (name) parts.push(name);
        if (email) parts.push(email);
        if (!name && id) parts.push(id);
        return safeJoin_(parts, ' - ');
    } catch (e) {
        return '';
    }
}

function formatInvestigationSummary_(inv) {
    try {
        if (!inv) return '';
        // If stored as JSON string from older versions, try parsing
        if (typeof inv === 'string') {
            const s = inv.trim();
            if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) {
                try { inv = JSON.parse(s); } catch (e) { return s; }
            } else {
                return s;
            }
        }
        if (Array.isArray(inv)) {
            return safeJoin_(inv.map(v => formatInvestigationSummary_(v)).filter(Boolean), '\n');
        }
        if (typeof inv !== 'object') return String(inv);

        const lines = [];
        const pushLine = (label, val) => {
            const v = (val === null || val === undefined) ? '' : String(val).trim();
            if (v) lines.push(label + ': ' + v);
        };

        pushLine('رقم التحقيق', inv.investigationNumber);
        pushLine('تاريخ التحقيق', inv.investigationDateTime);
        pushLine('تاريخ الحادث', inv.incidentDateTime);
        pushLine('المصنع', inv.factoryName);
        pushLine('الموقع', inv.locationName);
        pushLine('التبعية', inv.affectedAffiliation);
        pushLine('اسم المصاب', inv.affectedName);
        pushLine('الوظيفة', inv.affectedJob);
        pushLine('الإدارة', inv.affectedDepartment);
        pushLine('مستوى الخطورة', inv.riskLevel);
        pushLine('نتيجة التقييم', inv.riskResult);

        // Keep description as plain text (trim, but don't JSON)
        if (inv.description) {
            const desc = String(inv.description).trim();
            if (desc) lines.push('الوصف: ' + desc);
        }

        // Action plan: just count to avoid long data
        if (Array.isArray(inv.actionPlan) && inv.actionPlan.length > 0) {
            lines.push('خطة العمل: ' + inv.actionPlan.length + ' بند');
        }

        if (inv.rca && typeof inv.rca === 'object') {
            pushLine('منهجية التحقيق', inv.rca.methodLabel || inv.rca.method || '');
            pushLine('السبب الجذري', inv.rca.rootCauseSummary || '');
        }

        return lines.join('\n');
    } catch (e) {
        return '';
    }
}

function formatAttachmentsText_(attachments) {
    try {
        if (!attachments) return '';

        // If old JSON string, parse it
        if (typeof attachments === 'string') {
            const s = attachments.trim();
            if (!s) return '';
            if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('{') && s.endsWith('}'))) {
                try { attachments = JSON.parse(s); } catch (e) { return s; }
            } else {
                return s;
            }
        }

        // If object -> wrap
        if (!Array.isArray(attachments) && typeof attachments === 'object') {
            attachments = [attachments];
        }

        if (!Array.isArray(attachments) || attachments.length === 0) return '';

        const lines = attachments.map((att) => {
            if (!att) return '';
            if (typeof att === 'string') return att.trim();
            const name = (att.name || att.fileName || 'attachment').toString().trim();
            const link = (att.directLink || att.shareableLink || (att.cloudLink && att.cloudLink.url) || att.url || att.data || '').toString().trim();
            if (!link) return '';
            return name ? (name + ' - ' + link) : link;
        }).filter(s => s && s.trim() !== '');

        return lines.join('\n');
    } catch (e) {
        return '';
    }
}

function formatObjectKeyValues_(obj, maxKeys) {
    try {
        if (!obj || typeof obj !== 'object') return '';
        const keys = Object.keys(obj);
        const limited = keys.slice(0, maxKeys || 8);
        const parts = limited.map((k) => {
            const v = obj[k];
            if (v === null || v === undefined) return '';
            if (typeof v === 'object') {
                // avoid JSON; summarize nested objects minimally
                if (Array.isArray(v)) return k + ': ' + (v.length + ' items');
                return k + ': ' + formatUserSummary_(v) || '[object]';
            }
            const s = String(v).trim();
            if (!s) return '';
            return k + ': ' + s;
        }).filter(Boolean);
        return parts.join('\n');
    } catch (e) {
        return '';
    }
}

function toSheetCellValue_(header, value, sheetName) {
    if (value === null || value === undefined) return '';
    if (value === '') return '';
    const h = String(header || '').trim();

    if (shouldPreserveSheetDateTimeAsText_(sheetName, h)) {
        return normalizeSheetDateTimeText_(value);
    }

    // ✅ Preserve Dates as real Date objects so Sheets stores them as dates (not ISO strings)
    if (isDateObject_(value)) {
        return value;
    }

    // ✅ إصلاح نهائي لمشكلة انزياح الوقت (LMT 1899 + spreadsheet timezone):
    // الطريقة الـقديمة (fraction أو Date object) كانت تجعل Google Sheets يفسّر القيمة
    // كـ time serial ويُطبّق timezone conversion بناءً على إعدادات الجدول، وذلك
    // يُضيف انزياحاً يصل إلى ±ساعات (مثل الـ +61 دقيقة من LMT 1899 لـ Cairo/Riyadh).
    //
    // الحل الموثوق 100%: نكتب الوقت كـ **نص خالص** بسابقة apostrophe ('').
    // الـ apostrophe يخبر Sheets أن القيمة text-override، فيخزّنها كنص بدون تفسير
    // زمني أو timezone، ويُجرّد من الـ apostrophe في الإخراج لما يقرأها أي client.
    // النتيجة: round-trip 100% بدون انزياح، بغض النظر عن timezone الجدول.
    const timeOnlyFieldsForWrite_ = ['startTime', 'endTime', 'fromTime', 'toTime', 'timeFrom', 'timeTo'];
    if (timeOnlyFieldsForWrite_.includes(h)) {
        // قبول string أو number (fraction قديم) أو Date object للتطبيع
        var hh = -1, mm = -1;
        if (typeof value === 'string') {
            var s = String(value).trim();
            // إزالة apostrophe البادئ إن وُجد (للسجلات المعاد قراءتها ثم كتابتها)
            if (s.charAt(0) === "'") s = s.slice(1).trim();
            var m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
            if (m) { hh = parseInt(m[1], 10); mm = parseInt(m[2], 10); }
            else if (/^-?0?\.\d+$/.test(s)) {
                // نص يحوي fraction (مثل "0.375")
                var f = parseFloat(s);
                if (isFinite(f) && f >= 0 && f < 1) {
                    var total = Math.round(f * 24 * 60);
                    hh = Math.floor(total / 60) % 24; mm = total % 60;
                }
            } else if (s.indexOf('T') >= 0) {
                // ISO date: نستخرج HH:mm بالـ regex (آمن من timezone)
                var im = s.match(/T(\d{1,2}):(\d{2})/);
                if (im) { hh = parseInt(im[1], 10); mm = parseInt(im[2], 10); }
            }
        } else if (typeof value === 'number' && isFinite(value) && value >= 0 && value < 1) {
            var total2 = Math.round(value * 24 * 60);
            hh = Math.floor(total2 / 60) % 24; mm = total2 % 60;
        } else if (isDateObject_(value)) {
            // Date object → استخدم UTC لتفادي LMT 1899
            hh = value.getUTCHours(); mm = value.getUTCMinutes();
        }
        if (hh >= 0 && hh < 24 && mm >= 0 && mm < 60) {
            // ✅ سابقة apostrophe + HH:mm — يُخزَّن نصاً خالصاً
            return "'" + (hh < 10 ? '0' + hh : '' + hh) + ":" + (mm < 10 ? '0' + mm : '' + mm);
        }
    }

    // ✅ Convert ISO-like strings for date fields to Date objects when possible
    if (isDateLikeField_(header) && typeof value === 'string') {
        const s = unwrapQuotedString_(value);
        if (s) {
            const d = new Date(s);
            if (!isNaN(d.getTime())) {
                return d;
            }
        }
        return s;
    }

    // حقل isActive: يُخزَّن دائماً كنص "active" أو "inactive" للوضوح في قاعدة البيانات
    if (h === 'isActive') {
        if (value === true || value === 'true' || value === 'TRUE' || value === 1 || value === '1' || value === 'active') return 'active';
        if (value === false || value === 'false' || value === 'FALSE' || value === 0 || value === '0' || value === 'inactive') return 'inactive';
        return 'active'; // القيمة الافتراضية
    }

    // Numbers/booleans should stay numeric/boolean in Sheets when possible
    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return value;

    // Attachments: store as human-readable lines (NO JSON)
    if (h === 'attachments') {
        return formatAttachmentsText_(value);
    }

    // evaluationData: JSON كامل لطلبات اعتماد التقييم (CAR / CEAR)
    if (h === 'evaluationData') {
        if (value === null || value === undefined) return '';
        if (typeof value === 'string') {
            var evalStr = value.trim();
            if (!evalStr) return '';
            if ((evalStr.startsWith('{') && evalStr.endsWith('}')) || (evalStr.startsWith('[') && evalStr.endsWith(']'))) {
                return evalStr;
            }
            return evalStr;
        }
        if (typeof value === 'object') {
            try {
                return JSON.stringify(value);
            } catch (evalErr) {
                return '';
            }
        }
        return String(value);
    }

    // Investigation: JSON كامل للحفاظ على RCA وخطوات التحليل (مع ملخص نصي عند الفشل)
    if (h === 'investigation') {
        if (value === null || value === undefined) return '';
        if (typeof value === 'string') {
            const s = value.trim();
            if (!s) return '';
            if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) return s;
            return s;
        }
        if (typeof value === 'object') {
            try {
                return JSON.stringify(value);
            } catch (e) {
                return formatInvestigationSummary_(value);
            }
        }
        return String(value);
    }

    // ✅ إصلاح: Logo - حفظ الشعار كـ string مباشرة (base64 أو رابط)
    if (h === 'logo') {
        if (value && typeof value === 'string' && value.trim() !== '') {
            // إذا كان base64 string كبير جداً (>500KB)، يجب أن يكون قد تم رفعه إلى Drive
            // نحفظه كما هو (سواء كان base64 أو رابط Drive)
            return value.trim();
        }
        return '';
    }

    // Common user objects: store as "Name - Email" (NO JSON)
    if (/(?:^|_)(?:createdBy|updatedBy|approvedBy|rejectedBy)$/i.test(h) || /By$/i.test(h)) {
        if (typeof value === 'object') return formatUserSummary_(value);
    }

    // ✅ Keep full permissions payload in Users sheet (no truncation/summarization)
    if (h === 'permissions') {
        if (typeof value === 'string') return value.trim();
        try {
            return JSON.stringify(value || {});
        } catch (e) {
            return '{}';
        }
    }

    // Arrays: join to readable text (NO JSON)
    if (Array.isArray(value)) {
        // If it's an array of objects, summarize
        const textItems = value.map((v) => {
            if (v === null || v === undefined) return '';
            if (typeof v === 'object') {
                // Special: attachments-like objects
                const maybeLink = v.directLink || v.shareableLink || (v.cloudLink && v.cloudLink.url) || v.url;
                if (maybeLink) return String(maybeLink).trim();
                return formatObjectKeyValues_(v, 6);
            }
            return String(v).trim();
        }).filter(Boolean);
        return textItems.join('\n');
    }

    // Plain objects: summarize key/value pairs (NO JSON)
    if (typeof value === 'object') {
        // Try specific formats first
        const summary = formatUserSummary_(value);
        if (summary) return summary;
        return formatObjectKeyValues_(value, 10);
    }

    return String(value);
}

/**
 * ============================================
 * One-time repair helpers (for sheets affected by older column-order update bug)
 * ============================================
 */
function repairContractorSheets_(sheetName, spreadsheetId = null) {
    try {
        const finalSpreadsheetId = spreadsheetId || getSpreadsheetId();
        const ss = SpreadsheetApp.openById(finalSpreadsheetId);
        const sheet = ss.getSheetByName(sheetName);
        if (!sheet) return { success: false, message: 'Sheet not found: ' + sheetName };

        const lastRow = sheet.getLastRow();
        const lastCol = sheet.getLastColumn();
        if (lastRow <= 1 || lastCol <= 0) return { success: true, message: 'No data to repair in ' + sheetName };

        const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => (h === null || h === undefined) ? '' : String(h).trim());
        const hasAnyHeader = headerRow.some(h => h);
        if (!hasAnyHeader) return { success: false, message: 'No valid headers in ' + sheetName };

        // Build the "old buggy dynamic order" based on the same heuristic previously used (extractHeadersFromData)
        const dummy = {};
        headerRow.forEach(h => {
            if (h) dummy[h] = 1;
        });
        const oldDynamicHeaders = extractHeadersFromData(dummy) || [];
        const dynLen = oldDynamicHeaders.length;

        // If we cannot compute a reasonable mapping, abort
        if (dynLen <= 0) return { success: false, message: 'Could not compute dynamic headers for repair: ' + sheetName };

        const statusValues = ['pending', 'under_review', 'approved', 'rejected'];
        const statusIdx = headerRow.indexOf('status');
        const approvedByIdx = headerRow.indexOf('approvedBy');

        const dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
        const values = dataRange.getValues();
        let repairedCount = 0;

        for (let r = 0; r < values.length; r++) {
            const row = values[r];

            // Safety check: only repair rows that look "shifted"
            let shouldRepair = false;
            if (statusIdx >= 0) {
                const statusVal = String(row[statusIdx] || '').trim().toLowerCase();
                if (!statusValues.includes(statusVal)) {
                    // if status is empty/invalid but approvedBy contains a status-like value => likely shifted
                    if (approvedByIdx >= 0) {
                        const approvedByVal = String(row[approvedByIdx] || '').trim().toLowerCase();
                        if (statusValues.includes(approvedByVal)) shouldRepair = true;
                    }
                }
            }

            if (!shouldRepair) continue;

            const corrected = row.slice();

            // Only the first dynLen columns were affected by the old update logic (it wrote headers.length columns)
            for (let i = 0; i < Math.min(dynLen, headerRow.length); i++) {
                const desiredHeader = headerRow[i];
                if (!desiredHeader) continue;
                const j = oldDynamicHeaders.indexOf(desiredHeader);
                if (j >= 0 && j < row.length) {
                    corrected[i] = row[j];
                }
            }

            // Normalize date fields to Date objects for better sheet formatting
            for (let c = 0; c < corrected.length; c++) {
                const h = headerRow[c];
                if (!h) continue;
                corrected[c] = toSheetCellValue_(h, corrected[c], sheetName);
            }

            values[r] = corrected;
            repairedCount++;
        }

        if (repairedCount > 0) {
            dataRange.setValues(values);
            SpreadsheetApp.flush();
        }

        return { success: true, message: 'Repaired ' + repairedCount + ' rows in ' + sheetName, repairedCount: repairedCount };
    } catch (e) {
        return { success: false, message: 'Repair failed for ' + sheetName + ': ' + e.toString() };
    }
}

function repairContractorApprovalRequestsSheet(spreadsheetId = null) {
    return repairContractorSheets_('ContractorApprovalRequests', spreadsheetId);
}

function repairContractorEvaluationApprovalRequestsSheet(spreadsheetId = null) {
    return repairContractorSheets_('ContractorEvaluationApprovalRequests', spreadsheetId);
}

function repairApprovedContractorsSheet(spreadsheetId = null) {
    return repairContractorSheets_('ApprovedContractors', spreadsheetId);
}

/**
 * ============================================
 * Normalizers (Text / Date) - Used before writing to Sheets
 * ============================================
 */

/**
 * تطبيع نص آمن (يحافظ على الأصفار البادئة ويمنع null/undefined)
 */
function normalizeTextValue(value) {
    if (value === null || value === undefined) return '';
    return String(value).trim();
}

/**
 * تطبيع قيمة النوع (ذكر/أنثى) لضمان التطابق الصحيح
 * يحول القيم المختلفة إلى القيم القياسية: 'ذكر' أو 'أنثى'
 */
function normalizeGenderValue(value) {
    if (value === null || value === undefined) return '';
    
    // تحويل إلى نص وإزالة المسافات الزائدة
    let normalized = String(value).trim().replace(/\s+/g, ' ').trim();
    // إزالة أي أحرف غير مرئية أو خاصة
    normalized = normalized.replace(/[\u200B-\u200D\uFEFF]/g, '');
    
    if (!normalized) return '';
    
    // تحويل لحروف صغيرة للنصوص الإنجليزية
    const genderLower = normalized.toLowerCase();
    // الحصول على أول حرف كبير (للقيم المكونة من حرف واحد فقط)
    const genderFirstChar = normalized.length === 1 ? normalized.toUpperCase() : '';
    
    // التحقق من الذكر
    if (normalized === 'ذكر' || 
        genderLower === 'male' || 
        genderFirstChar === 'M') {
        return 'ذكر';
    }
    
    // التحقق من الأنثى
    if (normalized === 'أنثى' || 
        genderLower === 'female' || 
        genderFirstChar === 'F') {
        return 'أنثى';
    }
    
    // إذا لم يتطابق مع أي قيمة معروفة، نعيد القيمة المطابقة كما هي
    // (قد تكون قيماً أخرى أو فارغة)
    return normalized;
}

/**
 * تحويل التاريخ إلى YYYY-MM-DD بدون مشاكل timezone
 * يدعم: Date / ISO String / YYYY-MM-DD / dd/mm/yyyy / yyyy/mm/dd
 */
function normalizeDateOnlyValue(value) {
    if (value === null || value === undefined || value === '') return '';

    // Date object
    try {
        if (Object.prototype.toString.call(value) === '[object Date]') {
            if (!isNaN(value.getTime())) {
                return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
            }
        }
    } catch (e) {
        // ignore
    }

    let s = String(value).trim();
    if (!s) return '';

    // Unwrap JSON-quoted strings (e.g. "\"2020-01-01T00:00:00.000Z\"")
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
        try {
            const parsed = JSON.parse(s);
            if (typeof parsed === 'string') {
                s = parsed.trim();
            } else {
                // fallback: strip quotes
                s = s.substring(1, s.length - 1).trim();
            }
        } catch (e0) {
            s = s.substring(1, s.length - 1).trim();
        }
        if (!s) return '';
    }

    // Already YYYY-MM-DD (or ISO starting with it)
    const ymd = s.match(/^(\d{4}-\d{2}-\d{2})/);
    if (ymd) return ymd[1];

    // dd/mm/yyyy or dd-mm-yyyy (we assume day-first)
    const dmy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (dmy) {
        const day = ('0' + dmy[1]).slice(-2);
        const month = ('0' + dmy[2]).slice(-2);
        const yearRaw = String(dmy[3]);
        const year = yearRaw.length === 2 ? ('20' + yearRaw) : ('0000' + yearRaw).slice(-4);
        return year + '-' + month + '-' + day;
    }

    // yyyy/mm/dd or yyyy-m-d
    const ymd2 = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (ymd2) {
        const year = ('0000' + ymd2[1]).slice(-4);
        const month = ('0' + ymd2[2]).slice(-2);
        const day = ('0' + ymd2[3]).slice(-2);
        return year + '-' + month + '-' + day;
    }

    // Fallback parse
    try {
        const d = new Date(s);
        if (!isNaN(d.getTime())) {
            return Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        }
    } catch (e2) {
        // ignore
    }

    return '';
}

/**
 * هل القيمة تبدو كتاريخ (وليست معرف موظف/حالة)؟
 * تُستخدم لكشف انزلاق أعمدة Employees بعد append بترتيب رؤوس خاطئ.
 */
function looksLikeEmployeeSheetDateValue_(value) {
    if (value === null || value === undefined || value === '') return false;
    if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) return true;
    const s = String(value).trim();
    if (!s) return false;
    if (s === 'active' || s === 'inactive') return false;
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return true;
    if (/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(s)) return true;
    if (/^\d{1,2}-\d{1,2}-\d{2,4}/.test(s)) return true;
    if (s.indexOf('T') > 0 && !isNaN(new Date(s).getTime())) return true;
    return false;
}

/**
 * كشف صف Employees مكتوب بترتيب الرؤوس الافتراضي القديم على ورقة
 * ترتيبها الفعلي: photo, createdAt, updatedAt, id, status, resignationDate
 * النتيجة الشائعة: createdAt/photo = active، id/status = تواريخ، resignationDate = رقم الموظف
 */
function isEmployeesRowColumnDrifted_(obj) {
    if (!obj || typeof obj !== 'object') return false;
    const empNo = String(obj.employeeNumber || '').trim();
    const id = String(obj.id || '').trim();
    const status = String(obj.status || '').trim();
    const resignationDate = String(obj.resignationDate || '').trim();
    const createdAt = String(obj.createdAt || '').trim();
    const photo = String(obj.photo || '').trim();
    const createdAtIsStatus = (createdAt === 'active' || createdAt === 'inactive');
    const photoIsStatus = (photo === 'active' || photo === 'inactive');
    const statusIsDate = looksLikeEmployeeSheetDateValue_(obj.status);
    const idIsDate = looksLikeEmployeeSheetDateValue_(obj.id);
    const resignationIsEmpNo = !!(empNo && resignationDate && resignationDate === empNo);
    return (createdAtIsStatus || photoIsStatus) && (statusIsDate || idIsDate || resignationIsEmpNo);
}

/**
 * إصلاح صف Employees منزلق الأعمدة (في الذاكرة) دون تغيير الحقول السليمة.
 */
function normalizeEmployeesRowColumnDrift_(obj) {
    if (!isEmployeesRowColumnDrifted_(obj)) return obj;
    const empNo = String(obj.employeeNumber || '').trim();
    const photo = String(obj.photo || '').trim();
    const createdAt = String(obj.createdAt || '').trim();
    const statusRaw = String(obj.status || '').trim();
    const idRaw = String(obj.id || '').trim();
    const resignationDate = String(obj.resignationDate || '').trim();
    const photoIsStatus = (photo === 'active' || photo === 'inactive');
    const createdAtIsStatus = (createdAt === 'active' || createdAt === 'inactive');
    const statusFromMisplaced = photoIsStatus ? photo : (createdAtIsStatus ? createdAt : 'active');
    const dateA = looksLikeEmployeeSheetDateValue_(obj.id) ? obj.id : '';
    const dateB = looksLikeEmployeeSheetDateValue_(obj.status) ? obj.status : '';
    const fixed = {};
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) fixed[k] = obj[k];
    }
    if (photoIsStatus) fixed.photo = '';
    fixed.id = empNo || (resignationDate && !looksLikeEmployeeSheetDateValue_(resignationDate) ? resignationDate : idRaw);
    if (looksLikeEmployeeSheetDateValue_(fixed.id)) {
        fixed.id = empNo || '';
    }
    fixed.status = (statusFromMisplaced === 'inactive') ? 'inactive' : 'active';
    if (createdAtIsStatus || !fixed.createdAt || looksLikeEmployeeSheetDateValue_(statusRaw) && createdAtIsStatus) {
        fixed.createdAt = dateA || dateB || fixed.createdAt || '';
    }
    if (!fixed.updatedAt || String(fixed.updatedAt).trim() === '') {
        fixed.updatedAt = dateB || dateA || fixed.createdAt || '';
    }
    if (resignationDate && empNo && resignationDate === empNo) {
        fixed.resignationDate = '';
    } else if (looksLikeEmployeeSheetDateValue_(resignationDate) && !empNo) {
        // اتركها
    }
    if (fixed.birthDate) {
        fixed.age = calculateAgeYears(fixed.birthDate);
    }
    return fixed;
}

/**
 * حساب العمر بالسنوات من تاريخ ميلاد بصيغة YYYY-MM-DD (أو أي صيغة يمكن تطبيعها)
 */
function calculateAgeYears(birthDateValue) {
    const birth = normalizeDateOnlyValue(birthDateValue);
    if (!birth) return '';

    const m = birth.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return '';

    const by = parseInt(m[1], 10);
    const bm = parseInt(m[2], 10) - 1;
    const bd = parseInt(m[3], 10);

    const birthDate = new Date(by, bm, bd);
    if (isNaN(birthDate.getTime())) return '';

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 0 ? String(age) : '';
}

/**
 * حفظ بيانات في ورقة معينة (استبدال كامل)
 */
function saveToSheet(sheetName, data, spreadsheetId = null) {
    try {
        if (!spreadsheetId) spreadsheetId = getSpreadsheetId();
        
        // التحقق من صحة spreadsheetId
        if (!spreadsheetId || (typeof spreadsheetId === 'string' && spreadsheetId.trim() === '')) {
            return { success: false, message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات.' };
        }
        
        if (!sheetName || (typeof sheetName === 'string' && sheetName.trim() === '')) {
            return { success: false, message: 'اسم الورقة غير محدد.' };
        }
        
        // فتح الجدول
        let spreadsheet;
        try {
            spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        } catch (error) {
            return { success: false, message: 'فشل فتح الجدول. يرجى التحقق من معرف الجدول: ' + error.toString() };
        }
        
        // إنشاء الورقة مع الرؤوس إذا لم تكن موجودة
        let sheet;
        try {
            sheet = createSheetWithHeaders(spreadsheet, sheetName, data);
        } catch (error) {
            return { success: false, message: 'فشل إنشاء/فتح الورقة: ' + error.toString() };
        }

        // 🛡️ Users: دمج الصفوف (upsert-merge) بدل الاستبدال الكامل —
        // يمنع فقدان أعمدة مثل employeeCode عند وصول نسخة محلية قديمة/ناقصة من الفرونت
        // (يعيد كتابة ورق Users كاملة من كاش قديم → كانت تمسح الكود المربوط)
        if (sheetName === 'Users') {
            return saveUsersMergedToSheet_(spreadsheet, sheet, data);
        }
        
        // إذا كانت البيانات مصفوفة فارغة أو غير موجودة
        if (!data || (Array.isArray(data) && data.length === 0)) {
            ensureSheetHeaders(sheet, sheetName, [{}]);
            return { success: true, message: 'تم حفظ البيانات بنجاح (لا توجد بيانات للحفظ)' };
        }

        // الحصول على الرؤوس من البيانات الفعلية
        const headers = getHeaders(sheetName, data);
        if (!headers || headers.length === 0) {
            return { success: false, message: 'لا يمكن استخراج الرؤوس من البيانات المرسلة.' };
        }
        
        // التأكد من تحديث الرؤوس إذا لزم الأمر
        ensureSheetHeaders(sheet, sheetName, data);

        var _ptwRegistryScriptLock = null;
        if (sheetName === 'PTWRegistry') {
            _ptwRegistryScriptLock = LockService.getScriptLock();
            try {
                _ptwRegistryScriptLock.waitLock(45000);
            } catch (lockEx) {
                Logger.log('PTWRegistry saveToSheet lock timeout: ' + lockEx.toString());
                return { success: false, message: 'ازدحام على توليد رقم التصريح. أعد المحاولة بعد لحظات.' };
            }
        }
        var _dailyObsScriptLock = null;
        if (sheetName === 'DailyObservations') {
            _dailyObsScriptLock = LockService.getScriptLock();
            try {
                _dailyObsScriptLock.waitLock(45000);
            } catch (lockEx) {
                Logger.log('DailyObservations saveToSheet lock timeout: ' + lockEx.toString());
                return { success: false, message: 'ازدحام على حفظ الملاحظات اليومية. أعد المحاولة بعد لحظات.' };
            }
        }
        var resolvedPTWRegistryForResponse = null;
        try {

        // معالجة attachments و image/photo قبل الحفظ
        const processDataItem = function(item) {
            if (!item || typeof item !== 'object') return item;
            
            let processed = {};
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    processed[key] = item[key];
                }
            }

            // ✅ تطبيع خاص بورقة Employees لضمان ترتيب وصحة البيانات
            if (sheetName === 'Employees') {
                processed.employeeNumber = normalizeTextValue(processed.employeeNumber);
                processed.sapId = normalizeTextValue(processed.sapId);
                processed.nationalId = normalizeTextValue(processed.nationalId);
                processed.birthDate = normalizeDateOnlyValue(processed.birthDate);
                processed.hireDate = normalizeDateOnlyValue(processed.hireDate);
                processed.job = normalizeTextValue(processed.job || processed.position);
                processed.position = normalizeTextValue(processed.position || processed.job);
                
                // ✅ تطبيع حقل النوع (gender) لضمان التطابق الصحيح
                processed.gender = normalizeGenderValue(processed.gender);

                // ✅ السن (age) محسوب مثل الواجهة الأمامية
                processed.age = calculateAgeYears(processed.birthDate);

                // ✅ تطبيع حقل status (active/inactive) - افتراضي: active
                if (!processed.status || (processed.status !== 'active' && processed.status !== 'inactive')) {
                    processed.status = 'active'; // قيمة افتراضية آمنة
                }
                
                // ✅ تطبيع تاريخ الاستقالة
                processed.resignationDate = normalizeDateOnlyValue(processed.resignationDate || '');

                // مطلوب: id = employeeNumber
                const normalizedEmpNo = normalizeTextValue(processed.employeeNumber);
                processed.id = normalizedEmpNo || normalizeTextValue(processed.id);
            }
            
            // ✅ تطبيع خاص بورقة PTWRegistry لضمان تخزين نص أو رقم فقط (لا JSON ولا objects)
            if (sheetName === 'PTWRegistry') {
                processed = resolvePTWRegistryIdsForWrite_(processed, spreadsheetId);
                processed = resolvePTWRegistryByPaperPermitNumber_(processed, spreadsheetId);
                // permitType: string فقط
                if (processed.permitType !== undefined) {
                    if (Array.isArray(processed.permitType)) {
                        processed.permitType = processed.permitType.join('، ');
                    } else if (typeof processed.permitType === 'object' && processed.permitType !== null) {
                        processed.permitType = String(processed.permitType);
                    } else {
                        processed.permitType = normalizeTextValue(processed.permitType);
                    }
                }
                if (processed.permitTypeDisplay !== undefined) {
                    processed.permitTypeDisplay = normalizeTextValue(processed.permitTypeDisplay);
                }
                // حقول نصية بسيطة
                const textFields = ['requestingParty', 'location', 'sublocation', 'authorizedParty', 'workDescription', 'supervisor1', 'supervisor2', 'status', 'closureReason', 'paperPermitNumber', 'equipment', 'tools', 'toolsList', 'hotWorkOther', 'confinedSpaceOther', 'heightWorkOther', 'electricalWorkType', 'coldWorkType', 'otherWorkType', 'excavationLength', 'excavationWidth', 'excavationDepth', 'soilType', 'ppeNotes', 'riskLikelihood', 'riskConsequence', 'riskLevel', 'riskNotes', 'manualApprovalsText', 'manualClosureApprovalsText', 'approvalCircuitOwnerId', 'approvalCircuitName', 'skipApprovalFlow'];
                textFields.forEach(field => {
                    if (processed[field] !== undefined && processed[field] !== null) {
                        if (typeof processed[field] === 'object') {
                            processed[field] = processed[field].name || processed[field].email || processed[field].id || String(processed[field]);
                        } else {
                            processed[field] = normalizeTextValue(processed[field]);
                        }
                    }
                });
                // locationId, sublocationId: string أو فارغ
                if (processed.locationId !== undefined && processed.locationId !== null) {
                    processed.locationId = String(processed.locationId).trim() || '';
                }
                if (processed.sublocationId !== undefined && processed.sublocationId !== null) {
                    processed.sublocationId = String(processed.sublocationId).trim() || '';
                }
                // totalTime: نص
                if (processed.totalTime !== undefined && processed.totalTime !== null) {
                    processed.totalTime = typeof processed.totalTime === 'object' ? String(processed.totalTime) : String(processed.totalTime).trim();
                }
                // teamMembers (array) -> teamMembersText فقط (لا نخزن المصفوفة)
                if (Array.isArray(processed.teamMembers) && processed.teamMembers.length > 0) {
                    processed.teamMembersText = processed.teamMembers.map(function(m) {
                        if (m && typeof m === 'object') {
                            var name = m.name || m.employeeName || '';
                            var sig = m.signature || m.id || '';
                            return sig ? name + ' (' + sig + ')' : name;
                        }
                        return String(m || '').trim();
                    }).filter(Boolean).join('، ');
                }
                if (processed.teamMembersText !== undefined && processed.teamMembersText !== null && typeof processed.teamMembersText !== 'string') {
                    processed.teamMembersText = String(processed.teamMembersText);
                }
                // مصفوفات طبيعة الأعمال -> نص
                if (Array.isArray(processed.hotWorkDetails)) {
                    processed.hotWorkDetails = processed.hotWorkDetails.join('، ');
                } else if (processed.hotWorkDetails !== undefined && typeof processed.hotWorkDetails !== 'string') {
                    processed.hotWorkDetails = normalizeTextValue(processed.hotWorkDetails);
                }
                if (Array.isArray(processed.confinedSpaceDetails)) {
                    processed.confinedSpaceDetails = processed.confinedSpaceDetails.join('، ');
                } else if (processed.confinedSpaceDetails !== undefined && typeof processed.confinedSpaceDetails !== 'string') {
                    processed.confinedSpaceDetails = normalizeTextValue(processed.confinedSpaceDetails);
                }
                if (Array.isArray(processed.heightWorkDetails)) {
                    processed.heightWorkDetails = processed.heightWorkDetails.join('، ');
                } else if (processed.heightWorkDetails !== undefined && typeof processed.heightWorkDetails !== 'string') {
                    processed.heightWorkDetails = normalizeTextValue(processed.heightWorkDetails);
                }
                if (Array.isArray(processed.requiredPPE)) {
                    processed.requiredPPE = processed.requiredPPE.join('، ');
                } else if (processed.requiredPPE !== undefined && typeof processed.requiredPPE !== 'string') {
                    processed.requiredPPE = normalizeTextValue(processed.requiredPPE);
                }
                // riskScore: رقم
                if (processed.riskScore !== undefined && processed.riskScore !== null && processed.riskScore !== '') {
                    var rs = processed.riskScore;
                    processed.riskScore = (typeof rs === 'number' && !isNaN(rs)) ? rs : (parseFloat(String(rs).trim()) || '');
                }
                // قيم منطقية: نبقيه boolean (Sheets يقبلها)
                ['preStartChecklist', 'lotoApplied', 'governmentPermits', 'riskAssessmentAttached', 'gasTesting', 'mocRequest', 'isManualEntry'].forEach(function(f) {
                    if (processed[f] !== undefined) {
                        processed[f] = processed[f] === true || processed[f] === 'true' || processed[f] === 1;
                    }
                });
                resolvedPTWRegistryForResponse = processed;
            }
            
            // ✅ Attachments: store as plain text (NO JSON)
            if (processed.attachments !== undefined) {
                processed.attachments = formatAttachmentsText_(processed.attachments);
            }
            
            // معالجة image - إذا كانت Base64، نرفعها إلى Google Drive
            if (processed.image && typeof processed.image === 'string' && processed.image.startsWith('data:')) {
                try {
                    const moduleName = sheetName === 'Incidents' ? 'Incidents' : 
                                     sheetName === 'NearMiss' ? 'NearMiss' :
                                     sheetName === 'Violations' ? 'Violations' :
                                     sheetName === 'DailyObservations' ? 'DailyObservations' : sheetName;
                    const uploadResult = uploadFileToDrive(
                        processed.image,
                        (moduleName.toLowerCase() + '_' + (processed.id || Utilities.getUuid()) + '_' + Date.now() + '.jpg'),
                        'image/jpeg',
                        moduleName
                    );
                    if (uploadResult && uploadResult.success) {
                        processed.image = uploadResult.directLink || uploadResult.shareableLink || processed.image;
                    }
                } catch (imageError) {
                    Logger.log('خطأ في رفع صورة في saveToSheet: ' + imageError.toString());
                }
            }
            
            // معالجة photo - إذا كانت Base64، نرفعها إلى Google Drive
            if (processed.photo && typeof processed.photo === 'string' && processed.photo.startsWith('data:')) {
                try {
                    const moduleName = sheetName === 'Violations' ? 'Violations' : 
                                     sheetName === 'Blacklist_Register' ? 'Blacklist_Register' : sheetName;
                    const uploadResult = uploadFileToDrive(
                        processed.photo,
                        (moduleName.toLowerCase() + '_' + (processed.id || Utilities.getUuid()) + '_' + Date.now() + '.jpg'),
                        'image/jpeg',
                        moduleName
                    );
                    if (uploadResult && uploadResult.success) {
                        processed.photo = uploadResult.directLink || uploadResult.shareableLink || processed.photo;
                    }
                } catch (photoError) {
                    Logger.log('خطأ في رفع صورة photo في saveToSheet: ' + photoError.toString());
                }
            }
            
            // معالجة images - إذا كانت Array من Base64
            if (processed.images && Array.isArray(processed.images)) {
                const processedImages = [];
                for (let i = 0; i < processed.images.length; i++) {
                    const image = processed.images[i];
                    if (typeof image === 'string' && image.startsWith('data:')) {
                        try {
                            const moduleName = sheetName === 'DailyObservations' ? 'DailyObservations' : sheetName;
                            const uploadResult = uploadFileToDrive(
                                image,
                                (moduleName.toLowerCase() + '_' + (processed.id || Utilities.getUuid()) + '_' + Date.now() + '_' + i + '.jpg'),
                                'image/jpeg',
                                moduleName
                            );
                            if (uploadResult && uploadResult.success) {
                                processedImages.push(uploadResult.directLink || uploadResult.shareableLink);
                            } else {
                                processedImages.push(image);
                            }
                        } catch (imageError) {
                            Logger.log('خطأ في رفع صورة images في saveToSheet: ' + imageError.toString());
                            processedImages.push(image);
                        }
                    } else {
                        processedImages.push(image);
                    }
                }
                // ✅ Store images as plain text (NO JSON)
                processed.images = processedImages.filter(Boolean).map(v => String(v)).join('\n');
            }
            
            // ✅ معالجة logo - نحفظه دائماً كـ base64 string (لا نرفعه إلى Drive)
            // Google Sheets له حد أقصى 50,000 حرف للخلية الواحدة
            // للشعار، نحفظه مباشرة كـ base64 string دائماً
            // ملاحظة: إذا كان الشعار أكبر من 50,000 حرف، قد يتم قطعه بواسطة Google Sheets
            if (processed.logo && typeof processed.logo === 'string' && processed.logo.trim() !== '') {
                try {
                    const logoLength = processed.logo.length;
                    // ✅ تم تعطيل الرفع التلقائي إلى Drive - نحفظ الشعار كـ base64 دائماً
                    // إذا كان الشعار أكبر من 50,000 حرف، قد يتم قطعه بواسطة Google Sheets
                    if (logoLength > 50000) {
                        Logger.log('⚠️ Warning: Logo is very large (' + logoLength + ' chars). Google Sheets cell limit is 50,000 chars. Logo may be truncated.');
                    } else if (logoLength > 45000) {
                        Logger.log('⚠️ Warning: Logo is large (' + logoLength + ' chars). Close to Google Sheets cell limit (50,000 chars).');
                    } else {
                        Logger.log('✅ Logo saved as base64 string (length: ' + logoLength + ' chars, within Google Sheets limit)');
                    }
                    // نحفظ الشعار كـ base64 string مباشرة (لا نرفعه إلى Drive)
                } catch (logoError) {
                    Logger.log('❌ خطأ في معالجة الشعار في saveToSheet: ' + logoError.toString());
                }
            }

            if (sheetName === 'PTW') {
                processed = normalizePTWRowForSheet_(processed);
            }
            
            return processed;
        };
        
        // ✅ IMPORTANT: Do NOT clear rows here.
        // We preserve existing sheet data and only upsert/update what we receive.

        // ✅ مسح الcache بعد الاستيراد/الحفظ لضمان قراءة البيانات المحدثة
        invalidateHseSheetCaches(sheetName);

        // تحضير البيانات للكتابة (UPSERT: update existing rows by id, append new ones)
        if (Array.isArray(data) && data.length > 0) {
            const lastCol = sheet.getLastColumn();
            const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => (h === null || h === undefined) ? '' : String(h).trim());
            const idCol = headerRow.indexOf('id');
            // ✅ PPE_Stock يستخدم itemId وليس id — بدون هذا كل الصفوف تُضاف كصفوف جديدة إذا استُدعي saveToSheet بمصفوفة كاملة
            let keyCol = idCol;
            if (sheetName === 'PPE_Stock') {
                const itemIdCol = headerRow.indexOf('itemId');
                if (itemIdCol >= 0) {
                    keyCol = itemIdCol;
                }
            }
            const dataRange = sheet.getDataRange();
            const values = dataRange ? dataRange.getValues() : [];
            const idToRow = {};
            if (keyCol >= 0 && values.length > 1) {
                for (let r = 1; r < values.length; r++) {
                    const rid = values[r][keyCol];
                    if (rid !== null && rid !== undefined && String(rid).trim() !== '') {
                        idToRow[String(rid).trim()] = r + 1; // sheet row
                    }
                }
            }

            data.forEach((item) => {
                if (!item || typeof item !== 'object') return;
                const processedItem = processDataItem(item);
                let recordId = '';
                if (sheetName === 'PPE_Stock') {
                    if (processedItem.itemId !== null && processedItem.itemId !== undefined && String(processedItem.itemId).trim() !== '') {
                        recordId = String(processedItem.itemId).trim();
                    }
                } else if (processedItem.id) {
                    recordId = String(processedItem.id).trim();
                }
                let existingRow = recordId && idToRow[recordId] ? idToRow[recordId] : null;
                let existingRowVals = null;
                if (existingRow) {
                    existingRowVals = sheet.getRange(existingRow, 1, 1, headerRow.length).getValues()[0];
                }

                // ✅ DailyObservations: ضمان مطابقة رقم isoCode لرقم id + منع تكرار الأرقام نهائياً
                if (sheetName === 'DailyObservations') {
                    const isoColIdx = headerRow.indexOf('isoCode');
                    const existingIsoVal = (existingRow && existingRowVals && isoColIdx >= 0) ? existingRowVals[isoColIdx] : processedItem.isoCode;
                    ensureObservationIsoCodeMatchesId_(processedItem, existingIsoVal);

                    // سجل جديد يحمل id موجود سابقاً ببيانات مختلفة (سباق/بيانات قديمة/أوفلاين) → نولّد رقماً جديداً بدل الاستبدال
                    if (existingRow && !observationSameIdentity_(existingRowVals, headerRow, processedItem)) {
                        const freshIdentity = generateNextObservationIdentity(sheetName, spreadsheetId, true);
                        if (freshIdentity && freshIdentity.id) {
                            processedItem.id = freshIdentity.id;
                            processedItem.isoCode = freshIdentity.isoCode;
                            recordId = freshIdentity.id;
                            existingRow = null;
                            existingRowVals = null;
                            Logger.log('DailyObservations collision: record id re-assigned to ' + freshIdentity.id);
                        }
                    }
                }

                if (existingRow) {
                    // Partial update: only keys present in processedItem
                    headerRow.forEach((h, idx) => {
                        if (!h) return;
                        if (processedItem.hasOwnProperty(h)) {
                            // ✅ حماية ورقة Users: لا نكتب passwordHash إلا إذا كان SHA-256 صالحاً
                            // يمنع مسح الهاش عند autoSave أو أي مزامنة ترسل '***' من الـ frontend
                            if (sheetName === 'Users' && h === 'passwordHash') {
                                const newHash = String(processedItem[h] || '').trim();
                                if (!newHash || newHash === '***' || !isSha256Hash(newHash)) {
                                    return; // الاحتفاظ بالقيمة الحالية في الشيت
                                }
                            }
                            existingRowVals[idx] = toSheetCellValue_(h, processedItem[h], sheetName);
                        }
                    });
                    sheet.getRange(existingRow, 1, 1, headerRow.length).setValues([existingRowVals]);
                } else {
                    // Append new row
                    const rowValues = headerRow.map(h => {
                        if (!h) return '';
                        // ✅ حماية ورقة Users: لا نكتب passwordHash غير صالح حتى للصفوف الجديدة
                        if (sheetName === 'Users' && h === 'passwordHash') {
                            const newHash = String(processedItem[h] || '').trim();
                            if (!newHash || newHash === '***' || !isSha256Hash(newHash)) {
                                return '';
                            }
                        }
                        return toSheetCellValue_(h, processedItem[h], sheetName);
                    });
                    sheet.appendRow(rowValues);
                }
            });

            SpreadsheetApp.flush();
        } else if (typeof data === 'object' && data !== null) {
            const processedData = processDataItem(data);
            const recordId = processedData.id ? String(processedData.id).trim() : '';
            if (recordId) {
                // ✅ PTW: تجنّب updateSingleRowInSheet الذي يقرأ الورقة كاملاً عبر readFromSheet — مسار يدوي بطيء جداً مع آلاف الصفوف ويسبب مهلة العميل قبل إكمال الكتابة.
                if (sheetName === 'PTW') {
                    const existingRowNum = findSheetRowNumberByIdColumn_(sheet, recordId);
                    if (existingRowNum) {
                        mergeUpdateExistingSheetRow_(sheet, sheetName, existingRowNum, processedData);
                    } else {
                        const lastColPTW = sheet.getLastColumn();
                        const headerRowPTW = sheet.getRange(1, 1, 1, lastColPTW).getValues()[0].map(h => (h === null || h === undefined) ? '' : String(h).trim());
                        const rowValuesPTW = headerRowPTW.map(h => (h ? toSheetCellValue_(h, processedData[h], sheetName) : ''));
                        sheet.appendRow(rowValuesPTW);
                    }
                } else {
                    const upd = updateSingleRowInSheet(sheetName, recordId, processedData, spreadsheetId);
                    if (!upd || !upd.success) {
                        const lastCol = sheet.getLastColumn();
                        const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => (h === null || h === undefined) ? '' : String(h).trim());
                        const rowValues = headerRow.map(h => (h ? toSheetCellValue_(h, processedData[h], sheetName) : ''));
                        sheet.appendRow(rowValues);
                    }
                }
            } else {
                // No id => append as new row
                const lastCol = sheet.getLastColumn();
                const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => (h === null || h === undefined) ? '' : String(h).trim());
                const rowValues = headerRow.map(h => (h ? toSheetCellValue_(h, processedData[h], sheetName) : ''));
                sheet.appendRow(rowValues);
            }
        }

        // ✅ مسح الcache بعد الحفظ لضمان قراءة البيانات المحدثة (يشمل batch_*)
        invalidateHseSheetCaches(sheetName);

        const saveResult = { success: true, message: 'تم حفظ البيانات بنجاح' };
        if (sheetName === 'PTWRegistry' && resolvedPTWRegistryForResponse) {
            saveResult.resolvedPTWRegistry = resolvedPTWRegistryForResponse;
        }
        return saveResult;
        } finally {
            if (_ptwRegistryScriptLock) {
                try {
                    _ptwRegistryScriptLock.releaseLock();
                } catch (relEx) {
                    Logger.log('saveToSheet releaseLock: ' + relEx.toString());
                }
            }
            if (_dailyObsScriptLock) {
                try {
                    _dailyObsScriptLock.releaseLock();
                } catch (relEx) {
                    Logger.log('saveToSheet releaseLock (daily obs): ' + relEx.toString());
                }
            }
        }
    } catch (error) {
        Logger.log('Error in saveToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حفظ البيانات: ' + error.toString() };
    }
}

/**
 * إضافة بيانات جديدة إلى نهاية الورقة (بدون استبدال)
 */
function appendToSheet(sheetName, data, spreadsheetId = null) {
    try {
        if (!spreadsheetId) spreadsheetId = getSpreadsheetId();
        
        // التحقق من صحة spreadsheetId
        if (!spreadsheetId || (typeof spreadsheetId === 'string' && spreadsheetId.trim() === '')) {
            return { success: false, message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات.' };
        }
        
        if (!sheetName || (typeof sheetName === 'string' && sheetName.trim() === '')) {
            return { success: false, message: 'اسم الورقة غير محدد.' };
        }
        
        if (!data) {
            return { success: false, message: 'لا توجد بيانات للإضافة.' };
        }
        
        // ✅ إبطال الكاش في البداية لضمان أن جميع القراءات اللاحقة دقيقة 100%
        try {
            invalidateHseSheetCaches(sheetName);
        } catch(e) {}
        
        // فتح الجدول
        let spreadsheet;
        try {
            spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        } catch (error) {
            return { success: false, message: 'فشل فتح الجدول. يرجى التحقق من معرف الجدول: ' + error.toString() };
        }
        
        // إنشاء الورقة مع الرؤوس إذا لم تكن موجودة
        let sheet;
        try {
            sheet = createSheetWithHeaders(spreadsheet, sheetName, data);
        } catch (error) {
            return { success: false, message: 'فشل إنشاء/فتح الورقة: ' + error.toString() };
        }

        // الحصول على الرؤوس من البيانات الفعلية
        const headers = getHeaders(sheetName, data);
        if (!headers || headers.length === 0) {
            return { success: false, message: 'لا يمكن استخراج الرؤوس من البيانات المرسلة.' };
        }
        
        // التأكد من تحديث الرؤوس إذا لزم الأمر
        ensureSheetHeaders(sheet, sheetName, data);
        
        // لورقة Users، نتأكد من وجود passwordHash في الرؤوس قبل الإضافة
        if (sheetName === 'Users') {
            const lastColumn = sheet.getLastColumn();
            let currentHeaders = [];
            if (lastColumn > 0) {
                currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
            }
            if (!currentHeaders.includes('passwordHash')) {
                // إضافة passwordHash إلى الرؤوس
                const emailIndex = currentHeaders.indexOf('email');
                if (emailIndex >= 0) {
                    currentHeaders.splice(emailIndex + 1, 0, 'passwordHash');
                } else {
                    currentHeaders.splice(1, 0, 'passwordHash');
                }
                sheet.getRange(1, 1, 1, currentHeaders.length).setValues([currentHeaders]);
                const headerRange = sheet.getRange(1, 1, 1, currentHeaders.length);
                headerRange.setFontWeight('bold');
                headerRange.setBackground('#f0f0f0');
                headerRange.setFontSize(11);
                Logger.log('Added passwordHash column to Users sheet before appending data');
                // تحديث headers للمتابعة - التأكد من وجود email أولاً
                const emailIndexInHeaders = headers.indexOf('email');
                if (emailIndexInHeaders >= 0) {
                    headers.splice(emailIndexInHeaders + 1, 0, 'passwordHash');
                } else if (!headers.includes('passwordHash')) {
                    // إذا لم يكن email موجوداً، نضيف passwordHash في البداية
                    headers.unshift('passwordHash');
                }
            }
        }

        var _ptwRegistryAppendLock = null;
        if (sheetName === 'PTWRegistry') {
            _ptwRegistryAppendLock = LockService.getScriptLock();
            try {
                _ptwRegistryAppendLock.waitLock(45000);
            } catch (lockEx) {
                Logger.log('PTWRegistry appendToSheet lock timeout: ' + lockEx.toString());
                return { success: false, message: 'ازدحام على توليد رقم التصريح. أعد المحاولة بعد لحظات.' };
            }
        }
        var resolvedPTWRegistryForAppend = null;
        try {

        // معالجة attachments و image/photo قبل الحفظ
        const processDataItemForAppend = function(item) {
            if (!item || typeof item !== 'object') return item;
            
            let processed = {};
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    processed[key] = item[key];
                }
            }

            // ✅ تطبيع خاص بورقة Employees لضمان ترتيب وصحة البيانات
            if (sheetName === 'Employees') {
                processed.employeeNumber = normalizeTextValue(processed.employeeNumber);
                processed.sapId = normalizeTextValue(processed.sapId);
                processed.nationalId = normalizeTextValue(processed.nationalId);
                processed.birthDate = normalizeDateOnlyValue(processed.birthDate);
                processed.hireDate = normalizeDateOnlyValue(processed.hireDate);
                processed.job = normalizeTextValue(processed.job || processed.position);
                processed.position = normalizeTextValue(processed.position || processed.job);
                
                // ✅ تطبيع حقل النوع (gender) لضمان التطابق الصحيح
                processed.gender = normalizeGenderValue(processed.gender);

                // ✅ السن (age) محسوب مثل الواجهة الأمامية
                processed.age = calculateAgeYears(processed.birthDate);

                // ✅ تطبيع حقل status (active/inactive) - افتراضي: active
                if (!processed.status || (processed.status !== 'active' && processed.status !== 'inactive')) {
                    processed.status = 'active'; // قيمة افتراضية آمنة
                }
                
                // ✅ تطبيع تاريخ الاستقالة
                processed.resignationDate = normalizeDateOnlyValue(processed.resignationDate || '');

                // مطلوب: id = employeeNumber
                const normalizedEmpNo = normalizeTextValue(processed.employeeNumber);
                processed.id = normalizedEmpNo || normalizeTextValue(processed.id);
            }
            
            // ✅ تطبيع خاص بورقة PTWRegistry لضمان تخزين نص أو رقم فقط (لا JSON ولا objects)
            if (sheetName === 'PTWRegistry') {
                processed = resolvePTWRegistryIdsForWrite_(processed, spreadsheetId);
                processed = resolvePTWRegistryByPaperPermitNumber_(processed, spreadsheetId);
                // permitType: string فقط
                if (processed.permitType !== undefined) {
                    if (Array.isArray(processed.permitType)) {
                        processed.permitType = processed.permitType.join('، ');
                    } else if (typeof processed.permitType === 'object' && processed.permitType !== null) {
                        processed.permitType = String(processed.permitType);
                    } else {
                        processed.permitType = normalizeTextValue(processed.permitType);
                    }
                }
                if (processed.permitTypeDisplay !== undefined) {
                    processed.permitTypeDisplay = normalizeTextValue(processed.permitTypeDisplay);
                }
                // حقول نصية بسيطة
                const textFields = ['requestingParty', 'location', 'sublocation', 'authorizedParty', 'workDescription', 'supervisor1', 'supervisor2', 'status', 'closureReason', 'paperPermitNumber', 'equipment', 'tools', 'toolsList', 'hotWorkOther', 'confinedSpaceOther', 'heightWorkOther', 'electricalWorkType', 'coldWorkType', 'otherWorkType', 'excavationLength', 'excavationWidth', 'excavationDepth', 'soilType', 'ppeNotes', 'riskLikelihood', 'riskConsequence', 'riskLevel', 'riskNotes', 'manualApprovalsText', 'manualClosureApprovalsText', 'approvalCircuitOwnerId', 'approvalCircuitName', 'skipApprovalFlow'];
                textFields.forEach(field => {
                    if (processed[field] !== undefined && processed[field] !== null) {
                        if (typeof processed[field] === 'object') {
                            processed[field] = processed[field].name || processed[field].email || processed[field].id || String(processed[field]);
                        } else {
                            processed[field] = normalizeTextValue(processed[field]);
                        }
                    }
                });
                // locationId, sublocationId: string أو فارغ
                if (processed.locationId !== undefined && processed.locationId !== null) {
                    processed.locationId = String(processed.locationId).trim() || '';
                }
                if (processed.sublocationId !== undefined && processed.sublocationId !== null) {
                    processed.sublocationId = String(processed.sublocationId).trim() || '';
                }
                // totalTime: نص
                if (processed.totalTime !== undefined && processed.totalTime !== null) {
                    processed.totalTime = typeof processed.totalTime === 'object' ? String(processed.totalTime) : String(processed.totalTime).trim();
                }
                // teamMembers (array) -> teamMembersText فقط (لا نخزن المصفوفة)
                if (Array.isArray(processed.teamMembers) && processed.teamMembers.length > 0) {
                    processed.teamMembersText = processed.teamMembers.map(function(m) {
                        if (m && typeof m === 'object') {
                            var name = m.name || m.employeeName || '';
                            var sig = m.signature || m.id || '';
                            return sig ? name + ' (' + sig + ')' : name;
                        }
                        return String(m || '').trim();
                    }).filter(Boolean).join('، ');
                }
                if (processed.teamMembersText !== undefined && processed.teamMembersText !== null && typeof processed.teamMembersText !== 'string') {
                    processed.teamMembersText = String(processed.teamMembersText);
                }
                // مصفوفات طبيعة الأعمال -> نص
                if (Array.isArray(processed.hotWorkDetails)) {
                    processed.hotWorkDetails = processed.hotWorkDetails.join('، ');
                } else if (processed.hotWorkDetails !== undefined && typeof processed.hotWorkDetails !== 'string') {
                    processed.hotWorkDetails = normalizeTextValue(processed.hotWorkDetails);
                }
                if (Array.isArray(processed.confinedSpaceDetails)) {
                    processed.confinedSpaceDetails = processed.confinedSpaceDetails.join('، ');
                } else if (processed.confinedSpaceDetails !== undefined && typeof processed.confinedSpaceDetails !== 'string') {
                    processed.confinedSpaceDetails = normalizeTextValue(processed.confinedSpaceDetails);
                }
                if (Array.isArray(processed.heightWorkDetails)) {
                    processed.heightWorkDetails = processed.heightWorkDetails.join('، ');
                } else if (processed.heightWorkDetails !== undefined && typeof processed.heightWorkDetails !== 'string') {
                    processed.heightWorkDetails = normalizeTextValue(processed.heightWorkDetails);
                }
                if (Array.isArray(processed.requiredPPE)) {
                    processed.requiredPPE = processed.requiredPPE.join('، ');
                } else if (processed.requiredPPE !== undefined && typeof processed.requiredPPE !== 'string') {
                    processed.requiredPPE = normalizeTextValue(processed.requiredPPE);
                }
                // riskScore: رقم
                if (processed.riskScore !== undefined && processed.riskScore !== null && processed.riskScore !== '') {
                    var rs = processed.riskScore;
                    processed.riskScore = (typeof rs === 'number' && !isNaN(rs)) ? rs : (parseFloat(String(rs).trim()) || '');
                }
                // قيم منطقية: نبقيه boolean (Sheets يقبلها)
                ['preStartChecklist', 'lotoApplied', 'governmentPermits', 'riskAssessmentAttached', 'gasTesting', 'mocRequest', 'isManualEntry'].forEach(function(f) {
                    if (processed[f] !== undefined) {
                        processed[f] = processed[f] === true || processed[f] === 'true' || processed[f] === 1;
                    }
                });
                resolvedPTWRegistryForAppend = processed;
            }
            
            // ✅ Attachments: store as plain text (NO JSON)
            if (processed.attachments !== undefined) {
                processed.attachments = formatAttachmentsText_(processed.attachments);
            }
            
            // معالجة image - إذا كانت Base64، نرفعها إلى Google Drive
            if (processed.image && typeof processed.image === 'string' && processed.image.startsWith('data:')) {
                try {
                    const moduleName = sheetName === 'Incidents' ? 'Incidents' : 
                                     sheetName === 'NearMiss' ? 'NearMiss' :
                                     sheetName === 'Violations' ? 'Violations' :
                                     sheetName === 'DailyObservations' ? 'DailyObservations' : sheetName;
                    const uploadResult = uploadFileToDrive(
                        processed.image,
                        (moduleName.toLowerCase() + '_' + (processed.id || Utilities.getUuid()) + '_' + Date.now() + '.jpg'),
                        'image/jpeg',
                        moduleName
                    );
                    if (uploadResult && uploadResult.success) {
                        processed.image = uploadResult.directLink || uploadResult.shareableLink || processed.image;
                    }
                } catch (imageError) {
                    Logger.log('خطأ في رفع صورة في appendToSheet: ' + imageError.toString());
                }
            }
            
            // معالجة photo - إذا كانت Base64، نرفعها إلى Google Drive
            if (processed.photo && typeof processed.photo === 'string' && processed.photo.startsWith('data:')) {
                try {
                    const moduleName = sheetName === 'Violations' ? 'Violations' : 
                                     sheetName === 'Blacklist_Register' ? 'Blacklist_Register' : sheetName;
                    const uploadResult = uploadFileToDrive(
                        processed.photo,
                        (moduleName.toLowerCase() + '_' + (processed.id || Utilities.getUuid()) + '_' + Date.now() + '.jpg'),
                        'image/jpeg',
                        moduleName
                    );
                    if (uploadResult && uploadResult.success) {
                        processed.photo = uploadResult.directLink || uploadResult.shareableLink || processed.photo;
                    }
                } catch (photoError) {
                    Logger.log('خطأ في رفع صورة photo في appendToSheet: ' + photoError.toString());
                }
            }
            
            // معالجة images - إذا كانت Array من Base64
            if (processed.images && Array.isArray(processed.images)) {
                const processedImages = [];
                for (let i = 0; i < processed.images.length; i++) {
                    const image = processed.images[i];
                    if (typeof image === 'string' && image.startsWith('data:')) {
                        try {
                            const moduleName = sheetName === 'DailyObservations' ? 'DailyObservations' : sheetName;
                            const uploadResult = uploadFileToDrive(
                                image,
                                (moduleName.toLowerCase() + '_' + (processed.id || Utilities.getUuid()) + '_' + Date.now() + '_' + i + '.jpg'),
                                'image/jpeg',
                                moduleName
                            );
                            if (uploadResult && uploadResult.success) {
                                processedImages.push(uploadResult.directLink || uploadResult.shareableLink);
                            } else {
                                processedImages.push(image);
                            }
                        } catch (imageError) {
                            Logger.log('خطأ في رفع صورة images في appendToSheet: ' + imageError.toString());
                            processedImages.push(image);
                        }
                    } else {
                        processedImages.push(image);
                    }
                }
                // ✅ Store images as plain text (NO JSON)
                processed.images = processedImages.filter(Boolean).map(v => String(v)).join('\n');
            }

            if (sheetName === 'PTW') {
                processed = normalizePTWRowForSheet_(processed);
            }
            
            return processed;
        };
        
        // ✅ الحصول على آخر صف - استخدام طريقة موثوقة 100%
        // ✅ نستخدم getDataRange() للحصول على نطاق البيانات الفعلي
        let lastRow = 1; // افتراضياً: الرؤوس فقط
        
        try {
            // ✅ استخدام getDataRange() للحصول على نطاق البيانات الفعلي
            const dataRange = sheet.getDataRange();
            if (dataRange && dataRange.getNumRows() > 0) {
                // ✅ getDataRange() يعيد نطاق يبدأ من الصف 1 (الرؤوس)
                // ✅ getNumRows() يعيد عدد الصفوف (بما في ذلك الرؤوس)
                // ✅ لذلك آخر صف = getNumRows()
                lastRow = dataRange.getNumRows();
                
                // ✅ التحقق: إذا كان lastRow = 1، يعني فقط الرؤوس
                // ✅ إذا كان lastRow > 1، يعني هناك بيانات بعد الرؤوس
                if (lastRow < 1) {
                    lastRow = 1;
                }
            } else {
                // ✅ لا توجد بيانات - فقط الرؤوس
                lastRow = 1;
            }
        } catch (e) {
            // ✅ في حالة الخطأ، نستخدم getLastRow() كبديل
            Logger.log('Warning: Could not use getDataRange(), using getLastRow(): ' + e.toString());
            try {
                lastRow = sheet.getLastRow();
                if (lastRow < 1) {
                    lastRow = 1;
                }
            } catch (e2) {
                Logger.log('Error: Could not get last row: ' + e2.toString());
                lastRow = 1; // افتراضياً: الرؤوس فقط
            }
        }
        
        // ✅ حساب startRow: إذا كانت الورقة فارغة (فقط الرؤوس)، نبدأ من الصف 2
        // ✅ إذا كانت هناك بيانات، نضيف بعد آخر صف
        const startRow = lastRow === 1 ? 2 : lastRow + 1;
        
        // ✅ تسجيل للمراقبة
        Logger.log('appendToSheet: lastRow=' + lastRow + ', startRow=' + startRow + ', sheetName=' + sheetName + ', numRows=' + (sheet.getDataRange() ? sheet.getDataRange().getNumRows() : 'N/A'));

        if (Array.isArray(data)) {
            // إذا كانت مصفوفة من الكائنات
            if (data.length > 0) {
                // ✅ إصلاح: التحقق من التكرار قبل الإضافة لمنع تكرار البيانات
                let existingData = [];
                try {
                    existingData = readFromSheet(sheetName, spreadsheetId);
                } catch (readError) {
                    Logger.log('⚠️ Could not read existing data for duplicate check: ' + readError.toString());
                }
                
                // إنشاء خريطة للـ IDs الموجودة لتسريع البحث
                const existingIds = new Set();
                if (Array.isArray(existingData) && existingData.length > 0) {
                    existingData.forEach(item => {
                        if (item && item.id) {
                            existingIds.add(String(item.id).trim());
                        }
                    });
                }
                
                // تصفية البيانات المكررة
                const uniqueData = [];
                const duplicates = [];
                data.forEach(item => {
                    const processedItem = processDataItemForAppend(item);
                    const recordId = processedItem.id ? String(processedItem.id).trim() : '';
                    
                    if (recordId && existingIds.has(recordId)) {
                        duplicates.push(processedItem);
                        Logger.log('⚠️ Duplicate record skipped in appendToSheet: id=' + recordId + ', sheetName=' + sheetName);
                    } else {
                        uniqueData.push(processedItem);
                        if (recordId) {
                            existingIds.add(recordId); // إضافة إلى المجموعة لتجنب التكرار داخل نفس الدفعة
                        }
                    }
                });
                
                // تحديث السجلات المكررة
                if (duplicates.length > 0) {
                    Logger.log('⚠️ Found ' + duplicates.length + ' duplicate records, updating them instead of adding');
                    duplicates.forEach(duplicate => {
                        const recordId = duplicate.id ? String(duplicate.id).trim() : '';
                        if (recordId) {
                            try {
                                updateSingleRowInSheet(sheetName, recordId, duplicate, spreadsheetId);
                            } catch (updateError) {
                                Logger.log('⚠️ Failed to update duplicate record: id=' + recordId + ', error=' + updateError.toString());
                            }
                        }
                    });
                }
                
                if (uniqueData.length === 0) {
                    return withResolvedPTWRegistry_(sheetName, { 
                        success: true, 
                        message: 'جميع السجلات موجودة بالفعل، تم تحديثها',
                        duplicatesCount: duplicates.length,
                        updatedCount: duplicates.length
                    }, resolvedPTWRegistryForAppend);
                }

                // ✅ ترتيب الكتابة = رؤوس الورقة الفعلية (بعد ensureSheetHeaders)، لا ترتيب getDefaultHeaders.
                // لورقة Employees كان الاختلاف بعد photo يضع status داخل createdAt ويزحلق id/التواريخ.
                let writeHeaders = headers;
                try {
                    const writeLastCol = sheet.getLastColumn();
                    if (writeLastCol > 0) {
                        const sheetWriteHeaders = sheet.getRange(1, 1, 1, writeLastCol).getValues()[0].map(function(h) {
                            return (h === null || h === undefined) ? '' : String(h).trim();
                        });
                        if (sheetWriteHeaders.length > 0) {
                            writeHeaders = sheetWriteHeaders;
                        }
                    }
                } catch (writeHdrErr) {
                    Logger.log('appendToSheet: could not read sheet headers for write, using computed headers: ' + writeHdrErr.toString());
                }
                
                // معالجة البيانات الفريدة بكميات كبيرة - تحسين الأداء
                const batchSize = 1000; // كتابة 1000 صف في كل دفعة
                
                for (let i = 0; i < uniqueData.length; i += batchSize) {
                    const batch = uniqueData.slice(i, i + batchSize);
                    const batchValues = batch.map(item => {
                        return writeHeaders.map(header => {
                            const h = header ? String(header).trim() : '';
                            if (!h) return '';
                            return toSheetCellValue_(h, item[h], sheetName);
                        });
                    });
                    
                    try {
                        // ✅ التحقق من آخر صف قبل كل دفعة - استخدام getDataRange()
                        let currentLastRow = 1;
                        try {
                            const dataRange = sheet.getDataRange();
                            if (dataRange && dataRange.getNumRows() > 0) {
                                currentLastRow = dataRange.getNumRows();
                                if (currentLastRow < 1) {
                                    currentLastRow = 1;
                                }
                            } else {
                                currentLastRow = 1;
                            }
                        } catch (e) {
                            Logger.log('Warning: Could not use getDataRange() for batch, using getLastRow(): ' + e.toString());
                            currentLastRow = sheet.getLastRow();
                            if (currentLastRow < 1) {
                                currentLastRow = 1;
                            }
                        }
                        
                        // ✅ للدفعة الأولى، نستخدم startRow المحسوب مسبقاً
                        // ✅ للدفعات التالية، نضيف بعد آخر صف مكتوب
                        let batchStartRow;
                        if (i === 0) {
                            // ✅ الدفعة الأولى: نستخدم startRow المحسوب مسبقاً
                            batchStartRow = startRow;
                        } else {
                            // ✅ الدفعات التالية: نتحقق من آخر صف مكتوب
                            try {
                                const dataRange = sheet.getDataRange();
                                if (dataRange && dataRange.getNumRows() > 0) {
                                    currentLastRow = dataRange.getNumRows();
                                    if (currentLastRow < 1) {
                                        currentLastRow = 1;
                                    }
                                } else {
                                    currentLastRow = 1;
                                }
                            } catch (e) {
                                currentLastRow = sheet.getLastRow();
                                if (currentLastRow < 1) {
                                    currentLastRow = 1;
                                }
                            }
                            batchStartRow = currentLastRow + 1;
                        }
                        
                        Logger.log('appendToSheet: Writing batch ' + i + ' to row ' + batchStartRow + ' (currentLastRow=' + currentLastRow + ')');
                        
                        // ✅ التأكد من أن batchStartRow > 1 (بعد الرؤوس)
                        if (batchStartRow <= 1) {
                            throw new Error('Invalid batchStartRow: ' + batchStartRow + '. Must be > 1');
                        }
                        
                        sheet.getRange(batchStartRow, 1, batchValues.length, writeHeaders.length).setValues(batchValues);
                        
                        // ✅ حفظ البيانات مباشرة بعد كل دفعة لضمان التحديث
                        if (i + batchSize >= data.length) {
                            // ✅ حفظ فقط بعد آخر دفعة
                            SpreadsheetApp.flush();
                        }
                    } catch (error) {
                        Logger.log('Error appending batch ' + i + ': ' + error.toString());
                        throw error;
                    }
                }
            }
        } else if (typeof data === 'object' && data !== null) {
            // إذا كان كائن واحد
            const processedData = processDataItemForAppend(data);
            
            // ✅ إصلاح: التحقق من التكرار قبل الإضافة لمنع تكرار البيانات
            const recordId = processedData.id ? String(processedData.id).trim() : '';
            if (recordId) {
                // قراءة البيانات الموجودة للتحقق من التكرار
                try {
                    if (sheetName === 'PTW') {
                        var dupRowAppend = findSheetRowNumberByIdColumn_(sheet, recordId);
                        if (dupRowAppend) {
                            Logger.log('⚠️ Duplicate record found in appendToSheet (PTW id scan): id=' + recordId);
                            Logger.log('⚠️ Updating existing record instead of adding duplicate');
                            var mergedDup = mergeUpdateExistingSheetRow_(sheet, sheetName, dupRowAppend, processedData);
                            if (mergedDup) {
                                return withResolvedPTWRegistry_(sheetName, {
                                    success: true,
                                    message: 'تم تحديث السجل الموجود بدلاً من إضافة مكرر',
                                    isDuplicate: true,
                                    rowNumber: dupRowAppend
                                }, resolvedPTWRegistryForAppend);
                            }
                            var updateResultPTW = updateSingleRowInSheet(sheetName, recordId, processedData, spreadsheetId);
                            if (updateResultPTW && updateResultPTW.success) {
                                return withResolvedPTWRegistry_(sheetName, {
                                    success: true,
                                    message: 'تم تحديث السجل الموجود بدلاً من إضافة مكرر',
                                    isDuplicate: true,
                                    rowNumber: updateResultPTW.rowNumber || null
                                }, resolvedPTWRegistryForAppend);
                            }
                            Logger.log('⚠️ Failed to update existing PTW record after fast merge, proceeding with append');
                        }
                    } else {
                        const existingData = readFromSheet(sheetName, spreadsheetId);
                        if (Array.isArray(existingData) && existingData.length > 0) {
                            const duplicate = existingData.find(item => {
                                if (!item || !item.id) return false;
                                return String(item.id).trim() === recordId;
                            });

                            if (duplicate) {
                                Logger.log('⚠️ Duplicate record found in appendToSheet: id=' + recordId + ', sheetName=' + sheetName);
                                Logger.log('⚠️ Updating existing record instead of adding duplicate');

                                const updateResult = updateSingleRowInSheet(sheetName, recordId, processedData, spreadsheetId);
                                if (updateResult && updateResult.success) {
                                    return withResolvedPTWRegistry_(sheetName, {
                                        success: true,
                                        message: 'تم تحديث السجل الموجود بدلاً من إضافة مكرر',
                                        isDuplicate: true,
                                        rowNumber: updateResult.rowNumber || null
                                    }, resolvedPTWRegistryForAppend);
                                }
                                Logger.log('⚠️ Failed to update existing record, proceeding with append');
                            }
                        }
                    }
                } catch (duplicateCheckError) {
                    Logger.log('⚠️ Error checking for duplicates in appendToSheet: ' + duplicateCheckError.toString());
                    // نتابع الإضافة في حالة فشل التحقق من التكرار
                }
            }
            
            // ✅ التأكد من أن الرؤوس في الورقة تطابق headers المحسوبة
            // ✅ إعادة قراءة الرؤوس الفعلية من الورقة بعد ensureSheetHeaders للتأكد من التحديثات
            let actualHeaders = [];
            try {
                const lastColumn = sheet.getLastColumn();
                if (lastColumn > 0) {
                    const headerRange = sheet.getRange(1, 1, 1, lastColumn);
                    actualHeaders = headerRange.getValues()[0];
                }
            } catch (e) {
                Logger.log('Warning: Could not read actual headers from sheet: ' + e.toString());
            }
            
            // ✅ إعادة قراءة الرؤوس الفعلية من الورقة بعد ensureSheetHeaders للتأكد من التحديثات
            // ✅ ensureSheetHeaders قد تضيف حقول جديدة، لذلك نقرأ الرؤوس مرة أخرى
            let updatedHeaders = [];
            try {
                const updatedLastColumn = sheet.getLastColumn();
                if (updatedLastColumn > 0) {
                    const updatedHeaderRange = sheet.getRange(1, 1, 1, updatedLastColumn);
                    updatedHeaders = updatedHeaderRange.getValues()[0];
                }
            } catch (e) {
                Logger.log('Warning: Could not read updated headers from sheet: ' + e.toString());
                updatedHeaders = headers; // استخدام headers المحسوبة كبديل
            }
            
            // ✅ استخدام رؤوس الورقة الفعلية دائماً عند توفرها (ترتيب الأعمدة المادي)
            const finalHeaders = (updatedHeaders && updatedHeaders.length > 0)
                                 ? updatedHeaders.map(function(h) {
                                     return (h === null || h === undefined) ? '' : String(h).trim();
                                 })
                                 : headers;
            
            // ✅ إعداد rowValues حسب ترتيب finalHeaders
            // ✅ Fix: write Dates as real Date objects (not ISO JSON strings)
            const rowValues = finalHeaders.map(h => toSheetCellValue_(h, processedData[h], sheetName));
            
            // ✅ التحقق من تطابق عدد الأعمدة قبل appendRow()
            const actualColumnCount = sheet.getLastColumn();
            if (actualColumnCount > 0 && rowValues.length !== actualColumnCount) {
                Logger.log('⚠️ Warning: rowValues.length (' + rowValues.length + ') != actualColumnCount (' + actualColumnCount + ')');
                Logger.log('⚠️ Adjusting rowValues to match actual column count');
                
                // ✅ تعديل rowValues لتطابق عدد الأعمدة الفعلية
                if (rowValues.length < actualColumnCount) {
                    // ✅ إضافة قيم فارغة إذا كان rowValues أقصر
                    while (rowValues.length < actualColumnCount) {
                        rowValues.push('');
                    }
                } else if (rowValues.length > actualColumnCount) {
                    // ✅ تقصير rowValues إذا كان أطول
                    rowValues.splice(actualColumnCount);
                }
                Logger.log('✅ Adjusted rowValues.length to ' + rowValues.length + ' to match actualColumnCount');
            }
            
            try {
                // ✅ التحقق من آخر صف قبل الإضافة - استخدام طريقة موثوقة 100%
                // ✅ قراءة البيانات الفعلية من الورقة للحصول على عدد الصفوف الصحيح
                let lastRowBefore = 1;
                try {
                    // ✅ قراءة البيانات الخام من الشيت لمعرفة آخر صف حقيقي يحتوي على بيانات (تجاهل التنسيقات)
                    // هذه الطريقة أسرع وأكثر دقة ولا تتأثر بالصفوف الفارغة في المنتصف
                    const dataRange = sheet.getDataRange();
                    if (dataRange) {
                        const rawValues = dataRange.getValues();
                        let trueLastRow = 1;
                        // نبحث من الأسفل للأعلى عن أول صف يحتوي على أي بيانات فعلية
                        for (let i = rawValues.length - 1; i >= 0; i--) {
                            const row = rawValues[i];
                            if (row.some(cell => cell !== '' && cell !== null && cell !== undefined)) {
                                trueLastRow = i + 1; // رقم الصف (1-indexed)
                                break;
                            }
                        }
                        lastRowBefore = trueLastRow;
                        Logger.log('✅ Calculated true lastRowBefore directly from raw array scanning: ' + lastRowBefore);
                    }
                } catch (readError) {
                    // ✅ في حالة فشل قراءة البيانات، نستخدم getLastRow()
                    Logger.log('⚠️ Could not read raw data from sheet, using getLastRow(): ' + readError.toString());
                    lastRowBefore = sheet.getLastRow() || 1;
                }
                
                Logger.log('appendToSheet: Last row before appendRow() = ' + lastRowBefore + ', sheetName=' + sheetName);
                Logger.log('appendToSheet: finalHeaders.length=' + finalHeaders.length + ', rowValues.length=' + rowValues.length + ', actualColumnCount=' + actualColumnCount);
                
                // ✅ كتابة البيانات في الورقة باستخدام الطريقة الموثوقة 100% (تتجاهل الصفوف الفارغة المنسقة)
                const startRowToWrite = lastRowBefore === 1 ? 2 : lastRowBefore + 1;
                
                // التأكد من أن المصفوفة تطابق عدد الأعمدة
                const columnsToWrite = actualColumnCount > 0 ? actualColumnCount : finalHeaders.length;
                if (rowValues.length !== columnsToWrite) {
                    if (rowValues.length < columnsToWrite) {
                        while (rowValues.length < columnsToWrite) rowValues.push('');
                    } else {
                        rowValues.splice(columnsToWrite);
                    }
                }
                
                sheet.getRange(startRowToWrite, 1, 1, columnsToWrite).setValues([rowValues]);
                
                // ✅ حفظ البيانات مباشرة 
                SpreadsheetApp.flush();
                
                // ✅ إبطال الكاش
                invalidateHseSheetCaches(sheetName);
                
                Logger.log('✅ appendToSheet: Successfully appended row to ' + sheetName + ' at row ' + startRowToWrite);
                return withResolvedPTWRegistry_(sheetName, { success: true, message: 'تم إضافة البيانات بنجاح', rowNumber: startRowToWrite }, resolvedPTWRegistryForAppend);
            } catch (error) {
                Logger.log('Error appending single row with appendRow(): ' + error.toString());
                Logger.log('Error details: ' + JSON.stringify(error));
                
                // ✅ في حالة فشل appendRow()، نستخدم الطريقة القديمة كبديل
                try {
                    Logger.log('⚠️ Falling back to getRange().setValues() method...');
                    Logger.log('⚠️ appendRow() failed, using manual row calculation method');
                    
                    // ✅ التحقق من آخر صف قبل الكتابة - استخدام طريقة موثوقة 100%
                    // ✅ قراءة البيانات الفعلية من الورقة للحصول على عدد الصفوف الصحيح
                    let verifyLastRow = 1;
                    let lastRowMethod = 'unknown';
                    
                    try {
                        const dataRange = sheet.getDataRange();
                        if (dataRange) {
                            const rawValues = dataRange.getValues();
                            let trueLastRow = 1;
                            for (let i = rawValues.length - 1; i >= 0; i--) {
                                const row = rawValues[i];
                                if (row.some(cell => cell !== null && cell !== undefined && String(cell).trim() !== '')) {
                                    trueLastRow = i + 1;
                                    break;
                                }
                            }
                            verifyLastRow = trueLastRow;
                            lastRowMethod = 'raw array scan';
                            Logger.log('✅ Using raw array scan in fallback: lastRow=' + verifyLastRow);
                        } else {
                            verifyLastRow = 1;
                            lastRowMethod = 'getDataRange (empty)';
                        }
                    } catch (readError) {
                        Logger.log('⚠️ Warning: Could not use getDataRange() in fallback, trying getLastRow(): ' + readError.toString());
                        try {
                            const lastRowValue = sheet.getLastRow();
                            if (lastRowValue && lastRowValue > 0) {
                                verifyLastRow = lastRowValue;
                                lastRowMethod = 'getLastRow';
                            } else {
                                verifyLastRow = 1;
                                lastRowMethod = 'getLastRow (empty)';
                            }
                        } catch (e2) {
                            Logger.log('❌ Error: Could not get last row using any method: ' + e2.toString());
                            verifyLastRow = 1;
                            lastRowMethod = 'default (1)';
                        }
                    }
                    
                    // ✅ حساب finalStartRow: بعد آخر صف يحتوي على بيانات
                    // ✅ إذا كان verifyLastRow = 1، يعني فقط الرؤوس، نبدأ من الصف 2
                    // ✅ إذا كان verifyLastRow > 1، نضيف بعد آخر صف
                    const finalStartRow = verifyLastRow === 1 ? 2 : verifyLastRow + 1;
                    
                    Logger.log('📝 appendToSheet (fallback): lastRow=' + verifyLastRow + ' (method=' + lastRowMethod + '), finalStartRow=' + finalStartRow);
                    Logger.log('📝 appendToSheet (fallback): sheetName=' + sheetName + ', finalHeadersCount=' + finalHeaders.length + ', rowValuesCount=' + rowValues.length);
                    
                    // ✅ التحقق من أن finalStartRow > 1 (بعد الرؤوس)
                    if (finalStartRow <= 1) {
                        const errorMsg = 'Invalid startRow: ' + finalStartRow + '. Must be > 1. lastRow=' + verifyLastRow + ', method=' + lastRowMethod;
                        Logger.log('❌ ' + errorMsg);
                        throw new Error(errorMsg);
                    }
                    
                    // ✅ التحقق من أن finalStartRow ليس 2 إذا كان هناك بيانات (قد يشير إلى خطأ)
                    if (finalStartRow === 2 && verifyLastRow > 1) {
                        Logger.log('⚠️ Warning: finalStartRow=2 but verifyLastRow=' + verifyLastRow + '. This might indicate an issue.');
                    }
                    
                    // ✅ استخدام actualColumnCount بدلاً من finalHeaders.length للاتساق
                    const actualColumnCount = sheet.getLastColumn();
                    let columnsToWrite = actualColumnCount > 0 ? actualColumnCount : finalHeaders.length;
                    
                    // ✅ تعديل rowValues لتطابق عدد الأعمدة الفعلية
                    if (rowValues.length !== columnsToWrite) {
                        Logger.log('⚠️ Warning: rowValues.length (' + rowValues.length + ') != columnsToWrite (' + columnsToWrite + ')');
                        
                        if (rowValues.length < columnsToWrite) {
                            // ✅ إضافة قيم فارغة إذا كان rowValues أقصر
                            while (rowValues.length < columnsToWrite) {
                                rowValues.push('');
                            }
                            Logger.log('✅ Adjusted rowValues: added ' + (columnsToWrite - rowValues.length + rowValues.length - rowValues.length) + ' empty values');
                        } else if (rowValues.length > columnsToWrite) {
                            // ✅ تقصير rowValues إذا كان أطول
                            rowValues.splice(columnsToWrite);
                            Logger.log('✅ Adjusted rowValues: trimmed to ' + columnsToWrite + ' values');
                        }
                    }
                    
                    // ✅ التأكد من أن columnsToWrite > 0
                    if (columnsToWrite <= 0) {
                        columnsToWrite = finalHeaders.length;
                        Logger.log('⚠️ Warning: columnsToWrite was 0, using finalHeaders.length=' + columnsToWrite);
                    }
                    
                    // ✅ كتابة البيانات في الصف الصحيح
                    Logger.log('📝 Writing to row ' + finalStartRow + ' with ' + columnsToWrite + ' columns (rowValues.length=' + rowValues.length + ')');
                    sheet.getRange(finalStartRow, 1, 1, columnsToWrite).setValues([rowValues]);
                    
                    // ✅ حفظ البيانات مباشرة لضمان أن readFromSheet() يقرأ البيانات المحدثة
                    SpreadsheetApp.flush();
                    
                    // ✅ إبطال الكاش قبل قراءة البيانات للتحقق
                    invalidateHseSheetCaches(sheetName);
                    
                    // ✅ التحقق من أن الصف تم إضافته بشكل صحيح
                    // ملاحظة: readFromSheet() قد يُرجع عدداً أقل عند وجود صفوف شبه فارغة/منسقة،
                    // لذلك نعتبر getLastRow() هو المرجع الأساسي لموضع آخر صف فعلي.
                    let verifyAfterWrite = finalStartRow;
                    try {
                        const dataAfterWrite = readFromSheet(sheetName, spreadsheetId);
                        const sheetLastRowAfterWrite = sheet.getLastRow() || finalStartRow;
                        if (Array.isArray(dataAfterWrite) && dataAfterWrite.length > 0) {
                            const readBasedLastRow = dataAfterWrite.length + 1;
                            verifyAfterWrite = Math.max(readBasedLastRow, sheetLastRowAfterWrite);
                            Logger.log('✅ Verify after write: readBasedLastRow=' + readBasedLastRow + ', sheetLastRow=' + sheetLastRowAfterWrite + ', selected=' + verifyAfterWrite);
                        } else {
                            verifyAfterWrite = sheetLastRowAfterWrite;
                            Logger.log('✅ Verify after write: readFromSheet empty, using sheetLastRow=' + verifyAfterWrite);
                        }
                    } catch (readError) {
                        Logger.log('⚠️ Could not read from sheet after write, using getLastRow(): ' + readError.toString());
                        verifyAfterWrite = sheet.getLastRow() || finalStartRow;
                    }
                    
                    Logger.log('✅ appendToSheet (fallback): After write, lastRow=' + verifyAfterWrite + ' (was ' + verifyLastRow + ', written at ' + finalStartRow + ')');
                    
                    if (verifyAfterWrite < finalStartRow) {
                        Logger.log('⚠️ Warning: After write, lastRow (' + verifyAfterWrite + ') < finalStartRow (' + finalStartRow + ')');
                        Logger.log('⚠️ This might indicate that the row was not added correctly');
                    } else if (verifyAfterWrite === finalStartRow) {
                        Logger.log('✅ appendToSheet (fallback): Row successfully written at row ' + finalStartRow);
                    } else {
                        Logger.log('✅ appendToSheet (fallback): Row written at row ' + finalStartRow + ', new lastRow=' + verifyAfterWrite);
                    }
                    
                    // ✅ التحقق النهائي: التأكد من أن الصف في المكان الصحيح
                    if (verifyAfterWrite < finalStartRow) {
                        Logger.log('❌ Error: Row was not added at the expected position. Expected: ' + finalStartRow + ', Actual: ' + verifyAfterWrite);
                        return { success: false, message: 'فشل إضافة الصف في المكان الصحيح. المتوقع: ' + finalStartRow + ', الفعلي: ' + verifyAfterWrite };
                    }
                    
                    Logger.log('✅ appendToSheet: Successfully appended row to ' + sheetName + ' at row ' + finalStartRow + ' using fallback method');
                    return withResolvedPTWRegistry_(sheetName, { success: true, message: 'تم إضافة البيانات بنجاح', rowNumber: finalStartRow }, resolvedPTWRegistryForAppend);
                } catch (fallbackError) {
                    Logger.log('❌ Error in fallback method: ' + fallbackError.toString());
                    Logger.log('❌ Fallback error details: ' + JSON.stringify(fallbackError));
                    throw error; // رمي الخطأ الأصلي
                }
            }
        }

        return withResolvedPTWRegistry_(sheetName, { success: true, message: 'تم إضافة البيانات بنجاح' }, resolvedPTWRegistryForAppend);
        } finally {
            // ✅ إبطال CacheService لقراءة الورقة ونسخة batch (مثل PTWIssuingAuthorities)
            try {
                invalidateHseSheetCaches(sheetName);
            } catch (_cacheInvEx) {
                Logger.log('appendToSheet cache invalidate: ' + _cacheInvEx.toString());
            }
            if (_ptwRegistryAppendLock) {
                try {
                    _ptwRegistryAppendLock.releaseLock();
                } catch (relEx) {
                    Logger.log('appendToSheet releaseLock: ' + relEx.toString());
                }
            }
        }
    } catch (error) {
        Logger.log('Error in appendToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة البيانات: ' + error.toString() };
    }
}

/**
 * يزامن حقول السجل مع أسماء رؤوس الأعمدة الفعلية في الشيت (مثل Status مقابل status).
 * بدون ذلك يبقى عمود الحالة القديم pending رغم تعيين request.status في الكود.
 */
function syncContractorRequestRowForSheetHeaders_(record, headers, sheetName) {
    if (sheetName !== 'ContractorApprovalRequests' &&
        sheetName !== 'ContractorEvaluationApprovalRequests' &&
        sheetName !== 'ContractorDeletionRequests') return;
    if (!record || !headers || !headers.length) return;
    var fields = ['status', 'approvedAt', 'approvedBy', 'approvedByName', 'rejectedAt', 'rejectedBy', 'rejectedByName', 'rejectionReason', 'updatedAt'];
    fields.forEach(function (fl) {
        var val = record[fl];
        if (val === undefined || val === null || val === '') {
            for (var k in record) {
                if (!record.hasOwnProperty(k)) continue;
                if (String(k).toLowerCase() !== fl) continue;
                var v = record[k];
                if (v !== undefined && v !== null && v !== '') {
                    val = v;
                    break;
                }
            }
        }
        if (val === undefined || val === null) return;
        for (var i = 0; i < headers.length; i++) {
            var h = headers[i];
            if (!h) continue;
            if (String(h).trim().toLowerCase() === fl) {
                record[h] = val;
            }
        }
    });
}

/**
 * العثور على رقم صف البيانات (≥2) عبر عمود id فقط — أسرع بكثير من readFromSheet على ورقة PTW الكبيرة.
 */
function findSheetRowNumberByIdColumn_(sheet, recordId) {
    var rid = String(recordId || '').trim();
    if (!rid || !sheet) return null;
    try {
        var lastCol = sheet.getLastColumn();
        if (lastCol < 1) return null;
        var headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
        var headers = headerRow.map(function(h) {
            return (h === null || h === undefined) ? '' : String(h).trim();
        });
        var idCol = headers.indexOf('id');
        if (idCol < 0) return null;
        var lastRow = sheet.getLastRow();
        if (lastRow < 2) return null;
        var colValues = sheet.getRange(2, idCol + 1, lastRow, idCol + 1).getValues();
        for (var i = 0; i < colValues.length; i++) {
            if (String(colValues[i][0] || '').trim() === rid) {
                return i + 2;
            }
        }
    } catch (e) {
        Logger.log('findSheetRowNumberByIdColumn_ failed: ' + e.toString());
    }
    return null;
}

/**
 * دمج حقول processedItem في صف موجود (تحديث جزئي بالحقول المرسلة فقط).
 */
function mergeUpdateExistingSheetRow_(sheet, sheetName, rowNum, processedItem) {
    if (!sheet || !rowNum || rowNum < 2 || !processedItem || typeof processedItem !== 'object') {
        return false;
    }
    try {
        var lastCol = sheet.getLastColumn();
        if (lastCol < 1) return false;
        var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h) {
            return (h === null || h === undefined) ? '' : String(h).trim();
        });
        var rowVals = sheet.getRange(rowNum, 1, rowNum, headers.length).getValues()[0];
        headers.forEach(function(h, idx) {
            if (!h) return;
            if (Object.prototype.hasOwnProperty.call(processedItem, h)) {
                rowVals[idx] = toSheetCellValue_(h, processedItem[h], sheetName);
            }
        });
        sheet.getRange(rowNum, 1, rowNum, headers.length).setValues([rowVals]);
        return true;
    } catch (e) {
        Logger.log('mergeUpdateExistingSheetRow_ failed: ' + e.toString());
        return false;
    }
}

/**
 * تحديث صف واحد فقط في الورقة (بدون حذف الصفوف الأخرى)
 * @param {string} sheetName - اسم الورقة
 * @param {string} recordId - معرف السجل (id)
 * @param {object} updateData - البيانات المراد تحديثها
 * @param {string} spreadsheetId - معرف الجدول (اختياري)
 * @returns {object} - نتيجة العملية { success: boolean, message: string }
 */
function updateSingleRowInSheet(sheetName, recordId, updateData, spreadsheetId = null) {
    try {
        if (!spreadsheetId) spreadsheetId = getSpreadsheetId();
        
        // التحقق من صحة spreadsheetId
        if (!spreadsheetId || (typeof spreadsheetId === 'string' && spreadsheetId.trim() === '')) {
            return { success: false, message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات.' };
        }
        
        if (!sheetName || (typeof sheetName === 'string' && sheetName.trim() === '')) {
            return { success: false, message: 'اسم الورقة غير محدد.' };
        }
        
        if (!recordId) {
            return { success: false, message: 'معرف السجل غير محدد.' };
        }
        
        // فتح الجدول
        let spreadsheet;
        try {
            spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        } catch (error) {
            return { success: false, message: 'فشل فتح الجدول. يرجى التحقق من معرف الجدول: ' + error.toString() };
        }
        
        // فتح الورقة
        let sheet = spreadsheet.getSheetByName(sheetName);
        if (!sheet) {
            return { success: false, message: 'الورقة غير موجودة: ' + sheetName };
        }
        
        // قراءة جميع البيانات للعثور على السجل
        // ✅ skipSecurityFilter=true: يمنع استبدال passwordHash بـ '***' ثم إعادة كتابته
        const allData = readFromSheet(sheetName, spreadsheetId, true);
        const wantId = String(recordId == null ? '' : recordId).trim();
        const wantNorm = wantId && /^\d+(\.0+)?$/.test(wantId) ? String(parseInt(wantId, 10)) : wantId;
        const recordIndex = allData.findIndex(function (r) {
            if (!r) return false;
            var candidates = [r.id];
            if (sheetName === 'Employees') {
                candidates.push(r.employeeNumber, r.sapId);
            }
            for (var i = 0; i < candidates.length; i++) {
                var raw = String(candidates[i] == null ? '' : candidates[i]).trim();
                if (!raw) continue;
                var norm = /^\d+(\.0+)?$/.test(raw) ? String(parseInt(raw, 10)) : raw;
                if (raw === wantId || norm === wantNorm) return true;
            }
            return false;
        });
        
        if (recordIndex === -1) {
            return { success: false, message: 'السجل غير موجود في الورقة.' };
        }
        
        // تحديث البيانات في الذاكرة
        const record = allData[recordIndex];
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                record[key] = updateData[key];
            }
        }
        
        // ✅ Fix: استخدم رؤوس الورقة الفعلية (ترتيب الأعمدة الحقيقي) لتجنب انزلاق الأعمدة عند التحديث
        // الحصول على الرؤوس من الورقة (مع الحفاظ على الأعمدة الفارغة لضمان تطابق الفهارس)
        let headers = [];
        try {
            const lastCol = sheet.getLastColumn();
            if (lastCol > 0) {
                headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => {
                    if (h === undefined || h === null) return '';
                    return String(h).trim();
                });
            }
        } catch (eHeaders) {
            headers = [];
        }

        // التأكد من تحديث الرؤوس إذا لزم الأمر (إضافة أي أعمدة ناقصة)
        ensureSheetHeaders(sheet, sheetName, record);

        // إعادة قراءة الرؤوس بعد ensureSheetHeaders
        try {
            const lastCol2 = sheet.getLastColumn();
            if (lastCol2 > 0) {
                headers = sheet.getRange(1, 1, 1, lastCol2).getValues()[0].map(h => {
                    if (h === undefined || h === null) return '';
                    return String(h).trim();
                });
            }
        } catch (eHeaders2) {
            // keep whatever we had
        }

        const hasAnyValidHeader = headers.some(h => String(h || '').trim() !== '');
        if (!hasAnyValidHeader) {
            return { success: false, message: 'لا توجد رؤوس صالحة في الورقة.' };
        }

        syncContractorRequestRowForSheetHeaders_(record, headers, sheetName);
        
        // معالجة البيانات قبل الكتابة
        const processDataItem = function(item) {
            if (!item || typeof item !== 'object') return item;
            
            const processed = {};
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    processed[key] = item[key];
                }
            }
            
            // ✅ Attachments: store as plain text (NO JSON)
            if (processed.attachments !== undefined) {
                processed.attachments = formatAttachmentsText_(processed.attachments);
            }
            
            return processed;
        };
        
        const processedRecord = processDataItem(record);
        
        // إعداد قيم الصف حسب ترتيب الأعمدة الحقيقي
        const rowValues = headers.map(h => {
            if (!h) return '';
            // ✅ حماية ورقة Users: لا نكتب passwordHash إلا إذا كان SHA-256 صالحاً
            if (sheetName === 'Users' && h === 'passwordHash') {
                const newHash = String(processedRecord[h] || '').trim();
                if (!newHash || newHash === '***' || !isSha256Hash(newHash)) {
                    // الاحتفاظ بالقيمة الموجودة في الشيت (لا نكتب فوقها)
                    return toSheetCellValue_(h, allData[recordIndex][h] || '', sheetName);
                }
            }
            return toSheetCellValue_(h, processedRecord[h], sheetName);
        });
        
        // ✅ العثور على رقم الصف في الورقة (recordIndex + 2 لأن الصف الأول هو الرؤوس)
        // نقرأ جميع الصفوف للعثور على الصف الصحيح
        const dataRange = sheet.getDataRange();
        if (!dataRange) {
            return { success: false, message: 'لا توجد بيانات في الورقة.' };
        }
        
        const allRows = dataRange.getValues();
        if (allRows.length <= 1) {
            return { success: false, message: 'لا توجد بيانات في الورقة.' };
        }
        
        // البحث عن الصف الذي يحتوي على recordId
        let targetRowIndex = -1;
        const idColumnIndex = headers.indexOf('id');
        
        if (idColumnIndex >= 0) {
            for (let i = 1; i < allRows.length; i++) {
                const rowId = allRows[i][idColumnIndex];
                if (rowId && String(rowId).trim() === String(recordId).trim()) {
                    targetRowIndex = i + 1; // +1 لأن getRange() يستخدم 1-based indexing
                    break;
                }
            }
        }
        
        if (targetRowIndex === -1) {
            // إذا لم نجد الصف، نستخدم recordIndex + 2 كبديل
            targetRowIndex = recordIndex + 2;
        }
        
        // ✅ تحديث الصف المحدد فقط (بدون حذف أي شيء)
        try {
            sheet.getRange(targetRowIndex, 1, 1, headers.length).setValues([rowValues]);
            
            // ✅ مسح الcache بعد التحديث (يشمل batch_*)
            invalidateHseSheetCaches(sheetName);
            
            Logger.log('✅ Successfully updated single row at row ' + targetRowIndex + ' in sheet ' + sheetName + ' and cleared cache');
            return { success: true, message: 'تم تحديث السجل بنجاح' };
        } catch (error) {
            Logger.log('Error updating single row: ' + error.toString());
            return { success: false, message: 'حدث خطأ أثناء تحديث السجل: ' + error.toString() };
        }
        
    } catch (error) {
        Logger.log('Error in updateSingleRowInSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث السجل: ' + error.toString() };
    }
}

/**
 * الحصول على قيمة الكاش المقسمة إلى أجزاء
 */
function getChunkedCache_(cache, cacheKey) {
    try {
        const chunksInfoStr = cache.get(cacheKey + '_chunks');
        if (chunksInfoStr) {
            const chunksInfo = JSON.parse(chunksInfoStr);
            let jsonStr = '';
            for (let i = 0; i < chunksInfo.numChunks; i++) {
                const chunk = cache.get(cacheKey + '_chunk_' + i);
                if (chunk === null) {
                    return null; // جزء مفقود، الكاش غير صالح
                }
                jsonStr += chunk;
            }
            return jsonStr;
        }
        return cache.get(cacheKey);
    } catch (e) {
        Logger.log('Error in getChunkedCache_: ' + e.toString());
        return null;
    }
}

/**
 * حفظ قيمة الكاش مع تقسيمها تلقائياً إذا كانت كبيرة
 */
function putChunkedCache_(cache, cacheKey, valueString, ttlSec) {
    try {
        const size = valueString.length;
        // إذا كان الحجم أقل من 95 كيلوبايت، حفظ طبيعي
        if (size < 95000) {
            cache.put(cacheKey, valueString, ttlSec);
            cache.remove(cacheKey + '_chunks'); // تنظيف الفضلات المحتملة
            return true;
        }

        // حد أقصى للحجم لمنع الضغط الزائد
        if (size > 900000) {
            Logger.log('Data too large even for chunked caching: ' + size + ' bytes');
            return false;
        }

        const chunkSize = 90000;
        const numChunks = Math.ceil(size / chunkSize);
        
        cache.put(cacheKey + '_chunks', JSON.stringify({ numChunks: numChunks }), ttlSec);
        
        for (let i = 0; i < numChunks; i++) {
            const chunk = valueString.substring(i * chunkSize, (i + 1) * chunkSize);
            cache.put(cacheKey + '_chunk_' + i, chunk, ttlSec);
        }
        return true;
    } catch (e) {
        Logger.log('Error in putChunkedCache_: ' + e.toString());
        return false;
    }
}

/**
 * إبطال كاش قراءة الورقة ونسخة batchReadSheets لنفس الاسم (توحيد الإبطال بعد الكتابة).
 */
function invalidateHseSheetCaches(sheetName) {
    try {
        const sn = String(sheetName || '').trim();
        if (!sn) return;
        const cache = CacheService.getScriptCache();
        
        // مسح المفاتيح العادية
        cache.remove('hse_read_' + sn + '_v2');
        cache.remove('hse_read_' + sn + '_raw');
        cache.remove('batch_' + sn + '_v2');

        // مسح المفاتيح المجزأة
        const cleanSuffixes = ['_v2', '_raw'];
        cleanSuffixes.forEach(function(suffix) {
            const key = 'hse_read_' + sn + suffix;
            const chunksInfoStr = cache.get(key + '_chunks');
            if (chunksInfoStr) {
                try {
                    const chunksInfo = JSON.parse(chunksInfoStr);
                    for (let i = 0; i < chunksInfo.numChunks; i++) {
                        cache.remove(key + '_chunk_' + i);
                    }
                } catch(e) {}
                cache.remove(key + '_chunks');
            }
        });
    } catch (e) {
        Logger.log('invalidateHseSheetCaches: ' + e.toString());
    }
}

/**
 * قراءة بيانات من ورقة
 */
function readFromSheet(sheetName, spreadsheetId = null, skipSecurityFilter = false) {
    try {
        // ✅ CacheService: Check cache first for frequently-read sheets
        const cache = CacheService.getScriptCache();
        const cacheKey = 'hse_read_' + sheetName + (skipSecurityFilter ? '_raw' : '_v2');
        const cached = skipSecurityFilter ? null : getChunkedCache_(cache, cacheKey);
        
        if (cached) {
            try {
                Logger.log('Cache HIT for readFromSheet: ' + sheetName + (skipSecurityFilter ? ' (RAW)' : ''));
                var cachedRows = JSON.parse(cached);
                if (sheetName === 'Employees' && Array.isArray(cachedRows) && cachedRows.length === 0) {
                    try {
                        cache.remove(cacheKey);
                        cache.remove(cacheKey + '_chunks');
                    } catch (_rmEmpEmpty) {}
                } else {
                    return overlayUsersPresenceIfNeeded_(sheetName, skipSecurityFilter, cachedRows);
                }
            } catch (parseError) {
                Logger.log('Cache parse error for ' + sheetName + ': ' + parseError.toString());
                // Continue to read from sheet if cache is corrupted
            }
        }
        
        // استخدام getSpreadsheetId() إذا لم يكن spreadsheetId محدداً
        const finalSpreadsheetId = spreadsheetId || getSpreadsheetId();
        
        // التحقق من صحة المعاملات
        if (!finalSpreadsheetId || (typeof finalSpreadsheetId === 'string' && finalSpreadsheetId.trim() === '')) {
            Logger.log('Warning: Spreadsheet ID not provided');
            return [];
        }
        
        if (!sheetName || (typeof sheetName === 'string' && sheetName.trim() === '')) {
            Logger.log('Warning: Sheet name not provided');
            return [];
        }
        
        // فتح الجدول
        let spreadsheet;
        try {
            spreadsheet = SpreadsheetApp.openById(finalSpreadsheetId);
        } catch (error) {
            Logger.log('Error opening spreadsheet: ' + error.toString());
            return [];
        }
        
        // فتح الورقة
        const sheet = spreadsheet.getSheetByName(sheetName);
        if (!sheet) {
            Logger.log('Sheet not found: ' + sheetName);
            return [];
        }

        // قراءة البيانات - استخدام getDataRange للتحسين
        let data;
        try {
            const dataRange = sheet.getDataRange();
            if (!dataRange) {
                return [];
            }
            data = dataRange.getValues();
        } catch (error) {
            Logger.log('Error reading data range: ' + error.toString());
            return [];
        }
        
        if (!data || data.length === 0) {
            Logger.log('Sheet ' + sheetName + ' is empty (no data)');
            return []; // لا توجد بيانات على الإطلاق
        }
        
        if (data.length === 1) {
            Logger.log('Sheet ' + sheetName + ' contains only headers, no data rows');
            return []; // فقط رؤوس بدون بيانات
        }

        // تنظيف الرؤوس (إزالة المسافات الزائدة) - مهم: لا نحذف الرؤوس الفارغة حتى لا تختل فهارس الأعمدة
        // ✅ Fix: سابقاً كنا نعمل filter للرؤوس الفارغة، وهذا يسبب انزياح الأعمدة عند وجود أي رأس فارغ داخل الصف الأول.
        const headers = data[0].map(h => {
            if (h === undefined || h === null) return '';
            return String(h).trim();
        });
        
        const hasAnyValidHeader = headers.some(h => String(h || '').trim() !== '');
        if (!hasAnyValidHeader) {
            Logger.log('Sheet ' + sheetName + ' has no valid headers');
            return [];
        }
        
        const rows = data.slice(1);

        const sheetTz = spreadsheet ? spreadsheet.getSpreadsheetTimeZone() : Session.getScriptTimeZone();

        // ✅ إصلاح: إزالة التكرار عند القراءة (في حالة وجود تكرار في الورقة نفسها)
        // تحويل الصفوف إلى كائنات
        const allObjects = rows.map((row, rowIndex) => {
            // let وليس const: normalizeEmployeesRowColumnDrift_ يعيد تعيين obj
            let obj = {};
            headers.forEach((header, index) => {
                // تنظيف اسم الرأس (إزالة المسافات الزائدة)
                const cleanHeader = header ? String(header).trim() : '';
                if (!cleanHeader) {
                    return; // تجاهل الرؤوس الفارغة
                }
                
                const value = row[index];
                
                // معالجة القيم الفارغة بشكل أفضل
                if (value === undefined || value === null) {
                    obj[cleanHeader] = '';
                } else if (value === '') {
                    obj[cleanHeader] = '';
                } else {
                    // تحويل القيمة إلى النوع المناسب
                    let processedValue = value;
                    
                    // معالجة Object - تحويله إلى النوع المناسب
                    if (typeof processedValue === 'object' && processedValue !== null) {
                        // ✅ Dates from Sheets come as Date objects => format as ISO string with time
                        // ✅ إصلاح: تحويل Date objects إلى ISO strings كاملة مع الوقت للحقول التي تحتاج وقت
                        try {
                            if (Object.prototype.toString.call(processedValue) === '[object Date]' && !isNaN(processedValue.getTime())) {
                                // للحقول التي تحتاج وقت (visitDate, exitDate, checkIn, checkOut, etc.)
                                const timeFields = ['visitDate', 'exitDate', 'checkIn', 'checkOut', 'injuryDate', 'startDate', 'endDate', 'timeFrom', 'timeTo', 'closureTime', 'investigationDateTime', 'incidentDateTime', 'date'];
                                const timeOnlyFields = ['fromTime', 'toTime', 'startTime', 'endTime', 'timeFrom', 'timeTo'];
                                if (shouldPreserveSheetDateTimeAsText_(sheetName, cleanHeader)) {
                                    processedValue = normalizeSheetDateTimeText_(processedValue, sheetTz);
                                } else if (timeOnlyFields.includes(cleanHeader)) {
                                    // ✅ حقول الوقت كـ Date object (للسجلات القديمة المخزَّنة كـ fraction):
                                    //
                                    // المشكلة: Google Sheets يخزّن time-only fraction بناءً على timezone الجدول.
                                    // إذا الجدول في UTC+3 ودخلت "09:00"، Sheets يخزّن fraction تعني "09:00 محلي"
                                    // والـ Date.UTC المُرجَع يكون 05:53 (بسبب LMT 1899 للمنطقة الزمنية).
                                    //
                                    // ✗ استخدام getUTCHours يعطي "05:53" — خطأ! المستخدم لم يُدخل ذلك.
                                    // ✓ استخدام Utilities.formatDate(date, sheetTz, "HH:mm") يستعيد الوقت المحلي
                                    //   الأصلي لأن IANA tz rules تُطبَّق بشكل متماثل في الكتابة والقراءة (LMT يلغي LMT).
                                    //
                                    // السجلات الجديدة تُخزَّن كنص apostrophe ('09:00) فلا تدخل هذا الفرع أصلاً.
                                    try {
                                        processedValue = Utilities.formatDate(processedValue, sheetTz, "HH:mm");
                                    } catch (eFmt) {
                                        // Fallback: استخدم UTC إذا فشل formatDate لأي سبب
                                        const utcH = String(processedValue.getUTCHours()).padStart(2, '0');
                                        const utcM = String(processedValue.getUTCMinutes()).padStart(2, '0');
                                        processedValue = utcH + ':' + utcM;
                                    }
                                } else if (timeFields.includes(cleanHeader)) {
                                    // تحويل إلى ISO string كامل مع الوقت
                                    processedValue = processedValue.toISOString();
                                } else {
                                    // للحقول الأخرى (تاريخ فقط بدون وقت)، نستخدم yyyy-MM-dd
                                    processedValue = Utilities.formatDate(processedValue, sheetTz, 'yyyy-MM-dd');
                                }
                            }
                        } catch (eDate) {
                            // ignore
                        }

                        // إذا كان Object، نحاول استخراج القيمة منه
                        if (typeof processedValue === 'object' && processedValue !== null) {
                            if (processedValue.value !== undefined && processedValue.value !== null) {
                                // إذا كان يحتوي على خاصية value، نستخدمها
                                processedValue = String(processedValue.value);
                            } else if (Array.isArray(processedValue)) {
                                // إذا كان Array، نحوله إلى JSON
                                processedValue = JSON.stringify(processedValue);
                            } else {
                                // Object عادي - نحوله إلى JSON
                                // لكن لـ passwordHash، نحاول استخراج القيمة الأولى
                                if (cleanHeader === 'passwordHash') {
                                    const values = Object.values(processedValue);
                                    if (values.length > 0 && typeof values[0] === 'string') {
                                        processedValue = String(values[0]);
                                    } else {
                                        processedValue = JSON.stringify(processedValue);
                                    }
                                } else {
                                    processedValue = JSON.stringify(processedValue);
                                }
                            }
                        }
                    }
                    // إذا كانت القيمة نصية، نحاول تحليل JSON
                    else if (typeof processedValue === 'string' && processedValue.trim() !== '') {
                        let trimmedValue = processedValue.trim();

                        // ✅ Unwrap JSON-quoted strings (common for dates when JSON.stringify(Date) happened previously)
                        if ((trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
                            (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))) {
                            try {
                                const parsed = JSON.parse(trimmedValue);
                                if (typeof parsed === 'string') {
                                    trimmedValue = parsed.trim();
                                } else {
                                    trimmedValue = trimmedValue.substring(1, trimmedValue.length - 1).trim();
                                }
                            } catch (eQ) {
                                trimmedValue = trimmedValue.substring(1, trimmedValue.length - 1).trim();
                            }
                        }
                        
                        // محاولة تحليل JSON إذا كانت القيمة تبدو كـ JSON
                        if (trimmedValue.startsWith('[') || trimmedValue.startsWith('{')) {
                            try {
                                processedValue = JSON.parse(trimmedValue);
                            } catch (e) {
                                // إذا فشل التحليل، نترك القيمة كما هي
                                processedValue = trimmedValue;
                            }
                        } else {
                            processedValue = trimmedValue;
                        }
                    }
                    // الأنواع المنطقية (boolean) تُحفظ كما هي بدون تحويل إلى نص
                    else if (typeof processedValue === 'boolean') {
                        // keep boolean as-is (false stays false, true stays true)
                    }
                    // أي نوع آخر، نحوله إلى String
                    else if (typeof processedValue !== 'string') {
                        processedValue = String(processedValue);
                    }
                    
                    obj[cleanHeader] = processedValue;
                }
            });
            
            // التحقق من أن الكائن يحتوي على بيانات فعلية (ليس فارغاً تماماً)
            const hasData = Object.keys(obj).some(key => {
                const val = obj[key];
                return val !== '' && val !== null && val !== undefined;
            });
            
            // إذا كان الكائن فارغاً تماماً، نرجعه مع id فارغ على الأقل
            if (!hasData && Object.keys(obj).length === 0) {
                obj.id = '';
            }
            
            // ✅ تطبيع حقل النوع (gender) لورقة Employees عند القراءة
            if (sheetName === 'Employees' && obj.gender !== undefined) {
                obj.gender = normalizeGenderValue(obj.gender);
            }

            // ✅ إصلاح انزلاق أعمدة الاستيراد (append بترتيب رؤوس افتراضي ≠ ترتيب الورقة)
            if (sheetName === 'Employees') {
                obj = normalizeEmployeesRowColumnDrift_(obj);
            }

            // ✅ تطبيع حقل isActive: يُحوَّل دائماً إلى 'active' أو 'inactive'
            if (obj.isActive !== undefined) {
                const v = obj.isActive;
                if (v === true || v === 'true' || v === 'TRUE' || v === 1 || v === '1' || v === 'active') {
                    obj.isActive = 'active';
                } else if (v === false || v === 'false' || v === 'FALSE' || v === 0 || v === '0' || v === 'inactive') {
                    obj.isActive = 'inactive';
                } else if (v === '' || v === null || v === undefined) {
                    obj.isActive = 'active'; // القيمة الافتراضية للسجلات القديمة
                }
                // إذا كانت القيمة بالفعل 'active' أو 'inactive' فلا تغيير
            }
            
            return obj;
        }).filter(obj => {
            // تصفية الكائنات الفارغة تماماً (لكن نبقى على الكائنات التي تحتوي على id فقط)
            const keys = Object.keys(obj);
            if (keys.length === 0) return false;
            if (keys.length === 1 && keys[0] === 'id' && !obj.id) return false;
            return true;
        });
        
        // ✅ إصلاح: إزالة التكرار بناءً على id (الاحتفاظ بأحدث سجل في حالة التكرار)
        const uniqueObjects = [];
        const seenIds = new Map(); // Map<id, index> للاحتفاظ بآخر موضع لكل id
        
        allObjects.forEach((obj, index) => {
            if (!obj || !obj.id) {
                // إذا لم يكن هناك id، نضيفه كما هو
                uniqueObjects.push(obj);
                return;
            }
            
            const recordId = String(obj.id || '').trim();
            if (!recordId) {
                uniqueObjects.push(obj);
                return;
            }
            
            // في حالة وجود ID مكرر، نتحقق مما إذا كان المحتوى متطابقاً تماماً
            // إذا كان مختلفاً، فقد يكون خطأ في توليد الـ ID ونريد الاحتفاظ بكلا السجلين لضمان عدم فقدان البيانات
            if (seenIds.has(recordId)) {
                const oldIndex = seenIds.get(recordId);
                const oldObj = uniqueObjects[oldIndex];

                // ✅ Employees: فضّل الصف ذا الاسم/الأكمل بدل صف أحدث بلا اسم
                if (sheetName === 'Employees') {
                    const scoreNew = (typeof _employeeDupRowScore_ === 'function') ? _employeeDupRowScore_(obj) : 0;
                    const scoreOld = (typeof _employeeDupRowScore_ === 'function') ? _employeeDupRowScore_(oldObj) : 0;
                    const nameNew = String((obj && obj.name) || '').trim();
                    const nameOld = String((oldObj && oldObj.name) || '').trim();
                    if (!nameOld && nameNew) {
                        uniqueObjects[oldIndex] = obj;
                        return;
                    }
                    if (nameOld && !nameNew) {
                        return;
                    }
                    if (scoreNew > scoreOld) {
                        if (nameOld && !String(obj.name || '').trim()) {
                            obj.name = oldObj.name;
                        }
                        uniqueObjects[oldIndex] = obj;
                    } else if (nameNew && !nameOld) {
                        oldObj.name = nameNew;
                    }
                    return;
                }

                // مقارنة المحتوى (بدون ID) لتحديد هل هو تكرار حقيقي أم ID مكرر لبيانات مختلفة
                const oldStr = JSON.stringify({...oldObj, id: ''});
                const newStr = JSON.stringify({...obj, id: ''});

                if (oldStr === newStr) {
                    // تكرار حقيقي للبيانات — نتجاهله
                    return;
                } else {
                    // ID مكرر لكن البيانات مختلفة — نحتفظ بكليهما لعدم فقدان البيانات
                    obj.id = recordId + '_dup_' + index;
                    uniqueObjects.push(obj);
                    Logger.log('⚠️ Duplicate ID with different data in ' + sheetName + ': ' + recordId + '. Kept both.');
                }
            } else {
                seenIds.set(recordId, uniqueObjects.length);
                uniqueObjects.push(obj);
            }
        });
        
        if (allObjects.length !== uniqueObjects.length) {
            Logger.log('⚠️ Removed ' + (allObjects.length - uniqueObjects.length) + ' duplicate records from ' + sheetName);
        }

        // ✅ Security: Filter out sensitive fields for Users sheet
        if (!skipSecurityFilter && (sheetName === 'Users' || sheetName === 'users_db')) {
            const sensitiveFields = ['password', 'passwordHash', 'token', 'loginHistory', 'csrfToken', 'sessionToken', 'mfaSecretEnc'];
            uniqueObjects.forEach(obj => {
                sensitiveFields.forEach(field => {
                    if (obj.hasOwnProperty(field)) {
                        obj[field] = '***';
                    }
                });
            });
        }

        // ✅ CacheService: Save to cache before returning (2 minutes TTL) using chunked cache
        try {
            if (!skipSecurityFilter && !(sheetName === 'Employees' && uniqueObjects.length === 0)) {
                const serialized = JSON.stringify(uniqueObjects);
                const cachedOk = putChunkedCache_(cache, cacheKey, serialized, 120); // 2 minutes TTL
                if (cachedOk) {
                    Logger.log('Cached readFromSheet (chunked/normal): ' + sheetName + ' (' + serialized.length + ' bytes, ' + uniqueObjects.length + ' records)');
                }
            }
        } catch (cacheError) {
            Logger.log('Cache write failed for ' + sheetName + ': ' + cacheError.toString());
        }

        return overlayUsersPresenceIfNeeded_(sheetName, skipSecurityFilter, uniqueObjects);
    } catch (error) {
        Logger.log('Error reading from sheet: ' + error.toString());
        return [];
    }
}

/**
 * حالة الاتصال تعيش في كاش الحضور، لا في أعمدة الشيت.
 * أي قراءة لورقة Users تعود للعميل (مثل جدول المستخدمين للمدير) تُطابَق مع الكاش
 * حتى لا يظهر «متصل» لعلم isOnline قديم على الشيت.
 */
function overlayUsersPresenceIfNeeded_(sheetName, skipSecurityFilter, rows) {
    if (skipSecurityFilter) return rows;
    if (sheetName !== 'Users' && sheetName !== 'users_db') return rows;
    if (!Array.isArray(rows) || rows.length === 0) return rows;
    if (typeof getPresenceMapFromCache_ !== 'function' || typeof isUserEffectivelyOnline_ !== 'function') return rows;

    try {
        var ids = [];
        for (var i = 0; i < rows.length; i++) {
            if (rows[i] && rows[i].id) ids.push(String(rows[i].id));
        }
        var presenceMap = getPresenceMapFromCache_(ids);
        for (var j = 0; j < rows.length; j++) {
            var row = rows[j];
            if (!row) continue;
            var p = presenceMap[String(row.id || '')] || null;
            if (p && p.lastPresenceAt) row.lastPresenceAt = p.lastPresenceAt;
            if (p && p.lastLogout) row.lastLogout = p.lastLogout;
            row.isOnline = isUserEffectivelyOnline_(row, p);
        }
    } catch (e) {
        Logger.log('overlayUsersPresenceIfNeeded_ error: ' + e.toString());
    }
    return rows;
}

/**
 * حذف صف من ورقة بالـ id (بدون إعادة كتابة الشيت بالكامل)
 */
function deleteRowById(sheetName, recordId, spreadsheetId = null) {
    try {
        const finalSpreadsheetId = spreadsheetId || getSpreadsheetId();
        if (!finalSpreadsheetId || !sheetName || !recordId) {
            return { success: false, message: 'بيانات غير كاملة لحذف الصف' };
        }

        const ss = SpreadsheetApp.openById(finalSpreadsheetId);
        const sheet = ss.getSheetByName(sheetName);
        if (!sheet) return { success: false, message: 'الورقة غير موجودة: ' + sheetName };

        const lastCol = sheet.getLastColumn();
        if (lastCol <= 0) return { success: false, message: 'لا توجد أعمدة في الورقة' };

        const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => (h === null || h === undefined) ? '' : String(h).trim());
        const idCol = headers.indexOf('id');
        if (idCol < 0) return { success: false, message: 'عمود id غير موجود في الورقة' };

        const lastRow = sheet.getLastRow();
        if (lastRow <= 1) return { success: false, message: 'لا توجد بيانات للحذف' };

        const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
        const target = String(recordId).trim();
        let targetRow = -1;
        for (let i = 0; i < data.length; i++) {
            const rowId = data[i][idCol];
            if (rowId && String(rowId).trim() === target) {
                targetRow = i + 2; // header is row 1
                break;
            }
        }

        if (targetRow === -1) {
            return { success: false, message: 'السجل غير موجود للحذف' };
        }

        sheet.deleteRow(targetRow);
        SpreadsheetApp.flush();
        
        // ✅ مسح الcache بعد الحذف (يشمل batch_*)
        invalidateHseSheetCaches(sheetName);
        
        return { success: true, message: 'تم حذف السجل بنجاح', rowNumber: targetRow };
    } catch (e) {
        Logger.log('Error in deleteRowById: ' + e.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف السجل: ' + e.toString() };
    }
}

/**
 * حذف صف من ورقة حسب عمود محدد (مثل id / email / code ...)
 */
function deleteRowByField(sheetName, fieldName, fieldValue, spreadsheetId = null) {
    try {
        const finalSpreadsheetId = spreadsheetId || getSpreadsheetId();
        if (!finalSpreadsheetId || !sheetName || !fieldName) {
            return { success: false, message: 'بيانات غير كاملة لحذف الصف' };
        }
        const targetVal = (fieldValue === null || fieldValue === undefined) ? '' : String(fieldValue).trim();
        if (!targetVal) {
            return { success: false, message: 'قيمة البحث للحذف غير موجودة' };
        }

        const ss = SpreadsheetApp.openById(finalSpreadsheetId);
        const sheet = ss.getSheetByName(sheetName);
        if (!sheet) return { success: false, message: 'الورقة غير موجودة: ' + sheetName };

        const lastCol = sheet.getLastColumn();
        if (lastCol <= 0) return { success: false, message: 'لا توجد أعمدة في الورقة' };

        const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => (h === null || h === undefined) ? '' : String(h).trim());
        const colIndex = headers.indexOf(String(fieldName).trim());
        if (colIndex < 0) return { success: false, message: 'العمود غير موجود: ' + fieldName };

        const lastRow = sheet.getLastRow();
        if (lastRow <= 1) return { success: false, message: 'لا توجد بيانات للحذف' };

        const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
        let targetRow = -1;
        for (let i = 0; i < data.length; i++) {
            const cellVal = data[i][colIndex];
            if (cellVal !== null && cellVal !== undefined && String(cellVal).trim() === targetVal) {
                targetRow = i + 2;
                break;
            }
        }

        if (targetRow === -1) {
            return { success: false, message: 'السجل غير موجود للحذف' };
        }

        sheet.deleteRow(targetRow);
        SpreadsheetApp.flush();
        
        // ✅ مسح الcache بعد الحذف (يشمل batch_*)
        invalidateHseSheetCaches(sheetName);
        
        return { success: true, message: 'تم حذف السجل بنجاح', rowNumber: targetRow };
    } catch (e) {
        Logger.log('Error in deleteRowByField: ' + e.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف السجل: ' + e.toString() };
    }
}

/**
 * إنشاء جميع الأوراق المطلوبة تلقائياً
 */
function initializeSheets(spreadsheetId = null) {
    try {
        // استخدام getSpreadsheetId() للحصول على القيمة الصحيحة
        const finalSpreadsheetId = spreadsheetId || getSpreadsheetId();
        
        if (!finalSpreadsheetId || (typeof finalSpreadsheetId === 'string' && finalSpreadsheetId.trim() === '')) {
            return { success: false, message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات.' };
        }
        
        let spreadsheet;
        try {
            spreadsheet = SpreadsheetApp.openById(finalSpreadsheetId);
        } catch (error) {
            return { success: false, message: 'فشل فتح الجدول. يرجى التحقق من معرف الجدول: ' + error.toString() };
        }
        
        let createdSheets = [];
        let existingSheets = [];
        let errorSheets = [];
        
        const requiredSheets = getRequiredSheets();
        requiredSheets.forEach(sheetName => {
            try {
                let sheet = spreadsheet.getSheetByName(sheetName);
                if (!sheet) {
                    // إنشاء الورقة مع الرؤوس الافتراضية
                    sheet = createSheetWithHeaders(spreadsheet, sheetName);
                    createdSheets.push(sheetName);
                } else {
                    // إذا كانت الورقة موجودة، نتأكد من وجود الرؤوس
                    try {
                        const lastColumn = sheet.getLastColumn();
                        let existingHeaders = [];
                        if (lastColumn > 0) {
                            const headerRange = sheet.getRange(1, 1, 1, lastColumn);
                            existingHeaders = headerRange.getValues()[0];
                        }
                        
                        if (existingHeaders.length === 0 || existingHeaders[0] === '' || !existingHeaders[0]) {
                            // إضافة الرؤوس الافتراضية إذا لم تكن موجودة
                            const headers = getDefaultHeaders(sheetName);
                            if (headers && headers.length > 0) {
                                sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
                                const headerRange = sheet.getRange(1, 1, 1, headers.length);
                                headerRange.setFontWeight('bold');
                                headerRange.setBackground('#f0f0f0');
                                headerRange.setFontSize(11);
                            }
                            createdSheets.push(sheetName + ' (تم إضافة الرؤوس)');
                        } else {
                            existingSheets.push(sheetName);
                        }
                    } catch (error) {
                        Logger.log('Error checking headers for ' + sheetName + ': ' + error.toString());
                        errorSheets.push(sheetName + ' (خطأ: ' + error.toString() + ')');
                    }
                }
            } catch (error) {
                Logger.log('Error initializing sheet ' + sheetName + ': ' + error.toString());
                errorSheets.push(sheetName + ' (خطأ: ' + error.toString() + ')');
            }
        });
        
        let message = 'تم إنشاء جميع الأوراق بنجاح';
        if (createdSheets.length > 0) {
            message += '\n\nالأوراق المنشأة: ' + createdSheets.join(', ');
        }
        if (existingSheets.length > 0) {
            message += '\n\nالأوراق الموجودة: ' + existingSheets.join(', ');
        }
        if (errorSheets.length > 0) {
            message += '\n\nالأوراق التي حدث بها خطأ: ' + errorSheets.join(', ');
        }
        
        // بعد التهيئة، نتأكد من إصلاح رؤوس الأوراق
        try {
            fixUsersSheetHeaders(finalSpreadsheetId);
        } catch (fixError) {
            Logger.log('Warning: Could not fix Users sheet headers: ' + fixError.toString());
        }
        
        // إصلاح رؤوس الأوراق المفقودة
        try {
            fixMissingSheetHeaders(finalSpreadsheetId);
        } catch (fixError) {
            Logger.log('Warning: Could not fix missing sheet headers: ' + fixError.toString());
        }
        
        return { 
            success: true, 
            message: message, 
            created: createdSheets, 
            existing: existingSheets,
            errors: errorSheets 
        };
    } catch (error) {
        Logger.log('Error in initializeSheets: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تهيئة الأوراق: ' + error.toString() };
    }
}

/**
 * إصلاح رؤوس الأوراق المفقودة (UserTasks, UserInstructions, ModuleManagement, Notifications)
 */
function fixMissingSheetHeaders(spreadsheetId = null) {
    try {
        if (!spreadsheetId) spreadsheetId = getSpreadsheetId();
        
        if (!spreadsheetId || (typeof spreadsheetId === 'string' && spreadsheetId.trim() === '')) {
            return { success: false, message: 'معرف Google Sheets غير محدد' };
        }
        
        const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        const sheetsToFix = ['UserTasks', 'UserInstructions', 'ModuleManagement', 'Notifications'];
        const fixedSheets = [];
        const errors = [];
        
        sheetsToFix.forEach(sheetName => {
            try {
                let sheet = spreadsheet.getSheetByName(sheetName);
                
                if (!sheet) {
                    // إنشاء الورقة إذا لم تكن موجودة
                    sheet = spreadsheet.insertSheet(sheetName);
                    Logger.log('Created sheet: ' + sheetName);
                }
                
                // الحصول على الرؤوس الافتراضية
                const defaultHeaders = getDefaultHeaders(sheetName);
                if (!defaultHeaders || defaultHeaders.length === 0) {
                    Logger.log('No default headers for: ' + sheetName);
                    return;
                }
                
                // قراءة الرؤوس الحالية
                const lastColumn = sheet.getLastColumn();
                let existingHeaders = [];
                if (lastColumn > 0) {
                    const headerRange = sheet.getRange(1, 1, 1, lastColumn);
                    existingHeaders = headerRange.getValues()[0];
                }
                
                // التحقق من وجود الرؤوس
                if (existingHeaders.length === 0 || existingHeaders[0] === '' || !existingHeaders[0]) {
                    // إضافة الرؤوس الافتراضية
                    sheet.getRange(1, 1, 1, defaultHeaders.length).setValues([defaultHeaders]);
                    
                    // تنسيق الرؤوس
                    const headerRange = sheet.getRange(1, 1, 1, defaultHeaders.length);
                    headerRange.setFontWeight('bold');
                    headerRange.setBackground('#f0f0f0');
                    headerRange.setFontSize(11);
                    
                    fixedSheets.push(sheetName);
                    Logger.log('Fixed headers for: ' + sheetName);
                } else {
                    // التحقق من أن جميع الرؤوس الافتراضية موجودة
                    let needsUpdate = false;
                    const missingHeaders = [];
                    
                    defaultHeaders.forEach(header => {
                        if (!existingHeaders.includes(header)) {
                            missingHeaders.push(header);
                            needsUpdate = true;
                        }
                    });
                    
                    if (needsUpdate) {
                        // إضافة الرؤوس المفقودة
                        const newHeaders = [...existingHeaders];
                        missingHeaders.forEach(header => {
                            // إضافة الرأس في الموضع المناسب
                            const defaultIndex = defaultHeaders.indexOf(header);
                            if (defaultIndex > 0) {
                                const prevHeader = defaultHeaders[defaultIndex - 1];
                                const prevIndex = newHeaders.indexOf(prevHeader);
                                if (prevIndex >= 0) {
                                    newHeaders.splice(prevIndex + 1, 0, header);
                                } else {
                                    newHeaders.push(header);
                                }
                            } else {
                                newHeaders.unshift(header);
                            }
                        });
                        
                        // تحديث الرؤوس
                        sheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
                        
                        // تنسيق الرؤوس
                        const headerRange = sheet.getRange(1, 1, 1, newHeaders.length);
                        headerRange.setFontWeight('bold');
                        headerRange.setBackground('#f0f0f0');
                        headerRange.setFontSize(11);
                        
                        fixedSheets.push(sheetName + ' (تم إضافة رؤوس مفقودة)');
                        Logger.log('Added missing headers for: ' + sheetName);
                    } else {
                        Logger.log('Headers already correct for: ' + sheetName);
                    }
                }
            } catch (error) {
                Logger.log('Error fixing headers for ' + sheetName + ': ' + error.toString());
                errors.push(sheetName + ' (خطأ: ' + error.toString() + ')');
            }
        });
        
        let message = 'تم إصلاح رؤوس الأوراق بنجاح';
        if (fixedSheets.length > 0) {
            message += '\n\nالأوراق التي تم إصلاحها: ' + fixedSheets.join(', ');
        }
        if (errors.length > 0) {
            message += '\n\nالأوراق التي حدث بها خطأ: ' + errors.join(', ');
        }
        
        return { 
            success: true, 
            message: message,
            fixed: fixedSheets,
            errors: errors
        };
    } catch (error) {
        Logger.log('Error in fixMissingSheetHeaders: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إصلاح الرؤوس: ' + error.toString() };
    }
}

/**
 * إصلاح رأس ورقة Users لإضافة password و passwordHash إذا لم يكونا موجودين
 */
function fixUsersSheetHeaders(spreadsheetId = null) {
    try {
        if (!spreadsheetId) spreadsheetId = getSpreadsheetId();
        
        if (!spreadsheetId || (typeof spreadsheetId === 'string' && spreadsheetId.trim() === '')) {
            return { success: false, message: 'معرف Google Sheets غير محدد' };
        }
        
        const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        const sheet = spreadsheet.getSheetByName('Users');
        
        if (!sheet) {
            return { success: false, message: 'ورقة Users غير موجودة' };
        }
        
        // قراءة الرؤوس الحالية
        const lastColumn = sheet.getLastColumn();
        let existingHeaders = [];
        if (lastColumn > 0) {
            const headerRange = sheet.getRange(1, 1, 1, lastColumn);
            existingHeaders = headerRange.getValues()[0];
        }
        
        let headersUpdated = false;
        const emailIndex = existingHeaders.indexOf('email');
        
        // التحقق من وجود password
        if (!existingHeaders.includes('password')) {
            if (emailIndex >= 0) {
                existingHeaders.splice(emailIndex + 1, 0, 'password');
            } else {
                const nameIndex = existingHeaders.indexOf('name');
                if (nameIndex >= 0) {
                    existingHeaders.splice(nameIndex + 1, 0, 'password');
                } else {
                    existingHeaders.splice(1, 0, 'password');
                }
            }
            headersUpdated = true;
        }
        
        // التحقق من وجود passwordHash
        if (!existingHeaders.includes('passwordHash')) {
            const passwordIndex = existingHeaders.indexOf('password');
            if (passwordIndex >= 0) {
                existingHeaders.splice(passwordIndex + 1, 0, 'passwordHash');
            } else if (emailIndex >= 0) {
                existingHeaders.splice(emailIndex + 2, 0, 'passwordHash');
            } else {
                const nameIndex = existingHeaders.indexOf('name');
                if (nameIndex >= 0) {
                    existingHeaders.splice(nameIndex + 2, 0, 'passwordHash');
                } else {
                    existingHeaders.splice(2, 0, 'passwordHash');
                }
            }
            headersUpdated = true;
        }

        // إضافة أي رؤوس ناقصة من التعريف الافتراضي (مثل mfaEnabled / mfaSecretEnc / mfaEnrolledAt)
        var defaultUsersHeaders = (typeof getDefaultHeaders === 'function') ? getDefaultHeaders('Users') : [];
        if (defaultUsersHeaders && defaultUsersHeaders.length) {
            defaultUsersHeaders.forEach(function(header) {
                if (header && existingHeaders.indexOf(header) === -1) {
                    existingHeaders.push(header);
                    headersUpdated = true;
                }
            });
        }
        
        if (headersUpdated) {
            // تحديث الرؤوس
            sheet.getRange(1, 1, 1, existingHeaders.length).setValues([existingHeaders]);
            
            // تنسيق الرؤوس
            const headerRange = sheet.getRange(1, 1, 1, existingHeaders.length);
            headerRange.setFontWeight('bold');
            headerRange.setBackground('#f0f0f0');
            headerRange.setFontSize(11);
            
            Logger.log('Fixed Users sheet headers: Added missing columns');
            return { success: true, message: 'تم إصلاح رأس ورقة Users بنجاح - تمت إضافة الأعمدة الناقصة' };
        }
        
        return { success: true, message: 'رأس ورقة Users صحيح بالفعل' };
    } catch (error) {
        Logger.log('Error fixing Users sheet headers: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إصلاح رأس ورقة Users: ' + error.toString() };
    }
}

/**
 * أكبر رقم تسلسلي موحّد من ورقة PTWRegistry: id (REG)، permitId (PTW)، sequentialNumber.
 * يمنع اختلاف الرقم التالي بين عمود id و permitId عند التوليد السابق المنفصل.
 */
function getMaxUnifiedPTWRegistryNumeric_(existingData) {
    var maxN = 0;
    if (!existingData || !Array.isArray(existingData)) return maxN;
    var regRe = /^REG_(\d+)$/i;
    var ptwRe = /^PTW_(\d+)$/i;
    for (var i = 0; i < existingData.length; i++) {
        var record = existingData[i];
        if (!record) continue;
        var idStr = record.id != null ? String(record.id).trim() : '';
        var pidStr = record.permitId != null ? String(record.permitId).trim() : '';
        var m;
        var n;
        if (idStr && (m = idStr.match(regRe))) {
            n = parseInt(m[1], 10);
            if (!isNaN(n) && n > maxN) maxN = n;
        }
        if (pidStr && (m = pidStr.match(ptwRe))) {
            n = parseInt(m[1], 10);
            if (!isNaN(n) && n > maxN) maxN = n;
        }
        if (record.sequentialNumber != null && record.sequentialNumber !== '') {
            n = parseInt(String(record.sequentialNumber).trim(), 10);
            if (!isNaN(n) && n > maxN) maxN = n;
        }
    }
    return maxN;
}

/** استخراج الرقم من معرف بتنسيق PREFIX_123 */
function extractNumericFromPrefixedId_(value, prefix) {
    var pfx = String(prefix || '').toUpperCase();
    var str = String(value || '').trim();
    var m = str.match(new RegExp('^' + pfx + '_(\\d+)$', 'i'));
    if (!m) return null;
    var n = parseInt(m[1], 10);
    return (isNaN(n) || n < 1) ? null : n;
}

/**
 * ============================================
 * نظام توليد المعرفات الموحد
 * ============================================
 * 
 * توليد معرفات بتنسيق [PREFIX]_[NUMBER] مثل PTW_01, INC_01, إلخ
 * 
 * @param {string} prefix - البادئة (3 أحرف) مثل PTW, INC, NRM
 * @param {string} sheetName - اسم الورقة في Google Sheets
 * @param {string} spreadsheetId - معرف الجدول (اختياري، يستخدم الافتراضي إذا لم يُحدد)
 * @param {string} idField - الحقل الذي يحتوي المعرف (id أو permitId)
 * @returns {string} معرف جديد بالتنسيق PREFIX_NUMBER
 */
function generateSequentialId(prefix, sheetName, spreadsheetId, idField) {
    try {
        if (!prefix || prefix.length !== 3) {
            Logger.log('Invalid prefix: ' + prefix + ' - must be exactly 3 characters');
            // Fallback to UUID if prefix is invalid
            return Utilities.getUuid();
        }
        
        if (!sheetName) {
            Logger.log('Sheet name is required for generateSequentialId');
            return Utilities.getUuid();
        }
        
        // تحويل البادئة إلى أحرف كبيرة
        prefix = prefix.toUpperCase();
        var idKey = (idField && typeof idField === 'string') ? idField : 'id';
        
        // استخدام معرف الجدول المحدد أو الافتراضي
        var targetSpreadsheetId = spreadsheetId || getSpreadsheetId();
        if (!targetSpreadsheetId) {
            Logger.log('Spreadsheet ID not available');
            return Utilities.getUuid();
        }
        
        // قراءة البيانات الموجودة من الورقة
        var existingData = [];
        try {
            existingData = readFromSheet(sheetName, targetSpreadsheetId);
        } catch (readError) {
            Logger.log('Error reading sheet ' + sheetName + ': ' + readError.toString());
            // إذا فشلت القراءة، نبدأ من 1
            existingData = [];
        }
        
        // استخراج جميع الأرقام الموجودة بتنسيق PREFIX_NUMBER
        var existingNumbers = [];
        if (existingData && Array.isArray(existingData)) {
            if (sheetName === 'PTWRegistry') {
                var unifiedMax = getMaxUnifiedPTWRegistryNumeric_(existingData);
                if (unifiedMax > 0) {
                    existingNumbers.push(unifiedMax);
                }
            } else {
                for (var i = 0; i < existingData.length; i++) {
                    var record = existingData[i];
                    if (record && record[idKey]) {
                        var id = record[idKey].toString();
                        // التحقق من التنسيق: PREFIX_NUMBER (مثل PTW_01, PTW_100, إلخ)
                        var match = id.match(new RegExp('^' + prefix + '_(\\d+)$'));
                        if (match) {
                            // استخراج الرقم
                            var numberPart = match[1];
                            var number = parseInt(numberPart, 10);
                            if (!isNaN(number) && number > 0) {
                                existingNumbers.push(number);
                            }
                        }
                    }
                }
            }
        }
        
        // حساب الرقم التالي
        var nextNumber = 1;
        if (existingNumbers.length > 0) {
            nextNumber = Math.max.apply(null, existingNumbers) + 1;
        }
        
        // التأكد من عدم تجاوز الحد الأقصى (1000000)
        if (nextNumber > 1000000) {
            Logger.log('Warning: Sequential number exceeded maximum (1000000), using UUID fallback');
            return Utilities.getUuid();
        }
        
        // إرجاع المعرف الجديد بصيغة موحدة: PREFIX_0001
        return prefix + '_' + nextNumber.toString().padStart(4, '0');
        
    } catch (error) {
        Logger.log('Error in generateSequentialId: ' + error.toString());
        // في حالة الخطأ، نستخدم UUID كبديل
        return Utilities.getUuid();
    }
}

/**
 * اقتصار صف PTW على رؤوس PTW الافتراضية وتبسيط القيم لصيغة آمنة للورقة.
 */
function normalizePTWRowForSheet_(processed) {
    if (!processed || typeof processed !== 'object') return processed;
    var allowed = getDefaultHeaders('PTW');
    if (!allowed || !allowed.length) return processed;
    var out = {};
    for (var i = 0; i < allowed.length; i++) {
        var h = allowed[i];
        if (!processed.hasOwnProperty(h)) continue;
        var v = processed[h];
        if (v === undefined) continue;
        if (v === null) {
            out[h] = v;
            continue;
        }
        if (typeof v === 'object') {
            if (Object.prototype.toString.call(v) === '[object Date]') {
                out[h] = v;
            } else if (Array.isArray(v)) {
                out[h] = v.map(function(x) {
                    if (x === null || x === undefined) return '';
                    if (typeof x === 'object') {
                        return normalizeTextValue(x.name || x.label || x.title || String(x));
                    }
                    return normalizeTextValue(String(x));
                }).filter(Boolean).join('، ');
            } else {
                out[h] = normalizeTextValue(v.name || v.label || v.title || String(v));
            }
        } else {
            out[h] = v;
        }
    }
    return out;
}

/**
 * إرفاق السجل المُعرَّف بعد الكتابة لورقة PTWRegistry في ردّ append/save (للواجهة).
 */
function withResolvedPTWRegistry_(sheetName, result, resolved) {
    if (result && result.success === true && sheetName === 'PTWRegistry' && resolved && typeof resolved === 'object') {
        result.resolvedPTWRegistry = resolved;
    }
    return result;
}

/**
 * Resolve PTWRegistry id/permitId using hybrid mapping (old -> new).
 * Keeps legacy compatibility while forcing new writes to sequential IDs.
 */
function resolvePTWRegistryIdsForWrite_(record, spreadsheetId) {
    if (!record || typeof record !== 'object') return record;

    var resolved = {};
    for (var key in record) {
        if (record.hasOwnProperty(key)) resolved[key] = record[key];
    }

    resolved.id = resolveHybridId_(resolved.id, 'REG', 'PTWRegistry', 'id', spreadsheetId, true);
    var regNum = extractNumericFromPrefixedId_(resolved.id, 'REG');
    if (regNum !== null) {
        resolved.permitId = 'PTW_' + String(regNum).padStart(4, '0');
        resolved.sequentialNumber = regNum;
    } else {
        resolved.permitId = resolveHybridId_(resolved.permitId, 'PTW', 'PTWRegistry', 'permitId', spreadsheetId, true);
        var ptwNum = extractNumericFromPrefixedId_(resolved.permitId, 'PTW');
        if (ptwNum !== null) {
            resolved.sequentialNumber = ptwNum;
        }
    }
    return resolved;
}

/**
 * منع تكرار رقم التصريح الورقي في PTWRegistry.
 * إذا وُجد سجل بنفس paperPermitNumber نعيد استخدام id/permitId/sequentialNumber الخاصة به.
 */
function resolvePTWRegistryByPaperPermitNumber_(record, spreadsheetId) {
    if (!record || typeof record !== 'object') return record;
    var paper = String(record.paperPermitNumber || '').trim();
    if (!paper) return record;

    try {
        var targetSpreadsheetId = spreadsheetId || getSpreadsheetId();
        var existingData = readFromSheet('PTWRegistry', targetSpreadsheetId);
        if (!Array.isArray(existingData) || existingData.length === 0) return record;

        for (var i = 0; i < existingData.length; i++) {
            var row = existingData[i];
            if (!row) continue;
            if (String(row.paperPermitNumber || '').trim() !== paper) continue;

            var existingId = String(row.id || '').trim();
            var existingPermitId = String(row.permitId || '').trim();
            if (existingId) record.id = existingId;
            if (existingPermitId) record.permitId = existingPermitId;

            var n = parseInt(String(row.sequentialNumber || '').trim(), 10);
            if (!isNaN(n) && n > 0) {
                record.sequentialNumber = n;
            } else {
                var fromReg = extractNumericFromPrefixedId_(existingId, 'REG');
                var fromPtw = extractNumericFromPrefixedId_(existingPermitId, 'PTW');
                var fallbackN = fromReg || fromPtw;
                if (fallbackN) record.sequentialNumber = fallbackN;
            }
            return record;
        }
    } catch (e) {
        Logger.log('resolvePTWRegistryByPaperPermitNumber_ failed: ' + e.toString());
    }
    return record;
}

function resolveHybridId_(rawValue, prefix, sheetName, idField, spreadsheetId, mapUnknownFormats) {
    var value = (rawValue === null || rawValue === undefined) ? '' : String(rawValue).trim();
    var normalizedPrefix = String(prefix || '').toUpperCase();

    if (value && isSequentialIdForPrefix_(value, normalizedPrefix)) {
        return normalizeSequentialId_(value, normalizedPrefix);
    }

    // ✅ حماية: رفض المعرفات المؤقتة (TMP) — لا تُسجّل في PTWIdMapping
    // المعرفات المؤقتة تُولّد عند كل تحميل للصفحة وتتغير في كل مرة
    // تسجيلها يسبب نمو لا نهائي في جدول PTWIdMapping
    if (value && value.indexOf('_TMP_') >= 0) {
        Logger.log('⚠️ resolveHybridId_: رفض معرف مؤقت (TMP) — سيتم توليد معرف تسلسلي جديد بدلاً منه: ' + value);
        return generateSequentialId(normalizedPrefix, sheetName, spreadsheetId, idField);
    }

    // ✅ استخدام Script Lock لمنع التوليد المتزامن المكرر
    var lock = LockService.getScriptLock();
    var hasLock = false;
    try {
        lock.waitLock(30000); // الانتظار حتى 30 ثانية
        hasLock = true;
    } catch (e) {
        Logger.log('Lock timeout in resolveHybridId_ for value: ' + value);
    }

    try {
        if (value && isLegacyTimestampIdForPrefix_(value, normalizedPrefix)) {
            var mappedId = findMappedId_(sheetName, idField, normalizedPrefix, value, spreadsheetId);
            if (mappedId) return mappedId;
            var generatedFromLegacy = generateSequentialId(normalizedPrefix, sheetName, spreadsheetId, idField);
            upsertIdMapping_(sheetName, idField, normalizedPrefix, value, generatedFromLegacy, spreadsheetId);
            return generatedFromLegacy;
        }

        if (value && !isSequentialIdForPrefix_(value, normalizedPrefix)) {
            if (mapUnknownFormats !== true) {
                return value;
            }
            // Unknown format: preserve compatibility by mapping it once.
            var mappedUnknown = findMappedId_(sheetName, idField, normalizedPrefix, value, spreadsheetId);
            if (mappedUnknown) return mappedUnknown;
            var generatedFromUnknown = generateSequentialId(normalizedPrefix, sheetName, spreadsheetId, idField);
            upsertIdMapping_(sheetName, idField, normalizedPrefix, value, generatedFromUnknown, spreadsheetId);
            return generatedFromUnknown;
        }

        return generateSequentialId(normalizedPrefix, sheetName, spreadsheetId, idField);
    } finally {
        if (hasLock) {
            try {
                lock.releaseLock();
            } catch (lockError) {
                Logger.log('Error releasing lock in resolveHybridId_: ' + lockError.toString());
            }
        }
    }
}

function isSequentialIdForPrefix_(value, prefix) {
    var str = String(value || '').trim();
    var pfx = String(prefix || '').toUpperCase();
    return new RegExp('^' + pfx + '_\\d+$').test(str);
}

function isLegacyTimestampIdForPrefix_(value, prefix) {
    var str = String(value || '').trim();
    var pfx = String(prefix || '').toUpperCase();
    return new RegExp('^' + pfx + '_\\d{10,}_[a-z0-9]+$', 'i').test(str);
}

function normalizeSequentialId_(value, prefix) {
    var str = String(value || '').trim();
    var pfx = String(prefix || '').toUpperCase();
    var match = str.match(new RegExp('^' + pfx + '_(\\d+)$'));
    if (!match) return str;
    var n = parseInt(match[1], 10);
    if (isNaN(n) || n <= 0) return str;
    return pfx + '_' + String(n).padStart(4, '0');
}

function getIdMappingEntityType_(sheetName, idField, prefix) {
    return String(sheetName || '').trim() + ':' + String(idField || '').trim() + ':' + String(prefix || '').toUpperCase();
}

function findMappedId_(sheetName, idField, prefix, oldId, spreadsheetId) {
    try {
        var targetSpreadsheetId = spreadsheetId || getSpreadsheetId();
        var mapData = readFromSheet('PTWIdMapping', targetSpreadsheetId);
        if (!Array.isArray(mapData) || mapData.length === 0) return '';

        var expectedEntity = getIdMappingEntityType_(sheetName, idField, prefix);
        var oldValue = String(oldId || '').trim();
        
        try {
            var cache = CacheService.getScriptCache();
            var cacheKey = 'idmap_' + expectedEntity + '_' + oldValue;
            var cachedNewId = cache.get(cacheKey);
            if (cachedNewId) {
                return cachedNewId;
            }
        } catch (e) {
            // Ignore cache errors
        }

        for (var i = 0; i < mapData.length; i++) {
            var row = mapData[i];
            if (!row) continue;
            var rowEntity = String(row.entityType || '').trim();
            var rowOld = String(row.oldId || '').trim();
            var rowNew = String(row.newId || '').trim();
            if (rowEntity === expectedEntity && rowOld === oldValue && rowNew) {
                return rowNew;
            }
        }
        return '';
    } catch (e) {
        return '';
    }
}

function upsertIdMapping_(sheetName, idField, prefix, oldId, newId, spreadsheetId) {
    try {
        if (!oldId || !newId) return;
        var targetSpreadsheetId = spreadsheetId || getSpreadsheetId();
        var nowIso = new Date().toISOString();
        var entityType = getIdMappingEntityType_(sheetName, idField, prefix);
        var oldValue = String(oldId).trim();
        var newValue = String(newId).trim();

        // Make sure the map sheet exists with headers
        createSheetWithHeaders(SpreadsheetApp.openById(targetSpreadsheetId), 'PTWIdMapping', [{}]);
        ensureSheetHeaders(SpreadsheetApp.openById(targetSpreadsheetId).getSheetByName('PTWIdMapping'), 'PTWIdMapping', [{}]);

        var existing = readFromSheet('PTWIdMapping', targetSpreadsheetId);
        var recordId = '';
        if (Array.isArray(existing)) {
            for (var i = 0; i < existing.length; i++) {
                var row = existing[i];
                if (!row) continue;
                if (String(row.entityType || '').trim() === entityType && String(row.oldId || '').trim() === oldValue) {
                    recordId = row.id ? String(row.id).trim() : '';
                    break;
                }
            }
        }

        var payload = {
            id: recordId || Utilities.getUuid(),
            entityType: entityType,
            oldId: oldValue,
            newId: newValue,
            createdAt: recordId ? undefined : nowIso,
            updatedAt: nowIso
        };
        saveToSheet('PTWIdMapping', payload, targetSpreadsheetId);
        SpreadsheetApp.flush(); // ✅ كتابة البيانات فوراً لمنع تعارض القراءات المتتالية
        
        try {
            var cache = CacheService.getScriptCache();
            var cacheKey = 'idmap_' + entityType + '_' + oldValue;
            cache.put(cacheKey, newValue, 21600); // 6 hours
        } catch (e) {
            // Ignore cache errors
        }
    } catch (e) {
        Logger.log('Failed to upsert PTW ID mapping: ' + e.toString());
    }
}

/**
 * توليد معرف ملاحظة يومية بالتنسيق DOB-NNNN.
 * يأخذ أكبر رقم مستخدم من أي id (DOB_N أو OBS-YYYYMM-NNNN أو أي ذيل رقمي) لتفادي التكرار.
 * التسلسل مستمر ولا يعاد تعيينه كل شهر.
 * @param {string} sheetName - اسم الورقة (مثل DailyObservations)
 * @param {string} spreadsheetId - معرف الجدول (اختياري)
 * @returns {string} معرف جديد مثل DOB-2999
 */
function generateDailyObservationId(sheetName, spreadsheetId) {
    var identity = generateNextObservationIdentity(sheetName, spreadsheetId);
    return identity.id;
}

/**
 * توليد معرف ملاحظة يومية (DOB-NNNN) مع isoCode (OBS-YYYYMM-NNNN) بضمان التسلسل المستمر.
 * - يقفل بواسطة Script Lock لمنع تكرار الرقم مع استدعاءات متزامنة (مستخدمين متعددين).
 * - يمسح كاش الورقة ويقرأ مباشرة من الجدول (مصدر الحقيقة) لضمان رقم غير مكرر.
 * - يفحص عمودي id و isoCode لاستخراج أكبر رقم مستخدم.
 * @param {string} sheetName - اسم الورقة (مثل DailyObservations)
 * @param {string} spreadsheetId - معرف الجدول (اختياري)
 * @returns {{id: string, isoCode: string}} معرف جديد مثل { id: 'DOB-2999', isoCode: 'OBS-202602-2999' }
 */
function generateNextObservationIdentity(sheetName, spreadsheetId, skipLock) {
    var lock = null;
    try {
        var targetSpreadsheetId = spreadsheetId || getSpreadsheetId();
        if (!targetSpreadsheetId || !sheetName) {
            var uuidId = 'DOB-' + String(Utilities.getUuid()).replace(/[^0-9]/g, '').substring(0, 4);
            return { id: uuidId, isoCode: getObservationIsoCodeFromId(uuidId) };
        }
        
        // قفل تسلسلي لمنع رقمين متطابقين عند الاستدعاء المتزامن (يمكن تخطيه إذا كان المتصل يحمل القفل أصلاً)
        if (!skipLock) {
            try {
                lock = LockService.getScriptLock();
                lock.waitLock(15000);
            } catch (lockEx) {
                Logger.log('generateNextObservationIdentity lock failed: ' + lockEx.toString());
            }
        }
        
        // مسح الكاش وقراءة مباشرة من الورقة (بدون فلتر أمان) كمصدر حقيقة
        try {
            invalidateHseSheetCaches(sheetName);
        } catch (e) {}
        var existingData = [];
        try {
            existingData = readFromSheet(sheetName, targetSpreadsheetId, true);
        } catch (e) {
            existingData = [];
        }
        
        var patternDob = /^DOB-(\d+)$/i;
        var patternObs = /^OBS-\d{6}-(\d+)$/i;
        var patternTrailingNum = /(\d+)$/;
        var maxNum = 0;
        
        for (var i = 0; i < (existingData || []).length; i++) {
            var rec = existingData[i];
            if (!rec) continue;
            var candidates = [];
            if (rec.id) candidates.push(String(rec.id).trim());
            if (rec.isoCode) candidates.push(String(rec.isoCode).trim());
            for (var c = 0; c < candidates.length; c++) {
                var val = candidates[c];
                var num = 0;
                var mDob = val.match(patternDob);
                if (mDob) {
                    num = parseInt(mDob[1], 10);
                } else {
                    var mObs = val.match(patternObs);
                    if (mObs) {
                        num = parseInt(mObs[1], 10);
                    } else {
                        var mTrail = val.match(patternTrailingNum);
                        if (mTrail) num = parseInt(mTrail[1], 10);
                    }
                }
                if (!isNaN(num) && num > maxNum) maxNum = num;
            }
        }
        
        var nextNum = maxNum + 1;
        var numStr = nextNum.toString();
        while (numStr.length < 4) numStr = '0' + numStr;
        var id = 'DOB-' + numStr;
        return { id: id, isoCode: getObservationIsoCodeFromId(id) };
    } catch (err) {
        Logger.log('generateNextObservationIdentity: ' + err.toString());
        var fallbackId = 'DOB-' + String(Utilities.getUuid()).replace(/[^0-9]/g, '').substring(0, 4);
        return { id: fallbackId, isoCode: getObservationIsoCodeFromId(fallbackId) };
    } finally {
        try {
            if (lock) lock.releaseLock();
        } catch (releaseEx) {}
    }
}

/**
 * استخراج رقم الملاحظة (isoCode) للتسجيل في جدول قاعدة البيانات.
 * القيمة المسجلة في عمود isoCode = OBS-YYYYMM- + آخر 4 أرقام من id (DOB-NNNN).
 * مثال: id = DOB-2988 → isoCode = OBS-202602-2988
 * @param {string} id - معرف الملاحظة (مثل DOB-NNNN)
 * @returns {string} رقم الملاحظة OBS-YYYYMM-NNNN للتسجيل في الخلية
 */
function getObservationIsoCodeFromId(id) {
    if (!id || typeof id !== 'string') {
        var now = new Date();
        var yyyy = now.getFullYear();
        var mm = String(now.getMonth() + 1);
        if (mm.length === 1) mm = '0' + mm;
        return 'OBS-' + yyyy + mm + '-0000';
    }
    var str = id.toString().trim();
    
    // لـ DOB-NNNN نحوله إلى OBS-YYYYMM-NNNN
    var dobMatch = str.match(/^DOB-(\d+)$/i);
    if (dobMatch) {
        var now = new Date();
        var yyyy = now.getFullYear();
        var mm = String(now.getMonth() + 1);
        if (mm.length === 1) mm = '0' + mm;
        var num = dobMatch[1];
        return 'OBS-' + yyyy + mm + '-' + num;
    }
    
    // إذا كان OBS-YYYYMM-NNNN بالفعل
    var obsMatch = str.match(/^OBS-\d{6}-(\d+)$/i);
    if (obsMatch) {
        return str;
    }
    
    // أي رقم في النهاية
    var matchAny = str.match(/(\d+)$/);
    if (matchAny) {
        var now = new Date();
        var yyyy = now.getFullYear();
        var mm = String(now.getMonth() + 1);
        if (mm.length === 1) mm = '0' + mm;
        return 'OBS-' + yyyy + mm + '-' + matchAny[1];
    }
    
    return 'OBS-' + new Date().getFullYear() + String(new Date().getMonth() + 1).padStart(2, '0') + '-0000';
}

/**
 * استخراج الرقم من id أو isoCode بالتنسيق القياسي فقط: DOB-NNNN أو OBS-YYYYMM-NNNN.
 * المعرّفات المشوّهة (DOB-101_dup_.. أو UUID) ترجع null.
 * @param {*} s - id أو isoCode
 * @returns {number|null} الرقم أو null
 */
function extractObservationIdNumber_(s) {
    try {
        var str = String(s || '').trim();
        if (!str) return null;
        var m = str.match(/^(?:DOB-|OBS-\d{6}-)(\d+)$/i);
        return m ? parseInt(m[1], 10) : null;
    } catch (e) {
        return null;
    }
}

/**
 * إصلاح isoCode ليطابق رقم id دائماً (مع الحفاظ على الشهر YYYYMM الأصلي إن وُجد).
 * يضمن أن isoCode = OBS-<الشهر>-<رقم id> عند كل حفظ — يمنع عدم التطابق مستقبلاً.
 * @param {Object} processedItem - السجل قبل الكتابة (يُعدَّل isoCode داخله)
 * @param {*} existingIsoCode - قيمة isoCode الموجودة في الورقة (لتثبيت الشهر)
 */
function ensureObservationIsoCodeMatchesId_(processedItem, existingIsoCode) {
    try {
        if (!processedItem || !processedItem.id) return;
        var idNum = extractObservationIdNumber_(String(processedItem.id).trim());
        if (idNum === null) return; // لا يمكن اشتقاق الرقم → يُعالج في الإصلاح الشامل
        var month = null;
        var mObs = String(processedItem.isoCode || existingIsoCode || '').trim().match(/^OBS-(\d{6})-/i);
        if (mObs) month = mObs[1];
        if (!month) {
            var now = new Date();
            var mm = String(now.getMonth() + 1);
            month = String(now.getFullYear()) + (mm.length === 1 ? '0' + mm : mm);
        }
        var numStr = String(idNum);
        while (numStr.length < 4) numStr = '0' + numStr;
        var target = 'OBS-' + month + '-' + numStr;
        if (processedItem.isoCode !== target) {
            processedItem.isoCode = target;
        }
    } catch (e) {
        Logger.log('ensureObservationIsoCodeMatchesId_: ' + e.toString());
    }
}

/**
 * تحديد هل سجل وارد بنفس id هو نفس السجل الموجود (تحديث عادي) أم سجل جديد بتعارض رقم.
 * يُقارن createdAt بتحمّل 3 ثوانٍ (Sheets قد يقطع الدقائق/الثواني عند التخزين).
 * @param {Array} existingRowVals - قيم الصف الموجود في الورقة
 * @param {Array} headerRow - الرؤوس
 * @param {Object} processedItem - السجل الوارد
 * @returns {boolean} true إذا كانا نفس السجل (تحديث عادي) وإلا false (تعارض → إعادة ترقيم)
 */
function observationSameIdentity_(existingRowVals, headerRow, processedItem) {
    try {
        var idx = headerRow.indexOf('createdAt');
        if (idx < 0) return true; // بدون عمود createdAt → نعاملها كتحديث عادي
        var sheetVal = existingRowVals ? existingRowVals[idx] : null;
        var incomingVal = processedItem ? processedItem.createdAt : null;
        var hasSheet = !(sheetVal === null || sheetVal === undefined || String(sheetVal).trim() === '');
        var hasIncoming = !(incomingVal === null || incomingVal === undefined || String(incomingVal).trim() === '');
        if (!hasSheet && !hasIncoming) return true;
        if (!hasSheet && hasIncoming) return false; // سجل جديد ببيانات مختلفة على id موجود → تعارض
        if (hasSheet && !hasIncoming) return true;
        var t1 = obsDateToEpochMs_(sheetVal);
        var t2 = obsDateToEpochMs_(incomingVal);
        if (isNaN(t1) || isNaN(t2)) return true; // لا يمكن المقارنة → لا نعيد الترقيم
        return Math.abs(t1 - t2) < 3000;
    } catch (e) {
        return true;
    }
}

/**
 * تحويل قيمة تاريخ من الورقة/الفرونت إلى epoch بالمللي ثانية.
 * @param {*} v - Date object أو رقم أو نص ISO
 * @returns {number} epoch ms أو NaN
 */
function obsDateToEpochMs_(v) {
    try {
        if (v instanceof Date) return v.getTime();
        if (typeof v === 'number') return v;
        var s = String(v || '').trim();
        if (!s) return NaN;
        var t = Date.parse(s);
        return isNaN(t) ? NaN : t;
    } catch (e) {
        return NaN;
    }
}

/**
 * ============================================
 * خريطة البادئات للموديولات
 * ============================================
 */
function getModulePrefix(moduleName) {
    var prefixMap = {
        // الحوادث والسلامة
        'incidents': 'INC',
        'Incidents': 'INC',
        'nearmiss': 'NRM',
        'NearMiss': 'NRM',
        'ptw': 'PTW',
        'PTW': 'PTW',
        'violations': 'VIO',
        'Violations': 'VIO',
        
        // التدريب والموظفين
        'training': 'TRN',
        'Training': 'TRN',
        'employees': 'EMP',
        'Employees': 'EMP',
        
        // المعدات والسلامة
        'fireequipment': 'FEA',
        'FireEquipment': 'FEA',
        'fireequipmentassets': 'EFA',
        'FireEquipmentAssets': 'EFA',
        'fireequipmentinspections': 'FEI',
        'FireEquipmentInspections': 'FEI',
        'ppe': 'PPE',
        'PPE': 'PPE',
        'periodicinspections': 'PIN',
        'PeriodicInspections': 'PIN',
        'periodicinspectioncategories': 'PIC',
        'PeriodicInspectionCategories': 'PIC',
        'periodicinspectionchecklists': 'PIC',
        'PeriodicInspectionChecklists': 'PIC',
        'periodicinspectionschedules': 'PIS',
        'PeriodicInspectionSchedules': 'PIS',
        'periodicinspectionrecords': 'PIR',
        'PeriodicInspectionRecords': 'PIR',
        'PeriodicEquipmentTypes': 'PET',
        'PeriodicEquipmentAssets': 'PEA',
        'PeriodicEquipmentInspections': 'PEI',
        
        // المقاولين والعيادة
        // ✅ تم إزالة 'contractors' و 'Contractors' - نعتمد فقط على ApprovedContractors
        'approvedcontractors': 'ACN',
        'ApprovedContractors': 'ACN',
        'contractorevaluations': 'CEV',
        'ContractorEvaluations': 'CEV',
        'clinic': 'CLN',
        'ClinicVisits': 'CLV',
        'clinicvisits': 'CLV',
        'medications': 'MED',
        'Medications': 'MED',
        'sickleave': 'SKL',
        'SickLeave': 'SKL',
        'injuries': 'INJ',
        'Injuries': 'INJ',
        'cliniccontractorinjuries': 'CIN',
        'ClinicContractorInjuries': 'CIN',
        'clinicinventory': 'CLI',
        'ClinicInventory': 'CLI',
        'ClinicStaff': 'CST',
        'ClinicStaffAttendance': 'CSA',
        'ClinicStaffTimeOffRequests': 'CTO',
        
        // ISO و HSE
        'iso': 'ISO',
        'isodocuments': 'ISD',
        'ISODocuments': 'ISD',
        'isoprocedures': 'ISP',
        'ISOProcedures': 'ISP',
        'isoforms': 'ISF',
        'ISOForms': 'ISF',
        'hse': 'HSE',
        'hseaudits': 'HSA',
        'HSEAudits': 'HSA',
        'hsenonconformities': 'HSN',
        'HSENonConformities': 'HSN',
        'hsecorrectiveactions': 'HSC',
        'HSECorrectiveActions': 'HSC',
        'hseobjectives': 'HSO',
        'HSEObjectives': 'HSO',
        'hseriskassessments': 'HSR',
        'HSERiskAssessments': 'HSR',
        
        // تقييم المخاطر والمستندات
        'riskassessments': 'RSA',
        'RiskAssessments': 'RSA',
        'legaldocuments': 'LGD',
        'LegalDocuments': 'LGD',
        'sopjha': 'SOP',
        'SOPJHA': 'SOP',
        
        // المراقبة والملاحظات
        'behaviormonitoring': 'BHM',
        'BehaviorMonitoring': 'BHM',
        'contractorbehaviormonitoring': 'BHC',
        'ContractorBehaviorMonitoring': 'BHC',
        'chemicalsafety': 'CHS',
        'ChemicalSafety': 'CHS',
        'dailyobservations': 'DOB',
        'DailyObservations': 'DOB',
        'dailysafetychecklist': 'DSC',
        'DailySafetyCheckList': 'DSC',
        'observationsites': 'OBS',
        'ObservationSites': 'OBS',
        
        // الاستدامة والبيئة
        'sustainability': 'SUS',
        'Sustainability': 'SUS',
        'environmentalaspects': 'ENA',
        'EnvironmentalAspects': 'ENA',
        'environmentalmonitoring': 'ENM',
        'EnvironmentalMonitoring': 'ENM',
        'carbonfootprint': 'CFP',
        'CarbonFootprint': 'CFP',
        'wastemanagement': 'WAM',
        'WasteManagement': 'WAM',
        'energyefficiency': 'ENE',
        'EnergyEfficiency': 'ENE',
        'watermanagement': 'WAM',
        'WaterManagement': 'WAM',
        'recyclingprograms': 'RCP',
        'RecyclingPrograms': 'RCP',
        
        // الطوارئ والميزانية
        'emergency': 'EMG',
        'emergencyalerts': 'EMA',
        'EmergencyAlerts': 'EMA',
        'emergencyplans': 'EMP',
        'EmergencyPlans': 'EMP',
        'emergencyplansupdates': 'EPU',
        'EmergencyPlansUpdates': 'EPU',
        'safetybudget': 'SAB',
        'SafetyBudgets': 'SAB',
        'safetybudgettransactions': 'SBT',
        'SafetyBudgetTransactions': 'SBT',
        'safetybudgetpurchaseorders': 'SPO',
        'SafetyBudgetPurchaseOrders': 'SPO',
        
        // مؤشرات الأداء والمهام
        'safetyperformancekpis': 'SPK',
        'SafetyPerformanceKPIs': 'SPK',
        'safetyteamkpis': 'STK',
        'SafetyTeamKPIs': 'STK',
        'actiontrackingregister': 'ATR',
        'ActionTrackingRegister': 'ATR',
        'usertasks': 'UTK',
        'UserTasks': 'UTK',
        'SafetyCalendarCustomEvents': 'SCE',
        'userinstructions': 'UIN',
        'UserInstructions': 'UIN',
        
        // إدارة السلامة والصحة المهنية
        'safetyhealthmanagement': 'SHM',
        'SafetyHealthManagement': 'SHM',
        'safetyteammembers': 'STM',
        'SafetyTeamMembers': 'STM',
        'safetyorganizationalstructure': 'SOS',
        'SafetyOrganizationalStructure': 'SOS',
        'safetyjobdescriptions': 'SJD',
        'SafetyJobDescriptions': 'SJD',
        'safetyteamattendance': 'STA',
        'SafetyTeamAttendance': 'STA',
        'safetyteamleaves': 'STL',
        'SafetyTeamLeaves': 'STL',
        'safetyteamtasks': 'STT',
        'SafetyTeamTasks': 'STT',
        
        // أنواع المخالفات
        'violationtypes': 'VTY',
        'ViolationTypes': 'VTY',
        'violation_types_db': 'VTY',
        'Violation_Types_DB': 'VTY',
        'blacklist_register': 'BLR',
        'Blacklist_Register': 'BLR',
        
        // مصفوفات ومخزون
        'ppematrix': 'PPM',
        'PPEMatrix': 'PPM',
        'ppe_stock': 'PPS',
        'PPE_Stock': 'PPS',
        'ppe_transactions': 'PPT',
        'PPE_Transactions': 'PPT',
        
        // التدريب المتقدم
        'employeetrainingmatrix': 'ETM',
        'EmployeeTrainingMatrix': 'ETM',
        'contractortrainings': 'CTR',
        'ContractorTrainings': 'CTR',
        'annualtrainingplans': 'ATP',
        'AnnualTrainingPlans': 'ATP',
        
        // السجلات والإشعارات
        'auditlog': 'AUD',
        'AuditLog': 'AUD',
        'useractivitylog': 'UAL',
        'UserActivityLog': 'UAL',
        'clienterrorlog': 'CEL',
        'ClientErrorLog': 'CEL',
        'notifications': 'NOT',
        'Notifications': 'NOT',
        'incidentnotifications': 'INO',
        'IncidentNotifications': 'INO',
        
        // إعدادات
        'form_settings_db': 'FSD',
        'Form_Settings_DB': 'FSD',
        'aiassistantsettings': 'AIA',
        'AIAssistantSettings': 'AIA',
        'userailog': 'UAI',
        'UserAILog': 'UAI',
        'safetyhealthmanagementsettings': 'SHS',
        'SafetyHealthManagementSettings': 'SHS',
        'actiontrackingsettings': 'ATS',
        'ActionTrackingSettings': 'ATS'
    };
    
    return prefixMap[moduleName] || 'ID';
}

