/**
 * OfflineBanner — بانر اتصال مرئي لكل المستخدمين (ليس للأدمن فقط)
 * - انقطاع المتصفح (navigator.onLine)
 * - تعذر الوصول للخادم (إشارة من ConnectionMonitor)
 */
(function (global) {
    'use strict';

    const BANNER_ID = 'hse-offline-banner';
    const BODY_CLASS = 'hse-has-offline-banner';
    const MSG_ID = 'hse-offline-banner-msg';

    const OfflineBanner = {
        _inited: false,
        _browserOffline: false,
        _backendOffline: false,
        _lightStorage: false,
        _lastToastKey: '',

        t(key, fallback) {
            try {
                if (typeof AppI18n !== 'undefined' && typeof AppI18n.t === 'function') {
                    return AppI18n.t(key, null, fallback != null ? String(fallback) : '');
                }
            } catch (_e) { /* ignore */ }
            return fallback != null ? String(fallback) : '';
        },

        isEn() {
            try {
                if (typeof AppI18n !== 'undefined' && AppI18n.getLang) {
                    return String(AppI18n.getLang()).toLowerCase().startsWith('en');
                }
                const lang = document.documentElement.getAttribute('lang') || '';
                return lang.toLowerCase().startsWith('en');
            } catch (_e) {
                return false;
            }
        },

        ensureDom() {
            let el = document.getElementById(BANNER_ID);
            if (!el) {
                el = document.createElement('div');
                el.id = BANNER_ID;
                el.className = 'hse-offline-banner';
                el.setAttribute('role', 'status');
                el.setAttribute('aria-live', 'polite');
                el.innerHTML = '<span class="hse-offline-banner__icon" aria-hidden="true"><i class="fas fa-wifi"></i></span>'
                    + '<span id="' + MSG_ID + '" class="hse-offline-banner__msg"></span>';
                document.body.insertBefore(el, document.body.firstChild);
            }
            if (!document.getElementById(MSG_ID)) {
                const span = document.createElement('span');
                span.id = MSG_ID;
                span.className = 'hse-offline-banner__msg';
                el.appendChild(span);
            }
            el.classList.add('hse-offline-banner');
            return el;
        },

        messageForState() {
            const en = this.isEn();
            if (this._browserOffline) {
                return en
                    ? this.t('common.offline.browser', 'You are offline — viewing local data; save and sync need a connection.')
                    : this.t('common.offline.browser', 'أنت غير متصل بالإنترنت — العرض من البيانات المحلية؛ الحفظ والمزامنة يحتاجان اتصالاً.');
            }
            if (this._backendOffline) {
                return en
                    ? this.t('common.offline.backend', 'Server unreachable — working locally for now; saves may be delayed until connection returns.')
                    : this.t('common.offline.backend', 'تعذر الوصول للخادم — العمل محلياً مؤقتاً؛ الحفظ قد يتأخر حتى عودة الاتصال.');
            }
            if (this._lightStorage) {
                return en
                    ? this.t('common.storage.light', 'Local copy is shortened (storage limit) — full data stays in memory / Google Sheets.')
                    : this.t('common.storage.light', 'النسخة المحلية مختصرة (حد التخزين) — البيانات الكاملة في الذاكرة / Google Sheets.');
            }
            return '';
        },

        sync() {
            try {
                this._browserOffline = (typeof navigator !== 'undefined' && navigator.onLine === false);
                const el = this.ensureDom();
                const msgEl = document.getElementById(MSG_ID);
                const show = this._browserOffline || this._backendOffline || this._lightStorage;
                const msg = this.messageForState();

                if (msgEl) msgEl.textContent = msg;
                el.setAttribute(
                    'data-mode',
                    this._browserOffline ? 'browser' : (this._backendOffline ? 'backend' : (this._lightStorage ? 'light' : 'ok'))
                );
                el.classList.toggle('is-visible', show);
                el.style.display = show ? 'flex' : 'none';
                document.body.classList.toggle(BODY_CLASS, show);

                if (show) {
                    const toastKey = this._browserOffline ? 'browser' : (this._backendOffline ? 'backend' : 'light');
                    if (toastKey !== this._lastToastKey) {
                        this._lastToastKey = toastKey;
                        this.notifyOnce(msg);
                    }
                } else {
                    this._lastToastKey = '';
                }
            } catch (_e) { /* ignore */ }
        },

        notifyOnce(msg) {
            try {
                if (typeof Notification !== 'undefined' && typeof Notification.warning === 'function') {
                    Notification.warning(msg, { duration: 5000 });
                }
            } catch (_e) { /* ignore */ }
        },

        setBackendOffline(isOffline) {
            this._backendOffline = !!isOffline;
            this.sync();
        },

        /** P4.2: نسخة localStorage مخففة بسبب Quota / الحجم */
        setLightLocalData(isLight) {
            this._lightStorage = !!isLight;
            this.sync();
        },

        init() {
            if (this._inited) {
                this.sync();
                return;
            }
            this._inited = true;
            this.ensureDom();

            const onNet = () => this.sync();
            window.addEventListener('online', onNet);
            window.addEventListener('offline', onNet);
            window.addEventListener('hse:backend-connection', (ev) => {
                try {
                    const detail = ev && ev.detail ? ev.detail : {};
                    if (typeof detail.connected === 'boolean') {
                        this.setBackendOffline(!detail.connected);
                    }
                } catch (_e) { /* ignore */ }
            });
            window.addEventListener('languageChanged', () => this.sync());
            window.addEventListener('hse:language-changed', () => this.sync());

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.sync());
            } else {
                this.sync();
            }
        }
    };

    global.OfflineBanner = OfflineBanner;
    try {
        OfflineBanner.init();
    } catch (_e) { /* ignore */ }
})(typeof window !== 'undefined' ? window : this);
