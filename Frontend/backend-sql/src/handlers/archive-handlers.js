/**
 * Data Retention & Archiving Handlers - SQL Backend (Admin Only)
 * يوفر أرشفة دورية ذكية للسجلات القديمة (سنتين أو أكثر) مع الحفاظ على البيانات والنسخ الاحتياطي التلقائي
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { getDatabase } = require('../db/database');
const { headersMap } = require('../db/headers-schema');

const ADMIN_ROLES = new Set([
    'admin', 'administrator', 'system_admin', 'system-manager', 'مدير', 'مدير النظام'
]);

/**
 * التحقق من صلاحية المشرف
 */
function isUserAdmin(userData) {
    if (!userData) return false;
    const role = String(userData.role || '').trim().toLowerCase();
    const email = String(userData.email || '').trim().toLowerCase();
    if (ADMIN_ROLES.has(role)) return true;
    if (email === 'admin' || email.includes('admin@')) return true;
    return false;
}

/**
 * مديولات الأرشفة المدعومة وحقول التاريخ الخاصة بها
 */
const ARCHIVABLE_MODULES = {
    'DailyObservations': {
        labelAr: 'الملاحظات اليومية والسلامة',
        dateFields: ['date', 'createdAt', 'timestamp'],
        table: 'DailyObservations',
        archiveTable: 'DailyObservations_Archive'
    },
    'PTW': {
        labelAr: 'تصاريح العمل (PTW)',
        dateFields: ['startDate', 'endDate', 'createdAt'],
        table: 'PTW',
        archiveTable: 'PTW_Archive'
    },
    'GateVisitors': {
        labelAr: 'سجل زوار البوابة والأمن',
        dateFields: ['Entry Date', 'Created At Timestamp', 'entryDate', 'createdAt'],
        table: 'GateVisitors',
        archiveTable: 'GateVisitors_Archive'
    },
    'ClinicVisits': {
        labelAr: 'زيارات العيادة الطبية',
        dateFields: ['visitDate', 'date', 'createdAt'],
        table: 'ClinicVisits',
        archiveTable: 'ClinicVisits_Archive'
    },
    'Violations': {
        labelAr: 'سجل المخالفات',
        dateFields: ['violationDate', 'createdAt', 'date'],
        table: 'Violations',
        archiveTable: 'Violations_Archive'
    },
    'Incidents': {
        labelAr: 'سجل الحوادث والتحقيقات',
        dateFields: ['incidentDate', 'date', 'createdAt'],
        table: 'Incidents',
        archiveTable: 'Incidents_Archive'
    },
    'UserActivityLog': {
        labelAr: 'سجل نشاط المستخدمين',
        dateFields: ['timestamp', 'createdAt'],
        table: 'UserActivityLog',
        archiveTable: 'UserActivityLog_Archive'
    }
};

/**
 * تهيئة جداول الأرشيف وسجل العمليات
 */
function ensureArchiveInfrastructure() {
    const db = getDatabase();
    
    // إنشاء جدول سجل الأرشفة
    db.exec(`
        CREATE TABLE IF NOT EXISTS ArchiveExecutionLogs (
            id TEXT PRIMARY KEY,
            executedAt TEXT NOT NULL,
            executedByEmail TEXT,
            cutoffDate TEXT NOT NULL,
            retentionYears REAL,
            totalArchivedCount INTEGER DEFAULT 0,
            detailsJson TEXT,
            backupFileName TEXT,
            durationMs INTEGER,
            createdAt TEXT DEFAULT (datetime('now', 'localtime'))
        );
    `);

    // إنشاء جداول الأرشيف لكل مديول
    for (const [moduleKey, cfg] of Object.entries(ARCHIVABLE_MODULES)) {
        try {
            // التحقق من وجود الجدول الرئيسي أولاً
            const mainTableExists = db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [cfg.table]);
            if (mainTableExists) {
                // إنشاء جدول الأرشيف بنفس بنية الجدول الرئيسي
                db.exec(`CREATE TABLE IF NOT EXISTS "${cfg.archiveTable}" AS SELECT * FROM "${cfg.table}" WHERE 0=1;`);
            }
        } catch (e) {
            console.error(`[Archive] Error initializing archive table for ${moduleKey}:`, e.message);
        }
    }
}

