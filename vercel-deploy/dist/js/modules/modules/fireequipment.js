FireEquipment={state:{currentTab:"database",filters:{search:"",type:"all",status:"all",location:"all"}},applyModuleI18n(e){const i=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!i)return;const a=e||document.getElementById("fire-equipment-section")||document;i.applyI18n(a),typeof i.applyLiteralTranslations=="function"&&i.applyLiteralTranslations(a)},assetTypes:["\u0637\u0641\u0627\u064A\u0629 \u062D\u0631\u064A\u0642","\u062E\u0631\u0637\u0648\u0645 \u062D\u0631\u064A\u0642","\u0635\u0646\u062F\u0648\u0642 \u062D\u0631\u064A\u0642","\u062C\u0647\u0627\u0632 \u0625\u0646\u0630\u0627\u0631","\u0646\u0638\u0627\u0645 \u0631\u0634 \u0645\u0627\u0626\u064A","\u0645\u0636\u062E\u0629 \u062D\u0631\u064A\u0642","\u0635\u0645\u0627\u0645 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"],statusOptions:[{value:"\u0635\u0627\u0644\u062D",label:"\u0635\u0627\u0644\u062D"},{value:"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629",label:"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"},{value:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629",label:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"}],confirmClose(e){confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0648\u0630\u062C\u061F
\u0633\u064A\u062A\u0645 \u0641\u0642\u062F\u0627\u0646 \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.`)&&e.closest(".modal-overlay").remove()},closeModal(e){const i=e.closest(".modal-overlay");i&&i.remove()},generateFireDeviceID(){const i=this.getAssets().map(s=>s.id).filter(s=>s&&s.match(/^EFA-\d{4}$/)).map(s=>parseInt(s.split("-")[1])).filter(s=>!isNaN(s)),a=i.length>0?Math.max(...i)+1:1;return`EFA-${String(a).padStart(4,"0")}`},_injectFireIdentityStyles(){try{if(document.getElementById("fire-professional-identity-styles"))return;const e=document.createElement("style");e.id="fire-professional-identity-styles",e.textContent=`
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
            `,document.head.appendChild(e)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0642\u0646 \u0647\u0648\u064A\u0629 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",e)}},async load(){try{this._injectFireIdentityStyles();const e=document.getElementById("fire-equipment-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0642\u0633\u0645 fire-equipment-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}if(typeof AppState>"u"){e.innerHTML='<div class="content-card"><div class="card-body"><p class="text-red-600">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p></div></div>',this.applyModuleI18n(e);return}AppState.appData||(AppState.appData={});const i='<div class="fire-tab-loading"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';e.innerHTML=`
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
                        ${i}
                    </div>
                    <div id="fire-tab-register" class="fire-tab-content" style="display: none;">
                        ${i}
                    </div>
                    <div id="fire-tab-inspections" class="fire-tab-content" style="display: none;">
                        ${i}
                    </div>
                    ${this.isAdmin()?`
                    <div id="fire-tab-analytics" class="fire-tab-content" style="display: none;">
                        ${i}
                    </div>
                    <div id="fire-tab-approval-requests" class="fire-tab-content" style="display: none;">
                        ${i}
                    </div>
                    `:""}
                </div>
            `,this.applyModuleI18n(e);try{this.setupEventListeners()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A setupEventListeners:",a)}setTimeout(async()=>{try{await new Promise(n=>{if(typeof AppState<"u"&&AppState&&AppState.appData){n();return}let o=0;const l=50,r=setInterval(()=>{o++,typeof AppState<"u"&&AppState&&AppState.appData?(clearInterval(r),n()):o>=l&&(clearInterval(r),(typeof AppState>"u"||!AppState)&&(AppState={}),AppState.appData||(AppState.appData={}),n())},100)});let t=!1;try{t=this.ensureData()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A ensureData:",n)}if(t)try{setTimeout(async()=>{try{await this.persistAll()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A persistAll:",n)}},0)}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A persistAll:",n)}const s=document.getElementById("fire-tab-database");if(s){const n=async l=>{const r=(c,f,d)=>{const p=new Promise((u,g)=>{setTimeout(()=>g(new Error(d||"Timeout")),f)});return Promise.race([c,p])};return typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(l(),1e4,"Timeout: renderTabContent"):await r(l(),1e4,"Timeout: renderTabContent")},o=`
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</p><p class="text-2xl font-bold" id="fire-summary-total">0</p></div></div>
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">\u0623\u062C\u0647\u0632\u0629 \u0641\u0639\u0651\u0627\u0644\u0629</p><p class="text-2xl font-bold text-green-600" id="fire-summary-active">0</p></div></div>
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">\u0628\u062D\u0627\u062C\u0629 \u0625\u0644\u0649 \u0645\u062A\u0627\u0628\u0639\u0629</p><p class="text-2xl font-bold text-yellow-600" id="fire-summary-maintenance">0</p></div></div>
                            </div>
                            <div class="content-card mt-6"><div class="card-body"><div id="fire-assets-table" class="overflow-x-auto"><div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0623\u0648 \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644.</p></div></div></div>
                        `;try{const l=await n(()=>this.renderTabContent("database"));s.innerHTML=l&&l.trim()?l:o}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",l),s.innerHTML=o}try{this.renderAssets()}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A renderAssets:",l)}}if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)this.loadFireEquipmentDataAsync().then(()=>{if(this.state.currentTab==="database")try{this.renderAssets()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B renderAssets:",n)}if(this.state.currentTab==="register")try{typeof this.refreshRegisterTable=="function"?this.refreshRegisterTable():typeof this.refreshCurrentTab=="function"&&this.refreshCurrentTab()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0633\u062C\u0644:",n)}}).catch(n=>{if(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",n),this.state.currentTab==="database")try{this.renderAssets()}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A renderAssets \u0628\u0639\u062F \u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644:",o)}});else if(this.state.currentTab==="database")try{this.renderAssets()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A renderAssets:",n)}}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:",a)}},0)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",e),section&&(section.innerHTML=`
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
                `,this.applyModuleI18n(section)),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",{duration:3e3})}},async switchTab(e){if(this.state.currentTab===e)return;this.ensureData(),document.querySelectorAll(".fire-tab-btn").forEach(a=>{a.classList.remove("active"),a.dataset.tab===e&&a.classList.add("active")}),document.querySelectorAll(".fire-tab-content").forEach(a=>{a.style.display="none",a.classList.remove("active")});const i=document.getElementById(`fire-tab-${e}`);if(i){if(i.style.display="block",i.classList.add("active"),i.innerHTML.includes("fire-tab-loading")||i.innerHTML.includes("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644"))try{const s=await(async n=>typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(n(),1e4,"Timeout: renderTabContent took too long"):await n())(()=>this.renderTabContent(e));i.innerHTML=s||'<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(i)}catch(t){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 ${e}:`,t),i.innerHTML='<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(i)}}else{const a=document.getElementById("fire-tab-content");if(a){const t=document.createElement("div");t.id=`fire-tab-${e}`,t.className="fire-tab-content active";const s='<div class="fire-tab-loading"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';t.innerHTML=s,a.appendChild(t);try{const n=(r,c,f)=>{const d=new Promise((p,u)=>{setTimeout(()=>{u(new Error(f||`Timeout: \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0627\u0633\u062A\u063A\u0631\u0642\u062A \u0623\u0643\u062B\u0631 \u0645\u0646 ${c}ms`))},c)});return Promise.race([r,d])},l=await(async r=>typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(r(),1e4,"Timeout: renderTabContent took too long"):await n(r(),1e4,"Timeout: renderTabContent took too long"))(()=>this.renderTabContent(e));t.innerHTML=l||'<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(t)}catch(n){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 ${e}:`,n),t.innerHTML='<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(t)}}}if(this.state.currentTab=e,e==="database"){this.renderAssets();const a=this.getAssets();(!a||a.length===0)&&this.loadFireEquipmentDataAsync().then(()=>{this.state.currentTab==="database"&&this.renderAssets()}).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",t)})}else if(e==="register"){await this.refreshRegisterTable();const a=this.getAssets();(!a||a.length===0)&&this.loadFireEquipmentDataAsync().then(()=>{this.state.currentTab==="register"&&this.refreshRegisterTable()}).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",t)})}else if(e==="inspections"){const a=this.getMonthlyInspections(),t=document.getElementById("inspections-completed"),s=document.getElementById("inspections-needs-repair"),n=document.getElementById("inspections-out-of-service"),o=document.getElementById("inspections-total");t&&(t.textContent=a.completed),s&&(s.textContent=a.needsRepair),n&&(n.textContent=a.outOfService),o&&(o.textContent=a.total);const l=document.getElementById("monthly-inspections-table");l&&(l.innerHTML=this.renderMonthlyInspectionsTable(a.list));const r=this.getInspections();(!r||r.length===0)&&this.loadFireEquipmentDataAsync().then(()=>{if(this.state.currentTab==="inspections"){const c=this.getMonthlyInspections(),f=document.getElementById("inspections-completed"),d=document.getElementById("inspections-needs-repair"),p=document.getElementById("inspections-out-of-service"),u=document.getElementById("inspections-total"),g=document.getElementById("monthly-inspections-table");f&&(f.textContent=c.completed),d&&(d.textContent=c.needsRepair),p&&(p.textContent=c.outOfService),u&&(u.textContent=c.total),g&&(g.innerHTML=this.renderMonthlyInspectionsTable(c.list))}}).catch(c=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A:",c)})}else if(e==="analytics")this.renderAnalyticsData();else if(e==="approval-requests"){const a=document.getElementById("fire-tab-approval-requests");if(a){const t=await this.renderApprovalRequestsTab();a.innerHTML=t,this.setupApprovalRequestsEventListeners();const s=this.getApprovalRequests();(!s||s.length===0)&&this.loadApprovalRequestsFromBackend().then(async()=>{if(this.state.currentTab==="approval-requests"){const n=await this.renderApprovalRequestsTab();a.innerHTML=n,this.setupApprovalRequestsEventListeners()}}).catch(n=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",n)})}}this.setupTabEventListeners(e)},async loadFireEquipmentDataAsync(){try{const[e,i,a]=await Promise.allSettled([GoogleIntegration.sendRequest({action:"getAllFireEquipmentAssets",data:{}}).catch(o=>{const l=o.message||o.toString()||"";return l.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||l.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0635\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",o),{success:!1,data:[]})}),GoogleIntegration.sendRequest({action:"getAllFireEquipmentInspections",data:{}}).catch(o=>{const l=o.message||o.toString()||"";return l.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||l.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",o),{success:!1,data:[]})}),GoogleIntegration.sendRequest({action:"getFireEquipmentApprovalRequests",data:{}}).catch(o=>{const l=o.message||o.toString()||"";return l.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||l.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",o),{success:!1,data:[]})})]);let t=!1,s=!1;if(e.status==="fulfilled"&&e.value&&e.value.success&&Array.isArray(e.value.data)){AppState.appData.fireEquipmentAssets||(AppState.appData.fireEquipmentAssets=[]);const o=AppState.appData.fireEquipmentAssets||[],l=e.value.data,r=new Map;o.forEach(c=>{c.id&&r.set(c.id,c)}),l.forEach(c=>{c.id&&r.set(c.id,c)}),AppState.appData.fireEquipmentAssets=Array.from(r.values()),t=!0,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${e.value.data.length} \u062C\u0647\u0627\u0632 \u0645\u0646 Google Sheets (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentAssets.length})`)}if(i.status==="fulfilled"&&i.value&&i.value.success&&Array.isArray(i.value.data)){AppState.appData.fireEquipmentInspections||(AppState.appData.fireEquipmentInspections=[]);const o=AppState.appData.fireEquipmentInspections||[],l=i.value.data,r=new Map;o.forEach(c=>{c.id&&r.set(c.id,c)}),l.forEach(c=>{c.id&&r.set(c.id,c)}),AppState.appData.fireEquipmentInspections=Array.from(r.values()),s=!0,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${i.value.data.length} \u0641\u062D\u0635 \u0645\u0646 Google Sheets (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentInspections.length})`)}if(a.status==="fulfilled"&&a.value&&a.value.success&&Array.isArray(a.value.data)){AppState.appData.fireEquipmentApprovalRequests||(AppState.appData.fireEquipmentApprovalRequests=[]);const o=AppState.appData.fireEquipmentApprovalRequests||[],l=a.value.data,r=new Map;o.forEach(c=>{c.id&&r.set(c.id,c)}),l.forEach(c=>{c.id&&r.set(c.id,c)}),AppState.appData.fireEquipmentApprovalRequests=Array.from(r.values()),localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(AppState.appData.fireEquipmentApprovalRequests)),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${a.value.data.length} \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 Backend (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentApprovalRequests.length})`)}const n=this.state.currentTab;if(n==="database")this.renderAssets();else if(n==="register"&&(t||s))this.state.currentTab==="register"&&await this.refreshRegisterTable();else if(n==="inspections"&&s&&this.state.currentTab==="inspections"){const o=this.getMonthlyInspections(),l=document.getElementById("inspections-completed"),r=document.getElementById("inspections-needs-repair"),c=document.getElementById("inspections-out-of-service"),f=document.getElementById("inspections-total");l&&(l.textContent=o.completed),r&&(r.textContent=o.needsRepair),c&&(c.textContent=o.outOfService),f&&(f.textContent=o.total);const d=document.getElementById("monthly-inspections-table");d&&(d.innerHTML=this.renderMonthlyInspectionsTable(o.list))}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(e){const i=e.message||e.toString()||"";Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0645\u0646 Google Sheets:",e),(i.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||i.includes("timeout"))&&Notification.warning({title:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",message:"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629.",duration:5e3,persistent:!1})}},renderTabContentSync(e){const i=`
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
                        ${i}
                        <div id="fire-assets-container" style="display: none;"></div>
                    </div>
                </div>
            `:i},async hideLoadingAndShowContent(){const e=this.state.currentTab,i=document.getElementById(`fire-tab-${e}`);if(i){const a=i.querySelector(".fire-tab-loading");a&&(a.style.display="none");try{const t=await this.renderTabContent(e);t&&(i.innerHTML=t,this.setupTabEventListeners(e))}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",t)}}},async renderTabContent(e){return e==="database"?await this.renderDatabaseTab():e==="register"?await this.renderRegisterTab():e==="inspections"?await this.renderInspectionsTab():e==="analytics"?await this.renderAnalyticsTab():e==="approval-requests"?await this.renderApprovalRequestsTab():""},async renderDatabaseTab(){return`
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
        `},renderRegisterStatisticsCards(){const e=this.getRegisterStatistics(),i=a=>e.total?Math.round((Number(a)||0)/e.total*100):0;return`
            <div class="fire-stat-grid">
                <div class="fire-stat fire-stat--blue">
                    <div class="fire-stat__icon"><i class="fas fa-fire-extinguisher"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</span>
                        <span class="fire-stat__value" id="register-stat-total">${e.total}</span>
                        <span class="fire-stat__sub">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${i(e.total)}%"></span></div>
                </div>

                <div class="fire-stat fire-stat--green">
                    <div class="fire-stat__icon"><i class="fas fa-check-circle"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0635\u0627\u0644\u062D\u0629</span>
                        <span class="fire-stat__value" id="register-stat-operational">${e.operational}</span>
                        <span class="fire-stat__sub">\u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0641\u0648\u0631\u064A</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${i(e.operational)}%"></span></div>
                </div>

                <div class="fire-stat fire-stat--amber">
                    <div class="fire-stat__icon"><i class="fas fa-tools"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u062A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</span>
                        <span class="fire-stat__value" id="register-stat-needs-maintenance">${e.needsMaintenance}</span>
                        <span class="fire-stat__sub">\u062A\u062A\u0637\u0644\u0628 \u0645\u062A\u0627\u0628\u0639\u0629 \u0648\u0625\u0635\u0644\u0627\u062D</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${i(e.needsMaintenance)}%"></span></div>
                </div>

                <div class="fire-stat fire-stat--red">
                    <div class="fire-stat__icon"><i class="fas fa-ban"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</span>
                        <span class="fire-stat__value" id="register-stat-out-of-service">${e.outOfService}</span>
                        <span class="fire-stat__sub">\u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${i(e.outOfService)}%"></span></div>
                </div>
            </div>
        `},updateRegisterStatisticsCards(){this.ensureData();const e=this.getRegisterStatistics(),i=document.getElementById("register-stat-total"),a=document.getElementById("register-stat-operational"),t=document.getElementById("register-stat-needs-maintenance"),s=document.getElementById("register-stat-out-of-service");i&&(i.textContent=e.total),a&&(a.textContent=e.operational),t&&(t.textContent=e.needsMaintenance),s&&(s.textContent=e.outOfService)},async renderRegisterTab(){this.ensureData();const e=this.getAssets(),i=e&&e.length>0;let a="";return i?a=this.renderRegisterTable():a=`
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
                    ${a}
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
                    <tbody>${e.map(a=>{const t=this.getStatusBadge(a.status),s=a.manufacturingYear||"-";return`
                <tr>
                    <td>${Utils.escapeHTML(a.factoryName||a.factory||"-")}</td>
                    <td>${Utils.escapeHTML(a.subLocationName||a.subLocation||"-")}</td>
                    <td>${Utils.escapeHTML(a.location||"-")}</td>
                    <td>${Utils.escapeHTML(a.type||"-")}</td>
                    <td>${Utils.escapeHTML(a.capacity||a.capacityKg||"-")}</td>
                    <td>${Utils.escapeHTML(a.siteNumber||a.number||"-")}</td>
                    <td>${Utils.escapeHTML(a.manufacturer||"-")}</td>
                    <td>${Utils.escapeHTML(s)}</td>
                    <td>${Utils.escapeHTML(a.serialNumber||"-")}</td>
                    <td>${t}</td>
                    <td style="word-wrap: break-word; max-width: 120px;">${Utils.escapeHTML(a.installationMethod||"-")}</td>
                    <td>
                        <div class="flex flex-wrap gap-2" style="min-width: 150px;">
                            <button class="btn-icon btn-icon-primary" data-action="view-details" data-id="${a.id}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-icon-secondary" data-action="print-qr" data-id="${a.id}" title="\u0637\u0628\u0627\u0639\u0629 QR">
                                <i class="fas fa-qrcode"></i>
                            </button>
                            ${this.canEdit()?`
                            <button class="btn-icon btn-icon-warning" data-action="edit-device" data-id="${a.id}" title="\u062A\u0639\u062F\u064A\u0644">
                                <i class="fas fa-edit"></i>
                            </button>
                            `:""}
                            ${this.canDelete()?`
                            <button class="btn-icon btn-icon-danger" data-action="delete-device" data-id="${a.id}" title="\u062D\u0630\u0641">
                                <i class="fas fa-trash"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                    <td style="word-wrap: break-word; max-width: 200px; white-space: normal;">${Utils.escapeHTML(a.notes||"-")}</td>
                </tr>
            `}).join("")}</tbody>
                    <tfoot style="display: none;"></tfoot>
                </table>
            </div>
        `},async renderInspectionsTab(){this.ensureData();const e=this.getInspections()||[],i=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="pending"||!r.approvalStatus&&r.submittedBy&&String(r.submittedBy).includes("Public")).length,a=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="approved").length,t=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="rejected").length,s=e.filter(r=>r.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,n=e.filter(r=>r.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length,o=this.state.inspectionApprovalFilter||"all";let l=e;return o==="pending"?l=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="pending"||!r.approvalStatus&&r.submittedBy&&String(r.submittedBy).includes("Public")):o==="approved"?l=e.filter(r=>String(r.approvalStatus||"").toLowerCase()==="approved"||r.status==="\u0635\u0627\u0644\u062D"):o==="needsRepair"?l=e.filter(r=>r.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"):o==="outOfService"&&(l=e.filter(r=>r.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"||String(r.approvalStatus||"").toLowerCase()==="rejected")),`
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
                            <h3 id="inspections-completed" style="font-size: 1.85rem; font-weight: 800; color: #065f46; margin: 0; line-height: 1.1;">${a||e.filter(r=>r.status==="\u0635\u0627\u0644\u062D").length}</h3>
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
                            <h3 id="inspections-needs-repair" style="font-size: 1.85rem; font-weight: 800; color: #92400e; margin: 0; line-height: 1.1;">${s}</h3>
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
                            <h3 id="inspections-out-of-service" style="font-size: 1.85rem; font-weight: 800; color: #991b1b; margin: 0; line-height: 1.1;">${n}</h3>
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
                        \u23F3 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F (${i})
                    </button>
                    <button class="btn ${o==="approved"?"btn-primary":"btn-secondary"}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('approved')">
                        \u2705 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 (${a})
                    </button>
                    <button class="btn ${o==="needsRepair"?"btn-primary":"btn-secondary"}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('needsRepair')">
                        \u{1F7E1} \u062A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629 (${s})
                    </button>
                    <button class="btn ${o==="outOfService"?"btn-primary":"btn-secondary"}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('outOfService')">
                        \u{1F534} \u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629 (${n})
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
        `},async filterInspectionsByApproval(e){this.state.inspectionApprovalFilter=e;const i=document.getElementById("fire-tab-content");i&&(i.innerHTML=await this.renderInspectionsTab(),this.setupEventListeners())},async refreshRegisterTable(){this.ensureData(),this.updateRegisterStatisticsCards();const e=document.getElementById("fire-register-table");if(!e)return;const i=this.getAssets();!i||i.length===0?e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F\u060C \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629.</p></div>':(e.innerHTML=this.renderRegisterTable(),e.dataset.eventsBound="false",this.bindRegisterTableEvents(e))},async refreshCurrentTab(e=!1){if(this.state.currentTab==="database")this.renderAssets();else if(this.state.currentTab==="register")await this.refreshRegisterTable();else if(this.state.currentTab==="inspections"){const i=this.getMonthlyInspections(),a=document.getElementById("inspections-completed"),t=document.getElementById("inspections-needs-repair"),s=document.getElementById("inspections-out-of-service"),n=document.getElementById("inspections-total");a&&(a.textContent=i.completed),t&&(t.textContent=i.needsRepair),s&&(s.textContent=i.outOfService),n&&(n.textContent=i.total);const o=document.getElementById("monthly-inspections-table");o&&(o.innerHTML=this.renderMonthlyInspectionsTable(i.list))}else this.renderAssets()},getMonthlyInspections(){const e=new Date,i=new Date(e.getFullYear(),e.getMonth(),1),a=new Date(e.getFullYear(),e.getMonth()+1,0,23,59,59),t=this.getInspections().filter(s=>{const n=new Date(s.checkDate||s.createdAt);return n>=i&&n<=a}).sort((s,n)=>{const o=new Date(s.checkDate||s.createdAt);return new Date(n.checkDate||n.createdAt)-o});return{list:t,total:t.length,completed:t.filter(s=>s.status==="\u0635\u0627\u0644\u062D").length,needsRepair:t.filter(s=>s.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:t.filter(s=>s.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length}},getApprovalBadge(e,i){const a=String(e||"").toLowerCase();return a==="approved"?'<span class="badge" style="background:#dcfce7; color:#166534; border:1px solid #bbf7d0; font-weight:700; padding:3px 8px; border-radius:6px; font-size:0.8rem;"><i class="fas fa-check-circle ml-1 text-emerald-600"></i> \u0645\u0639\u062A\u0645\u062F</span>':a==="rejected"?'<span class="badge" style="background:#fee2e2; color:#991b1b; border:1px solid #fecaca; font-weight:700; padding:3px 8px; border-radius:6px; font-size:0.8rem;"><i class="fas fa-times-circle ml-1 text-red-600"></i> \u0645\u0631\u0641\u0648\u0636</span>':'<span class="badge" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a; font-weight:700; padding:3px 8px; border-radius:6px; font-size:0.8rem;"><i class="fas fa-clock ml-1 text-amber-600"></i> \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</span>'},renderMonthlyInspectionsTable(e){return!e||e.length===0?'<div class="empty-state" style="padding: 30px; text-align: center;"><i class="fas fa-clipboard-check text-4xl text-gray-300 mb-2"></i><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u062A\u062D\u062F\u064A\u062F</p></div>':`
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
                    <tbody>${e.map(a=>{const t=this.getAssets().find(c=>c.id===a.assetId),s=t?`${t.number||t.id} - ${t.location||""}`:a.assetId,n=this.getStatusBadge(a.status),o=this.getApprovalBadge(a.approvalStatus,a.submittedBy),l=a.checkDate?Utils.formatDate(a.checkDate):"-",r=String(a.approvalStatus||"").toLowerCase()==="pending"||!a.approvalStatus&&a.submittedBy&&String(a.submittedBy).includes("Public");return`
                <tr>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(s)}</div>
                        <div class="text-xs text-gray-400" style="direction: ltr; text-align: right;">ID: ${Utils.escapeHTML(a.assetId||"-")}</div>
                    </td>
                    <td>${l}</td>
                    <td>
                        <div class="font-medium text-gray-800">${Utils.escapeHTML(a.inspector||"-")}</div>
                        ${a.submittedBy?'<div class="text-xs text-gray-400">\u0628\u0648\u0627\u0628\u0629 \u0639\u0627\u0645\u0629</div>':""}
                    </td>
                    <td>${n}</td>
                    <td>${o}</td>
                    <td style="word-wrap: break-word; max-width: 180px; white-space: normal; font-size: 0.85rem;">
                        ${Utils.escapeHTML(a.remarks||"-")}
                    </td>
                    <td>
                        <div style="display: flex; gap: 4px; align-items: center;">
                            <button class="btn-icon btn-icon-primary" onclick="FireEquipment.viewInspection('${a.id}')" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0643\u0627\u0645\u0644\u0629">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${r?`
                                <button class="btn-icon" style="color: #16a34a; background: #f0fdf4; border: 1px solid #bbf7d0;" onclick="FireEquipment.approveInspection('${a.id}')" title="\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0641\u062D\u0635 \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn-icon" style="color: #dc2626; background: #fef2f2; border: 1px solid #fecaca;" onclick="FireEquipment.rejectInspection('${a.id}')" title="\u0631\u0641\u0636 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A">
                                    <i class="fas fa-times"></i>
                                </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}</tbody>
                </table>
            </div>
        `},viewInspection(e){const i=this.getInspections().find(l=>l.id===e);if(!i){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0635");return}const a=this.getAssets().find(l=>l.id===i.assetId),t=a?`${a.number||a.id} - ${a.location||""}`:i.assetId,s=String(i.approvalStatus||"").toLowerCase()==="pending"||!i.approvalStatus&&i.submittedBy&&String(i.submittedBy).includes("Public");let n=[];if(i.attachments)try{n=typeof i.attachments=="string"?JSON.parse(i.attachments):i.attachments}catch{}const o=document.createElement("div");o.className="modal-overlay fire-modal",o.innerHTML=`
            <div class="modal-content" style="max-width: 720px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(220, 38, 38, 0.2); border: 1px solid rgba(220, 38, 38, 0.4); display: flex; align-items: center; justify-content: center; color: #f87171;">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 2px 0;">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A</h2>
                            <p style="font-size: 0.8rem; color: #94a3b8; margin: 0;">\u0643\u0648\u062F \u0627\u0644\u0641\u062D\u0635: ${Utils.escapeHTML(i.id)}</p>
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
                        <div>${this.getApprovalBadge(i.approvalStatus,i.submittedBy)}</div>
                    </div>

                    <div class="space-y-4" style="background: #ffffff; padding: 18px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u062C\u0647\u0627\u0632 \u0648\u0627\u0644\u0645\u0648\u0642\u0639:</label>
                                <p class="text-gray-900 font-bold mt-1">${Utils.escapeHTML(t)}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0643\u0648\u062F \u0627\u0644\u0623\u0635\u0644 (DeviceID):</label>
                                <p class="text-gray-900 font-bold mt-1" style="direction: ltr; text-align: right;">${Utils.escapeHTML(i.assetId||"-")}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635:</label>
                                <p class="text-gray-800 mt-1">${i.checkDate?Utils.formatDate(i.checkDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0645\u0633\u0624\u0648\u0644 / \u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629:</label>
                                <p class="text-gray-800 font-bold mt-1">${Utils.escapeHTML(i.inspector||"-")}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0644\u0644\u062C\u0647\u0627\u0632:</label>
                                <p class="mt-1">${this.getStatusBadge(i.status)}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0645\u0624\u0634\u0631 \u0639\u062F\u0627\u062F \u0627\u0644\u0636\u063A\u0637:</label>
                                <p class="text-gray-800 mt-1">${Utils.escapeHTML(i.gaugeReading||"\u0633\u0644\u064A\u0645")}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0635\u0645\u0627\u0645 \u0648\u062A\u064A\u0644\u0629 \u0627\u0644\u0623\u0645\u0627\u0646:</label>
                                <p class="text-gray-800 font-bold mt-1">${Utils.escapeHTML(i.sealIntact===!0?"\u0633\u0644\u064A\u0645":i.sealIntact===!1?"\u0645\u0643\u0633\u0648\u0631":i.sealIntact||"\u0633\u0644\u064A\u0645")}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u062E\u0631\u0637\u0648\u0645 \u0648\u0627\u0644\u0642\u0627\u0630\u0641 / \u062C\u0633\u0645 \u0627\u0644\u0623\u0633\u0637\u0648\u0627\u0646\u0629:</label>
                                <p class="text-gray-800 mt-1">${Utils.escapeHTML(i.hoseCondition||i.bodyCondition||"\u0633\u0644\u064A\u0645")}</p>
                            </div>
                        </div>

                        ${i.remarks?`
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                            <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629:</label>
                            <p class="text-gray-800 mt-1 bg-gray-50 p-2 rounded">${Utils.escapeHTML(i.remarks)}</p>
                        </div>`:""}

                        ${i.actions?`
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                            <label class="text-xs font-semibold text-gray-500">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629:</label>
                            <p class="text-gray-800 mt-1 bg-gray-50 p-2 rounded">${Utils.escapeHTML(i.actions)}</p>
                        </div>`:""}

                        <!-- \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F -->
                        ${i.approvedBy?`
                        <div style="border-top: 1px solid #dcfce7; background: #f0fdf4; padding: 10px 14px; border-radius: 8px; margin-top: 10px;">
                            <span class="text-xs font-bold text-green-800">\u2705 \u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0648\u0627\u0633\u0637\u0629:</span>
                            <span class="text-xs text-green-900 font-bold mr-1">${Utils.escapeHTML(i.approvedBy)}</span>
                            ${i.approvedAt?`<span class="text-xs text-green-700">\u0628\u062A\u0627\u0631\u064A\u062E (${Utils.formatDate(i.approvedAt)})</span>`:""}
                        </div>`:""}

                        ${i.rejectedBy?`
                        <div style="border-top: 1px solid #fee2e2; background: #fef2f2; padding: 10px 14px; border-radius: 8px; margin-top: 10px;">
                            <span class="text-xs font-bold text-red-800">\u274C \u062A\u0645 \u0627\u0644\u0631\u0641\u0636 \u0628\u0648\u0627\u0633\u0637\u0629:</span>
                            <span class="text-xs text-red-900 font-bold mr-1">${Utils.escapeHTML(i.rejectedBy)}</span>
                            <p class="text-xs text-red-700 mt-1">\u0627\u0644\u0633\u0628\u0628: ${Utils.escapeHTML(i.reviewNotes||"-")}</p>
                        </div>`:""}

                        <!-- \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629 \u0625\u0646 \u0648\u064F\u062C\u062F\u062A -->
                        ${n&&n.length>0?`
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                            <label class="text-xs font-semibold text-gray-500 mb-2 block">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629 \u0645\u0646 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A:</label>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${n.map(l=>`
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
                        ${s?`
                            <button type="button" class="btn-primary" style="background: #16a34a; display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px;" onclick="FireEquipment.approveInspection('${i.id}', this)">
                                <i class="fas fa-check"></i> \u0627\u0639\u062A\u0645\u0627\u062F \u0648\u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u0637\u0641\u0627\u064A\u0629
                            </button>
                            <button type="button" class="btn-danger" style="background: #dc2626; color:#ffffff; display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; border:none;" onclick="FireEquipment.rejectInspection('${i.id}', this)">
                                <i class="fas fa-times"></i> \u0631\u0641\u0636 \u0627\u0644\u0641\u062D\u0635
                            </button>
                        `:""}
                    </div>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(o)},async approveInspection(e,i){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0646\u062A\u064A\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0641\u062D\u0635 \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0631\u0633\u0645\u064A \u0644\u0644\u0637\u0641\u0627\u064A\u0629\u061F"))try{const t=AppState.currentUser||{},s=t.name||t.fullName||t.userName||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",n=new Date().toISOString(),l=(this.getInspections()||[]).find(r=>r.id===e);if(l&&(l.approvalStatus="approved",l.approvedBy=s,l.approvedAt=n,l.reviewNotes="\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A",l.assetId)){const c=(this.getAssets()||[]).find(f=>f.id===l.assetId);if(c){c.status=l.status||"\u0635\u0627\u0644\u062D",c.lastInspection=l.checkDate||n.split("T")[0];var a=new Date(l.checkDate||Date.now());a.setMonth(a.getMonth()+1),c.nextInspection=a.toISOString().split("T")[0],c.updatedAt=n}}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),document.querySelectorAll(".modal-overlay.fire-modal").forEach(r=>r.remove()),await this.refreshCurrentTab(!0),typeof Notification<"u"&&Notification.success("\u2705 \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0641\u062D\u0635 \u0648\u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u062C\u0647\u0627\u0632 \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0641\u0648\u0631\u0627\u064B"),typeof GoogleIntegration<"u"&&AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendRequest({action:"approveFireEquipmentInspection",data:{inspectionId:e,approverData:{name:s,id:t.id||t.userId||"",role:t.role||"admin"},reviewNotes:"\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A"}}).then(r=>{Utils.safeLog("\u2705 Backend inspection approval sync complete:",r)}).catch(r=>{Utils.safeWarn("\u26A0\uFE0F Background approval sync notice (saved locally):",r)})}catch(t){Utils.safeError("Error in approveInspection:",t),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}},async rejectInspection(e,i){const a=prompt("\u064A\u0631\u062C\u0649 \u0643\u062A\u0627\u0628\u0629 \u0633\u0628\u0628 \u0631\u0641\u0636 \u0647\u0630\u0627 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A (\u0623\u0648 \u0637\u0644\u0628 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0641\u062D\u0635):");if(a!==null)try{const t=AppState.currentUser||{},s=t.name||t.fullName||t.userName||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",n=new Date().toISOString(),l=(this.getInspections()||[]).find(r=>r.id===e);l&&(l.approvalStatus="rejected",l.rejectedBy=s,l.rejectedAt=n,l.reviewNotes=a||"\u0645\u0631\u0641\u0648\u0636 - \u064A\u0644\u0632\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0641\u062D\u0635"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),document.querySelectorAll(".modal-overlay.fire-modal").forEach(r=>r.remove()),await this.refreshCurrentTab(!0),typeof Notification<"u"&&Notification.success("\u2705 \u062A\u0645 \u062A\u0648\u062B\u064A\u0642 \u0631\u0641\u0636 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0641\u0648\u0631\u0627\u064B"),typeof GoogleIntegration<"u"&&AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendRequest({action:"rejectFireEquipmentInspection",data:{inspectionId:e,approverData:{name:s,id:t.id||t.userId||"",role:t.role||"admin"},reason:a||"\u0645\u0631\u0641\u0648\u0636 - \u064A\u0644\u0632\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0641\u062D\u0635"}}).then(r=>{Utils.safeLog("\u2705 Backend inspection rejection sync complete:",r)}).catch(r=>{Utils.safeWarn("\u26A0\uFE0F Background rejection sync notice (saved locally):",r)})}catch(t){Utils.safeError("Error in rejectInspection:",t),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}},async loadAssetsFromBackend(){try{if(!GoogleIntegration||!AppState.googleConfig?.appsScript?.enabled){Utils.safeWarn("\u26A0\uFE0F Backend \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629");return}this.ensureData(),Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u062D\u0631\u064A\u0642 \u0645\u0646 Backend...");const e=await GoogleIntegration.sendRequest({action:"getAllFireEquipmentAssets",data:{}});if(e&&e.success&&Array.isArray(e.data)){const i=AppState.appData.fireEquipmentAssets||[],a=e.data,t=new Map;i.forEach(s=>{s.id&&t.set(s.id,s)}),a.forEach(s=>{s.id&&t.set(s.id,s)}),AppState.appData.fireEquipmentAssets=Array.from(t.values()),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${e.data.length} \u062C\u0647\u0627\u0632 \u0645\u0646 Backend (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentAssets.length})`)}else Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",e?.message)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",e)}},ensureData(){typeof AppState>"u"&&(AppState={}),AppState.appData||(AppState.appData={});const e=AppState.appData;let i=!1;if(Array.isArray(e.fireEquipmentAssets)||(e.fireEquipmentAssets=[]),Array.isArray(e.fireEquipmentInspections)||(e.fireEquipmentInspections=[]),Array.isArray(e.fireEquipment)&&e.fireEquipment.length>0){const a=e.fireEquipment.filter(t=>t.assetId&&(t.checkDate||t.createdAt));a.length>0&&(a.forEach(t=>{e.fireEquipmentInspections.some(n=>n.id===t.id)||e.fireEquipmentInspections.push({id:t.id||Utils.generateId("FEI"),assetId:t.assetId,checkDate:t.checkDate||t.createdAt,inspector:t.inspector||"",status:t.status||"\u0635\u0627\u0644\u062D",gaugeReading:t.gaugeReading||"",sealIntact:typeof t.sealIntact=="boolean"?t.sealIntact:null,remarks:t.remarks||t.notes||"",actions:t.actions||"",createdAt:t.createdAt||new Date().toISOString(),updatedAt:t.updatedAt||new Date().toISOString()})}),i=!0)}if(Array.isArray(e.fireEquipment)&&e.fireEquipment.length>0){const a=new Map,t=new Map;e.fireEquipmentAssets.forEach(r=>{r.id&&a.set(r.id,r),r.number&&a.set(r.number.toLowerCase(),r)}),e.fireEquipmentInspections.forEach(r=>{r.id&&t.set(r.id,r)});const s=new Map,n=new Map,o={\u0635\u0627\u0644\u062D:"\u0635\u0627\u0644\u062D","\u064A\u062D\u062A\u0627\u062C \u0625\u0635\u0644\u0627\u062D":"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629",\u0645\u0639\u0637\u0644:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"};e.fireEquipment.forEach(r=>{const c=String(r.equipmentNumber||r.number||"").trim(),f=c.toLowerCase();let d=f?s.get(f):null;!d&&f&&(d=a.get(f));let p=r.assetId?String(r.assetId):null;if(p&&p.startsWith("FEA_")){const v=a.get(p);v&&v.id.match(/^EFA-\d{4}$/)?p=v.id:p=null}if(!d&&p&&(d=a.get(p)),d)r.equipmentType&&(d.type=r.equipmentType),r.location&&(d.location=r.location),r.manufacturer&&(d.manufacturer=r.manufacturer),r.model&&(d.model=r.model),r.capacity&&(d.capacity=r.capacity),r.installationDate&&(d.installationDate=r.installationDate),(r.checkDate||r.lastServiceDate)&&(d.lastServiceDate=r.checkDate||r.lastServiceDate),r.status&&(d.status=o[r.status]||r.status),r.inspector&&(d.responsible=r.inspector),r.notes&&(d.notes=r.notes),r.updatedAt&&(d.updatedAt=r.updatedAt),n.set(d.id,d);else{const v=p&&p.match(/^EFA-\d{4}$/)?p:this.generateFireDeviceID(),x=this.generateQrData(v),w=o[r.status]||r.status||"\u0635\u0627\u0644\u062D";d={id:v,number:c||v,type:r.equipmentType||"",location:r.location||"",manufacturer:r.manufacturer||"",model:r.model||"",capacity:r.capacity||"",installationDate:r.installationDate||"",lastServiceDate:r.checkDate||r.lastServiceDate||"",status:w,responsible:r.inspector||"",notes:r.notes||"",qrCodeData:x,createdAt:r.createdAt||new Date().toISOString(),updatedAt:r.updatedAt||new Date().toISOString()},f&&s.set(f,d),n.set(d.id,d)}const u=r.id?String(r.id):Utils.generateId("FEI"),g=u.startsWith("FEI")?u:u.replace(/^FIRE_EQUIP/,"FEI"),S=r.checkDate||r.createdAt||new Date().toISOString(),A=o[r.status]||r.status||"\u0635\u0627\u0644\u062D";let m=t.get(g);m?(r.checkDate&&(m.checkDate=r.checkDate),r.inspector&&(m.inspector=r.inspector),r.status&&(m.status=o[r.status]||r.status),r.gaugeReading!==void 0&&(m.gaugeReading=r.gaugeReading),typeof r.sealIntact=="boolean"&&(m.sealIntact=r.sealIntact),r.notes&&(m.remarks=r.notes),r.actions&&(m.actions=r.actions),r.updatedAt&&(m.updatedAt=r.updatedAt)):(m={id:g,assetId:d.id,checkDate:S,inspector:r.inspector||d.responsible||"",status:A,gaugeReading:r.gaugeReading||"",sealIntact:typeof r.sealIntact=="boolean"?r.sealIntact:null,remarks:r.notes||"",actions:r.actions||"",createdAt:r.createdAt||S,updatedAt:r.updatedAt||S},e.fireEquipmentInspections.push(m))});const l=[...e.fireEquipmentAssets];n.forEach((r,c)=>{const f=l.findIndex(d=>d.id===c);f>=0?l[f]=r:l.push(r)}),e.fireEquipmentAssets=l,e.fireEquipment=[],i=!0}return i},getAssets(){return Array.isArray(AppState.appData.fireEquipmentAssets)?AppState.appData.fireEquipmentAssets:[]},getRegisterStatistics(){const e=this.getAssets();return{total:e.length,operational:e.filter(i=>i.status==="\u0635\u0627\u0644\u062D").length,needsMaintenance:e.filter(i=>i.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:e.filter(i=>i.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length}},getInspections(){const e=Array.isArray(AppState.appData.fireEquipmentInspections)?AppState.appData.fireEquipmentInspections:[];return e.length===0&&Array.isArray(AppState.appData.fireEquipment)&&AppState.appData.fireEquipment.length>0?(AppState.appData.fireEquipmentInspections=AppState.appData.fireEquipment,AppState.appData.fireEquipment):e},async renderAssets(){this.refreshFilterOptions(),this.renderSummary();const e=this.getFilteredAssets(),i=document.getElementById("fire-assets-table");i&&(i.innerHTML=this.renderAssetsTable(e),this.bindTableEvents(i));const a=document.getElementById("fire-recent-inspections");a&&(a.innerHTML=this.renderRecentInspections())},refreshFilterOptions(){const e=this.getAssets(),i=document.getElementById("fire-assets-type"),a=document.getElementById("fire-assets-status"),t=document.getElementById("fire-assets-location");if(i){const s=this.state.filters.type,n=Array.from(new Set(e.map(o=>o.type).filter(Boolean)));i.innerHTML=['<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>',...n.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)} (${e.filter(l=>l.type===o).length})</option>`)].join(""),i.value=n.includes(s)?s:"all",this.state.filters.type=i.value}if(a){const s=this.state.filters.status;a.innerHTML=['<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>',...this.statusOptions.map(n=>`<option value="${n.value}">${n.label} (${e.filter(o=>o.status===n.value).length})</option>`)].join(""),a.value=this.statusOptions.some(n=>n.value===s)?s:"all",this.state.filters.status=a.value}if(t){const s=this.state.filters.location,n=Array.from(new Set(e.map(o=>o.location).filter(Boolean)));t.innerHTML=['<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>',...n.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)} (${e.filter(l=>l.location===o).length})</option>`)].join(""),t.value=n.includes(s)?s:"all",this.state.filters.location=t.value}},renderSummary(){const e=this.getAssets(),i=this.getFilteredAssets(),a=this.getAssetStatsForList(i),t=Math.max(i.length,1),s=(u,g)=>{const S=document.getElementById(u);S&&S.style.setProperty("--fs-pct",`${Math.round((Number(g)||0)/t*100)}%`)},n=document.getElementById("fire-summary-total"),o=document.getElementById("fire-summary-active"),l=document.getElementById("fire-summary-maintenance"),r=document.getElementById("fire-summary-out");n&&(n.textContent=i.length),o&&(o.textContent=a.active),l&&(l.textContent=a.needsMaintenance),r&&(r.textContent=a.outOfService),s("fire-bar-total",i.length),s("fire-bar-active",a.active),s("fire-bar-maintenance",a.needsMaintenance),s("fire-bar-out",a.outOfService);const c=!!(this.state.filters.search||this.state.filters.type!=="all"||this.state.filters.status!=="all"||this.state.filters.location!=="all"),f=document.getElementById("fire-results-text");f&&(f.textContent=c?`${i.length} \u0645\u0646 \u0623\u0635\u0644 ${e.length} \u062C\u0647\u0627\u0632`:`\u0639\u0631\u0636 ${i.length} \u062C\u0647\u0627\u0632`);const d=document.getElementById("fire-results-chip");d&&d.classList.toggle("is-filtered",c);const p=document.getElementById("fire-clear-filters");p&&p.classList.toggle("visible",c),document.querySelectorAll("#fire-status-chips .fire-chip").forEach(u=>{u.classList.toggle("active",u.dataset.status===(this.state.filters.status||"all"))})},getAssetStatsForList(e){e=e||[];const i=e.length,a=e.filter(n=>n.status==="\u0635\u0627\u0644\u062D").length,t=e.filter(n=>n.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,s=e.filter(n=>n.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length;return{total:i,active:a,needsMaintenance:t,outOfService:s}},renderAssetsTable(e){return e.length?`
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
                    <tbody>${e.map(a=>{const t=this.getLatestInspection(a.id),s=t?Utils.formatDate(t.checkDate):"-",n=this.getStatusBadge(a.status);return`
                <tr>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(a.number||"-")}</div>
                        <div class="text-xs text-gray-400">${Utils.escapeHTML(a.model||"")}</div>
                    </td>
                    <td>${Utils.escapeHTML(a.type||"")}</td>
                    <td>${Utils.escapeHTML(a.location||"")}</td>
                    <td>${n}</td>
                    <td>${s}</td>
                    <td>
                        <div class="flex flex-wrap gap-2">
                            <button class="btn-icon btn-icon-primary" data-action="view" data-id="${a.id}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-icon-secondary" data-action="qr" data-id="${a.id}" title="\u0637\u0628\u0627\u0639\u0629 QR Code">
                                <i class="fas fa-qrcode"></i>
                            </button>
                            ${this.canEdit()?`
                            <button class="btn-icon btn-icon-warning" data-action="edit" data-id="${a.id}" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062C\u0647\u0627\u0632">
                                <i class="fas fa-edit"></i>
                            </button>
                            `:""}
                            ${this.canDelete()?`
                            <button class="btn-icon btn-icon-danger" data-action="delete" data-id="${a.id}" title="\u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632">
                                <i class="fas fa-trash"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}</tbody>
                </table>
            </div>
        `:'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F\u060C \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629.</p></div>'},renderRecentInspections(){const e=this.getInspections().slice().sort((a,t)=>new Date(t.checkDate||t.createdAt||0)-new Date(a.checkDate||a.createdAt||0)).slice(0,6);return e.length?`<div class="divide-y divide-gray-100">${e.map(a=>{const t=this.getAssets().find(n=>n.id===a.assetId),s=t?t.number:a.assetId;return`
                <div class="border-b border-gray-100 py-3 last:border-b-0">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="font-semibold text-gray-800">${Utils.escapeHTML(s||"-")}</p>
                            <p class="text-xs text-gray-500">${Utils.formatDate(a.checkDate)}</p>
                        </div>
                        <div>${this.getStatusBadge(a.status)}</div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">\u0627\u0644\u0645\u0641\u062A\u0634: ${Utils.escapeHTML(a.inspector||"-")}</p>
                </div>
            `}).join("")}</div>`:'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0645\u0624\u062E\u0631\u0627\u064B.</p></div>'},getStatusBadge(e){const i=e||"";let a="badge-info";return i==="\u0635\u0627\u0644\u062D"?a="badge-success":i==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?a="badge-warning":i==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&(a="badge-danger"),`<span class="badge ${a}">${Utils.escapeHTML(i||"-")}</span>`},bindTableEvents(e){!e||e.dataset.eventsBound==="true"||(e.addEventListener("click",async i=>{const a=i.target.closest("[data-action]");if(!a)return;i.preventDefault();const t=a.dataset.action,s=a.dataset.id;switch(t){case"view":this.viewAsset(s);break;case"qr":this.printQr(s);break;case"edit":await this.showAssetForm(this.getAssets().find(n=>n.id===s)||null);break;case"delete":await this.deleteAsset(s);break;default:break}}),e.dataset.eventsBound="true")},setupEventListeners(){const e=document.getElementById("add-fire-asset-btn");e&&e.addEventListener("click",async()=>await this.showAssetForm());const i=document.getElementById("public-fire-link-btn");i&&i.addEventListener("click",()=>this.showPublicLinkModal());const a=document.getElementById("batch-print-qr-btn");a&&a.addEventListener("click",()=>this.showBatchPrintQrModal());const t=document.getElementById("scan-qr-inspection-btn");t&&t.addEventListener("click",()=>this.startQRScan());const s=document.getElementById("mobile-scan-qr-btn");s&&s.addEventListener("click",()=>this.startQRScan());const n=document.getElementById("refresh-fire-equipment-btn");n&&n.addEventListener("click",async()=>{try{const o=n.innerHTML;n.disabled=!0,n.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B...',await this.loadFireEquipmentDataAsync(),await this.refreshCurrentTab(),n.disabled=!1,n.innerHTML=o,typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",o),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),n.disabled=!1,n.innerHTML='<i class="fas fa-sync-alt ml-2"></i>\u062A\u062D\u062F\u064A\u062B'}}),this.setupTabEventListeners(this.state.currentTab)},bindRegisterTableEvents(e){!e||e.dataset.eventsBound==="true"||(e.addEventListener("click",async i=>{const a=i.target.closest("[data-action]");if(!a)return;i.preventDefault();const t=a.dataset.action,s=a.dataset.id;switch(t){case"view-details":this.viewAsset(s);break;case"print-qr":this.printQr(s);break;case"edit-device":await this.showAssetForm(this.getAssets().find(n=>n.id===s)||null);break;case"delete-device":await this.deleteAsset(s);break;default:break}}),e.dataset.eventsBound="true")},setupTabEventListeners(e){if(e==="database"){const i=document.getElementById("fire-assets-search");if(i){const l=i.cloneNode(!0);i.parentNode.replaceChild(l,i),l.addEventListener("input",()=>this.applyFilters())}const a=document.getElementById("fire-assets-type");if(a){const l=a.cloneNode(!0);a.parentNode.replaceChild(l,a),l.addEventListener("change",()=>this.applyFilters())}const t=document.getElementById("fire-assets-status");if(t){const l=t.cloneNode(!0);t.parentNode.replaceChild(l,t),l.addEventListener("change",()=>this.applyFilters())}const s=document.getElementById("fire-assets-location");if(s){const l=s.cloneNode(!0);s.parentNode.replaceChild(l,s),l.addEventListener("change",()=>this.applyFilters())}const n=document.getElementById("fire-status-chips");if(n){const l=n.cloneNode(!0);n.parentNode.replaceChild(l,n),l.addEventListener("click",r=>{const c=r.target.closest(".fire-chip");if(!c)return;this.state.filters.status=c.dataset.status||"all";const f=document.getElementById("fire-assets-status");f&&(f.value=this.state.filters.status),this.applyFilters()})}const o=document.getElementById("fire-clear-filters");if(o){const l=o.cloneNode(!0);o.parentNode.replaceChild(l,o),l.addEventListener("click",()=>{this.state.filters={search:"",type:"all",status:"all",location:"all"};const r=document.getElementById("fire-assets-search");r&&(r.value="");const c=document.getElementById("fire-assets-type");c&&(c.value="all");const f=document.getElementById("fire-assets-status");f&&(f.value="all");const d=document.getElementById("fire-assets-location");d&&(d.value="all"),this.renderAssets(),typeof Notification<"u"&&Notification.info&&Notification.info("\u062A\u0645\u062A \u0625\u0632\u0627\u0644\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631")})}}else if(e==="inspections"){const i=document.getElementById("new-inspection-btn");if(i){const t=i.cloneNode(!0);i.parentNode.replaceChild(t,i),t.addEventListener("click",()=>{this.startQRScan()})}const a=document.getElementById("mobile-scan-qr-btn");if(a){const t=a.cloneNode(!0);a.parentNode.replaceChild(t,a),t.addEventListener("click",()=>{this.startQRScan()})}}else if(e==="register"){const i=document.getElementById("fire-register-table");i&&this.bindRegisterTableEvents(i);const a=document.getElementById("register-add-device-btn");if(a){const l=a.cloneNode(!0);a.parentNode.replaceChild(l,a),l.addEventListener("click",async()=>{await this.showAssetForm()})}const t=document.getElementById("register-batch-print-qr-btn");if(t){const l=t.cloneNode(!0);t.parentNode.replaceChild(l,t),l.addEventListener("click",()=>{this.showBatchPrintQrModal()})}const s=document.getElementById("register-import-excel-btn");if(s){const l=s.cloneNode(!0);s.parentNode.replaceChild(l,s),l.addEventListener("click",()=>{this.showImportExcelModal()})}const n=document.getElementById("register-export-excel-btn");if(n){const l=n.cloneNode(!0);n.parentNode.replaceChild(l,n),l.addEventListener("click",()=>{this.exportToExcel()})}const o=document.getElementById("register-export-pdf-btn");if(o){const l=o.cloneNode(!0);o.parentNode.replaceChild(l,o),l.addEventListener("click",()=>{this.exportRegisterToPDF()})}}else e==="analytics"?this.setupAnalyticsEventListeners():e==="approval-requests"&&this.setupApprovalRequestsEventListeners()},applyFilters(){const e=document.getElementById("fire-assets-search"),i=document.getElementById("fire-assets-type"),a=document.getElementById("fire-assets-status"),t=document.getElementById("fire-assets-location");this.state.filters.search=(e?.value||"").trim().toLowerCase(),this.state.filters.type=i?i.value:"all",this.state.filters.status=a?a.value:"all",this.state.filters.location=t?t.value:"all",this.renderAssets()},getFilteredAssets(){const e=this.state.filters;return this.getAssets().filter(i=>{const a=e.search,t=!a||[i.number,i.type,i.location,i.manufacturer,i.responsible].some(l=>String(l||"").toLowerCase().includes(a)),s=e.type==="all"||i.type===e.type,n=e.status==="all"||i.status===e.status,o=e.location==="all"||i.location===e.location;return t&&s&&n&&o})},async showAssetForm(e=null){const i=!!e;if(i&&!this.canEdit()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0623\u062C\u0647\u0632\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0639\u062F\u064A\u0644.");return}if(!i&&!this.canAdd()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u062C\u0647\u0632\u0629 \u062C\u062F\u064A\u062F\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.");return}const a=e?.id||this.generateFireDeviceID();typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=document.createElement("div");t.className="modal-overlay fire-modal",t.innerHTML=`
            <div class="modal-content" style="max-width: 760px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${i?"\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0627\u0632":"\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u0625\u0637\u0641\u0627\u0621 \u062C\u062F\u064A\u062F"}</h2>
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
                                    ${(()=>{const o=e?.factoryId||e?.factory||"";return this.getPlaceOptions(o).map(r=>{const c=e&&(e.subLocationId===r.id||e.subLocationId===String(r.id)||e.subLocation===r.id&&!e.subLocationId||e.subLocation===r.name);return`<option value="${r.id}" ${c?"selected":""}>${Utils.escapeHTML(r.name)}</option>`}).join("")})()}
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
                                <i class="fas fa-save ml-2"></i>${i?"\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062C\u0647\u0627\u0632"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(t);const s=t.querySelector("#fire-asset-form");s.addEventListener("submit",async o=>{o.preventDefault();const l=s?.querySelector('button[type="submit"]');if(l&&l.disabled)return;let r="";l&&(r=l.innerHTML,l.disabled=!0,l.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const c=new Date().toISOString(),f=this.getAssets(),d=f.findIndex(y=>y.id===a),p=document.getElementById("asset-type").value.trim();p&&!this.assetTypes.includes(p)&&this.assetTypes.push(p);const u=y=>{const E=document.getElementById(y);return E?E.value.trim():""},g=y=>{const E=document.getElementById(y);return E?E.value.trim():null},S=u("asset-factory"),A=u("asset-sub-location"),v=this.getSiteOptions().find(y=>y.id===S),w=this.getPlaceOptions(S).find(y=>y.id===A),b={id:a,number:u("asset-site-number")||a,siteNumber:u("asset-site-number")||a,type:p,location:u("asset-location"),subLocation:A,subLocationId:A?String(A).trim():null,subLocationName:w?w.name:"",manufacturer:u("asset-manufacturer"),factory:S,factoryId:S?String(S).trim():null,factoryName:v?v.name:"",model:u("asset-model"),capacity:u("asset-capacity"),capacityKg:u("asset-capacity"),manufacturingYear:(()=>{const y=document.getElementById("asset-manufacturing-year");return y&&y.value?parseInt(y.value):null})(),productionDate:(()=>{const y=document.getElementById("asset-production-date");return y?this.toISODate(y.value):null})(),serialNumber:u("asset-serial-number"),installationMethod:u("asset-installation-method"),installationDate:(()=>{const y=document.getElementById("asset-installation");return y?this.toISODate(y.value):null})(),lastServiceDate:(()=>{const y=document.getElementById("asset-last-service");return y?this.toISODate(y.value):null})(),status:u("asset-status"),responsible:u("asset-responsible"),notes:u("asset-notes"),qrCodeData:e?.qrCodeData||this.generateQrData(a),createdAt:e?.createdAt||c,updatedAt:c};d>-1?f[d]={...f[d],...b}:f.push(b),Loading.show();let h;if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){if(h=await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:b}),!h.success)throw new Error(h.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632");Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632 \u0641\u064A Backend:",b.id);try{await this.loadAssetsFromBackend()}catch(y){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",y)}}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(i?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0646\u062C\u0627\u062D"),l&&(l.disabled=!1,l.innerHTML=r),t.remove(),this.state.currentTab==="database"?this.renderAssets():this.state.currentTab==="register"?await this.refreshRegisterTable():await this.refreshCurrentTab()}catch(c){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632:",c),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632: "+(c.message||c)),l&&(l.disabled=!1,l.innerHTML=r)}});const n=t.querySelector("#manage-types-btn");n&&n.addEventListener("click",()=>{this.showManageTypesModal()}),setTimeout(()=>{const o=t.querySelector("#asset-factory"),l=t.querySelector("#asset-sub-location");o&&l&&o.addEventListener("change",()=>{const r=o.value,c=this.getPlaceOptions(r);l.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>',c.forEach(f=>{const d=document.createElement("option");d.value=f.id,d.textContent=f.name,l.appendChild(d)})})},100)},async startQRScan(){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){Notification.error("\u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0644\u0627 \u064A\u062F\u0639\u0645 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u062A\u0635\u0641\u062D \u062D\u062F\u064A\u062B.");return}const e=document.createElement("div");e.className="modal-overlay fire-modal",e.innerHTML=`
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
        `,document.body.appendChild(e);const i=e.querySelector("#qr-video"),a=e.querySelector("#qr-canvas"),t=a.getContext("2d");let s=null,n=null;const o=e.querySelector("#manual-submit-btn"),l=e.querySelector("#manual-device-id"),r=e.querySelector(".qr-scan-status");o.addEventListener("click",async()=>{const c=l.value.trim();if(!c){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 DeviceID");return}this.stopQRScan(),e.remove(),await this.processScannedDeviceId(c)}),l.addEventListener("keypress",async c=>{c.key==="Enter"&&o.click()});try{const c={video:{facingMode:{ideal:"environment"},width:{ideal:1280},height:{ideal:720}}};s=await navigator.mediaDevices.getUserMedia(c),i.srcObject=s,r&&(r.innerHTML='<i class="fas fa-camera ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0633\u062D...',r.style.background="rgba(34, 197, 94, 0.8)"),i.addEventListener("loadedmetadata",()=>{a.width=i.videoWidth,a.height=i.videoHeight}),n=setInterval(()=>{if(i.readyState===i.HAVE_ENOUGH_DATA){t.drawImage(i,0,0,a.width,a.height);const f=t.getImageData(0,0,a.width,a.height);if(typeof jsQR<"u"){const d=jsQR(f.data,f.width,f.height,{inversionAttempts:"dontInvert"});if(d&&d.data){const p=d.data.trim();r&&(r.innerHTML='<i class="fas fa-check-circle ml-2"></i>\u062A\u0645 \u0627\u0644\u0645\u0633\u062D!',r.style.background="rgba(34, 197, 94, 0.9)"),this.stopQRScan(),setTimeout(()=>e.remove(),300),this.processScannedDeviceId(p)}}}},100)}catch(c){const f=c?.message||c?.toString()||"",d=f.includes("Permissions policy")||f.includes("Permission policy")||f.includes("[Violation]")||f.includes("not allowed in this document");d||Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627:",c),r&&(r.innerHTML='<i class="fas fa-exclamation-triangle ml-2"></i>\u0641\u0634\u0644 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0643\u0627\u0645\u064A\u0631\u0627',r.style.background="rgba(239, 68, 68, 0.8)"),d?Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A."):Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627. \u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A.")}e.dataset.stream="active",window._fireEquipmentStream=s,window._fireEquipmentScanInterval=n},stopQRScan(){window._fireEquipmentStream&&(window._fireEquipmentStream.getTracks().forEach(e=>e.stop()),window._fireEquipmentStream=null),window._fireEquipmentScanInterval&&(clearInterval(window._fireEquipmentScanInterval),window._fireEquipmentScanInterval=null)},async processScannedDeviceId(e){if(!e){Notification.error("DeviceID \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}Loading.show();try{const i=await this.getDeviceDataFromRegister(e);if(!i){Notification.error(`\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062C\u0647\u0627\u0632 \u0628\u0631\u0642\u0645: ${e}`),Loading.hide();return}await this.showDeviceDataFromQR(i)}catch(i){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632: "+i.message)}finally{Loading.hide()}},getDeviceDataFromRegister(e){const i=this.getAssets().find(t=>t.id===e);if(!i)return null;const a=this.getLatestInspection(e);return{deviceId:i.id,deviceNumber:i.number||i.id,deviceType:i.type||"",location:i.location||"",capacity:i.capacity||"",lastInspectionDate:a?a.checkDate:null,lastInspector:a?a.inspector:"",deviceStatus:i.status||"",manufacturer:i.manufacturer||"",model:i.model||"",installationDate:i.installationDate||""}},async showDeviceDataFromQR(e){const i=this.checkMonthlyInspectionAllowed(e.deviceId);if(!i.allowed){Notification.warning(i.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A");return}const a=AppState.currentUser,t=a&&(a.role==="admin"||a.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||a.role==="system_admin"||typeof Permissions<"u"&&Permissions.isCurrentUserAdmin&&Permissions.isCurrentUserAdmin()),s=a&&(a.role==="safety_officer"||a.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"),n=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("fire-equipment","inspections");if(!t&&!(s&&n)&&!(typeof Permissions<"u"&&Permissions.hasAccess&&Permissions.hasAccess("fire-equipment"))){Notification.error("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u064A\u062A\u0637\u0644\u0628 \u0635\u0644\u0627\u062D\u064A\u0629 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}this.showMobileInspectionForm(null,e.deviceId)},async initiateMonthlyInspection(e){const i=this.checkMonthlyInspectionAllowed(e);if(!i.allowed){Notification.warning(i.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A");return}if(!await this.requestAdminApproval(e)){Notification.info("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 - \u0645\u0637\u0644\u0648\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0645\u062F\u064A\u0631");return}this.showInspectionForm(null,e)},checkMonthlyInspectionAllowed(e){const i=new Date,a=i.getMonth(),t=i.getFullYear(),s=this.getInspections().filter(n=>{if(n.assetId!==e)return!1;const o=new Date(n.checkDate||n.createdAt);return o.getMonth()===a&&o.getFullYear()===t});if(s.length>0){const n=s[0];return{allowed:!1,reason:`\u062A\u0645 \u0641\u062D\u0635 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 (${Utils.formatDate(n.checkDate||n.createdAt)}). \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0622\u062E\u0631 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0634\u0647\u0631.`}}return{allowed:!0,reason:""}},async requestAdminApproval(e){return new Promise(async i=>{const a=AppState.currentUser;if(a&&(a.role==="admin"||a.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||typeof Permissions<"u"&&Permissions.isCurrentUserAdmin&&Permissions.isCurrentUserAdmin())){i(!0);return}try{const s=this.getAssets().find(r=>r.id===e),n=s?s.number||s.id:e,o=s&&s.location||"",l=await this.createInspectionApprovalRequest(e,n,o);l&&(Notification.info("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629. \u0633\u064A\u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u0645\u062F\u064A\u0631 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629."),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&RealtimeSyncManager.notifyChange("fireEquipmentApprovalRequests","add",l.id)),i(!1)}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629"),i(!1)}})},async createInspectionApprovalRequest(e,i,a){const t=AppState.currentUser;if(!t)throw new Error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0633\u062C\u0644 \u062F\u062E\u0648\u0644");const s=Utils.generateId("FEAR"),n=new Date().toISOString(),o={id:s,type:"inspection",assetId:e,assetNumber:i,assetLocation:a,requestedBy:t.name||t.email||"\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",requestedById:t.id||t.email||"",userEmail:t.email||"",requestedAt:n,status:"pending",comments:`\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0644\u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632: ${i}${a?` - ${a}`:""}`,createdAt:n,updatedAt:n};return AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests||(AppState.appData.fireEquipmentApprovalRequests=[]),AppState.appData.fireEquipmentApprovalRequests.push(o),typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(AppState.appData.fireEquipmentApprovalRequests)),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),(async()=>{try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const l=await GoogleIntegration.sendRequest({action:"addFireEquipmentApprovalRequest",data:o});l.success?(Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A Backend:",s),await this.loadApprovalRequestsFromBackend(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0641\u064A Backend:",l.message)}}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0641\u064A Backend:",l)}})(),this.notifyAdminsAboutApprovalRequest(o).catch(l=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",l)}),o},async notifyAdminsAboutApprovalRequest(e){try{const i=[];if(AppState.appData&&AppState.appData.users&&i.push(...AppState.appData.users.filter(a=>a.role==="admin"||a.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||typeof Permissions<"u"&&Permissions.isUserAdmin&&Permissions.isUserAdmin(a))),i.length===0)GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:"admin",title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621",message:`\u0637\u0644\u0628 ${e.requestedBy} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0627\u0644\u062C\u0647\u0627\u0632: ${e.assetNumber}${e.assetLocation?` - ${e.assetLocation}`:""}`,type:"approval_request",priority:"high",link:"#fire-equipment-approval-requests",data:{module:"fire-equipment",action:"inspection_approval",requestId:e.id}}}).catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631:",a)});else for(const a of i)if(a.id||a.email)try{GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:a.id||a.email,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621",message:`\u0637\u0644\u0628 ${e.requestedBy} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0627\u0644\u062C\u0647\u0627\u0632: ${e.assetNumber}${e.assetLocation?` - ${e.assetLocation}`:""}`,type:"approval_request",priority:"high",link:"#fire-equipment-approval-requests",data:{module:"fire-equipment",action:"inspection_approval",requestId:e.id}}}).catch(t=>{Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631 ${a.name||a.email}:`,t)})}catch(t){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631 ${a.name||a.email}:`,t)}Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0628\u062E\u0635\u0648\u0635 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",e.id)}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",i)}},showInspectionForm(e=null,i=null){if(!i&&!e?.assetId){Notification.warning("\u064A\u062C\u0628 \u0645\u0633\u062D QR Code \u0623\u0648\u0644\u0627\u064B \u0644\u0628\u062F\u0621 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A");return}const a=!!e,t=e?.id||Utils.generateId("FEI"),s=e?.assetId||i,n=this.getAssets().find(f=>f.id===s);if(!n){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632");return}const o=e?.checkDate?new Date(e.checkDate).toISOString().slice(0,10):new Date().toISOString().slice(0,10),l=document.createElement("div");l.className="modal-overlay fire-modal",l.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${a?"\u062A\u0639\u062F\u064A\u0644 \u0641\u062D\u0635 \u062C\u0647\u0627\u0632":"\u062A\u0633\u062C\u064A\u0644 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0644\u0644\u062C\u0647\u0627\u0632"}</h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="fire-inspection-form" class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <p class="text-sm text-blue-800">
                                <i class="fas fa-info-circle ml-2"></i>
                                <strong>DeviceID:</strong> ${Utils.escapeHTML(n.id)} | 
                                <strong>\u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(n.number||n.id)} | 
                                <strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(n.location||"-")}
                            </p>
                        </div>
                        <input type="hidden" id="inspection-asset" value="${s}">
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
                                    ${this.statusOptions.map(f=>`<option value="${f.value}" ${e?.status===f.value?"selected":""}>${f.label}</option>`).join("")}
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
                                <i class="fas fa-save ml-2"></i>${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(l);const r=l.querySelector("#fire-inspection-form");if(!r){Utils.safeError("\u274C \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648\u0630\u062C #fire-inspection-form");return}let c=!1;r.addEventListener("submit",async f=>{if(f.preventDefault(),f.stopPropagation(),c){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0628\u0627\u0644\u0641\u0639\u0644");return}c=!0;const d=r.querySelector('button[type="submit"]'),p=d?d.innerHTML:"";try{d&&(d.disabled=!0,d.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const u=new Date().toISOString(),g=h=>{const y=document.getElementById(h);return y?y.value.trim():""},S=h=>{const y=document.getElementById(h);return y?y.value:null},A=document.getElementById("inspection-asset"),m=(A?A.value:"")||s;if(!m){Notification.error("\u062E\u0637\u0623: DeviceID \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),c=!1,d&&(d.disabled=!1,d.innerHTML=p);return}if(!a){const h=this.checkMonthlyInspectionAllowed(m);if(!h.allowed){Notification.warning(h.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A"),c=!1,d&&(d.disabled=!1,d.innerHTML=p);return}}const v={id:t,assetId:m,checkDate:(()=>{const h=document.getElementById("inspection-date");return h&&this.toISODate(h.value)||u})(),inspector:g("inspection-inspector"),status:g("inspection-status"),gaugeReading:g("inspection-gauge"),sealIntact:(()=>{const h=document.getElementById("inspection-seal");if(!h)return null;const y=h.value;return y==="true"?!0:y==="false"?!1:null})(),remarks:g("inspection-remarks"),actions:g("inspection-actions"),createdAt:e?.createdAt||u,updatedAt:u};AppState.appData.fireEquipmentInspections||(AppState.appData.fireEquipmentInspections=[]);const x=AppState.appData.fireEquipmentInspections,w=x.findIndex(h=>h.id===t);w>-1?x[w]={...x[w],...v}:x.push(v);const b=this.getAssets().find(h=>h.id===m);b&&(b.lastServiceDate=v.checkDate,b.status=v.status,b.updatedAt=u),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),l&&l.parentNode&&l.remove(),this.refreshCurrentTab().catch(h=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",h)}),Notification.success(a?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0635":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635 \u0628\u0646\u062C\u0627\u062D"),(async()=>{try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const h=await GoogleIntegration.sendRequest({action:a?"updateFireEquipmentInspection":"addFireEquipmentInspection",data:v});if(!h.success)throw new Error(h.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635");Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A Backend:",v.id),b&&(await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:b}),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632:",b.id)),this.refreshCurrentTab().catch(y=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",y)})}}catch(h){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0641\u062D\u0635:",h)}})(),c=!1,d&&(d.disabled=!1,d.innerHTML=p)}catch(u){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",u),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639: "+(u.message||u)),c=!1,d&&(d.disabled=!1,d.innerHTML=p)}})},showMobileInspectionForm(e=null,i=null){if(!i&&!e?.assetId){Notification.warning("\u064A\u062C\u0628 \u0645\u0633\u062D QR Code \u0623\u0648\u0644\u0627\u064B \u0644\u0628\u062F\u0621 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A");return}const a=!!e,t=e?.id||Utils.generateId("FEI"),s=e?.assetId||i,n=this.getAssets().find(f=>f.id===s);if(!n){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632");return}const o=e?.checkDate?new Date(e.checkDate).toISOString().slice(0,10):new Date().toISOString().slice(0,10),l=document.createElement("div");l.className="modal-overlay fire-modal",l.innerHTML=`
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
                            ${a?"\u062A\u0639\u062F\u064A\u0644 \u0641\u062D\u0635":"\u0641\u062D\u0635 \u0634\u0647\u0631\u064A"}
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
                                <span class="device-info-value">${Utils.escapeHTML(n.id)}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">\u0627\u0644\u062C\u0647\u0627\u0632:</span>
                                <span class="device-info-value">${Utils.escapeHTML(n.number||n.id)}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">\u0627\u0644\u0645\u0648\u0642\u0639:</span>
                                <span class="device-info-value">${Utils.escapeHTML(n.location||"-")}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">\u0627\u0644\u0646\u0648\u0639:</span>
                                <span class="device-info-value">${Utils.escapeHTML(n.type||n.equipmentType||"-")}</span>
                            </div>
                        </div>

                        <input type="hidden" id="mobile-inspection-asset" value="${s}">

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
                                ${this.statusOptions.map(f=>`<option value="${f.value}" ${e?.status===f.value?"selected":""}>${f.label}</option>`).join("")}
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
                        ${a?"\u062D\u0641\u0638":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635"}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(l);const r=l.querySelector("#mobile-inspection-form");if(!r){Utils.safeError("\u274C \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648\u0630\u062C #mobile-inspection-form");return}let c=!1;r.addEventListener("submit",async f=>{if(f.preventDefault(),f.stopPropagation(),c){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0628\u0627\u0644\u0641\u0639\u0644");return}c=!0;const d=l.querySelector('button[type="submit"]'),p=d?d.innerHTML:"";try{d&&(d.disabled=!0,d.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const u=new Date().toISOString(),g=b=>{const h=document.getElementById(b);return h?h.value.trim():""},S=document.getElementById("mobile-inspection-asset"),A=(S?S.value:"")||s;if(!A){Notification.error("\u062E\u0637\u0623: DeviceID \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),c=!1,d&&(d.disabled=!1,d.innerHTML=p);return}if(!a){const b=this.checkMonthlyInspectionAllowed(A);if(!b.allowed){Notification.warning(b.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A"),c=!1,d&&(d.disabled=!1,d.innerHTML=p);return}}const m={id:t,assetId:A,checkDate:(()=>{const b=document.getElementById("mobile-inspection-date");return b&&this.toISODate(b.value)||u})(),inspector:g("mobile-inspection-inspector"),status:g("mobile-inspection-status"),gaugeReading:g("mobile-inspection-gauge"),sealIntact:(()=>{const b=document.getElementById("mobile-inspection-seal");if(!b)return null;const h=b.value;return h==="true"?!0:h==="false"?!1:null})(),remarks:g("mobile-inspection-remarks"),actions:g("mobile-inspection-actions"),createdAt:e?.createdAt||u,updatedAt:u};AppState.appData.fireEquipmentInspections||(AppState.appData.fireEquipmentInspections=[]);const v=AppState.appData.fireEquipmentInspections,x=v.findIndex(b=>b.id===t);x>-1?v[x]={...v[x],...m}:v.push(m);const w=this.getAssets().find(b=>b.id===A);w&&(w.lastServiceDate=m.checkDate,w.status=m.status,w.updatedAt=u),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),l&&l.parentNode&&l.remove(),this.refreshCurrentTab().catch(b=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",b)}),Notification.success(a?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0635":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635 \u0628\u0646\u062C\u0627\u062D"),(async()=>{try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const b=await GoogleIntegration.sendRequest({action:a?"updateFireEquipmentInspection":"addFireEquipmentInspection",data:m});if(!b.success)throw new Error(b.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635");Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A Backend:",m.id),w&&(await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:w}),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632:",w.id)),this.refreshCurrentTab().catch(h=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",h)})}}catch(b){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0641\u062D\u0635:",b)}})(),c=!1,d&&(d.disabled=!1,d.innerHTML=p)}catch(u){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",u),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639: "+(u.message||u)),c=!1,d&&(d.disabled=!1,d.innerHTML=p)}})},viewAsset(e){const i=this.getAssets().find(l=>l.id===e);if(!i){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632.");return}const a=this.getInspectionsByAsset(e),t=typeof QRCode<"u"?QRCode.generate(i.qrCodeData||this.generateQrData(i.id),200):null,s=JSON.stringify(i).replace(/"/g,"&quot;"),n=document.createElement("div");n.className="modal-overlay fire-modal",n.innerHTML=`
            <div class="modal-content" style="max-width: 820px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062C\u0647\u0627\u0632 ${Utils.escapeHTML(i.number||"")}</h2>
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
                                <p><strong>\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(i.location||"-")}</p>
                                <p><strong>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A:</strong> ${Utils.escapeHTML(i.subLocationName||i.subLocation||"-")}</p>
                                <p><strong>\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(i.type||"-")}</p>
                                <p><strong>\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645:</strong> ${Utils.escapeHTML(i.capacity||i.capacityKg||"-")}</p>
                                <p><strong>\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(i.siteNumber||i.number||"-")}</p>
                                <p><strong>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629:</strong> ${Utils.escapeHTML(i.manufacturer||"-")}</p>
                                <p><strong>\u0627\u0644\u0645\u0635\u0646\u0639:</strong> ${Utils.escapeHTML(i.factoryName||i.factory||"-")}</p>
                                <p><strong>\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639:</strong> ${i.manufacturingYear||"-"}</p>
                                <p><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C:</strong> ${i.productionDate?Utils.formatDate(i.productionDate):"-"}</p>
                                <p><strong>\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(i.serialNumber||"-")}</p>
                                <p><strong>\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${this.getStatusBadge(i.status)}</p>
                                <p><strong>\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A:</strong> ${Utils.escapeHTML(i.installationMethod||"-")}</p>
                                <p><strong>\u0627\u0644\u0645\u0648\u062F\u064A\u0644:</strong> ${Utils.escapeHTML(i.model||"-")}</p>
                                <p><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0631\u0643\u064A\u0628:</strong> ${i.installationDate?Utils.formatDate(i.installationDate):"-"}</p>
                                <p><strong>\u0622\u062E\u0631 \u0635\u064A\u0627\u0646\u0629:</strong> ${i.lastServiceDate?Utils.formatDate(i.lastServiceDate):"-"}</p>
                                <p><strong>\u0627\u0644\u0645\u0633\u0624\u0648\u0644:</strong> ${Utils.escapeHTML(i.responsible||"-")}</p>
                                ${i.notes?`<p><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong> ${Utils.escapeHTML(i.notes)}</p>`:""}
                            </div>
                        </div>
                        <div class="content-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-qrcode ml-2"></i>QR Code \u0644\u0644\u062C\u0647\u0627\u0632</h3>
                            </div>
                            <div class="card-body text-center space-y-3">
                                ${t?`<img src="${t}" alt="QR Code" class="mx-auto h-40 w-40 border border-gray-200 p-2 bg-white">`:'<p class="text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F QR Code</p>'}
                                <div class="flex flex-wrap justify-center gap-2">
                                    <button class="btn-secondary" onclick="FireEquipment.printQr('${i.id}')">
                                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629 QR Code
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 mt-2">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A: \u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 "\u0645\u0633\u062D QR Code \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A" \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629
                                </p>
                                <p class="text-xs text-gray-400 break-words">${Utils.escapeHTML(i.qrCodeData||this.generateQrData(i.id))}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header flex items-center justify-between">
                            <h3 class="card-title"><i class="fas fa-history ml-2"></i>\u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</h3>
                            <span class="text-xs text-gray-400">${a.length} \u0641\u062D\u0635</span>
                        </div>
                        <div class="card-body">
                            ${a.length?`
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
                                            ${a.map(l=>`
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
                    <button class="btn-primary" onclick="FireEquipment.showAssetForm(${s}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062C\u0647\u0627\u0632
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(n,{moduleKey:"fire-equipment",record:i,recordId:i.id||i.number||i.isoCode||""}),n.addEventListener("click",l=>{l.target===n&&n.remove()});const o=n.querySelector(".modal-content");o&&o.addEventListener("click",l=>{l.stopPropagation()})},getInspectionsByAsset(e){return this.getInspections().filter(i=>i.assetId===e).sort((i,a)=>new Date(a.checkDate||a.createdAt||0)-new Date(i.checkDate||i.createdAt||0))},getLatestInspection(e){const i=this.getInspectionsByAsset(e);return i.length?i[0]:null},getAssetStats(){const e=this.getAssets(),i=e.length,a=e.filter(n=>n.status==="\u0635\u0627\u0644\u062D").length,t=e.filter(n=>n.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,s=e.filter(n=>n.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length;return{total:i,active:a,needsMaintenance:t,outOfService:s}},generateQrData(e){return String(e||"").trim()},async persistAll(){if(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled)try{Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642...");const e=AppState.appData.fireEquipmentAssets||[];if(e.length>0){Utils.safeLog(`\u{1F4E6} \u062D\u0641\u0638 ${e.length} \u062C\u0647\u0627\u0632...`);const a=e.map(async o=>{try{return await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:o}),{success:!0,id:o.id}}catch(l){return Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632 ${o.id}:`,l),{success:!1,id:o.id,error:l}}}),t=await Promise.allSettled(a),s=t.filter(o=>o.status==="fulfilled"&&o.value.success).length,n=t.filter(o=>o.status==="rejected"||o.status==="fulfilled"&&!o.value.success).length;Utils.safeLog(`\u2705 \u062A\u0645 \u062D\u0641\u0638 ${s} \u062C\u0647\u0627\u0632\u060C \u0641\u0634\u0644 ${n}`)}const i=AppState.appData.fireEquipmentInspections||[];i.length>0&&(Utils.safeLog(`\u{1F4CB} \u062D\u0641\u0638 ${i.length} \u0641\u062D\u0635...`),await GoogleIntegration.sendRequest({action:"saveToSheet",data:{sheetName:"FireEquipmentInspections",data:i}})),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){if(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0641\u064A Google Sheets:",e),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave)try{const i=AppState.appData.fireEquipmentAssets.map(t=>({...t})),a=AppState.appData.fireEquipmentInspections.map(t=>({...t}));await Promise.allSettled([GoogleIntegration.autoSave("FireEquipmentAssets",i),GoogleIntegration.autoSave("FireEquipmentInspections",a)])}catch(i){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062D\u062A\u0649 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 autoSave:",i)}}else if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave)try{const e=AppState.appData.fireEquipmentAssets.map(a=>({...a})),i=AppState.appData.fireEquipmentInspections.map(a=>({...a}));await Promise.allSettled([GoogleIntegration.autoSave("FireEquipmentAssets",e),GoogleIntegration.autoSave("FireEquipmentInspections",i)])}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0641\u064A Google Sheets",e)}},getPublicInspectionUrl(e="",i=""){try{const a=window.location,t=a.pathname.split("/");t.pop();const s=t.join("/");let o=`${a.origin||a.protocol+"//"+a.host}${s}/public-fire-inspection.html`.replace(/([^:]\/)\/+/g,"$1"),l=[];return e&&l.push(`id=${encodeURIComponent(e)}`),i&&l.push(`inspector=${encodeURIComponent(i)}`),l.length>0&&(o+=`?${l.join("&")}`),o}catch{return`public-fire-inspection.html${e?`?id=${encodeURIComponent(e)}`:""}`}},getSafetyMembersList(){const e=c=>{if(!c)return!1;if(c.isActive===!1||c.active===!1||c.isActive==="false"||c.active==="false")return!0;const f=String(c.status||c.employeeStatus||c.workStatus||c.employmentStatus||"").trim().toLowerCase();return f?f.includes("\u0645\u0633\u062A\u0642\u064A\u0644")||f.includes("\u0627\u0633\u062A\u0642\u0627\u0644")||f.includes("\u0645\u0646\u062A\u0647\u064A")||f.includes("\u0641\u0635\u0644")||f.includes("\u062A\u0631\u0643")||f.includes("resign")||f.includes("terminated")||f.includes("inactive")||f.includes("left"):!1},i=c=>!c||c.length<3||/[a-zA-Z]/.test(c)?!1:/[\u0600-\u06FF]/.test(c),a=c=>String(c||"").trim().toLowerCase().replace(/^(م\/|أ\/|د\/|مهندس\/|أستاذ\/|دكتور\/|mr\.|eng\.)\s*/i,"").replace(/[أإآ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").replace(/\s+/g," "),t=new Set,s=[],n=c=>{const f=String(c||"").trim();if(!i(f))return;const d=f.toLowerCase();if(d.includes("admin")||d.includes("support")||d.includes("system")||d.includes("tool")||d.includes("\u0645\u062C\u0647\u0648\u0644")||d.includes("\u0639\u0627\u0645\u0629"))return;const p=a(f);!p||t.has(p)||(t.add(p),s.push({name:f}))};(AppState.appData?.employees||[]).forEach(c=>{if(e(c))return;const f=c.name||c.employeeName||"",d=String(c.department||"").toLowerCase(),p=String(c.job||c.jobTitle||c.position||"").toLowerCase();if(p.includes("\u063A\u0630\u0627\u0621")||p.includes("food")||d.includes("\u062C\u0648\u062F\u0629")||d.includes("\u062A\u0635\u0646\u064A\u0639"))return;const u=d.includes("\u0633\u0644\u0627\u0645\u0629")||d.includes("hse")||d.includes("\u0635\u062D\u0629 \u0645\u0647\u0646\u064A\u0629"),g=p.includes("\u0633\u0644\u0627\u0645\u0629 \u0648\u0635\u062D\u0629")||p.includes("\u0633\u0644\u0627\u0645\u0647 \u0648\u0635\u062D\u0629")||p.includes("\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629")||p.includes("\u0633\u0644\u0627\u0645\u0629 \u0645\u0647\u0646\u064A\u0629")||p.includes("\u0623\u062E\u0635\u0627\u0626\u064A \u0633\u0644\u0627\u0645\u0629")||p.includes("\u0627\u062E\u0635\u0627\u0626\u0649 \u0633\u0644\u0627\u0645\u0647")||p.includes("\u0641\u0646\u064A \u0633\u0644\u0627\u0645\u0629")||p.includes("\u0641\u0646\u0649 \u0633\u0644\u0627\u0645\u0629")||p.includes("\u0645\u0634\u0631\u0641 \u0633\u0644\u0627\u0645\u0629")||p.includes("\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")||p.includes("\u0645\u0641\u062A\u0634 \u0633\u0644\u0627\u0645\u0629")||p.includes("\u0645\u0633\u0624\u0648\u0644 \u0633\u0644\u0627\u0645\u0629")||p.includes("\u0625\u0637\u0641\u0627\u0621")||p.includes("\u062D\u0631\u064A\u0642")||p.includes("hse officer")||p.includes("hse specialist")||p.includes("hse manager");f&&u&&g&&n(f)});const l=AppState.companySettings||{},r=l.safetyTeam||l.safetyTeamMembers||l.hseTeam;return Array.isArray(r)?r.forEach(c=>n(typeof c=="string"?c:c.name)):typeof r=="string"&&r.split(/[\n,]/).forEach(c=>n(c)),s.sort((c,f)=>c.name.localeCompare(f.name,"ar")),s},showPublicLinkModal(){const e=this.getPublicInspectionUrl(),i=this.getAssets()||[],a=this.getSafetyMembersList(),t=document.createElement("div");t.className="modal-overlay fire-modal",t.innerHTML=`
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
                                ${i.map(p=>`<option value="${Utils.escapeHTML(p.id)}">${Utils.escapeHTML(p.id)} \u2014 ${Utils.escapeHTML(p.number||p.id)} (${Utils.escapeHTML(p.location||"-")})</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-user-shield ml-1 text-emerald-600"></i> \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u062E\u0635\u0635:
                            </label>
                            <select id="qr-fire-inspector-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="">\u2014 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0641\u062A\u0634 \u0628\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u2014</option>
                                ${a.map(p=>`<option value="${Utils.escapeHTML(p.name)}">${Utils.escapeHTML(p.name)}</option>`).join("")}
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
        `,document.body.appendChild(t);const s=t.querySelector("#qr-fire-asset-select"),n=t.querySelector("#qr-fire-inspector-select"),o=t.querySelector("#fire-public-link-input"),l=t.querySelector("#fire-qr-img"),r=t.querySelector("#fire-qr-target-text"),c=t.querySelector("#fire-copy-link-btn"),f=t.querySelector("#fire-print-poster-btn"),d=()=>{const p=s.value,u=n.value,g=this.getPublicInspectionUrl(p,u);let S="";try{const x=typeof AppState<"u"&&(AppState.companyLogo||AppState.companySettings?.logo)||"",w={assets:i.map(b=>({id:b.id,number:b.number||b.id,type:b.type||"\u0637\u0641\u0627\u064A\u0629 \u062D\u0631\u064A\u0642",location:b.location||"",subLocation:b.subLocation||"",capacity:b.capacity||"",status:b.status||"\u0635\u0627\u0644\u062D",lastInspection:b.lastInspection||b.lastServiceDate||""})),safetyMembers:a.map(b=>b.name),logo:x};S="#cfg="+encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(w)))))}catch{}const A=`${g}${S}`;o.value=A;let m="";const v=A.length<900?A:g;if(typeof qrcode=="function")try{const x=qrcode(0,"M");x.addData(v),x.make(),m=x.createDataURL(5,4)}catch{}if(!m&&window.QRCode&&typeof window.QRCode.generate=="function")try{m=window.QRCode.generate(g,240)}catch{}m&&m.startsWith("data:")?l.src=m:l.src=`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(g)}`,p?r.textContent=`\u0641\u062D\u0635 \u0645\u062E\u0635\u0635 \u0644\u0644\u062C\u0647\u0627\u0632: ${p}`:r.textContent="\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A \u0627\u0644\u0634\u0627\u0645\u0644 \u0644\u062C\u0645\u064A\u0639 \u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0625\u0637\u0641\u0627\u0621"};s?.addEventListener("change",d),n?.addEventListener("change",d),d(),c?.addEventListener("click",()=>{navigator.clipboard.writeText(o.value).then(()=>{c.innerHTML='<i class="fas fa-check ml-1 text-green-600"></i> \u062A\u0645 \u0627\u0644\u0646\u0633\u062E!',setTimeout(()=>{c.innerHTML='<i class="fas fa-copy ml-1"></i> \u0646\u0633\u062E'},2500)})}),f?.addEventListener("click",()=>{const p=o.value,u=window.open("","_blank");if(!u){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}u.document.write(`
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
            `),u.document.close()})},showBatchPrintQrModal(){const e=this.getAssets()||[];if(!e||e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062C\u0647\u0632\u0629 \u0625\u0637\u0641\u0627\u0621 \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629.");return}const i=[...new Set(e.map(d=>d.location).filter(Boolean))].sort(),a=[...new Set(e.map(d=>d.type||d.equipmentType).filter(Boolean))].sort(),t=document.createElement("div");t.className="modal-overlay fire-modal",t.innerHTML=`
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
                                ${i.map(d=>`<option value="${Utils.escapeHTML(d)}">${Utils.escapeHTML(d)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-fire-extinguisher text-red-600 ml-1"></i> \u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632:
                            </label>
                            <select id="batch-type-filter" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="all">\u2014 \u062C\u0645\u064A\u0639 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0637\u0641\u0627\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u0639\u062F\u0627\u062A \u2014</option>
                                ${a.map(d=>`<option value="${Utils.escapeHTML(d)}">${Utils.escapeHTML(d)}</option>`).join("")}
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
        `,document.body.appendChild(t);const s=t.querySelector("#batch-location-filter"),n=t.querySelector("#batch-type-filter"),o=t.querySelector("#batch-layout-select"),l=t.querySelector("#batch-selected-preview"),r=t.querySelector("#start-batch-print-btn"),c=()=>{const d=s.value,p=n.value;return e.filter(u=>!(d!=="all"&&u.location!==d||p!=="all"&&(u.type||u.equipmentType)!==p))},f=()=>{const d=c();l.textContent=`${d.length} \u062C\u0647\u0627\u0632 \u062C\u0627\u0647\u0632 \u0644\u0644\u0637\u0628\u0627\u0639\u0629`,r.disabled=d.length===0};s.addEventListener("change",f),n.addEventListener("change",f),r.addEventListener("click",()=>{const d=c();if(d.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062C\u0647\u0632\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u062A\u0635\u0641\u064A\u0629.");return}t.remove(),this.batchPrintQrCards(d,o.value)})},batchPrintQrCards(e,i="2x4"){if(!e||e.length===0)return;let a=2,t="120px",s=100,n="13px",o="10.5px";i==="3x4"?(a=3,t="110px",s=85,n="11.5px",o="9.5px"):i==="2x3"&&(a=2,t="150px",s=125,n="14px",o="11.5px");const l=window.open("","_blank");if(!l){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A QR");return}const r=e.map(c=>{const f=String(c.id||"").trim(),d=this.getPublicInspectionUrl(f);let p="";if(typeof qrcode=="function")try{const u=qrcode(0,"M");u.addData(d),u.make(),p=u.createDataURL(4,2)}catch{}if(!p&&window.QRCode&&typeof window.QRCode.generate=="function")try{p=window.QRCode.generate(d,140)}catch{}return p||(p=`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(d)}`),`
                <div class="qr-card">
                    <div class="qr-card-header">
                        <span class="qr-card-tag"><i class="fas fa-fire-extinguisher"></i> HSE FIRE</span>
                        <span class="qr-card-num">${Utils.escapeHTML(c.number||c.id)}</span>
                    </div>
                    <div class="qr-card-body">
                        <div class="qr-card-info">
                            <div class="qr-card-id">${Utils.escapeHTML(f)}</div>
                            <div class="qr-card-type">${Utils.escapeHTML(c.type||"\u0637\u0641\u0627\u064A\u0629 \u062D\u0631\u064A\u0642")}${c.capacity?` - ${Utils.escapeHTML(c.capacity)}`:""}</div>
                            <div class="qr-card-loc"><i class="fas fa-map-pin"></i> ${Utils.escapeHTML(c.location||"-")}${c.subLocation?` (${Utils.escapeHTML(c.subLocation)})`:""}</div>
                            <div class="qr-card-inst">\u0627\u0645\u0633\u062D \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A</div>
                        </div>
                        <div class="qr-card-img-wrap">
                            <img src="${p}" alt="QR ${f}" class="qr-code-img">
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
                        grid-template-columns: repeat(${a}, 1fr);
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
                        min-height: ${t};
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
                        font-size: ${n};
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
                        width: ${s}px;
                        height: ${s}px;
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
        `),l.document.close()},printQr(e){const i=this.getAssets().find(n=>n.id===e);if(!i){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u0645\u062D\u062F\u062F.");return}const a=this.getPublicInspectionUrl(i.id);let t="";if(typeof qrcode=="function")try{const n=qrcode(0,"M");n.addData(a),n.make(),t=n.createDataURL(6,4)}catch{}!t&&typeof QRCode<"u"&&(t=QRCode.generate(a,260)),t||(t=`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(a)}`);const s=window.open("","_blank");if(!s){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 QR Code");return}s.document.write(`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <title>QR Code - ${Utils.escapeHTML(i.number||i.id)}</title>
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
                    <div class="id-title">${Utils.escapeHTML(i.id)}</div>
                    <p class="info"><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(i.type||"\u0637\u0641\u0627\u064A\u0629 \u062D\u0631\u064A\u0642")}${i.capacity?` - ${Utils.escapeHTML(i.capacity)}`:""}</p>
                    <p class="info"><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(i.location||"-")}</p>
                    <img src="${t}" alt="QR Code">
                    <div class="hint">\u0627\u0645\u0633\u062D \u0627\u0644\u0631\u0645\u0632 \u0628\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u0647\u0627\u062A\u0641 \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A \u0627\u0644\u0645\u0628\u0627\u0634\u0631</div>
                </div>
                <script>window.onload = () => setTimeout(() => window.print(), 300);<\/script>
            </body>
            </html>
        `),s.document.close()},toISODate(e){if(!e)return"";try{const i=new Date(e);return Number.isNaN(i.getTime())?"":i.toISOString()}catch{return""}},showManageTypesModal(){const e=document.createElement("div");e.className="modal-overlay fire-modal",e.innerHTML=`
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
                            ${this.assetTypes.map((t,s)=>`
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded" data-type-index="${s}">
                                    <span>${Utils.escapeHTML(t)}</span>
                                    <button type="button" class="btn-icon btn-icon-danger btn-remove-type" data-type-index="${s}" title="\u062D\u0630\u0641">
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
        `,document.body.appendChild(e);const i=e.querySelector("#add-type-btn"),a=e.querySelector("#new-type-input");i.addEventListener("click",()=>{const t=a.value.trim();if(!t){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632");return}if(this.assetTypes.includes(t)){Notification.warning("\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644");return}this.assetTypes.push(t),a.value="",this.refreshTypesList(e),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D")}),e.addEventListener("click",t=>{if(t.target.closest(".btn-remove-type")){const s=parseInt(t.target.closest(".btn-remove-type").dataset.typeIndex);confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639\u061F")&&(this.assetTypes.splice(s,1),this.refreshTypesList(e),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D"))}})},refreshTypesList(e){const i=e.querySelector("#types-list");i&&(i.innerHTML=this.assetTypes.map((a,t)=>`
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded" data-type-index="${t}">
                    <span>${Utils.escapeHTML(a)}</span>
                    <button type="button" class="btn-icon btn-icon-danger btn-remove-type" data-type-index="${t}" title="\u062D\u0630\u0641">
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
        `,document.body.appendChild(e);const i=e.querySelector("#excel-file-input"),a=e.querySelector("#confirm-import-btn"),t=e.querySelector("#import-preview"),s=e.querySelector("#preview-head"),n=e.querySelector("#preview-body"),o=e.querySelector("#preview-count");let l=[];(()=>{if(typeof XLSX>"u"){const c=document.createElement("script");c.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",c.onerror=function(){this.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"},c.onload=()=>{i.addEventListener("change",f=>{this.handleExcelFile(f.target.files[0],e,a,t,s,n,o,d=>{l=d})})},document.head.appendChild(c)}else i.addEventListener("change",c=>{this.handleExcelFile(c.target.files[0],e,a,t,s,n,o,f=>{l=f})})})(),a.addEventListener("click",async()=>{if(l.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 Excel \u0623\u0648\u0644\u0627\u064B");return}await this.processImport(l,e)})},async handleExcelFile(e,i,a,t,s,n,o,l){if(e){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644\u0647\u0627...");return}Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");try{const r=await e.arrayBuffer(),c=XLSX.read(r,{type:"array"}),f=c.SheetNames[0],d=c.Sheets[f],p=XLSX.utils.sheet_to_json(d);if(p.length===0){Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide();return}const g=this.getAssets().map(m=>m.id).filter(m=>m&&m.match(/^EFA-\d{4}$/)).map(m=>parseInt(m.split("-")[1])).filter(m=>!isNaN(m));let S=g.length>0?Math.max(...g)+1:1;const A=p.map(m=>{const x=`EFA-${String(S).padStart(4,"0")}`;return S++,{id:x,location:m["\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632"]||m["\u0645\u0643\u0627\u0646 \u0627\u0644\u062C\u0647\u0627\u0632"]||m.\u0627\u0644\u0645\u0648\u0642\u0639||"",subLocation:m["\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A"]||"",type:m["\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632"]||"",capacity:m["\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645"]||m.\u0627\u0644\u0633\u0639\u0629||"",capacityKg:m["\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645"]||m.\u0627\u0644\u0633\u0639\u0629||"",siteNumber:m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639"]||m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632"]||"",number:m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639"]||m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632"]||"",manufacturer:m["\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629"]||"",factory:m.\u0627\u0644\u0645\u0635\u0646\u0639||"",manufacturingYear:m["\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639"]?parseInt(m["\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639"]):null,productionDate:m["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C"]?this.parseDate(m["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C"]):"",serialNumber:m["\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632"]||m["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644"]||"",status:m["\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632"]||"\u0635\u0627\u0644\u062D",installationMethod:m["\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A"]||"",notes:m.\u0645\u0644\u0627\u062D\u0638\u0627\u062A||"",qrCodeData:this.generateQrData(x),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}}).filter(m=>m.location&&m.type);if(A.length>0){const m=Object.keys(p[0]);s.innerHTML=`<tr>${m.map(v=>`<th>${Utils.escapeHTML(v)}</th>`).join("")}</tr>`,n.innerHTML=p.slice(0,5).map(v=>`<tr>${m.map(x=>`<td>${Utils.escapeHTML(String(v[x]||""))}</td>`).join("")}</tr>`).join(""),o.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0631\u0627\u062F \u0627\u0633\u062A\u064A\u0631\u0627\u062F\u0647\u0627: ${A.length}`,t.classList.remove("hidden"),a.disabled=!1,l(A)}else Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0635\u062D\u064A\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F");Loading.hide()}catch(r){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+r.message)}}},async processImport(e,i){if(!e||e.length===0){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0645\u0639\u0627\u0644\u062C\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062D\u0641\u0638\u0647\u0627 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");try{let a=0,t=0;const s=e.length;if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){for(let o=0;o<s;o+=5){const l=e.slice(o,o+5),r=l.map(f=>GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:f}).then(d=>(d.success?a++:t++,d)).catch(d=>(t++,{success:!1,error:d})));await Promise.allSettled(r);const c=Math.min(100,Math.round((o+l.length)/s*100));Loading.show(`\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A... ${c}% (${a} \u0646\u0627\u062C\u062D)`)}await this.loadAssetsFromBackend()}else{const n=this.getAssets();let o=0,l=0;e.forEach(r=>{const c=n.find(f=>f.id===r.id);c?(Object.assign(c,r),c.updatedAt=new Date().toISOString(),o++):(n.push(r),l++)}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),a=l+o}if(Loading.hide(),t>0?Notification.warning(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ${a} \u0646\u0627\u062C\u062D\u060C ${t} \u0641\u0634\u0644.`):Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${a} \u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D.`),i&&i.remove(),this.state.currentTab==="register"){const n=document.getElementById("fire-register-table");n&&(n.innerHTML=this.renderRegisterTable(),this.bindRegisterTableEvents(n))}else this.renderAssets();this.renderStats()}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+a.message)}},parseDate(e){if(!e)return"";if(e instanceof Date)return e.toISOString();if(typeof e=="number"){const a=Math.floor(e),t=e-a,s=new Date(1899,11,30),n=new Date(s.getTime()+a*24*60*60*1e3);if(t>0){const o=Math.round(t*24*60*60),l=Math.floor(o/3600),r=Math.floor(o%3600/60),c=o%60;n.setHours(l,r,c,0)}return n.toISOString()}const i=new Date(e);return isNaN(i.getTime())?"":i.toISOString()},exportToExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644\u0647\u0627...");const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",e.onerror=function(){this.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"},e.onload=()=>this.exportToExcel(),document.head.appendChild(e);return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");try{const i=this.getAssets().map(n=>({\u0627\u0644\u0645\u0635\u0646\u0639:n.factoryName||n.factory||"","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A":n.subLocationName||n.subLocation||"","\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632":n.location||"","\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632":n.type||"","\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645":n.capacity||n.capacityKg||"","\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639":n.siteNumber||n.number||"","\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629":n.manufacturer||"","\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639":n.manufacturingYear||"","\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632":n.serialNumber||"","\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632":n.status||"","\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A":n.installationMethod||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:n.notes||""})),a=XLSX.utils.json_to_sheet(i),t=XLSX.utils.book_new();XLSX.utils.book_append_sheet(t,a,"\u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621");const s=`\u0633\u062C\u0644_\u0645\u0639\u062F\u0627\u062A_\u0627\u0644\u0627\u0637\u0641\u0627\u0621_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(t,s),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+e.message)}},async exportRegisterToPDF(){const e=this.getAssets();if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF...");try{const i=window.open("","_blank");if(!i){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),Loading.hide();return}const a=e.map(s=>`
                <tr>
                    <td>${Utils.escapeHTML(s.factoryName||s.factory||"-")}</td>
                    <td>${Utils.escapeHTML(s.subLocationName||s.subLocation||"-")}</td>
                    <td>${Utils.escapeHTML(s.location||"-")}</td>
                    <td>${Utils.escapeHTML(s.type||"-")}</td>
                    <td>${Utils.escapeHTML(s.capacity||s.capacityKg||"-")}</td>
                    <td>${Utils.escapeHTML(s.siteNumber||s.number||"-")}</td>
                    <td>${Utils.escapeHTML(s.manufacturer||"-")}</td>
                    <td>${Utils.escapeHTML(s.manufacturingYear||"-")}</td>
                    <td>${Utils.escapeHTML(s.serialNumber||"-")}</td>
                    <td>${Utils.escapeHTML(s.status||"-")}</td>
                    <td>${Utils.escapeHTML(s.installationMethod||"-")}</td>
                    <td>${Utils.escapeHTML(s.notes||"-")}</td>
                </tr>
            `).join(""),t=`
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
                            ${a}
                        </tbody>
                    </table>
                    <script>window.onload = () => setTimeout(() => window.print(), 500);<\/script>
                </body>
                </html>
            `;i.document.write(t),i.document.close(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 PDF \u0628\u0646\u062C\u0627\u062D")}catch(i){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 PDF: "+i.message)}},isAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function")return Permissions.isCurrentUserEffectiveAdmin();const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;return!!(e&&(e.role==="admin"||e.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e.role==="system_admin"||e.permissions&&(e.permissions.admin===!0||e.permissions["manage-modules"]===!0)))},hasTabAccess(e){return(typeof AppState<"u"&&AppState?AppState.currentUser:null)?this.isAdmin()?!0:typeof Permissions<"u"?Permissions.hasDetailedPermission("fire-equipment",e):!0:e==="database"},canAdd(){const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;if(!e)return!1;if(this.isAdmin())return!0;const i=e.permissions?.fireEquipment||{};return i.add===!0||i.edit===!0},canEdit(){const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;return e?this.isAdmin()?!0:(e.permissions?.fireEquipment||{}).edit===!0:!1},canDelete(){const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;return e?this.isAdmin()?!0:(e.permissions?.fireEquipment||{}).delete===!0:!1},async deleteAsset(e){if(!this.canDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0623\u062C\u0647\u0632\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062D\u0630\u0641.");return}const i=this.getAssets().find(t=>t.id===e);if(!i){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 "${i.number||e}"\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0648\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B.`)){Loading.show();try{let t=!1;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const r=await GoogleIntegration.sendRequest({action:"deleteFireEquipment",data:{assetId:e}});if(r&&r.success)t=!0,Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend \u0628\u0646\u062C\u0627\u062D");else{const c=r?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend";Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend:",c)}}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend:",r)}else t=!0;const s=this.getAssets(),n=s.findIndex(r=>r.id===e);n>-1&&s.splice(n,1);const o=this.getInspections();if(o.filter(r=>r.assetId===e).forEach(r=>{const c=o.findIndex(f=>f.id===r.id);c>-1&&o.splice(c,1)}),AppState.appData&&AppState.appData.fireEquipmentApprovalRequests){const r=AppState.appData.fireEquipmentApprovalRequests;r.filter(f=>f.assetId===e).forEach(f=>{const d=r.findIndex(p=>p.id===f.id);d>-1&&r.splice(d,1)})}AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentAssets=s,AppState.appData.fireEquipmentInspections=o,typeof DataManager<"u"&&DataManager.save?DataManager.save():(localStorage.setItem("fire_equipment_assets",JSON.stringify(s)),localStorage.setItem("fire_equipment_inspections",JSON.stringify(o))),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u062D\u0644\u064A\u0627\u064B"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0646\u062C\u0627\u062D"),await this.refreshCurrentTab(!0),this.state.currentTab==="database"?(this.refreshFilterOptions(),this.renderSummary()):this.state.currentTab==="register"&&this.updateRegisterStatisticsCards()}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632")}finally{Loading.hide()}}},async renderAnalyticsTab(){return this.isAdmin()?`
            <div class="space-y-6">
                <!-- \u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-filter ml-2"></i>
                            \u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label class="form-label">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                                <input type="date" id="analytics-date-from" class="form-input">
                            </div>
                            <div>
                                <label class="form-label">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                                <input type="date" id="analytics-date-to" class="form-input">
                            </div>
                            <div>
                                <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</label>
                                <select id="analytics-type-filter" class="form-input">
                                    <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <select id="analytics-location-filter" class="form-input">
                                    <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-4 flex gap-2">
                            <button id="analytics-apply-filters" class="btn-primary">
                                <i class="fas fa-search ml-2"></i>
                                \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u062A\u0631\u0629
                            </button>
                            <button id="analytics-reset-filters" class="btn-secondary">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                            </button>
                            <button id="analytics-export-data" class="btn-secondary">
                                <i class="fas fa-download ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                            </button>
                        </div>
                    </div>
                </div>

                <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0639\u0627\u0645\u0629 -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-fire-extinguisher text-4xl text-blue-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</p>
                            <p class="text-3xl font-bold" id="analytics-total-assets">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-check-circle text-4xl text-green-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0623\u062C\u0647\u0632\u0629 \u0635\u0627\u0644\u062D\u0629</p>
                            <p class="text-3xl font-bold text-green-600" id="analytics-active-assets">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-tools text-4xl text-yellow-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0628\u062D\u0627\u062C\u0629 \u0635\u064A\u0627\u0646\u0629</p>
                            <p class="text-3xl font-bold text-yellow-600" id="analytics-maintenance-assets">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-times-circle text-4xl text-red-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</p>
                            <p class="text-3xl font-bold text-red-600" id="analytics-out-service-assets">0</p>
                        </div>
                    </div>
                </div>

                <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-clipboard-check text-4xl text-blue-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</p>
                            <p class="text-3xl font-bold" id="analytics-total-inspections">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-check-double text-4xl text-green-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0643\u062A\u0645\u0644\u0629</p>
                            <p class="text-3xl font-bold text-green-600" id="analytics-completed-inspections">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-exclamation-triangle text-4xl text-yellow-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0641\u062D\u0648\u0635\u0627\u062A \u062A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</p>
                            <p class="text-3xl font-bold text-yellow-600" id="analytics-maintenance-inspections">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-percentage text-4xl text-purple-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0643\u062A\u0645\u0627\u0644</p>
                            <p class="text-3xl font-bold text-purple-600" id="analytics-completion-rate">0%</p>
                        </div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-pie ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-by-type-table"></div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-map-marker-alt ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-by-location-table"></div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u0632\u0645\u0646\u064A \u0644\u0644\u0641\u062D\u0648\u0635\u0627\u062A -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-line ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u0632\u0645\u0646\u064A \u0644\u0644\u0641\u062D\u0648\u0635\u0627\u062A
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-timeline-table"></div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0641\u062A\u0634\u064A\u0646 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-user-check ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0645\u0641\u062A\u0634
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-by-inspector-table"></div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0627\u0644\u0629 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-bar ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-by-status-table"></div>
                    </div>
                </div>
            </div>
        `:'<div class="empty-state"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645</p></div>'},getAnalyticsData(e={}){const i=this.getAssets(),a=this.getInspections();let t=a;(e.dateFrom||e.dateTo)&&(t=a.filter(p=>{const u=new Date(p.checkDate||p.createdAt);if(e.dateFrom&&u<new Date(e.dateFrom))return!1;if(e.dateTo){const g=new Date(e.dateTo);if(g.setHours(23,59,59,999),u>g)return!1}return!0}));let s=i;e.type&&e.type!=="all"&&(s=s.filter(p=>p.type===e.type)),e.location&&e.location!=="all"&&(s=s.filter(p=>p.location===e.location));const n={total:s.length,active:s.filter(p=>p.status==="\u0635\u0627\u0644\u062D").length,needsMaintenance:s.filter(p=>p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:s.filter(p=>p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length},o={total:t.length,completed:t.filter(p=>p.status==="\u0635\u0627\u0644\u062D").length,needsMaintenance:t.filter(p=>p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:t.filter(p=>p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length,completionRate:t.length>0?(t.filter(p=>p.status==="\u0635\u0627\u0644\u062D").length/t.length*100).toFixed(1):0},l={};s.forEach(p=>{const u=p.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";l[u]||(l[u]={total:0,active:0,needsMaintenance:0,outOfService:0}),l[u].total++,p.status==="\u0635\u0627\u0644\u062D"?l[u].active++:p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?l[u].needsMaintenance++:p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&l[u].outOfService++});const r={};s.forEach(p=>{const u=p.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[u]||(r[u]={total:0,active:0,needsMaintenance:0,outOfService:0}),r[u].total++,p.status==="\u0635\u0627\u0644\u062D"?r[u].active++:p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?r[u].needsMaintenance++:p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&r[u].outOfService++});const c={};t.forEach(p=>{const u=new Date(p.checkDate||p.createdAt),g=`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`,S=u.toLocaleDateString("ar-SA",{year:"numeric",month:"long"});c[g]||(c[g]={label:S,total:0,completed:0,needsMaintenance:0,outOfService:0}),c[g].total++,p.status==="\u0635\u0627\u0644\u062D"?c[g].completed++:p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?c[g].needsMaintenance++:p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&c[g].outOfService++});const f={};t.forEach(p=>{const u=p.inspector||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";f[u]||(f[u]={total:0,completed:0,needsMaintenance:0,outOfService:0}),f[u].total++,p.status==="\u0635\u0627\u0644\u062D"?f[u].completed++:p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?f[u].needsMaintenance++:p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&f[u].outOfService++});const d={\u0635\u0627\u0644\u062D:t.filter(p=>p.status==="\u0635\u0627\u0644\u062D").length,"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629":t.filter(p=>p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629":t.filter(p=>p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length};return{assetStats:n,inspectionStats:o,byType:l,byLocation:r,byMonth:c,byInspector:f,byStatus:d}},renderAnalyticsData(){if(!this.isAdmin()||!document.getElementById("fire-tab-content")||this.state.currentTab!=="analytics")return;const i=document.getElementById("analytics-date-from")?.value||"",a=document.getElementById("analytics-date-to")?.value||"",t=document.getElementById("analytics-type-filter")?.value||"all",s=document.getElementById("analytics-location-filter")?.value||"all",n={dateFrom:i,dateTo:a,type:t,location:s},o=this.getAnalyticsData(n),l=document.getElementById("analytics-total-assets");l&&(l.textContent=o.assetStats.total);const r=document.getElementById("analytics-active-assets");r&&(r.textContent=o.assetStats.active);const c=document.getElementById("analytics-maintenance-assets");c&&(c.textContent=o.assetStats.needsMaintenance);const f=document.getElementById("analytics-out-service-assets");f&&(f.textContent=o.assetStats.outOfService);const d=document.getElementById("analytics-total-inspections");d&&(d.textContent=o.inspectionStats.total);const p=document.getElementById("analytics-completed-inspections");p&&(p.textContent=o.inspectionStats.completed);const u=document.getElementById("analytics-maintenance-inspections");u&&(u.textContent=o.inspectionStats.needsMaintenance);const g=document.getElementById("analytics-completion-rate");g&&(g.textContent=o.inspectionStats.completionRate+"%");const S=document.getElementById("analytics-by-type-table");if(S){const w=this.renderAnalyticsTable(o.byType,["\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0635\u0627\u0644\u062D","\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629","\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"]);S.innerHTML=w}const A=document.getElementById("analytics-by-location-table");if(A){const w=this.renderAnalyticsTable(o.byLocation,["\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0635\u0627\u0644\u062D","\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629","\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"]);A.innerHTML=w}const m=document.getElementById("analytics-timeline-table");if(m){const w=this.renderTimelineTable(o.byMonth);m.innerHTML=w}const v=document.getElementById("analytics-by-inspector-table");if(v){const w=this.renderAnalyticsTable(o.byInspector,["\u0627\u0644\u0645\u0641\u062A\u0634","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0645\u0643\u062A\u0645\u0644","\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629","\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"],["total","completed","needsMaintenance","outOfService"]);v.innerHTML=w}const x=document.getElementById("analytics-by-status-table");if(x){const w=this.renderStatusTable(o.byStatus);x.innerHTML=w}},renderAnalyticsTable(e,i,a=["total","active","needsMaintenance","outOfService"]){if(!e||Object.keys(e).length===0)return'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>';const t=Object.entries(e).sort((s,n)=>n[1].total-s[1].total).map(([s,n])=>`
                    <tr>
                        <td class="font-semibold">${Utils.escapeHTML(s)}</td>
                        <td>${n.total||0}</td>
                        <td>${n[a[1]]||0}</td>
                        <td>${n[a[2]]||0}</td>
                        <td>${n[a[3]]||0}</td>
                    </tr>
                `).join("");return`
            <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            ${i.map(s=>`<th style="min-width: 100px; word-wrap: break-word;">${s}</th>`).join("")}
                        </tr>
                    </thead>
                    <tbody>
                        ${t}
                    </tbody>
                </table>
            </div>
        `},renderTimelineTable(e){return!e||Object.keys(e).length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0632\u0645\u0646\u064A\u0629 \u0644\u0644\u0639\u0631\u0636</p></div>':`
            <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 120px;">\u0627\u0644\u0634\u0647\u0631</th>
                            <th style="min-width: 100px;">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>
                            <th style="min-width: 100px;">\u0645\u0643\u062A\u0645\u0644</th>
                            <th style="min-width: 120px;">\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</th>
                            <th style="min-width: 120px;">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(e).sort((a,t)=>a[0].localeCompare(t[0])).map(([a,t])=>`
                    <tr>
                        <td class="font-semibold">${Utils.escapeHTML(t.label)}</td>
                        <td>${t.total||0}</td>
                        <td>${t.completed||0}</td>
                        <td>${t.needsMaintenance||0}</td>
                        <td>${t.outOfService||0}</td>
                    </tr>
                `).join("")}
                    </tbody>
                </table>
            </div>
        `},renderStatusTable(e){if(!e||Object.keys(e).length===0)return'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>';const i=Object.values(e).reduce((t,s)=>t+s,0);return`
            <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 120px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th style="min-width: 100px;">\u0627\u0644\u0639\u062F\u062F</th>
                            <th style="min-width: 100px;">\u0627\u0644\u0646\u0633\u0628\u0629</th>
                            <th style="min-width: 150px;">\u0627\u0644\u062A\u0645\u062B\u064A\u0644</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(e).map(([t,s])=>{const n=i>0?(s/i*100).toFixed(1):0;let o="badge-info";return t==="\u0635\u0627\u0644\u062D"?o="badge-success":t==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?o="badge-warning":t==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&(o="badge-danger"),`
                    <tr>
                        <td><span class="badge ${o}">${Utils.escapeHTML(t)}</span></td>
                        <td class="font-semibold">${s}</td>
                        <td>${n}%</td>
                        <td>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${n}%"></div>
                            </div>
                        </td>
                    </tr>
                `}).join("")}
                    </tbody>
                </table>
            </div>
        `},setupAnalyticsEventListeners(){const e=this.getAssets(),i=document.getElementById("analytics-type-filter"),a=document.getElementById("analytics-location-filter");if(i){const o=Array.from(new Set(e.map(l=>l.type).filter(Boolean)));i.innerHTML='<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>'+o.map(l=>`<option value="${Utils.escapeHTML(l)}">${Utils.escapeHTML(l)}</option>`).join("")}if(a){const o=Array.from(new Set(e.map(l=>l.location).filter(Boolean)));a.innerHTML='<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>'+o.map(l=>`<option value="${Utils.escapeHTML(l)}">${Utils.escapeHTML(l)}</option>`).join("")}const t=document.getElementById("analytics-apply-filters");if(t){const o=t.cloneNode(!0);t.parentNode.replaceChild(o,t),o.addEventListener("click",()=>{this.renderAnalyticsData()})}const s=document.getElementById("analytics-reset-filters");if(s){const o=s.cloneNode(!0);s.parentNode.replaceChild(o,s),o.addEventListener("click",()=>{document.getElementById("analytics-date-from").value="",document.getElementById("analytics-date-to").value="",document.getElementById("analytics-type-filter").value="all",document.getElementById("analytics-location-filter").value="all",this.renderAnalyticsData()})}const n=document.getElementById("analytics-export-data");if(n){const o=n.cloneNode(!0);n.parentNode.replaceChild(o,n),o.addEventListener("click",()=>{this.exportAnalyticsData()})}this.renderAnalyticsData()},exportAnalyticsData(){try{const e=document.getElementById("analytics-date-from")?.value||"",i=document.getElementById("analytics-date-to")?.value||"",a=document.getElementById("analytics-type-filter")?.value||"all",t=document.getElementById("analytics-location-filter")?.value||"all",s={dateFrom:e,dateTo:i,type:a,location:t},n=this.getAnalyticsData(s),o=this.getAssets(),l=this.getInspections();let r=`\u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642
