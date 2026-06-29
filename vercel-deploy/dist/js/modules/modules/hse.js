const HSE={currentView:"dashboard",currentTab:"dashboard",async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);let e=document.getElementById("hse-section");if(e||(e=document.getElementById("safety-health-management-section")),!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0642\u0633\u0645 hse-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}try{let s="";try{const t=this.render();s=await Utils.promiseWithTimeout(t,5e3,()=>new Error("Timeout: render took too long"))}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0648\u0627\u062C\u0647\u0629:",t),s=`
                    <div class="section-header">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-user-shield ml-3"></i>
                                \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (HSE)
                            </h1>
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
                                <p class="text-gray-500 mb-4">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                            </div>
                        </div>
                    </div>
                `}e.innerHTML=s;try{this.setupEventListeners(),this.loadDashboard()}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A setupEventListeners \u0623\u0648 loadDashboard:",t)}}catch(s){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 HSE:",s),e.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <button onclick="HSE.load()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `}},async render(){return`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-user-shield ml-3"></i>
                            \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (HSE)
                        </h1>
                        <p class="section-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</p>
                    </div>
                    <div class="flex gap-2">
                        <button id="hse-export-excel-btn" class="btn-success">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 Excel
                        </button>
                        <button id="hse-export-pdf-btn" class="btn-secondary">
                            <i class="fas fa-file-pdf ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tabs Navigation -->
            <div class="mt-6">
                <div class="flex items-center gap-2 border-b border-gray-200" style="border-bottom: 2px solid #e5e7eb; flex-wrap: nowrap; overflow-x: auto; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                    <button class="hse-tab-btn active" data-tab="dashboard" onclick="HSE.switchTab('dashboard')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                        <i class="fas fa-chart-pie ml-2"></i>
                        \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645
                    </button>
                    <button class="hse-tab-btn" data-tab="audits" onclick="HSE.switchTab('audits')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                        <i class="fas fa-clipboard-check ml-2"></i>
                        \u0627\u0644\u062A\u062F\u0642\u064A\u0642\u0627\u062A
                    </button>
                    <button class="hse-tab-btn" data-tab="non-conformities" onclick="HSE.switchTab('non-conformities')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                        <i class="fas fa-exclamation-triangle ml-2"></i>
                        \u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629
                    </button>
                    <button class="hse-tab-btn" data-tab="corrective-actions" onclick="HSE.switchTab('corrective-actions')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                        <i class="fas fa-tools ml-2"></i>
                        \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629
                    </button>
                    <button class="hse-tab-btn" data-tab="objectives" onclick="HSE.switchTab('objectives')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                        <i class="fas fa-bullseye ml-2"></i>
                        \u0627\u0644\u0623\u0647\u062F\u0627\u0641
                    </button>
                    <button class="hse-tab-btn" data-tab="risk-assessments" onclick="HSE.switchTab('risk-assessments')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                        <i class="fas fa-shield-alt ml-2"></i>
                        \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631
                    </button>
                </div>
                <style>
                    .hse-tab-btn:hover {
                        color: #3b82f6 !important;
                    }
                    .hse-tab-btn.active {
                        color: #3b82f6 !important;
                        border-bottom-color: #3b82f6 !important;
                        font-weight: 600 !important;
                    }
                </style>
            </div>
            
            <!-- Tab Content -->
            <div id="hse-tab-content" class="mt-6">
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async switchTab(e){this.currentTab=e,document.querySelectorAll(".hse-tab-btn").forEach(n=>{n.classList.remove("active"),n.dataset.tab===e&&n.classList.add("active"),n.style.flexShrink||(n.style.setProperty("flex-shrink","0","important"),n.style.setProperty("min-width","fit-content","important"),n.style.setProperty("white-space","nowrap","important"),n.style.setProperty("width","auto","important"),n.style.setProperty("max-width","none","important"))});const t=document.querySelector(".flex.items-center.gap-2.border-b.border-gray-200");t&&!t.style.flexWrap&&(t.style.setProperty("flex-wrap","nowrap","important"),t.style.setProperty("overflow-x","auto","important"),t.style.setProperty("overflow-y","visible","important"));const i=document.getElementById("hse-tab-content");i&&(e==="dashboard"?(i.innerHTML=await this.renderDashboard(),this.loadDashboard()):e==="audits"?(i.innerHTML=await this.renderAudits(),this.loadAudits()):e==="non-conformities"?(i.innerHTML=await this.renderNonConformities(),this.loadNonConformities()):e==="corrective-actions"?(i.innerHTML=await this.renderCorrectiveActions(),this.loadCorrectiveActions()):e==="objectives"?(i.innerHTML=await this.renderObjectives(),this.loadObjectives()):e==="risk-assessments"&&(i.innerHTML=await this.renderRiskAssessments(),this.loadRiskAssessments()))},async renderDashboard(){const e=AppState.appData?.hseAudits||[],s=AppState.appData?.hseNonConformities||[],t=AppState.appData?.hseCorrectiveActions||[],i=AppState.appData?.hseObjectives||[],n=AppState.appData?.hseRiskAssessments||[],r=t.filter(d=>d.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||d.status==="pending").length,o=t.filter(d=>d.status==="\u0645\u0643\u062A\u0645\u0644"||d.status==="completed").length,a=t.filter(d=>d.dueDate?new Date(d.dueDate)<new Date&&(d.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||d.status==="pending"):!1).length;return`
            <!-- KPI Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u062A\u062F\u0642\u064A\u0642\u0627\u062A</p>
                                <p class="text-2xl font-bold text-blue-600">${e.length}</p>
                            </div>
                            <div class="bg-blue-100 rounded-full p-4">
                                <i class="fas fa-clipboard-check text-2xl text-blue-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">\u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</p>
                                <p class="text-2xl font-bold text-red-600">${s.length}</p>
                            </div>
                            <div class="bg-red-100 rounded-full p-4">
                                <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629</p>
                                <p class="text-2xl font-bold text-yellow-600">${t.length}</p>
                            </div>
                            <div class="bg-yellow-100 rounded-full p-4">
                                <i class="fas fa-tools text-2xl text-yellow-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u0623\u0647\u062F\u0627\u0641</p>
                                <p class="text-2xl font-bold text-green-600">${i.length}</p>
                            </div>
                            <div class="bg-green-100 rounded-full p-4">
                                <i class="fas fa-bullseye text-2xl text-green-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631</p>
                                <p class="text-2xl font-bold text-purple-600">${n.length}</p>
                            </div>
                            <div class="bg-purple-100 rounded-full p-4">
                                <i class="fas fa-shield-alt text-2xl text-purple-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Status Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="content-card">
                    <div class="card-header bg-yellow-50">
                        <h2 class="card-title text-yellow-800">
                            <i class="fas fa-clock ml-2"></i>
                            \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630
                        </h2>
                    </div>
                    <div class="card-body">
                        <p class="text-3xl font-bold text-yellow-600">${r}</p>
                        <p class="text-sm text-gray-600 mt-2">\u0645\u0646 \u0625\u062C\u0645\u0627\u0644\u064A ${t.length} \u0625\u062C\u0631\u0627\u0621</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header bg-green-50">
                        <h2 class="card-title text-green-800">
                            <i class="fas fa-check-circle ml-2"></i>
                            \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629
                        </h2>
                    </div>
                    <div class="card-body">
                        <p class="text-3xl font-bold text-green-600">${o}</p>
                        <p class="text-sm text-gray-600 mt-2">\u0645\u0646 \u0625\u062C\u0645\u0627\u0644\u064A ${t.length} \u0625\u062C\u0631\u0627\u0621</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header bg-red-50">
                        <h2 class="card-title text-red-800">
                            <i class="fas fa-exclamation-circle ml-2"></i>
                            \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u0623\u062E\u0631\u0629
                        </h2>
                    </div>
                    <div class="card-body">
                        <p class="text-3xl font-bold text-red-600">${a}</p>
                        <p class="text-sm text-gray-600 mt-2">\u064A\u062D\u062A\u0627\u062C \u0645\u062A\u0627\u0628\u0639\u0629 \u0639\u0627\u062C\u0644\u0629</p>
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-history ml-2"></i>
                        \u0627\u0644\u0646\u0634\u0627\u0637 \u0627\u0644\u0623\u062E\u064A\u0631
                    </h2>
                </div>
                <div class="card-body">
                    <div id="hse-recent-activity" class="space-y-4">
                        <div class="text-center text-gray-500 py-8">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderAudits(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            \u062A\u062F\u0642\u064A\u0642\u0627\u062A HSE
                        </h2>
                        <button id="add-audit-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062A\u062F\u0642\u064A\u0642 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="hse-audits-list" class="space-y-4">
                        <div class="text-center text-gray-500 py-8">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderNonConformities(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-exclamation-triangle ml-2"></i>
                            \u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 HSE
                        </h2>
                        <button id="add-non-conformity-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0639\u062F\u0645 \u0645\u0637\u0627\u0628\u0642\u0629 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="hse-non-conformities-list" class="space-y-4">
                        <div class="text-center text-gray-500 py-8">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderCorrectiveActions(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-tools ml-2"></i>
                            \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 HSE
                        </h2>
                        <button id="add-corrective-action-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="hse-corrective-actions-list" class="space-y-4">
                        <div class="text-center text-gray-500 py-8">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderObjectives(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-bullseye ml-2"></i>
                            \u0623\u0647\u062F\u0627\u0641 HSE
                        </h2>
                        <button id="add-objective-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0647\u062F\u0641 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="hse-objectives-list" class="space-y-4">
                        <div class="text-center text-gray-500 py-8">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderRiskAssessments(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-shield-alt ml-2"></i>
                            \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u062E\u0627\u0637\u0631 HSE
                        </h2>
                        <button id="add-risk-assessment-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0645\u062E\u0627\u0637\u0631 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="hse-risk-assessments-list" class="space-y-4">
                        <div class="text-center text-gray-500 py-8">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},loadDashboard(){const e=document.getElementById("hse-recent-activity");if(!e)return;const s=AppState.appData?.hseAudits||[],t=AppState.appData?.hseNonConformities||[],i=AppState.appData?.hseCorrectiveActions||[],n=AppState.appData?.hseObjectives||[],r=AppState.appData?.hseRiskAssessments||[],o=[...s.map(a=>({...a,type:"audit",icon:"fa-clipboard-check",color:"blue"})),...t.map(a=>({...a,type:"non-conformity",icon:"fa-exclamation-triangle",color:"red"})),...i.map(a=>({...a,type:"corrective-action",icon:"fa-tools",color:"yellow"})),...n.map(a=>({...a,type:"objective",icon:"fa-bullseye",color:"green"})),...r.map(a=>({...a,type:"risk-assessment",icon:"fa-shield-alt",color:"purple"}))].sort((a,d)=>{const c=new Date(a.date||a.createdAt||0);return new Date(d.date||d.createdAt||0)-c}).slice(0,10);if(o.length===0){e.innerHTML=`
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-inbox text-4xl mb-2"></i>
                    <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0634\u0637\u0629 \u062D\u062F\u064A\u062B\u0629</p>
                </div>
            `;return}e.innerHTML=o.map(a=>{const c=new Date(a.date||a.createdAt).toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"}),l=a.title||a.description||a.name||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646";return`
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="bg-${a.color}-100 rounded-full p-3">
                        <i class="fas ${a.icon} text-${a.color}-600"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(l)}</h3>
                        <p class="text-sm text-gray-600">${c}</p>
                    </div>
                </div>
            `}).join("")},loadAudits(){const e=document.getElementById("hse-audits-list");if(!e)return;const s=AppState.appData?.hseAudits||[];if(s.length===0){e.innerHTML=`
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-inbox text-4xl mb-2"></i>
                    <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062F\u0642\u064A\u0642\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>
                </div>
            `;return}e.innerHTML=s.map(t=>{const i=t.date?new Date(t.date).toLocaleDateString("ar-SA"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(t.title||t.type||"\u062A\u062F\u0642\u064A\u0642")}</h3>
                    <p class="text-sm text-gray-600 mt-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${i}</p>
                </div>
            `}).join("")},loadNonConformities(){const e=document.getElementById("hse-non-conformities-list");if(!e)return;const s=AppState.appData?.hseNonConformities||[];if(s.length===0){e.innerHTML=`
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-inbox text-4xl mb-2"></i>
                    <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0627\u0644\u0627\u062A \u0639\u062F\u0645 \u0645\u0637\u0627\u0628\u0642\u0629 \u0645\u0633\u062C\u0644\u0629</p>
                </div>
            `;return}e.innerHTML=s.map(t=>{const i=t.date?new Date(t.date).toLocaleDateString("ar-SA"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(t.title||t.description||"\u0639\u062F\u0645 \u0645\u0637\u0627\u0628\u0642\u0629")}</h3>
                    <p class="text-sm text-gray-600 mt-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${i}</p>
                </div>
            `}).join("")},loadCorrectiveActions(){const e=document.getElementById("hse-corrective-actions-list");if(!e)return;const s=AppState.appData?.hseCorrectiveActions||[];if(s.length===0){e.innerHTML=`
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-inbox text-4xl mb-2"></i>
                    <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0645\u0633\u062C\u0644\u0629</p>
                </div>
            `;return}e.innerHTML=s.map(t=>{const i=t.date?new Date(t.date).toLocaleDateString("ar-SA"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n=t.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r=n==="\u0645\u0643\u062A\u0645\u0644"||n==="completed"?"green":n==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||n==="pending"?"yellow":"gray";return`
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(t.title||t.description||"\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A")}</h3>
                    <p class="text-sm text-gray-600 mt-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${i}</p>
                    <span class="inline-block mt-2 px-3 py-1 bg-${r}-100 text-${r}-800 rounded-full text-xs">${n}</span>
                </div>
            `}).join("")},loadObjectives(){const e=document.getElementById("hse-objectives-list");if(!e)return;const s=AppState.appData?.hseObjectives||[];if(s.length===0){e.innerHTML=`
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-inbox text-4xl mb-2"></i>
                    <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0647\u062F\u0627\u0641 \u0645\u0633\u062C\u0644\u0629</p>
                </div>
            `;return}e.innerHTML=s.map(t=>{const i=t.date?new Date(t.date).toLocaleDateString("ar-SA"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(t.title||t.description||"\u0647\u062F\u0641")}</h3>
                    <p class="text-sm text-gray-600 mt-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${i}</p>
                </div>
            `}).join("")},loadRiskAssessments(){const e=document.getElementById("hse-risk-assessments-list");if(!e)return;const s=AppState.appData?.hseRiskAssessments||[];if(s.length===0){e.innerHTML=`
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-inbox text-4xl mb-2"></i>
                    <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u062E\u0627\u0637\u0631 \u0645\u0633\u062C\u0644\u0629</p>
                </div>
            `;return}e.innerHTML=s.map(t=>{const i=t.date?new Date(t.date).toLocaleDateString("ar-SA"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(t.title||t.description||"\u062A\u0642\u064A\u064A\u0645 \u0645\u062E\u0627\u0637\u0631")}</h3>
                    <p class="text-sm text-gray-600 mt-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${i}</p>
                </div>
            `}).join("")},setupEventListeners(){const e=document.getElementById("hse-export-excel-btn");e&&e.addEventListener("click",()=>{Notification.info("\u0645\u064A\u0632\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631")});const s=document.getElementById("hse-export-pdf-btn");s&&s.addEventListener("click",()=>{Notification.info("\u0645\u064A\u0632\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631")});const t=document.getElementById("add-audit-btn");t&&t.addEventListener("click",()=>{Notification.info("\u0645\u064A\u0632\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631")});const i=document.getElementById("add-non-conformity-btn");i&&i.addEventListener("click",()=>{Notification.info("\u0645\u064A\u0632\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631")});const n=document.getElementById("add-corrective-action-btn");n&&n.addEventListener("click",()=>{Notification.info("\u0645\u064A\u0632\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631")});const r=document.getElementById("add-objective-btn");r&&r.addEventListener("click",()=>{Notification.info("\u0645\u064A\u0632\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631")});const o=document.getElementById("add-risk-assessment-btn");o&&o.addEventListener("click",()=>{Notification.info("\u0645\u064A\u0632\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631")})}};(function(){"use strict";try{typeof window<"u"&&typeof HSE<"u"&&(window.HSE=HSE,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 HSE module loaded and available on window.HSE"))}catch{if(typeof window<"u"&&typeof HSE<"u")try{window.HSE=HSE}catch{}}})();
