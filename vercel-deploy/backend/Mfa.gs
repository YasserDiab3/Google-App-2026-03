/**
 * Google Apps Script - MFA / TOTP (RFC 6238)
 */

var MFA_BASE32_CHARS_ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
var MFA_CHALLENGE_TTL_SEC_ = 300;
var MFA_ENROLL_TTL_SEC_ = 600;
var MFA_MAX_ATTEMPTS_ = 5;
var MFA_LOCKOUT_SEC_ = 900;
var MFA_TOTP_WINDOW_ = 2;

function ensureMfaEncryptionKey_() {
    var props = PropertiesService.getScriptProperties();
    var key = props.getProperty('MFA_ENCRYPTION_KEY');
    if (!key) {
        key = Utilities.getUuid() + Utilities.getUuid();
        props.setProperty('MFA_ENCRYPTION_KEY', key);
    }
    return key;
}

function generateTotpSecret_() {
    var chars = MFA_BASE32_CHARS_;
    var secret = '';
    for (var i = 0; i < 20; i++) {
        secret += chars.charAt(Math.floor(Math.random() * 32));
    }
    return secret;
}

function base32Decode_(input) {
    input = String(input || '').toUpperCase().replace(/=+$/, '').replace(/\s/g, '');
    var bits = '';
    for (var i = 0; i < input.length; i++) {
        var val = MFA_BASE32_CHARS_.indexOf(input.charAt(i));
        if (val === -1) continue;
        bits += ('00000' + val.toString(2)).slice(-5);
    }
    var bytes = [];
    for (var j = 0; j + 8 <= bits.length; j += 8) {
        bytes.push(parseInt(bits.substr(j, 8), 2));
    }
    return bytes;
}

function generateTotpCodeAtStep_(secret, timeStep) {
    var secretBytes = base32Decode_(secret);
    if (!secretBytes || secretBytes.length === 0) return '';
    var data = [];
    var step = Number(timeStep) || 0;
    for (var i = 7; i >= 0; i--) {
        data.push((step >>> (i * 8)) & 0xff);
    }
    var hashRaw = Utilities.computeHmacSignature(
        Utilities.MacAlgorithm.HMAC_SHA_1,
        data,
        secretBytes
    );
    var hash = [];
    for (var h = 0; h < hashRaw.length; h++) {
        hash.push((hashRaw[h] + 256) % 256);
    }
    var offset = hash[hash.length - 1] & 0x0f;
    var code = ((hash[offset] & 0x7f) << 24) |
        ((hash[offset + 1] & 0xff) << 16) |
        ((hash[offset + 2] & 0xff) << 8) |
        (hash[offset + 3] & 0xff);
    return ('000000' + (code % 1000000)).slice(-6);
}

function verifyTotpCode_(secret, code) {
    var normalized = String(code || '').replace(/\s/g, '');
    if (!/^\d{6}$/.test(normalized)) return false;
    var currentStep = Math.floor(Date.now() / 1000 / 30);
    for (var w = -MFA_TOTP_WINDOW_; w <= MFA_TOTP_WINDOW_; w++) {
        if (generateTotpCodeAtStep_(secret, currentStep + w) === normalized) {
            return true;
        }
    }
    return false;
}

function buildOtpAuthUri_(email, secret, issuer) {
    var iss = String(issuer || 'HSE-04-2026').trim() || 'HSE-04-2026';
    var label = encodeURIComponent(iss + ':' + String(email || '').trim());
    var sec = encodeURIComponent(String(secret || '').trim());
    var issEnc = encodeURIComponent(iss);
    return 'otpauth://totp/' + label + '?secret=' + sec + '&issuer=' + issEnc + '&algorithm=SHA1&digits=6&period=30';
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

function createMfaChallenge_(email) {
    var e = String(email || '').trim().toLowerCase();
    if (!e) return '';
    var token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    var cache = CacheService.getScriptCache();
    cache.put('mfa_ch_' + token, e, MFA_CHALLENGE_TTL_SEC_);
    return token;
}

function consumeMfaChallenge_(token, email) {
    var t = String(token || '').trim();
    var e = String(email || '').trim().toLowerCase();
    if (!t || !e) return false;
    var cache = CacheService.getScriptCache();
    var key = 'mfa_ch_' + t;
    var stored = cache.get(key);
    if (!stored || String(stored).toLowerCase() !== e) return false;
    cache.remove(key);
    return true;
}

function checkMfaRateLimit_(email) {
    var e = String(email || '').trim().toLowerCase();
    if (!e) return { ok: false, message: 'بيانات غير صالحة' };
    var cache = CacheService.getScriptCache();
    var lockKey = 'mfa_lock_' + e;
    var locked = cache.get(lockKey);
    if (locked) {
        return { ok: false, message: 'تم قفل المصادقة الثنائية مؤقتاً بسبب محاولات فاشلة متعددة. حاول لاحقاً.' };
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

function storeMfaEnrollmentPending_(email, secret) {
    var e = String(email || '').trim().toLowerCase();
    if (!e || !secret) return false;
    var cache = CacheService.getScriptCache();
    cache.put('mfa_enroll_' + e, String(secret), MFA_ENROLL_TTL_SEC_);
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