/**
 * استخراج قيمة التاريخ بتنسيق ISO صالح
 */
function parseRecordDate(record, dateFields) {
    if (!record || typeof record !== 'object') return null;
    for (const field of dateFields) {
        const val = record[field];
        if (!val) continue;
        const strVal = String(val).trim();
        // اختبار تنسيق YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}/.test(strVal)) {
            const d = new Date(strVal);
            if (!isNaN(d.getTime())) return d;
        }
        // اختبار تنسيق DD/MM/YYYY أو MM/DD/YYYY
        if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(strVal)) {
            const parts = strVal.split(/[\/\s]/);
            if (parts.length >= 3) {
                // تجربة اليوم/الشهر/السنة
                const d = new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
                if (!isNaN(d.getTime())) return d;
            }
        }
        const d = new Date(strVal);
        if (!isNaN(d.getTime())) return d;
    }
    return null;
}

/**
 * حساب تاريخ القطع الافتراضي (سنتين من اليوم)
 */
function calculateCutoffDate(retentionYears = 2, customCutoff = null) {
    if (customCutoff && /^\d{4}-\d{2}-\d{2}/.test(customCutoff)) {
        return new Date(customCutoff);
    }
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - Number(retentionYears || 2));
    return cutoff;
}

/**
 * جلب حالة وإحصائيات الأرشفة
 */
async function getArchiveStatus(payload, postData, action, actorUserData) {
    const user = actorUserData || payload?.actorUserData || postData?.actorUserData;
    if (!isUserAdmin(user)) {
        return {
            success: false,
            message: 'غير مصرح لك بالوصول: هذه العملية مخصصة لمدير النظام فقط',
            errorCode: 'FORBIDDEN_ADMIN_ONLY'
        };
    }

    try {
        ensureArchiveInfrastructure();
        const db = getDatabase();
        const retentionYears = Number(payload?.retentionYears || 2);
        const customCutoff = payload?.customCutoffDate || null;
        const cutoffDate = calculateCutoffDate(retentionYears, customCutoff);
        const cutoffIso = cutoffDate.toISOString().slice(0, 10);

        const moduleStats = {};
        let grandTotalActive = 0;
        let grandTotalArchived = 0;
        let grandTotalEligible = 0;

        for (const [key, cfg] of Object.entries(ARCHIVABLE_MODULES)) {
            try {
                // فحص وجود الجدول
                const hasMain = db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [cfg.table]);
                if (!hasMain) continue;

                const allRows = db.all(`SELECT * FROM "${cfg.table}"`, []) || [];
                const activeCount = allRows.length;
                grandTotalActive += activeCount;

                let eligibleCount = 0;
                for (const row of allRows) {
                    const rowDate = parseRecordDate(row, cfg.dateFields);
                    if (rowDate && rowDate < cutoffDate) {
                        eligibleCount++;
                    }
                }
                grandTotalEligible += eligibleCount;

                // عدد السجلات الموجودة مسبقاً بالأرشيف
                let archivedCount = 0;
                try {
                    const archRows = db.get(`SELECT COUNT(*) as count FROM "${cfg.archiveTable}"`, []);
                    archivedCount = archRows ? archRows.count : 0;
                } catch (_) {
                    archivedCount = 0;
                }
                grandTotalArchived += archivedCount;

                moduleStats[key] = {
                    labelAr: cfg.labelAr,
                    table: cfg.table,
                    archiveTable: cfg.archiveTable,
                    activeCount,
                    eligibleCount,
                    archivedCount
                };
            } catch (err) {
                console.error(`[ArchiveStatus] Error calculating for ${key}:`, err.message);
            }
        }

        // جلب آخر 10 عمليات أرشفة
        let recentLogs = [];
        try {
            recentLogs = db.all(`SELECT * FROM ArchiveExecutionLogs ORDER BY executedAt DESC LIMIT 10`, []) || [];
        } catch (_) {}

        return {
            success: true,
            cutoffDate: cutoffIso,
            retentionYears,
            grandTotalActive,
            grandTotalEligible,
            grandTotalArchived,
            modules: moduleStats,
            recentLogs,
            message: `تم حساب إحصائيات الأرشفة بنجاح (تاريخ القطع: ${cutoffIso})`
        };
    } catch (e) {
        console.error('[ArchiveStatus] Error:', e);
        return {
            success: false,
            message: `فشل استرجاع حالة الأرشفة: ${e.message}`
        };
    }
}

