/**
 * TOTP / MFA utilities — parity with GAS Mfa.gs (RFC 6238, SHA1)
 */
'use strict';

const crypto = require('crypto');

const MFA_BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const MFA_TOTP_WINDOW = 8;
const MFA_ENROLL_TOTP_WINDOW = 5;

function ensureMfaEncryptionKey() {
    return process.env.MFA_ENCRYPTION_KEY || 'HSE_MFA_KEY_STATIC_KEY_2026';
}

function base32Encode(bytes) {
    let output = '';
    let bits = 0;
    let value = 0;
    for (let i = 0; i < bytes.length; i++) {
        value = (value << 8) | (bytes[i] & 0xff);
        bits += 8;
        while (bits >= 5) {
            output += MFA_BASE32_CHARS.charAt((value >>> (bits - 5)) & 31);
            bits -= 5;
        }
    }
    if (bits > 0) {
        output += MFA_BASE32_CHARS.charAt((value << (5 - bits)) & 31);
    }
    return output;
}

function base32Decode(input) {
    input = String(input || '').toUpperCase().replace(/[=\s]/g, '');
    const bytes = [];
    let bits = 0;
    let value = 0;
    for (let i = 0; i < input.length; i++) {
        const idx = MFA_BASE32_CHARS.indexOf(input.charAt(i));
        if (idx === -1) continue;
        value = (value << 5) | idx;
        bits += 5;
        if (bits >= 8) {
            bytes.push((value >>> (bits - 8)) & 0xff);
            bits -= 8;
        }
    }
    return Buffer.from(bytes);
}

function counterBytesFromStep(timeStep) {
    const buf = Buffer.alloc(8);
    let counter = BigInt(Number(timeStep) || 0);
    for (let i = 7; i >= 0; i--) {
        buf[i] = Number(counter & 0xffn);
        counter >>= 8n;
    }
    return buf;
}

function generateTotpSecret() {
    return base32Encode(crypto.randomBytes(10));
}

function generateTotpCodeAtStep(secret, timeStep) {
    const key = base32Decode(secret);
    if (!key.length) return '';
    const hash = crypto.createHmac('sha1', key).update(counterBytesFromStep(timeStep)).digest();
    const offset = hash[hash.length - 1] & 0x0f;
    const code = ((hash[offset] & 0x7f) << 24) |
        ((hash[offset + 1] & 0xff) << 16) |
        ((hash[offset + 2] & 0xff) << 8) |
        (hash[offset + 3] & 0xff);
    return ('000000' + (code % 1000000)).slice(-6);
}

function verifyTotpCode(secret, code, options = {}) {
    const normalized = String(code || '').replace(/\s/g, '');
    if (!/^\d{6}$/.test(normalized)) return false;
    const windowSize = options.window != null ? Number(options.window) : MFA_TOTP_WINDOW;
    const currentStep = Math.floor(Date.now() / 1000 / 30);
    for (let w = -windowSize; w <= windowSize; w++) {
        if (generateTotpCodeAtStep(secret, currentStep + w) === normalized) {
            return true;
        }
    }
    return false;
}

function xorDecryptMfaToString(enc) {
    const raw = String(enc || '').trim();
    if (!raw) return '';
    try {
        const key = ensureMfaEncryptionKey();
        const bytes = Buffer.from(raw, 'base64');
        const keyBytes = Buffer.from(key, 'utf8');
        const chars = [];
        for (let i = 0; i < bytes.length; i++) {
            const p = (bytes[i] ^ keyBytes[i % keyBytes.length]) & 0xff;
            chars.push(String.fromCharCode(p));
        }
        return chars.join('');
    } catch (_) {
        return '';
    }
}

function encryptMfaSecret(plain) {
    const text = String(plain || '').trim().toUpperCase().replace(/\s/g, '');
    if (!text) return '';
    try {
        const key = ensureMfaEncryptionKey();
        const keyBytes = Buffer.from(key, 'utf8');
        const out = [];
        for (let i = 0; i < text.length; i++) {
            out.push((text.charCodeAt(i) ^ keyBytes[i % keyBytes.length]) & 0xff);
        }
        return Buffer.from(out).toString('base64');
    } catch (_) {
        return text;
    }
}

function resolveMfaSecretCandidates(encoded) {
    const out = [];
    const seen = {};
    function add(s) {
        const clean = String(s || '').toUpperCase().replace(/\s/g, '').replace(/=+$/g, '');
        if (!/^[A-Z2-7]{16,64}$/.test(clean)) return;
        if (seen[clean]) return;
        seen[clean] = true;
        out.push(clean);
    }
    const enc = String(encoded || '').trim();
    if (!enc) return out;
    add(enc);
    add(xorDecryptMfaToString(enc));
    return out;
}

function verifyTotpAgainstSecretEnc(secretEnc, code, options = {}) {
    const candidates = resolveMfaSecretCandidates(secretEnc);
    if (!candidates.length) {
        return { ok: false, secret: '', decryptOk: false, candidateCount: 0 };
    }
    for (let i = 0; i < candidates.length; i++) {
        if (verifyTotpCode(candidates[i], code, options)) {
            return { ok: true, secret: candidates[i], decryptOk: true, candidateCount: candidates.length };
        }
    }
    return { ok: false, secret: candidates[0], decryptOk: true, candidateCount: candidates.length };
}

function buildOtpAuthUri(email, secret, issuer = 'HSE-04-2026') {
    const iss = String(issuer || 'HSE-04-2026').trim() || 'HSE-04-2026';
    const account = encodeURIComponent(String(email || '').trim());
    const sec = String(secret || '').trim().toUpperCase().replace(/\s/g, '');
    const issEnc = encodeURIComponent(iss);
    return `otpauth://totp/${issEnc}:${account}?secret=${sec}&issuer=${issEnc}&algorithm=SHA1&digits=6&period=30`;
}

function isMfaEnabledForUser(user) {
    if (!user) return false;
    const v = user.mfaEnabled;
    return v === true || v === 'true' || v === 1 || v === '1' || v === 'TRUE';
}

module.exports = {
    MFA_ENROLL_TOTP_WINDOW,
    MFA_TOTP_WINDOW,
    generateTotpSecret,
    verifyTotpCode,
    encryptMfaSecret,
    resolveMfaSecretCandidates,
    verifyTotpAgainstSecretEnc,
    buildOtpAuthUri,
    isMfaEnabledForUser
};
