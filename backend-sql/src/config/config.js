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

const oracleUser = (process.env.ORACLE_USER || '').trim();
const oraclePassword = (process.env.ORACLE_PASSWORD || '').trim();
const oracleConnectString = (process.env.ORACLE_CONNECT_STRING || process.env.DATABASE_URL || '').trim();
const oracleWalletDir = (process.env.ORACLE_WALLET_DIR || process.env.TNS_ADMIN || '').trim();
const oracleWalletPassword = (process.env.ORACLE_WALLET_PASSWORD || '').trim();
const dbTypeRaw = (process.env.DB_TYPE || 'sqlite').trim().toLowerCase();
const oracleEnabled = dbTypeRaw === 'oracle';

module.exports = {
    port: parseInt(process.env.PORT || '3001', 10),
    host: process.env.HOST || '0.0.0.0',
    dbType: oracleEnabled ? 'oracle' : (dbTypeRaw || 'sqlite'),
    sqlitePath,
    databaseUrl: process.env.DATABASE_URL || '',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    sessionSecret: process.env.SESSION_SECRET || 'hse_secure_local_dev_secret_2026',
    blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN || '',
    // Turso (libSQL) — قاعدة دائمة اختيارية
    turso: {
        enabled: !oracleEnabled && !!(tursoUrl && tursoAuthToken),
        url: tursoUrl,
        authToken: tursoAuthToken,
        // مسار النسخة المحلية للمُطابقة (embedded replica). على Vercel /tmp، محلياً data/.
        replicaPath: process.env.TURSO_REPLICA_PATH
            || (onVercel ? path.join('/tmp', 'clinic_hse_replica.db') : path.join(DATA_DIR, 'clinic_hse_replica.db')),
        // فترة إعادة المزامنة التلقائية للقراءة (ms). 0 = لا مزامنة دورية (نزامن يدوياً بعد الكتابة).
        syncIntervalMs: parseInt(process.env.TURSO_SYNC_INTERVAL_MS || '0', 10)
    },
    // Oracle Autonomous DB — يُفعَّل فقط بـ DB_TYPE=oracle + بيانات الاتصال
    oracle: {
        enabled: oracleEnabled,
        user: oracleUser,
        password: oraclePassword,
        connectString: oracleConnectString,
        walletLocation: oracleWalletDir || '',
        walletPassword: oracleWalletPassword || '',
        poolMax: parseInt(process.env.ORACLE_POOL_MAX || '4', 10)
    },
    buildTag: 'HSE_SQL_BACKEND_v1.2.0-oracle'
};
