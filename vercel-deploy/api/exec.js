/**
 * Vercel /api/exec — proxies to OCI when OCI_API_UPSTREAM is set.
 */
'use strict';

const { applyRestrictiveCors, isAllowedOrigin } = require('../backend-sql/src/allowed-origins');

function getUpstreamBase() {
    const raw = String(process.env.OCI_API_UPSTREAM || process.env.HSE_OCI_API_UPSTREAM || '').trim();
    return raw ? raw.replace(/\/+$/, '') : '';
}

async function proxyToOci(req, res, targetPath) {
    const base = getUpstreamBase();
    const { URL } = require('url');
    const u = new URL(base + targetPath);
    if (req.url && req.url.includes('?')) {
        const q = req.url.slice(req.url.indexOf('?'));
        u.search = q.startsWith('?') ? q.slice(1) : q;
    }
    const headers = {
        'content-type': req.headers['content-type'] || 'application/json',
        accept: req.headers.accept || 'application/json',
        'x-forwarded-host': req.headers.host || '',
        'x-forwarded-proto': 'https'
    };
    if (req.headers.origin) headers.origin = req.headers.origin;
    if (req.headers.authorization) headers.authorization = req.headers.authorization;

    const method = String(req.method || 'GET').toUpperCase();
    const init = { method, headers };
    if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
        if (typeof req.body === 'string') init.body = req.body;
        else if (req.body != null) {
            init.body = JSON.stringify(req.body);
            headers['content-type'] = 'application/json';
        }
    }
    const upstream = await fetch(u.toString(), init);
    const text = await upstream.text();
    res.statusCode = upstream.status;
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    res.setHeader('X-HSE-Upstream', 'oci-compute');
    return res.end(text);
}

if (!getUpstreamBase()) {
    try {
        const { initDatabase } = require('../backend-sql/src/db/database');
        const { initSchema } = require('../backend-sql/src/db/schema-init');
        const db = initDatabase();
        initSchema(db);
    } catch (e) {
        console.error('Vercel cold-start DB init error:', e);
    }
}

module.exports = async (req, res) => {
    applyRestrictiveCors(req, res);
    const reqOrigin = req.headers && (req.headers.origin || req.headers.Origin);
    if (reqOrigin && !isAllowedOrigin(reqOrigin)) {
        return res.status(403).json({ success: false, message: 'Origin not allowed', errorCode: 'CORS_FORBIDDEN' });
    }
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (getUpstreamBase()) {
        try {
            return await proxyToOci(req, res, '/exec');
        } catch (err) {
            return res.status(502).json({
                success: false,
                message: err.message || 'OCI upstream failed',
                errorCode: 'OCI_UPSTREAM_ERROR'
            });
        }
    }

    const { handleRpcRequest } = require('../backend-sql/src/rpc-router');

    if (req.method === 'GET') {
        const action = req.query?.action;
        if (action === 'getProfileImage') {
            try {
                const { getProfileImage } = require('../backend-sql/src/handlers/file-handlers');
                return res.status(200).json(await getProfileImage(req.query));
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
                return res.status(200).json(await handleRpcRequest({ action, data: { ...(req.query || {}) } }));
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
            proxyBuild: 'inline-20260905',
            timestamp: new Date().toISOString()
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); }
        catch (_) { return res.status(400).json({ success: false, message: 'Invalid JSON payload' }); }
    }

    try {
        return res.status(200).json(await handleRpcRequest(body));
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error',
            errorCode: 'SERVERLESS_INTERNAL_ERROR'
        });
    }
};
