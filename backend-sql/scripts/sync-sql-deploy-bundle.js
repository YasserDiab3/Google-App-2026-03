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
    path.join(repoRoot, 'vercel-deploy/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'vercel-deploy/frontend/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'dist/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'Frontend/dist/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'vercel-deploy/dist/data/sql/clinic_hse.db'),
    path.join(repoRoot, 'vercel-deploy/frontend/dist/data/sql/clinic_hse.db')
];

const buf = fs.readFileSync(sourceDb);
const gz = zlib.gzipSync(buf);

for (const dest of targets) {
    try {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buf);
        fs.writeFileSync(dest + '.gz', gz);
        console.log('OK', dest);
    } catch (e) {
        console.warn('SKIP', dest, e.message);
    }
}

console.log(`\nSynced ${(buf.length / (1024 * 1024)).toFixed(2)} MB + gzip to ${targets.length} locations`);
