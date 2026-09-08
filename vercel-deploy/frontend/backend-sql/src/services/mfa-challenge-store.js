/**
 * MFA challenge / pending enrollment store
 * Stateless signed tokens for serverless (Vercel) + in-memory cache for local dev
 */
'use strict';

const crypto = require('crypto');

const CHALLENGE_TTL_MS = 5 * 60 * 1000;
const ENROLL_TTL_MS = 10 * 60 * 1000;

const challenges = new Map();
const pendingEnroll = new Map();
const usedOtps = new Map();
const consumedChallengeJti = new Map();

let _sysTableReady = false;

function getChallengeSecret() {
    try {
        const config = require('../config/config');
        const s = String(config.sessionSecret || process.env.SESSION_SECRET || '').trim();
        if (s) return s;
    } catch (_) { /* ignore */ }
    return 'hse_mfa_challenge_fallback_2026';
}

function getDbIfWritable() {
    try {
        const { getDatabase } = require('../db/database');
        const db = getDatabase();
        if (db && db.engineType !== 'json-fallback' && typeof db.run === 'function') {
            ensureSysTable(db);
            return db;
        }
    } catch (_) { /* ignore */ }
    return null;
}

function ensureSysTable(db) {
    if (_sysTableReady) return;
    try {
        db.exec(`CREATE TABLE IF NOT EXISTS "_SysMfaStore" (
            "key" TEXT PRIMARY KEY,
            "value" TEXT NOT NULL,
            "expiresAt" INTEGER NOT NULL
        )`);
        db.exec(`CREATE INDEX IF NOT EXISTS "idx_SysMfaStore_expires" ON "_SysMfaStore" ("expiresAt")`);
        _sysTableReady = true;
    } catch (_) { /* ignore */ }
}

function pruneSysStore(db) {
    try {
        db.run(`DELETE FROM "_SysMfaStore" WHERE "expiresAt" < ?`, [Date.now()]);
    } catch (_) { /* ignore */ }
}

function sysSet(key, valueObj, ttlMs) {
    const expiresAt = Date.now() + ttlMs;
    const db = getDbIfWritable();
    if (db) {
        try {
            pruneSysStore(db);
            db.run(
                `INSERT OR REPLACE INTO "_SysMfaStore" ("key", "value", "expiresAt") VALUES (?, ?, ?)`,
                [String(key), JSON.stringify(valueObj), expiresAt]
            );
        } catch (_) { /* ignore */ }
    }
    return expiresAt;
}

function sysGet(key) {
    const db = getDbIfWritable();
    if (db) {
        try {
            const row = db.get(
                `SELECT "value", "expiresAt" FROM "_SysMfaStore" WHERE "key" = ?`,
                [String(key)]
            );
            if (row && row.expiresAt > Date.now()) {
                return JSON.parse(String(row.value || '{}'));
            }
        } catch (_) { /* ignore */ }
    }
    return null;
}

function sysDelete(key) {
    const db = getDbIfWritable();
    if (db) {
        try {
            db.run(`DELETE FROM "_SysMfaStore" WHERE "key" = ?`, [String(key)]);
        } catch (_) { /* ignore */ }
    }
}

function prune(map, ttlMs) {
    const now = Date.now();
    for (const [k, v] of map.entries()) {
        if (!v || (v.expiresAt && v.expiresAt < now)) map.delete(k);
    }
}

function signPayload(payloadObj) {
    const payloadB64 = Buffer.from(JSON.stringify(payloadObj)).toString('base64url');
    const sig = crypto.createHmac('sha256', getChallengeSecret()).update(payloadB64).digest('base64url');
    return `${payloadB64}.${sig}`;
}

function parseSignedToken(token) {
    const raw = String(token || '').trim();
    const dot = raw.indexOf('.');
    if (dot <= 0) return null;
    const payloadB64 = raw.slice(0, dot);
    const sig = raw.slice(dot + 1);
    if (!payloadB64 || !sig) return null;
    const expected = crypto.createHmac('sha256', getChallengeSecret()).update(payloadB64).digest('base64url');
    try {
        const a = Buffer.from(sig);
        const b = Buffer.from(expected);
        if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    } catch (_) {
        return null;
    }
    try {
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
        if (!payload || typeof payload !== 'object') return null;
        return payload;
    } catch (_) {
        return null;
    }
}

function isLegacyToken(token) {
    return String(token || '').trim().includes('_') && !String(token || '').includes('.');
}

