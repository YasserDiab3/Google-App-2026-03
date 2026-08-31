const ActionTrackingRegister={settings:null,currentView:"register",async load(){if(typeof Utils>"u")return;const e=document.getElementById("action-tracking-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 action-tracking-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}if(typeof AppState>"u"){e.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</p>
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
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-clipboard-list-check ml-3"></i>
                                \u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A
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
            `,AppState.appData||(AppState.appData={}),AppState.appData.actionTracking||(AppState.appData.actionTracking=[]),this.settings=this.getDefaultSettings(),this.loadSettings().catch(()=>{this.settings=this.getDefaultSettings()});const t=typeof i18n<"u"&&i18n.translate?i18n.translate("action.title"):"\u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A",s=typeof i18n<"u"&&i18n.translate?i18n.translate("action.subtitle"):"\u0646\u0638\u0627\u0645 \u0645\u062A\u0642\u062F\u0645 \u0644\u0625\u062F\u0627\u0631\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0648\u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629";e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-clipboard-list-check ml-3"></i>
                            ${t}
                        </h1>
                        <p class="section-subtitle">${s}</p>
                    </div>
                    <div class="flex gap-2">
                        ${this.hasSettingsPermission()?`
                            <button id="action-settings-btn" class="btn-secondary">
                                <i class="fas fa-cog ml-2"></i>
                                \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                            </button>
                        `:""}
                        <button id="add-action-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Navigation Tabs -->
            <div class="mt-6">
                <div class="action-tabs-container">
                    <button class="action-tab-btn active" data-tab="register" onclick="ActionTrackingRegister.switchView('register')">
                        <i class="fas fa-list ml-2"></i>\u0627\u0644\u0633\u062C\u0644
                    </button>
                    ${this.hasSettingsPermission()?`
                        <button class="action-tab-btn" data-tab="settings" onclick="ActionTrackingRegister.switchView('settings')">
                            <i class="fas fa-cog ml-2"></i>\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                        </button>
                    `:""}
                </div>
            </div>
            
            <div id="action-content-area" class="mt-6">
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
            `,this.setupEventListeners(),setTimeout(async()=>{try{const a=document.getElementById("action-content-area");if(!a)return;const n=await this.renderRegister().catch(l=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0633\u062C\u0644:",l),`
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                        <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                        <button onclick="ActionTrackingRegister.load()" class="btn-primary">
                                            <i class="fas fa-redo ml-2"></i>
                                            \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `));a.innerHTML=n,this.setupEventListeners(),this.loadKPIs().catch(()=>{}),this.loadActionList().catch(()=>{})}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644:",a)}},0)}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A:",t),e.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-clipboard-list-check ml-3"></i>
                            \u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A
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
                                <button onclick="ActionTrackingRegister.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",{duration:5e3})}},isAdmin(){const e=AppState.currentUser;return e&&(e.role==="admin"||e.role==="safety_officer")},hasSettingsPermission(){const e=AppState.currentUser;if(!e)return!1;const t=(e.role||"").toLowerCase();if(["admin","safety_officer","manager"].includes(t))return!0;let a=e.permissions||{};if(typeof a=="string")try{a=JSON.parse(a)}catch{a={}}return a["action-tracking-settings"]===!0||a.admin===!0||a["manage-settings"]===!0},async loadSettings(){if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){this.settings=this.getDefaultSettings();return}if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"){this.settings=this.getDefaultSettings();return}try{const t=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"getActionTrackingSettings",data:{}}),6e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645");t&&t.success&&t.data?this.settings=t.data:this.settings=this.getDefaultSettings()}catch(e){const t=e?.message||"";!t.includes("\u062E\u0627\u062F\u0645 SQL")&&!t.includes("\u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")&&!t.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A Action Tracking:",e),this.settings=this.getDefaultSettings()}},getDefaultSettings(){return{typeOfIssueList:["Observations","Incidents","NearMiss","Inspections","ManagementReviews","Audits","Other"],classificationList:["Safety Violation","Environmental Issue","Health Concern","Process Deviation","Equipment Failure","Training Gap","Documentation Issue","Other"],rootCauseList:["Lack of Training","Inadequate Procedures","Equipment Failure","Human Error","Management System Failure","Environmental Factors","Communication Gap","Other"],typeClassificationMapping:{Observations:["Safety Violation","Environmental Issue","Health Concern","Process Deviation","Other"],Incidents:["Safety Violation","Equipment Failure","Health Concern","Other"],NearMiss:["Safety Violation","Process Deviation","Equipment Failure","Other"],Inspections:["Safety Violation","Equipment Failure","Process Deviation","Documentation Issue","Other"],ManagementReviews:["Process Deviation","Documentation Issue","Training Gap","Other"]},classificationRootCauseMapping:{"Safety Violation":["Lack of Training","Inadequate Procedures","Human Error","Management System Failure","Other"],"Environmental Issue":["Inadequate Procedures","Equipment Failure","Environmental Factors","Other"],"Health Concern":["Lack of Training","Inadequate Procedures","Environmental Factors","Other"],"Process Deviation":["Inadequate Procedures","Management System Failure","Communication Gap","Other"],"Equipment Failure":["Equipment Failure","Inadequate Procedures","Other"],"Training Gap":["Lack of Training","Management System Failure","Other"],"Documentation Issue":["Inadequate Procedures","Management System Failure","Communication Gap","Other"]},statusList:["Open","In Progress","Closed","Overdue"],riskRatingList:["Low","Medium","High","Critical"],departmentList:["Production","Maintenance","Quality","Safety","HR","Admin","Other"],locationList:["Factory A","Factory B","Warehouse","Office","Other"],responsibleList:[],shiftList:["Morning","Afternoon","Night"]}},switchView(e,t={}){if(this.currentView=e,e==="settings"&&!this.hasSettingsPermission()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0625\u0639\u062F\u0627\u062F\u0627\u062A Action Tracking. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u062E\u0627\u0635\u0629.");return}document.querySelectorAll(".action-tab-btn").forEach(a=>{a.classList.remove("active"),a.dataset.tab===e&&a.classList.add("active")});const s=document.getElementById("action-content-area");if(s){if(e==="register")this.renderRegister().then(a=>{s.innerHTML=a,this.setupEventListeners(),this.loadKPIs(),this.loadActionList()});else if(e==="settings"){if(!this.hasSettingsPermission()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}this.renderSettings().then(a=>{s.innerHTML=a,setTimeout(()=>{this.setupSettingsEvents()},100)})}}},async renderRegister(){const e={total:0,open:0,inProgress:0,closed:0,overdue:0};let t="";try{t=await this.renderList()}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A:",s),t=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <button onclick="ActionTrackingRegister.load()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `}return`
            <!-- KPIs Cards - \u062B\u0627\u0628\u062A\u0629 \u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 -->
            <div id="action-kpis-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                ${this.renderKPIsHTML(e)}
            </div>
            
            <!-- Filters and Register -->
            ${t}
        `},async loadKPIs(){if(!document.getElementById("action-kpis-container"))return;const s=(()=>{const a=AppState.appData?.actionTracking||[];return{total:a.length,open:a.filter(n=>n.status==="Open"||n.status==="\u0645\u0641\u062A\u0648\u062D").length,inProgress:a.filter(n=>n.status==="In Progress"||n.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630").length,closed:a.filter(n=>n.status==="Closed"||n.status==="\u0645\u0643\u062A\u0645\u0644").length,overdue:a.filter(n=>n.status==="Closed"||n.status==="\u0645\u0643\u062A\u0645\u0644"?!1:n.dueDate?new Date(n.dueDate)<new Date:!1).length}})();this.renderKPIs(s),!(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl)&&(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"||Promise.resolve().then(async()=>{try{const n=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"getActionTrackingKPIs",data:{}}),3e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645");if(n&&n.success&&n.data){const l=n.data;document.getElementById("action-kpis-container")&&this.renderKPIs(l)}}catch(a){const n=a?.message||"";!n.includes("\u062E\u0627\u062F\u0645 SQL")&&!n.includes("\u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")&&!n.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 KPIs:",a)}}).catch(()=>{}))},renderKPIsHTML(e){return e||(e={total:0,open:0,inProgress:0,closed:0,overdue:0}),`
            <div class="content-card" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; border: 2px solid #1e40af; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div class="flex items-center justify-between">
                    <div>
                        <p style="font-size: 14px; opacity: 0.95; color: #ffffff; margin-bottom: 8px;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</p>
                        <h3 id="kpi-total" style="font-size: 32px; font-weight: bold; color: #ffffff; margin: 0;">${e.total||0}</h3>
                    </div>
                    <i class="fas fa-clipboard-list" style="font-size: 48px; opacity: 0.7; color: #ffffff;"></i>
                </div>
            </div>
            <div class="content-card" style="background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); color: #ffffff; border: 2px solid #a16207; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div class="flex items-center justify-between">
                    <div>
                        <p style="font-size: 14px; opacity: 0.95; color: #ffffff; margin-bottom: 8px;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629</p>
                        <h3 id="kpi-open" style="font-size: 32px; font-weight: bold; color: #ffffff; margin: 0;">${e.open||0}</h3>
                    </div>
                    <i class="fas fa-folder-open" style="font-size: 48px; opacity: 0.7; color: #ffffff;"></i>
                </div>
            </div>
            <div class="content-card" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #ffffff; border: 2px solid #c2410c; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div class="flex items-center justify-between">
                    <div>
                        <p style="font-size: 14px; opacity: 0.95; color: #ffffff; margin-bottom: 8px;">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</p>
                        <h3 id="kpi-inprogress" style="font-size: 32px; font-weight: bold; color: #ffffff; margin: 0;">${e.inProgress||0}</h3>
                    </div>
                    <i class="fas fa-spinner" style="font-size: 48px; opacity: 0.7; color: #ffffff;"></i>
                </div>
            </div>
            <div class="content-card" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: #ffffff; border: 2px solid #b91c1c; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div class="flex items-center justify-between">
                    <div>
                        <p style="font-size: 14px; opacity: 0.95; color: #ffffff; margin-bottom: 8px;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u0623\u062E\u0631\u0629</p>
                        <h3 id="kpi-overdue" style="font-size: 32px; font-weight: bold; color: #ffffff; margin: 0;">${e.overdue||0}</h3>
                    </div>
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; opacity: 0.7; color: #ffffff;"></i>
                </div>
            </div>
            <div class="content-card" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; border: 2px solid #15803d; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div class="flex items-center justify-between">
                    <div>
                        <p style="font-size: 14px; opacity: 0.95; color: #ffffff; margin-bottom: 8px;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629</p>
                        <h3 id="kpi-closed" style="font-size: 32px; font-weight: bold; color: #ffffff; margin: 0;">${e.closed||0}</h3>
                    </div>
                    <i class="fas fa-check-circle" style="font-size: 48px; opacity: 0.7; color: #ffffff;"></i>
                </div>
            </div>
        `},renderKPIs(e){e||(e={total:0,open:0,inProgress:0,closed:0,overdue:0});const t=document.getElementById("kpi-total"),s=document.getElementById("kpi-open"),a=document.getElementById("kpi-inprogress"),n=document.getElementById("kpi-overdue"),l=document.getElementById("kpi-closed");t&&(t.textContent=e.total||0),s&&(s.textContent=e.open||0),a&&(a.textContent=e.inProgress||0),n&&(n.textContent=e.overdue||0),l&&(l.textContent=e.closed||0);const i=document.getElementById("action-kpis-container");i&&(!t||!s||!a||!n||!l)&&(i.innerHTML=this.renderKPIsHTML(e))},async renderList(){const e=this.settings||this.getDefaultSettings(),t=e.statusList||["Open","In Progress","Closed","Overdue"],s=e.typeOfIssueList||[],a=e.riskRatingList||[],n=e.departmentList||[],l=e.responsibleList||[];return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <h2 class="card-title"><i class="fas fa-list ml-2"></i>\u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</h2>
                        <div class="flex items-center gap-2 flex-wrap">
                            <input type="text" id="action-search" class="form-input" style="max-width: 250px;" placeholder="\u{1F50D} \u0627\u0644\u0628\u062D\u062B...">
                            <select id="action-filter-type" class="form-input" style="max-width: 180px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                                ${s.map(i=>`<option value="${Utils.escapeHTML(i)}">${Utils.escapeHTML(i)}</option>`).join("")}
                            </select>
                            <select id="action-filter-classification" class="form-input" style="max-width: 180px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A</option>
                            </select>
                            <select id="action-filter-status" class="form-input" style="max-width: 150px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                ${t.map(i=>`<option value="${Utils.escapeHTML(i)}">${Utils.escapeHTML(i)}</option>`).join("")}
                            </select>
                            <select id="action-filter-risk" class="form-input" style="max-width: 150px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A</option>
                                ${a.map(i=>`<option value="${Utils.escapeHTML(i)}">${Utils.escapeHTML(i)}</option>`).join("")}
                            </select>
                            <select id="action-filter-department" class="form-input" style="max-width: 150px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645</option>
                                ${n.map(i=>`<option value="${Utils.escapeHTML(i)}">${Utils.escapeHTML(i)}</option>`).join("")}
                            </select>
                            <select id="action-filter-responsible" class="form-input" style="max-width: 150px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0646</option>
                                ${l.map(i=>`<option value="${Utils.escapeHTML(i)}">${Utils.escapeHTML(i)}</option>`).join("")}
                            </select>
                            <input type="date" id="action-filter-date-from" class="form-input" style="max-width: 150px;" placeholder="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E">
                            <input type="date" id="action-filter-date-to" class="form-input" style="max-width: 150px;" placeholder="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E">
                            <button id="action-reset-filters" class="btn-secondary btn-sm">
                                <i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center justify-end gap-2 mt-4 pt-4 border-t">
                        <button id="action-print-all-btn" class="btn-secondary btn-sm" title="\u0637\u0628\u0627\u0639\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A">
                            <i class="fas fa-print ml-1"></i>\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0643\u0644
                        </button>
                        <div class="dropdown" style="position: relative;">
                            <button id="action-export-all-btn" class="btn-secondary btn-sm" title="\u062A\u0635\u062F\u064A\u0631 \u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A">
                                <i class="fas fa-file-export ml-1"></i>\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0643\u0644
                                <i class="fas fa-chevron-down mr-1" style="font-size: 10px;"></i>
                            </button>
                            <div class="dropdown-menu" id="action-export-all-menu" style="position: absolute; top: 100%; right: 0; margin-top: 4px; background: white; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); min-width: 150px; z-index: 1000; display: none;">
                                <a href="#" onclick="ActionTrackingRegister.exportAllToExcel(); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none; border-bottom: 1px solid #eee;">
                                    <i class="fas fa-file-excel ml-2" style="color: #1d6f42;"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                                </a>
                                <a href="#" onclick="ActionTrackingRegister.exportAllToPDF(); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none;">
                                    <i class="fas fa-file-pdf ml-2" style="color: #dc3545;"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="action-table-container">
                        <!-- \u0647\u064A\u0643\u0644 \u0627\u0644\u062C\u062F\u0648\u0644 \u062B\u0627\u0628\u062A \u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 -->
                        <div class="overflow-x-auto">
                            <table class="data-table table-header-orange">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                                        <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                                        <th>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>
                                        <th>\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062E\u0637\u0631</th>
                                        <th>\u0627\u0644\u0645\u0633\u0624\u0648\u0644</th>
                                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641</th>
                                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</th>
                                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody id="action-table-body">
                                    <tr>
                                        <td colspan="10" style="text-align: center; padding: 40px;">
                                            <div style="width: 300px; margin: 0 auto 16px;">
                                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                                </div>
                                            </div>
                                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadActionList(){const e=document.getElementById("action-table-body"),t=document.getElementById("action-table-container");if(!e&&!t)return;const s=AppState.appData.actionTracking||AppState.appData.actionTrackingRegister||[];s.length>0&&this.renderActionListItems(s,e);const a=AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl,n=typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function";a&&n&&Promise.resolve().then(async()=>{try{const i=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"getAllActionTracking",data:{}}),3e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645");if(i&&i.success&&Array.isArray(i.data)){AppState.appData.actionTracking=i.data,AppState.appData.actionTrackingRegister=i.data;const p=document.getElementById("action-table-body");p&&this.renderActionListItems(i.data,p)}}catch(l){const i=l?.message||"";!i.includes("\u062E\u0627\u062F\u0645 SQL")&&!i.includes("\u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")&&!i.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0646 Backend:",l)}}).catch(()=>{}),s.length===0&&(!a||!n)&&this.renderActionListItems([],e)},renderActionListItems(e,t){if(!t)return;const s=e||[],a=n=>{const l=(n||"").toLowerCase();return l.includes("overdue")||l.includes("\u0645\u062A\u0623\u062E\u0631")?"danger":l.includes("progress")||l.includes("\u062A\u0646\u0641\u064A\u0630")||l.includes("\u062C\u0627\u0631\u064A")?"warning":l.includes("closed")||l.includes("\u0645\u063A\u0644\u0642")||l.includes("\u0645\u0643\u062A\u0645\u0644")?"success":"info"};if(t){if(s.length===0){t.innerHTML=`
                    <tr>
                        <td colspan="10" style="text-align: center; padding: 40px;">
                            <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500 mb-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>
                            <button id="add-action-empty-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621 \u062C\u062F\u064A\u062F
                            </button>
                        </td>
                    </tr>
                `;const i=document.getElementById("add-action-empty-btn");i&&i.addEventListener("click",()=>this.showActionForm());return}const n=this.getFilters(),l=this.filterItems(s,n);if(l.length===0){t.innerHTML=`
                    <tr>
                        <td colspan="10" style="text-align: center; padding: 40px;">
                            <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0644\u0628\u062D\u062B</p>
                        </td>
                    </tr>
                `;return}t.innerHTML=l.map((i,p)=>{const o=i.originalTargetDate&&new Date(i.originalTargetDate)<new Date&&!(i.status||"").toLowerCase().includes("closed")&&!(i.status||"").toLowerCase().includes("\u0645\u063A\u0644\u0642"),m=o?"danger":a(i.status);return`
                    <tr class="${o?"bg-red-50":""}" style="${o?"background-color: #fef2f2;":""}">
                        <td>${Utils.escapeHTML(i.serialNumber||i.id||(p+1).toString())}</td>
                        <td>${i.issueDate?Utils.formatDate(i.issueDate):"-"}</td>
                        <td><span class="badge badge-info">${Utils.escapeHTML(i.typeOfIssue||"")}</span></td>
                        <td><span class="badge badge-secondary">${Utils.escapeHTML(i.observationClassification||"")}</span></td>
                        <td title="${Utils.escapeHTML(i.observationIssueHazard||"")}">
                            ${Utils.escapeHTML((i.observationIssueHazard||"").substring(0,40))}${(i.observationIssueHazard||"").length>40?"...":""}
                        </td>
                        <td>${Utils.escapeHTML(i.responsible||"")}</td>
                        <td class="${o?"text-red-600 font-bold":""}">
                            ${i.originalTargetDate?Utils.formatDate(i.originalTargetDate):"-"}
                            ${o?" \u26A0\uFE0F":""}
                        </td>
                        <td>
                            <span class="badge badge-${m}">
                                ${Utils.escapeHTML(i.status||"")}
                            </span>
                        </td>
                        <td>
                            <span class="badge badge-${(i.riskRating||"").toLowerCase()==="critical"||(i.riskRating||"").toLowerCase()==="high"?"danger":(i.riskRating||"").toLowerCase()==="medium"?"warning":"info"}">
                                ${Utils.escapeHTML(i.riskRating||"")}
                            </span>
                        </td>
                        <td>
                            <div class="flex gap-1">
                                <button onclick="ActionTrackingRegister.viewAction('${i.id}')" class="btn-icon btn-icon-primary" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <div class="dropdown" style="position: relative;">
                                    <button class="btn-icon btn-icon-secondary" title="\u0637\u0628\u0627\u0639\u0629 \u0648\u062A\u0635\u062F\u064A\u0631" style="position: relative;">
                                        <i class="fas fa-print"></i>
                                    </button>
                                    <div class="dropdown-menu" style="position: absolute; top: 100%; left: 0; margin-top: 4px; background: white; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); min-width: 180px; z-index: 1000; display: none;">
                                        <a href="#" onclick="ActionTrackingRegister.printAction('${i.id}'); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none; border-bottom: 1px solid #eee;">
                                            <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                                        </a>
                                        <a href="#" onclick="ActionTrackingRegister.exportActionToExcel('${i.id}'); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none; border-bottom: 1px solid #eee;">
                                            <i class="fas fa-file-excel ml-2" style="color: #1d6f42;"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                                        </a>
                                        <a href="#" onclick="ActionTrackingRegister.exportActionToPDF('${i.id}'); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none;">
                                            <i class="fas fa-file-pdf ml-2" style="color: #dc3545;"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                                        </a>
                                    </div>
                                </div>
                                <button onclick="ActionTrackingRegister.editEntry('${i.id}')" class="btn-icon btn-icon-info" title="\u062A\u0639\u062F\u064A\u0644">
                                    <i class="fas fa-edit"></i>
                                </button>
                                ${this.isAdmin()?`
                                    <button onclick="ActionTrackingRegister.deleteEntry('${i.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                `:""}
                            </div>
                        </td>
                    </tr>
                `}).join("");return}if(container){if(e.length===0){container.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>
                        <button id="add-action-empty-btn" class="btn-primary mt-4">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                `;const i=document.getElementById("add-action-empty-btn");i&&i.addEventListener("click",()=>this.showActionForm());return}const n=this.getFilters(),l=this.filterItems(e,n);if(l.length===0){container.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0644\u0628\u062D\u062B</p>
                    </div>
                `;return}container.innerHTML=`
                <div class="overflow-x-auto">
                    <table class="data-table table-header-orange">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                                <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                                <th>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>
                                <th>\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062E\u0637\u0631</th>
                                <th>\u0627\u0644\u0645\u0633\u0624\u0648\u0644</th>
                                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641</th>
                                <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</th>
                                <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${l.map((i,p)=>{const o=i.originalTargetDate&&new Date(i.originalTargetDate)<new Date&&!(i.status||"").toLowerCase().includes("closed")&&!(i.status||"").toLowerCase().includes("\u0645\u063A\u0644\u0642"),m=o?"danger":a(i.status);return`
                                <tr class="${o?"bg-red-50":""}" style="${o?"background-color: #fef2f2;":""}">
                                    <td>${Utils.escapeHTML(i.serialNumber||i.id||(p+1).toString())}</td>
                                    <td>${i.issueDate?Utils.formatDate(i.issueDate):"-"}</td>
                                    <td><span class="badge badge-info">${Utils.escapeHTML(i.typeOfIssue||"")}</span></td>
                                    <td><span class="badge badge-secondary">${Utils.escapeHTML(i.observationClassification||"")}</span></td>
                                    <td title="${Utils.escapeHTML(i.observationIssueHazard||"")}">
                                        ${Utils.escapeHTML((i.observationIssueHazard||"").substring(0,40))}${(i.observationIssueHazard||"").length>40?"...":""}
                                    </td>
                                    <td>${Utils.escapeHTML(i.responsible||"")}</td>
                                    <td class="${o?"text-red-600 font-bold":""}">
                                        ${i.originalTargetDate?Utils.formatDate(i.originalTargetDate):"-"}
                                        ${o?" \u26A0\uFE0F":""}
                                    </td>
                                    <td>
                                        <span class="badge badge-${m}">
                                            ${Utils.escapeHTML(i.status||"")}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge badge-${(i.riskRating||"").toLowerCase()==="critical"||(i.riskRating||"").toLowerCase()==="high"?"danger":(i.riskRating||"").toLowerCase()==="medium"?"warning":"info"}">
                                            ${Utils.escapeHTML(i.riskRating||"")}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex gap-1">
                                            <button onclick="ActionTrackingRegister.viewAction('${i.id}')" class="btn-icon btn-icon-primary" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <div class="dropdown" style="position: relative;">
                                                <button class="btn-icon btn-icon-secondary" title="\u0637\u0628\u0627\u0639\u0629 \u0648\u062A\u0635\u062F\u064A\u0631" style="position: relative;">
                                                    <i class="fas fa-print"></i>
                                                </button>
                                                <div class="dropdown-menu" style="position: absolute; top: 100%; left: 0; margin-top: 4px; background: white; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); min-width: 180px; z-index: 1000; display: none;">
                                                    <a href="#" onclick="ActionTrackingRegister.printAction('${i.id}'); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none; border-bottom: 1px solid #eee;">
                                                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                                                    </a>
                                                    <a href="#" onclick="ActionTrackingRegister.exportActionToExcel('${i.id}'); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none; border-bottom: 1px solid #eee;">
                                                        <i class="fas fa-file-excel ml-2" style="color: #1d6f42;"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                                                    </a>
                                                    <a href="#" onclick="ActionTrackingRegister.exportActionToPDF('${i.id}'); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none;">
                                                        <i class="fas fa-file-pdf ml-2" style="color: #dc3545;"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                                                    </a>
                                                </div>
                                            </div>
                                            <button onclick="ActionTrackingRegister.editEntry('${i.id}')" class="btn-icon btn-icon-info" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            ${this.isAdmin()?`
                                                <button onclick="ActionTrackingRegister.deleteEntry('${i.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            `:""}
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                        </tbody>
                    </table>
                </div>
            `}},getFilters(){return{search:(document.getElementById("action-search")?.value||"").toLowerCase(),type:document.getElementById("action-filter-type")?.value||"",classification:document.getElementById("action-filter-classification")?.value||"",status:document.getElementById("action-filter-status")?.value||"",risk:document.getElementById("action-filter-risk")?.value||"",department:document.getElementById("action-filter-department")?.value||"",responsible:document.getElementById("action-filter-responsible")?.value||"",dateFrom:document.getElementById("action-filter-date-from")?.value||"",dateTo:document.getElementById("action-filter-date-to")?.value||""}},renderAll(){this.loadActionList()},filterItems(e,t){return e.filter(s=>{const a=!t.search||(s.observationIssueHazard||"").toLowerCase().includes(t.search)||(s.correctivePreventiveAction||"").toLowerCase().includes(t.search)||(s.responsible||"").toLowerCase().includes(t.search)||(s.observerName||"").toLowerCase().includes(t.search)||(s.id||"").toLowerCase().includes(t.search)||(s.serialNumber||"").toLowerCase().includes(t.search),n=!t.type||(s.typeOfIssue||"")===t.type,l=!t.classification||(s.observationClassification||"")===t.classification,i=!t.status||(s.status||"")===t.status,p=!t.risk||(s.riskRating||"")===t.risk,o=!t.department||(s.department||"")===t.department,m=!t.responsible||(s.responsible||"")===t.responsible;let r=!0;if(t.dateFrom||t.dateTo){const d=s.issueDate?new Date(s.issueDate):null;if(t.dateFrom&&d){const u=new Date(t.dateFrom);u.setHours(0,0,0,0),d<u&&(r=!1)}if(t.dateTo&&d){const u=new Date(t.dateTo);u.setHours(23,59,59,999),d>u&&(r=!1)}}return a&&n&&l&&i&&p&&o&&m&&r})},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-action-btn");e&&e.addEventListener("click",()=>this.showActionForm());const t=document.getElementById("action-settings-btn");t&&t.addEventListener("click",()=>this.switchView("settings"));const s=document.getElementById("action-search");s&&s.addEventListener("input",()=>this.loadActionList());const a=document.getElementById("action-filter-type");a&&a.addEventListener("change",()=>{this.updateClassificationFilter(),this.loadActionList()});const n=document.getElementById("action-filter-classification");n&&n.addEventListener("change",()=>{this.updateRootCauseFilter(),this.loadActionList()});const l=document.getElementById("action-filter-status");l&&l.addEventListener("change",()=>this.loadActionList());const i=document.getElementById("action-filter-risk");i&&i.addEventListener("change",()=>this.loadActionList());const p=document.getElementById("action-filter-department");p&&p.addEventListener("change",()=>this.loadActionList());const o=document.getElementById("action-filter-responsible");o&&o.addEventListener("change",()=>this.loadActionList());const m=document.getElementById("action-filter-date-from");m&&m.addEventListener("change",()=>this.loadActionList());const r=document.getElementById("action-filter-date-to");r&&r.addEventListener("change",()=>this.loadActionList());const d=document.getElementById("action-reset-filters");d&&d.addEventListener("click",()=>this.resetFilters());const u=document.getElementById("action-print-all-btn");u&&u.addEventListener("click",()=>this.printAllActions());const v=document.getElementById("action-export-all-btn"),g=document.getElementById("action-export-all-menu");v&&g&&(v.addEventListener("click",f=>{f.stopPropagation();const y=g.style.display==="block";g.style.display=y?"none":"block"}),document.addEventListener("click",f=>{!v.contains(f.target)&&!g.contains(f.target)&&(g.style.display="none")})),document.querySelectorAll(".dropdown > button").forEach(f=>{f.addEventListener("click",y=>{y.stopPropagation();const b=f.nextElementSibling;if(b&&b.classList.contains("dropdown-menu")){const x=b.style.display==="block";document.querySelectorAll(".dropdown-menu").forEach(L=>{L!==b&&(L.style.display="none")}),b.style.display=x?"none":"block"}})}),document.addEventListener("click",f=>{f.target.closest(".dropdown")||document.querySelectorAll(".dropdown-menu").forEach(y=>{y.style.display="none"})})},100)},updateClassificationFilter(){const e=document.getElementById("action-filter-type"),t=document.getElementById("action-filter-classification");if(!e||!t)return;const s=e.value,a=this.settings||this.getDefaultSettings(),n=a.typeClassificationMapping||{};t.innerHTML='<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A</option>',t.disabled=!s,s&&n[s]?n[s].forEach(l=>{const i=document.createElement("option");i.value=l,i.textContent=l,t.appendChild(i)}):s&&(a.classificationList||[]).forEach(i=>{const p=document.createElement("option");p.value=i,p.textContent=i,t.appendChild(p)})},updateRootCauseFilter(){},resetFilters(){document.getElementById("action-search").value="",document.getElementById("action-filter-type").value="",document.getElementById("action-filter-classification").value="",document.getElementById("action-filter-classification").disabled=!0,document.getElementById("action-filter-status").value="",document.getElementById("action-filter-risk").value="",document.getElementById("action-filter-department").value="",document.getElementById("action-filter-responsible").value="",document.getElementById("action-filter-date-from").value="",document.getElementById("action-filter-date-to").value="",this.loadActionList()},async showActionForm(e=null){const t=!!e,s=this.settings||this.getDefaultSettings(),a=s.typeOfIssueList||[],n=s.statusList||[],l=s.riskRatingList||[],i=s.departmentList||[],p=s.locationList||[],o=s.responsibleList||[],m=s.shiftList||[],r=e?.typeOfIssue||"",d=e?.observationClassification||"",u=e?.rootCause||"",v=r&&s.typeClassificationMapping?.[r]?s.typeClassificationMapping[r]:s.classificationList||[],g=d&&s.classificationRootCauseMapping?.[d]?s.classificationRootCauseMapping[d]:s.rootCauseList||[],f=document.createElement("div");f.className="modal-overlay",f.innerHTML=`
            <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0625\u062C\u0631\u0627\u0621":"\u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="action-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2"># (\u062A\u0633\u0644\u0633\u0644 \u062A\u0644\u0642\u0627\u0626\u064A)</label>
                                <input type="text" id="action-serial" class="form-input" value="${e?.serialNumber||"\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0648\u0644\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"}" disabled>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 *</label>
                                <input type="date" id="action-issue-date" required class="form-input"
                                    value="${e?.issueDate?new Date(e.issueDate).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 *</label>
                                <select id="action-type-of-issue" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</option>
                                    ${a.map(c=>`<option value="${Utils.escapeHTML(c)}" ${r===c?"selected":""}>${Utils.escapeHTML(c)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label for="action-classification" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *</label>
                                <select id="action-classification" required class="form-input" ${r?"":"disabled"}>
                                    <option value="">${r?"\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641":"\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u0648\u0644\u0627\u064B"}</option>
                                    ${v.map(c=>`<option value="${Utils.escapeHTML(c)}" ${d===c?"selected":""}>${Utils.escapeHTML(c)}</option>`).join("")}
                                </select>
                            </div>
                            <div class="col-span-2">
                                <label for="action-observation-issue-hazard" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062E\u0637\u0631 *</label>
                                <textarea id="action-observation-issue-hazard" required class="form-input" rows="3" 
                                    placeholder="\u0648\u0635\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u0648 \u0627\u0644\u062E\u0637\u0631...">${Utils.escapeHTML(e?.observationIssueHazard||"")}</textarea>
                            </div>
                            <div class="col-span-2">
                                <label for="action-corrective-preventive" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0623\u0648 \u0627\u0644\u0648\u0642\u0627\u0626\u064A *</label>
                                <textarea id="action-corrective-preventive" required class="form-input" rows="3" 
                                    placeholder="\u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0623\u0648 \u0627\u0644\u0648\u0642\u0627\u0626\u064A...">${Utils.escapeHTML(e?.correctivePreventiveAction||"")}</textarea>
                            </div>
                            <div>
                                <label for="action-root-cause" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A *</label>
                                <select id="action-root-cause" required class="form-input" ${d?"":"disabled"}>
                                    <option value="">${d?"\u0627\u062E\u062A\u0631 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A":"\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0623\u0648\u0644\u0627\u064B"}</option>
                                    ${g.map(c=>`<option value="${Utils.escapeHTML(c)}" ${u===c?"selected":""}>${Utils.escapeHTML(c)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0628\u0639 *</label>
                                <select id="action-department" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0633\u0645</option>
                                    ${i.map(c=>`<option value="${Utils.escapeHTML(c)}" ${e?.department===c?"selected":""}>${Utils.escapeHTML(c)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0627\u0644\u0645\u0635\u0646\u0639 *</label>
                                <select id="action-location" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639</option>
                                    ${p.map(c=>`<option value="${Utils.escapeHTML(c)}" ${e?.location===c?"selected":""}>${Utils.escapeHTML(c)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 *</label>
                                <select id="action-risk-rating" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</option>
                                    ${l.map(c=>`<option value="${Utils.escapeHTML(c)}" ${e?.riskRating===c?"selected":""}>${Utils.escapeHTML(c)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 *</label>
                                ${o.length>0?`
                                    <select id="action-responsible" required class="form-input">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644</option>
                                        ${o.map(c=>`<option value="${Utils.escapeHTML(c)}" ${e?.responsible===c?"selected":""}>${Utils.escapeHTML(c)}</option>`).join("")}
                                    </select>
                                `:`
                                    <input type="text" id="action-responsible" required class="form-input"
                                        value="${Utils.escapeHTML(e?.responsible||"")}" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644">
                                `}
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641 *</label>
                                <input type="date" id="action-target-date" required class="form-input"
                                    value="${e?.originalTargetDate?new Date(e.originalTargetDate).toISOString().split("T")[0]:""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                <select id="action-status" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629</option>
                                    ${n.map(c=>`<option value="${Utils.escapeHTML(c)}" ${e?.status===c?"selected":""}>${Utils.escapeHTML(c)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 *</label>
                                <input type="text" id="action-observer-name" required class="form-input"
                                    value="${Utils.escapeHTML(e?.observerName||"")}" placeholder="\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0631\u062F\u064A\u0629</label>
                                <select id="action-shift" class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0648\u0631\u062F\u064A\u0629</option>
                                    ${m.map(c=>`<option value="${Utils.escapeHTML(c)}" ${e?.shift===c?"selected":""}>${Utils.escapeHTML(c)}</option>`).join("")}
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(f);const y=f.querySelector("#action-type-of-issue"),b=f.querySelector("#action-classification"),x=f.querySelector("#action-root-cause");y&&b&&y.addEventListener("change",()=>{const c=y.value,h=s.typeClassificationMapping||{},k=c&&h[c]?h[c]:s.classificationList||[];b.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</option>',b.disabled=!c,k.forEach(w=>{const T=document.createElement("option");T.value=w,T.textContent=w,b.appendChild(T)}),x&&(x.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0623\u0648\u0644\u0627\u064B</option>',x.disabled=!0)}),b&&x&&b.addEventListener("change",()=>{const c=b.value,h=s.classificationRootCauseMapping||{},k=c&&h[c]?h[c]:s.rootCauseList||[];x.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A</option>',x.disabled=!c,k.forEach(w=>{const T=document.createElement("option");T.value=w,T.textContent=w,x.appendChild(T)})}),f.querySelector("#action-form").addEventListener("submit",async c=>{c.preventDefault(),await this.handleSubmit(c,e,f)}),f.addEventListener("click",c=>{c.target===f&&f.remove()})},async handleSubmit(e,t,s){e.preventDefault();try{const a=document.getElementById("action-issue-date")?.value,n=document.getElementById("action-type-of-issue")?.value,l=document.getElementById("action-classification")?.value,i=document.getElementById("action-observation-issue-hazard")?.value.trim(),p=document.getElementById("action-corrective-preventive")?.value.trim(),o=document.getElementById("action-root-cause")?.value,m=document.getElementById("action-department")?.value,r=document.getElementById("action-location")?.value,d=document.getElementById("action-risk-rating")?.value,u=document.getElementById("action-target-date")?.value,v=document.getElementById("action-status")?.value,g=document.getElementById("action-observer-name")?.value.trim(),f=document.getElementById("action-responsible");if(!f)throw new Error("\u062D\u0642\u0644 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");const y=f.tagName==="SELECT"?f.value:f.value.trim(),b=document.getElementById("action-shift"),x=b?b.value:"";if(!a||!n||!l||!i||!p||!o||!m||!r||!d||!y||!u||!v||!g){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}const L={id:t?.id||"ATR-"+Date.now().toString(36).toUpperCase(),serialNumber:t?.serialNumber||"",issueDate:a,typeOfIssue:n,observationClassification:l,observationIssueHazard:i,correctivePreventiveAction:p,rootCause:o,department:m,location:r,riskRating:d,responsible:y,originalTargetDate:u,status:v,observerName:g,shift:x,createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?.name||"System",updatedBy:AppState.currentUser?.name||"System"};if(!t||!t.serialNumber)try{const c=await GoogleIntegration.callBackend("getAllActionTracking",{}),h=c.success?c.data||[]:AppState.appData.actionTrackingRegister||[];L.serialNumber=(h.length+1).toString()}catch{const h=AppState.appData.actionTrackingRegister||[];L.serialNumber=(h.length+1).toString()}Loading.show();try{let c;if(t?c=await GoogleIntegration.callBackend("updateActionTracking",{actionId:t.id,updateData:{...L,updateNote:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062C\u0631\u0627\u0621",updatedBy:AppState.currentUser?.name||"System"}}):c=await GoogleIntegration.callBackend("addActionTracking",L),c.success){if(t){const h=AppState.appData.actionTrackingRegister.findIndex(k=>k.id===t.id);h!==-1&&(AppState.appData.actionTrackingRegister[h]={...t,...L})}else AppState.appData.actionTrackingRegister.push(L);typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),s.remove(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629"} \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0628\u0646\u062C\u0627\u062D`),this.load()}else throw new Error(c.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")}catch(c){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(c.message||c))}finally{Loading.hide()}}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(a.message||a))}},async editEntry(e){try{const s=await GoogleIntegration.callBackend("getActionTracking",{actionId:e});if(s.success&&s.data){const a=AppState.appData.actionTrackingRegister.findIndex(n=>n.id===e);a!==-1?AppState.appData.actionTrackingRegister[a]=s.data:AppState.appData.actionTrackingRegister.push(s.data)}}catch(s){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062C\u0631\u0627\u0621:",s)}const t=AppState.appData.actionTrackingRegister.find(s=>s.id===e);if(!t){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}await this.showActionForm(t)},async deleteEntry(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u061F")){Loading.show();try{const t=await GoogleIntegration.callBackend("deleteActionTracking",{actionId:e});if(t.success)AppState.appData.actionTrackingRegister=AppState.appData.actionTrackingRegister.filter(s=>s.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),await this.load();else throw new Error(t.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641")}catch(t){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(t.message||t))}finally{Loading.hide()}}},async viewAction(e){try{const o=await GoogleIntegration.callBackend("getActionTracking",{actionId:e});if(o.success&&o.data){const m=AppState.appData.actionTrackingRegister.findIndex(r=>r.id===e);m!==-1?AppState.appData.actionTrackingRegister[m]=o.data:AppState.appData.actionTrackingRegister.push(o.data)}}catch(o){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621:",o)}const t=AppState.appData.actionTrackingRegister.find(o=>o.id===e);if(!t){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");return}let s=[],a=[],n=[];try{t.timeLog&&(s=typeof t.timeLog=="string"?JSON.parse(t.timeLog):t.timeLog)}catch{s=[]}try{t.updates&&(a=typeof t.updates=="string"?JSON.parse(t.updates):t.updates)}catch{a=[]}try{t.comments&&(n=typeof t.comments=="string"?JSON.parse(t.comments):t.comments)}catch{n=[]}const l=t.originalTargetDate&&new Date(t.originalTargetDate)<new Date&&!(t.status||"").toLowerCase().includes("closed")&&!(t.status||"").toLowerCase().includes("\u0645\u063A\u0644\u0642"),i=document.createElement("div");i.className="modal-overlay",i.style.cssText="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;",i.innerHTML=`
            <div class="modal-content" style="max-width: 95vw; width: 1400px; max-height: 95vh; overflow-y: auto; background: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                <div class="modal-header" style="padding: 20px; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; background: #f9fafb;">
                    <h2 class="modal-title" style="font-size: 24px; font-weight: 600; color: #111827; margin: 0;">
                        <i class="fas fa-clipboard-list-check ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 #${Utils.escapeHTML(t.serialNumber||t.id||"")}
                    </h2>
                    <div class="flex gap-2">
                        <button onclick="ActionTrackingRegister.printAction('${t.id}');" class="btn-secondary btn-sm" title="\u0637\u0628\u0627\u0639\u0629">
                            <i class="fas fa-print ml-1"></i>
                            \u0637\u0628\u0627\u0639\u0629
                        </button>
                        <div class="dropdown" style="position: relative;">
                            <button class="btn-secondary btn-sm" title="\u062A\u0635\u062F\u064A\u0631">
                                <i class="fas fa-file-export ml-1"></i>
                                \u062A\u0635\u062F\u064A\u0631
                                <i class="fas fa-chevron-down mr-1" style="font-size: 10px;"></i>
                            </button>
                            <div class="dropdown-menu" style="position: absolute; top: 100%; left: 0; margin-top: 4px; background: white; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); min-width: 150px; z-index: 10000; display: none;">
                                <a href="#" onclick="ActionTrackingRegister.exportActionToExcel('${t.id}'); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none; border-bottom: 1px solid #eee;">
                                    <i class="fas fa-file-excel ml-2" style="color: #1d6f42;"></i>Excel
                                </a>
                                <a href="#" onclick="ActionTrackingRegister.exportActionToPDF('${t.id}'); return false;" class="dropdown-item" style="display: block; padding: 8px 12px; color: #333; text-decoration: none;">
                                    <i class="fas fa-file-pdf ml-2" style="color: #dc3545;"></i>PDF
                                </a>
                            </div>
                        </div>
                        ${AppState.currentUser&&(AppState.currentUser.role==="admin"||AppState.currentUser.role==="system-manager")?`
                        <button onclick="if(confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u061F')) { ActionTrackingRegister.deleteEntry('${t.id}'); this.closest('.modal-overlay').remove(); }" class="btn-danger btn-sm" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash ml-1"></i>
                            \u062D\u0630\u0641
                        </button>
                        `:""}
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="background: transparent; border: none; font-size: 24px; cursor: pointer; color: #6b7280; padding: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body" style="padding: 30px;">
                    <div class="space-y-6">
                        <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div class="content-card">
                            <h3 class="text-lg font-semibold mb-4"><i class="fas fa-info-circle ml-2"></i>\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600"># (\u0627\u0644\u062A\u0633\u0644\u0633\u0644):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.serialNumber||t.id||"")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:</label>
                                    <p class="text-gray-800">${t.issueDate?Utils.formatDate(t.issueDate):"-"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:</label>
                                    <p class="text-gray-800"><span class="badge badge-info">${Utils.escapeHTML(t.typeOfIssue||"")}</span></p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:</label>
                                    <p class="text-gray-800"><span class="badge badge-secondary">${Utils.escapeHTML(t.observationClassification||"")}</span></p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.rootCause||"")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0628\u0639:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.department||"")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.location||"")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629:</label>
                                    <p class="text-gray-800">
                                        <span class="badge badge-${(t.riskRating||"").toLowerCase()==="critical"||(t.riskRating||"").toLowerCase()==="high"?"danger":(t.riskRating||"").toLowerCase()==="medium"?"warning":"info"}">
                                            ${Utils.escapeHTML(t.riskRating||"")}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.responsible||"")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641:</label>
                                    <p class="text-gray-800 ${l?"text-red-600 font-bold":""}">
                                        ${t.originalTargetDate?Utils.formatDate(t.originalTargetDate):"-"}
                                        ${l?" \u26A0\uFE0F \u0645\u062A\u0623\u062E\u0631":""}
                                    </p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                    <p class="text-gray-800">
                                        <span class="badge badge-${l?"danger":(t.status||"").toLowerCase().includes("progress")||(t.status||"").toLowerCase().includes("\u062A\u0646\u0641\u064A\u0630")?"warning":(t.status||"").toLowerCase().includes("closed")||(t.status||"").toLowerCase().includes("\u0645\u063A\u0644\u0642")?"success":"info"}">
                                            ${Utils.escapeHTML(t.status||"")}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.observerName||"")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0648\u0631\u062F\u064A\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.shift||"")}</p>
                                </div>
                            </div>
                            <div class="mt-4">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062E\u0637\u0631:</label>
                                <p class="text-gray-800 bg-gray-50 p-3 rounded">${Utils.escapeHTML(t.observationIssueHazard||"")}</p>
                            </div>
                            <div class="mt-4">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0623\u0648 \u0627\u0644\u0648\u0642\u0627\u0626\u064A:</label>
                                <p class="text-gray-800 bg-gray-50 p-3 rounded">${Utils.escapeHTML(t.correctivePreventiveAction||"")}</p>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A -->
                        <div class="content-card">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-semibold"><i class="fas fa-sync-alt ml-2"></i>\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A (${a.length})</h3>
                                <button class="btn-primary btn-sm" onclick="ActionTrackingRegister.showAddUpdateModal('${t.id}')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B
                                </button>
                            </div>
                            ${a.length>0?`
                                <div class="space-y-3">
                                    ${a.map(o=>`
                                        <div class="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                                            <div class="flex items-center justify-between">
                                                <span class="text-sm font-semibold">${Utils.escapeHTML(o.user||"")}</span>
                                                <span class="text-xs text-gray-500">${o.timestamp?Utils.formatDate(o.timestamp):""}</span>
                                            </div>
                                            <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(o.update||"")}</p>
                                            ${o.progress!==void 0?`
                                                <div class="mt-2">
                                                    <div class="flex items-center justify-between text-xs mb-1">
                                                        <span>\u0627\u0644\u062A\u0642\u062F\u0645</span>
                                                        <span>${o.progress}%</span>
                                                    </div>
                                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                                        <div class="bg-blue-500 h-2 rounded-full" style="width: ${o.progress}%"></div>
                                                    </div>
                                                </div>
                                            `:""}
                                        </div>
                                    `).join("")}
                                </div>
                            `:'<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A</p>'}
                        </div>
                        
                        <!-- \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A -->
                        <div class="content-card">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-semibold"><i class="fas fa-comments ml-2"></i>\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A (${n.length})</h3>
                                <button class="btn-primary btn-sm" onclick="ActionTrackingRegister.showAddCommentModal('${t.id}')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642
                                </button>
                            </div>
                            ${n.length>0?`
                                <div class="space-y-3">
                                    ${n.map(o=>`
                                        <div class="border-l-4 border-green-500 pl-4 py-2 bg-gray-50 rounded">
                                            <div class="flex items-center justify-between">
                                                <span class="text-sm font-semibold">${Utils.escapeHTML(o.user||"")}</span>
                                                <span class="text-xs text-gray-500">${o.timestamp?Utils.formatDate(o.timestamp):""}</span>
                                            </div>
                                            <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(o.comment||"")}</p>
                                        </div>
                                    `).join("")}
                                </div>
                            `:'<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642\u0627\u062A</p>'}
                        </div>
                        
                        <!-- \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A -->
                        <div class="content-card">
                            <h3 class="text-lg font-semibold mb-4"><i class="fas fa-history ml-2"></i>\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A</h3>
                            ${s.length>0?`
                                <div class="space-y-2">
                                    ${s.map(o=>`
                                        <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                                            <i class="fas fa-circle text-xs text-blue-500 mt-1"></i>
                                            <div class="flex-1">
                                                <div class="flex items-center justify-between">
                                                    <span class="text-sm font-semibold">${Utils.escapeHTML(o.user||"")}</span>
                                                    <span class="text-xs text-gray-500">${o.timestamp?Utils.formatDate(o.timestamp):""}</span>
                                                </div>
                                                <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(o.note||"")}</p>
                                                ${o.action==="status_changed"&&o.oldStatus&&o.newStatus?`
                                                    <p class="text-xs text-gray-500 mt-1">
                                                        \u0645\u0646: <span class="badge badge-secondary">${Utils.escapeHTML(o.oldStatus)}</span>
                                                        \u0625\u0644\u0649: <span class="badge badge-info">${Utils.escapeHTML(o.newStatus)}</span>
                                                    </p>
                                                `:""}
                                            </div>
                                        </div>
                                    `).join("")}
                                </div>
                            `:'<p class="text-gray-500 text-sm">\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u062C\u0644 \u0632\u0645\u0646\u064A</p>'}
                        </div>
                        
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                            ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("action-tracking"):""}
                            <button type="button" class="btn-primary" onclick="ActionTrackingRegister.editEntry('${t.id}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(i),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(i,{moduleKey:"action-tracking",record:t,recordId:t.id||t.isoCode||""}),setTimeout(()=>{const o=i.querySelector(".dropdown > button"),m=i.querySelector(".dropdown-menu");o&&m&&o.addEventListener("click",r=>{r.stopPropagation();const d=m.style.display==="block";m.style.display=d?"none":"block"})},100);const p=o=>{const m=i.querySelector(".dropdown > button"),r=i.querySelector(".dropdown-menu");r&&m&&!m.contains(o.target)&&!r.contains(o.target)&&(r.style.display="none")};document.addEventListener("click",p),i.addEventListener("click",o=>{o.target===i&&(document.removeEventListener("click",p),i.remove())})},async showAddUpdateModal(e){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="update-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u062D\u062F\u064A\u062B *</label>
                            <textarea id="update-text" required class="form-input" rows="4" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u062A\u062D\u062F\u064A\u062B..."></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0642\u062F\u0645 (%)</label>
                            <input type="number" id="update-progress" class="form-input" min="0" max="100" value="0">
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#update-form").addEventListener("submit",async s=>{s.preventDefault();const a=t.querySelector("#update-text").value.trim(),n=parseInt(t.querySelector("#update-progress").value)||0;if(!a){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B");return}Loading.show();try{const l=await GoogleIntegration.callBackend("addActionUpdate",{actionId:e,user:AppState.currentUser?.name||"System",update:a,progress:n});if(l.success)Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0628\u0646\u062C\u0627\u062D"),t.remove(),await this.viewAction(e);else throw new Error(l.message||"\u062D\u062F\u062B \u062E\u0637\u0623")}catch(l){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(l.message||l))}finally{Loading.hide()}}),t.addEventListener("click",s=>{s.target===t&&t.remove()})},async showAddCommentModal(e){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="comment-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0639\u0644\u064A\u0642 *</label>
                            <textarea id="comment-text" required class="form-input" rows="4" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u062A\u0639\u0644\u064A\u0642..."></textarea>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#comment-form").addEventListener("submit",async s=>{s.preventDefault();const a=t.querySelector("#comment-text").value.trim();if(!a){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062A\u0639\u0644\u064A\u0642");return}Loading.show();try{const n=await GoogleIntegration.callBackend("addActionComment",{actionId:e,user:AppState.currentUser?.name||"System",comment:a});if(n.success)Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0628\u0646\u062C\u0627\u062D"),t.remove(),await this.viewAction(e);else throw new Error(n.message||"\u062D\u062F\u062B \u062E\u0637\u0623")}catch(n){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(n.message||n))}finally{Loading.hide()}}),t.addEventListener("click",s=>{s.target===t&&t.remove()})},async renderSettings(){const e=this.settings||this.getDefaultSettings();return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-cog ml-2"></i>\u0625\u0639\u062F\u0627\u062F\u0627\u062A Action Tracking</h2>
                </div>
                <div class="card-body space-y-6">
                    <p class="text-sm text-gray-600">
                        \u0645\u0646 \u0647\u0646\u0627 \u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u0627\u0631\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0648\u0627\u0644\u0631\u0628\u0637 \u0628\u064A\u0646 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0648\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A.
                    </p>
                    
                    <!-- \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0642\u0648\u0627\u0626\u0645 -->
                    <div>
                        <h3 class="text-lg font-semibold mb-4"><i class="fas fa-list ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0642\u0648\u0627\u0626\u0645</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                <div id="settings-type-list" class="space-y-2 mb-2"></div>
                                <button type="button" class="btn-secondary btn-sm" onclick="ActionTrackingRegister.addListItem('type')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A</label>
                                <div id="settings-classification-list" class="space-y-2 mb-2"></div>
                                <button type="button" class="btn-secondary btn-sm" onclick="ActionTrackingRegister.addListItem('classification')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629</label>
                                <div id="settings-rootcause-list" class="space-y-2 mb-2"></div>
                                <button type="button" class="btn-secondary btn-sm" onclick="ActionTrackingRegister.addListItem('rootcause')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0627\u062A</label>
                                <div id="settings-status-list" class="space-y-2 mb-2"></div>
                                <button type="button" class="btn-secondary btn-sm" onclick="ActionTrackingRegister.addListItem('status')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                                <div id="settings-risk-list" class="space-y-2 mb-2"></div>
                                <button type="button" class="btn-secondary btn-sm" onclick="ActionTrackingRegister.addListItem('risk')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0623\u0642\u0633\u0627\u0645</label>
                                <div id="settings-department-list" class="space-y-2 mb-2"></div>
                                <button type="button" class="btn-secondary btn-sm" onclick="ActionTrackingRegister.addListItem('department')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0627\u0642\u0639</label>
                                <div id="settings-location-list" class="space-y-2 mb-2"></div>
                                <button type="button" class="btn-secondary btn-sm" onclick="ActionTrackingRegister.addListItem('location')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0648\u0646</label>
                                <div id="settings-responsible-list" class="space-y-2 mb-2"></div>
                                <button type="button" class="btn-secondary btn-sm" onclick="ActionTrackingRegister.addListItem('responsible')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A</label>
                                <div id="settings-shift-list" class="space-y-2 mb-2"></div>
                                <button type="button" class="btn-secondary btn-sm" onclick="ActionTrackingRegister.addListItem('shift')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0631\u0628\u0637 -->
                    <div class="border-t pt-6">
                        <h3 class="text-lg font-semibold mb-4"><i class="fas fa-link ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0631\u0628\u0637</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="text-sm font-semibold mb-3">\u0631\u0628\u0637 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u2192 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</h4>
                                <div id="settings-type-classification-mapping" class="space-y-2"></div>
                            </div>
                            <div>
                                <h4 class="text-sm font-semibold mb-3">\u0631\u0628\u0637 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u2192 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A</h4>
                                <div id="settings-classification-rootcause-mapping" class="space-y-2"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-end gap-4 pt-4 border-t">
                        <button type="button" class="btn-secondary" onclick="ActionTrackingRegister.resetSettings()">
                            <i class="fas fa-undo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                        </button>
                        <button type="button" class="btn-primary" onclick="ActionTrackingRegister.saveSettings()">
                            <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                        </button>
                    </div>
                </div>
            </div>
        `},setupSettingsEvents(){setTimeout(()=>{this.renderSettingsLists()},100)},renderSettingsLists(){this.settings||(this.settings=this.getDefaultSettings());const e=this.settings,t=document.getElementById("settings-type-list");if(t){const r=e.typeOfIssueList||[];r.length===0?t.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p>':t.innerHTML=r.map((d,u)=>`
                    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded bg-white">
                        <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(String(d))}" 
                            onchange="ActionTrackingRegister.updateListItem('type', ${u}, this.value)">
                        <button type="button" class="btn-danger btn-xs" onclick="ActionTrackingRegister.removeListItem('type', ${u})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join("")}const s=document.getElementById("settings-classification-list");if(s){const r=e.classificationList||[];r.length===0?s.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p>':s.innerHTML=r.map((d,u)=>`
                    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded bg-white">
                        <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(String(d))}" 
                            onchange="ActionTrackingRegister.updateListItem('classification', ${u}, this.value)">
                        <button type="button" class="btn-danger btn-xs" onclick="ActionTrackingRegister.removeListItem('classification', ${u})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join("")}const a=document.getElementById("settings-rootcause-list");if(a){const r=e.rootCauseList||[];r.length===0?a.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p>':a.innerHTML=r.map((d,u)=>`
                    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded bg-white">
                        <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(String(d))}" 
                            onchange="ActionTrackingRegister.updateListItem('rootcause', ${u}, this.value)">
                        <button type="button" class="btn-danger btn-xs" onclick="ActionTrackingRegister.removeListItem('rootcause', ${u})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join("")}const n=document.getElementById("settings-status-list");if(n){const r=e.statusList||[];r.length===0?n.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p>':n.innerHTML=r.map((d,u)=>`
                    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded bg-white">
                        <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(String(d))}" 
                            onchange="ActionTrackingRegister.updateListItem('status', ${u}, this.value)">
                        <button type="button" class="btn-danger btn-xs" onclick="ActionTrackingRegister.removeListItem('status', ${u})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join("")}const l=document.getElementById("settings-risk-list");if(l){const r=e.riskRatingList||[];r.length===0?l.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p>':l.innerHTML=r.map((d,u)=>`
                    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded bg-white">
                        <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(String(d))}" 
                            onchange="ActionTrackingRegister.updateListItem('risk', ${u}, this.value)">
                        <button type="button" class="btn-danger btn-xs" onclick="ActionTrackingRegister.removeListItem('risk', ${u})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join("")}const i=document.getElementById("settings-department-list");if(i){const r=e.departmentList||[];r.length===0?i.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p>':i.innerHTML=r.map((d,u)=>`
                    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded bg-white">
                        <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(String(d))}" 
                            onchange="ActionTrackingRegister.updateListItem('department', ${u}, this.value)">
                        <button type="button" class="btn-danger btn-xs" onclick="ActionTrackingRegister.removeListItem('department', ${u})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join("")}const p=document.getElementById("settings-location-list");if(p){const r=e.locationList||[];r.length===0?p.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p>':p.innerHTML=r.map((d,u)=>`
                    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded bg-white">
                        <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(String(d))}" 
                            onchange="ActionTrackingRegister.updateListItem('location', ${u}, this.value)">
                        <button type="button" class="btn-danger btn-xs" onclick="ActionTrackingRegister.removeListItem('location', ${u})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join("")}const o=document.getElementById("settings-responsible-list");if(o){const r=e.responsibleList||[];r.length===0?o.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p>':o.innerHTML=r.map((d,u)=>`
                    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded bg-white">
                        <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(String(d))}" 
                            onchange="ActionTrackingRegister.updateListItem('responsible', ${u}, this.value)">
                        <button type="button" class="btn-danger btn-xs" onclick="ActionTrackingRegister.removeListItem('responsible', ${u})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join("")}const m=document.getElementById("settings-shift-list");if(m){const r=e.shiftList||[];r.length===0?m.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p>':m.innerHTML=r.map((d,u)=>`
                    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded bg-white">
                        <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(String(d))}" 
                            onchange="ActionTrackingRegister.updateListItem('shift', ${u}, this.value)">
                        <button type="button" class="btn-danger btn-xs" onclick="ActionTrackingRegister.removeListItem('shift', ${u})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join("")}},addListItem(e){if(!this.hasSettingsPermission()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}this.settings||(this.settings=this.getDefaultSettings());const s={type:"typeOfIssueList",classification:"classificationList",rootcause:"rootCauseList",status:"statusList",risk:"riskRatingList",department:"departmentList",location:"locationList",responsible:"responsibleList",shift:"shiftList"}[e];if(!s){Notification.error("\u0646\u0648\u0639 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}const a=prompt("\u0623\u062F\u062E\u0644 \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u062C\u062F\u064A\u062F:");a&&a.trim()&&(this.settings[s]||(this.settings[s]=[]),this.settings[s].push(a.trim()),this.renderSettingsLists(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0646\u0635\u0631 \u0628\u0646\u062C\u0627\u062D"))},updateListItem(e,t,s){this.settings||(this.settings=this.getDefaultSettings());const n={type:"typeOfIssueList",classification:"classificationList",rootcause:"rootCauseList",status:"statusList",risk:"riskRatingList",department:"departmentList",location:"locationList",responsible:"responsibleList",shift:"shiftList"}[e];!n||!this.settings[n]||t>=0&&t<this.settings[n].length&&(this.settings[n][t]=s.trim())},removeListItem(e,t){if(!this.hasSettingsPermission()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0635\u0631\u061F"))return;this.settings||(this.settings=this.getDefaultSettings());const a={type:"typeOfIssueList",classification:"classificationList",rootcause:"rootCauseList",status:"statusList",risk:"riskRatingList",department:"departmentList",location:"locationList",responsible:"responsibleList",shift:"shiftList"}[e];!a||!this.settings[a]||t>=0&&t<this.settings[a].length&&(this.settings[a].splice(t,1),this.renderSettingsLists(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631 \u0628\u0646\u062C\u0627\u062D"))},resetSettings(){if(!this.hasSettingsPermission()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0625\u0644\u0649 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629\u061F \u0633\u064A\u062A\u0645 \u0641\u0642\u062F\u0627\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A.")&&(this.settings=this.getDefaultSettings(),this.renderSettingsLists(),Notification.success("\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"))},async saveSettings(){if(!this.hasSettingsPermission()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A Action Tracking. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u062E\u0627\u0635\u0629.");return}this.settings||(this.settings=this.getDefaultSettings()),Loading.show();try{const e=AppState.currentUser,t={...this.settings,userData:{role:e?.role||"",permissions:e?.permissions||{},email:e?.email||"",name:e?.name||""}},s=await GoogleIntegration.callBackend("saveActionTrackingSettings",t);if(s.success)Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),await this.loadSettings(),this.renderSettingsLists();else if(s.errorCode==="PERMISSION_DENIED")Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(s.message||""));else throw new Error(s.message||"\u062D\u062F\u062B \u062E\u0637\u0623")}catch(e){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(e.message||e))}finally{Loading.hide()}},async printAction(e){const t=AppState.appData.actionTrackingRegister.find(s=>s.id===e);if(!t){Notification.error("\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show();let s=[],a=[],n=[];try{t.timeLog&&(s=typeof t.timeLog=="string"?JSON.parse(t.timeLog):t.timeLog),t.updates&&(a=typeof t.updates=="string"?JSON.parse(t.updates):t.updates),t.comments&&(n=typeof t.comments=="string"?JSON.parse(t.comments):t.comments)}catch{}const l=t.originalTargetDate&&new Date(t.originalTargetDate)<new Date&&!(t.status||"").toLowerCase().includes("closed")&&!(t.status||"").toLowerCase().includes("\u0645\u063A\u0644\u0642"),i=(t.riskRating||"").toLowerCase()==="critical"||(t.riskRating||"").toLowerCase()==="high"?"badge-danger":(t.riskRating||"").toLowerCase()==="medium"?"badge-warning":"badge-info",p=l?"badge-danger":(t.status||"").toLowerCase().includes("progress")||(t.status||"").toLowerCase().includes("\u062A\u0646\u0641\u064A\u0630")?"badge-warning":(t.status||"").toLowerCase().includes("closed")||(t.status||"").toLowerCase().includes("\u0645\u063A\u0644\u0642")?"badge-success":"badge-info",o=`
                <style>
                    .badge {
                        display: inline-block;
                        padding: 4px 10px;
                        border-radius: 4px;
                        font-size: 13px;
                        font-weight: bold;
                    }
                    .badge-info { background: #d1ecf1; color: #0c5460; }
                    .badge-warning { background: #fff3cd; color: #856404; }
                    .badge-danger { background: #f8d7da; color: #721c24; }
                    .badge-success { background: #d4edda; color: #155724; }
                    .text-area {
                        background: #f9f9f9;
                        padding: 15px;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                        min-height: 50px;
                        white-space: pre-wrap;
                        margin-top: 10px;
                    }
                    .timeline-item {
                        padding: 10px;
                        margin-bottom: 10px;
                        border-right: 3px solid #007bff;
                        background: #f9f9f9;
                    }
                    .timeline-user {
                        font-weight: bold;
                        color: #007bff;
                    }
                    .timeline-date {
                        color: #666;
                        font-size: 12px;
                    }
                </style>
                <div class="summary-grid">
                    <div class="summary-card">
                        <span class="summary-label"># (\u0627\u0644\u062A\u0633\u0644\u0633\u0644)</span>
                        <span class="summary-value">${Utils.escapeHTML(t.serialNumber||t.id||"")}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</span>
                        <span class="summary-value">${t.issueDate?Utils.formatDate(t.issueDate):"-"}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</span>
                        <span class="summary-value"><span class="badge badge-info">${Utils.escapeHTML(t.typeOfIssue||"")}</span></span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</span>
                        <span class="summary-value"><span class="badge badge-warning">${Utils.escapeHTML(t.observationClassification||"")}</span></span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0628\u0639</span>
                        <span class="summary-value">${Utils.escapeHTML(t.department||"")}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u0645\u0648\u0642\u0639</span>
                        <span class="summary-value">${Utils.escapeHTML(t.location||"")}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</span>
                        <span class="summary-value"><span class="badge ${i}">${Utils.escapeHTML(t.riskRating||"")}</span></span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</span>
                        <span class="summary-value">${Utils.escapeHTML(t.responsible||"")}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641</span>
                        <span class="summary-value ${l?"badge badge-danger":""}">
                            ${t.originalTargetDate?Utils.formatDate(t.originalTargetDate):"-"}
                            ${l?" \u26A0\uFE0F \u0645\u062A\u0623\u062E\u0631":""}
                        </span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u062D\u0627\u0644\u0629</span>
                        <span class="summary-value">
                            <span class="badge ${p}">${Utils.escapeHTML(t.status||"")}</span>
                        </span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</span>
                        <span class="summary-value">${Utils.escapeHTML(t.observerName||"")}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u0648\u0631\u062F\u064A\u0629</span>
                        <span class="summary-value">${Utils.escapeHTML(t.shift||"")}</span>
                    </div>
                </div>
                ${t.rootCause?`
                <div class="section-title">\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A</div>
                <div class="text-area">${Utils.escapeHTML(t.rootCause||"")}</div>
                `:""}
                <div class="section-title">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062E\u0637\u0631</div>
                <div class="text-area">${Utils.escapeHTML(t.observationIssueHazard||"")}</div>
                <div class="section-title">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0623\u0648 \u0627\u0644\u0648\u0642\u0627\u0626\u064A</div>
                <div class="text-area">${Utils.escapeHTML(t.correctivePreventiveAction||"")}</div>
                ${a.length>0?`
                    <div class="section-title">\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A (${a.length})</div>
                    ${a.map(g=>`
                        <div class="timeline-item">
                            <div class="timeline-user">${Utils.escapeHTML(g.user||"")}</div>
                            <div class="timeline-date">${g.timestamp?Utils.formatDate(g.timestamp):""}</div>
                            <div style="margin-top: 8px;">${Utils.escapeHTML(g.update||"")}</div>
                            ${g.progress!==void 0?`
                                <div style="margin-top: 8px;">
                                    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                                        <span>\u0627\u0644\u062A\u0642\u062F\u0645</span>
                                        <span>${g.progress}%</span>
                                    </div>
                                    <div style="width: 100%; background: #e9ecef; border-radius: 4px; height: 8px;">
                                        <div style="background: #007bff; height: 8px; border-radius: 4px; width: ${g.progress}%;"></div>
                                    </div>
                                </div>
                            `:""}
                        </div>
                    `).join("")}
                `:""}
                ${n.length>0?`
                    <div class="section-title">\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A (${n.length})</div>
                    ${n.map(g=>`
                        <div class="timeline-item" style="border-right-color: #28a745;">
                            <div class="timeline-user">${Utils.escapeHTML(g.user||"")}</div>
                            <div class="timeline-date">${g.timestamp?Utils.formatDate(g.timestamp):""}</div>
                            <div style="margin-top: 8px;">${Utils.escapeHTML(g.comment||"")}</div>
                        </div>
                    `).join("")}
                `:""}
                ${s.length>0?`
                    <div class="section-title">\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A</div>
                    ${s.map(g=>`
                        <div class="timeline-item">
                            <div class="timeline-user">${Utils.escapeHTML(g.user||"")}</div>
                            <div class="timeline-date">${g.timestamp?Utils.formatDate(g.timestamp):""}</div>
                            <div style="margin-top: 8px;">${Utils.escapeHTML(g.note||"")}</div>
                            ${g.action==="status_changed"&&g.oldStatus&&g.newStatus?`
                                <div style="margin-top: 8px; font-size: 12px; color: #666;">
                                    \u0645\u0646: <span class="badge badge-warning">${Utils.escapeHTML(g.oldStatus)}</span>
                                    \u0625\u0644\u0649: <span class="badge badge-info">${Utils.escapeHTML(g.newStatus)}</span>
                                </div>
                            `:""}
                        </div>
                    `).join("")}
                `:""}
            `,m=t.serialNumber||`ACTION-${t.id?.substring(0,8)||"UNKNOWN"}`,r=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(m,`\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 #${Utils.escapeHTML(t.serialNumber||t.id||"")}`,o,!1,!0,{version:t.version||"1.0",releaseDate:t.issueDate||t.createdAt,revisionDate:t.updatedAt||t.issueDate,qrData:{type:"ActionTracking",id:t.id,serialNumber:t.serialNumber,code:m}},t.createdAt||t.issueDate,t.updatedAt||t.createdAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</title></head><body>${o}</body></html>`,d=new Blob([r],{type:"text/html;charset=utf-8"}),u=URL.createObjectURL(d),v=window.open(u,"_blank");v?v.onload=()=>{setTimeout(()=>{v.print(),setTimeout(()=>{URL.revokeObjectURL(u),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")},1e3)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631."))}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+(s.message||s))}},async printAllActions(){const e=this.getFilters(),t=AppState.appData.actionTrackingRegister||[],s=this.filterItems(t,e);if(s.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}try{Loading.show();const a=s.map(r=>{const d=r.originalTargetDate&&new Date(r.originalTargetDate)<new Date&&!(r.status||"").toLowerCase().includes("closed")&&!(r.status||"").toLowerCase().includes("\u0645\u063A\u0644\u0642");return`
                    <tr>
                        <td>${Utils.escapeHTML(r.serialNumber||r.id||"")}</td>
                        <td>${r.issueDate?Utils.formatDate(r.issueDate):"-"}</td>
                        <td>${Utils.escapeHTML(r.typeOfIssue||"")}</td>
                        <td>${Utils.escapeHTML(r.observationClassification||"")}</td>
                        <td>${Utils.escapeHTML((r.observationIssueHazard||"").substring(0,50))}${(r.observationIssueHazard||"").length>50?"...":""}</td>
                        <td>${Utils.escapeHTML(r.responsible||"")}</td>
                        <td class="${d?"badge badge-danger":""}">${r.originalTargetDate?Utils.formatDate(r.originalTargetDate):"-"}</td>
                        <td>${Utils.escapeHTML(r.status||"")}</td>
                        <td>${Utils.escapeHTML(r.riskRating||"")}</td>
                    </tr>
                `}).join(""),n=`
                <div class="summary-grid">
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</span>
                        <span class="summary-value">${s.length}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0628\u0627\u0639\u0629</span>
                        <span class="summary-value">${Utils.formatDate(new Date().toISOString())}</span>
                    </div>
                </div>
                <div class="section-title">\u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</div>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                            <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                            <th>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>
                            <th>\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062E\u0637\u0631</th>
                            <th>\u0627\u0644\u0645\u0633\u0624\u0648\u0644</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${a}
                    </tbody>
                </table>
            `,l=`ACTION-TRACKING-REGISTER-${new Date().toISOString().slice(0,10)}`,i=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,"\u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A",n,!1,!0,{version:"1.0",source:"ActionTrackingRegister",count:s.length,qrData:{type:"ActionTrackingRegister",count:s.length,date:new Date().toISOString()}},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</title></head><body>${n}</body></html>`,p=new Blob([i],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(p),m=window.open(o,"_blank");m?m.onload=()=>{setTimeout(()=>{m.print(),setTimeout(()=>{URL.revokeObjectURL(o),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")},1e3)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631."))}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+(a.message||a))}},async exportActionToExcel(e){const t=AppState.appData.actionTrackingRegister.find(s=>s.id===e);if(!t){Notification.error("\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show();let s=[],a=[],n=[];try{t.timeLog&&(s=typeof t.timeLog=="string"?JSON.parse(t.timeLog):t.timeLog),t.updates&&(a=typeof t.updates=="string"?JSON.parse(t.updates):t.updates),t.comments&&(n=typeof t.comments=="string"?JSON.parse(t.comments):t.comments)}catch{}const l=XLSX.utils.book_new(),i=[["# (\u0627\u0644\u062A\u0633\u0644\u0633\u0644)",t.serialNumber||t.id||""],["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",t.issueDate?Utils.formatDate(t.issueDate):""],["\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",t.typeOfIssue||""],["\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.observationClassification||""],["\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A",t.rootCause||""],["\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0628\u0639",t.department||""],["\u0627\u0644\u0645\u0648\u0642\u0639",t.location||""],["\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",t.riskRating||""],["\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630",t.responsible||""],["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641",t.originalTargetDate?Utils.formatDate(t.originalTargetDate):""],["\u0627\u0644\u062D\u0627\u0644\u0629",t.status||""],["\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",t.observerName||""],["\u0627\u0644\u0648\u0631\u062F\u064A\u0629",t.shift||""],["\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062E\u0637\u0631",t.observationIssueHazard||""],["\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0623\u0648 \u0627\u0644\u0648\u0642\u0627\u0626\u064A",t.correctivePreventiveAction||""]],p=XLSX.utils.aoa_to_sheet(i);if(XLSX.utils.book_append_sheet(l,p,"\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629"),a.length>0){const m=[["\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u062A\u062D\u062F\u064A\u062B","\u0627\u0644\u062A\u0642\u062F\u0645 (%)"]];a.forEach(d=>{m.push([d.user||"",d.timestamp?Utils.formatDate(d.timestamp):"",d.update||"",d.progress||0])});const r=XLSX.utils.aoa_to_sheet(m);XLSX.utils.book_append_sheet(l,r,"\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A")}if(n.length>0){const m=[["\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u062A\u0639\u0644\u064A\u0642"]];n.forEach(d=>{m.push([d.user||"",d.timestamp?Utils.formatDate(d.timestamp):"",d.comment||""])});const r=XLSX.utils.aoa_to_sheet(m);XLSX.utils.book_append_sheet(l,r,"\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A")}if(s.length>0){const m=[["\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0625\u062C\u0631\u0627\u0621","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"]];s.forEach(d=>{m.push([d.user||"",d.timestamp?Utils.formatDate(d.timestamp):"",d.action||"",d.note||""])});const r=XLSX.utils.aoa_to_sheet(m);XLSX.utils.book_append_sheet(l,r,"\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A")}const o=`\u0627\u0644\u0625\u062C\u0631\u0627\u0621_${t.serialNumber||t.id||e}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(l,o),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(s.message||s))}},async exportAllToExcel(){const e=this.getFilters(),t=AppState.appData.actionTrackingRegister||[],s=this.filterItems(t,e);if(s.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{Loading.show();const a=[["#","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0627\u0644\u062A\u0635\u0646\u064A\u0641","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062E\u0637\u0631","\u0627\u0644\u0645\u0633\u0624\u0648\u0644","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641","\u0627\u0644\u062D\u0627\u0644\u0629","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629","\u0627\u0644\u0642\u0633\u0645","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A"]];s.forEach(p=>{a.push([p.serialNumber||p.id||"",p.issueDate?Utils.formatDate(p.issueDate):"",p.typeOfIssue||"",p.observationClassification||"",p.observationIssueHazard||"",p.responsible||"",p.originalTargetDate?Utils.formatDate(p.originalTargetDate):"",p.status||"",p.riskRating||"",p.department||"",p.location||"",p.rootCause||"",p.correctivePreventiveAction||""])});const n=XLSX.utils.book_new(),l=XLSX.utils.aoa_to_sheet(a);XLSX.utils.book_append_sheet(n,l,"\u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A");const i=`\u0633\u062C\u0644_\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(n,i),Loading.hide(),Notification.success(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 ${s.length} \u0625\u062C\u0631\u0627\u0621 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D`)}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(a.message||a))}},async exportActionToPDF(e){await this.printAction(e)},async exportAllToPDF(){await this.printAllActions()}};(function(){"use strict";try{typeof window<"u"&&typeof ActionTrackingRegister<"u"&&(window.ActionTrackingRegister=ActionTrackingRegister,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 ActionTrackingRegister module loaded and available on window.ActionTrackingRegister"))}catch{if(typeof window<"u"&&typeof ActionTrackingRegister<"u")try{window.ActionTrackingRegister=ActionTrackingRegister}catch{}}})();
