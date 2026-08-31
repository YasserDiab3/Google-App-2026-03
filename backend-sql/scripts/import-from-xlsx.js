#!/usr/bin/env node
/**
 * استيراد قاعدة HSE من ملف Excel (.xlsx) مباشرة — بدون Google API
 *
 * الاستخدام:
 *   node backend-sql/scripts/import-from-xlsx.js "C:\path\V.3-HSE Database.xlsx"
 *   node backend-sql/scripts/import-from-xlsx.js --compare "C:\path\file.xlsx"
 *   node backend-sql/scripts/import-from-xlsx.js --sheets=PTW,ClinicVisits "C:\path\file.xlsx"
 *   node backend-sql/scripts/import-from-xlsx.js --all --deploy-bundle "C:\path\file.xlsx"
 */
'use strict';

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { headersMap } = require('../src/db/headers-schema');
const { migrateFromData } = require('./migrate-from-sheets');

const PRIORITY_SHEETS = [
    'ClinicVisits', 'ClinicContractorVisits', 'PTW', 'PTWRegistry',
    'Employees', 'Users', 'Medications', 'Training', 'DailyObservations'
];

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

function countLocalDb(sheetNames) {
    const dbPath = path.join(__dirname, '../data/clinic_hse.db');
    process.env.SQLITE_PATH = dbPath;
    const dbMod = require('../src/db/database');
    dbMod.dbInstance = null;
    const db = dbMod.initDatabase(dbPath);
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
    const names = optsAllSheets(wb, targetSheets);
    const data = {};
    const stats = {};

    for (const name of names) {
        const sheet = wb.Sheets[name];
        if (!sheet) {
            stats[name] = { error: 'تبويب غير موجود' };
            data[name] = [];
            continue;
        }
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });
        data[name] = rows;
        stats[name] = { xlsxRows: rows.length };
    }
    return { data, stats, tabCount: wb.SheetNames.length };
}

function optsAllSheets(wb, targetSheets) {
    return targetSheets;
}

function printComparison(xlsxStats, localCounts) {
    console.log('\n══════════════════════════════════════════════════');
    console.log('  مقارنة Excel ↔ SQL المحلي');
    console.log('══════════════════════════════════════════════════');
    console.log('الورقة'.padEnd(28), 'Excel', 'SQL', 'Δ');
    console.log('─'.repeat(55));

    const keys = new Set([...Object.keys(xlsxStats), ...Object.keys(localCounts)]);
    for (const sheet of [...keys].sort()) {
        const x = xlsxStats[sheet];
        if (x?.error) {
            console.log(sheet.padEnd(28), 'ERR', localCounts[sheet] ?? '-', x.error);
            continue;
        }
        const xN = x?.xlsxRows ?? '-';
        const lN = localCounts[sheet] ?? '-';
        let delta = '';
        if (typeof xN === 'number' && typeof lN === 'number') {
            const d = xN - lN;
            delta = d === 0 ? '✓' : (d > 0 ? `+${d}` : String(d));
        }
        console.log(String(sheet).padEnd(28), String(xN).padStart(6), String(lN).padStart(6), delta.padStart(6));
    }
    console.log('══════════════════════════════════════════════════\n');
}

async function main() {
    const opts = parseArgs(process.argv.slice(2));
    if (!opts.file) {
        console.error('Usage: node import-from-xlsx.js [--compare|--all] [--deploy-bundle] [--sheets=A,B] <file.xlsx>');
        process.exit(1);
    }

    let targetSheets = opts.sheets;
    if (opts.all) {
        const wb = XLSX.readFile(opts.file, { bookSheets: true });
        targetSheets = Object.keys(headersMap).filter((n) => wb.SheetNames.includes(n));
        console.log(`🔄 --all: ${targetSheets.length} ورقة`);
    }

    const localBefore = countLocalDb(targetSheets);
    const { data, stats, tabCount } = readXlsxSheets(opts.file, targetSheets);
    console.log(`📑 تبويبات في الملف: ${tabCount}`);

    printComparison(stats, localBefore);

    if (opts.compare) {
        console.log('(compare فقط — لم يُكتَب SQL)');
        return;
    }

    console.log('💾 كتابة إلى backend-sql/data/clinic_hse.db ...');
    await migrateFromData(data);

    const localAfter = countLocalDb(targetSheets);
    console.log('\n✅ بعد الاستيراد:');
    printComparison(stats, localAfter);

    if (opts.deployBundle) {
        console.log('📦 sync-sql-deploy-bundle ...');
        const bundlePath = path.join(__dirname, 'sync-sql-deploy-bundle.js');
        require('child_process').execFileSync(process.execPath, [bundlePath], { stdio: 'inherit' });
    } else {
        console.log('💡 للنشر: أضف --deploy-bundle');
    }
}

main().catch((err) => {
    console.error('❌', err.message || err);
    process.exit(1);
});
