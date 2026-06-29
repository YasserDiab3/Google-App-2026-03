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
            `;const t=typeof i18n<"u"&&i18n.translate?i18n.translate("legal.title"):"\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u062A\u0634\u0631\u064A\u0639\u064A\u0629",a=typeof i18n<"u"&&i18n.translate?i18n.translate("legal.subtitle"):"\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u062A\u0631\u0629 \u0635\u0644\u0627\u062D\u064A\u062A\u0647\u0627 \u0648\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A",s=typeof i18n<"u"&&i18n.translate?i18n.translate("legal.checkUpdates"):"\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629",r=typeof i18n<"u"&&i18n.translate?i18n.translate("legal.addDocument"):"\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A";e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-gavel ml-3"></i>
                            ${t}
                        </h1>
                        <p class="section-subtitle">${a}</p>
                    </div>
                    <div class="flex gap-2">
                        <button id="check-legal-updates-btn" class="btn-warning">
                            <i class="fas fa-sync-alt ml-2"></i>
                            ${s}
                        </button>
                        <button id="add-legal-document-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            ${r}
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
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <div style="width: 300px; margin: 0 auto 16px;">
                                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                        </div>
                                    </div>
                                    <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0635\u0631...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,this.setupEventListeners(),this.bindTabEvents(),setTimeout(async()=>{try{const c=document.querySelector('[data-tab-panel="documents"]'),i=document.querySelector('[data-tab-panel="inventory"]');if(c){const o=await this.renderList().catch(l=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A:",l),`
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
                            `));c.innerHTML=o,this.state.activeTab==="documents"&&(this.loadLegalDocumentsList(),this.checkExpiringDocuments())}if(i){const o=await this.renderInventoryTab().catch(l=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0635\u0631:",l),`
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
                            `));i.innerHTML=o,this.state.activeTab==="inventory"&&this.loadInventoryList()}}catch(c){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:",c)}},0)}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629:",t),e&&(e.innerHTML=`
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
                `)}}},getStatistics(){try{const e=AppState.appData.legalDocuments||[],t=new Date;t.setHours(0,0,0,0);let a=e.length,s=0,r=0,c=0;return e.forEach(i=>{if(!i)return;let o=!1,l=null,n=0,p=!1;if(i.expiryDate)try{l=new Date(i.expiryDate),isNaN(l.getTime())||(o=!0,l.setHours(0,0,0,0),n=Math.ceil((l-t)/864e5),p=l<t)}catch{}if(o&&p&&s++,i.status==="\u0646\u0634\u0637"&&(!o||!p)&&(r++,o&&!p)){const g=parseInt(i.alertDays)||30;n<=g&&n>0&&c++}}),{total:a,expired:s,active:r,expiringSoon:c}}catch{return{total:0,expired:0,active:0,expiringSoon:0}}},renderStatisticsCards(){let e;try{e=this.getStatistics(),e={total:e.total||0,expired:e.expired||0,active:e.active||0,expiringSoon:e.expiringSoon||0}}catch{e={total:0,expired:0,active:0,expiringSoon:0}}return`
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
        `},updateStatisticsCards(){const e=document.getElementById("legal-documents-stats-container");e&&(e.innerHTML=this.renderStatisticsCards())},normalizeSearchText(e){return e==null?"":String(e).toLowerCase().replace(/[\u064B-\u065F\u0670]/g,"").replace(/ـ/g,"").replace(/[أإآ]/g,"\u0627").replace(/ى/g,"\u064A").replace(/ة/g,"\u0647").replace(/[٠-٩]/g,t=>String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(t))).replace(/\s+/g," ").trim()},getFilteredLegalDocuments(){const e=AppState.appData.legalDocuments||[],t=this.state.filters?.documents||{},a=this.normalizeSearchText(t.search||""),s=String(t.type||"").trim(),r=String(t.status||"").trim(),c=String(t.issuedBy||"").trim(),i=t.dateFrom?new Date(t.dateFrom):null,o=t.dateTo?new Date(t.dateTo):null;return i&&!isNaN(i.getTime())&&i.setHours(0,0,0,0),o&&!isNaN(o.getTime())&&o.setHours(23,59,59,999),e.filter(l=>{const n=String(l.documentType||""),p=l.expiryDate?new Date(l.expiryDate):null,g=new Date,u=parseInt(l.alertDays,10)||30,d=p&&!isNaN(p.getTime())?Math.ceil((p-g)/(1e3*60*60*24)):null,m=d!==null?d<=0:!1,y=d!==null?d>0&&d<=u:!1,b=String((m?"\u0645\u0646\u062A\u0647\u064A":y?"\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"\u0646\u0634\u0637")||l.status||""),h=String(l.issuedBy||""),f=l.issueDate?new Date(l.issueDate):null,x=this.normalizeSearchText([l.documentName||"",l.documentNumber||"",l.isoCode||"",l.documentType||"",l.issuedBy||"",l.description||""].join(" ")),w=!a||x.includes(a),D=!s||n===s,L=!r||b===r,S=!c||h===c;let v=!0;return f&&!isNaN(f.getTime())?(i&&f<i&&(v=!1),o&&f>o&&(v=!1)):(i||o)&&(v=!1),w&&D&&L&&S&&v})},resetLegalDocumentFilters(){this.state.filters||(this.state.filters={}),this.state.filters.documents={search:"",type:"",status:"",issuedBy:"",dateFrom:"",dateTo:""}},bindLegalDocumentsFilterEvents(e){if(!e)return;const t=e.querySelector("#legal-docs-search"),a=e.querySelector("#legal-docs-filter-type"),s=e.querySelector("#legal-docs-filter-status"),r=e.querySelector("#legal-docs-filter-issued-by"),c=e.querySelector("#legal-docs-date-from"),i=e.querySelector("#legal-docs-date-to"),o=e.querySelector("#legal-docs-reset-filters");if(t){let l=!1;const n=(p,g=null)=>{this.state.filters.documents.search=p||"",this._legalDocsSearchDebounceTimer&&clearTimeout(this._legalDocsSearchDebounceTimer),this._legalDocsSearchDebounceTimer=setTimeout(()=>{this.loadLegalDocumentsList(),requestAnimationFrame(()=>{const u=document.getElementById("legal-docs-search");if(!u)return;u.focus();const d=typeof g=="number"?g:u.value.length;try{u.setSelectionRange(d,d)}catch{}})},120)};t.addEventListener("compositionstart",()=>{l=!0}),t.addEventListener("compositionend",p=>{l=!1,n(p.target.value,p.target.selectionStart)}),t.addEventListener("input",p=>{l||n(p.target.value,p.target.selectionStart)})}a&&a.addEventListener("change",l=>{this.state.filters.documents.type=l.target.value||"",this.loadLegalDocumentsList()}),s&&s.addEventListener("change",l=>{this.state.filters.documents.status=l.target.value||"",this.loadLegalDocumentsList()}),r&&r.addEventListener("change",l=>{this.state.filters.documents.issuedBy=l.target.value||"",this.loadLegalDocumentsList()}),c&&c.addEventListener("change",l=>{this.state.filters.documents.dateFrom=l.target.value||"",this.loadLegalDocumentsList()}),i&&i.addEventListener("change",l=>{this.state.filters.documents.dateTo=l.target.value||"",this.loadLegalDocumentsList()}),o&&o.addEventListener("click",()=>{this.resetLegalDocumentFilters(),this.loadLegalDocumentsList()})},async loadLegalDocumentsList(){const e=document.getElementById("legal-documents-table-container");if(!e)return;this.updateStatisticsCards();const t=AppState.appData.legalDocuments||[],a=this.getFilteredLegalDocuments(),s=this.state.filters?.documents||{},r=[...new Set(t.map(n=>String(n.documentType||"").trim()).filter(Boolean))].sort(),c=["\u0646\u0634\u0637","\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0645\u0646\u062A\u0647\u064A"],i=[...new Set(t.map(n=>String(n.issuedBy||"").trim()).filter(Boolean))].sort(),o=!!(s.search||s.type||s.status||s.issuedBy||s.dateFrom||s.dateTo);if(t.length===0){e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-gavel text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629</p>
                    <button id="add-legal-document-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A
                    </button>
                </div>
            `,setTimeout(()=>{const n=document.getElementById("add-legal-document-empty-btn");n&&n.addEventListener("click",()=>this.showForm())},50);return}e.innerHTML=`
            <div class="visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 14px -20px; width: calc(100% + 40px);">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <div class="filter-field" style="min-width: 180px;">
                        <label class="filter-label" for="legal-docs-search">
                            <i class="fas fa-search ml-1"></i>\u0628\u062D\u062B
                        </label>
                        <div class="relative w-full">
                            <input type="text" id="legal-docs-search" class="form-input pr-10 filter-input" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0631\u0642\u0645 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F" value="${Utils.escapeHTML(s.search||"")}">
                            <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                        </div>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="legal-docs-filter-type">
                            <i class="fas fa-tags ml-1"></i>\u0627\u0644\u0646\u0648\u0639
                            ${s.type?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C">${a.length}</span>`:""}
                        </label>
                        <select id="legal-docs-filter-type" class="form-input filter-input">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${r.map(n=>`<option value="${Utils.escapeHTML(n)}" ${s.type===n?"selected":""}>${Utils.escapeHTML(n)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="legal-docs-filter-status">
                            <i class="fas fa-signal ml-1"></i>\u0627\u0644\u062D\u0627\u0644\u0629
                            ${s.status?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C">${a.length}</span>`:""}
                        </label>
                        <select id="legal-docs-filter-status" class="form-input filter-input">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${c.map(n=>`<option value="${Utils.escapeHTML(n)}" ${s.status===n?"selected":""}>${Utils.escapeHTML(n)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="legal-docs-filter-issued-by">
                            <i class="fas fa-building ml-1"></i>\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0635\u0627\u062F\u0631\u0629
                            ${s.issuedBy?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C">${a.length}</span>`:""}
                        </label>
                        <select id="legal-docs-filter-issued-by" class="form-input filter-input">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${i.map(n=>`<option value="${Utils.escapeHTML(n)}" ${s.issuedBy===n?"selected":""}>${Utils.escapeHTML(n)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="legal-docs-date-from"><i class="fas fa-calendar-alt ml-1"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                        <input type="date" id="legal-docs-date-from" class="form-input filter-input" value="${s.dateFrom||""}">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="legal-docs-date-to"><i class="fas fa-calendar-check ml-1"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                        <input type="date" id="legal-docs-date-to" class="form-input filter-input" value="${s.dateTo||""}">
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
            ${o&&a.length===0?`
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
                        ${a.map(n=>{const p=new Date(n.expiryDate),g=new Date,u=Math.ceil((p-g)/(1e3*60*60*24)),d=p<g,m=u<=n.alertDays&&u>0;return`
                            <tr class="${d?"bg-red-50":m?"bg-yellow-50":""}">
                                <td>${Utils.escapeHTML(n.isoCode||"")}</td>
                                <td>${Utils.escapeHTML(n.documentName||"")}</td>
                                <td>${Utils.escapeHTML(n.documentType||"")}</td>
                                <td>${Utils.escapeHTML(n.documentNumber||"")}</td>
                                <td>${n.issueDate?Utils.formatDate(n.issueDate):"-"}</td>
                                <td>${n.expiryDate?Utils.formatDate(n.expiryDate):"-"}</td>
                                <td>
                                    <span class="${d?"text-red-600 font-bold":m?"text-yellow-600 font-bold":"text-green-600"}">
                                        ${d?"\u0645\u0646\u062A\u0647\u064A":m?`${u} \u064A\u0648\u0645`:`${u} \u064A\u0648\u0645`}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge badge-${d?"danger":m?"warning":"success"}">
                                        ${d?"\u0645\u0646\u062A\u0647\u064A":m?"\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"\u0646\u0634\u0637"}
                                    </span>
                                </td>
                                <td>${Utils.escapeHTML(n.followUpResponsible||"-")}</td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button onclick="LegalDocuments.viewDocument('${n.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button onclick="LegalDocuments.exportPDF('${n.id}')" class="btn-icon btn-icon-success" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                                            <i class="fas fa-file-pdf"></i>
                                        </button>
                                        <button onclick="LegalDocuments.editDocument('${n.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="LegalDocuments.deleteDocument('${n.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `}).join("")}
                    </tbody>
                </table>
            </div>
        `,this.bindLegalDocumentsFilterEvents(e);const l=document.getElementById("legal-docs-clear-empty-filters");l&&l.addEventListener("click",()=>{this.resetLegalDocumentFilters(),this.loadLegalDocumentsList()})},bindTabEvents(){document.querySelectorAll(".legal-tab-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-tab");!a||a===this.state.activeTab||(this.state.activeTab=a,this.renderTabNavigation(),this.renderActiveTabContent())})})},renderTabNavigation(){document.querySelectorAll(".legal-tab-btn").forEach(t=>{t.getAttribute("data-tab")===this.state.activeTab?(t.classList.remove("btn-secondary"),t.classList.add("btn-primary","active")):(t.classList.remove("btn-primary","active"),t.classList.add("btn-secondary"))})},renderActiveTabContent(){const e=this.state.activeTab||"documents";document.querySelectorAll(".legal-tab-panel").forEach(a=>{const s=a.getAttribute("data-tab-panel");a.style.display=s===e?"block":"none"}),e==="documents"?(this.loadLegalDocumentsList(),this.checkExpiringDocuments()):e==="inventory"&&this.loadInventoryList()},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-legal-document-btn"),t=document.getElementById("add-legal-document-empty-btn");e&&e.addEventListener("click",()=>this.showForm()),t&&t.addEventListener("click",()=>this.showForm());const a=document.getElementById("export-legal-excel-btn");a&&a.addEventListener("click",()=>this.exportToExcel());const s=document.getElementById("check-legal-updates-btn");s&&s.addEventListener("click",()=>this.checkLegalUpdates());const r=document.getElementById("save-legal-settings-btn");r&&r.addEventListener("click",()=>this.saveLegalSettings());const c=document.getElementById("add-legal-inventory-btn");c&&c.addEventListener("click",()=>this.showInventoryForm());const i=document.getElementById("add-legal-inventory-empty-btn");i&&i.addEventListener("click",()=>this.showInventoryForm());const o=document.getElementById("export-legal-inventory-excel-btn");o&&o.addEventListener("click",()=>this.exportInventoryToExcel())},100)},async showForm(e=null){const t=!!e,a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
        `,document.body.appendChild(a),a.querySelector("#legal-document-form").addEventListener("submit",r=>{r.preventDefault(),this.handleSubmit(e?.id,a)}),a.addEventListener("click",r=>{r.target===a&&a.remove()}),setTimeout(()=>{const r=document.getElementById("legal-doc-image-input"),c=document.getElementById("legal-doc-image-preview"),i=document.getElementById("legal-doc-image-img");r&&c&&i&&r.addEventListener("change",async o=>{const l=o.target.files[0];if(l){if(l.size>5242880){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 5MB"),r.value="";return}const n=new FileReader;n.onload=p=>{i.src=p.target.result,c.classList.remove("hidden")},n.readAsDataURL(l)}})},100)},async convertImageToBase64(e){return new Promise((t,a)=>{const s=new FileReader;s.onload=()=>t(s.result),s.onerror=a,s.readAsDataURL(e)})},async handleSubmit(e,t){AppState.appData.legalDocuments||(AppState.appData.legalDocuments=[]);const a=d=>{const m=document.getElementById(d);return m?m.value.trim():""},s=d=>{const m=document.getElementById(d);return m?m.value:null},r=document.getElementById("legal-doc-issue-date"),c=document.getElementById("legal-doc-expiry-date");let i,o;if(r&&r.value)try{i=new Date(r.value).toISOString()}catch{i=new Date().toISOString()}else i=new Date().toISOString();if(c&&c.value)try{o=new Date(c.value).toISOString()}catch{o=new Date().toISOString()}else o=new Date().toISOString();const l=document.getElementById("legal-doc-alert-days"),n=l&&l.value?parseInt(l.value):30;let p=e&&AppState.appData.legalDocuments.find(d=>d.id===e)?.documentImage||"";const g=document.getElementById("legal-doc-image-input");if(g&&g.files.length>0){const d=g.files[0];if(d.size>5242880){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 5MB");return}try{p=await this.convertImageToBase64(d)}catch(m){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629: "+m.message);return}}const u={id:e||Utils.generateId("LEGAL"),isoCode:generateISOCode("LEGAL",AppState.appData.legalDocuments),documentName:a("legal-doc-name"),documentType:a("legal-doc-type"),documentNumber:a("legal-doc-number"),issuedBy:a("legal-doc-issued-by"),followUpResponsible:a("legal-doc-followup-responsible"),issueDate:i,expiryDate:o,alertDays:n,status:a("legal-doc-status"),description:a("legal-doc-description"),documentLink:a("legal-doc-link"),documentImage:p,createdAt:e?AppState.appData.legalDocuments?.find(d=>d.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};Loading.show();try{if(e){const d=AppState.appData.legalDocuments.findIndex(m=>m.id===e);d!==-1&&(AppState.appData.legalDocuments[d]=u,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.legalDocuments.push(u),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("LegalDocuments",AppState.appData.legalDocuments),Loading.hide(),t.remove(),this.load(),setTimeout(()=>this.updateStatisticsCards(),100)}catch(d){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+d.message)}},async editDocument(e){const t=AppState.appData.legalDocuments?.find(a=>a.id===e);t&&await this.showForm(t)},async viewDocument(e){const t=AppState.appData.legalDocuments?.find(l=>l.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0633\u062A\u0646\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const a=new Date(t.expiryDate),s=new Date,r=Math.ceil((a-s)/(1e3*60*60*24)),c=a<s,i=r<=t.alertDays&&r>0,o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
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
                                <p class="text-gray-800 ${c?"text-red-600 font-bold":i?"text-yellow-600 font-bold":"text-green-600"}">
                                    ${c?"\u0645\u0646\u062A\u0647\u064A":`${r} \u064A\u0648\u0645`}
                                </p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <span class="badge badge-${c?"danger":i?"warning":"success"}">
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
                                    ${(()=>{const l=this.processPhoto(t.documentImage),n=l&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(l):{canonical:l||"",displaySrc:l||"",needsProxy:!1,proxyFileId:""},p=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(n):"";return`<img src="${Utils.escapeHTML(n.displaySrc)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F"${p} class="legal-doc-view-img max-w-full h-auto rounded border shadow-sm" style="max-height: 400px;"
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
        `,document.body.appendChild(o),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(o,{onFetchFail:l=>{try{l.onerror=null,l.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),o.addEventListener("click",l=>{l.target===o&&o.remove()})},async deleteDocument(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u061F")){Loading.show();try{AppState.appData.legalDocuments=AppState.appData.legalDocuments.filter(t=>t.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0628\u0646\u062C\u0627\u062D"),this.load(),setTimeout(()=>this.updateStatisticsCards(),100)}catch(t){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}}},async exportPDF(e){const t=AppState.appData.legalDocuments?.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0633\u062A\u0646\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show();const a=t.isoCode||t.documentNumber||t.id?.substring(0,12)||"LEGAL-UNKNOWN",s="\u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A",r=new Date(t.expiryDate),c=new Date,i=Math.ceil((r-c)/(1e3*60*60*24)),o=r<c,l=i<=t.alertDays&&i>0,n=`
                <table>
                    <tr><th>\u0643\u0648\u062F ISO</th><td>${Utils.escapeHTML(t.isoCode||"N/A")}</td></tr>
                    <tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th><td>${Utils.escapeHTML(t.documentName||"N/A")}</td></tr>
                    <tr><th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th><td>${Utils.escapeHTML(t.documentType||"N/A")}</td></tr>
                    <tr><th>\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th><td>${Utils.escapeHTML(t.documentNumber||"N/A")}</td></tr>
                    <tr><th>\u0627\u0644\u0635\u0627\u062F\u0631 \u0639\u0646</th><td>${Utils.escapeHTML(t.issuedBy||"N/A")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</th><td>${Utils.escapeHTML(t.followUpResponsible||"N/A")}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th><td>${t.issueDate?Utils.formatDate(t.issueDate):"N/A"}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th><td>${t.expiryDate?Utils.formatDate(t.expiryDate):"N/A"}</td></tr>
                    <tr><th>\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629</th><td class="${o?"text-red-600 font-bold":l?"text-yellow-600 font-bold":"text-green-600"}">${o?"\u0645\u0646\u062A\u0647\u064A":`${i} \u064A\u0648\u0645`}</td></tr>
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
                ${(()=>{const m=this.processPhoto(t.documentImage);return m?`
                    <div class="section-title">\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F:</div>
                    <div class="description">
                        <img src="${Utils.escapeHTML(m)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F" style="max-width: 100%; max-height: 400px; border: 1px solid #ddd; border-radius: 4px;"
                             onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                    </div>
                `:""})()}
            `,p=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(a,s,n,!0,!0):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</title></head><body>${n}</body></html>`,g=new Blob([p],{type:"text/html;charset=utf-8"}),u=URL.createObjectURL(g),d=window.open(u,"_blank");d?d.onload=()=>{setTimeout(()=>{d.print(),setTimeout(()=>{URL.revokeObjectURL(u),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},1e3)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",a),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+a.message)}},async exportToExcel(){try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629");return}const t=(AppState.appData.legalDocuments||[]).map(i=>{const o=new Date(i.expiryDate),l=new Date,n=Math.ceil((o-l)/(1e3*60*60*24)),p=o<l;return{"\u0643\u0648\u062F ISO":i.isoCode||"","\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F":i.documentName||"","\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F":i.documentType||"","\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F":i.documentNumber||"","\u0627\u0644\u0635\u0627\u062F\u0631 \u0639\u0646":i.issuedBy||"","\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0639\u0646 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629":i.followUpResponsible||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631":i.issueDate?Utils.formatDate(i.issueDate):"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":i.expiryDate?Utils.formatDate(i.expiryDate):"","\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629":p?"\u0645\u0646\u062A\u0647\u064A":`${n} \u064A\u0648\u0645`,\u0627\u0644\u062D\u0627\u0644\u0629:i.status||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":i.createdAt?Utils.formatDate(i.createdAt):""}}),a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(t);s["!cols"]=[{wch:15},{wch:30},{wch:20},{wch:20},{wch:25},{wch:15},{wch:15},{wch:20},{wch:15},{wch:15}],XLSX.utils.book_append_sheet(a,s,"\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629");const c=`\u0633\u062C\u0644_\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A_\u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,c),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+e.message)}},checkExpiringDocuments(){const e=AppState.appData.legalDocuments||[],t=new Date,a=[];e.forEach(s=>{if(s.status==="\u0646\u0634\u0637"&&s.expiryDate){const r=new Date(s.expiryDate),c=Math.ceil((r-t)/(1e3*60*60*24));c<=s.alertDays&&c>0?a.push({type:"warning",message:`\u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A "${s.documentName}" \u0633\u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ${c} \u064A\u0648\u0645`}):c<=0&&a.push({type:"critical",message:`\u0645\u0633\u062A\u0646\u062F \u0642\u0627\u0646\u0648\u0646\u064A "${s.documentName}" \u0645\u0646\u062A\u0647\u064A \u0635\u0644\u0627\u062D\u064A\u062A\u0647!`})}}),a.length>0&&AppState.notificationEmails&&AppState.notificationEmails.length>0&&this.sendEmailNotifications(a),a.forEach(s=>{s.type==="critical"?Notification.error(s.message):Notification.warning(s.message)})},async sendEmailNotifications(e){Utils.safeLog("\u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A:",AppState.notificationEmails),Utils.safeLog("\u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A:",e),AppState.notificationEmails&&AppState.notificationEmails.length>0&&Notification.success(`\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0625\u0644\u0649 ${AppState.notificationEmails.length} \u0625\u064A\u0645\u064A\u0644`)},async checkLegalUpdates(){Loading.show();try{const e=document.getElementById("legal-portal-url")?.value||AppState.legalPortalUrl,t=(document.getElementById("legal-keywords")?.value||"").split(",").map(a=>a.trim()).filter(a=>a);if(!e){Loading.hide(),Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0627\u0628\u0637 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0623\u0648\u0644\u0627\u064B");return}await new Promise(a=>setTimeout(a,1500)),Loading.hide(),Notification.success(`\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629. ${t.length>0?`\u062A\u0645 \u0627\u0644\u0628\u062D\u062B \u0639\u0646: ${t.join(", ")}`:"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0643\u0644\u0645\u0627\u062A \u0645\u062A\u0627\u062D\u064A\u0629"}`)}catch(e){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A: "+e.message)}},saveLegalSettings(){const e=document.getElementById("legal-portal-url")?.value.trim(),t=document.getElementById("legal-keywords")?.value||"",a=document.getElementById("legal-auto-notify")?.checked||!1;AppState.legalPortalUrl=e,AppState.legalKeywords=t.split(",").map(s=>s.trim()).filter(s=>s),AppState.legalAutoNotify=a,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0628\u0646\u062C\u0627\u062D")},async renderInventoryTab(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-clipboard-list ml-2"></i>\u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646
                        </h2>
                        <div class="flex gap-2">
                            <button id="export-legal-inventory-excel-btn" class="btn-success">
                                <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                            <button id="add-legal-inventory-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="legal-inventory-table-container">
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
        `},async loadInventoryList(){const e=document.getElementById("legal-inventory-table-container");if(!e)return;AppState.appData.legalInventory||(AppState.appData.legalInventory=[]);const t=AppState.appData.legalInventory||[];if(t.length===0){e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0641\u064A \u062D\u0635\u0631 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646</p>
                    <button id="add-legal-inventory-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F
                    </button>
                </div>
            `,setTimeout(()=>{const a=document.getElementById("add-legal-inventory-empty-btn");a&&a.addEventListener("click",()=>this.showInventoryForm())},50);return}e.innerHTML=`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0645</th>
                            <th>\u0631\u0642\u0645 \u0627\u0644\u0645\u0627\u062F\u0629 / \u0627\u0644\u0642\u0627\u0646\u0648\u0646</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                            <th>\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                            <th>\u0628\u064A\u0627\u0646 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645</th>
                            <th>\u0627\u0644\u0645\u0633\u0626\u0648\u0644</th>
                            <th>\u0645\u0648\u0642\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map((a,s)=>{const r=a.applicationStatus==="\u0645\u0637\u0628\u0642"?"badge-success":a.applicationStatus==="\u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642"?"badge-warning":"badge-danger";return`
                                <tr>
                                    <td class="text-center">${s+1}</td>
                                    <td>${Utils.escapeHTML(a.lawNumber||"")}</td>
                                    <td>${a.issueDate?Utils.formatDate(a.issueDate):"-"}</td>
                                    <td>${Utils.escapeHTML(a.issuingAuthority||"")}</td>
                                    <td>${Utils.escapeHTML(a.complianceStatement||"")}</td>
                                    <td>${Utils.escapeHTML(a.responsible||"")}</td>
                                    <td>
                                        <span class="badge ${r}">
                                            ${Utils.escapeHTML(a.applicationStatus||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button onclick="LegalDocuments.editInventoryItem('${a.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button onclick="LegalDocuments.deleteInventoryItem('${a.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},async showInventoryForm(e=null){const t=!!e,a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646":"\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="legal-inventory-form" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0645\u0627\u062F\u0629 / \u0627\u0644\u0642\u0627\u0646\u0648\u0646 *</label>
                                <input type="text" id="inventory-law-number" required class="form-input"
                                    value="${Utils.escapeHTML(e?.lawNumber||"")}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0645\u0627\u062F\u0629 \u0623\u0648 \u0627\u0644\u0642\u0627\u0646\u0648\u0646">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631 *</label>
                                <input type="date" id="inventory-issue-date" required class="form-input"
                                    value="${e?.issueDate?new Date(e.issueDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 *</label>
                                <input type="text" id="inventory-issuing-authority" required class="form-input"
                                    value="${Utils.escapeHTML(e?.issuingAuthority||"")}" placeholder="\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0626\u0648\u0644 *</label>
                                <input type="text" id="inventory-responsible" required class="form-input"
                                    value="${Utils.escapeHTML(e?.responsible||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0626\u0648\u0644">
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0628\u064A\u0627\u0646 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 *</label>
                                <textarea id="inventory-compliance-statement" required class="form-input" rows="3"
                                    placeholder="\u0628\u064A\u0627\u0646 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645">${Utils.escapeHTML(e?.complianceStatement||"")}</textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0648\u0642\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 *</label>
                                <select id="inventory-application-status" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642</option>
                                    <option value="\u0645\u0637\u0628\u0642" ${e?.applicationStatus==="\u0645\u0637\u0628\u0642"?"selected":""}>\u0645\u0637\u0628\u0642</option>
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642" ${e?.applicationStatus==="\u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642</option>
                                    <option value="\u063A\u064A\u0631 \u0645\u0637\u0628\u0642" ${e?.applicationStatus==="\u063A\u064A\u0631 \u0645\u0637\u0628\u0642"?"selected":""}>\u063A\u064A\u0631 \u0645\u0637\u0628\u0642</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(a),a.querySelector("#legal-inventory-form").addEventListener("submit",r=>{r.preventDefault(),this.handleInventorySubmit(e?.id,a)}),a.addEventListener("click",r=>{r.target===a&&a.remove()})},async handleInventorySubmit(e,t){AppState.appData.legalInventory||(AppState.appData.legalInventory=[]);const a=i=>{const o=document.getElementById(i);return o?o.value.trim():""},s=document.getElementById("inventory-issue-date");let r;if(s&&s.value)try{r=new Date(s.value).toISOString()}catch{r=new Date().toISOString()}else r=new Date().toISOString();const c={id:e||Utils.generateId("LEGAL-INV"),lawNumber:a("inventory-law-number"),issueDate:r,issuingAuthority:a("inventory-issuing-authority"),complianceStatement:a("inventory-compliance-statement"),responsible:a("inventory-responsible"),applicationStatus:a("inventory-application-status"),createdAt:e?AppState.appData.legalInventory?.find(i=>i.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};Loading.show();try{if(e){const i=AppState.appData.legalInventory.findIndex(o=>o.id===e);i!==-1&&(AppState.appData.legalInventory[i]=c,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.legalInventory.push(c),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("LegalInventory",AppState.appData.legalInventory),Loading.hide(),t.remove(),this.loadInventoryList()}catch(i){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message)}},async editInventoryItem(e){const t=AppState.appData.legalInventory?.find(a=>a.id===e);t&&await this.showInventoryForm(t)},async deleteInventoryItem(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F")){Loading.show();try{AppState.appData.legalInventory=AppState.appData.legalInventory.filter(t=>t.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.loadInventoryList()}catch(t){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}}},async exportInventoryToExcel(){try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629");return}const t=(AppState.appData.legalInventory||[]).map((i,o)=>({\u0645:o+1,"\u0631\u0642\u0645 \u0627\u0644\u0645\u0627\u062F\u0629 / \u0627\u0644\u0642\u0627\u0646\u0648\u0646":i.lawNumber||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631":i.issueDate?Utils.formatDate(i.issueDate):"","\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631":i.issuingAuthority||"","\u0628\u064A\u0627\u0646 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645":i.complianceStatement||"",\u0627\u0644\u0645\u0633\u0626\u0648\u0644:i.responsible||"","\u0645\u0648\u0642\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642":i.applicationStatus||""})),a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(t);s["!cols"]=[{wch:5},{wch:25},{wch:15},{wch:25},{wch:40},{wch:20},{wch:15}],XLSX.utils.book_append_sheet(a,s,"\u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A");const c=`\u0633\u062C\u0644_\u062D\u0635\u0631_\u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A_\u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,c),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+e.message)}}};(function(){"use strict";try{typeof window<"u"&&typeof LegalDocuments<"u"&&(window.LegalDocuments=LegalDocuments,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 LegalDocuments module loaded and available on window.LegalDocuments"))}catch{if(typeof window<"u"&&typeof LegalDocuments<"u")try{window.LegalDocuments=LegalDocuments}catch{}}})();
