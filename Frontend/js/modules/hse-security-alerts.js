/**
 * HSE Security Alerts Module — ICAPP Safety System
 * تنبيهات أمنية فورية — كشف وتنبيه عن الأنشطة المشبوهة
 * v1.0 — 2026-09-25
 *
 * Usage:
 *   HseSecurityAlerts.onLoginAttempt(success, employeeCode)   — Track login attempt
 *   HseSecurityAlerts.onSensitiveAction(action, details)      — Track sensitive action
 *   HseSecurityAlerts.getAlertsSummary()                       — Get alerts overview
 *   HseSecurityAlerts.clearAlerts()                            — Clear local alerts
 */
const HseSecurityAlerts = (() => {
    'use strict';

    const FAILED_ATTEMPTS_KEY = 'HSE_FAILED_LOGIN_ATTEMPTS';
    const ALERTS_LOG_KEY = 'HSE_SECURITY_ALERTS';
    const LOCKOUT_KEY = 'HSE_SECURITY_LOCKOUT';

    // Thresholds
    const MAX_FAILED_ATTEMPTS = 3;          // Alert after 3 failed attempts
    const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout
    const ALERT_COOLDOWN_MS = 5 * 60 * 1000;   // 5 min between same alerts
    const MAX_ALERTS_LOCAL = 100;

    /* ── Alert Types ─────────────────────────────────────── */
    const ALERT_TYPES = {
        FAILED_LOGIN_THRESHOLD: {
            code: 'SEC-001',
            severity: 'HIGH',
            titleAr: '⛔ محاولات دخول فاشلة متكررة',
            titleEn: 'Multiple Failed Login Attempts'
        },
        NEW_DEVICE_LOGIN: {
            code: 'SEC-002',
            severity: 'MEDIUM',
            titleAr: '📱 تسجيل دخول من جهاز جديد',
            titleEn: 'Login from New Device'
        },
        ADMIN_PIN_RESET: {
            code: 'SEC-003',
            severity: 'HIGH',
            titleAr: '🔑 إعادة تعيين رمز PIN بواسطة المدير',
            titleEn: 'Admin PIN Reset'
        },
        SUSPICIOUS_TIMING: {
            code: 'SEC-004',
            severity: 'MEDIUM',
            titleAr: '🕐 نشاط في وقت غير معتاد',
            titleEn: 'Activity at Unusual Time'
        },
        RAPID_SUBMISSIONS: {
            code: 'SEC-005',
            severity: 'LOW',
            titleAr: '⚡ تقديم نماذج سريع متتالي',
            titleEn: 'Rapid Form Submissions'
        },
        GEOFENCE_VIOLATION: {
            code: 'SEC-006',
            severity: 'MEDIUM',
            titleAr: '📍 تقديم نموذج من خارج النطاق الجغرافي',
            titleEn: 'Form Submission Outside Geofence'
        }
    };

    /* ── Failed Login Tracking ───────────────────────────── */
    function _getFailedAttempts() {
        try {
            return JSON.parse(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '{}');
        } catch (e) { return {}; }
    }

    function _setFailedAttempts(data) {
        localStorage.setItem(FAILED_ATTEMPTS_KEY, JSON.stringify(data));
    }

    function onLoginAttempt(success, employeeCode = '') {
        const attempts = _getFailedAttempts();
        const key = employeeCode || '_unknown';

        if (success) {
            // Clear failed attempts on success
            delete attempts[key];
            _setFailedAttempts(attempts);

            // Check if it's a new device
            if (typeof HseDeviceAudit !== 'undefined' && HseDeviceAudit.isNewDevice()) {
                _createAlert(ALERT_TYPES.NEW_DEVICE_LOGIN, {
                    employeeCode,
                    message: `تسجيل دخول ناجح من جهاز جديد للموظف ${employeeCode}`
                });
                HseDeviceAudit.markDeviceKnown();
            }

            // Check unusual timing (2 AM - 5 AM Cairo time)
            if (_isUnusualTime()) {
                _createAlert(ALERT_TYPES.SUSPICIOUS_TIMING, {
                    employeeCode,
                    message: `نشاط تسجيل دخول في وقت غير معتاد (${new Date().toLocaleTimeString('ar-EG')})`
                });
            }

            // Log audit
            if (typeof HseDeviceAudit !== 'undefined') {
                HseDeviceAudit.logAction('login_success', { employeeCode });
            }
        } else {
            // Track failed attempt
            if (!attempts[key]) {
                attempts[key] = { count: 0, firstAttempt: Date.now(), lastAttempt: 0 };
            }
            attempts[key].count++;
            attempts[key].lastAttempt = Date.now();
            _setFailedAttempts(attempts);

            // Check threshold
            if (attempts[key].count >= MAX_FAILED_ATTEMPTS) {
                _createAlert(ALERT_TYPES.FAILED_LOGIN_THRESHOLD, {
                    employeeCode,
                    failedCount: attempts[key].count,
                    message: `${attempts[key].count} محاولات دخول فاشلة للرمز ${employeeCode}`
                });

                // Set lockout
                _setLockout(key);
            }

            // Log audit
            if (typeof HseDeviceAudit !== 'undefined') {
                HseDeviceAudit.logAction('login_failed', {
                    employeeCode,
                    attemptNumber: attempts[key].count
                });
            }
        }
    }

    /* ── Lockout Management ──────────────────────────────── */
    function _setLockout(key) {
        try {
            const lockouts = JSON.parse(localStorage.getItem(LOCKOUT_KEY) || '{}');
            lockouts[key] = Date.now() + LOCKOUT_DURATION_MS;
            localStorage.setItem(LOCKOUT_KEY, JSON.stringify(lockouts));
        } catch (e) { /* ignore */ }
    }

    function isLockedOut(employeeCode) {
        try {
            const lockouts = JSON.parse(localStorage.getItem(LOCKOUT_KEY) || '{}');
            const key = employeeCode || '_unknown';
            if (!lockouts[key]) return false;
            if (Date.now() > lockouts[key]) {
                // Lockout expired — clear it
                delete lockouts[key];
                localStorage.setItem(LOCKOUT_KEY, JSON.stringify(lockouts));
                return false;
            }
            return true;
        } catch (e) { return false; }
    }

    function getLockoutRemainingMs(employeeCode) {
        try {
            const lockouts = JSON.parse(localStorage.getItem(LOCKOUT_KEY) || '{}');
            const key = employeeCode || '_unknown';
            if (!lockouts[key]) return 0;
            const remaining = lockouts[key] - Date.now();
            return remaining > 0 ? remaining : 0;
        } catch (e) { return 0; }
    }

    /* ── Sensitive Action Tracking ───────────────────────── */
    function onSensitiveAction(action, details = {}) {
        const alertType = ALERT_TYPES[action] || {
            code: 'SEC-999',
            severity: 'LOW',
            titleAr: '📋 إجراء مسجل',
            titleEn: 'Logged Action'
        };

        _createAlert(alertType, details);

        if (typeof HseDeviceAudit !== 'undefined') {
            HseDeviceAudit.logAction('sensitive_action_' + action, details);
        }
    }

    /* ── Form Submission Rate Check ──────────────────────── */
    const SUBMISSION_TIMES_KEY = 'HSE_SUBMISSION_TIMES';

    function onFormSubmission(formType, employeeCode) {
        try {
            const times = JSON.parse(localStorage.getItem(SUBMISSION_TIMES_KEY) || '[]');
            const now = Date.now();
            times.push({ time: now, form: formType, code: employeeCode });

            // Keep last 20 entries
            while (times.length > 20) times.shift();
            localStorage.setItem(SUBMISSION_TIMES_KEY, JSON.stringify(times));

            // Check for rapid submissions (3+ in 2 minutes)
            const recentTwoMin = times.filter(t => now - t.time < 120000);
            if (recentTwoMin.length >= 3) {
                _createAlert(ALERT_TYPES.RAPID_SUBMISSIONS, {
                    employeeCode,
                    count: recentTwoMin.length,
                    message: `${recentTwoMin.length} نماذج مقدمة في أقل من دقيقتين`
                });
            }
        } catch (e) { /* ignore */ }
    }

    /* ── Geofence Violation ──────────────────────────────── */
    function onGeofenceViolation(employeeCode, distance, siteName) {
        _createAlert(ALERT_TYPES.GEOFENCE_VIOLATION, {
            employeeCode,
            distance: Math.round(distance),
            siteName,
            message: `تقديم نموذج على بعد ${Math.round(distance)} متر من ${siteName}`
        });
    }

    /* ── Alert Creation ──────────────────────────────────── */
    function _createAlert(alertType, details = {}) {
        // Check cooldown
        if (_isOnCooldown(alertType.code)) return;

        const alert = {
            id: _generateAlertId(),
            code: alertType.code,
            severity: alertType.severity,
            titleAr: alertType.titleAr,
            titleEn: alertType.titleEn,
            timestamp: new Date().toISOString(),
            details: details,
            acknowledged: false,
            deviceFingerprint: localStorage.getItem('HSE_DEVICE_FINGERPRINT') || ''
        };

        // Store locally
        _storeAlert(alert);

        // Send to backend
        _sendAlertToBackend(alert);

        // Show visual notification (toast)
        if (alertType.severity === 'HIGH') {
            _showSecurityToast(alert);
        }

        console.warn(`[HSE-Security] ${alertType.code}: ${alertType.titleEn}`, details);
    }

    /* ── Alert Storage ───────────────────────────────────── */
    function _storeAlert(alert) {
        try {
            const alerts = JSON.parse(localStorage.getItem(ALERTS_LOG_KEY) || '[]');
            alerts.push(alert);
            while (alerts.length > MAX_ALERTS_LOCAL) alerts.shift();
            localStorage.setItem(ALERTS_LOG_KEY, JSON.stringify(alerts));
        } catch (e) { /* storage full */ }
    }

    function getAlertsSummary() {
        try {
            const alerts = JSON.parse(localStorage.getItem(ALERTS_LOG_KEY) || '[]');
            const last24h = alerts.filter(a => Date.now() - new Date(a.timestamp).getTime() < 86400000);
            return {
                total: alerts.length,
                last24h: last24h.length,
                high: last24h.filter(a => a.severity === 'HIGH').length,
                medium: last24h.filter(a => a.severity === 'MEDIUM').length,
                low: last24h.filter(a => a.severity === 'LOW').length,
                unacknowledged: alerts.filter(a => !a.acknowledged).length,
                alerts: alerts.slice(-20).reverse()
            };
        } catch (e) {
            return { total: 0, last24h: 0, high: 0, medium: 0, low: 0, unacknowledged: 0, alerts: [] };
        }
    }

    function clearAlerts() {
        localStorage.removeItem(ALERTS_LOG_KEY);
    }

    /* ── Backend Sender ──────────────────────────────────── */
    function _sendAlertToBackend(alert) {
        try {
            const payload = JSON.stringify({
                action: 'fieldPortalSecurityAlert',
                ...alert
            });
            const baseUrl = _getApiBaseUrl();
            if (navigator.sendBeacon) {
                navigator.sendBeacon(baseUrl + '/api/exec', payload);
            } else {
                fetch(baseUrl + '/api/exec', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: payload,
                    keepalive: true
                }).catch(() => {});
            }
        } catch (e) { /* silent */ }
    }

    function _getApiBaseUrl() {
        if (window.API_BASE_URL) return window.API_BASE_URL;
        const proto = window.location.protocol;
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1') {
            return `${proto}//${host}:3000`;
        }
        return window.location.origin;
    }

    /* ── Security Toast Notification ─────────────────────── */
    function _showSecurityToast(alert) {
        const existing = document.getElementById('hseSecurityToast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'hseSecurityToast';
        toast.style.cssText = `
            position: fixed; top: 16px; right: 16px; z-index: 999999;
            max-width: 380px; padding: 14px 18px; direction: rtl;
            background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%);
            color: #fef2f2; border-radius: 12px; font-family: 'Cairo', sans-serif;
            box-shadow: 0 8px 32px rgba(127, 29, 29, 0.4);
            border: 1px solid rgba(252, 165, 165, 0.2);
            opacity: 0; transform: translateX(20px);
            transition: all 0.4s ease;
        `;
        toast.innerHTML = `
            <div style="display:flex;align-items:flex-start;gap:10px;">
                <span style="font-size:22px;">🚨</span>
                <div style="flex:1;">
                    <div style="font-weight:800;font-size:13px;margin-bottom:4px;">${alert.titleAr}</div>
                    <div style="font-size:11px;opacity:0.85;">${alert.details.message || alert.titleEn}</div>
                    <div style="font-size:10px;opacity:0.6;margin-top:4px;">${alert.code} | ${new Date().toLocaleTimeString('ar-EG')}</div>
                </div>
                <button onclick="this.closest('#hseSecurityToast').remove()" style="background:none;border:none;color:#fca5a5;cursor:pointer;font-size:16px;padding:0;line-height:1;">✕</button>
            </div>
        `;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        });
        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(20px)';
                setTimeout(() => toast.remove(), 400);
            }
        }, 8000);
    }

    /* ── Cooldown Check ──────────────────────────────────── */
    function _isOnCooldown(code) {
        try {
            const cooldowns = JSON.parse(sessionStorage.getItem('HSE_ALERT_COOLDOWNS') || '{}');
            if (cooldowns[code] && Date.now() - cooldowns[code] < ALERT_COOLDOWN_MS) return true;
            cooldowns[code] = Date.now();
            sessionStorage.setItem('HSE_ALERT_COOLDOWNS', JSON.stringify(cooldowns));
            return false;
        } catch (e) { return false; }
    }

    /* ── Unusual Time Check ──────────────────────────────── */
    function _isUnusualTime() {
        try {
            const cairoStr = new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo', hour12: false });
            const hour = parseInt(cairoStr.split(',')[1].trim().split(':')[0], 10);
            return hour >= 2 && hour < 5; // 2 AM - 5 AM is unusual
        } catch (e) {
            return false;
        }
    }

    /* ── Alert ID Generator ──────────────────────────────── */
    function _generateAlertId() {
        return 'ALR-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    }

    return {
        onLoginAttempt,
        onSensitiveAction,
        onFormSubmission,
        onGeofenceViolation,
        isLockedOut,
        getLockoutRemainingMs,
        getAlertsSummary,
        clearAlerts,
        ALERT_TYPES
    };
})();
