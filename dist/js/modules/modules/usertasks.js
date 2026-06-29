const UserTasks={cache:{members:null,tasks:new Map,lastLoad:null},config:{cacheTimeout:3e5,debounceDelay:300,batchSize:50,syncInterval:3e4},autoSyncTimer:null,_getI18nCore(){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null},t(e,t){const s=this._getI18nCore();return s?s.t(e,null,t||e):t||e},applyModuleI18n(e){const t=this._getI18nCore();if(!t)return;const s=e||document.getElementById("user-tasks-section")||document;typeof t.applyI18n=="function"&&t.applyI18n(s),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(s)},_filterPanelStyles(){return`
        <style id="ut-filter-styles">
            .ut-filter-card { padding: 0; overflow: hidden; border-radius: 14px; }
            .ut-filter-bar {
                background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
                border-bottom: 1px solid #e2e8f0;
                padding: 0.9rem 1.1rem 1.05rem;
            }
            .ut-filter-head {
                display: flex; align-items: center; justify-content: space-between;
                flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.85rem;
            }
            .ut-filter-title {
                display: flex; align-items: center; gap: 0.55rem;
                font-size: 0.95rem; font-weight: 700; color: #1e293b;
            }
            .ut-filter-icon {
                width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
                display: flex; align-items: center; justify-content: center;
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                color: #fff; font-size: 0.85rem;
                box-shadow: 0 2px 8px rgba(79,70,229,0.35);
            }
            .ut-filter-reset {
                display: inline-flex; align-items: center; gap: 0.4rem;
                background: #fff; border: 1.5px solid #e2e8f0; color: #64748b;
                padding: 0.42rem 0.9rem; border-radius: 9px; font-size: 0.8rem;
                font-weight: 600; cursor: pointer; transition: all 0.15s;
            }
            .ut-filter-reset:hover { border-color: #ef4444; color: #ef4444; background: #fff1f2; }
            .ut-filter-reset i { font-size: 0.75rem; }
            .ut-filter-grid {
                display: grid; gap: 0.75rem;
                grid-template-columns: 2fr 1.3fr 1.1fr 1.1fr;
            }
            .ut-filter-grid-3 { grid-template-columns: 2fr 1.2fr 1.2fr; }
            @media (max-width: 900px) { .ut-filter-grid, .ut-filter-grid-3 { grid-template-columns: 1fr 1fr; } }
            @media (max-width: 560px) { .ut-filter-grid, .ut-filter-grid-3 { grid-template-columns: 1fr; } }
            .ut-field { display: flex; flex-direction: column; gap: 0.32rem; min-width: 0; }
            .ut-field label {
                display: flex; align-items: center; gap: 0.35rem;
                font-size: 0.74rem; font-weight: 700; color: #64748b;
            }
            .ut-field label i { font-size: 0.72rem; color: #94a3b8; }
            .ut-field select,
            .ut-search-wrap input {
                width: 100%; height: 40px; padding: 0 0.75rem;
                font-size: 0.86rem; color: #1e293b;
                border: 1.5px solid #e2e8f0; border-radius: 10px; background: #fff;
                outline: none; transition: border-color 0.15s, box-shadow 0.15s;
                box-sizing: border-box;
            }
            .ut-field select {
                cursor: pointer; appearance: none; -webkit-appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='3'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
                background-repeat: no-repeat; background-position: left 0.7rem center;
                padding-left: 2rem;
            }
            .ut-field select:focus,
            .ut-search-wrap input:focus {
                border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79,70,229,0.12);
            }
            .ut-search-wrap { position: relative; }
            .ut-search-wrap .ut-search-ico {
                position: absolute; top: 50%; transform: translateY(-50%);
                right: 0.8rem; color: #94a3b8; font-size: 0.82rem; pointer-events: none;
            }
            .ut-search-wrap input { padding-right: 2.3rem; }
        </style>`},ensureData(){AppState.appData.userTasks||(AppState.appData.userTasks=[])},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("user-tasks-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0642\u0633\u0645 user-tasks-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}if(typeof AppState>"u"){e.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</p>
                            <p class="text-sm text-gray-400">AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B. \u062C\u0631\u0651\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p>
                            <button onclick="location.reload()" class="btn-primary mt-4">
                                <i class="fas fa-redo ml-2"></i>
                                \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `,this.applyModuleI18n(e);return}this.ensureData(),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");try{e.innerHTML=`
                <div class="section-header">
                    <h1 class="section-title">
                        <i class="fas fa-tasks ml-3"></i>
                        ${this.t("module.userTasks.title","\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646")}
                    </h1>
                    <p class="section-subtitle">${this.t("module.userTasks.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p>
                </div>
                <div class="content-card mt-6">
                    <div class="card-body">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">${this.t("module.userTasks.preparingUi","\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0648\u0627\u062C\u0647\u0629...")}</p>
                        </div>
                    </div>
                </div>
            `,this.applyModuleI18n(e);const t=AppState.currentUser?.role==="admin"||AppState.currentUser?.role==="safety_officer";let s="";try{if(t){const a=this.render();s=await Utils.promiseWithTimeout(a,1e4,()=>new Error("Timeout: render took too long"))}else{const a=this.renderUserDashboard();s=await Utils.promiseWithTimeout(a,1e4,()=>new Error("Timeout: renderUserDashboard took too long"))}}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0648\u0627\u062C\u0647\u0629:",a),s=`
                    <div class="section-header">
                        <h1 class="section-title">
                            <i class="fas fa-tasks ml-3"></i>
                            ${this.t("module.userTasks.title","\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646")}
                        </h1>
                    </div>
                    <div class="content-card mt-6">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">${this.t("module.common.loadDataError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                            <button onclick="UserTasks.load()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                ${this.t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                            </button>
                        </div>
                    </div>
                `}e.innerHTML=s,this.applyModuleI18n(e);try{if(t){this.setupEventListeners();try{setTimeout(()=>{this.loadMembers().catch(()=>{})},0)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0623\u0648\u0644\u064A:",a)}setTimeout(()=>{this.loadMembers().then(()=>{}).catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0639\u0636\u0627\u0621:",a)})},100)}else{this.setupUserDashboardListeners();try{setTimeout(()=>{this.loadUserTasks().catch(()=>{})},0)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0623\u0648\u0644\u064A:",a)}setTimeout(()=>{this.loadUserTasks().then(()=>{}).catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",a)})},100)}}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0623\u062D\u062F\u0627\u062B:",a)}try{this.startAutoSync()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629:",a)}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0648\u062F\u064A\u0648\u0644 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646:",t),e.innerHTML=`
                <div class="section-header">
                    <h1 class="section-title">
                        <i class="fas fa-tasks ml-3"></i>
                        ${this.t("module.userTasks.title","\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646")}
                    </h1>
                </div>
                <div class="content-card mt-6">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-2">${this.t("module.common.loadDataRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                            <p class="text-sm text-gray-400 mb-4">${t&&t.message?Utils.escapeHTML(t.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                            <button onclick="UserTasks.load()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                ${this.t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                            </button>
                        </div>
                    </div>
                </div>
            `,this.applyModuleI18n(e),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",{duration:5e3})}},startAutoSync(){if(typeof AppState<"u"&&!(AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl&&AppState.googleConfig.appsScript.scriptUrl.trim()!=="")){Utils.safeLog("\u2139\uFE0F \u0644\u0646 \u064A\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629: Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0644 \u0623\u0648 \u063A\u064A\u0631 \u0645\u064F\u0643\u0648\u064E\u0651\u0646");return}this.stopAutoSync(),Utils.safeLog("\u{1F504} \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u0644\u0644\u0645\u0647\u0627\u0645..."),this.autoSyncTimer=setInterval(async()=>{try{await this.syncTasks()}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629:",e)}},this.config.syncInterval)},stopAutoSync(){this.autoSyncTimer&&(clearInterval(this.autoSyncTimer),this.autoSyncTimer=null,Utils.safeLog("\u{1F6D1} \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u0644\u0644\u0645\u0647\u0627\u0645"))},async syncTasks(){try{if(typeof AppState>"u")return;if(!(AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl&&AppState.googleConfig.appsScript.scriptUrl.trim()!=="")){this.autoSyncTimer&&(this.stopAutoSync(),Utils.safeLog("\u26A0\uFE0F \u062A\u0645 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629: Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0644 \u0623\u0648 \u063A\u064A\u0631 \u0645\u064F\u0643\u0648\u064E\u0651\u0646"));return}if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"){Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),this.autoSyncTimer&&this.stopAutoSync();return}const t=AppState.currentUser?.role==="admin"||AppState.currentUser?.role==="safety_officer",s=AppState.currentUser?.id||AppState.currentUser?.email;let a;try{t?a=await GoogleIntegration.sendRequest({action:"getAllUserTasks",data:{}}):a=await GoogleIntegration.sendRequest({action:"getUserTasksByUserId",data:{userId:s}})}catch(i){const r=String(i?.message||"").toLowerCase();if(r.includes("circuit breaker")||r.includes("google apps script \u063A\u064A\u0631 \u0645\u0641\u0639\u0644")||r.includes("\u063A\u064A\u0631 \u0645\u0641\u0639\u0644")||r.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||r.includes("timeout")||r.includes("failed to fetch")||r.includes("networkerror")){this.autoSyncTimer&&(this.stopAutoSync(),Utils.safeLog("\u26A0\uFE0F \u062A\u0645 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u0628\u0633\u0628\u0628 \u0645\u0634\u0627\u0643\u0644 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644"));return}throw i}if(a.success&&Array.isArray(a.data)){const i=AppState.appData.userTasks?.length||0;AppState.appData.userTasks=a.data;const r=a.data.length;let l=r,d=i;if(!t&&s&&(d=(AppState.appData.userTasks||[]).filter(o=>(o.userId||o.assignedTo)===s).length,l=a.data.length),i!==r&&(Utils.safeLog(`\u2705 \u062A\u0645\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629: ${r} \u0645\u0647\u0645\u0629`),t?await this.loadTasks():await this.loadUserTasks(),l>d&&!t)){const n=l-d;Notification.info(`\u0644\u062F\u064A\u0643 ${n} \u0645\u0647\u0645\u0629 \u062C\u062F\u064A\u062F\u0629`)}}}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0647\u0627\u0645:",e)}},async render(){const e=this.getStats();return`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-tasks ml-3"></i>
                            \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                        </h1>
                        <p class="section-subtitle">${this.t("module.userTasks.adminSubtitle","\u0625\u062F\u0627\u0631\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646")}</p>
                    </div>
                    <div class="flex gap-2">
                        <button id="export-tasks-pdf-btn" class="btn-secondary">
                            <i class="fas fa-file-pdf ml-2"></i>
                            \u062A\u0642\u0631\u064A\u0631 PDF
                        </button>
                        <button id="export-tasks-excel-btn" class="btn-success">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 Excel
                        </button>
                        <button id="add-task-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0645\u0647\u0645\u0629 \u062C\u062F\u064A\u062F\u0629
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-tasks text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">${this.t("module.userTasks.totalTasks","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0647\u0627\u0645")}</p>
                            <p class="text-2xl font-bold text-gray-900" id="total-tasks-count">${e.total}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-check-circle text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">${this.t("module.userTasks.completedTasks","\u0645\u0647\u0627\u0645 \u0645\u0643\u062A\u0645\u0644\u0629")}</p>
                            <p class="text-2xl font-bold text-gray-900" id="completed-tasks-count">${e.completed}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-clock text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">${this.t("module.userTasks.inProgress","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")}</p>
                            <p class="text-2xl font-bold text-gray-900" id="in-progress-tasks-count">${e.inProgress}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-exclamation-triangle text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">${this.t("module.userTasks.overdueTasks","\u0645\u0647\u0627\u0645 \u0645\u062A\u0623\u062E\u0631\u0629")}</p>
                            <p class="text-2xl font-bold text-gray-900" id="overdue-tasks-count">${e.overdue}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            ${this._filterPanelStyles()}

            <!-- \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0648\u0627\u0644\u0628\u062D\u062B -->
            <div class="content-card mt-6 ut-filter-card">
                <div class="ut-filter-bar">
                    <div class="ut-filter-head">
                        <div class="ut-filter-title">
                            <span class="ut-filter-icon"><i class="fas fa-sliders-h"></i></span>
                            <span>${this.t("module.userTasks.filterTitle","\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0645\u0647\u0627\u0645")}</span>
                        </div>
                        <button type="button" id="task-filter-reset" class="ut-filter-reset">
                            <i class="fas fa-rotate-left"></i>${this.t("module.userTasks.resetFilters","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646")}
                        </button>
                    </div>
                    <div class="ut-filter-grid">
                        <div class="ut-field ut-field-search">
                            <label><i class="fas fa-magnifying-glass"></i>${this.t("module.userTasks.search","\u0628\u062D\u062B")}</label>
                            <div class="ut-search-wrap">
                                <i class="fas fa-search ut-search-ico"></i>
                                <input type="text" id="task-search-input" placeholder="${this.t("module.userTasks.searchTasksPlaceholder","\u0627\u0628\u062D\u062B \u0628\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629 \u0623\u0648 \u0627\u0644\u0648\u0635\u0641...")}">
                            </div>
                        </div>
                        <div class="ut-field">
                            <label><i class="fas fa-user"></i>${this.t("module.userTasks.user","\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645")}</label>
                            <select id="task-user-filter">
                                <option value="">${this.t("module.userTasks.allUsers","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646")}</option>
                            </select>
                        </div>
                        <div class="ut-field">
                            <label><i class="fas fa-circle-check"></i>${this.t("module.userTasks.status","\u0627\u0644\u062D\u0627\u0644\u0629")}</label>
                            <select id="task-status-filter">
                                <option value="">${this.t("module.userTasks.allStatuses","\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A")}</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630">${this.t("module.userTasks.inProgress","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")}</option>
                                <option value="\u0645\u0643\u062A\u0645\u0644">${this.t("module.userTasks.completed","\u0645\u0643\u062A\u0645\u0644")}</option>
                                <option value="\u0645\u0644\u063A\u064A">${this.t("module.userTasks.cancelled","\u0645\u0644\u063A\u064A")}</option>
                            </select>
                        </div>
                        <div class="ut-field">
                            <label><i class="fas fa-flag"></i>${this.t("module.userTasks.priority","\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629")}</label>
                            <select id="task-priority-filter">
                                <option value="">${this.t("module.userTasks.allPriorities","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0627\u062A")}</option>
                                <option value="\u0639\u0627\u0644\u064A">${this.t("module.userTasks.priorityHigh","\u0639\u0627\u0644\u064A")}</option>
                                <option value="\u0645\u062A\u0648\u0633\u0637">${this.t("module.userTasks.priorityMedium","\u0645\u062A\u0648\u0633\u0637")}</option>
                                <option value="\u0645\u0646\u062E\u0641\u0636">${this.t("module.userTasks.priorityLow","\u0645\u0646\u062E\u0641\u0636")}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="tasks-list-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">${this.t("module.userTasks.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderUserDashboard(){const e=AppState.currentUser?.id||AppState.currentUser?.email,t=(AppState.appData.userTasks||[]).filter(i=>(i.userId||i.assignedTo)===e),s=new Date,a={total:t.length,new:t.filter(i=>i.status==="\u062C\u062F\u064A\u062F\u0629"||!i.status).length,inProgress:t.filter(i=>i.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||i.status==="in-progress").length,completed:t.filter(i=>i.status==="\u0645\u0643\u062A\u0645\u0644"||i.status==="completed").length,overdue:t.filter(i=>i.status==="\u0645\u0643\u062A\u0645\u0644"||i.status==="completed"||!i.dueDate?!1:new Date(i.dueDate)<s).length};return`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-tasks ml-3"></i>
                            \u0645\u0647\u0627\u0645\u064A
                        </h1>
                        <p class="section-subtitle">${this.t("module.userTasks.userSubtitle","\u0639\u0631\u0636 \u0648\u0625\u062F\u0627\u0631\u0629 \u0645\u0647\u0627\u0645\u0643 \u0627\u0644\u0634\u062E\u0635\u064A\u0629")}</p>
                    </div>
                    <div class="flex gap-2">
                        <button id="user-refresh-tasks-btn" class="btn-secondary">
                            <i class="fas fa-sync-alt ml-2"></i>
                            \u062A\u062D\u062F\u064A\u062B
                        </button>
                        <button id="user-export-tasks-pdf-btn" class="btn-info">
                            <i class="fas fa-file-pdf ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                    </div>
                </div>
            </div>

            <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0645\u0647\u0627\u0645 -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-tasks text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">${this.t("module.userTasks.totalTasks","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0647\u0627\u0645")}</p>
                            <p class="text-2xl font-bold text-gray-900" id="user-total-tasks">${a.total}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-star text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">${this.t("module.userTasks.newTasks","\u0645\u0647\u0627\u0645 \u062C\u062F\u064A\u062F\u0629")}</p>
                            <p class="text-2xl font-bold text-gray-900" id="user-new-tasks">${a.new}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-clock text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</p>
                            <p class="text-2xl font-bold text-gray-900" id="user-in-progress-tasks">${a.inProgress}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-check-circle text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">\u0645\u0643\u062A\u0645\u0644\u0629</p>
                            <p class="text-2xl font-bold text-gray-900" id="user-completed-tasks">${a.completed}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-exclamation-triangle text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">\u0645\u062A\u0623\u062E\u0631\u0629</p>
                            <p class="text-2xl font-bold text-gray-900" id="user-overdue-tasks">${a.overdue}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- \u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629 -->
            <div class="content-card mt-6 bg-blue-50 border-blue-200">
                <div class="flex items-center gap-3">
                    <i class="fas fa-info-circle text-blue-600 text-xl"></i>
                    <div>
                        <p class="text-sm font-semibold text-blue-800">\u062A\u062D\u062F\u064A\u062B \u062A\u0644\u0642\u0627\u0626\u064A</p>
                        <p class="text-xs text-blue-600">\u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0643\u0644 30 \u062B\u0627\u0646\u064A\u0629</p>
                    </div>
                    <div class="mr-auto">
                        <span class="text-xs text-blue-600" id="last-sync-time">\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B: \u0627\u0644\u0622\u0646</span>
                    </div>
                </div>
            </div>

            ${this._filterPanelStyles()}

            <!-- \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0648\u0627\u0644\u0628\u062D\u062B -->
            <div class="content-card mt-6 ut-filter-card">
                <div class="ut-filter-bar">
                    <div class="ut-filter-head">
                        <div class="ut-filter-title">
                            <span class="ut-filter-icon"><i class="fas fa-sliders-h"></i></span>
                            <span>${this.t("module.userTasks.filterTitle","\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0645\u0647\u0627\u0645")}</span>
                        </div>
                        <button type="button" id="user-task-filter-reset" class="ut-filter-reset">
                            <i class="fas fa-rotate-left"></i>${this.t("module.userTasks.resetFilters","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646")}
                        </button>
                    </div>
                    <div class="ut-filter-grid ut-filter-grid-3">
                        <div class="ut-field ut-field-search">
                            <label><i class="fas fa-magnifying-glass"></i>${this.t("module.userTasks.search","\u0628\u062D\u062B")}</label>
                            <div class="ut-search-wrap">
                                <i class="fas fa-search ut-search-ico"></i>
                                <input type="text" id="user-task-search-input" placeholder="${this.t("module.userTasks.searchTasksPlaceholder","\u0627\u0628\u062D\u062B \u0628\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629 \u0623\u0648 \u0627\u0644\u0648\u0635\u0641...")}">
                            </div>
                        </div>
                        <div class="ut-field">
                            <label><i class="fas fa-circle-check"></i>${this.t("module.userTasks.status","\u0627\u0644\u062D\u0627\u0644\u0629")}</label>
                            <select id="user-task-status-filter">
                                <option value="">${this.t("module.userTasks.allStatuses","\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A")}</option>
                                <option value="\u062C\u062F\u064A\u062F\u0629">${this.t("module.userTasks.statusNew","\u062C\u062F\u064A\u062F\u0629")}</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630">${this.t("module.userTasks.inProgress","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")}</option>
                                <option value="\u0645\u0643\u062A\u0645\u0644">${this.t("module.userTasks.completed","\u0645\u0643\u062A\u0645\u0644\u0629")}</option>
                            </select>
                        </div>
                        <div class="ut-field">
                            <label><i class="fas fa-flag"></i>${this.t("module.userTasks.priority","\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629")}</label>
                            <select id="user-task-priority-filter">
                                <option value="">${this.t("module.userTasks.allPriorities","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0627\u062A")}</option>
                                <option value="\u0639\u0627\u0644\u064A">${this.t("module.userTasks.priorityHigh","\u0639\u0627\u0644\u064A")}</option>
                                <option value="\u0645\u062A\u0648\u0633\u0637">${this.t("module.userTasks.priorityMedium","\u0645\u062A\u0648\u0633\u0637")}</option>
                                <option value="\u0645\u0646\u062E\u0641\u0636">${this.t("module.userTasks.priorityLow","\u0645\u0646\u062E\u0641\u0636")}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="user-tasks-list-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},setupUserDashboardListeners(){setTimeout(()=>{const e=document.getElementById("user-refresh-tasks-btn");e&&e.addEventListener("click",async()=>{Notification.info("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B..."),await this.syncTasks()});const t=document.getElementById("user-export-tasks-pdf-btn");t&&t.addEventListener("click",()=>this.exportUserTasksToPDF());const s=document.getElementById("user-task-status-filter"),a=document.getElementById("user-task-priority-filter"),i=document.getElementById("user-task-search-input");if(s&&s.addEventListener("change",()=>this.loadUserTasks()),a&&a.addEventListener("change",()=>this.loadUserTasks()),i){let l;i.addEventListener("input",d=>{clearTimeout(l),l=setTimeout(()=>{this.filterUserTasks(d.target.value)},this.config.debounceDelay)})}const r=document.getElementById("user-task-filter-reset");r&&r.addEventListener("click",()=>{s&&(s.value=""),a&&(a.value=""),i&&(i.value=""),this.loadUserTasks()})},100)},async loadUserTasks(e=1){const t=document.getElementById("user-tasks-list-container");if(t)try{if(typeof AppState>"u"||!AppState.appData){t.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                        <p class="text-yellow-600">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                    </div>
                `;return}const s=AppState.currentUser?.id||AppState.currentUser?.email;if(!s){t.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-user-slash text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</p>
                    </div>
                `;return}let a=(AppState.appData.userTasks||[]).filter(n=>(n.userId||n.assignedTo)===s);const i=document.getElementById("user-task-status-filter")?.value,r=document.getElementById("user-task-priority-filter")?.value;i&&(a=a.filter(n=>(n.status||"")===i)),r&&(a=a.filter(n=>(n.priority||"")===r)),a.sort((n,o)=>{const c=new Date(n.createdAt||0);return new Date(o.createdAt||0)-c}),this.renderUserTasks(a,e);const l=(AppState.appData.userTasks||[]).filter(n=>(n.userId||n.assignedTo)===s);this.updateUserStats(l);const d=document.getElementById("last-sync-time");if(d){const n=new Date;d.textContent=`\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B: ${n.toLocaleTimeString("ar-EG")}`}}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0647\u0627\u0645:",s),t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                    <p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0647\u0627\u0645</p>
                    <button onclick="UserTasks.loadUserTasks()" class="btn-primary mt-4">
                        <i class="fas fa-redo ml-2"></i>
                        \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                    </button>
                </div>
            `}},renderUserTasks(e,t=1,s=50){const a=document.getElementById("user-tasks-list-container");if(!a)return;if(e.length===0){a.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-tasks text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0647\u0627\u0645</p>
                </div>
            `,this.applyModuleI18n(a);return}const i=Math.ceil(e.length/s),r=(t-1)*s,l=Math.min(r+s,e.length),d=e.slice(r,l),n=new Date;a.innerHTML=`
            ${e.length>s?`
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
                    <span class="text-sm text-blue-800">
                        <i class="fas fa-info-circle ml-2"></i>
                        \u0639\u0631\u0636 ${r+1} - ${l} \u0645\u0646 ${e.length} \u0645\u0647\u0645\u0629
                    </span>
                    <div class="flex gap-2">
                        ${t>1?`
                            <button onclick="UserTasks.loadUserTasks(${t-1})" class="btn-icon btn-icon-secondary text-xs">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        `:""}
                        <span class="text-sm text-gray-600 px-2 py-1">\u0635\u0641\u062D\u0629 ${t} \u0645\u0646 ${i}</span>
                        ${t<i?`
                            <button onclick="UserTasks.loadUserTasks(${t+1})" class="btn-icon btn-icon-secondary text-xs">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                        `:""}
                    </div>
                </div>
            `:""}
            <div class="space-y-3">
                ${d.map(o=>{const c=o.dueDate&&new Date(o.dueDate)<n&&o.status!=="\u0645\u0643\u062A\u0645\u0644"&&o.status!=="completed",p=o.priority==="\u0639\u0627\u0644\u064A"?"badge-danger":o.priority==="\u0645\u0646\u062E\u0641\u0636"?"badge-success":"badge-warning",u=o.status==="\u0645\u0643\u062A\u0645\u0644"||o.status==="completed"?"badge-success":o.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||o.status==="in-progress"?"badge-info":"badge-secondary";return`
                        <div class="content-card ${c?"border-red-300 bg-red-50":""}" data-task-id="${o.id}" data-search="${(o.title||o.taskTitle||"").toLowerCase()} ${(o.description||o.taskDescription||"").toLowerCase()}">
                            <div class="flex items-start justify-between gap-4">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h3 class="font-semibold text-gray-900">${Utils.escapeHTML(o.title||o.taskTitle||"")}</h3>
                                        <span class="badge ${p}">${Utils.escapeHTML(o.priority||"\u0645\u062A\u0648\u0633\u0637")}</span>
                                        <span class="badge ${u}">${Utils.escapeHTML(o.status||"\u062C\u062F\u064A\u062F\u0629")}</span>
                                        ${c?'<span class="badge badge-danger">\u0645\u062A\u0623\u062E\u0631\u0629</span>':""}
                                    </div>
                                    ${o.description||o.taskDescription?`
                                        <p class="text-sm text-gray-600 mb-2">${Utils.escapeHTML((o.description||o.taskDescription).substring(0,150))}${(o.description||o.taskDescription).length>150?"...":""}</p>
                                    `:""}
                                    <div class="flex items-center gap-4 text-xs text-gray-500">
                                        ${o.dueDate?`<span><i class="fas fa-calendar ml-1"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642: ${Utils.formatDate(o.dueDate)}</span>`:""}
                                        ${o.taskType?`<span><i class="fas fa-tag ml-1"></i>${Utils.escapeHTML(o.taskType)}</span>`:""}
                                        ${o.createdAt?`<span><i class="fas fa-clock ml-1"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0636\u0627\u0641\u0629: ${Utils.formatDate(o.createdAt)}</span>`:""}
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="UserTasks.viewUserTask('${o.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="UserTasks.updateTaskStatus('${o.id}')" class="btn-icon btn-icon-primary" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `}).join("")}
            </div>
        `,this.applyModuleI18n(a)},updateUserStats(e=null){const t=AppState.currentUser?.id||AppState.currentUser?.email;e||(e=(AppState.appData.userTasks||[]).filter(i=>(i.userId||i.assignedTo)===t));const s=new Date,a={total:e.length,new:e.filter(i=>i.status==="\u062C\u062F\u064A\u062F\u0629"||!i.status).length,inProgress:e.filter(i=>i.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||i.status==="in-progress").length,completed:e.filter(i=>i.status==="\u0645\u0643\u062A\u0645\u0644"||i.status==="completed").length,overdue:e.filter(i=>i.status==="\u0645\u0643\u062A\u0645\u0644"||i.status==="completed"||!i.dueDate?!1:new Date(i.dueDate)<s).length};document.getElementById("user-total-tasks").textContent=a.total,document.getElementById("user-new-tasks").textContent=a.new,document.getElementById("user-in-progress-tasks").textContent=a.inProgress,document.getElementById("user-completed-tasks").textContent=a.completed,document.getElementById("user-overdue-tasks").textContent=a.overdue},filterUserTasks(e){e=e.toLowerCase().trim(),document.querySelectorAll("#user-tasks-list-container [data-task-id]").forEach(s=>{const a=s.getAttribute("data-search");!e||a.includes(e)?s.style.display="":s.style.display="none"})},async viewUserTask(e){const t=AppState.appData.userTasks.find(r=>r.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0647\u0645\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const s=t.priority==="\u0639\u0627\u0644\u064A"?"badge-danger":t.priority==="\u0645\u0646\u062E\u0641\u0636"?"badge-success":"badge-warning",a=t.status==="\u0645\u0643\u062A\u0645\u0644"||t.status==="completed"?"badge-success":t.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||t.status==="in-progress"?"badge-info":"badge-secondary",i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-container" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-tasks ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0647\u0645\u0629
                    </h2>
                    <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629</label>
                            <p class="text-gray-900 font-semibold">${Utils.escapeHTML(t.title||t.taskTitle||"")}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                                <p><span class="badge ${s}">${Utils.escapeHTML(t.priority||"\u0645\u062A\u0648\u0633\u0637")}</span></p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <p><span class="badge ${a}">${Utils.escapeHTML(t.status||"\u062C\u062F\u064A\u062F\u0629")}</span></p>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</label>
                                <p class="text-gray-900">${t.dueDate?Utils.formatDate(t.dueDate):"\u2014"}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u0646\u0648\u0639 \u0627\u0644\u0645\u0647\u0645\u0629</label>
                                <p class="text-gray-900">${Utils.escapeHTML(t.taskType||t.type||"\u2014")}</p>
                            </div>
                        </div>
                        ${t.description||t.taskDescription?`
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0648\u0635\u0641</label>
                                <p class="text-gray-900 whitespace-pre-wrap">${Utils.escapeHTML(t.description||t.taskDescription)}</p>
                            </div>
                        `:""}
                        ${t.notes?`
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                <p class="text-gray-900 whitespace-pre-wrap">${Utils.escapeHTML(t.notes)}</p>
                            </div>
                        `:""}
                        <div class="grid grid-cols-2 gap-4 text-xs text-gray-500">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0636\u0627\u0641\u0629</label>
                                <p class="text-gray-900">${t.createdAt?Utils.formatDate(t.createdAt):"\u2014"}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B</label>
                                <p class="text-gray-900">${t.updatedAt?Utils.formatDate(t.updatedAt):"\u2014"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-primary" onclick="UserTasks.updateTaskStatus('${e}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629
                    </button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times ml-2"></i>
                        \u0625\u063A\u0644\u0627\u0642
                    </button>
                </div>
            </div>
        `,this.applyModuleI18n(i),document.body.appendChild(i)},async updateTaskStatus(e){const t=AppState.appData.userTasks.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0647\u0645\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-container" style="max-width: 500px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0647\u0645\u0629
                    </h2>
                    <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="update-task-status-form">
                    <div class="modal-body">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629</label>
                                <p class="text-gray-900">${Utils.escapeHTML(t.title||t.taskTitle||"")}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                <select id="update-task-status" class="form-input" required>
                                    <option value="\u062C\u062F\u064A\u062F\u0629" ${t.status==="\u062C\u062F\u064A\u062F\u0629"||!t.status?"selected":""}>\u062C\u062F\u064A\u062F\u0629</option>
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630" ${t.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||t.status==="in-progress"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                    <option value="\u0645\u0643\u062A\u0645\u0644" ${t.status==="\u0645\u0643\u062A\u0645\u0644"||t.status==="completed"?"selected":""}>\u0645\u0643\u062A\u0645\u0644\u0629</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                                <textarea id="update-task-notes" class="form-input" rows="3" placeholder="\u0623\u0636\u0641 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0648\u0644 \u0627\u0644\u062A\u0642\u062F\u0645...">${Utils.escapeHTML(t.notes||"")}</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u062F\u064A\u062B
                        </button>
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times ml-2"></i>
                            \u0625\u0644\u063A\u0627\u0621
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(s),document.getElementById("update-task-status-form").addEventListener("submit",async i=>{i.preventDefault();const r=document.getElementById("update-task-status").value,l=document.getElementById("update-task-notes").value.trim();try{const d=AppState.appData.userTasks.findIndex(n=>n.id===e);if(d!==-1){if(AppState.appData.userTasks[d]={...AppState.appData.userTasks[d],status:r,notes:l,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const n=await GoogleIntegration.sendRequest({action:"updateUserTask",data:{taskId:e,updateData:{status:r,notes:l}}});if(n&&n.success===!1)throw new Error(n.message||"\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0647\u0645\u0629")}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0641\u064A Google Sheets:",n)}Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 \u0628\u0646\u062C\u0627\u062D"),s.remove(),await this.loadUserTasks()}}catch(d){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0647\u0645\u0629:",d),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0647\u0645\u0629")}})},async exportUserTasksToPDF(){try{Loading.show();const e=AppState.currentUser?.id||AppState.currentUser?.email,t=(AppState.appData.userTasks||[]).filter(c=>(c.userId||c.assignedTo)===e);if(t.length===0){Loading.hide(),Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0647\u0627\u0645 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const s=AppState.currentUser?.name||AppState.currentUser?.displayName||"\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",a=t.map((c,p)=>`
                    <tr>
                        <td>${p+1}</td>
                        <td>${Utils.escapeHTML(c.title||c.taskTitle||"")}</td>
                        <td>${Utils.escapeHTML(c.priority||"\u0645\u062A\u0648\u0633\u0637")}</td>
                        <td>${Utils.escapeHTML(c.status||"\u062C\u062F\u064A\u062F\u0629")}</td>
                        <td>${c.dueDate?Utils.formatDate(c.dueDate):"\u2014"}</td>
                    </tr>
                `).join(""),i=`
                <div class="summary-grid">
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</span>
                        <span class="summary-value">${Utils.escapeHTML(s)}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0639\u062F\u062F \u0627\u0644\u0645\u0647\u0627\u0645</span>
                        <span class="summary-value">${t.length}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631</span>
                        <span class="summary-value">${Utils.formatDate(new Date)}</span>
                    </div>
                </div>
                <div class="section-title">\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0647\u0627\u0645</div>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th style="width: 50px;">#</th>
                            <th>\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629</th>
                            <th style="width: 100px;">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</th>
                            <th style="width: 100px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th style="width: 120px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${a}
                    </tbody>
                </table>
            `,r=`USER-TASKS-${e?.substring(0,8)||"UNKNOWN"}-${new Date().toISOString().slice(0,10)}`,l=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(r,"\u062A\u0642\u0631\u064A\u0631 \u0645\u0647\u0627\u0645\u064A \u0627\u0644\u0634\u062E\u0635\u064A\u0629",i,!1,!0,{version:"1.0",source:"UserTasks",user:s,qrData:{type:"UserTasks",userId:e,userName:s,count:t.length}},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u0645\u0647\u0627\u0645\u064A \u0627\u0644\u0634\u062E\u0635\u064A\u0629</title></head><body>${i}</body></html>`,d=new Blob([l],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(d),o=window.open(n,"_blank");o?o.onload=()=>{setTimeout(()=>{o.print(),setTimeout(()=>{URL.revokeObjectURL(n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")},1e3)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")}},getStats(){this.ensureData();const e=AppState.appData.userTasks||[],t=new Date;return{total:e.length,completed:e.filter(s=>s.status==="\u0645\u0643\u062A\u0645\u0644"||s.status==="completed").length,inProgress:e.filter(s=>s.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||s.status==="in-progress").length,overdue:e.filter(s=>s.status==="\u0645\u0643\u062A\u0645\u0644"||s.status==="completed"||!s.dueDate?!1:new Date(s.dueDate)<t).length}},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-task-btn");e&&e.addEventListener("click",()=>this.showTaskForm());const t=document.getElementById("task-user-filter"),s=document.getElementById("task-status-filter"),a=document.getElementById("task-priority-filter"),i=document.getElementById("task-search-input");if(t&&t.addEventListener("change",()=>this.loadTasks()),s&&s.addEventListener("change",()=>this.loadTasks()),a&&a.addEventListener("change",()=>this.loadTasks()),i){let n;i.addEventListener("input",o=>{clearTimeout(n),n=setTimeout(()=>{this.filterTasks(o.target.value)},this.config.debounceDelay)})}const r=document.getElementById("task-filter-reset");r&&r.addEventListener("click",()=>{t&&(t.value=""),s&&(s.value=""),a&&(a.value=""),i&&(i.value=""),this.loadTasks()});const l=document.getElementById("export-tasks-pdf-btn"),d=document.getElementById("export-tasks-excel-btn");l&&l.addEventListener("click",()=>this.exportToPDF()),d&&d.addEventListener("click",()=>this.exportToExcel())},100)},async loadMembers(){try{if(this.cache.members&&this.cache.lastLoad&&Date.now()-this.cache.lastLoad<this.config.cacheTimeout){this.populateMemberFilter(this.cache.members);return}if(AppState.googleConfig.appsScript.enabled)try{const t=await GoogleIntegration.readFromSheets("Users");if(t&&Array.isArray(t)){this.cache.members=t,this.cache.lastLoad=Date.now(),this.populateMemberFilter(t),await this.loadTasks();return}}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u0646 Google Sheets:",t)}const e=AppState.appData.users||[];this.cache.members=e,this.cache.lastLoad=Date.now(),this.populateMemberFilter(e),await this.loadTasks()}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646:",e),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646")}},populateMemberFilter(e){const t=document.getElementById("task-user-filter");t&&(t.innerHTML='<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</option>',e.forEach(s=>{const a=document.createElement("option");a.value=s.id||s.email,a.textContent=s.name||s.email||s.fullName||"\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",t.appendChild(a)}))},async loadTasks(){const e=document.getElementById("tasks-list-container");if(e)try{this.ensureData();let t=AppState.appData.userTasks||[];const s=document.getElementById("task-user-filter")?.value,a=document.getElementById("task-status-filter")?.value,i=document.getElementById("task-priority-filter")?.value;s&&(t=t.filter(r=>(r.userId||r.assignedTo)===s)),a&&(t=t.filter(r=>(r.status||"")===a)),i&&(t=t.filter(r=>(r.priority||"")===i)),t.sort((r,l)=>{const d=new Date(r.createdAt||r.dueDate||0);return new Date(l.createdAt||l.dueDate||0)-d}),this.renderTasks(t),this.updateStats()}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0647\u0627\u0645:",t),e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                    <p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0647\u0627\u0645</p>
                    <button onclick="UserTasks.loadTasks()" class="btn-primary mt-4">
                        <i class="fas fa-redo ml-2"></i>
                        \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                    </button>
                </div>
            `}},renderTasks(e){const t=document.getElementById("tasks-list-container");if(t){if(e.length===0){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-tasks text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0647\u0627\u0645</p>
                    <button onclick="UserTasks.showTaskForm()" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0645\u0647\u0645\u0629 \u062C\u062F\u064A\u062F\u0629
                    </button>
                </div>
            `,this.applyModuleI18n(t);return}t.innerHTML=`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629</th>
                            <th>\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th>
                            <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0647\u0645\u0629</th>
                            <th>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(s=>{const a=this.getUserName(s.userId||s.assignedTo),i=s.priority==="\u0639\u0627\u0644\u064A"?"badge-danger":s.priority==="\u0645\u0646\u062E\u0641\u0636"?"badge-success":"badge-warning",r=s.status==="\u0645\u0643\u062A\u0645\u0644"?"badge-success":s.status==="\u0645\u0644\u063A\u064A"?"badge-danger":"badge-info",l=s.dueDate?Utils.formatDate(s.dueDate):"\u2014",d=s.createdAt?Utils.formatDate(s.createdAt):"\u2014",n=s.dueDate&&new Date(s.dueDate)<new Date&&s.status!=="\u0645\u0643\u062A\u0645\u0644";return`
                                <tr class="${n?"bg-red-50":""}" data-task-id="${s.id}" data-search="${(s.title||s.taskTitle||"").toLowerCase()} ${(s.description||s.taskDescription||"").toLowerCase()}">
                                    <td>
                                        <div class="font-semibold text-gray-900">${Utils.escapeHTML(s.title||s.taskTitle||"")}</div>
                                        ${s.description||s.taskDescription?`<div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML((s.description||s.taskDescription).substring(0,50))}${(s.description||s.taskDescription).length>50?"...":""}</div>`:""}
                                    </td>
                                    <td>${Utils.escapeHTML(a)}</td>
                                    <td>${Utils.escapeHTML(s.taskType||s.type||"\u2014")}</td>
                                    <td><span class="badge ${i}">${Utils.escapeHTML(s.priority||"\u0645\u062A\u0648\u0633\u0637")}</span></td>
                                    <td><span class="badge ${r}">${Utils.escapeHTML(s.status||"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")}</span></td>
                                    <td class="${n?"text-red-600 font-semibold":""}">${l}</td>
                                    <td>${d}</td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button onclick="UserTasks.viewTask('${s.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button onclick="UserTasks.editTask('${s.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button onclick="UserTasks.deleteTask('${s.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `,this.applyModuleI18n(t)}},getUserName(e){if(!e)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const s=(this.cache.members||AppState.appData.users||[]).find(a=>(a.id||a.email)===e);return s?s.name||s.fullName||s.email||"\u0645\u0633\u062A\u062E\u062F\u0645":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},filterTasks(e){const t=e.trim().toLowerCase();document.querySelectorAll("#tasks-list-container tbody tr[data-task-id]").forEach(a=>{if(!t){a.style.display="";return}const i=a.getAttribute("data-search")||"";a.style.display=i.includes(t)?"":"none"})},updateStats(){const e=this.getStats(),t=document.getElementById("total-tasks-count"),s=document.getElementById("completed-tasks-count"),a=document.getElementById("in-progress-tasks-count"),i=document.getElementById("overdue-tasks-count");t&&(t.textContent=e.total),s&&(s.textContent=e.completed),a&&(a.textContent=e.inProgress),i&&(i.textContent=e.overdue)},showTaskForm(e=null,t={}){const s=t||{},a=this.cache.members||AppState.appData.users||[],i=AppState.currentUser?.id||AppState.currentUser?.email||"",r=s.lockUserId===!0,l=r?i:e?e.userId||e.assignedTo:i,d=e&&e.dueDate?Utils.formatDateForInput(e.dueDate):s.dueDate?typeof Utils.formatDateForInput=="function"?Utils.formatDateForInput(s.dueDate):String(s.dueDate).slice(0,10):"",n=r?`<input type="hidden" id="task-user-id" value="${Utils.escapeHTML(l)}">
               <p class="text-sm text-gray-600 sc-task-locked-user">
                   <i class="fas fa-user ml-1"></i>
                   \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${Utils.escapeHTML(AppState.currentUser?.name||AppState.currentUser?.fullName||AppState.currentUser?.email||"\u0623\u0646\u062A")}
               </p>`:`<div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 *</label>
                            <select id="task-user-id" class="form-input" required>
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</option>
                                ${a.map(p=>`
                                    <option value="${p.id||p.email}" ${(p.id||p.email)===l?"selected":""}>
                                        ${Utils.escapeHTML(p.name||p.fullName||p.email||"\u0645\u0633\u062A\u062E\u062F\u0645")}
                                    </option>
                                `).join("")}
                            </select>
                        </div>`,o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-tasks ml-2"></i>
                        ${e?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0647\u0645\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0647\u0645\u0629 \u062C\u062F\u064A\u062F\u0629"}
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="task-form">
                    <div class="modal-body space-y-4">
                        ${n}
                        <div>
                            <label for="task-title" class="block text-sm font-semibold text-gray-700 mb-2">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629 *</label>
                            <input type="text" id="task-title" class="form-input" required 
                                placeholder="\u0623\u062F\u062E\u0644 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629" 
                                value="${e?Utils.escapeHTML(e.title||e.taskTitle||""):""}">
                        </div>
                        <div>
                            <label for="task-description" class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0645\u0629</label>
                            <textarea id="task-description" class="form-input" rows="4" 
                                placeholder="\u0623\u062F\u062E\u0644 \u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0645\u0629">${e?Utils.escapeHTML(e.description||e.taskDescription||""):""}</textarea>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="task-type" class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0645\u0647\u0645\u0629</label>
                                <select id="task-type" class="form-input">
                                    <option value="\u062A\u0641\u062A\u064A\u0634" ${e&&(e.taskType||e.type)==="\u062A\u0641\u062A\u064A\u0634"?"selected":""}>\u062A\u0641\u062A\u064A\u0634</option>
                                    <option value="\u062A\u062F\u0631\u064A\u0628" ${e&&(e.taskType||e.type)==="\u062A\u062F\u0631\u064A\u0628"?"selected":""}>\u062A\u062F\u0631\u064A\u0628</option>
                                    <option value="\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A" ${e&&(e.taskType||e.type)==="\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A"?"selected":""}>\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A</option>
                                    <option value="\u0645\u0631\u0627\u062C\u0639\u0629" ${e&&(e.taskType||e.type)==="\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                    <option value="\u0623\u062E\u0631\u0649" ${e&&(e.taskType||e.type)==="\u0623\u062E\u0631\u0649"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                                </select>
                            </div>
                            <div>
                                <label for="task-priority" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                                <select id="task-priority" class="form-input">
                                    <option value="\u0645\u0646\u062E\u0641\u0636" ${e&&e.priority==="\u0645\u0646\u062E\u0641\u0636"?"selected":""}>\u0645\u0646\u062E\u0641\u0636</option>
                                    <option value="\u0645\u062A\u0648\u0633\u0637" ${!e||e.priority==="\u0645\u062A\u0648\u0633\u0637"?"selected":""}>\u0645\u062A\u0648\u0633\u0637</option>
                                    <option value="\u0639\u0627\u0644\u064A" ${e&&e.priority==="\u0639\u0627\u0644\u064A"?"selected":""}>\u0639\u0627\u0644\u064A</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</label>
                                <input type="date" id="task-due-date" class="form-input" 
                                    value="${d}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <select id="task-status" class="form-input">
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630" ${!e||e.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                    <option value="\u0645\u0643\u062A\u0645\u0644" ${e&&e.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                                    <option value="\u0645\u0644\u063A\u064A" ${e&&e.status==="\u0645\u0644\u063A\u064A"?"selected":""}>\u0645\u0644\u063A\u064A</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                            <textarea id="task-notes" class="form-input" rows="3" 
                                placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${e?Utils.escapeHTML(e.notes||""):""}</textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            ${e?"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0647\u0645\u0629":"\u062D\u0641\u0638 \u0627\u0644\u0645\u0647\u0645\u0629"}
                        </button>
                    </div>
                </form>
            </div>
        `,this.applyModuleI18n(o),document.body.appendChild(o);const c=()=>o.remove();o.querySelector(".modal-close")?.addEventListener("click",c),o.querySelector('[data-action="close"]')?.addEventListener("click",c),o.addEventListener("click",p=>{p.target===o&&c()}),o.querySelector("#task-form")?.addEventListener("submit",async p=>{p.preventDefault(),await this.saveTask(e,o,s)})},async saveTask(e,t,s={}){try{const a={userId:document.getElementById("task-user-id").value,title:document.getElementById("task-title").value.trim(),description:document.getElementById("task-description").value.trim(),taskType:document.getElementById("task-type").value,priority:document.getElementById("task-priority").value,dueDate:document.getElementById("task-due-date").value||null,status:document.getElementById("task-status").value,notes:document.getElementById("task-notes").value.trim(),assignedBy:AppState.currentUser?.id||AppState.currentUser?.email||AppState.currentUser?.name||"",createdAt:e?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};if(!a.userId||!a.title){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A\u0629");return}Loading.show(),this.ensureData();let i=e?e.id:Utils.generateId("TASK");if(e){const l=AppState.appData.userTasks.findIndex(d=>d.id===e.id);l!==-1&&(AppState.appData.userTasks[l]={...e,...a,id:e.id})}else AppState.appData.userTasks.push({id:i,...a});if(typeof window.DataManager<"u"&&window.DataManager.save)window.DataManager.save();else throw Utils.safeError("\u274C DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u0647\u0645\u0629"),new Error("\u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u062C\u0627\u0647\u0632");if(AppState.googleConfig&&AppState.googleConfig.appsScript&&AppState.googleConfig.appsScript.enabled&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{if(e){const l=await GoogleIntegration.sendRequest({action:"updateUserTask",data:{taskId:i,updateData:{...a}}});if(l&&l.success===!1)throw new Error(l.message||"\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0647\u0645\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645")}else{const l=await GoogleIntegration.sendRequest({action:"addUserTask",data:{id:i,...a}});if(l&&l.success===!1)throw new Error(l.message||"\u0641\u0634\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645")}}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0647\u0645\u0629 \u0641\u064A Google Sheets:",l)}Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0647\u0645\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 \u0628\u0646\u062C\u0627\u062D"),t.remove();const r=e?AppState.appData.userTasks.find(l=>l.id===i):{id:i,...a};typeof s.onSaved=="function"&&s.onSaved(r),s.skipModuleReload||(await this.loadTasks(),this.updateStats())}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0647\u0645\u0629:",a),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u0647\u0645\u0629: "+a.message)}finally{Loading.hide()}},viewTask(e){this.ensureData();const t=AppState.appData.userTasks.find(d=>d.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0647\u0645\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const s=this.getUserName(t.userId||t.assignedTo),a=t.priority==="\u0639\u0627\u0644\u064A"?"badge-danger":t.priority==="\u0645\u0646\u062E\u0641\u0636"?"badge-success":"badge-warning",i=t.status==="\u0645\u0643\u062A\u0645\u0644"?"badge-success":t.status==="\u0645\u0644\u063A\u064A"?"badge-danger":"badge-info",r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-eye ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0647\u0645\u0629
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 1.5rem;">
                    <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629 -->
                    <div style="margin-bottom: 1.5rem;">
                        <h3 style="font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
                            <i class="fas fa-info-circle ml-2"></i>
                            \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629
                        </h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                                <label class="block text-sm font-semibold text-gray-700 mb-2" style="color: var(--text-secondary);">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</label>
                                <p class="text-gray-900" style="color: var(--text-primary); font-size: 0.9375rem; margin: 0;">${Utils.escapeHTML(s)}</p>
                            </div>
                            <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                                <label class="block text-sm font-semibold text-gray-700 mb-2" style="color: var(--text-secondary);">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629</label>
                                <p class="text-gray-900 font-semibold" style="color: var(--text-primary); font-size: 0.9375rem; margin: 0;">${Utils.escapeHTML(t.title||t.taskTitle||"\u2014")}</p>
                            </div>
                            <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                                <label class="block text-sm font-semibold text-gray-700 mb-2" style="color: var(--text-secondary);">\u0646\u0648\u0639 \u0627\u0644\u0645\u0647\u0645\u0629</label>
                                <p class="text-gray-900" style="color: var(--text-primary); font-size: 0.9375rem; margin: 0;">${Utils.escapeHTML(t.taskType||t.type||"\u2014")}</p>
                            </div>
                            <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                                <label class="block text-sm font-semibold text-gray-700 mb-2" style="color: var(--text-secondary);">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                                <p style="margin: 0;"><span class="badge ${a}">${Utils.escapeHTML(t.priority||"\u0645\u062A\u0648\u0633\u0637")}</span></p>
                            </div>
                            <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                                <label class="block text-sm font-semibold text-gray-700 mb-2" style="color: var(--text-secondary);">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <p style="margin: 0;"><span class="badge ${i}">${Utils.escapeHTML(t.status||"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")}</span></p>
                            </div>
                            <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                                <label class="block text-sm font-semibold text-gray-700 mb-2" style="color: var(--text-secondary);">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</label>
                                <p class="text-gray-900" style="color: var(--text-primary); font-size: 0.9375rem; margin: 0;">${t.dueDate?Utils.formatDate(t.dueDate):"\u2014"}</p>
                            </div>
                        </div>
                    </div>

                    <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E -->
                    <div style="margin-bottom: 1.5rem;">
                        <h3 style="font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E
                        </h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                                <label class="block text-sm font-semibold text-gray-700 mb-2" style="color: var(--text-secondary);">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</label>
                                <p class="text-gray-900" style="color: var(--text-primary); font-size: 0.9375rem; margin: 0;">${t.createdAt?Utils.formatDate(t.createdAt):"\u2014"}</p>
                            </div>
                            <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                                <label class="block text-sm font-semibold text-gray-700 mb-2" style="color: var(--text-secondary);">\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B</label>
                                <p class="text-gray-900" style="color: var(--text-primary); font-size: 0.9375rem; margin: 0;">${t.updatedAt?Utils.formatDate(t.updatedAt):"\u2014"}</p>
                            </div>
                        </div>
                    </div>

                    ${t.description||t.taskDescription?`
                        <!-- \u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0645\u0629 -->
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
                                <i class="fas fa-align-right ml-2"></i>
                                \u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0645\u0629
                            </h3>
                            <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color); min-height: 60px;">
                                <p class="text-gray-900 whitespace-pre-wrap" style="color: var(--text-primary); font-size: 0.9375rem; line-height: 1.6; margin: 0;">${Utils.escapeHTML(t.description||t.taskDescription)}</p>
                            </div>
                        </div>
                    `:""}
                    ${t.notes?`
                        <!-- \u0645\u0644\u0627\u062D\u0638\u0627\u062A -->
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
                                <i class="fas fa-sticky-note ml-2"></i>
                                \u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </h3>
                            <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color); min-height: 60px;">
                                <p class="text-gray-900 whitespace-pre-wrap" style="color: var(--text-primary); font-size: 0.9375rem; line-height: 1.6; margin: 0;">${Utils.escapeHTML(t.notes)}</p>
                            </div>
                        </div>
                    `:""}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" class="btn-primary" onclick="UserTasks.editTask('${e}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(r);const l=()=>r.remove();r.querySelector(".modal-close")?.addEventListener("click",l),r.querySelector('[data-action="close"]')?.addEventListener("click",l),r.addEventListener("click",d=>{d.target===r&&l()})},editTask(e){this.ensureData();const t=AppState.appData.userTasks.find(s=>s.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0647\u0645\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}this.showTaskForm(t)},async deleteTask(e){if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u0647\u0645\u0629\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`))try{Loading.show(),this.ensureData();const t=AppState.appData.userTasks.findIndex(s=>s.id===e);if(t!==-1){if(AppState.appData.userTasks.splice(t,1),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const s=await GoogleIntegration.sendRequest({action:"deleteUserTask",data:{taskId:e}});if(s&&s.success===!1)throw new Error(s.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0647\u0645\u0629")}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0647\u0645\u0629 \u0645\u0646 Google Sheets:",s)}Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0647\u0645\u0629 \u0628\u0646\u062C\u0627\u062D"),await this.loadTasks(),this.updateStats()}else Notification.error("\u0627\u0644\u0645\u0647\u0645\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629")}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0647\u0645\u0629:",t),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0647\u0645\u0629: "+t.message)}finally{Loading.hide()}},async exportToPDF(){try{Loading.show(),this.ensureData();const e=AppState.appData.userTasks||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0647\u0627\u0645 \u0644\u0644\u062A\u0635\u062F\u064A\u0631"),Loading.hide();return}const t=this.getStats(),s=e.map((o,c)=>{const p=this.getUserName(o.userId||o.assignedTo);return`
                    <tr>
                        <td>${c+1}</td>
                        <td>${Utils.escapeHTML(o.title||o.taskTitle||"")}</td>
                        <td>${Utils.escapeHTML(p)}</td>
                        <td>${Utils.escapeHTML(o.taskType||o.type||"\u2014")}</td>
                        <td>${Utils.escapeHTML(o.priority||"\u0645\u062A\u0648\u0633\u0637")}</td>
                        <td>${Utils.escapeHTML(o.status||"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")}</td>
                        <td>${o.dueDate?Utils.formatDate(o.dueDate):"\u2014"}</td>
                        <td>${o.createdAt?Utils.formatDate(o.createdAt):"\u2014"}</td>
                    </tr>
                `}).join(""),a=`
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 20px; margin-bottom: 12px;">\u062A\u0642\u0631\u064A\u0631 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</h2>
                    <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE;">
                            <div style="font-size: 12px; color: #1D4ED8;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0647\u0627\u0645</div>
                            <div style="font-size: 26px; font-weight: 700;">${t.total}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #ECFDF5; border: 1px solid #BBF7D0;">
                            <div style="font-size: 12px; color: #047857;">\u0645\u0647\u0627\u0645 \u0645\u0643\u062A\u0645\u0644\u0629</div>
                            <div style="font-size: 26px; font-weight: 700;">${t.completed}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FEF3C7; border: 1px solid #FDE68A;">
                            <div style="font-size: 12px; color: #92400E;">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</div>
                            <div style="font-size: 26px; font-weight: 700;">${t.inProgress}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FEE2E2; border: 1px solid #FECACA;">
                            <div style="font-size: 12px; color: #991B1B;">\u0645\u0647\u0627\u0645 \u0645\u062A\u0623\u062E\u0631\u0629</div>
                            <div style="font-size: 26px; font-weight: 700;">${t.overdue}</div>
                        </div>
                    </div>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #1E3A8A; color: #fff;">
                            <th style="padding: 10px; border: 1px solid #E5E7EB;">#</th>
                            <th style="padding: 10px; border: 1px solid #E5E7EB;">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629</th>
                            <th style="padding: 10px; border: 1px solid #E5E7EB;">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th>
                            <th style="padding: 10px; border: 1px solid #E5E7EB;">\u0627\u0644\u0646\u0648\u0639</th>
                            <th style="padding: 10px; border: 1px solid #E5E7EB;">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</th>
                            <th style="padding: 10px; border: 1px solid #E5E7EB;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th style="padding: 10px; border: 1px solid #E5E7EB;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</th>
                            <th style="padding: 10px; border: 1px solid #E5E7EB;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${s}
                    </tbody>
                </table>
            `,i=`USER-TASKS-${new Date().toISOString().slice(0,10)}`,r=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(i,"\u062A\u0642\u0631\u064A\u0631 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646",a,!1,!0,{source:"UserTasks"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u062A\u0642\u0631\u064A\u0631 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</title></head><body>${a}</body></html>`,l=new Blob([r],{type:"text/html;charset=utf-8"}),d=URL.createObjectURL(l),n=window.open(d,"_blank");n&&(n.onload=()=>{try{n.print(),setTimeout(()=>URL.revokeObjectURL(d),1e3)}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631:",o)}}),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 PDF \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+e.message)}},exportToExcel(){try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.");return}this.ensureData();const e=AppState.appData.userTasks||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0647\u0627\u0645 \u0644\u0644\u062A\u0635\u062F\u064A\u0631"),Loading.hide();return}const t=e.map((r,l)=>{const d=this.getUserName(r.userId||r.assignedTo);return{"#":l+1,"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629":r.title||r.taskTitle||"",\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:d,"\u0646\u0648\u0639 \u0627\u0644\u0645\u0647\u0645\u0629":r.taskType||r.type||"",\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:r.priority||"\u0645\u062A\u0648\u0633\u0637",\u0627\u0644\u062D\u0627\u0644\u0629:r.status||"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642":r.dueDate?Utils.formatDate(r.dueDate):"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":r.createdAt?Utils.formatDate(r.createdAt):"","\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B":r.updatedAt?Utils.formatDate(r.updatedAt):"",\u0627\u0644\u0648\u0635\u0641:r.description||r.taskDescription||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:r.notes||""}}),s=XLSX.utils.book_new(),a=XLSX.utils.json_to_sheet(t);a["!cols"]=[{wch:5},{wch:30},{wch:20},{wch:15},{wch:12},{wch:15},{wch:15},{wch:15},{wch:15},{wch:40},{wch:40}],XLSX.utils.book_append_sheet(s,a,"\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");const i=`\u0645\u0647\u0627\u0645_\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(s,i),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0647\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+e.message)}}};(function(){"use strict";try{typeof window<"u"&&typeof UserTasks<"u"&&(window.UserTasks=UserTasks,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 UserTasks module loaded and available on window.UserTasks"))}catch{if(typeof window<"u"&&typeof UserTasks<"u")try{window.UserTasks=UserTasks}catch{}}})();