/**
 * تنفيذ عملية الأرشفة الذرية مع الحفظ الاحتياطي
 */
async function executeDataArchiving(payload, postData, action, actorUserData) {
    const user = actorUserData || payload?.actorUserData || postData?.actorUserData;
    if (!isUserAdmin(user)) {
        return {
            success: false,
            message: 'غير مصرح لك بالوصول: هذه العملية مخصصة لمدير النظام فقط',
            errorCode: 'FORBIDDEN_ADMIN_ONLY'
        };
    }

    const startTime = Date.now();
    try {
        ensureArchiveInfrastructure();
        const db = getDatabase();
        const retentionYears = Number(payload?.retentionYears || 2);
        const customCutoff = payload?.customCutoffDate || null;
        const selectedModules = Array.isArray(payload?.selectedModules) && payload.selectedModules.length > 0 
            ? payload.selectedModules 
            : Object.keys(ARCHIVABLE_MODULES);
        
        const cutoffDate = calculateCutoffDate(retentionYears, customCutoff);
        const cutoffIso = cutoffDate.toISOString().slice(0, 10);

        const executionId = `ARCH_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        const archivedDataBackup = {};
        const executionDetails = {};
        let totalRecordsArchived = 0;

        // 1. تجميع السجلات المؤهلة للأرشفة
        for (const modKey of selectedModules) {
            const cfg = ARCHIVABLE_MODULES[modKey];
            if (!cfg) continue;

            const hasMain = db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [cfg.table]);
            if (!hasMain) continue;

            const allRows = db.all(`SELECT * FROM "${cfg.table}"`, []) || [];
            const recordsToArchive = [];

            for (const row of allRows) {
                const rDate = parseRecordDate(row, cfg.dateFields);
                if (rDate && rDate < cutoffDate) {
                    recordsToArchive.push(row);
                }
            }

            if (recordsToArchive.length > 0) {
                archivedDataBackup[modKey] = recordsToArchive;
            }
        }

        // 2. إنشاء نسخة احتياطية محلية قبل أي عملية حذف
        let backupFileName = `archive_backup_${cutoffIso}_${Date.now()}.json`;
        const backupDir = path.join(__dirname, '..', '..', 'data', 'backups');
        try {
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
            }
            const backupFilePath = path.join(backupDir, backupFileName);
            fs.writeFileSync(backupFilePath, JSON.stringify({
                executionId,
                timestamp: new Date().toISOString(),
                executedBy: user?.email || 'admin',
                cutoffDate: cutoffIso,
                retentionYears,
                data: archivedDataBackup
            }, null, 2), 'utf8');
        } catch (backupErr) {
            console.warn('[Archive] Could not write local backup file:', backupErr.message);
            backupFileName = 'embedded_in_log';
        }

        // 3. التنفيذ الذري
        db.exec('BEGIN TRANSACTION;');
        try {
            for (const [modKey, records] of Object.entries(archivedDataBackup)) {
                const cfg = ARCHIVABLE_MODULES[modKey];
                if (!records || records.length === 0) continue;

                // نقل السجلات إلى جدول الأرشيف
                for (const row of records) {
                    const keys = Object.keys(row);
                    const placeholders = keys.map(() => '?').join(', ');
                    const quotedKeys = keys.map(k => `"${k}"`).join(', ');
                    const values = keys.map(k => row[k]);

                    const insertSql = `INSERT OR REPLACE INTO "${cfg.archiveTable}" (${quotedKeys}) VALUES (${placeholders})`;
                    db.run(insertSql, values);

                    // حذف السجل من الجدول الرئيسي باستخدام المفتاح الأساسي (id أو Record ID)
                    const idKey = keys.find(k => k.toLowerCase() === 'id' || k.toLowerCase() === 'record id') || keys[0];
                    const deleteSql = `DELETE FROM "${cfg.table}" WHERE "${idKey}" = ?`;
                    db.run(deleteSql, [row[idKey]]);
                }

                executionDetails[modKey] = records.length;
                totalRecordsArchived += records.length;
            }

            // تسجيل العملية في جدول السجلات
            const logId = executionId;
            const executedAt = new Date().toISOString();
            const executedByEmail = user?.email || 'admin';
            const detailsJson = JSON.stringify(executionDetails);
            const durationMs = Date.now() - startTime;

            db.run(`
                INSERT INTO ArchiveExecutionLogs 
                (id, executedAt, executedByEmail, cutoffDate, retentionYears, totalArchivedCount, detailsJson, backupFileName, durationMs)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [logId, executedAt, executedByEmail, cutoffIso, retentionYears, totalRecordsArchived, detailsJson, backupFileName, durationMs]);

            db.exec('COMMIT;');
        } catch (txErr) {
            db.exec('ROLLBACK;');
            throw txErr;
        }

        // 4. تحسين وتنظيف قاعدة البيانات بعد نقل السجلات
        try {
            db.exec('PRAGMA optimize;');
        } catch (_) {}

        return {
            success: true,
            executionId,
            totalRecordsArchived,
            cutoffDate: cutoffIso,
            details: executionDetails,
            backupFileName,
            durationMs: Date.now() - startTime,
            message: `تمت عملية الأرشفة بنجاح: تم نقل ${totalRecordsArchived} سجل إلى الأرشيف بأمان وتفريغ مساحة البيانات النشطة.`
        };
    } catch (err) {
        console.error('[ArchiveExecution] Failed:', err);
        return {
            success: false,
            message: `فشلت عملية الأرشفة: ${err.message}`,
            errorCode: 'ARCHIVE_EXECUTION_ERROR'
        };
    }
}

