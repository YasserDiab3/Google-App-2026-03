/**
 * HSE Device Fingerprint & Audit Log Module — ICAPP Safety System
 * بصمة الجهاز وسجل المراقبة الأمني
 * v1.0 — 2026-09-25
 *
 * Usage:
 *   HseDeviceAudit.getFingerprint()           → string (SHA-256 hex hash)
 *   HseDeviceAudit.getDeviceInfo()             → object { browser, os, screen, ... }
 *   HseDeviceAudit.logAction(action, details)  → Promise (sends audit entry to backend)
 *   HseDeviceAudit.isNewDevice()               → boolean
 */
const HseDeviceAudit = (() => {
    'use strict';

    const STORAGE_KEY = 'HSE_DEVICE_FINGERPRINT';
    const KNOWN_DEVICES_KEY = 'HSE_KNOWN_DEVICES';
    let _cachedFingerprint = null;
    let _cachedDeviceInfo = null;

    /* ── Device Info Collection ───────────────────────────── */
    function getDeviceInfo() {
        if (_cachedDeviceInfo) return _cachedDeviceInfo;

        const nav = navigator;
        const scr = screen;

        _cachedDeviceInfo = {
            // Browser info
            userAgent: nav.userAgent || '',
            language: nav.language || nav.userLanguage || '',
            languages: (nav.languages || []).join(','),
            platform: nav.platform || nav.userAgentData?.platform || '',
            vendor: nav.vendor || '',
            cookieEnabled: nav.cookieEnabled,
            doNotTrack: nav.doNotTrack || '',
            hardwareConcurrency: nav.hardwareConcurrency || 0,
            maxTouchPoints: nav.maxTouchPoints || 0,
            deviceMemory: nav.deviceMemory || 0,

            // Screen info
            screenWidth: scr.width || 0,
            screenHeight: scr.height || 0,
            screenDepth: scr.colorDepth || 0,
            pixelRatio: window.devicePixelRatio || 1,
            availWidth: scr.availWidth || 0,
            availHeight: scr.availHeight || 0,

            // Timezone
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            timezoneOffset: new Date().getTimezoneOffset(),

            // WebGL renderer (GPU)
            gpu: _getGPUInfo(),

            // Canvas fingerprint
            canvasHash: _getCanvasFingerprint(),

            // Timestamp
            firstSeen: new Date().toISOString()
        };

        return _cachedDeviceInfo;
    }

    /* ── Canvas Fingerprint ──────────────────────────────── */
    function _getCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 280;
            canvas.height = 60;
            const ctx = canvas.getContext('2d');
            if (!ctx) return 'no-canvas';

            // Draw unique pattern
            ctx.textBaseline = 'top';
            ctx.font = '16px Arial';
            ctx.fillStyle = '#f60';
            ctx.fillRect(100, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('ICAPP-HSE-FP 🔐', 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('ICAPP-HSE-FP 🔐', 4, 17);

            // Arc
            ctx.beginPath();
            ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

            return canvas.toDataURL().slice(-64);
        } catch (e) {
            return 'canvas-error';
        }
    }

    /* ── GPU Info (WebGL) ────────────────────────────────── */
    function _getGPUInfo() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return 'no-webgl';
            const ext = gl.getExtension('WEBGL_debug_renderer_info');
            if (!ext) return 'webgl-no-ext';
            const vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || '';
            const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '';
            return `${vendor}|${renderer}`;
        } catch (e) {
            return 'gpu-error';
        }
    }

    /* ── SHA-256 Hash ────────────────────────────────────── */
    async function _sha256(text) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            // Fallback: simple hash
            let hash = 0;
            for (let i = 0; i < text.length; i++) {
                const chr = text.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return Math.abs(hash).toString(16).padStart(16, '0');
        }
    }

    /* ── Generate Fingerprint ────────────────────────────── */
    async function getFingerprint() {
        if (_cachedFingerprint) return _cachedFingerprint;

        // Check localStorage cache
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            _cachedFingerprint = stored;
            return stored;
        }

        const info = getDeviceInfo();
        const raw = [
            info.userAgent, info.language, info.languages, info.platform,
            info.vendor, info.hardwareConcurrency, info.maxTouchPoints,
            info.deviceMemory, info.screenWidth, info.screenHeight,
            info.screenDepth, info.pixelRatio, info.timezone,
            info.timezoneOffset, info.gpu, info.canvasHash
        ].join('|||');

        _cachedFingerprint = await _sha256(raw);
        localStorage.setItem(STORAGE_KEY, _cachedFingerprint);

        return _cachedFingerprint;
    }

    /* ── New Device Detection ────────────────────────────── */
    function isNewDevice() {
        const known = JSON.parse(localStorage.getItem(KNOWN_DEVICES_KEY) || '[]');
        const current = localStorage.getItem(STORAGE_KEY);
        if (!current) return true;
        return !known.includes(current);
    }

    function markDeviceKnown() {
        const known = JSON.parse(localStorage.getItem(KNOWN_DEVICES_KEY) || '[]');
        const current = localStorage.getItem(STORAGE_KEY);
        if (current && !known.includes(current)) {
            known.push(current);
            // Keep last 10 devices
            while (known.length > 10) known.shift();
            localStorage.setItem(KNOWN_DEVICES_KEY, JSON.stringify(known));
        }
    }

    /* ── Audit Log Sender ────────────────────────────────── */
    async function logAction(action, details = {}) {
        try {
            const fingerprint = await getFingerprint();
            const info = getDeviceInfo();
            const session = JSON.parse(localStorage.getItem('FIELD_SESSION_KEY') || '{}');

            const auditEntry = {
                timestamp: new Date().toISOString(),
                action: action,
                employeeCode: session.employeeCode || details.employeeCode || '',
                employeeName: session.employeeName || details.employeeName || '',
                site: session.site || details.site || '',
                deviceFingerprint: fingerprint,
                browser: _getBrowserName(info.userAgent),
                os: _getOSName(info.userAgent),
                screen: `${info.screenWidth}x${info.screenHeight}`,
                gpu: info.gpu ? info.gpu.substring(0, 60) : '',
                timezone: info.timezone,
                isNewDevice: isNewDevice(),
                details: typeof details === 'string' ? details : JSON.stringify(details),
                pageUrl: window.location.pathname
            };

            // Try to send to backend
            _sendAuditToBackend(auditEntry);

            // Also log locally for offline support
            _logLocally(auditEntry);

            return auditEntry;
        } catch (e) {
            console.warn('[HSE-Audit] Failed to log action:', e);
            return null;
        }
    }

    /* ── Backend Sender ──────────────────────────────────── */
    function _sendAuditToBackend(entry) {
        try {
            // Use navigator.sendBeacon for reliability (won't block page unload)
            const payload = JSON.stringify({
                action: 'fieldPortalAuditLog',
                ...entry
            });

            if (navigator.sendBeacon) {
                const baseUrl = _getApiBaseUrl();
                navigator.sendBeacon(baseUrl + '/api/exec', payload);
            } else {
                // Fallback to fetch
                const baseUrl = _getApiBaseUrl();
                fetch(baseUrl + '/api/exec', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: payload,
                    keepalive: true
                }).catch(() => {});
            }
        } catch (e) {
            // Silent fail — audit logging should never break the app
        }
    }

    function _getApiBaseUrl() {
        // Try to detect API base URL from existing portal configuration
        if (window.API_BASE_URL) return window.API_BASE_URL;
        const proto = window.location.protocol;
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1') {
            return `${proto}//${host}:3000`;
        }
        return window.location.origin;
    }

    /* ── Local Audit Log (IndexedDB fallback → localStorage) */
    function _logLocally(entry) {
        try {
            const LOCAL_LOG_KEY = 'HSE_AUDIT_LOG_LOCAL';
            const MAX_LOCAL_ENTRIES = 200;
            const logs = JSON.parse(localStorage.getItem(LOCAL_LOG_KEY) || '[]');
            logs.push(entry);
            while (logs.length > MAX_LOCAL_ENTRIES) logs.shift();
            localStorage.setItem(LOCAL_LOG_KEY, JSON.stringify(logs));
        } catch (e) { /* storage full — ignore */ }
    }

    /* ── Browser & OS Detection ──────────────────────────── */
    function _getBrowserName(ua) {
        if (!ua) return 'Unknown';
        if (ua.includes('Edg/')) return 'Edge';
        if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera';
        if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('Firefox')) return 'Firefox';
        return 'Other';
    }

    function _getOSName(ua) {
        if (!ua) return 'Unknown';
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac OS')) return 'macOS';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
        if (ua.includes('Linux')) return 'Linux';
        return 'Other';
    }

    /* ── Get Local Audit Logs ────────────────────────────── */
    function getLocalLogs(limit = 50) {
        try {
            const logs = JSON.parse(localStorage.getItem('HSE_AUDIT_LOG_LOCAL') || '[]');
            return logs.slice(-limit).reverse();
        } catch (e) {
            return [];
        }
    }

    /* ── Initialize ──────────────────────────────────────── */
    async function init() {
        // Generate fingerprint on load
        await getFingerprint();
        console.log('[HSE-Audit] Device fingerprint generated');
    }

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        getFingerprint,
        getDeviceInfo,
        logAction,
        isNewDevice,
        markDeviceKnown,
        getLocalLogs
    };
})();
