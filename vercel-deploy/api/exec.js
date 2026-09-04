/**
 * Vercel Serverless Function - Universal HSE RPC API Endpoint (/api/exec)
 */
'use strict';

const { handleRpcRequest } = require('../backend-sql/src/rpc-router');
const { initDatabase } = require('../backend-sql/src/db/database');
const { initSchema } = require('../backend-sql/src/db/schema-init');

// Initialize DB on cold start
try {
    const db = initDatabase();
    initSchema(db);
} catch (e) {
    console.error('Vercel cold-start DB init error:', e);
}

const { applyRestrictiveCors, isAllowedOrigin } = require('../backend-sql/src/allowed-origins');

module.exports = async (req, res) => {
    applyRestrictiveCors(req, res);
    const reqOrigin = req.headers && (req.headers.origin || req.headers.Origin);
    if (reqOrigin && !isAllowedOrigin(reqOrigin)) {
        return res.status(403).json({ success: false, message: 'Origin not allowed', errorCode: 'CORS_FORBIDDEN' });
    }

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        const action = req.query?.action;
        if (action === 'getProfileImage') {
            try {
                const { getProfileImage } = require('../backend-sql/src/handlers/file-handlers');
                const result = await getProfileImage(req.query);
                // JSON دائماً — الواجهة تجلب عبر fetch وتتحقق من redirectUrl يدوياً (تجنب 403 في img.src)
                return res.status(200).json(result);
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message || 'فشل جلب الصورة',
                    errorCode: 'PROFILE_IMAGE_ERROR'
                });
            }
        }
        if (action) {
            try {
                const result = await handleRpcRequest({
                    action,
                    data: { ...(req.query || {}) }
                });
                return res.status(200).json(result);
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message || 'Internal Server Error',
                    errorCode: 'SERVERLESS_INTERNAL_ERROR'
                });
            }
        }
        return res.status(200).json({
            status: 'ok',
            server: 'HSE SQL API',
            endpoint: '/api/exec',
            timestamp: new Date().toISOString()
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (_) {
            return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
        }
    }

    try {
        const result = await handleRpcRequest(body);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error',
            errorCode: 'SERVERLESS_INTERNAL_ERROR'
        });
    }
};
