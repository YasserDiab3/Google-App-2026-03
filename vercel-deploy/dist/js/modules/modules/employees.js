const Employees={cache:{data:null,lastLoad:null,lastUpdate:null,isUpdating:!1},config:{cacheTimeout:3e5,backgroundUpdateInterval:6e5,backgroundUpdateTimer:null,_refreshedOnceForInactive:!1},activeTab:"employees-list",externalWorkforceYear:new Date().getFullYear(),_externalWorkforceLoaded:!1,_externalWorkforceLoadPromise:null,_externalWorkforceCache:new Map,_empAnalyticsCharts:{},_empAnalyticsDetailTab:"department",_empAnalyticsEventsBound:!1,_getI18nCore(){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null},t(e,t){const a=this._getI18nCore();return a?a.t(e,null,t||e):t||e},applyModuleI18n(e){const t=this._getI18nCore();if(!t)return;const a=e||document.getElementById("employees-section")||document;typeof t.applyI18n=="function"&&t.applyI18n(a),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(a)},_photoFailKey(e){return`hse_emp_photo_failed_${String(e||"").trim()}`},_getDriveIdFromUrl(e){try{const t=String(e||"").trim();if(!t)return"";const a=t.match(/[?&]id=([^&]+)/)||t.match(/\/file\/d\/([^/]+)/);return a?String(a[1]||"").trim():""}catch{return""}},_normalizeEmployeePhotoUrl(e,t=""){try{const a=typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?String(Utils.extractImageSourceCandidate(e)||"").trim():String(e||"").trim();if(!a)return"";let i=a;typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"?i=Utils.normalizeImageSource(a)||a:typeof window<"u"&&typeof window.__convertGoogleDriveUrl=="function"&&(i=window.__convertGoogleDriveUrl(a)||a);const n=this._getDriveIdFromUrl(i)||t||i;return sessionStorage.getItem(this._photoFailKey(n))?"":i}catch{return""}},_setupEmployeePhotoFallbacks(e){try{const a=(e||document).querySelectorAll('img[data-emp-photo="1"]');if(!a||a.length===0)return;a.forEach(i=>{if(!i||i.dataset._fallbackBound==="1")return;i.dataset._fallbackBound="1";const o=(i.dataset.photoKey||"").trim();i.addEventListener("error",()=>{try{o&&sessionStorage.setItem(this._photoFailKey(o),Date.now().toString())}catch{}try{const n=i.parentElement;n&&(n.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}},{passive:!0})})}catch{}},canEditOrDelete(){const e=AppState.currentUser;return e?(e.role||"").toLowerCase()==="admin":!1},canAddOrImport(){const e=AppState.currentUser;return e?(e.role||"").toLowerCase()==="admin":!1},getEmployeesDetailedPermissionsState(){try{if(typeof Permissions<"u"&&typeof Permissions.getEffectivePermissions=="function"){const a=Permissions.getEffectivePermissions()?.employeesPermissions;if(a&&typeof a=="object"&&!Array.isArray(a))return a}}catch{}const e=AppState.currentUser?.permissions?.employeesPermissions;return e&&typeof e=="object"&&!Array.isArray(e)?e:null},canViewEmployeesRegistryTab(){if(this.canAddOrImport())return!0;if(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("employees"))return!1;const e=this.getEmployeesDetailedPermissionsState();return e?e["employees-list"]!==!1:!0},canViewExternalWorkforceTab(){if(this.canAddOrImport())return!0;if(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("employees"))return!1;const e=this.getEmployeesDetailedPermissionsState();return e?e["external-workforce"]===!0:!0},canViewEmployeesAnalysisTab(){if(this.canAddOrImport())return!0;if(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("employees"))return!1;const e=this.getEmployeesDetailedPermissionsState();return e?e["data-analysis"]!==!1:!0},canManageExternalWorkforceTab(){return this.canAddOrImport()},isValidDate(e){if(!e)return!1;try{const t=new Date(e);return t instanceof Date&&!isNaN(t.getTime())}catch{return!1}},normalizeDateOnly(e){if(e==null||e==="")return"";if(e instanceof Date&&!isNaN(e.getTime())){const n=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),c=String(e.getDate()).padStart(2,"0");return`${n}-${s}-${c}`}if(typeof e=="number"&&isFinite(e))try{if(typeof XLSX<"u"&&XLSX?.SSF?.parse_date_code){const n=XLSX.SSF.parse_date_code(e);if(n&&n.y&&n.m&&n.d){const s=String(n.y).padStart(4,"0"),c=String(n.m).padStart(2,"0"),d=String(n.d).padStart(2,"0");return`${s}-${c}-${d}`}}}catch{}let t=String(e).trim();if(!t)return"";if(t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'")){try{const n=JSON.parse(t);typeof n=="string"?t=n.trim():t=t.substring(1,t.length-1).trim()}catch{t=t.substring(1,t.length-1).trim()}if(!t)return""}const a=t.match(/^(\d{4}-\d{2}-\d{2})/);if(a)return a[1];const i=t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);if(i){const n=String(i[1]).padStart(2,"0"),s=String(i[2]).padStart(2,"0");return`${i[3].length===2?`20${i[3]}`:String(i[3]).padStart(4,"0")}-${s}-${n}`}const o=t.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);if(o){const n=String(o[1]).padStart(4,"0"),s=String(o[2]).padStart(2,"0"),c=String(o[3]).padStart(2,"0");return`${n}-${s}-${c}`}try{const n=new Date(t);if(!isNaN(n.getTime())){const s=n.getFullYear(),c=String(n.getMonth()+1).padStart(2,"0"),d=String(n.getDate()).padStart(2,"0");return`${s}-${c}-${d}`}}catch{}return""},parseLocalDate(e){if(!e)return null;if(e instanceof Date&&!isNaN(e.getTime()))return e;let t=String(e).trim();if(!t)return null;if(t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'")){try{const o=JSON.parse(t);typeof o=="string"?t=o.trim():t=t.substring(1,t.length-1).trim()}catch{t=t.substring(1,t.length-1).trim()}if(!t)return null}const a=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(a){const o=Number(a[1]),n=Number(a[2])-1,s=Number(a[3]),c=new Date(o,n,s);return isNaN(c.getTime())?null:c}const i=new Date(t);return isNaN(i.getTime())?null:i},formatDateSafe(e){return this.normalizeDateOnly(e)},calculateAge(e){if(!e)return"";try{const t=this.parseLocalDate(e);if(!t)return"";const a=new Date;let i=a.getFullYear()-t.getFullYear();const o=a.getMonth()-t.getMonth();return(o<0||o===0&&a.getDate()<t.getDate())&&i--,i>=0?i:""}catch{return""}},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u")return;if(typeof AppState>"u"){const t=document.getElementById("employees-section");t&&(t.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">${this.t("module.employees.unableLoad","\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}</p>
                                <p class="text-sm text-gray-400">AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B. \u062C\u0631\u0651\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p>
                                <button onclick="location.reload()" class="btn-primary mt-4">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${this.t("module.common.refreshPage","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629")}
                                </button>
                            </div>
                        </div>
                    </div>
                `),Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}const e=document.getElementById("employees-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 employees-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u0645\u062F\u064A\u0648\u0644 Employees \u064A\u0643\u062A\u0628 \u064A \u0642\u0633\u0645: employees-section");try{const t=this.canAddOrImport();e.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-user-tie ml-3"></i>
                                ${this.t("module.employees.title","\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}
                            </h1>
                            <p class="section-subtitle">${t?this.t("module.employees.subtitleAdmin","\u0625\u062F\u0627\u0631\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0639 \u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel"):this.t("module.employees.subtitleViewer","\u0639\u0631\u0636 \u0648\u0628\u062D\u062B \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}</p>
                        </div>
                        ${t?`
                        <div class="flex gap-2">
                            <button id="import-employees-excel-btn" class="btn-secondary">
                                <i class="fas fa-file-excel ml-2"></i>
                                ${this.t("module.employees.importExcel","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel")}
                            </button>
                            <button id="add-employee-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${this.t("module.employees.addNewEmployee","\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F")}
                            </button>
                        </div>
                        `:""}
                    </div>
                </div>
                <div id="employees-content" class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">${this.t("module.employees.loadingList","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646...")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,this.applyModuleI18n(e),setTimeout(async()=>{try{const a=document.getElementById("employees-content");if(!a)return;const i=await this.renderList().catch(o=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",o),`
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                        <p class="text-gray-500 mb-4">${this.t("module.common.loadDataError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                                        <button onclick="Employees.load()" class="btn-primary">
                                            <i class="fas fa-redo ml-2"></i>
                                            ${this.t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `));a.innerHTML=i,this.applyModuleI18n(a),this.setupEventListeners(),this.activeTab==="data-analysis"&&this.canViewEmployeesAnalysisTab()?await this.loadEmployeesAnalysis():this.canViewEmployeesRegistryTab()?await this.loadEmployeesList():this.activeTab==="external-workforce"&&this.canViewExternalWorkforceTab()&&(await this.ensureExternalWorkforceDataLoaded(),this.renderExternalWorkforceTable()),setTimeout(async()=>{try{const o=this.getFilterValues();(o.search||o.department||o.branch||o.location||o.job||o.position||o.gender)&&await this.applyFilters()}catch(o){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",o)}},200)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",a)}},0),requestAnimationFrame(()=>{this.activeTab==="employees-list"&&this.scrollToSearchField()}),this.startBackgroundUpdate(),Promise.resolve().then(async()=>{try{await this.ensureEmployeesLoaded(!1),this.loadEmployeesList()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",a)}})}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",t),e&&(e.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${this.t("module.common.loadDataRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                                <button onclick="Employees.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${this.t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                                </button>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(e))}},isEmployeeInactive(e){if(!e)return!1;const t=e.status!=null&&e.status!==""?String(e.status).trim():"";return!!((e.resignationDate!=null&&e.resignationDate!==""?String(e.resignationDate).trim():"")||t==="inactive"||t.toLowerCase()==="inactive"||t==="\u063A\u064A\u0631 \u0646\u0634\u0637")},calculateStatistics(){const e=AppState.appData.employees||[];if(e.length===0)return{total:0,averageAge:0,genderStats:{male:0,female:0},averageExperience:0,inactiveCount:0};const t=e.filter(u=>!this.isEmployeeInactive(u)),a=t.length;let i=0,o=0;t.forEach(u=>{const p=this.calculateAge(u.birthDate);p&&p>0&&(i+=p,o++)});const n=o>0?Math.round(i/o):0;let s=0,c=0,d=0;const m=u=>{if(!u)return"";let p=String(u).trim().replace(/\s+/g," ").trim();return p=p.replace(/[\u200B-\u200D\uFEFF]/g,""),p},r=u=>{const p=m(u);if(!p)return{isMale:!1,isFemale:!1};const b=p.toLowerCase(),y=p.length===1?p.toUpperCase():"",f=["\u0630\u0643\u0631","male","m","M","\u0630\u0643\u0631 "," \u0630\u0643\u0631"],w=["\u0623\u0646\u062B\u0649","female","f","F","\u0623\u0646\u062B\u0649 "," \u0623\u0646\u062B\u0649"],S=p==="\u0630\u0643\u0631"||b==="male"||y==="M"||f.some(A=>m(A)===p),k=p==="\u0623\u0646\u062B\u0649"||b==="female"||y==="F"||w.some(A=>m(A)===p);return{isMale:S,isFemale:k,normalized:p}};t.forEach(u=>{const p=r(u.gender);p.isMale?s++:p.isFemale?c++:d++}),d>0&&typeof AppState<"u"&&AppState.debugMode&&typeof console<"u";let l=0,h=0;const v=new Date;t.forEach(u=>{if(u.hireDate)try{const p=this.parseLocalDate(u.hireDate);if(p){const b=v.getFullYear()-p.getFullYear(),y=v.getMonth()-p.getMonth(),f=v.getDate()-p.getDate();let w=b;(y<0||y===0&&f<0)&&w--,w>=0&&(l+=w,h++)}}catch{}});const x=h>0?(l/h).toFixed(1):0,g=e.filter(u=>this.isEmployeeInactive(u)).length;return{total:a,averageAge:n,genderStats:{male:s,female:c},averageExperience:parseFloat(x),inactiveCount:g}},ensureEmployeesStatsCardsStyles(){const e="employees-stats-cards-styles-v2";if(document.getElementById(e))return;document.getElementById("employees-stats-cards-styles")?.remove();const a=document.createElement("style");a.id=e,a.textContent=`
            #employees-stats-cards {
                align-items: start;
                gap: 1rem;
            }
            #employees-stats-cards .employee-stat-card {
                --emp-stat-accent: #2563eb;
                --emp-stat-accent-light: #eff6ff;
                display: flex !important;
                flex-direction: column;
                justify-content: flex-start;
                height: auto !important;
                min-height: 0;
                align-self: start;
                width: 100%;
                padding: 1rem 1.15rem 1.05rem;
                box-sizing: border-box;
                border-radius: 14px;
                background: linear-gradient(145deg, #ffffff 0%, var(--emp-stat-accent-light) 140%);
                border: 1px solid color-mix(in srgb, var(--emp-stat-accent) 18%, #e5e7eb);
                box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05), 0 6px 18px rgba(15, 23, 42, 0.04);
                position: relative;
                overflow: hidden;
                transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
            }
            #employees-stats-cards .employee-stat-card::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                inset-inline-end: 0;
                width: 4px;
                background: linear-gradient(180deg, var(--emp-stat-accent) 0%, color-mix(in srgb, var(--emp-stat-accent) 55%, #fff) 100%);
                border-radius: 0 14px 14px 0;
            }
            [dir="rtl"] #employees-stats-cards .employee-stat-card::before {
                border-radius: 14px 0 0 14px;
            }
            #employees-stats-cards .employee-stat-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 10px rgba(15, 23, 42, 0.07), 0 10px 24px rgba(15, 23, 42, 0.06);
                border-color: color-mix(in srgb, var(--emp-stat-accent) 32%, #e5e7eb);
            }
            #employees-stats-cards .employee-stat-card__head {
                display: flex;
                align-items: flex-start;
                gap: 0.7rem;
                margin-bottom: 0.65rem;
                position: relative;
                z-index: 1;
            }
            #employees-stats-cards .employee-stat-card__icon {
                width: 40px;
                height: 40px;
                border-radius: 11px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                background: color-mix(in srgb, var(--emp-stat-accent) 12%, #fff);
                color: var(--emp-stat-accent);
                font-size: 1rem;
                box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--emp-stat-accent) 16%, transparent);
            }
            #employees-stats-cards .employee-stat-card__meta {
                min-width: 0;
                flex: 1;
            }
            #employees-stats-cards .employee-stat-card__title {
                margin: 0;
                font-size: 0.84rem;
                font-weight: 700;
                color: #1e293b;
                line-height: 1.35;
            }
            #employees-stats-cards .employee-stat-card__desc {
                margin: 0.2rem 0 0;
                font-size: 0.72rem;
                color: #64748b;
                line-height: 1.45;
            }
            #employees-stats-cards .employee-stat-card__value {
                position: relative;
                z-index: 1;
                margin-top: 0.15rem;
                font-size: 1.65rem;
                font-weight: 800;
                line-height: 1.1;
                color: var(--emp-stat-accent);
                letter-spacing: -0.02em;
            }
            #employees-stats-cards .employee-stat-card--gender .employee-stat-gender-row {
                display: flex;
                align-items: center;
                gap: 0.55rem;
                position: relative;
                z-index: 1;
            }
            #employees-stats-cards .employee-stat-gender-item {
                flex: 1;
                min-width: 0;
                display: flex;
                align-items: baseline;
                gap: 0.35rem;
                padding: 0.45rem 0.55rem;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.72);
                box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.22);
            }
            #employees-stats-cards .employee-stat-gender-item--male {
                color: #1d4ed8;
            }
            #employees-stats-cards .employee-stat-gender-item--female {
                color: #be185d;
            }
            #employees-stats-cards .employee-stat-gender-num {
                font-size: 1.15rem;
                font-weight: 800;
                line-height: 1;
            }
            #employees-stats-cards .employee-stat-gender-label {
                font-size: 0.72rem;
                font-weight: 600;
            }
            #employees-stats-cards .employee-stat-gender-pct {
                margin-inline-start: auto;
                font-size: 0.68rem;
                font-weight: 700;
                opacity: 0.85;
            }
            #employees-stats-cards .employee-stat-gender-bar {
                margin-top: 0.55rem;
                height: 5px;
                border-radius: 999px;
                background: #e2e8f0;
                overflow: hidden;
                display: flex;
                position: relative;
                z-index: 1;
            }
            #employees-stats-cards .employee-stat-gender-bar__male {
                background: linear-gradient(90deg, #3b82f6, #2563eb);
            }
            #employees-stats-cards .employee-stat-gender-bar__female {
                background: linear-gradient(90deg, #ec4899, #db2777);
            }
            @media (max-width: 640px) {
                #employees-stats-cards .employee-stat-card {
                    min-height: 0;
                }
                #employees-stats-cards .employee-stat-card__value {
                    font-size: 1.45rem;
                }
            }
        `,document.head.appendChild(a)},renderStatsCards(){const e=document.getElementById("employees-stats-cards");if(!e)return;this.ensureEmployeesStatsCardsStyles();const t=this.calculateStatistics();this.updateInactiveCount();const a=[{id:"total",title:this.t("module.employees.stats.totalEmployees","\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),value:t.total,icon:"fas fa-users",accent:"#2563eb",accentLight:"#eff6ff",description:this.t("module.employees.stats.totalEmployeesDesc","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646")},{id:"average-age",title:this.t("module.employees.stats.avgAge","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0633\u0646"),value:t.averageAge>0?`${t.averageAge} ${this.t("module.common.yearsUnit","\u0633\u0646\u0629")}`:this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),icon:"fas fa-birthday-cake",accent:"#16a34a",accentLight:"#f0fdf4",description:this.t("module.employees.stats.avgAgeDesc","\u0645\u062A\u0648\u0633\u0637 \u0639\u0645\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")},{id:"gender",title:this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639"),isGenderCard:!0,maleCount:t.genderStats.male,femaleCount:t.genderStats.female,icon:"fas fa-venus-mars",accent:"#7c3aed",accentLight:"#f5f3ff",description:this.t("module.employees.stats.genderDistDesc","\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639")},{id:"experience",title:this.t("module.employees.stats.avgExperience","\u0645\u062A\u0648\u0633\u0637 \u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629"),value:t.averageExperience>0?`${t.averageExperience} ${this.t("module.common.yearsUnit","\u0633\u0646\u0629")}`:this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),icon:"fas fa-briefcase",accent:"#ea580c",accentLight:"#fff7ed",description:this.t("module.employees.stats.avgExperienceDesc","\u0645\u062A\u0648\u0633\u0637 \u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629 \u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646")}],i=this.t("module.employees.genderMale","\u0630\u0643\u0631"),o=this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649"),n=c=>`
            <div class="employee-stat-card__head">
                <div class="employee-stat-card__icon"><i class="${c.icon}" aria-hidden="true"></i></div>
                <div class="employee-stat-card__meta">
                    <h3 class="employee-stat-card__title">${c.title}</h3>
                    <p class="employee-stat-card__desc">${c.description}</p>
                </div>
            </div>
        `,s=c=>{const d=c.maleCount||0,m=c.femaleCount||0,r=d+m,l=r>0?Math.round(d/r*100):0,h=r>0?100-l:0;return`
                <div class="employee-stat-card employee-stat-card--gender"
                     style="--emp-stat-accent:${c.accent};--emp-stat-accent-light:${c.accentLight};">
                    ${n(c)}
                    ${r>0?`
                        <div class="employee-stat-gender-row">
                            <div class="employee-stat-gender-item employee-stat-gender-item--male" title="${i}: ${d}">
                                <span class="employee-stat-gender-num">${d.toLocaleString("en-US")}</span>
                                <span class="employee-stat-gender-label">${i}</span>
                                <span class="employee-stat-gender-pct">${l}%</span>
                            </div>
                            <div class="employee-stat-gender-item employee-stat-gender-item--female" title="${o}: ${m}">
                                <span class="employee-stat-gender-num">${m.toLocaleString("en-US")}</span>
                                <span class="employee-stat-gender-label">${o}</span>
                                <span class="employee-stat-gender-pct">${h}%</span>
                            </div>
                        </div>
                        <div class="employee-stat-gender-bar" title="${i} ${l}% / ${o} ${h}%">
                            <div class="employee-stat-gender-bar__male" style="width:${l}%"></div>
                            <div class="employee-stat-gender-bar__female" style="width:${h}%"></div>
                        </div>
                    `:`
                        <div class="employee-stat-card__value">${this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D")}</div>
                    `}
                </div>
            `};e.innerHTML=a.map(c=>{if(c.isGenderCard)return s(c);const d=typeof c.value=="number"?c.value.toLocaleString("en-US"):c.value;return`
                <div class="employee-stat-card"
                     style="--emp-stat-accent:${c.accent};--emp-stat-accent-light:${c.accentLight};">
                    ${n(c)}
                    <div class="employee-stat-card__value">${d}</div>
                </div>
            `}).join("")},getExternalWorkforceMonths(){const e=this.getExternalWorkforceViewState(),t=new Intl.DateTimeFormat(e.lang==="en"?"en-US":"ar-EG",{month:"short"});return[{key:"jan",index:0},{key:"feb",index:1},{key:"mar",index:2},{key:"apr",index:3},{key:"may",index:4},{key:"jun",index:5},{key:"jul",index:6},{key:"aug",index:7},{key:"sep",index:8},{key:"oct",index:9},{key:"nov",index:10},{key:"dec",index:11}].map(a=>({...a,label:t.format(new Date(2026,a.index,1))}))},getExternalWorkforceViewState(){const e=typeof I18n<"u"&&typeof I18n.getCurrentLanguage=="function"?I18n.getCurrentLanguage():AppState?.currentLanguage||localStorage.getItem("language")||"ar",t=typeof I18n<"u"&&typeof I18n.isRTL=="function"?I18n.isRTL():e==="ar";return{lang:e,isRTL:t,dir:t?"rtl":"ltr",stickySide:t?"right":"left",textAlign:t?"right":"left",labels:{employeesTab:e==="en"?"Employee Database":"\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",externalTab:e==="en"?"External Workforce / Contractors":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",contractor:e==="en"?"Company / Contractor":"\u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644",noCode:e==="en"?"No code":"\u0628\u062F\u0648\u0646 \u0643\u0648\u062F",total:"Total",externalTotal:e==="en"?"Total External Workforce":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629",directEmployees:e==="en"?"Direct Employees":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062B\u0628\u062A\u0629",combinedTotal:e==="en"?"Combined Total":"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u062A\u0631\u0643",estimatedHours:e==="en"?"Estimated Work Hours":"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629"}}},getExternalWorkforceRecords(){return(!AppState.appData||typeof AppState.appData!="object")&&(AppState.appData={}),Array.isArray(AppState.appData.externalWorkforceMonthly)||(AppState.appData.externalWorkforceMonthly=[]),AppState.appData.externalWorkforceMonthly},getExternalWorkforceYearOptions(){const e=new Set([this.externalWorkforceYear,new Date().getFullYear(),new Date().getFullYear()-1]);return this.getExternalWorkforceRecords().forEach(t=>{const a=Number(t?.year);Number.isFinite(a)&&a>2e3&&e.add(a)}),Array.from(e).sort((t,a)=>a-t)},normalizeExternalWorkforceContractor(e={},t=0){const a=c=>String(c||"").replace(/\s+/g," ").trim(),i=a(e.contractorId||e.id),o=a(e.contractorCode||e.code||e.isoCode),n=a(e.contractorName||e.companyName||e.name||e.company||`Contractor ${t+1}`),s=(o||i||n.toLowerCase()).toLowerCase();return{contractorId:i,contractorCode:o,contractorName:n,stableKey:s}},async ensureExternalWorkforceDataLoaded(e=!1){if(this._externalWorkforceLoaded&&!e)return!0;if(this._externalWorkforceLoadPromise&&!e)return this._externalWorkforceLoadPromise;const t=AppState.appData||(AppState.appData={}),a=[];return(!Array.isArray(t.approvedContractors)||t.approvedContractors.length===0)&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function"&&a.push(GoogleIntegration.readFromSheets("ApprovedContractors",15e3).then(i=>{Array.isArray(i)&&(t.approvedContractors=i)}).catch(()=>{})),(e||!Array.isArray(t.externalWorkforceMonthly)||t.externalWorkforceMonthly.length===0)&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function"&&a.push(GoogleIntegration.readFromSheets("ExternalWorkforceMonthly",15e3).then(i=>{Array.isArray(i)&&(t.externalWorkforceMonthly=i)}).catch(()=>{})),this._externalWorkforceLoadPromise=Promise.allSettled(a).then(()=>(this._externalWorkforceLoaded=!0,!0)).finally(()=>{this._externalWorkforceLoadPromise=null}),this._externalWorkforceLoadPromise},getAvailableContractorsForExternalWorkforce(){let e=[];try{typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"&&(e=Contractors.getAllContractorsForModules()||[])}catch{e=[]}(!Array.isArray(e)||e.length===0)&&(e=(AppState.appData.approvedContractors||[]).filter(a=>a&&a.isActive!=="inactive"&&a.isActive!==!1&&a.isActive!=="false"&&a.isActive!=="FALSE"));const t=new Map;return e.forEach((a,i)=>{const o=this.normalizeExternalWorkforceContractor(a,i);!o.stableKey||t.has(o.stableKey)||t.set(o.stableKey,o)}),Array.from(t.values()).sort((a,i)=>a.contractorName.localeCompare(i.contractorName,"ar"))},getExternalWorkforceRecord(e,t){return this.getExternalWorkforceRecords().find(a=>a&&Number(a.year)===Number(e)&&this.normalizeExternalWorkforceContractor(a).stableKey===t)||null},getExternalWorkforceMonthlyValue(e,t){const a=parseFloat(e?.[t]);return Number.isFinite(a)&&a>=0?a:0},getOperationalEmployeesForMonth(e,t=this.externalWorkforceYear){const a=AppState.appData.employees||[],i=new Date(t,e+1,0,23,59,59,999);return a.filter(o=>{if(!o)return!1;const n=this.parseLocalDate(o.hireDate||o.startDate||o.createdAt),s=this.parseLocalDate(o.resignationDate||o.endDate||o.terminationDate);return!(n&&n>i||s&&s<=i||this.isEmployeeInactive(o)&&!s)}).length},buildExternalWorkforceModel(e=this.externalWorkforceYear){const t=(l=[],h=[])=>{if(!Array.isArray(l)||l.length===0)return"0:0";let v=0;return l.forEach(x=>{const g=h.map(p=>x?.[p]).find(Boolean),u=g?new Date(g):null;u&&!Number.isNaN(u.getTime())&&(v=Math.max(v,u.getTime()))}),`${l.length}:${v}`},a=`external:${e}:${t(this.getExternalWorkforceRecords(),["updatedAt","createdAt"])}:${t(AppState.appData.approvedContractors||[],["updatedAt","createdAt","approvalDate"])}:${t(AppState.appData.employees||[],["updatedAt","createdAt","hireDate","resignationDate"])}`;if(this._externalWorkforceCache.has(a))return this._externalWorkforceCache.get(a);const i=this.getExternalWorkforceMonths(),n=this.getAvailableContractorsForExternalWorkforce().map(l=>{const h=this.getExternalWorkforceRecord(e,l.stableKey)||{},v=i.map(x=>this.getExternalWorkforceMonthlyValue(h,x.key));return{...l,recordId:h.id||`EWM-${e}-${l.stableKey}`,values:v,total:v.reduce((x,g)=>x+g,0)}}),s=i.map((l,h)=>n.reduce((v,x)=>v+(x.values[h]||0),0)),c=i.map(l=>this.getOperationalEmployeesForMonth(l.index,e)),d=i.map((l,h)=>c[h]+s[h]),m=d.map(l=>l*8*22),r={year:e,months:i,rows:n,monthTotals:s,directEmployees:c,combined:d,estimatedHours:m,grandTotal:s.reduce((l,h)=>l+h,0)};return this._externalWorkforceCache.clear(),this._externalWorkforceCache.set(a,r),r},renderExternalWorkforcePanel(){const e=this.canManageExternalWorkforceTab(),t=this.getExternalWorkforceViewState(),a={title:t.lang==="en"?"External Workforce / Contractors":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",description:t.lang==="en"?"Monthly table linked to approved contractors and used automatically in Safety Performance Scorecard to calculate combined headcount and work hours.":"\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.",year:t.lang==="en"?"Year":"\u0627\u0644\u0633\u0646\u0629",admin:t.lang==="en"?"Admin Edit":"\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A",viewOnly:t.lang==="en"?"View Only":"\u0639\u0631\u0636 \u0641\u0642\u0637",exportExcel:t.lang==="en"?"Export Excel":"\u062A\u0635\u062F\u064A\u0631 Excel",exportPdf:t.lang==="en"?"Export PDF":"\u062A\u0635\u062F\u064A\u0631 PDF",importExcel:t.lang==="en"?"Import Excel":"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0643\u0633\u064A\u0644"};return a.title=t.lang==="en"?"External Workforce / Contractors":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",a.description=t.lang==="en"?"Monthly table linked to approved contractors and used automatically in Safety Performance Scorecard to calculate combined headcount and work hours.":"\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.",a.year=t.lang==="en"?"Year":"\u0627\u0644\u0633\u0646\u0629",a.admin=t.lang==="en"?"Admin Edit":"\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A",a.viewOnly=t.lang==="en"?"View Only":"\u0639\u0631\u0636 \u0641\u0642\u0637",a.exportExcel=t.lang==="en"?"Export Excel":"\u062A\u0635\u062F\u064A\u0631 Excel",a.exportPdf=t.lang==="en"?"Export PDF":"\u062A\u0635\u062F\u064A\u0631 PDF",a.importExcel=t.lang==="en"?"Import Excel":"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0643\u0633\u064A\u0644",`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h2 class="card-title">
                                <i class="fas fa-helmet-safety ml-2"></i>
                                \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                            </h2>
                            <p class="text-sm text-gray-600 mt-2">\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.</p>
                        </div>
                        <div class="flex items-center gap-3 flex-wrap">
                            <label class="text-sm font-semibold text-gray-700" for="external-workforce-year">\u0627\u0644\u0633\u0646\u0629</label>
                            <select id="external-workforce-year" class="form-input" style="min-width: 120px;"></select>
                            ${e?'<span class="text-xs px-3 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A</span>':'<span class="text-xs px-3 py-2 rounded-full bg-gray-100 text-gray-600 font-semibold">\u0639\u0631\u0636 \u0641\u0642\u0637</span>'}
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="external-workforce-summary" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6"></div>
                    <div class="table-wrapper" style="overflow-x: auto;">
                        <div id="external-workforce-table-container"></div>
                    </div>
                </div>
            </div>
        `},populateExternalWorkforceYearSelector(){const e=document.getElementById("external-workforce-year");e&&(e.innerHTML=this.getExternalWorkforceYearOptions().map(t=>`<option value="${t}" ${t===this.externalWorkforceYear?"selected":""}>${t}</option>`).join(""))},renderExternalWorkforceSummary(e){const t=document.getElementById("external-workforce-summary");if(!t||!e)return;const a=e.year===new Date().getFullYear()?new Date().getMonth():11,i=e.monthTotals.slice(0,a+1).reduce((d,m)=>d+m,0),o=e.directEmployees.slice(0,a+1).reduce((d,m)=>d+m,0),n=e.combined.slice(0,a+1).reduce((d,m)=>d+m,0),s=e.estimatedHours.slice(0,a+1).reduce((d,m)=>d+m,0),c=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 YTD",value:i,color:"#0ea5e9",icon:"fa-users-viewfinder"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062B\u0628\u062A\u0629 YTD",value:o,color:"#2563eb",icon:"fa-user-check"},{label:"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u062A\u0631\u0643 YTD",value:n,color:"#16a34a",icon:"fa-people-group"},{label:"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629 YTD",value:s.toLocaleString("en-US"),color:"#f59e0b",icon:"fa-clock"}];t.innerHTML=c.map(d=>`
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <div class="text-sm font-semibold text-gray-500">${d.label}</div>
                        <div class="text-3xl font-black mt-3" style="color:${d.color};">${d.value}</div>
                    </div>
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style="background:${d.color};">
                        <i class="fas ${d.icon}"></i>
                    </div>
                </div>
            </div>
        `).join("")},ensureExternalWorkforceToolbar(){const e=document.getElementById("employees-external-panel");if(!e)return;const t=e.querySelector(".card-header"),a=e.querySelector(".card-title"),i=e.querySelector(".card-header p"),o=e.querySelector('label[for="external-workforce-year"]'),n=e.querySelector(".rounded-full"),s=o?.parentElement,c=this.canManageExternalWorkforceTab(),d=this.getExternalWorkforceViewState().labels,m={description:this.getExternalWorkforceViewState().lang==="en"?"Monthly table linked to approved contractors and used automatically in Safety Performance Scorecard to calculate combined headcount and work hours.":"\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.",year:this.getExternalWorkforceViewState().lang==="en"?"Year":"\u0627\u0644\u0633\u0646\u0629",admin:this.getExternalWorkforceViewState().lang==="en"?"Admin Edit":"\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A",viewOnly:this.getExternalWorkforceViewState().lang==="en"?"View Only":"\u0639\u0631\u0636 \u0641\u0642\u0637",exportExcel:this.getExternalWorkforceViewState().lang==="en"?"Export Excel":"\u062A\u0635\u062F\u064A\u0631 Excel",exportPdf:this.getExternalWorkforceViewState().lang==="en"?"Export PDF":"\u062A\u0635\u062F\u064A\u0631 PDF",importExcel:this.getExternalWorkforceViewState().lang==="en"?"Import Excel":"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0643\u0633\u064A\u0644"};if(a&&(a.innerHTML=`<i class="fas fa-helmet-safety ml-2"></i>${d.externalTab}`),i&&(i.textContent=m.description),o&&(o.textContent=m.year),n&&(n.textContent=c?m.admin:m.viewOnly),!s)return;let r=document.getElementById("external-workforce-actions");r||(r=document.createElement("div"),r.id="external-workforce-actions",r.className="flex items-center gap-3 flex-wrap",r.innerHTML=`
                <button type="button" id="external-workforce-export-excel-btn" class="btn-secondary">
                    <i class="fas fa-file-excel ml-2"></i>
                    <span></span>
                </button>
                <button type="button" id="external-workforce-export-pdf-btn" class="btn-secondary">
                    <i class="fas fa-file-pdf ml-2"></i>
                    <span></span>
                </button>
                ${c?`
                <button type="button" id="external-workforce-import-excel-btn" class="btn-secondary">
                    <i class="fas fa-file-import ml-2"></i>
                    <span></span>
                </button>
                <input type="file" id="external-workforce-import-input" accept=".xlsx,.xls" style="display:none;">
                `:""}
            `,s.insertBefore(r,s.firstChild));const l=r.querySelector("#external-workforce-export-excel-btn span"),h=r.querySelector("#external-workforce-export-pdf-btn span"),v=r.querySelector("#external-workforce-import-excel-btn span");l&&(l.textContent=m.exportExcel),h&&(h.textContent=m.exportPdf),v&&(v.textContent=m.importExcel)},getExternalWorkforceExportRows(e=this.externalWorkforceYear){const t=this.buildExternalWorkforceModel(e),a=this.getExternalWorkforceViewState().labels,i=[a.contractor,"Code",...t.months.map(n=>n.label),a.total],o=t.rows.map(n=>[n.contractorName,n.contractorCode||n.contractorId||"",...n.values,n.total]);return o.push([a.externalTotal,"",...t.monthTotals,t.grandTotal]),o.push([a.directEmployees,"",...t.directEmployees,t.directEmployees.reduce((n,s)=>n+s,0)]),o.push([a.combinedTotal,"",...t.combined,t.combined.reduce((n,s)=>n+s,0)]),o.push([a.estimatedHours,"",...t.estimatedHours,t.estimatedHours.reduce((n,s)=>n+s,0)]),{model:t,header:i,rows:o}},exportExternalWorkforceToExcel(){if(typeof XLSX>"u"){Notification.error("XLSX library is not available");return}const{model:e,header:t,rows:a}=this.getExternalWorkforceExportRows(),i=XLSX.utils.book_new(),o=XLSX.utils.aoa_to_sheet([t,...a]);XLSX.utils.book_append_sheet(i,o,"External Workforce"),XLSX.writeFile(i,`external_workforce_${e.year}_${new Date().toISOString().slice(0,10)}.xlsx`)},exportExternalWorkforceToPDF(){const{model:e,header:t,rows:a}=this.getExternalWorkforceExportRows(),i=this.getExternalWorkforceViewState(),o=`${i.labels.externalTab} - ${e.year}`,n=new Date().toISOString(),s=[t,...a].map((h,v)=>`
            <tr>
                ${h.map(x=>`<${v===0?"th":"td"}>${Utils.escapeHTML(String(x??""))}</${v===0?"th":"td"}>`).join("")}
            </tr>
        `).join(""),c=`
            <style>
                .external-workforce-report {
                    direction: ${i.dir};
                    font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
                }
                .external-workforce-report__meta {
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
                .external-workforce-report__meta strong {
                    color: #0F172A;
                }
                .external-workforce-report__table {
                    width: 100%;
                    border-collapse: collapse;
                    table-layout: fixed;
                    direction: ${i.dir};
                }
                .external-workforce-report__table th,
                .external-workforce-report__table td {
                    border: 1px solid #334155;
                    padding: 8px 6px;
                    text-align: center;
                    font-size: 11px;
                    word-break: break-word;
                }
                .external-workforce-report__table th {
                    background: #B7D2EA;
                    color: #102A43;
                    font-weight: 700;
                }
                .external-workforce-report__table td:first-child,
                .external-workforce-report__table th:first-child {
                    font-weight: 700;
                    background: #DCEAF7;
                }
                @media print {
                    .external-workforce-report__meta {
                        break-inside: avoid;
                    }
                }
            </style>
            <div class="external-workforce-report" dir="${i.dir}" lang="${i.lang}">
                <div class="external-workforce-report__meta">
                    <div><strong>${Utils.escapeHTML(i.labels.year)}:</strong> ${Utils.escapeHTML(String(e.year))}</div>
                    <div><strong>${Utils.escapeHTML(i.labels.externalTab)}</strong></div>
                    <div><strong>${Utils.escapeHTML(i.labels.totalHoursYtd||"YTD Hours")}:</strong> ${Utils.escapeHTML(String(e.hoursYtd||0))}</div>
                </div>
                <table class="external-workforce-report__table">${s}</table>
            </div>
        `,d=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(`EXT-WORKFORCE-${e.year}`,o,c,!1,!0,{version:"1.0",source:"ExternalWorkforceMonthly",reportYear:e.year,releaseDate:n,revisionDate:n},n,n):`<!DOCTYPE html><html lang="${i.lang}" dir="${i.dir}"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(o)}</title></head><body style="font-family:'Cairo','Segoe UI',Tahoma,Arial,sans-serif;direction:${i.dir};padding:20px;">${c}</body></html>`,m=new Blob(["\uFEFF"+d],{type:"text/html;charset=utf-8"}),r=URL.createObjectURL(m),l=window.open(r,"_blank");if(!l){URL.revokeObjectURL(r),Notification.error("Unable to open print window");return}l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(r),1e3)},400)}},async importExternalWorkforceExcelFile(e){if(!(!e||!this.canManageExternalWorkforceTab())){if(typeof XLSX>"u"){Notification.error("XLSX library is not available");return}Loading.show();try{const t=await e.arrayBuffer(),a=XLSX.read(t,{type:"array",cellDates:!0}),i=a.Sheets[a.SheetNames[0]],o=XLSX.utils.sheet_to_json(i,{header:1,defval:"",raw:!1});if(!Array.isArray(o)||o.length<2)throw new Error("File is empty");const n=o[0].map(g=>String(g||"").trim().toLowerCase()),s=this.getAvailableContractorsForExternalWorkforce(),c=Number(this.externalWorkforceYear),d={jan:0,january:0,feb:1,february:1,mar:2,march:2,apr:3,april:3,may:4,jun:5,june:5,jul:6,july:6,aug:7,august:7,sep:8,sept:8,september:8,oct:9,october:9,nov:10,november:10,dec:11,december:11,\u064A\u0646\u0627\u064A\u0631:0,\u0641\u0628\u0631\u0627\u064A\u0631:1,\u0645\u0627\u0631\u0633:2,\u0623\u0628\u0631\u064A\u0644:3,\u0627\u0628\u0631\u064A\u0644:3,\u0645\u0627\u064A\u0648:4,\u064A\u0648\u0646\u064A\u0648:5,\u064A\u0648\u0644\u064A\u0648:6,\u0623\u063A\u0633\u0637\u0633:7,\u0627\u063A\u0633\u0637\u0633:7,\u0633\u0628\u062A\u0645\u0628\u0631:8,\u0623\u0643\u062A\u0648\u0628\u0631:9,\u0627\u0643\u062A\u0648\u0628\u0631:9,\u0646\u0648\u0641\u0645\u0628\u0631:10,\u062F\u064A\u0633\u0645\u0628\u0631:11},m=this.getExternalWorkforceMonths().map(g=>g.key),r=n.findIndex(g=>g.includes("contractor")||g.includes("company")||g.includes("\u0627\u0644\u0634\u0631\u0643\u0629")||g.includes("\u0627\u0644\u0645\u0642\u0627\u0648\u0644")),l=n.findIndex(g=>g==="code"||g.includes("contractor code")||g.includes("\u0627\u0644\u0643\u0648\u062F")),h={};n.forEach((g,u)=>{const p=g.replace(/\./g,"").trim();d[p]!==void 0&&(h[m[d[p]]]=u)});const v=this.getExternalWorkforceRecords();let x=0;o.slice(1).forEach(g=>{const u=r>=0?String(g[r]||"").trim():"",p=l>=0?String(g[l]||"").trim():"";if(!u&&!p)return;const b=s.find(f=>p&&(f.contractorCode||"").trim().toLowerCase()===p.toLowerCase()||u&&f.contractorName.trim().toLowerCase()===u.toLowerCase());if(!b)return;let y=this.getExternalWorkforceRecord(c,b.stableKey);y||(y={id:`EWM-${c}-${b.stableKey}`,year:c,contractorId:b.contractorId||"",contractorCode:b.contractorCode||"",contractorName:b.contractorName||"",createdAt:new Date().toISOString()},v.push(y)),m.forEach(f=>{const w=h[f];w!==void 0&&(y[f]=Math.max(0,parseInt(g[w]||"0",10)||0))}),y.total=m.reduce((f,w)=>f+(parseInt(y[w]||"0",10)||0),0),y.updatedAt=new Date().toISOString(),y.updatedBy=AppState.currentUser?.name||AppState.currentUser?.email||"admin",x+=1}),this._externalWorkforceCache.clear(),this.renderExternalWorkforceTable(),typeof DataManager<"u"&&typeof DataManager.save=="function"&&DataManager.save(),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.autoSave=="function"&&await GoogleIntegration.autoSave("ExternalWorkforceMonthly",v).catch(()=>{}),window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{externalWorkforce:!0,year:c}})),Notification.success(`Imported ${x} rows successfully`)}catch(t){Notification.error(`Failed to import file: ${t.message}`)}finally{Loading.hide()}}},renderExternalWorkforceTable(){const e=document.getElementById("external-workforce-table-container");if(!e)return;const t=this.buildExternalWorkforceModel(this.externalWorkforceYear),a=this.getExternalWorkforceViewState(),{dir:i,stickySide:o,textAlign:n,labels:s}=a;this.renderExternalWorkforceSummary(t);const c=this.canManageExternalWorkforceTab(),d=t.months.map(f=>`<th style="min-width: 74px;">${f.label}</th>`).join(""),m=t.rows.map((f,w)=>{const S=t.months.map((k,A)=>{const L=f.values[A]||0;return`<td style="background:#dceaf6;">${c?`<input type="number" min="0" step="1" class="form-input external-workforce-input" style="min-width:70px;text-align:center;padding:6px 8px;" value="${L}" data-row="${w}" data-contractor-key="${f.stableKey}" data-month="${k.key}" />`:`<span class="font-semibold text-slate-700">${L}</span>`}</td>`}).join("");return`
                <tr>
                    <td class="sticky-cell" style="background:#c7dcef; font-weight:700; text-align:${n};">
                        <div>${Utils.escapeHTML(f.contractorName)}</div>
                        <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(f.contractorCode||f.contractorId||"\u0628\u062F\u0648\u0646 \u0643\u0648\u062F")}</div>
                    </td>
                    ${S}
                    <td style="background:#dceaf6; font-weight:800;">${f.total}</td>
                </tr>
            `}).join(""),r=t.monthTotals.map(f=>`<td style="background:#fff6cf; font-weight:800;">${f}</td>`).join(""),l=t.directEmployees.map(f=>`<td style="background:#eef2ff; font-weight:700;">${f}</td>`).join(""),h=t.combined.map(f=>`<td style="background:#ecfdf5; font-weight:800;">${f}</td>`).join(""),v=t.estimatedHours.map(f=>`<td style="background:#fff7ed; font-weight:700;">${f.toLocaleString("en-US")}</td>`).join("");e.innerHTML=`
            <style>
                .external-workforce-table { width: max-content; min-width: 100%; border-collapse: collapse; direction: ltr; }
                .external-workforce-table th, .external-workforce-table td { border: 1px solid #1f2937; padding: 8px; text-align: center; white-space: nowrap; }
                .external-workforce-table thead th { background: #b7d2ea; font-weight: 800; }
                @media (max-width: 768px) {
                    .external-workforce-table th, .external-workforce-table td { padding: 6px; font-size: 12px; }
                }
            </style>
            <table class="external-workforce-table">
                <thead>
                    <tr>
                        <th class="sticky-cell" style="position:sticky; right:0; min-width:240px; z-index:2; text-align:right;">\u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                        ${d}
                        <th style="min-width:80px;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${m}
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#fff6cf; z-index:1; font-weight:800; text-align:right;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</td>
                        ${r}
                        <td style="background:#fff6cf; font-weight:900;">${t.grandTotal}</td>
                    </tr>
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#eef2ff; z-index:1; font-weight:800; text-align:right;">\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062B\u0628\u062A\u0629</td>
                        ${l}
                        <td style="background:#eef2ff; font-weight:900;">${t.directEmployees.reduce((f,w)=>f+w,0)}</td>
                    </tr>
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#ecfdf5; z-index:1; font-weight:800; text-align:right;">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u062A\u0631\u0643</td>
                        ${h}
                        <td style="background:#ecfdf5; font-weight:900;">${t.combined.reduce((f,w)=>f+w,0)}</td>
                    </tr>
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#fff7ed; z-index:1; font-weight:800; text-align:right;">\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629</td>
                        ${v}
                        <td style="background:#fff7ed; font-weight:900;">${t.estimatedHours.reduce((f,w)=>f+w,0).toLocaleString("en-US")}</td>
                    </tr>
                </tbody>
            </table>
        `;const x=e.querySelector(".external-workforce-table");if(!x)return;let g=e.querySelector(".external-workforce-shell");g||(g=document.createElement("div"),g.className="external-workforce-shell",x.parentNode.insertBefore(g,x),g.appendChild(x)),g.setAttribute("dir",i),Object.assign(g.style,{width:"100%",maxWidth:"100%",maxHeight:"min(70vh, calc(100vh - 260px))",overflow:"auto",border:"1px solid #cbd5e1",borderRadius:"18px",background:"#ffffff"}),Object.assign(x.style,{width:"max(100%, 1180px)",borderCollapse:"separate",borderSpacing:"0",direction:i,tableLayout:"fixed"}),x.querySelectorAll("th, td").forEach(f=>{f.style.padding="clamp(6px, 0.7vw, 10px)",f.style.fontSize="clamp(11px, 0.85vw, 14px)"});const u=Array.from(x.querySelectorAll("thead th"));u.forEach(f=>{f.style.position="sticky",f.style.top="0",f.style.zIndex="4",f.style.background="#b7d2ea"}),u[0]&&(u[0].textContent=s.contractor,u[0].classList.add("sticky-cell"),u[0].style.textAlign=n),u[u.length-1]&&(u[u.length-1].textContent=s.total),x.querySelectorAll(".sticky-cell").forEach(f=>{f.style.position="sticky",f.style.left="",f.style.right="",f.style[o]="0",f.style.zIndex=f.closest("thead")?"6":"2",f.style.minWidth="clamp(170px, 18vw, 240px)",f.style.maxWidth="clamp(170px, 18vw, 260px)",f.style.whiteSpace="normal",f.style.wordBreak="break-word"});const p=Array.from(x.querySelectorAll("tbody tr"));p.slice(0,t.rows.length).forEach((f,w)=>{const S=f.querySelector(".sticky-cell"),k=t.rows[w];!S||!k||(S.style.textAlign=n,S.innerHTML=`
                <div>${Utils.escapeHTML(k.contractorName)}</div>
                <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(k.contractorCode||k.contractorId||s.noCode)}</div>
            `)});const y=[s.externalTotal,s.directEmployees,s.combinedTotal,s.estimatedHours];p.slice(-4).forEach((f,w)=>{const S=f.querySelector(".sticky-cell");S&&(S.textContent=y[w]||S.textContent,S.style.textAlign=n)}),x.querySelectorAll(".external-workforce-input").forEach(f=>{f.style.width="100%",f.style.minWidth="0",f.style.height=window.innerWidth<=768?"32px":"36px",f.style.padding="6px 8px",f.style.textAlign="center"}),window.innerWidth<=768&&(g.style.maxHeight="min(62vh, calc(100vh - 220px))",x.style.width="max(100%, 980px)")},async saveExternalWorkforceValue(e,t,a){if(!this.canManageExternalWorkforceTab())return;const i=this.getAvailableContractorsForExternalWorkforce().find(c=>c.stableKey===e);if(!i)return;const o=Number(this.externalWorkforceYear),n=this.getExternalWorkforceRecords();let s=this.getExternalWorkforceRecord(o,e);s||(s={id:`EWM-${o}-${e}`,year:o,contractorId:i.contractorId||"",contractorCode:i.contractorCode||"",contractorName:i.contractorName||"",createdAt:new Date().toISOString()},n.push(s)),s[t]=Math.max(0,parseInt(a||"0",10)||0),s.total=this.getExternalWorkforceMonths().reduce((c,d)=>c+(parseInt(s[d.key]||"0",10)||0),0),s.updatedAt=new Date().toISOString(),s.updatedBy=AppState.currentUser?.name||AppState.currentUser?.email||"admin",this._externalWorkforceCache.clear(),this.renderExternalWorkforceTable(),typeof DataManager<"u"&&typeof DataManager.save=="function"&&DataManager.save(),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.autoSave=="function"&&GoogleIntegration.autoSave("ExternalWorkforceMonthly",n).catch(()=>{}),window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{externalWorkforce:!0,year:o}}))},_empChartPalette(){return["#1d4ed8","#3b82f6","#6366f1","#8b5cf6","#0ea5e9","#2563eb","#4f46e5","#7c3aed","#0284c7","#1e40af","#4338ca","#5b21b6"]},_empAnalyticsLabel(e){return String(e||"").trim()||this.t("module.employees.analytics.unknown","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")},_empNormalizeGenderForAnalytics(e){if(!e)return"unknown";let t=String(e).trim().replace(/\s+/g," ").replace(/[\u200B-\u200D\uFEFF]/g,"");const a=t.toLowerCase();return t==="\u0630\u0643\u0631"||a==="male"||a==="m"?"male":t==="\u0623\u0646\u062B\u0649"||a==="female"||a==="f"?"female":"unknown"},_empGetExperienceYears(e){if(!e?.hireDate)return null;try{const t=this.parseLocalDate(e.hireDate);if(!t)return null;const a=new Date;let i=a.getFullYear()-t.getFullYear();const o=a.getMonth()-t.getMonth(),n=a.getDate()-t.getDate();return(o<0||o===0&&n<0)&&i--,i>=0?i:null}catch{return null}},async _empEnsureChartJs(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{let a=0;const i=setInterval(()=>{typeof Chart<"u"?(clearInterval(i),t(!0)):++a>50&&(clearInterval(i),t(!1))},100)}):new Promise(t=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",a.onload=()=>t(!0),a.onerror=()=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>t(!1),document.head.appendChild(i)},document.head.appendChild(a)})},_empDestroyAnalyticsCharts(){const e=this._empAnalyticsCharts||{};Object.keys(e).forEach(t=>{try{e[t]?.destroy?.()}catch{}}),this._empAnalyticsCharts={}},_empGetAnalyticsFiltersFromDom(){const e=t=>{const a=document.getElementById(t);return a?String(a.value||"").trim():""};return{department:e("emp-af-department"),job:e("emp-af-job"),branch:e("emp-af-branch"),location:e("emp-af-location"),position:e("emp-af-position"),gender:e("emp-af-gender"),status:e("emp-af-status")}},_empFilterIdMap(){return{department:"emp-af-department",job:"emp-af-job",branch:"emp-af-branch",location:"emp-af-location",position:"emp-af-position",gender:"emp-af-gender",status:"emp-af-status"}},_empApplyAnalyticsFilter(e,t,a={}){const o=this._empFilterIdMap()[e];if(o){const n=document.getElementById(o);n&&(n.value=t||"")}this._empUpdateAnalyticsFilterBadge(),a.skipUpdate||this.updateEmployeesAnalyticsDashboard()},_empClearAnalyticsFilters(){Object.values(this._empFilterIdMap()).forEach(e=>{const t=document.getElementById(e);t&&(t.value="")}),this._empUpdateAnalyticsFilterBadge(),this.updateEmployeesAnalyticsDashboard()},_empUpdateAnalyticsFilterBadge(){const e=this._empGetAnalyticsFiltersFromDom(),t=Object.values(e).filter(Boolean).length,a=document.getElementById("emp-filter-active-badge");a&&(a.style.display=t>0?"inline":"none",a.textContent=t>0?String(t):"");const i=document.getElementById("emp-filter-results-count");i&&i.dataset.baseCount&&(i.textContent=i.dataset.baseCount)},_empFilterEmployeesForAnalytics(e,t){return(Array.isArray(e)?e:[]).filter(i=>{if(!i||t.status==="active"&&this.isEmployeeInactive(i)||t.status==="inactive"&&!this.isEmployeeInactive(i)||t.department&&this._empAnalyticsLabel(i.department)!==t.department||t.job&&this._empAnalyticsLabel(i.job)!==t.job||t.branch&&this._empAnalyticsLabel(i.branch)!==t.branch||t.location&&this._empAnalyticsLabel(i.location)!==t.location||t.position&&this._empAnalyticsLabel(i.position)!==t.position)return!1;if(t.gender){const o=this._empNormalizeGenderForAnalytics(i.gender);if(t.gender==="male"&&o!=="male"||t.gender==="female"&&o!=="female")return!1}return!0})},_empAggregateGroupStats(e,t){const a={};(e||[]).forEach(o=>{const n=this._empAnalyticsLabel(o[t]);a[n]||(a[n]={label:n,count:0,male:0,female:0,ageSum:0,ageCount:0,expSum:0,expCount:0});const s=a[n];s.count++;const c=this._empNormalizeGenderForAnalytics(o.gender);c==="male"?s.male++:c==="female"&&s.female++;const d=Number(this.calculateAge(o.birthDate));d>0&&(s.ageSum+=d,s.ageCount++);const m=this._empGetExperienceYears(o);m!==null&&(s.expSum+=m,s.expCount++)});const i=(e||[]).length||1;return Object.values(a).map(o=>({...o,percent:Math.round(o.count/i*100),avgAge:o.ageCount>0?Math.round(o.ageSum/o.ageCount):0,avgExperience:o.expCount>0?(o.expSum/o.expCount).toFixed(1):0})).sort((o,n)=>n.count-o.count)},buildEmployeeAnalyticsDataset(e,t={}){const a=this._empFilterEmployeesForAnalytics(e,t),i=a.filter(E=>!this.isEmployeeInactive(E)),o=a.filter(E=>this.isEmployeeInactive(E)),n=a.length,s=i.length,c=o.length,d=this._empAggregateGroupStats(a,"department"),m=this._empAggregateGroupStats(a,"job"),r=this._empAggregateGroupStats(a,"branch"),l=this._empAggregateGroupStats(a,"location"),h=this._empAggregateGroupStats(a,"position"),v={};a.forEach(E=>{const I=this._empAnalyticsLabel(E.department),T=this._empAnalyticsLabel(E.job),D=I+"|||"+T;v[D]=(v[D]||0)+1});const x={"18-25":0,"26-35":0,"36-45":0,"46-55":0,"55+":0,unknown:0},g={"0-2":0,"3-5":0,"6-10":0,"11-15":0,"15+":0,unknown:0},u={};let p=0,b=0,y=0,f=0,w=0,S=0;const k=["employeeNumber","name","department","job","nationalId","birthDate","hireDate","gender","phone","email","branch","location","position"],A=k.map(E=>({field:E,filled:0,missing:0}));a.forEach(E=>{const I=this._empNormalizeGenderForAnalytics(E.gender);I==="male"?w++:I==="female"&&S++;const T=Number(this.calculateAge(E.birthDate));T>0?(p+=T,b++,T<=25?x["18-25"]++:T<=35?x["26-35"]++:T<=45?x["36-45"]++:T<=55?x["46-55"]++:x["55+"]++):x.unknown++;const D=this._empGetExperienceYears(E);if(D!==null?(y+=D,f++,D<=2?g["0-2"]++:D<=5?g["3-5"]++:D<=10?g["6-10"]++:D<=15?g["11-15"]++:g["15+"]++):g.unknown++,E.hireDate){const U=this.parseLocalDate(E.hireDate);if(U){const C=U.getFullYear();u[C]=(u[C]||0)+1}}A.forEach(U=>{const C=E[U.field];C!=null&&String(C).trim()!==""?U.filled++:U.missing++})});const L=Object.keys(u).map(Number).sort((E,I)=>E-I),$=n*k.length,M=A.reduce((E,I)=>E+I.filled,0),_=$>0?Math.round(M/$*100):0,B=d.slice(0,8).map(E=>({label:E.label,male:E.male,female:E.female}));return{filtered:a,total:n,activeCount:s,inactiveCount:c,uniqueDepartments:d.filter(E=>E.label!==this.t("module.employees.analytics.unknown","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")).length,uniqueJobs:m.filter(E=>E.label!==this.t("module.employees.analytics.unknown","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")).length,averageAge:b>0?Math.round(p/b):0,averageExperience:f>0?(y/f).toFixed(1):0,male:w,female:S,dataCompletenessPct:_,byDepartment:d,byJob:m,byBranch:r,byLocation:l,byPosition:h,departmentJobMatrix:v,ageBuckets:x,tenureBuckets:g,hireByYear:u,hireYears:L,genderByDept:B,completeness:A.map(E=>({...E,percent:n>0?Math.round(E.filled/n*100):0}))}},_empChartBaseOptions(){return{responsive:!0,maintainAspectRatio:!1,animation:{duration:600,easing:"easeOutQuart"},plugins:{legend:{position:"bottom",labels:{font:{family:"inherit",size:11},padding:12}},tooltip:{callbacks:{label:e=>{const t=e.parsed?.y??e.parsed??e.raw??0,a=e.dataset?.data?.reduce((o,n)=>o+n,0)||1,i=Math.round(t/a*100);return`${e.label}: ${t} (${i}%) \u2014 ${this.t("module.employees.analytics.clickToFilter","\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0635\u0641\u064A\u0629")}`}}}}}},_empCreateAnalyticsChart(e,t){const a=document.getElementById(e);if(!a||typeof Chart>"u")return null;if(this._empAnalyticsCharts[e])try{this._empAnalyticsCharts[e].destroy()}catch{}const i=new Chart(a,t);return this._empAnalyticsCharts[e]=i,i},_empMakeBarGradient(e,t,a,i){if(!t)return a;const o=e.createLinearGradient(t.left,0,t.right,0);return o.addColorStop(0,a),o.addColorStop(1,i),o},_empRenderAnalyticsKpiStrip(e){const t=document.getElementById("emp-analytics-kpi-strip");if(!t)return;const a=[{label:this.t("module.employees.analytics.kpi.active","\u0627\u0644\u0646\u0634\u0637\u0648\u0646"),value:e.activeCount,color:"#16a34a",icon:"fa-user-check"},{label:this.t("module.employees.analytics.kpi.inactive","\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646"),value:e.inactiveCount,color:"#dc2626",icon:"fa-user-slash"},{label:this.t("module.employees.analytics.kpi.total","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A"),value:e.total,color:"#1d4ed8",icon:"fa-users"},{label:this.t("module.employees.analytics.kpi.departments","\u0627\u0644\u0623\u0642\u0633\u0627\u0645"),value:e.uniqueDepartments,color:"#7c3aed",icon:"fa-building"},{label:this.t("module.employees.analytics.kpi.jobs","\u0627\u0644\u0648\u0638\u0627\u0626\u0641"),value:e.uniqueJobs,color:"#0ea5e9",icon:"fa-briefcase"},{label:this.t("module.employees.analytics.kpi.avgAge","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0639\u0645\u0631"),value:e.averageAge||this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),color:"#ea580c",icon:"fa-birthday-cake"},{label:this.t("module.employees.analytics.kpi.avgExperience","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062E\u0628\u0631\u0629"),value:e.averageExperience||this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),color:"#0891b2",icon:"fa-clock"},{label:this.t("module.employees.analytics.kpi.dataCompleteness","\u0627\u0643\u062A\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),value:e.dataCompletenessPct+"%",color:"#059669",icon:"fa-database"}];t.innerHTML=a.map(i=>`
            <div class="emp-analytics-kpi" style="--kpi-color:${i.color};">
                <div class="emp-analytics-kpi__icon"><i class="fas ${i.icon}"></i></div>
                <div class="emp-analytics-kpi__value">${typeof i.value=="number"?i.value.toLocaleString("en-US"):i.value}</div>
                <div class="emp-analytics-kpi__label">${i.label}</div>
            </div>
        `).join("")},_empRenderAnalyticsBreadcrumb(e){const t=document.getElementById("emp-analytics-breadcrumb");if(!t)return;const a=[this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")];e.department&&a.push(e.department),e.job&&a.push(e.job),t.innerHTML=a.map((i,o)=>{const n=o===a.length-1;return`<span class="emp-analytics-crumb${n?" emp-analytics-crumb--active":""}">${Utils.escapeHTML(i)}</span>${n?"":'<span class="emp-analytics-crumb-sep">\u203A</span>'}`}).join("")},_empPopulateAnalyticsFilterOptions(e){const t=Array.isArray(e)?e:[],a=n=>[...new Set(t.map(s=>this._empAnalyticsLabel(s[n])).filter(Boolean))].sort((s,c)=>s.localeCompare(c,"ar")),i=(n,s,c)=>{const d=document.getElementById(n);if(!d)return;const m=c||d.value;d.innerHTML=`<option value="">${this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")}</option>`+s.map(r=>`<option value="${Utils.escapeHTML(r)}"${r===m?" selected":""}>${Utils.escapeHTML(r)}</option>`).join("")},o=this._empGetAnalyticsFiltersFromDom();i("emp-af-department",a("department"),o.department),i("emp-af-job",a("job"),o.job),i("emp-af-branch",a("branch"),o.branch),i("emp-af-location",a("location"),o.location),i("emp-af-position",a("position"),o.position)},_empRenderAnalyticsHeatmap(e){const t=document.getElementById("emp-analytics-heatmap");if(!t)return;const a=e.departmentJobMatrix||{},i=Object.entries(a).map(([m,r])=>{const[l,h]=m.split("|||");return{dept:l,job:h,count:r}}).sort((m,r)=>r.count-m.count);if(!i.length){t.innerHTML=`<div class="emp-analytics-empty">${this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`;return}const o=[...new Set(i.slice(0,12).map(m=>m.dept))],n=[...new Set(i.slice(0,12).map(m=>m.job))],s=Math.max(...i.map(m=>m.count),1),c={};i.forEach(m=>{c[m.dept+"|||"+m.job]=m.count});let d='<table class="emp-analytics-heatmap-table"><thead><tr><th></th>';n.forEach(m=>{d+=`<th title="${Utils.escapeHTML(m)}">${Utils.escapeHTML(m.length>14?m.slice(0,14)+"\u2026":m)}</th>`}),d+="</tr></thead><tbody>",o.forEach(m=>{d+=`<tr><th title="${Utils.escapeHTML(m)}">${Utils.escapeHTML(m.length>16?m.slice(0,16)+"\u2026":m)}</th>`,n.forEach(r=>{const l=c[m+"|||"+r]||0,h=l>0?.15+l/s*.85:0,v=l>0?`rgba(29, 78, 216, ${h})`:"#f8fafc",x=h>.5?"#fff":"#334155";d+=`<td class="emp-analytics-heatmap-cell" data-dept="${Utils.escapeHTML(m)}" data-job="${Utils.escapeHTML(r)}" style="background:${v};color:${x};" title="${Utils.escapeHTML(m)} / ${Utils.escapeHTML(r)}: ${l}">${l||""}</td>`}),d+="</tr>"}),d+="</tbody></table>",t.innerHTML=d,t.querySelectorAll(".emp-analytics-heatmap-cell").forEach(m=>{m.addEventListener("click",()=>{const r=m.getAttribute("data-dept")||"",l=m.getAttribute("data-job")||"";!r&&!l||(this._empApplyAnalyticsFilter("department",r,{skipUpdate:!0}),this._empApplyAnalyticsFilter("job",l))})})},_empRenderAnalyticsDetailTable(e){const t=document.getElementById("emp-analytics-detail-table");if(!t)return;const a=this._empAnalyticsDetailTab||"department",i=a==="job"?e.byJob:e.byDepartment,o=a==="job"?this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"):this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645"),n=a==="job"?"job":"department";if(!i.length){t.innerHTML=`<div class="emp-analytics-empty">${this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`;return}const c=this._empGetAnalyticsFiltersFromDom()[n];t.innerHTML=`
            <table class="emp-analytics-detail-table">
                <thead>
                    <tr>
                        <th>${o}</th>
                        <th>${this.t("module.employees.analytics.table.count","\u0627\u0644\u0639\u062F\u062F")}</th>
                        <th>${this.t("module.employees.analytics.table.percent","\u0627\u0644\u0646\u0633\u0628\u0629")}</th>
                        <th>${this.t("module.employees.analytics.table.male","\u0630\u0643\u0631")}</th>
                        <th>${this.t("module.employees.analytics.table.female","\u0623\u0646\u062B\u0649")}</th>
                        <th>${this.t("module.employees.analytics.table.avgAge","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0639\u0645\u0631")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${i.map(d=>`
                        <tr class="emp-analytics-detail-row${c===d.label?" emp-analytics-detail-row--selected":""}" data-filter-key="${n}" data-filter-value="${Utils.escapeHTML(d.label)}">
                            <td>${Utils.escapeHTML(d.label)}</td>
                            <td>${d.count}</td>
                            <td>${d.percent}%</td>
                            <td>${d.male}</td>
                            <td>${d.female}</td>
                            <td>${d.avgAge||"\u2014"}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `,t.querySelectorAll(".emp-analytics-detail-row").forEach(d=>{d.addEventListener("click",()=>{const m=d.getAttribute("data-filter-key"),r=d.getAttribute("data-filter-value");m&&this._empApplyAnalyticsFilter(m,r)})})},_empRenderCompletenessTable(e){const t=document.getElementById("emp-analytics-completeness-table");if(!t)return;const a={employeeNumber:this.t("module.employees.employeeNumber","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),name:this.t("module.employees.fullName","\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644"),department:this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645"),job:this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"),nationalId:this.t("module.employees.table.nationalId","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629"),birthDate:this.t("module.employees.table.birthDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F"),hireDate:this.t("module.employees.table.hireDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646"),gender:this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639"),phone:this.t("module.employees.table.phone","\u0627\u0644\u0647\u0627\u062A\u0641"),email:this.t("module.employees.email","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"),branch:this.t("module.employees.branch","\u0627\u0644\u0641\u0631\u0639"),location:this.t("module.employees.location","\u0627\u0644\u0645\u0648\u0642\u0639"),position:this.t("module.employees.position","\u0627\u0644\u0645\u0646\u0635\u0628")};t.innerHTML=`
            <table class="emp-analytics-detail-table">
                <thead>
                    <tr>
                        <th>\u0627\u0644\u062D\u0642\u0644</th>
                        <th>${this.t("module.employees.analytics.filled","\u0645\u0645\u0644\u0648\u0621")}</th>
                        <th>${this.t("module.employees.analytics.missing","\u0646\u0627\u0642\u0635")}</th>
                        <th>${this.t("module.employees.analytics.table.percent","\u0627\u0644\u0646\u0633\u0628\u0629")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${(e.completeness||[]).map(i=>`
                        <tr>
                            <td>${Utils.escapeHTML(a[i.field]||i.field)}</td>
                            <td>${i.filled}</td>
                            <td>${i.missing}</td>
                            <td>
                                <div class="emp-analytics-progress">
                                    <div class="emp-analytics-progress__bar" style="width:${i.percent}%"></div>
                                    <span>${i.percent}%</span>
                                </div>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `},_empBindChartClick(e,t,a){const i=this._empAnalyticsCharts[e];!i||!t?.length||(i.options.onClick=(o,n)=>{if(!n?.length)return;const s=n[0].index,c=t[s];c?.label&&this._empApplyAnalyticsFilter(a,c.label)},i.update("none"))},_empRenderAnalyticsCharts(e){const t=this._empChartPalette(),a=this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A"),i=(u,p)=>{const b=document.getElementById(u+"-empty"),y=document.getElementById(u);b&&(b.style.display=p?"none":"flex"),y&&(y.style.display=p?"block":"none")},o=e.byDepartment.slice(0,12);i("emp-chart-departments",o.length>0),o.length&&(this._empCreateAnalyticsChart("emp-chart-departments",{type:"bar",data:{labels:o.map(u=>u.label),datasets:[{data:o.map(u=>u.count),backgroundColor:u=>this._empMakeBarGradient(u.chart.ctx,u.chart.chartArea,"#1d4ed8","#6366f1"),borderRadius:8,borderSkipped:!1}]},options:{...this._empChartBaseOptions(),indexAxis:"y",plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{x:{beginAtZero:!0,grid:{color:"#f1f5f9"}},y:{grid:{display:!1}}}}}),this._empBindChartClick("emp-chart-departments",o,"department"));const n=e.byJob.slice(0,12);i("emp-chart-jobs",n.length>0),n.length&&(this._empCreateAnalyticsChart("emp-chart-jobs",{type:"bar",data:{labels:n.map(u=>u.label),datasets:[{data:n.map(u=>u.count),backgroundColor:t.map((u,p)=>t[p%t.length]),borderRadius:8}]},options:{...this._empChartBaseOptions(),indexAxis:"y",plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{x:{beginAtZero:!0},y:{grid:{display:!1}}}}}),this._empBindChartClick("emp-chart-jobs",n,"job"));const s=[e.male,e.female];i("emp-chart-gender",s.some(u=>u>0)),s.some(u=>u>0)&&this._empCreateAnalyticsChart("emp-chart-gender",{type:"doughnut",data:{labels:[this.t("module.employees.genderMale","\u0630\u0643\u0631"),this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649")],datasets:[{data:s,backgroundColor:["#3b82f6","#ec4899"],borderWidth:0}]},options:{...this._empChartBaseOptions(),cutout:"65%",plugins:{...this._empChartBaseOptions().plugins,legend:{position:"bottom"}}}});const c=[e.activeCount,e.inactiveCount];i("emp-chart-status",e.total>0),e.total>0&&this._empCreateAnalyticsChart("emp-chart-status",{type:"doughnut",data:{labels:[this.t("module.employees.analytics.active","\u0646\u0634\u0637"),this.t("module.employees.analytics.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")],datasets:[{data:c,backgroundColor:["#16a34a","#ef4444"],borderWidth:0}]},options:{...this._empChartBaseOptions(),cutout:"65%"}});const d=(u,p,b)=>{const y=p.slice(0,10);i(u,y.length>0),y.length&&(this._empCreateAnalyticsChart(u,{type:"bar",data:{labels:y.map(f=>f.label),datasets:[{data:y.map(f=>f.count),backgroundColor:t,borderRadius:6}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{y:{beginAtZero:!0}}}}),b&&this._empBindChartClick(u,y,b))};d("emp-chart-branches",e.byBranch,"branch"),d("emp-chart-locations",e.byLocation,"location"),d("emp-chart-positions",e.byPosition,"position");const m=Object.keys(e.ageBuckets),r=m.map(u=>e.ageBuckets[u]);i("emp-chart-age",r.some(u=>u>0)),r.some(u=>u>0)&&this._empCreateAnalyticsChart("emp-chart-age",{type:"bar",data:{labels:m,datasets:[{data:r,backgroundColor:"#6366f1",borderRadius:8}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}}}});const l=Object.keys(e.tenureBuckets),h=l.map(u=>e.tenureBuckets[u]);i("emp-chart-tenure",h.some(u=>u>0)),h.some(u=>u>0)&&this._empCreateAnalyticsChart("emp-chart-tenure",{type:"bar",data:{labels:l,datasets:[{data:h,backgroundColor:"#0ea5e9",borderRadius:8}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}}}});const v=e.hireYears||[],x=v.map(u=>e.hireByYear[u]||0);i("emp-chart-hire",v.length>0),v.length&&this._empCreateAnalyticsChart("emp-chart-hire",{type:"line",data:{labels:v.map(String),datasets:[{data:x,borderColor:"#1d4ed8",backgroundColor:"rgba(29,78,216,0.12)",fill:!0,tension:.35,pointRadius:4,pointBackgroundColor:"#1d4ed8"}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{y:{beginAtZero:!0}}}});const g=e.genderByDept||[];i("emp-chart-gender-dept",g.length>0),g.length&&(this._empCreateAnalyticsChart("emp-chart-gender-dept",{type:"bar",data:{labels:g.map(u=>u.label),datasets:[{label:this.t("module.employees.genderMale","\u0630\u0643\u0631"),data:g.map(u=>u.male),backgroundColor:"#3b82f6",borderRadius:4},{label:this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649"),data:g.map(u=>u.female),backgroundColor:"#ec4899",borderRadius:4}]},options:{...this._empChartBaseOptions(),scales:{x:{stacked:!0},y:{stacked:!0,beginAtZero:!0}}}}),this._empBindChartClick("emp-chart-gender-dept",g,"department"))},renderEmployeesAnalysisShellHTML(){const e=[{id:"emp-af-department",icon:"fa-building",label:this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645")},{id:"emp-af-job",icon:"fa-briefcase",label:this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")},{id:"emp-af-branch",icon:"fa-sitemap",label:this.t("module.employees.branch","\u0627\u0644\u0641\u0631\u0639")},{id:"emp-af-location",icon:"fa-map-marker-alt",label:this.t("module.employees.location","\u0627\u0644\u0645\u0648\u0642\u0639")},{id:"emp-af-position",icon:"fa-user-tie",label:this.t("module.employees.position","\u0627\u0644\u0645\u0646\u0635\u0628")},{id:"emp-af-gender",icon:"fa-venus-mars",label:this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639"),options:[{value:"",label:this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")},{value:"male",label:this.t("module.employees.genderMale","\u0630\u0643\u0631")},{value:"female",label:this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649")}]},{id:"emp-af-status",icon:"fa-toggle-on",label:"\u0627\u0644\u062D\u0627\u0644\u0629",options:[{value:"",label:this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")},{value:"active",label:this.t("module.employees.analytics.active","\u0646\u0634\u0637")},{value:"inactive",label:this.t("module.employees.analytics.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")}]}],t=(a,i,o)=>`
            <div class="emp-analytics-chart-card content-card">
                <div class="emp-analytics-chart-card__head">
                    <i class="fas ${o}"></i><span>${i}</span>
                </div>
                <div class="emp-analytics-chart-card__body">
                    <canvas id="${a}"></canvas>
                    <div id="${a}-empty" class="emp-analytics-empty" style="display:none;">${this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                </div>
            </div>
        `;return`
            <style>
                #emp-analytics-root { font-family: inherit; }
                #emp-analytics-root .emp-analytics-toolbar {
                    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
                    margin-bottom: 14px; padding: 16px 20px;
                    background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%);
                    border-radius: 14px; color: #fff; box-shadow: 0 4px 20px rgba(29, 78, 216, 0.35);
                }
                #emp-analytics-kpi-strip {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 18px;
                }
                .emp-analytics-kpi {
                    background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;
                    box-shadow: 0 2px 8px rgba(15,23,42,0.04); transition: transform .2s, box-shadow .2s;
                }
                .emp-analytics-kpi:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(15,23,42,0.08); }
                .emp-analytics-kpi__icon { color: var(--kpi-color); font-size: 1.1rem; margin-bottom: 6px; }
                .emp-analytics-kpi__value { font-size: 1.35rem; font-weight: 800; color: var(--kpi-color); }
                .emp-analytics-kpi__label { font-size: 0.72rem; color: #64748b; font-weight: 600; margin-top: 4px; }
                #emp-filter-panel { display: none; background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 12px; padding: 18px 20px; margin-bottom: 16px; }
                .emp-analytics-chart-card { padding: 0; overflow: hidden; margin-bottom: 0; }
                .emp-analytics-chart-card__head { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-weight: 700; font-size: 0.88rem; display: flex; align-items: center; gap: 8px; }
                .emp-analytics-chart-card__head i { color: #1d4ed8; }
                .emp-analytics-chart-card__body { position: relative; height: 240px; padding: 12px; }
                .emp-analytics-charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 16px; }
                .emp-analytics-dept-job-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 16px; box-shadow: 0 4px 16px rgba(15,23,42,0.05); }
                .emp-analytics-dept-job-panel h3 { margin: 0 0 12px; font-size: 1rem; font-weight: 800; color: #0f172a; }
                #emp-analytics-breadcrumb { margin-bottom: 12px; font-size: 0.82rem; color: #64748b; }
                .emp-analytics-crumb--active { color: #1d4ed8; font-weight: 700; }
                .emp-analytics-crumb-sep { margin: 0 6px; opacity: 0.5; }
                .emp-analytics-heatmap-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
                .emp-analytics-heatmap-table th, .emp-analytics-heatmap-table td { border: 1px solid #e2e8f0; padding: 6px 8px; text-align: center; }
                .emp-analytics-heatmap-cell { cursor: pointer; transition: transform .15s; min-width: 36px; }
                .emp-analytics-heatmap-cell:hover { transform: scale(1.08); outline: 2px solid #1d4ed8; }
                .emp-analytics-detail-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
                .emp-analytics-detail-table th, .emp-analytics-detail-table td { border-bottom: 1px solid #e2e8f0; padding: 10px 12px; text-align: right; }
                .emp-analytics-detail-table th { background: #f8fafc; font-weight: 700; color: #475569; }
                .emp-analytics-detail-row { cursor: pointer; transition: background .15s; }
                .emp-analytics-detail-row:hover { background: #eff6ff; }
                .emp-analytics-detail-row--selected { background: #dbeafe; font-weight: 700; }
                .emp-analytics-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: #94a3b8; font-size: 0.85rem; }
                .emp-analytics-subtabs { display: flex; gap: 8px; margin-bottom: 12px; }
                .emp-analytics-subtab { padding: 6px 14px; border-radius: 8px; border: 1px solid #bfdbfe; background: #fff; cursor: pointer; font-size: 0.8rem; font-weight: 600; color: #1d4ed8; }
                .emp-analytics-subtab.active { background: #1d4ed8; color: #fff; border-color: #1d4ed8; }
                .emp-analytics-progress { display: flex; align-items: center; gap: 8px; }
                .emp-analytics-progress__bar { height: 6px; background: linear-gradient(90deg, #1d4ed8, #6366f1); border-radius: 999px; min-width: 4px; flex: 1; max-width: 120px; }
            </style>
            <div id="emp-analytics-root">
                <div class="emp-analytics-toolbar">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-chart-bar" style="font-size:20px;"></i>
                        </div>
                        <div>
                            <h2 style="margin:0;font-size:1.15rem;font-weight:700;">${this.t("module.employees.analytics.title","\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}</h2>
                            <p style="margin:0;font-size:0.75rem;opacity:0.85;">${this.t("module.employees.analytics.subtitle","\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u2022 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u2022 \u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2022 \u062A\u0635\u062F\u064A\u0631 PDF")}</p>
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                        <button type="button" id="emp-toggle-filters-btn" class="btn-secondary" style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.35);">
                            <i class="fas fa-sliders-h ml-2"></i>${this.t("module.employees.analytics.filters","\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629")}
                            <span id="emp-filter-active-badge" style="display:none;background:#ef4444;color:#fff;font-size:0.65rem;padding:1px 6px;border-radius:10px;margin-right:4px;"></span>
                        </button>
                        <button type="button" id="emp-export-pdf-btn" class="btn-secondary" style="background:rgba(239,68,68,0.85);color:#fff;border:none;">
                            <i class="fas fa-file-pdf ml-2"></i>${this.t("module.employees.analytics.exportPdf","\u062A\u0635\u062F\u064A\u0631 PDF")}
                        </button>
                        <button type="button" id="emp-analytics-refresh" class="btn-secondary" style="background:rgba(255,255,255,0.15);color:#fff;border:none;" title="${this.t("module.employees.analytics.refresh","\u062A\u062D\u062F\u064A\u062B")}">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>

                <div id="emp-filter-panel">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-sliders-h" style="color:#1d4ed8;"></i>
                            <span style="font-weight:700;font-size:0.9rem;color:#0f172a;">${this.t("module.employees.analytics.filters","\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629")}</span>
                            <span id="emp-filter-results-count" data-base-count="" style="background:#dbeafe;color:#1d4ed8;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                        </div>
                        <button type="button" id="emp-filter-reset-btn" class="btn-secondary" style="font-size:0.75rem;">
                            <i class="fas fa-times ml-1"></i>${this.t("module.employees.analytics.clearFilters","\u0645\u0633\u062D \u0627\u0644\u0643\u0644")}
                        </button>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                        ${e.map(a=>`
                            <div>
                                <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                    <i class="fas ${a.icon} ml-1" style="color:#1d4ed8;"></i>${a.label}
                                </label>
                                ${a.options?`
                                    <select id="${a.id}" class="form-input" style="width:100%;font-size:0.82rem;">
                                        ${a.options.map(i=>`<option value="${i.value}">${i.label}</option>`).join("")}
                                    </select>
                                `:`<select id="${a.id}" class="form-input" style="width:100%;font-size:0.82rem;"><option value="">${this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")}</option></select>`}
                            </div>
                        `).join("")}
                    </div>
                </div>

                <div id="emp-analytics-kpi-strip"><div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div></div>

                <div id="emp-dept-job-panel" class="emp-analytics-dept-job-panel">
                    <h3><i class="fas fa-building ml-2" style="color:#1d4ed8;"></i>${this.t("module.employees.analytics.deptJobTitle","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u0648\u0638\u0627\u0626\u0641")}</h3>
                    <div id="emp-analytics-breadcrumb"></div>
                    <div class="emp-analytics-charts-grid" style="margin-bottom:16px;">
                        ${t("emp-chart-departments",this.t("module.employees.analytics.chart.departments","\u0623\u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0633\u0627\u0645"),"fa-building")}
                        ${t("emp-chart-jobs",this.t("module.employees.analytics.chart.jobs","\u0623\u0639\u0644\u0649 \u0627\u0644\u0648\u0638\u0627\u0626\u0641"),"fa-briefcase")}
                    </div>
                    <h4 style="margin:0 0 10px;font-size:0.88rem;font-weight:700;color:#475569;">
                        <i class="fas fa-th ml-1"></i>${this.t("module.employees.analytics.heatmap","\u062E\u0631\u064A\u0637\u0629 \u062D\u0631\u0627\u0631\u064A\u0629: \u0642\u0633\u0645 \xD7 \u0648\u0638\u064A\u0641\u0629")}
                    </h4>
                    <div id="emp-analytics-heatmap" style="overflow-x:auto;"></div>
                </div>

                <div class="emp-analytics-charts-grid">
                    ${t("emp-chart-gender",this.t("module.employees.analytics.chart.gender","\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"fa-venus-mars")}
                    ${t("emp-chart-status",this.t("module.employees.analytics.chart.status","\u0627\u0644\u062D\u0627\u0644\u0629"),"fa-toggle-on")}
                    ${t("emp-chart-gender-dept",this.t("module.employees.analytics.chart.genderByDept","\u0627\u0644\u062C\u0646\u0633 \u062F\u0627\u062E\u0644 \u0627\u0644\u0623\u0642\u0633\u0627\u0645"),"fa-chart-bar")}
                    ${t("emp-chart-branches",this.t("module.employees.analytics.chart.branches","\u0627\u0644\u0641\u0631\u0648\u0639"),"fa-sitemap")}
                    ${t("emp-chart-locations",this.t("module.employees.analytics.chart.locations","\u0627\u0644\u0645\u0648\u0627\u0642\u0639"),"fa-map-marker-alt")}
                    ${t("emp-chart-positions",this.t("module.employees.analytics.chart.positions","\u0627\u0644\u0645\u0646\u0627\u0635\u0628"),"fa-user-tie")}
                    ${t("emp-chart-age",this.t("module.employees.analytics.chart.ageBuckets","\u0634\u0631\u0627\u0626\u062D \u0627\u0644\u0639\u0645\u0631"),"fa-birthday-cake")}
                    ${t("emp-chart-tenure",this.t("module.employees.analytics.chart.tenureBuckets","\u0634\u0631\u0627\u0626\u062D \u0627\u0644\u062E\u0628\u0631\u0629"),"fa-clock")}
                    ${t("emp-chart-hire",this.t("module.employees.analytics.chart.hireTrend","\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u062A\u0639\u064A\u064A\u0646"),"fa-chart-line")}
                </div>

                <div class="content-card" style="margin-top:16px;padding:16px;">
                    <div class="emp-analytics-subtabs">
                        <button type="button" class="emp-analytics-subtab ${this._empAnalyticsDetailTab==="department"?"active":""}" data-emp-detail-tab="department">${this.t("module.employees.analytics.table.byDepartment","\u062D\u0633\u0628 \u0627\u0644\u0642\u0633\u0645")}</button>
                        <button type="button" class="emp-analytics-subtab ${this._empAnalyticsDetailTab==="job"?"active":""}" data-emp-detail-tab="job">${this.t("module.employees.analytics.table.byJob","\u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629")}</button>
                    </div>
                    <div id="emp-analytics-detail-table"></div>
                </div>

                <div class="content-card" style="margin-top:16px;padding:16px;">
                    <h3 style="margin:0 0 12px;font-size:0.95rem;font-weight:700;">
                        <i class="fas fa-database ml-2" style="color:#1d4ed8;"></i>${this.t("module.employees.analytics.table.completeness","\u0627\u0643\u062A\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}
                    </h3>
                    <div id="emp-analytics-completeness-table"></div>
                </div>
            </div>
        `},async loadEmployeesAnalysis(e=!1){if(this.activeTab!=="data-analysis")return;const t=document.getElementById("employees-analysis-panel");if(t){t.querySelector("#emp-analytics-root")||(t.innerHTML=this.renderEmployeesAnalysisShellHTML(),this._empAnalyticsEventsBound=!1);try{await this.ensureEmployeesLoaded(e)}catch{}await this._empEnsureChartJs(),this._empAnalyticsEventsBound||(this._empBindAnalyticsEvents(),this._empAnalyticsEventsBound=!0),await this.updateEmployeesAnalyticsDashboard()}},async updateEmployeesAnalyticsDashboard(){if(!document.getElementById("emp-analytics-root"))return;const t=AppState.appData?.employees||[],a=this._empGetAnalyticsFiltersFromDom();this._empPopulateAnalyticsFilterOptions(t),Object.entries(a).forEach(([n,s])=>{const c=this._empFilterIdMap(),d=document.getElementById(c[n]);d&&s&&(d.value=s)});const i=this.buildEmployeeAnalyticsDataset(t,a),o=document.getElementById("emp-filter-results-count");o&&(o.dataset.baseCount=`${i.total} \u0645\u0648\u0638\u0641`,o.textContent=o.dataset.baseCount),this._empRenderAnalyticsBreadcrumb(a),this._empRenderAnalyticsKpiStrip(i),this._empDestroyAnalyticsCharts(),this._empRenderAnalyticsCharts(i),this._empRenderAnalyticsHeatmap(i),this._empRenderAnalyticsDetailTable(i),this._empRenderCompletenessTable(i),this._empUpdateAnalyticsFilterBadge()},_empBindAnalyticsEvents(){document.getElementById("emp-toggle-filters-btn")?.addEventListener("click",()=>{const e=document.getElementById("emp-filter-panel");e&&(e.style.display=e.style.display==="none"||!e.style.display?"block":"none")}),document.getElementById("emp-filter-reset-btn")?.addEventListener("click",()=>this._empClearAnalyticsFilters()),document.getElementById("emp-analytics-refresh")?.addEventListener("click",()=>this.loadEmployeesAnalysis(!0)),document.getElementById("emp-export-pdf-btn")?.addEventListener("click",()=>this._empExportAnalyticsPdf()),Object.values(this._empFilterIdMap()).forEach(e=>{document.getElementById(e)?.addEventListener("change",()=>this.updateEmployeesAnalyticsDashboard())}),document.querySelectorAll("[data-emp-detail-tab]").forEach(e=>{e.addEventListener("click",()=>{this._empAnalyticsDetailTab=e.getAttribute("data-emp-detail-tab")||"department",document.querySelectorAll("[data-emp-detail-tab]").forEach(i=>i.classList.toggle("active",i===e));const t=AppState.appData?.employees||[],a=this.buildEmployeeAnalyticsDataset(t,this._empGetAnalyticsFiltersFromDom());this._empRenderAnalyticsDetailTable(a)})})},async _empExportAnalyticsPdf(){const e=AppState.appData?.employees||[],t=this._empGetAnalyticsFiltersFromDom(),a=this.buildEmployeeAnalyticsDataset(e,t),i=a.byDepartment.slice(0,20).map(s=>`<tr><td>${Utils.escapeHTML(s.label)}</td><td>${s.count}</td><td>${s.percent}%</td><td>${s.male}</td><td>${s.female}</td></tr>`).join(""),o=a.byJob.slice(0,20).map(s=>`<tr><td>${Utils.escapeHTML(s.label)}</td><td>${s.count}</td><td>${s.percent}%</td><td>${s.male}</td><td>${s.female}</td></tr>`).join(""),n=`
            <div dir="rtl" style="font-family:Arial,sans-serif;padding:24px;">
                <h1 style="color:#0f172a;margin-bottom:8px;">${this.t("module.employees.analytics.title","\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}</h1>
                <p style="color:#64748b;margin-bottom:20px;">${new Date().toLocaleDateString("ar-SA")}</p>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;">
                    <div style="background:#eff6ff;padding:12px;border-radius:8px;"><strong>\u0627\u0644\u0646\u0634\u0637\u0648\u0646</strong><br>${a.activeCount}</div>
                    <div style="background:#fef2f2;padding:12px;border-radius:8px;"><strong>\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646</strong><br>${a.inactiveCount}</div>
                    <div style="background:#f0fdf4;padding:12px;border-radius:8px;"><strong>\u0627\u0644\u0623\u0642\u0633\u0627\u0645</strong><br>${a.uniqueDepartments}</div>
                    <div style="background:#f5f3ff;padding:12px;border-radius:8px;"><strong>\u0627\u0644\u0648\u0638\u0627\u0626\u0641</strong><br>${a.uniqueJobs}</div>
                </div>
                <h2>\u0623\u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0633\u0627\u0645</h2>
                <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                    <thead><tr style="background:#f1f5f9;"><th>\u0627\u0644\u0642\u0633\u0645</th><th>\u0627\u0644\u0639\u062F\u062F</th><th>%</th><th>\u0630\u0643\u0631</th><th>\u0623\u0646\u062B\u0649</th></tr></thead>
                    <tbody>${i}</tbody>
                </table>
                <h2>\u0623\u0639\u0644\u0649 \u0627\u0644\u0648\u0638\u0627\u0626\u0641</h2>
                <table style="width:100%;border-collapse:collapse;">
                    <thead><tr style="background:#f1f5f9;"><th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th><th>\u0627\u0644\u0639\u062F\u062F</th><th>%</th><th>\u0630\u0643\u0631</th><th>\u0623\u0646\u062B\u0649</th></tr></thead>
                    <tbody>${o}</tbody>
                </table>
            </div>
        `;try{if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631..."),typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function")await FormHeader.generatePDF(n,`\u062A\u062D\u0644\u064A\u0644-\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646-${new Date().toISOString().slice(0,10)}.pdf`);else{const s=window.open("","_blank");s&&(s.document.write(n),s.document.close(),s.print())}Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")}catch{Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")}finally{Loading.hide()}},switchTab(e){const a=["employees-list","external-workforce","data-analysis"].includes(e)?e:"employees-list";this.activeTab=a,document.querySelectorAll("[data-employees-tab]").forEach(s=>{const c=s.getAttribute("data-employees-tab")===a;s.classList.toggle("active",c),s.style.background=c?"linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)":"#eff6ff",s.style.color=c?"#fff":"#1d4ed8",s.style.borderColor=c?"#0f172a":"#bfdbfe"});const i=document.getElementById("employees-list-panel"),o=document.getElementById("employees-external-panel"),n=document.getElementById("employees-analysis-panel");i&&i.classList.toggle("hidden",a!=="employees-list"),o&&o.classList.toggle("hidden",a!=="external-workforce"),n&&n.classList.toggle("hidden",a!=="data-analysis"),a==="external-workforce"?(this.populateExternalWorkforceYearSelector(),this.ensureExternalWorkforceDataLoaded().then(()=>this.renderExternalWorkforceTable()).catch(()=>{})):a==="data-analysis"?this.loadEmployeesAnalysis().catch(()=>{}):this.canViewEmployeesRegistryTab()&&(this.loadEmployeesList(),this.scrollToSearchField())},async renderList(){const e=this.canAddOrImport(),t=this.canViewEmployeesRegistryTab(),a=this.canViewExternalWorkforceTab(),i=this.canViewEmployeesAnalysisTab(),o=t?"employees-list":i?"data-analysis":a?"external-workforce":"employees-list";return(this.activeTab==="employees-list"&&!t||this.activeTab==="external-workforce"&&!a||this.activeTab==="data-analysis"&&!i)&&(this.activeTab=o),`
            <style>
                .employees-tab-bar {
                    display: flex;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                    margin-bottom: 1rem;
                }
                .employees-tab-btn {
                    border: 1px solid #bfdbfe;
                    background: #eff6ff;
                    color: #1d4ed8;
                    padding: 0.8rem 1.15rem;
                    border-radius: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: 0.2s ease;
                }
                .employees-tab-btn.active {
                    background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%);
                    color: #ffffff;
                    border-color: #0f172a;
                    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.18);
                }
                @media (max-width: 768px) {
                    .employees-tab-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            </style>
            <div class="employees-tab-bar">
                ${t?`<button type="button" class="employees-tab-btn ${this.activeTab==="employees-list"?"active":""}" data-employees-tab="employees-list"><i class="fas fa-id-card ml-2"></i>${this.getExternalWorkforceViewState().labels.employeesTab}</button>`:""}
                ${i?`<button type="button" class="employees-tab-btn ${this.activeTab==="data-analysis"?"active":""}" data-employees-tab="data-analysis"><i class="fas fa-chart-bar ml-2"></i>${this.t("module.employees.tabs.dataAnalysis","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</button>`:""}
                ${a?`<button type="button" class="employees-tab-btn ${this.activeTab==="external-workforce"?"active":""}" data-employees-tab="external-workforce"><i class="fas fa-helmet-safety ml-2"></i>${this.getExternalWorkforceViewState().labels.externalTab}</button>`:""}
            </div>
            <div id="employees-list-panel" class="${this.activeTab!=="employees-list"||!t?"hidden":""}">
            <div id="employees-stats-cards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-start"></div>
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <h2 class="card-title">
                            <i class="fas fa-users ml-2"></i>
                            ${this.t("module.employees.employeeList","\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}
                        </h2>
                        <div class="flex items-center gap-3 flex-wrap">
                            <button id="refresh-employees-btn" class="btn-secondary" title="${this.t("module.employees.refreshFromDbTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}">
                                <i class="fas fa-sync-alt ml-2"></i>
                                ${this.t("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}
                            </button>
                            ${e?`
                            <button id="refresh-employee-names-btn" class="btn-secondary" title="${this.t("module.employees.refreshNamesTitle","\u062A\u062D\u062F\u064A\u062B/\u062A\u0646\u0638\u064A\u0641 \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u062B\u0645 \u062D\u0641\u0638\u0647\u0627")}">
                                <i class="fas fa-font ml-2"></i>
                                ${this.t("module.employees.refreshNames","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621")}
                            </button>
                            <button id="delete-all-employees-btn" class="btn-danger" title="${this.t("module.employees.deleteAllTitle","\u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0639\u0645\u0644\u064A\u0629 \u062E\u0637\u064A\u0631\u0629)")}">
                                <i class="fas fa-trash-alt ml-2"></i>
                                ${this.t("module.employees.deleteAll","\u062D\u0630\u0641 \u0627\u0644\u062C\u0645\u064A\u0639")}
                            </button>
                            `:""}
                        </div>
                    </div>
                </div>
                <div class="card-body" style="padding: 16px;">
                <!-- \u2705 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0645\u062F\u0645\u062C\u0629 \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0641\u064A \u0635\u0641 \u0648\u0627\u062D\u062F \u0645\u0628\u0627\u0634\u0631 \u0623\u0639\u0644\u0649 \u0627\u0644\u062C\u062F\u0648\u0644 -->
                <div class="employees-filters-row" style="background: #ffffff; padding: 12px 14px; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02); direction: rtl; overflow-x: auto; scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent;">
                    <style>
                        .employees-filters-row::-webkit-scrollbar {
                            height: 4px;
                        }
                        .employees-filters-row::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .employees-filters-row::-webkit-scrollbar-thumb {
                            background: #cbd5e1;
                            border-radius: 4px;
                        }
                        .employees-filters-row .filters-flex-row {
                            display: flex;
                            align-items: flex-end;
                            gap: 8px;
                            flex-wrap: nowrap;
                            width: 100%;
                            min-width: max-content;
                        }
                        .employees-filters-row .filter-field {
                            display: flex;
                            flex-direction: column;
                            gap: 3px;
                        }
                        .employees-filters-row .filter-field--search {
                            flex: 2;
                            min-width: 170px;
                        }
                        .employees-filters-row .filter-field--select {
                            flex: 1;
                            min-width: 110px;
                        }
                        .employees-filters-row .filter-field--reset {
                            flex: 0 0 auto;
                        }
                        .employees-filters-row .filter-label {
                            display: flex;
                            align-items: center;
                            gap: 4px;
                            font-size: 11px;
                            font-weight: 700;
                            color: #475569;
                            white-space: nowrap;
                            margin-bottom: 1px;
                        }
                        .employees-filters-row .filter-label i {
                            color: #3b82f6;
                            font-size: 11px;
                        }
                        .employees-filters-row .filter-input {
                            width: 100%;
                            height: 36px;
                            padding: 0 10px;
                            border: 1px solid #cbd5e1;
                            border-radius: 8px;
                            font-size: 13px;
                            background: #f8fafc;
                            color: #0f172a;
                            transition: all 0.2s ease;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .employees-filters-row .filter-input:hover {
                            background: #ffffff;
                            border-color: #94a3b8;
                        }
                        .employees-filters-row .filter-input:focus {
                            outline: none;
                            background: #ffffff;
                            border-color: #3b82f6;
                            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
                        }
                        .employees-filters-row .filter-count-badge {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            min-width: 18px;
                            height: 16px;
                            padding: 0 5px;
                            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                            color: white;
                            border-radius: 10px;
                            font-size: 10px;
                            font-weight: 700;
                            margin-right: 2px;
                            box-shadow: 0 1px 3px rgba(59, 130, 246, 0.3);
                        }
                        .employees-filters-row .filter-reset-btn {
                            height: 36px;
                            padding: 0 14px;
                            background: #f1f5f9;
                            color: #475569;
                            border: 1px solid #cbd5e1;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 12px;
                            font-weight: 700;
                            transition: all 0.2s ease;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            gap: 6px;
                            white-space: nowrap;
                        }
                        .employees-filters-row .filter-reset-btn:hover {
                            background: #e2e8f0;
                            color: #0f172a;
                            border-color: #94a3b8;
                            transform: translateY(-1px);
                        }
                    </style>
                    <div class="filters-flex-row">
                        <!-- \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B -->
                        <div class="filter-field filter-field--search">
                            <label for="employees-search-filter" class="filter-label">
                                <i class="fas fa-search"></i>${this.t("module.common.search","\u0627\u0644\u0628\u062D\u062B")}
                            </label>
                            <input type="text" id="employees-search-filter" class="filter-input" placeholder="${this.t("module.employees.searchAllData","\u0627\u0628\u062D\u062B \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...")}" style="direction: rtl; text-align: right;">
                        </div>
                        
                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0642\u0633\u0645 -->
                        <div class="filter-field filter-field--select">
                            <label for="employee-filter-department" class="filter-label">
                                <i class="fas fa-building"></i>${this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645")}
                            </label>
                            <select id="employee-filter-department" class="filter-input" style="direction: rtl;">
                                <option value="">${this.t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                            </select>
                        </div>
                        
                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0641\u0631\u0639 -->
                        <div class="filter-field filter-field--select">
                            <label for="employee-filter-branch" class="filter-label">
                                <i class="fas fa-sitemap"></i>${this.t("module.employees.branch","\u0627\u0644\u0641\u0631\u0639")}
                            </label>
                            <select id="employee-filter-branch" class="filter-input" style="direction: rtl;">
                                <option value="">${this.t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                            </select>
                        </div>
                        
                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 -->
                        <div class="filter-field filter-field--select">
                            <label for="employee-filter-location" class="filter-label">
                                <i class="fas fa-map-marker-alt"></i>${this.t("module.employees.location","\u0627\u0644\u0645\u0648\u0642\u0639")}
                            </label>
                            <select id="employee-filter-location" class="filter-input" style="direction: rtl;">
                                <option value="">${this.t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                            </select>
                        </div>
                        
                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 -->
                        <div class="filter-field filter-field--select">
                            <label for="employee-filter-job" class="filter-label">
                                <i class="fas fa-briefcase"></i>${this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}
                            </label>
                            <select id="employee-filter-job" class="filter-input" style="direction: rtl;">
                                <option value="">${this.t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                            </select>
                        </div>
                        
                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0646\u0635\u0628 -->
                        <div class="filter-field filter-field--select">
                            <label for="employee-filter-position" class="filter-label">
                                <i class="fas fa-user-tie"></i>${this.t("module.employees.position","\u0627\u0644\u0645\u0646\u0635\u0628")}
                            </label>
                            <select id="employee-filter-position" class="filter-input" style="direction: rtl;">
                                <option value="">${this.t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                            </select>
                        </div>
                        
                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0646\u0648\u0639 -->
                        <div class="filter-field filter-field--select">
                            <label for="employee-filter-gender" class="filter-label">
                                <i class="fas fa-venus-mars"></i>${this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639")}
                            </label>
                            <select id="employee-filter-gender" class="filter-input" style="direction: rtl;">
                                <option value="">${this.t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                                <option value="\u0630\u0643\u0631">${this.t("module.employees.genderMale","\u0630\u0643\u0631")}</option>
                                <option value="\u0623\u0646\u062B\u0649">${this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649")}</option>
                            </select>
                        </div>
                        
                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646 -->
                        <div class="filter-field filter-field--select" style="min-width: 140px;">
                            <label class="filter-label">
                                <i class="fas fa-user-slash"></i>${this.t("module.employees.status","\u0627\u0644\u062D\u0627\u0644\u0629")}
                            </label>
                            <label id="show-inactive-employees-container" style="display: flex; align-items: center; gap: 6px; height: 36px; padding: 0 10px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; cursor: pointer; white-space: nowrap; transition: all 0.2s ease;">
                                <input type="checkbox" id="show-inactive-employees" style="width: 15px; height: 15px; cursor: pointer;">
                                <span style="font-size: 12px; font-weight: 600; color: #475569;">${this.t("module.employees.showInactive","\u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646")}</span>
                                <span class="inactive-count-badge" id="inactive-employees-count" style="display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 18px; padding: 0 5px; background: #dc2626; color: white; border-radius: 9px; font-size: 10px; font-weight: 700;">0</span>
                            </label>
                        </div>

                        <!-- \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 -->
                        <div class="filter-field filter-field--reset">
                            <button id="employee-reset-filters" class="filter-reset-btn">
                                <i class="fas fa-redo"></i>${this.t("module.common.reset","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646")}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="employees-table-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">${this.t("module.common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            ${a?`
            <div id="employees-external-panel" class="${this.activeTab!=="external-workforce"?"hidden":""}">
                ${this.renderExternalWorkforcePanel()}
            </div>
            `:""}
            ${i?`
            <div id="employees-analysis-panel" class="${this.activeTab!=="data-analysis"?"hidden":""}"></div>
            `:""}
        `},async ensureEmployeesLoaded(e=!1){if(this.cache.isUpdating&&!e){for(;this.cache.isUpdating;)await new Promise(i=>setTimeout(i,50));if(AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0)return!0}const t=AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0,a=this.cache.data&&this.cache.lastLoad&&Date.now()-this.cache.lastLoad<this.config.cacheTimeout&&!e;return t&&a?(AppState.debugMode&&Utils.safeLog(`\u2705 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 Cache (${this.cache.data.length} \u0645\u0648\u0638\u0641)`),this.cache.data&&this.cache.data.length>0&&(AppState.appData.employees=this.cache.data),!this.config._refreshedOnceForInactive&&AppState.appData.employees.length>0&&AppState.googleConfig?.appsScript?.enabled&&(AppState.appData.employees||[]).filter(o=>this.isEmployeeInactive(o)).length===0&&(this.config._refreshedOnceForInactive=!0,this.loadEmployeesFromBackend(!0).then(()=>{window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{}}))}).catch(()=>{})),!0):t&&!a&&!e?(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),this.updateEmployeesInBackground(),!0):await this.loadEmployeesFromBackend(e)},async loadEmployeesFromBackend(e=!1){if(this.cache.isUpdating&&!e){for(AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0628\u0627\u0644\u0641\u0639\u0644\u060C \u0627\u0646\u062A\u0638\u0627\u0631...");this.cache.isUpdating;)await new Promise(t=>setTimeout(t,50));if(AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0)return!0}this.cache.isUpdating=!0;try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl)return AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644 - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637"),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),this.cache.isUpdating=!1,!1;if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),this.cache.isUpdating=!1,!1;try{const t=await GoogleIntegration.sendRequest({action:"getAllEmployees",data:{filters:{includeInactive:!0}}});if(t&&t.success&&Array.isArray(t.data))return AppState.appData.employees=t.data,this.cache.data=t.data,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${t.data.length} \u0645\u0648\u0638\u0641 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`),this.cache.isUpdating=!1,!0;{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F getAllEmployees \u0641\u0634\u0644\u060C \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0640 readFromSheet...");const a=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Employees",spreadsheetId:AppState.googleConfig.sheets.spreadsheetId}});if(a&&a.success&&Array.isArray(a.data))return AppState.appData.employees=a.data,this.cache.data=a.data,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a.data.length} \u0645\u0648\u0638\u0641 \u0645\u0646 Google Sheets`),this.cache.isUpdating=!1,!0}}catch(t){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 Backend:",t),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),this.cache.isUpdating=!1,!1}return this.cache.isUpdating=!1,!1}catch(t){return AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A loadEmployeesFromBackend:",t),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),this.cache.isUpdating=!1,!1}},async updateEmployeesInBackground(){if(!this.cache.isUpdating){this.cache.isUpdating=!0;try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return;const e=await GoogleIntegration.sendRequest({action:"getAllEmployees",data:{filters:{includeInactive:!0}}});if(e&&e.success&&Array.isArray(e.data)){const t=AppState.appData.employees?.length||0,a=e.data.length;(t!==a||JSON.stringify(AppState.appData.employees)!==JSON.stringify(e.data))&&(AppState.appData.employees=e.data,this.cache.data=e.data,this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u{1F504} \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629 (${e.data.length} \u0645\u0648\u0638\u0641)`),window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{count:e.data.length}})))}}catch(e){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",e)}finally{this.cache.isUpdating=!1}}},startBackgroundUpdate(){this.config.backgroundUpdateTimer&&clearInterval(this.config.backgroundUpdateTimer),this.config.backgroundUpdateTimer=setInterval(()=>{this.updateEmployeesInBackground()},this.config.backgroundUpdateInterval),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0628\u062F\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0643\u0644 ${this.config.backgroundUpdateInterval/6e4} \u062F\u0642\u064A\u0642\u0629)`)},stopBackgroundUpdate(){this.config.backgroundUpdateTimer&&(clearInterval(this.config.backgroundUpdateTimer),this.config.backgroundUpdateTimer=null)},cleanup(){try{AppState.debugMode&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Employees module..."),this.stopBackgroundUpdate(),this.handleDataUpdate&&(window.removeEventListener("employeesDataUpdated",this.handleDataUpdate),this.handleDataUpdate=null),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Employees module")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Employees module:",e)}},async loadEmployeesList(e=!1){const t=document.getElementById("employees-table-container");if(!t){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F employees-table-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A loadEmployeesList");return}let a=AppState.appData.employees||[];if(AppState.debugMode&&Utils.safeLog(`\u{1F4CA} loadEmployeesList: \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 = ${a.length}, showInactive = ${e}`),e)AppState.debugMode&&Utils.safeLog(`\u{1F4CA} \u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0628\u0645\u0627 \u0641\u064A \u0630\u0644\u0643 \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646): ${a.length}`);else{const r=a.length;a=a.filter(l=>!this.isEmployeeInactive(l)),AppState.debugMode&&Utils.safeLog(`\u{1F4CA} \u0628\u0639\u062F \u0627\u0644\u062A\u0635\u0641\u064A\u0629 (\u0646\u0634\u0637\u064A\u0646 \u0641\u0642\u0637): ${a.length} \u0645\u0646 ${r}`)}this.renderStatsCards(),this.updateInactiveCount();const i=this.canAddOrImport(),o=this.canEditOrDelete(),n=document.createDocumentFragment();if(a.length===0){const r=document.createElement("div");r.className="empty-state",r.innerHTML=`
                <i class="fas fa-user-tie text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">${this.t("module.employees.emptyList","\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0633\u062C\u0644\u064A\u0646")}</p>
                ${i?`
                <button id="add-employee-empty-btn" class="btn-primary mt-4">
                    <i class="fas fa-plus ml-2"></i>
                    ${this.t("module.employees.addNewEmployee","\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F")}
                </button>
                `:""}
            `,n.appendChild(r),t.innerHTML="",t.appendChild(n),requestAnimationFrame(()=>{const l=document.getElementById("add-employee-empty-btn");l&&this.canAddOrImport()&&l.addEventListener("click",()=>this.showForm())});return}const s=document.createElement("div");s.className="table-wrapper",s.style.cssText="width: 100%; max-width: 100%; overflow-x: auto;";const c=document.createElement("table");c.className="data-table table-header-blue",c.style.cssText="width: 100%; min-width: 100%; table-layout: auto;";const d=document.createElement("thead");d.innerHTML=`
            <tr>
                <th style="min-width: 80px;">${this.t("module.employees.table.photo","\u0627\u0644\u0635\u0648\u0631\u0629")}</th>
                <th style="min-width: 100px;">${this.t("module.employees.table.employeeNumber","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}</th>
                <th style="min-width: 150px;">${this.t("module.employees.table.name","\u0627\u0644\u0627\u0633\u0645")}</th>
                <th style="min-width: 120px;">${this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645")}</th>
                <th style="min-width: 120px;">${this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}</th>
                <th style="min-width: 120px;">${this.t("module.employees.table.nationalId","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629")}</th>
                <th style="min-width: 120px;">${this.t("module.employees.table.birthDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F")}</th>
                <th style="min-width: 80px;">${this.t("module.employees.table.age","\u0627\u0644\u0633\u0646")}</th>
                <th style="min-width: 120px;">${this.t("module.employees.table.hireDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646")}</th>
                <th style="min-width: 80px;">${this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639")}</th>
                <th style="min-width: 120px;">${this.t("module.employees.table.phone","\u0627\u0644\u0647\u0627\u062A\u0641")}</th>
                <th style="min-width: 120px;">${this.t("module.employees.table.insuranceNo","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A")}</th>
                <th style="min-width: 150px;">${this.t("module.employees.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
            </tr>
        `;const m=document.createElement("tbody");a.forEach(r=>{const l=this.formatDateSafe(r.birthDate),h=this.formatDateSafe(r.hireDate),v=this.calculateAge(r.birthDate),x=this.isEmployeeInactive(r),g=x?"opacity: 0.7; background-color: #f8f9fa;":"",u=document.createElement("tr");x&&(u.style.cssText=g);const b=(this._getDriveIdFromUrl(r.photo||"")||r.id||r.employeeNumber||r.name||"").toString(),y=this._normalizeEmployeePhotoUrl(r.photo,r.id),f=y&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(y):{canonical:y||"",displaySrc:y||"",needsProxy:!1,proxyFileId:""},w=f.canonical?f.displaySrc:"",S=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(f):"";u.innerHTML=`
                <td style="word-wrap: break-word;">
                    ${y?`<img data-emp-photo="1" data-photo-key="${Utils.escapeHTML(b)}" src="${Utils.escapeHTML(w)}" alt="${Utils.escapeHTML(r.name||"")}"${S} class="w-12 h-12 rounded-full object-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer">`:'<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>'}
                </td>
                <td style="word-wrap: break-word; white-space: normal;">
                    ${Utils.escapeHTML(r.employeeNumber||"")}
                    ${x?`<span class="badge badge-warning ml-2" style="font-size: 10px; padding: 2px 6px;">${this.t("module.employees.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")}</span>`:""}
                </td>
                <td style="word-wrap: break-word; white-space: normal; max-width: 200px;">
                    ${Utils.escapeHTML(r.name||"")}
                    ${x&&r.resignationDate?`<br><span class="text-xs text-gray-500" style="font-size: 11px;">${this.t("module.employees.resignedOn","\u0627\u0633\u062A\u0642\u0627\u0644")}: ${this.formatDateSafe(r.resignationDate)}</span>`:""}
                </td>
                <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(r.department||"")}</td>
                <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(r.job||r.position||"")}</td>
                <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(r.nationalId||"")}</td>
                <td style="word-wrap: break-word; white-space: normal;">${l||""}</td>
                <td style="word-wrap: break-word; white-space: normal;">${v?v+" "+this.t("module.common.yearsUnit","\u0633\u0646\u0629"):""}</td>
                <td style="word-wrap: break-word; white-space: normal;">${h||""}</td>
                <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(r.gender||"")}</td>
                <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(r.phone||"")}</td>
                <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(r.insuranceNumber||"")}</td>
                ${o?`
                <td style="min-width: 150px;">
                    <div class="flex items-center gap-2 flex-wrap">
                        <button onclick="Employees.viewEmployee('${r.id}')" class="btn-icon btn-icon-info" title="${this.t("module.common.view","\u0639\u0631\u0636")}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="Employees.editEmployee('${r.id}')" class="btn-icon btn-icon-primary" title="${this.t("module.common.edit","\u062A\u0639\u062F\u064A\u0644")}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="Employees.deactivateEmployee('${r.id}')" class="btn-icon btn-icon-danger" title="${this.t("module.employees.deactivate","\u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644")}">
                            <i class="fas fa-user-slash"></i>
                        </button>
                    </div>
                </td>
                `:`
                <td>
                    <span class="text-gray-400 text-sm">\u2014</span>
                </td>
                `}
            `,m.appendChild(u)}),c.appendChild(d),c.appendChild(m),s.appendChild(c),n.appendChild(s),t.innerHTML="",t.appendChild(n),this.applyModuleI18n(t),typeof requestIdleCallback=="function"?requestIdleCallback(()=>{this._setupEmployeePhotoFallbacks(t),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(t,{onFetchFail:r=>{try{const l=(r.dataset.photoKey||"").trim();l&&sessionStorage.setItem(this._photoFailKey(l),Date.now().toString())}catch{}try{const l=r.parentElement;l&&(l.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}}})},{timeout:600}):setTimeout(()=>{this._setupEmployeePhotoFallbacks(t),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(t,{onFetchFail:r=>{try{const l=(r.dataset.photoKey||"").trim();l&&sessionStorage.setItem(this._photoFailKey(l),Date.now().toString())}catch{}try{const l=r.parentElement;l&&(l.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}}})},0),this.populateFilters(),requestAnimationFrame(async()=>{try{const r=this.getFilterValues();(r.search||r.department||r.branch||r.location||r.job||r.position||r.gender||r.showInactive)&&await this.applyFilters()}catch(r){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",r)}})},populateFilters(){const e=AppState.appData.employees||[],t=[...new Set(e.map(l=>l.department).filter(Boolean))].sort(),a=[...new Set(e.map(l=>l.branch).filter(Boolean))].sort(),i=[...new Set(e.map(l=>l.location).filter(Boolean))].sort(),o=[...new Set(e.map(l=>l.job||l.position).filter(Boolean))].sort(),n=[...new Set(e.map(l=>l.position||l.job).filter(Boolean))].sort(),s=document.getElementById("employee-filter-department");if(s){const l=s.value;s.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+t.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===l?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}const c=document.getElementById("employee-filter-branch");if(c){const l=c.value;c.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+a.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===l?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}const d=document.getElementById("employee-filter-location");if(d){const l=d.value;d.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+i.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===l?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}const m=document.getElementById("employee-filter-job");if(m){const l=m.value;m.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+o.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===l?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}const r=document.getElementById("employee-filter-position");if(r){const l=r.value;r.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+n.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===l?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}},setupEventListeners(){setTimeout(()=>{window.removeEventListener("employeesDataUpdated",this.handleDataUpdate),this.handleDataUpdate=p=>{if(p.detail?.externalWorkforce){clearTimeout(this._employeesUpdateDebounceTimer),this._externalWorkforceCache.clear(),this._employeesUpdateDebounceTimer=setTimeout(()=>{document.getElementById("external-workforce-table-container")&&this.renderExternalWorkforceTable()},60);return}if(this.activeTab==="data-analysis"&&document.getElementById("emp-analytics-root")){clearTimeout(this._employeesUpdateDebounceTimer),this._employeesUpdateDebounceTimer=setTimeout(()=>{this.updateEmployeesAnalyticsDashboard().catch(()=>{})},120);return}p.detail&&p.detail.count&&(clearTimeout(this._employeesUpdateDebounceTimer),this._employeesUpdateDebounceTimer=setTimeout(()=>{document.getElementById("employees-table-container")?requestAnimationFrame(()=>setTimeout(()=>this.loadEmployeesList(),0)):this.renderStatsCards()},120))},window.addEventListener("employeesDataUpdated",this.handleDataUpdate),document.querySelectorAll("[data-employees-tab]").forEach(p=>{p.addEventListener("click",()=>this.switchTab(p.getAttribute("data-employees-tab")||"employees-list"))}),this.ensureExternalWorkforceToolbar();const e=document.getElementById("external-workforce-year");e&&e.addEventListener("change",async p=>{const b=Number(p.target.value);!Number.isFinite(b)||b<2e3||(this.externalWorkforceYear=b,await this.ensureExternalWorkforceDataLoaded(),this.renderExternalWorkforceTable())});const t=document.getElementById("external-workforce-table-container");if(t){const p=async b=>{const y=b.target;!y||!y.matches(".external-workforce-input")||await this.saveExternalWorkforceValue(y.getAttribute("data-contractor-key")||"",y.getAttribute("data-month")||"",y.value)};t.addEventListener("change",p),t.addEventListener("blur",p,!0)}document.getElementById("external-workforce-export-excel-btn")?.addEventListener("click",()=>{this.exportExternalWorkforceToExcel()}),document.getElementById("external-workforce-export-pdf-btn")?.addEventListener("click",()=>{this.exportExternalWorkforceToPDF()});const a=document.getElementById("external-workforce-import-excel-btn"),i=document.getElementById("external-workforce-import-input");a&&i&&(a.addEventListener("click",()=>i.click()),i.addEventListener("change",async p=>{const b=p.target.files?.[0];b&&(await this.importExternalWorkforceExcelFile(b),p.target.value="")})),this.canViewExternalWorkforceTab()&&(this.populateExternalWorkforceYearSelector(),this.activeTab==="external-workforce"&&this.ensureExternalWorkforceDataLoaded().then(()=>this.renderExternalWorkforceTable()).catch(()=>{}));const o=document.getElementById("add-employee-btn"),n=document.getElementById("add-employee-empty-btn"),s=document.getElementById("import-employees-excel-btn"),c=document.getElementById("refresh-employees-btn"),d=document.getElementById("refresh-employee-names-btn"),m=document.getElementById("delete-all-employees-btn");if(AppState.debugMode&&Utils.safeLog("\u{1F50D} \u0641\u062D\u0635 \u0627\u0644\u0623\u0632\u0631\u0627\u0631:",{refreshBtn:!!c,refreshNamesBtn:!!d,deleteAllBtn:!!m,searchInput:!!document.getElementById("employees-search"),filterSearchInput:!!document.getElementById("employees-search-filter")}),o&&this.canAddOrImport()&&o.addEventListener("click",()=>this.showForm()),n&&this.canAddOrImport()&&n.addEventListener("click",()=>this.showForm()),s&&this.canAddOrImport()&&s.addEventListener("click",()=>this.showImportExcel()),c){const p=c.cloneNode(!0);c.parentNode.replaceChild(p,c),p.addEventListener("click",async()=>{p.disabled=!0;const b=p.innerHTML;p.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B...',typeof Loading<"u"&&Loading.show();try{if(await this.loadEmployeesFromBackend(!0)){const f=document.getElementById("show-inactive-employees")?.checked||!1;await this.loadEmployeesList(f),await this.applyFilters(),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}else typeof Notification<"u"&&Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u062F\u064A\u062F\u0629")}catch(y){typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+y.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",y)}finally{typeof Loading<"u"&&Loading.hide(),p.disabled=!1,p.innerHTML=b}})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");d&&this.canAddOrImport()&&d.addEventListener("click",async()=>this.refreshEmployeeNames()),m&&this.canAddOrImport()&&m.addEventListener("click",async()=>this.deleteAllEmployees());const r=document.getElementById("employees-search");if(r){const p=r.cloneNode(!0);r.parentNode.replaceChild(p,r);let b=null;const y=async()=>{try{const f=document.getElementById("employees-search-filter");f&&(f.value=p.value),await this.applyFilters()}catch(f){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0628\u062D\u062B:",f)}};p.addEventListener("input",f=>{b&&clearTimeout(b),b=setTimeout(y,300)}),p.addEventListener("keydown",async f=>{f.key==="Enter"&&(f.preventDefault(),b&&clearTimeout(b),await y())})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B \u0641\u064A header \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");const l=document.getElementById("employees-search-filter");if(l){const p=l.cloneNode(!0);l.parentNode.replaceChild(p,l);let b=null;const y=async()=>{try{r&&(r.value=p.value),await this.applyFilters()}catch(f){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0628\u062D\u062B:",f)}};p.addEventListener("input",f=>{b&&clearTimeout(b),b=setTimeout(y,300)}),p.addEventListener("keydown",async f=>{f.key==="Enter"&&(f.preventDefault(),b&&clearTimeout(b),await y())})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");["employee-filter-department","employee-filter-branch","employee-filter-location","employee-filter-job","employee-filter-position","employee-filter-gender"].forEach(p=>{const b=document.getElementById(p);b&&b.addEventListener("change",async()=>{try{await this.applyFilters()}catch(y){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631:",y)}})});const v=document.getElementById("employee-reset-filters");if(v){const p=v.cloneNode(!0);v.parentNode.replaceChild(p,v),p.addEventListener("click",async()=>{try{await this.resetFilters()}catch(b){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",b),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631")}})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");let x=document.getElementById("show-inactive-employees");if(x){const p=x.cloneNode(!0);x.parentNode.replaceChild(p,x),p.addEventListener("change",async b=>{const y=b.target.checked;AppState.debugMode&&Utils.safeLog(`\u{1F504} \u062A\u063A\u064A\u064A\u0631 \u062D\u0627\u0644\u0629 \u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646: ${y?"\u0639\u0631\u0636":"\u0625\u062E\u0641\u0627\u0621"}`);try{typeof Loading<"u"&&Loading.show();const f=document.getElementById("show-inactive-employees-container");f&&(y?(f.style.background="linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",f.style.borderColor="#dc2626",f.style.boxShadow="0 4px 12px rgba(220, 38, 38, 0.2)"):(f.style.background="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",f.style.borderColor="#dee2e6",f.style.boxShadow="none")),await this.loadEmployeesList(y);const w=document.getElementById("show-inactive-employees");w&&w.checked!==y&&(w.checked=y),await this.applyFilters(),this.updateInactiveCount(),typeof Notification<"u"&&Notification.success(y?"\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 (\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646)":"\u062A\u0645 \u0625\u062E\u0641\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646")}catch(f){p.checked=!y,AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",f),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}finally{typeof Loading<"u"&&Loading.hide(),this.updateInactiveCount()}}),this.updateInactiveCount(),setTimeout(()=>this.updateInactiveCount(),300)}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0632\u0631 \u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");window.addEventListener("employeesDataUpdated",()=>{this.updateInactiveCount(),setTimeout(()=>this.updateInactiveCount(),100)}),requestAnimationFrame(async()=>{try{const p=this.getFilterValues();(p.search||p.department||p.branch||p.location||p.job||p.position||p.gender||p.showInactive)&&await this.applyFilters()}catch(p){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",p)}});const g=document.getElementById("employee-form");g&&g.addEventListener("submit",p=>this.handleSubmit(p));const u=document.getElementById("cancel-employee-btn");u&&u.addEventListener("click",()=>this.showList()),this.setupPhotoPreview()},100)},async refreshEmployeeNames(){if(!this.canAddOrImport()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0646\u0641\u064A\u0630 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}const e=document.getElementById("refresh-employee-names-btn"),t=e?.innerHTML;e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621...'),typeof Loading<"u"&&Loading.show();try{await this.loadEmployeesFromBackend(!0);const a=Array.isArray(AppState.appData.employees)?AppState.appData.employees:[];if(a.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646");return}let i=0;const o=a.map(s=>{const c=s?.name??"",d=String(c).replace(/\s+/g," ").trim();return d!==String(c)&&i++,{...s,name:d}});AppState.appData.employees=o,this.cache.data=o,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.autoSave("Employees",AppState.appData.employees);const n=document.getElementById("show-inactive-employees")?.checked||!1;this.renderStatsCards(),this.loadEmployeesList(n),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(s){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",s)}}),Notification?.success?.(i>0?`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621 (${i} \u062A\u0639\u062F\u064A\u0644\u0627\u062A)`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u0623\u0633\u0645\u0627\u0621")}catch(a){Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621: "+(a?.message||a)),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",a)}finally{typeof Loading<"u"&&Loading.hide(),e&&(e.disabled=!1,e.innerHTML=t)}},async deleteAllEmployees(){if(!this.canAddOrImport()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0646\u0641\u064A\u0630 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}if(!window.confirm("\u062A\u062D\u0630\u064A\u0631: \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646. \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F\u061F"))return;const t=window.prompt("\u0623\u062F\u062E\u0644 \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0633\u0631\u064A \u0644\u0644\u062D\u0630\u0641:");if(t===null){Notification?.warning?.("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");return}const a=document.getElementById("delete-all-employees-btn"),i=a?.innerHTML;a&&(a.disabled=!0,a.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0630\u0641...');try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.callBackend)throw new Error("GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");const o=await GoogleIntegration.callBackend("deleteAllEmployees",{pin:String(t||"").trim()});if(!o||!o.success)throw new Error(o?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");AppState.appData.employees=[],this.cache.data=[],this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.renderStatsCards();const n=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(n),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(s){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",s)}}),Notification?.success?.(o?.message||"\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0628\u0646\u062C\u0627\u062D")}catch(o){Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(o?.message||o))}finally{a&&(a.disabled=!1,a.innerHTML=i)}},setupPhotoPreview(){const e=document.getElementById("employee-photo-input"),t=document.getElementById("employee-photo-preview"),a=document.getElementById("employee-photo-icon");e&&t&&a&&e.addEventListener("change",i=>{const o=i.target.files[0];if(o){const n=new FileReader;n.onload=s=>{t.src=s.target.result,t.style.display="block",a.style.display="none"},n.readAsDataURL(o)}})},currentEditId:null,async showForm(e=null){if(!e&&!this.canAddOrImport()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F");return}if(e&&!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641");return}this.currentEditId=e?.id||null;const t=document.getElementById("employees-content");t&&(t.innerHTML=await this.renderForm(e),this.applyModuleI18n(t),this.setupEventListeners())},async renderForm(e=null){const t=!!e;return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-${t?"edit":"user-plus"} ml-2"></i>
                        ${t?this.t("module.employees.editEmployee","\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0638\u0641"):this.t("module.employees.addNewEmployee","\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F")}
                    </h2>
                </div>
                <div class="card-body">
                    <form id="employee-form" class="space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div class="col-span-2">
                                <label for="employee-photo-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-image ml-2"></i>
                                    ${this.t("module.employees.employeePhoto","\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641")}
                                </label>
                                <div class="flex items-center gap-4">
                                    <div class="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                                        <img id="employee-photo-preview" src="${e?.photo||""}" alt="${this.t("module.employees.employeePhoto","\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641")}" style="width: 100%; height: 100%; object-fit: cover; display: ${e?.photo?"block":"none"};">
                                        <i id="employee-photo-icon" class="fas fa-user text-4xl text-gray-400" style="display: ${e?.photo?"none":"block"}"></i>
                                    </div>
                                    <div class="flex-1">
                                        <input 
                                            type="file" 
                                            id="employee-photo-input" 
                                            accept="image/*"
                                            class="form-input"
                                        >
                                        <p class="text-xs text-gray-500 mt-1">${this.t("module.employees.photoHint","\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0635\u0648\u0631\u0629 \u0645\u0631\u0628\u0639\u0629 \u0628\u062D\u062C\u0645 \u0644\u0627 \u064A\u062A\u062C\u0627\u0648\u0632 2MB")}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label for="employee-name" class="block text-sm font-semibold text-gray-700 mb-2">${this.t("module.employees.fullNameRequired","\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 *")}</label>
                                <input type="text" id="employee-name" required class="form-input" value="${e?.name||""}" placeholder="${this.t("module.employees.fullName","\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644")}">
                            </div>
                            <div>
                                <label for="employee-sap-id" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (ID SAP) *</label>
                                <input type="text" id="employee-sap-id" required class="form-input" value="${e?.sapId||e?.employeeNumber||""}" placeholder="ID SAP">
                            </div>
                            <div>
                                <label for="employee-number" class="block text-sm font-semibold text-gray-700 mb-2">${this.t("module.employees.employeeNumberRequired","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A *")}</label>
                                <input type="text" id="employee-number" required class="form-input" value="${e?.employeeNumber||""}" placeholder="${this.t("module.employees.employeeNumber","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}">
                            </div>
                            <div>
                                <label for="employee-hire-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646 *</label>
                                <input type="date" id="employee-hire-date" required class="form-input" value="${e?.hireDate?this.formatDateSafe(e.hireDate):""}">
                            </div>
                            <div>
                                <label for="employee-birth-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F</label>
                                <input type="date" id="employee-birth-date" class="form-input" value="${e?.birthDate?this.formatDateSafe(e.birthDate):""}">
                            </div>
                            <div>
                                <label for="employee-department" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 *</label>
                                <input type="text" id="employee-department" required class="form-input" value="${e?.department||""}" placeholder="\u0627\u0644\u0642\u0633\u0645">
                            </div>
                            <div>
                                <label for="employee-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0646\u0635\u0628 (Job) *</label>
                                <input type="text" id="employee-position" required class="form-input" value="${e?.position||""}" placeholder="\u0627\u0644\u0645\u0646\u0635\u0628">
                            </div>
                            <div>
                                <label for="employee-branch" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0631\u0639 (Branch)</label>
                                <input type="text" id="employee-branch" class="form-input" value="${e?.branch||""}" placeholder="\u0627\u0644\u0631\u0639">
                            </div>
                            <div>
                                <label for="employee-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 (Location)</label>
                                <input type="text" id="employee-location" class="form-input" value="${e?.location||""}" placeholder="\u0627\u0644\u0645\u0648\u0642\u0639">
                            </div>
                            <div>
                                <label for="employee-gender" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062C\u0646\u0633 (Gender)</label>
                                <select id="employee-gender" class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062C\u0646\u0633</option>
                                    <option value="\u0630\u0643\u0631" ${e?.gender==="\u0630\u0643\u0631"?"selected":""}>\u0630\u0643\u0631</option>
                                    <option value="\u0623\u0646\u062B\u0649" ${e?.gender==="\u0623\u0646\u062B\u0649"?"selected":""}>\u0623\u0646\u062B\u0649</option>
                                </select>
                            </div>
                            <div>
                                <label for="employee-national-id" class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u064A\u0629</label>
                                <input type="text" id="employee-national-id" class="form-input" value="${e?.nationalId||""}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u064A\u0629">
                            </div>
                            <div>
                                <label for="employee-email" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</label>
                                <input type="email" id="employee-email" class="form-input" value="${e?.email||""}" placeholder="\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A">
                            </div>
                            <div>
                                <label for="employee-phone" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0647\u0627\u062A\u0641</label>
                                <input type="tel" id="employee-phone" class="form-input" value="${e?.phone||""}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641">
                            </div>
                            <div>
                                <label for="employee-insurance-number" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A</label>
                                <input type="text" id="employee-insurance-number" class="form-input" value="${e?.insuranceNumber||""}" placeholder="\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A">
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" id="cancel-employee-btn" class="btn-secondary">${this.t("module.common.cancel","\u0625\u0644\u063A\u0627\u0621")}</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?this.t("module.common.saveChanges","\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A"):this.t("module.employees.addEmployee","\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `},normalizeEmployeeImportKey(e){return e==null?"":String(e).trim().replace(/\s+/g,"")},findExistingEmployeeByImportKey(e,t){const a=this.normalizeEmployeeImportKey(e),i=this.normalizeEmployeeImportKey(t);return(AppState.appData.employees||[]).find(n=>{const s=this.normalizeEmployeeImportKey(n.employeeNumber||n.id),c=this.normalizeEmployeeImportKey(n.sapId),d=this.normalizeEmployeeImportKey(n.id);return!!(a&&(s===a||d===a||c===a)||i&&(c===i||s===i||d===i))})||null},parseEmployeeImportRow(e,t){const a=c=>c==null?"":String(c).trim(),i=a(e["\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638"]||e["\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"]||e["Employee Name"]||e.Name||e.name||""),o=a(e["ID SAP"]||e["\u0631\u0642\u0645 SAP"]||e["SAP ID"]||e.sap_id||""),s=a(e["\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"]||e["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]||e["Employee Number"]||e.employee_number||"")||o;return{uid:t,name:i,sapId:o,employeeNumber:s,hireDate:a(e["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646"]||e["Hire Date"]||e.hire_date||""),job:a(e.Job||e.job||e.\u0627\u0644\u0645\u0646\u0635\u0628||""),department:a(e.Department||e.department||e.\u0627\u0644\u0642\u0633\u0645||""),branch:a(e.Branch||e.branch||e.\u0627\u0644\u0631\u0639||e.\u0627\u0644\u0641\u0631\u0639||""),location:a(e.Location||e.location||e.\u0627\u0644\u0645\u0648\u0642\u0639||""),gender:a(e.Gender||e.gender||e.\u0627\u0644\u062C\u0646\u0633||""),nationalId:a(e["\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u0649"]||e["\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u064A"]||e["National ID"]||e.national_id||""),birthDate:a(e["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F"]||e["Date of Birth"]||e.birth_date||""),email:a(e.Email||e.email||e["\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"]||""),phone:a(e.Phone||e.phone||e.\u0627\u0644\u0647\u0627\u062A\u0641||e.\u0627\u0644\u0647\u0627\u062A||""),insuranceNumber:a(e["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A"]||e["Insurance Number"]||e.insurance_number||e["\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646"]||""),status:"invalid"}},classifyEmployeeImportDraft(e,t){const a=this.normalizeEmployeeImportKey(e.employeeNumber),i=this.normalizeEmployeeImportKey(e.sapId),o=a||i;if(!o||!String(e.name||"").trim())return e.status="invalid",e;if(t){if(t.has(o))return e.status="invalid",e._dupInFile=!0,e;t.add(o)}const n=this.findExistingEmployeeByImportKey(e.employeeNumber,e.sapId);return e.status=n?"exists":"new",e},getEmployeeImportCounts(e){const t=Array.isArray(e)?e:[];return{total:t.length,newCount:t.filter(a=>a.status==="new").length,existsCount:t.filter(a=>a.status==="exists").length,invalidCount:t.filter(a=>a.status==="invalid").length}},reclassifyAllEmployeeImportDrafts(e){const t=new Set;return e.forEach(a=>{a._dupInFile=!1,this.classifyEmployeeImportDraft(a,t)}),e},buildEmployeeFromImportDraft(e){const t=this.normalizeEmployeeImportKey(e.employeeNumber)||this.normalizeEmployeeImportKey(e.sapId);if(!t||!String(e.name||"").trim())return null;const a=new Date().toISOString();return{id:t,name:String(e.name||"").trim(),employeeNumber:t,sapId:String(e.sapId||"").trim(),hireDate:this.normalizeDateOnly(e.hireDate)||this.normalizeDateOnly(new Date),job:String(e.job||"").trim(),position:String(e.job||"").trim(),department:String(e.department||"").trim(),branch:String(e.branch||"").trim(),location:String(e.location||"").trim(),gender:String(e.gender||"").trim(),nationalId:String(e.nationalId||"").trim(),birthDate:this.normalizeDateOnly(e.birthDate),email:String(e.email||"").trim(),phone:String(e.phone||"").trim(),insuranceNumber:String(e.insuranceNumber||"").trim(),photo:"",status:"active",createdAt:a,updatedAt:a}},renderEmployeeImportReview(e,t){const a=e.querySelector("#employee-import-summary"),i=e.querySelector("#employee-import-preview"),o=e.querySelector("#employee-import-new-body"),n=e.querySelector("#employee-import-confirm-btn");if(!a||!i||!o||!n)return;const s=this.getEmployeeImportCounts(t),c=t.filter(d=>d.status==="new");a.innerHTML=`
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
                <span style="background:#dcfce7;color:#166534;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">
                    \u062C\u062F\u064A\u062F (\u0633\u064A\u064F\u0636\u0627\u0641): ${s.newCount}
                </span>
                <span style="background:#f1f5f9;color:#475569;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">
                    \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B (\u062A\u062E\u0637\u0651\u064A \u2014 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0636): ${s.existsCount}
                </span>
                <span style="background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">
                    \u0646\u0627\u0642\u0635/\u063A\u064A\u0631 \u0635\u0627\u0644\u062D: ${s.invalidCount}
                </span>
                <span style="background:#e0f2fe;color:#075985;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">
                    \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0641: ${s.total}
                </span>
            </div>
            <p style="font-size:12px;color:#1e3a8a;margin:0;">
                \u0627\u0644\u062C\u062F\u0648\u0644 \u064A\u0639\u0631\u0636 \u0641\u0642\u0637 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u064A\u0646 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645. \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0648\u0646 \u0648\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646 \u0644\u0627 \u064A\u064F\u0639\u062F\u0651\u064E\u0644\u0648\u0646 \u0648\u0644\u0627 \u064A\u064F\u062D\u0630\u0641\u0648\u0646 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F.
            </p>
        `,c.length===0?o.innerHTML=`
                <tr>
                    <td colspan="8" style="text-align:center;padding:16px;color:#64748b;">
                        \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u062C\u062F\u062F \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0644\u0641.
                    </td>
                </tr>
            `:o.innerHTML=c.map(d=>`
                <tr data-import-uid="${Utils.escapeHTML(d.uid)}">
                    <td><input type="text" class="form-input emp-imp-field" data-field="employeeNumber" value="${Utils.escapeHTML(d.employeeNumber||"")}" style="min-width:90px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="sapId" value="${Utils.escapeHTML(d.sapId||"")}" style="min-width:80px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="name" value="${Utils.escapeHTML(d.name||"")}" style="min-width:120px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="department" value="${Utils.escapeHTML(d.department||"")}" style="min-width:90px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="job" value="${Utils.escapeHTML(d.job||"")}" style="min-width:90px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="branch" value="${Utils.escapeHTML(d.branch||"")}" style="min-width:80px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="hireDate" value="${Utils.escapeHTML(d.hireDate||"")}" style="min-width:90px;padding:4px 6px;font-size:12px;"></td>
                    <td style="white-space:nowrap;">
                        <button type="button" class="btn-icon btn-icon-danger emp-imp-remove" title="\u062D\u0630\u0641 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629" style="padding:4px 8px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join(""),i.classList.remove("hidden"),n.disabled=s.newCount===0,n.innerHTML=s.newCount>0?`<i class="fas fa-check ml-2"></i>\u062A\u0623\u0643\u064A\u062F \u0625\u0636\u0627\u0641\u0629 ${s.newCount} \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F`:'<i class="fas fa-ban ml-2"></i>\u0644\u0627 \u064A\u0648\u062C\u062F \u062C\u062F\u062F \u0644\u0644\u0625\u0636\u0627\u0641\u0629'},async showImportExcel(){if(!this.canAddOrImport()){Notification.error(this.t("module.employees.noImportPermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"));return}try{await this.ensureEmployeesLoaded(!1)}catch{}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 1100px; width: 96%;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2"></i>${this.t("module.employees.importModalTitle","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0645\u0644\u0641 Excel")}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="bg-amber-50 border border-amber-200 rounded p-4">
                            <p class="text-sm text-amber-900 mb-2"><strong>\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:</strong></p>
                            <ul class="text-sm text-amber-800 list-disc mr-6 mt-2 space-y-1">
                                <li>\u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F <strong>\u064A\u0636\u064A\u0641 \u0627\u0644\u062C\u062F\u062F \u0641\u0642\u0637</strong> (\u063A\u064A\u0631 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u064A\u0646 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645).</li>
                                <li><strong>\u0644\u0627 \u064A\u064F\u0639\u062F\u0651\u064E\u0644</strong> \u0648\u0644\u0627 <strong>\u064A\u064F\u062D\u0630\u0641</strong> \u0623\u064A \u0645\u0648\u0638\u0641 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u0645\u0633\u062A\u0642\u064A\u0644.</li>
                                <li>\u0631\u0627\u062C\u0639 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u062C\u064A\u062F\u0627\u064B \u0642\u0628\u0644 \u0627\u0644\u062A\u0623\u0643\u064A\u062F \u2014 \u064A\u0645\u0643\u0646\u0643 \u062A\u0639\u062F\u064A\u0644 \u0623\u0648 \u062D\u0630\u0641 \u0635\u0641 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0641\u0642\u0637.</li>
                            </ul>
                        </div>
                        <div class="bg-blue-50 border border-blue-200 rounded p-4">
                            <p class="text-sm text-blue-800 mb-2"><strong>\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629:</strong></p>
                            <ul class="text-sm text-blue-700 list-disc mr-6 mt-2 space-y-1">
                                <li><strong>ID SAP</strong> \u0623\u0648 <strong>\u0631\u0642\u0645 SAP</strong></li>
                                <li><strong>\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</strong> / <strong>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</strong> / <strong>Employee Number</strong></li>
                                <li><strong>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</strong> / <strong>Employee Name</strong></li>
                                <li>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646\u060C Job\u060C Department\u060C Branch\u060C Location\u060C Gender\u060C \u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629\u060C \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F\u060C \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A</li>
                            </ul>
                        </div>
                        <div>
                            <label for="employee-excel-file-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-file-excel ml-2"></i>
                                \u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx, .xls)
                            </label>
                            <input type="file" id="employee-excel-file-input" accept=".xlsx,.xls" class="form-input">
                        </div>
                        <div id="employee-import-summary"></div>
                        <div id="employee-import-preview" class="hidden">
                            <h3 class="text-sm font-semibold mb-2">\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u062C\u062F\u062F \u0641\u0642\u0637 (\u063A\u064A\u0631 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u064A\u0646 \u0628\u0627\u0644\u0646\u0638\u0627\u0645):</h3>
                            <div class="max-h-80 overflow-auto border rounded">
                                <table class="data-table text-xs" style="min-width:100%;">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                                            <th>SAP</th>
                                            <th>\u0627\u0644\u0627\u0633\u0645</th>
                                            <th>\u0627\u0644\u0642\u0633\u0645</th>
                                            <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                                            <th>\u0627\u0644\u0641\u0631\u0639</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="employee-import-new-body"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${this.t("module.common.cancel","\u0625\u0644\u063A\u0627\u0621")}</button>
                    <button type="button" id="employee-import-confirm-btn" class="btn-primary" disabled>
                        <i class="fas fa-check ml-2"></i>
                        ${this.t("module.employees.confirmImport","\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F")}
                    </button>
                </div>
            </div>
        `,this.applyModuleI18n(e),document.body.appendChild(e);const t=e.querySelector("#employee-excel-file-input"),a=e.querySelector("#employee-import-confirm-btn");let i=[];const o=()=>this.renderEmployeeImportReview(e,i);t.addEventListener("change",async n=>{const s=n.target.files[0];if(s){Loading.show();try{const c=await s.arrayBuffer(),d=XLSX.read(c,{type:"array",cellDates:!0}),m=d.SheetNames[0],r=d.Sheets[m],l=XLSX.utils.sheet_to_json(r,{header:1,defval:"",raw:!1});if(l.length<2){Notification.error(this.t("module.employees.invalidFile","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D")),i=[],o(),Loading.hide();return}const h=l[0].map(g=>String(g||"").trim()),v=l.slice(1).map(g=>{const u={};return h.forEach((p,b)=>{const y=g[b];u[p]=y??""}),u}).filter(g=>h.some(u=>String(g[u]||"").trim()!=="")),x=new Set;i=v.map((g,u)=>{const p=this.parseEmployeeImportRow(g,`imp-${u}-${Date.now()}`);return this.classifyEmployeeImportDraft(p,x)}),o(),Loading.hide()}catch(c){Loading.hide(),Notification.error(this.t("module.employees.readFileFailed","\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641")+": "+c.message)}}}),e.addEventListener("change",n=>{const s=n.target.closest(".emp-imp-field");if(!s)return;const c=s.closest("tr[data-import-uid]");if(!c)return;const d=c.getAttribute("data-import-uid"),m=i.find(l=>l.uid===d);if(!m)return;const r=s.getAttribute("data-field");r&&(m[r]=s.value,this.reclassifyAllEmployeeImportDrafts(i),o())}),e.addEventListener("click",n=>{const s=n.target.closest(".emp-imp-remove");if(s){const c=s.closest("tr[data-import-uid]");if(!c)return;const d=c.getAttribute("data-import-uid");i=i.filter(m=>m.uid!==d),this.reclassifyAllEmployeeImportDrafts(i),o();return}n.target===e&&e.remove()}),a.addEventListener("click",async()=>{const n=i.filter(d=>d.status==="new");if(n.length===0){Notification.warning("\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u062C\u062F\u062F \u0644\u0644\u0625\u0636\u0627\u0641\u0629");return}const s=this.getEmployeeImportCounts(i);if(window.confirm(`\u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 ${n.length} \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F \u0641\u0642\u0637.
\u062A\u062E\u0637\u0651\u064A \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B: ${s.existsCount}
\u0646\u0627\u0642\u0635/\u063A\u064A\u0631 \u0635\u0627\u0644\u062D: ${s.invalidCount}

\u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0648\u0646 \u0648\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646 \u0644\u0646 \u064A\u064F\u0639\u062F\u0651\u064E\u0644\u0648\u0627 \u0648\u0644\u0646 \u064A\u064F\u062D\u0630\u0641\u0648\u0627.
\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`)){Loading.show();try{let d=0,m=0;n.forEach(l=>{try{if(this.findExistingEmployeeByImportKey(l.employeeNumber,l.sapId)){m++;return}const h=this.buildEmployeeFromImportDraft(l);if(!h){m++;return}if(this.findExistingEmployeeByImportKey(h.employeeNumber,h.sapId)){m++;return}AppState.appData.employees.push(h),d++}catch{m++}}),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Employees",AppState.appData.employees),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),Notification.success(`\u0623\u064F\u0636\u064A\u0641 ${d} \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F`+(s.existsCount>0?` \u2014 \u062A\u064F\u062E\u0637\u064A \u0645\u0648\u062C\u0648\u062F ${s.existsCount}`:"")+(s.invalidCount>0?` \u2014 \u0646\u0627\u0642\u0635 ${s.invalidCount}`:"")+(m>0?` \u2014 \u0627\u0633\u062A\u064F\u0628\u0639\u062F \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638 ${m}`:"")),e.remove(),this.renderStatsCards();const r=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(r),requestAnimationFrame(()=>{this.applyFilters()})}catch(d){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+d.message)}}})},async handleSubmit(e){e.preventDefault();const t=e.target?.querySelector('button[type="submit"]')||document.querySelector('#employee-form button[type="submit"]');if(t&&t.disabled)return;let a="";t&&(a=t.innerHTML,t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const i=this.currentEditId?AppState.appData.employees.find($=>$.id===this.currentEditId):null;let o=i?.photo||"";const n=document.getElementById("employee-photo-input");if(n&&n.files.length>0){const $=n.files[0];if($.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0647\u0648 2MB"),t&&(t.disabled=!1,t.innerHTML=a);return}o=await this.convertImageToBase64($)}const s=document.getElementById("employee-name"),c=document.getElementById("employee-number"),d=document.getElementById("employee-sap-id"),m=document.getElementById("employee-hire-date"),r=document.getElementById("employee-birth-date"),l=document.getElementById("employee-department"),h=document.getElementById("employee-position"),v=document.getElementById("employee-branch"),x=document.getElementById("employee-location"),g=document.getElementById("employee-gender"),u=document.getElementById("employee-national-id"),p=document.getElementById("employee-email"),b=document.getElementById("employee-phone"),y=document.getElementById("employee-insurance-number");if(!s||!c||!d||!l||!h||!v||!x||!g||!p||!b){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const f=!!this.currentEditId,w=f&&i?.hireDate||"",S=f&&i?.birthDate||"",k={id:c.value.trim()||this.currentEditId||Utils.generateId("EMP"),name:s.value.trim(),employeeNumber:c.value.trim(),sapId:d.value.trim(),hireDate:m?.value?this.normalizeDateOnly(m.value):f?this.normalizeDateOnly(w):this.normalizeDateOnly(new Date),birthDate:r?.value?this.normalizeDateOnly(r.value):f?this.normalizeDateOnly(S):"",department:l.value.trim(),job:h.value.trim(),position:h.value.trim(),branch:v.value.trim(),location:x.value.trim(),gender:g.value,nationalId:u?.value.trim()||"",email:p.value.trim(),phone:b.value.trim(),insuranceNumber:y?.value.trim()||"",photo:o,status:f&&i?.status||"active",resignationDate:f&&i?.resignationDate||"",createdAt:this.currentEditId?i?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(!k.name||!k.sapId||!k.employeeNumber||!k.department||!k.position){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u060C \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u060C \u0627\u0644\u0642\u0633\u0645\u060C \u0627\u0644\u0645\u0646\u0635\u0628)"),t&&(t.disabled=!1,t.innerHTML=a);return}const A=String(k.id||"").trim();if(!A){Notification.error("\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D (\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0646\u0634\u0627\u0621 id \u0641\u0627\u0631\u063A)"),t&&(t.disabled=!1,t.innerHTML=a);return}if(AppState.appData.employees.some($=>{const M=String($?.id||"").trim();return!M||this.currentEditId&&M===String(this.currentEditId).trim()?!1:M===A})){Notification.error("\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0631\u0642\u0645 \u0622\u062E\u0631."),t&&(t.disabled=!1,t.innerHTML=a);return}Loading.show();try{if(this.currentEditId){const $=AppState.appData.employees.findIndex(M=>M.id===this.currentEditId);$!==-1&&(AppState.appData.employees[$]=k,this.currentEditId=A),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.employees.push(k),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Employees",AppState.appData.employees),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),t&&(t.disabled=!1,t.innerHTML=a),this.renderStatsCards(),this.showList()}catch($){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+$.message),t&&(t.disabled=!1,t.innerHTML=a)}},async convertImageToBase64(e){return new Promise((t,a)=>{const i=new FileReader;i.onload=()=>t(i.result),i.onerror=a,i.readAsDataURL(e)})},async showList(){this.currentEditId=null,!this.canViewEmployeesRegistryTab()&&this.canViewEmployeesAnalysisTab()?this.activeTab="data-analysis":!this.canViewEmployeesRegistryTab()&&this.canViewExternalWorkforceTab()?this.activeTab="external-workforce":!this.canViewExternalWorkforceTab()&&!this.canViewEmployeesAnalysisTab()&&(this.activeTab="employees-list");const e=document.getElementById("employees-content");e&&(e.innerHTML=await this.renderList(),this.applyModuleI18n(e),requestAnimationFrame(()=>{this.setupEventListeners(),this.canViewEmployeesRegistryTab()&&this.activeTab==="employees-list"?this.loadEmployeesList():this.activeTab==="data-analysis"&&this.canViewEmployeesAnalysisTab()?this.loadEmployeesAnalysis().catch(()=>{}):this.canViewExternalWorkforceTab()&&(this.populateExternalWorkforceYearSelector(),this.ensureExternalWorkforceDataLoaded().then(()=>this.renderExternalWorkforceTable()).catch(()=>{})),this.activeTab==="employees-list"&&this.scrollToSearchField()}))},async editEmployee(e){if(!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641");return}const t=AppState.appData.employees.find(a=>a.id===e);t&&await this.showForm(t)},async printEmployee(e){const t=AppState.appData.employees.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show();let a="";const i=this._normalizeEmployeePhotoUrl(t.photo,t.id);if(i&&typeof Utils.resolveDriveAwareImgDisplay=="function"){const p=Utils.resolveDriveAwareImgDisplay(i);if(p.needsProxy&&typeof Utils.fetchDriveImageDataUri=="function")try{a=await Utils.fetchDriveImageDataUri(p.proxyFileId)||""}catch{a=""}a||(a=p.canonical||i)}else i&&(a=i);const o=this.formatDateSafe(t.birthDate),n=this.formatDateSafe(t.hireDate),s=this.calculateAge(t.birthDate),c=p=>{if(!p)return"-";try{const b=new Date(p),y=b.getFullYear(),f=b.getMonth()+1,w=b.getDate(),S=["\u0660","\u0661","\u0662","\u0663","\u0664","\u0665","\u0666","\u0667","\u0668","\u0669"],k=A=>String(A).split("").map(L=>S[parseInt(L)]||L).join("");return`${k(y)}/${k(f)}/${k(w)}`}catch{return p}},d=new Date,m=c(d.toISOString().split("T")[0]),r=d.toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}),l=AppState?.companySettings?.name||AppState?.appData?.companyName||"\u0627\u0644\u0634\u0631\u0643\u0629",h=`
                <style>
                    @page { size: A4; margin: 20mm; }
                    body {
                        font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
                        direction: rtl;
                        margin: 0;
                        padding: 0;
                        background: #ffffff;
                        color: #1f2937;
                    }
                    .employee-card {
                        max-width: 800px;
                        margin: 0 auto;
                        background: #ffffff;
                        padding: 30px;
                    }
                    .card-header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .company-name {
                        font-size: 18px;
                        font-weight: 700;
                        color: #2563eb;
                        margin-bottom: 5px;
                        white-space: nowrap;
                        word-break: keep-all;
                        overflow-wrap: normal;
                    }
                    .card-title {
                        font-size: 22px;
                        font-weight: 700;
                        color: #1e40af;
                        margin-bottom: 10px;
                    }
                    .header-line {
                        width: 100%;
                        height: 2px;
                        background: #2563eb;
                        margin: 10px 0 20px 0;
                    }
                    .employee-photo {
                        text-align: center;
                        margin: 20px 0 30px 0;
                    }
                    .employee-photo img {
                        width: 150px;
                        height: 150px;
                        border-radius: 50%;
                        object-fit: cover;
                        border: 3px solid #e5e7eb;
                    }
                    .employee-photo-placeholder {
                        width: 150px;
                        height: 150px;
                        border-radius: 50%;
                        background: #f3f4f6;
                        margin: 0 auto;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 3px solid #e5e7eb;
                    }
                    .employee-photo-placeholder svg {
                        width: 80px;
                        height: 80px;
                        fill: #9ca3af;
                    }
                    .employee-details {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin-bottom: 30px;
                    }
                    .detail-field {
                        background: #f9fafb;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                        padding: 12px 15px;
                    }
                    .detail-label {
                        font-size: 13px;
                        font-weight: 600;
                        color: #6b7280;
                        margin-bottom: 5px;
                    }
                    .detail-value {
                        font-size: 15px;
                        font-weight: 500;
                        color: #1f2937;
                    }
                    .card-footer {
                        text-align: center;
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 1px solid #e5e7eb;
                        font-size: 12px;
                        color: #6b7280;
                        line-height: 1.8;
                    }
                    .footer-text {
                        margin-bottom: 8px;
                    }
                    .print-date {
                        font-size: 11px;
                        color: #9ca3af;
                    }
                    @media print {
                        body { background: #ffffff; }
                        .employee-card { box-shadow: none; }
                    }
                </style>
                <div class="employee-card">
                    <div class="card-header">
                        <div class="company-name">${Utils.escapeHTML(l)}</div>
                        <div class="card-title">\u0628\u0637\u0627\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641</div>
                        <div class="header-line"></div>
                    </div>
                    <div class="employee-photo">
                        ${a?`<img src="${Utils.escapeHTML(a)}" alt="${Utils.escapeHTML(t.name||"")}"
                                     onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'employee-photo-placeholder\\'><svg viewBox=\\'0 0 24 24\\' xmlns=\\'http://www.w3.org/2000/svg\\'><path d=\\'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\\'/></svg></div>';">`:`<div class="employee-photo-placeholder">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>`}
                    </div>
                    <div class="employee-details">
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</div>
                            <div class="detail-value">${Utils.escapeHTML(t.employeeNumber||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644</div>
                            <div class="detail-value">${Utils.escapeHTML(t.name||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</div>
                            <div class="detail-value">${Utils.escapeHTML(t.position||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0642\u0633\u0645</div>
                            <div class="detail-value">${Utils.escapeHTML(t.department||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F</div>
                            <div class="detail-value">${c(o)}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u064A\u0629</div>
                            <div class="detail-value">${Utils.escapeHTML(t.nationalId||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646</div>
                            <div class="detail-value">${c(n)}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0633\u0646</div>
                            <div class="detail-value">${s?s+" \u0633\u0646\u0629":"-"}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641</div>
                            <div class="detail-value">${Utils.escapeHTML(t.phone||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0646\u0648\u0639</div>
                            <div class="detail-value">${Utils.escapeHTML(t.gender==="\u0630\u0643\u0631"?"Male":t.gender==="\u0623\u0646\u062B\u0649"?"Female":t.gender||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</div>
                            <div class="detail-value">${Utils.escapeHTML(t.email||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A</div>
                            <div class="detail-value">${Utils.escapeHTML(t.insuranceNumber||"-")}</div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="footer-text">\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u062A\u0645 \u0625\u0646\u0634\u0627\u0624\u0647 \u0622\u0644\u064A\u0627\u064B \u0645\u0646 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629</div>
                        <div class="print-date">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ${m} - ${r}</div>
                    </div>
                </div>
            `,v=`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u0628\u0637\u0627\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641 - ${Utils.escapeHTML(t.name||"")}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    ${h}
</head>
<body>
    ${h}
</body>
</html>`,x=new Blob([v],{type:"text/html;charset=utf-8"}),g=URL.createObjectURL(x),u=window.open(g,"_blank");u?u.onload=()=>{const p=u.document.querySelectorAll("img");let b=0;const y=p.length;if(y===0)setTimeout(()=>{u.print(),setTimeout(()=>{URL.revokeObjectURL(g),Loading.hide()},800)},300);else{const f=()=>{b>=y&&setTimeout(()=>{u.print(),setTimeout(()=>{URL.revokeObjectURL(g),Loading.hide()},800)},300)};p.forEach(w=>{w.complete?(b++,f()):(w.onload=()=>{b++,f()},w.onerror=()=>{b++,f()})}),setTimeout(()=>{b<y&&(u.print(),setTimeout(()=>{URL.revokeObjectURL(g),Loading.hide()},800))},3e3)}}:(URL.revokeObjectURL(g),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+a.message)}},async viewEmployee(e){const t=AppState.appData.employees.find(s=>s.id===e);if(!t)return;const a=this.formatDateSafe(t.birthDate),i=this.formatDateSafe(t.hireDate),o=this.calculateAge(t.birthDate),n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">${this.t("module.employees.employeeDetails","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641")}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="text-center mb-4">
                            ${(()=>{const s=this._normalizeEmployeePhotoUrl(t.photo,t.id);if(!s)return'<div class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto"><i class="fas fa-user text-5xl text-gray-400"></i></div>';const c=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(s):{canonical:s,displaySrc:s,needsProxy:!1,proxyFileId:""},d=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(c):"";return`<img src="${Utils.escapeHTML(c.displaySrc)}" alt="${Utils.escapeHTML(t.name||"")}"${d} class="emp-detail-photo w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200">`})()}
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.fullName","\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.name||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.employeeNumber","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(t.employeeNumber||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.department||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.position||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.nationalId","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.nationalId||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.birthDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F")}:</label>
                                <p class="text-gray-800">${a||""}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.age","\u0627\u0644\u0633\u0646")}:</label>
                                <p class="text-gray-800">${o?o+" "+this.t("module.common.yearsUnit","\u0633\u0646\u0629"):""}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.hireDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646")}:</label>
                                <p class="text-gray-800">${i||""}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.gender||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.phone","\u0627\u0644\u0647\u0627\u062A\u0641")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.phone||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.insuranceNo","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.insuranceNumber||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.email","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.email||"")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${this.t("module.common.close","\u0625\u063A\u0644\u0627\u0642")}</button>
                    <button class="btn-secondary" onclick="Employees.printEmployee('${t.id}')">
                        <i class="fas fa-print ml-2"></i>${this.t("module.common.print","\u0637\u0628\u0627\u0639\u0629")}
                    </button>
                    ${Employees.canEditOrDelete()?`
                    <button class="btn-primary" onclick="Employees.editEmployee('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>${this.t("module.common.edit","\u062A\u0639\u062F\u064A\u0644")}
                    </button>
                    `:""}
                </div>
            </div>
        `,this.applyModuleI18n(n),document.body.appendChild(n),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(n,{onFetchFail:s=>{try{const c=document.createElement("div");c.className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto",c.innerHTML='<i class="fas fa-user text-5xl text-gray-400"></i>',s.replaceWith(c)}catch{}}}),n.addEventListener("click",s=>{s.target===n&&n.remove()})},async deactivateEmployee(e){if(!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641");return}const t=AppState.appData.employees.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 "${t.name}"\u061F
\u0633\u064A\u062A\u0645 \u0625\u062E\u0641\u0627\u0624\u0647 \u0645\u0646 \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0648\u0644\u0643\u0646 \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0628\u064A\u0627\u0646\u0627\u062A\u0647 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645.`)){Loading.show();try{const a=AppState.appData.employees.findIndex(o=>o.id===e);a!==-1&&(AppState.appData.employees[a].status="inactive",AppState.appData.employees[a].resignationDate=this.normalizeDateOnly(new Date),AppState.appData.employees[a].updatedAt=new Date().toISOString()),setTimeout(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},50),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),this.renderStatsCards();const i=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(i),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(o){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",o)}}),AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendToAppsScript("deactivateEmployee",{employeeId:e}).then(o=>{!o||!o.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0646 Google Sheets:",o?.message):Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}).catch(o=>Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",o))}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+a.message)}}},async deleteEmployee(e){if(!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0638\u0641");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641 \u0646\u0647\u0627\u0626\u064A\u0627\u064B\u061F
\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627!`)){Loading.show();try{AppState.appData.employees=(AppState.appData.employees||[]).filter(a=>a.id!==e),setTimeout(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},50),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),this.renderStatsCards();const t=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(t),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(a){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",a)}}),AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendToAppsScript("deleteEmployee",{employeeId:e}).then(a=>{!a||!a.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641 \u0645\u0646 Google Sheets:",a?.message):Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u062D\u0630\u0641 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}).catch(a=>Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062D\u0630\u0641 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",a))}catch(t){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}}},scrollToSearchField(){setTimeout(()=>{const e=document.getElementById("employees-search");if(e){const t=window.scrollY||document.documentElement.scrollTop,a=Math.max(0,(e.offsetTop||0)-20),i=t+window.innerHeight;(a<t||a>i-100)&&window.scrollTo({top:a,behavior:"smooth"})}},0)},getFilterValues(){return{search:document.getElementById("employees-search-filter")?.value||document.getElementById("employees-search")?.value||"",department:document.getElementById("employee-filter-department")?.value||"",branch:document.getElementById("employee-filter-branch")?.value||"",location:document.getElementById("employee-filter-location")?.value||"",job:document.getElementById("employee-filter-job")?.value||"",position:document.getElementById("employee-filter-position")?.value||"",gender:document.getElementById("employee-filter-gender")?.value||"",showInactive:document.getElementById("show-inactive-employees")?.checked||!1}},async filterEmployees(e="",t=!1,a=null){try{if(a)t=a.showInactive!==void 0&&a.showInactive!==null?a.showInactive:t;else{const r=this.getFilterValues();e=e||r.search,t=t??(r.showInactive||!1),a=r,a.showInactive=t}const i=document.getElementById("employees-table-container");if(!i){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F employees-table-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let o=i.querySelector("tbody");if(!o&&(await this.loadEmployeesList(t),o=i.querySelector("tbody"),!o)){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F tbody \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0628\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629");return}let n=AppState.appData.employees||[];t||(n=n.filter(r=>!this.isEmployeeInactive(r)));let s=n;const c=this.canEditOrDelete();if(e&&e.trim()){const r=e.trim().toLowerCase();s=s.filter(l=>l.name&&l.name.toLowerCase().includes(r)||l.employeeNumber&&String(l.employeeNumber).toLowerCase().includes(r)||l.sapId&&String(l.sapId).toLowerCase().includes(r)||l.department&&l.department.toLowerCase().includes(r)||l.position&&l.position.toLowerCase().includes(r)||l.job&&l.job.toLowerCase().includes(r)||l.branch&&l.branch.toLowerCase().includes(r)||l.location&&l.location.toLowerCase().includes(r)||l.nationalId&&l.nationalId.toLowerCase().includes(r)||l.phone&&l.phone.toLowerCase().includes(r)||l.insuranceNumber&&l.insuranceNumber.toLowerCase().includes(r)||l.email&&l.email.toLowerCase().includes(r)||l.gender&&l.gender.toLowerCase().includes(r))}a.department&&(s=s.filter(r=>String(r.department||"").trim()===String(a.department).trim())),a.branch&&(s=s.filter(r=>String(r.branch||"").trim()===String(a.branch).trim())),a.location&&(s=s.filter(r=>String(r.location||"").trim()===String(a.location).trim())),a.job&&(s=s.filter(r=>String(r.job||"").trim()===String(a.job).trim())),a.position&&(s=s.filter(r=>String(r.position||"").trim()===String(a.position).trim())),a.gender&&(s=s.filter(r=>String(r.gender||"").trim()===String(a.gender).trim()));const d=document.createDocumentFragment(),m=13;if(s.length===0){const r=document.createElement("tr");r.innerHTML=`<td colspan="${m}" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C</td>`,d.appendChild(r)}else s.forEach(r=>{const l=this.formatDateSafe(r.birthDate),h=this.formatDateSafe(r.hireDate),v=this.calculateAge(r.birthDate),x=this.isEmployeeInactive(r),g=x?"opacity: 0.7; background-color: #f8f9fa;":"",u=document.createElement("tr");x&&(u.style.cssText=g);const p=this._normalizeEmployeePhotoUrl(r.photo,r.id),y=(this._getDriveIdFromUrl(r.photo||"")||r.id||r.employeeNumber||r.name||"").toString(),f=p&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(p):{canonical:p||"",displaySrc:p||"",needsProxy:!1,proxyFileId:""},w=f.canonical?f.displaySrc:"",S=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(f):"";u.innerHTML=`
                    <td style="word-wrap: break-word;">
                        ${p?`<img data-emp-photo="1" data-photo-key="${Utils.escapeHTML(y)}" src="${Utils.escapeHTML(w)}" alt="${Utils.escapeHTML(r.name||"")}"${S} class="w-12 h-12 rounded-full object-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer">`:'<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>'}
                    </td>
                    <td style="word-wrap: break-word; white-space: normal;">
                        ${Utils.escapeHTML(r.employeeNumber||"")}
                        ${x?'<span class="badge badge-warning ml-2" style="font-size: 10px; padding: 2px 6px;">\u063A\u064A\u0631 \u0646\u0634\u0637</span>':""}
                    </td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px;">
                        ${Utils.escapeHTML(r.name||"")}
                        ${x&&r.resignationDate?`<br><span class="text-xs text-gray-500" style="font-size: 11px;">\u0627\u0633\u062A\u0642\u0627\u0644: ${this.formatDateSafe(r.resignationDate)}</span>`:""}
                    </td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(r.department||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(r.job||r.position||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(r.nationalId||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${l||""}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${v?v+" \u0633\u0646\u0629":""}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${h||""}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(r.gender||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(r.phone||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(r.insuranceNumber||"")}</td>
                    ${c?`
                    <td style="min-width: 150px;">
                        <div class="flex items-center gap-2 flex-wrap">
                            <button onclick="Employees.viewEmployee('${r.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="Employees.editEmployee('${r.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="Employees.deactivateEmployee('${r.id}')" class="btn-icon btn-icon-danger" title="\u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644">
                                <i class="fas fa-user-slash"></i>
                            </button>
                        </div>
                    </td>
                    `:`
                    <td>
                        <span class="text-gray-400 text-sm">\u2014</span>
                    </td>
                    `}
                `,d.appendChild(u)});o.innerHTML="",o.appendChild(d),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(o,{onFetchFail:r=>{try{const l=(r.dataset.photoKey||"").trim();l&&sessionStorage.setItem(this._photoFailKey(l),Date.now().toString())}catch{}try{const l=r.parentElement;l&&(l.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}}}),this.updateFilterBadges(n,s,a),AppState.debugMode&&e&&Utils.safeLog(`\u{1F50D} \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0628\u062D\u062B: ${s.length} \u0645\u0646 ${n.length} \u0645\u0648\u0638\u0641`)}catch(i){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A filterEmployees:",i)}},updateFilterBadges(e,t,a){try{if(!a){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F updateFilterBadges: filters \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const i=(o,n,s)=>{try{const c=document.getElementById(o);if(!c){AppState.debugMode&&n&&Utils.safeWarn(`\u26A0\uFE0F updateFilterLabel: ${o} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F`);return}const d=c.closest(".filter-field");if(!d){AppState.debugMode&&n&&Utils.safeWarn(`\u26A0\uFE0F updateFilterLabel: filter-field \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0644\u0640 ${o}`);return}const m=d.querySelector(".filter-label");if(!m){AppState.debugMode&&n&&Utils.safeWarn(`\u26A0\uFE0F updateFilterLabel: filter-label \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0644\u0640 ${o}`);return}const r=m.querySelector(".filter-count-badge");if(r&&r.remove(),n&&n.trim()!==""){const l=document.createElement("span");l.className="filter-count-badge",l.title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629",l.textContent=s;const h=m.querySelector("i");h?h.insertAdjacentElement("afterend",l):m.insertBefore(l,m.firstChild),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0634\u0627\u0631\u0629 \u0627\u0644\u0639\u062F\u062F (${s}) \u0644\u0640 ${o}`)}}catch(c){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0634\u0627\u0631\u0629 \u0627\u0644\u0641\u0644\u062A\u0631:",c)}};if(a.department?i("employee-filter-department",a.department,t.length):i("employee-filter-department","",0),a.branch?i("employee-filter-branch",a.branch,t.length):i("employee-filter-branch","",0),a.location?i("employee-filter-location",a.location,t.length):i("employee-filter-location","",0),a.job?i("employee-filter-job",a.job,t.length):i("employee-filter-job","",0),a.position?i("employee-filter-position",a.position,t.length):i("employee-filter-position","",0),a.gender?i("employee-filter-gender",a.gender,t.length):i("employee-filter-gender","",0),a.search&&a.search.trim())try{const o=document.getElementById("employees-search-filter")||document.getElementById("employees-search");if(o){const n=o.closest(".filter-field");if(n){const s=n.querySelector(".filter-label");if(s){const c=s.querySelector(".filter-count-badge");c&&c.remove();const d=document.createElement("span");d.className="filter-count-badge",d.title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629",d.textContent=t.length;const m=s.querySelector("i");m?m.insertAdjacentElement("afterend",d):s.insertBefore(d,s.firstChild)}}}}catch(o){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0634\u0627\u0631\u0629 \u0627\u0644\u0628\u062D\u062B:",o)}else try{const o=document.getElementById("employees-search-filter")||document.getElementById("employees-search");if(o){const n=o.closest(".filter-field");if(n){const s=n.querySelector(".filter-label");if(s){const c=s.querySelector(".filter-count-badge");c&&c.remove()}}}}catch(o){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0634\u0627\u0631\u0629 \u0627\u0644\u0628\u062D\u062B:",o)}}catch(i){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A updateFilterBadges:",i)}},async applyFilters(){try{const e=this.getFilterValues();await this.filterEmployees(e.search,e.showInactive,e),this.updateInactiveCount()}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A applyFilters:",e)}finally{this.updateInactiveCount()}},async resetFilters(){const e=document.getElementById("employees-search"),t=document.getElementById("employees-search-filter");e&&(e.value=""),t&&(t.value=""),["employee-filter-department","employee-filter-branch","employee-filter-location","employee-filter-job","employee-filter-position","employee-filter-gender"].forEach(n=>{const s=document.getElementById(n);s&&(s.value="")});const i=document.getElementById("show-inactive-employees");i&&(i.checked=!1);const o=document.getElementById("show-inactive-employees-container");o&&(o.style.background="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",o.style.borderColor="#dee2e6",o.style.boxShadow="none"),await this.applyFilters(),this.updateInactiveCount()},updateInactiveCount(e=0){const i=()=>{try{const n=(AppState.appData.employees||[]).filter(c=>this.isEmployeeInactive(c)).length,s=document.getElementById("inactive-employees-count");if(s){s.textContent=n;const c=n===0,d=c?"#6b7280":"#dc2626",m=c?"0 2px 4px rgba(107, 114, 128, 0.3)":"0 2px 4px rgba(220, 38, 38, 0.3)";s.style.cssText=`
                        display: inline-flex !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        align-items: center;
                        justify-content: center;
                        min-width: 24px;
                        height: 22px;
                        padding: 0 8px;
                        background: ${d};
                        color: white;
                        border-radius: 11px;
                        font-size: 11px;
                        font-weight: 700;
                        margin-right: 4px;
                        box-shadow: ${m};
                        transition: all 0.3s ease;
                    `;const r=document.getElementById("show-inactive-employees");r&&r.checked&&!c?(s.style.background="linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",s.style.boxShadow="0 2px 6px rgba(220, 38, 38, 0.4)",s.style.transform="scale(1.1)"):s.style.transform="scale(1)",AppState.debugMode&&Utils.safeLog(`\u{1F4CA} \u0639\u062F\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646: ${n}`)}else e<3?(AppState.debugMode&&Utils.safeLog(`\u23F3 \u0627\u0644\u0639\u0646\u0635\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u060C \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 ${e+1}/3...`),setTimeout(()=>{this.updateInactiveCount(e+1)},100)):AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0639\u0646\u0635\u0631 \u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646 \u0628\u0639\u062F \u0639\u062F\u0629 \u0645\u062D\u0627\u0648\u0644\u0627\u062A")}catch(o){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u062F\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646:",o)}};e===0?requestAnimationFrame(i):i()},async init(){try{AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0?(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 (${this.cache.data.length} \u0645\u0648\u0638\u0641)`)):await this.ensureEmployeesLoaded(),this.startBackgroundUpdate()}catch(e){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",e)}}};Employees.getExternalWorkforceExportHeaderInfo=function(e,t=new Date){const a=String(AppState?.companySettings?.name||AppState?.companyName||"SafetyHub | ICAPP").trim(),i=String(AppState?.companySettings?.secondaryName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629").trim(),o=typeof Utils<"u"&&typeof Utils.formatDateTime=="function"?Utils.formatDateTime(t):new Date(t).toISOString().slice(0,19).replace("T"," ");return{companyName:a,secondaryName:i,reportTitle:e,exportDateTime:o}},Employees.buildExternalWorkforceExcelWorksheet=function(e,t,a,i=new Date){const o=this.getExternalWorkforceExportHeaderInfo(a,i),n=[e,...t],s=Math.max(...n.map(m=>Array.isArray(m)?m.length:0),1),c=[[o.companyName],[o.secondaryName],[o.reportTitle],[`Generated: ${o.exportDateTime}`],[],...n],d=XLSX.utils.aoa_to_sheet(c);return d["!merges"]=[{s:{r:0,c:0},e:{r:0,c:s-1}},{s:{r:1,c:0},e:{r:1,c:s-1}},{s:{r:2,c:0},e:{r:2,c:s-1}},{s:{r:3,c:0},e:{r:3,c:s-1}}],d["!cols"]=[{wch:28},{wch:14}].concat(new Array(Math.max(s-3,0)).fill({wch:14}),[{wch:16}]),d},Employees.exportExternalWorkforceToExcel=function(){if(typeof XLSX>"u"){Notification.error("XLSX library is not available");return}const{model:e,header:t,rows:a}=this.getExternalWorkforceExportRows(),i=`${this.getExternalWorkforceViewState().labels.externalTab} - ${e.year}`,o=XLSX.utils.book_new(),n=this.buildExternalWorkforceExcelWorksheet(t,a,i,new Date);XLSX.utils.book_append_sheet(o,n,"External Workforce"),XLSX.writeFile(o,`external_workforce_${e.year}_${new Date().toISOString().slice(0,10)}.xlsx`)},Employees.exportExternalWorkforceToPDF=function(){const{model:e,header:t,rows:a}=this.getExternalWorkforceExportRows(),i=this.getExternalWorkforceViewState(),o=`${i.labels.externalTab} - ${e.year}`,n=new Date().toISOString(),s=[t,...a].map((h,v)=>`
        <tr>
            ${h.map(x=>`<${v===0?"th":"td"}>${Utils.escapeHTML(String(x??""))}</${v===0?"th":"td"}>`).join("")}
        </tr>
    `).join(""),c=`
        <style>
            .external-workforce-report {
                direction: ${i.dir};
                font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
            }
            .external-workforce-report__meta {
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
            .external-workforce-report__meta strong {
                color: #0F172A;
            }
            .external-workforce-report__table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
                direction: ${i.dir};
            }
            .external-workforce-report__table th,
            .external-workforce-report__table td {
                border: 1px solid #334155;
                padding: 8px 6px;
                text-align: center;
                font-size: 11px;
                word-break: break-word;
            }
            .external-workforce-report__table th {
                background: #B7D2EA;
                color: #102A43;
                font-weight: 700;
            }
            .external-workforce-report__table td:first-child,
            .external-workforce-report__table th:first-child {
                font-weight: 700;
                background: #DCEAF7;
            }
            @media print {
                .external-workforce-report__meta {
                    break-inside: avoid;
                }
            }
        </style>
        <div class="external-workforce-report" dir="${i.dir}" lang="${i.lang}">
            <div class="external-workforce-report__meta">
                <div><strong>${Utils.escapeHTML(i.labels.year)}:</strong> ${Utils.escapeHTML(String(e.year))}</div>
                <div><strong>${Utils.escapeHTML(i.labels.externalTab)}</strong></div>
                <div><strong>${Utils.escapeHTML(i.labels.totalHoursYtd||"YTD Hours")}:</strong> ${Utils.escapeHTML(String(e.hoursYtd||0))}</div>
            </div>
            <table class="external-workforce-report__table">${s}</table>
        </div>
    `,d=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(`EXT-WORKFORCE-${e.year}`,o,c,!1,!0,{version:"1.0",releaseDate:n,revisionDate:n,includeQRCode:!0},n,n):`<!DOCTYPE html><html lang="${i.lang}" dir="${i.dir}"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(o)}</title></head><body style="font-family:'Cairo','Segoe UI',Tahoma,Arial,sans-serif;direction:${i.dir};padding:20px;">${c}</body></html>`,m=new Blob(["\uFEFF"+d],{type:"text/html;charset=utf-8"}),r=URL.createObjectURL(m),l=window.open(r,"_blank");if(!l){URL.revokeObjectURL(r),Notification.error("\u062A\u0639\u0630\u0631 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629");return}l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(r),1e3)},400)}},(function(){"use strict";try{typeof window<"u"&&typeof Employees<"u"&&(window.Employees=Employees,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Employees module loaded and available on window.Employees"),typeof AppState<"u"&&AppState.currentUser&&setTimeout(()=>{window.Employees&&window.Employees.init&&window.Employees.init().catch(e=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",e)})},2e3))}catch{if(typeof window<"u"&&typeof Employees<"u")try{window.Employees=Employees}catch{}}})();
