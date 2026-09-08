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

module.exports = {
    port: parseInt(process.env.PORT || '3001', 10),
    host: process.env.HOST || '0.0.0.0',
    dbType: process.env.DB_TYPE || 'sqlite', // 'sqlite' or 'postgres'
    sqlitePath,
    databaseUrl: process.env.DATABASE_URL || '',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    sessionSecret: process.env.SESSION_SECRET || 'hse_secure_local_dev_secret_2026',
    blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN || '',
    buildTag: 'HSE_SQL_BACKEND_v1.0.0'
};
