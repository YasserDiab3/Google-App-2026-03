/**
 * HSE Offline Sync Module — ICAPP Safety System
 * العمل بدون إنترنت — حفظ ومزامنة تلقائية عبر IndexedDB
 * v1.0 — 2026-09-25
 *
 * Usage:
 *   HseOfflineSync.saveSubmission(formType, payload, apiUrl)  → Promise<id>
 *   HseOfflineSync.syncAll()                                   → Promise<{synced, failed}>
 *   HseOfflineSync.getPendingCount()                           → Promise<number>
 *   HseOfflineSync.renderStatusBadge(container)                → void
 *   HseOfflineSync.isOnline()                                  → boolean
 */
const HseOfflineSync = (() => {
    'use strict';

    const DB_NAME = 'HSE_OFFLINE_DB';
    const DB_VERSION = 1;
    const STORE_PENDING = 'pending_submissions';
    const STORE_SYNCED = 'synced_log';
    const SYNC_RETRY_INTERVAL_MS = 60 * 1000; // Retry every 60 seconds
    const MAX_RETRIES = 10;
    const BADGE_UPDATE_INTERVAL_MS = 15 * 1000;

    let _db = null;
    let _syncInterval = null;
    let _badgeInterval = null;
    let _online = navigator.onLine;

    /* ═══════════ IndexedDB Setup ═══════════ */
    function _openDB() {
        return new Promise((resolve, reject) => {
            if (_db) { resolve(_db); return; }
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Pending submissions store
                if (!db.objectStoreNames.contains(STORE_PENDING)) {
                    const pending = db.createObjectStore(STORE_PENDING, { keyPath: 'id', autoIncrement: true });
                    pending.createIndex('formType', 'formType', { unique: false });
                    pending.createIndex('status', 'status', { unique: false });
                    pending.createIndex('createdAt', 'createdAt', { unique: false });
                }

                // Synced log store (history)
                if (!db.objectStoreNames.contains(STORE_SYNCED)) {
                    const synced = db.createObjectStore(STORE_SYNCED, { keyPath: 'id', autoIncrement: true });
                    synced.createIndex('syncedAt', 'syncedAt', { unique: false });
                }
            };

            request.onsuccess = (event) => {
                _db = event.target.result;
                _db.onclose = () => { _db = null; };
                resolve(_db);
            };

            request.onerror = (event) => {
                console.error('[HSE-Offline] Failed to open IndexedDB:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    /* ═══════════ Save Submission ═══════════ */
    async function saveSubmission(formType, payload, apiUrl) {
        const db = await _openDB();
        const record = {
            formType: formType,
            payload: payload,
            apiUrl: apiUrl || _getDefaultApiUrl(),
            status: 'pending',   // pending | syncing | synced | failed
            retries: 0,
            createdAt: new Date().toISOString(),
            lastAttempt: null,
            error: null
        };

        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_PENDING, 'readwrite');
            const store = tx.objectStore(STORE_PENDING);
            const req = store.add(record);
            req.onsuccess = () => {
                const id = req.result;
                console.log(`[HSE-Offline] Saved submission #${id} (${formType})`);
                _updateBadge();

                // Try to sync immediately if online
                if (_online) {
                    _syncRecord(id).catch(() => {});
                }
                resolve(id);
            };
            req.onerror = () => reject(req.error);
        });
    }

    /* ═══════════ Smart Submit (Online → Direct, Offline → Queue) ═══════════ */
    async function smartSubmit(formType, payload, apiUrl) {
        const url = apiUrl || _getDefaultApiUrl();

        if (_online) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    redirect: 'follow',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(`[HSE-Offline] Direct submit OK (${formType})`);
                    // Log to synced history
                    _logSynced(formType, payload);
                    return { mode: 'direct', success: true, result };
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (err) {
                console.warn(`[HSE-Offline] Direct submit failed, queuing (${formType}):`, err.message);
                const id = await saveSubmission(formType, payload, url);
                return { mode: 'queued', success: false, pendingId: id, error: err.message };
            }
        } else {
            // Offline: queue immediately
            const id = await saveSubmission(formType, payload, url);
            _showOfflineToast(formType);
            return { mode: 'queued', success: false, pendingId: id, error: 'offline' };
        }
    }

    /* ═══════════ Sync All Pending ═══════════ */
    async function syncAll() {
        if (!_online) return { synced: 0, failed: 0, remaining: await getPendingCount() };

        const db = await _openDB();
        const records = await _getAllPending(db);
        let synced = 0, failed = 0;

        for (const record of records) {
            if (record.status === 'syncing') continue; // Skip in-progress
            try {
                await _syncRecord(record.id);
                synced++;
            } catch (e) {
                failed++;
            }
        }

        _updateBadge();
        const remaining = await getPendingCount();

        if (synced > 0) {
            _showSyncToast(synced, failed, remaining);
        }

        console.log(`[HSE-Offline] Sync complete: ${synced} synced, ${failed} failed, ${remaining} remaining`);
        return { synced, failed, remaining };
    }

    /* ═══════════ Sync Single Record ═══════════ */
    async function _syncRecord(id) {
        const db = await _openDB();

        // Get record
        const record = await new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_PENDING, 'readonly');
            const req = tx.objectStore(STORE_PENDING).get(id);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });

        if (!record || record.status === 'synced') return;
        if (record.retries >= MAX_RETRIES) {
            await _updateRecord(id, { status: 'failed', error: 'Max retries exceeded' });
            throw new Error('Max retries exceeded');
        }

        // Mark as syncing
        await _updateRecord(id, { status: 'syncing', lastAttempt: new Date().toISOString() });

        try {
            const response = await fetch(record.apiUrl, {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(record.payload)
            });

            if (response.ok) {
                // Remove from pending, add to synced log
                await _deleteRecord(id);
                _logSynced(record.formType, record.payload);
                console.log(`[HSE-Offline] Record #${id} synced successfully`);
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (err) {
            await _updateRecord(id, {
                status: 'pending',
                retries: (record.retries || 0) + 1,
                error: err.message
            });
            throw err;
        }
    }

    /* ═══════════ IDB Helpers ═══════════ */
    function _getAllPending(db) {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_PENDING, 'readonly');
            const store = tx.objectStore(STORE_PENDING);
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject(req.error);
        });
    }

    function _updateRecord(id, updates) {
        return new Promise(async (resolve, reject) => {
            const db = await _openDB();
            const tx = db.transaction(STORE_PENDING, 'readwrite');
            const store = tx.objectStore(STORE_PENDING);
            const getReq = store.get(id);
            getReq.onsuccess = () => {
                const record = getReq.result;
                if (!record) { resolve(); return; }
                Object.assign(record, updates);
                const putReq = store.put(record);
                putReq.onsuccess = () => resolve();
                putReq.onerror = () => reject(putReq.error);
            };
            getReq.onerror = () => reject(getReq.error);
        });
    }

    function _deleteRecord(id) {
        return new Promise(async (resolve, reject) => {
            const db = await _openDB();
            const tx = db.transaction(STORE_PENDING, 'readwrite');
            const req = tx.objectStore(STORE_PENDING).delete(id);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        });
    }

    function _logSynced(formType, payload) {
        _openDB().then(db => {
            const tx = db.transaction(STORE_SYNCED, 'readwrite');
            tx.objectStore(STORE_SYNCED).add({
                formType,
                syncedAt: new Date().toISOString(),
                summary: _getPayloadSummary(payload)
            });
        }).catch(() => {});
    }

    function _getPayloadSummary(payload) {
        try {
            const p = typeof payload === 'string' ? JSON.parse(payload) : payload;
            return {
                action: p.action || '',
                employeeCode: p.employeeCode || p.observerCode || '',
                site: p.site || p.factory || ''
            };
        } catch (e) { return {}; }
    }

    /* ═══════════ Pending Count ═══════════ */
    async function getPendingCount() {
        try {
            const db = await _openDB();
            return new Promise((resolve) => {
                const tx = db.transaction(STORE_PENDING, 'readonly');
                const req = tx.objectStore(STORE_PENDING).count();
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => resolve(0);
            });
        } catch (e) { return 0; }
    }

    async function getPendingList() {
        try {
            const db = await _openDB();
            return _getAllPending(db);
        } catch (e) { return []; }
    }

    /* ═══════════ Network Status ═══════════ */
    function isOnline() { return _online; }

    function _setupNetworkListeners() {
        window.addEventListener('online', () => {
            _online = true;
            console.log('[HSE-Offline] 🟢 Back online — starting sync...');
            _updateBadge();
            // Auto-sync with small delay
            setTimeout(() => syncAll(), 2000);
        });

        window.addEventListener('offline', () => {
            _online = false;
            console.log('[HSE-Offline] 🔴 Went offline');
            _updateBadge();
        });
    }

    /* ═══════════ Status Badge ═══════════ */
    function renderStatusBadge(container) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        if (!container) return;

        let badge = document.getElementById('hseOfflineBadge');
        if (!badge) {
            badge = document.createElement('div');
            badge.id = 'hseOfflineBadge';
            badge.style.cssText = `
                display: inline-flex; align-items: center; gap: 6px;
                padding: 6px 12px; border-radius: 8px; font-size: 12px;
                font-family: 'Cairo', sans-serif; font-weight: 600;
                cursor: pointer; transition: all 0.3s ease;
                direction: rtl;
            `;
            badge.addEventListener('click', () => {
                if (_online) syncAll();
                else _showOfflineToast('manual-sync');
            });
            container.appendChild(badge);
        }

        _updateBadgeElement(badge);

        // Auto-update badge periodically
        if (!_badgeInterval) {
            _badgeInterval = setInterval(() => _updateBadge(), BADGE_UPDATE_INTERVAL_MS);
        }
    }

    async function _updateBadge() {
        const badge = document.getElementById('hseOfflineBadge');
        if (badge) _updateBadgeElement(badge);
        // Also update fixed badge
        const fixed = document.getElementById('hseOfflineFixedBadge');
        if (fixed) _updateFixedBadge(fixed);
    }

    async function _updateBadgeElement(badge) {
        const count = await getPendingCount();
        if (_online) {
            if (count > 0) {
                badge.style.background = '#fef3c7';
                badge.style.color = '#92400e';
                badge.style.border = '1px solid #fbbf24';
                badge.innerHTML = `<span style="font-size:14px">⏳</span> ${count} نماذج معلقة — اضغط للمزامنة`;
                badge.title = 'اضغط لمزامنة النماذج المعلقة';
            } else {
                badge.style.background = '#ecfdf5';
                badge.style.color = '#065f46';
                badge.style.border = '1px solid #6ee7b7';
                badge.innerHTML = `<span style="font-size:14px">🟢</span> متصل`;
                badge.title = 'الاتصال مستقر';
            }
        } else {
            badge.style.background = '#fef2f2';
            badge.style.color = '#991b1b';
            badge.style.border = '1px solid #fca5a5';
            badge.innerHTML = `<span style="font-size:14px">🔴</span> غير متصل${count > 0 ? ` (${count} معلقة)` : ''}`;
            badge.title = 'غير متصل — سيتم المزامنة تلقائياً عند عودة الإنترنت';
        }
    }

    /* ═══════════ Fixed Floating Badge ═══════════ */
    function renderFixedBadge() {
        if (document.getElementById('hseOfflineFixedBadge')) return;

        const badge = document.createElement('div');
        badge.id = 'hseOfflineFixedBadge';
        badge.style.cssText = `
            position: fixed; bottom: 16px; right: 16px; z-index: 99998;
            display: none; align-items: center; gap: 6px;
            padding: 8px 14px; border-radius: 10px; font-size: 12px;
            font-family: 'Cairo', sans-serif; font-weight: 700;
            cursor: pointer; direction: rtl;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
            transition: all 0.3s ease;
        `;
        badge.addEventListener('click', () => {
            if (_online) syncAll();
        });
        document.body.appendChild(badge);
        _updateFixedBadge(badge);
    }

    async function _updateFixedBadge(badge) {
        const count = await getPendingCount();

        // Only show when offline or has pending items
        if (!_online || count > 0) {
            badge.style.display = 'inline-flex';

            if (!_online) {
                badge.style.background = 'rgba(239, 68, 68, 0.95)';
                badge.style.color = '#fff';
                badge.innerHTML = `🔴 غير متصل${count > 0 ? ` | ${count} معلقة` : ''}`;
            } else if (count > 0) {
                badge.style.background = 'rgba(245, 158, 11, 0.95)';
                badge.style.color = '#fff';
                badge.innerHTML = `⏳ ${count} نماذج معلقة — اضغط للمزامنة`;
            }
        } else {
            badge.style.display = 'none';
        }
    }

    /* ═══════════ Toast Notifications ═══════════ */
    function _showOfflineToast(formType) {
        _showToast(
            '📴 تم الحفظ محلياً',
            'النموذج محفوظ على جهازك وسيتم إرساله تلقائياً عند عودة الإنترنت.',
            '#f59e0b'
        );
    }

    function _showSyncToast(synced, failed, remaining) {
        if (synced > 0 && failed === 0) {
            _showToast(
                '✅ تمت المزامنة',
                `تم إرسال ${synced} نموذج بنجاح${remaining > 0 ? ` (${remaining} متبقية)` : ''}`,
                '#10b981'
            );
        } else if (failed > 0) {
            _showToast(
                '⚠️ مزامنة جزئية',
                `نجح ${synced} | فشل ${failed} | متبقي ${remaining}`,
                '#f59e0b'
            );
        }
    }

    function _showToast(title, message, color) {
        const existing = document.getElementById('hseOfflineToast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'hseOfflineToast';
        toast.style.cssText = `
            position: fixed; bottom: 70px; right: 16px; z-index: 999999;
            max-width: 340px; padding: 12px 16px; direction: rtl;
            background: #1e293b; color: #f1f5f9; border-radius: 10px;
            font-family: 'Cairo', sans-serif; font-size: 13px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            border-right: 4px solid ${color};
            opacity: 0; transform: translateY(10px);
            transition: all 0.3s ease;
        `;
        toast.innerHTML = `
            <div style="font-weight:800;margin-bottom:2px;">${title}</div>
            <div style="font-size:11px;opacity:0.85;">${message}</div>
        `;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    /* ═══════════ API URL ═══════════ */
    function _getDefaultApiUrl() {
        if (window.API_BASE_URL) return window.API_BASE_URL + '/api/exec';
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1') {
            return `${window.location.protocol}//${host}:3000/api/exec`;
        }
        return window.location.origin + '/api/exec';
    }

    /* ═══════════ Auto-Sync Timer ═══════════ */
    function _startSyncTimer() {
        if (_syncInterval) return;
        _syncInterval = setInterval(async () => {
            if (_online) {
                const count = await getPendingCount();
                if (count > 0) {
                    console.log(`[HSE-Offline] Auto-sync: ${count} pending items`);
                    syncAll();
                }
            }
        }, SYNC_RETRY_INTERVAL_MS);
    }

    /* ═══════════ Background Sync Registration ═══════════ */
    async function _registerBackgroundSync() {
        try {
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                const reg = await navigator.serviceWorker.ready;
                await reg.sync.register('hse-offline-sync');
                console.log('[HSE-Offline] Background Sync registered');
            }
        } catch (e) {
            console.log('[HSE-Offline] Background Sync not supported, using timer fallback');
        }
    }

    /* ═══════════ Clear All Pending (Manual) ═══════════ */
    async function clearPending() {
        const db = await _openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_PENDING, 'readwrite');
            const req = tx.objectStore(STORE_PENDING).clear();
            req.onsuccess = () => { _updateBadge(); resolve(); };
            req.onerror = () => reject(req.error);
        });
    }

    /* ═══════════ Initialize ═══════════ */
    async function init() {
        try {
            await _openDB();
            _setupNetworkListeners();
            _startSyncTimer();
            _registerBackgroundSync();

            // Render fixed badge when body is ready
            if (document.body) {
                renderFixedBadge();
            } else {
                document.addEventListener('DOMContentLoaded', renderFixedBadge);
            }

            // Sync any pending items on load
            if (_online) {
                setTimeout(() => syncAll(), 5000);
            }

            console.log('[HSE-Offline] Module initialized. Online:', _online);
        } catch (e) {
            console.error('[HSE-Offline] Init failed:', e);
        }
    }

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        saveSubmission,
        smartSubmit,
        syncAll,
        getPendingCount,
        getPendingList,
        renderStatusBadge,
        renderFixedBadge,
        isOnline,
        clearPending
    };
})();
