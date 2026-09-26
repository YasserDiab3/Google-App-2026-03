/**
 * سكريبت تنظيف وإزالة تكرار الملاحظات اليومية
 * يدمج السجلات المتطابقة (نفس المراقب + نفس الموقع والمكان + نفس التفاصيل + نفس التاريخ)
 * ويحتفظ بأفضل سجل ويحذف السجلات الزائدة.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { getDatabase } = require('../backend-sql/src/db/database');

function normalizeStr(str) {
    if (!str) return '';
    return String(str)
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .toLowerCase();
}

function normalizeDate(d) {
    if (!d) return '';
    const s = String(d).trim().replace('T', ' ');
    return s.slice(0, 10);
}

function deduplicateObservations() {
    console.log('=== بدء عملية تنظيف الملاحظات اليومية المكررة ===');
    const db = getDatabase();
    const rows = db.readSheet('DailyObservations') || [];
    console.log(`إجمالي السجلات الحالية: ${rows.length}`);

    // تجميع السجلات
    const groups = new Map();
    for (const row of rows) {
        const obs = normalizeStr(row.observerName);
        const site = normalizeStr(row.siteName || row.siteId);
        const loc = normalizeStr(row.locationName || row.placeId);
        const details = normalizeStr(row.details);
        const date = normalizeDate(row.date || row.createdAt);

        // مفتاح التكرار: المراقب + الموقع + المكان + التفاصيل + التاريخ
        const key = `${obs}|||${site}|||${loc}|||${details}|||${date}`;
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(row);
    }

    const cleanRows = [];
    let duplicateGroupsCount = 0;
    let removedRowsCount = 0;

    for (const [key, list] of groups.entries()) {
        if (list.length === 1) {
            cleanRows.push(list[0]);
            continue;
        }

        duplicateGroupsCount++;
        removedRowsCount += (list.length - 1);

        // اختيار أفضل سجل من بين المكررات:
        // 1. أولوية للحالة المتقدمة (مغلق / Approved / تم التنفيذ)
        // 2. أولوية للسجل الذي يحتوي على مرفقات أو timeLog أو تحديثات
        // 3. أولوية للأقدم تاريخاً/أصغر رقم ID
        list.sort((a, b) => {
            const scoreA = getRecordQualityScore(a);
            const scoreB = getRecordQualityScore(b);
            if (scoreB !== scoreA) return scoreB - scoreA;
            return String(a.id || '').localeCompare(String(b.id || ''));
        });

        const primary = { ...list[0] };

        // دمج المرفقات وسجلات الوقت من باقي النسخ في السجل الأساسي إذا كانت ناقصة
        for (let i = 1; i < list.length; i++) {
            const extra = list[i];
            if (!primary.attachments && extra.attachments) {
                primary.attachments = extra.attachments;
            }
            if (!primary.timeLog && extra.timeLog) {
                primary.timeLog = extra.timeLog;
            }
            if (!primary.updates && extra.updates) {
                primary.updates = extra.updates;
            }
            if (!primary.comments && extra.comments) {
                primary.comments = extra.comments;
            }
            if (!primary.afterExecutionImages && extra.afterExecutionImages) {
                primary.afterExecutionImages = extra.afterExecutionImages;
            }
            if (primary.status === 'Open' && extra.status && extra.status !== 'Open') {
                primary.status = extra.status;
            }
        }

        cleanRows.push(primary);
    }

    console.log(`عدد مجموعات التكرار التي تم رصدها: ${duplicateGroupsCount}`);
    console.log(`عدد السجلات الزائدة التي سيتم حذفها: ${removedRowsCount}`);
    console.log(`إجمالي السجلات الصافية بعد التنظيف: ${cleanRows.length}`);

    // كتابة السجلات الصافية في قاعدة البيانات
    db.saveToSheet('DailyObservations', cleanRows);
    console.log('✅ تم حفظ السجلات النظيفة في قاعدة SQLite بنجاح.');

    // ضغط قاعدة البيانات وتحديث نسخها
    updateDatabaseReplicasAndGz();
}

function getRecordQualityScore(row) {
    let score = 0;
    const status = String(row.status || '').toLowerCase();
    if (status.includes('مغلق') || status === 'closed' || status.includes('معتمد')) score += 50;
    if (row.attachments && String(row.attachments).trim().length > 10) score += 30;
    if (row.afterExecutionImages && String(row.afterExecutionImages).trim().length > 10) score += 20;
    if (row.timeLog && String(row.timeLog).trim().length > 10) score += 20;
    if (row.updates && String(row.updates).trim().length > 5) score += 10;
    if (row.comments && String(row.comments).trim().length > 5) score += 10;
    if (row.workflowStage && row.workflowStage !== 'pending_specialist') score += 15;
    return score;
}

function updateDatabaseReplicasAndGz() {
    const rootDir = path.resolve(__dirname, '..');
    const masterDb = path.join(rootDir, 'backend-sql', 'data', 'clinic_hse.db');
    if (!fs.existsSync(masterDb)) return;

    const dbBuf = fs.readFileSync(masterDb);
    const gzBuf = zlib.gzipSync(dbBuf);

    // قائمة المسارات التي يجب نسخ قاعدة البيانات إليها
    const targetDbDirs = [
        path.join(rootDir, 'backend-sql', 'data'),
        path.join(rootDir, 'Frontend', 'backend-sql', 'data'),
        path.join(rootDir, 'Frontend', 'data', 'sql'),
        path.join(rootDir, 'Frontend', 'dist', 'data', 'sql'),
        path.join(rootDir, 'data', 'sql'),
        path.join(rootDir, 'dist', 'data', 'sql'),
        path.join(rootDir, 'vercel-deploy', 'backend-sql', 'data'),
        path.join(rootDir, 'vercel-deploy', 'data', 'sql'),
        path.join(rootDir, 'vercel-deploy', 'dist', 'data', 'sql'),
        path.join(rootDir, 'vercel-deploy', 'frontend', 'backend-sql', 'data'),
        path.join(rootDir, 'vercel-deploy', 'frontend', 'data', 'sql'),
        path.join(rootDir, 'vercel-deploy', 'frontend', 'dist', 'data', 'sql')
    ];

    for (const dir of targetDbDirs) {
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(path.join(dir, 'clinic_hse.db'), dbBuf);
            fs.writeFileSync(path.join(dir, 'clinic_hse.db.gz'), gzBuf);
        } catch (e) {
            // ignore non-existing optional dirs
        }
    }
    console.log('✅ تم تحديث وضغط جميع نسخ قاعدة البيانات clinic_hse.db و clinic_hse.db.gz');
}

deduplicateObservations();
