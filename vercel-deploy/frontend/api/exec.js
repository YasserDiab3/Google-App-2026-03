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

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        const action = req.query?.action;
        if (action === 'getProfileImage') {
            const { getProfileImage } = require('../backend-sql/src/handlers/file-handlers');
            const result = getProfileImage(req.query);
            if (result.redirectUrl) {
                return res.redirect(302, result.redirectUrl);
            }
            return res.status(200).json(result);
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
        const result = handleRpcRequest(body);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error',
            errorCode: 'SERVERLESS_INTERNAL_ERROR'
        });
    }
};
