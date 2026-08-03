const ChangeManagement={applyModuleI18n(a){const t=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!t)return;const e=a||document.getElementById("change-management-section")||document;t.applyI18n(e),t.applyLiteralTranslations(e)},t(a,t){const e=window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null;return e?e.t(a,null,t||a):t||a},state:{currentView:"list",activeTab:"requests",lastRequests:[],filters:{status:"all",changeType:"all",priority:"all",impact:"all",relatedModule:"",search:"",startDate:"",endDate:""},currentRequest:null,_loadInProgress:!1,_searchDebounce:null},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);const a=document.getElementById("change-management-section");if(!a){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0642\u0633\u0645 change-management-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}try{a.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-exchange-alt ml-3"></i>
                                ${this.t("nav.changeManagement","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A")}
                            </h1>
                            <p class="section-subtitle">${this.t("module.changeManagement.subtitle","\u062A\u0633\u062C\u064A\u0644 \u0648\u0645\u0648\u0627\u0641\u0642\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062A\u063A\u064A\u064A\u0631 (\u062A\u0642\u0646\u064A\u060C \u0625\u062F\u0627\u0631\u064A\u060C \u062A\u0646\u0638\u064A\u0645\u064A)")}</p>
                        </div>
                        <div class="flex gap-2">
                            <button type="button" id="change-btn-statistics" class="btn-secondary" onclick="ChangeManagement.showStatistics()">
                                <i class="fas fa-chart-bar ml-2"></i>
                                \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A
                            </button>
                            <button type="button" id="change-btn-add" class="btn-primary" onclick="ChangeManagement.showCreateForm()">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="change-tabs flex gap-1 border-b border-gray-200 pb-0">
                        <button type="button" class="change-tab-btn tab-btn active" data-tab="requests" onclick="ChangeManagement.switchTab('requests')">
                            <i class="fas fa-list ml-2"></i> \u0627\u0644\u0637\u0644\u0628\u0627\u062A
                        </button>
                        <button type="button" class="change-tab-btn tab-btn" data-tab="register" onclick="ChangeManagement.switchTab('register')">
                            <i class="fas fa-history ml-2"></i> \u0633\u062C\u0644 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A
                        </button>
                        <button type="button" class="change-tab-btn tab-btn" data-tab="approvals" onclick="ChangeManagement.switchTab('approvals')">
                            <i class="fas fa-inbox ml-2"></i> \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629
                        </button>
                    </div>
                </div>
                <div class="mt-6" id="change-tab-requests">
                    ${this.renderRequestsListHTML()}
                </div>
                <div class="mt-6" id="change-tab-register" style="display:none;">
                    <div class="content-card" style="overflow:hidden;">
                        <div class="card-header border-b px-4 py-3" style="background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(14,165,233,0.08));text-align:center;">
                            <h3 class="card-title text-lg font-semibold" style="margin:0;">\u062C\u0645\u064A\u0639 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629 \u0645\u0639 \u062D\u0627\u0644\u062A\u0647\u0627</h3>
                        </div>
                        <div class="card-body" style="padding:0;">
                            <div id="change-register-list-container" style="max-height:480px;overflow-y:auto;overflow-x:auto;"><p class="text-gray-500 p-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0641\u064A \u0627\u0644\u0633\u062C\u0644</p></div>
                        </div>
                        <div class="card-footer" style="display:flex;justify-content:center;gap:8px;padding:1rem;border-top:1px solid var(--border-color);background:var(--bg-secondary);">
                            <button type="button" class="btn-secondary btn-sm" onclick="ChangeManagement.exportToExcel()" title="\u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 Excel">
                                <i class="fas fa-file-excel ml-2"></i> \u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                            <button type="button" class="btn-secondary btn-sm" onclick="ChangeManagement.exportToPDF()" title="\u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 PDF">
                                <i class="fas fa-file-pdf ml-2"></i> \u062A\u0635\u062F\u064A\u0631 PDF
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-6" id="change-tab-approvals" style="display:none;">
                    ${this.renderApprovalsListHTML()}
                </div>
            `,this.applyModuleI18n(a),this.setupEventListeners(),this.state._loadInProgress=!1,this.loadChangeRequests()}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0648\u062F\u064A\u0648\u0644 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A:",t),a.innerHTML=`
                <div class="section-header">
                    <h1 class="section-title"><i class="fas fa-exchange-alt ml-3"></i> \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</h1>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button type="button" onclick="ChangeManagement.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i> \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,this.applyModuleI18n(a)}},renderRequestsListHTML(){const a=this.state.filters||{},t=(i,r)=>a[i]!==void 0&&a[i]!==null&&a[i]!==""?String(a[i]):r,e=i=>String(i??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;"),s=e(a.search!==void 0&&a.search!==null?a.search:""),n=e(a.relatedModule&&a.relatedModule!=="all"?a.relatedModule:"");return`
            <div class="content-card cm-requests-panel" style="overflow:hidden;">
                <div class="card-header border-b px-4 py-3 cm-requests-card-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <div class="text-right flex-1 min-w-0">
                            <h3 class="card-title text-lg font-semibold" style="margin:0;">\u0627\u0644\u0637\u0644\u0628\u0627\u062A</h3>
                            <p class="text-sm text-gray-500 m-0 mt-1">\u0639\u0631\u0636 \u0648\u062A\u0635\u0641\u064A\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0641\u0646\u064A \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u064A</p>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="cm-requests-count-badge" id="change-requests-count" title="\u0639\u062F\u062F \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629">\u2014</span>
                            <button type="button" class="btn-secondary btn-sm" onclick="ChangeManagement.loadChangeRequests()" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629">
                                <i class="fas fa-sync-alt ml-1"></i> \u062A\u062D\u062F\u064A\u062B
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body" style="padding:0;">
                    <div class="cm-requests-toolbar">
                        <div class="cm-requests-toolbar-grid">
                            <div class="cm-requests-field cm-requests-field-span2">
                                <label class="cm-requests-label" for="change-search">\u0628\u062D\u062B</label>
                                <input type="search" id="change-search" class="form-input form-input-sm" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628\u060C \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u060C \u0627\u0644\u0645\u0642\u062F\u0645\u2026" value="${s}" autocomplete="off">
                            </div>
                            <div class="cm-requests-field">
                                <label class="cm-requests-label" for="change-status-filter">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <select id="change-status-filter" class="form-select form-select-sm">
                                    <option value="all" ${t("status","all")==="all"?"selected":""}>\u0627\u0644\u0643\u0644</option>
                                    <option value="Draft" ${t("status","all")==="Draft"?"selected":""}>\u0645\u0633\u0648\u062F\u0629</option>
                                    <option value="In Review" ${t("status","all")==="In Review"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                    <option value="Approved" ${t("status","all")==="Approved"?"selected":""}>\u0645\u0639\u062A\u0645\u062F</option>
                                    <option value="Rejected" ${t("status","all")==="Rejected"?"selected":""}>\u0645\u0631\u0641\u0648\u0636</option>
                                    <option value="In Implementation" ${t("status","all")==="In Implementation"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                    <option value="Completed" ${t("status","all")==="Completed"?"selected":""}>\u0645\u0646\u0641\u0630</option>
                                    <option value="Closed" ${t("status","all")==="Closed"?"selected":""}>\u0645\u063A\u0644\u0642</option>
                                </select>
                            </div>
                            <div class="cm-requests-field">
                                <label class="cm-requests-label" for="change-type-filter">\u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631</label>
                                <select id="change-type-filter" class="form-select form-select-sm">
                                    <option value="all" ${t("changeType","all")==="all"?"selected":""}>\u0627\u0644\u0643\u0644</option>
                                    <option value="Technical" ${t("changeType","all")==="Technical"?"selected":""}>\u062A\u0642\u0646\u064A</option>
                                    <option value="Administrative" ${t("changeType","all")==="Administrative"?"selected":""}>\u0625\u062F\u0627\u0631\u064A</option>
                                    <option value="Organizational" ${t("changeType","all")==="Organizational"?"selected":""}>\u062A\u0646\u0638\u064A\u0645\u064A</option>
                                </select>
                            </div>
                            <div class="cm-requests-field">
                                <label class="cm-requests-label" for="change-priority-filter">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                                <select id="change-priority-filter" class="form-select form-select-sm">
                                    <option value="all" ${t("priority","all")==="all"?"selected":""}>\u0627\u0644\u0643\u0644</option>
                                    <option value="1-VeryHigh" ${t("priority","all")==="1-VeryHigh"?"selected":""}>\u0639\u0627\u0644\u064A \u062C\u062F\u0627\u064B</option>
                                    <option value="2-High" ${t("priority","all")==="2-High"?"selected":""}>\u0639\u0627\u0644\u064A</option>
                                    <option value="3-Medium" ${t("priority","all")==="3-Medium"?"selected":""}>\u0645\u062A\u0648\u0633\u0637</option>
                                    <option value="4-Low" ${t("priority","all")==="4-Low"?"selected":""}>\u0645\u0646\u062E\u0641\u0636</option>
                                </select>
                            </div>
                            <div class="cm-requests-field">
                                <label class="cm-requests-label" for="change-impact-filter">\u0627\u0644\u0623\u062B\u0631</label>
                                <select id="change-impact-filter" class="form-select form-select-sm">
                                    <option value="all" ${t("impact","all")==="all"?"selected":""}>\u0627\u0644\u0643\u0644</option>
                                    <option value="1-Minor" ${t("impact","all")==="1-Minor"?"selected":""}>\u0628\u0633\u064A\u0637</option>
                                    <option value="2-Major" ${t("impact","all")==="2-Major"?"selected":""}>\u0643\u0628\u064A\u0631</option>
                                    <option value="3-Critical" ${t("impact","all")==="3-Critical"?"selected":""}>\u062D\u0631\u062C</option>
                                </select>
                            </div>
                            <div class="cm-requests-field">
                                <label class="cm-requests-label" for="change-module-filter">\u0648\u062D\u062F\u0629 \u0645\u0631\u062A\u0628\u0637\u0629</label>
                                <input type="text" id="change-module-filter" class="form-input form-input-sm" placeholder="\u0627\u062E\u062A\u064A\u0627\u0631\u064A" value="${n}">
                            </div>
                            <div class="cm-requests-field">
                                <label class="cm-requests-label" for="change-start-date">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                                <input type="date" id="change-start-date" class="form-input form-input-sm" value="${t("startDate","")}">
                            </div>
                            <div class="cm-requests-field">
                                <label class="cm-requests-label" for="change-end-date">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                                <input type="date" id="change-end-date" class="form-input form-input-sm" value="${t("endDate","")}">
                            </div>
                        </div>
                        <div class="cm-requests-toolbar-actions">
                            <button type="button" class="btn-secondary btn-sm" onclick="ChangeManagement.resetChangeRequestFilters()">
                                <i class="fas fa-undo ml-1"></i> \u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                            </button>
                        </div>
                    </div>
                    <div id="change-requests-list-container" class="cm-requests-list-container">
                        <div class="empty-state py-8" id="change-requests-initial"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u062A\u063A\u064A\u064A\u0631</p></div>
                    </div>
                </div>
                <div class="card-footer" style="display:flex;justify-content:center;gap:8px;padding:1rem;border-top:1px solid var(--border-color);background:var(--bg-secondary);">
                    <button type="button" class="btn-secondary btn-sm" onclick="ChangeManagement.exportToExcel()" title="\u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 Excel">
                        <i class="fas fa-file-excel ml-2"></i> \u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                    <button type="button" class="btn-secondary btn-sm" onclick="ChangeManagement.exportToPDF()" title="\u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 PDF">
                        <i class="fas fa-file-pdf ml-2"></i> \u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                </div>
            </div>
        `},renderApprovalsListHTML(){return`
            <div class="content-card" style="overflow:hidden;">
                <div class="card-header border-b px-4 py-3" style="background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(14,165,233,0.08));text-align:center;">
                    <h3 class="card-title text-lg font-semibold" style="margin:0;">\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629</h3>
                    <p class="text-sm text-gray-500 m-0 mt-1">\u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u062A\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F\u0643 \u062D\u0633\u0628 \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629</p>
                </div>
                <div class="card-body" style="padding:0;">
                    <div id="change-approvals-list-container" style="max-height:480px;overflow-y:auto;overflow-x:auto;padding:1rem;">
                        <div class="empty-state py-8"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p></div>
                    </div>
                </div>
            </div>
        `},async loadChangeRequests(){const a=document.getElementById("change-requests-list-container");if(!a||this.state._loadInProgress)return;if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){const s=document.getElementById("change-requests-count");s&&(s.textContent="\u2014"),a.innerHTML=this.showEmptyState("\u064A\u062C\u0628 \u062A\u0641\u0639\u064A\u0644 Google Integration \u0623\u0648\u0644\u0627\u064B"),this.applyModuleI18n(a);return}this.state._loadInProgress=!0;const t=document.getElementById("change-requests-count");t&&(t.textContent="\u2026"),a.innerHTML=`
            <div class="empty-state py-8 cm-requests-loading" id="change-requests-loading">
                <i class="fas fa-spinner fa-spin text-3xl text-blue-500 mb-3"></i>
                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A...</p>
            </div>
        `,this.applyModuleI18n(a);const e=document.getElementById("change-approvals-list-container");e&&this.state.activeTab==="approvals"&&(e.innerHTML=`
                <div class="empty-state py-8">
                    <i class="fas fa-spinner fa-spin text-3xl text-blue-500 mb-3"></i>
                    <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629...</p>
                </div>
            `,this.applyModuleI18n(e));try{const s=await GoogleIntegration.sendRequest({action:"getAllChangeRequests",data:{filters:this.buildFilters()}});if(s.success){const n=s.data||[];this.state.lastRequests=n,this.renderRequestsList(n),this.state.activeTab==="register"&&this.renderRegisterTable(n),this.state.activeTab==="approvals"&&this.renderApprovalsList(n);const i=(n||[]).filter(r=>this.isApprovalPendingForCurrentUser(r)).length;i>0&&typeof Notification<"u"&&Notification.info&&Notification.info("\u0644\u062F\u064A\u0643 "+i+" \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A \u0627\u0646\u062A\u0638\u0627\u0631\u0643")}else{typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A:",s.message);const n=document.getElementById("change-requests-count");n&&(n.textContent="\u2014"),a.innerHTML=this.showEmptyState("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A"),this.applyModuleI18n(a)}}catch(s){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A:",s);const n=document.getElementById("change-requests-count");n&&(n.textContent="\u2014"),a.innerHTML=this.showEmptyState("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A"),this.applyModuleI18n(a)}finally{this.state._loadInProgress=!1}},buildFilters(){const a={},t=document.getElementById("change-status-filter")?.value;t&&t!=="all"&&(a.status=t);const e=document.getElementById("change-type-filter")?.value;e&&e!=="all"&&(a.changeType=e);const s=document.getElementById("change-priority-filter")?.value;s&&s!=="all"&&(a.priority=s);const n=document.getElementById("change-impact-filter")?.value;n&&n!=="all"&&(a.impact=n);const i=document.getElementById("change-module-filter")?.value;i&&String(i).trim()&&(a.relatedModule=String(i).trim());const r=document.getElementById("change-search")?.value;r&&(a.search=r);const l=document.getElementById("change-start-date")?.value;l&&(a.startDate=l);const o=document.getElementById("change-end-date")?.value;return o&&(a.endDate=o),a},renderRequestsList(a){const t=document.getElementById("change-requests-list-container");if(!t)return;const e=document.getElementById("change-requests-count"),s=a?a.length:0;if(e&&(e.textContent=String(s)),!a||a.length===0){t.innerHTML=`<div class="cm-requests-empty">${this.showEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u062A\u063A\u064A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u062A\u0631")}</div>`,this.applyModuleI18n(t);return}const n=i=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(i||"")):String(i||"");t.innerHTML=`
            <div class="cm-requests-stack space-y-3">
                ${a.map(i=>this.renderRequestCard(i,n)).join("")}
            </div>
        `,this.applyModuleI18n(t)},syncFiltersFromUI(){this.state.filters={status:document.getElementById("change-status-filter")?.value||"all",changeType:document.getElementById("change-type-filter")?.value||"all",priority:document.getElementById("change-priority-filter")?.value||"all",impact:document.getElementById("change-impact-filter")?.value||"all",relatedModule:document.getElementById("change-module-filter")?.value||"",search:document.getElementById("change-search")?.value||"",startDate:document.getElementById("change-start-date")?.value||"",endDate:document.getElementById("change-end-date")?.value||""}},resetChangeRequestFilters(){this.state.filters={status:"all",changeType:"all",priority:"all",impact:"all",relatedModule:"",search:"",startDate:"",endDate:""};const a=(t,e)=>{const s=document.getElementById(t);s&&(s.value=e)};a("change-status-filter","all"),a("change-type-filter","all"),a("change-priority-filter","all"),a("change-impact-filter","all"),a("change-module-filter",""),a("change-search",""),a("change-start-date",""),a("change-end-date",""),this.loadChangeRequests()},isApprovalPendingForCurrentUser(a){try{if(!a||!a.approvalFlowJson)return!1;const t=typeof AppState<"u"&&AppState.currentUser?AppState.currentUser:{},e=(t.email||t.id||"").toString(),s=(t.department||"").toString(),n=typeof Permissions<"u"&&Permissions.hasAccess&&Permissions.hasAccess("change-management");let i=[];if(Array.isArray(a.approvalFlowJson))i=a.approvalFlowJson;else if(typeof a.approvalFlowJson=="string"&&a.approvalFlowJson)try{i=JSON.parse(a.approvalFlowJson)}catch{i=[]}if(!i||!i.length)return!1;const r=i.find(o=>o&&o.status==="pending");if(!r)return!1;if(r.approvedByEmail&&e&&r.approvedByEmail===e)return!0;const l=(r.role||"").toString();if(l==="requester_department"){const o=(a.fromDepartment||a.requestingDepartment||"").toString();return s&&o&&s===o}if(l==="target_department"){const o=(a.toDepartment||a.responsibleImplementingDepartment||"").toString();return s&&o&&s===o}return l==="final_approval"?!!n:!1}catch{return!1}},renderApprovalsList(a){const t=document.getElementById("change-approvals-list-container");if(!t)return;const s=(Array.isArray(a)?a:[]).filter(i=>this.isApprovalPendingForCurrentUser(i));if(!s.length){t.innerHTML=`
                <div class="empty-state py-8">
                    <i class="fas fa-check-circle text-4xl text-green-400 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A \u0627\u0646\u062A\u0638\u0627\u0631\u0643 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                </div>
            `,this.applyModuleI18n(t);return}const n=i=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(i||"")):String(i||"");t.innerHTML=`
            <div class="overflow-x-auto">
                <table class="w-full border-collapse text-sm" style="border-color: var(--border-color);">
                    <thead>
                        <tr>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0646\u064A\u0629</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u062E\u0637\u0648\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${s.map((i,r)=>{const l=this.getDisplayRequestNumber(i)||i.requestNumber||i.id||"",o=this.getCurrentApprovalStepLabel(i);return`
                                <tr class="border-b hover:opacity-90" style="border-color: var(--border-color); background: ${r%2===0?"var(--card-bg)":"rgba(241,245,249,0.8)"};">
                                    <td class="p-3">${n(l)}</td>
                                    <td class="p-3">${n(i.title||"\u2014")}</td>
                                    <td class="p-3">${n(i.fromDepartment||i.requestingDepartment||"\u2014")}</td>
                                    <td class="p-3">${n(i.toDepartment||i.responsibleImplementingDepartment||"\u2014")}</td>
                                    <td class="p-3">${n(o.stepLabel)}</td>
                                    <td class="p-3">${n(o.statusLabel)}</td>
                                    <td class="p-3">${this.formatDate(i.requestedAt||i.createdAt)}</td>
                                    <td class="p-3">
                                        <div class="flex flex-wrap gap-1">
                                            <button type="button" onclick="ChangeManagement.handleApprovalAction('${n(i.id)}','approve')" class="btn-primary btn-sm">
                                                <i class="fas fa-check ml-1"></i> \u0627\u0639\u062A\u0645\u0627\u062F
                                            </button>
                                            <button type="button" onclick="ChangeManagement.handleApprovalAction('${n(i.id)}','reject')" class="btn-secondary btn-sm btn-danger">
                                                <i class="fas fa-times ml-1"></i> \u0631\u0641\u0636
                                            </button>
                                            <button type="button" onclick="ChangeManagement.showRequestDetail('${n(i.id)}')" class="btn-secondary btn-sm">
                                                <i class="fas fa-eye ml-1"></i> \u062A\u0641\u0627\u0635\u064A\u0644
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `,this.applyModuleI18n(t)},getDisplayRequestNumber(a){if(!a)return"";const t=(a.requestNumber||a.id||"").toString();if(!t)return"";const e=/^CRQ_(\d+)$/.exec(t);if(e&&e[1]){const s=parseInt(e[1],10);return"MOC-"+(isNaN(s)?e[1]:String(s).padStart(2,"0"))}return t.indexOf("MOC-")===0,t},renderRequestCard(a,t){t||(t=m=>String(m||""));const e=t(a.id),s=t(a.title||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646"),n=(a.description||"").substring(0,120),i=t(n+(a.description&&a.description.length>120?"...":"")),r=t(a.requestedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),l={Draft:"bg-gray-100 text-gray-800","In Review":"bg-blue-100 text-blue-800",Approved:"bg-green-100 text-green-800",Rejected:"bg-red-100 text-red-800","In Implementation":"bg-purple-100 text-purple-800",Completed:"bg-teal-100 text-teal-800",Closed:"bg-gray-100 text-gray-600"},o={"1-VeryHigh":"bg-red-100 text-red-800","2-High":"bg-orange-100 text-orange-800","3-Medium":"bg-yellow-100 text-yellow-800","4-Low":"bg-green-100 text-green-800"},g=t(this.getDisplayRequestNumber(a)||a.requestNumber||a.id||"");return`
            <article class="cm-request-card" role="button" tabindex="0" onclick="ChangeManagement.showRequestDetail('${e}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();ChangeManagement.showRequestDetail('${e}');}">
                <div class="cm-request-card-inner">
                    <div class="cm-request-card-main">
                        <div class="cm-request-card-top">
                            <span class="cm-request-number">${g}</span>
                            <div class="cm-request-badges">
                                <span class="cm-request-badge cm-request-badge-status ${l[a.status]||"bg-gray-100"}">${this.getStatusLabel(a.status)}</span>
                                <span class="cm-request-badge cm-request-badge-prio ${o[a.priority]||"bg-gray-100"}">${this.getPriorityLabel(a.priority)}</span>
                            </div>
                        </div>
                        <h3 class="cm-request-title">${s}</h3>
                        <p class="cm-request-desc">${i}</p>
                        <div class="cm-request-meta">
                            <span class="cm-request-meta-item" title="\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628"><i class="fas fa-user ml-1"></i>${r}</span>
                            <span class="cm-request-meta-item" title="\u0627\u0644\u062A\u0627\u0631\u064A\u062E"><i class="fas fa-calendar ml-1"></i>${this.formatDate(a.requestedAt||a.createdAt)}</span>
                            <span class="cm-request-meta-item" title="\u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631"><i class="fas fa-exchange-alt ml-1"></i>${this.getChangeTypeLabel(a.changeType)}</span>
                        </div>
                    </div>
                    <div class="cm-request-card-aside">
                        <button type="button" onclick="event.stopPropagation(); ChangeManagement.showRequestDetail('${e}')" class="btn-secondary btn-sm cm-request-view-btn">
                            <i class="fas fa-eye ml-1"></i> \u0639\u0631\u0636
                        </button>
                    </div>
                </div>
            </article>
        `},showCreateForm(){const a=document.getElementById("change-btn-add");a&&(a.disabled=!0,setTimeout(()=>{a.disabled=!1},400));const t=["\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0639\u0645\u0644 / \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0639\u0645\u0644","\u062F\u0631\u0627\u0633\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 / \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0628\u064A\u0626\u064A\u0629","\u0627\u0644\u0631\u0633\u0648\u0645\u0627\u062A \u0627\u0644\u0647\u0646\u062F\u0633\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0648\u0642\u0639","\u062E\u0637\u0637 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629","\u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626"],e=t.map((l,o)=>`
            <tr>
                <td class="p-2 border"><select name="docType_${o}" class="form-select form-select-sm"><option value="${l}">${l}</option><option value="\u0623\u062E\u0631\u0649">\u0623\u062E\u0631\u0649</option></select></td>
                <td class="p-2 border"><input type="text" name="docName_${o}" class="form-input form-input-sm" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0648\u062B\u064A\u0642\u0629"></td>
                <td class="p-2 border"><input type="text" name="docCode_${o}" class="form-input form-input-sm" placeholder="\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629"></td>
                <td class="p-2 border"><input type="text" name="docResponsible_${o}" class="form-input form-input-sm" placeholder="\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0639\u062F\u064A\u0644"></td>
                <td class="p-2 border"><input type="date" name="docPlanDate_${o}" class="form-input form-input-sm"></td>
            </tr>
        `).join(""),s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content change-form-modal" style="max-width: 920px; max-height: 95vh; overflow-y: auto;">
                <div class="modal-header change-form-modal-header" style="background: var(--primary-color, #2563eb); color: #fff; border-radius: 8px 8px 0 0; display: flex; justify-content: center; align-items: center; position: relative; padding: 1rem 3rem;">
                    <h2 class="modal-title change-form-modal-title" style="color: #fff; margin: 0; text-align: center; flex: 1; font-size: 1.4rem; font-weight: 700;">\u0646\u0645\u0648\u0630\u062C \u0645\u0642\u062A\u0631\u062D \u062A\u063A\u064A\u064A\u0631 (\u0641\u0646\u064A / \u0625\u062F\u0627\u0631\u064A)</h2>
                    <div style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); display: flex; gap: 0.5rem; align-items: center;">
                        <button type="button" class="change-form-fullscreen-btn" title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629" onclick="ChangeManagement.toggleChangeFormFullscreen(this)" style="color: #fff; opacity: 0.9; background: rgba(255,255,255,0.2); border: none; border-radius: 8px; cursor: pointer; padding: 0.5rem 0.75rem; font-size: 0.9rem;"><i class="fas fa-expand"></i> <span class="change-form-fullscreen-label">\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629</span></button>
                    </div>
                    <button type="button" onclick="this.closest('.modal-overlay').remove()" class="modal-close" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: #fff; opacity: 0.9; background: transparent; border: none; cursor: pointer; padding: 0.5rem;"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body change-form-modal-body" style="background: var(--bg-primary, #fff); overflow-y: auto; flex: 1;">
                    <div class="change-form-request-number-bar" style="display:flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.75rem 1rem; margin-bottom:1rem; background: var(--bg-secondary); border-radius:10px; border: 1px solid var(--border-color);">
                        <span style="font-weight:600; color: var(--text-primary);">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628:</span>
                        <span id="change-form-request-number" style="font-weight:700; color: var(--primary-color); font-size:1.1rem;">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</span>
                    </div>
                    <form id="change-request-form" onsubmit="ChangeManagement.handleCreateSubmit(event)">
                        <input type="hidden" name="docRowsCount" value="${t.length}">
                        <div class="change-form-section change-form-section-card" data-section="1">
                            <h3 class="change-form-section-title"><span class="change-form-section-num">1</span> <i class="fas fa-file-alt ml-2"></i> \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="form-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                                    <input type="date" name="requestedAt" class="form-input" required>
                                </div>
                                <div>
                                    <label class="form-label">\u0645\u0646 / \u0625\u062F\u0627\u0631\u0629 *</label>
                                    <input type="text" name="fromDepartment" class="form-input" required placeholder="\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629">
                                </div>
                                <div>
                                    <label class="form-label">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                    <select name="factoryId" id="change-form-factory" class="form-select">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>
                                    </select>
                                    <input type="hidden" name="factoryName" id="change-form-factory-name" value="">
                                </div>
                                <div>
                                    <label class="form-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <select name="subLocationId" id="change-form-sub" class="form-select">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                    </select>
                                    <input type="hidden" name="subLocationName" id="change-form-sub-name" value="">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="form-label">\u0627\u0644\u0645\u0648\u0636\u0648\u0639 *</label>
                                    <input type="text" name="title" class="form-input" required placeholder="\u0645\u0648\u0636\u0648\u0639 \u0645\u0642\u062A\u0631\u062D \u0627\u0644\u062A\u063A\u064A\u064A\u0631">
                                </div>
                                <div>
                                    <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 *</label>
                                    <select name="changeType" id="change-form-type" class="form-select" required onchange="ChangeManagement.toggleFormSections()">
                                        <option value="Technical">\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A</option>
                                        <option value="Administrative">\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0625\u062F\u0627\u0631\u064A (\u0646\u0642\u0644/\u062A\u0643\u0644\u064A\u0641 \u0644\u0644\u0641\u0646\u064A\u064A\u0646)</option>
                                    </select>
                                </div>
                                <div id="technical-subtype-wrap">
                                    <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0641\u0646\u064A \u0627\u0644\u0645\u0642\u062A\u0631\u062D</label>
                                    <div class="flex gap-4 mt-2">
                                        <label class="inline-flex items-center"><input type="radio" name="technicalChangeSubType" value="ProductionProcess" class="ml-2"> \u062A\u063A\u064A\u064A\u0631 \u0641\u064A \u0639\u0645\u0644\u064A\u0629 \u0625\u0646\u062A\u0627\u062C\u064A\u0629</label>
                                        <label class="inline-flex items-center"><input type="radio" name="technicalChangeSubType" value="NonProductionProcess" class="ml-2"> \u062A\u063A\u064A\u064A\u0631 \u0641\u064A \u0639\u0645\u0644\u064A\u0629 \u063A\u064A\u0631 \u0625\u0646\u062A\u0627\u062C\u064A\u0629</label>
                                    </div>
                                </div>
                                <div id="administrative-fields-wrap" style="display:none;" class="md:col-span-2">
                                    <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0642\u062A\u0631\u062D (\u0625\u062F\u0627\u0631\u064A)</label>
                                    <div class="flex flex-wrap gap-4 mt-2">
                                        <label class="inline-flex items-center"><input type="radio" name="administrativeChangeSubType" value="AssignmentRequest" class="ml-2"> \u0637\u0644\u0628 \u062A\u0643\u0644\u064A\u0641</label>
                                        <label class="inline-flex items-center"><input type="radio" name="administrativeChangeSubType" value="TransferTechnicians" class="ml-2"> \u0646\u0642\u0644 \u0644\u0644\u0641\u0646\u064A\u064A\u0646</label>
                                        <label class="inline-flex items-center"><input type="radio" name="administrativeChangeSubType" value="Other" class="ml-2"> \u0623\u062E\u0631\u0649</label>
                                    </div>
                                </div>
                                <div id="admin-employee-row" style="display:none;" class="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2 border-t pt-4 mt-2">
                                    <div>
                                        <label class="form-label">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641) *</label>
                                        <input type="text" name="employeeCode" id="change-form-employee-code" class="form-input" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u062B\u0645 \u0627\u0646\u0642\u0631 \u062E\u0627\u0631\u062C \u0627\u0644\u062D\u0642\u0644 \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" autocomplete="off">
                                    </div>
                                    <div>
                                        <label class="form-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</label>
                                        <input type="text" name="employeeName" id="change-form-employee-name" class="form-input" placeholder="\u064A\u064F\u0645\u0644\u0623 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0643\u0648\u062F" readonly>
                                    </div>
                                    <div id="change-form-employee-card" class="md:col-span-2" style="display:none; padding:0.75rem 1rem; background: rgba(37,99,235,0.08); border-radius:10px; border: 1px solid rgba(37,99,235,0.25);">
                                        <div class="text-sm font-semibold mb-2" style="color: var(--primary-color);"><i class="fas fa-user-check ml-2"></i> \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641</div>
                                        <div id="change-form-employee-card-body" class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm"></div>
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="form-label">\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631</label>
                                        <input type="text" name="adminChangeLocation" class="form-input" placeholder="\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631">
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="form-label">\u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</label>
                                        <textarea name="currentTasksDescription" class="form-textarea" rows="3" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u0648\u0638\u0641"></textarea>
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="form-label">\u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F\u0629</label>
                                        <textarea name="newTasksDescription" class="form-textarea" rows="3" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0628\u0639\u062F \u0627\u0644\u0646\u0642\u0644/\u0627\u0644\u062A\u0643\u0644\u064A\u0641"></textarea>
                                    </div>
                                    <div>
                                        <label class="form-label">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0637\u0627\u0644\u0628 \u0644\u0644\u062A\u063A\u064A\u064A\u0631</label>
                                        <input type="text" name="responsibleRequestingDepartment" class="form-input">
                                    </div>
                                    <div>
                                        <label class="form-label">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0630\u064A \u0633\u064A\u062A\u0645 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0628\u0647</label>
                                        <input type="text" name="responsibleImplementingDepartment" class="form-input">
                                    </div>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="form-label">\u0627\u0633\u062A\u0645\u0631\u0627\u0631\u064A\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0642\u062A\u0631\u062D</label>
                                    <div class="flex flex-wrap gap-4 mt-2">
                                        <label class="inline-flex items-center"><input type="radio" name="changeContinuity" value="Permanent" class="ml-2" checked> \u062F\u0627\u0626\u0645</label>
                                        <label class="inline-flex items-center"><input type="radio" name="changeContinuity" value="Temporary" class="ml-2"> \u0645\u0624\u0642\u062A \u062D\u062A\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                                        <input type="date" name="temporaryUntilDate" id="temporaryUntilDate" class="form-input" style="display:none;">
                                    </div>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="form-label">\u0623\u0648\u0644\u0648\u064A\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0642\u062A\u0631\u062D</label>
                                    <div class="flex flex-wrap gap-4 mt-2">
                                        <label class="inline-flex items-center"><input type="radio" name="priorityType" value="Normal" class="ml-2" checked> \u0639\u0627\u062F\u064A</label>
                                        <label class="inline-flex items-center"><input type="radio" name="priorityType" value="Urgent" class="ml-2"> \u0639\u0627\u062C\u0644 : \u062A\u0648\u0636\u064A\u062D \u0627\u0644\u0633\u0628\u0628</label>
                                    </div>
                                    <textarea name="priorityUrgentReason" id="priorityUrgentReason" class="form-textarea mt-2" rows="2" placeholder="\u062A\u0648\u0636\u064A\u062D \u0633\u0628\u0628 \u0627\u0644\u0639\u062C\u0644\u0629" style="display:none;"></textarea>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="form-label">\u0648\u0635\u0641 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0642\u062A\u0631\u062D *</label>
                                    <textarea name="description" class="form-textarea" rows="4" required placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0641\u0646\u064A/\u0627\u0644\u0625\u062F\u0627\u0631\u064A \u0627\u0644\u0645\u0642\u062A\u0631\u062D"></textarea>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="form-label">\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0642\u0629</label>
                                    <textarea name="attachedDocumentsText" class="form-textarea" rows="2" placeholder="\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0642\u0629"></textarea>
                                </div>
                                <div>
                                    <label class="form-label">\u0625\u0644\u0649 / \u0625\u062F\u0627\u0631\u0629 (\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631)</label>
                                    <input type="text" name="toDepartment" class="form-input" placeholder="\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629">
                                </div>
                                <div>
                                    <label class="form-label">\u0623\u062E\u0631\u0649 (\u0645\u0648\u0642\u0639)</label>
                                    <input type="text" name="locationOther" class="form-input" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u062E\u0631\u0649 \u0644\u0644\u0645\u0648\u0642\u0639">
                                </div>
                            </div>
                        </div>
                        <div class="change-form-section change-form-section-card" data-section="2">
                            <h3 class="change-form-section-title"><span class="change-form-section-num">2</span> <i class="fas fa-users-cog ml-2"></i> \u0644\u062C\u0646\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="form-label">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0637\u0627\u0644\u0628 \u0644\u0644\u062A\u063A\u064A\u064A\u0631</label>
                                    <input type="text" name="requestingDepartment" class="form-input">
                                </div>
                                <div>
                                    <label class="form-label">\u0625\u062F\u0627\u0631\u0627\u062A / \u0623\u0642\u0633\u0627\u0645 \u0623\u062E\u0631\u0649</label>
                                    <input type="text" name="otherDepartments" class="form-input">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="form-label">\u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0623\u0648 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0642\u062A\u0631\u062D</label>
                                    <textarea name="affectedDepartments" class="form-textarea" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                        <div id="admin-health-section" style="display:none;" class="change-form-section change-form-section-card" data-section="3">
                            <h3 class="change-form-section-title"><span class="change-form-section-num">3</span> <i class="fas fa-heartbeat ml-2"></i> \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0644\u0644\u0645\u0648\u0638\u0641</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="md:col-span-2">
                                    <label class="form-label">\u0625\u0635\u0627\u0628\u0629 \u0633\u0627\u0628\u0642\u0629</label>
                                    <input type="text" name="previousInjury" class="form-input" placeholder="\u0625\u0646 \u0648\u062C\u062F\u062A">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="form-label">\u0623\u0645\u0631\u0627\u0636 \u0645\u0632\u0645\u0646\u0629</label>
                                    <input type="text" name="chronicDiseases" class="form-input" placeholder="\u0625\u0646 \u0648\u062C\u062F\u062A">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="form-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0635\u062D\u064A\u0629</label>
                                    <textarea name="healthNotes" class="form-textarea" rows="2" placeholder="\u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0639\u0646 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0635\u062D\u064A\u0629"></textarea>
                                </div>
                            </div>
                        </div>
                        <div id="admin-training-section" style="display:none;" class="change-form-section change-form-section-card" data-section="4">
                            <h3 class="change-form-section-title"><span class="change-form-section-num">4</span> <i class="fas fa-graduation-cap ml-2"></i> \u062A\u062D\u062F\u064A\u062F \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0648\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649 \u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631</h3>
                            <div class="overflow-x-auto">
                                <table class="w-full border-collapse text-sm change-form-training-table">
                                    <thead>
                                        <tr>
                                            <th class="p-2 border text-right font-semibold">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A / \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</th>
                                            <th class="p-2 border text-right font-semibold">\u062A\u0627\u0631\u064A\u062E \u0645\u062E\u0637\u0637</th>
                                            <th class="p-2 border text-right font-semibold">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</th>
                                            <th class="p-2 border text-right font-semibold">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630</th>
                                            <th class="p-2 border text-right font-semibold">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td class="p-2 border">\u062A\u0648\u0639\u064A\u0629 \u0628\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u062F\u064A\u062F \u0648\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629</td><td class="p-2 border"><input type="date" name="trainingReq_0_plannedDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_0_responsible" class="form-input form-input-sm" placeholder="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"></td><td class="p-2 border"><input type="date" name="trainingReq_0_executionDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_0_notes" class="form-input form-input-sm" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A"></td></tr>
                                        <tr><td class="p-2 border">\u062A\u062F\u0631\u064A\u0628 \u0639\u0644\u0649 \u0631\u0623\u0633 \u0627\u0644\u0639\u0645\u0644 \u0644\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F\u0629</td><td class="p-2 border"><input type="date" name="trainingReq_1_plannedDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_1_responsible" class="form-input form-input-sm"></td><td class="p-2 border"><input type="date" name="trainingReq_1_executionDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_1_notes" class="form-input form-input-sm"></td></tr>
                                        <tr><td class="p-2 border">\u062A\u0648\u0639\u064A\u0629 \u0628\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645 \u062A\u062A\u0636\u0645\u0646 PPE</td><td class="p-2 border"><input type="date" name="trainingReq_2_plannedDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_2_responsible" class="form-input form-input-sm"></td><td class="p-2 border"><input type="date" name="trainingReq_2_executionDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_2_notes" class="form-input form-input-sm"></td></tr>
                                        <tr><td class="p-2 border">\u062A\u0648\u0639\u064A\u0629 \u0639\u0644\u0649 \u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626</td><td class="p-2 border"><input type="date" name="trainingReq_3_plannedDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_3_responsible" class="form-input form-input-sm"></td><td class="p-2 border"><input type="date" name="trainingReq_3_executionDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_3_notes" class="form-input form-input-sm"></td></tr>
                                        <tr><td class="p-2 border">\u0641\u062D\u0648\u0635 \u0637\u0628\u064A\u0629 \u0642\u0628\u0644 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0646\u0642\u0644 / \u0627\u0644\u062A\u0643\u0644\u064A\u0641</td><td class="p-2 border"><input type="date" name="trainingReq_4_plannedDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_4_responsible" class="form-input form-input-sm"></td><td class="p-2 border"><input type="date" name="trainingReq_4_executionDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_4_notes" class="form-input form-input-sm"></td></tr>
                                        <tr><td class="p-2 border">\u0641\u062D\u0648\u0635 \u0637\u0628\u064A\u0629 \u062F\u0648\u0631\u064A\u0629</td><td class="p-2 border"><input type="date" name="trainingReq_5_plannedDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_5_responsible" class="form-input form-input-sm"></td><td class="p-2 border"><input type="date" name="trainingReq_5_executionDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_5_notes" class="form-input form-input-sm"></td></tr>
                                        <tr><td class="p-2 border">\u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 / \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</td><td class="p-2 border"><input type="date" name="trainingReq_6_plannedDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_6_responsible" class="form-input form-input-sm"></td><td class="p-2 border"><input type="date" name="trainingReq_6_executionDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_6_notes" class="form-input form-input-sm"></td></tr>
                                        <tr><td class="p-2 border"><input type="text" name="trainingReq_7_other" class="form-input form-input-sm" placeholder="\u0623\u062E\u0631\u0649 \u2014 \u062D\u062F\u062F \u0627\u0644\u0645\u062A\u0637\u0644\u0628"></td><td class="p-2 border"><input type="date" name="trainingReq_7_plannedDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_7_responsible" class="form-input form-input-sm"></td><td class="p-2 border"><input type="date" name="trainingReq_7_executionDate" class="form-input form-input-sm w-full"></td><td class="p-2 border"><input type="text" name="trainingReq_7_notes" class="form-input form-input-sm"></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="documents-table-section" class="change-form-section change-form-section-card" data-section="5">
                            <h3 class="change-form-section-title"><span class="change-form-section-num">5</span> <i class="fas fa-file-contract ml-2"></i> \u0627\u0644\u0648\u062B\u0627\u0626\u0642 \u0648\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0639\u0644\u0642\u0629 \u0628\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062A\u0639\u062F\u064A\u0644\u0647\u0627</h3>
                            <div class="overflow-x-auto">
                                <table class="w-full border-collapse text-sm">
                                    <thead>
                                        <tr class="bg-gray-100">
                                            <th class="p-2 border text-right">\u0646\u0648\u0639 \u0627\u0644\u0648\u062B\u064A\u0642\u0629 / \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th>
                                            <th class="p-2 border text-right">\u0627\u0633\u0645 \u0627\u0644\u0648\u062B\u064A\u0642\u0629 / \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th>
                                            <th class="p-2 border text-right">\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629 / \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th>
                                            <th class="p-2 border text-right">\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0639\u062F\u064A\u0644</th>
                                            <th class="p-2 border text-right">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637 \u0644\u0644\u062A\u0639\u062F\u064A\u0644</th>
                                        </tr>
                                    </thead>
                                    <tbody>${e}</tbody>
                                </table>
                            </div>
                        </div>
                        <div class="change-form-section change-form-section-card" data-section="6">
                            <h3 class="change-form-section-title"><span class="change-form-section-num">6</span> <i class="fas fa-user-friends ml-2"></i> \u0623\u0639\u0636\u0627\u0621 \u0644\u062C\u0646\u0629 \u062F\u0631\u0627\u0633\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A</h3>
                            <textarea name="committeeMembersJson" class="form-textarea" rows="3" placeholder="\u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0623\u0639\u0636\u0627\u0621 (\u0633\u0637\u0631 \u0644\u0643\u0644 \u0639\u0636\u0648 \u0623\u0648 \u0642\u0627\u0626\u0645\u0629 \u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0641\u0627\u0635\u0644\u0629)"></textarea>
                        </div>
                        <div class="change-form-section change-form-section-card" data-section="7">
                            <h3 class="change-form-section-title"><span class="change-form-section-num">7</span> <i class="fas fa-clipboard-check ml-2"></i> \u062A\u0648\u0635\u064A\u0627\u062A \u0644\u062C\u0646\u0629 \u062F\u0631\u0627\u0633\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A</h3>
                            <textarea name="committeeRecommendations" class="form-textarea" rows="3" placeholder="\u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u0644\u062C\u0646\u0629 (\u0625\u0646 \u0648\u062C\u062F\u062A)"></textarea>
                        </div>
                        <div class="change-form-section change-form-section-card grid grid-cols-1 md:grid-cols-2 gap-4" data-section="8">
                            <h3 class="change-form-section-title w-full" style="grid-column: 1 / -1;"><span class="change-form-section-num">8</span> <i class="fas fa-exclamation-triangle ml-2"></i> \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0627\u0644\u062A\u0646\u0641\u064A\u0630</h3>
                            <div>
                                <label class="form-label">\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</label>
                                <textarea name="riskAssessment" class="form-textarea" rows="2"></textarea>
                            </div>
                            <div>
                                <label class="form-label">\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u062E\u0641\u064A\u0641</label>
                                <textarea name="mitigationActions" class="form-textarea" rows="2"></textarea>
                            </div>
                            <div>
                                <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0645\u0633\u062A\u0647\u062F\u0641 \u0644\u0644\u062A\u0646\u0641\u064A\u0630</label>
                                <input type="date" name="dueDate" class="form-input">
                            </div>
                        </div>
                        <div class="modal-footer mt-4 flex gap-2 justify-center" style="border-top: 1px solid var(--border-color, #e5e7eb); padding-top: 1rem;">
                            <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn-secondary">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary" style="background: var(--primary-color, #2563eb);"><i class="fas fa-save ml-2"></i> \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628</button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(s);const n=new Date().toISOString().slice(0,10),i=s.querySelector('input[name="requestedAt"]');i&&(i.value=n),this.toggleFormSections(),this.fetchAndShowNextRequestNumber(s),this.fillFactoryAndSubLocationOptions(s),this.setupChangeFormModalDragAndFullscreen(s);const r=s.querySelector("#change-form-employee-code");r&&(r.addEventListener("blur",()=>this.lookupEmployeeByCode()),r.addEventListener("keydown",l=>{l.key==="Enter"&&(l.preventDefault(),this.lookupEmployeeByCode())})),s.querySelectorAll('input[name="changeContinuity"]').forEach(l=>{l.addEventListener("change",function(){const o=s.querySelector("#temporaryUntilDate");o&&(o.style.display=this.value==="Temporary"?"block":"none")})}),s.querySelectorAll('input[name="priorityType"]').forEach(l=>{l.addEventListener("change",function(){const o=s.querySelector("#priorityUrgentReason");o&&(o.style.display=this.value==="Urgent"?"block":"none")})})},toggleChangeFormFullscreen(a){const t=a&&a.closest?a.closest(".change-form-modal"):null;if(!t)return;const e=t.classList.toggle("change-form-modal-fullscreen"),s=a.querySelector("i"),n=a.querySelector(".change-form-fullscreen-label");s&&(s.className=e?"fas fa-compress":"fas fa-expand"),n&&(n.textContent=e?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"),a.setAttribute("title",e?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")},setupChangeFormModalDragAndFullscreen(a){const t=a.querySelector(".change-form-modal.change-form-modal-draggable"),e=a.querySelector(".change-form-drag-handle"),s=a.querySelector(".change-form-btn-fullscreen");if(!t||!e)return;let n=!1,i=0,r=0,l=0,o=0;e.addEventListener("mousedown",u=>{if(u.target.closest("button"))return;n=!0;const c=t.getBoundingClientRect();l=c.left,o=c.top,i=u.clientX,r=u.clientY,t.style.position="fixed",t.style.left=l+"px",t.style.top=o+"px",t.style.margin="0"});const g=u=>{if(!n)return;const c=u.clientX-i,d=u.clientY-r;t.style.left=l+c+"px",t.style.top=o+d+"px"},m=()=>{n=!1,document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",m)};document.addEventListener("mousemove",g),document.addEventListener("mouseup",m),s&&s.addEventListener("click",u=>{u.stopPropagation(),t.classList.toggle("change-form-modal-fullscreen");const c=s.querySelector("i");c&&(c.className=t.classList.contains("change-form-modal-fullscreen")?"fas fa-compress":"fas fa-expand"),s.title=t.classList.contains("change-form-modal-fullscreen")?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u062D\u062C\u0645":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"})},fillFactoryAndSubLocationOptions(a){const t=a&&a.querySelector?a:document,e=t.querySelector("#change-form-factory"),s=t.querySelector("#change-form-sub"),n=t.querySelector("#change-form-factory-name"),i=t.querySelector("#change-form-sub-name");if(!e||!s)return;const r=typeof AppState<"u"&&AppState.appData&&Array.isArray(AppState.appData.observationSites)?AppState.appData.observationSites:[];e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>',r.forEach(o=>{const g=String(o.id||"").trim(),m=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(o.name||"")):String(o.name||"");g&&m&&e.appendChild(new Option(m,g))}),s.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>',n&&(n.value=""),i&&(i.value="");const l=()=>{const o=String(e.value||"").trim();s.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>',i&&(i.value="");const g=e.options[e.selectedIndex];if(n&&(n.value=g?g.text:""),!o)return;const m=r.find(c=>String(c.id||"").trim()===o);(m&&Array.isArray(m.places)?m.places:[]).forEach(c=>{const d=String(c.id||"").trim(),p=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(c.name||"")):String(c.name||"");d&&p&&s.appendChild(new Option(p,d))})};e.addEventListener("change",()=>{l()}),s.addEventListener("change",()=>{const o=s.options[s.selectedIndex];i&&(i.value=o?o.text:"")})},async fetchAndShowNextRequestNumber(a){const t=a?a.querySelector("#change-form-request-number"):document.getElementById("change-form-request-number");if(t)try{const e=await GoogleIntegration.sendRequest({action:"getNextChangeRequestNumber",data:{}});e&&e.success&&e.data&&e.data.requestNumber?(t.textContent=e.data.requestNumber,t.style.color="var(--primary-color)"):t.textContent="\u0633\u064A\u064F\u0639\u064A\u0651\u0646 \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638"}catch{t.textContent="\u0633\u064A\u064F\u0639\u064A\u0651\u0646 \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638"}},lookupEmployeeByCode(){const a=document.getElementById("change-form-employee-code"),t=document.getElementById("change-form-employee-name"),e=document.getElementById("change-form-employee-card"),s=document.getElementById("change-form-employee-card-body");if(!a||!t||!e)return;const n=String(a.value||"").trim();if(!n){t.value="",s&&(s.innerHTML=""),e.style.display="none";return}const r=(typeof AppState<"u"&&AppState.appData&&Array.isArray(AppState.appData.employees)?AppState.appData.employees:[]).find(l=>{const o=l.employeeNumber!=null?String(l.employeeNumber).trim():"",g=l.id!=null?String(l.id).trim():"";return o===n||g===n});if(r){if(t.value=r.name||"",s){const l=o=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(o||"\u2014")):String(o||"\u2014");s.innerHTML=`
                    <div><span style="color: var(--text-secondary);">\u0627\u0644\u0627\u0633\u0645:</span> <strong>${l(r.name)}</strong></div>
                    <div><span style="color: var(--text-secondary);">\u0627\u0644\u0642\u0633\u0645:</span> ${l(r.department)}</div>
                    <div><span style="color: var(--text-secondary);">\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</span> ${l(r.job)}</div>
                    <div><span style="color: var(--text-secondary);">\u0627\u0644\u0645\u0648\u0642\u0639:</span> ${l(r.location||r.branch)}</div>
                `}e.style.display="block",typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641")}else t.value="",s&&(s.innerHTML=""),e.style.display="none",n&&typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F")},toggleFormSections(){const a=document.getElementById("change-form-type"),t=a&&a.value==="Technical",e=a&&a.value==="Administrative",s=document.getElementById("technical-subtype-wrap"),n=document.getElementById("documents-table-section"),i=document.getElementById("administrative-fields-wrap"),r=document.getElementById("admin-employee-row"),l=document.getElementById("admin-health-section"),o=document.getElementById("admin-training-section");s&&(s.style.display=t?"block":"none"),n&&(n.style.display=t?"block":"none"),i&&(i.style.display=e?"block":"none"),r&&(r.style.display=e?"block":"none"),l&&(l.style.display=e?"block":"none"),o&&(o.style.display=e?"block":"none")},toggleTechnicalSubType(){this.toggleFormSections()},async handleCreateSubmit(a){a.preventDefault();const t=a.target,e=new FormData(t),s=typeof AppState<"u"&&AppState.currentUser?AppState.currentUser:{},i=(e.get("priorityType")||"Normal")==="Urgent"?"2-High":"3-Medium",r=e.get("requestedAt")||new Date().toISOString().slice(0,10),l=parseInt(t.querySelector('input[name="docRowsCount"]')?.value||"5",10),o=[];for(let p=0;p<l;p++){const f=e.get("docType_"+p),v=e.get("docName_"+p),h=e.get("docCode_"+p),w=e.get("docResponsible_"+p),y=e.get("docPlanDate_"+p);(f||v||h||w||y)&&o.push({documentType:f||"",documentName:v||"",documentCode:h||"",responsibleForAmendment:w||"",plannedAmendmentDate:y||""})}let g=e.get("committeeMembersJson")||"";g&&typeof g=="string"&&(g=g.trim());const m=["\u062A\u0648\u0639\u064A\u0629 \u0628\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u062F\u064A\u062F \u0648\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629","\u062A\u062F\u0631\u064A\u0628 \u0639\u0644\u0649 \u0631\u0623\u0633 \u0627\u0644\u0639\u0645\u0644 \u0644\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F\u0629","\u062A\u0648\u0639\u064A\u0629 \u0628\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645 \u062A\u062A\u0636\u0645\u0646 PPE","\u062A\u0648\u0639\u064A\u0629 \u0639\u0644\u0649 \u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626","\u0641\u062D\u0648\u0635 \u0637\u0628\u064A\u0629 \u0642\u0628\u0644 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0646\u0642\u0644 / \u0627\u0644\u062A\u0643\u0644\u064A\u0641","\u0641\u062D\u0648\u0635 \u0637\u0628\u064A\u0629 \u062F\u0648\u0631\u064A\u0629","\u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 / \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628",null],u=[];for(let p=0;p<8;p++){const f=p===7?(e.get("trainingReq_7_other")||"").trim():m[p]||"",v=e.get("trainingReq_"+p+"_plannedDate")||"",h=e.get("trainingReq_"+p+"_responsible")||"",w=e.get("trainingReq_"+p+"_executionDate")||"",y=e.get("trainingReq_"+p+"_notes")||"";(f||v||h||w||y)&&u.push({requirement:f||m[p]||"\u0623\u062E\u0631\u0649",plannedDate:v,responsible:h,executionDate:w,notes:y})}const c={title:e.get("title"),description:e.get("description"),changeType:e.get("changeType")||"Administrative",priority:i,impact:"1-Minor",fromDepartment:e.get("fromDepartment")||"",toDepartment:e.get("toDepartment")||"",locationOther:e.get("adminChangeLocation")||e.get("locationOther")||"",technicalChangeSubType:e.get("technicalChangeSubType")||"",changeContinuity:e.get("changeContinuity")||"Permanent",temporaryUntilDate:e.get("temporaryUntilDate")||"",priorityUrgentReason:e.get("priorityUrgentReason")||"",attachedDocumentsText:e.get("attachedDocumentsText")||"",requestingDepartment:e.get("requestingDepartment")||"",otherDepartments:e.get("otherDepartments")||"",affectedDepartments:e.get("affectedDepartments")||"",documentsToAmendJson:o.length?JSON.stringify(o):"",committeeMembersJson:g,committeeRecommendations:e.get("committeeRecommendations")||"",riskAssessment:e.get("riskAssessment")||"",mitigationActions:e.get("mitigationActions")||"",dueDate:e.get("dueDate")||"",employeeName:e.get("employeeName")||"",employeeCode:e.get("employeeCode")||"",currentTasksDescription:e.get("currentTasksDescription")||"",newTasksDescription:e.get("newTasksDescription")||"",administrativeChangeSubType:e.get("administrativeChangeSubType")||"",responsibleRequestingDepartment:e.get("responsibleRequestingDepartment")||"",responsibleImplementingDepartment:e.get("responsibleImplementingDepartment")||"",previousInjury:e.get("previousInjury")||"",chronicDiseases:e.get("chronicDiseases")||"",healthNotes:e.get("healthNotes")||"",trainingRequirementsJson:u.length?JSON.stringify(u):"",requestedBy:s.name||s.email||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",requestedByEmail:s.email||"",requestedAt:r,factoryId:e.get("factoryId")||"",factoryName:e.get("factoryName")||"",subLocationId:e.get("subLocationId")||"",subLocationName:e.get("subLocationName")||"",createdBy:s.email||s.name||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},d=t.closest(".modal-overlay");d&&d.remove(),typeof Notification<"u"&&Notification.info&&Notification.info("\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..."),(async()=>{try{const p=await GoogleIntegration.sendRequest({action:"addChangeRequest",data:c});p&&p.success?(typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0637\u0644\u0628 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0628\u0646\u062C\u0627\u062D"),this.loadChangeRequests()):typeof Notification<"u"&&Notification.error&&Notification.error(p?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")}})()},async showRequestDetail(a){if(document.querySelector(".modal-overlay"))return;let e=null;if(Array.isArray(this.state.lastRequests)&&this.state.lastRequests.length&&(e=this.state.lastRequests.find(f=>String(f.id)===String(a))),!e){typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644...");try{const f=await GoogleIntegration.sendRequest({action:"getChangeRequest",data:{requestId:a}});if(typeof Loading<"u"&&Loading.hide&&Loading.hide(),!f||!f.success||!f.data){typeof Notification<"u"&&Notification.error&&Notification.error("\u0637\u0644\u0628 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}e=f.data}catch(f){typeof Loading<"u"&&Loading.hide&&Loading.hide(),typeof Utils<"u"&&Utils.safeError&&Utils.safeError("showRequestDetail:",f),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644");return}}this.state.currentRequest=e;const s=f=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(f||"")):String(f||""),n=typeof Permissions<"u"&&Permissions.hasAccess&&Permissions.hasAccess("change-management"),i=e.status==="Draft",r=e.status==="In Review",l=e.status==="Approved",o=e.status==="Rejected",g=e.status==="In Implementation",m=e.status==="Completed",u=e.status==="Closed";let c="";try{const f=e.timeLog,v=Array.isArray(f)?f:typeof f=="string"&&f?JSON.parse(f):[];v.length?c=v.slice().reverse().map(h=>`
                        <div class="border-b border-gray-100 pb-2 mb-2 last:border-0">
                            <span class="text-sm font-medium">${s(h.action||"")}</span>
                            <span class="text-gray-500 text-sm"> \u2014 ${s(h.user||"")} \u2014 ${this.formatDate(h.timestamp)}</span>
                            ${h.note?`<p class="text-sm text-gray-600 mt-1">${s(h.note)}</p>`:""}
                        </div>
                    `).join(""):c='<p class="text-gray-500 text-sm">\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u062C\u0644</p>'}catch{c='<p class="text-gray-500 text-sm">\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u062C\u0644</p>'}const d=this.getDisplayRequestNumber(e)||e.requestNumber||e.id||"",p=document.createElement("div");p.className="modal-overlay",p.innerHTML=`
                <div class="modal-content" style="max-width: 900px;">
                    <div class="modal-header" style="display:flex;align-items:center;justify-content:center;position:relative;">
                        <button type="button" onclick="this.closest('.modal-overlay').remove()" class="modal-close" style="position:absolute;right:0;top:50%;transform:translateY(-50%);"><i class="fas fa-times"></i></button>
                        <h2 class="modal-title" style="margin:0;text-align:center;flex:1;">${s(d)} \u2014 ${s(e.title)}</h2>
                    </div>
                    <div class="modal-body" style="padding:0;">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" style="background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(14,165,233,0.06));border-bottom:1px solid rgba(59,130,246,0.2);">
                            <div><span class="text-gray-500">\u0627\u0644\u062D\u0627\u0644\u0629:</span> <strong>${this.getStatusLabel(e.status)}</strong></div>
                            <div><span class="text-gray-500">\u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631:</span> ${this.getChangeTypeLabel(e.changeType)}</div>
                            <div><span class="text-gray-500">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:</span> ${this.getPriorityLabel(e.priority)}</div>
                            <div><span class="text-gray-500">\u0627\u0644\u0623\u062B\u0631:</span> ${this.getImpactLabel(e.impact)}</div>
                            <div><span class="text-gray-500">\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628:</span> ${s(e.requestedBy)}</div>
                            <div><span class="text-gray-500">\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</span> ${this.formatDate(e.requestedAt||e.createdAt)}</div>
                            ${e.relatedModule?`<div><span class="text-gray-500">\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0631\u062A\u0628\u0637:</span> ${s(e.relatedModule)}</div>`:""}
                        </div>
                        <div class="p-4 mb-0" style="background:rgba(251,191,36,0.06);border-bottom:1px solid rgba(251,191,36,0.2);">
                            <span class="text-gray-500 block mb-1">\u0627\u0644\u0648\u0635\u0641:</span>
                            <p class="text-gray-800">${s(e.description||"\u2014")}</p>
                        </div>
                        ${e.riskAssessment||e.mitigationActions?`<div class="p-4 mb-0" style="background:rgba(239,68,68,0.05);border-bottom:1px solid rgba(239,68,68,0.15);">
                            ${e.riskAssessment?`<div class="mb-3"><span class="text-gray-500 block mb-1">\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:</span><p class="text-gray-800">${s(e.riskAssessment)}</p></div>`:""}
                            ${e.mitigationActions?`<div><span class="text-gray-500 block mb-1">\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u062E\u0641\u064A\u0641:</span><p class="text-gray-800">${s(e.mitigationActions)}</p></div>`:""}
                        </div>`:""}
                        <div class="p-4" style="background:rgba(148,163,184,0.08);">
                            <h3 class="font-semibold mb-2" style="background:rgba(71,85,105,0.15);padding:8px 12px;margin:-16px -16px 12px -16px;border-radius:4px;">\u0633\u062C\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629</h3>
                            <div class="p-3 rounded" style="background:#f8fafc;max-height:200px;overflow-y:auto;overflow-x:hidden;border:1px solid #e2e8f0;">${c}</div>
                        </div>
                    </div>
                    <div class="modal-footer" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:1rem 1.5rem;border-top:1px solid var(--border-color, #e5e7eb);background:var(--bg-secondary, #f9fafb);">
                        <button type="button" onclick="ChangeManagement.exportSingleRequestToPDF('${s(e.id)}');" class="btn-secondary">
                            <i class="fas fa-file-pdf ml-1"></i> \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0637\u0644\u0628
                        </button>
                        ${i&&n?`<button type="button" onclick="ChangeManagement.updateRequestStatus('${s(e.id)}','In Review'); this.closest('.modal-overlay').remove();" class="btn-primary"><i class="fas fa-paper-plane ml-2"></i> \u0625\u0631\u0633\u0627\u0644 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629</button>`:""}
                        ${r&&n?`
                            <button type="button" onclick="ChangeManagement.updateRequestStatus('${s(e.id)}','Approved'); this.closest('.modal-overlay').remove();" class="btn-primary"><i class="fas fa-check ml-2"></i> \u0645\u0648\u0627\u0641\u0642\u0629</button>
                            <button type="button" onclick="ChangeManagement.rejectRequest('${s(e.id)}');" class="btn-secondary btn-danger"><i class="fas fa-times ml-2"></i> \u0631\u0641\u0636</button>
                        `:""}
                        ${l&&n?`<button type="button" onclick="ChangeManagement.updateRequestStatus('${s(e.id)}','In Implementation'); this.closest('.modal-overlay').remove();" class="btn-primary"><i class="fas fa-play ml-2"></i> \u0628\u062F\u0621 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</button>`:""}
                        ${g&&n?`<button type="button" onclick="ChangeManagement.updateRequestStatus('${s(e.id)}','Completed'); this.closest('.modal-overlay').remove();" class="btn-primary"><i class="fas fa-check-double ml-2"></i> \u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</button>`:""}
                        ${(m||g)&&n&&!u?`<button type="button" onclick="ChangeManagement.updateRequestStatus('${s(e.id)}','Closed'); this.closest('.modal-overlay').remove();" class="btn-secondary"><i class="fas fa-lock ml-2"></i> \u0625\u063A\u0644\u0627\u0642</button>`:""}
                        ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("change-management"):""}
                        <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn-secondary">\u0625\u063A\u0644\u0627\u0642</button>
                    </div>
                </div>
            `,document.body.appendChild(p),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(p,{moduleKey:"change-management",record:e,recordId:e.id||e.requestNumber||""})},async updateRequestStatus(a,t){const e=typeof AppState<"u"&&AppState.currentUser?AppState.currentUser:{},s=e.name||e.email||"System",n={status:t,updatedBy:e.email||e.name||s,updateNote:"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629 \u0625\u0644\u0649 "+this.getStatusLabel(t)};t==="Approved"&&(n.approvedBy=s),t==="Rejected"&&(n.rejectedBy=s),t==="Completed"&&(n.implementedBy=s),t==="Closed"&&(n.closedBy=s);try{const i=await GoogleIntegration.sendRequest({action:"updateChangeRequest",data:{requestId:a,updateData:n}});i&&i.success?(typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629"),await this.loadChangeRequests()):typeof Notification<"u"&&Notification.error&&Notification.error(i?.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}},rejectRequest(a){const t=prompt("\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):"),e=typeof AppState<"u"&&AppState.currentUser?AppState.currentUser:{},s=e.name||e.email||"System",n={status:"Rejected",rejectedBy:s,rejectionReason:t||"\u0628\u062F\u0648\u0646 \u0633\u0628\u0628",updatedBy:e.email||e.name||s,updateNote:"\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628"};GoogleIntegration.sendRequest({action:"updateChangeRequest",data:{requestId:a,updateData:n}}).then(i=>{i&&i.success&&(typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628"),this.loadChangeRequests()),document.querySelectorAll(".modal-overlay").forEach(r=>r.remove())})},async showStatistics(){const a=document.getElementById("change-btn-statistics"),t=a?a.innerHTML:"";a&&(a.disabled=!0,a.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...'),typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A...");try{const e=await GoogleIntegration.sendRequest({action:"getChangeRequestStatistics",data:{filters:this.buildFilters()}});if(typeof Loading<"u"&&Loading.hide&&Loading.hide(),!e||!e.success){typeof Notification<"u"&&Notification.error&&Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A");return}const s=e.data||{},n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
                <div class="modal-content" style="max-width: 700px;">
                    <div class="modal-header">
                        <h2 class="modal-title">\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</h2>
                        <button type="button" onclick="this.closest('.modal-overlay').remove()" class="modal-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div class="bg-blue-50 p-4 rounded text-center">
                                <div class="text-2xl font-bold text-blue-600">${s.total||0}</div>
                                <div class="text-sm text-gray-600">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0637\u0644\u0628\u0627\u062A</div>
                            </div>
                            <div class="bg-green-50 p-4 rounded text-center">
                                <div class="text-2xl font-bold text-green-600">${s.byStatus&&s.byStatus.Approved?s.byStatus.Approved:0}</div>
                                <div class="text-sm text-gray-600">\u0645\u0639\u062A\u0645\u062F</div>
                            </div>
                            <div class="bg-red-50 p-4 rounded text-center">
                                <div class="text-2xl font-bold text-red-600">${s.byStatus&&s.byStatus.Rejected?s.byStatus.Rejected:0}</div>
                                <div class="text-sm text-gray-600">\u0645\u0631\u0641\u0648\u0636</div>
                            </div>
                            <div class="bg-teal-50 p-4 rounded text-center">
                                <div class="text-2xl font-bold text-teal-600">${s.byStatus&&s.byStatus.Completed?s.byStatus.Completed:0}</div>
                                <div class="text-sm text-gray-600">\u0645\u0646\u0641\u0630</div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">\u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</h3>
                            ${this.renderStatsBars(s.byStatus)}
                        </div>
                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">\u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631</h3>
                            ${this.renderStatsBars(s.byChangeType)}
                        </div>
                        <div>
                            <h3 class="font-semibold mb-2">\u062D\u0633\u0628 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</h3>
                            ${this.renderStatsBars(s.byPriority)}
                        </div>
                    </div>
                </div>
            `,document.body.appendChild(n)}catch{typeof Loading<"u"&&Loading.hide&&Loading.hide(),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A")}finally{a&&(a.disabled=!1,a.innerHTML=t||'<i class="fas fa-chart-bar ml-2"></i> \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A')}},renderStatsBars(a){if(!a||typeof a!="object")return'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>';const t=Object.values(a).reduce((e,s)=>e+s,0);return t===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>':Object.entries(a).map(([e,s])=>{const n=t>0?(s/t*100).toFixed(1):0;return`
                <div class="mb-2">
                    <div class="flex justify-between text-sm mb-1">
                        <span>${this.getStatusLabel(e)||this.getChangeTypeLabel(e)||this.getPriorityLabel(e)||e}</span>
                        <span>${s} (${n}%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${n}%"></div>
                    </div>
                </div>
            `}).join("")},getModuleOptions(){return["incidents","nearmiss","ptw","training","clinic","fire-equipment","ppe","violations","contractors","daily-observations","risk-assessment","sop-jha","action-tracking","settings","Other"].map(t=>`<option value="${t}">${t}</option>`).join("")},getCurrentApprovalStepLabel(a){try{let t=[];if(Array.isArray(a.approvalFlowJson))t=a.approvalFlowJson;else if(typeof a.approvalFlowJson=="string"&&a.approvalFlowJson)try{t=JSON.parse(a.approvalFlowJson)}catch{t=[]}if(!t||!t.length)return{stepLabel:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",statusLabel:this.getStatusLabel(a.status)};const e=t.find(o=>o&&o.status==="pending"),s=t.find(o=>o&&o.status==="rejected"),n=e||s||t[t.length-1];let i=n&&n.name?n.name:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r="";const l=n&&n.status||"";return l==="pending"?r="\u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F":l==="approved"?r="\u0645\u0639\u062A\u0645\u062F":l==="rejected"?r="\u0645\u0631\u0641\u0648\u0636":r=this.getStatusLabel(a.status),{stepLabel:i,statusLabel:r}}catch{return{stepLabel:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",statusLabel:this.getStatusLabel(a.status)}}},getStatusLabel(a){return{Draft:"\u0645\u0633\u0648\u062F\u0629","In Review":"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",Approved:"\u0645\u0639\u062A\u0645\u062F",Rejected:"\u0645\u0631\u0641\u0648\u0636","In Implementation":"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630",Completed:"\u0645\u0646\u0641\u0630",Closed:"\u0645\u063A\u0644\u0642"}[a]||a},getChangeTypeLabel(a){return{Technical:"\u062A\u0642\u0646\u064A",Administrative:"\u0625\u062F\u0627\u0631\u064A",Organizational:"\u062A\u0646\u0638\u064A\u0645\u064A"}[a]||a},getPriorityLabel(a){return{"1-VeryHigh":"\u0639\u0627\u0644\u064A \u062C\u062F\u0627\u064B","2-High":"\u0639\u0627\u0644\u064A","3-Medium":"\u0645\u062A\u0648\u0633\u0637","4-Low":"\u0645\u0646\u062E\u0641\u0636"}[a]||a},getImpactLabel(a){return{"1-Minor":"\u0628\u0633\u064A\u0637","2-Major":"\u0643\u0628\u064A\u0631","3-Critical":"\u062D\u0631\u062C"}[a]||a},formatDate(a){if(!a)return"\u2014";try{return new Date(a).toLocaleDateString("ar-SA")}catch{return a}},getExportData(){return(this.state.lastRequests||[]).map(t=>{const e=t.description||"",s=t.administrativeChangeSubType?t.administrativeChangeSubType==="AssignmentRequest"?"\u0637\u0644\u0628 \u062A\u0643\u0644\u064A\u0641":t.administrativeChangeSubType==="TransferTechnicians"?"\u0646\u0642\u0644 \u0644\u0644\u0641\u0646\u064A\u064A\u0646":"\u0623\u062E\u0631\u0649":"",n=t.technicalChangeSubType?t.technicalChangeSubType==="ProductionProcess"?"\u0639\u0645\u0644\u064A\u0629 \u0625\u0646\u062A\u0627\u062C\u064A\u0629":"\u0639\u0645\u0644\u064A\u0629 \u063A\u064A\u0631 \u0625\u0646\u062A\u0627\u062C\u064A\u0629":"";return{"\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628 (MOC)":this.getDisplayRequestNumber(t)||t.requestNumber||t.id,"\u0631\u0642\u0645 \u0627\u0644\u0646\u0638\u0627\u0645 (CRQ)":t.id||"",\u0627\u0644\u062A\u0627\u0631\u064A\u062E:this.formatDate(t.requestedAt||t.createdAt),\u0627\u0644\u0645\u0648\u0636\u0648\u0639:t.title||"\u2014","\u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631":this.getChangeTypeLabel(t.changeType),"\u0646\u0648\u0639 \u0641\u0631\u0639\u064A (\u0641\u0646\u064A/\u0625\u062F\u0627\u0631\u064A)":n||s||"\u2014",\u0627\u0644\u062D\u0627\u0644\u0629:this.getStatusLabel(t.status),\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:this.getPriorityLabel(t.priority),\u0627\u0644\u0623\u062B\u0631:this.getImpactLabel(t.impact),"\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628":t.requestedBy||"\u2014","\u0645\u0646 \u0625\u062F\u0627\u0631\u0629":t.fromDepartment||"\u2014","\u0625\u0644\u0649 \u0625\u062F\u0627\u0631\u0629":t.toDepartment||"\u2014",\u0627\u0644\u0645\u0635\u0646\u0639:t.factoryName||"\u2014","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A":t.subLocationName||"\u2014","\u0645\u0648\u0642\u0639 \u0622\u062E\u0631":t.locationOther||"\u2014","\u0627\u0633\u062A\u0645\u0631\u0627\u0631\u064A\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631":t.changeContinuity==="Permanent"?"\u062F\u0627\u0626\u0645":t.changeContinuity==="Temporary"?"\u0645\u0624\u0642\u062A":"\u2014","\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0645\u0624\u0642\u062A":this.formatDate(t.temporaryUntilDate),"\u0633\u0628\u0628 \u0627\u0644\u0639\u062C\u0644\u0629":t.priorityUrgentReason||"\u2014","\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0643\u0627\u0645\u0644":e,"\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0642\u0629":t.attachedDocumentsText||"\u2014","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629":t.requestingDepartment||"\u2014","\u0625\u062F\u0627\u0631\u0627\u062A \u0623\u062E\u0631\u0649":t.otherDepartments||"\u2014","\u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629":t.affectedDepartments||"\u2014","\u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u0644\u062C\u0646\u0629":t.committeeRecommendations||"\u2014","\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631":t.riskAssessment||"\u2014","\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u062E\u0641\u064A\u0641":t.mitigationActions||"\u2014","\u062A\u0627\u0631\u064A\u062E \u0645\u0633\u062A\u0647\u062F\u0641 \u0644\u0644\u062A\u0646\u0641\u064A\u0630":this.formatDate(t.dueDate),"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641":t.employeeName||"\u2014","\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641":t.employeeCode||"\u2014","\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":t.currentTasksDescription||"\u2014","\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F\u0629":t.newTasksDescription||"\u2014","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0637\u0627\u0644\u0628":t.responsibleRequestingDepartment||"\u2014","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u0646\u0641\u0630":t.responsibleImplementingDepartment||"\u2014","\u0625\u0635\u0627\u0628\u0629 \u0633\u0627\u0628\u0642\u0629":t.previousInjury||"\u2014","\u0623\u0645\u0631\u0627\u0636 \u0645\u0632\u0645\u0646\u0629":t.chronicDiseases||"\u2014","\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0635\u062D\u064A\u0629":t.healthNotes||"\u2014","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636":t.rejectionReason||"\u2014"}})},getExportHeaderFooter(){const a=typeof AppState<"u"&&AppState.companySettings&&AppState.companySettings.name?String(AppState.companySettings.name).trim():typeof AppState<"u"&&AppState.companyName?String(AppState.companyName).trim():"",t=typeof AppState<"u"&&(AppState.companyLogo||AppState.companySettings&&AppState.companySettings.logo)&&(AppState.companyLogo||AppState.companySettings.logo)||"",e="\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062A\u063A\u064A\u064A\u0631 - \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A",s=this.formatDate(new Date().toISOString()),i=(typeof Utils<"u"&&Utils.formatDateTime?Utils.formatDateTime:r=>this.formatDate(r))(new Date().toISOString());return{companyName:a,logoUrl:t,reportTitle:e,exportDate:s,exportDateTime:i}},exportToExcel(){try{const a=this.getExportData();if(!a||a.length===0){typeof Notification<"u"&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){typeof Notification<"u"&&Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649");return}typeof Loading<"u"&&Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 Excel...");const t=this.getExportHeaderFooter(),e=[[t.companyName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A"],[t.reportTitle],["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+t.exportDateTime],[]],s=Object.keys(a[0]||{}),n=a.map(u=>s.map(c=>u[c]!=null&&u[c]!==void 0?String(u[c]):"")),i=s.map((u,c)=>c===0?"\u2014 \u062A\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A "+t.exportDateTime+" \u2014":""),r=e.concat([s],n,[i]),l=XLSX.utils.aoa_to_sheet(r),o=["\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0643\u0627\u0645\u0644","\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0642\u0629","\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629","\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F\u0629","\u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u0644\u062C\u0646\u0629","\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631","\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u062E\u0641\u064A\u0641","\u0633\u0628\u0628 \u0627\u0644\u0639\u062C\u0644\u0629","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636"];l["!cols"]=s.map(u=>({wch:o.indexOf(u)>=0?45:u.length>12?22:14}));const g=XLSX.utils.book_new();XLSX.utils.book_append_sheet(g,l,"\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062A\u063A\u064A\u064A\u0631");const m=`\u0637\u0644\u0628\u0627\u062A_\u0627\u0644\u062A\u063A\u064A\u064A\u0631_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(g,m),typeof Loading<"u"&&Loading.hide(),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(a){typeof Loading<"u"&&Loading.hide(),typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062A\u0635\u062F\u064A\u0631 Excel:",a),typeof Notification<"u"&&Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(a.message||a))}},exportToPDF(){try{const a=this.getExportData();if(!a||a.length===0){typeof Notification<"u"&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}typeof Loading<"u"&&Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF...");const t=this.getExportHeaderFooter(),e=s=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(s||"")):String(s||"");if(typeof window.jsPDF<"u"){const{jsPDF:s}=window.jsPDF,n=new s("l","mm","a4"),i=n.internal.pageSize.getWidth(),r=n.internal.pageSize.getHeight();n.setFontSize(10),t.companyName&&n.text(t.companyName,i/2,10,{align:"center"}),n.setFontSize(14),n.setFont(void 0,"bold"),n.text(t.reportTitle,i/2,t.companyName?18:12,{align:"center"}),n.setFont(void 0,"normal"),n.setFontSize(9),n.text("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+t.exportDateTime+"  |  \u0639\u062F\u062F \u0627\u0644\u0637\u0644\u0628\u0627\u062A: "+a.length,14,t.companyName?25:20);const l=t.companyName?30:25,o=Object.keys(a[0]||{}),g=o,m=a.map(c=>o.map(d=>String(c[d]!=null&&c[d]!==void 0?c[d]:"\u2014"))),u=t.companyName?t.companyName+" \u2014 "+t.reportTitle+" \u2014 \u062A\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A "+t.exportDateTime:"\u062A\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A "+t.exportDateTime;if(typeof n.autoTable<"u")n.autoTable({head:[g],body:m,startY:l,styles:{fontSize:5,cellPadding:1},headStyles:{fillColor:[37,99,235],textColor:255,fontSize:5},alternateRowStyles:{fillColor:[245,247,250]},margin:{left:8,right:8},overflow:"linebreak",didDrawPage:c=>{n.setFontSize(8),n.setTextColor(128,128,128),n.text(u,i/2,r-10,{align:"center"}),n.setTextColor(0,0,0)}});else{let c=l;m.forEach(d=>{c>r-25&&(n.addPage("l","a4"),c=20),n.setFontSize(5),n.text(d.join(" | "),8,c,{maxWidth:i-16}),c+=5}),n.setFontSize(8),n.setTextColor(128,128,128),n.text(u,i/2,r-10,{align:"center"})}n.save(`\u0637\u0644\u0628\u0627\u062A_\u0627\u0644\u062A\u063A\u064A\u064A\u0631_${new Date().toISOString().slice(0,10)}.pdf`)}else{const s=t.logoUrl?`<img src="${e(t.logoUrl)}" alt="" style="max-height:48px; max-width:120px; object-fit:contain;">`:"",n=`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>${e(t.reportTitle)}</title>
<style>
@page { margin: 1.5cm; }
body { font-family: 'Cairo', Tahoma, sans-serif; margin: 0; padding: 15px; }
.export-header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 12px; margin-bottom: 15px; }
.export-header .company-name { font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 4px; white-space: nowrap; word-break: keep-all; overflow-wrap: normal; }
.export-header .report-title { font-size: 16px; color: #2563eb; }
.export-header .export-meta { font-size: 11px; color: #666; margin-top: 6px; }
.export-footer { text-align: center; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 15px; font-size: 10px; color: #666; }
table { border-collapse: collapse; width: 100%; font-size: 9px; table-layout: fixed; }
th, td { border: 1px solid #ddd; padding: 6px; text-align: right; }
th { background: #2563eb; color: #fff; }
tr:nth-child(even) { background: #f5f7fa; }
</style></head><body>
<div class="export-header">
  ${s}
  ${t.companyName?'<div class="company-name">'+e(t.companyName)+"</div>":""}
  <div class="report-title">${e(t.reportTitle)}</div>
  <div class="export-meta">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${e(t.exportDateTime)}  |  \u0639\u062F\u062F \u0627\u0644\u0637\u0644\u0628\u0627\u062A: ${a.length}</div>
</div>
<table><thead><tr>${Object.keys(a[0]||{}).map(r=>"<th>"+e(r)+"</th>").join("")}</tr></thead><tbody>
${a.map(r=>"<tr>"+Object.keys(a[0]||{}).map(l=>"<td>"+e(r[l])+"</td>").join("")+"</tr>").join("")}
</tbody></table>
<div class="export-footer">${e(t.companyName||"")} ${t.companyName?"\u2014 ":""}${e(t.reportTitle)} \u2014 \u062A\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A ${e(t.exportDateTime)}</div>
</body></html>`,i=window.open("","_blank");i.document.write(n),i.document.close(),i.print(),i.onafterprint=()=>i.close()}typeof Loading<"u"&&Loading.hide(),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 PDF \u0628\u0646\u062C\u0627\u062D")}catch(a){typeof Loading<"u"&&Loading.hide(),typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062A\u0635\u062F\u064A\u0631 PDF:",a),typeof Notification<"u"&&Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(a.message||a))}},async handleApprovalAction(a,t){try{if(!a||t!=="approve"&&t!=="reject")return;const e=typeof AppState<"u"&&AppState.currentUser?AppState.currentUser:{},s=e.name||e.email||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n=e.email||e.id||"";let i="";t==="reject"&&(i=window.prompt("\u0628\u0631\u062C\u0627\u0621 \u062A\u0648\u0636\u064A\u062D \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:","")||"\u0628\u062F\u0648\u0646 \u0633\u0628\u0628"),typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F...");const r=await GoogleIntegration.sendRequest({action:"getChangeRequest",data:{requestId:a}});if(!r||!r.success||!r.data){typeof Loading<"u"&&Loading.hide&&Loading.hide(),typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628");return}const l=r.data;let o=[];if(Array.isArray(l.approvalFlowJson))o=l.approvalFlowJson;else if(typeof l.approvalFlowJson=="string"&&l.approvalFlowJson)try{o=JSON.parse(l.approvalFlowJson)}catch{o=[]}if(!o||!o.length){typeof Loading<"u"&&Loading.hide&&Loading.hide(),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0639\u0631\u0641\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628");return}const g=o.findIndex(y=>y&&y.status==="pending");if(g===-1){typeof Loading<"u"&&Loading.hide&&Loading.hide(),typeof Notification<"u"&&Notification.info&&Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u062E\u0637\u0648\u0629 \u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u062D\u0627\u0644\u064A\u0627\u064B");return}const m=o[g],u=new Date().toISOString();t==="approve"?(m.status="approved",m.approvedByEmail=n,m.approvedByName=s,m.approvedAt=u):(m.status="rejected",m.rejectedByEmail=n,m.rejectedByName=s,m.rejectedAt=u,m.rejectionReason=i);let c="in_progress",d="",p=l.status||"Draft";const f=o.some(y=>y&&y.status==="rejected");let v=null;if(f||(v=o.find(y=>y&&y.status==="pending")),f){c="rejected";const y=o.find(D=>D&&D.status==="rejected");d=y&&y.id?y.id:"",p="Rejected"}else v?(c="in_progress",d=v.id||"",p==="Draft"&&(p="In Review")):(c="approved",d="",(p==="Draft"||p==="In Review"||!p)&&(p="Approved"));const h={approvalFlowJson:JSON.stringify(o),approvalStatus:c,currentApprovalStep:d,status:p,updatedBy:n||s,updateNote:t==="approve"?"\u0627\u0639\u062A\u0645\u0627\u062F \u062E\u0637\u0648\u0629 \u0641\u064A \u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A":"\u0631\u0641\u0636 \u062E\u0637\u0648\u0629 \u0641\u064A \u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A"};c==="approved"&&(h.approvedBy=s,h.approvedAt=u),c==="rejected"&&(h.rejectedBy=s,h.rejectedAt=u,h.rejectionReason=i);const w=await GoogleIntegration.sendRequest({action:"updateChangeRequest",data:{requestId:a,updateData:h}});if(typeof Loading<"u"&&Loading.hide&&Loading.hide(),!w||!w.success){typeof Notification<"u"&&Notification.error&&Notification.error(w?.message||"\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F");return}typeof Notification<"u"&&Notification.success&&Notification.success(t==="approve"?"\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),this.loadChangeRequests()}catch(e){typeof Loading<"u"&&Loading.hide&&Loading.hide(),typeof Utils<"u"&&Utils.safeError&&Utils.safeError("handleApprovalAction:",e),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0646\u0641\u064A\u0630 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}},async exportSingleRequestToPDF(a){try{let e=(Array.isArray(this.state.lastRequests)?this.state.lastRequests:[]).find(b=>String(b.id)===String(a));if(!e&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628...");const b=await GoogleIntegration.sendRequest({action:"getChangeRequest",data:{requestId:a}});if(typeof Loading<"u"&&Loading.hide&&Loading.hide(),b&&b.success&&b.data)e=b.data;else{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}}if(!e){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const s=b=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(b||"")):String(b||""),n=this.getDisplayRequestNumber(e)||e.requestNumber||e.id||"",i=`MOC-${s(e.id||"")}`,r="\u0637\u0644\u0628 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A - \u0646\u0645\u0648\u0630\u062C \u0645\u0642\u062A\u0631\u062D \u062A\u063A\u064A\u064A\u0631",l=this.getChangeTypeLabel(e.changeType),o=this.getPriorityLabel(e.priority),g=this.getImpactLabel(e.impact),m=this.formatDate(e.requestedAt||e.createdAt),u=this.formatDate(e.dueDate),c=e.changeContinuity==="Permanent"?"\u062F\u0627\u0626\u0645":e.changeContinuity==="Temporary"?`\u0645\u0624\u0642\u062A \u062D\u062A\u0649 ${this.formatDate(e.temporaryUntilDate)}`:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",d=(b,x)=>`
                <tr>
                    <td style="border:1px solid #e5e7eb;padding:8px 10px;background:#f9fafb;font-weight:600;width:28%;">${b}</td>
                    <td style="border:1px solid #e5e7eb;padding:8px 10px;">${s(x||"\u2014")}</td>
                </tr>
            `;let p="";try{let b=e.documentsToAmendJson;typeof b=="string"&&b&&(b=JSON.parse(b)),Array.isArray(b)&&b.length&&(p=`
                        <table style="width:100%;border-collapse:collapse;margin-top:8px;font-size:11px;">
                            <thead>
                                <tr>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u0646\u0648\u0639 \u0627\u0644\u0648\u062B\u064A\u0642\u0629</th>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u0627\u0633\u0645 \u0627\u0644\u0648\u062B\u064A\u0642\u0629</th>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u0627\u0644\u0643\u0648\u062F</th>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u0627\u0644\u0645\u0633\u0626\u0648\u0644</th>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u062A\u0627\u0631\u064A\u062E \u0645\u062E\u0637\u0637</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${b.map(x=>`
                                    <tr>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(x.documentType)}</td>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(x.documentName)}</td>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(x.documentCode)}</td>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(x.responsibleForAmendment)}</td>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(this.formatDate(x.plannedAmendmentDate))}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    `)}catch{p=""}let f="";try{let b=e.trainingRequirementsJson;typeof b=="string"&&b&&(b=JSON.parse(b)),Array.isArray(b)&&b.length&&(f=`
                        <table style="width:100%;border-collapse:collapse;margin-top:8px;font-size:11px;">
                            <thead>
                                <tr>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u0627\u0644\u0645\u062A\u0637\u0644\u0628</th>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u062A\u0627\u0631\u064A\u062E \u0645\u062E\u0637\u0637</th>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</th>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630</th>
                                    <th style="border:1px solid #e5e7eb;padding:6px 8px;background:#f3f4f6;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${b.map(x=>`
                                    <tr>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(x.requirement)}</td>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(this.formatDate(x.plannedDate))}</td>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(x.responsible)}</td>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(this.formatDate(x.executionDate))}</td>
                                        <td style="border:1px solid #e5e7eb;padding:6px 8px;">${s(x.notes)}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    `)}catch{f=""}const v=`
                <div style="margin-bottom:18px;">
                    <h2 style="text-align:center;color:#111827;margin:0 0 6px;font-size:18px;">\u0646\u0645\u0648\u0630\u062C \u0645\u0642\u062A\u0631\u062D \u062A\u063A\u064A\u064A\u0631 (\u0641\u0646\u064A / \u0625\u062F\u0627\u0631\u064A)</h2>
                    <p style="text-align:center;color:#4b5563;margin:0;font-size:12px;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628: ${s(n)}</p>
                </div>

                <table style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:12px;">
                    ${d("\u0631\u0642\u0645 \u0627\u0644\u0646\u0638\u0627\u0645 (CRQ)",e.id)}
                    ${d("\u0627\u0644\u062A\u0627\u0631\u064A\u062E",m)}
                    ${d("\u0645\u0646 / \u0625\u062F\u0627\u0631\u0629",e.fromDepartment)}
                    ${d("\u0625\u0644\u0649 / \u0625\u062F\u0627\u0631\u0629 (\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631)",e.toDepartment)}
                    ${d("\u0627\u0644\u0645\u0635\u0646\u0639",e.factoryName)}
                    ${d("\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A",e.subLocationName)}
                    ${d("\u0645\u0648\u0642\u0639 \u0622\u062E\u0631",e.locationOther)}
                    ${d("\u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631",l)}
                    ${d("\u0623\u0648\u0644\u0648\u064A\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631",o)}
                    ${d("\u0627\u0644\u0623\u062B\u0631",g)}
                    ${d("\u0627\u0633\u062A\u0645\u0631\u0627\u0631\u064A\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631",c)}
                    ${d("\u062A\u0627\u0631\u064A\u062E \u0645\u0633\u062A\u0647\u062F\u0641 \u0644\u0644\u062A\u0646\u0641\u064A\u0630",u)}
                    ${d("\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628",e.requestedBy)}
                </table>

                <div style="margin-top:16px;margin-bottom:10px;font-weight:700;color:#111827;">\u0648\u0635\u0641 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0642\u062A\u0631\u062D</div>
                <div style="border:1px solid #e5e7eb;padding:10px 12px;border-radius:6px;min-height:60px;font-size:12px;">${s(e.description||"")}</div>

                ${e.attachedDocumentsText?`
                    <div style="margin-top:16px;margin-bottom:10px;font-weight:700;color:#111827;">\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0642\u0629</div>
                    <div style="border:1px solid #e5e7eb;padding:10px 12px;border-radius:6px;min-height:40px;font-size:12px;">${s(e.attachedDocumentsText)}</div>
                `:""}

                ${e.requestingDepartment||e.otherDepartments||e.affectedDepartments?`
                    <div style="margin-top:18px;margin-bottom:10px;font-weight:700;color:#111827;">\u0644\u062C\u0646\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</div>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:12px;">
                        ${e.requestingDepartment?d("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0637\u0627\u0644\u0628 \u0644\u0644\u062A\u063A\u064A\u064A\u0631",e.requestingDepartment):""}
                        ${e.otherDepartments?d("\u0625\u062F\u0627\u0631\u0627\u062A / \u0623\u0642\u0633\u0627\u0645 \u0623\u062E\u0631\u0649",e.otherDepartments):""}
                        ${e.affectedDepartments?d("\u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0623\u0648 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629",e.affectedDepartments):""}
                    </table>
                `:""}

                ${e.employeeCode||e.employeeName||e.adminChangeLocation?`
                    <div style="margin-top:18px;margin-bottom:10px;font-weight:700;color:#111827;">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 (\u0644\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629)</div>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:12px;">
                        ${e.employeeCode?d("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A",e.employeeCode):""}
                        ${e.employeeName?d("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",e.employeeName):""}
                        ${e.adminChangeLocation?d("\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631",e.adminChangeLocation):""}
                        ${e.currentTasksDescription?d("\u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629",e.currentTasksDescription):""}
                        ${e.newTasksDescription?d("\u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F\u0629",e.newTasksDescription):""}
                        ${e.responsibleRequestingDepartment?d("\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0637\u0627\u0644\u0628 \u0644\u0644\u062A\u063A\u064A\u064A\u0631",e.responsibleRequestingDepartment):""}
                        ${e.responsibleImplementingDepartment?d("\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0646\u0641\u0630",e.responsibleImplementingDepartment):""}
                    </table>
                `:""}

                ${e.previousInjury||e.chronicDiseases||e.healthNotes?`
                    <div style="margin-top:18px;margin-bottom:10px;font-weight:700;color:#111827;">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0644\u0644\u0645\u0648\u0638\u0641</div>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:12px;">
                        ${e.previousInjury?d("\u0625\u0635\u0627\u0628\u0629 \u0633\u0627\u0628\u0642\u0629",e.previousInjury):""}
                        ${e.chronicDiseases?d("\u0623\u0645\u0631\u0627\u0636 \u0645\u0632\u0645\u0646\u0629",e.chronicDiseases):""}
                        ${e.healthNotes?d("\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0635\u062D\u064A\u0629",e.healthNotes):""}
                    </table>
                `:""}

                ${f?`
                    <div style="margin-top:18px;margin-bottom:10px;font-weight:700;color:#111827;">\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0648\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649</div>
                    ${f}
                `:""}

                ${p?`
                    <div style="margin-top:18px;margin-bottom:10px;font-weight:700;color:#111827;">\u0627\u0644\u0648\u062B\u0627\u0626\u0642 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062A\u0639\u062F\u064A\u0644\u0647\u0627</div>
                    ${p}
                `:""}

                ${e.committeeMembersJson||e.committeeRecommendations?`
                    <div style="margin-top:18px;margin-bottom:10px;font-weight:700;color:#111827;">\u0644\u062C\u0646\u0629 \u062F\u0631\u0627\u0633\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A</div>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:12px;">
                        ${e.committeeMembersJson?d("\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0644\u062C\u0646\u0629",e.committeeMembersJson):""}
                        ${e.committeeRecommendations?d("\u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u0644\u062C\u0646\u0629",e.committeeRecommendations):""}
                    </table>
                `:""}

                ${e.riskAssessment||e.mitigationActions?`
                    <div style="margin-top:18px;margin-bottom:10px;font-weight:700;color:#111827;">\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u062E\u0641\u064A\u0641</div>
                    ${e.riskAssessment?`
                        <div style="margin-bottom:8px;font-size:12px;">
                            <div style="font-weight:600;margin-bottom:4px;">\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                            <div style="border:1px solid #e5e7eb;padding:8px 10px;border-radius:6px;">${s(e.riskAssessment)}</div>
                        </div>
                    `:""}
                    ${e.mitigationActions?`
                        <div style="font-size:12px;">
                            <div style="font-weight:600;margin-bottom:4px;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u062E\u0641\u064A\u0641</div>
                            <div style="border:1px solid #e5e7eb;padding:8px 10px;border-radius:6px;">${s(e.mitigationActions)}</div>
                        </div>
                    `:""}
                `:""}
            `,h=e.createdAt||new Date().toISOString(),w=e.updatedAt||e.createdAt||new Date().toISOString(),y=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(i,r,v,!1,!0,{source:"ChangeManagement",changeType:e.changeType||"",id:e.id||"",requestNumber:e.requestNumber||""},h,w):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${r}</title></head><body style="font-family:'Cairo','Segoe UI',Tahoma,Arial,sans-serif;direction:rtl;padding:20px;">${v}</body></html>`,D=new Blob(["\uFEFF"+y],{type:"text/html;charset=utf-8"}),S=URL.createObjectURL(D);!window.open(S,"_blank")&&typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")}catch(t){typeof Loading<"u"&&Loading.hide&&Loading.hide(),typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0637\u0644\u0628 \u0627\u0644\u062A\u063A\u064A\u064A\u0631:",t),typeof Notification<"u"&&Notification.error&&Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+(t&&t.message?t.message:String(t)))}},handleSearch(a){this.state.filters.search=a,this.state._searchDebounce&&clearTimeout(this.state._searchDebounce),this.state._searchDebounce=setTimeout(()=>{this.state._searchDebounce=null,this.loadChangeRequests()},350)},switchTab(a){this.state.activeTab=a;const t=document.getElementById("change-tab-requests"),e=document.getElementById("change-tab-register"),s=document.getElementById("change-tab-approvals"),n=document.querySelectorAll(".change-tab-btn");n.length&&n.forEach(function(i){i.classList.toggle("active",i.getAttribute("data-tab")===a)}),t&&(t.style.display=a==="requests"?"block":"none"),e&&(e.style.display=a==="register"?"block":"none"),s&&(s.style.display=a==="approvals"?"block":"none"),a==="register"?this.state.lastRequests&&this.state.lastRequests.length>0?this.renderRegisterTable(this.state.lastRequests):this.loadChangeRequests():a==="approvals"&&(this.state.lastRequests&&this.state.lastRequests.length>0?this.renderApprovalsList(this.state.lastRequests):this.loadChangeRequests())},renderRegisterTable(a){const t=document.getElementById("change-register-list-container");if(!t)return;const e=n=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(n||"")):String(n||"");if(!a||a.length===0){t.innerHTML='<div class="empty-state py-8"><i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0641\u064A \u0627\u0644\u0633\u062C\u0644</p></div>',this.applyModuleI18n(t);return}const s={Draft:"bg-gray-100 text-gray-800","In Review":"bg-blue-100 text-blue-800",Approved:"bg-green-100 text-green-800",Rejected:"bg-red-100 text-red-800","In Implementation":"bg-purple-100 text-purple-800",Completed:"bg-teal-100 text-teal-800",Closed:"bg-gray-100 text-gray-600"};t.innerHTML=`
            <div class="change-register-table-wrap" style="overflow-x:auto;">
                <table class="w-full border-collapse text-sm" style="border-color: var(--border-color);">
                    <thead>
                        <tr>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0646\u0648\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th class="p-3 text-right font-semibold" style="position:sticky;top:0;z-index:1;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;border-bottom:1px solid #0284c7;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${a.map((n,i)=>`
                            <tr class="border-b hover:opacity-90" style="border-color: var(--border-color); background: ${i%2===0?"var(--card-bg)":"rgba(241,245,249,0.8)"};">
                                <td class="p-3">${e(this.getDisplayRequestNumber(n)||n.requestNumber||n.id||"")}</td>
                                <td class="p-3">${e(n.title||"\u2014")}</td>
                                <td class="p-3">${this.getChangeTypeLabel(n.changeType)}</td>
                                <td class="p-3"><span class="px-2 py-1 rounded text-xs font-medium ${s[n.status]||"bg-gray-100"}">${this.getStatusLabel(n.status)}</span></td>
                                <td class="p-3">${e(n.requestedBy||"\u2014")}</td>
                                <td class="p-3">${this.formatDate(n.requestedAt||n.createdAt)}</td>
                                <td class="p-3"><button type="button" onclick="ChangeManagement.showRequestDetail('${e(n.id)}')" class="btn-secondary btn-sm"><i class="fas fa-eye ml-1"></i> \u0639\u0631\u0636</button></td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `,this.applyModuleI18n(t)},applyFilters(){this.loadChangeRequests()},showEmptyState(a){return`
            <div class="empty-state">
                <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">${a}</p>
            </div>
        `},setupEventListeners(){if(this._changeRequestsFilterDelegation)return;this._changeRequestsFilterDelegation=!0;const a=()=>{this.syncFiltersFromUI(),this.loadChangeRequests()},t=()=>{this.state._searchDebounce&&clearTimeout(this.state._searchDebounce),this.state._searchDebounce=setTimeout(()=>{this.state._searchDebounce=null,a()},400)};document.addEventListener("change",e=>{const s=e.target;if(!s||!s.id)return;["change-status-filter","change-type-filter","change-priority-filter","change-impact-filter","change-start-date","change-end-date"].indexOf(s.id)!==-1&&a()}),document.addEventListener("input",e=>{const s=e.target;(s&&s.id==="change-search"||s&&s.id==="change-module-filter")&&t()})}};(function(){"use strict";try{typeof window<"u"&&typeof ChangeManagement<"u"&&(window.ChangeManagement=ChangeManagement,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 ChangeManagement module loaded and available on window.ChangeManagement"))}catch{if(typeof window<"u"&&typeof ChangeManagement<"u")try{window.ChangeManagement=ChangeManagement}catch{}}})();
