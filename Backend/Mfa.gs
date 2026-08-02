/**
 * Google Apps Script - MFA / TOTP (RFC 6238)
 */

var MFA_BASE32_CHARS_ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
var MFA_CHALLENGE_TTL_SEC_ = 300;
var MFA_ENROLL_TTL_SEC_ = 600;
var MFA_MAX_ATTEMPTS_ = 5;
/** قفل مؤقت بعد محاولات فاشلة (ثوانٍ) — قصير لأن فشلاً سابقاً بسبب خطأ خادم كان يرفع العداد */
var MFA_LOCKOUT_SEC_ = 180;
/** نافذة TOTP عند الدخول (± خطوات × 30ث) — أوسع لتسامح انحراف ساعة الخادم */
var MFA_TOTP_WINDOW_ = 5;
var MFA_ENROLL_TOTP_WINDOW_ = 5;

function ensureMfaEncryptionKey_() {
    var props = PropertiesService.getScriptProperties();
    var key = props.getProperty('MFA_ENCRYPTION_KEY');
    if (!key) {
        key = 'HSE_MFA_KEY_' + (typeof ScriptApp !== 'undefined' && ScriptApp.getScriptId ? ScriptApp.getScriptId() : 'STATIC_KEY_2026');
        props.setProperty('MFA_ENCRYPTION_KEY', key);
    }
    return key;
}

function base32Encode_(bytes) {
    var chars = MFA_BASE32_CHARS_;
    var output = '';
    var bits = 0;
    var value = 0;
    for (var i = 0; i < bytes.length; i++) {
        value = (value << 8) | (Number(bytes[i]) & 0xff);
        bits += 8;
        while (bits >= 5) {
            output += chars.charAt((value >>> (bits - 5)) & 31);
            bits -= 5;
        }
    }
    if (bits > 0) {
        output += chars.charAt((value << (5 - bits)) & 31);
    }
    return output;
}

function base32Decode_(input) {
    input = String(input || '').toUpperCase().replace(/[=\s]/g, '');
    var bytes = [];
    var bits = 0;
    var value = 0;
    for (var i = 0; i < input.length; i++) {
        var idx = MFA_BASE32_CHARS_.indexOf(input.charAt(i));
        if (idx === -1) continue;
        value = (value << 5) | idx;
        bits += 5;
        if (bits >= 8) {
            bytes.push((value >>> (bits - 8)) & 0xff);
            bits -= 8;
        }
    }
    return bytes;
}

/** تحويل base32 → بايتات مفتاح HMAC (متوافق مع GAS) */
function base32ToHmacKeyBytes_(secret) {
    return normalizeGasByteArray_(base32Decode_(secret));
}

function counterBytesFromStep_(timeStep) {
    var counter = Number(timeStep) || 0;
    var bytes = new Array(8);
    for (var i = 7; i >= 0; i--) {
        bytes[i] = counter & 0xff;
        counter = Math.floor(counter / 256);
    }
    return bytes;
}

function normalizeGasByteArray_(arr) {
    if (!arr || !arr.length) return [];
    var unsigned = [];
    for (var i = 0; i < arr.length; i++) {
        unsigned.push(Number(arr[i]) & 0xff);
    }
    try {
        return Utilities.base64Decode(Utilities.base64Encode(unsigned));
    } catch (e) {
        return unsigned.map(function (b) {
            return b > 127 ? b - 256 : b;
        });
    }
}

function gasSignatureToUnsigned_(sig) {
    var out = [];
    if (!sig) return out;
    for (var i = 0; i < sig.length; i++) {
        out.push((Math.round(Number(sig[i])) + 256) % 256);
    }
    return out;
}

function hmacSha1Totp_(messageBytes, keyBytes) {
    var msg = normalizeGasByteArray_(messageBytes);
    var key = normalizeGasByteArray_(keyBytes);
    var sig = Utilities.computeHmacSignature(
        Utilities.MacAlgorithm.HMAC_SHA_1,
        msg,
        key
    );
    return gasSignatureToUnsigned_(sig);
}

function generateTotpSecret_() {
    var bytes = [];
    for (var i = 0; i < 10; i++) {
        bytes.push(Math.floor(Math.random() * 256));
    }
    return base32Encode_(bytes);
}

