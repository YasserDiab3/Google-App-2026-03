/**
 * رابط الخلفية لهذا المشروع فقط: SQL على safety-icapp.com /api/exec
 * ممنوع: GAS، icapphub، ICAPP-V092026، أنفاق Cloudflare، أي vercel.app آخر.
 */
(function (root) {
    'use strict';

    var CANONICAL_SQL = 'https://www.safety-icapp.com/api/exec';
    var ALLOWED_HOSTS = {
        'www.safety-icapp.com': true,
        'safety-icapp.com': true,
        'safetyicapp-ecru.vercel.app': true,
        'localhost': true,
        '127.0.0.1': true
    };

    function hostOf(u) {
        try {
            var s = String(u || '').trim();
            if (!s) return '';
            if (s.charAt(0) === '/') return (root.location && root.location.hostname) || '';
            return new URL(s, (root.location && root.location.origin) || CANONICAL_SQL).hostname.toLowerCase();
        } catch (_e) {
            return '';
        }
    }

    function isForeignBackend(u) {
        var s = String(u || '').toLowerCase();
        if (!s) return true;
        if (s.indexOf('trycloudflare.com') !== -1) return true;
        if (s.indexOf('script.google.com') !== -1) return true;
        if (s.indexOf('icapphub') !== -1) return true;
        if (s.indexOf('icapp-v092026') !== -1) return true;
        var h = hostOf(s);
        if (!h) return true;
        if (ALLOWED_HOSTS[h]) return false;
        if (h.indexOf('safety-icapp.com') !== -1) return false;
        return true;
    }

    function isAllowedPageHost(h) {
        h = String(h || '').toLowerCase();
        if (ALLOWED_HOSTS[h]) return true;
        if (h.indexOf('safety-icapp.com') !== -1) return true;
        return false;
    }

    function normalizeSqlUrl(u) {
        var url = String(u || '').trim();
        if (!url || isForeignBackend(url)) return '';
        return url;
    }

    function scrubForeignStoredUrls() {
        try {
            if (typeof localStorage === 'undefined') return;
            var custom = localStorage.getItem('hse_public_api_url') || localStorage.getItem('HSE_API_URL') || '';
            if (custom && isForeignBackend(custom)) {
                localStorage.removeItem('hse_public_api_url');
                localStorage.removeItem('HSE_API_URL');
            }
            var raw = localStorage.getItem('hse_google_config');
            if (raw) {
                var parsed = JSON.parse(raw);
                var u = parsed && parsed.appsScript && parsed.appsScript.scriptUrl;
                if (u && isForeignBackend(u)) {
                    parsed.appsScript.scriptUrl = CANONICAL_SQL;
                    localStorage.setItem('hse_google_config', JSON.stringify(parsed));
                }
            }
        } catch (_e) {}
    }

    function getEffectiveApiUrl() {
        scrubForeignStoredUrls();
        var pageHost = (root.location && root.location.hostname) ? String(root.location.hostname).toLowerCase() : '';
        if (isAllowedPageHost(pageHost)) {
            if (pageHost === 'localhost' || pageHost === '127.0.0.1') {
                return 'http://127.0.0.1:3001/exec';
            }
            return (root.location && root.location.origin ? root.location.origin : 'https://www.safety-icapp.com') + '/api/exec';
        }
        try {
            if (typeof localStorage !== 'undefined') {
                var stored = localStorage.getItem('hse_public_api_url') || localStorage.getItem('HSE_API_URL') || '';
                var n = normalizeSqlUrl(stored);
                if (n) return n;
            }
        } catch (_e2) {}
        return CANONICAL_SQL;
    }

    root.getEffectiveApiUrl = getEffectiveApiUrl;
    root.__hseNormalizeSqlUrl = normalizeSqlUrl;
    root.__hseIsForeignBackend = isForeignBackend;
    root.__hseIsAllowedPageHost = isAllowedPageHost;
    root.HSE_CANONICAL_SQL_API = CANONICAL_SQL;
    try {
        Object.defineProperty(root, 'LIVE_BACKEND_URL', {
            configurable: true,
            get: getEffectiveApiUrl
        });
        Object.defineProperty(root, 'DEFAULT_API_URL', {
            configurable: true,
            get: getEffectiveApiUrl
        });
    } catch (_e3) {
        root.LIVE_BACKEND_URL = getEffectiveApiUrl();
        root.DEFAULT_API_URL = getEffectiveApiUrl();
    }
}(typeof window !== 'undefined' ? window : this));
