const Employees={cache:{data:null,lastLoad:null,lastUpdate:null,isUpdating:!1},config:{cacheTimeout:3e5,backgroundUpdateInterval:6e5,backgroundUpdateTimer:null,_refreshedOnceForInactive:!1},activeTab:"employees-list",externalWorkforceYear:new Date().getFullYear(),_externalWorkforceLoaded:!1,_externalWorkforceLoadPromise:null,_externalWorkforceCache:new Map,_empAnalyticsCharts:{},_empAnalyticsDetailTab:"department",_empAnalyticsEventsBound:!1,_getI18nCore(){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null},t(t,e){const a=this._getI18nCore();return a?a.t(t,null,e||t):e||t},applyModuleI18n(t){const e=this._getI18nCore();if(!e)return;const a=t||document.getElementById("employees-section")||document;typeof e.applyI18n=="function"&&e.applyI18n(a),typeof e.applyLiteralTranslations=="function"&&e.applyLiteralTranslations(a)},_photoFailKey(t){return`hse_emp_photo_failed_${String(t||"").trim()}`},_getDriveIdFromUrl(t){try{const e=String(t||"").trim();if(!e)return"";const a=e.match(/[?&]id=([^&]+)/)||e.match(/\/file\/d\/([^/]+)/);return a?String(a[1]||"").trim():""}catch{return""}},_normalizeEmployeePhotoUrl(t,e=""){try{const a=typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?String(Utils.extractImageSourceCandidate(t)||"").trim():String(t||"").trim();if(!a)return"";let o=a;typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"?o=Utils.normalizeImageSource(a)||a:typeof window<"u"&&typeof window.__convertGoogleDriveUrl=="function"&&(o=window.__convertGoogleDriveUrl(a)||a);const r=this._getDriveIdFromUrl(o)||e||o;return sessionStorage.getItem(this._photoFailKey(r))?"":o}catch{return""}},_setupEmployeePhotoFallbacks(t){try{const a=(t||document).querySelectorAll('img[data-emp-photo="1"]');if(!a||a.length===0)return;a.forEach(o=>{if(!o||o.dataset._fallbackBound==="1")return;o.dataset._fallbackBound="1";const i=(o.dataset.photoKey||"").trim();o.addEventListener("error",()=>{try{i&&sessionStorage.setItem(this._photoFailKey(i),Date.now().toString())}catch{}try{const r=o.parentElement;r&&(r.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}},{passive:!0})})}catch{}},canEditOrDelete(){const t=AppState.currentUser;return t?(t.role||"").toLowerCase()==="admin":!1},canAddOrImport(){const t=AppState.currentUser;return t?(t.role||"").toLowerCase()==="admin":!1},getEmployeesDetailedPermissionsState(){try{if(typeof Permissions<"u"&&typeof Permissions.getEffectivePermissions=="function"){const a=Permissions.getEffectivePermissions()?.employeesPermissions;if(a&&typeof a=="object"&&!Array.isArray(a))return a}}catch{}const t=AppState.currentUser?.permissions?.employeesPermissions;return t&&typeof t=="object"&&!Array.isArray(t)?t:null},canViewEmployeesRegistryTab(){if(this.canAddOrImport())return!0;if(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("employees"))return!1;const t=this.getEmployeesDetailedPermissionsState();return t?t["employees-list"]!==!1:!0},canViewExternalWorkforceTab(){if(this.canAddOrImport())return!0;if(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("employees"))return!1;const t=this.getEmployeesDetailedPermissionsState();return t?t["external-workforce"]===!0:!0},canViewEmployeesAnalysisTab(){if(this.canAddOrImport())return!0;if(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("employees"))return!1;const t=this.getEmployeesDetailedPermissionsState();return t?t["data-analysis"]!==!1:!0},canManageExternalWorkforceTab(){return this.canAddOrImport()},isValidDate(t){if(!t)return!1;try{const e=new Date(t);return e instanceof Date&&!isNaN(e.getTime())}catch{return!1}},normalizeDateOnly(t){if(t==null||t==="")return"";if(t instanceof Date&&!isNaN(t.getTime())){const r=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),c=String(t.getDate()).padStart(2,"0");return`${r}-${s}-${c}`}if(typeof t=="number"&&isFinite(t))try{if(typeof XLSX<"u"&&XLSX?.SSF?.parse_date_code){const r=XLSX.SSF.parse_date_code(t);if(r&&r.y&&r.m&&r.d){const s=String(r.y).padStart(4,"0"),c=String(r.m).padStart(2,"0"),m=String(r.d).padStart(2,"0");return`${s}-${c}-${m}`}}}catch{}let e=String(t).trim();if(!e)return"";if(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")){try{const r=JSON.parse(e);typeof r=="string"?e=r.trim():e=e.substring(1,e.length-1).trim()}catch{e=e.substring(1,e.length-1).trim()}if(!e)return""}const a=e.match(/^(\d{4}-\d{2}-\d{2})/);if(a)return a[1];const o=e.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);if(o){const r=String(o[1]).padStart(2,"0"),s=String(o[2]).padStart(2,"0");return`${o[3].length===2?`20${o[3]}`:String(o[3]).padStart(4,"0")}-${s}-${r}`}const i=e.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);if(i){const r=String(i[1]).padStart(4,"0"),s=String(i[2]).padStart(2,"0"),c=String(i[3]).padStart(2,"0");return`${r}-${s}-${c}`}try{const r=new Date(e);if(!isNaN(r.getTime())){const s=r.getFullYear(),c=String(r.getMonth()+1).padStart(2,"0"),m=String(r.getDate()).padStart(2,"0");return`${s}-${c}-${m}`}}catch{}return""},parseLocalDate(t){if(!t)return null;if(t instanceof Date&&!isNaN(t.getTime()))return t;let e=String(t).trim();if(!e)return null;if(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")){try{const i=JSON.parse(e);typeof i=="string"?e=i.trim():e=e.substring(1,e.length-1).trim()}catch{e=e.substring(1,e.length-1).trim()}if(!e)return null}const a=e.match(/^(\d{4})-(\d{2})-(\d{2})/);if(a){const i=Number(a[1]),r=Number(a[2])-1,s=Number(a[3]),c=new Date(i,r,s);return isNaN(c.getTime())?null:c}const o=new Date(e);return isNaN(o.getTime())?null:o},formatDateSafe(t){return this.normalizeDateOnly(t)},calculateAge(t){if(!t)return"";try{const e=this.parseLocalDate(t);if(!e)return"";const a=new Date;let o=a.getFullYear()-e.getFullYear();const i=a.getMonth()-e.getMonth();return(i<0||i===0&&a.getDate()<e.getDate())&&o--,o>=0?o:""}catch{return""}},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u")return;if(typeof AppState>"u"){const e=document.getElementById("employees-section");e&&(e.innerHTML=`
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
                `),Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}const t=document.getElementById("employees-section");if(!t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 employees-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u0645\u062F\u064A\u0648\u0644 Employees \u064A\u0643\u062A\u0628 \u064A \u0642\u0633\u0645: employees-section");try{const e=this.canAddOrImport();t.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-user-tie ml-3"></i>
                                ${this.t("module.employees.title","\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}
                            </h1>
                            <p class="section-subtitle">${e?this.t("module.employees.subtitleAdmin","\u0625\u062F\u0627\u0631\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0639 \u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel"):this.t("module.employees.subtitleViewer","\u0639\u0631\u0636 \u0648\u0628\u062D\u062B \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}</p>
                        </div>
                        ${e?`
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
            `,this.applyModuleI18n(t),setTimeout(async()=>{try{const a=document.getElementById("employees-content");if(!a)return;const o=await this.renderList().catch(i=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",i),`
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
                        `));a.innerHTML=o,this.applyModuleI18n(a),this.setupEventListeners(),this.activeTab==="data-analysis"&&this.canViewEmployeesAnalysisTab()?await this.loadEmployeesAnalysis():this.canViewEmployeesRegistryTab()?await this.loadEmployeesList():this.activeTab==="external-workforce"&&this.canViewExternalWorkforceTab()&&(await this.ensureExternalWorkforceDataLoaded(),this.renderExternalWorkforceTable()),setTimeout(async()=>{try{const i=this.getFilterValues();(i.search||i.department||i.branch||i.location||i.job||i.position||i.gender)&&await this.applyFilters()}catch(i){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",i)}},200)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",a)}},0),requestAnimationFrame(()=>{this.activeTab==="employees-list"&&this.scrollToSearchField()}),this.startBackgroundUpdate(),Promise.resolve().then(async()=>{try{await this.ensureEmployeesLoaded(!1),this.loadEmployeesList()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",a)}})}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",e),t&&(t.innerHTML=`
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
                `,this.applyModuleI18n(t))}},isEmployeeInactive(t){if(!t)return!1;const e=t.status!=null&&t.status!==""?String(t.status).trim():"";return!!((t.resignationDate!=null&&t.resignationDate!==""?String(t.resignationDate).trim():"")||e==="inactive"||e.toLowerCase()==="inactive"||e==="\u063A\u064A\u0631 \u0646\u0634\u0637")},calculateStatistics(){const t=AppState.appData.employees||[];if(t.length===0)return{total:0,averageAge:0,genderStats:{male:0,female:0},averageExperience:0,inactiveCount:0};const e=t.filter(u=>!this.isEmployeeInactive(u)),a=e.length;let o=0,i=0;e.forEach(u=>{const p=this.calculateAge(u.birthDate);p&&p>0&&(o+=p,i++)});const r=i>0?Math.round(o/i):0;let s=0,c=0,m=0;const l=u=>{if(!u)return"";let p=String(u).trim().replace(/\s+/g," ").trim();return p=p.replace(/[\u200B-\u200D\uFEFF]/g,""),p},n=u=>{const p=l(u);if(!p)return{isMale:!1,isFemale:!1};const y=p.toLowerCase(),g=p.length===1?p.toUpperCase():"",f=["\u0630\u0643\u0631","male","m","M","\u0630\u0643\u0631 "," \u0630\u0643\u0631"],w=["\u0623\u0646\u062B\u0649","female","f","F","\u0623\u0646\u062B\u0649 "," \u0623\u0646\u062B\u0649"],S=p==="\u0630\u0643\u0631"||y==="male"||g==="M"||f.some($=>l($)===p),k=p==="\u0623\u0646\u062B\u0649"||y==="female"||g==="F"||w.some($=>l($)===p);return{isMale:S,isFemale:k,normalized:p}};e.forEach(u=>{const p=n(u.gender);p.isMale?s++:p.isFemale?c++:m++}),m>0&&typeof AppState<"u"&&AppState.debugMode&&typeof console<"u";let d=0,h=0;const v=new Date;e.forEach(u=>{if(u.hireDate)try{const p=this.parseLocalDate(u.hireDate);if(p){const y=v.getFullYear()-p.getFullYear(),g=v.getMonth()-p.getMonth(),f=v.getDate()-p.getDate();let w=y;(g<0||g===0&&f<0)&&w--,w>=0&&(d+=w,h++)}}catch{}});const x=h>0?(d/h).toFixed(1):0,b=t.filter(u=>this.isEmployeeInactive(u)).length;return{total:a,averageAge:r,genderStats:{male:s,female:c},averageExperience:parseFloat(x),inactiveCount:b}},ensureEmployeesStatsCardsStyles(){const t="employees-stats-cards-styles-v2";if(document.getElementById(t))return;document.getElementById("employees-stats-cards-styles")?.remove();const a=document.createElement("style");a.id=t,a.textContent=`
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
        `,document.head.appendChild(a)},renderStatsCards(){const t=document.getElementById("employees-stats-cards");if(!t)return;this.ensureEmployeesStatsCardsStyles();const e=this.calculateStatistics();this.updateInactiveCount();const a=[{id:"total",title:this.t("module.employees.stats.totalEmployees","\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),value:e.total,icon:"fas fa-users",accent:"#2563eb",accentLight:"#eff6ff",description:this.t("module.employees.stats.totalEmployeesDesc","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646")},{id:"average-age",title:this.t("module.employees.stats.avgAge","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0633\u0646"),value:e.averageAge>0?`${e.averageAge} ${this.t("module.common.yearsUnit","\u0633\u0646\u0629")}`:this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),icon:"fas fa-birthday-cake",accent:"#16a34a",accentLight:"#f0fdf4",description:this.t("module.employees.stats.avgAgeDesc","\u0645\u062A\u0648\u0633\u0637 \u0639\u0645\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")},{id:"gender",title:this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639"),isGenderCard:!0,maleCount:e.genderStats.male,femaleCount:e.genderStats.female,icon:"fas fa-venus-mars",accent:"#7c3aed",accentLight:"#f5f3ff",description:this.t("module.employees.stats.genderDistDesc","\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639")},{id:"experience",title:this.t("module.employees.stats.avgExperience","\u0645\u062A\u0648\u0633\u0637 \u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629"),value:e.averageExperience>0?`${e.averageExperience} ${this.t("module.common.yearsUnit","\u0633\u0646\u0629")}`:this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),icon:"fas fa-briefcase",accent:"#ea580c",accentLight:"#fff7ed",description:this.t("module.employees.stats.avgExperienceDesc","\u0645\u062A\u0648\u0633\u0637 \u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629 \u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646")}],o=this.t("module.employees.genderMale","\u0630\u0643\u0631"),i=this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649"),r=c=>`
            <div class="employee-stat-card__head">
                <div class="employee-stat-card__icon"><i class="${c.icon}" aria-hidden="true"></i></div>
                <div class="employee-stat-card__meta">
                    <h3 class="employee-stat-card__title">${c.title}</h3>
                    <p class="employee-stat-card__desc">${c.description}</p>
                </div>
            </div>
        `,s=c=>{const m=c.maleCount||0,l=c.femaleCount||0,n=m+l,d=n>0?Math.round(m/n*100):0,h=n>0?100-d:0;return`
                <div class="employee-stat-card employee-stat-card--gender"
                     style="--emp-stat-accent:${c.accent};--emp-stat-accent-light:${c.accentLight};">
                    ${r(c)}
                    ${n>0?`
                        <div class="employee-stat-gender-row">
                            <div class="employee-stat-gender-item employee-stat-gender-item--male" title="${o}: ${m}">
                                <span class="employee-stat-gender-num">${m.toLocaleString("en-US")}</span>
                                <span class="employee-stat-gender-label">${o}</span>
                                <span class="employee-stat-gender-pct">${d}%</span>
                            </div>
                            <div class="employee-stat-gender-item employee-stat-gender-item--female" title="${i}: ${l}">
                                <span class="employee-stat-gender-num">${l.toLocaleString("en-US")}</span>
                                <span class="employee-stat-gender-label">${i}</span>
                                <span class="employee-stat-gender-pct">${h}%</span>
                            </div>
                        </div>
                        <div class="employee-stat-gender-bar" title="${o} ${d}% / ${i} ${h}%">
                            <div class="employee-stat-gender-bar__male" style="width:${d}%"></div>
                            <div class="employee-stat-gender-bar__female" style="width:${h}%"></div>
                        </div>
                    `:`
                        <div class="employee-stat-card__value">${this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D")}</div>
                    `}
                </div>
            `};t.innerHTML=a.map(c=>{if(c.isGenderCard)return s(c);const m=typeof c.value=="number"?c.value.toLocaleString("en-US"):c.value;return`
                <div class="employee-stat-card"
                     style="--emp-stat-accent:${c.accent};--emp-stat-accent-light:${c.accentLight};">
                    ${r(c)}
                    <div class="employee-stat-card__value">${m}</div>
                </div>
            `}).join("")},getExternalWorkforceMonths(){const t=this.getExternalWorkforceViewState(),e=new Intl.DateTimeFormat(t.lang==="en"?"en-US":"ar-EG",{month:"short"});return[{key:"jan",index:0},{key:"feb",index:1},{key:"mar",index:2},{key:"apr",index:3},{key:"may",index:4},{key:"jun",index:5},{key:"jul",index:6},{key:"aug",index:7},{key:"sep",index:8},{key:"oct",index:9},{key:"nov",index:10},{key:"dec",index:11}].map(a=>({...a,label:e.format(new Date(2026,a.index,1))}))},getExternalWorkforceViewState(){const t=typeof I18n<"u"&&typeof I18n.getCurrentLanguage=="function"?I18n.getCurrentLanguage():AppState?.currentLanguage||localStorage.getItem("language")||"ar",e=typeof I18n<"u"&&typeof I18n.isRTL=="function"?I18n.isRTL():t==="ar";return{lang:t,isRTL:e,dir:e?"rtl":"ltr",stickySide:e?"right":"left",textAlign:e?"right":"left",labels:{employeesTab:t==="en"?"Employee Database":"\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",externalTab:t==="en"?"External Workforce / Contractors":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",contractor:t==="en"?"Company / Contractor":"\u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644",noCode:t==="en"?"No code":"\u0628\u062F\u0648\u0646 \u0643\u0648\u062F",total:"Total",externalTotal:t==="en"?"Total External Workforce":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629",directEmployees:t==="en"?"Direct Employees":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062B\u0628\u062A\u0629",combinedTotal:t==="en"?"Combined Total":"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u062A\u0631\u0643",estimatedHours:t==="en"?"Estimated Work Hours":"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629"}}},getExternalWorkforceRecords(){return(!AppState.appData||typeof AppState.appData!="object")&&(AppState.appData={}),Array.isArray(AppState.appData.externalWorkforceMonthly)||(AppState.appData.externalWorkforceMonthly=[]),AppState.appData.externalWorkforceMonthly},getExternalWorkforceYearOptions(){const t=new Set([this.externalWorkforceYear,new Date().getFullYear(),new Date().getFullYear()-1]);return this.getExternalWorkforceRecords().forEach(e=>{const a=Number(e?.year);Number.isFinite(a)&&a>2e3&&t.add(a)}),Array.from(t).sort((e,a)=>a-e)},normalizeExternalWorkforceContractor(t={},e=0){const a=c=>String(c||"").replace(/\s+/g," ").trim(),o=a(t.contractorId||t.id),i=a(t.contractorCode||t.code||t.isoCode),r=a(t.contractorName||t.companyName||t.name||t.company||`Contractor ${e+1}`),s=(i||o||r.toLowerCase()).toLowerCase();return{contractorId:o,contractorCode:i,contractorName:r,stableKey:s}},async ensureExternalWorkforceDataLoaded(t=!1){if(this._externalWorkforceLoaded&&!t)return!0;if(this._externalWorkforceLoadPromise&&!t)return this._externalWorkforceLoadPromise;const e=AppState.appData||(AppState.appData={}),a=[];return(!Array.isArray(e.approvedContractors)||e.approvedContractors.length===0)&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function"&&a.push(GoogleIntegration.readFromSheets("ApprovedContractors",15e3).then(o=>{Array.isArray(o)&&(e.approvedContractors=o)}).catch(()=>{})),(t||!Array.isArray(e.externalWorkforceMonthly)||e.externalWorkforceMonthly.length===0)&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function"&&a.push(GoogleIntegration.readFromSheets("ExternalWorkforceMonthly",15e3).then(o=>{Array.isArray(o)&&(e.externalWorkforceMonthly=o)}).catch(()=>{})),this._externalWorkforceLoadPromise=Promise.allSettled(a).then(()=>(this._externalWorkforceLoaded=!0,!0)).finally(()=>{this._externalWorkforceLoadPromise=null}),this._externalWorkforceLoadPromise},getAvailableContractorsForExternalWorkforce(){let t=[];try{typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"&&(t=Contractors.getAllContractorsForModules()||[])}catch{t=[]}(!Array.isArray(t)||t.length===0)&&(t=(AppState.appData.approvedContractors||[]).filter(a=>a&&a.isActive!=="inactive"&&a.isActive!==!1&&a.isActive!=="false"&&a.isActive!=="FALSE"));const e=new Map;return t.forEach((a,o)=>{const i=this.normalizeExternalWorkforceContractor(a,o);!i.stableKey||e.has(i.stableKey)||e.set(i.stableKey,i)}),Array.from(e.values()).sort((a,o)=>a.contractorName.localeCompare(o.contractorName,"ar"))},getExternalWorkforceRecord(t,e){return this.getExternalWorkforceRecords().find(a=>a&&Number(a.year)===Number(t)&&this.normalizeExternalWorkforceContractor(a).stableKey===e)||null},getExternalWorkforceMonthlyValue(t,e){const a=parseFloat(t?.[e]);return Number.isFinite(a)&&a>=0?a:0},getOperationalEmployeesForMonth(t,e=this.externalWorkforceYear){const a=AppState.appData.employees||[],o=new Date(e,t+1,0,23,59,59,999);return a.filter(i=>{if(!i)return!1;const r=this.parseLocalDate(i.hireDate||i.startDate||i.createdAt),s=this.parseLocalDate(i.resignationDate||i.endDate||i.terminationDate);return!(r&&r>o||s&&s<=o||this.isEmployeeInactive(i)&&!s)}).length},buildExternalWorkforceModel(t=this.externalWorkforceYear){const e=(d=[],h=[])=>{if(!Array.isArray(d)||d.length===0)return"0:0";let v=0;return d.forEach(x=>{const b=h.map(p=>x?.[p]).find(Boolean),u=b?new Date(b):null;u&&!Number.isNaN(u.getTime())&&(v=Math.max(v,u.getTime()))}),`${d.length}:${v}`},a=`external:${t}:${e(this.getExternalWorkforceRecords(),["updatedAt","createdAt"])}:${e(AppState.appData.approvedContractors||[],["updatedAt","createdAt","approvalDate"])}:${e(AppState.appData.employees||[],["updatedAt","createdAt","hireDate","resignationDate"])}`;if(this._externalWorkforceCache.has(a))return this._externalWorkforceCache.get(a);const o=this.getExternalWorkforceMonths(),r=this.getAvailableContractorsForExternalWorkforce().map(d=>{const h=this.getExternalWorkforceRecord(t,d.stableKey)||{},v=o.map(x=>this.getExternalWorkforceMonthlyValue(h,x.key));return{...d,recordId:h.id||`EWM-${t}-${d.stableKey}`,values:v,total:v.reduce((x,b)=>x+b,0)}}),s=o.map((d,h)=>r.reduce((v,x)=>v+(x.values[h]||0),0)),c=o.map(d=>this.getOperationalEmployeesForMonth(d.index,t)),m=o.map((d,h)=>c[h]+s[h]),l=m.map(d=>d*8*22),n={year:t,months:o,rows:r,monthTotals:s,directEmployees:c,combined:m,estimatedHours:l,grandTotal:s.reduce((d,h)=>d+h,0)};return this._externalWorkforceCache.clear(),this._externalWorkforceCache.set(a,n),n},renderExternalWorkforcePanel(){const t=this.canManageExternalWorkforceTab(),e=this.getExternalWorkforceViewState(),a={title:e.lang==="en"?"External Workforce / Contractors":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",description:e.lang==="en"?"Monthly table linked to approved contractors and used automatically in Safety Performance Scorecard to calculate combined headcount and work hours.":"\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.",year:e.lang==="en"?"Year":"\u0627\u0644\u0633\u0646\u0629",admin:e.lang==="en"?"Admin Edit":"\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A",viewOnly:e.lang==="en"?"View Only":"\u0639\u0631\u0636 \u0641\u0642\u0637",exportExcel:e.lang==="en"?"Export Excel":"\u062A\u0635\u062F\u064A\u0631 Excel",exportPdf:e.lang==="en"?"Export PDF":"\u062A\u0635\u062F\u064A\u0631 PDF",importExcel:e.lang==="en"?"Import Excel":"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0643\u0633\u064A\u0644"};return a.title=e.lang==="en"?"External Workforce / Contractors":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",a.description=e.lang==="en"?"Monthly table linked to approved contractors and used automatically in Safety Performance Scorecard to calculate combined headcount and work hours.":"\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.",a.year=e.lang==="en"?"Year":"\u0627\u0644\u0633\u0646\u0629",a.admin=e.lang==="en"?"Admin Edit":"\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A",a.viewOnly=e.lang==="en"?"View Only":"\u0639\u0631\u0636 \u0641\u0642\u0637",a.exportExcel=e.lang==="en"?"Export Excel":"\u062A\u0635\u062F\u064A\u0631 Excel",a.exportPdf=e.lang==="en"?"Export PDF":"\u062A\u0635\u062F\u064A\u0631 PDF",a.importExcel=e.lang==="en"?"Import Excel":"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0643\u0633\u064A\u0644",`
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
                            ${t?'<span class="text-xs px-3 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A</span>':'<span class="text-xs px-3 py-2 rounded-full bg-gray-100 text-gray-600 font-semibold">\u0639\u0631\u0636 \u0641\u0642\u0637</span>'}
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
        `},populateExternalWorkforceYearSelector(){const t=document.getElementById("external-workforce-year");t&&(t.innerHTML=this.getExternalWorkforceYearOptions().map(e=>`<option value="${e}" ${e===this.externalWorkforceYear?"selected":""}>${e}</option>`).join(""))},renderExternalWorkforceSummary(t){const e=document.getElementById("external-workforce-summary");if(!e||!t)return;const a=t.year===new Date().getFullYear()?new Date().getMonth():11,o=t.monthTotals.slice(0,a+1).reduce((m,l)=>m+l,0),i=t.directEmployees.slice(0,a+1).reduce((m,l)=>m+l,0),r=t.combined.slice(0,a+1).reduce((m,l)=>m+l,0),s=t.estimatedHours.slice(0,a+1).reduce((m,l)=>m+l,0),c=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 YTD",value:o,color:"#0ea5e9",icon:"fa-users-viewfinder"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062B\u0628\u062A\u0629 YTD",value:i,color:"#2563eb",icon:"fa-user-check"},{label:"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u062A\u0631\u0643 YTD",value:r,color:"#16a34a",icon:"fa-people-group"},{label:"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629 YTD",value:s.toLocaleString("en-US"),color:"#f59e0b",icon:"fa-clock"}];e.innerHTML=c.map(m=>`
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <div class="text-sm font-semibold text-gray-500">${m.label}</div>
                        <div class="text-3xl font-black mt-3" style="color:${m.color};">${m.value}</div>
                    </div>
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style="background:${m.color};">
                        <i class="fas ${m.icon}"></i>
                    </div>
                </div>
            </div>
        `).join("")},ensureExternalWorkforceToolbar(){const t=document.getElementById("employees-external-panel");if(!t)return;const e=t.querySelector(".card-header"),a=t.querySelector(".card-title"),o=t.querySelector(".card-header p"),i=t.querySelector('label[for="external-workforce-year"]'),r=t.querySelector(".rounded-full"),s=i?.parentElement,c=this.canManageExternalWorkforceTab(),m=this.getExternalWorkforceViewState().labels,l={description:this.getExternalWorkforceViewState().lang==="en"?"Monthly table linked to approved contractors and used automatically in Safety Performance Scorecard to calculate combined headcount and work hours.":"\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.",year:this.getExternalWorkforceViewState().lang==="en"?"Year":"\u0627\u0644\u0633\u0646\u0629",admin:this.getExternalWorkforceViewState().lang==="en"?"Admin Edit":"\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A",viewOnly:this.getExternalWorkforceViewState().lang==="en"?"View Only":"\u0639\u0631\u0636 \u0641\u0642\u0637",exportExcel:this.getExternalWorkforceViewState().lang==="en"?"Export Excel":"\u062A\u0635\u062F\u064A\u0631 Excel",exportPdf:this.getExternalWorkforceViewState().lang==="en"?"Export PDF":"\u062A\u0635\u062F\u064A\u0631 PDF",importExcel:this.getExternalWorkforceViewState().lang==="en"?"Import Excel":"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0643\u0633\u064A\u0644"};if(a&&(a.innerHTML=`<i class="fas fa-helmet-safety ml-2"></i>${m.externalTab}`),o&&(o.textContent=l.description),i&&(i.textContent=l.year),r&&(r.textContent=c?l.admin:l.viewOnly),!s)return;let n=document.getElementById("external-workforce-actions");n||(n=document.createElement("div"),n.id="external-workforce-actions",n.className="flex items-center gap-3 flex-wrap",n.innerHTML=`
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
            `,s.insertBefore(n,s.firstChild));const d=n.querySelector("#external-workforce-export-excel-btn span"),h=n.querySelector("#external-workforce-export-pdf-btn span"),v=n.querySelector("#external-workforce-import-excel-btn span");d&&(d.textContent=l.exportExcel),h&&(h.textContent=l.exportPdf),v&&(v.textContent=l.importExcel)},getExternalWorkforceExportRows(t=this.externalWorkforceYear){const e=this.buildExternalWorkforceModel(t),a=this.getExternalWorkforceViewState().labels,o=[a.contractor,"Code",...e.months.map(r=>r.label),a.total],i=e.rows.map(r=>[r.contractorName,r.contractorCode||r.contractorId||"",...r.values,r.total]);return i.push([a.externalTotal,"",...e.monthTotals,e.grandTotal]),i.push([a.directEmployees,"",...e.directEmployees,e.directEmployees.reduce((r,s)=>r+s,0)]),i.push([a.combinedTotal,"",...e.combined,e.combined.reduce((r,s)=>r+s,0)]),i.push([a.estimatedHours,"",...e.estimatedHours,e.estimatedHours.reduce((r,s)=>r+s,0)]),{model:e,header:o,rows:i}},exportExternalWorkforceToExcel(){if(typeof XLSX>"u"){Notification.error("XLSX library is not available");return}const{model:t,header:e,rows:a}=this.getExternalWorkforceExportRows(),o=XLSX.utils.book_new(),i=XLSX.utils.aoa_to_sheet([e,...a]);XLSX.utils.book_append_sheet(o,i,"External Workforce"),XLSX.writeFile(o,`external_workforce_${t.year}_${new Date().toISOString().slice(0,10)}.xlsx`)},exportExternalWorkforceToPDF(){const{model:t,header:e,rows:a}=this.getExternalWorkforceExportRows(),o=this.getExternalWorkforceViewState(),i=`${o.labels.externalTab} - ${t.year}`,r=new Date().toISOString(),s=[e,...a].map((h,v)=>`
            <tr>
                ${h.map(x=>`<${v===0?"th":"td"}>${Utils.escapeHTML(String(x??""))}</${v===0?"th":"td"}>`).join("")}
            </tr>
        `).join(""),c=`
            <style>
                .external-workforce-report {
                    direction: ${o.dir};
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
                    direction: ${o.dir};
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
            <div class="external-workforce-report" dir="${o.dir}" lang="${o.lang}">
                <div class="external-workforce-report__meta">
                    <div><strong>${Utils.escapeHTML(o.labels.year)}:</strong> ${Utils.escapeHTML(String(t.year))}</div>
                    <div><strong>${Utils.escapeHTML(o.labels.externalTab)}</strong></div>
                    <div><strong>${Utils.escapeHTML(o.labels.totalHoursYtd||"YTD Hours")}:</strong> ${Utils.escapeHTML(String(t.hoursYtd||0))}</div>
                </div>
                <table class="external-workforce-report__table">${s}</table>
            </div>
        `,m=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(`EXT-WORKFORCE-${t.year}`,i,c,!1,!0,{version:"1.0",source:"ExternalWorkforceMonthly",reportYear:t.year,releaseDate:r,revisionDate:r},r,r):`<!DOCTYPE html><html lang="${o.lang}" dir="${o.dir}"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(i)}</title></head><body style="font-family:'Cairo','Segoe UI',Tahoma,Arial,sans-serif;direction:${o.dir};padding:20px;">${c}</body></html>`,l=new Blob(["\uFEFF"+m],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(l),d=window.open(n,"_blank");if(!d){URL.revokeObjectURL(n),Notification.error("Unable to open print window");return}d.onload=()=>{setTimeout(()=>{d.print(),setTimeout(()=>URL.revokeObjectURL(n),1e3)},400)}},async importExternalWorkforceExcelFile(t){if(!(!t||!this.canManageExternalWorkforceTab())){if(typeof XLSX>"u"){Notification.error("XLSX library is not available");return}Loading.show();try{const e=await t.arrayBuffer(),a=XLSX.read(e,{type:"array",cellDates:!0}),o=a.Sheets[a.SheetNames[0]],i=XLSX.utils.sheet_to_json(o,{header:1,defval:"",raw:!1});if(!Array.isArray(i)||i.length<2)throw new Error("File is empty");const r=i[0].map(b=>String(b||"").trim().toLowerCase()),s=this.getAvailableContractorsForExternalWorkforce(),c=Number(this.externalWorkforceYear),m={jan:0,january:0,feb:1,february:1,mar:2,march:2,apr:3,april:3,may:4,jun:5,june:5,jul:6,july:6,aug:7,august:7,sep:8,sept:8,september:8,oct:9,october:9,nov:10,november:10,dec:11,december:11,\u064A\u0646\u0627\u064A\u0631:0,\u0641\u0628\u0631\u0627\u064A\u0631:1,\u0645\u0627\u0631\u0633:2,\u0623\u0628\u0631\u064A\u0644:3,\u0627\u0628\u0631\u064A\u0644:3,\u0645\u0627\u064A\u0648:4,\u064A\u0648\u0646\u064A\u0648:5,\u064A\u0648\u0644\u064A\u0648:6,\u0623\u063A\u0633\u0637\u0633:7,\u0627\u063A\u0633\u0637\u0633:7,\u0633\u0628\u062A\u0645\u0628\u0631:8,\u0623\u0643\u062A\u0648\u0628\u0631:9,\u0627\u0643\u062A\u0648\u0628\u0631:9,\u0646\u0648\u0641\u0645\u0628\u0631:10,\u062F\u064A\u0633\u0645\u0628\u0631:11},l=this.getExternalWorkforceMonths().map(b=>b.key),n=r.findIndex(b=>b.includes("contractor")||b.includes("company")||b.includes("\u0627\u0644\u0634\u0631\u0643\u0629")||b.includes("\u0627\u0644\u0645\u0642\u0627\u0648\u0644")),d=r.findIndex(b=>b==="code"||b.includes("contractor code")||b.includes("\u0627\u0644\u0643\u0648\u062F")),h={};r.forEach((b,u)=>{const p=b.replace(/\./g,"").trim();m[p]!==void 0&&(h[l[m[p]]]=u)});const v=this.getExternalWorkforceRecords();let x=0;i.slice(1).forEach(b=>{const u=n>=0?String(b[n]||"").trim():"",p=d>=0?String(b[d]||"").trim():"";if(!u&&!p)return;const y=s.find(f=>p&&(f.contractorCode||"").trim().toLowerCase()===p.toLowerCase()||u&&f.contractorName.trim().toLowerCase()===u.toLowerCase());if(!y)return;let g=this.getExternalWorkforceRecord(c,y.stableKey);g||(g={id:`EWM-${c}-${y.stableKey}`,year:c,contractorId:y.contractorId||"",contractorCode:y.contractorCode||"",contractorName:y.contractorName||"",createdAt:new Date().toISOString()},v.push(g)),l.forEach(f=>{const w=h[f];w!==void 0&&(g[f]=Math.max(0,parseInt(b[w]||"0",10)||0))}),g.total=l.reduce((f,w)=>f+(parseInt(g[w]||"0",10)||0),0),g.updatedAt=new Date().toISOString(),g.updatedBy=AppState.currentUser?.name||AppState.currentUser?.email||"admin",x+=1}),this._externalWorkforceCache.clear(),this.renderExternalWorkforceTable(),typeof DataManager<"u"&&typeof DataManager.save=="function"&&DataManager.save(),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.autoSave=="function"&&await GoogleIntegration.autoSave("ExternalWorkforceMonthly",v).catch(()=>{}),window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{externalWorkforce:!0,year:c}})),Notification.success(`Imported ${x} rows successfully`)}catch(e){Notification.error(`Failed to import file: ${e.message}`)}finally{Loading.hide()}}},renderExternalWorkforceTable(){const t=document.getElementById("external-workforce-table-container");if(!t)return;const e=this.buildExternalWorkforceModel(this.externalWorkforceYear),a=this.getExternalWorkforceViewState(),{dir:o,stickySide:i,textAlign:r,labels:s}=a;this.renderExternalWorkforceSummary(e);const c=this.canManageExternalWorkforceTab(),m=e.months.map(f=>`<th style="min-width: 74px;">${f.label}</th>`).join(""),l=e.rows.map((f,w)=>{const S=e.months.map((k,$)=>{const D=f.values[$]||0;return`<td style="background:#dceaf6;">${c?`<input type="number" min="0" step="1" class="form-input external-workforce-input" style="min-width:70px;text-align:center;padding:6px 8px;" value="${D}" data-row="${w}" data-contractor-key="${f.stableKey}" data-month="${k.key}" />`:`<span class="font-semibold text-slate-700">${D}</span>`}</td>`}).join("");return`
                <tr>
                    <td class="sticky-cell" style="background:#c7dcef; font-weight:700; text-align:${r};">
                        <div>${Utils.escapeHTML(f.contractorName)}</div>
                        <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(f.contractorCode||f.contractorId||"\u0628\u062F\u0648\u0646 \u0643\u0648\u062F")}</div>
                    </td>
                    ${S}
                    <td style="background:#dceaf6; font-weight:800;">${f.total}</td>
                </tr>
            `}).join(""),n=e.monthTotals.map(f=>`<td style="background:#fff6cf; font-weight:800;">${f}</td>`).join(""),d=e.directEmployees.map(f=>`<td style="background:#eef2ff; font-weight:700;">${f}</td>`).join(""),h=e.combined.map(f=>`<td style="background:#ecfdf5; font-weight:800;">${f}</td>`).join(""),v=e.estimatedHours.map(f=>`<td style="background:#fff7ed; font-weight:700;">${f.toLocaleString("en-US")}</td>`).join("");t.innerHTML=`
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
                        ${m}
                        <th style="min-width:80px;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${l}
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#fff6cf; z-index:1; font-weight:800; text-align:right;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</td>
                        ${n}
                        <td style="background:#fff6cf; font-weight:900;">${e.grandTotal}</td>
                    </tr>
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#eef2ff; z-index:1; font-weight:800; text-align:right;">\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062B\u0628\u062A\u0629</td>
                        ${d}
                        <td style="background:#eef2ff; font-weight:900;">${e.directEmployees.reduce((f,w)=>f+w,0)}</td>
                    </tr>
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#ecfdf5; z-index:1; font-weight:800; text-align:right;">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u062A\u0631\u0643</td>
                        ${h}
                        <td style="background:#ecfdf5; font-weight:900;">${e.combined.reduce((f,w)=>f+w,0)}</td>
                    </tr>
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#fff7ed; z-index:1; font-weight:800; text-align:right;">\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629</td>
                        ${v}
                        <td style="background:#fff7ed; font-weight:900;">${e.estimatedHours.reduce((f,w)=>f+w,0).toLocaleString("en-US")}</td>
                    </tr>
                </tbody>
            </table>
        `;const x=t.querySelector(".external-workforce-table");if(!x)return;let b=t.querySelector(".external-workforce-shell");b||(b=document.createElement("div"),b.className="external-workforce-shell",x.parentNode.insertBefore(b,x),b.appendChild(x)),b.setAttribute("dir",o),Object.assign(b.style,{width:"100%",maxWidth:"100%",maxHeight:"min(70vh, calc(100vh - 260px))",overflow:"auto",border:"1px solid #cbd5e1",borderRadius:"18px",background:"#ffffff"}),Object.assign(x.style,{width:"max(100%, 1180px)",borderCollapse:"separate",borderSpacing:"0",direction:o,tableLayout:"fixed"}),x.querySelectorAll("th, td").forEach(f=>{f.style.padding="clamp(6px, 0.7vw, 10px)",f.style.fontSize="clamp(11px, 0.85vw, 14px)"});const u=Array.from(x.querySelectorAll("thead th"));u.forEach(f=>{f.style.position="sticky",f.style.top="0",f.style.zIndex="4",f.style.background="#b7d2ea"}),u[0]&&(u[0].textContent=s.contractor,u[0].classList.add("sticky-cell"),u[0].style.textAlign=r),u[u.length-1]&&(u[u.length-1].textContent=s.total),x.querySelectorAll(".sticky-cell").forEach(f=>{f.style.position="sticky",f.style.left="",f.style.right="",f.style[i]="0",f.style.zIndex=f.closest("thead")?"6":"2",f.style.minWidth="clamp(170px, 18vw, 240px)",f.style.maxWidth="clamp(170px, 18vw, 260px)",f.style.whiteSpace="normal",f.style.wordBreak="break-word"});const p=Array.from(x.querySelectorAll("tbody tr"));p.slice(0,e.rows.length).forEach((f,w)=>{const S=f.querySelector(".sticky-cell"),k=e.rows[w];!S||!k||(S.style.textAlign=r,S.innerHTML=`
                <div>${Utils.escapeHTML(k.contractorName)}</div>
                <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(k.contractorCode||k.contractorId||s.noCode)}</div>
            `)});const g=[s.externalTotal,s.directEmployees,s.combinedTotal,s.estimatedHours];p.slice(-4).forEach((f,w)=>{const S=f.querySelector(".sticky-cell");S&&(S.textContent=g[w]||S.textContent,S.style.textAlign=r)}),x.querySelectorAll(".external-workforce-input").forEach(f=>{f.style.width="100%",f.style.minWidth="0",f.style.height=window.innerWidth<=768?"32px":"36px",f.style.padding="6px 8px",f.style.textAlign="center"}),window.innerWidth<=768&&(b.style.maxHeight="min(62vh, calc(100vh - 220px))",x.style.width="max(100%, 980px)")},async saveExternalWorkforceValue(t,e,a){if(!this.canManageExternalWorkforceTab())return;const o=this.getAvailableContractorsForExternalWorkforce().find(c=>c.stableKey===t);if(!o)return;const i=Number(this.externalWorkforceYear),r=this.getExternalWorkforceRecords();let s=this.getExternalWorkforceRecord(i,t);s||(s={id:`EWM-${i}-${t}`,year:i,contractorId:o.contractorId||"",contractorCode:o.contractorCode||"",contractorName:o.contractorName||"",createdAt:new Date().toISOString()},r.push(s)),s[e]=Math.max(0,parseInt(a||"0",10)||0),s.total=this.getExternalWorkforceMonths().reduce((c,m)=>c+(parseInt(s[m.key]||"0",10)||0),0),s.updatedAt=new Date().toISOString(),s.updatedBy=AppState.currentUser?.name||AppState.currentUser?.email||"admin",this._externalWorkforceCache.clear(),this.renderExternalWorkforceTable(),typeof DataManager<"u"&&typeof DataManager.save=="function"&&DataManager.save(),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.autoSave=="function"&&GoogleIntegration.autoSave("ExternalWorkforceMonthly",r).catch(()=>{}),window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{externalWorkforce:!0,year:i}}))},_empChartPalette(){return["#1d4ed8","#3b82f6","#6366f1","#8b5cf6","#0ea5e9","#2563eb","#4f46e5","#7c3aed","#0284c7","#1e40af","#4338ca","#5b21b6"]},_empAnalyticsLabel(t){return String(t||"").trim()||this.t("module.employees.analytics.unknown","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")},_empNormalizeGenderForAnalytics(t){if(!t)return"unknown";let e=String(t).trim().replace(/\s+/g," ").replace(/[\u200B-\u200D\uFEFF]/g,"");const a=e.toLowerCase();return e==="\u0630\u0643\u0631"||a==="male"||a==="m"?"male":e==="\u0623\u0646\u062B\u0649"||a==="female"||a==="f"?"female":"unknown"},_empGetExperienceYears(t){if(!t?.hireDate)return null;try{const e=this.parseLocalDate(t.hireDate);if(!e)return null;const a=new Date;let o=a.getFullYear()-e.getFullYear();const i=a.getMonth()-e.getMonth(),r=a.getDate()-e.getDate();return(i<0||i===0&&r<0)&&o--,o>=0?o:null}catch{return null}},async _empEnsureChartJs(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(e=>{let a=0;const o=setInterval(()=>{typeof Chart<"u"?(clearInterval(o),e(!0)):++a>50&&(clearInterval(o),e(!1))},100)}):new Promise(e=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",a.onload=()=>e(!0),a.onerror=()=>{const o=document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",o.onload=()=>e(!0),o.onerror=()=>e(!1),document.head.appendChild(o)},document.head.appendChild(a)})},_empDestroyAnalyticsCharts(){const t=this._empAnalyticsCharts||{};Object.keys(t).forEach(e=>{try{t[e]?.destroy?.()}catch{}}),this._empAnalyticsCharts={}},_empGetAnalyticsFiltersFromDom(){const t=e=>{const a=document.getElementById(e);return a?String(a.value||"").trim():""};return{department:t("emp-af-department"),job:t("emp-af-job"),branch:t("emp-af-branch"),location:t("emp-af-location"),position:t("emp-af-position"),gender:t("emp-af-gender"),status:t("emp-af-status")}},_empFilterIdMap(){return{department:"emp-af-department",job:"emp-af-job",branch:"emp-af-branch",location:"emp-af-location",position:"emp-af-position",gender:"emp-af-gender",status:"emp-af-status"}},_empApplyAnalyticsFilter(t,e,a={}){const i=this._empFilterIdMap()[t];if(i){const r=document.getElementById(i);r&&(r.value=e||"")}this._empUpdateAnalyticsFilterBadge(),a.skipUpdate||this.updateEmployeesAnalyticsDashboard()},_empClearAnalyticsFilters(){Object.values(this._empFilterIdMap()).forEach(t=>{const e=document.getElementById(t);e&&(e.value="")}),this._empUpdateAnalyticsFilterBadge(),this.updateEmployeesAnalyticsDashboard()},_empUpdateAnalyticsFilterBadge(){const t=this._empGetAnalyticsFiltersFromDom(),e=Object.values(t).filter(Boolean).length,a=document.getElementById("emp-filter-active-badge");a&&(a.style.display=e>0?"inline":"none",a.textContent=e>0?String(e):"");const o=document.getElementById("emp-filter-results-count");o&&o.dataset.baseCount&&(o.textContent=o.dataset.baseCount)},_empFilterEmployeesForAnalytics(t,e){return(Array.isArray(t)?t:[]).filter(o=>{if(!o||e.status==="active"&&this.isEmployeeInactive(o)||e.status==="inactive"&&!this.isEmployeeInactive(o)||e.department&&this._empAnalyticsLabel(o.department)!==e.department||e.job&&this._empAnalyticsLabel(o.job)!==e.job||e.branch&&this._empAnalyticsLabel(o.branch)!==e.branch||e.location&&this._empAnalyticsLabel(o.location)!==e.location||e.position&&this._empAnalyticsLabel(o.position)!==e.position)return!1;if(e.gender){const i=this._empNormalizeGenderForAnalytics(o.gender);if(e.gender==="male"&&i!=="male"||e.gender==="female"&&i!=="female")return!1}return!0})},_empAggregateGroupStats(t,e){const a={};(t||[]).forEach(i=>{const r=this._empAnalyticsLabel(i[e]);a[r]||(a[r]={label:r,count:0,male:0,female:0,ageSum:0,ageCount:0,expSum:0,expCount:0});const s=a[r];s.count++;const c=this._empNormalizeGenderForAnalytics(i.gender);c==="male"?s.male++:c==="female"&&s.female++;const m=Number(this.calculateAge(i.birthDate));m>0&&(s.ageSum+=m,s.ageCount++);const l=this._empGetExperienceYears(i);l!==null&&(s.expSum+=l,s.expCount++)});const o=(t||[]).length||1;return Object.values(a).map(i=>({...i,percent:Math.round(i.count/o*100),avgAge:i.ageCount>0?Math.round(i.ageSum/i.ageCount):0,avgExperience:i.expCount>0?(i.expSum/i.expCount).toFixed(1):0})).sort((i,r)=>r.count-i.count)},buildEmployeeAnalyticsDataset(t,e={}){const a=this._empFilterEmployeesForAnalytics(t,e),o=a.filter(E=>!this.isEmployeeInactive(E)),i=a.filter(E=>this.isEmployeeInactive(E)),r=a.length,s=o.length,c=i.length,m=this._empAggregateGroupStats(a,"department"),l=this._empAggregateGroupStats(a,"job"),n=this._empAggregateGroupStats(a,"branch"),d=this._empAggregateGroupStats(a,"location"),h=this._empAggregateGroupStats(a,"position"),v={};a.forEach(E=>{const I=this._empAnalyticsLabel(E.department),T=this._empAnalyticsLabel(E.job),L=I+"|||"+T;v[L]=(v[L]||0)+1});const x={"18-25":0,"26-35":0,"36-45":0,"46-55":0,"55+":0,unknown:0},b={"0-2":0,"3-5":0,"6-10":0,"11-15":0,"15+":0,unknown:0},u={};let p=0,y=0,g=0,f=0,w=0,S=0;const k=["employeeNumber","name","department","job","nationalId","birthDate","hireDate","gender","phone","email","branch","location","position"],$=k.map(E=>({field:E,filled:0,missing:0}));a.forEach(E=>{const I=this._empNormalizeGenderForAnalytics(E.gender);I==="male"?w++:I==="female"&&S++;const T=Number(this.calculateAge(E.birthDate));T>0?(p+=T,y++,T<=25?x["18-25"]++:T<=35?x["26-35"]++:T<=45?x["36-45"]++:T<=55?x["46-55"]++:x["55+"]++):x.unknown++;const L=this._empGetExperienceYears(E);if(L!==null?(g+=L,f++,L<=2?b["0-2"]++:L<=5?b["3-5"]++:L<=10?b["6-10"]++:L<=15?b["11-15"]++:b["15+"]++):b.unknown++,E.hireDate){const M=this.parseLocalDate(E.hireDate);if(M){const C=M.getFullYear();u[C]=(u[C]||0)+1}}$.forEach(M=>{const C=E[M.field];C!=null&&String(C).trim()!==""?M.filled++:M.missing++})});const D=Object.keys(u).map(Number).sort((E,I)=>E-I),A=r*k.length,U=$.reduce((E,I)=>E+I.filled,0),_=A>0?Math.round(U/A*100):0,B=m.slice(0,8).map(E=>({label:E.label,male:E.male,female:E.female}));return{filtered:a,total:r,activeCount:s,inactiveCount:c,uniqueDepartments:m.filter(E=>E.label!==this.t("module.employees.analytics.unknown","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")).length,uniqueJobs:l.filter(E=>E.label!==this.t("module.employees.analytics.unknown","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")).length,averageAge:y>0?Math.round(p/y):0,averageExperience:f>0?(g/f).toFixed(1):0,male:w,female:S,dataCompletenessPct:_,byDepartment:m,byJob:l,byBranch:n,byLocation:d,byPosition:h,departmentJobMatrix:v,ageBuckets:x,tenureBuckets:b,hireByYear:u,hireYears:D,genderByDept:B,completeness:$.map(E=>({...E,percent:r>0?Math.round(E.filled/r*100):0}))}},_empChartBaseOptions(){return{responsive:!0,maintainAspectRatio:!1,animation:{duration:600,easing:"easeOutQuart"},plugins:{legend:{position:"bottom",labels:{font:{family:"inherit",size:11},padding:12}},tooltip:{callbacks:{label:t=>{const e=t.parsed?.y??t.parsed??t.raw??0,a=t.dataset?.data?.reduce((i,r)=>i+r,0)||1,o=Math.round(e/a*100);return`${t.label}: ${e} (${o}%) \u2014 ${this.t("module.employees.analytics.clickToFilter","\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0635\u0641\u064A\u0629")}`}}}}}},_empCreateAnalyticsChart(t,e){const a=document.getElementById(t);if(!a||typeof Chart>"u")return null;if(this._empAnalyticsCharts[t])try{this._empAnalyticsCharts[t].destroy()}catch{}const o=new Chart(a,e);return this._empAnalyticsCharts[t]=o,o},_empMakeBarGradient(t,e,a,o){if(!e)return a;const i=t.createLinearGradient(e.left,0,e.right,0);return i.addColorStop(0,a),i.addColorStop(1,o),i},_empRenderAnalyticsKpiStrip(t){const e=document.getElementById("emp-analytics-kpi-strip");if(!e)return;const a=[{label:this.t("module.employees.analytics.kpi.active","\u0627\u0644\u0646\u0634\u0637\u0648\u0646"),value:t.activeCount,color:"#16a34a",icon:"fa-user-check"},{label:this.t("module.employees.analytics.kpi.inactive","\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646"),value:t.inactiveCount,color:"#dc2626",icon:"fa-user-slash"},{label:this.t("module.employees.analytics.kpi.total","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A"),value:t.total,color:"#1d4ed8",icon:"fa-users"},{label:this.t("module.employees.analytics.kpi.departments","\u0627\u0644\u0623\u0642\u0633\u0627\u0645"),value:t.uniqueDepartments,color:"#7c3aed",icon:"fa-building"},{label:this.t("module.employees.analytics.kpi.jobs","\u0627\u0644\u0648\u0638\u0627\u0626\u0641"),value:t.uniqueJobs,color:"#0ea5e9",icon:"fa-briefcase"},{label:this.t("module.employees.analytics.kpi.avgAge","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0639\u0645\u0631"),value:t.averageAge||this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),color:"#ea580c",icon:"fa-birthday-cake"},{label:this.t("module.employees.analytics.kpi.avgExperience","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062E\u0628\u0631\u0629"),value:t.averageExperience||this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),color:"#0891b2",icon:"fa-clock"},{label:this.t("module.employees.analytics.kpi.dataCompleteness","\u0627\u0643\u062A\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),value:t.dataCompletenessPct+"%",color:"#059669",icon:"fa-database"}];e.innerHTML=a.map(o=>`
            <div class="emp-analytics-kpi" style="--kpi-color:${o.color};">
                <div class="emp-analytics-kpi__icon"><i class="fas ${o.icon}"></i></div>
                <div class="emp-analytics-kpi__value">${typeof o.value=="number"?o.value.toLocaleString("en-US"):o.value}</div>
                <div class="emp-analytics-kpi__label">${o.label}</div>
            </div>
        `).join("")},_empRenderAnalyticsBreadcrumb(t){const e=document.getElementById("emp-analytics-breadcrumb");if(!e)return;const a=[this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")];t.department&&a.push(t.department),t.job&&a.push(t.job),e.innerHTML=a.map((o,i)=>{const r=i===a.length-1;return`<span class="emp-analytics-crumb${r?" emp-analytics-crumb--active":""}">${Utils.escapeHTML(o)}</span>${r?"":'<span class="emp-analytics-crumb-sep">\u203A</span>'}`}).join("")},_empPopulateAnalyticsFilterOptions(t){const e=Array.isArray(t)?t:[],a=r=>[...new Set(e.map(s=>this._empAnalyticsLabel(s[r])).filter(Boolean))].sort((s,c)=>s.localeCompare(c,"ar")),o=(r,s,c)=>{const m=document.getElementById(r);if(!m)return;const l=c||m.value;m.innerHTML=`<option value="">${this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")}</option>`+s.map(n=>`<option value="${Utils.escapeHTML(n)}"${n===l?" selected":""}>${Utils.escapeHTML(n)}</option>`).join("")},i=this._empGetAnalyticsFiltersFromDom();o("emp-af-department",a("department"),i.department),o("emp-af-job",a("job"),i.job),o("emp-af-branch",a("branch"),i.branch),o("emp-af-location",a("location"),i.location),o("emp-af-position",a("position"),i.position)},_empRenderAnalyticsHeatmap(t){const e=document.getElementById("emp-analytics-heatmap");if(!e)return;const a=t.departmentJobMatrix||{},o=Object.entries(a).map(([l,n])=>{const[d,h]=l.split("|||");return{dept:d,job:h,count:n}}).sort((l,n)=>n.count-l.count);if(!o.length){e.innerHTML=`<div class="emp-analytics-empty">${this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`;return}const i=[...new Set(o.slice(0,12).map(l=>l.dept))],r=[...new Set(o.slice(0,12).map(l=>l.job))],s=Math.max(...o.map(l=>l.count),1),c={};o.forEach(l=>{c[l.dept+"|||"+l.job]=l.count});let m='<table class="emp-analytics-heatmap-table"><thead><tr><th></th>';r.forEach(l=>{m+=`<th title="${Utils.escapeHTML(l)}">${Utils.escapeHTML(l.length>14?l.slice(0,14)+"\u2026":l)}</th>`}),m+="</tr></thead><tbody>",i.forEach(l=>{m+=`<tr><th title="${Utils.escapeHTML(l)}">${Utils.escapeHTML(l.length>16?l.slice(0,16)+"\u2026":l)}</th>`,r.forEach(n=>{const d=c[l+"|||"+n]||0,h=d>0?.15+d/s*.85:0,v=d>0?`rgba(29, 78, 216, ${h})`:"#f8fafc",x=h>.5?"#fff":"#334155";m+=`<td class="emp-analytics-heatmap-cell" data-dept="${Utils.escapeHTML(l)}" data-job="${Utils.escapeHTML(n)}" style="background:${v};color:${x};" title="${Utils.escapeHTML(l)} / ${Utils.escapeHTML(n)}: ${d}">${d||""}</td>`}),m+="</tr>"}),m+="</tbody></table>",e.innerHTML=m,e.querySelectorAll(".emp-analytics-heatmap-cell").forEach(l=>{l.addEventListener("click",()=>{const n=l.getAttribute("data-dept")||"",d=l.getAttribute("data-job")||"";!n&&!d||(this._empApplyAnalyticsFilter("department",n,{skipUpdate:!0}),this._empApplyAnalyticsFilter("job",d))})})},_empRenderAnalyticsDetailTable(t){const e=document.getElementById("emp-analytics-detail-table");if(!e)return;const a=this._empAnalyticsDetailTab||"department",o=a==="job"?t.byJob:t.byDepartment,i=a==="job"?this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"):this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645"),r=a==="job"?"job":"department";if(!o.length){e.innerHTML=`<div class="emp-analytics-empty">${this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`;return}const c=this._empGetAnalyticsFiltersFromDom()[r];e.innerHTML=`
            <table class="emp-analytics-detail-table">
                <thead>
                    <tr>
                        <th>${i}</th>
                        <th>${this.t("module.employees.analytics.table.count","\u0627\u0644\u0639\u062F\u062F")}</th>
                        <th>${this.t("module.employees.analytics.table.percent","\u0627\u0644\u0646\u0633\u0628\u0629")}</th>
                        <th>${this.t("module.employees.analytics.table.male","\u0630\u0643\u0631")}</th>
                        <th>${this.t("module.employees.analytics.table.female","\u0623\u0646\u062B\u0649")}</th>
                        <th>${this.t("module.employees.analytics.table.avgAge","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0639\u0645\u0631")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${o.map(m=>`
                        <tr class="emp-analytics-detail-row${c===m.label?" emp-analytics-detail-row--selected":""}" data-filter-key="${r}" data-filter-value="${Utils.escapeHTML(m.label)}">
                            <td>${Utils.escapeHTML(m.label)}</td>
                            <td>${m.count}</td>
                            <td>${m.percent}%</td>
                            <td>${m.male}</td>
                            <td>${m.female}</td>
                            <td>${m.avgAge||"\u2014"}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `,e.querySelectorAll(".emp-analytics-detail-row").forEach(m=>{m.addEventListener("click",()=>{const l=m.getAttribute("data-filter-key"),n=m.getAttribute("data-filter-value");l&&this._empApplyAnalyticsFilter(l,n)})})},_empRenderCompletenessTable(t){const e=document.getElementById("emp-analytics-completeness-table");if(!e)return;const a={employeeNumber:this.t("module.employees.employeeNumber","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),name:this.t("module.employees.fullName","\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644"),department:this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645"),job:this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"),nationalId:this.t("module.employees.table.nationalId","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629"),birthDate:this.t("module.employees.table.birthDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F"),hireDate:this.t("module.employees.table.hireDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646"),gender:this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639"),phone:this.t("module.employees.table.phone","\u0627\u0644\u0647\u0627\u062A\u0641"),email:this.t("module.employees.email","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"),branch:this.t("module.employees.branch","\u0627\u0644\u0641\u0631\u0639"),location:this.t("module.employees.location","\u0627\u0644\u0645\u0648\u0642\u0639"),position:this.t("module.employees.position","\u0627\u0644\u0645\u0646\u0635\u0628")};e.innerHTML=`
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
                    ${(t.completeness||[]).map(o=>`
                        <tr>
                            <td>${Utils.escapeHTML(a[o.field]||o.field)}</td>
                            <td>${o.filled}</td>
                            <td>${o.missing}</td>
                            <td>
                                <div class="emp-analytics-progress">
                                    <div class="emp-analytics-progress__bar" style="width:${o.percent}%"></div>
                                    <span>${o.percent}%</span>
                                </div>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `},_empBindChartClick(t,e,a){const o=this._empAnalyticsCharts[t];!o||!e?.length||(o.options.onClick=(i,r)=>{if(!r?.length)return;const s=r[0].index,c=e[s];c?.label&&this._empApplyAnalyticsFilter(a,c.label)},o.update("none"))},_empRenderAnalyticsCharts(t){const e=this._empChartPalette(),a=this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A"),o=(u,p)=>{const y=document.getElementById(u+"-empty"),g=document.getElementById(u);y&&(y.style.display=p?"none":"flex"),g&&(g.style.display=p?"block":"none")},i=t.byDepartment.slice(0,12);o("emp-chart-departments",i.length>0),i.length&&(this._empCreateAnalyticsChart("emp-chart-departments",{type:"bar",data:{labels:i.map(u=>u.label),datasets:[{data:i.map(u=>u.count),backgroundColor:u=>this._empMakeBarGradient(u.chart.ctx,u.chart.chartArea,"#1d4ed8","#6366f1"),borderRadius:8,borderSkipped:!1}]},options:{...this._empChartBaseOptions(),indexAxis:"y",plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{x:{beginAtZero:!0,grid:{color:"#f1f5f9"}},y:{grid:{display:!1}}}}}),this._empBindChartClick("emp-chart-departments",i,"department"));const r=t.byJob.slice(0,12);o("emp-chart-jobs",r.length>0),r.length&&(this._empCreateAnalyticsChart("emp-chart-jobs",{type:"bar",data:{labels:r.map(u=>u.label),datasets:[{data:r.map(u=>u.count),backgroundColor:e.map((u,p)=>e[p%e.length]),borderRadius:8}]},options:{...this._empChartBaseOptions(),indexAxis:"y",plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{x:{beginAtZero:!0},y:{grid:{display:!1}}}}}),this._empBindChartClick("emp-chart-jobs",r,"job"));const s=[t.male,t.female];o("emp-chart-gender",s.some(u=>u>0)),s.some(u=>u>0)&&this._empCreateAnalyticsChart("emp-chart-gender",{type:"doughnut",data:{labels:[this.t("module.employees.genderMale","\u0630\u0643\u0631"),this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649")],datasets:[{data:s,backgroundColor:["#3b82f6","#ec4899"],borderWidth:0}]},options:{...this._empChartBaseOptions(),cutout:"65%",plugins:{...this._empChartBaseOptions().plugins,legend:{position:"bottom"}}}});const c=[t.activeCount,t.inactiveCount];o("emp-chart-status",t.total>0),t.total>0&&this._empCreateAnalyticsChart("emp-chart-status",{type:"doughnut",data:{labels:[this.t("module.employees.analytics.active","\u0646\u0634\u0637"),this.t("module.employees.analytics.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")],datasets:[{data:c,backgroundColor:["#16a34a","#ef4444"],borderWidth:0}]},options:{...this._empChartBaseOptions(),cutout:"65%"}});const m=(u,p,y)=>{const g=p.slice(0,10);o(u,g.length>0),g.length&&(this._empCreateAnalyticsChart(u,{type:"bar",data:{labels:g.map(f=>f.label),datasets:[{data:g.map(f=>f.count),backgroundColor:e,borderRadius:6}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{y:{beginAtZero:!0}}}}),y&&this._empBindChartClick(u,g,y))};m("emp-chart-branches",t.byBranch,"branch"),m("emp-chart-locations",t.byLocation,"location"),m("emp-chart-positions",t.byPosition,"position");const l=Object.keys(t.ageBuckets),n=l.map(u=>t.ageBuckets[u]);o("emp-chart-age",n.some(u=>u>0)),n.some(u=>u>0)&&this._empCreateAnalyticsChart("emp-chart-age",{type:"bar",data:{labels:l,datasets:[{data:n,backgroundColor:"#6366f1",borderRadius:8}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}}}});const d=Object.keys(t.tenureBuckets),h=d.map(u=>t.tenureBuckets[u]);o("emp-chart-tenure",h.some(u=>u>0)),h.some(u=>u>0)&&this._empCreateAnalyticsChart("emp-chart-tenure",{type:"bar",data:{labels:d,datasets:[{data:h,backgroundColor:"#0ea5e9",borderRadius:8}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}}}});const v=t.hireYears||[],x=v.map(u=>t.hireByYear[u]||0);o("emp-chart-hire",v.length>0),v.length&&this._empCreateAnalyticsChart("emp-chart-hire",{type:"line",data:{labels:v.map(String),datasets:[{data:x,borderColor:"#1d4ed8",backgroundColor:"rgba(29,78,216,0.12)",fill:!0,tension:.35,pointRadius:4,pointBackgroundColor:"#1d4ed8"}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{y:{beginAtZero:!0}}}});const b=t.genderByDept||[];o("emp-chart-gender-dept",b.length>0),b.length&&(this._empCreateAnalyticsChart("emp-chart-gender-dept",{type:"bar",data:{labels:b.map(u=>u.label),datasets:[{label:this.t("module.employees.genderMale","\u0630\u0643\u0631"),data:b.map(u=>u.male),backgroundColor:"#3b82f6",borderRadius:4},{label:this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649"),data:b.map(u=>u.female),backgroundColor:"#ec4899",borderRadius:4}]},options:{...this._empChartBaseOptions(),scales:{x:{stacked:!0},y:{stacked:!0,beginAtZero:!0}}}}),this._empBindChartClick("emp-chart-gender-dept",b,"department"))},renderEmployeesAnalysisShellHTML(){const t=[{id:"emp-af-department",icon:"fa-building",label:this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645")},{id:"emp-af-job",icon:"fa-briefcase",label:this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")},{id:"emp-af-branch",icon:"fa-sitemap",label:this.t("module.employees.branch","\u0627\u0644\u0641\u0631\u0639")},{id:"emp-af-location",icon:"fa-map-marker-alt",label:this.t("module.employees.location","\u0627\u0644\u0645\u0648\u0642\u0639")},{id:"emp-af-position",icon:"fa-user-tie",label:this.t("module.employees.position","\u0627\u0644\u0645\u0646\u0635\u0628")},{id:"emp-af-gender",icon:"fa-venus-mars",label:this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639"),options:[{value:"",label:this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")},{value:"male",label:this.t("module.employees.genderMale","\u0630\u0643\u0631")},{value:"female",label:this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649")}]},{id:"emp-af-status",icon:"fa-toggle-on",label:"\u0627\u0644\u062D\u0627\u0644\u0629",options:[{value:"",label:this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")},{value:"active",label:this.t("module.employees.analytics.active","\u0646\u0634\u0637")},{value:"inactive",label:this.t("module.employees.analytics.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")}]}],e=(a,o,i)=>`
            <div class="emp-analytics-chart-card content-card">
                <div class="emp-analytics-chart-card__head">
                    <i class="fas ${i}"></i><span>${o}</span>
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
                        ${t.map(a=>`
                            <div>
                                <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                    <i class="fas ${a.icon} ml-1" style="color:#1d4ed8;"></i>${a.label}
                                </label>
                                ${a.options?`
                                    <select id="${a.id}" class="form-input" style="width:100%;font-size:0.82rem;">
                                        ${a.options.map(o=>`<option value="${o.value}">${o.label}</option>`).join("")}
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
                        ${e("emp-chart-departments",this.t("module.employees.analytics.chart.departments","\u0623\u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0633\u0627\u0645"),"fa-building")}
                        ${e("emp-chart-jobs",this.t("module.employees.analytics.chart.jobs","\u0623\u0639\u0644\u0649 \u0627\u0644\u0648\u0638\u0627\u0626\u0641"),"fa-briefcase")}
                    </div>
                    <h4 style="margin:0 0 10px;font-size:0.88rem;font-weight:700;color:#475569;">
                        <i class="fas fa-th ml-1"></i>${this.t("module.employees.analytics.heatmap","\u062E\u0631\u064A\u0637\u0629 \u062D\u0631\u0627\u0631\u064A\u0629: \u0642\u0633\u0645 \xD7 \u0648\u0638\u064A\u0641\u0629")}
                    </h4>
                    <div id="emp-analytics-heatmap" style="overflow-x:auto;"></div>
                </div>

                <div class="emp-analytics-charts-grid">
                    ${e("emp-chart-gender",this.t("module.employees.analytics.chart.gender","\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"fa-venus-mars")}
                    ${e("emp-chart-status",this.t("module.employees.analytics.chart.status","\u0627\u0644\u062D\u0627\u0644\u0629"),"fa-toggle-on")}
                    ${e("emp-chart-gender-dept",this.t("module.employees.analytics.chart.genderByDept","\u0627\u0644\u062C\u0646\u0633 \u062F\u0627\u062E\u0644 \u0627\u0644\u0623\u0642\u0633\u0627\u0645"),"fa-chart-bar")}
                    ${e("emp-chart-branches",this.t("module.employees.analytics.chart.branches","\u0627\u0644\u0641\u0631\u0648\u0639"),"fa-sitemap")}
                    ${e("emp-chart-locations",this.t("module.employees.analytics.chart.locations","\u0627\u0644\u0645\u0648\u0627\u0642\u0639"),"fa-map-marker-alt")}
                    ${e("emp-chart-positions",this.t("module.employees.analytics.chart.positions","\u0627\u0644\u0645\u0646\u0627\u0635\u0628"),"fa-user-tie")}
                    ${e("emp-chart-age",this.t("module.employees.analytics.chart.ageBuckets","\u0634\u0631\u0627\u0626\u062D \u0627\u0644\u0639\u0645\u0631"),"fa-birthday-cake")}
                    ${e("emp-chart-tenure",this.t("module.employees.analytics.chart.tenureBuckets","\u0634\u0631\u0627\u0626\u062D \u0627\u0644\u062E\u0628\u0631\u0629"),"fa-clock")}
                    ${e("emp-chart-hire",this.t("module.employees.analytics.chart.hireTrend","\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u062A\u0639\u064A\u064A\u0646"),"fa-chart-line")}
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
        `},async loadEmployeesAnalysis(t=!1){if(this.activeTab!=="data-analysis")return;const e=document.getElementById("employees-analysis-panel");if(e){e.querySelector("#emp-analytics-root")||(e.innerHTML=this.renderEmployeesAnalysisShellHTML(),this._empAnalyticsEventsBound=!1);try{await this.ensureEmployeesLoaded(t)}catch{}await this._empEnsureChartJs(),this._empAnalyticsEventsBound||(this._empBindAnalyticsEvents(),this._empAnalyticsEventsBound=!0),await this.updateEmployeesAnalyticsDashboard()}},async updateEmployeesAnalyticsDashboard(){if(!document.getElementById("emp-analytics-root"))return;const e=AppState.appData?.employees||[],a=this._empGetAnalyticsFiltersFromDom();this._empPopulateAnalyticsFilterOptions(e),Object.entries(a).forEach(([r,s])=>{const c=this._empFilterIdMap(),m=document.getElementById(c[r]);m&&s&&(m.value=s)});const o=this.buildEmployeeAnalyticsDataset(e,a),i=document.getElementById("emp-filter-results-count");i&&(i.dataset.baseCount=`${o.total} \u0645\u0648\u0638\u0641`,i.textContent=i.dataset.baseCount),this._empRenderAnalyticsBreadcrumb(a),this._empRenderAnalyticsKpiStrip(o),this._empDestroyAnalyticsCharts(),this._empRenderAnalyticsCharts(o),this._empRenderAnalyticsHeatmap(o),this._empRenderAnalyticsDetailTable(o),this._empRenderCompletenessTable(o),this._empUpdateAnalyticsFilterBadge()},_empBindAnalyticsEvents(){document.getElementById("emp-toggle-filters-btn")?.addEventListener("click",()=>{const t=document.getElementById("emp-filter-panel");t&&(t.style.display=t.style.display==="none"||!t.style.display?"block":"none")}),document.getElementById("emp-filter-reset-btn")?.addEventListener("click",()=>this._empClearAnalyticsFilters()),document.getElementById("emp-analytics-refresh")?.addEventListener("click",()=>this.loadEmployeesAnalysis(!0)),document.getElementById("emp-export-pdf-btn")?.addEventListener("click",()=>this._empExportAnalyticsPdf()),Object.values(this._empFilterIdMap()).forEach(t=>{document.getElementById(t)?.addEventListener("change",()=>this.updateEmployeesAnalyticsDashboard())}),document.querySelectorAll("[data-emp-detail-tab]").forEach(t=>{t.addEventListener("click",()=>{this._empAnalyticsDetailTab=t.getAttribute("data-emp-detail-tab")||"department",document.querySelectorAll("[data-emp-detail-tab]").forEach(o=>o.classList.toggle("active",o===t));const e=AppState.appData?.employees||[],a=this.buildEmployeeAnalyticsDataset(e,this._empGetAnalyticsFiltersFromDom());this._empRenderAnalyticsDetailTable(a)})})},async _empExportAnalyticsPdf(){const t=AppState.appData?.employees||[],e=this._empGetAnalyticsFiltersFromDom(),a=this.buildEmployeeAnalyticsDataset(t,e),o=a.byDepartment.slice(0,20).map(s=>`<tr><td>${Utils.escapeHTML(s.label)}</td><td>${s.count}</td><td>${s.percent}%</td><td>${s.male}</td><td>${s.female}</td></tr>`).join(""),i=a.byJob.slice(0,20).map(s=>`<tr><td>${Utils.escapeHTML(s.label)}</td><td>${s.count}</td><td>${s.percent}%</td><td>${s.male}</td><td>${s.female}</td></tr>`).join(""),r=`
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
                    <tbody>${o}</tbody>
                </table>
                <h2>\u0623\u0639\u0644\u0649 \u0627\u0644\u0648\u0638\u0627\u0626\u0641</h2>
                <table style="width:100%;border-collapse:collapse;">
                    <thead><tr style="background:#f1f5f9;"><th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th><th>\u0627\u0644\u0639\u062F\u062F</th><th>%</th><th>\u0630\u0643\u0631</th><th>\u0623\u0646\u062B\u0649</th></tr></thead>
                    <tbody>${i}</tbody>
                </table>
            </div>
        `;try{if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631..."),typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function")await FormHeader.generatePDF(r,`\u062A\u062D\u0644\u064A\u0644-\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646-${new Date().toISOString().slice(0,10)}.pdf`);else{const s=window.open("","_blank");s&&(s.document.write(r),s.document.close(),s.print())}Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")}catch{Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")}finally{Loading.hide()}},switchTab(t){const a=["employees-list","external-workforce","data-analysis"].includes(t)?t:"employees-list";this.activeTab=a,document.querySelectorAll("[data-employees-tab]").forEach(s=>{const c=s.getAttribute("data-employees-tab")===a;s.classList.toggle("active",c),s.style.background=c?"linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)":"#eff6ff",s.style.color=c?"#fff":"#1d4ed8",s.style.borderColor=c?"#0f172a":"#bfdbfe"});const o=document.getElementById("employees-list-panel"),i=document.getElementById("employees-external-panel"),r=document.getElementById("employees-analysis-panel");o&&o.classList.toggle("hidden",a!=="employees-list"),i&&i.classList.toggle("hidden",a!=="external-workforce"),r&&r.classList.toggle("hidden",a!=="data-analysis"),a==="external-workforce"?(this.populateExternalWorkforceYearSelector(),this.ensureExternalWorkforceDataLoaded().then(()=>this.renderExternalWorkforceTable()).catch(()=>{})):a==="data-analysis"?this.loadEmployeesAnalysis().catch(()=>{}):this.canViewEmployeesRegistryTab()&&(this.loadEmployeesList(),this.scrollToSearchField())},async renderList(){const t=this.canAddOrImport(),e=this.canViewEmployeesRegistryTab(),a=this.canViewExternalWorkforceTab(),o=this.canViewEmployeesAnalysisTab(),i=e?"employees-list":o?"data-analysis":a?"external-workforce":"employees-list";return(this.activeTab==="employees-list"&&!e||this.activeTab==="external-workforce"&&!a||this.activeTab==="data-analysis"&&!o)&&(this.activeTab=i),`
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
                ${e?`<button type="button" class="employees-tab-btn ${this.activeTab==="employees-list"?"active":""}" data-employees-tab="employees-list"><i class="fas fa-id-card ml-2"></i>${this.getExternalWorkforceViewState().labels.employeesTab}</button>`:""}
                ${o?`<button type="button" class="employees-tab-btn ${this.activeTab==="data-analysis"?"active":""}" data-employees-tab="data-analysis"><i class="fas fa-chart-bar ml-2"></i>${this.t("module.employees.tabs.dataAnalysis","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</button>`:""}
                ${a?`<button type="button" class="employees-tab-btn ${this.activeTab==="external-workforce"?"active":""}" data-employees-tab="external-workforce"><i class="fas fa-helmet-safety ml-2"></i>${this.getExternalWorkforceViewState().labels.externalTab}</button>`:""}
            </div>
            <div id="employees-list-panel" class="${this.activeTab!=="employees-list"||!e?"hidden":""}">
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
                            ${t?`
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
            ${o?`
            <div id="employees-analysis-panel" class="${this.activeTab!=="data-analysis"?"hidden":""}"></div>
            `:""}
        `},async ensureEmployeesLoaded(t=!1){if(this.cache.isUpdating&&!t){for(;this.cache.isUpdating;)await new Promise(o=>setTimeout(o,50));if(AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0)return!0}const e=AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0,a=this.cache.data&&this.cache.lastLoad&&Date.now()-this.cache.lastLoad<this.config.cacheTimeout&&!t;return e&&a?(AppState.debugMode&&Utils.safeLog(`\u2705 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 Cache (${this.cache.data.length} \u0645\u0648\u0638\u0641)`),this.cache.data&&this.cache.data.length>0&&(AppState.appData.employees=this.cache.data),!this.config._refreshedOnceForInactive&&AppState.appData.employees.length>0&&AppState.googleConfig?.appsScript?.enabled&&(AppState.appData.employees||[]).filter(i=>this.isEmployeeInactive(i)).length===0&&(this.config._refreshedOnceForInactive=!0,this.loadEmployeesFromBackend(!0).then(()=>{window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{}}))}).catch(()=>{})),!0):e&&!a&&!t?(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),this.updateEmployeesInBackground(),!0):await this.loadEmployeesFromBackend(t)},async loadEmployeesFromBackend(t=!1){if(this.cache.isUpdating&&!t){for(AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0628\u0627\u0644\u0641\u0639\u0644\u060C \u0627\u0646\u062A\u0638\u0627\u0631...");this.cache.isUpdating;)await new Promise(e=>setTimeout(e,50));if(AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0)return!0}this.cache.isUpdating=!0;try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl)return AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644 - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637"),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),this.cache.isUpdating=!1,!1;if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),this.cache.isUpdating=!1,!1;try{const e=await GoogleIntegration.sendRequest({action:"getAllEmployees",data:{filters:{includeInactive:!0}}});if(e&&e.success&&Array.isArray(e.data))return AppState.appData.employees=e.data,this.cache.data=e.data,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${e.data.length} \u0645\u0648\u0638\u0641 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`),this.cache.isUpdating=!1,!0;{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F getAllEmployees \u0641\u0634\u0644\u060C \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0640 readFromSheet...");const a=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Employees",spreadsheetId:AppState.googleConfig.sheets.spreadsheetId}});if(a&&a.success&&Array.isArray(a.data))return AppState.appData.employees=a.data,this.cache.data=a.data,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a.data.length} \u0645\u0648\u0638\u0641 \u0645\u0646 Google Sheets`),this.cache.isUpdating=!1,!0}}catch(e){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 Backend:",e),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),this.cache.isUpdating=!1,!1}return this.cache.isUpdating=!1,!1}catch(e){return AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A loadEmployeesFromBackend:",e),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),this.cache.isUpdating=!1,!1}},async updateEmployeesInBackground(){if(!this.cache.isUpdating){this.cache.isUpdating=!0;try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return;const t=await GoogleIntegration.sendRequest({action:"getAllEmployees",data:{filters:{includeInactive:!0}}});if(t&&t.success&&Array.isArray(t.data)){const e=AppState.appData.employees?.length||0,a=t.data.length;(e!==a||JSON.stringify(AppState.appData.employees)!==JSON.stringify(t.data))&&(AppState.appData.employees=t.data,this.cache.data=t.data,this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u{1F504} \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629 (${t.data.length} \u0645\u0648\u0638\u0641)`),window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{count:t.data.length}})))}}catch(t){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",t)}finally{this.cache.isUpdating=!1}}},startBackgroundUpdate(){this.config.backgroundUpdateTimer&&clearInterval(this.config.backgroundUpdateTimer),this.config.backgroundUpdateTimer=setInterval(()=>{this.updateEmployeesInBackground()},this.config.backgroundUpdateInterval),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0628\u062F\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0643\u0644 ${this.config.backgroundUpdateInterval/6e4} \u062F\u0642\u064A\u0642\u0629)`)},stopBackgroundUpdate(){this.config.backgroundUpdateTimer&&(clearInterval(this.config.backgroundUpdateTimer),this.config.backgroundUpdateTimer=null)},cleanup(){try{AppState.debugMode&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Employees module..."),this.stopBackgroundUpdate(),this.handleDataUpdate&&(window.removeEventListener("employeesDataUpdated",this.handleDataUpdate),this.handleDataUpdate=null),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Employees module")}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Employees module:",t)}},async loadEmployeesList(t=!1){const e=document.getElementById("employees-table-container");if(!e){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F employees-table-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A loadEmployeesList");return}let a=AppState.appData.employees||[];if(AppState.debugMode&&Utils.safeLog(`\u{1F4CA} loadEmployeesList: \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 = ${a.length}, showInactive = ${t}`),t)AppState.debugMode&&Utils.safeLog(`\u{1F4CA} \u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0628\u0645\u0627 \u0641\u064A \u0630\u0644\u0643 \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646): ${a.length}`);else{const n=a.length;a=a.filter(d=>!this.isEmployeeInactive(d)),AppState.debugMode&&Utils.safeLog(`\u{1F4CA} \u0628\u0639\u062F \u0627\u0644\u062A\u0635\u0641\u064A\u0629 (\u0646\u0634\u0637\u064A\u0646 \u0641\u0642\u0637): ${a.length} \u0645\u0646 ${n}`)}this.renderStatsCards(),this.updateInactiveCount();const o=this.canAddOrImport(),i=this.canEditOrDelete(),r=document.createDocumentFragment();if(a.length===0){const n=document.createElement("div");n.className="empty-state",n.innerHTML=`
                <i class="fas fa-user-tie text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">${this.t("module.employees.emptyList","\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0633\u062C\u0644\u064A\u0646")}</p>
                ${o?`
                <button id="add-employee-empty-btn" class="btn-primary mt-4">
                    <i class="fas fa-plus ml-2"></i>
                    ${this.t("module.employees.addNewEmployee","\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F")}
                </button>
                `:""}
            `,r.appendChild(n),e.innerHTML="",e.appendChild(r),requestAnimationFrame(()=>{const d=document.getElementById("add-employee-empty-btn");d&&this.canAddOrImport()&&d.addEventListener("click",()=>this.showForm())});return}const s=document.createElement("div");s.className="table-wrapper",s.style.cssText="width: 100%; max-width: 100%; overflow-x: auto;";const c=document.createElement("table");c.className="data-table table-header-blue",c.style.cssText="width: 100%; min-width: 100%; table-layout: auto;";const m=document.createElement("thead");m.innerHTML=`
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
        `;const l=document.createElement("tbody");a.forEach(n=>{const d=this.formatDateSafe(n.birthDate),h=this.formatDateSafe(n.hireDate),v=this.calculateAge(n.birthDate),x=this.isEmployeeInactive(n),b=x?"opacity: 0.7; background-color: #f8f9fa;":"",u=document.createElement("tr");x&&(u.style.cssText=b);const y=(this._getDriveIdFromUrl(n.photo||"")||n.id||n.employeeNumber||n.name||"").toString(),g=this._normalizeEmployeePhotoUrl(n.photo,n.id),f=g&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(g):{canonical:g||"",displaySrc:g||"",needsProxy:!1,proxyFileId:""},w=f.canonical?f.displaySrc:"",S=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(f):"";u.innerHTML=`
                <td style="word-wrap: break-word;">
                    ${g?`<img data-emp-photo="1" data-photo-key="${Utils.escapeHTML(y)}" src="${Utils.escapeHTML(w)}" alt="${Utils.escapeHTML(n.name||"")}"${S} class="w-12 h-12 rounded-full object-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer">`:'<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>'}
                </td>
                <td style="word-wrap: break-word; white-space: normal;">
                    ${Utils.escapeHTML(n.employeeNumber||"")}
                    ${x?`<span class="badge badge-warning ml-2" style="font-size: 10px; padding: 2px 6px;">${this.t("module.employees.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")}</span>`:""}
                </td>
                <td style="word-wrap: break-word; white-space: normal; max-width: 200px;">
                    ${Utils.escapeHTML(n.name||"")}
                    ${x&&n.resignationDate?`<br><span class="text-xs text-gray-500" style="font-size: 11px;">${this.t("module.employees.resignedOn","\u0627\u0633\u062A\u0642\u0627\u0644")}: ${this.formatDateSafe(n.resignationDate)}</span>`:""}
                </td>
                <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(n.department||"")}</td>
                <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(n.job||n.position||"")}</td>
                <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(n.nationalId||"")}</td>
                <td style="word-wrap: break-word; white-space: normal;">${d||""}</td>
                <td style="word-wrap: break-word; white-space: normal;">${v?v+" "+this.t("module.common.yearsUnit","\u0633\u0646\u0629"):""}</td>
                <td style="word-wrap: break-word; white-space: normal;">${h||""}</td>
                <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(n.gender||"")}</td>
                <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(n.phone||"")}</td>
                <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(n.insuranceNumber||"")}</td>
                ${i?`
                <td style="min-width: 150px;">
                    <div class="flex items-center gap-2 flex-wrap">
                        <button onclick="Employees.viewEmployee('${n.id}')" class="btn-icon btn-icon-info" title="${this.t("module.common.view","\u0639\u0631\u0636")}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="Employees.editEmployee('${n.id}')" class="btn-icon btn-icon-primary" title="${this.t("module.common.edit","\u062A\u0639\u062F\u064A\u0644")}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="Employees.deactivateEmployee('${n.id}')" class="btn-icon btn-icon-danger" title="${this.t("module.employees.deactivate","\u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644")}">
                            <i class="fas fa-user-slash"></i>
                        </button>
                    </div>
                </td>
                `:`
                <td>
                    <span class="text-gray-400 text-sm">\u2014</span>
                </td>
                `}
            `,l.appendChild(u)}),c.appendChild(m),c.appendChild(l),s.appendChild(c),r.appendChild(s),e.innerHTML="",e.appendChild(r),this.applyModuleI18n(e),typeof requestIdleCallback=="function"?requestIdleCallback(()=>{this._setupEmployeePhotoFallbacks(e),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(e,{onFetchFail:n=>{try{const d=(n.dataset.photoKey||"").trim();d&&sessionStorage.setItem(this._photoFailKey(d),Date.now().toString())}catch{}try{const d=n.parentElement;d&&(d.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}}})},{timeout:600}):setTimeout(()=>{this._setupEmployeePhotoFallbacks(e),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(e,{onFetchFail:n=>{try{const d=(n.dataset.photoKey||"").trim();d&&sessionStorage.setItem(this._photoFailKey(d),Date.now().toString())}catch{}try{const d=n.parentElement;d&&(d.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}}})},0),this.populateFilters(),requestAnimationFrame(async()=>{try{const n=this.getFilterValues();(n.search||n.department||n.branch||n.location||n.job||n.position||n.gender||n.showInactive)&&await this.applyFilters()}catch(n){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",n)}})},populateFilters(){const t=AppState.appData.employees||[],e=[...new Set(t.map(d=>d.department).filter(Boolean))].sort(),a=[...new Set(t.map(d=>d.branch).filter(Boolean))].sort(),o=[...new Set(t.map(d=>d.location).filter(Boolean))].sort(),i=[...new Set(t.map(d=>d.job||d.position).filter(Boolean))].sort(),r=[...new Set(t.map(d=>d.position||d.job).filter(Boolean))].sort(),s=document.getElementById("employee-filter-department");if(s){const d=s.value;s.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+e.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===d?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}const c=document.getElementById("employee-filter-branch");if(c){const d=c.value;c.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+a.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===d?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}const m=document.getElementById("employee-filter-location");if(m){const d=m.value;m.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+o.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===d?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}const l=document.getElementById("employee-filter-job");if(l){const d=l.value;l.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+i.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===d?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}const n=document.getElementById("employee-filter-position");if(n){const d=n.value;n.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+r.map(h=>`<option value="${Utils.escapeHTML(h)}" ${h===d?"selected":""}>${Utils.escapeHTML(h)}</option>`).join("")}},setupEventListeners(){setTimeout(()=>{window.removeEventListener("employeesDataUpdated",this.handleDataUpdate),this.handleDataUpdate=p=>{if(p.detail?.externalWorkforce){clearTimeout(this._employeesUpdateDebounceTimer),this._externalWorkforceCache.clear(),this._employeesUpdateDebounceTimer=setTimeout(()=>{document.getElementById("external-workforce-table-container")&&this.renderExternalWorkforceTable()},60);return}if(this.activeTab==="data-analysis"&&document.getElementById("emp-analytics-root")){clearTimeout(this._employeesUpdateDebounceTimer),this._employeesUpdateDebounceTimer=setTimeout(()=>{this.updateEmployeesAnalyticsDashboard().catch(()=>{})},120);return}p.detail&&p.detail.count&&(clearTimeout(this._employeesUpdateDebounceTimer),this._employeesUpdateDebounceTimer=setTimeout(()=>{document.getElementById("employees-table-container")?requestAnimationFrame(()=>setTimeout(()=>this.loadEmployeesList(),0)):this.renderStatsCards()},120))},window.addEventListener("employeesDataUpdated",this.handleDataUpdate),document.querySelectorAll("[data-employees-tab]").forEach(p=>{p.addEventListener("click",()=>this.switchTab(p.getAttribute("data-employees-tab")||"employees-list"))}),this.ensureExternalWorkforceToolbar();const t=document.getElementById("external-workforce-year");t&&t.addEventListener("change",async p=>{const y=Number(p.target.value);!Number.isFinite(y)||y<2e3||(this.externalWorkforceYear=y,await this.ensureExternalWorkforceDataLoaded(),this.renderExternalWorkforceTable())});const e=document.getElementById("external-workforce-table-container");if(e){const p=async y=>{const g=y.target;!g||!g.matches(".external-workforce-input")||await this.saveExternalWorkforceValue(g.getAttribute("data-contractor-key")||"",g.getAttribute("data-month")||"",g.value)};e.addEventListener("change",p),e.addEventListener("blur",p,!0)}document.getElementById("external-workforce-export-excel-btn")?.addEventListener("click",()=>{this.exportExternalWorkforceToExcel()}),document.getElementById("external-workforce-export-pdf-btn")?.addEventListener("click",()=>{this.exportExternalWorkforceToPDF()});const a=document.getElementById("external-workforce-import-excel-btn"),o=document.getElementById("external-workforce-import-input");a&&o&&(a.addEventListener("click",()=>o.click()),o.addEventListener("change",async p=>{const y=p.target.files?.[0];y&&(await this.importExternalWorkforceExcelFile(y),p.target.value="")})),this.canViewExternalWorkforceTab()&&(this.populateExternalWorkforceYearSelector(),this.activeTab==="external-workforce"&&this.ensureExternalWorkforceDataLoaded().then(()=>this.renderExternalWorkforceTable()).catch(()=>{}));const i=document.getElementById("add-employee-btn"),r=document.getElementById("add-employee-empty-btn"),s=document.getElementById("import-employees-excel-btn"),c=document.getElementById("refresh-employees-btn"),m=document.getElementById("refresh-employee-names-btn"),l=document.getElementById("delete-all-employees-btn");if(AppState.debugMode&&Utils.safeLog("\u{1F50D} \u0641\u062D\u0635 \u0627\u0644\u0623\u0632\u0631\u0627\u0631:",{refreshBtn:!!c,refreshNamesBtn:!!m,deleteAllBtn:!!l,searchInput:!!document.getElementById("employees-search"),filterSearchInput:!!document.getElementById("employees-search-filter")}),i&&this.canAddOrImport()&&i.addEventListener("click",()=>this.showForm()),r&&this.canAddOrImport()&&r.addEventListener("click",()=>this.showForm()),s&&this.canAddOrImport()&&s.addEventListener("click",()=>this.showImportExcel()),c){const p=c.cloneNode(!0);c.parentNode.replaceChild(p,c),p.addEventListener("click",async()=>{p.disabled=!0;const y=p.innerHTML;p.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B...',typeof Loading<"u"&&Loading.show();try{if(await this.loadEmployeesFromBackend(!0)){const f=document.getElementById("show-inactive-employees")?.checked||!1;await this.loadEmployeesList(f),await this.applyFilters(),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}else typeof Notification<"u"&&Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u062F\u064A\u062F\u0629")}catch(g){typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+g.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",g)}finally{typeof Loading<"u"&&Loading.hide(),p.disabled=!1,p.innerHTML=y}})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");m&&this.canAddOrImport()&&m.addEventListener("click",async()=>this.refreshEmployeeNames()),l&&this.canAddOrImport()&&l.addEventListener("click",async()=>this.deleteAllEmployees());const n=document.getElementById("employees-search");if(n){const p=n.cloneNode(!0);n.parentNode.replaceChild(p,n);let y=null;const g=async()=>{try{const f=document.getElementById("employees-search-filter");f&&(f.value=p.value),await this.applyFilters()}catch(f){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0628\u062D\u062B:",f)}};p.addEventListener("input",f=>{y&&clearTimeout(y),y=setTimeout(g,300)}),p.addEventListener("keydown",async f=>{f.key==="Enter"&&(f.preventDefault(),y&&clearTimeout(y),await g())})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B \u0641\u064A header \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");const d=document.getElementById("employees-search-filter");if(d){const p=d.cloneNode(!0);d.parentNode.replaceChild(p,d);let y=null;const g=async()=>{try{n&&(n.value=p.value),await this.applyFilters()}catch(f){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0628\u062D\u062B:",f)}};p.addEventListener("input",f=>{y&&clearTimeout(y),y=setTimeout(g,300)}),p.addEventListener("keydown",async f=>{f.key==="Enter"&&(f.preventDefault(),y&&clearTimeout(y),await g())})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");["employee-filter-department","employee-filter-branch","employee-filter-location","employee-filter-job","employee-filter-position","employee-filter-gender"].forEach(p=>{const y=document.getElementById(p);y&&y.addEventListener("change",async()=>{try{await this.applyFilters()}catch(g){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631:",g)}})});const v=document.getElementById("employee-reset-filters");if(v){const p=v.cloneNode(!0);v.parentNode.replaceChild(p,v),p.addEventListener("click",async()=>{try{await this.resetFilters()}catch(y){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",y),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631")}})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");let x=document.getElementById("show-inactive-employees");if(x){const p=x.cloneNode(!0);x.parentNode.replaceChild(p,x),p.addEventListener("change",async y=>{const g=y.target.checked;AppState.debugMode&&Utils.safeLog(`\u{1F504} \u062A\u063A\u064A\u064A\u0631 \u062D\u0627\u0644\u0629 \u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646: ${g?"\u0639\u0631\u0636":"\u0625\u062E\u0641\u0627\u0621"}`);try{typeof Loading<"u"&&Loading.show();const f=document.getElementById("show-inactive-employees-container");f&&(g?(f.style.background="linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",f.style.borderColor="#dc2626",f.style.boxShadow="0 4px 12px rgba(220, 38, 38, 0.2)"):(f.style.background="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",f.style.borderColor="#dee2e6",f.style.boxShadow="none")),await this.loadEmployeesList(g);const w=document.getElementById("show-inactive-employees");w&&w.checked!==g&&(w.checked=g),await this.applyFilters(),this.updateInactiveCount(),typeof Notification<"u"&&Notification.success(g?"\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 (\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646)":"\u062A\u0645 \u0625\u062E\u0641\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646")}catch(f){p.checked=!g,AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",f),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}finally{typeof Loading<"u"&&Loading.hide(),this.updateInactiveCount()}}),this.updateInactiveCount(),setTimeout(()=>this.updateInactiveCount(),300)}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0632\u0631 \u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");window.addEventListener("employeesDataUpdated",()=>{this.updateInactiveCount(),setTimeout(()=>this.updateInactiveCount(),100)}),requestAnimationFrame(async()=>{try{const p=this.getFilterValues();(p.search||p.department||p.branch||p.location||p.job||p.position||p.gender||p.showInactive)&&await this.applyFilters()}catch(p){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",p)}});const b=document.getElementById("employee-form");b&&b.addEventListener("submit",p=>this.handleSubmit(p));const u=document.getElementById("cancel-employee-btn");u&&u.addEventListener("click",()=>this.showList()),this.setupPhotoPreview()},100)},async refreshEmployeeNames(){if(!this.canAddOrImport()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0646\u0641\u064A\u0630 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}const t=document.getElementById("refresh-employee-names-btn"),e=t?.innerHTML;t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621...'),typeof Loading<"u"&&Loading.show();try{await this.loadEmployeesFromBackend(!0);const a=Array.isArray(AppState.appData.employees)?AppState.appData.employees:[];if(a.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646");return}let o=0;const i=a.map(s=>{const c=s?.name??"",m=String(c).replace(/\s+/g," ").trim();return m!==String(c)&&o++,{...s,name:m}});AppState.appData.employees=i,this.cache.data=i,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.autoSave("Employees",AppState.appData.employees);const r=document.getElementById("show-inactive-employees")?.checked||!1;this.renderStatsCards(),this.loadEmployeesList(r),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(s){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",s)}}),Notification?.success?.(o>0?`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621 (${o} \u062A\u0639\u062F\u064A\u0644\u0627\u062A)`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u0623\u0633\u0645\u0627\u0621")}catch(a){Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621: "+(a?.message||a)),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",a)}finally{typeof Loading<"u"&&Loading.hide(),t&&(t.disabled=!1,t.innerHTML=e)}},async deleteAllEmployees(){if(!this.canAddOrImport()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0646\u0641\u064A\u0630 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}if(!window.confirm("\u062A\u062D\u0630\u064A\u0631: \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646. \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F\u061F"))return;const e=window.prompt("\u0623\u062F\u062E\u0644 \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0633\u0631\u064A \u0644\u0644\u062D\u0630\u0641:");if(e===null){Notification?.warning?.("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");return}const a=document.getElementById("delete-all-employees-btn"),o=a?.innerHTML;a&&(a.disabled=!0,a.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0630\u0641...');try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.callBackend)throw new Error("GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");const i=await GoogleIntegration.callBackend("deleteAllEmployees",{pin:String(e||"").trim()});if(!i||!i.success)throw new Error(i?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");AppState.appData.employees=[],this.cache.data=[],this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.renderStatsCards();const r=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(r),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(s){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",s)}}),Notification?.success?.(i?.message||"\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0628\u0646\u062C\u0627\u062D")}catch(i){Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(i?.message||i))}finally{a&&(a.disabled=!1,a.innerHTML=o)}},setupPhotoPreview(){const t=document.getElementById("employee-photo-input"),e=document.getElementById("employee-photo-preview"),a=document.getElementById("employee-photo-icon");t&&e&&a&&t.addEventListener("change",o=>{const i=o.target.files[0];if(i){const r=new FileReader;r.onload=s=>{e.src=s.target.result,e.style.display="block",a.style.display="none"},r.readAsDataURL(i)}})},currentEditId:null,async showForm(t=null){if(!t&&!this.canAddOrImport()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F");return}if(t&&!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641");return}this.currentEditId=t?.id||null;const e=document.getElementById("employees-content");e&&(e.innerHTML=await this.renderForm(t),this.applyModuleI18n(e),this.setupEventListeners())},async renderForm(t=null){const e=!!t;return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-${e?"edit":"user-plus"} ml-2"></i>
                        ${e?this.t("module.employees.editEmployee","\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0638\u0641"):this.t("module.employees.addNewEmployee","\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F")}
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
                                        <img id="employee-photo-preview" src="${t?.photo||""}" alt="${this.t("module.employees.employeePhoto","\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641")}" style="width: 100%; height: 100%; object-fit: cover; display: ${t?.photo?"block":"none"};">
                                        <i id="employee-photo-icon" class="fas fa-user text-4xl text-gray-400" style="display: ${t?.photo?"none":"block"}"></i>
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
                                <input type="text" id="employee-name" required class="form-input" value="${t?.name||""}" placeholder="${this.t("module.employees.fullName","\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644")}">
                            </div>
                            <div>
                                <label for="employee-sap-id" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (ID SAP) *</label>
                                <input type="text" id="employee-sap-id" required class="form-input" value="${t?.sapId||t?.employeeNumber||""}" placeholder="ID SAP">
                            </div>
                            <div>
                                <label for="employee-number" class="block text-sm font-semibold text-gray-700 mb-2">${this.t("module.employees.employeeNumberRequired","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A *")}</label>
                                <input type="text" id="employee-number" required class="form-input" value="${t?.employeeNumber||""}" placeholder="${this.t("module.employees.employeeNumber","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}">
                            </div>
                            <div>
                                <label for="employee-hire-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646 *</label>
                                <input type="date" id="employee-hire-date" required class="form-input" value="${t?.hireDate?this.formatDateSafe(t.hireDate):""}">
                            </div>
                            <div>
                                <label for="employee-birth-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F</label>
                                <input type="date" id="employee-birth-date" class="form-input" value="${t?.birthDate?this.formatDateSafe(t.birthDate):""}">
                            </div>
                            <div>
                                <label for="employee-department" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 *</label>
                                <input type="text" id="employee-department" required class="form-input" value="${t?.department||""}" placeholder="\u0627\u0644\u0642\u0633\u0645">
                            </div>
                            <div>
                                <label for="employee-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0646\u0635\u0628 (Job) *</label>
                                <input type="text" id="employee-position" required class="form-input" value="${t?.position||""}" placeholder="\u0627\u0644\u0645\u0646\u0635\u0628">
                            </div>
                            <div>
                                <label for="employee-branch" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0631\u0639 (Branch)</label>
                                <input type="text" id="employee-branch" class="form-input" value="${t?.branch||""}" placeholder="\u0627\u0644\u0631\u0639">
                            </div>
                            <div>
                                <label for="employee-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 (Location)</label>
                                <input type="text" id="employee-location" class="form-input" value="${t?.location||""}" placeholder="\u0627\u0644\u0645\u0648\u0642\u0639">
                            </div>
                            <div>
                                <label for="employee-gender" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062C\u0646\u0633 (Gender)</label>
                                <select id="employee-gender" class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062C\u0646\u0633</option>
                                    <option value="\u0630\u0643\u0631" ${t?.gender==="\u0630\u0643\u0631"?"selected":""}>\u0630\u0643\u0631</option>
                                    <option value="\u0623\u0646\u062B\u0649" ${t?.gender==="\u0623\u0646\u062B\u0649"?"selected":""}>\u0623\u0646\u062B\u0649</option>
                                </select>
                            </div>
                            <div>
                                <label for="employee-national-id" class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u064A\u0629</label>
                                <input type="text" id="employee-national-id" class="form-input" value="${t?.nationalId||""}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u064A\u0629">
                            </div>
                            <div>
                                <label for="employee-email" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</label>
                                <input type="email" id="employee-email" class="form-input" value="${t?.email||""}" placeholder="\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A">
                            </div>
                            <div>
                                <label for="employee-phone" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0647\u0627\u062A\u0641</label>
                                <input type="tel" id="employee-phone" class="form-input" value="${t?.phone||""}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641">
                            </div>
                            <div>
                                <label for="employee-insurance-number" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A</label>
                                <input type="text" id="employee-insurance-number" class="form-input" value="${t?.insuranceNumber||""}" placeholder="\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A">
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" id="cancel-employee-btn" class="btn-secondary">${this.t("module.common.cancel","\u0625\u0644\u063A\u0627\u0621")}</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${e?this.t("module.common.saveChanges","\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A"):this.t("module.employees.addEmployee","\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `},async showImportExcel(){if(!this.canAddOrImport()){Notification.error(this.t("module.employees.noImportPermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"));return}const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2"></i>${this.t("module.employees.importModalTitle","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0645\u0644\u0641 Excel")}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded p-4">
                            <p class="text-sm text-blue-800 mb-2"><strong>\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0647\u0645\u0629:</strong></p>
                            <p class="text-sm text-blue-700 mb-2">\u064A\u062C\u0628 \u0623\u0646 \u064A\u062D\u062A\u0648\u064A \u0645\u0644\u0641 Excel \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629:</p>
                            <ul class="text-sm text-blue-700 list-disc mr-6 mt-2 space-y-1">
                                <li><strong>ID SAP</strong> \u0623\u0648 <strong>\u0631\u0642\u0645 SAP</strong> - \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</li>
                                <li><strong>\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</strong> \u0623\u0648 <strong>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</strong> \u0623\u0648 <strong>Employee Number</strong> - (\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0643\u0640 ID)</li>
                                <li><strong>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</strong> \u0623\u0648 <strong>Employee Name</strong> - \u0625\u0644\u0632\u0627\u0645\u064A</li>
                                <li><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646</strong> \u0623\u0648 <strong>Hire Date</strong></li>
                                <li><strong>Job</strong> \u0623\u0648 <strong>\u0627\u0644\u0645\u0646\u0635\u0628</strong></li>
                                <li><strong>Department</strong> \u0623\u0648 <strong>\u0627\u0644\u0642\u0633\u0645</strong></li>
                                <li><strong>Branch</strong> \u0623\u0648 <strong>\u0627\u0644\u0631\u0639</strong></li>
                                <li><strong>Location</strong> \u0623\u0648 <strong>\u0627\u0644\u0645\u0648\u0642\u0639</strong></li>
                                <li><strong>Gender</strong> \u0623\u0648 <strong>\u0627\u0644\u062C\u0646\u0633</strong></li>
                                <li><strong>\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u0649</strong> \u0623\u0648 <strong>National ID</strong></li>
                                <li><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F</strong> \u0623\u0648 <strong>Date of Birth</strong></li>
                                <li><strong>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A</strong> \u0623\u0648 <strong>Insurance Number</strong></li>
                            </ul>
                        </div>
                        <div>
                            <label for="employee-excel-file-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-file-excel ml-2"></i>
                                \u0627\u062E\u062A\u0631 \u0645\u0644 Excel (.xlsx, .xls)
                            </label>
                            <input type="file" id="employee-excel-file-input" accept=".xlsx,.xls" class="form-input">
                        </div>
                        <div id="employee-import-preview" class="hidden">
                            <h3 class="text-sm font-semibold mb-2">\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0623\u0648\u0644 5 \u0635\u0648\u0631\u0629):</h3>
                            <div class="max-h-60 overflow-auto border rounded">
                                <table class="data-table text-xs">
                                    <thead id="employee-preview-head"></thead>
                                    <tbody id="employee-preview-body"></tbody>
                                </table>
                            </div>
                            <p id="employee-preview-count" class="text-sm text-gray-600 mt-2"></p>
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
        `,this.applyModuleI18n(t),document.body.appendChild(t);const e=document.getElementById("employee-excel-file-input"),a=document.getElementById("employee-import-preview"),o=document.getElementById("employee-import-confirm-btn");let i=[];e.addEventListener("change",async r=>{const s=r.target.files[0];if(s){Loading.show();try{const c=await s.arrayBuffer(),m=XLSX.read(c,{type:"array",cellDates:!0}),l=m.SheetNames[0],n=m.Sheets[l],d=XLSX.utils.sheet_to_json(n,{header:1,defval:"",raw:!1});if(d.length<2){Notification.error(this.t("module.employees.invalidFile","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D")),Loading.hide();return}const h=d[0].map(u=>String(u||"").trim());i=d.slice(1).map(u=>{const p={};return h.forEach((y,g)=>{const f=u[g];p[y]=f??""}),p}).filter(u=>String(u[h[0]]||"").trim()!=="");const v=document.getElementById("employee-preview-head"),x=document.getElementById("employee-preview-body"),b=document.getElementById("employee-preview-count");v.innerHTML=`<tr>${h.map(u=>`<th>${Utils.escapeHTML(u)}</th>`).join("")}</tr>`,x.innerHTML=i.slice(0,5).map(u=>`<tr>${h.map(p=>`<td>${Utils.escapeHTML(String(u[p]||""))}</td>`).join("")}</tr>`).join(""),b.textContent=`${this.t("module.employees.totalRows","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641")}: ${i.length}`,a.classList.remove("hidden"),o.disabled=!1,Loading.hide()}catch(c){Loading.hide(),Notification.error(this.t("module.employees.readFileFailed","\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641")+": "+c.message)}}}),o.addEventListener("click",async()=>{if(i.length!==0){Loading.show();try{let r=0,s=0;const c=l=>l==null?"":String(l).trim();i.forEach(l=>{try{const n=l["\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638"]||l["\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"]||l["Employee Name"]||l.Name||l.name||"",d=l["ID SAP"]||l["\u0631\u0642\u0645 SAP"]||l["SAP ID"]||l.sap_id||"",h=l["\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"]||l["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]||l["Employee Number"]||l.employee_number||"",v=l["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646"]||l["Hire Date"]||l.hire_date||"",x=l.Job||l.job||l.\u0627\u0644\u0645\u0646\u0635\u0628||"",b=l.Department||l.department||l.\u0627\u0644\u0642\u0633\u0645||"",u=l.Branch||l.branch||l.\u0627\u0644\u0631\u0639||"",p=l.Location||l.location||l.\u0627\u0644\u0645\u0648\u0642\u0639||"",y=l.Gender||l.gender||l.\u0627\u0644\u062C\u0646\u0633||"",g=l["\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u0649"]||l["National ID"]||l.national_id||"",f=l["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F"]||l["Date of Birth"]||l.birth_date||"",w=l.Email||l.email||l["\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"]||"",S=l.Phone||l.phone||l.\u0627\u0644\u0647\u0627\u062A||"",k=l["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A"]||l["Insurance Number"]||l.insurance_number||l["\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646"]||"",$=c(h)||c(d);if(!n&&!$){s++;return}if(AppState.appData.employees.find(A=>A.employeeNumber&&A.employeeNumber===$||A.name&&A.name.toLowerCase()===c(n).toLowerCase()))s++;else{const A={id:$||Utils.generateId("EMP"),name:c(n),employeeNumber:$||Utils.generateId("EMP"),sapId:c(d),hireDate:this.normalizeDateOnly(v)||this.normalizeDateOnly(new Date),job:c(x),position:c(x),department:c(b),branch:c(u),location:c(p),gender:c(y),nationalId:c(g),birthDate:this.normalizeDateOnly(f),email:c(w),phone:c(S),insuranceNumber:c(k),photo:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.employees.push(A),r++}}catch{s++}}),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Employees",AppState.appData.employees),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${r} \u0645\u0648\u0638\u0641${s>0?` (\u0641\u0634\u0644 ${s} \u0645\u0648\u0638\u0641\u064A\u0646)`:""}`),t.remove(),this.renderStatsCards();const m=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(m),requestAnimationFrame(()=>{this.applyFilters()})}catch(r){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+r.message)}}}),t.addEventListener("click",r=>{r.target===t&&t.remove()})},async handleSubmit(t){t.preventDefault();const e=t.target?.querySelector('button[type="submit"]')||document.querySelector('#employee-form button[type="submit"]');if(e&&e.disabled)return;let a="";e&&(a=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const o=this.currentEditId?AppState.appData.employees.find(A=>A.id===this.currentEditId):null;let i=o?.photo||"";const r=document.getElementById("employee-photo-input");if(r&&r.files.length>0){const A=r.files[0];if(A.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0647\u0648 2MB"),e&&(e.disabled=!1,e.innerHTML=a);return}i=await this.convertImageToBase64(A)}const s=document.getElementById("employee-name"),c=document.getElementById("employee-number"),m=document.getElementById("employee-sap-id"),l=document.getElementById("employee-hire-date"),n=document.getElementById("employee-birth-date"),d=document.getElementById("employee-department"),h=document.getElementById("employee-position"),v=document.getElementById("employee-branch"),x=document.getElementById("employee-location"),b=document.getElementById("employee-gender"),u=document.getElementById("employee-national-id"),p=document.getElementById("employee-email"),y=document.getElementById("employee-phone"),g=document.getElementById("employee-insurance-number");if(!s||!c||!m||!d||!h||!v||!x||!b||!p||!y){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const f=!!this.currentEditId,w=f&&o?.hireDate||"",S=f&&o?.birthDate||"",k={id:c.value.trim()||this.currentEditId||Utils.generateId("EMP"),name:s.value.trim(),employeeNumber:c.value.trim(),sapId:m.value.trim(),hireDate:l?.value?this.normalizeDateOnly(l.value):f?this.normalizeDateOnly(w):this.normalizeDateOnly(new Date),birthDate:n?.value?this.normalizeDateOnly(n.value):f?this.normalizeDateOnly(S):"",department:d.value.trim(),job:h.value.trim(),position:h.value.trim(),branch:v.value.trim(),location:x.value.trim(),gender:b.value,nationalId:u?.value.trim()||"",email:p.value.trim(),phone:y.value.trim(),insuranceNumber:g?.value.trim()||"",photo:i,status:f&&o?.status||"active",resignationDate:f&&o?.resignationDate||"",createdAt:this.currentEditId?o?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(!k.name||!k.sapId||!k.employeeNumber||!k.department||!k.position){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u060C \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u060C \u0627\u0644\u0642\u0633\u0645\u060C \u0627\u0644\u0645\u0646\u0635\u0628)"),e&&(e.disabled=!1,e.innerHTML=a);return}const $=String(k.id||"").trim();if(!$){Notification.error("\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D (\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0646\u0634\u0627\u0621 id \u0641\u0627\u0631\u063A)"),e&&(e.disabled=!1,e.innerHTML=a);return}if(AppState.appData.employees.some(A=>{const U=String(A?.id||"").trim();return!U||this.currentEditId&&U===String(this.currentEditId).trim()?!1:U===$})){Notification.error("\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0631\u0642\u0645 \u0622\u062E\u0631."),e&&(e.disabled=!1,e.innerHTML=a);return}Loading.show();try{if(this.currentEditId){const A=AppState.appData.employees.findIndex(U=>U.id===this.currentEditId);A!==-1&&(AppState.appData.employees[A]=k,this.currentEditId=$),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.employees.push(k),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Employees",AppState.appData.employees),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),e&&(e.disabled=!1,e.innerHTML=a),this.renderStatsCards(),this.showList()}catch(A){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+A.message),e&&(e.disabled=!1,e.innerHTML=a)}},async convertImageToBase64(t){return new Promise((e,a)=>{const o=new FileReader;o.onload=()=>e(o.result),o.onerror=a,o.readAsDataURL(t)})},async showList(){this.currentEditId=null,!this.canViewEmployeesRegistryTab()&&this.canViewEmployeesAnalysisTab()?this.activeTab="data-analysis":!this.canViewEmployeesRegistryTab()&&this.canViewExternalWorkforceTab()?this.activeTab="external-workforce":!this.canViewExternalWorkforceTab()&&!this.canViewEmployeesAnalysisTab()&&(this.activeTab="employees-list");const t=document.getElementById("employees-content");t&&(t.innerHTML=await this.renderList(),this.applyModuleI18n(t),requestAnimationFrame(()=>{this.setupEventListeners(),this.canViewEmployeesRegistryTab()&&this.activeTab==="employees-list"?this.loadEmployeesList():this.activeTab==="data-analysis"&&this.canViewEmployeesAnalysisTab()?this.loadEmployeesAnalysis().catch(()=>{}):this.canViewExternalWorkforceTab()&&(this.populateExternalWorkforceYearSelector(),this.ensureExternalWorkforceDataLoaded().then(()=>this.renderExternalWorkforceTable()).catch(()=>{})),this.activeTab==="employees-list"&&this.scrollToSearchField()}))},async editEmployee(t){if(!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641");return}const e=AppState.appData.employees.find(a=>a.id===t);e&&await this.showForm(e)},async printEmployee(t){const e=AppState.appData.employees.find(a=>a.id===t);if(!e){Notification.error("\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show();let a="";const o=this._normalizeEmployeePhotoUrl(e.photo,e.id);if(o&&typeof Utils.resolveDriveAwareImgDisplay=="function"){const p=Utils.resolveDriveAwareImgDisplay(o);if(p.needsProxy&&typeof Utils.fetchDriveImageDataUri=="function")try{a=await Utils.fetchDriveImageDataUri(p.proxyFileId)||""}catch{a=""}a||(a=p.canonical||o)}else o&&(a=o);const i=this.formatDateSafe(e.birthDate),r=this.formatDateSafe(e.hireDate),s=this.calculateAge(e.birthDate),c=p=>{if(!p)return"-";try{const y=new Date(p),g=y.getFullYear(),f=y.getMonth()+1,w=y.getDate(),S=["\u0660","\u0661","\u0662","\u0663","\u0664","\u0665","\u0666","\u0667","\u0668","\u0669"],k=$=>String($).split("").map(D=>S[parseInt(D)]||D).join("");return`${k(g)}/${k(f)}/${k(w)}`}catch{return p}},m=new Date,l=c(m.toISOString().split("T")[0]),n=m.toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}),d=AppState?.companySettings?.name||AppState?.appData?.companyName||"\u0627\u0644\u0634\u0631\u0643\u0629",h=`
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
                        <div class="company-name">${Utils.escapeHTML(d)}</div>
                        <div class="card-title">\u0628\u0637\u0627\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641</div>
                        <div class="header-line"></div>
                    </div>
                    <div class="employee-photo">
                        ${a?`<img src="${Utils.escapeHTML(a)}" alt="${Utils.escapeHTML(e.name||"")}"
                                     onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'employee-photo-placeholder\\'><svg viewBox=\\'0 0 24 24\\' xmlns=\\'http://www.w3.org/2000/svg\\'><path d=\\'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\\'/></svg></div>';">`:`<div class="employee-photo-placeholder">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>`}
                    </div>
                    <div class="employee-details">
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</div>
                            <div class="detail-value">${Utils.escapeHTML(e.employeeNumber||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644</div>
                            <div class="detail-value">${Utils.escapeHTML(e.name||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</div>
                            <div class="detail-value">${Utils.escapeHTML(e.position||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0642\u0633\u0645</div>
                            <div class="detail-value">${Utils.escapeHTML(e.department||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F</div>
                            <div class="detail-value">${c(i)}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u064A\u0629</div>
                            <div class="detail-value">${Utils.escapeHTML(e.nationalId||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646</div>
                            <div class="detail-value">${c(r)}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0633\u0646</div>
                            <div class="detail-value">${s?s+" \u0633\u0646\u0629":"-"}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641</div>
                            <div class="detail-value">${Utils.escapeHTML(e.phone||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0646\u0648\u0639</div>
                            <div class="detail-value">${Utils.escapeHTML(e.gender==="\u0630\u0643\u0631"?"Male":e.gender==="\u0623\u0646\u062B\u0649"?"Female":e.gender||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</div>
                            <div class="detail-value">${Utils.escapeHTML(e.email||"-")}</div>
                        </div>
                        <div class="detail-field">
                            <div class="detail-label">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A</div>
                            <div class="detail-value">${Utils.escapeHTML(e.insuranceNumber||"-")}</div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="footer-text">\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u062A\u0645 \u0625\u0646\u0634\u0627\u0624\u0647 \u0622\u0644\u064A\u0627\u064B \u0645\u0646 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629</div>
                        <div class="print-date">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ${l} - ${n}</div>
                    </div>
                </div>
            `,v=`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u0628\u0637\u0627\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641 - ${Utils.escapeHTML(e.name||"")}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    ${h}
</head>
<body>
    ${h}
</body>
</html>`,x=new Blob([v],{type:"text/html;charset=utf-8"}),b=URL.createObjectURL(x),u=window.open(b,"_blank");u?u.onload=()=>{const p=u.document.querySelectorAll("img");let y=0;const g=p.length;if(g===0)setTimeout(()=>{u.print(),setTimeout(()=>{URL.revokeObjectURL(b),Loading.hide()},800)},300);else{const f=()=>{y>=g&&setTimeout(()=>{u.print(),setTimeout(()=>{URL.revokeObjectURL(b),Loading.hide()},800)},300)};p.forEach(w=>{w.complete?(y++,f()):(w.onload=()=>{y++,f()},w.onerror=()=>{y++,f()})}),setTimeout(()=>{y<g&&(u.print(),setTimeout(()=>{URL.revokeObjectURL(b),Loading.hide()},800))},3e3)}}:(URL.revokeObjectURL(b),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+a.message)}},async viewEmployee(t){const e=AppState.appData.employees.find(s=>s.id===t);if(!e)return;const a=this.formatDateSafe(e.birthDate),o=this.formatDateSafe(e.hireDate),i=this.calculateAge(e.birthDate),r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
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
                            ${(()=>{const s=this._normalizeEmployeePhotoUrl(e.photo,e.id);if(!s)return'<div class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto"><i class="fas fa-user text-5xl text-gray-400"></i></div>';const c=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(s):{canonical:s,displaySrc:s,needsProxy:!1,proxyFileId:""},m=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(c):"";return`<img src="${Utils.escapeHTML(c.displaySrc)}" alt="${Utils.escapeHTML(e.name||"")}"${m} class="emp-detail-photo w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200">`})()}
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.fullName","\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.name||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.employeeNumber","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(e.employeeNumber||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.department||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.position||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.nationalId","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.nationalId||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.birthDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F")}:</label>
                                <p class="text-gray-800">${a||""}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.age","\u0627\u0644\u0633\u0646")}:</label>
                                <p class="text-gray-800">${i?i+" "+this.t("module.common.yearsUnit","\u0633\u0646\u0629"):""}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.hireDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646")}:</label>
                                <p class="text-gray-800">${o||""}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.gender||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.phone","\u0627\u0644\u0647\u0627\u062A\u0641")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.phone||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.table.insuranceNo","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.insuranceNumber||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${this.t("module.employees.email","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A")}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.email||"")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${this.t("module.common.close","\u0625\u063A\u0644\u0627\u0642")}</button>
                    <button class="btn-secondary" onclick="Employees.printEmployee('${e.id}')">
                        <i class="fas fa-print ml-2"></i>${this.t("module.common.print","\u0637\u0628\u0627\u0639\u0629")}
                    </button>
                    ${Employees.canEditOrDelete()?`
                    <button class="btn-primary" onclick="Employees.editEmployee('${e.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>${this.t("module.common.edit","\u062A\u0639\u062F\u064A\u0644")}
                    </button>
                    `:""}
                </div>
            </div>
        `,this.applyModuleI18n(r),document.body.appendChild(r),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(r,{onFetchFail:s=>{try{const c=document.createElement("div");c.className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto",c.innerHTML='<i class="fas fa-user text-5xl text-gray-400"></i>',s.replaceWith(c)}catch{}}}),r.addEventListener("click",s=>{s.target===r&&r.remove()})},async deactivateEmployee(t){if(!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641");return}const e=AppState.appData.employees.find(a=>a.id===t);if(!e){Notification.error("\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 "${e.name}"\u061F
\u0633\u064A\u062A\u0645 \u0625\u062E\u0641\u0627\u0624\u0647 \u0645\u0646 \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0648\u0644\u0643\u0646 \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0628\u064A\u0627\u0646\u0627\u062A\u0647 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645.`)){Loading.show();try{const a=AppState.appData.employees.findIndex(i=>i.id===t);a!==-1&&(AppState.appData.employees[a].status="inactive",AppState.appData.employees[a].resignationDate=this.normalizeDateOnly(new Date),AppState.appData.employees[a].updatedAt=new Date().toISOString()),setTimeout(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},50),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),this.renderStatsCards();const o=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(o),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(i){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",i)}}),AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendToAppsScript("deactivateEmployee",{employeeId:t}).then(i=>{!i||!i.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0646 Google Sheets:",i?.message):Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}).catch(i=>Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",i))}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+a.message)}}},async deleteEmployee(t){if(!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0638\u0641");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641 \u0646\u0647\u0627\u0626\u064A\u0627\u064B\u061F
\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627!`)){Loading.show();try{AppState.appData.employees=(AppState.appData.employees||[]).filter(a=>a.id!==t),setTimeout(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},50),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),this.renderStatsCards();const e=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(e),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(a){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",a)}}),AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendToAppsScript("deleteEmployee",{employeeId:t}).then(a=>{!a||!a.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641 \u0645\u0646 Google Sheets:",a?.message):Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u062D\u0630\u0641 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}).catch(a=>Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062D\u0630\u0641 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",a))}catch(e){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+e.message)}}},scrollToSearchField(){setTimeout(()=>{const t=document.getElementById("employees-search");if(t){const e=window.scrollY||document.documentElement.scrollTop,a=Math.max(0,(t.offsetTop||0)-20),o=e+window.innerHeight;(a<e||a>o-100)&&window.scrollTo({top:a,behavior:"smooth"})}},0)},getFilterValues(){return{search:document.getElementById("employees-search-filter")?.value||document.getElementById("employees-search")?.value||"",department:document.getElementById("employee-filter-department")?.value||"",branch:document.getElementById("employee-filter-branch")?.value||"",location:document.getElementById("employee-filter-location")?.value||"",job:document.getElementById("employee-filter-job")?.value||"",position:document.getElementById("employee-filter-position")?.value||"",gender:document.getElementById("employee-filter-gender")?.value||"",showInactive:document.getElementById("show-inactive-employees")?.checked||!1}},async filterEmployees(t="",e=!1,a=null){try{if(a)e=a.showInactive!==void 0&&a.showInactive!==null?a.showInactive:e;else{const n=this.getFilterValues();t=t||n.search,e=e??(n.showInactive||!1),a=n,a.showInactive=e}const o=document.getElementById("employees-table-container");if(!o){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F employees-table-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let i=o.querySelector("tbody");if(!i&&(await this.loadEmployeesList(e),i=o.querySelector("tbody"),!i)){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F tbody \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0628\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629");return}let r=AppState.appData.employees||[];e||(r=r.filter(n=>!this.isEmployeeInactive(n)));let s=r;const c=this.canEditOrDelete();if(t&&t.trim()){const n=t.trim().toLowerCase();s=s.filter(d=>d.name&&d.name.toLowerCase().includes(n)||d.employeeNumber&&String(d.employeeNumber).toLowerCase().includes(n)||d.sapId&&String(d.sapId).toLowerCase().includes(n)||d.department&&d.department.toLowerCase().includes(n)||d.position&&d.position.toLowerCase().includes(n)||d.job&&d.job.toLowerCase().includes(n)||d.branch&&d.branch.toLowerCase().includes(n)||d.location&&d.location.toLowerCase().includes(n)||d.nationalId&&d.nationalId.toLowerCase().includes(n)||d.phone&&d.phone.toLowerCase().includes(n)||d.insuranceNumber&&d.insuranceNumber.toLowerCase().includes(n)||d.email&&d.email.toLowerCase().includes(n)||d.gender&&d.gender.toLowerCase().includes(n))}a.department&&(s=s.filter(n=>String(n.department||"").trim()===String(a.department).trim())),a.branch&&(s=s.filter(n=>String(n.branch||"").trim()===String(a.branch).trim())),a.location&&(s=s.filter(n=>String(n.location||"").trim()===String(a.location).trim())),a.job&&(s=s.filter(n=>String(n.job||"").trim()===String(a.job).trim())),a.position&&(s=s.filter(n=>String(n.position||"").trim()===String(a.position).trim())),a.gender&&(s=s.filter(n=>String(n.gender||"").trim()===String(a.gender).trim()));const m=document.createDocumentFragment(),l=13;if(s.length===0){const n=document.createElement("tr");n.innerHTML=`<td colspan="${l}" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C</td>`,m.appendChild(n)}else s.forEach(n=>{const d=this.formatDateSafe(n.birthDate),h=this.formatDateSafe(n.hireDate),v=this.calculateAge(n.birthDate),x=this.isEmployeeInactive(n),b=x?"opacity: 0.7; background-color: #f8f9fa;":"",u=document.createElement("tr");x&&(u.style.cssText=b);const p=this._normalizeEmployeePhotoUrl(n.photo,n.id),g=(this._getDriveIdFromUrl(n.photo||"")||n.id||n.employeeNumber||n.name||"").toString(),f=p&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(p):{canonical:p||"",displaySrc:p||"",needsProxy:!1,proxyFileId:""},w=f.canonical?f.displaySrc:"",S=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(f):"";u.innerHTML=`
                    <td style="word-wrap: break-word;">
                        ${p?`<img data-emp-photo="1" data-photo-key="${Utils.escapeHTML(g)}" src="${Utils.escapeHTML(w)}" alt="${Utils.escapeHTML(n.name||"")}"${S} class="w-12 h-12 rounded-full object-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer">`:'<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>'}
                    </td>
                    <td style="word-wrap: break-word; white-space: normal;">
                        ${Utils.escapeHTML(n.employeeNumber||"")}
                        ${x?'<span class="badge badge-warning ml-2" style="font-size: 10px; padding: 2px 6px;">\u063A\u064A\u0631 \u0646\u0634\u0637</span>':""}
                    </td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px;">
                        ${Utils.escapeHTML(n.name||"")}
                        ${x&&n.resignationDate?`<br><span class="text-xs text-gray-500" style="font-size: 11px;">\u0627\u0633\u062A\u0642\u0627\u0644: ${this.formatDateSafe(n.resignationDate)}</span>`:""}
                    </td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(n.department||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(n.job||n.position||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(n.nationalId||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${d||""}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${v?v+" \u0633\u0646\u0629":""}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${h||""}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(n.gender||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(n.phone||"")}</td>
                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(n.insuranceNumber||"")}</td>
                    ${c?`
                    <td style="min-width: 150px;">
                        <div class="flex items-center gap-2 flex-wrap">
                            <button onclick="Employees.viewEmployee('${n.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="Employees.editEmployee('${n.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="Employees.deactivateEmployee('${n.id}')" class="btn-icon btn-icon-danger" title="\u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644">
                                <i class="fas fa-user-slash"></i>
                            </button>
                        </div>
                    </td>
                    `:`
                    <td>
                        <span class="text-gray-400 text-sm">\u2014</span>
                    </td>
                    `}
                `,m.appendChild(u)});i.innerHTML="",i.appendChild(m),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(i,{onFetchFail:n=>{try{const d=(n.dataset.photoKey||"").trim();d&&sessionStorage.setItem(this._photoFailKey(d),Date.now().toString())}catch{}try{const d=n.parentElement;d&&(d.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}}}),this.updateFilterBadges(r,s,a),AppState.debugMode&&t&&Utils.safeLog(`\u{1F50D} \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0628\u062D\u062B: ${s.length} \u0645\u0646 ${r.length} \u0645\u0648\u0638\u0641`)}catch(o){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A filterEmployees:",o)}},updateFilterBadges(t,e,a){try{if(!a){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F updateFilterBadges: filters \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const o=(i,r,s)=>{try{const c=document.getElementById(i);if(!c){AppState.debugMode&&r&&Utils.safeWarn(`\u26A0\uFE0F updateFilterLabel: ${i} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F`);return}const m=c.closest(".filter-field");if(!m){AppState.debugMode&&r&&Utils.safeWarn(`\u26A0\uFE0F updateFilterLabel: filter-field \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0644\u0640 ${i}`);return}const l=m.querySelector(".filter-label");if(!l){AppState.debugMode&&r&&Utils.safeWarn(`\u26A0\uFE0F updateFilterLabel: filter-label \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0644\u0640 ${i}`);return}const n=l.querySelector(".filter-count-badge");if(n&&n.remove(),r&&r.trim()!==""){const d=document.createElement("span");d.className="filter-count-badge",d.title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629",d.textContent=s;const h=l.querySelector("i");h?h.insertAdjacentElement("afterend",d):l.insertBefore(d,l.firstChild),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0634\u0627\u0631\u0629 \u0627\u0644\u0639\u062F\u062F (${s}) \u0644\u0640 ${i}`)}}catch(c){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0634\u0627\u0631\u0629 \u0627\u0644\u0641\u0644\u062A\u0631:",c)}};if(a.department?o("employee-filter-department",a.department,e.length):o("employee-filter-department","",0),a.branch?o("employee-filter-branch",a.branch,e.length):o("employee-filter-branch","",0),a.location?o("employee-filter-location",a.location,e.length):o("employee-filter-location","",0),a.job?o("employee-filter-job",a.job,e.length):o("employee-filter-job","",0),a.position?o("employee-filter-position",a.position,e.length):o("employee-filter-position","",0),a.gender?o("employee-filter-gender",a.gender,e.length):o("employee-filter-gender","",0),a.search&&a.search.trim())try{const i=document.getElementById("employees-search-filter")||document.getElementById("employees-search");if(i){const r=i.closest(".filter-field");if(r){const s=r.querySelector(".filter-label");if(s){const c=s.querySelector(".filter-count-badge");c&&c.remove();const m=document.createElement("span");m.className="filter-count-badge",m.title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629",m.textContent=e.length;const l=s.querySelector("i");l?l.insertAdjacentElement("afterend",m):s.insertBefore(m,s.firstChild)}}}}catch(i){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0634\u0627\u0631\u0629 \u0627\u0644\u0628\u062D\u062B:",i)}else try{const i=document.getElementById("employees-search-filter")||document.getElementById("employees-search");if(i){const r=i.closest(".filter-field");if(r){const s=r.querySelector(".filter-label");if(s){const c=s.querySelector(".filter-count-badge");c&&c.remove()}}}}catch(i){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0634\u0627\u0631\u0629 \u0627\u0644\u0628\u062D\u062B:",i)}}catch(o){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A updateFilterBadges:",o)}},async applyFilters(){try{const t=this.getFilterValues();await this.filterEmployees(t.search,t.showInactive,t),this.updateInactiveCount()}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A applyFilters:",t)}finally{this.updateInactiveCount()}},async resetFilters(){const t=document.getElementById("employees-search"),e=document.getElementById("employees-search-filter");t&&(t.value=""),e&&(e.value=""),["employee-filter-department","employee-filter-branch","employee-filter-location","employee-filter-job","employee-filter-position","employee-filter-gender"].forEach(r=>{const s=document.getElementById(r);s&&(s.value="")});const o=document.getElementById("show-inactive-employees");o&&(o.checked=!1);const i=document.getElementById("show-inactive-employees-container");i&&(i.style.background="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",i.style.borderColor="#dee2e6",i.style.boxShadow="none"),await this.applyFilters(),this.updateInactiveCount()},updateInactiveCount(t=0){const o=()=>{try{const r=(AppState.appData.employees||[]).filter(c=>this.isEmployeeInactive(c)).length,s=document.getElementById("inactive-employees-count");if(s){s.textContent=r;const c=r===0,m=c?"#6b7280":"#dc2626",l=c?"0 2px 4px rgba(107, 114, 128, 0.3)":"0 2px 4px rgba(220, 38, 38, 0.3)";s.style.cssText=`
                        display: inline-flex !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        align-items: center;
                        justify-content: center;
                        min-width: 24px;
                        height: 22px;
                        padding: 0 8px;
                        background: ${m};
                        color: white;
                        border-radius: 11px;
                        font-size: 11px;
                        font-weight: 700;
                        margin-right: 4px;
                        box-shadow: ${l};
                        transition: all 0.3s ease;
                    `;const n=document.getElementById("show-inactive-employees");n&&n.checked&&!c?(s.style.background="linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",s.style.boxShadow="0 2px 6px rgba(220, 38, 38, 0.4)",s.style.transform="scale(1.1)"):s.style.transform="scale(1)",AppState.debugMode&&Utils.safeLog(`\u{1F4CA} \u0639\u062F\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646: ${r}`)}else t<3?(AppState.debugMode&&Utils.safeLog(`\u23F3 \u0627\u0644\u0639\u0646\u0635\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u060C \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 ${t+1}/3...`),setTimeout(()=>{this.updateInactiveCount(t+1)},100)):AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0639\u0646\u0635\u0631 \u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646 \u0628\u0639\u062F \u0639\u062F\u0629 \u0645\u062D\u0627\u0648\u0644\u0627\u062A")}catch(i){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u062F\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646:",i)}};t===0?requestAnimationFrame(o):o()},async init(){try{AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0?(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 (${this.cache.data.length} \u0645\u0648\u0638\u0641)`)):await this.ensureEmployeesLoaded(),this.startBackgroundUpdate()}catch(t){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",t)}}};Employees.getExternalWorkforceExportHeaderInfo=function(t,e=new Date){const a=String(AppState?.companySettings?.name||AppState?.companyName||"SafetyHub | ICAPP").trim(),o=String(AppState?.companySettings?.secondaryName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629").trim(),i=typeof Utils<"u"&&typeof Utils.formatDateTime=="function"?Utils.formatDateTime(e):new Date(e).toISOString().slice(0,19).replace("T"," ");return{companyName:a,secondaryName:o,reportTitle:t,exportDateTime:i}},Employees.buildExternalWorkforceExcelWorksheet=function(t,e,a,o=new Date){const i=this.getExternalWorkforceExportHeaderInfo(a,o),r=[t,...e],s=Math.max(...r.map(l=>Array.isArray(l)?l.length:0),1),c=[[i.companyName],[i.secondaryName],[i.reportTitle],[`Generated: ${i.exportDateTime}`],[],...r],m=XLSX.utils.aoa_to_sheet(c);return m["!merges"]=[{s:{r:0,c:0},e:{r:0,c:s-1}},{s:{r:1,c:0},e:{r:1,c:s-1}},{s:{r:2,c:0},e:{r:2,c:s-1}},{s:{r:3,c:0},e:{r:3,c:s-1}}],m["!cols"]=[{wch:28},{wch:14}].concat(new Array(Math.max(s-3,0)).fill({wch:14}),[{wch:16}]),m},Employees.exportExternalWorkforceToExcel=function(){if(typeof XLSX>"u"){Notification.error("XLSX library is not available");return}const{model:t,header:e,rows:a}=this.getExternalWorkforceExportRows(),o=`${this.getExternalWorkforceViewState().labels.externalTab} - ${t.year}`,i=XLSX.utils.book_new(),r=this.buildExternalWorkforceExcelWorksheet(e,a,o,new Date);XLSX.utils.book_append_sheet(i,r,"External Workforce"),XLSX.writeFile(i,`external_workforce_${t.year}_${new Date().toISOString().slice(0,10)}.xlsx`)},Employees.exportExternalWorkforceToPDF=function(){const{model:t,header:e,rows:a}=this.getExternalWorkforceExportRows(),o=this.getExternalWorkforceViewState(),i=`${o.labels.externalTab} - ${t.year}`,r=new Date().toISOString(),s=[e,...a].map((h,v)=>`
        <tr>
            ${h.map(x=>`<${v===0?"th":"td"}>${Utils.escapeHTML(String(x??""))}</${v===0?"th":"td"}>`).join("")}
        </tr>
    `).join(""),c=`
        <style>
            .external-workforce-report {
                direction: ${o.dir};
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
                direction: ${o.dir};
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
        <div class="external-workforce-report" dir="${o.dir}" lang="${o.lang}">
            <div class="external-workforce-report__meta">
                <div><strong>${Utils.escapeHTML(o.labels.year)}:</strong> ${Utils.escapeHTML(String(t.year))}</div>
                <div><strong>${Utils.escapeHTML(o.labels.externalTab)}</strong></div>
                <div><strong>${Utils.escapeHTML(o.labels.totalHoursYtd||"YTD Hours")}:</strong> ${Utils.escapeHTML(String(t.hoursYtd||0))}</div>
            </div>
            <table class="external-workforce-report__table">${s}</table>
        </div>
    `,m=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(`EXT-WORKFORCE-${t.year}`,i,c,!1,!0,{version:"1.0",releaseDate:r,revisionDate:r,includeQRCode:!0},r,r):`<!DOCTYPE html><html lang="${o.lang}" dir="${o.dir}"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(i)}</title></head><body style="font-family:'Cairo','Segoe UI',Tahoma,Arial,sans-serif;direction:${o.dir};padding:20px;">${c}</body></html>`,l=new Blob(["\uFEFF"+m],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(l),d=window.open(n,"_blank");if(!d){URL.revokeObjectURL(n),Notification.error("\u062A\u0639\u0630\u0631 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629");return}d.onload=()=>{setTimeout(()=>{d.print(),setTimeout(()=>URL.revokeObjectURL(n),1e3)},400)}},(function(){"use strict";try{typeof window<"u"&&typeof Employees<"u"&&(window.Employees=Employees,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Employees module loaded and available on window.Employees"),typeof AppState<"u"&&AppState.currentUser&&setTimeout(()=>{window.Employees&&window.Employees.init&&window.Employees.init().catch(t=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",t)})},2e3))}catch{if(typeof window<"u"&&typeof Employees<"u")try{window.Employees=Employees}catch{}}})();
