/**
 * أساس: Frontend/api (زيارات/موظفين كاملة)
 * إكمال: Incidents من vercel-deploy/api (501 صف)
 * ثم كتابة القاعدة الموحّدة إلى backend-sql/data
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const repo = path.resolve(__dirname, '../..');
const basePath = path.join(repo, 'Frontend/data/sql/clinic_hse.db');
const incidentsSrc = path.join(repo, 'vercel-deploy/data/sql/clinic_hse.db');
const outPath = path.join(repo, 'backend-sql/data/clinic_hse.merged.db');

function rmSidecar(p) {
    for (const s of ['-wal', '-shm']) {
        try { fs.unlinkSync(p + s); } catch (_e) {}
    }
}

function main() {
    if (!fs.existsSync(basePath)) throw new Error('missing base ' + basePath);
    if (!fs.existsSync(incidentsSrc)) throw new Error('missing incidents src ' + incidentsSrc);

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    rmSidecar(outPath);
    fs.copyFileSync(basePath, outPath);
    rmSidecar(outPath);

    const src = new DatabaseSync(incidentsSrc, { readOnly: true });
    const dest = new DatabaseSync(outPath, { timeout: 15000 });
    dest.exec('PRAGMA busy_timeout = 15000;');
    dest.exec('PRAGMA journal_mode = DELETE;');
    dest.exec('PRAGMA foreign_keys = OFF;');

    const tables = ['Incidents'];
    for (const table of tables) {
        const destCols = dest.prepare(`PRAGMA table_info("${table}")`).all().map((c) => c.name);
        const srcCols = src.prepare(`PRAGMA table_info("${table}")`).all().map((c) => c.name);
        if (!destCols.length || !srcCols.length) {
            console.log('skip', table);
            continue;
        }
        const cols = destCols.filter((c) => srcCols.includes(c));
        const srcCount = src.prepare(`SELECT COUNT(*) AS n FROM "${table}"`).get().n;
        const destCount = dest.prepare(`SELECT COUNT(*) AS n FROM "${table}"`).get().n;
        console.log(`${table}: dest=${destCount} src=${srcCount}`);
        if (srcCount <= destCount) continue;

        const rows = src.prepare(`SELECT * FROM "${table}"`).all();
        dest.exec('BEGIN');
        dest.exec(`DELETE FROM "${table}"`);
        const ph = cols.map(() => '?').join(',');
        const ins = dest.prepare(`INSERT INTO "${table}" (${cols.map((c) => `"${c}"`).join(',')}) VALUES (${ph})`);
        let n = 0;
        for (const row of rows) {
            ins.run(...cols.map((c) => (row[c] === undefined ? null : row[c])));
            n++;
        }
        dest.exec('COMMIT');
        console.log(`  imported ${n} rows`);
    }

    src.close();
    dest.close();
    console.log('canonical DB:', outPath);
}

main();