function generateTotpCodeAtStep_(secret, timeStep) {
    var secretBytes = base32ToHmacKeyBytes_(secret);
    if (!secretBytes || secretBytes.length === 0) return '';
    var data = counterBytesFromStep_(timeStep);
    var hash = hmacSha1Totp_(data, secretBytes);
    if (!hash || hash.length < 20) return '';
    var offset = hash[hash.length - 1] & 0x0f;
    var code = ((hash[offset] & 0x7f) << 24) |
        ((hash[offset + 1] & 0xff) << 16) |
        ((hash[offset + 2] & 0xff) << 8) |
        (hash[offset + 3] & 0xff);
    return ('000000' + (code % 1000000)).slice(-6);
}

function verifyTotpCode_(secret, code, options) {
    options = options || {};
    var normalized = String(code || '').replace(/\s/g, '');
    if (!/^\d{6}$/.test(normalized)) return false;
    var windowSize = (options.window != null && !isNaN(options.window))
        ? Number(options.window)
        : MFA_TOTP_WINDOW_;
    var currentStep = Math.floor(Date.now() / 1000 / 30);
    for (var w = -windowSize; w <= windowSize; w++) {
        if (generateTotpCodeAtStep_(secret, currentStep + w) === normalized) {
            return true;
        }
    }
    return false;
}

function buildOtpAuthUri_(email, secret, issuer) {
    var iss = String(issuer || 'HSE-04-2026').trim() || 'HSE-04-2026';
    var account = encodeURIComponent(String(email || '').trim());
    var sec = String(secret || '').trim().toUpperCase().replace(/\s/g, '');
    var issEnc = encodeURIComponent(iss);
    return 'otpauth://totp/' + issEnc + ':' + account + '?secret=' + sec + '&issuer=' + issEnc + '&algorithm=SHA1&digits=6&period=30';
}

function encryptMfaSecret_(plain) {
    var text = String(plain || '');
    if (!text) return '';
    var key = ensureMfaEncryptionKey_();
    var bytes = Utilities.newBlob(text).getBytes();
    var keyBytes = Utilities.newBlob(key).getBytes();
    var out = bytes.map(function (b, i) {
        return (b ^ keyBytes[i % keyBytes.length]) & 0xFF;
    });
    return Utilities.base64Encode(out);
}

function decryptMfaSecret_(encoded) {
    var enc = String(encoded || '').trim();
    if (!enc) return '';
    try {
        var key = ensureMfaEncryptionKey_();
        var bytes = Utilities.base64Decode(enc);
        var keyBytes = Utilities.newBlob(key).getBytes();
        var out = bytes.map(function (b, i) {
            return (b ^ keyBytes[i % keyBytes.length]) & 0xFF;
        });
        return Utilities.newBlob(out).getDataAsString();
    } catch (e) {
        Logger.log('decryptMfaSecret_ error: ' + e.toString());
        return '';
    }
}

function isMfaEnabledForUser_(user) {
    if (!user) return false;
    var v = user.mfaEnabled;
    return v === true || v === 'true' || v === 1 || v === '1' || v === 'TRUE';
}

function createMfaChallenge_(email, userRecord) {
    var e = String(email || '').trim().toLowerCase();
    if (!e) return '';
    var nowHex = Date.now().toString(16);
    var rand = Utilities.getUuid().replace(/-/g, '');
    var key = ensureMfaEncryptionKey_();
    var sigBytes = Utilities.computeHmacSignature(
        Utilities.MacAlgorithm.HMAC_SHA_256,
        e + ':' + nowHex + ':' + rand,
        key
    );
    var sigHex = sigBytes.map(function(b) {
        return ('0' + (b & 0xff).toString(16)).slice(-2);
    }).join('');
    var token = nowHex + '_' + rand + '_' + sigHex;

    var cache = CacheService.getScriptCache();
    cache.put('mfa_ch_' + token, e, MFA_CHALLENGE_TTL_SEC_);
    if (userRecord && userRecord.mfaSecretEnc) {
        // safeUser مضغوط بدون photo/permissions الضخمة — فشل الكاش كان يجبر verify على قراءة Users
        var slimSafe = buildMfaChallengeSafeUser_(userRecord);
        var putOk = false;
        try {
            var cachedData = {
                email: e,
                userId: userRecord.id,
                mfaSecretEnc: userRecord.mfaSecretEnc,
                safeUser: slimSafe
            };
            var jsonStr = JSON.stringify(cachedData);
            if (jsonStr.length < 90000) {
                cache.put('mfa_user_' + token, jsonStr, MFA_CHALLENGE_TTL_SEC_);
                putOk = !!cache.get('mfa_user_' + token);
            }
            if (!putOk) {
                // إعادة محاولة: السر فقط + حد أدنى من الحقول
                var minimal = {
                    email: e,
                    userId: userRecord.id,
                    mfaSecretEnc: userRecord.mfaSecretEnc,
                    safeUser: {
                        id: userRecord.id,
                        email: e,
                        name: String(userRecord.name || ''),
                        role: String(userRecord.role || ''),
                        mfaEnabled: true
                    }
                };
                cache.put('mfa_user_' + token, JSON.stringify(minimal), MFA_CHALLENGE_TTL_SEC_);
            }
        } catch (ex) {
            Logger.log('createMfaChallenge_ cache user error: ' + ex.toString());
            try {
                cache.put('mfa_user_' + token, JSON.stringify({
                    email: e,
                    userId: userRecord.id,
                    mfaSecretEnc: userRecord.mfaSecretEnc,
                    safeUser: { id: userRecord.id, email: e, name: String(userRecord.name || ''), role: String(userRecord.role || ''), mfaEnabled: true }
                }), MFA_CHALLENGE_TTL_SEC_);
            } catch (_e2) {
                Logger.log('createMfaChallenge_ minimal cache failed');
            }
        }
    }
    return token;
}

