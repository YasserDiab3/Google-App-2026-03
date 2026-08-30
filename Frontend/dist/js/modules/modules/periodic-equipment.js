const PeriodicEquipment={state:{filters:{search:"",typeId:"all",status:"all",location:"all"}},_qrStream:null,_qrScanInterval:null,isAdmin(){return typeof PeriodicInspections<"u"&&typeof PeriodicInspections.isCurrentUserAdmin=="function"?PeriodicInspections.isCurrentUserAdmin():!1},_t(e,t){try{if(typeof I18n<"u"&&I18n.t)return I18n.t(e,t)}catch{}return t},ensureData(){typeof PeriodicEquipmentStore<"u"&&PeriodicEquipmentStore.ensureInitialized()},getSiteOptions(){return typeof PeriodicInspections<"u"&&typeof PeriodicInspections.getSiteOptions=="function"?PeriodicInspections.getSiteOptions():[]},getPlaceOptions(e){return typeof PeriodicInspections<"u"&&typeof PeriodicInspections.getPlaceOptions=="function"?PeriodicInspections.getPlaceOptions(e):[]},resolveAssetFactoryId(e){if(!e)return"";if(e.factoryId)return String(e.factoryId);if(e.factory)return String(e.factory);if(e.location){const t=this.getSiteOptions().find(i=>i.name===e.location);if(t)return String(t.id)}return""},resolveAssetSubLocationId(e,t){if(!e)return"";if(e.subLocationId)return String(e.subLocationId);const i=t||this.resolveAssetFactoryId(e);if(e.subLocation&&i){const a=this.getPlaceOptions(i).find(s=>s.name===e.subLocation||s.id===e.subLocation);if(a)return String(a.id)}return""},getAssetSiteLabel(e){return e?.factoryName||e?.location||"-"},getAssetSubLocationLabel(e){return e?.subLocationName||e?.subLocation||"-"},getAssets(){return this.ensureData(),PeriodicEquipmentStore.listAssets()},statusOptions:[{value:"\u0635\u0627\u0644\u062D",label:"\u0635\u0627\u0644\u062D",cls:"badge-success"},{value:"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629",label:"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629",cls:"badge-warning"},{value:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629",label:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629",cls:"badge-danger"}],getStatusBadge(e){const t=this.statusOptions.find(i=>i.value===e)||{label:e||"-",cls:"badge-secondary"};return`<span class="badge ${t.cls}">${Utils.escapeHTML(t.label)}</span>`},getStatusAccent(e){const t=String(e||"").trim();return t==="\u0635\u0627\u0644\u062D"?"green":t==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?"amber":t==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"?"red":"gray"},async renderTab(){return this.ensureData(),await this.renderDatabaseTab()},async renderDatabaseTab(){const e=this.getFilteredAssets(),t=this.getStats(),i=PeriodicEquipmentStore.listTypes();return`
            <div class="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-800">
                    <i class="fas fa-database ml-2"></i>
                    ${this._t("module.periodic.equipment.title","\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u062F\u0627\u062A")}
                </h3>
                <div class="flex flex-wrap gap-2">
                    ${this.isAdmin()?`
                    <button type="button" id="pe-manage-types-btn" class="btn-secondary">
                        <i class="fas fa-cog ml-2"></i>${this._t("module.periodic.equipment.manageTypes","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}
                    </button>
                    <button type="button" id="pe-add-asset-btn" class="btn-secondary">
                        <i class="fas fa-plus ml-2"></i>${this._t("module.periodic.equipment.addAsset","\u0625\u0636\u0627\u0641\u0629 \u0645\u0639\u062F\u0629")}
                    </button>
                    `:""}
                    <button type="button" id="pe-scan-qr-btn" class="btn-primary">
                        <i class="fas fa-qrcode ml-2"></i>${this._t("module.periodic.equipment.scanQr","\u0645\u0633\u062D QR \u0644\u0644\u0641\u062D\u0635")}
                    </button>
                    <button type="button" id="pe-refresh-btn" class="btn-secondary">
                        <i class="fas fa-sync-alt ml-2"></i>${this._t("module.periodic.equipment.refresh","\u062A\u062D\u062F\u064A\u062B")}
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div class="pinsp-stat">
                    <div class="pinsp-stat__icon pinsp-stat__icon--blue"><i class="fas fa-database"></i></div>
                    <div class="pinsp-stat__body">
                        <p class="pinsp-stat__label">${this._t("module.periodic.equipment.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0639\u062F\u0627\u062A")}</p>
                        <p class="pinsp-stat__value" id="pe-stat-total">${t.total}</p>
                        <div class="pinsp-stat__bar"><span style="width:100%; background:#2563eb;"></span></div>
                    </div>
                    <span class="pinsp-stat__pct">${t.total?"100%":"0%"}</span>
                </div>
                <div class="pinsp-stat">
                    <div class="pinsp-stat__icon pinsp-stat__icon--green"><i class="fas fa-check-circle"></i></div>
                    <div class="pinsp-stat__body">
                        <p class="pinsp-stat__label">${this._t("module.periodic.equipment.valid","\u0635\u0627\u0644\u062D")}</p>
                        <p class="pinsp-stat__value" id="pe-stat-valid">${t.valid}</p>
                        <div class="pinsp-stat__bar"><span style="width:${t.total?Math.round(t.valid/t.total*100):0}%; background:#22c55e;"></span></div>
                    </div>
                    <span class="pinsp-stat__pct">${t.total?Math.round(t.valid/t.total*100):0}%</span>
                </div>
                <div class="pinsp-stat">
                    <div class="pinsp-stat__icon pinsp-stat__icon--amber"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="pinsp-stat__body">
                        <p class="pinsp-stat__label">${this._t("module.periodic.equipment.needsAttention","\u0628\u062D\u0627\u062C\u0629 \u0645\u062A\u0627\u0628\u0639\u0629")}</p>
                        <p class="pinsp-stat__value" id="pe-stat-attention">${t.needsAttention}</p>
                        <div class="pinsp-stat__bar"><span style="width:${t.total?Math.round(t.needsAttention/t.total*100):0}%; background:#f59e0b;"></span></div>
                    </div>
                    <span class="pinsp-stat__pct">${t.total?Math.round(t.needsAttention/t.total*100):0}%</span>
                </div>
                <div class="pinsp-stat">
                    <div class="pinsp-stat__icon pinsp-stat__icon--red"><i class="fas fa-ban"></i></div>
                    <div class="pinsp-stat__body">
                        <p class="pinsp-stat__label">${this._t("module.periodic.equipment.outOfService","\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629")}</p>
                        <p class="pinsp-stat__value" id="pe-stat-out">${t.outOfService}</p>
                        <div class="pinsp-stat__bar"><span style="width:${t.total?Math.round(t.outOfService/t.total*100):0}%; background:#ef4444;"></span></div>
                    </div>
                    <span class="pinsp-stat__pct">${t.total?Math.round(t.outOfService/t.total*100):0}%</span>
                </div>
            </div>
            <div class="content-card mb-4">
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="form-label">${this._t("module.periodic.equipment.search","\u0628\u062D\u062B")}</label>
                            <input type="text" id="pe-filter-search" class="form-input" value="${Utils.escapeHTML(this.state.filters.search)}" placeholder="\u0631\u0642\u0645\u060C \u0646\u0648\u0639\u060C \u0645\u0648\u0642\u0639...">
                        </div>
                        <div>
                            <label class="form-label">${this._t("module.periodic.equipment.type","\u0627\u0644\u0646\u0648\u0639")}</label>
                            <select id="pe-filter-type" class="form-input">
                                <option value="all">${this._t("module.periodic.equipment.allTypes","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                                ${i.map(a=>`<option value="${Utils.escapeHTML(a.id)}" ${this.state.filters.typeId===a.id?"selected":""}>${Utils.escapeHTML(a.name)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="form-label">${this._t("module.periodic.equipment.status","\u0627\u0644\u062D\u0627\u0644\u0629")}</label>
                            <select id="pe-filter-status" class="form-input">
                                <option value="all">${this._t("module.periodic.equipment.allStatuses","\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A")}</option>
                                ${this.statusOptions.map(a=>`<option value="${a.value}" ${this.state.filters.status===a.value?"selected":""}>${Utils.escapeHTML(a.label)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="form-label">${this._t("module.periodic.equipment.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</label>
                            <select id="pe-filter-location" class="form-input">
                                <option value="all">${this._t("module.periodic.equipment.allLocations","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}</option>
                                ${this.getSiteOptions().map(a=>`<option value="${Utils.escapeHTML(a.id)}" ${this.state.filters.location===a.id?"selected":""}>${Utils.escapeHTML(a.name)}</option>`).join("")}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                        <h2 class="card-title"><i class="fas fa-list ml-2"></i>${this._t("module.periodic.equipment.registry","\u0633\u062C\u0644 \u0627\u0644\u0645\u0639\u062F\u0627\u062A")}</h2>
                        <span class="badge badge-info">${e.length} \u0645\u0639\u062F\u0629</span>
                    </div>
                </div>
                <div class="card-body" id="pe-assets-table-wrap">
                    ${this.renderAssetsTable(e)}
                </div>
            </div>
        `},getStats(){const e=this.getAssets();return{total:e.length,valid:e.filter(t=>t.status==="\u0635\u0627\u0644\u062D").length,needsAttention:e.filter(t=>t.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"||t.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length,outOfService:e.filter(t=>t.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length}},getFilteredAssets(){const e=this.state.filters;return this.getAssets().filter(t=>{if(e.typeId!=="all"&&t.typeId!==e.typeId||e.status!=="all"&&t.status!==e.status||e.location!=="all"&&!(t.factoryId===e.location||t.factory===e.location||t.location===e.location))return!1;if(e.search){const i=e.search.toLowerCase();if(![t.id,t.assetNumber,t.typeName,t.location,t.serialNumber,t.manufacturer].join(" ").toLowerCase().includes(i))return!1}return!0})},renderAssetsTable(e){return e.length?`
            <div class="table-wrapper overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${this._t("module.periodic.equipment.colNumber","\u0627\u0644\u0631\u0642\u0645")}</th>
                            <th>${this._t("module.periodic.equipment.colType","\u0627\u0644\u0646\u0648\u0639")}</th>
                            <th>${this._t("module.periodic.equipment.colLocation","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                            <th>${this._t("module.periodic.equipment.colSubLocation","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</th>
                            <th>${this._t("module.periodic.equipment.colStatus","\u0627\u0644\u062D\u0627\u0644\u0629")}</th>
                            <th>${this._t("module.periodic.equipment.colLastInspection","\u0622\u062E\u0631 \u0641\u062D\u0635")}</th>
                            <th>${this._t("module.periodic.equipment.colActions","\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(t=>`
                            <tr class="pinsp-row pinsp-equipment-row accent-${this.getStatusAccent(t.status)}">
                                <td><span class="font-mono font-semibold text-blue-600">${Utils.escapeHTML(t.assetNumber||t.id)}</span></td>
                                <td>${Utils.escapeHTML(t.typeName||"-")}</td>
                                <td>${Utils.escapeHTML(this.getAssetSiteLabel(t))}</td>
                                <td class="text-sm text-gray-600">${Utils.escapeHTML(this.getAssetSubLocationLabel(t))}</td>
                                <td>${this.getStatusBadge(t.status)}</td>
                                <td>${t.lastInspection?Utils.formatDate(t.lastInspection):"-"}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button type="button" class="btn-icon btn-icon-primary" data-pe-action="view" data-id="${Utils.escapeHTML(t.id)}" title="\u0639\u0631\u0636"><i class="fas fa-eye"></i></button>
                                        <button type="button" class="btn-icon btn-icon-success" data-pe-action="inspect" data-id="${Utils.escapeHTML(t.id)}" title="\u0641\u062D\u0635"><i class="fas fa-clipboard-check"></i></button>
                                        ${this.isAdmin()?`
                                        <button type="button" class="btn-icon btn-icon-warning" data-pe-action="edit" data-id="${Utils.escapeHTML(t.id)}" title="\u062A\u0639\u062F\u064A\u0644"><i class="fas fa-edit"></i></button>
                                        <button type="button" class="btn-icon btn-icon-danger" data-pe-action="delete" data-id="${Utils.escapeHTML(t.id)}" title="\u062D\u0630\u0641"><i class="fas fa-trash"></i></button>
                                        `:""}
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `:`<div class="empty-state"><p class="text-gray-500">${this._t("module.periodic.equipment.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629")}</p></div>`},bindTabEvents(e){const t=e||document.getElementById("periodic-inspections-content-area");if(!t)return;const i=()=>{const s=document.getElementById("pe-assets-table-wrap");if(!s)return;const n=this.getFilteredAssets();s.innerHTML=this.renderAssetsTable(n);const l=this.getStats(),o=document.getElementById("pe-stat-total"),d=document.getElementById("pe-stat-valid"),p=document.getElementById("pe-stat-attention");o&&(o.textContent=l.total),d&&(d.textContent=l.valid),p&&(p.textContent=l.needsAttention),this.bindTableActions(t)};["pe-filter-search","pe-filter-type","pe-filter-status","pe-filter-location"].forEach(s=>{const n=t.querySelector("#"+s)||document.getElementById(s);if(!n||n.dataset.peBound==="1")return;n.dataset.peBound="1";const l=()=>{this.state.filters.search=(document.getElementById("pe-filter-search")?.value||"").trim(),this.state.filters.typeId=document.getElementById("pe-filter-type")?.value||"all",this.state.filters.status=document.getElementById("pe-filter-status")?.value||"all",this.state.filters.location=document.getElementById("pe-filter-location")?.value||"all",i()};n.addEventListener(n.tagName==="INPUT"?"input":"change",l)});const a=(s,n)=>{const l=document.getElementById(s);!l||l.dataset.peBound==="1"||(l.dataset.peBound="1",l.addEventListener("click",n))};a("pe-add-asset-btn",()=>this.showAssetForm()),a("pe-manage-types-btn",()=>this.showTypeManagement()),a("pe-scan-qr-btn",()=>this.startQRScan()),a("pe-refresh-btn",async()=>{await this.loadDataFromBackend(!0),typeof PeriodicInspections<"u"&&await PeriodicInspections.refreshCurrentTabContent()}),this.bindTableActions(t)},bindTableActions(e){const t=e||document.getElementById("periodic-inspections-content-area");t&&t.querySelectorAll("[data-pe-action]").forEach(i=>{i.dataset.peActionBound!=="1"&&(i.dataset.peActionBound="1",i.addEventListener("click",async()=>{const a=i.getAttribute("data-pe-action"),s=i.getAttribute("data-id"),n=PeriodicEquipmentStore.getAssetById(s);n&&(a==="view"?await this.showAssetDetails(n):a==="inspect"?await this.showInspectionForm(n):a==="edit"?await this.showAssetForm(n):a==="delete"&&await this.deleteAsset(n))}))})},async showAssetForm(e=null){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=!!e,i=PeriodicEquipmentStore.listTypes(),a=e?.id||PeriodicEquipmentStore.generateAssetId(),s=this.resolveAssetFactoryId(e),n=this.resolveAssetSubLocationId(e,s),l=this.getPlaceOptions(s),o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0639\u062F\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0639\u062F\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
                    <button type="button" class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <form id="pe-asset-form">
                    <div class="modal-body space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629 *</label>
                                <select id="pe-asset-type" class="form-input" required>
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                    ${i.map(c=>`<option value="${Utils.escapeHTML(c.id)}" ${e?.typeId===c.id?"selected":""}>${Utils.escapeHTML(c.name)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u0645\u0639\u062F\u0629</label>
                                <input type="text" id="pe-asset-number" class="form-input" value="${Utils.escapeHTML(e?.assetNumber||a)}" readonly>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u0642\u0639 *</label>
                                <select id="pe-asset-site" class="form-input" required>
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                    ${this.getSiteOptions().map(c=>{const r=s&&(s===c.id||s===String(c.id));return`<option value="${Utils.escapeHTML(c.id)}" ${r?"selected":""}>${Utils.escapeHTML(c.name)}</option>`}).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                <select id="pe-asset-sub-location" class="form-input">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A --</option>
                                    ${l.map(c=>{const r=n&&(n===c.id||n===String(c.id));return`<option value="${Utils.escapeHTML(c.id)}" ${r?"selected":""}>${Utils.escapeHTML(c.name)}</option>`}).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629</label>
                                <input type="text" id="pe-asset-manufacturer" class="form-input" value="${Utils.escapeHTML(e?.manufacturer||"")}">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u062F\u064A\u0644</label>
                                <input type="text" id="pe-asset-model" class="form-input" value="${Utils.escapeHTML(e?.model||"")}">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A</label>
                                <input type="text" id="pe-asset-serial" class="form-input" value="${Utils.escapeHTML(e?.serialNumber||"")}">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <select id="pe-asset-status" class="form-input">
                                    ${this.statusOptions.map(c=>`<option value="${c.value}" ${e?.status===c.value?"selected":""}>${Utils.escapeHTML(c.label)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0633\u0624\u0648\u0644</label>
                                <input type="text" id="pe-asset-responsible" class="form-input" value="${Utils.escapeHTML(e?.responsible||"")}">
                            </div>
                            <div>
                                <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0631\u0643\u064A\u0628</label>
                                <input type="date" id="pe-asset-install" class="form-input" value="${e?.installationDate?String(e.installationDate).slice(0,10):""}">
                            </div>
                        </div>
                        <div>
                            <label class="form-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                            <textarea id="pe-asset-notes" class="form-input" rows="2">${Utils.escapeHTML(e?.notes||"")}</textarea>
                        </div>
                        ${e?.typeId==="pet_extinguisher"?`
                        <div class="p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                            <i class="fas fa-info-circle ml-1"></i>
                            \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644 \u062E\u0627\u0635 \u0628\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629 \u0648\u0644\u064A\u0633 \u0645\u062F\u064A\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0627\u0644\u0645\u0646\u0641\u0635\u0644.
                        </div>`:""}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" data-close>\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" class="btn-primary"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638</button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(o);const d=()=>o.remove();o.querySelector(".modal-close")?.addEventListener("click",d),o.querySelector("[data-close]")?.addEventListener("click",d),o.addEventListener("click",c=>{c.target===o&&d()});const p=o.querySelector("#pe-asset-site"),f=o.querySelector("#pe-asset-sub-location");p&&f&&p.addEventListener("change",()=>{const c=this.getPlaceOptions(p.value);f.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A --</option>'+c.map(r=>`<option value="${Utils.escapeHTML(r.id)}">${Utils.escapeHTML(r.name)}</option>`).join("")}),o.querySelector("#pe-asset-form")?.addEventListener("submit",async c=>{c.preventDefault();try{const r=o.querySelector("#pe-asset-type")?.value,g=PeriodicEquipmentStore.getTypeById(r),u=o.querySelector("#pe-asset-site")?.value||"",b=o.querySelector("#pe-asset-sub-location")?.value||"";if(!u){Notification.warning("\u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0648\u0642\u0639");return}const v=this.getSiteOptions().find(m=>m.id===u),y=this.getPlaceOptions(u).find(m=>m.id===b),h={...e||{},id:a,typeId:r,typeName:g?.name||"",assetNumber:o.querySelector("#pe-asset-number")?.value.trim()||a,factoryId:u,factory:u,factoryName:v?.name||"",location:v?.name||"",subLocationId:b||"",subLocation:y?.name||"",subLocationName:y?.name||"",manufacturer:o.querySelector("#pe-asset-manufacturer")?.value.trim(),model:o.querySelector("#pe-asset-model")?.value.trim(),serialNumber:o.querySelector("#pe-asset-serial")?.value.trim(),status:o.querySelector("#pe-asset-status")?.value,responsible:o.querySelector("#pe-asset-responsible")?.value.trim(),installationDate:o.querySelector("#pe-asset-install")?.value||"",notes:o.querySelector("#pe-asset-notes")?.value.trim()};PeriodicEquipmentStore.upsertAsset(h),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&await GoogleIntegration.sendRequest({action:"saveOrUpdatePeriodicEquipmentAsset",data:h}).catch(()=>{}),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0639\u062F\u0629":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0639\u062F\u0629"),d(),typeof PeriodicInspections<"u"&&await PeriodicInspections.refreshCurrentTabContent()}catch(r){Notification.error(r.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}})},async deleteAsset(e){if(this.isAdmin()&&confirm(`\u062D\u0630\u0641 \u0627\u0644\u0645\u0639\u062F\u0629 ${e.assetNumber||e.id}\u061F`))try{PeriodicEquipmentStore.deleteAsset(e.id),typeof GoogleIntegration<"u"&&await GoogleIntegration.sendRequest({action:"deletePeriodicEquipmentAsset",data:{assetId:e.id}}).catch(()=>{}),Notification.success("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641"),typeof PeriodicInspections<"u"&&await PeriodicInspections.refreshCurrentTabContent()}catch(t){Notification.error(t.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641")}},async showTypeManagement(){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629.");return}const e=PeriodicEquipmentStore.getAllTypes(),t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <h2 class="modal-title text-white"><i class="fas fa-cog ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0639\u062F\u0627\u062A</h2>
                    <button type="button" class="modal-close text-white"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="flex justify-end mb-3">
                        <button type="button" id="pe-add-type-btn" class="btn-primary btn-sm"><i class="fas fa-plus ml-1"></i>\u0646\u0648\u0639 \u062C\u062F\u064A\u062F</button>
                    </div>
                    <div class="space-y-2" id="pe-types-list">
                        ${e.map(s=>`
                            <div class="flex items-center justify-between border rounded p-3 gap-2">
                                <div class="flex items-center gap-2">
                                    <i class="fas ${Utils.escapeHTML(s.icon||"fa-toolbox")} text-blue-600"></i>
                                    <div>
                                        <div class="font-semibold">${Utils.escapeHTML(s.name)}${s.isDefault?' <span class="text-xs text-gray-400">(\u0627\u0641\u062A\u0631\u0627\u0636\u064A)</span>':""}</div>
                                        <div class="text-xs text-gray-500">${Utils.escapeHTML(s.description||"")}</div>
                                    </div>
                                </div>
                                <div class="flex gap-1">
                                    <button type="button" class="btn-icon btn-icon-warning" data-edit-type="${Utils.escapeHTML(s.id)}"><i class="fas fa-edit"></i></button>
                                    ${s.isDefault?"":`<button type="button" class="btn-icon btn-icon-danger" data-del-type="${Utils.escapeHTML(s.id)}"><i class="fas fa-trash"></i></button>`}
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `,document.body.appendChild(t);const i=()=>t.remove();t.querySelector(".modal-close")?.addEventListener("click",i),t.addEventListener("click",s=>{s.target===t&&i()});const a=(s=null)=>{const n=document.createElement("div");n.className="modal-overlay",n.style.zIndex="10001",n.innerHTML=`
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header"><h2 class="modal-title">${s?"\u062A\u0639\u062F\u064A\u0644 \u0646\u0648\u0639":"\u0646\u0648\u0639 \u062C\u062F\u064A\u062F"}</h2></div>
                    <form id="pe-type-form">
                        <div class="modal-body space-y-3">
                            <div><label class="form-label">\u0627\u0644\u0627\u0633\u0645 *</label><input id="pe-type-name" class="form-input" required value="${Utils.escapeHTML(s?.name||"")}"></div>
                            <div><label class="form-label">\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 (FontAwesome)</label><input id="pe-type-icon" class="form-input" value="${Utils.escapeHTML(s?.icon||"fa-toolbox")}" placeholder="fa-toolbox"></div>
                            <div><label class="form-label">\u0642\u0627\u0644\u0628 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u0631\u062A\u0628\u0637</label>
                                <select id="pe-type-template" class="form-input">
                                    <option value="">\u2014 \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u2014</option>
                                    ${Object.values(PeriodicInspections?.INSPECTION_TEMPLATES||{}).map(o=>`<option value="${Utils.escapeHTML(o.id)}" ${s?.linkedTemplateId===o.id?"selected":""}>${Utils.escapeHTML(o.name)}</option>`).join("")}
                                </select>
                            </div>
                            <div><label class="form-label">\u0627\u0644\u0648\u0635\u0641</label><textarea id="pe-type-desc" class="form-input" rows="2">${Utils.escapeHTML(s?.description||"")}</textarea></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" data-close>\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">\u062D\u0641\u0638</button>
                        </div>
                    </form>
                </div>
            `,document.body.appendChild(n);const l=()=>n.remove();n.querySelector("[data-close]")?.addEventListener("click",l),n.querySelector("#pe-type-form")?.addEventListener("submit",async o=>{o.preventDefault();try{const d=PeriodicEquipmentStore.upsertType({...s||{},name:n.querySelector("#pe-type-name")?.value.trim(),icon:n.querySelector("#pe-type-icon")?.value.trim(),linkedTemplateId:n.querySelector("#pe-type-template")?.value||"",description:n.querySelector("#pe-type-desc")?.value.trim()});typeof GoogleIntegration<"u"&&await GoogleIntegration.sendRequest({action:"savePeriodicEquipmentType",data:d}).catch(()=>{}),Notification.success("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638"),l(),i(),await this.showTypeManagement()}catch(d){Notification.error(d.message)}})};t.querySelector("#pe-add-type-btn")?.addEventListener("click",()=>a()),t.querySelectorAll("[data-edit-type]").forEach(s=>{s.addEventListener("click",()=>{const n=s.getAttribute("data-edit-type");a(PeriodicEquipmentStore.getTypeById(n))})}),t.querySelectorAll("[data-del-type]").forEach(s=>{s.addEventListener("click",async()=>{const n=s.getAttribute("data-del-type");if(confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639\u061F"))try{PeriodicEquipmentStore.deleteType(n),await GoogleIntegration?.sendRequest?.({action:"deletePeriodicEquipmentType",data:{typeId:n}}).catch(()=>{}),Notification.success("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641"),i(),await this.showTypeManagement()}catch(l){Notification.error(l.message)}})})},async showAssetDetails(e){const t=PeriodicEquipmentStore.listInspections(e.id),i=typeof QRCode<"u"?QRCode.generate(e.qrCodeData||e.id,180):null,a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 820px;">
                <div class="modal-header"><h2 class="modal-title">\u0645\u0639\u062F\u0629 ${Utils.escapeHTML(e.assetNumber||e.id)}</h2>
                    <button type="button" class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="content-card"><div class="card-body text-sm space-y-1">
                            <p><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(e.typeName||"-")}</p>
                            <p><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(this.getAssetSiteLabel(e))}</p>
                            <p><strong>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A:</strong> ${Utils.escapeHTML(this.getAssetSubLocationLabel(e))}</p>
                            <p><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> ${this.getStatusBadge(e.status)}</p>
                            <p><strong>\u0627\u0644\u0645\u0635\u0646\u0639:</strong> ${Utils.escapeHTML(e.manufacturer||"-")}</p>
                            <p><strong>\u0627\u0644\u0645\u0648\u062F\u064A\u0644:</strong> ${Utils.escapeHTML(e.model||"-")}</p>
                            <p><strong>\u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A:</strong> ${Utils.escapeHTML(e.serialNumber||"-")}</p>
                            <p><strong>\u0627\u0644\u0645\u0633\u0624\u0648\u0644:</strong> ${Utils.escapeHTML(e.responsible||"-")}</p>
                            ${e.notes?`<p><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong> ${Utils.escapeHTML(e.notes)}</p>`:""}
                        </div></div>
                        <div class="content-card text-center"><div class="card-body">
                            ${i?`<img src="${i}" alt="QR" class="mx-auto h-36 w-36 border p-2 bg-white">`:'<p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F QR</p>'}
                            <button type="button" class="btn-secondary mt-2" id="pe-print-qr"><i class="fas fa-print ml-1"></i>\u0637\u0628\u0627\u0639\u0629 QR</button>
                            <p class="text-xs text-gray-400 mt-2 break-all">${Utils.escapeHTML(e.qrCodeData||e.id)}</p>
                        </div></div>
                    </div>
                    <div class="content-card">
                        <div class="card-header"><h3 class="card-title">\u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A (${t.length})</h3></div>
                        <div class="card-body">
                            ${t.length?`<table class="data-table text-sm"><thead><tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u0627\u0644\u0645\u0641\u062A\u0634</th><th>\u0627\u0644\u0646\u062A\u064A\u062C\u0629</th></tr></thead><tbody>
                                ${t.slice(0,10).map(n=>`<tr><td>${Utils.formatDate(n.inspectionDate)}</td><td>${Utils.escapeHTML(n.inspector||"-")}</td><td>${Utils.escapeHTML(n.result||"-")}</td></tr>`).join("")}
                            </tbody></table>`:'<p class="text-gray-500">\u0644\u0627 \u0641\u062D\u0648\u0635\u0627\u062A \u0628\u0639\u062F</p>'}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-close>\u0625\u063A\u0644\u0627\u0642</button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("periodic-equipment"):""}
                    <button type="button" class="btn-primary" id="pe-detail-inspect"><i class="fas fa-clipboard-check ml-1"></i>\u0641\u062D\u0635 \u0627\u0644\u0622\u0646</button>
                </div>
            </div>
        `,document.body.appendChild(a),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(a,{moduleKey:"periodic-equipment",record:e,recordId:e.id||e.assetNumber||""});const s=()=>a.remove();a.querySelector(".modal-close")?.addEventListener("click",s),a.querySelector("[data-close]")?.addEventListener("click",s),a.querySelector("#pe-print-qr")?.addEventListener("click",()=>this.printQr(e)),a.querySelector("#pe-detail-inspect")?.addEventListener("click",()=>{s(),this.showInspectionForm(e)})},printQr(e){const t=typeof QRCode<"u"?QRCode.generate(e.qrCodeData||e.id,240):"",i=window.open("","_blank");if(!i){Notification.warning("\u0627\u0633\u0645\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}i.document.write(`<html dir="rtl"><head><title>QR ${e.id}</title></head><body style="text-align:center;font-family:sans-serif;padding:24px">
            <h2>${Utils.escapeHTML(e.typeName||"")}</h2>
            <p>${Utils.escapeHTML(e.assetNumber||e.id)} \u2014 ${Utils.escapeHTML(this.getAssetSiteLabel(e))}</p>
            ${t?`<img src="${t}" style="width:240px;height:240px">`:""}
            <p style="font-size:12px;margin-top:12px">${Utils.escapeHTML(e.qrCodeData||e.id)}</p>
            <script>window.onload=function(){window.print();}<\/script></body></html>`),i.document.close()},async showInspectionForm(e){const t=PeriodicEquipmentStore.getChecklistForAsset(e),i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 720px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-clipboard-check ml-2"></i>\u0641\u062D\u0635: ${Utils.escapeHTML(e.typeName||"")} \u2014 ${Utils.escapeHTML(e.assetNumber||e.id)}</h2>
                    <button type="button" class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <form id="pe-inspection-form">
                    <div class="modal-body space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635</label><input type="date" id="pe-insp-date" class="form-input" value="${new Date().toISOString().slice(0,10)}" required></div>
                            <div><label class="form-label">\u0627\u0644\u0645\u0641\u062A\u0634</label><input type="text" id="pe-insp-inspector" class="form-input" value="${Utils.escapeHTML(AppState.currentUser?.name||"")}"></div>
                        </div>
                        <div class="content-card"><div class="card-header"><h3 class="card-title text-sm">\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0641\u062D\u0635</h3></div><div class="card-body space-y-2">
                            ${t.map((s,n)=>`
                                <label class="flex items-start gap-2 p-2 border rounded cursor-pointer">
                                    <input type="checkbox" class="mt-1 pe-check-item" data-id="${Utils.escapeHTML(s.id)}" data-label="${Utils.escapeHTML(s.label)}" data-required="${s.required?"1":"0"}">
                                    <span>${Utils.escapeHTML(s.label)}${s.required?' <span class="text-red-500">*</span>':""}</span>
                                </label>
                            `).join("")}
                        </div></div>
                        <div><label class="form-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea id="pe-insp-findings" class="form-input" rows="2"></textarea></div>
                        <div><label class="form-label">\u0627\u0644\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629</label>
                            <select id="pe-insp-result" class="form-input">
                                <option value="\u0645\u0637\u0627\u0628\u0642">\u0645\u0637\u0627\u0628\u0642</option>
                                <option value="\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642">\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642</option>
                                <option value="\u064A\u062D\u062A\u0627\u062C \u0645\u062A\u0627\u0628\u0639\u0629">\u064A\u062D\u062A\u0627\u062C \u0645\u062A\u0627\u0628\u0639\u0629</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" data-close>\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" class="btn-primary"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635</button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(i);const a=()=>i.remove();i.querySelector(".modal-close")?.addEventListener("click",a),i.querySelector("[data-close]")?.addEventListener("click",a),i.querySelector("#pe-inspection-form")?.addEventListener("submit",async s=>{s.preventDefault();const l=[...i.querySelectorAll(".pe-check-item")].map(d=>({id:d.dataset.id,label:d.dataset.label,passed:d.checked,required:d.dataset.required==="1"}));l.filter(d=>d.required&&!d.passed).length&&Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u062C\u0645\u064A\u0639 \u0628\u0646\u0648\u062F \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0623\u0648 \u0627\u062E\u062A\u064A\u0627\u0631 \xAB\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642\xBB");try{const d=PeriodicEquipmentStore.addInspection({assetId:e.id,assetNumber:e.assetNumber,inspectionDate:new Date(i.querySelector("#pe-insp-date")?.value).toISOString(),inspector:i.querySelector("#pe-insp-inspector")?.value.trim(),result:i.querySelector("#pe-insp-result")?.value,findings:i.querySelector("#pe-insp-findings")?.value.trim(),checklistResults:l});typeof GoogleIntegration<"u"&&(await GoogleIntegration.sendRequest({action:"addPeriodicEquipmentInspection",data:d}).catch(()=>{}),await GoogleIntegration.sendRequest({action:"saveOrUpdatePeriodicEquipmentAsset",data:PeriodicEquipmentStore.getAssetById(e.id)}).catch(()=>{})),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635"),a(),typeof PeriodicInspections<"u"&&await PeriodicInspections.refreshCurrentTabContent()}catch(d){Notification.error(d.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635")}})},async startQRScan(){if(!navigator.mediaDevices?.getUserMedia){Notification.error("\u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0644\u0627 \u064A\u062F\u0639\u0645 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u2014 \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header"><h2 class="modal-title"><i class="fas fa-qrcode ml-2"></i>\u0645\u0633\u062D QR \u0644\u0644\u0641\u062D\u0635</h2>
                    <button type="button" class="modal-close" id="pe-qr-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div id="pe-qr-container" style="position:relative;background:#000;border-radius:8px;overflow:hidden">
                        <video id="pe-qr-video" autoplay playsinline muted style="width:100%;max-height:50vh;display:block"></video>
                        <canvas id="pe-qr-canvas" style="display:none"></canvas>
                    </div>
                    <div class="mt-4 flex gap-2">
                        <input type="text" id="pe-manual-id" class="form-input flex-1" placeholder="PEA-0001">
                        <button type="button" id="pe-manual-submit" class="btn-primary">\u062A\u0623\u0643\u064A\u062F</button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(e);const t=e.querySelector("#pe-qr-video"),i=e.querySelector("#pe-qr-canvas"),a=i.getContext("2d"),s=()=>{this.stopQRScan(),e.remove()};e.querySelector("#pe-qr-close")?.addEventListener("click",s);const n=async l=>{const o=String(l||"").trim();if(!o)return;s();const d=PeriodicEquipmentStore.getAssetById(o);if(!d){Notification.error(`\u0644\u0645 \u064A\u064F\u0639\u062B\u0631 \u0639\u0644\u0649 \u0645\u0639\u062F\u0629: ${o}`);return}await this.showInspectionForm(d)};e.querySelector("#pe-manual-submit")?.addEventListener("click",()=>n(e.querySelector("#pe-manual-id")?.value));try{this._qrStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}}}),t.srcObject=this._qrStream,t.addEventListener("loadedmetadata",()=>{i.width=t.videoWidth,i.height=t.videoHeight}),this._qrScanInterval=setInterval(()=>{if(t.readyState!==t.HAVE_ENOUGH_DATA||typeof jsQR>"u")return;a.drawImage(t,0,0,i.width,i.height);const l=jsQR(a.getImageData(0,0,i.width,i.height).data,i.width,i.height);l?.data&&n(l.data.trim())},200)}catch{Notification.warning("\u062A\u0639\u0630\u0631 \u0641\u062A\u062D \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u2014 \u0623\u062F\u062E\u0644 \u0627\u0644\u0631\u0642\u0645 \u064A\u062F\u0648\u064A\u0627\u064B")}},stopQRScan(){this._qrStream&&(this._qrStream.getTracks().forEach(e=>e.stop()),this._qrStream=null),this._qrScanInterval&&(clearInterval(this._qrScanInterval),this._qrScanInterval=null)},async loadDataFromBackend(e){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return;this.ensureData();const t=AppState.appData.periodicEquipmentAssets?.length>0;if(!e&&t&&PeriodicInspections?._peDataLoadedOnce)return;const[i,a,s]=await Promise.allSettled([GoogleIntegration.sendRequest({action:"getAllPeriodicEquipmentTypes",data:{}}),GoogleIntegration.sendRequest({action:"getAllPeriodicEquipmentAssets",data:{}}),GoogleIntegration.sendRequest({action:"getAllPeriodicEquipmentInspections",data:{}})]),n=(l,o)=>{if(o.status!=="fulfilled"||!o.value?.success||!Array.isArray(o.value.data))return;const d=o.value.data;!d.length&&AppState.appData[l]?.length>0||(AppState.appData[l]=d)};n("periodicEquipmentTypes",i),n("periodicEquipmentAssets",a),n("periodicEquipmentInspections",s),PeriodicEquipmentStore.ensureInitialized(),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),typeof PeriodicInspections<"u"&&(PeriodicInspections._peDataLoadedOnce=!0)}};typeof window<"u"&&(window.PeriodicEquipment=PeriodicEquipment);
