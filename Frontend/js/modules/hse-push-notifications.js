/**
 * HSE Push Notifications Module — ICAPP Safety System
 * إشعارات Push للمتابعة والتذكيرات
 * v1.0 — 2026-09-25
 *
 * Usage:
 *   HsePushNotify.requestPermission()                       → Promise<'granted'|'denied'>
 *   HsePushNotify.showNotification(title, body, options)    → void
 *   HsePushNotify.scheduleReminder(title, body, delayMs)    → timerId
 *   HsePushNotify.cancelReminder(timerId)                    → void
 *   HsePushNotify.getPermissionStatus()                      → string
 *   HsePushNotify.setInspectionReminder(deviceId, nextDate)  → void
 */
const HsePushNotify = (() => {
    'use strict';

    const REMINDERS_KEY = 'HSE_PUSH_REMINDERS';
    const PERMISSION_ASKED_KEY = 'HSE_PUSH_PERMISSION_ASKED';
    const SUBSCRIPTION_KEY = 'HSE_PUSH_SUBSCRIPTION';
    let _activeTimers = {};

    /* ═══════════ Permission Management ═══════════ */
    function getPermissionStatus() {
        if (!('Notification' in window)) return 'unsupported';
        return Notification.permission; // 'granted', 'denied', 'default'
    }

    async function requestPermission() {
        if (!('Notification' in window)) {
            console.warn('[HSE-Push] Notifications not supported');
            return 'unsupported';
        }

        if (Notification.permission === 'granted') return 'granted';
        if (Notification.permission === 'denied') return 'denied';

        try {
            const result = await Notification.requestPermission();
            localStorage.setItem(PERMISSION_ASKED_KEY, 'true');
            console.log('[HSE-Push] Permission result:', result);

            if (result === 'granted') {
                // Show welcome notification
                showNotification(
                    '🔔 تم تفعيل الإشعارات',
                    'ستتلقى تنبيهات الفحص الدوري ومتابعة البلاغات المفتوحة.',
                    { icon: 'icons/icapp-logo.png', tag: 'welcome' }
                );

                // Try to subscribe to push service
                _subscribeToPush();
            }

            return result;
        } catch (e) {
            console.error('[HSE-Push] Permission request failed:', e);
            return 'error';
        }
    }

    /* ═══════════ Show Notification ═══════════ */
    function showNotification(title, body, options = {}) {
        if (getPermissionStatus() !== 'granted') return;

        const defaultOptions = {
            icon: 'icons/icapp-logo.png',
            badge: 'icons/icapp-logo.png',
            dir: 'rtl',
            lang: 'ar',
            vibrate: [200, 100, 200],
            requireInteraction: false,
            silent: false,
            ...options
        };

        try {
            // Try Service Worker notification first (works when app is in background)
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.ready.then(reg => {
                    reg.showNotification(title, {
                        body,
                        ...defaultOptions
                    });
                });
            } else {
                // Fallback to regular Notification API
                new Notification(title, {
                    body,
                    ...defaultOptions
                });
            }
        } catch (e) {
            console.error('[HSE-Push] Failed to show notification:', e);
        }
    }

    /* ═══════════ Schedule Reminder ═══════════ */
    function scheduleReminder(title, body, delayMs, options = {}) {
        const id = 'rem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

        const timer = setTimeout(() => {
            showNotification(title, body, options);
            _removeStoredReminder(id);
            delete _activeTimers[id];

            // Log audit
            if (typeof HseDeviceAudit !== 'undefined') {
                HseDeviceAudit.logAction('notification_fired', { title, type: 'reminder' });
            }
        }, delayMs);

        _activeTimers[id] = timer;

        // Store reminder info for persistence
        _storeReminder({
            id,
            title,
            body,
            fireAt: new Date(Date.now() + delayMs).toISOString(),
            options,
            created: new Date().toISOString()
        });

        console.log(`[HSE-Push] Reminder "${title}" scheduled for ${Math.round(delayMs / 60000)} minutes`);
        return id;
    }

    function cancelReminder(id) {
        if (_activeTimers[id]) {
            clearTimeout(_activeTimers[id]);
            delete _activeTimers[id];
        }
        _removeStoredReminder(id);
    }

    /* ═══════════ Inspection Reminders ═══════════ */
    function setInspectionReminder(deviceId, deviceName, nextDate) {
        const now = new Date();
        const target = new Date(nextDate);
        const diffMs = target.getTime() - now.getTime();

        if (diffMs <= 0) {
            // Overdue — notify immediately
            showNotification(
                '⚠️ فحص متأخر!',
                `موعد فحص ${deviceName} (${deviceId}) قد مر. يرجى الفحص فوراً.`,
                { tag: `inspection-${deviceId}`, requireInteraction: true }
            );
            return null;
        }

        // Set reminder 1 day before
        const oneDayBefore = diffMs - (24 * 60 * 60 * 1000);
        if (oneDayBefore > 0) {
            scheduleReminder(
                `🔔 تذكير فحص غداً`,
                `موعد فحص ${deviceName} (${deviceId}) غداً. تأكد من الاستعداد.`,
                oneDayBefore,
                { tag: `inspection-pre-${deviceId}` }
            );
        }

        // Set reminder on the day
        return scheduleReminder(
            `🧯 موعد فحص اليوم`,
            `حان موعد فحص ${deviceName} (${deviceId}). ابدأ الفحص الآن.`,
            diffMs,
            { tag: `inspection-${deviceId}`, requireInteraction: true }
        );
    }

    /* ═══════════ Follow-up Reminders ═══════════ */
    function setFollowUpReminder(reportId, reportType, hoursDelay = 24) {
        const delayMs = hoursDelay * 60 * 60 * 1000;
        return scheduleReminder(
            '📋 متابعة بلاغ مفتوح',
            `البلاغ رقم ${reportId} (${reportType}) لم يُغلق بعد. يرجى المتابعة.`,
            delayMs,
            { tag: `followup-${reportId}`, requireInteraction: true }
        );
    }

    /* ═══════════ Shift Reminder ═══════════ */
    function setShiftReminder(shiftName, startTime) {
        const now = new Date();
        const target = new Date();
        const [hours, minutes] = startTime.split(':').map(Number);
        target.setHours(hours, minutes, 0, 0);

        // If time has passed today, set for tomorrow
        if (target <= now) {
            target.setDate(target.getDate() + 1);
        }

        // Remind 15 minutes before shift
        const diffMs = target.getTime() - now.getTime() - (15 * 60 * 1000);
        if (diffMs <= 0) return null;

        return scheduleReminder(
            `⏰ وردية ${shiftName} تبدأ قريباً`,
            `وردية ${shiftName} تبدأ في 15 دقيقة. استعد للمرور الميداني.`,
            diffMs,
            { tag: `shift-${shiftName}` }
        );
    }

    /* ═══════════ Reminder Storage ═══════════ */
    function _storeReminder(reminder) {
        try {
            const reminders = JSON.parse(localStorage.getItem(REMINDERS_KEY) || '[]');
            reminders.push(reminder);
            localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
        } catch (e) { /* ignore */ }
    }

    function _removeStoredReminder(id) {
        try {
            let reminders = JSON.parse(localStorage.getItem(REMINDERS_KEY) || '[]');
            reminders = reminders.filter(r => r.id !== id);
            localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
        } catch (e) { /* ignore */ }
    }

    function _restoreReminders() {
        try {
            const reminders = JSON.parse(localStorage.getItem(REMINDERS_KEY) || '[]');
            const now = Date.now();
            let restored = 0;

            reminders.forEach(r => {
                const fireAt = new Date(r.fireAt).getTime();
                const remaining = fireAt - now;

                if (remaining > 0) {
                    // Re-schedule
                    const timer = setTimeout(() => {
                        showNotification(r.title, r.body, r.options || {});
                        _removeStoredReminder(r.id);
                        delete _activeTimers[r.id];
                    }, remaining);
                    _activeTimers[r.id] = timer;
                    restored++;
                } else {
                    // Expired — remove
                    _removeStoredReminder(r.id);
                }
            });

            if (restored > 0) {
                console.log(`[HSE-Push] Restored ${restored} pending reminders`);
            }
        } catch (e) { /* ignore */ }
    }

    function getActiveReminders() {
        try {
            const reminders = JSON.parse(localStorage.getItem(REMINDERS_KEY) || '[]');
            return reminders.filter(r => new Date(r.fireAt).getTime() > Date.now());
        } catch (e) { return []; }
    }

    /* ═══════════ Push Subscription ═══════════ */
    async function _subscribeToPush() {
        try {
            if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

            const reg = await navigator.serviceWorker.ready;
            const existing = await reg.pushManager.getSubscription();
            if (existing) {
                _saveSubscription(existing);
                return existing;
            }

            // Note: VAPID public key would need to be configured for server push
            // For now, we store the subscription capability for future use
            console.log('[HSE-Push] Push subscription ready for VAPID configuration');
        } catch (e) {
            console.log('[HSE-Push] Push subscription not available:', e.message);
        }
    }

    function _saveSubscription(subscription) {
        try {
            localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscription.toJSON()));
            // Send to backend
            const payload = JSON.stringify({
                action: 'fieldPortalPushSubscribe',
                subscription: subscription.toJSON(),
                employeeCode: JSON.parse(localStorage.getItem('FIELD_SESSION_KEY') || '{}').employeeCode || ''
            });
            const baseUrl = window.API_BASE_URL || window.location.origin;
            if (navigator.sendBeacon) {
                navigator.sendBeacon(baseUrl + '/api/exec', payload);
            }
        } catch (e) { /* ignore */ }
    }

    /* ═══════════ Permission Prompt UI ═══════════ */
    function renderPermissionPrompt(container) {
        if (typeof container === 'string') container = document.getElementById(container);
        if (!container) return;
        if (getPermissionStatus() === 'granted') return;
        if (getPermissionStatus() === 'unsupported') return;
        if (localStorage.getItem(PERMISSION_ASKED_KEY) === 'true') return;

        const prompt = document.createElement('div');
        prompt.id = 'hsePushPrompt';
        prompt.style.cssText = `
            background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);
            color: white; padding: 12px 16px; border-radius: 10px;
            margin: 8px 0; font-family: 'Cairo', sans-serif;
            display: flex; align-items: center; gap: 10px; direction: rtl;
            box-shadow: 0 2px 12px rgba(30,64,175,0.3);
        `;
        prompt.innerHTML = `
            <span style="font-size:24px;">🔔</span>
            <div style="flex:1;">
                <div style="font-weight:800;font-size:13px;">تفعيل إشعارات التذكير</div>
                <div style="font-size:11px;opacity:0.85;">تلقّ تنبيهات مواعيد الفحص ومتابعة البلاغات</div>
            </div>
            <button onclick="HsePushNotify.requestPermission().then(() => this.closest('#hsePushPrompt')?.remove())"
                style="background:rgba(255,255,255,0.2);color:white;border:1px solid rgba(255,255,255,0.3);
                padding:6px 14px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;
                font-family:'Cairo',sans-serif;">
                تفعيل
            </button>
            <button onclick="this.closest('#hsePushPrompt').remove();localStorage.setItem('${PERMISSION_ASKED_KEY}','true')"
                style="background:none;border:none;color:rgba(255,255,255,0.6);cursor:pointer;font-size:14px;padding:4px;">
                ✕
            </button>
        `;
        container.prepend(prompt);
    }

    /* ═══════════ Initialize ═══════════ */
    function init() {
        // Restore saved reminders
        _restoreReminders();

        // Render permission prompt if needed
        if (document.body && getPermissionStatus() === 'default') {
            // Delay prompt to not interfere with page load
            setTimeout(() => {
                const mainContainer = document.querySelector('.container, .main-content, main, [role="main"]');
                if (mainContainer) renderPermissionPrompt(mainContainer);
            }, 3000);
        }

        console.log('[HSE-Push] Module initialized. Permission:', getPermissionStatus());
    }

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        requestPermission,
        showNotification,
        scheduleReminder,
        cancelReminder,
        setInspectionReminder,
        setFollowUpReminder,
        setShiftReminder,
        getPermissionStatus,
        getActiveReminders,
        renderPermissionPrompt
    };
})();
