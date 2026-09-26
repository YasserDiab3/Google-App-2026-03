/**
 * Vercel Serverless Health Check Endpoint (/api/health)
 */
'use strict';

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let dbEngine = 'unknown';
    let persistent = false;
    try {
        const { getDatabase } = require('../backend-sql/src/db/database');
        const db = getDatabase();
        dbEngine = (db && db.engineType) || 'unknown';
        persistent = dbEngine === 'libsql-turso';
    } catch (_) {}
    res.status(200).json({
        status: 'ok',
        platform: 'Vercel Serverless',
        service: 'HSE API',
        dbEngine,
        persistent,
        timestamp: new Date().toISOString()
    });
};
