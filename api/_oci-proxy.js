// Proxy Vercel /api/* → OCI Compute when OCI_API_UPSTREAM is set.
// Example: OCI_API_UPSTREAM=http://130.x.x.x  or  https://api.safety-icapp.com
'use strict';

const { URL } = require('url');

function getUpstreamBase() {
    const raw = String(process.env.OCI_API_UPSTREAM || process.env.HSE_OCI_API_UPSTREAM || '').trim();
    if (!raw) return '';
    return raw.replace(/\/+$/, '');
}

function isProxyEnabled() {
    return !!getUpstreamBase();
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {{ path: string }} opts  e.g. { path: '/exec' } or { path: '/health' }
 */
async function proxyToOci(req, res, opts) {
    const base = getUpstreamBase();
    if (!base) {
        throw new Error('OCI_API_UPSTREAM not set');
    }

    const targetPath = opts && opts.path ? opts.path : '/exec';
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
        if (typeof req.body === 'string') {
            init.body = req.body;
        } else if (req.body != null) {
            init.body = JSON.stringify(req.body);
            headers['content-type'] = 'application/json';
        }
    }

    const upstream = await fetch(u.toString(), init);
    const text = await upstream.text();
    const ct = upstream.headers.get('content-type') || 'application/json; charset=utf-8';
    res.statusCode = upstream.status;
    res.setHeader('Content-Type', ct);
    res.setHeader('X-HSE-Upstream', 'oci-compute');
    return res.end(text);
}

module.exports = {
    getUpstreamBase,
    isProxyEnabled,
    proxyToOci
};
