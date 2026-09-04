#!/usr/bin/env node
/**
 * استيراد قاعدة HSE من ملف Excel (.xlsx) مباشرة — بدون Google API
 * الشيت مصدر الحقيقة: استبدال كامل لكل ورقة (DELETE + INSERT).
 * لا يمس Users / UserVersions إلا مع --include-users.
 *
 * الاستخدام:
 *   node backend-sql/scripts/import-from-xlsx.js --compare --all "C:\path\file.xlsx"
 *   node backend-sql/scripts/import-from-xlsx.js --all --deploy-bundle "C:\path\file.xlsx"
 *   node backend-sql/scripts/import-from-xlsx.js --sheets=PTW,ClinicVisits "C:\path\file.xlsx"
 */
'use strict';

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { headersMap } = require('../src/db/headers-schema');

const SKIP_AUTH_SHEETS = new Set(['Users', 'UserVersions']);

const PRIORITY_SHEETS = [
    'ClinicVisits', 'ClinicContractorVisits', 'PTW', 'PTWRegistry',
    'Employees', 'Medications', 'Training', 'DailyObservations'
];

function parseArgs(argv) {
    const opts = {
        compare: false,
        all: false,
        deployBundle: false,
        includeUsers: false,
        sheets: [...PRIORITY_SHEETS],
        file: null
    };
    for (const arg of argv) {
        if (arg === '--compare') opts.compare = true;
        else if (arg === '--all') opts.all = true;
        else if (arg === '--deploy-bundle') opts.deployBundle = true;
        else if (arg === '--include-users') opts.includeUsers = true;
        else if (arg.startsWith('--sheets=')) {
            opts.sheets = arg.slice('--sheets='.length).split(',').map((s) => s.trim()).filter(Boolean);
        } else if (!arg.startsWith('-')) {
            opts.file = arg;
        }
    }
    return opts;
}

function isEmptyRow(row) {
    if (!row || typeof row !== 'object') return true;
    return Object.values(row).every((v) => String(v == null ? '' : v).trim() === '');
}

const SAFE_IDENTIFIER_REGEX = /^[a-zA-Z0-9_\s\-\/#\(\)\.\&%:\+,أ-ي]+$/;

function isSafeIdent(name) {
    if (!name || typeof name !== 'string') return false;
    const clean = name.trim();
    return SAFE_IDENTIFIER_REGEX.test(clean)
        && !clean.includes('"')
        && !clean.includes(';')
        && !clean.includes('--')
        && !clean.includes('/*');
}

function formatVal(val) {
    if (val === undefined || val === null) return null;
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    if (typeof val === 'object') {
        if (val instanceof Date && !Number.isNaN(val.getTime())) return val.toISOString();
        try { return JSON.stringify(val); } catch (_) { return String(val); }
    }
    return val;
}

function pickKnownColumns(sheetName, row, columns) {
    const cols = columns || headersMap[sheetName];
    if (!cols || !cols.length) return { ...row };
    const out = {};
    for (const col of cols) {
        if (Object.prototype.hasOwnProperty.call(row, col)) out[col] = row[col];
    }
    return out;
}

function safeColumnsFor(sheetName, sampleRow) {
    const known = headersMap[sheetName] || (sampleRow ? Object.keys(sampleRow) : []);
    const safe = known.filter(isSafeIdent);
    const skipped = known.filter((c) => !isSafeIdent(c));
    return { safe, skipped };
}

function replaceSheetExact(db, sheetName, rows) {
    const cleaned = (Array.isArray(rows) ? rows : []).filter((r) => !isEmptyRow(r));
    const { safe, skipped } = safeColumnsFor(sheetName, cleaned[0]);
    const table = `"${sheetName.replace(/"/g, '')}"`;

    if (typeof db.exec === 'function') {
        db.exec(`DELETE FROM ${table}`);
    }

    if (cleaned.length === 0) {
        return { count: 0, skipped };
    }

    const cols = safe.length ? safe : Object.keys(cleaned[0]).filter(isSafeIdent);
    if (!cols.length) {
        throw new Error('لا أعمدة آمنة للكتابة');
    }

    const colNames = cols.map((c) => `"${c}"`).join(', ');
    const placeholders = cols.map(() => '?').join(', ');
    const insertSql = `INSERT INTO ${table} (${colNames}) VALUES (${placeholders})`;
    const raw = db.raw;
    const stmt = raw && typeof raw.prepare === 'function'
        ? raw.prepare(insertSql)
        : null;

    let count = 0;
    for (const rawRow of cleaned) {
        const row = pickKnownColumns(sheetName, rawRow, cols);
        const values = cols.map((c) => formatVal(row[c]));
        if (stmt) stmt.run(...values);
        else db.run(insertSql, values);
        count++;
    }
    return { count, skipped };
}

function openDb() {
    const dbPath = path.join(__dirname, '../data/clinic_hse.db');
    process.env.SQLITE_PATH = dbPath;
    const dbMod = require('../src/db/database');
    dbMod.dbInstance = null;
    return { db: dbMod.initDatabase(dbPath), dbPath, dbMod };
}

function countLocalDb(sheetNames) {
    const { db } = openDb();
    const out = {};
    for (const s of sheetNames) {
        try {
            out[s] = db.readSheet(s).length;
        } catch (e) {
            out[s] = `ERR:${e.message}`;
        }
    }
    return out;
}

function readXlsxSheets(filePath, targetSheets) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`ملف Excel غير موجود: ${filePath}`);
    }
    console.log('📂 قراءة:', filePath);
    const wb = XLSX.readFile(filePath, { cellDates: true });
    const data = {};
    const stats = {};

    for (const name of targetSheets) {
        const sheet = wb.Sheets[name];
        if (!sheet) {
            stats[name] = { error: 'تبويب غير موجود' };
            data[name] = [];
            continue;
        }
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false })
            .filter((r) => !isEmptyRow(r));
        data[name] = rows;
        stats[name] = { xlsxRows: rows.length };
    }
    return { data, stats, tabCount: wb.SheetNames.length };
}

