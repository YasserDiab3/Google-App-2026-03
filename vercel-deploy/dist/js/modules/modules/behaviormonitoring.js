const BehaviorMonitoring={_setupTimeoutId:null,_eventListenersAbortController:null,_modalAbortController:null,_employeeSubmitLock:!1,_contractorSubmitLock:!1,processPhoto(t){return typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"?Utils.normalizeImageSource(t)||null:!t||typeof t!="string"?null:t.trim()||null},state:{activeTab:"log",filters:{search:"",behaviorType:"",rating:"",dateFrom:"",dateTo:""},sort:"date_desc",contractorFilters:{search:"",behaviorType:"",rating:"",dateFrom:"",dateTo:""},contractorSort:"date_desc",logPage:1,contractorLogPage:1,pageSize:50},getPageSize(){const t=Number(this.state?.pageSize);return Number.isFinite(t)&&t>0?t:50},paginateItems(t,e){const i=Array.isArray(t)?t:[],o=this.getPageSize(),a=i.length,s=Math.max(1,Math.ceil(a/o)||1),n=Math.min(Math.max(1,Number(e)||1),s),r=(n-1)*o;return{page:n,totalPages:s,total:a,start:r,end:Math.min(r+o,a),items:i.slice(r,r+o)}},renderTablePaginationHTML(t,e){const{page:i,totalPages:o,total:a,start:s,end:n}=e;if(a<=this.getPageSize())return a?`<div class="bhm-pagination text-sm text-gray-500 mt-3">${s+1}\u2013${n} / ${a}</div>`:"";const r=i<=1?"disabled":"",c=i>=o?"disabled":"",d=t==="contractor"?"setContractorLogPage":"setLogPage";return`
            <div class="bhm-pagination flex flex-wrap items-center justify-between gap-3 mt-3">
                <span class="text-sm text-gray-600">${s+1}\u2013${n} / ${a}</span>
                <div class="flex items-center gap-2">
                    <button type="button" class="btn-secondary btn-sm" ${r} onclick="BehaviorMonitoring.${d}(${i-1})">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <span class="text-sm font-semibold">${i} / ${o}</span>
                    <button type="button" class="btn-secondary btn-sm" ${c} onclick="BehaviorMonitoring.${d}(${i+1})">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                </div>
            </div>
        `},setLogPage(t){this.state.logPage=Math.max(1,Number(t)||1),this.renderLogTable()},setContractorLogPage(t){this.state.contractorLogPage=Math.max(1,Number(t)||1),this.renderContractorLogTable()},t(t,e){try{if(typeof AppI18n<"u"&&typeof AppI18n.t=="function")return AppI18n.t(t,null,e!=null?String(e):"");if(typeof I18n<"u"&&typeof I18n.t=="function")return I18n.t(t,null,e!=null?String(e):"")}catch{}return e!=null?String(e):t},NEGATIVE_ACTIONS:["\u062A\u0648\u0639\u064A\u0629 / \u062A\u0648\u062C\u064A\u0647","\u0625\u0639\u0627\u062F\u0629 \u062A\u062F\u0631\u064A\u0628","\u062A\u062D\u0630\u064A\u0631 \u0634\u0641\u0647\u064A","\u0625\u0646\u0630\u0627\u0631 \u0643\u062A\u0627\u0628\u064A","\u0625\u064A\u0642\u0627\u0641 \u0645\u0624\u0642\u062A \u0639\u0646 \u0627\u0644\u0639\u0645\u0644","\u062A\u0637\u0628\u064A\u0642 / \u062A\u0639\u062F\u064A\u0644 \u0625\u062C\u0631\u0627\u0621 \u0639\u0645\u0644","\u062A\u062D\u0633\u064A\u0646\u0627\u062A \u0647\u0646\u062F\u0633\u064A\u0629 (Engineering)","\u062A\u0648\u0641\u064A\u0631 / \u0625\u0644\u0632\u0627\u0645 PPE","\u0623\u062E\u0631\u0649"],getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(t=>({id:t.id,name:t.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(t=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((t,e)=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||`\u0645\u0648\u0642\u0639 ${e+1}`})):[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t),[]}},getPlaceOptions(t){try{if(!t)return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const e=Permissions.formSettingsState.sites.find(i=>i.id===t);if(e&&Array.isArray(e.places))return e.places.map(i=>({id:i.id,name:i.name}))}if(Array.isArray(AppState.appData?.observationSites)){const e=AppState.appData.observationSites.find(i=>(i.id||i.siteId)===t);if(e)return(Array.isArray(e.places)?e.places:Array.isArray(e.locations)?e.locations:Array.isArray(e.children)?e.children:Array.isArray(e.areas)?e.areas:[]).map((o,a)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${a+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const e=DailyObservations.DEFAULT_SITES.find(i=>(i.id||i.siteId)===t);if(e)return(Array.isArray(e.places)?e.places:Array.isArray(e.locations)?e.locations:Array.isArray(e.children)?e.children:Array.isArray(e.areas)?e.areas:[]).map((o,a)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${a+1}`}))}return[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",e),[]}},refreshSiteDropdowns(){try{var t=this.getSiteOptions();if(!t||!t.length)return;var e=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(i){return String(i??"")};document.querySelectorAll('select[id$="-factory"]').forEach(function(i){if(i.tagName==="SELECT"){var o=i.value;i.innerHTML='<option value="">'+this.t("module.behavior.selectFactory","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")+"</option>"+t.map(function(a){return'<option value="'+e(a.id)+'">'+e(a.name)+"</option>"}).join(""),o&&(i.value=o)}})}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F BehaviorMonitoring.refreshSiteDropdowns:",i)}},resolveSiteName(t){const e=(t||"").toString();if(!e)return"";const i=this.getSiteOptions();return(i.find(a=>a.id===e)||i.find(a=>(a.name||"")===e))?.name||e},resolvePlaceName(t,e){const i=(t||"").toString();if(!i)return"";const o=(e||"").toString(),a=this.getPlaceOptions(o);return(a.find(n=>n.id===i)||a.find(n=>(n.name||"")===i))?.name||i},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||AppState?.currentSection&&AppState.currentSection!=="behavior-monitoring"||this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u")return;if(typeof AppState>"u"){const e=document.getElementById("behavior-monitoring-section");e&&(e.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">${this.t("module.behavior.loadFailed","\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A")}</p>
                                <p class="text-sm text-gray-400">${this.t("module.behavior.appStateMissing","AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B. \u062C\u0631\u0651\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")}</p>
                                <button onclick="location.reload()" class="btn-primary mt-4">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `),Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}const t=document.getElementById("behavior-monitoring-section");if(!t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0642\u0633\u0645 behavior-monitoring-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}AppState.appData||(AppState.appData={}),AppState.appData.behaviorMonitoring||(AppState.appData.behaviorMonitoring=[]),AppState.appData.contractorBehaviorMonitoring||(AppState.appData.contractorBehaviorMonitoring=[]);try{const e=this.state?.activeTab||"log",i=e==="form"?"log":e;if(this.state.activeTab=i,t.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-eye ml-3"></i>
                                ${this.t("module.behavior.title","\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A")}
                            </h1>
                            <p class="section-subtitle">${this.t("module.behavior.subtitle","\u062A\u0633\u062C\u064A\u0644 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0633\u0644\u0648\u0643\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}</p>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap justify-end">
                            <button id="behavior-refresh-btn" class="btn-secondary">
                                <i class="fas fa-sync-alt ml-2"></i>
                                ${this.t("common.refresh","\u062A\u062D\u062F\u064A\u062B")}
                            </button>
                            <button id="behavior-add-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${this.t("module.behavior.addEmployee","\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641 \u0645\u0648\u0638\u0641")}
                            </button>
                            <button id="behavior-add-contractor-header-btn" type="button" class="btn-secondary">
                                <i class="fas fa-users-cog ml-2"></i>
                                ${this.t("module.behavior.addContractor","\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641 \u0645\u0642\u0627\u0648\u0644")}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-6">
                    <div class="module-tabs-wrapper">
                        <div class="module-tabs-container">
                            <button class="module-tab-btn ${i==="overview"?"active":""}" data-tab="overview" onclick="BehaviorMonitoring.switchTab('overview')">
                                <i class="fas fa-chart-pie ml-2"></i>${this.t("module.behavior.tabs.overview","\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629")}
                            </button>
                            <button class="module-tab-btn ${i==="log"?"active":""}" data-tab="log" onclick="BehaviorMonitoring.switchTab('log')">
                                <i class="fas fa-list ml-2"></i>${this.t("module.behavior.tabs.employeeLog","\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}
                            </button>
                            <button class="module-tab-btn ${i==="contractors"?"active":""}" data-tab="contractors" onclick="BehaviorMonitoring.switchTab('contractors')">
                                <i class="fas fa-users-cog ml-2"></i>${this.t("module.behavior.tabs.contractorLog","\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}
                            </button>
                        </div>
                    </div>
                </div>

                <div id="behavior-content" class="mt-6">
                    ${this.renderTabSkeleton(i)}
                </div>
            `,this.setupEventListeners(),await this.switchTab(i,{initial:!0}),typeof AppState<"u"&&AppState._languageRefresh===!0)return;setTimeout(()=>{this.loadBehaviorDataAsync().then(()=>{const o=this.state?.activeTab||"log";this.switchTab(o,{silent:!0}).catch(()=>{this.refreshCurrentTab()})}).catch(o=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643:",o),this.refreshCurrentTab()})},100)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A:",e),t.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-eye ml-3"></i>
                            \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">${this.t("module.behavior.dataLoadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                                <p class="text-sm text-gray-400 mb-4">${e&&e.message?Utils.escapeHTML(e.message):this.t("common.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")}</p>
                                <button onclick="BehaviorMonitoring.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}},async loadBehaviorDataAsync(){try{const t=await GoogleIntegration.sendRequest({action:"getAllBehaviors",data:{}}).catch(i=>{const o=i.message||i.toString()||"";return o.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||o.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643:",i),{success:!1,data:[]})}),e=await GoogleIntegration.sendRequest({action:"getAllContractorBehaviors",data:{}}).catch(i=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",i),{success:!1,data:[]}));if(t&&t.success&&Array.isArray(t.data)){const i=Array.isArray(AppState.appData.behaviorMonitoring)?AppState.appData.behaviorMonitoring:[];t.data.length===0&&i.length>0?Utils.safeWarn(`\u26A0\uFE0F \u062A\u062C\u0627\u0647\u0644 behaviorMonitoring \u0641\u0627\u0631\u063A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 ${i.length} \u0633\u062C\u0644 \u0645\u062D\u0644\u064A`):(AppState.appData.behaviorMonitoring=t.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${t.data.length} \u0633\u062C\u0644 \u0645\u0646 Google Sheets`))}if(e&&e.success&&Array.isArray(e.data)){const i=Array.isArray(AppState.appData.contractorBehaviorMonitoring)?AppState.appData.contractorBehaviorMonitoring:[];e.data.length===0&&i.length>0?Utils.safeWarn(`\u26A0\uFE0F \u062A\u062C\u0627\u0647\u0644 contractorBehaviorMonitoring \u0641\u0627\u0631\u063A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 ${i.length} \u0633\u062C\u0644 \u0645\u062D\u0644\u064A`):(AppState.appData.contractorBehaviorMonitoring=e.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${e.data.length} \u0633\u062C\u0644 \u062A\u0635\u0631\u0641\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646`))}(t&&t.success||e&&e.success)&&this.refreshCurrentTab(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(t){const e=t.message||t.toString()||"";Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643 \u0645\u0646 Google Sheets:",t),e.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||e.includes("timeout")?Notification.error({title:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",message:"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629.",duration:5e3,persistent:!1}):Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629.")}},renderTabSkeleton(t){return t==="overview"?this.renderOverviewTab(!0):t==="contractors"?this.renderContractorsTab(!0):this.renderLogTab(!0)},getBehaviors(){return!AppState?.appData?.behaviorMonitoring||!Array.isArray(AppState.appData.behaviorMonitoring)?[]:AppState.appData.behaviorMonitoring.map(t=>this.presentBehavior(t))},getRawBehaviorById(t){const e=AppState?.appData?.behaviorMonitoring;return Array.isArray(e)&&e.find(i=>i&&i.id===t)||null},normalizeBehaviorRecord(t){if(!t||typeof t!="object")return t;const e={...t},i=a=>{for(let s=0;s<a.length;s++){const n=a[s];if(!Object.prototype.hasOwnProperty.call(t,n))continue;const r=t[n];if(r!=null&&String(r).trim()!=="")return r}},o=(a,s)=>{const n=e[a];if(n!=null&&String(n).trim()!=="")return;const r=i(s);r!==void 0&&(e[a]=r)};return o("isoCode",["isoCode","ISO","IsoCode","\u0643\u0648\u062F ISO"]),o("employeeCode",["employeeCode","employee_number","EmployeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]),o("employeeNumber",["employeeNumber","employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]),o("employeeName",["employeeName","EmployeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"]),o("department",["department","Department","\u0627\u0644\u0642\u0633\u0645","employeeDepartment","Dept"]),o("job",["job","Job","position","Position","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A","jobTitle"]),o("factory",["factory","factoryId","Factory","FactoryId"]),o("factoryId",["factoryId","factory"]),o("factoryName",["factoryName","FactoryName","factory_name","\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0648\u0642\u0639","\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644","siteName","Site"]),o("subLocation",["subLocation","subLocationId","SubLocation"]),o("subLocationId",["subLocationId","subLocation"]),o("subLocationName",["subLocationName","sub_location_name","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A","\u0645\u0648\u0642\u0639 \u0641\u0631\u0639\u064A","SubLocationName","\u0627\u0644\u0645\u0643\u0627\u0646"]),o("behaviorType",["behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641","Type"]),o("rating",["rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645"]),o("description",["description","Description","\u0627\u0644\u0648\u0635\u0641","\u0645\u0644\u0627\u062D\u0638\u0627\u062A","Notes","details"]),o("correctiveAction",["correctiveAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A"]),o("correctiveActionDetails",["correctiveActionDetails","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621"]),o("date",["date","Date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","behaviorDate"]),o("photo",["photo","Photo","\u0635\u0648\u0631\u0629","image"]),e},enrichBehaviorRecord(t){if(!t||typeof t!="object")return t;const e={...t},i=String(e.employeeCode||e.employeeNumber||"").trim(),o=!String(e.department||"").trim(),a=!String(e.job||e.position||"").trim();if(i&&(o||a)){const c=(Array.isArray(AppState?.appData?.employees)?AppState.appData.employees:[]).find(d=>String(d.employeeNumber||"").trim()===i||String(d.sapId||"").trim()===i||String(d.id||"").trim()===i);c&&(o&&(e.department=c.department||c.dept||""),a&&(e.job=c.job||c.position||c.jobTitle||""))}const s=String(e.factoryId||e.factory||"").trim();s&&!String(e.factoryName||"").trim()&&(e.factoryName=this.resolveSiteName(s)),!String(e.factoryName||"").trim()&&String(e.factory||"").trim()&&(e.factoryName=this.resolveSiteName(e.factory));const n=String(e.subLocationId||e.subLocation||"").trim();return n&&!String(e.subLocationName||"").trim()&&(e.subLocationName=this.resolvePlaceName(n,s||e.factory)),e},presentBehavior(t){return!t||typeof t!="object"?t:this.enrichBehaviorRecord(this.normalizeBehaviorRecord(t))},editBehavior(t){const e=this.getRawBehaviorById(t);if(!e){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.showForm(this.presentBehavior(e))},formatBehaviorDateDisplay(t){const e=t&&typeof t=="object"&&!Array.isArray(t)?this.getBehaviorDate(t):t;if(!e)return"\u2014";try{let i;const o=String(e).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(o)){const a=o.split("-").map(Number);i=new Date(a[0],a[1]-1,a[2])}else i=new Date(e);return isNaN(i.getTime())?"\u2014":i.toLocaleDateString("ar-EG-u-ca-gregory",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}catch{return"\u2014"}},parseDateSafe(t){try{const e=t instanceof Date?t:new Date(t);return!e||Number.isNaN(e.getTime())?null:e}catch{return null}},getBehaviorDate(t){return t&&(t.date||t.Date||t.\u0627\u0644\u062A\u0627\u0631\u064A\u062E||t.behaviorDate||t.createdAt||t.updatedAt)||null},normalizeBehaviorDayKey(t){const e=this.parseDateSafe?this.parseDateSafe(t):null;if(!e||Number.isNaN(e.getTime())){const n=String(t||"").trim().match(/^(\d{4}-\d{2}-\d{2})/);return n?n[1]:""}const i=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${i}-${o}-${a}`},normalizeBehaviorCompareText(t){return String(t??"").trim().replace(/\s+/g," ").toLowerCase()},isSameBehaviorEmployeePerson(t,e){const i=this.normalizeBehaviorCompareText(t?.employeeCode||t?.employeeNumber||t?.employeeId),o=this.normalizeBehaviorCompareText(e?.employeeCode||e?.employeeNumber||e?.employeeId),a=this.normalizeBehaviorCompareText(t?.employeeName),s=this.normalizeBehaviorCompareText(e?.employeeName);return!!(i&&o&&i===o||a&&s&&a===s)},isSameBehaviorContractorPerson(t,e){const i=this.normalizeBehaviorCompareText(t?.contractorId),o=this.normalizeBehaviorCompareText(e?.contractorId),a=this.normalizeBehaviorCompareText(t?.contractorName),s=this.normalizeBehaviorCompareText(e?.contractorName),n=this.normalizeBehaviorCompareText(t?.contractorWorker),r=this.normalizeBehaviorCompareText(e?.contractorWorker);return i&&o&&i===o||a&&s&&a===s?n===r:!1},isSameBehaviorPayload(t,e){return!(this.normalizeBehaviorDayKey(this.getBehaviorDate(t)||t?.date)!==this.normalizeBehaviorDayKey(e?.date)||this.normalizeBehaviorCompareText(t?.behaviorType)!==this.normalizeBehaviorCompareText(e?.behaviorType)||this.normalizeBehaviorCompareText(t?.description)!==this.normalizeBehaviorCompareText(e?.description)||this.normalizeBehaviorCompareText(t?.rating)!==this.normalizeBehaviorCompareText(e?.rating)||this.normalizeBehaviorCompareText(t?.factoryId||t?.factory)!==this.normalizeBehaviorCompareText(e?.factoryId||e?.factory)||this.normalizeBehaviorCompareText(t?.subLocationId||t?.subLocation)!==this.normalizeBehaviorCompareText(e?.subLocationId||e?.subLocation)||this.normalizeBehaviorCompareText(t?.correctiveAction)!==this.normalizeBehaviorCompareText(e?.correctiveAction))},findDuplicateEmployeeBehavior(t,e=null){return(Array.isArray(AppState?.appData?.behaviorMonitoring)?AppState.appData.behaviorMonitoring:[]).find(o=>!o||e&&o.id===e||!this.isSameBehaviorEmployeePerson(o,t)?!1:this.isSameBehaviorPayload(o,t))||null},findDuplicateContractorBehavior(t,e=null){return(Array.isArray(AppState?.appData?.contractorBehaviorMonitoring)?AppState.appData.contractorBehaviorMonitoring:[]).find(o=>!o||e&&o.id===e||!this.isSameBehaviorContractorPerson(o,t)?!1:this.isSameBehaviorPayload(o,t))||null},isAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function")return!!Permissions.isCurrentUserAdmin();const t=String(AppState?.currentUser?.role||"").trim().toLowerCase();return t==="admin"||t==="administrator"||t==="system_admin"||t==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"},canDeleteBehavior(){return this.isAdmin()},getEmployeeBehaviorDedupKey(t){const e=this.normalizeBehaviorCompareText(t?.employeeCode||t?.employeeNumber||t?.employeeId||t?.employeeName),i=this.normalizeBehaviorDayKey(this.getBehaviorDate(t)||t?.date);return[e,i,this.normalizeBehaviorCompareText(t?.behaviorType),this.normalizeBehaviorCompareText(t?.description),this.normalizeBehaviorCompareText(t?.rating),this.normalizeBehaviorCompareText(t?.factoryId||t?.factory),this.normalizeBehaviorCompareText(t?.subLocationId||t?.subLocation),this.normalizeBehaviorCompareText(t?.correctiveAction)].join("|")},getContractorBehaviorDedupKey(t){const e=[this.normalizeBehaviorCompareText(t?.contractorId||t?.contractorName),this.normalizeBehaviorCompareText(t?.contractorWorker)].join("::"),i=this.normalizeBehaviorDayKey(this.getBehaviorDate(t)||t?.date);return[e,i,this.normalizeBehaviorCompareText(t?.behaviorType),this.normalizeBehaviorCompareText(t?.description),this.normalizeBehaviorCompareText(t?.rating),this.normalizeBehaviorCompareText(t?.factoryId||t?.factory),this.normalizeBehaviorCompareText(t?.subLocationId||t?.subLocation),this.normalizeBehaviorCompareText(t?.correctiveAction)].join("|")},collectDuplicateBehaviorIdsToRemove(t,e){const i=new Map;(Array.isArray(t)?t:[]).forEach(a=>{if(!a||!a.id)return;const s=e.call(this,a);!s||!(String(s).split("|")[0]||"").trim()||(i.has(s)||i.set(s,[]),i.get(s).push(a))});const o=[];return i.forEach(a=>{a.length<2||(a.sort((s,n)=>{const r=Date.parse(s.createdAt||s.updatedAt||s.date||0)||0,c=Date.parse(n.createdAt||n.updatedAt||n.date||0)||0;return r!==c?r-c:String(s.id).localeCompare(String(n.id))}),a.slice(1).forEach(s=>o.push(s.id)))}),o},async persistBehaviorList(t,e){typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave(t,AppState.appData[e]||[])},async deleteBehaviorById(t){if(!this.canDeleteBehavior()){Notification.error("\u0627\u0644\u062D\u0630\u0641 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637");return}const e=String(t||"").trim();if(!e)return;const i=this.getRawBehaviorById(e);if(!i){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=`${i.employeeName||i.employeeCode||e} \u2014 ${this.formatBehaviorDateDisplay(i)||""}`;if(window.confirm(`\u062D\u0630\u0641 \u062A\u0635\u0631\u0641 \u0627\u0644\u0645\u0648\u0638\u0641\u061F
${o}

\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639.`)){Loading.show();try{AppState.appData.behaviorMonitoring=(AppState.appData.behaviorMonitoring||[]).filter(a=>a&&a.id!==e),await this.persistBehaviorList("BehaviorMonitoring","behaviorMonitoring"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u0641"),document.querySelectorAll(".modal-overlay").forEach(a=>{(a.classList.contains("bhm-detail-overlay")||a.querySelector(".bhm-detail-title"))&&a.remove()}),this.refreshCurrentTab()}catch(a){Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641: "+(a?.message||a))}finally{Loading.hide()}}},async deleteContractorBehaviorById(t){if(!this.canDeleteBehavior()){Notification.error("\u0627\u0644\u062D\u0630\u0641 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637");return}const e=String(t||"").trim();if(!e)return;const i=this.getRawContractorBehaviorById(e);if(!i){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=`${i.contractorName||""} / ${i.contractorWorker||e} \u2014 ${this.formatBehaviorDateDisplay(i)||""}`;if(window.confirm(`\u062D\u0630\u0641 \u062A\u0635\u0631\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u061F
${o}

\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639.`)){Loading.show();try{AppState.appData.contractorBehaviorMonitoring=(AppState.appData.contractorBehaviorMonitoring||[]).filter(a=>a&&a.id!==e),await this.persistBehaviorList("ContractorBehaviorMonitoring","contractorBehaviorMonitoring"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u0641"),this.refreshCurrentTab()}catch(a){Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641: "+(a?.message||a))}finally{Loading.hide()}}},async cleanupDuplicateEmployeeBehaviors(){if(!this.canDeleteBehavior()){Notification.error("\u062D\u0630\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637");return}const t=Array.isArray(AppState.appData.behaviorMonitoring)?AppState.appData.behaviorMonitoring:[],e=this.collectDuplicateBehaviorIdsToRemove(t,this.getEmployeeBehaviorDedupKey);if(!e.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0631\u0641\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0643\u0631\u0631\u0629");return}if(window.confirm(`\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 ${e.length} \u0633\u062C\u0644 \u0645\u0643\u0631\u0631 \u0644\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646.
\u064A\u064F\u0628\u0642\u0649 \u0623\u0642\u062F\u0645 \u0633\u062C\u0644 \u0644\u0643\u0644 \u0645\u062C\u0645\u0648\u0639\u0629 (\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635 + \u0646\u0641\u0633 \u0627\u0644\u064A\u0648\u0645 + \u0646\u0641\u0633 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A).
\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`)){Loading.show();try{const i=new Set(e.map(String));AppState.appData.behaviorMonitoring=t.filter(o=>o&&!i.has(String(o.id))),await this.persistBehaviorList("BehaviorMonitoring","behaviorMonitoring"),Notification.success(`\u062A\u0645 \u062D\u0630\u0641 ${e.length} \u062A\u0635\u0631\u0641 \u0645\u0643\u0631\u0631`),this.refreshCurrentTab()}catch(i){Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A: "+(i?.message||i))}finally{Loading.hide()}}},async cleanupDuplicateContractorBehaviors(){if(!this.canDeleteBehavior()){Notification.error("\u062D\u0630\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637");return}const t=Array.isArray(AppState.appData.contractorBehaviorMonitoring)?AppState.appData.contractorBehaviorMonitoring:[],e=this.collectDuplicateBehaviorIdsToRemove(t,this.getContractorBehaviorDedupKey);if(!e.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0631\u0641\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0643\u0631\u0631\u0629");return}if(window.confirm(`\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 ${e.length} \u0633\u062C\u0644 \u0645\u0643\u0631\u0631 \u0644\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646.
\u064A\u064F\u0628\u0642\u0649 \u0623\u0642\u062F\u0645 \u0633\u062C\u0644 \u0644\u0643\u0644 \u0645\u062C\u0645\u0648\u0639\u0629 (\u0646\u0641\u0633 \u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644 + \u0646\u0641\u0633 \u0627\u0644\u064A\u0648\u0645 + \u0646\u0641\u0633 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A).
\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`)){Loading.show();try{const i=new Set(e.map(String));AppState.appData.contractorBehaviorMonitoring=t.filter(o=>o&&!i.has(String(o.id))),await this.persistBehaviorList("ContractorBehaviorMonitoring","contractorBehaviorMonitoring"),Notification.success(`\u062A\u0645 \u062D\u0630\u0641 ${e.length} \u062A\u0635\u0631\u0641 \u0645\u0643\u0631\u0631`),this.refreshCurrentTab()}catch(i){Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A: "+(i?.message||i))}finally{Loading.hide()}}},getBehaviorTypeBadgeClass(t){return t==="\u0625\u064A\u062C\u0627\u0628\u064A"?"badge-success":t==="\u0633\u0644\u0628\u064A"?"badge-danger":"badge-secondary"},getRatingBadgeClass(t){return t==="\u0645\u0645\u062A\u0627\u0632"?"badge-success":t==="\u062C\u064A\u062F"?"badge-primary":t==="\u0645\u0642\u0628\u0648\u0644"?"badge-warning":t==="\u0636\u0639\u064A\u0641"?"badge-danger":"badge-secondary"},matchesSearch(t,e){const i=(e||"").toString().trim().toLowerCase();return i?[t?.isoCode,t?.employeeName,t?.employeeCode,t?.employeeNumber,t?.department,t?.factoryName,t?.subLocationName,t?.behaviorType,t?.rating,t?.description].filter(Boolean).join(" ").toLowerCase().includes(i):!0},getFilteredBehaviors(){const t=this.getBehaviors(),e=this.state?.filters||{},i=(e.behaviorType||"").toString().trim(),o=(e.rating||"").toString().trim(),a=(e.search||"").toString(),s=e.dateFrom?this.parseDateSafe(e.dateFrom):null,n=e.dateTo?this.parseDateSafe(e.dateTo):null,r=t.filter(d=>{if(!this.matchesSearch(d,a)||i&&(d?.behaviorType||"")!==i||o&&(d?.rating||"")!==o)return!1;const h=this.parseDateSafe(this.getBehaviorDate(d));if(s&&(!h||h<s))return!1;if(n){const v=new Date(n);if(v.setHours(23,59,59,999),!h||h>v)return!1}return!0}),c=this.state?.sort||"date_desc";return r.sort((d,h)=>{const v=this.parseDateSafe(this.getBehaviorDate(d))?.getTime()||0,y=this.parseDateSafe(this.getBehaviorDate(h))?.getTime()||0;return c==="date_asc"?v-y:y-v}),r},refreshCurrentTab(){const t=this.state?.activeTab||"log";if(t==="overview"){const i=document.getElementById("behavior-overview-container");i&&(i.innerHTML=this.renderOverviewTab(!1)),this.bindCurrentTabEvents();return}if(t==="contractors"){const i=document.getElementById("behavior-content");i&&(i.innerHTML=this.renderContractorsTab(!1)),this.bindCurrentTabEvents();return}const e=document.getElementById("behavior-log-container");e&&(e.innerHTML=this.renderLogTab(!1)),this.bindCurrentTabEvents()},async switchTab(t,e={}){try{const i=t||"log",o=i==="form"?"log":i;this.state=this.state||{},this.state.activeTab=o,document.querySelectorAll("#behavior-monitoring-section .module-tab-btn").forEach(s=>{s.getAttribute("data-tab")===o?s.classList.add("active"):s.classList.remove("active")});const a=document.getElementById("behavior-content");if(!a)return;o==="overview"?a.innerHTML=this.renderOverviewTab(!1):o==="contractors"?a.innerHTML=this.renderContractorsTab(!1):a.innerHTML=this.renderLogTab(!1),this.bindCurrentTabEvents(),e?.initial&&o==="log"&&this.renderLogTable(),e?.initial&&o==="contractors"&&this.renderContractorLogTable()}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u062A\u0628\u0648\u064A\u0628 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A:",i)}},renderOverviewTab(t=!1){const e=this.getBehaviors(),i=this.getContractorBehaviors(),o=[...e,...i],a=o.length,s=e.length,n=i.length,r=o.filter(l=>l?.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A").length,c=o.filter(l=>l?.behaviorType==="\u0633\u0644\u0628\u064A").length,d=[...o].sort((l,f)=>{const S=this.parseDateSafe(this.getBehaviorDate(l))?.getTime()||0;return(this.parseDateSafe(this.getBehaviorDate(f))?.getTime()||0)-S}).slice(0,5),h=this.t("module.behaviorMonitoring.overview.title","\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629"),v=this.t("module.behaviorMonitoring.overview.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A"),y=this.t("module.behaviorMonitoring.overview.employees","\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),B=this.t("module.behaviorMonitoring.overview.contractorsExternal","\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 / \u0634\u0631\u0643\u0627\u062A \u062E\u0627\u0631\u062C\u064A\u0629"),m=this.t("module.behaviorMonitoring.overview.positive","\u062A\u0635\u0631\u0641\u0627\u062A \u0625\u064A\u062C\u0627\u0628\u064A\u0629"),b=this.t("module.behaviorMonitoring.overview.negative","\u062A\u0635\u0631\u0641\u0627\u062A \u0633\u0644\u0628\u064A\u0629"),T=this.t("module.behaviorMonitoring.overview.last5","\u0622\u062E\u0631 5 \u062A\u0635\u0631\u0641\u0627\u062A"),p=this.t("common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644..."),u=this.t("module.behaviorMonitoring.overview.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0631\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629");return`
            <div id="behavior-overview-container">
                <div class="content-card behavior-overview-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-chart-line ml-2"></i>${Utils.escapeHTML(h)}</h2>
                    </div>
                    <div class="card-body">
                        <div class="behavior-overview-stats-scroller mb-6">
                            <div class="behavior-overview-stats">
                                <div class="behavior-stat behavior-stat-total">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(v)}</p>
                                            <p class="behavior-stat-value">${t?"\u2014":a}</p>
                                        </div>
                                        <i class="fas fa-layer-group behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-employees">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(y)}</p>
                                            <p class="behavior-stat-value">${t?"\u2014":s}</p>
                                        </div>
                                        <i class="fas fa-user-tie behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-contractors">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(B)}</p>
                                            <p class="behavior-stat-value">${t?"\u2014":n}</p>
                                        </div>
                                        <i class="fas fa-users-cog behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-negative">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(b)}</p>
                                            <p class="behavior-stat-value">${t?"\u2014":c}</p>
                                        </div>
                                        <i class="fas fa-triangle-exclamation behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-positive">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(m)}</p>
                                            <p class="behavior-stat-value">${t?"\u2014":r}</p>
                                        </div>
                                        <i class="fas fa-circle-check behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="content-card behavior-mini-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-clock ml-2"></i>${Utils.escapeHTML(T)}</h3>
                            </div>
                            <div class="card-body">
                                ${t?`
                                    <div class="empty-state"><p class="text-gray-500">${Utils.escapeHTML(p)}</p></div>
                                `:d.length?`
                                    <div class="table-wrapper" style="overflow-x:auto;">
                                        <table class="data-table table-header-purple">
                                            <thead>
                                                <tr>
                                                    <th>ISO</th>
                                                    <th>\u0627\u0644\u0627\u0633\u0645</th>
                                                    <th>\u0627\u0644\u0641\u0626\u0629</th>
                                                    <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                                    <th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                                                    <th>\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641</th>
                                                    <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                                    <th>\u0627\u0644\u062A\u0642\u064A\u064A\u0645</th>
                                                    <th class="text-center">\u0625\u062C\u0631\u0627\u0621</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${d.map(l=>`
                                                    <tr>
                                                        <td>${Utils.escapeHTML(l.isoCode||"")}</td>
                                                        <td>${Utils.escapeHTML(l.employeeName||l.contractorName||"")}</td>
                                                        <td>${Utils.escapeHTML(l.contractorName?"\u0645\u0642\u0627\u0648\u0644/\u0634\u0631\u0643\u0629 \u062E\u0627\u0631\u062C\u064A\u0629":"\u0645\u0648\u0638\u0641")}</td>
                                                        <td>${Utils.escapeHTML(l.factoryName||l.factory||"\u2014")}</td>
                                                        <td>${Utils.escapeHTML(l.subLocationName||l.subLocation||"\u2014")}</td>
                                                        <td><span class="badge ${this.getBehaviorTypeBadgeClass(l.behaviorType)}">${Utils.escapeHTML(l.behaviorType||"\u2014")}</span></td>
                                                        <td>${this.getBehaviorDate(l)?this.formatBehaviorDateDisplay(l):"\u2014"}</td>
                                                        <td><span class="badge ${this.getRatingBadgeClass(l.rating)}">${Utils.escapeHTML(l.rating||"\u2014")}</span></td>
                                                        <td class="text-center">
                                                            <button onclick="BehaviorMonitoring.viewBehavior(${JSON.stringify(String(l.id||""))})" class="btn-icon btn-icon-primary" title="${this.t("common.view","\u0639\u0631\u0636")}">
                                                                <i class="fas fa-eye"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                `).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                `:`<div class="empty-state"><p class="text-gray-500">${Utils.escapeHTML(u)}</p></div>`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},renderLogTab(t=!1){const e=this.state?.filters||{},i=a=>Utils.escapeHTML((a??"").toString()),o=this.renderEmployeeActiveFilterChips();return`
            <div id="behavior-log-container">
                <div class="content-card">
                    <div class="card-header flex flex-wrap items-center justify-between gap-2" style="padding: 12px 16px;">
                        <div class="flex items-center gap-2">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-list ml-2"></i>${this.t("module.behavior.employeeBehaviorsTitle","\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0628\u062D\u062B/\u0641\u0644\u062A\u0631\u0629)")}</h2>
                            <span class="badge badge-secondary" id="behavior-filter-count">${t?"\u2014":this.getFilteredBehaviors().length}</span>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            ${this.canDeleteBehavior()?`
                            <button type="button" id="behavior-cleanup-duplicates-btn" class="btn-danger btn-sm" title="\u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0643\u0631\u0631\u0629 \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635 \u0648\u0646\u0641\u0633 \u0627\u0644\u064A\u0648\u0645 \u0648\u0646\u0641\u0633 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A">
                                <i class="fas fa-clone ml-1"></i>\u062D\u0630\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A
                            </button>
                            `:""}
                            <button id="behavior-export-csv-btn" class="btn-success btn-sm">
                                <i class="fas fa-file-csv ml-1"></i>${this.t("common.exportCSV","\u062A\u0635\u062F\u064A\u0631 CSV")}
                            </button>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 12px 16px;">
                        <div class="behavior-filter-card" style="width: 100%; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; align-items: flex-end; width: 100%;">
                                <div style="grid-column: span 2; min-width: 220px;">
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-search text-purple-600"></i> ${this.t("module.common.search","\u0627\u0644\u0628\u062D\u062B")}
                                    </label>
                                    <div class="relative" style="width: 100%;">
                                        <input id="behavior-filter-search" type="text" class="form-input" style="height: 38px; width: 100%; padding-right: 34px;" placeholder="${this.t("common.searchPlaceholder","ISO / \u0627\u0633\u0645 / \u0643\u0648\u062F / \u0648\u0635\u0641")}" value="${i(e.search)}" autocomplete="off">
                                        <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                                    </div>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-tags text-purple-600"></i> ${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")}
                                    </label>
                                    <select id="behavior-filter-type" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="">${this.t("common.allTypes","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                                        <option value="\u0625\u064A\u062C\u0627\u0628\u064A" ${e.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A"?"selected":""}>${this.t("module.behavior.positive","\u0625\u064A\u062C\u0627\u0628\u064A")}</option>
                                        <option value="\u0633\u0644\u0628\u064A" ${e.behaviorType==="\u0633\u0644\u0628\u064A"?"selected":""}>${this.t("module.behavior.negative","\u0633\u0644\u0628\u064A")}</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-star text-purple-600"></i> ${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")}
                                    </label>
                                    <select id="behavior-filter-rating" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="">${this.t("common.allRatings","\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A")}</option>
                                        <option value="\u0645\u0645\u062A\u0627\u0632" ${e.rating==="\u0645\u0645\u062A\u0627\u0632"?"selected":""}>${this.t("module.behavior.excellent","\u0645\u0645\u062A\u0627\u0632")}</option>
                                        <option value="\u062C\u064A\u062F" ${e.rating==="\u062C\u064A\u062F"?"selected":""}>${this.t("module.behavior.good","\u062C\u064A\u062F")}</option>
                                        <option value="\u0645\u0642\u0628\u0648\u0644" ${e.rating==="\u0645\u0642\u0628\u0648\u0644"?"selected":""}>${this.t("module.behavior.acceptable","\u0645\u0642\u0628\u0648\u0644")}</option>
                                        <option value="\u0636\u0639\u064A\u0641" ${e.rating==="\u0636\u0639\u064A\u0641"?"selected":""}>${this.t("module.behavior.poor","\u0636\u0639\u064A\u0641")}</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-calendar-alt text-purple-600"></i> ${this.t("common.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")}
                                    </label>
                                    <input id="behavior-filter-from" type="date" class="form-input" style="height: 38px; width: 100%;" value="${i(e.dateFrom)}">
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-calendar-check text-purple-600"></i> ${this.t("common.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")}
                                    </label>
                                    <input id="behavior-filter-to" type="date" class="form-input" style="height: 38px; width: 100%;" value="${i(e.dateTo)}">
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-sort-amount-down text-purple-600"></i> ${this.t("common.sort","\u0627\u0644\u062A\u0631\u062A\u064A\u0628")}
                                    </label>
                                    <select id="behavior-sort" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="date_desc" ${this.state?.sort==="date_desc"?"selected":""}>${this.t("common.newestFirst","\u0627\u0644\u0623\u062D\u062F\u062B \u0623\u0648\u0644\u0627\u064B")}</option>
                                        <option value="date_asc" ${this.state?.sort==="date_asc"?"selected":""}>${this.t("common.oldestFirst","\u0627\u0644\u0623\u0642\u062F\u0645 \u0623\u0648\u0644\u0627\u064B")}</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="button" id="behavior-clear-filters-btn" class="btn-secondary w-full" style="height: 38px; display: flex; align-items: center; justify-content: center; gap: 6px;" title="${this.t("common.clearFilters","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631")}">
                                        <i class="fas fa-eraser"></i><span>${this.t("common.clearFilters","\u0645\u0633\u062D")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="behavior-active-filter-chips" class="behavior-active-filter-chips">
                            ${o}
                        </div>
                        <div id="behavior-log-table-container">
                            ${t?`<div class="empty-state"><p class="text-gray-500">${this.t("common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p></div>`:this.renderLogTableHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `},renderEmployeeActiveFilterChips(){const t=this.state?.filters||{},e=[],i=(o,a)=>{const s=String(a||"").trim();s&&e.push(`<span class="behavior-filter-chip"><strong>${Utils.escapeHTML(o)}:</strong> ${Utils.escapeHTML(s)}</span>`)};return i(this.t("module.common.search","\u0627\u0644\u0628\u062D\u062B"),t.search),i("\u0627\u0644\u0646\u0648\u0639",t.behaviorType),i("\u0627\u0644\u062A\u0642\u064A\u064A\u0645",t.rating),i("\u0645\u0646",t.dateFrom),i("\u0625\u0644\u0649",t.dateTo),e.length?e.join(""):`<span class="behavior-filter-chip behavior-filter-chip-muted">${this.t("module.behavior.noActiveFilters","\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u0644\u0627\u062A\u0631 \u0645\u0641\u0639\u0644\u0629")}</span>`},renderLogTableHTML(){const t=this.getFilteredBehaviors();if(!t.length)return`<div class="empty-state"><p class="text-gray-500">${this.t("common.noMatchingResults","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629")}</p></div>`;const e=this.paginateItems(t,this.state.logPage||1);this.state.logPage=e.page;const i=e.items;return`
            <div class="table-wrapper" style="overflow-x:auto;">
                <table class="data-table table-header-purple">
                    <thead>
                        <tr>
                            <th>${this.t("module.behavior.isoCode","\u0643\u0648\u062F ISO")}</th>
                            <th>${this.t("module.behavior.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")}</th>
                            <th>${this.t("module.behavior.factory","\u0627\u0644\u0645\u0635\u0646\u0639")}</th>
                            <th>${this.t("module.behavior.subLocation","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</th>
                            <th>${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")}</th>
                            <th>${this.t("module.behavior.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}</th>
                            <th>${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")}</th>
                            <th class="text-center">${this.t("common.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i.map(o=>`
                            <tr>
                                <td>${Utils.escapeHTML(o.isoCode||"")}</td>
                                <td>
                                    <div class="flex flex-col">
                                        <span class="font-semibold">${Utils.escapeHTML(o.employeeName||"")}</span>
                                        <span class="text-xs text-gray-500">${Utils.escapeHTML(o.employeeCode||o.employeeNumber||"")}</span>
                                    </div>
                                </td>
                                <td>${Utils.escapeHTML(o.factoryName||o.factory||"\u2014")}</td>
                                <td>${Utils.escapeHTML(o.subLocationName||o.subLocation||"\u2014")}</td>
                                <td><span class="badge ${this.getBehaviorTypeBadgeClass(o.behaviorType)}">${Utils.escapeHTML(o.behaviorType||"\u2014")}</span></td>
                                <td>${this.getBehaviorDate(o)?this.formatBehaviorDateDisplay(o):"\u2014"}</td>
                                <td><span class="badge ${this.getRatingBadgeClass(o.rating)}">${Utils.escapeHTML(o.rating||"\u2014")}</span></td>
                                <td class="text-center bhm-log-table-actions">
                                    <div class="flex items-center justify-center gap-2 flex-wrap">
                                        <button type="button" onclick="BehaviorMonitoring.viewBehavior(${JSON.stringify(String(o.id||""))})" class="btn-icon btn-icon-primary bhm-action-icon" title="${this.t("common.view","\u0639\u0631\u0636")}">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        ${this.canDeleteBehavior()?`
                                        <button type="button" onclick="BehaviorMonitoring.deleteBehaviorById(${JSON.stringify(String(o.id||""))})" class="btn-icon btn-icon-danger bhm-action-icon" title="${this.t("common.delete","\u062D\u0630\u0641")}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        `:""}
                                        <button type="button" onclick="BehaviorMonitoring.exportPDF(${JSON.stringify(String(o.id||""))})" class="btn-icon btn-icon-success bhm-action-icon" title="${this.t("common.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF")}">
                                            <i class="fas fa-file-pdf"></i>
                                        </button>
                                        <button type="button" onclick="BehaviorMonitoring.printReport(${JSON.stringify(String(o.id||""))})" class="btn-icon btn-icon-info bhm-action-icon" title="${this.t("common.print","\u0637\u0628\u0627\u0639\u0629")}">
                                            <i class="fas fa-print"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
            ${this.renderTablePaginationHTML("employee",e)}
        `},renderLogTable(){const t=document.getElementById("behavior-log-table-container");t&&(t.innerHTML=this.renderLogTableHTML());const e=document.getElementById("behavior-filter-count");e&&(e.textContent=String(this.getFilteredBehaviors().length));const i=document.getElementById("behavior-active-filter-chips");i&&(i.innerHTML=this.renderEmployeeActiveFilterChips())},clearFilters(){this.state.filters={search:"",behaviorType:"",rating:"",dateFrom:"",dateTo:""},this.state.sort="date_desc",this.state.logPage=1,this.refreshCurrentTab()},exportLogCSV(){const t=this.getFilteredBehaviors();if(!t.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const e=r=>{const c=(r??"").toString().replace(/\r?\n/g," ").trim();return c.includes('"')||c.includes(",")||c.includes(";")?`"${c.replace(/"/g,'""')}"`:c},o=[["ISO","EmployeeName","EmployeeCode","Department","Job","Factory","SubLocation","BehaviorType","Date","Rating","CorrectiveAction","CorrectiveActionDetails","Description"].join(","),...t.map(r=>[e(r.isoCode||""),e(r.employeeName||""),e(r.employeeCode||r.employeeNumber||""),e(r.department||""),e(r.job||r.position||""),e(r.factoryName||r.factory||""),e(r.subLocationName||r.subLocation||""),e(r.behaviorType||""),e(this.getBehaviorDate(r)?Utils.formatDateForInput(this.getBehaviorDate(r)):""),e(r.rating||""),e(r.correctiveAction||""),e(r.correctiveActionDetails||""),e(r.description||"")].join(","))].join(`
`),a=new Blob([o],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(a),n=document.createElement("a");n.href=s,n.download=`BehaviorMonitoring_Log_${new Date().toISOString().slice(0,10)}.csv`,document.body.appendChild(n),n.click(),n.remove(),URL.revokeObjectURL(s)},renderFormTab(t=!1){const e=`bhm-tab-${Date.now()}`;return`
            <div id="behavior-form-container">
                <div class="content-card behavior-form-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-pen-to-square ml-2"></i>${this.t("module.behavior.recordBehavior","\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641")}</h2>
                    </div>
                    <div class="card-body">
                        ${t?`<div class="empty-state"><p class="text-gray-500">${this.t("common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p></div>`:this.getBehaviorFormHTML(null,e,{inline:!0})}
                    </div>
                </div>
            </div>
        `},bindCurrentTabEvents(){this._eventListenersAbortController&&this._eventListenersAbortController.abort(),this._eventListenersAbortController=new AbortController;const t=this._eventListenersAbortController.signal,e=this.state?.activeTab||"log";if(e==="log"){const i=document.getElementById("behavior-filter-search"),o=document.getElementById("behavior-filter-type"),a=document.getElementById("behavior-filter-rating"),s=document.getElementById("behavior-filter-from"),n=document.getElementById("behavior-filter-to"),r=document.getElementById("behavior-sort"),c=document.getElementById("behavior-clear-filters-btn"),d=document.getElementById("behavior-export-csv-btn"),h=()=>{this.state.filters=this.state.filters||{},this.state.filters.search=(i?.value||"").toString(),this.state.filters.behaviorType=(o?.value||"").toString(),this.state.filters.rating=(a?.value||"").toString(),this.state.filters.dateFrom=(s?.value||"").toString(),this.state.filters.dateTo=(n?.value||"").toString(),this.state.sort=(r?.value||"date_desc").toString(),this.state.logPage=1,this.renderLogTable()};i?.addEventListener("input",h,{signal:t}),o?.addEventListener("change",h,{signal:t}),a?.addEventListener("change",h,{signal:t}),s?.addEventListener("change",h,{signal:t}),n?.addEventListener("change",h,{signal:t}),r?.addEventListener("change",h,{signal:t}),c?.addEventListener("click",()=>this.clearFilters(),{signal:t}),d?.addEventListener("click",()=>this.exportLogCSV(),{signal:t}),document.getElementById("behavior-cleanup-duplicates-btn")?.addEventListener("click",()=>this.cleanupDuplicateEmployeeBehaviors(),{signal:t}),this.renderLogTable();return}if(e==="form"){const i=document.querySelector('#behavior-form-container form[data-behavior-form="true"]'),o=i?.getAttribute("data-form-uid");if(i&&o){this.bindBehaviorForm({form:i,uid:o,data:null,modal:null,signal:t});const a=document.getElementById("behavior-form-container");a&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(a,{onFetchFail:s=>{try{s.onerror=null,s.removeAttribute("src")}catch{}}})}return}if(e==="contractors"){const i=document.getElementById("bhmc-filter-search"),o=document.getElementById("bhmc-filter-type"),a=document.getElementById("bhmc-filter-rating"),s=document.getElementById("bhmc-filter-from"),n=document.getElementById("bhmc-filter-to"),r=document.getElementById("bhmc-sort"),c=document.getElementById("bhmc-clear-filters-btn"),d=document.getElementById("bhmc-export-csv-btn"),h=document.getElementById("behavior-add-contractor-btn"),v=()=>{this.state.contractorFilters=this.state.contractorFilters||{},this.state.contractorFilters.search=(i?.value||"").toString(),this.state.contractorFilters.behaviorType=(o?.value||"").toString(),this.state.contractorFilters.rating=(a?.value||"").toString(),this.state.contractorFilters.dateFrom=(s?.value||"").toString(),this.state.contractorFilters.dateTo=(n?.value||"").toString(),this.state.contractorSort=(r?.value||"date_desc").toString(),this.state.contractorLogPage=1,this.renderContractorLogTable()};i?.addEventListener("input",v,{signal:t}),o?.addEventListener("change",v,{signal:t}),a?.addEventListener("change",v,{signal:t}),s?.addEventListener("change",v,{signal:t}),n?.addEventListener("change",v,{signal:t}),r?.addEventListener("change",v,{signal:t}),c?.addEventListener("click",()=>this.clearContractorFilters(),{signal:t}),d?.addEventListener("click",()=>this.exportContractorLogCSV(),{signal:t}),h?.addEventListener("click",()=>this.showContractorForm(null),{signal:t}),document.getElementById("bhmc-cleanup-duplicates-btn")?.addEventListener("click",()=>this.cleanupDuplicateContractorBehaviors(),{signal:t}),this.renderContractorLogTable()}},setupEventListeners(){this._setupTimeoutId&&clearTimeout(this._setupTimeoutId),this._setupTimeoutId=setTimeout(()=>{const t=document.getElementById("behavior-add-btn");t&&t.addEventListener("click",()=>this.showForm(),{passive:!0});const e=document.getElementById("behavior-add-contractor-header-btn");e&&e.addEventListener("click",()=>this.showContractorForm(null),{passive:!0});const i=document.getElementById("behavior-refresh-btn");i&&i.addEventListener("click",()=>{this.loadBehaviorDataAsync(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},{passive:!0})},50)},getBehaviorFormHTML(t=null,e,i={}){const o={employeeCode:`${e}-employee-code`,employeeName:`${e}-employee-name`,dropdown:`${e}-employee-dropdown`,department:`${e}-department`,job:`${e}-job`,factory:`${e}-factory`,subLocation:`${e}-sublocation`,photoInput:`${e}-photo-input`,photoPreview:`${e}-photo-preview`,photoImg:`${e}-photo-img`,behaviorType:`${e}-type`,behaviorDate:`${e}-date`,behaviorRating:`${e}-rating`,correctiveAction:`${e}-corrective-action`,correctiveActionDetails:`${e}-corrective-action-details`,description:`${e}-description`,saveBtn:`${e}-save-btn`},a=t?.date?new Date(t.date).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],s=!!i.inline,n=this.getSiteOptions(),r=t?.factory||t?.factoryId||t?.siteId||"",c=t?.subLocation||t?.subLocationId||t?.location||"",d=n.find(p=>p.id===r)?.id||n.find(p=>p.name===r)?.id||r,h=this.getPlaceOptions(d),v=h.find(p=>p.id===c)?.id||h.find(p=>p.name===c)?.id||c,y=(t?.behaviorType||"")==="\u0633\u0644\u0628\u064A",B=this.processPhoto(t?.photo),m=B&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(B):{canonical:B||"",displaySrc:B||"",needsProxy:!1,proxyFileId:""},b=m.canonical?m.displaySrc:"",T=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(m):"";return`
            <div class="behavior-form-wrapper bhm-form ${s?"behavior-form-inline":"behavior-form-modal"}" data-behavior-type="${Utils.escapeHTML(t?.behaviorType||"")}">
                <form data-behavior-form="true" data-form-uid="${e}" class="bhm-form-inner">
                    <section class="bhm-section" aria-labelledby="${e}-sec-emp">
                        <div class="bhm-section-head" id="${e}-sec-emp">
                            <span class="bhm-section-icon" aria-hidden="true"><i class="fas fa-id-card"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t("module.behavior.form.employeeSection","\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641")}</h4>
                                <p class="bhm-section-hint">${this.t("module.behavior.form.employeeHint","\u0627\u0644\u0643\u0648\u062F \u0648\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0642\u0633\u0645 \u0648\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${o.employeeCode}" class="bhm-label">${this.t("module.behavior.form.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")} <span class="bhm-req">*</span></label>
                                    <input type="text" id="${o.employeeCode}" required class="form-input bhm-input"
                                        value="${Utils.escapeHTML(t?.employeeCode||t?.employeeNumber||"")}" placeholder="${this.t("module.behavior.form.employeeCodePh","\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${o.employeeName}" class="bhm-label">${this.t("module.behavior.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")} <span class="bhm-req">*</span></label>
                                    <div class="relative">
                                        <input type="text" id="${o.employeeName}" required class="form-input bhm-input"
                                            value="${Utils.escapeHTML(t?.employeeName||"")}" placeholder="${this.t("module.behavior.form.employeeNamePh","\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F")}" autocomplete="off">
                                        <div id="${o.dropdown}" class="hse-lookup-dropdown absolute z-50 hidden w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"></div>
                                    </div>
                                </div>
                                <div class="bhm-field">
                                    <label for="${o.department}" class="bhm-label">${this.t("module.behavior.form.department","\u0627\u0644\u0642\u0633\u0645")} <span class="bhm-req">*</span></label>
                                    <input type="text" id="${o.department}" required class="form-input bhm-input"
                                        value="${Utils.escapeHTML(t?.department||t?.employeeDepartment||"")}" placeholder="${this.t("module.behavior.form.autoFillPh","\u064A\u064F\u0639\u0628\u0651\u064E\u0623 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641")}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${o.job}" class="bhm-label">${this.t("module.behavior.form.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")} <span class="bhm-req">*</span></label>
                                    <input type="text" id="${o.job}" required class="form-input bhm-input"
                                        value="${Utils.escapeHTML(t?.job||t?.position||t?.employeeJob||"")}" placeholder="${this.t("module.behavior.form.autoFillPh","\u064A\u064F\u0639\u0628\u0651\u064E\u0623 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641")}">
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bhm-section" aria-labelledby="${e}-sec-act">
                        <div class="bhm-section-head" id="${e}-sec-act">
                            <span class="bhm-section-icon bhm-section-icon--violet" aria-hidden="true"><i class="fas fa-clipboard-list"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t("module.behavior.form.detailsSection","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641")}</h4>
                                <p class="bhm-section-hint">${this.t("module.behavior.form.detailsHint","\u0627\u0644\u0646\u0648\u0639\u060C \u0627\u0644\u062A\u0627\u0631\u064A\u062E\u060C \u0648\u0627\u0644\u062A\u0642\u064A\u064A\u0645")}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-3">
                                <div class="bhm-field bhm-field-type">
                                    <div class="bhm-label-row">
                                        <label for="${o.behaviorType}" class="bhm-label mb-0">${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")} <span class="bhm-req">*</span></label>
                                        <span class="badge ${this.getBehaviorTypeBadgeClass(t?.behaviorType)} bhm-type-chip" id="${e}-type-badge">${Utils.escapeHTML(t?.behaviorType||"\u2014")}</span>
                                    </div>
                                    <select id="${o.behaviorType}" required class="form-input bhm-input mt-2">
                                        <option value="">${this.t("module.behavior.selectType","\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639")}</option>
                                        <option value="\u0625\u064A\u062C\u0627\u0628\u064A" ${t?.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A"?"selected":""}>${this.t("module.behavior.positive","\u0625\u064A\u062C\u0627\u0628\u064A")}</option>
                                        <option value="\u0633\u0644\u0628\u064A" ${t?.behaviorType==="\u0633\u0644\u0628\u064A"?"selected":""}>${this.t("module.behavior.negative","\u0633\u0644\u0628\u064A")}</option>
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${o.behaviorDate}" class="bhm-label">${this.t("module.behavior.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")} <span class="bhm-req">*</span></label>
                                    <input type="date" id="${o.behaviorDate}" required class="form-input bhm-input" value="${a}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${o.behaviorRating}" class="bhm-label">${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")} <span class="bhm-req">*</span></label>
                                    <select id="${o.behaviorRating}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectRating","\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0642\u064A\u064A\u0645")}</option>
                                        <option value="\u0645\u0645\u062A\u0627\u0632" ${t?.rating==="\u0645\u0645\u062A\u0627\u0632"?"selected":""}>${this.t("module.behavior.excellent","\u0645\u0645\u062A\u0627\u0632")}</option>
                                        <option value="\u062C\u064A\u062F" ${t?.rating==="\u062C\u064A\u062F"?"selected":""}>${this.t("module.behavior.good","\u062C\u064A\u062F")}</option>
                                        <option value="\u0645\u0642\u0628\u0648\u0644" ${t?.rating==="\u0645\u0642\u0628\u0648\u0644"?"selected":""}>${this.t("module.behavior.acceptable","\u0645\u0642\u0628\u0648\u0644")}</option>
                                        <option value="\u0636\u0639\u064A\u0641" ${t?.rating==="\u0636\u0639\u064A\u0641"?"selected":""}>${this.t("module.behavior.poor","\u0636\u0639\u064A\u0641")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bhm-section" aria-labelledby="${e}-sec-loc">
                        <div class="bhm-section-head" id="${e}-sec-loc">
                            <span class="bhm-section-icon bhm-section-icon--teal" aria-hidden="true"><i class="fas fa-map-marked-alt"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t("module.behavior.form.locationSection","\u0627\u0644\u0645\u0648\u0642\u0639")}</h4>
                                <p class="bhm-section-hint">${this.t("module.behavior.form.locationHint","\u0627\u0644\u0645\u0635\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629")}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${o.factory}" class="bhm-label"><i class="fas fa-industry ml-1 opacity-70"></i> ${this.t("module.behavior.factory","\u0627\u0644\u0645\u0635\u0646\u0639")} <span class="bhm-req">*</span></label>
                                    <select id="${o.factory}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectFactory","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")}</option>
                                        ${n.map(p=>`
                                            <option value="${p.id}" ${d===p.id||r===p.name?"selected":""}>${Utils.escapeHTML(p.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${o.subLocation}" class="bhm-label"><i class="fas fa-map-marker-alt ml-1 opacity-70"></i> ${this.t("module.behavior.subLocation","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")} <span class="bhm-req">*</span></label>
                                    <select id="${o.subLocation}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectSubLocation","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</option>
                                        ${h.map(p=>`
                                            <option value="${p.id}" ${v===p.id||c===p.name?"selected":""}>${Utils.escapeHTML(p.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="${e}-negative-section" class="bhm-negative-panel" style="${y?"":"display:none;"}">
                        <div class="bhm-negative-head">
                            <span class="bhm-negative-icon" aria-hidden="true"><i class="fas fa-exclamation-triangle"></i></span>
                            <div>
                                <h4 class="bhm-negative-title">${this.t("module.behavior.form.correctiveTitle","\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A (\u0644\u0644\u062A\u0635\u0631\u0641 \u0627\u0644\u0633\u0644\u0628\u064A)")}</h4>
                                <p class="bhm-negative-sub">${this.t("module.behavior.form.correctiveHint","\u064A\u0638\u0647\u0631 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0635\u0631\u0641 \u0633\u0644\u0628\u064A \u0641\u0642\u0637")}</p>
                            </div>
                        </div>
                        <div class="bhm-negative-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${o.correctiveAction}" class="bhm-label">${this.t("module.behavior.form.correctiveAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A")} <span class="bhm-req">*</span></label>
                                    <select id="${o.correctiveAction}" class="form-input bhm-input" ${y?"required":""}>
                                        <option value="">${this.t("module.behavior.selectAction","\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621")}</option>
                                        ${this.NEGATIVE_ACTIONS.map(p=>`
                                            <option value="${Utils.escapeHTML(p)}" ${t?.correctiveAction===p?"selected":""}>${Utils.escapeHTML(p)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${o.correctiveActionDetails}" class="bhm-label">${this.t("module.behavior.form.extraDetails","\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629")} <span class="bhm-optional">(${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")})</span></label>
                                    <input type="text" id="${o.correctiveActionDetails}" class="form-input bhm-input"
                                        value="${Utils.escapeHTML(t?.correctiveActionDetails||"")}" placeholder="\u0645\u062B\u0627\u0644: \u062A\u062F\u0631\u064A\u0628 \u0639\u0644\u0649 SOP-01 / \u0625\u0646\u0630\u0627\u0631 \u0631\u0642\u0645\u2026">
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bhm-section bhm-section--media" aria-labelledby="${e}-sec-desc">
                        <div class="bhm-section-head" id="${e}-sec-desc">
                            <span class="bhm-section-icon bhm-section-icon--amber" aria-hidden="true"><i class="fas fa-align-right"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t("module.behavior.form.descSection","\u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A")}</h4>
                                <p class="bhm-section-hint">${this.t("module.behavior.form.descHint","\u0648\u0635\u0641 \u0627\u0644\u062A\u0635\u0631\u0641 \u0648\u0635\u0648\u0631\u0629 \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629")}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-media">
                                <div class="bhm-field bhm-upload-wrap">
                                    <label for="${o.photoInput}" class="bhm-label"><i class="fas fa-image ml-1 opacity-70"></i> ${this.t("module.behavior.form.photo","\u0635\u0648\u0631\u0629")} <span class="bhm-optional">(${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")})</span></label>
                                    <div class="bhm-file-slot">
                                        <input type="file" id="${o.photoInput}" accept="image/*" class="bhm-file-input">
                                        <span class="bhm-file-hint">${this.t("module.behavior.form.photoHint","PNG \u0623\u0648 JPG \u2014 \u062D\u062A\u0649 2 \u0645\u064A\u062C\u0627")}</span>
                                    </div>
                                    <div id="${o.photoPreview}" class="bhm-photo-preview mt-3 ${t?.photo?"":"hidden"}">
                                        <img src="${Utils.escapeHTML(b)}" alt="\u0645\u0639\u0627\u064A\u0646\u0629"${T} class="bhm-photo-thumb" id="${o.photoImg}">
                                        <button type="button" class="bhm-photo-clear" data-action="clear-photo">${this.t("module.behavior.form.clearPhoto","\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629")}</button>
                                    </div>
                                </div>
                                <div class="bhm-field bhm-field-grow">
                                    <label for="${o.description}" class="bhm-label">${this.t("module.behavior.form.description","\u0627\u0644\u0648\u0635\u0641")} <span class="bhm-req">*</span></label>
                                    <textarea id="${o.description}" required class="form-input bhm-input bhm-textarea" rows="5" placeholder="${this.t("module.behavior.form.descriptionPh","\u0648\u0635\u0641 \u0627\u0644\u062A\u0635\u0631\u0641 \u0648\u0627\u0644\u0638\u0631\u0648\u0641\u2026")}">${Utils.escapeHTML(t?.description||"")}</textarea>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div class="bhm-form-footer">
                        ${s?"":`<button type="button" class="btn-secondary bhm-btn-cancel" data-action="cancel-form">${this.t("common.cancel","\u0625\u0644\u063A\u0627\u0621")}</button>`}
                        <button type="button" id="${o.saveBtn}" class="btn-primary bhm-btn-save">
                            <i class="fas fa-save ml-2"></i>
                            ${this.t("common.save","\u062D\u0641\u0638")}
                        </button>
                    </div>
                </form>
            </div>
        `},bindBehaviorForm({form:t,uid:e,data:i,modal:o,signal:a}){if(typeof EmployeeHelper<"u")try{EmployeeHelper.setupAutocomplete(`${e}-employee-name`,l=>{if(l){const f=document.getElementById(`${e}-employee-code`),S=document.getElementById(`${e}-employee-name`),g=document.getElementById(`${e}-department`),x=document.getElementById(`${e}-job`);f&&(f.value=l.code||""),S&&(S.value=l.name||""),g&&(l.department||l.employeeDepartment)&&(g.value=l.department||l.employeeDepartment||""),x&&(l.job||l.position||l.title)&&(x.value=l.job||l.position||l.title||"")}}),EmployeeHelper.setupEmployeeCodeSearch(`${e}-employee-code`,`${e}-employee-name`)}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0645\u0648\u0638\u0641:",l)}const s=()=>{try{const l=(document.getElementById(`${e}-employee-code`)?.value||"").trim(),f=(document.getElementById(`${e}-employee-name`)?.value||"").trim(),g=(Array.isArray(AppState?.appData?.employees)?AppState.appData.employees:[]).find(L=>l&&(L.employeeNumber&&L.employeeNumber===l||L.sapId&&L.sapId===l)||f&&L.name===f);if(!g)return;const x=document.getElementById(`${e}-department`),$=document.getElementById(`${e}-job`);x&&!x.value&&(x.value=g.department||g.employeeDepartment||""),$&&!$.value&&($.value=g.job||g.position||g.title||"")}catch{}};document.getElementById(`${e}-employee-code`)?.addEventListener("blur",s,{signal:a}),document.getElementById(`${e}-employee-name`)?.addEventListener("blur",s,{signal:a});const n=document.getElementById(`${e}-photo-input`),r=document.getElementById(`${e}-photo-preview`),c=document.getElementById(`${e}-photo-img`);n&&r&&c&&n.addEventListener("change",l=>{const f=l.target.files?.[0];if(!f)return;if(f.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),n.value="";return}const S=new FileReader;S.onload=g=>{c.src=g.target.result,r.classList.remove("hidden")},S.readAsDataURL(f)},{signal:a}),t.querySelector('[data-action="clear-photo"]')?.addEventListener("click",()=>{const l=document.getElementById(`${e}-photo-input`),f=document.getElementById(`${e}-photo-preview`);l&&(l.value=""),f&&f.classList.add("hidden")},{signal:a});const d=document.getElementById(`${e}-type`),h=document.getElementById(`${e}-type-badge`),v=t.closest(".behavior-form-wrapper")||t.parentElement,y=document.getElementById(`${e}-negative-section`),B=document.getElementById(`${e}-corrective-action`),m=l=>{v&&v.setAttribute("data-behavior-type",l||""),h&&(h.className=`badge ${this.getBehaviorTypeBadgeClass(l)}`,h.textContent=l||"\u2014");const f=o?.querySelector?.(".behavior-modal");f&&f.setAttribute("data-behavior-type",l||"");const S=(l||"")==="\u0633\u0644\u0628\u064A";y&&(y.style.display=S?"":"none"),B&&(S?B.setAttribute("required","required"):B.removeAttribute("required"))};m(d?.value||i?.behaviorType||""),d?.addEventListener("change",()=>m(d.value),{signal:a});const b=document.getElementById(`${e}-factory`),T=document.getElementById(`${e}-sublocation`),p=()=>{if(!b||!T)return;const l=b.value,f=this.getPlaceOptions(l),S=T.value;T.innerHTML=`
                <option value="">${this.t("module.behavior.selectSubLocation","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</option>
                ${f.map(g=>`<option value="${g.id}">${Utils.escapeHTML(g.name)}</option>`).join("")}
            `,S&&f.some(g=>g.id===S)&&(T.value=S)};b?.addEventListener("change",p,{signal:a}),t.querySelector('[data-action="cancel-form"]')?.addEventListener("click",()=>o?.remove(),{signal:a}),document.getElementById(`${e}-save-btn`)?.addEventListener("click",()=>this.handleSubmit({uid:e,form:t,editId:i?.id||null,modal:o}),{signal:a})},async showForm(t=null){if(typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{await Permissions.ensureFormSettingsState()}catch{}const e=document.createElement("div");e.className="modal-overlay";const i=`bhm-modal-${Date.now()}`;e.innerHTML=`
            <div class="modal-content behavior-modal bhm-registration-modal" data-behavior-type="${Utils.escapeHTML(t?.behaviorType||"")}">
                <div class="bhm-modal-hero">
                    <div class="bhm-modal-hero-text">
                        <p class="bhm-modal-kicker"><i class="fas fa-user-check ml-2"></i>\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A</p>
                        <h2 class="bhm-modal-title">${t?this.t("module.behavior.editBehavior","\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641"):this.t("module.behavior.addEmployee","\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641 \u0645\u0648\u0638\u0641")}</h2>
                        <p class="bhm-modal-sub">${t?"\u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u062B\u0645 \u0627\u062D\u0641\u0638.":"\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u062B\u0645 \u0648\u0635\u0641 \u0627\u0644\u062A\u0635\u0631\u0641."}</p>
                    </div>
                    <button type="button" class="bhm-modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body bhm-modal-body">
                    ${this.getBehaviorFormHTML(t,i,{inline:!1})}
                </div>
            </div>
        `,document.body.appendChild(e),this._modalAbortController&&this._modalAbortController.abort(),this._modalAbortController=new AbortController;const o=this._modalAbortController.signal,a=e.querySelector('form[data-behavior-form="true"]');a&&this.bindBehaviorForm({form:a,uid:i,data:t,modal:e,signal:o}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(e,{onFetchFail:s=>{try{s.onerror=null,s.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22150%22/%3E%3Ctext fill=%22%23999%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E\u0645\u0639\u0627\u064A\u0646\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),e.addEventListener("click",s=>{s.target===e&&e.remove()},{signal:o})},async convertImageToBase64(t){return new Promise((e,i)=>{const o=new FileReader;o.onload=()=>e(o.result),o.onerror=i,o.readAsDataURL(t)})},async handleSubmit({uid:t,form:e,editId:i=null,modal:o}){if(this._employeeSubmitLock){Notification.warning("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u0641... \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u0644\u0645\u0646\u0639 \u0627\u0644\u062A\u0643\u0631\u0627\u0631");return}const a=document.getElementById(`${t}-save-btn`);this._employeeSubmitLock=!0,a&&(a.disabled=!0,a.setAttribute("aria-busy","true"));try{let s=i&&this.getBehaviors().find($=>$.id===i)?.photo||"";const n=document.getElementById(`${t}-photo-input`);if(n&&n.files.length>0){const $=n.files[0];if($.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}s=await this.convertImageToBase64($)}const r=(document.getElementById(`${t}-employee-code`)?.value||"").trim(),c=(document.getElementById(`${t}-employee-name`)?.value||"").trim(),h=(Array.isArray(AppState?.appData?.employees)?AppState.appData.employees:[]).find($=>$.employeeNumber&&$.employeeNumber===r||$.sapId&&$.sapId===r||$.name===c),v=document.getElementById(`${t}-type`),y=document.getElementById(`${t}-date`),B=document.getElementById(`${t}-rating`),m=document.getElementById(`${t}-description`),b=document.getElementById(`${t}-department`),T=document.getElementById(`${t}-job`),p=document.getElementById(`${t}-factory`),u=document.getElementById(`${t}-sublocation`),l=document.getElementById(`${t}-corrective-action`),f=document.getElementById(`${t}-corrective-action-details`);if(!v||!y||!B||!m||!b||!T||!p||!u){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const S=(v.value||"")==="\u0633\u0644\u0628\u064A";if(S&&(!l||!l.value)){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0644\u0644\u062A\u0635\u0631\u0641 \u0627\u0644\u0633\u0644\u0628\u064A");return}const g={id:i||Utils.generateId("BEHAV"),isoCode:generateISOCode("BEH",AppState.appData.behaviorMonitoring),employeeId:h?.id||"",employeeCode:r,employeeNumber:r,employeeName:c,department:(b.value||"").trim(),job:(T.value||"").trim(),factory:(p.value||"").trim(),factoryId:p.value?String(p.value).trim():null,factoryName:this.resolveSiteName(p.value),subLocation:(u.value||"").trim(),subLocationId:u.value?String(u.value).trim():null,subLocationName:this.resolvePlaceName(u.value,p.value),photo:s,behaviorType:v.value,date:new Date(y.value).toISOString(),rating:B.value,correctiveAction:S&&l?.value||"",correctiveActionDetails:S?(f?.value||"").trim():"",description:m.value.trim(),createdAt:i?this.getBehaviors().find($=>$.id===i)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(this.findDuplicateEmployeeBehavior(g,i)){Notification.warning("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0646\u0641\u0633 \u0627\u0644\u062A\u0635\u0631\u0641 \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0645\u0633\u0628\u0642\u0627\u064B. \u0644\u0646 \u064A\u062A\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631.");return}Loading.show();try{if(i){const $=AppState.appData.behaviorMonitoring.findIndex(L=>L.id===i);$!==-1&&(AppState.appData.behaviorMonitoring[$]=g),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u0641 \u0628\u0646\u062C\u0627\u062D")}else{if(this.findDuplicateEmployeeBehavior(g,i)){Notification.warning("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0646\u0641\u0633 \u0627\u0644\u062A\u0635\u0631\u0641 \u0645\u0633\u0628\u0642\u0627\u064B. \u0644\u0646 \u064A\u062A\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631.");return}AppState.appData.behaviorMonitoring.push(g),Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641 \u0628\u0646\u062C\u0627\u062D")}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("BehaviorMonitoring",AppState.appData.behaviorMonitoring),o&&o.remove(),this.refreshCurrentTab()}catch($){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+$.message)}finally{Loading.hide()}}finally{this._employeeSubmitLock=!1,a&&document.body.contains(a)&&(a.disabled=!1,a.removeAttribute("aria-busy"))}},async viewBehavior(t){const e=this.getRawBehaviorById(t);if(!e){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.presentBehavior(e),o=d=>Utils.escapeHTML((d??"").toString()),a=d=>{const h=(d??"").toString().trim();return h?o(h):'<span class="bhm-detail-empty">\u2014</span>'},s=(i.description||"").toString().trim(),n=s?`<div class="bhm-detail-value bhm-detail-desc">${o(s)}</div>`:'<div class="bhm-detail-empty-block"><i class="fas fa-align-right ml-2"></i>\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641 \u0645\u0633\u062C\u0644 \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u0641.</div>',r=this.getBehaviorDate(i)?this.formatBehaviorDateDisplay(i):"\u2014",c=document.createElement("div");c.className="modal-overlay bhm-detail-overlay",c.innerHTML=`
            <div class="modal-content behavior-modal bhm-detail-modal" style="max-width: 820px;">
                <div class="bhm-detail-hero">
                    <div class="bhm-detail-hero-text">
                        <p class="bhm-detail-kicker"><i class="fas fa-clipboard-list ml-2"></i>\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A</p>
                        <h2 class="bhm-detail-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641</h2>
                        <p class="bhm-detail-sub">${o(i.isoCode||"\u2014")} <span class="bhm-detail-sub-sep">\xB7</span> ${o(i.employeeName||"")}</p>
                    </div>
                    <button type="button" class="bhm-detail-close" onclick="this.closest('.modal-overlay').remove()" aria-label="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body bhm-detail-body">
                    <div class="bhm-detail-grid">
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0643\u0648\u062F ISO</span>
                            <div class="bhm-detail-value">${a(i.isoCode)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</span>
                            <div class="bhm-detail-value">${a(i.employeeCode||i.employeeNumber)}</div>
                        </div>
                        <div class="bhm-detail-field bhm-detail-field-span2">
                            <span class="bhm-detail-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</span>
                            <div class="bhm-detail-value bhm-detail-value-strong">${a(i.employeeName)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0642\u0633\u0645</span>
                            <div class="bhm-detail-value">${a(i.department||i.employeeDepartment)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</span>
                            <div class="bhm-detail-value">${a(i.job||i.position)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639</span>
                            <div class="bhm-detail-value">${a(i.factoryName||i.factory)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</span>
                            <div class="bhm-detail-value">${a(i.subLocationName||i.subLocation)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641</span>
                            <div class="bhm-detail-value">
                                <span class="badge ${this.getBehaviorTypeBadgeClass(i.behaviorType)}">${o(i.behaviorType||"\u2014")}</span>
                            </div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</span>
                            <div class="bhm-detail-value">${r==="\u2014"?'<span class="bhm-detail-empty">\u2014</span>':o(r)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u062A\u0642\u064A\u064A\u0645</span>
                            <div class="bhm-detail-value">
                                <span class="badge ${this.getRatingBadgeClass(i.rating)}">${o(i.rating||"\u2014")}</span>
                            </div>
                        </div>
                        <div class="bhm-detail-field bhm-detail-field-span2">
                            <span class="bhm-detail-label">\u0627\u0644\u0648\u0635\u0641</span>
                            ${n}
                        </div>
                        ${i.behaviorType==="\u0633\u0644\u0628\u064A"&&(i.correctiveAction||i.correctiveActionDetails)?`
                            <div class="bhm-detail-field bhm-detail-field-span2 bhm-detail-corrective">
                                <span class="bhm-detail-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</span>
                                <div class="bhm-detail-value">
                                    <span class="badge badge-danger">${o(i.correctiveAction||"\u2014")}</span>
                                    ${i.correctiveActionDetails?`<div class="bhm-detail-corrective-details">${o(i.correctiveActionDetails)}</div>`:""}
                                </div>
                            </div>
                        `:""}
                        ${(()=>{const d=this.processPhoto(i.photo);if(!d)return"";const h=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(d):{canonical:d,displaySrc:d,needsProxy:!1,proxyFileId:""},v=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(h):"";return`
                            <div class="bhm-detail-field bhm-detail-field-span2">
                                <span class="bhm-detail-label">\u0627\u0644\u0635\u0648\u0631\u0629</span>
                                <div class="bhm-detail-photo-wrap">
                                    <img src="${Utils.escapeHTML(h.displaySrc)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0635\u0631\u0641"${v} class="bhm-detail-photo"
                                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                                </div>
                            </div>
                        `})()}
                    </div>
                </div>
                <div class="bhm-detail-footer">
                    <button type="button" class="btn-primary" onclick="BehaviorMonitoring.editBehavior(${JSON.stringify(String(i.id||""))}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-pen ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("behavior-monitoring"):""}
                    ${this.canDeleteBehavior()?`
                    <button type="button" class="btn-danger" onclick="BehaviorMonitoring.deleteBehaviorById(${JSON.stringify(String(i.id||""))});">
                        <i class="fas fa-trash ml-2"></i>\u062D\u0630\u0641
                    </button>
                    `:""}
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.printReport(${JSON.stringify(String(i.id||""))});">
                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.exportPDF(${JSON.stringify(String(i.id||""))});">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(c),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(c,{moduleKey:"behavior-monitoring",record:i,recordId:i.id||i.isoCode||""}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(c,{onFetchFail:d=>{try{d.onerror=null,d.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),c.addEventListener("click",d=>{d.target===c&&c.remove()})},async exportPDF(t){const e=this.getRawBehaviorById(t);if(!e){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.presentBehavior(e);try{Loading.show();const o=i.isoCode||`BEH-${i.id?.substring(0,8)||"UNKNOWN"}`,a="\u062A\u0642\u0631\u064A\u0631 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062A\u0635\u0631\u0641\u0627\u062A",s=this.getBehaviorDate(i)?this.formatBehaviorDateDisplay(i):"\u2014",n=`
                <table>
                    <tr><th>\u0643\u0648\u062F ISO</th><td>${Utils.escapeHTML(i.isoCode||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><td>${Utils.escapeHTML(i.employeeCode||i.employeeNumber||"")}</td></tr>
                    <tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th><td>${Utils.escapeHTML(i.employeeName||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0642\u0633\u0645</th><td>${Utils.escapeHTML(i.department||i.employeeDepartment||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th><td>${Utils.escapeHTML(i.job||i.position||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0635\u0646\u0639</th><td>${Utils.escapeHTML(i.factoryName||i.factory||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th><td>${Utils.escapeHTML(i.subLocationName||i.subLocation||"")}</td></tr>
                    <tr><th>\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641</th><td>${Utils.escapeHTML(i.behaviorType||"")}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><td>${Utils.escapeHTML(s)}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0642\u064A\u064A\u0645</th><td>${Utils.escapeHTML(i.rating||"")}</td></tr>
                    ${i.behaviorType==="\u0633\u0644\u0628\u064A"&&(i.correctiveAction||i.correctiveActionDetails)?`
                        <tr><th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</th><td>${Utils.escapeHTML(i.correctiveAction||"")}</td></tr>
                        <tr><th>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</th><td>${Utils.escapeHTML(i.correctiveActionDetails||"")}</td></tr>
                    `:""}
                    <tr><th colspan="2">\u0627\u0644\u0648\u0635\u0641</th></tr>
                    <tr><td colspan="2">${Utils.escapeHTML(i.description||"")}</td></tr>
                </table>
                ${(()=>{const v=this.processPhoto(i.photo);return v?`
                <div class="section-title">\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0635\u0631\u0641:</div>
                <div style="text-align: center; margin: 20px 0;">
                    <img src="${Utils.escapeHTML(v)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0635\u0631\u0641" style="max-width: 100%; max-height: 400px; border: 1px solid #ddd; border-radius: 8px;"
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                </div>
                `:""})()}
            `,r=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(o,a,n,!1,!0,{version:"1.0"},i.createdAt,i.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0633\u0644\u0648\u0643</title></head><body>${n}</body></html>`,c=new Blob([r],{type:"text/html;charset=utf-8"}),d=URL.createObjectURL(c),h=window.open(d,"_blank");h?h.onload=()=>{setTimeout(()=>{h.print(),setTimeout(()=>{URL.revokeObjectURL(d)},1e3),Loading.hide()},500)}:(URL.revokeObjectURL(d),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629"))}catch(o){Loading.hide(),typeof url<"u"&&URL.revokeObjectURL(url),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+o.message)}},async printReport(t){await this.exportPDF(t)},getContractorBehaviors(){return!AppState?.appData?.contractorBehaviorMonitoring||!Array.isArray(AppState.appData.contractorBehaviorMonitoring)?[]:AppState.appData.contractorBehaviorMonitoring.map(t=>this.presentContractorBehavior(t))},getRawContractorBehaviorById(t){const e=AppState?.appData?.contractorBehaviorMonitoring;return Array.isArray(e)&&e.find(i=>i&&i.id===t)||null},normalizeContractorBehaviorRecord(t){if(!t||typeof t!="object")return t;const e={...t},i=a=>{for(let s=0;s<a.length;s++){const n=a[s];if(!Object.prototype.hasOwnProperty.call(t,n))continue;const r=t[n];if(r!=null&&String(r).trim()!=="")return r}},o=(a,s)=>{const n=e[a];if(n!=null&&String(n).trim()!=="")return;const r=i(s);r!==void 0&&(e[a]=r)};return o("isoCode",["isoCode","ISO","IsoCode","\u0643\u0648\u062F ISO"]),o("contractorId",["contractorId","ContractorId","\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]),o("contractorName",["contractorName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","ContractorName"]),o("contractorWorker",["contractorWorker","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","ContractorWorker"]),o("department",["department","\u0627\u0644\u0642\u0633\u0645","Dept"]),o("job",["job","position","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","jobTitle"]),o("factory",["factory","factoryId","Factory"]),o("factoryId",["factoryId","factory"]),o("factoryName",["factoryName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0635\u0646\u0639","siteName"]),o("subLocation",["subLocation","subLocationId"]),o("subLocationId",["subLocationId","subLocation"]),o("subLocationName",["subLocationName","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A","SubLocationName"]),o("behaviorType",["behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641","Type"]),o("rating",["rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645"]),o("description",["description","\u0627\u0644\u0648\u0635\u0641","Notes"]),o("correctiveAction",["correctiveAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A"]),o("correctiveActionDetails",["correctiveActionDetails","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621"]),o("date",["date","Date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","behaviorDate"]),o("photo",["photo","\u0635\u0648\u0631\u0629","Photo"]),e},enrichContractorBehaviorRecord(t){if(!t||typeof t!="object")return t;const e={...t},i=String(e.factoryId||e.factory||"").trim();i&&!String(e.factoryName||"").trim()&&(e.factoryName=this.resolveSiteName(i)),!String(e.factoryName||"").trim()&&String(e.factory||"").trim()&&(e.factoryName=this.resolveSiteName(e.factory));const o=String(e.subLocationId||e.subLocation||"").trim();return o&&!String(e.subLocationName||"").trim()&&(e.subLocationName=this.resolvePlaceName(o,i||e.factory)),e},presentContractorBehavior(t){return!t||typeof t!="object"?t:this.enrichContractorBehaviorRecord(this.normalizeContractorBehaviorRecord(t))},matchesContractorSearch(t,e){const i=(e||"").toString().trim().toLowerCase();return i?[t?.isoCode,t?.contractorName,t?.contractorWorker,t?.department,t?.factoryName,t?.subLocationName,t?.behaviorType,t?.rating,t?.description].filter(Boolean).join(" ").toLowerCase().includes(i):!0},getFilteredContractorBehaviors(){const t=this.getContractorBehaviors(),e=this.state?.contractorFilters||{},i=(e.behaviorType||"").toString().trim(),o=(e.rating||"").toString().trim(),a=(e.search||"").toString(),s=e.dateFrom?this.parseDateSafe(e.dateFrom):null,n=e.dateTo?this.parseDateSafe(e.dateTo):null,r=t.filter(d=>{if(!this.matchesContractorSearch(d,a)||i&&(d?.behaviorType||"")!==i||o&&(d?.rating||"")!==o)return!1;const h=this.parseDateSafe(this.getBehaviorDate(d));if(s&&(!h||h<s))return!1;if(n){const v=new Date(n);if(v.setHours(23,59,59,999),!h||h>v)return!1}return!0}),c=this.state?.contractorSort||"date_desc";return r.sort((d,h)=>{const v=this.parseDateSafe(this.getBehaviorDate(d))?.getTime()||0,y=this.parseDateSafe(this.getBehaviorDate(h))?.getTime()||0;return c==="date_asc"?v-y:y-v}),r},clearContractorFilters(){this.state.contractorFilters={search:"",behaviorType:"",rating:"",dateFrom:"",dateTo:""},this.state.contractorSort="date_desc",this.state.contractorLogPage=1,this.refreshCurrentTab()},renderContractorsTab(t=!1){const e=this.state?.contractorFilters||{},i=a=>Utils.escapeHTML((a??"").toString()),o=t?"\u2014":String(this.getFilteredContractorBehaviors().length);return`
            <div id="behavior-contractors-container">
                <div class="content-card">
                    <div class="card-header flex flex-wrap items-center justify-between gap-2" style="padding: 12px 16px;">
                        <div class="flex items-center gap-2">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-users-cog ml-2"></i>${this.t("module.behavior.contractorBehaviorsTitle","\u0633\u062C\u0644 \u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}</h2>
                            <span class="badge badge-secondary" id="bhmc-filter-count">${o}</span>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button type="button" id="behavior-add-contractor-btn" class="btn-primary btn-sm">
                                <i class="fas fa-plus ml-1"></i>${this.t("module.behavior.addContractor","\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641 \u0645\u0642\u0627\u0648\u0644")}
                            </button>
                            ${this.canDeleteBehavior()?`
                            <button type="button" id="bhmc-cleanup-duplicates-btn" class="btn-danger btn-sm" title="\u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0643\u0631\u0631\u0629 \u0644\u0646\u0641\u0633 \u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644 \u0648\u0646\u0641\u0633 \u0627\u0644\u064A\u0648\u0645 \u0648\u0646\u0641\u0633 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A">
                                <i class="fas fa-clone ml-1"></i>\u062D\u0630\u0641 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A
                            </button>
                            `:""}
                            <button id="bhmc-export-csv-btn" class="btn-success btn-sm">
                                <i class="fas fa-file-csv ml-1"></i>${this.t("common.exportCSV","\u062A\u0635\u062F\u064A\u0631 CSV")}
                            </button>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 12px 16px;">
                        <div class="behavior-filter-card" style="width: 100%; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; align-items: flex-end; width: 100%;">
                                <div style="grid-column: span 2; min-width: 220px;">
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-search text-purple-600"></i> ${this.t("module.common.search","\u0627\u0644\u0628\u062D\u062B")}
                                    </label>
                                    <div class="relative" style="width: 100%;">
                                        <input id="bhmc-filter-search" type="text" class="form-input" style="height: 38px; width: 100%; padding-right: 34px;" placeholder="${this.t("common.searchPlaceholder","ISO / \u0645\u0642\u0627\u0648\u0644 / \u0639\u0627\u0645\u0644 / \u0648\u0635\u0641")}" value="${i(e.search)}" autocomplete="off">
                                        <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                                    </div>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-tags text-purple-600"></i> ${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")}
                                    </label>
                                    <select id="bhmc-filter-type" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="">${this.t("common.allTypes","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                                        <option value="\u0625\u064A\u062C\u0627\u0628\u064A" ${e.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A"?"selected":""}>${this.t("module.behavior.positive","\u0625\u064A\u062C\u0627\u0628\u064A")}</option>
                                        <option value="\u0633\u0644\u0628\u064A" ${e.behaviorType==="\u0633\u0644\u0628\u064A"?"selected":""}>${this.t("module.behavior.negative","\u0633\u0644\u0628\u064A")}</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-star text-purple-600"></i> ${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")}
                                    </label>
                                    <select id="bhmc-filter-rating" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="">${this.t("common.allRatings","\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A")}</option>
                                        <option value="\u0645\u0645\u062A\u0627\u0632" ${e.rating==="\u0645\u0645\u062A\u0627\u0632"?"selected":""}>${this.t("module.behavior.excellent","\u0645\u0645\u062A\u0627\u0632")}</option>
                                        <option value="\u062C\u064A\u062F" ${e.rating==="\u062C\u064A\u062F"?"selected":""}>${this.t("module.behavior.good","\u062C\u064A\u062F")}</option>
                                        <option value="\u0645\u0642\u0628\u0648\u0644" ${e.rating==="\u0645\u0642\u0628\u0648\u0644"?"selected":""}>${this.t("module.behavior.acceptable","\u0645\u0642\u0628\u0648\u0644")}</option>
                                        <option value="\u0636\u0639\u064A\u0641" ${e.rating==="\u0636\u0639\u064A\u0641"?"selected":""}>${this.t("module.behavior.poor","\u0636\u0639\u064A\u0641")}</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-calendar-alt text-purple-600"></i> ${this.t("common.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")}
                                    </label>
                                    <input id="bhmc-filter-from" type="date" class="form-input" style="height: 38px; width: 100%;" value="${i(e.dateFrom)}">
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-calendar-check text-purple-600"></i> ${this.t("common.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")}
                                    </label>
                                    <input id="bhmc-filter-to" type="date" class="form-input" style="height: 38px; width: 100%;" value="${i(e.dateTo)}">
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-sort-amount-down text-purple-600"></i> ${this.t("common.sort","\u0627\u0644\u062A\u0631\u062A\u064A\u0628")}
                                    </label>
                                    <select id="bhmc-sort" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="date_desc" ${this.state?.contractorSort==="date_desc"?"selected":""}>${this.t("common.newestFirst","\u0627\u0644\u0623\u062D\u062F\u062B \u0623\u0648\u0644\u0627\u064B")}</option>
                                        <option value="date_asc" ${this.state?.contractorSort==="date_asc"?"selected":""}>${this.t("common.oldestFirst","\u0627\u0644\u0623\u0642\u062F\u0645 \u0623\u0648\u0644\u0627\u064B")}</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="button" id="bhmc-clear-filters-btn" class="btn-secondary w-full" style="height: 38px; display: flex; align-items: center; justify-content: center; gap: 6px;" title="${this.t("common.clearFilters","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631")}">
                                        <i class="fas fa-eraser"></i><span>${this.t("common.clearFilters","\u0645\u0633\u062D")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="bhmc-log-table-container">
                            ${t?`<div class="empty-state"><p class="text-gray-500">${this.t("common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p></div>`:this.renderContractorLogTableHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `},renderContractorLogTableHTML(){const t=this.getFilteredContractorBehaviors();if(!t.length)return`<div class="empty-state"><p class="text-gray-500">${this.t("common.noMatchingResults","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629")}</p></div>`;const e=this.paginateItems(t,this.state.contractorLogPage||1);this.state.contractorLogPage=e.page;const i=e.items;return`
            <div class="table-wrapper" style="overflow-x:auto;">
                <table class="data-table table-header-purple">
                    <thead>
                        <tr>
                            <th style="width: 110px;">${this.t("module.behavior.isoCode","\u0643\u0648\u062F ISO")}</th>
                            <th>${this.t("module.behavior.contractorName","\u0627\u0644\u0645\u0642\u0627\u0648\u0644")}</th>
                            <th style="width: 140px;">${this.t("module.behavior.contractorWorker","\u0627\u0644\u0639\u0627\u0645\u0644")}</th>
                            <th style="width: 130px;">${this.t("module.behavior.factory","\u0627\u0644\u0645\u0635\u0646\u0639")}</th>
                            <th style="width: 140px;">${this.t("module.behavior.subLocation","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</th>
                            <th style="width: 110px;">${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")}</th>
                            <th style="width: 140px;">${this.t("module.behavior.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}</th>
                            <th style="width: 100px;">${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")}</th>
                            <th class="text-center" style="width: 140px;">${this.t("common.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i.map(o=>`
                            <tr>
                                <td>${Utils.escapeHTML(o.isoCode||"")}</td>
                                <td><span class="font-semibold">${Utils.escapeHTML(o.contractorName||"")}</span></td>
                                <td>${Utils.escapeHTML(o.contractorWorker||"\u2014")}</td>
                                <td>${Utils.escapeHTML(o.factoryName||o.factory||"\u2014")}</td>
                                <td>${Utils.escapeHTML(o.subLocationName||o.subLocation||"\u2014")}</td>
                                <td><span class="badge ${this.getBehaviorTypeBadgeClass(o.behaviorType)}">${Utils.escapeHTML(o.behaviorType||"\u2014")}</span></td>
                                <td>${this.getBehaviorDate(o)?this.formatBehaviorDateDisplay(o):"\u2014"}</td>
                                <td><span class="badge ${this.getRatingBadgeClass(o.rating)}">${Utils.escapeHTML(o.rating||"\u2014")}</span></td>
                                <td class="text-center">
                                    <div class="flex items-center justify-center gap-2 flex-wrap">
                                        <button type="button" onclick="BehaviorMonitoring.viewContractorBehavior(${JSON.stringify(String(o.id||""))})" class="btn-icon btn-icon-primary" title="${this.t("common.view","\u0639\u0631\u0636")}"><i class="fas fa-eye"></i></button>
                                        <button type="button" onclick="BehaviorMonitoring.editContractorBehavior(${JSON.stringify(String(o.id||""))})" class="btn-icon btn-icon-warning" title="${this.t("common.edit","\u062A\u0639\u062F\u064A\u0644")}"><i class="fas fa-edit"></i></button>
                                        ${this.canDeleteBehavior()?`
                                        <button type="button" onclick="BehaviorMonitoring.deleteContractorBehaviorById(${JSON.stringify(String(o.id||""))})" class="btn-icon btn-icon-danger" title="${this.t("common.delete","\u062D\u0630\u0641")}"><i class="fas fa-trash"></i></button>
                                        `:""}
                                        <button type="button" onclick="BehaviorMonitoring.exportContractorPDF(${JSON.stringify(String(o.id||""))})" class="btn-icon btn-icon-success" title="${this.t("common.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF")}"><i class="fas fa-file-pdf"></i></button>
                                        <button type="button" onclick="BehaviorMonitoring.printContractorReport(${JSON.stringify(String(o.id||""))})" class="btn-icon btn-icon-info" title="${this.t("common.print","\u0637\u0628\u0627\u0639\u0629")}"><i class="fas fa-print"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
            ${this.renderTablePaginationHTML("contractor",e)}
        `},renderContractorLogTable(){const t=document.getElementById("bhmc-log-table-container");t&&(t.innerHTML=this.renderContractorLogTableHTML());const e=document.getElementById("bhmc-filter-count");e&&(e.textContent=String(this.getFilteredContractorBehaviors().length))},exportContractorLogCSV(){const t=this.getFilteredContractorBehaviors();if(!t.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const e=r=>{const c=(r??"").toString().replace(/\r?\n/g," ").trim();return c.includes('"')||c.includes(",")||c.includes(";")?`"${c.replace(/"/g,'""')}"`:c},o=[["ISO","ContractorName","ContractorWorker","Department","Job","Factory","SubLocation","BehaviorType","Date","Rating","CorrectiveAction","CorrectiveActionDetails","Description"].join(","),...t.map(r=>[e(r.isoCode||""),e(r.contractorName||""),e(r.contractorWorker||""),e(r.department||""),e(r.job||r.position||""),e(r.factoryName||r.factory||""),e(r.subLocationName||r.subLocation||""),e(r.behaviorType||""),e(this.getBehaviorDate(r)?Utils.formatDateForInput(this.getBehaviorDate(r)):""),e(r.rating||""),e(r.correctiveAction||""),e(r.correctiveActionDetails||""),e(r.description||"")].join(","))].join(`
`),a=new Blob([o],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(a),n=document.createElement("a");n.href=s,n.download=`ContractorBehaviorMonitoring_${new Date().toISOString().slice(0,10)}.csv`,document.body.appendChild(n),n.click(),n.remove(),URL.revokeObjectURL(s)},getContractorBehaviorFormHTML(t,e){const i=t?.date?new Date(t.date).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],o=this.getSiteOptions(),a=t?.factory||t?.factoryId||"",s=t?.subLocation||t?.subLocationId||"",n=o.find(b=>b.id===a)?.id||o.find(b=>b.name===a)?.id||a,r=this.getPlaceOptions(n),c=r.find(b=>b.id===s)?.id||r.find(b=>b.name===s)?.id||s,d=(t?.behaviorType||"")==="\u0633\u0644\u0628\u064A",h=this.processPhoto(t?.photo),v=h&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(h):{canonical:h||"",displaySrc:h||"",needsProxy:!1,proxyFileId:""},y=v.canonical?v.displaySrc:"",B=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(v):"",m={contractorSelect:`${e}-contractor-select`,contractorWorker:`${e}-contractor-worker`,department:`${e}-cb-department`,job:`${e}-cb-job`,factory:`${e}-cb-factory`,subLocation:`${e}-cb-sublocation`,behaviorType:`${e}-cb-type`,behaviorDate:`${e}-cb-date`,behaviorRating:`${e}-cb-rating`,correctiveAction:`${e}-cb-corrective`,correctiveActionDetails:`${e}-cb-corrective-details`,description:`${e}-cb-description`,photoInput:`${e}-cb-photo-input`,photoPreview:`${e}-cb-photo-preview`,photoImg:`${e}-cb-photo-img`,saveBtn:`${e}-cb-save-btn`,typeBadge:`${e}-cb-type-badge`,negativeSection:`${e}-cb-negative-section`};return`
            <div class="behavior-form-wrapper bhm-form behavior-form-modal" data-behavior-type="${Utils.escapeHTML(t?.behaviorType||"")}">
                <form data-contractor-behavior-form="true" data-form-uid="${e}" class="bhm-form-inner">
                    <section class="bhm-section">
                        <div class="bhm-section-head">
                            <span class="bhm-section-icon"><i class="fas fa-users-cog"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t("module.behavior.form.contractorSection","\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644")}</h4>
                                <p class="bhm-section-hint">${this.t("module.behavior.form.contractorHint","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644")}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${m.contractorSelect}" class="bhm-label">${this.t("module.behavior.contractorName","\u0627\u0644\u0645\u0642\u0627\u0648\u0644")} <span class="bhm-req">*</span></label>
                                    <select id="${m.contractorSelect}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectContractor","-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --")}</option>
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${m.contractorWorker}" class="bhm-label">${this.t("module.behavior.contractorWorker","\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644")} <span class="bhm-optional">(${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")})</span></label>
                                    <input type="text" id="${m.contractorWorker}" class="form-input bhm-input" value="${Utils.escapeHTML(t?.contractorWorker||"")}" placeholder="${this.t("module.behavior.form.workerPh","\u0639\u0627\u0645\u0644 \u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644")}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${m.department}" class="bhm-label">${this.t("module.behavior.form.department","\u0627\u0644\u0642\u0633\u0645")}</label>
                                    <input type="text" id="${m.department}" class="form-input bhm-input" value="${Utils.escapeHTML(t?.department||"")}" placeholder="${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${m.job}" class="bhm-label">${this.t("module.behavior.form.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}</label>
                                    <input type="text" id="${m.job}" class="form-input bhm-input" value="${Utils.escapeHTML(t?.job||t?.position||"")}" placeholder="${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")}">
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="bhm-section">
                        <div class="bhm-section-head">
                            <span class="bhm-section-icon bhm-section-icon--violet"><i class="fas fa-clipboard-list"></i></span>
                            <div>
                                <h4 class="bhm-section-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641</h4>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhmc-contractor-detail-grid">
                                <div class="bhm-field bhmc-contractor-detail-type">
                                    <div class="bhm-label-row">
                                        <label for="${m.behaviorType}" class="bhm-label mb-0">${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")} <span class="bhm-req">*</span></label>
                                        <span class="badge ${this.getBehaviorTypeBadgeClass(t?.behaviorType)} bhm-type-chip" id="${m.typeBadge}">${Utils.escapeHTML(t?.behaviorType||"\u2014")}</span>
                                    </div>
                                    <select id="${m.behaviorType}" required class="form-input bhm-input mt-2">
                                        <option value="">${this.t("module.behavior.selectType","\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639")}</option>
                                        <option value="\u0625\u064A\u062C\u0627\u0628\u064A" ${t?.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A"?"selected":""}>${this.t("module.behavior.positive","\u0625\u064A\u062C\u0627\u0628\u064A")}</option>
                                        <option value="\u0633\u0644\u0628\u064A" ${t?.behaviorType==="\u0633\u0644\u0628\u064A"?"selected":""}>${this.t("module.behavior.negative","\u0633\u0644\u0628\u064A")}</option>
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${m.behaviorDate}" class="bhm-label">${this.t("module.behavior.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")} <span class="bhm-req">*</span></label>
                                    <input type="date" id="${m.behaviorDate}" required class="form-input bhm-input" value="${i}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${m.behaviorRating}" class="bhm-label">${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")} <span class="bhm-req">*</span></label>
                                    <select id="${m.behaviorRating}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectRating","\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0642\u064A\u064A\u0645")}</option>
                                        <option value="\u0645\u0645\u062A\u0627\u0632" ${t?.rating==="\u0645\u0645\u062A\u0627\u0632"?"selected":""}>${this.t("module.behavior.excellent","\u0645\u0645\u062A\u0627\u0632")}</option>
                                        <option value="\u062C\u064A\u062F" ${t?.rating==="\u062C\u064A\u062F"?"selected":""}>${this.t("module.behavior.good","\u062C\u064A\u062F")}</option>
                                        <option value="\u0645\u0642\u0628\u0648\u0644" ${t?.rating==="\u0645\u0642\u0628\u0648\u0644"?"selected":""}>${this.t("module.behavior.acceptable","\u0645\u0642\u0628\u0648\u0644")}</option>
                                        <option value="\u0636\u0639\u064A\u0641" ${t?.rating==="\u0636\u0639\u064A\u0641"?"selected":""}>${this.t("module.behavior.poor","\u0636\u0639\u064A\u0641")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="bhm-section">
                        <div class="bhm-section-head">
                            <span class="bhm-section-icon bhm-section-icon--teal"><i class="fas fa-map-marked-alt"></i></span>
                            <div><h4 class="bhm-section-title">\u0627\u0644\u0645\u0648\u0642\u0639</h4></div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${m.factory}" class="bhm-label">\u0627\u0644\u0645\u0635\u0646\u0639 <span class="bhm-req">*</span></label>
                                    <select id="${m.factory}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectFactory","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")}</option>
                                        ${o.map(b=>`
                                            <option value="${b.id}" ${n===b.id||a===b.name?"selected":""}>${Utils.escapeHTML(b.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${m.subLocation}" class="bhm-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A <span class="bhm-req">*</span></label>
                                    <select id="${m.subLocation}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectSubLocation","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</option>
                                        ${r.map(b=>`
                                            <option value="${b.id}" ${c===b.id||s===b.name?"selected":""}>${Utils.escapeHTML(b.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="${m.negativeSection}" class="bhm-negative-panel" style="${d?"":"display:none;"}">
                        <div class="bhm-negative-head">
                            <span class="bhm-negative-icon"><i class="fas fa-exclamation-triangle"></i></span>
                            <div><h4 class="bhm-negative-title">\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A (\u0644\u0644\u062A\u0635\u0631\u0641 \u0627\u0644\u0633\u0644\u0628\u064A)</h4></div>
                        </div>
                        <div class="bhm-negative-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${m.correctiveAction}" class="bhm-label">${this.t("module.behavior.form.correctiveAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A")} <span class="bhm-req">*</span></label>
                                    <select id="${m.correctiveAction}" class="form-input bhm-input" ${d?"required":""}>
                                        <option value="">${this.t("module.behavior.selectAction","\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621")}</option>
                                        ${this.NEGATIVE_ACTIONS.map(b=>`
                                            <option value="${Utils.escapeHTML(b)}" ${t?.correctiveAction===b?"selected":""}>${Utils.escapeHTML(b)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${m.correctiveActionDetails}" class="bhm-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629</label>
                                    <input type="text" id="${m.correctiveActionDetails}" class="form-input bhm-input" value="${Utils.escapeHTML(t?.correctiveActionDetails||"")}">
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="bhm-section bhm-section--media">
                        <div class="bhm-section-head">
                            <span class="bhm-section-icon bhm-section-icon--amber"><i class="fas fa-align-right"></i></span>
                            <div><h4 class="bhm-section-title">\u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</h4></div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-media">
                                <div class="bhm-field bhm-upload-wrap">
                                    <label for="${m.photoInput}" class="bhm-label">\u0635\u0648\u0631\u0629</label>
                                    <input type="file" id="${m.photoInput}" accept="image/*" class="bhm-file-input">
                                    <div id="${m.photoPreview}" class="bhm-photo-preview mt-3 ${t?.photo?"":"hidden"}">
                                        <img src="${Utils.escapeHTML(y)}" alt=""${B} class="bhm-photo-thumb" id="${m.photoImg}">
                                        <button type="button" class="bhm-photo-clear" data-action="cb-clear-photo">${this.t("module.behavior.form.clearPhoto","\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629")}</button>
                                    </div>
                                </div>
                                <div class="bhm-field bhm-field-grow">
                                    <label for="${m.description}" class="bhm-label">${this.t("module.behavior.form.description","\u0627\u0644\u0648\u0635\u0641")} <span class="bhm-req">*</span></label>
                                    <textarea id="${m.description}" required class="form-input bhm-input bhm-textarea" rows="5">${Utils.escapeHTML(t?.description||"")}</textarea>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="bhm-form-footer">
                        <button type="button" class="btn-secondary bhm-btn-cancel" data-action="cb-cancel-form">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" id="${m.saveBtn}" class="btn-primary bhm-btn-save"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638</button>
                    </div>
                </form>
            </div>
        `},bindContractorBehaviorForm({form:t,uid:e,data:i,modal:o,signal:a}){const s=document.getElementById(`${e}-contractor-select`);if(s&&typeof Contractors<"u"&&Contractors.populateContractorSelect)try{Contractors.populateContractorSelect(s,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:i?.contractorName||"",selectedContractorId:i?.contractorId||"",valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1})}catch(p){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",p)}const n=document.getElementById(`${e}-cb-factory`),r=document.getElementById(`${e}-cb-sublocation`),c=()=>{if(!n||!r)return;const p=this.getPlaceOptions(n.value),u=r.value;r.innerHTML='<option value="">'+this.t("module.behavior.selectSubLocation","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")+"</option>"+p.map(l=>`<option value="${l.id}">${Utils.escapeHTML(l.name)}</option>`).join(""),u&&p.some(l=>l.id===u)&&(r.value=u)};n?.addEventListener("change",c,{signal:a});const d=document.getElementById(`${e}-cb-type`),h=document.getElementById(`${e}-cb-type-badge`),v=document.getElementById(`${e}-cb-negative-section`),y=document.getElementById(`${e}-cb-corrective`),B=p=>{const u=t.closest(".behavior-form-wrapper");u&&u.setAttribute("data-behavior-type",p||""),h&&(h.className=`badge ${this.getBehaviorTypeBadgeClass(p)} bhm-type-chip`,h.textContent=p||"\u2014");const l=(p||"")==="\u0633\u0644\u0628\u064A";v&&(v.style.display=l?"":"none"),y&&(l?y.setAttribute("required","required"):y.removeAttribute("required"))};B(d?.value||i?.behaviorType||""),d?.addEventListener("change",()=>B(d.value),{signal:a});const m=document.getElementById(`${e}-cb-photo-input`),b=document.getElementById(`${e}-cb-photo-preview`),T=document.getElementById(`${e}-cb-photo-img`);m&&b&&T&&m.addEventListener("change",p=>{const u=p.target.files?.[0];if(!u)return;if(u.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),m.value="";return}const l=new FileReader;l.onload=f=>{T.src=f.target.result,b.classList.remove("hidden")},l.readAsDataURL(u)},{signal:a}),t.querySelector('[data-action="cb-clear-photo"]')?.addEventListener("click",()=>{const p=document.getElementById(`${e}-cb-photo-input`),u=document.getElementById(`${e}-cb-photo-preview`);p&&(p.value=""),u&&u.classList.add("hidden")},{signal:a}),t.querySelector('[data-action="cb-cancel-form"]')?.addEventListener("click",()=>o?.remove(),{signal:a}),document.getElementById(`${e}-cb-save-btn`)?.addEventListener("click",()=>this.handleContractorSubmit({uid:e,form:t,editId:i?.id||null,modal:o}),{signal:a})},async handleContractorSubmit({uid:t,form:e,editId:i=null,modal:o}){if(this._contractorSubmitLock){Notification.warning("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u0641... \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u0644\u0645\u0646\u0639 \u0627\u0644\u062A\u0643\u0631\u0627\u0631");return}const a=document.getElementById(`${t}-cb-save-btn`);this._contractorSubmitLock=!0,a&&(a.disabled=!0,a.setAttribute("aria-busy","true"));try{let s=i&&this.getRawContractorBehaviorById(i)?.photo||"";const n=document.getElementById(`${t}-cb-photo-input`);if(n&&n.files.length>0){const w=n.files[0];if(w.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}s=await this.convertImageToBase64(w)}const r=document.getElementById(`${t}-contractor-select`),c=r?.selectedOptions?.[0],d=(r?.value||"").trim(),h=(c?.dataset?.contractorId||"").trim();if(!d){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644");return}const v=document.getElementById(`${t}-cb-type`),y=document.getElementById(`${t}-cb-date`),B=document.getElementById(`${t}-cb-rating`),m=document.getElementById(`${t}-cb-description`),b=document.getElementById(`${t}-cb-department`),T=document.getElementById(`${t}-cb-job`),p=document.getElementById(`${t}-cb-factory`),u=document.getElementById(`${t}-cb-sublocation`),l=document.getElementById(`${t}-cb-corrective`),f=document.getElementById(`${t}-cb-corrective-details`),S=document.getElementById(`${t}-contractor-worker`);if(!v||!y||!B||!m||!p||!u){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.");return}const g=(v.value||"")==="\u0633\u0644\u0628\u064A";if(g&&(!l||!l.value)){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0644\u0644\u062A\u0635\u0631\u0641 \u0627\u0644\u0633\u0644\u0628\u064A");return}const x=AppState.appData.contractorBehaviorMonitoring||[],$=i?this.getRawContractorBehaviorById(i):null,L=typeof generateISOCode=="function"?generateISOCode:null,C={id:i||Utils.generateId("CBHM"),isoCode:$&&$.isoCode?$.isoCode:L?L("BHC",x):`BHC-${Date.now()}`,contractorId:h,contractorName:d,contractorWorker:(S?.value||"").trim(),department:(b?.value||"").trim(),job:(T?.value||"").trim(),factory:(p.value||"").trim(),factoryId:p.value?String(p.value).trim():null,factoryName:this.resolveSiteName(p.value),subLocation:(u.value||"").trim(),subLocationId:u.value?String(u.value).trim():null,subLocationName:this.resolvePlaceName(u.value,p.value),photo:s,behaviorType:v.value,date:new Date(y.value).toISOString(),rating:B.value,correctiveAction:g&&l?.value||"",correctiveActionDetails:g?(f?.value||"").trim():"",description:m.value.trim(),createdAt:i?this.getRawContractorBehaviorById(i)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(this.findDuplicateContractorBehavior(C,i)){Notification.warning("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0646\u0641\u0633 \u0627\u0644\u062A\u0635\u0631\u0641 \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0645\u0633\u0628\u0642\u0627\u064B. \u0644\u0646 \u064A\u062A\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631.");return}Loading.show();try{if(Array.isArray(AppState.appData.contractorBehaviorMonitoring)||(AppState.appData.contractorBehaviorMonitoring=[]),i){const w=AppState.appData.contractorBehaviorMonitoring.findIndex(D=>D.id===i);w!==-1&&(AppState.appData.contractorBehaviorMonitoring[w]=C),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u0641 \u0628\u0646\u062C\u0627\u062D")}else{if(this.findDuplicateContractorBehavior(C,i)){Notification.warning("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0646\u0641\u0633 \u0627\u0644\u062A\u0635\u0631\u0641 \u0645\u0633\u0628\u0642\u0627\u064B. \u0644\u0646 \u064A\u062A\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631.");return}AppState.appData.contractorBehaviorMonitoring.push(C),Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641 \u0628\u0646\u062C\u0627\u062D")}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.autoSave("ContractorBehaviorMonitoring",AppState.appData.contractorBehaviorMonitoring),o&&o.remove(),this.refreshCurrentTab()}catch(w){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+w.message)}finally{Loading.hide()}}finally{this._contractorSubmitLock=!1,a&&document.body.contains(a)&&(a.disabled=!1,a.removeAttribute("aria-busy"))}},async showContractorForm(t=null){if(typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{await Permissions.ensureFormSettingsState()}catch{}const e=document.createElement("div");e.className="modal-overlay bhmc-contractor-overlay";const i=`bhmc-modal-${Date.now()}`,o=t?this.presentContractorBehavior(t):null;e.innerHTML=`
            <div class="modal-content behavior-modal bhm-registration-modal bhmc-contractor-dialog">
                <div class="bhm-modal-hero">
                    <div class="bhm-modal-hero-text">
                        <p class="bhm-modal-kicker"><i class="fas fa-users-cog ml-2"></i>\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                        <h2 class="bhm-modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641":"\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641 \u0645\u0642\u0627\u0648\u0644"}</h2>
                    </div>
                    <button type="button" class="bhm-modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="\u0625\u063A\u0644\u0627\u0642"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body bhm-modal-body">
                    ${this.getContractorBehaviorFormHTML(o,i)}
                </div>
            </div>`,document.body.appendChild(e),this._modalAbortController&&this._modalAbortController.abort(),this._modalAbortController=new AbortController;const a=this._modalAbortController.signal,s=e.querySelector('form[data-contractor-behavior-form="true"]');s&&this.bindContractorBehaviorForm({form:s,uid:i,data:o,modal:e,signal:a}),e.addEventListener("click",n=>{n.target===e&&e.remove()},{signal:a})},editContractorBehavior(t){const e=this.getRawContractorBehaviorById(t);if(!e){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.showContractorForm(e)},async viewContractorBehavior(t){const e=this.getRawContractorBehaviorById(t);if(!e){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.presentContractorBehavior(e),o=r=>Utils.escapeHTML((r??"").toString()),a=r=>{const c=(r??"").toString().trim();return c?o(c):'<span class="bhm-detail-empty">\u2014</span>'},s=this.getBehaviorDate(i)?this.formatBehaviorDateDisplay(i):"\u2014",n=document.createElement("div");n.className="modal-overlay bhm-detail-overlay",n.innerHTML=`
            <div class="modal-content behavior-modal bhm-detail-modal" style="max-width: 820px;">
                <div class="bhm-detail-hero">
                    <div class="bhm-detail-hero-text">
                        <p class="bhm-detail-kicker"><i class="fas fa-users-cog ml-2"></i>\u062A\u0635\u0631\u0641 \u0645\u0642\u0627\u0648\u0644</p>
                        <h2 class="bhm-detail-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641</h2>
                        <p class="bhm-detail-sub">${o(i.isoCode||"\u2014")} \xB7 ${o(i.contractorName||"")}</p>
                    </div>
                    <button type="button" class="bhm-detail-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body bhm-detail-body">
                    <div class="bhm-detail-grid">
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0643\u0648\u062F ISO</span><div class="bhm-detail-value">${a(i.isoCode)}</div></div>
                        <div class="bhm-detail-field bhm-detail-field-span2"><span class="bhm-detail-label">\u0627\u0644\u0645\u0642\u0627\u0648\u0644</span><div class="bhm-detail-value bhm-detail-value-strong">${a(i.contractorName)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0639\u0627\u0645\u0644</span><div class="bhm-detail-value">${a(i.contractorWorker)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0642\u0633\u0645</span><div class="bhm-detail-value">${a(i.department)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</span><div class="bhm-detail-value">${a(i.job)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0645\u0635\u0646\u0639</span><div class="bhm-detail-value">${a(i.factoryName||i.factory)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</span><div class="bhm-detail-value">${a(i.subLocationName||i.subLocation)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641</span><div class="bhm-detail-value"><span class="badge ${this.getBehaviorTypeBadgeClass(i.behaviorType)}">${o(i.behaviorType||"\u2014")}</span></div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</span><div class="bhm-detail-value">${o(s)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u062A\u0642\u064A\u064A\u0645</span><div class="bhm-detail-value"><span class="badge ${this.getRatingBadgeClass(i.rating)}">${o(i.rating||"\u2014")}</span></div></div>
                        <div class="bhm-detail-field bhm-detail-field-span2"><span class="bhm-detail-label">\u0627\u0644\u0648\u0635\u0641</span><div class="bhm-detail-value">${a(i.description)}</div></div>
                    </div>
                </div>
                <div class="bhm-detail-footer">
                    <button type="button" class="btn-primary" onclick="BehaviorMonitoring.editContractorBehavior(${JSON.stringify(String(i.id||""))}); this.closest('.modal-overlay').remove();"><i class="fas fa-pen ml-2"></i>\u062A\u0639\u062F\u064A\u0644</button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("behavior-monitoring"):""}
                    ${this.canDeleteBehavior()?`
                    <button type="button" class="btn-danger" onclick="BehaviorMonitoring.deleteContractorBehaviorById(${JSON.stringify(String(i.id||""))})"><i class="fas fa-trash ml-2"></i>\u062D\u0630\u0641</button>
                    `:""}
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.printContractorReport(${JSON.stringify(String(i.id||""))})"><i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629</button>
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.exportContractorPDF(${JSON.stringify(String(i.id||""))})"><i class="fas fa-file-pdf ml-2"></i>PDF</button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>`,document.body.appendChild(n),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(n,{moduleKey:"behavior-monitoring",record:i,recordId:i.id||i.isoCode||""})},async exportContractorPDF(t){const e=this.getRawContractorBehaviorById(t);if(!e){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.presentContractorBehavior(e);try{Loading.show();const o=i.isoCode||`BHC-${i.id?.substring(0,8)||"UNKNOWN"}`,a="\u062A\u0642\u0631\u064A\u0631 \u062A\u0635\u0631\u0641 \u0645\u0642\u0627\u0648\u0644",s=this.getBehaviorDate(i)?this.formatBehaviorDateDisplay(i):"\u2014",n=`
                <table>
                    <tr><th>\u0643\u0648\u062F ISO</th><td>${Utils.escapeHTML(i.isoCode||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0642\u0627\u0648\u0644</th><td>${Utils.escapeHTML(i.contractorName||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0639\u0627\u0645\u0644</th><td>${Utils.escapeHTML(i.contractorWorker||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0642\u0633\u0645</th><td>${Utils.escapeHTML(i.department||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th><td>${Utils.escapeHTML(i.job||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0635\u0646\u0639</th><td>${Utils.escapeHTML(i.factoryName||i.factory||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th><td>${Utils.escapeHTML(i.subLocationName||i.subLocation||"")}</td></tr>
                    <tr><th>\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641</th><td>${Utils.escapeHTML(i.behaviorType||"")}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><td>${Utils.escapeHTML(s)}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0642\u064A\u064A\u0645</th><td>${Utils.escapeHTML(i.rating||"")}</td></tr>
                    ${i.behaviorType==="\u0633\u0644\u0628\u064A"&&(i.correctiveAction||i.correctiveActionDetails)?`
                        <tr><th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</th><td>${Utils.escapeHTML(i.correctiveAction||"")}</td></tr>
                        <tr><th>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</th><td>${Utils.escapeHTML(i.correctiveActionDetails||"")}</td></tr>
                    `:""}
                    <tr><th colspan="2">\u0627\u0644\u0648\u0635\u0641</th></tr>
                    <tr><td colspan="2">${Utils.escapeHTML(i.description||"")}</td></tr>
                </table>`,r=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(o,a,n,!1,!0,{version:"1.0"},i.createdAt,i.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${a}</title></head><body>${n}</body></html>`,c=new Blob([r],{type:"text/html;charset=utf-8"}),d=URL.createObjectURL(c),h=window.open(d,"_blank");h?h.onload=()=>{setTimeout(()=>{h.print(),setTimeout(()=>URL.revokeObjectURL(d),1e3),Loading.hide()},500)}:(URL.revokeObjectURL(d),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629"))}catch(o){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+o.message)}},async printContractorReport(t){await this.exportContractorPDF(t)},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F BehaviorMonitoring module..."),this._eventListenersAbortController&&(this._eventListenersAbortController.abort(),this._eventListenersAbortController=null),this._modalAbortController&&(this._modalAbortController.abort(),this._modalAbortController=null),this._setupTimeoutId&&(clearTimeout(this._setupTimeoutId),this._setupTimeoutId=null),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F BehaviorMonitoring module")}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 BehaviorMonitoring module:",t)}}};(function(){"use strict";try{typeof window<"u"&&typeof BehaviorMonitoring<"u"&&(window.BehaviorMonitoring=BehaviorMonitoring,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 BehaviorMonitoring module loaded and available on window.BehaviorMonitoring"))}catch{if(typeof window<"u"&&typeof BehaviorMonitoring<"u")try{window.BehaviorMonitoring=BehaviorMonitoring}catch{}}})();
