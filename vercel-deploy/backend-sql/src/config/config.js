/**
 * Backend SQL Configuration
 */
'use strict';

const path = require('path');
const fs = require('fs');
try { require('dotenv').config(); } catch (_e) { /* serverless: dotenv optional */ }

const ROOT_DIR = path.resolve(__dirname, '../..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const onVercel = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const sqlitePath = process.env.SQLITE_PATH
    || (onVercel ? path.join('/tmp', 'clinic_hse.db') : path.join(DATA_DIR, 'clinic_hse.db'));

if (!onVercel && !fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Turso / libSQL (embedded replica) — قاعدة دائمة تحل محل SQLite المؤقت على Vercel (/tmp).
// عند ضبط المتغيرين تُفعَّل تلقائياً؛ وإلا يبقى المحرك node:sqlite/better-sqlite3 كما هو.
const tursoUrl = (process.env.TURSO_DATABASE_URL || process.env.LIBSQL_URL || '').trim();
const tursoAuthToken = (process.env.TURSO_AUTH_TOKEN || process.env.LIBSQL_AUTH_TOKEN || '').trim();

module.exports = {
    port: parseInt(process.env.PORT || '3001', 10),
    host: process.env.HOST || '0.0.0.0',
    dbType: process.env.DB_TYPE || 'sqlite', // 'sqlite' or 'postgres'
    sqlitePath,
    databaseUrl: process.env.DATABASE_URL || '',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    sessionSecret: process.env.SESSION_SECRET || 'hse_secure_local_dev_secret_2026',
    blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN || '',
    // Turso (libSQL) — قاعدة دائمة اختيارية
    turso: {
        enabled: !!(tursoUrl && tursoAuthToken),
        url: tursoUrl,
        authToken: tursoAuthToken,
        // مسار النسخة المحلية للمُطابقة (embedded replica). على Vercel /tmp، محلياً data/.
        replicaPath: process.env.TURSO_REPLICA_PATH
            || (onVercel ? path.join('/tmp', 'clinic_hse_replica.db') : path.join(DATA_DIR, 'clinic_hse_replica.db')),
        // فترة إعادة المزامنة التلقائية للقراءة (ms). 0 = لا مزامنة دورية (نزامن يدوياً بعد الكتابة).
        syncIntervalMs: parseInt(process.env.TURSO_SYNC_INTERVAL_MS || '0', 10)
    },
    buildTag: 'HSE_SQL_BACKEND_v1.1.0'
};
