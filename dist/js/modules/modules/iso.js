const ISO={currentTab:"overview",async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("iso-section");if(e)try{e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-shield-alt ml-3"></i>
                            \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629
                        </h1>
                        <p class="section-subtitle">HSE Management System - \u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 ISO 45001 & ISO 14001</p>
                    </div>
                    <button id="export-compliance-report-btn" class="btn-success">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 PDF
                    </button>
                </div>
            </div>
            
            <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">${(AppState.appData.isoDocuments||[]).length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0627\u0644\u0648\u062B\u0627\u0626\u0642</div>
                </div>
                <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">${(AppState.appData.isoProcedures||[]).length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</div>
                </div>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-yellow-600 mb-2">${(AppState.appData.isoForms||[]).length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0627\u0644\u0646\u0645\u0627\u0630\u062C</div>
                </div>
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">${this.calculateComplianceRate()}%</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</div>
                </div>
            </div>
            
            <div class="mt-6">
                <div class="flex gap-2 mb-6 border-b">
                    <button class="tab-btn ${this.currentTab==="overview"?"active":""}" data-tab="overview">
                        <i class="fas fa-chart-pie ml-2"></i>\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629
                    </button>
                    <button class="tab-btn ${this.currentTab==="documents"?"active":""}" data-tab="documents">
                        <i class="fas fa-file-alt ml-2"></i>\u0627\u0644\u0648\u062B\u0627\u0626\u0642
                    </button>
                    <button class="tab-btn ${this.currentTab==="procedures"?"active":""}" data-tab="procedures">
                        <i class="fas fa-tasks ml-2"></i>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A
                    </button>
                    <button class="tab-btn ${this.currentTab==="forms"?"active":""}" data-tab="forms">
                        <i class="fas fa-file-signature ml-2"></i>\u0627\u0644\u0646\u0645\u0627\u0630\u062C
                    </button>
                    <button class="tab-btn ${this.currentTab==="iso45001"?"active":""}" data-tab="iso45001">
                        <i class="fas fa-hard-hat ml-2"></i>ISO 45001
                    </button>
                    <button class="tab-btn ${this.currentTab==="iso14001"?"active":""}" data-tab="iso14001">
                        <i class="fas fa-leaf ml-2"></i>ISO 14001
                    </button>
                    <button class="tab-btn ${this.currentTab==="audit"?"active":""}" data-tab="audit">
                        <i class="fas fa-clipboard-check ml-2"></i>\u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629
                    </button>
                    <button class="tab-btn ${this.currentTab==="coding-center"?"active":""}" data-tab="coding-center">
                        <i class="fas fa-code ml-2"></i>\u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631
                    </button>
                </div>
                <div id="iso-content">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,this.setupEventListeners(),setTimeout(async()=>{try{const t=document.getElementById("iso-content");if(!t)return;if(this.currentTab==="coding-center"){t.innerHTML=await this.renderCodingCenter({skipFetch:!0}),this.renderCodingCenter({silentTimeout:!0}).then(a=>{const i=document.getElementById("iso-content");i&&this.currentTab==="coding-center"&&(i.innerHTML=a)}).catch(()=>{});return}const s=await this.renderContent().catch(a=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649:",a),`
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                        <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                        <button onclick="ISO.load()" class="btn-primary">
                                            <i class="fas fa-redo ml-2"></i>
                                            \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `));t.innerHTML=s}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649:",t)}},0)}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 ISO:",t),e&&(e.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="ISO.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `)}},calculateComplianceRate(){const e=AppState.appData.isoDocuments||[],t=AppState.appData.isoProcedures||[],s=AppState.appData.isoForms||[],a=e.length+t.length+s.length,i=e.length>0?30:0,o=t.length>0?30:0,d=s.length>0?40:0;return Math.min(100,i+o+d)},async renderContent(){switch(this.currentTab){case"overview":return await this.renderOverview();case"documents":return await this.renderDocuments();case"procedures":return await this.renderProcedures();case"forms":return await this.renderForms();case"iso45001":return await this.renderISO45001();case"iso14001":return await this.renderISO14001();case"audit":return await this.renderAudit();case"coding-center":return await this.renderCodingCenter();default:return await this.renderOverview()}},async renderOverview(){const e=AppState.appData.isoDocuments||[],t=AppState.appData.isoProcedures||[],s=AppState.appData.isoForms||[],a=AppState.appData.hseAudits||[],i=AppState.appData.hseNonConformities||[],o=AppState.appData.hseCorrectiveActions||[];return`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-info-circle ml-2"></i>\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u0646\u0638\u0627\u0645</h2>
                    </div>
                    <div class="card-body">
                        <div class="space-y-4">
                            <div class="bg-blue-50 border border-blue-200 rounded p-4">
                                <h3 class="font-semibold text-blue-800 mb-3">
                                    <i class="fas fa-hard-hat ml-2"></i>
                                    ISO 45001 - \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629
                                </h3>
                                <ul class="list-disc list-inside text-sm text-gray-700 space-y-2">
                                    <li>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0627\u0644\u0631\u0635</li>
                                    <li>\u0627\u0644\u062A\u062E\u0637\u064A\u0637 \u0648\u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A</li>
                                    <li>\u0627\u0644\u0642\u064A\u0627\u0633 \u0648\u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629</li>
                                    <li>\u0627\u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0645\u0631</li>
                                </ul>
                            </div>
                            <div class="bg-green-50 border border-green-200 rounded p-4">
                                <h3 class="font-semibold text-green-800 mb-3">
                                    <i class="fas fa-leaf ml-2"></i>
                                    ISO 14001 - \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0628\u064A\u0626\u0629
                                </h3>
                                <ul class="list-disc list-inside text-sm text-gray-700 space-y-2">
                                    <li>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062C\u0648\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A\u0629</li>
                                    <li>\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0644\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0628\u064A\u0626\u064A\u0629</li>
                                    <li>\u0627\u0644\u062A\u062E\u0637\u064A\u0637 \u0627\u0644\u0628\u064A\u0626\u064A</li>
                                    <li>\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0628\u064A\u0626\u064A</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-chart-bar ml-2"></i>\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645</h2>
                    </div>
                    <div class="card-body">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-3 border rounded">
                                <span class="font-semibold">\u0627\u0644\u0648\u062B\u0627\u0626\u0642</span>
                                <span class="badge badge-info">${e.length}</span>
                            </div>
                            <div class="flex items-center justify-between p-3 border rounded">
                                <span class="font-semibold">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</span>
                                <span class="badge badge-success">${t.length}</span>
                            </div>
                            <div class="flex items-center justify-between p-3 border rounded">
                                <span class="font-semibold">\u0627\u0644\u0646\u0645\u0627\u0630\u062C</span>
                                <span class="badge badge-warning">${s.length}</span>
                            </div>
                            <div class="flex items-center justify-between p-3 border rounded">
                                <span class="font-semibold">\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062A\u062F\u0642\u064A\u0642</span>
                                <span class="badge badge-primary">${a.length}</span>
                            </div>
                            <div class="flex items-center justify-between p-3 border rounded">
                                <span class="font-semibold">\u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</span>
                                <span class="badge badge-danger">${i.length}</span>
                            </div>
                            <div class="flex items-center justify-between p-3 border rounded">
                                <span class="font-semibold">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629</span>
                                <span class="badge badge-info">${o.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderDocuments(){const e=AppState.appData.isoDocuments||[];return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-file-alt ml-2"></i>\u0627\u0644\u0648\u062B\u0627\u0626\u0642</h2>
                        <button id="add-document-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0648\u062B\u064A\u0642\u0629
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    ${e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0648\u062B\u0627\u0626\u0642</p></div>':`
                        <table class="data-table table-header-purple">
                            <thead>
                                <tr>
                                    <th>\u0643\u0648\u062F ISO</th>
                                    <th>\u0627\u0633\u0645 \u0627\u0644\u0648\u062B\u064A\u0642\u0629</th>
                                    <th>\u0627\u0644\u0646\u0648\u0639</th>
                                    <th>\u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${e.map(t=>`
                                    <tr>
                                        <td>${Utils.escapeHTML(t.isoCode||"")}</td>
                                        <td>${Utils.escapeHTML(t.name||"")}</td>
                                        <td>${Utils.escapeHTML(t.type||"")}</td>
                                        <td>${t.version||"-"}</td>
                                        <td>
                                            <button onclick="ISO.viewDocument('${t.id}')" class="btn-icon btn-icon-primary">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    `}
                </div>
            </div>
        `},async renderProcedures(){const e=AppState.appData.isoProcedures||[];return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-tasks ml-2"></i>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</h2>
                        <button id="add-procedure-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    ${e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621\u0627\u062A</p></div>':`
                        <table class="data-table table-header-purple">
                            <thead>
                                <tr>
                                    <th>\u0643\u0648\u062F ISO</th>
                                    <th>\u0627\u0633\u0645 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</th>
                                    <th>\u0627\u0644\u0642\u0633\u0645</th>
                                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${e.map(t=>`
                                    <tr>
                                        <td>${Utils.escapeHTML(t.isoCode||"")}</td>
                                        <td>${Utils.escapeHTML(t.name||"")}</td>
                                        <td>${Utils.escapeHTML(t.department||"")}</td>
                                        <td>
                                            <button onclick="ISO.viewProcedure('${t.id}')" class="btn-icon btn-icon-primary">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    `}
                </div>
            </div>
        `},async renderForms(){const e=AppState.appData.isoForms||[];return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-file-signature ml-2"></i>\u0627\u0644\u0646\u0645\u0627\u0630\u062C</h2>
                        <button id="add-form-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0646\u0645\u0648\u0630\u062C
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    ${e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u0645\u0627\u0630\u062C</p></div>':`
                        <table class="data-table table-header-purple">
                            <thead>
                                <tr>
                                    <th>\u0643\u0648\u062F ISO</th>
                                    <th>\u0627\u0633\u0645 \u0627\u0644\u0646\u0645\u0648\u0630\u062C</th>
                                    <th>\u0627\u0644\u0646\u0648\u0639</th>
                                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${e.map(t=>`
                                    <tr>
                                        <td>${Utils.escapeHTML(t.isoCode||"")}</td>
                                        <td>${Utils.escapeHTML(t.name||"")}</td>
                                        <td>${Utils.escapeHTML(t.type||"")}</td>
                                        <td>
                                            <button onclick="ISO.viewForm('${t.id}')" class="btn-icon btn-icon-primary">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    `}
                </div>
            </div>
        `},setupEventListeners(){setTimeout(()=>{document.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{this.currentTab=i.getAttribute("data-tab"),this.load()})});const t=document.getElementById("add-document-btn"),s=document.getElementById("add-procedure-btn"),a=document.getElementById("add-form-btn");t&&t.addEventListener("click",()=>this.showDocumentForm()),s&&s.addEventListener("click",()=>this.showProcedureForm()),a&&a.addEventListener("click",()=>this.showFormForm())},100)},async showDocumentForm(e=null){let t=[];try{const i=await GoogleIntegration.fetchData("getDocumentCodes",{});i.success&&i.data&&(t=i.data.filter(o=>o.documentType==="\u0648\u062B\u064A\u0642\u0629"&&o.status==="\u0646\u0634\u0637"))}catch(i){Utils.safeError("Error loading document codes:",i)}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0648\u062B\u064A\u0642\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0648\u062B\u064A\u0642\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="iso-document-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0643\u0648\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0645\u0646 \u0627\u0644\u0645\u0631\u0643\u0632 *</label>
                            <select id="document-code-select" required class="form-input" 
                                onchange="ISO.loadDocumentCodeVersion('document')">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0643\u0648\u062F \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631</option>
                                ${t.map(i=>`
                                    <option value="${i.code}" 
                                        data-code-id="${i.id}"
                                        ${e?.isoCode===i.code?"selected":""}>
                                        ${Utils.escapeHTML(i.code||"")} - ${Utils.escapeHTML(i.documentName||"")}
                                    </option>
                                `).join("")}
                            </select>
                            <p class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-info-circle ml-1"></i>
                                \u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0643\u0648\u062F \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631. \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0633\u064A\u064F\u0633\u062D\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0648\u062B\u064A\u0642\u0629 *</label>
                            <input type="text" id="document-name" required class="form-input" 
                                value="${Utils.escapeHTML(e?.name||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0648\u062B\u064A\u0642\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0646\u0648\u0639 *</label>
                            <select id="document-type" required class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                <option value="\u0633\u064A\u0627\u0633\u0629" ${e?.type==="\u0633\u064A\u0627\u0633\u0629"?"selected":""}>\u0633\u064A\u0627\u0633\u0629</option>
                                <option value="\u0625\u062C\u0631\u0627\u0621" ${e?.type==="\u0625\u062C\u0631\u0627\u0621"?"selected":""}>\u0625\u062C\u0631\u0627\u0621</option>
                                <option value="\u062A\u0639\u0644\u064A\u0645\u0627\u062A" ${e?.type==="\u062A\u0639\u0644\u064A\u0645\u0627\u062A"?"selected":""}>\u062A\u0639\u0644\u064A\u0645\u0627\u062A</option>
                                <option value="\u062F\u0644\u064A\u0644" ${e?.type==="\u062F\u0644\u064A\u0644"?"selected":""}>\u062F\u0644\u064A\u0644</option>
                                <option value="\u0623\u062E\u0631\u0649" ${e?.type==="\u0623\u062E\u0631\u0649"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 (\u064A\u064F\u0633\u062D\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u0631\u0643\u0632)</label>
                            <input type="text" id="document-version" readonly class="form-input bg-gray-100" 
                                value="${Utils.escapeHTML(e?.version||"")}" placeholder="\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                            <input type="text" id="document-issue-date" readonly class="form-input bg-gray-100" 
                                value="${e?.issueDate?Utils.formatDate(e.issueDate):""}" placeholder="\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644</label>
                            <input type="text" id="document-revision-date" readonly class="form-input bg-gray-100" 
                                value="${e?.revisionDate?Utils.formatDate(e.revisionDate):""}" placeholder="\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 *</label>
                            <input type="text" id="document-department" required class="form-input" 
                                value="${Utils.escapeHTML(e?.department||"")}" placeholder="\u0627\u0644\u0642\u0633\u0645">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-document-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(s),e?.isoCode&&await this.loadDocumentCodeVersion("document",e.isoCode),s.querySelector("#save-document-btn").addEventListener("click",()=>this.handleDocumentSubmit(e?.id,s)),s.addEventListener("click",i=>{i.target===s&&s.remove()})},async handleDocumentSubmit(e=null,t){const a=document.getElementById("document-code-select")?.value||"";if(!a){Notification.error("\u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0643\u0648\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631");return}const i=document.getElementById("document-name"),o=document.getElementById("document-type"),d=document.getElementById("document-version"),l=document.getElementById("document-issue-date"),c=document.getElementById("document-revision-date"),n=document.getElementById("document-department");if(!i||!o||!d||!n){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const r={id:e||Utils.generateId("ISO_DOC"),isoCode:a,name:i.value.trim(),type:o.value,version:d.value.trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",issueDate:l?.value||null,revisionDate:c?.value||null,department:n.value.trim(),createdAt:e?AppState.appData.isoDocuments.find(m=>m.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};Loading.show();try{if(e){const m=AppState.appData.isoDocuments.findIndex(u=>u.id===e);m!==-1&&(AppState.appData.isoDocuments[m]=r),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0648\u062B\u064A\u0642\u0629 \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.isoDocuments.push(r),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0648\u062B\u064A\u0642\u0629 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide();try{t&&t.parentNode&&t.remove()}catch(m){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u063A\u0644\u0627\u0642 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0648\u062B\u064A\u0642\u0629:",m)}this.load(),GoogleIntegration.autoSave("ISODocuments",AppState.appData.isoDocuments).catch(m=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets (\u0648\u062B\u0627\u0626\u0642 ISO):",m),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B. \u062A\u0639\u0630\u0651\u0631\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0641\u0648\u0631\u064A\u0629 \u0645\u0639 \u0627\u0644\u0634\u064A\u062A.")})}catch(m){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+m.message)}},async showProcedureForm(e=null){let t=[];try{const i=await GoogleIntegration.fetchData("getDocumentCodes",{});i.success&&i.data&&(t=i.data.filter(o=>o.documentType==="\u0625\u062C\u0631\u0627\u0621"&&o.status==="\u0646\u0634\u0637"))}catch(i){Utils.safeError("Error loading document codes:",i)}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0625\u062C\u0631\u0627\u0621":"\u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="iso-procedure-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0643\u0648\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u0646 \u0627\u0644\u0645\u0631\u0643\u0632 *</label>
                            <select id="procedure-code-select" required class="form-input" 
                                onchange="ISO.loadDocumentCodeVersion('procedure')">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0643\u0648\u062F \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631</option>
                                ${t.map(i=>`
                                    <option value="${i.code}" 
                                        data-code-id="${i.id}"
                                        ${e?.isoCode===i.code?"selected":""}>
                                        ${Utils.escapeHTML(i.code||"")} - ${Utils.escapeHTML(i.documentName||"")}
                                    </option>
                                `).join("")}
                            </select>
                            <p class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-info-circle ml-1"></i>
                                \u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0643\u0648\u062F \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631. \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0633\u064A\u064F\u0633\u062D\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 *</label>
                            <input type="text" id="procedure-name" required class="form-input" 
                                value="${Utils.escapeHTML(e?.name||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0625\u062C\u0631\u0627\u0621">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 *</label>
                            <input type="text" id="procedure-department" required class="form-input" 
                                value="${Utils.escapeHTML(e?.department||"")}" placeholder="\u0627\u0644\u0642\u0633\u0645">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 (\u064A\u064F\u0633\u062D\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u0631\u0643\u0632)</label>
                            <input type="text" id="procedure-version" readonly class="form-input bg-gray-100" 
                                value="${Utils.escapeHTML(e?.version||"")}" placeholder="\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                            <input type="text" id="procedure-issue-date" readonly class="form-input bg-gray-100" 
                                value="${e?.issueDate?Utils.formatDate(e.issueDate):""}" placeholder="\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644</label>
                            <input type="text" id="procedure-revision-date" readonly class="form-input bg-gray-100" 
                                value="${e?.revisionDate?Utils.formatDate(e.revisionDate):""}" placeholder="\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-procedure-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(s),e?.isoCode&&await this.loadDocumentCodeVersion("procedure",e.isoCode),s.querySelector("#save-procedure-btn").addEventListener("click",()=>this.handleProcedureSubmit(e?.id,s)),s.addEventListener("click",i=>{i.target===s&&s.remove()})},async handleProcedureSubmit(e=null,t){const a=document.getElementById("procedure-code-select")?.value||"";if(!a){Notification.error("\u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0643\u0648\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631");return}const i={id:e||Utils.generateId("ISO_PROC"),isoCode:a,name:document.getElementById("procedure-name").value.trim(),department:document.getElementById("procedure-department").value.trim(),version:document.getElementById("procedure-version").value.trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",issueDate:document.getElementById("procedure-issue-date").value||null,revisionDate:document.getElementById("procedure-revision-date").value||null,createdAt:e?AppState.appData.isoProcedures.find(o=>o.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};Loading.show();try{if(e){const o=AppState.appData.isoProcedures.findIndex(d=>d.id===e);o!==-1&&(AppState.appData.isoProcedures[o]=i),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.isoProcedures.push(i),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide();try{t&&t.parentNode&&t.remove()}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u063A\u0644\u0627\u0642 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0625\u062C\u0631\u0627\u0621:",o)}this.load(),GoogleIntegration.autoSave("ISOProcedures",AppState.appData.isoProcedures).catch(o=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets (\u0625\u062C\u0631\u0627\u0621\u0627\u062A ISO):",o),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B. \u062A\u0639\u0630\u0651\u0631\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0641\u0648\u0631\u064A\u0629 \u0645\u0639 \u0627\u0644\u0634\u064A\u062A.")})}catch(o){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+o.message)}},async showFormForm(e=null){let t=[];try{const i=await GoogleIntegration.fetchData("getDocumentCodes",{});i.success&&i.data&&(t=i.data.filter(o=>o.documentType==="\u0646\u0645\u0648\u0630\u062C"&&o.status==="\u0646\u0634\u0637"))}catch(i){Utils.safeError("Error loading document codes:",i)}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0646\u0645\u0648\u0630\u062C":"\u0625\u0636\u0627\u0641\u0629 \u0646\u0645\u0648\u0630\u062C \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="iso-form-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0645\u0646 \u0627\u0644\u0645\u0631\u0643\u0632 *</label>
                            <select id="form-code-select" required class="form-input" 
                                onchange="ISO.loadDocumentCodeVersion('form')">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0643\u0648\u062F \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631</option>
                                ${t.map(i=>`
                                    <option value="${i.code}" 
                                        data-code-id="${i.id}"
                                        ${e?.isoCode===i.code?"selected":""}>
                                        ${Utils.escapeHTML(i.code||"")} - ${Utils.escapeHTML(i.documentName||"")}
                                    </option>
                                `).join("")}
                            </select>
                            <p class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-info-circle ml-1"></i>
                                \u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0643\u0648\u062F \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631. \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0633\u064A\u064F\u0633\u062D\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0646\u0645\u0648\u0630\u062C *</label>
                            <input type="text" id="form-name" required class="form-input" 
                                value="${Utils.escapeHTML(e?.name||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0646\u0645\u0648\u0630\u062C">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0646\u0648\u0639 *</label>
                            <select id="form-type" required class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                <option value="\u062A\u0633\u062C\u064A\u0644" ${e?.type==="\u062A\u0633\u062C\u064A\u0644"?"selected":""}>\u062A\u0633\u062C\u064A\u0644</option>
                                <option value="\u062A\u0642\u0631\u064A\u0631" ${e?.type==="\u062A\u0642\u0631\u064A\u0631"?"selected":""}>\u062A\u0642\u0631\u064A\u0631</option>
                                <option value="\u062D\u0635" ${e?.type==="\u062D\u0635"?"selected":""}>\u062D\u0635</option>
                                <option value="\u062A\u062F\u0631\u064A\u0628" ${e?.type==="\u062A\u062F\u0631\u064A\u0628"?"selected":""}>\u062A\u062F\u0631\u064A\u0628</option>
                                <option value="\u0623\u062E\u0631\u0649" ${e?.type==="\u0623\u062E\u0631\u0649"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 (\u064A\u064F\u0633\u062D\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u0631\u0643\u0632)</label>
                            <input type="text" id="form-version" readonly class="form-input bg-gray-100" 
                                value="${Utils.escapeHTML(e?.version||"")}" placeholder="\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                            <input type="text" id="form-issue-date" readonly class="form-input bg-gray-100" 
                                value="${e?.issueDate?Utils.formatDate(e.issueDate):""}" placeholder="\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644</label>
                            <input type="text" id="form-revision-date" readonly class="form-input bg-gray-100" 
                                value="${e?.revisionDate?Utils.formatDate(e.revisionDate):""}" placeholder="\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-form-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(s),e?.isoCode&&await this.loadDocumentCodeVersion("form",e.isoCode),s.querySelector("#save-form-btn").addEventListener("click",()=>this.handleFormSubmit(e?.id,s)),s.addEventListener("click",i=>{i.target===s&&s.remove()})},async handleFormSubmit(e=null,t){const s=t?.querySelector('button[type="submit"]')||document.querySelector('.modal-overlay button[type="submit"]');if(s&&s.disabled)return;let a="";s&&(a=s.innerHTML,s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const o=document.getElementById("form-code-select")?.value||"";if(!o){Notification.error("\u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0645\u0646 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631"),s&&(s.disabled=!1,s.innerHTML=a);return}const d=document.getElementById("form-name"),l=document.getElementById("form-type"),c=document.getElementById("form-version"),n=document.getElementById("form-issue-date"),r=document.getElementById("form-revision-date");if(!d||!l||!c){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),s&&(s.disabled=!1,s.innerHTML=a);return}const m={id:e||Utils.generateId("ISO_FORM"),isoCode:o,name:d.value.trim(),type:l.value,version:c.value.trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",issueDate:n?.value||null,revisionDate:r?.value||null,createdAt:e?AppState.appData.isoForms.find(u=>u.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};try{if(e){const u=AppState.appData.isoForms.findIndex(v=>v.id===e);u!==-1&&(AppState.appData.isoForms[u]=m),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.isoForms.push(m),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),t.remove(),s&&(s.disabled=!1,s.innerHTML=a),this.load(),GoogleIntegration.autoSave("ISOForms",AppState.appData.isoForms).catch(u=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",u)})}catch(u){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+u.message),s&&(s.disabled=!1,s.innerHTML=a)}},async viewDocument(e){const t=AppState.appData.isoDocuments.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0648\u062B\u064A\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0648\u062B\u064A\u0642\u0629</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>\u0643\u0648\u062F ISO:</strong> ${Utils.escapeHTML(t.isoCode||"")}</div>
                        <div><strong>\u0627\u0633\u0645 \u0627\u0644\u0648\u062B\u064A\u0642\u0629:</strong> ${Utils.escapeHTML(t.name||"")}</div>
                        <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(t.type||"")}</div>
                        <div><strong>\u0627\u0644\u0625\u0635\u062F\u0627\u0631:</strong> ${Utils.escapeHTML(t.version||"")}</div>
                        <div><strong>\u0627\u0644\u0642\u0633\u0645:</strong> ${Utils.escapeHTML(t.department||"")}</div>
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621:</strong> ${Utils.formatDate(t.createdAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" onclick="ISO.showDocumentForm(${JSON.stringify(t).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();" class="btn-primary">\u062A\u0639\u062F\u064A\u0644</button>
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",a=>{a.target===s&&s.remove()})},async viewProcedure(e){const t=AppState.appData.isoProcedures.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>\u0643\u0648\u062F ISO:</strong> ${Utils.escapeHTML(t.isoCode||"")}</div>
                        <div><strong>\u0627\u0633\u0645 \u0627\u0644\u0625\u062C\u0631\u0627\u0621:</strong> ${Utils.escapeHTML(t.name||"")}</div>
                        <div><strong>\u0627\u0644\u0642\u0633\u0645:</strong> ${Utils.escapeHTML(t.department||"")}</div>
                        <div><strong>\u0627\u0644\u0625\u0635\u062F\u0627\u0631:</strong> ${Utils.escapeHTML(t.version||"")}</div>
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621:</strong> ${Utils.formatDate(t.createdAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" onclick="ISO.showProcedureForm(${JSON.stringify(t).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();" class="btn-primary">\u062A\u0639\u062F\u064A\u0644</button>
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",a=>{a.target===s&&s.remove()})},async viewForm(e){const t=AppState.appData.isoForms.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>\u0643\u0648\u062F ISO:</strong> ${Utils.escapeHTML(t.isoCode||"")}</div>
                        <div><strong>\u0627\u0633\u0645 \u0627\u0644\u0646\u0645\u0648\u0630\u062C:</strong> ${Utils.escapeHTML(t.name||"")}</div>
                        <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(t.type||"")}</div>
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621:</strong> ${Utils.formatDate(t.createdAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" onclick="ISO.showFormForm(${JSON.stringify(t).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();" class="btn-primary">\u062A\u0639\u062F\u064A\u0644</button>
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",a=>{a.target===s&&s.remove()})},async renderISO45001(){const e=AppState.appData.hseObjectives||[],t=AppState.appData.hseRiskAssessments||[];return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-hard-hat ml-2"></i>ISO 45001 - \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</h2>
                </div>
                <div class="card-body">
                    <div class="space-y-4">
                        <p class="text-gray-700">
                            \u064A\u0631\u0643\u0632 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0639\u0644\u0649 \u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (OH&S) \u0648\u0642\u064B\u0627 \u0644\u0645\u0639\u064A\u0627\u0631 ISO 45001.
                            \u064A\u0647\u062F \u0625\u0644\u0649 \u062A\u0645\u0643\u064A\u0646 \u0627\u0644\u0645\u0646\u0638\u0645\u0629 \u0645\u0646 \u062A\u0648\u064A\u0631 \u0623\u0645\u0627\u0643\u0646 \u0639\u0645\u0644 \u0622\u0645\u0646\u0629 \u0648\u0635\u062D\u064A\u0629\u060C \u0648\u0645\u0646\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0639\u0645\u0644\u060C
                            \u0628\u0627\u0644\u0625\u0636\u0627\u0629 \u0625\u0644\u0649 \u0627\u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0645\u0631 \u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629.
                        </p>
                        <h3 class="font-semibold text-lg mt-4 mb-2">\u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629:</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-2">
                            <li>\u0627\u0644\u0633\u064A\u0627\u0642 \u0627\u0644\u062A\u0646\u0638\u064A\u0645\u064A</li>
                            <li>\u0627\u0644\u0642\u064A\u0627\u062F\u0629 \u0648\u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646</li>
                            <li>\u0627\u0644\u062A\u062E\u0637\u064A\u0637 (\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0627\u0644\u0631\u0635\u060C \u0627\u0644\u0623\u0647\u062F\u0627)</li>
                            <li>\u0627\u0644\u062F\u0639\u0645 (\u0627\u0644\u0645\u0648\u0627\u0631\u062F\u060C \u0627\u0644\u0643\u0627\u0621\u0629\u060C \u0627\u0644\u0648\u0639\u064A\u060C \u0627\u0644\u0627\u062A\u0635\u0627\u0644\u060C \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0648\u062B\u0642\u0629)</li>
                            <li>\u0627\u0644\u062A\u0634\u063A\u064A\u0644 (\u0627\u0644\u062A\u062E\u0637\u064A\u0637 \u0648\u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u060C \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A\u060C \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646\u060C \u0627\u0644\u0627\u0633\u062A\u0639\u062F\u0627\u062F \u0644\u0644\u0637\u0648\u0627\u0631\u0626)</li>
                            <li>\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0623\u062F\u0627\u0621 (\u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0648\u0627\u0644\u0642\u064A\u0627\u0633\u060C \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644\u060C \u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u060C \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629)</li>
                            <li>\u0627\u0644\u062A\u062D\u0633\u064A\u0646 (\u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629\u060C \u0627\u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0645\u0631)</li>
                        </ul>
                        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-blue-50 border border-blue-200 rounded p-4">
                                <h4 class="font-semibold text-blue-800 mb-2">\u0627\u0644\u0623\u0647\u062F\u0627 (${e.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">\u0625\u062F\u0627\u0631\u0629 \u0623\u0647\u062F\u0627 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</p>
                                <button class="btn-secondary w-full" onclick="ISO.showHSEObjectiveForm()">
                                    <i class="fas fa-bullseye ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0647\u062F\u0627
                                </button>
                            </div>
                            <div class="bg-green-50 border border-green-200 rounded p-4">
                                <h4 class="font-semibold text-green-800 mb-2">\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631 (${t.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">\u062A\u0642\u064A\u064A\u0645 \u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</p>
                                <button class="btn-secondary w-full" onclick="ISO.showHSERiskAssessmentForm()">
                                    <i class="fas fa-shield-alt ml-2"></i>\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderISO14001(){const e=AppState.appData.environmentalAspects||[],t=AppState.appData.environmentalMonitoring||[];return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-leaf ml-2"></i>ISO 14001 - \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0628\u064A\u0626\u0629</h2>
                </div>
                <div class="card-body">
                    <div class="space-y-4">
                        <p class="text-gray-700">
                            \u064A\u062D\u062F\u062F \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0628\u064A\u0626\u0629 (EMS) \u0648\u0642\u064B\u0627 \u0644\u0645\u0639\u064A\u0627\u0631 ISO 14001.
                            \u064A\u0647\u062F \u0625\u0644\u0649 \u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0646\u0638\u0645\u0627\u062A \u0639\u0644\u0649 \u062A\u062D\u0633\u064A\u0646 \u0623\u062F\u0627\u0626\u0647\u0627 \u0627\u0644\u0628\u064A\u0626\u064A \u0645\u0646 \u062E\u0644\u0627\u0644 \u0625\u062F\u0627\u0631\u0629 \u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A\u0647\u0627 \u0627\u0644\u0628\u064A\u0626\u064A\u0629
                            \u0628\u0637\u0631\u064A\u0642\u0629 \u0645\u0646\u0647\u062C\u064A\u0629 \u062A\u0633\u0627\u0647\u0645 \u064A \u0631\u0643\u064A\u0632\u0629 \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629.
                        </p>
                        <h3 class="font-semibold text-lg mt-4 mb-2">\u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629:</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-2">
                            <li>\u0627\u0644\u0633\u064A\u0627\u0642 \u0627\u0644\u062A\u0646\u0638\u064A\u0645\u064A</li>
                            <li>\u0627\u0644\u0642\u064A\u0627\u062F\u0629</li>
                            <li>\u0627\u0644\u062A\u062E\u0637\u064A\u0637 (\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u062C\u0648\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A\u0629\u060C \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645\u0627\u062A \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644\u064A\u0629\u060C \u0627\u0644\u0623\u0647\u062F\u0627 \u0627\u0644\u0628\u064A\u0626\u064A\u0629)</li>
                            <li>\u0627\u0644\u062F\u0639\u0645 (\u0627\u0644\u0645\u0648\u0627\u0631\u062F\u060C \u0627\u0644\u0643\u0627\u0621\u0629\u060C \u0627\u0644\u0648\u0639\u064A\u060C \u0627\u0644\u0627\u062A\u0635\u0627\u0644\u060C \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0648\u062B\u0642\u0629)</li>
                            <li>\u0627\u0644\u062A\u0634\u063A\u064A\u0644 (\u0627\u0644\u062A\u062E\u0637\u064A\u0637 \u0648\u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u060C \u0627\u0644\u0627\u0633\u062A\u0639\u062F\u0627\u062F \u0644\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0644\u0647\u0627)</li>
                            <li>\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0623\u062F\u0627\u0621 (\u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0648\u0627\u0644\u0642\u064A\u0627\u0633\u060C \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644\u060C \u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u060C \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629)</li>
                            <li>\u0627\u0644\u062A\u062D\u0633\u064A\u0646 (\u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629\u060C \u0627\u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0645\u0631)</li>
                        </ul>
                        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-green-50 border border-green-200 rounded p-4">
                                <h4 class="font-semibold text-green-800 mb-2">\u0627\u0644\u062C\u0648\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A\u0629 (${e.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062C\u0648\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A\u0629 \u0648\u062A\u0623\u062B\u064A\u0631\u0627\u062A\u0647\u0627</p>
                                <button class="btn-secondary w-full" onclick="ISO.showEnvironmentalAspectsForm()">
                                    <i class="fas fa-globe ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062C\u0648\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A\u0629
                                </button>
                            </div>
                            <div class="bg-blue-50 border border-blue-200 rounded p-4">
                                <h4 class="font-semibold text-blue-800 mb-2">\u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629 (${t.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">\u062A\u062A\u0628\u0639 \u0648\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0628\u064A\u0626\u064A</p>
                                <button class="btn-secondary w-full" onclick="ISO.showEnvironmentalMonitoringForm()">
                                    <i class="fas fa-chart-line ml-2"></i>\u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderAudit(){const e=AppState.appData.hseAudits||[],t=AppState.appData.hseNonConformities||[],s=AppState.appData.hseCorrectiveActions||[];return`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title"><i class="fas fa-clipboard-check ml-2"></i>\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062A\u062F\u0642\u064A\u0642</h2>
                            <button class="btn-primary" onclick="ISO.showAuditForm()">
                                <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u062F\u0642\u064A\u0642
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        ${e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u062A\u062F\u0642\u064A\u0642 \u0645\u0633\u062C\u0644\u0629</p></div>':`
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                        <th>\u0627\u0644\u0646\u0648\u0639</th>
                                        <th>\u0627\u0644\u0645\u062F\u0642\u0642</th>
                                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${e.map(a=>`
                                        <tr>
                                            <td>${Utils.formatDate(a.date)}</td>
                                            <td>${Utils.escapeHTML(a.type)}</td>
                                            <td>${Utils.escapeHTML(a.auditor)}</td>
                                            <td><span class="badge badge-${a.status==="\u0645\u0643\u062A\u0645\u0644"?"success":"warning"}">${a.status}</span></td>
                                            <td>
                                                <button onclick="ISO.viewAudit('${a.id}')" class="btn-icon btn-icon-info"><i class="fas fa-eye"></i></button>
                                            </td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title"><i class="fas fa-times-circle ml-2"></i>\u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629</h2>
                            <button class="btn-primary" onclick="ISO.showNonConformityForm()">
                                <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0639\u062F\u0645 \u0645\u0637\u0627\u0628\u0642\u0629
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        ${t.length===0&&s.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u062F\u0645 \u0645\u0637\u0627\u0628\u0642\u0629 \u0623\u0648 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0635\u062D\u064A\u062D\u064A\u0629</p></div>':`
                            <h3 class="font-semibold text-md mb-2">\u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 (${t.length})</h3>
                            ${t.length===0?'<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u062F\u0645 \u0645\u0637\u0627\u0628\u0642\u0629 \u0645\u0633\u062C\u0644\u0629</p>':`
                                <table class="data-table mb-4">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                            <th>\u0627\u0644\u0648\u0635\u0641</th>
                                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${t.map(a=>`
                                            <tr>
                                                <td>${Utils.formatDate(a.date)}</td>
                                                <td>${Utils.escapeHTML(a.description.substring(0,50))}...</td>
                                                <td><span class="badge badge-${a.status==="\u0645\u063A\u0644\u0642"?"success":"danger"}">${a.status}</span></td>
                                                <td>
                                                    <button onclick="ISO.viewNonConformity('${a.id}')" class="btn-icon btn-icon-info"><i class="fas fa-eye"></i></button>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            `}

                            <h3 class="font-semibold text-md mb-2 mt-6">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 (${s.length})</h3>
                            ${s.length===0?'<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0645\u0633\u062C\u0644\u0629</p>':`
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u0648\u0635</th>
                                            <th>\u0627\u0644\u0645\u0633\u0624\u0648\u0644</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${s.map(a=>`
                                            <tr>
                                                <td>${Utils.escapeHTML(a.description.substring(0,50))}...</td>
                                                <td>${Utils.escapeHTML(a.responsible)}</td>
                                                <td>${Utils.formatDate(a.dueDate)}</td>
                                                <td><span class="badge badge-${a.status==="\u0645\u0643\u062A\u0645\u0644"?"success":"warning"}">${a.status}</span></td>
                                                <td>
                                                    <button onclick="ISO.viewCorrectiveAction('${a.id}')" class="btn-icon btn-icon-info"><i class="fas fa-eye"></i></button>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            `}
                        `}
                    </div>
                </div>
            </div>
        `},async showHSEObjectiveForm(e=null){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0647\u062F":"\u0625\u0636\u0627\u0641\u0629 \u0647\u062F HSE \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="hse-objective-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0647\u062F *</label>
                            <input type="text" id="objective-name" required class="form-input" 
                                value="${Utils.escapeHTML(e?.name||"")}" placeholder="\u0645\u062B\u0627\u0644: \u062A\u0642\u0644\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0628\u0646\u0633\u0628\u0629 20%">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 *</label>
                            <textarea id="objective-description" required class="form-input" rows="4" 
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062D\u062F \u0627\u0644\u0647\u062F\u0641\u064A">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 *</label>
                            <input type="date" id="objective-due-date" required class="form-input" 
                                value="${e?.dueDate?new Date(e.dueDate).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 *</label>
                            <input type="text" id="objective-responsible" required class="form-input" 
                                value="${Utils.escapeHTML(e?.responsible||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-objective-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#save-objective-btn").addEventListener("click",()=>this.handleHSEObjectiveSubmit(e?.id,t)),t.addEventListener("click",a=>{a.target===t&&t.remove()})},async handleHSEObjectiveSubmit(e=null,t){const s=document.getElementById("objective-name"),a=document.getElementById("objective-description"),i=document.getElementById("objective-due-date"),o=document.getElementById("objective-responsible");if(!s||!a||!i||!o){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const d={id:e||Utils.generateId("HSE_OBJ"),name:s.value.trim(),description:a.value.trim(),dueDate:new Date(i.value).toISOString(),responsible:o.value.trim(),status:e&&AppState.appData.hseObjectives.find(l=>l.id===e)?.status||"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630",createdAt:e?AppState.appData.hseObjectives.find(l=>l.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.hseObjectives||(AppState.appData.hseObjectives=[]),Loading.show();try{if(e){const l=AppState.appData.hseObjectives.findIndex(c=>c.id===e);l!==-1&&(AppState.appData.hseObjectives[l]=d),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0647\u062F \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("HSEObjectives",AppState.appData.hseObjectives)}else if(AppState.appData.hseObjectives.push(d),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0647\u062F \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl)try{await GoogleIntegration.sendToAppsScript("addHSEObjective",d),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0647\u062F\u0641 \u0645\u0628\u0627\u0634\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629")}catch(l){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",l),await GoogleIntegration.autoSave("HSEObjectives",AppState.appData.hseObjectives)}else await GoogleIntegration.autoSave("HSEObjectives",AppState.appData.hseObjectives);Loading.hide(),t.remove(),this.load()}catch(l){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+l.message)}},async showHSERiskAssessmentForm(e=null){Notification.info("\u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0646\u0645\u0648\u0630\u062C \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 HSE \u0642\u0631\u064A\u0628\u0627\u064B")},async showEnvironmentalAspectsForm(e=null){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u062C\u0627\u0646\u0628 \u0628\u064A\u0626\u064A":"\u0625\u0636\u0627\u0641\u0629 \u062C\u0627\u0646\u0628 \u0628\u064A\u0626\u064A \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="environmental-aspect-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A *</label>
                            <input type="text" id="aspect-name" required class="form-input" 
                                value="${Utils.escapeHTML(e?.name||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u064A\u0627\u0647">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 *</label>
                            <textarea id="aspect-description" required class="form-input" rows="4" 
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0623\u062B\u064A\u0631 *</label>
                            <select id="aspect-impact" required class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0623\u062B\u064A\u0631</option>
                                <option value="\u0645\u0646\u062E\u0636" ${e?.impact==="\u0645\u0646\u062E\u0636"?"selected":""}>\u0645\u0646\u062E\u0636</option>
                                <option value="\u0645\u062A\u0648\u0633\u0637" ${e?.impact==="\u0645\u062A\u0648\u0633\u0637"?"selected":""}>\u0645\u062A\u0648\u0633\u0637</option>
                                <option value="\u0639\u0627\u0644\u064A" ${e?.impact==="\u0639\u0627\u0644\u064A"?"selected":""}>\u0639\u0627\u0644\u064A</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-aspect-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#save-aspect-btn").addEventListener("click",()=>this.handleEnvironmentalAspectsSubmit(e?.id,t)),t.addEventListener("click",a=>{a.target===t&&t.remove()})},async handleEnvironmentalAspectsSubmit(e=null,t){const s=document.getElementById("aspect-name"),a=document.getElementById("aspect-description"),i=document.getElementById("aspect-impact");if(!s||!a||!i){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const o={id:e||Utils.generateId("ENV_ASP"),name:s.value.trim(),description:a.value.trim(),impact:i.value,createdAt:e?AppState.appData.environmentalAspects.find(d=>d.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.environmentalAspects||(AppState.appData.environmentalAspects=[]),Loading.show();try{if(e){const d=AppState.appData.environmentalAspects.findIndex(l=>l.id===e);d!==-1&&(AppState.appData.environmentalAspects[d]=o),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("EnvironmentalAspects",AppState.appData.environmentalAspects)}else if(AppState.appData.environmentalAspects.push(o),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl)try{await GoogleIntegration.sendToAppsScript("addEnvironmentalAspect",o),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0628\u064A\u0626\u064A \u0645\u0628\u0627\u0634\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629")}catch(d){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",d),await GoogleIntegration.autoSave("EnvironmentalAspects",AppState.appData.environmentalAspects)}else await GoogleIntegration.autoSave("EnvironmentalAspects",AppState.appData.environmentalAspects);Loading.hide(),t.remove(),this.load()}catch(d){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+d.message)}},async showEnvironmentalMonitoringForm(e=null){Notification.info("\u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629 \u0642\u0631\u064A\u0628\u0627\u064B")},async showAuditForm(e=null){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u062A\u062F\u0642\u064A\u0642":"\u0625\u0636\u0627\u0629 \u062A\u062F\u0642\u064A\u0642 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="audit-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0642\u064A\u0642 *</label>
                            <select id="audit-type" required class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                <option value="\u062A\u062F\u0642\u064A\u0642 \u062F\u0627\u062E\u0644\u064A" ${e?.type==="\u062A\u062F\u0642\u064A\u0642 \u062F\u0627\u062E\u0644\u064A"?"selected":""}>\u062A\u062F\u0642\u064A\u0642 \u062F\u0627\u062E\u0644\u064A</option>
                                <option value="\u062A\u062F\u0642\u064A\u0642 \u062E\u0627\u0631\u062C\u064A" ${e?.type==="\u062A\u062F\u0642\u064A\u0642 \u062E\u0627\u0631\u062C\u064A"?"selected":""}>\u062A\u062F\u0642\u064A\u0642 \u062E\u0627\u0631\u062C\u064A</option>
                                <option value="\u0645\u0631\u0627\u062C\u0639\u0629 \u0625\u062F\u0627\u0631\u0629" ${e?.type==="\u0645\u0631\u0627\u062C\u0639\u0629 \u0625\u062F\u0627\u0631\u0629"?"selected":""}>\u0645\u0631\u0627\u062C\u0639\u0629 \u0625\u062F\u0627\u0631\u0629</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062F\u0642\u064A\u0642 *</label>
                            <input type="date" id="audit-date" required class="form-input" 
                                value="${e?.date?new Date(e.date).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u062F\u0642\u0642 *</label>
                            <input type="text" id="audit-auditor" required class="form-input" 
                                value="${Utils.escapeHTML(e?.auditor||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0642\u0642">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                            <select id="audit-status" required class="form-input">
                                <option value="\u0645\u062E\u0637\u0637" ${e?.status==="\u0645\u062E\u0637\u0637"?"selected":""}>\u0645\u062E\u0637\u0637</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630" ${e?.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630</option>
                                <option value="\u0645\u0643\u062A\u0645\u0644" ${e?.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635</label>
                            <textarea id="audit-description" class="form-input" rows="4" 
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062A\u062F\u0642\u064A\u0642">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-audit-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#save-audit-btn").addEventListener("click",()=>this.handleAuditSubmit(e?.id,t)),t.addEventListener("click",a=>{a.target===t&&t.remove()})},async handleAuditSubmit(e=null,t){const s=document.getElementById("audit-type"),a=document.getElementById("audit-date"),i=document.getElementById("audit-auditor"),o=document.getElementById("audit-status"),d=document.getElementById("audit-description");if(!s||!a||!i||!o||!d){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const l={id:e||Utils.generateId("HSE_AUDIT"),type:s.value,date:new Date(a.value).toISOString(),auditor:i.value.trim(),status:o.value,description:d.value.trim(),createdAt:e?AppState.appData.hseAudits.find(c=>c.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.hseAudits||(AppState.appData.hseAudits=[]),Loading.show();try{if(e){const c=AppState.appData.hseAudits.findIndex(n=>n.id===e);c!==-1&&(AppState.appData.hseAudits[c]=l),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("HSEAudits",AppState.appData.hseAudits)}else if(AppState.appData.hseAudits.push(l),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl)try{await GoogleIntegration.sendToAppsScript("addHSEAudit",l),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0645\u0628\u0627\u0634\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629")}catch(c){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",c),await GoogleIntegration.autoSave("HSEAudits",AppState.appData.hseAudits)}else await GoogleIntegration.autoSave("HSEAudits",AppState.appData.hseAudits);Loading.hide(),t.remove(),this.load()}catch(c){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+c.message)}},async viewAudit(e){const t=AppState.appData.hseAudits.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u062F\u0642\u064A\u0642</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(t.type)}</div>
                        <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${Utils.formatDate(t.date)}</div>
                        <div><strong>\u0627\u0644\u0645\u062F\u0642\u0642:</strong> ${Utils.escapeHTML(t.auditor)}</div>
                        <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> <span class="badge badge-${t.status==="\u0645\u0643\u062A\u0645\u0644"?"success":"warning"}">${t.status}</span></div>
                        <div><strong>\u0627\u0644\u0648\u0635\u0641:</strong> ${Utils.escapeHTML(t.description||"-")}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",a=>{a.target===s&&s.remove()})},async showNonConformityForm(e=null){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0639\u062F\u0645 \u0645\u0637\u0627\u0628\u0642\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0639\u062F\u0645 \u0645\u0637\u0627\u0628\u0642\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="non-conformity-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 *</label>
                            <input type="date" id="nc-date" required class="form-input" 
                                value="${e?.date?new Date(e.date).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 *</label>
                            <textarea id="nc-description" required class="form-input" rows="4" 
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                            <select id="nc-status" required class="form-input">
                                <option value="\u0645\u062A\u0648\u062D\u0629" ${e?.status==="\u0645\u062A\u0648\u062D\u0629"?"selected":""}>\u0645\u062A\u0648\u062D\u0629</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629" ${e?.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</option>
                                <option value="\u0645\u063A\u0644\u0642" ${e?.status==="\u0645\u063A\u0644\u0642"?"selected":""}>\u0645\u063A\u0644\u0642</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-nc-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#save-nc-btn").addEventListener("click",()=>this.handleNonConformitySubmit(e?.id,t)),t.addEventListener("click",a=>{a.target===t&&t.remove()})},async handleNonConformitySubmit(e=null,t){const s=document.getElementById("nc-date"),a=document.getElementById("nc-description"),i=document.getElementById("nc-status");if(!s||!a||!i){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const o={id:e||Utils.generateId("HSE_NC"),date:new Date(s.value).toISOString(),description:a.value.trim(),status:i.value,createdAt:e?AppState.appData.hseNonConformities.find(d=>d.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.hseNonConformities||(AppState.appData.hseNonConformities=[]),Loading.show();try{if(e){const d=AppState.appData.hseNonConformities.findIndex(l=>l.id===e);d!==-1&&(AppState.appData.hseNonConformities[d]=o),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("HSENonConformities",AppState.appData.hseNonConformities)}else if(AppState.appData.hseNonConformities.push(o),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl)try{await GoogleIntegration.sendToAppsScript("addHSENonConformity",o),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629")}catch(d){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",d),await GoogleIntegration.autoSave("HSENonConformities",AppState.appData.hseNonConformities)}else await GoogleIntegration.autoSave("HSENonConformities",AppState.appData.hseNonConformities);Loading.hide(),t.remove(),this.load()}catch(d){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+d.message)}},async viewNonConformity(e){const t=AppState.appData.hseNonConformities.find(a=>a.id===e);if(!t){Notification.error("\u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${Utils.formatDate(t.date)}</div>
                        <div><strong>\u0627\u0644\u0648\u0635\u0641:</strong> ${Utils.escapeHTML(t.description)}</div>
                        <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> <span class="badge badge-${t.status==="\u0645\u063A\u0644\u0642"?"success":"danger"}">${t.status}</span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",a=>{a.target===s&&s.remove()})},async showCorrectiveActionForm(e=null){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A":"\u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="corrective-action-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 *</label>
                            <textarea id="ca-description" required class="form-input" rows="4" 
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 *</label>
                            <input type="text" id="ca-responsible" required class="form-input" 
                                value="${Utils.escapeHTML(e?.responsible||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 *</label>
                            <input type="date" id="ca-due-date" required class="form-input" 
                                value="${e?.dueDate?new Date(e.dueDate).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                            <select id="ca-status" required class="form-input">
                                <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630" ${e?.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630</option>
                                <option value="\u0645\u0643\u062A\u0645\u0644" ${e?.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-ca-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#save-ca-btn").addEventListener("click",()=>this.handleCorrectiveActionSubmit(e?.id,t)),t.addEventListener("click",a=>{a.target===t&&t.remove()})},async handleCorrectiveActionSubmit(e=null,t){const s=document.getElementById("ca-description"),a=document.getElementById("ca-responsible"),i=document.getElementById("ca-due-date"),o=document.getElementById("ca-status");if(!s||!a||!i||!o){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const d={id:e||Utils.generateId("HSE_CA"),description:s.value.trim(),responsible:a.value.trim(),dueDate:new Date(i.value).toISOString(),status:o.value,createdAt:e?AppState.appData.hseCorrectiveActions.find(l=>l.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.hseCorrectiveActions||(AppState.appData.hseCorrectiveActions=[]),Loading.show();try{if(e){const l=AppState.appData.hseCorrectiveActions.findIndex(c=>c.id===e);l!==-1&&(AppState.appData.hseCorrectiveActions[l]=d),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("HSECorrectiveActions",AppState.appData.hseCorrectiveActions)}else if(AppState.appData.hseCorrectiveActions.push(d),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl)try{await GoogleIntegration.sendToAppsScript("addHSECorrectiveAction",d),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0645\u0628\u0627\u0634\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629")}catch(l){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",l),await GoogleIntegration.autoSave("HSECorrectiveActions",AppState.appData.hseCorrectiveActions)}else await GoogleIntegration.autoSave("HSECorrectiveActions",AppState.appData.hseCorrectiveActions);Loading.hide(),t.remove(),this.load()}catch(l){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+l.message)}},async viewCorrectiveAction(e){const t=AppState.appData.hseCorrectiveActions.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>\u0627\u0644\u0648\u0635\u0641:</strong> ${Utils.escapeHTML(t.description)}</div>
                        <div><strong>\u0627\u0644\u0645\u0633\u0624\u0648\u0644:</strong> ${Utils.escapeHTML(t.responsible)}</div>
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</strong> ${Utils.formatDate(t.dueDate)}</div>
                        <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> <span class="badge badge-${t.status==="\u0645\u0643\u062A\u0645\u0644"?"success":"warning"}">${t.status}</span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",a=>{a.target===s&&s.remove()})},async renderCodingCenter(e={}){const t=e&&e.skipFetch===!0,s=t,a=AppState.currentUser;if(!a||a.role!=="admin"&&a.role!=="\u0645\u062F\u064A\u0631")return`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-600">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631</p>
                            <p class="text-sm text-gray-500 mt-2">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0641\u0642\u0637 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645</p>
                        </div>
                    </div>
                </div>
            `;let i=[],o=[],d=!1;const l=e&&e.silentTimeout===!0;if(!t)try{Loading.show();const r=new Promise((h,y)=>setTimeout(()=>y(new Error("TIMEOUT")),6e4)),m=Promise.all([GoogleIntegration.fetchData("getDocumentCodes",{}).catch(()=>({success:!1,data:[]})),GoogleIntegration.fetchData("getDocumentVersions",{documentCodeId:null}).catch(()=>({success:!1,data:[]}))]),[u,v]=await Promise.race([m,r]);u&&u.success&&u.data&&(i=u.data),v&&v.success&&v.data&&(o=v.data)}catch(r){r&&r.message==="TIMEOUT"?(d=!0,Utils.safeError("\u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631: \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644. \u062C\u0631\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629."),!l&&typeof Notification<"u"&&Notification.warning("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A. \u064A\u0645\u0643\u0646\u0643 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0623\u0648 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")):Utils.safeError("Error loading coding center data:",r)}finally{Loading.hide()}const c=`
            <div class="space-y-6">
                ${d?`
                <div class="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 flex items-center gap-2">
                    <i class="fas fa-clock text-amber-600"></i>
                    <span class="text-sm text-amber-800">\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062D\u062F\u062F. \u0627\u0636\u063A\u0637 <strong>\u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644</strong> \u0644\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.</span>
                </div>
                `:""}
                ${s?`
                <div class="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-2">
                    <i class="fas fa-spinner fa-spin text-blue-600"></i>
                    <span class="text-sm text-blue-800">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</span>
                </div>
                `:""}
                <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629 + \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 -->
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <div class="text-3xl font-bold text-blue-600 mb-2">${i.length}</div>
                            <div class="text-sm text-gray-700 font-semibold">\u0623\u0643\u0648\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A</div>
                        </div>
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div class="text-3xl font-bold text-green-600 mb-2">${o.length}</div>
                            <div class="text-sm text-gray-700 font-semibold">\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A</div>
                        </div>
                        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                            <div class="text-3xl font-bold text-purple-600 mb-2">${o.filter(n=>n.isActive===!0||n.isActive==="true").length}</div>
                            <div class="text-sm text-gray-700 font-semibold">\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0646\u0634\u0637\u0629</div>
                        </div>
                    </div>
                    <button type="button" onclick="ISO.reloadCodingCenter()" class="btn-secondary flex items-center gap-2 shrink-0" title="\u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A">
                        <i class="fas fa-sync-alt"></i>
                        <span>\u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644</span>
                    </button>
                </div>

                <!-- \u0642\u0633\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0643\u0648\u064A\u062F -->
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <h2 class="card-title">
                                <i class="fas fa-code ml-2"></i>
                                \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F (Document Coding Center)
                            </h2>
                            <div class="flex flex-wrap items-center gap-2">
                                <button type="button" class="btn-secondary flex items-center gap-1" onclick="ISO.importCodingCenterFromExcel()" title="\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0643\u0648\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0645\u0646 \u0645\u0644\u0641 Excel \u0623\u0648 CSV">
                                    <i class="fas fa-file-excel"></i>
                                    <span>\u0627\u0633\u062A\u064A\u0631\u0627\u062F Excel</span>
                                </button>
                                <button type="button" class="btn-secondary flex items-center gap-1" onclick="ISO.importCodingCenterFromPDF()" title="\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 PDF (\u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645 \u0644\u0644\u062C\u062F\u0627\u0648\u0644 - \u0627\u0633\u062A\u062E\u062F\u0645 Excel)">
                                    <i class="fas fa-file-pdf"></i>
                                    <span>\u0627\u0633\u062A\u064A\u0631\u0627\u062F PDF</span>
                                </button>
                                <button type="button" class="btn-secondary flex items-center gap-1" onclick="ISO.exportCodingCenterToExcel()" title="\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 Excel">
                                    <i class="fas fa-file-export"></i>
                                    <span>\u062A\u0635\u062F\u064A\u0631 Excel</span>
                                </button>
                                <button type="button" class="btn-secondary flex items-center gap-1" onclick="ISO.exportCodingCenterToPDF()" title="\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 PDF">
                                    <i class="fas fa-file-pdf"></i>
                                    <span>\u062A\u0635\u062F\u064A\u0631 PDF</span>
                                </button>
                                <button class="btn-primary" onclick="ISO.showDocumentCodeForm()">
                                    <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0643\u0648\u062F \u062C\u062F\u064A\u062F
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <input type="text" id="document-code-search" class="form-input" 
                                placeholder="\u0628\u062D\u062B \u0641\u064A \u0623\u0643\u0648\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A..." 
                                onkeyup="ISO.filterDocumentCodes()">
                        </div>
                        ${i.length===0?`
                            <div class="empty-state">
                                <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0643\u0648\u0627\u062F \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>
                            </div>
                        `:`
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u0643\u0648\u062F</th>
                                            <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th>
                                            <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</th>
                                            <th>\u0627\u0644\u0642\u0633\u0645</th>
                                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody id="document-codes-table-body">
                                        ${i.map(n=>`
                                            <tr>
                                                <td><strong>${Utils.escapeHTML(n.code||"")}</strong></td>
                                                <td>${Utils.escapeHTML(n.documentName||"")}</td>
                                                <td>${Utils.escapeHTML(n.documentType||"")}</td>
                                                <td>${Utils.escapeHTML(n.department||"")}</td>
                                                <td><span class="badge badge-${n.status==="\u0646\u0634\u0637"?"success":"warning"}">${Utils.escapeHTML(n.status||"")}</span></td>
                                                <td>${n.createdAt?Utils.formatDate(n.createdAt):"-"}</td>
                                                <td>
                                                    <button onclick="ISO.editDocumentCode('${n.id}')" class="btn-icon btn-icon-info" title="\u062A\u0639\u062F\u064A\u0644">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button onclick="ISO.viewDocumentVersions('${n.id}')" class="btn-icon btn-icon-success" title="\u0639\u0631\u0636 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A">
                                                        <i class="fas fa-list"></i>
                                                    </button>
                                                    <button onclick="ISO.deleteDocumentCode('${n.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>

                <!-- \u0642\u0633\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A -->
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title">
                                <i class="fas fa-file-alt ml-2"></i>
                                \u0645\u0631\u0643\u0632 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 (Issuing Center)
                            </h2>
                            <button class="btn-primary" onclick="ISO.showDocumentVersionForm()">
                                <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0625\u0635\u062F\u0627\u0631 \u062C\u062F\u064A\u062F
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <select id="version-filter-code" class="form-input" onchange="ISO.filterDocumentVersions()">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0643\u0648\u0627\u062F</option>
                                ${i.map(n=>`
                                    <option value="${n.id}">${Utils.escapeHTML(n.code||"")} - ${Utils.escapeHTML(n.documentName||"")}</option>
                                `).join("")}
                            </select>
                        </div>
                        ${o.length===0?`
                            <div class="empty-state">
                                <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>
                            </div>
                        `:`
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u0643\u0648\u062F</th>
                                            <th>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644</th>
                                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody id="document-versions-table-body">
                                        ${o.map(n=>{const r=i.find(m=>m.id===n.documentCodeId);return`
                                                <tr data-code-id="${n.documentCodeId}">
                                                    <td><strong>${Utils.escapeHTML(n.documentCode||r?.code||"")}</strong></td>
                                                    <td>${Utils.escapeHTML(n.versionNumber||"")}</td>
                                                    <td>${n.issueDate?Utils.formatDate(n.issueDate):"-"}</td>
                                                    <td>${n.revisionDate?Utils.formatDate(n.revisionDate):"-"}</td>
                                                    <td>
                                                        <span class="badge badge-${n.isActive===!0||n.isActive==="true"?"success":"secondary"}">
                                                            ${n.isActive===!0||n.isActive==="true"?"\u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button onclick="ISO.editDocumentVersion('${n.id}')" class="btn-icon btn-icon-info" title="\u062A\u0639\u062F\u064A\u0644">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                        <button onclick="ISO.reissueDocument('${n.id}')" class="btn-icon btn-icon-warning" title="\u0625\u0639\u0627\u062F\u0629 \u0625\u0635\u062F\u0627\u0631">
                                                            <i class="fas fa-redo"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            `}).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;return e&&e.returnStatus?{html:c,timedOut:d}:c},async reloadCodingCenter(){const e=document.getElementById("iso-content");if(e)try{Loading.show(),this.currentTab="coding-center";const t=await this.renderCodingCenter({returnStatus:!0}),s=t&&typeof t=="object"&&t.html!==void 0?t.html:t;e.innerHTML=s,!(t&&typeof t=="object"&&t.timedOut===!0)&&typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(t){Utils.safeError("Error reloading coding center:",t),typeof Notification<"u"&&Notification.error("\u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644: "+(t&&t.message?t.message:""))}finally{Loading.hide()}},async exportCodingCenterToExcel(){try{if(typeof XLSX>"u"){typeof Notification<"u"&&Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}Loading.show();const[e,t]=await Promise.all([GoogleIntegration.fetchData("getDocumentCodes",{}).catch(()=>({success:!1,data:[]})),GoogleIntegration.fetchData("getDocumentVersions",{documentCodeId:null}).catch(()=>({success:!1,data:[]}))]),s=e&&e.success&&e.data?e.data:[],a=t&&t.success&&t.data?t.data:[];if(s.length===0&&a.length===0){typeof Notification<"u"&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"),Loading.hide();return}const i=XLSX.utils.book_new();if(s.length>0){const d=["\u0627\u0644\u0643\u0648\u062F","\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F","\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F","\u0627\u0644\u0642\u0633\u0645","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u0648\u0635\u0641","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u062F\u064A\u062B","\u0623\u0646\u0634\u0626 \u0628\u0648\u0627\u0633\u0637\u0629"],l=s.map(n=>[n.code||"",n.documentName||"",n.documentType||"",n.department||"",n.status||"",n.description||"",n.createdAt?typeof n.createdAt=="string"?n.createdAt:new Date(n.createdAt).toISOString():"",n.updatedAt?typeof n.updatedAt=="string"?n.updatedAt:new Date(n.updatedAt).toISOString():"",n.createdBy||""]),c=XLSX.utils.aoa_to_sheet([d,...l]);XLSX.utils.book_append_sheet(i,c,"\u0623\u0643\u0648\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A")}if(a.length>0){const d=["\u0643\u0648\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F","\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631","\u0646\u0634\u0637","\u0627\u0644\u062D\u0627\u0644\u0629","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],l={};s.forEach(r=>{l[r.id]=r.code});const c=a.map(r=>[l[r.documentCodeId]||r.documentCodeId||"",r.versionNumber||"",r.issueDate?typeof r.issueDate=="string"?r.issueDate:new Date(r.issueDate).toISOString().slice(0,10):"",r.isActive===!0||r.isActive==="true"?"\u0646\u0639\u0645":"\u0644\u0627",r.status||"",r.notes||""]),n=XLSX.utils.aoa_to_sheet([d,...c]);XLSX.utils.book_append_sheet(i,n,"\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A")}const o="\u0645\u0631\u0643\u0632_\u0627\u0644\u062A\u0643\u0648\u064A\u062F_\u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631_"+new Date().toISOString().slice(0,10)+".xlsx";XLSX.writeFile(i,o),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(e){Utils.safeError("\u062A\u0635\u062F\u064A\u0631 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0625\u0644\u0649 Excel:",e),typeof Notification<"u"&&Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(e.message||e))}finally{Loading.hide()}},async exportCodingCenterToPDF(){try{Loading.show();const[e,t]=await Promise.all([GoogleIntegration.fetchData("getDocumentCodes",{}).catch(()=>({success:!1,data:[]})),GoogleIntegration.fetchData("getDocumentVersions",{documentCodeId:null}).catch(()=>({success:!1,data:[]}))]),s=e&&e.success&&e.data?e.data:[],a=t&&t.success&&t.data?t.data:[];if(s.length===0&&a.length===0){typeof Notification<"u"&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"),Loading.hide();return}if(typeof window.jsPDF>"u"){typeof Notification<"u"&&Notification.error("\u0645\u0643\u062A\u0628\u0629 PDF \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}const{jsPDF:i}=window.jsPDF,o=new i("l","mm","a4"),d=o.internal.pageSize.getWidth(),l=o.internal.pageSize.getHeight(),c=new Date().toLocaleDateString("ar-EG",{dateStyle:"medium"});o.setFontSize(14),o.setFont(void 0,"bold"),o.text("\u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631 - \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A",d/2,14,{align:"center"}),o.setFont(void 0,"normal"),o.setFontSize(9),o.text("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+c,d/2,21,{align:"center"});let n=28;if(s.length>0){o.setFontSize(10),o.setFont(void 0,"bold"),o.text("\u0623\u0643\u0648\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A",14,n),o.setFont(void 0,"normal"),n+=6;const r=["\u0627\u0644\u0643\u0648\u062F","\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F","\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F","\u0627\u0644\u0642\u0633\u0645","\u0627\u0644\u062D\u0627\u0644\u0629"],m=s.map(u=>[String(u.code||""),String(u.documentName||"").substring(0,25),String(u.documentType||""),String(u.department||""),String(u.status||"")]);typeof o.autoTable<"u"?(o.autoTable({head:[r],body:m,startY:n,styles:{fontSize:7,cellPadding:2},headStyles:{fillColor:[37,99,235],textColor:255},margin:{left:8,right:8}}),n=o.lastAutoTable.finalY+10):n+=20}if(a.length>0&&n<l-40){o.setFontSize(10),o.setFont(void 0,"bold"),o.text("\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A",14,n),o.setFont(void 0,"normal"),n+=6;const r={};s.forEach(v=>{r[v.id]=v.code});const m=["\u0643\u0648\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F","\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631","\u0646\u0634\u0637","\u0627\u0644\u062D\u0627\u0644\u0629"],u=a.slice(0,30).map(v=>[String(r[v.documentCodeId]||""),String(v.versionNumber||""),String(v.issueDate||"").slice(0,10),v.isActive===!0||v.isActive==="true"?"\u0646\u0639\u0645":"\u0644\u0627",String(v.status||"")]);typeof o.autoTable<"u"&&o.autoTable({head:[m],body:u,startY:n,styles:{fontSize:7,cellPadding:2},headStyles:{fillColor:[34,197,94],textColor:255},margin:{left:8,right:8}})}o.setFontSize(8),o.setTextColor(128,128,128),o.text("\u2014 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u2014 "+c,d/2,l-10,{align:"center"}),o.save("\u0645\u0631\u0643\u0632_\u0627\u0644\u062A\u0643\u0648\u064A\u062F_\u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631_"+new Date().toISOString().slice(0,10)+".pdf"),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 PDF \u0628\u0646\u062C\u0627\u062D")}catch(e){Utils.safeError("\u062A\u0635\u062F\u064A\u0631 \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0625\u0644\u0649 PDF:",e),typeof Notification<"u"&&Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(e.message||e))}finally{Loading.hide()}},importCodingCenterFromExcel(){const e=document.createElement("input");e.type="file",e.accept=".xlsx,.xls,.csv",e.style.display="none",e.onchange=async t=>{const s=t.target&&t.target.files&&t.target.files[0];if(!s)return;const a=(s.name||"").toLowerCase();try{Loading.show();let i=[];if(a.endsWith(".csv")){const l=await new Promise((f,p)=>{const b=new FileReader;b.onload=()=>f(b.result),b.onerror=p,b.readAsText(s,"UTF-8")}),c=l.split(/\r?\n/).filter(f=>f.trim()),n=l.indexOf("	")>=0?"	":l.indexOf(";")>=0?";":",",r=c[0]?c[0].split(n).map(f=>f.trim()):[],m=r.findIndex(f=>/كود|code/i.test(f)),u=r.findIndex(f=>/اسم|name|document/i.test(f)),v=r.findIndex(f=>/نوع|type/i.test(f)),h=r.findIndex(f=>/قسم|department/i.test(f)),y=r.findIndex(f=>/حالة|status/i.test(f)),S=r.findIndex(f=>/وصف|description/i.test(f));for(let f=1;f<c.length;f++){const p=c[f].split(n),b=(m>=0?p[m]:p[0])||"",g=(u>=0?p[u]:p[1])||"";String(b).trim()&&i.push({code:String(b).trim(),documentName:String(g).trim()||String(b).trim(),documentType:v>=0?(p[v]||"").trim():"\u0648\u062B\u064A\u0642\u0629",department:h>=0?(p[h]||"").trim():"",status:y>=0?(p[y]||"").trim():"\u0646\u0634\u0637",description:S>=0?(p[S]||"").trim():""})}}else{if(typeof XLSX>"u"){typeof Notification<"u"&&Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}const l=await new Promise((p,b)=>{const g=new FileReader;g.onload=()=>p(g.result),g.onerror=b,g.readAsArrayBuffer(s)}),c=XLSX.read(l,{type:"array"}),n=c.SheetNames[0]?c.Sheets[c.SheetNames[0]]:null;if(!n){Loading.hide();return}const r=XLSX.utils.sheet_to_json(n,{header:1});if(!r||r.length<2){Loading.hide(),Notification&&Notification.warning("\u0627\u0644\u0645\u0644\u0641 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0635\u0641\u0648\u0641 \u0628\u064A\u0627\u0646\u0627\u062A.");return}const m=(r[0]||[]).map(p=>String(p).trim()),u=m.findIndex(p=>/كود|code/i.test(p)),v=m.findIndex(p=>/اسم|name|document/i.test(p)),h=m.findIndex(p=>/نوع|type/i.test(p)),y=m.findIndex(p=>/قسم|department/i.test(p)),S=m.findIndex(p=>/حالة|status/i.test(p)),f=m.findIndex(p=>/وصف|description/i.test(p));for(let p=1;p<r.length;p++){const b=r[p]||[],g=u>=0?b[u]:b[0],D=v>=0?b[v]:b[1],x=g!=null&&g!==void 0?String(g).trim():"";x&&i.push({code:x,documentName:D!=null&&D!==void 0?String(D).trim():x,documentType:h>=0?String(b[h]||"").trim():"\u0648\u062B\u064A\u0642\u0629",department:y>=0?String(b[y]||"").trim():"",status:S>=0?String(b[S]||"").trim():"\u0646\u0634\u0637",description:f>=0?String(b[f]||"").trim():""})}}if(i.length===0){typeof Notification<"u"&&Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0635\u0641\u0648\u0641 \u0635\u0627\u0644\u062D\u0629 (\u064A\u062C\u0628 \u0648\u062C\u0648\u062F \u0639\u0645\u0648\u062F \u0627\u0644\u0643\u0648\u062F)."),Loading.hide();return}let o=0,d=0;for(const l of i)try{const c=await GoogleIntegration.fetchData("addDocumentCode",{code:l.code,documentName:l.documentName,documentType:l.documentType,department:l.department,status:l.status,description:l.description});c&&c.success?o++:d++}catch{d++}typeof Notification<"u"&&Notification.success("\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F "+o+" \u0643\u0648\u062F\u0627\u064B. \u0641\u0634\u0644: "+d+" (\u0642\u062F \u064A\u0643\u0648\u0646 \u0628\u0633\u0628\u0628 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0643\u0648\u062F)."),this.reloadCodingCenter()}catch(i){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0645\u0646 Excel:",i),typeof Notification<"u"&&Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+(i.message||i))}finally{Loading.hide()}e.value=""},document.body.appendChild(e),e.click(),setTimeout(()=>e.remove(),500)},importCodingCenterFromPDF(){typeof Notification<"u"&&Notification.warning("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0646\u0638\u0645\u0629 \u0645\u0646 \u0645\u0644\u0641 PDF \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u062D\u0627\u0644\u064A\u0627\u064B. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0644\u0641 Excel \u0623\u0648 CSV \u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0643\u0648\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A.")},async showDocumentCodeForm(e=null){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0643\u0648\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F":"\u0625\u0636\u0627\u0641\u0629 \u0643\u0648\u062F \u0645\u0633\u062A\u0646\u062F \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="document-code-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0648\u062F *</label>
                            <input type="text" id="doc-code" required class="form-input" 
                                value="${Utils.escapeHTML(e?.code||"")}" 
                                placeholder="\u0645\u062B\u0627\u0644: DOC-001, FORM-002">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F / \u0627\u0644\u0625\u062C\u0631\u0627\u0621 *</label>
                            <input type="text" id="doc-name" required class="form-input" 
                                value="${Utils.escapeHTML(e?.documentName||"")}" 
                                placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F *</label>
                            <select id="doc-type" required class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                <option value="\u0648\u062B\u064A\u0642\u0629" ${e?.documentType==="\u0648\u062B\u064A\u0642\u0629"?"selected":""}>\u0648\u062B\u064A\u0642\u0629</option>
                                <option value="\u0625\u062C\u0631\u0627\u0621" ${e?.documentType==="\u0625\u062C\u0631\u0627\u0621"?"selected":""}>\u0625\u062C\u0631\u0627\u0621</option>
                                <option value="\u0646\u0645\u0648\u0630\u062C" ${e?.documentType==="\u0646\u0645\u0648\u0630\u062C"?"selected":""}>\u0646\u0645\u0648\u0630\u062C</option>
                                <option value="\u062A\u0642\u0631\u064A\u0631" ${e?.documentType==="\u062A\u0642\u0631\u064A\u0631"?"selected":""}>\u062A\u0642\u0631\u064A\u0631</option>
                                <option value="\u0633\u062C\u0644" ${e?.documentType==="\u0633\u062C\u0644"?"selected":""}>\u0633\u062C\u0644</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 *</label>
                            <input type="text" id="doc-department" required class="form-input" 
                                value="${Utils.escapeHTML(e?.department||"")}" 
                                placeholder="\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                            <select id="doc-status" required class="form-input">
                                <option value="\u0646\u0634\u0637" ${e?.status==="\u0646\u0634\u0637"?"selected":""}>\u0646\u0634\u0637</option>
                                <option value="\u0645\u0639\u0637\u0644" ${e?.status==="\u0645\u0639\u0637\u0644"?"selected":""}>\u0645\u0639\u0637\u0644</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641</label>
                            <textarea id="doc-description" class="form-input" rows="3" 
                                placeholder="\u0648\u0635\u0641 \u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0644\u0644\u0645\u0633\u062A\u0646\u062F">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-doc-code-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#save-doc-code-btn").addEventListener("click",()=>this.handleDocumentCodeSubmit(e?.id,t)),t.addEventListener("click",a=>{a.target===t&&t.remove()})},async handleDocumentCodeSubmit(e=null,t){const s=document.getElementById("doc-code"),a=document.getElementById("doc-name"),i=document.getElementById("doc-type"),o=document.getElementById("doc-department"),d=document.getElementById("doc-status"),l=document.getElementById("doc-description");if(!s||!a||!i||!o||!d){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const c=s.value.trim(),n=a.value.trim();if(!c){Notification.error("\u062D\u0642\u0644 \u0627\u0644\u0643\u0648\u062F \u0645\u0637\u0644\u0648\u0628.");return}if(!n){Notification.error("\u062D\u0642\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F / \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u0637\u0644\u0648\u0628.");return}const r={id:e||Utils.generateId("DOC_CODE"),code:c,documentName:n,documentType:i.value,department:o.value.trim(),status:d.value,description:l?.value.trim()||"",createdAt:e?(await this.getDocumentCodeById(e))?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?.name||AppState.currentUser?.email||"System"};Loading.show();try{const m=e?"updateDocumentCode":"addDocumentCode",u=await GoogleIntegration.fetchData(m,r);if(u.success)Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0643\u0648\u062F \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0643\u0648\u062F \u0628\u0646\u062C\u0627\u062D"),t.remove(),this.load();else{const v=u.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638";Notification.error(u.errorCode==="DUPLICATE_CODE"?"\u0643\u0648\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B. \u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0643\u0648\u062F \u0641\u0631\u064A\u062F (\u0645\u062B\u0644: DOC-001\u060C FORM-002).":v)}}catch(m){const u=m&&m.message?String(m.message):"";u.indexOf("\u063A\u064A\u0631 \u0645\u0639\u062A\u0631\u0641 \u0628\u0647")!==-1||u.indexOf("ACTION_NOT_RECOGNIZED")!==-1?Notification.error("\u0627\u0644\u062E\u0627\u062F\u0645 \u0644\u0627 \u064A\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0639\u0645\u0644\u064A\u0629 \u0625\u0636\u0627\u0641\u0629 \u0643\u0648\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F. \u062A\u0623\u0643\u062F \u0645\u0646: 1) \u062A\u062D\u062F\u064A\u062B \u0645\u0644\u0641\u0627\u062A Code.gs \u0648 ISO.gs \u0648 Headers.gs \u0648 Config.gs \u0641\u064A \u0645\u0634\u0631\u0648\u0639 Google Apps Script. 2) \u0646\u0634\u0631 \u0646\u0633\u062E\u0629 \u062C\u062F\u064A\u062F\u0629 (Deploy \u2192 Manage deployments \u2192 Edit \u2192 New version \u2192 Deploy). 3) \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0630\u064A \u064A\u0646\u062A\u0647\u064A \u0628\u0640 /exec \u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A."):Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+u)}finally{Loading.hide()}},async getDocumentCodeById(e){try{const t=await GoogleIntegration.fetchData("getDocumentCodes",{});if(t.success&&t.data)return t.data.find(s=>s.id===e)}catch(t){Utils.safeError("Error getting document code:",t)}return null},async editDocumentCode(e){const t=await this.getDocumentCodeById(e);t?this.showDocumentCodeForm(t):Notification.error("\u0627\u0644\u0643\u0648\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")},async deleteDocumentCode(e){const t=await this.getDocumentCodeById(e),s=t&&(t.code||t.documentName)||e;if(confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0643\u0648\u062F "'+s+'"\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647.')){Loading.show();try{const a=await GoogleIntegration.fetchData("deleteDocumentCode",{id:e});a.success?(Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0643\u0648\u062F \u0628\u0646\u062C\u0627\u062D"),this.load()):Notification.error(a.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641")}catch(a){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+a.message)}finally{Loading.hide()}}},async showDocumentVersionForm(e=null,t=null){let s=[];try{const o=await GoogleIntegration.fetchData("getDocumentCodes",{});o.success&&o.data&&(s=o.data)}catch(o){Utils.safeError("Error loading codes:",o)}const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0645\u0633\u062A\u0646\u062F":"\u0625\u0636\u0627\u0641\u0629 \u0625\u0635\u062F\u0627\u0631 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="document-version-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0643\u0648\u062F \u0627\u0644\u0645\u0633\u062A\u0646\u062F *</label>
                            <select id="version-code-id" required class="form-input" ${e?"disabled":""}>
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0643\u0648\u062F</option>
                                ${s.map(o=>`
                                    <option value="${o.id}" 
                                        ${e?.documentCodeId===o.id||t===o.id?"selected":""}>
                                        ${Utils.escapeHTML(o.code||"")} - ${Utils.escapeHTML(o.documentName||"")}
                                    </option>
                                `).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 *</label>
                            <input type="text" id="version-number" required class="form-input" 
                                value="${Utils.escapeHTML(e?.versionNumber||"")}" 
                                placeholder="\u0645\u062B\u0627\u0644: 1.0, 2.1">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631 *</label>
                            <input type="date" id="version-issue-date" required class="form-input" 
                                value="${e?.issueDate?new Date(e.issueDate).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644</label>
                            <input type="date" id="version-revision-date" class="form-input" 
                                value="${e?.revisionDate?new Date(e.revisionDate).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="version-status" class="form-input">
                                <option value="\u0646\u0634\u0637" ${e?.status==="\u0646\u0634\u0637"?"selected":""}>\u0646\u0634\u0637</option>
                                <option value="\u0645\u0639\u0637\u0644" ${e?.status==="\u0645\u0639\u0637\u0644"?"selected":""}>\u0645\u0639\u0637\u0644</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                            <textarea id="version-notes" class="form-input" rows="3" 
                                placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0648\u0644 \u0647\u0630\u0627 \u0627\u0644\u0625\u0635\u062F\u0627\u0631">${Utils.escapeHTML(e?.notes||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-version-btn" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(a),a.querySelector("#save-version-btn").addEventListener("click",()=>this.handleDocumentVersionSubmit(e?.id,a)),a.addEventListener("click",o=>{o.target===a&&a.remove()})},async handleDocumentVersionSubmit(e=null,t){const s=document.getElementById("version-code-id"),a=document.getElementById("version-number"),i=document.getElementById("version-issue-date"),o=document.getElementById("version-revision-date"),d=document.getElementById("version-status"),l=document.getElementById("version-notes");if(!s||!a||!i||!d){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const c=s.value,n=await this.getDocumentCodeById(c),r={id:e||Utils.generateId("DOC_VER"),documentCodeId:c,documentCode:n?.code||"",versionNumber:a.value.trim(),issueDate:new Date(i.value).toISOString(),revisionDate:o?.value?new Date(o.value).toISOString():null,status:d.value,notes:l?.value.trim()||"",isActive:d.value==="\u0646\u0634\u0637",createdAt:e?(await this.getDocumentVersionById(e))?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?.name||AppState.currentUser?.email||"System"};Loading.show();try{const m=e?"updateDocumentVersion":"addDocumentVersion",u=await GoogleIntegration.fetchData(m,r);u.success?(Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0628\u0646\u062C\u0627\u062D"),t.remove(),this.load()):Notification.error(u.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")}catch(m){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+m.message)}finally{Loading.hide()}},async getDocumentVersionById(e){try{const t=await GoogleIntegration.fetchData("getDocumentVersions",{documentCodeId:null});if(t.success&&t.data)return t.data.find(s=>s.id===e)}catch(t){Utils.safeError("Error getting document version:",t)}return null},async editDocumentVersion(e){const t=await this.getDocumentVersionById(e);t?this.showDocumentVersionForm(t):Notification.error("\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")},async viewDocumentVersions(e){try{Loading.show();const t=await GoogleIntegration.fetchData("getDocumentVersions",{documentCodeId:e});if(Loading.hide(),!t.success||!t.data){Notification.error("\u0641\u0634\u0644 \u062C\u0644\u0628 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A");return}const s=t.data,a=await this.getDocumentCodeById(e),i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h2 class="modal-title">\u0625\u0635\u062F\u0627\u0631\u0627\u062A: ${Utils.escapeHTML(a?.code||"")} - ${Utils.escapeHTML(a?.documentName||"")}</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-4">
                            <button class="btn-primary" onclick="ISO.showDocumentVersionForm(null, '${e}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0625\u0635\u062F\u0627\u0631 \u062C\u062F\u064A\u062F
                            </button>
                        </div>
                        ${s.length===0?`
                            <div class="empty-state">
                                <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F</p>
                            </div>
                        `:`
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644</th>
                                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${s.map(o=>`
                                        <tr>
                                            <td><strong>${Utils.escapeHTML(o.versionNumber||"")}</strong></td>
                                            <td>${o.issueDate?Utils.formatDate(o.issueDate):"-"}</td>
                                            <td>${o.revisionDate?Utils.formatDate(o.revisionDate):"-"}</td>
                                            <td>
                                                <span class="badge badge-${o.isActive===!0||o.isActive==="true"?"success":"secondary"}">
                                                    ${o.isActive===!0||o.isActive==="true"?"\u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637"}
                                                </span>
                                            </td>
                                            <td>${Utils.escapeHTML(o.notes||"-")}</td>
                                            <td>
                                                <button onclick="ISO.editDocumentVersion('${o.id}'); this.closest('.modal-overlay').remove();" 
                                                    class="btn-icon btn-icon-info" title="\u062A\u0639\u062F\u064A\u0644">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        `}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    </div>
                </div>
            `,document.body.appendChild(i),i.addEventListener("click",o=>{o.target===i&&i.remove()})}catch(t){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}},async reissueDocument(e){const t=await this.getDocumentVersionById(e);if(!t){Notification.error("\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0648\u0641\u062A\u062D \u0625\u0635\u062F\u0627\u0631 \u062C\u062F\u064A\u062F\u061F")&&this.showDocumentVersionForm(null,t.documentCodeId)},filterDocumentCodes(){const e=document.getElementById("document-code-search")?.value.toLowerCase()||"";document.querySelectorAll("#document-codes-table-body tr").forEach(s=>{const a=s.textContent.toLowerCase();s.style.display=a.includes(e)?"":"none"})},filterDocumentVersions(){const e=document.getElementById("version-filter-code")?.value||"";document.querySelectorAll("#document-versions-table-body tr").forEach(s=>{const a=s.getAttribute("data-code-id")||"";s.style.display=!e||a===e?"":"none"})},async loadDocumentCodeVersion(e="document",t=null){try{const s=e==="document"?"document-code-select":e==="procedure"?"procedure-code-select":"form-code-select",a=e==="document"?"document-version":e==="procedure"?"procedure-version":"form-version",i=e==="document"?"document-issue-date":e==="procedure"?"procedure-issue-date":"form-issue-date",o=e==="document"?"document-revision-date":e==="procedure"?"procedure-revision-date":"form-revision-date",d=document.getElementById(s),l=t||d?.value||"";if(!l){const n=document.getElementById(a),r=document.getElementById(i),m=document.getElementById(o);n&&(n.value=""),r&&(r.value=""),m&&(m.value="");return}Loading.show();const c=await GoogleIntegration.fetchData("getDocumentCodeAndVersion",{documentCode:l});if(Loading.hide(),c.success&&c.version){const n=document.getElementById(a),r=document.getElementById(i),m=document.getElementById(o);n&&(n.value=c.version.versionNumber||""),r&&(r.value=c.version.issueDate?Utils.formatDate(c.version.issueDate):""),m&&(m.value=c.version.revisionDate?Utils.formatDate(c.version.revisionDate):""),Notification.success("\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u0631\u0643\u0632")}else if(c.success&&c.code){const n=document.getElementById(a);n&&(n.value="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),Notification.warning("\u0627\u0644\u0643\u0648\u062F \u0645\u0648\u062C\u0648\u062F \u0648\u0644\u0643\u0646 \u0644\u0627 \u064A\u0648\u062C\u062F \u0625\u0635\u062F\u0627\u0631 \u0646\u0634\u0637 \u0641\u064A \u0627\u0644\u0645\u0631\u0643\u0632")}else Notification.error("\u0627\u0644\u0643\u0648\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0643\u0648\u064A\u062F \u0648\u0627\u0644\u0625\u0635\u062F\u0627\u0631")}catch(s){Loading.hide(),Utils.safeError("Error loading document code version:",s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u062F\u0627\u0631: "+s.message)}}};(function(){"use strict";try{typeof window<"u"&&typeof ISO<"u"&&(window.ISO=ISO,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 ISO module loaded and available on window.ISO"))}catch{if(typeof window<"u"&&typeof ISO<"u")try{window.ISO=ISO}catch{}}})();
