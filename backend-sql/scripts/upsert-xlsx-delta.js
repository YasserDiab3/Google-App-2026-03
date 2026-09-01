#!/usr/bin/env node
/**
 * ترحيل فرق Google Sheets (XLSX) → SQL
 * - إدراج الصفوف الجديدة
 * - تحديث الصفوف المتغيّرة لتطابق الشيت
 * - لا يحذف صفوف SQL-only
 * - لا يمس جداول حسابات المستخدمين
 *
 *   node backend-sql/scripts/upsert-xlsx-delta.js --compare <file.xlsx>
 *   node backend-sql/scripts/upsert-xlsx-delta.js --all <file.xlsx>
 *   node backend-sql/scripts/upsert-xlsx-delta.js --deploy-bundle --all <file.xlsx>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { headersMap } = require('../src/db/headers-schema');

const SKIP_SHEETS = new Set([
    'Users',
    'UserVersions'
]);

const PRIORITY_SHEETS = [
    'ClinicVisits',
    'ClinicContractorVisits',
    'PTW',
    'PTWRegistry',
    'Training',
    'TrainingAttendance',
    'LegalTrainings',
    'LegalTrainingAttendees',
    'ContractorTrainings',
    'AnnualTrainingPlans',
    'DailyObservations',
    'Employees',
    'Medications',
    'Incidents',
    'IncidentsRegistry',
    'Violations',
    'NearMiss',
    'Injuries',
    'SickLeave'
];

const KEY_CANDIDATES = ['id', 'ID', 'Record ID', 'Setting_Key'];

function parseArgs(argv) {
    const opts = {
        compare: false,
        all: false,
        deployBundle: false,
        sheets: [...PRIORITY_SHEETS],
        file: null
    };
    for (const arg of argv) {
        if (arg === '--compare') opts.compare = true;
        else if (arg === '--all') opts.all = true;
        else if (arg === '--deploy-bundle') opts.deployBundle = true;
        else if (arg.startsWith('--sheets=')) {
            opts.sheets = arg.slice('--sheets='.length).split(',').map((s) => s.trim()).filter(Boolean);
        } else if (!arg.startsWith('-')) {
            opts.file = arg;
        }
    }
    return opts;
}

function detectKey(headers) {
    for (const c of KEY_CANDIDATES) {
        if (headers.includes(c)) return c;
    }
    return headers[0] || 'id';
}

function norm(v) {
    if (v === undefined || v === null) return '';
    if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
    if (typeof v === 'object') {
        try { return JSON.stringify(v); } catch (_) { return String(v); }
    }
    return String(v).trim();
}

function rowSignature(row, columns) {
    return columns.map((c) => `${c}=${norm(row[c])}`).join('\n');
}

function isEmptyRow(row) {
    if (!row || typeof row !== 'object') return true;
    return Object.values(row).every((v) => norm(v) === '');
}

function openDb() {
    const dbPath = path.join(__dirname, '../data/clinic_hse.db');
    process.env.SQLITE_PATH = dbPath;
    const dbMod = require('../src/db/database');
    dbMod.dbInstance = null;
    return { db: dbMod.initDatabase(dbPath), dbPath };
}

function pickKnownColumns(sheetName, row) {
    const known = headersMap[sheetName];
    if (!known || !known.length) return { ...row };
    const out = {};
    for (const col of known) {
        if (Object.prototype.hasOwnProperty.call(row, col)) out[col] = row[col];
    }
    return out;
}

function diffFields(sheetRow, sqlRow, columns, keyCol) {
    const changed = {};
    let n = 0;
    for (const col of columns) {
        if (col === keyCol) continue;
        const a = norm(sheetRow[col]);
        const b = norm(sqlRow ? sqlRow[col] : '');
        if (a !== b) {
            changed[col] = sheetRow[col] === undefined ? '' : sheetRow[col];
            n++;
        }
    }
    return { changed, n };
}

function printReport(rows) {
    console.log('\n════════════════════════════════════════════════════════════════════');
    console.log('  ترحيل فرق Google Sheets → SQL (بدون حسابات المستخدمين)');
    console.log('════════════════════════════════════════════════════════════════════');
    console.log(
        'الورقة'.padEnd(32),
        'شيت'.padStart(6),
        'SQL'.padStart(6),
        'جديد'.padStart(6),
        'تغيير'.padStart(6),
        'SQL-only'.padStart(9)
    );
    console.log('─'.repeat(72));
    let totSheet = 0;
    let totSql = 0;
    let totNew = 0;
    let totChanged = 0;
    let totOnly = 0;
    for (const r of rows) {
        if (r.error) {
            console.log(String(r.sheet).padEnd(32), r.error);
            continue;
        }
        totSheet += r.sheetCount;
        totSql += r.sqlCount;
        totNew += r.newCount;
        totChanged += r.changedCount;
        totOnly += r.sqlOnly;
        const mark = (r.newCount || r.changedCount) ? '' : '✓';
        console.log(
            String(r.sheet).padEnd(32),
            String(r.sheetCount).padStart(6),
            String(r.sqlCount).padStart(6),
            String(r.newCount).padStart(6),
            String(r.changedCount).padStart(6),
            String(r.sqlOnly).padStart(9),
            mark
        );
    }
    console.log('─'.repeat(72));
    console.log(
        'المجموع'.padEnd(32),
        String(totSheet).padStart(6),
        String(totSql).padStart(6),
        String(totNew).padStart(6),
        String(totChanged).padStart(6),
        String(totOnly).padStart(9)
    );
    console.log('════════════════════════════════════════════════════════════════════\n');
    return { totNew, totChanged, totOnly };
}

async function main() {
    const opts = parseArgs(process.argv.slice(2));
    if (!opts.file) {
        console.error('Usage: node upsert-xlsx-delta.js [--compare|--all] [--deploy-bundle] [--sheets=A,B] <file.xlsx>');
        process.exit(1);
    }
    if (!fs.existsSync(opts.file)) {
        throw new Error(`ملف غير موجود: ${opts.file}`);
    }

    console.log('📂 قراءة:', opts.file);
    const wb = XLSX.readFile(opts.file, { cellDates: true });
    console.log(`📑 تبويبات XLSX: ${wb.SheetNames.length}`);

    let targetSheets = opts.sheets;
    if (opts.all) {
        targetSheets = Object.keys(headersMap).filter((n) => wb.SheetNames.includes(n) && !SKIP_SHEETS.has(n));
    } else {
        targetSheets = targetSheets.filter((n) => !SKIP_SHEETS.has(n));
    }
    console.log(`🎯 أوراق مستهدفة: ${targetSheets.length} (تخطي Users/UserVersions)`);

    const { db } = openDb();
    const reports = [];
    let inserted = 0;
    let updated = 0;
    let failed = 0;

    const apply = !opts.compare;

    for (const sheetName of targetSheets) {
        const ws = wb.Sheets[sheetName];
        if (!ws) {
            reports.push({ sheet: sheetName, error: 'غير موجود في الشيت' });
            continue;
        }

        const sheetRows = XLSX.utils.sheet_to_json(ws, { defval: '', raw: false })
            .filter((r) => !isEmptyRow(r));
        const schemaCols = headersMap[sheetName] || (sheetRows[0] ? Object.keys(sheetRows[0]) : []);
        const xlsxCols = sheetRows[0] ? Object.keys(sheetRows[0]) : [];
        const columns = schemaCols.filter((c) => xlsxCols.includes(c));
        const keyCol = detectKey(columns.length ? columns : schemaCols);

        let sqlRows = [];
        try {
            sqlRows = db.readSheet(sheetName) || [];
        } catch (e) {
            reports.push({ sheet: sheetName, error: `SQL: ${e.message}` });
            continue;
        }

        const sqlByKey = new Map();
        for (const r of sqlRows) {
            const k = norm(r[keyCol]);
            if (k) sqlByKey.set(k, r);
        }

        const sheetKeys = new Set();
        const toInsert = [];
        const toUpdate = [];

        for (const raw of sheetRows) {
            const row = pickKnownColumns(sheetName, raw);
            const k = norm(row[keyCol]);
            if (!k) continue;
            sheetKeys.add(k);
            const existing = sqlByKey.get(k);
            if (!existing) {
                toInsert.push(row);
                continue;
            }
            const { changed, n } = diffFields(row, existing, columns, keyCol);
            if (n > 0) toUpdate.push({ key: k, changed, row });
        }

        let sqlOnly = 0;
        for (const k of sqlByKey.keys()) {
            if (!sheetKeys.has(k)) sqlOnly++;
        }

        reports.push({
            sheet: sheetName,
            sheetCount: sheetRows.length,
            sqlCount: sqlRows.length,
            newCount: toInsert.length,
            changedCount: toUpdate.length,
            sqlOnly,
            keyCol
        });

        if (!apply) continue;

        if (typeof db.exec === 'function') {
            try { db.exec('BEGIN'); } catch (_) {}
        }
        let sheetFail = 0;
        for (const row of toInsert) {
            try {
                db.appendToSheet(sheetName, row);
                inserted++;
            } catch (e) {
                sheetFail++;
                failed++;
                if (failed <= 8) {
                    console.warn(`  ✗ insert ${sheetName}/${row[keyCol]}: ${String(e.message).slice(0, 120)}`);
                }
            }
        }
        for (const item of toUpdate) {
            try {
                db.updateRow(sheetName, keyCol, item.key, item.changed);
                updated++;
            } catch (e) {
                sheetFail++;
                failed++;
                if (failed <= 8) {
                    console.warn(`  ✗ update ${sheetName}/${item.key}: ${String(e.message).slice(0, 120)}`);
                }
            }
        }
        if (typeof db.exec === 'function') {
            try { db.exec(sheetFail ? 'ROLLBACK' : 'COMMIT'); } catch (_) {}
        }
        if (sheetFail) {
            inserted -= toInsert.length;
            updated -= toUpdate.length;
            console.warn(`  ⚠️ ${sheetName}: تراجع كتابة الورقة بسبب ${sheetFail} خطأ`);
        }
    }

    if (apply && typeof db.exec === 'function') {
        try { db.exec('PRAGMA wal_checkpoint(FULL);'); } catch (_) {}
    }

    const totals = printReport(reports);
    if (opts.compare) {
        console.log('(compare فقط — لم يُكتَب SQL)');
        return;
    }

    console.log(`✅ كُتب: جديد=${inserted} | محدّث=${updated} | فشل=${failed}`);
    console.log(`ℹ️ صفوف SQL غير موجودة في الشيت تُركت كما هي: ${totals.totOnly}`);

    if (opts.deployBundle) {
        console.log('📦 sync-sql-deploy-bundle ...');
        require('child_process').execFileSync(process.execPath, [
            path.join(__dirname, 'sync-sql-deploy-bundle.js')
        ], { stdio: 'inherit' });
    } else {
        console.log('💡 للنشر: أضف --deploy-bundle');
    }
}

main().catch((err) => {
    console.error('❌', err.message || err);
    process.exit(1);
});
