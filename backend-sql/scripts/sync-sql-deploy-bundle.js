/**
 * نسخ clinic_hse.db + .gz لكل مسارات النشر
 * node scripts/sync-sql-deploy-bundle.js [sourceDbPath]
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const repoRoot = path.join(ROOT, '..');
const sourceDb = path.resolve(process.argv[2] || path.join(ROOT, 'data/clinic_hse.db'));

if (!fs.existsSync(sourceDb)) {
    console.error('Source DB missing:', sourceDb);
    process.exit(1);
}

const targets = [
    path.join(ROOT, 'data/clinic_hse.db'),
    path.join(repoRoot, 'data/sql/clinic_hse.db'),
    path.join(repoRoot, 'Frontend/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'Frontend/backend-sql/data/clinic_hse.db'),
    path.join(repoRoot, 'vercel-deploy/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'vercel-deploy/frontend/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'vercel-deploy/frontend/backend-sql/data/clinic_hse.db'),
    path.join(repoRoot, 'dist/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'Frontend/dist/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'vercel-deploy/dist/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'vercel-deploy/frontend/dist/data/sql/clinic_hse.db')
];

let sessionDb = null;

// لا تُضمَّن جلسات نشطة في bundle النشر — تسبب رفض الطلبات على Vercel
try {
    const { initDatabase } = require('../src/db/database');
    sessionDb = initDatabase(sourceDb);
    const users = sessionDb.readSheet('Users') || [];
    let cleared = 0;
    for (const u of users) {
        if (!u || !u.id) continue;
        const sid = String(u.activeSessionId || '').trim();
        const online = String(u.isOnline || '').toUpperCase();
        if (sid || online === 'TRUE' || online === '1') {
            sessionDb.updateRow('Users', 'id', u.id, { isOnline: 'false', activeSessionId: '' });
            cleared++;
        }
    }
    if (cleared > 0) {
        console.log(`Cleared stale sessions for ${cleared} user(s) before deploy bundle`);
    }
} catch (e) {
    console.warn('Session cleanup skipped:', e.message);
}

// دمج WAL في الملف الرئيسي قبل القراءة — بدونها يُرفع bundle قديم (MFA/كلمة مرور ناقصة)
try {
    if (sessionDb && typeof sessionDb.exec === 'function') {
        sessionDb.exec('PRAGMA wal_checkpoint(FULL);');
    }
} catch (e) {
    console.warn('WAL checkpoint skipped:', e.message);
}

const finalBuf = fs.readFileSync(sourceDb);
const gz = zlib.gzipSync(finalBuf);

for (const dest of targets) {
    try {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, finalBuf);
        fs.writeFileSync(dest + '.gz', gz);
        console.log('OK', dest);
    } catch (e) {
        console.warn('SKIP', dest, e.message);
    }
}

console.log(`\nSynced ${(finalBuf.length / (1024 * 1024)).toFixed(2)} MB + gzip to ${targets.length} locations`);
