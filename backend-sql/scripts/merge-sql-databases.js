/**
 * دمج ذكي: أساس Frontend/api + إكمال الناقص من backend-sql
 * node scripts/merge-sql-databases.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { headersMap } = require('../src/db/headers-schema');

const ROOT = path.join(__dirname, '..');
const primaryPath = path.resolve(process.argv[2] || path.join(ROOT, '../Frontend/api/data/clinic_hse.db'));
const secondaryPath = path.resolve(process.argv[3] || path.join(ROOT, 'data/clinic_hse.db'));
const outPath = path.resolve(process.argv[4] || path.join(ROOT, 'data/clinic_hse.db'));

const CRITICAL_SHEETS = [
    'ClinicVisits', 'ClinicContractorVisits', 'Employees', 'Users', 'Medications',
    'Incidents', 'PTW', 'PTWRegistry', 'Training', 'DailyObservations',
    'ClinicStaff', 'ClinicStaffAttendance', 'ClinicMedications', 'ClinicInventory'
];

function openDb(dbPath) {
    const dbMod = require('../src/db/database');
    dbMod.dbInstance = null;
    if (!fs.existsSync(dbPath)) throw new Error(`DB not found: ${dbPath}`);
    return dbMod.initDatabase(dbPath);
}

function sanitizeRows(sheetName, rows) {
    const cols = headersMap[sheetName];
    if (!cols || !Array.isArray(rows)) return [];
    const colSet = new Set(cols);
    return rows.map((row) => {
        const out = {};
        for (const c of cols) {
            if (row && Object.prototype.hasOwnProperty.call(row, c)) {
                out[c] = row[c];
            }
        }
        for (const [k, v] of Object.entries(row || {})) {
            if (colSet.has(k)) out[k] = v;
        }
        return out;
    });
}

function mergeById(rowsA, rowsB) {
    const map = new Map();
    const add = (rows) => {
        for (const row of rows || []) {
            const id = row && row.id != null ? String(row.id) : '';
            if (id) map.set(id, row);
        }
    };
    add(rowsA);
    add(rowsB);
    return Array.from(map.values());
}

function pickRows(rowsA, rowsB) {
    const a = Array.isArray(rowsA) ? rowsA : [];
    const b = Array.isArray(rowsB) ? rowsB : [];
    if (a.length === 0) return b;
    if (b.length === 0) return a;
    if (a.length !== b.length) return a.length > b.length ? a : b;
    return mergeById(a, b);
}

function main() {
    console.log('=== merge-sql-databases (safe) ===');
    console.log('base     :', primaryPath);
    console.log('secondary:', secondaryPath);
    console.log('output   :', outPath);

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.copyFileSync(primaryPath, outPath);

    const dbB = openDb(secondaryPath);
    const dbMod = require('../src/db/database');
    dbMod.dbInstance = null;
    const dbOut = dbMod.initDatabase(outPath);

    const sheetNames = [...new Set([...CRITICAL_SHEETS, ...Object.keys(headersMap)])];
    const report = [];

    for (const sheetName of sheetNames) {
        if (!headersMap[sheetName]) continue;
        let rowsPrimary = [];
        let rowsSecondary = [];
        try { rowsPrimary = dbOut.readSheet(sheetName) || []; } catch (_e) { rowsPrimary = []; }
        try { rowsSecondary = dbB.readSheet(sheetName) || []; } catch (_e) { rowsSecondary = []; }

        const chosen = pickRows(rowsPrimary, rowsSecondary);
        if (!chosen.length) continue;

        const cleaned = sanitizeRows(sheetName, chosen);
        if (!cleaned.length) continue;

        try {
            if (cleaned.length !== rowsPrimary.length || rowsSecondary.length > rowsPrimary.length) {
                dbOut.saveToSheet(sheetName, cleaned);
            }
            report.push({
                sheet: sheetName,
                base: rowsPrimary.length,
                secondary: rowsSecondary.length,
                merged: cleaned.length
            });
        } catch (err) {
            console.warn(`  SKIP ${sheetName}: ${err.message}`);
        }
    }

    console.log('\n--- critical ---');
    for (const name of CRITICAL_SHEETS) {
        const r = report.find(x => x.sheet === name);
        if (r) console.log(`  ${name}: base=${r.base} + sec=${r.secondary} => ${r.merged}`);
    }
    console.log(`\ndone -> ${outPath}`);
}

main();
