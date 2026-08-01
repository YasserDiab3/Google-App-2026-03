const BehaviorMonitoring={_setupTimeoutId:null,_eventListenersAbortController:null,_modalAbortController:null,processPhoto(e){return typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"?Utils.normalizeImageSource(e)||null:!e||typeof e!="string"?null:e.trim()||null},state:{activeTab:"log",filters:{search:"",behaviorType:"",rating:"",dateFrom:"",dateTo:""},sort:"date_desc",contractorFilters:{search:"",behaviorType:"",rating:"",dateFrom:"",dateTo:""},contractorSort:"date_desc",logPage:1,contractorLogPage:1,pageSize:50},getPageSize(){const e=Number(this.state?.pageSize);return Number.isFinite(e)&&e>0?e:50},paginateItems(e,t){const i=Array.isArray(e)?e:[],a=this.getPageSize(),o=i.length,n=Math.max(1,Math.ceil(o/a)||1),r=Math.min(Math.max(1,Number(t)||1),n),s=(r-1)*a;return{page:r,totalPages:n,total:o,start:s,end:Math.min(s+a,o),items:i.slice(s,s+a)}},renderTablePaginationHTML(e,t){const{page:i,totalPages:a,total:o,start:n,end:r}=t;if(o<=this.getPageSize())return o?`<div class="bhm-pagination text-sm text-gray-500 mt-3">${n+1}\u2013${r} / ${o}</div>`:"";const s=i<=1?"disabled":"",h=i>=a?"disabled":"",c=e==="contractor"?"setContractorLogPage":"setLogPage";return`
            <div class="bhm-pagination flex flex-wrap items-center justify-between gap-3 mt-3">
                <span class="text-sm text-gray-600">${n+1}\u2013${r} / ${o}</span>
                <div class="flex items-center gap-2">
                    <button type="button" class="btn-secondary btn-sm" ${s} onclick="BehaviorMonitoring.${c}(${i-1})">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <span class="text-sm font-semibold">${i} / ${a}</span>
                    <button type="button" class="btn-secondary btn-sm" ${h} onclick="BehaviorMonitoring.${c}(${i+1})">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                </div>
            </div>
        `},setLogPage(e){this.state.logPage=Math.max(1,Number(e)||1),this.renderLogTable()},setContractorLogPage(e){this.state.contractorLogPage=Math.max(1,Number(e)||1),this.renderContractorLogTable()},t(e,t){try{if(typeof AppI18n<"u"&&typeof AppI18n.t=="function")return AppI18n.t(e,null,t!=null?String(t):"");if(typeof I18n<"u"&&typeof I18n.t=="function")return I18n.t(e,null,t!=null?String(t):"")}catch{}return t!=null?String(t):e},NEGATIVE_ACTIONS:["\u062A\u0648\u0639\u064A\u0629 / \u062A\u0648\u062C\u064A\u0647","\u0625\u0639\u0627\u062F\u0629 \u062A\u062F\u0631\u064A\u0628","\u062A\u062D\u0630\u064A\u0631 \u0634\u0641\u0647\u064A","\u0625\u0646\u0630\u0627\u0631 \u0643\u062A\u0627\u0628\u064A","\u0625\u064A\u0642\u0627\u0641 \u0645\u0624\u0642\u062A \u0639\u0646 \u0627\u0644\u0639\u0645\u0644","\u062A\u0637\u0628\u064A\u0642 / \u062A\u0639\u062F\u064A\u0644 \u0625\u062C\u0631\u0627\u0621 \u0639\u0645\u0644","\u062A\u062D\u0633\u064A\u0646\u0627\u062A \u0647\u0646\u062F\u0633\u064A\u0629 (Engineering)","\u062A\u0648\u0641\u064A\u0631 / \u0625\u0644\u0632\u0627\u0645 PPE","\u0623\u062E\u0631\u0649"],getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},getPlaceOptions(e){try{if(!e)return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const t=Permissions.formSettingsState.sites.find(i=>i.id===e);if(t&&Array.isArray(t.places))return t.places.map(i=>({id:i.id,name:i.name}))}if(Array.isArray(AppState.appData?.observationSites)){const t=AppState.appData.observationSites.find(i=>(i.id||i.siteId)===e);if(t)return(Array.isArray(t.places)?t.places:Array.isArray(t.locations)?t.locations:Array.isArray(t.children)?t.children:Array.isArray(t.areas)?t.areas:[]).map((a,o)=>({id:a.id||a.placeId||a.value||Utils.generateId("PLACE"),name:a.name||a.placeName||a.title||a.label||a.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const t=DailyObservations.DEFAULT_SITES.find(i=>(i.id||i.siteId)===e);if(t)return(Array.isArray(t.places)?t.places:Array.isArray(t.locations)?t.locations:Array.isArray(t.children)?t.children:Array.isArray(t.areas)?t.areas:[]).map((a,o)=>({id:a.id||a.placeId||a.value||Utils.generateId("PLACE"),name:a.name||a.placeName||a.title||a.label||a.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions();if(!e||!e.length)return;var t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(i){return String(i??"")};document.querySelectorAll('select[id$="-factory"]').forEach(function(i){if(i.tagName==="SELECT"){var a=i.value;i.innerHTML='<option value="">'+this.t("module.behavior.selectFactory","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")+"</option>"+e.map(function(o){return'<option value="'+t(o.id)+'">'+t(o.name)+"</option>"}).join(""),a&&(i.value=a)}})}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F BehaviorMonitoring.refreshSiteDropdowns:",i)}},resolveSiteName(e){const t=(e||"").toString();if(!t)return"";const i=this.getSiteOptions();return(i.find(o=>o.id===t)||i.find(o=>(o.name||"")===t))?.name||t},resolvePlaceName(e,t){const i=(e||"").toString();if(!i)return"";const a=(t||"").toString(),o=this.getPlaceOptions(a);return(o.find(r=>r.id===i)||o.find(r=>(r.name||"")===i))?.name||i},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||AppState?.currentSection&&AppState.currentSection!=="behavior-monitoring"||this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u")return;if(typeof AppState>"u"){const t=document.getElementById("behavior-monitoring-section");t&&(t.innerHTML=`
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
                `),Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}const e=document.getElementById("behavior-monitoring-section");if(!e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0642\u0633\u0645 behavior-monitoring-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}AppState.appData||(AppState.appData={}),AppState.appData.behaviorMonitoring||(AppState.appData.behaviorMonitoring=[]),AppState.appData.contractorBehaviorMonitoring||(AppState.appData.contractorBehaviorMonitoring=[]);try{const t=this.state?.activeTab||"log",i=t==="form"?"log":t;if(this.state.activeTab=i,e.innerHTML=`
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
            `,this.setupEventListeners(),await this.switchTab(i,{initial:!0}),typeof AppState<"u"&&AppState._languageRefresh===!0)return;setTimeout(()=>{this.loadBehaviorDataAsync().then(()=>{const a=this.state?.activeTab||"log";this.switchTab(a,{silent:!0}).catch(()=>{this.refreshCurrentTab()})}).catch(a=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643:",a),this.refreshCurrentTab()})},100)}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A:",t),e.innerHTML=`
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
                                <p class="text-sm text-gray-400 mb-4">${t&&t.message?Utils.escapeHTML(t.message):this.t("common.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")}</p>
                                <button onclick="BehaviorMonitoring.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}},async loadBehaviorDataAsync(){try{const e=await GoogleIntegration.sendRequest({action:"getAllBehaviors",data:{}}).catch(i=>{const a=i.message||i.toString()||"";return a.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||a.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643:",i),{success:!1,data:[]})}),t=await GoogleIntegration.sendRequest({action:"getAllContractorBehaviors",data:{}}).catch(i=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",i),{success:!1,data:[]}));if(e&&e.success&&Array.isArray(e.data)){const i=Array.isArray(AppState.appData.behaviorMonitoring)?AppState.appData.behaviorMonitoring:[];e.data.length===0&&i.length>0?Utils.safeWarn(`\u26A0\uFE0F \u062A\u062C\u0627\u0647\u0644 behaviorMonitoring \u0641\u0627\u0631\u063A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 ${i.length} \u0633\u062C\u0644 \u0645\u062D\u0644\u064A`):(AppState.appData.behaviorMonitoring=e.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${e.data.length} \u0633\u062C\u0644 \u0645\u0646 Google Sheets`))}if(t&&t.success&&Array.isArray(t.data)){const i=Array.isArray(AppState.appData.contractorBehaviorMonitoring)?AppState.appData.contractorBehaviorMonitoring:[];t.data.length===0&&i.length>0?Utils.safeWarn(`\u26A0\uFE0F \u062A\u062C\u0627\u0647\u0644 contractorBehaviorMonitoring \u0641\u0627\u0631\u063A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 ${i.length} \u0633\u062C\u0644 \u0645\u062D\u0644\u064A`):(AppState.appData.contractorBehaviorMonitoring=t.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${t.data.length} \u0633\u062C\u0644 \u062A\u0635\u0631\u0641\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646`))}(e&&e.success||t&&t.success)&&this.refreshCurrentTab(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(e){const t=e.message||e.toString()||"";Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643 \u0645\u0646 Google Sheets:",e),t.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||t.includes("timeout")?Notification.error({title:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",message:"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629.",duration:5e3,persistent:!1}):Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629.")}},renderTabSkeleton(e){return e==="overview"?this.renderOverviewTab(!0):e==="contractors"?this.renderContractorsTab(!0):this.renderLogTab(!0)},getBehaviors(){return!AppState?.appData?.behaviorMonitoring||!Array.isArray(AppState.appData.behaviorMonitoring)?[]:AppState.appData.behaviorMonitoring.map(e=>this.presentBehavior(e))},getRawBehaviorById(e){const t=AppState?.appData?.behaviorMonitoring;return Array.isArray(t)&&t.find(i=>i&&i.id===e)||null},normalizeBehaviorRecord(e){if(!e||typeof e!="object")return e;const t={...e},i=o=>{for(let n=0;n<o.length;n++){const r=o[n];if(!Object.prototype.hasOwnProperty.call(e,r))continue;const s=e[r];if(s!=null&&String(s).trim()!=="")return s}},a=(o,n)=>{const r=t[o];if(r!=null&&String(r).trim()!=="")return;const s=i(n);s!==void 0&&(t[o]=s)};return a("isoCode",["isoCode","ISO","IsoCode","\u0643\u0648\u062F ISO"]),a("employeeCode",["employeeCode","employee_number","EmployeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]),a("employeeNumber",["employeeNumber","employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]),a("employeeName",["employeeName","EmployeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"]),a("department",["department","Department","\u0627\u0644\u0642\u0633\u0645","employeeDepartment","Dept"]),a("job",["job","Job","position","Position","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A","jobTitle"]),a("factory",["factory","factoryId","Factory","FactoryId"]),a("factoryId",["factoryId","factory"]),a("factoryName",["factoryName","FactoryName","factory_name","\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0648\u0642\u0639","\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644","siteName","Site"]),a("subLocation",["subLocation","subLocationId","SubLocation"]),a("subLocationId",["subLocationId","subLocation"]),a("subLocationName",["subLocationName","sub_location_name","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A","\u0645\u0648\u0642\u0639 \u0641\u0631\u0639\u064A","SubLocationName","\u0627\u0644\u0645\u0643\u0627\u0646"]),a("behaviorType",["behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641","Type"]),a("rating",["rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645"]),a("description",["description","Description","\u0627\u0644\u0648\u0635\u0641","\u0645\u0644\u0627\u062D\u0638\u0627\u062A","Notes","details"]),a("correctiveAction",["correctiveAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A"]),a("correctiveActionDetails",["correctiveActionDetails","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621"]),a("date",["date","Date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","behaviorDate"]),a("photo",["photo","Photo","\u0635\u0648\u0631\u0629","image"]),t},enrichBehaviorRecord(e){if(!e||typeof e!="object")return e;const t={...e},i=String(t.employeeCode||t.employeeNumber||"").trim(),a=!String(t.department||"").trim(),o=!String(t.job||t.position||"").trim();if(i&&(a||o)){const h=(Array.isArray(AppState?.appData?.employees)?AppState.appData.employees:[]).find(c=>String(c.employeeNumber||"").trim()===i||String(c.sapId||"").trim()===i||String(c.id||"").trim()===i);h&&(a&&(t.department=h.department||h.dept||""),o&&(t.job=h.job||h.position||h.jobTitle||""))}const n=String(t.factoryId||t.factory||"").trim();n&&!String(t.factoryName||"").trim()&&(t.factoryName=this.resolveSiteName(n)),!String(t.factoryName||"").trim()&&String(t.factory||"").trim()&&(t.factoryName=this.resolveSiteName(t.factory));const r=String(t.subLocationId||t.subLocation||"").trim();return r&&!String(t.subLocationName||"").trim()&&(t.subLocationName=this.resolvePlaceName(r,n||t.factory)),t},presentBehavior(e){return!e||typeof e!="object"?e:this.enrichBehaviorRecord(this.normalizeBehaviorRecord(e))},editBehavior(e){const t=this.getRawBehaviorById(e);if(!t){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.showForm(this.presentBehavior(t))},formatBehaviorDateDisplay(e){const t=e&&typeof e=="object"&&!Array.isArray(e)?this.getBehaviorDate(e):e;if(!t)return"\u2014";try{let i;const a=String(t).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(a)){const o=a.split("-").map(Number);i=new Date(o[0],o[1]-1,o[2])}else i=new Date(t);return isNaN(i.getTime())?"\u2014":i.toLocaleDateString("ar-EG-u-ca-gregory",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}catch{return"\u2014"}},parseDateSafe(e){try{const t=e instanceof Date?e:new Date(e);return!t||Number.isNaN(t.getTime())?null:t}catch{return null}},getBehaviorDate(e){return e&&(e.date||e.Date||e.\u0627\u0644\u062A\u0627\u0631\u064A\u062E||e.behaviorDate||e.createdAt||e.updatedAt)||null},getBehaviorTypeBadgeClass(e){return e==="\u0625\u064A\u062C\u0627\u0628\u064A"?"badge-success":e==="\u0633\u0644\u0628\u064A"?"badge-danger":"badge-secondary"},getRatingBadgeClass(e){return e==="\u0645\u0645\u062A\u0627\u0632"?"badge-success":e==="\u062C\u064A\u062F"?"badge-primary":e==="\u0645\u0642\u0628\u0648\u0644"?"badge-warning":e==="\u0636\u0639\u064A\u0641"?"badge-danger":"badge-secondary"},matchesSearch(e,t){const i=(t||"").toString().trim().toLowerCase();return i?[e?.isoCode,e?.employeeName,e?.employeeCode,e?.employeeNumber,e?.department,e?.factoryName,e?.subLocationName,e?.behaviorType,e?.rating,e?.description].filter(Boolean).join(" ").toLowerCase().includes(i):!0},getFilteredBehaviors(){const e=this.getBehaviors(),t=this.state?.filters||{},i=(t.behaviorType||"").toString().trim(),a=(t.rating||"").toString().trim(),o=(t.search||"").toString(),n=t.dateFrom?this.parseDateSafe(t.dateFrom):null,r=t.dateTo?this.parseDateSafe(t.dateTo):null,s=e.filter(c=>{if(!this.matchesSearch(c,o)||i&&(c?.behaviorType||"")!==i||a&&(c?.rating||"")!==a)return!1;const d=this.parseDateSafe(this.getBehaviorDate(c));if(n&&(!d||d<n))return!1;if(r){const v=new Date(r);if(v.setHours(23,59,59,999),!d||d>v)return!1}return!0}),h=this.state?.sort||"date_desc";return s.sort((c,d)=>{const v=this.parseDateSafe(this.getBehaviorDate(c))?.getTime()||0,g=this.parseDateSafe(this.getBehaviorDate(d))?.getTime()||0;return h==="date_asc"?v-g:g-v}),s},refreshCurrentTab(){const e=this.state?.activeTab||"log";if(e==="overview"){const i=document.getElementById("behavior-overview-container");i&&(i.innerHTML=this.renderOverviewTab(!1)),this.bindCurrentTabEvents();return}if(e==="contractors"){const i=document.getElementById("behavior-content");i&&(i.innerHTML=this.renderContractorsTab(!1)),this.bindCurrentTabEvents();return}const t=document.getElementById("behavior-log-container");t&&(t.innerHTML=this.renderLogTab(!1)),this.bindCurrentTabEvents()},async switchTab(e,t={}){try{const i=e||"log",a=i==="form"?"log":i;this.state=this.state||{},this.state.activeTab=a,document.querySelectorAll("#behavior-monitoring-section .module-tab-btn").forEach(n=>{n.getAttribute("data-tab")===a?n.classList.add("active"):n.classList.remove("active")});const o=document.getElementById("behavior-content");if(!o)return;a==="overview"?o.innerHTML=this.renderOverviewTab(!1):a==="contractors"?o.innerHTML=this.renderContractorsTab(!1):o.innerHTML=this.renderLogTab(!1),this.bindCurrentTabEvents(),t?.initial&&a==="log"&&this.renderLogTable(),t?.initial&&a==="contractors"&&this.renderContractorLogTable()}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u062A\u0628\u0648\u064A\u0628 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A:",i)}},renderOverviewTab(e=!1){const t=this.getBehaviors(),i=this.getContractorBehaviors(),a=[...t,...i],o=a.length,n=t.length,r=i.length,s=a.filter(l=>l?.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A").length,h=a.filter(l=>l?.behaviorType==="\u0633\u0644\u0628\u064A").length,c=[...a].sort((l,u)=>{const T=this.parseDateSafe(this.getBehaviorDate(l))?.getTime()||0;return(this.parseDateSafe(this.getBehaviorDate(u))?.getTime()||0)-T}).slice(0,5),d=this.t("module.behaviorMonitoring.overview.title","\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629"),v=this.t("module.behaviorMonitoring.overview.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A"),g=this.t("module.behaviorMonitoring.overview.employees","\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),L=this.t("module.behaviorMonitoring.overview.contractorsExternal","\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 / \u0634\u0631\u0643\u0627\u062A \u062E\u0627\u0631\u062C\u064A\u0629"),p=this.t("module.behaviorMonitoring.overview.positive","\u062A\u0635\u0631\u0641\u0627\u062A \u0625\u064A\u062C\u0627\u0628\u064A\u0629"),b=this.t("module.behaviorMonitoring.overview.negative","\u062A\u0635\u0631\u0641\u0627\u062A \u0633\u0644\u0628\u064A\u0629"),y=this.t("module.behaviorMonitoring.overview.last5","\u0622\u062E\u0631 5 \u062A\u0635\u0631\u0641\u0627\u062A"),m=this.t("common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644..."),$=this.t("module.behaviorMonitoring.overview.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0631\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629");return`
            <div id="behavior-overview-container">
                <div class="content-card behavior-overview-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-chart-line ml-2"></i>${Utils.escapeHTML(d)}</h2>
                    </div>
                    <div class="card-body">
                        <div class="behavior-overview-stats-scroller mb-6">
                            <div class="behavior-overview-stats">
                                <div class="behavior-stat behavior-stat-total">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(v)}</p>
                                            <p class="behavior-stat-value">${e?"\u2014":o}</p>
                                        </div>
                                        <i class="fas fa-layer-group behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-employees">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(g)}</p>
                                            <p class="behavior-stat-value">${e?"\u2014":n}</p>
                                        </div>
                                        <i class="fas fa-user-tie behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-contractors">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(L)}</p>
                                            <p class="behavior-stat-value">${e?"\u2014":r}</p>
                                        </div>
                                        <i class="fas fa-users-cog behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-negative">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(b)}</p>
                                            <p class="behavior-stat-value">${e?"\u2014":h}</p>
                                        </div>
                                        <i class="fas fa-triangle-exclamation behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-positive">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(p)}</p>
                                            <p class="behavior-stat-value">${e?"\u2014":s}</p>
                                        </div>
                                        <i class="fas fa-circle-check behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="content-card behavior-mini-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-clock ml-2"></i>${Utils.escapeHTML(y)}</h3>
                            </div>
                            <div class="card-body">
                                ${e?`
                                    <div class="empty-state"><p class="text-gray-500">${Utils.escapeHTML(m)}</p></div>
                                `:c.length?`
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
                                                ${c.map(l=>`
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
                                `:`<div class="empty-state"><p class="text-gray-500">${Utils.escapeHTML($)}</p></div>`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},renderLogTab(e=!1){const t=this.state?.filters||{},i=o=>Utils.escapeHTML((o??"").toString()),a=this.renderEmployeeActiveFilterChips();return`
            <div id="behavior-log-container">
                <div class="content-card">
                    <div class="card-header flex flex-wrap items-center justify-between gap-2" style="padding: 12px 16px;">
                        <div class="flex items-center gap-2">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-list ml-2"></i>${this.t("module.behavior.employeeBehaviorsTitle","\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0628\u062D\u062B/\u0641\u0644\u062A\u0631\u0629)")}</h2>
                            <span class="badge badge-secondary" id="behavior-filter-count">${e?"\u2014":this.getFilteredBehaviors().length}</span>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button id="behavior-export-csv-btn" class="btn-success btn-sm">
                                <i class="fas fa-file-csv ml-1"></i>${this.t("common.exportCSV","\u062A\u0635\u062F\u064A\u0631 CSV")}
                            </button>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 12px 16px;">
                        <div class="behavior-filters-toolbar behavior-filters-inline-bar" role="search" aria-label="${this.t("module.behavior.employeeBehaviorsTitle","\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0628\u062D\u062B / \u0641\u0644\u062A\u0631\u0629)")}">
                            <div class="bf-row">
                                <div class="bf-field bf-field--search">
                                    <label for="behavior-filter-search" class="bf-label"><i class="fas fa-search"></i>${this.t("module.common.search","\u0627\u0644\u0628\u062D\u062B")}</label>
                                    <div class="bf-search-wrap">
                                        <input id="behavior-filter-search" type="text" class="bf-input" placeholder="${this.t("common.searchPlaceholder","ISO / \u0627\u0633\u0645 / \u0643\u0648\u062F / \u0648\u0635\u0641")}" value="${i(t.search)}" autocomplete="off">
                                        <i class="fas fa-search bf-search-icon" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="bf-field bf-field--select">
                                    <label for="behavior-filter-type" class="bf-label"><i class="fas fa-tags"></i>${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")}</label>
                                    <select id="behavior-filter-type" class="bf-input">
                                        <option value="">${this.t("common.allTypes","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                                        <option value="\u0625\u064A\u062C\u0627\u0628\u064A" ${t.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A"?"selected":""}>${this.t("module.behavior.positive","\u0625\u064A\u062C\u0627\u0628\u064A")}</option>
                                        <option value="\u0633\u0644\u0628\u064A" ${t.behaviorType==="\u0633\u0644\u0628\u064A"?"selected":""}>${this.t("module.behavior.negative","\u0633\u0644\u0628\u064A")}</option>
                                    </select>
                                </div>
                                <div class="bf-field bf-field--select">
                                    <label for="behavior-filter-rating" class="bf-label"><i class="fas fa-star"></i>${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")}</label>
                                    <select id="behavior-filter-rating" class="bf-input">
                                        <option value="">${this.t("common.allRatings","\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A")}</option>
                                        <option value="\u0645\u0645\u062A\u0627\u0632" ${t.rating==="\u0645\u0645\u062A\u0627\u0632"?"selected":""}>${this.t("module.behavior.excellent","\u0645\u0645\u062A\u0627\u0632")}</option>
                                        <option value="\u062C\u064A\u062F" ${t.rating==="\u062C\u064A\u062F"?"selected":""}>${this.t("module.behavior.good","\u062C\u064A\u062F")}</option>
                                        <option value="\u0645\u0642\u0628\u0648\u0644" ${t.rating==="\u0645\u0642\u0628\u0648\u0644"?"selected":""}>${this.t("module.behavior.acceptable","\u0645\u0642\u0628\u0648\u0644")}</option>
                                        <option value="\u0636\u0639\u064A\u0641" ${t.rating==="\u0636\u0639\u064A\u0641"?"selected":""}>${this.t("module.behavior.poor","\u0636\u0639\u064A\u0641")}</option>
                                    </select>
                                </div>
                                <div class="bf-field bf-field--date">
                                    <label for="behavior-filter-from" class="bf-label"><i class="fas fa-calendar-alt"></i>${this.t("common.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")}</label>
                                    <input id="behavior-filter-from" type="date" class="bf-input" value="${i(t.dateFrom)}">
                                </div>
                                <div class="bf-field bf-field--date">
                                    <label for="behavior-filter-to" class="bf-label"><i class="fas fa-calendar-check"></i>${this.t("common.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")}</label>
                                    <input id="behavior-filter-to" type="date" class="bf-input" value="${i(t.dateTo)}">
                                </div>
                                <div class="bf-field bf-field--sort">
                                    <label for="behavior-sort" class="bf-label"><i class="fas fa-sort-amount-down"></i>${this.t("common.sort","\u0627\u0644\u062A\u0631\u062A\u064A\u0628")}</label>
                                    <select id="behavior-sort" class="bf-input">
                                        <option value="date_desc" ${this.state?.sort==="date_desc"?"selected":""}>${this.t("common.newestFirst","\u0627\u0644\u0623\u062D\u062F\u062B \u0623\u0648\u0644\u0627\u064B")}</option>
                                        <option value="date_asc" ${this.state?.sort==="date_asc"?"selected":""}>${this.t("common.oldestFirst","\u0627\u0644\u0623\u0642\u062F\u0645 \u0623\u0648\u0644\u0627\u064B")}</option>
                                    </select>
                                </div>
                                <div class="bf-field bf-field--actions">
                                    <span class="bf-label" style="visibility:hidden;">.</span>
                                    <button type="button" id="behavior-clear-filters-btn" class="bf-reset-btn" title="${this.t("common.clearFilters","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631")}">
                                        <i class="fas fa-eraser"></i>${this.t("common.clearFilters","\u0645\u0633\u062D")}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="behavior-active-filter-chips" class="behavior-active-filter-chips">
                            ${a}
                        </div>
                        <div id="behavior-log-table-container">
                            ${e?`<div class="empty-state"><p class="text-gray-500">${this.t("common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p></div>`:this.renderLogTableHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `},renderEmployeeActiveFilterChips(){const e=this.state?.filters||{},t=[],i=(a,o)=>{const n=String(o||"").trim();n&&t.push(`<span class="behavior-filter-chip"><strong>${Utils.escapeHTML(a)}:</strong> ${Utils.escapeHTML(n)}</span>`)};return i(this.t("module.common.search","\u0627\u0644\u0628\u062D\u062B"),e.search),i("\u0627\u0644\u0646\u0648\u0639",e.behaviorType),i("\u0627\u0644\u062A\u0642\u064A\u064A\u0645",e.rating),i("\u0645\u0646",e.dateFrom),i("\u0625\u0644\u0649",e.dateTo),t.length?t.join(""):`<span class="behavior-filter-chip behavior-filter-chip-muted">${this.t("module.behavior.noActiveFilters","\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u0644\u0627\u062A\u0631 \u0645\u0641\u0639\u0644\u0629")}</span>`},renderLogTableHTML(){const e=this.getFilteredBehaviors();if(!e.length)return`<div class="empty-state"><p class="text-gray-500">${this.t("common.noMatchingResults","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629")}</p></div>`;const t=this.paginateItems(e,this.state.logPage||1);this.state.logPage=t.page;const i=t.items;return`
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
                        ${i.map(a=>`
                            <tr>
                                <td>${Utils.escapeHTML(a.isoCode||"")}</td>
                                <td>
                                    <div class="flex flex-col">
                                        <span class="font-semibold">${Utils.escapeHTML(a.employeeName||"")}</span>
                                        <span class="text-xs text-gray-500">${Utils.escapeHTML(a.employeeCode||a.employeeNumber||"")}</span>
                                    </div>
                                </td>
                                <td>${Utils.escapeHTML(a.factoryName||a.factory||"\u2014")}</td>
                                <td>${Utils.escapeHTML(a.subLocationName||a.subLocation||"\u2014")}</td>
                                <td><span class="badge ${this.getBehaviorTypeBadgeClass(a.behaviorType)}">${Utils.escapeHTML(a.behaviorType||"\u2014")}</span></td>
                                <td>${this.getBehaviorDate(a)?this.formatBehaviorDateDisplay(a):"\u2014"}</td>
                                <td><span class="badge ${this.getRatingBadgeClass(a.rating)}">${Utils.escapeHTML(a.rating||"\u2014")}</span></td>
                                <td class="text-center bhm-log-table-actions">
                                    <div class="flex items-center justify-center gap-2 flex-wrap">
                                        <button type="button" onclick="BehaviorMonitoring.viewBehavior(${JSON.stringify(String(a.id||""))})" class="btn-icon btn-icon-primary bhm-action-icon" title="${this.t("common.view","\u0639\u0631\u0636")}">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button type="button" onclick="BehaviorMonitoring.exportPDF(${JSON.stringify(String(a.id||""))})" class="btn-icon btn-icon-success bhm-action-icon" title="${this.t("common.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF")}">
                                            <i class="fas fa-file-pdf"></i>
                                        </button>
                                        <button type="button" onclick="BehaviorMonitoring.printReport(${JSON.stringify(String(a.id||""))})" class="btn-icon btn-icon-info bhm-action-icon" title="${this.t("common.print","\u0637\u0628\u0627\u0639\u0629")}">
                                            <i class="fas fa-print"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
            ${this.renderTablePaginationHTML("employee",t)}
        `},renderLogTable(){const e=document.getElementById("behavior-log-table-container");e&&(e.innerHTML=this.renderLogTableHTML());const t=document.getElementById("behavior-filter-count");t&&(t.textContent=String(this.getFilteredBehaviors().length));const i=document.getElementById("behavior-active-filter-chips");i&&(i.innerHTML=this.renderEmployeeActiveFilterChips())},clearFilters(){this.state.filters={search:"",behaviorType:"",rating:"",dateFrom:"",dateTo:""},this.state.sort="date_desc",this.state.logPage=1,this.refreshCurrentTab()},exportLogCSV(){const e=this.getFilteredBehaviors();if(!e.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const t=s=>{const h=(s??"").toString().replace(/\r?\n/g," ").trim();return h.includes('"')||h.includes(",")||h.includes(";")?`"${h.replace(/"/g,'""')}"`:h},a=[["ISO","EmployeeName","EmployeeCode","Department","Job","Factory","SubLocation","BehaviorType","Date","Rating","CorrectiveAction","CorrectiveActionDetails","Description"].join(","),...e.map(s=>[t(s.isoCode||""),t(s.employeeName||""),t(s.employeeCode||s.employeeNumber||""),t(s.department||""),t(s.job||s.position||""),t(s.factoryName||s.factory||""),t(s.subLocationName||s.subLocation||""),t(s.behaviorType||""),t(this.getBehaviorDate(s)?Utils.formatDateForInput(this.getBehaviorDate(s)):""),t(s.rating||""),t(s.correctiveAction||""),t(s.correctiveActionDetails||""),t(s.description||"")].join(","))].join(`
`),o=new Blob([a],{type:"text/csv;charset=utf-8"}),n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=`BehaviorMonitoring_Log_${new Date().toISOString().slice(0,10)}.csv`,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(n)},renderFormTab(e=!1){const t=`bhm-tab-${Date.now()}`;return`
            <div id="behavior-form-container">
                <div class="content-card behavior-form-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-pen-to-square ml-2"></i>${this.t("module.behavior.recordBehavior","\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641")}</h2>
                    </div>
                    <div class="card-body">
                        ${e?`<div class="empty-state"><p class="text-gray-500">${this.t("common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p></div>`:this.getBehaviorFormHTML(null,t,{inline:!0})}
                    </div>
                </div>
            </div>
        `},bindCurrentTabEvents(){this._eventListenersAbortController&&this._eventListenersAbortController.abort(),this._eventListenersAbortController=new AbortController;const e=this._eventListenersAbortController.signal,t=this.state?.activeTab||"log";if(t==="log"){const i=document.getElementById("behavior-filter-search"),a=document.getElementById("behavior-filter-type"),o=document.getElementById("behavior-filter-rating"),n=document.getElementById("behavior-filter-from"),r=document.getElementById("behavior-filter-to"),s=document.getElementById("behavior-sort"),h=document.getElementById("behavior-clear-filters-btn"),c=document.getElementById("behavior-export-csv-btn"),d=()=>{this.state.filters=this.state.filters||{},this.state.filters.search=(i?.value||"").toString(),this.state.filters.behaviorType=(a?.value||"").toString(),this.state.filters.rating=(o?.value||"").toString(),this.state.filters.dateFrom=(n?.value||"").toString(),this.state.filters.dateTo=(r?.value||"").toString(),this.state.sort=(s?.value||"date_desc").toString(),this.state.logPage=1,this.renderLogTable()};i?.addEventListener("input",d,{signal:e}),a?.addEventListener("change",d,{signal:e}),o?.addEventListener("change",d,{signal:e}),n?.addEventListener("change",d,{signal:e}),r?.addEventListener("change",d,{signal:e}),s?.addEventListener("change",d,{signal:e}),h?.addEventListener("click",()=>this.clearFilters(),{signal:e}),c?.addEventListener("click",()=>this.exportLogCSV(),{signal:e}),this.renderLogTable();return}if(t==="form"){const i=document.querySelector('#behavior-form-container form[data-behavior-form="true"]'),a=i?.getAttribute("data-form-uid");if(i&&a){this.bindBehaviorForm({form:i,uid:a,data:null,modal:null,signal:e});const o=document.getElementById("behavior-form-container");o&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(o,{onFetchFail:n=>{try{n.onerror=null,n.removeAttribute("src")}catch{}}})}return}if(t==="contractors"){const i=document.getElementById("bhmc-filter-search"),a=document.getElementById("bhmc-filter-type"),o=document.getElementById("bhmc-filter-rating"),n=document.getElementById("bhmc-filter-from"),r=document.getElementById("bhmc-filter-to"),s=document.getElementById("bhmc-sort"),h=document.getElementById("bhmc-clear-filters-btn"),c=document.getElementById("bhmc-export-csv-btn"),d=document.getElementById("behavior-add-contractor-btn"),v=()=>{this.state.contractorFilters=this.state.contractorFilters||{},this.state.contractorFilters.search=(i?.value||"").toString(),this.state.contractorFilters.behaviorType=(a?.value||"").toString(),this.state.contractorFilters.rating=(o?.value||"").toString(),this.state.contractorFilters.dateFrom=(n?.value||"").toString(),this.state.contractorFilters.dateTo=(r?.value||"").toString(),this.state.contractorSort=(s?.value||"date_desc").toString(),this.state.contractorLogPage=1,this.renderContractorLogTable()};i?.addEventListener("input",v,{signal:e}),a?.addEventListener("change",v,{signal:e}),o?.addEventListener("change",v,{signal:e}),n?.addEventListener("change",v,{signal:e}),r?.addEventListener("change",v,{signal:e}),s?.addEventListener("change",v,{signal:e}),h?.addEventListener("click",()=>this.clearContractorFilters(),{signal:e}),c?.addEventListener("click",()=>this.exportContractorLogCSV(),{signal:e}),d?.addEventListener("click",()=>this.showContractorForm(null),{signal:e}),this.renderContractorLogTable()}},setupEventListeners(){this._setupTimeoutId&&clearTimeout(this._setupTimeoutId),this._setupTimeoutId=setTimeout(()=>{const e=document.getElementById("behavior-add-btn");e&&e.addEventListener("click",()=>this.showForm(),{passive:!0});const t=document.getElementById("behavior-add-contractor-header-btn");t&&t.addEventListener("click",()=>this.showContractorForm(null),{passive:!0});const i=document.getElementById("behavior-refresh-btn");i&&i.addEventListener("click",()=>{this.loadBehaviorDataAsync(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},{passive:!0})},50)},getBehaviorFormHTML(e=null,t,i={}){const a={employeeCode:`${t}-employee-code`,employeeName:`${t}-employee-name`,dropdown:`${t}-employee-dropdown`,department:`${t}-department`,job:`${t}-job`,factory:`${t}-factory`,subLocation:`${t}-sublocation`,photoInput:`${t}-photo-input`,photoPreview:`${t}-photo-preview`,photoImg:`${t}-photo-img`,behaviorType:`${t}-type`,behaviorDate:`${t}-date`,behaviorRating:`${t}-rating`,correctiveAction:`${t}-corrective-action`,correctiveActionDetails:`${t}-corrective-action-details`,description:`${t}-description`,saveBtn:`${t}-save-btn`},o=e?.date?new Date(e.date).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=!!i.inline,r=this.getSiteOptions(),s=e?.factory||e?.factoryId||e?.siteId||"",h=e?.subLocation||e?.subLocationId||e?.location||"",c=r.find(m=>m.id===s)?.id||r.find(m=>m.name===s)?.id||s,d=this.getPlaceOptions(c),v=d.find(m=>m.id===h)?.id||d.find(m=>m.name===h)?.id||h,g=(e?.behaviorType||"")==="\u0633\u0644\u0628\u064A",L=this.processPhoto(e?.photo),p=L&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(L):{canonical:L||"",displaySrc:L||"",needsProxy:!1,proxyFileId:""},b=p.canonical?p.displaySrc:"",y=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(p):"";return`
            <div class="behavior-form-wrapper bhm-form ${n?"behavior-form-inline":"behavior-form-modal"}" data-behavior-type="${Utils.escapeHTML(e?.behaviorType||"")}">
                <form data-behavior-form="true" data-form-uid="${t}" class="bhm-form-inner">
                    <section class="bhm-section" aria-labelledby="${t}-sec-emp">
                        <div class="bhm-section-head" id="${t}-sec-emp">
                            <span class="bhm-section-icon" aria-hidden="true"><i class="fas fa-id-card"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t("module.behavior.form.employeeSection","\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641")}</h4>
                                <p class="bhm-section-hint">${this.t("module.behavior.form.employeeHint","\u0627\u0644\u0643\u0648\u062F \u0648\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0642\u0633\u0645 \u0648\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${a.employeeCode}" class="bhm-label">${this.t("module.behavior.form.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")} <span class="bhm-req">*</span></label>
                                    <input type="text" id="${a.employeeCode}" required class="form-input bhm-input"
                                        value="${Utils.escapeHTML(e?.employeeCode||e?.employeeNumber||"")}" placeholder="${this.t("module.behavior.form.employeeCodePh","\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${a.employeeName}" class="bhm-label">${this.t("module.behavior.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")} <span class="bhm-req">*</span></label>
                                    <div class="relative">
                                        <input type="text" id="${a.employeeName}" required class="form-input bhm-input"
                                            value="${Utils.escapeHTML(e?.employeeName||"")}" placeholder="${this.t("module.behavior.form.employeeNamePh","\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F")}" autocomplete="off">
                                        <div id="${a.dropdown}" class="hse-lookup-dropdown absolute z-50 hidden w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"></div>
                                    </div>
                                </div>
                                <div class="bhm-field">
                                    <label for="${a.department}" class="bhm-label">${this.t("module.behavior.form.department","\u0627\u0644\u0642\u0633\u0645")} <span class="bhm-req">*</span></label>
                                    <input type="text" id="${a.department}" required class="form-input bhm-input"
                                        value="${Utils.escapeHTML(e?.department||e?.employeeDepartment||"")}" placeholder="${this.t("module.behavior.form.autoFillPh","\u064A\u064F\u0639\u0628\u0651\u064E\u0623 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641")}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${a.job}" class="bhm-label">${this.t("module.behavior.form.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")} <span class="bhm-req">*</span></label>
                                    <input type="text" id="${a.job}" required class="form-input bhm-input"
                                        value="${Utils.escapeHTML(e?.job||e?.position||e?.employeeJob||"")}" placeholder="${this.t("module.behavior.form.autoFillPh","\u064A\u064F\u0639\u0628\u0651\u064E\u0623 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641")}">
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bhm-section" aria-labelledby="${t}-sec-act">
                        <div class="bhm-section-head" id="${t}-sec-act">
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
                                        <label for="${a.behaviorType}" class="bhm-label mb-0">${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")} <span class="bhm-req">*</span></label>
                                        <span class="badge ${this.getBehaviorTypeBadgeClass(e?.behaviorType)} bhm-type-chip" id="${t}-type-badge">${Utils.escapeHTML(e?.behaviorType||"\u2014")}</span>
                                    </div>
                                    <select id="${a.behaviorType}" required class="form-input bhm-input mt-2">
                                        <option value="">${this.t("module.behavior.selectType","\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639")}</option>
                                        <option value="\u0625\u064A\u062C\u0627\u0628\u064A" ${e?.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A"?"selected":""}>${this.t("module.behavior.positive","\u0625\u064A\u062C\u0627\u0628\u064A")}</option>
                                        <option value="\u0633\u0644\u0628\u064A" ${e?.behaviorType==="\u0633\u0644\u0628\u064A"?"selected":""}>${this.t("module.behavior.negative","\u0633\u0644\u0628\u064A")}</option>
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${a.behaviorDate}" class="bhm-label">${this.t("module.behavior.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")} <span class="bhm-req">*</span></label>
                                    <input type="date" id="${a.behaviorDate}" required class="form-input bhm-input" value="${o}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${a.behaviorRating}" class="bhm-label">${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")} <span class="bhm-req">*</span></label>
                                    <select id="${a.behaviorRating}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectRating","\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0642\u064A\u064A\u0645")}</option>
                                        <option value="\u0645\u0645\u062A\u0627\u0632" ${e?.rating==="\u0645\u0645\u062A\u0627\u0632"?"selected":""}>${this.t("module.behavior.excellent","\u0645\u0645\u062A\u0627\u0632")}</option>
                                        <option value="\u062C\u064A\u062F" ${e?.rating==="\u062C\u064A\u062F"?"selected":""}>${this.t("module.behavior.good","\u062C\u064A\u062F")}</option>
                                        <option value="\u0645\u0642\u0628\u0648\u0644" ${e?.rating==="\u0645\u0642\u0628\u0648\u0644"?"selected":""}>${this.t("module.behavior.acceptable","\u0645\u0642\u0628\u0648\u0644")}</option>
                                        <option value="\u0636\u0639\u064A\u0641" ${e?.rating==="\u0636\u0639\u064A\u0641"?"selected":""}>${this.t("module.behavior.poor","\u0636\u0639\u064A\u0641")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bhm-section" aria-labelledby="${t}-sec-loc">
                        <div class="bhm-section-head" id="${t}-sec-loc">
                            <span class="bhm-section-icon bhm-section-icon--teal" aria-hidden="true"><i class="fas fa-map-marked-alt"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t("module.behavior.form.locationSection","\u0627\u0644\u0645\u0648\u0642\u0639")}</h4>
                                <p class="bhm-section-hint">${this.t("module.behavior.form.locationHint","\u0627\u0644\u0645\u0635\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629")}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${a.factory}" class="bhm-label"><i class="fas fa-industry ml-1 opacity-70"></i> ${this.t("module.behavior.factory","\u0627\u0644\u0645\u0635\u0646\u0639")} <span class="bhm-req">*</span></label>
                                    <select id="${a.factory}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectFactory","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")}</option>
                                        ${r.map(m=>`
                                            <option value="${m.id}" ${c===m.id||s===m.name?"selected":""}>${Utils.escapeHTML(m.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${a.subLocation}" class="bhm-label"><i class="fas fa-map-marker-alt ml-1 opacity-70"></i> ${this.t("module.behavior.subLocation","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")} <span class="bhm-req">*</span></label>
                                    <select id="${a.subLocation}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectSubLocation","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</option>
                                        ${d.map(m=>`
                                            <option value="${m.id}" ${v===m.id||h===m.name?"selected":""}>${Utils.escapeHTML(m.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="${t}-negative-section" class="bhm-negative-panel" style="${g?"":"display:none;"}">
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
                                    <label for="${a.correctiveAction}" class="bhm-label">${this.t("module.behavior.form.correctiveAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A")} <span class="bhm-req">*</span></label>
                                    <select id="${a.correctiveAction}" class="form-input bhm-input" ${g?"required":""}>
                                        <option value="">${this.t("module.behavior.selectAction","\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621")}</option>
                                        ${this.NEGATIVE_ACTIONS.map(m=>`
                                            <option value="${Utils.escapeHTML(m)}" ${e?.correctiveAction===m?"selected":""}>${Utils.escapeHTML(m)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${a.correctiveActionDetails}" class="bhm-label">${this.t("module.behavior.form.extraDetails","\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629")} <span class="bhm-optional">(${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")})</span></label>
                                    <input type="text" id="${a.correctiveActionDetails}" class="form-input bhm-input"
                                        value="${Utils.escapeHTML(e?.correctiveActionDetails||"")}" placeholder="\u0645\u062B\u0627\u0644: \u062A\u062F\u0631\u064A\u0628 \u0639\u0644\u0649 SOP-01 / \u0625\u0646\u0630\u0627\u0631 \u0631\u0642\u0645\u2026">
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bhm-section bhm-section--media" aria-labelledby="${t}-sec-desc">
                        <div class="bhm-section-head" id="${t}-sec-desc">
                            <span class="bhm-section-icon bhm-section-icon--amber" aria-hidden="true"><i class="fas fa-align-right"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t("module.behavior.form.descSection","\u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A")}</h4>
                                <p class="bhm-section-hint">${this.t("module.behavior.form.descHint","\u0648\u0635\u0641 \u0627\u0644\u062A\u0635\u0631\u0641 \u0648\u0635\u0648\u0631\u0629 \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629")}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-media">
                                <div class="bhm-field bhm-upload-wrap">
                                    <label for="${a.photoInput}" class="bhm-label"><i class="fas fa-image ml-1 opacity-70"></i> ${this.t("module.behavior.form.photo","\u0635\u0648\u0631\u0629")} <span class="bhm-optional">(${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")})</span></label>
                                    <div class="bhm-file-slot">
                                        <input type="file" id="${a.photoInput}" accept="image/*" class="bhm-file-input">
                                        <span class="bhm-file-hint">${this.t("module.behavior.form.photoHint","PNG \u0623\u0648 JPG \u2014 \u062D\u062A\u0649 2 \u0645\u064A\u062C\u0627")}</span>
                                    </div>
                                    <div id="${a.photoPreview}" class="bhm-photo-preview mt-3 ${e?.photo?"":"hidden"}">
                                        <img src="${Utils.escapeHTML(b)}" alt="\u0645\u0639\u0627\u064A\u0646\u0629"${y} class="bhm-photo-thumb" id="${a.photoImg}">
                                        <button type="button" class="bhm-photo-clear" data-action="clear-photo">${this.t("module.behavior.form.clearPhoto","\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629")}</button>
                                    </div>
                                </div>
                                <div class="bhm-field bhm-field-grow">
                                    <label for="${a.description}" class="bhm-label">${this.t("module.behavior.form.description","\u0627\u0644\u0648\u0635\u0641")} <span class="bhm-req">*</span></label>
                                    <textarea id="${a.description}" required class="form-input bhm-input bhm-textarea" rows="5" placeholder="${this.t("module.behavior.form.descriptionPh","\u0648\u0635\u0641 \u0627\u0644\u062A\u0635\u0631\u0641 \u0648\u0627\u0644\u0638\u0631\u0648\u0641\u2026")}">${Utils.escapeHTML(e?.description||"")}</textarea>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div class="bhm-form-footer">
                        ${n?"":`<button type="button" class="btn-secondary bhm-btn-cancel" data-action="cancel-form">${this.t("common.cancel","\u0625\u0644\u063A\u0627\u0621")}</button>`}
                        <button type="button" id="${a.saveBtn}" class="btn-primary bhm-btn-save">
                            <i class="fas fa-save ml-2"></i>
                            ${this.t("common.save","\u062D\u0641\u0638")}
                        </button>
                    </div>
                </form>
            </div>
        `},bindBehaviorForm({form:e,uid:t,data:i,modal:a,signal:o}){if(typeof EmployeeHelper<"u")try{EmployeeHelper.setupAutocomplete(`${t}-employee-name`,l=>{if(l){const u=document.getElementById(`${t}-employee-code`),T=document.getElementById(`${t}-employee-name`),f=document.getElementById(`${t}-department`),S=document.getElementById(`${t}-job`);u&&(u.value=l.code||""),T&&(T.value=l.name||""),f&&(l.department||l.employeeDepartment)&&(f.value=l.department||l.employeeDepartment||""),S&&(l.job||l.position||l.title)&&(S.value=l.job||l.position||l.title||"")}}),EmployeeHelper.setupEmployeeCodeSearch(`${t}-employee-code`,`${t}-employee-name`)}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0645\u0648\u0638\u0641:",l)}const n=()=>{try{const l=(document.getElementById(`${t}-employee-code`)?.value||"").trim(),u=(document.getElementById(`${t}-employee-name`)?.value||"").trim(),f=(Array.isArray(AppState?.appData?.employees)?AppState.appData.employees:[]).find(B=>l&&(B.employeeNumber&&B.employeeNumber===l||B.sapId&&B.sapId===l)||u&&B.name===u);if(!f)return;const S=document.getElementById(`${t}-department`),C=document.getElementById(`${t}-job`);S&&!S.value&&(S.value=f.department||f.employeeDepartment||""),C&&!C.value&&(C.value=f.job||f.position||f.title||"")}catch{}};document.getElementById(`${t}-employee-code`)?.addEventListener("blur",n,{signal:o}),document.getElementById(`${t}-employee-name`)?.addEventListener("blur",n,{signal:o});const r=document.getElementById(`${t}-photo-input`),s=document.getElementById(`${t}-photo-preview`),h=document.getElementById(`${t}-photo-img`);r&&s&&h&&r.addEventListener("change",l=>{const u=l.target.files?.[0];if(!u)return;if(u.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),r.value="";return}const T=new FileReader;T.onload=f=>{h.src=f.target.result,s.classList.remove("hidden")},T.readAsDataURL(u)},{signal:o}),e.querySelector('[data-action="clear-photo"]')?.addEventListener("click",()=>{const l=document.getElementById(`${t}-photo-input`),u=document.getElementById(`${t}-photo-preview`);l&&(l.value=""),u&&u.classList.add("hidden")},{signal:o});const c=document.getElementById(`${t}-type`),d=document.getElementById(`${t}-type-badge`),v=e.closest(".behavior-form-wrapper")||e.parentElement,g=document.getElementById(`${t}-negative-section`),L=document.getElementById(`${t}-corrective-action`),p=l=>{v&&v.setAttribute("data-behavior-type",l||""),d&&(d.className=`badge ${this.getBehaviorTypeBadgeClass(l)}`,d.textContent=l||"\u2014");const u=a?.querySelector?.(".behavior-modal");u&&u.setAttribute("data-behavior-type",l||"");const T=(l||"")==="\u0633\u0644\u0628\u064A";g&&(g.style.display=T?"":"none"),L&&(T?L.setAttribute("required","required"):L.removeAttribute("required"))};p(c?.value||i?.behaviorType||""),c?.addEventListener("change",()=>p(c.value),{signal:o});const b=document.getElementById(`${t}-factory`),y=document.getElementById(`${t}-sublocation`),m=()=>{if(!b||!y)return;const l=b.value,u=this.getPlaceOptions(l),T=y.value;y.innerHTML=`
                <option value="">${this.t("module.behavior.selectSubLocation","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</option>
                ${u.map(f=>`<option value="${f.id}">${Utils.escapeHTML(f.name)}</option>`).join("")}
            `,T&&u.some(f=>f.id===T)&&(y.value=T)};b?.addEventListener("change",m,{signal:o}),e.querySelector('[data-action="cancel-form"]')?.addEventListener("click",()=>a?.remove(),{signal:o}),document.getElementById(`${t}-save-btn`)?.addEventListener("click",()=>this.handleSubmit({uid:t,form:e,editId:i?.id||null,modal:a}),{signal:o})},async showForm(e=null){if(typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{await Permissions.ensureFormSettingsState()}catch{}const t=document.createElement("div");t.className="modal-overlay";const i=`bhm-modal-${Date.now()}`;t.innerHTML=`
            <div class="modal-content behavior-modal bhm-registration-modal" data-behavior-type="${Utils.escapeHTML(e?.behaviorType||"")}">
                <div class="bhm-modal-hero">
                    <div class="bhm-modal-hero-text">
                        <p class="bhm-modal-kicker"><i class="fas fa-user-check ml-2"></i>\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A</p>
                        <h2 class="bhm-modal-title">${e?this.t("module.behavior.editBehavior","\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641"):this.t("module.behavior.addEmployee","\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641 \u0645\u0648\u0638\u0641")}</h2>
                        <p class="bhm-modal-sub">${e?"\u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u062B\u0645 \u0627\u062D\u0641\u0638.":"\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u062B\u0645 \u0648\u0635\u0641 \u0627\u0644\u062A\u0635\u0631\u0641."}</p>
                    </div>
                    <button type="button" class="bhm-modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body bhm-modal-body">
                    ${this.getBehaviorFormHTML(e,i,{inline:!1})}
                </div>
            </div>
        `,document.body.appendChild(t),this._modalAbortController&&this._modalAbortController.abort(),this._modalAbortController=new AbortController;const a=this._modalAbortController.signal,o=t.querySelector('form[data-behavior-form="true"]');o&&this.bindBehaviorForm({form:o,uid:i,data:e,modal:t,signal:a}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(t,{onFetchFail:n=>{try{n.onerror=null,n.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22150%22/%3E%3Ctext fill=%22%23999%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E\u0645\u0639\u0627\u064A\u0646\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),t.addEventListener("click",n=>{n.target===t&&t.remove()},{signal:a})},async convertImageToBase64(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=i,a.readAsDataURL(e)})},async handleSubmit({uid:e,form:t,editId:i=null,modal:a}){let o=i&&this.getBehaviors().find(f=>f.id===i)?.photo||"";const n=document.getElementById(`${e}-photo-input`);if(n&&n.files.length>0){const f=n.files[0];if(f.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}o=await this.convertImageToBase64(f)}const r=(document.getElementById(`${e}-employee-code`)?.value||"").trim(),s=(document.getElementById(`${e}-employee-name`)?.value||"").trim(),c=(Array.isArray(AppState?.appData?.employees)?AppState.appData.employees:[]).find(f=>f.employeeNumber&&f.employeeNumber===r||f.sapId&&f.sapId===r||f.name===s),d=document.getElementById(`${e}-type`),v=document.getElementById(`${e}-date`),g=document.getElementById(`${e}-rating`),L=document.getElementById(`${e}-description`),p=document.getElementById(`${e}-department`),b=document.getElementById(`${e}-job`),y=document.getElementById(`${e}-factory`),m=document.getElementById(`${e}-sublocation`),$=document.getElementById(`${e}-corrective-action`),l=document.getElementById(`${e}-corrective-action-details`);if(!d||!v||!g||!L||!p||!b||!y||!m){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const u=(d.value||"")==="\u0633\u0644\u0628\u064A";if(u&&(!$||!$.value)){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0644\u0644\u062A\u0635\u0631\u0641 \u0627\u0644\u0633\u0644\u0628\u064A");return}const T={id:i||Utils.generateId("BEHAV"),isoCode:generateISOCode("BEH",AppState.appData.behaviorMonitoring),employeeId:c?.id||"",employeeCode:r,employeeNumber:r,employeeName:s,department:(p.value||"").trim(),job:(b.value||"").trim(),factory:(y.value||"").trim(),factoryId:y.value?String(y.value).trim():null,factoryName:this.resolveSiteName(y.value),subLocation:(m.value||"").trim(),subLocationId:m.value?String(m.value).trim():null,subLocationName:this.resolvePlaceName(m.value,y.value),photo:o,behaviorType:d.value,date:new Date(v.value).toISOString(),rating:g.value,correctiveAction:u&&$?.value||"",correctiveActionDetails:u?(l?.value||"").trim():"",description:L.value.trim(),createdAt:i?this.getBehaviors().find(f=>f.id===i)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};Loading.show();try{if(i){const f=AppState.appData.behaviorMonitoring.findIndex(S=>S.id===i);f!==-1&&(AppState.appData.behaviorMonitoring[f]=T),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u0641 \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.behaviorMonitoring.push(T),Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("BehaviorMonitoring",AppState.appData.behaviorMonitoring),Loading.hide(),a&&a.remove(),this.refreshCurrentTab()}catch(f){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+f.message)}},async viewBehavior(e){const t=this.getRawBehaviorById(e);if(!t){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.presentBehavior(t),a=c=>Utils.escapeHTML((c??"").toString()),o=c=>{const d=(c??"").toString().trim();return d?a(d):'<span class="bhm-detail-empty">\u2014</span>'},n=(i.description||"").toString().trim(),r=n?`<div class="bhm-detail-value bhm-detail-desc">${a(n)}</div>`:'<div class="bhm-detail-empty-block"><i class="fas fa-align-right ml-2"></i>\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641 \u0645\u0633\u062C\u0644 \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u0641.</div>',s=this.getBehaviorDate(i)?this.formatBehaviorDateDisplay(i):"\u2014",h=document.createElement("div");h.className="modal-overlay bhm-detail-overlay",h.innerHTML=`
            <div class="modal-content behavior-modal bhm-detail-modal" style="max-width: 820px;">
                <div class="bhm-detail-hero">
                    <div class="bhm-detail-hero-text">
                        <p class="bhm-detail-kicker"><i class="fas fa-clipboard-list ml-2"></i>\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A</p>
                        <h2 class="bhm-detail-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641</h2>
                        <p class="bhm-detail-sub">${a(i.isoCode||"\u2014")} <span class="bhm-detail-sub-sep">\xB7</span> ${a(i.employeeName||"")}</p>
                    </div>
                    <button type="button" class="bhm-detail-close" onclick="this.closest('.modal-overlay').remove()" aria-label="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body bhm-detail-body">
                    <div class="bhm-detail-grid">
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0643\u0648\u062F ISO</span>
                            <div class="bhm-detail-value">${o(i.isoCode)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</span>
                            <div class="bhm-detail-value">${o(i.employeeCode||i.employeeNumber)}</div>
                        </div>
                        <div class="bhm-detail-field bhm-detail-field-span2">
                            <span class="bhm-detail-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</span>
                            <div class="bhm-detail-value bhm-detail-value-strong">${o(i.employeeName)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0642\u0633\u0645</span>
                            <div class="bhm-detail-value">${o(i.department||i.employeeDepartment)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</span>
                            <div class="bhm-detail-value">${o(i.job||i.position)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639</span>
                            <div class="bhm-detail-value">${o(i.factoryName||i.factory)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</span>
                            <div class="bhm-detail-value">${o(i.subLocationName||i.subLocation)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641</span>
                            <div class="bhm-detail-value">
                                <span class="badge ${this.getBehaviorTypeBadgeClass(i.behaviorType)}">${a(i.behaviorType||"\u2014")}</span>
                            </div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</span>
                            <div class="bhm-detail-value">${s==="\u2014"?'<span class="bhm-detail-empty">\u2014</span>':a(s)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">\u0627\u0644\u062A\u0642\u064A\u064A\u0645</span>
                            <div class="bhm-detail-value">
                                <span class="badge ${this.getRatingBadgeClass(i.rating)}">${a(i.rating||"\u2014")}</span>
                            </div>
                        </div>
                        <div class="bhm-detail-field bhm-detail-field-span2">
                            <span class="bhm-detail-label">\u0627\u0644\u0648\u0635\u0641</span>
                            ${r}
                        </div>
                        ${i.behaviorType==="\u0633\u0644\u0628\u064A"&&(i.correctiveAction||i.correctiveActionDetails)?`
                            <div class="bhm-detail-field bhm-detail-field-span2 bhm-detail-corrective">
                                <span class="bhm-detail-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</span>
                                <div class="bhm-detail-value">
                                    <span class="badge badge-danger">${a(i.correctiveAction||"\u2014")}</span>
                                    ${i.correctiveActionDetails?`<div class="bhm-detail-corrective-details">${a(i.correctiveActionDetails)}</div>`:""}
                                </div>
                            </div>
                        `:""}
                        ${(()=>{const c=this.processPhoto(i.photo);if(!c)return"";const d=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(c):{canonical:c,displaySrc:c,needsProxy:!1,proxyFileId:""},v=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(d):"";return`
                            <div class="bhm-detail-field bhm-detail-field-span2">
                                <span class="bhm-detail-label">\u0627\u0644\u0635\u0648\u0631\u0629</span>
                                <div class="bhm-detail-photo-wrap">
                                    <img src="${Utils.escapeHTML(d.displaySrc)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0635\u0631\u0641"${v} class="bhm-detail-photo"
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
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.printReport(${JSON.stringify(String(i.id||""))});">
                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.exportPDF(${JSON.stringify(String(i.id||""))});">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(h),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(h,{onFetchFail:c=>{try{c.onerror=null,c.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),h.addEventListener("click",c=>{c.target===h&&h.remove()})},async exportPDF(e){const t=this.getRawBehaviorById(e);if(!t){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.presentBehavior(t);try{Loading.show();const a=i.isoCode||`BEH-${i.id?.substring(0,8)||"UNKNOWN"}`,o="\u062A\u0642\u0631\u064A\u0631 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062A\u0635\u0631\u0641\u0627\u062A",n=this.getBehaviorDate(i)?this.formatBehaviorDateDisplay(i):"\u2014",r=`
                <table>
                    <tr><th>\u0643\u0648\u062F ISO</th><td>${Utils.escapeHTML(i.isoCode||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><td>${Utils.escapeHTML(i.employeeCode||i.employeeNumber||"")}</td></tr>
                    <tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th><td>${Utils.escapeHTML(i.employeeName||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0642\u0633\u0645</th><td>${Utils.escapeHTML(i.department||i.employeeDepartment||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th><td>${Utils.escapeHTML(i.job||i.position||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0635\u0646\u0639</th><td>${Utils.escapeHTML(i.factoryName||i.factory||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th><td>${Utils.escapeHTML(i.subLocationName||i.subLocation||"")}</td></tr>
                    <tr><th>\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641</th><td>${Utils.escapeHTML(i.behaviorType||"")}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><td>${Utils.escapeHTML(n)}</td></tr>
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
            `,s=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(a,o,r,!1,!0,{version:"1.0"},i.createdAt,i.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0633\u0644\u0648\u0643</title></head><body>${r}</body></html>`,h=new Blob([s],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(h),d=window.open(c,"_blank");d?d.onload=()=>{setTimeout(()=>{d.print(),setTimeout(()=>{URL.revokeObjectURL(c)},1e3),Loading.hide()},500)}:(URL.revokeObjectURL(c),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629"))}catch(a){Loading.hide(),typeof url<"u"&&URL.revokeObjectURL(url),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+a.message)}},async printReport(e){await this.exportPDF(e)},getContractorBehaviors(){return!AppState?.appData?.contractorBehaviorMonitoring||!Array.isArray(AppState.appData.contractorBehaviorMonitoring)?[]:AppState.appData.contractorBehaviorMonitoring.map(e=>this.presentContractorBehavior(e))},getRawContractorBehaviorById(e){const t=AppState?.appData?.contractorBehaviorMonitoring;return Array.isArray(t)&&t.find(i=>i&&i.id===e)||null},normalizeContractorBehaviorRecord(e){if(!e||typeof e!="object")return e;const t={...e},i=o=>{for(let n=0;n<o.length;n++){const r=o[n];if(!Object.prototype.hasOwnProperty.call(e,r))continue;const s=e[r];if(s!=null&&String(s).trim()!=="")return s}},a=(o,n)=>{const r=t[o];if(r!=null&&String(r).trim()!=="")return;const s=i(n);s!==void 0&&(t[o]=s)};return a("isoCode",["isoCode","ISO","IsoCode","\u0643\u0648\u062F ISO"]),a("contractorId",["contractorId","ContractorId","\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]),a("contractorName",["contractorName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","ContractorName"]),a("contractorWorker",["contractorWorker","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","ContractorWorker"]),a("department",["department","\u0627\u0644\u0642\u0633\u0645","Dept"]),a("job",["job","position","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","jobTitle"]),a("factory",["factory","factoryId","Factory"]),a("factoryId",["factoryId","factory"]),a("factoryName",["factoryName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0635\u0646\u0639","siteName"]),a("subLocation",["subLocation","subLocationId"]),a("subLocationId",["subLocationId","subLocation"]),a("subLocationName",["subLocationName","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A","SubLocationName"]),a("behaviorType",["behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641","Type"]),a("rating",["rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645"]),a("description",["description","\u0627\u0644\u0648\u0635\u0641","Notes"]),a("correctiveAction",["correctiveAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A"]),a("correctiveActionDetails",["correctiveActionDetails","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621"]),a("date",["date","Date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","behaviorDate"]),a("photo",["photo","\u0635\u0648\u0631\u0629","Photo"]),t},enrichContractorBehaviorRecord(e){if(!e||typeof e!="object")return e;const t={...e},i=String(t.factoryId||t.factory||"").trim();i&&!String(t.factoryName||"").trim()&&(t.factoryName=this.resolveSiteName(i)),!String(t.factoryName||"").trim()&&String(t.factory||"").trim()&&(t.factoryName=this.resolveSiteName(t.factory));const a=String(t.subLocationId||t.subLocation||"").trim();return a&&!String(t.subLocationName||"").trim()&&(t.subLocationName=this.resolvePlaceName(a,i||t.factory)),t},presentContractorBehavior(e){return!e||typeof e!="object"?e:this.enrichContractorBehaviorRecord(this.normalizeContractorBehaviorRecord(e))},matchesContractorSearch(e,t){const i=(t||"").toString().trim().toLowerCase();return i?[e?.isoCode,e?.contractorName,e?.contractorWorker,e?.department,e?.factoryName,e?.subLocationName,e?.behaviorType,e?.rating,e?.description].filter(Boolean).join(" ").toLowerCase().includes(i):!0},getFilteredContractorBehaviors(){const e=this.getContractorBehaviors(),t=this.state?.contractorFilters||{},i=(t.behaviorType||"").toString().trim(),a=(t.rating||"").toString().trim(),o=(t.search||"").toString(),n=t.dateFrom?this.parseDateSafe(t.dateFrom):null,r=t.dateTo?this.parseDateSafe(t.dateTo):null,s=e.filter(c=>{if(!this.matchesContractorSearch(c,o)||i&&(c?.behaviorType||"")!==i||a&&(c?.rating||"")!==a)return!1;const d=this.parseDateSafe(this.getBehaviorDate(c));if(n&&(!d||d<n))return!1;if(r){const v=new Date(r);if(v.setHours(23,59,59,999),!d||d>v)return!1}return!0}),h=this.state?.contractorSort||"date_desc";return s.sort((c,d)=>{const v=this.parseDateSafe(this.getBehaviorDate(c))?.getTime()||0,g=this.parseDateSafe(this.getBehaviorDate(d))?.getTime()||0;return h==="date_asc"?v-g:g-v}),s},clearContractorFilters(){this.state.contractorFilters={search:"",behaviorType:"",rating:"",dateFrom:"",dateTo:""},this.state.contractorSort="date_desc",this.state.contractorLogPage=1,this.refreshCurrentTab()},renderContractorsTab(e=!1){const t=this.state?.contractorFilters||{},i=o=>Utils.escapeHTML((o??"").toString()),a=e?"\u2014":String(this.getFilteredContractorBehaviors().length);return`
            <div id="behavior-contractors-container">
                <div class="content-card">
                    <div class="card-header flex flex-wrap items-center justify-between gap-2" style="padding: 12px 16px;">
                        <div class="flex items-center gap-2">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-users-cog ml-2"></i>${this.t("module.behavior.contractorBehaviorsTitle","\u0633\u062C\u0644 \u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}</h2>
                            <span class="badge badge-secondary" id="bhmc-filter-count">${a}</span>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button type="button" id="behavior-add-contractor-btn" class="btn-primary btn-sm">
                                <i class="fas fa-plus ml-1"></i>${this.t("module.behavior.addContractor","\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641 \u0645\u0642\u0627\u0648\u0644")}
                            </button>
                            <button id="bhmc-export-csv-btn" class="btn-success btn-sm">
                                <i class="fas fa-file-csv ml-1"></i>${this.t("common.exportCSV","\u062A\u0635\u062F\u064A\u0631 CSV")}
                            </button>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 12px 16px;">
                        <div class="behavior-filters-toolbar behavior-contractors-filters-inline-bar" role="search" aria-label="${this.t("module.behavior.contractorBehaviorsTitle","\u0633\u062C\u0644 \u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 (\u0628\u062D\u062B / \u0641\u0644\u062A\u0631\u0629)")}">
                            <div class="bf-row">
                                <div class="bf-field bf-field--search">
                                    <label for="bhmc-filter-search" class="bf-label"><i class="fas fa-search"></i>${this.t("module.common.search","\u0627\u0644\u0628\u062D\u062B")}</label>
                                    <div class="bf-search-wrap">
                                        <input id="bhmc-filter-search" type="text" class="bf-input" placeholder="${this.t("common.searchPlaceholder","ISO / \u0645\u0642\u0627\u0648\u0644 / \u0639\u0627\u0645\u0644 / \u0648\u0635\u0641")}" value="${i(t.search)}" autocomplete="off">
                                        <i class="fas fa-search bf-search-icon" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="bf-field bf-field--select">
                                    <label for="bhmc-filter-type" class="bf-label"><i class="fas fa-tags"></i>${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")}</label>
                                    <select id="bhmc-filter-type" class="bf-input">
                                        <option value="">${this.t("common.allTypes","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                                        <option value="\u0625\u064A\u062C\u0627\u0628\u064A" ${t.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A"?"selected":""}>${this.t("module.behavior.positive","\u0625\u064A\u062C\u0627\u0628\u064A")}</option>
                                        <option value="\u0633\u0644\u0628\u064A" ${t.behaviorType==="\u0633\u0644\u0628\u064A"?"selected":""}>${this.t("module.behavior.negative","\u0633\u0644\u0628\u064A")}</option>
                                    </select>
                                </div>
                                <div class="bf-field bf-field--select">
                                    <label for="bhmc-filter-rating" class="bf-label"><i class="fas fa-star"></i>${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")}</label>
                                    <select id="bhmc-filter-rating" class="bf-input">
                                        <option value="">${this.t("common.allRatings","\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A")}</option>
                                        <option value="\u0645\u0645\u062A\u0627\u0632" ${t.rating==="\u0645\u0645\u062A\u0627\u0632"?"selected":""}>${this.t("module.behavior.excellent","\u0645\u0645\u062A\u0627\u0632")}</option>
                                        <option value="\u062C\u064A\u062F" ${t.rating==="\u062C\u064A\u062F"?"selected":""}>${this.t("module.behavior.good","\u062C\u064A\u062F")}</option>
                                        <option value="\u0645\u0642\u0628\u0648\u0644" ${t.rating==="\u0645\u0642\u0628\u0648\u0644"?"selected":""}>${this.t("module.behavior.acceptable","\u0645\u0642\u0628\u0648\u0644")}</option>
                                        <option value="\u0636\u0639\u064A\u0641" ${t.rating==="\u0636\u0639\u064A\u0641"?"selected":""}>${this.t("module.behavior.poor","\u0636\u0639\u064A\u0641")}</option>
                                    </select>
                                </div>
                                <div class="bf-field bf-field--date">
                                    <label for="bhmc-filter-from" class="bf-label"><i class="fas fa-calendar-alt"></i>${this.t("common.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")}</label>
                                    <input id="bhmc-filter-from" type="date" class="bf-input" value="${i(t.dateFrom)}">
                                </div>
                                <div class="bf-field bf-field--date">
                                    <label for="bhmc-filter-to" class="bf-label"><i class="fas fa-calendar-check"></i>${this.t("common.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")}</label>
                                    <input id="bhmc-filter-to" type="date" class="bf-input" value="${i(t.dateTo)}">
                                </div>
                                <div class="bf-field bf-field--sort">
                                    <label for="bhmc-sort" class="bf-label"><i class="fas fa-sort-amount-down"></i>${this.t("common.sort","\u0627\u0644\u062A\u0631\u062A\u064A\u0628")}</label>
                                    <select id="bhmc-sort" class="bf-input">
                                        <option value="date_desc" ${this.state?.contractorSort==="date_desc"?"selected":""}>${this.t("common.newestFirst","\u0627\u0644\u0623\u062D\u062F\u062B \u0623\u0648\u0644\u0627\u064B")}</option>
                                        <option value="date_asc" ${this.state?.contractorSort==="date_asc"?"selected":""}>${this.t("common.oldestFirst","\u0627\u0644\u0623\u0642\u062F\u0645 \u0623\u0648\u0644\u0627\u064B")}</option>
                                    </select>
                                </div>
                                <div class="bf-field bf-field--actions">
                                    <span class="bf-label" style="visibility:hidden;">.</span>
                                    <button type="button" id="bhmc-clear-filters-btn" class="bf-reset-btn" title="${this.t("common.clearFilters","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631")}">
                                        <i class="fas fa-eraser"></i>${this.t("common.clearFilters","\u0645\u0633\u062D")}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="bhmc-log-table-container">
                            ${e?`<div class="empty-state"><p class="text-gray-500">${this.t("common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p></div>`:this.renderContractorLogTableHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `},renderContractorLogTableHTML(){const e=this.getFilteredContractorBehaviors();if(!e.length)return`<div class="empty-state"><p class="text-gray-500">${this.t("common.noMatchingResults","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629")}</p></div>`;const t=this.paginateItems(e,this.state.contractorLogPage||1);this.state.contractorLogPage=t.page;const i=t.items;return`
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
                        ${i.map(a=>`
                            <tr>
                                <td>${Utils.escapeHTML(a.isoCode||"")}</td>
                                <td><span class="font-semibold">${Utils.escapeHTML(a.contractorName||"")}</span></td>
                                <td>${Utils.escapeHTML(a.contractorWorker||"\u2014")}</td>
                                <td>${Utils.escapeHTML(a.factoryName||a.factory||"\u2014")}</td>
                                <td>${Utils.escapeHTML(a.subLocationName||a.subLocation||"\u2014")}</td>
                                <td><span class="badge ${this.getBehaviorTypeBadgeClass(a.behaviorType)}">${Utils.escapeHTML(a.behaviorType||"\u2014")}</span></td>
                                <td>${this.getBehaviorDate(a)?this.formatBehaviorDateDisplay(a):"\u2014"}</td>
                                <td><span class="badge ${this.getRatingBadgeClass(a.rating)}">${Utils.escapeHTML(a.rating||"\u2014")}</span></td>
                                <td class="text-center">
                                    <div class="flex items-center justify-center gap-2 flex-wrap">
                                        <button type="button" onclick="BehaviorMonitoring.viewContractorBehavior(${JSON.stringify(String(a.id||""))})" class="btn-icon btn-icon-primary" title="${this.t("common.view","\u0639\u0631\u0636")}"><i class="fas fa-eye"></i></button>
                                        <button type="button" onclick="BehaviorMonitoring.editContractorBehavior(${JSON.stringify(String(a.id||""))})" class="btn-icon btn-icon-warning" title="${this.t("common.edit","\u062A\u0639\u062F\u064A\u0644")}"><i class="fas fa-edit"></i></button>
                                        <button type="button" onclick="BehaviorMonitoring.exportContractorPDF(${JSON.stringify(String(a.id||""))})" class="btn-icon btn-icon-success" title="${this.t("common.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF")}"><i class="fas fa-file-pdf"></i></button>
                                        <button type="button" onclick="BehaviorMonitoring.printContractorReport(${JSON.stringify(String(a.id||""))})" class="btn-icon btn-icon-info" title="${this.t("common.print","\u0637\u0628\u0627\u0639\u0629")}"><i class="fas fa-print"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
            ${this.renderTablePaginationHTML("contractor",t)}
        `},renderContractorLogTable(){const e=document.getElementById("bhmc-log-table-container");e&&(e.innerHTML=this.renderContractorLogTableHTML());const t=document.getElementById("bhmc-filter-count");t&&(t.textContent=String(this.getFilteredContractorBehaviors().length))},exportContractorLogCSV(){const e=this.getFilteredContractorBehaviors();if(!e.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const t=s=>{const h=(s??"").toString().replace(/\r?\n/g," ").trim();return h.includes('"')||h.includes(",")||h.includes(";")?`"${h.replace(/"/g,'""')}"`:h},a=[["ISO","ContractorName","ContractorWorker","Department","Job","Factory","SubLocation","BehaviorType","Date","Rating","CorrectiveAction","CorrectiveActionDetails","Description"].join(","),...e.map(s=>[t(s.isoCode||""),t(s.contractorName||""),t(s.contractorWorker||""),t(s.department||""),t(s.job||s.position||""),t(s.factoryName||s.factory||""),t(s.subLocationName||s.subLocation||""),t(s.behaviorType||""),t(this.getBehaviorDate(s)?Utils.formatDateForInput(this.getBehaviorDate(s)):""),t(s.rating||""),t(s.correctiveAction||""),t(s.correctiveActionDetails||""),t(s.description||"")].join(","))].join(`
`),o=new Blob([a],{type:"text/csv;charset=utf-8"}),n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=`ContractorBehaviorMonitoring_${new Date().toISOString().slice(0,10)}.csv`,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(n)},getContractorBehaviorFormHTML(e,t){const i=e?.date?new Date(e.date).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],a=this.getSiteOptions(),o=e?.factory||e?.factoryId||"",n=e?.subLocation||e?.subLocationId||"",r=a.find(b=>b.id===o)?.id||a.find(b=>b.name===o)?.id||o,s=this.getPlaceOptions(r),h=s.find(b=>b.id===n)?.id||s.find(b=>b.name===n)?.id||n,c=(e?.behaviorType||"")==="\u0633\u0644\u0628\u064A",d=this.processPhoto(e?.photo),v=d&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(d):{canonical:d||"",displaySrc:d||"",needsProxy:!1,proxyFileId:""},g=v.canonical?v.displaySrc:"",L=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(v):"",p={contractorSelect:`${t}-contractor-select`,contractorWorker:`${t}-contractor-worker`,department:`${t}-cb-department`,job:`${t}-cb-job`,factory:`${t}-cb-factory`,subLocation:`${t}-cb-sublocation`,behaviorType:`${t}-cb-type`,behaviorDate:`${t}-cb-date`,behaviorRating:`${t}-cb-rating`,correctiveAction:`${t}-cb-corrective`,correctiveActionDetails:`${t}-cb-corrective-details`,description:`${t}-cb-description`,photoInput:`${t}-cb-photo-input`,photoPreview:`${t}-cb-photo-preview`,photoImg:`${t}-cb-photo-img`,saveBtn:`${t}-cb-save-btn`,typeBadge:`${t}-cb-type-badge`,negativeSection:`${t}-cb-negative-section`};return`
            <div class="behavior-form-wrapper bhm-form behavior-form-modal" data-behavior-type="${Utils.escapeHTML(e?.behaviorType||"")}">
                <form data-contractor-behavior-form="true" data-form-uid="${t}" class="bhm-form-inner">
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
                                    <label for="${p.contractorSelect}" class="bhm-label">${this.t("module.behavior.contractorName","\u0627\u0644\u0645\u0642\u0627\u0648\u0644")} <span class="bhm-req">*</span></label>
                                    <select id="${p.contractorSelect}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectContractor","-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --")}</option>
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${p.contractorWorker}" class="bhm-label">${this.t("module.behavior.contractorWorker","\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644")} <span class="bhm-optional">(${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")})</span></label>
                                    <input type="text" id="${p.contractorWorker}" class="form-input bhm-input" value="${Utils.escapeHTML(e?.contractorWorker||"")}" placeholder="${this.t("module.behavior.form.workerPh","\u0639\u0627\u0645\u0644 \u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644")}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${p.department}" class="bhm-label">${this.t("module.behavior.form.department","\u0627\u0644\u0642\u0633\u0645")}</label>
                                    <input type="text" id="${p.department}" class="form-input bhm-input" value="${Utils.escapeHTML(e?.department||"")}" placeholder="${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${p.job}" class="bhm-label">${this.t("module.behavior.form.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}</label>
                                    <input type="text" id="${p.job}" class="form-input bhm-input" value="${Utils.escapeHTML(e?.job||e?.position||"")}" placeholder="${this.t("common.optional","\u0627\u062E\u062A\u064A\u0627\u0631\u064A")}">
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
                                        <label for="${p.behaviorType}" class="bhm-label mb-0">${this.t("module.behavior.behaviorType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641")} <span class="bhm-req">*</span></label>
                                        <span class="badge ${this.getBehaviorTypeBadgeClass(e?.behaviorType)} bhm-type-chip" id="${p.typeBadge}">${Utils.escapeHTML(e?.behaviorType||"\u2014")}</span>
                                    </div>
                                    <select id="${p.behaviorType}" required class="form-input bhm-input mt-2">
                                        <option value="">${this.t("module.behavior.selectType","\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639")}</option>
                                        <option value="\u0625\u064A\u062C\u0627\u0628\u064A" ${e?.behaviorType==="\u0625\u064A\u062C\u0627\u0628\u064A"?"selected":""}>${this.t("module.behavior.positive","\u0625\u064A\u062C\u0627\u0628\u064A")}</option>
                                        <option value="\u0633\u0644\u0628\u064A" ${e?.behaviorType==="\u0633\u0644\u0628\u064A"?"selected":""}>${this.t("module.behavior.negative","\u0633\u0644\u0628\u064A")}</option>
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${p.behaviorDate}" class="bhm-label">${this.t("module.behavior.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")} <span class="bhm-req">*</span></label>
                                    <input type="date" id="${p.behaviorDate}" required class="form-input bhm-input" value="${i}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${p.behaviorRating}" class="bhm-label">${this.t("module.behavior.rating","\u0627\u0644\u062A\u0642\u064A\u064A\u0645")} <span class="bhm-req">*</span></label>
                                    <select id="${p.behaviorRating}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectRating","\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0642\u064A\u064A\u0645")}</option>
                                        <option value="\u0645\u0645\u062A\u0627\u0632" ${e?.rating==="\u0645\u0645\u062A\u0627\u0632"?"selected":""}>${this.t("module.behavior.excellent","\u0645\u0645\u062A\u0627\u0632")}</option>
                                        <option value="\u062C\u064A\u062F" ${e?.rating==="\u062C\u064A\u062F"?"selected":""}>${this.t("module.behavior.good","\u062C\u064A\u062F")}</option>
                                        <option value="\u0645\u0642\u0628\u0648\u0644" ${e?.rating==="\u0645\u0642\u0628\u0648\u0644"?"selected":""}>${this.t("module.behavior.acceptable","\u0645\u0642\u0628\u0648\u0644")}</option>
                                        <option value="\u0636\u0639\u064A\u0641" ${e?.rating==="\u0636\u0639\u064A\u0641"?"selected":""}>${this.t("module.behavior.poor","\u0636\u0639\u064A\u0641")}</option>
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
                                    <label for="${p.factory}" class="bhm-label">\u0627\u0644\u0645\u0635\u0646\u0639 <span class="bhm-req">*</span></label>
                                    <select id="${p.factory}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectFactory","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")}</option>
                                        ${a.map(b=>`
                                            <option value="${b.id}" ${r===b.id||o===b.name?"selected":""}>${Utils.escapeHTML(b.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${p.subLocation}" class="bhm-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A <span class="bhm-req">*</span></label>
                                    <select id="${p.subLocation}" required class="form-input bhm-input">
                                        <option value="">${this.t("module.behavior.selectSubLocation","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</option>
                                        ${s.map(b=>`
                                            <option value="${b.id}" ${h===b.id||n===b.name?"selected":""}>${Utils.escapeHTML(b.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="${p.negativeSection}" class="bhm-negative-panel" style="${c?"":"display:none;"}">
                        <div class="bhm-negative-head">
                            <span class="bhm-negative-icon"><i class="fas fa-exclamation-triangle"></i></span>
                            <div><h4 class="bhm-negative-title">\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A (\u0644\u0644\u062A\u0635\u0631\u0641 \u0627\u0644\u0633\u0644\u0628\u064A)</h4></div>
                        </div>
                        <div class="bhm-negative-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${p.correctiveAction}" class="bhm-label">${this.t("module.behavior.form.correctiveAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A")} <span class="bhm-req">*</span></label>
                                    <select id="${p.correctiveAction}" class="form-input bhm-input" ${c?"required":""}>
                                        <option value="">${this.t("module.behavior.selectAction","\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621")}</option>
                                        ${this.NEGATIVE_ACTIONS.map(b=>`
                                            <option value="${Utils.escapeHTML(b)}" ${e?.correctiveAction===b?"selected":""}>${Utils.escapeHTML(b)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${p.correctiveActionDetails}" class="bhm-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629</label>
                                    <input type="text" id="${p.correctiveActionDetails}" class="form-input bhm-input" value="${Utils.escapeHTML(e?.correctiveActionDetails||"")}">
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
                                    <label for="${p.photoInput}" class="bhm-label">\u0635\u0648\u0631\u0629</label>
                                    <input type="file" id="${p.photoInput}" accept="image/*" class="bhm-file-input">
                                    <div id="${p.photoPreview}" class="bhm-photo-preview mt-3 ${e?.photo?"":"hidden"}">
                                        <img src="${Utils.escapeHTML(g)}" alt=""${L} class="bhm-photo-thumb" id="${p.photoImg}">
                                        <button type="button" class="bhm-photo-clear" data-action="cb-clear-photo">${this.t("module.behavior.form.clearPhoto","\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629")}</button>
                                    </div>
                                </div>
                                <div class="bhm-field bhm-field-grow">
                                    <label for="${p.description}" class="bhm-label">${this.t("module.behavior.form.description","\u0627\u0644\u0648\u0635\u0641")} <span class="bhm-req">*</span></label>
                                    <textarea id="${p.description}" required class="form-input bhm-input bhm-textarea" rows="5">${Utils.escapeHTML(e?.description||"")}</textarea>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="bhm-form-footer">
                        <button type="button" class="btn-secondary bhm-btn-cancel" data-action="cb-cancel-form">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" id="${p.saveBtn}" class="btn-primary bhm-btn-save"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638</button>
                    </div>
                </form>
            </div>
        `},bindContractorBehaviorForm({form:e,uid:t,data:i,modal:a,signal:o}){const n=document.getElementById(`${t}-contractor-select`);if(n&&typeof Contractors<"u"&&Contractors.populateContractorSelect)try{Contractors.populateContractorSelect(n,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:i?.contractorName||"",selectedContractorId:i?.contractorId||"",valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1})}catch(m){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",m)}const r=document.getElementById(`${t}-cb-factory`),s=document.getElementById(`${t}-cb-sublocation`),h=()=>{if(!r||!s)return;const m=this.getPlaceOptions(r.value),$=s.value;s.innerHTML='<option value="">'+this.t("module.behavior.selectSubLocation","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")+"</option>"+m.map(l=>`<option value="${l.id}">${Utils.escapeHTML(l.name)}</option>`).join(""),$&&m.some(l=>l.id===$)&&(s.value=$)};r?.addEventListener("change",h,{signal:o});const c=document.getElementById(`${t}-cb-type`),d=document.getElementById(`${t}-cb-type-badge`),v=document.getElementById(`${t}-cb-negative-section`),g=document.getElementById(`${t}-cb-corrective`),L=m=>{const $=e.closest(".behavior-form-wrapper");$&&$.setAttribute("data-behavior-type",m||""),d&&(d.className=`badge ${this.getBehaviorTypeBadgeClass(m)} bhm-type-chip`,d.textContent=m||"\u2014");const l=(m||"")==="\u0633\u0644\u0628\u064A";v&&(v.style.display=l?"":"none"),g&&(l?g.setAttribute("required","required"):g.removeAttribute("required"))};L(c?.value||i?.behaviorType||""),c?.addEventListener("change",()=>L(c.value),{signal:o});const p=document.getElementById(`${t}-cb-photo-input`),b=document.getElementById(`${t}-cb-photo-preview`),y=document.getElementById(`${t}-cb-photo-img`);p&&b&&y&&p.addEventListener("change",m=>{const $=m.target.files?.[0];if(!$)return;if($.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),p.value="";return}const l=new FileReader;l.onload=u=>{y.src=u.target.result,b.classList.remove("hidden")},l.readAsDataURL($)},{signal:o}),e.querySelector('[data-action="cb-clear-photo"]')?.addEventListener("click",()=>{const m=document.getElementById(`${t}-cb-photo-input`),$=document.getElementById(`${t}-cb-photo-preview`);m&&(m.value=""),$&&$.classList.add("hidden")},{signal:o}),e.querySelector('[data-action="cb-cancel-form"]')?.addEventListener("click",()=>a?.remove(),{signal:o}),document.getElementById(`${t}-cb-save-btn`)?.addEventListener("click",()=>this.handleContractorSubmit({uid:t,form:e,editId:i?.id||null,modal:a}),{signal:o})},async handleContractorSubmit({uid:e,form:t,editId:i=null,modal:a}){let o=i&&this.getRawContractorBehaviorById(i)?.photo||"";const n=document.getElementById(`${e}-cb-photo-input`);if(n&&n.files.length>0){const A=n.files[0];if(A.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}o=await this.convertImageToBase64(A)}const r=document.getElementById(`${e}-contractor-select`),s=r?.selectedOptions?.[0],h=(r?.value||"").trim(),c=(s?.dataset?.contractorId||"").trim();if(!h){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644");return}const d=document.getElementById(`${e}-cb-type`),v=document.getElementById(`${e}-cb-date`),g=document.getElementById(`${e}-cb-rating`),L=document.getElementById(`${e}-cb-description`),p=document.getElementById(`${e}-cb-department`),b=document.getElementById(`${e}-cb-job`),y=document.getElementById(`${e}-cb-factory`),m=document.getElementById(`${e}-cb-sublocation`),$=document.getElementById(`${e}-cb-corrective`),l=document.getElementById(`${e}-cb-corrective-details`),u=document.getElementById(`${e}-contractor-worker`);if(!d||!v||!g||!L||!y||!m){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.");return}const T=(d.value||"")==="\u0633\u0644\u0628\u064A";if(T&&(!$||!$.value)){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0644\u0644\u062A\u0635\u0631\u0641 \u0627\u0644\u0633\u0644\u0628\u064A");return}const f=AppState.appData.contractorBehaviorMonitoring||[],S=i?this.getRawContractorBehaviorById(i):null,C=typeof generateISOCode=="function"?generateISOCode:null,B={id:i||Utils.generateId("CBHM"),isoCode:S&&S.isoCode?S.isoCode:C?C("BHC",f):`BHC-${Date.now()}`,contractorId:c,contractorName:h,contractorWorker:(u?.value||"").trim(),department:(p?.value||"").trim(),job:(b?.value||"").trim(),factory:(y.value||"").trim(),factoryId:y.value?String(y.value).trim():null,factoryName:this.resolveSiteName(y.value),subLocation:(m.value||"").trim(),subLocationId:m.value?String(m.value).trim():null,subLocationName:this.resolvePlaceName(m.value,y.value),photo:o,behaviorType:d.value,date:new Date(v.value).toISOString(),rating:g.value,correctiveAction:T&&$?.value||"",correctiveActionDetails:T?(l?.value||"").trim():"",description:L.value.trim(),createdAt:i?this.getRawContractorBehaviorById(i)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};Loading.show();try{if(Array.isArray(AppState.appData.contractorBehaviorMonitoring)||(AppState.appData.contractorBehaviorMonitoring=[]),i){const A=AppState.appData.contractorBehaviorMonitoring.findIndex(w=>w.id===i);A!==-1&&(AppState.appData.contractorBehaviorMonitoring[A]=B),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u0641 \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.contractorBehaviorMonitoring.push(B),Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.autoSave("ContractorBehaviorMonitoring",AppState.appData.contractorBehaviorMonitoring),Loading.hide(),a&&a.remove(),this.refreshCurrentTab()}catch(A){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+A.message)}},async showContractorForm(e=null){if(typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{await Permissions.ensureFormSettingsState()}catch{}const t=document.createElement("div");t.className="modal-overlay bhmc-contractor-overlay";const i=`bhmc-modal-${Date.now()}`,a=e?this.presentContractorBehavior(e):null;t.innerHTML=`
            <div class="modal-content behavior-modal bhm-registration-modal bhmc-contractor-dialog">
                <div class="bhm-modal-hero">
                    <div class="bhm-modal-hero-text">
                        <p class="bhm-modal-kicker"><i class="fas fa-users-cog ml-2"></i>\u062A\u0635\u0631\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                        <h2 class="bhm-modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641":"\u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u0641 \u0645\u0642\u0627\u0648\u0644"}</h2>
                    </div>
                    <button type="button" class="bhm-modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="\u0625\u063A\u0644\u0627\u0642"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body bhm-modal-body">
                    ${this.getContractorBehaviorFormHTML(a,i)}
                </div>
            </div>`,document.body.appendChild(t),this._modalAbortController&&this._modalAbortController.abort(),this._modalAbortController=new AbortController;const o=this._modalAbortController.signal,n=t.querySelector('form[data-contractor-behavior-form="true"]');n&&this.bindContractorBehaviorForm({form:n,uid:i,data:a,modal:t,signal:o}),t.addEventListener("click",r=>{r.target===t&&t.remove()},{signal:o})},editContractorBehavior(e){const t=this.getRawContractorBehaviorById(e);if(!t){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.showContractorForm(t)},async viewContractorBehavior(e){const t=this.getRawContractorBehaviorById(e);if(!t){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.presentContractorBehavior(t),a=s=>Utils.escapeHTML((s??"").toString()),o=s=>{const h=(s??"").toString().trim();return h?a(h):'<span class="bhm-detail-empty">\u2014</span>'},n=this.getBehaviorDate(i)?this.formatBehaviorDateDisplay(i):"\u2014",r=document.createElement("div");r.className="modal-overlay bhm-detail-overlay",r.innerHTML=`
            <div class="modal-content behavior-modal bhm-detail-modal" style="max-width: 820px;">
                <div class="bhm-detail-hero">
                    <div class="bhm-detail-hero-text">
                        <p class="bhm-detail-kicker"><i class="fas fa-users-cog ml-2"></i>\u062A\u0635\u0631\u0641 \u0645\u0642\u0627\u0648\u0644</p>
                        <h2 class="bhm-detail-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u0641</h2>
                        <p class="bhm-detail-sub">${a(i.isoCode||"\u2014")} \xB7 ${a(i.contractorName||"")}</p>
                    </div>
                    <button type="button" class="bhm-detail-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body bhm-detail-body">
                    <div class="bhm-detail-grid">
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0643\u0648\u062F ISO</span><div class="bhm-detail-value">${o(i.isoCode)}</div></div>
                        <div class="bhm-detail-field bhm-detail-field-span2"><span class="bhm-detail-label">\u0627\u0644\u0645\u0642\u0627\u0648\u0644</span><div class="bhm-detail-value bhm-detail-value-strong">${o(i.contractorName)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0639\u0627\u0645\u0644</span><div class="bhm-detail-value">${o(i.contractorWorker)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0642\u0633\u0645</span><div class="bhm-detail-value">${o(i.department)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</span><div class="bhm-detail-value">${o(i.job)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0645\u0635\u0646\u0639</span><div class="bhm-detail-value">${o(i.factoryName||i.factory)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</span><div class="bhm-detail-value">${o(i.subLocationName||i.subLocation)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641</span><div class="bhm-detail-value"><span class="badge ${this.getBehaviorTypeBadgeClass(i.behaviorType)}">${a(i.behaviorType||"\u2014")}</span></div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</span><div class="bhm-detail-value">${a(n)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">\u0627\u0644\u062A\u0642\u064A\u064A\u0645</span><div class="bhm-detail-value"><span class="badge ${this.getRatingBadgeClass(i.rating)}">${a(i.rating||"\u2014")}</span></div></div>
                        <div class="bhm-detail-field bhm-detail-field-span2"><span class="bhm-detail-label">\u0627\u0644\u0648\u0635\u0641</span><div class="bhm-detail-value">${o(i.description)}</div></div>
                    </div>
                </div>
                <div class="bhm-detail-footer">
                    <button type="button" class="btn-primary" onclick="BehaviorMonitoring.editContractorBehavior(${JSON.stringify(String(i.id||""))}); this.closest('.modal-overlay').remove();"><i class="fas fa-pen ml-2"></i>\u062A\u0639\u062F\u064A\u0644</button>
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.printContractorReport(${JSON.stringify(String(i.id||""))})"><i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629</button>
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.exportContractorPDF(${JSON.stringify(String(i.id||""))})"><i class="fas fa-file-pdf ml-2"></i>PDF</button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>`,document.body.appendChild(r)},async exportContractorPDF(e){const t=this.getRawContractorBehaviorById(e);if(!t){Notification.error("\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.presentContractorBehavior(t);try{Loading.show();const a=i.isoCode||`BHC-${i.id?.substring(0,8)||"UNKNOWN"}`,o="\u062A\u0642\u0631\u064A\u0631 \u062A\u0635\u0631\u0641 \u0645\u0642\u0627\u0648\u0644",n=this.getBehaviorDate(i)?this.formatBehaviorDateDisplay(i):"\u2014",r=`
                <table>
                    <tr><th>\u0643\u0648\u062F ISO</th><td>${Utils.escapeHTML(i.isoCode||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0642\u0627\u0648\u0644</th><td>${Utils.escapeHTML(i.contractorName||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0639\u0627\u0645\u0644</th><td>${Utils.escapeHTML(i.contractorWorker||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0642\u0633\u0645</th><td>${Utils.escapeHTML(i.department||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th><td>${Utils.escapeHTML(i.job||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0635\u0646\u0639</th><td>${Utils.escapeHTML(i.factoryName||i.factory||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th><td>${Utils.escapeHTML(i.subLocationName||i.subLocation||"")}</td></tr>
                    <tr><th>\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u0641</th><td>${Utils.escapeHTML(i.behaviorType||"")}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><td>${Utils.escapeHTML(n)}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0642\u064A\u064A\u0645</th><td>${Utils.escapeHTML(i.rating||"")}</td></tr>
                    ${i.behaviorType==="\u0633\u0644\u0628\u064A"&&(i.correctiveAction||i.correctiveActionDetails)?`
                        <tr><th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</th><td>${Utils.escapeHTML(i.correctiveAction||"")}</td></tr>
                        <tr><th>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</th><td>${Utils.escapeHTML(i.correctiveActionDetails||"")}</td></tr>
                    `:""}
                    <tr><th colspan="2">\u0627\u0644\u0648\u0635\u0641</th></tr>
                    <tr><td colspan="2">${Utils.escapeHTML(i.description||"")}</td></tr>
                </table>`,s=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(a,o,r,!1,!0,{version:"1.0"},i.createdAt,i.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${o}</title></head><body>${r}</body></html>`,h=new Blob([s],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(h),d=window.open(c,"_blank");d?d.onload=()=>{setTimeout(()=>{d.print(),setTimeout(()=>URL.revokeObjectURL(c),1e3),Loading.hide()},500)}:(URL.revokeObjectURL(c),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629"))}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+a.message)}},async printContractorReport(e){await this.exportContractorPDF(e)},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F BehaviorMonitoring module..."),this._eventListenersAbortController&&(this._eventListenersAbortController.abort(),this._eventListenersAbortController=null),this._modalAbortController&&(this._modalAbortController.abort(),this._modalAbortController=null),this._setupTimeoutId&&(clearTimeout(this._setupTimeoutId),this._setupTimeoutId=null),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F BehaviorMonitoring module")}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 BehaviorMonitoring module:",e)}}};(function(){"use strict";try{typeof window<"u"&&typeof BehaviorMonitoring<"u"&&(window.BehaviorMonitoring=BehaviorMonitoring,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 BehaviorMonitoring module loaded and available on window.BehaviorMonitoring"))}catch{if(typeof window<"u"&&typeof BehaviorMonitoring<"u")try{window.BehaviorMonitoring=BehaviorMonitoring}catch{}}})();
