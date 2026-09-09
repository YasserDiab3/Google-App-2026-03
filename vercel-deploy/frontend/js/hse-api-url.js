/**
 * رابط الخلفية لهذا المشروع: محرك وقاعدة بيانات SQL المباشر.
 * ممنوع: safety-icapp.com و /api/exec (SQL على Vercel) — مشروع آخر.
 */
(function (root) {
    'use strict';

    var DEFAULT_GAS_EXEC_URL = 'https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec';
    var DEFAULT_SPREADSHEET_ID = '1EanavJ2OodOmq8b1GagSj8baa-KF-o4mVme_Jlwmgxc';

    function isForeignBackend(u) {
        const s = String(u || '').toLowerCase();
        if (!s) return false;
        if (s.indexOf('trycloudflare.com') !== -1) return true;
        if (s.indexOf('safety-icapp.com') !== -1) return true;
        if (s.indexOf('safetyicapp-ecru') !== -1) return true;
        if (s.indexOf('script.google.com') === -1 && s.indexOf('/api/exec') !== -1) return true;
        if (s.indexOf('127.0.0.1:3001') !== -1 || s.indexOf('localhost:3001') !== -1) return true;
        return false;
    }

    function normalizeGasUrl(u) {
        let url = String(u || '').trim();
        if (!url || isForeignBackend(url)) return '';
        if (url.indexOf('script.google.com/macros/s/') !== -1) {
            url = url.replace(/\/dev(\?|#|$)/, '/exec$1');
        }
        return url;
    }

    function ensureGasConfig(cfg) {
        const out = (cfg && typeof cfg === 'object') ? cfg : {};
        const apps = Object.assign({}, out.appsScript || {});
        const sheets = Object.assign({}, out.sheets || {});
        const maps = Object.assign({}, out.maps || {});
        let url = normalizeGasUrl(apps.scriptUrl);
        if (!url) url = DEFAULT_GAS_EXEC_URL;
        apps.scriptUrl = url;
        apps.enabled = true;
        let sid = String(sheets.spreadsheetId || '').trim();
        if (!sid) sid = DEFAULT_SPREADSHEET_ID;
        sheets.spreadsheetId = sid;
        sheets.enabled = true;
        return Object.assign({}, out, { appsScript: apps, sheets: sheets, maps: maps });
    }

    function persistRepairedConfig(parsed) {
        try {
            if (typeof localStorage === 'undefined') return parsed;
            const repaired = ensureGasConfig(parsed);
            localStorage.setItem('hse_google_config', JSON.stringify(repaired));
            const custom = localStorage.getItem('hse_public_api_url') || localStorage.getItem('HSE_API_URL') || '';
            if (custom && isForeignBackend(custom)) {
                localStorage.removeItem('hse_public_api_url');
                localStorage.removeItem('HSE_API_URL');
            }
            return repaired;
        } catch (_e) {
            return parsed;
        }
    }

    function readStoredGasUrl() {
        try {
            if (typeof localStorage === 'undefined') return '';
            const custom = localStorage.getItem('hse_public_api_url') || localStorage.getItem('HSE_API_URL') || '';
            const n1 = normalizeGasUrl(custom);
            if (n1) return n1;
            const raw = localStorage.getItem('hse_google_config');
            if (raw) {
                const parsed = JSON.parse(raw);
                const n2 = normalizeGasUrl(parsed && parsed.appsScript && parsed.appsScript.scriptUrl);
                if (n2) return n2;
            }
        } catch (_e) {}
        return '';
    }

    function scrubForeignStoredUrls() {
        try {
            if (typeof localStorage === 'undefined') return;
            const custom = localStorage.getItem('hse_public_api_url') || localStorage.getItem('HSE_API_URL') || '';
            if (custom && isForeignBackend(custom)) {
                localStorage.removeItem('hse_public_api_url');
                localStorage.removeItem('HSE_API_URL');
            }
            const raw = localStorage.getItem('hse_google_config');
            const parsed = raw ? JSON.parse(raw) : {};
            const url = parsed && parsed.appsScript && parsed.appsScript.scriptUrl;
            const sid = parsed && parsed.sheets && parsed.sheets.spreadsheetId;
            if (!url || isForeignBackend(url) || !String(sid || '').trim()) {
                persistRepairedConfig(parsed || {});
            }
        } catch (_e) {}
    }

    function getEffectiveApiUrl() {
        scrubForeignStoredUrls();
        const stored = readStoredGasUrl();
        if (stored) return stored;
        try {
            if (root.AppState && AppState.googleConfig && AppState.googleConfig.appsScript) {
                const n = normalizeGasUrl(AppState.googleConfig.appsScript.scriptUrl);
                if (n) return n;
            }
        } catch (_e) {}
        const q = (typeof URLSearchParams !== 'undefined' && root.location)
            ? new URLSearchParams(root.location.search || '')
            : null;
        if (q) {
            const p = normalizeGasUrl(q.get('apiUrl') || q.get('api') || '');
            if (p) return p;
        }
        return DEFAULT_GAS_EXEC_URL;
    }

    root.HSE_DEFAULT_GAS_URL = DEFAULT_GAS_EXEC_URL;
    root.HSE_DEFAULT_SPREADSHEET_ID = DEFAULT_SPREADSHEET_ID;
    root.getEffectiveApiUrl = getEffectiveApiUrl;
    root.__hseNormalizeGasUrl = normalizeGasUrl;
    root.__hseEnsureGasConfig = ensureGasConfig;
    try {
        Object.defineProperty(root, 'LIVE_BACKEND_URL', {
            configurable: true,
            get: getEffectiveApiUrl
        });
        Object.defineProperty(root, 'DEFAULT_API_URL', {
            configurable: true,
            get: getEffectiveApiUrl
        });
    } catch (_e) {
        root.LIVE_BACKEND_URL = getEffectiveApiUrl();
        root.DEFAULT_API_URL = getEffectiveApiUrl();
    }
})(typeof window !== 'undefined' ? window : this);
