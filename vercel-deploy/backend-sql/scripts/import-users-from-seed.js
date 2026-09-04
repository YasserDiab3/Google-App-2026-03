#!/usr/bin/env node
/**
 * Upsert Users from Frontend/data/users-seed.json into SQLite.
 * Does not wipe demo accounts. Does not replace the whole Users table.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { getDatabase } = require('../src/db/database');
const { initSchema } = require('../src/db/schema-init');

const ROOT = path.join(__dirname, '..', '..');
const SEED = path.join(ROOT, 'Frontend', 'data', 'users-seed.json');

function normEmail(v) {
    return String(v || '').trim().toLowerCase();
}

function run() {
    if (!fs.existsSync(SEED)) {
        console.error('Seed missing:', SEED);
        process.exit(1);
    }
    const seed = JSON.parse(fs.readFileSync(SEED, 'utf8'));
    if (!Array.isArray(seed) || seed.length === 0) {
        console.error('Seed empty');
        process.exit(1);
    }

    const db = getDatabase();
    initSchema(db);
    const existing = db.readSheet('Users') || [];
    const byEmail = new Map();
    for (const u of existing) {
        const em = normEmail(u.email);
        if (em) byEmail.set(em, u);
    }

    let inserted = 0;
    let updated = 0;
    const now = new Date().toISOString();

    for (const row of seed) {
        const email = normEmail(row.email);
        if (!email) continue;
        const hash = String(row.passwordHash || '').trim();
        const payload = {
            id: row.id,
            name: row.name || '',
            email,
            password: '',
            passwordHash: hash,
            role: row.role || 'user',
            department: row.department || '',
            active: row.active == null || row.active === '' ? 'true' : String(row.active),
            photo: row.photo || '',
            permissions: typeof row.permissions === 'string' ? row.permissions : JSON.stringify(row.permissions || {}),
            mfaEnabled: row.mfaEnabled == null ? 'false' : String(row.mfaEnabled),
            mfaSecretEnc: row.mfaSecretEnc || '',
            mfaEnrolledAt: row.mfaEnrolledAt || '',
            employeeCode: row.employeeCode || '',
            isOnline: 'false',
            activeSessionId: '',
            updatedAt: now
        };

        const prev = byEmail.get(email);
        if (prev && prev.id) {
            db.updateRow('Users', 'id', prev.id, payload);
            updated += 1;
        } else {
            payload.createdAt = row.createdAt || now;
            db.appendToSheet('Users', payload);
            inserted += 1;
        }
    }

    if (typeof db.exec === 'function') {
        try { db.exec('PRAGMA wal_checkpoint(FULL);'); } catch (_e) {}
    }

    const after = db.readSheet('Users') || [];
    const yasser = after.find((u) => normEmail(u.email) === 'yasser@icapp.com');
    console.log('Users now:', after.length, 'inserted:', inserted, 'updated:', updated);
    console.log('yasser@icapp.com:', yasser ? 'present' : 'MISSING');
}

run();
