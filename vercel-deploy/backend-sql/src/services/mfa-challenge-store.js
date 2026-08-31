/**
 * In-memory MFA challenge / pending enrollment store (TTL)
 */
'use strict';

const crypto = require('crypto');

const CHALLENGE_TTL_MS = 5 * 60 * 1000;
const ENROLL_TTL_MS = 10 * 60 * 1000;

const challenges = new Map();
const pendingEnroll = new Map();
const usedOtps = new Map();

function prune(map, ttlMs) {
    const now = Date.now();
    for (const [k, v] of map.entries()) {
        if (!v || (v.expiresAt && v.expiresAt < now)) map.delete(k);
    }
}

function createMfaChallenge(email, userRecord) {
    prune(challenges, CHALLENGE_TTL_MS);
    const e = String(email || '').trim().toLowerCase();
    if (!e) return '';
    const token = `${Date.now().toString(16)}_${crypto.randomBytes(16).toString('hex')}`;
    challenges.set(token, {
        email: e,
        userId: userRecord?.id,
        mfaSecretEnc: userRecord?.mfaSecretEnc,
        safeUser: buildMfaChallengeSafeUser(userRecord),
        expiresAt: Date.now() + CHALLENGE_TTL_MS
    });
    return token;
}

function validateMfaChallenge(token, email) {
    prune(challenges, CHALLENGE_TTL_MS);
    const t = String(token || '').trim();
    const e = String(email || '').trim().toLowerCase();
    const row = challenges.get(t);
    return !!(row && row.email === e && row.expiresAt > Date.now());
}

function getMfaChallenge(token) {
    prune(challenges, CHALLENGE_TTL_MS);
    return challenges.get(String(token || '').trim()) || null;
}

function consumeMfaChallenge(token, email) {
    if (!validateMfaChallenge(token, email)) return false;
    challenges.delete(String(token || '').trim());
    return true;
}

function storeMfaEnrollmentPending(email, secret) {
    prune(pendingEnroll, ENROLL_TTL_MS);
    const e = String(email || '').trim().toLowerCase();
    if (!e || !secret) return false;
    pendingEnroll.set(e, { secret, expiresAt: Date.now() + ENROLL_TTL_MS });
    return true;
}

function peekMfaEnrollmentPending(email) {
    prune(pendingEnroll, ENROLL_TTL_MS);
    const e = String(email || '').trim().toLowerCase();
    const row = pendingEnroll.get(e);
    return row && row.expiresAt > Date.now() ? row.secret : '';
}

function clearMfaEnrollmentPending(email) {
    pendingEnroll.delete(String(email || '').trim().toLowerCase());
}

function isTotpCodeAlreadyUsed(email, code) {
    const key = `${String(email || '').trim().toLowerCase()}:${String(code || '').replace(/\s/g, '')}`;
    const row = usedOtps.get(key);
    return !!(row && row.expiresAt > Date.now());
}

function markTotpCodeConsumed(email, code, ttlSec = 180) {
    const key = `${String(email || '').trim().toLowerCase()}:${String(code || '').replace(/\s/g, '')}`;
    if (usedOtps.has(key)) return false;
    usedOtps.set(key, { expiresAt: Date.now() + ttlSec * 1000 });
    return true;
}

function buildMfaChallengeSafeUser(user) {
    if (!user) return null;
    return {
        id: user.id,
        name: String(user.name || ''),
        email: String(user.email || ''),
        role: String(user.role || ''),
        department: String(user.department || ''),
        active: user.active,
        jobTitle: String(user.jobTitle || ''),
        mfaEnabled: true
    };
}

module.exports = {
    createMfaChallenge,
    validateMfaChallenge,
    getMfaChallenge,
    consumeMfaChallenge,
    storeMfaEnrollmentPending,
    peekMfaEnrollmentPending,
    clearMfaEnrollmentPending,
    isTotpCodeAlreadyUsed,
    markTotpCodeConsumed,
    buildMfaChallengeSafeUser
};
