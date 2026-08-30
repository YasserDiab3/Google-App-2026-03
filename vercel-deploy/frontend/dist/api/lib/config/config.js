/**
 * Backend SQL Configuration - Serverless & Standalone Ready
 */
'use strict';

const path = require('path');
const fs = require('fs');

try {
    require('dotenv').config();
} catch (_) {}

const isVercel = !!process.env.VERCEL;
const ROOT_DIR = isVercel ? '/tmp' : path.resolve(__dirname, '../..');
const DATA_DIR = path.join(ROOT_DIR, 'data');

if (!fs.existsSync(DATA_DIR)) {
    try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (_) {}
}

const targetDbPath = path.join(DATA_DIR, 'clinic_hse.db');

// Seed from bundled pre-populated database if running on Vercel
if (isVercel) {
    const candidatePaths = [
        path.resolve(__dirname, '../data/clinic_hse.db'),
        path.resolve(__dirname, '../../data/clinic_hse.db'),
        path.resolve(__dirname, 'data/clinic_hse.db')
    ];
    for (const cand of candidatePaths) {
        if (fs.existsSync(cand)) {
            try {
                if (!fs.existsSync(targetDbPath) || fs.statSync(targetDbPath).size < fs.statSync(cand).size) {
                    fs.copyFileSync(cand, targetDbPath);
                }
                break;
            } catch (_) {}
        }
    }
}

module.exports = {
    port: parseInt(process.env.PORT || '3001', 10),
    host: process.env.HOST || '0.0.0.0',
    dbType: process.env.DB_TYPE || 'sqlite',
    sqlitePath: process.env.SQLITE_PATH || targetDbPath,
    databaseUrl: process.env.DATABASE_URL || '',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    sessionSecret: process.env.SESSION_SECRET || 'hse_secure_local_dev_secret_2026',
    buildTag: 'HSE_SQL_BACKEND_v1.0.0'
};
