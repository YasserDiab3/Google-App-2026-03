/**
 * Automated Database Backup Service
 * يدير النسخ الاحتياطي التلقائي لقاعدة بيانات SQL مع الضغط وتدوير النسخ وحماية الاستقرار
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const config = require('../config/config');

const BACKUP_DIR = path.resolve(__dirname, '..', '..', 'backups');
const MAX_BACKUP_AGE_DAYS = 30;
const MAX_BACKUP_COUNT = 30;

function ensureBackupDir() {
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
}

/**
 * إنشاء نسخة احتياطية فورية ومضغوطة من قاعدة البيانات
 */
function createBackup(dbInstance = null, label = null) {
    try {
        ensureBackupDir();
        const srcDb = config.sqlitePath;
        if (!fs.existsSync(srcDb)) {
            return { success: false, error: 'Database file not found: ' + srcDb };
        }

        // 1. Force WAL checkpoint to flush all pending transactions to main file
        if (dbInstance && typeof dbInstance.exec === 'function') {
            try {
                dbInstance.exec('PRAGMA wal_checkpoint(TRUNCATE);');
            } catch (_) {}
        }

        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        const prefix = label ? `clinic_hse_backup_${label}_` : 'clinic_hse_backup_';
        const backupFileName = `${prefix}${timestamp}.db.gz`;
        const destPath = path.join(BACKUP_DIR, backupFileName);

        // 2. Read and Gzip
        const dbBuffer = fs.readFileSync(srcDb);
        const gzipped = zlib.gzipSync(dbBuffer, { level: 6 });
        fs.writeFileSync(destPath, gzipped);

        const originalSizeMB = (dbBuffer.length / (1024 * 1024)).toFixed(2);
        const compressedSizeMB = (gzipped.length / (1024 * 1024)).toFixed(2);

        console.log(`[Backup Service] ✅ Backup created: ${backupFileName} (${originalSizeMB} MB -> ${compressedSizeMB} MB)`);

        // 3. Clean up older backups
        rotateBackups();

        return {
            success: true,
            fileName: backupFileName,
            path: destPath,
            timestamp: now.toISOString(),
            originalSizeMB,
            compressedSizeMB
        };
    } catch (err) {
        console.error('[Backup Service] ❌ Backup failed:', err);
        return { success: false, error: err.message };
    }
}

/**
 * حذف النسخ الاحتياطية الأقدم من 30 يوماً أو الاحتفاظ بأحدث 30 نسخة كحد أقصى
 */
function rotateBackups() {
    try {
        ensureBackupDir();
        const files = fs.readdirSync(BACKUP_DIR);
        const now = Date.now();
        const maxAgeMs = MAX_BACKUP_AGE_DAYS * 24 * 60 * 60 * 1000;

        const backupFiles = files
            .filter(f => f.startsWith('clinic_hse_backup_') && f.endsWith('.db.gz'))
            .map(f => {
                const filePath = path.join(BACKUP_DIR, f);
                const stats = fs.statSync(filePath);
                return { name: f, path: filePath, mtime: stats.mtimeMs };
            })
            .sort((a, b) => b.mtime - a.mtime); // Newest first

        // Delete files older than MAX_BACKUP_AGE_DAYS
        backupFiles.forEach((item, idx) => {
            const isTooOld = (now - item.mtime) > maxAgeMs;
            const isBeyondMaxCount = idx >= MAX_BACKUP_COUNT;

            if (isTooOld || isBeyondMaxCount) {
                try {
                    fs.unlinkSync(item.path);
                    console.log(`[Backup Service] 🗑️ Cleaned up old backup: ${item.name}`);
                } catch (_) {}
            }
        });
    } catch (err) {
        console.warn('[Backup Service] Backup rotation warning:', err.message);
    }
}

/**
 * قائمة بكافة النسخ الاحتياطية المحفوظة
 */
function listBackups() {
    try {
        ensureBackupDir();
        const files = fs.readdirSync(BACKUP_DIR);
        return files
            .filter(f => f.startsWith('clinic_hse_backup_') && f.endsWith('.db.gz'))
            .map(f => {
                const filePath = path.join(BACKUP_DIR, f);
                const stats = fs.statSync(filePath);
                return {
                    fileName: f,
                    sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
                    createdAt: stats.birthtime.toISOString()
                };
            })
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } catch (_) {
        return [];
    }
}

/**
 * تشغيل المجدول التلقائي كل 24 ساعة مع فحص فوري عند الإقلاع
 */
function startDailyBackupScheduler(dbInstance) {
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    
    // Initial boot backup check (within 3 seconds of server start)
    setTimeout(() => {
        try {
            const backups = listBackups();
            const now = Date.now();
            const hasRecentBackup = backups.length > 0 && (now - new Date(backups[0].createdAt).getTime() < 12 * 60 * 60 * 1000);
            if (!hasRecentBackup) {
                console.log('[Backup Service] 🚀 Creating initial startup backup...');
                createBackup(dbInstance, 'boot');
            } else {
                console.log('[Backup Service] ℹ️ Recent backup exists, skipping boot snapshot.');
            }
        } catch (e) {
            console.warn('[Backup Service] Boot backup warning:', e.message);
        }
    }, 3000);

    setInterval(() => {
        createBackup(dbInstance, 'daily');
    }, TWENTY_FOUR_HOURS);

    console.log('[Backup Service] ⏰ Automated 24-hour backup schedule active (Retention: 30 days).');
}

module.exports = {
    createBackup,
    listBackups,
    rotateBackups,
    startDailyBackupScheduler
};
