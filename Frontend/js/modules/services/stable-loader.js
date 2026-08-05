/**
 * عقد التحميل المستقر: عرض محلي فوري + جلب تبويب ظاهر + دمج آمن.
 * لا يغيّر مسارات الموديولات الثقيلة؛ يوفّر أدوات مشتركة فقط.
 */
(function () {
    'use strict';

    const DEFAULT_WORKERS = 3;
    const HEAVY_WORKERS = 2;
    const inflight = Object.create(null);
    let heavyDepth = 0;

    function hasGi() {
        return typeof GoogleIntegration !== 'undefined';
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

        beginOwnedFetch(moduleName) {
            heavyDepth += 1;
            if (hasGi()) {
                GoogleIntegration._maxQueueWorkers = HEAVY_WORKERS;
            }
            this.log(moduleName, 'queue', 'begin', { workers: HEAVY_WORKERS, depth: heavyDepth });
        },

        endOwnedFetch(moduleName) {
            heavyDepth = Math.max(0, heavyDepth - 1);
            if (hasGi() && heavyDepth === 0) {
                GoogleIntegration._maxQueueWorkers = DEFAULT_WORKERS;
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
                    this.log(key, 'fetch', 'done', { ms: Date.now() - started });
                    delete inflight[key];
                }
            })();
            return inflight[key];
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
