/**
 * ClientErrorLog — التقاط تلقائي لأخطاء تظهر للمستخدمين
 * مصدر: Notification.error/warning + window error/unhandledrejection
 * إرسال خلفي غير حاجب — لا يلمس syncDataFromServer
 */
const ClientErrorLog = {
    _ready: false,
    _queue: [],
    _flushTimer: null,
    _recentFingerprints: new Map(),
    _sentThisMinute: 0,
    _minuteWindowStart: 0,
    _MAX_PER_MINUTE: 12,
    _DEDUP_MS: 60000,
    _QUEUE_MAX: 40,

    init() {
        if (this._ready) return;
        this._ready = true;
        this._wrapNotification();
        this._bindWindowErrors();
        this._bindOnlineFlush();
    },

    _isLoggedIn() {
        try {
            return !!(typeof AppState !== 'undefined' && AppState.currentUser && (AppState.currentUser.id || AppState.currentUser.email));
        } catch (_e) {
            return false;
        }
    },

    _currentModule() {
        try {
            const active = document.querySelector('.nav-item.active');
            return (active && active.getAttribute('data-section')) || (location.hash || '').replace(/^#/, '') || 'unknown';
        } catch (_e) {
            return 'unknown';
        }
    },

    _sessionId() {
        try {
            if (typeof UserActivityLog !== 'undefined' && UserActivityLog.getCurrentSessionId) {
                return UserActivityLog.getCurrentSessionId() || '';
            }
            return sessionStorage.getItem('hse_session_id') || '';
        } catch (_e) {
            return '';
        }
    },

    _fingerprint(level, message, source) {
        const raw = [String(level || ''), String(message || '').slice(0, 180), String(source || '').slice(0, 80)].join('|');
        let h = 0;
        for (let i = 0; i < raw.length; i++) {
            h = ((h << 5) - h) + raw.charCodeAt(i);
            h |= 0;
        }
        return 'fp_' + (h >>> 0).toString(36);
    },

    _isNoise(message, source, stack) {
        const text = [message, source, stack].map(function (x) { return String(x || '').toLowerCase(); }).join(' ');
        if (!text.trim()) return true;
        const noise = [
            'tracking prevention',
            'blocked access to storage',
            'chrome-extension://',
            'moz-extension://',
            'safari-extension://',
            'uploadmanager',
            'message port closed',
            'unchecked runtime',
            'receiving end does not exist',
            'resizeobserver loop',
            'script error.',
            'clienterrorlog',
            'addclienterrorlog',
            'networkerror when attempting to fetch',
            'failed to fetch',
            'load failed',
            'the operation was aborted'
        ];
        for (let i = 0; i < noise.length; i++) {
            if (text.indexOf(noise[i]) !== -1) return true;
        }
        return false;
    },

    _allowSend(fingerprint) {
        const now = Date.now();
        if (!this._minuteWindowStart || (now - this._minuteWindowStart) > 60000) {
            this._minuteWindowStart = now;
            this._sentThisMinute = 0;
        }
        if (this._sentThisMinute >= this._MAX_PER_MINUTE) return false;
        const last = this._recentFingerprints.get(fingerprint) || 0;
        if (now - last < this._DEDUP_MS) return false;
        this._recentFingerprints.set(fingerprint, now);
        if (this._recentFingerprints.size > 200) {
            const cutoff = now - this._DEDUP_MS;
            for (const [k, t] of this._recentFingerprints) {
                if (t < cutoff) this._recentFingerprints.delete(k);
            }
        }
        this._sentThisMinute += 1;
        return true;
    },

    capture(payload) {
        try {
            if (!this._ready) this.init();
            if (!payload || !payload.message) return;
            if (!this._isLoggedIn()) return;

            const level = String(payload.level || 'error').toLowerCase();
            const message = String(payload.message || '').trim().slice(0, 2000);
            const source = String(payload.source || '').slice(0, 500);
            const stack = String(payload.stack || '').slice(0, 4000);
            if (this._isNoise(message, source, stack)) return;

            const fingerprint = payload.fingerprint || this._fingerprint(level, message, source);
            if (!this._allowSend(fingerprint)) return;

            const user = AppState.currentUser || {};
            const entry = {
                id: 'CERR_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
                level: level,
                message: message,
                stack: stack,
                source: source,
                line: payload.line != null ? String(payload.line) : '',
                col: payload.col != null ? String(payload.col) : '',
                module: String(payload.module || this._currentModule()).slice(0, 120),
                action: String(payload.action || 'ui').slice(0, 120),
                pageUrl: String(payload.pageUrl || (typeof location !== 'undefined' ? location.href : '')).slice(0, 500),
                userAgent: String((typeof navigator !== 'undefined' && navigator.userAgent) || '').slice(0, 400),
                appVersion: String((typeof AppState !== 'undefined' && AppState.appVersion) || '').slice(0, 40),
                userId: String(user.id || ''),
                userEmail: String(user.email || '').toLowerCase(),
                username: String(user.name || user.username || user.displayName || ''),
                sessionId: this._sessionId(),
                fingerprint: fingerprint,
                status: 'new',
                extra: payload.extra ? (typeof payload.extra === 'string' ? payload.extra : JSON.stringify(payload.extra)).slice(0, 3000) : '',
                __timeoutMs: 20000,
                __silent: true
            };

            this._queue.push(entry);
            if (this._queue.length > this._QUEUE_MAX) {
                this._queue.splice(0, this._queue.length - this._QUEUE_MAX);
            }
            this._scheduleFlush();
        } catch (_e) {
            /* لا نكسر الواجهة */
        }
    },

    captureFromNotification(config) {
        if (!config) return;
        const type = String(config.type || '').toLowerCase();
        if (type !== 'error' && type !== 'warning' && type !== 'emergency') return;
        const message = String(config.message || config.title || '').trim();
        if (!message) return;
        this.capture({
            level: type === 'warning' ? 'warning' : 'error',
            message: message,
            source: 'notification',
            action: 'notification.' + type,
            module: this._currentModule(),
            extra: {
                description: config.description || '',
                priority: config.priority || ''
            }
        });
    },

    _scheduleFlush() {
        if (this._flushTimer) return;
        this._flushTimer = setTimeout(() => {
            this._flushTimer = null;
            this.flush();
        }, 900);
    },

    async flush() {
        if (!this._queue.length) return;
        if (!this._isLoggedIn()) return;
        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendToAppsScript) return;

        const batch = this._queue.splice(0, 8);
        for (let i = 0; i < batch.length; i++) {
            const entry = batch[i];
            try {
                await GoogleIntegration.sendToAppsScript('addClientErrorLog', entry);
            } catch (_err) {
                // أعد للطابور مرة واحدة فقط إن فشل الشبكة
                if (!entry._retried) {
                    entry._retried = true;
                    this._queue.unshift(entry);
                }
                break;
            }
        }
        if (this._queue.length) this._scheduleFlush();
    },

    _wrapNotification() {
        const self = this;
        const attempt = () => {
            const N = window.Notification;
            if (!N || typeof N.show !== 'function' || N.__cerrWrapped) return !!N?.__cerrWrapped;
            const origShow = N.show;
            N.show = function (messageOrOptions, type, duration, options) {
                try {
                    let config = {};
                    if (typeof messageOrOptions === 'string') {
                        config = { message: messageOrOptions, type: type, ...(options || {}) };
                    } else if (messageOrOptions && typeof messageOrOptions === 'object') {
                        config = messageOrOptions;
                    }
                    self.captureFromNotification(config);
                } catch (_e) { /* ignore */ }
                return origShow.call(this, messageOrOptions, type, duration, options);
            };
            N.__cerrWrapped = true;
            return true;
        };
        if (!attempt()) {
            let tries = 0;
            const t = setInterval(() => {
                tries += 1;
                if (attempt() || tries > 40) clearInterval(t);
            }, 250);
        }
    },

    _bindWindowErrors() {
        const self = this;
        window.addEventListener('error', function (event) {
            try {
                const msg = event && (event.message || (event.error && event.error.message));
                const stack = event && event.error && event.error.stack;
                const source = (event && (event.filename || event.source)) || '';
                if (self._isNoise(msg, source, stack)) return;
                self.capture({
                    level: 'unhandled',
                    message: msg || 'Unhandled error',
                    stack: stack || '',
                    source: source,
                    line: event && event.lineno,
                    col: event && event.colno,
                    action: 'window.error'
                });
            } catch (_e) { /* ignore */ }
        }, true);

        window.addEventListener('unhandledrejection', function (event) {
            try {
                const reason = event && event.reason;
                let msg = '';
                let stack = '';
                if (reason && typeof reason === 'object') {
                    msg = reason.message || String(reason);
                    stack = reason.stack || '';
                } else {
                    msg = String(reason || 'Unhandled rejection');
                }
                if (self._isNoise(msg, '', stack)) return;
                self.capture({
                    level: 'unhandled',
                    message: msg,
                    stack: stack,
                    source: 'unhandledrejection',
                    action: 'window.unhandledrejection'
                });
            } catch (_e) { /* ignore */ }
        });
    },

    _bindOnlineFlush() {
        window.addEventListener('online', () => {
            try { this.flush(); } catch (_e) { /* ignore */ }
        });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                try { this.flush(); } catch (_e) { /* ignore */ }
            }
        });
    }
};

if (typeof window !== 'undefined') {
    window.ClientErrorLog = ClientErrorLog;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ClientErrorLog.init());
    } else {
        ClientErrorLog.init();
    }
}
