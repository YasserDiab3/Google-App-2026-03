const AppTester={_backendTestCache:null,_backendTestCacheTtlMs:3e4,currentView:"dashboard",testResults:[],isRunning:!1,scheduledTests:null,testConfig:{timeout:3e4,retryCount:2,autoSchedule:{enabled:!1,frequency:"daily",time:"02:00"}},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const t=document.getElementById("apptester-section");if(t&&!(typeof Utils>"u")){if(typeof AppState>"u"){Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}try{if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){t.innerHTML=`
                    <div class="content-card">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0648\u062D\u062F\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631</p>
                            <p class="text-sm text-gray-400 mt-2">\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629</p>
                        </div>
                    </div>
                `;return}let i="";try{const n=this.renderDashboard();i=await Utils.promiseWithTimeout(n,5e3,()=>new Error("Timeout: renderDashboard took too long"))}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0648\u0627\u062C\u0647\u0629:",n),i=`
                    <div class="section-header">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-vial ml-3"></i>
                                \u0648\u062D\u062F\u0629 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062A\u0637\u0628\u064A\u0642
                            </h1>
                        </div>
                    </div>
                    <div class="content-card mt-6">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500 mb-4">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                        </div>
                    </div>
                `}t.innerHTML=i;try{this.setupEventListeners(),this.loadTestHistory(),this.initializeScheduler()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0623\u062D\u062F\u0627\u062B:",n)}}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062A\u0637\u0628\u064A\u0642:",s),t.innerHTML=`
                <div class="content-card">
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                        <p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</p>
                        <button onclick="AppTester.load()" class="btn-primary mt-4">
                            <i class="fas fa-redo ml-2"></i>
                            \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                        </button>
                    </div>
                </div>
            `}}},async renderDashboard(){return`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-vial ml-3" aria-hidden="true"></i>
                            \u0648\u062D\u062F\u0629 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062A\u0637\u0628\u064A\u0642
                        </h1>
                        <p class="section-subtitle">\u0641\u062D\u0635 \u0634\u0627\u0645\u0644 \u0644\u0644\u0645\u0648\u062F\u064A\u0648\u0644\u0627\u062A \u0648\u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <button id="run-test-btn" class="btn-primary" ${this.isRunning?"disabled":""}>
                            <i class="fas fa-play ml-2" aria-hidden="true"></i>
                            ${this.isRunning?"\u062C\u0627\u0631\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631...":"\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631"}
                        </button>
                        <button id="export-json-btn" class="btn-secondary" ${this.testResults.length===0?"disabled":""}>
                            <i class="fas fa-file-code ml-2" aria-hidden="true"></i>
                            \u062A\u0635\u062F\u064A\u0631 JSON
                        </button>
                        <button id="test-settings-btn" class="btn-secondary">
                            <i class="fas fa-cog ml-2" aria-hidden="true"></i>
                            \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629 -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chart-line ml-2"></i>
                            \u0622\u062E\u0631 \u0627\u062E\u062A\u0628\u0627\u0631
                        </h3>
                    </div>
                    <div class="card-body">
                        <div id="last-test-stats" class="text-center">
                            <p class="text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0634\u063A\u064A\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u0639\u062F</p>
                        </div>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-exclamation-triangle ml-2"></i>
                            \u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u062D\u0631\u062C\u0629
                        </h3>
                    </div>
                    <div class="card-body">
                        <div id="critical-issues-count" class="text-center">
                            <span class="text-3xl font-bold text-red-600">0</span>
                        </div>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-check-circle ml-2"></i>
                            \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0639\u0627\u0645\u0629
                        </h3>
                    </div>
                    <div class="card-body">
                        <div id="overall-status" class="text-center">
                            <span class="text-3xl font-bold text-green-600">\u062C\u064A\u062F</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 -->
            <div class="mt-6">
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title">
                                <i class="fas fa-list ml-2" aria-hidden="true"></i>
                                \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A
                            </h2>
                            <div class="flex items-center gap-3">
                                <button id="export-pdf-btn" class="btn-secondary" disabled>
                                    <i class="fas fa-file-pdf ml-2"></i>
                                    \u062A\u0635\u062F\u064A\u0631 PDF
                                </button>
                                <button id="send-report-btn" class="btn-secondary" disabled>
                                    <i class="fas fa-paper-plane ml-2"></i>
                                    \u0625\u0631\u0633\u0627\u0644 \u0644\u0644\u0625\u062F\u0627\u0631\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="test-results-container">
                            <div class="empty-state">
                                <i class="fas fa-vial text-4xl text-gray-300 mb-4"></i>
                                <p class="text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0634\u063A\u064A\u0644 \u0623\u064A \u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u0639\u062F</p>
                                <p class="text-sm text-gray-400 mt-2">\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631" \u0644\u0628\u062F\u0621 \u0627\u0644\u0641\u062D\u0635</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},setupEventListeners(){const t=document.getElementById("run-test-btn");t&&t.addEventListener("click",()=>this.runFullTest());const s=document.getElementById("export-json-btn");s&&s.addEventListener("click",()=>this.exportToJSON());const i=document.getElementById("test-settings-btn");i&&i.addEventListener("click",()=>this.showSettings());const n=document.getElementById("export-pdf-btn");n&&n.addEventListener("click",()=>this.exportToPDF());const e=document.getElementById("send-report-btn");e&&e.addEventListener("click",()=>this.sendReportToAdmin())},async runFullTest(){if(this.isRunning)return;this.isRunning=!0,this.testResults=[];const t=document.getElementById("run-test-btn");t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631...'),this.showProgressScreen();try{const s=this.getModulesList();for(const i of s)await this.testModule(i);this.saveTestResults(),this.updateDashboard(),this.renderTestResults(),window.UI&&window.UI.showNotification&&window.UI.showNotification("\u062A\u0645 \u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u0646\u062C\u0627\u062D","success")}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631:",s),window.UI&&window.UI.showNotification&&window.UI.showNotification("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631","error")}finally{this.isRunning=!1,t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-play ml-2"></i> \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631'),this.hideProgressScreen()}},getModulesList(){return["users","incidents","nearmiss","ptw","training","reports","settings","clinic","fireequipment","ppe","periodicinspections","violations","contractors","employees","behaviormonitoring","chemicalsafety","dailyobservations","iso","emergency","safetybudget","actiontrackingregister","hse","safetyperformancekpis","sustainability","riskassessment","legaldocuments","safetyhealthmanagement","usertasks","sopjha","aiassistant","useraiassistant"].map(s=>{const i=this.getModuleObjectName(s);let n=window[i];if(!n&&s.includes("-")){const e=s.replace(/-/g,""),a=this.getModuleObjectName(e);n=window[a]}return{name:s,displayName:this.getModuleDisplayName(s),module:n,moduleObjectName:i}})},getModuleDisplayName(t){return{users:"\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646",incidents:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B",nearmiss:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629",ptw:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644",training:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628",reports:"\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",settings:"\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",clinic:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",fireequipment:"\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642",ppe:"\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629",periodicinspections:"\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629",violations:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",contractors:"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",employees:"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",behaviormonitoring:"\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643",chemicalsafety:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629",dailyobservations:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629",iso:"ISO",emergency:"\u0627\u0644\u0637\u0648\u0627\u0631\u0626",safetybudget:"\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",actiontrackingregister:"\u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A",hse:"HSE",safetyperformancekpis:"\u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",sustainability:"\u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629",riskassessment:"\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631",legaldocuments:"\u0627\u0644\u0648\u062B\u0627\u0626\u0642 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629",safetyhealthmanagement:"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629",usertasks:"\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",sopjha:"SOP/JHA",aiassistant:"\u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A",useraiassistant:"\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0630\u0643\u064A"}[t]||t},getModuleObjectName(t){return{users:"Users",incidents:"Incidents",nearmiss:"NearMiss",ptw:"PTW",training:"Training",reports:"Reports",settings:"Settings",clinic:"Clinic",fireequipment:"FireEquipment",ppe:"PPE",periodicinspections:"PeriodicInspections",violations:"Violations",contractors:"Contractors",employees:"Employees",behaviormonitoring:"BehaviorMonitoring",chemicalsafety:"ChemicalSafety",dailyobservations:"DailyObservations",iso:"ISO",emergency:"Emergency",safetybudget:"SafetyBudget",actiontrackingregister:"ActionTrackingRegister",hse:"HSE",safetyperformancekpis:"SafetyPerformanceKPIs",sustainability:"Sustainability",riskassessment:"RiskAssessment",legaldocuments:"LegalDocuments",safetyhealthmanagement:"SafetyHealthManagement",usertasks:"UserTasks",sopjha:"SOPJHA",aiassistant:"AIAssistant",useraiassistant:"UserAIAssistant"}[t]||t.split("-").map(i=>i.charAt(0).toUpperCase()+i.slice(1)).join("")},async testModule(t){const{name:s,displayName:i,module:n}=t,e={moduleName:s,displayName:i,timestamp:new Date().toISOString(),tests:[],issues:[],status:"pending",loadingTime:0,responseTime:0};try{const a=this.getModuleObjectName(s);let o=n||window[a];o||(await new Promise(c=>setTimeout(c,100)),o=window[a]);const l=await this.testModuleExistence(s,o);e.tests.push(l);const d=await this.testLoadingSpeed(s,o);e.tests.push(d),e.loadingTime=d.duration;const r=await this.testModuleFunctions(s,o);e.tests.push(r);const m=await this.testBackendConnection(s,o);e.tests.push(m);const u=await this.testModuleUI(s,o);e.tests.push(u);const h=await this.testPermissions(s,o);e.tests.push(h);const p=await this.testSpecialFeatures(s,o);e.tests.push(p);const y=e.tests.some(c=>c.severity==="critical"&&!c.passed),f=e.tests.some(c=>c.severity==="medium"&&!c.passed),g=e.tests.some(c=>c.severity==="low"&&!c.passed);y?e.status="critical":f?e.status="warning":g?e.status="info":e.status="success",e.issues=e.tests.filter(c=>!c.passed).map(c=>({test:c.name,severity:c.severity,message:c.message,recommendation:c.recommendation}))}catch(a){e.status="error",e.issues.push({test:"general",severity:"critical",message:`\u062E\u0637\u0623 \u0639\u0627\u0645 \u0641\u064A \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644: ${a.message}`,recommendation:"\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0648\u0645\u0644\u0641\u0627\u062A\u0647"})}this.testResults.push(e),this.updateProgress()},async testLoadingSpeed(t,s){const i=performance.now();try{if(s&&typeof s.load=="function"){const n=performance.now();await Utils.promiseWithTimeout(Promise.resolve(s.load()),this.testConfig.timeout,"Timeout");const a=performance.now()-n,o=a<5e3;return{name:"\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644",passed:o,duration:a,severity:o?null:a>1e4?"critical":"medium",message:o?`\u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0633\u0631\u064A\u0639 (${a.toFixed(0)}ms)`:`\u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0628\u0637\u064A\u0621 (${a.toFixed(0)}ms)`,recommendation:o?null:"\u062A\u062D\u0633\u064A\u0646 \u0623\u062F\u0627\u0621 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0623\u0648 \u062A\u0642\u0644\u064A\u0644 \u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641\u0627\u062A"}}else return{name:"\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644",passed:!1,duration:0,severity:"medium",message:"\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u062F\u0627\u0644\u0629 load",recommendation:"\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0648\u0645\u0644\u0641\u0627\u062A\u0647"}}catch(n){return{name:"\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644",passed:!1,duration:performance.now()-i,severity:"critical",message:`\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644: ${n.message}`,recommendation:"\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0648\u0645\u0644\u0641\u0627\u062A\u0647"}}},async testModuleExistence(t,s){const i=this.getModuleObjectName(t),n=window[i],e=typeof n<"u"||s!=null,a=s||n;return{name:"\u0648\u062C\u0648\u062F \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644",passed:e,severity:e?null:"critical",message:e?`\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0645\u0648\u062C\u0648\u062F (${i})`:`\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A window (${i})`,recommendation:e?null:`\u062A\u062D\u0642\u0642 \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0641\u064A index.html \u0648\u0648\u062C\u0648\u062F window.${i}`}},async testModuleFunctions(t,s){if(!s){const e=this.getModuleObjectName(t);s=window[e]}if(!s)return{name:"\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629",passed:!1,severity:"critical",message:"\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F",recommendation:"\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644"};const n=["load"].filter(e=>typeof s[e]!="function");return{name:"\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629",passed:n.length===0,severity:n.length>0?"critical":null,message:n.length===0?"\u062C\u0645\u064A\u0639 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0645\u0648\u062C\u0648\u062F\u0629":`\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629: ${n.join(", ")}`,recommendation:n.length===0?null:`\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629: ${n.join(", ")}`}},async testBackendConnection(t,s){try{if(this._backendTestCache&&Date.now()-this._backendTestCache.timestamp<this._backendTestCacheTtlMs)return{...this._backendTestCache.result,message:`${this._backendTestCache.result.message} (cached)`};if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"){const a={name:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",passed:!0,severity:null,message:"GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u062A\u0645 \u062A\u062E\u0637\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 (\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629)",recommendation:null};return this._backendTestCache={timestamp:Date.now(),result:a},a}const i=AppState?.googleConfig?.appsScript?.enabled,n=AppState?.googleConfig?.appsScript?.scriptUrl;if(!i||!n||n.trim()===""){const a={name:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",passed:!0,severity:null,message:"Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644 \u0623\u0648 \u0631\u0627\u0628\u0637 \u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F - \u062A\u0645 \u062A\u062E\u0637\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 (\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629)",recommendation:null};return this._backendTestCache={timestamp:Date.now(),result:a},a}if(!n.includes("script.google.com")||!n.includes("/exec")){const a={name:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",passed:!0,severity:null,message:"\u0631\u0627\u0628\u0637 Google Apps Script \u063A\u064A\u0631 \u0635\u062D\u064A\u062D - \u062A\u0645 \u062A\u062E\u0637\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 (\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629)",recommendation:null};return this._backendTestCache={timestamp:Date.now(),result:a},a}if(GoogleIntegration._circuitBreaker&&GoogleIntegration._circuitBreaker.isOpen){const a=GoogleIntegration._circuitBreaker.openUntil?Math.ceil((GoogleIntegration._circuitBreaker.openUntil-Date.now())/1e3):30;if(a>0){const o={name:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",passed:!0,severity:null,message:`Circuit Breaker \u0645\u0641\u062A\u0648\u062D - \u062A\u0645 \u062A\u062E\u0637\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0624\u0642\u062A\u0627\u064B (${a} \u062B\u0627\u0646\u064A\u0629 \u0645\u062A\u0628\u0642\u064A\u0629)`,recommendation:null};return this._backendTestCache={timestamp:Date.now(),result:o},o}else typeof GoogleIntegration._closeCircuitBreaker=="function"&&GoogleIntegration._closeCircuitBreaker()}const e=performance.now();try{const a=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"testConnection",data:{}}),2e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644"),o=performance.now()-e;if(a&&a.success===!0){const d={name:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",passed:!0,duration:o,severity:null,message:`\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u064A\u0639\u0645\u0644 \u0628\u0646\u062C\u0627\u062D (${o.toFixed(0)}ms)`,recommendation:null};return this._backendTestCache={timestamp:Date.now(),result:d},d}else{const d=a?.message||"\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629",r={name:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",passed:!1,duration:o,severity:"medium",message:d,recommendation:`\u062A\u062D\u0642\u0642 \u0645\u0646:
1. \u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Integration
2. \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A
3. \u0623\u0646 Google Apps Script \u0645\u0646\u0634\u0648\u0631 \u0648\u0645\u0641\u0639\u0651\u0644`};return this._backendTestCache={timestamp:Date.now(),result:r},r}}catch(a){const o=performance.now()-e;let l="\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u062D\u0627\u0644\u064A\u0627\u064B - \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629",d=null;const r=a.message||a.toString()||"";r.includes("Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0644")||r.includes("\u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")?l="Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644 - \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629":r.includes("Circuit Breaker \u0645\u0641\u062A\u0648\u062D")||r.includes("Circuit Breaker")?l="Circuit Breaker \u0645\u0641\u062A\u0648\u062D - \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 (\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F 30 \u062B\u0627\u0646\u064A\u0629)":r.includes("Timeout")||r.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629")?l="\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 (Timeout) - \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629":r.includes("Failed to fetch")||r.includes("NetworkError")||r.includes("CORS")?l="\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 (Network/CORS) - \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629":r.includes("URL \u063A\u064A\u0631 \u0645\u0639\u0631\u0641")||r.includes("\u063A\u064A\u0631 \u0635\u062D\u064A\u062D")?l="\u0631\u0627\u0628\u0637 Google Apps Script \u063A\u064A\u0631 \u0635\u062D\u064A\u062D - \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629":l=`\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629: ${r}`;const m={name:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",passed:!0,duration:o,severity:null,message:l,recommendation:d};return this._backendTestCache={timestamp:Date.now(),result:m},m}}catch(i){const n={name:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",passed:!0,severity:null,message:`\u062A\u0639\u0630\u0631 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629: ${i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"} (\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629)`,recommendation:null};return this._backendTestCache={timestamp:Date.now(),result:n},n}},async testModuleUI(t,s){try{if(!s){const a=this.getModuleObjectName(t);s=window[a]}const i=[`${t}-section`,`${t.replace(/-/g,"")}-section`],n={actiontrackingregister:["action-tracking-section"],fireequipment:["fire-equipment-section"],periodicinspections:["periodic-inspections-section"],behaviormonitoring:["behavior-monitoring-section"],chemicalsafety:["chemical-safety-section"],dailyobservations:["daily-observations-section"],safetybudget:["safety-budget-section"],safetyperformancekpis:["safety-performance-kpis-section"],riskassessment:["risk-assessment-section"],legaldocuments:["legal-documents-section"],safetyhealthmanagement:["safety-health-management-section"],usertasks:["user-tasks-section"],sopjha:["sop-jha-section"],aiassistant:["ai-assistant-section"],useraiassistant:["useraiassistant-section"]};n[t]&&i.push(...n[t]);let e=null;for(const a of i)if(e=document.getElementById(a),e)break;if(!e)return{name:"\u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629",passed:!1,severity:"medium",message:`\u0642\u0633\u0645 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM (\u062C\u0631\u0628: ${i.join(" \u0623\u0648 ")})`,recommendation:"\u0625\u0636\u0627\u0641\u0629 \u0642\u0633\u0645 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0641\u064A index.html"};if(s&&typeof s.load=="function")try{const a=e.innerHTML,o=e.style.display,l=e.style.visibility,d=(e.innerHTML||"").trim().length>30||e.children&&e.children.length>0;e.style.display="block",e.style.visibility="visible",await Utils.promiseWithTimeout(s.load(),15e3,()=>new Error("Timeout: module.load took too long"));let r=!1,m=0;const u=6;for(;m<u&&!r;){if(await new Promise(f=>setTimeout(f,500)),r=e.innerHTML.trim().length>100,!r){const f=e.querySelector(".section-header, h1, h2, .section-title"),g=e.querySelector(".content-card, .card-body, .mt-6"),c=e.querySelector("button, .btn-primary, .btn-secondary");r=!!(f||g||c)}m++}const p=["useraiassistant","aiassistant"].includes(t);return o?e.style.display=o:e.style.display="",l?e.style.visibility=l:e.style.visibility="",e.innerHTML=a,!r&&p?{name:"\u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629",passed:!0,severity:null,message:"\u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u062A\u0639\u0631\u0636 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D (\u0645\u0648\u062F\u064A\u0648\u0644 \u0639\u0627\u0626\u0645)",recommendation:null}:{name:"\u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629",passed:r||d,severity:r||d?null:"medium",message:r?"\u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u062A\u0639\u0631\u0636 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D":d?"\u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u062A\u0639\u0631\u0636 (\u0645\u062D\u062A\u0648\u0649 \u062B\u0627\u0628\u062A/\u0642\u0627\u0644\u0628 \u0645\u0633\u0628\u0642)":"\u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0641\u0627\u0631\u063A\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0645\u064A\u0644",recommendation:r?null:"\u062A\u062D\u0642\u0642 \u0645\u0646 \u062F\u0627\u0644\u0629 load \u0641\u064A \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644"}}catch(a){return e&&(e.style.display="",e.style.visibility=""),{name:"\u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629",passed:!1,severity:"critical",message:`\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0648\u0627\u062C\u0647\u0629: ${a.message}`,recommendation:"\u062A\u062D\u0642\u0642 \u0645\u0646 \u062F\u0627\u0644\u0629 load \u0641\u064A \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644"}}else return{name:"\u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629",passed:!1,severity:"medium",message:"\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u062F\u0627\u0644\u0629 load",recommendation:"\u0625\u0636\u0627\u0641\u0629 \u062F\u0627\u0644\u0629 load \u0644\u0644\u0645\u0648\u062F\u064A\u0648\u0644"}}catch(i){return{name:"\u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629",passed:!1,severity:"critical",message:`\u062E\u0637\u0623 \u0639\u0627\u0645: ${i.message}`,recommendation:"\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644"}}},async testPermissions(t,s){try{return typeof Permissions>"u"?{name:"\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A",passed:!0,severity:null,message:"\u0646\u0638\u0627\u0645 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D",recommendation:"\u0625\u0636\u0627\u0641\u0629 \u0646\u0638\u0627\u0645 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"}:s&&typeof s.load=="function"?{name:"\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A",passed:!0,severity:null,message:"\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0645\u062A\u0627\u062D",recommendation:null}:{name:"\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A",passed:!0,severity:null,message:"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A (\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F)",recommendation:null}}catch(i){return{name:"\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A",passed:!1,severity:"low",message:`\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A: ${i.message}`,recommendation:"\u062A\u062D\u0642\u0642 \u0645\u0646 \u0646\u0638\u0627\u0645 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A"}}},async testSpecialFeatures(t,s){const i=[];return s&&((t.includes("qr")||typeof s.generateQR=="function")&&i.push("QR Code"),(typeof s.uploadFile=="function"||typeof s.handleFileUpload=="function")&&i.push("\u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641\u0627\u062A"),(typeof s.exportToPDF=="function"||typeof s.generatePDF=="function")&&i.push("\u062A\u0635\u062F\u064A\u0631 PDF"),(typeof s.exportToExcel=="function"||typeof s.generateExcel=="function")&&i.push("\u062A\u0635\u062F\u064A\u0631 Excel")),{name:"\u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629",passed:!0,severity:null,message:i.length>0?`\u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629: ${i.join(", ")}`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u064A\u0632\u0627\u062A \u062E\u0627\u0635\u0629 \u0645\u062D\u062F\u062F\u0629",recommendation:null}},showProgressScreen(){const t=document.getElementById("test-results-container");t&&(t.innerHTML=`
                <div class="text-center py-8">
                    <div style="width: 200px; margin: 0 auto 12px;">
                        <div style="width: 100%; height: 4px; background: rgba(59, 130, 246, 0.2); border-radius: 2px; overflow: hidden;">
                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 2px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                        </div>
                    </div>
                    <p class="text-gray-700 font-medium">\u062C\u0627\u0631\u064A \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A...</p>
                    <p class="text-sm text-gray-500 mt-2" id="test-progress-text">0 / 0</p>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mt-4 max-w-md mx-auto">
                        <div id="test-progress-bar" class="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                </div>
            `)},updateProgress(){const t=this.getModulesList().length,s=this.testResults.length,i=s/t*100,n=document.getElementById("test-progress-bar"),e=document.getElementById("test-progress-text");n&&(n.style.width=`${i}%`),e&&(e.textContent=`${s} / ${t}`)},hideProgressScreen(){},renderTestResults(){const t=document.getElementById("test-results-container");if(!t)return;if(this.testResults.length===0){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-vial text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0634\u063A\u064A\u0644 \u0623\u064A \u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u0639\u062F</p>
                </div>
            `;return}let s='<div class="space-y-4">';this.testResults.forEach((e,a)=>{const o={success:'<i class="fas fa-check-circle text-green-600"></i>',warning:'<i class="fas fa-exclamation-triangle text-yellow-600"></i>',critical:'<i class="fas fa-times-circle text-red-600"></i>',info:'<i class="fas fa-info-circle text-blue-600"></i>',error:'<i class="fas fa-exclamation-circle text-red-600"></i>',pending:'<i class="fas fa-clock text-gray-400"></i>'}[e.status]||'<i class="fas fa-question-circle text-gray-400"></i>',l={success:"green",warning:"yellow",critical:"red",info:"blue",error:"red",pending:"gray"}[e.status]||"gray",d=e.issues.filter(u=>u.severity==="critical").length,r=e.issues.filter(u=>u.severity==="medium").length,m=e.issues.filter(u=>u.severity==="low").length;s+=`
                <div class="border rounded-lg p-4 ${e.status==="critical"?"border-red-300 bg-red-50":e.status==="warning"?"border-yellow-300 bg-yellow-50":"border-gray-200"}">
                    <div class="flex items-start justify-between">
                        <div class="flex items-start gap-3 flex-1">
                            <div class="text-2xl mt-1">${o}</div>
                            <div class="flex-1">
                                <h3 class="font-semibold text-lg text-gray-800">${e.displayName}</h3>
                                <p class="text-sm text-gray-500 mt-1">
                                    ${new Date(e.timestamp).toLocaleString("ar-SA")}
                                </p>
                                <div class="mt-2 flex items-center gap-4 text-sm">
                                    <span class="text-gray-600">
                                        <i class="fas fa-clock ml-1"></i>
                                        ${e.loadingTime>0?e.loadingTime.toFixed(0)+"ms":"N/A"}
                                    </span>
                                    ${d>0?`<span class="text-red-600"><i class="fas fa-exclamation-circle ml-1"></i> ${d} \u062D\u0631\u062C\u0629</span>`:""}
                                    ${r>0?`<span class="text-yellow-600"><i class="fas fa-exclamation-triangle ml-1"></i> ${r} \u0645\u062A\u0648\u0633\u0637\u0629</span>`:""}
                                    ${m>0?`<span class="text-blue-600"><i class="fas fa-info-circle ml-1"></i> ${m} \u0645\u0646\u062E\u0641\u0636\u0629</span>`:""}
                                </div>
                            </div>
                        </div>
                        <button 
                            class="btn-secondary btn-sm" 
                            onclick="AppTester.toggleTestDetails(${a})"
                        >
                            <i class="fas fa-chevron-down ml-1" id="toggle-icon-${a}"></i>
                            \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                        </button>
                    </div>
                    
                    <div id="test-details-${a}" class="hidden mt-4 pt-4 border-t border-gray-200">
                        <div class="space-y-3">
                            ${e.tests.map(u=>`
                                <div class="flex items-start gap-3 p-2 rounded ${u.passed?"bg-green-50":u.severity==="critical"?"bg-red-50":u.severity==="medium"?"bg-yellow-50":"bg-blue-50"}">
                                    <div class="mt-1">
                                        ${u.passed?'<i class="fas fa-check text-green-600"></i>':'<i class="fas fa-times text-red-600"></i>'}
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-medium text-sm">${u.name}</p>
                                        <p class="text-xs text-gray-600 mt-1">${u.message}</p>
                                        ${u.recommendation?`<p class="text-xs text-blue-600 mt-1"><i class="fas fa-lightbulb ml-1"></i> ${u.recommendation}</p>`:""}
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
            `}),s+="</div>",t.innerHTML=s;const i=document.getElementById("export-pdf-btn"),n=document.getElementById("send-report-btn");i&&(i.disabled=!1),n&&(n.disabled=!1)},toggleTestDetails(t){const s=document.getElementById(`test-details-${t}`),i=document.getElementById(`toggle-icon-${t}`);s&&(s.classList.toggle("hidden"),i&&(s.classList.contains("hidden")?i.className="fas fa-chevron-down ml-1":i.className="fas fa-chevron-up ml-1"))},updateDashboard(){if(this.testResults.length===0)return;const t=this.testResults[this.testResults.length-1],s=this.testResults.flatMap(l=>l.issues),i=s.filter(l=>l.severity==="critical"),n=i.length>0,e=document.getElementById("last-test-stats");e&&(e.innerHTML=`
                <p class="text-sm text-gray-600">${new Date(t.timestamp).toLocaleString("ar-SA")}</p>
                <p class="text-lg font-semibold mt-2 ${t.status==="success"?"text-green-600":t.status==="critical"?"text-red-600":"text-yellow-600"}">
                    ${t.status==="success"?"\u0646\u062C\u062D":t.status==="critical"?"\u0641\u0634\u0644":"\u062A\u062D\u0630\u064A\u0631"}
                </p>
            `);const a=document.getElementById("critical-issues-count");a&&(a.innerHTML=`<span class="text-3xl font-bold text-red-600">${i.length}</span>`);const o=document.getElementById("overall-status");if(o){const l=n?"\u062D\u0631\u062C\u0629":i.length===0&&s.length===0?"\u0645\u0645\u062A\u0627\u0632":"\u062C\u064A\u062F",d=n?"red":i.length===0&&s.length===0?"green":"yellow";o.innerHTML=`<span class="text-3xl font-bold text-${d}-600">${l}</span>`}},saveTestResults(){try{const t=JSON.parse(localStorage.getItem("appTesterHistory")||"[]");t.push({timestamp:new Date().toISOString(),results:this.testResults}),t.length>50&&t.shift(),localStorage.setItem("appTesterHistory",JSON.stringify(t))}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631:",t)}},exportToJSON(){try{const t={exportedAt:new Date().toISOString(),results:Array.isArray(this.testResults)?this.testResults:[]};if(!t.results.length){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}try{localStorage.setItem("appTesterLastExport",JSON.stringify(t))}catch{}const s=JSON.stringify(t,null,2),i=new Blob([s],{type:"application/json;charset=utf-8"}),n=URL.createObjectURL(i),e=document.createElement("a"),a=t.exportedAt.replace(/[:.]/g,"-");e.href=n,e.download=`apptester-results-${a}.json`,document.body.appendChild(e),e.click(),e.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 (JSON)")}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 JSON:",t),Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 JSON")}},loadTestHistory(){try{const t=JSON.parse(localStorage.getItem("appTesterHistory")||"[]");if(t.length>0){const s=t[t.length-1];this.testResults=s.results||[],this.renderTestResults(),this.updateDashboard()}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A:",t)}},async exportToPDF(){if(this.testResults.length===0){typeof Notification<"u"&&Notification.warning?Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0644\u062A\u0635\u062F\u064A\u0631"):window.UI&&window.UI.showNotification&&window.UI.showNotification("\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0644\u062A\u0635\u062F\u064A\u0631","warning");return}try{this.exportToPDFAlternative()}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),typeof Notification<"u"&&Notification.error?Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+t.message):window.UI&&window.UI.showNotification&&window.UI.showNotification("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF","error")}},exportToPDFAlternative(){const t=window.open("","_blank");if(!t){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631");return}const s=this.generateReportHTML();t.document.open(),t.document.write(s),t.document.close(),t.onload=()=>{setTimeout(()=>{t.print(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},1e3)}},generateReportHTML(){const t=this.testResults.flatMap(e=>e.issues),s=t.filter(e=>e.severity==="critical"),i=t.filter(e=>e.severity==="medium"),n=t.filter(e=>e.severity==="low");return`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>\u062A\u0642\u0631\u064A\u0631 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062A\u0637\u0628\u064A\u0642</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
                <style>
                    * { font-family: 'Cairo', 'Arial', 'Tahoma', sans-serif !important; }
                    body { font-family: 'Cairo', 'Arial', 'Tahoma', sans-serif; padding: 20px; direction: rtl; text-align: right; }
                    h1 { color: #2563eb; text-align: center; font-family: 'Cairo', 'Arial', sans-serif; }
                    h2 { color: #1e40af; border-bottom: 2px solid #2563eb; padding-bottom: 10px; font-family: 'Cairo', 'Arial', sans-serif; }
                    h3 { font-family: 'Cairo', 'Arial', sans-serif; }
                    .summary { background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0; }
                    .module { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
                    .issue { margin: 10px 0; padding: 10px; background: #fef2f2; border-right: 4px solid #dc2626; }
                    .issue.medium { background: #fffbeb; border-right-color: #f59e0b; }
                    .issue.low { background: #eff6ff; border-right-color: #3b82f6; }
                    p, span, div, td, th { font-family: 'Cairo', 'Arial', 'Tahoma', sans-serif; }
                </style>
            </head>
            <body>
                <h1>\u062A\u0642\u0631\u064A\u0631 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062A\u0637\u0628\u064A\u0642</h1>
                <p style="text-align: center;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631: ${new Date().toLocaleString("ar-SA")}</p>
                
                <div class="summary">
                    <h2>\u0645\u0644\u062E\u0635 \u0627\u0644\u0646\u062A\u0627\u0626\u062C</h2>
                    <p>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0628\u0631\u0629: ${this.testResults.length}</p>
                    <p>\u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u062D\u0631\u062C\u0629: <strong style="color: #dc2626;">${s.length}</strong></p>
                    <p>\u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u0645\u062A\u0648\u0633\u0637\u0629: <strong style="color: #f59e0b;">${i.length}</strong></p>
                    <p>\u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u0645\u0646\u062E\u0641\u0636\u0629: <strong style="color: #3b82f6;">${n.length}</strong></p>
                </div>
                
                ${this.testResults.map(e=>`
                    <div class="module">
                        <h2>${e.displayName}</h2>
                        <p><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> ${e.status}</p>
                        <p><strong>\u0648\u0642\u062A \u0627\u0644\u062A\u062D\u0645\u064A\u0644:</strong> ${e.loadingTime>0?e.loadingTime.toFixed(0)+"ms":"N/A"}</p>
                        ${e.issues.length>0?`
                            <h3>\u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u0645\u0643\u062A\u0634\u0641\u0629:</h3>
                            ${e.issues.map(a=>`
                                <div class="issue ${a.severity}">
                                    <p><strong>${a.test}:</strong> ${a.message}</p>
                                    ${a.recommendation?`<p><em>\u0627\u0644\u062A\u0648\u0635\u064A\u0629: ${a.recommendation}</em></p>`:""}
                                </div>
                            `).join("")}
                        `:'<p style="color: green;">\u2713 \u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0634\u0627\u0643\u0644</p>'}
                    </div>
                `).join("")}
            </body>
            </html>
        `},async sendReportToAdmin(){if(this.testResults.length===0){typeof Notification<"u"&&Notification.warning?Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0644\u0625\u0631\u0633\u0627\u0644"):window.UI&&window.UI.showNotification&&window.UI.showNotification("\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0644\u0625\u0631\u0633\u0627\u0644","warning");return}try{typeof Loading<"u"&&typeof Loading.show=="function"&&Loading.show();const t={timestamp:new Date().toISOString(),results:this.testResults,summary:this.generateSummary(),reportHTML:this.generateReportHTML()};if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const s=await GoogleIntegration.sendRequest({action:"saveTestReport",data:t});if(s&&s.success)typeof Notification<"u"&&Notification.success?Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D"):window.UI&&window.UI.showNotification&&window.UI.showNotification("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0628\u0646\u062C\u0627\u062D","success");else throw new Error(s?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")}catch(s){Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0639\u0628\u0631 GoogleIntegration\u060C \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0637\u0631\u064A\u0642\u0629 \u0628\u062F\u064A\u0644\u0629:",s),await this.sendReportAlternative(t)}else await this.sendReportAlternative(t)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631:",t),typeof Notification<"u"&&Notification.error?Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+t.message):window.UI&&window.UI.showNotification&&window.UI.showNotification("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631","error")}finally{typeof Loading<"u"&&typeof Loading.hide=="function"&&Loading.hide()}},async sendReportAlternative(t){try{if(navigator.clipboard&&navigator.clipboard.writeText){const s=JSON.stringify(t,null,2);await navigator.clipboard.writeText(s),typeof Notification<"u"&&Notification.success?Notification.success("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0625\u0644\u0649 \u0627\u0644\u062D\u0627\u0641\u0638\u0629. \u064A\u0645\u0643\u0646\u0643 \u0644\u0635\u0642\u0647 \u0641\u064A \u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0623\u0648 \u0645\u0633\u062A\u0646\u062F"):window.UI&&window.UI.showNotification&&window.UI.showNotification("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0625\u0644\u0649 \u0627\u0644\u062D\u0627\u0641\u0638\u0629","success")}else try{const s=JSON.parse(localStorage.getItem("appTesterReports")||"[]");s.push(t),s.length>10&&s.shift(),localStorage.setItem("appTesterReports",JSON.stringify(s)),typeof Notification<"u"&&Notification.success?Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u0645\u0643\u0646\u0643 \u062A\u0635\u062F\u064A\u0631\u0647 \u0644\u0627\u062D\u0642\u0627\u064B"):window.UI&&window.UI.showNotification&&window.UI.showNotification("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0645\u062D\u0644\u064A\u0627\u064B","success")}catch{throw new Error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")}}catch(s){throw s}},generateSummary(){const t=this.testResults.flatMap(e=>e.issues),s=t.filter(e=>e.severity==="critical"),i=t.filter(e=>e.severity==="medium"),n=t.filter(e=>e.severity==="low");return{totalModules:this.testResults.length,passedModules:this.testResults.filter(e=>e.status==="success").length,failedModules:this.testResults.filter(e=>e.status==="critical").length,criticalIssues:s.length,mediumIssues:i.length,lowIssues:n.length,averageLoadingTime:this.testResults.filter(e=>e.loadingTime>0).reduce((e,a)=>e+a.loadingTime,0)/this.testResults.filter(e=>e.loadingTime>0).length||0}},showSettings(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">\u0627\u0644\u062C\u062F\u0648\u0644\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629</label>
                        <div class="flex items-center gap-3 mb-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    id="auto-schedule-enabled" 
                                    ${this.testConfig.autoSchedule.enabled?"checked":""}
                                    class="form-checkbox"
                                >
                                <span>\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062C\u062F\u0648\u0644\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629</span>
                            </label>
                        </div>
                    </div>

                    <div id="schedule-options" style="${this.testConfig.autoSchedule.enabled?"":"display: none;"}">
                        <div class="form-group">
                            <label class="form-label">\u0627\u0644\u062A\u0643\u0631\u0627\u0631</label>
                            <select id="schedule-frequency" class="form-input">
                                <option value="daily" ${this.testConfig.autoSchedule.frequency==="daily"?"selected":""}>\u064A\u0648\u0645\u064A\u0627\u064B</option>
                                <option value="weekly" ${this.testConfig.autoSchedule.frequency==="weekly"?"selected":""}>\u0623\u0633\u0628\u0648\u0639\u064A\u0627\u064B</option>
                                <option value="onUpdate" ${this.testConfig.autoSchedule.frequency==="onUpdate"?"selected":""}>\u0639\u0646\u062F \u0646\u0634\u0631 \u062A\u062D\u062F\u064A\u062B \u062C\u062F\u064A\u062F</option>
                            </select>
                        </div>

                        <div class="form-group" id="schedule-time-group" style="${this.testConfig.autoSchedule.frequency==="onUpdate"?"display: none;":""}">
                            <label class="form-label">\u0648\u0642\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644</label>
                            <input 
                                type="time" 
                                id="schedule-time" 
                                class="form-input"
                                value="${this.testConfig.autoSchedule.time}"
                            >
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">\u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 (\u0628\u0627\u0644\u062B\u0648\u0627\u0646\u064A)</label>
                        <input 
                            type="number" 
                            id="test-timeout" 
                            class="form-input"
                            value="${this.testConfig.timeout/1e3}"
                            min="10"
                            max="300"
                        >
                    </div>

                    <div class="form-group">
                        <label class="form-label">\u0639\u062F\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0627\u062A \u0639\u0646\u062F \u0627\u0644\u0641\u0634\u0644</label>
                        <input 
                            type="number" 
                            id="test-retry-count" 
                            class="form-input"
                            value="${this.testConfig.retryCount}"
                            min="0"
                            max="5"
                        >
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button class="btn-primary" onclick="AppTester.saveSettings()">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t);const s=document.getElementById("auto-schedule-enabled"),i=document.getElementById("schedule-options"),n=document.getElementById("schedule-frequency"),e=document.getElementById("schedule-time-group");s.addEventListener("change",a=>{i.style.display=a.target.checked?"block":"none"}),n.addEventListener("change",a=>{e.style.display=a.target.value==="onUpdate"?"none":"block"})},saveSettings(){const t=document.getElementById("auto-schedule-enabled").checked,s=document.getElementById("schedule-frequency").value,i=document.getElementById("schedule-time").value,n=parseInt(document.getElementById("test-timeout").value)*1e3,e=parseInt(document.getElementById("test-retry-count").value);this.testConfig.autoSchedule.enabled=t,this.testConfig.autoSchedule.frequency=s,this.testConfig.autoSchedule.time=i,this.testConfig.timeout=n,this.testConfig.retryCount=e;try{localStorage.setItem("appTesterConfig",JSON.stringify(this.testConfig))}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",a)}this.initializeScheduler(),document.querySelector(".modal-overlay")?.remove(),window.UI&&window.UI.showNotification&&window.UI.showNotification("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D","success")},initializeScheduler(){this.scheduledTests&&(clearTimeout(this.scheduledTests),this.scheduledTests=null);try{const t=localStorage.getItem("appTesterConfig");t&&(this.testConfig={...this.testConfig,...JSON.parse(t)})}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631:",t)}this.testConfig.autoSchedule.enabled&&(this.testConfig.autoSchedule.frequency==="onUpdate"?this.setupUpdateListener():this.scheduleNextTest())},scheduleNextTest(){if(this.testConfig.autoSchedule.frequency==="onUpdate")return;const t=new Date,[s,i]=this.testConfig.autoSchedule.time.split(":").map(Number),n=new Date;n.setHours(s,i,0,0),this.testConfig.autoSchedule.frequency==="weekly"?n.setDate(n.getDate()+7):n<=t&&n.setDate(n.getDate()+1);const e=n.getTime()-t.getTime();if(e<=0){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0648\u0642\u062A \u0627\u0644\u062C\u062F\u0648\u0644\u0629");return}AppState?.debugMode&&Utils?.safeLog(`\u{1F4C5} \u062A\u0645 \u062C\u062F\u0648\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062A\u0627\u0644\u064A: ${n.toLocaleString("ar-SA")}`),this.scheduledTests=setTimeout(()=>{this.runFullTest(),this.scheduleNextTest()},e)},setupUpdateListener(){document.addEventListener("app-updated",()=>{AppState?.debugMode&&Utils?.safeLog("\u{1F504} \u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u062A\u062D\u062F\u064A\u062B \u062C\u062F\u064A\u062F - \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631..."),this.runFullTest()}),"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("controllerchange",()=>{AppState?.debugMode&&Utils?.safeLog("\u{1F504} \u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u062A\u062D\u062F\u064A\u062B service worker - \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631..."),setTimeout(()=>{this.runFullTest()},5e3)})}};(function(){"use strict";try{typeof window<"u"&&typeof AppTester<"u"&&(window.AppTester=AppTester,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 AppTester module loaded and available on window.AppTester"))}catch{if(typeof window<"u"&&typeof AppTester<"u")try{window.AppTester=AppTester}catch{}}})();