function printComparison(xlsxStats, localCounts) {
    console.log('\n══════════════════════════════════════════════════');
    console.log('  مقارنة Google Sheets (XLSX) ↔ SQL');
    console.log('══════════════════════════════════════════════════');
    console.log('الورقة'.padEnd(28), 'شيت', 'SQL', 'Δ');
    console.log('─'.repeat(55));

    const keys = new Set([...Object.keys(xlsxStats), ...Object.keys(localCounts)]);
    let mismatch = 0;
    for (const sheet of [...keys].sort()) {
        const x = xlsxStats[sheet];
        if (x?.error) {
            console.log(sheet.padEnd(28), 'ERR', localCounts[sheet] ?? '-', x.error);
            mismatch++;
            continue;
        }
        const xN = x?.xlsxRows ?? '-';
        const lN = localCounts[sheet] ?? '-';
        let delta = '';
        if (typeof xN === 'number' && typeof lN === 'number') {
            const d = xN - lN;
            if (d !== 0) mismatch++;
            delta = d === 0 ? '✓' : (d > 0 ? `+${d}` : String(d));
        }
        console.log(String(sheet).padEnd(28), String(xN).padStart(6), String(lN).padStart(6), delta.padStart(6));
    }
    console.log('══════════════════════════════════════════════════');
    console.log(mismatch === 0 ? '✓ الأعداد متطابقة\n' : `Δ أوراق غير متطابقة العدد: ${mismatch}\n`);
    return mismatch;
}