/** مستخدم مضغوط لكاش MFA — بدون photo/base64 */
function buildMfaChallengeSafeUser_(user) {
    if (!user) return null;
    return {
        id: user.id,
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        department: user.department || '',
        active: user.active,
        jobTitle: user.jobTitle || '',
        phone: user.phone || '',
        mfaEnabled: true,
        permissions: (typeof user.permissions === 'object' && user.permissions && !Array.isArray(user.permissions))
            ? user.permissions
            : (typeof user.permissions === 'string' && user.permissions.length < 2000
                ? (function () {
                    try { return JSON.parse(user.permissions); } catch (_e) { return {}; }
                })()
                : {})
    };
}

/**
 * التحقق من صلاحية challenge دون استهلاكه (يسمح بإعادة المحاولة برمز TOTP صحيح).
 */
function validateMfaChallenge_(token, email) {
    var t = String(token || '').trim();
    var e = String(email || '').trim().toLowerCase();
    if (!t || !e) return false;

    var cache = CacheService.getScriptCache();
    if (cache.get('mfa_used_' + t)) return false;

    var key = 'mfa_ch_' + t;
    var stored = cache.get(key);
    if (stored && String(stored).toLowerCase() === e) {
        return true;
    }

    // Fallback: توقيع HMAC عديم الحالة إذا فُقد مفتاح الكاش
    var parts = t.split('_');
    if (parts.length === 3) {
        var nowHex = parts[0];
        var rand = parts[1];
        var sigHex = parts[2];
        var issueTime = parseInt(nowHex, 16);
        var now = Date.now();
        if (!isNaN(issueTime) && (now - issueTime) <= (MFA_CHALLENGE_TTL_SEC_ * 1000) && (issueTime <= now + 60000)) {
            var keyStr = ensureMfaEncryptionKey_();
            var expectedBytes = Utilities.computeHmacSignature(
                Utilities.MacAlgorithm.HMAC_SHA_256,
                e + ':' + nowHex + ':' + rand,
                keyStr
            );
            var expectedHex = expectedBytes.map(function(b) {
                return ('0' + (b & 0xff).toString(16)).slice(-2);
            }).join('');
            if (expectedHex === sigHex) {
                return true;
            }
        }
    }

    return false;
}

/**
 * استهلاك challenge بعد نجاح TOTP فقط — يمنع إعادة استخدام الجلسة.
 * يضع mfa_used أولاً (CacheService لا يضمن قراءة فورية بعد put — لا نفحص get بعد put).
 */
function consumeMfaChallenge_(token, email) {
    var t = String(token || '').trim();
    var e = String(email || '').trim().toLowerCase();
    if (!t || !e) return false;
    if (!validateMfaChallenge_(t, e)) return false;

    var cache = CacheService.getScriptCache();
    var usedKey = 'mfa_used_' + t;
    try {
        if (cache.get(usedKey)) return false;
        cache.put(usedKey, e, MFA_CHALLENGE_TTL_SEC_);
    } catch (_putErr) {
        return false;
    }
    try {
        cache.remove('mfa_ch_' + t);
        cache.remove('mfa_user_' + t);
    } catch (_rm) { /* ignore */ }
    return true;
}

