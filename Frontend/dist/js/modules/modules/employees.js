const Employees={cache:{data:null,lastLoad:null,lastUpdate:null,isUpdating:!1},config:{cacheTimeout:9e5,backgroundUpdateInterval:6e5,backgroundUpdateTimer:null,_refreshedOnceForInactive:!1,listPageSize:100},activeTab:"employees-list",externalWorkforceYear:new Date().getFullYear(),_externalWorkforceLoaded:!1,_externalWorkforceLoadPromise:null,_externalWorkforceCache:new Map,_empAnalyticsCharts:{},_empAnalyticsDetailTab:"department",_empAnalyticsEventsBound:!1,_visibilityResumeBound:!1,_listRowsCache:null,_listVisibleCount:0,_listCanEdit:!1,_employeeStableKey_(e){const t=e&&(e.employeeNumber||e.id||e.sapId)||"";let a=String(t).trim().toLowerCase();return!a||(/^\d+(\.0+)?$/.test(a)&&(a=String(parseInt(a,10))),/^\d{4}-\d{2}-\d{2}/.test(a)||/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(a))?"":a},_normalizeEmployeeLookupKey_(e){let t=String(e??"").trim();return t?(/^\d+(\.0+)?$/.test(t)&&(t=String(parseInt(t,10))),t.toLowerCase()):""},_employeeMatchesLookupId_(e,t){if(!e)return!1;const a=this._normalizeEmployeeLookupKey_(t);if(!a)return!1;const i=[e.id,e.employeeNumber,e.sapId];for(let o=0;o<i.length;o++){const s=this._normalizeEmployeeLookupKey_(i[o]);if(s&&s===a)return!0}return!1},_findEmployeeById_(e){return(AppState.appData.employees||[]).find(a=>this._employeeMatchesLookupId_(a,e))||null},_findEmployeeIndexById_(e){return(AppState.appData.employees||[]).findIndex(a=>this._employeeMatchesLookupId_(a,e))},_employeeActionId_(e){const t=e&&(e.id||e.employeeNumber||e.sapId)||"";return String(t).replace(/\\/g,"\\\\").replace(/'/g,"\\'")},_employeeDisplayName_(e){return!e||typeof e!="object"?"":String(e.name||e.employeeName||e.fullName||"").replace(/\s+/g," ").trim()},normalizeArabic(e){return e==null?"":String(e).replace(/[\u064B-\u065F\u0670]/g,"").replace(/[أإآ]/g,"\u0627").replace(/ى/g,"\u064A").replace(/ة/g,"\u0647").toLowerCase().trim()},_countNamedEmployees_(e){const t=Array.isArray(e)?e:[];let a=0;for(let i=0;i<t.length;i++)this._employeeDisplayName_(t[i])&&a++;return a},mergeEmployeesPreservingNames_(e,t){const a=Array.isArray(e)?e:[],i=Array.isArray(t)?t:[];if(a.length===0&&i.length>0)return i.slice();const o=new Map;for(let r=0;r<i.length;r++){const c=i[r],p=this._employeeStableKey_(c);p&&o.set(p,c)}const s=a.map(r=>{if(!r||typeof r!="object")return r;const c=this._employeeStableKey_(r),p=c?o.get(c):null,d=this._employeeDisplayName_(r);if(d)return String(r.name||"").trim()===d?r:Object.assign({},r,{name:d});if(p){const m=this._employeeDisplayName_(p);if(m)return Object.assign({},r,{name:m})}return r}),n=this._countNamedEmployees_(s);return this._countNamedEmployees_(i)>0&&n===0&&i.length>0?i.slice():s},applyEmployeesData_(e){const t=AppState.appData&&Array.isArray(AppState.appData.employees)?AppState.appData.employees:[],a=Array.isArray(e)?e.map(s=>this.sanitizeEmployeeRecordDrift_({...s||{}})):e,i=this.mergeEmployeesPreservingNames_(a,t);if((!i||i.length===0)&&t.length>0)return this.cache.data=t,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),t;const o=(i||[]).map(s=>this.sanitizeEmployeeRecordDrift_(s));return AppState.appData=AppState.appData||{},AppState.appData.employees=o,this.cache.data=o,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),o},_ensureVisibilityResumeBound_(){this._visibilityResumeBound||(this._visibilityResumeBound=!0,document.addEventListener("visibilitychange",()=>{try{if(document.hidden){const t=AppState.appData&&AppState.appData.employees||[];(!t.length||this._countNamedEmployees_(t)===0||!this.cache.lastLoad)&&!this.cache.isUpdating&&this.loadEmployeesFromBackend(!1);return}if(!(AppState.currentSection==="employees"||!!document.getElementById("employees-table-container")||!!document.getElementById("employees-section")))return;(async()=>{try{if((AppState.appData.employees||[]).length>0&&this.activeTab==="employees-list"){const t=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(t),this.renderStatsCards(),typeof StableLoader<"u"&&StableLoader.markPaint("employees","employees-list",{count:(AppState.appData.employees||[]).length})}if(await this.ensureEmployeesLoaded(!1),this.activeTab==="employees-list"&&document.getElementById("employees-table-container")){const t=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(t)}this.renderStatsCards()}catch{}})()}catch{}}))},_getI18nCore(){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null},t(e,t){const a=this._getI18nCore();return a?a.t(e,null,t||e):t||e},applyModuleI18n(e){const t=this._getI18nCore();if(!t)return;const a=e||document.getElementById("employees-section")||document;typeof t.applyI18n=="function"&&t.applyI18n(a),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(a)},_photoFailKey(e){return`hse_emp_photo_failed_${String(e||"").trim()}`},_getDriveIdFromUrl(e){try{const t=String(e||"").trim();if(!t)return"";const a=t.match(/[?&]id=([^&]+)/)||t.match(/\/file\/d\/([^/]+)/);return a?String(a[1]||"").trim():""}catch{return""}},_normalizeEmployeePhotoUrl(e,t=""){try{const a=typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?String(Utils.extractImageSourceCandidate(e)||"").trim():String(e||"").trim();if(!a)return"";let i=a;typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"?i=Utils.normalizeImageSource(a)||a:typeof window<"u"&&typeof window.__convertGoogleDriveUrl=="function"&&(i=window.__convertGoogleDriveUrl(a)||a);const s=this._getDriveIdFromUrl(i)||t||i;return sessionStorage.getItem(this._photoFailKey(s))?"":i}catch{return""}},_setupEmployeePhotoFallbacks(e){try{const a=(e||document).querySelectorAll('img[data-emp-photo="1"]');if(!a||a.length===0)return;a.forEach(i=>{if(!i||i.dataset._fallbackBound==="1")return;i.dataset._fallbackBound="1";const o=(i.dataset.photoKey||"").trim();i.addEventListener("error",()=>{try{o&&sessionStorage.setItem(this._photoFailKey(o),Date.now().toString())}catch{}try{const s=i.parentElement;s&&(s.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}},{passive:!0})})}catch{}},canEditOrDelete(){const e=AppState.currentUser;return e?(e.role||"").toLowerCase()==="admin":!1},canAddOrImport(){const e=AppState.currentUser;return e?(e.role||"").toLowerCase()==="admin":!1},getEmployeesDetailedPermissionsState(){try{if(typeof Permissions<"u"&&typeof Permissions.getEffectivePermissions=="function"){const a=Permissions.getEffectivePermissions()?.employeesPermissions;if(a&&typeof a=="object"&&!Array.isArray(a))return a}}catch{}const e=AppState.currentUser?.permissions?.employeesPermissions;return e&&typeof e=="object"&&!Array.isArray(e)?e:null},canViewEmployeesRegistryTab(){if(this.canAddOrImport())return!0;if(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("employees"))return!1;const e=this.getEmployeesDetailedPermissionsState();return e?e["employees-list"]!==!1:!0},canViewExternalWorkforceTab(){if(this.canAddOrImport())return!0;if(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("employees"))return!1;const e=this.getEmployeesDetailedPermissionsState();return e?e["external-workforce"]===!0:!0},canViewEmployeesAnalysisTab(){if(this.canAddOrImport())return!0;if(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("employees"))return!1;const e=this.getEmployeesDetailedPermissionsState();return e?e["data-analysis"]!==!1:!0},canManageExternalWorkforceTab(){return this.canAddOrImport()},isValidDate(e){if(!e)return!1;try{const t=new Date(e);return t instanceof Date&&!isNaN(t.getTime())}catch{return!1}},normalizeDateOnly(e){if(e==null||e==="")return"";if(e instanceof Date&&!isNaN(e.getTime())){const s=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${s}-${n}-${l}`}if(typeof e=="number"&&isFinite(e))try{if(typeof XLSX<"u"&&XLSX?.SSF?.parse_date_code){const s=XLSX.SSF.parse_date_code(e);if(s&&s.y&&s.m&&s.d){const n=String(s.y).padStart(4,"0"),l=String(s.m).padStart(2,"0"),r=String(s.d).padStart(2,"0");return`${n}-${l}-${r}`}}}catch{}let t=String(e).trim();if(!t)return"";if(t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'")){try{const s=JSON.parse(t);typeof s=="string"?t=s.trim():t=t.substring(1,t.length-1).trim()}catch{t=t.substring(1,t.length-1).trim()}if(!t)return""}const a=t.match(/^(\d{4}-\d{2}-\d{2})/);if(a)return a[1];const i=t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);if(i){const s=String(i[1]).padStart(2,"0"),n=String(i[2]).padStart(2,"0");return`${i[3].length===2?`20${i[3]}`:String(i[3]).padStart(4,"0")}-${n}-${s}`}const o=t.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);if(o){const s=String(o[1]).padStart(4,"0"),n=String(o[2]).padStart(2,"0"),l=String(o[3]).padStart(2,"0");return`${s}-${n}-${l}`}try{const s=new Date(t);if(!isNaN(s.getTime())){const n=s.getFullYear(),l=String(s.getMonth()+1).padStart(2,"0"),r=String(s.getDate()).padStart(2,"0");return`${n}-${l}-${r}`}}catch{}return""},parseLocalDate(e){if(!e)return null;if(e instanceof Date&&!isNaN(e.getTime()))return e;let t=String(e).trim();if(!t)return null;if(t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'")){try{const o=JSON.parse(t);typeof o=="string"?t=o.trim():t=t.substring(1,t.length-1).trim()}catch{t=t.substring(1,t.length-1).trim()}if(!t)return null}const a=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(a){const o=Number(a[1]),s=Number(a[2])-1,n=Number(a[3]),l=new Date(o,s,n);return isNaN(l.getTime())?null:l}const i=new Date(t);return isNaN(i.getTime())?null:i},formatDateSafe(e){return this.normalizeDateOnly(e)},calculateAge(e){if(!e)return"";try{const t=this.parseLocalDate(e);if(!t)return"";const a=new Date;let i=a.getFullYear()-t.getFullYear();const o=a.getMonth()-t.getMonth();return(o<0||o===0&&a.getDate()<t.getDate())&&i--,i>=0?i:""}catch{return""}},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||(clearTimeout(this._langChangeTimer),this._langChangeTimer=setTimeout(()=>{this.load()},150))}),this._languageChangeListenerAdded=!0),typeof Utils>"u")return;if(typeof AppState>"u"){const t=document.getElementById("employees-section");t&&(t.innerHTML=`
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
                        `));if(a.innerHTML=i,this.applyModuleI18n(a),this.setupEventListeners(),this.activeTab==="data-analysis"&&this.canViewEmployeesAnalysisTab())await this.loadEmployeesAnalysis();else if(this.activeTab==="external-workforce"&&this.canViewExternalWorkforceTab())await this.ensureExternalWorkforceDataLoaded(),this.renderExternalWorkforceTable();else if(this.activeTab==="employees-list"&&this.canViewEmployeesRegistryTab()){const o=document.getElementById("employees-table-container");if(Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0)await this.loadEmployeesList(),this.updateEmployeesInBackground();else if(o){o.innerHTML=`
                                <div class="empty-state" style="padding:28px;">
                                    <div style="width: 280px; margin: 0 auto 14px;">
                                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                        </div>
                                    </div>
                                    <p class="text-gray-600">${this.t("module.employees.loadingList","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646...")}</p>
                                </div>`;try{await this._ensureEmployeesLoadedWithTimeout_(!1,25e3)}catch(n){Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u0627\u0621/\u0641\u0634\u0644 \u062C\u0644\u0628 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",n)}document.getElementById("employees-table-container")&&await this.loadEmployeesList()}}else if(this.canViewEmployeesRegistryTab())if(Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0)await this.loadEmployeesList(),this.updateEmployeesInBackground();else{try{await this._ensureEmployeesLoadedWithTimeout_(!1,25e3)}catch{}document.getElementById("employees-table-container")&&await this.loadEmployeesList()}else this.canViewEmployeesAnalysisTab()?await this.loadEmployeesAnalysis():this.canViewExternalWorkforceTab()&&(await this.ensureExternalWorkforceDataLoaded(),this.renderExternalWorkforceTable());setTimeout(async()=>{try{const o=this.getFilterValues();(o.search||o.department||o.branch||o.location||o.job||o.position||o.gender)&&await this.applyFilters()}catch(o){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",o)}},200)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",a)}},0),requestAnimationFrame(()=>{this.activeTab==="employees-list"&&this.scrollToSearchField()}),this.startBackgroundUpdate(),this._ensureVisibilityResumeBound_(),Promise.resolve().then(async()=>{try{if(await this.ensureEmployeesLoaded(!1),this.activeTab==="employees-list"){const a=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(a)}this.renderStatsCards()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",a)}})}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",t),e&&(e.innerHTML=`
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
                `,this.applyModuleI18n(e))}},_isRealResignationDateValue_(e,t){if(e==null||e==="")return!1;if(e instanceof Date&&!isNaN(e.getTime()))return!0;const a=String(e).trim();if(!a||a==="active"||a==="inactive"||a==="\u0646\u0634\u0637"||a==="\u063A\u064A\u0631 \u0646\u0634\u0637")return!1;const i=String(t&&(t.employeeNumber||t.id||t.sapId)||"").trim();if(i&&a===i||/^\d+(\.0+)?$/.test(a)&&a.length>=4&&a.length<=12)return!1;if(/^\d{4}-\d{2}-\d{2}/.test(a)||/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(a)||/^\d{1,2}-\d{1,2}-\d{2,4}/.test(a)||a.indexOf("T")>0&&!isNaN(new Date(a).getTime()))return!0;const o=new Date(a);return!isNaN(o.getTime())},sanitizeEmployeeRecordDrift_(e){if(!e||typeof e!="object")return e;const t=String(e.employeeNumber||"").trim(),a=String(e.status!=null?e.status:"").trim(),i=String(e.resignationDate!=null?e.resignationDate:"").trim(),o=String(e.id!=null?e.id:"").trim(),s=String(e.createdAt!=null?e.createdAt:"").trim(),n=String(e.photo!=null?e.photo:"").trim(),l=r=>r?!!(/^\d{4}-\d{2}-\d{2}/.test(r)||/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(r)||/^\d{1,2}-\d{1,2}-\d{2,4}/.test(r)||r.indexOf("T")>0&&!isNaN(new Date(r).getTime())):!1;return(n==="active"||n==="inactive")&&(e.photo=""),l(a),l(a)?((!e.createdAt||s==="active"||s==="inactive")&&(e.createdAt=a),e.status="active"):a&&a!=="active"&&a!=="inactive"&&a!=="\u0646\u0634\u0637"&&a!=="\u063A\u064A\u0631 \u0646\u0634\u0637"&&(e.status="active"),(s==="active"||s==="inactive")&&(l(o)?e.createdAt=o:l(a)?e.createdAt=a:e.createdAt=""),this._isRealResignationDateValue_(i,e)||(e.resignationDate=""),(t&&l(o)||!o&&t)&&(e.id=t),e},isEmployeeInactive(e){if(!e)return!1;const t=e.status!=null&&e.status!==""?String(e.status).trim():"",a=t.toLowerCase();if(a==="active"||t==="\u0646\u0634\u0637"||a==="true"||t==="1")return!1;const i=e.resignationDate!=null&&e.resignationDate!==""?String(e.resignationDate).trim():"";return!!(i&&this._isRealResignationDateValue_(i,e)||a==="inactive"||t==="\u063A\u064A\u0631 \u0646\u0634\u0637"||a==="false"||t==="0")},calculateStatistics(){const e=AppState.appData.employees||[];if(e.length===0)return{total:0,averageAge:0,genderStats:{male:0,female:0},averageExperience:0,inactiveCount:0};const t=e.filter(u=>!this.isEmployeeInactive(u)),a=t.length;let i=0,o=0;t.forEach(u=>{const v=this.calculateAge(u.birthDate);v&&v>0&&(i+=v,o++)});const s=o>0?Math.round(i/o):0;let n=0,l=0,r=0;const c=u=>{if(!u)return"";let v=String(u).trim().replace(/\s+/g," ").trim();return v=v.replace(/[\u200B-\u200D\uFEFF]/g,""),v},p=u=>{const v=c(u);if(!v)return{isMale:!1,isFemale:!1};const E=v.toLowerCase(),h=v.length===1?v.toUpperCase():"",f=["\u0630\u0643\u0631","male","m","M","\u0630\u0643\u0631 "," \u0630\u0643\u0631"],x=["\u0623\u0646\u062B\u0649","female","f","F","\u0623\u0646\u062B\u0649 "," \u0623\u0646\u062B\u0649"],w=v==="\u0630\u0643\u0631"||E==="male"||h==="M"||f.some(I=>c(I)===v),S=v==="\u0623\u0646\u062B\u0649"||E==="female"||h==="F"||x.some(I=>c(I)===v);return{isMale:w,isFemale:S,normalized:v}};t.forEach(u=>{const v=p(u.gender);v.isMale?n++:v.isFemale?l++:r++}),r>0&&typeof AppState<"u"&&AppState.debugMode&&typeof console<"u";let d=0,m=0;const y=new Date;t.forEach(u=>{if(u.hireDate)try{const v=this.parseLocalDate(u.hireDate);if(v){const E=y.getFullYear()-v.getFullYear(),h=y.getMonth()-v.getMonth(),f=y.getDate()-v.getDate();let x=E;(h<0||h===0&&f<0)&&x--,x>=0&&(d+=x,m++)}}catch{}});const g=m>0?(d/m).toFixed(1):0,b=e.filter(u=>this.isEmployeeInactive(u)).length;return{total:a,averageAge:s,genderStats:{male:n,female:l},averageExperience:parseFloat(g),inactiveCount:b}},ensureEmployeesStatsCardsStyles(){const e="employees-stats-cards-styles-v2";if(document.getElementById(e))return;document.getElementById("employees-stats-cards-styles")?.remove();const a=document.createElement("style");a.id=e,a.textContent=`
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
        `,document.head.appendChild(a)},renderStatsCards(){const e=document.getElementById("employees-stats-cards");if(!e)return;this.ensureEmployeesStatsCardsStyles();const t=this.calculateStatistics();this.updateInactiveCount();const a=[{id:"total",title:this.t("module.employees.stats.totalEmployees","\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),value:t.total,icon:"fas fa-users",accent:"#2563eb",accentLight:"#eff6ff",description:this.t("module.employees.stats.totalEmployeesDesc","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646")},{id:"average-age",title:this.t("module.employees.stats.avgAge","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0633\u0646"),value:t.averageAge>0?`${t.averageAge} ${this.t("module.common.yearsUnit","\u0633\u0646\u0629")}`:this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),icon:"fas fa-birthday-cake",accent:"#16a34a",accentLight:"#f0fdf4",description:this.t("module.employees.stats.avgAgeDesc","\u0645\u062A\u0648\u0633\u0637 \u0639\u0645\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")},{id:"gender",title:this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639"),isGenderCard:!0,maleCount:t.genderStats.male,femaleCount:t.genderStats.female,icon:"fas fa-venus-mars",accent:"#7c3aed",accentLight:"#f5f3ff",description:this.t("module.employees.stats.genderDistDesc","\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639")},{id:"experience",title:this.t("module.employees.stats.avgExperience","\u0645\u062A\u0648\u0633\u0637 \u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629"),value:t.averageExperience>0?`${t.averageExperience} ${this.t("module.common.yearsUnit","\u0633\u0646\u0629")}`:this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),icon:"fas fa-briefcase",accent:"#ea580c",accentLight:"#fff7ed",description:this.t("module.employees.stats.avgExperienceDesc","\u0645\u062A\u0648\u0633\u0637 \u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629 \u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646")}],i=this.t("module.employees.genderMale","\u0630\u0643\u0631"),o=this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649"),s=l=>`
            <div class="employee-stat-card__head">
                <div class="employee-stat-card__icon"><i class="${l.icon}" aria-hidden="true"></i></div>
                <div class="employee-stat-card__meta">
                    <h3 class="employee-stat-card__title">${l.title}</h3>
                    <p class="employee-stat-card__desc">${l.description}</p>
                </div>
            </div>
        `,n=l=>{const r=l.maleCount||0,c=l.femaleCount||0,p=r+c,d=p>0?Math.round(r/p*100):0,m=p>0?100-d:0;return`
                <div class="employee-stat-card employee-stat-card--gender"
                     style="--emp-stat-accent:${l.accent};--emp-stat-accent-light:${l.accentLight};">
                    ${s(l)}
                    ${p>0?`
                        <div class="employee-stat-gender-row">
                            <div class="employee-stat-gender-item employee-stat-gender-item--male" title="${i}: ${r}">
                                <span class="employee-stat-gender-num">${r.toLocaleString("en-US")}</span>
                                <span class="employee-stat-gender-label">${i}</span>
                                <span class="employee-stat-gender-pct">${d}%</span>
                            </div>
                            <div class="employee-stat-gender-item employee-stat-gender-item--female" title="${o}: ${c}">
                                <span class="employee-stat-gender-num">${c.toLocaleString("en-US")}</span>
                                <span class="employee-stat-gender-label">${o}</span>
                                <span class="employee-stat-gender-pct">${m}%</span>
                            </div>
                        </div>
                        <div class="employee-stat-gender-bar" title="${i} ${d}% / ${o} ${m}%">
                            <div class="employee-stat-gender-bar__male" style="width:${d}%"></div>
                            <div class="employee-stat-gender-bar__female" style="width:${m}%"></div>
                        </div>
                    `:`
                        <div class="employee-stat-card__value">${this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D")}</div>
                    `}
                </div>
            `};e.innerHTML=a.map(l=>{if(l.isGenderCard)return n(l);const r=typeof l.value=="number"?l.value.toLocaleString("en-US"):l.value;return`
                <div class="employee-stat-card"
                     style="--emp-stat-accent:${l.accent};--emp-stat-accent-light:${l.accentLight};">
                    ${s(l)}
                    <div class="employee-stat-card__value">${r}</div>
                </div>
            `}).join("")},getExternalWorkforceMonths(){const e=this.getExternalWorkforceViewState(),t=new Intl.DateTimeFormat(e.lang==="en"?"en-US":"ar-EG",{month:"short"});return[{key:"jan",index:0},{key:"feb",index:1},{key:"mar",index:2},{key:"apr",index:3},{key:"may",index:4},{key:"jun",index:5},{key:"jul",index:6},{key:"aug",index:7},{key:"sep",index:8},{key:"oct",index:9},{key:"nov",index:10},{key:"dec",index:11}].map(a=>({...a,label:t.format(new Date(2026,a.index,1))}))},getExternalWorkforceViewState(){const e=typeof I18n<"u"&&typeof I18n.getCurrentLanguage=="function"?I18n.getCurrentLanguage():AppState?.currentLanguage||localStorage.getItem("language")||"ar",t=typeof I18n<"u"&&typeof I18n.isRTL=="function"?I18n.isRTL():e==="ar";return{lang:e,isRTL:t,dir:t?"rtl":"ltr",stickySide:t?"right":"left",textAlign:t?"right":"left",labels:{employeesTab:e==="en"?"Employee Database":"\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",externalTab:e==="en"?"External Workforce / Contractors":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",contractor:e==="en"?"Company / Contractor":"\u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644",noCode:e==="en"?"No code":"\u0628\u062F\u0648\u0646 \u0643\u0648\u062F",total:"Total",externalTotal:e==="en"?"Total External Workforce":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629",directEmployees:e==="en"?"Direct Employees":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062B\u0628\u062A\u0629",combinedTotal:e==="en"?"Combined Total":"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u062A\u0631\u0643",estimatedHours:e==="en"?"Estimated Work Hours":"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629"}}},getExternalWorkforceRecords(){return(!AppState.appData||typeof AppState.appData!="object")&&(AppState.appData={}),Array.isArray(AppState.appData.externalWorkforceMonthly)||(AppState.appData.externalWorkforceMonthly=[]),AppState.appData.externalWorkforceMonthly},getExternalWorkforceYearOptions(){const e=new Set([this.externalWorkforceYear,new Date().getFullYear(),new Date().getFullYear()-1]);return this.getExternalWorkforceRecords().forEach(t=>{const a=Number(t?.year);Number.isFinite(a)&&a>2e3&&e.add(a)}),Array.from(e).sort((t,a)=>a-t)},normalizeExternalWorkforceContractor(e={},t=0){const a=l=>String(l||"").replace(/\s+/g," ").trim(),i=a(e.contractorId||e.id),o=a(e.contractorCode||e.code||e.isoCode),s=a(e.contractorName||e.companyName||e.name||e.company||`Contractor ${t+1}`),n=(o||i||s.toLowerCase()).toLowerCase();return{contractorId:i,contractorCode:o,contractorName:s,stableKey:n}},async ensureExternalWorkforceDataLoaded(e=!1){if(this._externalWorkforceLoaded&&!e)return!0;if(this._externalWorkforceLoadPromise&&!e)return this._externalWorkforceLoadPromise;const t=AppState.appData||(AppState.appData={}),a=[];return(!Array.isArray(t.approvedContractors)||t.approvedContractors.length===0)&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function"&&a.push(GoogleIntegration.readFromSheets("ApprovedContractors",15e3).then(i=>{Array.isArray(i)&&(t.approvedContractors=i)}).catch(()=>{})),(e||!Array.isArray(t.externalWorkforceMonthly)||t.externalWorkforceMonthly.length===0)&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function"&&a.push(GoogleIntegration.readFromSheets("ExternalWorkforceMonthly",15e3).then(i=>{Array.isArray(i)&&(t.externalWorkforceMonthly=i)}).catch(()=>{})),this._externalWorkforceLoadPromise=Promise.allSettled(a).then(()=>(this._externalWorkforceLoaded=!0,!0)).finally(()=>{this._externalWorkforceLoadPromise=null}),this._externalWorkforceLoadPromise},getAvailableContractorsForExternalWorkforce(){let e=[];try{typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"&&(e=Contractors.getAllContractorsForModules()||[])}catch{e=[]}(!Array.isArray(e)||e.length===0)&&(e=(AppState.appData.approvedContractors||[]).filter(a=>a&&a.isActive!=="inactive"&&a.isActive!==!1&&a.isActive!=="false"&&a.isActive!=="FALSE"));const t=new Map;return e.forEach((a,i)=>{const o=this.normalizeExternalWorkforceContractor(a,i);!o.stableKey||t.has(o.stableKey)||t.set(o.stableKey,o)}),Array.from(t.values()).sort((a,i)=>a.contractorName.localeCompare(i.contractorName,"ar"))},getExternalWorkforceRecord(e,t){return this.getExternalWorkforceRecords().find(a=>a&&Number(a.year)===Number(e)&&this.normalizeExternalWorkforceContractor(a).stableKey===t)||null},getExternalWorkforceMonthlyValue(e,t){const a=parseFloat(e?.[t]);return Number.isFinite(a)&&a>=0?a:0},getOperationalEmployeesForMonth(e,t=this.externalWorkforceYear){const a=AppState.appData.employees||[],i=new Date(t,e+1,0,23,59,59,999);return a.filter(o=>{if(!o)return!1;const s=this.parseLocalDate(o.hireDate||o.startDate||o.createdAt),n=this.parseLocalDate(o.resignationDate||o.endDate||o.terminationDate);return!(s&&s>i||n&&n<=i||this.isEmployeeInactive(o)&&!n)}).length},buildExternalWorkforceModel(e=this.externalWorkforceYear){const t=(d=[],m=[])=>{if(!Array.isArray(d)||d.length===0)return"0:0";let y=0;return d.forEach(g=>{const b=m.map(v=>g?.[v]).find(Boolean),u=b?new Date(b):null;u&&!Number.isNaN(u.getTime())&&(y=Math.max(y,u.getTime()))}),`${d.length}:${y}`},a=`external:${e}:${t(this.getExternalWorkforceRecords(),["updatedAt","createdAt"])}:${t(AppState.appData.approvedContractors||[],["updatedAt","createdAt","approvalDate"])}:${t(AppState.appData.employees||[],["updatedAt","createdAt","hireDate","resignationDate"])}`;if(this._externalWorkforceCache.has(a))return this._externalWorkforceCache.get(a);const i=this.getExternalWorkforceMonths(),s=this.getAvailableContractorsForExternalWorkforce().map(d=>{const m=this.getExternalWorkforceRecord(e,d.stableKey)||{},y=i.map(g=>this.getExternalWorkforceMonthlyValue(m,g.key));return{...d,recordId:m.id||`EWM-${e}-${d.stableKey}`,values:y,total:y.reduce((g,b)=>g+b,0)}}),n=i.map((d,m)=>s.reduce((y,g)=>y+(g.values[m]||0),0)),l=i.map(d=>this.getOperationalEmployeesForMonth(d.index,e)),r=i.map((d,m)=>l[m]+n[m]),c=r.map(d=>d*8*22),p={year:e,months:i,rows:s,monthTotals:n,directEmployees:l,combined:r,estimatedHours:c,grandTotal:n.reduce((d,m)=>d+m,0)};return this._externalWorkforceCache.clear(),this._externalWorkforceCache.set(a,p),p},renderExternalWorkforcePanel(){const e=this.canManageExternalWorkforceTab(),t=this.getExternalWorkforceViewState(),a={title:t.lang==="en"?"External Workforce / Contractors":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",description:t.lang==="en"?"Monthly table linked to approved contractors and used automatically in Safety Performance Scorecard to calculate combined headcount and work hours.":"\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.",year:t.lang==="en"?"Year":"\u0627\u0644\u0633\u0646\u0629",admin:t.lang==="en"?"Admin Edit":"\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A",viewOnly:t.lang==="en"?"View Only":"\u0639\u0631\u0636 \u0641\u0642\u0637",exportExcel:t.lang==="en"?"Export Excel":"\u062A\u0635\u062F\u064A\u0631 Excel",exportPdf:t.lang==="en"?"Export PDF":"\u062A\u0635\u062F\u064A\u0631 PDF",importExcel:t.lang==="en"?"Import Excel":"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0643\u0633\u064A\u0644"};return a.title=t.lang==="en"?"External Workforce / Contractors":"\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",a.description=t.lang==="en"?"Monthly table linked to approved contractors and used automatically in Safety Performance Scorecard to calculate combined headcount and work hours.":"\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.",a.year=t.lang==="en"?"Year":"\u0627\u0644\u0633\u0646\u0629",a.admin=t.lang==="en"?"Admin Edit":"\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A",a.viewOnly=t.lang==="en"?"View Only":"\u0639\u0631\u0636 \u0641\u0642\u0637",a.exportExcel=t.lang==="en"?"Export Excel":"\u062A\u0635\u062F\u064A\u0631 Excel",a.exportPdf=t.lang==="en"?"Export PDF":"\u062A\u0635\u062F\u064A\u0631 PDF",a.importExcel=t.lang==="en"?"Import Excel":"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0643\u0633\u064A\u0644",`
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
        `},populateExternalWorkforceYearSelector(){const e=document.getElementById("external-workforce-year");e&&(e.innerHTML=this.getExternalWorkforceYearOptions().map(t=>`<option value="${t}" ${t===this.externalWorkforceYear?"selected":""}>${t}</option>`).join(""))},renderExternalWorkforceSummary(e){const t=document.getElementById("external-workforce-summary");if(!t||!e)return;const a=e.year===new Date().getFullYear()?new Date().getMonth():11,i=e.monthTotals.slice(0,a+1).reduce((r,c)=>r+c,0),o=e.directEmployees.slice(0,a+1).reduce((r,c)=>r+c,0),s=e.combined.slice(0,a+1).reduce((r,c)=>r+c,0),n=e.estimatedHours.slice(0,a+1).reduce((r,c)=>r+c,0),l=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 YTD",value:i,color:"#0ea5e9",icon:"fa-users-viewfinder"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062B\u0628\u062A\u0629 YTD",value:o,color:"#2563eb",icon:"fa-user-check"},{label:"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u062A\u0631\u0643 YTD",value:s,color:"#16a34a",icon:"fa-people-group"},{label:"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629 YTD",value:n.toLocaleString("en-US"),color:"#f59e0b",icon:"fa-clock"}];t.innerHTML=l.map(r=>`
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <div class="text-sm font-semibold text-gray-500">${r.label}</div>
                        <div class="text-3xl font-black mt-3" style="color:${r.color};">${r.value}</div>
                    </div>
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style="background:${r.color};">
                        <i class="fas ${r.icon}"></i>
                    </div>
                </div>
            </div>
        `).join("")},ensureExternalWorkforceToolbar(){const e=document.getElementById("employees-external-panel");if(!e)return;const t=e.querySelector(".card-header"),a=e.querySelector(".card-title"),i=e.querySelector(".card-header p"),o=e.querySelector('label[for="external-workforce-year"]'),s=e.querySelector(".rounded-full"),n=o?.parentElement,l=this.canManageExternalWorkforceTab(),r=this.getExternalWorkforceViewState().labels,c={description:this.getExternalWorkforceViewState().lang==="en"?"Monthly table linked to approved contractors and used automatically in Safety Performance Scorecard to calculate combined headcount and work hours.":"\u062C\u062F\u0648\u0644 \u0634\u0647\u0631\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u062F\u0627\u062E\u0644 Safety Performance Scorecard \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0643\u0644\u064A \u0648\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644.",year:this.getExternalWorkforceViewState().lang==="en"?"Year":"\u0627\u0644\u0633\u0646\u0629",admin:this.getExternalWorkforceViewState().lang==="en"?"Admin Edit":"\u062A\u062D\u0631\u064A\u0631 \u0625\u062F\u0627\u0631\u064A",viewOnly:this.getExternalWorkforceViewState().lang==="en"?"View Only":"\u0639\u0631\u0636 \u0641\u0642\u0637",exportExcel:this.getExternalWorkforceViewState().lang==="en"?"Export Excel":"\u062A\u0635\u062F\u064A\u0631 Excel",exportPdf:this.getExternalWorkforceViewState().lang==="en"?"Export PDF":"\u062A\u0635\u062F\u064A\u0631 PDF",importExcel:this.getExternalWorkforceViewState().lang==="en"?"Import Excel":"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0643\u0633\u064A\u0644"};if(a&&(a.innerHTML=`<i class="fas fa-helmet-safety ml-2"></i>${r.externalTab}`),i&&(i.textContent=c.description),o&&(o.textContent=c.year),s&&(s.textContent=l?c.admin:c.viewOnly),!n)return;let p=document.getElementById("external-workforce-actions");p||(p=document.createElement("div"),p.id="external-workforce-actions",p.className="flex items-center gap-3 flex-wrap",p.innerHTML=`
                <button type="button" id="external-workforce-export-excel-btn" class="btn-secondary">
                    <i class="fas fa-file-excel ml-2"></i>
                    <span></span>
                </button>
                <button type="button" id="external-workforce-export-pdf-btn" class="btn-secondary">
                    <i class="fas fa-file-pdf ml-2"></i>
                    <span></span>
                </button>
                ${l?`
                <button type="button" id="external-workforce-import-excel-btn" class="btn-secondary">
                    <i class="fas fa-file-import ml-2"></i>
                    <span></span>
                </button>
                <input type="file" id="external-workforce-import-input" accept=".xlsx,.xls" style="display:none;">
                `:""}
            `,n.insertBefore(p,n.firstChild));const d=p.querySelector("#external-workforce-export-excel-btn span"),m=p.querySelector("#external-workforce-export-pdf-btn span"),y=p.querySelector("#external-workforce-import-excel-btn span");d&&(d.textContent=c.exportExcel),m&&(m.textContent=c.exportPdf),y&&(y.textContent=c.importExcel)},getExternalWorkforceExportRows(e=this.externalWorkforceYear){const t=this.buildExternalWorkforceModel(e),a=this.getExternalWorkforceViewState().labels,i=[a.contractor,"Code",...t.months.map(s=>s.label),a.total],o=t.rows.map(s=>[s.contractorName,s.contractorCode||s.contractorId||"",...s.values,s.total]);return o.push([a.externalTotal,"",...t.monthTotals,t.grandTotal]),o.push([a.directEmployees,"",...t.directEmployees,t.directEmployees.reduce((s,n)=>s+n,0)]),o.push([a.combinedTotal,"",...t.combined,t.combined.reduce((s,n)=>s+n,0)]),o.push([a.estimatedHours,"",...t.estimatedHours,t.estimatedHours.reduce((s,n)=>s+n,0)]),{model:t,header:i,rows:o}},exportExternalWorkforceToExcel(){return Employees.exportExternalWorkforceToExcel.call(this)},exportExternalWorkforceToPDF(){return Employees.exportExternalWorkforceToPDF.call(this)},async importExternalWorkforceExcelFile(e){if(!(!e||!this.canManageExternalWorkforceTab())){if(typeof XLSX>"u"){Notification.error("XLSX library is not available");return}Loading.show();try{const t=await e.arrayBuffer(),a=XLSX.read(t,{type:"array",cellDates:!0}),i=a.Sheets[a.SheetNames[0]],o=XLSX.utils.sheet_to_json(i,{header:1,defval:"",raw:!1});if(!Array.isArray(o)||o.length<2)throw new Error("File is empty");const s=o[0].map(b=>String(b||"").trim().toLowerCase()),n=this.getAvailableContractorsForExternalWorkforce(),l=Number(this.externalWorkforceYear),r={jan:0,january:0,feb:1,february:1,mar:2,march:2,apr:3,april:3,may:4,jun:5,june:5,jul:6,july:6,aug:7,august:7,sep:8,sept:8,september:8,oct:9,october:9,nov:10,november:10,dec:11,december:11,\u064A\u0646\u0627\u064A\u0631:0,\u0641\u0628\u0631\u0627\u064A\u0631:1,\u0645\u0627\u0631\u0633:2,\u0623\u0628\u0631\u064A\u0644:3,\u0627\u0628\u0631\u064A\u0644:3,\u0645\u0627\u064A\u0648:4,\u064A\u0648\u0646\u064A\u0648:5,\u064A\u0648\u0644\u064A\u0648:6,\u0623\u063A\u0633\u0637\u0633:7,\u0627\u063A\u0633\u0637\u0633:7,\u0633\u0628\u062A\u0645\u0628\u0631:8,\u0623\u0643\u062A\u0648\u0628\u0631:9,\u0627\u0643\u062A\u0648\u0628\u0631:9,\u0646\u0648\u0641\u0645\u0628\u0631:10,\u062F\u064A\u0633\u0645\u0628\u0631:11},c=this.getExternalWorkforceMonths().map(b=>b.key),p=s.findIndex(b=>b.includes("contractor")||b.includes("company")||b.includes("\u0627\u0644\u0634\u0631\u0643\u0629")||b.includes("\u0627\u0644\u0645\u0642\u0627\u0648\u0644")),d=s.findIndex(b=>b==="code"||b.includes("contractor code")||b.includes("\u0627\u0644\u0643\u0648\u062F")),m={};s.forEach((b,u)=>{const v=b.replace(/\./g,"").trim();r[v]!==void 0&&(m[c[r[v]]]=u)});const y=this.getExternalWorkforceRecords();let g=0;o.slice(1).forEach(b=>{const u=p>=0?String(b[p]||"").trim():"",v=d>=0?String(b[d]||"").trim():"";if(!u&&!v)return;const E=n.find(f=>v&&(f.contractorCode||"").trim().toLowerCase()===v.toLowerCase()||u&&f.contractorName.trim().toLowerCase()===u.toLowerCase());if(!E)return;let h=this.getExternalWorkforceRecord(l,E.stableKey);h||(h={id:`EWM-${l}-${E.stableKey}`,year:l,contractorId:E.contractorId||"",contractorCode:E.contractorCode||"",contractorName:E.contractorName||"",createdAt:new Date().toISOString()},y.push(h)),c.forEach(f=>{const x=m[f];x!==void 0&&(h[f]=Math.max(0,parseInt(b[x]||"0",10)||0))}),h.total=c.reduce((f,x)=>f+(parseInt(h[x]||"0",10)||0),0),h.updatedAt=new Date().toISOString(),h.updatedBy=AppState.currentUser?.name||AppState.currentUser?.email||"admin",g+=1}),this._externalWorkforceCache.clear(),this.renderExternalWorkforceTable(),typeof DataManager<"u"&&typeof DataManager.save=="function"&&DataManager.save(),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.autoSave=="function"&&await GoogleIntegration.autoSave("ExternalWorkforceMonthly",y).catch(()=>{}),window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{externalWorkforce:!0,year:l}})),Notification.success(`Imported ${g} rows successfully`)}catch(t){Notification.error(`Failed to import file: ${t.message}`)}finally{Loading.hide()}}},renderExternalWorkforceTable(){const e=document.getElementById("external-workforce-table-container");if(!e)return;const t=this.buildExternalWorkforceModel(this.externalWorkforceYear),a=this.getExternalWorkforceViewState(),{dir:i,stickySide:o,textAlign:s,labels:n}=a;this.renderExternalWorkforceSummary(t);const l=this.canManageExternalWorkforceTab(),r=t.months.map(f=>`<th style="min-width: 74px;">${f.label}</th>`).join(""),c=t.rows.map((f,x)=>{const w=t.months.map((S,I)=>{const $=f.values[I]||0;return`<td style="background:#dceaf6;">${l?`<input type="number" min="0" step="1" class="form-input external-workforce-input" style="min-width:70px;text-align:center;padding:6px 8px;" value="${$}" data-row="${x}" data-contractor-key="${f.stableKey}" data-month="${S.key}" />`:`<span class="font-semibold text-slate-700">${$}</span>`}</td>`}).join("");return`
                <tr>
                    <td class="sticky-cell" style="background:#c7dcef; font-weight:700; text-align:${s};">
                        <div>${Utils.escapeHTML(f.contractorName)}</div>
                        <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(f.contractorCode||f.contractorId||"\u0628\u062F\u0648\u0646 \u0643\u0648\u062F")}</div>
                    </td>
                    ${w}
                    <td style="background:#dceaf6; font-weight:800;">${f.total}</td>
                </tr>
            `}).join(""),p=t.monthTotals.map(f=>`<td style="background:#fff6cf; font-weight:800;">${f}</td>`).join(""),d=t.directEmployees.map(f=>`<td style="background:#eef2ff; font-weight:700;">${f}</td>`).join(""),m=t.combined.map(f=>`<td style="background:#ecfdf5; font-weight:800;">${f}</td>`).join(""),y=t.estimatedHours.map(f=>`<td style="background:#fff7ed; font-weight:700;">${f.toLocaleString("en-US")}</td>`).join("");e.innerHTML=`
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
                        ${r}
                        <th style="min-width:80px;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${c}
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#fff6cf; z-index:1; font-weight:800; text-align:right;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</td>
                        ${p}
                        <td style="background:#fff6cf; font-weight:900;">${t.grandTotal}</td>
                    </tr>
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#eef2ff; z-index:1; font-weight:800; text-align:right;">\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062B\u0628\u062A\u0629</td>
                        ${d}
                        <td style="background:#eef2ff; font-weight:900;">${t.directEmployees.reduce((f,x)=>f+x,0)}</td>
                    </tr>
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#ecfdf5; z-index:1; font-weight:800; text-align:right;">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u062A\u0631\u0643</td>
                        ${m}
                        <td style="background:#ecfdf5; font-weight:900;">${t.combined.reduce((f,x)=>f+x,0)}</td>
                    </tr>
                    <tr>
                        <td class="sticky-cell" style="position:sticky; right:0; background:#fff7ed; z-index:1; font-weight:800; text-align:right;">\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629</td>
                        ${y}
                        <td style="background:#fff7ed; font-weight:900;">${t.estimatedHours.reduce((f,x)=>f+x,0).toLocaleString("en-US")}</td>
                    </tr>
                </tbody>
            </table>
        `;const g=e.querySelector(".external-workforce-table");if(!g)return;let b=e.querySelector(".external-workforce-shell");b||(b=document.createElement("div"),b.className="external-workforce-shell",g.parentNode.insertBefore(b,g),b.appendChild(g)),b.setAttribute("dir",i),Object.assign(b.style,{width:"100%",maxWidth:"100%",maxHeight:"min(70vh, calc(100vh - 260px))",overflow:"auto",border:"1px solid #cbd5e1",borderRadius:"18px",background:"#ffffff"}),Object.assign(g.style,{width:"max(100%, 1180px)",borderCollapse:"separate",borderSpacing:"0",direction:i,tableLayout:"fixed"}),g.querySelectorAll("th, td").forEach(f=>{f.style.padding="clamp(6px, 0.7vw, 10px)",f.style.fontSize="clamp(11px, 0.85vw, 14px)"});const u=Array.from(g.querySelectorAll("thead th"));u.forEach(f=>{f.style.position="sticky",f.style.top="0",f.style.zIndex="4",f.style.background="#b7d2ea"}),u[0]&&(u[0].textContent=n.contractor,u[0].classList.add("sticky-cell"),u[0].style.textAlign=s),u[u.length-1]&&(u[u.length-1].textContent=n.total),g.querySelectorAll(".sticky-cell").forEach(f=>{f.style.position="sticky",f.style.left="",f.style.right="",f.style[o]="0",f.style.zIndex=f.closest("thead")?"6":"2",f.style.minWidth="clamp(170px, 18vw, 240px)",f.style.maxWidth="clamp(170px, 18vw, 260px)",f.style.whiteSpace="normal",f.style.wordBreak="break-word"});const v=Array.from(g.querySelectorAll("tbody tr"));v.slice(0,t.rows.length).forEach((f,x)=>{const w=f.querySelector(".sticky-cell"),S=t.rows[x];!w||!S||(w.style.textAlign=s,w.innerHTML=`
                <div>${Utils.escapeHTML(S.contractorName)}</div>
                <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(S.contractorCode||S.contractorId||n.noCode)}</div>
            `)});const h=[n.externalTotal,n.directEmployees,n.combinedTotal,n.estimatedHours];v.slice(-4).forEach((f,x)=>{const w=f.querySelector(".sticky-cell");w&&(w.textContent=h[x]||w.textContent,w.style.textAlign=s)}),g.querySelectorAll(".external-workforce-input").forEach(f=>{f.style.width="100%",f.style.minWidth="0",f.style.height=window.innerWidth<=768?"32px":"36px",f.style.padding="6px 8px",f.style.textAlign="center"}),window.innerWidth<=768&&(b.style.maxHeight="min(62vh, calc(100vh - 220px))",g.style.width="max(100%, 980px)")},async saveExternalWorkforceValue(e,t,a){if(!this.canManageExternalWorkforceTab())return;const i=this.getAvailableContractorsForExternalWorkforce().find(l=>l.stableKey===e);if(!i)return;const o=Number(this.externalWorkforceYear),s=this.getExternalWorkforceRecords();let n=this.getExternalWorkforceRecord(o,e);n||(n={id:`EWM-${o}-${e}`,year:o,contractorId:i.contractorId||"",contractorCode:i.contractorCode||"",contractorName:i.contractorName||"",createdAt:new Date().toISOString()},s.push(n)),n[t]=Math.max(0,parseInt(a||"0",10)||0),n.total=this.getExternalWorkforceMonths().reduce((l,r)=>l+(parseInt(n[r.key]||"0",10)||0),0),n.updatedAt=new Date().toISOString(),n.updatedBy=AppState.currentUser?.name||AppState.currentUser?.email||"admin",this._externalWorkforceCache.clear(),this.renderExternalWorkforceTable(),typeof DataManager<"u"&&typeof DataManager.save=="function"&&DataManager.save(),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.autoSave=="function"&&GoogleIntegration.autoSave("ExternalWorkforceMonthly",s).catch(()=>{}),window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{externalWorkforce:!0,year:o}}))},_empChartPalette(){return["#1d4ed8","#3b82f6","#6366f1","#8b5cf6","#0ea5e9","#2563eb","#4f46e5","#7c3aed","#0284c7","#1e40af","#4338ca","#5b21b6"]},_empAnalyticsLabel(e){return String(e||"").trim()||this.t("module.employees.analytics.unknown","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")},_empNormalizeGenderForAnalytics(e){if(!e)return"unknown";let t=String(e).trim().replace(/\s+/g," ").replace(/[\u200B-\u200D\uFEFF]/g,"");const a=t.toLowerCase();return t==="\u0630\u0643\u0631"||a==="male"||a==="m"?"male":t==="\u0623\u0646\u062B\u0649"||a==="female"||a==="f"?"female":"unknown"},_empGetExperienceYears(e){if(!e?.hireDate)return null;try{const t=this.parseLocalDate(e.hireDate);if(!t)return null;const a=new Date;let i=a.getFullYear()-t.getFullYear();const o=a.getMonth()-t.getMonth(),s=a.getDate()-t.getDate();return(o<0||o===0&&s<0)&&i--,i>=0?i:null}catch{return null}},async _empEnsureChartJs(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{let a=0;const i=setInterval(()=>{typeof Chart<"u"?(clearInterval(i),t(!0)):++a>50&&(clearInterval(i),t(!1))},100)}):new Promise(t=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",a.onload=()=>t(!0),a.onerror=()=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>t(!1),document.head.appendChild(i)},document.head.appendChild(a)})},_empDestroyAnalyticsCharts(){const e=this._empAnalyticsCharts||{};Object.keys(e).forEach(t=>{try{e[t]?.destroy?.()}catch{}}),this._empAnalyticsCharts={}},_empGetAnalyticsFiltersFromDom(){const e=t=>{const a=document.getElementById(t);return a?String(a.value||"").trim():""};return{department:e("emp-af-department"),job:e("emp-af-job"),branch:e("emp-af-branch"),location:e("emp-af-location"),position:e("emp-af-position"),gender:e("emp-af-gender"),status:e("emp-af-status")}},_empFilterIdMap(){return{department:"emp-af-department",job:"emp-af-job",branch:"emp-af-branch",location:"emp-af-location",position:"emp-af-position",gender:"emp-af-gender",status:"emp-af-status"}},_empApplyAnalyticsFilter(e,t,a={}){const o=this._empFilterIdMap()[e];if(o){const s=document.getElementById(o);s&&(s.value=t||"")}this._empUpdateAnalyticsFilterBadge(),a.skipUpdate||this.updateEmployeesAnalyticsDashboard()},_empClearAnalyticsFilters(){Object.values(this._empFilterIdMap()).forEach(e=>{const t=document.getElementById(e);t&&(t.value="")}),this._empUpdateAnalyticsFilterBadge(),this.updateEmployeesAnalyticsDashboard()},_empUpdateAnalyticsFilterBadge(){const e=this._empGetAnalyticsFiltersFromDom(),t=Object.values(e).filter(Boolean).length,a=document.getElementById("emp-filter-active-badge");a&&(a.style.display=t>0?"inline":"none",a.textContent=t>0?String(t):"");const i=document.getElementById("emp-filter-results-count");i&&i.dataset.baseCount&&(i.textContent=i.dataset.baseCount)},_empFilterEmployeesForAnalytics(e,t){return(Array.isArray(e)?e:[]).filter(i=>{if(!i||t.status==="active"&&this.isEmployeeInactive(i)||t.status==="inactive"&&!this.isEmployeeInactive(i)||t.department&&this._empAnalyticsLabel(i.department)!==t.department||t.job&&this._empAnalyticsLabel(i.job)!==t.job||t.branch&&this._empAnalyticsLabel(i.branch)!==t.branch||t.location&&this._empAnalyticsLabel(i.location)!==t.location||t.position&&this._empAnalyticsLabel(i.position)!==t.position)return!1;if(t.gender){const o=this._empNormalizeGenderForAnalytics(i.gender);if(t.gender==="male"&&o!=="male"||t.gender==="female"&&o!=="female")return!1}return!0})},_empAggregateGroupStats(e,t){const a={};(e||[]).forEach(o=>{const s=this._empAnalyticsLabel(o[t]);a[s]||(a[s]={label:s,count:0,male:0,female:0,ageSum:0,ageCount:0,expSum:0,expCount:0});const n=a[s];n.count++;const l=this._empNormalizeGenderForAnalytics(o.gender);l==="male"?n.male++:l==="female"&&n.female++;const r=Number(this.calculateAge(o.birthDate));r>0&&(n.ageSum+=r,n.ageCount++);const c=this._empGetExperienceYears(o);c!==null&&(n.expSum+=c,n.expCount++)});const i=(e||[]).length||1;return Object.values(a).map(o=>({...o,percent:Math.round(o.count/i*100),avgAge:o.ageCount>0?Math.round(o.ageSum/o.ageCount):0,avgExperience:o.expCount>0?(o.expSum/o.expCount).toFixed(1):0})).sort((o,s)=>s.count-o.count)},buildEmployeeAnalyticsDataset(e,t={}){const a=this._empFilterEmployeesForAnalytics(e,t),i=a.filter(k=>!this.isEmployeeInactive(k)),o=a.filter(k=>this.isEmployeeInactive(k)),s=a.length,n=i.length,l=o.length,r=this._empAggregateGroupStats(a,"department"),c=this._empAggregateGroupStats(a,"job"),p=this._empAggregateGroupStats(a,"branch"),d=this._empAggregateGroupStats(a,"location"),m=this._empAggregateGroupStats(a,"position"),y={};a.forEach(k=>{const T=this._empAnalyticsLabel(k.department),M=this._empAnalyticsLabel(k.job),_=T+"|||"+M;y[_]=(y[_]||0)+1});const g={"18-25":0,"26-35":0,"36-45":0,"46-55":0,"55+":0,unknown:0},b={"0-2":0,"3-5":0,"6-10":0,"11-15":0,"15+":0,unknown:0},u={};let v=0,E=0,h=0,f=0,x=0,w=0;const S=["employeeNumber","name","department","job","nationalId","birthDate","hireDate","gender","phone","email","branch","location","position"],I=S.map(k=>({field:k,filled:0,missing:0}));a.forEach(k=>{const T=this._empNormalizeGenderForAnalytics(k.gender);T==="male"?x++:T==="female"&&w++;const M=Number(this.calculateAge(k.birthDate));M>0?(v+=M,E++,M<=25?g["18-25"]++:M<=35?g["26-35"]++:M<=45?g["36-45"]++:M<=55?g["46-55"]++:g["55+"]++):g.unknown++;const _=this._empGetExperienceYears(k);if(_!==null?(h+=_,f++,_<=2?b["0-2"]++:_<=5?b["3-5"]++:_<=10?b["6-10"]++:_<=15?b["11-15"]++:b["15+"]++):b.unknown++,k.hireDate){const U=this.parseLocalDate(k.hireDate);if(U){const B=U.getFullYear();u[B]=(u[B]||0)+1}}I.forEach(U=>{const B=k[U.field];B!=null&&String(B).trim()!==""?U.filled++:U.missing++})});const $=Object.keys(u).map(Number).sort((k,T)=>k-T),D=s*S.length,L=I.reduce((k,T)=>k+T.filled,0),A=D>0?Math.round(L/D*100):0,C=r.slice(0,8).map(k=>({label:k.label,male:k.male,female:k.female}));return{filtered:a,total:s,activeCount:n,inactiveCount:l,uniqueDepartments:r.filter(k=>k.label!==this.t("module.employees.analytics.unknown","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")).length,uniqueJobs:c.filter(k=>k.label!==this.t("module.employees.analytics.unknown","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")).length,averageAge:E>0?Math.round(v/E):0,averageExperience:f>0?(h/f).toFixed(1):0,male:x,female:w,dataCompletenessPct:A,byDepartment:r,byJob:c,byBranch:p,byLocation:d,byPosition:m,departmentJobMatrix:y,ageBuckets:g,tenureBuckets:b,hireByYear:u,hireYears:$,genderByDept:C,completeness:I.map(k=>({...k,percent:s>0?Math.round(k.filled/s*100):0}))}},_empChartBaseOptions(){return{responsive:!0,maintainAspectRatio:!1,animation:{duration:600,easing:"easeOutQuart"},plugins:{legend:{position:"bottom",labels:{font:{family:"inherit",size:11},padding:12}},tooltip:{callbacks:{label:e=>{const t=e.parsed?.y??e.parsed??e.raw??0,a=e.dataset?.data?.reduce((o,s)=>o+s,0)||1,i=Math.round(t/a*100);return`${e.label}: ${t} (${i}%) \u2014 ${this.t("module.employees.analytics.clickToFilter","\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0635\u0641\u064A\u0629")}`}}}}}},_empCreateAnalyticsChart(e,t){const a=document.getElementById(e);if(!a||typeof Chart>"u")return null;if(this._empAnalyticsCharts[e])try{this._empAnalyticsCharts[e].destroy()}catch{}const i=new Chart(a,t);return this._empAnalyticsCharts[e]=i,i},_empMakeBarGradient(e,t,a,i){if(!t)return a;const o=e.createLinearGradient(t.left,0,t.right,0);return o.addColorStop(0,a),o.addColorStop(1,i),o},_empRenderAnalyticsKpiStrip(e){const t=document.getElementById("emp-analytics-kpi-strip");if(!t)return;const a=[{label:this.t("module.employees.analytics.kpi.active","\u0627\u0644\u0646\u0634\u0637\u0648\u0646"),value:e.activeCount,color:"#16a34a",icon:"fa-user-check"},{label:this.t("module.employees.analytics.kpi.inactive","\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646"),value:e.inactiveCount,color:"#dc2626",icon:"fa-user-slash"},{label:this.t("module.employees.analytics.kpi.total","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A"),value:e.total,color:"#1d4ed8",icon:"fa-users"},{label:this.t("module.employees.analytics.kpi.departments","\u0627\u0644\u0623\u0642\u0633\u0627\u0645"),value:e.uniqueDepartments,color:"#7c3aed",icon:"fa-building"},{label:this.t("module.employees.analytics.kpi.jobs","\u0627\u0644\u0648\u0638\u0627\u0626\u0641"),value:e.uniqueJobs,color:"#0ea5e9",icon:"fa-briefcase"},{label:this.t("module.employees.analytics.kpi.avgAge","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0639\u0645\u0631"),value:e.averageAge||this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),color:"#ea580c",icon:"fa-birthday-cake"},{label:this.t("module.employees.analytics.kpi.avgExperience","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062E\u0628\u0631\u0629"),value:e.averageExperience||this.t("module.common.notAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),color:"#0891b2",icon:"fa-clock"},{label:this.t("module.employees.analytics.kpi.dataCompleteness","\u0627\u0643\u062A\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),value:e.dataCompletenessPct+"%",color:"#059669",icon:"fa-database"}];t.innerHTML=a.map(i=>`
            <div class="emp-analytics-kpi" style="--kpi-color:${i.color};">
                <div class="emp-analytics-kpi__icon"><i class="fas ${i.icon}"></i></div>
                <div class="emp-analytics-kpi__value">${typeof i.value=="number"?i.value.toLocaleString("en-US"):i.value}</div>
                <div class="emp-analytics-kpi__label">${i.label}</div>
            </div>
        `).join("")},_empRenderAnalyticsBreadcrumb(e){const t=document.getElementById("emp-analytics-breadcrumb");if(!t)return;const a=[this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")];e.department&&a.push(e.department),e.job&&a.push(e.job),t.innerHTML=a.map((i,o)=>{const s=o===a.length-1;return`<span class="emp-analytics-crumb${s?" emp-analytics-crumb--active":""}">${Utils.escapeHTML(i)}</span>${s?"":'<span class="emp-analytics-crumb-sep">\u203A</span>'}`}).join("")},_empPopulateAnalyticsFilterOptions(e){const t=Array.isArray(e)?e:[],a=s=>[...new Set(t.map(n=>this._empAnalyticsLabel(n[s])).filter(Boolean))].sort((n,l)=>n.localeCompare(l,"ar")),i=(s,n,l)=>{const r=document.getElementById(s);if(!r)return;const c=l||r.value;r.innerHTML=`<option value="">${this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")}</option>`+n.map(p=>`<option value="${Utils.escapeHTML(p)}"${p===c?" selected":""}>${Utils.escapeHTML(p)}</option>`).join("")},o=this._empGetAnalyticsFiltersFromDom();i("emp-af-department",a("department"),o.department),i("emp-af-job",a("job"),o.job),i("emp-af-branch",a("branch"),o.branch),i("emp-af-location",a("location"),o.location),i("emp-af-position",a("position"),o.position)},_empRenderAnalyticsHeatmap(e){const t=document.getElementById("emp-analytics-heatmap");if(!t)return;const a=e.departmentJobMatrix||{},i=Object.entries(a).map(([c,p])=>{const[d,m]=c.split("|||");return{dept:d,job:m,count:p}}).sort((c,p)=>p.count-c.count);if(!i.length){t.innerHTML=`<div class="emp-analytics-empty">${this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`;return}const o=[...new Set(i.slice(0,12).map(c=>c.dept))],s=[...new Set(i.slice(0,12).map(c=>c.job))],n=Math.max(...i.map(c=>c.count),1),l={};i.forEach(c=>{l[c.dept+"|||"+c.job]=c.count});let r='<table class="emp-analytics-heatmap-table"><thead><tr><th></th>';s.forEach(c=>{r+=`<th title="${Utils.escapeHTML(c)}">${Utils.escapeHTML(c.length>14?c.slice(0,14)+"\u2026":c)}</th>`}),r+="</tr></thead><tbody>",o.forEach(c=>{r+=`<tr><th title="${Utils.escapeHTML(c)}">${Utils.escapeHTML(c.length>16?c.slice(0,16)+"\u2026":c)}</th>`,s.forEach(p=>{const d=l[c+"|||"+p]||0,m=d>0?.15+d/n*.85:0,y=d>0?`rgba(29, 78, 216, ${m})`:"#f8fafc",g=m>.5?"#fff":"#334155";r+=`<td class="emp-analytics-heatmap-cell" data-dept="${Utils.escapeHTML(c)}" data-job="${Utils.escapeHTML(p)}" style="background:${y};color:${g};" title="${Utils.escapeHTML(c)} / ${Utils.escapeHTML(p)}: ${d}">${d||""}</td>`}),r+="</tr>"}),r+="</tbody></table>",t.innerHTML=r,t.querySelectorAll(".emp-analytics-heatmap-cell").forEach(c=>{c.addEventListener("click",()=>{const p=c.getAttribute("data-dept")||"",d=c.getAttribute("data-job")||"";!p&&!d||(this._empApplyAnalyticsFilter("department",p,{skipUpdate:!0}),this._empApplyAnalyticsFilter("job",d))})})},_empRenderAnalyticsDetailTable(e){const t=document.getElementById("emp-analytics-detail-table");if(!t)return;const a=this._empAnalyticsDetailTab||"department",i=a==="job"?e.byJob:e.byDepartment,o=a==="job"?this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"):this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645"),s=a==="job"?"job":"department";if(!i.length){t.innerHTML=`<div class="emp-analytics-empty">${this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`;return}const l=this._empGetAnalyticsFiltersFromDom()[s];t.innerHTML=`
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
                    ${i.map(r=>`
                        <tr class="emp-analytics-detail-row${l===r.label?" emp-analytics-detail-row--selected":""}" data-filter-key="${s}" data-filter-value="${Utils.escapeHTML(r.label)}">
                            <td>${Utils.escapeHTML(r.label)}</td>
                            <td>${r.count}</td>
                            <td>${r.percent}%</td>
                            <td>${r.male}</td>
                            <td>${r.female}</td>
                            <td>${r.avgAge||"\u2014"}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `,t.querySelectorAll(".emp-analytics-detail-row").forEach(r=>{r.addEventListener("click",()=>{const c=r.getAttribute("data-filter-key"),p=r.getAttribute("data-filter-value");c&&this._empApplyAnalyticsFilter(c,p)})})},_empRenderCompletenessTable(e){const t=document.getElementById("emp-analytics-completeness-table");if(!t)return;const a={employeeNumber:this.t("module.employees.employeeNumber","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),name:this.t("module.employees.fullName","\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644"),department:this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645"),job:this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"),nationalId:this.t("module.employees.table.nationalId","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629"),birthDate:this.t("module.employees.table.birthDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F"),hireDate:this.t("module.employees.table.hireDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646"),gender:this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639"),phone:this.t("module.employees.table.phone","\u0627\u0644\u0647\u0627\u062A\u0641"),email:this.t("module.employees.email","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"),branch:this.t("module.employees.branch","\u0627\u0644\u0641\u0631\u0639"),location:this.t("module.employees.location","\u0627\u0644\u0645\u0648\u0642\u0639"),position:this.t("module.employees.position","\u0627\u0644\u0645\u0646\u0635\u0628")};t.innerHTML=`
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
        `},_empBindChartClick(e,t,a){const i=this._empAnalyticsCharts[e];!i||!t?.length||(i.options.onClick=(o,s)=>{if(!s?.length)return;const n=s[0].index,l=t[n];l?.label&&this._empApplyAnalyticsFilter(a,l.label)},i.update("none"))},_empRenderAnalyticsCharts(e){const t=this._empChartPalette(),a=this.t("module.employees.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A"),i=(u,v)=>{const E=document.getElementById(u+"-empty"),h=document.getElementById(u);E&&(E.style.display=v?"none":"flex"),h&&(h.style.display=v?"block":"none")},o=e.byDepartment.slice(0,12);i("emp-chart-departments",o.length>0),o.length&&(this._empCreateAnalyticsChart("emp-chart-departments",{type:"bar",data:{labels:o.map(u=>u.label),datasets:[{data:o.map(u=>u.count),backgroundColor:u=>this._empMakeBarGradient(u.chart.ctx,u.chart.chartArea,"#1d4ed8","#6366f1"),borderRadius:8,borderSkipped:!1}]},options:{...this._empChartBaseOptions(),indexAxis:"y",plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{x:{beginAtZero:!0,grid:{color:"#f1f5f9"}},y:{grid:{display:!1}}}}}),this._empBindChartClick("emp-chart-departments",o,"department"));const s=e.byJob.slice(0,12);i("emp-chart-jobs",s.length>0),s.length&&(this._empCreateAnalyticsChart("emp-chart-jobs",{type:"bar",data:{labels:s.map(u=>u.label),datasets:[{data:s.map(u=>u.count),backgroundColor:t.map((u,v)=>t[v%t.length]),borderRadius:8}]},options:{...this._empChartBaseOptions(),indexAxis:"y",plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{x:{beginAtZero:!0},y:{grid:{display:!1}}}}}),this._empBindChartClick("emp-chart-jobs",s,"job"));const n=[e.male,e.female];i("emp-chart-gender",n.some(u=>u>0)),n.some(u=>u>0)&&this._empCreateAnalyticsChart("emp-chart-gender",{type:"doughnut",data:{labels:[this.t("module.employees.genderMale","\u0630\u0643\u0631"),this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649")],datasets:[{data:n,backgroundColor:["#3b82f6","#ec4899"],borderWidth:0}]},options:{...this._empChartBaseOptions(),cutout:"65%",plugins:{...this._empChartBaseOptions().plugins,legend:{position:"bottom"}}}});const l=[e.activeCount,e.inactiveCount];i("emp-chart-status",e.total>0),e.total>0&&this._empCreateAnalyticsChart("emp-chart-status",{type:"doughnut",data:{labels:[this.t("module.employees.analytics.active","\u0646\u0634\u0637"),this.t("module.employees.analytics.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")],datasets:[{data:l,backgroundColor:["#16a34a","#ef4444"],borderWidth:0}]},options:{...this._empChartBaseOptions(),cutout:"65%"}});const r=(u,v,E)=>{const h=v.slice(0,10);i(u,h.length>0),h.length&&(this._empCreateAnalyticsChart(u,{type:"bar",data:{labels:h.map(f=>f.label),datasets:[{data:h.map(f=>f.count),backgroundColor:t,borderRadius:6}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{y:{beginAtZero:!0}}}}),E&&this._empBindChartClick(u,h,E))};r("emp-chart-branches",e.byBranch,"branch"),r("emp-chart-locations",e.byLocation,"location"),r("emp-chart-positions",e.byPosition,"position");const c=Object.keys(e.ageBuckets),p=c.map(u=>e.ageBuckets[u]);i("emp-chart-age",p.some(u=>u>0)),p.some(u=>u>0)&&this._empCreateAnalyticsChart("emp-chart-age",{type:"bar",data:{labels:c,datasets:[{data:p,backgroundColor:"#6366f1",borderRadius:8}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}}}});const d=Object.keys(e.tenureBuckets),m=d.map(u=>e.tenureBuckets[u]);i("emp-chart-tenure",m.some(u=>u>0)),m.some(u=>u>0)&&this._empCreateAnalyticsChart("emp-chart-tenure",{type:"bar",data:{labels:d,datasets:[{data:m,backgroundColor:"#0ea5e9",borderRadius:8}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}}}});const y=e.hireYears||[],g=y.map(u=>e.hireByYear[u]||0);i("emp-chart-hire",y.length>0),y.length&&this._empCreateAnalyticsChart("emp-chart-hire",{type:"line",data:{labels:y.map(String),datasets:[{data:g,borderColor:"#1d4ed8",backgroundColor:"rgba(29,78,216,0.12)",fill:!0,tension:.35,pointRadius:4,pointBackgroundColor:"#1d4ed8"}]},options:{...this._empChartBaseOptions(),plugins:{...this._empChartBaseOptions().plugins,legend:{display:!1}},scales:{y:{beginAtZero:!0}}}});const b=e.genderByDept||[];i("emp-chart-gender-dept",b.length>0),b.length&&(this._empCreateAnalyticsChart("emp-chart-gender-dept",{type:"bar",data:{labels:b.map(u=>u.label),datasets:[{label:this.t("module.employees.genderMale","\u0630\u0643\u0631"),data:b.map(u=>u.male),backgroundColor:"#3b82f6",borderRadius:4},{label:this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649"),data:b.map(u=>u.female),backgroundColor:"#ec4899",borderRadius:4}]},options:{...this._empChartBaseOptions(),scales:{x:{stacked:!0},y:{stacked:!0,beginAtZero:!0}}}}),this._empBindChartClick("emp-chart-gender-dept",b,"department"))},renderEmployeesAnalysisShellHTML(){const e=[{id:"emp-af-department",icon:"fa-building",label:this.t("module.employees.department","\u0627\u0644\u0642\u0633\u0645")},{id:"emp-af-job",icon:"fa-briefcase",label:this.t("module.employees.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")},{id:"emp-af-branch",icon:"fa-sitemap",label:this.t("module.employees.branch","\u0627\u0644\u0641\u0631\u0639")},{id:"emp-af-location",icon:"fa-map-marker-alt",label:this.t("module.employees.location","\u0627\u0644\u0645\u0648\u0642\u0639")},{id:"emp-af-position",icon:"fa-user-tie",label:this.t("module.employees.position","\u0627\u0644\u0645\u0646\u0635\u0628")},{id:"emp-af-gender",icon:"fa-venus-mars",label:this.t("module.employees.gender","\u0627\u0644\u0646\u0648\u0639"),options:[{value:"",label:this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")},{value:"male",label:this.t("module.employees.genderMale","\u0630\u0643\u0631")},{value:"female",label:this.t("module.employees.genderFemale","\u0623\u0646\u062B\u0649")}]},{id:"emp-af-status",icon:"fa-toggle-on",label:"\u0627\u0644\u062D\u0627\u0644\u0629",options:[{value:"",label:this.t("module.employees.analytics.all","\u0627\u0644\u0643\u0644")},{value:"active",label:this.t("module.employees.analytics.active","\u0646\u0634\u0637")},{value:"inactive",label:this.t("module.employees.analytics.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")}]}],t=(a,i,o)=>`
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
        `},async loadEmployeesAnalysis(e=!1){if(this.activeTab!=="data-analysis")return;const t=document.getElementById("employees-analysis-panel");if(t){t.querySelector("#emp-analytics-root")||(t.innerHTML=this.renderEmployeesAnalysisShellHTML(),this._empAnalyticsEventsBound=!1);try{await this.ensureEmployeesLoaded(e)}catch{}await this._empEnsureChartJs(),this._empAnalyticsEventsBound||(this._empBindAnalyticsEvents(),this._empAnalyticsEventsBound=!0),await this.updateEmployeesAnalyticsDashboard()}},async updateEmployeesAnalyticsDashboard(){if(!document.getElementById("emp-analytics-root"))return;const t=AppState.appData?.employees||[],a=this._empGetAnalyticsFiltersFromDom();this._empPopulateAnalyticsFilterOptions(t),Object.entries(a).forEach(([s,n])=>{const l=this._empFilterIdMap(),r=document.getElementById(l[s]);r&&n&&(r.value=n)});const i=this.buildEmployeeAnalyticsDataset(t,a),o=document.getElementById("emp-filter-results-count");o&&(o.dataset.baseCount=`${i.total} \u0645\u0648\u0638\u0641`,o.textContent=o.dataset.baseCount),this._empRenderAnalyticsBreadcrumb(a),this._empRenderAnalyticsKpiStrip(i),this._empDestroyAnalyticsCharts(),this._empRenderAnalyticsCharts(i),this._empRenderAnalyticsHeatmap(i),this._empRenderAnalyticsDetailTable(i),this._empRenderCompletenessTable(i),this._empUpdateAnalyticsFilterBadge()},_empBindAnalyticsEvents(){document.getElementById("emp-toggle-filters-btn")?.addEventListener("click",()=>{const e=document.getElementById("emp-filter-panel");e&&(e.style.display=e.style.display==="none"||!e.style.display?"block":"none")}),document.getElementById("emp-filter-reset-btn")?.addEventListener("click",()=>this._empClearAnalyticsFilters()),document.getElementById("emp-analytics-refresh")?.addEventListener("click",()=>this.loadEmployeesAnalysis(!0)),document.getElementById("emp-export-pdf-btn")?.addEventListener("click",()=>this._empExportAnalyticsPdf()),Object.values(this._empFilterIdMap()).forEach(e=>{document.getElementById(e)?.addEventListener("change",()=>this.updateEmployeesAnalyticsDashboard())}),document.querySelectorAll("[data-emp-detail-tab]").forEach(e=>{e.addEventListener("click",()=>{this._empAnalyticsDetailTab=e.getAttribute("data-emp-detail-tab")||"department",document.querySelectorAll("[data-emp-detail-tab]").forEach(i=>i.classList.toggle("active",i===e));const t=AppState.appData?.employees||[],a=this.buildEmployeeAnalyticsDataset(t,this._empGetAnalyticsFiltersFromDom());this._empRenderAnalyticsDetailTable(a)})})},async _empExportAnalyticsPdf(){try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A...");const e=AppState.appData?.employees||[],t=this._empGetAnalyticsFiltersFromDom(),a=this.buildEmployeeAnalyticsDataset(e,t),i=(a.byDepartment||[]).slice(0,25).map((r,c)=>`<tr>
                    <td>${c+1}</td>
                    <td style="text-align: right; font-weight: 700;">${Utils.escapeHTML(r.label)}</td>
                    <td><strong>${r.count}</strong></td>
                    <td><span style="background: #eff6ff; color: #1d4ed8; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${r.percent}%</span></td>
                    <td>${r.male}</td>
                    <td>${r.female}</td>
                    <td>${r.avgAge?r.avgAge+" \u0633\u0646\u0629":"-"}</td>
                </tr>`).join(""),o=(a.byJob||[]).slice(0,25).map((r,c)=>`<tr>
                    <td>${c+1}</td>
                    <td style="text-align: right; font-weight: 700;">${Utils.escapeHTML(r.label)}</td>
                    <td><strong>${r.count}</strong></td>
                    <td><span style="background: #f0fdf4; color: #047857; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${r.percent}%</span></td>
                    <td>${r.male}</td>
                    <td>${r.female}</td>
                </tr>`).join(""),s=this.getIsoPrintHeaderHtml("\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0648\u0627\u0644\u062F\u064A\u0645\u0648\u063A\u0631\u0627\u0641\u064A \u0644\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629","Workforce Demographics & Statistical Analytics Report","DOC-HSE-EMP-KPI-01","Rev. 02","\u0639\u0627\u0645 \u062F\u0627\u062E\u0644\u064A"),n=this.getIsoPrintFooterHtml("DOC-HSE-EMP-KPI-01","Rev. 02","ISO 45001:2018 (Clause 9.1 Performance Evaluation)"),l=`
                <div class="no-print-bar">
                    <div class="brand-badge">
                        <span class="pill-tag">ICAPP HSE & HR</span>
                        <span class="title-text">\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0648\u0627\u0644\u062F\u064A\u0645\u0648\u063A\u0631\u0627\u0641\u064A \u0644\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629</span>
                    </div>
                    <div class="action-buttons">
                        <button type="button" onclick="window.print()" class="btn-print">
                            \u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
                        </button>
                        <button type="button" onclick="window.close()" class="btn-close">
                            \u274C \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629
                        </button>
                    </div>
                </div>

                <div class="report-page-container">
                    ${s}

                    <div class="handover-info-grid">
                        <div class="info-card">
                            <div class="card-label">\u{1F465} \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062C\u0644\u064A\u0646</div>
                            <div class="card-value">${a.total||e.length} \u0645\u0648\u0638\u0641</div>
                        </div>
                        <div class="info-card">
                            <div class="card-label">\u2705 \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0627\u0644\u0646\u0634\u0637\u0629</div>
                            <div class="card-value" style="color: #047857;">${a.activeCount||0} \u0645\u0648\u0638\u0641</div>
                        </div>
                        <div class="info-card">
                            <div class="card-label">\u26D4 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646 \u0648\u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646</div>
                            <div class="card-value" style="color: #b91c1c;">${a.inactiveCount||0} \u0645\u0648\u0638\u0641</div>
                        </div>
                        <div class="info-card">
                            <div class="card-label">\u{1F3E2} \u0627\u0644\u0623\u0642\u0633\u0627\u0645 / \u0627\u0644\u0648\u0638\u0627\u0626\u0641</div>
                            <div class="card-value">${(a.byDepartment||[]).length} \u0642\u0633\u0645 / ${(a.byJob||[]).length} \u0645\u0633\u0645\u0649</div>
                        </div>
                    </div>

                    <div style="margin-top: 14px; margin-bottom: 8px; font-size: 13px; font-weight: 800; color: #1e3a8a;">
                        \u{1F4CA} \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629 \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A (Top Departments)
                    </div>
                    <table class="iso-table">
                        <thead>
                            <tr>
                                <th style="width: 35px;">#</th>
                                <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                                <th>\u0627\u0644\u0639\u062F\u062F</th>
                                <th>\u0627\u0644\u0646\u0633\u0628\u0629 %</th>
                                <th>\u0630\u0643\u0648\u0631</th>
                                <th>\u0625\u0646\u0627\u062B</th>
                                <th>\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0639\u0645\u0631</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${i||'<tr><td colspan="7">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629</td></tr>'}
                        </tbody>
                    </table>

                    <div style="margin-top: 18px; margin-bottom: 8px; font-size: 13px; font-weight: 800; color: #1e3a8a;">
                        \u{1F4CB} \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629 \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0645\u0633\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 (Top Job Titles)
                    </div>
                    <table class="iso-table">
                        <thead>
                            <tr>
                                <th style="width: 35px;">#</th>
                                <th>\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                                <th>\u0627\u0644\u0639\u062F\u062F</th>
                                <th>\u0627\u0644\u0646\u0633\u0628\u0629 %</th>
                                <th>\u0630\u0643\u0648\u0631</th>
                                <th>\u0625\u0646\u0627\u062B</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${o||'<tr><td colspan="6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629</td></tr>'}
                        </tbody>
                    </table>

                    <div class="signatures-grid">
                        <div class="sig-card">
                            <div class="sig-card-title">\u0625\u0639\u062F\u0627\u062F \u0648\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</div>
                            <div class="sig-card-name">\u0645\u0633\u0624\u0648\u0644 \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u0631\u062F</div>
                            <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">\u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 (HSE KPIs)</div>
                            <div class="sig-card-name">\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                            <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u064A\u0627</div>
                            <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0639\u0627\u0645 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</div>
                            <div class="sig-line-area">\u0627\u0644\u062E\u062A\u0645 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                        </div>
                    </div>

                    ${n}
                </div>
            `;this.openIsoPrintWindow("\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0648\u0627\u0644\u062F\u064A\u0645\u0648\u063A\u0631\u0627\u0641\u064A \u0644\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629",l,!1),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0628\u0646\u062C\u0627\u062D")}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A:",e),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+e.message)}finally{Loading.hide()}},switchTab(e){const a=["employees-list","external-workforce","data-analysis"].includes(e)?e:"employees-list";this.activeTab=a,document.querySelectorAll("[data-employees-tab]").forEach(n=>{const l=n.getAttribute("data-employees-tab")===a;n.classList.toggle("active",l),n.style.background=l?"linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)":"#eff6ff",n.style.color=l?"#fff":"#1d4ed8",n.style.borderColor=l?"#0f172a":"#bfdbfe"});const i=document.getElementById("employees-list-panel"),o=document.getElementById("employees-external-panel"),s=document.getElementById("employees-analysis-panel");i&&i.classList.toggle("hidden",a!=="employees-list"),o&&o.classList.toggle("hidden",a!=="external-workforce"),s&&s.classList.toggle("hidden",a!=="data-analysis"),a==="external-workforce"?(this.populateExternalWorkforceYearSelector(),this.ensureExternalWorkforceDataLoaded().then(()=>this.renderExternalWorkforceTable()).catch(()=>{})):a==="data-analysis"?this.loadEmployeesAnalysis().catch(()=>{}):this.canViewEmployeesRegistryTab()&&(this.loadEmployeesList(),this.scrollToSearchField())},async renderList(){const e=this.canAddOrImport(),t=this.canViewEmployeesRegistryTab(),a=this.canViewExternalWorkforceTab(),i=this.canViewEmployeesAnalysisTab(),o=t?"employees-list":i?"data-analysis":a?"external-workforce":"employees-list";return(this.activeTab==="employees-list"&&!t||this.activeTab==="external-workforce"&&!a||this.activeTab==="data-analysis"&&!i)&&(this.activeTab=o),`
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
                            <button id="export-employees-excel-btn" class="btn-secondary" title="\u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0625\u0644\u0649 Excel" style="border-color: #a7f3d0; background: #f0fdf4; color: #047857; font-weight: 700;">
                                <i class="fas fa-file-excel ml-2" style="color: #059669;"></i>
                                \u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                            <button id="print-employees-registry-btn" class="btn-secondary" title="\u0637\u0628\u0627\u0639\u0629 \u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F (PDF)" style="border-color: #bfdbfe; background: #eff6ff; color: #1e40af; font-weight: 700;">
                                <i class="fas fa-print ml-2" style="color: #2563eb;"></i>
                                \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0633\u062C\u0644
                            </button>
                            ${e?`
                            <button id="refresh-employee-names-btn" class="btn-secondary" title="${this.t("module.employees.refreshNamesTitle","\u062A\u062D\u062F\u064A\u062B/\u062A\u0646\u0638\u064A\u0641 \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u062B\u0645 \u062D\u0641\u0638\u0647\u0627")}">
                                <i class="fas fa-font ml-2"></i>
                                ${this.t("module.employees.refreshNames","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621")}
                            </button>
                            <button id="report-employee-duplicates-btn" class="btn-secondary" title="\u062A\u0642\u0631\u064A\u0631 \u0645\u0643\u0631\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 \u2014 \u0644\u0627 \u062D\u0630\u0641)">
                                <i class="fas fa-clone ml-2"></i>
                                \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A
                            </button>
                            <button id="cleanup-employee-duplicates-btn" class="btn-secondary" title="\u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A \u0628\u0623\u0645\u0627\u0646 (\u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 + \u0631\u0642\u0645 \u0633\u0631\u064A)">
                                <i class="fas fa-broom ml-2"></i>
                                \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A
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
        `},async _waitWhileUpdating_(e=6e4){const t=Date.now();for(;this.cache.isUpdating&&Date.now()-t<e;)await new Promise(a=>setTimeout(a,50));this.cache.isUpdating&&(Utils.safeWarn("\u26A0\uFE0F \u062A\u062C\u0627\u0648\u0632 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u2014 \u0641\u0643 \u0627\u0644\u0642\u0641\u0644"),this.cache.isUpdating=!1)},async _ensureEmployeesLoadedWithTimeout_(e=!1,t=9e4){const a=new Promise((i,o)=>{setTimeout(()=>o(new Error("EMPLOYEES_LOAD_TIMEOUT")),t)});return Promise.race([this.ensureEmployeesLoaded(e),a])},async ensureEmployeesLoaded(e=!1){if(this.cache.isUpdating&&!e&&(await this._waitWhileUpdating_(6e4),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0))return!0;const t=AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0,a=this.cache.data&&this.cache.lastLoad&&Date.now()-this.cache.lastLoad<this.config.cacheTimeout&&!e;return t&&a?(AppState.debugMode&&Utils.safeLog(`\u2705 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 Cache (${this.cache.data.length} \u0645\u0648\u0638\u0641)`),this.cache.data&&this.cache.data.length>0&&this.applyEmployeesData_(this.cache.data),!this.config._refreshedOnceForInactive&&AppState.appData.employees.length>0&&AppState.googleConfig?.appsScript?.enabled&&(AppState.appData.employees||[]).filter(o=>this.isEmployeeInactive(o)).length===0&&(this.config._refreshedOnceForInactive=!0,this.loadEmployeesFromBackend(!0).then(()=>{window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{}}))}).catch(()=>{})),!0):t&&!a&&!e?(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),this.updateEmployeesInBackground(),!0):await this.loadEmployeesFromBackend(e)},async loadEmployeesFromBackend(e=!1){if(this.cache.isUpdating&&!e&&(AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0628\u0627\u0644\u0641\u0639\u0644\u060C \u0627\u0646\u062A\u0638\u0627\u0631..."),await this._waitWhileUpdating_(6e4),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0))return!0;this.cache.isUpdating=!0,typeof StableLoader<"u"&&StableLoader.beginOwnedFetch("employees");try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl)return AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u062E\u0627\u062F\u0645 SQL \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644 - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637"),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),!1;if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),!1;try{const t={filters:{includeInactive:!0,lite:!0},__timeoutMs:e?45e3:25e3,...e?{skipCache:!0,forceRefresh:!0}:{}};e&&typeof GoogleIntegration._invalidateSmartCacheForRead_=="function"&&GoogleIntegration._invalidateSmartCacheForRead_("getAllEmployees",{filters:{includeInactive:!0,lite:!0},skipCache:!0,forceRefresh:!0});const a=await GoogleIntegration.sendRequest({action:"getAllEmployees",data:t});if(a&&a.success&&Array.isArray(a.data))return a.data.length===0&&(AppState.appData.employees||[]).length>0?(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),!0):(this.applyEmployeesData_(a.data),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a.data.length} \u0645\u0648\u0638\u0641 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`),!0);if((AppState.appData.employees||[]).length>0)return this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),!0;AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F getAllEmployees \u0641\u0634\u0644\u060C \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0640 readFromSheet...");const i={sheetName:"Employees",spreadsheetId:AppState.googleConfig.sheets.spreadsheetId,__timeoutMs:25e3,skipCache:!0,forceRefresh:!0};typeof GoogleIntegration._invalidateSmartCacheForRead_=="function"&&GoogleIntegration._invalidateSmartCacheForRead_("readFromSheet",i);const o=await GoogleIntegration.sendRequest({action:"readFromSheet",data:i});if(o&&o.success&&Array.isArray(o.data))return o.data.length===0&&(AppState.appData.employees||[]).length>0?(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),!0):(this.applyEmployeesData_(o.data),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${o.data.length} \u0645\u0648\u0638\u0641 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL`),!0)}catch(t){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 Backend:",t),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),!1}return!1}catch(t){return AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A loadEmployeesFromBackend:",t),AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now()),!1}finally{this.cache.isUpdating=!1,typeof StableLoader<"u"&&StableLoader.endOwnedFetch("employees")}},async updateEmployeesInBackground(){if(!this.cache.isUpdating){this.cache.isUpdating=!0;try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return;const e={filters:{includeInactive:!0,lite:!0},__timeoutMs:25e3},t=await GoogleIntegration.sendRequest({action:"getAllEmployees",data:e});if(t&&t.success&&Array.isArray(t.data)){if(t.data.length===0&&(AppState.appData.employees||[]).length>0)return;const a=this._countNamedEmployees_(AppState.appData.employees),i=this.applyEmployeesData_(t.data),o=this._countNamedEmployees_(i),s=(AppState.appData.employees||[]).length,n=t.data.length;(s!==n||o!==a||o>0)&&(typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u{1F504} \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629 (${i.length} \u0645\u0648\u0638\u0641\u060C \u0623\u0633\u0645\u0627\u0621: ${o})`),window.dispatchEvent(new CustomEvent("employeesDataUpdated",{detail:{count:i.length}})))}}catch(e){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",e)}finally{this.cache.isUpdating=!1}}},startBackgroundUpdate(){this.config.backgroundUpdateTimer&&clearInterval(this.config.backgroundUpdateTimer),this.config.backgroundUpdateTimer=setInterval(()=>{this.updateEmployeesInBackground()},this.config.backgroundUpdateInterval),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0628\u062F\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0643\u0644 ${this.config.backgroundUpdateInterval/6e4} \u062F\u0642\u064A\u0642\u0629)`)},stopBackgroundUpdate(){this.config.backgroundUpdateTimer&&(clearInterval(this.config.backgroundUpdateTimer),this.config.backgroundUpdateTimer=null)},cleanup(){try{AppState.debugMode&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Employees module..."),this.stopBackgroundUpdate(),this.handleDataUpdate&&(window.removeEventListener("employeesDataUpdated",this.handleDataUpdate),this.handleDataUpdate=null),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Employees module")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Employees module:",e)}},buildEmployeeTableRowElement_(e,t){const a=this.formatDateSafe(e.birthDate),i=this.formatDateSafe(e.hireDate),o=this.calculateAge(e.birthDate),s=this.isEmployeeInactive(e),n=document.createElement("tr");s&&(n.style.cssText="opacity: 0.7; background-color: #f8f9fa;");const r=(this._getDriveIdFromUrl(e.photo||"")||e.id||e.employeeNumber||e.name||"").toString(),c=this._normalizeEmployeePhotoUrl(e.photo,e.id),p=c&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(c):{canonical:c||"",displaySrc:c||"",needsProxy:!1,proxyFileId:""},d=p.canonical?p.displaySrc:"",m=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(p):"",y=this._employeeDisplayName_(e)||e.name||"",g=this._employeeActionId_(e);return n.innerHTML=`
            <td style="word-wrap: break-word;">
                ${c?`<img data-emp-photo="1" data-photo-key="${Utils.escapeHTML(r)}" src="${Utils.escapeHTML(d)}" alt="${Utils.escapeHTML(y)}"${m} class="w-12 h-12 rounded-full object-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer">`:'<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>'}
            </td>
            <td style="word-wrap: break-word; white-space: normal;">
                ${Utils.escapeHTML(e.employeeNumber||"")}
                ${s?`<span class="badge badge-warning ml-2" style="font-size: 10px; padding: 2px 6px;">${this.t("module.employees.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")}</span>`:""}
            </td>
            <td style="word-wrap: break-word; white-space: normal; max-width: 200px;">
                ${Utils.escapeHTML(y)}
                ${s&&e.resignationDate?`<br><span class="text-xs text-gray-500" style="font-size: 11px;">${this.t("module.employees.resignedOn","\u0627\u0633\u062A\u0642\u0627\u0644")}: ${this.formatDateSafe(e.resignationDate)}</span>`:""}
            </td>
            <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(e.department||"")}</td>
            <td style="word-wrap: break-word; white-space: normal; max-width: 150px;">${Utils.escapeHTML(e.job||e.position||"")}</td>
            <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(e.nationalId||"")}</td>
            <td style="word-wrap: break-word; white-space: normal;">${a||""}</td>
            <td style="word-wrap: break-word; white-space: normal;">${o?o+" "+this.t("module.common.yearsUnit","\u0633\u0646\u0629"):""}</td>
            <td style="word-wrap: break-word; white-space: normal;">${i||""}</td>
            <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(e.gender||"")}</td>
            <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(e.phone||"")}</td>
            <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(e.insuranceNumber||"")}</td>
            ${t?`
            <td style="min-width: 170px;">
                <div class="flex items-center gap-2 flex-wrap">
                    <button onclick="Employees.viewEmployee('${g}')" class="btn-icon btn-icon-info" title="${this.t("module.common.view","\u0639\u0631\u0636")}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="Employees.printEmployee('${g}')" class="btn-icon" style="color: #2563eb; background: #eff6ff; border-color: #bfdbfe;" title="${this.t("module.common.print","\u0637\u0628\u0627\u0639\u0629 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629")}">
                        <i class="fas fa-print"></i>
                    </button>
                    <button onclick="Employees.editEmployee('${g}')" class="btn-icon btn-icon-primary" title="${this.t("module.common.edit","\u062A\u0639\u062F\u064A\u0644")}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="Employees.resetFieldPortalPin('${g}', '${encodeURIComponent(e.name||e.fullName||"")}')" class="btn-icon" style="color: #d97706; background: #fffbeb; border-color: #fde68a;" title="\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0631\u0645\u0632 PIN \u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629">
                        <i class="fas fa-key"></i>
                    </button>
                    <button onclick="Employees.deactivateEmployee('${g}')" class="btn-icon btn-icon-danger" title="${this.t("module.employees.deactivate","\u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644")}">
                        <i class="fas fa-user-slash"></i>
                    </button>
                </div>
            </td>
            `:`
            <td style="min-width: 90px;">
                <div class="flex items-center gap-2">
                    <button onclick="Employees.viewEmployee('${g}')" class="btn-icon btn-icon-info" title="${this.t("module.common.view","\u0639\u0631\u0636")}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="Employees.printEmployee('${g}')" class="btn-icon" style="color: #2563eb; background: #eff6ff; border-color: #bfdbfe;" title="${this.t("module.common.print","\u0637\u0628\u0627\u0639\u0629 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629")}">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            </td>
            `}
        `,n},fillEmployeesTbodyPaged_(e,t,a,i){if(!e)return;const o=Array.isArray(t)?t:[],s=Math.max(40,parseInt(this.config.listPageSize,10)||100);if(i){this._listRowsCache=o,this._listVisibleCount=0,this._listCanEdit=!!a,e.innerHTML="";const d=document.getElementById("employees-load-more-wrap");d&&d.remove()}const n=this._listVisibleCount||0,l=Math.min(o.length,n+s),r=document.createDocumentFragment();for(let d=n;d<l;d++)r.appendChild(this.buildEmployeeTableRowElement_(o[d],this._listCanEdit));e.appendChild(r),this._listVisibleCount=l;let c=document.getElementById("employees-load-more-wrap");const p=e.closest(".table-wrapper")||e.parentElement?.parentElement;if(l<o.length){if(!c&&p&&p.parentElement&&(c=document.createElement("div"),c.id="employees-load-more-wrap",c.style.cssText="padding:12px;text-align:center;",p.parentElement.appendChild(c)),c){c.innerHTML=`
                    <button type="button" id="employees-load-more-btn" class="btn-secondary">
                        <i class="fas fa-chevron-down ml-2"></i>
                        \u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064A\u062F (${l} / ${o.length})
                    </button>`;const d=c.querySelector("#employees-load-more-btn");d&&d.addEventListener("click",()=>{this.fillEmployeesTbodyPaged_(e,this._listRowsCache||o,this._listCanEdit,!1);const m=document.getElementById("employees-table-container");m&&(this._setupEmployeePhotoFallbacks(m),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(m))})}}else c&&c.remove()},async loadEmployeesList(e=!1){const t=document.getElementById("employees-table-container");if(!t){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F employees-table-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A loadEmployeesList");return}let a=(AppState.appData.employees||[]).map(p=>this.sanitizeEmployeeRecordDrift_({...p||{}}));if(AppState.appData.employees=a,AppState.debugMode&&Utils.safeLog(`\u{1F4CA} loadEmployeesList: \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 = ${a.length}, showInactive = ${e}`),e)AppState.debugMode&&Utils.safeLog(`\u{1F4CA} \u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646: ${a.length}`);else{const p=a.length,d=a.filter(m=>!this.isEmployeeInactive(m));d.length===0&&p>0?Utils.safeWarn(`\u26A0\uFE0F \u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 \u0623\u062E\u0641\u062A ${p} \u0645\u0648\u0638\u0641\u0627\u064B \u2014 \u0639\u0631\u0636 \u0627\u0644\u0643\u0644 \u0645\u0624\u0642\u062A\u0627\u064B \u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0648\u0627\u062C\u0647\u0629`):a=d,AppState.debugMode&&Utils.safeLog(`\u{1F4CA} \u0628\u0639\u062F \u0627\u0644\u062A\u0635\u0641\u064A\u0629 (\u0646\u0634\u0637\u064A\u0646): ${a.length} \u0645\u0646 ${p}`)}this.renderStatsCards(),this.updateInactiveCount();const i=this.canAddOrImport(),o=this.canEditOrDelete(),s=document.createDocumentFragment();if(a.length===0){const p=document.createElement("div");p.className="empty-state",p.innerHTML=`
                <i class="fas fa-user-tie text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">${this.t("module.employees.emptyList","\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0633\u062C\u0644\u064A\u0646")}</p>
                ${i?`
                <button id="add-employee-empty-btn" class="btn-primary mt-4">
                    <i class="fas fa-plus ml-2"></i>
                    ${this.t("module.employees.addNewEmployee","\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F")}
                </button>
                `:""}
            `,s.appendChild(p),t.innerHTML="",t.appendChild(s),requestAnimationFrame(()=>{const d=document.getElementById("add-employee-empty-btn");d&&this.canAddOrImport()&&d.addEventListener("click",()=>this.showForm())});return}const n=document.createElement("div");n.className="table-wrapper",n.style.cssText="width: 100%; max-width: 100%; overflow-x: auto;";const l=document.createElement("table");l.className="data-table table-header-blue",l.style.cssText="width: 100%; min-width: 100%; table-layout: auto;";const r=document.createElement("thead");r.innerHTML=`
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
        `;const c=document.createElement("tbody");l.appendChild(r),l.appendChild(c),n.appendChild(l),s.appendChild(n),t.innerHTML="",t.appendChild(s),this.fillEmployeesTbodyPaged_(c,a,o,!0),this.applyModuleI18n(t),typeof requestIdleCallback=="function"?requestIdleCallback(()=>{this._setupEmployeePhotoFallbacks(t),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(t,{onFetchFail:p=>{try{const d=(p.dataset.photoKey||"").trim();d&&sessionStorage.setItem(this._photoFailKey(d),Date.now().toString())}catch{}try{const d=p.parentElement;d&&(d.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}}})},{timeout:600}):setTimeout(()=>{this._setupEmployeePhotoFallbacks(t),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(t,{onFetchFail:p=>{try{const d=(p.dataset.photoKey||"").trim();d&&sessionStorage.setItem(this._photoFailKey(d),Date.now().toString())}catch{}try{const d=p.parentElement;d&&(d.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}}})},0),this.populateFilters(),requestAnimationFrame(async()=>{try{const p=this.getFilterValues();(p.search||p.department||p.branch||p.location||p.job||p.position||p.gender||p.showInactive)&&await this.applyFilters()}catch(p){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",p)}})},populateFilters(){const e=AppState.appData.employees||[],t=[...new Set(e.map(d=>d.department).filter(Boolean))].sort(),a=[...new Set(e.map(d=>d.branch).filter(Boolean))].sort(),i=[...new Set(e.map(d=>d.location).filter(Boolean))].sort(),o=[...new Set(e.map(d=>d.job||d.position).filter(Boolean))].sort(),s=[...new Set(e.map(d=>d.position||d.job).filter(Boolean))].sort(),n=document.getElementById("employee-filter-department");if(n){const d=n.value;n.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+t.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===d?"selected":""}>${Utils.escapeHTML(m)}</option>`).join("")}const l=document.getElementById("employee-filter-branch");if(l){const d=l.value;l.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+a.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===d?"selected":""}>${Utils.escapeHTML(m)}</option>`).join("")}const r=document.getElementById("employee-filter-location");if(r){const d=r.value;r.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+i.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===d?"selected":""}>${Utils.escapeHTML(m)}</option>`).join("")}const c=document.getElementById("employee-filter-job");if(c){const d=c.value;c.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+o.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===d?"selected":""}>${Utils.escapeHTML(m)}</option>`).join("")}const p=document.getElementById("employee-filter-position");if(p){const d=p.value;p.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+s.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===d?"selected":""}>${Utils.escapeHTML(m)}</option>`).join("")}},setupEventListeners(){setTimeout(()=>{window.removeEventListener("employeesDataUpdated",this.handleDataUpdate),this.handleDataUpdate=h=>{if(h.detail?.externalWorkforce){clearTimeout(this._employeesUpdateDebounceTimer),this._externalWorkforceCache.clear(),this._employeesUpdateDebounceTimer=setTimeout(()=>{document.getElementById("external-workforce-table-container")&&this.renderExternalWorkforceTable()},60);return}if(this.activeTab==="data-analysis"&&document.getElementById("emp-analytics-root")){clearTimeout(this._employeesUpdateDebounceTimer),this._employeesUpdateDebounceTimer=setTimeout(()=>{this.updateEmployeesAnalyticsDashboard().catch(()=>{})},120);return}h.detail&&h.detail.count&&(clearTimeout(this._employeesUpdateDebounceTimer),this._employeesUpdateDebounceTimer=setTimeout(()=>{document.getElementById("employees-table-container")?requestAnimationFrame(()=>setTimeout(()=>this.loadEmployeesList(),0)):this.renderStatsCards()},120))},window.addEventListener("employeesDataUpdated",this.handleDataUpdate),document.querySelectorAll("[data-employees-tab]").forEach(h=>{h.dataset.empTabBound!=="1"&&(h.dataset.empTabBound="1",h.addEventListener("click",()=>this.switchTab(h.getAttribute("data-employees-tab")||"employees-list")))}),this.ensureExternalWorkforceToolbar();const e=document.getElementById("external-workforce-year");e&&e.addEventListener("change",async h=>{const f=Number(h.target.value);!Number.isFinite(f)||f<2e3||(this.externalWorkforceYear=f,await this.ensureExternalWorkforceDataLoaded(),this.renderExternalWorkforceTable())});const t=document.getElementById("external-workforce-table-container");if(t){const h=async f=>{const x=f.target;!x||!x.matches(".external-workforce-input")||await this.saveExternalWorkforceValue(x.getAttribute("data-contractor-key")||"",x.getAttribute("data-month")||"",x.value)};t.addEventListener("change",h),t.addEventListener("blur",h,!0)}document.getElementById("external-workforce-export-excel-btn")?.addEventListener("click",()=>{this.exportExternalWorkforceToExcel()}),document.getElementById("external-workforce-export-pdf-btn")?.addEventListener("click",()=>{this.exportExternalWorkforceToPDF()});const a=document.getElementById("external-workforce-import-excel-btn"),i=document.getElementById("external-workforce-import-input");a&&i&&(a.addEventListener("click",()=>i.click()),i.addEventListener("change",async h=>{const f=h.target.files?.[0];f&&(await this.importExternalWorkforceExcelFile(f),h.target.value="")})),this.canViewExternalWorkforceTab()&&(this.populateExternalWorkforceYearSelector(),this.activeTab==="external-workforce"&&this.ensureExternalWorkforceDataLoaded().then(()=>this.renderExternalWorkforceTable()).catch(()=>{}));const o=document.getElementById("add-employee-btn"),s=document.getElementById("add-employee-empty-btn"),n=document.getElementById("import-employees-excel-btn"),l=document.getElementById("refresh-employees-btn"),r=document.getElementById("refresh-employee-names-btn"),c=document.getElementById("delete-all-employees-btn");if(AppState.debugMode&&Utils.safeLog("\u{1F50D} \u0641\u062D\u0635 \u0627\u0644\u0623\u0632\u0631\u0627\u0631:",{refreshBtn:!!l,refreshNamesBtn:!!r,deleteAllBtn:!!c,searchInput:!!document.getElementById("employees-search"),filterSearchInput:!!document.getElementById("employees-search-filter")}),o&&this.canAddOrImport()&&o.addEventListener("click",()=>this.showForm()),s&&this.canAddOrImport()&&s.addEventListener("click",()=>this.showForm()),n&&this.canAddOrImport()&&n.addEventListener("click",()=>this.showImportExcel()),document.getElementById("export-employees-excel-btn")?.addEventListener("click",()=>{this.exportToExcel()}),document.getElementById("print-employees-registry-btn")?.addEventListener("click",()=>{this.printEmployeesRegistry()}),l){const h=l.cloneNode(!0);l.parentNode.replaceChild(h,l),h.addEventListener("click",async()=>{h.disabled=!0;const f=h.innerHTML;h.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B...',typeof Loading<"u"&&Loading.show();try{if(await this.loadEmployeesFromBackend(!0)){const w=document.getElementById("show-inactive-employees")?.checked||!1;await this.loadEmployeesList(w),await this.applyFilters(),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}else typeof Notification<"u"&&Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u062F\u064A\u062F\u0629")}catch(x){typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+x.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",x)}finally{typeof Loading<"u"&&Loading.hide(),h.disabled=!1,h.innerHTML=f}})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");r&&this.canAddOrImport()&&r.addEventListener("click",async()=>this.refreshEmployeeNames());const p=document.getElementById("report-employee-duplicates-btn");p&&this.canAddOrImport()&&p.addEventListener("click",async()=>this.reportEmployeeDuplicates());const d=document.getElementById("cleanup-employee-duplicates-btn");d&&this.canAddOrImport()&&d.addEventListener("click",async()=>this.cleanupDuplicateEmployees()),c&&this.canAddOrImport()&&c.addEventListener("click",async()=>this.deleteAllEmployees());const m=document.getElementById("employees-search");if(m){const h=m.cloneNode(!0);m.parentNode.replaceChild(h,m);let f=null;const x=async()=>{try{const w=document.getElementById("employees-search-filter");w&&w.value!==h.value&&(w.value=h.value),await this.applyFilters()}catch(w){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0628\u062D\u062B:",w)}};h.addEventListener("input",()=>{f&&clearTimeout(f),f=setTimeout(x,250)}),h.addEventListener("keydown",async w=>{w.key==="Enter"&&(w.preventDefault(),f&&clearTimeout(f),await x())})}const y=document.getElementById("employees-search-filter");if(y){const h=y.cloneNode(!0);y.parentNode.replaceChild(h,y);let f=null;const x=async()=>{try{const w=document.getElementById("employees-search");w&&w.value!==h.value&&(w.value=h.value),await this.applyFilters()}catch(w){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0628\u062D\u062B:",w)}};h.addEventListener("input",()=>{f&&clearTimeout(f),f=setTimeout(x,250)}),h.addEventListener("keydown",async w=>{w.key==="Enter"&&(w.preventDefault(),f&&clearTimeout(f),await x())})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");["employee-filter-department","employee-filter-branch","employee-filter-location","employee-filter-job","employee-filter-position","employee-filter-gender"].forEach(h=>{const f=document.getElementById(h);f&&f.addEventListener("change",async()=>{try{await this.applyFilters()}catch(x){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631:",x)}})});const b=document.getElementById("employee-reset-filters");if(b){const h=b.cloneNode(!0);b.parentNode.replaceChild(h,b),h.addEventListener("click",async()=>{try{await this.resetFilters()}catch(f){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",f),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631")}})}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");let u=document.getElementById("show-inactive-employees");if(u){const h=u.cloneNode(!0);u.parentNode.replaceChild(h,u),h.addEventListener("change",async f=>{const x=f.target.checked;AppState.debugMode&&Utils.safeLog(`\u{1F504} \u062A\u063A\u064A\u064A\u0631 \u062D\u0627\u0644\u0629 \u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646: ${x?"\u0639\u0631\u0636":"\u0625\u062E\u0641\u0627\u0621"}`);try{typeof Loading<"u"&&Loading.show();const w=document.getElementById("show-inactive-employees-container");w&&(x?(w.style.background="linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",w.style.borderColor="#dc2626",w.style.boxShadow="0 4px 12px rgba(220, 38, 38, 0.2)"):(w.style.background="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",w.style.borderColor="#dee2e6",w.style.boxShadow="none")),await this.loadEmployeesList(x);const S=document.getElementById("show-inactive-employees");S&&S.checked!==x&&(S.checked=x),await this.applyFilters(),this.updateInactiveCount(),typeof Notification<"u"&&Notification.success(x?"\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 (\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646)":"\u062A\u0645 \u0625\u062E\u0641\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646")}catch(w){h.checked=!x,AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",w),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}finally{typeof Loading<"u"&&Loading.hide(),this.updateInactiveCount()}}),this.updateInactiveCount(),setTimeout(()=>this.updateInactiveCount(),300)}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0632\u0631 \u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");window.addEventListener("employeesDataUpdated",()=>{this.updateInactiveCount(),setTimeout(()=>this.updateInactiveCount(),100)}),requestAnimationFrame(async()=>{try{const h=this.getFilterValues();(h.search||h.department||h.branch||h.location||h.job||h.position||h.gender||h.showInactive)&&await this.applyFilters()}catch(h){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",h)}});const v=document.getElementById("employee-form");v&&v.addEventListener("submit",h=>this.handleSubmit(h));const E=document.getElementById("cancel-employee-btn");E&&E.addEventListener("click",()=>this.showList()),this.setupPhotoPreview()},100)},async refreshEmployeeNames(){if(!this.canAddOrImport()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0646\u0641\u064A\u0630 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}const e=document.getElementById("refresh-employee-names-btn"),t=e?.innerHTML;e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621...'),typeof Loading<"u"&&Loading.show();try{await this.loadEmployeesFromBackend(!0);const a=Array.isArray(AppState.appData.employees)?AppState.appData.employees:[];if(a.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646");return}let i=0;const o=a.map(n=>{const l=n?.name??"",r=String(l).replace(/\s+/g," ").trim();return r!==String(l)&&i++,{...n,name:r}});AppState.appData.employees=o,this.cache.data=o,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.autoSave("Employees",AppState.appData.employees);const s=document.getElementById("show-inactive-employees")?.checked||!1;this.renderStatsCards(),this.loadEmployeesList(s),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(n){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",n)}}),Notification?.success?.(i>0?`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621 (${i} \u062A\u0639\u062F\u064A\u0644\u0627\u062A)`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u0623\u0633\u0645\u0627\u0621")}catch(a){Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0633\u0645\u0627\u0621: "+(a?.message||a)),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",a)}finally{typeof Loading<"u"&&Loading.hide(),e&&(e.disabled=!1,e.innerHTML=t)}},async deleteAllEmployees(){if(!this.canAddOrImport()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0646\u0641\u064A\u0630 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}if(!window.confirm("\u062A\u062D\u0630\u064A\u0631: \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646. \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F\u061F"))return;const t=window.prompt("\u0623\u062F\u062E\u0644 \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0633\u0631\u064A \u0644\u0644\u062D\u0630\u0641:");if(t===null){Notification?.warning?.("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");return}const a=document.getElementById("delete-all-employees-btn"),i=a?.innerHTML;a&&(a.disabled=!0,a.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0630\u0641...');try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.callBackend)throw new Error("GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");const o=await GoogleIntegration.callBackend("deleteAllEmployees",{pin:String(t||"").trim()});if(!o||!o.success)throw new Error(o?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");AppState.appData.employees=[],this.cache.data=[],this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.renderStatsCards();const s=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(s),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(n){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",n)}}),Notification?.success?.(o?.message||"\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0628\u0646\u062C\u0627\u062D")}catch(o){Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(o?.message||o))}finally{a&&(a.disabled=!1,a.innerHTML=i)}},async reportEmployeeDuplicates(){if(!this.canAddOrImport()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0646\u0641\u064A\u0630 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}if(typeof GoogleIntegration>"u"||!GoogleIntegration.callBackend){Notification?.error?.("GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");return}const e=document.getElementById("report-employee-duplicates-btn"),t=e?.innerHTML;e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0641\u062D\u0635...');try{Loading?.show?.("\u062C\u0627\u0631\u064A \u0641\u062D\u0635 \u0645\u0643\u0631\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646...");const a=await GoogleIntegration.callBackend("reportEmployeeDuplicates",{sampleLimit:30,__timeoutMs:12e4});if(Loading?.hide?.(),!a||!a.success)throw new Error(a?.message||"\u0641\u0634\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A");const i=[a.message||"","",`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${a.totalRows??"\u2014"}`,`\u0645\u0641\u0627\u062A\u064A\u062D \u0641\u0631\u064A\u062F\u0629: ${a.uniqueKeys??"\u2014"}`,`\u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0645\u0643\u0631\u0631\u0629: ${a.duplicateGroupCount??0}`,`\u0635\u0641\u0648\u0641 \u0632\u0627\u0626\u062F\u0629 \u0645\u0631\u0634\u062D\u0629 \u0644\u0644\u062D\u0630\u0641: ${a.rowsToDeleteCount??0}`,`\u0633\u064A\u062A\u0628\u0642\u0649 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641: ${a.keepCount??"\u2014"}`,`\u0635\u0641\u0648\u0641 \u0645\u0646\u0632\u0627\u062D\u0629 \u0623\u0639\u0645\u062F\u0629: ${a.driftedCount??0}`,`\u0635\u0641\u0648\u0641 \u064A\u062A\u064A\u0645\u0629 \u0628\u0644\u0627 \u0645\u0641\u062A\u0627\u062D: ${a.orphanCount??0}`],o=Array.isArray(a.duplicateGroupsSample)?a.duplicateGroupsSample.slice(0,8):[];o.length&&(i.push("","\u0639\u064A\u0651\u0646\u0629 \u0645\u062C\u0645\u0648\u0639\u0627\u062A:"),o.forEach(s=>{i.push(`- ${s.key} \xD7${s.count} (\u064A\u064F\u0628\u0642\u0649 \u0635\u0641 ${s.keepSheetRow}: ${s.keepName||"\u2014"})`)})),window.alert(i.join(`
`)),Notification?.success?.(a.message||"\u0627\u0643\u062A\u0645\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A")}catch(a){Loading?.hide?.(),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A: "+(a?.message||a))}finally{e&&(e.disabled=!1,e.innerHTML=t)}},async cleanupDuplicateEmployees(){if(!this.canAddOrImport()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0646\u0641\u064A\u0630 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}if(typeof GoogleIntegration>"u"||!GoogleIntegration.callBackend){Notification?.error?.("GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");return}const e=document.getElementById("cleanup-employee-duplicates-btn"),t=e?.innerHTML;e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u0645\u0639\u0627\u064A\u0646\u0629...');try{Loading?.show?.("\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A (\u0628\u062F\u0648\u0646 \u062D\u0630\u0641)...");const a=await GoogleIntegration.callBackend("cleanupDuplicateEmployees",{dryRun:!0,__timeoutMs:12e4});if(Loading?.hide?.(),!a||!a.success)throw new Error(a?.message||"\u0641\u0634\u0644\u062A \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u062A\u0646\u0638\u064A\u0641");const i=a.rowsToDeleteCount||0;if(i<=0){window.alert(a.message||"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0643\u0631\u0631\u0627\u062A \u0644\u0644\u062D\u0630\u0641"),Notification?.success?.(a.message||"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0643\u0631\u0631\u0627\u062A");return}if(!window.confirm(`${a.message||""}

\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${a.totalRows??"\u2014"}
\u0633\u064A\u064F\u062D\u0630\u0641: ${i}
\u0633\u064A\u064F\u0628\u0642\u0649: ${a.keepCount??"\u2014"}

\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0648\u0631\u0642\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 Employees_backup_* \u0642\u0628\u0644 \u0627\u0644\u062D\u0630\u0641.
\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u0637\u0644\u0628 \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0633\u0631\u064A\u061F`)){Notification?.warning?.("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0646\u0638\u064A\u0641");return}const s=window.prompt("\u0623\u062F\u062E\u0644 \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0633\u0631\u064A \u0644\u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A (EMPLOYEES_DELETE_PIN):");if(s===null){Notification?.warning?.("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");return}e&&(e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0638\u064A\u0641...'),Loading?.show?.("\u062C\u0627\u0631\u064A \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A \u0645\u0639 \u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629...");const n=await GoogleIntegration.callBackend("cleanupDuplicateEmployees",{pin:String(s||"").trim(),execute:!0,__timeoutMs:18e4});if(Loading?.hide?.(),!n||!n.success)throw new Error(n?.message||"\u0641\u0634\u0644 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A");window.alert(`${n.message||"\u062A\u0645 \u0627\u0644\u062A\u0646\u0638\u064A\u0641"}
\u0645\u062D\u0630\u0648\u0641: ${n.deletedCount??0}
\u0627\u062D\u062A\u064A\u0627\u0637\u064A: ${n.backupSheetName||"\u2014"}`);try{await this.ensureEmployeesLoaded(!0)}catch{const r=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(r)}this.renderStatsCards(),requestAnimationFrame(()=>{try{this.applyFilters()}catch{}}),Notification?.success?.(n.message||"\u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A")}catch(a){Loading?.hide?.(),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A: "+(a?.message||a))}finally{e&&(e.disabled=!1,e.innerHTML=t)}},setupPhotoPreview(){const e=document.getElementById("employee-photo-input"),t=document.getElementById("employee-photo-preview"),a=document.getElementById("employee-photo-icon");e&&t&&a&&e.addEventListener("change",i=>{const o=i.target.files[0];if(o){const s=new FileReader;s.onload=n=>{t.src=n.target.result,t.style.display="block",a.style.display="none"},s.readAsDataURL(o)}})},currentEditId:null,async showForm(e=null){if(!e&&!this.canAddOrImport()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F");return}if(e&&!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641");return}this.currentEditId=e?.id||null;const t=document.getElementById("employees-content");t&&(t.innerHTML=await this.renderForm(e),this.applyModuleI18n(t),this.setupEventListeners())},async renderForm(e=null){const t=!!e;return`
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
        `},normalizeEmployeeImportKey(e){return e==null?"":String(e).trim().replace(/\s+/g,"")},buildEmployeeImportExistingKeySet(e){const t=new Set,a=Array.isArray(e)?e:AppState.appData.employees||[];for(let i=0;i<a.length;i++){const o=a[i];if(!o)continue;const s=this.normalizeEmployeeImportKey(o.employeeNumber||o.id),n=this.normalizeEmployeeImportKey(o.sapId),l=this.normalizeEmployeeImportKey(o.id);s&&t.add(s),n&&t.add(n),l&&t.add(l)}return t},employeeImportKeysMatchExisting(e,t,a){const i=this.normalizeEmployeeImportKey(e),o=this.normalizeEmployeeImportKey(t);return a instanceof Set?!!(i&&a.has(i)||o&&a.has(o)):!!this.findExistingEmployeeByImportKey(e,t)},findExistingEmployeeByImportKey(e,t){const a=this.normalizeEmployeeImportKey(e),i=this.normalizeEmployeeImportKey(t);return(AppState.appData.employees||[]).find(s=>{const n=this.normalizeEmployeeImportKey(s.employeeNumber||s.id),l=this.normalizeEmployeeImportKey(s.sapId),r=this.normalizeEmployeeImportKey(s.id);return!!(a&&(n===a||r===a||l===a)||i&&(l===i||n===i||r===i))})||null},parseEmployeeImportRow(e,t){const a=l=>l==null?"":String(l).trim(),i=a(e["\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638"]||e["\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"]||e["Employee Name"]||e.Name||e.name||""),o=a(e["ID SAP"]||e["\u0631\u0642\u0645 SAP"]||e["SAP ID"]||e.sap_id||""),n=a(e["\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"]||e["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]||e["Employee Number"]||e.employee_number||"")||o;return{uid:t,name:i,sapId:o,employeeNumber:n,hireDate:a(e["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646"]||e["Hire Date"]||e.hire_date||""),job:a(e.Job||e.job||e.\u0627\u0644\u0645\u0646\u0635\u0628||""),department:a(e.Department||e.department||e.\u0627\u0644\u0642\u0633\u0645||""),branch:a(e.Branch||e.branch||e.\u0627\u0644\u0631\u0639||e.\u0627\u0644\u0641\u0631\u0639||""),location:a(e.Location||e.location||e.\u0627\u0644\u0645\u0648\u0642\u0639||""),gender:a(e.Gender||e.gender||e.\u0627\u0644\u062C\u0646\u0633||""),nationalId:a(e["\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u0649"]||e["\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0648\u0645\u064A"]||e["National ID"]||e.national_id||""),birthDate:a(e["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F"]||e["Date of Birth"]||e.birth_date||""),email:a(e.Email||e.email||e["\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"]||""),phone:a(e.Phone||e.phone||e.\u0627\u0644\u0647\u0627\u062A\u0641||e.\u0627\u0644\u0647\u0627\u062A||""),insuranceNumber:a(e["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A"]||e["Insurance Number"]||e.insurance_number||e["\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646"]||""),status:"invalid"}},getEmployeeImportHireMonths(){const e=parseInt(AppState?.companySettings?.employeeImportHireMonths,10);return!isNaN(e)&&e>=1&&e<=120?e:3},getEmployeeImportHireWindowLabel(){const e=this.getEmployeeImportHireMonths();return e===1?"\u0622\u062E\u0631 \u0634\u0647\u0631 \u0648\u0627\u062D\u062F":`\u0622\u062E\u0631 ${e} \u0623\u0634\u0647\u0631`},isEmployeeImportHireDateAllowed(e){const t=this.normalizeDateOnly(e);if(!t)return!1;const a=new Date(`${t}T12:00:00`);if(Number.isNaN(a.getTime()))return!1;const i=new Date;i.setHours(12,0,0,0);const o=new Date(i);return o.setMonth(o.getMonth()-this.getEmployeeImportHireMonths()),a.getTime()>=o.getTime()&&a.getTime()<=i.getTime()},classifyEmployeeImportDraft(e,t,a){const i=this.normalizeEmployeeImportKey(e.employeeNumber),o=this.normalizeEmployeeImportKey(e.sapId),s=i||o;if(e._dupInFile=!1,e._hireDateRejected=!1,!s||!String(e.name||"").trim())return e.status="invalid",e;if(t){if(t.has(s))return e.status="invalid",e._dupInFile=!0,e;t.add(s)}return this.employeeImportKeysMatchExisting(e.employeeNumber,e.sapId,a)?(e.status="exists",e):this.isEmployeeImportHireDateAllowed(e.hireDate)?(e.status="new",e):(e.status="invalid",e._hireDateRejected=!0,e)},getEmployeeImportCounts(e){const t=Array.isArray(e)?e:[];return{total:t.length,newCount:t.filter(a=>a.status==="new").length,existsCount:t.filter(a=>a.status==="exists").length,invalidCount:t.filter(a=>a.status==="invalid").length,hireDateRejectedCount:t.filter(a=>a._hireDateRejected).length}},reclassifyAllEmployeeImportDrafts(e,t){const a=new Set,i=t instanceof Set?t:this.buildEmployeeImportExistingKeySet();return e.forEach(o=>{o._dupInFile=!1,this.classifyEmployeeImportDraft(o,a,i)}),e},async yieldEmployeeImportUi_(){await new Promise(e=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>setTimeout(e,0)):setTimeout(e,0)})},buildEmployeeFromImportDraft(e){const t=this.normalizeEmployeeImportKey(e.employeeNumber)||this.normalizeEmployeeImportKey(e.sapId);if(!t||!String(e.name||"").trim()||!this.isEmployeeImportHireDateAllowed(e.hireDate))return null;const a=this.normalizeDateOnly(e.hireDate);if(!a)return null;const i=new Date().toISOString();return{id:t,name:String(e.name||"").trim(),employeeNumber:t,sapId:String(e.sapId||"").trim(),hireDate:a,job:String(e.job||"").trim(),position:String(e.job||"").trim(),department:String(e.department||"").trim(),branch:String(e.branch||"").trim(),location:String(e.location||"").trim(),gender:String(e.gender||"").trim(),nationalId:String(e.nationalId||"").trim(),birthDate:this.normalizeDateOnly(e.birthDate),email:String(e.email||"").trim(),phone:String(e.phone||"").trim(),insuranceNumber:String(e.insuranceNumber||"").trim(),photo:"",status:"active",createdAt:i,updatedAt:i}},renderEmployeeImportReview(e,t){const a=e.querySelector("#employee-import-summary"),i=e.querySelector("#employee-import-preview"),o=e.querySelector("#employee-import-new-body"),s=e.querySelector("#employee-import-confirm-btn");if(!a||!i||!o||!s)return;const n=this.getEmployeeImportCounts(t),l=t.filter(c=>c.status==="new"),r=this.getEmployeeImportHireWindowLabel();if(a.innerHTML=`
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
                <span style="background:#dcfce7;color:#166534;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">
                    \u062C\u062F\u064A\u062F (\u0633\u064A\u064F\u0636\u0627\u0641): ${n.newCount}
                </span>
                <span style="background:#f1f5f9;color:#475569;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">
                    \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B (\u062A\u062E\u0637\u0651\u064A \u2014 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0636): ${n.existsCount}
                </span>
                <span style="background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">
                    \u0646\u0627\u0642\u0635/\u063A\u064A\u0631 \u0635\u0627\u0644\u062D: ${n.invalidCount}
                </span>
                <span style="background:#ffedd5;color:#9a3412;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">
                    \u062A\u0639\u064A\u064A\u0646 \u062E\u0627\u0631\u062C ${Utils.escapeHTML(r)} / \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: ${n.hireDateRejectedCount}
                </span>
                <span style="background:#e0f2fe;color:#075985;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">
                    \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0641: ${n.total}
                </span>
            </div>
            <p style="font-size:12px;color:#1e3a8a;margin:0;">
                \u0627\u0644\u062C\u062F\u0648\u0644 \u064A\u0639\u0631\u0636 \u0641\u0642\u0637 \u0627\u0644\u062C\u062F\u062F \u063A\u064A\u0631 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u064A\u0646 \u0628\u0627\u0644\u0646\u0638\u0627\u0645 \u0648\u062A\u0627\u0631\u064A\u062E \u062A\u0639\u064A\u064A\u0646\u0647\u0645 \u062E\u0644\u0627\u0644 ${Utils.escapeHTML(r)}. \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0648\u0646 \u0648\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646 \u0644\u0627 \u064A\u064F\u0639\u062F\u0651\u064E\u0644\u0648\u0646 \u0648\u0644\u0627 \u064A\u064F\u062D\u0630\u0641\u0648\u0646.
            </p>
        `,l.length===0)o.innerHTML=`
                <tr>
                    <td colspan="8" style="text-align:center;padding:16px;color:#64748b;">
                        \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u062C\u062F\u062F \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0644\u0641.
                    </td>
                </tr>
            `;else{const p=l.slice(0,200),d=l.length-p.length;o.innerHTML=p.map(m=>`
                <tr data-import-uid="${Utils.escapeHTML(m.uid)}">
                    <td><input type="text" class="form-input emp-imp-field" data-field="employeeNumber" value="${Utils.escapeHTML(m.employeeNumber||"")}" style="min-width:90px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="sapId" value="${Utils.escapeHTML(m.sapId||"")}" style="min-width:80px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="name" value="${Utils.escapeHTML(m.name||"")}" style="min-width:120px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="department" value="${Utils.escapeHTML(m.department||"")}" style="min-width:90px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="job" value="${Utils.escapeHTML(m.job||"")}" style="min-width:90px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="branch" value="${Utils.escapeHTML(m.branch||"")}" style="min-width:80px;padding:4px 6px;font-size:12px;"></td>
                    <td><input type="text" class="form-input emp-imp-field" data-field="hireDate" value="${Utils.escapeHTML(m.hireDate||"")}" style="min-width:90px;padding:4px 6px;font-size:12px;"></td>
                    <td style="white-space:nowrap;">
                        <button type="button" class="btn-icon btn-icon-danger emp-imp-remove" title="\u062D\u0630\u0641 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629" style="padding:4px 8px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join("")+(d>0?`<tr><td colspan="8" style="text-align:center;padding:12px;color:#075985;background:#e0f2fe;font-size:12px;">
                    \u064A\u064F\u0639\u0631\u0636 \u0623\u0648\u0644 200 \u0635\u0641 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629. ${d} \u0635\u0641 \u0625\u0636\u0627\u0641\u064A \u0633\u064A\u064F\u0636\u0627\u0641 \u0623\u064A\u0636\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u062A\u0623\u0643\u064A\u062F \u0628\u062F\u0648\u0646 \u0639\u0631\u0636.
                   </td></tr>`:"")}i.classList.remove("hidden"),s.disabled=n.newCount===0,s.innerHTML=n.newCount>0?`<i class="fas fa-check ml-2"></i>\u062A\u0623\u0643\u064A\u062F \u0625\u0636\u0627\u0641\u0629 ${n.newCount} \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F`:'<i class="fas fa-ban ml-2"></i>\u0644\u0627 \u064A\u0648\u062C\u062F \u062C\u062F\u062F \u0644\u0644\u0625\u0636\u0627\u0641\u0629'},async showImportExcel(){if(!this.canAddOrImport()){Notification.error(this.t("module.employees.noImportPermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"));return}const e=this.getEmployeeImportHireWindowLabel(),t=this.getEmployeeImportHireMonths(),a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
                                <li>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u0644\u0644\u062C\u062F\u062F \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u062E\u0644\u0627\u0644 <strong>${Utils.escapeHTML(e)}</strong> \u0645\u0646 \u064A\u0648\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F (\u0648\u0644\u064A\u0633 \u0645\u0633\u062A\u0642\u0628\u0644\u0627\u064B) \u2014 \u064A\u0636\u0628\u0637\u0647\u0627 \u0627\u0644\u0645\u062F\u064A\u0631 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A (${t} \u0634\u0647\u0631).</li>
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
                        <div id="employee-import-ready-hint" class="text-xs text-slate-500" hidden></div>
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
        `,this.applyModuleI18n(a),document.body.appendChild(a);const i=a.querySelector("#employee-excel-file-input"),o=a.querySelector("#employee-import-confirm-btn"),s=a.querySelector("#employee-import-ready-hint");let n=[],l=this.buildEmployeeImportExistingKeySet(),r=null,c=l.size>0;const p=()=>this.renderEmployeeImportReview(a,n),d=(m,y)=>{s&&(y&&m?(s.hidden=!1,s.textContent=m):(s.hidden=!0,s.textContent=""))};c||d("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0641\u0647\u0631\u0633 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u062D\u0627\u0644\u064A \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A\u2026",!0),(async()=>{try{await this.ensureEmployeesLoaded(!1)}catch{}a.isConnected&&(l=this.buildEmployeeImportExistingKeySet(),c=!0,d("",!1),n.length>0&&(this.reclassifyAllEmployeeImportDrafts(n,l),p()))})(),i.addEventListener("change",async m=>{const y=m.target.files[0];if(y){Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");try{if(c)l=this.buildEmployeeImportExistingKeySet();else{Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0641\u0647\u0631\u0633 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0644\u0644\u0645\u0637\u0627\u0628\u0642\u0629...");try{await this.ensureEmployeesLoaded(!1)}catch{}l=this.buildEmployeeImportExistingKeySet(),c=!0,d("",!1)}await this.yieldEmployeeImportUi_();const g=await y.arrayBuffer();Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0644\u064A\u0644 Excel..."),await this.yieldEmployeeImportUi_();const b=XLSX.read(g,{type:"array",cellDates:!0}),u=b.SheetNames[0],v=b.Sheets[u],E=XLSX.utils.sheet_to_json(v,{header:1,defval:"",raw:!1});if(E.length<2){Notification.error(this.t("module.employees.invalidFile","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D")),n=[],p(),Loading.hide();return}const h=E[0].map(I=>String(I||"").trim()),f=E.slice(1).map(I=>{const $={};return h.forEach((D,L)=>{const A=I[L];$[D]=A??""}),$}).filter(I=>h.some($=>String(I[$]||"").trim()!==""));l=this.buildEmployeeImportExistingKeySet();const x=new Set,w=Date.now();n=new Array(f.length);const S=400;for(let I=0;I<f.length;I+=S){const $=Math.min(I+S,f.length);Loading.show(`\u062C\u0627\u0631\u064A \u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0635\u0641\u0648\u0641... ${$} / ${f.length}`);for(let D=I;D<$;D++){const L=this.parseEmployeeImportRow(f[D],`imp-${D}-${w}`);n[D]=this.classifyEmployeeImportDraft(L,x,l)}await this.yieldEmployeeImportUi_()}Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0634\u0627\u0634\u0629 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629..."),await this.yieldEmployeeImportUi_(),p(),Loading.hide()}catch(g){Loading.hide(),Notification.error(this.t("module.employees.readFileFailed","\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641")+": "+g.message)}}}),a.addEventListener("change",m=>{const y=m.target.closest(".emp-imp-field");if(!y)return;const g=y.closest("tr[data-import-uid]");if(!g)return;const b=g.getAttribute("data-import-uid"),u=n.find(E=>E.uid===b);if(!u)return;const v=y.getAttribute("data-field");v&&(u[v]=y.value,r&&clearTimeout(r),r=setTimeout(()=>{this.reclassifyAllEmployeeImportDrafts(n,l),p()},180))}),a.addEventListener("click",m=>{const y=m.target.closest(".emp-imp-remove");if(y){const g=y.closest("tr[data-import-uid]");if(!g)return;const b=g.getAttribute("data-import-uid");n=n.filter(u=>u.uid!==b),this.reclassifyAllEmployeeImportDrafts(n,l),p();return}m.target===a&&a.remove()}),o.addEventListener("click",async()=>{const m=n.filter(u=>u.status==="new");if(m.length===0){Notification.warning("\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u062C\u062F\u062F \u0644\u0644\u0625\u0636\u0627\u0641\u0629");return}const y=this.getEmployeeImportCounts(n),g=this.getEmployeeImportHireWindowLabel();if(window.confirm(`\u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 ${m.length} \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F \u0641\u0642\u0637.
\u062A\u062E\u0637\u0651\u064A \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B: ${y.existsCount}
\u0646\u0627\u0642\u0635/\u063A\u064A\u0631 \u0635\u0627\u0644\u062D: ${y.invalidCount}
\u062A\u0639\u064A\u064A\u0646 \u062E\u0627\u0631\u062C ${g}: ${y.hireDateRejectedCount}

\u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0648\u0646 \u0648\u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646 \u0644\u0646 \u064A\u064F\u0639\u062F\u0651\u064E\u0644\u0648\u0627 \u0648\u0644\u0646 \u064A\u064F\u062D\u0630\u0641\u0648\u0627.
\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`)){Loading.show(`\u062C\u0627\u0631\u064A \u0625\u0636\u0627\u0641\u0629 ${m.length} \u0645\u0648\u0638\u0641...`);try{let u=0,v=0;const E=[],h=l instanceof Set?new Set(l):this.buildEmployeeImportExistingKeySet(),f=300;for(let w=0;w<m.length;w+=f){const S=Math.min(w+f,m.length);for(let I=w;I<S;I++){const $=m[I];try{if(this.employeeImportKeysMatchExisting($.employeeNumber,$.sapId,h)){v++;continue}const D=this.buildEmployeeFromImportDraft($);if(!D){v++;continue}if(this.employeeImportKeysMatchExisting(D.employeeNumber,D.sapId,h)){v++;continue}AppState.appData.employees.push(D),E.push(D);const L=this.normalizeEmployeeImportKey(D.employeeNumber),A=this.normalizeEmployeeImportKey(D.sapId),C=this.normalizeEmployeeImportKey(D.id);L&&h.add(L),A&&h.add(A),C&&h.add(C),u++}catch{v++}}Loading.show(`\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0636\u0627\u0641\u0629... ${S} / ${m.length}`),await this.yieldEmployeeImportUi_()}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),l=h,Loading.hide(),Notification.success(`\u0623\u064F\u0636\u064A\u0641 ${u} \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F \u0645\u062D\u0644\u064A\u0627\u064B`+(y.existsCount>0?` \u2014 \u062A\u064F\u062E\u0637\u064A \u0645\u0648\u062C\u0648\u062F ${y.existsCount}`:"")+(y.hireDateRejectedCount>0?` \u2014 \u062A\u0639\u064A\u064A\u0646 \u062E\u0627\u0631\u062C ${this.getEmployeeImportHireWindowLabel()} ${y.hireDateRejectedCount}`:"")+(y.invalidCount>y.hireDateRejectedCount?` \u2014 \u0646\u0627\u0642\u0635 ${y.invalidCount-y.hireDateRejectedCount}`:"")+(v>0?` \u2014 \u0627\u0633\u062A\u064F\u0628\u0639\u062F \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638 ${v}`:"")+(E.length>0?" \u2014 \u062C\u0627\u0631\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062C\u062F\u062F \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629":"")),a.remove(),this.renderStatsCards();const x=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(x),requestAnimationFrame(()=>{this.applyFilters()}),E.length>0&&this.syncImportedEmployeesToCloud_(E)}catch(u){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+u.message)}}})},async syncImportedEmployeesToCloud_(e){const t=Array.isArray(e)?e.filter(Boolean):[];if(!t.length||typeof GoogleIntegration>"u")return;if(typeof GoogleIntegration._isBackendRpcConfigured=="function"&&!GoogleIntegration._isBackendRpcConfigured()){Notification?.warning?.("\u062D\u064F\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u2014 \u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644 \u0644\u0644\u0645\u0632\u0627\u0645\u0646\u0629");return}const a=n=>({id:n.id,name:n.name,employeeNumber:n.employeeNumber,sapId:n.sapId,hireDate:n.hireDate,job:n.job||n.position||"",position:n.position||n.job||"",department:n.department||"",branch:n.branch||"",location:n.location||"",gender:n.gender||"",nationalId:n.nationalId||"",birthDate:n.birthDate||"",email:n.email||"",phone:n.phone||"",insuranceNumber:n.insuranceNumber||"",photo:"",status:n.status||"active",resignationDate:n.resignationDate||"",createdAt:n.createdAt||new Date().toISOString(),updatedAt:n.updatedAt||new Date().toISOString()}),i=40;let o=0,s=0;for(let n=0;n<t.length;n+=i){const l=t.slice(n,n+i).map(a);try{const r=typeof GoogleIntegration.sendRequest=="function"?GoogleIntegration.sendRequest({action:"appendToSheet",data:{sheetName:"Employees",data:l,__timeoutMs:9e4,userData:AppState.currentUser||{}}}):GoogleIntegration.sendToAppsScript("appendToSheet",{sheetName:"Employees",data:l,__timeoutMs:9e4,userData:AppState.currentUser||{}}),c=typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(r,95e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0645\u0632\u0627\u0645\u0646\u0629 \u062F\u0641\u0639\u0629 \u0645\u0648\u0638\u0641\u064A\u0646"):await r;c&&c.success?o+=l.length:(s+=l.length,Utils.safeWarn?.("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u062F\u0641\u0639\u0629 \u0645\u0648\u0638\u0641\u064A\u0646:",c?.message))}catch(r){s+=l.length,Utils.safeWarn?.("\u26A0\uFE0F \u062E\u0637\u0623 \u0645\u0632\u0627\u0645\u0646\u0629 \u062F\u0641\u0639\u0629 \u0645\u0648\u0638\u0641\u064A\u0646:",r?.message||r)}await this.yieldEmployeeImportUi_()}o>0&&s===0?Notification?.success?.(`\u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 ${o} \u0645\u0648\u0638\u0641\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629`):o>0&&s>0?Notification?.warning?.(`\u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 ${o} \u2014 \u062A\u0639\u0630\u0651\u0631 ${s}. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B.`):s>0&&Notification?.warning?.(`\u062D\u064F\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u2014 \u062A\u0639\u0630\u0651\u0631\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062D\u0627\u0628\u0629 (${s}). \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B \u0623\u0648 \u0645\u0646 \u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B.`)},_toCloudEmployeeRow_(e){const t=e&&typeof e=="object"?e:{};return{id:t.id,name:t.name,employeeNumber:t.employeeNumber,sapId:t.sapId,hireDate:t.hireDate,job:t.job||t.position||"",position:t.position||t.job||"",department:t.department||"",branch:t.branch||"",location:t.location||"",gender:t.gender||"",nationalId:t.nationalId||"",birthDate:t.birthDate||"",email:t.email||"",phone:t.phone||"",insuranceNumber:t.insuranceNumber||"",photo:t.photo||"",status:t.status||"active",resignationDate:t.resignationDate||"",createdAt:t.createdAt||new Date().toISOString(),updatedAt:t.updatedAt||new Date().toISOString()}},async syncEmployeeRecordToCloud_(e,t={}){if(!e||typeof GoogleIntegration>"u")return;if(typeof GoogleIntegration._isBackendRpcConfigured=="function"&&!GoogleIntegration._isBackendRpcConfigured()){Notification?.warning?.("\u062D\u064F\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u2014 \u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644 \u0644\u0644\u0645\u0632\u0627\u0645\u0646\u0629");return}const a=this._toCloudEmployeeRow_(e),i=!!t.isEdit,o=t.previousId||a.id;try{const s=await GoogleIntegration.sendRequest({action:i?"updateEmployee":"addEmployee",data:i?{employeeId:o,id:o,updateData:a,__timeoutMs:6e4,__highPriority:!0,__allowStructuredFailure:!0}:{...a,__timeoutMs:6e4,__highPriority:!0,__allowStructuredFailure:!0}});if(s&&s.success){Utils.safeLog?.("\u2705 \u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629");return}if(i&&s&&/غير موجود/.test(String(s.message||""))){const n=await GoogleIntegration.sendRequest({action:"addEmployee",data:{...a,__timeoutMs:6e4,__highPriority:!0,__allowStructuredFailure:!0}});if(n&&n.success)return}Notification?.warning?.(s?.message||"\u062D\u064F\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u2014 \u062A\u0639\u0630\u0651\u0631\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062D\u0627\u0628\u0629. \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")}catch(s){Notification?.warning?.("\u062D\u064F\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u2014 \u062A\u0639\u0630\u0651\u0631\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062D\u0627\u0628\u0629. \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."),Utils.safeWarn?.("\u26A0\uFE0F \u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0648\u0638\u0641:",s?.message||s)}},async handleSubmit(e){e.preventDefault();const t=e.target?.querySelector('button[type="submit"]')||document.querySelector('#employee-form button[type="submit"]');if(t&&t.disabled)return;let a="";t&&(a=t.innerHTML,t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const i=this.currentEditId?this._findEmployeeById_(this.currentEditId):null;let o=i?.photo||"";const s=document.getElementById("employee-photo-input");if(s&&s.files.length>0){const A=s.files[0];if(A.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0647\u0648 2MB"),t&&(t.disabled=!1,t.innerHTML=a);return}o=await this.convertImageToBase64(A)}const n=document.getElementById("employee-name"),l=document.getElementById("employee-number"),r=document.getElementById("employee-sap-id"),c=document.getElementById("employee-hire-date"),p=document.getElementById("employee-birth-date"),d=document.getElementById("employee-department"),m=document.getElementById("employee-position"),y=document.getElementById("employee-branch"),g=document.getElementById("employee-location"),b=document.getElementById("employee-gender"),u=document.getElementById("employee-national-id"),v=document.getElementById("employee-email"),E=document.getElementById("employee-phone"),h=document.getElementById("employee-insurance-number");if(!n||!l||!r||!d||!m||!y||!g||!b||!v||!E){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),t&&(t.disabled=!1,t.innerHTML=a);return}const f=!!this.currentEditId,x=f&&i?.hireDate||"",w=f&&i?.birthDate||"",S={id:l.value.trim()||this.currentEditId||Utils.generateId("EMP"),name:n.value.trim(),employeeNumber:l.value.trim(),sapId:r.value.trim(),hireDate:c?.value?this.normalizeDateOnly(c.value):f?this.normalizeDateOnly(x):this.normalizeDateOnly(new Date),birthDate:p?.value?this.normalizeDateOnly(p.value):f?this.normalizeDateOnly(w):"",department:d.value.trim(),job:m.value.trim(),position:m.value.trim(),branch:y.value.trim(),location:g.value.trim(),gender:b.value,nationalId:u?.value.trim()||"",email:v.value.trim(),phone:E.value.trim(),insuranceNumber:h?.value.trim()||"",photo:o,status:f&&i?.status||"active",resignationDate:f&&i?.resignationDate||"",createdAt:this.currentEditId?i?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(!S.name||!S.sapId||!S.employeeNumber||!S.department||!S.position){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u060C \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u060C \u0627\u0644\u0642\u0633\u0645\u060C \u0627\u0644\u0645\u0646\u0635\u0628)"),t&&(t.disabled=!1,t.innerHTML=a);return}const I=String(S.id||"").trim();if(!I){Notification.error("\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D (\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0646\u0634\u0627\u0621 id \u0641\u0627\u0631\u063A)"),t&&(t.disabled=!1,t.innerHTML=a);return}if(AppState.appData.employees.some(A=>{const C=String(A?.id||"").trim();return!C||this.currentEditId&&C===String(this.currentEditId).trim()?!1:C===I})){Notification.error("\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0631\u0642\u0645 \u0622\u062E\u0631."),t&&(t.disabled=!1,t.innerHTML=a);return}Loading.show();const D=this.currentEditId,L=!!D;try{if(L){const A=this._findEmployeeIndexById_(D);A!==-1&&(AppState.appData.employees[A]=S,this.currentEditId=I),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.employees.push(S),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),t&&(t.disabled=!1,t.innerHTML=a),this.renderStatsCards(),await this.showList(),this.syncEmployeeRecordToCloud_(S,{isEdit:L,previousId:D})}catch(A){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+A.message),t&&(t.disabled=!1,t.innerHTML=a)}},async convertImageToBase64(e){return new Promise((t,a)=>{const i=new FileReader;i.onload=()=>t(i.result),i.onerror=a,i.readAsDataURL(e)})},async showList(){this.currentEditId=null,!this.canViewEmployeesRegistryTab()&&this.canViewEmployeesAnalysisTab()?this.activeTab="data-analysis":!this.canViewEmployeesRegistryTab()&&this.canViewExternalWorkforceTab()?this.activeTab="external-workforce":!this.canViewExternalWorkforceTab()&&!this.canViewEmployeesAnalysisTab()&&(this.activeTab="employees-list");const e=document.getElementById("employees-content");e&&(e.innerHTML=await this.renderList(),this.applyModuleI18n(e),requestAnimationFrame(()=>{this.setupEventListeners(),this.canViewEmployeesRegistryTab()&&this.activeTab==="employees-list"?this.loadEmployeesList():this.activeTab==="data-analysis"&&this.canViewEmployeesAnalysisTab()?this.loadEmployeesAnalysis().catch(()=>{}):this.canViewExternalWorkforceTab()&&(this.populateExternalWorkforceYearSelector(),this.ensureExternalWorkforceDataLoaded().then(()=>this.renderExternalWorkforceTable()).catch(()=>{})),this.activeTab==="employees-list"&&this.scrollToSearchField()}))},async editEmployee(e){if(!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641");return}const t=this._findEmployeeById_(e);t&&await this.showForm(t)},async resetFieldPortalPin(e,t){const a=decodeURIComponent(t||"")||e;if(typeof Modal<"u"&&typeof Modal.confirm=="function"?await Modal.confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u0628\u0627\u0644\u062A\u0623\u0643\u064A\u062F \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0631\u0645\u0632 PIN \u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0644\u0644\u0645\u0648\u0638\u0641: [${a}] (\u0643\u0648\u062F: ${e})\u061F

\u0633\u064A\u062A\u0645 \u062A\u0635\u0641\u064A\u0631 \u0627\u0644\u0631\u0645\u0632 \u0648\u0623\u064A \u0642\u0641\u0644 \u0645\u0624\u0642\u062A\u060C \u0648\u0633\u064A\u064F\u0637\u0644\u0628 \u0645\u0646 \u0627\u0644\u0645\u0648\u0638\u0641 \u062A\u0639\u064A\u064A\u0646 \u0631\u0645\u0632 \u062C\u062F\u064A\u062F \u0639\u0646\u062F \u0623\u0648\u0644 \u062F\u062E\u0648\u0644 \u0644\u0647.`,"\u062A\u0623\u0643\u064A\u062F \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0631\u0645\u0632 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C"):confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u0628\u0627\u0644\u062A\u0623\u0643\u064A\u062F \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0631\u0645\u0632 PIN \u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0644\u0644\u0645\u0648\u0638\u0641 [${a}]\u061F`))try{typeof Loading<"u"&&Loading.show&&Loading.show();let o=null;if(typeof GoogleIntegration<"u"&&typeof GoogleIntegration._executeRequest=="function"?o=await GoogleIntegration._executeRequest("fieldPortalResetPin",{employeeCode:e}):o=await(await fetch("/api/exec",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"fieldPortalResetPin",employeeCode:e})})).json(),typeof Loading<"u"&&Loading.hide&&Loading.hide(),o&&o.success)typeof Notification<"u"&&Notification.success?Notification.success(o.message||"\u062A\u0645\u062A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0631\u0645\u0632 PIN \u0628\u0646\u062C\u0627\u062D"):alert(o.message||"\u062A\u0645\u062A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0631\u0645\u0632 PIN \u0628\u0646\u062C\u0627\u062D");else{const s=o&&o.message||"\u062A\u0639\u0630\u0631 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0631\u0645\u0632 PIN";typeof Notification<"u"&&Notification.error?Notification.error(s):alert(s)}}catch{typeof Loading<"u"&&Loading.hide&&Loading.hide(),alert("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0631\u0645\u0632")}},async printEmployee(e){const t=this._findEmployeeById_(e);if(!t){Notification.error("\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629...");let a="";const i=this._normalizeEmployeePhotoUrl(t.photo,t.id);if(i&&typeof Utils.resolveDriveAwareImgDisplay=="function"){const g=Utils.resolveDriveAwareImgDisplay(i);if(g.needsProxy&&typeof Utils.fetchDriveImageDataUri=="function")try{a=await Utils.fetchDriveImageDataUri(g.proxyFileId)||""}catch{a=""}a||(a=g.canonical||i)}else i&&(a=i);const o=this.formatDateSafe(t.birthDate),s=this.formatDateSafe(t.hireDate),n=this.calculateAge(t.birthDate),l=this.isEmployeeInactive(t),r=this._employeeDisplayName_(t);let c="-";if(t.hireDate)try{const g=this.parseLocalDate(t.hireDate);if(g){const b=t.resignationDate?this.parseLocalDate(t.resignationDate)||new Date:new Date;let u=b.getFullYear()-g.getFullYear(),v=b.getMonth()-g.getMonth();v<0&&(u--,v+=12),c=u>0?`${u} \u0633\u0646\u0629 \u0648 ${v} \u0634\u0647\u0631`:`${v} \u0634\u0647\u0631`}}catch{}const p=this.getIsoPrintHeaderHtml("\u0628\u0637\u0627\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0633\u062C\u0644 \u0645\u0648\u0638\u0641 \u0645\u0639\u062A\u0645\u062F","Certified Employee Profile & HSE Qualification Record","DOC-HR-EMP-01","Rev. 03","\u0633\u0631\u064A \u062F\u0627\u062E\u0644\u064A / Confidential"),d=this.getIsoPrintFooterHtml("DOC-HR-EMP-01","Rev. 03","ISO 45001:2018 & ISO 9001:2015"),m=`
                .emp-hero-card {
                    display: flex;
                    gap: 18px;
                    align-items: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
                    border: 1.5px solid #bfdbfe;
                    border-radius: 10px;
                    padding: 14px 18px;
                    margin-bottom: 14px;
                }
                .emp-hero-photo {
                    width: 105px;
                    height: 105px;
                    border-radius: 8px;
                    object-fit: cover;
                    border: 2.5px solid #1e3a8a;
                    background: #ffffff;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
                    flex-shrink: 0;
                }
                .emp-hero-photo-placeholder {
                    width: 105px;
                    height: 105px;
                    border-radius: 8px;
                    background: #e2e8f0;
                    border: 2px solid #cbd5e1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    color: #94a3b8;
                    font-size: 38px;
                }
                .emp-hero-details {
                    flex: 1;
                }
                .emp-hero-name {
                    font-size: 19px;
                    font-weight: 900;
                    color: #0f172a;
                    margin-bottom: 4px;
                }
                .emp-hero-tags {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                    margin-top: 6px;
                }
                .emp-tag {
                    padding: 3px 9px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 800;
                }
                .emp-tag-id { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
                .emp-tag-job { background: #f0fdf4; color: #047857; border: 1px solid #bbf7d0; }
                .emp-tag-dept { background: #f8fafc; color: #334155; border: 1px solid #cbd5e1; }
                .emp-tag-active { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
                .emp-tag-inactive { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }

                .emp-section-box {
                    border: 1.5px solid #cbd5e1;
                    border-radius: 8px;
                    overflow: hidden;
                    margin-bottom: 11px;
                }
                .emp-section-title {
                    background: #f1f5f9;
                    border-bottom: 1.5px solid #cbd5e1;
                    padding: 6px 12px;
                    font-size: 11px;
                    font-weight: 800;
                    color: #1e3a8a;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .emp-section-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 8px;
                    padding: 9px 12px;
                    background: #ffffff;
                }
                .emp-field-item {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    padding: 6px 9px;
                }
                .emp-field-label {
                    font-size: 9.5px;
                    font-weight: 700;
                    color: #64748b;
                    margin-bottom: 2px;
                }
                .emp-field-value {
                    font-size: 11.5px;
                    font-weight: 800;
                    color: #0f172a;
                    word-break: break-word;
                }
                .sig-box-wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 140px;
                    gap: 10px;
                    margin-top: 14px;
                    page-break-inside: avoid;
                }
            `,y=`
                <div class="no-print-bar">
                    <div class="brand-badge">
                        <span class="pill-tag">ICAPP HSE & HR</span>
                        <span class="title-text">\u0628\u0637\u0627\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641 \u0645\u0639\u062A\u0645\u062F\u0629 \u2014 ${Utils.escapeHTML(r)}</span>
                    </div>
                    <div class="action-buttons">
                        <button type="button" onclick="window.print()" class="btn-print">
                            \u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0629
                        </button>
                        <button type="button" onclick="window.close()" class="btn-close">
                            \u274C \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629
                        </button>
                    </div>
                </div>

                <div class="report-page-container">
                    ${p}

                    <div class="emp-hero-card">
                        ${a?`<img src="${Utils.escapeHTML(a)}" alt="${Utils.escapeHTML(r)}" class="emp-hero-photo" onerror="this.onerror=null; this.parentElement.querySelector('.emp-hero-photo-placeholder').style.display='flex'; this.style.display='none';"><div class="emp-hero-photo-placeholder" style="display:none;">\u{1F464}</div>`:'<div class="emp-hero-photo-placeholder">\u{1F464}</div>'}
                        <div class="emp-hero-details">
                            <div class="emp-hero-name">${Utils.escapeHTML(r)}</div>
                            <div class="emp-hero-tags">
                                <span class="emp-tag emp-tag-id">\u0643\u0648\u062F: ${Utils.escapeHTML(t.employeeNumber||"-")}</span>
                                <span class="emp-tag emp-tag-job">${Utils.escapeHTML(t.job||t.position||"-")}</span>
                                <span class="emp-tag emp-tag-dept">${Utils.escapeHTML(t.department||"-")}</span>
                                <span class="emp-tag ${l?"emp-tag-inactive":"emp-tag-active"}">${l?"\u0645\u0633\u062A\u0642\u064A\u0644 / \u063A\u064A\u0631 \u0646\u0634\u0637":"\u0639\u0644\u0649 \u0631\u0623\u0633 \u0627\u0644\u0639\u0645\u0644 (\u0646\u0634\u0637)"}</span>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644: \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0648\u0627\u0644\u062A\u0639\u0631\u064A\u0641\u064A\u0629 -->
                    <div class="emp-section-box">
                        <div class="emp-section-title">
                            \u{1F4CC} \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0648\u0627\u0644\u062A\u0639\u0631\u064A\u0641\u064A\u0629 (Personal & Identification Data)
                        </div>
                        <div class="emp-section-grid">
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0631\u0642\u0645 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A</div>
                                <div class="emp-field-value">${Utils.escapeHTML(t.nationalId||"-")}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F</div>
                                <div class="emp-field-value">${o||"-"}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0627\u0644\u0639\u0645\u0631 \u0627\u0644\u0633\u0646\u064A</div>
                                <div class="emp-field-value">${n?n+" \u0633\u0646\u0629":"-"}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0627\u0644\u0646\u0648\u0639 / \u0627\u0644\u062C\u0646\u0633</div>
                                <div class="emp-field-value">${Utils.escapeHTML(t.gender||"-")}</div>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0646\u064A: \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629 \u0648\u0627\u0644\u062A\u0639\u0627\u0642\u062F\u064A\u0629 -->
                    <div class="emp-section-box">
                        <div class="emp-section-title">
                            \u{1F3E2} \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629 \u0648\u0627\u0644\u062A\u0639\u0627\u0642\u062F\u064A\u0629 (Employment & Operational Record)
                        </div>
                        <div class="emp-section-grid">
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0631\u0633\u0645\u064A</div>
                                <div class="emp-field-value">${s||"-"}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0645\u062F\u0629 \u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0642\u0636\u0627\u0629</div>
                                <div class="emp-field-value">${c}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A</div>
                                <div class="emp-field-value">${Utils.escapeHTML(t.insuranceNumber||"-")}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0646\u0634\u0623\u0629</div>
                                <div class="emp-field-value">${Utils.escapeHTML(t.branch||t.location||"\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u2014 ICAPP")}</div>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0644\u062B: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0627\u0644\u0637\u0648\u0627\u0631\u0626 -->
                    <div class="emp-section-box">
                        <div class="emp-section-title">
                            \u{1F4DE} \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626 (Contact & Emergency Details)
                        </div>
                        <div class="emp-section-grid">
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0634\u062E\u0635\u064A</div>
                                <div class="emp-field-value">${Utils.escapeHTML(t.phone||"-")}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</div>
                                <div class="emp-field-value">${Utils.escapeHTML(t.email||"-")}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0641\u064A \u0627\u0644\u0637\u0648\u0627\u0631\u0626</div>
                                <div class="emp-field-value">${Utils.escapeHTML(t.emergencyContact||"\u0645\u0633\u062C\u0644 \u0628\u0645\u0644\u0641 \u0627\u0644\u062E\u062F\u0645\u0629")}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0647\u0627\u062A\u0641 \u0627\u0644\u0637\u0648\u0627\u0631\u0626</div>
                                <div class="emp-field-value">${Utils.escapeHTML(t.emergencyPhone||t.phone||"-")}</div>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639: \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0637\u0628\u064A -->
                    <div class="emp-section-box">
                        <div class="emp-section-title">
                            \u{1F9BA} \u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (HSE & Medical Profile)
                        </div>
                        <div class="emp-section-grid">
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0641\u0635\u064A\u0644\u0629 \u0627\u0644\u062F\u0645</div>
                                <div class="emp-field-value" style="color: #b91c1c;">${Utils.escapeHTML(t.bloodType||t.bloodGroup||"\u063A\u064A\u0631 \u0645\u0633\u062C\u0644\u0629")}</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u062A\u0648\u062C\u064A\u0647\u064A (HSE Induction)</div>
                                <div class="emp-field-value" style="color: #047857;">\u0645\u0643\u062A\u0645\u0644 \u0648\u0645\u064F\u0639\u062A\u0645\u062F \u2705</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 (PPE Status)</div>
                                <div class="emp-field-value" style="color: #047857;">\u0645\u0633\u0644\u0645\u0629 \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0645\u062E\u0627\u0637\u0631 \u2705</div>
                            </div>
                            <div class="emp-field-item">
                                <div class="emp-field-label">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 / \u0627\u0644\u062D\u0633\u0627\u0633\u064A\u0629</div>
                                <div class="emp-field-value">${Utils.escapeHTML(t.notes||t.medicalNotes||"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0646\u0639 \u0637\u0628\u064A\u0629")}</div>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0633\u0645\u064A -->
                    <div class="sig-box-wrapper">
                        <div class="sig-card">
                            <div class="sig-card-title">\u0625\u0639\u062F\u0627\u062F \u0648\u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629</div>
                            <div class="sig-card-name">\u0623\u062E\u0635\u0627\u0626\u064A \u0634\u0624\u0648\u0646 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646</div>
                            <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">\u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                            <div class="sig-card-name">\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                            <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629</div>
                            <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0639\u0627\u0645 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</div>
                            <div class="sig-line-area">\u0627\u0644\u062E\u062A\u0645 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0642\u0645\u064A</div>
                        </div>
                        <div class="sig-card" style="border: 2px dashed #94a3b8; background: #ffffff; align-items: center; justify-content: center; text-align: center;">
                            <div style="font-size: 9.5px; font-weight: 800; color: #64748b; margin-bottom: 4px;">\u062E\u0627\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0633\u0645\u064A</div>
                            <div style="width: 48px; height: 48px; border: 1.5px dashed #cbd5e1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #94a3b8; font-weight: 800;">\u062E\u062A\u0645 ICAPP</div>
                        </div>
                    </div>

                    ${d}
                </div>
            `;this.openIsoPrintWindow(`\u0628\u0637\u0627\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641 \u2014 ${r}`,y,!1,m)}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+a.message)}finally{Loading.hide()}},async viewEmployee(e){const t=this._findEmployeeById_(e);if(!t)return;const a=this.formatDateSafe(t.birthDate),i=this.formatDateSafe(t.hireDate),o=this.calculateAge(t.birthDate),s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
                            ${(()=>{const n=this._normalizeEmployeePhotoUrl(t.photo,t.id);if(!n)return'<div class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto"><i class="fas fa-user text-5xl text-gray-400"></i></div>';const l=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(n):{canonical:n,displaySrc:n,needsProxy:!1,proxyFileId:""},r=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(l):"";return`<img src="${Utils.escapeHTML(l.displaySrc)}" alt="${Utils.escapeHTML(t.name||"")}"${r} class="emp-detail-photo w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200">`})()}
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
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("employees"):""}
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
        `,this.applyModuleI18n(s),document.body.appendChild(s),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(s,{moduleKey:"employees",record:t,recordId:t.id||t.employeeNumber||t.isoCode||""}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s,{onFetchFail:n=>{try{const l=document.createElement("div");l.className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto",l.innerHTML='<i class="fas fa-user text-5xl text-gray-400"></i>',n.replaceWith(l)}catch{}}}),s.addEventListener("click",n=>{n.target===s&&s.remove()})},async deactivateEmployee(e){if(!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641");return}const t=this._findEmployeeById_(e);if(!t){Notification.error("\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 "${t.name}"\u061F
\u0633\u064A\u062A\u0645 \u0625\u062E\u0641\u0627\u0624\u0647 \u0645\u0646 \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0648\u0644\u0643\u0646 \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0628\u064A\u0627\u0646\u0627\u062A\u0647 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645.`)){Loading.show();try{const a=this._findEmployeeIndexById_(e);a!==-1&&(AppState.appData.employees[a].status="inactive",AppState.appData.employees[a].resignationDate=this.normalizeDateOnly(new Date),AppState.appData.employees[a].updatedAt=new Date().toISOString()),setTimeout(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},50),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),this.renderStatsCards();const i=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(i),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(s){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",s)}});const o=t.id||t.employeeNumber||t.sapId||e;AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendToAppsScript("deactivateEmployee",{employeeId:o}).then(s=>{!s||!s.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL:",s?.message):Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}).catch(s=>Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",s))}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+a.message)}}},async deleteEmployee(e){if(!this.canEditOrDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0638\u0641");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641 \u0646\u0647\u0627\u0626\u064A\u0627\u064B\u061F
\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627!`)){Loading.show();try{AppState.appData.employees=(AppState.appData.employees||[]).filter(a=>a.id!==e),setTimeout(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},50),this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),this.renderStatsCards();const t=document.getElementById("show-inactive-employees")?.checked||!1;this.loadEmployeesList(t),requestAnimationFrame(async()=>{try{await this.applyFilters()}catch(a){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631:",a)}}),AppState.googleConfig?.appsScript?.enabled&&GoogleIntegration.sendToAppsScript("deleteEmployee",{employeeId:e}).then(a=>{!a||!a.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL:",a?.message):Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u062D\u0630\u0641 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}).catch(a=>Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062D\u0630\u0641 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",a))}catch(t){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}}},scrollToSearchField(){setTimeout(()=>{const e=document.getElementById("employees-search");if(e){const t=window.scrollY||document.documentElement.scrollTop,a=Math.max(0,(e.offsetTop||0)-20),i=t+window.innerHeight;(a<t||a>i-100)&&window.scrollTo({top:a,behavior:"smooth"})}},0)},getFilterValues(){const e=document.getElementById("employees-search-filter"),t=document.getElementById("employees-search"),a=e?e.value.trim():"",i=t?t.value.trim():"";return{search:a||i||"",department:document.getElementById("employee-filter-department")?.value||"",branch:document.getElementById("employee-filter-branch")?.value||"",location:document.getElementById("employee-filter-location")?.value||"",job:document.getElementById("employee-filter-job")?.value||"",position:document.getElementById("employee-filter-position")?.value||"",gender:document.getElementById("employee-filter-gender")?.value||"",showInactive:document.getElementById("show-inactive-employees")?.checked||!1}},async filterEmployees(e="",t=!1,a=null){try{if(a)t=a.showInactive!==void 0&&a.showInactive!==null?a.showInactive:t;else{const c=this.getFilterValues();e=e||c.search,t=t??(c.showInactive||!1),a=c,a.showInactive=t}const i=document.getElementById("employees-table-container");if(!i){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F employees-table-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let o=i.querySelector("tbody");if(!o&&(await this.loadEmployeesList(t),o=i.querySelector("tbody"),!o)){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F tbody \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0628\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629");return}let s=(AppState.appData.employees||[]).map(c=>this.sanitizeEmployeeRecordDrift_({...c||{}}));if(AppState.appData.employees=s,!t){const c=s.length,p=s.filter(d=>!this.isEmployeeInactive(d));p.length===0&&c>0?Utils.safeWarn("\u26A0\uFE0F filterEmployees: \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0623\u062E\u0641\u062A \u0627\u0644\u062C\u0645\u064A\u0639 \u2014 \u0639\u0631\u0636 \u0627\u0644\u0643\u0644"):s=p}let n=s;const l=this.canEditOrDelete();if(e&&String(e).trim()){const c=String(e).trim().toLowerCase(),p=this.normalizeArabic(e);n=n.filter(d=>[this._employeeDisplayName_(d),d.name,d.employeeName,d.fullName,d.employeeNumber,d.sapId,d.id,d.department,d.position,d.job,d.branch,d.location,d.nationalId,d.phone,d.insuranceNumber,d.email,d.gender].some(g=>{if(g==null||g==="")return!1;const b=String(g);return!!(b.toLowerCase().includes(c)||p&&this.normalizeArabic(b).includes(p))}))}a.department&&(n=n.filter(c=>String(c.department||"").trim()===String(a.department).trim())),a.branch&&(n=n.filter(c=>String(c.branch||"").trim()===String(a.branch).trim())),a.location&&(n=n.filter(c=>String(c.location||"").trim()===String(a.location).trim())),a.job&&(n=n.filter(c=>String(c.job||"").trim()===String(a.job).trim())),a.position&&(n=n.filter(c=>String(c.position||"").trim()===String(a.position).trim())),a.gender&&(n=n.filter(c=>String(c.gender||"").trim()===String(a.gender).trim()));const r=13;if(n.length===0){const c=document.createElement("tr");c.innerHTML=`<td colspan="${r}" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C</td>`,o.innerHTML="",o.appendChild(c);const p=document.getElementById("employees-load-more-wrap");p&&p.remove(),this._listRowsCache=[],this._listVisibleCount=0,this._lastFilteredEmployees=[]}else{const c=document.createDocumentFragment();for(let d=0;d<n.length;d++)c.appendChild(this.buildEmployeeTableRowElement_(n[d],l));o.innerHTML="",o.appendChild(c),this._listRowsCache=n,this._listVisibleCount=n.length,this._listCanEdit=l,this._lastFilteredEmployees=n;const p=document.getElementById("employees-load-more-wrap");p&&p.remove()}typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(o,{onFetchFail:c=>{try{const p=(c.dataset.photoKey||"").trim();p&&sessionStorage.setItem(this._photoFailKey(p),Date.now().toString())}catch{}try{const p=c.parentElement;p&&(p.innerHTML='<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>')}catch{}}}),this.updateFilterBadges(s,n,a),AppState.debugMode&&e&&Utils.safeLog(`\u{1F50D} \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0628\u062D\u062B: ${n.length} \u0645\u0646 ${s.length} \u0645\u0648\u0638\u0641`)}catch(i){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A filterEmployees:",i)}},updateFilterBadges(e,t,a){try{if(!a){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F updateFilterBadges: filters \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const i=(o,s,n)=>{try{const l=document.getElementById(o);if(!l){AppState.debugMode&&s&&Utils.safeWarn(`\u26A0\uFE0F updateFilterLabel: ${o} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F`);return}const r=l.closest(".filter-field");if(!r){AppState.debugMode&&s&&Utils.safeWarn(`\u26A0\uFE0F updateFilterLabel: filter-field \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0644\u0640 ${o}`);return}const c=r.querySelector(".filter-label");if(!c){AppState.debugMode&&s&&Utils.safeWarn(`\u26A0\uFE0F updateFilterLabel: filter-label \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0644\u0640 ${o}`);return}const p=c.querySelector(".filter-count-badge");if(p&&p.remove(),s&&s.trim()!==""){const d=document.createElement("span");d.className="filter-count-badge",d.title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629",d.textContent=n;const m=c.querySelector("i");m?m.insertAdjacentElement("afterend",d):c.insertBefore(d,c.firstChild),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0634\u0627\u0631\u0629 \u0627\u0644\u0639\u062F\u062F (${n}) \u0644\u0640 ${o}`)}}catch(l){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0634\u0627\u0631\u0629 \u0627\u0644\u0641\u0644\u062A\u0631:",l)}};if(a.department?i("employee-filter-department",a.department,t.length):i("employee-filter-department","",0),a.branch?i("employee-filter-branch",a.branch,t.length):i("employee-filter-branch","",0),a.location?i("employee-filter-location",a.location,t.length):i("employee-filter-location","",0),a.job?i("employee-filter-job",a.job,t.length):i("employee-filter-job","",0),a.position?i("employee-filter-position",a.position,t.length):i("employee-filter-position","",0),a.gender?i("employee-filter-gender",a.gender,t.length):i("employee-filter-gender","",0),a.search&&a.search.trim())try{const o=document.getElementById("employees-search-filter")||document.getElementById("employees-search");if(o){const s=o.closest(".filter-field");if(s){const n=s.querySelector(".filter-label");if(n){const l=n.querySelector(".filter-count-badge");l&&l.remove();const r=document.createElement("span");r.className="filter-count-badge",r.title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629",r.textContent=t.length;const c=n.querySelector("i");c?c.insertAdjacentElement("afterend",r):n.insertBefore(r,n.firstChild)}}}}catch(o){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0634\u0627\u0631\u0629 \u0627\u0644\u0628\u062D\u062B:",o)}else try{const o=document.getElementById("employees-search-filter")||document.getElementById("employees-search");if(o){const s=o.closest(".filter-field");if(s){const n=s.querySelector(".filter-label");if(n){const l=n.querySelector(".filter-count-badge");l&&l.remove()}}}}catch(o){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0634\u0627\u0631\u0629 \u0627\u0644\u0628\u062D\u062B:",o)}}catch(i){AppState.debugMode&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A updateFilterBadges:",i)}},async applyFilters(){try{const e=this.getFilterValues();await this.filterEmployees(e.search,e.showInactive,e),this.updateInactiveCount()}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A applyFilters:",e)}finally{this.updateInactiveCount()}},async resetFilters(){const e=document.getElementById("employees-search"),t=document.getElementById("employees-search-filter");e&&(e.value=""),t&&(t.value=""),["employee-filter-department","employee-filter-branch","employee-filter-location","employee-filter-job","employee-filter-position","employee-filter-gender"].forEach(s=>{const n=document.getElementById(s);n&&(n.value="")});const i=document.getElementById("show-inactive-employees");i&&(i.checked=!1);const o=document.getElementById("show-inactive-employees-container");o&&(o.style.background="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",o.style.borderColor="#dee2e6",o.style.boxShadow="none"),await this.applyFilters(),this.updateInactiveCount()},updateInactiveCount(e=0){const i=()=>{try{const s=(AppState.appData.employees||[]).filter(l=>this.isEmployeeInactive(l)).length,n=document.getElementById("inactive-employees-count");if(n){n.textContent=s;const l=s===0,r=l?"#6b7280":"#dc2626",c=l?"0 2px 4px rgba(107, 114, 128, 0.3)":"0 2px 4px rgba(220, 38, 38, 0.3)";n.style.cssText=`
                        display: inline-flex !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        align-items: center;
                        justify-content: center;
                        min-width: 24px;
                        height: 22px;
                        padding: 0 8px;
                        background: ${r};
                        color: white;
                        border-radius: 11px;
                        font-size: 11px;
                        font-weight: 700;
                        margin-right: 4px;
                        box-shadow: ${c};
                        transition: all 0.3s ease;
                    `;const p=document.getElementById("show-inactive-employees");p&&p.checked&&!l?(n.style.background="linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",n.style.boxShadow="0 2px 6px rgba(220, 38, 38, 0.4)",n.style.transform="scale(1.1)"):n.style.transform="scale(1)",AppState.debugMode&&Utils.safeLog(`\u{1F4CA} \u0639\u062F\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646: ${s}`)}else e<3?(AppState.debugMode&&Utils.safeLog(`\u23F3 \u0627\u0644\u0639\u0646\u0635\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u060C \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 ${e+1}/3...`),setTimeout(()=>{this.updateInactiveCount(e+1)},100)):AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0639\u0646\u0635\u0631 \u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646 \u0628\u0639\u062F \u0639\u062F\u0629 \u0645\u062D\u0627\u0648\u0644\u0627\u062A")}catch(o){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u062F\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u064A\u0646:",o)}};e===0?requestAnimationFrame(i):i()},async init(){try{AppState.appData.employees&&Array.isArray(AppState.appData.employees)&&AppState.appData.employees.length>0?(this.cache.data=AppState.appData.employees,this.cache.lastLoad=Date.now(),this.cache.lastUpdate=Date.now(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 (${this.cache.data.length} \u0645\u0648\u0638\u0641)`)):await this.ensureEmployeesLoaded(),this.startBackgroundUpdate()}catch(e){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",e)}},getIsoPrintCommonStyles(e=!1){return`
            :root {
                --brand-primary: #1e3a8a;
                --brand-navy: #0f172a;
                --brand-green: #047857;
                --brand-red: #b91c1c;
                --border-color: #cbd5e1;
            }
            * {
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            body {
                font-family: 'Cairo', system-ui, -apple-system, sans-serif;
                margin: 0;
                padding: 0;
                background: #f8fafc;
                color: #0f172a;
                line-height: 1.5;
                direction: rtl;
            }
            .no-print-bar {
                position: sticky;
                top: 0;
                z-index: 9999;
                background: #0f172a;
                color: #ffffff;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
                border-bottom: 3px solid #2563eb;
            }
            .no-print-bar .brand-badge {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .no-print-bar .pill-tag {
                background: #2563eb;
                color: #ffffff;
                padding: 4px 10px;
                border-radius: 6px;
                font-weight: 800;
                font-size: 11px;
                letter-spacing: 0.5px;
            }
            .no-print-bar .title-text {
                font-size: 13.5px;
                font-weight: 800;
            }
            .no-print-bar .action-buttons {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            .btn-print {
                padding: 8px 20px;
                background: #2563eb;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(37,99,235,0.4);
            }
            .btn-print:hover { background: #1d4ed8; }
            .btn-close {
                padding: 8px 18px;
                background: #475569;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
            }
            .btn-close:hover { background: #334155; }

            .report-page-container {
                max-width: ${e?"1180px":"920px"};
                margin: 22px auto 40px auto;
                background: #ffffff;
                padding: 24px 30px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
                border: 1px solid #e2e8f0;
            }

            .iso-print-header {
                display: grid;
                grid-template-columns: 240px 1fr 210px;
                border: 2px solid #0f172a;
                border-top: 5px solid #1e3a8a;
                border-radius: 8px;
                overflow: hidden;
                background: #ffffff;
                margin-bottom: 16px;
            }
            .iso-box-brand {
                padding: 10px 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-left: 1.5px solid #0f172a;
                background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                gap: 4px;
                text-align: center;
            }
            .iso-print-logo {
                max-height: 46px;
                max-width: 130px;
                object-fit: contain;
                margin-bottom: 2px;
            }
            .iso-company-title {
                font-size: 10.5px;
                font-weight: 900;
                color: #0f172a;
                line-height: 1.3;
            }
            .iso-dept-title {
                font-size: 9.5px;
                font-weight: 800;
                color: #1e3a8a;
                line-height: 1.25;
            }

            .iso-box-title {
                padding: 10px 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                background: #ffffff;
            }
            .iso-main-title {
                margin: 0;
                font-size: 16px;
                font-weight: 900;
                color: #1e3a8a;
                line-height: 1.3;
            }
            .iso-sub-title {
                font-size: 10.5px;
                font-weight: 700;
                color: #475569;
                margin-top: 3px;
            }
            .iso-badge-std {
                display: inline-block;
                margin-top: 5px;
                background: #eff6ff;
                color: #1d4ed8;
                border: 1px solid #bfdbfe;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 9.5px;
                font-weight: 800;
            }

            .iso-box-meta {
                padding: 8px 12px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1.5px solid #0f172a;
                background: #f8fafc;
                gap: 3px;
            }
            .meta-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px dashed #cbd5e1;
                padding-bottom: 2px;
                font-size: 10px;
            }
            .meta-row:last-child { border-bottom: none; }
            .meta-row span { color: #64748b; font-weight: 700; }
            .meta-row strong { color: #0f172a; font-family: monospace, inherit; font-size: 10px; }

            .handover-info-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 8px;
                margin-bottom: 14px;
            }
            .info-card {
                background: #f8fafc;
                border: 1.5px solid #cbd5e1;
                border-radius: 6px;
                padding: 7px 10px;
            }
            .info-card .card-label {
                font-size: 9.5px;
                color: #64748b;
                font-weight: 700;
                margin-bottom: 2px;
            }
            .info-card .card-value {
                font-size: 11.5px;
                font-weight: 800;
                color: #0f172a;
            }

            .iso-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
                margin-bottom: 16px;
                font-size: 11px;
            }
            .iso-table th {
                background: #1e3a8a;
                color: #ffffff;
                padding: 7px 8px;
                font-weight: 800;
                border: 1px solid #0f172a;
                text-align: center;
            }
            .iso-table td {
                padding: 6px 8px;
                border: 1px solid #cbd5e1;
                text-align: center;
                color: #0f172a;
            }
            .iso-table tr:nth-child(even) td {
                background: #f8fafc;
            }
            .iso-table tr.total-row td {
                background: #eff6ff;
                font-weight: 900;
                border-top: 2px solid #1e3a8a;
                color: #1e3a8a;
            }

            .signatures-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
                margin-top: 18px;
                page-break-inside: avoid;
            }
            .sig-card {
                border: 1.5px solid #cbd5e1;
                border-radius: 6px;
                padding: 8px 10px;
                background: #f8fafc;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 100px;
            }
            .sig-card-title {
                font-size: 10px;
                font-weight: 800;
                color: #1e3a8a;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 3px;
                margin-bottom: 4px;
                text-align: center;
            }
            .sig-card-name {
                font-size: 10.5px;
                font-weight: 800;
                color: #0f172a;
                text-align: center;
            }
            .sig-line-area {
                margin-top: 16px;
                border-top: 1.5px dashed #64748b;
                padding-top: 3px;
                text-align: center;
                font-size: 9px;
                color: #64748b;
                font-weight: 700;
            }

            .iso-footer-strip {
                margin-top: 16px;
                border: 1.5px solid #0f172a;
                border-radius: 6px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px 12px;
                background: #f8fafc;
                font-size: 9.5px;
                font-weight: 800;
                color: #334155;
                page-break-inside: avoid;
            }
            .iso-footer-strip span strong {
                color: #0f172a;
                font-family: monospace, inherit;
            }
            .portal-unified-footer {
                margin-top: 10px;
                text-align: center;
                font-size: 9px;
                color: #64748b;
                line-height: 1.45;
                page-break-inside: avoid;
            }
            .portal-unified-footer strong {
                color: #1e3a8a;
                font-weight: 800;
            }

            @media print {
                body {
                    background: #ffffff !important;
                    padding: 0 !important;
                }
                .no-print-bar {
                    display: none !important;
                }
                .report-page-container {
                    max-width: 100% !important;
                    margin: 0 !important;
                    padding: 4mm 6mm !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                @page {
                    size: ${e?"A4 landscape":"A4 portrait"};
                    margin: 8mm 10mm 8mm 10mm;
                }
            }
        `},getIsoPrintHeaderHtml(e,t,a,i="Rev. 02",o="\u0639\u0627\u0645 \u062F\u0627\u062E\u0644\u064A"){let s="/icons/icapp-logo.png";typeof window<"u"&&window.location&&(window.location.protocol==="file:"?s="icons/icapp-logo.png":window.location.origin&&window.location.origin!=="null"&&(s=`${window.location.origin}/icons/icapp-logo.png`));const n="icons/icon-192x192.png",l=new Date,r=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`;return`
            <div class="iso-print-header">
                <div class="iso-box-brand">
                    <img src="${s}" alt="\u0634\u0639\u0627\u0631 ICAPP" class="iso-print-logo" onerror="this.onerror=null; this.src='${n}';">
                    <div class="iso-company-title">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</div>
                    <div class="iso-dept-title">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                </div>

                <div class="iso-box-title">
                    <h1 class="iso-main-title">${Utils.escapeHTML(e)}</h1>
                    <div class="iso-sub-title">${Utils.escapeHTML(t)}</div>
                    <div class="iso-badge-std">\u0645\u0639\u062A\u0645\u062F \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0629 ISO 45001:2018 & ISO 9001:2015</div>
                </div>

                <div class="iso-box-meta">
                    <div class="meta-row">
                        <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629:</span>
                        <strong>${Utils.escapeHTML(a)}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</span>
                        <strong>${Utils.escapeHTML(i)}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</span>
                        <strong>${r}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u062F\u0631\u062C\u0629 \u0627\u0644\u0633\u0631\u064A\u0629:</span>
                        <strong style="color: #047857;">${Utils.escapeHTML(o)}</strong>
                    </div>
                </div>
            </div>
        `},getIsoPrintFooterHtml(e,t="Rev. 02",a="ISO 45001:2018"){return`
            <div class="iso-footer-strip">
                <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629: <strong>${Utils.escapeHTML(e)}</strong></span>
                <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631: <strong>${Utils.escapeHTML(t)}</strong></span>
                <span>\u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u062A\u0648\u062B\u064A\u0642: <strong>${Utils.escapeHTML(a)}</strong></span>
                <span>\u0646\u0638\u0627\u0645 \u0627\u0644\u062C\u0648\u062F\u0629: <strong>ICAPP HSE MS</strong></span>
            </div>
            <footer class="portal-unified-footer">
                <div><strong>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</strong> \u2022 \u0645\u0646\u0638\u0648\u0645\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629 \xA9 2026</div>
                <div>\u0648\u062B\u064A\u0642\u0629 \u0631\u0633\u0645\u064A\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0635\u0627\u062F\u0631\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP SafetyHub) \u2022 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629</div>
            </footer>
        `},openIsoPrintWindow(e,t,a=!1,i=""){const o=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Utils.escapeHTML(e)} \u2014 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        ${this.getIsoPrintCommonStyles(a)}
        ${i}
    </style>
</head>
<body>
    ${t}
    <script>
        window.addEventListener('load', function() {
            var images = document.querySelectorAll('img');
            var loaded = 0;
            if (images.length === 0) {
                setTimeout(function() { window.print(); }, 400);
            } else {
                images.forEach(function(img) {
                    if (img.complete) {
                        loaded++;
                        if (loaded === images.length) setTimeout(function() { window.print(); }, 400);
                    } else {
                        img.addEventListener('load', function() {
                            loaded++;
                            if (loaded === images.length) setTimeout(function() { window.print(); }, 400);
                        });
                        img.addEventListener('error', function() {
                            loaded++;
                            if (loaded === images.length) setTimeout(function() { window.print(); }, 400);
                        });
                    }
                });
                setTimeout(function() { window.print(); }, 1800);
            }
        });
    <\/script>
</body>
</html>`,s=new Blob([o],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(s),l=window.open(n,"_blank");return l?(setTimeout(()=>URL.revokeObjectURL(n),12e4),l):(URL.revokeObjectURL(n),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0648\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),null)},exportToExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 XLSX \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=Array.isArray(this._lastFilteredEmployees)&&this._lastFilteredEmployees.length>0?this._lastFilteredEmployees:AppState.appData?.employees||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const t="\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)",a="\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629",i="\u0633\u062C\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062D\u0635\u0631 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F",o=new Date,s=o.toLocaleDateString("ar-EG")+" "+o.toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"}),n=["\u0645","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0644\u0627\u0633\u0645 \u0628\u0627\u0644\u0643\u0627\u0645\u0644","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645","\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F","\u0627\u0644\u0633\u0646","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646","\u0627\u0644\u0646\u0648\u0639","\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A","\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629","\u0641\u0635\u064A\u0644\u0629 \u0627\u0644\u062F\u0645","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"],l=e.map((y,g)=>{const b=this.isEmployeeInactive(y),u=this.formatDateSafe(y.birthDate),v=this.formatDateSafe(y.hireDate),E=this.calculateAge(y.birthDate);return[g+1,y.employeeNumber||"",this._employeeDisplayName_(y),y.department||"",y.job||y.position||"",y.nationalId||"",u||"",E||"",v||"",y.gender||"",y.phone||"",y.insuranceNumber||"",b?"\u0645\u0633\u062A\u0642\u064A\u0644":"\u0646\u0634\u0637",y.bloodType||y.bloodGroup||"",y.email||""]}),r=[[t],[a],[i],[`\u062A\u0627\u0631\u064A\u062E \u0648\u0633\u0627\u0639\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${s} | \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`],[],n,...l],c=XLSX.utils.aoa_to_sheet(r),p=n.length;c["!merges"]=[{s:{r:0,c:0},e:{r:0,c:p-1}},{s:{r:1,c:0},e:{r:1,c:p-1}},{s:{r:2,c:0},e:{r:2,c:p-1}},{s:{r:3,c:0},e:{r:3,c:p-1}}],c["!cols"]=[{wch:6},{wch:14},{wch:28},{wch:20},{wch:20},{wch:18},{wch:14},{wch:8},{wch:14},{wch:10},{wch:16},{wch:16},{wch:12},{wch:12},{wch:24}];const d=XLSX.utils.book_new();XLSX.utils.book_append_sheet(d,c,"\u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646");const m=`employees_registry_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(d,m),Notification.success(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0628\u0646\u062C\u0627\u062D (${e.length} \u0645\u0648\u0638\u0641)`)},printEmployeesRegistry(){const e=Array.isArray(this._lastFilteredEmployees)&&this._lastFilteredEmployees.length>0?this._lastFilteredEmployees:AppState.appData?.employees||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const t=e.filter(r=>!this.isEmployeeInactive(r)).length,a=e.length-t,i=new Set(e.map(r=>r.department).filter(Boolean)).size,o=e.map((r,c)=>{const p=this.isEmployeeInactive(r),d=this.formatDateSafe(r.hireDate),m=this.calculateAge(r.birthDate);return`
                <tr>
                    <td>${c+1}</td>
                    <td><strong>${Utils.escapeHTML(r.employeeNumber||"-")}</strong></td>
                    <td style="text-align: right; font-weight: 700;">${Utils.escapeHTML(this._employeeDisplayName_(r))}</td>
                    <td>${Utils.escapeHTML(r.department||"-")}</td>
                    <td>${Utils.escapeHTML(r.job||r.position||"-")}</td>
                    <td>${Utils.escapeHTML(r.nationalId||"-")}</td>
                    <td>${d||"-"}</td>
                    <td>${m?m+" \u0633\u0646\u0629":"-"}</td>
                    <td>${Utils.escapeHTML(r.phone||"-")}</td>
                    <td><span class="badge ${p?"badge-danger":"badge-success"}" style="font-size: 9.5px; padding: 2px 6px; border-radius: 4px; font-weight: 800; background: ${p?"#fee2e2; color: #b91c1c;":"#dcfce7; color: #15803d;"}">${p?"\u0645\u0633\u062A\u0642\u064A\u0644":"\u0646\u0634\u0637"}</span></td>
                </tr>
            `}).join(""),s=this.getIsoPrintHeaderHtml("\u0633\u062C\u0644 \u062D\u0635\u0631 \u0648\u062A\u0633\u0643\u064A\u0646 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F","Certified Workforce Master Registry & Manpower Census","DOC-HSE-EMP-REG-01","Rev. 02","\u0639\u0627\u0645 \u062F\u0627\u062E\u0644\u064A"),n=this.getIsoPrintFooterHtml("DOC-HSE-EMP-REG-01","Rev. 02","ISO 45001:2018 (Clause 7.1, 7.2)"),l=`
            <div class="no-print-bar">
                <div class="brand-badge">
                    <span class="pill-tag">ICAPP HSE & HR</span>
                    <span class="title-text">\u0633\u062C\u0644 \u062D\u0635\u0631 \u0648\u062A\u0633\u0643\u064A\u0646 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F (${e.length} \u0645\u0648\u0638\u0641)</span>
                </div>
                <div class="action-buttons">
                    <button type="button" onclick="window.print()" class="btn-print">
                        \u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0633\u062C\u0644
                    </button>
                    <button type="button" onclick="window.close()" class="btn-close">
                        \u274C \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629
                    </button>
                </div>
            </div>

            <div class="report-page-container landscape">
                ${s}

                <div class="handover-info-grid">
                    <div class="info-card">
                        <div class="card-label">\u{1F465} \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A</div>
                        <div class="card-value">${e.length} \u0645\u0648\u0638\u0641</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u2705 \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0627\u0644\u0646\u0634\u0637\u0629</div>
                        <div class="card-value" style="color: #047857;">${t} \u0639\u0644\u0649 \u0631\u0623\u0633 \u0627\u0644\u0639\u0645\u0644</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u26D4 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0644\u0648\u0646 \u0648\u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646</div>
                        <div class="card-value" style="color: #b91c1c;">${a} \u0645\u0648\u0638\u0641</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u{1F3E2} \u0639\u062F\u062F \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</div>
                        <div class="card-value">${i} \u0625\u062F\u0627\u0631\u0629</div>
                    </div>
                </div>

                <table class="iso-table">
                    <thead>
                        <tr>
                            <th style="width: 35px;">#</th>
                            <th style="width: 85px;">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                            <th>\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644</th>
                            <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                            <th>\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                            <th>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646</th>
                            <th>\u0627\u0644\u0633\u0646</th>
                            <th>\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${o}
                    </tbody>
                </table>

                <div class="signatures-grid">
                    <div class="sig-card">
                        <div class="sig-card-title">\u0625\u0639\u062F\u0627\u062F \u0648\u062A\u062F\u0642\u064A\u0642 \u0634\u0624\u0648\u0646 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646</div>
                        <div class="sig-card-name">\u0645\u0633\u0624\u0648\u0644 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        <div class="sig-card-name">\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629</div>
                        <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0639\u0627\u0645 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u062E\u062A\u0645 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                    </div>
                </div>

                ${n}
            </div>
        `;this.openIsoPrintWindow("\u0633\u062C\u0644 \u062D\u0635\u0631 \u0648\u062A\u0633\u0643\u064A\u0646 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F",l,!0)}};Employees.getExternalWorkforceExportHeaderInfo=function(e,t=new Date){const a="\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)",i="\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629",o=typeof Utils<"u"&&typeof Utils.formatDateTime=="function"?Utils.formatDateTime(t):new Date(t).toISOString().slice(0,19).replace("T"," ");return{companyName:a,secondaryName:i,reportTitle:e,exportDateTime:o}},Employees.buildExternalWorkforceExcelWorksheet=function(e,t,a,i=new Date){const o=this.getExternalWorkforceExportHeaderInfo(a,i),s=[e,...t],n=Math.max(...s.map(c=>Array.isArray(c)?c.length:0),1),l=[[o.companyName],[o.secondaryName],[o.reportTitle],[`Generated: ${o.exportDateTime} | \u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629: DOC-HSE-CON-01`],[],...s],r=XLSX.utils.aoa_to_sheet(l);return r["!merges"]=[{s:{r:0,c:0},e:{r:0,c:n-1}},{s:{r:1,c:0},e:{r:1,c:n-1}},{s:{r:2,c:0},e:{r:2,c:n-1}},{s:{r:3,c:0},e:{r:3,c:n-1}}],r["!cols"]=[{wch:28},{wch:14}].concat(new Array(Math.max(n-3,0)).fill({wch:14}),[{wch:16}]),r},Employees.exportExternalWorkforceToExcel=function(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 XLSX \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const{model:e,header:t,rows:a}=this.getExternalWorkforceExportRows(),i=`${this.getExternalWorkforceViewState().labels.externalTab} - ${e.year}`,o=XLSX.utils.book_new(),s=this.buildExternalWorkforceExcelWorksheet(t,a,i,new Date);XLSX.utils.book_append_sheet(o,s,`\u0645\u0642\u0627\u0648\u0644\u064A\u0646 ${e.year}`),XLSX.writeFile(o,`external_workforce_${e.year}_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u0644\u0633\u0646\u0629 ${e.year} \u0628\u0646\u062C\u0627\u062D`)},Employees.exportExternalWorkforceToPDF=function(){const{model:e,header:t,rows:a}=this.getExternalWorkforceExportRows(),i=this.getExternalWorkforceViewState(),o=t.map(c=>`<th>${Utils.escapeHTML(String(c??""))}</th>`).join(""),s=a.map((c,p)=>`
            <tr class="${p>=a.length-4?"total-row":""}">
                ${c.map((m,y)=>`<td style="${y===0?"text-align: right; font-weight: 700;":""}">${Utils.escapeHTML(String(m??""))}</td>`).join("")}
            </tr>
        `).join(""),n=this.getIsoPrintHeaderHtml(`\u062A\u0642\u0631\u064A\u0631 \u062D\u0635\u0631 \u0633\u0627\u0639\u0627\u062A \u0648\u062A\u0639\u062F\u0627\u062F \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u2014 \u0644\u0633\u0646\u0629 ${e.year}`,"Contractors & External Workforce Annual Man-Hours & Headcount Registry","DOC-HSE-CON-01","Rev. 02","\u0639\u0627\u0645 \u062F\u0627\u062E\u0644\u064A"),l=this.getIsoPrintFooterHtml("DOC-HSE-CON-01","Rev. 02","ISO 45001:2018 (Clause 8.1.4 Contractor Safety & OSHA 1910)"),r=`
        <div class="no-print-bar">
            <div class="brand-badge">
                <span class="pill-tag">ICAPP HSE & CONTRACTORS</span>
                <span class="title-text">\u0633\u062C\u0644 \u062D\u0635\u0631 \u0648\u062A\u0639\u062F\u0627\u062F \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 (${e.year})</span>
            </div>
            <div class="action-buttons">
                <button type="button" onclick="window.print()" class="btn-print">
                    \u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
                </button>
                <button type="button" onclick="window.close()" class="btn-close">
                    \u274C \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629
                </button>
            </div>
        </div>

        <div class="report-page-container landscape">
            ${n}

            <div class="handover-info-grid">
                <div class="info-card">
                    <div class="card-label">\u{1F4C5} \u0633\u0646\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
                    <div class="card-value">${e.year}</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u{1F69C} \u0639\u062F\u062F \u0645\u0642\u0627\u0648\u0644\u064A \u0627\u0644\u0645\u0648\u0642\u0639</div>
                    <div class="card-value">${e.rows.length} \u0645\u0642\u0627\u0648\u0644 \u0645\u0639\u062A\u0645\u062F</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u23F1\uFE0F \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u0631\u0627\u0643\u0645\u064A\u0629 (YTD)</div>
                    <div class="card-value" style="color: #047857;">${Number(e.hoursYtd||0).toLocaleString("ar-EG")} \u0633\u0627\u0639\u0629</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u{1F477} \u0625\u062C\u0645\u0627\u0644\u064A \u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0633\u062C\u0644\u0629</div>
                    <div class="card-value">${Number(e.grandTotal||0).toLocaleString("ar-EG")} \u0641\u0631\u062F</div>
                </div>
            </div>

            <table class="iso-table" style="font-size: 10px;">
                <thead>
                    <tr>${o}</tr>
                </thead>
                <tbody>
                    ${s}
                </tbody>
            </table>

            <div class="signatures-grid">
                <div class="sig-card">
                    <div class="sig-card-title">\u0625\u0639\u062F\u0627\u062F \u0648\u062A\u0646\u0633\u064A\u0642 \u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                    <div class="sig-card-name">\u0645\u0646\u0633\u0642 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</div>
                    <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                </div>
                <div class="sig-card">
                    <div class="sig-card-title">\u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</div>
                    <div class="sig-card-name">\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                    <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                </div>
                <div class="sig-card">
                    <div class="sig-card-title">\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629</div>
                    <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0639\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                    <div class="sig-line-area">\u0627\u0644\u062E\u062A\u0645 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                </div>
            </div>

            ${l}
        </div>
    `;return this.openIsoPrintWindow(`\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 - ${e.year}`,r,!0)},Employees.exportToExcel=function(){return Employees.exportToExcel.apply(Employees,arguments)},Employees.printEmployeesRegistry=function(){return Employees.printEmployeesRegistry.apply(Employees,arguments)},(function(){"use strict";try{typeof window<"u"&&typeof Employees<"u"&&(window.Employees=Employees,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Employees module loaded and available on window.Employees"),typeof AppState<"u"&&AppState.currentUser&&setTimeout(()=>{window.Employees&&window.Employees.init&&window.Employees.init().catch(e=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",e)})},2e3))}catch{if(typeof window<"u"&&typeof Employees<"u")try{window.Employees=Employees}catch{}}})();
