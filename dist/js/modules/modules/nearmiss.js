const NearMiss={TYPES:[{value:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643"},{value:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646"},{value:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646"},{value:"\u062D\u0627\u062F\u062B",label:"\u062D\u0627\u062F\u062B"},{value:"\u0645\u0642\u062A\u0631\u062D",label:"\u0645\u0642\u062A\u0631\u062D"}],_i18nSectionObserver:null,_i18nBodyObserver:null,applyModuleI18n(e){const t=e||document,s=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;s&&(typeof s.applyI18n=="function"&&s.applyI18n(t),typeof s.applyLiteralTranslations=="function"&&s.applyLiteralTranslations(t))},ensureI18nObservers(e){this._i18nSectionObserver&&(this._i18nSectionObserver.disconnect(),this._i18nSectionObserver=null),e&&typeof MutationObserver<"u"&&(this._i18nSectionObserver=new MutationObserver(t=>{t.forEach(s=>{s.addedNodes.forEach(a=>{a&&a.nodeType===1&&this.applyModuleI18n(a)})})}),this._i18nSectionObserver.observe(e,{childList:!0,subtree:!0})),!this._i18nBodyObserver&&typeof MutationObserver<"u"&&(this._i18nBodyObserver=new MutationObserver(t=>{t.forEach(s=>{s.addedNodes.forEach(a=>{!a||a.nodeType!==1||(a.classList?.contains("modal-overlay")||a.querySelector?.(".modal-overlay"))&&this.applyModuleI18n(a)})})}),this._i18nBodyObserver.observe(document.body,{childList:!0,subtree:!0}))},state:{filters:{search:"",type:"",department:"",startDate:"",endDate:""},currentAttachments:[],editingId:null},processAttachmentUrl(e){if(!e||typeof e!="string")return null;let t=e.trim();const s=/https?:\/\/drive\.google\.com\/uc\?export=view&id=([a-zA-Z0-9_-]+)/,a=t.match(s);return a&&(t="https://lh3.googleusercontent.com/d/"+a[1]),t.startsWith("http://")||t.startsWith("https://")||t.startsWith("data:")?t:t.length>100&&/^[A-Za-z0-9+/=]+$/.test(t.substring(0,100))?"data:image/jpeg;base64,"+t:null},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);try{const e=document.getElementById("nearmiss-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 nearmiss-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}if(typeof Utils>"u")return;if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}this.ensureDataIntegrity();const t=s=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(s):String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");e.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-eye ml-3"></i>
                                \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629
                            </h1>
                            <p class="section-subtitle">\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0637\u0627\u0631\u0626\u0629 \u0648\u062A\u0639\u0632\u064A\u0632 \u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</p>
                        </div>
                        <div class="flex gap-2">
                            <button id="add-nearmiss-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                \u062A\u0633\u062C\u064A\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u062F\u064A\u062F\u0629
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-6 space-y-6">
                    <div id="nearmiss-summary" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-filter ml-2"></i>
                                \u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629
                            </h2>
                        </div>
                        <div class="card-body">
                            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                                <div>
                                    <label class="block text-xs font-semibold text-gray-600 mb-2">\u0628\u062D\u062B \u062D\u0631</label>
                                    <input type="text" id="nearmiss-filter-search" class="form-input" placeholder="\u0627\u0644\u0646\u0648\u0639\u060C \u0627\u0644\u0645\u0648\u0642\u0639\u060C \u0627\u0644\u0648\u0635\u0641 \u0623\u0648 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629" value="${t(this.state.filters.search)}">
                                </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</label>
                                <select id="nearmiss-filter-type" class="form-input">
                                    ${this.renderTypeOptions(this.state.filters.type)}
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-2">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                                <select id="nearmiss-filter-department" class="form-input">
                                    ${this.renderDepartmentOptions(this.state.filters.department)}
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-2">\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629</label>
                                <input type="date" id="nearmiss-filter-start" class="form-input" value="${this.state.filters.startDate}">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-2">\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629</label>
                                <input type="date" id="nearmiss-filter-end" class="form-input" value="${this.state.filters.endDate}">
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-3 mt-4">
                            <button id="nearmiss-reset-filters" class="btn-link text-blue-600">
                                <i class="fas fa-undo ml-1"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646
                            </button>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between flex-wrap gap-3">
                            <h2 class="card-title">
                                <i class="fas fa-clipboard-list ml-2"></i>
                                \u0633\u062C\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </h2>
                            <span id="nearmiss-result-count" class="text-sm text-gray-500"></span>
                        </div>
                    </div>
                    <div class="card-body" id="nearmiss-table-container">
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
            `,this.applyModuleI18n(e),this.ensureI18nObservers(e),this.bindBaseEvents(),this.updateSummary(),this.renderTable()}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629:",e);const t=document.getElementById("nearmiss-section");t&&(t.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="NearMiss.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(t))}},ensureDataIntegrity(){Array.isArray(AppState.appData.nearmiss)||(AppState.appData.nearmiss=[]),AppState.appData.nearmiss=AppState.appData.nearmiss.map(e=>this.normalizeRecord(e))},normalizeRecord(e={}){const t=this.TYPES[0].value,s=e.id||Utils.generateId("NEARMISS");let a;try{a=e.date?new Date(e.date).toISOString():new Date().toISOString()}catch{a=new Date().toISOString()}const d=Array.isArray(e.attachments)?e.attachments.map(r=>this.normalizeAttachment(r)).filter(Boolean):[],n=e.createdBy?e.createdBy:this.getCurrentUserSummary(e.createdBy),i=e.correctiveProposed===!0||e.correctiveAction===!0||e.correctiveProposal===!0||e.corrective===!0||e.suggestedAction===!0;return{id:s,type:this.TYPES.some(r=>r.value===e.type)?e.type:e.type||t,date:a,observerName:e.observerName||e.reportedBy||"",phone:e.phone||e.contactPhone||"",location:e.location||e.place||"",department:e.department||e.departmentName||"",description:e.description||e.details||e.title||"",correctiveProposed:i,correctiveDescription:i&&(e.correctiveDescription||e.correctiveDetails||e.suggestedActionDescription)||"",attachments:d,createdBy:n,createdById:e.createdById||n?.id||"",createdAt:e.createdAt||a,updatedAt:e.updatedAt||a,updatedBy:e.updatedBy||null,status:e.status||(i?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642"),reportedBy:e.reportedBy||e.observerName||""}},normalizeAttachment(e){if(!e)return null;const t=e.data||e.base64||"";if(!t)return null;const s=e.size||Math.round(t.length*3/4/1024);return{id:e.id||Utils.generateId("ATT"),name:e.name||"attachment",type:e.type||this.detectMimeType(e.name||""),data:t,size:s,uploadedAt:e.uploadedAt||new Date().toISOString()}},detectMimeType(e=""){const t=(e.split(".").pop()||"").toLowerCase();return t==="pdf"?"application/pdf":t==="png"?"image/png":t==="jpg"||t==="jpeg"?"image/jpeg":"application/octet-stream"},getCurrentUserSummary(e=null){return e&&typeof e=="object"?e:AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||"",email:AppState.currentUser.email||"",role:AppState.currentUser.role||""}:{name:"\u0646\u0638\u0627\u0645",email:"",role:""}},getDepartmentOptions(){const e=new Set;return(AppState.appData.nearmiss||[]).forEach(t=>{const s=(t.department||"").trim();s&&e.add(s)}),(AppState.appData.employees||[]).forEach(t=>{const s=(t.department||"").trim();s&&e.add(s)}),Array.from(e).sort((t,s)=>t.localeCompare(s,"ar"))},renderTypeOptions(e=""){const t=['<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>'];return this.TYPES.forEach(s=>{t.push(`<option value="${Utils.escapeHTML(s.value)}" ${s.value===e?"selected":""}>${Utils.escapeHTML(s.label)}</option>`)}),t.join("")},renderDepartmentOptions(e=""){const t=['<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>'];return this.getDepartmentOptions().forEach(s=>{t.push(`<option value="${Utils.escapeHTML(s)}" ${s===e?"selected":""}>${Utils.escapeHTML(s)}</option>`)}),t.join("")},bindBaseEvents(){const e=document.getElementById("add-nearmiss-btn");e&&e.addEventListener("click",()=>this.showForm());const t=document.getElementById("nearmiss-filter-search");t&&t.addEventListener("input",r=>this.handleFilterChange("search",r.target.value));const s=document.getElementById("nearmiss-filter-type");s&&s.addEventListener("change",r=>this.handleFilterChange("type",r.target.value));const a=document.getElementById("nearmiss-filter-department");a&&a.addEventListener("change",r=>this.handleFilterChange("department",r.target.value));const d=document.getElementById("nearmiss-filter-start");d&&d.addEventListener("change",r=>this.handleFilterChange("startDate",r.target.value));const n=document.getElementById("nearmiss-filter-end");n&&n.addEventListener("change",r=>this.handleFilterChange("endDate",r.target.value));const i=document.getElementById("nearmiss-reset-filters");i&&i.addEventListener("click",r=>{r.preventDefault(),this.resetFilters()})},handleFilterChange(e,t){if(!Object.prototype.hasOwnProperty.call(this.state.filters,e))return;const s=typeof t=="string"?t.trim():t;this.state.filters={...this.state.filters,[e]:s},this.renderTable()},resetFilters(){this.state.filters={search:"",type:"",department:"",startDate:"",endDate:""};const e=document.getElementById("nearmiss-filter-search");e&&(e.value="");const t=document.getElementById("nearmiss-filter-type");t&&(t.value="");const s=document.getElementById("nearmiss-filter-department");s&&(s.value="");const a=document.getElementById("nearmiss-filter-start");a&&(a.value="");const d=document.getElementById("nearmiss-filter-end");d&&(d.value=""),this.renderTable()},getFilteredItems(){this.ensureDataIntegrity();const{search:e,type:t,department:s,startDate:a,endDate:d}=this.state.filters;let n=(AppState.appData.nearmiss||[]).filter(i=>!!i);if(t&&(n=n.filter(i=>(i.type||"").toLowerCase()===t.toLowerCase())),s&&(n=n.filter(i=>(i.department||"").toLowerCase()===s.toLowerCase())),a){const i=new Date(a);i.setHours(0,0,0,0),n=n.filter(r=>new Date(r.date)>=i)}if(d){const i=new Date(d);i.setHours(23,59,59,999),n=n.filter(r=>new Date(r.date)<=i)}if(e){const i=e.toLowerCase();n=n.filter(r=>[r.type,r.location,r.department,r.observerName,r.phone,r.description,r.correctiveDescription].some(l=>l&&l.toLowerCase().includes(i)))}return n.sort((i,r)=>new Date(r.date)-new Date(i.date))},updateSummary(){const e=document.getElementById("nearmiss-summary");e&&(e.innerHTML=this.renderSummaryCards(),this.applyModuleI18n(e))},renderSummaryCards(){const e=AppState.appData.nearmiss||[],t=e.length,s=e.filter(o=>o.correctiveProposed).length,a=new Date,d=new Date(a.getFullYear(),a.getMonth(),1),n=e.filter(o=>new Date(o.date)>=d).length,i={};e.forEach(o=>{const c=(o.department||"").trim();c&&(i[c]=(i[c]||0)+1)});const r=Object.entries(i).sort((o,c)=>c[1]-o[1])[0],l=r?`${Utils.escapeHTML(r[0])} (${r[1]})`:"\u0644\u0627 \u064A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A";return`
            <div class="summary-card">
                <div class="summary-card-icon bg-indigo-100 text-indigo-600">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <div>
                    <p class="summary-card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</p>
                    <p class="summary-card-value">${t}</p>
                    <p class="text-xs text-gray-500 mt-1">${n} \u0645\u0644\u0627\u062D\u0638\u0629 \u062E\u0644\u0627\u0644 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631</p>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-card-icon bg-emerald-100 text-emerald-600">
                    <i class="fas fa-lightbulb"></i>
                </div>
                <div>
                    <p class="summary-card-label">\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u062A\u0635\u062D\u064A\u062D\u064A\u0629</p>
                    <p class="summary-card-value">${s}</p>
                    <p class="text-xs text-gray-500 mt-1">\u062A\u0634\u0645\u0644 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0637\u0644\u0648\u0628\u0629</p>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-card-icon bg-blue-100 text-blue-600">
                    <i class="fas fa-building"></i>
                </div>
                <div>
                    <p class="summary-card-label">\u0623\u0643\u062B\u0631 \u0625\u062F\u0627\u0631\u0629 \u062A\u0633\u062C\u064A\u0644\u0627\u064B</p>
                    <p class="summary-card-value">${l}</p>
                </div>
            </div>
        `},renderTable(){const e=document.getElementById("nearmiss-table-container");if(!e)return;const t=this.getFilteredItems(),s=document.getElementById("nearmiss-result-count");if(s&&(s.textContent=t.length?`${t.length} \u0645\u0644\u0627\u062D\u0638\u0629`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629"),!t.length){this.renderEmptyState(e);return}e.innerHTML=`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table table-header-orange">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0646\u0648\u0639</th>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A</th>
                            <th>\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                            <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</th>
                            <th>\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</th>
                            <th style="width: 140px;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(a=>`
                            <tr>
                                <td>
                                    <span class="badge ${this.formatTypeBadge(a.type)}">${Utils.escapeHTML(a.type||"")}</span>
                                </td>
                                <td>
                                    <div class="text-sm text-gray-800">${a.date?Utils.formatDateTime(a.date):"-"}</div>
                                </td>
                                <td>
                                    <div class="font-semibold text-gray-900">${Utils.escapeHTML(a.observerName||"-")}</div>
                                    ${a.phone?`<div class="text-xs text-gray-500">${Utils.escapeHTML(a.phone)}</div>`:""}
                                </td>
                                <td>${Utils.escapeHTML(a.location||"-")}</td>
                                <td>${Utils.escapeHTML(a.department||"-")}</td>
                                <td>${this.formatCorrectiveBadge(a)}</td>
                                <td>
                                    ${a.attachments&&a.attachments.length?`<span class="badge badge-secondary">${a.attachments.length}</span>`:'<span class="text-xs text-gray-400">\u0644\u0627 \u064A\u0648\u062C\u062F</span>'}
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button class="btn-icon btn-icon-info" data-action="view-nearmiss" data-id="${a.id}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-icon btn-icon-primary" data-action="edit-nearmiss" data-id="${a.id}" title="\u062A\u0639\u062F\u064A\u0644">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon btn-icon-danger" data-action="delete-nearmiss" data-id="${a.id}" title="\u062D\u0630\u0641">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `,this.applyModuleI18n(e),this.bindTableActions()},renderEmptyState(e){e.innerHTML=`
            <div class="empty-state">
                <i class="fas fa-clipboard text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p>
                <button id="nearmiss-empty-create" class="btn-primary mt-4">
                    <i class="fas fa-plus ml-2"></i>
                    \u062A\u0633\u062C\u064A\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u062F\u064A\u062F\u0629
                </button>
            </div>
        `,this.applyModuleI18n(e);const t=document.getElementById("nearmiss-empty-create");t&&t.addEventListener("click",()=>this.showForm())},bindTableActions(){document.querySelectorAll('[data-action="view-nearmiss"]').forEach(e=>{e.addEventListener("click",()=>this.viewNearMiss(e.getAttribute("data-id")))}),document.querySelectorAll('[data-action="edit-nearmiss"]').forEach(e=>{e.addEventListener("click",()=>this.editNearMiss(e.getAttribute("data-id")))}),document.querySelectorAll('[data-action="delete-nearmiss"]').forEach(e=>{e.addEventListener("click",()=>this.deleteNearMiss(e.getAttribute("data-id")))})},formatTypeBadge(e=""){switch(e){case"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643":return"badge-warning";case"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646":return"badge-info";case"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646":return"badge-secondary";case"\u062D\u0627\u062F\u062B":return"badge-danger";case"\u0645\u0642\u062A\u0631\u062D":return"badge-primary";default:return"badge-info"}},formatCorrectiveBadge(e){return e.correctiveProposed?'<span class="badge badge-info">\u0645\u0642\u062A\u0631\u062D</span>':'<span class="badge badge-secondary">\u0644\u0627 \u064A\u0648\u062C\u062F</span>'},showForm(e=null){const t=e?this.normalizeRecord(e):null;this.state.editingId=t?.id||null,this.state.currentAttachments=t?.attachments?t.attachments.map(a=>this.normalizeAttachment(a)).filter(Boolean):[];const s=this.buildFormModal(t);document.body.appendChild(s),this.applyModuleI18n(s),this.bindFormEvents(s,t),this.renderAttachmentsPreview(),this.toggleCorrectiveSection(t?.correctiveProposed===!0)},buildFormModal(e){const t=e?.correctiveProposed===!0,s=t?"checked":"",a=t?"":"checked",d=this.getDepartmentOptions(),n=document.createElement("div");return n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-${e?"edit":"plus-circle"} ml-2"></i>
                        ${e?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0644\u0627\u062D\u0638\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u062F\u064A\u062F\u0629"}
                    </h2>
                    <button class="modal-close" data-action="close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="nearmiss-form" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B *</label>
                                <select id="nearmiss-type" class="form-input" required>
                                    ${this.renderTypeOptions(e?.type||"")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A *</label>
                                <input type="datetime-local" id="nearmiss-date" class="form-input" required value="${e?.date?Utils.toDateTimeLocalString(e.date):""}">
                            </div>
                            <div>
                                <label for="nearmiss-observer" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 *</label>
                                <input type="text" id="nearmiss-observer" class="form-input" required value="${Utils.escapeHTML(e?.observerName||"")}" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u062B\u0644\u0627\u062B\u064A">
                            </div>
                            <div>
                                <label for="nearmiss-phone" class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u062A\u0644\u064A\u0641\u0648\u0646</label>
                                <input type="tel" id="nearmiss-phone" class="form-input" value="${Utils.escapeHTML(e?.phone||"")}" placeholder="+20XXXXXXXXXX \u0623\u0648 01XXXXXXXXX">
                            </div>
                            <div>
                                <label for="nearmiss-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0627\u0644\u0645\u0635\u0646\u0639 *</label>
                                <input type="text" id="nearmiss-location" class="form-input" required value="${Utils.escapeHTML(e?.location||"")}" placeholder="\u062D\u062F\u062F \u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u062F\u0642\u0629">
                            </div>
                            <div>
                                <label for="nearmiss-department" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627 *</label>
                                <input type="text" id="nearmiss-department" class="form-input" list="nearmiss-departments-list" required value="${Utils.escapeHTML(e?.department||"")}" placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629">
                                <datalist id="nearmiss-departments-list">
                                    ${d.map(i=>`<option value="${Utils.escapeHTML(i)}"></option>`).join("")}
                                </datalist>
                            </div>
                        </div>
                        <div>
                            <label for="nearmiss-description" class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0643\u0644 \u062F\u0642\u0629 *</label>
                            <textarea id="nearmiss-description" class="form-input" rows="4" required placeholder="\u0623\u0636\u0641 \u062A\u0641\u0627\u0635\u064A\u0644 \u0643\u0627\u0645\u0644\u0629 \u0648\u0648\u0627\u0636\u062D\u0629">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0647\u0644 \u062A\u0642\u062A\u0631\u062D \u0623\u064A \u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A\u061F *</label>
                            <div class="flex items-center gap-6">
                                <label class="flex items-center gap-2 text-sm text-gray-700">
                                    <input type="radio" name="nearmiss-corrective" value="yes" class="form-radio" ${s}>
                                    \u0646\u0639\u0645
                                </label>
                                <label class="flex items-center gap-2 text-sm text-gray-700">
                                    <input type="radio" name="nearmiss-corrective" value="no" class="form-radio" ${a}>
                                    \u0644\u0627
                                </label>
                            </div>
                        </div>
                        <div id="nearmiss-corrective-wrapper" class="${t?"":"hidden"}">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0642\u062A\u0631\u062D *</label>
                            <textarea id="nearmiss-corrective-description" class="form-input" rows="3" ${t?"required":""} placeholder="\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0627\u0644\u0645\u0637\u0644\u0648\u0628">${Utils.escapeHTML(e?.correctiveDescription||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0635\u0648\u0631 \u0623\u0648 \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u062A\u0648\u0636\u064A\u062D\u064A\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                            <input type="file" id="nearmiss-attachments" class="form-input" accept="image/*,.pdf" multiple>
                            <p class="text-xs text-gray-500 mt-2">\u064A\u0633\u0645\u062D \u0628\u0645\u0644\u0641\u0627\u062A JPG \u0623\u0648 PNG \u0623\u0648 PDF \u0628\u062D\u062F \u0623\u0642\u0635\u0649 5MB \u0644\u0643\u0644 \u0645\u0644\u0641.</p>
                            <div id="nearmiss-attachments-preview" class="mt-3 space-y-2"></div>
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t">
                            <button type="button" id="nearmiss-cancel-btn" class="btn-secondary">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                ${e?"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":"\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,n},bindFormEvents(e,t){const s=e.querySelector("#nearmiss-form");s&&s.addEventListener("submit",l=>this.handleSubmit(l));const a=e.querySelector('[data-action="close-modal"]');a&&a.addEventListener("click",()=>this.closeModal(e));const d=e.querySelector("#nearmiss-cancel-btn");d&&d.addEventListener("click",()=>this.closeModal(e));const n=e.querySelector("#nearmiss-attachments");n&&n.addEventListener("change",l=>this.handleAttachmentsChange(l.target.files)),e.querySelectorAll('input[name="nearmiss-corrective"]').forEach(l=>{l.addEventListener("change",o=>this.toggleCorrectiveSection(o.target.value==="yes"))});const r=e.querySelector("#nearmiss-attachments-preview");r&&r.addEventListener("click",l=>{const o=l.target.closest("button[data-remove-attachment]");o&&this.removeAttachment(o.getAttribute("data-remove-attachment"))}),e.addEventListener("click",l=>{l.target===e&&this.closeModal(e)}),setTimeout(()=>{e.querySelector("#nearmiss-type")?.focus()},100)},toggleCorrectiveSection(e){const t=document.getElementById("nearmiss-corrective-wrapper"),s=document.getElementById("nearmiss-corrective-description");!t||!s||(e?(t.classList.remove("hidden"),s.setAttribute("required","required")):(t.classList.add("hidden"),s.removeAttribute("required"),s.value=""))},renderAttachmentsPreview(){const e=document.getElementById("nearmiss-attachments-preview");if(e){if(!this.state.currentAttachments.length){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0631\u0641\u0627\u0642 \u0645\u0644\u0641\u0627\u062A \u0628\u0639\u062F.</p>';return}e.innerHTML=this.state.currentAttachments.map(t=>`
            <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2">
                <div>
                    <div class="text-sm font-medium text-gray-800">${Utils.escapeHTML(t.name)}</div>
                    <div class="text-xs text-gray-500">${t.size?`${t.size} KB`:""}</div>
                </div>
                <div class="flex items-center gap-3">
                    <a href="${t.data}" target="_blank" class="text-sm text-blue-600 hover:underline">\u0639\u0631\u0636</a>
                    <button type="button" class="btn-icon btn-icon-danger" data-remove-attachment="${t.id}" title="\u0625\u0632\u0627\u0644\u0629">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join("")}},async handleAttachmentsChange(e){if(!e||!e.length)return;const t=Array.from(e),s=["jpg","jpeg","png","pdf"],a=5*1024*1024,d=[];for(const i of t){const r=(i.name.split(".").pop()||"").toLowerCase();if(!s.includes(r)){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${i.name} \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645. \u064A\u0633\u0645\u062D \u0628\u0645\u0644\u0641\u0627\u062A JPG \u0623\u0648 PNG \u0623\u0648 PDF \u0641\u0642\u0637.`);continue}if(i.size>a){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${i.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 (5MB).`);continue}try{const l=await this.readFileAsBase64(i);d.push({id:Utils.generateId("ATT"),name:i.name,type:i.type||this.detectMimeType(i.name),data:l,size:Math.round(i.size/1024),uploadedAt:new Date().toISOString()})}catch{Notification.error(`\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 ${i.name}`)}}d.length&&(this.state.currentAttachments=[...this.state.currentAttachments,...d],this.renderAttachmentsPreview());const n=document.getElementById("nearmiss-attachments");n&&(n.value="")},removeAttachment(e){e&&(this.state.currentAttachments=this.state.currentAttachments.filter(t=>t.id!==e),this.renderAttachmentsPreview())},async readFileAsBase64(e){return new Promise((t,s)=>{const a=new FileReader;a.onload=d=>t(d.target.result),a.onerror=d=>s(d),a.readAsDataURL(e)})},validatePhone(e){if(!e)return!1;const t=e.replace(/[\s\-\(\)]/g,"");if(t.startsWith("+20")){const a=t.substring(3).replace(/\D/g,"");return a.length===10&&a.startsWith("1")}if(t.startsWith("01")){const a=t.replace(/\D/g,"");return a.length===11&&a.startsWith("01")}if(t.startsWith("0")){const a=t.replace(/\D/g,"");return a.length>=10&&a.length<=11}const s=t.replace(/\D/g,"");return s.length>=10&&s.length<=11},async handleSubmit(e){e.preventDefault();const t=e.target,s=t.closest(".modal-overlay"),a=t?.querySelector('button[type="submit"]')||document.querySelector('.modal-overlay button[type="submit"]');if(a&&a.disabled)return;const d=t.querySelector("#nearmiss-type")?.value||"",n=t.querySelector("#nearmiss-date")?.value||"",i=(t.querySelector("#nearmiss-observer")?.value||"").trim(),r=(t.querySelector("#nearmiss-phone")?.value||"").trim(),l=(t.querySelector("#nearmiss-location")?.value||"").trim(),o=(t.querySelector("#nearmiss-department")?.value||"").trim(),c=(t.querySelector("#nearmiss-description")?.value||"").trim(),u=(t.querySelector('input[name="nearmiss-corrective"]:checked')?.value||"no")==="yes",h=u?(t.querySelector("#nearmiss-corrective-description")?.value||"").trim():"";if(!d||!n||!i||!l||!o||!c){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0639\u0628\u0626\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}if(r&&!this.validatePhone(r)){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u062A\u0644\u064A\u0641\u0648\u0646 \u0635\u062D\u064A\u062D");return}if(u&&!h){Notification.error("\u064A\u0631\u062C\u0649 \u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0627\u0644\u0645\u0642\u062A\u0631\u062D");return}let f;try{f=Utils.dateTimeLocalToISO(n)||new Date(n).toISOString()}catch{Notification.error("\u0635\u064A\u063A\u0629 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");return}let p=this.state.currentAttachments.map(m=>this.normalizeAttachment(m)).filter(Boolean);const b=new Date().toISOString();let y="";a&&(y=a.innerHTML,a.disabled=!0,a.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{if(p&&Array.isArray(p)&&p.length>0){Loading.show("\u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0625\u0644\u0649 Google Drive...");try{Utils.safeLog("NearMiss: \u0642\u0628\u0644 processAttachments - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+p.length),p.length>0&&Utils.safeLog("NearMiss: \u0623\u0648\u0644 \u0645\u0631\u0641\u0642 \u0642\u0628\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629:",{name:p[0].name,hasData:!!p[0].data,hasDirectLink:!!p[0].directLink}),p=await GoogleIntegration.processAttachments?.(p,"NearMiss")||p,Utils.safeLog("NearMiss: \u0628\u0639\u062F processAttachments - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+p.length),p.length>0&&Utils.safeLog("NearMiss: \u0623\u0648\u0644 \u0645\u0631\u0641\u0642 \u0628\u0639\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629:",{name:p[0].name,directLink:p[0].directLink?p[0].directLink.substring(0,50)+"...":"\u0644\u0627 \u064A\u0648\u062C\u062F"})}catch(m){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:",m),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0644\u0643\u0646 \u0641\u0634\u0644 \u0631\u0641\u0639 \u0628\u0639\u0636 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A")}}if(this.state.editingId){const m=AppState.appData.nearmiss.findIndex(w=>w.id===this.state.editingId);if(m===-1)throw new Error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");const v=this.normalizeRecord(AppState.appData.nearmiss[m]),x={...v,type:d,date:f,observerName:i,phone:r,location:l,department:o,description:c,correctiveProposed:u,correctiveDescription:h,attachments:p,status:v.status||(u?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642"),updatedAt:b,updatedBy:this.getCurrentUserSummary(),reportedBy:i};AppState.appData.nearmiss[m]=x}else{const m=this.getCurrentUserSummary(),v={id:Utils.generateSequentialId("NRM",AppState.appData?.nearmiss||[]),type:d,date:f,observerName:i,phone:r,location:l,department:o,description:c,correctiveProposed:u,correctiveDescription:h,attachments:p,createdBy:m,createdById:m?.id||AppState.currentUser?.id||"",createdAt:b,updatedAt:b,updatedBy:null,status:u?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642",reportedBy:i};AppState.appData.nearmiss.push(v)}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),this.closeModal(s),Notification.success(this.state.editingId?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D"),a&&(a.disabled=!1,a.innerHTML=y),this.updateSummary(),this.renderTable(),this.refreshFilterOptions(),GoogleIntegration?.sendRequest&&Promise.resolve().then(async()=>{try{this.state.editingId?await GoogleIntegration.sendRequest({action:"updateNearMiss",data:{nearMissId:this.state.editingId,updateData:updatedRecord}}):await GoogleIntegration.sendRequest({action:"addNearMiss",data:newRecord})}catch(m){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0641\u064A Google Sheets:",m)}}).catch(m=>{Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0641\u064A Google Sheets:",m)})}catch(m){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643:",m),Notification.error(m.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),a&&(a.disabled=!1,a.innerHTML=y)}finally{this.state.currentAttachments=[],this.state.editingId=null}},closeModal(e){e&&e.parentNode&&e.parentNode.removeChild(e),this.state.currentAttachments=[],this.state.editingId=null},refreshFilterOptions(){const e=document.getElementById("nearmiss-filter-department");e&&(e.innerHTML=this.renderDepartmentOptions(this.state.filters.department))},viewNearMiss(e){if(!e)return;const t=AppState.appData.nearmiss.find(a=>a.id===e);if(!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}const s=this.buildDetailModal(this.normalizeRecord(t));document.body.appendChild(s),this.applyModuleI18n(s),s.addEventListener("click",a=>{a.target===s&&this.closeModal(s)})},buildDetailModal(e){const t=e.attachments&&e.attachments.length?e.attachments.map(i=>{const r=/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(i.name||""),o=i.type&&i.type.startsWith("image/")||r,c=this.processAttachmentUrl(i.data);return o&&c?`
                        <div class="bg-gray-50 border border-gray-200 rounded p-3">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <div class="text-sm font-medium text-gray-800">${Utils.escapeHTML(i.name)}</div>
                                    <div class="text-xs text-gray-500">${i.size?`${i.size} KB`:""}</div>
                                </div>
                                <a href="${c}" target="_blank" class="text-sm text-blue-600 hover:underline" download="${Utils.escapeHTML(i.name)}">\u062A\u062D\u0645\u064A\u0644</a>
                            </div>
                            <img src="${Utils.escapeHTML(c)}" alt="${Utils.escapeHTML(i.name)}" class="max-w-full h-auto rounded border" style="max-height: 300px;"
                                 onerror="this.onerror=null; this.style.display='none';">
                        </div>
                    `:`
                        <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2">
                            <div>
                                <div class="text-sm font-medium text-gray-800">${Utils.escapeHTML(i.name)}</div>
                                <div class="text-xs text-gray-500">${i.size?`${i.size} KB`:""}</div>
                            </div>
                            <div class="flex items-center gap-3">
                                <a href="${c||i.data}" target="_blank" class="text-sm text-blue-600 hover:underline" download="${Utils.escapeHTML(i.name)}">\u062A\u062D\u0645\u064A\u0644</a>
                            </div>
                        </div>
                    `}).join(""):'<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A</p>',s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-eye ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629
                    </h2>
                    <button class="modal-close" data-action="close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="detail-label">\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</label>
                            <p class="detail-value">${Utils.escapeHTML(e.type)}</p>
                        </div>
                        <div>
                            <label class="detail-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A</label>
                            <p class="detail-value">${Utils.formatDateTime(e.date)}</p>
                        </div>
                        <div>
                            <label class="detail-label">\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</label>
                            <p class="detail-value">${Utils.escapeHTML(e.observerName||"-")}</p>
                            ${e.phone?`<p class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(e.phone)}</p>`:""}
                        </div>
                        <div>
                            <label class="detail-label">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                            <p class="detail-value">${Utils.escapeHTML(e.department||"-")}</p>
                        </div>
                        <div>
                            <label class="detail-label">\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</label>
                            <p class="detail-value">${Utils.escapeHTML(e.location||"-")}</p>
                        </div>
                        <div>
                            <label class="detail-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</label>
                            <p class="detail-value">${e.correctiveProposed?"\u062A\u0645 \u0627\u0642\u062A\u0631\u0627\u062D \u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A":"\u0644\u0627 \u064A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621 \u0645\u0642\u062A\u0631\u062D"}</p>
                        </div>
                    </div>
                    <div>
                        <label class="detail-label">\u0648\u0635\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</label>
                        <p class="detail-value whitespace-pre-line">${Utils.escapeHTML(e.description||"-")}</p>
                    </div>
                    ${e.correctiveProposed?`
                        <div>
                            <label class="detail-label">\u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0642\u062A\u0631\u062D</label>
                            <p class="detail-value whitespace-pre-line">${Utils.escapeHTML(e.correctiveDescription||"-")}</p>
                        </div>
                    `:""}
                    <div>
                        <label class="detail-label">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</label>
                        <div class="space-y-2">
                            ${t}
                        </div>
                    </div>
                    <div class="text-xs text-gray-500 border-t pt-4 space-y-1">
                        <div>\u0623\u0646\u0634\u0626 \u0628\u0648\u0627\u0633\u0637\u0629: ${Utils.escapeHTML(e.createdBy?.name||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</div>
                        <div>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621: ${Utils.formatDateTime(e.createdAt)}</div>
                        <div>\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B: ${Utils.formatDateTime(e.updatedAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" data-action="close-modal">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-secondary" data-action="detail-print" data-id="${e.id}">
                        <i class="fas fa-print ml-2"></i>
                        \u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button class="btn-primary" data-action="detail-edit" data-id="${e.id}">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `;const a=s.querySelector('[data-action="close-modal"]');a&&a.addEventListener("click",()=>this.closeModal(s));const d=s.querySelector('[data-action="detail-edit"]');d&&d.addEventListener("click",()=>{const i=d.getAttribute("data-id");this.closeModal(s),this.editNearMiss(i)});const n=s.querySelector('[data-action="detail-print"]');return n&&n.addEventListener("click",()=>{const i=n.getAttribute("data-id");this.printNearMiss(i)}),s},printNearMiss(e){const t=AppState.appData.nearmiss.find(s=>s.id===e);if(!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629...");const s=t.attachments&&t.attachments.length?t.attachments.map(c=>{const g=/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(c.name||""),h=c.type&&c.type.startsWith("image/")||g,f=this.processAttachmentUrl(c.data);return h&&f?`
                            <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                                <div style="font-weight: bold; margin-bottom: 5px;">${Utils.escapeHTML(c.name)}</div>
                                <img src="${Utils.escapeHTML(f)}" alt="${Utils.escapeHTML(c.name)}" style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; border-radius: 4px;"
                                     onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                            </div>
                        `:`
                            <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                                <div style="font-weight: bold;">${Utils.escapeHTML(c.name)}</div>
                            </div>
                        `}).join(""):'<p style="color: #999;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A</p>',a=`NEAR-${t.id?.substring(0,8)||"UNKNOWN"}`,d="\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 - Near Miss Report",n=`
                <table class="report-table" style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <th style="width: 30%; padding: 8px; border: 1px solid #ddd; background: #f5f5f5;">\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(t.type||"-")}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${t.date?Utils.formatDateTime(t.date):"-"}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;">\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(t.observerName||"-")}</td>
                    </tr>
                    ${t.phone?`
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(t.phone)}</td>
                    </tr>
                    `:""}
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(t.department||"-")}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;">\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(t.location||"-")}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${t.correctiveProposed?"\u062A\u0645 \u0627\u0642\u062A\u0631\u0627\u062D \u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A":"\u0644\u0627 \u064A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621 \u0645\u0642\u062A\u0631\u062D"}</td>
                    </tr>
                </table>

                <div style="margin-top: 20px;">
                    <h3 style="font-weight: bold; margin-bottom: 10px;">\u0648\u0635\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</h3>
                    <p style="white-space: pre-wrap; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">${Utils.escapeHTML(t.description||"-")}</p>
                </div>

                ${t.correctiveProposed?`
                <div style="margin-top: 20px;">
                    <h3 style="font-weight: bold; margin-bottom: 10px;">\u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0642\u062A\u0631\u062D</h3>
                    <p style="white-space: pre-wrap; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">${Utils.escapeHTML(t.correctiveDescription||"-")}</p>
                </div>
                `:""}

                <div style="margin-top: 20px;">
                    <h3 style="font-weight: bold; margin-bottom: 10px;">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</h3>
                    ${s}
                </div>
            `,i=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(a,d,n,!1,!0,{version:"1.0"},t.createdAt,t.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${d}</title></head><body>${n}</body></html>`,r=new Blob([i],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(r),o=window.open(l,"_blank");o?o.onload=()=>{const c=o.document.querySelectorAll("img");let g=0;const u=c.length;if(u===0)setTimeout(()=>{o.print(),setTimeout(()=>URL.revokeObjectURL(l),1e3),Loading.hide()},300);else{const h=()=>{g>=u&&setTimeout(()=>{o.print(),setTimeout(()=>URL.revokeObjectURL(l),1e3),Loading.hide()},300)};c.forEach(f=>{f.complete?(g++,h()):(f.onload=()=>{g++,h()},f.onerror=()=>{g++,h()})}),setTimeout(()=>{g<u&&(o.print(),setTimeout(()=>URL.revokeObjectURL(l),1e3),Loading.hide())},3e3)}}:(URL.revokeObjectURL(l),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0646\u0648\u0627\u0641\u0630 \u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"))}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:",s),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629: "+s.message)}},editNearMiss(e){if(!e)return;const t=AppState.appData.nearmiss.find(s=>s.id===e);if(!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}this.showForm(t)},async deleteNearMiss(e){if(!e)return;if(!AppState.appData.nearmiss.find(s=>s.id===e)){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\u061F")){Loading.show();try{if(AppState.appData.nearmiss=AppState.appData.nearmiss.filter(s=>s.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),GoogleIntegration?.sendRequest)try{await GoogleIntegration.sendRequest({action:"deleteNearMiss",data:{nearMissId:e}})}catch(s){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0645\u0646 Google Sheets:",s)}Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D")}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643:",s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")}finally{Loading.hide(),this.updateSummary(),this.renderTable(),this.refreshFilterOptions()}}}};(function(){"use strict";try{typeof window<"u"&&typeof NearMiss<"u"&&(window.NearMiss=NearMiss,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 NearMiss module loaded and available on window.NearMiss"))}catch{if(typeof window<"u"&&typeof NearMiss<"u")try{window.NearMiss=NearMiss}catch{}}})();
