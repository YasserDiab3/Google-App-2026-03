/**
 * إعادة بناء قاعدة SQL سليمة من نسختين:
 * Frontend/api (عيادة/موظفين) + vercel-deploy/api (حوادث 501)
 * node scripts/rebuild-canonical-sql.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { DatabaseSync } = require('node:sqlite');
const { initSchema } = require('../src/db/schema-init');

const repo = path.resolve(__dirname, '../..');
const aPath = path.join(repo, 'Frontend/api/data/clinic_hse.db');
const bPath = path.join(repo, 'vercel-deploy/api/data/clinic_hse.db');
const outPath = path.join(repo, 'backend-sql/data/clinic_hse.rebuilt.db');

const SAFE_COL = /^[a-zA-Z0-9_\s\-\/#\(\)\.\&%:\+,أ-ي]+$/;

function listTables(db) {
    return db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`).all().map((r) => r.name);
}

function readRows(db, table) {
    try {
        return db.prepare(`SELECT * FROM "${table.replace(/"/g, '')}"`).all();
    } catch (_e) {
        return [];
    }
}

function pick(a, b) {
    if ((a?.length || 0) >= (b?.length || 0)) return a || [];
    return b || [];
}

function main() {
    const dbA = new DatabaseSync(aPath, { readOnly: true });
    const dbB = new DatabaseSync(bPath, { readOnly: true });
    const tables = [...new Set([...listTables(dbA), ...listTables(dbB)])];

    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    const dest = new DatabaseSync(outPath);
    dest.exec('PRAGMA journal_mode = DELETE;');
    dest.exec('PRAGMA foreign_keys = OFF;');

    const wrapper = {
        exec: (sql) => dest.exec(sql),
        run: () => ({ changes: 0 }),
        raw: dest
    };
    initSchema(wrapper);

    const report = [];
    for (const table of tables) {
        const rows = pick(readRows(dbA, table), readRows(dbB, table));
        if (!rows.length) continue;

        let destCols = dest.prepare(`PRAGMA table_info("${table}")`).all().map((c) => c.name).filter((c) => SAFE_COL.test(c));
        if (!destCols.length) {
            const srcCols = Object.keys(rows[0] || {}).filter((c) => SAFE_COL.test(c));
            if (!srcCols.length) {
                console.warn('skip no cols', table);
                continue;
            }
            dest.exec(`CREATE TABLE IF NOT EXISTS "${table}" (${srcCols.map((c) => `"${c}" TEXT`).join(',')})`);
            destCols = srcCols;
        }

        dest.exec(`DELETE FROM "${table}"`);
        const ph = destCols.map(() => '?').join(',');
        const ins = dest.prepare(`INSERT INTO "${table}" (${destCols.map((c) => `"${c}"`).join(',')}) VALUES (${ph})`);
        dest.exec('BEGIN');
        let n = 0;
        for (const row of rows) {
            ins.run(...destCols.map((c) => {
                const v = row[c];
                if (v === undefined) return null;
                if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
                if (typeof v === 'object' && v !== null) return JSON.stringify(v);
                return v;
            }));
            n++;
        }
        dest.exec('COMMIT');
        report.push({ table, n });
        console.log(`  ${table}: ${n}`);
    }

    dbA.close();
    dbB.close();
    dest.close();

    const crit = ['ClinicVisits', 'Employees', 'Users', 'Medications', 'Incidents', 'PTW', 'Training', 'DailyObservations', 'ClinicContractorVisits'];
    console.log('\n--- critical ---');
    crit.forEach((t) => {
        const r = report.find((x) => x.table === t);
        console.log(`  ${t}: ${r ? r.n : 0}`);
    });
    console.log('out', outPath);
}

main();
