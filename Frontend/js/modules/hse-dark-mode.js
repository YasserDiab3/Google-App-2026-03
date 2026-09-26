/**
 * HSE Dark Mode Module — ICAPP Safety System
 * الوضع الداكن التلقائي — تفعيل حسب الوقت أو تفضيل المستخدم
 * v1.0 — 2026-09-25
 * 
 * Usage: Include this script in <head>, it self-initializes on DOMContentLoaded.
 *   HseDarkMode.toggle()        — Cycle: auto → dark → light → auto
 *   HseDarkMode.getPreference() — Returns 'auto' | 'dark' | 'light'
 *   HseDarkMode.shouldBeDark()  — Returns boolean
 */
const HseDarkMode = (() => {
    'use strict';

    const STORAGE_KEY = 'HSE_DARK_MODE_PREF';
    const CAIRO_TZ = 'Africa/Cairo';
    const NIGHT_START = 18; // 6 PM
    const NIGHT_END = 6;    // 6 AM

    /* ── Dark Theme CSS ────────────────────────────────────── */
    const DARK_CSS = `
/* ═══════════ HSE Dark Mode Theme ═══════════ */
[data-theme="dark"] body {
    background: #0f172a !important;
    color: #e2e8f0 !important;
}
[data-theme="dark"] .app-header,
[data-theme="dark"] .header-bar,
[data-theme="dark"] header,
[data-theme="dark"] [class*="header"] {
    background: #1e293b !important;
    border-color: #334155 !important;
}
[data-theme="dark"] .form-card,
[data-theme="dark"] .card,
[data-theme="dark"] .stats-card,
[data-theme="dark"] .info-card,
[data-theme="dark"] .modal-content,
[data-theme="dark"] .modal-body,
[data-theme="dark"] [class*="card"] {
    background: #1e293b !important;
    border-color: #334155 !important;
    color: #e2e8f0 !important;
}
[data-theme="dark"] .form-group,
[data-theme="dark"] .form-section,
[data-theme="dark"] fieldset,
[data-theme="dark"] .section-card {
    background: #1e293b !important;
    border-color: #334155 !important;
}
[data-theme="dark"] input:not([type="checkbox"]):not([type="radio"]):not([type="range"]),
[data-theme="dark"] select,
[data-theme="dark"] textarea,
[data-theme="dark"] .form-control,
[data-theme="dark"] .input-control {
    background: #334155 !important;
    color: #f1f5f9 !important;
    border-color: #475569 !important;
}
[data-theme="dark"] input::placeholder,
[data-theme="dark"] textarea::placeholder {
    color: #64748b !important;
}
[data-theme="dark"] label,
[data-theme="dark"] .form-label,
[data-theme="dark"] .label {
    color: #cbd5e1 !important;
}
[data-theme="dark"] h1, [data-theme="dark"] h2, [data-theme="dark"] h3,
[data-theme="dark"] h4, [data-theme="dark"] h5, [data-theme="dark"] h6,
[data-theme="dark"] .title, [data-theme="dark"] .heading {
    color: #f1f5f9 !important;
}
[data-theme="dark"] p, [data-theme="dark"] span, [data-theme="dark"] div {
    color: inherit;
}
[data-theme="dark"] .text-muted,
[data-theme="dark"] .text-secondary,
[data-theme="dark"] small {
    color: #94a3b8 !important;
}
[data-theme="dark"] table {
    background: #1e293b !important;
    color: #e2e8f0 !important;
}
[data-theme="dark"] th {
    background: #334155 !important;
    color: #f1f5f9 !important;
    border-color: #475569 !important;
}
[data-theme="dark"] td {
    border-color: #334155 !important;
    color: #e2e8f0 !important;
}
[data-theme="dark"] tr:nth-child(even) {
    background: rgba(51, 65, 85, 0.3) !important;
}
[data-theme="dark"] tr:hover {
    background: rgba(51, 65, 85, 0.5) !important;
}
[data-theme="dark"] .modal,
[data-theme="dark"] .modal-overlay,
[data-theme="dark"] [class*="modal"] {
    background-color: rgba(0, 0, 0, 0.75);
}
[data-theme="dark"] .modal-content,
[data-theme="dark"] .modal-dialog {
    background: #1e293b !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6) !important;
}
[data-theme="dark"] .badge,
[data-theme="dark"] .tag {
    background: #334155 !important;
    color: #e2e8f0 !important;
}
[data-theme="dark"] hr {
    border-color: #334155 !important;
}
[data-theme="dark"] .photo-area,
[data-theme="dark"] .upload-area,
[data-theme="dark"] [class*="drop-zone"] {
    background: #1e293b !important;
    border-color: #475569 !important;
}
[data-theme="dark"] .alert,
[data-theme="dark"] .notice {
    background: #334155 !important;
    border-color: #475569 !important;
    color: #e2e8f0 !important;
}
[data-theme="dark"] ::-webkit-scrollbar {
    width: 8px;
}
[data-theme="dark"] ::-webkit-scrollbar-track {
    background: #1e293b;
}
[data-theme="dark"] ::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 4px;
}
[data-theme="dark"] footer,
[data-theme="dark"] .footer {
    background: #1e293b !important;
    border-color: #334155 !important;
    color: #94a3b8 !important;
}
/* Signature pad dark */
[data-theme="dark"] .signature-pad-canvas,
[data-theme="dark"] canvas[id*="signature"] {
    background: #f8fafc !important;
}
/* Keep colored buttons readable */
[data-theme="dark"] .btn-primary,
[data-theme="dark"] .btn-success,
[data-theme="dark"] .btn-danger,
[data-theme="dark"] .btn-warning,
[data-theme="dark"] [class*="btn-action"] {
    filter: brightness(0.9);
}
/* ISO Header & Success Screen Dark Mode Contrast Protection */
[data-theme="dark"] .iso-header-table,
[data-theme="dark"] .iso-brand-col,
[data-theme="dark"] .iso-title-col,
[data-theme="dark"] .iso-meta-col,
[data-theme="dark"] #successScreen,
[data-theme="dark"] .success-container,
[data-theme="dark"] #receiptContainer,
[data-theme="dark"] .receipt-box {
    background: #1e293b !important;
    border-color: #334155 !important;
    color: #f1f5f9 !important;
}
[data-theme="dark"] #refBadge {
    background: #0f172a !important;
    border-color: #3b82f6 !important;
    color: #60a5fa !important;
}
[data-theme="dark"] .receipt-row {
    border-color: #334155 !important;
}
[data-theme="dark"] .receipt-label {
    color: #94a3b8 !important;
}
[data-theme="dark"] .receipt-val {
    color: #f8fafc !important;
}
/* Dark mode toggle button styles */
.hse-dark-toggle {
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 99999;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 2px solid rgba(148, 163, 184, 0.3);
    background: rgba(30, 41, 59, 0.85);
    color: #fbbf24;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: all 0.3s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    line-height: 1;
    padding: 0;
}
.hse-dark-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
}
[data-theme="light"] .hse-dark-toggle {
    background: rgba(248, 250, 252, 0.9);
    color: #475569;
    border-color: rgba(203, 213, 225, 0.5);
}
.hse-dark-toggle .toggle-tooltip {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    background: #1e293b;
    color: #f1f5f9;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    font-family: 'Cairo', sans-serif;
}
.hse-dark-toggle:hover .toggle-tooltip {
    opacity: 1;
}
/* ═══════════ End Dark Mode Theme ═══════════ */
`;

    /* ── Time Check (Cairo Timezone) ──────────────────────── */
    function isNightTime() {
        try {
            const now = new Date();
            const cairoStr = now.toLocaleString('en-US', { timeZone: CAIRO_TZ, hour12: false });
            const hour = parseInt(cairoStr.split(',')[1].trim().split(':')[0], 10);
            return hour >= NIGHT_START || hour < NIGHT_END;
        } catch (e) {
            // Fallback: use local time
            const h = new Date().getHours();
            return h >= NIGHT_START || h < NIGHT_END;
        }
    }

    /* ── Preference Management ───────────────────────────── */
    function getPreference() {
        return localStorage.getItem(STORAGE_KEY) || 'light';
    }

    function setPreference(pref) {
        localStorage.setItem(STORAGE_KEY, pref);
    }

    function shouldBeDark() {
        const pref = getPreference();
        if (pref === 'dark') return true;
        if (pref === 'light') return false;
        // Auto mode: system preference first, then time-based
        try {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
        } catch (e) { /* ignore */ }
        return isNightTime();
    }

    /* ── Apply Theme ─────────────────────────────────────── */
    function apply() {
        const dark = shouldBeDark();
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        // Update theme-color meta
        const meta = document.getElementById('metaThemeColor') || document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', dark ? '#0f172a' : '#f8fafc');
        // Update toggle icon
        updateToggleIcon(dark);
    }

    /* ── Toggle (Cycle: auto → dark → light → auto) ────── */
    function toggle() {
        const current = getPreference();
        let next;
        if (current === 'auto') next = 'dark';
        else if (current === 'dark') next = 'light';
        else next = 'auto';
        setPreference(next);
        apply();
        // Show brief feedback
        showToggleFeedback(next);
        return next;
    }

    /* ── Render Toggle Button ────────────────────────────── */
    function renderToggle() {
        if (document.getElementById('hseDarkToggleBtn')) return;
        const btn = document.createElement('button');
        btn.id = 'hseDarkToggleBtn';
        btn.className = 'hse-dark-toggle';
        btn.setAttribute('aria-label', 'تبديل الوضع الداكن / الفاتح');
        btn.setAttribute('title', '');
        btn.innerHTML = `
            <span class="toggle-icon">🌙</span>
            <span class="toggle-tooltip">الوضع الداكن</span>
        `;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle();
        });
        document.body.appendChild(btn);
        updateToggleIcon(shouldBeDark());
    }

    function updateToggleIcon(isDark) {
        const btn = document.getElementById('hseDarkToggleBtn');
        if (!btn) return;
        const pref = getPreference();
        const iconSpan = btn.querySelector('.toggle-icon');
        const tooltipSpan = btn.querySelector('.toggle-tooltip');
        if (iconSpan) {
            if (pref === 'auto') iconSpan.textContent = isDark ? '🌙' : '☀️';
            else if (pref === 'dark') iconSpan.textContent = '🌙';
            else iconSpan.textContent = '☀️';
        }
        if (tooltipSpan) {
            const labels = {
                auto: isDark ? 'تلقائي (ليلي)' : 'تلقائي (نهاري)',
                dark: 'الوضع الداكن (يدوي)',
                light: 'الوضع الفاتح (يدوي)'
            };
            tooltipSpan.textContent = labels[pref] || '';
        }
    }

    function showToggleFeedback(pref) {
        const existing = document.getElementById('hseDarkFeedback');
        if (existing) existing.remove();

        const labels = {
            auto: '⚙️ تلقائي حسب الوقت',
            dark: '🌙 الوضع الداكن',
            light: '☀️ الوضع الفاتح'
        };
        const div = document.createElement('div');
        div.id = 'hseDarkFeedback';
        div.style.cssText = `
            position: fixed; top: 60px; left: 12px; z-index: 999999;
            background: #1e293b; color: #f1f5f9; padding: 8px 16px;
            border-radius: 10px; font-size: 13px; font-family: 'Cairo', sans-serif;
            font-weight: 600; box-shadow: 0 4px 16px rgba(0,0,0,0.3);
            opacity: 0; transform: translateY(-8px);
            transition: all 0.3s ease; direction: rtl;
        `;
        div.textContent = labels[pref] || pref;
        document.body.appendChild(div);
        requestAnimationFrame(() => {
            div.style.opacity = '1';
            div.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            div.style.opacity = '0';
            div.style.transform = 'translateY(-8px)';
            setTimeout(() => div.remove(), 300);
        }, 1800);
    }

    /* ── Inject CSS ──────────────────────────────────────── */
    function injectCSS() {
        if (document.getElementById('hse-dark-mode-css')) return;
        const style = document.createElement('style');
        style.id = 'hse-dark-mode-css';
        style.textContent = DARK_CSS;
        document.head.appendChild(style);
    }

    /* ── Initialize ──────────────────────────────────────── */
    function init() {
        injectCSS();
        apply();
        // Listen for system preference changes
        try {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (getPreference() === 'auto') apply();
            });
        } catch (e) { /* older browsers */ }
        // Re-check every 15 minutes for time-based auto switching
        setInterval(() => {
            if (getPreference() === 'auto') apply();
        }, 15 * 60 * 1000);
        // Render toggle button when body is ready
        if (document.body) {
            renderToggle();
        } else {
            document.addEventListener('DOMContentLoaded', renderToggle);
        }
    }

    /* ── Early apply (before DOMContentLoaded for no flash) */
    injectCSS();
    apply();

    /* ── Full init on DOMContentLoaded ──────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { init, toggle, apply, getPreference, shouldBeDark, isNightTime };
})();