function replaceExact(db, data) {
    let totalSheets = 0;
    let totalRecords = 0;
    let failed = 0;

    if (typeof db.exec === 'function') {
        try { db.exec('BEGIN'); } catch (_) {}
    }

    for (const [sheetName, rows] of Object.entries(data)) {
        if (!headersMap[sheetName]) {
            console.log(`  ⚠️ تخطي ورقة غير معروفة: ${sheetName}`);
            continue;
        }
        try {
            const { count, skipped } = replaceSheetExact(db, sheetName, rows);
            const skipNote = skipped && skipped.length
                ? ` (تخطي ${skipped.length} عمود تالف)`
                : '';
            if (count === 0) {
                console.log(`  ✓ [${sheetName}]: فاضي — مُسحت SQL${skipNote}`);
            } else {
                console.log(`  ✓ [${sheetName}]: ${count} صف${skipNote}`);
            }
            totalSheets++;
            totalRecords += count;
        } catch (err) {
            failed++;
            console.error(`  ❌ [${sheetName}]: ${err.message}`);
        }
    }

    if (typeof db.exec === 'function') {
        try { db.exec(failed ? 'ROLLBACK' : 'COMMIT'); } catch (_) {}
        try { db.exec('PRAGMA wal_checkpoint(FULL);'); } catch (_) {}
    }

    if (failed) {
        throw new Error(`فشل استبدال ${failed} ورقة — تراجع كامل`);
    }
    return { totalSheets, totalRecords };
}

async function main() {
    const opts = parseArgs(process.argv.slice(2));
    if (!opts.file) {
        console.error('Usage: node import-from-xlsx.js [--compare|--all] [--deploy-bundle] [--include-users] [--sheets=A,B] <file.xlsx>');
        process.exit(1);
    }

    let targetSheets = opts.sheets;
    if (opts.all) {
        const wb = XLSX.readFile(opts.file, { bookSheets: true });
        targetSheets = Object.keys(headersMap).filter((n) => wb.SheetNames.includes(n));
        console.log(`🔄 --all: ${targetSheets.length} ورقة معروفة في الملف`);
    }
    if (!opts.includeUsers) {
        targetSheets = targetSheets.filter((n) => !SKIP_AUTH_SHEETS.has(n));
        console.log('🔒 تخطي Users / UserVersions (حسابات الدخول)');
    }

    const localBefore = countLocalDb(targetSheets);
    const { data, stats, tabCount } = readXlsxSheets(opts.file, targetSheets);
    console.log(`📑 تبويبات في الملف: ${tabCount}`);
    printComparison(stats, localBefore);

    if (opts.compare) {
        console.log('(compare فقط — لم يُكتَب SQL)');
        return;
    }

    console.log('💾 استبدال مطابق → backend-sql/data/clinic_hse.db ...');
    const { db } = openDb();
    const result = replaceExact(db, data);
    console.log(`✅ استُبدل: ${result.totalRecords} سجل في ${result.totalSheets} ورقة`);

    const localAfter = countLocalDb(targetSheets);
    console.log('\n✅ بعد الاستيراد:');
    const mismatch = printComparison(stats, localAfter);
    if (mismatch) {
        console.warn('⚠️ بعض الأعداد لم تتطابق بعد الكتابة — راجع السجل أعلاه');
    }

    if (opts.deployBundle) {
        console.log('📦 sync-sql-deploy-bundle ...');
        const bundlePath = path.join(__dirname, 'sync-sql-deploy-bundle.js');
        require('child_process').execFileSync(process.execPath, [bundlePath], { stdio: 'inherit' });
    } else {
        console.log('💡 للنشر: أضف --deploy-bundle');
    }

    // ترحيل تلقائي إلى Oracle Cloud بعد تحديث SQLite
    const skipOracle = process.env.ORACLE_MIRROR === '0' || process.argv.includes('--skip-oracle');
    if (!skipOracle && targetSheets.length) {
        const migrateScript = path.join(__dirname, 'migrate-sqlite-to-oracle.js');
        if (fs.existsSync(migrateScript)) {
            console.log('☁ مزامنة Oracle Cloud بعد الاستيراد...');
            const env = { ...process.env, DB_TYPE: process.env.DB_TYPE === 'oracle' ? 'oracle' : (process.env.DB_TYPE || 'sqlite') };
            // migrate script requires oracle credentials; force connect via existing .env
            try {
                require('child_process').execFileSync(
                    process.execPath,
                    [migrateScript, `--tables=${targetSheets.join(',')}`],
                    { stdio: 'inherit', env, cwd: path.join(__dirname, '..') }
                );
            } catch (e) {
                console.warn('⚠️ مزامنة Oracle فشلت (SQLite محفوظ):', e && e.message ? e.message : e);
            }
        }
    }
}

main().catch((err) => {
    console.error('❌', err.message || err);
    process.exit(1);
});
