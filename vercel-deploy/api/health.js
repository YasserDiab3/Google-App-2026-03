/**
 * Vercel Serverless Health — proxies to OCI when OCI_API_UPSTREAM is set.
 */
'use strict';

const { applyRestrictiveCors } = require('../backend-sql/src/allowed-origins');

function getUpstreamBase() {
    const raw = String(process.env.OCI_API_UPSTREAM || process.env.HSE_OCI_API_UPSTREAM || '').trim();
    return raw ? raw.replace(/\/+$/, '') : '';
}

module.exports = async (req, res) => {
    applyRestrictiveCors(req, res);

    const upstreamBase = getUpstreamBase();
    if (upstreamBase) {
        try {
            const upstream = await fetch(upstreamBase + '/health', { method: 'GET' });
            const data = await upstream.json().catch(() => ({}));
            return res.status(upstream.status).json({
                ...data,
                vercelProxy: true,
                ociUpstream: upstreamBase,
                localDbType: process.env.DB_TYPE || 'sqlite',
                timestamp: new Date().toISOString()
            });
        } catch (err) {
            return res.status(502).json({
                status: 'upstream_error',
                vercelProxy: true,
                ociUpstream: upstreamBase,
                message: String((err && err.message) || err).slice(0, 240),
                timestamp: new Date().toISOString()
            });
        }
    }

    let dbEngine = 'unknown';
    let persistent = false;
    let dbInitError = '';
    try {
        const { getDatabase } = require('../backend-sql/src/db/database');
        const db = getDatabase();
        dbEngine = (db && db.engineType) || 'unknown';
        persistent = dbEngine === 'libsql-turso' || dbEngine === 'oracle' || !!(db && db.persistent);
    } catch (e) {
        dbInitError = String((e && e.message) || e).slice(0, 240);
    }
    res.status(200).json({
        status: dbInitError ? 'degraded' : 'ok',
        platform: 'Vercel Serverless',
        service: 'HSE API',
        dbEngine,
        persistent,
        dbType: process.env.DB_TYPE || 'sqlite',
        oracleMirror: process.env.ORACLE_MIRROR === '1' || process.env.ORACLE_MIRROR === 'true',
        oracleWalletB64Len: String(process.env.ORACLE_WALLET_FILES_B64 || '').length,
        oracleUserSet: !!(process.env.ORACLE_USER || '').trim(),
        oracleConnectSet: !!(process.env.ORACLE_CONNECT_STRING || '').trim(),
        ociUpstreamConfigured: false,
        proxyBuild: 'inline-20260905',
        dbInitError: dbInitError || undefined,
        timestamp: new Date().toISOString()
    });
};
