const SOPJHA={async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);try{const s=document.getElementById("sop-jha-section");if(!s){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0642\u0633\u0645 sop-jha-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM"),setTimeout(()=>{document.getElementById("sop-jha-section")?this.load():typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0641\u0634\u0644 \u0641\u064A \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0642\u0633\u0645 sop-jha-section \u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")},500);return}s.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-file-contract ml-3"></i>
                                \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 SOP-JHA
                            </h1>
                            <p class="section-subtitle">\u0625\u062F\u0627\u0631\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0622\u0645\u0646\u0629 (SOP/JHA)</p>
                        </div>
                        <button id="add-sop-jha-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u062C\u062F\u064A\u062F\u0629
                        </button>
                    </div>
                </div>
                <div id="sop-jha-content" class="mt-6">
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title"><i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629</h2>
                        </div>
                        <div class="card-body">
                            <div id="sop-jha-table-container">
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
                </div>
            `,this.setupEventListeners();try{setTimeout(()=>{this.loadSOPJHAList().catch(e=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 SOP-JHA \u0627\u0644\u0623\u0648\u0644\u064A:",e);const t=document.getElementById("sop-jha-table-container");t&&(t.innerHTML=`
                                <div class="empty-state">
                                    <i class="fas fa-exclamation-triangle text-4xl text-yellow-400 mb-4"></i>
                                    <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                    <p class="text-sm text-gray-400 mt-2">${e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                    <button onclick="SOPJHA.load()" class="btn-primary mt-4">
                                        <i class="fas fa-redo ml-2"></i>
                                        \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                    </button>
                                </div>
                            `)})},0)}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 SOP-JHA:",e);const t=document.getElementById("sop-jha-table-container");t&&(t.innerHTML=`
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-4xl text-yellow-400 mb-4"></i>
                            <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <p class="text-sm text-gray-400 mt-2">${e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                            <button onclick="SOPJHA.load()" class="btn-primary mt-4">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    `)}}catch(s){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0648\u062F\u064A\u0648\u0644 SOP-JHA:",s);const e=document.getElementById("sop-jha-section");e&&(e.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <p class="text-sm text-gray-400 mb-4">${s&&s.message?Utils.escapeHTML(s.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                <button onclick="SOPJHA.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 SOP-JHA. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",{duration:5e3})}},async renderList(){return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629</h2>
                </div>
                <div class="card-body">
                    <div id="sop-jha-table-container">
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
        `},async loadSOPJHAList(){const s=document.getElementById("sop-jha-table-container");if(!s){Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 sop-jha-table-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(typeof AppState>"u"||!AppState.appData){Utils.safeError("\u274C AppState \u063A\u064A\u0631 \u0645\u062A\u0627\u062D"),s.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                    <p class="text-gray-500">\u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0646\u0638\u0627\u0645</p>
                    <button onclick="location.reload()" class="btn-primary mt-4">
                        <i class="fas fa-redo ml-2"></i>
                        \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629
                    </button>
                </div>
            `;return}AppState.appData.sopJHA||(AppState.appData.sopJHA=[]);const e=AppState.appData.sopJHA||[];if(e.length===0&&typeof GoogleIntegration<"u"&&GoogleIntegration.readFromSheets&&GoogleIntegration.readFromSheets("SOPJHA").then(t=>{t&&Array.isArray(t)&&t.length>0&&(AppState.appData.sopJHA=t,this.loadSOPJHAList())}).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A SOPJHA \u0645\u0646 Google Sheets:",t)}),e.length===0){s.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-file-contract text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0633\u0644\u0627\u0645\u0629</p>
                    <button id="add-sop-jha-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u062C\u062F\u064A\u062F\u0629
                    </button>
                </div>
            `,setTimeout(()=>{const t=document.getElementById("add-sop-jha-empty-btn");t&&t.addEventListener("click",()=>this.showForm())},100);return}s.innerHTML=`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0646\u0648\u0639</th>
                            <th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th>
                            <th>\u0627\u0644\u0642\u0633\u0645</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(t=>`
                            <tr>
                                <td>
                                    <span class="badge badge-${t.type==="SOP"?"info":"warning"}">
                                        ${t.type||"SOP"}
                                    </span>
                                </td>
                                <td>${Utils.escapeHTML(t.title||"")}</td>
                                <td>${Utils.escapeHTML(t.department||"")}</td>
                                <td>${t.issueDate?Utils.formatDate(t.issueDate):"-"}</td>
                                <td>
                                    <span class="badge badge-${t.status==="\u0646\u0634\u0637"?"success":"warning"}">
                                        ${t.status||"-"}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button onclick="SOPJHA.viewSOPJHA('${t.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button onclick="SOPJHA.exportPDF('${t.id}')" class="btn-icon btn-icon-success" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                                            <i class="fas fa-file-pdf"></i>
                                        </button>
                                        <button onclick="SOPJHA.editSOPJHA('${t.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="SOPJHA.deleteSOPJHA('${t.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},setupEventListeners(){setTimeout(()=>{const s=document.getElementById("add-sop-jha-btn"),e=document.getElementById("add-sop-jha-empty-btn");s&&s.addEventListener("click",()=>this.showForm()),e&&e.addEventListener("click",()=>this.showForm())},100)},async showForm(s=null){const e=!!s,t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629":"\u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0633\u0644\u0627\u0645\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="sop-jha-form" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0646\u0648\u0639 *</label>
                                <select id="sop-type" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                    <option value="SOP" ${s?.type==="SOP"?"selected":""}>SOP - \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0642\u064A\u0627\u0633\u064A\u0629</option>
                                    <option value="JHA" ${s?.type==="JHA"?"selected":""}>JHA - \u062A\u062D\u0644\u064A\u0644 \u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0639\u0646\u0648\u0627\u0646 *</label>
                                <input type="text" id="sop-title" required class="form-input"
                                    value="${Utils.escapeHTML(s?.title||"")}" placeholder="\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 *</label>
                                <input type="text" id="sop-department" required class="form-input"
                                    value="${Utils.escapeHTML(s?.department||"")}" placeholder="\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0639\u0646\u064A">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631 *</label>
                                <input type="date" id="sop-issue-date" required class="form-input"
                                    value="${s?.issueDate?new Date(s.issueDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                <select id="sop-status" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629</option>
                                    <option value="\u0646\u0634\u0637" ${s?.status==="\u0646\u0634\u0637"?"selected":""}>\u0646\u0634\u0637</option>
                                    <option value="\u0645\u0631\u0627\u062C\u0639\u0629" ${s?.status==="\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                    <option value="\u0645\u0646\u062A\u0647\u064A" ${s?.status==="\u0645\u0646\u062A\u0647\u064A"?"selected":""}>\u0645\u0646\u062A\u0647\u064A</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0646\u0633\u062E\u0629</label>
                                <input type="text" id="sop-version" class="form-input"
                                    value="${Utils.escapeHTML(s?.version||"1.0")}" placeholder="1.0">
                            </div>
                        </div>
                        
                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 / \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A *</label>
                            <textarea id="sop-procedures" required class="form-input" rows="8"
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0648\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A">${Utils.escapeHTML(s?.procedures||"")}</textarea>
                        </div>
                        
                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629</label>
                            <textarea id="sop-hazards" class="form-input" rows="4"
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629 \u0648\u0637\u0631\u0642 \u0627\u0644\u062A\u0639\u0627\u0645\u0644 \u0645\u0639\u0647\u0627">${Utils.escapeHTML(s?.hazards||"")}</textarea>
                        </div>
                        
                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629</label>
                            <div id="sop-ppe-matrix">
                                ${typeof PPEMatrix<"u"?PPEMatrix.generate("sop-ppe-matrix"):""}
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="submit" form="sop-jha-form" class="btn-primary">\u062D\u0641\u0638</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#sop-jha-form").addEventListener("submit",i=>{i.preventDefault(),this.handleSubmit(s?.id,t)}),t.addEventListener("click",i=>{i.target===t&&t.remove()})},async handleSubmit(s,e){const t=e?.querySelector('button[type="submit"]')||document.querySelector('.modal-overlay button[type="submit"]');if(t&&t.disabled)return;let a="";t&&(a=t.innerHTML,t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const i=document.getElementById("sop-type"),d=document.getElementById("sop-title"),l=document.getElementById("sop-department"),r=document.getElementById("sop-issue-date"),n=document.getElementById("sop-status"),c=document.getElementById("sop-version"),u=document.getElementById("sop-procedures"),m=document.getElementById("sop-hazards");if(!i||!d||!l||!r||!n||!c||!u||!m){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),t&&(t.disabled=!1,t.innerHTML=a);return}const p={id:s||Utils.generateId("SOP"),type:i.value,title:d.value.trim(),department:l.value.trim(),issueDate:new Date(r.value).toISOString(),status:n.value,version:c.value.trim(),procedures:u.value.trim(),hazards:m.value.trim(),requiredPPE:typeof PPEMatrix<"u"?PPEMatrix.getSelected():[],createdAt:s?AppState.appData.sopJHA?.find(o=>o.id===s)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.sopJHA||(AppState.appData.sopJHA=[]);try{if(s){const o=AppState.appData.sopJHA.findIndex(f=>f.id===s);o!==-1?AppState.appData.sopJHA[o]=p:AppState.appData.sopJHA.push(p),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.sopJHA.push(p),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),e.remove(),t&&(t.disabled=!1,t.innerHTML=a),this.load(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&GoogleIntegration.autoSave("SOPJHA",AppState.appData.sopJHA).catch(o=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",o)})}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A:",o),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+o.message),t&&(t.disabled=!1,t.innerHTML=a)}},async editSOPJHA(s){const e=AppState.appData.sopJHA?.find(t=>t.id===s);e?await this.showForm(e):Notification.error("\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629")},async viewSOPJHA(s){const e=AppState.appData.sopJHA?.find(a=>a.id===s);if(!e){Notification.error("\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e.type}: ${Utils.escapeHTML(e.title)}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(e.type||"")}</div>
                            <div><strong>\u0627\u0644\u0642\u0633\u0645:</strong> ${Utils.escapeHTML(e.department||"")}</div>
                            <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</strong> ${e.issueDate?Utils.formatDate(e.issueDate):"-"}</div>
                            <div><strong>\u0627\u0644\u0646\u0633\u062E\u0629:</strong> ${Utils.escapeHTML(e.version||"")}</div>
                            <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> 
                                <span class="badge badge-${e.status==="\u0646\u0634\u0637"?"success":"warning"}">
                                    ${e.status||"-"}
                                </span>
                            </div>
                        </div>
                        <div><strong>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A:</strong><br><div class="p-3 bg-gray-50 rounded">${Utils.escapeHTML(e.procedures||"")}</div></div>
                        ${e.hazards?`<div><strong>\u0627\u0644\u0645\u062E\u0627\u0637\u0631:</strong><br><div class="p-3 bg-red-50 rounded">${Utils.escapeHTML(e.hazards)}</div></div>`:""}
                        ${e.requiredPPE&&e.requiredPPE.length>0?`
                            <div><strong>\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:</strong><br>
                                ${e.requiredPPE.map(a=>`<span class="badge badge-info mr-2">${a}</span>`).join("")}
                            </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" onclick="SOPJHA.exportPDF('${e.id}');" class="btn-success">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button type="button" onclick="SOPJHA.editSOPJHA('${e.id}'); this.closest('.modal-overlay').remove();" class="btn-primary">\u062A\u0639\u062F\u064A\u0644</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.addEventListener("click",a=>{a.target===t&&t.remove()})},async deleteSOPJHA(s){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A\u061F")){Loading.show();try{AppState.appData.sopJHA||(AppState.appData.sopJHA=[]);const e=AppState.appData.sopJHA.length;if(AppState.appData.sopJHA=AppState.appData.sopJHA.filter(t=>t.id!==s),AppState.appData.sopJHA.length===e){Loading.hide(),Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0644\u0644\u062D\u0630\u0641");return}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("SOPJHA",AppState.appData.sopJHA),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),this.load()}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A:",e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+e.message)}}},async exportPDF(s){const e=AppState.appData.sopJHA?.find(t=>t.id===s);if(!e){Notification.error("\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}try{Loading.show();const t=e.isoCode||e.id?.substring(0,12)||"SOP-UNKNOWN",a=`${e.type}: ${e.title||"\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629"}`,i=`
                <table>
                    <tr><th>\u0627\u0644\u0646\u0648\u0639</th><td>${Utils.escapeHTML(e.type||"N/A")}</td></tr>
                    <tr><th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th><td>${Utils.escapeHTML(e.title||"N/A")}</td></tr>
                    <tr><th>\u0627\u0644\u0642\u0633\u0645</th><td>${Utils.escapeHTML(e.department||"N/A")}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th><td>${e.issueDate?Utils.formatDate(e.issueDate):"N/A"}</td></tr>
                    <tr><th>\u0627\u0644\u0646\u0633\u062E\u0629</th><td>${Utils.escapeHTML(e.version||"N/A")}</td></tr>
                    <tr><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><td>${Utils.escapeHTML(e.status||"N/A")}</td></tr>
                </table>
                <div class="section-title">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A / \u0627\u0644\u0648\u0635\u0641:</div>
                <div class="description">${Utils.escapeHTML(e.procedures||"N/A")}</div>
                ${e.hazards?`
                    <div class="section-title">\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629:</div>
                    <div class="description">${Utils.escapeHTML(e.hazards)}</div>
                `:""}
                ${e.requiredPPE&&e.requiredPPE.length>0?`
                    <div class="section-title">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:</div>
                    <table>
                        <tr>
                            <th>\u0646\u0648\u0639 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        </tr>
                        ${e.requiredPPE.map(c=>`
                            <tr>
                                <td>${Utils.escapeHTML(c)}</td>
                                <td>\u2713 \u0645\u0637\u0644\u0648\u0628</td>
                            </tr>
                        `).join("")}
                    </table>
                `:""}
            `,d=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(t,a,i,!0,!0):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>SOP/JHA</title></head><body>${i}</body></html>`,l=new Blob([d],{type:"text/html;charset=utf-8"}),r=URL.createObjectURL(l),n=window.open(r,"_blank");n?n.onload=()=>{setTimeout(()=>{n.print(),setTimeout(()=>{URL.revokeObjectURL(r),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},1e3)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+t.message)}}};(function(){"use strict";try{typeof window<"u"&&typeof SOPJHA<"u"&&(window.SOPJHA=SOPJHA,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 SOPJHA module loaded and available on window.SOPJHA"))}catch{if(typeof window<"u"&&typeof SOPJHA<"u")try{window.SOPJHA=SOPJHA}catch{}}})();
