const SafetyPerformanceKPIs={filters:{period:"monthly",department:"",location:"",startDate:"",endDate:""},kpiTargets:{},activeTab:"overview",scorecardYear:new Date().getFullYear(),_isAdminUser:!1,_lockNonAdminView:!1,_scorecardSourceDataLoaded:!1,_scorecardSourceDataPromise:null,_scorecardWatchStarted:!1,_scorecardWatchInterval:null,_scorecardRefreshTimer:null,_lastScorecardSignature:"",_scorecardCache:new Map,_chartScorecardUiState:{group:"all",months:12,compact:!1,search:"",chartType:"line"},_chartScorecardCharts:[],async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("safety-performance-kpis-section");if(e){const a=typeof window.AppI18n?.getCurrentLang=="function"?window.AppI18n.getCurrentLang():typeof window.I18n?.getCurrentLang=="function"?window.I18n.getCurrentLang():document.documentElement?.lang||"ar",r=String(a||"ar").toLowerCase().startsWith("ar");e.setAttribute("dir",r?"rtl":"ltr"),e.style.direction=r?"rtl":"ltr",e.style.textAlign=r?"right":"left"}if(!document.getElementById("spk-rtl-ltr-guard-style")){const a=document.createElement("style");a.id="spk-rtl-ltr-guard-style",a.textContent=`
                #safety-performance-kpis-section[dir="rtl"],
                #safety-performance-kpis-section[dir="rtl"] *:not([dir="ltr"]):not(.spk-scorecard-print):not(.spk-scorecard-print *) {
                    /* \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0628\u0648\u0631\u0627\u062B\u0629 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0645\u0627 \u0644\u0645 \u064A\u0643\u0646 \u0644\u0647\u0627 dir="ltr" \u0635\u0631\u064A\u062D (\u0644\u0644\u0623\u0631\u0642\u0627\u0645) */
                }
                #safety-performance-kpis-section[dir="rtl"] {
                    direction: rtl !important;
                    text-align: right;
                }
                #safety-performance-kpis-section[dir="ltr"] {
                    direction: ltr !important;
                    text-align: left;
                }
                /* \u0636\u0645\u0627\u0646 \u0623\u0646 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0646\u0635\u064A\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u062A\u0631\u062B \u0627\u0644\u0627\u062A\u062C\u0627\u0647 */
                #safety-performance-kpis-section[dir="rtl"] h1,
                #safety-performance-kpis-section[dir="rtl"] h2,
                #safety-performance-kpis-section[dir="rtl"] h3,
                #safety-performance-kpis-section[dir="rtl"] h4,
                #safety-performance-kpis-section[dir="rtl"] p,
                #safety-performance-kpis-section[dir="rtl"] label,
                #safety-performance-kpis-section[dir="rtl"] li,
                #safety-performance-kpis-section[dir="rtl"] button {
                    direction: rtl;
                    text-align: start;
                }
                /* \u0627\u0644\u0623\u0631\u0642\u0627\u0645/\u0627\u0644\u0645\u0639\u062F\u0644\u0627\u062A \u062A\u0628\u0642\u0649 LTR \u062F\u0627\u0626\u0645\u0627\u064B */
                #safety-performance-kpis-section [dir="ltr"] {
                    direction: ltr !important;
                    unicode-bidi: embed;
                }
            `,document.head.appendChild(a)}const t=(()=>{if(typeof Permissions?.isCurrentUserAdmin=="function")try{return Permissions.isCurrentUserAdmin()}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0628\u0631 Permissions.isCurrentUserAdmin:",a)}return(AppState.currentUser?.role||"").toLowerCase()==="admin"})();if(this._isAdminUser=t,!t&&this._lockNonAdminView){e&&(e.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                                <p class="text-gray-500">${SafetyPerformanceKPIs._t("module.kpi.noPermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645")}</p>
                                <p class="text-sm text-gray-400 mt-2">${SafetyPerformanceKPIs._t("module.kpi.noPermissionRedirect","\u0633\u064A\u062A\u0645 \u062A\u062D\u0648\u064A\u0644\u0643 \u0625\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645")}</p>
                            </div>
                        </div>
                    </div>
                `,SafetyPerformanceKPIs.applyModuleI18n(e)),Notification.error(SafetyPerformanceKPIs._t("module.kpi.noPermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645")),UI.showSection("dashboard");return}if(!e){const a=SafetyPerformanceKPIs._t("module.kpi.notif.sectionNotFound","\u0639\u0646\u0635\u0631 safety-performance-kpis-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");typeof Utils<"u"&&Utils.safeError&&Utils.safeError(a);return}try{e.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-gauge-high me-3"></i>
                            ${SafetyPerformanceKPIs._t("module.kpi.title","\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}
                        </h1>
                        <p class="section-subtitle">${SafetyPerformanceKPIs._t("module.common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p>
                    </div>
                </div>
                <div class="content-card mt-6">
                    <div class="card-body">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">${SafetyPerformanceKPIs._t("module.kpi.loading","\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0648\u0627\u062C\u0647\u0629...")}</p>
                        </div>
                    </div>
                </div>
            `,this.applyModuleI18n(e),this.loadKPITargets();const a=this.ensureScorecardSourceData().catch(s=>(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0635\u0627\u062F\u0631 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u0643\u0648\u0631 \u0643\u0627\u0631\u062F \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",s),null));let r="";try{const s=this.render();r=await Utils.promiseWithTimeout(s,1e4,()=>new Error("Timeout: render took too long"))}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0648\u0627\u062C\u0647\u0629:",s),r=`
                    <div class="section-header">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-gauge-high me-3"></i>
                                ${SafetyPerformanceKPIs._t("module.kpi.title","\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}
                            </h1>
                        </div>
                    </div>
                    <div class="content-card mt-6">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${SafetyPerformanceKPIs._t("module.kpi.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                                <button onclick="SafetyPerformanceKPIs.load()" class="btn-primary">
                                    <i class="fas fa-redo me-2"></i>
                                    ${SafetyPerformanceKPIs._t("module.kpi.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                                </button>
                            </div>
                        </div>
                    </div>
                `}e.innerHTML=r,this.applyModuleI18n(e),this.enhanceWithScorecardTab(e),this.applyModuleI18n(e);try{this.setupEventListeners(),this.startScorecardAutoRefresh();try{setTimeout(()=>{this.updateAllKPIs()},0)}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A updateAllKPIs \u0627\u0644\u0623\u0648\u0644\u064A:",s)}setTimeout(()=>{try{this.updateAllKPIs()}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A updateAllKPIs:",s)}},100),a.then(()=>{try{this._scorecardCache.clear(),this.populateScorecardYearSelector(),this.queueScorecardRefresh(!0),this.updateAllKPIs()}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u0643\u0648\u0631 \u0643\u0627\u0631\u062F \u0628\u0639\u062F \u0627\u0643\u062A\u0645\u0627\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0635\u0627\u062F\u0631:",s)}})}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A setupEventListeners:",s)}}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621:",a);const r=SafetyPerformanceKPIs._t("module.kpi.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641");e.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-gauge-high me-3"></i>
                            ${SafetyPerformanceKPIs._t("module.kpi.title","\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">${SafetyPerformanceKPIs._t("module.kpi.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                                <p class="text-sm text-gray-400 mb-4">${a&&a.message?Utils.escapeHTML(a.message):r}</p>
                                <button onclick="SafetyPerformanceKPIs.load()" class="btn-primary">
                                    <i class="fas fa-redo me-2"></i>
                                    ${SafetyPerformanceKPIs._t("module.kpi.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,SafetyPerformanceKPIs.applyModuleI18n(e)}},_t(e,t=""){try{const a=window.AppI18n||window.I18n;if(a&&typeof a.t=="function"){const r=a.t(e);return r&&r!==e?r:t||e}}catch{}return t||e},applyModuleI18n(e){const t=window.AppI18n&&typeof window.AppI18n.applyModuleI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyModuleI18n=="function"?window.I18n:null;if(!t)return;const a=e||document.getElementById("safety-performance-kpis-section")||document;t.applyModuleI18n(a)},isModuleRTL(){const e=document.getElementById("safety-performance-kpis-section");if(e?.getAttribute("dir"))return e.getAttribute("dir")==="rtl";const t=typeof window.AppI18n?.getCurrentLang=="function"?window.AppI18n.getCurrentLang():typeof window.I18n?.getCurrentLang=="function"?window.I18n.getCurrentLang():document.documentElement?.lang||"ar";return String(t||"ar").toLowerCase().startsWith("ar")},translateNeboshStatus(e){const t=String(e||"").trim(),a={Certified:"module.kpi.scorecard.nebosh.certified","In Progress":"module.kpi.scorecard.nebosh.inProgress",Expired:"module.kpi.scorecard.nebosh.expired","Not Available":"module.kpi.scorecard.nebosh.notAvailable"};return a[t]?this._t(a[t],t):t},getMonthAbbreviations(){const e=["module.kpi.month.jan","module.kpi.month.feb","module.kpi.month.mar","module.kpi.month.apr","module.kpi.month.may","module.kpi.month.jun","module.kpi.month.jul","module.kpi.month.aug","module.kpi.month.sep","module.kpi.month.oct","module.kpi.month.nov","module.kpi.month.dec"],t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return e.map((a,r)=>this._t(a,t[r]))},getScorecardMonthNames(){const e=["module.kpi.monthFull.jan","module.kpi.monthFull.feb","module.kpi.monthFull.mar","module.kpi.monthFull.apr","module.kpi.monthFull.may","module.kpi.monthFull.jun","module.kpi.monthFull.jul","module.kpi.monthFull.aug","module.kpi.monthFull.sep","module.kpi.monthFull.oct","module.kpi.monthFull.nov","module.kpi.monthFull.dec"],t=["January","February","March","April","May","June","July","August","September","October","November","December"];return e.map((a,r)=>this._t(a,t[r]))},renderOverviewTab(){const e=(a,r)=>this._t(a,r),t="me-2";return`
            <!-- ===================== HERO SUMMARY BAR ===================== -->
            <div class="mt-4" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#1d4ed8 100%);border-radius:16px;padding:1.5rem 1.75rem;box-shadow:0 8px 32px rgba(15,23,42,.35);">
                <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;align-items:stretch;">
                    <!-- Days Without Incident -->
                    <div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem;text-align:center;position:relative;overflow:hidden;">
                        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#22c55e,#86efac);border-radius:12px 12px 0 0;"></div>
                        <div style="width:42px;height:42px;margin:0 auto .75rem;background:rgba(34,197,94,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-shield-alt" style="color:#4ade80;font-size:1.1rem;"></i>
                        </div>
                        <div id="hero-days-without" style="font-size:2rem;font-weight:900;color:#fff;line-height:1;margin-bottom:.25rem;">-</div>
                        <div style="font-size:.72rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">${e("module.kpi.hero.daysWithout","\u0623\u064A\u0627\u0645 \u0628\u062F\u0648\u0646 \u062D\u0648\u0627\u062F\u062B")}</div>
                        <div style="font-size:.68rem;color:#64748b;margin-top:.25rem;">${e("module.kpi.hero.ytd","\u062D\u062A\u0649 \u0627\u0644\u0622\u0646")}</div>
                    </div>
                    <!-- Total Incidents -->
                    <div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem;text-align:center;position:relative;overflow:hidden;">
                        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#ef4444,#fca5a5);border-radius:12px 12px 0 0;"></div>
                        <div style="width:42px;height:42px;margin:0 auto .75rem;background:rgba(239,68,68,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-exclamation-triangle" style="color:#f87171;font-size:1.1rem;"></i>
                        </div>
                        <div id="hero-total-incidents" style="font-size:2rem;font-weight:900;color:#fff;line-height:1;margin-bottom:.25rem;">-</div>
                        <div style="font-size:.72rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">${e("module.kpi.hero.totalIncidents","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B")}</div>
                        <div style="font-size:.68rem;color:#64748b;margin-top:.25rem;">${e("module.kpi.hero.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631")}</div>
                    </div>
                    <!-- LTIFR -->
                    <div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem;text-align:center;position:relative;overflow:hidden;">
                        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#f97316,#fdba74);border-radius:12px 12px 0 0;"></div>
                        <div style="width:42px;height:42px;margin:0 auto .75rem;background:rgba(249,115,22,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-sync-alt" style="color:#fb923c;font-size:1.1rem;"></i>
                        </div>
                        <div id="hero-ltifr" style="font-size:2rem;font-weight:900;color:#fff;line-height:1;margin-bottom:.25rem;">-</div>
                        <div style="font-size:.72rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">${e("module.kpi.hero.ltifr","\u0645\u0639\u062F\u0644 LTIFR")}</div>
                        <div style="font-size:.68rem;color:#64748b;margin-top:.25rem;">${e("module.kpi.hero.ytd","\u062D\u062A\u0649 \u0627\u0644\u0622\u0646")}</div>
                    </div>
                    <!-- Training Rate -->
                    <div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem;text-align:center;position:relative;overflow:hidden;">
                        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#6366f1,#a5b4fc);border-radius:12px 12px 0 0;"></div>
                        <div style="width:42px;height:42px;margin:0 auto .75rem;background:rgba(99,102,241,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-graduation-cap" style="color:#818cf8;font-size:1.1rem;"></i>
                        </div>
                        <div id="hero-training-rate" style="font-size:2rem;font-weight:900;color:#fff;line-height:1;margin-bottom:.25rem;">-</div>
                        <div style="font-size:.72rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">${e("module.kpi.hero.trainingRate","\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628")}</div>
                        <div style="font-size:.68rem;color:#64748b;margin-top:.25rem;">${e("module.kpi.hero.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631")}</div>
                    </div>
                    <!-- Open PTW -->
                    <div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem;text-align:center;position:relative;overflow:hidden;">
                        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#06b6d4,#67e8f9);border-radius:12px 12px 0 0;"></div>
                        <div style="width:42px;height:42px;margin:0 auto .75rem;background:rgba(6,182,212,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-id-card" style="color:#22d3ee;font-size:1.1rem;"></i>
                        </div>
                        <div id="hero-open-ptw" style="font-size:2rem;font-weight:900;color:#fff;line-height:1;margin-bottom:.25rem;">-</div>
                        <div style="font-size:.72rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">${e("module.kpi.hero.openPTW","\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0641\u062A\u0648\u062D\u0629")}</div>
                        <div style="font-size:.68rem;color:#64748b;margin-top:.25rem;">${e("module.kpi.hero.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631")}</div>
                    </div>
                </div>
            </div>

            <!-- ===================== FILTERS ===================== -->
            <div class="content-card mt-5" style="border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,.06);">
                <div class="card-header" style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-bottom:1px solid #e2e8f0;border-radius:14px 14px 0 0;">
                    <h2 class="card-title" style="color:#374151;">
                        <i class="fas fa-sliders-h ${t}" style="color:#6366f1;"></i>
                        ${e("module.kpi.filter.title","\u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0648\u0627\u0644\u0628\u062D\u062B")}
                    </h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.filter.period","\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629")}</label>
                            <select id="kpi-filter-period" class="form-input">
                                <option value="monthly">${e("module.kpi.filter.monthly","\u0634\u0647\u0631\u064A")}</option>
                                <option value="quarterly">${e("module.kpi.filter.quarterly","\u0631\u0628\u0639 \u0633\u0646\u0648\u064A")}</option>
                                <option value="yearly">${e("module.kpi.filter.yearly","\u0633\u0646\u0648\u064A")}</option>
                                <option value="custom">${e("module.kpi.filter.custom","\u0645\u062E\u0635\u0635")}</option>
                            </select>
                        </div>
                        <div id="kpi-custom-dates" class="hidden">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.filter.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")}</label>
                            <input type="date" id="kpi-filter-start-date" class="form-input">
                        </div>
                        <div id="kpi-custom-dates-end" class="hidden">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.filter.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")}</label>
                            <input type="date" id="kpi-filter-end-date" class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.filter.department","\u0627\u0644\u0625\u062F\u0627\u0631\u0629")}</label>
                            <select id="kpi-filter-department" class="form-input">
                                <option value="">${e("module.kpi.filter.allDepartments","\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A")}</option>
                                ${this.getDepartmentOptions()}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.filter.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</label>
                            <select id="kpi-filter-location" class="form-input">
                                <option value="">${e("module.kpi.filter.allLocations","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}</option>
                                ${this.getLocationOptions()}
                            </select>
                        </div>
                    </div>
                    <div class="mt-4 flex gap-2 flex-wrap">
                        <button id="kpi-apply-filters" class="btn-primary" style="gap:.4rem;">
                            <i class="fas fa-search ${t}"></i>
                            ${e("module.kpi.filter.apply","\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062A\u0635\u0641\u064A\u0629")}
                        </button>
                        <button id="kpi-reset-filters" class="btn-secondary">
                            <i class="fas fa-redo ${t}"></i>
                            ${e("module.kpi.filter.reset","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646")}
                        </button>
                    </div>
                </div>
            </div>

            <!-- ===================== LEADING INDICATORS ===================== -->
            <div class="mt-5">
                <div style="border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(5,150,105,.1);border:1px solid #a7f3d0;">
                    <div style="background:linear-gradient(135deg,#064e3b 0%,#065f46 50%,#047857 100%);padding:1.1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;">
                        <div>
                            <h2 style="color:#fff;font-size:1.05rem;font-weight:700;margin:0;display:flex;align-items:center;gap:.5rem;">
                                <span style="background:rgba(255,255,255,.15);padding:.3rem .5rem;border-radius:8px;"><i class="fas fa-arrow-trend-up" style="color:#6ee7b7;"></i></span>
                                ${e("module.kpi.leading.title","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0628\u0627\u0642\u064A\u0629")}
                                <span style="font-size:.7rem;background:rgba(110,231,183,.2);color:#6ee7b7;border:1px solid rgba(110,231,183,.3);border-radius:20px;padding:.15rem .6rem;font-weight:600;">${e("module.kpi.leading.badge","\u0627\u0633\u062A\u0628\u0627\u0642\u064A")}</span>
                            </h2>
                            <p style="color:#a7f3d0;font-size:.78rem;margin:.3rem 0 0;">${e("module.kpi.leading.subtitle","\u0645\u0624\u0634\u0631\u0627\u062A \u062A\u0642\u064A\u0633 \u0623\u062F\u0627\u0621 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0648\u0627\u0644\u062A\u062D\u0643\u0645 \u0642\u0628\u0644 \u0648\u0642\u0648\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B")}</p>
                        </div>
                        <div id="leading-score-badge" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:.4rem .9rem;text-align:center;display:none;">
                            <div style="font-size:1.2rem;font-weight:900;color:#fff;" id="leading-score-value">-</div>
                            <div style="font-size:.65rem;color:#a7f3d0;font-weight:600;">${e("module.kpi.leading.overallScore","\u0627\u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629")}</div>
                        </div>
                    </div>
                    <div style="background:#f0fdf4;padding:1.25rem;">
                        <div id="leading-indicators-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${this.renderLeadingIndicators()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===================== LAGGING INDICATORS ===================== -->
            <div class="mt-5">
                <div style="border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(185,28,28,.1);border:1px solid #fecaca;">
                    <div style="background:linear-gradient(135deg,#7f1d1d 0%,#991b1b 50%,#b91c1c 100%);padding:1.1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;">
                        <div>
                            <h2 style="color:#fff;font-size:1.05rem;font-weight:700;margin:0;display:flex;align-items:center;gap:.5rem;">
                                <span style="background:rgba(255,255,255,.15);padding:.3rem .5rem;border-radius:8px;"><i class="fas fa-arrow-trend-down" style="color:#fca5a5;"></i></span>
                                ${e("module.kpi.lagging.title","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0631\u0627\u062C\u0639\u064A\u0629")}
                                <span style="font-size:.7rem;background:rgba(252,165,165,.2);color:#fca5a5;border:1px solid rgba(252,165,165,.3);border-radius:20px;padding:.15rem .6rem;font-weight:600;">${e("module.kpi.lagging.badge","\u062A\u0631\u0627\u062C\u0639\u064A")}</span>
                            </h2>
                            <p style="color:#fecaca;font-size:.78rem;margin:.3rem 0 0;">${e("module.kpi.lagging.subtitle","\u0645\u0624\u0634\u0631\u0627\u062A \u062A\u0642\u064A\u0633 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0644\u0645\u0627 \u062D\u062F\u062B")}</p>
                        </div>
                    </div>
                    <div style="background:#fff5f5;padding:1.25rem;">
                        <div id="lagging-indicators-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            ${this.renderLaggingIndicators()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===================== CHARTS GRID ===================== -->
            <div class="mt-5">
                <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;">
                    <span style="background:linear-gradient(135deg,#6366f1,#8b5cf6);width:4px;height:24px;border-radius:2px;display:inline-block;"></span>
                    <h2 style="font-size:1.1rem;font-weight:700;color:#1e293b;margin:0;">
                        <i class="fas fa-chart-bar ${t}" style="color:#6366f1;"></i>
                        ${e("module.kpi.chart.title","\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A")}
                    </h2>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <!-- Incidents Chart -->
                    <div style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(239,68,68,.1);border:1px solid #fee2e2;">
                        <div style="background:linear-gradient(135deg,#fef2f2,#fee2e2);padding:.85rem 1.1rem;border-bottom:1px solid #fecaca;display:flex;align-items:center;gap:.6rem;">
                            <span style="background:#ef4444;width:8px;height:8px;border-radius:50%;display:inline-block;"></span>
                            <h3 style="font-size:.88rem;font-weight:700;color:#991b1b;margin:0;">
                                <i class="fas fa-chart-bar ${t}"></i>
                                ${e("module.kpi.chart.incidents","\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629")}
                            </h3>
                        </div>
                        <div style="padding:1rem;">
                            <div id="incidents-chart-container" style="height:280px;"></div>
                        </div>
                    </div>
                    <!-- Dept Distribution Chart -->
                    <div style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(59,130,246,.1);border:1px solid #bfdbfe;">
                        <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);padding:.85rem 1.1rem;border-bottom:1px solid #bfdbfe;display:flex;align-items:center;gap:.6rem;">
                            <span style="background:#3b82f6;width:8px;height:8px;border-radius:50%;display:inline-block;"></span>
                            <h3 style="font-size:.88rem;font-weight:700;color:#1e40af;margin:0;">
                                <i class="fas fa-chart-pie ${t}"></i>
                                ${e("module.kpi.chart.deptDistribution","\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629")}
                            </h3>
                        </div>
                        <div style="padding:1rem;">
                            <div id="department-chart-container" style="height:280px;"></div>
                        </div>
                    </div>
                    <!-- LTIFR Chart -->
                    <div style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(139,92,246,.1);border:1px solid #ddd6fe;">
                        <div style="background:linear-gradient(135deg,#faf5ff,#ede9fe);padding:.85rem 1.1rem;border-bottom:1px solid #ddd6fe;display:flex;align-items:center;gap:.6rem;">
                            <span style="background:#8b5cf6;width:8px;height:8px;border-radius:50%;display:inline-block;"></span>
                            <h3 style="font-size:.88rem;font-weight:700;color:#5b21b6;margin:0;">
                                <i class="fas fa-chart-line ${t}"></i>
                                ${e("module.kpi.chart.ltifr","\u0645\u0639\u062F\u0644 LTIFR \u0639\u0628\u0631 \u0627\u0644\u0632\u0645\u0646")}
                            </h3>
                        </div>
                        <div style="padding:1rem;">
                            <div id="trir-chart-container" style="height:280px;"></div>
                        </div>
                    </div>
                    <!-- Training Chart -->
                    <div style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(16,185,129,.1);border:1px solid #a7f3d0;">
                        <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);padding:.85rem 1.1rem;border-bottom:1px solid #a7f3d0;display:flex;align-items:center;gap:.6rem;">
                            <span style="background:#10b981;width:8px;height:8px;border-radius:50%;display:inline-block;"></span>
                            <h3 style="font-size:.88rem;font-weight:700;color:#065f46;margin:0;">
                                <i class="fas fa-chart-area ${t}"></i>
                                ${e("module.kpi.chart.training","\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628")}
                            </h3>
                        </div>
                        <div style="padding:1rem;">
                            <div id="training-chart-container" style="height:280px;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===================== DEPARTMENT COMPARISON ===================== -->
            <div class="mt-5" style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07);border:1px solid #e2e8f0;">
                <div style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);padding:.85rem 1.1rem;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;gap:.6rem;">
                    <span style="background:#0f172a;width:8px;height:8px;border-radius:50%;display:inline-block;"></span>
                    <h3 style="font-size:.88rem;font-weight:700;color:#0f172a;margin:0;">
                        <i class="fas fa-balance-scale ${t}"></i>
                        ${e("module.kpi.chart.deptComparison","\u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u064A\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A / \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}
                    </h3>
                </div>
                <div style="padding:1rem;">
                    <div id="department-comparison-container" style="height:380px;"></div>
                </div>
            </div>

            <!-- ===================== HEATMAP ===================== -->
            <div class="mt-5 mb-2" style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07);border:1px solid #e2e8f0;">
                <div style="background:linear-gradient(135deg,#1e293b,#334155);padding:.85rem 1.1rem;border-bottom:1px solid #475569;display:flex;align-items:center;gap:.6rem;">
                    <span style="background:#f59e0b;width:8px;height:8px;border-radius:50%;display:inline-block;"></span>
                    <h3 style="font-size:.88rem;font-weight:700;color:#f1f5f9;margin:0;">
                        <i class="fas fa-th ${t}"></i>
                        ${e("module.kpi.chart.heatmap","\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u0629 - \u0623\u062F\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u0627\u0644\u0645\u0648\u0642\u0639")}
                    </h3>
                </div>
                <div style="padding:1rem;">
                    <div id="heatmap-container"></div>
                </div>
            </div>
        `},switchTab(e){this.activeTab=e,this.load()},renderAnnualPlanTab(){const e=(o,n)=>this._t(o,n),t=this.getMonthAbbreviations(),a=this.getScorecardYearRange(),r=new Date().getFullYear(),i=!(typeof window<"u"&&typeof window.isReadOnlyRole=="function"?window.isReadOnlyRole():!1)&&(this.isAdminUser()||typeof Permissions<"u"&&Permissions.hasAccess("kpi-annual-plan"));return`
            <div class="content-card">
                <div class="card-header bg-gradient-to-r from-blue-50 to-indigo-50 border-b-4 border-blue-600">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div class="flex items-center gap-3">
                            <i class="fas fa-calendar-alt text-blue-600 text-2xl"></i>
                            <div>
                                <h2 class="card-title text-blue-800">
                                    ${e("module.kpi.annual.title","\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 (KPIs) - \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629")}
                                </h2>
                                <p class="text-sm text-blue-700 mt-1">${e("module.kpi.annual.subtitle","\u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629 \u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0645\u0639 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0634\u0647\u0631\u064A\u0629")}</p>
                            </div>
                        </div>
                        <div class="flex gap-2 items-center flex-wrap">
                            <select id="kpi-annual-year-selector" class="form-input" style="min-width: 100px;">
                                ${a.map(o=>`<option value="${o}" ${o===r?"selected":""}>${o}</option>`).join("")}
                            </select>
                            <button onclick="SafetyPerformanceKPIs.exportAnnualPlanToExcel()" class="btn-success" style="padding: 0.5rem 0.75rem; white-space: nowrap;" title="${e("module.kpi.exportExcel","\u062A\u0635\u062F\u064A\u0631 Excel")}">
                                <i class="fas fa-file-excel"></i>
                                <span class="hidden lg:inline ms-1">${e("module.kpi.common.excel","Excel")}</span>
                            </button>
                            <button onclick="SafetyPerformanceKPIs.exportAnnualPlanToPDF()" class="btn-secondary" style="padding: 0.5rem 0.75rem; white-space: nowrap;" title="${e("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF")}">
                                <i class="fas fa-file-pdf"></i>
                                <span class="hidden lg:inline ms-1">PDF</span>
                            </button>
                            ${i?`
                            <button onclick="SafetyPerformanceKPIs.addKPIAnnualPlan()" class="btn-primary" style="padding: 0.5rem 1.25rem; white-space: nowrap; min-width: 180px; font-weight: 600;">
                                <i class="fas fa-plus me-2"></i>
                                ${e("module.kpi.annual.addKPI","\u0625\u0636\u0627\u0641\u0629 \u0645\u0624\u0634\u0631 \u062C\u062F\u064A\u062F")}
                            </button>
                            `:""}
                        </div>
                    </div>
                </div>
                <div class="card-body" style="overflow-x: auto;">
                    <table class="kpi-annual-plan-table" style="width: 100%; border-collapse: collapse; font-size: 11px;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                                <th style="padding: 12px 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 90px;">${e("module.kpi.annual.col.type","\u0627\u0644\u0646\u0648\u0639")}</th>
                                <th style="padding: 12px 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 120px;">${e("module.kpi.annual.col.objective","OBJECTIVE")}</th>
                                <th style="padding: 12px 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 150px;">${e("module.kpi.annual.col.kpi","KPI")}</th>
                                <th style="padding: 12px 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 120px;">${e("module.kpi.annual.col.target","TARGET")}</th>
                                <th style="padding: 12px 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 80px;">${e("module.kpi.annual.col.goal","GOAL")}</th>
                                <th style="padding: 12px 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 250px;">${e("module.kpi.annual.col.improvement","IMPROVEMENT PLAN")}</th>
                                ${t.map(o=>`<th style="padding: 12px 4px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 50px; background: #3b82f6;">${o}</th>`).join("")}
                                <th style="padding: 12px 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 80px; background: #f97316;">${e("module.kpi.annual.col.total","Total")}</th>
                                ${i?`<th style="padding: 12px 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 100px;">${e("module.kpi.annual.col.actions","Actions")}</th>`:""}
                            </tr>
                        </thead>
                        <tbody id="kpi-annual-plan-body">
                            <tr>
                                <td colspan="21" style="padding: 40px; text-align: center; color: #6b7280;">
                                    <i class="fas fa-spinner fa-spin text-3xl mb-3"></i>
                                    <p>${e("module.kpi.annual.loading","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...")}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Legend / Abbreviations -->
            <div class="content-card mt-6">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-info-circle me-2"></i>
                        ${e("module.kpi.annual.abbrev","\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A")}
                    </h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div><strong>(1) HSE:</strong> ${e("module.kpi.annual.legendHse","\u0627\u0644\u0635\u062D\u0629 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629")}</div>
                        <div><strong>(2) LTI:</strong> ${e("module.kpi.annual.legendLti","\u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0627\u0644\u0645\u0624\u062F\u064A\u0629 \u0644\u0627\u0646\u0642\u0637\u0627\u0639 \u0627\u0644\u0639\u0645\u0644")}</div>
                        <div><strong>(3) AIR:</strong> ${e("module.kpi.annual.legendAir","\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B")}</div>
                    </div>
                </div>
            </div>
        `},renderMonitoringPlanTab(){const e=(n,c)=>this._t(n,c),t=this.getMonthAbbreviations(),a=this.getScorecardYearRange(),r=new Date().getFullYear(),i=!(typeof window<"u"&&typeof window.isReadOnlyRole=="function"?window.isReadOnlyRole():!1)&&(this.isAdminUser()||typeof Permissions<"u"&&Permissions.hasAccess("hse-monitoring-plan")),o=[{key:"Weekly",label:e("module.kpi.monitoring.freq.weekly","\u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064A\u0629"),icon:"fa-calendar-week",color:"yellow"},{key:"Monthly",label:e("module.kpi.monitoring.freq.monthly","\u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0634\u0647\u0631\u064A\u0629"),icon:"fa-calendar-alt",color:"blue"},{key:"Semi-Annually",label:e("module.kpi.monitoring.freq.semiAnnually","\u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0646\u0635\u0641 \u0627\u0644\u0633\u0646\u0648\u064A\u0629"),icon:"fa-calendar",color:"purple"},{key:"Annually",label:e("module.kpi.monitoring.freq.annually","\u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629"),icon:"fa-calendar-check",color:"green"}];return`
            <div class="content-card">
                <div class="card-header bg-gradient-to-r from-green-50 to-emerald-50 border-b-4 border-green-600">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div class="flex items-center gap-3">
                            <i class="fas fa-clipboard-check text-green-600 text-2xl"></i>
                            <div>
                                <h2 class="card-title text-green-800">
                                    ${e("module.kpi.monitoring.title","\u062E\u0637\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 HSE")}
                                </h2>
                                <p class="text-sm text-green-700 mt-1">${e("module.kpi.monitoring.subtitle","\u062E\u0637\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 HSE - \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0634\u0647\u0631\u064A\u0629")}</p>
                            </div>
                        </div>
                        <div class="flex gap-2 items-center flex-wrap">
                            <select id="hse-monitoring-year-selector" class="form-input" style="min-width: 100px;">
                                ${a.map(n=>`<option value="${n}" ${n===r?"selected":""}>${n}</option>`).join("")}
                            </select>
                            <button onclick="SafetyPerformanceKPIs.exportMonitoringPlanToExcel()" class="btn-success" style="padding: 0.5rem 0.75rem; white-space: nowrap;" title="${e("module.kpi.monitoring.excelTitle","\u062A\u0635\u062F\u064A\u0631 Excel")}">
                                <i class="fas fa-file-excel"></i>
                                <span class="hidden lg:inline ms-1">${e("module.kpi.common.excel","Excel")}</span>
                            </button>
                            <button onclick="SafetyPerformanceKPIs.exportMonitoringPlanToPDF()" class="btn-secondary" style="padding: 0.5rem 0.75rem; white-space: nowrap;" title="${e("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF")}">
                                <i class="fas fa-file-pdf"></i>
                                <span class="hidden lg:inline ms-1">PDF</span>
                            </button>
                            ${i?`
                            <button onclick="SafetyPerformanceKPIs.addHSEMonitoringPlan()" class="btn-primary" style="padding: 0.5rem 1.25rem; white-space: nowrap; min-width: 180px; font-weight: 600;">
                                <i class="fas fa-plus me-2"></i>
                                ${e("module.kpi.monitoring.addActivity","\u0625\u0636\u0627\u0641\u0629 \u0646\u0634\u0627\u0637 \u062C\u062F\u064A\u062F")}
                            </button>
                            `:""}
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    ${o.map(n=>`
                        <div class="mb-8">
                            <div class="bg-${n.color}-50 border-s-4 border-${n.color}-500 p-4 mb-4 rounded-lg">
                                <h3 class="text-lg font-bold text-${n.color}-800">
                                    <i class="fas ${n.icon} me-2"></i>
                                    ${n.label}
                                </h3>
                            </div>
                            <div style="overflow-x: auto;">
                                <table class="hse-monitoring-table" style="width: 100%; border-collapse: collapse; font-size: 10px;">
                                    <thead>
                                        <tr style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white;">
                                            <th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 100px;">${e("module.kpi.monitoring.col.activity","\u0627\u0644\u0646\u0634\u0627\u0637")}</th>
                                            <th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 120px;">${e("module.kpi.monitoring.col.description","\u0648\u0635\u0641 \u0627\u0644\u0646\u0634\u0627\u0637")}</th>
                                            <th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 80px;">${e("module.kpi.monitoring.col.area","\u0627\u0644\u0645\u0646\u0637\u0642\u0629")}</th>
                                            <th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 80px;">${e("module.kpi.monitoring.col.frequency","\u0627\u0644\u062A\u0643\u0631\u0627\u0631")}</th>
                                            <th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 100px;">${e("module.kpi.monitoring.col.responsibility","\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0629")}</th>
                                            <th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 100px;">${e("module.kpi.monitoring.col.record","\u0648\u062B\u064A\u0642\u0629 \u0627\u0644\u062A\u0633\u062C\u064A\u0644")}</th>
                                            ${t.map(c=>`<th style="padding: 10px 4px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 60px; background: #3b82f6;" title="${e("module.kpi.monitoring.hintTarget","\u0645\u0633\u062A\u0647\u062F\u0641")}">${c}T</th>`).join("")}
                                            ${t.map(c=>`<th style="padding: 10px 4px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 60px; background: #10b981;" title="${e("module.kpi.monitoring.hintExecuted","\u0645\u0646\u0641\u0630")}">${c}E</th>`).join("")}
                                            <th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 80px; background: #f97316;">${e("module.kpi.monitoring.col.totalTarget","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641")}</th>
                                            <th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 80px; background: #10b981;">${e("module.kpi.monitoring.col.totalExecuted","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0641\u0630")}</th>
                                            <th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 80px; background: #8b5cf6;">${e("module.kpi.monitoring.col.score","\u0627\u0644\u0646\u0633\u0628\u0629 %")}</th>
                                            ${i?`<th style="padding: 10px 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600; min-width: 100px;">${e("module.kpi.monitoring.col.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>`:""}
                                        </tr>
                                    </thead>
                                    <tbody id="hse-monitoring-${n.key.toLowerCase().replace("-","")}-body">
                                        <tr>
                                            <td colspan="30" style="padding: 30px; text-align: center; color: #6b7280;">
                                                <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                                                <p>${e("module.kpi.monitoring.loading","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...")}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `},renderLeadingIndicators(){const e=(t,a)=>this._t(t,a);return`
            ${this.renderKPICard("inspection-tours",e("module.kpi.leading.inspectionTours","\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629"),"inspection-tours","fa-walking","#2563eb","#dbeafe",e("module.kpi.unit.tour","\u062C\u0648\u0644\u0629"))}
            ${this.renderKPICard("observations-recorded",e("module.kpi.leading.observations","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"),"observations","fa-clipboard-list","#4f46e5","#e0e7ff",e("module.kpi.unit.observation","\u0645\u0644\u0627\u062D\u0638\u0629"))}
            ${this.renderKPICard("corrective-actions-closure",e("module.kpi.leading.actionsClosure","\u0646\u0633\u0628\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629"),"actions-closure","fa-check-double","#059669","#d1fae5","%")}
            ${this.renderKPICard("training-courses",e("module.kpi.leading.trainingCourses","\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629"),"training-courses","fa-graduation-cap","#0d9488","#ccfbf1",e("module.kpi.unit.course","\u062F\u0648\u0631\u0629"))}
            ${this.renderKPICard("training-attendance",e("module.kpi.leading.trainingAttendance","\u0646\u0633\u0628\u0629 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0644\u0644\u062A\u062F\u0631\u064A\u0628"),"training-attendance","fa-users","#0284c7","#e0f2fe","%")}
            ${this.renderKPICard("ptw-approved",e("module.kpi.leading.ptwApproved","\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0648\u0627\u0644\u0645\u0646\u0641\u0630\u0629"),"ptw-approved","fa-id-card","#7c3aed","#ede9fe",e("module.kpi.unit.permit","\u062A\u0635\u0631\u064A\u062D"))}
            ${this.renderKPICard("ppe-compliance",e("module.kpi.leading.ppeCompliance","\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"),"ppe-compliance","fa-hard-hat","#d97706","#fef3c7","%")}
            ${this.renderKPICard("periodic-inspections-on-time",e("module.kpi.leading.inspectionsOnTime","\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629 \u0627\u0644\u0645\u0646\u062C\u0632\u0629 \u0641\u064A \u0627\u0644\u0645\u0648\u0639\u062F"),"inspections-on-time","fa-calendar-check","#16a34a","#dcfce7",e("module.kpi.unit.inspection","\u0641\u062D\u0635"))}
            ${this.renderKPICard("safety-meetings",e("module.kpi.leading.safetyMeetings","\u0639\u062F\u062F \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u0639\u064A\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0633\u0644\u0627\u0645\u0629"),"safety-meetings","fa-handshake","#0369a1","#e0f2fe",e("module.kpi.unit.meeting","\u0627\u062C\u062A\u0645\u0627\u0639"))}
        `},renderLaggingIndicators(){const e=(t,a)=>this._t(t,a);return`
            ${this.renderKPICard("total-injuries",e("module.kpi.lagging.totalInjuries","\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629"),"injuries","fa-user-injured","#dc2626","#fee2e2",e("module.kpi.unit.injury","\u0625\u0635\u0627\u0628\u0629"))}
            ${this.renderKPICard("lti-count",e("module.kpi.lagging.ltiCount","\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0624\u062F\u064A\u0629 \u0644\u062A\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644"),"lti","fa-bed","#b91c1c","#fee2e2",e("module.kpi.unit.injury","\u0625\u0635\u0627\u0628\u0629"))}
            ${this.renderKPICard("ltifr",e("module.kpi.lagging.ltifr","\u0645\u0639\u062F\u0644 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (LTIFR)"),"ltifr","fa-sync-alt","#ea580c","#ffedd5","")}
            ${this.renderKPICard("severity-rate",e("module.kpi.lagging.severityRate","\u0645\u0639\u062F\u0644 \u0634\u062F\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (SR)"),"severity","fa-exclamation-circle","#e11d48","#ffe4e6","")}
            ${this.renderKPICard("incident-rate",e("module.kpi.lagging.incidentRate","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B (IR)"),"incident-rate","fa-list-ol","#0891b2","#cffafe","")}
            ${this.renderKPICard("near-miss-count",e("module.kpi.lagging.nearMissCount","\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629"),"nearmiss-count","fa-eye","#ca8a04","#fef9c3",e("module.kpi.unit.incident","\u062D\u0627\u062F\u062B"))}
            ${this.renderKPICard("fire-incidents",e("module.kpi.lagging.fireIncidents","\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0627\u0626\u0642 \u0623\u0648 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0641\u064A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621"),"fire-incidents","fa-fire","#c2410c","#ffedd5",e("module.kpi.unit.incident","\u062D\u0627\u062F\u062B"))}
            ${this.renderKPICard("lost-days",e("module.kpi.lagging.lostDays","\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0647\u062F\u0648\u0631\u0629 \u0628\u0633\u0628\u0628 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A"),"lost-days","fa-calendar-times","#9f1239","#ffe4e6",e("module.kpi.unit.day","\u064A\u0648\u0645"))}
            ${this.renderKPICard("accident-cost",e("module.kpi.lagging.accidentCost","\u062A\u0643\u0644\u0641\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B"),"accident-cost","fa-dollar-sign","#991b1b","#fee2e2",e("module.kpi.unit.sar","\u0631\u064A\u0627\u0644"))}
        `},renderKPICard(e,t,a,r,s,i,o=""){const n=(u,g)=>this._t(u,g),c=["injuries","lti","ltifr","severity","incident-rate","nearmiss-count","fire-incidents","lost-days","accident-cost"].includes(a),l=c?"#fca5a5":"#bbf7d0";return`
            <div style="background:#fff;border-radius:14px;border:1px solid ${l};box-shadow:0 2px 10px rgba(0,0,0,.06);overflow:hidden;transition:box-shadow .2s,transform .2s;" 
                 onmouseover="this.style.boxShadow='0 8px 24px rgba(0,0,0,.13)';this.style.transform='translateY(-2px)';" 
                 onmouseout="this.style.boxShadow='0 2px 10px rgba(0,0,0,.06)';this.style.transform='translateY(0)';">
                <!-- Card Header -->
                <div style="background:${c?"rgba(254,226,226,.5)":"rgba(220,252,231,.5)"};border-bottom:1px solid ${l};padding:.65rem .9rem;display:flex;align-items:center;justify-content:space-between;gap:.5rem;">
                    <div style="display:flex;align-items:center;gap:.55rem;flex:1;min-width:0;">
                        <div style="width:34px;height:34px;border-radius:9px;background:${i};display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,.1);">
                            <i class="fas ${r}" style="color:${s};font-size:.9rem;"></i>
                        </div>
                        <div style="min-width:0;">
                            <h3 style="font-size:.75rem;font-weight:700;color:#1e293b;margin:0;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${t}">${t}</h3>
                            <p style="font-size:.65rem;color:#64748b;margin:.1rem 0 0;" id="${e}-period">${n("module.kpi.card.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631")}</p>
                        </div>
                    </div>
                    <div id="${e}-status" style="display:none;width:8px;height:8px;border-radius:50%;background:#d1d5db;flex-shrink:0;"></div>
                </div>
                <!-- Card Body -->
                <div style="padding:.85rem .9rem;">
                    <!-- Value + Unit -->
                    <div style="display:flex;align-items:baseline;gap:.35rem;margin-bottom:.6rem;">
                        <span id="${e}-value" style="font-size:1.95rem;font-weight:900;color:#0f172a;line-height:1;">-</span>
                        <span id="${e}-unit" style="font-size:.85rem;font-weight:600;color:#64748b;">${o}</span>
                    </div>
                    <!-- Target Row -->
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.55rem;">
                        <span style="font-size:.7rem;color:#64748b;font-weight:600;">${n("module.kpi.card.target","\u0627\u0644\u0647\u062F\u0641:")}</span>
                        <span id="${e}-target" style="font-size:.7rem;font-weight:700;color:#374151;">-</span>
                    </div>
                    <!-- Progress Bar -->
                    <div>
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.3rem;">
                            <span style="font-size:.68rem;color:#64748b;font-weight:600;">${n("module.kpi.card.achievement","\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u0646\u062C\u0627\u0632")}</span>
                            <span id="${e}-progress" style="font-size:.7rem;font-weight:800;color:${s};">-</span>
                        </div>
                        <div style="width:100%;background:#f1f5f9;border-radius:99px;height:6px;overflow:hidden;">
                            <div id="${e}-progress-bar" style="height:6px;border-radius:99px;width:0%;background:${s};transition:width .6s ease;"></div>
                        </div>
                    </div>
                    <!-- Trend -->
                    <div id="${e}-trend" style="margin-top:.55rem;display:flex;align-items:center;gap:.35rem;font-size:.68rem;color:#94a3b8;">
                        <i class="fas fa-minus"></i>
                        <span>${n("module.kpi.card.noChange","\u0644\u0627 \u064A\u0648\u062C\u062F \u062A\u063A\u064A\u064A\u0631")}</span>
                    </div>
                </div>
            </div>
        `},getDepartmentOptions(){const e=new Set,t=AppState.appData;return(t.incidents||[]).forEach(r=>{r.affectedDepartment&&e.add(r.affectedDepartment)}),(t.dailyObservations||[]).forEach(r=>{r.department&&e.add(r.department)}),(AppState.companySettings?.formDepartments||[]).forEach(r=>e.add(r)),Array.from(e).sort().map(r=>`<option value="${Utils.escapeHTML(r)}">${Utils.escapeHTML(r)}</option>`).join("")},getLocationOptions(){const e=new Set,t=AppState.appData;return(t.incidents||[]).forEach(a=>{a.location&&e.add(a.location)}),(t.nearmiss||[]).forEach(a=>{a.location&&e.add(a.location)}),Array.from(e).sort().map(a=>`<option value="${Utils.escapeHTML(a)}">${Utils.escapeHTML(a)}</option>`).join("")},isAdminUser(){if(this._isAdminUser===!0)return!0;if(typeof Permissions?.isCurrentUserAdmin=="function")try{return Permissions.isCurrentUserAdmin()}catch{return(AppState.currentUser?.role||"").toLowerCase()==="admin"}return(AppState.currentUser?.role||"").toLowerCase()==="admin"},getScorecardMonths(){return this.getScorecardMonthNames().map((e,t)=>({index:t,key:String(t+1).padStart(2,"0"),label:e}))},getScorecardManualRecords(){return(!AppState.appData||typeof AppState.appData!="object")&&(AppState.appData={}),Array.isArray(AppState.appData.safetyPerformanceKPIs)||(AppState.appData.safetyPerformanceKPIs=[]),AppState.appData.safetyPerformanceKPIs},getScorecardYearRange(){const e=new Set([this.scorecardYear,new Date().getFullYear(),new Date().getFullYear()-1,new Date().getFullYear()-2]);return this.getScorecardManualRecords().forEach(t=>{const a=Number(t?.year);Number.isFinite(a)&&a>2e3&&e.add(a)}),(AppState.appData?.externalWorkforceMonthly||[]).forEach(t=>{const a=Number(t?.year);Number.isFinite(a)&&a>2e3&&e.add(a)}),Array.from(e).sort((t,a)=>a-t)},parseScorecardDate(e){if(!e)return null;if(e instanceof Date)return Number.isNaN(e.getTime())?null:e;const t=new Date(e);return Number.isNaN(t.getTime())?null:t},createMonthlyArray(e=0){return new Array(12).fill(e)},currentYtdLimit(e){const t=new Date;return e===t.getFullYear()?t.getMonth():11},isFutureMonth(e,t){const a=new Date;return e>a.getFullYear()||e===a.getFullYear()&&t>a.getMonth()},getCollectionVersion(e=[]){if(!Array.isArray(e)||e.length===0)return"0";let t=0;return e.forEach(a=>{const r=this.parseScorecardDate(a?.updatedAt||a?.createdAt||a?.date||a?.startDate||a?.visitDate||a?.injuryDate);r&&(t=Math.max(t,r.getTime()))}),`${e.length}:${t}`},getScorecardSignature(){const e=AppState.appData||{},a=["incidents","nearmiss","ptw","ptwRegistry","training","trainingAttendance","trainingCertificates","contractorTrainings","clinicVisits","sickLeave","injuries","employees","externalWorkforceMonthly","safetyPerformanceKPIs"].map(r=>`${r}:${this.getCollectionVersion(e[r]||[])}`);return a.push(`year:${this.scorecardYear}`),a.join("|")},async ensureScorecardSourceData(){if(this._scorecardSourceDataLoaded)return;if(this._scorecardSourceDataPromise){await this._scorecardSourceDataPromise;return}const e=AppState.appData||(AppState.appData={}),t=[],a=(s,i)=>{Array.isArray(e[i])&&e[i].length>0||typeof GoogleIntegration>"u"||typeof GoogleIntegration.readFromSheets!="function"||t.push(GoogleIntegration.readFromSheets(s,15e3).then(o=>{Array.isArray(o)&&(e[i]=o)}).catch(()=>{}))},r=(s,i)=>{Array.isArray(e[i])&&e[i].length>0||typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"||t.push(GoogleIntegration.sendRequest({action:s,data:{}}).then(o=>{o?.success&&Array.isArray(o.data)&&(e[i]=o.data)}).catch(()=>{}))};a("Incidents","incidents"),a("NearMiss","nearmiss"),a("PTW","ptw"),a("PTWRegistry","ptwRegistry"),a("ClinicVisits","clinicVisits"),a("SickLeave","sickLeave"),a("Injuries","injuries"),a("Employees","employees"),a("ExternalWorkforceMonthly","externalWorkforceMonthly"),a("SafetyPerformanceKPIs","safetyPerformanceKPIs"),r("getAllTrainings","training"),r("getAllTrainingAttendance","trainingAttendance"),r("getAllTrainingCertificates","trainingCertificates"),r("getAllContractorTrainings","contractorTrainings"),this._scorecardSourceDataPromise=Promise.allSettled(t).finally(()=>{this._scorecardSourceDataLoaded=!0,this._scorecardSourceDataPromise=null}),await this._scorecardSourceDataPromise},buildScorecardStyles(){return`
            <style id="safety-performance-scorecard-styles">
                .spk-tab-shell { margin-top: 1.5rem; }
                .spk-tab-bar { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem; }
                .spk-tab-btn { border: 1px solid #dbeafe; background: #eff6ff; color: #1d4ed8; padding: 0.8rem 1.2rem; border-radius: 14px; font-weight: 700; transition: 0.2s ease; cursor: pointer; }
                .spk-tab-btn.active { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #fff; border-color: #0f172a; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.18); }
                .spk-tab-panel.hidden { display: none; }
                .spk-scorecard-hero { background: linear-gradient(135deg, #fff7e6 0%, #ffffff 52%, #eff6ff 100%); border: 1px solid #e5e7eb; border-radius: 22px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08); }
                .spk-scorecard-title { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
                .spk-scorecard-eyebrow { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.04em; color: #1d4ed8; text-transform: uppercase; }
                .spk-scorecard-note { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem; }
                .spk-scorecard-note-chip { border-radius: 999px; padding: 0.45rem 0.8rem; font-size: 0.82rem; font-weight: 700; }
                .spk-chip-blue { background: #dbeafe; color: #1e40af; }
                .spk-chip-yellow { background: #fef3c7; color: #92400e; }
                .spk-scorecard-table-wrap { overflow: auto; border: 1px solid #d1d5db; border-radius: 18px; background: #fff; }
                .spk-scorecard-table { width: max-content; min-width: 100%; border-collapse: collapse; font-size: 0.82rem; }
                .spk-scorecard-table th, .spk-scorecard-table td { border: 1px solid #1f2937; padding: 0.45rem 0.55rem; text-align: center; white-space: nowrap; }
                .spk-scorecard-table th:first-child, .spk-scorecard-table td:first-child { position: sticky; z-index: 2; background: #fff; min-width: 255px; max-width: 255px; white-space: normal; }
                .spk-scorecard-table thead th:first-child { z-index: 4; }
                .spk-scorecard-table thead th { background: #ffffff; font-weight: 800; }
                .spk-scorecard-table .spk-ytd-head { color: #0ea5e9; font-weight: 800; }
                .spk-scorecard-table th.spk-month-head { min-width: 5.75rem; font-size: 0.78rem; white-space: nowrap; }
                .spk-row-section td { background: #ffffff; border: 0; font-size: 1rem; font-weight: 800; color: #0369a1; padding: 1rem 0.5rem 0.35rem; }
                .spk-row-subsection td { background: #ffffff; border-left: 0; border-right: 0; font-weight: 800; color: #0f766e; padding-top: 0.55rem; padding-bottom: 0.35rem; }
                .spk-row-subsection .spk-subsection-ytd { text-align: center; color: #0ea5e9; font-weight: 800; }
                .spk-label-cell { font-weight: 600; }
                .spk-cell-numeric { direction: ltr; unicode-bidi: isolate; }
                #safety-performance-kpis-section[dir="ltr"] .spk-scorecard-table { direction: ltr; }
                #safety-performance-kpis-section[dir="ltr"] .spk-scorecard-table th:first-child,
                #safety-performance-kpis-section[dir="ltr"] .spk-scorecard-table td:first-child { left: 0; right: auto; text-align: left; direction: ltr; }
                #safety-performance-kpis-section[dir="ltr"] .spk-label-cell { direction: ltr; text-align: left; }
                #safety-performance-kpis-section[dir="ltr"] .spk-row-section td,
                #safety-performance-kpis-section[dir="ltr"] .spk-row-subsection td { text-align: left; direction: ltr; }
                #safety-performance-kpis-section[dir="rtl"] #spk-scorecard-panel,
                #safety-performance-kpis-section[dir="rtl"] .spk-scorecard-hero { direction: rtl; text-align: start; }
                #safety-performance-kpis-section[dir="rtl"] .spk-scorecard-table-wrap { direction: rtl; }
                #safety-performance-kpis-section[dir="rtl"] .spk-scorecard-table { direction: rtl; }
                #safety-performance-kpis-section[dir="rtl"] .spk-scorecard-table th:first-child,
                #safety-performance-kpis-section[dir="rtl"] .spk-scorecard-table td:first-child { right: 0; left: auto; text-align: right; direction: rtl; box-shadow: -4px 0 8px rgba(15, 23, 42, 0.06); }
                #safety-performance-kpis-section[dir="rtl"] .spk-label-cell { direction: rtl; text-align: right; }
                #safety-performance-kpis-section[dir="rtl"] .spk-row-section td,
                #safety-performance-kpis-section[dir="rtl"] .spk-row-subsection td { text-align: right; direction: rtl; }
                #safety-performance-kpis-section[dir="rtl"] .spk-scorecard-table th:not(:first-child),
                #safety-performance-kpis-section[dir="rtl"] .spk-scorecard-table td:not(:first-child) { direction: ltr; unicode-bidi: isolate; text-align: center; }
                #safety-performance-kpis-section[dir="ltr"] #spk-scorecard-panel,
                #safety-performance-kpis-section[dir="ltr"] .spk-scorecard-hero { direction: ltr; text-align: start; }
                .spk-cell-blue { background: #dceaf6; }
                .spk-cell-yellow { background: #fff6cf; }
                .spk-cell-neutral { background: #ffffff; }
                .spk-cell-manual { background: #dbeafe; box-shadow: inset 0 0 0 2px rgba(59, 130, 246, 0.18); }
                .spk-manual-input, .spk-manual-select { width: 100%; min-width: 82px; border: 0; background: transparent; text-align: center; font-weight: 700; color: #1e3a8a; outline: none; }
                .spk-manual-input[disabled], .spk-manual-select[disabled] { color: #475569; cursor: default; }
                .spk-row-total td:first-child { font-weight: 800; }
                .spk-muted { color: #64748b; font-size: 0.78rem; margin-top: 0.75rem; }
                @media (max-width: 1024px) { .spk-scorecard-title { flex-direction: column; } .spk-scorecard-table { font-size: 0.76rem; } .spk-scorecard-table th:first-child, .spk-scorecard-table td:first-child { min-width: 210px; max-width: 210px; } }
                @media (max-width: 768px) { .spk-tab-btn { width: 100%; justify-content: center; } .spk-scorecard-hero { padding: 1rem; border-radius: 18px; } }
            </style>
        `},renderScorecardShell(){const e=(t,a)=>this._t(t,a);return`
            <div class="spk-scorecard-hero">
                <div class="spk-scorecard-title">
                    <div>
                        <div class="spk-scorecard-eyebrow">${e("module.kpi.scorecard.eyebrow","\u0645\u0635\u062F\u0631 \u0627\u0644\u062D\u0642\u064A\u0642\u0629 \u0627\u0644\u0648\u0627\u062D\u062F")}</div>
                        <h2 class="text-2xl font-black text-slate-900 mt-2">${e("module.kpi.scorecard.title","\u0644\u0648\u062D\u0629 \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}</h2>
                        <p class="text-sm text-slate-600 mt-2">${e("module.kpi.scorecard.subtitle","\u0644\u0648\u062D\u0629 \u0634\u0647\u0631\u064A\u0629 \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0648\u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629.")}</p>
                    </div>
                    <div class="flex items-center gap-3 flex-wrap">
                        <label class="text-sm font-semibold text-slate-700" for="spk-scorecard-year">${e("module.kpi.scorecard.year","\u0627\u0644\u0633\u0646\u0629")}</label>
                        <select id="spk-scorecard-year" class="form-input !w-auto min-w-[120px]"></select>
                    </div>
                </div>
                <div class="spk-scorecard-note">
                    <span class="spk-scorecard-note-chip spk-chip-blue">${e("module.kpi.scorecard.chipBlue","\u064A\u064F\u062F\u062E\u0644 \u0641\u0642\u0637 \u0641\u064A \u0627\u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0632\u0631\u0642\u0627\u0621 \u0639\u0646\u062F \u0639\u062F\u0645 \u062A\u0648\u0641\u0631 \u0645\u0635\u062F\u0631 \u0645\u0628\u0627\u0634\u0631")}</span>
                    <span class="spk-scorecard-note-chip spk-chip-yellow">${e("module.kpi.scorecard.chipYellow","\u0627\u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0635\u0641\u0631\u0627\u0621 \u062A\u064F\u062D\u0633\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B")}</span>
                </div>
            </div>
            <div class="spk-scorecard-table-wrap">
                <div id="spk-scorecard-table-container"></div>
            </div>
            <p class="spk-muted">${e("module.kpi.scorecard.footer","\u062A\u064F\u062D\u062F\u0651\u064E\u062B \u0627\u0644\u0644\u0648\u062D\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0641\u062A\u062D \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0639\u0646\u062F \u062A\u063A\u064A\u0651\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629.")}</p>
        `},enhanceWithScorecardTab(e){if(!e||e.querySelector("#spk-tab-overview")){this.populateScorecardYearSelector(),this.renderScorecardTable(!0),this.applyScorecardAccessState();return}e.insertAdjacentHTML("afterbegin",this.buildScorecardStyles());const t=e.querySelector(".section-header");if(!t)return;const a=(h,m)=>this._t(h,m),r=document.createElement("div");r.className="spk-tab-shell",r.innerHTML=`
            <div class="spk-tab-bar">
                <button type="button" id="spk-tab-overview" class="spk-tab-btn active" data-tab="overview">${a("module.kpi.tab.kpisOverview","\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u2014 KPIs")}</button>
                <button type="button" id="spk-tab-annual-plan" class="spk-tab-btn" data-tab="annual-plan">
                    <i class="fas fa-calendar-alt me-1"></i>
                    ${a("module.kpi.tab.kpisAnnual","\u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629")}
                </button>
                <button type="button" id="spk-tab-monitoring-plan" class="spk-tab-btn" data-tab="monitoring-plan">
                    <i class="fas fa-clipboard-check me-1"></i>
                    ${a("module.kpi.tab.hseMonitoring","\u062E\u0637\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 HSE")}
                </button>
                <button type="button" id="spk-tab-scorecard" class="spk-tab-btn" data-tab="scorecard">${a("module.kpi.tab.scorecard","\u0644\u0648\u062D\u0629 \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}</button>
            </div>
        `,this.applyModuleI18n(r),t.insertAdjacentElement("afterend",r);const s=[];let i=r.nextSibling;for(;i;){const h=i.nextSibling;s.push(i),i=h}const o=document.createElement("div");o.id="spk-overview-panel",o.className="spk-tab-panel",s.forEach(h=>o.appendChild(h));const n=document.createElement("div");n.id="spk-annual-plan-panel",n.className="spk-tab-panel hidden",n.innerHTML=this.renderAnnualPlanTab(),this.applyModuleI18n(n);const c=document.createElement("div");c.id="spk-monitoring-plan-panel",c.className="spk-tab-panel hidden",c.innerHTML=this.renderMonitoringPlanTab(),this.applyModuleI18n(c);const l=document.createElement("div");l.id="spk-scorecard-panel",l.className="spk-tab-panel hidden",l.innerHTML=this.renderScorecardShell(),this.applyModuleI18n(l),e.appendChild(o),e.appendChild(n),e.appendChild(c),e.appendChild(l),r.querySelectorAll(".spk-tab-btn").forEach(h=>{h.addEventListener("click",()=>{const m=h.getAttribute("data-tab")||"overview";this.switchScorecardTab(m)})});const d=document.getElementById("kpi-annual-year-selector");d&&d.addEventListener("change",()=>{this.loadKPIAnnualPlans()});const u=document.getElementById("hse-monitoring-year-selector");u&&u.addEventListener("change",()=>{this.loadHSEMonitoringPlans()});const g=l.querySelector("#spk-scorecard-year");g&&g.addEventListener("change",h=>{const m=Number(h.target.value);Number.isFinite(m)&&m>2e3&&(this.scorecardYear=m,this.renderScorecardTable(!0))}),l.addEventListener("change",h=>{const m=h.target;if(!m||!m.matches("[data-scorecard-manual]"))return;const p=m.getAttribute("data-scorecard-manual")||"",f=Number(m.getAttribute("data-year")),b=Number(m.getAttribute("data-month"));this.saveScorecardManualValue(p,f,b,m.value)}),l.addEventListener("blur",h=>{const m=h.target;if(!m||!m.matches(".spk-manual-input"))return;const p=m.getAttribute("data-scorecard-manual")||"",f=Number(m.getAttribute("data-year")),b=Number(m.getAttribute("data-month"));this.saveScorecardManualValue(p,f,b,m.value)},!0),this.populateScorecardYearSelector(),this.applyScorecardAccessState(),this.renderScorecardTable(!0),this.applyModuleI18n(e)},switchScorecardTab(e){this.activeTab=e,document.querySelectorAll(".spk-tab-btn").forEach(a=>{a.classList.toggle("active",a.getAttribute("data-tab")===e)});const t={overview:"spk-overview-panel","annual-plan":"spk-annual-plan-panel","monitoring-plan":"spk-monitoring-plan-panel",scorecard:"spk-scorecard-panel"};Object.keys(t).forEach(a=>{const r=document.getElementById(t[a]);r&&r.classList.toggle("hidden",a!==e)}),e==="annual-plan"?this.loadKPIAnnualPlans():e==="monitoring-plan"?this.loadHSEMonitoringPlans():e==="scorecard"&&(this.populateScorecardYearSelector(),this.renderScorecardTable())},populateScorecardYearSelector(){const e=document.getElementById("spk-scorecard-year");e&&(e.innerHTML=this.getScorecardYearRange().map(t=>`<option value="${t}" ${t===this.scorecardYear?"selected":""}>${t}</option>`).join(""))},applyScorecardAccessState(){const e=this.isAdminUser();["kpis-export-excel-btn","kpis-export-pdf-btn","kpis-settings-btn"].forEach(t=>{const a=document.getElementById(t);a&&(a.style.display=e?"":"none",a.disabled=!e)}),document.querySelectorAll(".spk-manual-input, .spk-manual-select").forEach(t=>{t.disabled=!e})},switchTab(e){this.activeTab=e==="scorecard"?"scorecard":"overview";const t=document.getElementById("spk-overview-panel"),a=document.getElementById("spk-scorecard-panel");document.querySelectorAll(".spk-tab-btn").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-tab")===this.activeTab)}),t?.classList.toggle("hidden",this.activeTab!=="overview"),a?.classList.toggle("hidden",this.activeTab!=="scorecard"),this.activeTab==="scorecard"&&(this.populateScorecardYearSelector(),this.renderScorecardTable())},queueScorecardRefresh(e=!1){clearTimeout(this._scorecardRefreshTimer),this._scorecardRefreshTimer=setTimeout(()=>{document.getElementById("spk-scorecard-table-container")&&this.renderScorecardTable(e)},80)},startScorecardAutoRefresh(){if(this._scorecardWatchStarted)return;this._scorecardWatchStarted=!0;const e=(t=!1)=>this.queueScorecardRefresh(t);document.addEventListener("data-saved",()=>e(!0)),document.addEventListener("ptw:updated",()=>e(!0)),document.addEventListener("loginSuccess",()=>e(!0)),window.addEventListener("syncDataCompleted",()=>e(!0)),window.addEventListener("employeesDataUpdated",()=>e(!0)),window.addEventListener("focus",()=>e()),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),this._scorecardWatchInterval=window.setInterval(()=>{if(!document.getElementById("spk-scorecard-table-container"))return;this.getScorecardSignature()!==this._lastScorecardSignature&&this.renderScorecardTable()},15e3)},isEmployeeInactiveRecord(e={}){const t=String(e?.status||e?.employmentStatus||"").trim().toLowerCase();return t==="inactive"||t==="\u063A\u064A\u0631 \u0646\u0634\u0637"},getOperationalEmployeesForMonth(e=[],t,a){const r=new Date(t,a+1,0,23,59,59,999);return e.filter(s=>{if(!s)return!1;const i=this.parseScorecardDate(s.hireDate||s.startDate||s.createdAt),o=this.parseScorecardDate(s.resignationDate||s.terminationDate||s.endDate);return!(i&&i>r||o&&o<=r||this.isEmployeeInactiveRecord(s)&&!o)}).length},getExternalWorkforceMonthKey(e){return["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"][e]||""},getExternalWorkforceForMonth(e,t){const a=this.getExternalWorkforceMonthKey(t);if(!a)return 0;const r=typeof Employees<"u"?Employees:typeof window<"u"?window.Employees:null;if(r&&typeof r.getAvailableContractorsForExternalWorkforce=="function"&&typeof r.getExternalWorkforceRecord=="function"){const s=r.getAvailableContractorsForExternalWorkforce();if(Array.isArray(s)&&s.length>0)return s.reduce((i,o)=>{const n=r.getExternalWorkforceRecord(e,o.stableKey);if(!n)return i;const c=parseFloat(n[a]);return i+(Number.isFinite(c)&&c>=0?c:0)},0)}return(AppState.appData?.externalWorkforceMonthly||[]).reduce((s,i)=>!i||Number(i.year)!==Number(e)?s:s+(parseFloat(i[a])||0),0)},getContractorDerivedHoursForMonth(e,t){const a=this.getExternalWorkforceForMonth(e,t),r=Number(a||0)*8*22;return parseFloat(r.toFixed(2))},getWorkforcePeriodContext(){const{start:e,end:t}=this.getDateRange(),a=e.getFullYear(),r=e.getMonth();let s;if(this.filters.period==="yearly")s=12;else if(this.filters.period==="quarterly")s=3;else if(this.filters.period==="custom"){const i=(t.getFullYear()-e.getFullYear())*12+(t.getMonth()-e.getMonth())+1;s=Math.max(1,i)}else s=1;return{year:a,startMonth:r,periodMonths:s,start:e,end:t}},calculatePermanentEmployeesCount(){const{year:e,startMonth:t,periodMonths:a}=this.getWorkforcePeriodContext(),r=AppState&&AppState.appData&&AppState.appData.employees||[];if(!r.length)return 0;if(a===1)return this.getOperationalEmployeesForMonth(r,e,t);let s=0;for(let i=t;i<t+a&&i<12;i++)s+=this.getOperationalEmployeesForMonth(r,e,i);return Math.round(s/a)},calculateTemporaryWorkforcePersonMonths(){const{year:e,startMonth:t,periodMonths:a}=this.getWorkforcePeriodContext();let r=0;for(let s=t;s<t+a&&s<12;s++)r+=this.getExternalWorkforceForMonth(e,s);return r},calculateTemporaryWorkforceCount(){const{periodMonths:e}=this.getWorkforcePeriodContext(),t=this.calculateTemporaryWorkforcePersonMonths();return Math.round(e===1?t:t/e)},calculatePermanentEmployeesHours(){const{startMonth:e,periodMonths:t,year:a}=this.getWorkforcePeriodContext(),r=AppState&&AppState.appData&&AppState.appData.employees||[];if(!r.length)return 0;let s=0;for(let i=e;i<e+t&&i<12;i++)s+=this.getOperationalEmployeesForMonth(r,a,i);return s*8*22},calculateTemporaryWorkforceHours(){return this.calculateTemporaryWorkforcePersonMonths()*8*22},calculateCombinedWorkforceHours(){return this.calculatePermanentEmployeesHours()+this.calculateTemporaryWorkforceHours()},getManualScorecardRecord(e,t){const a=String(t+1).padStart(2,"0");return this.getScorecardManualRecords().find(r=>r&&r.recordType==="scorecard-manual"&&Number(r.year)===Number(e)&&String(r.month).padStart(2,"0")===a)},getManualScorecardValue(e,t,a){const r=this.getManualScorecardRecord(t,a);return r?r[e]:void 0},getHoursWorkedValue(e,t,a){const r=this.getManualScorecardValue("hoursWorked",e,t);if(r!=null&&String(r).trim()!==""){const i=parseFloat(r);if(Number.isFinite(i))return i}const s=Number(a||0)*8*22;return parseFloat(s.toFixed(2))},getTextBag(e={}){const t=Array.isArray(e?.investigation?.incidentTypes)?e.investigation.incidentTypes.join(" "):"";return[e?.incidentType,e?.type,e?.title,e?.description,e?.reason,e?.diagnosis,e?.visitType,e?.status,e?.name,e?.subject,e?.topic,e?.certificateName,t].filter(Boolean).join(" ").toLowerCase()},matchesNeboshRecord(e={}){const t=this.getTextBag(e);return t.includes("nebosh")||t.includes("hse lead")||t.includes("uae hse")},normalizeNeboshStatus(e={}){const t=this.getTextBag(e);return t.includes("certified")||t.includes("valid")||t.includes("\u0633\u0627\u0631\u064A\u0629")||t.includes("\u0645\u0639\u062A\u0645\u062F")?"Certified":t.includes("expired")||t.includes("\u0645\u0646\u062A\u0647\u064A")?"Expired":t.includes("progress")||t.includes("planned")||t.includes("\u0645\u062E\u0637\u0637")||t.includes("\u062C\u0627\u0631\u064A")?"In Progress":"Certified"},getNeboshStatusForMonth(e,t){const a=this.getManualScorecardValue("neboshStatus",e,t);if(a!=null&&String(a).trim()!=="")return String(a).trim();const r=new Date(e,t+1,0,23,59,59,999),s=(AppState.appData.trainingCertificates||[]).filter(o=>this.matchesNeboshRecord(o)).map(o=>({date:this.parseScorecardDate(o.expiryDate||o.issueDate||o.date||o.createdAt),status:this.normalizeNeboshStatus(o)})).filter(o=>o.date&&o.date<=r).sort((o,n)=>n.date-o.date);if(s.length>0)return s[0].status;const i=(AppState.appData.training||[]).filter(o=>this.matchesNeboshRecord(o)).map(o=>({date:this.parseScorecardDate(o.startDate||o.date||o.createdAt),status:String(o.status||"").toLowerCase().includes("completed")||String(o.status||"").includes("\u0645\u0643\u062A\u0645\u0644")?"Certified":"In Progress"})).filter(o=>o.date&&o.date<=r).sort((o,n)=>n.date-o.date);return i.length>0?i[0].status:""},async saveScorecardManualValue(e,t,a,r){if(!this.isAdminUser()||!e||!Number.isFinite(t)||!Number.isFinite(a))return;const s=String(a+1).padStart(2,"0"),i=this.getScorecardManualRecords();let o=this.getManualScorecardRecord(t,a);if(o||(o={id:`SPK-${t}-${s}`,recordType:"scorecard-manual",year:t,month:s,createdAt:new Date().toISOString()},i.push(o)),e==="hoursWorked"){const n=String(r??"").trim();if(!n)o.hoursWorked="";else{const c=parseFloat(n);if(!Number.isFinite(c))o.hoursWorked="";else{const l=this.getContractorDerivedHoursForMonth(t,a);o.hoursWorked=parseFloat((Math.max(0,c)+l).toFixed(2))}}}else o[e]=String(r||"").trim();o.updatedAt=new Date().toISOString(),o.updatedBy=AppState.currentUser?.name||AppState.currentUser?.email||"admin",this._scorecardCache.clear(),this.renderScorecardTable(!0),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.autoSave=="function"&&GoogleIntegration.autoSave("SafetyPerformanceKPIs",i).catch(()=>{})},isLostTimeIncident(e={}){const t=this.getTextBag(e),a=Array.isArray(e?.investigation?.incidentTypes)?e.investigation.incidentTypes:[],r=parseFloat(e.lostDays||e.daysLost||e.lostTimeDays||e.timeOffWork||0)||0;return a.includes("injury-lost")||r>0||t.includes("lost time")||t.includes("\u062A\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644")||t.includes(" lti")},isFirstAidIncident(e={}){const t=this.getTextBag(e);return t.includes("first aid")||t.includes("\u0627\u0633\u0639\u0627\u0641\u0627\u062A")||t.includes("\u0625\u0633\u0639\u0627\u0641\u0627\u062A")||t.includes("\u0627\u0633\u0639\u0627\u0641")},isNonLostTimeIncident(e={}){const t=this.getTextBag(e),a=Array.isArray(e?.investigation?.incidentTypes)?e.investigation.incidentTypes:[];return this.isLostTimeIncident(e)||this.isFirstAidIncident(e)?!1:a.includes("injury-no-lost")||t.includes("nlti")||t.includes("\u0625\u0635\u0627\u0628\u0629")||t.includes("injury")},isRecordableIncident(e={}){const t=this.getTextBag(e);return(Array.isArray(e?.investigation?.incidentTypes)?e.investigation.incidentTypes:[]).includes("fatality")||t.includes("fatality")||t.includes("\u0648\u0641\u0627\u0629")?!0:this.isLostTimeIncident(e)||this.isNonLostTimeIncident(e)||t.includes("recordable")},isIllnessVisit(e={}){const t=this.getTextBag(e);return t.includes("\u0645\u0631\u0636")||t.includes("illness")||t.includes("occupational")},isOccHealthHazard(e={}){const t=this.getTextBag(e);return t.includes("health")||t.includes("\u0635\u062D\u0629")||t.includes("ergonomic")||t.includes("chemical")||t.includes("dust")||t.includes("noise")},categorizePermitType(e={}){const t=this.getTextBag({...e,type:e?.workType||e?.permitType||e?.permitTypeDisplay});return t.includes("height")||t.includes("\u0627\u0631\u062A\u0641\u0627\u0639")?"height":t.includes("elect")||t.includes("\u0643\u0647\u0631\u0628")||t.includes("loto")||t.includes("lockout")||t.includes("tagout")?"electrical":t.includes("hot")||t.includes("\u0633\u0627\u062E\u0646")?"hot":"other"},getMonthIndexForYear(e,t){const a=this.parseScorecardDate(e);return!a||a.getFullYear()!==t?-1:a.getMonth()},buildScorecardBaseYear(e){const t=`base:${e}:${this.getScorecardSignature()}`,a=this._scorecardCache.get(t);if(a)return a;const r=AppState.appData||{},s=Array.isArray(r.employees)?r.employees:[],i={year:e,directEmployeeCounts:this.createMonthlyArray(0),contractorEmployeeCounts:this.createMonthlyArray(0),employeeCounts:this.createMonthlyArray(0),hoursWorked:this.createMonthlyArray(0),lti:this.createMonthlyArray(0),nlti:this.createMonthlyArray(0),firstAid:this.createMonthlyArray(0),recordable:this.createMonthlyArray(0),injuries:this.createMonthlyArray(0),fatalities:this.createMonthlyArray(0),daysLost:this.createMonthlyArray(0),totalIncidents:this.createMonthlyArray(0),hazards:this.createMonthlyArray(0),occLti:this.createMonthlyArray(0),occNlti:this.createMonthlyArray(0),occHazards:this.createMonthlyArray(0),permitsHeight:this.createMonthlyArray(0),permitsElectrical:this.createMonthlyArray(0),permitsHot:this.createMonthlyArray(0),permitsOther:this.createMonthlyArray(0),trainingSessions:this.createMonthlyArray(0),trainingAttendees:this.createMonthlyArray(0),trainingHours:this.createMonthlyArray(0),neboshStatus:this.createMonthlyArray("")},o=typeof HseMetrics<"u"&&typeof HseMetrics.buildMonthlyBase=="function";for(let l=0;l<12;l+=1)i.directEmployeeCounts[l]=this.getOperationalEmployeesForMonth(s,e,l),i.contractorEmployeeCounts[l]=this.getExternalWorkforceForMonth(e,l),i.employeeCounts[l]=i.directEmployeeCounts[l]+i.contractorEmployeeCounts[l],o||(i.hoursWorked[l]=this.getHoursWorkedValue(e,l,i.employeeCounts[l])),i.neboshStatus[l]=this.getNeboshStatusForMonth(e,l);if(o){const l=HseMetrics.buildMonthlyBase(e,r);i.lti=l.lti,i.nlti=l.nlti,i.firstAid=l.firstAid,i.recordable=l.recordables,i.injuries=l.injuries,i.fatalities=l.fatalities,i.daysLost=l.daysLost,i.totalIncidents=l.totalIncidents,i.hoursWorked=l.manHours}else(r.incidents||[]).forEach(l=>{const d=this.getMonthIndexForYear(l?.date||l?.incidentDate||l?.createdAt,e);d<0||(this.isLostTimeIncident(l)?i.lti[d]+=1:this.isNonLostTimeIncident(l)&&(i.nlti[d]+=1),this.isFirstAidIncident(l)&&(i.firstAid[d]+=1),this.isRecordableIncident(l)&&(i.recordable[d]+=1),i.totalIncidents[d]+=1)});(r.nearmiss||[]).forEach(l=>{const d=this.getMonthIndexForYear(l?.date||l?.createdAt,e);d<0||(i.hazards[d]+=1,this.isOccHealthHazard(l)&&(i.occHazards[d]+=1))}),(r.clinicVisits||[]).forEach(l=>{const d=this.getMonthIndexForYear(l?.visitDate||l?.createdAt,e);d<0||this.isIllnessVisit(l)&&(i.occNlti[d]+=1)}),(r.sickLeave||[]).forEach(l=>{const d=this.getMonthIndexForYear(l?.startDate||l?.createdAt,e);d<0||(i.occLti[d]+=1)});const n=new Map;[...r.ptw||[],...r.ptwRegistry||[]].forEach(l=>{const d=l?.permitId||l?.id||`${l?.workType||l?.permitType||"permit"}-${l?.startDate||l?.openDate||l?.createdAt||""}`;n.has(d)||n.set(d,l)}),n.forEach(l=>{const d=this.getMonthIndexForYear(l?.startDate||l?.openDate||l?.createdAt||l?.timeFrom,e);if(d<0)return;const u=this.categorizePermitType(l);u==="height"?i.permitsHeight[d]+=1:u==="electrical"?i.permitsElectrical[d]+=1:u==="hot"?i.permitsHot[d]+=1:i.permitsOther[d]+=1});const c=new Map;return(r.trainingAttendance||[]).forEach(l=>{const d=this.getMonthIndexForYear(l?.date||l?.attendanceDate||l?.createdAt,e);d<0||(i.trainingAttendees[d]+=1,i.trainingHours[d]+=parseFloat(l?.totalHours||l?.hours||0)||0,l?.trainingId&&c.set(String(l.trainingId),!0))}),(r.training||[]).forEach(l=>{const d=this.getMonthIndexForYear(l?.startDate||l?.date||l?.createdAt,e);if(d<0)return;i.trainingSessions[d]+=1;const u=String(l?.id||"");if(!u||!c.has(u)){const g=parseFloat(l?.participantsCount||l?.attendeesCount||(Array.isArray(l?.participants)?l.participants.length:0)||0)||0,h=parseFloat(l?.totalHours||l?.hours||l?.trainingHours||0)||0;i.trainingAttendees[d]+=g,i.trainingHours[d]+=h}}),(r.contractorTrainings||[]).forEach(l=>{const d=this.getMonthIndexForYear(l?.date||l?.trainingDate||l?.createdAt,e);d<0||(i.trainingSessions[d]+=1,i.trainingAttendees[d]+=parseFloat(l?.traineesCount||l?.attendees||0)||0,i.trainingHours[d]+=parseFloat(l?.totalHours||l?.hours||0)||0)}),this._scorecardCache.set(t,i),i},sumYtd(e=[],t=11){return e.slice(0,t+1).reduce((a,r)=>a+(parseFloat(r)||0),0)},averageYtd(e=[],t=11){const a=e.slice(0,t+1).filter(r=>r!==""&&r!==null&&r!==void 0);return a.length?a.reduce((r,s)=>r+(parseFloat(s)||0),0)/a.length:0},calculateRateSeries(e=[],t=[]){return e.map((a,r)=>{const s=parseFloat(t[r]||0)||0;return s>0?parseFloat(a||0)*1e6/s:0})},calculateRollingSeries(e=[],t=[],a=[],r=[]){const s=[...t,...e],i=[...r,...a],o=this.createMonthlyArray(0);for(let n=12;n<24;n+=1){const c=Math.max(0,n-11),l=s.slice(c,n+1).reduce((u,g)=>u+(parseFloat(g)||0),0),d=i.slice(c,n+1).reduce((u,g)=>u+(parseFloat(g)||0),0);o[n-12]=d>0?l*1e6/d:0}return o},buildScorecardData(e){const t=`${this.getScorecardSignature()}|model`,a=`model:${e}:${t}`;if(this._scorecardCache.has(a))return this._scorecardCache.get(a);const r=this.buildScorecardBaseYear(e),s=this.buildScorecardBaseYear(e-1),i=this.currentYtdLimit(e),o=r.permitsHeight.map((v,w)=>v+r.permitsElectrical[w]+r.permitsHot[w]+r.permitsOther[w]),n=r.occLti.map((v,w)=>v+r.occNlti[w]),c=typeof HseMetrics<"u"&&HseMetrics.loadMultipliers?HseMetrics.loadMultipliers():{TRIR:2e5,AFR:1e6,FAR:1e8,FR:1e6,SR:1e6,IR:1e6};let l,d,u,g,h,m,p,f,b,x,k,S;if(typeof HseMetrics<"u"&&HseMetrics.getScorecardRates){const v=HseMetrics.getScorecardRates({recordables:r.recordable,injuries:r.injuries,fatalities:r.fatalities,lti:r.lti,daysLost:r.daysLost,totalIncidents:r.totalIncidents,manHours:r.hoursWorked},c);l=v.ltir,d=v.trir,u=v.afr,g=v.far,h=v.sr,m=v.ir,p=HseMetrics.calculateRollingSeries(r.lti,s.lti,r.hoursWorked,s.hoursWorked,c.FR),f=HseMetrics.calculateRollingSeries(r.recordable,s.recordable,r.hoursWorked,s.hoursWorked,c.TRIR),b=HseMetrics.buildMonthlyRateSeries(r.occLti,r.hoursWorked,c.FR),x=HseMetrics.buildMonthlyRateSeries(n,r.hoursWorked,c.TRIR),k=HseMetrics.calculateRollingSeries(r.occLti,s.occLti,r.hoursWorked,s.hoursWorked,c.FR),S=HseMetrics.calculateRollingSeries(n,s.occLti.map((w,T)=>w+s.occNlti[T]),r.hoursWorked,s.hoursWorked,c.TRIR)}else l=this.calculateRateSeries(r.lti,r.hoursWorked),d=this.calculateRateSeries(r.recordable,r.hoursWorked),u=this.calculateRateSeries(r.injuries,r.hoursWorked),g=this.calculateRateSeries(r.fatalities,r.hoursWorked),h=this.calculateRateSeries(r.daysLost,r.hoursWorked),m=this.calculateRateSeries(r.totalIncidents,r.hoursWorked),b=this.calculateRateSeries(r.occLti,r.hoursWorked),x=this.calculateRateSeries(n,r.hoursWorked),p=this.calculateRollingSeries(r.lti,s.lti,r.hoursWorked,s.hoursWorked),f=this.calculateRollingSeries(r.recordable,s.recordable,r.hoursWorked,s.hoursWorked),k=this.calculateRollingSeries(r.occLti,s.occLti,r.hoursWorked,s.hoursWorked),S=this.calculateRollingSeries(n,s.occLti.map((v,w)=>v+s.occNlti[w]),r.hoursWorked,s.hoursWorked);const E=r.trainingHours.map((v,w)=>{const T=parseFloat(r.employeeCounts[w]||0)||0;return T>0?v/T:0}),C=E.map(v=>v*60),y=r.trainingHours.map((v,w)=>{const T=this.sumYtd(r.trainingHours,w),F=this.averageYtd(r.employeeCounts,w);return F>0?T/F:0}),$=v=>{const w=Number(v||0)*8*22;return parseFloat(w.toFixed(2))},I=r.contractorEmployeeCounts.map(v=>$(v)),A=r.hoursWorked.map((v,w)=>{const T=parseFloat(v)||0,F=I[w]||0;return Math.max(0,parseFloat((T-F).toFixed(2)))}),P=r.hoursWorked.map(v=>{const w=parseFloat(v);return Number.isFinite(w)?parseFloat(w.toFixed(2)):0}),D={year:e,ytdLimit:i,months:this.getScorecardMonths(),rows:{employeeCounts:r.employeeCounts,directEmployeeCounts:r.directEmployeeCounts,contractorEmployeeCounts:r.contractorEmployeeCounts,hoursWorked:r.hoursWorked,contractorHoursDisplay:I,permanentHoursDisplay:A,combinedHoursDisplay:P,lti:r.lti,nlti:r.nlti,firstAid:r.firstAid,recordable:r.recordable,injuries:r.injuries,fatalities:r.fatalities,daysLost:r.daysLost,totalIncidents:r.totalIncidents,ltir:l,trir:d,afr:u,far:g,sr:h,ir:m,rollingLtir:p,rollingTrir:f,hazards:r.hazards,occLti:r.occLti,occNlti:r.occNlti,occRecordable:n,occLtir:b,occTrir:x,rollingOccLtir:k,rollingOccTrir:S,occHazards:r.occHazards,permitsHeight:r.permitsHeight,permitsElectrical:r.permitsElectrical,permitsHot:r.permitsHot,permitsOther:r.permitsOther,permitTotal:o,trainingSessions:r.trainingSessions,trainingAttendees:r.trainingAttendees,trainingHours:r.trainingHours,trainingHoursPerFte:E,trainingMinutesPerFte:C,trainingHoursPerFteYtd:y,neboshStatus:r.neboshStatus,rateMultipliers:c}};return this._scorecardCache.set(a,D),D},formatScorecardValue(e,t=0,a=-1,r=this.scorecardYear){if(typeof e=="string"){const i=String(e).trim();if(!i||i==="-")return i||"-";const o=this.translateNeboshStatus(i);return o!==i?o:e}return this.isFutureMonth(r,a)?"":(parseFloat(e||0)||0).toLocaleString("en-US",{minimumFractionDigits:t,maximumFractionDigits:t})},getYtdValue(e=[],t="sum",a=this.currentYtdLimit(this.scorecardYear),r=null,s=null){if(t==="avg")return this.averageYtd(e,a);if(t==="rate"){const i=this.sumYtd(e,a),o=this.sumYtd(r||[],a),n=s||1e6;return typeof HseMetrics<"u"&&HseMetrics.computeRate?HseMetrics.computeRate(i,o,n):o>0?i*n/o:0}return t==="last"?e[Math.min(a,e.length-1)]||0:this.sumYtd(e,a)},applyScorecardRtlScroll(e){if(!this.isModuleRTL())return;const t=e?.closest(".spk-scorecard-table-wrap");if(!t)return;const a=()=>{const r=t.querySelector("thead th:first-child"),s=t.querySelector("thead th.spk-month-head");if(!r||!s)return;const i=s.getBoundingClientRect().right-r.getBoundingClientRect().left;if(i<=1)return;const o=t.scrollLeft;t.scrollLeft+=i,Math.abs(t.scrollLeft-o)<1&&(t.scrollLeft-=i)};requestAnimationFrame(()=>requestAnimationFrame(a))},renderScorecardTable(e=!1){const t=document.getElementById("spk-scorecard-table-container");if(!t)return;const a=this.getScorecardSignature();if(!e&&a===this._lastScorecardSignature&&t.dataset.signature===a){this.applyScorecardAccessState();return}const r=this.buildScorecardData(this.scorecardYear);t.innerHTML=this.renderScorecardTableHtml(r),this.applyModuleI18n(t),t.dataset.signature=a,this._lastScorecardSignature=a,this.applyScorecardAccessState(),this.applyScorecardRtlScroll(t)},renderScorecardTableHtml(e){const t=(u,g)=>this._t(u,g),a=e.months,r=e.ytdLimit,s=e.year,i=e.rows,o=i.rateMultipliers||{TRIR:2e5,AFR:1e6,FAR:1e8,FR:1e6,SR:1e6},c=!((AppState.appData.trainingCertificates||[]).some(u=>this.matchesNeboshRecord(u))||(AppState.appData.training||[]).some(u=>this.matchesNeboshRecord(u))),l=(u,g,h=0,m={})=>a.map(p=>{const f=[`spk-cell-${g}`],b=u[p.index];if(m.manual==="hoursWorked")return f.push("spk-cell-manual"),`<td class="${f.join(" ")}"><input type="number" class="spk-manual-input" step="0.01" value="${b||""}" data-scorecard-manual="hoursWorked" data-year="${s}" data-month="${p.index}"></td>`;if(m.manual==="neboshStatus"){f.push("spk-cell-manual");const x=String(b||""),k=[{value:"",label:"-"},{value:"Certified",label:t("module.kpi.scorecard.nebosh.certified","Certified")},{value:"In Progress",label:t("module.kpi.scorecard.nebosh.inProgress","In Progress")},{value:"Expired",label:t("module.kpi.scorecard.nebosh.expired","Expired")},{value:"Not Available",label:t("module.kpi.scorecard.nebosh.notAvailable","Not Available")}];return`<td class="${f.join(" ")}"><select class="spk-manual-select" data-scorecard-manual="neboshStatus" data-year="${s}" data-month="${p.index}">${k.map(S=>`<option value="${S.value}" ${S.value===x?"selected":""}>${S.label}</option>`).join("")}</select></td>`}return`<td class="${f.join(" ")} spk-cell-numeric" dir="ltr">${this.formatScorecardValue(b,h,p.index,s)}</td>`}).join(""),d=(u,g,h,m,p=h,f=0,b={})=>`
            <tr class="${b.total?"spk-row-total":""}">
                <td class="spk-label-cell">${u}</td>
                ${l(g,h,f,b)}
                <td class="spk-cell-${p} spk-cell-numeric" dir="ltr">${typeof m=="string"?this.formatScorecardValue(m,f):this.formatScorecardValue(m,f)}</td>
            </tr>
        `;return`
            <table class="spk-scorecard-table">
                <thead>
                    <tr>
                        <th>${t("module.kpi.scorecard.table.title","HEALTH & SAFETY PERFORMANCE SCORECARD")} ${s}</th>
                        ${a.map(u=>`<th class="spk-month-head">${u.label}</th>`).join("")}
                        <th class="spk-ytd-head">${t("module.kpi.scorecard.table.cumulativeYtd","Cumulative YTD")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${d(t("module.kpi.scorecard.row.operationalEmployees","Number of Permanent Employees"),i.directEmployeeCounts,"blue",this.getYtdValue(i.directEmployeeCounts,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.contractorEmployees","Number of Temporary Workers"),i.contractorEmployeeCounts,"blue",this.getYtdValue(i.contractorEmployeeCounts,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.contractorHoursDisplay","Total Temporary Workers Hours"),i.contractorHoursDisplay,"blue",this.getYtdValue(i.contractorHoursDisplay,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.totalHoursWorked","Total Employee Hours Worked"),i.permanentHoursDisplay,"blue",this.getYtdValue(i.permanentHoursDisplay,"sum",r),"yellow",0,{manual:"hoursWorked"})}
                    ${d(t("module.kpi.scorecard.row.combinedHoursDisplay","Combined Total Hours (Employees + Temps)"),i.combinedHoursDisplay,"blue",this.getYtdValue(i.combinedHoursDisplay,"sum",r),"yellow",0)}
                    <tr class="spk-row-section"><td colspan="14">${t("module.kpi.scorecard.section.accidentRates","1 Accident, Incident, & Illness Rates")}</td></tr>
                    <tr class="spk-row-subsection"><td colspan="13">${t("module.kpi.scorecard.section.safetyReported","1.1 Safety (number reported)")}</td><td class="spk-subsection-ytd">${t("module.kpi.scorecard.table.cumulativeYtd","Cumulative YTD")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.lti","LTI - Lost Time Incidents"),i.lti,"blue",this.getYtdValue(i.lti,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.nlti","NLTI - Non Lost Time Incidents"),i.nlti,"blue",this.getYtdValue(i.nlti,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.firstAid","First Aid Cases"),i.firstAid,"blue",this.getYtdValue(i.firstAid,"sum",r),"yellow",0)}
                    <tr class="spk-row-subsection"><td colspan="14">${t("module.kpi.scorecard.section.inMonthValues","IN MONTH VALUES")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.ltir","LTIR - Lost Time Incident Rate"),i.ltir,"yellow",this.getYtdValue(i.lti,"rate",r,i.hoursWorked,o.FR),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.trir","TRIR - Total Recordable Incident Rate"),i.trir,"yellow",this.getYtdValue(i.recordable,"rate",r,i.hoursWorked,o.TRIR),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.afr","AFR - Accident Frequency Rate"),i.afr,"yellow",this.getYtdValue(i.injuries,"rate",r,i.hoursWorked,o.AFR),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.far","FAR - Fatality Accident Rate"),i.far,"yellow",this.getYtdValue(i.fatalities,"rate",r,i.hoursWorked,o.FAR),"yellow",4)}
                    ${d(t("module.kpi.scorecard.row.sr","SR - Severity Rate"),i.sr,"yellow",this.getYtdValue(i.daysLost,"rate",r,i.hoursWorked,o.SR),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.ir","IR - Incident Rate"),i.ir,"yellow",this.getYtdValue(i.totalIncidents,"rate",r,i.hoursWorked,o.IR),"yellow",2)}
                    <tr class="spk-row-subsection"><td colspan="13">${t("module.kpi.scorecard.section.rolling12","ROLLING 12 MONTH VALUES")}</td><td class="spk-subsection-ytd">${t("module.kpi.scorecard.table.ytd12avg","YTD 12 Mth Ave")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.ltir","LTIR - Lost Time Incident Rate"),i.rollingLtir,"yellow",this.getYtdValue(i.rollingLtir,"avg",r),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.trir","TRIR - Total Recordable Incident Rate"),i.rollingTrir,"yellow",this.getYtdValue(i.rollingTrir,"avg",r),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.nearMissHazards","Near Miss/Hazards Reported"),i.hazards,"blue",this.getYtdValue(i.hazards,"sum",r),"yellow",0)}
                    <tr class="spk-row-subsection"><td colspan="13">${t("module.kpi.scorecard.section.occupationalHealth","1.2 Occupational Health (number reported)")}</td><td class="spk-subsection-ytd">${t("module.kpi.scorecard.table.cumulativeYtd","Cumulative YTD")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.ltoi","LTOI - Lost Time Occupational Illness"),i.occLti,"blue",this.getYtdValue(i.occLti,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.nltoi","NLTOI - Non Lost Time Occupational Illness"),i.occNlti,"blue",this.getYtdValue(i.occNlti,"sum",r),"yellow",0)}
                    <tr class="spk-row-subsection"><td colspan="14">${t("module.kpi.scorecard.section.inMonthValues","IN MONTH VALUES")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.ltoir","LTOIR - Lost Time Occ. Illness Rate"),i.occLtir,"yellow",this.getYtdValue(i.occLti,"rate",r,i.hoursWorked,o.FR),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.troir","TROIR - Total Recordable Occ Illness Rate"),i.occTrir,"yellow",this.getYtdValue(i.occRecordable,"rate",r,i.hoursWorked,o.TRIR),"yellow",2)}
                    <tr class="spk-row-subsection"><td colspan="13">${t("module.kpi.scorecard.section.rolling12","ROLLING 12 MONTH VALUES")}</td><td class="spk-subsection-ytd">${t("module.kpi.scorecard.table.ytd12avg","YTD 12 Mth Ave")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.ltoir","LTOIR - Lost Time Occ. Illness Rate"),i.rollingOccLtir,"yellow",this.getYtdValue(i.rollingOccLtir,"avg",r),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.troir","TROIR - Total Recordable Occ Illness Rate"),i.rollingOccTrir,"yellow",this.getYtdValue(i.rollingOccTrir,"avg",r),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.occNearMissHazards","Occ Health Near Miss/Hazards Reported"),i.occHazards,"blue",this.getYtdValue(i.occHazards,"sum",r),"yellow",0)}
                    <tr class="spk-row-section"><td colspan="14">${t("module.kpi.scorecard.section.permits","2 Permits to Work")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.permits.heights","Heights"),i.permitsHeight,"blue",this.getYtdValue(i.permitsHeight,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.permits.electrical","Electrical Work / LOTO"),i.permitsElectrical,"blue",this.getYtdValue(i.permitsElectrical,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.permits.hot","Hot Work"),i.permitsHot,"blue",this.getYtdValue(i.permitsHot,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.permits.others","All Others"),i.permitsOther,"blue",this.getYtdValue(i.permitsOther,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.permits.total","TOTAL PER MONTH"),i.permitTotal,"yellow",this.getYtdValue(i.permitTotal,"sum",r),"yellow",0,{total:!0})}
                    <tr class="spk-row-section"><td colspan="14">${t("module.kpi.scorecard.section.training","3 Health & Safety Training")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.training.sessions","Total Number sessions run"),i.trainingSessions,"blue",this.getYtdValue(i.trainingSessions,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.training.attendees","Total Number of attendees"),i.trainingAttendees,"blue",this.getYtdValue(i.trainingAttendees,"sum",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.training.hours","Total Number H&S Training Hours"),i.trainingHours,"blue",this.getYtdValue(i.trainingHours,"sum",r),"yellow",2)}
                    <tr class="spk-row-subsection"><td colspan="13">${t("module.kpi.scorecard.section.trainingMetrics","Training Metrics")}</td><td class="spk-subsection-ytd">${t("module.kpi.scorecard.table.averageYtd","Average YTD")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.training.hoursPerFte","Training Hours per Operational FTE"),i.trainingHoursPerFte,"yellow",this.getYtdValue(i.trainingHoursPerFte,"avg",r),"yellow",2)}
                    ${d(t("module.kpi.scorecard.row.training.minutesPerFte","equates to Minutes of training per FTE"),i.trainingMinutesPerFte,"yellow",this.getYtdValue(i.trainingMinutesPerFte,"avg",r),"yellow",0)}
                    ${d(t("module.kpi.scorecard.row.training.hoursPerFteYtd","equates to Hours of training per FTE YTD"),i.trainingHoursPerFteYtd,"yellow",this.getYtdValue(i.trainingHoursPerFteYtd,"last",r),"yellow",2)}
                    <tr class="spk-row-section"><td colspan="14">${t("module.kpi.scorecard.section.nebosh","4 NEBOSH Training")}</td></tr>
                    ${d(t("module.kpi.scorecard.row.neboshStatus","Certification status of UAE HSE Lead"),i.neboshStatus,c?"blue":"neutral",i.neboshStatus[Math.min(r,11)]||"-",c?"blue":"neutral",0,c?{manual:"neboshStatus"}:{})}
                </tbody>
            </table>
        `},setupEventListeners(){const e=document.getElementById("kpi-filter-period");e&&e.addEventListener("change",t=>{const a=document.getElementById("kpi-custom-dates"),r=document.getElementById("kpi-custom-dates-end");t.target.value==="custom"?(a?.classList.remove("hidden"),r?.classList.remove("hidden")):(a?.classList.add("hidden"),r?.classList.add("hidden"))}),document.getElementById("kpi-apply-filters")?.addEventListener("click",()=>{this.applyFilters()}),document.getElementById("kpi-reset-filters")?.addEventListener("click",()=>{this.resetFilters()}),document.getElementById("kpis-export-excel-btn")?.addEventListener("click",()=>{this.exportToExcel()}),document.getElementById("kpis-export-pdf-btn")?.addEventListener("click",()=>{this.exportToPDF()}),document.getElementById("kpis-settings-btn")?.addEventListener("click",()=>{this.showSettingsModal()}),this.activeTab==="annual-plan"?this.loadKPIAnnualPlans():this.activeTab==="monitoring-plan"&&this.loadHSEMonitoringPlans()},applyFilters(){const e=document.getElementById("kpi-filter-period")?.value||"monthly",t=document.getElementById("kpi-filter-department")?.value||"",a=document.getElementById("kpi-filter-location")?.value||"",r=document.getElementById("kpi-filter-start-date")?.value||"",s=document.getElementById("kpi-filter-end-date")?.value||"";this.filters={period:e,department:t,location:a,startDate:r,endDate:s},this.updateAllKPIs()},resetFilters(){this.filters={period:"monthly",department:"",location:"",startDate:"",endDate:""},document.getElementById("kpi-filter-period").value="monthly",document.getElementById("kpi-filter-department").value="",document.getElementById("kpi-filter-location").value="",document.getElementById("kpi-filter-start-date").value="",document.getElementById("kpi-filter-end-date").value="",document.getElementById("kpi-custom-dates")?.classList.add("hidden"),document.getElementById("kpi-custom-dates-end")?.classList.add("hidden"),this.updateAllKPIs()},getDateRange(){const e=new Date;let t,a;if(this.filters.period==="custom"&&this.filters.startDate&&this.filters.endDate)t=new Date(this.filters.startDate),a=new Date(this.filters.endDate),a.setHours(23,59,59,999);else if(this.filters.period==="yearly")t=new Date(e.getFullYear(),0,1),a=new Date(e.getFullYear(),11,31,23,59,59);else if(this.filters.period==="quarterly"){const r=Math.floor(e.getMonth()/3);t=new Date(e.getFullYear(),r*3,1),a=new Date(e.getFullYear(),(r+1)*3,0,23,59,59)}else t=new Date(e.getFullYear(),e.getMonth(),1),a=new Date(e.getFullYear(),e.getMonth()+1,0,23,59,59);return{start:t,end:a}},updateAllKPIs(){const{start:e,end:t}=this.getDateRange(),a=this.getFilteredData(e,t),r=this.calculateInspectionTours(a);this.updateKPI("inspection-tours",r.completed,"\u062C\u0648\u0644\u0629","inspection-tours",r.planned);const s=this.calculateObservationsRecorded(a);this.updateKPI("observations-recorded",s.total,"\u0645\u0644\u0627\u062D\u0638\u0629","observations",null,s.processed);const i=this.calculateCorrectiveActionsClosure(a);this.updateKPI("corrective-actions-closure",i.percentage,"%","actions-closure",100);const o=this.calculateTrainingCourses(a);this.updateKPI("training-courses",o.completed,"\u062F\u0648\u0631\u0629","training-courses",o.total);const n=this.calculateTrainingAttendance(a);this.updateKPI("training-attendance",n.percentage,"%","training-attendance",100);const c=this.calculatePTWApproved(a);this.updateKPI("ptw-approved",c.approved,"\u062A\u0635\u0631\u064A\u062D","ptw-approved",c.total);const l=this.calculatePPECompliance(a);this.updateKPI("ppe-compliance",l.percentage,"%","ppe-compliance",100);const d=this.calculatePeriodicInspectionsOnTime(a);this.updateKPI("periodic-inspections-on-time",d.onTime,"\u0641\u062D\u0635","inspections-on-time",d.total);const u=this.calculateSafetyMeetings(a);this.updateKPI("safety-meetings",u,"\u0627\u062C\u062A\u0645\u0627\u0639","safety-meetings");const g=this.calculateTotalInjuries(a);this.updateKPI("total-injuries",g,"\u0625\u0635\u0627\u0628\u0629","injuries");const h=this.calculateLTICount(a);this.updateKPI("lti-count",h,"\u0625\u0635\u0627\u0628\u0629","lti");const m=this.calculateLTIFR(a);this.updateKPI("ltifr",m,"","ltifr");const p=this.calculateSeverityRate(a);this.updateKPI("severity-rate",p,"","severity");const f=this.calculateIR(a);this.updateKPI("incident-rate",f,"","incident-rate");const b=this.calculateNearMissCount(a);this.updateKPI("near-miss-count",b,"\u062D\u0627\u062F\u062B","nearmiss-count");const x=this.calculateFireIncidents(a);this.updateKPI("fire-incidents",x,"\u062D\u0627\u062F\u062B","fire-incidents");const k=this.calculateLostDays(a);this.updateKPI("lost-days",k,"\u064A\u0648\u0645","lost-days");const S=this.calculateAccidentCost(a);this.updateKPI("accident-cost",parseFloat(S).toLocaleString("ar-SA"),"\u0631\u064A\u0627\u0644","accident-cost"),this.updateCharts(a,e,t),this.queueScorecardRefresh()},getFilteredData(e,t){const a=AppState.appData,r=this.filters.department,s=this.filters.location,i=(o,n,c="department",l="location")=>{const d=new Date(o[n]||o.incidentDate||o.date||o.createdAt),u=d>=e&&d<=t,g=!r||(o[c]||o.affectedDepartment||"").includes(r),h=!s||(o[l]||o.location||"").includes(s);return u&&g&&h};return{incidents:(a.incidents||[]).filter(o=>i(o,"date","affectedDepartment","location")),nearmiss:(a.nearmiss||[]).filter(o=>i(o,"date","department","location")),dailyObservations:(a.dailyObservations||[]).filter(o=>i(o,"date","department")),training:(a.training||[]).filter(o=>{const n=new Date(o.date||o.startDate||o.createdAt);return n>=e&&n<=t}),ptw:(a.ptw||[]).filter(o=>{const n=new Date(o.startDate||o.createdAt);return n>=e&&n<=t}),periodicInspectionRecords:(a.periodicInspectionRecords||[]).filter(o=>{const n=new Date(o.inspectionDate||o.createdAt);return n>=e&&n<=t}),periodicInspectionSchedules:(a.periodicInspectionSchedules||[]).filter(o=>{const n=new Date(o.scheduledDate||o.createdAt);return n>=e&&n<=t}),fireEquipmentInspections:(a.fireEquipmentInspections||[]).filter(o=>{const n=new Date(o.inspectionDate||o.createdAt);return n>=e&&n<=t}),actionTrackingRegister:(a.actionTrackingRegister||[]).filter(o=>{const n=new Date(o.dueDate||o.createdAt);return n>=e&&n<=t}),hseCorrectiveActions:(a.hseCorrectiveActions||[]).filter(o=>{const n=new Date(o.date||o.createdAt);return n>=e&&n<=t}),clinicRecords:(a.clinicRecords||[]).filter(o=>{const n=new Date(o.date||o.visitDate||o.createdAt);return n>=e&&n<=t}),medicalInjuries:(a.medicalInjuries||[]).filter(o=>{const n=new Date(o.date||o.injuryDate||o.createdAt);return n>=e&&n<=t}),ppeRecords:(a.ppe||[]).filter(o=>{const n=new Date(o.date||o.issueDate||o.createdAt);return n>=e&&n<=t}),safetyMeetings:(a.safetyMeetings||[]).filter(o=>{const n=new Date(o.date||o.meetingDate||o.createdAt);return n>=e&&n<=t}),inspectionTours:(a.inspectionTours||[]).filter(o=>{const n=new Date(o.date||o.tourDate||o.createdAt);return n>=e&&n<=t}),safetyBudgetTransactions:(a.safetyBudgetTransactions||[]).filter(o=>{const n=new Date(o.date||o.createdAt);return n>=e&&n<=t})}},calculateIncidents(e){return e.incidents.length},calculateNearMiss(e){return e.nearmiss.length+e.dailyObservations.length},_getFilteredHseRates(e){if(typeof HseMetrics>"u"||!HseMetrics.aggregatePeriod)return null;const{start:t,end:a}=this.getDateRange(),r={...AppState.appData||{},incidents:e.incidents||[]},s=HseMetrics.aggregatePeriod(t,a,r);return HseMetrics.computeRates(s)},calculateTRIR(e){const t=this._getFilteredHseRates(e);if(t)return HseMetrics.formatRate(t.trir,2);const a=this.calculateCombinedWorkforceHours(),r=(e.incidents||[]).filter(i=>this.isRecordableIncident(i)).length;return(a>0?r*2e5/a:0).toFixed(2)},calculateAFR(e){const t=this._getFilteredHseRates(e);return t?HseMetrics.formatRate(t.afr,2):"0.00"},calculateFAR(e){const t=this._getFilteredHseRates(e);return t?HseMetrics.formatRate(t.far,4):"0.0000"},calculateSeverityRate(e){const t=this._getFilteredHseRates(e);if(t)return HseMetrics.formatRate(t.sr,2);const r=[...e.incidents||[],...e.medicalInjuries||[]].reduce((i,o)=>i+(parseInt(o.lostDays||o.daysLost||o.timeOffWork||0,10)||0),0),s=this.calculateCombinedWorkforceHours();return s<=0?"0.00":(r*1e6/s).toFixed(2)},calculateIR(e){const t=this._getFilteredHseRates(e);if(t)return HseMetrics.formatRate(t.ir,2);const a=(e.incidents||[]).length,r=this.calculateCombinedWorkforceHours();return r<=0?"0.00":(a*1e6/r).toFixed(2)},calculateTrainingCompletion(e){const t=e.training.filter(r=>(r.status||"").includes("\u0645\u0643\u062A\u0645\u0644")||(r.status||"").includes("completed")).length,a=e.training.length;return a>0?(t/a*100).toFixed(1):"0.0"},calculateCorrectiveActions(e){const t=e.actionTrackingRegister.filter(r=>(r.status||"").includes("\u0645\u063A\u0644\u0642")||(r.status||"").includes("\u0645\u0643\u062A\u0645\u0644")||(r.status||"").includes("closed")||(r.status||"").includes("completed")).length,a=e.actionTrackingRegister.length;return a>0?(t/a*100).toFixed(1):"0.0"},calculatePTWCompliance(e){const t=e.ptw.filter(r=>(r.status||"").includes("\u0645\u0648\u0627\u0641\u0642")||(r.status||"").includes("approved")).length,a=e.ptw.length;return a>0?(t/a*100).toFixed(1):"0.0"},calculatePeriodicInspections(e){const t=e.periodicInspectionRecords.filter(r=>(r.status||"").includes("\u0645\u0643\u062A\u0645\u0644")||(r.status||"").includes("completed")).length,a=e.periodicInspectionRecords.length;return a>0?(t/a*100).toFixed(1):"0.0"},calculateFireEquipment(e){const t=e.fireEquipmentInspections.filter(r=>(r.status||"").includes("\u0645\u0643\u062A\u0645\u0644")||(r.status||"").includes("completed")).length,a=e.fireEquipmentInspections.length;return a>0?(t/a*100).toFixed(1):"0.0"},calculateSafetyBudget(e){const t=e.safetyBudgetTransactions.reduce((s,i)=>s+(parseFloat(i.amount)||0),0),r=(AppState.appData.safetyBudgets||[]).reduce((s,i)=>s+(parseFloat(i.amount)||0),0);return r>0?(t/r*100).toFixed(1):"0.0"},calculateImprovementRate(e){const{start:t,end:a}=this.getDateRange(),r=Math.ceil((a-t)/(1e3*60*60*24)),s=new Date(t);s.setDate(s.getDate()-r);const i=new Date(t);i.setDate(i.getDate()-1);const o=this.getFilteredData(s,i),n=e.incidents.length,c=o.incidents.length;return c===0?n===0?"0.0":"-100.0":((c-n)/c*100).toFixed(1)},calculateComplianceRate(e){const t=e.incidents.length+e.nearmiss.length,a=e.incidents.filter(r=>(r.status||"").includes("\u0645\u063A\u0644\u0642")||(r.status||"").includes("closed")).length+e.nearmiss.filter(r=>(r.status||"").includes("\u0645\u063A\u0644\u0642")||(r.status||"").includes("closed")).length;return t>0?(a/t*100).toFixed(1):"100.0"},calculateInspectionTours(e){const t=(e.inspectionTours||[]).filter(r=>(r.status||"").includes("\u0645\u0643\u062A\u0645\u0644")||(r.status||"").includes("completed")).length,a=(e.inspectionTours||[]).length;return{completed:t,planned:a,percentage:a>0?(t/a*100).toFixed(1):"0.0"}},calculateObservationsRecorded(e){const t=(e.dailyObservations||[]).length,a=(e.dailyObservations||[]).filter(r=>(r.status||"").includes("\u0645\u0639\u0627\u0644\u062C")||(r.status||"").includes("\u0645\u063A\u0644\u0642")||(r.status||"").includes("processed")||(r.status||"").includes("closed")).length;return{total:t,processed:a,percentage:t>0?(a/t*100).toFixed(1):"0.0"}},calculateCorrectiveActionsClosure(e){const t=[...e.actionTrackingRegister||[],...e.hseCorrectiveActions||[]],a=t.filter(s=>{if(!((s.status||"").includes("\u0645\u063A\u0644\u0642")||(s.status||"").includes("\u0645\u0643\u062A\u0645\u0644")||(s.status||"").includes("closed")||(s.status||"").includes("completed")))return!1;const o=new Date(s.dueDate||s.targetDate||s.createdAt);return new Date(s.closedDate||s.completedDate||s.updatedAt||new Date)<=o}).length,r=t.length;return{closed:a,total:r,percentage:r>0?(a/r*100).toFixed(1):"0.0"}},calculateTrainingCourses(e){const t=(e.training||[]).filter(r=>(r.status||"").includes("\u0645\u0643\u062A\u0645\u0644")||(r.status||"").includes("completed")).length,a=(e.training||[]).length;return{completed:t,total:a,percentage:a>0?(t/a*100).toFixed(1):"0.0"}},calculateTrainingAttendance(e){const t=e.training||[];let a=0,r=0;return t.forEach(s=>{const i=parseInt(s.expectedAttendees||s.attendeesCount||0),o=parseInt(s.actualAttendees||(s.attendees?s.attendees.length:0));r+=i,a+=o}),{attendees:a,expected:r,percentage:r>0?(a/r*100).toFixed(1):"0.0"}},calculatePTWApproved(e){const t=(e.ptw||[]).filter(r=>(r.status||"").includes("\u0645\u0648\u0627\u0641\u0642")||(r.status||"").includes("approved")||(r.status||"").includes("\u0645\u0643\u062A\u0645\u0644")||(r.status||"").includes("completed")).length,a=(e.ptw||[]).length;return{approved:t,total:a,percentage:a>0?(t/a*100).toFixed(1):"0.0"}},calculatePPECompliance(e){const t=e.ppeRecords||[],a=t.filter(s=>(s.complianceStatus||"").includes("\u0645\u062A\u0648\u0627\u0641\u0642")||(s.complianceStatus||"").includes("compliant")||(s.status||"").includes("\u0645\u0633\u062A\u062E\u062F\u0645")||(s.status||"").includes("used")).length,r=t.length;return{compliant:a,total:r,percentage:r>0?(a/r*100).toFixed(1):"0.0"}},calculatePeriodicInspectionsOnTime(e){const t=e.periodicInspectionRecords||[],a=e.periodicInspectionSchedules||[],r=t.filter(i=>{const o=new Date(i.inspectionDate||i.date),n=a.find(l=>l.id===i.scheduleId||l.categoryId===i.categoryId);if(!n)return!1;const c=new Date(n.scheduledDate||n.dueDate);return o<=c}).length,s=t.length;return{onTime:r,total:s,percentage:s>0?(r/s*100).toFixed(1):"0.0"}},calculateSafetyMeetings(e){return(e.safetyMeetings||[]).length},calculateTotalInjuries(e){return[...(e.incidents||[]).filter(a=>(a.type||"").includes("\u0625\u0635\u0627\u0628\u0629")||(a.type||"").includes("injury")),...e.medicalInjuries||[],...(e.clinicRecords||[]).filter(a=>(a.type||"").includes("\u0625\u0635\u0627\u0628\u0629")||(a.type||"").includes("injury"))].length},calculateLTICount(e){return[...e.incidents||[],...e.medicalInjuries||[]].filter(a=>{const r=parseInt(a.lostDays||a.daysLost||a.timeOffWork||0);return(a.severity||"").includes("LTI")||(a.type||"").includes("LTI")||r>0||(a.result||"").includes("\u062A\u0648\u0642\u0641")||(a.result||"").includes("lost time")}).length},calculateLTIFR(e){const t=this._getFilteredHseRates(e);if(t)return HseMetrics.formatRate(t.fr,2);const a=this.calculateCombinedWorkforceHours(),r=this.calculateLTICount(e);return(a>0?r*1e6/a:0).toFixed(2)},calculateNearMissCount(e){return(e.nearmiss||[]).length},calculateFireIncidents(e){return[...(e.incidents||[]).filter(a=>(a.type||"").includes("\u062D\u0631\u064A\u0642")||(a.type||"").includes("fire")||(a.description||"").includes("\u062D\u0631\u064A\u0642")||(a.description||"").includes("fire")),...(e.fireEquipmentInspections||[]).filter(a=>(a.status||"").includes("\u0639\u0637\u0644")||(a.status||"").includes("fault")||(a.findings||"").includes("\u0639\u0637\u0644")||(a.findings||"").includes("fault"))].length},calculateLostDays(e){return[...e.incidents||[],...e.medicalInjuries||[]].reduce((r,s)=>r+parseInt(s.lostDays||s.daysLost||s.timeOffWork||0),0)},calculateAccidentCost(e){return(e.incidents||[]).reduce((r,s)=>{const i=parseFloat(s.directCost||s.cost||0),o=parseFloat(s.indirectCost||0);return r+i+o},0).toFixed(2)},updateKPI(e,t,a,r,s=null,i=null){const o=document.getElementById(`${e}-value`),n=document.getElementById(`${e}-unit`),c=document.getElementById(`${e}-target`),l=document.getElementById(`${e}-progress`),d=document.getElementById(`${e}-progress-bar`),u=document.getElementById(`${e}-trend`),g=document.getElementById(`${e}-status`);if(o){const x=parseFloat(t)||0;o.textContent=x.toLocaleString("ar-SA")}n&&a&&(n.textContent=a);const h=s!==null?s:this.getKPITarget(r)||0;c&&(h>0?c.textContent=h.toLocaleString("ar-SA")+(a||""):c.textContent=i?`${i} / ${t}`:"-");const m=parseFloat(t)||0;let p=0,f="gray";if(a==="%"&&h===100?(p=m,f=m>=90?"green":m>=70?"yellow":"red"):h>0?(p=Math.min(m/h*100,100),f=p>=100?"green":p>=75?"yellow":"red"):(r.includes("injuries")||r.includes("lti")||r.includes("fire")||r.includes("cost")||r.includes("lost-days"))&&(f=m===0?"green":m<=2?"yellow":"red"),l&&(l.textContent=p.toFixed(1)+"%"),d){d.style.width=p+"%";const x=f==="green"?"bg-green-500":f==="yellow"?"bg-yellow-500":"bg-red-500";d.className=`h-2.5 rounded-full transition-all duration-500 shadow-sm ${x}`}g&&(g.style.display="block",g.className=`status-badge ${f==="green"?"status-success":f==="yellow"?"status-warning":"status-danger"}`);const b=this.calculateTrend(r,m);if(u)if(b>0){const x=r.includes("injuries")||r.includes("lti")||r.includes("fire")||r.includes("cost")||r.includes("lost-days")?"\u062A\u0631\u0627\u062C\u0639":"\u062A\u062D\u0633\u0646",k=r.includes("injuries")||r.includes("lti")||r.includes("fire")||r.includes("cost")||r.includes("lost-days")?"text-red-500":"text-green-500";u.innerHTML=`<i class="fas fa-arrow-${r.includes("injuries")||r.includes("lti")||r.includes("fire")||r.includes("cost")||r.includes("lost-days")?"down":"up"} ${k}"></i><span class="${k}">${x} ${Math.abs(b).toFixed(1)}%</span>`}else if(b<0){const x=r.includes("injuries")||r.includes("lti")||r.includes("fire")||r.includes("cost")||r.includes("lost-days")?"\u062A\u062D\u0633\u0646":"\u062A\u0631\u0627\u062C\u0639",k=r.includes("injuries")||r.includes("lti")||r.includes("fire")||r.includes("cost")||r.includes("lost-days")?"text-green-500":"text-red-500";u.innerHTML=`<i class="fas fa-arrow-${r.includes("injuries")||r.includes("lti")||r.includes("fire")||r.includes("cost")||r.includes("lost-days")?"up":"down"} ${k}"></i><span class="${k}">${x} ${Math.abs(b).toFixed(1)}%</span>`}else u.innerHTML=`<i class="fas fa-minus text-gray-400"></i><span class="text-gray-500">${this._t("module.kpi.card.noChange","\u0644\u0627 \u064A\u0648\u062C\u062F \u062A\u063A\u064A\u064A\u0631")}</span>`},calculateTrend(e,t){return 0},updateCharts(e,t,a){this.renderIncidentsChart(e,t,a),this.renderDepartmentChart(e),this.renderTRIRChart(e,t,a),this.renderTrainingChart(e,t,a),this.renderDepartmentComparison(e),this.renderHeatmap(e)},renderChartNoDataState(e,t){e&&(e.innerHTML=`
            <div class="h-full min-h-[180px] flex items-center justify-center">
                <div class="text-center text-slate-500">
                    <i class="fas fa-chart-line text-2xl mb-2 text-slate-300"></i>
                    <div class="text-sm font-semibold">${t||this._t("module.kpi.chart.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0636\u0645\u0646 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629")}</div>
                </div>
            </div>
        `)},renderIncidentsChart(e,t,a,r="incidents-chart-container"){const s=document.getElementById(r);if(!s)return;const i={};e.incidents.forEach(l=>{const u=new Date(l.date||l.incidentDate||l.createdAt).toLocaleDateString("ar-SA",{month:"short",day:"numeric"});i[u]=(i[u]||0)+1});const o=Object.keys(i).sort(),n=o.map(l=>i[l]);if(!o.length){this.renderChartNoDataState(s,this._t("module.kpi.chart.noIncidents","\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0648\u0627\u062F\u062B \u0636\u0645\u0646 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629"));return}const c=`${r}-canvas`;s.innerHTML=`
            <div class="text-center p-8">
                <canvas id="${c}" style="max-height: 250px;"></canvas>
            </div>
        `,setTimeout(()=>{const l=document.getElementById(c);if(l&&l.getContext){const d=l.getContext("2d"),u=Math.max(...n,1),g=l.width/o.length;d.clearRect(0,0,l.width,l.height),n.forEach((h,m)=>{const p=h/u*l.height*.8;d.fillStyle="#ef4444",d.fillRect(m*g,l.height-p,g-2,p)})}else s.innerHTML=`
                    <div class="space-y-2">
                        ${o.map((d,u)=>`
                            <div class="flex items-center gap-2">
                                <span class="text-xs text-gray-600 w-20">${d}</span>
                                <div class="flex-1 bg-gray-200 rounded h-4 relative">
                                    <div class="bg-red-500 h-4 rounded" style="width: ${n[u]/Math.max(...n,1)*100}%"></div>
                                </div>
                                <span class="text-xs font-semibold w-8">${n[u]}</span>
                            </div>
                        `).join("")}
                    </div>
                `},100)},renderDepartmentChart(e,t="department-chart-container"){const a=document.getElementById(t);if(!a)return;const r={};e.incidents.forEach(i=>{const o=i.affectedDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[o]=(r[o]||0)+1});const s=Object.values(r).reduce((i,o)=>i+o,0);if(!s){this.renderChartNoDataState(a,this._t("module.kpi.chart.noDeptData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0648\u0632\u064A\u0639 \u0625\u062F\u0627\u0631\u0627\u062A \u0644\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629"));return}a.innerHTML=`
            <div class="space-y-3">
                ${Object.entries(r).map(([i,o])=>{const n=s>0?(o/s*100).toFixed(1):0;return`
                        <div class="flex items-center gap-3">
                            <div class="flex-1">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-sm font-semibold">${Utils.escapeHTML(i)}</span>
                                    <span class="text-xs text-gray-600">${n}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${n}%"></div>
                                </div>
                            </div>
                            <span class="text-sm font-bold w-12 text-end" dir="ltr">${o}</span>
                        </div>
                    `}).join("")}
            </div>
        `},renderTRIRChart(e,t,a,r="trir-chart-container"){const s=document.getElementById(r);if(!s)return;const i=[],o=[];let n=new Date(t);for(;n<=a;){const l=new Date(n.getFullYear(),n.getMonth(),1),d=new Date(n.getFullYear(),n.getMonth()+1,0),u=this.getFilteredData(l,d),g=parseFloat(this.calculateLTIFR(u));i.push(g),o.push(n.toLocaleDateString("ar-SA",{month:"short"})),n.setMonth(n.getMonth()+1)}const c=Math.max(...i,1);s.innerHTML=`
            <div class="space-y-2">
                ${o.map((l,d)=>`
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-600 w-20">${l}</span>
                        <div class="flex-1 bg-gray-200 rounded h-4 relative">
                            <div class="bg-purple-500 h-4 rounded transition-all" style="width: ${Math.min(i[d]/c*100,100)}%"></div>
                        </div>
                        <span class="text-xs font-semibold w-12">${i[d]}</span>
                    </div>
                `).join("")}
            </div>
        `},renderTrainingChart(e,t,a,r="training-chart-container"){const s=document.getElementById(r);if(!s)return;const i=e.training.filter(c=>(c.status||"").includes("\u0645\u0643\u062A\u0645\u0644")||(c.status||"").includes("completed")).length,o=e.training.length,n=o>0?i/o*100:0;s.innerHTML=`
            <div class="text-center">
                <div class="relative inline-block">
                    <svg class="transform -rotate-90 w-48 h-48">
                        <circle cx="96" cy="96" r="80" stroke="#e5e7eb" stroke-width="16" fill="none"></circle>
                        <circle cx="96" cy="96" r="80" stroke="#3b82f6" stroke-width="16" fill="none"
                            stroke-dasharray="${2*Math.PI*80}"
                            stroke-dashoffset="${2*Math.PI*80*(1-n/100)}"
                            stroke-linecap="round"></circle>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-blue-600">${n.toFixed(1)}%</div>
                            <div class="text-sm text-gray-600">${i} / ${o}</div>
                        </div>
                    </div>
                </div>
            </div>
        `},renderDepartmentComparison(e,t="department-comparison-container"){const a=document.getElementById(t);if(!a)return;const r={},s=new Set;e.incidents.forEach(o=>{const n=o.affectedDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";s.add(n),r[n]||(r[n]={incidents:0,nearmiss:0,training:0}),r[n].incidents++}),e.nearmiss.forEach(o=>{const n=o.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";s.add(n),r[n]||(r[n]={incidents:0,nearmiss:0,training:0}),r[n].nearmiss++});const i=Math.max(...Object.values(r).map(o=>o.incidents+o.nearmiss),1);if(!s.size){this.renderChartNoDataState(a,this._t("module.kpi.chart.noComparisonData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0642\u0627\u0631\u0646\u0629 \u0644\u0644\u0625\u062F\u0627\u0631\u0627\u062A/\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629"));return}a.innerHTML=`
            <div class="space-y-4">
                ${Array.from(s).map(o=>{const n=r[o]||{incidents:0,nearmiss:0,training:0},c=n.incidents+n.nearmiss,l=c/i*100;return`
                        <div>
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-sm font-semibold">${Utils.escapeHTML(o)}</span>
                                <span class="text-xs text-gray-600">${c} \u062D\u0627\u062F\u062B</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
                                <div class="absolute start-0 top-0 h-full bg-red-500" style="width: ${n.incidents/i*100}%"></div>
                                <div class="absolute start-0 top-0 h-full bg-orange-500" style="width: ${n.nearmiss/i*100}%; margin-inline-start: ${n.incidents/i*100}%"></div>
                            </div>
                            <div class="flex gap-4 mt-1 text-xs text-gray-600">
                                <span>\u062D\u0648\u0627\u062F\u062B: ${n.incidents}</span>
                                <span>\u0648\u0634\u064A\u0643\u0629: ${n.nearmiss}</span>
                            </div>
                        </div>
                    `}).join("")}
            </div>
        `},renderHeatmap(e,t="heatmap-container"){const a=document.getElementById(t);if(!a)return;const r={},s=new Set,i=new Set;e.incidents.forEach(n=>{const c=n.affectedDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",l=n.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";s.add(c),i.add(l);const d=`${c}|${l}`;r[d]=(r[d]||0)+1});const o=Math.max(...Object.values(r),1);if(!s.size||!i.size){this.renderChartNoDataState(a,this._t("module.kpi.chart.noHeatmapData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629 \u0644\u0628\u0646\u0627\u0621 \u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u0629"));return}a.innerHTML=`
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr>
                            <th class="border p-2 text-sm font-semibold bg-gray-100">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0645\u0648\u0642\u0639</th>
                            ${Array.from(i).map(n=>`
                                <th class="border p-2 text-sm font-semibold bg-gray-100">${Utils.escapeHTML(n)}</th>
                            `).join("")}
                        </tr>
                    </thead>
                    <tbody>
                        ${Array.from(s).map(n=>`
                            <tr>
                                <td class="border p-2 text-sm font-semibold bg-gray-50">${Utils.escapeHTML(n)}</td>
                                ${Array.from(i).map(c=>{const l=`${n}|${c}`,d=r[l]||0,u=d/o*100;return`
                                        <td class="border p-2 text-center ${u>75?"bg-red-600":u>50?"bg-orange-500":u>25?"bg-yellow-400":"bg-green-400"} text-white font-semibold">
                                            ${d}
                                        </td>
                                    `}).join("")}
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},loadKPITargets(){const e=localStorage.getItem("hse_kpi_targets");if(e)try{this.kpiTargets=JSON.parse(e)}catch(t){Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0623\u0647\u062F\u0627\u0641 KPIs:",t),this.kpiTargets={}}},saveKPITargets(){localStorage.setItem("hse_kpi_targets",JSON.stringify(this.kpiTargets))},getKPITarget(e){return this.kpiTargets[e]||0},showSettingsModal(){const e=(a,r)=>this._t(a,r),t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 700px;" dir="auto">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-cog me-2"></i>
                        ${e("module.kpi.settings.title","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0623\u0647\u062F\u0627\u0641 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621")}
                    </h2>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4" style="padding: 1.5rem;">
                    ${this.renderTargetInputs()}
                </div>
                <div class="modal-footer" style="justify-content: flex-start; gap: 0.75rem;">
                    <button id="save-kpi-targets" class="btn-primary">
                        <i class="fas fa-save me-2"></i>
                        ${e("module.kpi.settings.save","\u062D\u0641\u0638")}
                    </button>
                    <button class="btn-secondary modal-close">
                        <i class="fas fa-times me-2"></i>
                        ${e("module.kpi.settings.cancel","\u0625\u0644\u063A\u0627\u0621")}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelectorAll(".modal-close").forEach(a=>{a.addEventListener("click",()=>t.remove())}),t.addEventListener("click",a=>{a.target===t&&t.remove()}),document.getElementById("save-kpi-targets")?.addEventListener("click",()=>{this.saveTargetsFromModal(t),t.remove()})},renderTargetInputs(){const e=(s,i)=>this._t(s,i),t=[{key:"inspection-tours",label:e("module.kpi.leading.inspectionTours","\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629"),unit:e("module.kpi.unit.tour","\u062C\u0648\u0644\u0629")},{key:"observations",label:e("module.kpi.leading.observations","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"),unit:e("module.kpi.unit.observation","\u0645\u0644\u0627\u062D\u0638\u0629")},{key:"actions-closure",label:e("module.kpi.leading.actionsClosure","\u0646\u0633\u0628\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629"),unit:"%"},{key:"training-courses",label:e("module.kpi.leading.trainingCourses","\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629"),unit:e("module.kpi.unit.course","\u062F\u0648\u0631\u0629")},{key:"training-attendance",label:e("module.kpi.leading.trainingAttendance","\u0646\u0633\u0628\u0629 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0644\u0644\u062A\u062F\u0631\u064A\u0628"),unit:"%"},{key:"ptw-approved",label:e("module.kpi.leading.ptwApproved","\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0648\u0627\u0644\u0645\u0646\u0641\u0630\u0629"),unit:e("module.kpi.unit.permit","\u062A\u0635\u0631\u064A\u062D")},{key:"ppe-compliance",label:e("module.kpi.leading.ppeCompliance","\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"),unit:"%"},{key:"inspections-on-time",label:e("module.kpi.leading.inspectionsOnTime","\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629 \u0627\u0644\u0645\u0646\u062C\u0632\u0629 \u0641\u064A \u0627\u0644\u0645\u0648\u0639\u062F"),unit:e("module.kpi.unit.inspection","\u0641\u062D\u0635")},{key:"safety-meetings",label:e("module.kpi.leading.safetyMeetings","\u0639\u062F\u062F \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u0639\u064A\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0633\u0644\u0627\u0645\u0629"),unit:e("module.kpi.unit.meeting","\u0627\u062C\u062A\u0645\u0627\u0639")}],a=[{key:"injuries",label:e("module.kpi.lagging.totalInjuries","\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629"),unit:e("module.kpi.unit.injury","\u0625\u0635\u0627\u0628\u0629")},{key:"lti",label:e("module.kpi.lagging.ltiCount","\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0624\u062F\u064A\u0629 \u0644\u062A\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644 (LTI)"),unit:e("module.kpi.unit.injury","\u0625\u0635\u0627\u0628\u0629")},{key:"ltifr",label:e("module.kpi.lagging.ltifr","\u0645\u0639\u062F\u0644 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (LTIFR)"),unit:""},{key:"severity",label:e("module.kpi.lagging.severityRate","\u0645\u0639\u062F\u0644 \u0634\u062F\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (SR)"),unit:""},{key:"incident-rate",label:e("module.kpi.lagging.incidentRate","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B (IR)"),unit:""},{key:"nearmiss-count",label:e("module.kpi.lagging.nearMissCount","\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629"),unit:e("module.kpi.unit.incident","\u062D\u0627\u062F\u062B")},{key:"fire-incidents",label:e("module.kpi.lagging.fireIncidents","\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0627\u0626\u0642 \u0623\u0648 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0641\u064A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621"),unit:e("module.kpi.unit.incident","\u062D\u0627\u062F\u062B")},{key:"lost-days",label:e("module.kpi.lagging.lostDays","\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0647\u062F\u0648\u0631\u0629 \u0628\u0633\u0628\u0628 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A"),unit:e("module.kpi.unit.day","\u064A\u0648\u0645")},{key:"accident-cost",label:e("module.kpi.lagging.accidentCost","\u062A\u0643\u0644\u0641\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B (\u0645\u0628\u0627\u0634\u0631\u0629 / \u063A\u064A\u0631 \u0645\u0628\u0627\u0634\u0631\u0629)"),unit:e("module.kpi.unit.sar","\u0631\u064A\u0627\u0644")}],r=e("module.kpi.settings.placeholder","\u0627\u0644\u0647\u062F\u0641");return`
            <div class="space-y-6" dir="auto">
                <!-- Leading Indicators Section -->
                <div>
                    <h3 class="text-lg font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-300">
                        <i class="fas fa-arrow-trend-up me-2"></i>
                        ${e("module.kpi.settings.leadingSection","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0628\u0627\u0642\u064A\u0629")} (Leading Indicators)
                    </h3>
                    <div class="space-y-4">
                        ${t.map(s=>`
                            <div class="flex items-center gap-3">
                                <label class="flex-1 text-sm font-semibold text-gray-700 min-w-0">${s.label}</label>
                                <div class="flex items-center gap-2 flex-shrink-0">
                                    ${s.unit?`<span class="text-sm text-gray-600 whitespace-nowrap">${s.unit}</span>`:""}
                                    <input type="number" 
                                        id="target-${s.key}" 
                                        class="form-input w-32" 
                                        value="${this.kpiTargets[s.key]||""}" 
                                        placeholder="${r}"
                                        step="0.1"
                                        dir="ltr">
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                
                <!-- Lagging Indicators Section -->
                <div>
                    <h3 class="text-lg font-bold text-red-700 mb-4 pb-2 border-b-2 border-red-300">
                        <i class="fas fa-arrow-trend-down me-2"></i>
                        ${e("module.kpi.settings.laggingSection","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0631\u0627\u062C\u0639\u064A\u0629")} (Lagging Indicators)
                    </h3>
                    <div class="space-y-4">
                        ${a.map(s=>`
                            <div class="flex items-center gap-3">
                                <label class="flex-1 text-sm font-semibold text-gray-700 min-w-0">${s.label}</label>
                                <div class="flex items-center gap-2 flex-shrink-0">
                                    ${s.unit?`<span class="text-sm text-gray-600 whitespace-nowrap">${s.unit}</span>`:""}
                                    <input type="number" 
                                        id="target-${s.key}" 
                                        class="form-input w-32" 
                                        value="${this.kpiTargets[s.key]||""}" 
                                        placeholder="${r}"
                                        step="0.1"
                                        dir="ltr">
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `},saveTargetsFromModal(e){const t=["inspection-tours","observations","actions-closure","training-courses","training-attendance","ptw-approved","ppe-compliance","inspections-on-time","safety-meetings"],a=["injuries","lti","ltifr","severity","incident-rate","nearmiss-count","fire-incidents","lost-days","accident-cost"];[...t,...a].forEach(s=>{const i=e.querySelector(`#target-${s}`);if(i){const o=parseFloat(i.value);!isNaN(o)&&o>=0&&(this.kpiTargets[s]=o)}}),this.saveKPITargets(),Notification.success(this._t("module.kpi.notify.settingsSaved","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0628\u0646\u062C\u0627\u062D")),this.updateAllKPIs()},getRenderedScorecardTable(){return document.querySelector("#spk-scorecard-table-container .spk-scorecard-table")},getExportableScorecardTable(){const e=this.getRenderedScorecardTable();if(!e)return null;const t=e.cloneNode(!0);return t.querySelectorAll("input, select, textarea").forEach(a=>{const r=a.closest("td, th");if(!r)return;let s="";a.tagName==="SELECT"?s=a.options[a.selectedIndex]?.text||"":s=a.value||"",r.textContent=s==="-"?"":s}),t},exportScorecardToExcel(){const e=this.getExportableScorecardTable();if(!e||typeof XLSX>"u"){Notification.error(this._t("module.kpi.notify.excelError","\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u0643\u0648\u0631 \u0643\u0627\u0631\u062F \u0625\u0644\u0649 Excel"));return}const t=XLSX.utils.book_new(),a=XLSX.utils.table_to_sheet(e,{raw:!0});a["!cols"]=[{wch:34}].concat(new Array(12).fill({wch:14}),[{wch:18}]),XLSX.utils.book_append_sheet(t,a,"Safety Scorecard"),XLSX.writeFile(t,`Safety_Performance_Scorecard_${this.scorecardYear}.xlsx`),Notification.success(this._t("module.kpi.notify.excelSuccess","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 Safety Performance Scorecard \u0625\u0644\u0649 Excel"))},exportScorecardToPDF(){const e=this.getExportableScorecardTable();if(!e){Notification.error(this._t("module.kpi.notify.pdfError","\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u0643\u0648\u0631 \u0643\u0627\u0631\u062F \u0625\u0644\u0649 PDF"));return}const t=`Safety Performance Scorecard ${this.scorecardYear}`,a=new Date().toISOString(),s=`
            ${document.getElementById("safety-performance-scorecard-styles")?.outerHTML||""}
            <style>
                .spk-scorecard-print {
                    direction: ltr;
                    font-family: Arial, 'Segoe UI', Tahoma, sans-serif;
                }
                .spk-scorecard-print__meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 18px;
                    padding: 12px 16px;
                    border: 1px solid #D7E3F1;
                    border-radius: 12px;
                    background: #F8FBFF;
                    font-size: 13px;
                    color: #334155;
                }
                .spk-scorecard-print__meta strong {
                    color: #0F172A;
                }
                .spk-scorecard-table {
                    width: 100%;
                    min-width: auto;
                }
                .spk-scorecard-table th:first-child,
                .spk-scorecard-table td:first-child {
                    position: static;
                }
                @media print {
                    .spk-scorecard-print__meta {
                        break-inside: avoid;
                    }
                }
            </style>
            <div class="spk-scorecard-print" dir="ltr" lang="en">
                <div class="spk-scorecard-print__meta">
                    <div><strong>Report:</strong> Safety Performance Scorecard</div>
                    <div><strong>Year:</strong> ${Utils.escapeHTML(String(this.scorecardYear))}</div>
                    <div><strong>Generated:</strong> ${Utils.escapeHTML(a.slice(0,10))}</div>
                </div>
                ${e.outerHTML}
            </div>
        `,i=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(`SAFETY-SCORECARD-${this.scorecardYear}`,t,s,!1,!0,{version:"1.0",source:"SafetyPerformanceScorecard",reportYear:this.scorecardYear,releaseDate:a,revisionDate:a},a,a):`<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="UTF-8"><title>${t}</title></head><body style="font-family:Arial,'Segoe UI',Tahoma,sans-serif;padding:20px;">${s}</body></html>`,o=new Blob(["\uFEFF"+i],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(o),c=window.open(n,"_blank");if(!c){URL.revokeObjectURL(n),Notification.error(this._t("module.kpi.notify.pdfBlocked","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0625\u062A\u0645\u0627\u0645 \u062A\u0635\u062F\u064A\u0631 PDF"));return}c.onload=()=>{setTimeout(()=>{c.print(),setTimeout(()=>URL.revokeObjectURL(n),1e3)},400)},Notification.success(this._t("module.kpi.notify.pdfSuccess","\u062A\u0645 \u0641\u062A\u062D \u0645\u0639\u0627\u064A\u0646\u0629 PDF \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0633\u0643\u0648\u0631 \u0643\u0627\u0631\u062F"))},async exportToExcel(){try{if(!this.isAdminUser()){Notification.error(this._t("module.kpi.notify.excelError","\u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637"));return}if(this.activeTab==="scorecard"){this.exportScorecardToExcel();return}const{start:e,end:t}=this.getDateRange(),a=this.getFilteredData(e,t),r=this.calculateInspectionTours(a),s=this.calculateObservationsRecorded(a),i=this.calculateCorrectiveActionsClosure(a),o=this.calculateTrainingCourses(a),n=this.calculateTrainingAttendance(a),c=this.calculatePTWApproved(a),l=this.calculatePPECompliance(a),d=this.calculatePeriodicInspectionsOnTime(a),u=this.calculateSafetyMeetings(a),g=this.calculateTotalInjuries(a),h=this.calculateLTICount(a),m=this.calculateLTIFR(a),p=this.calculateSeverityRate(a),f=this.calculateNearMissCount(a),b=this.calculateFireIncidents(a),x=this.calculateLostDays(a),k=this.calculateAccidentCost(a),S=[["\u0645\u0624\u0634\u0631 \u0627\u0644\u0623\u062F\u0627\u0621","\u0627\u0644\u0642\u064A\u0645\u0629","\u0627\u0644\u0647\u062F\u0641","\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u0646\u062C\u0627\u0632","\u0627\u0644\u0646\u0648\u0639"],["=== \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0628\u0627\u0642\u064A\u0629 (Leading Indicators) ===","","","",""],["\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629",r.completed,r.planned,r.percentage+"%","\u0627\u0633\u062A\u0628\u0627\u0642\u064A"],["\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",s.total,s.processed,s.percentage+"%","\u0627\u0633\u062A\u0628\u0627\u0642\u064A"],["\u0646\u0633\u0628\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629",i.percentage+"%","100%",i.percentage+"%","\u0627\u0633\u062A\u0628\u0627\u0642\u064A"],["\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629",o.completed,o.total,o.percentage+"%","\u0627\u0633\u062A\u0628\u0627\u0642\u064A"],["\u0646\u0633\u0628\u0629 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0644\u0644\u062A\u062F\u0631\u064A\u0628",n.percentage+"%","100%",n.percentage+"%","\u0627\u0633\u062A\u0628\u0627\u0642\u064A"],["\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0648\u0627\u0644\u0645\u0646\u0641\u0630\u0629",c.approved,c.total,c.percentage+"%","\u0627\u0633\u062A\u0628\u0627\u0642\u064A"],["\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",l.percentage+"%","100%",l.percentage+"%","\u0627\u0633\u062A\u0628\u0627\u0642\u064A"],["\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629 \u0627\u0644\u0645\u0646\u062C\u0632\u0629 \u0641\u064A \u0627\u0644\u0645\u0648\u0639\u062F",d.onTime,d.total,d.percentage+"%","\u0627\u0633\u062A\u0628\u0627\u0642\u064A"],["\u0639\u062F\u062F \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u0639\u064A\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0633\u0644\u0627\u0645\u0629",u,this.getKPITarget("safety-meetings"),"","\u0627\u0633\u062A\u0628\u0627\u0642\u064A"],["=== \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0631\u0627\u062C\u0639\u064A\u0629 (Lagging Indicators) ===","","","",""],["\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629",g,this.getKPITarget("injuries"),"","\u062A\u0631\u0627\u062C\u0639\u064A"],["\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0624\u062F\u064A\u0629 \u0644\u062A\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644 (LTI)",h,this.getKPITarget("lti"),"","\u062A\u0631\u0627\u062C\u0639\u064A"],["\u0645\u0639\u062F\u0644 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (LTIFR)",m,this.getKPITarget("ltifr"),"","\u062A\u0631\u0627\u062C\u0639\u064A"],["\u0645\u0639\u062F\u0644 \u0634\u062F\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",p,this.getKPITarget("severity"),"","\u062A\u0631\u0627\u062C\u0639\u064A"],["\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629",f,this.getKPITarget("nearmiss-count"),"","\u062A\u0631\u0627\u062C\u0639\u064A"],["\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0627\u0626\u0642 \u0623\u0648 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0641\u064A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621",b,this.getKPITarget("fire-incidents"),"","\u062A\u0631\u0627\u062C\u0639\u064A"],["\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0647\u062F\u0648\u0631\u0629 \u0628\u0633\u0628\u0628 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",x,this.getKPITarget("lost-days"),"","\u062A\u0631\u0627\u062C\u0639\u064A"],["\u062A\u0643\u0644\u0641\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B (\u0645\u0628\u0627\u0634\u0631\u0629 / \u063A\u064A\u0631 \u0645\u0628\u0627\u0634\u0631\u0629)",k,this.getKPITarget("accident-cost"),"","\u062A\u0631\u0627\u062C\u0639\u064A"]];if(typeof XLSX<"u"){const E=XLSX.utils.book_new(),C=XLSX.utils.aoa_to_sheet(S);XLSX.utils.book_append_sheet(E,C,"\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621"),XLSX.writeFile(E,`\u0645\u0624\u0634\u0631\u0627\u062A_\u0627\u0644\u0623\u062F\u0627\u0621_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success(this._t("module.kpi.notify.excelSuccess","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"))}else Notification.error(this._t("module.kpi.notify.excelError","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629"))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631:",e),Notification.error(this._t("module.kpi.notify.saveError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ")+e.message)}},async exportToPDF(){try{if(!this.isAdminUser()){Notification.error(this._t("module.kpi.notify.pdfError","\u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637"));return}if(this.activeTab==="scorecard"){this.exportScorecardToPDF();return}const{start:e,end:t}=this.getDateRange(),a=this.getFilteredData(e,t);if(typeof window.jsPDF<"u")try{const{jsPDF:$}=window.jsPDF,I=new $("l","mm","a4");I.setFontSize(18),I.text("\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",150,15,{align:"center"}),I.setFontSize(12),I.text(`\u0627\u0644\u0641\u062A\u0631\u0629: ${e.toLocaleDateString("ar-SA")} - ${t.toLocaleDateString("ar-SA")}`,150,25,{align:"center"});const A=this.calculateInspectionTours(a),P=this.calculateObservationsRecorded(a),D=this.calculateCorrectiveActionsClosure(a),v=this.calculateTrainingCourses(a),w=this.calculateTrainingAttendance(a),T=this.calculatePTWApproved(a),F=this.calculatePPECompliance(a),M=this.calculatePeriodicInspectionsOnTime(a),L=this.calculateSafetyMeetings(a),R=this.calculateTotalInjuries(a),B=this.calculateLTICount(a),j=this.calculateLTIFR(a),N=this.calculateSeverityRate(a),O=this.calculateNearMissCount(a),K=this.calculateFireIncidents(a),W=this.calculateLostDays(a),U=this.calculateAccidentCost(a),H=[["\u0627\u0644\u0645\u0624\u0634\u0631","\u0627\u0644\u0642\u064A\u0645\u0629","\u0627\u0644\u0647\u062F\u0641"],["=== \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0628\u0627\u0642\u064A\u0629 ===","",""],["\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629",A.completed,A.planned],["\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",P.total,P.processed],["\u0646\u0633\u0628\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629",D.percentage+"%","100%"],["\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629",v.completed,v.total],["\u0646\u0633\u0628\u0629 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0644\u0644\u062A\u062F\u0631\u064A\u0628",w.percentage+"%","100%"],["\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0648\u0627\u0644\u0645\u0646\u0641\u0630\u0629",T.approved,T.total],["\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",F.percentage+"%","100%"],["\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629 \u0627\u0644\u0645\u0646\u062C\u0632\u0629 \u0641\u064A \u0627\u0644\u0645\u0648\u0639\u062F",M.onTime,M.total],["\u0639\u062F\u062F \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u0639\u064A\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0633\u0644\u0627\u0645\u0629",L,this.getKPITarget("safety-meetings")],["=== \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0631\u0627\u062C\u0639\u064A\u0629 ===","",""],["\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629",R,this.getKPITarget("injuries")],["\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0624\u062F\u064A\u0629 \u0644\u062A\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644 (LTI)",B,this.getKPITarget("lti")],["\u0645\u0639\u062F\u0644 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (LTIFR)",j,this.getKPITarget("ltifr")],["\u0645\u0639\u062F\u0644 \u0634\u062F\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",N,this.getKPITarget("severity")],["\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629",O,this.getKPITarget("nearmiss-count")],["\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0627\u0626\u0642 \u0623\u0648 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0641\u064A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621",K,this.getKPITarget("fire-incidents")],["\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0647\u062F\u0648\u0631\u0629 \u0628\u0633\u0628\u0628 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",W,this.getKPITarget("lost-days")],["\u062A\u0643\u0644\u0641\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B (\u0645\u0628\u0627\u0634\u0631\u0629 / \u063A\u064A\u0631 \u0645\u0628\u0627\u0634\u0631\u0629)",U,this.getKPITarget("accident-cost")]];if(typeof I.autoTable<"u")I.autoTable({head:[H[0]],body:H.slice(1),startY:35,styles:{font:"Arial",fontSize:10,halign:"right"},headStyles:{fillColor:[59,130,246],textColor:255}});else{let _=35;H.slice(1).forEach(Y=>{I.text(Y.join(" | "),20,_),_+=10})}I.save(`\u0645\u0624\u0634\u0631\u0627\u062A_\u0627\u0644\u0623\u062F\u0627\u0621_${new Date().toISOString().slice(0,10)}.pdf`),Notification.success(this._t("module.kpi.notify.pdfSuccess","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 PDF \u0628\u0646\u062C\u0627\u062D"));return}catch($){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 jsPDF\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0637\u0631\u064A\u0642\u0629 HTML:",$)}const r=this.calculateInspectionTours(a),s=this.calculateObservationsRecorded(a),i=this.calculateCorrectiveActionsClosure(a),o=this.calculateTrainingCourses(a),n=this.calculateTrainingAttendance(a),c=this.calculatePTWApproved(a),l=this.calculatePPECompliance(a),d=this.calculatePeriodicInspectionsOnTime(a),u=this.calculateSafetyMeetings(a),g=this.calculateTotalInjuries(a),h=this.calculateLTICount(a),m=this.calculateLTIFR(a),p=this.calculateSeverityRate(a),f=this.calculateNearMissCount(a),b=this.calculateFireIncidents(a),x=this.calculateLostDays(a),k=this.calculateAccidentCost(a),S=[["=== \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0628\u0627\u0642\u064A\u0629 ===","",""],["\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629",r.completed,r.planned],["\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",s.total,s.processed],["\u0646\u0633\u0628\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629",i.percentage+"%","100%"],["\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u0646\u0641\u0630\u0629",o.completed,o.total],["\u0646\u0633\u0628\u0629 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0644\u0644\u062A\u062F\u0631\u064A\u0628",n.percentage+"%","100%"],["\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0648\u0627\u0644\u0645\u0646\u0641\u0630\u0629",c.approved,c.total],["\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",l.percentage+"%","100%"],["\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629 \u0627\u0644\u0645\u0646\u062C\u0632\u0629 \u0641\u064A \u0627\u0644\u0645\u0648\u0639\u062F",d.onTime,d.total],["\u0639\u062F\u062F \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u0639\u064A\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0633\u0644\u0627\u0645\u0629",u,this.getKPITarget("safety-meetings")],["=== \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0631\u0627\u062C\u0639\u064A\u0629 ===","",""],["\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629",g,this.getKPITarget("injuries")],["\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0624\u062F\u064A\u0629 \u0644\u062A\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644 (LTI)",h,this.getKPITarget("lti")],["\u0645\u0639\u062F\u0644 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (LTIFR)",m,this.getKPITarget("ltifr")],["\u0645\u0639\u062F\u0644 \u0634\u062F\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",p,this.getKPITarget("severity")],["\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629",f,this.getKPITarget("nearmiss-count")],["\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0627\u0626\u0642 \u0623\u0648 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0641\u064A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621",b,this.getKPITarget("fire-incidents")],["\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0647\u062F\u0648\u0631\u0629 \u0628\u0633\u0628\u0628 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",x,this.getKPITarget("lost-days")],["\u062A\u0643\u0644\u0641\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B (\u0645\u0628\u0627\u0634\u0631\u0629 / \u063A\u064A\u0631 \u0645\u0628\u0627\u0634\u0631\u0629)",k,this.getKPITarget("accident-cost")]].map($=>$[0].includes("===")?`<tr style="background-color: #e5e7eb;"><td colspan="3" style="text-align: center; font-weight: bold; padding: 10px;">${Utils.escapeHTML($[0])}</td></tr>`:`
                    <tr>
                        <td>${Utils.escapeHTML($[0])}</td>
                        <td class="text-center">${Utils.escapeHTML(String($[1]))}</td>
                        <td class="text-center">${Utils.escapeHTML(String($[2]))}</td>
                    </tr>
                `).join(""),E=`
                <div style="margin-bottom: 20px;">
                    <h3 style="text-align: center; margin-bottom: 10px;">\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</h3>
                    <p style="text-align: center; color: #666;">
                        \u0627\u0644\u0641\u062A\u0631\u0629: ${e.toLocaleDateString("ar-SA")} - ${t.toLocaleDateString("ar-SA")}
                    </p>
                </div>
                <table class="report-table" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr style="background-color: #3b82f6; color: white;">
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">\u0627\u0644\u0645\u0624\u0634\u0631</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">\u0627\u0644\u0642\u064A\u0645\u0629</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">\u0627\u0644\u0647\u062F\u0641</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${S}
                    </tbody>
                </table>
            `,C=PDFTemplates.buildDocument({title:"\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",formCode:"KPI-REPORT",content:E,createdAt:new Date,meta:{\u0627\u0644\u0641\u062A\u0631\u0629:`${e.toLocaleDateString("ar-SA")} - ${t.toLocaleDateString("ar-SA")}`,"\u0639\u062F\u062F \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A":"17","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0628\u0627\u0642\u064A\u0629":"9","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0631\u0627\u062C\u0639\u064A\u0629":"8"}}),y=window.open("","_blank");if(!y){Notification.error(this._t("module.kpi.notify.pdfBlocked","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"));return}y.document.write(C),y.document.close(),setTimeout(()=>{y.print()},500),Notification.success(this._t("module.kpi.notify.targetsSuccess","\u062A\u0645 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629. \u064A\u0645\u0643\u0646\u0643 \u062D\u0641\u0638\u0647\u0627 \u0643\u0640 PDF \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629."))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error(this._t("module.kpi.notify.targetsError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0635\u062F\u064A\u0631 PDF: ")+e.message)}}};SafetyPerformanceKPIs._tonePalette={rose:{c50:"#FFF1F2",c100:"#FFE4E6",c200:"#FECDD3",c400:"#FB7185",c500:"#F43F5E",c600:"#E11D48",c700:"#BE123C",soft:"rgba(244,63,94,0.10)"},amber:{c50:"#FFFBEB",c100:"#FEF3C7",c200:"#FDE68A",c400:"#FBBF24",c500:"#F59E0B",c600:"#D97706",c700:"#B45309",soft:"rgba(245,158,11,0.10)"},emerald:{c50:"#ECFDF5",c100:"#D1FAE5",c200:"#A7F3D0",c400:"#34D399",c500:"#10B981",c600:"#059669",c700:"#047857",soft:"rgba(16,185,129,0.10)"},indigo:{c50:"#EEF2FF",c100:"#E0E7FF",c200:"#C7D2FE",c400:"#818CF8",c500:"#6366F1",c600:"#4F46E5",c700:"#4338CA",soft:"rgba(99,102,241,0.10)"},sky:{c50:"#F0F9FF",c100:"#E0F2FE",c200:"#BAE6FD",c400:"#38BDF8",c500:"#0EA5E9",c600:"#0284C7",c700:"#0369A1",soft:"rgba(14,165,233,0.10)"},teal:{c50:"#F0FDFA",c100:"#CCFBF1",c200:"#99F6E4",c400:"#2DD4BF",c500:"#14B8A6",c600:"#0D9488",c700:"#0F766E",soft:"rgba(20,184,166,0.10)"},blue:{c50:"#EFF6FF",c100:"#DBEAFE",c200:"#BFDBFE",c400:"#60A5FA",c500:"#3B82F6",c600:"#2563EB",c700:"#1D4ED8",soft:"rgba(59,130,246,0.10)"},violet:{c50:"#F5F3FF",c100:"#EDE9FE",c200:"#DDD6FE",c400:"#A78BFA",c500:"#8B5CF6",c600:"#7C3AED",c700:"#6D28D9",soft:"rgba(139,92,246,0.10)"},orange:{c50:"#FFF7ED",c100:"#FFEDD5",c200:"#FED7AA",c400:"#FB923C",c500:"#F97316",c600:"#EA580C",c700:"#C2410C",soft:"rgba(249,115,22,0.10)"},red:{c50:"#FEF2F2",c100:"#FEE2E2",c200:"#FECACA",c400:"#F87171",c500:"#EF4444",c600:"#DC2626",c700:"#B91C1C",soft:"rgba(239,68,68,0.10)"},green:{c50:"#F0FDF4",c100:"#DCFCE7",c200:"#BBF7D0",c400:"#4ADE80",c500:"#22C55E",c600:"#16A34A",c700:"#15803D",soft:"rgba(34,197,94,0.10)"},purple:{c50:"#FAF5FF",c100:"#F3E8FF",c200:"#E9D5FF",c400:"#C084FC",c500:"#A855F7",c600:"#9333EA",c700:"#7E22CE",soft:"rgba(168,85,247,0.10)"},pink:{c50:"#FDF2F8",c100:"#FCE7F3",c200:"#FBCFE8",c400:"#F472B6",c500:"#EC4899",c600:"#DB2777",c700:"#BE185D",soft:"rgba(236,72,153,0.10)"},cyan:{c50:"#ECFEFF",c100:"#CFFAFE",c200:"#A5F3FC",c400:"#22D3EE",c500:"#06B6D4",c600:"#0891B2",c700:"#0E7490",soft:"rgba(6,182,212,0.10)"},yellow:{c50:"#FEFCE8",c100:"#FEF9C3",c200:"#FEF08A",c400:"#FACC15",c500:"#EAB308",c600:"#CA8A04",c700:"#A16207",soft:"rgba(234,179,8,0.10)"}},SafetyPerformanceKPIs._toneColors=function(e){return this._tonePalette[String(e||"").toLowerCase()]||this._tonePalette.indigo},SafetyPerformanceKPIs.renderOverviewMiniStat=function(e,t,a,r,s){const i=this._toneColors(r);return`
        <div class="spk-mini-card group relative overflow-hidden rounded-[20px] bg-white p-5 transition-all duration-300 hover:-translate-y-1" style="border: 1px solid rgba(20,34,61,0.10); box-shadow: 0 12px 30px -10px rgba(10,22,40,0.10), 0 4px 12px -4px rgba(10,22,40,0.04);">
            <!-- Top accent bar (tone gradient \u2014 hex inline) -->
            <div class="absolute inset-x-0 top-0 h-1" style="background: linear-gradient(90deg, ${i.c600}, ${i.c500}, ${i.c400});"></div>
            <!-- Gold corner dot (executive signature) -->
            <div class="absolute top-2.5 end-2.5 h-1.5 w-1.5 rounded-full pointer-events-none" style="background: #D4A017; box-shadow: 0 0 8px rgba(212,160,23,0.55);"></div>
            <!-- Tone glow blob -->
            <div class="absolute -top-12 -end-12 h-32 w-32 rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-90" style="background: ${i.c100}; opacity:0.55; filter: blur(20px);"></div>

            <div class="relative flex items-start justify-between gap-3">
                <div class="min-w-0">
                    <div class="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.26em]" style="color: ${i.c700};">
                        <span class="inline-block h-1 w-3 rounded-full" style="background: ${i.c500};"></span>
                        ${s}
                    </div>
                    <div class="mt-2 text-sm font-bold leading-snug" style="color: #1E293B;">${t}</div>
                </div>
                <div class="h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105" style="color: ${i.c700}; background: linear-gradient(135deg, ${i.c50}, ${i.c100}); border: 1px solid ${i.c200}; box-shadow: 0 4px 12px -4px ${i.soft.replace("0.10","0.30")};">
                    <i class="fas ${a}"></i>
                </div>
            </div>
            <div class="relative mt-5 flex items-end gap-2 pt-3" style="border-top: 1px dashed rgba(20,34,61,0.10);">
                <span id="${e}" class="text-[1.875rem] font-black leading-none tracking-tight" style="color: #0A1628; font-feature-settings: 'tnum';" dir="ltr">-</span>
                <span class="text-xs font-bold pb-0.5" style="color: #64748B;">${s}</span>
            </div>
        </div>
    `},SafetyPerformanceKPIs.renderWorkforceStatCard=function(e,t,a,r,s,i=""){const o=this._toneColors(r);return`
        <div class="spk-workforce-card group relative overflow-hidden rounded-[22px] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style="border: 1px solid rgba(20,34,61,0.10); box-shadow: 0 14px 36px -12px rgba(10,22,40,0.12), 0 4px 12px -4px rgba(10,22,40,0.04);">
            <!-- Top accent bar (tone gradient \u2014 hex inline) -->
            <div class="absolute inset-x-0 top-0 h-1" style="background: linear-gradient(90deg, ${o.c600}, ${o.c500}, ${o.c400});"></div>
            <!-- Gold corner dot (executive signature) -->
            <div class="absolute top-2.5 end-2.5 h-1.5 w-1.5 rounded-full pointer-events-none" style="background: #D4A017; box-shadow: 0 0 8px rgba(212,160,23,0.55);"></div>
            <!-- Tone glow blob -->
            <div class="absolute -top-14 -end-14 h-40 w-40 rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-90" style="background: ${o.c100}; opacity:0.55; filter: blur(28px);"></div>

            <div class="relative flex items-start justify-between gap-3 mb-4">
                <div class="min-w-0 flex-1">
                    <div class="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.26em]" style="color: ${o.c700};">
                        <span class="inline-block h-1 w-3 rounded-full" style="background: ${o.c500};"></span>
                        ${s}
                    </div>
                    <h4 class="mt-2 text-sm font-bold leading-snug" style="color: #1E293B;">${t}</h4>
                </div>
                <div class="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105" style="color: ${o.c700}; background: linear-gradient(135deg, ${o.c50}, #FFFFFF 50%, ${o.c100}); border: 1px solid ${o.c200}; box-shadow: 0 6px 16px -4px ${o.soft.replace("0.10","0.32")}, inset 0 0 0 1px rgba(255,255,255,0.6);">
                    <i class="fas ${a} text-lg"></i>
                </div>
            </div>

            <div class="relative flex items-end gap-2 pt-3" style="border-top: 1px solid rgba(20,34,61,0.06);">
                <span id="${e}" class="text-[2rem] font-black leading-none tracking-tight" style="color: #0A1628; font-feature-settings: 'tnum';" dir="ltr">-</span>
                <span class="text-xs font-bold pb-1" style="color: #64748B;">${s}</span>
            </div>

            ${i?`
                <div class="relative mt-4 pt-3" style="border-top: 1px dashed rgba(20,34,61,0.10);">
                    <p class="text-[11px] leading-relaxed flex items-start gap-1.5" style="color: #475569;">
                        <i class="fas fa-info-circle mt-0.5 shrink-0" style="color: #B4870C; opacity: 0.85;"></i>
                        <span>${i}</span>
                    </p>
                </div>
            `:""}
        </div>
    `},SafetyPerformanceKPIs.renderOverviewChartCard=function(e,t,a,r,s){return`
        <div class="content-card overflow-hidden" style="border: 1px solid rgba(148,163,184,0.14); box-shadow: 0 18px 38px rgba(15,23,42,0.06);">
            <div class="card-header" style="background: linear-gradient(135deg, rgba(255,255,255,0.94), rgba(248,250,252,0.96)); border-bottom: 1px solid rgba(148,163,184,0.14);">
                <div class="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <h2 class="card-title text-slate-900">
                            <i class="fas ${a} me-2 text-${r}-600"></i>
                            ${t}
                        </h2>
                        <p class="text-sm text-slate-500 mt-2">${s}</p>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div id="${e}" style="height: 300px;"></div>
            </div>
        </div>
    `},SafetyPerformanceKPIs.renderKPICard=function(e,t,a,r,s,i=""){const o=(l,d)=>SafetyPerformanceKPIs._t(l,d);let n;const c=String(s||"").trim();return c.startsWith("#")?n={c50:c+"0F",c100:c+"1F",c200:c+"40",c400:c,c500:c,c600:c,c700:c,soft:c+"20"}:n=this._toneColors(c),`
        <article class="spk-kpi-card group relative overflow-hidden rounded-[22px] bg-white p-5 transition-all duration-300 hover:-translate-y-1" style="border: 1px solid rgba(20,34,61,0.10); box-shadow: 0 14px 36px -12px rgba(10,22,40,0.12), 0 4px 12px -4px rgba(10,22,40,0.04);">
            <!-- Top accent gradient bar (tone \u2014 hex inline) -->
            <div class="absolute inset-x-0 top-0 h-1" style="background: linear-gradient(90deg, ${n.c600}, ${n.c500}, ${n.c400});"></div>
            <!-- Gold corner dot (executive signature) -->
            <div class="absolute top-2.5 end-2.5 h-1.5 w-1.5 rounded-full pointer-events-none" style="background: #D4A017; box-shadow: 0 0 8px rgba(212,160,23,0.55);"></div>
            <!-- Tone-tinted glow blob -->
            <div class="absolute -top-14 -end-14 h-40 w-40 rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-90" style="background: ${n.c100}; opacity:0.50; filter: blur(28px);"></div>

            <!-- Header (eyebrow + label + icon) -->
            <div class="relative flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                    <div class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.24em]" style="color: ${n.c700}; background: ${n.c50}; border: 1px solid ${n.c200};">
                        <span class="inline-block h-1 w-3 rounded-full" style="background: ${n.c500};"></span>
                        ${a}
                    </div>
                    <h3 class="mt-2.5 text-sm font-bold leading-snug" style="color: #1E293B;">${t}</h3>
                    <p class="text-[11px] mt-2 flex items-center gap-1.5" id="${e}-period" style="color: #64748B;">
                        <i class="fas fa-calendar-week" style="color: ${n.c500};"></i>
                        ${o("module.kpi.card.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631")}
                    </p>
                </div>
                <div class="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105" style="color: ${n.c700}; background: linear-gradient(135deg, ${n.c50}, ${n.c100}); border: 1px solid ${n.c200}; box-shadow: 0 6px 16px -4px ${n.soft.replace("0.10","0.32")}, inset 0 0 0 1px rgba(255,255,255,0.55);">
                    <i class="fas ${r} text-lg"></i>
                </div>
            </div>

            <!-- Value section -->
            <div class="relative mt-5 pt-3" style="border-top: 1px solid rgba(20,34,61,0.06);">
                <div class="flex items-end justify-between gap-3 flex-wrap">
                    <div class="flex items-end gap-2">
                        <span class="text-[2.25rem] font-black leading-none tracking-tight" id="${e}-value" style="color: #0A1628; font-feature-settings: 'tnum';" dir="ltr">-</span>
                        <span class="text-sm font-bold pb-1.5" id="${e}-unit" style="color: #64748B;">${i}</span>
                    </div>
                    <div class="status-badge status-success" id="${e}-status" style="display:none;"></div>
                </div>

                <!-- Target + Achievement (refined twin chips) -->
                <div class="mt-4 grid grid-cols-2 gap-2.5">
                    <div class="rounded-xl px-3 py-2.5" style="background: linear-gradient(135deg, #F8FAFC, #FFFFFF); border: 1px solid rgba(20,34,61,0.08); box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);">
                        <div class="text-[9px] font-black uppercase tracking-[0.22em] flex items-center gap-1" style="color: #64748B;">
                            <i class="fas fa-bullseye" style="color: ${n.c500};"></i>
                            ${o("module.kpi.hero.target","\u0627\u0644\u0647\u062F\u0641")}
                        </div>
                        <div class="mt-1 text-sm font-black" id="${e}-target" style="color: #14223D; font-feature-settings: 'tnum';" dir="ltr">-</div>
                    </div>
                    <div class="rounded-xl px-3 py-2.5" style="background: linear-gradient(135deg, #F8FAFC, #FFFFFF); border: 1px solid rgba(20,34,61,0.08); box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);">
                        <div class="text-[9px] font-black uppercase tracking-[0.22em] flex items-center gap-1" style="color: #64748B;">
                            <i class="fas fa-chart-line" style="color: ${n.c500};"></i>
                            ${o("module.kpi.card.achievement","\u0627\u0644\u0625\u0646\u062C\u0627\u0632")}
                        </div>
                        <div class="mt-1 text-sm font-black" id="${e}-progress" style="color: #14223D; font-feature-settings: 'tnum';" dir="ltr">-</div>
                    </div>
                </div>

                <!-- Progress bar -->
                <div class="mt-4">
                    <div class="w-full h-2 rounded-full overflow-hidden" style="background: rgba(20,34,61,0.06);" dir="ltr">
                        <div class="h-full rounded-full transition-all duration-500" id="${e}-progress-bar" style="width:0%; background: linear-gradient(90deg, ${n.c500}, ${n.c600}); box-shadow: 0 0 8px rgba(0,0,0,0.10);"></div>
                    </div>
                </div>

                <!-- Trend indicator -->
                <div class="mt-3.5 flex items-center justify-between gap-2 flex-wrap">
                    <div class="flex items-center gap-1.5 text-xs" id="${e}-trend">
                        <i class="fas fa-minus" style="color: #94A3B8;"></i>
                        <span class="font-semibold" style="color: #64748B;">${o("module.kpi.card.noChange","\u0644\u0627 \u064A\u0648\u062C\u062F \u062A\u063A\u064A\u064A\u0631")}</span>
                    </div>
                </div>
            </div>
        </article>
    `},SafetyPerformanceKPIs.render=async function(){const e=(t,a)=>SafetyPerformanceKPIs._t(t,a);return`
        <div class="section-header">
            <div class="flex items-center justify-between flex-wrap gap-4">
                <div class="min-w-0">
                    <h1 class="section-title">
                        <i class="fas fa-gauge-high me-3"></i>
                        ${e("module.kpi.title","\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}
                    </h1>
                    <p class="section-subtitle">${e("module.kpi.subtitle","\u0631\u0635\u062F \u0648\u062A\u062D\u0644\u064A\u0644 \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")}</p>
                </div>
                <div class="flex gap-2 flex-wrap">
                    <button id="kpis-export-excel-btn" class="btn-success" title="${e("module.kpi.exportExcel","\u062A\u0635\u062F\u064A\u0631 Excel")}">
                        <i class="fas fa-file-excel me-2"></i>
                        ${e("module.kpi.common.excel","Excel")}
                    </button>
                    <button id="kpis-export-pdf-btn" class="btn-secondary">
                        <i class="fas fa-file-pdf me-2"></i>
                        ${e("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF")}
                    </button>
                    <button id="kpis-settings-btn" class="btn-primary">
                        <i class="fas fa-cog me-2"></i>
                        ${e("module.kpi.settings","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0623\u0647\u062F\u0627\u0641")}
                    </button>
                </div>
            </div>
        </div>

        <!-- \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557 -->
        <!-- \u2551 \u{1F3A8} Executive Hero \u2014 \u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 KPIs                              \u2551 -->
        <!-- \u2551 Deep navy + gold accent + at-a-glance executive design          \u2551 -->
        <!-- \u2551 \u0645\u0635\u0645\u064E\u0651\u0645 \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u064A\u0646 \u2014 \u0642\u0631\u0627\u0621\u0629 \u0633\u0631\u064A\u0639\u0629 + \u0631\u0641\u0627\u0647\u064A\u0629 \u0628\u0635\u0631\u064A\u0629         \u2551 -->
        <!-- \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D -->
        <div class="spk-hero-card mt-6 overflow-hidden relative" style="border-radius: 24px; border: 1px solid rgba(15,23,42,0.12); box-shadow: 0 32px 64px -24px rgba(10,22,40,0.32), 0 12px 28px -12px rgba(212,160,23,0.10);">

            <!-- \u2501\u2501\u2501 Top: Executive Navy Banner \u2501\u2501\u2501 -->
            <div class="relative overflow-hidden" style="background: linear-gradient(135deg, #0A1628 0%, #14223D 35%, #1E3A5F 65%, #2A4A7B 100%);">
                <!-- \u062E\u0644\u0641\u064A\u0629 \u0645\u0632\u062E\u0631\u0641\u0629 \u0641\u0627\u062E\u0631\u0629: \u0646\u0642\u0627\u0637 \u0630\u0647\u0628\u064A\u0629 \u0646\u0627\u0639\u0645\u0629 -->
                <div class="absolute inset-0 opacity-[0.10] pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0); background-size: 28px 28px;"></div>
                <!-- glow \u0630\u0647\u0628\u064A \u0641\u064A \u0627\u0644\u0632\u0627\u0648\u064A\u0629 -->
                <div class="absolute -top-24 -end-24 h-72 w-72 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(212,160,23,0.22) 0%, transparent 65%);"></div>
                <div class="absolute -bottom-32 -start-20 h-80 w-80 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(75,124,176,0.18) 0%, transparent 70%);"></div>
                <!-- \u062E\u0637 \u0630\u0647\u0628\u064A \u0631\u0641\u064A\u0639 \u0643\u062D\u062F \u0639\u0644\u0648\u064A (\u0634\u0631\u064A\u0637 \u0641\u0627\u062E\u0631) -->
                <div class="absolute inset-x-0 top-0 h-[3px]" style="background: linear-gradient(90deg, transparent, #D4A017 30%, #F4C447 50%, #D4A017 70%, transparent);"></div>

                <div class="relative p-6 lg:p-8">
                    <div class="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-6 items-start">
                        <!-- \u2501\u2501\u2501 Hero Content (\u0639\u0644\u0649 \u0627\u0644\u0640 navy) \u2501\u2501\u2501 -->
                        <div class="min-w-0">
                            <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] border" style="background: rgba(212,160,23,0.14); border-color: rgba(212,160,23,0.42); color: #F4C447; backdrop-filter: blur(8px);">
                                <i class="fas fa-shield-halved"></i>
                                <span>${e("module.kpi.tab.kpisOverview","\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u2014 KPIs")}</span>
                            </div>
                            <h2 class="mt-4 text-3xl xl:text-[2.4rem] font-black leading-tight tracking-tight" style="color: #FFFFFF; text-shadow: 0 2px 4px rgba(0,0,0,0.18);">${e("module.kpi.overview.headline","\u0644\u0648\u062D\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 \u064A\u0648\u0645\u064A\u0629 \u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}</h2>
                            <p class="mt-3 text-sm leading-7 max-w-2xl" style="color: rgba(255,255,255,0.78);">${e("module.kpi.overview.intro","\u0648\u0627\u062C\u0647\u0629 \u0648\u0635\u0648\u0644 \u0633\u0631\u064A\u0639 \u0644\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A\u060C \u0645\u0639 \u0646\u0641\u0633 \u0622\u0644\u064A\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0648\u0627\u0644\u062A\u0643\u0627\u0645\u0644 \u062F\u0627\u062E\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642.")}</p>

                            <div class="mt-6 flex flex-wrap gap-3">
                                <div class="rounded-2xl px-4 py-3 min-w-[180px]" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); backdrop-filter: blur(10px);">
                                    <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em]" style="color: rgba(244,196,71,0.92);">
                                        <i class="fas fa-calendar-week"></i>
                                        ${e("module.kpi.overview.activePeriod","\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0646\u0634\u0637\u0629")}
                                    </div>
                                    <div class="mt-1.5 text-sm font-bold" style="color: #FFFFFF;" id="overview-period-label">${e("module.kpi.filter.monthly","\u0634\u0647\u0631\u064A")}</div>
                                </div>
                                <div class="rounded-2xl px-4 py-3 min-w-[240px]" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); backdrop-filter: blur(10px);">
                                    <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em]" style="color: rgba(244,196,71,0.92);">
                                        <i class="fas fa-clock"></i>
                                        ${e("module.kpi.overview.timeRange","\u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0632\u0645\u0646\u064A")}
                                    </div>
                                    <div class="mt-1.5 text-sm font-bold" style="color: #FFFFFF;" id="overview-range-label" dir="ltr">-</div>
                                </div>
                            </div>
                        </div>

                        <!-- \u2501\u2501\u2501 Quick Filter Card (\u0634\u0641\u0627\u0641 \u0639\u0644\u0649 \u0627\u0644\u0640 navy) \u2501\u2501\u2501 -->
                        <div class="relative rounded-[20px] overflow-hidden" style="background: rgba(255,255,255,0.98); border: 1px solid rgba(255,255,255,0.30); box-shadow: 0 24px 50px -18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.7);">
                            <div class="absolute inset-x-0 top-0 h-[3px]" style="background: linear-gradient(90deg, #D4A017, #F4C447, #D4A017);"></div>

                            <div class="relative p-5">
                                <div class="flex items-center justify-between gap-3 mb-4">
                                    <div class="min-w-0">
                                        <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
                                            <span>${e("module.kpi.overview.quickFilterTitle","\u062A\u0635\u0641\u064A\u0629 \u0648\u0628\u062D\u062B \u0633\u0631\u064A\u0639")}</span>
                                        </h3>
                                        <p class="text-xs text-slate-500 mt-1 leading-relaxed">${e("module.kpi.overview.quickFilterHint","\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0641\u062A\u0631\u0629 \u0623\u0648 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639.")}</p>
                                    </div>
                                    <div class="h-11 w-11 rounded-2xl flex items-center justify-center shrink-0" style="background: linear-gradient(135deg, #14223D, #1E3A5F); color: #F4C447; box-shadow: 0 8px 20px rgba(10,22,40,0.40);">
                                        <i class="fas fa-sliders"></i>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-3.5">
                                    <div>
                                        <label class="block text-xs font-bold text-slate-700 mb-1.5">${e("module.kpi.filter.period","\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629")}</label>
                                        <select id="kpi-filter-period" class="form-input">
                                            <option value="monthly">${e("module.kpi.filter.monthly","\u0634\u0647\u0631\u064A")}</option>
                                            <option value="quarterly">${e("module.kpi.filter.quarterly","\u0631\u0628\u0639 \u0633\u0646\u0648\u064A")}</option>
                                            <option value="yearly">${e("module.kpi.filter.yearly","\u0633\u0646\u0648\u064A")}</option>
                                            <option value="custom">${e("module.kpi.filter.custom","\u0645\u062E\u0635\u0635")}</option>
                                        </select>
                                    </div>
                                    <div id="kpi-custom-dates" class="hidden">
                                        <label class="block text-xs font-bold text-slate-700 mb-1.5">${e("module.kpi.filter.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")}</label>
                                        <input type="date" id="kpi-filter-start-date" class="form-input">
                                    </div>
                                    <div id="kpi-custom-dates-end" class="hidden">
                                        <label class="block text-xs font-bold text-slate-700 mb-1.5">${e("module.kpi.filter.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")}</label>
                                        <input type="date" id="kpi-filter-end-date" class="form-input">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-slate-700 mb-1.5">${e("module.kpi.filter.department","\u0627\u0644\u0625\u062F\u0627\u0631\u0629")}</label>
                                        <select id="kpi-filter-department" class="form-input">
                                            <option value="">${e("module.kpi.filter.allDepartments","\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A")}</option>
                                            ${this.getDepartmentOptions()}
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-slate-700 mb-1.5">${e("module.kpi.filter.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</label>
                                        <select id="kpi-filter-location" class="form-input">
                                            <option value="">${e("module.kpi.filter.allLocations","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}</option>
                                            ${this.getLocationOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div class="mt-4 flex gap-2 flex-wrap">
                                    <button id="kpi-apply-filters" class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5" style="background: linear-gradient(135deg, #14223D, #1E3A5F); box-shadow: 0 8px 20px rgba(10,22,40,0.35); border: 1px solid rgba(212,160,23,0.30);">
                                        <i class="fas fa-search" style="color: #F4C447;"></i>
                                        <span>${e("module.kpi.filter.apply","\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062A\u0635\u0641\u064A\u0629")}</span>
                                    </button>
                                    <button id="kpi-reset-filters" class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300">
                                        <i class="fas fa-redo"></i>
                                        <span>${e("module.kpi.filter.reset","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- \u2501\u2501\u2501 Bottom: Light Section \u0645\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u2501\u2501\u2501 -->
            <div class="relative" style="background: linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%);">
                <!-- \u062E\u0637 \u0630\u0647\u0628\u064A \u0631\u0641\u064A\u0639 \u0643\u0641\u0627\u0635\u0644 -->
                <div class="absolute inset-x-0 top-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(212,160,23,0.35) 50%, transparent);"></div>

                <div class="relative p-6 lg:p-8 pt-6">

                <!-- \u2501\u2501\u2501 Quick Stats (4 cards) \u2501\u2501\u2501 -->
                <div class="mt-7">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="h-8 w-1 rounded-full" style="background: linear-gradient(180deg, #14223D, #D4A017);"></div>
                        <h3 class="text-sm font-black uppercase tracking-[0.18em] text-slate-700">${e("module.kpi.overview.quickStats","\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629")}</h3>
                        <div class="flex-1 h-px bg-gradient-to-l from-transparent via-slate-200 to-transparent"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        ${this.renderOverviewMiniStat("overview-incidents-total",e("module.kpi.overview.mini.incidents","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A"),"fa-triangle-exclamation","rose",e("module.kpi.overview.unit.record","\u0633\u062C\u0644"))}
                        ${this.renderOverviewMiniStat("overview-observations-total",e("module.kpi.overview.mini.observations","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629"),"fa-binoculars","amber",e("module.kpi.overview.unit.case","\u062D\u0627\u0644\u0629"))}
                        ${this.renderOverviewMiniStat("overview-training-total",e("module.kpi.overview.mini.training","\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0646\u0641\u0630\u0629"),"fa-graduation-cap","emerald",e("module.kpi.overview.unit.program","\u0628\u0631\u0646\u0627\u0645\u062C"))}
                        ${this.renderOverviewMiniStat("overview-ptw-total",e("module.kpi.overview.mini.ptw","\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0646\u0634\u0637\u0629"),"fa-id-badge","indigo",e("module.kpi.overview.unit.permitU","\u062A\u0635\u0631\u064A\u062D"))}
                    </div>
                </div>

                <!-- \u2501\u2501\u2501 Workforce KPIs Section (Executive \u2014 same hero pattern) \u2501\u2501\u2501 -->
                <div class="mt-7 relative overflow-hidden rounded-[24px]" style="border: 1px solid rgba(20,34,61,0.16); box-shadow: 0 28px 56px -20px rgba(10,22,40,0.22), 0 8px 20px -8px rgba(10,22,40,0.06);">
                    <!-- Header: Navy banner (matches the main hero) -->
                    <div class="relative overflow-hidden" style="background: linear-gradient(135deg, #0A1628 0%, #14223D 40%, #1E3A5F 75%, #2A4A7B 100%);">
                        <!-- Gold dot pattern overlay -->
                        <div class="absolute inset-0 opacity-[0.10] pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0); background-size: 24px 24px;"></div>
                        <!-- Glow accents -->
                        <div class="absolute -top-16 -end-16 h-48 w-48 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(212,160,23,0.22) 0%, transparent 65%);"></div>
                        <div class="absolute -bottom-20 -start-16 h-56 w-56 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(75,124,176,0.18) 0%, transparent 70%);"></div>
                        <!-- Gold top accent line -->
                        <div class="absolute inset-x-0 top-0 h-[3px]" style="background: linear-gradient(90deg, transparent, #D4A017 30%, #F4C447 50%, #D4A017 70%, transparent);"></div>

                        <div class="relative p-5 lg:p-6">
                            <div class="flex items-start justify-between gap-4 flex-wrap">
                                <div class="min-w-0 flex-1">
                                    <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] border" style="background: rgba(212,160,23,0.14); border-color: rgba(212,160,23,0.42); color: #F4C447; backdrop-filter: blur(8px);">
                                        <i class="fas fa-people-group"></i>
                                        ${e("module.kpi.overview.workforce.eyebrow","\u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629")}
                                    </div>
                                    <h3 class="mt-3 text-xl xl:text-2xl font-black leading-tight tracking-tight" style="color: #FFFFFF; text-shadow: 0 2px 4px rgba(0,0,0,0.18);">${e("module.kpi.overview.workforce.title","\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644")}</h3>
                                    <p class="mt-1.5 text-xs leading-relaxed max-w-2xl" style="color: rgba(255,255,255,0.78);">${e("module.kpi.overview.workforce.intro","\u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0647\u0630\u0647 \u0627\u0644\u0642\u064A\u0645 \u0643\u0623\u0633\u0627\u0633 \u0644\u062D\u0633\u0627\u0628 TRIR \u0648 LTIFR \u2014 \u062A\u0634\u0645\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u062F\u0627\u0626\u0645\u064A\u0646 \u0648\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0624\u0642\u062A\u0629 \u0645\u0639\u0627\u064B.")}</p>
                                </div>
                                <div class="inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-[11px] font-bold" style="background: rgba(255,255,255,0.10); border: 1px solid rgba(212,160,23,0.42); color: #F4C447; backdrop-filter: blur(10px); box-shadow: 0 6px 18px rgba(0,0,0,0.20);" dir="ltr">
                                    <i class="fas fa-calculator"></i>
                                    <span>${e("module.kpi.overview.workforce.formula","count \xD7 \u0623\u0634\u0647\u0631 \xD7 8 \xD7 22")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Body: clean light background -->
                    <div class="relative p-5 lg:p-6" style="background: linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%);">
                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            ${this.renderWorkforceStatCard("overview-permanent-employees",e("module.kpi.overview.workforce.permanentCount","\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u0645\u062B\u0628\u062A\u0648\u0646"),"fa-user-tie","teal",e("module.kpi.overview.unit.employee","\u0645\u0648\u0638\u0641"),e("module.kpi.overview.workforce.permanentCount.sub","\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 \u0641\u0639\u0644\u064A\u0627\u064B \u062E\u0644\u0627\u0644 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629"))}
                            ${this.renderWorkforceStatCard("overview-temporary-workforce",e("module.kpi.overview.workforce.temporaryCount","\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0624\u0642\u062A\u0629"),"fa-helmet-safety","amber",e("module.kpi.overview.unit.worker","\u0639\u0627\u0645\u0644"),e("module.kpi.overview.workforce.temporaryCount.sub","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0624\u0642\u062A\u0629 \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0634\u0647\u0631\u064A\u0629"))}
                            ${this.renderWorkforceStatCard("overview-permanent-hours",e("module.kpi.overview.workforce.permanentHours","\u0633\u0627\u0639\u0627\u062A \u0639\u0645\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),"fa-business-time","emerald",e("module.kpi.overview.unit.hour","\u0633\u0627\u0639\u0629"),e("module.kpi.overview.workforce.permanentHours.sub","\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u062F\u0627\u0626\u0645\u064A\u0646 (8 \xD7 22 \xD7 \u0623\u0634\u0647\u0631)"))}
                            ${this.renderWorkforceStatCard("overview-temporary-hours",e("module.kpi.overview.workforce.temporaryHours","\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0624\u0642\u062A\u0629"),"fa-clock-rotate-left","orange",e("module.kpi.overview.unit.hour","\u0633\u0627\u0639\u0629"),e("module.kpi.overview.workforce.temporaryHours.sub","\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0624\u0642\u062A\u0629 \u0639\u0628\u0631 \u0623\u0634\u0647\u0631 \u0627\u0644\u0641\u062A\u0631\u0629"))}
                            ${this.renderWorkforceStatCard("overview-combined-hours",e("module.kpi.overview.workforce.combinedHours","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A (\u0645\u0648\u0638\u0641\u0648\u0646 + \u0645\u0648\u0642\u062A\u0648\u0646)"),"fa-layer-group","indigo",e("module.kpi.overview.unit.hour","\u0633\u0627\u0639\u0629"),e("module.kpi.overview.workforce.combinedHours.sub","\u0627\u0644\u0623\u0633\u0627\u0633 \u0627\u0644\u0645\u064F\u0633\u062A\u062E\u062F\u064E\u0645 \u0641\u064A \u0645\u0639\u0627\u062F\u0644\u0629 TRIR \u0648 LTIFR"))}
                            ${this.renderWorkforceStatCard("overview-combined-man-days",e("module.kpi.overview.workforce.combinedManDays","\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0639\u0645\u0644"),"fa-calendar-day","emerald",e("module.kpi.overview.unit.day","\u064A\u0648\u0645"),e("module.kpi.overview.workforce.combinedManDays.sub","\u062A\u0631\u0627\u0643\u0645\u064A YTD \u2014 \u0645\u0637\u0627\u0628\u0642 \u0644\u0643\u0627\u0631\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 (\u0633\u0627\u0639\u0627\u062A \xF7 \u0633\u0627\u0639\u0627\u062A/\u064A\u0648\u0645)"))}
                            <!-- \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0631\u0627\u062C\u0639 \u2014 Premium reference card -->
                            <div class="relative overflow-hidden rounded-[24px] p-5 flex flex-col justify-center" style="background: linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,58,138,0.94)); box-shadow: 0 12px 32px rgba(15,23,42,0.18);">
                                <div class="absolute -top-8 -end-8 h-32 w-32 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(15,118,110,0.25) 0%, transparent 70%);"></div>
                                <div class="relative">
                                    <div class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-teal-300">
                                        <i class="fas fa-book-open-reader"></i>
                                        ${e("module.kpi.overview.workforce.refLabel","\u0645\u0631\u0627\u062C\u0639 \u0633\u0631\u064A\u0639\u0629")}
                                    </div>
                                    <ul class="mt-3 space-y-2 text-xs text-slate-200 leading-relaxed">
                                        <li class="flex items-start gap-2">
                                            <i class="fas fa-check-circle text-teal-400 mt-0.5 shrink-0"></i>
                                            <span>${e("module.kpi.overview.workforce.ref1","\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062F\u0627\u0626\u0645: \u062D\u0633\u0628 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646/\u0627\u0644\u0627\u0633\u062A\u0642\u0627\u0644\u0629 \u0648\u062D\u0627\u0644\u0629 \u0627\u0644\u0646\u0634\u0627\u0637")}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <i class="fas fa-check-circle text-teal-400 mt-0.5 shrink-0"></i>
                                            <span>${e("module.kpi.overview.workforce.ref2","\u0627\u0644\u0645\u0624\u0642\u062A\u0648\u0646: \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u0627\u0644\u0634\u0647\u0631\u064A")}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <i class="fas fa-check-circle text-teal-400 mt-0.5 shrink-0"></i>
                                            <span>${e("module.kpi.overview.workforce.ref3","\u0627\u0644\u0633\u0627\u0639\u0627\u062A: 8 \u0633\u0627\u0639\u0627\u062A \xD7 22 \u064A\u0648\u0645 \u0639\u0645\u0644 \u0644\u0643\u0644 person-month")}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- \u2501\u2501\u2501 Quick Jump Navigation \u2501\u2501\u2501 -->
                <div class="mt-7">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="h-8 w-1 rounded-full" style="background: linear-gradient(180deg, #14223D, #D4A017);"></div>
                        <h3 class="text-sm font-black uppercase tracking-[0.18em] text-slate-700">${e("module.kpi.overview.quickJump","\u062A\u0646\u0642\u0651\u0644 \u0633\u0631\u064A\u0639")}</h3>
                        <div class="flex-1 h-px bg-gradient-to-l from-transparent via-slate-200 to-transparent"></div>
                    </div>
                    <div class="flex flex-wrap gap-2.5">
                        <button class="spk-jump-btn group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 backdrop-blur px-4 py-2 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-emerald-300 hover:text-emerald-700 hover:-translate-y-0.5 hover:shadow-md" data-kpi-jump="leading-kpis-section">
                            <i class="fas fa-arrow-trend-up text-emerald-600 transition-transform group-hover:scale-110"></i>
                            <span>${e("module.kpi.leading.title","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0628\u0627\u0642\u064A\u0629")}</span>
                        </button>
                        <button class="spk-jump-btn group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 backdrop-blur px-4 py-2 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-rose-300 hover:text-rose-700 hover:-translate-y-0.5 hover:shadow-md" data-kpi-jump="lagging-kpis-section">
                            <i class="fas fa-arrow-trend-down text-rose-600 transition-transform group-hover:scale-110"></i>
                            <span>${e("module.kpi.lagging.title","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0631\u0627\u062C\u0639\u064A\u0629")}</span>
                        </button>
                        <button class="spk-jump-btn group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 backdrop-blur px-4 py-2 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-indigo-300 hover:text-indigo-700 hover:-translate-y-0.5 hover:shadow-md" data-kpi-jump="charts-kpis-section">
                            <i class="fas fa-chart-line text-indigo-600 transition-transform group-hover:scale-110"></i>
                            <span>${e("module.kpi.overview.jump.charts","\u0627\u0644\u0631\u0633\u0648\u0645 \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A")}</span>
                        </button>
                        <button class="spk-jump-btn group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 backdrop-blur px-4 py-2 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-amber-300 hover:text-amber-700 hover:-translate-y-0.5 hover:shadow-md" data-kpi-jump="comparison-kpis-section">
                            <i class="fas fa-table-cells-large text-amber-600 transition-transform group-hover:scale-110"></i>
                            <span>${e("module.kpi.overview.jump.comparison","\u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0627\u062A \u0648\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u0629")}</span>
                        </button>
                    </div>
                </div>
                </div><!-- /relative p-6 pt-6 -->
            </div><!-- /Light Bottom Section -->
        </div><!-- /spk-hero-card -->

        <!-- \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557 -->
        <!-- \u2551 \u{1F3A8} Leading + Lagging Indicators \u2014 Executive redesign          \u2551 -->
        <!-- \u2551 Dark prestige headers + light bodies + gold accents          \u2551 -->
        <!-- \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D -->
        <div id="leading-kpis-section" class="mt-7 grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
            <!-- \u2501\u2501\u2501 Leading Indicators (Deep Emerald executive) \u2501\u2501\u2501 -->
            <div class="relative overflow-hidden rounded-[24px]" style="border: 1px solid rgba(6,78,59,0.16); box-shadow: 0 28px 56px -20px rgba(6,78,59,0.28), 0 8px 20px -8px rgba(10,22,40,0.06);">
                <!-- Header: Deep Emerald banner -->
                <div class="relative overflow-hidden" style="background: linear-gradient(135deg, #022C22 0%, #064E3B 40%, #065F46 75%, #047857 100%);">
                    <!-- Gold dot pattern overlay -->
                    <div class="absolute inset-0 opacity-[0.08] pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0); background-size: 24px 24px;"></div>
                    <!-- Glow accents -->
                    <div class="absolute -top-16 -end-16 h-48 w-48 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(212,160,23,0.20) 0%, transparent 65%);"></div>
                    <div class="absolute -bottom-20 -start-16 h-56 w-56 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 65%);"></div>
                    <!-- Gold top accent line -->
                    <div class="absolute inset-x-0 top-0 h-[3px]" style="background: linear-gradient(90deg, transparent, #D4A017 30%, #F4C447 50%, #D4A017 70%, transparent);"></div>

                    <div class="relative p-5 lg:p-6">
                        <div class="flex items-start justify-between gap-4 flex-wrap">
                            <div class="min-w-0 flex-1">
                                <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] border" style="background: rgba(212,160,23,0.14); border-color: rgba(212,160,23,0.42); color: #F4C447; backdrop-filter: blur(8px);">
                                    <i class="fas fa-arrow-trend-up"></i>
                                    ${e("module.kpi.leading.badge","\u0627\u0633\u062A\u0628\u0627\u0642\u064A")}
                                </div>
                                <h2 class="mt-3 text-xl xl:text-2xl font-black leading-tight tracking-tight" style="color: #FFFFFF; text-shadow: 0 2px 4px rgba(0,0,0,0.18);">${e("module.kpi.leading.title","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0628\u0627\u0642\u064A\u0629")}</h2>
                                <p class="mt-1.5 text-xs leading-relaxed max-w-xl" style="color: rgba(255,255,255,0.78);">${e("module.kpi.leading.subtitle","\u0645\u0624\u0634\u0631\u0627\u062A \u062A\u0642\u064A\u0633 \u0623\u062F\u0627\u0621 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0648\u0627\u0644\u062A\u062D\u0643\u0645 \u0642\u0628\u0644 \u0648\u0642\u0648\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B")}</p>
                            </div>
                            <div class="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0" style="background: rgba(255,255,255,0.10); border: 1px solid rgba(212,160,23,0.40); color: #F4C447; backdrop-filter: blur(10px); box-shadow: 0 10px 24px rgba(0,0,0,0.28);">
                                <i class="fas fa-shield-virus text-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Body: clean white -->
                <div class="relative p-5 lg:p-6" style="background: linear-gradient(180deg, #FAFEFB 0%, #FFFFFF 100%);">
                    <div id="leading-indicators-container" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                        ${this.renderLeadingIndicators()}
                    </div>
                </div>
            </div>

            <!-- \u2501\u2501\u2501 Lagging Indicators (Deep Crimson executive) \u2501\u2501\u2501 -->
            <div id="lagging-kpis-section" class="relative overflow-hidden rounded-[24px]" style="border: 1px solid rgba(76,5,25,0.16); box-shadow: 0 28px 56px -20px rgba(76,5,25,0.28), 0 8px 20px -8px rgba(10,22,40,0.06);">
                <!-- Header: Deep Crimson banner -->
                <div class="relative overflow-hidden" style="background: linear-gradient(135deg, #2C0410 0%, #4C0519 40%, #6B0F1F 75%, #881337 100%);">
                    <!-- Gold dot pattern overlay -->
                    <div class="absolute inset-0 opacity-[0.08] pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0); background-size: 24px 24px;"></div>
                    <!-- Glow accents -->
                    <div class="absolute -top-16 -end-16 h-48 w-48 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(212,160,23,0.18) 0%, transparent 65%);"></div>
                    <div class="absolute -bottom-20 -start-16 h-56 w-56 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(190,18,60,0.22) 0%, transparent 65%);"></div>
                    <!-- Gold top accent line -->
                    <div class="absolute inset-x-0 top-0 h-[3px]" style="background: linear-gradient(90deg, transparent, #D4A017 30%, #F4C447 50%, #D4A017 70%, transparent);"></div>

                    <div class="relative p-5 lg:p-6">
                        <div class="flex items-start justify-between gap-4 flex-wrap">
                            <div class="min-w-0 flex-1">
                                <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] border" style="background: rgba(212,160,23,0.14); border-color: rgba(212,160,23,0.42); color: #F4C447; backdrop-filter: blur(8px);">
                                    <i class="fas fa-arrow-trend-down"></i>
                                    ${e("module.kpi.lagging.badge","\u062A\u0631\u0627\u062C\u0639\u064A")}
                                </div>
                                <h2 class="mt-3 text-xl xl:text-2xl font-black leading-tight tracking-tight" style="color: #FFFFFF; text-shadow: 0 2px 4px rgba(0,0,0,0.20);">${e("module.kpi.lagging.title","\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0631\u0627\u062C\u0639\u064A\u0629")}</h2>
                                <p class="mt-1.5 text-xs leading-relaxed max-w-xl" style="color: rgba(255,255,255,0.78);">${e("module.kpi.lagging.subtitle","\u0645\u0624\u0634\u0631\u0627\u062A \u062A\u0642\u064A\u0633 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0644\u0645\u0627 \u062D\u062F\u062B")}</p>
                            </div>
                            <div class="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0" style="background: rgba(255,255,255,0.10); border: 1px solid rgba(212,160,23,0.40); color: #F4C447; backdrop-filter: blur(10px); box-shadow: 0 10px 24px rgba(0,0,0,0.28);">
                                <i class="fas fa-triangle-exclamation text-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Body: clean white -->
                <div class="relative p-5 lg:p-6" style="background: linear-gradient(180deg, #FEFAFB 0%, #FFFFFF 100%);">
                    <div id="lagging-indicators-container" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4">
                        ${this.renderLaggingIndicators()}
                    </div>
                </div>
            </div>
        </div>

        <div id="charts-kpis-section" class="mt-6">
            <div class="flex items-center justify-between gap-4 flex-wrap mb-4">
                <div>
                    <h2 class="text-xl font-black text-slate-900">
                        <i class="fas fa-chart-line me-2 text-sky-600"></i>
                        ${e("module.kpi.chart.title","\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A")}
                    </h2>
                    <p class="text-sm text-slate-500 mt-1"></p>
                </div>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                ${this.renderOverviewChartCard("incidents-chart-container",e("module.kpi.chart.incidents","\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629"),"fa-chart-column","rose",e("module.kpi.overview.chartDesc.incidents","\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u062E\u0644\u0627\u0644 \u0627\u0644\u0641\u062A\u0631\u0629."))}
                ${this.renderOverviewChartCard("department-chart-container",e("module.kpi.chart.deptDistribution","\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),"fa-chart-pie","blue",e("module.kpi.overview.chartDesc.dept","\u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0623\u0639\u0644\u0649 \u062A\u0639\u0631\u0636\u0627\u064B \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u0624\u0631 \u0627\u0644\u0645\u062E\u0627\u0637\u0631."))}
                ${this.renderOverviewChartCard("trir-chart-container",e("module.kpi.chart.ltifr","\u0645\u0639\u062F\u0644 LTIFR \u0639\u0628\u0631 \u0627\u0644\u0632\u0645\u0646"),"fa-chart-line","violet",e("module.kpi.overview.chartDesc.ltifr","\u062A\u063A\u064A\u0651\u0631 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0639\u0628\u0631 \u0627\u0644\u0641\u062A\u0631\u0627\u062A."))}
                ${this.renderOverviewChartCard("training-chart-container",e("module.kpi.chart.training","\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628"),"fa-chart-area","emerald",e("module.kpi.overview.chartDesc.training","\u062A\u0642\u062F\u0645 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645."))}
            </div>
        </div>

        <div id="comparison-kpis-section" class="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6 mt-6">
            <div class="content-card overflow-hidden">
                <div class="card-header" style="background: linear-gradient(135deg, rgba(15,23,42,0.04), rgba(59,130,246,0.06));">
                    <h2 class="card-title text-slate-900">
                        <i class="fas fa-balance-scale me-2 text-sky-700"></i>
                        ${e("module.kpi.chart.deptComparison","\u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u064A\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A / \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}
                    </h2>
                    <p class="text-sm text-slate-500 mt-2">${e("module.kpi.overview.comparisonSub","\u0645\u0642\u0627\u0631\u0646\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0644\u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u0641\u062C\u0648\u0627\u062A \u0648\u0641\u0631\u0635 \u0627\u0644\u062A\u062D\u0633\u064A\u0646.")}</p>
                </div>
                <div class="card-body">
                    <div id="department-comparison-container" style="height: 400px;"></div>
                </div>
            </div>

            <div class="content-card overflow-hidden">
                <div class="card-header" style="background: linear-gradient(135deg, rgba(15,23,42,0.04), rgba(244,63,94,0.06));">
                    <h2 class="card-title text-slate-900">
                        <i class="fas fa-th me-2 text-rose-600"></i>
                        ${e("module.kpi.chart.heatmapTitle","\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u0629")}
                    </h2>
                    <p class="text-sm text-slate-500 mt-2">${e("module.kpi.overview.heatmapSub","\u0639\u0631\u0636 \u0628\u0635\u0631\u064A \u0644\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0643\u062B\u0627\u0641\u0629 \u0641\u064A \u0627\u0644\u0623\u062F\u0627\u0621 \u0648\u0627\u0644\u0645\u062E\u0627\u0637\u0631.")}</p>
                </div>
                <div class="card-body">
                    <div id="heatmap-container"></div>
                </div>
            </div>
        </div>
    `},SafetyPerformanceKPIs.updateOverviewQuickStats=function(){const{start:e,end:t}=this.getDateRange(),a=this.getFilteredData(e,t),r=(g,h)=>this._t(g,h),s={monthly:r("module.kpi.filter.monthly","\u0634\u0647\u0631\u064A"),quarterly:r("module.kpi.filter.quarterly","\u0631\u0628\u0639 \u0633\u0646\u0648\u064A"),yearly:r("module.kpi.filter.yearly","\u0633\u0646\u0648\u064A"),custom:r("module.kpi.filter.custom","\u0645\u062E\u0635\u0635")},i=(a.incidents||[]).length+(a.medicalInjuries||[]).length,o=(a.nearmiss||[]).length+(a.dailyObservations||[]).length,n=(a.training||[]).length,c=(a.ptw||[]).length,l=(g,h)=>{const m=document.getElementById(g);m&&(m.textContent=h)},d=window.AppI18n&&window.AppI18n.getCurrentLang&&window.AppI18n.getCurrentLang()==="en"?"en-US":"ar-SA",u=`${e.toLocaleDateString(d)} - ${t.toLocaleDateString(d)}`;l("overview-period-label",s[this.filters.period]||s.monthly),l("overview-range-label",u),l("overview-incidents-total",i.toLocaleString(d)),l("overview-observations-total",o.toLocaleString(d)),l("overview-training-total",n.toLocaleString(d)),l("overview-ptw-total",c.toLocaleString(d));try{const g=this.calculatePermanentEmployeesCount(),h=this.calculateTemporaryWorkforceCount(),m=this.calculatePermanentEmployeesHours(),p=this.calculateTemporaryWorkforceHours(),f=this.calculateCombinedWorkforceHours(),b=x=>Math.round(Number(x)||0).toLocaleString(d);if(l("overview-permanent-employees",b(g)),l("overview-temporary-workforce",b(h)),l("overview-permanent-hours",b(m)),l("overview-temporary-hours",b(p)),l("overview-combined-hours",b(f)),typeof HseMetrics<"u"&&HseMetrics.getDashboardSnapshot){const k=HseMetrics.getDashboardSnapshot(AppState.appData||{}).totals?.manDays??0;l("overview-combined-man-days",b(k))}}catch(g){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("Workforce overview update failed:",g)}};const __originalSafetyPerformanceKPIsUpdateAllKPIs=SafetyPerformanceKPIs.updateAllKPIs;SafetyPerformanceKPIs.updateAllKPIs=function(){__originalSafetyPerformanceKPIsUpdateAllKPIs.call(this),this.updateOverviewQuickStats()};const __originalSafetyPerformanceKPIsSetupEventListeners=SafetyPerformanceKPIs.setupEventListeners;SafetyPerformanceKPIs.setupEventListeners=function(){__originalSafetyPerformanceKPIsSetupEventListeners.call(this),document.querySelectorAll("[data-kpi-jump]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-kpi-jump"),a=t?document.getElementById(t):null;a&&a.scrollIntoView({behavior:"smooth",block:"start"})})})},SafetyPerformanceKPIs.getScorecardExportHeaderInfo=function(e,t=new Date){const a=String(AppState?.companySettings?.name||AppState?.companyName||"SafetyHub | ICAPP").trim(),r=String(AppState?.companySettings?.secondaryName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629").trim(),s=typeof Utils<"u"&&typeof Utils.formatDateTime=="function"?Utils.formatDateTime(t):new Date(t).toISOString().slice(0,19).replace("T"," ");return{companyName:a,secondaryName:r,reportTitle:e,exportDateTime:s}},SafetyPerformanceKPIs.buildScorecardExcelWorksheet=function(e,t,a=new Date){const r=this.getScorecardExportHeaderInfo(t,a),s=Math.max(...e.map(n=>Array.isArray(n)?n.length:0),1),i=[[r.companyName],[r.secondaryName],[r.reportTitle],[`Year: ${this.scorecardYear} | Generated: ${r.exportDateTime}`],[],...e],o=XLSX.utils.aoa_to_sheet(i);return o["!merges"]=[{s:{r:0,c:0},e:{r:0,c:s-1}},{s:{r:1,c:0},e:{r:1,c:s-1}},{s:{r:2,c:0},e:{r:2,c:s-1}},{s:{r:3,c:0},e:{r:3,c:s-1}}],o["!cols"]=[{wch:34}].concat(new Array(12).fill({wch:14}),[{wch:18}]),o},SafetyPerformanceKPIs.exportScorecardToExcel=function(){const e=this.getExportableScorecardTable();if(!e||typeof XLSX>"u"){Notification.error(this._t("module.kpi.notify.excelError","\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u0643\u0648\u0631 \u0643\u0627\u0631\u062F \u0625\u0644\u0649 Excel"));return}const t=XLSX.utils.table_to_sheet(e,{raw:!0}),a=XLSX.utils.sheet_to_json(t,{header:1,raw:!1,blankrows:!0}),r=XLSX.utils.book_new(),s=this.buildScorecardExcelWorksheet(a,`Safety Performance Scorecard ${this.scorecardYear}`,new Date);XLSX.utils.book_append_sheet(r,s,"Safety Scorecard"),XLSX.writeFile(r,`Safety_Performance_Scorecard_${this.scorecardYear}.xlsx`),Notification.success(this._t("module.kpi.notify.excelSuccess","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 Safety Performance Scorecard \u0625\u0644\u0649 Excel"))},SafetyPerformanceKPIs.exportScorecardToPDF=function(){const e=this.getExportableScorecardTable();if(!e){Notification.error(this._t("module.kpi.notify.pdfError","\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u0643\u0648\u0631 \u0643\u0627\u0631\u062F \u0625\u0644\u0649 PDF"));return}const t=`Safety Performance Scorecard ${this.scorecardYear}`,a=new Date().toISOString(),s=`
        ${document.getElementById("safety-performance-scorecard-styles")?.outerHTML||""}
        <style>
            @page {
                size: A4 landscape;
                margin: 12mm 10mm;
            }
            .report-wrapper {
                width: 100% !important;
                max-width: 100% !important;
                padding: 18px 16px !important;
            }
            .report-header {
                grid-template-columns: minmax(220px, 1.2fr) minmax(360px, 2fr) minmax(90px, 120px) !important;
                gap: 16px !important;
            }
            .report-footer,
            .footer-watermark-frame,
            .footer-bottom,
            .footer-meta-line {
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }
            .footer-meta-line {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                gap: 12px !important;
            }
            .spk-scorecard-print {
                direction: ltr;
                font-family: Arial, 'Segoe UI', Tahoma, sans-serif;
                width: 100%;
            }
            .spk-scorecard-print__meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
                margin-bottom: 18px;
                padding: 12px 16px;
                border: 1px solid #D7E3F1;
                border-radius: 12px;
                background: #F8FBFF;
                font-size: 13px;
                color: #334155;
            }
            .spk-scorecard-print__meta strong {
                color: #0F172A;
            }
            .spk-scorecard-table {
                width: 100%;
                min-width: auto;
                table-layout: fixed;
            }
            .spk-scorecard-table th:first-child,
            .spk-scorecard-table td:first-child {
                position: static;
            }
            .spk-scorecard-table th,
            .spk-scorecard-table td {
                font-size: 10px !important;
                padding: 6px 5px !important;
            }
            @media print {
                .spk-scorecard-print__meta {
                    break-inside: avoid;
                }
            }
        </style>
        <div class="spk-scorecard-print" dir="ltr" lang="en">
            <div class="spk-scorecard-print__meta">
                <div><strong>Report:</strong> Safety Performance Scorecard</div>
                <div><strong>Year:</strong> ${Utils.escapeHTML(String(this.scorecardYear))}</div>
                <div><strong>Generated:</strong> ${Utils.escapeHTML(a.slice(0,10))}</div>
            </div>
            ${e.outerHTML}
        </div>
    `,i=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(`SAFETY-SCORECARD-${this.scorecardYear}`,t,s,!1,!0,{version:"1.0",releaseDate:a,revisionDate:a,includeQRCode:!0},a,a):`<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="UTF-8"><title>${t}</title></head><body style="font-family:Arial,'Segoe UI',Tahoma,sans-serif;padding:20px;">${s}</body></html>`,o=new Blob(["\uFEFF"+i],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(o),c=window.open(n,"_blank");if(!c){URL.revokeObjectURL(n),Notification.error(SafetyPerformanceKPIs._t("module.kpi.notify.pdfBlocked","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0625\u062A\u0645\u0627\u0645 \u062A\u0635\u062F\u064A\u0631 PDF"));return}c.onload=()=>{setTimeout(()=>{c.print(),setTimeout(()=>URL.revokeObjectURL(n),1e3)},400)},Notification.success(SafetyPerformanceKPIs._t("module.kpi.notify.pdfSuccess","\u062A\u0645 \u0641\u062A\u062D \u0645\u0639\u0627\u064A\u0646\u0629 PDF \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0633\u0643\u0648\u0631 \u0643\u0627\u0631\u062F"))},(function(){"use strict";try{typeof window<"u"&&typeof SafetyPerformanceKPIs<"u"&&(window.SafetyPerformanceKPIs=SafetyPerformanceKPIs,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 SafetyPerformanceKPIs module loaded and available on window.SafetyPerformanceKPIs"))}catch{if(typeof window<"u"&&typeof SafetyPerformanceKPIs<"u")try{window.SafetyPerformanceKPIs=SafetyPerformanceKPIs}catch{}}})(),SafetyPerformanceKPIs.loadKPIAnnualPlans=async function(){try{const e=document.getElementById("kpi-annual-year-selector"),t=e?parseInt(e.value):new Date().getFullYear(),a=await GoogleIntegration.callBackend("getKPIAnnualPlans",{filters:{year:t}});if(a&&a.success)this.renderKPIAnnualPlanTable(a.data||[]);else throw new Error(a?.message||"Failed to load KPI annual plans")}catch(e){const t=document.getElementById("kpi-annual-plan-body");if(t){const a=SafetyPerformanceKPIs._t("module.kpi.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),r=SafetyPerformanceKPIs._t("module.kpi.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629");t.innerHTML=`
                <tr>
                    <td colspan="20" style="padding: 40px; text-align: center; color: #6b7280;">
                        <i class="fas fa-exclamation-triangle text-3xl mb-3 text-yellow-500"></i>
                        <p>${a}</p>
                        <p class="text-sm mt-2">${Utils.escapeHTML(e.message||"")}</p>
                        <button onclick="SafetyPerformanceKPIs.loadKPIAnnualPlans()" class="btn-primary mt-4">
                            <i class="fas fa-redo me-2"></i>
                            ${r}
                        </button>
                    </td>
                </tr>
            `}}},SafetyPerformanceKPIs.renderKPIAnnualPlanTable=function(e){const t=document.getElementById("kpi-annual-plan-body");if(!t)return;const a=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],s=!(typeof window<"u"&&typeof window.isReadOnlyRole=="function"?window.isReadOnlyRole():!1)&&(this.isAdminUser()||typeof Permissions<"u"&&Permissions.hasAccess("kpi-annual-plan"));if(!e||e.length===0){const i=s?21:20,o=this._t("module.kpi.annual.noData",'\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A - \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u0625\u0636\u0627\u0641\u0629 \u0645\u0624\u0634\u0631 \u062C\u062F\u064A\u062F" \u0644\u0644\u0628\u062F\u0621');t.innerHTML=`
            <tr>
                <td colspan="${i}" style="padding: 40px; text-align: center; color: #6b7280;">
                    <i class="fas fa-inbox text-3xl mb-3"></i>
                    <p>${o}</p>
                </td>
            </tr>
        `;return}t.innerHTML=e.map(i=>{const o=a.reduce((l,d)=>l+(parseFloat(i[d])||0),0);return`
            <tr class="hover:bg-blue-50 transition-colors">
                <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: center;">${(i.indicatorType||"Leading")==="Leading"?'<span class="badge bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">\u{1F4C8} Leading</span>':'<span class="badge bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">\u{1F4C9} Lagging</span>'}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${Utils.escapeHTML(i.objective||"-")}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${Utils.escapeHTML(i.kpi||"-")}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: center;">${Utils.escapeHTML(i.target||"-")}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: center;">${Utils.escapeHTML(i.goal||"-")}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb; max-width: 250px; overflow-wrap: break-word;">${Utils.escapeHTML(i.improvementPlan||"-")}</td>
                ${a.map(l=>`<td style="padding: 8px; border: 1px solid #e5e7eb; text-align: center;">${i[l]||"0"}</td>`).join("")}
                <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: bold; background: #fef3c7;">${o}</td>
                ${s?`
                <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: center;">
                    <button onclick="SafetyPerformanceKPIs.editKPIAnnualPlan('${i.id}')" class="text-blue-600 hover:text-blue-800 mx-1" title="\u062A\u0639\u062F\u064A\u0644">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="SafetyPerformanceKPIs.deleteKPIAnnualPlan('${i.id}')" class="text-red-600 hover:text-red-800 mx-1" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                `:""}
            </tr>
        `}).join("")},SafetyPerformanceKPIs.addKPIAnnualPlan=function(){const e=(s,i)=>this._t(s,i),t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a=new Date().getFullYear(),r=document.getElementById("spk-annual-plan-panel");r&&(r.innerHTML=`
        <div class="content-card">
            <div class="card-header bg-gradient-to-r from-blue-50 to-indigo-50 border-b-4 border-blue-600">
                <div class="flex items-center justify-between">
                    <h2 class="card-title text-blue-800">
                        <i class="fas fa-plus-circle me-2"></i>
                        ${e("module.kpi.annual.form.title.add","\u0625\u0636\u0627\u0641\u0629 \u0645\u0624\u0634\u0631 KPI \u062C\u062F\u064A\u062F")} - ${a}
                    </h2>
                    <button onclick="SafetyPerformanceKPIs.cancelAddKPIAnnualPlan()" class="btn-secondary">
                        <i class="fas fa-times me-2"></i>
                        ${e("module.kpi.annual.form.cancel","\u0625\u0644\u063A\u0627\u0621")}
                    </button>
                </div>
            </div>
            <div class="card-body">
                <form id="kpi-annual-plan-form" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.annual.form.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u0624\u0634\u0631")} *</label>
                            <select id="kpi-plan-indicator-type" class="form-input" required>
                                <option value="Leading">\u{1F4C8} Leading - ${e("module.kpi.annual.form.leading","\u0627\u0633\u062A\u0628\u0627\u0642\u064A")}</option>
                                <option value="Lagging">\u{1F4C9} Lagging - ${e("module.kpi.annual.form.lagging","\u062A\u0631\u0627\u062C\u0639\u064A")}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.annual.form.objective","\u0627\u0644\u0647\u062F\u0641 \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A")} *</label>
                            <input type="text" id="kpi-plan-objective" class="form-input" placeholder="e.g., HSE Trainings" required>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.annual.form.kpi","\u0627\u0644\u0645\u0624\u0634\u0631 (KPI)")} *</label>
                            <input type="text" id="kpi-plan-kpi" class="form-input" placeholder="e.g., Number of unique employees attended" required>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.annual.form.target","\u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641")}</label>
                            <input type="text" id="kpi-plan-target" class="form-input" placeholder="e.g., Training program for employees">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.annual.form.goal","\u0627\u0644\u063A\u0627\u064A\u0629")}</label>
                            <input type="text" id="kpi-plan-goal" class="form-input" placeholder="e.g., 300">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.kpi.annual.form.improvement","\u062E\u0637\u0629 \u0627\u0644\u062A\u062D\u0633\u064A\u0646")}</label>
                        <textarea id="kpi-plan-improvement" class="form-input" rows="3" placeholder="Describe the improvement plan..."></textarea>
                    </div>
                    
                    <h3 class="text-lg font-bold mt-6 mb-4 border-t pt-4">${e("module.kpi.annual.form.monthlyValues","\u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0634\u0647\u0631\u064A\u0629")} - ${a}</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        ${t.map(s=>`
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${s}</label>
                                <input type="number" id="kpi-plan-${s.toLowerCase()}" class="form-input" value="0" min="0">
                            </div>
                        `).join("")}
                    </div>
                    
                    <div class="flex gap-3 mt-6 pt-4 border-t">
                        <button type="button" id="kpi-save-btn" onclick="SafetyPerformanceKPIs.saveKPIAnnualPlan()" class="btn-primary">
                            <i class="fas fa-save me-2"></i>
                            <span id="kpi-save-text">${e("module.kpi.annual.form.save","\u062D\u0641\u0638 \u0627\u0644\u0645\u0624\u0634\u0631")}</span>
                        </button>
                        <button type="button" onclick="SafetyPerformanceKPIs.cancelAddKPIAnnualPlan()" class="btn-secondary">
                            <i class="fas fa-times me-2"></i>
                            ${e("module.kpi.annual.form.cancel","\u0625\u0644\u063A\u0627\u0621")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `,window.AppI18n?.applyModuleI18n?window.AppI18n.applyModuleI18n(r):window.I18n?.applyModuleI18n&&window.I18n.applyModuleI18n(r),r.scrollIntoView({behavior:"smooth",block:"start"}))},SafetyPerformanceKPIs.cancelAddKPIAnnualPlan=function(){this.activeTab="annual-plan";const e=document.getElementById("spk-annual-plan-panel");e&&(e.innerHTML=this.renderAnnualPlanTab(),window.AppI18n?.applyModuleI18n?window.AppI18n.applyModuleI18n(e):window.I18n?.applyModuleI18n&&window.I18n.applyModuleI18n(e)),setTimeout(()=>this.loadKPIAnnualPlans(),50)},SafetyPerformanceKPIs.saveKPIAnnualPlan=async function(e=null){try{const t=document.getElementById("kpi-save-btn"),a=document.getElementById("kpi-save-text");t&&(t.disabled=!0,t.classList.add("opacity-50","cursor-not-allowed")),a&&(a.textContent=this._t("module.kpi.annual.form.saving","\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..."));const r={id:e,year:new Date().getFullYear(),indicatorType:document.getElementById("kpi-plan-indicator-type")?.value||"Leading",objective:document.getElementById("kpi-plan-objective")?.value||"",kpi:document.getElementById("kpi-plan-kpi")?.value||"",target:document.getElementById("kpi-plan-target")?.value||"",goal:document.getElementById("kpi-plan-goal")?.value||"",improvementPlan:document.getElementById("kpi-plan-improvement")?.value||"",jan:document.getElementById("kpi-plan-jan")?.value||"0",feb:document.getElementById("kpi-plan-feb")?.value||"0",mar:document.getElementById("kpi-plan-mar")?.value||"0",apr:document.getElementById("kpi-plan-apr")?.value||"0",may:document.getElementById("kpi-plan-may")?.value||"0",jun:document.getElementById("kpi-plan-jun")?.value||"0",jul:document.getElementById("kpi-plan-jul")?.value||"0",aug:document.getElementById("kpi-plan-aug")?.value||"0",sep:document.getElementById("kpi-plan-sep")?.value||"0",oct:document.getElementById("kpi-plan-oct")?.value||"0",nov:document.getElementById("kpi-plan-nov")?.value||"0",dec:document.getElementById("kpi-plan-dec")?.value||"0"},s=await GoogleIntegration.callBackend("saveKPIAnnualPlan",r);if(s&&s.success){Notification.success(e?this._t("module.kpi.notify.updateSuccess","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0624\u0634\u0631 \u0628\u0646\u062C\u0627\u062D"):this._t("module.kpi.notify.saveSuccess","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0624\u0634\u0631 \u0628\u0646\u062C\u0627\u062D")),this.activeTab="annual-plan";const i=document.getElementById("spk-annual-plan-panel");i&&(i.innerHTML=this.renderAnnualPlanTab(),window.AppI18n?.applyModuleI18n?window.AppI18n.applyModuleI18n(i):window.I18n?.applyModuleI18n&&window.I18n.applyModuleI18n(i)),setTimeout(()=>this.loadKPIAnnualPlans(),50)}else throw new Error(s?.message||"Failed to save")}catch(t){Notification.error(this._t("module.kpi.notify.saveError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638: ")+t.message)}finally{const t=document.getElementById("kpi-save-btn"),a=document.getElementById("kpi-save-text");t&&(t.disabled=!1,t.classList.remove("opacity-50","cursor-not-allowed")),a&&(a.textContent=this._t("module.kpi.annual.form.save","\u062D\u0641\u0638 \u0627\u0644\u0645\u0624\u0634\u0631"))}},SafetyPerformanceKPIs.editKPIAnnualPlan=async function(e){try{const t=new Date().getFullYear(),a=await GoogleIntegration.callBackend("getKPIAnnualPlans",{filters:{year:t}});if(a&&a.success){const r=(a.data||[]).find(s=>s.id===e);if(!r){Notification.error(this._t("module.kpi.notify.notFound","\u0627\u0644\u0645\u0624\u0634\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}this.addKPIAnnualPlan(),setTimeout(()=>{document.getElementById("kpi-plan-objective").value=r.objective||"",document.getElementById("kpi-plan-kpi").value=r.kpi||"",document.getElementById("kpi-plan-target").value=r.target||"",document.getElementById("kpi-plan-goal").value=r.goal||"",document.getElementById("kpi-plan-improvement").value=r.improvementPlan||"",["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"].forEach(i=>{const o=document.getElementById(`kpi-plan-${i}`);o&&(o.value=r[i]||"0")})},100)}}catch{Notification.error(this._t("module.kpi.notify.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}},SafetyPerformanceKPIs.deleteKPIAnnualPlan=async function(e){if(confirm(this._t("module.kpi.notify.deleteConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0624\u0634\u0631\u061F")))try{const t=await GoogleIntegration.callBackend("deleteKPIAnnualPlan",{planId:e});if(t&&t.success)Notification.success(this._t("module.kpi.notify.deleteSuccess","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0624\u0634\u0631 \u0628\u0646\u062C\u0627\u062D")),this.loadKPIAnnualPlans();else throw new Error(t?.message||"Failed to delete")}catch(t){Notification.error(this._t("module.kpi.notify.deleteError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641: ")+t.message)}},SafetyPerformanceKPIs.loadHSEMonitoringPlans=async function(){try{const e=document.getElementById("hse-monitoring-year-selector"),t=e?parseInt(e.value):new Date().getFullYear(),[a,r]=await Promise.all([GoogleIntegration.callBackend("getKPIAnnualPlans",{filters:{year:t}}),GoogleIntegration.callBackend("getHSEMonitoringPlans",{filters:{year:t}})]),s=a&&a.success?a.data||[]:[],i=r&&r.success?r.data||[]:[],o={};i.forEach(c=>{o[c.activity]=c});const n=s.map(c=>{const l=o[c.objective]||{};return{id:c.id,activity:c.objective,activityDescription:c.kpi,area:c.target||"-",frequency:"Monthly",responsibility:c.improvementPlan||"-",recordDocument:c.goal||"-",indicatorType:c.indicatorType||"Leading",target_jan:c.jan||"0",target_feb:c.feb||"0",target_mar:c.mar||"0",target_apr:c.apr||"0",target_may:c.may||"0",target_jun:c.jun||"0",target_jul:c.jul||"0",target_aug:c.aug||"0",target_sep:c.sep||"0",target_oct:c.oct||"0",target_nov:c.nov||"0",target_dec:c.dec||"0",executed_jan:l.executed_jan||"0",executed_feb:l.executed_feb||"0",executed_mar:l.executed_mar||"0",executed_apr:l.executed_apr||"0",executed_may:l.executed_may||"0",executed_jun:l.executed_jun||"0",executed_jul:l.executed_jul||"0",executed_aug:l.executed_aug||"0",executed_sep:l.executed_sep||"0",executed_oct:l.executed_oct||"0",executed_nov:l.executed_nov||"0",executed_dec:l.executed_dec||"0"}});i.forEach(c=>{s.find(l=>l.objective===c.activity)||n.push(c)}),this.renderHSEMonitoringTables(n)}catch{const t=document.getElementById("hse-monitoring-weekly-body");t&&(t.innerHTML=`
                <tr>
                    <td colspan="30" style="padding: 40px; text-align: center; color: #6b7280;">
                        <i class="fas fa-exclamation-triangle text-3xl mb-3 text-yellow-500"></i>
                        <p>\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                        <button onclick="SafetyPerformanceKPIs.loadHSEMonitoringPlans()" class="btn-primary mt-4">
                            <i class="fas fa-redo me-2"></i>
                            \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                        </button>
                    </td>
                </tr>
            `)}},SafetyPerformanceKPIs.renderHSEMonitoringTables=function(e){const t=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],a={Weekly:"weekly",Monthly:"monthly","Semi-Annually":"semiannually",Annually:"annually"},s=!(typeof window<"u"&&typeof window.isReadOnlyRole=="function"?window.isReadOnlyRole():!1)&&(this.isAdminUser()||typeof Permissions<"u"&&Permissions.hasAccess("hse-monitoring-plan"));Object.keys(a).forEach(i=>{const o=document.getElementById(`hse-monitoring-${a[i]}-body`);if(!o)return;const n=(e||[]).filter(c=>c.frequency===i);if(n.length===0){const c=s?30:29;o.innerHTML=`
                <tr>
                    <td colspan="${c}" style="padding: 30px; text-align: center; color: #6b7280;">
                        <i class="fas fa-inbox text-2xl mb-2"></i>
                        <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>
                    </td>
                </tr>
            `;return}o.innerHTML=n.map(c=>{const l=t.reduce((g,h)=>g+(parseFloat(c["target_"+h])||0),0),d=t.reduce((g,h)=>g+(parseFloat(c["executed_"+h])||0),0),u=l>0?(d/l*100).toFixed(1):"0.0";return`
                <tr class="hover:bg-green-50 transition-colors">
                    <td style="padding: 6px; border: 1px solid #e5e7eb;">${Utils.escapeHTML(c.activity||"-")}</td>
                    <td style="padding: 6px; border: 1px solid #e5e7eb; max-width: 120px; overflow-wrap: break-word;">${Utils.escapeHTML(c.activityDescription||"-")}</td>
                    <td style="padding: 6px; border: 1px solid #e5e7eb; text-align: center;">${Utils.escapeHTML(c.area||"-")}</td>
                    <td style="padding: 6px; border: 1px solid #e5e7eb; text-align: center;">${Utils.escapeHTML(c.frequency||"-")}</td>
                    <td style="padding: 6px; border: 1px solid #e5e7eb;">${Utils.escapeHTML(c.responsibility||"-")}</td>
                    <td style="padding: 6px; border: 1px solid #e5e7eb; max-width: 100px; overflow-wrap: break-word;">${Utils.escapeHTML(c.recordDocument||"-")}</td>
                    ${t.map(g=>`<td style="padding: 6px; border: 1px solid #e5e7eb; text-align: center; background: #eff6ff;">${c["target_"+g]||"0"}</td>`).join("")}
                    ${t.map(g=>`<td style="padding: 6px; border: 1px solid #e5e7eb; text-align: center; background: #ecfdf5;">${c["executed_"+g]||"0"}</td>`).join("")}
                    <td style="padding: 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: bold; background: #fef3c7;">${l}</td>
                    <td style="padding: 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: bold; background: #d1fae5;">${d}</td>
                    <td style="padding: 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: bold; background: #ede9fe;">${u}%</td>
                    ${s?`
                    <td style="padding: 6px; border: 1px solid #e5e7eb; text-align: center;">
                        <button onclick="SafetyPerformanceKPIs.editHSEMonitoringPlan('${c.id}')" class="text-blue-600 hover:text-blue-800 mx-1" title="\u062A\u0639\u062F\u064A\u0644">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="SafetyPerformanceKPIs.deleteHSEMonitoringPlan('${c.id}')" class="text-red-600 hover:text-red-800 mx-1" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                    `:""}
                </tr>
            `}).join("")})},SafetyPerformanceKPIs.addHSEMonitoringPlan=function(){const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],t=new Date().getFullYear(),a=document.getElementById("spk-monitoring-plan-panel");a&&(a.innerHTML=`
        <div class="content-card">
            <div class="card-header bg-gradient-to-r from-green-50 to-emerald-50 border-b-4 border-green-600">
                <div class="flex items-center justify-between">
                    <h2 class="card-title text-green-800">
                        <i class="fas fa-plus-circle me-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0646\u0634\u0627\u0637 \u062C\u062F\u064A\u062F - \u062E\u0637\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 HSE ${t}
                    </h2>
                    <button onclick="SafetyPerformanceKPIs.cancelAddHSEMonitoringPlan()" class="btn-secondary">
                        <i class="fas fa-times me-2"></i>
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                </div>
            </div>
            <div class="card-body">
                <form id="hse-monitoring-plan-form" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Activity / \u0627\u0644\u0646\u0634\u0627\u0637 *</label>
                            <input type="text" id="hse-plan-activity" class="form-input" placeholder="e.g., Employees training" required>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Activity Description / \u0627\u0644\u0648\u0635\u0641</label>
                            <input type="text" id="hse-plan-description" class="form-input" placeholder="e.g., Training">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Area / \u0627\u0644\u0645\u0646\u0637\u0642\u0629 *</label>
                            <input type="text" id="hse-plan-area" class="form-input" placeholder="e.g., Management" required>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Frequency / \u0627\u0644\u062A\u0643\u0631\u0627\u0631 *</label>
                            <select id="hse-plan-frequency" class="form-input" required>
                                <option value="Weekly">\u0623\u0633\u0628\u0648\u0639\u064A (Weekly)</option>
                                <option value="Monthly">\u0634\u0647\u0631\u064A (Monthly)</option>
                                <option value="Semi-Annually">\u0646\u0635\u0641 \u0633\u0646\u0648\u064A (Semi-Annually)</option>
                                <option value="Annually">\u0633\u0646\u0648\u064A (Annually)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Responsibility / \u0627\u0644\u0645\u0633\u0626\u0648\u0644 *</label>
                            <input type="text" id="hse-plan-responsibility" class="form-input" placeholder="e.g., HSE Engineer" required>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Record Document / \u0648\u062B\u064A\u0642\u0629 \u0627\u0644\u062A\u0633\u062C\u064A\u0644</label>
                            <input type="text" id="hse-plan-record" class="form-input" placeholder="e.g., HRD-FRM-15-01">
                        </div>
                    </div>
                    
                    <h3 class="text-lg font-bold mt-6 mb-4 border-t pt-4">Monthly Targets & Executed for ${t} / \u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0648\u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0634\u0647\u0631\u064A</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        ${e.map(r=>`
                            <div class="border p-3 rounded-lg bg-gray-50">
                                <label class="block text-sm font-bold text-gray-800 mb-2">${r}</label>
                                <div class="mb-2">
                                    <label class="block text-xs text-blue-600 mb-1">Target / \u0627\u0644\u0647\u062F\u0641</label>
                                    <input type="number" id="hse-plan-target-${r.toLowerCase()}" class="form-input" value="0" min="0">
                                </div>
                                <div>
                                    <label class="block text-xs text-green-600 mb-1">Executed / \u0627\u0644\u0645\u0646\u0641\u0630</label>
                                    <input type="number" id="hse-plan-executed-${r.toLowerCase()}" class="form-input" value="0" min="0">
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    
                    <div class="flex gap-3 mt-6 pt-4 border-t">
                        <button type="button" id="hse-save-btn" onclick="SafetyPerformanceKPIs.saveHSEMonitoringPlan()" class="btn-primary">
                            <i class="fas fa-save me-2"></i>
                            <span id="hse-save-text">\u062D\u0641\u0638 \u0627\u0644\u0646\u0634\u0627\u0637</span>
                        </button>
                        <button type="button" onclick="SafetyPerformanceKPIs.cancelAddHSEMonitoringPlan()" class="btn-secondary">
                            <i class="fas fa-times me-2"></i>
                            \u0625\u0644\u063A\u0627\u0621
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `,a.scrollIntoView({behavior:"smooth",block:"start"}))},SafetyPerformanceKPIs.cancelAddHSEMonitoringPlan=function(){this.activeTab="monitoring-plan";const e=document.getElementById("spk-monitoring-plan-panel");e&&(e.innerHTML=this.renderMonitoringPlanTab()),setTimeout(()=>this.loadHSEMonitoringPlans(),50)},SafetyPerformanceKPIs.saveHSEMonitoringPlan=async function(e=null){try{const t=document.getElementById("hse-save-btn"),a=document.getElementById("hse-save-text");t&&(t.disabled=!0,t.classList.add("opacity-50","cursor-not-allowed")),a&&(a.textContent="\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...");const r=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],s={id:e,year:new Date().getFullYear(),activity:document.getElementById("hse-plan-activity")?.value||"",activityDescription:document.getElementById("hse-plan-description")?.value||"",area:document.getElementById("hse-plan-area")?.value||"",frequency:document.getElementById("hse-plan-frequency")?.value||"",responsibility:document.getElementById("hse-plan-responsibility")?.value||"",recordDocument:document.getElementById("hse-plan-record")?.value||""};r.forEach(o=>{s["target_"+o]=document.getElementById(`hse-plan-target-${o}`)?.value||"0",s["executed_"+o]=document.getElementById(`hse-plan-executed-${o}`)?.value||"0"});const i=await GoogleIntegration.callBackend("saveHSEMonitoringPlan",s);if(i&&i.success){Notification.success(e?this._t("module.kpi.notify.updateSuccess","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637 \u0628\u0646\u062C\u0627\u062D"):this._t("module.kpi.notify.saveSuccess","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0634\u0627\u0637 \u0628\u0646\u062C\u0627\u062D")),this.activeTab="monitoring-plan";const o=document.getElementById("spk-monitoring-plan-panel");o&&(o.innerHTML=this.renderMonitoringPlanTab()),setTimeout(()=>this.loadHSEMonitoringPlans(),50)}else throw new Error(i?.message||"Failed to save")}catch(t){Notification.error(this._t("module.kpi.notify.saveError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638: ")+t.message)}finally{const t=document.getElementById("hse-save-btn"),a=document.getElementById("hse-save-text");t&&(t.disabled=!1,t.classList.remove("opacity-50","cursor-not-allowed")),a&&(a.textContent=this._t("module.kpi.annual.form.save","\u062D\u0641\u0638 \u0627\u0644\u0646\u0634\u0627\u0637"))}},SafetyPerformanceKPIs.editHSEMonitoringPlan=async function(e){try{const t=new Date().getFullYear(),a=await GoogleIntegration.callBackend("getHSEMonitoringPlans",{filters:{year:t}});if(a&&a.success){const r=(a.data||[]).find(s=>s.id===e);if(!r){Notification.error(this._t("module.kpi.notify.activityNotFound","\u0627\u0644\u0646\u0634\u0627\u0637 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}this.addHSEMonitoringPlan(),setTimeout(()=>{document.getElementById("hse-plan-activity").value=r.activity||"",document.getElementById("hse-plan-description").value=r.activityDescription||"",document.getElementById("hse-plan-area").value=r.area||"",document.getElementById("hse-plan-frequency").value=r.frequency||"",document.getElementById("hse-plan-responsibility").value=r.responsibility||"",document.getElementById("hse-plan-record").value=r.recordDocument||"",["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"].forEach(i=>{const o=document.getElementById(`hse-plan-target-${i}`),n=document.getElementById(`hse-plan-executed-${i}`);o&&(o.value=r["target_"+i]||"0"),n&&(n.value=r["executed_"+i]||"0")})},100)}}catch{Notification.error(this._t("module.kpi.notify.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}},SafetyPerformanceKPIs.deleteHSEMonitoringPlan=async function(e){if(confirm(this._t("module.kpi.notify.deleteConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0646\u0634\u0627\u0637\u061F")))try{const t=await GoogleIntegration.callBackend("deleteHSEMonitoringPlan",{planId:e});if(t&&t.success)Notification.success(this._t("module.kpi.notify.deleteSuccess","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0646\u0634\u0627\u0637 \u0628\u0646\u062C\u0627\u062D")),this.loadHSEMonitoringPlans();else throw new Error(t?.message||"Failed to delete")}catch(t){Notification.error(this._t("module.kpi.notify.deleteError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641: ")+t.message)}},SafetyPerformanceKPIs.exportAnnualPlanToExcel=async function(){try{const e=document.getElementById("kpi-annual-year-selector"),t=e?parseInt(e.value):new Date().getFullYear(),a=await GoogleIntegration.callBackend("getKPIAnnualPlans",{filters:{year:t}});if(!a||!a.success||!a.data||a.data.length===0){Notification.warning(this._t("module.kpi.notify.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];let s="\uFEFF";s+="OBJECTIVE,KPI,TARGET,GOAL,IMPROVEMENT PLAN,"+r.join(",")+`,TOTAL
`,a.data.forEach(c=>{const l=r.reduce((u,g)=>u+(parseFloat(c[g.toLowerCase()])||0),0),d=[`"${(c.objective||"").replace(/"/g,'""')}"`,`"${(c.kpi||"").replace(/"/g,'""')}"`,`"${(c.target||"").replace(/"/g,'""')}"`,`"${(c.goal||"").replace(/"/g,'""')}"`,`"${(c.improvementPlan||"").replace(/"/g,'""')}"`,...r.map(u=>c[u.toLowerCase()]||"0"),l];s+=d.join(",")+`
`});const i=new Blob([s],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(i),n=document.createElement("a");n.href=o,n.download=`KPI_Annual_Plan_${t}.csv`,n.click(),URL.revokeObjectURL(o),Notification.success(this._t("module.kpi.notify.excelSuccess","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"))}catch(e){Notification.error(this._t("module.kpi.notify.saveError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ")+e.message)}},SafetyPerformanceKPIs.exportAnnualPlanToPDF=async function(){try{const e=document.getElementById("kpi-annual-year-selector"),t=e?parseInt(e.value):new Date().getFullYear(),a=await GoogleIntegration.callBackend("getKPIAnnualPlans",{filters:{year:t}});if(!a||!a.success||!a.data||a.data.length===0){Notification.warning(this._t("module.kpi.notify.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];let s=`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>KPI Annual Plan ${t}</title>
                <style>
                    @page { size: A4 landscape; margin: 1cm; }
                    @media print {
                        @page { size: A4 landscape; margin: 1cm; }
                    }
                    body { font-family: Arial, sans-serif; padding: 20px; direction: ltr; }
                    h1 { color: #667eea; text-align: center; margin-bottom: 30px; }
                    table { width: 100%; border-collapse: collapse; font-size: 9px; }
                    th, td { border: 1px solid #ddd; padding: 6px 4px; text-align: center; }
                    th { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 600; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                    .total { background-color: #fef3c7; font-weight: bold; }
                    .footer { margin-top: 20px; text-align: center; font-size: 10px; color: #666; }
                </style>
            </head>
            <body>
                <h1>Key Performance Indicators (KPIs) - Annual Plan ${t}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>OBJECTIVE</th>
                            <th>KPI</th>
                            <th>TARGET</th>
                            <th>GOAL</th>
                            <th>IMPROVEMENT PLAN</th>
                            ${r.map(c=>`<th>${c}</th>`).join("")}
                            <th class="total">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
        `;a.data.forEach(c=>{const l=r.reduce((d,u)=>d+(parseFloat(c[u.toLowerCase()])||0),0);s+=`
                <tr>
                    <td style="text-align: left;">${Utils.escapeHTML(c.objective||"-")}</td>
                    <td style="text-align: left;">${Utils.escapeHTML(c.kpi||"-")}</td>
                    <td>${Utils.escapeHTML(c.target||"-")}</td>
                    <td>${Utils.escapeHTML(c.goal||"-")}</td>
                    <td style="text-align: left; max-width: 200px; word-wrap: break-word;">${Utils.escapeHTML(c.improvementPlan||"-")}</td>
                    ${r.map(d=>`<td>${c[d.toLowerCase()]||"0"}</td>`).join("")}
                    <td class="total">${l}</td>
                </tr>
            `}),s+=`
                    </tbody>
                </table>
                <div class="footer">
                    <p>Generated on: ${new Date().toLocaleDateString("en-US")}</p>
                    <p>HSE Management System - Safety Performance KPIs</p>
                </div>
            </body>
            </html>
        `;const i=new Blob(["\uFEFF"+s],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),n=window.open(o,"_blank");if(!n){URL.revokeObjectURL(o),Notification.error(this._t("module.kpi.notify.pdfBlocked","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631"));return}n.onload=()=>{setTimeout(()=>{n.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)},Notification.success(this._t("module.kpi.notify.pdfSuccess","\u062A\u0645 \u0641\u062A\u062D \u0645\u0639\u0627\u064A\u0646\u0629 PDF \u0628\u0646\u062C\u0627\u062D"))}catch(e){Notification.error(this._t("module.kpi.notify.saveError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ")+e.message)}},SafetyPerformanceKPIs.exportMonitoringPlanToExcel=async function(){try{const e=document.getElementById("hse-monitoring-year-selector"),t=e?parseInt(e.value):new Date().getFullYear(),a=await GoogleIntegration.callBackend("getHSEMonitoringPlans",{filters:{year:t}});if(!a||!a.success||!a.data||a.data.length===0){Notification.warning(this._t("module.kpi.notify.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}const r=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],s=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];let i="\uFEFF";i+="FREQUENCY,ACTIVITY,ACTIVITY DESCRIPTION,AREA,RESPONSIBILITY,RECORD DOCUMENT,",i+=s.map(l=>l+" Target").join(",")+",",i+=s.map(l=>l+" Executed").join(",")+",",i+=`TOTAL TARGET,TOTAL EXECUTED,SCORE %
`,a.data.forEach(l=>{const d=r.reduce((m,p)=>m+(parseFloat(l["target_"+p])||0),0),u=r.reduce((m,p)=>m+(parseFloat(l["executed_"+p])||0),0),g=d>0?(u/d*100).toFixed(1):"0.0",h=[`"${(l.frequency||"").replace(/"/g,'""')}"`,`"${(l.activity||"").replace(/"/g,'""')}"`,`"${(l.activityDescription||"").replace(/"/g,'""')}"`,`"${(l.area||"").replace(/"/g,'""')}"`,`"${(l.responsibility||"").replace(/"/g,'""')}"`,`"${(l.recordDocument||"").replace(/"/g,'""')}"`,...r.map(m=>l["target_"+m]||"0"),...r.map(m=>l["executed_"+m]||"0"),d,u,g+"%"];i+=h.join(",")+`
`});const o=new Blob([i],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(o),c=document.createElement("a");c.href=n,c.download=`HSE_Monitoring_Plan_${t}.csv`,c.click(),URL.revokeObjectURL(n),Notification.success(this._t("module.kpi.notify.excelSuccess","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"))}catch(e){Notification.error(this._t("module.kpi.notify.saveError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ")+e.message)}},SafetyPerformanceKPIs.exportMonitoringPlanToPDF=async function(){try{const e=document.getElementById("hse-monitoring-year-selector"),t=e?parseInt(e.value):new Date().getFullYear(),a=await GoogleIntegration.callBackend("getHSEMonitoringPlans",{filters:{year:t}});if(!a||!a.success||!a.data||a.data.length===0){Notification.warning(this._t("module.kpi.notify.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}const r=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],s=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i=["Weekly","Monthly","Semi-Annually","Annually"];let o=`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>HSE Monitoring Plan ${t}</title>
                <style>
                    @page { size: A4 landscape; margin: 1cm; }
                    @media print {
                        @page { size: A4 landscape; margin: 1cm; }
                    }
                    body { font-family: Arial, sans-serif; padding: 20px; direction: ltr; }
                    h1 { color: #10b981; text-align: center; margin-bottom: 10px; }
                    h2 { color: #059669; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #10b981; padding-bottom: 5px; }
                    table { width: 100%; border-collapse: collapse; font-size: 8px; margin-bottom: 20px; }
                    th, td { border: 1px solid #ddd; padding: 5px 3px; text-align: center; }
                    th { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; font-weight: 600; font-size: 7px; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                    .target-col { background-color: #eff6ff; }
                    .executed-col { background-color: #ecfdf5; }
                    .total-target { background-color: #fef3c7; font-weight: bold; }
                    .total-executed { background-color: #d1fae5; font-weight: bold; }
                    .score { background-color: #ede9fe; font-weight: bold; }
                    .footer { margin-top: 20px; text-align: center; font-size: 10px; color: #666; }
                </style>
            </head>
            <body>
                <h1>HSE MONITORING PLAN ${t}</h1>
                <p style="text-align: center; color: #666;">\u062E\u0637\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 HSE - \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0634\u0647\u0631\u064A\u0629</p>
        `;i.forEach(d=>{const u=a.data.filter(g=>g.frequency===d);u.length!==0&&(o+=`<h2>${d} Activities</h2>`,o+="<table><thead><tr>",o+="<th>Activity</th><th>Description</th><th>Area</th><th>Responsibility</th><th>Record Document</th>",o+=s.map(g=>`<th class="target-col">${g}T</th>`).join(""),o+=s.map(g=>`<th class="executed-col">${g}E</th>`).join(""),o+='<th class="total-target">Total Target</th>',o+='<th class="total-executed">Total Executed</th>',o+='<th class="score">Score %</th>',o+="</tr></thead><tbody>",u.forEach(g=>{const h=r.reduce((f,b)=>f+(parseFloat(g["target_"+b])||0),0),m=r.reduce((f,b)=>f+(parseFloat(g["executed_"+b])||0),0),p=h>0?(m/h*100).toFixed(1):"0.0";o+="<tr>",o+=`<td style="text-align: left;">${Utils.escapeHTML(g.activity||"-")}</td>`,o+=`<td style="text-align: left;">${Utils.escapeHTML(g.activityDescription||"-")}</td>`,o+=`<td>${Utils.escapeHTML(g.area||"-")}</td>`,o+=`<td>${Utils.escapeHTML(g.responsibility||"-")}</td>`,o+=`<td style="text-align: left;">${Utils.escapeHTML(g.recordDocument||"-")}</td>`,o+=r.map(f=>`<td class="target-col">${g["target_"+f]||"0"}</td>`).join(""),o+=r.map(f=>`<td class="executed-col">${g["executed_"+f]||"0"}</td>`).join(""),o+=`<td class="total-target">${h}</td>`,o+=`<td class="total-executed">${m}</td>`,o+=`<td class="score">${p}%</td>`,o+="</tr>"}),o+="</tbody></table>")}),o+=`
                <div class="footer">
                    <p>Generated on: ${new Date().toLocaleDateString("en-US")}</p>
                    <p>HSE Management System - Monitoring Plan</p>
                </div>
            </body>
            </html>
        `;const n=new Blob(["\uFEFF"+o],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(n),l=window.open(c,"_blank");if(!l){URL.revokeObjectURL(c),Notification.error(this._t("module.kpi.notify.pdfBlocked","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631"));return}l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(c),1e3)},400)},Notification.success(this._t("module.kpi.notify.pdfSuccess","\u062A\u0645 \u0641\u062A\u062D \u0645\u0639\u0627\u064A\u0646\u0629 PDF \u0628\u0646\u062C\u0627\u062D"))}catch(e){Notification.error(this._t("module.kpi.notify.saveError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ")+e.message)}};const __origEnhanceWithScorecardTab=SafetyPerformanceKPIs.enhanceWithScorecardTab;SafetyPerformanceKPIs.enhanceWithScorecardTab=function(e){__origEnhanceWithScorecardTab.call(this,e);const t=e?e.querySelector(".spk-tab-bar"):null;if(!t||t.querySelector("#spk-tab-chart-scorecard"))return;const a=(o,n)=>this._t(o,n),r=t.querySelector("#spk-tab-scorecard"),s=document.createElement("button");s.type="button",s.id="spk-tab-chart-scorecard",s.className="spk-tab-btn",s.setAttribute("data-tab","chart-scorecard"),s.innerHTML=`<i class="fas fa-chart-line me-1"></i>${a("module.kpi.tab.chartScoreCard","Chart Score Card")}`,r&&r.nextSibling?t.insertBefore(s,r.nextSibling):t.appendChild(s);const i=document.createElement("div");i.id="spk-chart-scorecard-panel",i.className="spk-tab-panel hidden",i.innerHTML=this.renderChartScorecardShell(),this.applyModuleI18n(i),e.appendChild(i),s.addEventListener("click",()=>this.switchScorecardTab("chart-scorecard"))};const __origSwitchScorecardTab=SafetyPerformanceKPIs.switchScorecardTab;SafetyPerformanceKPIs.switchScorecardTab=function(e){__origSwitchScorecardTab.call(this,e);const t=document.getElementById("spk-chart-scorecard-panel"),a=e==="chart-scorecard";if(t&&t.classList.toggle("hidden",!a),document.querySelectorAll(".spk-tab-btn").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-tab")===e)}),a){const{start:r,end:s}=this.getDateRange(),i=this.getFilteredData(r,s);this.renderChartScorecardVisuals(i,r,s)}};const __origUpdateAllKPIs_v2=SafetyPerformanceKPIs.updateAllKPIs;SafetyPerformanceKPIs.updateAllKPIs=function(){if(__origUpdateAllKPIs_v2.call(this),this.activeTab==="chart-scorecard"&&document.getElementById("spk-chart-scorecard-panel")){const{start:e,end:t}=this.getDateRange(),a=this.getFilteredData(e,t);this.renderChartScorecardVisuals(a,e,t)}},SafetyPerformanceKPIs.renderChartScorecardShell=function(){const e=(r,s)=>this._t(r,s),t=this._chartScorecardUiState||{group:"all",months:12,compact:!1,search:"",chartType:"line"},a=Number(t.months)||12;return`
        <style>
            #chart-scorecard-grid.spk-compact-mode .chart-scorecard-card .card-header { padding: 8px 10px !important; }
            #chart-scorecard-grid.spk-compact-mode .chart-scorecard-card .card-body { padding: 9px !important; }
            #chart-scorecard-grid.spk-compact-mode .chart-scorecard-card .card-title { font-size: 0.95rem !important; }
            #chart-scorecard-grid.spk-compact-mode .chart-scorecard-card .text-xl { font-size: 1rem !important; }
            .spk-chart-controls-row { display: grid; grid-template-columns: 1fr; gap: 8px; align-items: end; }
            .spk-chart-control { margin: 0; min-width: 0; }
            .spk-chart-control-title { display: block; margin-bottom: 4px; font-size: 11px; font-weight: 700; color: #475569; line-height: 1.2; white-space: nowrap; }
            .spk-chart-control-field { height: 32px !important; font-size: 12px !important; }
            #chart-scorecard-compact-toggle.spk-chart-control-field { margin-top: 0 !important; padding: 0 10px; white-space: nowrap; }
            @media (min-width: 1280px) {
                .spk-chart-controls-row { grid-template-columns: 1.05fr 1.05fr 1.4fr 1fr 1fr; }
            }
        </style>
        <div class="spk-scorecard-hero" style="margin-bottom:1rem;">
            <div class="spk-scorecard-title">
                <div>
                    <div class="spk-scorecard-eyebrow">${e("module.kpi.scorecard.eyebrow","\u0645\u0635\u062F\u0631 \u0627\u0644\u062D\u0642\u064A\u0642\u0629 \u0627\u0644\u0648\u0627\u062D\u062F")}</div>
                    <h2 class="text-xl font-black text-slate-900 mt-2">${e("module.kpi.tab.chartScoreCard","Chart Score Card")}</h2>
                    <p class="text-sm text-slate-600 mt-2">${e("module.kpi.chart.subtitle","\u0639\u0631\u0636 \u0628\u064A\u0627\u0646\u064A \u0627\u062D\u062A\u0631\u0627\u0641\u064A \u0645\u0637\u0627\u0628\u0642 \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645\u060C \u0645\u0642\u0633\u0651\u0645 \u0625\u0644\u0649 11 \u0648\u062D\u062F\u0629 \u062A\u062D\u0644\u064A\u0644\u064A\u0629.")}</p>
                </div>
            </div>
        </div>
        <div class="content-card mb-4" style="border:1px solid rgba(15,23,42,.08);">
            <div class="card-body" style="padding:12px 14px;">
                <div class="spk-chart-controls-row">
                    <label class="spk-chart-control">
                        <span class="spk-chart-control-title">${e("module.kpi.chart.control.group","\u0646\u0648\u0639 \u0627\u0644\u0645\u0624\u0634\u0631")}</span>
                        <select id="chart-scorecard-group" class="form-select spk-chart-control-field">
                            <option value="all" ${t.group==="all"?"selected":""}>${e("module.kpi.chart.group.all","\u0627\u0644\u0643\u0644")}</option>
                            <option value="leading" ${t.group==="leading"?"selected":""}>${e("module.kpi.chart.group.leading","\u0627\u0633\u062A\u0628\u0627\u0642\u064A")}</option>
                            <option value="lagging" ${t.group==="lagging"?"selected":""}>${e("module.kpi.chart.group.lagging","\u062A\u0631\u0627\u062C\u0639\u064A")}</option>
                            <option value="capacity" ${t.group==="capacity"?"selected":""}>${e("module.kpi.chart.group.capacity","\u0633\u0639\u0629/\u0645\u0648\u0627\u0631\u062F")}</option>
                        </select>
                    </label>
                    <label class="spk-chart-control">
                        <span class="spk-chart-control-title">${e("module.kpi.chart.control.months","\u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0632\u0645\u0646\u064A")}</span>
                        <select id="chart-scorecard-months" class="form-select spk-chart-control-field">
                            <option value="3" ${a===3?"selected":""}>${e("module.kpi.chart.months.3","\u0622\u062E\u0631 3 \u0623\u0634\u0647\u0631")}</option>
                            <option value="6" ${a===6?"selected":""}>${e("module.kpi.chart.months.6","\u0622\u062E\u0631 6 \u0623\u0634\u0647\u0631")}</option>
                            <option value="12" ${a===12?"selected":""}>${e("module.kpi.chart.months.12","\u0622\u062E\u0631 12 \u0634\u0647\u0631")}</option>
                        </select>
                    </label>
                    <label class="spk-chart-control">
                        <span class="spk-chart-control-title">${e("module.kpi.chart.control.search","\u0628\u062D\u062B \u062F\u0627\u062E\u0644 \u0627\u0644\u0643\u0631\u0648\u062A")}</span>
                        <input id="chart-scorecard-search" type="search" class="form-input spk-chart-control-field"
                            placeholder="${e("module.kpi.chart.searchPlaceholder","\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0645\u0624\u0634\u0631...")}" value="${Utils.escapeHTML(t.search||"")}">
                    </label>
                    <button id="chart-scorecard-compact-toggle" class="btn-secondary spk-chart-control-field">
                        <i class="fas ${t.compact?"fa-expand-arrows-alt":"fa-compress-arrows-alt"} me-1"></i>
                        ${t.compact?e("module.kpi.chart.compact.off","\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0645\u0636\u063A\u0648\u0637"):e("module.kpi.chart.compact.on","\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0645\u0636\u063A\u0648\u0637")}
                    </button>
                    <label class="spk-chart-control">
                        <span class="spk-chart-control-title">${e("module.kpi.chart.control.chartType","\u0646\u0645\u0637 \u0627\u0644\u0631\u0633\u0645")}</span>
                        <select id="chart-scorecard-chart-type" class="form-select spk-chart-control-field">
                            <option value="line" ${t.chartType==="line"?"selected":""}>${e("module.kpi.chart.type.line","\u062E\u0637\u064A")}</option>
                            <option value="bar" ${t.chartType==="bar"?"selected":""}>${e("module.kpi.chart.type.bar","\u0623\u0639\u0645\u062F\u0629")}</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
        <div id="chart-scorecard-grid" class="grid grid-cols-1 xl:grid-cols-2 gap-4"></div>
    `},SafetyPerformanceKPIs.renderChartScorecardDetailCard=function(e={}){const{title:t="",subtitle:a="",tone:r="blue",currentValue:s=0,ytdValue:i=0,unit:o="",score:n=0,series:c=[],labels:l=[],metricLabel:d="",ytdLabel:u="",cardId:g="",group:h="all"}=e,m={blue:{line:"#2563eb",fill:"rgba(37,99,235,.14)",text:"#1e3a8a",soft:"#dbeafe",border:"rgba(59,130,246,.22)"},emerald:{line:"#059669",fill:"rgba(5,150,105,.14)",text:"#065f46",soft:"#d1fae5",border:"rgba(16,185,129,.22)"},amber:{line:"#d97706",fill:"rgba(217,119,6,.14)",text:"#92400e",soft:"#fef3c7",border:"rgba(245,158,11,.22)"},rose:{line:"#e11d48",fill:"rgba(225,29,72,.14)",text:"#9f1239",soft:"#ffe4e6",border:"rgba(244,63,94,.22)"},violet:{line:"#7c3aed",fill:"rgba(124,58,237,.14)",text:"#5b21b6",soft:"#ede9fe",border:"rgba(139,92,246,.22)"}},p=m[r]||m.blue,f=(c||[]).map(T=>Number(T)||0),b=Math.max(...f,1),x=Math.min(...f,0),k=Math.max(b-x,1),S=220,E=56,C=f.length>1?S/(f.length-1):S,y=f.map((T,F)=>{const M=F*C,L=E-(T-x)/k*(E-10)-5;return`${M.toFixed(2)},${L.toFixed(2)}`}).join(" "),$=`0,${E} ${y} ${S},${E}`,I=Math.max(0,Math.min(100,Number(n)||0)),A=26,P=2*Math.PI*A,D=P*(1-I/100),v=T=>(Number(T)||0).toLocaleString("en-US",{maximumFractionDigits:2}),w=f.map((T,F)=>{const M=F*C,L=E-(T-x)/k*(E-10)-5,R=l[F]||`M${F+1}`;return`<circle cx="${M.toFixed(2)}" cy="${L.toFixed(2)}" r="2.4" fill="${p.line}" opacity="0.9"><title>${Utils.escapeHTML(`${R}: ${v(T)} ${o||""}`)}</title></circle>`}).join("");return`
        <div class="content-card overflow-hidden chart-scorecard-card" data-chart-card-id="${Utils.escapeHTML(g)}" data-chart-group="${Utils.escapeHTML(h)}" style="border:1px solid ${p.border}; box-shadow:0 10px 22px rgba(15,23,42,.07);">
            <div class="card-header" style="background:linear-gradient(135deg,#fff,#f8fafc); border-bottom:1px solid ${p.border}; padding:10px 12px;">
                <h2 class="card-title text-slate-900">${t}</h2>
                <p class="text-xs text-slate-500 mt-1">${a}</p>
            </div>
            <div class="card-body" style="padding:12px;">
                <div class="grid grid-cols-[1fr_auto] gap-3 items-center">
                    <div>
                        <div class="text-xs font-bold mb-1" style="color:${p.text};">${d}</div>
                        <div class="text-xl font-black text-slate-900">${v(s)} <span class="text-xs font-bold text-slate-400">${o}</span></div>
                        <div class="text-xs text-slate-500 mt-1">${u}: <span class="font-bold text-slate-700">${v(i)}</span></div>
                    </div>
                    <div class="rounded-2xl p-2" style="background:${p.soft};">
                        <svg width="58" height="58" viewBox="0 0 64 64" aria-hidden="true">
                            <circle cx="32" cy="32" r="${A}" fill="none" stroke="rgba(15,23,42,.12)" stroke-width="8"></circle>
                            <circle cx="32" cy="32" r="${A}" fill="none" stroke="${p.line}" stroke-width="8" stroke-linecap="round"
                                stroke-dasharray="${P.toFixed(2)}" stroke-dashoffset="${D.toFixed(2)}" transform="rotate(-90 32 32)"></circle>
                            <text x="32" y="36" text-anchor="middle" font-size="12" font-weight="800" fill="${p.text}">${I.toFixed(0)}%</text>
                        </svg>
                    </div>
                </div>
                <div class="mt-3 rounded-xl p-2" style="background:rgba(15,23,42,.03);">
                    <svg width="100%" height="${E}" viewBox="0 0 ${S} ${E}" preserveAspectRatio="none" aria-hidden="true">
                        <polyline points="${$}" fill="${p.fill}" stroke="none"></polyline>
                        <polyline points="${y}" fill="none" stroke="${p.line}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></polyline>
                        ${w}
                    </svg>
                    <div class="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                        <span>${l[0]||""}</span>
                        <span>${l[l.length-1]||""}</span>
                    </div>
                </div>
            </div>
        </div>
    `},SafetyPerformanceKPIs.renderChartScorecardVisuals=function(){const e=(y,$)=>this._t(y,$),t=document.getElementById("chart-scorecard-grid");if(!t)return;this.destroyChartScorecardCharts(),this._chartScorecardUiState||(this._chartScorecardUiState={group:"all",months:12,compact:!1,search:"",chartType:"line"});const a=this._chartScorecardUiState;if(typeof Chart>"u"){t.innerHTML=`<div class="content-card"><div class="card-body text-sm text-slate-500">${e("module.kpi.chart.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0636\u0645\u0646 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629")}</div></div>`,this.bindChartScorecardControls();return}const r=this.buildScorecardData(this.scorecardYear),s=r.rows||{},i=Math.min(r.ytdLimit||0,11),o=(y,$="sum",I=null)=>$==="rate"?this.getYtdValue(y||[],"rate",i,I||[]):$==="avg"?this.getYtdValue(y||[],"avg",i):$==="last"?this.getYtdValue(y||[],"last",i):this.getYtdValue(y||[],"sum",i),n=y=>y&&y.length&&y[i]||0,c=y=>this.formatScorecardValue(y,0,i,this.scorecardYear),l=y=>this.formatScorecardValue(y,2,i,this.scorecardYear),d=(n(s.permitsHeight)||0)+(n(s.permitsElectrical)||0)+(n(s.permitsHot)||0)+(n(s.permitsOther)||0),u=o(s.permitsHeight)+o(s.permitsElectrical)+o(s.permitsHot)+o(s.permitsOther),h=(r.months||[]).map(y=>y.label),m=Math.max(3,Math.min(12,Number(a.months)||12)),p=(y=[])=>(y||[]).slice(Math.max(0,(y||[]).length-m)),f=p(h),b=(y=[],$=!1)=>{const I=y.map(D=>Number(D)||0),A=I.length?I.reduce((D,v)=>D+v,0)/I.length:0;return $?Math.max(0,100-A*12):Math.min(100,A>100?100:A)},x=[{key:"permitTotal",label:e("module.kpi.scorecard.row.permits.total","TOTAL PER MONTH"),data:p(s.permitTotal||[]),borderColor:"#2563eb",backgroundColor:"rgba(37,99,235,.18)",group:"leading"},{key:"trainingHours",label:e("module.kpi.scorecard.row.training.hours","Training Hours"),data:p(s.trainingHours||[]),borderColor:"#059669",backgroundColor:"rgba(5,150,105,.18)",group:"leading"},{key:"trir",label:e("module.kpi.scorecard.row.trir","TRIR"),data:p(s.trir||[]),borderColor:"#d97706",backgroundColor:"rgba(217,119,6,.18)",group:"lagging"},{key:"ltir",label:e("module.kpi.chart.card.ltirInMonth","LTIR"),data:p(s.ltir||[]),borderColor:"#e11d48",backgroundColor:"rgba(225,29,72,.18)",group:"lagging"},{key:"employeeCounts",label:e("module.kpi.chart.card.operationalEmployeesCurrent","Operational Employees"),data:p(s.employeeCounts||[]),borderColor:"#7c3aed",backgroundColor:"rgba(124,58,237,.18)",group:"capacity"}],k=x.filter(y=>a.group==="all"||y.group===a.group).filter(y=>{const $=String(a.search||"").trim().toLowerCase();return!$||y.label.toLowerCase().includes($)}),S=k.length?k:x,E=(b(p(s.trainingHours||[]),!1)+b(p(s.permitTotal||[]),!1)+b(p(s.trir||[]),!0))/3;t.innerHTML=`
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.chart.overall","Overall Performance Index")}</h2>
                <p class="text-xs text-slate-500 mt-1">${e("module.kpi.chart.subtitle","\u0644\u0648\u062D\u0629 \u0631\u0633\u0648\u0645 \u0628\u064A\u0627\u0646\u064A\u0629 \u062A\u0646\u0641\u064A\u0630\u064A\u0629 \u0645\u0628\u0646\u064A\u0629 \u0639\u0644\u0649 \u0646\u0641\u0633 \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645.")}</p>
            </div>
            <div class="card-body">
                <div class="grid grid-cols-3 gap-2 mb-3">
                    <div class="rounded-lg p-2 bg-slate-50 text-center"><div class="text-[10px] text-slate-500">${e("module.kpi.scorecard.row.permits.total","TOTAL PER MONTH")}</div><div class="text-sm font-bold">${c(d)}</div></div>
                    <div class="rounded-lg p-2 bg-slate-50 text-center"><div class="text-[10px] text-slate-500">${e("module.kpi.scorecard.row.trir","TRIR")}</div><div class="text-sm font-bold">${l(n(s.trir))}</div></div>
                    <div class="rounded-lg p-2 bg-slate-50 text-center"><div class="text-[10px] text-slate-500">${e("module.kpi.chart.overall","Overall")}</div><div class="text-sm font-bold">${l(E)}%</div></div>
                </div>
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-main-trend-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.scorecard.section.permits","2 Permits to Work")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-permits-stacked-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.scorecard.section.training","3 Health & Safety Training")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-training-mix-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.chart.card.safetyRates","Safety Rates")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-safety-rates-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.chart.card.workforceHours.title","0 Workforce & Hours")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-workforce-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.chart.card.safetyReported.subtitle","LTI / NLTI / First Aid / Near Miss")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-incidents-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.chart.card.occupationalHealth.subtitle","LTOI / NLTOI / Occ Health Near Miss")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-occ-health-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.scorecard.section.nebosh","4 NEBOSH Training")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-nebosh-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.scorecard.section.trainingMetrics","Training Metrics")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-training-fte-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.scorecard.row.totalHoursWorked","Total Employee Hours Worked")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-hours-chart"></canvas></div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-header">
                <h2 class="card-title">${e("module.kpi.chart.card.sections","Sections")}</h2>
            </div>
            <div class="card-body">
                <div style="height:${a.compact?"220px":"300px"}"><canvas id="spk-performance-balance-chart"></canvas></div>
            </div>
        </div>
    `;const C=a.chartType==="bar"?"bar":"line";this._chartScorecardCharts.push(new Chart(document.getElementById("spk-main-trend-chart"),{type:C,data:{labels:f,datasets:S.map(y=>({...y,tension:.35,fill:C==="line"}))},options:this.getChartScorecardOptions({stacked:!1,title:e("module.kpi.chart.control.group","\u0646\u0648\u0639 \u0627\u0644\u0645\u0624\u0634\u0631")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-permits-stacked-chart"),{type:"bar",data:{labels:f,datasets:[{label:e("module.kpi.scorecard.row.permits.heights","Heights"),data:p(s.permitsHeight||[]),backgroundColor:"rgba(37,99,235,.72)"},{label:e("module.kpi.scorecard.row.permits.electrical","Electrical-LOTO"),data:p(s.permitsElectrical||[]),backgroundColor:"rgba(5,150,105,.72)"},{label:e("module.kpi.scorecard.row.permits.hot","Hot Work"),data:p(s.permitsHot||[]),backgroundColor:"rgba(217,119,6,.72)"},{label:e("module.kpi.scorecard.row.permits.other","All Others"),data:p(s.permitsOther||[]),backgroundColor:"rgba(124,58,237,.72)"}]},options:this.getChartScorecardOptions({stacked:!0,title:e("module.kpi.scorecard.section.permits","2 Permits to Work")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-training-mix-chart"),{type:"bar",data:{labels:f,datasets:[{type:"bar",label:e("module.kpi.scorecard.row.training.sessions","Training Sessions"),data:p(s.trainingSessions||[]),backgroundColor:"rgba(5,150,105,.72)"},{type:"line",label:e("module.kpi.scorecard.row.training.hours","Training Hours"),data:p(s.trainingHours||[]),borderColor:"#059669",backgroundColor:"rgba(5,150,105,.14)",yAxisID:"y1",tension:.35}]},options:this.getChartScorecardOptions({dualAxis:!0,title:e("module.kpi.scorecard.section.training","3 Health & Safety Training")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-safety-rates-chart"),{type:"line",data:{labels:f,datasets:[{label:"TRIR",data:p(s.trir||[]),borderColor:"#d97706",backgroundColor:"rgba(217,119,6,.14)",tension:.35,fill:!0},{label:"LTIR",data:p(s.ltir||[]),borderColor:"#e11d48",backgroundColor:"rgba(225,29,72,.14)",tension:.35,fill:!0},{label:"LTOIR",data:p(s.ltoir||[]),borderColor:"#2563eb",backgroundColor:"rgba(37,99,235,.14)",tension:.35,fill:!0}]},options:this.getChartScorecardOptions({stacked:!1,title:e("module.kpi.chart.card.safetyRates","Safety Rates")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-workforce-chart"),{type:"line",data:{labels:f,datasets:[{label:e("module.kpi.chart.card.operationalEmployeesCurrent","Operational Employees"),data:p(s.employeeCounts||[]),borderColor:"#7c3aed",backgroundColor:"rgba(124,58,237,.14)",tension:.35,fill:!0},{label:e("module.kpi.chart.card.employeeHoursCurrent","Employee Hours Worked"),data:p(s.hoursWorked||[]),borderColor:"#2563eb",backgroundColor:"rgba(37,99,235,.14)",tension:.35,fill:!1,yAxisID:"y1"}]},options:this.getChartScorecardOptions({dualAxis:!0,title:e("module.kpi.chart.card.workforceHours.subtitle","Number Operational employees / Total Employee Hours Worked")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-incidents-chart"),{type:"bar",data:{labels:f,datasets:[{label:"LTI",data:p(s.lti||[]),backgroundColor:"rgba(225,29,72,.72)"},{label:"NLTI",data:p(s.nlti||[]),backgroundColor:"rgba(245,158,11,.72)"},{label:"First Aid",data:p(s.firstAid||[]),backgroundColor:"rgba(59,130,246,.72)"},{label:"Near Miss",data:p(s.nearMiss||[]),backgroundColor:"rgba(5,150,105,.72)"}]},options:this.getChartScorecardOptions({stacked:!0,title:e("module.kpi.chart.card.safetyReported.subtitle","LTI / NLTI / First Aid / Near Miss")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-occ-health-chart"),{type:"line",data:{labels:f,datasets:[{label:"LTOI",data:p(s.ltoi||[]),borderColor:"#e11d48",backgroundColor:"rgba(225,29,72,.14)",tension:.35,fill:!0},{label:"NLTOI",data:p(s.nltoi||[]),borderColor:"#d97706",backgroundColor:"rgba(217,119,6,.14)",tension:.35,fill:!0},{label:e("module.kpi.scorecard.row.occNearMissHazards","Occ Health Near Miss/Hazards Reported"),data:p(s.occHazards||[]),borderColor:"#7c3aed",backgroundColor:"rgba(124,58,237,.14)",tension:.35,fill:!1}]},options:this.getChartScorecardOptions({stacked:!1,title:e("module.kpi.chart.card.occupationalHealth.subtitle","LTOI / NLTOI / Occ Health Near Miss")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-nebosh-chart"),{type:"bar",data:{labels:f,datasets:[{label:e("module.kpi.scorecard.row.neboshStatus","Certification status of UAE HSE Lead"),data:p((s.neboshStatus||[]).map(y=>String(y||"").toLowerCase().includes("cert")||String(y||"").includes("\u0645\u0639\u062A\u0645\u062F")?1:String(y||"").trim()?.5:0)),backgroundColor:"rgba(124,58,237,.72)"}]},options:this.getChartScorecardOptions({stacked:!1,title:e("module.kpi.scorecard.section.nebosh","4 NEBOSH Training")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-training-fte-chart"),{type:"line",data:{labels:f,datasets:[{label:e("module.kpi.scorecard.row.training.hoursPerFte","Training Hours per Operational FTE"),data:p(s.trainingHoursPerFte||[]),borderColor:"#059669",backgroundColor:"rgba(5,150,105,.14)",tension:.35,fill:!0}]},options:this.getChartScorecardOptions({stacked:!1,title:e("module.kpi.scorecard.section.trainingMetrics","Training Metrics")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-hours-chart"),{type:"bar",data:{labels:f,datasets:[{label:e("module.kpi.scorecard.row.totalHoursWorked","Total Employee Hours Worked"),data:p(s.hoursWorked||[]),backgroundColor:"rgba(37,99,235,.72)"}]},options:this.getChartScorecardOptions({stacked:!1,title:e("module.kpi.scorecard.row.totalHoursWorked","Total Employee Hours Worked")})})),this._chartScorecardCharts.push(new Chart(document.getElementById("spk-performance-balance-chart"),{type:"bar",data:{labels:[e("module.kpi.chart.leadingScore","Leading"),e("module.kpi.chart.laggingScore","Lagging"),e("module.kpi.chart.overall","Overall")],datasets:[{label:e("module.kpi.chart.overall","Overall Performance Index"),data:[(b(p(s.permitTotal||[]),!1)+b(p(s.trainingHours||[]),!1))/2,(b(p(s.trir||[]),!0)+b(p(s.ltir||[]),!0))/2,E],backgroundColor:["rgba(5,150,105,.72)","rgba(225,29,72,.72)","rgba(37,99,235,.72)"]}]},options:this.getChartScorecardOptions({stacked:!1,title:e("module.kpi.chart.card.sectionsValue","Workforce, Rates, PTW, Training, NEBOSH")})})),t.classList.toggle("spk-compact-mode",!!a.compact),this.bindChartScorecardControls()},SafetyPerformanceKPIs.destroyChartScorecardCharts=function(){if(!Array.isArray(this._chartScorecardCharts)){this._chartScorecardCharts=[];return}this._chartScorecardCharts.forEach(e=>{try{e&&e.destroy&&e.destroy()}catch{}}),this._chartScorecardCharts=[]},SafetyPerformanceKPIs.getChartScorecardOptions=function(e={}){const{stacked:t=!1,dualAxis:a=!1,title:r=""}=e;return{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!0,position:"bottom"},title:{display:!!r,text:r},tooltip:{enabled:!0,padding:10,bodySpacing:5}},scales:{x:{stacked:t,grid:{display:!1}},y:{stacked:t,beginAtZero:!0},...a?{y1:{beginAtZero:!0,position:"right",grid:{drawOnChartArea:!1}}}:{}}}},SafetyPerformanceKPIs.bindChartScorecardControls=function(){const e=document.getElementById("chart-scorecard-group"),t=document.getElementById("chart-scorecard-months"),a=document.getElementById("chart-scorecard-search"),r=document.getElementById("chart-scorecard-compact-toggle"),s=document.getElementById("chart-scorecard-chart-type");if(!e||!t||!a||!r||!s)return;this._chartScorecardUiState||(this._chartScorecardUiState={group:"all",months:12,compact:!1,search:"",chartType:"line"});const i=()=>this.renderChartScorecardVisuals();e.dataset.bound!=="true"&&(e.addEventListener("change",()=>{this._chartScorecardUiState.group=e.value||"all",i()}),e.dataset.bound="true"),t.dataset.bound!=="true"&&(t.addEventListener("change",()=>{this._chartScorecardUiState.months=Number(t.value)||12,i()}),t.dataset.bound="true"),a.dataset.bound!=="true"&&(a.addEventListener("input",()=>{this._chartScorecardUiState.search=a.value||"",i()}),a.dataset.bound="true"),r.dataset.bound!=="true"&&(r.addEventListener("click",o=>{o.preventDefault(),this._chartScorecardUiState.compact=!this._chartScorecardUiState.compact,i()}),r.dataset.bound="true"),s.dataset.bound!=="true"&&(s.addEventListener("change",()=>{this._chartScorecardUiState.chartType=s.value||"line",i()}),s.dataset.bound="true")};
