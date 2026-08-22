const NearMiss={TYPES:[{value:"\u0633\u0642\u0648\u0637 \u0623\u0634\u064A\u0627\u0621 / \u0623\u062D\u0645\u0627\u0644",label:"\u0633\u0642\u0648\u0637 \u0623\u0634\u064A\u0627\u0621 / \u0623\u062D\u0645\u0627\u0644",icon:"fa-arrow-down"},{value:"\u062A\u0639\u062B\u0631 / \u0627\u0646\u0632\u0644\u0627\u0642",label:"\u062A\u0639\u062B\u0631 / \u0627\u0646\u0632\u0644\u0627\u0642",icon:"fa-walking"},{value:"\u0627\u0642\u062A\u0631\u0627\u0628 \u0645\u0639\u062F\u0627\u062A / \u0641\u0648\u0631\u0643\u0644\u0641\u062A",label:"\u0627\u0642\u062A\u0631\u0627\u0628 \u0645\u0639\u062F\u0627\u062A / \u0641\u0648\u0631\u0643\u0644\u0641\u062A",icon:"fa-truck-pickup"},{value:"\u062E\u0637\u0631 \u0643\u0647\u0631\u0628\u0627\u0626\u064A \u0648\u0634\u064A\u0643",label:"\u062E\u0637\u0631 \u0643\u0647\u0631\u0628\u0627\u0626\u064A \u0648\u0634\u064A\u0643",icon:"fa-bolt"},{value:"\u062A\u0633\u0631\u064A\u0628 \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 / \u063A\u0627\u0632",label:"\u062A\u0633\u0631\u064A\u0628 \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 / \u063A\u0627\u0632",icon:"fa-flask"},{value:"\u062D\u0631\u064A\u0642 \u0648\u0634\u064A\u0643",label:"\u062D\u0631\u064A\u0642 \u0648\u0634\u064A\u0643",icon:"fa-fire"},{value:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643 \u0639\u0627\u0645",icon:"fa-exclamation-triangle"},{value:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646",icon:"fa-user-times"},{value:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",icon:"fa-ban"},{value:"\u0645\u0642\u062A\u0631\u062D",label:"\u0645\u0642\u062A\u0631\u062D \u062A\u062D\u0633\u064A\u0646",icon:"fa-lightbulb"}],_i18nSectionObserver:null,_i18nBodyObserver:null,applyModuleI18n(e){const t=e||document,a=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;a&&(typeof a.applyI18n=="function"&&a.applyI18n(t),typeof a.applyLiteralTranslations=="function"&&a.applyLiteralTranslations(t))},ensureI18nObservers(e){this._i18nSectionObserver&&(this._i18nSectionObserver.disconnect(),this._i18nSectionObserver=null),e&&typeof MutationObserver<"u"&&(this._i18nSectionObserver=new MutationObserver(t=>{t.forEach(a=>{a.addedNodes.forEach(s=>{s&&s.nodeType===1&&this.applyModuleI18n(s)})})}),this._i18nSectionObserver.observe(e,{childList:!0,subtree:!0})),!this._i18nBodyObserver&&typeof MutationObserver<"u"&&(this._i18nBodyObserver=new MutationObserver(t=>{t.forEach(a=>{a.addedNodes.forEach(s=>{!s||s.nodeType!==1||(s.classList?.contains("modal-overlay")||s.querySelector?.(".modal-overlay"))&&this.applyModuleI18n(s)})})}),this._i18nBodyObserver.observe(document.body,{childList:!0,subtree:!0}))},state:{filters:{search:"",type:"",department:"",startDate:"",endDate:""},currentAttachments:[],editingId:null},processAttachmentUrl(e){if(!e||typeof e!="string")return null;let t=e.trim();const a=/https?:\/\/drive\.google\.com\/uc\?export=view&id=([a-zA-Z0-9_-]+)/,s=t.match(a);return s&&(t="https://lh3.googleusercontent.com/d/"+s[1]),t.startsWith("http://")||t.startsWith("https://")||t.startsWith("data:")?t:t.length>100&&/^[A-Za-z0-9+/=]+$/.test(t.substring(0,100))?"data:image/jpeg;base64,"+t:null},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);try{const e=document.getElementById("nearmiss-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 nearmiss-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}if(typeof Utils>"u")return;if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}this.ensureDataIntegrity();const t=a=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(a):String(a||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");e.innerHTML=`
                <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                     \u062A\u0631\u0648\u064A\u0633\u0629 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0628\u0635\u0631\u064A\u0629 \u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 (SafetyHub)
                \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); border-radius: 16px; padding: 20px 24px; color: #fff; margin-bottom: 20px; box-shadow: 0 10px 25px -5px rgba(49, 46, 129, 0.4); border: 1px solid rgba(255,255,255,0.1);">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div class="flex items-center gap-4">
                            <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.25); box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                                <i class="fas fa-shield-virus text-2xl text-amber-300"></i>
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <h1 style="font-size: 1.35rem; font-weight: 800; margin: 0; color: #fff; letter-spacing: -0.5px;">\u0625\u062F\u0627\u0631\u0629 \u0648\u0628\u0644\u0627\u063A\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</h1>
                                    <span style="background: rgba(245, 158, 11, 0.25); border: 1px solid rgba(245, 158, 11, 0.6); color: #fef08a; font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Near Miss Suite</span>
                                </div>
                                <p style="font-size: 0.82rem; margin: 4px 0 0 0; color: #c7d2fe;">\u0631\u0635\u062F \u0627\u0633\u062A\u0628\u0627\u0642\u064A \u0644\u0644\u0645\u062E\u0627\u0637\u0631 \u2022 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629 \u2022 \u062B\u0642\u0627\u0641\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0625\u064A\u062C\u0627\u0628\u064A\u0629 | SafetyHub ICAPP</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button id="nearmiss-public-qr-btn" class="btn-secondary flex items-center gap-2" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #fff; font-size: 0.85rem; font-weight: 600; padding: 8px 14px; border-radius: 10px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" onclick="NearMiss.openPublicQrModal()">
                                <i class="fas fa-qrcode text-amber-300"></i>
                                <span>\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0639\u0627\u0645 \u0648\u0631\u0645\u0648\u0632 QR \u{1F4F1}</span>
                            </button>
                            <button onclick="NearMiss.printLocationQrBadges()" class="btn-secondary flex items-center gap-2" style="background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); color: #a7f3d0; font-size: 0.85rem; font-weight: 600; padding: 8px 14px; border-radius: 10px; transition: all 0.2s;" onmouseover="this.style.background='rgba(16, 185, 129, 0.35)'" onmouseout="this.style.background='rgba(16, 185, 129, 0.2)'">
                                <i class="fas fa-print"></i>
                                <span>\u0645\u0644\u0635\u0642\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u{1F5A8}\uFE0F</span>
                            </button>
                            <button id="add-nearmiss-btn" class="btn-primary flex items-center gap-2" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #fff; font-size: 0.85rem; font-weight: 700; padding: 8px 16px; border-radius: 10px; border: none; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);">
                                <i class="fas fa-plus-circle"></i>
                                <span>\u062A\u0633\u062C\u064A\u0644 \u0628\u0644\u0627\u063A \u0648\u0634\u064A\u0643 \u2795</span>
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
                `,this.applyModuleI18n(t))}},ensureDataIntegrity(){Array.isArray(AppState.appData.nearmiss)||(AppState.appData.nearmiss=[]),AppState.appData.nearmiss=AppState.appData.nearmiss.map(e=>this.normalizeRecord(e))},normalizeRecord(e={}){const t=this.TYPES[0].value,a=e.id||Utils.generateId("NEARMISS");let s;try{s=e.date?new Date(e.date).toISOString():new Date().toISOString()}catch{s=new Date().toISOString()}const n=Array.isArray(e.attachments)?e.attachments.map(r=>this.normalizeAttachment(r)).filter(Boolean):[],d=e.createdBy?e.createdBy:this.getCurrentUserSummary(e.createdBy),i=e.correctiveProposed===!0||e.correctiveAction===!0||e.correctiveProposal===!0||e.corrective===!0||e.suggestedAction===!0;return{id:a,type:this.TYPES.some(r=>r.value===e.type)?e.type:e.type||t,date:s,observerName:e.observerName||e.reportedBy||"",phone:e.phone||e.contactPhone||"",location:e.location||e.place||"",department:e.department||e.departmentName||"",description:e.description||e.details||e.title||"",correctiveProposed:i,correctiveDescription:i&&(e.correctiveDescription||e.correctiveDetails||e.suggestedActionDescription)||"",attachments:n,createdBy:d,createdById:e.createdById||d?.id||"",createdAt:e.createdAt||s,updatedAt:e.updatedAt||s,updatedBy:e.updatedBy||null,status:e.status||(i?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642"),reportedBy:e.reportedBy||e.observerName||""}},normalizeAttachment(e){if(!e)return null;const t=e.data||e.base64||"";if(!t)return null;const a=e.size||Math.round(t.length*3/4/1024);return{id:e.id||Utils.generateId("ATT"),name:e.name||"attachment",type:e.type||this.detectMimeType(e.name||""),data:t,size:a,uploadedAt:e.uploadedAt||new Date().toISOString()}},detectMimeType(e=""){const t=(e.split(".").pop()||"").toLowerCase();return t==="pdf"?"application/pdf":t==="png"?"image/png":t==="jpg"||t==="jpeg"?"image/jpeg":"application/octet-stream"},getCurrentUserSummary(e=null){return e&&typeof e=="object"?e:AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||"",email:AppState.currentUser.email||"",role:AppState.currentUser.role||""}:{name:"\u0646\u0638\u0627\u0645",email:"",role:""}},getDepartmentOptions(){const e=new Set;return(AppState.appData.nearmiss||[]).forEach(t=>{const a=(t.department||"").trim();a&&e.add(a)}),(AppState.appData.employees||[]).forEach(t=>{const a=(t.department||"").trim();a&&e.add(a)}),Array.from(e).sort((t,a)=>t.localeCompare(a,"ar"))},renderTypeOptions(e=""){const t=['<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>'];return this.TYPES.forEach(a=>{t.push(`<option value="${Utils.escapeHTML(a.value)}" ${a.value===e?"selected":""}>${Utils.escapeHTML(a.label)}</option>`)}),t.join("")},renderDepartmentOptions(e=""){const t=['<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>'];return this.getDepartmentOptions().forEach(a=>{t.push(`<option value="${Utils.escapeHTML(a)}" ${a===e?"selected":""}>${Utils.escapeHTML(a)}</option>`)}),t.join("")},bindBaseEvents(){const e=document.getElementById("add-nearmiss-btn");e&&e.addEventListener("click",()=>this.showForm());const t=document.getElementById("nearmiss-filter-search");t&&t.addEventListener("input",r=>this.handleFilterChange("search",r.target.value));const a=document.getElementById("nearmiss-filter-type");a&&a.addEventListener("change",r=>this.handleFilterChange("type",r.target.value));const s=document.getElementById("nearmiss-filter-department");s&&s.addEventListener("change",r=>this.handleFilterChange("department",r.target.value));const n=document.getElementById("nearmiss-filter-start");n&&n.addEventListener("change",r=>this.handleFilterChange("startDate",r.target.value));const d=document.getElementById("nearmiss-filter-end");d&&d.addEventListener("change",r=>this.handleFilterChange("endDate",r.target.value));const i=document.getElementById("nearmiss-reset-filters");i&&i.addEventListener("click",r=>{r.preventDefault(),this.resetFilters()})},handleFilterChange(e,t){if(!Object.prototype.hasOwnProperty.call(this.state.filters,e))return;const a=typeof t=="string"?t.trim():t;this.state.filters={...this.state.filters,[e]:a},this.renderTable()},resetFilters(){this.state.filters={search:"",type:"",department:"",startDate:"",endDate:""};const e=document.getElementById("nearmiss-filter-search");e&&(e.value="");const t=document.getElementById("nearmiss-filter-type");t&&(t.value="");const a=document.getElementById("nearmiss-filter-department");a&&(a.value="");const s=document.getElementById("nearmiss-filter-start");s&&(s.value="");const n=document.getElementById("nearmiss-filter-end");n&&(n.value=""),this.renderTable()},getFilteredItems(){this.ensureDataIntegrity();const{search:e,type:t,department:a,startDate:s,endDate:n}=this.state.filters;let d=(AppState.appData.nearmiss||[]).filter(i=>!!i);if(t&&(d=d.filter(i=>(i.type||"").toLowerCase()===t.toLowerCase())),a&&(d=d.filter(i=>(i.department||"").toLowerCase()===a.toLowerCase())),s){const i=new Date(s);i.setHours(0,0,0,0),d=d.filter(r=>new Date(r.date)>=i)}if(n){const i=new Date(n);i.setHours(23,59,59,999),d=d.filter(r=>new Date(r.date)<=i)}if(e){const i=e.toLowerCase();d=d.filter(r=>[r.type,r.location,r.department,r.observerName,r.phone,r.description,r.correctiveDescription].some(o=>o&&o.toLowerCase().includes(i)))}return d.sort((i,r)=>new Date(r.date)-new Date(i.date))},updateSummary(){const e=document.getElementById("nearmiss-summary");e&&(e.innerHTML=this.renderSummaryCards(),this.applyModuleI18n(e))},renderSummaryCards(){const e=AppState.appData.nearmiss||[],t=e.length,a=e.filter(l=>l.correctiveProposed).length,s=e.filter(l=>{const c=(l.severity||"").toLowerCase();return c==="\u0639\u0627\u0644\u064A"||c==="high"||c==="\u0643\u0627\u0631\u062B\u064A"||c==="critical"||c==="\u0648\u0634\u064A\u0643"}).length,n=new Date,d=new Date(n.getFullYear(),n.getMonth(),1),i=e.filter(l=>new Date(l.date)>=d).length,r={};e.forEach(l=>{const c=(l.department||"").trim();c&&(r[c]=(r[c]||0)+1)});const o=Object.entries(r).sort((l,c)=>c[1]-l[1])[0],p=o?`${Utils.escapeHTML(o[0])} (${o[1]})`:"\u0644\u0627 \u064A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A";return`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- \u0643\u0631\u062A \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A -->
                <div style="background:#fff; border-radius:14px; padding:18px; border:1px solid #e0e7ff; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); color:#3730a3; display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <div>
                        <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</div>
                        <div style="font-size:1.5rem; font-weight:800; color:#1e1b4b; line-height:1.2;">${t}</div>
                        <div style="font-size:0.7rem; color:#4338ca; font-weight:600; margin-top:2px;">+${i} \u062E\u0644\u0627\u0644 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u{1F4C5}</div>
                    </div>
                </div>

                <!-- \u0643\u0631\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 -->
                <div style="background:#fff; border-radius:14px; padding:18px; border:1px solid #fee2e2; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); color:#dc2626; display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
                        <i class="fas fa-radiation-alt"></i>
                    </div>
                    <div>
                        <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase;">\u0628\u0644\u0627\u063A\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</div>
                        <div style="font-size:1.5rem; font-weight:800; color:#b91c1c; line-height:1.2;">${s}</div>
                        <div style="font-size:0.7rem; color:#dc2626; font-weight:600; margin-top:2px;">\u062A\u062A\u0637\u0644\u0628 \u062A\u062F\u062E\u0644 \u0641\u0648\u0631\u064A \u{1F6A8}</div>
                    </div>
                </div>

                <!-- \u0643\u0631\u062A \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 -->
                <div style="background:#fff; border-radius:14px; padding:18px; border:1px solid #fef3c7; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color:#d97706; display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div>
                        <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0635\u062D\u064A\u062D\u064A\u0629 (CAPA)</div>
                        <div style="font-size:1.5rem; font-weight:800; color:#b45309; line-height:1.2;">${a}</div>
                        <div style="font-size:0.7rem; color:#d97706; font-weight:600; margin-top:2px;">\u0645\u0631\u0628\u0648\u0637\u0629 \u0628\u062E\u0637\u0629 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u{1F504}</div>
                    </div>
                </div>

                <!-- \u0643\u0631\u062A \u0623\u0643\u062B\u0631 \u0625\u062F\u0627\u0631\u0629 \u0646\u0634\u0627\u0637\u0627\u064B -->
                <div style="background:#fff; border-radius:14px; padding:18px; border:1px solid #d1fae5; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); color:#059669; display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
                        <i class="fas fa-building"></i>
                    </div>
                    <div>
                        <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase;">\u0623\u0639\u0644\u0649 \u0625\u062F\u0627\u0631\u0629 \u0631\u0635\u062F\u0627\u064B</div>
                        <div style="font-size:1.05rem; font-weight:800; color:#065f46; line-height:1.2; margin-top:2px;">${p}</div>
                        <div style="font-size:0.7rem; color:#059669; font-weight:600; margin-top:2px;">\u0628\u064A\u0626\u0629 \u0625\u064A\u062C\u0627\u0628\u064A\u0629 \u0645\u0634\u062C\u0639\u0629 \u{1F3C6}</div>
                    </div>
                </div>
            </div>
        `},renderTable(){const e=document.getElementById("nearmiss-table-container");if(!e)return;const t=this.getFilteredItems(),a=document.getElementById("nearmiss-result-count");if(a&&(a.textContent=t.length?`${t.length} \u0645\u0644\u0627\u062D\u0638\u0629`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629"),!t.length){this.renderEmptyState(e);return}e.innerHTML=`
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
                        ${t.map(s=>`
                            <tr>
                                <td>
                                    <span class="badge ${this.formatTypeBadge(s.type)}">${Utils.escapeHTML(s.type||"")}</span>
                                </td>
                                <td>
                                    <div class="text-sm text-gray-800">${s.date?Utils.formatDateTime(s.date):"-"}</div>
                                </td>
                                <td>
                                    <div class="font-semibold text-gray-900">${Utils.escapeHTML(s.observerName||"-")}</div>
                                    ${s.phone?`<div class="text-xs text-gray-500">${Utils.escapeHTML(s.phone)}</div>`:""}
                                </td>
                                <td>${Utils.escapeHTML(s.location||"-")}</td>
                                <td>${Utils.escapeHTML(s.department||"-")}</td>
                                <td>${this.formatCorrectiveBadge(s)}</td>
                                <td>
                                    ${s.attachments&&s.attachments.length?`<span class="badge badge-secondary">${s.attachments.length}</span>`:'<span class="text-xs text-gray-400">\u0644\u0627 \u064A\u0648\u062C\u062F</span>'}
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button class="btn-icon btn-icon-info" data-action="view-nearmiss" data-id="${s.id}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-icon btn-icon-primary" data-action="edit-nearmiss" data-id="${s.id}" title="\u062A\u0639\u062F\u064A\u0644">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon btn-icon-danger" data-action="delete-nearmiss" data-id="${s.id}" title="\u062D\u0630\u0641">
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
        `,this.applyModuleI18n(e);const t=document.getElementById("nearmiss-empty-create");t&&t.addEventListener("click",()=>this.showForm())},bindTableActions(){document.querySelectorAll('[data-action="view-nearmiss"]').forEach(e=>{e.addEventListener("click",()=>this.viewNearMiss(e.getAttribute("data-id")))}),document.querySelectorAll('[data-action="edit-nearmiss"]').forEach(e=>{e.addEventListener("click",()=>this.editNearMiss(e.getAttribute("data-id")))}),document.querySelectorAll('[data-action="delete-nearmiss"]').forEach(e=>{e.addEventListener("click",()=>this.deleteNearMiss(e.getAttribute("data-id")))})},formatTypeBadge(e=""){switch(e){case"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643":return"badge-warning";case"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646":return"badge-info";case"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646":return"badge-secondary";case"\u062D\u0627\u062F\u062B":return"badge-danger";case"\u0645\u0642\u062A\u0631\u062D":return"badge-primary";default:return"badge-info"}},formatCorrectiveBadge(e){return e.correctiveProposed?'<span class="badge badge-info">\u0645\u0642\u062A\u0631\u062D</span>':'<span class="badge badge-secondary">\u0644\u0627 \u064A\u0648\u062C\u062F</span>'},showForm(e=null){const t=e?this.normalizeRecord(e):null;this.state.editingId=t?.id||null,this.state.currentAttachments=t?.attachments?t.attachments.map(s=>this.normalizeAttachment(s)).filter(Boolean):[];const a=this.buildFormModal(t);document.body.appendChild(a),this.applyModuleI18n(a),this.bindFormEvents(a,t),this.renderAttachmentsPreview(),this.toggleCorrectiveSection(t?.correctiveProposed===!0)},buildFormModal(e){const t=e?.correctiveProposed===!0,a=t?"checked":"",s=t?"":"checked",n=this.getDepartmentOptions(),d=document.createElement("div");return d.className="modal-overlay",d.innerHTML=`
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
                                    ${n.map(i=>`<option value="${Utils.escapeHTML(i)}"></option>`).join("")}
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
                                    <input type="radio" name="nearmiss-corrective" value="yes" class="form-radio" ${a}>
                                    \u0646\u0639\u0645
                                </label>
                                <label class="flex items-center gap-2 text-sm text-gray-700">
                                    <input type="radio" name="nearmiss-corrective" value="no" class="form-radio" ${s}>
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
        `,d},bindFormEvents(e,t){const a=e.querySelector("#nearmiss-form");a&&a.addEventListener("submit",o=>this.handleSubmit(o));const s=e.querySelector('[data-action="close-modal"]');s&&s.addEventListener("click",()=>this.closeModal(e));const n=e.querySelector("#nearmiss-cancel-btn");n&&n.addEventListener("click",()=>this.closeModal(e));const d=e.querySelector("#nearmiss-attachments");d&&d.addEventListener("change",o=>this.handleAttachmentsChange(o.target.files)),e.querySelectorAll('input[name="nearmiss-corrective"]').forEach(o=>{o.addEventListener("change",p=>this.toggleCorrectiveSection(p.target.value==="yes"))});const r=e.querySelector("#nearmiss-attachments-preview");r&&r.addEventListener("click",o=>{const p=o.target.closest("button[data-remove-attachment]");p&&this.removeAttachment(p.getAttribute("data-remove-attachment"))}),e.addEventListener("click",o=>{o.target===e&&this.closeModal(e)}),setTimeout(()=>{e.querySelector("#nearmiss-type")?.focus()},100)},toggleCorrectiveSection(e){const t=document.getElementById("nearmiss-corrective-wrapper"),a=document.getElementById("nearmiss-corrective-description");!t||!a||(e?(t.classList.remove("hidden"),a.setAttribute("required","required")):(t.classList.add("hidden"),a.removeAttribute("required"),a.value=""))},renderAttachmentsPreview(){const e=document.getElementById("nearmiss-attachments-preview");if(e){if(!this.state.currentAttachments.length){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0631\u0641\u0627\u0642 \u0645\u0644\u0641\u0627\u062A \u0628\u0639\u062F.</p>';return}e.innerHTML=this.state.currentAttachments.map(t=>`
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
        `).join("")}},async handleAttachmentsChange(e){if(!e||!e.length)return;const t=Array.from(e),a=["jpg","jpeg","png","pdf"],s=5*1024*1024,n=[];for(const i of t){const r=(i.name.split(".").pop()||"").toLowerCase();if(!a.includes(r)){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${i.name} \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645. \u064A\u0633\u0645\u062D \u0628\u0645\u0644\u0641\u0627\u062A JPG \u0623\u0648 PNG \u0623\u0648 PDF \u0641\u0642\u0637.`);continue}if(i.size>s){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${i.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 (5MB).`);continue}try{const o=await this.readFileAsBase64(i);n.push({id:Utils.generateId("ATT"),name:i.name,type:i.type||this.detectMimeType(i.name),data:o,size:Math.round(i.size/1024),uploadedAt:new Date().toISOString()})}catch{Notification.error(`\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 ${i.name}`)}}n.length&&(this.state.currentAttachments=[...this.state.currentAttachments,...n],this.renderAttachmentsPreview());const d=document.getElementById("nearmiss-attachments");d&&(d.value="")},removeAttachment(e){e&&(this.state.currentAttachments=this.state.currentAttachments.filter(t=>t.id!==e),this.renderAttachmentsPreview())},async readFileAsBase64(e){return new Promise((t,a)=>{const s=new FileReader;s.onload=n=>t(n.target.result),s.onerror=n=>a(n),s.readAsDataURL(e)})},validatePhone(e){if(!e)return!1;const t=e.replace(/[\s\-\(\)]/g,"");if(t.startsWith("+20")){const s=t.substring(3).replace(/\D/g,"");return s.length===10&&s.startsWith("1")}if(t.startsWith("01")){const s=t.replace(/\D/g,"");return s.length===11&&s.startsWith("01")}if(t.startsWith("0")){const s=t.replace(/\D/g,"");return s.length>=10&&s.length<=11}const a=t.replace(/\D/g,"");return a.length>=10&&a.length<=11},async handleSubmit(e){e.preventDefault();const t=e.target,a=t.closest(".modal-overlay"),s=t?.querySelector('button[type="submit"]')||document.querySelector('.modal-overlay button[type="submit"]');if(s&&s.disabled)return;const n=t.querySelector("#nearmiss-type")?.value||"",d=t.querySelector("#nearmiss-date")?.value||"",i=(t.querySelector("#nearmiss-observer")?.value||"").trim(),r=(t.querySelector("#nearmiss-phone")?.value||"").trim(),o=(t.querySelector("#nearmiss-location")?.value||"").trim(),p=(t.querySelector("#nearmiss-department")?.value||"").trim(),l=(t.querySelector("#nearmiss-description")?.value||"").trim(),u=(t.querySelector('input[name="nearmiss-corrective"]:checked')?.value||"no")==="yes",h=u?(t.querySelector("#nearmiss-corrective-description")?.value||"").trim():"";if(!n||!d||!i||!o||!p||!l){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0639\u0628\u0626\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}if(r&&!this.validatePhone(r)){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u062A\u0644\u064A\u0641\u0648\u0646 \u0635\u062D\u064A\u062D");return}if(u&&!h){Notification.error("\u064A\u0631\u062C\u0649 \u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0627\u0644\u0645\u0642\u062A\u0631\u062D");return}let g;try{g=Utils.dateTimeLocalToISO(d)||new Date(d).toISOString()}catch{Notification.error("\u0635\u064A\u063A\u0629 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");return}let m=this.state.currentAttachments.map(f=>this.normalizeAttachment(f)).filter(Boolean);const v=new Date().toISOString();let y="";s&&(y=s.innerHTML,s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{if(m&&Array.isArray(m)&&m.length>0){Loading.show("\u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0625\u0644\u0649 Google Drive...");try{Utils.safeLog("NearMiss: \u0642\u0628\u0644 processAttachments - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+m.length),m.length>0&&Utils.safeLog("NearMiss: \u0623\u0648\u0644 \u0645\u0631\u0641\u0642 \u0642\u0628\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629:",{name:m[0].name,hasData:!!m[0].data,hasDirectLink:!!m[0].directLink}),m=await GoogleIntegration.processAttachments?.(m,"NearMiss")||m,Utils.safeLog("NearMiss: \u0628\u0639\u062F processAttachments - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+m.length),m.length>0&&Utils.safeLog("NearMiss: \u0623\u0648\u0644 \u0645\u0631\u0641\u0642 \u0628\u0639\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629:",{name:m[0].name,directLink:m[0].directLink?m[0].directLink.substring(0,50)+"...":"\u0644\u0627 \u064A\u0648\u062C\u062F"})}catch(f){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:",f),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0644\u0643\u0646 \u0641\u0634\u0644 \u0631\u0641\u0639 \u0628\u0639\u0636 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A")}}if(this.state.editingId){const f=AppState.appData.nearmiss.findIndex(w=>w.id===this.state.editingId);if(f===-1)throw new Error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");const b=this.normalizeRecord(AppState.appData.nearmiss[f]),x={...b,type:n,date:g,observerName:i,phone:r,location:o,department:p,description:l,correctiveProposed:u,correctiveDescription:h,attachments:m,status:b.status||(u?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642"),updatedAt:v,updatedBy:this.getCurrentUserSummary(),reportedBy:i};AppState.appData.nearmiss[f]=x}else{const f=this.getCurrentUserSummary(),b={id:Utils.generateSequentialId("NRM",AppState.appData?.nearmiss||[]),type:n,date:g,observerName:i,phone:r,location:o,department:p,description:l,correctiveProposed:u,correctiveDescription:h,attachments:m,createdBy:f,createdById:f?.id||AppState.currentUser?.id||"",createdAt:v,updatedAt:v,updatedBy:null,status:u?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642",reportedBy:i};AppState.appData.nearmiss.push(b)}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),this.closeModal(a),Notification.success(this.state.editingId?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D"),s&&(s.disabled=!1,s.innerHTML=y),this.updateSummary(),this.renderTable(),this.refreshFilterOptions(),GoogleIntegration?.sendRequest&&Promise.resolve().then(async()=>{try{this.state.editingId?await GoogleIntegration.sendRequest({action:"updateNearMiss",data:{nearMissId:this.state.editingId,updateData:updatedRecord}}):await GoogleIntegration.sendRequest({action:"addNearMiss",data:newRecord})}catch(f){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0641\u064A Google Sheets:",f)}}).catch(f=>{Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0641\u064A Google Sheets:",f)})}catch(f){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643:",f),Notification.error(f.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),s&&(s.disabled=!1,s.innerHTML=y)}finally{this.state.currentAttachments=[],this.state.editingId=null}},closeModal(e){e&&e.parentNode&&e.parentNode.removeChild(e),this.state.currentAttachments=[],this.state.editingId=null},refreshFilterOptions(){const e=document.getElementById("nearmiss-filter-department");e&&(e.innerHTML=this.renderDepartmentOptions(this.state.filters.department))},viewNearMiss(e){if(!e)return;const t=AppState.appData.nearmiss.find(n=>n.id===e);if(!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}const a=this.normalizeRecord(t),s=this.buildDetailModal(a);document.body.appendChild(s),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(s,{moduleKey:"nearmiss",record:a,recordId:a.id||a.isoCode||""}),this.applyModuleI18n(s),s.addEventListener("click",n=>{n.target===s&&this.closeModal(s)})},buildDetailModal(e){const t=e.attachments&&e.attachments.length?e.attachments.map(i=>{const r=/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(i.name||""),p=i.type&&i.type.startsWith("image/")||r,l=this.processAttachmentUrl(i.data);return p&&l?`
                        <div class="bg-gray-50 border border-gray-200 rounded p-3">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <div class="text-sm font-medium text-gray-800">${Utils.escapeHTML(i.name)}</div>
                                    <div class="text-xs text-gray-500">${i.size?`${i.size} KB`:""}</div>
                                </div>
                                <a href="${l}" target="_blank" class="text-sm text-blue-600 hover:underline" download="${Utils.escapeHTML(i.name)}">\u062A\u062D\u0645\u064A\u0644</a>
                            </div>
                            <img src="${Utils.escapeHTML(l)}" alt="${Utils.escapeHTML(i.name)}" class="max-w-full h-auto rounded border" style="max-height: 300px;"
                                 onerror="this.onerror=null; this.style.display='none';">
                        </div>
                    `:`
                        <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2">
                            <div>
                                <div class="text-sm font-medium text-gray-800">${Utils.escapeHTML(i.name)}</div>
                                <div class="text-xs text-gray-500">${i.size?`${i.size} KB`:""}</div>
                            </div>
                            <div class="flex items-center gap-3">
                                <a href="${l||i.data}" target="_blank" class="text-sm text-blue-600 hover:underline" download="${Utils.escapeHTML(i.name)}">\u062A\u062D\u0645\u064A\u0644</a>
                            </div>
                        </div>
                    `}).join(""):'<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A</p>',a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("nearmiss"):""}
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
        `;const s=a.querySelector('[data-action="close-modal"]');s&&s.addEventListener("click",()=>this.closeModal(a));const n=a.querySelector('[data-action="detail-edit"]');n&&n.addEventListener("click",()=>{const i=n.getAttribute("data-id");this.closeModal(a),this.editNearMiss(i)});const d=a.querySelector('[data-action="detail-print"]');return d&&d.addEventListener("click",()=>{const i=d.getAttribute("data-id");this.printNearMiss(i)}),a},printNearMiss(e){const t=AppState.appData.nearmiss.find(a=>a.id===e);if(!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629...");const a=t.attachments&&t.attachments.length?t.attachments.map(l=>{const c=/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(l.name||""),h=l.type&&l.type.startsWith("image/")||c,g=this.processAttachmentUrl(l.data);return h&&g?`
                            <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                                <div style="font-weight: bold; margin-bottom: 5px;">${Utils.escapeHTML(l.name)}</div>
                                <img src="${Utils.escapeHTML(g)}" alt="${Utils.escapeHTML(l.name)}" style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; border-radius: 4px;"
                                     onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                            </div>
                        `:`
                            <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                                <div style="font-weight: bold;">${Utils.escapeHTML(l.name)}</div>
                            </div>
                        `}).join(""):'<p style="color: #999;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A</p>',s=`NEAR-${t.id?.substring(0,8)||"UNKNOWN"}`,n="\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 - Near Miss Report",d=`
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
                    ${a}
                </div>
            `,i=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,n,d,!1,!0,{version:"1.0"},t.createdAt,t.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${n}</title></head><body>${d}</body></html>`,r=new Blob([i],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(r),p=window.open(o,"_blank");p?p.onload=()=>{const l=p.document.querySelectorAll("img");let c=0;const u=l.length;if(u===0)setTimeout(()=>{p.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3),Loading.hide()},300);else{const h=()=>{c>=u&&setTimeout(()=>{p.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3),Loading.hide()},300)};l.forEach(g=>{g.complete?(c++,h()):(g.onload=()=>{c++,h()},g.onerror=()=>{c++,h()})}),setTimeout(()=>{c<u&&(p.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3),Loading.hide())},3e3)}}:(URL.revokeObjectURL(o),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0646\u0648\u0627\u0641\u0630 \u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"))}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:",a),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629: "+a.message)}},editNearMiss(e){if(!e)return;const t=AppState.appData.nearmiss.find(a=>a.id===e);if(!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}this.showForm(t)},async deleteNearMiss(e){if(!e)return;if(!AppState.appData.nearmiss.find(a=>a.id===e)){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\u061F")){Loading.show();try{if(AppState.appData.nearmiss=AppState.appData.nearmiss.filter(a=>a.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),GoogleIntegration?.sendRequest)try{await GoogleIntegration.sendRequest({action:"deleteNearMiss",data:{nearMissId:e}})}catch(a){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0645\u0646 Google Sheets:",a)}Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")}finally{Loading.hide(),this.updateSummary(),this.renderTable(),this.refreshFilterOptions()}}}};(function(){"use strict";try{typeof window<"u"&&typeof NearMiss<"u"&&(window.NearMiss=NearMiss,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 NearMiss module loaded and available on window.NearMiss"))}catch{if(typeof window<"u"&&typeof NearMiss<"u")try{window.NearMiss=NearMiss}catch{}}})();
