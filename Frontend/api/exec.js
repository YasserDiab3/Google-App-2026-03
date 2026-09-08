/**
 * Vercel Serverless Function - Universal HSE RPC API Endpoint (/api/exec)
 * النماذج العامة تُحوَّل إلى Google Apps Script + Sheets (ليس SQL).
 */
'use strict';

const { handleRpcRequest } = require('../backend-sql/src/rpc-router');
const { initDatabase } = require('../backend-sql/src/db/database');
const { initSchema } = require('../backend-sql/src/db/schema-init');

const GAS_EXEC_URL = process.env.HSE_GAS_EXEC_URL
    || 'https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec';

const GAS_PUBLIC_ACTIONS = new Set([
    'submitPublicDailySafetyChecklist',
    'getPublicDailySafetyConfig',
    'submitPublicObservation',
    'getPublicObservationConfig',
    'getPublicObservationsAnalytics',
    'submitPublicNearMiss',
    'getPublicNearMissConfig',
    'submitPublicFireInspection',
    'getPublicFireInspectionConfig',
    'submitGateVisitorCheckIn',
    'submitGateVisitorCheckOut',
    'getActiveGateVisitors',
    'getAllGateVisitors',
    'getSecurityOfficersList',
    'getPublicLivePTWSummary',
    'getHseBroadcastMessages',
    'getHseEmergencyContacts',
    'triggerDailySafetyFormSync',
    'testConnection',
    'warmup'
]);

async function proxyPublicActionToGas(body) {
    // GAS يُرجع 302؛ المتصفح يفسد POST. من السيرفر نقرأ Location ثم GET للنتيجة.
    const first = await fetch(GAS_EXEC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(body || {}),
        redirect: 'manual'
    });
    let text = '';
    if (first.status >= 300 && first.status < 400) {
        const loc = first.headers.get('location');
        if (!loc) {
            return { success: false, message: 'GAS redirect missing Location', errorCode: 'GAS_NO_LOCATION' };
        }
        const second = await fetch(loc, { method: 'GET', redirect: 'follow' });
        text = await second.text();
    } else {
        text = await first.text();
    }
    try {
        return JSON.parse(text);
    } catch (_e) {
        return {
            success: false,
            message: 'استجابة غير صالحة من Apps Script',
            errorCode: 'GAS_PROXY_PARSE',
            snippet: String(text || '').replace(/\s+/g, ' ').slice(0, 180)
        };
    }
}

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
                if (GAS_PUBLIC_ACTIONS.has(String(action))) {
                    const result = await proxyPublicActionToGas({
                        action,
                        ...(req.query || {})
                    });
                    return res.status(200).json(result);
                }
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
        const action = body && body.action;
        if (action && GAS_PUBLIC_ACTIONS.has(String(action))) {
            const result = await proxyPublicActionToGas(body);
            return res.status(200).json(result);
        }
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
