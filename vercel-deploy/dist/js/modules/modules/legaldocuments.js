const LegalDocuments={state:{activeTab:"documents",filters:{documents:{search:"",type:"",status:"",issuedBy:"",dateFrom:"",dateTo:""}}},processPhoto(e){return typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"?Utils.normalizeImageSource(e)||null:!e||typeof e!="string"?null:e.trim()||null},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("legal-documents-section");if(e){if(typeof AppState>"u"){e.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0648\u062B\u0627\u0626\u0642 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</p>
                            <p class="text-sm text-gray-400">AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B. \u062C\u0631\u0651\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p>
                            <button onclick="location.reload()" class="btn-primary mt-4">
                                <i class="fas fa-redo ml-2"></i>
                                \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `,typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}try{e.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-gavel ml-3"></i>
                                \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u062A\u0634\u0631\u064A\u0639\u064A\u0629
                            </h1>
                            <p class="section-subtitle">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0648\u0627\u062C\u0647\u0629...</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;const t=typeof i18n<"u"&&i18n.translate?i18n.translate("legal.title"):"\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u062A\u0634\u0631\u064A\u0639\u064A\u0629",s=typeof i18n<"u"&&i18n.translate?i18n.translate("legal.subtitle"):"\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u062A\u0631\u0629 \u0635\u0644\u0627\u062D\u064A\u062A\u0647\u0627 \u0648\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A",a=typeof i18n<"u"&&i18n.translate?i18n.translate("legal.checkUpdates"):"\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629",o=typeof i18n<"u"&&i18n.translate?i18n.translate("legal.addDocument"):"\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A";e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-gavel ml-3"></i>
                            ${t}
                        </h1>
                        <p class="section-subtitle">${s}</p>
                    </div>
                    <div class="flex gap-2">
                        <button id="check-legal-updates-btn" class="btn-warning">
                            <i class="fas fa-sync-alt ml-2"></i>
                            ${a}
                        </button>
                        <button id="add-legal-document-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            ${o}
                        </button>
                    </div>
                </div>
            </div>
            <div id="legal-documents-content" class="mt-6">
                <!-- Tabs Navigation -->
                <div class="flex flex-wrap gap-2 mb-4" id="legal-tab-nav">
                    <button type="button" class="btn-secondary legal-tab-btn ${this.state.activeTab==="documents"?"active":""}" data-tab="documents">
                        <i class="fas fa-file-contract ml-2"></i>\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629
                    </button>
                    <button type="button" class="btn-secondary legal-tab-btn ${this.state.activeTab==="inventory"?"active":""}" data-tab="inventory">
                        <i class="fas fa-clipboard-list ml-2"></i>\u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646
                    </button>
                </div>
                
                <!-- Tab Panels -->
                <div id="legal-tab-panels">
                    <div class="legal-tab-panel" data-tab-panel="documents" style="display: ${this.state.activeTab==="documents"?"block":"none"}">
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <div style="width: 300px; margin: 0 auto 16px;">
                                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                        </div>
                                    </div>
                                    <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="legal-tab-panel" data-tab-panel="inventory" style="display: ${this.state.activeTab==="inventory"?"block":"none"}">
                        <div id="legal-register-section">
                            <div class="legal-kpi-grid">
                                <div class="legal-kpi-card kpi-blue">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-balance-scale"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A</p>
                                            <p class="kpi-value" id="lr-total-count">0</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="legal-kpi-card kpi-green">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-check-circle"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">\u0646\u0627\u0641\u0630</p>
                                            <p class="kpi-value" id="lr-applicable-count">0</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="legal-kpi-card kpi-amber">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-edit"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">\u0645\u0639\u062F\u0644</p>
                                            <p class="kpi-value" id="lr-amended-count">0</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="legal-kpi-card kpi-red">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-times-circle"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">\u0645\u0644\u063A\u064A</p>
                                            <p class="kpi-value" id="lr-repealed-count">0</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="legal-kpi-card kpi-purple">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-percentage"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">\u0646\u0633\u0628\u0629 \u0627\u0644\u0646\u0641\u0627\u0630</p>
                                            <p class="kpi-value" id="lr-compliance-rate">0%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="legal-filters-bar">
                                <div class="filter-group">
                                    <label>\u0627\u0644\u062A\u0635\u0646\u064A\u0641:</label>
                                    <select id="lr-category-filter" class="form-input" style="max-width: 200px;">
                                        <option value="">\u0627\u0644\u0643\u0644</option>
                                        ${this.LEGAL_REGISTER_CATEGORIES?this.LEGAL_REGISTER_CATEGORIES.map(n=>`<option value="${n.value}">${n.label}</option>`).join(""):""}
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                    <select id="lr-status-filter" class="form-input" style="max-width: 160px;">
                                        <option value="">\u0627\u0644\u0643\u0644</option>
                                        ${this.LEGAL_REGISTER_STATUSES?this.LEGAL_REGISTER_STATUSES.map(n=>`<option value="${n.value}">${n.label}</option>`).join(""):""}
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:</label>
                                    <select id="lr-priority-filter" class="form-input" style="max-width: 160px;">
                                        <option value="">\u0627\u0644\u0643\u0644</option>
                                        ${this.LEGAL_PRIORITIES?this.LEGAL_PRIORITIES.map(n=>`<option value="${n.value}">${n.label}</option>`).join(""):""}
                                    </select>
                                </div>
                                <button id="lr-reset-filter-btn" class="btn-secondary btn-sm">
                                    <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                                </button>
                                <button id="lr-add-btn" class="btn-primary btn-sm">
                                    <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u0634\u0631\u064A\u0639
                                </button>
                            </div>

                            <div class="lr-table-card">
                                <div class="card-header">
                                    <div class="legal-header-row">
                                        <div class="legal-title-section">
                                            <h3 class="card-title"><i class="fas fa-balance-scale ml-2"></i>\u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646</h3>
                                        </div>
                                        <div class="legal-header-actions">
                                            <div class="legal-search-wrapper">
                                                <i class="fas fa-search legal-search-icon"></i>
                                                <input type="text" id="lr-search" class="legal-search-input" placeholder="\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A...">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" id="lr-container">
                                    <div class="text-center py-8 text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u2026</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,this.setupEventListeners(),this.bindTabEvents(),setTimeout(async()=>{try{const n=document.querySelector('[data-tab-panel="documents"]'),i=document.querySelector('[data-tab-panel="inventory"]');if(n){const c=await this.renderList().catch(l=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A:",l),`
                                <div class="content-card">
                                    <div class="card-body">
                                        <div class="empty-state">
                                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                            <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                            <button onclick="LegalDocuments.load()" class="btn-primary">
                                                <i class="fas fa-redo ml-2"></i>
                                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `));n.innerHTML=c,this.state.activeTab==="documents"&&(this.loadLegalDocumentsList(),this.checkExpiringDocuments())}if(i){const c=await this.renderInventoryTab().catch(l=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0635\u0631:",l),`
                                <div class="content-card">
                                    <div class="card-body">
                                        <div class="empty-state">
                                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                            <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                            <button onclick="LegalDocuments.load()" class="btn-primary">
                                                <i class="fas fa-redo ml-2"></i>
                                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `));i.innerHTML=c,this.state.activeTab==="inventory"&&this.loadLegalRegisterList()}}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:",n)}},0)}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629:",t),e&&(e.innerHTML=`
                    <div class="section-header">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-gavel ml-3"></i>
                                \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u062A\u0634\u0631\u064A\u0639\u064A\u0629
                            </h1>
                        </div>
                    </div>
                    <div class="mt-6">
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                    <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                    <p class="text-sm text-gray-400 mb-4">${t&&t.message?Utils.escapeHTML(t.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                    <button onclick="LegalDocuments.load()" class="btn-primary">
                                        <i class="fas fa-redo ml-2"></i>
                                        \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `)}}},getStatistics(){try{const e=AppState.appData.legalDocuments||[],t=new Date;t.setHours(0,0,0,0);let s=e.length,a=0,o=0,n=0;return e.forEach(i=>{if(!i)return;let c=!1,l=null,r=0,p=!1;if(i.expiryDate)try{l=new Date(i.expiryDate),isNaN(l.getTime())||(c=!0,l.setHours(0,0,0,0),r=Math.ceil((l-t)/864e5),p=l<t)}catch{}if(c&&p&&a++,i.status==="\u0646\u0634\u0637"&&(!c||!p)&&(o++,c&&!p)){const u=parseInt(i.alertDays)||30;r<=u&&r>0&&n++}}),{total:s,expired:a,active:o,expiringSoon:n}}catch{return{total:0,expired:0,active:0,expiringSoon:0}}},renderStatisticsCards(){let e;try{e=this.getStatistics(),e={total:e.total||0,expired:e.expired||0,active:e.active||0,expiringSoon:e.expiringSoon||0}}catch{e={total:0,expired:0,active:0,expiringSoon:0}}return`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A -->
                <div class="content-card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-file-contract ml-2"></i>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A
                            </p>
                            <p class="text-3xl font-bold text-blue-600">${e.total}</p>
                            <p class="text-xs text-gray-500 mt-1">\u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A \u0645\u0633\u062C\u0644</p>
                        </div>
                        <div class="bg-blue-500 rounded-full p-4 shadow-md">
                            <i class="fas fa-file-contract text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629 -->
                <div class="content-card bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-exclamation-circle ml-2"></i>\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629
                            </p>
                            <p class="text-3xl font-bold text-red-600">${e.expired}</p>
                            <p class="text-xs text-gray-500 mt-1">${e.total>0?Math.round(e.expired/e.total*100):0}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</p>
                        </div>
                        <div class="bg-red-500 rounded-full p-4 shadow-md">
                            <i class="fas fa-exclamation-circle text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0633\u0627\u0631\u064A\u0629 -->
                <div class="content-card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-check-circle ml-2"></i>\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0633\u0627\u0631\u064A\u0629
                            </p>
                            <p class="text-3xl font-bold text-green-600">${e.active}</p>
                            <p class="text-xs text-gray-500 mt-1">\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0646\u0634\u0637\u0629 \u0648\u0635\u0627\u0644\u062D\u0629</p>
                        </div>
                        <div class="bg-green-500 rounded-full p-4 shadow-md">
                            <i class="fas fa-check-circle text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0642\u0631\u064A\u0628\u0629 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 -->
                <div class="content-card bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-clock ml-2"></i>\u0642\u0631\u064A\u0628\u0629 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621
                            </p>
                            <p class="text-3xl font-bold text-yellow-600">${e.expiringSoon}</p>
                            <p class="text-xs text-gray-500 mt-1">\u062A\u062D\u062A\u0627\u062C \u0645\u062A\u0627\u0628\u0639\u0629 \u0639\u0627\u062C\u0644\u0629</p>
                        </div>
                        <div class="bg-yellow-500 rounded-full p-4 shadow-md">
                            <i class="fas fa-clock text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderList(){return`
            <!-- \u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->
            <div id="legal-documents-stats-container" class="mb-6">
                ${this.renderStatisticsCards()}
            </div>
            
            <div class="content-card">
                    <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-list ml-2"></i>${typeof i18n<"u"&&i18n.translate?i18n.translate("legal.list"):"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629"}</h2>
                        <button id="export-legal-excel-btn" class="btn-success">
                            <i class="fas fa-file-excel ml-2"></i>${typeof i18n<"u"&&i18n.translate?i18n.translate("legal.exportExcel"):"\u062A\u0635\u062F\u064A\u0631 Excel"}
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="legal-documents-table-container">
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
            
            <div class="content-card mt-6">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-link ml-2"></i>\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</h2>
                </div>
                <div class="card-body">
                    <div class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded p-4">
                            <p class="text-sm text-blue-800 mb-3">
                                <i class="fas fa-info-circle ml-2"></i>
                                <strong>\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A:</strong> \u064A\u0645\u0643\u0646\u0643 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u062A\u0634\u0631\u064A\u0639\u064A\u0629 \u0639\u0628\u0631 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0631\u0633\u0645\u064A\u0629
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-globe ml-2"></i>
                                        \u0631\u0627\u0628\u0637 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A
                                    </label>
                                    <input type="url" id="legal-portal-url" class="form-input" 
                                        value="${AppState.legalPortalUrl||""}" 
                                        placeholder="https://example.com/legal-portal">
                                    <p class="text-xs text-gray-500 mt-1">\u0631\u0627\u0628\u0637 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0627\u0644\u0631\u0633\u0645\u064A\u0629 \u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-bell ml-2"></i>
                                        \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" id="legal-auto-notify" class="rounded border-gray-300 text-blue-600"
                                            ${AppState.legalAutoNotify?"checked":""}>
                                        <span class="mr-2 text-sm text-gray-700">\u062A\u0646\u0628\u064A\u0647 \u062A\u0644\u0642\u0627\u0626\u064A \u0639\u0646\u062F \u0648\u062C\u0648\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A</span>
                                    </label>
                                </div>
                            </div>
                            <div class="mt-4">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-keywords ml-2"></i>
                                    \u0643\u0644\u0645\u0627\u062A \u0645\u062A\u0627\u062D\u064A\u0629 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629
                                </label>
                                <textarea id="legal-keywords" class="form-input" rows="3"
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0644\u0645\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u064A\u0629 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629 (\u0645\u0635\u0648\u0644\u0629 \u0628\u0648\u0627\u0635\u0644)">${(AppState.legalKeywords||[]).join(", ")}</textarea>
                                <p class="text-xs text-gray-500 mt-1">\u0645\u062B\u0627\u0644: \u0633\u0644\u0627\u0645\u0629 \u0645\u0647\u0646\u064A\u0629\u060C \u0628\u064A\u0626\u0629\u060C \u0635\u062D\u0629\u060C \u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644</p>
                            </div>
                            <button type="button" id="save-legal-settings-btn" class="btn-primary mt-3">
                                <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `},updateStatisticsCards(){const e=document.getElementById("legal-documents-stats-container");e&&(e.innerHTML=this.renderStatisticsCards())},normalizeSearchText(e){return e==null?"":String(e).toLowerCase().replace(/[\u064B-\u065F\u0670]/g,"").replace(/ـ/g,"").replace(/[أإآ]/g,"\u0627").replace(/ى/g,"\u064A").replace(/ة/g,"\u0647").replace(/[٠-٩]/g,t=>String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(t))).replace(/\s+/g," ").trim()},getFilteredLegalDocuments(){const e=AppState.appData.legalDocuments||[],t=this.state.filters?.documents||{},s=this.normalizeSearchText(t.search||""),a=String(t.type||"").trim(),o=String(t.status||"").trim(),n=String(t.issuedBy||"").trim(),i=t.dateFrom?new Date(t.dateFrom):null,c=t.dateTo?new Date(t.dateTo):null;return i&&!isNaN(i.getTime())&&i.setHours(0,0,0,0),c&&!isNaN(c.getTime())&&c.setHours(23,59,59,999),e.filter(l=>{const r=String(l.documentType||""),p=l.expiryDate?new Date(l.expiryDate):null,u=new Date,g=parseInt(l.alertDays,10)||30,m=p&&!isNaN(p.getTime())?Math.ceil((p-u)/(1e3*60*60*24)):null,d=m!==null?m<=0:!1,f=m!==null?m>0&&m<=g:!1,D=String((d?"\u0645\u0646\u062A\u0647\u064A":f?"\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"\u0646\u0634\u0637")||l.status||""),L=String(l.issuedBy||""),w=l.issueDate?new Date(l.issueDate):null,y=this.normalizeSearchText([l.documentName||"",l.documentNumber||"",l.isoCode||"",l.documentType||"",l.issuedBy||"",l.description||""].join(" ")),S=!s||y.includes(s),b=!a||r===a,h=!o||D===o,x=!n||L===n;let $=!0;return w&&!isNaN(w.getTime())?(i&&w<i&&($=!1),c&&w>c&&($=!1)):(i||c)&&($=!1),S&&b&&h&&x&&$})},resetLegalDocumentFilters(){this.state.filters||(this.state.filters={}),this.state.filters.documents={search:"",type:"",status:"",issuedBy:"",dateFrom:"",dateTo:""}},bindLegalDocumentsFilterEvents(e){if(!e)return;const t=e.querySelector("#legal-docs-search"),s=e.querySelector("#legal-docs-filter-type"),a=e.querySelector("#legal-docs-filter-status"),o=e.querySelector("#legal-docs-filter-issued-by"),n=e.querySelector("#legal-docs-date-from"),i=e.querySelector("#legal-docs-date-to"),c=e.querySelector("#legal-docs-reset-filters");if(t){let l=!1;const r=(p,u=null)=>{this.state.filters.documents.search=p||"",this._legalDocsSearchDebounceTimer&&clearTimeout(this._legalDocsSearchDebounceTimer),this._legalDocsSearchDebounceTimer=setTimeout(()=>{this.loadLegalDocumentsList(),requestAnimationFrame(()=>{const g=document.getElementById("legal-docs-search");if(!g)return;g.focus();const m=typeof u=="number"?u:g.value.length;try{g.setSelectionRange(m,m)}catch{}})},120)};t.addEventListener("compositionstart",()=>{l=!0}),t.addEventListener("compositionend",p=>{l=!1,r(p.target.value,p.target.selectionStart)}),t.addEventListener("input",p=>{l||r(p.target.value,p.target.selectionStart)})}s&&s.addEventListener("change",l=>{this.state.filters.documents.type=l.target.value||"",this.loadLegalDocumentsList()}),a&&a.addEventListener("change",l=>{this.state.filters.documents.status=l.target.value||"",this.loadLegalDocumentsList()}),o&&o.addEventListener("change",l=>{this.state.filters.documents.issuedBy=l.target.value||"",this.loadLegalDocumentsList()}),n&&n.addEventListener("change",l=>{this.state.filters.documents.dateFrom=l.target.value||"",this.loadLegalDocumentsList()}),i&&i.addEventListener("change",l=>{this.state.filters.documents.dateTo=l.target.value||"",this.loadLegalDocumentsList()}),c&&c.addEventListener("click",()=>{this.resetLegalDocumentFilters(),this.loadLegalDocumentsList()})},async loadLegalDocumentsList(){const e=document.getElementById("legal-documents-table-container");if(!e)return;this.updateStatisticsCards();const t=AppState.appData.legalDocuments||[],s=this.getFilteredLegalDocuments(),a=this.state.filters?.documents||{},o=[...new Set(t.map(r=>String(r.documentType||"").trim()).filter(Boolean))].sort(),n=["\u0646\u0634\u0637","\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0645\u0646\u062A\u0647\u064A"],i=[...new Set(t.map(r=>String(r.issuedBy||"").trim()).filter(Boolean))].sort(),c=!!(a.search||a.type||a.status||a.issuedBy||a.dateFrom||a.dateTo);if(t.length===0){e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-gavel text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629</p>
                    <button id="add-legal-document-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A
                    </button>
                </div>
            `,setTimeout(()=>{const r=document.getElementById("add-legal-document-empty-btn");r&&r.addEventListener("click",()=>this.showForm())},50);return}e.innerHTML=`
            <div class="visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 14px -20px; width: calc(100% + 40px);">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <div class="filter-field" style="min-width: 180px;">
                        <label class="filter-label" for="legal-docs-search">
                            <i class="fas fa-search ml-1"></i>\u0628\u062D\u062B
                        </label>
                        <div class="relative w-full">
                            <input type="text" id="legal-docs-search" class="form-input pr-10 filter-input" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0631\u0642\u0645 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F" value="${Utils.escapeHTML(a.search||"")}">
                            <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                        </div>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="legal-docs-filter-type">
                            <i class="fas fa-tags ml-1"></i>\u0627\u0644\u0646\u0648\u0639
                            ${a.type?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C">${s.length}</span>`:""}
                        </label>
                        <select id="legal-docs-filter-type" class="form-input filter-input">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${o.map(r=>`<option value="${Utils.escapeHTML(r)}" ${a.type===r?"selected":""}>${Utils.escapeHTML(r)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="legal-docs-filter-status">
                            <i class="fas fa-signal ml-1"></i>\u0627\u0644\u062D\u0627\u0644\u0629
                            ${a.status?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C">${s.length}</span>`:""}
                        </label>
                        <select id="legal-docs-filter-status" class="form-input filter-input">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${n.map(r=>`<option value="${Utils.escapeHTML(r)}" ${a.status===r?"selected":""}>${Utils.escapeHTML(r)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="legal-docs-filter-issued-by">
                            <i class="fas fa-building ml-1"></i>\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0635\u0627\u062F\u0631\u0629
                            ${a.issuedBy?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C">${s.length}</span>`:""}
                        </label>
                        <select id="legal-docs-filter-issued-by" class="form-input filter-input">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${i.map(r=>`<option value="${Utils.escapeHTML(r)}" ${a.issuedBy===r?"selected":""}>${Utils.escapeHTML(r)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="legal-docs-date-from"><i class="fas fa-calendar-alt ml-1"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                        <input type="date" id="legal-docs-date-from" class="form-input filter-input" value="${a.dateFrom||""}">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="legal-docs-date-to"><i class="fas fa-calendar-check ml-1"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                        <input type="date" id="legal-docs-date-to" class="form-input filter-input" value="${a.dateTo||""}">
                    </div>
                    <div class="filter-field" style="min-width: 170px;">
                        <button
                            type="button"
                            id="legal-docs-reset-filters"
                            class="filter-reset-btn"
                            title="\u0625\u0644\u063A\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0648\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0648\u0636\u0639 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A"
                            style="width: 100%; min-height: 42px; border-radius: 12px; border: 1px solid #cbd5e1; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); color: #0f172a; font-weight: 700; letter-spacing: 0.2px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08); transition: all 0.2s ease;"
                            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 14px rgba(15, 23, 42, 0.16)'; this.style.borderColor='#94a3b8';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(15, 23, 42, 0.08)'; this.style.borderColor='#cbd5e1';"
                        >
                            <i class="fas fa-rotate-left ml-1"></i>
                            \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                        </button>
                    </div>
                </div>
            </div>
            ${c&&s.length===0?`
                <div class="empty-state">
                    <i class="fas fa-filter text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 mb-2">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p>
                    <button type="button" id="legal-docs-clear-empty-filters" class="btn-secondary mt-2">
                        <i class="fas fa-undo-alt ml-2"></i>
                        \u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                    </button>
                </div>
            `:""}
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0643\u0648\u062F ISO</th>
                            <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th>
                            <th>\u0627\u0644\u0646\u0648\u0639</th>
                            <th>\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                            <th>\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 (\u0623\u064A\u0627\u0645)</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${s.map(r=>{const p=new Date(r.expiryDate),u=new Date,g=Math.ceil((p-u)/(1e3*60*60*24)),m=p<u,d=g<=r.alertDays&&g>0;return`
                            <tr class="${m?"bg-red-50":d?"bg-yellow-50":""}">
                                <td>${Utils.escapeHTML(r.isoCode||"")}</td>
                                <td>${Utils.escapeHTML(r.documentName||"")}</td>
                                <td>${Utils.escapeHTML(r.documentType||"")}</td>
                                <td>${Utils.escapeHTML(r.documentNumber||"")}</td>
                                <td>${r.issueDate?Utils.formatDate(r.issueDate):"-"}</td>
                                <td>${r.expiryDate?Utils.formatDate(r.expiryDate):"-"}</td>
                                <td>
                                    <span class="${m?"text-red-600 font-bold":d?"text-yellow-600 font-bold":"text-green-600"}">
                                        ${m?"\u0645\u0646\u062A\u0647\u064A":d?`${g} \u064A\u0648\u0645`:`${g} \u064A\u0648\u0645`}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge badge-${m?"danger":d?"warning":"success"}">
                                        ${m?"\u0645\u0646\u062A\u0647\u064A":d?"\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"\u0646\u0634\u0637"}
                                    </span>
                                </td>
                                <td>${Utils.escapeHTML(r.followUpResponsible||"-")}</td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button onclick="LegalDocuments.viewDocument('${r.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button onclick="LegalDocuments.exportPDF('${r.id}')" class="btn-icon btn-icon-success" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                                            <i class="fas fa-file-pdf"></i>
                                        </button>
                                        <button onclick="LegalDocuments.editDocument('${r.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="LegalDocuments.deleteDocument('${r.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `}).join("")}
                    </tbody>
                </table>
            </div>
        `,this.bindLegalDocumentsFilterEvents(e);const l=document.getElementById("legal-docs-clear-empty-filters");l&&l.addEventListener("click",()=>{this.resetLegalDocumentFilters(),this.loadLegalDocumentsList()})},bindTabEvents(){document.querySelectorAll(".legal-tab-btn").forEach(t=>{t.addEventListener("click",()=>{const s=t.getAttribute("data-tab");!s||s===this.state.activeTab||(this.state.activeTab=s,this.renderTabNavigation(),this.renderActiveTabContent())})})},renderTabNavigation(){document.querySelectorAll(".legal-tab-btn").forEach(t=>{t.getAttribute("data-tab")===this.state.activeTab?(t.classList.remove("btn-secondary"),t.classList.add("btn-primary","active")):(t.classList.remove("btn-primary","active"),t.classList.add("btn-secondary"))})},renderActiveTabContent(){const e=this.state.activeTab||"documents";document.querySelectorAll(".legal-tab-panel").forEach(s=>{const a=s.getAttribute("data-tab-panel");s.style.display=a===e?"block":"none"}),e==="documents"?(this.loadLegalDocumentsList(),this.checkExpiringDocuments()):e==="inventory"&&this.loadLegalRegisterList()},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-legal-document-btn"),t=document.getElementById("add-legal-document-empty-btn");e&&e.addEventListener("click",()=>this.showForm()),t&&t.addEventListener("click",()=>this.showForm());const s=document.getElementById("export-legal-excel-btn");s&&s.addEventListener("click",()=>this.exportToExcel());const a=document.getElementById("check-legal-updates-btn");a&&a.addEventListener("click",()=>this.checkLegalUpdates());const o=document.getElementById("save-legal-settings-btn");o&&o.addEventListener("click",()=>this.saveLegalSettings());const n=document.getElementById("add-legal-inventory-btn");n&&n.addEventListener("click",()=>this.showInventoryForm());const i=document.getElementById("add-legal-inventory-empty-btn");i&&i.addEventListener("click",()=>this.showInventoryForm());const c=document.getElementById("export-legal-inventory-excel-btn");c&&c.addEventListener("click",()=>this.exportInventoryToExcel())},100)},async showForm(e=null){const t=!!e,s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="legal-document-form" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F *</label>
                                <input type="text" id="legal-doc-name" required class="form-input"
                                    value="${Utils.escapeHTML(e?.documentName||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F *</label>
                                <select id="legal-doc-type" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                    <option value="\u062A\u0631\u062E\u064A\u0635" ${e?.documentType==="\u062A\u0631\u062E\u064A\u0635"?"selected":""}>\u062A\u0631\u062E\u064A\u0635</option>
                                    <option value="\u0634\u0647\u0627\u062F\u0629" ${e?.documentType==="\u0634\u0647\u0627\u062F\u0629"?"selected":""}>\u0634\u0647\u0627\u062F\u0629</option>
                                    <option value="\u0639\u0642\u062F" ${e?.documentType==="\u0639\u0642\u062F"?"selected":""}>\u0639\u0642\u062F</option>
                                    <option value="\u0648\u062B\u064A\u0642\u0629 \u0642\u0627\u0646\u0648\u0646\u064A\u0629" ${e?.documentType==="\u0648\u062B\u064A\u0642\u0629 \u0642\u0627\u0646\u0648\u0646\u064A\u0629"?"selected":""}>\u0648\u062B\u064A\u0642\u0629 \u0642\u0627\u0646\u0648\u0646\u064A\u0629</option>
                                    <option value="\u062A\u0634\u0631\u064A\u0639" ${e?.documentType==="\u062A\u0634\u0631\u064A\u0639"?"selected":""}>\u062A\u0634\u0631\u064A\u0639</option>
                                    <option value="\u0644\u0648\u0627\u0626\u062D" ${e?.documentType==="\u0644\u0648\u0627\u0626\u062D"?"selected":""}>\u0644\u0648\u0627\u0626\u062D</option>
                                    <option value="\u0623\u062E\u0631\u0649" ${e?.documentType==="\u0623\u062E\u0631\u0649"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F *</label>
                                <input type="text" id="legal-doc-number" required class="form-input"
                                    value="${Utils.escapeHTML(e?.documentNumber||"")}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0635\u0627\u062F\u0631 \u0639\u0646 *</label>
                                <input type="text" id="legal-doc-issued-by" required class="form-input"
                                    value="${Utils.escapeHTML(e?.issuedBy||"")}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0635\u0627\u062F\u0631\u0629">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F *</label>
                                <input type="text" id="legal-doc-followup-responsible" required class="form-input"
                                    value="${Utils.escapeHTML(e?.followUpResponsible||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629">
                                <p class="text-xs text-gray-500 mt-1">\u064A\u0633\u062A\u062E\u062F\u0645 \u0641\u064A \u062D\u0627\u0644\u0627\u062A \u0642\u0631\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0623\u0648 \u0627\u0646\u062A\u0647\u0627\u0621 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631 *</label>
                                <input type="date" id="legal-doc-issue-date" required class="form-input"
                                    value="${e?.issueDate?new Date(e.issueDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 *</label>
                                <input type="date" id="legal-doc-expiry-date" required class="form-input"
                                    value="${e?.expiryDate?new Date(e.expiryDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0639\u062F\u062F \u0623\u064A\u0627\u0645 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0642\u0628\u0644 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 *</label>
                                <input type="number" id="legal-doc-alert-days" required class="form-input"
                                    value="${e?.alertDays||30}" min="1" placeholder="30">
                                <p class="text-xs text-gray-500 mt-1">\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u062A\u0646\u0628\u064A\u0647 \u0642\u0628\u0644 \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0628\u0647\u0630\u0627 \u0627\u0644\u0639\u062F\u062F \u0645\u0646 \u0627\u0644\u0623\u064A\u0627\u0645</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                <select id="legal-doc-status" required class="form-input">
                                    <option value="\u0646\u0634\u0637" ${e?.status==="\u0646\u0634\u0637"||!e?"selected":""}>\u0646\u0634\u0637</option>
                                    <option value="\u0645\u0646\u062A\u0647\u064A" ${e?.status==="\u0645\u0646\u062A\u0647\u064A"?"selected":""}>\u0645\u0646\u062A\u0647\u064A</option>
                                    <option value="\u0645\u0644\u063A\u064A" ${e?.status==="\u0645\u0644\u063A\u064A"?"selected":""}>\u0645\u0644\u063A\u064A</option>
                                </select>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 / \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                <textarea id="legal-doc-description" class="form-input" rows="4"
                                    placeholder="\u0648\u0635\u0641 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0623\u0648 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.description||"")}</textarea>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-link ml-2"></i>
                                    \u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0633\u062A\u0646\u062F (\u0625\u0646 \u0648\u062C\u062F)
                                </label>
                                <input type="url" id="legal-doc-link" class="form-input"
                                    value="${Utils.escapeHTML(e?.documentLink||"")}" placeholder="https://example.com/document">
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-image ml-2"></i>
                                    \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F (\u063A\u064A\u0631 \u0625\u0644\u0632\u0627\u0645\u064A)
                                </label>
                                <input type="file" id="legal-doc-image-input" accept="image/*" class="form-input">
                                <p class="text-xs text-gray-500 mt-1">\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 5MB. \u0627\u0644\u0635\u064A\u063A \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629: JPG, PNG, GIF</p>
                                <div id="legal-doc-image-preview" class="mt-2 ${e?.documentImage?"":"hidden"}">
                                    <img src="${e?.documentImage||""}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F" class="w-48 h-48 object-cover rounded border mt-2" id="legal-doc-image-img">
                                    <button type="button" onclick="document.getElementById('legal-doc-image-input').value=''; document.getElementById('legal-doc-image-preview').classList.add('hidden');" class="mt-1 text-xs text-red-600 hover:text-red-800">
                                        <i class="fas fa-trash ml-1"></i>\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(s),s.querySelector("#legal-document-form").addEventListener("submit",o=>{o.preventDefault(),this.handleSubmit(e?.id,s)}),s.addEventListener("click",o=>{o.target===s&&s.remove()}),setTimeout(()=>{const o=document.getElementById("legal-doc-image-input"),n=document.getElementById("legal-doc-image-preview"),i=document.getElementById("legal-doc-image-img");o&&n&&i&&o.addEventListener("change",async c=>{const l=c.target.files[0];if(l){if(l.size>5242880){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 5MB"),o.value="";return}const r=new FileReader;r.onload=p=>{i.src=p.target.result,n.classList.remove("hidden")},r.readAsDataURL(l)}})},100)},async convertImageToBase64(e){return new Promise((t,s)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=s,a.readAsDataURL(e)})},async handleSubmit(e,t){AppState.appData.legalDocuments||(AppState.appData.legalDocuments=[]);const s=m=>{const d=document.getElementById(m);return d?d.value.trim():""},a=m=>{const d=document.getElementById(m);return d?d.value:null},o=document.getElementById("legal-doc-issue-date"),n=document.getElementById("legal-doc-expiry-date");let i,c;if(o&&o.value)try{i=new Date(o.value).toISOString()}catch{i=new Date().toISOString()}else i=new Date().toISOString();if(n&&n.value)try{c=new Date(n.value).toISOString()}catch{c=new Date().toISOString()}else c=new Date().toISOString();const l=document.getElementById("legal-doc-alert-days"),r=l&&l.value?parseInt(l.value):30;let p=e&&AppState.appData.legalDocuments.find(m=>m.id===e)?.documentImage||"";const u=document.getElementById("legal-doc-image-input");if(u&&u.files.length>0){const m=u.files[0];if(m.size>5242880){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 5MB");return}try{p=await this.convertImageToBase64(m)}catch(d){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629: "+d.message);return}}const g={id:e||Utils.generateId("LEGAL"),isoCode:generateISOCode("LEGAL",AppState.appData.legalDocuments),documentName:s("legal-doc-name"),documentType:s("legal-doc-type"),documentNumber:s("legal-doc-number"),issuedBy:s("legal-doc-issued-by"),followUpResponsible:s("legal-doc-followup-responsible"),issueDate:i,expiryDate:c,alertDays:r,status:s("legal-doc-status"),description:s("legal-doc-description"),documentLink:s("legal-doc-link"),documentImage:p,createdAt:e?AppState.appData.legalDocuments?.find(m=>m.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};Loading.show();try{if(e){const m=AppState.appData.legalDocuments.findIndex(d=>d.id===e);m!==-1&&(AppState.appData.legalDocuments[m]=g,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.legalDocuments.push(g),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("LegalDocuments",AppState.appData.legalDocuments),Loading.hide(),t.remove(),this.load(),setTimeout(()=>this.updateStatisticsCards(),100)}catch(m){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+m.message)}},async editDocument(e){const t=AppState.appData.legalDocuments?.find(s=>s.id===e);t&&await this.showForm(t)},async viewDocument(e){const t=AppState.appData.legalDocuments?.find(l=>l.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0633\u062A\u0646\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=new Date(t.expiryDate),a=new Date,o=Math.ceil((s-a)/(1e3*60*60*24)),n=s<a,i=o<=t.alertDays&&o>0,c=document.createElement("div");c.className="modal-overlay",c.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">${Utils.escapeHTML(t.documentName||"")}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0643\u0648\u062F ISO:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(t.isoCode||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.documentType||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.documentNumber||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0635\u0627\u062F\u0631 \u0639\u0646:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.issuedBy||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.followUpResponsible||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</label>
                                <p class="text-gray-800">${t.issueDate?Utils.formatDate(t.issueDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</label>
                                <p class="text-gray-800">${t.expiryDate?Utils.formatDate(t.expiryDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629:</label>
                                <p class="text-gray-800 ${n?"text-red-600 font-bold":i?"text-yellow-600 font-bold":"text-green-600"}">
                                    ${n?"\u0645\u0646\u062A\u0647\u064A":`${o} \u064A\u0648\u0645`}
                                </p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <span class="badge badge-${n?"danger":i?"warning":"success"}">
                                    ${t.status||"-"}
                                </span>
                            </div>
                        </div>
                        ${t.description?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0648\u0635\u0641:</label>
                                <p class="text-gray-800 whitespace-pre-wrap">${Utils.escapeHTML(t.description)}</p>
                            </div>
                        `:""}
                        ${t.documentLink?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0633\u062A\u0646\u062F:</label>
                                <a href="${Utils.escapeHTML(t.documentLink)}" target="_blank" class="text-blue-600 hover:underline">
                                    ${Utils.escapeHTML(t.documentLink)}
                                    <i class="fas fa-external-link-alt mr-2"></i>
                                </a>
                            </div>
                        `:""}
                        ${t.documentImage?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600 mb-2">\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F:</label>
                                <div class="mt-2">
                                    ${(()=>{const l=this.processPhoto(t.documentImage),r=l&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(l):{canonical:l||"",displaySrc:l||"",needsProxy:!1,proxyFileId:""},p=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(r):"";return`<img src="${Utils.escapeHTML(r.displaySrc)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F"${p} class="legal-doc-view-img max-w-full h-auto rounded border shadow-sm" style="max-height: 400px;"
                                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">`})()}
                                </div>
                            </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-success" onclick="LegalDocuments.exportPDF('${t.id}');">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button class="btn-primary" onclick="LegalDocuments.editDocument('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(c),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(c,{onFetchFail:l=>{try{l.onerror=null,l.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),c.addEventListener("click",l=>{l.target===c&&c.remove()})},async deleteDocument(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u061F")){Loading.show();try{AppState.appData.legalDocuments=AppState.appData.legalDocuments.filter(t=>t.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0628\u0646\u062C\u0627\u062D"),this.load(),setTimeout(()=>this.updateStatisticsCards(),100)}catch(t){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}}},async exportPDF(e){const t=AppState.appData.legalDocuments?.find(s=>s.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0633\u062A\u0646\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show();const s=t.isoCode||t.documentNumber||t.id?.substring(0,12)||"LEGAL-UNKNOWN",a="\u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A",o=new Date(t.expiryDate),n=new Date,i=Math.ceil((o-n)/(1e3*60*60*24)),c=o<n,l=i<=t.alertDays&&i>0,r=`
                <table>
                    <tr><th>\u0643\u0648\u062F ISO</th><td>${Utils.escapeHTML(t.isoCode||"N/A")}</td></tr>
                    <tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th><td>${Utils.escapeHTML(t.documentName||"N/A")}</td></tr>
                    <tr><th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th><td>${Utils.escapeHTML(t.documentType||"N/A")}</td></tr>
                    <tr><th>\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th><td>${Utils.escapeHTML(t.documentNumber||"N/A")}</td></tr>
                    <tr><th>\u0627\u0644\u0635\u0627\u062F\u0631 \u0639\u0646</th><td>${Utils.escapeHTML(t.issuedBy||"N/A")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</th><td>${Utils.escapeHTML(t.followUpResponsible||"N/A")}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th><td>${t.issueDate?Utils.formatDate(t.issueDate):"N/A"}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th><td>${t.expiryDate?Utils.formatDate(t.expiryDate):"N/A"}</td></tr>
                    <tr><th>\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629</th><td class="${c?"text-red-600 font-bold":l?"text-yellow-600 font-bold":"text-green-600"}">${c?"\u0645\u0646\u062A\u0647\u064A":`${i} \u064A\u0648\u0645`}</td></tr>
                    <tr><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><td>${Utils.escapeHTML(t.status||"N/A")}</td></tr>
                </table>
                ${t.description?`
                    <div class="section-title">\u0627\u0644\u0648\u0635\u0641:</div>
                    <div class="description">${Utils.escapeHTML(t.description)}</div>
                `:""}
                ${t.documentLink?`
                    <div class="section-title">\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0633\u062A\u0646\u062F:</div>
                    <div class="description"><a href="${Utils.escapeHTML(t.documentLink)}" target="_blank">${Utils.escapeHTML(t.documentLink)}</a></div>
                `:""}
                ${(()=>{const d=this.processPhoto(t.documentImage);return d?`
                    <div class="section-title">\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F:</div>
                    <div class="description">
                        <img src="${Utils.escapeHTML(d)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F" style="max-width: 100%; max-height: 400px; border: 1px solid #ddd; border-radius: 4px;"
                             onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                    </div>
                `:""})()}
            `,p=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,a,r,!0,!0):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</title></head><body>${r}</body></html>`,u=new Blob([p],{type:"text/html;charset=utf-8"}),g=URL.createObjectURL(u),m=window.open(g,"_blank");m?m.onload=()=>{setTimeout(()=>{m.print(),setTimeout(()=>{URL.revokeObjectURL(g),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},1e3)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",s),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+s.message)}},async exportToExcel(){try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629");return}const t=(AppState.appData.legalDocuments||[]).map(i=>{const c=new Date(i.expiryDate),l=new Date,r=Math.ceil((c-l)/(1e3*60*60*24)),p=c<l;return{"\u0643\u0648\u062F ISO":i.isoCode||"","\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F":i.documentName||"","\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F":i.documentType||"","\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F":i.documentNumber||"","\u0627\u0644\u0635\u0627\u062F\u0631 \u0639\u0646":i.issuedBy||"","\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629":i.followUpResponsible||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631":i.issueDate?Utils.formatDate(i.issueDate):"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":i.expiryDate?Utils.formatDate(i.expiryDate):"","\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629":p?"\u0645\u0646\u062A\u0647\u064A":`${r} \u064A\u0648\u0645`,\u0627\u0644\u062D\u0627\u0644\u0629:i.status||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":i.createdAt?Utils.formatDate(i.createdAt):""}}),s=XLSX.utils.book_new(),a=XLSX.utils.json_to_sheet(t);a["!cols"]=[{wch:15},{wch:30},{wch:20},{wch:20},{wch:25},{wch:15},{wch:15},{wch:20},{wch:15},{wch:15}],XLSX.utils.book_append_sheet(s,a,"\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629");const n=`\u0633\u062C\u0644_\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A_\u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(s,n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+e.message)}},checkExpiringDocuments(){const e=AppState.appData.legalDocuments||[],t=new Date,s=[];e.forEach(a=>{if(a.status==="\u0646\u0634\u0637"&&a.expiryDate){const o=new Date(a.expiryDate),n=Math.ceil((o-t)/(1e3*60*60*24));n<=a.alertDays&&n>0?s.push({type:"warning",message:`\u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A "${a.documentName}" \u0633\u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ${n} \u064A\u0648\u0645`}):n<=0&&s.push({type:"critical",message:`\u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A "${a.documentName}" \u0645\u0646\u062A\u0647\u064A \u0635\u0644\u0627\u062D\u064A\u062A\u0647!`})}}),s.length>0&&AppState.notificationEmails&&AppState.notificationEmails.length>0&&this.sendEmailNotifications(s),s.forEach(a=>{a.type==="critical"?Notification.error(a.message):Notification.warning(a.message)})},async sendEmailNotifications(e){Utils.safeLog("\u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A:",AppState.notificationEmails),Utils.safeLog("\u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A:",e),AppState.notificationEmails&&AppState.notificationEmails.length>0&&Notification.success(`\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0625\u0644\u0649 ${AppState.notificationEmails.length} \u0625\u064A\u0645\u064A\u0644`)},async checkLegalUpdates(){Loading.show();try{const e=document.getElementById("legal-portal-url")?.value||AppState.legalPortalUrl,t=(document.getElementById("legal-keywords")?.value||"").split(",").map(s=>s.trim()).filter(s=>s);if(!e){Loading.hide(),Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0627\u0628\u0637 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0623\u0648\u0644\u0627\u064B");return}await new Promise(s=>setTimeout(s,1500)),Loading.hide(),Notification.success(`\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629. ${t.length>0?`\u062A\u0645 \u0627\u0644\u0628\u062D\u062B \u0639\u0646: ${t.join(", ")}`:"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0643\u0644\u0645\u0627\u062A \u0645\u062A\u0627\u062D\u064A\u0629"}`)}catch(e){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A: "+e.message)}},saveLegalSettings(){const e=document.getElementById("legal-portal-url")?.value.trim(),t=document.getElementById("legal-keywords")?.value||"",s=document.getElementById("legal-auto-notify")?.checked||!1;AppState.legalPortalUrl=e,AppState.legalKeywords=t.split(",").map(a=>a.trim()).filter(a=>a),AppState.legalAutoNotify=s,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0628\u0646\u062C\u0627\u062D")},LEGAL_LAW_TYPES:[{value:"law",label:"\u0642\u0627\u0646\u0648\u0646"},{value:"regulation",label:"\u0644\u0627\u0626\u062D\u0629 / \u0642\u0631\u0627\u0631 \u0648\u0632\u0627\u0631\u064A"},{value:"decree",label:"\u0645\u0631\u0633\u0648\u0645"},{value:"standard",label:"\u0645\u0648\u0627\u0635\u0641\u0629 \u0642\u064A\u0627\u0633\u064A\u0629"},{value:"code",label:"\u0643\u0648\u062F / \u062F\u0644\u064A\u0644"},{value:"other",label:"\u0623\u062E\u0631\u0649"}],LEGAL_REGISTER_STATUSES:[{value:"applicable",label:"\u0646\u0627\u0641\u0630",color:"green"},{value:"amended",label:"\u0645\u0639\u062F\u0644",color:"amber"},{value:"repealed",label:"\u0645\u0644\u063A\u064A",color:"red"},{value:"pending",label:"\u0642\u064A\u062F \u0627\u0644\u0625\u0635\u062F\u0627\u0631",color:"blue"}],LEGAL_PRIORITIES:[{value:"high",label:"\u0639\u0627\u0644\u064A\u0629",color:"red"},{value:"medium",label:"\u0645\u062A\u0648\u0633\u0637\u0629",color:"amber"},{value:"low",label:"\u0645\u0646\u062E\u0641\u0636\u0629",color:"green"}],LEGAL_REGISTER_CATEGORIES:[{value:"labor",label:"\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0639\u0645\u0644"},{value:"safety",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"},{value:"environment",label:"\u0627\u0644\u0628\u064A\u0626\u0629"},{value:"civil_defense",label:"\u0627\u0644\u062F\u0641\u0627\u0639 \u0627\u0644\u0645\u062F\u0646\u064A \u0648\u0627\u0644\u062D\u0631\u064A\u0642"},{value:"social_insurance",label:"\u0627\u0644\u062A\u0623\u0645\u064A\u0646\u0627\u062A \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629"},{value:"tax",label:"\u0627\u0644\u0636\u0631\u0627\u0626\u0628"},{value:"municipal",label:"\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0628\u0644\u062F\u064A\u0629"},{value:"industry",label:"\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0635\u0646\u0627\u0639\u064A\u0629"},{value:"quality",label:"\u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A"},{value:"other",label:"\u0623\u062E\u0631\u0649"}],getLegalRegisterStats(){const e=AppState.appData.legalRegister||[];let t=0,s=0,a=0,o=0,n=0,i=0,c=0,l=0;e.forEach(u=>{const g=u.status||"";g==="applicable"?t++:g==="amended"?s++:g==="repealed"?a++:g==="pending"&&o++;const m=u.priority||"";m==="high"?n++:m==="medium"?i++:m==="low"&&c++;let d=u.amendments;if(typeof d=="string")try{d=JSON.parse(d)}catch{d=[]}Array.isArray(d)&&d.length>0&&l++});const r=e.length,p=r>0?Math.round((t+s)/r*100):0;return{total:r,applicable:t,amended:s,repealed:a,pending:o,high:n,medium:i,low:c,withAmendments:l,complianceRate:p}},loadLegalRegisterList(){const e=document.getElementById("lr-container");if(!e)return;const t=this.getLegalRegisterStats(),s=["lr-total-count","lr-applicable-count","lr-amended-count","lr-repealed-count","lr-compliance-rate"],a=[t.total,t.applicable,t.amended,t.repealed,t.complianceRate+"%"];s.forEach((d,f)=>{const v=document.getElementById(d);v&&(v.textContent=a[f])});let o=AppState.appData.legalRegister||[];const n=document.getElementById("lr-category-filter"),i=document.getElementById("lr-status-filter"),c=document.getElementById("lr-priority-filter"),l=document.getElementById("lr-search");if(n&&n.value&&(o=o.filter(d=>d.category===n.value)),i&&i.value&&(o=o.filter(d=>d.status===i.value)),c&&c.value&&(o=o.filter(d=>d.priority===c.value)),l&&l.value.trim()){const d=l.value.trim().toLowerCase();o=o.filter(f=>(f.title||"").toLowerCase().includes(d)||(f.legalReference||"").toLowerCase().includes(d)||(f.issuingAuthority||"").toLowerCase().includes(d)||(f.lawNumber||"").toLowerCase().includes(d))}if(o.length===0){e.innerHTML='<div class="text-center py-8 text-gray-500"><i class="fas fa-balance-scale text-4xl mb-3 text-gray-300"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p></div>',this._bindLegalRegisterEvents();return}const r=d=>({applicable:'<span class="lr-badge lr-badge-green">\u0646\u0627\u0641\u0630</span>',amended:'<span class="lr-badge lr-badge-amber">\u0645\u0639\u062F\u0644</span>',repealed:'<span class="lr-badge lr-badge-red">\u0645\u0644\u063A\u064A</span>',pending:'<span class="lr-badge lr-badge-blue">\u0642\u064A\u062F \u0627\u0644\u0625\u0635\u062F\u0627\u0631</span>'})[d]||'<span class="lr-badge lr-badge-gray">\u2014</span>',p=d=>({high:'<span class="lr-priority lr-priority-high">\u0639\u0627\u0644\u064A\u0629</span>',medium:'<span class="lr-priority lr-priority-medium">\u0645\u062A\u0648\u0633\u0637\u0629</span>',low:'<span class="lr-priority lr-priority-low">\u0645\u0646\u062E\u0641\u0636\u0629</span>'})[d]||'<span class="lr-priority">\u2014</span>',u=d=>{const f=this.LEGAL_LAW_TYPES.find(v=>v.value===d);return f?f.label:d||"\u2014"},g=d=>{let f=d.amendments;if(typeof f=="string")try{f=JSON.parse(f)}catch{f=[]}return Array.isArray(f)?f.length:0},m=o.map(d=>{const f=g(d);return`
            <tr>
                <td class="text-sm font-mono text-gray-500">${d.id||"\u2014"}</td>
                <td class="text-sm font-medium">${d.title||"\u2014"}</td>
                <td class="text-sm text-gray-600">${d.issuingAuthority||"\u2014"}</td>
                <td class="text-sm text-gray-600">${u(d.lawType)} ${d.lawNumber?"\u0631\u0642\u0645 "+d.lawNumber:""} ${d.lawYear?"("+d.lawYear+")":""}</td>
                <td class="text-sm text-gray-600">${d.legalReference||"\u2014"}</td>
                <td>${r(d.status)}</td>
                <td>${p(d.priority)}</td>
                <td class="text-sm text-center">${d.issueDate||"\u2014"}</td>
                <td class="text-sm text-center">
                    <button class="lr-amd-btn" onclick="LegalDocuments.showLegalAmendments('${d.id}')" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629">
                        <i class="fas fa-history"></i>
                        ${f>0?`<span class="lr-amd-badge">${f}</span>`:""}
                    </button>
                </td>
                <td>
                    <div class="flex items-center gap-1">
                        <button class="btn-icon btn-sm" onclick="LegalDocuments.showLegalRegisterForm('${d.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-sm text-red-600" onclick="LegalDocuments.deleteLegalRegisterRecord('${d.id}')" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join("");e.innerHTML=`
            <div style="overflow-x: auto;">
                <table class="data-table lr-data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0645\u0639\u0631\u0641</th>
                            <th>\u0627\u0644\u062A\u0634\u0631\u064A\u0639 / \u0627\u0644\u0642\u0627\u0646\u0648\u0646</th>
                            <th>\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                            <th>\u0627\u0644\u0646\u0648\u0639 / \u0627\u0644\u0631\u0642\u0645</th>
                            <th>\u0627\u0644\u0645\u0631\u062C\u0639</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                            <th>\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A</th>
                            <th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>${m}</tbody>
                </table>
            </div>
        `,this._bindLegalRegisterEvents()},_bindLegalRegisterEvents(){const e=document.getElementById("lr-category-filter"),t=document.getElementById("lr-status-filter"),s=document.getElementById("lr-priority-filter"),a=document.getElementById("lr-search"),o=document.getElementById("lr-reset-filter-btn"),n=document.getElementById("lr-add-btn"),i=()=>this.loadLegalRegisterList();e&&(e.onchange=i),t&&(t.onchange=i),s&&(s.onchange=i),a&&(a.oninput=Utils.debounce?Utils.debounce(i,300):i),o&&(o.onclick=()=>{e&&(e.value=""),t&&(t.value=""),s&&(s.value=""),a&&(a.value=""),i()}),n&&(n.onclick=()=>this.showLegalRegisterForm())},showLegalRegisterForm(e){this.ensureData();let t=null;e&&(t=(AppState.appData.legalRegister||[]).find(p=>p.id===e));const s=!!t,a=(p,u)=>t&&t[p]!=null?t[p]:u||"",o='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>'+this.LEGAL_LAW_TYPES.map(p=>`<option value="${p.value}" ${a("lawType")===p.value?"selected":""}>${p.label}</option>`).join(""),n=this.LEGAL_REGISTER_STATUSES.map(p=>`<option value="${p.value}" ${a("status","applicable")===p.value?"selected":""}>${p.label}</option>`).join(""),i=this.LEGAL_PRIORITIES.map(p=>`<option value="${p.value}" ${a("priority","medium")===p.value?"selected":""}>${p.label}</option>`).join(""),c='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</option>'+this.LEGAL_REGISTER_CATEGORIES.map(p=>`<option value="${p.value}" ${a("category")===p.value?"selected":""}>${p.label}</option>`).join(""),l=`
            <div class="modal-overlay active" id="lr-modal">
                <div class="modal-content" style="max-width: 860px; max-height: 92vh; overflow-y: auto;">
                    <div class="lr-modal-header">
                        <h3><i class="fas fa-balance-scale"></i>${s?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629"} \u0633\u062C\u0644 \u062A\u0634\u0631\u064A\u0639 \u0648\u0642\u0627\u0646\u0648\u0646</h3>
                        <button class="modal-close" onclick="document.getElementById('lr-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="lr-form" onsubmit="LegalDocuments.handleLegalRegisterSubmit(event)">
                        <input type="hidden" id="lr-edit-id" value="${e||""}">
                        <div class="modal-body">
                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-info-circle"></i>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group col-span-2">
                                        <label class="form-label">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0634\u0631\u064A\u0639 / \u0627\u0644\u0642\u0627\u0646\u0648\u0646 <span class="text-red-500">*</span></label>
                                        <input type="text" id="lr-title" class="form-input" value="${a("title")}" required placeholder="\u0645\u062B\u0627\u0644: \u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644 \u0631\u0642\u0645 12 \u0644\u0633\u0646\u0629 2003">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 <span class="text-red-500">*</span></label>
                                        <input type="text" id="lr-issuingAuthority" class="form-input" value="${a("issuingAuthority")}" required placeholder="\u0645\u062B\u0627\u0644: \u0648\u0632\u0627\u0631\u0629 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0634\u0631\u064A\u0639 <span class="text-red-500">*</span></label>
                                        <select id="lr-lawType" class="form-input" required>${o}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 / \u0627\u0644\u0642\u0631\u0627\u0631</label>
                                        <input type="text" id="lr-lawNumber" class="form-input" value="${a("lawNumber")}" placeholder="\u0645\u062B\u0627\u0644: 12">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0633\u0646\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                                        <input type="text" id="lr-lawYear" class="form-input" value="${a("lawYear")}" placeholder="\u0645\u062B\u0627\u0644: 2003">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062A\u0635\u0646\u064A\u0641 <span class="text-red-500">*</span></label>
                                        <select id="lr-category" class="form-input" required>${c}</select>
                                    </div>
                                </div>
                            </div>

                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-calendar-alt"></i>\u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E</div>
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                                        <input type="date" id="lr-issueDate" class="form-input" value="${a("issueDate")}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0641\u0627\u0630</label>
                                        <input type="date" id="lr-effectiveDate" class="form-input" value="${a("effectiveDate")}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0642\u0627\u062F\u0645</label>
                                        <input type="date" id="lr-nextReviewDate" class="form-input" value="${a("nextReviewDate")}">
                                    </div>
                                </div>
                            </div>

                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-file-alt"></i>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A</label>
                                        <input type="text" id="lr-legalReference" class="form-input" value="${a("legalReference")}" placeholder="\u0645\u062B\u0627\u0644: \u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u0648\u0627\u062F / \u0627\u0644\u0628\u0646\u0648\u062F</label>
                                        <input type="text" id="lr-legalArticles" class="form-input" value="${a("legalArticles")}" placeholder="\u0645\u062B\u0627\u0644: 208\u060C 209\u060C 210">
                                    </div>
                                    <div class="form-group col-span-2">
                                        <label class="form-label">\u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0637\u0628\u064A\u0642</label>
                                        <input type="text" id="lr-scopeOfApplication" class="form-input" value="${a("scopeOfApplication")}" placeholder="\u0645\u062B\u0627\u0644: \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0646\u0634\u0622\u062A \u0627\u0644\u062E\u0627\u0636\u0639\u0629 \u0644\u0644\u0642\u0627\u0646\u0648\u0646">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</label>
                                        <input type="text" id="lr-responsibleDepartment" class="form-input" value="${a("responsibleDepartment")}" placeholder="\u0645\u062B\u0627\u0644: \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                                        <select id="lr-priority" class="form-input">${i}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                        <select id="lr-status" class="form-input">${n}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0642\u0627\u062F\u0645</label>
                                        <input type="date" id="lr-nextReviewDate2" class="form-input" value="${a("nextReviewDate")}">
                                    </div>
                                </div>
                            </div>

                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-align-left"></i>\u0645\u0644\u062E\u0635 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A</div>
                                <div class="form-group">
                                    <textarea id="lr-summary" class="form-input" rows="3" placeholder="\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0634\u0631\u064A\u0639 \u0648\u0645\u062A\u0637\u0644\u0628\u0627\u062A\u0647">${a("summary")}</textarea>
                                </div>
                                <div class="form-group" style="margin-top: 12px;">
                                    <textarea id="lr-notes" class="form-input" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${a("notes")}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" onclick="document.getElementById('lr-modal').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${s?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0634\u0631\u064A\u0639"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,r=document.getElementById("lr-modal");r&&r.remove(),document.body.insertAdjacentHTML("beforeend",l)},async handleLegalRegisterSubmit(e){e.preventDefault();const t=document.getElementById("lr-edit-id")?.value,s=!!t,a=i=>{const c=document.getElementById(i);return c?c.value.trim():""},o={title:a("lr-title"),issuingAuthority:a("lr-issuingAuthority"),lawType:a("lr-lawType"),lawNumber:a("lr-lawNumber"),lawYear:a("lr-lawYear"),category:a("lr-category"),issueDate:a("lr-issueDate"),effectiveDate:a("lr-effectiveDate"),nextReviewDate:a("lr-nextReviewDate")||a("lr-nextReviewDate2"),legalReference:a("lr-legalReference"),legalArticles:a("lr-legalArticles"),scopeOfApplication:a("lr-scopeOfApplication"),responsibleDepartment:a("lr-responsibleDepartment"),priority:a("lr-priority"),status:a("lr-status"),summary:a("lr-summary"),notes:a("lr-notes")};if(!o.title||!o.issuingAuthority||!o.lawType||!o.category){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629: \u0627\u0644\u0639\u0646\u0648\u0627\u0646\u060C \u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u060C \u0627\u0644\u0646\u0648\u0639\u060C \u0627\u0644\u062A\u0635\u0646\u064A\u0641");return}const n=document.getElementById("lr-modal");try{if(s){o.id=t,o.updatedAt=new Date().toISOString();const i=AppState.appData.legalRegister||[],c=i.findIndex(l=>l.id===t);if(c!==-1){const l=i[c].amendments||[];o.amendments=l,Object.assign(i[c],o),this._legalRegisterLocalSaveTime=Date.now()}n&&n.remove(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateLegalRegister",data:{registerId:t,updateData:o}}).catch(()=>{})}else{o.createdAt=new Date().toISOString(),o.updatedAt=o.createdAt,o.amendments=[],AppState.appData.legalRegister||(AppState.appData.legalRegister=[]);const i="LR-LOCAL-"+Date.now();if(o.id=i,AppState.appData.legalRegister.unshift(o),this._legalRegisterLocalSaveTime=Date.now(),n&&n.remove(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A..."),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const c=Object.assign({},o);delete c.id,GoogleIntegration.sendRequest({action:"addLegalRegister",data:c}).then(l=>{if(l&&l.success&&l.data&&l.data.id){const r=AppState.appData.legalRegister||[],p=r.findIndex(u=>u.id===i);p!==-1&&(r[p].id=l.data.id),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D \u2705")}}).catch(l=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",l))}}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",i),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")}},async deleteLegalRegisterRecord(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u061F"))try{const t=AppState.appData.legalRegister||[];AppState.appData.legalRegister=t.filter(s=>s.id!==e),this._legalRegisterLocalSaveTime=Date.now(),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"deleteLegalRegister",data:{registerId:e}}).catch(s=>Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",s))}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",t)}},showLegalAmendments(e){this.ensureData();const t=(AppState.appData.legalRegister||[]).find(n=>n.id===e);if(!t){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let s=t.amendments;if(typeof s=="string")try{s=JSON.parse(s)}catch{s=[]}Array.isArray(s)||(s=[]);const a=`
            <div class="modal-overlay active" id="lr-amendments-modal">
                <div class="modal-content" style="max-width: 780px; max-height: 90vh; overflow-y: auto;">
                    <div class="lr-modal-header lr-modal-header-alt">
                        <h3><i class="fas fa-history"></i>\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</h3>
                        <button class="modal-close" onclick="document.getElementById('lr-amendments-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="lr-amd-record-info">
                            <div><i class="fas fa-file-alt"></i> ${t.title||"\u2014"}</div>
                            <div><i class="fas fa-hashtag"></i> ${t.id||""}</div>
                        </div>

                        ${s.length===0?`
                            <div class="lr-amd-empty">
                                <i class="fas fa-history text-4xl text-gray-300 mb-3"></i>
                                <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0634\u0631\u064A\u0639</p>
                            </div>
                        `:`
                            <div class="lr-amd-timeline">
                                ${s.map((n,i)=>`
                                    <div class="lr-amd-item lr-amd-${i%2===0?"right":"left"}">
                                        <div class="lr-amd-dot"></div>
                                        <div class="lr-amd-content">
                                            <div class="lr-amd-header">
                                                <span class="lr-amd-num">\u062A\u062D\u062F\u064A\u062B ${n.amendmentNumber||i+1}</span>
                                                <span class="lr-amd-date">${n.date||""}</span>
                                            </div>
                                            <h4 class="lr-amd-title">${n.title||"\u062A\u062D\u062F\u064A\u062B"}</h4>
                                            <p class="lr-amd-desc">${n.description||""}</p>
                                            ${n.affectedArticles?`<div class="lr-amd-articles"><i class="fas fa-gavel"></i> \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629: ${n.affectedArticles}</div>`:""}
                                            ${n.newRequirements?`<div class="lr-amd-req"><i class="fas fa-clipboard-list"></i> \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629: ${n.newRequirements}</div>`:""}
                                            ${n.referenceLaw?`<div class="lr-amd-ref"><i class="fas fa-book"></i> \u0627\u0644\u0645\u0631\u062C\u0639: ${n.referenceLaw}</div>`:""}
                                        </div>
                                    </div>`).join("")}
                            </div>
                        `}

                        <button id="lr-add-amendment-btn" class="btn-primary btn-sm" style="width: 100%; justify-content: center; margin-top: 16px;">
                            <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0646\u0648\u0646\u064A
                        </button>
                    </div>
                </div>
            </div>
        `,o=document.getElementById("lr-amendments-modal");o&&o.remove(),document.body.insertAdjacentHTML("beforeend",a),document.getElementById("lr-add-amendment-btn").onclick=()=>{document.getElementById("lr-amendments-modal").remove(),this.showLegalAmendmentForm(e)}},showLegalAmendmentForm(e){this.ensureData();const t=`
            <div class="modal-overlay active" id="lr-amd-form-modal">
                <div class="modal-content" style="max-width: 640px;">
                    <div class="lr-modal-header lr-modal-header-alt">
                        <h3><i class="fas fa-plus-circle"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0646\u0648\u0646\u064A</h3>
                        <button class="modal-close" onclick="document.getElementById('lr-amd-form-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="lr-amd-form" onsubmit="LegalDocuments.handleAmendmentSubmit(event, '${e}')">
                        <input type="hidden" id="lr-amd-registerId" value="${e}">
                        <div class="modal-body">
                            <div class="lr-form-section">
                                <div class="form-group">
                                    <label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B <span class="text-red-500">*</span></label>
                                    <input type="text" id="lr-amd-number" class="form-input" required placeholder="\u0645\u062B\u0627\u0644: 1">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u062F\u064A\u062B</label>
                                    <input type="date" id="lr-amd-date" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B <span class="text-red-500">*</span></label>
                                    <input type="text" id="lr-amd-title" class="form-input" required placeholder="\u0645\u062B\u0627\u0644: \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0627\u062F\u0629 208 \u0645\u0646 \u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0648\u0635\u0641 \u0627\u0644\u062A\u062D\u062F\u064A\u062B</label>
                                    <textarea id="lr-amd-description" class="form-input" rows="3" placeholder="\u0634\u0631\u062D \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0648\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A"></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629</label>
                                    <input type="text" id="lr-amd-articles" class="form-input" placeholder="\u0645\u062B\u0627\u0644: 208\u060C 209\u060C 210">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629</label>
                                    <textarea id="lr-amd-requirements" class="form-input" rows="2" placeholder="\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0627\u0644\u0646\u0627\u062A\u062C\u0629 \u0639\u0646 \u0627\u0644\u062A\u0639\u062F\u064A\u0644"></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0644\u0644\u062A\u0639\u062F\u064A\u0644</label>
                                    <input type="text" id="lr-amd-reference" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u0642\u0627\u0646\u0648\u0646 \u0631\u0642\u0645 180 \u0644\u0633\u0646\u0629 2023">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" onclick="document.getElementById('lr-amd-form-modal').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,s=document.getElementById("lr-amd-form-modal");s&&s.remove(),document.body.insertAdjacentHTML("beforeend",t)},async handleAmendmentSubmit(e,t){e.preventDefault();const s=l=>{const r=document.getElementById(l);return r?r.value.trim():""},a={id:"AMD-"+Date.now(),amendmentNumber:s("lr-amd-number"),date:s("lr-amd-date"),title:s("lr-amd-title"),description:s("lr-amd-description"),affectedArticles:s("lr-amd-articles"),newRequirements:s("lr-amd-requirements"),referenceLaw:s("lr-amd-reference"),createdAt:new Date().toISOString()};if(!a.title||!a.amendmentNumber){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0648\u0627\u0644\u0639\u0646\u0648\u0627\u0646");return}const n=(AppState.appData.legalRegister||[]).find(l=>l.id===t);if(!n){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let i=n.amendments;if(typeof i=="string")try{i=JSON.parse(i)}catch{i=[]}Array.isArray(i)||(i=[]),i.push(a),n.amendments=i,n.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const c=document.getElementById("lr-amd-form-modal");c&&c.remove(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateLegalRegister",data:{registerId:t,updateData:{amendments:JSON.stringify(i),updatedAt:n.updatedAt}}}).catch(()=>{}),this.showLegalAmendments(t)},exportLegalTrainingExcel(){try{this.ensureData();const e=AppState.appData.legalTrainings||[];if(e.length===0){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const t=["\u0627\u0644\u0631\u0642\u0645","\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","\u0627\u0644\u062A\u0635\u0646\u064A\u0641","\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A","\u0627\u0644\u0645\u0627\u062F\u0629/\u0627\u0644\u0628\u0646\u062F","\u0627\u0644\u062F\u0648\u0631\u064A\u0629","\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629","\u0627\u0644\u0642\u0633\u0645","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0639\u0644\u064A","\u0627\u0644\u0645\u062F\u0631\u0628","\u0645\u0624\u0647\u0644\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0628","\u0627\u0644\u0645\u062F\u0629 (\u0633\u0627\u0639\u0629)","\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646","\u0627\u0644\u062D\u0627\u0644\u0629","\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0627\u0644\u062A\u0627\u0644\u064A","\u064A\u062A\u0637\u0644\u0628 \u0634\u0647\u0627\u062F\u0629","\u0639\u0642\u0648\u0628\u0629 \u0639\u062F\u0645 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],s=e.map(a=>[a.id||"",a.title||"",a.category||"",a.legalReference||"",a.legalArticle||"",a.frequency||"",a.targetGroup||"",a.department||"",a.factory||"",a.scheduledDate||"",a.actualDate||"",a.trainer||"",a.trainerQualification||"",a.duration||"",a.participantsCount||"",a.status||"",a.complianceStatus||"",a.expiryDate||"",a.nextDueDate||"",a.certificateRequired||"",a.penaltyForNonCompliance||"",a.notes||""]);if(typeof XLSX<"u"){const a=XLSX.utils.aoa_to_sheet([t,...s]),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,a,"\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629"),XLSX.writeFile(o,"\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A_\u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629_"+new Date().toISOString().slice(0,10)+".xlsx")}else Utils.safeWarn("\u0645\u0643\u062A\u0628\u0629 XLSX \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629")}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e)}},async exportLegalTrainingPdf(){try{this.ensureData();const e=AppState.appData.legalTrainings||[];if(e.length===0){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const t=document.getElementById("export-legal-training-pdf-btn");t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-1"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631...');const s=(u,g)=>new Promise((m,d)=>{if(g())return m();const f=document.createElement("script");f.src=u,f.onload=()=>m(),f.onerror=()=>d(),document.head.appendChild(f)});await s("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await s("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const a=this.getLegalTrainingStats(),o=document.getElementById("legal-training-container"),n=o?o.innerHTML:"",i=AppState&&AppState.companySettings&&AppState.companySettings.name?String(AppState.companySettings.name).trim():AppState&&AppState.companyName?String(AppState.companyName).trim():"",c=AppState&&(AppState.companyLogo||AppState.companySettings&&AppState.companySettings.logo)&&(AppState.companyLogo||AppState.companySettings.logo)||"",l=c?`<img src="${c}" alt="" style="max-height:50px; max-width:130px; object-fit:contain;">`:"",r=`
                <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, sans-serif; padding: 30px; background: #fff; direction: rtl;">
                    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1e40af; padding-bottom: 16px; margin-bottom: 20px;">
                        <div style="text-align: right;">
                            ${i?`<div style="font-size: 18px; font-weight: 700; color: #1e40af; margin-bottom: 4px; white-space: nowrap; word-break: keep-all;">${i}</div>`:""}
                            <h1 style="font-size: 20px; color: #1e293b; margin: 0 0 2px;">\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</h1>
                            <p style="font-size: 12px; color: #64748b; margin: 0;">\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0644\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0645\u0635\u0631\u064A\u0629 \u2014 Egyptian Law Compliance</p>
                        </div>
                        ${l?`<div style="flex-shrink: 0;">${l}</div>`:""}
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; gap: 12px; flex-wrap: wrap;">
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${new Date().toLocaleDateString("ar-EG")}</p>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${e.length}</p>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${a.complianceRate}%</p>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">\u0645\u0645\u062A\u062B\u0644 / \u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${a.compliant} / ${a.nonCompliant}</p>
                        </div>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <thead>
                            <tr style="background: #1e40af; color: #fff;">
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">#</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: right;">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: right;">\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: right;">\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u0627\u0644\u062F\u0648\u0631\u064A\u0629</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${e.map((u,g)=>`
                                <tr style="background: ${g%2===0?"#fff":"#f8fafc"};">
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center; color: #64748b;">${g+1}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: right; font-weight: 600;">${u.title||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: right; color: #475569;">${u.category||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: right; color: #475569;">${u.legalReference||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">${u.frequency||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">${u.scheduledDate||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">
                                        <span style="display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600;
                                            background: ${u.status==="\u0645\u0643\u062A\u0645\u0644"?"#dcfce7":u.status==="\u0645\u062E\u0637\u0637"?"#dbeafe":u.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"#fef3c7":"#f1f5f9"};
                                            color: ${u.status==="\u0645\u0643\u062A\u0645\u0644"?"#166534":u.status==="\u0645\u062E\u0637\u0637"?"#1e40af":u.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"#92400e":"#475569"};">
                                            ${u.status||"\u2014"}
                                        </span>
                                    </td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">
                                        <span style="display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600;
                                            background: ${u.complianceStatus==="\u0645\u0645\u062A\u062B\u0644"?"#dcfce7":u.complianceStatus==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?"#fecaca":u.complianceStatus==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"#fef3c7":"#dbeafe"};
                                            color: ${u.complianceStatus==="\u0645\u0645\u062A\u062B\u0644"?"#166534":u.complianceStatus==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?"#991b1b":u.complianceStatus==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"#92400e":"#1e40af"};">
                                            ${u.complianceStatus||"\u2014"}
                                        </span>
                                    </td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">${u.expiryDate||"\u2014"}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                    <div style="margin-top: 20px; text-align: center; color: #94a3b8; font-size: 11px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                        \u062A\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A ${new Date().toLocaleString("ar-EG")} \u2014 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 HSE
                    </div>
                </div>
            `,p=document.createElement("div");p.style.cssText="position: absolute; left: -9999px; top: 0; z-index: -1;",p.innerHTML=r,document.body.appendChild(p);try{const u=await html2canvas(p,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1}),{jsPDF:g}=window.jspdf,m=new g({orientation:"landscape",unit:"mm",format:"a4"}),d=m.internal.pageSize.getWidth(),f=m.internal.pageSize.getHeight(),v=8,D=d-v*2,L=D/u.width,y=(f-v*2)/L,S=Math.ceil(u.height/y);for(let b=0;b<S;b++){b>0&&m.addPage();const h=document.createElement("canvas"),x=Math.min(y,u.height-b*y);h.width=u.width,h.height=x,h.getContext("2d").drawImage(u,0,b*y,u.width,x,0,0,u.width,x),m.addImage(h.toDataURL("image/jpeg",.95),"JPEG",v,v,D,x*L),m.setDrawColor(37,99,235),m.setLineWidth(.3),m.line(v,f-v+1,d-v,f-v+1),m.setTextColor(148,163,184),m.setFontSize(7),m.text(new Date().toISOString().slice(0,10),v,f-3),m.text(`${b+1} / ${S}`,d-v,f-3,{align:"right"})}m.save(`Legal_Trainings_${new Date().toISOString().slice(0,10)}.pdf`),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PDF \u0628\u0646\u062C\u0627\u062D")}finally{document.body.removeChild(p)}}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 PDF")}finally{const e=document.getElementById("export-legal-training-pdf-btn");e&&(e.disabled=!1,e.innerHTML='<i class="fas fa-file-pdf ml-1" style="font-size: 14px;"></i>PDF')}}};(function(){"use strict";try{typeof window<"u"&&typeof LegalDocuments<"u"&&(window.LegalDocuments=LegalDocuments,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 LegalDocuments module loaded and available on window.LegalDocuments"))}catch{if(typeof window<"u"&&typeof LegalDocuments<"u")try{window.LegalDocuments=LegalDocuments}catch{}}})();
