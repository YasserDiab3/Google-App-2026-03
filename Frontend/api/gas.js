/**
 * Pure GAS proxy for public forms — two-step POST then GET Location.
 * Avoids browser CORS/redirect issues that drop doPost body.
 */
'use strict';

const GAS_EXEC_URL = process.env.HSE_GAS_EXEC_URL
    || 'https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec';

async function proxyToGas(body) {
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
        const snip = String(text || '').replace(/\s+/g, ' ').slice(0, 180);
        return {
            success: false,
            message: 'استجابة غير صالحة من Apps Script',
            errorCode: 'GAS_PROXY_PARSE',
            snippet: snip
        };
    }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    let body = req.body;
    if (req.method === 'GET') {
        body = { action: req.query?.action, ...(req.query || {}) };
    } else if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (_e) {
            return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
        }
    }

    if (!body || !body.action) {
        return res.status(400).json({ success: false, message: 'action required' });
    }

    try {
        const result = await proxyToGas(body);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || 'GAS proxy failed',
            errorCode: 'GAS_PROXY_ERROR'
        });
    }
};
