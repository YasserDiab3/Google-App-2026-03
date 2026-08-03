const IssueTracking={state:{currentView:"list",filters:{status:"all",priority:"all",module:"all",category:"all",search:""},currentIssue:null},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("issue-tracking-section");if(!e){Utils.safeError("\u0642\u0633\u0645 issue-tracking-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-bug ml-3"></i>
                            \u0646\u0638\u0627\u0645 \u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0648\u062D\u0644\u0648\u0644\u0647\u0627
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
        `;try{(!AppState||!AppState.appData)&&(AppState=AppState||{},AppState.appData=AppState.appData||{}),AppState.appData.issueTracking||(AppState.appData.issueTracking=[]),e.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-bug ml-3"></i>
                                \u0646\u0638\u0627\u0645 \u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0648\u062D\u0644\u0648\u0644\u0647\u0627
                            </h1>
                            <p class="section-subtitle">\u062A\u062A\u0628\u0639 \u0648\u062D\u0644 \u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629 \u0648\u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="IssueTracking.showStatistics()" class="btn-secondary">
                                <i class="fas fa-chart-bar ml-2"></i>
                                \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A
                            </button>
                            <button onclick="IssueTracking.showCreateForm()" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0643\u0644\u0629 \u062C\u062F\u064A\u062F\u0629
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-6">
                    ${this.renderFilters()}
                    ${this.renderIssuesList()}
                </div>
            `,await this.loadIssues(),this.setupEventListeners()}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0648\u062F\u064A\u0648\u0644 \u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0634\u0627\u0643\u0644:",t),e.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-bug ml-3"></i>
                            \u0646\u0638\u0627\u0645 \u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0648\u062D\u0644\u0648\u0644\u0647\u0627
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="IssueTracking.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}},setupEventListeners(){},renderFilters(){return`
            <div class="content-card mb-4">
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">\u0627\u0644\u0628\u062D\u062B</label>
                            <input 
                                type="text" 
                                id="issue-search" 
                                placeholder="\u0627\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0634\u0627\u0643\u0644..."
                                class="form-input"
                                oninput="IssueTracking.handleSearch(this.value)"
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="issue-status-filter" class="form-select" onchange="IssueTracking.applyFilters()">
                                <option value="all">\u0627\u0644\u0643\u0644</option>
                                <option value="New">\u062C\u062F\u064A\u062F\u0629</option>
                                <option value="In Progress">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                <option value="Resolved">\u062A\u0645 \u0627\u0644\u062D\u0644</option>
                                <option value="Closed">\u0645\u063A\u0644\u0642\u0629</option>
                                <option value="Reopened">\u0645\u0641\u062A\u0648\u062D\u0629 \u0645\u062C\u062F\u062F\u0627\u064B</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                            <select id="issue-priority-filter" class="form-select" onchange="IssueTracking.applyFilters()">
                                <option value="all">\u0627\u0644\u0643\u0644</option>
                                <option value="Low">\u0645\u0646\u062E\u0641\u0636\u0629</option>
                                <option value="Medium">\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                <option value="High">\u0639\u0627\u0644\u064A\u0629</option>
                                <option value="Critical">\u062D\u0631\u062C\u0629</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</label>
                            <select id="issue-module-filter" class="form-select" onchange="IssueTracking.applyFilters()">
                                <option value="all">\u0627\u0644\u0643\u0644</option>
                                ${this.getModuleOptions()}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">\u0627\u0644\u0641\u0626\u0629</label>
                            <select id="issue-category-filter" class="form-select" onchange="IssueTracking.applyFilters()">
                                <option value="all">\u0627\u0644\u0643\u0644</option>
                                <option value="Bug">\u062E\u0637\u0623 \u0628\u0631\u0645\u062C\u064A</option>
                                <option value="Feature Request">\u0637\u0644\u0628 \u0645\u064A\u0632\u0629</option>
                                <option value="Performance">\u0623\u062F\u0627\u0621</option>
                                <option value="UI/UX">\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</option>
                                <option value="Integration">\u062A\u0643\u0627\u0645\u0644</option>
                                <option value="Other">\u0623\u062E\u0631\u0649</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `},renderIssuesList(){return`
            <div class="content-card">
                <div class="card-body">
                    <div id="issues-list-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0634\u0627\u0643\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadIssues(){try{const e=this.buildFilters();if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){this.showEmptyState("\u064A\u062C\u0628 \u062A\u0641\u0639\u064A\u0644 Google Integration \u0623\u0648\u0644\u0627\u064B");return}const t=await GoogleIntegration.sendRequest({action:"getAllIssues",data:{filters:e}});t.success?this.renderIssues(t.data):(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0634\u0627\u0643\u0644:",t.message),this.showEmptyState("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0634\u0627\u0643\u0644"))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0634\u0627\u0643\u0644:",e),this.showEmptyState("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0634\u0627\u0643\u0644")}},buildFilters(){const e={},t=document.getElementById("issue-status-filter")?.value;t&&t!=="all"&&(e.status=t);const s=document.getElementById("issue-priority-filter")?.value;s&&s!=="all"&&(e.priority=s);const a=document.getElementById("issue-module-filter")?.value;a&&a!=="all"&&(e.module=a);const i=document.getElementById("issue-category-filter")?.value;i&&i!=="all"&&(e.category=i);const l=document.getElementById("issue-search")?.value;return l&&(e.search=l),e},renderIssues(e){const t=document.getElementById("issues-list-container");if(t){if(!e||e.length===0){t.innerHTML=this.showEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0634\u0627\u0643\u0644");return}t.innerHTML=`
            <div class="space-y-4">
                ${e.map(s=>this.renderIssueCard(s)).join("")}
            </div>
        `}},renderIssueCard(e){const t={Low:"bg-green-100 text-green-800",Medium:"bg-yellow-100 text-yellow-800",High:"bg-orange-100 text-orange-800",Critical:"bg-red-100 text-red-800"},s={New:"bg-blue-100 text-blue-800","In Progress":"bg-purple-100 text-purple-800",Resolved:"bg-green-100 text-green-800",Closed:"bg-gray-100 text-gray-800",Reopened:"bg-red-100 text-red-800"},a=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.id):e.id,i=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.title||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646"):e.title||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646",l=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML((e.description||"").substring(0,150)):(e.description||"").substring(0,150),o=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.reportedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):e.reportedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.module||""):e.module||"";return`
            <div class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" 
                 onclick="IssueTracking.showIssueDetail('${a}')">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <h3 class="font-semibold text-lg">${i}</h3>
                            <span class="px-2 py-1 rounded text-xs font-medium ${t[e.priority]||"bg-gray-100"}">
                                ${this.getPriorityLabel(e.priority)}
                            </span>
                            <span class="px-2 py-1 rounded text-xs font-medium ${s[e.status]||"bg-gray-100"}">
                                ${this.getStatusLabel(e.status)}
                            </span>
                        </div>
                        <p class="text-gray-600 mb-2">${l}${(e.description||"").length>150?"...":""}</p>
                        <div class="flex items-center gap-4 text-sm text-gray-500">
                            <span><i class="fas fa-user ml-1"></i> ${o}</span>
                            <span><i class="fas fa-calendar ml-1"></i> ${this.formatDate(e.createdAt)}</span>
                            ${n?`<span><i class="fas fa-cube ml-1"></i> ${n}</span>`:""}
                        </div>
                    </div>
                    <div class="ml-4">
                        <button onclick="event.stopPropagation(); IssueTracking.showIssueDetail('${a}')" 
                                class="btn-secondary btn-sm">
                            <i class="fas fa-eye ml-1"></i>
                            \u0639\u0631\u0636
                        </button>
                    </div>
                </div>
            </div>
        `},async showCreateForm(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0643\u0644\u0629 \u062C\u062F\u064A\u062F\u0629</h2>
                    <button onclick="this.closest('.modal-overlay').remove()" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="issue-form" onsubmit="IssueTracking.handleSubmit(event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="md:col-span-2">
                                <label class="form-label">\u0627\u0644\u0639\u0646\u0648\u0627\u0646 *</label>
                                <input type="text" name="title" class="form-input" required>
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">\u0627\u0644\u0648\u0635\u0641 *</label>
                                <textarea name="description" class="form-textarea" rows="4" required></textarea>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</label>
                                <select name="module" class="form-select">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</option>
                                    ${this.getModuleOptions()}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0641\u0626\u0629</label>
                                <select name="category" class="form-select">
                                    <option value="Bug">\u062E\u0637\u0623 \u0628\u0631\u0645\u062C\u064A</option>
                                    <option value="Feature Request">\u0637\u0644\u0628 \u0645\u064A\u0632\u0629</option>
                                    <option value="Performance">\u0623\u062F\u0627\u0621</option>
                                    <option value="UI/UX">\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</option>
                                    <option value="Integration">\u062A\u0643\u0627\u0645\u0644</option>
                                    <option value="Other">\u0623\u062E\u0631\u0649</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629 *</label>
                                <select name="priority" class="form-select" required>
                                    <option value="Low">\u0645\u0646\u062E\u0641\u0636\u0629</option>
                                    <option value="Medium" selected>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                    <option value="High">\u0639\u0627\u0644\u064A\u0629</option>
                                    <option value="Critical">\u062D\u0631\u062C\u0629</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</label>
                                <input type="date" name="dueDate" class="form-input">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0633\u0624\u0648\u0644</label>
                                <input type="text" name="assignedTo" class="form-input" 
                                       placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644">
                            </div>
                            <div>
                                <label class="form-label">\u062E\u0637\u0648\u0627\u062A \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C</label>
                                <textarea name="reproductionSteps" class="form-textarea" rows="3" 
                                          placeholder="1. ...&#10;2. ...&#10;3. ..."></textarea>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0628\u064A\u0626\u0629</label>
                                <input type="text" name="environment" class="form-input" 
                                       placeholder="\u0645\u062B\u0627\u0644: Chrome 120, Windows 10">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" onclick="this.closest('.modal-overlay').remove()" 
                                    class="btn-secondary">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                \u062D\u0641\u0638
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(e)},async handleSubmit(e){e.preventDefault();const t=e.target,s=new FormData(t),a={title:s.get("title"),description:s.get("description"),module:s.get("module")||"",category:s.get("category")||"Bug",priority:s.get("priority"),dueDate:s.get("dueDate")||"",assignedTo:s.get("assignedTo")||"",reproductionSteps:s.get("reproductionSteps")||"",environment:s.get("environment")||"",reportedBy:AppState.currentUser?.name||AppState.currentUser?.email||"Unknown",createdBy:AppState.currentUser?.email||"Unknown"},i=t.querySelector('button[type="submit"]'),l=i.innerHTML;i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...';try{const o=await GoogleIntegration.sendRequest({action:"addIssue",data:a});o.success?(Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0628\u0646\u062C\u0627\u062D"),t.closest(".modal-overlay").remove(),await this.loadIssues()):(Notification.error("\u0641\u0634\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0634\u0643\u0644\u0629: "+o.message),i.disabled=!1,i.innerHTML=l)}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0634\u0643\u0644\u0629:",o),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0634\u0643\u0644\u0629"),i.disabled=!1,i.innerHTML=l}},async showIssueDetail(e){try{const t=await GoogleIntegration.sendRequest({action:"getIssue",data:{issueId:e}});t.success?this.renderIssueDetail(t.data):Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0629: "+t.message)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0629:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0629")}},renderIssueDetail(e){const t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.id):e.id,s=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.title||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646"):e.title||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646",a=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.description||"\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641"):e.description||"\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641",i=e.reproductionSteps?typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.reproductionSteps):e.reproductionSteps:"",l=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.module||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):e.module||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",o=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.category||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):e.category||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.reportedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):e.reportedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",d=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(e.assignedTo||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):e.assignedTo||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width: 1000px;">
                <div class="modal-header">
                    <h2 class="modal-title">${s}</h2>
                    <button onclick="this.closest('.modal-overlay').remove()" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="md:col-span-2 space-y-4">
                            <div>
                                <h3 class="font-semibold mb-2">\u0627\u0644\u0648\u0635\u0641</h3>
                                <p class="text-gray-700">${a}</p>
                            </div>
                            ${i?`
                                <div>
                                    <h3 class="font-semibold mb-2">\u062E\u0637\u0648\u0627\u062A \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C</h3>
                                    <pre class="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">${i}</pre>
                                </div>
                            `:""}
                            ${this.renderSolutions(e.solutions)}
                            ${this.renderComments(e.comments)}
                        </div>
                        <div class="space-y-4">
                            <div class="bg-gray-50 p-4 rounded">
                                <h3 class="font-semibold mb-3">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0634\u0643\u0644\u0629</h3>
                                <div class="space-y-2 text-sm">
                                    <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> ${this.getStatusLabel(e.status)}</div>
                                    <div><strong>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:</strong> ${this.getPriorityLabel(e.priority)}</div>
                                    <div><strong>\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644:</strong> ${l}</div>
                                    <div><strong>\u0627\u0644\u0641\u0626\u0629:</strong> ${o}</div>
                                    <div><strong>\u062A\u0645 \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0628\u0648\u0627\u0633\u0637\u0629:</strong> ${n}</div>
                                    <div><strong>\u0627\u0644\u0645\u0633\u0624\u0648\u0644:</strong> ${d}</div>
                                    <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621:</strong> ${this.formatDate(e.createdAt)}</div>
                                    ${e.dueDate?`<div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642:</strong> ${this.formatDate(e.dueDate)}</div>`:""}
                                </div>
                            </div>
                            <div class="bg-gray-50 p-4 rounded">
                                <h3 class="font-semibold mb-3">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</h3>
                                <div class="space-y-2">
                                    <button onclick="IssueTracking.addSolution('${t}')" class="btn-primary btn-sm w-full">
                                        <i class="fas fa-wrench ml-1"></i> \u0625\u0636\u0627\u0641\u0629 \u062D\u0644
                                    </button>
                                    <button onclick="IssueTracking.updateStatus('${t}')" class="btn-secondary btn-sm w-full">
                                        <i class="fas fa-edit ml-1"></i> \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-2">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("issue-tracking"):""}
                </div>
            </div>
        `,document.body.appendChild(r),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(r,{moduleKey:"issue-tracking",record:e,recordId:e.id||""})},renderSolutions(e){if(!e||e.length===0)return`
                <div>
                    <h3 class="font-semibold mb-2">\u0627\u0644\u062D\u0644\u0648\u0644</h3>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0644\u0648\u0644 \u0645\u0636\u0627\u0641\u0629 \u0628\u0639\u062F</p>
                </div>
            `;let t=[];try{Array.isArray(e)?t=e:typeof e=="string"&&e.trim()&&(t=JSON.parse(e))}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0644\u0648\u0644:",s),t=[]}return`
            <div>
                <h3 class="font-semibold mb-2">\u0627\u0644\u062D\u0644\u0648\u0644 (${t.length})</h3>
                <div class="space-y-3">
                    ${t.map((s,a)=>{const i=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(s.solution||""):s.solution||"",l=s.notes?typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(s.notes):s.notes:"",o=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(s.implementedBy||""):s.implementedBy||"";return`
                        <div class="border rounded p-3">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm text-gray-500">\u0627\u0644\u062D\u0644 #${a+1}</span>
                                <span class="text-xs px-2 py-1 rounded ${this.getEffectivenessColor(s.effectiveness)}">
                                    ${this.getEffectivenessLabel(s.effectiveness)}
                                </span>
                            </div>
                            <p class="text-gray-700">${i}</p>
                            ${l?`<p class="text-sm text-gray-500 mt-2">${l}</p>`:""}
                            <div class="text-xs text-gray-400 mt-2">
                                \u0628\u0648\u0627\u0633\u0637\u0629: ${o} - ${this.formatDate(s.implementedAt)}
                            </div>
                        </div>
                    `}).join("")}
                </div>
            </div>
        `},renderComments(e){if(!e||e.length===0)return`
                <div>
                    <h3 class="font-semibold mb-2">\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A</h3>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642\u0627\u062A</p>
                </div>
            `;let t=[];try{Array.isArray(e)?t=e:typeof e=="string"&&e.trim()&&(t=JSON.parse(e))}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A:",s),t=[]}return`
            <div>
                <h3 class="font-semibold mb-2">\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A (${t.length})</h3>
                <div class="space-y-2">
                    ${t.map(s=>{const a=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(s.comment||""):s.comment||"",i=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(s.user||""):s.user||"";return`
                        <div class="border-l-4 border-blue-500 pl-3 py-2">
                            <p class="text-gray-700">${a}</p>
                            <div class="text-xs text-gray-400 mt-1">
                                ${i} - ${this.formatDate(s.timestamp)}
                            </div>
                        </div>
                    `}).join("")}
                </div>
            </div>
        `},async showStatistics(){try{const e=await GoogleIntegration.sendRequest({action:"getIssueStatistics",data:{filters:this.buildFilters()}});e.success?this.renderStatistics(e.data):Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A")}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A:",e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A")}},renderStatistics(e){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0643\u0644</h2>
                    <button onclick="this.closest('.modal-overlay').remove()" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div class="bg-blue-50 p-4 rounded text-center">
                            <div class="text-3xl font-bold text-blue-600">${e.total||0}</div>
                            <div class="text-sm text-gray-600">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u0627\u0643\u0644</div>
                        </div>
                        <div class="bg-red-50 p-4 rounded text-center">
                            <div class="text-3xl font-bold text-red-600">${e.overdue||0}</div>
                            <div class="text-sm text-gray-600">\u0645\u062A\u0623\u062E\u0631\u0629</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded text-center">
                            <div class="text-3xl font-bold text-green-600">${e.byStatus?.Resolved||0}</div>
                            <div class="text-sm text-gray-600">\u062A\u0645 \u062D\u0644\u0647\u0627</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded text-center">
                            <div class="text-3xl font-bold text-purple-600">${e.byStatus?.["In Progress"]||0}</div>
                            <div class="text-sm text-gray-600">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-semibold mb-3">\u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</h3>
                            ${this.renderStatusChart(e.byStatus)}
                        </div>
                        <div>
                            <h3 class="font-semibold mb-3">\u062D\u0633\u0628 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</h3>
                            ${this.renderPriorityChart(e.byPriority)}
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(t)},renderStatusChart(e){if(!e)return'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>';const t=Object.values(e).reduce((s,a)=>s+a,0);return t===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>':Object.entries(e).map(([s,a])=>{const i=t>0?(a/t*100).toFixed(1):0;return`
                <div class="mb-2">
                    <div class="flex justify-between text-sm mb-1">
                        <span>${this.getStatusLabel(s)}</span>
                        <span>${a} (${i}%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${i}%"></div>
                    </div>
                </div>
            `}).join("")},renderPriorityChart(e){if(!e)return'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>';const t=Object.values(e).reduce((s,a)=>s+a,0);return t===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>':Object.entries(e).map(([s,a])=>{const i=t>0?(a/t*100).toFixed(1):0;return`
                <div class="mb-2">
                    <div class="flex justify-between text-sm mb-1">
                        <span>${this.getPriorityLabel(s)}</span>
                        <span>${a} (${i}%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-600 h-2 rounded-full" style="width: ${i}%"></div>
                    </div>
                </div>
            `}).join("")},getModuleOptions(){return["FireEquipment","Incidents","Training","Clinic","Users","PTW","Contractors","Other"].map(t=>`<option value="${t}">${t}</option>`).join("")},getStatusLabel(e){return{New:"\u062C\u062F\u064A\u062F\u0629","In Progress":"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630",Resolved:"\u062A\u0645 \u0627\u0644\u062D\u0644",Closed:"\u0645\u063A\u0644\u0642\u0629",Reopened:"\u0645\u0641\u062A\u0648\u062D\u0629 \u0645\u062C\u062F\u062F\u0627\u064B"}[e]||e},getPriorityLabel(e){return{Low:"\u0645\u0646\u062E\u0641\u0636\u0629",Medium:"\u0645\u062A\u0648\u0633\u0637\u0629",High:"\u0639\u0627\u0644\u064A\u0629",Critical:"\u062D\u0631\u062C\u0629"}[e]||e},getEffectivenessLabel(e){return{Effective:"\u0641\u0639\u0627\u0644","Partially Effective":"\u0641\u0639\u0627\u0644 \u062C\u0632\u0626\u064A\u0627\u064B","Not Effective":"\u063A\u064A\u0631 \u0641\u0639\u0627\u0644",Unknown:"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}[e]||e},getEffectivenessColor(e){return{Effective:"bg-green-100 text-green-800","Partially Effective":"bg-yellow-100 text-yellow-800","Not Effective":"bg-red-100 text-red-800",Unknown:"bg-gray-100 text-gray-800"}[e]||"bg-gray-100"},formatDate(e){if(!e)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";try{return new Date(e).toLocaleDateString("ar-SA")}catch{return e}},handleSearch(e){this.state.filters.search=e,setTimeout(()=>this.loadIssues(),500)},applyFilters(){this.loadIssues()},showEmptyState(e){return`
            <div class="empty-state">
                <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">${e}</p>
            </div>
        `},addSolution(e){Notification.info("\u0645\u064A\u0632\u0629 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0644 \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631")},updateStatus(e){Notification.info("\u0645\u064A\u0632\u0629 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0637\u0648\u064A\u0631")}};(function(){"use strict";try{typeof window<"u"&&typeof IssueTracking<"u"&&(window.IssueTracking=IssueTracking,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 IssueTracking module loaded and available on window.IssueTracking"))}catch{if(typeof window<"u"&&typeof IssueTracking<"u")try{window.IssueTracking=IssueTracking}catch{}}})();