function createMfaChallenge(email, userRecord) {
    prune(challenges, CHALLENGE_TTL_MS);
    const e = String(email || '').trim().toLowerCase();
    if (!e) return '';

    const exp = Date.now() + CHALLENGE_TTL_MS;
    const jti = crypto.randomBytes(12).toString('hex');
    const payload = {
        v: 1,
        email: e,
        userId: String(userRecord?.id || ''),
        exp,
        jti
    };
    const token = signPayload(payload);

    const row = {
        email: e,
        userId: userRecord?.id,
        mfaSecretEnc: userRecord?.mfaSecretEnc,
        safeUser: buildMfaChallengeSafeUser(userRecord),
        expiresAt: exp,
        jti
    };
    challenges.set(token, row);
    sysSet(`mfa:challenge:${jti}`, row, CHALLENGE_TTL_MS);
    return token;
}

function validateMfaChallenge(token, email) {
    prune(challenges, CHALLENGE_TTL_MS);
    const e = String(email || '').trim().toLowerCase();
    const t = String(token || '').trim();

    const payload = parseSignedToken(t);
    if (payload && payload.v === 1) {
        if (payload.email !== e) return false;
        if (!payload.exp || payload.exp < Date.now()) return false;
        if (payload.jti && isChallengeJtiConsumed(payload.jti)) return false;
        return true;
    }

    if (isLegacyToken(t)) {
        const row = challenges.get(t) || sysGet(`mfa:legacy:${t}`);
        return !!(row && row.email === e && row.expiresAt > Date.now());
    }

    return false;
}

function getMfaChallenge(token) {
    prune(challenges, CHALLENGE_TTL_MS);
    const t = String(token || '').trim();

    const payload = parseSignedToken(t);
    if (payload && payload.v === 1) {
        if (payload.jti) {
            const fromDb = sysGet(`mfa:challenge:${payload.jti}`);
            if (fromDb) return fromDb;
        }
        const cached = challenges.get(t);
        if (cached) return cached;
        return {
            email: payload.email,
            userId: payload.userId,
            expiresAt: payload.exp,
            jti: payload.jti,
            mfaSecretEnc: null
        };
    }

    if (isLegacyToken(t)) {
        return challenges.get(t) || sysGet(`mfa:legacy:${t}`) || null;
    }

    return challenges.get(t) || null;
}

function isChallengeJtiConsumed(jti) {
    const key = String(jti || '').trim();
    if (!key) return false;
    const mem = consumedChallengeJti.get(key);
    if (mem && mem.expiresAt > Date.now()) return true;
    const row = sysGet(`mfa:used-jti:${key}`);
    return !!(row && row.used);
}

function markChallengeJtiConsumed(jti, ttlMs = CHALLENGE_TTL_MS) {
    const key = String(jti || '').trim();
    if (!key) return;
    consumedChallengeJti.set(key, { expiresAt: Date.now() + ttlMs });
    sysSet(`mfa:used-jti:${key}`, { used: true }, ttlMs);
}

function consumeMfaChallenge(token, email) {
    if (!validateMfaChallenge(token, email)) return false;
    const t = String(token || '').trim();
    const payload = parseSignedToken(t);
    if (payload?.jti) {
        markChallengeJtiConsumed(payload.jti);
    }
    challenges.delete(t);
    sysDelete(`mfa:legacy:${t}`);
    return true;
}

function storeMfaEnrollmentPending(email, secret) {
    prune(pendingEnroll, ENROLL_TTL_MS);
    const e = String(email || '').trim().toLowerCase();
    if (!e || !secret) return false;
    const row = { secret, expiresAt: Date.now() + ENROLL_TTL_MS };
    pendingEnroll.set(e, row);
    sysSet(`mfa:enroll:${e}`, row, ENROLL_TTL_MS);
    return true;
}

function peekMfaEnrollmentPending(email) {
    prune(pendingEnroll, ENROLL_TTL_MS);
    const e = String(email || '').trim().toLowerCase();
    const row = pendingEnroll.get(e) || sysGet(`mfa:enroll:${e}`);
    return row && row.expiresAt > Date.now() ? row.secret : '';
}

function clearMfaEnrollmentPending(email) {
    const e = String(email || '').trim().toLowerCase();
    pendingEnroll.delete(e);
    sysDelete(`mfa:enroll:${e}`);
}

function isTotpCodeAlreadyUsed(email, code) {
    const key = `${String(email || '').trim().toLowerCase()}:${String(code || '').replace(/\s/g, '')}`;
    const mem = usedOtps.get(key);
    if (mem && mem.expiresAt > Date.now()) return true;
    const row = sysGet(`mfa:otp:${key}`);
    return !!(row && row.used);
}

function markTotpCodeConsumed(email, code, ttlSec = 180) {
    const key = `${String(email || '').trim().toLowerCase()}:${String(code || '').replace(/\s/g, '')}`;
    if (isTotpCodeAlreadyUsed(email, code)) return false;
    usedOtps.set(key, { expiresAt: Date.now() + ttlSec * 1000 });
    sysSet(`mfa:otp:${key}`, { used: true }, ttlSec * 1000);
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
