#!/usr/bin/env node
/**
 * مطابقة قاعدة SQL المحلية مع Google Sheets (قراءة مباشرة عبر API)
 *
 * المتطلبات:
 * 1. Service Account JSON + مشاركة الجدول مع client_email (Viewer)
 * 2. npm install (googleapis)
 *
 * الاستخدام:
 *   node scripts/sync-from-google-sheets.mjs --compare
 *   node scripts/sync-from-google-sheets.mjs --sheets PTW,PTWRegistry,ClinicVisits,ClinicContractorVisits
 *   node scripts/sync-from-google-sheets.mjs --all
 *   node scripts/sync-from-google-sheets.mjs --all --deploy-bundle
 *
 * متغيرات البيئة:
 *   GOOGLE_APPLICATION_CREDENTIALS | GOOGLE_SERVICE_ACCOUNT_JSON
 *   HSE_GOOGLE_SPREADSHEET_ID (افتراضي: 1EanavJ2OodOmq8b1GagSj8baa-KF-o4mVme_Jlwmgxc)
 */
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import {
    createSheetsClient,
    listSheetTabs,
    fetchMultipleSheets,
    resolveSpreadsheetId
} from './lib/google-sheets-reader.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const require = createRequire(import.meta.url);

const PRIORITY_SHEETS = [
    'ClinicVisits', 'ClinicContractorVisits', 'PTW', 'PTWRegistry',
    'Employees', 'Users', 'Medications', 'Incidents', 'Training',
    'DailyObservations', 'Violations', 'NearMiss'
];

function parseArgs(argv) {
    const opts = {
        compare: false,
        all: false,
        deployBundle: false,
        dryRun: false,
        sheets: [...PRIORITY_SHEETS]
    };
    for (const arg of argv) {
        if (arg === '--compare') opts.compare = true;
        else if (arg === '--all') opts.all = true;
        else if (arg === '--deploy-bundle') opts.deployBundle = true;
        else if (arg === '--dry-run') opts.dryRun = true;
        else if (arg.startsWith('--sheets=')) {
            opts.sheets = arg.slice('--sheets='.length).split(',').map((s) => s.trim()).filter(Boolean);
        }
    }
    return opts;
}

function countLocalDb(sheetNames) {
    const dbPath = path.join(repoRoot, 'backend-sql/data/clinic_hse.db');
    process.env.SQLITE_PATH = dbPath;
    const dbMod = require(path.join(repoRoot, 'backend-sql/src/db/database'));
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

function printComparison(googleStats, localCounts) {
    console.log('\n══════════════════════════════════════════════════');
    console.log('  مقارنة Google Sheets ↔ SQL المحلي');
    console.log('══════════════════════════════════════════════════');
    console.log('الورقة'.padEnd(28), 'Google', 'SQL', 'Δ');
    console.log('─'.repeat(55));

    const keys = new Set([
        ...Object.keys(googleStats),
        ...Object.keys(localCounts)
    ]);

    for (const sheet of [...keys].sort()) {
        const g = googleStats[sheet];
        if (g?.error) {
            console.log(sheet.padEnd(28), 'ERR', localCounts[sheet] ?? '-', g.error.slice(0, 30));
            continue;
        }
        const googleN = g?.googleRows ?? g?.imported ?? '-';
        const localN = localCounts[sheet] ?? '-';
        let delta = '';
        if (typeof googleN === 'number' && typeof localN === 'number') {
            const d = googleN - localN;
            delta = d === 0 ? '✓' : (d > 0 ? `+${d}` : String(d));
        }
        console.log(String(sheet).padEnd(28), String(googleN).padStart(6), String(localN).padStart(6), delta.padStart(6));
    }

    const cv = (localCounts.ClinicVisits || 0) + (localCounts.ClinicContractorVisits || 0);
    const gCv = (googleStats.ClinicVisits?.googleRows || 0) + (googleStats.ClinicContractorVisits?.googleRows || 0);
    if (typeof cv === 'number' && gCv) {
        console.log('─'.repeat(55));
        console.log('ClinicVisits+Contractor (مجموع)'.padEnd(28),
            String(gCv).padStart(6), String(cv).padStart(6),
            gCv - cv === 0 ? '✓'.padStart(6) : String(gCv - cv).padStart(6));
    }
    console.log('══════════════════════════════════════════════════\n');
}

async function main() {
    const opts = parseArgs(process.argv.slice(2));
    const spreadsheetId = resolveSpreadsheetId();

    console.log('📊 Google Spreadsheet:', spreadsheetId);
    const sheets = await createSheetsClient();
    const tabs = await listSheetTabs(sheets, spreadsheetId);
    console.log(`📑 تبويبات في الجدول: ${tabs.length}`);

    let targetSheets = opts.sheets;
    if (opts.all) {
        const { headersMap } = require(path.join(repoRoot, 'backend-sql/src/db/headers-schema'));
        const known = Object.keys(headersMap);
        targetSheets = known.filter((n) => tabs.includes(n));
        console.log(`🔄 --all: ${targetSheets.length} ورقة معروفة موجودة في Google`);
    } else {
        targetSheets = opts.sheets.filter((n) => {
            if (!tabs.includes(n)) {
                console.warn(`⚠️ تبويب "${n}" غير موجود في Google — تخطي`);
                return false;
            }
            return true;
        });
    }

    if (targetSheets.length === 0) {
        console.error('لا توجد أوراق للمزامنة.');
        process.exit(1);
    }

    console.log(`⬇️  جلب: ${targetSheets.join(', ')}`);
    const { data, stats } = await fetchMultipleSheets(sheets, spreadsheetId, targetSheets);

    const localBefore = countLocalDb(targetSheets);
    printComparison(stats, localBefore);

    if (opts.compare || opts.dryRun) {
        console.log(opts.dryRun ? '(dry-run — لم يُكتَب SQL)' : '(compare فقط — لم يُكتَب SQL)');
        return;
    }

    const { migrateFromData } = require(path.join(repoRoot, 'backend-sql/scripts/migrate-from-sheets'));
    console.log('💾 كتابة إلى backend-sql/data/clinic_hse.db ...');
    await migrateFromData(data);

    const localAfter = countLocalDb(targetSheets);
    console.log('\n✅ بعد الاستيراد:');
    printComparison(stats, localAfter);

    if (opts.deployBundle) {
        console.log('📦 sync-sql-deploy-bundle ...');
        require(path.join(repoRoot, 'backend-sql/scripts/sync-sql-deploy-bundle'));
    } else {
        console.log('💡 للنشر: node scripts/sync-from-google-sheets.mjs --all --deploy-bundle');
    }
}

main().catch((err) => {
    console.error('❌', err.message || err);
    process.exit(1);
});