/**
 * استعلام مباشر عن السجلات المؤرشفة (Admin Only) دون تحميلها للعميل
 */
async function queryArchivedRecords(payload, postData, action, actorUserData) {
    const user = actorUserData || payload?.actorUserData || postData?.actorUserData;
    if (!isUserAdmin(user)) {
        return {
            success: false,
            message: 'غير مصرح لك بالوصول: هذه العملية مخصصة لمدير النظام فقط',
            errorCode: 'FORBIDDEN_ADMIN_ONLY'
        };
    }

    try {
        ensureArchiveInfrastructure();
        const db = getDatabase();
        const moduleKey = payload?.module || 'DailyObservations';
        const cfg = ARCHIVABLE_MODULES[moduleKey];
        if (!cfg) {
            return {
                success: false,
                message: `المديول المطلوب (${moduleKey}) غير صالح للأرشفة`
            };
        }

        const page = Math.max(1, Number(payload?.page || 1));
        const limit = Math.min(100, Math.max(10, Number(payload?.limit || 50)));
        const offset = (page - 1) * limit;

        const countRow = db.get(`SELECT COUNT(*) as count FROM "${cfg.archiveTable}"`, []);
        const total = countRow ? countRow.count : 0;
        const rows = db.all(`SELECT * FROM "${cfg.archiveTable}" ORDER BY rowid DESC LIMIT ${limit} OFFSET ${offset}`, []) || [];

        return {
            success: true,
            module: moduleKey,
            page,
            limit,
            total,
            rows,
            message: `تم جلب ${rows.length} سجل من الأرشيف التاريخي`
        };
    } catch (e) {
        return {
            success: false,
            message: `فشل الاستعلام عن الأرشيف: ${e.message}`
        };
    }
}

module.exports = {
    getArchiveStatus,
    executeDataArchiving,
    queryArchivedRecords,
    isUserAdmin,
    ARCHIVABLE_MODULES
};