`;r+=`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${new Date().toLocaleDateString("ar-SA")}

`,r+=`\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0623\u062C\u0647\u0632\u0629
`,r+=`\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A,\u0635\u0627\u0644\u062D,\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629,\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629
`,r+=`${n.assetStats.total},${n.assetStats.active},${n.assetStats.needsMaintenance},${n.assetStats.outOfService}

`,r+=`\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A
`,r+=`\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A,\u0645\u0643\u062A\u0645\u0644,\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629,\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629,\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0643\u062A\u0645\u0627\u0644
`,r+=`${n.inspectionStats.total},${n.inspectionStats.completed},${n.inspectionStats.needsMaintenance},${n.inspectionStats.outOfService},${n.inspectionStats.completionRate}%

`,r+=`\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639
`,r+=`\u0627\u0644\u0646\u0648\u0639,\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A,\u0635\u0627\u0644\u062D,\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629,\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629
`,Object.entries(n.byType).sort((p,u)=>u[1].total-p[1].total).forEach(([p,u])=>{r+=`${p},${u.total},${u.active},${u.needsMaintenance},${u.outOfService}
`}),r+=`
`,r+=`\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639
`,r+=`\u0627\u0644\u0645\u0648\u0642\u0639,\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A,\u0635\u0627\u0644\u062D,\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629,\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629
`,Object.entries(n.byLocation).sort((p,u)=>u[1].total-p[1].total).forEach(([p,u])=>{r+=`${p},${u.total},${u.active},${u.needsMaintenance},${u.outOfService}
`});const c=new Blob(["\uFEFF"+r],{type:"text/csv;charset=utf-8;"}),f=document.createElement("a"),d=URL.createObjectURL(c);f.setAttribute("href",d),f.setAttribute("download",`\u062A\u062D\u0644\u064A\u0644_\u0645\u0639\u062F\u0627\u062A_\u0627\u0644\u062D\u0631\u064A\u0642_${new Date().toISOString().slice(0,10)}.csv`),f.style.visibility="hidden",document.body.appendChild(f),f.click(),document.body.removeChild(f),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+e.message)}},async renderApprovalRequestsTab(){if(!this.isAdmin())return'<div class="empty-state"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.</p></div>';this.ensureData();try{const t=await this.loadApprovalRequestsFromBackend();t&&t.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${t.length} \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 Backend`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",t)}const e=this.getApprovalRequests();if(!e||!Array.isArray(e))return Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u062A\u0627\u062D\u0629"),'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p></div>';const a=[...e].sort((t,s)=>{const n={pending:1,approved:2,rejected:3},o=n[t.status]||99,l=n[s.status]||99;if(o!==l)return o-l;const r=new Date(t.requestedAt||0);return new Date(s.requestedAt||0)-r}).map(t=>{const s=t.status==="approved"?'<span class="badge badge-success"><i class="fas fa-check-circle ml-1"></i>\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>':t.status==="rejected"?'<span class="badge badge-danger"><i class="fas fa-times-circle ml-1"></i>\u0645\u0631\u0641\u0648\u0636</span>':'<span class="badge badge-warning"><i class="fas fa-clock ml-1"></i>\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',n=t.type==="inspection"?'<i class="fas fa-clipboard-check ml-1"></i>\u0641\u062D\u0635 \u0634\u0647\u0631\u064A':t.type==="add"?'<i class="fas fa-plus-circle ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632':t.type==="edit"?'<i class="fas fa-edit ml-1"></i>\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0627\u0632':t.type==="delete"?'<i class="fas fa-trash ml-1"></i>\u062D\u0630\u0641 \u062C\u0647\u0627\u0632':'<i class="fas fa-question-circle ml-1"></i>\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F',o=this.getAssets().find(r=>r.id===t.assetId||r.number===t.assetNumber),l=o?`${o.number||o.id} - ${o.location||""}`:t.assetNumber||t.assetId||"-";return`
                <tr data-request-id="${t.id}" data-status="${t.status||"pending"}" style="${t.status==="pending"?"background-color: rgba(255, 193, 7, 0.05);":""}">
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(t.id||"-")}</div>
                        ${t.status==="pending"?'<div class="text-xs text-yellow-600 mt-1"><i class="fas fa-exclamation-circle ml-1"></i>\u064A\u062A\u0637\u0644\u0628 \u0645\u0631\u0627\u062C\u0639\u0629</div>':""}
                    </td>
                    <td>${n}</td>
                    <td>
                        <div class="font-semibold">${Utils.escapeHTML(l)}</div>
                        ${o?`<div class="text-xs text-gray-500">${Utils.escapeHTML(o.type||"")}</div>`:""}
                    </td>
                    <td>
                        <div class="font-semibold">${Utils.escapeHTML(t.requestedBy||t.userName||"-")}</div>
                        ${t.userEmail?`<div class="text-xs text-gray-500">${Utils.escapeHTML(t.userEmail)}</div>`:""}
                    </td>
                    <td>
                        <div>${t.requestedAt?Utils.formatDate(t.requestedAt):"-"}</div>
                        ${t.approvedAt||t.rejectedAt?`<div class="text-xs text-gray-500 mt-1">
                                ${t.status==="approved"&&t.approvedAt?`\u0645\u0648\u0627\u0641\u0642: ${Utils.formatDate(t.approvedAt)}`:""}
                                ${t.status==="rejected"&&t.rejectedAt?`\u0645\u0631\u0641\u0648\u0636: ${Utils.formatDate(t.rejectedAt)}`:""}
                            </div>`:""}
                    </td>
                    <td>${s}</td>
                    <td style="word-wrap: break-word; max-width: 200px; white-space: normal;">
                        <div class="text-sm">${Utils.escapeHTML(t.comments||t.reason||"-")}</div>
                        ${t.rejectionReason?`<div class="text-xs text-red-600 mt-1"><i class="fas fa-info-circle ml-1"></i>\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636: ${Utils.escapeHTML(t.rejectionReason)}</div>`:""}
                    </td>
                    <td>
                        <div class="flex flex-wrap gap-2">
                            ${t.status==="pending"?`
                            <button class="btn-icon btn-icon-success" data-action="approve-request" data-id="${t.id}" title="\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="btn-icon btn-icon-danger" data-action="reject-request" data-id="${t.id}" title="\u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-times"></i>
                            </button>
                            `:""}
                            <button class="btn-icon btn-icon-primary" data-action="view-request" data-id="${t.id}" title="\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${t.status==="pending"?`
                            <button class="btn-icon btn-icon-warning" data-action="edit-request" data-id="${t.id}" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-edit"></i>
                            </button>
                            `:""}
                            <button class="btn-icon btn-icon-danger" data-action="delete-request" data-id="${t.id}" title="\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628">
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
                                    ${a}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            </div>
        `},async loadApprovalRequestsFromBackend(){try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const i=await GoogleIntegration.sendRequest({action:"getFireEquipmentApprovalRequests",data:{}});if(i&&i.success&&i.data){AppState.appData||(AppState.appData={});const a=Array.isArray(i.data)?i.data:[],s=[...AppState.appData.fireEquipmentApprovalRequests||[]];return a.forEach(n=>{const o=s.findIndex(l=>l.id===n.id);o>=0?s[o]={...s[o],...n}:s.push(n)}),AppState.appData.fireEquipmentApprovalRequests=s,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(s)),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${s.length} \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 (${a.length} \u0645\u0646 Backend)`),s}else Utils.safeWarn("\u26A0\uFE0F \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629 \u0645\u0646 Backend:",i)}else Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u0623\u0648 \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")}catch(i){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 Backend:",i)}return this.getApprovalRequests()||[]},getApprovalRequests(){if(AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests&&Array.isArray(AppState.appData.fireEquipmentApprovalRequests))return AppState.appData.fireEquipmentApprovalRequests;const e=localStorage.getItem("fire_equipment_approval_requests");if(e)try{const i=JSON.parse(e);if(Array.isArray(i))return AppState.appData.fireEquipmentApprovalRequests=i,i}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 localStorage:",i)}return AppState.appData.fireEquipmentApprovalRequests=[],[]},setupApprovalRequestsEventListeners(){const e=document.getElementById("approval-requests-search");if(e){const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),t.addEventListener("input",s=>{const n=s.target.value.toLowerCase();document.querySelectorAll("#approval-requests-table-body tr[data-request-id]").forEach(l=>{const r=l.textContent.toLowerCase();l.style.display=r.includes(n)?"":"none"})})}const i=document.getElementById("approval-requests-refresh");if(i){const t=i.cloneNode(!0);i.parentNode&&i.parentNode.replaceChild(t,i),t.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation();try{Loading.show(),await this.loadApprovalRequestsFromBackend(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),await this.switchTab("approval-requests"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",n),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628\u0627\u062A")}finally{Loading.hide()}})}const a=document.getElementById("approval-requests-table-body");a&&a.addEventListener("click",async t=>{const s=t.target.closest("[data-action]");if(!s)return;const n=s.dataset.action,o=s.dataset.id;switch(n){case"approve-request":await this.approveRequest(o);break;case"reject-request":await this.rejectRequest(o);break;case"view-request":await this.viewRequest(o);break;case"edit-request":await this.editRequest(o);break;case"delete-request":await this.deleteRequest(o);break}})},async approveRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F")){Loading.show();try{const a=this.getApprovalRequests(),t=a.find(s=>s.id===e);if(!t){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}if(t.status="approved",t.approvedBy=AppState.currentUser?.name||AppState.currentUser?.email||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",t.approvedAt=new Date().toISOString(),AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=a,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(a)),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const s=await GoogleIntegration.sendRequest({action:"updateFireEquipmentApprovalRequest",data:{requestId:e,status:"approved",approvedBy:t.approvedBy,approvedAt:t.approvedAt}});s&&!s.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u064A Backend:",s.message):Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A Backend \u0628\u0646\u062C\u0627\u062D")}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A Backend:",s)}Notification.success("\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),this.notifyUserAboutRequestStatus(t,"approved").catch(s=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",s)}),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&RealtimeSyncManager.notifyChange("fireEquipmentApprovalRequests","update",e),await this.switchTab("approval-requests"),t.type==="inspection"&&t.assetId&&setTimeout(()=>{this.switchTab("inspections").then(()=>{setTimeout(()=>{this.showInspectionForm(null,t.assetId)},300)})},500)}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},async rejectRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}const i=prompt("\u0623\u062F\u062E\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(i!==null){Loading.show();try{const a=this.getApprovalRequests(),t=a.find(s=>s.id===e);if(!t){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}if(t.status="rejected",t.rejectedBy=AppState.currentUser?.name||AppState.currentUser?.email||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",t.rejectedAt=new Date().toISOString(),t.rejectionReason=i||"",AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=a,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(a)),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const s=await GoogleIntegration.sendRequest({action:"updateFireEquipmentApprovalRequest",data:{requestId:e,status:"rejected",rejectedBy:t.rejectedBy,rejectedAt:t.rejectedAt,rejectionReason:t.rejectionReason}});s&&!s.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u064A Backend:",s.message):Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0641\u0636 \u0641\u064A Backend \u0628\u0646\u062C\u0627\u062D")}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0631\u0641\u0636 \u0641\u064A Backend:",s)}Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),this.notifyUserAboutRequestStatus(t,"rejected",i).catch(s=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",s)}),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&RealtimeSyncManager.notifyChange("fireEquipmentApprovalRequests","update",e),await this.switchTab("approval-requests")}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},async notifyUserAboutRequestStatus(e,i,a=""){try{const t=e.requestedById||e.userEmail||"";if(!t){Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631: \u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=e.assetNumber||e.assetId||"\u062C\u0647\u0627\u0632 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F";let n,o,l;if(i==="approved")n="\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628\u0643",o=`\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628\u0643 \u0644\u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632: ${s}`,l="success";else if(i==="rejected")n="\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628\u0643",o=`\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628\u0643 \u0644\u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632: ${s}${a?`. \u0627\u0644\u0633\u0628\u0628: ${a}`:""}`,l="error";else return;GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:t,title:n,message:o,type:l,priority:i==="approved"?"normal":"high",link:"#fire-equipment-inspections",data:{module:"fire-equipment",action:"inspection_approval_status",requestId:e.id,status:i}}}).catch(r=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",r)}),Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u062E\u0635\u0648\u0635 \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628: ${i}`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628:",t)}},async viewRequest(e){const a=this.getApprovalRequests().find(l=>l.id===e);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const t=this.getAssets().find(l=>l.id===a.assetId||l.number===a.assetNumber),s=a.status==="approved"?'<span class="badge badge-success"><i class="fas fa-check-circle ml-1"></i>\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>':a.status==="rejected"?'<span class="badge badge-danger"><i class="fas fa-times-circle ml-1"></i>\u0645\u0631\u0641\u0648\u0636</span>':'<span class="badge badge-warning"><i class="fas fa-clock ml-1"></i>\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',n=a.type==="inspection"?"\u0641\u062D\u0635 \u0634\u0647\u0631\u064A":a.type==="add"?"\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632":a.type==="edit"?"\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0627\u0632":a.type==="delete"?"\u062D\u0630\u0641 \u062C\u0647\u0627\u0632":"\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",o=document.createElement("div");o.className="modal-overlay fire-modal",o.innerHTML=`
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
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(a.id||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(n)}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.assetNumber||a.assetId||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0627\u0632:</label>
                                <p class="text-gray-800">${t?`${Utils.escapeHTML(t.number||t.id)} - ${Utils.escapeHTML(t.location||"")}`:"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.requestedBy||a.userName||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.userEmail||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800">${a.requestedAt?Utils.formatDate(a.requestedAt):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <p class="text-gray-800">${s}</p>
                            </div>
                            ${a.status==="approved"?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647 \u0645\u0646:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.approvedBy||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:</label>
                                <p class="text-gray-800">${a.approvedAt?Utils.formatDate(a.approvedAt):"-"}</p>
                            </div>
                            `:""}
                            ${a.status==="rejected"?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0631\u0641\u0648\u0636 \u0645\u0646:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.rejectedBy||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0641\u0636:</label>
                                <p class="text-gray-800">${a.rejectedAt?Utils.formatDate(a.rejectedAt):"-"}</p>
                            </div>
                            `:""}
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A / \u0627\u0644\u0633\u0628\u0628:</label>
                            <p class="text-gray-800 bg-gray-50 p-3 rounded-lg border">${Utils.escapeHTML(a.comments||a.reason||"-")}</p>
                        </div>
                        ${a.rejectionReason?`
                        <div>
                            <label class="text-sm font-semibold text-red-600">\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:</label>
                            <p class="text-red-800 bg-red-50 p-3 rounded-lg border border-red-200">${Utils.escapeHTML(a.rejectionReason)}</p>
                        </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer" style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 0.75rem;">
                    <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times ml-2"></i>
                        \u0625\u063A\u0644\u0627\u0642
                    </button>
                </div>
            </div>
        `,document.body.appendChild(o)},async editRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}const i=this.getApprovalRequests(),a=i.find(s=>s.id===e);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const t=prompt("\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:",a.comments||"");if(t!==null){Loading.show();try{a.comments=t,a.updatedAt=new Date().toISOString(),AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=i,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(i)),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),await this.switchTab("approval-requests")}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628:",s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},async deleteRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F")){Loading.show();try{const a=this.getApprovalRequests(),t=a.findIndex(s=>s.id===e);if(t===-1){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}a.splice(t,1),AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=a,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(a)),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&await GoogleIntegration.sendRequest({action:"deleteFireEquipmentApprovalRequest",data:{requestId:e}}).catch(s=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628 \u0645\u0646 Google Sheets:",s)}),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),await this.switchTab("approval-requests")}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,i)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${i+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions(),i=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(o){return String(o??"")},a='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>'+(e||[]).map(function(o){return'<option value="'+i(o.id)+'">'+i(o.name)+"</option>"}).join("");["asset-factory","fire-assets-location"].forEach(function(o){var l=document.getElementById(o);if(l&&l.tagName==="SELECT"){var r=l.value;l.innerHTML=a,r&&(l.value=r)}});var t=document.getElementById("asset-sub-location");if(t&&t.tagName==="SELECT"){var s=(document.getElementById("asset-factory")||{}).value,n=this.getPlaceOptions(s);t.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+(n||[]).map(function(o){return'<option value="'+i(o.id)+'">'+i(o.name)+"</option>"}).join("")}}catch(o){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F FireEquipment.refreshSiteDropdowns:",o)}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(t=>t.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const t=Permissions.formSettingsState.sites.find(s=>s.id===e);if(t&&Array.isArray(t.places))return t.places.map(s=>({id:s.id,name:s.name}))}if(Array.isArray(AppState.appData?.observationSites)){const t=AppState.appData.observationSites.find(s=>(s.id||s.siteId)===e);if(t)return(Array.isArray(t.places)?t.places:Array.isArray(t.locations)?t.locations:Array.isArray(t.children)?t.children:Array.isArray(t.areas)?t.areas:[]).map((n,o)=>({id:n.id||n.placeId||n.value||Utils.generateId("PLACE"),name:n.name||n.placeName||n.title||n.label||n.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const t=DailyObservations.DEFAULT_SITES.find(s=>(s.id||s.siteId)===e);if(t)return(Array.isArray(t.places)?t.places:Array.isArray(t.locations)?t.locations:Array.isArray(t.children)?t.children:Array.isArray(t.areas)?t.areas:[]).map((n,o)=>({id:n.id||n.placeId||n.value||Utils.generateId("PLACE"),name:n.name||n.placeName||n.title||n.label||n.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(i){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0641\u0631\u0639\u064A\u0629:",i),[]}}},(function(){"use strict";try{typeof window<"u"&&typeof FireEquipment<"u"&&(window.FireEquipment=FireEquipment,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 FireEquipment module loaded and available on window.FireEquipment"))}catch{if(typeof window<"u"&&typeof FireEquipment<"u")try{window.FireEquipment=FireEquipment}catch{}}})();
