const SafetyHealthManagement={currentView:"team",currentMemberId:null,filters:{department:"",jobTitle:"",period:"",search:""},isGoogleAppsScriptEnabled(){if(typeof AppState>"u"||!AppState.googleConfig)return!1;const e=AppState.googleConfig?.appsScript;if(!e||e.enabled!==!0)return!1;const s=e.scriptUrl;return!(!s||typeof s!="string"||s.trim()===""||typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function")},hasLocalDataAvailable(e,s={}){try{if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.getLocalData!="function")return!1;const t=GoogleIntegration.getLocalData(e,s);return t!=null}catch{return!1}},canAccessData(e=null,s={}){return this.isGoogleAppsScriptEnabled()?!0:e?this.hasLocalDataAvailable(e,s):!1},getDataAccessMessage(e=null,s={}){return this.isGoogleAppsScriptEnabled()||e&&this.hasLocalDataAvailable(e,s)?null:"Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644\u0647 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"},LOAD_TIMEOUT_MS:2e3,cache:{members:null,structure:null,jobDescriptions:null,jobDescriptionsLastLoad:null,kpis:new Map,lastLoad:null,cacheTimeout:12e4},_raceWithTimeout(e,s){const t=s??this.LOAD_TIMEOUT_MS;let a;const i=new Promise((n,o)=>{a=setTimeout(()=>o({timeout:!0}),t)});return Promise.race([e,i]).then(n=>(clearTimeout(a),n),n=>{throw clearTimeout(a),n})},_getMembersFromCache(){return this.cache.members&&this.cache.lastLoad!=null&&Date.now()-this.cache.lastLoad<this.cache.cacheTimeout?this.cache.members:null},_renderStructureIntoContainer(e,s){if(!(!e||!Array.isArray(s))){if(s.length===0){e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0647\u064A\u0643\u0644 \u0648\u0638\u064A\u0641\u064A \u0645\u0633\u062C\u0644</p></div>';return}s.sort((t,a)=>(t.order||0)-(a.order||0)),this.cache.structure=s,this.cache.lastLoad=Date.now(),e.innerHTML=s.map(t=>`
            <div class="org-node" data-id="${t.id}">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(t.position||"")}</h3>
                        <p class="text-sm text-gray-600">${Utils.escapeHTML(t.memberName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</p>
                        <p class="text-xs text-gray-500">${Utils.escapeHTML(t.positionLevel||"")}</p>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="SafetyHealthManagement.editStructure('${t.id}')" class="btn-icon btn-icon-primary"><i class="fas fa-edit"></i></button>
                        <button onclick="SafetyHealthManagement.deleteStructure('${t.id}')" class="btn-icon btn-icon-danger"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join(""),requestAnimationFrame(()=>{const t=document.getElementById("add-structure-btn");if(t){const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",()=>this.showStructureForm())}})}},loadingStates:{team:!1,structure:!1,jobDescriptions:!1,kpis:!1,reports:!1,settings:!1},debounceTimers:new Map,async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("safety-health-management-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0642\u0633\u0645 safety-health-management-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}try{let s="";try{s=this.render()}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0648\u0627\u062C\u0647\u0629:",a),s=`
                    <div class="section-header">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-user-shield ml-3"></i>
                                \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629
                            </h1>
                        </div>
                    </div>
                    <div class="content-card mt-6">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="SafetyHealthManagement.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `}e.innerHTML=s;const t=document.getElementById("shm-tab-content");t&&(t.innerHTML=this.renderTeamView(),this.attachTeamAddMemberButton(),requestAnimationFrame(()=>this.loadTeamMembers().catch(()=>{})));try{this.setupEventListeners()}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A setupEventListeners:",a)}}catch(s){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629:",s),e.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <p class="text-sm text-gray-400 mb-4">${s&&s.message?Utils.escapeHTML(s.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                            <button onclick="SafetyHealthManagement.load()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `,typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",{duration:5e3})}},render(){return`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-user-shield ml-3"></i>
                            \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629
                        </h1>
                        <p class="section-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629\u060C \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u060C \u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u060C \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0648\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621</p>
                    </div>
                    <div class="flex gap-2">
                        <button id="shm-export-excel-btn" class="btn-success btn-sm">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 Excel
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tabs Navigation -->
            <div class="mt-6">
                <div class="flex items-center gap-2 border-b border-gray-200" style="border-bottom: 2px solid #e5e7eb; overflow-x: auto;">
                    <button class="shm-tab-btn active" data-tab="team" onclick="SafetyHealthManagement.switchTab('team')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap;">
                        <i class="fas fa-users ml-2"></i>
                        \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629
                    </button>
                    <button class="shm-tab-btn" data-tab="structure" onclick="SafetyHealthManagement.switchTab('structure')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap;">
                        <i class="fas fa-sitemap ml-2"></i>
                        \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A
                    </button>
                    <button class="shm-tab-btn" data-tab="job-descriptions" onclick="SafetyHealthManagement.switchTab('job-descriptions')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap;">
                        <i class="fas fa-file-alt ml-2"></i>
                        \u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A
                    </button>
                    <button class="shm-tab-btn" data-tab="kpis" onclick="SafetyHealthManagement.switchTab('kpis')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap;">
                        <i class="fas fa-chart-line ml-2"></i>
                        \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621
                    </button>
                    <button class="shm-tab-btn" data-tab="reports" onclick="SafetyHealthManagement.switchTab('reports')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap;">
                        <i class="fas fa-file-chart-line ml-2"></i>
                        \u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621
                    </button>
                    <button class="shm-tab-btn" data-tab="attendance" onclick="SafetyHealthManagement.switchTab('attendance')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap;">
                        <i class="fas fa-calendar-check ml-2"></i>
                        \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A
                    </button>
                    <button class="shm-tab-btn" data-tab="analysis" onclick="SafetyHealthManagement.switchTab('analysis')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap;">
                        <i class="fas fa-chart-bar ml-2"></i>
                        \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                    </button>
                    ${AppState.currentUser?.role==="admin"?`
                    <button class="shm-tab-btn" data-tab="settings" onclick="SafetyHealthManagement.switchTab('settings')" style="padding: 12px 20px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap;">
                        <i class="fas fa-cog ml-2"></i>
                        \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                    </button>
                    `:""}
                </div>
                <style>
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0628\u0634\u0643\u0644 \u0645\u0637\u0648\u0631 \u0648\u0645\u062D\u0633\u0646 */
                    .shm-tab-btn {
                        position: relative;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .shm-tab-btn::before {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 0;
                        height: 3px;
                        background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
                        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        border-radius: 3px 3px 0 0;
                    }
                    .shm-tab-btn:hover {
                        color: #3b82f6 !important;
                        background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
                        transform: translateY(-1px);
                    }
                    .shm-tab-btn:hover::before {
                        width: 100%;
                    }
                    .shm-tab-btn.active {
                        color: #3b82f6 !important;
                        background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
                        font-weight: 600 !important;
                        border-bottom: 3px solid transparent;
                        position: relative;
                    }
                    .shm-tab-btn.active::before {
                        width: 100%;
                        background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
                    }
                    .shm-tab-btn.active::after {
                        content: '';
                        position: absolute;
                        bottom: -3px;
                        right: 0;
                        width: 100%;
                        height: 3px;
                        background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
                        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
                    }
                    .shm-tab-btn i {
                        transition: transform 0.3s ease;
                    }
                    .shm-tab-btn:hover i {
                        transform: scale(1.1);
                    }
                    .shm-tab-btn.active i {
                        color: #3b82f6;
                        transform: scale(1.15);
                    }
                    .member-card {
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .member-card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }
                    .kpi-card {
                        border-radius: 12px;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        position: relative;
                        overflow: hidden;
                    }
                    .kpi-card::before {
                        content: '';
                        position: absolute;
                        top: -50%;
                        right: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                        pointer-events: none;
                    }
                    .kpi-card.success { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
                    .kpi-card.warning { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
                    .kpi-card.info { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
                    .kpi-card.danger { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
                    .chart-container {
                        position: relative;
                        height: 300px;
                        width: 100%;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0632\u0631\u0627\u0631 \u062F\u0627\u062E\u0644 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A */
                    #shm-tab-content .btn-primary,
                    #shm-tab-content .btn-secondary,
                    #shm-tab-content .btn-success,
                    #shm-tab-content .btn-danger,
                    #shm-tab-content .btn-icon {
                        padding: 12px 24px;
                        font-size: 14px;
                        font-weight: 600;
                        border-radius: 8px;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        position: relative;
                        overflow: hidden;
                        border: none;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    
                    /* \u0632\u0631 \u0623\u0633\u0627\u0633\u064A (Primary) */
                    #shm-tab-content .btn-primary {
                        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                        color: white;
                        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                    }
                    #shm-tab-content .btn-primary::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    #shm-tab-content .btn-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
                    }
                    #shm-tab-content .btn-primary:hover::before {
                        opacity: 1;
                    }
                    #shm-tab-content .btn-primary:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
                    }
                    #shm-tab-content .btn-primary i {
                        position: relative;
                        z-index: 1;
                    }
                    #shm-tab-content .btn-primary span,
                    #shm-tab-content .btn-primary {
                        position: relative;
                        z-index: 1;
                    }
                    
                    /* \u0632\u0631 \u062B\u0627\u0646\u0648\u064A (Secondary) */
                    #shm-tab-content .btn-secondary {
                        background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
                        color: white;
                        box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
                    }
                    #shm-tab-content .btn-secondary::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    #shm-tab-content .btn-secondary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(107, 114, 128, 0.4);
                    }
                    #shm-tab-content .btn-secondary:hover::before {
                        opacity: 1;
                    }
                    #shm-tab-content .btn-secondary:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 8px rgba(107, 114, 128, 0.3);
                    }
                    #shm-tab-content .btn-secondary i {
                        position: relative;
                        z-index: 1;
                    }
                    
                    /* \u0632\u0631 \u0646\u062C\u0627\u062D (Success) */
                    #shm-tab-content .btn-success {
                        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                        color: white;
                        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                    }
                    #shm-tab-content .btn-success::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #059669 0%, #047857 100%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    #shm-tab-content .btn-success:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
                    }
                    #shm-tab-content .btn-success:hover::before {
                        opacity: 1;
                    }
                    #shm-tab-content .btn-success:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
                    }
                    #shm-tab-content .btn-success i {
                        position: relative;
                        z-index: 1;
                    }
                    
                    /* \u0632\u0631 \u062E\u0637\u0631 (Danger) */
                    #shm-tab-content .btn-danger {
                        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                        color: white;
                        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                    }
                    #shm-tab-content .btn-danger::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    #shm-tab-content .btn-danger:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
                    }
                    #shm-tab-content .btn-danger:hover::before {
                        opacity: 1;
                    }
                    #shm-tab-content .btn-danger:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
                    }
                    #shm-tab-content .btn-danger i {
                        position: relative;
                        z-index: 1;
                    }
                    
                    /* \u0623\u0632\u0631\u0627\u0631 \u0635\u063A\u064A\u0631\u0629 (Small) */
                    #shm-tab-content .btn-sm {
                        padding: 10px 18px;
                        font-size: 13px;
                        font-weight: 600;
                        border-radius: 6px;
                    }
                    #shm-tab-content .btn-sm:hover {
                        transform: translateY(-1px);
                    }
                    
                    /* \u0623\u0632\u0631\u0627\u0631 \u0641\u064A \u0627\u0644\u0643\u0631\u0648\u062A */
                    .member-card .btn-primary,
                    .member-card .btn-secondary,
                    .member-card .btn-danger {
                        padding: 10px 18px;
                        font-size: 13px;
                        font-weight: 600;
                    }
                    
                    /* \u0623\u0632\u0631\u0627\u0631 \u0641\u064A \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0648\u0627\u0644\u0642\u0648\u0627\u0626\u0645 */
                    .org-node .btn-icon,
                    .bg-white.border .btn-icon {
                        width: 36px;
                        height: 36px;
                        padding: 8px;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 */
                    #shm-tab-content .form-input + button,
                    #shm-tab-content select + button {
                        margin-top: 0;
                    }
                    
                    /* \u0623\u0632\u0631\u0627\u0631 \u0641\u064A \u0627\u0644\u0640 Header \u0627\u0644\u0631\u0626\u064A\u0633\u064A */
                    .section-header .btn-success,
                    .section-header .btn-secondary {
                        padding: 12px 24px;
                        font-size: 14px;
                        font-weight: 600;
                        border-radius: 8px;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 */
                    #shm-export-excel-btn {
                        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                        color: white;
                        padding: 10px 20px;
                        font-size: 13px;
                        font-weight: 600;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                        transition: all 0.3s ease;
                    }
                    #shm-export-excel-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
                        background: linear-gradient(135deg, #059669 0%, #047857 100%);
                    }
                    #shm-export-excel-btn i {
                        transition: transform 0.3s ease;
                    }
                    #shm-export-excel-btn:hover i {
                        transform: scale(1.15);
                    }
                    
                    /* \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0627\u062A */
                    #shm-tab-content .btn-icon {
                        padding: 10px;
                        width: 40px;
                        height: 40px;
                        border-radius: 8px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }
                    #shm-tab-content .btn-icon-primary {
                        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                        color: white;
                        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
                    }
                    #shm-tab-content .btn-icon-primary:hover {
                        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                        transform: translateY(-2px) scale(1.05);
                        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                    }
                    #shm-tab-content .btn-icon-danger {
                        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                        color: white;
                        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
                    }
                    #shm-tab-content .btn-icon-danger:hover {
                        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                        transform: translateY(-2px) scale(1.05);
                        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
                    }
                    
                    /* \u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0627\u062A \u062F\u0627\u062E\u0644 \u0627\u0644\u0623\u0632\u0631\u0627\u0631 */
                    #shm-tab-content .btn-primary i,
                    #shm-tab-content .btn-secondary i,
                    #shm-tab-content .btn-success i,
                    #shm-tab-content .btn-danger i {
                        transition: transform 0.3s ease;
                    }
                    #shm-tab-content .btn-primary:hover i,
                    #shm-tab-content .btn-secondary:hover i,
                    #shm-tab-content .btn-success:hover i,
                    #shm-tab-content .btn-danger:hover i {
                        transform: scale(1.15);
                    }
                    
                    /* \u0623\u0632\u0631\u0627\u0631 \u0641\u064A \u0627\u0644\u0640 Header */
                    .card-header .btn-primary,
                    .card-header .btn-secondary,
                    .card-header .btn-success {
                        padding: 12px 24px;
                        font-size: 14px;
                        font-weight: 600;
                    }
                    
                    /* \u0623\u0632\u0631\u0627\u0631 \u0641\u064A \u0627\u0644\u0640 Modal */
                    .modal-footer .btn-primary,
                    .modal-footer .btn-secondary {
                        padding: 12px 24px;
                        font-size: 14px;
                        font-weight: 600;
                        min-width: 120px;
                        border-radius: 8px;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0646\u0645\u0627\u0630\u062C */
                    .modal-overlay .btn-primary,
                    .modal-overlay .btn-secondary {
                        padding: 12px 24px;
                        font-size: 14px;
                        font-weight: 600;
                        border-radius: 8px;
                    }
                    
                    /* \u0623\u0632\u0631\u0627\u0631 \u0641\u064A \u0627\u0644\u0640 Card Header */
                    .card-header button {
                        padding: 12px 24px;
                        font-size: 14px;
                        font-weight: 600;
                        border-radius: 8px;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A */
                    #attendance-member-select + button,
                    #add-attendance-btn,
                    #add-leave-btn {
                        padding: 12px 24px;
                        font-size: 14px;
                        font-weight: 600;
                        border-radius: 8px;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 */
                    #report-member-select + button,
                    #generate-report-btn {
                        padding: 12px 24px;
                        font-size: 14px;
                        font-weight: 600;
                        border-radius: 8px;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0632\u0631\u0627\u0631 KPIs */
                    #kpi-member-select + button,
                    #calculate-kpis-btn {
                        padding: 14px 28px;
                        font-size: 15px;
                        font-weight: 600;
                        border-radius: 10px;
                        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                        color: white;
                        border: none;
                        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
                        transition: all 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    }
                    #calculate-kpis-btn::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    #calculate-kpis-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
                    }
                    #calculate-kpis-btn:hover::before {
                        opacity: 1;
                    }
                    #calculate-kpis-btn:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
                    }
                    #calculate-kpis-btn i {
                        position: relative;
                        z-index: 1;
                    }
                    #calculate-kpis-btn span,
                    #calculate-kpis-btn {
                        position: relative;
                        z-index: 1;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0644\u0644\u062D\u0636\u0648\u0631 */
                    .attendance-tab-btn {
                        padding: 10px 16px;
                        font-size: 14px;
                        font-weight: 500;
                        border-radius: 8px 8px 0 0;
                        transition: all 0.3s ease;
                    }
                    .attendance-tab-btn:hover {
                        background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
                    }
                    .attendance-tab-btn.active {
                        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
                        color: #3b82f6;
                        font-weight: 600;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A */
                    #settings-container .btn-primary,
                    #settings-container .btn-secondary,
                    #settings-container .btn-danger {
                        padding: 10px 20px;
                        font-size: 13px;
                        font-weight: 600;
                        border-radius: 8px;
                    }
                    
                    /* \u062A\u062D\u0633\u064A\u0646 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F */
                    #import-employee-btn {
                        padding: 10px 16px;
                        font-size: 13px;
                        font-weight: 600;
                        border-radius: 6px;
                    }
                </style>
            </div>
            
            <!-- Tab Content -->
            <div id="shm-tab-content" class="mt-6">
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async switchTab(e){try{this.currentView=e,document.querySelectorAll(".shm-tab-btn").forEach(t=>{t.classList.remove("active"),t.dataset.tab===e&&t.classList.add("active")});const s=document.getElementById("shm-tab-content");if(!s){Utils.safeError("\u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}switch(e){case"team":s.innerHTML=this.renderTeamView(),requestAnimationFrame(()=>{this.attachTeamAddMemberButton(),this.loadTeamMembers()});break;case"structure":s.innerHTML=await this.renderStructureView(),requestAnimationFrame(()=>{const t=document.getElementById("add-structure-btn");if(t){const n=t.cloneNode(!0);t.parentNode.replaceChild(n,t),n.addEventListener("click",()=>this.showStructureForm())}const a=document.getElementById("shm-goto-team-btn");if(a){const n=a.cloneNode(!0);a.parentNode.replaceChild(n,a),n.addEventListener("click",()=>this.switchTab("team"))}const i=document.getElementById("create-structure-from-team-btn");if(i){const n=i.cloneNode(!0);i.parentNode.replaceChild(n,i),n.addEventListener("click",()=>this.createStructureFromTeam())}this.loadOrganizationalStructure()});break;case"job-descriptions":s.innerHTML=await this.renderJobDescriptionsView(),requestAnimationFrame(()=>{this.attachJobDescriptionAddButton(),this.loadJobDescriptions()});break;case"kpis":s.innerHTML=await this.renderKPIsView(),requestAnimationFrame(()=>{this.loadKPIs()});break;case"reports":s.innerHTML=await this.renderReportsView(),requestAnimationFrame(()=>{this.loadReports()});break;case"attendance":s.innerHTML=await this.renderAttendanceView(),requestAnimationFrame(()=>{this.loadAttendance()});break;case"analysis":s.innerHTML=await this.renderAnalysisView(),requestAnimationFrame(()=>{this.loadAnalysis()});break;case"settings":AppState.currentUser?.role==="admin"?(s.innerHTML=await this.renderSettingsView(),requestAnimationFrame(()=>{this.loadSettings()})):(Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"),await this.switchTab("team"));break;default:Utils.safeWarn("\u062A\u0628\u0648\u064A\u0628 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641: "+e);break}}catch(s){const t=s?.message||s?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",t,s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0628\u0648\u064A\u0628: "+t)}},getTeamListSkeletonHTML(){if(!document.getElementById("shm-skeleton-style")){const s=document.createElement("style");s.id="shm-skeleton-style",s.textContent="@keyframes shm-shimmer{0%,100%{opacity:0.5}50%{opacity:1}}",document.head.appendChild(s)}return Array(8).fill(0).map(()=>`
            <div class="rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-sm" style="min-height: 140px;">
                <div class="h-5 bg-gray-200 rounded mb-3 w-3/4" style="animation: shm-shimmer 1.5s ease-in-out infinite;"></div>
                <div class="h-4 bg-gray-100 rounded mb-2 w-1/2" style="animation: shm-shimmer 1.5s ease-in-out infinite 0.15s;"></div>
                <div class="h-4 bg-gray-100 rounded w-2/3" style="animation: shm-shimmer 1.5s ease-in-out infinite 0.3s;"></div>
            </div>
        `).join("")},renderTeamView(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <h2 class="card-title"><i class="fas fa-users ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</h2>
                        <div class="flex items-center gap-2">
                            <button type="button" id="shm-goto-structure-btn" class="btn-secondary btn-sm">
                                <i class="fas fa-sitemap ml-2"></i>\u0639\u0631\u0636 \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A
                            </button>
                            <button id="add-team-member-btn" class="btn-primary" type="button">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0639\u0636\u0648 \u062C\u062F\u064A\u062F
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <!-- Filters -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0628\u062D\u062B</label>
                            <input type="text" id="filter-search" class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641..." oninput="SafetyHealthManagement.applyFilters()">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645</label>
                            <select id="filter-department" class="form-input" onchange="SafetyHealthManagement.applyFilters()">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                            <select id="filter-job-title" class="form-input" onchange="SafetyHealthManagement.applyFilters()">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0648\u0638\u0627\u0626\u0641</option>
                            </select>
                        </div>
                        <div class="flex items-end">
                            <button onclick="SafetyHealthManagement.clearFilters()" class="btn-secondary w-full">
                                <i class="fas fa-times ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                            </button>
                        </div>
                    </div>
                    <div id="team-members-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        ${this.getTeamListSkeletonHTML()}
                    </div>
                </div>
            </div>
        `},async loadTeamMembers(){const e=document.getElementById("team-members-list");if(!e)return;if(this.loadingStates.team){Utils.safeLog("\u26A0\uFE0F loadTeamMembers: \u0639\u0645\u0644\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u060C \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628");return}this.loadingStates.team=!0;const s=this.cache.members&&this.cache.lastLoad&&Date.now()-this.cache.lastLoad<this.cache.cacheTimeout;if(this.cache.members&&this.cache.members.length>0&&(this.allMembers=this.cache.members,this.renderTeamMembers(this.cache.members),this.loadFilterOptions(this.cache.members)),s){this.loadingStates.team=!1;return}const t=this._getMembersFromCache();t&&t.length>0?(this.allMembers=t,this.loadFilterOptions(t),this.renderTeamMembers(t)):(!this.cache.members||this.cache.members.length===0)&&(e.innerHTML=this.getTeamListSkeletonHTML());try{const a=this.getDataAccessMessage("getSafetyTeamMembers",{});if(a){e.innerHTML=`<div class="empty-state col-span-full"><p class="text-yellow-600">${a}</p></div>`,this.loadingStates.team=!1;return}const i=GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});let n;try{n=await this._raceWithTimeout(i)}catch(o){o&&o.timeout&&((!t||t.length===0)&&e&&(e.innerHTML='<div class="empty-state col-span-full"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>'),i.then(r=>{if(r&&r.success&&r.data){const c=Array.isArray(r.data)?r.data:[];if(this.allMembers=c,this.cache.members=c,this.cache.lastLoad=Date.now(),c.length===0){const d=document.getElementById("team-members-list");d&&(d.innerHTML='<div class="empty-state col-span-full"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0639\u0636\u0627\u0621 \u0645\u0633\u062C\u0644\u064A\u0646</p></div>')}else this.loadFilterOptions(c),this.renderTeamMembers(c)}}).catch(()=>{})),this.loadingStates.team=!1;return}if(n&&n.success&&n.data){const o=Array.isArray(n.data)?n.data:[];this.allMembers=o,this.cache.members=o,this.cache.lastLoad=Date.now(),o.length===0?e.innerHTML='<div class="empty-state col-span-full"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0639\u0636\u0627\u0621 \u0645\u0633\u062C\u0644\u064A\u0646</p></div>':(this.loadFilterOptions(o),this.renderTeamMembers(o))}else(!this.cache.members||this.cache.members.length===0)&&(e.innerHTML='<div class="empty-state col-span-full"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0639\u0636\u0627\u0621 \u0645\u0633\u062C\u0644\u064A\u0646</p></div>')}catch(a){const i=a?.message||a?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";if(i.includes("runtime.lastError")||i.includes("message port closed")||i.includes("Receiving end does not exist")||i.includes("Could not establish connection")||i.includes("Extension context invalidated")||i.includes("The message port closed before a response was received")){Utils.safeLog("\u26A0 \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u062E\u0637\u0623 Chrome Extension \u0641\u064A loadTeamMembers"),setTimeout(()=>this.loadTeamMembers(),1e3),this.loadingStates.team=!1;return}!i.includes("Google Apps Script")&&!i.includes("\u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642:",i,a),(!this.cache.members||this.cache.members.length===0)&&(e.innerHTML='<div class="empty-state col-span-full"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0639\u0636\u0627\u0621 \u0645\u0633\u062C\u0644\u064A\u0646</p></div>')}finally{this.loadingStates.team=!1}},loadFilterOptions(e){const s=[...new Set(e.map(n=>n.department).filter(Boolean))],t=document.getElementById("filter-department");t&&(t.innerHTML='<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645</option>'+s.map(n=>`<option value="${Utils.escapeHTML(n)}">${Utils.escapeHTML(n)}</option>`).join(""));const a=[...new Set(e.map(n=>n.jobTitle).filter(Boolean))],i=document.getElementById("filter-job-title");i&&(i.innerHTML='<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0648\u0638\u0627\u0626\u0641</option>'+a.map(n=>`<option value="${Utils.escapeHTML(n)}">${Utils.escapeHTML(n)}</option>`).join(""))},applyFilters(){if(!this.allMembers)return;const e=(document.getElementById("filter-search")?.value||"").toLowerCase(),s=document.getElementById("filter-department")?.value||"",t=document.getElementById("filter-job-title")?.value||"";this.filters.search=e,this.filters.department=s,this.filters.jobTitle=t;const a=this.allMembers.filter(i=>{const n=!e||(i.name||"").toLowerCase().includes(e)||(i.email||"").toLowerCase().includes(e)||(i.phone||"").includes(e),o=!s||i.department===s,r=!t||i.jobTitle===t;return n&&o&&r});this.renderTeamMembers(a)},clearFilters(){document.getElementById("filter-search")&&(document.getElementById("filter-search").value=""),document.getElementById("filter-department")&&(document.getElementById("filter-department").value=""),document.getElementById("filter-job-title")&&(document.getElementById("filter-job-title").value=""),this.filters={department:"",jobTitle:"",period:"",search:""},this.allMembers&&this.renderTeamMembers(this.allMembers)},renderTeamMembers(e){const s=document.getElementById("team-members-list");if(s){if(e.length===0){s.innerHTML='<div class="empty-state col-span-full"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C</p></div>';return}s.innerHTML=e.map(t=>`
            <div class="member-card bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div class="flex flex-col items-center text-center mb-3">
                    ${t.photo?`
                        ${(()=>{const a=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t.photo):{canonical:String(t.photo),displaySrc:String(t.photo),needsProxy:!1,proxyFileId:""},i=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(a):"";return`<img src="${Utils.escapeHTML(a.displaySrc)}" alt="${Utils.escapeHTML(t.name)}"${i}
                             class="shm-member-photo w-20 h-20 rounded-full object-cover border-4 border-blue-100 mb-3">`})()}
                    `:`
                        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-3 shadow-lg">
                            <i class="fas fa-user text-3xl text-white"></i>
                        </div>
                    `}
                    <div class="w-full">
                        <h3 class="font-bold text-gray-800 text-lg mb-1">${Utils.escapeHTML(t.name||"")}</h3>
                        <p class="text-sm font-semibold text-blue-600 mb-1">${Utils.escapeHTML(t.jobTitle||"")}</p>
                        <p class="text-xs text-gray-500 mb-2">${Utils.escapeHTML(t.department||"")}</p>
                        ${t.positionLevel?`<span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">${Utils.escapeHTML(t.positionLevel)}</span>`:""}
                    </div>
                </div>
                <div class="space-y-2 text-sm text-gray-600 mb-4 pt-4 border-t border-gray-100">
                    ${t.email?`
                        <div class="flex items-center gap-2">
                            <i class="fas fa-envelope text-blue-500 w-4"></i>
                            <span class="truncate">${Utils.escapeHTML(t.email)}</span>
                        </div>
                    `:""}
                    ${t.phone?`
                        <div class="flex items-center gap-2">
                            <i class="fas fa-phone text-green-500 w-4"></i>
                            <span>${Utils.escapeHTML(t.phone)}</span>
                        </div>
                    `:""}
                    ${t.appointmentDate?`
                        <div class="flex items-center gap-2">
                            <i class="fas fa-calendar text-purple-500 w-4"></i>
                            <span>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646: ${Utils.formatDate(t.appointmentDate)}</span>
                        </div>
                    `:""}
                </div>
                <div class="flex gap-2 pt-3 border-t border-gray-200">
                    <button onclick="SafetyHealthManagement.viewMember('${t.id}')" class="btn-primary btn-sm flex-1">
                        <i class="fas fa-eye ml-1"></i>
                        \u0639\u0631\u0636
                    </button>
                    <button onclick="SafetyHealthManagement.showMemberForm(${JSON.stringify(t).replace(/"/g,"&quot;")})" class="btn-secondary btn-sm" title="\u062A\u0639\u062F\u064A\u0644">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="SafetyHealthManagement.deleteMember('${t.id}')" class="btn-danger btn-sm" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join(""),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s,{onFetchFail:t=>{try{const a=document.createElement("div");a.className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-3 shadow-lg",a.innerHTML='<i class="fas fa-user text-3xl text-white"></i>',t.replaceWith(a)}catch{}}})}},attachTeamAddMemberButton(){const e=document.getElementById("add-team-member-btn");if(e){const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),t.addEventListener("click",()=>this.showMemberForm())}const s=document.getElementById("shm-goto-structure-btn");if(s){const t=s.cloneNode(!0);s.parentNode.replaceChild(t,s),t.addEventListener("click",()=>this.switchTab("structure"))}},attachJobDescriptionAddButton(){const e=document.getElementById("add-job-description-btn");if(e){const s=e.cloneNode(!0);e.parentNode.replaceChild(s,e),s.addEventListener("click",()=>this.showJobDescriptionForm())}},setupEventListeners(){requestAnimationFrame(()=>{this.attachTeamAddMemberButton();const e=document.getElementById("shm-export-excel-btn");if(e){const s=e.cloneNode(!0);e.parentNode.replaceChild(s,e),s.addEventListener("click",()=>this.exportAllToExcel())}})},async showMemberForm(e=null){const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642":"\u0625\u0636\u0627\u0641\u0629 \u0639\u0636\u0648 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="team-member-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0627\u0633\u0645 *</label>
                                <input type="text" id="member-name" required class="form-input" 
                                    value="${Utils.escapeHTML(e?.name||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0639\u0636\u0648">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 *</label>
                                <input type="text" id="member-job-title" required class="form-input" 
                                    value="${Utils.escapeHTML(e?.jobTitle||"")}" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 *</label>
                                <input type="text" id="member-department" required class="form-input" 
                                    value="${Utils.escapeHTML(e?.department||"")}" placeholder="\u0627\u0644\u0642\u0633\u0645">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</label>
                                <input type="email" id="member-email" class="form-input" 
                                    value="${Utils.escapeHTML(e?.email||"")}" placeholder="email@example.com">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0647\u0627\u062A\u0641</label>
                                <input type="tel" id="member-phone" class="form-input" 
                                    value="${Utils.escapeHTML(e?.phone||"")}" placeholder="0123456789">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646</label>
                                <input type="date" id="member-appointment-date" class="form-input" 
                                    value="${e?.appointmentDate?new Date(e.appointmentDate).toISOString().split("T")[0]:""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629</label>
                                <input type="text" id="member-position-level" class="form-input" 
                                    value="${Utils.escapeHTML(e?.positionLevel||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0645\u062F\u064A\u0631\u060C \u0645\u0634\u0631\u0641">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0645\u0632 \u0627\u0644\u0645\u0648\u0638\u0641 (\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A)</label>
                                <div class="flex gap-2">
                                    <input type="text" id="member-employee-code" class="form-input flex-1" 
                                        value="${Utils.escapeHTML(e?.employeeCode||"")}" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A">
                                    <button type="button" id="import-employee-btn" class="btn-secondary" title="\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646">
                                        <i class="fas fa-download ml-1"></i>
                                        \u0627\u0633\u062A\u064A\u0631\u0627\u062F
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0648\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u0627\u0633\u062A\u064A\u0631\u0627\u062F" \u0644\u0645\u0644\u0621 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</p>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629 (\u0631\u0627\u0628\u0637 URL)</label>
                            <input type="url" id="member-photo" class="form-input" 
                                value="${Utils.escapeHTML(e?.photo||"")}" placeholder="https://example.com/photo.jpg">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-member-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(s);const t=s.querySelector("#import-employee-btn"),a=s.querySelector("#member-employee-code");t&&a&&(t.addEventListener("click",()=>this.importEmployeeFromDatabase(s)),a.addEventListener("keydown",o=>{o.key==="Enter"&&(o.preventDefault(),this.importEmployeeFromDatabase(s))}));const i=s.querySelector("#save-member-btn"),n=s.querySelector("#team-member-form");i.addEventListener("click",()=>this.handleMemberSubmit(n,e?.id,s)),s.addEventListener("click",o=>{o.target===s&&s.remove()})},async importEmployeeFromDatabase(e){const s=e.querySelector("#member-employee-code");if(!s)return;const t=s.value.trim();if(!t){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0623\u0648\u0644\u0627\u064B"),s.focus();return}try{Loading.show();let a=null;if(typeof EmployeeHelper<"u"&&EmployeeHelper.findByCode&&(a=EmployeeHelper.findByCode(t)),!a)try{const p=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Employees"}});p.success&&p.data&&(a=(Array.isArray(p.data)?p.data:[]).find(y=>{const b=String(y.employeeNumber||y.sapId||y.employeeCode||y.id||"").trim();return b===t||b.toLowerCase()===t.toLowerCase()}))}catch(p){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646:",p),typeof EmployeeHelper<"u"&&EmployeeHelper.findByPartial&&(a=EmployeeHelper.findByPartial(t))}if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A: "+t),Loading.hide();return}const i=e.querySelector("#member-name"),n=e.querySelector("#member-job-title"),o=e.querySelector("#member-department"),r=e.querySelector("#member-email"),c=e.querySelector("#member-phone"),d=e.querySelector("#member-appointment-date"),m=e.querySelector("#member-position-level"),u=e.querySelector("#member-photo");if(i&&a.name&&(i.value=a.name),n&&(a.job||a.position||a.jobTitle)&&(n.value=a.job||a.position||a.jobTitle),o&&a.department&&(o.value=a.department),r&&a.email&&(r.value=a.email),c&&a.phone&&(c.value=a.phone),d&&a.hireDate){const p=new Date(a.hireDate);isNaN(p.getTime())||(d.value=p.toISOString().split("T")[0])}if(m&&a.position&&(m.value=a.position),u&&a.photo&&(u.value=a.photo),s){const p=a.employeeNumber||a.sapId||a.employeeCode||t;s.value=p}Notification.success("\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D")}catch(a){const i=a?.message||a?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641:",i,a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+i)}finally{Loading.hide()}},async handleMemberSubmit(e,s=null,t){if(!e||!e.checkValidity()){e&&e.reportValidity();return}try{const a=document.getElementById("member-name"),i=document.getElementById("member-job-title"),n=document.getElementById("member-department"),o=document.getElementById("member-email"),r=document.getElementById("member-phone"),c=document.getElementById("member-appointment-date"),d=document.getElementById("member-position-level"),m=document.getElementById("member-employee-code"),u=document.getElementById("member-photo");if(!a||!i||!n){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: \u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const p={name:a.value.trim(),jobTitle:i.value.trim(),department:n.value.trim(),email:o?o.value.trim():"",phone:r?r.value.trim():"",appointmentDate:c&&c.value?c.value:null,positionLevel:d?d.value.trim():"",employeeCode:m?m.value.trim():"",photo:u?u.value.trim():"",status:"active"};if(!p.name||!p.jobTitle||!p.department){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}if(this.loadingStates.team){Notification.warning("\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 \u0639\u0645\u0644\u064A\u0629 \u0623\u062E\u0631\u0649\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631...");return}this.loadingStates.team=!0,Loading.show();const v=s?"updateSafetyTeamMember":"addSafetyTeamMember",y=s?{memberId:s,updateData:p}:p,b=await GoogleIntegration.sendRequest({action:v,data:y});if(b.success)Notification.success(s?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0636\u0648 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0636\u0648 \u0628\u0646\u062C\u0627\u062D"),this.cache.members=null,t&&t.remove(),await this.loadTeamMembers();else{const w=b.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638";Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+w)}}catch(a){const i=a?.message||a?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0636\u0648:",i,a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i)}finally{Loading.hide(),this.loadingStates.team=!1}},async viewMember(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0639\u0636\u0648 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}try{Loading.show();const s=await GoogleIntegration.sendRequest({action:"getSafetyTeamMember",data:{memberId:e}});if(s.success&&s.data){const t=s.data;this.currentMemberId=e,await this.switchTab("kpis"),requestAnimationFrame(()=>{const a=document.getElementById("kpi-member-select");a?(a.value=e,this.loadMemberKPIs()):requestAnimationFrame(()=>{requestAnimationFrame(()=>{const i=document.getElementById("kpi-member-select");i&&(i.value=e,this.loadMemberKPIs())})})})}else{const t=s.message||"\u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F";Notification.error(t)}}catch(s){const t=s?.message||s?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0636\u0648:",t,s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t)}finally{Loading.hide()}},async deleteMember(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0639\u0636\u0648 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0636\u0648 \u0645\u0646 \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`))try{if(this.loadingStates.team){Notification.warning("\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 \u0639\u0645\u0644\u064A\u0629 \u0623\u062E\u0631\u0649\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631...");return}this.loadingStates.team=!0,Loading.show();const s=await GoogleIntegration.sendRequest({action:"deleteSafetyTeamMember",data:{memberId:e}});if(s.success)Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0636\u0648 \u0628\u0646\u062C\u0627\u062D"),this.cache.members=null,await this.loadTeamMembers();else{const t=s.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641";Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t)}}catch(s){const t=s?.message||s?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0639\u0636\u0648:",t,s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t)}finally{Loading.hide(),this.loadingStates.team=!1}},async renderStructureView(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                        <h2 class="card-title"><i class="fas fa-sitemap ml-2"></i>\u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</h2>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button type="button" id="shm-goto-team-btn" class="btn-secondary btn-sm">
                                <i class="fas fa-users ml-2"></i>\u0639\u0631\u0636 \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629
                            </button>
                            <button type="button" id="create-structure-from-team-btn" class="btn-secondary btn-sm">
                                <i class="fas fa-sync-alt ml-2"></i>\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0647\u064A\u0643\u0644 \u0645\u0646 \u0627\u0644\u0641\u0631\u064A\u0642
                            </button>
                            <button id="add-structure-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u0635\u0628
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="organizational-structure-container" class="org-structure-tree">
                        <div class="empty-state">
                            <p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0647\u064A\u0643\u0644 \u0648\u0638\u064A\u0641\u064A \u0645\u0633\u062C\u0644</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadOrganizationalStructure(){const e=document.getElementById("organizational-structure-container");if(!e)return;if(this.loadingStates.structure){Utils.safeLog("\u26A0\uFE0F loadOrganizationalStructure: \u0639\u0645\u0644\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u060C \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628");return}if(this.loadingStates.structure=!0,this.cache.structure&&this.cache.lastLoad&&Date.now()-this.cache.lastLoad<this.cache.cacheTimeout){const t=this.cache.structure;t.sort((a,i)=>(a.order||0)-(i.order||0)),e.innerHTML=t.map(a=>`
                <div class="org-node" data-id="${a.id}">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(a.position||"")}</h3>
                            <p class="text-sm text-gray-600">${Utils.escapeHTML(a.memberName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</p>
                            <p class="text-xs text-gray-500">${Utils.escapeHTML(a.positionLevel||"")}</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="SafetyHealthManagement.editStructure('${a.id}')" class="btn-icon btn-icon-primary">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="SafetyHealthManagement.deleteStructure('${a.id}')" class="btn-icon btn-icon-danger">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join(""),requestAnimationFrame(()=>{const a=document.getElementById("add-structure-btn");if(a){const i=a.cloneNode(!0);a.parentNode.replaceChild(i,a),i.addEventListener("click",()=>this.showStructureForm())}}),this.loadingStates.structure=!1;return}const s=this.getDataAccessMessage("getOrganizationalStructure",{});if(s){e.innerHTML=`<div class="empty-state"><p class="text-gray-500">${s}</p></div>`,this.loadingStates.structure=!1;return}try{e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';const t=GoogleIntegration.sendRequest({action:"getOrganizationalStructure",data:{}});let a;try{a=await this._raceWithTimeout(t)}catch(i){if(i&&i.timeout){e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>',t.then(n=>{if(n&&n.success&&n.data){const o=Array.isArray(n.data)?n.data:[],r=document.getElementById("organizational-structure-container");r&&this._renderStructureIntoContainer(r,o)}this.loadingStates.structure=!1}).catch(()=>{this.loadingStates.structure=!1});return}throw i}if(a.success&&a.data){const i=Array.isArray(a.data)?a.data:[];this._renderStructureIntoContainer(e,i)}else e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0647\u064A\u0643\u0644 \u0648\u0638\u064A\u0641\u064A \u0645\u0633\u062C\u0644</p></div>',requestAnimationFrame(()=>{const i=document.getElementById("add-structure-btn");if(i){const n=i.cloneNode(!0);i.parentNode.replaceChild(n,i),n.addEventListener("click",()=>this.showStructureForm())}})}catch(t){const a=t?.message||t?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";if(a.includes("runtime.lastError")||a.includes("message port closed")||a.includes("Receiving end does not exist")||a.includes("Could not establish connection")||a.includes("Extension context invalidated")||a.includes("The message port closed before a response was received")){Utils.safeLog("\u26A0 \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u062E\u0637\u0623 Chrome Extension \u0641\u064A loadOrganizationalStructure"),setTimeout(()=>{this.loadOrganizationalStructure()},1e3),this.loadingStates.structure=!1;return}const n=this.isGoogleAppsScriptEnabled();n&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",a,t);let o="\u0644\u0627 \u064A\u0648\u062C\u062F \u0647\u064A\u0643\u0644 \u0648\u0638\u064A\u0641\u064A \u0645\u0633\u062C\u0644",r=!1;a.includes("\u063A\u064A\u0631 \u0645\u0639\u062A\u0631\u0641 \u0628\u0647")||a.includes("Action not recognized")||a.includes("ACTION_NOT_RECOGNIZED")?(o=a,r=n):a.includes("Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")?(o="Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644\u0647 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",r=!1):n&&(a.includes("Failed to fetch")||a.includes("NetworkError")||a.includes("CORS"))?(o="\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Apps Script",r=!0):n&&a.includes("\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")&&(o=a,r=!0),e.innerHTML=`
                <div class="empty-state">
                    <p class="${r?"text-red-500":"text-gray-500"} mb-2">${Utils.escapeHTML(o)}</p>
                    ${r?`
                    <button onclick="SafetyHealthManagement.loadOrganizationalStructure()" class="btn-secondary btn-sm mt-2">
                        <i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                    </button>
                    `:""}
                </div>
            `}finally{this.loadingStates.structure=!1}},async showStructureForm(e=null){const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0646\u0635\u0628":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u0635\u0628 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="structure-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0646\u0635\u0628 *</label>
                            <input type="text" id="structure-position" required class="form-input" 
                                value="${Utils.escapeHTML(e?.position||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629</label>
                            <input type="text" id="structure-position-level" class="form-input" 
                                value="${Utils.escapeHTML(e?.positionLevel||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0645\u062F\u064A\u0631">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</label>
                            <select id="structure-member-id" class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0631\u062A\u064A\u0628</label>
                            <input type="number" id="structure-order" class="form-input" 
                                value="${e?.order||0}" min="0">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641</label>
                            <textarea id="structure-description" class="form-input" rows="3" 
                                placeholder="\u0648\u0635\u0641 \u0627\u0644\u0645\u0646\u0635\u0628">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-structure-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(s);const t=await this.loadTeamMembersForDropdown(s.querySelector("#structure-member-id"),e?.memberId),a=s.querySelector("#structure-member-id"),i=s.querySelector("#structure-position"),n=s.querySelector("#structure-position-level"),o=s.querySelector("#structure-description"),r=m=>{if(!m||!Array.isArray(t)||t.length===0)return;const u=t.find(p=>String(p.id)===String(m));if(u&&(i&&(i.value=u.jobTitle||u.position||""),n&&(n.value=u.positionLevel||u.jobTitle||""),o&&!o.value)){const p=[u.department?"\u0627\u0644\u0642\u0633\u0645: "+u.department:"",u.jobTitle?"\u0627\u0644\u0648\u0638\u064A\u0641\u0629: "+u.jobTitle:""].filter(Boolean);o.value=p.length?p.join(" \u2014 "):""}};a&&(a.addEventListener("change",function(){r(this.value)}),e?.memberId?r(e.memberId):a.value&&r(a.value));const c=s.querySelector("#save-structure-btn"),d=s.querySelector("#structure-form");c.addEventListener("click",()=>this.handleStructureSubmit(d,e?.id,s)),s.addEventListener("click",m=>{m.target===s&&s.remove()})},async loadTeamMembersForDropdown(e,s=null){if(!e)return[];const t=this.getDataAccessMessage("getSafetyTeamMembers",{});if(t)return e.innerHTML=`<option value="">${t}</option>`,[];try{const a=await GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});if(a.success&&a.data){const i=Array.isArray(a.data)?a.data:[];return e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+i.map(n=>`
                        <option value="${Utils.escapeHTML(String(n.id))}" ${n.id===s||String(n.id)===String(s)?"selected":""}>
                            ${Utils.escapeHTML(n.name||"")} - ${Utils.escapeHTML(n.jobTitle||n.position||"")}
                        </option>
                    `).join(""),i}}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642:",a)}return[]},async handleStructureSubmit(e,s=null,t){if(!e.checkValidity()){e.reportValidity();return}const a=document.getElementById("structure-member-id").value;let i="";if(a)try{const o=await GoogleIntegration.sendRequest({action:"getSafetyTeamMember",data:{memberId:a}});o.success&&o.data&&(i=o.data.name||"")}catch{}const n={position:document.getElementById("structure-position").value.trim(),positionLevel:document.getElementById("structure-position-level").value.trim(),memberId:a||null,memberName:i,order:parseInt(document.getElementById("structure-order").value)||0,description:document.getElementById("structure-description").value.trim()};if(this.loadingStates.structure){Notification.warning("\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 \u0639\u0645\u0644\u064A\u0629 \u0623\u062E\u0631\u0649\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631...");return}this.loadingStates.structure=!0,Loading.show();try{const o=await GoogleIntegration.sendRequest({action:"saveOrganizationalStructure",data:n});o.success?(Notification.success(s?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0646\u0635\u0628 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0646\u0635\u0628 \u0628\u0646\u062C\u0627\u062D"),this.cache.structure=null,t.remove(),await this.loadOrganizationalStructure()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(o.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(o){const r=o?.message||o?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0646\u0635\u0628:",r,o),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+r)}finally{Loading.hide(),this.loadingStates.structure=!1}},async createStructureFromTeam(){if(this.loadingStates.structure){Notification.warning("\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 \u0639\u0645\u0644\u064A\u0629 \u0623\u062E\u0631\u0649\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631...");return}const e=this.getDataAccessMessage("getSafetyTeamMembers",{});if(e){Notification.error(e);return}const s=this.getDataAccessMessage("getOrganizationalStructure",{});if(s){Notification.error(s);return}try{this.loadingStates.structure=!0,Loading.show();const[t,a]=await Promise.all([GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}}),GoogleIntegration.sendRequest({action:"getOrganizationalStructure",data:{}})]),i=t.success&&t.data?Array.isArray(t.data)?t.data:[]:[],n=a.success&&a.data?Array.isArray(a.data)?a.data:[]:[],o=new Set(n.map(m=>m.memberId).filter(Boolean).map(m=>String(m))),r=i.filter(m=>!o.has(String(m.id)));if(r.length===0){Notification.info("\u062C\u0645\u064A\u0639 \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642 \u0645\u0636\u0627\u0641\u0648\u0646 \u0628\u0627\u0644\u0641\u0639\u0644 \u0625\u0644\u0649 \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),Loading.hide(),this.loadingStates.structure=!1;return}const c=n.length?Math.max(...n.map(m=>m.order||0)):0;let d=0;for(let m=0;m<r.length;m++){const u=r[m],p={position:u.jobTitle||u.position||"\u0645\u0646\u0635\u0628 \u0641\u064A \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",positionLevel:u.positionLevel||u.jobTitle||"",memberId:u.id,memberName:u.name||"",order:c+m+1,description:u.department?"\u0627\u0644\u0642\u0633\u0645: "+(u.department||""):""},v=await GoogleIntegration.sendRequest({action:"saveOrganizationalStructure",data:p});v&&v.success&&d++}this.cache.structure=null,await this.loadOrganizationalStructure(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0647\u064A\u0643\u0644 \u0645\u0646 \u0627\u0644\u0641\u0631\u064A\u0642: \u062A\u0645\u062A \u0625\u0636\u0627\u0641\u0629 "+d+" \u0645\u0646\u0635\u0628/\u0645\u0646\u0627\u0635\u0628")}catch(t){const a=t?.message||t?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0647\u064A\u0643\u0644 \u0645\u0646 \u0627\u0644\u0641\u0631\u064A\u0642:",a,t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+a)}finally{Loading.hide(),this.loadingStates.structure=!1}},async editStructure(e){if(this.loadingStates.structure){Notification.warning("\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 \u0639\u0645\u0644\u064A\u0629 \u0623\u062E\u0631\u0649\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631...");return}try{Loading.show();let s=this.cache.structure;if(!s){const a=await GoogleIntegration.sendRequest({action:"getOrganizationalStructure",data:{}});if(a.success&&a.data)s=Array.isArray(a.data)?a.data:[],this.cache.structure=s;else{Notification.error("\u0641\u0634\u0644 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),Loading.hide();return}}const t=s.find(a=>a.id===e);t?this.showStructureForm(t):Notification.error("\u0627\u0644\u0645\u0646\u0635\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")}catch(s){const t=s?.message||s?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0646\u0635\u0628:",t,s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t)}finally{Loading.hide()}},async deleteStructure(e){if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u0635\u0628\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`))try{if(this.loadingStates.structure){Notification.warning("\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 \u0639\u0645\u0644\u064A\u0629 \u0623\u062E\u0631\u0649\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631...");return}this.loadingStates.structure=!0,Loading.show();const s=await GoogleIntegration.sendRequest({action:"getOrganizationalStructure",data:{}});if(s.success&&s.data){const a=(Array.isArray(s.data)?s.data:[]).filter(n=>n.id!==e),i=await GoogleIntegration.sendRequest({action:"saveOrganizationalStructure",data:{structure:a}});i.success?(Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u0635\u0628 \u0628\u0646\u062C\u0627\u062D"),this.cache.structure=null,await this.loadOrganizationalStructure()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(i.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641"))}else Notification.error("\u0641\u0634\u0644 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}catch(s){const t=s?.message||s?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u0635\u0628:",t,s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t)}finally{Loading.hide(),this.loadingStates.structure=!1}},async renderJobDescriptionsView(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-file-alt ml-2"></i>\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</h2>
                        <button id="add-job-description-btn" class="btn-primary" type="button">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0648\u0635\u0641 \u0648\u0638\u064A\u0641\u064A
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="job-descriptions-list" class="space-y-4">
                        <div class="empty-state">
                            <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0648\u0635\u0627\u0641 \u0648\u0638\u064A\u0641\u064A\u0629 \u0645\u0633\u062C\u0644\u0629</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async _loadJobDescriptionsFetch(e){if(!document.getElementById("job-descriptions-list")||!e||e.length===0)return;const t=e.map(i=>GoogleIntegration.sendRequest({action:"getJobDescription",data:{memberId:i.id}}).then(n=>n&&n.success&&n.data?{...n.data,member:i}:{member:i,hasDescription:!1}).catch(()=>({member:i,hasDescription:!1}))),a=Promise.all(t);try{const i=await this._raceWithTimeout(a);this.cache.jobDescriptions=i,this.cache.jobDescriptionsLastLoad=Date.now();const n=document.getElementById("job-descriptions-list");n&&(n.innerHTML=i.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0648\u0635\u0627\u0641 \u0648\u0638\u064A\u0641\u064A\u0629 \u0645\u0633\u062C\u0644\u0629</p></div>':this._renderJobDescriptionsList(i))}catch(i){if(i&&i.timeout)a.then(n=>{this.cache.jobDescriptions=n,this.cache.jobDescriptionsLastLoad=Date.now();const o=document.getElementById("job-descriptions-list");o&&(o.innerHTML=n.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0648\u0635\u0627\u0641 \u0648\u0638\u064A\u0641\u064A\u0629 \u0645\u0633\u062C\u0644\u0629</p></div>':this._renderJobDescriptionsList(n))}).catch(()=>{});else throw i}},async loadJobDescriptions(){const e=document.getElementById("job-descriptions-list");if(!e)return;const s=this.getDataAccessMessage("getJobDescriptions",{});if(s){e.innerHTML=`<div class="empty-state"><p class="text-gray-500">${s}</p></div>`;return}if(this.cache.jobDescriptions&&this.cache.jobDescriptionsLastLoad&&Date.now()-this.cache.jobDescriptionsLastLoad<this.cache.cacheTimeout&&this.cache.jobDescriptions.length>0){e.innerHTML=this._renderJobDescriptionsList(this.cache.jobDescriptions);return}e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';try{let a=this._getMembersFromCache(),i=null;if(!a||a.length===0){i=GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});try{const n=await this._raceWithTimeout(i);n&&n.success&&n.data&&(a=Array.isArray(n.data)?n.data:[],this.cache.members=a,this.cache.lastLoad=Date.now())}catch(n){if(n&&n.timeout){i.then(o=>{if(o&&o.success&&o.data){const r=Array.isArray(o.data)?o.data:[];this.cache.members=r,this.cache.lastLoad=Date.now(),r.length>0&&this._loadJobDescriptionsFetch(r)}}).catch(()=>{});return}throw n}}if(!a||a.length===0){e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0639\u0636\u0627\u0621 \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0648\u0635\u0627\u0641 \u0648\u0638\u064A\u0641\u064A\u0629</p></div>';return}await this._loadJobDescriptionsFetch(a)}catch(a){const i=a?.message||a?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";if(i.includes("runtime.lastError")||i.includes("message port closed")||i.includes("Receiving end does not exist")||i.includes("Could not establish connection")||i.includes("Extension context invalidated")||i.includes("The message port closed before a response was received")){Utils.safeLog("\u26A0 \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u062E\u0637\u0623 Chrome Extension \u0641\u064A loadJobDescriptions"),setTimeout(()=>this.loadJobDescriptions(),1e3);return}const o=this.isGoogleAppsScriptEnabled();o&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0648\u0635\u0627\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629:",i,a);let r="\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0648\u0635\u0627\u0641 \u0648\u0638\u064A\u0641\u064A\u0629 \u0645\u0633\u062C\u0644\u0629",c=!1;i.includes("\u063A\u064A\u0631 \u0645\u0639\u062A\u0631\u0641 \u0628\u0647")||i.includes("Action not recognized")||i.includes("ACTION_NOT_RECOGNIZED")?(r=i,c=o):i.includes("Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")?(r="Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644\u0647 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",c=!1):o&&(i.includes("Failed to fetch")||i.includes("NetworkError")||i.includes("CORS"))?(r="\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Apps Script",c=!0):o&&i.includes("\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")&&(r=i,c=!0),e.innerHTML=`
                <div class="empty-state">
                    <p class="${c?"text-red-500":"text-gray-500"} mb-2">${Utils.escapeHTML(r)}</p>
                    ${c?`
                    <button onclick="SafetyHealthManagement.loadJobDescriptions()" class="btn-secondary btn-sm mt-2">
                        <i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                    </button>
                    `:""}
                </div>
            `}},_renderJobDescriptionsList(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>`
            <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(s.member.name||"")}</h3>
                        <p class="text-sm text-gray-600">${Utils.escapeHTML(s.member.jobTitle||"")}</p>
                    </div>
                    <button onclick="SafetyHealthManagement.showJobDescriptionForm('${s.member.id}', ${s.hasDescription!==!1?JSON.stringify(s).replace(/"/g,"&quot;"):"null"})" class="btn-primary btn-sm">
                        <i class="fas fa-${s.hasDescription!==!1?"edit":"plus"} ml-2"></i>
                        ${s.hasDescription!==!1?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629"}
                    </button>
                </div>
                ${s.hasDescription!==!1?`
                    <div class="mt-3 space-y-2">
                        <div><strong>\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</strong> ${Utils.escapeHTML(s.roleDescription||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A:</strong> ${Utils.escapeHTML(s.responsibilities||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u0645\u0647\u0627\u0645:</strong> ${Utils.escapeHTML(s.tasks||"\u2014")}</div>
                    </div>
                `:'<p class="text-gray-500 text-sm">\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641 \u0648\u0638\u064A\u0641\u064A \u0645\u0633\u062C\u0644</p>'}
            </div>
        `).join("")},async showJobDescriptionForm(e=null,s=null){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">${s?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A":"\u0625\u0636\u0627\u0641\u0629 \u0648\u0635\u0641 \u0648\u0638\u064A\u0641\u064A"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="job-description-form" class="space-y-4">
                        ${s?"":`
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 *</label>
                            <select id="jd-member-id" required class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>
                            </select>
                        </div>
                        `}
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                            <input type="text" id="jd-job-title" class="form-input" 
                                value="${Utils.escapeHTML(s?.jobTitle||"")}" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0628\u0627\u0644\u062A\u0641\u0635\u064A\u0644 *</label>
                            <textarea id="jd-role-description" required class="form-input" rows="4" 
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A">${Utils.escapeHTML(s?.roleDescription||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 *</label>
                            <textarea id="jd-responsibilities" required class="form-input" rows="5" 
                                placeholder="\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u0647\u0627\u0645">${Utils.escapeHTML(s?.responsibilities||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629</label>
                            <textarea id="jd-tasks" class="form-input" rows="4" 
                                placeholder="\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(s?.tasks||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0637\u0627\u0642 \u0627\u0644\u0639\u0645\u0644</label>
                            <textarea id="jd-work-scope" class="form-input" rows="3" 
                                placeholder="\u0646\u0637\u0627\u0642 \u0627\u0644\u0639\u0645\u0644">${Utils.escapeHTML(s?.workScope||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0624\u0647\u0644\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629</label>
                            <textarea id="jd-required-qualifications" class="form-input" rows="4" 
                                placeholder="\u0627\u0644\u0645\u0624\u0647\u0644\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629">${Utils.escapeHTML(s?.requiredQualifications||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-jd-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t);const a=t.querySelector("#jd-member-id");!s&&e&&a?a.value=e:!s&&a&&(await this.loadTeamMembersForDropdown(a),a.options.length<=1&&typeof Notification<"u"&&Notification.info&&Notification.info("\u0644\u0627 \u064A\u0648\u062C\u062F \u0623\u0639\u0636\u0627\u0621 \u062D\u0627\u0644\u064A\u0627\u064B. \u0623\u0636\u0641 \u0623\u0639\u0636\u0627\u0621 \u0645\u0646 \u062A\u0628\u0648\u064A\u0628 \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0623\u0648\u0644\u0627\u064B."));const i=t.querySelector("#save-jd-btn"),n=t.querySelector("#job-description-form");i.addEventListener("click",()=>this.handleJobDescriptionSubmit(n,s?.id,s?.memberId||e,t)),t.addEventListener("click",o=>{o.target===t&&t.remove()})},async handleJobDescriptionSubmit(e,s=null,t=null,a){if(!e.checkValidity()){e.reportValidity();return}const i=t||document.getElementById("jd-member-id").value;if(!i){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642");return}const n={memberId:i,jobTitle:document.getElementById("jd-job-title").value.trim(),roleDescription:document.getElementById("jd-role-description").value.trim(),responsibilities:document.getElementById("jd-responsibilities").value.trim(),tasks:document.getElementById("jd-tasks").value.trim(),workScope:document.getElementById("jd-work-scope").value.trim(),requiredQualifications:document.getElementById("jd-required-qualifications").value.trim()};Loading.show();try{const o=s?"updateJobDescription":"saveJobDescription",r=s?{jobDescriptionId:s,updateData:n}:n,c=await GoogleIntegration.sendRequest({action:o,data:r});c.success?(Notification.success(s?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0628\u0646\u062C\u0627\u062D"),a.remove(),this.cache.jobDescriptions=null,this.cache.jobDescriptionsLastLoad=null,this.loadJobDescriptions()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(c.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(o){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+o.message)}finally{Loading.hide()}},async renderKPIsView(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-chart-line ml-2"></i>\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</h2>
                        <div class="flex gap-2">
                            <select id="kpi-member-select" class="form-input" style="min-width: 200px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0639\u0636\u0627\u0621</option>
                            </select>
                            <select id="kpi-period-select" class="form-input">
                                <option value="">\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</option>
                                <option value="2024-01">\u064A\u0646\u0627\u064A\u0631 2024</option>
                                <option value="2024-02">\u0641\u0628\u0631\u0627\u064A\u0631 2024</option>
                                <option value="2024-03">\u0645\u0627\u0631\u0633 2024</option>
                            </select>
                            <button id="calculate-kpis-btn" class="btn-primary" style="padding: 14px 28px; font-size: 15px; font-weight: 600; border-radius: 10px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; border: none; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); transition: all 0.3s ease; position: relative; overflow: hidden;">
                                <i class="fas fa-calculator ml-2"></i>
                                <span>\u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="kpis-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="empty-state">
                            <p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</p>
                        </div>
                    </div>
                </div>
            </div>
        `},_fillKPIsDropdown(e){const s=document.getElementById("kpi-member-select"),t=document.getElementById("kpi-period-select"),a=document.getElementById("calculate-kpis-btn");if(s){if(s.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+(e||[]).map(i=>`
                <option value="${i.id}" ${i.id===this.currentMemberId?"selected":""}>
                    ${Utils.escapeHTML(i.name||"")}
                </option>
            `).join(""),t){const i=new Date;let n='<option value="">\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</option>';for(let o=0;o<6;o++){const r=new Date(i.getFullYear(),i.getMonth()-o,1),c=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];n+=`<option value="${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}">${c[r.getMonth()]} ${r.getFullYear()}</option>`}t.innerHTML=n}s.removeEventListener("change",this._boundLoadMemberKPIs),this._boundLoadMemberKPIs=()=>this.loadMemberKPIs(),s.addEventListener("change",this._boundLoadMemberKPIs),t&&(t.onchange=()=>{s.value&&this.loadMemberKPIs()}),a&&(a.onclick=()=>this.calculateKPIs())}},async loadKPIs(){const e=document.getElementById("kpis-container"),s=document.getElementById("kpi-member-select"),t=document.getElementById("kpi-period-select"),a=document.getElementById("calculate-kpis-btn");if(!e||!s){Utils.safeError("\u0639\u0646\u0627\u0635\u0631 KPIs \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");return}const i=this.getDataAccessMessage("getSafetyTeamKPIs",{});if(i){s.innerHTML=`<option value="">${i}</option>`,e.innerHTML=`<div class="empty-state"><p class="text-gray-500">${i}</p></div>`;return}let n=this._getMembersFromCache();n&&n.length>0?(this._fillKPIsDropdown(n),this.currentMemberId&&s.value===this.currentMemberId?this.loadMemberKPIs():e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</p></div>'):e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';try{const o=GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});let r;try{r=await this._raceWithTimeout(o)}catch(c){c&&c.timeout&&o.then(d=>{if(d&&d.success&&d.data){const m=Array.isArray(d.data)?d.data:[];this.cache.members=m,this.cache.lastLoad=Date.now(),this._fillKPIsDropdown(m);const u=document.getElementById("kpi-member-select");this.currentMemberId&&u&&u.value===this.currentMemberId&&this.loadMemberKPIs()}}).catch(()=>{});return}if(r&&r.success&&r.data)n=Array.isArray(r.data)?r.data:[],this.cache.members=n,this.cache.lastLoad=Date.now(),this._fillKPIsDropdown(n),this.currentMemberId&&s.value===this.currentMemberId?this.loadMemberKPIs():e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</p></div>';else{const c=r&&r.message?r.message:"\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642";e.innerHTML=`<div class="empty-state"><p class="text-red-500">${Utils.escapeHTML(c)}</p></div>`}}catch(o){const r=o?.message||o?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";if(r.includes("runtime.lastError")||r.includes("message port closed")||r.includes("Receiving end does not exist")||r.includes("Could not establish connection")||r.includes("Extension context invalidated")||r.includes("The message port closed before a response was received")){Utils.safeLog("\u26A0 \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u062E\u0637\u0623 Chrome Extension \u0641\u064A loadKPIs"),setTimeout(()=>{this.loadKPIs()},1e3);return}const d=this.isGoogleAppsScriptEnabled();if(d&&e&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621:",r,o),e){let m="\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621",u=!1;r.includes("\u063A\u064A\u0631 \u0645\u0639\u062A\u0631\u0641 \u0628\u0647")||r.includes("Action not recognized")||r.includes("ACTION_NOT_RECOGNIZED")?(m=r,u=d):r.includes("Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")?(m="Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644\u0647 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",u=!1):d&&(r.includes("Failed to fetch")||r.includes("NetworkError")||r.includes("CORS"))?(m="\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Apps Script",u=!0):d&&r.includes("\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")&&(m=r,u=!0),e.innerHTML=`
                    <div class="empty-state">
                        <p class="${u?"text-red-500":"text-gray-500"} mb-2">${Utils.escapeHTML(m)}</p>
                        ${u?`
                        <button onclick="SafetyHealthManagement.loadKPIs()" class="btn-secondary btn-sm mt-2">
                            <i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                        </button>
                        `:""}
                    </div>
                `}}},async loadMemberKPIs(){const e=document.getElementById("kpi-member-select"),s=document.getElementById("kpi-period-select"),t=document.getElementById("kpis-container");if(!e||!t){Utils.safeError("\u0639\u0646\u0627\u0635\u0631 KPIs \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");return}const a=e.value,i=s?s.value:"";if(!a){t&&(t.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</p></div>');return}if(this.loadingStates.kpis){Utils.safeLog("\u26A0\uFE0F loadMemberKPIs: \u0639\u0645\u0644\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u060C \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628");return}this.loadingStates.kpis=!0;const n=`kpi_${a}_${i||"current"}`;if(this.cache.kpis.has(n)){const o=this.cache.kpis.get(n);if(o&&o.data&&Date.now()-o.timestamp<this.cache.cacheTimeout){this.renderKPIs(o.data,t),this.loadingStates.kpis=!1;return}}try{const o=GoogleIntegration.sendRequest({action:"getSafetyTeamKPIs",data:{memberId:a,period:i||null}});let r;try{r=await this._raceWithTimeout(o)}catch(c){if(c&&c.timeout){t&&(t.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>'),o.then(d=>{if(d&&d.success&&d.data){const m=Array.isArray(d.data)?d.data:[d.data],u=m.length>0?m[0]:null,p=document.getElementById("kpis-container");p&&u&&(this.renderKPIs(u,p),this.cache.kpis.set(n,{data:u,timestamp:Date.now()}))}this.loadingStates.kpis=!1}).catch(()=>{this.loadingStates.kpis=!1});return}throw c}if(r.success&&r.data){const c=Array.isArray(r.data)?r.data:[r.data],d=c.length>0?c[0]:null;if(!d){t.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0645\u062D\u0633\u0648\u0628\u0629. \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u062D\u0633\u0627\u0628 KPIs"</p></div>',this.loadingStates.kpis=!1;return}this.renderKPIs(d,t),this.cache.kpis.set(n,{data:d,timestamp:Date.now()})}else t.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0645\u062D\u0633\u0648\u0628\u0629</p></div>'}catch(o){const r=o?.message||o?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621:",r,o);const c=this.isGoogleAppsScriptEnabled();let d="\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621",m=!0;r.includes("\u063A\u064A\u0631 \u0645\u0639\u062A\u0631\u0641 \u0628\u0647")||r.includes("Action not recognized")||r.includes("ACTION_NOT_RECOGNIZED")?d=r:r.includes("Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")?c?(d='\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0645\u062D\u0633\u0648\u0628\u0629. \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u062D\u0633\u0627\u0628 KPIs"',m=!1):d="Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644\u0647 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0623\u0648 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A":!c&&(r.includes("Failed to fetch")||r.includes("NetworkError")||r.includes("CORS"))?(d='\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0645\u062D\u0633\u0648\u0628\u0629. \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u062D\u0633\u0627\u0628 KPIs"',m=!1):r.includes("Failed to fetch")||r.includes("NetworkError")||r.includes("CORS")?c?d="\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Apps Script":(d='\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0645\u062D\u0633\u0648\u0628\u0629. \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u062D\u0633\u0627\u0628 KPIs"',m=!1):c||(d='\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0645\u062D\u0633\u0648\u0628\u0629. \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u062D\u0633\u0627\u0628 KPIs"',m=!1),t.innerHTML=`
                <div class="empty-state">
                    <p class="${m?"text-red-500":"text-gray-500"} mb-2">${Utils.escapeHTML(d)}</p>
                    ${m?`
                    <button onclick="SafetyHealthManagement.loadMemberKPIs()" class="btn-secondary btn-sm mt-2">
                        <i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                    </button>
                    `:""}
                </div>
            `}finally{this.loadingStates.kpis=!1}},renderKPIs(e,s){if(!e||!s)return;const t=e.targetInspections||20,a=e.targetObservations||15,i=e.targetTrainings||3,n=e.targetCommitment||95,o=e.targetActionsClosure||80,r=t>0?Math.min((e.inspectionsCount||0)/t*100,100):0,c=e.closedActionsCount||0,d=Math.min(100,c/10*100),m=a>0?Math.min((e.observationsCount||0)/a*100,100):0,u=i>0?Math.min((e.trainingsCount||0)/i*100,100):0,p=typeof e.commitmentRate=="number"?e.commitmentRate:typeof e.commitmentRate=="object"&&e.commitmentRate!==null?0:parseFloat(e.commitmentRate)||0,v=Math.min(Number(e.targetCommitment)||95,100);s.innerHTML=`
            <style>
                #kpis-container .shm-kpi-card { display: flex; align-items: center; gap: 0.875rem; padding: 1rem 1.25rem; border-radius: 14px; border: 1px solid #e5e7eb; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: box-shadow 0.2s, border-color 0.2s; min-height: auto; }
                #kpis-container .shm-kpi-card:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.08); border-color: #d1d5db; }
                #kpis-container .shm-kpi-card .shm-kpi-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
                #kpis-container .shm-kpi-card .shm-kpi-body { flex: 1; min-width: 0; }
                #kpis-container .shm-kpi-card .shm-kpi-label { font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.2rem; }
                #kpis-container .shm-kpi-card .shm-kpi-value { font-size: 1.65rem; font-weight: 800; color: #111827; line-height: 1.2; letter-spacing: -0.02em; }
                #kpis-container .shm-kpi-card .shm-kpi-target { font-size: 0.8125rem; color: #6b7280; margin-top: 0.2rem; }
                #kpis-container .shm-kpi-card .shm-kpi-bar-wrap { width: 100px; flex-shrink: 0; height: 10px; background: #e5e7eb; border-radius: 999px; overflow: hidden; }
                #kpis-container .shm-kpi-card .shm-kpi-bar-fill { height: 100%; border-radius: 999px; transition: width 0.3s; }
                #kpis-container .shm-kpi-chart-row { padding: 0.875rem 0; border-bottom: 1px solid #f3f4f6; }
                #kpis-container .shm-kpi-chart-row:last-child { border-bottom: none; }
                #kpis-container .shm-kpi-edit-btn { padding: 8px 16px; font-size: 0.875rem; border-radius: 10px; background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; white-space: nowrap; }
                #kpis-container .shm-kpi-edit-btn:hover { background: #e5e7eb; color: #111827; }
            </style>
            <div class="mb-4 flex flex-wrap justify-end">
                <button type="button" onclick="SafetyHealthManagement.editKPIs('${e.id||""}', '${e.memberId||""}')" id="shm-kpi-edit-btn" class="shm-kpi-edit-btn">
                    <i class="fas fa-edit ml-2"></i>
                    \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u064A\u062F\u0648\u064A\u0627\u064B
                </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                <div class="shm-kpi-card">
                    <div class="shm-kpi-icon bg-blue-100 text-blue-600"><i class="fas fa-clipboard-check"></i></div>
                    <div class="shm-kpi-body">
                        <div class="shm-kpi-label">\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629</div>
                        <div class="shm-kpi-value">${e.inspectionsCount||0}</div>
                        <div class="shm-kpi-target">\u0627\u0644\u0647\u062F\u0641: ${t}</div>
                    </div>
                    <div class="shm-kpi-bar-wrap"><div class="shm-kpi-bar-fill bg-blue-500" style="width: ${r}%"></div></div>
                </div>
                <div class="shm-kpi-card">
                    <div class="shm-kpi-icon bg-emerald-100 text-emerald-600"><i class="fas fa-check-double"></i></div>
                    <div class="shm-kpi-body">
                        <div class="shm-kpi-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629</div>
                        <div class="shm-kpi-value">${c}</div>
                        <div class="shm-kpi-target">\u0647\u062F\u0641 \u0627\u0644\u0646\u0633\u0628\u0629: ${o}%</div>
                    </div>
                    <div class="shm-kpi-bar-wrap"><div class="shm-kpi-bar-fill bg-emerald-500" style="width: ${d}%"></div></div>
                </div>
                <div class="shm-kpi-card">
                    <div class="shm-kpi-icon bg-purple-100 text-purple-600"><i class="fas fa-sticky-note"></i></div>
                    <div class="shm-kpi-body">
                        <div class="shm-kpi-label">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</div>
                        <div class="shm-kpi-value">${e.observationsCount||0}</div>
                        <div class="shm-kpi-target">\u0627\u0644\u0647\u062F\u0641: ${a}</div>
                    </div>
                    <div class="shm-kpi-bar-wrap"><div class="shm-kpi-bar-fill bg-purple-500" style="width: ${m}%"></div></div>
                </div>
                <div class="shm-kpi-card">
                    <div class="shm-kpi-icon bg-amber-100 text-amber-600"><i class="fas fa-chalkboard-teacher"></i></div>
                    <div class="shm-kpi-body">
                        <div class="shm-kpi-label">\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A</div>
                        <div class="shm-kpi-value">${e.trainingsCount||0}</div>
                        <div class="shm-kpi-target">\u0627\u0644\u0647\u062F\u0641: ${i}</div>
                    </div>
                    <div class="shm-kpi-bar-wrap"><div class="shm-kpi-bar-fill bg-amber-500" style="width: ${u}%"></div></div>
                </div>
                <div class="shm-kpi-card">
                    <div class="shm-kpi-icon ${p>=v?"bg-emerald-100 text-emerald-600":"bg-amber-100 text-amber-600"}"><i class="fas fa-percentage"></i></div>
                    <div class="shm-kpi-body">
                        <div class="shm-kpi-label">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645</div>
                        <div class="shm-kpi-value">${p.toFixed(1)}%</div>
                        <div class="shm-kpi-target">\u0627\u0644\u0647\u062F\u0641: ${v}%</div>
                    </div>
                    <div class="shm-kpi-bar-wrap"><div class="shm-kpi-bar-fill ${p>=v?"bg-emerald-500":"bg-amber-500"}" style="width: ${Math.min(p,100)}%"></div></div>
                </div>
                ${e.incidentsHandledCount!==void 0?`
                <div class="shm-kpi-card">
                    <div class="shm-kpi-icon bg-red-100 text-red-600"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="shm-kpi-body">
                        <div class="shm-kpi-label">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</div>
                        <div class="shm-kpi-value">${e.incidentsHandledCount||0}</div>
                        <div class="shm-kpi-target">\u2014</div>
                    </div>
                    <div class="shm-kpi-bar-wrap"><div class="shm-kpi-bar-fill bg-gray-200" style="width: 0%"></div></div>
                </div>
                `:""}
                ${e.nearMissCount!==void 0?`
                <div class="shm-kpi-card">
                    <div class="shm-kpi-icon bg-amber-100 text-amber-600"><i class="fas fa-exclamation-circle"></i></div>
                    <div class="shm-kpi-body">
                        <div class="shm-kpi-label">Near Miss</div>
                        <div class="shm-kpi-value">${e.nearMissCount||0}</div>
                        <div class="shm-kpi-target">\u2014</div>
                    </div>
                    <div class="shm-kpi-bar-wrap"><div class="shm-kpi-bar-fill bg-gray-200" style="width: 0%"></div></div>
                </div>
                `:""}
                ${e.ptwCount!==void 0?`
                <div class="shm-kpi-card">
                    <div class="shm-kpi-icon bg-indigo-100 text-indigo-600"><i class="fas fa-file-signature"></i></div>
                    <div class="shm-kpi-body">
                        <div class="shm-kpi-label">PTW \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</div>
                        <div class="shm-kpi-value">${e.ptwCount||0}</div>
                        <div class="shm-kpi-target">\u2014</div>
                    </div>
                    <div class="shm-kpi-bar-wrap"><div class="shm-kpi-bar-fill bg-gray-200" style="width: 0%"></div></div>
                </div>
                `:""}
            </div>
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 class="font-semibold text-gray-800 mb-4 text-lg">\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0623\u062F\u0627\u0621 \u0645\u0639 \u0627\u0644\u0623\u0647\u062F\u0627\u0641</h3>
                <div class="space-y-0 divide-y divide-gray-100">
                    ${this.renderKPIChartBar("\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629",e.inspectionsCount||0,t)}
                    ${this.renderKPIChartBar("\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629",c,Math.max(c,10))}
                    ${this.renderKPIChartBar("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",e.observationsCount||0,a)}
                    ${this.renderKPIChartBar("\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A",e.trainingsCount||0,i)}
                </div>
            </div>
            ${e.isManual?'<div class="mt-4 text-sm text-amber-600 flex items-center gap-1"><i class="fas fa-info-circle"></i><span>\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u064A\u062F\u0648\u064A\u0627\u064B</span></div>':""}
        `},async calculateKPIs(){if(!this.isGoogleAppsScriptEnabled()){const n=this.getDataAccessMessage("calculateSafetyTeamKPIs",{});n?Notification.error(n):Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0628\u062F\u0648\u0646 \u062A\u0641\u0639\u064A\u0644 Google Apps Script");return}const e=document.getElementById("kpi-member-select"),s=document.getElementById("kpi-period-select"),t=document.getElementById("calculate-kpis-btn");if(!e){Notification.error("\u0639\u0646\u0635\u0631 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0639\u0636\u0648 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const a=e.value,i=s?s.value:"";if(!a){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642"),e.focus();return}t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i><span>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0633\u0627\u0628...</span>');try{if(Loading.show(),!a||a.trim()==="")throw new Error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0639\u0636\u0648 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");const n=await GoogleIntegration.sendRequest({action:"calculateSafetyTeamKPIs",data:{memberId:a.trim(),period:i&&i.trim()!==""?i.trim():null}});if(n.success&&n.data){const o=n.data;o.memberId||(o.memberId=a.trim()),!o.period&&i&&i.trim()!==""&&(o.period=i.trim()),o.calculatedAt=new Date().toISOString(),o.calculatedBy=AppState.currentUser?.id||AppState.currentUser?.username||"unknown";const r=await GoogleIntegration.sendRequest({action:"addSafetyTeamKPI",data:o});if(r.success||r.success===void 0){Notification.success("\u062A\u0645 \u062D\u0633\u0627\u0628 \u0648\u062D\u0641\u0638 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0628\u0646\u062C\u0627\u062D");const c=`kpi_${a}_${i||"current"}`;this.cache&&this.cache.kpis&&this.cache.kpis.delete(c),await this.loadMemberKPIs()}else{Notification.success("\u062A\u0645 \u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0628\u0646\u062C\u0627\u062D");const c=`kpi_${a}_${i||"current"}`;this.cache&&this.cache.kpis&&this.cache.kpis.delete(c),await this.loadMemberKPIs()}}else{const o=n.message||n.error||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0633\u0627\u0628";Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+o),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621:",o,n)}}catch(n){const o=n?.message||n?.toString()||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+o),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621:",o,n)}finally{Loading.hide(),t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-calculator ml-2"></i><span>\u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</span>')}},async editKPIs(e,s){if(!e||!s){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");return}try{Loading.show();const t=await GoogleIntegration.sendRequest({action:"getSafetyTeamKPIs",data:{memberId:s}});if(t.success&&t.data&&t.data.length>0){const a=t.data.find(i=>i.id===e)||t.data[0];this.showKPIEditForm(a)}else Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A")}catch(t){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}finally{Loading.hide()}},showKPIEditForm(e){const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0639\u062F\u064A\u0644 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="kpi-edit-form" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629</label>
                                <input type="number" id="inspectionsCount" value="${e.inspectionsCount||0}" class="form-input" min="0">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629</label>
                                <input type="number" id="closedActionsCount" value="${e.closedActionsCount||0}" class="form-input" min="0">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                <input type="number" id="observationsCount" value="${e.observationsCount||0}" class="form-input" min="0">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A</label>
                                <input type="number" id="trainingsCount" value="${e.trainingsCount||0}" class="form-input" min="0">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</label>
                                <input type="number" id="incidentsHandledCount" value="${e.incidentsHandledCount||0}" class="form-input" min="0">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Near Miss</label>
                                <input type="number" id="nearMissCount" value="${e.nearMissCount||0}" class="form-input" min="0">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">PTW \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</label>
                                <input type="number" id="ptwCount" value="${e.ptwCount||0}" class="form-input" min="0">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 (%)</label>
                                <input type="number" id="commitmentRate" value="${e.commitmentRate||0}" class="form-input" min="0" max="100" step="0.1">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-kpi-btn" class="btn-primary">\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A</button>
                </div>
            </div>
        `,document.body.appendChild(s),s.querySelector("#save-kpi-btn").addEventListener("click",async()=>{const a={inspectionsCount:parseInt(document.getElementById("inspectionsCount").value)||0,closedActionsCount:parseInt(document.getElementById("closedActionsCount").value)||0,observationsCount:parseInt(document.getElementById("observationsCount").value)||0,trainingsCount:parseInt(document.getElementById("trainingsCount").value)||0,incidentsHandledCount:parseInt(document.getElementById("incidentsHandledCount").value)||0,nearMissCount:parseInt(document.getElementById("nearMissCount").value)||0,ptwCount:parseInt(document.getElementById("ptwCount").value)||0,commitmentRate:parseFloat(document.getElementById("commitmentRate").value)||0};try{Loading.show();const i=await GoogleIntegration.sendRequest({action:"updateSafetyTeamKPI",data:{kpiId:e.id,updateData:a}});i.success?(Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),s.remove(),this.loadMemberKPIs()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(i.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B"))}catch(i){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message)}finally{Loading.hide()}}),s.addEventListener("click",a=>{a.target===s&&s.remove()})},renderKPIChartBar(e,s,t){const a=t>0?Math.min(s/t*100,100):0,i=a>=80?"bg-emerald-500":a>=50?"bg-amber-500":"bg-red-500";return`
            <div class="shm-kpi-chart-row flex flex-wrap items-center gap-4 py-4">
                <span class="font-semibold text-gray-800 text-base w-44 flex-shrink-0">${Utils.escapeHTML(e)}</span>
                <span class="text-gray-600 font-medium text-base flex-shrink-0 min-w-[4rem]">${s} / ${t}</span>
                <div class="flex-1 min-w-[120px] bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div class="${i} h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-300" style="min-width: ${a>0?"2rem":"0"}; width: ${a}%">
                        ${a>0?`<span class="text-sm text-white font-bold">${a.toFixed(0)}%</span>`:""}
                    </div>
                </div>
            </div>
        `},async renderTasksView(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-tasks ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u064A\u062F\u0648\u064A\u0629</h2>
                        <div class="flex gap-2">
                            <select id="task-member-select" class="form-input" style="min-width: 200px;">
                                <option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>
                            </select>
                            <button id="add-task-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0645\u0647\u0645\u0629 \u062C\u062F\u064A\u062F\u0629
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="tasks-container">
                        <div class="empty-state">
                            <p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0647\u0627\u0645</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadTasks(){const e=document.getElementById("task-member-select"),s=document.getElementById("tasks-container");if(!(!e||!s))try{const t=await GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});if(t.success&&t.data){const a=Array.isArray(t.data)?t.data:[];e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+a.map(i=>`
                        <option value="${i.id}">${Utils.escapeHTML(i.name||"")}</option>
                    `).join(""),e.addEventListener("change",()=>this.loadMemberTasks()),document.getElementById("add-task-btn")?.addEventListener("click",()=>this.showTaskForm())}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0647\u0627\u0645:",t)}},async loadMemberTasks(){const e=document.getElementById("task-member-select").value,s=document.getElementById("tasks-container");if(!e){s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0647\u0627\u0645</p></div>';return}try{Loading.show();const t=await GoogleIntegration.sendRequest({action:"getSafetyTeamTasks",data:{memberId:e}});if(t.success&&t.data){const a=Array.isArray(t.data)?t.data:[];if(a.length===0){s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0647\u0627\u0645 \u0645\u0633\u062C\u0644\u0629</p></div>',Loading.hide();return}s.innerHTML=`
                    <div class="space-y-3">
                        ${a.map(i=>`
                            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-2">
                                            <h3 class="font-semibold text-gray-800">${Utils.escapeHTML(i.taskTitle||"")}</h3>
                                            <span class="px-2 py-1 text-xs rounded ${i.priority==="\u0639\u0627\u0644\u064A"||i.priority==="high"?"bg-red-100 text-red-800":i.priority==="\u0645\u0646\u062E\u0641\u0636"||i.priority==="low"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}">
                                                ${Utils.escapeHTML(i.priority||"\u0645\u062A\u0648\u0633\u0637")}
                                            </span>
                                            <span class="px-2 py-1 text-xs rounded ${i.status==="\u0645\u0643\u062A\u0645\u0644"||i.status==="completed"?"bg-green-100 text-green-800":i.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"||i.status==="in-progress"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">
                                                ${Utils.escapeHTML(i.status||"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")}
                                            </span>
                                        </div>
                                        <p class="text-sm text-gray-600 mb-2">${Utils.escapeHTML(i.taskDescription||"")}</p>
                                        <div class="flex items-center gap-4 text-xs text-gray-500">
                                            ${i.dueDate?`<span><i class="fas fa-calendar ml-1"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642: ${Utils.formatDate(i.dueDate)}</span>`:""}
                                            ${i.taskType?`<span><i class="fas fa-tag ml-1"></i>${Utils.escapeHTML(i.taskType)}</span>`:""}
                                        </div>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="SafetyHealthManagement.editTask('${i.id}')" class="btn-icon btn-icon-primary">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="SafetyHealthManagement.deleteTask('${i.id}')" class="btn-icon btn-icon-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                `}else s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0647\u0627\u0645 \u0645\u0633\u062C\u0644\u0629</p></div>'}catch(t){const a=t?.message||t?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0647\u0627\u0645:",a,t),s.innerHTML=`<div class="empty-state"><p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: ${Utils.escapeHTML(a)}</p></div>`}finally{Loading.hide()}},showTaskForm(e=null){const s=document.getElementById("task-member-select")?.value;if(!s&&!e){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0623\u0648\u0644\u0627\u064B");return}const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0647\u0645\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0647\u0645\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="task-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629 *</label>
                            <input type="text" id="taskTitle" required class="form-input" value="${e?Utils.escapeHTML(e.taskTitle||""):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0645\u0647\u0645\u0629</label>
                            <textarea id="taskDescription" class="form-input" rows="3">${e?Utils.escapeHTML(e.taskDescription||""):""}</textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0645\u0647\u0645\u0629</label>
                                <select id="taskType" class="form-input">
                                    <option value="\u062A\u0641\u062A\u064A\u0634" ${e&&e.taskType==="\u062A\u0641\u062A\u064A\u0634"?"selected":""}>\u062A\u0641\u062A\u064A\u0634</option>
                                    <option value="\u062A\u062F\u0631\u064A\u0628" ${e&&e.taskType==="\u062A\u062F\u0631\u064A\u0628"?"selected":""}>\u062A\u062F\u0631\u064A\u0628</option>
                                    <option value="\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A" ${e&&e.taskType==="\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A"?"selected":""}>\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A</option>
                                    <option value="\u0645\u0631\u0627\u062C\u0639\u0629" ${e&&e.taskType==="\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                    <option value="\u0623\u062E\u0631\u0649" ${e&&e.taskType==="\u0623\u062E\u0631\u0649"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                                <select id="priority" class="form-input">
                                    <option value="\u0645\u0646\u062E\u0641\u0636" ${e&&e.priority==="\u0645\u0646\u062E\u0641\u0636"?"selected":""}>\u0645\u0646\u062E\u0641\u0636</option>
                                    <option value="\u0645\u062A\u0648\u0633\u0637" ${!e||e.priority==="\u0645\u062A\u0648\u0633\u0637"?"selected":""}>\u0645\u062A\u0648\u0633\u0637</option>
                                    <option value="\u0639\u0627\u0644\u064A" ${e&&e.priority==="\u0639\u0627\u0644\u064A"?"selected":""}>\u0639\u0627\u0644\u064A</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</label>
                                <input type="date" id="dueDate" class="form-input" value="${e&&e.dueDate?Utils.formatDateForInput(e.dueDate):""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <select id="status" class="form-input">
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630" ${!e||e.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                    <option value="\u0645\u0643\u062A\u0645\u0644" ${e&&e.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                                    <option value="\u0645\u0644\u063A\u064A" ${e&&e.status==="\u0645\u0644\u063A\u064A"?"selected":""}>\u0645\u0644\u063A\u064A</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                            <textarea id="notes" class="form-input" rows="2">${e?Utils.escapeHTML(e.notes||""):""}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-task-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#save-task-btn").addEventListener("click",async()=>{const i={memberId:e?e.memberId:s,taskTitle:document.getElementById("taskTitle").value.trim(),taskDescription:document.getElementById("taskDescription").value.trim(),taskType:document.getElementById("taskType").value,priority:document.getElementById("priority").value,dueDate:document.getElementById("dueDate").value||null,status:document.getElementById("status").value,notes:document.getElementById("notes").value.trim(),assignedBy:AppState.currentUser?.id||AppState.currentUser?.name||""};if(!i.taskTitle){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0647\u0645\u0629");return}try{Loading.show();const n=e?await GoogleIntegration.sendRequest({action:"updateSafetyTeamTask",data:{taskId:e.id,updateData:i}}):await GoogleIntegration.sendRequest({action:"addSafetyTeamTask",data:i});n.success?(Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0647\u0645\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 \u0628\u0646\u062C\u0627\u062D"),t.remove(),this.loadMemberTasks()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(n.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(n){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+n.message)}finally{Loading.hide()}}),t.addEventListener("click",i=>{i.target===t&&t.remove()})},async editTask(e){try{Loading.show();const s=document.getElementById("task-member-select").value,t=await GoogleIntegration.sendRequest({action:"getSafetyTeamTasks",data:{memberId:s}});if(t.success&&t.data){const a=t.data.find(i=>i.id===e);a?this.showTaskForm(a):Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0647\u0645\u0629")}}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},async deleteTask(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u0647\u0645\u0629\u061F"))try{Loading.show();const s=await GoogleIntegration.sendRequest({action:"deleteSafetyTeamTask",data:{taskId:e}});s.success?(Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0647\u0645\u0629 \u0628\u0646\u062C\u0627\u062D"),this.loadMemberTasks()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(s.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641"))}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},async renderReportsView(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-file-chart-line ml-2"></i>\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621</h2>
                        <div class="flex gap-2">
                            <select id="report-member-select" class="form-input" style="min-width: 200px;">
                                <option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>
                            </select>
                            <button id="generate-report-btn" class="btn-primary">
                                <i class="fas fa-file-pdf ml-2"></i>
                                \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="reports-container">
                        <div class="empty-state">
                            <p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0648\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadReports(){const e=document.getElementById("report-member-select");if(!e)return;const s=this.getDataAccessMessage("generateSafetyTeamPerformanceReport",{});if(s){e.innerHTML=`<option value="">${s}</option>`;const a=document.getElementById("reports-container");a&&(a.innerHTML=`<div class="empty-state"><p class="text-gray-500">${s}</p></div>`);return}let t=this._getMembersFromCache();t&&t.length>0&&(e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+t.map(a=>`<option value="${a.id}">${Utils.escapeHTML(a.name||"")}</option>`).join(""),document.getElementById("generate-report-btn")?.addEventListener("click",()=>this.generateReport()));try{const a=GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});let i;try{i=await this._raceWithTimeout(a)}catch(n){n&&n.timeout&&a.then(o=>{if(o&&o.success&&o.data){const r=Array.isArray(o.data)?o.data:[];this.cache.members=r,this.cache.lastLoad=Date.now();const c=document.getElementById("report-member-select");c&&(c.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+r.map(d=>`<option value="${d.id}">${Utils.escapeHTML(d.name||"")}</option>`).join("")),document.getElementById("generate-report-btn")?.addEventListener("click",()=>this.generateReport())}}).catch(()=>{});return}i&&i.success&&i.data&&(t=Array.isArray(i.data)?i.data:[],this.cache.members=t,this.cache.lastLoad=Date.now(),e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+t.map(n=>`<option value="${n.id}">${Utils.escapeHTML(n.name||"")}</option>`).join(""),document.getElementById("generate-report-btn")?.addEventListener("click",()=>this.generateReport()))}catch(a){const i=a?.message||a?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";if(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631:",i,a),e){const n=this.isGoogleAppsScriptEnabled();let o="\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",r=!0;i.includes("\u063A\u064A\u0631 \u0645\u0639\u062A\u0631\u0641 \u0628\u0647")||i.includes("Action not recognized")||i.includes("ACTION_NOT_RECOGNIZED")?o=i:i.includes("Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")?n?(o="\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0648\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621",r=!1):o="Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644\u0647 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0623\u0648 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A":!n&&(i.includes("Failed to fetch")||i.includes("NetworkError")||i.includes("CORS"))?(o="\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0648\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621",r=!1):i.includes("Failed to fetch")||i.includes("NetworkError")||i.includes("CORS")?n?o="\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Apps Script":(o="\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0648\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621",r=!1):n||(o="\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0648\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621",r=!1),e.innerHTML=`
                    <option value="">${r?"\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644":"\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642"}</option>
                `;const c=document.getElementById("reports-container");c&&(c.innerHTML=`
                        <div class="empty-state">
                            <p class="${r?"text-red-500":"text-gray-500"} mb-2">${Utils.escapeHTML(o)}</p>
                            ${r?`
                            <button onclick="SafetyHealthManagement.loadReports()" class="btn-secondary btn-sm mt-2">
                                <i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                            `:""}
                        </div>
                    `)}}},async generateReport(){const e=document.getElementById("report-member-select").value;if(!e){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642");return}try{Loading.show();var s=new Date,t=new Date(s.getFullYear(),s.getMonth(),1),a=new Date(s.getFullYear(),s.getMonth(),s.getDate());const i=await GoogleIntegration.sendRequest({action:"generateSafetyTeamPerformanceReport",data:{memberId:e,startDate:t.toISOString?t.toISOString().slice(0,10):t,endDate:a.toISOString?a.toISOString().slice(0,10):a}});if(i.success&&i.data){const n=i.data,o=document.getElementById("reports-container");o.innerHTML=`
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <div class="mb-6">
                            <h3 class="text-xl font-bold text-gray-800 mb-2">\u062A\u0642\u0631\u064A\u0631 \u0623\u062F\u0627\u0621: ${Utils.escapeHTML(n.member?.name||"")}</h3>
                            <p class="text-sm text-gray-600">\u0627\u0644\u0641\u062A\u0631\u0629: ${Utils.formatDate(n.period?.startDate)} - ${Utils.formatDate(n.period?.endDate)}</p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 class="font-semibold text-gray-700 mb-3">\u0645\u0644\u062E\u0635 \u0627\u0644\u0623\u062F\u0627\u0621</h4>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span>\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629:</span>
                                        <strong>${n.summary?.totalInspections||0}</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629:</span>
                                        <strong>${n.summary?.totalActions||0}</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629:</span>
                                        <strong>${n.summary?.closedActions||0}</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</span>
                                        <strong>${n.summary?.totalObservations||0}</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A:</span>
                                        <strong>${n.summary?.totalTrainings||0}</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645:</span>
                                        <strong>${(n.summary?.commitmentRate||0).toFixed(1)}%</strong>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-700 mb-3">\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</h4>
                                <div class="text-sm text-gray-600">
                                    ${n.jobDescription?`
                                        <p><strong>\u0627\u0644\u062F\u0648\u0631:</strong> ${Utils.escapeHTML(n.jobDescription.roleDescription||"\u2014")}</p>
                                        <p class="mt-2"><strong>\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A:</strong> ${Utils.escapeHTML(n.jobDescription.responsibilities||"\u2014")}</p>
                                    `:'<p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641 \u0648\u0638\u064A\u0641\u064A \u0645\u0633\u062C\u0644</p>'}
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-6">
                            <button onclick="SafetyHealthManagement.exportReport('${e}')" class="btn-primary">
                                <i class="fas fa-download ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 PDF
                            </button>
                            <button onclick="SafetyHealthManagement.exportReportExcel('${e}')" class="btn-success ml-2">
                                <i class="fas fa-file-excel ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                        </div>
                    </div>
                `}else Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(i.message||"\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(i){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message)}finally{Loading.hide()}},async exportReport(e){if(!e){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642");return}try{Loading.show();const s=await GoogleIntegration.sendRequest({action:"generateSafetyTeamPerformanceReport",data:{memberId:e}});if(s.success&&s.data){const t=s.data,a=t.member||{},i=t.kpis||{},n=t.summary||{},o=`
                    <div style="font-family: Arial, sans-serif; padding: 20px; direction: rtl;">
                        <h1 style="text-align: center; color: #2563eb; margin-bottom: 30px;">
                            \u062A\u0642\u0631\u064A\u0631 \u0623\u062F\u0627\u0621 \u0645\u0648\u0638\u0641 - ${Utils.escapeHTML(a.name||"")}
                        </h1>
                        
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h2 style="color: #1f2937; margin-bottom: 10px;">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641</h2>
                            <p><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(a.name||"\u2014")}</p>
                            <p><strong>\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</strong> ${Utils.escapeHTML(a.jobTitle||"\u2014")}</p>
                            <p><strong>\u0627\u0644\u0642\u0633\u0645:</strong> ${Utils.escapeHTML(a.department||"\u2014")}</p>
                            <p><strong>\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A:</strong> ${Utils.escapeHTML(a.email||"\u2014")}</p>
                            <p><strong>\u0627\u0644\u0647\u0627\u062A\u0641:</strong> ${Utils.escapeHTML(a.phone||"\u2014")}</p>
                            ${a.appointmentDate?`<p><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646:</strong> ${Utils.formatDate(a.appointmentDate)}</p>`:""}
                        </div>

                        ${t.jobDescription?`
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h2 style="color: #1f2937; margin-bottom: 10px;">\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</h2>
                            <p><strong>\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</strong></p>
                            <p style="margin-bottom: 10px;">${Utils.escapeHTML(t.jobDescription.roleDescription||"\u2014")}</p>
                            <p><strong>\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A:</strong></p>
                            <p>${Utils.escapeHTML(t.jobDescription.responsibilities||"\u2014")}</p>
                        </div>
                        `:""}

                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h2 style="color: #1f2937; margin-bottom: 10px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u0623\u062F\u0627\u0621</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left;">${n.totalInspections||0}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left;">${n.totalActions||0}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left;">${n.closedActions||0}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left;">${n.totalObservations||0}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left;">${n.totalTrainings||0}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px;"><strong>\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645:</strong></td>
                                    <td style="padding: 8px; text-align: left;">${(n.commitmentRate||0).toFixed(1)}%</td>
                                </tr>
                            </table>
                        </div>

                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h2 style="color: #1f2937; margin-bottom: 10px;">\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left;">${i.inspectionsCount||0} / ${i.targetInspections||20}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left;">${i.closedActionsCount||0}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left;">${i.observationsCount||0} / ${i.targetObservations||15}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left;">${i.trainingsCount||0} / ${i.targetTrainings||3}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px;"><strong>\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645:</strong></td>
                                    <td style="padding: 8px; text-align: left;">${(i.commitmentRate||0).toFixed(1)}% / ${i.targetCommitment||95}%</td>
                                </tr>
                            </table>
                        </div>

                        <div style="text-align: center; color: #6b7280; margin-top: 30px; font-size: 12px;">
                            <p>\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0641\u064A: ${new Date().toLocaleDateString("ar-SA")}</p>
                        </div>
                    </div>
                `;if(typeof PDFTemplates<"u"&&PDFTemplates.buildDocument){const r=`SAFETY-TEAM-PERFORMANCE-${a.id?.substring(0,8)||"UNKNOWN"}`,c=PDFTemplates.buildDocument({title:`\u062A\u0642\u0631\u064A\u0631 \u0623\u062F\u0627\u0621 - ${Utils.escapeHTML(a.name||"")}`,formCode:r,content:o,createdAt:new Date,meta:{"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641":Utils.escapeHTML(a.name||""),\u0627\u0644\u0648\u0638\u064A\u0641\u0629:Utils.escapeHTML(a.jobTitle||""),\u0627\u0644\u0642\u0633\u0645:Utils.escapeHTML(a.department||"")}}),d=window.open("","_blank");d&&(d.document.write(c),d.document.close(),setTimeout(()=>d.print(),500))}else{const r=window.open("","_blank");r.document.write(`
                        <!DOCTYPE html>
                        <html dir="rtl">
                        <head>
                            <meta charset="UTF-8">
                            <title>\u062A\u0642\u0631\u064A\u0631 \u0623\u062F\u0627\u0621 - ${Utils.escapeHTML(a.name||"")}</title>
                            <style>
                                @media print {
                                    @page { margin: 1cm; }
                                    body { margin: 0; }
                                }
                            </style>
                        </head>
                        <body>${o}</body>
                        </html>
                    `),r.document.close(),setTimeout(()=>r.print(),250)}Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0628\u0646\u062C\u0627\u062D")}else Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(s.message||"\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},async exportReportExcel(e){if(!e){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642");return}try{Loading.show();const s=await GoogleIntegration.sendRequest({action:"generateSafetyTeamPerformanceReport",data:{memberId:e}});if(s.success&&s.data){const t=s.data,a=t.member||{},i=t.kpis||{},n=t.summary||{};if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629"),Loading.hide();return}const o=XLSX.utils.book_new(),r=[["\u062A\u0642\u0631\u064A\u0631 \u0623\u062F\u0627\u0621 \u0645\u0648\u0638\u0641"],[""],["\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641"],["\u0627\u0644\u0627\u0633\u0645",a.name||"\u2014"],["\u0627\u0644\u0648\u0638\u064A\u0641\u0629",a.jobTitle||"\u2014"],["\u0627\u0644\u0642\u0633\u0645",a.department||"\u2014"],["\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",a.email||"\u2014"],["\u0627\u0644\u0647\u0627\u062A\u0641",a.phone||"\u2014"],["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646",a.appointmentDate?Utils.formatDate(a.appointmentDate):"\u2014"],[""],["\u0645\u0644\u062E\u0635 \u0627\u0644\u0623\u062F\u0627\u0621"],["\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629",n.totalInspections||0],["\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629",n.totalActions||0],["\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629",n.closedActions||0],["\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",n.totalObservations||0],["\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A",n.totalTrainings||0],["\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645",(n.commitmentRate||0).toFixed(1)+"%"],[""],["\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621"],["\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629",i.inspectionsCount||0,"/",i.targetInspections||20],["\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629",i.closedActionsCount||0],["\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",i.observationsCount||0,"/",i.targetObservations||15],["\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A",i.trainingsCount||0,"/",i.targetTrainings||3],["\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645",(i.commitmentRate||0).toFixed(1)+"%","/",(i.targetCommitment||95)+"%"]],c=XLSX.utils.aoa_to_sheet(r);if(XLSX.utils.book_append_sheet(o,c,"\u0645\u0644\u062E\u0635 \u0627\u0644\u0623\u062F\u0627\u0621"),t.activities){const m=[["\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629"],["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u062D\u0627\u0644\u0629"],...(t.activities.inspections||[]).map(p=>[p.inspectionDate?Utils.formatDate(p.inspectionDate):"\u2014",p.location||"\u2014",p.status||"\u2014"]),[""],["\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629"],["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u062D\u0627\u0644\u0629"],...(t.activities.actions||[]).map(p=>[p.createdAt?Utils.formatDate(p.createdAt):"\u2014",p.description||"\u2014",p.status||"\u2014"]),[""],["\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0646\u0648\u0639"],...(t.activities.observations||[]).map(p=>[p.date?Utils.formatDate(p.date):"\u2014",p.description||"\u2014",p.type||"\u2014"]),[""],["\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A"],["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0645\u0648\u0636\u0648\u0639","\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646"],...(t.activities.trainings||[]).map(p=>[p.startDate?Utils.formatDate(p.startDate):"\u2014",p.topic||"\u2014",(typeof Training<"u"&&Training.getParticipantsCount?Training.getParticipantsCount(p):0)||"\u2014"])],u=XLSX.utils.aoa_to_sheet(m);XLSX.utils.book_append_sheet(o,u,"\u0627\u0644\u0623\u0646\u0634\u0637\u0629")}const d=`\u062A\u0642\u0631\u064A\u0631_\u0623\u062F\u0627\u0621_${a.name||"\u0645\u0648\u0638\u0641"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(o,d),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0628\u0646\u062C\u0627\u062D")}else Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(s.message||"\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},async generateAttendanceReport(){const s=document.getElementById("attendance-member-select")?.value;if(!s){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0623\u0648\u0644\u0627\u064B");return}const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631/\u063A\u064A\u0627\u0628</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="attendance-report-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 *</label>
                            <select id="report-period" required class="form-input">
                                <option value="monthly">\u0634\u0647\u0631\u064A</option>
                                <option value="yearly">\u0633\u0646\u0648\u064A</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0633\u0646\u0629 *</label>
                            <input type="number" id="report-year" required class="form-input" 
                                   value="${new Date().getFullYear()}" min="2020" max="2100">
                        </div>
                        <div id="report-month-container">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0634\u0647\u0631</label>
                            <select id="report-month" class="form-input">
                                <option value="0">\u064A\u0646\u0627\u064A\u0631</option>
                                <option value="1">\u0641\u0628\u0631\u0627\u064A\u0631</option>
                                <option value="2">\u0645\u0627\u0631\u0633</option>
                                <option value="3">\u0623\u0628\u0631\u064A\u0644</option>
                                <option value="4">\u0645\u0627\u064A\u0648</option>
                                <option value="5">\u064A\u0648\u0646\u064A\u0648</option>
                                <option value="6">\u064A\u0648\u0644\u064A\u0648</option>
                                <option value="7">\u0623\u063A\u0633\u0637\u0633</option>
                                <option value="8">\u0633\u0628\u062A\u0645\u0628\u0631</option>
                                <option value="9">\u0623\u0643\u062A\u0648\u0628\u0631</option>
                                <option value="10">\u0646\u0648\u0641\u0645\u0628\u0631</option>
                                <option value="11">\u062F\u064A\u0633\u0645\u0628\u0631</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="generate-attendance-report-btn" class="btn-primary">\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</button>
                </div>
            </div>
        `,document.body.appendChild(t);const a=t.querySelector("#report-period"),i=t.querySelector("#report-month-container");a.addEventListener("change",()=>{i.style.display=a.value==="monthly"?"block":"none"}),i.style.display="block",t.querySelector("#generate-attendance-report-btn").addEventListener("click",async()=>{const o=a.value,r=parseInt(document.getElementById("report-year").value),c=o==="monthly"?parseInt(document.getElementById("report-month").value):null;t.remove();try{Loading.show();const d=await GoogleIntegration.sendRequest({action:"generateAttendanceReport",data:{memberId:s,period:o,year:r,month:c}});if(d.success&&d.data){const m=d.data,u=document.createElement("div");u.className="modal-overlay",u.innerHTML=`
                        <div class="modal-content" style="max-width: 700px;">
                            <div class="modal-header">
                                <h2 class="modal-title">\u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631/\u063A\u064A\u0627\u0628</h2>
                                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-4">
                                    <h3 class="font-semibold text-gray-800 mb-2">\u0627\u0644\u0641\u062A\u0631\u0629: ${o==="monthly"?"\u0634\u0647\u0631\u064A":"\u0633\u0646\u0648\u064A"} - ${r}${c!==null?` - ${["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"][c]}`:""}</h3>
                                </div>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div class="bg-green-50 p-3 rounded-lg">
                                        <p class="text-sm text-gray-600">\u0623\u064A\u0627\u0645 \u0627\u0644\u062D\u0636\u0648\u0631</p>
                                        <p class="text-2xl font-bold text-green-600">${m.statistics?.presentDays||0}</p>
                                    </div>
                                    <div class="bg-yellow-50 p-3 rounded-lg">
                                        <p class="text-sm text-gray-600">\u0623\u064A\u0627\u0645 \u0627\u0644\u062A\u0623\u062E\u064A\u0631</p>
                                        <p class="text-2xl font-bold text-yellow-600">${m.statistics?.lateDays||0}</p>
                                    </div>
                                    <div class="bg-red-50 p-3 rounded-lg">
                                        <p class="text-sm text-gray-600">\u0623\u064A\u0627\u0645 \u0627\u0644\u063A\u064A\u0627\u0628</p>
                                        <p class="text-2xl font-bold text-red-600">${m.statistics?.absentDays||0}</p>
                                    </div>
                                    <div class="bg-blue-50 p-3 rounded-lg">
                                        <p class="text-sm text-gray-600">\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0636\u0648\u0631</p>
                                        <p class="text-2xl font-bold text-blue-600">${(m.statistics?.attendanceRate||0).toFixed(1)}%</p>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <p class="text-sm text-gray-600">\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629: <strong>${m.statistics?.leaveDays||0} \u064A\u0648\u0645</strong></p>
                                    <p class="text-sm text-gray-600">\u0639\u062F\u062F \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A: <strong>${m.statistics?.totalLeaves||0}</strong></p>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                            </div>
                        </div>
                    `,document.body.appendChild(u),u.addEventListener("click",p=>{p.target===u&&u.remove()})}else Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(d.message||"\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(d){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+d.message)}finally{Loading.hide()}}),t.addEventListener("click",o=>{o.target===t&&t.remove()})},async renderAttendanceView(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-calendar-check ml-2"></i>\u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</h2>
                        <div class="flex gap-2">
                            <select id="attendance-member-select" class="form-input" style="min-width: 200px;">
                                <option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>
                            </select>
                            <button id="add-attendance-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                \u062A\u0633\u062C\u064A\u0644 \u062D\u0636\u0648\u0631
                            </button>
                            <button id="add-leave-btn" class="btn-secondary">
                                <i class="fas fa-calendar-times ml-2"></i>
                                \u062A\u0633\u062C\u064A\u0644 \u0625\u062C\u0627\u0632\u0629
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-semibold text-gray-700 mb-3">\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</h3>
                            <div id="attendance-list" class="space-y-2">
                                <div class="empty-state">
                                    <p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-700 mb-3">\u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</h3>
                            <div id="leaves-list" class="space-y-2">
                                <div class="empty-state">
                                    <p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},_attachAttendanceListeners(){const e=document.getElementById("attendance-member-select");if(!e)return;e.onchange=()=>{const t=e.value;if(t)this.loadMemberAttendance(t),this.loadMemberLeaves(t);else{const a=document.getElementById("attendance-list"),i=document.getElementById("leaves-list");a&&(a.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</p></div>'),i&&(i.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</p></div>')}},document.getElementById("add-attendance-btn")?.addEventListener("click",()=>this.showAttendanceForm()),document.getElementById("add-leave-btn")?.addEventListener("click",()=>this.showLeaveForm());let s=e.parentElement?.querySelector(".btn-success");s||(s=document.createElement("button"),s.className="btn-success btn-sm ml-2",s.innerHTML='<i class="fas fa-file-alt ml-2"></i>\u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631/\u063A\u064A\u0627\u0628',s.addEventListener("click",()=>this.generateAttendanceReport()),e.parentElement?.appendChild(s))},async loadAttendance(){const e=document.getElementById("attendance-member-select");if(!e)return;const s=this._getMembersFromCache();s&&s.length>0&&(e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+s.map(t=>`<option value="${t.id}">${Utils.escapeHTML(t.name||"")}</option>`).join(""),this._attachAttendanceListeners());try{const t=GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});let a;try{a=await this._raceWithTimeout(t)}catch(i){i&&i.timeout&&t.then(n=>{if(n&&n.success&&n.data){const o=Array.isArray(n.data)?n.data:[];this.cache.members=o,this.cache.lastLoad=Date.now();const r=document.getElementById("attendance-member-select");r&&(r.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+o.map(c=>`<option value="${c.id}">${Utils.escapeHTML(c.name||"")}</option>`).join("")),this._attachAttendanceListeners()}}).catch(()=>{});return}if(a&&a.success&&a.data){const i=Array.isArray(a.data)?a.data:[];this.cache.members=i,this.cache.lastLoad=Date.now(),e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+i.map(n=>`<option value="${n.id}">${Utils.escapeHTML(n.name||"")}</option>`).join(""),this._attachAttendanceListeners()}}catch(t){const a=t?.message||t?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A:",a,t)}},async loadMemberAttendance(e){const s=document.getElementById("attendance-list");if(s)try{Loading.show();const t=await GoogleIntegration.sendRequest({action:"getSafetyTeamAttendance",data:{memberId:e}});if(t.success&&t.data){const a=Array.isArray(t.data)?t.data:[];if(a.length===0){s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u0636\u0648\u0631</p></div>',Loading.hide();return}a.sort((i,n)=>new Date(n.date)-new Date(i.date)),s.innerHTML=a.slice(0,10).map(i=>`
                    <div class="bg-white border border-gray-200 rounded-lg p-3">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="font-semibold text-gray-800">${Utils.formatDate(i.date)}</p>
                                <p class="text-sm text-gray-600">
                                    ${i.checkIn?`\u062F\u062E\u0648\u0644: ${i.checkIn}`:""} 
                                    ${i.checkOut?` | \u062E\u0631\u0648\u062C: ${i.checkOut}`:""}
                                    ${i.workDuration?` | \u0645\u062F\u0629: ${i.workDuration} \u0633\u0627\u0639\u0629`:""}
                                </p>
                            </div>
                            <span class="badge badge-${i.status==="\u062D\u0627\u0636\u0631"?"success":i.status==="\u0645\u062A\u0623\u062E\u0631"?"warning":i.status==="\u063A\u0627\u0626\u0628"?"danger":"info"}">
                                ${Utils.escapeHTML(i.status||"")}
                            </span>
                        </div>
                    </div>
                `).join("")}else s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u0636\u0648\u0631</p></div>'}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631:",t),s.innerHTML='<div class="empty-state"><p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p></div>'}finally{Loading.hide()}},async loadMemberLeaves(e){const s=document.getElementById("leaves-list");if(s)try{Loading.show();const t=await GoogleIntegration.sendRequest({action:"getSafetyTeamLeaves",data:{memberId:e}});if(t.success&&t.data){const a=Array.isArray(t.data)?t.data:[];if(a.length===0){s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0625\u062C\u0627\u0632\u0627\u062A</p></div>',Loading.hide();return}a.sort((i,n)=>new Date(n.startDate)-new Date(i.startDate)),s.innerHTML=a.slice(0,10).map(i=>`
                    <div class="bg-white border border-gray-200 rounded-lg p-3">
                        <div class="flex items-center justify-between mb-2">
                            <div>
                                <p class="font-semibold text-gray-800">${Utils.escapeHTML(i.leaveType||"")}</p>
                                <p class="text-sm text-gray-600">
                                    ${Utils.formatDate(i.startDate)} - ${Utils.formatDate(i.endDate)}
                                    ${i.daysCount?` (${i.daysCount} \u064A\u0648\u0645)`:""}
                                </p>
                            </div>
                            <span class="badge badge-${i.approvalStatus==="\u0645\u0639\u062A\u0645\u062F"?"success":i.approvalStatus==="\u0645\u0631\u0641\u0648\u0636"?"danger":"warning"}">
                                ${Utils.escapeHTML(i.approvalStatus||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629")}
                            </span>
                        </div>
                        ${i.reason?`<p class="text-xs text-gray-500">${Utils.escapeHTML(i.reason)}</p>`:""}
                    </div>
                `).join("")}else s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0625\u062C\u0627\u0632\u0627\u062A</p></div>'}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A:",t),s.innerHTML='<div class="empty-state"><p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p></div>'}finally{Loading.hide()}},async showAttendanceForm(){const s=document.getElementById("attendance-member-select")?.value;if(!s){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0623\u0648\u0644\u0627\u064B");return}const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0633\u062C\u064A\u0644 \u062D\u0636\u0648\u0631</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="attendance-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                            <input type="date" id="attendance-date" required class="form-input" 
                                value="${new Date().toISOString().split("T")[0]}">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</label>
                                <input type="time" id="attendance-check-in" class="form-input">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</label>
                                <input type="time" id="attendance-check-out" class="form-input">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                            <select id="attendance-status" required class="form-input">
                                <option value="\u062D\u0627\u0636\u0631">\u062D\u0627\u0636\u0631</option>
                                <option value="\u0645\u062A\u0623\u062E\u0631">\u0645\u062A\u0623\u062E\u0631</option>
                                <option value="\u063A\u0627\u0626\u0628">\u063A\u0627\u0626\u0628</option>
                                <option value="\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A">\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                            <textarea id="attendance-notes" class="form-input" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-attendance-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t);const a=t.querySelector("#save-attendance-btn"),i=t.querySelector("#attendance-form");a.addEventListener("click",()=>this.handleAttendanceSubmit(i,s,t)),t.addEventListener("click",n=>{n.target===t&&t.remove()})},async handleAttendanceSubmit(e,s,t){if(!e.checkValidity()){e.reportValidity();return}const a={memberId:s,date:document.getElementById("attendance-date").value,checkIn:document.getElementById("attendance-check-in").value||null,checkOut:document.getElementById("attendance-check-out").value||null,status:document.getElementById("attendance-status").value,notes:document.getElementById("attendance-notes").value.trim()};Loading.show();try{const i=await GoogleIntegration.sendRequest({action:"addSafetyTeamAttendance",data:a});i.success?(Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D"),t.remove(),this.loadMemberAttendance(s)):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(i.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(i){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message)}finally{Loading.hide()}},async showLeaveForm(){const s=document.getElementById("attendance-member-select")?.value;if(!s){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0623\u0648\u0644\u0627\u064B");return}const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0633\u062C\u064A\u0644 \u0625\u062C\u0627\u0632\u0629</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="leave-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 *</label>
                            <select id="leave-type" required class="form-input">
                                <option value="\u0633\u0646\u0648\u064A\u0629">\u0633\u0646\u0648\u064A\u0629</option>
                                <option value="\u0645\u0631\u0636\u064A\u0629">\u0645\u0631\u0636\u064A\u0629</option>
                                <option value="\u0637\u0627\u0631\u0626\u0629">\u0637\u0627\u0631\u0626\u0629</option>
                                <option value="\u0623\u062E\u0631\u0649">\u0623\u062E\u0631\u0649</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 *</label>
                                <input type="date" id="leave-start-date" required class="form-input">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629 *</label>
                                <input type="date" id="leave-end-date" required class="form-input">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</label>
                            <textarea id="leave-reason" class="form-input" rows="3" placeholder="\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</label>
                            <select id="leave-approval-status" class="form-input">
                                <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629">\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                <option value="\u0645\u0639\u062A\u0645\u062F">\u0645\u0639\u062A\u0645\u062F</option>
                                <option value="\u0645\u0631\u0641\u0648\u0636">\u0645\u0631\u0641\u0648\u0636</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-leave-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t);const a=t.querySelector("#save-leave-btn"),i=t.querySelector("#leave-form");a.addEventListener("click",()=>this.handleLeaveSubmit(i,s,t)),t.addEventListener("click",n=>{n.target===t&&t.remove()})},async handleLeaveSubmit(e,s,t){if(!e.checkValidity()){e.reportValidity();return}const a={memberId:s,leaveType:document.getElementById("leave-type").value,startDate:document.getElementById("leave-start-date").value,endDate:document.getElementById("leave-end-date").value,reason:document.getElementById("leave-reason").value.trim(),approvalStatus:document.getElementById("leave-approval-status").value};Loading.show();try{const i=await GoogleIntegration.sendRequest({action:"addSafetyTeamLeave",data:a});i.success?(Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0628\u0646\u062C\u0627\u062D"),t.remove(),this.loadMemberLeaves(s)):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(i.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(i){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message)}finally{Loading.hide()}},async renderSettingsView(){return AppState.currentUser?.role!=="admin"?'<div class="content-card"><div class="card-body"><p class="text-red-500">\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629</p></div></div>':`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-cog ml-2"></i>\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</h2>
                </div>
                <div class="card-body">
                    <div id="settings-container" class="space-y-6">
                        <div class="empty-state">
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadSettings(){if(AppState.currentUser?.role!=="admin")return;const e=document.getElementById("settings-container");if(!e)return;if(!this.isGoogleAppsScriptEnabled()){const t={leaveTypes:["\u0633\u0646\u0648\u064A\u0629","\u0645\u0631\u0636\u064A\u0629","\u0637\u0627\u0631\u0626\u0629","\u0623\u062E\u0631\u0649"],attendanceStatuses:["\u062D\u0627\u0636\u0631","\u0645\u062A\u0623\u062E\u0631","\u063A\u0627\u0626\u0628","\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A"],kpiTargets:{targetInspections:20,targetActionsClosure:80,targetObservations:15,targetTrainings:3,targetCommitment:95,inspectionsPerMonth:20,actionsClosureRate:80,observationsPerMonth:15,trainingsPerMonth:2,commitmentRate:95}};this.renderSettingsContent(e,t);return}try{e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';const t=GoogleIntegration.sendRequest({action:"getSafetyHealthManagementSettings",data:{}});let a;try{a=await this._raceWithTimeout(t)}catch(i){if(i&&i.timeout)t.then(n=>{const o=document.getElementById("settings-container");if(o)if(n&&n.success&&n.data)this.renderSettingsContent(o,n.data);else{const r={leaveTypes:["\u0633\u0646\u0648\u064A\u0629","\u0645\u0631\u0636\u064A\u0629","\u0637\u0627\u0631\u0626\u0629","\u0623\u062E\u0631\u0649"],attendanceStatuses:["\u062D\u0627\u0636\u0631","\u0645\u062A\u0623\u062E\u0631","\u063A\u0627\u0626\u0628","\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A"],kpiTargets:{targetInspections:20,targetActionsClosure:80,targetObservations:15,targetTrainings:3,targetCommitment:95}};this.renderSettingsContent(o,r)}}).catch(()=>{});else throw i}if(a&&a.success&&a.data){const i=a.data;this.renderSettingsContent(e,i)}else if(a){const i={leaveTypes:["\u0633\u0646\u0648\u064A\u0629","\u0645\u0631\u0636\u064A\u0629","\u0637\u0627\u0631\u0626\u0629","\u0623\u062E\u0631\u0649"],attendanceStatuses:["\u062D\u0627\u0636\u0631","\u0645\u062A\u0623\u062E\u0631","\u063A\u0627\u0626\u0628","\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A"],kpiTargets:{targetInspections:20,targetActionsClosure:80,targetObservations:15,targetTrainings:3,targetCommitment:95,inspectionsPerMonth:20,actionsClosureRate:80,observationsPerMonth:15,trainingsPerMonth:2,commitmentRate:95}};this.renderSettingsContent(e,i)}}catch(t){const a=t?.message||t?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";this.isGoogleAppsScriptEnabled()&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",a,t);const n={leaveTypes:["\u0633\u0646\u0648\u064A\u0629","\u0645\u0631\u0636\u064A\u0629","\u0637\u0627\u0631\u0626\u0629","\u0623\u062E\u0631\u0649"],attendanceStatuses:["\u062D\u0627\u0636\u0631","\u0645\u062A\u0623\u062E\u0631","\u063A\u0627\u0626\u0628","\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A"],kpiTargets:{targetInspections:20,targetActionsClosure:80,targetObservations:15,targetTrainings:3,targetCommitment:95,inspectionsPerMonth:20,actionsClosureRate:80,observationsPerMonth:15,trainingsPerMonth:2,commitmentRate:95}};this.renderSettingsContent(e,n)}},renderSettingsContent(e,s){!e||!s||(e.innerHTML=`
                    <div>
                        <h3 class="font-semibold text-gray-700 mb-3">\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</h3>
                        <div id="leave-types-container" class="space-y-2">
                            ${(s.leaveTypes||["\u0633\u0646\u0648\u064A\u0629","\u0645\u0631\u0636\u064A\u0629","\u0637\u0627\u0631\u0626\u0629","\u0623\u062E\u0631\u0649"]).map((t,a)=>`
                                <div class="flex items-center gap-2">
                                    <input type="text" class="form-input flex-1 leave-type-input" 
                                           value="${Utils.escapeHTML(t)}" data-index="${a}">
                                    <button onclick="SafetyHealthManagement.removeLeaveType(${a})" class="btn-danger btn-sm">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                        </div>
                        <button onclick="SafetyHealthManagement.addLeaveType()" class="btn-secondary btn-sm mt-2">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0625\u062C\u0627\u0632\u0629
                        </button>
                        <button onclick="SafetyHealthManagement.saveLeaveTypes()" class="btn-primary btn-sm mt-2 ml-2">
                            <i class="fas fa-save ml-2"></i>
                            \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A
                        </button>
                    </div>
                    
                    <div class="border-t border-gray-200 pt-6 mt-6">
                        <h3 class="font-semibold text-gray-700 mb-3">\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u062D\u0636\u0648\u0631</h3>
                        <div id="attendance-statuses-container" class="space-y-2">
                            ${(s.attendanceStatuses||["\u062D\u0627\u0636\u0631","\u0645\u062A\u0623\u062E\u0631","\u063A\u0627\u0626\u0628","\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A"]).map((t,a)=>`
                                <div class="flex items-center gap-2">
                                    <input type="text" class="form-input flex-1 attendance-status-input" 
                                           value="${Utils.escapeHTML(t)}" data-index="${a}">
                                    <button onclick="SafetyHealthManagement.removeAttendanceStatus(${a})" class="btn-danger btn-sm">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                        </div>
                        <button onclick="SafetyHealthManagement.addAttendanceStatus()" class="btn-secondary btn-sm mt-2">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0646\u064A\u0641 \u062D\u0636\u0648\u0631
                        </button>
                        <button onclick="SafetyHealthManagement.saveAttendanceStatuses()" class="btn-primary btn-sm mt-2 ml-2">
                            <i class="fas fa-save ml-2"></i>
                            \u062D\u0641\u0638 \u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u062D\u0636\u0648\u0631
                        </button>
                    </div>
                    
                    <div class="border-t border-gray-200 pt-6 mt-6">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="font-semibold text-gray-700">\u0623\u0647\u062F\u0627\u0641 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629</h3>
                            <button onclick="SafetyHealthManagement.showKPITargetsForm()" class="btn-secondary btn-sm">
                                <i class="fas fa-edit ml-2"></i>
                                \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629
                            </button>
                        </div>
                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0627\u0644\u0634\u0647\u0631\u064A\u0629:</span>
                                    <span class="font-semibold">${s.kpiTargets?.inspectionsPerMonth||20}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">\u0646\u0633\u0628\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A:</span>
                                    <span class="font-semibold">${s.kpiTargets?.actionsClosureRate||80}%</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629:</span>
                                    <span class="font-semibold">${s.kpiTargets?.observationsPerMonth||15}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629:</span>
                                    <span class="font-semibold">${s.kpiTargets?.trainingsPerMonth||2}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645:</span>
                                    <span class="font-semibold">${s.kpiTargets?.commitmentRate||95}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t border-gray-200 pt-6 mt-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold text-gray-700">\u0625\u062F\u0627\u0631\u0629 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0645\u062E\u0635\u0635\u0629</h3>
                            <button onclick="SafetyHealthManagement.showCustomKPIForm()" class="btn-primary btn-sm">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0645\u0624\u0634\u0631 \u062C\u062F\u064A\u062F
                            </button>
                        </div>
                        <div id="custom-kpis-container" class="space-y-3">
                            <div class="empty-state">
                                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629...</p>
                            </div>
                        </div>
                    </div>
                `,this.currentSettings=s,requestAnimationFrame(()=>{const t=e.querySelector('button[onclick*="addLeaveType"]');if(t){const c=t.cloneNode(!0);t.parentNode.replaceChild(c,t),c.addEventListener("click",()=>this.addLeaveType())}const a=e.querySelector('button[onclick*="saveLeaveTypes"]');if(a){const c=a.cloneNode(!0);a.parentNode.replaceChild(c,a),c.addEventListener("click",()=>this.saveLeaveTypes())}const i=e.querySelector('button[onclick*="addAttendanceStatus"]');if(i){const c=i.cloneNode(!0);i.parentNode.replaceChild(c,i),c.addEventListener("click",()=>this.addAttendanceStatus())}const n=e.querySelector('button[onclick*="saveAttendanceStatuses"]');if(n){const c=n.cloneNode(!0);n.parentNode.replaceChild(c,n),c.addEventListener("click",()=>this.saveAttendanceStatuses())}const o=e.querySelector('button[onclick*="showKPITargetsForm"]');if(o){const c=o.cloneNode(!0);o.parentNode.replaceChild(c,o),c.addEventListener("click",()=>this.showKPITargetsForm())}const r=e.querySelector('button[onclick*="showCustomKPIForm"]');if(r){const c=r.cloneNode(!0);r.parentNode.replaceChild(c,r),c.addEventListener("click",()=>this.showCustomKPIForm())}}),this.loadCustomKPIs())},addLeaveType(){const e=document.getElementById("leave-types-container");if(!e)return;const s=e.children.length,t=document.createElement("div");t.className="flex items-center gap-2",t.innerHTML=`
            <input type="text" class="form-input flex-1 leave-type-input" 
                   placeholder="\u0646\u0648\u0639 \u0627\u0644\u0625\u062C\u0627\u0632\u0629" data-index="${s}">
            <button onclick="SafetyHealthManagement.removeLeaveType(${s})" class="btn-danger btn-sm">
                <i class="fas fa-trash"></i>
            </button>
        `,e.appendChild(t)},removeLeaveType(e){const s=document.getElementById("leave-types-container");if(!s)return;const t=s.querySelector(`[data-index="${e}"]`)?.closest(".flex");t&&t.remove()},async saveLeaveTypes(){const e=document.getElementById("leave-types-container");if(!e)return;if(!this.isGoogleAppsScriptEnabled()){Notification.warning("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 Google Apps Script \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}const s=Array.from(e.querySelectorAll(".leave-type-input")).map(t=>t.value.trim()).filter(t=>t!=="");if(s.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0625\u062C\u0627\u0632\u0629 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}Loading.show();try{const t=await GoogleIntegration.sendRequest({action:"updateLeaveTypes",data:{leaveTypes:s}});t.success?(Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),this.loadSettings()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(t.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(t){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}finally{Loading.hide()}},addAttendanceStatus(){const e=document.getElementById("attendance-statuses-container");if(!e)return;const s=e.children.length,t=document.createElement("div");t.className="flex items-center gap-2",t.innerHTML=`
            <input type="text" class="form-input flex-1 attendance-status-input" 
                   placeholder="\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0636\u0648\u0631" data-index="${s}">
            <button onclick="SafetyHealthManagement.removeAttendanceStatus(${s})" class="btn-danger btn-sm">
                <i class="fas fa-trash"></i>
            </button>
        `,e.appendChild(t)},removeAttendanceStatus(e){const s=document.getElementById("attendance-statuses-container");if(!s)return;const t=s.querySelector(`[data-index="${e}"]`)?.closest(".flex");t&&t.remove()},async saveAttendanceStatuses(){const e=document.getElementById("attendance-statuses-container");if(!e)return;if(!this.isGoogleAppsScriptEnabled()){Notification.warning("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 Google Apps Script \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}const s=Array.from(e.querySelectorAll(".attendance-status-input")).map(t=>t.value.trim()).filter(t=>t!=="");if(s.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0646\u064A\u0641 \u062D\u0636\u0648\u0631 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}Loading.show();try{const t=await GoogleIntegration.sendRequest({action:"updateAttendanceStatuses",data:{statuses:s}});t.success?(Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D"),this.loadSettings()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(t.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(t){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}finally{Loading.hide()}},showKPITargetsForm(){const s=(this.currentSettings||{}).kpiTargets||{},t=this.getCustomKPITargets(s),a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0639\u062F\u064A\u0644 \u0623\u0647\u062F\u0627\u0641 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="kpi-targets-form" class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-700 mb-3">\u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0627\u0644\u0634\u0647\u0631\u064A\u0629 *</label>
                                <input type="number" id="kpi-target-inspections" required class="form-input" 
                                       value="${s.inspectionsPerMonth||20}" min="0">
                                <p class="text-xs text-gray-500 mt-1">\u0639\u062F\u062F \u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0634\u0647\u0631\u064A\u0627\u064B</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0633\u0628\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A (%) *</label>
                                <input type="number" id="kpi-target-actions-closure" required class="form-input" 
                                       value="${s.actionsClosureRate||80}" min="0" max="100">
                                <p class="text-xs text-gray-500 mt-1">\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629 \u0645\u0646 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629 *</label>
                                <input type="number" id="kpi-target-observations" required class="form-input" 
                                       value="${s.observationsPerMonth||15}" min="0">
                                <p class="text-xs text-gray-500 mt-1">\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0634\u0647\u0631\u064A\u0627\u064B</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629 *</label>
                                <input type="number" id="kpi-target-trainings" required class="form-input" 
                                       value="${s.trainingsPerMonth||2}" min="0">
                                <p class="text-xs text-gray-500 mt-1">\u0639\u062F\u062F \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0634\u0647\u0631\u064A\u0627\u064B</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 (%) *</label>
                                <input type="number" id="kpi-target-commitment" required class="form-input" 
                                       value="${s.commitmentRate||95}" min="0" max="100">
                                <p class="text-xs text-gray-500 mt-1">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629</p>
                            </div>
                        </div>
                        
                        <div class="border-t border-gray-200 pt-4 mt-4">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="text-lg font-semibold text-gray-700">\u0623\u0647\u062F\u0627\u0641 \u0625\u0636\u0627\u0641\u064A\u0629</h3>
                                <button type="button" id="add-custom-target-btn" class="btn-secondary btn-sm">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u0647\u062F\u0641 \u062C\u062F\u064A\u062F
                                </button>
                            </div>
                            <div id="custom-targets-container" class="space-y-3">
                                ${this.renderCustomTargets(t)}
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-kpi-targets-btn" class="btn-primary">\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A</button>
                </div>
            </div>
        `,document.body.appendChild(a);const i=a.querySelector("#add-custom-target-btn");i&&i.addEventListener("click",()=>this.addCustomTarget(a)),a.querySelector("#save-kpi-targets-btn").addEventListener("click",()=>this.saveKPITargets(a)),a.addEventListener("click",o=>{o.target===a&&a.remove()})},getCustomKPITargets(e){const s=["inspectionsPerMonth","actionsClosureRate","observationsPerMonth","trainingsPerMonth","commitmentRate","targetInspections","targetActionsClosure","targetObservations","targetTrainings","targetCommitment"],t={};for(const a in e)s.includes(a)||(t[a]=e[a]);return t},renderCustomTargets(e){if(!e||Object.keys(e).length===0)return'<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0647\u062F\u0627\u0641 \u0625\u0636\u0627\u0641\u064A\u0629</p>';let s="";for(const t in e)s+=`
                <div class="flex items-center gap-2 custom-target-item" data-key="${Utils.escapeHTML(t)}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(t)}" 
                           placeholder="\u0627\u0633\u0645 \u0627\u0644\u0647\u062F\u0641" readonly>
                    <input type="number" class="form-input w-32" value="${e[t]}" 
                           placeholder="\u0627\u0644\u0642\u064A\u0645\u0629" min="0" data-target-key="${Utils.escapeHTML(t)}">
                    <button type="button" class="btn-icon btn-icon-danger" onclick="this.closest('.custom-target-item').remove()">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;return s},addCustomTarget(e){const s=e.querySelector("#custom-targets-container");if(!s)return;const t=`custom_${Date.now()}`,a=document.createElement("div");a.className="flex items-center gap-2 custom-target-item",a.setAttribute("data-key",t),a.innerHTML=`
            <input type="text" class="form-input flex-1" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0647\u062F\u0641 (\u0645\u062B\u0627\u0644: \u0639\u062F\u062F \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631)" 
                   id="custom-target-name-${t}">
            <input type="number" class="form-input w-32" value="0" placeholder="\u0627\u0644\u0642\u064A\u0645\u0629" min="0" 
                   data-target-key="${t}" id="custom-target-value-${t}">
            <button type="button" class="btn-icon btn-icon-danger" onclick="this.closest('.custom-target-item').remove()">
                <i class="fas fa-trash"></i>
            </button>
        `,s.appendChild(a),requestAnimationFrame(()=>{const i=a.querySelector(`#custom-target-name-${t}`);i&&i.focus()})},async saveKPITargets(e=null){if(!this.isGoogleAppsScriptEnabled()){Notification.warning("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 Google Apps Script \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}const s={inspectionsPerMonth:parseInt(document.getElementById("kpi-target-inspections")?.value)||20,actionsClosureRate:parseInt(document.getElementById("kpi-target-actions-closure")?.value)||80,observationsPerMonth:parseInt(document.getElementById("kpi-target-observations")?.value)||15,trainingsPerMonth:parseInt(document.getElementById("kpi-target-trainings")?.value)||2,commitmentRate:parseInt(document.getElementById("kpi-target-commitment")?.value)||95,targetInspections:parseInt(document.getElementById("kpi-target-inspections")?.value)||20,targetActionsClosure:parseInt(document.getElementById("kpi-target-actions-closure")?.value)||80,targetObservations:parseInt(document.getElementById("kpi-target-observations")?.value)||15,targetTrainings:parseInt(document.getElementById("kpi-target-trainings")?.value)||2,targetCommitment:parseInt(document.getElementById("kpi-target-commitment")?.value)||95};e&&e.querySelectorAll(".custom-target-item").forEach(a=>{const i=a.querySelector('input[type="text"]'),n=a.querySelector('input[type="number"]');if(i&&n){const o=i.value.trim(),r=parseInt(n.value)||0;o&&(s[o]=r)}}),Loading.show();try{const t=await GoogleIntegration.sendRequest({action:"updateKPITargets",data:{targets:s}});t.success?(Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0623\u0647\u062F\u0627\u0641 KPIs \u0628\u0646\u062C\u0627\u062D"),e&&e.remove(),this.loadSettings()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(t.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(t){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}finally{Loading.hide()}},async loadCustomKPIs(){const e=document.getElementById("custom-kpis-container");if(!e)return;const s=this.getDataAccessMessage("getCustomKPIs",{});if(s){e.innerHTML=`
                <div class="empty-state">
                    <p class="text-gray-500 mb-2">${s}</p>
                    <p class="text-xs text-gray-400">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0624\u0634\u0631\u0627\u062A \u0645\u062E\u0635\u0635\u0629 \u0645\u062A\u0627\u062D\u0629</p>
                </div>
            `;return}try{Loading.show();const t=await GoogleIntegration.sendRequest({action:"getSafetyHealthManagementSettings",data:{}});if(t.success&&t.data){const a=t.data;this.currentSettings=a;const i=a.customKPIs||[];if(i.length===0){e.innerHTML=`
                        <div class="empty-state">
                            <p class="text-gray-500 mb-2">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0624\u0634\u0631\u0627\u062A \u0645\u062E\u0635\u0635\u0629 \u0645\u0633\u062C\u0644\u0629</p>
                            <p class="text-xs text-gray-400">\u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u062C\u062F\u064A\u062F\u0629 \u0648\u0631\u0628\u0637\u0647\u0627 \u0628\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629</p>
                        </div>
                    `,Loading.hide();return}e.innerHTML=i.map((n,o)=>`
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <h4 class="font-semibold text-gray-800">${Utils.escapeHTML(n.name||"")}</h4>
                                    <span class="px-2 py-1 text-xs rounded ${this.getKPICategoryColor(n.category)}">
                                        ${Utils.escapeHTML(this.getKPICategoryLabel(n.category||""))}
                                    </span>
                                    ${n.isActive!==!1?'<span class="badge badge-success text-xs">\u0646\u0634\u0637</span>':'<span class="badge badge-secondary text-xs">\u063A\u064A\u0631 \u0646\u0634\u0637</span>'}
                                </div>
                                <p class="text-sm text-gray-600 mb-2">${Utils.escapeHTML(n.description||"")}</p>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                    <div>
                                        <span class="text-gray-500">\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644:</span>
                                        <span class="font-semibold">${Utils.escapeHTML(this.getModuleLabel(n.module||""))}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-500">\u0627\u0644\u0647\u062F\u0641 \u0627\u0644\u0634\u0647\u0631\u064A:</span>
                                        <span class="font-semibold">${n.targetValue||0}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-500">\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633:</span>
                                        <span class="font-semibold">${Utils.escapeHTML(n.unit||"\u0639\u062F\u062F")}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-500">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621:</span>
                                        <span class="font-semibold">${n.createdAt?Utils.formatDate(n.createdAt):"\u2014"}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="SafetyHealthManagement.editCustomKPI('${n.id||o}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="SafetyHealthManagement.deleteCustomKPI('${n.id||o}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join("")}}catch(t){const a=t?.message||t?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629:",a,t),e.innerHTML=`
                <div class="empty-state">
                    <p class="text-red-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629</p>
                    <button onclick="SafetyHealthManagement.loadCustomKPIs()" class="btn-secondary btn-sm mt-2">
                        <i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                    </button>
                </div>
            `}finally{Loading.hide()}},showCustomKPIForm(e=null){const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0624\u0634\u0631 \u0627\u0644\u0623\u062F\u0627\u0621":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0624\u0634\u0631 \u0623\u062F\u0627\u0621 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="custom-kpi-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0624\u0634\u0631 *</label>
                                <input type="text" id="custom-kpi-name" required class="form-input" 
                                       value="${Utils.escapeHTML(e?.name||"")}" 
                                       placeholder="\u0645\u062B\u0627\u0644: \u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0641\u0626\u0629 *</label>
                                <select id="custom-kpi-category" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0626\u0629</option>
                                    <option value="inspections" ${e?.category==="inspections"?"selected":""}>\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0648\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</option>
                                    <option value="training" ${e?.category==="training"?"selected":""}>\u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>
                                    <option value="observations" ${e?.category==="observations"?"selected":""}>\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</option>
                                    <option value="near-miss" ${e?.category==="near-miss"?"selected":""}>\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</option>
                                    <option value="actions" ${e?.category==="actions"?"selected":""}>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629</option>
                                    <option value="other" ${e?.category==="other"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                                </select>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641</label>
                                <textarea id="custom-kpi-description" class="form-input" rows="2" 
                                          placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0645\u0624\u0634\u0631">${Utils.escapeHTML(e?.description||"")}</textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0631\u062A\u0628\u0637 *</label>
                                <select id="custom-kpi-module" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</option>
                                    <option value="PeriodicInspectionRecords" ${e?.module==="PeriodicInspectionRecords"?"selected":""}>\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0648\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629</option>
                                    <option value="Training" ${e?.module==="Training"?"selected":""}>\u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>
                                    <option value="DailyObservations" ${e?.module==="DailyObservations"?"selected":""}>\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</option>
                                    <option value="NearMiss" ${e?.module==="NearMiss"?"selected":""}>\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</option>
                                    <option value="ActionTrackingRegister" ${e?.module==="ActionTrackingRegister"?"selected":""}>\u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0647\u062F\u0641 \u0627\u0644\u0634\u0647\u0631\u064A *</label>
                                <input type="number" id="custom-kpi-target" required class="form-input" 
                                       value="${e?.targetValue||0}" min="0" step="0.01">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633</label>
                                <input type="text" id="custom-kpi-unit" class="form-input" 
                                       value="${Utils.escapeHTML(e?.unit||"\u0639\u062F\u062F")}" 
                                       placeholder="\u0645\u062B\u0627\u0644: \u0639\u062F\u062F\u060C \u0646\u0633\u0628\u0629\u060C \u0633\u0627\u0639\u0629">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062D\u0642\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062F \u0639\u062F\u0651\u0647</label>
                                <input type="text" id="custom-kpi-field" class="form-input" 
                                       value="${Utils.escapeHTML(e?.fieldName||"")}" 
                                       placeholder="\u0645\u062B\u0627\u0644: status, type, category">
                                <p class="text-xs text-gray-500 mt-1">\u0627\u0633\u0645 \u0627\u0644\u062D\u0642\u0644 \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062F \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0642\u064A\u0645\u0629 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                                <input type="text" id="custom-kpi-filter-value" class="form-input" 
                                       value="${Utils.escapeHTML(e?.filterValue||"")}" 
                                       placeholder="\u0645\u062B\u0627\u0644: \u0645\u0643\u062A\u0645\u0644\u060C active\u060C closed">
                                <p class="text-xs text-gray-500 mt-1">\u0642\u064A\u0645\u0629 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0644\u0644\u062D\u0642\u0644 \u0627\u0644\u0645\u062D\u062F\u062F (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</p>
                            </div>
                            <div class="md:col-span-2">
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" id="custom-kpi-active" ${e?.isActive!==!1?"checked":""} class="form-checkbox">
                                    <span class="text-sm font-semibold text-gray-700">\u0627\u0644\u0645\u0624\u0634\u0631 \u0646\u0634\u0637</span>
                                </label>
                                <p class="text-xs text-gray-500 mt-1">\u0639\u0646\u062F \u0627\u0644\u062A\u0641\u0639\u064A\u0644\u060C \u0633\u064A\u062A\u0645 \u062D\u0633\u0627\u0628 \u0647\u0630\u0627 \u0627\u0644\u0645\u0624\u0634\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-custom-kpi-btn" class="btn-primary">${e?"\u062A\u062D\u062F\u064A\u062B":"\u062D\u0641\u0638"}</button>
                </div>
            </div>
        `,document.body.appendChild(s),s.querySelector("#save-custom-kpi-btn").addEventListener("click",()=>this.handleCustomKPISubmit(s,e?.id)),s.addEventListener("click",a=>{a.target===s&&s.remove()})},async handleCustomKPISubmit(e,s=null){if(!this.isGoogleAppsScriptEnabled()){Notification.warning("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 Google Apps Script \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}const t=e.querySelector("#custom-kpi-form");if(!t.checkValidity()){t.reportValidity();return}const a={name:document.getElementById("custom-kpi-name").value.trim(),category:document.getElementById("custom-kpi-category").value,description:document.getElementById("custom-kpi-description").value.trim(),module:document.getElementById("custom-kpi-module").value,targetValue:parseFloat(document.getElementById("custom-kpi-target").value)||0,unit:document.getElementById("custom-kpi-unit").value.trim()||"\u0639\u062F\u062F",fieldName:document.getElementById("custom-kpi-field").value.trim()||null,filterValue:document.getElementById("custom-kpi-filter-value").value.trim()||null,isActive:document.getElementById("custom-kpi-active").checked};if(!a.name||!a.category||!a.module){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}Loading.show();try{const i=s?"updateCustomKPI":"addCustomKPI",n=s?{kpiId:s,updateData:a}:a,o=await GoogleIntegration.sendRequest({action:i,data:n});o.success?(Notification.success(s?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0624\u0634\u0631 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0624\u0634\u0631 \u0628\u0646\u062C\u0627\u062D"),e.remove(),this.loadCustomKPIs(),this.loadSettings()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(o.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(i){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message)}finally{Loading.hide()}},async editCustomKPI(e){if(!this.isGoogleAppsScriptEnabled()){Notification.warning("Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0624\u0634\u0631");return}try{Loading.show();const s=await GoogleIntegration.sendRequest({action:"getSafetyHealthManagementSettings",data:{}});if(s.success&&s.data){const a=s.data.customKPIs||[],i=a.find(n=>(n.id||"").toString()===e.toString()||a.indexOf(n).toString()===e.toString());i?this.showCustomKPIForm(i):Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0624\u0634\u0631")}}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},async deleteCustomKPI(e){if(!this.isGoogleAppsScriptEnabled()){Notification.warning("Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0624\u0634\u0631");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0624\u0634\u0631\u061F \u0633\u064A\u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647."))try{Loading.show();const s=await GoogleIntegration.sendRequest({action:"deleteCustomKPI",data:{kpiId:e}});s.success?(Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0624\u0634\u0631 \u0628\u0646\u062C\u0627\u062D"),this.loadCustomKPIs()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(s.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641"))}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},async exportAllToExcel(){try{if(Loading.show(),typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629"),Loading.hide();return}const e=XLSX.utils.book_new();try{const t=await GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});if(t.success&&t.data){const a=Array.isArray(t.data)?t.data:[],i=[["\u0627\u0644\u0627\u0633\u0645","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","\u0627\u0644\u0642\u0633\u0645","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A","\u0627\u0644\u0647\u0627\u062A\u0641","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646","\u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629","\u0631\u0645\u0632 \u0627\u0644\u0645\u0648\u0638\u0641"]];a.forEach(o=>{i.push([o.name||"",o.jobTitle||"",o.department||"",o.email||"",o.phone||"",o.appointmentDate?Utils.formatDate(o.appointmentDate):"",o.positionLevel||"",o.employeeCode||""])});const n=XLSX.utils.aoa_to_sheet(i);XLSX.utils.book_append_sheet(e,n,"\u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}}catch(t){Utils.safeLog("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629:",t)}try{const t=await GoogleIntegration.sendRequest({action:"getOrganizationalStructure",data:{}});if(t.success&&t.data){const a=Array.isArray(t.data)?t.data:[],i=[["\u0627\u0644\u0645\u0646\u0635\u0628","\u0627\u0633\u0645 \u0627\u0644\u0639\u0636\u0648","\u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629","\u0627\u0644\u062A\u0631\u062A\u064A\u0628"]];a.forEach(o=>{i.push([o.position||"",o.memberName||"",o.positionLevel||"",o.order||""])});const n=XLSX.utils.aoa_to_sheet(i);XLSX.utils.book_append_sheet(e,n,"\u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}}catch(t){Utils.safeLog("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",t)}try{const t=await GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});if(t.success&&t.data){const a=Array.isArray(t.data)?t.data:[],i=[["\u0627\u0633\u0645 \u0627\u0644\u0639\u0636\u0648","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A","\u0627\u0644\u0645\u0647\u0627\u0645","\u0646\u0637\u0627\u0642 \u0627\u0644\u0639\u0645\u0644","\u0627\u0644\u0645\u0624\u0647\u0644\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"]];for(const n of a)try{const o=await GoogleIntegration.sendRequest({action:"getJobDescription",data:{memberId:n.id}});if(o.success&&o.data){const r=o.data;i.push([n.name||"",r.jobTitle||"",r.roleDescription||"",r.responsibilities||"",r.tasks||"",r.workScope||"",r.requiredQualifications||""])}}catch{}if(i.length>1){const n=XLSX.utils.aoa_to_sheet(i);XLSX.utils.book_append_sheet(e,n,"\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}}}catch(t){Utils.safeLog("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0623\u0648\u0635\u0627\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629:",t)}const s=`\u0625\u062F\u0627\u0631\u0629_\u0627\u0644\u0633\u0644\u0627\u0645\u0629_\u0648\u0627\u0644\u0635\u062D\u0629_\u0627\u0644\u0645\u0647\u0646\u064A\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(e,s),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide();const s=e?.message||e?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",s,e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+s)}},getKPICategoryLabel(e){return{inspections:"\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0648\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A",training:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628",observations:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A","near-miss":"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629",actions:"\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[e]||e},getKPICategoryColor(e){return{inspections:"bg-blue-100 text-blue-800",training:"bg-green-100 text-green-800",observations:"bg-yellow-100 text-yellow-800","near-miss":"bg-orange-100 text-orange-800",actions:"bg-purple-100 text-purple-800",other:"bg-gray-100 text-gray-800"}[e]||"bg-gray-100 text-gray-800"},getModuleLabel(e){return{PeriodicInspectionRecords:"\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0648\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629",Training:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628",DailyObservations:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629",NearMiss:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629",ActionTrackingRegister:"\u0633\u062C\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"}[e]||e},async renderAttendanceView(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <h2 class="card-title"><i class="fas fa-calendar-check ml-2"></i>\u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</h2>
                        <div class="flex gap-2">
                            <select id="attendance-member-select" class="form-input" style="min-width: 200px;">
                                <option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>
                            </select>
                            <button id="add-attendance-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                \u062A\u0633\u062C\u064A\u0644 \u062D\u0636\u0648\u0631
                            </button>
                            <button id="add-leave-btn" class="btn-secondary">
                                <i class="fas fa-calendar-times ml-2"></i>
                                \u062A\u0633\u062C\u064A\u0644 \u0625\u062C\u0627\u0632\u0629
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <!-- Tabs for Attendance and Leaves -->
                    <div class="mb-6">
                        <div class="flex items-center gap-2 border-b border-gray-200">
                            <button class="attendance-tab-btn active" data-subtab="attendance" onclick="SafetyHealthManagement.switchAttendanceTab('attendance')" style="padding: 10px 16px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.3s;">
                                <i class="fas fa-clock ml-2"></i>
                                \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631
                            </button>
                            <button class="attendance-tab-btn" data-subtab="leaves" onclick="SafetyHealthManagement.switchAttendanceTab('leaves')" style="padding: 10px 16px; border: none; background: transparent; color: #6b7280; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.3s;">
                                <i class="fas fa-calendar-alt ml-2"></i>
                                \u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A
                            </button>
                        </div>
                        <style>
                            .attendance-tab-btn:hover {
                                color: #3b82f6 !important;
                            }
                            .attendance-tab-btn.active {
                                color: #3b82f6 !important;
                                border-bottom-color: #3b82f6 !important;
                                font-weight: 600 !important;
                            }
                        </style>
                    </div>
                    
                    <!-- Attendance Content -->
                    <div id="attendance-content" class="attendance-subtab-content">
                        <div id="attendance-list" class="space-y-3">
                            <div class="empty-state">
                                <p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Leaves Content -->
                    <div id="leaves-content" class="attendance-subtab-content" style="display: none;">
                        <div id="leaves-list" class="space-y-3">
                            <div class="empty-state">
                                <p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadAttendance(){const e=document.getElementById("attendance-member-select"),s=document.getElementById("add-attendance-btn"),t=document.getElementById("add-leave-btn");if(!e)return;const a=this.getDataAccessMessage("getSafetyTeamAttendance",{});if(a){e.innerHTML=`<option value="">${a}</option>`;const i=document.getElementById("attendance-list"),n=document.getElementById("leaves-list");i&&(i.innerHTML='<div class="empty-state"><p class="text-gray-500">Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644\u0647 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A</p></div>'),n&&(n.innerHTML='<div class="empty-state"><p class="text-gray-500">Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644. \u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644\u0647 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A</p></div>');return}try{const i=await GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});if(i.success&&i.data){const n=Array.isArray(i.data)?i.data:[];e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+n.map(o=>`
                        <option value="${o.id}">${Utils.escapeHTML(o.name||"")} - ${Utils.escapeHTML(o.jobTitle||"")}</option>
                    `).join(""),e.addEventListener("change",()=>{e.value?(this.loadMemberAttendance(),this.loadMemberLeaves()):(document.getElementById("attendance-list").innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</p></div>',document.getElementById("leaves-list").innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</p></div>')}),s&&s.addEventListener("click",()=>this.showAttendanceForm()),t&&t.addEventListener("click",()=>this.showLeaveForm())}}catch(i){const n=i?.message||i?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A:",n,i)}},switchAttendanceTab(e){document.querySelectorAll(".attendance-tab-btn").forEach(a=>{a.classList.remove("active"),a.dataset.subtab===e&&a.classList.add("active")});const s=document.getElementById("attendance-content"),t=document.getElementById("leaves-content");s&&(s.style.display=e==="attendance"?"block":"none"),t&&(t.style.display=e==="leaves"?"block":"none")},async loadMemberAttendance(){const e=document.getElementById("attendance-member-select"),s=document.getElementById("attendance-list");if(!e||!s)return;const t=e.value;if(!t){s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</p></div>';return}try{Loading.show();const a=await GoogleIntegration.sendRequest({action:"getSafetyTeamAttendance",data:{memberId:t}});if(a.success&&a.data){const i=Array.isArray(a.data)?a.data:[];if(i.length===0){s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u0636\u0648\u0631</p></div>',Loading.hide();return}i.sort((n,o)=>{const r=new Date(n.date||0);return new Date(o.date||0)-r}),s.innerHTML=i.map(n=>{const r={\u062D\u0627\u0636\u0631:"bg-green-100 text-green-800",\u0645\u062A\u0623\u062E\u0631:"bg-yellow-100 text-yellow-800",\u063A\u0627\u0626\u0628:"bg-red-100 text-red-800","\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A":"bg-blue-100 text-blue-800"}[n.status]||"bg-gray-100 text-gray-800";return`
                        <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="font-semibold text-gray-800">${Utils.formatDate(n.date)}</span>
                                        <span class="px-2 py-1 text-xs rounded ${r}">${Utils.escapeHTML(n.status||"\u2014")}</span>
                                    </div>
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                        ${n.checkIn?`<div><i class="fas fa-sign-in-alt ml-1 text-green-600"></i>\u062F\u062E\u0648\u0644: ${this.formatTime(n.checkIn)}</div>`:""}
                                        ${n.checkOut?`<div><i class="fas fa-sign-out-alt ml-1 text-red-600"></i>\u062E\u0631\u0648\u062C: ${this.formatTime(n.checkOut)}</div>`:""}
                                        ${n.workDuration?`<div><i class="fas fa-clock ml-1 text-blue-600"></i>\u0627\u0644\u0645\u062F\u0629: ${n.workDuration} \u0633\u0627\u0639\u0629</div>`:""}
                                    </div>
                                    ${n.notes?`<p class="text-xs text-gray-500 mt-2">${Utils.escapeHTML(n.notes)}</p>`:""}
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="SafetyHealthManagement.editAttendance('${n.id}')" class="btn-icon btn-icon-primary">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="SafetyHealthManagement.deleteAttendance('${n.id}')" class="btn-icon btn-icon-danger">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `}).join("")}else s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u0636\u0648\u0631</p></div>'}catch(a){const i=a?.message||a?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631:",i,a),s.innerHTML=`<div class="empty-state"><p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623: ${Utils.escapeHTML(i)}</p></div>`}finally{Loading.hide()}},async loadMemberLeaves(){const e=document.getElementById("attendance-member-select"),s=document.getElementById("leaves-list");if(!e||!s)return;const t=e.value;if(!t){s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</p></div>';return}try{Loading.show();const a=await GoogleIntegration.sendRequest({action:"getSafetyTeamLeaves",data:{memberId:t}});if(a.success&&a.data){const i=Array.isArray(a.data)?a.data:[];if(i.length===0){s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0625\u062C\u0627\u0632\u0627\u062A</p></div>',Loading.hide();return}i.sort((n,o)=>{const r=new Date(n.startDate||0);return new Date(o.startDate||0)-r}),s.innerHTML=i.map(n=>{const r={\u0645\u0639\u062A\u0645\u062F:"bg-green-100 text-green-800","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"bg-yellow-100 text-yellow-800",\u0645\u0631\u0641\u0648\u0636:"bg-red-100 text-red-800"}[n.approvalStatus]||"bg-gray-100 text-gray-800";return`
                        <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="font-semibold text-gray-800">${Utils.escapeHTML(n.leaveType||"\u2014")}</span>
                                        <span class="px-2 py-1 text-xs rounded ${r}">${Utils.escapeHTML(n.approvalStatus||"\u2014")}</span>
                                    </div>
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                                        <div><i class="fas fa-calendar-alt ml-1"></i>\u0645\u0646: ${Utils.formatDate(n.startDate)}</div>
                                        <div><i class="fas fa-calendar-check ml-1"></i>\u0625\u0644\u0649: ${Utils.formatDate(n.endDate)}</div>
                                        <div><i class="fas fa-calendar-day ml-1"></i>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645: ${n.daysCount||0}</div>
                                    </div>
                                    ${n.reason?`<p class="text-sm text-gray-600 mb-1"><strong>\u0627\u0644\u0633\u0628\u0628:</strong> ${Utils.escapeHTML(n.reason)}</p>`:""}
                                    ${n.notes?`<p class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(n.notes)}</p>`:""}
                                    ${n.approvedBy?`<p class="text-xs text-gray-500 mt-1">\u0645\u0639\u062A\u0645\u062F \u0645\u0646: ${Utils.escapeHTML(n.approvedBy)}</p>`:""}
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="SafetyHealthManagement.editLeave('${n.id}')" class="btn-icon btn-icon-primary">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="SafetyHealthManagement.deleteLeave('${n.id}')" class="btn-icon btn-icon-danger">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `}).join("")}else s.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0625\u062C\u0627\u0632\u0627\u062A</p></div>'}catch(a){const i=a?.message||a?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A:",i,a),s.innerHTML=`<div class="empty-state"><p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623: ${Utils.escapeHTML(i)}</p></div>`}finally{Loading.hide()}},showAttendanceForm(e=null){const s=document.getElementById("attendance-member-select"),t=s?s.value:e?e.memberId:"";if(!t&&!e){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0623\u0648\u0644\u0627\u064B");return}const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631":"\u062A\u0633\u062C\u064A\u0644 \u062D\u0636\u0648\u0631 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="attendance-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                            <input type="date" id="attendance-date" required class="form-input" 
                                value="${e&&e.date?new Date(e.date).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</label>
                                <input type="time" id="attendance-check-in" class="form-input" 
                                    value="${e&&e.checkIn?new Date(e.checkIn).toTimeString().slice(0,5):""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</label>
                                <input type="time" id="attendance-check-out" class="form-input" 
                                    value="${e&&e.checkOut?new Date(e.checkOut).toTimeString().slice(0,5):""}">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                            <select id="attendance-status" required class="form-input">
                                <option value="\u062D\u0627\u0636\u0631" ${e&&e.status==="\u062D\u0627\u0636\u0631"?"selected":""}>\u062D\u0627\u0636\u0631</option>
                                <option value="\u0645\u062A\u0623\u062E\u0631" ${e&&e.status==="\u0645\u062A\u0623\u062E\u0631"?"selected":""}>\u0645\u062A\u0623\u062E\u0631</option>
                                <option value="\u063A\u0627\u0626\u0628" ${e&&e.status==="\u063A\u0627\u0626\u0628"?"selected":""}>\u063A\u0627\u0626\u0628</option>
                                <option value="\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A" ${e&&e.status==="\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A"?"selected":""}>\u0639\u0645\u0644 \u0645\u064A\u062F\u0627\u0646\u064A</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                            <textarea id="attendance-notes" class="form-input" rows="3">${e?Utils.escapeHTML(e.notes||""):""}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-attendance-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(a),a.querySelector("#save-attendance-btn").addEventListener("click",async()=>{const n=a.querySelector("#attendance-form");if(!n.checkValidity()){n.reportValidity();return}const o={memberId:e?e.memberId:t,date:document.getElementById("attendance-date").value,checkIn:document.getElementById("attendance-check-in").value?new Date(document.getElementById("attendance-date").value+"T"+document.getElementById("attendance-check-in").value).toISOString():null,checkOut:document.getElementById("attendance-check-out").value?new Date(document.getElementById("attendance-date").value+"T"+document.getElementById("attendance-check-out").value).toISOString():null,status:document.getElementById("attendance-status").value,notes:document.getElementById("attendance-notes").value.trim()};try{Loading.show();const r=e?await GoogleIntegration.sendRequest({action:"updateSafetyTeamAttendance",data:{attendanceId:e.id,updateData:o}}):await GoogleIntegration.sendRequest({action:"addSafetyTeamAttendance",data:o});r.success?(Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D"),a.remove(),this.loadMemberAttendance()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(r.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(r){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+r.message)}finally{Loading.hide()}}),a.addEventListener("click",n=>{n.target===a&&a.remove()})},showLeaveForm(e=null){const s=document.getElementById("attendance-member-select"),t=s?s.value:e?e.memberId:"";if(!t&&!e){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0623\u0648\u0644\u0627\u064B");return}const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0625\u062C\u0627\u0632\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0625\u062C\u0627\u0632\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="leave-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 *</label>
                            <select id="leave-type" required class="form-input">
                                <option value="\u0633\u0646\u0648\u064A\u0629" ${e&&e.leaveType==="\u0633\u0646\u0648\u064A\u0629"?"selected":""}>\u0633\u0646\u0648\u064A\u0629</option>
                                <option value="\u0645\u0631\u0636\u064A\u0629" ${e&&e.leaveType==="\u0645\u0631\u0636\u064A\u0629"?"selected":""}>\u0645\u0631\u0636\u064A\u0629</option>
                                <option value="\u0637\u0627\u0631\u0626\u0629" ${e&&e.leaveType==="\u0637\u0627\u0631\u0626\u0629"?"selected":""}>\u0637\u0627\u0631\u0626\u0629</option>
                                <option value="\u0623\u062E\u0631\u0649" ${e&&e.leaveType==="\u0623\u062E\u0631\u0649"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 *</label>
                                <input type="date" id="leave-start-date" required class="form-input" 
                                    value="${e&&e.startDate?new Date(e.startDate).toISOString().split("T")[0]:""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629 *</label>
                                <input type="date" id="leave-end-date" required class="form-input" 
                                    value="${e&&e.endDate?new Date(e.endDate).toISOString().split("T")[0]:""}">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0633\u0628\u0628</label>
                            <textarea id="leave-reason" class="form-input" rows="3">${e?Utils.escapeHTML(e.reason||""):""}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</label>
                            <select id="leave-approval-status" class="form-input">
                                <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" ${!e||e.approvalStatus==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                <option value="\u0645\u0639\u062A\u0645\u062F" ${e&&e.approvalStatus==="\u0645\u0639\u062A\u0645\u062F"?"selected":""}>\u0645\u0639\u062A\u0645\u062F</option>
                                <option value="\u0645\u0631\u0641\u0648\u0636" ${e&&e.approvalStatus==="\u0645\u0631\u0641\u0648\u0636"?"selected":""}>\u0645\u0631\u0641\u0648\u0636</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                            <textarea id="leave-notes" class="form-input" rows="2">${e?Utils.escapeHTML(e.notes||""):""}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-leave-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(a);const i=a.querySelector("#leave-start-date"),n=a.querySelector("#leave-end-date"),o=()=>{if(i.value&&n.value){const c=new Date(i.value),d=new Date(n.value),m=Math.abs(d-c),u=Math.ceil(m/(1e3*60*60*24))+1}};i.addEventListener("change",o),n.addEventListener("change",o),a.querySelector("#save-leave-btn").addEventListener("click",async()=>{const c=a.querySelector("#leave-form");if(!c.checkValidity()){c.reportValidity();return}const d=new Date(document.getElementById("leave-start-date").value),m=new Date(document.getElementById("leave-end-date").value),u=Math.abs(m-d),p=Math.ceil(u/(1e3*60*60*24))+1,v={memberId:e?e.memberId:t,leaveType:document.getElementById("leave-type").value,startDate:d.toISOString(),endDate:m.toISOString(),daysCount:p,reason:document.getElementById("leave-reason").value.trim(),approvalStatus:document.getElementById("leave-approval-status").value,notes:document.getElementById("leave-notes").value.trim()};try{Loading.show();const y=e?await GoogleIntegration.sendRequest({action:"updateSafetyTeamLeave",data:{leaveId:e.id,updateData:v}}):await GoogleIntegration.sendRequest({action:"addSafetyTeamLeave",data:v});y.success?(Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0628\u0646\u062C\u0627\u062D"),a.remove(),this.loadMemberLeaves()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(y.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"))}catch(y){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+y.message)}finally{Loading.hide()}}),a.addEventListener("click",c=>{c.target===a&&a.remove()})},async editAttendance(e){try{Loading.show();const s=document.getElementById("attendance-member-select"),t=s?s.value:"";if(!t){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642"),Loading.hide();return}const a=await GoogleIntegration.sendRequest({action:"getSafetyTeamAttendance",data:{memberId:t}});if(a.success&&a.data){const n=(Array.isArray(a.data)?a.data:[]).find(o=>o.id===e);n?this.showAttendanceForm(n):Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631")}}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},async deleteAttendance(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0647\u0630\u0627\u061F"))try{Loading.show();const s=await GoogleIntegration.sendRequest({action:"deleteSafetyTeamAttendance",data:{attendanceId:e}});s.success?(Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D"),this.loadMemberAttendance()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(s.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641"))}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},async editLeave(e){try{Loading.show();const s=document.getElementById("attendance-member-select"),t=s?s.value:"";if(!t){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642"),Loading.hide();return}const a=await GoogleIntegration.sendRequest({action:"getSafetyTeamLeaves",data:{memberId:t}});if(a.success&&a.data){const n=(Array.isArray(a.data)?a.data:[]).find(o=>o.id===e);n?this.showLeaveForm(n):Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629")}}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},renderAnalysisView(){return`
            <div class="card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-chart-bar ml-2"></i>\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0627\u0645\u0644</h2>
                        <div class="flex gap-2">
                            <select id="analysis-member-select" class="form-input" style="min-width: 200px;">
                                <option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>
                            </select>
                            <button id="analyze-data-btn" class="btn-primary" style="padding: 14px 28px; font-size: 15px; font-weight: 600; border-radius: 10px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; border: none; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); transition: all 0.3s ease; position: relative; overflow: hidden;">
                                <i class="fas fa-search ml-2"></i>
                                <span>\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="analysis-container">
                        <div class="empty-state">
                            <i class="fas fa-chart-line text-6xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500 text-lg">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642 \u0644\u0639\u0631\u0636 \u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A\u0647 \u0645\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u062F\u064A\u0648\u0644\u0627\u062A</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadAnalysis(){const e=document.getElementById("analysis-container"),s=document.getElementById("analysis-member-select"),t=document.getElementById("analyze-data-btn");if(!e||!s){Utils.safeError("\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");return}const a=this.getDataAccessMessage("getAllIncidents",{});if(a){s.innerHTML=`<option value="">${a}</option>`,e.innerHTML=`<div class="empty-state"><p class="text-gray-500">${a}</p></div>`;return}let i=this._getMembersFromCache();i&&i.length>0&&(s.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+i.map(n=>`<option value="${n.id}">${Utils.escapeHTML(n.name||"")}</option>`).join(""));try{const n=GoogleIntegration.sendRequest({action:"getSafetyTeamMembers",data:{}});let o;try{o=await this._raceWithTimeout(n)}catch(r){r&&r.timeout&&n.then(c=>{if(c&&c.success&&c.data){const d=Array.isArray(c.data)?c.data:[];this.cache.members=d,this.cache.lastLoad=Date.now();const m=document.getElementById("analysis-member-select");m&&(m.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+d.map(u=>`<option value="${u.id}">${Utils.escapeHTML(u.name||"")}</option>`).join(""))}}).catch(()=>{}),this._attachAnalysisButton(e,s,t);return}o&&o.success&&o.data&&(i=Array.isArray(o.data)?o.data:[],this.cache.members=i,this.cache.lastLoad=Date.now(),s.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</option>'+i.map(r=>`<option value="${r.id}">${Utils.escapeHTML(r.name||"")}</option>`).join("")),this._attachAnalysisButton(e,s,t)}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",n?.message,n),this._attachAnalysisButton(e,s,t)}},_attachAnalysisButton(e,s,t){if(!t)return;const a=this;t.onclick=function(){const i=s?s.value:"";if(!i){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642");return}a.performComprehensiveAnalysis(i)}},async performComprehensiveAnalysis(e){const s=document.getElementById("analysis-container");if(!s){Notification.error("\u0639\u0646\u0635\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}s.innerHTML=`
            <div class="shm-analysis-skeleton space-y-4 p-4">
                <div class="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${Array(6).fill(0).map(()=>'<div class="h-24 bg-gray-100 rounded-xl animate-pulse"></div>').join("")}
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                    <div class="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                </div>
                <p class="text-center text-gray-500 text-sm">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0636\u0648 \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645...</p>
            </div>`;try{const t=String(e),[a,i,n,o,r,c,d,m,u,p]=await Promise.all([GoogleIntegration.sendRequest({action:"getSafetyTeamMember",data:{memberId:e}}),GoogleIntegration.sendRequest({action:"getAllIncidents",data:{filters:{}}}).then(l=>({status:"fulfilled",value:l})).catch(l=>({status:"rejected",reason:l})),GoogleIntegration.sendRequest({action:"getAllNearMisses",data:{filters:{}}}).then(l=>({status:"fulfilled",value:l})).catch(l=>({status:"rejected",reason:l})),GoogleIntegration.sendRequest({action:"getAllPTWs",data:{filters:{}}}).then(l=>({status:"fulfilled",value:l})).catch(l=>({status:"rejected",reason:l})),GoogleIntegration.sendRequest({action:"getAllTrainings",data:{filters:{}}}).then(l=>({status:"fulfilled",value:l})).catch(l=>({status:"rejected",reason:l})),GoogleIntegration.sendRequest({action:"getAllPeriodicInspectionRecords",data:{filters:{}}}).then(l=>({status:"fulfilled",value:l})).catch(l=>({status:"rejected",reason:l})),GoogleIntegration.sendRequest({action:"getSafetyTeamAttendance",data:{memberId:e}}).then(l=>({status:"fulfilled",value:l})).catch(l=>({status:"rejected",reason:l})),GoogleIntegration.sendRequest({action:"getSafetyTeamLeaves",data:{memberId:e}}).then(l=>({status:"fulfilled",value:l})).catch(l=>({status:"rejected",reason:l})),GoogleIntegration.sendRequest({action:"getSafetyTeamKPIs",data:{memberId:e}}).then(l=>({status:"fulfilled",value:l})).catch(l=>({status:"rejected",reason:l})),GoogleIntegration.sendRequest({action:"getAllObservations",data:{filters:{}}}).then(l=>({status:"fulfilled",value:l})).catch(l=>({status:"rejected",reason:l}))]);if(!a.success||!a.data){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642"),s.innerHTML='<div class="empty-state"><p class="text-red-500">\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0639\u0636\u0648 \u0627\u0644\u0641\u0631\u064A\u0642</p></div>';return}const v=a.data;let y=[];try{AppState.appData&&AppState.appData.violations&&(y=AppState.appData.violations)}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",l)}const b=l=>l!=null&&String(l)===t,w=i.status==="fulfilled"&&i.value&&i.value.success?(i.value.data||[]).filter(l=>b(l.reportedBy)||b(l.investigatedBy)||b(l.responsible)||b(l.assignedTo)||l.assignees&&Array.isArray(l.assignees)&&l.assignees.some(h=>b(h))):[],k=n.status==="fulfilled"&&n.value&&n.value.success?(n.value.data||[]).filter(l=>b(l.reportedBy)||b(l.investigatedBy)||b(l.responsible)||b(l.assignedTo)):[],$=o.status==="fulfilled"&&o.value&&o.value.success?(o.value.data||[]).filter(l=>b(l.requestedBy)||b(l.approvedBy)||b(l.supervisedBy)||b(l.responsible)||b(l.assignedTo)||l.permitHolders&&Array.isArray(l.permitHolders)&&l.permitHolders.some(h=>b(h))):[],E=Array.isArray(y)?y.filter(l=>b(l.reportedBy)||b(l.investigatedBy)||b(l.assignedTo)||b(l.reporterId)||b(l.inspectorId)):[],A=r.status==="fulfilled"&&r.value&&r.value.success?(r.value.data||[]).filter(l=>{if(b(l.trainer))return!0;if(l.participants!=null){if(Array.isArray(l.participants)){if(l.participants.some(h=>b(h)||h&&b(h.id)))return!0}else if(typeof l.participants=="string"){try{const h=JSON.parse(l.participants);if(Array.isArray(h)&&h.some(T=>b(T)||T&&b(T.id)))return!0}catch{}if(l.participants.indexOf(t)!==-1)return!0}}return b(l.instructor)||l.instructor&&b(l.instructor.id)||b(l.conductedBy)||b(l.organizedBy)}):[],M=c.status==="fulfilled"&&c.value&&c.value.success?(c.value.data||[]).filter(l=>b(l.inspector)||b(l.responsible)||b(l.assignedTo)):[],H=(p.status==="fulfilled"&&p.value&&p.value.success?p.value.data||[]:[]).filter(l=>b(l.supervisor)||b(l.responsible)||b(l.reportedBy)||l.observerName&&v.name&&String(l.observerName).trim()===String(v.name).trim()),I=d.status==="fulfilled"&&d.value&&d.value.success?d.value.data||[]:[],S=m.status==="fulfilled"&&m.value&&m.value.success?m.value.data||[]:[];let L=u.status==="fulfilled"&&u.value&&u.value.success?u.value.data||[]:[];L.length>1&&(L=[...L].sort((l,h)=>{const T=(h.period||"").localeCompare(l.period||"");return T!==0?T:new Date(h.calculatedAt||0)-new Date(l.calculatedAt||0)}));const f={totalIncidents:w.length,totalNearMisses:k.length,totalPTWs:$.length,totalViolations:E.length,totalTrainings:A.length,totalInspections:M.length,totalObservations:H.length,totalAttendanceDays:I.length,presentDays:I.filter(l=>l&&(l.status==="\u062D\u0627\u0636\u0631"||l.status==="present")).length,absentDays:I.filter(l=>l&&(l.status==="\u063A\u0627\u0626\u0628"||l.status==="absent")).length,totalLeaves:S.length,activeLeaves:S.filter(l=>l&&(l.status==="\u0645\u0648\u0627\u0641\u0642"||l.status==="approved")).length,latestKPI:L.length>0?L[0]:null},B=f.totalAttendanceDays>0?(f.presentDays/f.totalAttendanceDays*100).toFixed(1):"0",g=(l,h=0)=>l!=null&&Number.isFinite(Number(l))?Number(l):h,x=f.latestKPI;s.innerHTML=`
                <div id="shm-analysis-root" class="shm-analysis space-y-6">
                    <style>
                        .shm-analysis .shm-analysis-card { border-radius: 16px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #e5e7eb; transition: box-shadow 0.2s, transform 0.2s; overflow: hidden; }
                        .shm-analysis .shm-analysis-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
                        .shm-analysis .shm-analysis-card .shm-icon-wrap { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
                        .shm-analysis .shm-analysis-card .shm-value { font-size: 1.875rem; font-weight: 800; line-height: 1.2; letter-spacing: -0.02em; }
                        .shm-analysis .shm-analysis-card .shm-label { font-size: 0.8125rem; font-weight: 600; color: #6b7280; margin-bottom: 0.25rem; }
                        .shm-analysis .shm-analysis-card .shm-desc { font-size: 0.75rem; color: #9ca3af; margin-top: 0.25rem; }
                        .shm-analysis .shm-section-card { border-radius: 16px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #e5e7eb; padding: 1.5rem; }
                        .shm-analysis .shm-section-title { font-size: 1rem; font-weight: 700; color: #374151; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
                    </style>
                    <!-- \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0639\u0636\u0648 \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644 -->
                    <div class="shm-section-card bg-gradient-to-r from-slate-50 to-blue-50/50 border-blue-100">
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h3 class="text-xl font-bold text-gray-800 mb-1">${Utils.escapeHTML(v.name||"")}</h3>
                                <p class="text-gray-600 text-sm">${Utils.escapeHTML(v.position||"")} \u2014 ${Utils.escapeHTML(v.department||"")}</p>
                            </div>
                            <div class="text-left">
                                <p class="text-xs font-medium text-gray-500">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644</p>
                                <p class="text-base font-bold text-gray-700">${new Date().toLocaleDateString("ar-SA")}</p>
                            </div>
                        </div>
                    </div>

                    <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629: \u0643\u0644 \u0645\u0627 \u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647 \u0628\u0627\u0633\u0645 \u0627\u0644\u0639\u0636\u0648 \u0639\u0644\u0649 \u0627\u0644\u0646\u0638\u0627\u0645 -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        <div class="shm-analysis-card bg-white p-5 flex items-start gap-4">
                            <div class="shm-icon-wrap bg-emerald-100 text-emerald-600"><i class="fas fa-chalkboard-teacher"></i></div>
                            <div class="min-w-0 flex-1">
                                <p class="shm-label">\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A</p>
                                <p class="shm-value text-emerald-600">${g(f.totalTrainings)}</p>
                                <p class="shm-desc">\u0639\u062F\u062F \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u062A\u064A \u0634\u0627\u0631\u0643 \u0641\u064A\u0647\u0627</p>
                            </div>
                        </div>
                        <div class="shm-analysis-card bg-white p-5 flex items-start gap-4">
                            <div class="shm-icon-wrap bg-indigo-100 text-indigo-600"><i class="fas fa-file-signature"></i></div>
                            <div class="min-w-0 flex-1">
                                <p class="shm-label">\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D (PTW)</p>
                                <p class="shm-value text-indigo-600">${g(f.totalPTWs)}</p>
                                <p class="shm-desc">\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0627\u0633\u0645\u0647</p>
                            </div>
                        </div>
                        <div class="shm-analysis-card bg-white p-5 flex items-start gap-4">
                            <div class="shm-icon-wrap bg-blue-100 text-blue-600"><i class="fas fa-clipboard-check"></i></div>
                            <div class="min-w-0 flex-1">
                                <p class="shm-label">\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629</p>
                                <p class="shm-value text-blue-600">${g(f.totalInspections)}</p>
                                <p class="shm-desc">\u0639\u062F\u062F \u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629</p>
                            </div>
                        </div>
                        <div class="shm-analysis-card bg-white p-5 flex items-start gap-4">
                            <div class="shm-icon-wrap bg-purple-100 text-purple-600"><i class="fas fa-sticky-note"></i></div>
                            <div class="min-w-0 flex-1">
                                <p class="shm-label">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</p>
                                <p class="shm-value text-purple-600">${g(f.totalObservations)}</p>
                                <p class="shm-desc">\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0627\u0633\u0645\u0647</p>
                            </div>
                        </div>
                        <div class="shm-analysis-card bg-white p-5 flex items-start gap-4">
                            <div class="shm-icon-wrap bg-red-100 text-red-600"><i class="fas fa-exclamation-triangle"></i></div>
                            <div class="min-w-0 flex-1">
                                <p class="shm-label">\u0627\u0644\u062D\u0648\u0627\u062F\u062B</p>
                                <p class="shm-value text-red-600">${g(f.totalIncidents)}</p>
                                <p class="shm-desc">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u0633\u062C\u0644\u0629</p>
                            </div>
                        </div>
                        <div class="shm-analysis-card bg-white p-5 flex items-start gap-4">
                            <div class="shm-icon-wrap bg-amber-100 text-amber-600"><i class="fas fa-exclamation-circle"></i></div>
                            <div class="min-w-0 flex-1">
                                <p class="shm-label">Near Miss</p>
                                <p class="shm-value text-amber-600">${g(f.totalNearMisses)}</p>
                                <p class="shm-desc">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629</p>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0623\u062E\u0631\u0649 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="shm-section-card bg-white">
                            <h4 class="shm-section-title"><span class="shm-icon-wrap bg-purple-100 text-purple-600 w-9 h-9"><i class="fas fa-calendar-check"></i></span>\u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</h4>
                            <div class="grid grid-cols-2 gap-3">
                                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span class="text-gray-600 text-sm">\u0623\u064A\u0627\u0645 \u0627\u0644\u062D\u0636\u0648\u0631</span>
                                    <span class="font-bold text-emerald-600">${g(f.presentDays)}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span class="text-gray-600 text-sm">\u0623\u064A\u0627\u0645 \u0627\u0644\u063A\u064A\u0627\u0628</span>
                                    <span class="font-bold text-red-600">${g(f.absentDays)}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span class="text-gray-600 text-sm">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</span>
                                    <span class="font-bold text-blue-600">${B}%</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span class="text-gray-600 text-sm">\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</span>
                                    <span class="font-bold text-purple-600">${g(f.totalLeaves)} <span class="text-gray-400 font-normal text-xs">(${g(f.activeLeaves)} \u0646\u0634\u0637\u0629)</span></span>
                                </div>
                            </div>
                        </div>
                        <div class="shm-section-card bg-white">
                            <h4 class="shm-section-title"><span class="shm-icon-wrap bg-indigo-100 text-indigo-600 w-9 h-9"><i class="fas fa-tasks"></i></span>\u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0623\u062E\u0631\u0649</h4>
                            <div class="grid grid-cols-2 gap-3">
                                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span class="text-gray-600 text-sm">PTW</span>
                                    <span class="font-bold text-indigo-600">${g(f.totalPTWs)}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span class="text-gray-600 text-sm">\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</span>
                                    <span class="font-bold text-amber-600">${g(f.totalViolations)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    ${f.latestKPI?`
                    <!-- \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 (\u0622\u062E\u0631 \u0641\u062A\u0631\u0629) -->
                    <div class="shm-section-card bg-white">
                        <h4 class="shm-section-title"><span class="shm-icon-wrap bg-blue-100 text-blue-600 w-9 h-9"><i class="fas fa-chart-line"></i></span>\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 (\u0622\u062E\u0631 \u0641\u062A\u0631\u0629)</h4>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p class="shm-label">\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629</p>
                                <p class="shm-value text-blue-600">${g(x&&x.inspectionsCount)}</p>
                                <p class="shm-desc">\u0627\u0644\u0647\u062F\u0641: ${g(x&&x.targetInspections,20)}</p>
                            </div>
                            <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p class="shm-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629</p>
                                <p class="shm-value text-emerald-600">${g(x&&x.closedActionsCount)}</p>
                            </div>
                            <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p class="shm-label">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</p>
                                <p class="shm-value text-purple-600">${g(x&&x.observationsCount)}</p>
                                <p class="shm-desc">\u0627\u0644\u0647\u062F\u0641: ${g(x&&x.targetObservations,15)}</p>
                            </div>
                            <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p class="shm-label">\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A</p>
                                <p class="shm-value text-amber-600">${g(x&&x.trainingsCount)}</p>
                                <p class="shm-desc">\u0627\u0644\u0647\u062F\u0641: ${g(x&&x.targetTrainings,2)}</p>
                            </div>
                        </div>
                    </div>
                    `:""}

                    <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A -->
                    <div class="shm-section-card bg-white">
                        <h4 class="shm-section-title"><span class="shm-icon-wrap bg-gray-100 text-gray-600 w-9 h-9"><i class="fas fa-list"></i></span>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 class="font-semibold text-gray-700 mb-2 text-sm">\u0627\u0644\u062D\u0648\u0627\u062F\u062B (${g(f.totalIncidents)})</h5>
                                <div class="space-y-1 max-h-40 overflow-y-auto rounded-lg border border-gray-100 bg-gray-50/50 p-2">
                                    ${w.slice(0,5).map(l=>`
                                        <div class="text-sm text-gray-600 p-2 rounded bg-white border border-gray-100">
                                            ${Utils.escapeHTML((l.title||l.description||"").slice(0,60))}${(l.title||l.description||"").length>60?"...":""} \u2014 ${l.date?new Date(l.date).toLocaleDateString("ar-SA"):""}
                                        </div>
                                    `).join("")}
                                    ${w.length>5?`<p class="text-xs text-gray-400 mt-2 px-2">\u0648 ${w.length-5} \u0623\u0643\u062B\u0631...</p>`:""}
                                </div>
                            </div>
                            <div>
                                <h5 class="font-semibold text-gray-700 mb-2 text-sm">\u0627\u0644\u062A\u0641\u062A\u064A\u0634\u0627\u062A (${g(f.totalInspections)})</h5>
                                <div class="space-y-1 max-h-40 overflow-y-auto rounded-lg border border-gray-100 bg-gray-50/50 p-2">
                                    ${M.slice(0,5).map(l=>`
                                        <div class="text-sm text-gray-600 p-2 rounded bg-white border border-gray-100">
                                            ${Utils.escapeHTML((l.categoryName||l.inspectionType||"").slice(0,50))} \u2014 ${l.inspectionDate?new Date(l.inspectionDate).toLocaleDateString("ar-SA"):""}
                                        </div>
                                    `).join("")}
                                    ${M.length>5?`<p class="text-xs text-gray-400 mt-2 px-2">\u0648 ${M.length-5} \u0623\u0643\u062B\u0631...</p>`:""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `}catch(t){const a=t?.message||t?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",a,t),s.innerHTML=`<div class="empty-state"><p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: ${Utils.escapeHTML(a)}</p></div>`,Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}finally{Loading.hide()}},async deleteLeave(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0625\u062C\u0627\u0632\u0629\u061F"))try{Loading.show();const s=await GoogleIntegration.sendRequest({action:"deleteSafetyTeamLeave",data:{leaveId:e}});s.success?(Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0628\u0646\u062C\u0627\u062D"),this.loadMemberLeaves()):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(s.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641"))}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}finally{Loading.hide()}},formatTime(e){if(!e)return"\u2014";try{const s=new Date(e);if(isNaN(s.getTime()))return"\u2014";const t=String(s.getHours()).padStart(2,"0"),a=String(s.getMinutes()).padStart(2,"0");return`${t}:${a}`}catch{return"\u2014"}}};(function(){"use strict";try{typeof window<"u"&&typeof SafetyHealthManagement<"u"&&(window.SafetyHealthManagement=SafetyHealthManagement,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 SafetyHealthManagement module loaded and available on window.SafetyHealthManagement"))}catch{if(typeof window<"u"&&typeof SafetyHealthManagement<"u")try{window.SafetyHealthManagement=SafetyHealthManagement}catch{}}})();
