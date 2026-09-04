/**
 * Vercel Serverless Health Check Endpoint (/api/health)
 */
'use strict';

const { applyRestrictiveCors } = require('../backend-sql/src/allowed-origins');

module.exports = (req, res) => {
    applyRestrictiveCors(req, res);
    let dbEngine = 'unknown';
    let persistent = false;
    try {
        const { getDatabase } = require('../backend-sql/src/db/database');
        const db = getDatabase();
        dbEngine = (db && db.engineType) || 'unknown';
        persistent = dbEngine === 'libsql-turso' || dbEngine === 'oracle' || !!(db && db.persistent);
    } catch (_) {}
    res.status(200).json({
        status: 'ok',
        platform: 'Vercel Serverless',
        service: 'HSE API',
        dbEngine,
        persistent,
        dbType: process.env.DB_TYPE || 'sqlite',
        oracleMirror: process.env.ORACLE_MIRROR === '1' || process.env.ORACLE_MIRROR === 'true',
        oracleWalletB64Len: String(process.env.ORACLE_WALLET_FILES_B64 || '').length,
        oracleUserSet: !!(process.env.ORACLE_USER || '').trim(),
        timestamp: new Date().toISOString()
    });
};