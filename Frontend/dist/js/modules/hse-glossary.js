(()=>{"use strict";if(!(typeof window>"u")&&!window.HseTechnicalGuideInitialized){window.HseTechnicalGuideInitialized=!0;try{let v=function(){return typeof window.HseFeatureFlags<"u"&&typeof window.HseFeatureFlags.isEnabled=="function"?window.HseFeatureFlags.isEnabled("glossary_overlay"):!0},T=function(){if(document.getElementById("hseTgFloatingBtn"))return;const e=document.createElement("button");e.type="button",e.id="hseTgFloatingBtn",e.className="hse-tg-float-btn",e.setAttribute("aria-label","\u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u0641\u0646\u064A \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0637\u0631"),e.title="\u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u0641\u0646\u064A \u0644\u0644\u0645\u0631\u0627\u0642\u0628 \u0648\u0641\u0646\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Ctrl + G)",e.innerHTML=`
                <div class="hse-tg-float-icon">
                    <i class="fas fa-book-bookmark"></i>
                </div>
                <div class="hse-tg-float-text">
                    <span class="hse-tg-float-main">\u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u0631\u0627\u0642\u0628 \u0627\u0644\u0641\u0646\u064A</span>
                    <span class="hse-tg-float-sub">\u0645\u0639\u0627\u064A\u064A\u0631 \u0648\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</span>
                </div>
            `,e.onclick=a=>{a.preventDefault(),u()},document.body.appendChild(e),h=e,m()},m=function(){const e=v();h&&(h.style.display=e?"inline-flex":"none"),!e&&n&&n.classList.contains("is-open")&&c()},C=function(){if(document.getElementById("hseTgModalBackdrop"))return document.getElementById("hseTgModalBackdrop");const e=document.createElement("div");return e.id="hseTgModalBackdrop",e.className="hse-tg-modal-backdrop",e.innerHTML=`
                <div class="hse-tg-modal-dialog" role="dialog" aria-modal="true">
                    <!-- Modal Header -->
                    <div class="hse-tg-modal-header">
                        <div class="hse-tg-header-info">
                            <div class="hse-tg-header-badge">
                                <i class="fas fa-shield-halved"></i> ICAPP HSE TECHNICAL STANDARDS
                            </div>
                            <h3 class="hse-tg-header-title">
                                <i class="fas fa-book-bookmark text-amber-500"></i>
                                \u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u0641\u0646\u064A \u0644\u0645\u0631\u0627\u0642\u0628\u064A \u0648\u0641\u0646\u064A\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629
                            </h3>
                            <p class="hse-tg-header-subtitle">
                                \u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0644\u062D\u0633\u0645 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629\u060C \u0648\u062A\u062F\u0642\u064A\u0642 \u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0631\u0648\u0631\u060C \u0648\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0637\u0628\u0642\u0627\u064B \u0644\u0645\u0639\u0627\u064A\u064A\u0631 OSHA \u0648 ISO 45001.
                            </p>
                        </div>
                        <button type="button" class="hse-tg-close-btn" id="hseTgCloseBtn" title="\u0625\u063A\u0644\u0627\u0642">&times;</button>
                    </div>

                    <!-- Search & Filter Controls -->
                    <div class="hse-tg-controls-bar">
                        <div class="hse-tg-search-wrapper">
                            <i class="fas fa-search hse-tg-search-icon"></i>
                            <input type="text" id="hseTgSearchInput" class="hse-tg-search-input" placeholder="\u0627\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631 (\u0645\u062B\u0627\u0644: \u0637\u0641\u0627\u064A\u0627\u062A\u060C LOTO\u060C \u0644\u062D\u0627\u0645\u060C 11 \u0645\u062A\u0631\u060C \u062E\u0637\u0631 \u0639\u0627\u0644\u064A\u060C 5S)..." autocomplete="off" />
                            <button type="button" id="hseTgClearSearchBtn" class="hse-tg-clear-btn" style="display:none;" title="\u0645\u0633\u062D">&times;</button>
                        </div>

                        <div class="hse-tg-tabs-scroll">
                            <div class="hse-tg-tabs-list" id="hseTgTabsList">
                                <button type="button" class="hse-tg-tab-btn is-active" data-cat="all">
                                    <i class="fas fa-list-check"></i> \u0627\u0644\u0643\u0644 (${b.length})
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="risk_matrix">
                                    <i class="fas fa-triangle-exclamation"></i> \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="inspection">
                                    <i class="fas fa-clipboard-check"></i> \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="loto">
                                    <i class="fas fa-lock"></i> \u0639\u0632\u0644 \u0627\u0644\u0637\u0627\u0642\u0629 (LOTO)
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="ptw">
                                    <i class="fas fa-file-signature"></i> \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (PTW)
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="storage">
                                    <i class="fas fa-cubes-stacked"></i> \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0648 5S
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="ppe">
                                    <i class="fas fa-helmet-safety"></i> \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 (PPE)
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Standards Cards Body -->
                    <div class="hse-tg-modal-body" id="hseTgCardsContainer">
                        <!-- Dynamic Cards Injected Here -->
                    </div>

                    <!-- Modal Footer -->
                    <div class="hse-tg-modal-footer">
                        <div class="hse-tg-footer-note">
                            <i class="fas fa-info-circle text-blue-500"></i>
                            <span>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 <b>\xAB\u0646\u0633\u062E \u0627\u0644\u0645\u0639\u064A\u0627\u0631\xBB</b> \u0644\u0646\u0642\u0644 \u0627\u0644\u0646\u0635 \u0648\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u0628\u0627\u0634\u0631\u0629 \u062F\u0627\u062E\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u064A\u0648\u0645\u064A\u0629.</span>
                        </div>
                        <button type="button" class="hse-tg-done-btn" id="hseTgDoneBtn">
                            <i class="fas fa-check"></i> \u0625\u063A\u0644\u0627\u0642
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(e),n=e,L(e),e},L=function(e){const a=e.querySelector("#hseTgCloseBtn"),r=e.querySelector("#hseTgDoneBtn"),o=e.querySelector("#hseTgSearchInput"),s=e.querySelector("#hseTgClearSearchBtn"),i=e.querySelector("#hseTgTabsList");a&&(a.onclick=c),r&&(r.onclick=c),e.onclick=t=>{t.target===e&&c()},o&&(o.oninput=()=>{const t=o.value.trim().toLowerCase();s&&(s.style.display=t?"block":"none"),p(t,l)}),s&&(s.onclick=()=>{o&&(o.value="",o.focus()),s.style.display="none",p("",l)}),i&&(i.onclick=t=>{const g=t.target.closest(".hse-tg-tab-btn");if(!g)return;i.querySelectorAll(".hse-tg-tab-btn").forEach(y=>y.classList.remove("is-active")),g.classList.add("is-active"),l=g.getAttribute("data-cat")||"all";const f=o?o.value.trim().toLowerCase():"";p(f,l)})},p=function(e="",a="all"){const r=document.getElementById("hseTgCardsContainer");if(!r)return;const o=(e||"").toLowerCase().trim(),s=b.filter(t=>a==="all"||t.category===a?o?[t.titleAr,t.titleEn,t.refStd,t.badge,t.recommendedActionAr,...t.criteriaAr||[]].join(" ").toLowerCase().includes(o):!0:!1);if(s.length===0){r.innerHTML=`
                    <div class="hse-tg-empty-state">
                        <i class="fas fa-search-minus"></i>
                        <h4>\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0639\u064A\u0627\u0631 \u0645\u0637\u0627\u0628\u0642 \u0644\u0644\u0628\u062D\u062B</h4>
                        <p>\u062C\u0631\u0651\u0628 \u0627\u0644\u0628\u062D\u062B \u0628\u0643\u0644\u0645\u0627\u062A \u0639\u0627\u0645\u0629 \u0645\u062B\u0644 (\u0644\u062D\u0627\u0645\u060C \u0637\u0641\u0627\u064A\u0629\u060C \u0644\u0648\u062A\u0648\u060C \u0643\u0647\u0631\u0628\u0627\u0621\u060C \u0627\u0631\u062A\u0641\u0627\u0639\u060C \u062E\u0637\u0648\u0631\u0629).</p>
                    </div>
                `;return}let i="";s.forEach(t=>{const g=(t.criteriaAr||[]).map(y=>`
                    <li><i class="fas fa-circle-check"></i> <span>${d(y)}</span></li>
                `).join(""),f=`[\u0645\u0639\u064A\u0627\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F: ${t.titleAr} (${t.refStd})]
- \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A: ${t.criteriaAr.join(" | ")}
- \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628: ${t.recommendedActionAr}`;i+=`
                    <div class="hse-tg-card" id="tgCard_${t.id}">
                        <div class="hse-tg-card-header">
                            <div class="hse-tg-card-title-group">
                                <span class="hse-tg-badge ${t.badgeClass||""}">${d(t.badge)}</span>
                                <h4 class="hse-tg-card-title">${d(t.titleAr)}</h4>
                                <span class="hse-tg-card-subtitle">${d(t.titleEn)} \u2022 <b>${d(t.refStd)}</b></span>
                            </div>
                            <button type="button" class="hse-tg-copy-btn" onclick="HseTechnicalGuide.copyStandardText('${t.id}', this)" title="\u0646\u0633\u062E \u0646\u0635 \u0627\u0644\u0645\u0639\u064A\u0627\u0631 \u0627\u0644\u0641\u0646\u064A">
                                <i class="fas fa-copy"></i> <span>\u0646\u0633\u062E \u0627\u0644\u0645\u0639\u064A\u0627\u0631</span>
                            </button>
                        </div>

                        <div class="hse-tg-card-body">
                            <div class="hse-tg-section-label">
                                <i class="fas fa-list-check text-blue-500"></i> \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0641\u0646\u064A\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0648\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629:
                            </div>
                            <ul class="hse-tg-criteria-list">
                                ${g}
                            </ul>

                            <div class="hse-tg-action-box">
                                <div class="hse-tg-action-label">
                                    <i class="fas fa-bolt-lightning text-amber-500"></i> \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0627\u0644\u0641\u0648\u0631\u064A \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647:
                                </div>
                                <p class="hse-tg-action-text">${d(t.recommendedActionAr)}</p>
                            </div>
                        </div>

                        <!-- Hidden data for copy -->
                        <textarea id="tgText_${t.id}" style="display:none;" readonly>${d(f)}</textarea>
                    </div>
                `}),r.innerHTML=i},E=function(e,a){const r=document.getElementById(`tgText_${e}`);if(!r)return;const o=r.value;navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(o).then(()=>{A(a)}).catch(()=>{k(r,a)}):k(r,a)},k=function(e,a){e.style.display="block",e.select();try{document.execCommand("copy"),A(a)}catch{}e.style.display="none"},A=function(e){if(!e)return;const a=e.innerHTML;e.classList.add("is-copied"),e.innerHTML='<i class="fas fa-check"></i> <span>\u062A\u0645 \u0627\u0644\u0646\u0633\u062E!</span>',setTimeout(()=>{e.classList.remove("is-copied"),e.innerHTML=a},1800)},u=function(e=null,a=null){S();const r=C();if(e){l=e;const i=r.querySelector("#hseTgTabsList");i&&i.querySelectorAll(".hse-tg-tab-btn").forEach(t=>{t.getAttribute("data-cat")===e?t.classList.add("is-active"):t.classList.remove("is-active")})}const o=r.querySelector("#hseTgSearchInput");if(a&&o){o.value=a;const i=r.querySelector("#hseTgClearSearchBtn");i&&(i.style.display="block")}const s=o?o.value.trim().toLowerCase():"";p(s,l),r.classList.add("is-open"),document.body.style.overflow="hidden",o&&!a&&setTimeout(()=>o.focus(),150)},c=function(){n&&(n.classList.remove("is-open"),document.body.style.overflow="")},d=function(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""},S=function(){if(document.getElementById("hseTechnicalGuideStyles"))return;const e=`
                /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 HSE Technical Guide Styles \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
                .hse-tg-float-btn {
                    position: fixed;
                    bottom: 22px;
                    left: 22px;
                    z-index: 99998;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: linear-gradient(135deg, #1e293b, #0f172a);
                    color: #ffffff;
                    border: 1.5px solid rgba(59, 130, 246, 0.4);
                    border-radius: 50px;
                    padding: 8px 16px 8px 14px;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Arabic', sans-serif;
                    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.35), 0 0 15px rgba(59, 130, 246, 0.2);
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                    direction: rtl;
                }
                .hse-tg-float-btn:hover {
                    transform: translateY(-2px) scale(1.02);
                    border-color: #3b82f6;
                    box-shadow: 0 14px 28px -4px rgba(15, 23, 42, 0.45), 0 0 20px rgba(59, 130, 246, 0.35);
                    background: linear-gradient(135deg, #1e3a8a, #0f172a);
                }
                .hse-tg-float-icon {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
                }
                .hse-tg-float-text {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    line-height: 1.25;
                }
                .hse-tg-float-main {
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: -0.2px;
                    color: #f8fafc;
                }
                .hse-tg-float-sub {
                    font-size: 10px;
                    color: #94a3b8;
                    font-weight: 600;
                }

                @media (max-width: 640px) {
                    .hse-tg-float-btn {
                        bottom: 16px;
                        left: 14px;
                        padding: 8px 12px;
                    }
                    .hse-tg-float-sub {
                        display: none;
                    }
                }

                /* Backdrop & Modal */
                .hse-tg-modal-backdrop {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(15, 23, 42, 0.78);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.25s ease, visibility 0.25s ease;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Arabic', sans-serif;
                    direction: rtl;
                }
                .hse-tg-modal-backdrop.is-open {
                    opacity: 1;
                    visibility: visible;
                }
                .hse-tg-modal-dialog {
                    background: #ffffff;
                    color: #0f172a;
                    border-radius: 20px;
                    width: 100%;
                    max-width: 860px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(226, 232, 240, 0.9);
                    overflow: hidden;
                    transform: scale(0.96);
                    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .hse-tg-modal-backdrop.is-open .hse-tg-modal-dialog {
                    transform: scale(1);
                }

                /* Header */
                .hse-tg-modal-header {
                    padding: 18px 24px;
                    background: linear-gradient(135deg, #0f172a, #1e293b);
                    color: #ffffff;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .hse-tg-header-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: 800;
                    background: rgba(59, 130, 246, 0.2);
                    color: #60a5fa;
                    padding: 3px 10px;
                    border-radius: 50px;
                    border: 1px solid rgba(96, 165, 250, 0.3);
                    margin-bottom: 6px;
                }
                .hse-tg-header-title {
                    font-size: 1.15rem;
                    font-weight: 800;
                    margin: 0 0 4px 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .hse-tg-header-subtitle {
                    font-size: 12px;
                    color: #94a3b8;
                    margin: 0;
                    line-height: 1.4;
                }
                .hse-tg-close-btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: #e2e8f0;
                    width: 34px;
                    height: 34px;
                    border-radius: 10px;
                    font-size: 22px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.15s ease;
                }
                .hse-tg-close-btn:hover {
                    background: #ef4444;
                    color: #ffffff;
                    border-color: #ef4444;
                }

                /* Controls bar */
                .hse-tg-controls-bar {
                    padding: 14px 20px;
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .hse-tg-search-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .hse-tg-search-icon {
                    position: absolute;
                    right: 14px;
                    color: #64748b;
                    font-size: 14px;
                }
                .hse-tg-search-input {
                    width: 100%;
                    padding: 10px 42px 10px 36px;
                    background: #ffffff;
                    border: 1.5px solid #cbd5e1;
                    border-radius: 12px;
                    font-size: 13.5px;
                    color: #0f172a;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .hse-tg-search-input:focus {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
                }
                .hse-tg-clear-btn {
                    position: absolute;
                    left: 12px;
                    background: transparent;
                    border: none;
                    font-size: 18px;
                    color: #94a3b8;
                    cursor: pointer;
                }

                /* Tabs */
                .hse-tg-tabs-scroll {
                    overflow-x: auto;
                    scrollbar-width: thin;
                    padding-bottom: 2px;
                }
                .hse-tg-tabs-list {
                    display: flex;
                    gap: 8px;
                    white-space: nowrap;
                }
                .hse-tg-tab-btn {
                    background: #ffffff;
                    border: 1px solid #cbd5e1;
                    color: #475569;
                    font-size: 12.5px;
                    font-weight: 700;
                    padding: 6px 14px;
                    border-radius: 50px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.15s ease;
                }
                .hse-tg-tab-btn:hover {
                    background: #f1f5f9;
                    color: #1e293b;
                    border-color: #94a3b8;
                }
                .hse-tg-tab-btn.is-active {
                    background: #2563eb;
                    color: #ffffff;
                    border-color: #2563eb;
                    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
                }

                /* Cards Container */
                .hse-tg-modal-body {
                    padding: 16px 20px;
                    overflow-y: auto;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    background: #f8fafc;
                }
                .hse-tg-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    padding: 16px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    transition: transform 0.15s, box-shadow 0.15s;
                }
                .hse-tg-card:hover {
                    border-color: #cbd5e1;
                    box-shadow: 0 4px 12px -2px rgba(0,0,0,0.08);
                }
                .hse-tg-card-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 12px;
                    margin-bottom: 12px;
                    padding-bottom: 10px;
                    border-bottom: 1px dashed #e2e8f0;
                }
                .hse-tg-card-title-group {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .hse-tg-card-title {
                    font-size: 14.5px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }
                .hse-tg-card-subtitle {
                    font-size: 11.5px;
                    color: #64748b;
                }
                .hse-tg-badge {
                    display: inline-block;
                    font-size: 10.5px;
                    font-weight: 800;
                    padding: 2px 8px;
                    border-radius: 6px;
                    margin-bottom: 4px;
                    width: fit-content;
                }
                .hse-tg-badge.badge-danger {
                    background: #fee2e2;
                    color: #b91c1c;
                    border: 1px solid #fca5a5;
                }
                .hse-tg-badge.badge-warning {
                    background: #fef3c7;
                    color: #b45309;
                    border: 1px solid #fcd34d;
                }
                .hse-tg-badge.badge-info {
                    background: #e0f2fe;
                    color: #0369a1;
                    border: 1px solid #7dd3fc;
                }

                .hse-tg-copy-btn {
                    background: #f1f5f9;
                    border: 1px solid #cbd5e1;
                    color: #334155;
                    font-size: 12px;
                    font-weight: 700;
                    padding: 6px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    white-space: nowrap;
                    transition: all 0.15s ease;
                }
                .hse-tg-copy-btn:hover {
                    background: #e2e8f0;
                    color: #0f172a;
                }
                .hse-tg-copy-btn.is-copied {
                    background: #10b981;
                    color: #ffffff;
                    border-color: #10b981;
                }

                .hse-tg-section-label {
                    font-size: 12.5px;
                    font-weight: 800;
                    color: #334155;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .hse-tg-criteria-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 12px 0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .hse-tg-criteria-list li {
                    font-size: 13px;
                    color: #1e293b;
                    line-height: 1.5;
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                }
                .hse-tg-criteria-list li i {
                    color: #10b981;
                    margin-top: 3px;
                    font-size: 13px;
                    flex-shrink: 0;
                }

                .hse-tg-action-box {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-right: 4px solid #f59e0b;
                    border-radius: 8px;
                    padding: 10px 14px;
                }
                .hse-tg-action-label {
                    font-size: 12px;
                    font-weight: 800;
                    color: #b45309;
                    margin-bottom: 3px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .hse-tg-action-text {
                    font-size: 12.5px;
                    font-weight: 600;
                    color: #334155;
                    margin: 0;
                    line-height: 1.4;
                }

                .hse-tg-empty-state {
                    text-align: center;
                    padding: 40px 20px;
                    color: #94a3b8;
                }
                .hse-tg-empty-state i {
                    font-size: 2.5rem;
                    margin-bottom: 12px;
                    opacity: 0.6;
                }
                .hse-tg-empty-state h4 {
                    font-size: 15px;
                    font-weight: 800;
                    color: #475569;
                    margin: 0 0 6px 0;
                }
                .hse-tg-empty-state p {
                    font-size: 13px;
                    margin: 0;
                }

                /* Footer */
                .hse-tg-modal-footer {
                    padding: 12px 20px;
                    background: #ffffff;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                .hse-tg-footer-note {
                    font-size: 12px;
                    color: #64748b;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .hse-tg-done-btn {
                    background: #0f172a;
                    color: #ffffff;
                    border: none;
                    border-radius: 10px;
                    padding: 8px 18px;
                    font-size: 13px;
                    font-weight: 800;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: background 0.15s ease;
                }
                .hse-tg-done-btn:hover {
                    background: #1e293b;
                }

                /* Dark Theme Support */
                body.theme-dark .hse-tg-modal-dialog,
                body.dark-mode .hse-tg-modal-dialog,
                [data-theme="dark"] .hse-tg-modal-dialog {
                    background: #0f172a;
                    color: #f8fafc;
                    border-color: #334155;
                }
                body.theme-dark .hse-tg-controls-bar,
                body.dark-mode .hse-tg-controls-bar,
                [data-theme="dark"] .hse-tg-controls-bar {
                    background: #1e293b;
                    border-color: #334155;
                }
                body.theme-dark .hse-tg-search-input,
                body.dark-mode .hse-tg-search-input,
                [data-theme="dark"] .hse-tg-search-input {
                    background: #0f172a;
                    border-color: #475569;
                    color: #f8fafc;
                }
                body.theme-dark .hse-tg-tab-btn,
                body.dark-mode .hse-tg-tab-btn,
                [data-theme="dark"] .hse-tg-tab-btn {
                    background: #0f172a;
                    border-color: #475569;
                    color: #cbd5e1;
                }
                body.theme-dark .hse-tg-modal-body,
                body.dark-mode .hse-tg-modal-body,
                [data-theme="dark"] .hse-tg-modal-body {
                    background: #090d16;
                }
                body.theme-dark .hse-tg-card,
                body.dark-mode .hse-tg-card,
                [data-theme="dark"] .hse-tg-card {
                    background: #0f172a;
                    border-color: #1e293b;
                }
                body.theme-dark .hse-tg-card-title,
                body.dark-mode .hse-tg-card-title,
                [data-theme="dark"] .hse-tg-card-title {
                    color: #f8fafc;
                }
                body.theme-dark .hse-tg-criteria-list li,
                body.dark-mode .hse-tg-criteria-list li,
                [data-theme="dark"] .hse-tg-criteria-list li {
                    color: #cbd5e1;
                }
                body.theme-dark .hse-tg-action-box,
                body.dark-mode .hse-tg-action-box,
                [data-theme="dark"] .hse-tg-action-box {
                    background: #1e293b;
                    border-color: #334155;
                }
                body.theme-dark .hse-tg-action-text,
                body.dark-mode .hse-tg-action-text,
                [data-theme="dark"] .hse-tg-action-text {
                    color: #e2e8f0;
                }
                body.theme-dark .hse-tg-modal-footer,
                body.dark-mode .hse-tg-modal-footer,
                [data-theme="dark"] .hse-tg-modal-footer {
                    background: #0f172a;
                    border-color: #334155;
                }
            `,a=document.createElement("style");a.id="hseTechnicalGuideStyles",a.textContent=e,document.head.appendChild(a)},H=function(){window.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&(e.key==="g"||e.key==="G")&&(e.preventDefault(),n&&n.classList.contains("is-open")?c():u())}),window.HseFeatureFlags&&typeof window.HseFeatureFlags.subscribe=="function"&&window.HseFeatureFlags.subscribe("glossary_overlay",e=>{m()})},w=function(){try{S(),T(),H()}catch{}};const b=[{id:"risk_high",category:"risk_matrix",categoryLabelAr:"\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",categoryLabelEn:"Risk Matrix",badge:"\u062E\u0637\u0631 \u0639\u0627\u0644\u064A (HIGH)",badgeClass:"badge-danger",titleAr:"\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0639\u0627\u0644\u064A\u0629 \u0648\u0627\u0644\u062D\u0631\u062C\u0629 (High / Critical Hazards)",titleEn:"High & Critical Risk Criteria",refStd:"OSHA 1910 / ISO 45001 Sec 6.1.2",criteriaAr:["\u0623\u064A \u062D\u0627\u0644\u0629 \u0623\u0648 \u0633\u0644\u0648\u0643 \u064A\u0647\u062F\u062F \u0628\u0640 (\u0648\u0641\u0627\u0629\u060C \u0628\u062A\u0631 \u0623\u0637\u0631\u0627\u0641\u060C \u0639\u062C\u0632 \u062F\u0627\u0626\u0645\u060C \u062D\u0631\u064A\u0642 \u0648\u0634\u064A\u0643\u060C \u062A\u0633\u0645\u0645 \u063A\u0627\u0632\u064A\u060C \u0627\u0646\u0647\u064A\u0627\u0631 \u0647\u064A\u0643\u0644\u064A).","\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A\u0629: \u064A\u0644\u062A\u0632\u0645 \u0627\u0644\u0645\u0631\u0627\u0642\u0628 \u0628\u062A\u0641\u0639\u064A\u0644 (Stop Work Authority) \u0648\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0639\u0645\u0644 \u0641\u0648\u0631\u0627\u064B \u062F\u0648\u0646 \u0627\u0646\u062A\u0638\u0627\u0631.","\u0623\u0645\u062B\u0644\u0629 ICAPP: \u0644\u062D\u0627\u0645 \u0628\u062F\u0648\u0646 \u062A\u0635\u0631\u064A\u062D \u0645\u0639\u062A\u0645\u062F \u0628\u062C\u0648\u0627\u0631 \u0643\u0631\u062A\u0648\u0646 \u0623\u0648 \u062E\u0637\u0648\u0637 \u0623\u0645\u0648\u0646\u064A\u0627\u060C \u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639 > 1.8\u0645 \u0628\u062F\u0648\u0646 \u062D\u0632\u0627\u0645 \u0628\u0627\u0631\u0627\u0634\u0648\u062A\u060C \u062A\u0634\u063A\u064A\u0644 \u0645\u0639\u062F\u0629 \u0645\u0639\u0637\u0644\u0629 \u0627\u0644\u062D\u0645\u0627\u064A\u0627\u062A \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629\u060C \u062F\u062E\u0648\u0644 \u0645\u0643\u0627\u0646 \u0645\u063A\u0644\u0642 \u0628\u062F\u0648\u0646 \u0642\u064A\u0627\u0633 \u063A\u0627\u0632\u0627\u062A."],recommendedActionAr:"\u0625\u064A\u0642\u0627\u0641 \u0641\u0648\u0631\u064A \u0644\u0644\u0639\u0645\u0644 + \u0639\u0632\u0644 \u0645\u0635\u062F\u0631 \u0627\u0644\u062E\u0637\u0631 \u0641\u064A \u0627\u0644\u062D\u0627\u0644 + \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0631\u0626\u064A\u0633 \u0627\u0644\u0648\u0631\u062F\u064A\u0629."},{id:"risk_medium",category:"risk_matrix",categoryLabelAr:"\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",categoryLabelEn:"Risk Matrix",badge:"\u062E\u0637\u0631 \u0645\u062A\u0648\u0633\u0637 (MEDIUM)",badgeClass:"badge-warning",titleAr:"\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062A\u0648\u0633\u0637\u0629 (Medium Risk Criteria)",titleEn:"Medium Risk Hazards",refStd:"ISO 45001 Risk Scoring",criteriaAr:["\u062D\u0627\u0644\u0629 \u0623\u0648 \u0633\u0644\u0648\u0643 \u0642\u062F \u064A\u0624\u062F\u064A \u0625\u0644\u0649 \u0625\u0635\u0627\u0628\u0629 \u062A\u0633\u062A\u062F\u0639\u064A \u0639\u0644\u0627\u062C\u0627\u064B \u0637\u0628\u064A\u0627\u064B \u0623\u0648 \u0647\u062F\u0631 \u0645\u0627\u062F\u064A \u062F\u0648\u0646 \u062E\u0637\u0631 \u0645\u0628\u0627\u0634\u0631 \u0639\u0644\u0649 \u0627\u0644\u062D\u064A\u0627\u0629.","\u0644\u0627 \u064A\u0633\u062A\u0648\u062C\u0628 \u0628\u0627\u0644\u0636\u0631\u0648\u0631\u0629 \u0625\u064A\u0642\u0627\u0641 \u0643\u0627\u0645\u0644 \u0644\u0644\u062E\u0637 \u0625\u0644\u0627 \u0625\u0630\u0627 \u0644\u0645 \u064A\u0645\u0643\u0646 \u062A\u0637\u0648\u064A\u0642 \u0627\u0644\u062E\u0637\u0631\u060C \u0645\u0639 \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0644\u0629 \u0642\u0635\u064A\u0631\u0629 \u0644\u0644\u0625\u0635\u0644\u0627\u062D \u062E\u0644\u0627\u0644 \u0627\u0644\u0648\u0631\u062F\u064A\u0629.","\u0623\u0645\u062B\u0644\u0629 ICAPP: \u062A\u0644\u0641 \u0639\u0632\u0644 \u062C\u0632\u0626\u064A \u0628\u0643\u0627\u0628\u0644 \u0645\u062D\u0645\u064A\u060C \u0646\u0642\u0635 \u0645\u0647\u0645\u0629 \u0648\u0642\u0627\u064A\u0629 \u062B\u0627\u0646\u0648\u064A\u0629 (\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646 \u0641\u064A \u0639\u0646\u0628\u0631 \u0635\u0627\u062E\u0628)\u060C \u062A\u0643\u062F\u064A\u0633 \u0643\u0631\u0627\u062A\u064A\u0646 \u0639\u0644\u0649 \u0628\u0627\u0644\u062A\u0647 \u0628\u0634\u0643\u0644 \u0645\u0627\u0626\u0644 \u0642\u0644\u064A\u0644\u0627\u064B \u0644\u0627 \u064A\u0647\u062F\u062F \u0628\u0633\u0642\u0648\u0637 \u0645\u0641\u0627\u062C\u0626\u060C \u062A\u0633\u0631\u064A\u0628 \u0645\u064A\u0627\u0647 \u0628\u0633\u064A\u0637 \u0641\u064A \u0645\u0645\u0631 \u062C\u0627\u0646\u0628\u064A."],recommendedActionAr:"\u0625\u0634\u0639\u0627\u0631 \u0645\u0634\u0631\u0641 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0641\u0648\u0631\u064A + \u0648\u0636\u0639 \u0639\u0644\u0627\u0645\u0629 \u062A\u062D\u0630\u064A\u0631\u064A\u0629 + \u0645\u0647\u0644\u0629 \u062A\u0635\u062D\u064A\u062D \u0645\u062D\u062F\u062F\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642."},{id:"risk_low",category:"risk_matrix",categoryLabelAr:"\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",categoryLabelEn:"Risk Matrix",badge:"\u062E\u0637\u0631 \u0645\u0646\u062E\u0641\u0636 (LOW)",badgeClass:"badge-info",titleAr:"\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0646\u062E\u0641\u0636\u0629 \u0648\u0641\u0631\u0635 \u0627\u0644\u062A\u062D\u0633\u064A\u0646 (Low Risk / Improvement)",titleEn:"Low Risk Criteria",refStd:"5S & General Housekeeping",criteriaAr:["\u0627\u0646\u062D\u0631\u0627\u0641 \u0628\u0633\u064A\u0637 \u0639\u0646 \u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0644\u0627 \u064A\u0645\u062B\u0644 \u062A\u0647\u062F\u064A\u062F\u0627\u064B \u062C\u0633\u062F\u064A\u0627\u064B \u0645\u0628\u0627\u0634\u0631\u0627\u064B\u060C \u0623\u0648 \u0641\u0631\u0635\u0629 \u062A\u062D\u0633\u064A\u0646 \u062A\u0646\u0638\u064A\u0645\u064A\u0629.","\u0623\u0645\u062B\u0644\u0629 ICAPP: \u0628\u0637\u0627\u0642\u0629 \u0641\u062D\u0635 \u0637\u0641\u0627\u064A\u0629 \u0627\u0642\u062A\u0631\u0628 \u0645\u0648\u0639\u062F \u062A\u062C\u062F\u064A\u062F\u0647\u0627\u060C \u0625\u0636\u0627\u0621\u0629 \u062E\u0627\u0641\u062A\u0629 \u0628\u0645\u0645\u0631 \u0641\u0631\u0639\u064A \u063A\u064A\u0631 \u0631\u0626\u064A\u0633\u064A\u060C \u0645\u0644\u0635\u0642 \u0625\u0631\u0634\u0627\u062F\u064A \u062A\u0627\u0644\u0641\u060C \u0639\u062F\u0645 \u0625\u0639\u0627\u062F\u0629 \u0623\u062F\u0627\u0629 \u064A\u062F\u0648\u064A\u0629 \u0644\u0645\u0643\u0627\u0646\u0647\u0627 \u0627\u0644\u0645\u062E\u0635\u0635 \u0628\u0639\u062F \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0639\u0645\u0644."],recommendedActionAr:"\u062A\u0633\u062C\u064A\u0644 \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0641\u064A \u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0645\u0631 \u062F\u0648\u0646 \u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A."},{id:"fire_extinguishers",category:"inspection",categoryLabelAr:"\u062A\u0641\u062A\u064A\u0634 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A",categoryLabelEn:"Daily Tour Checks",badge:"NFPA 10 / OSHA 1910.157",badgeClass:"badge-danger",titleAr:"\u0645\u0639\u0627\u064A\u064A\u0631 \u0641\u062D\u0635 \u0637\u0641\u0627\u064A\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0641\u064A \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A",titleEn:"Portable Fire Extinguishers Field Audit",refStd:"NFPA 10 / OSHA 1910.157",criteriaAr:["\u0645\u0624\u0634\u0631 \u0627\u0644\u0636\u063A\u0637: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u0645\u0624\u0634\u0631 \u062A\u0645\u0627\u0645\u0627\u064B \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0623\u062E\u0636\u0631 (Green Zone 10-14 bar).","\u0627\u0644\u0623\u0645\u0627\u0646 \u0648\u0627\u0644\u062E\u062A\u0645: \u0645\u0633\u0645\u0627\u0631/\u062A\u064A\u0644\u0629 \u0627\u0644\u0623\u0645\u0627\u0646 (Safety Pin) \u0633\u0644\u064A\u0645\u0629 \u0648\u0645\u062B\u0628\u062A\u0629 \u0628\u0627\u0644\u0642\u0641\u0644 \u0627\u0644\u0628\u0644\u0627\u0633\u062A\u064A\u0643\u064A/\u0627\u0644\u0631\u0635\u0627\u0635\u064A \u063A\u064A\u0631 \u0627\u0644\u0645\u0643\u0633\u0648\u0631.","\u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639 \u0639\u0646 \u0627\u0644\u0623\u0631\u0636: \u0627\u0644\u0637\u0641\u0627\u064A\u0627\u062A \u062D\u062A\u0649 \u0648\u0632\u0646 18 \u0643\u062C\u0645 (40 \u0631\u0637\u0644\u0627\u064B) \u064A\u0643\u0648\u0646 \u0645\u0642\u0628\u0636 \u0627\u0644\u062D\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639 \u0623\u0642\u0635\u0627\u0647 1.5 \u0645\u062A\u0631 \u0645\u0646 \u0627\u0644\u0623\u0631\u0636. \u0627\u0644\u0637\u0641\u0627\u064A\u0627\u062A \u0627\u0644\u0623\u062B\u0642\u0644 \u0645\u0646 18 \u0643\u062C\u0645 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639 \u0623\u0642\u0635\u0627\u0647 1.0 \u0645\u062A\u0631\u060C \u0648\u0644\u0627 \u062A\u0642\u0644 \u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0627\u0644\u0633\u0641\u0644\u064A\u0629 \u0639\u0646 10 \u0633\u0645 \u0639\u0646 \u0627\u0644\u0623\u0631\u0636\u064A\u0629.","\u0627\u0644\u062E\u0644\u0648 \u0648\u0627\u0644\u062D\u0631\u0645: \u064A\u064F\u062D\u0638\u0631 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0648\u0636\u0639 \u0623\u064A \u0639\u0648\u0627\u0626\u0642 \u0623\u0648 \u0628\u0627\u0644\u064A\u062A\u0627\u062A \u0623\u0645\u0627\u0645 \u0627\u0644\u0637\u0641\u0627\u064A\u0629 \u0644\u0645\u0633\u0627\u0641\u0629 \u0644\u0627 \u062A\u0642\u0644 \u0639\u0646 1 \u0645\u062A\u0631 \u0645\u0631\u0628\u0639 (3 \u0623\u0642\u062F\u0627\u0645).","\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0634\u0647\u0631\u064A\u0629: \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0644\u0622\u062E\u0631 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0633\u0627\u0631\u064D."],recommendedActionAr:"\u0623\u064A \u0637\u0641\u0627\u064A\u0629 \u0636\u063A\u0637\u0647\u0627 \u0645\u0646\u062E\u0641\u0636 \u0623\u0648 \u0645\u0642\u0637\u0648\u0639\u0629 \u0627\u0644\u062A\u064A\u0644\u0629 \u062A\u064F\u0633\u062A\u0628\u062F\u0644 \u0641\u0648\u0631\u0627\u064B \u0645\u0646 \u0645\u062E\u0632\u0646 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u064A\u064F\u0631\u0633\u0644 \u0625\u0634\u0639\u0627\u0631 \u0644\u0648\u0631\u0634\u0629 \u0627\u0644\u0625\u0637\u0641\u0627\u0621."},{id:"electrical_panels",category:"inspection",categoryLabelAr:"\u062A\u0641\u062A\u064A\u0634 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A",categoryLabelEn:"Daily Tour Checks",badge:"OSHA 1910.303(g)",badgeClass:"badge-warning",titleAr:"\u0645\u0639\u0627\u064A\u064A\u0631 \u0644\u0648\u062D\u0627\u062A \u0648\u062A\u0645\u062F\u064A\u062F\u0627\u062A \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0627\u0644\u0635\u0646\u0627\u0639\u064A\u0629",titleEn:"Electrical Panels & Sub-Distribution Safety",refStd:"OSHA 1910.303 / NFPA 70",criteriaAr:["\u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u062E\u0644\u0648 \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A\u0629: \u0645\u0633\u0627\u0641\u0629 \u062E\u0627\u0644\u064A\u0629 \u062A\u0645\u0627\u0645\u0627\u064B \u0644\u0627 \u062A\u0642\u0644 \u0639\u0646 90 \u0633\u0645 (3 \u0623\u0642\u062F\u0627\u0645) \u0623\u0645\u0627\u0645 \u0627\u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629\u060C \u0648\u0628\u0639\u0631\u0636 75 \u0633\u0645 \u0623\u0648 \u0639\u0631\u0636 \u0627\u0644\u0644\u0648\u062D\u0629 \u0623\u064A\u0647\u0645\u0627 \u0623\u0643\u0628\u0631.","\u063A\u0644\u0642 \u0627\u0644\u0623\u0628\u0648\u0627\u0628: \u0623\u0628\u0648\u0627\u0628 \u0627\u0644\u0644\u0648\u062D\u0627\u062A \u0645\u063A\u0644\u0642\u0629 \u0648\u0645\u062D\u0643\u0645\u0629 \u0644\u0645\u0646\u0639 \u062F\u062E\u0648\u0644 \u0627\u0644\u063A\u0628\u0627\u0631 \u0648\u0628\u062E\u0627\u0631 \u0627\u0644\u0645\u0627\u0621 (IP Protection)\u060C \u0648\u0645\u0645\u0646\u0648\u0639 \u062A\u062E\u0632\u064A\u0646 \u0623\u064A \u0623\u0648\u0631\u0627\u0642 \u0623\u0648 \u0639\u0650\u062F\u062F \u062F\u0627\u062E\u0644\u0647\u0627.","\u0641\u062A\u062D\u0627\u062A \u0627\u0644\u0640 Knockouts: \u0633\u062F \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u062A\u062D\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0628\u0623\u063A\u0637\u064A\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0644\u0645\u0646\u0639 \u062E\u0631\u0648\u062C \u0627\u0644\u0634\u0631\u0631 \u0623\u0648 \u0645\u0644\u0627\u0645\u0633\u0629 \u0627\u0644\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u062D\u064A\u0629.","\u062A\u0623\u0631\u064A\u0636 \u0627\u0644\u0644\u0648\u062D\u0629: \u0633\u0644\u0643 \u0627\u0644\u062A\u0623\u0631\u064A\u0636 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u0645\u0648\u0635\u0644 \u0628\u0625\u062D\u0643\u0627\u0645 \u0648\u0628\u062F\u0648\u0646 \u0623\u064A \u062A\u0631\u0627\u062E\u064D \u0623\u0648 \u062A\u0622\u0643\u0644."],recommendedActionAr:"\u0625\u0632\u0627\u0644\u0629 \u0623\u064A \u0628\u0627\u0644\u064A\u062A\u0627\u062A \u0623\u0648 \u0639\u0648\u0627\u0626\u0642 \u0623\u0645\u0627\u0645 \u0627\u0644\u0644\u0648\u062D\u0629 \u0641\u0648\u0631\u0627\u064B\u060C \u0648\u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0623\u064A \u0623\u0633\u0644\u0627\u0643 \u0623\u0648 \u0641\u062A\u062D\u0627\u062A \u0645\u0643\u0634\u0648\u0641\u0629 \u0644\u0641\u0646\u064A \u0627\u0644\u0635\u064A\u0627\u0646\u0629."},{id:"emergency_exits",category:"inspection",categoryLabelAr:"\u062A\u0641\u062A\u064A\u0634 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A",categoryLabelEn:"Daily Tour Checks",badge:"OSHA 1910.36 / 37",badgeClass:"badge-danger",titleAr:"\u0645\u0633\u0627\u0631\u0627\u062A \u0648\u0645\u062E\u0627\u0631\u062C \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u0647\u0631\u0648\u0628",titleEn:"Means of Egress & Emergency Exits",refStd:"OSHA 1910.36 / NFPA 101",criteriaAr:["\u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0623\u062F\u0646\u0649: \u0639\u0631\u0636 \u0645\u0633\u0627\u0631 \u0627\u0644\u0647\u0631\u0648\u0628 \u0644\u0627 \u064A\u0642\u0644 \u0639\u0646 71 \u0633\u0645 (28 \u0628\u0648\u0635\u0629) \u0641\u064A \u0623\u064A \u0646\u0642\u0637\u0629\u060C \u0648\u0645\u0645\u0646\u0648\u0639 \u062A\u0636\u064A\u064A\u0642\u0647 \u0628\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 \u0623\u0648 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A.","\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u0641\u062A\u062D: \u0623\u0628\u0648\u0627\u0628 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u062A\u0641\u062A\u062D \u0641\u064A \u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0647\u0631\u0648\u0628 (\u0644\u0644\u062E\u0627\u0631\u062C) \u0628\u0645\u062C\u0631\u062F \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0643\u0627\u0644\u0648\u0646 \u0627\u0644\u0647\u0644\u0627\u0633\u064A (Panic Bar)\u060C \u0648\u0645\u0645\u0646\u0648\u0639 \u0645\u0646\u0639\u0627\u064B \u0628\u0627\u062A\u0627\u064B \u0642\u0641\u0644\u0647\u0627 \u0628\u0645\u0641\u062A\u0627\u062D \u0623\u062B\u0646\u0627\u0621 \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.","\u0644\u0648\u062D\u0627\u062A \u0627\u0644\u0625\u0631\u0634\u0627\u062F (EXIT): \u0645\u0636\u064A\u0626\u0629 \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629 \u0648\u062A\u0639\u0645\u0644 \u0628\u0627\u0644\u0628\u0637\u0627\u0631\u064A\u0629 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0639\u0646\u062F \u0627\u0646\u0642\u0637\u0627\u0639 \u0627\u0644\u062A\u064A\u0627\u0631 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A.","\u0627\u0644\u0625\u0636\u0627\u0621\u0629 \u0627\u0644\u0637\u0627\u0631\u0626\u0629: \u0641\u062D\u0635 \u0643\u0634\u0627\u0641\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0648\u062C\u064A\u0647\u0647\u0627 \u0646\u062D\u0648 \u0627\u0644\u0633\u0644\u0627\u0644\u0645 \u0648\u0627\u0644\u0645\u062E\u0627\u0631\u062C."],recommendedActionAr:"\u0641\u062A\u062D \u0623\u064A \u0645\u062E\u0631\u062C \u0645\u063A\u0644\u0642 \u0641\u064A \u0627\u0644\u062A\u0648 \u0648\u0627\u0644\u0644\u062D\u0638\u0629\u060C \u0648\u062A\u0648\u062C\u064A\u0647 \u0645\u062E\u0627\u0644\u0641\u0629 \u062D\u0631\u062C\u0629 \u0644\u0623\u064A \u0642\u0633\u0645 \u064A\u063A\u0644\u0642 \u0645\u062E\u0631\u062C \u0637\u0648\u0627\u0631\u0626."},{id:"loto_protocol",category:"loto",categoryLabelAr:"\u0639\u0632\u0644 \u0627\u0644\u0637\u0627\u0642\u0629 LOTO",categoryLabelEn:"Lockout / Tagout",badge:"OSHA 1910.147",badgeClass:"badge-danger",titleAr:"\u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0644\u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644 \u0639\u0632\u0644 \u0648\u062A\u0623\u0645\u064A\u0646 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0637\u0627\u0642\u0629",titleEn:"Control of Hazardous Energy (LOTO)",refStd:"OSHA 29 CFR 1910.147",criteriaAr:["\u0627\u0644\u062E\u0637\u0648\u0629 1 - \u0627\u0644\u0625\u0634\u0639\u0627\u0631: \u0625\u0628\u0644\u0627\u063A \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u064A\u0646 \u0641\u064A \u062E\u0637 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0642\u0628\u0644 \u0627\u0644\u0628\u062F\u0621.","\u0627\u0644\u062E\u0637\u0648\u0629 2 - \u0627\u0644\u0625\u064A\u0642\u0627\u0641: \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 \u0623\u0648 \u0627\u0644\u062E\u0637 \u0628\u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629 (Stop Button).","\u0627\u0644\u062E\u0637\u0648\u0629 3 - \u0627\u0644\u0639\u0632\u0644: \u0641\u0635\u0644 \u0642\u0648\u0627\u0637\u0639 \u0627\u0644\u062A\u064A\u0627\u0631\u060C \u0645\u062D\u0627\u0628\u0633 \u0627\u0644\u0628\u062E\u0627\u0631\u060C \u0635\u0645\u0627\u0645\u0627\u062A \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0645\u0636\u063A\u0648\u0637\u060C \u0648\u062E\u0637\u0648\u0637 \u0627\u0644\u0633\u0648\u0627\u0626\u0644.","\u0627\u0644\u062E\u0637\u0648\u0629 4 - \u0627\u0644\u0642\u0641\u0644 \u0648\u0627\u0644\u0628\u0637\u0627\u0642\u0629: \u0643\u0644 \u0641\u0646\u064A \u064A\u0631\u0643\u0628 \u0642\u0641\u0644\u0647 \u0627\u0644\u0634\u062E\u0635\u064A \u0627\u0644\u0623\u062D\u0645\u0631 \u0645\u0639 \u0628\u0637\u0627\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A\u0647 (\u0627\u0633\u0645\u060C \u0642\u0633\u0645\u060C \u0647\u0627\u062A\u0641\u060C \u062A\u0627\u0631\u064A\u062E) \u0639\u0644\u0649 \u0647\u0627\u0633\u0628 \u0627\u0644\u062A\u062C\u0645\u064A\u0639 (Hasps).","\u0627\u0644\u062E\u0637\u0648\u0629 5 - \u062A\u0635\u0641\u064A\u0631 \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629 (Zero Energy State): \u062A\u0641\u0631\u064A\u063A \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0645\u0636\u063A\u0648\u0637\u060C \u062A\u0646\u0641\u064A\u0633 \u0627\u0644\u0628\u062E\u0627\u0631\u060C \u0625\u0641\u0631\u0627\u063A \u0627\u0644\u0645\u0643\u062B\u0641\u0627\u062A \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629\u060C \u0648\u062A\u062B\u0628\u064A\u062A \u0627\u0644\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629 \u0627\u0644\u0645\u0631\u0641\u0648\u0639\u0629 \u0628\u0643\u062A\u0644 \u0623\u0645\u0627\u0646.","\u0627\u0644\u062E\u0637\u0648\u0629 6 - \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 (Verification): \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0645\u0639\u062F\u0629 \u0645\u0646 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0644\u0644\u062A\u0623\u0643\u062F 100% \u0645\u0646 \u0639\u062F\u0645 \u0627\u0633\u062A\u062C\u0627\u0628\u062A\u0647\u0627 \u0642\u0628\u0644 \u0644\u0645\u0633 \u0623\u064A \u062C\u0632\u0621 \u062F\u0627\u062E\u0644\u064A."],recommendedActionAr:"\u064A\u064F\u062D\u0638\u0631 \u062A\u0645\u0627\u0645\u0627\u064B \u0646\u0632\u0639 \u0642\u0641\u0644 \u0623\u064A \u0641\u0646\u064A \u0622\u062E\u0631. \u0644\u0627 \u064A\u062A\u0645 \u0641\u0643 \u0627\u0644\u0642\u0641\u0644 \u0625\u0644\u0627 \u0628\u0648\u0627\u0633\u0637\u0629 \u0635\u0627\u062D\u0628\u0647 \u0628\u0639\u062F \u0627\u0643\u062A\u0645\u0627\u0644 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0648\u0633\u062D\u0628 \u0627\u0644\u0639\u0645\u0627\u0644."},{id:"ptw_hot_work",category:"ptw",categoryLabelAr:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 PTW",categoryLabelEn:"Permit To Work",badge:"NFPA 51B / OSHA 1910.252",badgeClass:"badge-warning",titleAr:"\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0633\u0627\u062E\u0646\u0629 (Hot Work)",titleEn:"Hot Work Safety Requirements",refStd:"NFPA 51B / OSHA 1910.252",criteriaAr:["\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0623\u0645\u0627\u0646 (11 \u0645\u062A\u0631\u0627\u064B / 35 \u0642\u062F\u0645\u0627\u064B): \u062A\u0637\u0647\u064A\u0631 \u0645\u062D\u064A\u0637 11 \u0645\u062A\u0631\u0627\u064B \u062D\u0648\u0644 \u0646\u0642\u0637\u0629 \u0627\u0644\u0644\u062D\u0627\u0645 \u0623\u0648 \u0627\u0644\u0635\u0627\u0631\u0648\u062E \u0645\u0646 \u0623\u064A \u0645\u0648\u0627\u062F \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644 (\u0643\u0631\u062A\u0648\u0646\u060C \u0623\u062E\u0634\u0627\u0628\u060C \u0645\u0630\u064A\u0628\u0627\u062A\u060C \u0623\u0643\u064A\u0627\u0633 \u0628\u0644\u0627\u0633\u062A\u064A\u0643)\u060C \u0623\u0648 \u062A\u063A\u0637\u064A\u062A\u0647\u0627 \u0628\u0628\u0637\u0627\u0646\u064A\u0627\u062A \u0645\u0642\u0627\u0648\u0645\u0629 \u0644\u0644\u062D\u0631\u064A\u0642 (Fire Blankets).","\u0633\u062F \u0627\u0644\u0641\u062A\u062D\u0627\u062A \u0627\u0644\u0623\u0631\u0636\u064A\u0629: \u062A\u063A\u0637\u064A\u0629 \u0641\u062A\u062D\u0627\u062A \u0627\u0644\u0635\u0631\u0641 \u0648\u0627\u0644\u0645\u062C\u0627\u0631\u064A \u0644\u0645\u0646\u0639 \u062A\u0633\u0631\u0628 \u0627\u0644\u0634\u0631\u0631 \u0623\u0648 \u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644.","\u0645\u0631\u0627\u0642\u0628 \u0627\u0644\u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u062E\u0635\u0635 (Fire Watch): \u062A\u0648\u0627\u062C\u062F \u0645\u0631\u0627\u0642\u0628 \u062D\u0631\u064A\u0642 \u0645\u062F\u0631\u0628 \u0645\u062A\u0641\u0631\u063A \u064A\u062D\u0645\u0644 \u0637\u0641\u0627\u064A\u0629 \u062D\u0631\u064A\u0642 \u0628\u0648\u062F\u0631\u0629/CO2 \u0633\u0627\u0631\u064A\u0629 \u0637\u0648\u0627\u0644 \u0641\u062A\u0631\u0629 \u0627\u0644\u0639\u0645\u0644.","\u0645\u0631\u0627\u0642\u0628\u0629 \u0645\u0627 \u0628\u0639\u062F \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0639\u0645\u0644: \u0627\u0644\u062A\u0632\u0627\u0645 \u0645\u0631\u0627\u0642\u0628 \u0627\u0644\u062D\u0631\u064A\u0642 \u0628\u0627\u0644\u0628\u0642\u0627\u0621 \u0641\u064A \u0627\u0644\u0645\u0648\u0642\u0639 \u0644\u0645\u062F\u0629 30 \u062F\u0642\u064A\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0628\u0639\u062F \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0644\u062D\u0627\u0645 \u0644\u0631\u0635\u062F \u0623\u064A \u062C\u0645\u0631\u0627\u062A \u0643\u0627\u0645\u0646\u0629 \u0623\u0648 \u062F\u062E\u0627\u0646 \u062E\u0641\u064A."],recommendedActionAr:"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0639\u0645\u0644 \u0641\u0648\u0631\u0627\u064B \u0648\u0633\u062D\u0628 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0625\u0630\u0627 \u063A\u0627\u062F\u0631 \u0645\u0631\u0627\u0642\u0628 \u0627\u0644\u062D\u0631\u064A\u0642 \u0645\u0643\u0627\u0646\u0647 \u0623\u0648 \u0644\u0645 \u062A\u062A\u0648\u0627\u0641\u0631 \u0637\u0641\u0627\u064A\u0629 \u0633\u0627\u0631\u064A\u0629 \u0628\u062C\u0648\u0627\u0631\u0647."},{id:"ptw_confined_space",category:"ptw",categoryLabelAr:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 PTW",categoryLabelEn:"Permit To Work",badge:"OSHA 1910.146",badgeClass:"badge-danger",titleAr:"\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u062F\u062E\u0648\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629 (Confined Space Entry)",titleEn:"Permit-Required Confined Spaces",refStd:"OSHA 29 CFR 1910.146",criteriaAr:["\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A \u0642\u0628\u0644 \u0627\u0644\u062F\u062E\u0648\u0644: \u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 O2 \u0628\u064A\u0646 (19.5% - 23.5%)\u060C \u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644 LEL \u0623\u0642\u0644 \u0645\u0646 10%\u060C \u063A\u0627\u0632 \u0623\u0648\u0644 \u0623\u0643\u0633\u064A\u062F \u0627\u0644\u0643\u0631\u0628\u0648\u0646 CO \u0623\u0642\u0644 \u0645\u0646 25 ppm\u060C \u063A\u0627\u0632 \u0643\u0628\u0631\u064A\u062A\u064A\u062F \u0627\u0644\u0647\u064A\u062F\u0631\u0648\u062C\u064A\u0646 H2S \u0623\u0642\u0644 \u0645\u0646 10 ppm.","\u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0625\u064A\u062C\u0627\u0628\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u0645\u0631\u0629: \u062A\u0634\u063A\u064A\u0644 \u0634\u0641\u0627\u0637/\u0645\u0631\u0648\u062D\u0629 \u062A\u0647\u0648\u064A\u0629 \u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629 \u0637\u0648\u0627\u0644 \u0641\u062A\u0631\u0629 \u062A\u0648\u0627\u062C\u062F \u0627\u0644\u0623\u0641\u0631\u0627\u062F \u0628\u0627\u0644\u062F\u0627\u062E\u0644.","\u0627\u0644\u0645\u0631\u0627\u0642\u0628 \u0627\u0644\u062E\u0627\u0631\u062C\u064A (Standby Attendant): \u0648\u062C\u0648\u062F \u0645\u0631\u0627\u0642\u0628 \u0645\u0624\u0647\u0644 \u0639\u0644\u0649 \u0641\u062A\u062D\u0629 \u0627\u0644\u062F\u062E\u0648\u0644 \u0639\u0644\u0649 \u0627\u062A\u0635\u0627\u0644 \u0645\u0633\u062A\u0645\u0631 \u0628\u0627\u0644\u0641\u0646\u064A \u0628\u0627\u0644\u062F\u0627\u062E\u0644\u060C \u0648\u0645\u0645\u0646\u0648\u0639 \u062F\u062E\u0648\u0644\u0647 \u062E\u0644\u0641\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u062A\u062D\u062A \u0623\u064A \u0638\u0631\u0641.","\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0625\u0646\u0642\u0627\u0630 \u062F\u0648\u0646 \u062F\u062E\u0648\u0644: \u0627\u0631\u062A\u062F\u0627\u0621 \u062D\u0632\u0627\u0645 \u0628\u0627\u0631\u0627\u0634\u0648\u062A \u0645\u0648\u0635\u0644 \u0628\u0648\u0646\u0634 \u0625\u0646\u0642\u0627\u0630 \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0642\u0648\u0627\u0626\u0645 (Tripod & Winch) \u0644\u0644\u0627\u0646\u062A\u0634\u0627\u0644 \u0627\u0644\u0641\u0648\u0631\u064A \u0639\u0646\u062F \u0627\u0644\u0637\u0648\u0627\u0631\u0626."],recommendedActionAr:"\u0645\u0645\u0646\u0648\u0639 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u062F\u0648\u0646 \u062A\u0635\u0631\u064A\u062D \u0645\u0648\u0642\u0639 \u0648\u0645\u062D\u0636\u0631 \u0641\u062D\u0635 \u063A\u0627\u0632\u0627\u062A \u0645\u0639\u062A\u0645\u062F \u0645\u0633\u062C\u0644 \u0641\u064A\u0647 \u0627\u0644\u0642\u0631\u0627\u0621\u0627\u062A \u0628\u0627\u0644\u0633\u0627\u0639\u0629 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E."},{id:"ptw_working_at_height",category:"ptw",categoryLabelAr:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 PTW",categoryLabelEn:"Permit To Work",badge:"OSHA 1926 Subpart M",badgeClass:"badge-danger",titleAr:"\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A \u0648\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0633\u0642\u0648\u0637",titleEn:"Fall Protection & Working at Heights",refStd:"OSHA 1926 Subpart M",criteriaAr:["\u062D\u062F \u0627\u0644\u0625\u0644\u0632\u0627\u0645: \u0623\u064A \u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639 1.8 \u0645\u062A\u0631 (6 \u0623\u0642\u062F\u0627\u0645) \u0641\u0623\u0643\u062B\u0631 \u064A\u0633\u062A\u0644\u0632\u0645 \u0646\u0638\u0627\u0645 \u062D\u0645\u0627\u064A\u0629 \u0643\u0627\u0645\u0644 \u0636\u062F \u0627\u0644\u0633\u0642\u0648\u0637.","\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u062D\u0645\u0627\u064A\u0629: \u0627\u0631\u062A\u062F\u0627\u0621 \u062D\u0632\u0627\u0645 \u0628\u0627\u0631\u0627\u0634\u0648\u062A \u0643\u0627\u0645\u0644 \u0644\u0644\u062C\u0633\u0645 (Full Body Harness) \u0645\u0632\u0648\u062F \u0628\u062D\u0628\u0644 \u062A\u062B\u0628\u064A\u062A \u0645\u0645\u062A\u0635 \u0644\u0644\u0635\u062F\u0645\u0627\u062A (Shock Absorbing Lanyard) \u0628\u0646\u0642\u0637\u0629 \u062A\u062B\u0628\u064A\u062A \u0645\u0632\u062F\u0648\u062C\u0629 (Double Lanyard 100% Tie-Off).","\u0646\u0642\u0637\u0629 \u0627\u0644\u062A\u062B\u0628\u064A\u062A (Anchor Point): \u064A\u062C\u0628 \u0623\u0646 \u062A\u062A\u062D\u0645\u0644 \u0642\u0648\u0629 \u0634\u062F \u0644\u0627 \u062A\u0642\u0644 \u0639\u0646 5000 \u0631\u0637\u0644 (2270 \u0643\u062C\u0645 / 22.2 kN) \u0644\u0643\u0644 \u0639\u0627\u0645\u0644.","\u0627\u0644\u0633\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629: \u0648\u062C\u0648\u062F \u0628\u0637\u0627\u0642\u0629 \u0641\u062D\u0635 \u062E\u0636\u0631\u0627\u0621 \u0645\u0639\u062A\u0645\u062F\u0629 (Scafftag) \u0633\u0627\u0631\u064A\u0629\u060C \u0648\u062A\u0648\u0627\u0641\u0631 \u062D\u0627\u062C\u0632 \u0639\u0644\u0648\u064A \u0628\u0627\u0631\u062A\u0641\u0627\u0639 107 \u0633\u0645 \u0648\u062D\u0627\u062C\u0632 \u0648\u0633\u0637\u064A 53 \u0633\u0645 \u0648\u062D\u0627\u0641\u0629 \u0633\u0641\u0644\u064A\u0629 \u0644\u062D\u062C\u0632 \u0627\u0644\u0645\u0639\u062F\u0627\u062A (Toeboard 10 \u0633\u0645)."],recommendedActionAr:"\u064A\u064F\u062D\u0638\u0631 \u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0644\u0633\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u062D\u0645\u0644 \u0643\u0627\u0631\u062A \u0623\u062D\u0645\u0631 \u0623\u0648 \u063A\u064A\u0631 \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629 \u0627\u0644\u062F\u0631\u0628\u0632\u064A\u0646\u0627\u062A\u060C \u0648\u064A\u064F\u0645\u0646\u0639 \u0627\u0644\u0648\u0642\u0648\u0641 \u0639\u0644\u0649 \u0627\u0644\u0628\u0631\u0627\u0645\u064A\u0644 \u0623\u0648 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642."},{id:"storage_stacking_5s",category:"storage",categoryLabelAr:"\u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0648\u0627\u0644\u062A\u0631\u062A\u064A\u0628 5S",categoryLabelEn:"Housekeeping & Stacking",badge:"OSHA 1910.176 / 5S",badgeClass:"badge-info",titleAr:"\u0645\u0639\u0627\u064A\u064A\u0631 \u0631\u0635 \u0648\u062A\u0643\u062F\u064A\u0633 \u0627\u0644\u0628\u0627\u0644\u064A\u062A\u0627\u062A \u0648\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0635\u0646\u0627\u0639\u064A",titleEn:"Pallet Stacking & Warehouse Housekeeping",refStd:"OSHA 1910.176 / NFPA 13",criteriaAr:["\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639 \u0644\u0644\u0642\u0627\u0639\u062F\u0629: \u0623\u0642\u0635\u0649 \u0627\u0631\u062A\u0641\u0627\u0639 \u0622\u0645\u0646 \u0644\u0631\u0635 \u0627\u0644\u0628\u0627\u0644\u064A\u062A\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0645\u0631\u0628\u0648\u0637\u0629 \u064A\u0639\u0627\u062F\u0644 3 \u0623\u0636\u0639\u0627\u0641 \u0639\u0631\u0636 \u0627\u0644\u0642\u0627\u0639\u062F\u0629 (\u0646\u0633\u0628\u0629 3:1).","\u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0623\u0633\u0641\u0644 \u0631\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 (Sprinklers): \u062A\u0631\u0643 \u0645\u0633\u0627\u0641\u0629 \u062E\u0627\u0644\u064A\u0629 \u0644\u0627 \u062A\u0642\u0644 \u0639\u0646 45 \u0633\u0645 (18 \u0628\u0648\u0635\u0629) \u0623\u0633\u0641\u0644 \u0631\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642\u060C \u0648 90 \u0633\u0645 (36 \u0628\u0648\u0635\u0629) \u0641\u064A \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0639\u0627\u0644\u064A \u0627\u0644\u0643\u062B\u0627\u0641\u0629 \u0644\u0636\u0645\u0627\u0646 \u062A\u0648\u0632\u064A\u0639 \u0645\u064A\u0627\u0647 \u0627\u0644\u0625\u0637\u0641\u0627\u0621.","\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0628\u0627\u0644\u064A\u062A\u0627\u062A: \u0627\u0633\u062A\u0628\u0639\u0627\u062F \u0623\u064A \u0628\u0627\u0644\u064A\u062A\u0647 \u062E\u0634\u0628\u064A\u0629 \u0628\u0647\u0627 \u0643\u0633\u0648\u0631 \u0623\u0648 \u062A\u0634\u0642\u0642\u0627\u062A \u0623\u0648 \u0645\u0633\u0627\u0645\u064A\u0631 \u0628\u0627\u0631\u0632\u0629 \u0644\u062A\u0641\u0627\u062F\u064A \u0627\u0646\u0647\u064A\u0627\u0631 \u0627\u0644\u0631\u0635\u0627\u062A \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0631\u0641\u0639 \u0628\u0627\u0644\u0641\u0648\u0631\u0643\u0644\u0641\u062A.","\u062E\u0637\u0648\u0637 \u0627\u0644\u0633\u064A\u0631 \u0648\u0627\u0644\u0645\u0645\u0631\u0627\u062A: \u0627\u0644\u0645\u0645\u0631\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0628\u0627\u0644\u0623\u0635\u0641\u0631 \u0645\u062E\u0635\u0635\u0629 \u0644\u0644\u0645\u0634\u0627\u0629 \u0648\u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0648\u064A\u062D\u0638\u0631 \u062A\u0645\u0627\u0645\u0627\u064B \u0648\u0636\u0639 \u0623\u064A \u0645\u0646\u062A\u062C \u0623\u0648 \u0643\u0631\u062A\u0648\u0646 \u0623\u0648 \u0633\u0644\u0629 \u0646\u0641\u0627\u064A\u0627\u062A \u062F\u0627\u062E\u0644\u0647\u0627 \u0648\u0644\u0648 \u0645\u0624\u0642\u062A\u0627\u064B."],recommendedActionAr:"\u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u062A\u064A\u0628 \u0623\u064A \u0631\u0635\u0629 \u0645\u0627\u0626\u0644\u0629 \u0641\u0648\u0631\u0627\u064B \u0648\u062E\u0641\u0636 \u0627\u0631\u062A\u0641\u0627\u0639\u0647\u0627\u060C \u0648\u062A\u0648\u062C\u064A\u0647 \u0625\u0646\u0630\u0627\u0631 \u0628\u0639\u062F\u0645 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0639\u0634\u0648\u0627\u0626\u064A."},{id:"ppe_technical_standards",category:"ppe",categoryLabelAr:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 PPE",categoryLabelEn:"PPE Standards",badge:"ANSI / EN Standards",badgeClass:"badge-info",titleAr:"\u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A \u0627\u0644\u0641\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0644\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0628\u0640 ICAPP",titleEn:"Personal Protective Equipment Technical Specifications",refStd:"ANSI Z87.1 / Z89.1 / EN ISO 20345",criteriaAr:["\u062D\u0630\u0627\u0621 \u0627\u0644\u0623\u0645\u0627\u0646 (Safety Shoes): \u0646\u0639\u0644 \u0645\u0642\u0627\u0648\u0645 \u0644\u0644\u0627\u0646\u0632\u0644\u0627\u0642 \u0628\u062F\u0631\u062C\u0629 (SRC)\u060C \u0648\u0645\u0642\u062F\u0645\u0629 \u0641\u0648\u0644\u0627\u0630\u064A\u0629 \u0623\u0648 \u0645\u0631\u0643\u0628\u0629 \u062A\u062A\u062D\u0645\u0644 \u0635\u062F\u0645\u0629 200 \u062C\u0648\u0644\u060C \u0648\u062E\u0627\u0635\u064A\u0629 \u0627\u0644\u0639\u0632\u0644 \u0627\u0644\u062D\u0631\u0627\u0631\u064A/\u0627\u0644\u0628\u0631\u0648\u062F\u0629 (CI) \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0639\u0645\u0627\u0644 \u062B\u0644\u0627\u062C\u0627\u062A \u0627\u0644\u062A\u062C\u0645\u064A\u062F (-18\xB0C).","\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0631\u0623\u0633 (Safety Helmet): \u0645\u062A\u0648\u0627\u0641\u0642\u0629 \u0645\u0639 \u0645\u0639\u064A\u0627\u0631 ANSI Z89.1 Type 1 Class E/G \u0645\u0639 \u062D\u0632\u0627\u0645 \u0630\u0642\u0646 \u0625\u0644\u0632\u0627\u0645\u064A \u0639\u0646\u062F \u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A.","\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0639\u064A\u0646 \u0648\u0627\u0644\u0648\u062C\u0647: \u0646\u0638\u0627\u0631\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 ANSI Z87.1 \u0644\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0639\u0627\u062F\u064A\u0629\u060C \u0648\u0642\u0646\u0627\u0639 \u0634\u0641\u0627\u0641 \u0643\u0627\u0645\u0644 (Face Shield) \u0639\u0646\u062F \u0635\u0628 \u0627\u0644\u0643\u064A\u0645\u0627\u0648\u064A\u0627\u062A \u0623\u0648 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0635\u0627\u0631\u0648\u062E\u060C \u0648\u0642\u0646\u0627\u0639 \u0639\u062A\u0627\u0645\u0629 \u0645\u062A\u063A\u064A\u0631\u0629 \u0644\u0644\u062D\u0627\u0645.","\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0633\u0645\u0639: \u0633\u062F\u0627\u062F\u0627\u062A \u0623\u0648 \u0623\u063A\u0637\u064A\u0629 \u0623\u0630\u0646 \u0645\u0639\u062A\u0645\u062F\u0629 \u062A\u062E\u0641\u0636 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0636\u0648\u0636\u0627\u0621 (NRR 25+) \u0641\u064A \u0623\u064A \u0642\u0633\u0645 \u064A\u062A\u062C\u0627\u0648\u0632 85 \u062F\u064A\u0633\u064A\u0628\u0644 (\u0639\u0646\u0627\u0628\u0631 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u0648\u0627\u0644\u0636\u0648\u0627\u063A\u0637)."],recommendedActionAr:"\u0627\u0633\u062A\u0628\u0639\u0627\u062F \u0648\u062A\u063A\u064A\u064A\u0631 \u0623\u064A \u0645\u0647\u0645\u0629 \u0648\u0642\u0627\u064A\u0629 \u062A\u0627\u0644\u0641\u0629 \u0641\u0648\u0631\u0627\u064B\u060C \u0648\u0645\u0645\u0646\u0648\u0639 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u062F\u062E\u0648\u0644 \u0623\u064A \u0639\u0627\u0645\u0644 \u0644\u0628\u064A\u0626\u0629 \u0627\u0644\u0639\u0645\u0644 \u0628\u062F\u0648\u0646 \u0645\u0647\u0645\u0627\u062A\u0647 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629."}];let n=null,h=null,l="all";document.readyState==="loading"?document.addEventListener("DOMContentLoaded",w):w();const x={open:u,close:c,copyStandardText:E,getStandards:()=>[...b]};window.HseTechnicalGuide=x,window.HseGlossary=x,window.HSE_GUIDE=x}catch{}}})();
