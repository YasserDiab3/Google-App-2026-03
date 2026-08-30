/**
 * عقد التحميل المستقر: عرض محلي فوري + جلب تبويب ظاهر + دمج آمن.
 * لا يغيّر مسارات الموديولات الثقيلة؛ يوفّر أدوات مشتركة فقط.
 */
(function () {
    'use strict';

    const DEFAULT_WORKERS = 3;
    const HEAVY_WORKERS = 2;
    const OWNED_FETCH_WATCHDOG_MS = 45000;
    const inflight = Object.create(null);
    const metrics = [];
    let heavyDepth = 0;
    let watchdogTimer = null;

    function hasGi() {
        return typeof GoogleIntegration !== 'undefined';
    }

    function pushMetric(entry) {
        metrics.push(entry);
        if (metrics.length > 40) metrics.shift();
    }

    const StableLoader = {
        hasLocalList(value) {
            return Array.isArray(value) && value.length > 0;
        },

        mergeNonEmpty(existing, incoming) {
            const oldList = Array.isArray(existing) ? existing : [];
            if (!Array.isArray(incoming)) return oldList;
            if (incoming.length === 0 && oldList.length > 0) return oldList;
            return incoming;
        },

        markPaint(moduleName, tab, extra) {
            const entry = {
                t: Date.now(),
                module: moduleName,
                tab: tab || '',
                phase: 'paint-local',
                extra: extra || {}
            };
            pushMetric(entry);
            this.log(moduleName, tab || 'ui', 'paint-local', extra || {});
        },

        beginOwnedFetch(moduleName) {
            heavyDepth += 1;
            if (hasGi()) {
                GoogleIntegration._maxQueueWorkers = HEAVY_WORKERS;
            }
            if (watchdogTimer) clearTimeout(watchdogTimer);
            watchdogTimer = setTimeout(() => {
                if (heavyDepth > 0) {
                    this.log(moduleName, 'queue', 'watchdog-release', { depth: heavyDepth });
                    heavyDepth = 0;
                    if (hasGi()) GoogleIntegration._maxQueueWorkers = DEFAULT_WORKERS;
                }
            }, OWNED_FETCH_WATCHDOG_MS);
            this.log(moduleName, 'queue', 'begin', { workers: HEAVY_WORKERS, depth: heavyDepth });
        },

        endOwnedFetch(moduleName) {
            heavyDepth = Math.max(0, heavyDepth - 1);
            if (heavyDepth === 0) {
                if (watchdogTimer) {
                    clearTimeout(watchdogTimer);
                    watchdogTimer = null;
                }
                if (hasGi()) GoogleIntegration._maxQueueWorkers = DEFAULT_WORKERS;
            }
            this.log(moduleName, 'queue', 'end', { workers: heavyDepth === 0 ? DEFAULT_WORKERS : HEAVY_WORKERS, depth: heavyDepth });
        },

        async runExclusive(key, task) {
            if (inflight[key]) return inflight[key];
            inflight[key] = (async () => {
                const started = Date.now();
                try {
                    return await task();
                } finally {
                    const ms = Date.now() - started;
                    pushMetric({ t: Date.now(), module: key, phase: 'fetch-done', ms });
                    this.log(key, 'fetch', 'done', { ms });
                    delete inflight[key];
                }
            })();
            return inflight[key];
        },

        async withUiTimeout(promise, timeoutMs, label) {
            let timer = null;
            const timeoutPromise = new Promise((_, reject) => {
                timer = setTimeout(() => reject(new Error(label || 'STABLE_LOADER_TIMEOUT')), timeoutMs);
            });
            try {
                return await Promise.race([promise, timeoutPromise]);
            } finally {
                if (timer) clearTimeout(timer);
            }
        },

        getMetrics() {
            return metrics.slice();
        },

        log(moduleName, tab, phase, extra) {
            try {
                if (typeof AppState === 'undefined' || !AppState.debugMode) return;
                if (typeof Utils !== 'undefined' && typeof Utils.safeLog === 'function') {
                    Utils.safeLog('[StableLoader]', moduleName, tab, phase, extra || {});
                }
            } catch (_e) { /* ignore */ }
        }
    };

    if (hasGi() && typeof GoogleIntegration._maxQueueWorkers === 'number') {
        GoogleIntegration._maxQueueWorkers = DEFAULT_WORKERS;
    }

    window.StableLoader = StableLoader;
})();
