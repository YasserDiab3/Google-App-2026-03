const HseDarkMode=(()=>{"use strict";const c="HSE_DARK_MODE_PREF",b="Africa/Cairo",g=`
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 HSE Dark Mode Theme \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
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
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 End Dark Mode Theme \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
`;function m(){try{const e=new Date().toLocaleString("en-US",{timeZone:b,hour12:!1}),r=parseInt(e.split(",")[1].trim().split(":")[0],10);return r>=18||r<6}catch{const e=new Date().getHours();return e>=18||e<6}}function o(){return localStorage.getItem(c)||"light"}function u(t){localStorage.setItem(c,t)}function n(){const t=o();if(t==="dark")return!0;if(t==="light")return!1;try{if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return!0}catch{}return m()}function d(){const t=n();document.documentElement.setAttribute("data-theme",t?"dark":"light");const e=document.getElementById("metaThemeColor")||document.querySelector('meta[name="theme-color"]');e&&e.setAttribute("content",t?"#0f172a":"#f8fafc"),h(t)}function l(){const t=o();let e;return t==="auto"?e="dark":t==="dark"?e="light":e="auto",u(e),d(),f(e),e}function s(){if(document.getElementById("hseDarkToggleBtn"))return;const t=document.createElement("button");t.id="hseDarkToggleBtn",t.className="hse-dark-toggle",t.setAttribute("aria-label","\u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646 / \u0627\u0644\u0641\u0627\u062A\u062D"),t.setAttribute("title",""),t.innerHTML=`
            <span class="toggle-icon">\u{1F319}</span>
            <span class="toggle-tooltip">\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646</span>
        `,t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),l()}),document.body.appendChild(t),h(n())}function h(t){const e=document.getElementById("hseDarkToggleBtn");if(!e)return;const r=o(),a=e.querySelector(".toggle-icon"),k=e.querySelector(".toggle-tooltip");if(a&&(r==="auto"?a.textContent=t?"\u{1F319}":"\u2600\uFE0F":r==="dark"?a.textContent="\u{1F319}":a.textContent="\u2600\uFE0F"),k){const x={auto:t?"\u062A\u0644\u0642\u0627\u0626\u064A (\u0644\u064A\u0644\u064A)":"\u062A\u0644\u0642\u0627\u0626\u064A (\u0646\u0647\u0627\u0631\u064A)",dark:"\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646 (\u064A\u062F\u0648\u064A)",light:"\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062A\u062D (\u064A\u062F\u0648\u064A)"};k.textContent=x[r]||""}}function f(t){const e=document.getElementById("hseDarkFeedback");e&&e.remove();const r={auto:"\u2699\uFE0F \u062A\u0644\u0642\u0627\u0626\u064A \u062D\u0633\u0628 \u0627\u0644\u0648\u0642\u062A",dark:"\u{1F319} \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646",light:"\u2600\uFE0F \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062A\u062D"},a=document.createElement("div");a.id="hseDarkFeedback",a.style.cssText=`
            position: fixed; top: 60px; left: 12px; z-index: 999999;
            background: #1e293b; color: #f1f5f9; padding: 8px 16px;
            border-radius: 10px; font-size: 13px; font-family: 'Cairo', sans-serif;
            font-weight: 600; box-shadow: 0 4px 16px rgba(0,0,0,0.3);
            opacity: 0; transform: translateY(-8px);
            transition: all 0.3s ease; direction: rtl;
        `,a.textContent=r[t]||t,document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateY(0)"}),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateY(-8px)",setTimeout(()=>a.remove(),300)},1800)}function p(){if(document.getElementById("hse-dark-mode-css"))return;const t=document.createElement("style");t.id="hse-dark-mode-css",t.textContent=g,document.head.appendChild(t)}function i(){p(),d();try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{o()==="auto"&&d()})}catch{}setInterval(()=>{o()==="auto"&&d()},9e5),document.body?s():document.addEventListener("DOMContentLoaded",s)}return p(),d(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i):i(),{init:i,toggle:l,apply:d,getPreference:o,shouldBeDark:n,isNightTime:m}})();