/**
 * منع إعادة استخدام نفس رمز TOTP لنفس الحساب خلال نافذة الخطوة.
 */
function markTotpCodeConsumed_(email, code, ttlSec) {
    var e = String(email || '').trim().toLowerCase();
    var c = String(code || '').replace(/\s/g, '');
    if (!e || !c) return true;
    var cache = CacheService.getScriptCache();
    var key = 'mfa_otp_used_' + e + '_' + c;
    try {
        if (cache.get(key)) return false;
        cache.put(key, '1', Math.max(60, Number(ttlSec) || 180));
        return true;
    } catch (_e) {
        // لا نمنع الدخول إن فشل الكاش — challenge يُستهلك لاحقاً
        return true;
    }
}

function isTotpCodeAlreadyUsed_(email, code) {
    var e = String(email || '').trim().toLowerCase();
    var c = String(code || '').replace(/\s/g, '');
    if (!e || !c) return false;
    try {
        return !!CacheService.getScriptCache().get('mfa_otp_used_' + e + '_' + c);
    } catch (_e) {
        return false;
    }
}

function checkMfaRateLimit_(email) {
    var e = String(email || '').trim().toLowerCase();
    if (!e) return { ok: false, message: 'بيانات غير صالحة' };
    var cache = CacheService.getScriptCache();
    var lockKey = 'mfa_lock_' + e;
    var locked = cache.get(lockKey);
    if (locked) {
        return {
            ok: false,
            message: 'تم قفل المصادقة الثنائية مؤقتاً بسبب محاولات فاشلة متعددة. سجّل الدخول بكلمة المرور مجدداً بعد دقائق قليلة، أو انتظر انتهاء القفل.',
            errorCode: 'MFA_LOCKED'
        };
    }
    return { ok: true };
}

function recordMfaFailure_(email) {
    var e = String(email || '').trim().toLowerCase();
    if (!e) return;
    var cache = CacheService.getScriptCache();
    var key = 'mfa_fail_' + e;
    var raw = cache.get(key);
    var count = raw ? parseInt(raw, 10) : 0;
    if (isNaN(count)) count = 0;
    count += 1;
    if (count >= MFA_MAX_ATTEMPTS_) {
        cache.put('mfa_lock_' + e, '1', MFA_LOCKOUT_SEC_);
        cache.remove(key);
        if (typeof logSecurityEvent === 'function') {
            logSecurityEvent('mfa_lockout', { email: e, severity: 'high' });
        }
    } else {
        cache.put(key, String(count), MFA_LOCKOUT_SEC_);
    }
}

function clearMfaFailures_(email) {
    var e = String(email || '').trim().toLowerCase();
    if (!e) return;
    var cache = CacheService.getScriptCache();
    cache.remove('mfa_fail_' + e);
    cache.remove('mfa_lock_' + e);
}

/**
 * رفع قفل MFA بعد إثبات كلمة المرور الصحيحة (يمنع حظر دائم بسبب أخطاء سابقة في التحقق).
 */
function clearMfaLockAfterPasswordOk_(email) {
    try {
        if (typeof clearMfaFailures_ === 'function') clearMfaFailures_(email);
    } catch (_e) { /* ignore */ }
}

function storeMfaEnrollmentPending_(email, secret) {
    var e = String(email || '').trim().toLowerCase();
    if (!e || !secret) return false;
    var cache = CacheService.getScriptCache();
    cache.put('mfa_enroll_' + e, String(secret).toUpperCase().replace(/\s/g, ''), MFA_ENROLL_TTL_SEC_);
    return true;
}

function peekMfaEnrollmentPending_(email) {
    var e = String(email || '').trim().toLowerCase();
    if (!e) return '';
    var cache = CacheService.getScriptCache();
    return cache.get('mfa_enroll_' + e) || '';
}

function clearMfaEnrollmentPending_(email) {
    var e = String(email || '').trim().toLowerCase();
    if (!e) return;
    CacheService.getScriptCache().remove('mfa_enroll_' + e);
}

function consumeMfaEnrollmentPending_(email) {
    var secret = peekMfaEnrollmentPending_(email);
    if (secret) clearMfaEnrollmentPending_(email);
    return secret;
}
