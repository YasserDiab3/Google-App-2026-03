FireEquipment={state:{currentTab:"database",filters:{search:"",type:"all",status:"all",location:"all"}},applyModuleI18n(e){const s=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!s)return;const t=e||document.getElementById("fire-equipment-section")||document;s.applyI18n(t),typeof s.applyLiteralTranslations=="function"&&s.applyLiteralTranslations(t)},assetTypes:["\u0637\u0641\u0627\u064A\u0629 \u062D\u0631\u064A\u0642","\u062E\u0631\u0637\u0648\u0645 \u062D\u0631\u064A\u0642","\u0635\u0646\u062F\u0648\u0642 \u062D\u0631\u064A\u0642","\u062C\u0647\u0627\u0632 \u0625\u0646\u0630\u0627\u0631","\u0646\u0638\u0627\u0645 \u0631\u0634 \u0645\u0627\u0626\u064A","\u0645\u0636\u062E\u0629 \u062D\u0631\u064A\u0642","\u0635\u0645\u0627\u0645 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"],statusOptions:[{value:"\u0635\u0627\u0644\u062D",label:"\u0635\u0627\u0644\u062D"},{value:"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629",label:"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"},{value:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629",label:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"}],confirmClose(e){confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0648\u0630\u062C\u061F
\u0633\u064A\u062A\u0645 \u0641\u0642\u062F\u0627\u0646 \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.`)&&e.closest(".modal-overlay").remove()},closeModal(e){const s=e.closest(".modal-overlay");s&&s.remove()},generateFireDeviceID(){const s=this.getAssets().map(n=>n.id).filter(n=>n&&n.match(/^EFA-\d{4}$/)).map(n=>parseInt(n.split("-")[1])).filter(n=>!isNaN(n)),t=s.length>0?Math.max(...s)+1:1;return`EFA-${String(t).padStart(4,"0")}`},_injectFireIdentityStyles(){try{if(document.getElementById("fire-professional-identity-styles"))return;const e=document.createElement("style");e.id="fire-professional-identity-styles",e.textContent=`
                #fire-equipment-section .fire-id-hero {
                    --f-navy: #0b2a55;
                    --f-blue: #1e40af;
                    --f-blue2: #2563eb;
                }
                #fire-equipment-section .fire-id-hero {
                    position: relative; overflow: hidden;
                    display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
                    padding: 20px 24px; border-radius: 18px; color: #fff;
                    background: linear-gradient(130deg, #0b2a55 0%, #1e40af 55%, #2563eb 100%);
                    box-shadow: 0 14px 34px rgba(11,42,85,.25);
                }
                #fire-equipment-section .fire-id-hero::after {
                    content: ""; position: absolute; inset-inline-end: -64px; top: -96px;
                    width: 220px; height: 220px; border: 30px solid rgba(255,255,255,.05); border-radius: 50%; pointer-events: none;
                }
                #fire-equipment-section .fire-id-hero::before {
                    content: ""; position: absolute; inset-inline-start: 38%; bottom: -70px;
                    width: 150px; height: 150px; border: 20px solid rgba(255,255,255,.04); border-radius: 50%; pointer-events: none;
                }
                #fire-equipment-section .fire-id-hero__copy { position: relative; z-index: 1; display: flex; align-items: center; gap: 15px; min-width: min(100%, 340px); }
                #fire-equipment-section .fire-id-hero__icon {
                    flex: 0 0 auto; width: 54px; height: 54px; display: grid; place-items: center;
                    border: 1px solid rgba(255,255,255,.24); border-radius: 15px; background: rgba(255,255,255,.12); font-size: 23px; color: #fde68a;
                }
                #fire-equipment-section .fire-id-hero__eyebrow { display: block; margin-bottom: 4px; color: #bfdbfe; font-size: .68rem; font-weight: 800; letter-spacing: .04em; }
                #fire-equipment-section .fire-id-hero h1 { margin: 0; color: #fff; font-size: 1.3rem; font-weight: 900; line-height: 1.35; }
                #fire-equipment-section .fire-id-hero p { margin: 5px 0 0; color: #dbeafe; font-size: .78rem; }
                #fire-equipment-section .fire-id-hero__meta { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                #fire-equipment-section .fire-id-hero__meta span {
                    display: inline-flex; align-items: center; gap: 7px; padding: 8px 12px;
                    border: 1px solid rgba(255,255,255,.22); border-radius: 10px; background: rgba(255,255,255,.1);
                    font-size: .72rem; font-weight: 750; white-space: nowrap;
                }
                #fire-equipment-section .fire-id-hero__meta span i { color: #93c5fd; }
                #fire-equipment-section .fire-id-hero__actions { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
                #fire-equipment-section .fire-id-hero__actions .btn-primary {
                    background: linear-gradient(135deg,#fbbf24,#f59e0b); color: #7c2d12; border: none; font-weight: 800;
                    box-shadow: 0 6px 18px rgba(0,0,0,.18);
                }
                #fire-equipment-section .fire-id-hero__actions .btn-secondary {
                    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.25); color: #fff; font-weight: 700;
                }
                #fire-equipment-section .fire-id-hero__actions .btn-secondary:hover { background: rgba(255,255,255,.2); color: #fff; }
                @media (max-width: 820px) {
                    #fire-equipment-section .fire-id-hero { padding: 18px; }
                    #fire-equipment-section .fire-id-hero__copy { align-items: flex-start; }
                    #fire-equipment-section .fire-id-hero__icon { width: 46px; height: 46px; font-size: 19px; }
                    #fire-equipment-section .fire-id-hero h1 { font-size: 1.05rem; }
                    #fire-equipment-section .fire-id-hero__meta { width: 100%; }
                    #fire-equipment-section .fire-id-hero__meta span { flex: 1; justify-content: center; }
                    #fire-equipment-section .fire-id-hero__actions { width: 100%; }
                    #fire-equipment-section .fire-id-hero__actions .btn { flex: 1; justify-content: center; }
                }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A (\u0646\u0645\u0637 \u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u062F\u064A\u0648\u0644\u0627\u062A) */
                #fire-equipment-section .fire-id-tabs-wrap {
                    display: flex; gap: 8px; padding: 8px; border-radius: 16px; overflow-x: auto; margin-bottom: 18px;
                    border: 1px solid rgba(255,255,255,.14);
                    background: radial-gradient(circle at 8% 0%, rgba(251,191,36,.16), transparent 30%),
                                linear-gradient(125deg, #0b2a55 0%, #1e3a75 70%, #245a9b 100%);
                    box-shadow: 0 12px 30px rgba(11,37,85,.22);
                }
                #fire-equipment-section .fire-id-tabs { border-bottom: none; flex-wrap: nowrap; gap: 8px; min-width: max-content; }
                #fire-equipment-section .fire-tab-btn {
                    min-height: 46px; padding: 9px 16px; margin: 0;
                    border: 1px solid rgba(255,255,255,.15); border-radius: 11px;
                    background: rgba(255,255,255,.08); color: rgba(255,255,255,.85);
                    font-weight: 700; white-space: nowrap; transition: all .2s ease;
                }
                #fire-equipment-section .fire-tab-btn:hover { background: rgba(255,255,255,.15); color: #fff; transform: translateY(-1px); }
                #fire-equipment-section .fire-tab-btn.active {
                    border-color: #fff; background: #fff !important; color: var(--f-blue, #1e40af);
                    box-shadow: 0 8px 22px rgba(0,0,0,.2);
                }
                #fire-equipment-section .fire-tab-btn.active i { color: var(--f-blue, #1e40af); }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0623\u0633\u0637\u062D \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0648\u0627\u0644\u062C\u062F\u0627\u0648\u0644 */
                #fire-equipment-section #fire-tab-content { animation: fireSurfaceIn .24s ease-out; }
                @keyframes fireSurfaceIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                #fire-equipment-section #fire-tab-content .content-card {
                    border-radius: 16px; border-color: #dce7f5 !important;
                    box-shadow: 0 8px 24px rgba(15,47,90,.07);
                }
                #fire-equipment-section #fire-tab-content .card-header {
                    border-bottom: 1px solid #e5edf7; background: linear-gradient(180deg, #f8fbff, #fff); border-radius: 16px 16px 0 0;
                }
                #fire-equipment-section .data-table thead th,
                #fire-equipment-section .table-header-red thead th {
                    background: linear-gradient(90deg, #1e40af, #2563eb) !important; color: #fff !important;
                    font-weight: 700; white-space: nowrap; border: none !important;
                }
                #fire-equipment-section .data-table tbody tr:hover td { background: #f2f7ff !important; }
                #fire-equipment-section .data-table td { vertical-align: middle; }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A (\u0646\u0645\u0637 KPI \u0627\u0644\u0645\u0648\u062D\u0651\u062F) */
                #fire-equipment-section .fire-stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
                @media (max-width: 1100px) { #fire-equipment-section .fire-stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
                @media (max-width: 540px) { #fire-equipment-section .fire-stat-grid { grid-template-columns: 1fr; } }
                #fire-equipment-section .fire-stat {
                    position: relative; overflow: hidden; border-radius: 16px; padding: 18px 18px 20px;
                    background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%);
                    border: 1px solid #dce7f5; display: flex; gap: 14px; align-items: flex-start;
                    box-shadow: 0 8px 24px rgba(15,47,90,.07);
                    transition: transform .2s ease, box-shadow .2s ease;
                }
                #fire-equipment-section .fire-stat:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(15,47,90,.13); }
                #fire-equipment-section .fire-stat::before {
                    content: ""; position: absolute; inset-inline-start: 0; top: 14px; bottom: 14px; width: 4px;
                    border-radius: 4px; background: var(--fs-tone, #2563eb);
                }
                #fire-equipment-section .fire-stat__icon {
                    flex: 0 0 auto; width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center;
                    font-size: 20px; color: #fff;
                    background: linear-gradient(135deg, var(--fs-tone, #1e40af), var(--fs-tone2, #2563eb));
                }
                #fire-equipment-section .fire-stat--blue   { --fs-tone: #1e40af; --fs-tone2: #2563eb; }
                #fire-equipment-section .fire-stat--green  { --fs-tone: #15803d; --fs-tone2: #16a34a; }
                #fire-equipment-section .fire-stat--amber  { --fs-tone: #d97706; --fs-tone2: #f59e0b; }
                #fire-equipment-section .fire-stat--red    { --fs-tone: #b91c1c; --fs-tone2: #dc2626; }
                #fire-equipment-section .fire-stat__body { min-width: 0; flex: 1; }
                #fire-equipment-section .fire-stat__label { display: block; font-size: .74rem; font-weight: 800; color: #475569; margin-bottom: 4px; }
                #fire-equipment-section .fire-stat__value { display: block; font-size: 1.9rem; font-weight: 800; line-height: 1.05; color: var(--fs-tone, #1e40af); }
                #fire-equipment-section .fire-stat__sub { display: block; margin-top: 4px; font-size: .68rem; font-weight: 600; color: #94a3b8; }
                #fire-equipment-section .fire-stat__bar { position: absolute; inset-inline: 0; bottom: 0; height: 4px; background: #e8eef7; }
                #fire-equipment-section .fire-stat__bar-fill { display: block; height: 100%; width: var(--fs-pct, 0%); background: linear-gradient(90deg, var(--fs-tone, #1e40af), var(--fs-tone2, #2563eb)); transition: width .5s ease; }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0627\u0644\u0646\u0645\u0627\u0630\u062C (\u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629 \u062F\u0627\u062E\u0644 modals) */
                .fire-modal .modal-content { border: 1px solid #d5e2ef; border-top-width: 5px; border-top-style: solid; border-top-color: #1e40af; border-radius: 18px; box-shadow: 0 24px 60px rgba(15,23,42,.25); }
                .fire-modal .modal-header { background: linear-gradient(130deg, #0b2a55 0%, #1e40af 60%, #2563eb 100%); }
                .fire-modal .modal-title { color: #fff !important; }
                .fire-modal .modal-close { color: rgba(255,255,255,.85); background: rgba(255,255,255,.14); border-radius: 50%; transition: background .2s ease, color .2s ease; }
                .fire-modal .modal-close:hover { background: rgba(255,255,255,.28); color: #fff; }
                .fire-modal .form-label { font-size: .72rem; font-weight: 800; color: #334155; letter-spacing: .02em; }
                .fire-modal .form-input, .fire-modal select.form-input, .fire-modal input.form-input {
                    border: 1px solid #cbd5e1; border-radius: 10px; padding: .6rem .8rem; min-height: 44px;
                    background: #fbfdff; color: #0f172a; transition: border .2s ease, box-shadow .2s ease, background .2s ease;
                }
                .fire-modal .form-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.14); background: #fff; outline: none; }
                .fire-modal .btn-primary { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #7c2d12; border: none; font-weight: 800; border-radius: 10px; box-shadow: 0 8px 16px -8px rgba(245,158,11,.55); }
                .fire-modal .btn-primary:hover { filter: brightness(1.05); transform: translateY(-1px); }
                .fire-modal .btn-secondary { border-radius: 10px; font-weight: 700; }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 */
                #fire-equipment-section .fire-filter-card { border-radius: 16px; border-color: #dce7f5 !important; box-shadow: 0 8px 24px rgba(15,47,90,.07); }
                #fire-equipment-section .fire-filter-head { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
                #fire-equipment-section .fire-clear-btn { display: none; border-radius: 10px; font-weight: 700; color: #dc2626; border-color: #fecaca; background: #fef2f2; }
                #fire-equipment-section .fire-clear-btn:hover { background: #fee2e2; }
                #fire-equipment-section .fire-clear-btn.visible { display: inline-flex; align-items: center; }
                #fire-equipment-section .fire-filter-select option { font-weight: 600; }
                #fire-equipment-section .fire-filter-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
                #fire-equipment-section .fire-status-chips { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                #fire-equipment-section .fire-chip {
                    display: inline-flex; align-items: center; gap: 7px; padding: 8px 14px; cursor: pointer;
                    border: 1px solid #d8e2f0; border-radius: 999px; background: #f6faff; color: #475569;
                    font-size: .74rem; font-weight: 800; transition: all .2s ease;
                }
                #fire-equipment-section .fire-chip:hover { transform: translateY(-1px); box-shadow: 0 6px 14px rgba(15,47,90,.12); }
                #fire-equipment-section .fire-chip.active {
                    border-color: #1e40af; color: #fff;
                    background: linear-gradient(135deg, #1e40af, #2563eb);
                    box-shadow: 0 8px 18px -6px rgba(37,99,235,.5);
                }
                #fire-equipment-section .fire-chip--green.active { border-color: #15803d; background: linear-gradient(135deg, #15803d, #16a34a); box-shadow: 0 8px 18px -6px rgba(22,163,74,.5); }
                #fire-equipment-section .fire-chip--amber.active { border-color: #d97706; background: linear-gradient(135deg, #d97706, #f59e0b); box-shadow: 0 8px 18px -6px rgba(245,158,11,.5); }
                #fire-equipment-section .fire-chip--red.active { border-color: #b91c1c; background: linear-gradient(135deg, #b91c1c, #dc2626); box-shadow: 0 8px 18px -6px rgba(220,38,38,.5); }
                #fire-equipment-section .fire-filter-results {
                    display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px;
                    border: 1px solid #dbe7f5; border-radius: 999px; background: #f8fbff; color: #64748b;
                    font-size: .74rem; font-weight: 800; white-space: nowrap;
                }
                #fire-equipment-section .fire-filter-results i { color: #2563eb; }
                #fire-equipment-section .fire-filter-results.is-filtered { border-color: #fbbf24; background: #fffbeb; color: #92400e; }
                #fire-equipment-section .fire-filter-results.is-filtered i { color: #f59e0b; }
            `,document.head.appendChild(e)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0642\u0646 \u0647\u0648\u064A\u0629 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",e)}},async load(){try{this._injectFireIdentityStyles();const e=document.getElementById("fire-equipment-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0642\u0633\u0645 fire-equipment-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}if(typeof AppState>"u"){e.innerHTML='<div class="content-card"><div class="card-body"><p class="text-red-600">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p></div></div>',this.applyModuleI18n(e);return}AppState.appData||(AppState.appData={});const s='<div class="fire-tab-loading"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';e.innerHTML=`
                <div class="fire-id-hero">
                    <div class="fire-id-hero__copy">
                        <div class="fire-id-hero__icon"><i class="fas fa-fire-extinguisher"></i></div>
                        <div>
                            <span class="fire-id-hero__eyebrow">\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u2014 HSE</span>
                            <h1>\u0633\u062C\u0644 \u0648\u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642</h1>
                            <p>\u0625\u062F\u0627\u0631\u0629 \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0645\u0644\u0629 \u0644\u0643\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0645\u0639 \u062A\u062A\u0628\u0639 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0648QR Code \u0644\u0643\u0644 \u062C\u0647\u0627\u0632</p>
                        </div>
                    </div>
                    <div class="fire-id-hero__meta">
                        <span><i class="fas fa-database"></i> \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</span>
                        <span><i class="fas fa-clipboard-check"></i> \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629</span>
                        <span><i class="fas fa-qrcode"></i> QR Code \u0644\u0643\u0644 \u062C\u0647\u0627\u0632</span>
                    </div>
                    <div class="fire-id-hero__actions">
                        ${this.canAdd()?`
                        <button id="add-fire-asset-btn" class="btn-secondary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F
                        </button>
                        `:""}
                        <button id="public-fire-link-btn" class="btn-secondary" title="\u0631\u0627\u0628\u0637 \u0648\u0628\u0648\u0633\u062A\u0631 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A \u0627\u0644\u0639\u0627\u0645">
                            <i class="fas fa-link ml-2"></i>
                            \u0631\u0627\u0628\u0637 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0639\u0627\u0645
                        </button>
                        <button id="batch-print-qr-btn" class="btn-secondary" title="\u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A \u0648\u0631\u0645\u0648\u0632 QR \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629">
                            <i class="fas fa-print ml-2"></i>
                            \u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A QR \u0634\u0627\u0645\u0644\u0629
                        </button>
                        <button id="scan-qr-inspection-btn" class="btn-primary">
                            <i class="fas fa-qrcode ml-2"></i>
                            \u0645\u0633\u062D QR Code \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A
                        </button>
                        <button id="refresh-fire-equipment-btn" class="btn-secondary">
                            <i class="fas fa-sync-alt ml-2"></i>
                            \u062A\u062D\u062F\u064A\u062B
                        </button>
                    </div>
                </div>
                <style>
                    .fire-tabs-container {
                        margin-bottom: 1.5rem;
                    }
                    .fire-tabs-header {
                        display: flex;
                        gap: 0.5rem;
                        border-bottom: 2px solid #e5e7eb;
                        padding-bottom: 0;
                    }
                    .fire-tab-btn {
                        padding: 0.75rem 1.5rem;
                        background: none;
                        border: none;
                        border-bottom: 3px solid transparent;
                        color: #6b7280;
                        font-size: 0.9375rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        position: relative;
                        margin-bottom: -2px;
                    }
                    .fire-tab-btn:hover {
                        color: #3b82f6;
                        background-color: rgba(59, 130, 246, 0.05);
                    }
                    .fire-tab-btn.active {
                        color: #3b82f6;
                        border-bottom-color: #3b82f6;
                        font-weight: 600;
                    }
                    .fire-tab-btn i {
                        font-size: 14px;
                    }
                    .fire-tab-content {
                        display: none;
                    }
                    .fire-tab-content.active {
                        display: block;
                    }
                    .fire-tab-loading {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 3rem;
                        min-height: 200px;
                    }
                    .fire-tab-loading i {
                        font-size: 2rem;
                        color: #3b82f6;
                        margin-bottom: 1rem;
                    }
                    @media (max-width: 768px) {
                        .fire-tabs-header {
                            flex-wrap: wrap;
                            gap: 0.25rem;
                        }
                        .fire-tab-btn {
                            padding: 0.625rem 1rem;
                            font-size: 0.875rem;
                        }
                    }
                </style>
                <div class="fire-tabs-container fire-id-tabs-wrap mt-6">
                    <div class="fire-tabs-header fire-id-tabs">
                        ${this.hasTabAccess("database")?`
                        <button class="fire-tab-btn active" data-tab="database" onclick="FireEquipment.switchTab('database')">
                            <i class="fas fa-database ml-2"></i>
                            \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642
                        </button>
                        `:""}
                        ${this.hasTabAccess("register")?`
                        <button class="fire-tab-btn" data-tab="register" onclick="FireEquipment.switchTab('register')">
                            <i class="fas fa-clipboard-list ml-2"></i>
                            \u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621 \u0648\u0627\u0644\u0627\u0646\u0630\u0627\u0631
                        </button>
                        `:""}
                        ${this.hasTabAccess("inspections")?`
                        <button class="fire-tab-btn" data-tab="inspections" onclick="FireEquipment.switchTab('inspections')">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629
                        </button>
                        `:""}
                        ${this.hasTabAccess("analytics")?`
                        <button class="fire-tab-btn" data-tab="analytics" onclick="FireEquipment.switchTab('analytics')">
                            <i class="fas fa-chart-line ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                        </button>
                        `:""}
                        ${this.hasTabAccess("approval-requests")?`
                        <button class="fire-tab-btn" data-tab="approval-requests" onclick="FireEquipment.switchTab('approval-requests')">
                            <i class="fas fa-check-circle ml-2"></i>
                            \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629
                        </button>
                        `:""}
                    </div>
                </div>
                <div id="fire-tab-content">
                    <div id="fire-tab-database" class="fire-tab-content active">
                        ${s}
                    </div>
                    <div id="fire-tab-register" class="fire-tab-content" style="display: none;">
                        ${s}
                    </div>
                    <div id="fire-tab-inspections" class="fire-tab-content" style="display: none;">
                        ${s}
                    </div>
                    ${this.isAdmin()?`
                    <div id="fire-tab-analytics" class="fire-tab-content" style="display: none;">
                        ${s}
                    </div>
                    <div id="fire-tab-approval-requests" class="fire-tab-content" style="display: none;">
                        ${s}
                    </div>
                    `:""}
                </div>
            `,this.applyModuleI18n(e);try{this.setupEventListeners()}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A setupEventListeners:",t)}setTimeout(async()=>{try{await new Promise(a=>{if(typeof AppState<"u"&&AppState&&AppState.appData){a();return}let o=0;const l=50,r=setInterval(()=>{o++,typeof AppState<"u"&&AppState&&AppState.appData?(clearInterval(r),a()):o>=l&&(clearInterval(r),(typeof AppState>"u"||!AppState)&&(AppState={}),AppState.appData||(AppState.appData={}),a())},100)});let i=!1;try{i=this.ensureData()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A ensureData:",a)}if(i)try{setTimeout(async()=>{try{await this.persistAll()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A persistAll:",a)}},0)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A persistAll:",a)}const n=document.getElementById("fire-tab-database");if(n){const a=async l=>{const r=(d,p,c)=>{const f=new Promise((u,h)=>{setTimeout(()=>h(new Error(c||"Timeout")),p)});return Promise.race([d,f])};return typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(l(),1e4,"Timeout: renderTabContent"):await r(l(),1e4,"Timeout: renderTabContent")},o=`
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</p><p class="text-2xl font-bold" id="fire-summary-total">0</p></div></div>
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">\u0623\u062C\u0647\u0632\u0629 \u0641\u0639\u0651\u0627\u0644\u0629</p><p class="text-2xl font-bold text-green-600" id="fire-summary-active">0</p></div></div>
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">\u0628\u062D\u0627\u062C\u0629 \u0625\u0644\u0649 \u0645\u062A\u0627\u0628\u0639\u0629</p><p class="text-2xl font-bold text-yellow-600" id="fire-summary-maintenance">0</p></div></div>
                            </div>
                            <div class="content-card mt-6"><div class="card-body"><div id="fire-assets-table" class="overflow-x-auto"><div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0623\u0648 \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644.</p></div></div></div>
                        `;try{const l=await a(()=>this.renderTabContent("database"));n.innerHTML=l&&l.trim()?l:o}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",l),n.innerHTML=o}try{this.renderAssets()}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A renderAssets:",l)}}if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)this.loadFireEquipmentDataAsync().then(()=>{if(this.state.currentTab==="database")try{this.renderAssets()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B renderAssets:",a)}if(this.state.currentTab==="register")try{typeof this.refreshRegisterTable=="function"?this.refreshRegisterTable():typeof this.refreshCurrentTab=="function"&&this.refreshCurrentTab()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0633\u062C\u0644:",a)}}).catch(a=>{if(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",a),this.state.currentTab==="database")try{this.renderAssets()}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A renderAssets \u0628\u0639\u062F \u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644:",o)}});else if(this.state.currentTab==="database")try{this.renderAssets()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A renderAssets:",a)}}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:",t)}},0)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",e),section&&(section.innerHTML=`
                    <div class="fire-id-hero">
                        <div class="fire-id-hero__copy">
                            <div class="fire-id-hero__icon"><i class="fas fa-fire-extinguisher"></i></div>
                            <div>
                                <span class="fire-id-hero__eyebrow">\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u2014 HSE</span>
                                <h1>\u0633\u062C\u0644 \u0648\u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642</h1>
                            </div>
                        </div>
                        <div class="fire-id-hero__actions">
                            <button onclick="FireEquipment.load()" class="btn-secondary">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    </div>
                    <div class="mt-6">
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                    <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                    <p class="text-sm text-gray-400 mb-4">${e&&e.message?Utils.escapeHTML(e.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                    <button onclick="FireEquipment.load()" class="btn-primary">
                                        <i class="fas fa-redo ml-2"></i>
                                        \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(section)),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",{duration:3e3})}},async switchTab(e){if(this.state.currentTab===e)return;this.ensureData(),document.querySelectorAll(".fire-tab-btn").forEach(t=>{t.classList.remove("active"),t.dataset.tab===e&&t.classList.add("active")}),document.querySelectorAll(".fire-tab-content").forEach(t=>{t.style.display="none",t.classList.remove("active")});const s=document.getElementById(`fire-tab-${e}`);if(s){if(s.style.display="block",s.classList.add("active"),s.innerHTML.includes("fire-tab-loading")||s.innerHTML.includes("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644"))try{const n=await(async a=>typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(a(),1e4,"Timeout: renderTabContent took too long"):await a())(()=>this.renderTabContent(e));s.innerHTML=n||'<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(s)}catch(i){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 ${e}:`,i),s.innerHTML='<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(s)}}else{const t=document.getElementById("fire-tab-content");if(t){const i=document.createElement("div");i.id=`fire-tab-${e}`,i.className="fire-tab-content active";const n='<div class="fire-tab-loading"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';i.innerHTML=n,t.appendChild(i);try{const a=(r,d,p)=>{const c=new Promise((f,u)=>{setTimeout(()=>{u(new Error(p||`Timeout: \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0627\u0633\u062A\u063A\u0631\u0642\u062A \u0623\u0643\u062B\u0631 \u0645\u0646 ${d}ms`))},d)});return Promise.race([r,c])},l=await(async r=>typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(r(),1e4,"Timeout: renderTabContent took too long"):await a(r(),1e4,"Timeout: renderTabContent took too long"))(()=>this.renderTabContent(e));i.innerHTML=l||'<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(i)}catch(a){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 ${e}:`,a),i.innerHTML='<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(i)}}}if(this.state.currentTab=e,e==="database"){this.renderAssets();const t=this.getAssets();(!t||t.length===0)&&this.loadFireEquipmentDataAsync().then(()=>{this.state.currentTab==="database"&&this.renderAssets()}).catch(i=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",i)})}else if(e==="register"){await this.refreshRegisterTable();const t=this.getAssets();(!t||t.length===0)&&this.loadFireEquipmentDataAsync().then(()=>{this.state.currentTab==="register"&&this.refreshRegisterTable()}).catch(i=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",i)})}else if(e==="inspections"){const t=this.getMonthlyInspections(),i=document.getElementById("inspections-completed"),n=document.getElementById("inspections-needs-repair"),a=document.getElementById("inspections-out-of-service"),o=document.getElementById("inspections-total");i&&(i.textContent=t.completed),n&&(n.textContent=t.needsRepair),a&&(a.textContent=t.outOfService),o&&(o.textContent=t.total);const l=document.getElementById("monthly-inspections-table");l&&(l.innerHTML=this.renderMonthlyInspectionsTable(t.list));const r=this.getInspections();(!r||r.length===0)&&this.loadFireEquipmentDataAsync().then(()=>{if(this.state.currentTab==="inspections"){const d=this.getMonthlyInspections(),p=document.getElementById("inspections-completed"),c=document.getElementById("inspections-needs-repair"),f=document.getElementById("inspections-out-of-service"),u=document.getElementById("inspections-total"),h=document.getElementById("monthly-inspections-table");p&&(p.textContent=d.completed),c&&(c.textContent=d.needsRepair),f&&(f.textContent=d.outOfService),u&&(u.textContent=d.total),h&&(h.innerHTML=this.renderMonthlyInspectionsTable(d.list))}}).catch(d=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A:",d)})}else if(e==="analytics"){const t=document.getElementById("fire-tab-analytics");if(t){const i=await this.renderAnalyticsTab();t.innerHTML=i,this._fireBindAnalyticsEvents(),requestAnimationFrame(()=>{this.updateFireAnalyticsDashboard()})}}else if(e==="approval-requests"){const t=document.getElementById("fire-tab-approval-requests");if(t){const i=await this.renderApprovalRequestsTab();t.innerHTML=i,this.setupApprovalRequestsEventListeners();const n=this.getApprovalRequests();(!n||n.length===0)&&this.loadApprovalRequestsFromBackend().then(async()=>{if(this.state.currentTab==="approval-requests"){const a=await this.renderApprovalRequestsTab();t.innerHTML=a,this.setupApprovalRequestsEventListeners()}}).catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",a)})}}this.setupTabEventListeners(e)},async loadFireEquipmentDataAsync(){try{const[e,s,t]=await Promise.allSettled([GoogleIntegration.sendRequest({action:"getAllFireEquipmentAssets",data:{}}).catch(o=>{const l=o.message||o.toString()||"";return l.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||l.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0635\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",o),{success:!1,data:[]})}),GoogleIntegration.sendRequest({action:"getAllFireEquipmentInspections",data:{}}).catch(o=>{const l=o.message||o.toString()||"";return l.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||l.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",o),{success:!1,data:[]})}),GoogleIntegration.sendRequest({action:"getFireEquipmentApprovalRequests",data:{}}).catch(o=>{const l=o.message||o.toString()||"";return l.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||l.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",o),{success:!1,data:[]})})]);let i=!1,n=!1;if(e.status==="fulfilled"&&e.value&&e.value.success&&Array.isArray(e.value.data)){AppState.appData.fireEquipmentAssets||(AppState.appData.fireEquipmentAssets=[]);const o=AppState.appData.fireEquipmentAssets||[],l=e.value.data,r=new Map;o.forEach(d=>{d.id&&r.set(d.id,d)}),l.forEach(d=>{d.id&&r.set(d.id,d)}),AppState.appData.fireEquipmentAssets=Array.from(r.values()),i=!0,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${e.value.data.length} \u062C\u0647\u0627\u0632 \u0645\u0646 Google Sheets (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentAssets.length})`)}if(s.status==="fulfilled"&&s.value&&s.value.success&&Array.isArray(s.value.data)){AppState.appData.fireEquipmentInspections||(AppState.appData.fireEquipmentInspections=[]);const o=AppState.appData.fireEquipmentInspections||[],l=s.value.data,r=new Map;o.forEach(d=>{d.id&&r.set(d.id,d)}),l.forEach(d=>{d.id&&r.set(d.id,d)}),AppState.appData.fireEquipmentInspections=Array.from(r.values()),n=!0,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${s.value.data.length} \u0641\u062D\u0635 \u0645\u0646 Google Sheets (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentInspections.length})`)}if(t.status==="fulfilled"&&t.value&&t.value.success&&Array.isArray(t.value.data)){AppState.appData.fireEquipmentApprovalRequests||(AppState.appData.fireEquipmentApprovalRequests=[]);const o=AppState.appData.fireEquipmentApprovalRequests||[],l=t.value.data,r=new Map;o.forEach(d=>{d.id&&r.set(d.id,d)}),l.forEach(d=>{d.id&&r.set(d.id,d)}),AppState.appData.fireEquipmentApprovalRequests=Array.from(r.values()),localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(AppState.appData.fireEquipmentApprovalRequests)),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${t.value.data.length} \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 Backend (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentApprovalRequests.length})`)}const a=this.state.currentTab;if(a==="database")this.renderAssets();else if(a==="register"&&(i||n))this.state.currentTab==="register"&&await this.refreshRegisterTable();else if(a==="inspections"&&n&&this.state.currentTab==="inspections"){const o=this.getMonthlyInspections(),l=document.getElementById("inspections-completed"),r=document.getElementById("inspections-needs-repair"),d=document.getElementById("inspections-out-of-service"),p=document.getElementById("inspections-total");l&&(l.textContent=o.completed),r&&(r.textContent=o.needsRepair),d&&(d.textContent=o.outOfService),p&&(p.textContent=o.total);const c=document.getElementById("monthly-inspections-table");c&&(c.innerHTML=this.renderMonthlyInspectionsTable(o.list))}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(e){const s=e.message||e.toString()||"";Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0645\u0646 Google Sheets:",e),(s.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||s.includes("timeout"))&&Notification.warning({title:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",message:"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629.",duration:5e3,persistent:!1})}},renderTabContentSync(e){const s=`
            <div class="fire-tab-loading">
                <div style="width: 300px; margin: 0 auto 16px;">
                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                    </div>
                </div>
                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
            </div>
        `;return e==="database"?`
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-database ml-2"></i>
                            \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642
                        </h2>
                    </div>
                    <div class="card-body">
                        ${s}
                        <div id="fire-assets-container" style="display: none;"></div>
                    </div>
                </div>
            `:s},async hideLoadingAndShowContent(){const e=this.state.currentTab,s=document.getElementById(`fire-tab-${e}`);if(s){const t=s.querySelector(".fire-tab-loading");t&&(t.style.display="none");try{const i=await this.renderTabContent(e);i&&(s.innerHTML=i,this.setupTabEventListeners(e))}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",i)}}},async renderTabContent(e){return e==="database"?await this.renderDatabaseTab():e==="register"?await this.renderRegisterTab():e==="inspections"?await this.renderInspectionsTab():e==="analytics"?await this.renderAnalyticsTab():e==="approval-requests"?await this.renderApprovalRequestsTab():""},async renderDatabaseTab(){return`
            <div class="fire-stat-grid" id="fire-db-kpis">
                <div class="fire-stat fire-stat--blue">
                    <div class="fire-stat__icon"><i class="fas fa-fire-extinguisher"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</span>
                        <span class="fire-stat__value" id="fire-summary-total">0</span>
                        <span class="fire-stat__sub">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" id="fire-bar-total" style="--fs-pct:0%"></span></div>
                </div>
                <div class="fire-stat fire-stat--green">
                    <div class="fire-stat__icon"><i class="fas fa-check-circle"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u0623\u062C\u0647\u0632\u0629 \u0635\u0627\u0644\u062D\u0629</span>
                        <span class="fire-stat__value" id="fire-summary-active">0</span>
                        <span class="fire-stat__sub">\u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0641\u0648\u0631\u064A</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" id="fire-bar-active" style="--fs-pct:0%"></span></div>
                </div>
                <div class="fire-stat fire-stat--amber">
                    <div class="fire-stat__icon"><i class="fas fa-tools"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u062A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</span>
                        <span class="fire-stat__value" id="fire-summary-maintenance">0</span>
                        <span class="fire-stat__sub">\u062A\u062A\u0637\u0644\u0628 \u0645\u062A\u0627\u0628\u0639\u0629 \u0648\u0625\u0635\u0644\u0627\u062D</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" id="fire-bar-maintenance" style="--fs-pct:0%"></span></div>
                </div>
                <div class="fire-stat fire-stat--red">
                    <div class="fire-stat__icon"><i class="fas fa-ban"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</span>
                        <span class="fire-stat__value" id="fire-summary-out">0</span>
                        <span class="fire-stat__sub">\u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" id="fire-bar-out" style="--fs-pct:0%"></span></div>
                </div>
            </div>
            <div class="content-card fire-filter-card mt-6">
                <div class="card-header fire-filter-head">
                    <h2 class="card-title"><i class="fas fa-filter ml-2"></i>\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0633\u062C\u0644</h2>
                    <button type="button" id="fire-clear-filters" class="btn-secondary fire-clear-btn">
                        <i class="fas fa-rotate-left ml-1"></i>
                        \u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                    </button>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="form-label">\u0628\u062D\u062B</label>
                            <input type="text" id="fire-assets-search" class="form-input" placeholder="\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u0627\u0644\u0646\u0648\u0639\u060C \u0627\u0644\u0645\u0648\u0642\u0639\u060C \u0627\u0644\u0645\u0633\u0624\u0648\u0644...">
                        </div>
                        <div>
                            <label class="form-label">\u0627\u0644\u0646\u0648\u0639</label>
                            <select id="fire-assets-type" class="form-input fire-filter-select">
                                <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="fire-assets-status" class="form-input fire-filter-select">
                                <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                            <select id="fire-assets-location" class="form-input fire-filter-select">
                                <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>
                            </select>
                        </div>
                    </div>
                    <div class="fire-filter-row">
                        <div class="fire-status-chips" id="fire-status-chips">
                            <button type="button" class="fire-chip active" data-status="all"><i class="fas fa-th-list"></i> \u0627\u0644\u0643\u0644</button>
                            <button type="button" class="fire-chip fire-chip--green" data-status="\u0635\u0627\u0644\u062D"><i class="fas fa-check-circle"></i> \u0635\u0627\u0644\u062D</button>
                            <button type="button" class="fire-chip fire-chip--amber" data-status="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"><i class="fas fa-tools"></i> \u0635\u064A\u0627\u0646\u0629</button>
                            <button type="button" class="fire-chip fire-chip--red" data-status="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"><i class="fas fa-ban"></i> \u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</button>
                        </div>
                        <div class="fire-filter-results" id="fire-results-chip">
                            <i class="fas fa-chart-line ml-1"></i>
                            <span id="fire-results-text">-</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">
                <div class="content-card xl:col-span-2">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-database ml-2"></i>\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642</h2>
                    </div>
                    <div class="card-body" id="fire-assets-table"></div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-history ml-2"></i>\u0623\u062D\u062F\u062B \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</h2>
                    </div>
                    <div class="card-body" id="fire-recent-inspections"></div>
                </div>
            </div>
        `},renderRegisterStatisticsCards(){const e=this.getRegisterStatistics(),s=t=>e.total?Math.round((Number(t)||0)/e.total*100):0;return`
            <div class="fire-stat-grid">
                <div class="fire-stat fire-stat--blue">
                    <div class="fire-stat__icon"><i class="fas fa-fire-extinguisher"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</span>
                        <span class="fire-stat__value" id="register-stat-total">${e.total}</span>
                        <span class="fire-stat__sub">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${s(e.total)}%"></span></div>
                </div>

                <div class="fire-stat fire-stat--green">
                    <div class="fire-stat__icon"><i class="fas fa-check-circle"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0635\u0627\u0644\u062D\u0629</span>
                        <span class="fire-stat__value" id="register-stat-operational">${e.operational}</span>
                        <span class="fire-stat__sub">\u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0641\u0648\u0631\u064A</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${s(e.operational)}%"></span></div>
                </div>

                <div class="fire-stat fire-stat--amber">
                    <div class="fire-stat__icon"><i class="fas fa-tools"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u062A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</span>
                        <span class="fire-stat__value" id="register-stat-needs-maintenance">${e.needsMaintenance}</span>
                        <span class="fire-stat__sub">\u062A\u062A\u0637\u0644\u0628 \u0645\u062A\u0627\u0628\u0639\u0629 \u0648\u0625\u0635\u0644\u0627\u062D</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${s(e.needsMaintenance)}%"></span></div>
                </div>

                <div class="fire-stat fire-stat--red">
                    <div class="fire-stat__icon"><i class="fas fa-ban"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</span>
                        <span class="fire-stat__value" id="register-stat-out-of-service">${e.outOfService}</span>
                        <span class="fire-stat__sub">\u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${s(e.outOfService)}%"></span></div>
                </div>
            </div>
        `},updateRegisterStatisticsCards(){this.ensureData();const e=this.getRegisterStatistics(),s=document.getElementById("register-stat-total"),t=document.getElementById("register-stat-operational"),i=document.getElementById("register-stat-needs-maintenance"),n=document.getElementById("register-stat-out-of-service");s&&(s.textContent=e.total),t&&(t.textContent=e.operational),i&&(i.textContent=e.needsMaintenance),n&&(n.textContent=e.outOfService)},async renderRegisterTab(){this.ensureData();const e=this.getAssets(),s=e&&e.length>0;let t="";return s?t=this.renderRegisterTable():t=`
                <div class="empty-state">
                    <div style="width: 300px; margin: 0 auto 16px;">
                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                        </div>
                    </div>
                    <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                </div>
            `,`
            ${this.renderRegisterStatisticsCards()}
            <div class="content-card">
                <div class="card-header flex items-center justify-between flex-wrap gap-3">
                    <h2 class="card-title">
                        <i class="fas fa-clipboard-list ml-2"></i>
                        \u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621 \u0648\u0627\u0644\u0627\u0646\u0630\u0627\u0631
                    </h2>
                    <div class="flex items-center gap-2 flex-wrap">
                        <button id="register-import-excel-btn" class="btn-secondary">
                            <i class="fas fa-file-import ml-2"></i>
                            \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel
                        </button>
                        <button id="register-export-excel-btn" class="btn-secondary">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 Excel
                        </button>
                        <button id="register-export-pdf-btn" class="btn-secondary">
                            <i class="fas fa-file-pdf ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 PDF
                        </button>
                        <button id="register-batch-print-qr-btn" class="btn-secondary" title="\u0637\u0628\u0627\u0639\u0629 \u0645\u0644\u0635\u0642\u0627\u062A QR \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629">
                            <i class="fas fa-print ml-2"></i>
                            \u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A QR
                        </button>
                        <button id="register-add-device-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
                <div class="card-body" id="fire-register-table">
                    ${t}
                </div>
            </div>
        `},renderRegisterTable(){const e=this.getAssets();return!e||e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F\u060C \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629.</p></div>':`
            <div class="table-wrapper fire-register-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 100px;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
                            <th style="min-width: 120px;">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                            <th style="min-width: 150px;">\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 100px;">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 80px;">\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645</th>
                            <th style="min-width: 120px;">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            <th style="min-width: 120px;">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629</th>
                            <th style="min-width: 80px;">\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639</th>
                            <th style="min-width: 120px;">\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 100px;">\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 100px;">\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A</th>
                            <th style="min-width: 150px;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621</th>
                            <th style="min-width: 150px; word-wrap: break-word;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>${e.map(t=>{const i=this.getStatusBadge(t.status),n=t.manufacturingYear||"-";return`
                <tr>
                    <td>${Utils.escapeHTML(t.factoryName||t.factory||"-")}</td>
                    <td>${Utils.escapeHTML(t.subLocationName||t.subLocation||"-")}</td>
                    <td>${Utils.escapeHTML(t.location||"-")}</td>
                    <td>${Utils.escapeHTML(t.type||"-")}</td>
                    <td>${Utils.escapeHTML(t.capacity||t.capacityKg||"-")}</td>
                    <td>${Utils.escapeHTML(t.siteNumber||t.number||"-")}</td>
                    <td>${Utils.escapeHTML(t.manufacturer||"-")}</td>
                    <td>${Utils.escapeHTML(n)}</td>
                    <td>${Utils.escapeHTML(t.serialNumber||"-")}</td>
                    <td>${i}</td>
                    <td style="word-wrap: break-word; max-width: 120px;">${Utils.escapeHTML(t.installationMethod||"-")}</td>
                    <td>
                        <div class="flex flex-wrap gap-2" style="min-width: 150px;">
                            <button class="btn-icon btn-icon-primary" data-action="view-details" data-id="${t.id}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-icon-secondary" data-action="print-qr" data-id="${t.id}" title="\u0637\u0628\u0627\u0639\u0629 QR">
                                <i class="fas fa-qrcode"></i>
                            </button>
                            ${this.canEdit()?`
                            <button class="btn-icon btn-icon-warning" data-action="edit-device" data-id="${t.id}" title="\u062A\u0639\u062F\u064A\u0644">
                                <i class="fas fa-edit"></i>
                            </button>
                            `:""}
                            ${this.canDelete()?`
                            <button class="btn-icon btn-icon-danger" data-action="delete-device" data-id="${t.id}" title="\u062D\u0630\u0641">
                                <i class="fas fa-trash"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                    <td style="word-wrap: break-word; max-width: 200px; white-space: normal;">${Utils.escapeHTML(t.notes||"-")}</td>
                </tr>
            `}).join("")}</tbody>
                    <tfoot style="display: none;"></tfoot>
                </table>
            </div>
        `},async renderInspectionsTab(){this.ensureData();const e=this.getInspections()||[],s=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="pending"||!r.approvalStatus&&r.submittedBy&&String(r.submittedBy).includes("Public")).length,t=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="approved").length,i=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="rejected").length,n=e.filter(r=>r.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,a=e.filter(r=>r.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length,o=this.state.inspectionApprovalFilter||"all";let l=e;return o==="pending"?l=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="pending"||!r.approvalStatus&&r.submittedBy&&String(r.submittedBy).includes("Public")):o==="approved"?l=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="approved"||r.status==="\u0635\u0627\u0644\u062D"):o==="needsRepair"?l=e.filter(r=>r.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"):o==="outOfService"&&(l=e.filter(r=>r.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"||String(r.approvalStatus||"").toLowerCase()==="rejected")),`
            <div class="flex flex-col sm:flex-row gap-3 items-center justify-between mb-5">
                <div>
                    <h3 class="text-xl font-bold text-gray-800" style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-clipboard-check text-red-600"></i>
                        <span>\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629 \u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621</span>
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">\u0645\u062A\u0627\u0628\u0639\u0629 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0628\u0631 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0648\u0631\u0645\u0648\u0632 \u0627\u0644\u0640 QR</p>
                </div>
                <div class="flex gap-2 w-full sm:w-auto">
                    <button id="mobile-scan-qr-btn" class="btn-primary" style="padding: 0.75rem 1.25rem; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; border-radius: 10px;">
                        <i class="fas fa-qrcode"></i>
                        <span>\u0645\u0633\u062D QR \u0644\u0644\u0641\u062D\u0635</span>
                    </button>
                    <button class="btn-secondary" onclick="FireEquipment.showPublicLinkModal()" style="padding: 0.75rem 1.25rem; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; border-radius: 10px;">
                        <i class="fas fa-share-alt text-blue-500"></i>
                        <span>\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0639\u0627\u0645</span>
                    </button>
                </div>
            </div>

            <!-- \u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0623\u0631\u0628\u0639\u0629 \u0627\u0644\u0645\u0646\u0645\u0642\u0629 \u0639\u0644\u0649 \u0646\u0645\u0637 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- 1. \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A -->
                <div class="content-card fire-kpi-card" style="background: #ffffff; border-radius: 16px; border: 1.5px solid ${o==="all"?"#3b82f6":"#e2e8f0"}; padding: 18px 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); cursor: pointer; transition: all 0.25s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px rgba(59,130,246,0.12)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 14px rgba(0,0,0,0.03)';" onclick="FireEquipment.filterInspectionsByApproval('all')">
                    <div class="flex items-center justify-between">
                        <div>
                            <p style="font-size: 0.82rem; font-weight: 700; color: #64748b; margin: 0 0 4px 0;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</p>
                            <h3 id="inspections-total" style="font-size: 1.85rem; font-weight: 800; color: #1e293b; margin: 0; line-height: 1.1;">${e.length}</h3>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
                                <span style="font-size: 0.72rem; color: #3b82f6; font-weight: 600;">\u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</span>
                            </div>
                        </div>
                        <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid #bfdbfe; box-shadow: 0 4px 10px rgba(37,99,235,0.12);">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                    </div>
                </div>

                <!-- 2. \u0635\u0627\u0644\u062D -->
                <div class="content-card fire-kpi-card" style="background: #ffffff; border-radius: 16px; border: 1.5px solid ${o==="approved"?"#10b981":"#e2e8f0"}; padding: 18px 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); cursor: pointer; transition: all 0.25s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px rgba(16,185,129,0.12)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 14px rgba(0,0,0,0.03)';" onclick="FireEquipment.filterInspectionsByApproval('approved')">
                    <div class="flex items-center justify-between">
                        <div>
                            <p style="font-size: 0.82rem; font-weight: 700; color: #047857; margin: 0 0 4px 0;">\u0635\u0627\u0644\u062D \u0644\u0644\u0639\u0645\u0644</p>
                            <h3 id="inspections-completed" style="font-size: 1.85rem; font-weight: 800; color: #065f46; margin: 0; line-height: 1.1;">${t||e.filter(r=>r.status==="\u0635\u0627\u0644\u062D").length}</h3>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
                                <span style="font-size: 0.72rem; color: #10b981; font-weight: 600;">\u062C\u0627\u0647\u0632\u0629 \u0648\u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A</span>
                            </div>
                        </div>
                        <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); color: #059669; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid #bbf7d0; box-shadow: 0 4px 10px rgba(5,150,105,0.12);">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                </div>

                <!-- 3. \u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629 -->
                <div class="content-card fire-kpi-card" style="background: #ffffff; border-radius: 16px; border: 1.5px solid ${o==="needsRepair"?"#f59e0b":"#e2e8f0"}; padding: 18px 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); cursor: pointer; transition: all 0.25s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px rgba(245,158,11,0.12)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 14px rgba(0,0,0,0.03)';" onclick="FireEquipment.filterInspectionsByApproval('needsRepair')">
                    <div class="flex items-center justify-between">
                        <div>
                            <p style="font-size: 0.82rem; font-weight: 700; color: #b45309; margin: 0 0 4px 0;">\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</p>
                            <h3 id="inspections-needs-repair" style="font-size: 1.85rem; font-weight: 800; color: #92400e; margin: 0; line-height: 1.1;">${n}</h3>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
                                <span style="font-size: 0.72rem; color: #d97706; font-weight: 600;">\u062A\u062A\u0637\u0644\u0628 \u0636\u063A\u0637 \u0623\u0648 \u0635\u064A\u0627\u0646\u0629</span>
                            </div>
                        </div>
                        <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); color: #d97706; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid #fde68a; box-shadow: 0 4px 10px rgba(217,119,6,0.12);">
                            <i class="fas fa-tools"></i>
                        </div>
                    </div>
                </div>

                <!-- 4. \u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629 -->
                <div class="content-card fire-kpi-card" style="background: #ffffff; border-radius: 16px; border: 1.5px solid ${o==="outOfService"?"#ef4444":"#e2e8f0"}; padding: 18px 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); cursor: pointer; transition: all 0.25s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px rgba(239,68,68,0.12)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 14px rgba(0,0,0,0.03)';" onclick="FireEquipment.filterInspectionsByApproval('outOfService')">
                    <div class="flex items-center justify-between">
                        <div>
                            <p style="font-size: 0.82rem; font-weight: 700; color: #b91c1c; margin: 0 0 4px 0;">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</p>
                            <h3 id="inspections-out-of-service" style="font-size: 1.85rem; font-weight: 800; color: #991b1b; margin: 0; line-height: 1.1;">${a}</h3>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
                                <span style="font-size: 0.72rem; color: #ef4444; font-weight: 600;">\u0645\u0639\u0637\u0644\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629</span>
                            </div>
                        </div>
                        <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid #fecaca; box-shadow: 0 4px 10px rgba(220,38,38,0.12);">
                            <i class="fas fa-ban"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- \u0634\u0631\u064A\u0637 \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0633\u0631\u064A\u0639\u0629 -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn ${o==="all"?"btn-primary":"btn-secondary"}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('all')">
                        \u0627\u0644\u0643\u0644 (${e.length})
                    </button>
                    <button class="btn ${o==="pending"?"btn-primary":"btn-secondary"}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px; ${o==="pending"?"background:#d97706; border-color:#d97706;":""}" onclick="FireEquipment.filterInspectionsByApproval('pending')">
                        \u23F3 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F (${s})
                    </button>
                    <button class="btn ${o==="approved"?"btn-primary":"btn-secondary"}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('approved')">
                        \u2705 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 (${t})
                    </button>
                    <button class="btn ${o==="needsRepair"?"btn-primary":"btn-secondary"}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('needsRepair')">
                        \u{1F7E1} \u062A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629 (${n})
                    </button>
                    <button class="btn ${o==="outOfService"?"btn-primary":"btn-secondary"}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('outOfService')">
                        \u{1F534} \u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629 (${a})
                    </button>
                </div>
            </div>

            <div class="content-card">
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <h2 class="card-title">
                        <i class="fas fa-clipboard-list ml-2"></i>
                        \u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629
                    </h2>
                    <span class="text-xs text-gray-500">\u0639\u062F\u062F \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629: ${l.length}</span>
                </div>
                <div class="card-body" id="monthly-inspections-table">
                    ${this.renderMonthlyInspectionsTable(l)}
                </div>
            </div>
        `},async filterInspectionsByApproval(e){this.state.inspectionApprovalFilter=e;const s=document.getElementById("fire-tab-content");s&&(s.innerHTML=await this.renderInspectionsTab(),this.setupEventListeners())},async refreshRegisterTable(){this.ensureData(),this.updateRegisterStatisticsCards();const e=document.getElementById("fire-register-table");if(!e)return;const s=this.getAssets();!s||s.length===0?e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F\u060C \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629.</p></div>':(e.innerHTML=this.renderRegisterTable(),e.dataset.eventsBound="false",this.bindRegisterTableEvents(e))},async refreshCurrentTab(e=!1){if(this.state.currentTab==="database")this.renderAssets();else if(this.state.currentTab==="register")await this.refreshRegisterTable();else if(this.state.currentTab==="inspections"){const s=this.getMonthlyInspections(),t=document.getElementById("inspections-completed"),i=document.getElementById("inspections-needs-repair"),n=document.getElementById("inspections-out-of-service"),a=document.getElementById("inspections-total");t&&(t.textContent=s.completed),i&&(i.textContent=s.needsRepair),n&&(n.textContent=s.outOfService),a&&(a.textContent=s.total);const o=document.getElementById("monthly-inspections-table");o&&(o.innerHTML=this.renderMonthlyInspectionsTable(s.list))}else this.renderAssets()},getMonthlyInspections(){const e=new Date,s=new Date(e.getFullYear(),e.getMonth(),1),t=new Date(e.getFullYear(),e.getMonth()+1,0,23,59,59),i=this.getInspections().filter(n=>{const a=new Date(n.checkDate||n.createdAt);return a>=s&&a<=t}).sort((n,a)=>{const o=new Date(n.checkDate||n.createdAt);return new Date(a.checkDate||a.createdAt)-o});return{list:i,total:i.length,completed:i.filter(n=>n.status==="\u0635\u0627\u0644\u062D").length,needsRepair:i.filter(n=>n.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:i.filter(n=>n.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length}},getApprovalBadge(e,s){const t=String(e||"").toLowerCase();return t==="approved"?'<span class="badge" style="background:#dcfce7; color:#166534; border:1px solid #bbf7d0; font-weight:700; padding:3px 8px; border-radius:6px; font-size:0.8rem;"><i class="fas fa-check-circle ml-1 text-emerald-600"></i> \u0645\u0639\u062A\u0645\u062F</span>':t==="rejected"?'<span class="badge" style="background:#fee2e2; color:#991b1b; border:1px solid #fecaca; font-weight:700; padding:3px 8px; border-radius:6px; font-size:0.8rem;"><i class="fas fa-times-circle ml-1 text-red-600"></i> \u0645\u0631\u0641\u0648\u0636</span>':'<span class="badge" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a; font-weight:700; padding:3px 8px; border-radius:6px; font-size:0.8rem;"><i class="fas fa-clock ml-1 text-amber-600"></i> \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</span>'},renderMonthlyInspectionsTable(e){return!e||e.length===0?'<div class="empty-state" style="padding: 30px; text-align: center;"><i class="fas fa-clipboard-check text-4xl text-gray-300 mb-2"></i><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u062A\u062D\u062F\u064A\u062F</p></div>':`
            <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 150px;">\u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 110px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635</th>
                            <th style="min-width: 130px;">\u0627\u0644\u0645\u0641\u062A\u0634</th>
                            <th style="min-width: 100px;">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0646\u064A\u0629</th>
                            <th style="min-width: 110px;">\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th>
                            <th style="min-width: 160px; word-wrap: break-word;">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            <th style="min-width: 120px;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>${e.map(t=>{const i=this.getAssets().find(d=>d.id===t.assetId),n=i?`${i.number||i.id} - ${i.location||""}`:t.assetId,a=this.getStatusBadge(t.status),o=this.getApprovalBadge(t.approvalStatus,t.submittedBy),l=t.checkDate?Utils.formatDate(t.checkDate):"-",r=String(t.approvalStatus||"").toLowerCase()==="pending"||!t.approvalStatus&&t.submittedBy&&String(t.submittedBy).includes("Public");return`
                <tr>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(n)}</div>
                        <div class="text-xs text-gray-400" style="direction: ltr; text-align: right;">ID: ${Utils.escapeHTML(t.assetId||"-")}</div>
                    </td>
                    <td>${l}</td>
                    <td>
                        <div class="font-medium text-gray-800">${Utils.escapeHTML(t.inspector||"-")}</div>
                        ${t.submittedBy?'<div class="text-xs text-gray-400">\u0628\u0648\u0627\u0628\u0629 \u0639\u0627\u0645\u0629</div>':""}
                    </td>
                    <td>${a}</td>
                    <td>${o}</td>
                    <td style="word-wrap: break-word; max-width: 180px; white-space: normal; font-size: 0.85rem;">
                        ${Utils.escapeHTML(t.remarks||"-")}
                    </td>
                    <td>
                        <div style="display: flex; gap: 4px; align-items: center;">
                            <button class="btn-icon btn-icon-primary" onclick="FireEquipment.viewInspection('${t.id}')" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0643\u0627\u0645\u0644\u0629">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${r?`
                                <button class="btn-icon" style="color: #16a34a; background: #f0fdf4; border: 1px solid #bbf7d0;" onclick="FireEquipment.approveInspection('${t.id}')" title="\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0641\u062D\u0635 \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn-icon" style="color: #dc2626; background: #fef2f2; border: 1px solid #fecaca;" onclick="FireEquipment.rejectInspection('${t.id}')" title="\u0631\u0641\u0636 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A">
                                    <i class="fas fa-times"></i>
                                </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}</tbody>
                </table>
            </div>
        `},viewInspection(e){const s=this.getInspections().find(l=>l.id===e);if(!s){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0635");return}const t=this.getAssets().find(l=>l.id===s.assetId),i=t?`${t.number||t.id} - ${t.location||""}`:s.assetId,n=String(s.approvalStatus||"").toLowerCase()==="pending"||!s.approvalStatus&&s.submittedBy&&String(s.submittedBy).includes("Public");let a=[];if(s.attachments)try{a=typeof s.attachments=="string"?JSON.parse(s.attachments):s.attachments}catch{}const o=document.createElement("div");o.className="modal-overlay fire-modal",o.innerHTML=`
            <div class="modal-content" style="max-width: 720px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(220, 38, 38, 0.2); border: 1px solid rgba(220, 38, 38, 0.4); display: flex; align-items: center; justify-content: center; color: #f87171;">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 2px 0;">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A</h2>
                            <p style="font-size: 0.8rem; color: #94a3b8; margin: 0;">\u0643\u0648\u062F \u0627\u0644\u0641\u062D\u0635: ${Utils.escapeHTML(s.id)}</p>
                        </div>
                    </div>
                    <button class="modal-close" style="color: #94a3b8; font-size: 1.25rem;" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 22px; background: #f8fafc;">
                    <!-- \u0634\u0631\u064A\u0637 \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F -->
                    <div style="display: flex; align-items: center; justify-content: space-between; background: #ffffff; padding: 12px 16px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
                        <span style="font-weight: 700; color: #334155; font-size: 0.9rem;">\u062D\u0627\u0644\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0641\u062D\u0635:</span>
                        <div>${this.getApprovalBadge(s.approvalStatus,s.submittedBy)}</div>
                    </div>

                    <div class="space-y-4" style="background: #ffffff; padding: 18px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u062C\u0647\u0627\u0632 \u0648\u0627\u0644\u0645\u0648\u0642\u0639:</label>
                                <p class="text-gray-900 font-bold mt-1">${Utils.escapeHTML(i)}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0643\u0648\u062F \u0627\u0644\u0623\u0635\u0644 (DeviceID):</label>
                                <p class="text-gray-900 font-bold mt-1" style="direction: ltr; text-align: right;">${Utils.escapeHTML(s.assetId||"-")}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635:</label>
                                <p class="text-gray-800 mt-1">${s.checkDate?Utils.formatDate(s.checkDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0645\u0633\u0624\u0648\u0644 / \u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629:</label>
                                <p class="text-gray-800 font-bold mt-1">${Utils.escapeHTML(s.inspector||"-")}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0644\u0644\u062C\u0647\u0627\u0632:</label>
                                <p class="mt-1">${this.getStatusBadge(s.status)}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0645\u0624\u0634\u0631 \u0639\u062F\u0627\u062F \u0627\u0644\u0636\u063A\u0637:</label>
                                <p class="text-gray-800 mt-1">${Utils.escapeHTML(s.gaugeReading||"\u0633\u0644\u064A\u0645")}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0635\u0645\u0627\u0645 \u0648\u062A\u064A\u0644\u0629 \u0627\u0644\u0623\u0645\u0627\u0646:</label>
                                <p class="text-gray-800 font-bold mt-1">${Utils.escapeHTML(s.sealIntact===!0?"\u0633\u0644\u064A\u0645":s.sealIntact===!1?"\u0645\u0643\u0633\u0648\u0631":s.sealIntact||"\u0633\u0644\u064A\u0645")}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u062E\u0631\u0637\u0648\u0645 \u0648\u0627\u0644\u0642\u0627\u0630\u0641 / \u062C\u0633\u0645 \u0627\u0644\u0623\u0633\u0637\u0648\u0627\u0646\u0629:</label>
                                <p class="text-gray-800 mt-1">${Utils.escapeHTML(s.hoseCondition||s.bodyCondition||"\u0633\u0644\u064A\u0645")}</p>
                            </div>
                        </div>

                        ${s.remarks?`
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                            <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629:</label>
                            <p class="text-gray-800 mt-1 bg-gray-50 p-2 rounded">${Utils.escapeHTML(s.remarks)}</p>
                        </div>`:""}

                        ${s.actions?`
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                            <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629:</label>
                            <p class="text-gray-800 mt-1 bg-gray-50 p-2 rounded">${Utils.escapeHTML(s.actions)}</p>
                        </div>`:""}

                        <!-- \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F -->
                        ${s.approvedBy?`
                        <div style="border-top: 1px solid #dcfce7; background: #f0fdf4; padding: 10px 14px; border-radius: 8px; margin-top: 10px;">
                            <span class="text-xs font-bold text-green-800">\u2705 \u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0648\u0627\u0633\u0637\u0629:</span>
                            <span class="text-xs text-green-900 font-bold mr-1">${Utils.escapeHTML(s.approvedBy)}</span>
                            ${s.approvedAt?`<span class="text-xs text-green-700">\u0628\u062A\u0627\u0631\u064A\u062E (${Utils.formatDate(s.approvedAt)})</span>`:""}
                        </div>`:""}

                        ${s.rejectedBy?`
                        <div style="border-top: 1px solid #fee2e2; background: #fef2f2; padding: 10px 14px; border-radius: 8px; margin-top: 10px;">
                            <span class="text-xs font-bold text-red-800">\u274C \u062A\u0645 \u0627\u0644\u0631\u0641\u0636 \u0628\u0648\u0627\u0633\u0637\u0629:</span>
                            <span class="text-xs text-red-900 font-bold mr-1">${Utils.escapeHTML(s.rejectedBy)}</span>
                            <p class="text-xs text-red-700 mt-1">\u0627\u0644\u0633\u0628\u0628: ${Utils.escapeHTML(s.reviewNotes||"-")}</p>
                        </div>`:""}

                        <!-- \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629 \u0625\u0646 \u0648\u064F\u062C\u062F\u062A -->
                        ${a&&a.length>0?`
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                            <label class="text-xs font-semibold text-gray-500 mb-2 block">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629 \u0645\u0646 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A:</label>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${a.map(l=>`
                                    <a href="${l.url}" target="_blank" style="display: inline-block; border: 1.5px solid #cbd5e1; border-radius: 8px; overflow: hidden; max-width: 200px;">
                                        <img src="${l.url}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0641\u062D\u0635" style="max-width: 100%; max-height: 140px; display: block;">
                                    </a>
                                `).join("")}
                            </div>
                        </div>`:""}
                    </div>
                </div>
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 8px;">
                        ${n?`
                            <button type="button" class="btn-primary" style="background: #16a34a; display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px;" onclick="FireEquipment.approveInspection('${s.id}', this)">
                                <i class="fas fa-check"></i> \u0627\u0639\u062A\u0645\u0627\u062F \u0648\u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u0637\u0641\u0627\u064A\u0629
                            </button>
                            <button type="button" class="btn-danger" style="background: #dc2626; color:#ffffff; display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; border:none;" onclick="FireEquipment.rejectInspection('${s.id}', this)">
                                <i class="fas fa-times"></i> \u0631\u0641\u0636 \u0627\u0644\u0641\u062D\u0635
                            </button>
                        `:""}
                    </div>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(o)},async approveInspection(e,s){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0646\u062A\u064A\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0641\u062D\u0635 \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0631\u0633\u0645\u064A \u0644\u0644\u0637\u0641\u0627\u064A\u0629\u061F"))try{const i=AppState.currentUser||{},n=i.name||i.fullName||i.userName||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",a=new Date().toISOString(),l=(this.getInspections()||[]).find(r=>r.id===e);if(l&&(l.approvalStatus="approved",l.approvedBy=n,l.approvedAt=a,l.reviewNotes="\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A",l.assetId)){const d=(this.getAssets()||[]).find(p=>p.id===l.assetId);if(d){d.status=l.status||"\u0635\u0627\u0644\u062D",d.lastInspection=l.checkDate||a.split("T")[0];var t=new Date(l.checkDate||Date.now());t.setMonth(t.getMonth()+1),d.nextInspection=t.toISOString().split("T")[0],d.updatedAt=a}}if(AppState.appData&&AppState.appData.fireEquipmentApprovalRequests){const r=AppState.appData.fireEquipmentApprovalRequests.find(d=>d.id===e||d.inspectionId===e);r&&(r.status="approved",r.approvedBy=n,r.approvedAt=a)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),document.querySelectorAll(".modal-overlay.fire-modal").forEach(r=>r.remove()),this.state.currentTab==="approval-requests"?await this.refreshApprovalRequestsTab():await this.refreshCurrentTab(!0),typeof Notification<"u"&&Notification.success("\u2705 \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0641\u062D\u0635 \u0648\u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u062C\u0647\u0627\u0632 \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0641\u0648\u0631\u0627\u064B"),typeof GoogleIntegration<"u"&&AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendRequest({action:"approveFireEquipmentInspection",data:{inspectionId:e,approverData:{name:n,id:i.id||i.userId||"",role:i.role||"admin"},reviewNotes:"\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A"}}).then(r=>{Utils.safeLog("\u2705 Backend inspection approval sync complete:",r)}).catch(r=>{Utils.safeWarn("\u26A0\uFE0F Background approval sync notice (saved locally):",r)})}catch(i){Utils.safeError("Error in approveInspection:",i),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message)}},async rejectInspection(e,s){const t=prompt("\u064A\u0631\u062C\u0649 \u0643\u062A\u0627\u0628\u0629 \u0633\u0628\u0628 \u0631\u0641\u0636 \u0647\u0630\u0627 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A (\u0623\u0648 \u0637\u0644\u0628 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0641\u062D\u0635):");if(t!==null)try{const i=AppState.currentUser||{},n=i.name||i.fullName||i.userName||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",a=new Date().toISOString(),l=(this.getInspections()||[]).find(r=>r.id===e);if(l&&(l.approvalStatus="rejected",l.rejectedBy=n,l.rejectedAt=a,l.reviewNotes=t||"\u0645\u0631\u0641\u0648\u0636 - \u064A\u0644\u0632\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0641\u062D\u0635"),AppState.appData&&AppState.appData.fireEquipmentApprovalRequests){const r=AppState.appData.fireEquipmentApprovalRequests.find(d=>d.id===e||d.inspectionId===e);r&&(r.status="rejected",r.rejectedBy=n,r.rejectedAt=a,r.rejectionReason=t||"")}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),document.querySelectorAll(".modal-overlay.fire-modal").forEach(r=>r.remove()),this.state.currentTab==="approval-requests"?await this.refreshApprovalRequestsTab():await this.refreshCurrentTab(!0),typeof Notification<"u"&&Notification.success("\u2705 \u062A\u0645 \u062A\u0648\u062B\u064A\u0642 \u0631\u0641\u0636 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0641\u0648\u0631\u0627\u064B"),typeof GoogleIntegration<"u"&&AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendRequest({action:"rejectFireEquipmentInspection",data:{inspectionId:e,approverData:{name:n,id:i.id||i.userId||"",role:i.role||"admin"},reason:t||"\u0645\u0631\u0641\u0648\u0636 - \u064A\u0644\u0632\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0641\u062D\u0635"}}).then(r=>{Utils.safeLog("\u2705 Backend inspection rejection sync complete:",r)}).catch(r=>{Utils.safeWarn("\u26A0\uFE0F Background rejection sync notice (saved locally):",r)})}catch(i){Utils.safeError("Error in rejectInspection:",i),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message)}},async loadAssetsFromBackend(){try{if(!GoogleIntegration||!AppState.googleConfig?.appsScript?.enabled){Utils.safeWarn("\u26A0\uFE0F Backend \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629");return}this.ensureData(),Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u062D\u0631\u064A\u0642 \u0645\u0646 Backend...");const e=await GoogleIntegration.sendRequest({action:"getAllFireEquipmentAssets",data:{}});if(e&&e.success&&Array.isArray(e.data)){const s=AppState.appData.fireEquipmentAssets||[],t=e.data,i=new Map;s.forEach(n=>{n.id&&i.set(n.id,n)}),t.forEach(n=>{n.id&&i.set(n.id,n)}),AppState.appData.fireEquipmentAssets=Array.from(i.values()),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${e.data.length} \u062C\u0647\u0627\u0632 \u0645\u0646 Backend (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentAssets.length})`)}else Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",e?.message)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",e)}},ensureData(){typeof AppState>"u"&&(AppState={}),AppState.appData||(AppState.appData={});const e=AppState.appData;let s=!1;if(Array.isArray(e.fireEquipmentAssets)||(e.fireEquipmentAssets=[]),Array.isArray(e.fireEquipmentInspections)||(e.fireEquipmentInspections=[]),Array.isArray(e.fireEquipment)&&e.fireEquipment.length>0){const t=e.fireEquipment.filter(i=>i.assetId&&(i.checkDate||i.createdAt));t.length>0&&(t.forEach(i=>{e.fireEquipmentInspections.some(a=>a.id===i.id)||e.fireEquipmentInspections.push({id:i.id||Utils.generateId("FEI"),assetId:i.assetId,checkDate:i.checkDate||i.createdAt,inspector:i.inspector||"",status:i.status||"\u0635\u0627\u0644\u062D",gaugeReading:i.gaugeReading||"",sealIntact:typeof i.sealIntact=="boolean"?i.sealIntact:null,remarks:i.remarks||i.notes||"",actions:i.actions||"",createdAt:i.createdAt||new Date().toISOString(),updatedAt:i.updatedAt||new Date().toISOString()})}),s=!0)}if(Array.isArray(e.fireEquipment)&&e.fireEquipment.length>0){const t=new Map,i=new Map;e.fireEquipmentAssets.forEach(r=>{r.id&&t.set(r.id,r),r.number&&t.set(r.number.toLowerCase(),r)}),e.fireEquipmentInspections.forEach(r=>{r.id&&i.set(r.id,r)});const n=new Map,a=new Map,o={\u0635\u0627\u0644\u062D:"\u0635\u0627\u0644\u062D","\u064A\u062D\u062A\u0627\u062C \u0625\u0635\u0644\u0627\u062D":"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629",\u0645\u0639\u0637\u0644:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"};e.fireEquipment.forEach(r=>{const d=String(r.equipmentNumber||r.number||"").trim(),p=d.toLowerCase();let c=p?n.get(p):null;!c&&p&&(c=t.get(p));let f=r.assetId?String(r.assetId):null;if(f&&f.startsWith("FEA_")){const w=t.get(f);w&&w.id.match(/^EFA-\d{4}$/)?f=w.id:f=null}if(!c&&f&&(c=t.get(f)),c)r.equipmentType&&(c.type=r.equipmentType),r.location&&(c.location=r.location),r.manufacturer&&(c.manufacturer=r.manufacturer),r.model&&(c.model=r.model),r.capacity&&(c.capacity=r.capacity),r.installationDate&&(c.installationDate=r.installationDate),(r.checkDate||r.lastServiceDate)&&(c.lastServiceDate=r.checkDate||r.lastServiceDate),r.status&&(c.status=o[r.status]||r.status),r.inspector&&(c.responsible=r.inspector),r.notes&&(c.notes=r.notes),r.updatedAt&&(c.updatedAt=r.updatedAt),a.set(c.id,c);else{const w=f&&f.match(/^EFA-\d{4}$/)?f:this.generateFireDeviceID(),S=this.generateQrData(w),E=o[r.status]||r.status||"\u0635\u0627\u0644\u062D";c={id:w,number:d||w,type:r.equipmentType||"",location:r.location||"",manufacturer:r.manufacturer||"",model:r.model||"",capacity:r.capacity||"",installationDate:r.installationDate||"",lastServiceDate:r.checkDate||r.lastServiceDate||"",status:E,responsible:r.inspector||"",notes:r.notes||"",qrCodeData:S,createdAt:r.createdAt||new Date().toISOString(),updatedAt:r.updatedAt||new Date().toISOString()},p&&n.set(p,c),a.set(c.id,c)}const u=r.id?String(r.id):Utils.generateId("FEI"),h=u.startsWith("FEI")?u:u.replace(/^FIRE_EQUIP/,"FEI"),g=r.checkDate||r.createdAt||new Date().toISOString(),A=o[r.status]||r.status||"\u0635\u0627\u0644\u062D";let m=i.get(h);m?(r.checkDate&&(m.checkDate=r.checkDate),r.inspector&&(m.inspector=r.inspector),r.status&&(m.status=o[r.status]||r.status),r.gaugeReading!==void 0&&(m.gaugeReading=r.gaugeReading),typeof r.sealIntact=="boolean"&&(m.sealIntact=r.sealIntact),r.notes&&(m.remarks=r.notes),r.actions&&(m.actions=r.actions),r.updatedAt&&(m.updatedAt=r.updatedAt)):(m={id:h,assetId:c.id,checkDate:g,inspector:r.inspector||c.responsible||"",status:A,gaugeReading:r.gaugeReading||"",sealIntact:typeof r.sealIntact=="boolean"?r.sealIntact:null,remarks:r.notes||"",actions:r.actions||"",createdAt:r.createdAt||g,updatedAt:r.updatedAt||g},e.fireEquipmentInspections.push(m))});const l=[...e.fireEquipmentAssets];a.forEach((r,d)=>{const p=l.findIndex(c=>c.id===d);p>=0?l[p]=r:l.push(r)}),e.fireEquipmentAssets=l,e.fireEquipment=[],s=!0}return s},getAssets(){return Array.isArray(AppState.appData.fireEquipmentAssets)?AppState.appData.fireEquipmentAssets:[]},getRegisterStatistics(){const e=this.getAssets();return{total:e.length,operational:e.filter(s=>s.status==="\u0635\u0627\u0644\u062D").length,needsMaintenance:e.filter(s=>s.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:e.filter(s=>s.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length}},getInspections(){const e=Array.isArray(AppState.appData.fireEquipmentInspections)?AppState.appData.fireEquipmentInspections:[];return e.length===0&&Array.isArray(AppState.appData.fireEquipment)&&AppState.appData.fireEquipment.length>0?(AppState.appData.fireEquipmentInspections=AppState.appData.fireEquipment,AppState.appData.fireEquipment):e},async renderAssets(){this.refreshFilterOptions(),this.renderSummary();const e=this.getFilteredAssets(),s=document.getElementById("fire-assets-table");s&&(s.innerHTML=this.renderAssetsTable(e),this.bindTableEvents(s));const t=document.getElementById("fire-recent-inspections");t&&(t.innerHTML=this.renderRecentInspections())},refreshFilterOptions(){const e=this.getAssets(),s=document.getElementById("fire-assets-type"),t=document.getElementById("fire-assets-status"),i=document.getElementById("fire-assets-location");if(s){const n=this.state.filters.type,a=Array.from(new Set(e.map(o=>o.type).filter(Boolean)));s.innerHTML=['<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>',...a.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)} (${e.filter(l=>l.type===o).length})</option>`)].join(""),s.value=a.includes(n)?n:"all",this.state.filters.type=s.value}if(t){const n=this.state.filters.status;t.innerHTML=['<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>',...this.statusOptions.map(a=>`<option value="${a.value}">${a.label} (${e.filter(o=>o.status===a.value).length})</option>`)].join(""),t.value=this.statusOptions.some(a=>a.value===n)?n:"all",this.state.filters.status=t.value}if(i){const n=this.state.filters.location,a=Array.from(new Set(e.map(o=>o.location).filter(Boolean)));i.innerHTML=['<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>',...a.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)} (${e.filter(l=>l.location===o).length})</option>`)].join(""),i.value=a.includes(n)?n:"all",this.state.filters.location=i.value}},renderSummary(){const e=this.getAssets(),s=this.getFilteredAssets(),t=this.getAssetStatsForList(s),i=Math.max(s.length,1),n=(u,h)=>{const g=document.getElementById(u);g&&g.style.setProperty("--fs-pct",`${Math.round((Number(h)||0)/i*100)}%`)},a=document.getElementById("fire-summary-total"),o=document.getElementById("fire-summary-active"),l=document.getElementById("fire-summary-maintenance"),r=document.getElementById("fire-summary-out");a&&(a.textContent=s.length),o&&(o.textContent=t.active),l&&(l.textContent=t.needsMaintenance),r&&(r.textContent=t.outOfService),n("fire-bar-total",s.length),n("fire-bar-active",t.active),n("fire-bar-maintenance",t.needsMaintenance),n("fire-bar-out",t.outOfService);const d=!!(this.state.filters.search||this.state.filters.type!=="all"||this.state.filters.status!=="all"||this.state.filters.location!=="all"),p=document.getElementById("fire-results-text");p&&(p.textContent=d?`${s.length} \u0645\u0646 \u0623\u0635\u0644 ${e.length} \u062C\u0647\u0627\u0632`:`\u0639\u0631\u0636 ${s.length} \u062C\u0647\u0627\u0632`);const c=document.getElementById("fire-results-chip");c&&c.classList.toggle("is-filtered",d);const f=document.getElementById("fire-clear-filters");f&&f.classList.toggle("visible",d),document.querySelectorAll("#fire-status-chips .fire-chip").forEach(u=>{u.classList.toggle("active",u.dataset.status===(this.state.filters.status||"all"))})},getAssetStatsForList(e){e=e||[];const s=e.length,t=e.filter(a=>a.status==="\u0635\u0627\u0644\u062D").length,i=e.filter(a=>a.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,n=e.filter(a=>a.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length;return{total:s,active:t,needsMaintenance:i,outOfService:n}},renderAssetsTable(e){return e.length?`
            <div class="table-wrapper fire-assets-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 120px;">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 100px;">\u0627\u0644\u0646\u0648\u0639</th>
                            <th style="min-width: 150px;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            <th style="min-width: 100px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th style="min-width: 120px;">\u0622\u062E\u0631 \u0641\u062D\u0635</th>
                            <th style="min-width: 150px;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>${e.map(t=>{const i=this.getLatestInspection(t.id),n=i?Utils.formatDate(i.checkDate):"-",a=this.getStatusBadge(t.status);return`
                <tr>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(t.number||"-")}</div>
                        <div class="text-xs text-gray-400">${Utils.escapeHTML(t.model||"")}</div>
                    </td>
                    <td>${Utils.escapeHTML(t.type||"")}</td>
                    <td>${Utils.escapeHTML(t.location||"")}</td>
                    <td>${a}</td>
                    <td>${n}</td>
                    <td>
                        <div class="flex flex-wrap gap-2">
                            <button class="btn-icon btn-icon-primary" data-action="view" data-id="${t.id}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-icon-secondary" data-action="qr" data-id="${t.id}" title="\u0637\u0628\u0627\u0639\u0629 QR Code">
                                <i class="fas fa-qrcode"></i>
                            </button>
                            ${this.canEdit()?`
                            <button class="btn-icon btn-icon-warning" data-action="edit" data-id="${t.id}" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062C\u0647\u0627\u0632">
                                <i class="fas fa-edit"></i>
                            </button>
                            `:""}
                            ${this.canDelete()?`
                            <button class="btn-icon btn-icon-danger" data-action="delete" data-id="${t.id}" title="\u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632">
                                <i class="fas fa-trash"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}</tbody>
                </table>
            </div>
        `:'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F\u060C \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629.</p></div>'},renderRecentInspections(){const e=this.getInspections().slice().sort((t,i)=>new Date(i.checkDate||i.createdAt||0)-new Date(t.checkDate||t.createdAt||0)).slice(0,6);return e.length?`<div class="divide-y divide-gray-100">${e.map(t=>{const i=this.getAssets().find(a=>a.id===t.assetId),n=i?i.number:t.assetId;return`
                <div class="border-b border-gray-100 py-3 last:border-b-0">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="font-semibold text-gray-800">${Utils.escapeHTML(n||"-")}</p>
                            <p class="text-xs text-gray-500">${Utils.formatDate(t.checkDate)}</p>
                        </div>
                        <div>${this.getStatusBadge(t.status)}</div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">\u0627\u0644\u0645\u0641\u062A\u0634: ${Utils.escapeHTML(t.inspector||"-")}</p>
                </div>
            `}).join("")}</div>`:'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0645\u0624\u062E\u0631\u0627\u064B.</p></div>'},getStatusBadge(e){const s=e||"";let t="badge-info";return s==="\u0635\u0627\u0644\u062D"?t="badge-success":s==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?t="badge-warning":s==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&(t="badge-danger"),`<span class="badge ${t}">${Utils.escapeHTML(s||"-")}</span>`},bindTableEvents(e){!e||e.dataset.eventsBound==="true"||(e.addEventListener("click",async s=>{const t=s.target.closest("[data-action]");if(!t)return;s.preventDefault();const i=t.dataset.action,n=t.dataset.id;switch(i){case"view":this.viewAsset(n);break;case"qr":this.printQr(n);break;case"edit":await this.showAssetForm(this.getAssets().find(a=>a.id===n)||null);break;case"delete":await this.deleteAsset(n);break;default:break}}),e.dataset.eventsBound="true")},setupEventListeners(){const e=document.getElementById("add-fire-asset-btn");e&&e.addEventListener("click",async()=>await this.showAssetForm());const s=document.getElementById("public-fire-link-btn");s&&s.addEventListener("click",()=>this.showPublicLinkModal());const t=document.getElementById("batch-print-qr-btn");t&&t.addEventListener("click",()=>this.showBatchPrintQrModal());const i=document.getElementById("scan-qr-inspection-btn");i&&i.addEventListener("click",()=>this.startQRScan());const n=document.getElementById("mobile-scan-qr-btn");n&&n.addEventListener("click",()=>this.startQRScan());const a=document.getElementById("refresh-fire-equipment-btn");a&&a.addEventListener("click",async()=>{try{const o=a.innerHTML;a.disabled=!0,a.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B...',await this.loadFireEquipmentDataAsync(),await this.refreshCurrentTab(),a.disabled=!1,a.innerHTML=o,typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",o),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),a.disabled=!1,a.innerHTML='<i class="fas fa-sync-alt ml-2"></i>\u062A\u062D\u062F\u064A\u062B'}}),this.setupTabEventListeners(this.state.currentTab)},bindRegisterTableEvents(e){!e||e.dataset.eventsBound==="true"||(e.addEventListener("click",async s=>{const t=s.target.closest("[data-action]");if(!t)return;s.preventDefault();const i=t.dataset.action,n=t.dataset.id;switch(i){case"view-details":this.viewAsset(n);break;case"print-qr":this.printQr(n);break;case"edit-device":await this.showAssetForm(this.getAssets().find(a=>a.id===n)||null);break;case"delete-device":await this.deleteAsset(n);break;default:break}}),e.dataset.eventsBound="true")},setupTabEventListeners(e){if(e==="database"){const s=document.getElementById("fire-assets-search");if(s){const l=s.cloneNode(!0);s.parentNode.replaceChild(l,s),l.addEventListener("input",()=>this.applyFilters())}const t=document.getElementById("fire-assets-type");if(t){const l=t.cloneNode(!0);t.parentNode.replaceChild(l,t),l.addEventListener("change",()=>this.applyFilters())}const i=document.getElementById("fire-assets-status");if(i){const l=i.cloneNode(!0);i.parentNode.replaceChild(l,i),l.addEventListener("change",()=>this.applyFilters())}const n=document.getElementById("fire-assets-location");if(n){const l=n.cloneNode(!0);n.parentNode.replaceChild(l,n),l.addEventListener("change",()=>this.applyFilters())}const a=document.getElementById("fire-status-chips");if(a){const l=a.cloneNode(!0);a.parentNode.replaceChild(l,a),l.addEventListener("click",r=>{const d=r.target.closest(".fire-chip");if(!d)return;this.state.filters.status=d.dataset.status||"all";const p=document.getElementById("fire-assets-status");p&&(p.value=this.state.filters.status),this.applyFilters()})}const o=document.getElementById("fire-clear-filters");if(o){const l=o.cloneNode(!0);o.parentNode.replaceChild(l,o),l.addEventListener("click",()=>{this.state.filters={search:"",type:"all",status:"all",location:"all"};const r=document.getElementById("fire-assets-search");r&&(r.value="");const d=document.getElementById("fire-assets-type");d&&(d.value="all");const p=document.getElementById("fire-assets-status");p&&(p.value="all");const c=document.getElementById("fire-assets-location");c&&(c.value="all"),this.renderAssets(),typeof Notification<"u"&&Notification.info&&Notification.info("\u062A\u0645\u062A \u0625\u0632\u0627\u0644\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631")})}}else if(e==="inspections"){const s=document.getElementById("new-inspection-btn");if(s){const i=s.cloneNode(!0);s.parentNode.replaceChild(i,s),i.addEventListener("click",()=>{this.startQRScan()})}const t=document.getElementById("mobile-scan-qr-btn");if(t){const i=t.cloneNode(!0);t.parentNode.replaceChild(i,t),i.addEventListener("click",()=>{this.startQRScan()})}}else if(e==="register"){const s=document.getElementById("fire-register-table");s&&this.bindRegisterTableEvents(s);const t=document.getElementById("register-add-device-btn");if(t){const l=t.cloneNode(!0);t.parentNode.replaceChild(l,t),l.addEventListener("click",async()=>{await this.showAssetForm()})}const i=document.getElementById("register-batch-print-qr-btn");if(i){const l=i.cloneNode(!0);i.parentNode.replaceChild(l,i),l.addEventListener("click",()=>{this.showBatchPrintQrModal()})}const n=document.getElementById("register-import-excel-btn");if(n){const l=n.cloneNode(!0);n.parentNode.replaceChild(l,n),l.addEventListener("click",()=>{this.showImportExcelModal()})}const a=document.getElementById("register-export-excel-btn");if(a){const l=a.cloneNode(!0);a.parentNode.replaceChild(l,a),l.addEventListener("click",()=>{this.exportToExcel()})}const o=document.getElementById("register-export-pdf-btn");if(o){const l=o.cloneNode(!0);o.parentNode.replaceChild(l,o),l.addEventListener("click",()=>{this.exportRegisterToPDF()})}}else e==="analytics"?this.setupAnalyticsEventListeners():e==="approval-requests"&&this.setupApprovalRequestsEventListeners()},applyFilters(){const e=document.getElementById("fire-assets-search"),s=document.getElementById("fire-assets-type"),t=document.getElementById("fire-assets-status"),i=document.getElementById("fire-assets-location");this.state.filters.search=(e?.value||"").trim().toLowerCase(),this.state.filters.type=s?s.value:"all",this.state.filters.status=t?t.value:"all",this.state.filters.location=i?i.value:"all",this.renderAssets()},getFilteredAssets(){const e=this.state.filters;return this.getAssets().filter(s=>{const t=e.search,i=!t||[s.number,s.type,s.location,s.manufacturer,s.responsible].some(l=>String(l||"").toLowerCase().includes(t)),n=e.type==="all"||s.type===e.type,a=e.status==="all"||s.status===e.status,o=e.location==="all"||s.location===e.location;return i&&n&&a&&o})},async showAssetForm(e=null){const s=!!e;if(s&&!this.canEdit()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0623\u062C\u0647\u0632\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0639\u062F\u064A\u0644.");return}if(!s&&!this.canAdd()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u062C\u0647\u0632\u0629 \u062C\u062F\u064A\u062F\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.");return}const t=e?.id||this.generateFireDeviceID();typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const i=document.createElement("div");i.className="modal-overlay fire-modal",i.innerHTML=`
            <div class="modal-content" style="max-width: 760px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${s?"\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0627\u0632":"\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u0625\u0637\u0641\u0627\u0621 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="fire-asset-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                <select id="asset-factory" class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>
                                    ${this.getSiteOptions().map(o=>{const l=e&&(e.factoryId===o.id||e.factoryId===String(o.id)||e.factory===o.id&&!e.factoryId||e.factory===o.name);return`<option value="${o.id}" ${l?"selected":""}>${Utils.escapeHTML(o.name)}</option>`}).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                <select id="asset-sub-location" class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                    ${(()=>{const o=e?.factoryId||e?.factory||"";return this.getPlaceOptions(o).map(r=>{const d=e&&(e.subLocationId===r.id||e.subLocationId===String(r.id)||e.subLocation===r.id&&!e.subLocationId||e.subLocation===r.name);return`<option value="${r.id}" ${d?"selected":""}>${Utils.escapeHTML(r.name)}</option>`}).join("")})()}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632 *</label>
                                <input type="text" id="asset-location" required class="form-input" value="${Utils.escapeHTML(e?.location||"")}" placeholder="\u0627\u0644\u0645\u0628\u0646\u0649 / \u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0646\u0637\u0642\u0629">
                            </div>
                            <div>
                                <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632 *</label>
                                <div class="flex gap-2">
                                    <input type="text" id="asset-type" list="fire-asset-types" required class="form-input flex-1" value="${Utils.escapeHTML(e?.type||"")}" placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0623\u0636\u0641 \u0646\u0648\u0639 \u062C\u062F\u064A\u062F">
                                    <button type="button" id="manage-types-btn" class="btn-secondary" title="\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                </div>
                                <datalist id="fire-asset-types">
                                    ${this.assetTypes.map(o=>`<option value="${Utils.escapeHTML(o)}"></option>`).join("")}
                                </datalist>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645 *</label>
                                <input type="text" id="asset-capacity" required class="form-input" value="${Utils.escapeHTML(e?.capacity||e?.capacityKg||"")}" placeholder="\u0645\u062B\u0627\u0644: 6 \u0643\u062C\u0645">
                            </div>
                            <div>
                                <label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639 *</label>
                                <input type="text" id="asset-site-number" required class="form-input" value="${Utils.escapeHTML(e?.siteNumber||e?.number||"")}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0641\u064A \u0627\u0644\u0645\u0648\u0642\u0639">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629</label>
                                <input type="text" id="asset-manufacturer" class="form-input" value="${Utils.escapeHTML(e?.manufacturer||"")}" placeholder="\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629">
                            </div>
                            <div>
                                <label class="form-label">\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639</label>
                                <input type="number" id="asset-manufacturing-year" class="form-input" value="${e?.manufacturingYear||""}" placeholder="\u0645\u062B\u0627\u0644: 2023" min="1900" max="2100">
                            </div>
                            <div>
                                <label class="form-label">\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632</label>
                                <input type="text" id="asset-serial-number" class="form-input" value="${Utils.escapeHTML(e?.serialNumber||"")}" placeholder="\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644">
                            </div>
                            <div>
                                <label class="form-label">\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632 *</label>
                                <select id="asset-status" class="form-input" required>
                                    ${this.statusOptions.map(o=>`<option value="${o.value}" ${e?.status===o.value?"selected":""}>${o.label}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A</label>
                                <input type="text" id="asset-installation-method" class="form-input" value="${Utils.escapeHTML(e?.installationMethod||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0645\u062B\u0628\u062A \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u0626\u0637\u060C \u0645\u062A\u062D\u0631\u0643">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u062F\u064A\u0644 / \u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A</label>
                                <input type="text" id="asset-model" class="form-input" value="${Utils.escapeHTML(e?.model||"")}" placeholder="\u0627\u0644\u0645\u0648\u062F\u064A\u0644 \u0623\u0648 \u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A">
                            </div>
                            <div>
                                <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0631\u0643\u064A\u0628</label>
                                <input type="date" id="asset-installation" class="form-input" value="${e?.installationDate?new Date(e.installationDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="form-label">\u0622\u062E\u0631 \u0635\u064A\u0627\u0646\u0629</label>
                                <input type="date" id="asset-last-service" class="form-input" value="${e?.lastServiceDate?new Date(e.lastServiceDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062C\u0647\u0627\u0632</label>
                                <input type="text" id="asset-responsible" class="form-input" value="${Utils.escapeHTML(e?.responsible||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0623\u0648 \u0627\u0644\u0642\u0633\u0645">
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                <textarea id="asset-notes" class="form-input" rows="3" placeholder="\u0623\u064A \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.notes||"")}</textarea>
                            </div>
                        </div>
                        <div class="flex items-center justify-center gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${s?"\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062C\u0647\u0627\u0632"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(i);const n=i.querySelector("#fire-asset-form");n.addEventListener("submit",async o=>{o.preventDefault();const l=n?.querySelector('button[type="submit"]');if(l&&l.disabled)return;let r="";l&&(r=l.innerHTML,l.disabled=!0,l.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const d=new Date().toISOString(),p=this.getAssets(),c=p.findIndex(v=>v.id===t),f=document.getElementById("asset-type").value.trim();f&&!this.assetTypes.includes(f)&&this.assetTypes.push(f);const u=v=>{const q=document.getElementById(v);return q?q.value.trim():""},h=v=>{const q=document.getElementById(v);return q?q.value.trim():null},g=u("asset-factory"),A=u("asset-sub-location"),w=this.getSiteOptions().find(v=>v.id===g),E=this.getPlaceOptions(g).find(v=>v.id===A),y={id:t,number:u("asset-site-number")||t,siteNumber:u("asset-site-number")||t,type:f,location:u("asset-location"),subLocation:A,subLocationId:A?String(A).trim():null,subLocationName:E?E.name:"",manufacturer:u("asset-manufacturer"),factory:g,factoryId:g?String(g).trim():null,factoryName:w?w.name:"",model:u("asset-model"),capacity:u("asset-capacity"),capacityKg:u("asset-capacity"),manufacturingYear:(()=>{const v=document.getElementById("asset-manufacturing-year");return v&&v.value?parseInt(v.value):null})(),productionDate:(()=>{const v=document.getElementById("asset-production-date");return v?this.toISODate(v.value):null})(),serialNumber:u("asset-serial-number"),installationMethod:u("asset-installation-method"),installationDate:(()=>{const v=document.getElementById("asset-installation");return v?this.toISODate(v.value):null})(),lastServiceDate:(()=>{const v=document.getElementById("asset-last-service");return v?this.toISODate(v.value):null})(),status:u("asset-status"),responsible:u("asset-responsible"),notes:u("asset-notes"),qrCodeData:e?.qrCodeData||this.generateQrData(t),createdAt:e?.createdAt||d,updatedAt:d};c>-1?p[c]={...p[c],...y}:p.push(y),Loading.show();let b;if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){if(b=await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:y}),!b.success)throw new Error(b.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632");Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632 \u0641\u064A Backend:",y.id);try{await this.loadAssetsFromBackend()}catch(v){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",v)}}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(s?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0646\u062C\u0627\u062D"),l&&(l.disabled=!1,l.innerHTML=r),i.remove(),this.state.currentTab==="database"?this.renderAssets():this.state.currentTab==="register"?await this.refreshRegisterTable():await this.refreshCurrentTab()}catch(d){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632:",d),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632: "+(d.message||d)),l&&(l.disabled=!1,l.innerHTML=r)}});const a=i.querySelector("#manage-types-btn");a&&a.addEventListener("click",()=>{this.showManageTypesModal()}),setTimeout(()=>{const o=i.querySelector("#asset-factory"),l=i.querySelector("#asset-sub-location");o&&l&&o.addEventListener("change",()=>{const r=o.value,d=this.getPlaceOptions(r);l.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>',d.forEach(p=>{const c=document.createElement("option");c.value=p.id,c.textContent=p.name,l.appendChild(c)})})},100)},async startQRScan(){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){Notification.error("\u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0644\u0627 \u064A\u062F\u0639\u0645 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u062A\u0635\u0641\u062D \u062D\u062F\u064A\u062B.");return}const e=document.createElement("div");e.className="modal-overlay fire-modal",e.innerHTML=`
            <style>
                .qr-scanner-modal {
                    max-width: 95%;
                    width: 100%;
                    max-height: 95vh;
                    overflow-y: auto;
                }
                @media (min-width: 768px) {
                    .qr-scanner-modal {
                        max-width: 650px;
                    }
                }
                #qr-scanner-container {
                    position: relative;
                    width: 100%;
                    max-width: 100%;
                    margin: 0 auto;
                    background: #000;
                    border-radius: 12px;
                    overflow: hidden;
                }
                #qr-video {
                    width: 100%;
                    height: auto;
                    min-height: 300px;
                    max-height: 60vh;
                    object-fit: cover;
                    display: block;
                }
                #qr-scan-overlay {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 70%;
                    max-width: 250px;
                    height: 250px;
                    border: 3px solid #3B82F6;
                    border-radius: 12px;
                    pointer-events: none;
                    animation: pulse-border 2s infinite;
                }
                @keyframes pulse-border {
                    0%, 100% { border-color: #3B82F6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
                    50% { border-color: #60A5FA; box-shadow: 0 0 30px rgba(96, 165, 250, 0.8); }
                }
                .qr-scan-status {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                }
                .manual-input-section {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    padding: 20px;
                    border-radius: 12px;
                    margin-top: 20px;
                }
            </style>
            <div class="modal-content qr-scanner-modal">
                <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                    <h2 class="modal-title" style="font-size: 1.5rem; font-weight: 700; color: white;">
                        <i class="fas fa-qrcode ml-2"></i>
                        \u0645\u0633\u062D QR Code \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A
                    </h2>
                    <button class="modal-close" onclick="if(confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u063A\u0644\u0627\u0642 \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0645\u0633\u062D\u061F')) { this.closest('.modal-overlay').remove(); FireEquipment.stopQRScan(); }" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div id="qr-scanner-container">
                        <video id="qr-video" autoplay playsinline muted></video>
                        <canvas id="qr-canvas" style="display: none;"></canvas>
                        <div id="qr-scan-overlay"></div>
                        <div class="qr-scan-status">
                            <i class="fas fa-camera ml-2"></i>
                            \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0633\u062D...
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <p class="text-base font-semibold text-gray-700 mb-2">
                            <i class="fas fa-info-circle ml-2 text-blue-500"></i>
                            \u0648\u062C\u0651\u0647 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0646\u062D\u0648 QR Code \u0627\u0644\u0645\u064F\u0644\u0635\u0642 \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632
                        </p>
                        <p class="text-sm text-gray-500">
                            \u062A\u0623\u0643\u062F \u0645\u0646 \u0648\u0636\u0648\u062D \u0627\u0644\u0625\u0636\u0627\u0621\u0629 \u0648\u0627\u0644\u062A\u0631\u0643\u064A\u0632 \u0639\u0644\u0649 \u0627\u0644\u0643\u0648\u062F
                        </p>
                    </div>
                    <div class="manual-input-section">
                        <label class="form-label" style="font-weight: 600; color: #495057; margin-bottom: 10px; display: block;">
                            <i class="fas fa-keyboard ml-2"></i>
                            \u0623\u0648 \u0623\u062F\u062E\u0644 DeviceID \u064A\u062F\u0648\u064A\u0627\u064B:
                        </label>
                        <div class="flex gap-2">
                            <input type="text" id="manual-device-id" class="form-input flex-1" placeholder="\u0645\u062B\u0627\u0644: EFA-0001" style="border: 2px solid #667eea; font-size: 1rem; padding: 12px;">
                            <button type="button" id="manual-submit-btn" class="btn-primary" style="padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); white-space: nowrap;">
                                <i class="fas fa-check ml-2"></i>\u062A\u0623\u0643\u064A\u062F
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">
                            <i class="fas fa-lightbulb ml-1"></i>
                            \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0645\u062A\u0648\u0642\u0639: EFA-0000
                        </p>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(e);const s=e.querySelector("#qr-video"),t=e.querySelector("#qr-canvas"),i=t.getContext("2d");let n=null,a=null;const o=e.querySelector("#manual-submit-btn"),l=e.querySelector("#manual-device-id"),r=e.querySelector(".qr-scan-status");o.addEventListener("click",async()=>{const d=l.value.trim();if(!d){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 DeviceID");return}this.stopQRScan(),e.remove(),await this.processScannedDeviceId(d)}),l.addEventListener("keypress",async d=>{d.key==="Enter"&&o.click()});try{const d={video:{facingMode:{ideal:"environment"},width:{ideal:1280},height:{ideal:720}}};n=await navigator.mediaDevices.getUserMedia(d),s.srcObject=n,r&&(r.innerHTML='<i class="fas fa-camera ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0633\u062D...',r.style.background="rgba(34, 197, 94, 0.8)"),s.addEventListener("loadedmetadata",()=>{t.width=s.videoWidth,t.height=s.videoHeight}),a=setInterval(()=>{if(s.readyState===s.HAVE_ENOUGH_DATA){i.drawImage(s,0,0,t.width,t.height);const p=i.getImageData(0,0,t.width,t.height);if(typeof jsQR<"u"){const c=jsQR(p.data,p.width,p.height,{inversionAttempts:"dontInvert"});if(c&&c.data){const f=c.data.trim();r&&(r.innerHTML='<i class="fas fa-check-circle ml-2"></i>\u062A\u0645 \u0627\u0644\u0645\u0633\u062D!',r.style.background="rgba(34, 197, 94, 0.9)"),this.stopQRScan(),setTimeout(()=>e.remove(),300),this.processScannedDeviceId(f)}}}},100)}catch(d){const p=d?.message||d?.toString()||"",c=p.includes("Permissions policy")||p.includes("Permission policy")||p.includes("[Violation]")||p.includes("not allowed in this document");c||Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627:",d),r&&(r.innerHTML='<i class="fas fa-exclamation-triangle ml-2"></i>\u0641\u0634\u0644 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0643\u0627\u0645\u064A\u0631\u0627',r.style.background="rgba(239, 68, 68, 0.8)"),c?Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A."):Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627. \u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A.")}e.dataset.stream="active",window._fireEquipmentStream=n,window._fireEquipmentScanInterval=a},stopQRScan(){window._fireEquipmentStream&&(window._fireEquipmentStream.getTracks().forEach(e=>e.stop()),window._fireEquipmentStream=null),window._fireEquipmentScanInterval&&(clearInterval(window._fireEquipmentScanInterval),window._fireEquipmentScanInterval=null)},async processScannedDeviceId(e){if(!e){Notification.error("DeviceID \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}Loading.show();try{const s=await this.getDeviceDataFromRegister(e);if(!s){Notification.error(`\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062C\u0647\u0627\u0632 \u0628\u0631\u0642\u0645: ${e}`),Loading.hide();return}await this.showDeviceDataFromQR(s)}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632: "+s.message)}finally{Loading.hide()}},getDeviceDataFromRegister(e){const s=this.getAssets().find(i=>i.id===e);if(!s)return null;const t=this.getLatestInspection(e);return{deviceId:s.id,deviceNumber:s.number||s.id,deviceType:s.type||"",location:s.location||"",capacity:s.capacity||"",lastInspectionDate:t?t.checkDate:null,lastInspector:t?t.inspector:"",deviceStatus:s.status||"",manufacturer:s.manufacturer||"",model:s.model||"",installationDate:s.installationDate||""}},async showDeviceDataFromQR(e){const s=this.checkMonthlyInspectionAllowed(e.deviceId);if(!s.allowed){Notification.warning(s.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A");return}const t=AppState.currentUser,i=t&&(t.role==="admin"||t.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||t.role==="system_admin"||typeof Permissions<"u"&&Permissions.isCurrentUserAdmin&&Permissions.isCurrentUserAdmin()),n=t&&(t.role==="safety_officer"||t.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"),a=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("fire-equipment","inspections");if(!i&&!(n&&a)&&!(typeof Permissions<"u"&&Permissions.hasAccess&&Permissions.hasAccess("fire-equipment"))){Notification.error("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u064A\u062A\u0637\u0644\u0628 \u0635\u0644\u0627\u062D\u064A\u0629 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}this.showMobileInspectionForm(null,e.deviceId)},async initiateMonthlyInspection(e){const s=this.checkMonthlyInspectionAllowed(e);if(!s.allowed){Notification.warning(s.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A");return}if(!await this.requestAdminApproval(e)){Notification.info("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 - \u0645\u0637\u0644\u0648\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0645\u062F\u064A\u0631");return}this.showInspectionForm(null,e)},checkMonthlyInspectionAllowed(e){const s=new Date,t=s.getMonth(),i=s.getFullYear(),n=this.getInspections().filter(a=>{if(a.assetId!==e)return!1;const o=new Date(a.checkDate||a.createdAt);return o.getMonth()===t&&o.getFullYear()===i});if(n.length>0){const a=n[0];return{allowed:!1,reason:`\u062A\u0645 \u0641\u062D\u0635 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 (${Utils.formatDate(a.checkDate||a.createdAt)}). \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0622\u062E\u0631 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0634\u0647\u0631.`}}return{allowed:!0,reason:""}},async requestAdminApproval(e){return new Promise(async s=>{const t=AppState.currentUser;if(t&&(t.role==="admin"||t.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||typeof Permissions<"u"&&Permissions.isCurrentUserAdmin&&Permissions.isCurrentUserAdmin())){s(!0);return}try{const n=this.getAssets().find(r=>r.id===e),a=n?n.number||n.id:e,o=n&&n.location||"",l=await this.createInspectionApprovalRequest(e,a,o);l&&(Notification.info("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629. \u0633\u064A\u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u0645\u062F\u064A\u0631 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629."),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&RealtimeSyncManager.notifyChange("fireEquipmentApprovalRequests","add",l.id)),s(!1)}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",n),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629"),s(!1)}})},async createInspectionApprovalRequest(e,s,t){const i=AppState.currentUser;if(!i)throw new Error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0633\u062C\u0644 \u062F\u062E\u0648\u0644");const n=Utils.generateId("FEAR"),a=new Date().toISOString(),o={id:n,type:"inspection",assetId:e,assetNumber:s,assetLocation:t,requestedBy:i.name||i.email||"\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",requestedById:i.id||i.email||"",userEmail:i.email||"",requestedAt:a,status:"pending",comments:`\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0644\u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632: ${s}${t?` - ${t}`:""}`,createdAt:a,updatedAt:a};return AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests||(AppState.appData.fireEquipmentApprovalRequests=[]),AppState.appData.fireEquipmentApprovalRequests.push(o),typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(AppState.appData.fireEquipmentApprovalRequests)),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),(async()=>{try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const l=await GoogleIntegration.sendRequest({action:"addFireEquipmentApprovalRequest",data:o});l.success?(Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A Backend:",n),await this.loadApprovalRequestsFromBackend(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0641\u064A Backend:",l.message)}}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0641\u064A Backend:",l)}})(),this.notifyAdminsAboutApprovalRequest(o).catch(l=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",l)}),o},async notifyAdminsAboutApprovalRequest(e){try{const s=[];if(AppState.appData&&AppState.appData.users&&s.push(...AppState.appData.users.filter(t=>t.role==="admin"||t.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||typeof Permissions<"u"&&Permissions.isUserAdmin&&Permissions.isUserAdmin(t))),s.length===0)GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:"admin",title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621",message:`\u0637\u0644\u0628 ${e.requestedBy} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0627\u0644\u062C\u0647\u0627\u0632: ${e.assetNumber}${e.assetLocation?` - ${e.assetLocation}`:""}`,type:"approval_request",priority:"high",link:"#fire-equipment-approval-requests",data:{module:"fire-equipment",action:"inspection_approval",requestId:e.id}}}).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631:",t)});else for(const t of s)if(t.id||t.email)try{GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:t.id||t.email,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621",message:`\u0637\u0644\u0628 ${e.requestedBy} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0627\u0644\u062C\u0647\u0627\u0632: ${e.assetNumber}${e.assetLocation?` - ${e.assetLocation}`:""}`,type:"approval_request",priority:"high",link:"#fire-equipment-approval-requests",data:{module:"fire-equipment",action:"inspection_approval",requestId:e.id}}}).catch(i=>{Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631 ${t.name||t.email}:`,i)})}catch(i){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631 ${t.name||t.email}:`,i)}Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0628\u062E\u0635\u0648\u0635 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",e.id)}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",s)}},showInspectionForm(e=null,s=null){if(!s&&!e?.assetId){Notification.warning("\u064A\u062C\u0628 \u0645\u0633\u062D QR Code \u0623\u0648\u0644\u0627\u064B \u0644\u0628\u062F\u0621 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A");return}const t=!!e,i=e?.id||Utils.generateId("FEI"),n=e?.assetId||s,a=this.getAssets().find(p=>p.id===n);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632");return}const o=e?.checkDate?new Date(e.checkDate).toISOString().slice(0,10):new Date().toISOString().slice(0,10),l=document.createElement("div");l.className="modal-overlay fire-modal",l.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0641\u062D\u0635 \u062C\u0647\u0627\u0632":"\u062A\u0633\u062C\u064A\u0644 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0644\u0644\u062C\u0647\u0627\u0632"}</h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="fire-inspection-form" class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <p class="text-sm text-blue-800">
                                <i class="fas fa-info-circle ml-2"></i>
                                <strong>DeviceID:</strong> ${Utils.escapeHTML(a.id)} | 
                                <strong>\u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(a.number||a.id)} | 
                                <strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(a.location||"-")}
                            </p>
                        </div>
                        <input type="hidden" id="inspection-asset" value="${n}">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635 *</label>
                                <input type="date" id="inspection-date" required class="form-input" value="${o}">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0641\u062A\u0634 *</label>
                                <input type="text" id="inspection-inspector" required class="form-input" value="${Utils.escapeHTML(e?.inspector||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0641\u062A\u0634">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                <select id="inspection-status" class="form-input" required>
                                    ${this.statusOptions.map(p=>`<option value="${p.value}" ${e?.status===p.value?"selected":""}>${p.label}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0639\u062F\u0627\u062F / \u0627\u0644\u0636\u063A\u0637</label>
                                <input type="text" id="inspection-gauge" class="form-input" value="${Utils.escapeHTML(e?.gaugeReading||"")}" placeholder="\u0645\u062B\u0627\u0644: 150 PSI">
                            </div>
                            <div>
                                <label class="form-label">\u0635\u0645\u0627\u0645 \u0648\u062A\u064A\u0644\u0629 \u0627\u0644\u0623\u0645\u0627\u0646</label>
                                <select id="inspection-seal" class="form-input">
                                    <option value="unknown">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</option>
                                    <option value="true" ${e?.sealIntact===!0?"selected":""}>\u0633\u0644\u064A\u0645</option>
                                    <option value="false" ${e?.sealIntact===!1?"selected":""}>\u0645\u0643\u0633\u0648\u0631 / \u0645\u0641\u0642\u0648\u062F</option>
                                </select>
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                <textarea id="inspection-remarks" class="form-input" rows="3" placeholder="\u0623\u064A\u0629 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.remarks||"")}</textarea>
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629</label>
                                <textarea id="inspection-actions" class="form-input" rows="2" placeholder="\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0623\u0648 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A">${Utils.escapeHTML(e?.actions||"")}</textarea>
                            </div>
                        </div>
                        <div class="flex items-center justify-center gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(l);const r=l.querySelector("#fire-inspection-form");if(!r){Utils.safeError("\u274C \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648\u0630\u062C #fire-inspection-form");return}let d=!1;r.addEventListener("submit",async p=>{if(p.preventDefault(),p.stopPropagation(),d){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0628\u0627\u0644\u0641\u0639\u0644");return}d=!0;const c=r.querySelector('button[type="submit"]'),f=c?c.innerHTML:"";try{c&&(c.disabled=!0,c.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const u=new Date().toISOString(),h=b=>{const v=document.getElementById(b);return v?v.value.trim():""},g=b=>{const v=document.getElementById(b);return v?v.value:null},A=document.getElementById("inspection-asset"),m=(A?A.value:"")||n;if(!m){Notification.error("\u062E\u0637\u0623: DeviceID \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),d=!1,c&&(c.disabled=!1,c.innerHTML=f);return}if(!t){const b=this.checkMonthlyInspectionAllowed(m);if(!b.allowed){Notification.warning(b.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A"),d=!1,c&&(c.disabled=!1,c.innerHTML=f);return}}const w={id:i,assetId:m,checkDate:(()=>{const b=document.getElementById("inspection-date");return b&&this.toISODate(b.value)||u})(),inspector:h("inspection-inspector"),status:h("inspection-status"),gaugeReading:h("inspection-gauge"),sealIntact:(()=>{const b=document.getElementById("inspection-seal");if(!b)return null;const v=b.value;return v==="true"?!0:v==="false"?!1:null})(),remarks:h("inspection-remarks"),actions:h("inspection-actions"),createdAt:e?.createdAt||u,updatedAt:u};AppState.appData.fireEquipmentInspections||(AppState.appData.fireEquipmentInspections=[]);const S=AppState.appData.fireEquipmentInspections,E=S.findIndex(b=>b.id===i);E>-1?S[E]={...S[E],...w}:S.push(w);const y=this.getAssets().find(b=>b.id===m);y&&(y.lastServiceDate=w.checkDate,y.status=w.status,y.updatedAt=u),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),l&&l.parentNode&&l.remove(),this.refreshCurrentTab().catch(b=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",b)}),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0635":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635 \u0628\u0646\u062C\u0627\u062D"),(async()=>{try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const b=await GoogleIntegration.sendRequest({action:t?"updateFireEquipmentInspection":"addFireEquipmentInspection",data:w});if(!b.success)throw new Error(b.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635");Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A Backend:",w.id),y&&(await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:y}),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632:",y.id)),this.refreshCurrentTab().catch(v=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",v)})}}catch(b){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0641\u062D\u0635:",b)}})(),d=!1,c&&(c.disabled=!1,c.innerHTML=f)}catch(u){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",u),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639: "+(u.message||u)),d=!1,c&&(c.disabled=!1,c.innerHTML=f)}})},showMobileInspectionForm(e=null,s=null){if(!s&&!e?.assetId){Notification.warning("\u064A\u062C\u0628 \u0645\u0633\u062D QR Code \u0623\u0648\u0644\u0627\u064B \u0644\u0628\u062F\u0621 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A");return}const t=!!e,i=e?.id||Utils.generateId("FEI"),n=e?.assetId||s,a=this.getAssets().find(p=>p.id===n);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632");return}const o=e?.checkDate?new Date(e.checkDate).toISOString().slice(0,10):new Date().toISOString().slice(0,10),l=document.createElement("div");l.className="modal-overlay fire-modal",l.innerHTML=`
            <style>
                .mobile-inspection-modal {
                    max-width: 100%;
                    width: 100%;
                    max-height: 100vh;
                    height: 100vh;
                    margin: 0;
                    border-radius: 0;
                    display: flex;
                    flex-direction: column;
                }
                @media (min-width: 768px) {
                    .mobile-inspection-modal {
                        max-width: 600px;
                        max-height: 95vh;
                        height: auto;
                        margin: auto;
                        border-radius: 12px;
                    }
                }
                .mobile-inspection-header {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                    padding: 1.25rem;
                    border-radius: 0;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                @media (min-width: 768px) {
                    .mobile-inspection-header {
                        border-radius: 12px 12px 0 0;
                    }
                }
                .mobile-inspection-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.25rem;
                    -webkit-overflow-scrolling: touch;
                }
                .mobile-inspection-form-group {
                    margin-bottom: 1.5rem;
                }
                .mobile-inspection-label {
                    display: block;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.5rem;
                    font-size: 0.95rem;
                }
                .mobile-inspection-input {
                    width: 100%;
                    padding: 0.875rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }
                .mobile-inspection-input:focus {
                    outline: none;
                    border-color: #dc2626;
                }
                .mobile-inspection-select {
                    width: 100%;
                    padding: 0.875rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    background: white;
                }
                .mobile-inspection-textarea {
                    width: 100%;
                    padding: 0.875rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    min-height: 100px;
                    resize: vertical;
                }
                .mobile-inspection-actions {
                    position: sticky;
                    bottom: 0;
                    background: white;
                    padding: 1rem;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 0.75rem;
                }
                .mobile-inspection-btn {
                    flex: 1;
                    padding: 1rem;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .mobile-inspection-btn-primary {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                }
                .mobile-inspection-btn-secondary {
                    background: #f3f4f6;
                    color: #374151;
                }
                .device-info-card {
                    background: #f9fafb;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                }
                .device-info-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #e5e7eb;
                }
                .device-info-row:last-child {
                    border-bottom: none;
                }
                .device-info-label {
                    font-weight: 600;
                    color: #6b7280;
                    font-size: 0.875rem;
                }
                .device-info-value {
                    color: #111827;
                    font-weight: 500;
                }
                @media (max-width: 480px) {
                    .mobile-inspection-body {
                        padding: 1rem;
                    }
                    .mobile-inspection-form-group {
                        margin-bottom: 1.25rem;
                    }
                }
            </style>
            <div class="modal-content mobile-inspection-modal">
                <div class="mobile-inspection-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: white;">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            ${t?"\u062A\u0639\u062F\u064A\u0644 \u0641\u062D\u0635":"\u0641\u062D\u0635 \u0634\u0647\u0631\u064A"}
                        </h2>
                        <button class="modal-close" onclick="FireEquipment.confirmClose(this)" style="color: white; font-size: 1.5rem; background: rgba(255,255,255,0.2); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="mobile-inspection-body">
                    <form id="mobile-inspection-form">
                        <div class="device-info-card">
                            <div class="device-info-row">
                                <span class="device-info-label">DeviceID:</span>
                                <span class="device-info-value">${Utils.escapeHTML(a.id)}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">\u0627\u0644\u062C\u0647\u0627\u0632:</span>
                                <span class="device-info-value">${Utils.escapeHTML(a.number||a.id)}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">\u0627\u0644\u0645\u0648\u0642\u0639:</span>
                                <span class="device-info-value">${Utils.escapeHTML(a.location||"-")}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">\u0627\u0644\u0646\u0648\u0639:</span>
                                <span class="device-info-value">${Utils.escapeHTML(a.type||a.equipmentType||"-")}</span>
                            </div>
                        </div>

                        <input type="hidden" id="mobile-inspection-asset" value="${n}">

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-calendar ml-2"></i>
                                \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635 *
                            </label>
                            <input type="date" id="mobile-inspection-date" required class="mobile-inspection-input" value="${o}">
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-user ml-2"></i>
                                \u0627\u0633\u0645 \u0627\u0644\u0645\u0641\u062A\u0634 *
                            </label>
                            <input type="text" id="mobile-inspection-inspector" required class="mobile-inspection-input" 
                                   value="${Utils.escapeHTML(e?.inspector||"")}" 
                                   placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0641\u062A\u0634">
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-check-circle ml-2"></i>
                                \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632 *
                            </label>
                            <select id="mobile-inspection-status" class="mobile-inspection-select" required>
                                ${this.statusOptions.map(p=>`<option value="${p.value}" ${e?.status===p.value?"selected":""}>${p.label}</option>`).join("")}
                            </select>
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-gauge ml-2"></i>
                                \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0639\u062F\u0627\u062F / \u0627\u0644\u0636\u063A\u0637
                            </label>
                            <input type="text" id="mobile-inspection-gauge" class="mobile-inspection-input" 
                                   value="${Utils.escapeHTML(e?.gaugeReading||"")}" 
                                   placeholder="\u0645\u062B\u0627\u0644: 150 PSI">
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-lock ml-2"></i>
                                \u0635\u0645\u0627\u0645 \u0648\u062A\u064A\u0644\u0629 \u0627\u0644\u0623\u0645\u0627\u0646
                            </label>
                            <select id="mobile-inspection-seal" class="mobile-inspection-select">
                                <option value="unknown">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</option>
                                <option value="true" ${e?.sealIntact===!0?"selected":""}>\u0633\u0644\u064A\u0645</option>
                                <option value="false" ${e?.sealIntact===!1?"selected":""}>\u0645\u0643\u0633\u0648\u0631 / \u0645\u0641\u0642\u0648\u062F</option>
                            </select>
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-comment ml-2"></i>
                                \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </label>
                            <textarea id="mobile-inspection-remarks" class="mobile-inspection-textarea" 
                                      placeholder="\u0623\u064A\u0629 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0639\u0646 \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632">${Utils.escapeHTML(e?.remarks||"")}</textarea>
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-tools ml-2"></i>
                                \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629
                            </label>
                            <textarea id="mobile-inspection-actions" class="mobile-inspection-textarea" 
                                      placeholder="\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0623\u0648 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A">${Utils.escapeHTML(e?.actions||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="mobile-inspection-actions">
                    <button type="button" class="mobile-inspection-btn mobile-inspection-btn-secondary" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times ml-2"></i>
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="submit" form="mobile-inspection-form" class="mobile-inspection-btn mobile-inspection-btn-primary">
                        <i class="fas fa-save ml-2"></i>
                        ${t?"\u062D\u0641\u0638":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635"}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(l);const r=l.querySelector("#mobile-inspection-form");if(!r){Utils.safeError("\u274C \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648\u0630\u062C #mobile-inspection-form");return}let d=!1;r.addEventListener("submit",async p=>{if(p.preventDefault(),p.stopPropagation(),d){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0628\u0627\u0644\u0641\u0639\u0644");return}d=!0;const c=l.querySelector('button[type="submit"]'),f=c?c.innerHTML:"";try{c&&(c.disabled=!0,c.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const u=new Date().toISOString(),h=y=>{const b=document.getElementById(y);return b?b.value.trim():""},g=document.getElementById("mobile-inspection-asset"),A=(g?g.value:"")||n;if(!A){Notification.error("\u062E\u0637\u0623: DeviceID \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),d=!1,c&&(c.disabled=!1,c.innerHTML=f);return}if(!t){const y=this.checkMonthlyInspectionAllowed(A);if(!y.allowed){Notification.warning(y.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A"),d=!1,c&&(c.disabled=!1,c.innerHTML=f);return}}const m={id:i,assetId:A,checkDate:(()=>{const y=document.getElementById("mobile-inspection-date");return y&&this.toISODate(y.value)||u})(),inspector:h("mobile-inspection-inspector"),status:h("mobile-inspection-status"),gaugeReading:h("mobile-inspection-gauge"),sealIntact:(()=>{const y=document.getElementById("mobile-inspection-seal");if(!y)return null;const b=y.value;return b==="true"?!0:b==="false"?!1:null})(),remarks:h("mobile-inspection-remarks"),actions:h("mobile-inspection-actions"),createdAt:e?.createdAt||u,updatedAt:u};AppState.appData.fireEquipmentInspections||(AppState.appData.fireEquipmentInspections=[]);const w=AppState.appData.fireEquipmentInspections,S=w.findIndex(y=>y.id===i);S>-1?w[S]={...w[S],...m}:w.push(m);const E=this.getAssets().find(y=>y.id===A);E&&(E.lastServiceDate=m.checkDate,E.status=m.status,E.updatedAt=u),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),l&&l.parentNode&&l.remove(),this.refreshCurrentTab().catch(y=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",y)}),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0635":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635 \u0628\u0646\u062C\u0627\u062D"),(async()=>{try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const y=await GoogleIntegration.sendRequest({action:t?"updateFireEquipmentInspection":"addFireEquipmentInspection",data:m});if(!y.success)throw new Error(y.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635");Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A Backend:",m.id),E&&(await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:E}),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632:",E.id)),this.refreshCurrentTab().catch(b=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",b)})}}catch(y){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0641\u062D\u0635:",y)}})(),d=!1,c&&(c.disabled=!1,c.innerHTML=f)}catch(u){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",u),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639: "+(u.message||u)),d=!1,c&&(c.disabled=!1,c.innerHTML=f)}})},viewAsset(e){const s=this.getAssets().find(l=>l.id===e);if(!s){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632.");return}const t=this.getInspectionsByAsset(e),i=typeof QRCode<"u"?QRCode.generate(s.qrCodeData||this.generateQrData(s.id),200):null,n=JSON.stringify(s).replace(/"/g,"&quot;"),a=document.createElement("div");a.className="modal-overlay fire-modal",a.innerHTML=`
            <div class="modal-content" style="max-width: 820px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062C\u0647\u0627\u0632 ${Utils.escapeHTML(s.number||"")}</h2>
                    <button class="modal-close" onclick="FireEquipment.closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="content-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-info-circle ml-2"></i>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632</h3>
                            </div>
                            <div class="card-body space-y-2 text-sm">
                                <p><strong>\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(s.location||"-")}</p>
                                <p><strong>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A:</strong> ${Utils.escapeHTML(s.subLocationName||s.subLocation||"-")}</p>
                                <p><strong>\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(s.type||"-")}</p>
                                <p><strong>\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645:</strong> ${Utils.escapeHTML(s.capacity||s.capacityKg||"-")}</p>
                                <p><strong>\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(s.siteNumber||s.number||"-")}</p>
                                <p><strong>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629:</strong> ${Utils.escapeHTML(s.manufacturer||"-")}</p>
                                <p><strong>\u0627\u0644\u0645\u0635\u0646\u0639:</strong> ${Utils.escapeHTML(s.factoryName||s.factory||"-")}</p>
                                <p><strong>\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639:</strong> ${s.manufacturingYear||"-"}</p>
                                <p><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C:</strong> ${s.productionDate?Utils.formatDate(s.productionDate):"-"}</p>
                                <p><strong>\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(s.serialNumber||"-")}</p>
                                <p><strong>\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${this.getStatusBadge(s.status)}</p>
                                <p><strong>\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A:</strong> ${Utils.escapeHTML(s.installationMethod||"-")}</p>
                                <p><strong>\u0627\u0644\u0645\u0648\u062F\u064A\u0644:</strong> ${Utils.escapeHTML(s.model||"-")}</p>
                                <p><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0631\u0643\u064A\u0628:</strong> ${s.installationDate?Utils.formatDate(s.installationDate):"-"}</p>
                                <p><strong>\u0622\u062E\u0631 \u0635\u064A\u0627\u0646\u0629:</strong> ${s.lastServiceDate?Utils.formatDate(s.lastServiceDate):"-"}</p>
                                <p><strong>\u0627\u0644\u0645\u0633\u0624\u0648\u0644:</strong> ${Utils.escapeHTML(s.responsible||"-")}</p>
                                ${s.notes?`<p><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong> ${Utils.escapeHTML(s.notes)}</p>`:""}
                            </div>
                        </div>
                        <div class="content-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-qrcode ml-2"></i>QR Code \u0644\u0644\u062C\u0647\u0627\u0632</h3>
                            </div>
                            <div class="card-body text-center space-y-3">
                                ${i?`<img src="${i}" alt="QR Code" class="mx-auto h-40 w-40 border border-gray-200 p-2 bg-white">`:'<p class="text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F QR Code</p>'}
                                <div class="flex flex-wrap justify-center gap-2">
                                    <button class="btn-secondary" onclick="FireEquipment.printQr('${s.id}')">
                                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629 QR Code
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 mt-2">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A: \u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 "\u0645\u0633\u062D QR Code \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A" \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629
                                </p>
                                <p class="text-xs text-gray-400 break-words">${Utils.escapeHTML(s.qrCodeData||this.generateQrData(s.id))}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header flex items-center justify-between">
                            <h3 class="card-title"><i class="fas fa-history ml-2"></i>\u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</h3>
                            <span class="text-xs text-gray-400">${t.length} \u0641\u062D\u0635</span>
                        </div>
                        <div class="card-body">
                            ${t.length?`
                                <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                                    <table class="data-table text-sm" style="width: 100%; min-width: 100%; table-layout: auto;">
                                        <thead>
                                            <tr>
                                                <th style="min-width: 120px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                                <th style="min-width: 120px;">\u0627\u0644\u0645\u0641\u062A\u0634</th>
                                                <th style="min-width: 100px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                                <th style="min-width: 200px; word-wrap: break-word;">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${t.map(l=>`
                                                <tr>
                                                    <td style="word-wrap: break-word; white-space: normal;">${Utils.formatDate(l.checkDate)}</td>
                                                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(l.inspector||"-")}</td>
                                                    <td style="word-wrap: break-word;">${this.getStatusBadge(l.status)}</td>
                                                    <td style="word-wrap: break-word; white-space: normal; max-width: 250px;">${Utils.escapeHTML(l.remarks||"-")}</td>
                                                </tr>
                                            `).join("")}
                                        </tbody>
                                    </table>
                                </div>
                            `:'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632.</p></div>'}
                        </div>
                    </div>
                </div>
                <div class="modal-footer flex justify-center gap-2 form-actions-centered">
                    <button class="btn-secondary" onclick="FireEquipment.closeModal(this)">\u0625\u063A\u0644\u0627\u0642</button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("fire-equipment"):""}
                    <button class="btn-primary" onclick="FireEquipment.showAssetForm(${n}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062C\u0647\u0627\u0632
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(a,{moduleKey:"fire-equipment",record:s,recordId:s.id||s.number||s.isoCode||""}),a.addEventListener("click",l=>{l.target===a&&a.remove()});const o=a.querySelector(".modal-content");o&&o.addEventListener("click",l=>{l.stopPropagation()})},getInspectionsByAsset(e){return this.getInspections().filter(s=>s.assetId===e).sort((s,t)=>new Date(t.checkDate||t.createdAt||0)-new Date(s.checkDate||s.createdAt||0))},getLatestInspection(e){const s=this.getInspectionsByAsset(e);return s.length?s[0]:null},getAssetStats(){const e=this.getAssets(),s=e.length,t=e.filter(a=>a.status==="\u0635\u0627\u0644\u062D").length,i=e.filter(a=>a.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,n=e.filter(a=>a.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length;return{total:s,active:t,needsMaintenance:i,outOfService:n}},generateQrData(e){return String(e||"").trim()},async persistAll(){if(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled)try{Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642...");const e=AppState.appData.fireEquipmentAssets||[];if(e.length>0){Utils.safeLog(`\u{1F4E6} \u062D\u0641\u0638 ${e.length} \u062C\u0647\u0627\u0632...`);const t=e.map(async o=>{try{return await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:o}),{success:!0,id:o.id}}catch(l){return Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632 ${o.id}:`,l),{success:!1,id:o.id,error:l}}}),i=await Promise.allSettled(t),n=i.filter(o=>o.status==="fulfilled"&&o.value.success).length,a=i.filter(o=>o.status==="rejected"||o.status==="fulfilled"&&!o.value.success).length;Utils.safeLog(`\u2705 \u062A\u0645 \u062D\u0641\u0638 ${n} \u062C\u0647\u0627\u0632\u060C \u0641\u0634\u0644 ${a}`)}const s=AppState.appData.fireEquipmentInspections||[];s.length>0&&(Utils.safeLog(`\u{1F4CB} \u062D\u0641\u0638 ${s.length} \u0641\u062D\u0635...`),await GoogleIntegration.sendRequest({action:"saveToSheet",data:{sheetName:"FireEquipmentInspections",data:s}})),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){if(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0641\u064A Google Sheets:",e),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave)try{const s=AppState.appData.fireEquipmentAssets.map(i=>({...i})),t=AppState.appData.fireEquipmentInspections.map(i=>({...i}));await Promise.allSettled([GoogleIntegration.autoSave("FireEquipmentAssets",s),GoogleIntegration.autoSave("FireEquipmentInspections",t)])}catch(s){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062D\u062A\u0649 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 autoSave:",s)}}else if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave)try{const e=AppState.appData.fireEquipmentAssets.map(t=>({...t})),s=AppState.appData.fireEquipmentInspections.map(t=>({...t}));await Promise.allSettled([GoogleIntegration.autoSave("FireEquipmentAssets",e),GoogleIntegration.autoSave("FireEquipmentInspections",s)])}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0641\u064A Google Sheets",e)}},getPublicInspectionUrl(e="",s=""){try{const t=window.location,i=t.pathname.split("/");i.pop();const n=i.join("/");let o=`${t.origin||t.protocol+"//"+t.host}${n}/public-fire-inspection.html`.replace(/([^:]\/)\/+/g,"$1"),l=[];return e&&l.push(`id=${encodeURIComponent(e)}`),s&&l.push(`inspector=${encodeURIComponent(s)}`),l.length>0&&(o+=`?${l.join("&")}`),o}catch{return`public-fire-inspection.html${e?`?id=${encodeURIComponent(e)}`:""}`}},getSafetyMembersList(){const e=d=>{if(!d)return!1;if(d.isActive===!1||d.active===!1||d.isActive==="false"||d.active==="false")return!0;const p=String(d.status||d.employeeStatus||d.workStatus||d.employmentStatus||"").trim().toLowerCase();return p?p.includes("\u0645\u0633\u062A\u0642\u064A\u0644")||p.includes("\u0627\u0633\u062A\u0642\u0627\u0644")||p.includes("\u0645\u0646\u062A\u0647\u064A")||p.includes("\u0641\u0635\u0644")||p.includes("\u062A\u0631\u0643")||p.includes("resign")||p.includes("terminated")||p.includes("inactive")||p.includes("left"):!1},s=d=>!d||d.length<3||/[a-zA-Z]/.test(d)?!1:/[\u0600-\u06FF]/.test(d),t=d=>String(d||"").trim().toLowerCase().replace(/^(م\/|أ\/|د\/|مهندس\/|أستاذ\/|دكتور\/|mr\.|eng\.)\s*/i,"").replace(/[أإآ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").replace(/\s+/g," "),i=new Set,n=[],a=d=>{const p=String(d||"").trim();if(!s(p))return;const c=p.toLowerCase();if(c.includes("admin")||c.includes("support")||c.includes("system")||c.includes("tool")||c.includes("\u0645\u062C\u0647\u0648\u0644")||c.includes("\u0639\u0627\u0645\u0629"))return;const f=t(p);!f||i.has(f)||(i.add(f),n.push({name:p}))};(AppState.appData?.employees||[]).forEach(d=>{if(e(d))return;const p=d.name||d.employeeName||"",c=String(d.department||"").toLowerCase(),f=String(d.job||d.jobTitle||d.position||"").toLowerCase();if(f.includes("\u063A\u0630\u0627\u0621")||f.includes("food")||c.includes("\u062C\u0648\u062F\u0629")||c.includes("\u062A\u0635\u0646\u064A\u0639"))return;const u=c.includes("\u0633\u0644\u0627\u0645\u0629")||c.includes("hse")||c.includes("\u0635\u062D\u0629 \u0645\u0647\u0646\u064A\u0629"),h=f.includes("\u0633\u0644\u0627\u0645\u0629 \u0648\u0635\u062D\u0629")||f.includes("\u0633\u0644\u0627\u0645\u0647 \u0648\u0635\u062D\u0629")||f.includes("\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629")||f.includes("\u0633\u0644\u0627\u0645\u0629 \u0645\u0647\u0646\u064A\u0629")||f.includes("\u0623\u062E\u0635\u0627\u0626\u064A \u0633\u0644\u0627\u0645\u0629")||f.includes("\u0627\u062E\u0635\u0627\u0626\u0649 \u0633\u0644\u0627\u0645\u0647")||f.includes("\u0641\u0646\u064A \u0633\u0644\u0627\u0645\u0629")||f.includes("\u0641\u0646\u0649 \u0633\u0644\u0627\u0645\u0629")||f.includes("\u0645\u0634\u0631\u0641 \u0633\u0644\u0627\u0645\u0629")||f.includes("\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")||f.includes("\u0645\u0641\u062A\u0634 \u0633\u0644\u0627\u0645\u0629")||f.includes("\u0645\u0633\u0624\u0648\u0644 \u0633\u0644\u0627\u0645\u0629")||f.includes("\u0625\u0637\u0641\u0627\u0621")||f.includes("\u062D\u0631\u064A\u0642")||f.includes("hse officer")||f.includes("hse specialist")||f.includes("hse manager");p&&u&&h&&a(p)});const l=AppState.companySettings||{},r=l.safetyTeam||l.safetyTeamMembers||l.hseTeam;return Array.isArray(r)?r.forEach(d=>a(typeof d=="string"?d:d.name)):typeof r=="string"&&r.split(/[\n,]/).forEach(d=>a(d)),n.sort((d,p)=>d.name.localeCompare(p.name,"ar")),n},showPublicLinkModal(){const e=this.getPublicInspectionUrl(),s=this.getAssets()||[],t=this.getSafetyMembersList(),i=document.createElement("div");i.className="modal-overlay fire-modal",i.innerHTML=`
            <div class="modal-content" style="max-width: 620px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(220, 38, 38, 0.2); border: 1px solid rgba(220, 38, 38, 0.4); display: flex; align-items: center; justify-content: center; color: #f87171; font-size: 1.25rem;">
                            <i class="fas fa-fire-extinguisher"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 2px 0;">\u0631\u0627\u0628\u0637 \u0648\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</h2>
                            <p style="font-size: 0.8rem; color: #94a3b8; margin: 0;">\u0628\u0648\u0627\u0628\u0629 \u0641\u062D\u0635 \u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644 \u0644\u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629</p>
                        </div>
                    </div>
                    <button class="modal-close" style="color: #94a3b8; font-size: 1.25rem;" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="padding: 24px; background: #f8fafc;">
                    <!-- \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u062E\u0635\u064A\u0635: \u0627\u0644\u062C\u0647\u0627\u0632 + \u0627\u0644\u0645\u0641\u062A\u0634 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-fire-extinguisher ml-1 text-red-500"></i> \u062C\u0647\u0627\u0632 \u0645\u062E\u0635\u0635 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):
                            </label>
                            <select id="qr-fire-asset-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="">\u2014 \u0628\u0648\u0627\u0628\u0629 \u0639\u0627\u0645\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u2014</option>
                                ${s.map(f=>`<option value="${Utils.escapeHTML(f.id)}">${Utils.escapeHTML(f.id)} \u2014 ${Utils.escapeHTML(f.number||f.id)} (${Utils.escapeHTML(f.location||"-")})</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-user-shield ml-1 text-emerald-600"></i> \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u062E\u0635\u0635:
                            </label>
                            <select id="qr-fire-inspector-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="">\u2014 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0641\u062A\u0634 \u0628\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u2014</option>
                                ${t.map(f=>`<option value="${Utils.escapeHTML(f.name)}">${Utils.escapeHTML(f.name)}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <!-- \u0639\u0631\u0636 \u0627\u0644\u0640 QR Code -->
                    <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; text-align: center; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div id="fire-qr-container" style="display: inline-block; padding: 12px; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 12px;">
                            <img id="fire-qr-img" src="" alt="QR Code" style="width: 180px; height: 180px; display: block;">
                        </div>
                        <div style="font-size: 0.85rem; color: #1e293b; font-weight: 700;" id="fire-qr-target-text">
                            \u0627\u0645\u0633\u062D \u0627\u0644\u0631\u0645\u0632 \u0628\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u0647\u0627\u062A\u0641 \u0644\u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0641\u062D\u0635 \u0627\u0644\u0637\u0641\u0627\u064A\u0629 \u0641\u0648\u0631\u0627\u064B
                        </div>
                    </div>

                    <!-- \u062D\u0642\u0644 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 -->
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                            <i class="fas fa-link ml-1 text-indigo-500"></i> \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0628\u0627\u0634\u0631:
                        </label>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" id="fire-public-link-input" readonly value="${e}" style="flex: 1; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; background: #ffffff; font-size: 0.85rem; direction: ltr; text-align: left;">
                            <button type="button" id="fire-copy-link-btn" class="btn-secondary" style="padding: 10px 16px; border-radius: 8px; font-weight: 700; white-space: nowrap;">
                                <i class="fas fa-copy ml-1"></i> \u0646\u0633\u062E
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <button type="button" id="fire-print-poster-btn" class="btn-primary" style="padding: 9px 20px; border-radius: 8px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; background: #b91c1c;">
                        <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0628\u0648\u0633\u062A\u0631 \u0641\u062D\u0635 \u0627\u0644\u0625\u0637\u0641\u0627\u0621 (A4)
                    </button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(i);const n=i.querySelector("#qr-fire-asset-select"),a=i.querySelector("#qr-fire-inspector-select"),o=i.querySelector("#fire-public-link-input"),l=i.querySelector("#fire-qr-img"),r=i.querySelector("#fire-qr-target-text"),d=i.querySelector("#fire-copy-link-btn"),p=i.querySelector("#fire-print-poster-btn"),c=()=>{const f=n.value,u=a.value,h=this.getPublicInspectionUrl(f,u);o.value=h;let g="";if(typeof qrcode=="function")try{const A=qrcode(0,"M");A.addData(h),A.make(),g=A.createDataURL(6,4)}catch{}if(!g&&window.QRCode&&typeof window.QRCode.generate=="function")try{g=window.QRCode.generate(h,240)}catch{}g&&g.startsWith("data:")?l.src=g:l.src=`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(h)}`,f?r.textContent=`\u0641\u062D\u0635 \u0645\u062E\u0635\u0635 \u0644\u0644\u062C\u0647\u0627\u0632: ${f}`:r.textContent="\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A \u0627\u0644\u0634\u0627\u0645\u0644 \u0644\u062C\u0645\u064A\u0639 \u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0625\u0637\u0641\u0627\u0621"};n?.addEventListener("change",c),a?.addEventListener("change",c),c(),d?.addEventListener("click",()=>{navigator.clipboard.writeText(o.value).then(()=>{d.innerHTML='<i class="fas fa-check ml-1 text-green-600"></i> \u062A\u0645 \u0627\u0644\u0646\u0633\u062E!',setTimeout(()=>{d.innerHTML='<i class="fas fa-copy ml-1"></i> \u0646\u0633\u062E'},2500)})}),p?.addEventListener("click",()=>{const f=o.value,u=window.open("","_blank");if(!u){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}u.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <title>\u0628\u0648\u0633\u062A\u0631 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621 - HSE</title>
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                    <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"><\/script>
                    <style>
                        @page { size: A4 portrait; margin: 10mm; }
                        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
                        body { font-family: 'Cairo', system-ui, sans-serif; text-align: center; color: #0f172a; margin: 0; padding: 10px; background: #ffffff; }
                        .no-print-bar { margin-bottom: 15px; text-align: left; }
                        .print-now-btn { background: #dc2626; color: #ffffff; border: none; padding: 10px 22px; border-radius: 8px; font-weight: 800; font-family: inherit; font-size: 15px; cursor: pointer; }
                        @media print { .no-print-bar { display: none !important; } }
                        .poster-card { border: 3.5px solid #dc2626; border-radius: 16px; padding: 24px 20px; background: #ffffff; }
                        .doc-badge-row { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px; font-size: 12px; font-weight: 800; color: #475569; }
                        .header-banner { background: #991b1b !important; color: #ffffff !important; padding: 18px 14px; border-radius: 10px; margin-bottom: 18px; }
                        .title { font-size: 25px; font-weight: 900; margin: 0 0 4px 0; color: #ffffff !important; }
                        .sub { font-size: 14px; color: #fecaca !important; margin: 0; font-weight: 700; }
                        .qr-box { background: #ffffff; border: 3px solid #dc2626; border-radius: 16px; padding: 14px; display: inline-block; margin-bottom: 18px; }
                        .qr-img { width: 250px; height: 250px; display: block; margin: 0 auto; object-fit: contain; }
                        .instruction-card { background: #fef2f2 !important; border-right: 5px solid #dc2626; border-radius: 8px; padding: 14px 18px; margin-bottom: 18px; text-align: right; }
                        .instruction-title { font-size: 17px; font-weight: 900; color: #991b1b; margin-bottom: 6px; }
                        .steps-list { font-size: 13.5px; color: #334155; line-height: 1.8; margin: 0; padding-right: 20px; font-weight: 600; }
                        .footer-meta { font-size: 11.5px; color: #64748b; border-top: 1.5px solid #e2e8f0; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 700; }
                    </style>
                </head>
                <body>
                    <div class="no-print-bar">
                        <button class="print-now-btn" onclick="window.print()"><i class="fas fa-print"></i> \u0623\u0645\u0631 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0628\u0648\u0633\u062A\u0631 \u0627\u0644\u0622\u0646 (A4)</button>
                    </div>
                    <div class="poster-card">
                        <div class="doc-badge-row">
                            <div><i class="fas fa-shield-halved"></i> \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0645\u0643\u0627\u0641\u062D\u0629 \u0627\u0644\u062D\u0631\u064A\u0642 (HSE)</div>
                            <div>\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C: DOC-HSE-FEI-01 | \u0627\u0644\u0625\u0635\u062F\u0627\u0631 02</div>
                        </div>
                        <div class="header-banner">
                            <h1 class="title">\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621</h1>
                            <p class="sub">\u0645\u0646\u0638\u0648\u0645\u0629 \u0641\u062D\u0635 \u0648\u0645\u0631\u0627\u0642\u0628\u0629 \u0635\u0644\u0627\u062D\u064A\u0629 \u0637\u0641\u0627\u064A\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u2014 HSE 360 Platform</p>
                        </div>
                        <div class="qr-box">
                            <img id="printQrImg" src="${l.src}" alt="QR Code" class="qr-img">
                        </div>
                        <div class="instruction-card">
                            <div class="instruction-title"><i class="fas fa-mobile-screen-button"></i> \u062E\u0637\u0648\u0627\u062A \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u062F\u0648\u0631\u064A \u0627\u0644\u0633\u0631\u064A\u0639 \u0639\u0628\u0631 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0645\u062D\u0645\u0648\u0644:</div>
                            <ol class="steps-list">
                                <li>\u0627\u0641\u062A\u062D \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0639\u0644\u0649 \u0647\u0627\u062A\u0641\u0643 \u0627\u0644\u0645\u062D\u0645\u0648\u0644 \u0648\u0648\u062C\u0651\u0647 \u0627\u0644\u0639\u062F\u0633\u0629 \u0646\u062D\u0648 \u0631\u0645\u0632 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0633\u0631\u064A\u0639\u0629 (QR Code) \u0623\u0639\u0644\u0627\u0647.</li>
                                <li>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0646\u0628\u062B\u0642 \u0644\u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A \u0645\u0628\u0627\u0634\u0631\u0629 \u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644.</li>
                                <li>\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0645\u0633\u062D \u0643\u0648\u062F \u0627\u0644\u0637\u0641\u0627\u064A\u0629\u060C \u062B\u0645 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0636\u063A\u0637 \u0648\u0635\u0645\u0627\u0645 \u0648\u062A\u064A\u0644\u0629 \u0627\u0644\u0623\u0645\u0627\u0646 \u0648\u0627\u0636\u063A\u0637 \u062D\u0641\u0638.</li>
                            </ol>
                        </div>
                        <div class="footer-meta">
                            <div>\u0645\u0639\u0627\u064B \u0646\u062D\u0648 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644 \u0622\u0645\u0646\u0629 \u0648\u0645\u0639\u062F\u0627\u062A \u0637\u0648\u0627\u0631\u0626 \u062C\u0627\u0647\u0632\u0629 \u062F\u0627\u0626\u0645\u0627\u064B</div>
                            <div>HSE Fire Protection \xA9 2026</div>
                        </div>
                    </div>
                    <script>
                        window.addEventListener('load', function() {
                            setTimeout(function() { window.print(); }, 400);
                        });
                    <\/script>
                </body>
                </html>
            `),u.document.close()})},showBatchPrintQrModal(){const e=this.getAssets()||[];if(!e||e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062C\u0647\u0632\u0629 \u0625\u0637\u0641\u0627\u0621 \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629.");return}const s=[...new Set(e.map(c=>c.location).filter(Boolean))].sort(),t=[...new Set(e.map(c=>c.type||c.equipmentType).filter(Boolean))].sort(),i=document.createElement("div");i.className="modal-overlay fire-modal",i.innerHTML=`
            <div class="modal-content" style="max-width: 640px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #0b2a55 0%, #1e40af 100%); color: #ffffff; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #fde68a; font-size: 1.25rem;">
                            <i class="fas fa-print"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 2px 0;">\u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A QR \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621</h2>
                            <p style="font-size: 0.8rem; color: #bfdbfe; margin: 0;">\u0637\u0628\u0627\u0639\u0629 \u0645\u0644\u0635\u0642\u0627\u062A QR \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u062C\u0647\u0627\u0632 \u062A\u0644\u0648 \u0627\u0644\u0622\u062E\u0631</p>
                        </div>
                    </div>
                    <button class="modal-close" style="color: #bfdbfe; font-size: 1.25rem;" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="padding: 24px; background: #f8fafc;">
                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px; margin-bottom: 18px; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-info-circle text-blue-600" style="font-size: 20px;"></i>
                        <div style="font-size: 0.85rem; color: #1e3a8a; font-weight: 700;">
                            \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: <span style="font-size: 1rem; color: #dc2626;" id="batch-total-count">${e.length}</span> \u062C\u0647\u0627\u0632 \u0625\u0637\u0641\u0627\u0621
                        </div>
                    </div>

                    <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u062E\u0635\u064A\u0635 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-map-marker-alt text-blue-600 ml-1"></i> \u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639:
                            </label>
                            <select id="batch-location-filter" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="all">\u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u2014</option>
                                ${s.map(c=>`<option value="${Utils.escapeHTML(c)}">${Utils.escapeHTML(c)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-fire-extinguisher text-red-600 ml-1"></i> \u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632:
                            </label>
                            <select id="batch-type-filter" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="all">\u2014 \u062C\u0645\u064A\u0639 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0637\u0641\u0627\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u0639\u062F\u0627\u062A \u2014</option>
                                ${t.map(c=>`<option value="${Utils.escapeHTML(c)}">${Utils.escapeHTML(c)}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-border-all text-indigo-600 ml-1"></i> \u0645\u0642\u0627\u0633 \u0648\u062A\u062E\u0637\u064A\u0637 \u0627\u0644\u0645\u0644\u0635\u0642\u0627\u062A:
                            </label>
                            <select id="batch-layout-select" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="2x4">\u0645\u0644\u0635\u0642\u0627\u062A \u0642\u064A\u0627\u0633\u064A\u0629 (\u0635\u0641\u064A\u0646 \xD7 4 = 8 \u0643\u0631\u0648\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                                <option value="3x4">\u0645\u0644\u0635\u0642\u0627\u062A \u0645\u062F\u0645\u062C\u0629 (3 \u0623\u0639\u0645\u062F\u0629 \xD7 4 = 12 \u0643\u0627\u0631\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                                <option value="2x3">\u0643\u0631\u0648\u062A \u0643\u0628\u064A\u0631\u0629 \u0648\u0627\u0636\u062D\u0629 (\u0635\u0641\u064A\u0646 \xD7 3 = 6 \u0643\u0631\u0648\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-calculator text-emerald-600 ml-1"></i> \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629:
                            </label>
                            <div style="padding: 10px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; font-weight: 800; font-size: 0.95rem; color: #047857;" id="batch-selected-preview">
                                ${e.length} \u062C\u0647\u0627\u0632 \u062C\u0627\u0647\u0632 \u0644\u0644\u0637\u0628\u0627\u0639\u0629
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <button type="button" id="start-batch-print-btn" class="btn-primary" style="padding: 10px 24px; border-radius: 8px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; background: #1e40af;">
                        <i class="fas fa-print"></i> \u0628\u062F\u0621 \u0637\u0628\u0627\u0639\u0629 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0643\u0631\u0648\u062A \u0627\u0644\u0622\u0646 (A4)
                    </button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                </div>
            </div>
        `,document.body.appendChild(i);const n=i.querySelector("#batch-location-filter"),a=i.querySelector("#batch-type-filter"),o=i.querySelector("#batch-layout-select"),l=i.querySelector("#batch-selected-preview"),r=i.querySelector("#start-batch-print-btn"),d=()=>{const c=n.value,f=a.value;return e.filter(u=>!(c!=="all"&&u.location!==c||f!=="all"&&(u.type||u.equipmentType)!==f))},p=()=>{const c=d();l.textContent=`${c.length} \u062C\u0647\u0627\u0632 \u062C\u0627\u0647\u0632 \u0644\u0644\u0637\u0628\u0627\u0639\u0629`,r.disabled=c.length===0};n.addEventListener("change",p),a.addEventListener("change",p),r.addEventListener("click",()=>{const c=d();if(c.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062C\u0647\u0632\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u062A\u0635\u0641\u064A\u0629.");return}i.remove(),this.batchPrintQrCards(c,o.value)})},batchPrintQrCards(e,s="2x4"){if(!e||e.length===0)return;let t=2,i="120px",n=100,a="13px",o="10.5px";s==="3x4"?(t=3,i="110px",n=85,a="11.5px",o="9.5px"):s==="2x3"&&(t=2,i="150px",n=125,a="14px",o="11.5px");const l=window.open("","_blank");if(!l){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A QR");return}const r=e.map(d=>{const p=String(d.id||"").trim(),c=this.getPublicInspectionUrl(p);let f="";if(typeof qrcode=="function")try{const u=qrcode(0,"M");u.addData(c),u.make(),f=u.createDataURL(4,2)}catch{}if(!f&&window.QRCode&&typeof window.QRCode.generate=="function")try{f=window.QRCode.generate(c,140)}catch{}return f||(f=`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(c)}`),`
                <div class="qr-card">
                    <div class="qr-card-header">
                        <span class="qr-card-tag"><i class="fas fa-fire-extinguisher"></i> HSE FIRE</span>
                        <span class="qr-card-num">${Utils.escapeHTML(d.number||d.id)}</span>
                    </div>
                    <div class="qr-card-body">
                        <div class="qr-card-info">
                            <div class="qr-card-id">${Utils.escapeHTML(p)}</div>
                            <div class="qr-card-type">${Utils.escapeHTML(d.type||"\u0637\u0641\u0627\u064A\u0629 \u062D\u0631\u064A\u0642")}${d.capacity?` - ${Utils.escapeHTML(d.capacity)}`:""}</div>
                            <div class="qr-card-loc"><i class="fas fa-map-pin"></i> ${Utils.escapeHTML(d.location||"-")}${d.subLocation?` (${Utils.escapeHTML(d.subLocation)})`:""}</div>
                            <div class="qr-card-inst">\u0627\u0645\u0633\u062D \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A</div>
                        </div>
                        <div class="qr-card-img-wrap">
                            <img src="${f}" alt="QR ${p}" class="qr-code-img">
                        </div>
                    </div>
                </div>
            `}).join("");l.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0645\u0644\u0635\u0642\u0627\u062A \u0648\u0643\u0631\u0648\u062A QR \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621 (${e.length} \u062C\u0647\u0627\u0632)</title>
                <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    @page { size: A4 portrait; margin: 6mm; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
                    body { font-family: 'Cairo', system-ui, sans-serif; color: #0f172a; margin: 0; padding: 6px; background: #ffffff; }
                    .no-print-bar { margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0; }
                    .print-btn { background: #1e40af; color: #fff; border: none; padding: 8px 20px; border-radius: 6px; font-weight: 800; font-family: inherit; font-size: 14px; cursor: pointer; }
                    @media print { .no-print-bar { display: none !important; } }
                    
                    .cards-grid {
                        display: grid;
                        grid-template-columns: repeat(${t}, 1fr);
                        gap: 7mm;
                    }
                    
                    .qr-card {
                        border: 2px dashed #94a3b8;
                        border-radius: 10px;
                        padding: 8px 10px;
                        background: #ffffff;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: ${i};
                        page-break-inside: avoid;
                        break-inside: avoid;
                        position: relative;
                    }
                    
                    .qr-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1.5px solid #e2e8f0;
                        padding-bottom: 4px;
                        margin-bottom: 6px;
                    }
                    
                    .qr-card-tag {
                        font-size: 9px;
                        font-weight: 800;
                        color: #dc2626;
                        display: inline-flex;
                        align-items: center;
                        gap: 3px;
                    }
                    
                    .qr-card-num {
                        font-size: 9.5px;
                        font-weight: 800;
                        color: #475569;
                    }
                    
                    .qr-card-body {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                    }
                    
                    .qr-card-info {
                        flex: 1;
                        text-align: right;
                    }
                    
                    .qr-card-id {
                        font-size: ${a};
                        font-weight: 900;
                        color: #0b2a55;
                        letter-spacing: 0.5px;
                        margin-bottom: 2px;
                    }
                    
                    .qr-card-type {
                        font-size: ${o};
                        font-weight: 800;
                        color: #dc2626;
                        margin-bottom: 2px;
                    }
                    
                    .qr-card-loc {
                        font-size: ${o};
                        font-weight: 700;
                        color: #334155;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 145px;
                        margin-bottom: 4px;
                    }
                    
                    .qr-card-inst {
                        font-size: 8.5px;
                        font-weight: 700;
                        color: #64748b;
                        background: #f1f5f9;
                        padding: 2px 6px;
                        border-radius: 4px;
                        display: inline-block;
                    }
                    
                    .qr-card-img-wrap {
                        flex: 0 0 auto;
                    }
                    
                    .qr-code-img {
                        width: ${n}px;
                        height: ${n}px;
                        display: block;
                        border: 1px solid #cbd5e1;
                        border-radius: 6px;
                        padding: 2px;
                        background: #fff;
                    }
                </style>
            </head>
            <body>
                <div class="no-print-bar">
                    <div style="font-weight: 800; color: #1e3a8a;">
                        \u062C\u0627\u0647\u0632 \u0644\u0637\u0628\u0627\u0639\u0629 \u0645\u0644\u0635\u0642\u0627\u062A ${e.length} \u062C\u0647\u0627\u0632 \u0625\u0637\u0641\u0627\u0621 (A4 Sheet)
                    </div>
                    <button class="print-btn" onclick="window.print()"><i class="fas fa-print"></i> \u0623\u0645\u0631 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0622\u0646</button>
                </div>

                <div class="cards-grid">
                    ${r}
                </div>

                <script>
                    window.addEventListener('load', function() {
                        setTimeout(function() { window.print(); }, 400);
                    });
                <\/script>
            </body>
            </html>
        `),l.document.close()},printQr(e){const s=this.getAssets().find(a=>a.id===e);if(!s){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u0645\u062D\u062F\u062F.");return}const t=this.getPublicInspectionUrl(s.id);let i="";if(typeof qrcode=="function")try{const a=qrcode(0,"M");a.addData(t),a.make(),i=a.createDataURL(6,4)}catch{}!i&&typeof QRCode<"u"&&(i=QRCode.generate(t,260)),i||(i=`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(t)}`);const n=window.open("","_blank");if(!n){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 QR Code");return}n.document.write(`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <title>QR Code - ${Utils.escapeHTML(s.number||s.id)}</title>
                <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&display=swap" rel="stylesheet">
                <style>
                    body { font-family: 'Cairo', Arial, sans-serif; text-align: center; padding: 24px; color: #0f172a; }
                    .card-box { border: 3px solid #dc2626; border-radius: 16px; padding: 20px; max-width: 380px; margin: 0 auto; }
                    .tag { color: #dc2626; font-weight: 800; font-size: 13px; margin-bottom: 6px; }
                    .id-title { font-size: 22px; font-weight: 900; color: #0b2a55; margin: 0 0 6px 0; }
                    img { width: 220px; height: 220px; margin: 12px auto; display: block; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 6px; }
                    .info { margin: 4px 0; font-size: 13px; color: #334155; font-weight: 700; }
                    .hint { font-size: 11px; color: #64748b; margin-top: 10px; border-top: 1px dashed #cbd5e1; padding-top: 8px; }
                </style>
            </head>
            <body>
                <div class="card-box">
                    <div class="tag">\u0645\u0646\u0638\u0648\u0645\u0629 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u2014 HSE</div>
                    <div class="id-title">${Utils.escapeHTML(s.id)}</div>
                    <p class="info"><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(s.type||"\u0637\u0641\u0627\u064A\u0629 \u062D\u0631\u064A\u0642")}${s.capacity?` - ${Utils.escapeHTML(s.capacity)}`:""}</p>
                    <p class="info"><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(s.location||"-")}</p>
                    <img src="${i}" alt="QR Code">
                    <div class="hint">\u0627\u0645\u0633\u062D \u0627\u0644\u0631\u0645\u0632 \u0628\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u0647\u0627\u062A\u0641 \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A \u0627\u0644\u0645\u0628\u0627\u0634\u0631</div>
                </div>
                <script>window.onload = () => setTimeout(() => window.print(), 300);<\/script>
            </body>
            </html>
        `),n.document.close()},toISODate(e){if(!e)return"";try{const s=new Date(e);return Number.isNaN(s.getTime())?"":s.toISOString()}catch{return""}},showManageTypesModal(){const e=document.createElement("div");e.className="modal-overlay fire-modal",e.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-cog"></i>
                        \u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <label class="form-label">\u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u062C\u062F\u064A\u062F</label>
                        <div class="flex gap-2">
                            <input type="text" id="new-type-input" class="form-input flex-1" placeholder="\u0623\u062F\u062E\u0644 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u062C\u062F\u064A\u062F">
                            <button type="button" id="add-type-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629
                            </button>
                        </div>
                    </div>
                    <div>
                        <label class="form-label">\u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</label>
                        <div id="types-list" class="space-y-2 max-h-64 overflow-y-auto p-3 border rounded">
                            ${this.assetTypes.map((i,n)=>`
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded" data-type-index="${n}">
                                    <span>${Utils.escapeHTML(i)}</span>
                                    <button type="button" class="btn-icon btn-icon-danger btn-remove-type" data-type-index="${n}" title="\u062D\u0630\u0641">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(e);const s=e.querySelector("#add-type-btn"),t=e.querySelector("#new-type-input");s.addEventListener("click",()=>{const i=t.value.trim();if(!i){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632");return}if(this.assetTypes.includes(i)){Notification.warning("\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644");return}this.assetTypes.push(i),t.value="",this.refreshTypesList(e),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D")}),e.addEventListener("click",i=>{if(i.target.closest(".btn-remove-type")){const n=parseInt(i.target.closest(".btn-remove-type").dataset.typeIndex);confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639\u061F")&&(this.assetTypes.splice(n,1),this.refreshTypesList(e),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D"))}})},refreshTypesList(e){const s=e.querySelector("#types-list");s&&(s.innerHTML=this.assetTypes.map((t,i)=>`
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded" data-type-index="${i}">
                    <span>${Utils.escapeHTML(t)}</span>
                    <button type="button" class="btn-icon btn-icon-danger btn-remove-type" data-type-index="${i}" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join(""))},showImportExcelModal(){const e=document.createElement("div");e.className="modal-overlay fire-modal",e.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-file-import ml-2"></i>
                        \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 \u0645\u0644\u0641 Excel
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <label class="form-label">\u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel</label>
                        <input type="file" id="excel-file-input" accept=".xlsx,.xls" class="form-input">
                        <p class="text-xs text-gray-500 mt-2">\u064A\u062C\u0628 \u0623\u0646 \u064A\u062D\u062A\u0648\u064A \u0627\u0644\u0645\u0644\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u0645\u062F\u0629: \u0645\u0643\u0627\u0646/\u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u060C \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u0627\u0644\u0633\u0639\u0629/\u0643\u062C\u0645\u060C \u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639\u060C \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629\u060C \u0627\u0644\u0645\u0635\u0646\u0639\u060C \u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639\u060C \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C\u060C \u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A\u060C \u0645\u0644\u0627\u062D\u0638\u0627\u062A</p>
                    </div>
                    <div id="import-preview" class="hidden">
                        <h3 class="text-lg font-semibold mb-2">\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</h3>
                        <div class="table-wrapper" style="width: 100%; max-width: 100%; max-height: 16rem; overflow-x: auto; overflow-y: auto;">
                            <table class="data-table" id="preview-table" style="width: 100%; min-width: 100%; table-layout: auto;">
                                <thead id="preview-head"></thead>
                                <tbody id="preview-body"></tbody>
                            </table>
                        </div>
                        <p class="text-sm text-gray-600 mt-2" id="preview-count"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="confirm-import-btn" class="btn-primary" disabled>
                        <i class="fas fa-check ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(e);const s=e.querySelector("#excel-file-input"),t=e.querySelector("#confirm-import-btn"),i=e.querySelector("#import-preview"),n=e.querySelector("#preview-head"),a=e.querySelector("#preview-body"),o=e.querySelector("#preview-count");let l=[];(()=>{if(typeof XLSX>"u"){const d=document.createElement("script");d.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",d.onerror=function(){this.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"},d.onload=()=>{s.addEventListener("change",p=>{this.handleExcelFile(p.target.files[0],e,t,i,n,a,o,c=>{l=c})})},document.head.appendChild(d)}else s.addEventListener("change",d=>{this.handleExcelFile(d.target.files[0],e,t,i,n,a,o,p=>{l=p})})})(),t.addEventListener("click",async()=>{if(l.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 Excel \u0623\u0648\u0644\u0627\u064B");return}await this.processImport(l,e)})},async handleExcelFile(e,s,t,i,n,a,o,l){if(e){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644\u0647\u0627...");return}Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");try{const r=await e.arrayBuffer(),d=XLSX.read(r,{type:"array"}),p=d.SheetNames[0],c=d.Sheets[p],f=XLSX.utils.sheet_to_json(c);if(f.length===0){Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide();return}const h=this.getAssets().map(m=>m.id).filter(m=>m&&m.match(/^EFA-\d{4}$/)).map(m=>parseInt(m.split("-")[1])).filter(m=>!isNaN(m));let g=h.length>0?Math.max(...h)+1:1;const A=f.map(m=>{const S=`EFA-${String(g).padStart(4,"0")}`;return g++,{id:S,location:m["\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632"]||m["\u0645\u0643\u0627\u0646 \u0627\u0644\u062C\u0647\u0627\u0632"]||m.\u0627\u0644\u0645\u0648\u0642\u0639||"",subLocation:m["\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A"]||"",type:m["\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632"]||"",capacity:m["\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645"]||m.\u0627\u0644\u0633\u0639\u0629||"",capacityKg:m["\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645"]||m.\u0627\u0644\u0633\u0639\u0629||"",siteNumber:m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639"]||m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632"]||"",number:m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639"]||m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632"]||"",manufacturer:m["\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629"]||"",factory:m.\u0627\u0644\u0645\u0635\u0646\u0639||"",manufacturingYear:m["\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639"]?parseInt(m["\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639"]):null,productionDate:m["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C"]?this.parseDate(m["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C"]):"",serialNumber:m["\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632"]||m["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644"]||"",status:m["\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632"]||"\u0635\u0627\u0644\u062D",installationMethod:m["\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A"]||"",notes:m.\u0645\u0644\u0627\u062D\u0638\u0627\u062A||"",qrCodeData:this.generateQrData(S),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}}).filter(m=>m.location&&m.type);if(A.length>0){const m=Object.keys(f[0]);n.innerHTML=`<tr>${m.map(w=>`<th>${Utils.escapeHTML(w)}</th>`).join("")}</tr>`,a.innerHTML=f.slice(0,5).map(w=>`<tr>${m.map(S=>`<td>${Utils.escapeHTML(String(w[S]||""))}</td>`).join("")}</tr>`).join(""),o.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0631\u0627\u062F \u0627\u0633\u062A\u064A\u0631\u0627\u062F\u0647\u0627: ${A.length}`,i.classList.remove("hidden"),t.disabled=!1,l(A)}else Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0635\u062D\u064A\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F");Loading.hide()}catch(r){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+r.message)}}},async processImport(e,s){if(!e||e.length===0){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0645\u0639\u0627\u0644\u062C\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062D\u0641\u0638\u0647\u0627 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");try{let t=0,i=0;const n=e.length;if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){for(let o=0;o<n;o+=5){const l=e.slice(o,o+5),r=l.map(p=>GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:p}).then(c=>(c.success?t++:i++,c)).catch(c=>(i++,{success:!1,error:c})));await Promise.allSettled(r);const d=Math.min(100,Math.round((o+l.length)/n*100));Loading.show(`\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A... ${d}% (${t} \u0646\u0627\u062C\u062D)`)}await this.loadAssetsFromBackend()}else{const a=this.getAssets();let o=0,l=0;e.forEach(r=>{const d=a.find(p=>p.id===r.id);d?(Object.assign(d,r),d.updatedAt=new Date().toISOString(),o++):(a.push(r),l++)}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),t=l+o}if(Loading.hide(),i>0?Notification.warning(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ${t} \u0646\u0627\u062C\u062D\u060C ${i} \u0641\u0634\u0644.`):Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${t} \u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D.`),s&&s.remove(),this.state.currentTab==="register"){const a=document.getElementById("fire-register-table");a&&(a.innerHTML=this.renderRegisterTable(),this.bindRegisterTableEvents(a))}else this.renderAssets();this.renderStats()}catch(t){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+t.message)}},parseDate(e){if(!e)return"";if(e instanceof Date)return e.toISOString();if(typeof e=="number"){const t=Math.floor(e),i=e-t,n=new Date(1899,11,30),a=new Date(n.getTime()+t*24*60*60*1e3);if(i>0){const o=Math.round(i*24*60*60),l=Math.floor(o/3600),r=Math.floor(o%3600/60),d=o%60;a.setHours(l,r,d,0)}return a.toISOString()}const s=new Date(e);return isNaN(s.getTime())?"":s.toISOString()},exportToExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644\u0647\u0627...");const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",e.onerror=function(){this.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"},e.onload=()=>this.exportToExcel(),document.head.appendChild(e);return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");try{const s=this.getAssets().map(a=>({\u0627\u0644\u0645\u0635\u0646\u0639:a.factoryName||a.factory||"","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A":a.subLocationName||a.subLocation||"","\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632":a.location||"","\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632":a.type||"","\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645":a.capacity||a.capacityKg||"","\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639":a.siteNumber||a.number||"","\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629":a.manufacturer||"","\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639":a.manufacturingYear||"","\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632":a.serialNumber||"","\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632":a.status||"","\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A":a.installationMethod||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:a.notes||""})),t=XLSX.utils.json_to_sheet(s),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,t,"\u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621");const n=`\u0633\u062C\u0644_\u0645\u0639\u062F\u0627\u062A_\u0627\u0644\u0627\u0637\u0641\u0627\u0621_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(i,n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+e.message)}},async exportRegisterToPDF(){const e=this.getAssets();if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF...");try{const s=window.open("","_blank");if(!s){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),Loading.hide();return}const t=e.map(n=>`
                <tr>
                    <td>${Utils.escapeHTML(n.factoryName||n.factory||"-")}</td>
                    <td>${Utils.escapeHTML(n.subLocationName||n.subLocation||"-")}</td>
                    <td>${Utils.escapeHTML(n.location||"-")}</td>
                    <td>${Utils.escapeHTML(n.type||"-")}</td>
                    <td>${Utils.escapeHTML(n.capacity||n.capacityKg||"-")}</td>
                    <td>${Utils.escapeHTML(n.siteNumber||n.number||"-")}</td>
                    <td>${Utils.escapeHTML(n.manufacturer||"-")}</td>
                    <td>${Utils.escapeHTML(n.manufacturingYear||"-")}</td>
                    <td>${Utils.escapeHTML(n.serialNumber||"-")}</td>
                    <td>${Utils.escapeHTML(n.status||"-")}</td>
                    <td>${Utils.escapeHTML(n.installationMethod||"-")}</td>
                    <td>${Utils.escapeHTML(n.notes||"-")}</td>
                </tr>
            `).join(""),i=`
                <!DOCTYPE html>
                <html dir="rtl" lang="ar">
                <head>
                    <meta charset="UTF-8">
                    <title>\u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621 \u0648\u0627\u0644\u0627\u0646\u0630\u0627\u0631</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            direction: rtl;
                            padding: 20px;
                        }
                        h1 {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                            font-size: 11px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: right;
                        }
                        th {
                            background-color: #3b82f6;
                            color: white;
                            font-weight: bold;
                        }
                        tr:nth-child(even) {
                            background-color: #f9fafb;
                        }
                        @media print {
                            body { padding: 10px; }
                            table { font-size: 9px; }
                            th, td { padding: 5px; }
                        }
                    </style>
                </head>
                <body>
                    <h1>\u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621 \u0648\u0627\u0644\u0627\u0646\u0630\u0627\u0631</h1>
                    <p style="text-align: center;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${new Date().toLocaleDateString("ar-SA")}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                                <th>\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                <th>\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                <th>\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645</th>
                                <th>\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                <th>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629</th>
                                <th>\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639</th>
                                <th>\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                <th>\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                <th>\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A</th>
                                <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${t}
                        </tbody>
                    </table>
                    <script>window.onload = () => setTimeout(() => window.print(), 500);<\/script>
                </body>
                </html>
            `;s.document.write(i),s.document.close(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 PDF \u0628\u0646\u062C\u0627\u062D")}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 PDF: "+s.message)}},isAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function")return Permissions.isCurrentUserEffectiveAdmin();const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;return!!(e&&(e.role==="admin"||e.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e.role==="system_admin"||e.permissions&&(e.permissions.admin===!0||e.permissions["manage-modules"]===!0)))},hasTabAccess(e){return(typeof AppState<"u"&&AppState?AppState.currentUser:null)?this.isAdmin()?!0:typeof Permissions<"u"?Permissions.hasDetailedPermission("fire-equipment",e):!0:e==="database"},canAdd(){const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;if(!e)return!1;if(this.isAdmin())return!0;const s=e.permissions?.fireEquipment||{};return s.add===!0||s.edit===!0},canEdit(){const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;return e?this.isAdmin()?!0:(e.permissions?.fireEquipment||{}).edit===!0:!1},canDelete(){const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;return e?this.isAdmin()?!0:(e.permissions?.fireEquipment||{}).delete===!0:!1},async deleteAsset(e){if(!this.canDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0623\u062C\u0647\u0632\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062D\u0630\u0641.");return}const s=this.getAssets().find(i=>i.id===e);if(!s){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 "${s.number||e}"\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0648\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B.`)){Loading.show();try{let i=!1;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const r=await GoogleIntegration.sendRequest({action:"deleteFireEquipment",data:{assetId:e}});if(r&&r.success)i=!0,Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend \u0628\u0646\u062C\u0627\u062D");else{const d=r?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend";Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend:",d)}}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend:",r)}else i=!0;const n=this.getAssets(),a=n.findIndex(r=>r.id===e);a>-1&&n.splice(a,1);const o=this.getInspections();if(o.filter(r=>r.assetId===e).forEach(r=>{const d=o.findIndex(p=>p.id===r.id);d>-1&&o.splice(d,1)}),AppState.appData&&AppState.appData.fireEquipmentApprovalRequests){const r=AppState.appData.fireEquipmentApprovalRequests;r.filter(p=>p.assetId===e).forEach(p=>{const c=r.findIndex(f=>f.id===p.id);c>-1&&r.splice(c,1)})}AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentAssets=n,AppState.appData.fireEquipmentInspections=o,typeof DataManager<"u"&&DataManager.save?DataManager.save():(localStorage.setItem("fire_equipment_assets",JSON.stringify(n)),localStorage.setItem("fire_equipment_inspections",JSON.stringify(o))),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u062D\u0644\u064A\u0627\u064B"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0646\u062C\u0627\u062D"),await this.refreshCurrentTab(!0),this.state.currentTab==="database"?(this.refreshFilterOptions(),this.renderSummary()):this.state.currentTab==="register"&&this.updateRegisterStatisticsCards()}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632:",i),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632")}finally{Loading.hide()}}},_fireAnalyticsCharts:{},_fireAnalyticsPeriod:"0",_fireAnalyticsFilters:{},async _fireEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(s=>{let t=0;const i=setInterval(()=>{typeof Chart<"u"?(clearInterval(i),s(!0)):++t>50&&(clearInterval(i),s(!1))},100)}):new Promise(s=>{const t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",t.onload=()=>s(!0),t.onerror=()=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",i.onload=()=>s(!0),i.onerror=()=>s(!1),document.head.appendChild(i)},document.head.appendChild(t)})},async renderAnalyticsTab(){return this.isAdmin()?(this._fireEnsureChartJS().catch(()=>{}),`
        <div id="fire-analytics-root" style="font-family:inherit;">

            <!-- \u2550\u2550\u2550 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0648\u0627\u0644\u0628\u0627\u0646\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u2550\u2550\u2550 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#DC2626 0%,#B91C1C 50%,#7F1D1D 100%);border-radius:14px;color:#fff;box-shadow:0 8px 28px rgba(220, 38, 38, 0.32);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:46px;height:46px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;backdrop-filter: blur(8px);font-size:22px;">
                        <i class="fas fa-fire-extinguisher"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0645\u0639\u062F\u0627\u062A \u0648\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0625\u0637\u0641\u0627\u0621</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.9;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u2022 \u0627\u0644\u062C\u0627\u0647\u0632\u064A\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u2022 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629 \u2022 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0628\u0627\u0646\u064A \u2022 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-inline-end:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((e,s)=>{const t=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],i=(this._fireAnalyticsPeriod||"0")===e;return`<button class="fire-period-btn" data-period="${e}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${i?"#fff":"rgba(255,255,255,0.15)"};color:${i?"#DC2626":"#fff"};">${t[s]}</button>`}).join("")}
                    </div>
                    <button id="fire-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="fire-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-inline-start:2px;">\u25CF</span>
                    </button>
                    <button id="fire-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.25);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="fire-export-csv-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-file-excel"></i><span>Excel</span>
                    </button>
                    <button id="fire-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062D\u0644\u064A\u0644">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2550\u2550\u2550 -->
            <div id="fire-filter-panel" style="display:none;background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#DC2626;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#991B1B;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642</span>
                        <span id="fire-filter-count" style="background:#fee2e2;color:#991B1B;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="fire-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #fecaca;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;">
                        <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-flag text-red-500 ml-1"></i>\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0646\u064A\u0629
                        </label>
                        <select id="fire-af-status" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            <option value="\u0635\u0627\u0644\u062D">\u0635\u0627\u0644\u062D \u0644\u0644\u0639\u0645\u0644</option>
                            <option value="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629">\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</option>
                            <option value="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-fire-extinguisher text-blue-500 ml-1"></i>\u0646\u0648\u0639 \u0627\u0644\u0637\u0641\u0627\u064A\u0629
                        </label>
                        <select id="fire-af-type" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-building text-amber-500 ml-1"></i>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0628\u0646\u0649
                        </label>
                        <select id="fire-af-location" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-weight-hanging text-emerald-500 ml-1"></i>\u0627\u0644\u0633\u0639\u0629 \u0648\u0627\u0644\u0648\u0632\u0646
                        </label>
                        <select id="fire-af-capacity" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-clipboard-check text-purple-500 ml-1"></i>\u0641\u062D\u0635 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631
                        </label>
                        <select id="fire-af-inspection" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            <option value="inspected">\u0645\u0641\u062D\u0648\u0635\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631</option>
                            <option value="due">\u0645\u0633\u062A\u062D\u0642\u0629 / \u0645\u062A\u0623\u062E\u0631\u0629</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-certificate text-teal-500 ml-1"></i>\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F
                        </label>
                        <select id="fire-af-approval" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            <option value="approved">\u0645\u0639\u062A\u0645\u062F \u0631\u0633\u0645\u064A\u0627\u064B</option>
                            <option value="pending">\u23F3 \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                            <option value="rejected">\u0645\u0631\u0641\u0648\u0636</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 \u0643\u0631\u0648\u062A \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 (KPI Strip) \u2550\u2550\u2550 -->
            <div id="fire-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:18px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A...</div>
            </div>

            <!-- \u2550\u2550\u2550 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u062D\u0633\u0628 \u0627\u0644\u0645\u0628\u0627\u0646\u064A \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u2550\u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;border-radius:14px;border:1px solid #e2e8f0;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building text-red-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;color:#1e293b;">\u062A\u0648\u0632\u064A\u0639 \u0648\u0646\u0633\u0628 \u0627\u0644\u062C\u0627\u0647\u0632\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0645\u0628\u0627\u0646\u064A \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639</span>
                    </div>
                    <span style="font-size:0.72rem;color:#64748b;">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064A \u0645\u0648\u0642\u0639 \u0644\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0641\u0648\u0631\u064A\u0629</span>
                </div>
                <div id="fire-factories-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;padding:16px;background:#f8fafc;">
                    <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:30px 0;grid-column:1/-1;">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 1: \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 (\u0627\u0644\u062D\u0627\u0644\u0629 + \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A) \u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-chart-pie text-emerald-600"></i>
                            <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0648\u0627\u0644\u062C\u0627\u0647\u0632\u064A\u0629</span>
                        </div>
                    </div>
                    <div style="padding:16px;position:relative;height:270px;">
                        <canvas id="fire-chart-status"></canvas>
                        <div id="fire-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-chart-line text-red-600"></i>
                            <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629 (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                        </div>
                    </div>
                    <div style="padding:16px;position:relative;height:270px;">
                        <canvas id="fire-chart-trend"></canvas>
                        <div id="fire-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 2: \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u0627\u0644\u062B\u0627\u0646\u0648\u064A\u0629 (\u0627\u0644\u0623\u0646\u0648\u0627\u0639 + \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0634\u0647\u0631\u064A\u0629) \u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:gap:8px;">
                        <i class="fas fa-tags text-blue-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062A\u0648\u0632\u064A\u0639 \u0623\u0646\u0648\u0627\u0639 \u0637\u0641\u0627\u064A\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642</span>
                    </div>
                    <div style="padding:16px;position:relative;height:270px;">
                        <canvas id="fire-chart-types"></canvas>
                        <div id="fire-chart-types-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-calendar-alt text-purple-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0628\u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u062F\u0648\u0631\u064A</span>
                    </div>
                    <div style="padding:16px;position:relative;height:270px;">
                        <canvas id="fire-chart-yearly"></canvas>
                        <div id="fire-chart-yearly-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 3: \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u064A\u0629 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629 \u0645\u0639 \u0623\u0634\u0631\u0637\u0629 \u0627\u0644\u062A\u0642\u062F\u0645 \u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px;margin-bottom:16px;">
                <!-- \u0623\u0639\u0644\u0649 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 -->
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-fire-extinguisher text-red-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0637\u0641\u0627\u064A\u0627\u062A \u0643\u062B\u0627\u0641\u0629</span>
                    </div>
                    <div id="fire-types-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:30px 0;">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</div>
                    </div>
                </div>
                <!-- \u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 -->
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt text-amber-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0643\u062B\u0627\u0641\u0629 \u0644\u0644\u0623\u062C\u0647\u0632\u0629</span>
                    </div>
                    <div id="fire-locations-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:30px 0;">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</div>
                    </div>
                </div>
                <!-- \u0646\u0634\u0627\u0637 \u0627\u0644\u0645\u0641\u062A\u0634\u064A\u0646 -->
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-shield text-teal-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0625\u0646\u062C\u0627\u0632 \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</span>
                    </div>
                    <div id="fire-inspectors-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:30px 0;">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 4: \u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u0623\u062D\u062F\u062B \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u2550\u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                <div style="padding:14px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-history text-red-600"></i>
                        <span style="font-weight:700;font-size:0.92rem;color:#1e293b;">\u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0648\u0627\u0644\u0645\u0639\u0644\u0642\u0629</span>
                        <span id="fire-recent-count" style="background:#fee2e2;color:#991B1B;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;">0</span>
                    </div>
                </div>
                <div class="table-wrapper" style="overflow-x:auto;">
                    <table class="data-table" style="width:100%;margin:0;font-size:0.84rem;">
                        <thead>
                            <tr style="background:#f8fafc;">
                                <th style="padding:10px 14px;">\u0643\u0648\u062F \u0627\u0644\u0641\u062D\u0635</th>
                                <th style="padding:10px 14px;">\u0627\u0644\u062C\u0647\u0627\u0632 \u0648\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                <th style="padding:10px 14px;">\u0627\u0644\u0645\u0641\u062A\u0634</th>
                                <th style="padding:10px 14px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding:10px 14px;">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0646\u064A\u0629</th>
                                <th style="padding:10px 14px;">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th>
                                <th style="padding:10px 14px;">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody id="fire-recent-tbody">
                            <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        `):'<div class="empty-state"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.</p></div>'},_fireBindAnalyticsEvents(){const e=document.getElementById("fire-analytics-root");if(!e)return;e.querySelectorAll(".fire-period-btn").forEach(l=>{l.addEventListener("click",r=>{const d=r.currentTarget.dataset.period;this._fireAnalyticsPeriod=d,e.querySelectorAll(".fire-period-btn").forEach(p=>{const c=p.dataset.period===d;p.style.background=c?"#fff":"rgba(255,255,255,0.15)",p.style.color=c?"#DC2626":"#fff"}),this.updateFireAnalyticsDashboard()})});const s=document.getElementById("fire-toggle-filters-btn"),t=document.getElementById("fire-filter-panel");s&&t&&s.addEventListener("click",()=>{const l=t.style.display==="none";t.style.display=l?"block":"none"});const i=document.getElementById("fire-filter-reset-btn");i&&i.addEventListener("click",()=>{["fire-af-status","fire-af-type","fire-af-location","fire-af-capacity","fire-af-inspection","fire-af-approval"].forEach(r=>{const d=document.getElementById(r);d&&(d.value="")});const l=document.getElementById("fire-filter-badge");l&&(l.style.display="none"),this.updateFireAnalyticsDashboard()}),["fire-af-status","fire-af-type","fire-af-location","fire-af-capacity","fire-af-inspection","fire-af-approval"].forEach(l=>{const r=document.getElementById(l);r&&r.addEventListener("change",()=>{const d=["fire-af-status","fire-af-type","fire-af-location","fire-af-capacity","fire-af-inspection","fire-af-approval"].some(c=>{const f=document.getElementById(c);return f&&f.value!==""}),p=document.getElementById("fire-filter-badge");p&&(p.style.display=d?"inline-block":"none"),this.updateFireAnalyticsDashboard()})});const n=document.getElementById("fire-analytics-refresh");n&&n.addEventListener("click",async()=>{n.querySelector("i")?.classList.add("fa-spin"),await this.loadFireEquipmentDataAsync(),await this.updateFireAnalyticsDashboard(),n.querySelector("i")?.classList.remove("fa-spin"),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D")});const a=document.getElementById("fire-export-pdf-btn");a&&a.addEventListener("click",()=>this.exportFireAnalyticsPDF());const o=document.getElementById("fire-export-csv-btn");o&&o.addEventListener("click",()=>this.exportAnalyticsData())},setupAnalyticsEventListeners(){this._fireBindAnalyticsEvents(),this.updateFireAnalyticsDashboard()},async updateFireAnalyticsDashboard(){if(!document.getElementById("fire-analytics-root"))return;this.ensureData();const s=this.getAssets()||[],t=this.getInspections()||[],i=parseInt(this._fireAnalyticsPeriod||"0",10),n=i>0?(()=>{const x=new Date;return x.setDate(x.getDate()-i),x})():null,a=n?t.filter(x=>new Date(x.checkDate||x.createdAt||0)>=n):t.slice();this._firePopulateFilterSelects(s);const o=document.getElementById("fire-af-status")?.value||"",l=document.getElementById("fire-af-type")?.value||"",r=document.getElementById("fire-af-location")?.value||"",d=document.getElementById("fire-af-capacity")?.value||"",p=document.getElementById("fire-af-inspection")?.value||"",c=document.getElementById("fire-af-approval")?.value||"",f=new Date,u=f.getMonth(),h=f.getFullYear(),g=s.filter(x=>{if(o&&x.status!==o||l&&x.type!==l||r&&String(x.location||"").indexOf(r)===-1||d&&String(x.capacity||"").indexOf(d)===-1)return!1;if(p==="inspected"){if(!a.some(k=>k.assetId===x.id))return!1}else if(p==="due"&&a.some(k=>k.assetId===x.id))return!1;return!0}),A=a.filter(x=>!(o&&x.status!==o||c&&String(x.approvalStatus||"pending").toLowerCase()!==c)),m=document.getElementById("fire-filter-count");m&&(m.textContent=`${g.length} \u062C\u0647\u0627\u0632 \u2022 ${A.length} \u0641\u062D\u0635`);const w=g.length,S=g.filter(x=>x.status==="\u0635\u0627\u0644\u062D").length,E=g.filter(x=>x.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,y=g.filter(x=>x.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length,b=t.filter(x=>{if(!x.checkDate)return!1;const I=new Date(x.checkDate);return I.getMonth()===u&&I.getFullYear()===h}),v=t.filter(x=>String(x.approvalStatus||"").toLowerCase()==="pending"||!x.approvalStatus&&x.submittedBy&&String(x.submittedBy).includes("Public")).length,q=w>0?(S/w*100).toFixed(0):0,T=w>0?Math.min(100,b.length/w*100).toFixed(0):0,D=document.getElementById("fire-kpi-strip");if(D){const x=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629",value:w,icon:"fas fa-fire-extinguisher",color:"#2563eb",bg:"#eff6ff",border:"#bfdbfe"},{label:"\u0635\u0627\u0644\u062D\u0629 \u0648\u062C\u0627\u0647\u0632\u0629",value:S,icon:"fas fa-check-circle",color:"#059669",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u062A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629",value:E,icon:"fas fa-tools",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{label:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629",value:y,icon:"fas fa-ban",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0641\u062D\u0648\u0635\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:b.length,icon:"fas fa-calendar-check",color:"#7c3aed",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u23F3 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F",value:v,icon:"fas fa-clock",color:"#b45309",bg:"#fffbeb",border:"#fde68a"},{label:"\u0646\u0633\u0628\u0629 \u0627\u0644\u062C\u0627\u0647\u0632\u064A\u0629",value:`${q}%`,icon:"fas fa-shield-alt",color:"#0d9488",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644",value:`${T}%`,icon:"fas fa-percentage",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"}];D.innerHTML=x.map(I=>`
                <div style="background:${I.bg};border:1px solid ${I.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${I.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:15px;">
                        <i class="${I.icon}"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${I.color};line-height:1;" dir="ltr">${I.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${I.label}</div>
                    </div>
                </div>
            `).join("")}if(this._firePopulateLocationCards(g),await this._fireEnsureChartJS()&&typeof Chart<"u"){this._fireRenderDoughnut("fire-chart-status",["\u0635\u0627\u0644\u062D \u0644\u0644\u0639\u0645\u0644","\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629","\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"],[S,E,y],["#10b981","#f59e0b","#ef4444"]),this._fireRenderTrend("fire-chart-trend",t);const x={};g.forEach($=>{const L=$.type||"\u0623\u062E\u0631\u0649";x[L]=(x[L]||0)+1});const I=Object.keys(x).slice(0,6),k=I.map($=>x[$]),M=["#3b82f6","#ef4444","#10b981","#f59e0b","#8b5cf6","#06b6d4"];this._fireRenderDoughnut("fire-chart-types",I,k,M),this._fireRenderYearly("fire-chart-yearly",t,s.length)}this._firePopulateRankedLists(g,A),this._firePopulateRecentTable(A,s)},_firePopulateFilterSelects(e){const s=document.getElementById("fire-af-type"),t=document.getElementById("fire-af-location"),i=document.getElementById("fire-af-capacity");s&&s.options.length<=1&&Array.from(new Set(e.map(a=>a.type).filter(Boolean))).sort().forEach(a=>{const o=document.createElement("option");o.value=a,o.textContent=a,s.appendChild(o)}),t&&t.options.length<=1&&Array.from(new Set(e.map(a=>a.location).filter(Boolean))).sort().forEach(a=>{const o=document.createElement("option");o.value=a,o.textContent=a,t.appendChild(o)}),i&&i.options.length<=1&&Array.from(new Set(e.map(a=>a.capacity).filter(Boolean))).sort().forEach(a=>{const o=document.createElement("option");o.value=a,o.textContent=a,i.appendChild(o)})},_firePopulateLocationCards(e){const s=document.getElementById("fire-factories-cards");if(!s)return;const t={};e.forEach(n=>{const a=String(n.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();t[a]||(t[a]={total:0,valid:0,maintenance:0,outOfService:0}),t[a].total++,n.status==="\u0635\u0627\u0644\u062D"?t[a].valid++:n.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?t[a].maintenance++:n.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&t[a].outOfService++});const i=Object.entries(t).sort((n,a)=>a[1].total-n[1].total).slice(0,8);if(i.length===0){s.innerHTML='<div style="text-align:center;color:#94a3b8;grid-column:1/-1;padding:20px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0645\u0633\u062C\u0644\u0629</div>';return}s.innerHTML=i.map(([n,a])=>{const o=a.total>0?(a.valid/a.total*100).toFixed(0):0;return`
                <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;cursor:pointer;transition:all 0.2s ease;box-shadow:0 2px 6px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-2px)';this.style.borderColor='#ef4444';this.style.boxShadow='0 8px 18px rgba(239,68,68,0.1)';" onmouseout="this.style.transform='none';this.style.borderColor='#e2e8f0';this.style.boxShadow='0 2px 6px rgba(0,0,0,0.02)';" onclick="const sel=document.getElementById('fire-af-location');if(sel){sel.value='${Utils.escapeHTML(n)}';sel.dispatchEvent(new Event('change'));}">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <h4 style="margin:0;font-size:0.86rem;font-weight:700;color:#1e293b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;">${Utils.escapeHTML(n)}</h4>
                        <span style="background:#fee2e2;color:#991b1b;font-weight:800;font-size:0.75rem;padding:2px 7px;border-radius:8px;">${a.total} \u062C\u0647\u0627\u0632</span>
                    </div>
                    <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.75rem;color:#64748b;margin-bottom:6px;">
                        <span>\u0646\u0633\u0628\u0629 \u0627\u0644\u062C\u0627\u0647\u0632\u064A\u0629:</span>
                        <span style="font-weight:700;color:${o>=90?"#16a34a":o>=70?"#d97706":"#dc2626"}">${o}%</span>
                    </div>
                    <div style="width:100%;height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${o}%;height:100%;background:${o>=90?"#10b981":o>=70?"#f59e0b":"#ef4444"};border-radius:4px;"></div>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:8px;font-size:0.7rem;color:#64748b;">
                        <span style="color:#16a34a;"><i class="fas fa-check-circle ml-1"></i>${a.valid}</span>
                        <span style="color:#d97706;"><i class="fas fa-tools ml-1"></i>${a.maintenance}</span>
                        <span style="color:#dc2626;"><i class="fas fa-ban ml-1"></i>${a.outOfService}</span>
                    </div>
                </div>
            `}).join("")},_firePopulateRankedLists(e,s){const t=document.getElementById("fire-types-list");if(t){const a={};e.forEach(r=>{const d=r.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a[d]=(a[d]||0)+1});const o=Object.entries(a).sort((r,d)=>d[1]-r[1]).slice(0,6),l=e.length||1;t.innerHTML=o.map(([r,d])=>{const p=(d/l*100).toFixed(1);return`
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:600;color:#334155;margin-bottom:4px;">
                            <span>${Utils.escapeHTML(r)}</span>
                            <span style="color:#dc2626;font-weight:700;">${d} (${p}%)</span>
                        </div>
                        <div style="width:100%;height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                            <div style="width:${p}%;height:100%;background:linear-gradient(90deg, #ef4444 0%, #dc2626 100%);border-radius:4px;"></div>
                        </div>
                    </div>
                `}).join("")}const i=document.getElementById("fire-locations-list");if(i){const a={};e.forEach(r=>{const d=r.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a[d]=(a[d]||0)+1});const o=Object.entries(a).sort((r,d)=>d[1]-r[1]).slice(0,6),l=e.length||1;i.innerHTML=o.map(([r,d])=>{const p=(d/l*100).toFixed(1);return`
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:600;color:#334155;margin-bottom:4px;">
                            <span>${Utils.escapeHTML(r)}</span>
                            <span style="color:#d97706;font-weight:700;">${d} \u062C\u0647\u0627\u0632</span>
                        </div>
                        <div style="width:100%;height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                            <div style="width:${p}%;height:100%;background:linear-gradient(90deg, #f59e0b 0%, #d97706 100%);border-radius:4px;"></div>
                        </div>
                    </div>
                `}).join("")}const n=document.getElementById("fire-inspectors-list");if(n){const a={};s.forEach(r=>{const d=r.inspector||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a[d]=(a[d]||0)+1});const o=Object.entries(a).sort((r,d)=>d[1]-r[1]).slice(0,6),l=s.length||1;n.innerHTML=o.map(([r,d])=>{const p=(d/l*100).toFixed(1);return`
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:600;color:#334155;margin-bottom:4px;">
                            <span><i class="fas fa-user-check text-teal-600 ml-1"></i>${Utils.escapeHTML(r)}</span>
                            <span style="color:#0d9488;font-weight:700;">${d} \u0641\u062D\u0635</span>
                        </div>
                        <div style="width:100%;height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                            <div style="width:${p}%;height:100%;background:linear-gradient(90deg, #14b8a6 0%, #0d9488 100%);border-radius:4px;"></div>
                        </div>
                    </div>
                `}).join("")}},_firePopulateRecentTable(e,s){const t=document.getElementById("fire-recent-tbody"),i=document.getElementById("fire-recent-count");if(!t)return;const n=e.slice().sort((a,o)=>{const l=new Date(a.checkDate||a.createdAt||0);return new Date(o.checkDate||o.createdAt||0)-l}).slice(0,15);if(i&&(i.textContent=`${n.length} \u0641\u062D\u0635`),n.length===0){t.innerHTML='<tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u062A\u062D\u062F\u064A\u062F</td></tr>';return}t.innerHTML=n.map(a=>{const o=s.find(c=>c.id===a.assetId),l=o?`${o.number||o.id} - ${o.location||""}`:a.assetId,r=a.checkDate?Utils.formatDate(a.checkDate):"-",d=this.getStatusBadge(a.status),p=this.getApprovalBadge(a.approvalStatus,a.submittedBy);return`
                <tr>
                    <td style="font-weight:700;color:#1e293b;">${Utils.escapeHTML(a.id||"-")}</td>
                    <td>
                        <div style="font-weight:600;color:#1e293b;">${Utils.escapeHTML(l)}</div>
                        <div style="font-size:0.75rem;color:#94a3b8;">ID: ${Utils.escapeHTML(a.assetId||"-")}</div>
                    </td>
                    <td>${Utils.escapeHTML(a.inspector||"-")}</td>
                    <td>${r}</td>
                    <td>${d}</td>
                    <td>${p}</td>
                    <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.8rem;color:#475569;">
                        ${Utils.escapeHTML(a.remarks||"-")}
                    </td>
                </tr>
            `}).join("")},_fireRenderDoughnut(e,s,t,i){const n=document.getElementById(e);if(!n)return;try{this._fireAnalyticsCharts[e]&&this._fireAnalyticsCharts[e].destroy()}catch{}const a=t.reduce((l,r)=>l+r,0),o=document.getElementById(`${e}-empty`);if(a===0){o&&(o.style.display="flex");return}o&&(o.style.display="none"),this._fireAnalyticsCharts[e]=new Chart(n,{type:"doughnut",data:{labels:s,datasets:[{data:t,backgroundColor:i,borderWidth:2,borderColor:"#ffffff"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{font:{family:"inherit",size:11},padding:12}}},cutout:"65%"}})},_fireRenderTrend(e,s){const t=document.getElementById(e);if(!t)return;try{this._fireAnalyticsCharts[e]&&this._fireAnalyticsCharts[e].destroy()}catch{}const i=[],n=[],a=new Date;for(let o=11;o>=0;o--){const l=new Date(a.getFullYear(),a.getMonth()-o,1),r=l.getMonth(),d=l.getFullYear();i.push(l.toLocaleDateString("ar-SA",{month:"short"}));const p=s.filter(c=>{if(!c.checkDate)return!1;const f=new Date(c.checkDate);return f.getMonth()===r&&f.getFullYear()===d}).length;n.push(p)}this._fireAnalyticsCharts[e]=new Chart(t,{type:"line",data:{labels:i,datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629",data:n,borderColor:"#dc2626",backgroundColor:"rgba(220, 38, 38, 0.1)",fill:!0,tension:.35,borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#dc2626"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,grid:{color:"rgba(0,0,0,0.04)"}},x:{grid:{display:!1}}},plugins:{legend:{display:!1}}}})},_fireRenderYearly(e,s,t){const i=document.getElementById(e);if(!i)return;try{this._fireAnalyticsCharts[e]&&this._fireAnalyticsCharts[e].destroy()}catch{}const n=[],a=[],o=new Date,l=t||1;for(let r=5;r>=0;r--){const d=new Date(o.getFullYear(),o.getMonth()-r,1),p=d.getMonth(),c=d.getFullYear();n.push(d.toLocaleDateString("ar-SA",{month:"short",year:"2-digit"}));const f=s.filter(h=>{if(!h.checkDate)return!1;const g=new Date(h.checkDate);return g.getMonth()===p&&g.getFullYear()===c}).length,u=Math.min(100,Math.round(f/l*100));a.push(u)}this._fireAnalyticsCharts[e]=new Chart(i,{type:"bar",data:{labels:n,datasets:[{label:"\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 %",data:a,backgroundColor:"rgba(124, 58, 237, 0.85)",borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,max:100,grid:{color:"rgba(0,0,0,0.04)"}},x:{grid:{display:!1}}},plugins:{legend:{display:!1}}}})},exportFireAnalyticsPDF(){typeof window.print=="function"?window.print():Notification.info("\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0623\u0645\u0631 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u062A\u0635\u0641\u062D (Ctrl+P) \u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0643\u0640 PDF")},exportAnalyticsData(){try{const e=this.getAssets()||[],s=this.getInspections()||[];let t="\uFEFF";t+=`\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629
`,t+=`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631,${new Date().toLocaleDateString("ar-SA")}

`,t+=`\u0633\u062C\u0644 \u0623\u062C\u0647\u0632\u0629 \u0648\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621
`,t+=`DeviceID,\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632,\u0627\u0644\u0646\u0648\u0639,\u0627\u0644\u0633\u0639\u0629,\u0627\u0644\u0645\u0648\u0642\u0639,\u0627\u0644\u062D\u0627\u0644\u0629,\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u0641\u062D\u0635,\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0642\u0627\u062F\u0645
`,e.forEach(a=>{t+=`"${a.id||""}","${a.number||""}","${a.type||""}","${a.capacity||""}","${a.location||""}","${a.status||""}","${a.lastInspection||""}","${a.nextInspection||""}"
`}),t+=`
\u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629
`,t+=`\u0643\u0648\u062F \u0627\u0644\u0641\u062D\u0635,DeviceID,\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635,\u0627\u0644\u0645\u0641\u062A\u0634,\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0646\u064A\u0629,\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F,\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A
`,s.forEach(a=>{t+=`"${a.id||""}","${a.assetId||""}","${a.checkDate||""}","${a.inspector||""}","${a.status||""}","${a.approvalStatus||"pending"}","${(a.remarks||"").replace(/"/g,'""')}"
`});const i=new Blob([t],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(i),n.download=`Fire_Equipment_Analytics_${new Date().toISOString().slice(0,10)}.csv`,n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D")}catch(e){typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+e.message)}},async renderApprovalRequestsTab(){if(!this.isAdmin())return'<div class="empty-state"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.</p></div>';this.ensureData();try{const i=await this.loadApprovalRequestsFromBackend();i&&i.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${i.length} \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 Backend`)}catch(i){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",i)}const e=this.getApprovalRequests();if(!e||!Array.isArray(e))return Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u062A\u0627\u062D\u0629"),'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p></div>';const t=[...e].sort((i,n)=>{const a={pending:1,approved:2,rejected:3},o=a[i.status]||99,l=a[n.status]||99;if(o!==l)return o-l;const r=new Date(i.requestedAt||0);return new Date(n.requestedAt||0)-r}).map(i=>{const n=i.status==="approved"?'<span class="badge badge-success"><i class="fas fa-check-circle ml-1"></i>\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>':i.status==="rejected"?'<span class="badge badge-danger"><i class="fas fa-times-circle ml-1"></i>\u0645\u0631\u0641\u0648\u0636</span>':'<span class="badge badge-warning"><i class="fas fa-clock ml-1"></i>\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',a=i.type==="inspection"?'<i class="fas fa-clipboard-check ml-1"></i>\u0641\u062D\u0635 \u0634\u0647\u0631\u064A':i.type==="add"?'<i class="fas fa-plus-circle ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632':i.type==="edit"?'<i class="fas fa-edit ml-1"></i>\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0627\u0632':i.type==="delete"?'<i class="fas fa-trash ml-1"></i>\u062D\u0630\u0641 \u062C\u0647\u0627\u0632':'<i class="fas fa-question-circle ml-1"></i>\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F',o=this.getAssets().find(r=>r.id===i.assetId||r.number===i.assetNumber),l=o?`${o.number||o.id} - ${o.location||""}`:i.assetNumber||i.assetId||"-";return`
                <tr data-request-id="${i.id}" data-status="${i.status||"pending"}" style="${i.status==="pending"?"background-color: rgba(255, 193, 7, 0.05);":""}">
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(i.id||"-")}</div>
                        ${i.status==="pending"?'<div class="text-xs text-yellow-600 mt-1"><i class="fas fa-exclamation-circle ml-1"></i>\u064A\u062A\u0637\u0644\u0628 \u0645\u0631\u0627\u062C\u0639\u0629</div>':""}
                    </td>
                    <td>${a}</td>
                    <td>
                        <div class="font-semibold">${Utils.escapeHTML(l)}</div>
                        ${o?`<div class="text-xs text-gray-500">${Utils.escapeHTML(o.type||"")}</div>`:""}
                    </td>
                    <td>
                        <div class="font-semibold">${Utils.escapeHTML(i.requestedBy||i.userName||"-")}</div>
                        ${i.userEmail?`<div class="text-xs text-gray-500">${Utils.escapeHTML(i.userEmail)}</div>`:""}
                    </td>
                    <td>
                        <div>${i.requestedAt?Utils.formatDate(i.requestedAt):"-"}</div>
                        ${i.approvedAt||i.rejectedAt?`<div class="text-xs text-gray-500 mt-1">
                                ${i.status==="approved"&&i.approvedAt?`\u0645\u0648\u0627\u0641\u0642: ${Utils.formatDate(i.approvedAt)}`:""}
                                ${i.status==="rejected"&&i.rejectedAt?`\u0645\u0631\u0641\u0648\u0636: ${Utils.formatDate(i.rejectedAt)}`:""}
                            </div>`:""}
                    </td>
                    <td>${n}</td>
                    <td style="word-wrap: break-word; max-width: 200px; white-space: normal;">
                        <div class="text-sm">${Utils.escapeHTML(i.comments||i.reason||"-")}</div>
                        ${i.rejectionReason?`<div class="text-xs text-red-600 mt-1"><i class="fas fa-info-circle ml-1"></i>\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636: ${Utils.escapeHTML(i.rejectionReason)}</div>`:""}
                    </td>
                    <td>
                        <div class="flex flex-wrap gap-2">
                            ${i.status==="pending"?`
                            <button class="btn-icon btn-icon-success" data-action="approve-request" data-id="${i.id}" title="\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="btn-icon btn-icon-danger" data-action="reject-request" data-id="${i.id}" title="\u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-times"></i>
                            </button>
                            `:""}
                            <button class="btn-icon btn-icon-primary" data-action="view-request" data-id="${i.id}" title="\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${i.status==="pending"?`
                            <button class="btn-icon btn-icon-warning" data-action="edit-request" data-id="${i.id}" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-edit"></i>
                            </button>
                            `:""}
                            <button class="btn-icon btn-icon-danger" data-action="delete-request" data-id="${i.id}" title="\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join("");return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-check-circle ml-2"></i>
                            \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629
                        </h2>
                        <div class="flex items-center gap-2">
                            <input type="text" id="approval-requests-search" class="form-input" placeholder="\u0628\u062D\u062B..." style="width: 250px;">
                            <button id="approval-requests-refresh" class="btn-secondary">
                                <i class="fas fa-sync-alt ml-2"></i>
                                \u062A\u062D\u062F\u064A\u062B
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    ${e.length===0?`
                        <div class="empty-state">
                            <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                        </div>
                    `:`
                        <div class="table-wrapper approval-requests-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;">
                            <table class="data-table" style="width: 100%; min-width: 100%; table-layout: auto;">
                                <thead style="position: sticky; top: 0; background: var(--card-bg); z-index: 10;">
                                    <tr>
                                        <th style="min-width: 100px;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                                        <th style="min-width: 120px;">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</th>
                                        <th style="min-width: 120px;">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                        <th style="min-width: 150px;">\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                                        <th style="min-width: 120px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628</th>
                                        <th style="min-width: 100px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th style="min-width: 200px; word-wrap: break-word;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                        <th style="min-width: 150px;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody id="approval-requests-table-body">
                                    ${t}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            </div>
        `},async loadApprovalRequestsFromBackend(){try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const s=await GoogleIntegration.sendRequest({action:"getFireEquipmentApprovalRequests",data:{}});if(s&&s.success&&s.data){AppState.appData||(AppState.appData={});const t=Array.isArray(s.data)?s.data:[],n=[...AppState.appData.fireEquipmentApprovalRequests||[]];return t.forEach(a=>{const o=n.findIndex(l=>l.id===a.id);o>=0?n[o]={...n[o],...a}:n.push(a)}),AppState.appData.fireEquipmentApprovalRequests=n,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(n)),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${n.length} \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 (${t.length} \u0645\u0646 Backend)`),n}else Utils.safeWarn("\u26A0\uFE0F \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629 \u0645\u0646 Backend:",s)}else Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u0623\u0648 \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")}catch(s){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 Backend:",s)}return this.getApprovalRequests()||[]},getApprovalRequests(){AppState.appData||(AppState.appData={});let e=[];if(AppState.appData.fireEquipmentApprovalRequests&&Array.isArray(AppState.appData.fireEquipmentApprovalRequests))e=[...AppState.appData.fireEquipmentApprovalRequests];else{const t=localStorage.getItem("fire_equipment_approval_requests");if(t)try{const i=JSON.parse(t);Array.isArray(i)&&(e=[...i],AppState.appData.fireEquipmentApprovalRequests=i)}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 localStorage:",i)}}return(this.getInspections()||[]).forEach(t=>{if(!t||!t.id)return;const i=String(t.approvalStatus||"").toLowerCase()==="approved",n=String(t.approvalStatus||"").toLowerCase()==="rejected",a=i?"approved":n?"rejected":"pending",o=e.findIndex(l=>l.id===t.id||l.inspectionId===t.id);o>=0?(e[o].status=a,i?(e[o].approvedBy=t.approvedBy||e[o].approvedBy||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",e[o].approvedAt=t.approvedAt||e[o].approvedAt||t.updatedAt):n&&(e[o].rejectedBy=t.rejectedBy||e[o].rejectedBy||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",e[o].rejectionReason=t.reviewNotes||e[o].rejectionReason||"")):e.push({id:t.id,type:"inspection",assetId:t.assetId,requestedBy:t.inspector||(t.submittedBy?"\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A":"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"),requestedAt:t.checkDate||t.createdAt,status:a,approvedBy:t.approvedBy||"",approvedAt:t.approvedAt||"",rejectedBy:t.rejectedBy||"",rejectionReason:t.reviewNotes||"",comments:`\u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0645\u064A\u062F\u0627\u0646\u064A - \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0646\u064A\u0629: ${t.status||"\u0635\u0627\u0644\u062D"} | \u0635\u0645\u0627\u0645 \u0627\u0644\u0623\u0645\u0627\u0646: ${t.sealIntact||"\u0633\u0644\u064A\u0645"} | \u0639\u062F\u0627\u062F \u0627\u0644\u0636\u063A\u0637: ${t.gaugeReading||"\u0633\u0644\u064A\u0645"} ${t.remarks?" | \u0645\u0644\u0627\u062D\u0638\u0629: "+t.remarks:""}`,inspectionRecord:t})}),AppState.appData.fireEquipmentApprovalRequests=e,e},async refreshApprovalRequestsTab(){const e=document.getElementById("fire-tab-approval-requests");if(e){const s=await this.renderApprovalRequestsTab();e.innerHTML=s,this.setupApprovalRequestsEventListeners()}typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()},setupApprovalRequestsEventListeners(){const e=document.getElementById("approval-requests-search");if(e){const i=e.cloneNode(!0);e.parentNode.replaceChild(i,e),i.addEventListener("input",n=>{const a=n.target.value.toLowerCase();document.querySelectorAll("#approval-requests-table-body tr[data-request-id]").forEach(l=>{const r=l.textContent.toLowerCase();l.style.display=r.includes(a)?"":"none"})})}const s=document.getElementById("approval-requests-refresh");if(s){const i=s.cloneNode(!0);s.parentNode&&s.parentNode.replaceChild(i,s),i.addEventListener("click",async n=>{n.preventDefault(),n.stopPropagation();try{Loading.show(),await this.loadApprovalRequestsFromBackend(),await this.loadFireEquipmentDataAsync(),await this.refreshApprovalRequestsTab(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628\u0627\u062A")}finally{Loading.hide()}})}const t=document.getElementById("approval-requests-table-body");t&&t.addEventListener("click",async i=>{const n=i.target.closest("[data-action]");if(!n)return;const a=n.dataset.action,o=n.dataset.id;switch(a){case"approve-request":await this.approveRequest(o);break;case"reject-request":await this.rejectRequest(o);break;case"view-request":await this.viewRequest(o);break;case"edit-request":await this.editRequest(o);break;case"delete-request":await this.deleteRequest(o);break}})},async approveRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}if(String(e).startsWith("FEI")||this.getInspections().some(i=>i.id===e)){await this.approveInspection(e),await this.refreshApprovalRequestsTab();return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F")){Loading.show();try{const i=this.getApprovalRequests(),n=i.find(l=>l.id===e);if(!n){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const a=AppState.currentUser?.name||AppState.currentUser?.fullName||AppState.currentUser?.email||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",o=new Date().toISOString();n.status="approved",n.approvedBy=a,n.approvedAt=o,AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=i,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateFireEquipmentApprovalRequest",data:{requestId:e,status:"approved",approvedBy:n.approvedBy,approvedAt:n.approvedAt}}).catch(l=>Utils.safeWarn("Warning background sync:",l)),Notification.success("\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),await this.refreshApprovalRequestsTab()}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628:",i),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},async rejectRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}if(String(e).startsWith("FEI")||this.getInspections().some(i=>i.id===e)){await this.rejectInspection(e),await this.refreshApprovalRequestsTab();return}const t=prompt("\u0623\u062F\u062E\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:");if(t!==null){Loading.show();try{const i=this.getApprovalRequests(),n=i.find(l=>l.id===e);if(!n){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const a=AppState.currentUser?.name||AppState.currentUser?.fullName||AppState.currentUser?.email||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",o=new Date().toISOString();n.status="rejected",n.rejectedBy=a,n.rejectedAt=o,n.rejectionReason=t||"",AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=i,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateFireEquipmentApprovalRequest",data:{requestId:e,status:"rejected",rejectedBy:n.rejectedBy,rejectedAt:n.rejectedAt,rejectionReason:n.rejectionReason}}).catch(l=>Utils.safeWarn("Warning background sync:",l)),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),await this.refreshApprovalRequestsTab()}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628:",i),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},async viewRequest(e){if(String(e).startsWith("FEI")||this.getInspections().some(r=>r.id===e)){this.viewInspection(e);return}const i=this.getApprovalRequests().find(r=>r.id===e);if(!i){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const n=this.getAssets().find(r=>r.id===i.assetId||r.number===i.assetNumber),a=i.status==="approved"?'<span class="badge badge-success"><i class="fas fa-check-circle ml-1"></i>\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>':i.status==="rejected"?'<span class="badge badge-danger"><i class="fas fa-times-circle ml-1"></i>\u0645\u0631\u0641\u0648\u0636</span>':'<span class="badge badge-warning"><i class="fas fa-clock ml-1"></i>\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',o=i.type==="inspection"?"\u0641\u062D\u0635 \u0634\u0647\u0631\u064A":i.type==="add"?"\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632":i.type==="edit"?"\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0627\u0632":i.type==="delete"?"\u062D\u0630\u0641 \u062C\u0647\u0627\u0632":"\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",l=document.createElement("div");l.className="modal-overlay fire-modal",l.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-file-alt ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(i.id||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(o)}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(i.assetNumber||i.assetId||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0627\u0632:</label>
                                <p class="text-gray-800">${n?`${Utils.escapeHTML(n.number||n.id)} - ${Utils.escapeHTML(n.location||"")}`:"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(i.requestedBy||i.userName||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800">${i.requestedAt?Utils.formatDate(i.requestedAt):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <p class="text-gray-800">${a}</p>
                            </div>
                            ${i.status==="approved"?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647 \u0645\u0646:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(i.approvedBy||"-")}</p>
                            </div>
                            `:""}
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A / \u0627\u0644\u0633\u0628\u0628:</label>
                            <p class="text-gray-800 bg-gray-50 p-3 rounded-lg border">${Utils.escapeHTML(i.comments||i.reason||"-")}</p>
                        </div>
                        ${i.rejectionReason?`
                        <div>
                            <label class="text-sm font-semibold text-red-600">\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:</label>
                            <p class="text-red-800 bg-red-50 p-3 rounded-lg border border-red-200">${Utils.escapeHTML(i.rejectionReason)}</p>
                        </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(l)},async editRequest(e){const s=this.getApprovalRequests(),t=s.find(n=>n.id===e);if(!t){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}if(t.status!=="pending"){Notification.warning("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0639\u062F\u064A\u0644 \u0637\u0644\u0628 \u062A\u0645\u062A \u0645\u0639\u0627\u0644\u062C\u062A\u0647");return}const i=prompt("\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:",t.comments||"");if(i!==null){Loading.show();try{t.comments=i,t.updatedAt=new Date().toISOString(),AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=s,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),await this.refreshApprovalRequestsTab()}catch(n){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628:",n),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},async deleteRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F")){Loading.show();try{const t=this.getApprovalRequests(),i=t.findIndex(n=>n.id===e||n.inspectionId===e);if(i!==-1&&t.splice(i,1),String(e).startsWith("FEI")||this.getInspections().some(n=>n.id===e)){if(AppState.appData&&AppState.appData.fireEquipmentInspections){const n=AppState.appData.fireEquipmentInspections.findIndex(a=>a.id===e);n!==-1&&AppState.appData.fireEquipmentInspections.splice(n,1)}typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"deleteFireEquipmentInspection",data:{inspectionId:e}}).catch(n=>Utils.safeWarn("Warning delete sync:",n))}AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=t,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),await this.refreshApprovalRequestsTab()}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,s)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${s+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions(),s=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(o){return String(o??"")},t='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>'+(e||[]).map(function(o){return'<option value="'+s(o.id)+'">'+s(o.name)+"</option>"}).join("");["asset-factory","fire-assets-location"].forEach(function(o){var l=document.getElementById(o);if(l&&l.tagName==="SELECT"){var r=l.value;l.innerHTML=t,r&&(l.value=r)}});var i=document.getElementById("asset-sub-location");if(i&&i.tagName==="SELECT"){var n=(document.getElementById("asset-factory")||{}).value,a=this.getPlaceOptions(n);i.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+(a||[]).map(function(o){return'<option value="'+s(o.id)+'">'+s(o.name)+"</option>"}).join("")}}catch(o){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F FireEquipment.refreshSiteDropdowns:",o)}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(i=>i.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const i=Permissions.formSettingsState.sites.find(n=>n.id===e);if(i&&Array.isArray(i.places))return i.places.map(n=>({id:n.id,name:n.name}))}if(Array.isArray(AppState.appData?.observationSites)){const i=AppState.appData.observationSites.find(n=>(n.id||n.siteId)===e);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((a,o)=>({id:a.id||a.placeId||a.value||Utils.generateId("PLACE"),name:a.name||a.placeName||a.title||a.label||a.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const i=DailyObservations.DEFAULT_SITES.find(n=>(n.id||n.siteId)===e);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((a,o)=>({id:a.id||a.placeId||a.value||Utils.generateId("PLACE"),name:a.name||a.placeName||a.title||a.label||a.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(s){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0641\u0631\u0639\u064A\u0629:",s),[]}}},(function(){"use strict";try{typeof window<"u"&&typeof FireEquipment<"u"&&(window.FireEquipment=FireEquipment,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 FireEquipment module loaded and available on window.FireEquipment"))}catch{if(typeof window<"u"&&typeof FireEquipment<"u")try{window.FireEquipment=FireEquipment}catch{}}})();
