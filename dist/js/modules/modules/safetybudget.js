const SafetyBudget={currentView:"dashboard",currentEditId:null,currentBudgetId:null,currencies:{EGP:{symbol:"\u062C.\u0645",name:"\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A",locale:"ar-EG"},USD:{symbol:"$",name:"\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A",locale:"en-US"}},defaultCurrency:"EGP",expenseCategories:["\u0645\u0639\u062F\u0627\u062A","\u062A\u062F\u0631\u064A\u0628","\u0635\u064A\u0627\u0646\u0629","\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629","\u0637\u0648\u0627\u0631\u0626","OPEX","CAPEX","\u0623\u062E\u0631\u0649"],getCurrencySymbol(e=null){const a=e||this.defaultCurrency;return this.currencies[a]?.symbol||a},formatCurrency(e,a=null){const t=a||this.defaultCurrency,s=this.currencies[t];return s?t==="EGP"?e.toLocaleString("ar-EG",{minimumFractionDigits:2,maximumFractionDigits:2})+" "+s.symbol:t==="USD"?s.symbol+e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):e.toLocaleString("ar-SA",{minimumFractionDigits:2,maximumFractionDigits:2})+" "+s.symbol:e.toLocaleString("ar-SA",{minimumFractionDigits:2,maximumFractionDigits:2})},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u")return;const e=document.getElementById("safety-budget-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0642\u0633\u0645 safety-budget-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}if(typeof AppState>"u"){e.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</p>
                            <p class="text-sm text-gray-400">AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B. \u062C\u0631\u0651\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p>
                            <button onclick="location.reload()" class="btn-primary mt-4">
                                <i class="fas fa-redo ml-2"></i>
                                \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `,Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}try{e.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-wallet ml-3" aria-hidden="true"></i>
                                \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u062A\u062A\u0628\u0639 \u0627\u0644\u0625\u0646\u0641\u0627\u0642
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
            `,AppState.appData||(AppState.appData={}),AppState.appData.safetyBudget||(AppState.appData.safetyBudget={expenses:[],budgets:[]});const a=typeof i18n<"u"&&i18n.translate?i18n.translate("budget.title"):"\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u062A\u062A\u0628\u0639 \u0627\u0644\u0625\u0646\u0641\u0627\u0642",t=typeof i18n<"u"&&i18n.translate?i18n.translate("budget.subtitle"):"\u0625\u062F\u0627\u0631\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0648\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629";let s="";try{const n=this.renderDashboard();s=await Utils.promiseWithTimeout(n,1e4,()=>new Error("Timeout: renderDashboard took too long"))}catch(n){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645:",n),s=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="SafetyBudget.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `}e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-wallet ml-3" aria-hidden="true"></i>
                            ${a}
                        </h1>
                        <p class="section-subtitle">${t}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <button id="import-budget-btn" class="btn-secondary" onclick="SafetyBudget.showImportModal()">
                            <i class="fas fa-file-import ml-2"></i>
                            \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel
                        </button>
                        <button id="export-report-pdf-btn" class="btn-secondary" onclick="SafetyBudget.exportReport('pdf')">
                            <i class="fas fa-file-pdf ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                        <button id="export-report-excel-btn" class="btn-secondary" onclick="SafetyBudget.exportReport('excel')">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 Excel
                        </button>
                        <button id="add-budget-btn" class="btn-secondary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0645\u064A\u0632\u0627\u0646\u064A\u0629
                        </button>
                        <button id="add-expense-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u062A\u0633\u062C\u064A\u0644 \u0645\u0635\u0631\u0648\u0641 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <!-- Tabs Navigation -->
                <div class="mb-6">
                    <div class="flex items-center gap-2 border-b border-gray-200" style="border-bottom: 2px solid #e5e7eb;">
                        <button class="tab-btn active" data-tab="dashboard" onclick="SafetyBudget.switchTab('dashboard')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s;">
                            <i class="fas fa-chart-pie ml-2"></i>
                            \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645
                        </button>
                        <button class="tab-btn" data-tab="all" onclick="SafetyBudget.switchTab('all')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s;">
                            <i class="fas fa-list ml-2"></i>
                            \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A
                        </button>
                        <button class="tab-btn" data-tab="opex" onclick="SafetyBudget.switchTab('opex')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s;">
                            <i class="fas fa-chart-line ml-2"></i>
                            OPEX (\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u062A\u0634\u063A\u064A\u0644\u064A\u0629)
                        </button>
                        <button class="tab-btn" data-tab="capex" onclick="SafetyBudget.switchTab('capex')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s;">
                            <i class="fas fa-building ml-2"></i>
                            CAPEX (\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0631\u0623\u0633\u0645\u0627\u0644\u064A\u0629)
                        </button>
                    </div>
                    <style>
                        .tab-btn:hover {
                            color: #3b82f6 !important;
                        }
                        .tab-btn.active {
                            color: #3b82f6 !important;
                            border-bottom-color: #3b82f6 !important;
                            font-weight: 600 !important;
                        }
                    </style>
                </div>
                
                <!-- Tab Content -->
                <div id="safety-budget-tab-content">
                    ${s}
                </div>
            </div>
        `,this.setupEventListeners(),this.currentTab="dashboard";try{setTimeout(()=>{this.loadDashboard()},0)}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0623\u0648\u0644\u064A:",n)}setTimeout(()=>{try{this.loadDashboard().then(()=>{this.currentTab==="dashboard"&&this.switchTab("dashboard",{silent:!0})}).catch(n=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629:",n),this.loadDashboard()})}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629:",n),this.loadDashboard()}},100)}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629:",a),e.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-wallet ml-3"></i>
                            \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u062A\u062A\u0628\u0639 \u0627\u0644\u0625\u0646\u0641\u0627\u0642
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <p class="text-sm text-gray-400 mb-4">${a&&a.message?Utils.escapeHTML(a.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                <button onclick="SafetyBudget.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}},async switchTab(e,a={}){this.currentTab=e,document.querySelectorAll(".tab-btn").forEach(s=>{s.classList.remove("active"),s.dataset.tab===e&&s.classList.add("active")});const t=document.getElementById("safety-budget-tab-content");t&&(e==="dashboard"?(t.innerHTML=await this.renderDashboard(),this.loadDashboard()):e==="all"?(t.innerHTML=await this.renderExpensesList("all"),this.loadExpensesList()):e==="opex"?(t.innerHTML=await this.renderExpensesList("OPEX"),this.setupOPEXEventListeners(),this.loadOPEXList()):e==="capex"&&(t.innerHTML=await this.renderExpensesList("CAPEX"),this.setupCAPEXEventListeners(),this.loadCAPEXList()))},async renderDashboard(){return`
            <!-- Dashboard Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629</p>
                                <p class="text-2xl font-bold text-blue-600" id="total-budget">0.00</p>
                                <p class="text-xs text-gray-500 mt-1" id="total-budget-currency">\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A</p>
                            </div>
                            <div class="bg-blue-100 rounded-full p-4">
                                <i class="fas fa-wallet text-2xl text-blue-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A</p>
                                <p class="text-2xl font-bold text-red-600" id="total-expenses">0.00</p>
                                <p class="text-xs text-gray-500 mt-1" id="total-expenses-currency">\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A</p>
                            </div>
                            <div class="bg-red-100 rounded-full p-4">
                                <i class="fas fa-money-bill-wave text-2xl text-red-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u0645\u062A\u0628\u0642\u064A</p>
                                <p class="text-2xl font-bold text-green-600" id="remaining-budget">0.00</p>
                                <p class="text-xs text-gray-500 mt-1" id="remaining-budget-currency">\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A</p>
                            </div>
                            <div class="bg-green-100 rounded-full p-4">
                                <i class="fas fa-coins text-2xl text-green-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643</p>
                                <p class="text-2xl font-bold" id="consumption-percentage">0%</p>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" id="consumption-bar" style="width: 0%"></div>
                                </div>
                            </div>
                            <div class="bg-yellow-100 rounded-full p-4">
                                <i class="fas fa-percentage text-2xl text-yellow-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts and Summary -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-pie ml-2"></i>
                            \u0627\u0644\u0625\u0646\u0641\u0627\u0642 \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="expenses-by-category-chart" style="height: 300px;"></div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-line ml-2"></i>
                            \u0627\u0644\u0625\u0646\u0641\u0627\u0642 \u0627\u0644\u0634\u0647\u0631\u064A
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="monthly-expenses-chart" style="height: 300px;"></div>
                    </div>
                </div>
            </div>

            <!-- Top Expenses and Recent Transactions -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-list-ol ml-2"></i>
                            \u0623\u0639\u0644\u0649 \u0628\u0646\u0648\u062F \u0627\u0644\u0625\u0646\u0641\u0627\u0642
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="top-expenses-list"></div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-history ml-2"></i>
                            \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0623\u062E\u064A\u0631\u0629
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="recent-transactions-list"></div>
                    </div>
                </div>
            </div>

            <!-- Expenses List -->
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-table ml-2"></i>
                            \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A
                        </h2>
                        <div class="flex items-center gap-4">
                            <input type="text" id="expense-search" class="form-input" style="max-width: 300px;" placeholder="\u0627\u0644\u0628\u062D\u062B...">
                            <select id="expense-filter-category" class="form-input" style="max-width: 200px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0626\u0627\u062A</option>
                                <option value="\u0645\u0639\u062F\u0627\u062A">\u0645\u0639\u062F\u0627\u062A</option>
                                <option value="\u062A\u062F\u0631\u064A\u0628">\u062A\u062F\u0631\u064A\u0628</option>
                                <option value="\u0635\u064A\u0627\u0646\u0629">\u0635\u064A\u0627\u0646\u0629</option>
                                <option value="\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629">\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629</option>
                                <option value="\u0637\u0648\u0627\u0631\u0626">\u0637\u0648\u0627\u0631\u0626</option>
                                <option value="OPEX">OPEX</option>
                                <option value="CAPEX">CAPEX</option>
                                <option value="\u0623\u062E\u0631\u0649">\u0623\u062E\u0631\u0649</option>
                            </select>
                            <select id="expense-filter-year" class="form-input" style="max-width: 150px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u0646\u0648\u0627\u062A</option>
                            </select>
                            <select id="expense-filter-month" class="form-input" style="max-width: 150px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0634\u0647\u0631</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="expenses-table-container">
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
        `},setupEventListeners(){const e=document.getElementById("add-budget-btn"),a=document.getElementById("add-expense-btn"),t=document.getElementById("expense-search"),s=document.getElementById("all-search"),n=document.getElementById("expense-filter-category"),i=document.getElementById("all-filter-category"),d=document.getElementById("expense-filter-year"),o=document.getElementById("all-filter-year"),r=document.getElementById("expense-filter-month"),l=document.getElementById("all-filter-month");e&&e.addEventListener("click",()=>this.showBudgetForm()),a&&a.addEventListener("click",()=>this.showExpenseForm()),t&&t.addEventListener("input",()=>this.loadExpensesList()),s&&s.addEventListener("input",()=>this.loadExpensesList()),n&&n.addEventListener("change",()=>this.loadExpensesList()),i&&i.addEventListener("change",()=>this.loadExpensesList()),d&&d.addEventListener("change",()=>this.loadExpensesList()),o&&o.addEventListener("change",()=>this.loadExpensesList()),r&&r.addEventListener("change",()=>this.loadExpensesList()),l&&l.addEventListener("change",()=>this.loadExpensesList())},loadDashboard(){this.updateDashboardStats(),this.loadExpensesList(),this.loadTopExpenses(),this.loadRecentTransactions(),this.renderCharts(),this.populateYearMonthFilters("all"),this.populateYearMonthFilters("expense")},updateDashboardStats(){const e=AppState.appData.safetyBudgets||[],a=AppState.appData.safetyBudgetTransactions||[],t=new Date().getFullYear(),s=e.find(f=>(f.year?parseInt(f.year):new Date(f.createdAt||f.startDate).getFullYear())===t&&(f.status==="\u0646\u0634\u0637"||f.status==="active"||!f.status))||e[e.length-1],n=s?.currency||this.defaultCurrency,i=s&&parseFloat(s.amount)||0,d=a.filter(f=>(f.currency||this.defaultCurrency)===n).reduce((f,v)=>f+(parseFloat(v.amount)||0),0),o=i-d,r=i>0?(d/i*100).toFixed(1):0,l=document.getElementById("total-budget"),c=document.getElementById("total-expenses"),u=document.getElementById("remaining-budget"),b=document.getElementById("consumption-percentage"),y=document.getElementById("consumption-bar"),m=document.getElementById("total-budget-currency"),g=document.getElementById("total-expenses-currency"),p=document.getElementById("remaining-budget-currency");if(l&&(l.textContent=this.formatCurrency(i,n)),c&&(c.textContent=this.formatCurrency(d,n)),m&&(m.textContent=this.currencies[n]?.name||"\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"),g&&(g.textContent=this.currencies[n]?.name||"\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"),p&&(p.textContent=this.currencies[n]?.name||"\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"),u&&(u.textContent=this.formatCurrency(o,n),u.className=o>=0?"text-2xl font-bold text-green-600":"text-2xl font-bold text-red-600"),b&&(b.textContent=r+"%",b.className=parseFloat(r)>90?"text-2xl font-bold text-red-600":parseFloat(r)>70?"text-2xl font-bold text-yellow-600":"text-2xl font-bold text-green-600"),y){const f=Math.min(100,Math.max(0,parseFloat(r)));y.style.width=f+"%",y.className=f>90?"bg-red-600 h-2 rounded-full transition-all duration-500":f>70?"bg-yellow-600 h-2 rounded-full transition-all duration-500":"bg-blue-600 h-2 rounded-full transition-all duration-500"}},loadExpensesList(){const e=document.getElementById("all-table-container")||document.getElementById("expenses-table-container");if(!e)return;const a=AppState.appData.safetyBudgetTransactions||[],t=(document.getElementById("all-search")?.value||document.getElementById("expense-search")?.value||"").toLowerCase(),s=document.getElementById("all-filter-category")?.value||document.getElementById("expense-filter-category")?.value||"",n=document.getElementById("all-filter-year")?.value||document.getElementById("expense-filter-year")?.value||"",i=document.getElementById("all-filter-month")?.value||document.getElementById("expense-filter-month")?.value||"";let d=a.filter(o=>{const r=!t||(o.description||"").toLowerCase().includes(t)||(o.vendor||"").toLowerCase().includes(t)||(o.invoiceNumber||"").toLowerCase().includes(t),l=!s||o.category===s,c=o.date?new Date(o.date):new Date(o.createdAt),u=!n||c.getFullYear().toString()===n,b=!i||(c.getMonth()+1).toString()===i;return r&&l&&u&&b});if(d.sort((o,r)=>{const l=new Date(o.date||o.createdAt);return new Date(r.date||r.createdAt)-l}),d.length===0){e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-receipt text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>
                </div>
            `;return}e.innerHTML=`
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th>\u0627\u0644\u0641\u0626\u0629</th>
                            <th>\u0627\u0644\u0648\u0635\u0641</th>
                            <th>\u0627\u0644\u062C\u0647\u0629</th>
                            <th>\u0627\u0644\u0645\u0628\u0644\u063A</th>
                            <th>\u0627\u0644\u0639\u0645\u0644\u0629</th>
                            <th>\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</th>
                            <th>\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${d.map(o=>`
                            <tr>
                                <td>${Utils.formatDate(o.date||o.createdAt)}</td>
                                <td><span class="badge badge-info">${Utils.escapeHTML(o.category||"")}</span></td>
                                <td>${Utils.escapeHTML(o.description||"")}</td>
                                <td>${Utils.escapeHTML(o.vendor||"")}</td>
                                <td class="font-semibold">${this.formatCurrency(parseFloat(o.amount)||0,o.currency||this.defaultCurrency)}</td>
                                <td><span class="badge badge-secondary">${this.currencies[o.currency||this.defaultCurrency]?.symbol||"\u062C.\u0645"}</span></td>
                                <td>${Utils.escapeHTML(o.invoiceNumber||"-")}</td>
                                <td>
                                    ${(o.attachments||[]).length>0?`<span class="badge badge-success">${(o.attachments||[]).length} \u0645\u0631\u0641\u0642</span>`:'<span class="text-gray-400">-</span>'}
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button class="btn-icon btn-icon-primary" onclick="SafetyBudget.viewExpense('${o.id}')" title="\u0639\u0631\u0636">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        ${Permissions.hasAccess("safety-budget")?`
                                            <button class="btn-icon btn-icon-warning" onclick="SafetyBudget.editExpense('${o.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn-icon btn-icon-danger" onclick="SafetyBudget.deleteExpense('${o.id}')" title="\u062D\u0630\u0641">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        `:""}
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},loadTopExpenses(){const e=document.getElementById("top-expenses-list");if(!e)return;const t=[...AppState.appData.safetyBudgetTransactions||[]].sort((s,n)=>(parseFloat(n.amount)||0)-(parseFloat(s.amount)||0)).slice(0,5);if(t.length===0){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>';return}e.innerHTML=t.map((s,n)=>`
            <div class="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        ${n+1}
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-800">${Utils.escapeHTML(s.description||"")}</p>
                        <p class="text-xs text-gray-500">${Utils.escapeHTML(s.category||"")} - ${Utils.formatDate(s.date||s.createdAt)}</p>
                    </div>
                </div>
                <div class="text-left">
                    <p class="text-sm font-bold text-red-600">${this.formatCurrency(parseFloat(s.amount)||0,s.currency||this.defaultCurrency)}</p>
                </div>
            </div>
        `).join("")},loadRecentTransactions(){const e=document.getElementById("recent-transactions-list");if(!e)return;const t=[...AppState.appData.safetyBudgetTransactions||[]].sort((s,n)=>{const i=new Date(s.date||s.createdAt);return new Date(n.date||n.createdAt)-i}).slice(0,5);if(t.length===0){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>';return}e.innerHTML=t.map(s=>`
            <div class="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                <div>
                    <p class="text-sm font-semibold text-gray-800">${Utils.escapeHTML(s.description||"")}</p>
                    <p class="text-xs text-gray-500">${Utils.formatDate(s.date||s.createdAt)}</p>
                </div>
                <div class="text-left">
                    <p class="text-sm font-bold text-blue-600">${this.formatCurrency(parseFloat(s.amount)||0,s.currency||this.defaultCurrency)}</p>
                    <span class="badge badge-info text-xs">${Utils.escapeHTML(s.category||"")}</span>
                </div>
            </div>
        `).join("")},renderCharts(){this.renderCategoryChart(),this.renderMonthlyChart()},renderCategoryChart(){const e=document.getElementById("expenses-by-category-chart");if(!e)return;const a=AppState.appData.safetyBudgetTransactions||[],t=this.expenseCategories,s={};t.forEach(i=>{s[i]=a.filter(d=>d.category===i).reduce((d,o)=>d+(parseFloat(o.amount)||0),0)});const n=Object.values(s).reduce((i,d)=>i+d,0);if(n===0){e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p></div>';return}e.innerHTML=t.map(i=>{const d=s[i]||0,o=n>0?(d/n*100).toFixed(1):0;return`
                <div class="mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold">${i}</span>
                        <span class="text-sm font-bold">${this.formatCurrency(d)} (${o}%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-blue-600 h-3 rounded-full transition-all duration-500" style="width: ${o}%"></div>
                    </div>
                </div>
            `}).join("")},renderMonthlyChart(){const e=document.getElementById("monthly-expenses-chart");if(!e)return;const a=AppState.appData.safetyBudgetTransactions||[],t={},s=new Date().getFullYear();a.forEach(d=>{const o=d.date?new Date(d.date):new Date(d.createdAt);if(o.getFullYear()===s){const r=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`;t[r]=(t[r]||0)+(parseFloat(d.amount)||0)}});const n=[];for(let d=1;d<=12;d++){const o=`${s}-${String(d).padStart(2,"0")}`;n.push({key:o,name:new Date(s,d-1).toLocaleDateString("ar-SA",{month:"long"}),amount:t[o]||0})}const i=Math.max(...n.map(d=>d.amount),1);e.innerHTML=`
            <div class="flex items-end gap-2" style="height: 100%;">
                ${n.map(d=>`
                        <div class="flex-1 flex flex-col items-center gap-2">
                            <div class="w-full bg-gray-200 rounded-t relative" style="height: 200px;">
                                <div class="bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600 absolute bottom-0 w-full" 
                                     style="height: ${i>0?d.amount/i*100:0}%;" 
                                     title="${d.name}: ${this.formatCurrency(d.amount)}">
                                </div>
                            </div>
                            <span class="text-xs text-gray-600" style="writing-mode: vertical-rl; text-orientation: mixed;">${d.name.substring(0,3)}</span>
                            <span class="text-xs font-semibold text-gray-700">${d.amount.toLocaleString("ar-SA",{minimumFractionDigits:0,maximumFractionDigits:0})}</span>
                        </div>
                    `).join("")}
            </div>
        `},populateYearMonthFilters(e="expense"){const a=AppState.appData.safetyBudgetTransactions||[],t=new Set;a.forEach(i=>{const d=i.date?new Date(i.date):new Date(i.createdAt);t.add(d.getFullYear())});const s=document.getElementById(`${e}-filter-year`),n=document.getElementById(`${e}-filter-month`);if(s){const i=Array.from(t).sort((d,o)=>o-d);s.innerHTML='<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u0646\u0648\u0627\u062A</option>'+i.map(d=>`<option value="${d}">${d}</option>`).join("")}if(n){const i=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];n.innerHTML='<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0634\u0647\u0631</option>'+i.map((d,o)=>`<option value="${o+1}">${d}</option>`).join("")}},showBudgetForm(e=null){const a=!!e,t=e?.currency||this.defaultCurrency,s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px 8px 0 0;">
                    <h2 class="modal-title" style="color: white;">
                        <i class="fas fa-wallet ml-2"></i>
                        ${a?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u062C\u062F\u064A\u062F\u0629"}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="budget-form" class="modal-body" style="padding: 24px;">
                    <div class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-calendar-alt ml-2 text-blue-600"></i>
                                    \u0627\u0644\u0633\u0646\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 *
                                </label>
                                <input type="number" id="budget-year" class="form-input" 
                                       value="${e?e.year||new Date(e.createdAt).getFullYear():new Date().getFullYear()}" 
                                       min="2020" max="2100" required
                                       style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-coins ml-2 text-green-600"></i>
                                    \u0627\u0644\u0639\u0645\u0644\u0629 *
                                </label>
                                <select id="budget-currency" class="form-input" required
                                        style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                                    <option value="EGP" ${t==="EGP"?"selected":""}>\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A (\u062C.\u0645)</option>
                                    <option value="USD" ${t==="USD"?"selected":""}>\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A ($)</option>
                                </select>
                            </div>
                        </div>
                        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-200">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-money-bill-wave ml-2 text-blue-600"></i>
                                \u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0639\u062A\u0645\u062F *
                            </label>
                            <div class="flex items-center gap-2">
                                <input type="number" id="budget-amount" class="form-input flex-1" 
                                       value="${e?parseFloat(e.amount)||0:""}" 
                                       step="0.01" min="0" required
                                       placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0645\u0628\u0644\u063A"
                                       style="border: 2px solid #3b82f6; border-radius: 8px; padding: 12px; font-size: 18px; font-weight: bold;">
                                <span id="budget-currency-display" class="text-lg font-bold text-blue-600 px-3 py-2 bg-white rounded-lg border-2 border-blue-200">
                                    ${this.getCurrencySymbol(t)}
                                </span>
                            </div>
                            <p class="text-xs text-gray-500 mt-2">
                                <i class="fas fa-info-circle ml-1"></i>
                                \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u0629 \u0643\u0639\u0645\u0644\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-file-alt ml-2 text-purple-600"></i>
                                \u0627\u0644\u0648\u0635\u0641 / \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </label>
                            <textarea id="budget-description" class="form-input" rows="3" 
                                      placeholder="\u0623\u062F\u062E\u0644 \u0648\u0635\u0641\u0627\u064B \u0623\u0648 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0648\u0644 \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629..."
                                      style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px; resize: vertical;">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-toggle-on ml-2 text-orange-600"></i>
                                    \u0627\u0644\u062D\u0627\u0644\u0629
                                </label>
                                <select id="budget-status" class="form-input"
                                        style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                                    <option value="\u0646\u0634\u0637" ${e?.status==="\u0646\u0634\u0637"||!e?"selected":""}>\u0646\u0634\u0637</option>
                                    <option value="\u0645\u063A\u0644\u0642" ${e?.status==="\u0645\u063A\u0644\u0642"?"selected":""}>\u0645\u063A\u0644\u0642</option>
                                </select>
                            </div>
                            <div class="flex items-end">
                                <div class="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <p class="text-xs text-gray-500 mb-1">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</p>
                                    <p class="text-sm font-semibold text-gray-700">
                                        ${e?Utils.formatDate(e.createdAt):Utils.formatDate(new Date().toISOString())}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-end gap-4 pt-6 border-t mt-6">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 10px 20px;">
                            <i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621
                        </button>
                        <button type="submit" class="btn-primary" style="padding: 10px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            <i class="fas fa-save ml-2"></i>
                            ${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062D\u0641\u0638 \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629"}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",o=>{o.target===s&&s.remove()});const n=s.querySelector("#budget-currency"),i=s.querySelector("#budget-currency-display");n&&i&&n.addEventListener("change",o=>{const r=o.target.value;i.textContent=this.getCurrencySymbol(r)});const d=document.getElementById("budget-form");d&&d.addEventListener("submit",o=>{o.preventDefault(),this.handleBudgetSubmit(e?.id,s)})},async handleBudgetSubmit(e,a){const t=document.getElementById("budget-year"),s=document.getElementById("budget-amount"),n=document.getElementById("budget-currency"),i=document.getElementById("budget-description"),d=document.getElementById("budget-status");if(!t||!s||!d){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const o={id:e||Utils.generateId("BUDGET"),year:parseInt(t.value),amount:parseFloat(s.value),currency:n?.value||this.defaultCurrency,description:i?.value.trim()||"",status:d.value,createdAt:e?AppState.appData.safetyBudgets.find(r=>r.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(!o.year||!o.amount||o.amount<=0){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D");return}Loading.show();try{if(e){const r=AppState.appData.safetyBudgets.findIndex(l=>l.id===e);r!==-1&&(AppState.appData.safetyBudgets[r]=o,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.safetyBudgets.push(o),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("SafetyBudgets",AppState.appData.safetyBudgets),AuditLog.log(e?"update_budget":"create_budget","SafetyBudget",o.id,{year:o.year,amount:o.amount}),Loading.hide(),a.remove(),this.loadDashboard()}catch(r){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+r.message)}},showExpenseForm(e=null){const a=!!e,t=e?.currency||this.defaultCurrency,s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 8px 8px 0 0;">
                    <h2 class="modal-title" style="color: white;">
                        <i class="fas fa-receipt ml-2"></i>
                        ${a?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0635\u0631\u0648\u0641":"\u062A\u0633\u062C\u064A\u0644 \u0645\u0635\u0631\u0648\u0641 \u062C\u062F\u064A\u062F"}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="expense-form" class="modal-body" style="padding: 24px;">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar-alt ml-2 text-blue-600"></i>
                                \u0627\u0644\u062A\u0627\u0631\u064A\u062E *
                            </label>
                            <input type="date" id="expense-date" class="form-input" 
                                   value="${e?e.date?new Date(e.date).toISOString().split("T")[0]:"":new Date().toISOString().split("T")[0]}" 
                                   required
                                   style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-tags ml-2 text-purple-600"></i>
                                \u0646\u0648\u0639 \u0627\u0644\u0645\u0635\u0631\u0648\u0641 (\u0627\u0644\u0641\u0626\u0629) *
                            </label>
                            <select id="expense-category" class="form-input" required
                                    style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0626\u0629</option>
                                <option value="\u0645\u0639\u062F\u0627\u062A" ${e?.category==="\u0645\u0639\u062F\u0627\u062A"?"selected":""}>\u0645\u0639\u062F\u0627\u062A</option>
                                <option value="\u062A\u062F\u0631\u064A\u0628" ${e?.category==="\u062A\u062F\u0631\u064A\u0628"?"selected":""}>\u062A\u062F\u0631\u064A\u0628</option>
                                <option value="\u0635\u064A\u0627\u0646\u0629" ${e?.category==="\u0635\u064A\u0627\u0646\u0629"?"selected":""}>\u0635\u064A\u0627\u0646\u0629</option>
                                <option value="\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629" ${e?.category==="\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629"?"selected":""}>\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629</option>
                                <option value="\u0637\u0648\u0627\u0631\u0626" ${e?.category==="\u0637\u0648\u0627\u0631\u0626"?"selected":""}>\u0637\u0648\u0627\u0631\u0626</option>
                                <option value="OPEX" ${e?.category==="OPEX"?"selected":""}>OPEX (\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u062A\u0634\u063A\u064A\u0644\u064A\u0629)</option>
                                <option value="CAPEX" ${e?.category==="CAPEX"?"selected":""}>CAPEX (\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0631\u0623\u0633\u0645\u0627\u0644\u064A\u0629)</option>
                                <option value="\u0623\u062E\u0631\u0649" ${e?.category==="\u0623\u062E\u0631\u0649"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-align-right ml-2 text-green-600"></i>
                                \u0627\u0644\u0648\u0635\u0641 *
                            </label>
                            <input type="text" id="expense-description" class="form-input" 
                                   value="${Utils.escapeHTML(e?.description||"")}" 
                                   required
                                   placeholder="\u0623\u062F\u062E\u0644 \u0648\u0635\u0641\u0627\u064B \u062A\u0641\u0635\u064A\u0644\u064A\u0627\u064B \u0644\u0644\u0645\u0635\u0631\u0648\u0641..."
                                   style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-building ml-2 text-orange-600"></i>
                                \u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0645\u0648\u0631\u062F *
                            </label>
                            <input type="text" id="expense-vendor" class="form-input" 
                                   value="${Utils.escapeHTML(e?.vendor||"")}" 
                                   required
                                   placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0631\u062F \u0623\u0648 \u0627\u0644\u062C\u0647\u0629"
                                   style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-coins ml-2 text-yellow-600"></i>
                                \u0627\u0644\u0639\u0645\u0644\u0629 *
                            </label>
                            <select id="expense-currency" class="form-input" required
                                    style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                                <option value="EGP" ${t==="EGP"?"selected":""}>\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A (\u062C.\u0645)</option>
                                <option value="USD" ${t==="USD"?"selected":""}>\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A ($)</option>
                            </select>
                        </div>
                        <div class="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border-2 border-red-200">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-money-bill-wave ml-2 text-red-600"></i>
                                \u0627\u0644\u0642\u064A\u0645\u0629 *
                            </label>
                            <div class="flex items-center gap-2">
                                <input type="number" id="expense-amount" class="form-input flex-1" 
                                       value="${e?parseFloat(e.amount)||0:""}" 
                                       step="0.01" min="0" required
                                       placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0645\u0628\u0644\u063A"
                                       style="border: 2px solid #ef4444; border-radius: 8px; padding: 12px; font-size: 18px; font-weight: bold;">
                                <span id="expense-currency-display" class="text-lg font-bold text-red-600 px-3 py-2 bg-white rounded-lg border-2 border-red-200">
                                    ${this.getCurrencySymbol(t)}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-file-invoice ml-2"></i>
                                \u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629
                            </label>
                            <input type="text" id="expense-invoice" class="form-input" 
                                   value="${Utils.escapeHTML(e?.invoiceNumber||"")}">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-paperclip ml-2"></i>
                                \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (PDF / \u0635\u0648\u0631\u0629)
                            </label>
                            <input type="file" id="expense-attachments" class="form-input" 
                                   accept=".pdf,.jpg,.jpeg,.png" multiple>
                            <p class="text-xs text-gray-500 mt-1">\u064A\u0645\u0643\u0646 \u0631\u0641\u0639 \u0639\u062F\u0629 \u0645\u0644\u0641\u0627\u062A (PDF \u0623\u0648 \u0635\u0648\u0631)</p>
                            <div id="expense-attachments-list" class="mt-3 space-y-2"></div>
                            ${e&&e.attachments&&e.attachments.length>0?`
                                <div class="mt-3">
                                    <p class="text-sm font-semibold mb-2">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629:</p>
                                    ${e.attachments.map((r,l)=>`
                                        <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2 mb-2">
                                            <div class="flex items-center gap-2">
                                                <i class="fas fa-paperclip text-blue-500"></i>
                                                <span class="text-sm">${Utils.escapeHTML(r.name||"\u0645\u0631\u0641\u0642")}</span>
                                            </div>
                                            <button type="button" class="btn-icon btn-icon-danger" onclick="this.closest('div').remove()">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                        </div>
                    </div>
                    <div class="flex items-center justify-end gap-4 pt-4 border-t mt-6">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            ${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0635\u0631\u0648\u0641"}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",r=>{r.target===s&&s.remove()});const n=s.querySelector("#expense-currency"),i=s.querySelector("#expense-currency-display");n&&i&&n.addEventListener("change",r=>{const l=r.target.value;i.textContent=this.getCurrencySymbol(l)});const d=document.getElementById("expense-attachments");d&&d.addEventListener("change",r=>{this.handleAttachmentsChange(r.target.files,s)});const o=document.getElementById("expense-form");o&&o.addEventListener("submit",r=>{r.preventDefault(),this.handleExpenseSubmit(e?.id,s)}),this.currentAttachments=e?.attachments?[...e.attachments]:[]},async handleAttachmentsChange(e,a){if(!e||e.length===0)return;const t=Array.from(e),s=[];for(const n of t){if(n.size>5242880){Notification.error(`\u0627\u0644\u0645\u0644\u0641 ${n.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 (5MB)`);continue}s.push(n)}if(s.length!==0){Loading.show("\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A...");try{for(const i of s){const d=await this.readFileAsBase64(i),o={id:Utils.generateId("ATT"),name:i.name,type:i.type,data:d,size:Math.round(i.size/1024)};this.currentAttachments||(this.currentAttachments=[]),this.currentAttachments.push(o)}this.renderAttachmentsList(a);const n=document.getElementById("expense-attachments");n&&(n.value="")}catch(n){Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+n.message)}finally{Loading.hide()}}},async readFileAsBase64(e){return new Promise((a,t)=>{const s=new FileReader;s.onload=()=>a(s.result),s.onerror=n=>t(n),s.readAsDataURL(e)})},renderAttachmentsList(e){const a=e.querySelector("#expense-attachments-list");if(a){if(!this.currentAttachments||this.currentAttachments.length===0){a.innerHTML="";return}a.innerHTML=this.currentAttachments.map((t,s)=>`
            <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2" data-attachment-index="${s}">
                <div class="flex items-center gap-2">
                    <i class="fas fa-paperclip text-blue-500"></i>
                    <div>
                        <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(t.name||"attachment")}</div>
                        <div class="text-xs text-gray-500">${t.size||0} KB</div>
                    </div>
                </div>
                <button type="button" class="btn-icon btn-icon-danger" onclick="SafetyBudget.removeAttachment(${s}, this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join("")}},removeAttachment(e,a){this.currentAttachments&&this.currentAttachments[e]&&(this.currentAttachments.splice(e,1),a.closest(".modal-overlay")?.querySelector("#expense-attachments-list")&&this.renderAttachmentsList(a.closest(".modal-overlay")))},async handleExpenseSubmit(e,a){const t=document.getElementById("expense-date"),s=document.getElementById("expense-category"),n=document.getElementById("expense-description"),i=document.getElementById("expense-vendor"),d=document.getElementById("expense-currency"),o=document.getElementById("expense-amount"),r=document.getElementById("expense-invoice");if(!t||!s||!n||!i||!o){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const l={id:e||Utils.generateId("EXPENSE"),date:new Date(t.value).toISOString(),category:s.value,description:n.value.trim(),vendor:i.value.trim(),currency:d?.value||this.defaultCurrency,amount:parseFloat(o.value),invoiceNumber:r?.value.trim()||"",attachments:this.currentAttachments||[],createdAt:e?AppState.appData.safetyBudgetTransactions.find(c=>c.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(!l.date||!l.category||!l.description||!l.vendor||!l.amount||l.amount<=0){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D");return}Loading.show();try{if(e){const c=AppState.appData.safetyBudgetTransactions.findIndex(u=>u.id===e);c!==-1&&(AppState.appData.safetyBudgetTransactions[c]=l,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0635\u0631\u0648\u0641 \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.safetyBudgetTransactions.push(l),Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0635\u0631\u0648\u0641 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("SafetyBudgetTransactions",AppState.appData.safetyBudgetTransactions),AuditLog.log(e?"update_expense":"create_expense","SafetyBudget",l.id,{category:l.category,amount:l.amount}),Loading.hide(),a.remove(),this.loadDashboard()}catch(c){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+c.message)}},editExpense(e){const a=AppState.appData.safetyBudgetTransactions.find(t=>t.id===e);a&&this.showExpenseForm(a)},async deleteExpense(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u061F")){Loading.show();try{AppState.appData.safetyBudgetTransactions=AppState.appData.safetyBudgetTransactions.filter(a=>a.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("SafetyBudgetTransactions",AppState.appData.safetyBudgetTransactions),AuditLog.log("delete_expense","SafetyBudget",e),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0635\u0631\u0648\u0641 \u0628\u0646\u062C\u0627\u062D"),this.loadDashboard()}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+a.message)}}},viewExpense(e){const a=AppState.appData.safetyBudgetTransactions.find(s=>s.id===e);if(!a)return;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-receipt ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0635\u0631\u0648\u0641
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</p>
                                <p class="text-base font-semibold">${Utils.formatDate(a.date||a.createdAt)}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">\u0627\u0644\u0641\u0626\u0629</p>
                                <p class="text-base font-semibold"><span class="badge badge-info">${Utils.escapeHTML(a.category||"")}</span></p>
                            </div>
                            <div class="col-span-2">
                                <p class="text-sm text-gray-600">\u0627\u0644\u0648\u0635\u0641</p>
                                <p class="text-base font-semibold">${Utils.escapeHTML(a.description||"")}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">\u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0645\u0648\u0631\u062F</p>
                                <p class="text-base font-semibold">${Utils.escapeHTML(a.vendor||"")}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">\u0627\u0644\u0645\u0628\u0644\u063A</p>
                                <p class="text-2xl font-bold text-red-600">${this.formatCurrency(parseFloat(a.amount)||0,a.currency||this.defaultCurrency)}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">\u0627\u0644\u0639\u0645\u0644\u0629</p>
                                <p class="text-base font-semibold"><span class="badge badge-info">${this.currencies[a.currency||this.defaultCurrency]?.name||"\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"}</span></p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</p>
                                <p class="text-base font-semibold">${Utils.escapeHTML(a.invoiceNumber||"-")}</p>
                            </div>
                        </div>
                        ${a.attachments&&a.attachments.length>0?`
                            <div class="border-t pt-4">
                                <p class="text-sm font-semibold mb-3">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (${a.attachments.length})</p>
                                <div class="space-y-2">
                                    ${a.attachments.map(s=>`
                                        <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2">
                                            <div class="flex items-center gap-2">
                                                <i class="fas fa-paperclip text-blue-500"></i>
                                                <span class="text-sm">${Utils.escapeHTML(s.name||"\u0645\u0631\u0641\u0642")}</span>
                                                <span class="text-xs text-gray-500">(${s.size||0} KB)</span>
                                            </div>
                                            <button class="btn-icon btn-icon-primary" onclick="SafetyBudget.downloadAttachment('${s.id}', '${a.id}')" title="\u062A\u062D\u0645\u064A\u0644">
                                                <i class="fas fa-download"></i>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    ${Permissions.hasAccess("safety-budget")?`
                        <button class="btn-primary" onclick="SafetyBudget.editExpense('${a.id}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                        </button>
                    `:""}
                </div>
            </div>
        `,document.body.appendChild(t),t.addEventListener("click",s=>{s.target===t&&t.remove()})},downloadAttachment(e,a){const t=AppState.appData.safetyBudgetTransactions.find(i=>i.id===a);if(!t||!t.attachments)return;const s=t.attachments.find(i=>i.id===e);if(!s||!s.data)return;const n=document.createElement("a");n.href=s.data,n.download=s.name||"attachment",n.click()},async exportReport(e="pdf",a=null){if(typeof AppState>"u"||!AppState.appData){Notification.error("\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629");return}const t=AppState.appData.safetyBudgets||[];let s=AppState.appData.safetyBudgetTransactions||[];if(!Array.isArray(t)){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0627\u062A \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");return}if(!Array.isArray(s)){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");return}a&&(a==="OPEX"||a==="CAPEX")&&(s=s.filter(p=>p.category===a));const n=new Date().getFullYear(),i=t.find(p=>(p.year?parseInt(p.year):new Date(p.createdAt||p.startDate).getFullYear())===n&&(p.status==="\u0646\u0634\u0637"||p.status==="active"||!p.status))||t[t.length-1],d=i?.currency||this.defaultCurrency,o=i&&parseFloat(i.amount)||0,r=s.filter(p=>(p.currency||this.defaultCurrency)===d).reduce((p,f)=>p+(parseFloat(f.amount)||0),0),l=o-r;if(e==="excel"){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const p=XLSX.utils.book_new(),f=[["\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0641\u0626\u0629","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u062C\u0647\u0629","\u0627\u0644\u0645\u0628\u0644\u063A","\u0627\u0644\u0639\u0645\u0644\u0629","\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629"]];s.forEach(h=>{f.push([Utils.formatDate(h.date||h.createdAt),h.category||"",h.description||"",h.vendor||"",parseFloat(h.amount)||0,h.currency||this.defaultCurrency,h.invoiceNumber||""])});const v=XLSX.utils.aoa_to_sheet(f);XLSX.utils.book_append_sheet(p,v,"\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629"),XLSX.writeFile(p,`\u062A\u0642\u0631\u064A\u0631_\u0645\u064A\u0632\u0627\u0646\u064A\u0629_\u0627\u0644\u0633\u0644\u0627\u0645\u0629_${n}.xlsx`),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0628\u0646\u062C\u0627\u062D");return}const c=`
            <div style="direction: rtl; text-align: right; font-family: 'Cairo', Arial, sans-serif; padding: 20px;">
                <h1 style="color: #1e40af; margin-bottom: 20px;">\u062A\u0642\u0631\u064A\u0631 \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u062A\u062A\u0628\u0639 \u0627\u0644\u0625\u0646\u0641\u0627\u0642</h1>
                <div style="margin-bottom: 30px;">
                    <p><strong>\u0627\u0644\u0633\u0646\u0629:</strong> ${n}</p>
                    <p><strong>\u0627\u0644\u0639\u0645\u0644\u0629:</strong> ${this.currencies[d]?.name||"\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"}</p>
                    <p><strong>\u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:</strong> ${this.formatCurrency(o,d)}</p>
                    <p><strong>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A:</strong> ${this.formatCurrency(r,d)}</p>
                    <p><strong>\u0627\u0644\u0645\u062A\u0628\u0642\u064A:</strong> ${this.formatCurrency(l,d)}</p>
                    <p><strong>\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643:</strong> ${o>0?(r/o*100).toFixed(1):0}%</p>
                </div>
                <h2 style="color: #1e40af; margin-top: 30px; margin-bottom: 15px;">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr style="background: #f3f4f6;">
                            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">\u0627\u0644\u0641\u0626\u0629</th>
                            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">\u0627\u0644\u0648\u0635\u0641</th>
                            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">\u0627\u0644\u062C\u0647\u0629</th>
                            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">\u0627\u0644\u0645\u0628\u0644\u063A</th>
                            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">\u0627\u0644\u0639\u0645\u0644\u0629</th>
                            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${s.map(p=>`
                            <tr>
                                <td style="border: 1px solid #e5e7eb; padding: 8px;">${Utils.formatDate(p.date||p.createdAt)}</td>
                                <td style="border: 1px solid #e5e7eb; padding: 8px;">${Utils.escapeHTML(p.category||"")}</td>
                                <td style="border: 1px solid #e5e7eb; padding: 8px;">${Utils.escapeHTML(p.description||"")}</td>
                                <td style="border: 1px solid #e5e7eb; padding: 8px;">${Utils.escapeHTML(p.vendor||"")}</td>
                                <td style="border: 1px solid #e5e7eb; padding: 8px;">${this.formatCurrency(parseFloat(p.amount)||0,p.currency||this.defaultCurrency)}</td>
                                <td style="border: 1px solid #e5e7eb; padding: 8px;">${this.currencies[p.currency||this.defaultCurrency]?.name||"\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"}</td>
                                <td style="border: 1px solid #e5e7eb; padding: 8px;">${Utils.escapeHTML(p.invoiceNumber||"-")}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621: ${new Date().toLocaleDateString("ar-SA")}</p>
            </div>
        `,u=`BUDGET-REPORT-${n}`,b=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(u,"\u062A\u0642\u0631\u064A\u0631 \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u062A\u062A\u0628\u0639 \u0627\u0644\u0625\u0646\u0641\u0627\u0642",c,!1,!0,{version:"1.0"},new Date().toISOString(),new Date().toISOString()):`<html><body>${c}</body></html>`,y=new Blob([b],{type:"text/html;charset=utf-8"}),m=URL.createObjectURL(y),g=window.open(m,"_blank");g?g.onload=()=>{setTimeout(()=>{g.print(),setTimeout(()=>{URL.revokeObjectURL(m)},1e3)},500)}:Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")},async loadOPEX(){const e=document.getElementById("safety-budget-opex-section");if(!e){Utils.safeError("\u0642\u0633\u0645 safety-budget-opex-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}let a="";try{a=await this.renderExpensesList("OPEX")}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 OPEX:",t),a=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <button onclick="SafetyBudget.showOPEXTab()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `}e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-chart-line ml-3" aria-hidden="true"></i>
                            OPEX - \u0645\u0635\u0631\u0648\u0641\u0627\u062A \u062A\u0634\u063A\u064A\u0644\u064A\u0629
                        </h1>
                        <p class="section-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <button id="export-opex-pdf-btn" class="btn-secondary" onclick="SafetyBudget.exportReport('pdf', 'OPEX')">
                            <i class="fas fa-file-pdf ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                        <button id="add-opex-expense-btn" class="btn-primary" onclick="SafetyBudget.showExpenseForm(null, 'OPEX')">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0645\u0635\u0631\u0648\u0641 OPEX
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                ${a}
            </div>
        `,this.setupOPEXEventListeners(),this.loadOPEXList()},async renderExpensesList(e){const a=e==="all"?"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A":e,t=e==="all"?"all":e.toLowerCase();return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-table ml-2"></i>
                            \u0642\u0627\u0626\u0645\u0629 \u0645\u0635\u0631\u0648\u0641\u0627\u062A ${a}
                        </h2>
                        <div class="flex items-center gap-4">
                            <input type="text" id="${t}-search" class="form-input" style="max-width: 300px;" placeholder="\u0627\u0644\u0628\u062D\u062B...">
                            ${e==="all"?`
                                <select id="${t}-filter-category" class="form-input" style="max-width: 200px;">
                                    <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0626\u0627\u062A</option>
                                    <option value="\u0645\u0639\u062F\u0627\u062A">\u0645\u0639\u062F\u0627\u062A</option>
                                    <option value="\u062A\u062F\u0631\u064A\u0628">\u062A\u062F\u0631\u064A\u0628</option>
                                    <option value="\u0635\u064A\u0627\u0646\u0629">\u0635\u064A\u0627\u0646\u0629</option>
                                    <option value="\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629">\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629</option>
                                    <option value="\u0637\u0648\u0627\u0631\u0626">\u0637\u0648\u0627\u0631\u0626</option>
                                    <option value="OPEX">OPEX</option>
                                    <option value="CAPEX">CAPEX</option>
                                    <option value="\u0623\u062E\u0631\u0649">\u0623\u062E\u0631\u0649</option>
                                </select>
                            `:""}
                            <select id="${t}-filter-year" class="form-input" style="max-width: 150px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u0646\u0648\u0627\u062A</option>
                            </select>
                            <select id="${t}-filter-month" class="form-input" style="max-width: 150px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0634\u0647\u0631</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="${t}-table-container">
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
        `},setupOPEXEventListeners(){const e=document.getElementById("opex-search"),a=document.getElementById("opex-filter-year"),t=document.getElementById("opex-filter-month");e&&e.addEventListener("input",()=>this.loadOPEXList()),a&&a.addEventListener("change",()=>this.loadOPEXList()),t&&t.addEventListener("change",()=>this.loadOPEXList())},loadOPEXList(){const e=document.getElementById("opex-table-container");if(!e)return;const a=(AppState.appData.safetyBudgetTransactions||[]).filter(r=>r.category==="OPEX"),t=(document.getElementById("opex-search")?.value||"").toLowerCase(),s=document.getElementById("opex-filter-year")?.value||"",n=document.getElementById("opex-filter-month")?.value||"";let i=a.filter(r=>{const l=!t||(r.description||"").toLowerCase().includes(t)||(r.vendor||"").toLowerCase().includes(t)||(r.invoiceNumber||"").toLowerCase().includes(t),c=r.date?new Date(r.date):new Date(r.createdAt),u=!s||c.getFullYear().toString()===s,b=!n||(c.getMonth()+1).toString()===n;return l&&u&&b});if(i.sort((r,l)=>{const c=new Date(r.date||r.createdAt);return new Date(l.date||l.createdAt)-c}),i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-chart-line text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0635\u0631\u0648\u0641\u0627\u062A OPEX \u0645\u0633\u062C\u0644\u0629</p>
                    <button class="btn-primary mt-4" onclick="SafetyBudget.showExpenseForm(null, 'OPEX')">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0645\u0635\u0631\u0648\u0641 OPEX \u062C\u062F\u064A\u062F
                    </button>
                </div>
            `;return}const d=i.reduce((r,l)=>r+(parseFloat(l.amount)||0),0),o={};i.forEach(r=>{const l=r.currency||this.defaultCurrency;o[l]=(o[l]||0)+(parseFloat(r.amount)||0)}),e.innerHTML=`
            <div class="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">\u0625\u062C\u0645\u0627\u0644\u064A \u0645\u0635\u0631\u0648\u0641\u0627\u062A OPEX</p>
                        <div class="flex items-center gap-4 mt-2">
                            ${Object.entries(o).map(([r,l])=>`
                                <div>
                                    <p class="text-2xl font-bold text-blue-600">${this.formatCurrency(l,r)}</p>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                    <div class="text-sm text-gray-600">
                        <p>\u0639\u062F\u062F \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A: <strong>${i.length}</strong></p>
                    </div>
                </div>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th>\u0627\u0644\u0648\u0635\u0641</th>
                            <th>\u0627\u0644\u062C\u0647\u0629</th>
                            <th>\u0627\u0644\u0645\u0628\u0644\u063A</th>
                            <th>\u0627\u0644\u0639\u0645\u0644\u0629</th>
                            <th>\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</th>
                            <th>\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i.map(r=>`
                            <tr>
                                <td>${Utils.formatDate(r.date||r.createdAt)}</td>
                                <td>${Utils.escapeHTML(r.description||"")}</td>
                                <td>${Utils.escapeHTML(r.vendor||"")}</td>
                                <td class="font-semibold">${this.formatCurrency(parseFloat(r.amount)||0,r.currency||this.defaultCurrency)}</td>
                                <td><span class="badge badge-secondary">${this.currencies[r.currency||this.defaultCurrency]?.symbol||"\u062C.\u0645"}</span></td>
                                <td>${Utils.escapeHTML(r.invoiceNumber||"-")}</td>
                                <td>
                                    ${(r.attachments||[]).length>0?`<span class="badge badge-success">${(r.attachments||[]).length} \u0645\u0631\u0641\u0642</span>`:'<span class="text-gray-400">-</span>'}
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button class="btn-icon btn-icon-primary" onclick="SafetyBudget.viewExpense('${r.id}')" title="\u0639\u0631\u0636">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        ${Permissions.hasAccess("safety-budget")?`
                                            <button class="btn-icon btn-icon-warning" onclick="SafetyBudget.editExpense('${r.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn-icon btn-icon-danger" onclick="SafetyBudget.deleteExpense('${r.id}')" title="\u062D\u0630\u0641">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        `:""}
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `,this.populateYearMonthFilters("opex")},async loadCAPEX(){const e=document.getElementById("safety-budget-capex-section");if(!e){Utils.safeError("\u0642\u0633\u0645 safety-budget-capex-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}let a="";try{a=await this.renderExpensesList("CAPEX")}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 CAPEX:",t),a=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <button onclick="SafetyBudget.showCAPEXTab()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `}e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-building ml-3" aria-hidden="true"></i>
                            CAPEX - \u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0631\u0623\u0633\u0645\u0627\u0644\u064A\u0629
                        </h1>
                        <p class="section-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0627\u0644\u0631\u0623\u0633\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <button id="export-capex-pdf-btn" class="btn-secondary" onclick="SafetyBudget.exportReport('pdf', 'CAPEX')">
                            <i class="fas fa-file-pdf ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                        <button id="add-capex-expense-btn" class="btn-primary" onclick="SafetyBudget.showExpenseForm(null, 'CAPEX')">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0645\u0635\u0631\u0648\u0641 CAPEX
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                ${a}
            </div>
        `,this.setupCAPEXEventListeners(),this.loadCAPEXList()},setupCAPEXEventListeners(){const e=document.getElementById("capex-search"),a=document.getElementById("capex-filter-year"),t=document.getElementById("capex-filter-month");e&&e.addEventListener("input",()=>this.loadCAPEXList()),a&&a.addEventListener("change",()=>this.loadCAPEXList()),t&&t.addEventListener("change",()=>this.loadCAPEXList())},loadCAPEXList(){const e=document.getElementById("capex-table-container");if(!e)return;const a=(AppState.appData.safetyBudgetTransactions||[]).filter(r=>r.category==="CAPEX"),t=(document.getElementById("capex-search")?.value||"").toLowerCase(),s=document.getElementById("capex-filter-year")?.value||"",n=document.getElementById("capex-filter-month")?.value||"";let i=a.filter(r=>{const l=!t||(r.description||"").toLowerCase().includes(t)||(r.vendor||"").toLowerCase().includes(t)||(r.invoiceNumber||"").toLowerCase().includes(t),c=r.date?new Date(r.date):new Date(r.createdAt),u=!s||c.getFullYear().toString()===s,b=!n||(c.getMonth()+1).toString()===n;return l&&u&&b});if(i.sort((r,l)=>{const c=new Date(r.date||r.createdAt);return new Date(l.date||l.createdAt)-c}),i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-building text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0635\u0631\u0648\u0641\u0627\u062A CAPEX \u0645\u0633\u062C\u0644\u0629</p>
                    <button class="btn-primary mt-4" onclick="SafetyBudget.showExpenseForm(null, 'CAPEX')">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0645\u0635\u0631\u0648\u0641 CAPEX \u062C\u062F\u064A\u062F
                    </button>
                </div>
            `;return}const d=i.reduce((r,l)=>r+(parseFloat(l.amount)||0),0),o={};i.forEach(r=>{const l=r.currency||this.defaultCurrency;o[l]=(o[l]||0)+(parseFloat(r.amount)||0)}),e.innerHTML=`
            <div class="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">\u0625\u062C\u0645\u0627\u0644\u064A \u0645\u0635\u0631\u0648\u0641\u0627\u062A CAPEX</p>
                        <div class="flex items-center gap-4 mt-2">
                            ${Object.entries(o).map(([r,l])=>`
                                <div>
                                    <p class="text-2xl font-bold text-purple-600">${this.formatCurrency(l,r)}</p>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                    <div class="text-sm text-gray-600">
                        <p>\u0639\u062F\u062F \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A: <strong>${i.length}</strong></p>
                    </div>
                </div>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th>\u0627\u0644\u0648\u0635\u0641</th>
                            <th>\u0627\u0644\u062C\u0647\u0629</th>
                            <th>\u0627\u0644\u0645\u0628\u0644\u063A</th>
                            <th>\u0627\u0644\u0639\u0645\u0644\u0629</th>
                            <th>\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</th>
                            <th>\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i.map(r=>`
                            <tr>
                                <td>${Utils.formatDate(r.date||r.createdAt)}</td>
                                <td>${Utils.escapeHTML(r.description||"")}</td>
                                <td>${Utils.escapeHTML(r.vendor||"")}</td>
                                <td class="font-semibold">${this.formatCurrency(parseFloat(r.amount)||0,r.currency||this.defaultCurrency)}</td>
                                <td><span class="badge badge-secondary">${this.currencies[r.currency||this.defaultCurrency]?.symbol||"\u062C.\u0645"}</span></td>
                                <td>${Utils.escapeHTML(r.invoiceNumber||"-")}</td>
                                <td>
                                    ${(r.attachments||[]).length>0?`<span class="badge badge-success">${(r.attachments||[]).length} \u0645\u0631\u0641\u0642</span>`:'<span class="text-gray-400">-</span>'}
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button class="btn-icon btn-icon-primary" onclick="SafetyBudget.viewExpense('${r.id}')" title="\u0639\u0631\u0636">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        ${Permissions.hasAccess("safety-budget")?`
                                            <button class="btn-icon btn-icon-warning" onclick="SafetyBudget.editExpense('${r.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn-icon btn-icon-danger" onclick="SafetyBudget.deleteExpense('${r.id}')" title="\u062D\u0630\u0641">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        `:""}
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `,this.populateYearMonthFilters("capex")},populateYearMonthFilters(e){const a=AppState.appData.safetyBudgetTransactions||[],t=new Set;a.forEach(i=>{const d=i.date?new Date(i.date):new Date(i.createdAt);t.add(d.getFullYear())});const s=document.getElementById(`${e}-filter-year`),n=document.getElementById(`${e}-filter-month`);if(s){const i=Array.from(t).sort((d,o)=>o-d);s.innerHTML='<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u0646\u0648\u0627\u062A</option>'+i.map(d=>`<option value="${d}">${d}</option>`).join("")}if(n){const i=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];n.innerHTML='<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0634\u0647\u0631</option>'+i.map((d,o)=>`<option value="${o+1}">${d}</option>`).join("")}},showExpenseForm(e=null,a=null){const t=!!e,s=e?.currency||this.defaultCurrency,n=e?.category||a||"",i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 8px 8px 0 0;">
                    <h2 class="modal-title" style="color: white;">
                        <i class="fas fa-receipt ml-2"></i>
                        ${t?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0635\u0631\u0648\u0641":"\u062A\u0633\u062C\u064A\u0644 \u0645\u0635\u0631\u0648\u0641 \u062C\u062F\u064A\u062F"}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="expense-form" class="modal-body" style="padding: 24px;">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar-alt ml-2 text-blue-600"></i>
                                \u0627\u0644\u062A\u0627\u0631\u064A\u062E *
                            </label>
                            <input type="date" id="expense-date" class="form-input" 
                                   value="${e?e.date?new Date(e.date).toISOString().split("T")[0]:"":new Date().toISOString().split("T")[0]}" 
                                   required
                                   style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-tags ml-2 text-purple-600"></i>
                                \u0646\u0648\u0639 \u0627\u0644\u0645\u0635\u0631\u0648\u0641 (\u0627\u0644\u0641\u0626\u0629) *
                            </label>
                            <select id="expense-category" class="form-input" required
                                    style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0626\u0629</option>
                                <option value="\u0645\u0639\u062F\u0627\u062A" ${n==="\u0645\u0639\u062F\u0627\u062A"?"selected":""}>\u0645\u0639\u062F\u0627\u062A</option>
                                <option value="\u062A\u062F\u0631\u064A\u0628" ${n==="\u062A\u062F\u0631\u064A\u0628"?"selected":""}>\u062A\u062F\u0631\u064A\u0628</option>
                                <option value="\u0635\u064A\u0627\u0646\u0629" ${n==="\u0635\u064A\u0627\u0646\u0629"?"selected":""}>\u0635\u064A\u0627\u0646\u0629</option>
                                <option value="\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629" ${n==="\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629"?"selected":""}>\u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629</option>
                                <option value="\u0637\u0648\u0627\u0631\u0626" ${n==="\u0637\u0648\u0627\u0631\u0626"?"selected":""}>\u0637\u0648\u0627\u0631\u0626</option>
                                <option value="OPEX" ${n==="OPEX"?"selected":""}>OPEX (\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u062A\u0634\u063A\u064A\u0644\u064A\u0629)</option>
                                <option value="CAPEX" ${n==="CAPEX"?"selected":""}>CAPEX (\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0631\u0623\u0633\u0645\u0627\u0644\u064A\u0629)</option>
                                <option value="\u0623\u062E\u0631\u0649" ${n==="\u0623\u062E\u0631\u0649"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-align-right ml-2 text-green-600"></i>
                                \u0627\u0644\u0648\u0635\u0641 *
                            </label>
                            <input type="text" id="expense-description" class="form-input" 
                                   value="${Utils.escapeHTML(e?.description||"")}" 
                                   required
                                   placeholder="\u0623\u062F\u062E\u0644 \u0648\u0635\u0641\u0627\u064B \u062A\u0641\u0635\u064A\u0644\u064A\u0627\u064B \u0644\u0644\u0645\u0635\u0631\u0648\u0641..."
                                   style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-building ml-2 text-orange-600"></i>
                                \u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0645\u0648\u0631\u062F *
                            </label>
                            <input type="text" id="expense-vendor" class="form-input" 
                                   value="${Utils.escapeHTML(e?.vendor||"")}" 
                                   required
                                   placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0631\u062F \u0623\u0648 \u0627\u0644\u062C\u0647\u0629"
                                   style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-coins ml-2 text-yellow-600"></i>
                                \u0627\u0644\u0639\u0645\u0644\u0629 *
                            </label>
                            <select id="expense-currency" class="form-input" required
                                    style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                                <option value="EGP" ${s==="EGP"?"selected":""}>\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A (\u062C.\u0645)</option>
                                <option value="USD" ${s==="USD"?"selected":""}>\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A ($)</option>
                            </select>
                        </div>
                        <div class="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border-2 border-red-200">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-money-bill-wave ml-2 text-red-600"></i>
                                \u0627\u0644\u0642\u064A\u0645\u0629 *
                            </label>
                            <div class="flex items-center gap-2">
                                <input type="number" id="expense-amount" class="form-input flex-1" 
                                       value="${e?parseFloat(e.amount)||0:""}" 
                                       step="0.01" min="0" required
                                       placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0645\u0628\u0644\u063A"
                                       style="border: 2px solid #ef4444; border-radius: 8px; padding: 12px; font-size: 18px; font-weight: bold;">
                                <span id="expense-currency-display" class="text-lg font-bold text-red-600 px-3 py-2 bg-white rounded-lg border-2 border-red-200">
                                    ${this.getCurrencySymbol(s)}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-file-invoice ml-2"></i>
                                \u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629
                            </label>
                            <input type="text" id="expense-invoice" class="form-input" 
                                   value="${Utils.escapeHTML(e?.invoiceNumber||"")}"
                                   style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-paperclip ml-2"></i>
                                \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (PDF / \u0635\u0648\u0631\u0629)
                            </label>
                            <input type="file" id="expense-attachments" class="form-input" 
                                   accept=".pdf,.jpg,.jpeg,.png" multiple
                                   style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                            <p class="text-xs text-gray-500 mt-1">\u064A\u0645\u0643\u0646 \u0631\u0641\u0639 \u0639\u062F\u0629 \u0645\u0644\u0641\u0627\u062A (PDF \u0623\u0648 \u0635\u0648\u0631)</p>
                            <div id="expense-attachments-list" class="mt-3 space-y-2"></div>
                            ${e&&e.attachments&&e.attachments.length>0?`
                                <div class="mt-3">
                                    <p class="text-sm font-semibold mb-2">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629:</p>
                                    ${e.attachments.map((c,u)=>`
                                        <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2 mb-2">
                                            <div class="flex items-center gap-2">
                                                <i class="fas fa-paperclip text-blue-500"></i>
                                                <span class="text-sm">${Utils.escapeHTML(c.name||"\u0645\u0631\u0641\u0642")}</span>
                                            </div>
                                            <button type="button" class="btn-icon btn-icon-danger" onclick="this.closest('div').remove()">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                        </div>
                    </div>
                    <div class="flex items-center justify-end gap-4 pt-6 border-t mt-6">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 10px 20px;">
                            <i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621
                        </button>
                        <button type="submit" class="btn-primary" style="padding: 10px 24px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                            <i class="fas fa-save ml-2"></i>
                            ${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0635\u0631\u0648\u0641"}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(i),i.addEventListener("click",c=>{c.target===i&&i.remove()});const d=i.querySelector("#expense-currency"),o=i.querySelector("#expense-currency-display");d&&o&&d.addEventListener("change",c=>{const u=c.target.value;o.textContent=this.getCurrencySymbol(u)});const r=document.getElementById("expense-attachments");r&&r.addEventListener("change",c=>{this.handleAttachmentsChange(c.target.files,i)});const l=document.getElementById("expense-form");l&&l.addEventListener("submit",c=>{c.preventDefault(),this.handleExpenseSubmit(e?.id,i,a)}),this.currentAttachments=e?.attachments?[...e.attachments]:[]},async handleExpenseSubmit(e,a,t=null){const s=document.getElementById("expense-date"),n=document.getElementById("expense-category"),i=document.getElementById("expense-description"),d=document.getElementById("expense-vendor"),o=document.getElementById("expense-currency"),r=document.getElementById("expense-amount"),l=document.getElementById("expense-invoice");if(!s||!n||!i||!d||!r){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const c={id:e||Utils.generateId("EXPENSE"),date:new Date(s.value).toISOString(),category:n.value||t,description:i.value.trim(),vendor:d.value.trim(),currency:o?.value||this.defaultCurrency,amount:parseFloat(r.value),invoiceNumber:l?.value.trim()||"",attachments:this.currentAttachments||[],createdAt:e?AppState.appData.safetyBudgetTransactions.find(u=>u.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(!c.date||!c.category||!c.description||!c.vendor||!c.amount||c.amount<=0){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D");return}Loading.show();try{if(e){const u=AppState.appData.safetyBudgetTransactions.findIndex(b=>b.id===e);u!==-1&&(AppState.appData.safetyBudgetTransactions[u]=c,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0635\u0631\u0648\u0641 \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.safetyBudgetTransactions.push(c),Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0635\u0631\u0648\u0641 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("SafetyBudgetTransactions",AppState.appData.safetyBudgetTransactions),AuditLog.log(e?"update_expense":"create_expense","SafetyBudget",c.id,{category:c.category,amount:c.amount}),Loading.hide(),a.remove(),this.currentTab==="opex"&&c.category==="OPEX"?this.loadOPEXList():this.currentTab==="capex"&&c.category==="CAPEX"?this.loadCAPEXList():this.currentTab==="all"?this.loadExpensesList():this.currentTab==="dashboard"?this.loadDashboard():c.category==="OPEX"?this.switchTab("opex"):c.category==="CAPEX"?this.switchTab("capex"):this.switchTab("all")}catch(u){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+u.message)}},showImportModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 8px 8px 0 0;">
                    <h2 class="modal-title" style="color: white;">
                        <i class="fas fa-file-import ml-2"></i>
                        \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0645\u0646 Excel
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 24px;">
                    <div class="space-y-6">
                        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 class="text-sm font-semibold text-gray-700 mb-3">
                                <i class="fas fa-info-circle ml-2 text-blue-600"></i>
                                \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F
                            </h3>
                            <ul class="text-sm text-gray-600 space-y-2 list-disc list-inside">
                                <li>\u064A\u062C\u0628 \u0623\u0646 \u064A\u062D\u062A\u0648\u064A \u0645\u0644\u0641 Excel \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629: \u0627\u0644\u062A\u0627\u0631\u064A\u062E\u060C \u0627\u0644\u0641\u0626\u0629\u060C \u0627\u0644\u0648\u0635\u0641\u060C \u0627\u0644\u062C\u0647\u0629\u060C \u0627\u0644\u0645\u0628\u0644\u063A\u060C \u0627\u0644\u0639\u0645\u0644\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)\u060C \u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</li>
                                <li>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u0635\u064A\u063A\u0629 YYYY-MM-DD \u0623\u0648 DD/MM/YYYY</li>
                                <li>\u0627\u0644\u0641\u0626\u0629 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0648\u0627\u062D\u062F\u0629 \u0645\u0646: \u0645\u0639\u062F\u0627\u062A\u060C \u062A\u062F\u0631\u064A\u0628\u060C \u0635\u064A\u0627\u0646\u0629\u060C \u0623\u062F\u0648\u0627\u062A \u062D\u0645\u0627\u064A\u0629\u060C \u0637\u0648\u0627\u0631\u0626\u060C OPEX\u060C CAPEX\u060C \u0623\u062E\u0631\u0649</li>
                                <li>\u0627\u0644\u0639\u0645\u0644\u0629: EGP \u0623\u0648 USD (\u0627\u0641\u062A\u0631\u0627\u0636\u064A: EGP)</li>
                                <li>\u0627\u0644\u0645\u0628\u0644\u063A \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0631\u0642\u0645\u0627\u064B \u0635\u062D\u064A\u062D\u0627\u064B</li>
                            </ul>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-file-excel ml-2 text-green-600"></i>
                                \u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx, .xls) *
                            </label>
                            <input type="file" id="budget-excel-file" class="form-input" 
                                   accept=".xlsx,.xls" required
                                   style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                            <p class="text-xs text-gray-500 mt-2">
                                <i class="fas fa-download ml-1"></i>
                                <a href="#" onclick="SafetyBudget.downloadTemplate(); return false;" class="text-blue-600 hover:underline">
                                    \u062A\u062D\u0645\u064A\u0644 \u0646\u0645\u0648\u0630\u062C Excel
                                </a>
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-cog ml-2 text-purple-600"></i>
                                \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F
                            </label>
                            <div class="space-y-2">
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" id="import-overwrite" class="rounded border-gray-300 text-blue-600">
                                    <span class="text-sm text-gray-700">\u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 (\u0625\u0646 \u0648\u062C\u062F\u062A)</span>
                                </label>
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" id="import-skip-duplicates" class="rounded border-gray-300 text-blue-600" checked>
                                    <span class="text-sm text-gray-700">\u062A\u062E\u0637\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0643\u0631\u0631\u0629 (\u062D\u0633\u0628 \u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629)</span>
                                </label>
                            </div>
                        </div>
                        <div id="import-preview" class="hidden">
                            <h3 class="text-sm font-semibold text-gray-700 mb-2">\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:</h3>
                            <div class="max-h-60 overflow-y-auto border border-gray-200 rounded p-2">
                                <table class="data-table text-xs">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                            <th>\u0627\u0644\u0641\u0626\u0629</th>
                                            <th>\u0627\u0644\u0648\u0635\u0641</th>
                                            <th>\u0627\u0644\u062C\u0647\u0629</th>
                                            <th>\u0627\u0644\u0645\u0628\u0644\u063A</th>
                                            <th>\u0627\u0644\u0639\u0645\u0644\u0629</th>
                                        </tr>
                                    </thead>
                                    <tbody id="import-preview-body"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-end gap-4 pt-6 border-t mt-6">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 10px 20px;">
                            <i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621
                        </button>
                        <button type="button" id="import-preview-btn" class="btn-secondary" onclick="SafetyBudget.previewImport()" style="padding: 10px 20px;">
                            <i class="fas fa-eye ml-2"></i>\u0645\u0639\u0627\u064A\u0646\u0629
                        </button>
                        <button type="button" id="import-execute-btn" class="btn-primary" onclick="SafetyBudget.executeImport()" style="padding: 10px 24px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                            <i class="fas fa-upload ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(e),e.addEventListener("click",a=>{a.target===e&&e.remove()})},downloadTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=[["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0641\u0626\u0629","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u062C\u0647\u0629","\u0627\u0644\u0645\u0628\u0644\u063A","\u0627\u0644\u0639\u0645\u0644\u0629","\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629"],["2024-01-15","OPEX","\u0645\u062B\u0627\u0644: \u0635\u064A\u0627\u0646\u0629 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629","\u0634\u0631\u0643\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","5000","EGP","INV-001"],["2024-01-20","CAPEX","\u0645\u062B\u0627\u0644: \u0634\u0631\u0627\u0621 \u0645\u0639\u062F\u0627\u062A \u062C\u062F\u064A\u062F\u0629","\u0645\u0648\u0631\u062F \u0627\u0644\u0645\u0639\u062F\u0627\u062A","50000","EGP","INV-002"],["2024-02-10","\u062A\u062F\u0631\u064A\u0628","\u0645\u062B\u0627\u0644: \u062F\u0648\u0631\u0629 \u062A\u062F\u0631\u064A\u0628\u064A\u0629","\u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","3000","USD","INV-003"]],a=XLSX.utils.book_new(),t=XLSX.utils.aoa_to_sheet(e);XLSX.utils.book_append_sheet(a,t,"\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629"),XLSX.writeFile(a,"\u0646\u0645\u0648\u0630\u062C_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629.xlsx"),Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0628\u0646\u062C\u0627\u062D")},async previewImport(){const e=document.getElementById("budget-excel-file");if(!e||!e.files||e.files.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 Excel \u0623\u0648\u0644\u0627\u064B");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");try{const t=await e.files[0].arrayBuffer(),s=XLSX.read(t,{type:"array"}),n=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(n);if(i.length===0){Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide();return}const d=i.slice(0,10).map(l=>{const c=this.parseDate(l.\u0627\u0644\u062A\u0627\u0631\u064A\u062E||l.Date||l.\u062A\u0627\u0631\u064A\u062E||""),u=String(l.\u0627\u0644\u0641\u0626\u0629||l.Category||l.\u0627\u0644\u0641\u0626\u0629||"").trim(),b=String(l.\u0627\u0644\u0648\u0635\u0641||l.Description||l.\u0648\u0635\u0641||"").trim(),y=String(l.\u0627\u0644\u062C\u0647\u0629||l.Vendor||l.\u0627\u0644\u0645\u0648\u0631\u062F||"").trim(),m=parseFloat(l.\u0627\u0644\u0645\u0628\u0644\u063A||l.Amount||l.\u0627\u0644\u0645\u0628\u0644\u063A||0),g=String(l.\u0627\u0644\u0639\u0645\u0644\u0629||l.Currency||l.\u0639\u0645\u0644\u0629||"EGP").trim().toUpperCase(),p=String(l["\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629"]||l.Invoice||l["Invoice Number"]||"").trim();return{date:c?Utils.formatDate(c):"\u063A\u064A\u0631 \u0635\u062D\u064A\u062D",category:u||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",description:b||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",vendor:y||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",amount:isNaN(m)?0:m,currency:g==="EGP"||g==="USD"?g:"EGP",invoice:p||"-"}}),o=document.getElementById("import-preview-body"),r=document.getElementById("import-preview");o&&r&&(o.innerHTML=d.map(l=>`
                    <tr>
                        <td>${Utils.escapeHTML(l.date)}</td>
                        <td>${Utils.escapeHTML(l.category)}</td>
                        <td>${Utils.escapeHTML(l.description)}</td>
                        <td>${Utils.escapeHTML(l.vendor)}</td>
                        <td>${l.amount.toLocaleString("ar-SA",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                        <td>${Utils.escapeHTML(l.currency)}</td>
                    </tr>
                `).join(""),r.classList.remove("hidden")),Notification.success(`\u062A\u0645 \u062A\u062D\u0644\u064A\u0644 ${i.length} \u0633\u0637\u0631. \u0639\u0631\u0636 \u0623\u0648\u0644 10 \u0633\u0637\u0648\u0631 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629.`),Loading.hide()}catch(a){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+a.message)}},parseDate(e){if(!e)return null;const a=String(e).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(a))return new Date(a);if(/^\d{2}\/\d{2}\/\d{4}$/.test(a)){const n=a.split("/");return new Date(n[2],n[1]-1,n[0])}if(/^\d{2}\/\d{2}\/\d{4}$/.test(a)){const n=a.split("/");return new Date(n[2],n[0]-1,n[1])}const t=parseFloat(a);if(!isNaN(t)&&t>1){const n=Math.floor(t),i=t-n,d=new Date(1899,11,30),o=new Date(d.getTime()+n*24*60*60*1e3);if(i>0){const r=Math.round(i*24*60*60),l=Math.floor(r/3600),c=Math.floor(r%3600/60),u=r%60;o.setHours(l,c,u,0)}return o}const s=new Date(a);return isNaN(s.getTime())?null:s},async executeImport(){const e=document.getElementById("budget-excel-file");if(!e||!e.files||e.files.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 Excel \u0623\u0648\u0644\u0627\u064B");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const a=document.getElementById("import-overwrite")?.checked||!1,t=document.getElementById("import-skip-duplicates")?.checked||!0;Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");try{const n=await e.files[0].arrayBuffer(),i=XLSX.read(n,{type:"array"}),d=i.Sheets[i.SheetNames[0]],o=XLSX.utils.sheet_to_json(d);if(o.length===0){Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide();return}const r=AppState.appData.safetyBudgetTransactions||[],l=new Set(r.map(m=>m.invoiceNumber).filter(Boolean));let c=0,u=0,b=0;for(const m of o)try{const g=this.parseDate(m.\u0627\u0644\u062A\u0627\u0631\u064A\u062E||m.Date||m.\u062A\u0627\u0631\u064A\u062E||""),p=String(m.\u0627\u0644\u0641\u0626\u0629||m.Category||m.\u0627\u0644\u0641\u0626\u0629||"").trim(),f=String(m.\u0627\u0644\u0648\u0635\u0641||m.Description||m.\u0648\u0635\u0641||"").trim(),v=String(m.\u0627\u0644\u062C\u0647\u0629||m.Vendor||m.\u0627\u0644\u0645\u0648\u0631\u062F||"").trim(),h=parseFloat(m.\u0627\u0644\u0645\u0628\u0644\u063A||m.Amount||m.\u0627\u0644\u0645\u0628\u0644\u063A||0),S=String(m.\u0627\u0644\u0639\u0645\u0644\u0629||m.Currency||m.\u0639\u0645\u0644\u0629||"EGP").trim().toUpperCase(),x=String(m["\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629"]||m.Invoice||m["Invoice Number"]||"").trim();if(!g||isNaN(g.getTime())){b++;continue}if(!p||!f||!v||isNaN(h)||h<=0){b++;continue}if(t&&x&&l.has(x)){u++;continue}const E={id:Utils.generateId("EXPENSE"),date:g.toISOString(),category:p,description:f,vendor:v,currency:S==="EGP"||S==="USD"?S:"EGP",amount:h,invoiceNumber:x||"",attachments:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(a&&x){const w=r.findIndex(L=>L.invoiceNumber===x);if(w!==-1){E.id=r[w].id,E.createdAt=r[w].createdAt,r[w]=E,c++;continue}}AppState.appData.safetyBudgetTransactions.push(E),x&&l.add(x),c++}catch(g){b++,Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0633\u0637\u0631:",g)}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("SafetyBudgetTransactions",AppState.appData.safetyBudgetTransactions),AuditLog.log("import_budget","SafetyBudget",null,{imported:c,skipped:u,errors:b,total:o.length}),Loading.hide();const y=document.querySelector(".modal-overlay");y&&y.remove(),Notification.success(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u0646\u062C\u0627\u062D: ${c} \u0633\u062C\u0644 \u062C\u062F\u064A\u062F\u060C ${u} \u062A\u0645 \u062A\u062E\u0637\u064A\u0647\u060C ${b} \u0623\u062E\u0637\u0627\u0621`),this.loadDashboard()}catch(s){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+s.message)}}};SafetyBudget.purchaseOrderSheetName="SafetyBudgetPurchaseOrders",SafetyBudget.purchaseOrderPrStatuses=[{value:"draft",label:"Draft"},{value:"submitted",label:"Submitted"},{value:"approved",label:"Approved"},{value:"rejected",label:"Rejected"},{value:"closed",label:"Closed"}],SafetyBudget.purchaseOrderPoStatuses=[{value:"not-issued",label:"Not Issued"},{value:"open",label:"Open"},{value:"partial",label:"Partial"},{value:"closed",label:"Closed"},{value:"cancelled",label:"Cancelled"}],SafetyBudget.ensurePurchaseOrdersCollection=function(){return AppState.appData||(AppState.appData={}),Array.isArray(AppState.appData.safetyBudgetPurchaseOrders)||(AppState.appData.safetyBudgetPurchaseOrders=[]),AppState.appData.safetyBudgetPurchaseOrders},SafetyBudget.normalizePurchaseOrderRecord=function(e={}){return{id:String(e.id||"").trim(),prNo:String(e.prNo||e.PRNo||"").trim(),prDate:String(e.prDate||e.PRDate||"").trim(),itemCodeNo:String(e.itemCodeNo||e.itemCode||"").trim(),itemsDescription:String(e.itemsDescription||e.itemDescription||"").trim(),detailsRemarks:String(e.detailsRemarks||e.remarks||"").trim(),quantity:parseFloat(e.quantity||0)||0,prStatus:String(e.prStatus||"submitted").trim(),poNo:String(e.poNo||"").trim(),poStatus:String(e.poStatus||"not-issued").trim(),note:String(e.note||e.notes||"").trim(),createdAt:String(e.createdAt||"").trim(),updatedAt:String(e.updatedAt||"").trim(),updatedBy:String(e.updatedBy||"").trim()}},SafetyBudget.ensurePurchaseOrdersLoaded=async function(e=!1){const a=this.ensurePurchaseOrdersCollection();if(!e&&a.length>0||typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets)return a;try{const t=await GoogleIntegration.readFromSheets(this.purchaseOrderSheetName,12e3);Array.isArray(t)&&(AppState.appData.safetyBudgetPurchaseOrders=t.map(s=>this.normalizePurchaseOrderRecord(s)))}catch(t){Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0634\u0631\u0627\u0621 \u0627\u0644\u0645\u0633\u062C\u0644\u0629:",t)}return this.ensurePurchaseOrdersCollection()},SafetyBudget.getPurchaseOrderPrStatusLabel=function(e){return this.purchaseOrderPrStatuses.find(a=>a.value===e)?.label||e||"-"},SafetyBudget.getPurchaseOrderPoStatusLabel=function(e){return this.purchaseOrderPoStatuses.find(a=>a.value===e)?.label||e||"-"},SafetyBudget.getPurchaseOrderStatusBadge=function(e,a){const t={approved:"background:#dcfce7;color:#166534;",closed:"background:#dbeafe;color:#1d4ed8;",submitted:"background:#e0f2fe;color:#075985;",draft:"background:#f1f5f9;color:#334155;",rejected:"background:#fee2e2;color:#b91c1c;","not-issued":"background:#f8fafc;color:#475569;",open:"background:#ede9fe;color:#6d28d9;",partial:"background:#fef3c7;color:#b45309;",cancelled:"background:#f3f4f6;color:#4b5563;"},s=e==="pr"?this.getPurchaseOrderPrStatusLabel(a):this.getPurchaseOrderPoStatusLabel(a);return`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold" style="${t[a]||"background:#e5e7eb;color:#374151;"}">${Utils.escapeHTML(s)}</span>`},SafetyBudget.injectPurchaseOrdersUI=function(){const e=document.getElementById("add-expense-btn");if(e&&!document.getElementById("add-purchase-order-btn")){const t=document.createElement("button");t.id="add-purchase-order-btn",t.className="btn-primary",t.innerHTML='<i class="fas fa-file-signature ml-2"></i>Track registered purchase orders',t.onclick=()=>this.showPurchaseOrderForm(),e.insertAdjacentElement("afterend",t)}const a=document.querySelector('#safety-budget-section .tab-btn[data-tab="capex"]')?.parentElement;if(a&&!a.querySelector('[data-tab="purchase-orders"]')){const t=document.createElement("button");t.className="tab-btn",t.dataset.tab="purchase-orders",t.setAttribute("onclick","SafetyBudget.switchTab('purchase-orders')"),t.style.cssText="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s;",t.innerHTML='<i class="fas fa-clipboard-list ml-2"></i>Track registered purchase orders',a.appendChild(t)}},SafetyBudget.renderPurchaseOrdersTab=async function(){const e=this.ensurePurchaseOrdersCollection(),a=e.filter(n=>n.prStatus==="approved").length,t=e.filter(n=>String(n.poNo||"").trim()!=="").length,s=e.filter(n=>["open","partial"].includes(n.poStatus)).length;return`
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div class="content-card"><div class="card-body"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-500">Total PRs</p><p class="text-3xl font-black text-slate-900">${e.length}</p></div><div class="bg-blue-100 rounded-2xl p-4"><i class="fas fa-file-alt text-blue-600 text-xl"></i></div></div></div></div>
                <div class="content-card"><div class="card-body"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-500">Approved PRs</p><p class="text-3xl font-black text-emerald-600">${a}</p></div><div class="bg-emerald-100 rounded-2xl p-4"><i class="fas fa-circle-check text-emerald-600 text-xl"></i></div></div></div></div>
                <div class="content-card"><div class="card-body"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-500">Linked POs</p><p class="text-3xl font-black text-indigo-600">${t}</p></div><div class="bg-indigo-100 rounded-2xl p-4"><i class="fas fa-link text-indigo-600 text-xl"></i></div></div></div></div>
                <div class="content-card"><div class="card-body"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-500">Open PO Status</p><p class="text-3xl font-black text-amber-600">${s}</p></div><div class="bg-amber-100 rounded-2xl p-4"><i class="fas fa-hourglass-half text-amber-600 text-xl"></i></div></div></div></div>
            </div>

            <div class="content-card">
                <div class="card-body">
                    <div class="flex items-center justify-between flex-wrap gap-4 mb-5">
                        <div>
                            <h2 class="text-xl font-black text-slate-900">
                                <i class="fas fa-clipboard-list ml-2 text-blue-600"></i>
                                Track registered purchase orders.
                            </h2>
                            <p class="text-sm text-gray-500 mt-2">\u062C\u062F\u0648\u0644 \u0645\u0631\u0643\u0632\u064A \u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0634\u0631\u0627\u0621 \u0648\u0631\u0628\u0637 \u062D\u0627\u0644\u0629 PR \u0648 PO \u062F\u0627\u062E\u0644 \u0646\u0641\u0633 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629.</p>
                        </div>
                        <button class="btn-primary" onclick="SafetyBudget.showPurchaseOrderForm()">
                            <i class="fas fa-plus ml-2"></i>
                            \u062A\u0633\u062C\u064A\u0644 \u0637\u0644\u0628 \u0634\u0631\u0627\u0621
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0628\u062D\u062B \u0633\u0631\u064A\u0639</label>
                            <input id="purchase-order-search" class="form-input" placeholder="PR No / PO No / Item / Notes">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">PR Status</label>
                            <select id="purchase-order-pr-status-filter" class="form-input">
                                <option value="">All</option>
                                ${this.purchaseOrderPrStatuses.map(n=>`<option value="${n.value}">${n.label}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">PO Status</label>
                            <select id="purchase-order-po-status-filter" class="form-input">
                                <option value="">All</option>
                                ${this.purchaseOrderPoStatuses.map(n=>`<option value="${n.value}">${n.label}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                            <input id="purchase-order-year-filter" class="form-input" type="number" min="2020" max="2100" placeholder="2026">
                        </div>
                    </div>

                    <div class="mt-5" id="purchase-orders-table-container">
                        <div class="empty-state">
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062C\u062F\u0648\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `},SafetyBudget.setupPurchaseOrderEventListeners=function(){const e=()=>this.loadPurchaseOrdersList(),a=document.getElementById("purchase-order-search"),t=document.getElementById("purchase-order-pr-status-filter"),s=document.getElementById("purchase-order-po-status-filter"),n=document.getElementById("purchase-order-year-filter");a&&a.addEventListener("input",e),t&&t.addEventListener("change",e),s&&s.addEventListener("change",e),n&&n.addEventListener("input",e)},SafetyBudget.getFilteredPurchaseOrders=function(){const e=this.ensurePurchaseOrdersCollection().slice(),a=String(document.getElementById("purchase-order-search")?.value||"").trim().toLowerCase(),t=String(document.getElementById("purchase-order-pr-status-filter")?.value||"").trim(),s=String(document.getElementById("purchase-order-po-status-filter")?.value||"").trim(),n=String(document.getElementById("purchase-order-year-filter")?.value||"").trim();return e.filter(i=>{const d=[i.prNo,i.poNo,i.itemCodeNo,i.itemsDescription,i.detailsRemarks,i.note].join(" ").toLowerCase(),o=String(new Date(i.prDate||i.createdAt||Date.now()).getFullYear());return(!a||d.includes(a))&&(!t||i.prStatus===t)&&(!s||i.poStatus===s)&&(!n||o===n)}).sort((i,d)=>new Date(d.prDate||d.updatedAt||0)-new Date(i.prDate||i.updatedAt||0))},SafetyBudget.loadPurchaseOrdersList=function(){const e=document.getElementById("purchase-orders-table-container");if(!e)return;const a=this.getFilteredPurchaseOrders();if(a.length===0){e.innerHTML=`
            <div class="empty-state">
                <i class="fas fa-folder-open text-4xl text-gray-300 mb-3"></i>
                <p class="text-gray-500 mb-3">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0634\u0631\u0627\u0621 \u0645\u0637\u0627\u0628\u0642\u0629 \u062D\u0627\u0644\u064A\u064B\u0627</p>
                <button class="btn-primary" onclick="SafetyBudget.showPurchaseOrderForm()">
                    <i class="fas fa-plus ml-2"></i>
                    \u062A\u0633\u062C\u064A\u0644 \u0623\u0648\u0644 \u0637\u0644\u0628 \u0634\u0631\u0627\u0621
                </button>
            </div>
        `;return}e.innerHTML=`
        <div class="table-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>PR No</th>
                        <th>PR Date</th>
                        <th>Item Code No</th>
                        <th>Items Description</th>
                        <th>Details / Remarks</th>
                        <th>Quantity</th>
                        <th>PR Status</th>
                        <th>PO No</th>
                        <th>PO Status</th>
                        <th>Note</th>
                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                    </tr>
                </thead>
                <tbody>
                    ${a.map(t=>`
                        <tr>
                            <td class="font-bold text-slate-900">${Utils.escapeHTML(t.prNo||"-")}</td>
                            <td>${t.prDate?Utils.formatDate(t.prDate):"-"}</td>
                            <td>${Utils.escapeHTML(t.itemCodeNo||"-")}</td>
                            <td style="min-width: 220px;">${Utils.escapeHTML(t.itemsDescription||"-")}</td>
                            <td style="min-width: 220px;">${Utils.escapeHTML(t.detailsRemarks||"-")}</td>
                            <td>${(parseFloat(t.quantity)||0).toLocaleString("en-US")}</td>
                            <td>${this.getPurchaseOrderStatusBadge("pr",t.prStatus)}</td>
                            <td>${Utils.escapeHTML(t.poNo||"-")}</td>
                            <td>${this.getPurchaseOrderStatusBadge("po",t.poStatus)}</td>
                            <td style="min-width: 180px;">${Utils.escapeHTML(t.note||"-")}</td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button class="btn-icon btn-icon-primary" onclick="SafetyBudget.viewPurchaseOrder('${t.id}')" title="\u0639\u0631\u0636">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    ${Permissions.hasAccess("safety-budget")?`
                                        <button class="btn-icon btn-icon-warning" onclick="SafetyBudget.editPurchaseOrder('${t.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon btn-icon-danger" onclick="SafetyBudget.deletePurchaseOrder('${t.id}')" title="\u062D\u0630\u0641">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    `:""}
                                </div>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `},SafetyBudget.showPurchaseOrderForm=function(e=null){const a=!!e,t=this.normalizePurchaseOrderRecord(e||{}),s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
        <div class="modal-content" style="max-width: 1040px; overflow:hidden; border-radius: 24px;">
            <div class="modal-header" style="background: linear-gradient(135deg, #eff6ff 0%, #ffffff 58%, #f0fdf4 100%); border-bottom: 1px solid rgba(148,163,184,0.2);">
                <div class="flex items-start justify-between gap-4 w-full flex-wrap">
                    <div class="min-w-0">
                        <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black text-blue-700 bg-blue-100 border border-blue-200">
                            <i class="fas fa-file-signature"></i>
                            Purchase Order Form
                        </div>
                        <h2 class="modal-title mt-3" style="font-size: 1.5rem;">
                            ${a?"\u062A\u0639\u062F\u064A\u0644 \u0637\u0644\u0628 \u0634\u0631\u0627\u0621":"\u062A\u0633\u062C\u064A\u0644 \u0637\u0644\u0628 \u0634\u0631\u0627\u0621 \u062C\u062F\u064A\u062F"}
                        </h2>
                        <p class="text-sm text-slate-500 mt-2">\u0646\u0645\u0648\u0630\u062C \u0645\u0628\u0633\u0651\u0637 \u0648\u0633\u0631\u064A\u0639 \u0644\u062A\u0633\u062C\u064A\u0644 \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 \u0648\u0631\u0628\u0637\u0647\u0627 \u0628\u062D\u0627\u0644\u0629 \u0623\u0645\u0631 \u0627\u0644\u0634\u0631\u0627\u0621 \u0645\u0639 \u062A\u0645\u064A\u064A\u0632 \u0628\u0635\u0631\u064A \u0623\u0648\u0636\u062D \u0644\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629.</p>
                    </div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <form id="purchase-order-form" class="modal-body" style="padding: 24px; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);">
                <div class="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-5">
                    <div class="rounded-[22px] border border-blue-100 bg-white p-5" style="box-shadow: 0 14px 34px rgba(59,130,246,0.08);">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="h-11 w-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            <div>
                                <h3 class="text-base font-black text-slate-900">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</h3>
                                <p class="text-xs text-slate-500 mt-1">\u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0633\u062C\u0644 PR \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D.</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">PR No *</label>
                                <input id="purchase-order-pr-no" class="form-input" required value="${Utils.escapeHTML(t.prNo)}" style="border-width:2px;">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">PR Date *</label>
                                <input id="purchase-order-pr-date" type="date" class="form-input" required value="${Utils.escapeHTML(t.prDate?t.prDate.slice(0,10):"")}" style="border-width:2px;">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Item Code No</label>
                                <input id="purchase-order-item-code" class="form-input" value="${Utils.escapeHTML(t.itemCodeNo)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                                <input id="purchase-order-quantity" type="number" min="0" step="0.01" class="form-input" required value="${t.quantity||""}">
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Items Description *</label>
                                <textarea id="purchase-order-description" class="form-input" rows="4" required style="min-height: 112px;">${Utils.escapeHTML(t.itemsDescription)}</textarea>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Details / Remarks</label>
                                <textarea id="purchase-order-remarks" class="form-input" rows="4" style="min-height: 112px;">${Utils.escapeHTML(t.detailsRemarks)}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-5">
                        <div class="rounded-[22px] border border-emerald-100 bg-white p-5" style="box-shadow: 0 14px 34px rgba(16,185,129,0.08);">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="h-11 w-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                    <i class="fas fa-circle-check"></i>
                                </div>
                                <div>
                                    <h3 class="text-base font-black text-slate-900">\u062D\u0627\u0644\u0629 PR / PO</h3>
                                    <p class="text-xs text-slate-500 mt-1">\u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0627\u0636\u062D\u0629 \u0644\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0648\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0644\u0627\u062D\u0642\u064B\u0627.</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">PR Status</label>
                                    <select id="purchase-order-pr-status" class="form-input">
                                        ${this.purchaseOrderPrStatuses.map(i=>`<option value="${i.value}" ${t.prStatus===i.value?"selected":""}>${i.label}</option>`).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">PO No</label>
                                    <input id="purchase-order-po-no" class="form-input" value="${Utils.escapeHTML(t.poNo)}">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">PO Status</label>
                                    <select id="purchase-order-po-status" class="form-input">
                                        ${this.purchaseOrderPoStatuses.map(i=>`<option value="${i.value}" ${t.poStatus===i.value?"selected":""}>${i.label}</option>`).join("")}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="rounded-[22px] border border-amber-100 bg-white p-5" style="box-shadow: 0 14px 34px rgba(245,158,11,0.08);">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="h-11 w-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                                    <i class="fas fa-note-sticky"></i>
                                </div>
                                <div>
                                    <h3 class="text-base font-black text-slate-900">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629</h3>
                                    <p class="text-xs text-slate-500 mt-1">\u0623\u064A \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062F\u0627\u0639\u0645\u0629 \u0623\u0648 \u062A\u0641\u0627\u0635\u064A\u0644 \u062E\u0627\u0635\u0629 \u0628\u0633\u064A\u0631 \u0627\u0644\u0634\u0631\u0627\u0621.</p>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Note</label>
                                <textarea id="purchase-order-note" class="form-input" rows="6" style="min-height: 158px;">${Utils.escapeHTML(t.note)}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-between items-center gap-3 flex-wrap mt-6 border-t border-slate-200 pt-5">
                    <div class="text-xs text-slate-500">
                        <i class="fas fa-bolt ml-1 text-blue-500"></i>
                        \u0628\u0639\u062F \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u062D\u0641\u0638 \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0645\u0628\u0627\u0634\u0631\u0629 \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062C\u062F\u0648\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627.
                    </div>
                    <div class="flex justify-end gap-3">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" class="btn-primary" id="purchase-order-submit-btn" style="box-shadow: 0 14px 26px rgba(37,99,235,0.24);">
                            <i class="fas fa-save ml-2"></i>
                            ${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0637\u0644\u0628"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,document.body.appendChild(s);const n=s.querySelector("#purchase-order-form");n&&n.addEventListener("submit",i=>{i.preventDefault(),this.handlePurchaseOrderSubmit(t.id||null,s)})},SafetyBudget.handlePurchaseOrderSubmit=async function(e,a){const t=this.ensurePurchaseOrdersCollection(),s=e?t.find(d=>d.id===e):null,n=document.getElementById("purchase-order-submit-btn"),i=this.normalizePurchaseOrderRecord({id:s?.id||Utils.generateSequentialId("SPO",t),prNo:document.getElementById("purchase-order-pr-no")?.value,prDate:document.getElementById("purchase-order-pr-date")?.value,itemCodeNo:document.getElementById("purchase-order-item-code")?.value,itemsDescription:document.getElementById("purchase-order-description")?.value,detailsRemarks:document.getElementById("purchase-order-remarks")?.value,quantity:document.getElementById("purchase-order-quantity")?.value,prStatus:document.getElementById("purchase-order-pr-status")?.value,poNo:document.getElementById("purchase-order-po-no")?.value,poStatus:document.getElementById("purchase-order-po-status")?.value,note:document.getElementById("purchase-order-note")?.value,createdAt:s?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),updatedBy:AppState.currentUser?.name||AppState.currentUser?.email||""});if(!i.prNo||!i.prDate||!i.itemsDescription||!(parseFloat(i.quantity)>0)){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 PR No \u0648 PR Date \u0648 Items Description \u0648 Quantity \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D");return}n&&(n.disabled=!0,n.style.opacity="0.7");try{if(s){const d=t.findIndex(o=>o.id===s.id);t[d]=i}else t.push(i);if(typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),a?.remove(),this.currentTab==="purchase-orders"){const d=document.getElementById("safety-budget-tab-content");d&&(d.innerHTML=await this.renderPurchaseOrdersTab(),this.setupPurchaseOrderEventListeners(),this.loadPurchaseOrdersList())}else this.loadDashboard();Notification.success(s?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0637\u0644\u0628 \u0627\u0644\u0634\u0631\u0627\u0621 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u0634\u0631\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),GoogleIntegration.autoSave(this.purchaseOrderSheetName,t).then(()=>{AuditLog.log(s?"update_purchase_order":"create_purchase_order","SafetyBudget",i.id,{prNo:i.prNo,poNo:i.poNo,prStatus:i.prStatus,poStatus:i.poStatus})}).catch(d=>{Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u064B\u0627\u060C \u0648\u062C\u0627\u0631\u064D \u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+d.message)})}catch(d){n&&(n.disabled=!1,n.style.opacity="1"),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u0634\u0631\u0627\u0621: "+d.message)}},SafetyBudget.viewPurchaseOrder=function(e){const a=this.ensurePurchaseOrdersCollection().find(s=>s.id===e);if(!a)return;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
        <div class="modal-content" style="max-width: 900px; overflow:hidden; border-radius: 24px;">
            <div class="modal-header" style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 56%, #eff6ff 100%); border-bottom: 1px solid rgba(148,163,184,0.2);">
                <div class="flex items-start justify-between gap-4 w-full flex-wrap">
                    <div>
                        <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black text-indigo-700 bg-indigo-100 border border-indigo-200">
                            <i class="fas fa-eye"></i>
                            Purchase Order Details
                        </div>
                        <h2 class="modal-title mt-3">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u0634\u0631\u0627\u0621</h2>
                        <p class="text-sm text-slate-500 mt-2">\u0639\u0631\u0636 \u0633\u0631\u064A\u0639 \u0648\u0648\u0627\u0636\u062D \u0644\u0643\u0627\u0645\u0644 \u0628\u064A\u0627\u0646\u0627\u062A PR \u0648 PO \u0645\u0639 \u062A\u0645\u064A\u064A\u0632 \u0628\u0635\u0631\u064A \u0644\u0644\u062D\u0627\u0644\u0629.</p>
                    </div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="modal-body" style="padding: 24px; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);">
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
                    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-4"><p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">PR No</p><p class="text-lg font-black text-slate-900 mt-2">${Utils.escapeHTML(a.prNo||"-")}</p></div>
                    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-4"><p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">PR Date</p><p class="text-lg font-black text-slate-900 mt-2">${a.prDate?Utils.formatDate(a.prDate):"-"}</p></div>
                    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-4"><p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Item Code</p><p class="text-lg font-black text-slate-900 mt-2">${Utils.escapeHTML(a.itemCodeNo||"-")}</p></div>
                    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-4"><p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Quantity</p><p class="text-lg font-black text-slate-900 mt-2">${(parseFloat(a.quantity)||0).toLocaleString("en-US")}</p></div>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-5">
                    <div class="space-y-4">
                        <div class="rounded-[22px] border border-blue-100 bg-white p-5" style="box-shadow: 0 14px 34px rgba(59,130,246,0.08);">
                            <p class="text-sm font-black text-slate-900 mb-3">Items Description</p>
                            <p class="text-base leading-8 text-slate-700">${Utils.escapeHTML(a.itemsDescription||"-")}</p>
                        </div>
                        <div class="rounded-[22px] border border-amber-100 bg-white p-5" style="box-shadow: 0 14px 34px rgba(245,158,11,0.08);">
                            <p class="text-sm font-black text-slate-900 mb-3">Details / Remarks</p>
                            <p class="text-base leading-8 text-slate-700">${Utils.escapeHTML(a.detailsRemarks||"-")}</p>
                        </div>
                        <div class="rounded-[22px] border border-slate-200 bg-white p-5">
                            <p class="text-sm font-black text-slate-900 mb-3">Note</p>
                            <p class="text-base leading-8 text-slate-700">${Utils.escapeHTML(a.note||"-")}</p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="rounded-[22px] border border-emerald-100 bg-white p-5" style="box-shadow: 0 14px 34px rgba(16,185,129,0.08);">
                            <p class="text-sm font-black text-slate-900 mb-3">PR Status</p>
                            <div>${this.getPurchaseOrderStatusBadge("pr",a.prStatus)}</div>
                        </div>
                        <div class="rounded-[22px] border border-indigo-100 bg-white p-5" style="box-shadow: 0 14px 34px rgba(99,102,241,0.08);">
                            <p class="text-sm font-black text-slate-900 mb-2">PO No</p>
                            <p class="text-lg font-black text-slate-900">${Utils.escapeHTML(a.poNo||"-")}</p>
                            <p class="text-sm font-black text-slate-900 mt-4 mb-3">PO Status</p>
                            <div>${this.getPurchaseOrderStatusBadge("po",a.poStatus)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,document.body.appendChild(t)},SafetyBudget.editPurchaseOrder=function(e){const a=this.ensurePurchaseOrdersCollection().find(t=>t.id===e);a&&this.showPurchaseOrderForm(a)},SafetyBudget.deletePurchaseOrder=async function(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0637\u0644\u0628 \u0627\u0644\u0634\u0631\u0627\u0621 \u0647\u0630\u0627\u061F")){Loading.show();try{if(AppState.appData.safetyBudgetPurchaseOrders=this.ensurePurchaseOrdersCollection().filter(a=>a.id!==e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.autoSave(this.purchaseOrderSheetName,AppState.appData.safetyBudgetPurchaseOrders),AuditLog.log("delete_purchase_order","SafetyBudget",e),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0637\u0644\u0628 \u0627\u0644\u0634\u0631\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),this.currentTab==="purchase-orders"){const a=document.getElementById("safety-budget-tab-content");a&&(a.innerHTML=await this.renderPurchaseOrdersTab(),this.setupPurchaseOrderEventListeners(),this.loadPurchaseOrdersList())}else this.loadDashboard()}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0637\u0644\u0628 \u0627\u0644\u0634\u0631\u0627\u0621: "+a.message)}}};const __originalSafetyBudgetLoad=SafetyBudget.load;SafetyBudget.load=async function(){this.ensurePurchaseOrdersCollection(),await __originalSafetyBudgetLoad.call(this),this.injectPurchaseOrdersUI(),this.ensurePurchaseOrdersLoaded().then(()=>{this.currentTab==="purchase-orders"&&this.switchTab("purchase-orders",{silent:!0})}).catch(()=>{})};const __originalSafetyBudgetSwitchTab=SafetyBudget.switchTab;SafetyBudget.switchTab=async function(e,a={}){if(e!=="purchase-orders"){const s=await __originalSafetyBudgetSwitchTab.call(this,e,a);return this.injectPurchaseOrdersUI(),s}this.currentTab=e,document.querySelectorAll(".tab-btn").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)});const t=document.getElementById("safety-budget-tab-content");t&&(await this.ensurePurchaseOrdersLoaded(),t.innerHTML=await this.renderPurchaseOrdersTab(),this.setupPurchaseOrderEventListeners(),this.loadPurchaseOrdersList())},(function(){"use strict";try{typeof window<"u"&&typeof SafetyBudget<"u"&&(window.SafetyBudget=SafetyBudget,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 SafetyBudget module loaded and available on window.SafetyBudget"))}catch{if(typeof window<"u"&&typeof SafetyBudget<"u")try{window.SafetyBudget=SafetyBudget}catch{}}})();
