#!/usr/bin/env node
/**
 * ترحيل قاعدة SQLite الحالية إلى Turso (libSQL) لمرة واحدة.
 *
 * المتطلبات (متغيرات بيئة):
 *   TURSO_DATABASE_URL = libsql://<db>-<org>.turso.io
 *   TURSO_AUTH_TOKEN   = <token>
 *
 * المصدر الافتراضي: backend-sql/data/clinic_hse.db (أو SOURCE_SQLITE_PATH).
 *
 * الاستخدام:
 *   TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node backend-sql/scripts/migrate-to-turso.js
 *   (على ويندوز PowerShell: استخدم $env:TURSO_DATABASE_URL=... ثم شغّل)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const config = require('../src/config/config');
const { headersMap } = require('../src/db/headers-schema');

function fail(msg) {
    console.error('❌ ' + msg);
    process.exit(1);
}

if (!config.turso || !config.turso.enabled) {
    fail('اضبط TURSO_DATABASE_URL و TURSO_AUTH_TOKEN أولاً.');
}

// --- تحديد ملف المصدر (SQLite الحالي) وفك الضغط إن لزم ---
let sourcePath = process.env.SOURCE_SQLITE_PATH
    || path.join(__dirname, '..', 'data', 'clinic_hse.db');

if (!fs.existsSync(sourcePath) || fs.statSync(sourcePath).size === 0) {
    const gz = sourcePath + '.gz';
    if (fs.existsSync(gz)) {
        try {
            fs.writeFileSync(sourcePath, zlib.gunzipSync(fs.readFileSync(gz)));
            console.log('ℹ️ تم فك ضغط قاعدة المصدر من .gz');
        } catch (e) {
            fail('تعذّر فك ضغط قاعدة المصدر: ' + e.message);
        }
    } else {
        fail('لم يُعثر على قاعدة المصدر: ' + sourcePath);
    }
}

// --- فتح المصدر (قراءة فقط) بمحرك SQLite محلي ---
function openSource(p) {
    try {
        const { DatabaseSync } = require('node:sqlite');
        return { db: new DatabaseSync(p), engine: 'node:sqlite' };
    } catch (_) {}
    try {
        const Better = require('better-sqlite3');
        return { db: new Better(p, { readonly: true }), engine: 'better-sqlite3' };
    } catch (_) {}
    fail('لا يوجد محرك SQLite لقراءة المصدر (node:sqlite أو better-sqlite3).');
}

function readAll(src, table) {
    const sql = `SELECT * FROM "${table}"`;
    try {
        const stmt = src.db.prepare(sql);
        return stmt.all();
    } catch (e) {
        if (String(e.message || '').includes('no such table')) return [];
        throw e;
    }
}

async function main() {
    console.log('====================================================');
    console.log('🚚 ترحيل SQLite → Turso');
    console.log('  المصدر : ' + sourcePath);
    console.log('  الهدف  : ' + config.turso.url);
    console.log('====================================================');

    const src = openSource(sourcePath);
    console.log('  محرك المصدر: ' + src.engine);

    // الهدف: نفس طبقة قاعدة البيانات (تكتشف Turso تلقائياً من config)
    const { initDatabase } = require('../src/db/database');
    const { initSchema } = require('../src/db/schema-init');
    const dest = initDatabase();
    if (dest.engineType !== 'libsql-turso') {
        fail('لم يُفعَّل محرك Turso (engineType=' + dest.engineType + '). تحقّق من تثبيت libsql وصحة البيانات.');
    }
    console.log('  محرك الهدف: ' + dest.engineType);

    console.log('🧱 إنشاء المخطط على Turso...');
    initSchema(dest);

    let totalSheets = 0;
    let totalRows = 0;
    let emptied = 0;
    const failedSheets = [];

    for (const sheetName of Object.keys(headersMap)) {
        let rows;
        try {
            rows = readAll(src, sheetName);
        } catch (e) {
            failedSheets.push({ sheet: sheetName, error: e.message });
            console.error(`  ❌ [${sheetName}] قراءة المصدر: ${e.message}`);
            continue;
        }
        try {
            if (!rows || rows.length === 0) {
                // إفراغ الجدول على الهدف ليطابق المصدر تماماً
                try { dest.exec(`DELETE FROM "${sheetName}"`); dest.syncNow(); } catch (_) {}
                emptied++;
                console.log(`  ○ [${sheetName}]: فارغ`);
                continue;
            }
            const n = dest.saveToSheet(sheetName, rows); // DELETE + INSERT + sync
            totalSheets++;
            totalRows += n;
            console.log(`  ✓ [${sheetName}]: ${n} صف`);
        } catch (e) {
            failedSheets.push({ sheet: sheetName, error: e.message });
            console.error(`  ❌ [${sheetName}] كتابة الهدف: ${e.message}`);
        }
    }

    // دفع نهائي مؤكد
    try { if (typeof dest.syncNow === 'function') dest.syncNow(); } catch (_) {}

    console.log('====================================================');
    console.log(`✅ اكتمل: ${totalSheets} ورقة بمعطيات (${totalRows} صف)، ${emptied} ورقة فارغة.`);
    if (failedSheets.length) {
        console.log(`⚠️ فشل ${failedSheets.length} ورقة:`);
        failedSheets.forEach((f) => console.log(`   - ${f.sheet}: ${f.error}`));
        process.exit(2);
    }
    console.log('====================================================');
}

main().catch((e) => fail(e && e.stack ? e.stack : String(e)));
