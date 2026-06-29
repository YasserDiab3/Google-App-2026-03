const PPE={state:{activeTab:"receipts",isSwitchingTab:!1,eventListeners:new Map,stockItemsCache:null,stockItemsCacheTime:null,stockCacheExpiry:3e5,ppeItemsListCache:null,ppeItemsListCacheTime:null,ppeItemsListCacheExpiry:12e4,ppeItemsOptionsHTML:"",stockStaleWarningMsg:"",stockLoadHardErrorMsg:"",lastSyncTime:null,filters:{receipts:{search:"",equipmentType:"",status:"",dateFrom:"",dateTo:""},stock:{search:"",category:"",supplier:"",status:"",dateFrom:"",dateTo:""}}},_t(e,t){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(e,t):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(e,t):t},applyModuleI18n(e){const t=e&&e.nodeType?e:document.getElementById("ppe-section");if(!t)return;const s=window.AppI18n&&typeof window.AppI18n.applyModuleI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyModuleI18n=="function"?window.I18n:null;s&&s.applyModuleI18n(t)},ensurePpeFilterStyles(){if(document.getElementById("ppe-module-filter-styles"))return;const e=document.createElement("style");e.id="ppe-module-filter-styles",e.textContent=`
            .ppe-visits-filters-row { position: relative; }
            .ppe-visits-filters-row .filters-grid { width: 100%; }
            .ppe-visits-filters-row .filter-field { display: flex; flex-direction: column; gap: 6px; }
            .ppe-visits-filters-row .filter-label {
                font-size: 12px; font-weight: 600; color: #4a5568; text-transform: uppercase;
                letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;
            }
            .ppe-visits-filters-row .filter-label i { font-size: 11px; color: #667eea; }
            .ppe-visits-filters-row .filter-input {
                width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
                background: white; font-size: 14px; color: #2d3748; transition: all 0.2s ease;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }
            .ppe-visits-filters-row .filter-input:focus {
                outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
            .ppe-visits-filters-row .filter-reset-btn {
                width: 100%; padding: 10px 16px; min-height: 42px; border-radius: 12px;
                border: 1px solid #cbd5e1; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                color: #0f172a; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s ease;
                display: flex; align-items: center; justify-content: center; gap: 4px;
            }
            .ppe-visits-filters-row .filter-reset-btn:hover {
                transform: translateY(-1px); box-shadow: 0 6px 14px rgba(15, 23, 42, 0.12);
            }
            .ppe-visits-filters-row .filter-count-badge {
                display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 20px;
                padding: 2px 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white; border-radius: 12px; font-size: 11px; font-weight: 700; margin-inline-start: 4px;
            }
        `,document.head.appendChild(e)},getDisplayStatus(e){const t=String(e||"").trim();return t==="\u0645\u0633\u062A\u0644\u0645"?this._t("module.ppe.status.received","\u0645\u0633\u062A\u0644\u0645"):t==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"?this._t("module.ppe.status.pending","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"):t||"\u2014"},isStatusReceived(e){return String(e||"").trim()==="\u0645\u0633\u062A\u0644\u0645"},getFilteredPpeReceipts(e){const t=Array.isArray(e)?e:[],s=this.state.filters?.receipts||{},a=(s.search||"").trim().toLowerCase(),o=s.equipmentType||"",l=s.status||"",n=s.dateFrom?new Date(s.dateFrom+"T00:00:00"):null,c=s.dateTo?new Date(s.dateTo+"T23:59:59.999"):null;return n&&isNaN(n.getTime())||c&&isNaN(c.getTime())?t:t.filter(r=>{if(o&&String(r.equipmentType||"")!==o||l&&String(r.status||"")!==l)return!1;if(n||c){if(!r.receiptDate)return!1;const i=new Date(r.receiptDate);if(isNaN(i.getTime())||n&&i<n||c&&i>c)return!1}return!(a&&![r.receiptNumber,r.id,r.employeeName,r.employeeCode,r.employeeNumber,r.equipmentType,r.status,r.employeeDepartment].map(p=>String(p||"").toLowerCase()).join(" | ").includes(a))})},hasActiveReceiptFilters(){const e=this.state.filters?.receipts||{};return!!(e.search||e.equipmentType||e.status||e.dateFrom||e.dateTo)},resetReceiptFilters(){this.state.filters||(this.state.filters={}),this.state.filters.receipts={search:"",equipmentType:"",status:"",dateFrom:"",dateTo:""}},getFilteredStockItems(e){const t=Array.isArray(e)?e:[],s=this.state.filters&&this.state.filters.stock||{},a=(s.search||"").trim().toLowerCase(),o=s.category||"",l=s.supplier||"",n=s.status||"",c=s.dateFrom?new Date(s.dateFrom+"T00:00:00"):null,r=s.dateTo?new Date(s.dateTo+"T23:59:59.999"):null;return c&&isNaN(c.getTime())||r&&isNaN(r.getTime())?t:t.filter(i=>{if(!i||o&&String(i.category||"")!==o||l&&String(i.supplier||"")!==l)return!1;if(n){const p=parseFloat(i.balance||0),y=parseFloat(i.minThreshold||0),h=p<y;if(n==="low"&&!h||n==="available"&&h)return!1}if(c||r){if(!i.lastUpdate)return!1;const p=new Date(i.lastUpdate);if(isNaN(p.getTime())||c&&p<c||r&&p>r)return!1}return!(a&&![i.itemCode,i.itemName,i.category,i.supplier].map(y=>String(y||"").toLowerCase()).join(" | ").includes(a))})},hasActiveStockFilters(){const e=this.state.filters&&this.state.filters.stock||{};return!!(e.search||e.category||e.supplier||e.status||e.dateFrom||e.dateTo)},resetStockFilters(){this.state.filters||(this.state.filters={}),this.state.filters.stock={search:"",category:"",supplier:"",status:"",dateFrom:"",dateTo:""}},buildStockFilterRow(e){const t=(i,p)=>this._t(i,p),s=i=>Utils.escapeHTML(i);this.ensurePpeFilterStyles();const a=Array.isArray(e)?e:[],o=this.state.filters&&this.state.filters.stock||{},l=this.getFilteredStockItems(a),n=typeof document<"u"&&(document.documentElement.getAttribute("dir")==="rtl"||window.AppI18n&&window.AppI18n.getCurrentLang&&window.AppI18n.getCurrentLang()==="ar"),c=[...new Set(a.map(i=>i&&i.category).filter(Boolean))].sort(),r=[...new Set(a.map(i=>i&&i.supplier).filter(Boolean))].sort();return`
            <div class="ppe-visits-filters-row visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 0 14px 0; width: 100%; direction: ${n?"rtl":"ltr"}; border-radius: 10px;">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <div class="filter-field" style="min-width: 180px;">
                        <label class="filter-label" for="ppe-stock-search">
                            <i class="fas fa-search ml-1"></i>${s(t("module.ppe.filter.search","\u0628\u062D\u062B"))}
                        </label>
                        <input type="text" id="ppe-stock-search" class="form-input pr-10 filter-input" placeholder="${s(t("module.ppe.stock.filter.searchPlaceholder","\u0643\u0648\u062F/\u0627\u0633\u0645/\u0641\u0626\u0629/\u0645\u0648\u0631\u062F"))}" value="${s(o.search||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-stock-filter-category">
                            <i class="fas fa-tags ml-1"></i>${s(t("module.ppe.stock.category","\u0627\u0644\u0641\u0626\u0629"))}
                            ${o.category?`<span class="filter-count-badge" title="${s(t("module.ppe.filter.badgeCount",""))}">${l.length}</span>`:""}
                        </label>
                        <select id="ppe-stock-filter-category" class="form-input filter-input">
                            <option value="">${s(t("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${c.map(i=>`<option value="${s(i)}" ${o.category===i?"selected":""}>${s(i)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-stock-filter-supplier">
                            <i class="fas fa-truck ml-1"></i>${s(t("module.ppe.stock.supplier","\u0627\u0644\u0645\u0648\u0631\u062F"))}
                            ${o.supplier?`<span class="filter-count-badge" title="${s(t("module.ppe.filter.badgeCount",""))}">${l.length}</span>`:""}
                        </label>
                        <select id="ppe-stock-filter-supplier" class="form-input filter-input">
                            <option value="">${s(t("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${r.map(i=>`<option value="${s(i)}" ${o.supplier===i?"selected":""}>${s(i)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-stock-filter-status">
                            <i class="fas fa-signal ml-1"></i>${s(t("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}
                            ${o.status?`<span class="filter-count-badge" title="${s(t("module.ppe.filter.badgeCount",""))}">${l.length}</span>`:""}
                        </label>
                        <select id="ppe-stock-filter-status" class="form-input filter-input">
                            <option value="">${s(t("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            <option value="available" ${o.status==="available"?"selected":""}>${s(t("module.ppe.status.available","\u0645\u062A\u0648\u0641\u0631"))}</option>
                            <option value="low" ${o.status==="low"?"selected":""}>${s(t("module.ppe.status.lowStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636"))}</option>
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-stock-date-from"><i class="fas fa-calendar-alt ml-1"></i>${s(t("module.ppe.stock.filter.dateFrom","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B"))}</label>
                        <input type="date" id="ppe-stock-date-from" class="form-input filter-input" value="${s(o.dateFrom||"")}">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-stock-date-to"><i class="fas fa-calendar-check ml-1"></i>${s(t("module.ppe.stock.filter.dateTo","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B"))}</label>
                        <input type="date" id="ppe-stock-date-to" class="form-input filter-input" value="${s(o.dateTo||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 170px;">
                        <button type="button" id="ppe-stock-reset-filters" class="filter-reset-btn" title="${s(t("module.ppe.filter.resetTitle",""))}">
                            <i class="fas fa-rotate-left ml-1"></i>${s(t("module.ppe.filter.reset","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                        </button>
                    </div>
                </div>
            </div>`},buildPPEListHtml(){const e=(u,m)=>this._t(u,m);this.ensurePpeFilterStyles();const t=AppState.appData.ppe||[],s=this.state.filters?.receipts||{},a=this.getFilteredPpeReceipts(t),o=this.hasActiveReceiptFilters(),l=typeof document<"u"&&(document.documentElement.getAttribute("dir")==="rtl"||window.AppI18n&&window.AppI18n.getCurrentLang&&window.AppI18n.getCurrentLang()==="ar"),n=u=>Utils.escapeHTML(u);if(t.length===0)return`<div class="empty-state"><p class="text-gray-500">${n(e("module.ppe.empty.noReceipts","\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0645\u0633\u062C\u0644\u0629"))}</p></div>`;const c=[...new Set(t.map(u=>u.equipmentType).filter(Boolean))].sort(),r=["\u0645\u0633\u062A\u0644\u0645","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"],i=`
            <div class="ppe-visits-filters-row visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 0 14px 0; width: 100%; direction: ${l?"rtl":"ltr"};">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <div class="filter-field" style="min-width: 180px;">
                        <label class="filter-label" for="ppe-receipts-search">
                            <i class="fas fa-search ml-1"></i>${n(e("module.ppe.filter.search","\u0628\u062D\u062B"))}
                        </label>
                        <input type="text" id="ppe-receipts-search" class="form-input pr-10 filter-input" placeholder="${n(e("module.ppe.filter.searchPlaceholder",""))}" value="${n(s.search||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-receipts-filter-type">
                            <i class="fas fa-hard-hat ml-1"></i>${n(e("module.ppe.filter.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}
                            ${s.equipmentType?`<span class="filter-count-badge" title="${n(e("module.ppe.filter.badgeCount",""))}">${a.length}</span>`:""}
                        </label>
                        <select id="ppe-receipts-filter-type" class="form-input filter-input">
                            <option value="">${n(e("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${c.map(u=>`<option value="${n(u)}" ${s.equipmentType===u?"selected":""}>${n(u)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-receipts-filter-status">
                            <i class="fas fa-signal ml-1"></i>${n(e("module.ppe.filter.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}
                            ${s.status?`<span class="filter-count-badge" title="${n(e("module.ppe.filter.badgeCount",""))}">${a.length}</span>`:""}
                        </label>
                        <select id="ppe-receipts-filter-status" class="form-input filter-input">
                            <option value="">${n(e("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${r.map(u=>`<option value="${n(u)}" ${s.status===u?"selected":""}>${n(this.getDisplayStatus(u))}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-receipts-date-from"><i class="fas fa-calendar-alt ml-1"></i>${n(e("module.ppe.filter.dateFrom","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</label>
                        <input type="date" id="ppe-receipts-date-from" class="form-input filter-input" value="${n(s.dateFrom||"")}">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-receipts-date-to"><i class="fas fa-calendar-check ml-1"></i>${n(e("module.ppe.filter.dateTo","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</label>
                        <input type="date" id="ppe-receipts-date-to" class="form-input filter-input" value="${n(s.dateTo||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 170px;">
                        <button type="button" id="ppe-receipts-reset-filters" class="filter-reset-btn" title="${n(e("module.ppe.filter.resetTitle",""))}">
                            <i class="fas fa-rotate-left ml-1"></i>${n(e("module.ppe.filter.reset","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                        </button>
                    </div>
                </div>
            </div>`,p=o&&a.length===0?`
            <div class="empty-state">
                <i class="fas fa-filter text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 mb-2">${n(e("module.ppe.filter.noMatch","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629"))}</p>
                <button type="button" id="ppe-receipts-clear-empty-filters" class="btn-secondary mt-2">
                    <i class="fas fa-undo-alt ml-2"></i>${n(e("module.ppe.filter.clearEmpty","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                </button>
            </div>
        `:"";if(a.length===0)return this._buildExcelToolbarHtml("receipts")+i+p;const y=e("module.common.view","\u0639\u0631\u0636"),h=e("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF"),d=e("module.common.edit","\u062A\u0639\u062F\u064A\u0644"),f=e("module.ppe.btn.deleteReceipt","\u062D\u0630\u0641"),v=`
            <table class="data-table table-header-blue">
                <thead>
                    <tr>
                        <th>${n(e("module.ppe.table.receiptNo","\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644"))}</th>
                        <th>${n(e("module.ppe.table.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}</th>
                        <th>${n(e("module.ppe.table.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}</th>
                        <th>${n(e("module.ppe.table.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}</th>
                        <th>${n(e("module.ppe.table.quantity","\u0627\u0644\u0643\u0645\u064A\u0629"))}</th>
                        <th>${n(e("module.ppe.table.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</th>
                        <th>${n(e("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}</th>
                        <th>${n(e("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                    </tr>
                </thead>
                <tbody>
                    ${a.map(u=>{const m=this.getDisplayStatus(u.status),x=String(u.id||"").replace(/\\/g,"\\\\").replace(/'/g,"\\'");return`
                        <tr>
                            <td class="font-mono font-semibold">${n(u.receiptNumber||u.id||"")}</td>
                            <td>${n(u.employeeName||"")}</td>
                            <td>${n(u.employeeCode||u.employeeNumber||"")}</td>
                            <td>
                                ${n(u.equipmentType||"")}
                                ${u.shoeSize?`<span class="block text-[11px] text-blue-600 font-semibold mt-0.5"><i class="fas fa-shoe-prints ml-1 text-[10px]"></i>\u0645\u0642\u0627\u0633: ${n(u.shoeSize)}</span>`:""}
                            </td>
                            <td>${u.quantity||0}</td>
                            <td>${u.receiptDate?Utils.formatDate(u.receiptDate):"-"}</td>
                            <td>
                                <span class="badge badge-${this.isStatusReceived(u.status)?"success":"warning"}">
                                    ${n(m)}
                                </span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button onclick="PPE.viewPPE('${x}')" class="btn-icon btn-icon-info" title="${n(y)}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="PPE.exportPDF('${x}')" class="btn-icon btn-icon-success" title="${n(h)}">
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                    <button onclick="PPE.showPPEForm(${JSON.stringify(u).replace(/"/g,"&quot;")});" class="btn-icon btn-icon-primary" title="${n(d)}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="PPE.deletePPE('${x}')" class="btn-icon btn-icon-danger" title="${n(f)}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>`}).join("")}
                </tbody>
            </table>
        `;return this._buildExcelToolbarHtml("receipts")+i+v},_receiptsFilterTimer:null,refreshReceiptsListUI(){const e=document.getElementById("ppe-list");e&&(e.innerHTML=this.buildPPEListHtml(),this.applyModuleI18n(e),this.bindReceiptsFilters())},bindReceiptsFilters(){if(this.state.activeTab!=="receipts")return;const e=r=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(r):setTimeout(r,0)},t=document.getElementById("ppe-receipts-search");if(t){const r=i=>{this.state.filters.receipts.search=i.target&&i.target.value||"",clearTimeout(this._receiptsFilterTimer),this._receiptsFilterTimer=setTimeout(()=>e(()=>this.refreshReceiptsListUI()),220)};t.addEventListener("input",r)}const s=document.getElementById("ppe-receipts-filter-type");s&&s.addEventListener("change",r=>{this.state.filters.receipts.equipmentType=r.target&&r.target.value||"",this.refreshReceiptsListUI()});const a=document.getElementById("ppe-receipts-filter-status");a&&a.addEventListener("change",r=>{this.state.filters.receipts.status=r.target&&r.target.value||"",this.refreshReceiptsListUI()});const o=document.getElementById("ppe-receipts-date-from");o&&o.addEventListener("change",r=>{this.state.filters.receipts.dateFrom=r.target&&r.target.value||"",this.refreshReceiptsListUI()});const l=document.getElementById("ppe-receipts-date-to");l&&l.addEventListener("change",r=>{this.state.filters.receipts.dateTo=r.target&&r.target.value||"",this.refreshReceiptsListUI()});const n=document.getElementById("ppe-receipts-reset-filters");n&&n.addEventListener("click",()=>{this.resetReceiptFilters(),this.refreshReceiptsListUI()});const c=document.getElementById("ppe-receipts-clear-empty-filters");c&&c.addEventListener("click",()=>{this.resetReceiptFilters(),this.refreshReceiptsListUI()})},clearCache(){this.state.stockItemsCache&&(AppState.appData.ppeStock=this.state.stockItemsCache,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()),this.state.stockItemsCache=null,this.state.stockItemsCacheTime=null,this.state.lastSyncTime=Date.now(),Utils.safeLog("\u{1F504} PPE: \u062A\u0645 \u0645\u0633\u062D Cache \u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},async preloadData(){try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const e=await GoogleIntegration.sendToAppsScript("getAllPPE",{});e&&e.success&&Array.isArray(e.data)&&(AppState.appData.ppe=e.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A:",e)}this.state.activeTab==="stock-control"&&await this.loadStockItems(!0)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A preloadData:",e)}},renderActiveTabContentWithFallback(){try{switch(this.state.activeTab){case"stock-control":const e=AppState.appData.ppeStock||[];return e.length===0?`
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500 mb-4">${this._t("module.ppe.loading.stockData","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646...")}</p>
                            </div>
                        `:`
                        <div class="space-y-6">
                            ${this.renderStockTableSync(e)}
                        </div>
                    `;case"receipts":default:return this.renderPPEListSync()}}catch(e){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A renderActiveTabContentWithFallback:",e),`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadContentError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649"))}</p>
                    <button onclick="PPE.load()" class="btn-primary">
                        <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                    </button>
                </div>
            `}},renderPPEListSync(){return this.buildPPEListHtml()},renderStockTableSync(e){const t=(a,o)=>this._t(a,o),s=a=>Utils.escapeHTML(a);return!e||e.length===0?`
                <div class="empty-state">
                    <i class="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${s(t("module.ppe.empty.noStock","\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</p>
                </div>
            `:`
            <div class="overflow-x-auto">
                <table class="data-table table-header-blue">
                    <thead>
                        <tr>
                            <th>${s(t("module.ppe.stock.itemCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641"))}</th>
                            <th>${s(t("module.ppe.stock.itemName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641"))}</th>
                            <th>${s(t("module.ppe.stock.category","\u0627\u0644\u0641\u0626\u0629"))}</th>
                            <th>${s(t("module.ppe.stock.in","\u0627\u0644\u0648\u0627\u0631\u062F"))}</th>
                            <th>${s(t("module.ppe.stock.out","\u0627\u0644\u0645\u0646\u0635\u0631\u0641"))}</th>
                            <th>${s(t("module.ppe.stock.balance","\u0627\u0644\u0631\u0635\u064A\u062F"))}</th>
                            <th>${s(t("module.ppe.stock.reorder","\u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628"))}</th>
                            <th>${s(t("module.ppe.stock.supplier","\u0627\u0644\u0645\u0648\u0631\u062F"))}</th>
                            <th>${s(t("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(a=>{const o=parseFloat(a.balance||0),l=parseFloat(a.minThreshold||0),n=o<l;return`
                                <tr class="${n?"bg-red-50":""}">
                                    <td class="font-mono font-semibold">${Utils.escapeHTML(a.itemCode||"")}</td>
                                    <td>${Utils.escapeHTML(a.itemName||"")}</td>
                                    <td>${Utils.escapeHTML(a.category||"")}</td>
                                    <td class="text-green-600 font-semibold">${parseFloat(a.stock_IN||0).toFixed(0)}</td>
                                    <td class="text-red-600 font-semibold">${parseFloat(a.stock_OUT||0).toFixed(0)}</td>
                                    <td class="font-bold ${n?"text-red-600":"text-blue-600"}">${o.toFixed(0)}</td>
                                    <td>${l.toFixed(0)}</td>
                                    <td>${Utils.escapeHTML(a.supplier||"")}</td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button onclick="PPE.editStockItem('${a.itemId}')" class="btn-icon btn-icon-warning" title="${s(t("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button onclick="PPE.deleteStockItem('${a.itemId}')" class="btn-icon btn-icon-danger" title="${s(t("module.ppe.btn.deleteItem","\u062D\u0630\u0641"))}">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},async refreshActiveTab(e={}){try{const t=!!e.skipRemote;this.clearCache();const s=document.getElementById("ppe-tab-content");if(!s){Utils.safeWarn("\u26A0\uFE0F PPE: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0627\u0648\u064A\u0629 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628");return}try{if(this.state.activeTab==="stock-control")await this.loadStockItems(!0);else if(!t){if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const o=await GoogleIntegration.sendToAppsScript("getAllPPE",{});o&&o.success&&Array.isArray(o.data)&&(AppState.appData.ppe=o.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A:",o)}}}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u062B\u0646\u0627\u0621 refreshActiveTab:",o)}const a=s.innerHTML;s.style.opacity="0.6",s.style.pointerEvents="none";try{const o=await this.renderActiveTabContent(!1);s.innerHTML=o,this.applyModuleI18n(s),this.state.activeTab==="receipts"?(this.ensurePpeFilterStyles(),this.bindReceiptsFilters(),this._bindPpeReceiptExcelToolbar()):this.state.activeTab==="stock-control"&&(this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar()),Utils.safeLog("\u2705 PPE: \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0646\u0634\u0637 \u0628\u0646\u062C\u0627\u062D")}catch(o){Utils.safeError("\u274C PPE: \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",o),s.innerHTML=a}finally{s.style.opacity="1",s.style.pointerEvents="auto"}}catch(t){Utils.safeError("\u274C PPE: \u062E\u0637\u0623 \u0641\u064A refreshActiveTab:",t)}},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("ppe-section");if(!e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0642\u0633\u0645 ppe-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{(!AppState||!AppState.appData)&&(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F AppState \u063A\u064A\u0631 \u062C\u0627\u0647\u0632 - \u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631..."),await new Promise(t=>{let s=0;const a=50,o=setInterval(()=>{s++,AppState&&AppState.appData?(clearInterval(o),t()):s>=a&&(clearInterval(o),AppState||(AppState={}),AppState.appData||(AppState.appData={}),t())},50)}))}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 AppState:",t),AppState||(AppState={}),AppState.appData||(AppState.appData={})}try{AppState.appData.ppe||(AppState.appData.ppe=[]),AppState.appData.ppeStock||(AppState.appData.ppeStock=[]);const t=this.preloadData();let s="";try{const l=this.renderActiveTabContent(!1);s=await Utils.promiseWithTimeout(l,3e3,this._t("module.ppe.timeout.content","\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649"))}catch(l){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",l),s=this.renderActiveTabContentWithFallback()}t.catch(l=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",l)});const a=(l,n)=>this._t(l,n),o=l=>Utils.escapeHTML(l);e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-hard-hat ml-3"></i>
                            ${o(a("module.ppe.title","\u0625\u062F\u0627\u0631\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"))}
                        </h1>
                        <p class="section-subtitle">${o(a("module.ppe.subtitle","\u062A\u0633\u062C\u064A\u0644 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"))}</p>
                    </div>
                    <div class="flex gap-2">
                        ${this.state.activeTab==="receipts"?`
                            <button id="view-ppe-matrix-btn" class="btn-secondary">
                                <i class="fas fa-table ml-2"></i>
                                ${o(a("module.ppe.btn.matrix","\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"))}
                            </button>
                            <button id="add-ppe-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${o(a("module.ppe.btn.newReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F"))}
                            </button>
                            <button id="ppe-refresh-btn" type="button" class="btn-secondary border-2 border-green-500 text-green-600 hover:bg-green-50" title="${o(a("module.ppe.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A"))}">
                                <i class="fas fa-sync-alt ml-2"></i>
                                ${o(a("module.ppe.btn.refresh","\u062A\u062D\u062F\u064A\u062B"))}
                            </button>
                        `:this.state.activeTab==="stock-control"?`
                            <button id="add-stock-item-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${o(a("module.ppe.btn.addStockItem","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}
                            </button>
                            <button id="add-transaction-btn" class="btn-secondary">
                                <i class="fas fa-exchange-alt ml-2"></i>
                                ${o(a("module.ppe.btn.addTransaction","\u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629"))}
                            </button>
                        `:""}
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <div class="content-card">
                    <div class="card-header" style="padding: 0; border-bottom: none;">
                        <div class="ppe-tabs-container">
                            <button type="button" class="ppe-tab-btn ${this.state.activeTab==="receipts"?"active":""}" data-tab="receipts">
                                <i class="fas fa-receipt"></i>
                                ${o(a("module.ppe.tab.receipts","\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"))}
                            </button>
                            <button type="button" class="ppe-tab-btn ${this.state.activeTab==="stock-control"?"active":""}" data-tab="stock-control">
                                <i class="fas fa-boxes"></i>
                                ${o(a("module.ppe.tab.stock","\u0625\u062F\u0627\u0631\u0629 \u0645\u062E\u0632\u0648\u0646 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"))}
                            </button>
                            <button type="button" class="ppe-tab-btn ${this.state.activeTab==="analysis"?"active":""}" data-tab="analysis">
                                <i class="fas fa-chart-pie"></i>
                                ${o(a("module.ppe.tab.analysis","\u0627\u0644\u062A\u062D\u0644\u064A\u0644"))}
                            </button>
                        </div>
                    </div>
                    <div class="card-body" style="padding-top: 1.5rem;">
                        <div id="ppe-tab-content">
                            ${s}
                        </div>
                    </div>
                </div>
            </div>
        `;try{this.ensurePpeFilterStyles(),this.setupEventListeners(),this.applyModuleI18n(e),this.state.activeTab==="receipts"?(this.bindReceiptsFilters(),this._bindPpeReceiptExcelToolbar()):this.state.activeTab==="stock-control"?(this.bindStockFilters(),this._bindPpeStockExcelToolbar()):this.state.activeTab==="analysis"&&(this._ppeBindAnalyticsEvents(),this.updatePpeAnalyticsDashboard())}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A setupEventListeners:",l)}}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629:",t);const s=(o,l)=>this._t(o,l),a=o=>Utils.escapeHTML(o);e.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-hard-hat ml-3"></i>
                            ${a(s("module.ppe.title","\u0625\u062F\u0627\u0631\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"))}
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${a(s("module.ppe.empty.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}</p>
                                <button onclick="PPE.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${a(s("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}},async renderActiveTabContent(e=!0){try{switch(this.state.activeTab){case"analysis":return await this.renderPpeAnalysisTab();case"stock-control":e&&Loading.show(this._t("module.ppe.loading.stock","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646..."));try{const t=await this.renderStockControlTab();return e&&Loading.hide(),t}catch(t){return e&&Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0645\u062E\u0632\u0648\u0646:",t),`
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadStockError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</p>
                                <button onclick="PPE.switchTab('stock-control')" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                                </button>
                            </div>
                        `}case"receipts":default:return await this.renderReceiptsTab()}}catch(t){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A renderActiveTabContent:",t),e&&Loading.hide(),`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadContentError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649"))}</p>
                    <button onclick="PPE.load()" class="btn-primary">
                        <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                    </button>
                </div>
            `}},async renderReceiptsTab(){return`
            <div id="ppe-list">
                ${this.buildPPEListHtml()}
            </div>
        `},cleanupEventListeners(){this.state.eventListeners.forEach((e,t)=>{t&&t.removeEventListener&&t.removeEventListener(e.event,e.handler)}),this.state.eventListeners.clear()},setupEventListeners(){this.cleanupEventListeners(),setTimeout(()=>{document.querySelectorAll(".ppe-tab-btn").forEach(n=>{const c=()=>{const r=n.getAttribute("data-tab");r&&!this.state.isSwitchingTab&&this.switchTab(r)};n.addEventListener("click",c),this.state.eventListeners.set(n,{event:"click",handler:c})});const t=document.getElementById("add-ppe-btn"),s=document.getElementById("view-ppe-matrix-btn");if(t){const n=()=>this.showPPEForm();t.addEventListener("click",n),this.state.eventListeners.set(t,{event:"click",handler:n})}if(s){const n=()=>this.showPPEMatrix();s.addEventListener("click",n),this.state.eventListeners.set(s,{event:"click",handler:n})}const a=document.getElementById("ppe-refresh-btn");if(a){const n=()=>this.refreshActiveTab();a.addEventListener("click",n),this.state.eventListeners.set(a,{event:"click",handler:n})}const o=document.getElementById("add-stock-item-btn"),l=document.getElementById("add-transaction-btn");if(o){const n=()=>this.showStockItemForm();o.addEventListener("click",n),this.state.eventListeners.set(o,{event:"click",handler:n})}if(l){const n=()=>this.showTransactionForm();l.addEventListener("click",n),this.state.eventListeners.set(l,{event:"click",handler:n})}this._bindPpeReceiptExcelToolbar(),this._bindPpeStockExcelToolbar()},100)},updateHeaderButtons(){const e=document.querySelector("#ppe-section .section-header .flex.gap-2");if(!e)return;[document.getElementById("add-ppe-btn"),document.getElementById("view-ppe-matrix-btn"),document.getElementById("ppe-refresh-btn"),document.getElementById("add-stock-item-btn"),document.getElementById("add-transaction-btn")].filter(Boolean).forEach(i=>{if(this.state.eventListeners.has(i)){const p=this.state.eventListeners.get(i);i.removeEventListener(p.event,p.handler),this.state.eventListeners.delete(i)}});const s=(i,p)=>this._t(i,p),a=i=>Utils.escapeHTML(i);this.state.activeTab==="receipts"?e.innerHTML=`
                <button id="view-ppe-matrix-btn" class="btn-secondary">
                    <i class="fas fa-table ml-2"></i>
                    ${a(s("module.ppe.btn.matrix","\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"))}
                </button>
                <button id="add-ppe-btn" class="btn-primary">
                    <i class="fas fa-plus ml-2"></i>
                    ${a(s("module.ppe.btn.newReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F"))}
                </button>
                <button id="ppe-refresh-btn" type="button" class="btn-secondary border-2 border-green-500 text-green-600 hover:bg-green-50" title="${a(s("module.ppe.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A"))}">
                    <i class="fas fa-sync-alt ml-2"></i>
                    ${a(s("module.ppe.btn.refresh","\u062A\u062D\u062F\u064A\u062B"))}
                </button>
            `:e.innerHTML=`
                <button id="add-stock-item-btn" class="btn-primary">
                    <i class="fas fa-plus ml-2"></i>
                    ${a(s("module.ppe.btn.addStockItem","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}
                </button>
                <button id="add-transaction-btn" class="btn-secondary">
                    <i class="fas fa-exchange-alt ml-2"></i>
                    ${a(s("module.ppe.btn.addTransaction","\u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629"))}
                </button>
            `,this.applyModuleI18n(e);const o=document.getElementById("add-ppe-btn"),l=document.getElementById("view-ppe-matrix-btn"),n=document.getElementById("add-stock-item-btn"),c=document.getElementById("add-transaction-btn");if(o){const i=()=>this.showPPEForm();o.addEventListener("click",i),this.state.eventListeners.set(o,{event:"click",handler:i})}if(l){const i=()=>this.showPPEMatrix();l.addEventListener("click",i),this.state.eventListeners.set(l,{event:"click",handler:i})}const r=document.getElementById("ppe-refresh-btn");if(r){const i=()=>this.refreshActiveTab();r.addEventListener("click",i),this.state.eventListeners.set(r,{event:"click",handler:i})}if(n){const i=()=>this.showStockItemForm();n.addEventListener("click",i),this.state.eventListeners.set(n,{event:"click",handler:i})}if(c){const i=()=>this.showTransactionForm();c.addEventListener("click",i),this.state.eventListeners.set(c,{event:"click",handler:i})}this._bindPpeReceiptExcelToolbar(),this._bindPpeStockExcelToolbar()},async switchTab(e){if(this.state.isSwitchingTab){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0628\u064A\u0646 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0628\u0627\u0644\u0641\u0639\u0644");return}if(this.state.activeTab!==e)try{this.state.isSwitchingTab=!0,this.state.activeTab=e,document.querySelectorAll(".ppe-tab-btn").forEach(a=>{a.classList.remove("active"),a.getAttribute("data-tab")===e&&a.classList.add("active")});const s=document.getElementById("ppe-tab-content");if(s)try{if(e==="stock-control"){const o=this.state.stockItemsCache&&this.state.stockItemsCache.length?this.state.stockItemsCache:Array.isArray(AppState.appData.ppeStock)&&AppState.appData.ppeStock.length?AppState.appData.ppeStock:[],l=`<div role="status" class="rounded-lg border border-blue-100 bg-blue-50/90 px-4 py-2 text-sm text-blue-900 flex items-center gap-2">
                            <i class="fas fa-sync-alt fa-spin text-blue-600"></i>
                            <span>${Utils.escapeHTML(this._t("module.ppe.stock.syncingHint","\u062C\u0627\u0631\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0623\u062D\u062F\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"))}</span>
                        </div>`;s.innerHTML=o.length>0?this.buildStockControlTabHtmlSync(o,l):`<div class="space-y-4" id="ppe-stock-tab-root">${l}<div class="empty-state py-8"><p class="text-gray-600">${Utils.escapeHTML(this._t("module.ppe.loading.stockData","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"))}</p></div></div>`,s.style.opacity="1",s.style.pointerEvents="auto",o.length>0&&(this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar())}else s.style.opacity="0.92",s.style.pointerEvents="none";const a=await this.renderActiveTabContent(e!=="stock-control"&&e!=="analysis");s.innerHTML=a,this.applyModuleI18n(s),e==="receipts"?(this.ensurePpeFilterStyles(),this.bindReceiptsFilters(),this._bindPpeReceiptExcelToolbar()):e==="stock-control"?(this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar()):e==="analysis"&&(this._ppeBindAnalyticsEvents(),this.updatePpeAnalyticsDashboard()),Utils.safeLog(`\u2705 PPE: \u062A\u0645 \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u062A\u0628\u0648\u064A\u0628 ${e}`)}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",a),s.innerHTML=`
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}</p>
                            <button onclick="PPE.switchTab('${e}')" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                ${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                            </button>
                        </div>
                    `}finally{s.style.opacity="1",s.style.pointerEvents="auto"}this.updateHeaderButtons()}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0628\u064A\u0646 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:",t)}finally{this.state.isSwitchingTab=!1}},parseEligibilityRules(e){if(!e)return[];try{if(Array.isArray(e))return e;if(typeof e=="string"){const t=JSON.parse(e);return Array.isArray(t)?t:[]}}catch{return[]}return[]},getEligibilityRule(e){const t=typeof AppState<"u"&&AppState.companySettings?AppState.companySettings:{},s=this.parseEligibilityRules(t.ppeEligibilityRules),a=l=>(l||"").toString().trim().toLowerCase(),o=a(e);if(o){const l=s.find(n=>n&&a(n.equipmentType||n.itemName)===o);if(l){let n=parseInt(l.months,10),c=parseInt(l.days,10);return(isNaN(n)||n<0)&&(n=0),(isNaN(c)||c<0)&&(c=0),n=Math.min(120,n),c=Math.min(3650,c),{months:n,days:c,hasRule:n+c>0,equipmentType:l.equipmentType||l.itemName}}}return{months:0,days:0,hasRule:!1,equipmentType:e||null}},findLastReceiptForEmployeeItem(e,t,s={}){const a=(e||"").toString().trim().toLowerCase(),o=(t||"").toString().trim().toLowerCase();if(!a||!o)return null;const l=s.excludeId||null,n=typeof AppState<"u"&&Array.isArray(AppState.appData?.ppe)?AppState.appData.ppe:[];let c=null,r=null;for(const i of n){if(!i||l&&i.id===l)continue;const p=(i.employeeCode||i.employeeNumber||"").toString().trim().toLowerCase(),y=(i.equipmentType||"").toString().trim().toLowerCase();if(p!==a||y!==o)continue;const h=i.receiptDate?new Date(i.receiptDate):null;!h||isNaN(h.getTime())||(!r||h>r)&&(c=i,r=h)}return c},diffMonthsAndDays(e,t){const s=new Date(e),a=new Date(t);if(isNaN(s.getTime())||isNaN(a.getTime())||a<s)return{months:0,days:0,totalDays:0,isNegative:a<s};let o=(a.getFullYear()-s.getFullYear())*12+(a.getMonth()-s.getMonth()),l=a.getDate()-s.getDate();if(l<0){o-=1;const c=new Date(a.getFullYear(),a.getMonth(),0);l+=c.getDate()}o<0&&(o=0);const n=Math.floor((a-s)/(1e3*60*60*24));return{months:o,days:l,totalDays:n,isNegative:!1}},addMonthsAndDays(e,t,s){const a=new Date(e);if(isNaN(a.getTime()))return null;const o=new Date(a.getFullYear(),a.getMonth()+(t||0),a.getDate());return o.setDate(o.getDate()+(s||0)),o.setHours(a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds()),o},computeEligibility(e,t,s,a={}){const o=this.getEligibilityRule(t),l={hasInputs:!1,hasPrevious:!1,hasRule:o.hasRule,ruleMonths:o.months,ruleDays:o.days,lastReceiptDate:null,currentDate:null,elapsed:null,dueDate:null,isEligible:!0,remaining:null};if(!e||!t)return l;l.hasInputs=!0;const n=this.findLastReceiptForEmployeeItem(e,t,a);if(!n||!n.receiptDate)return l;const c=new Date(n.receiptDate);if(isNaN(c.getTime()))return l;l.hasPrevious=!0,l.lastReceiptDate=c;const r=s?new Date(s):new Date;if(isNaN(r.getTime())?l.currentDate=new Date:l.currentDate=r,l.elapsed=this.diffMonthsAndDays(c,l.currentDate),o.hasRule){const i=this.addMonthsAndDays(c,o.months,o.days);l.dueDate=i,i&&l.currentDate<i&&(l.isEligible=!1,l.remaining=this.diffMonthsAndDays(l.currentDate,i))}return l},formatMonthsDays(e,t){const s=parseInt(e,10)||0,a=parseInt(t,10)||0,o=[];return s>0&&o.push(`${s} \u0634\u0647\u0631`),(a>0||s===0&&a===0)&&o.push(`${a} \u064A\u0648\u0645`),o.join(" \u0648 ")},renderEligibilityInfo(e,t){if(!e)return;const s=c=>c?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(c):new Date(c).toLocaleDateString("ar"):"-",a=(c,r,i,p,y)=>{const h={gray:{outer:"ring-1 ring-slate-200/80 shadow-xl shadow-slate-900/5",headerBar:"from-slate-700 via-slate-600 to-slate-700",headerIconBg:"bg-white/15 text-white ring-2 ring-white/30 shadow-md",tileSurface:"rounded-2xl border border-slate-200/75 bg-gradient-to-br from-white via-slate-50/30 to-white p-[1.1rem] sm:p-5 min-w-0 shadow-sm hover:shadow-md hover:border-slate-300/60 transition-all duration-200",iconBox:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-700 text-[15px] shadow-inner ring-1 ring-slate-300/35",labelClass:"text-[11px] font-bold tracking-wide text-slate-500",valueClass:"text-[1.05rem] sm:text-lg font-extrabold text-slate-900 tracking-tight tabular-nums",footerWrap:"bg-gradient-to-b from-slate-50 to-slate-100/80 border-t border-slate-200/90"},blue:{outer:"ring-1 ring-sky-200/85 shadow-xl shadow-sky-900/[0.06]",headerBar:"from-sky-700 via-sky-500 to-cyan-500",headerIconBg:"bg-white/15 text-white ring-2 ring-white/30 shadow-md",tileSurface:"rounded-2xl border border-sky-100/90 bg-gradient-to-br from-white via-sky-50/25 to-white p-[1.1rem] sm:p-5 min-w-0 shadow-sm hover:shadow-md hover:border-sky-200/80 transition-all duration-200",iconBox:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100/70 text-sky-700 text-[15px] shadow-inner ring-1 ring-sky-200/55",labelClass:"text-[11px] font-bold tracking-wide text-sky-700/70",valueClass:"text-[1.05rem] sm:text-lg font-extrabold text-slate-900 tracking-tight tabular-nums",footerWrap:"bg-gradient-to-b from-sky-50/90 to-sky-100/50 border-t border-sky-100"},green:{outer:"ring-1 ring-emerald-200/85 shadow-xl shadow-emerald-900/[0.05]",headerBar:"from-emerald-700 via-teal-600 to-emerald-500",headerIconBg:"bg-white/15 text-white ring-2 ring-white/30 shadow-md",tileSurface:"rounded-2xl border border-emerald-100/90 bg-gradient-to-br from-white via-emerald-50/20 to-white p-[1.1rem] sm:p-5 min-w-0 shadow-sm hover:shadow-md hover:border-emerald-200/70 transition-all duration-200",iconBox:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100/80 text-emerald-700 text-[15px] shadow-inner ring-1 ring-emerald-200/55",labelClass:"text-[11px] font-bold tracking-wide text-emerald-800/70",valueClass:"text-[1.05rem] sm:text-lg font-extrabold text-slate-900 tracking-tight tabular-nums",footerWrap:"bg-gradient-to-b from-emerald-50/95 to-teal-50/40 border-t border-emerald-100"},red:{outer:"ring-1 ring-rose-200/85 shadow-xl shadow-rose-900/[0.06]",headerBar:"from-rose-700 via-rose-500 to-red-500",headerIconBg:"bg-white/15 text-white ring-2 ring-white/30 shadow-md",tileSurface:"rounded-2xl border border-rose-100/90 bg-gradient-to-br from-white via-rose-50/25 to-white p-[1.1rem] sm:p-5 min-w-0 shadow-sm hover:shadow-md hover:border-rose-200/75 transition-all duration-200",iconBox:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-orange-50 text-rose-700 text-[15px] shadow-inner ring-1 ring-rose-200/55",labelClass:"text-[11px] font-bold tracking-wide text-rose-800/75",valueClass:"text-[1.05rem] sm:text-lg font-extrabold text-slate-900 tracking-tight tabular-nums",footerWrap:"bg-gradient-to-b from-rose-50/95 to-rose-100/35 border-t border-rose-100"}},d=h[c]||h.gray,f=p.length;let v="grid gap-3 md:gap-4 w-full ";f<=1?v+="grid-cols-1":f===2?v+="grid-cols-1 sm:grid-cols-2":f===3?v+="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3":v+="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";const u=f?`<div class="px-3 py-4 sm:px-6 sm:py-5 bg-gradient-to-br from-slate-50/90 via-white to-white">
                    <div class="${v}">
                    ${p.map(m=>{const w=typeof m.value=="string"&&m.value.includes("\u0628\u062F\u0648\u0646 \u0642\u0627\u0639\u062F\u0629")?"text-base sm:text-[1.0625rem] font-semibold text-slate-600 tracking-tight leading-snug":d.valueClass;return`
                        <div class="${d.tileSurface}">
                            <div class="flex items-center gap-3 sm:gap-4 text-start h-full">
                                <span class="${d.iconBox} shrink-0">
                                    <i class="${m.icon}"></i>
                                </span>
                                <div class="flex-1 min-w-0 flex flex-col gap-1.5 justify-center">
                                    <div class="${d.labelClass} text-xs sm:text-[11px] leading-snug">${m.label}</div>
                                    <p class="${w} leading-snug break-words hyphens-none">${m.value}</p>
                                </div>
                            </div>
                        </div>`}).join("")}
                    </div>
                </div>`:"";return`
                <div class="mt-1 w-full min-w-0 overflow-hidden rounded-2xl bg-white ${d.outer}">
                    <div class="flex items-center gap-4 bg-gradient-to-l ${d.headerBar} px-5 py-4 sm:px-6 text-white shadow-inner">
                        <span class="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl ${d.headerIconBg} text-lg sm:text-xl">
                            <i class="${r}"></i>
                        </span>
                        <div class="min-w-0 flex-1">
                            <p class="text-[11px] font-semibold tracking-wide text-white/85 mb-1">\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645</p>
                            <h4 class="text-base sm:text-lg font-extrabold leading-snug text-white break-words">${i}</h4>
                        </div>
                    </div>
                    ${u}
                    ${y?`<div class="${d.footerWrap} px-5 py-4 sm:px-6 text-sm sm:text-[0.9375rem] font-medium text-slate-700 leading-relaxed flex flex-wrap items-center gap-3 w-full">${y}</div>`:""}
                </div>
            `};if(!t||!t.hasInputs){e.innerHTML=a("gray","fas fa-info-circle","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629",[],'<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600 text-xs"><i class="fas fa-lightbulb"></i></span><span>\u0628\u0639\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0643\u0648\u062F \u0648\u0627\u0644\u0635\u0646\u0641 \u062A\u0638\u0647\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0622\u062E\u0631 \u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0627\u0644\u0645\u062F\u0629 \u0648\u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642.</span>'),e.classList.remove("hidden"),e.setAttribute("data-eligible","pending");return}if(!t.hasPrevious){const c=[];t.hasRule&&c.push({icon:"fas fa-shield-alt",label:"\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0635\u0646\u0641",value:this.formatMonthsDays(t.ruleMonths,t.ruleDays)}),e.innerHTML=a("blue","fas fa-box-open","\u0623\u0648\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641",c,'<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-200 text-sky-800 text-xs"><i class="fas fa-check"></i></span><span>\u0644\u0627 \u064A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0633\u0627\u0628\u0642 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641\u061B \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.</span>'),e.setAttribute("data-eligible","1"),e.classList.remove("hidden");return}const o=this.formatMonthsDays(t.elapsed?.months||0,t.elapsed?.days||0),l=t.hasRule?this.formatMonthsDays(t.ruleMonths,t.ruleDays):"\u0628\u062F\u0648\u0646 \u0642\u0627\u0639\u062F\u0629 \u0645\u062D\u062F\u062F\u0629",n=[{icon:"fas fa-history",label:"\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u0627\u0633\u062A\u0644\u0627\u0645",value:s(t.lastReceiptDate)},{icon:"fas fa-hourglass-half",label:"\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0645\u0646\u0642\u0636\u064A\u0629",value:o},{icon:"fas fa-shield-alt",label:"\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0635\u0646\u0641",value:l}];if(t.dueDate&&n.push({icon:"fas fa-calendar-check",label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642",value:s(t.dueDate)}),t.isEligible){const c=t.hasRule?'<span class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-200/95 text-emerald-900 text-xs shadow-sm"><i class="fas fa-check-double"></i></span><span class="font-semibold text-emerald-950">\u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F\u061B \u062A\u0645 \u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u062F\u0646\u064A\u0627 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641.</span>':'<span class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs shadow-sm"><i class="fas fa-unlock-alt"></i></span><span class="font-semibold text-slate-800">\u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F\u061B \u0644\u0645 \u062A\u064F\u0636\u0641 \u0645\u062F\u0629 \u062F\u0646\u064A\u0627 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641 \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A\u064F\u0633\u0645\u062D \u062F\u0648\u0646 \u0642\u064A\u062F \u0632\u0645\u0646\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639.</span>';e.innerHTML=a("green","fas fa-check-circle","\u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0633\u062A\u062D\u0642 \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645",n,c),e.setAttribute("data-eligible","1")}else{const c=this.formatMonthsDays(t.remaining?.months||0,t.remaining?.days||0);e.innerHTML=a("red","fas fa-ban","\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0633\u062A\u062D\u0642 \u062D\u0627\u0644\u064A\u0627\u064B",n,`<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-200 text-rose-800 text-xs"><i class="fas fa-clock"></i></span><span class="font-semibold text-rose-900">\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629 \u062D\u062A\u0649 \u064A\u0635\u0628\u062D \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0633\u0645\u0648\u062D\u0627\u064B: <strong class="text-rose-950">${c}</strong>.</span>`),e.setAttribute("data-eligible","0")}e.classList.remove("hidden")},async showPPEForm(e=null){const t=!!e,s=document.createElement("div");s.className="modal-overlay";const a=AppState.appData.employees||[],o=(e?.employeeCode||e?.employeeNumber||"").toString().trim(),l=o.length?o:"",n=l?a.find(d=>[d.employeeNumber,d.employeeCode,d.sapId,d.id,d.nationalId,d.cardId].map(v=>(v||"").toString().trim().toLowerCase()).includes(l.toLowerCase())):null,c={name:n?.name||e?.employeeName||"",department:n?.department||e?.employeeDepartment||"",position:n?.position||e?.employeePosition||"",branch:n?.branch||e?.employeeBranch||"",location:n?.location||e?.employeeLocation||""},r=d=>d?Utils.escapeHTML(d):"\u2014",i=(d,f)=>this._t(d,f),p=d=>Utils.escapeHTML(d),y=i("module.ppe.status.received","\u0645\u0633\u062A\u0644\u0645"),h=i("module.ppe.status.pending","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645");s.innerHTML=`
            <div class="modal-content w-[min(100%,52rem)] max-w-[min(94vw,52rem)]" style="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #2563eb, #0d9488); color: #ffffff; text-align: center; position: relative; padding: 1.25rem 1.5rem;">
                    <h2 class="modal-title" style="margin: 0 auto; font-weight: 700; letter-spacing: 0.03em;">
                        ${p(t?i("module.ppe.title.editReceipt","\u062A\u0639\u062F\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645"):i("module.ppe.title.newReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F"))}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #ffffff; background: rgba(255,255,255,0.15); border: none; width: 2rem; height: 2rem; border-radius: 50%; display: flex; items-center: center; justify-content: center; transition: all 0.2s;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body bg-gradient-to-b from-slate-50/70 to-white">
                    <form id="ppe-form" class="space-y-5">
                        <section class="rounded-xl border border-blue-200/70 bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/50 p-4 shadow-sm">
                            <div class="flex items-center gap-2 mb-3 text-blue-900">
                                <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white"><i class="fas fa-user"></i></span>
                                <h3 class="text-sm font-extrabold">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641</h3>
                            </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${p(i("module.ppe.label.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A *"))}</label>
                                <div class="relative">
                                    <input type="text" id="ppe-employee-code" required class="form-input pr-12"
                                        value="${Utils.escapeHTML(e?.employeeCode||e?.employeeNumber||"")}"
                                        placeholder="${p(i("module.ppe.searchEmployeeTitle","\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0623\u0648 \u0627\u0645\u0633\u062D \u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F"))}" autocomplete="off">
                                    <button type="button" id="ppe-search-code-btn"
                                        class="absolute inset-y-0 left-0 flex items-center justify-center w-10 text-gray-500 hover:text-gray-700"
                                        title="${p(i("module.ppe.searchEmployeeTitle","\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0645\u0648\u0638\u0641"))}">
                                        <i class="fas fa-search"></i>
                                    </button>
                                    </div>
                                <p class="text-xs text-gray-500 mt-1">
                                    ${p(i("module.ppe.hint.employeeCode",""))}
                                </p>
                                </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${p(i("module.ppe.label.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}</label>
                                <div class="relative">
                                    <input type="text" id="ppe-employee-name" class="form-input"
                                        value="${Utils.escapeHTML(e?.employeeName||"")}"
                                        placeholder="${p(i("module.ppe.placeholder.employeeName",""))}" autocomplete="off">
                                    <div id="ppe-employee-dropdown" class="hse-lookup-dropdown absolute z-50 hidden w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"></div>
                            </div>
                            </div>
                        </div>
                        </section>

                        <input type="hidden" id="ppe-employee-department" value="${Utils.escapeHTML(c.department)}">
                        <input type="hidden" id="ppe-employee-position" value="${Utils.escapeHTML(c.position)}">
                        <input type="hidden" id="ppe-employee-branch" value="${Utils.escapeHTML(c.branch)}">
                        <input type="hidden" id="ppe-employee-location" value="${Utils.escapeHTML(c.location)}">

                        <div class="rounded-xl border border-blue-100 bg-blue-50/30 p-4 shadow-sm">
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div class="bg-white/90 p-3 rounded-lg border border-blue-50/50 shadow-sm flex items-center gap-3">
                                    <span class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><i class="fas fa-signature text-sm"></i></span>
                                    <div class="min-w-0">
                                        <p class="text-[11px] font-bold text-blue-700/70 mb-0.5">${p(i("module.ppe.label.name","\u0627\u0644\u0627\u0633\u0645"))}</p>
                                        <p id="ppe-employee-info-name" class="font-extrabold text-slate-800 truncate">${r(c.name)}</p>
                                    </div>
                                </div>
                                <div class="bg-white/90 p-3 rounded-lg border border-blue-50/50 shadow-sm flex items-center gap-3">
                                    <span class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600"><i class="fas fa-building text-sm"></i></span>
                                    <div class="min-w-0">
                                        <p class="text-[11px] font-bold text-cyan-700/70 mb-0.5">${p(i("module.ppe.label.department","\u0627\u0644\u0642\u0633\u0645"))}</p>
                                        <p id="ppe-employee-info-department" class="font-extrabold text-slate-800 truncate">${r(c.department)}</p>
                                    </div>
                                </div>
                                <div class="bg-white/90 p-3 rounded-lg border border-blue-50/50 shadow-sm flex items-center gap-3">
                                    <span class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"><i class="fas fa-briefcase text-sm"></i></span>
                                    <div class="min-w-0">
                                        <p class="text-[11px] font-bold text-indigo-700/70 mb-0.5">${p(i("module.ppe.label.position","\u0627\u0644\u0645\u0646\u0635\u0628"))}</p>
                                        <p id="ppe-employee-info-position" class="font-extrabold text-slate-800 truncate">${r(c.position)}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="text-xs text-slate-500 flex flex-wrap gap-4 mt-3 px-1">
                                <span id="ppe-employee-info-branch" class="${c.branch?"":"hidden"} bg-slate-100 px-2 py-1 rounded-md font-medium">
                                    ${c.branch?`<i class="fas fa-code-branch text-slate-400 ml-1"></i>${p(i("module.ppe.label.branch","\u0627\u0644\u0641\u0631\u0639"))}: ${Utils.escapeHTML(c.branch)}`:""}
                                </span>
                                <span id="ppe-employee-info-location" class="${c.location?"":"hidden"} bg-slate-100 px-2 py-1 rounded-md font-medium">
                                    ${c.location?`<i class="fas fa-map-marker-alt text-slate-400 ml-1"></i>${p(i("module.ppe.label.location","\u0627\u0644\u0645\u0648\u0642\u0639"))}: ${Utils.escapeHTML(c.location)}`:""}
                                </span>
                            </div>
                        </div>

                        <section class="rounded-xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 p-4 shadow-sm space-y-4">
                            <div class="flex items-center gap-2 mb-1 text-emerald-900">
                                <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white"><i class="fas fa-boxes"></i></span>
                                <h3 class="text-sm font-extrabold">\u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629</h3>
                            </div>
                        <div class="space-y-4">
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="text-sm font-semibold text-gray-800">${p(i("module.ppe.items.title","\u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629 *"))}</h3>
                                    <button type="button" id="ppe-add-item-btn" class="btn-secondary text-xs px-3 py-1">
                                        <i class="fas fa-plus ml-1"></i>${p(i("module.ppe.items.addRow","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u0622\u062E\u0631"))}
                                    </button>
                                </div>
                                <div id="ppe-items-container" class="space-y-4">
                                    <div class="ppe-item-row w-full rounded-xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04] overflow-hidden">
                                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 items-end bg-slate-50/50">
                                            <div class="min-w-0">
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">
                                                    <i class="fas fa-shield-alt text-emerald-600 ml-1"></i>${p(i("module.ppe.label.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629 *"))}
                                                </label>
                                                <select id="ppe-equipment-type" required class="form-input ppe-equipment-type w-full border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg">
                                                    <option value="">${p(i("module.ppe.equip.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644..."))}</option>
                                                </select>
                                                <p class="text-[11px] text-gray-400 mt-1">
                                                    ${p(i("module.ppe.hint.fromStock",""))}
                                                </p>
                                            </div>
                                            <div class="min-w-0">
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">
                                                    <i class="fas fa-shoe-prints text-blue-600 ml-1"></i>\u0645\u0642\u0627\u0633 \u0627\u0644\u062D\u0630\u0627\u0621 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)
                                                </label>
                                                <select class="form-input ppe-shoe-size w-full border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0633...</option>
                                                    <option value="38" ${e?.shoeSize==="38"||e?.shoeSize===38?"selected":""}>38</option>
                                                    <option value="39" ${e?.shoeSize==="39"||e?.shoeSize===39?"selected":""}>39</option>
                                                    <option value="40" ${e?.shoeSize==="40"||e?.shoeSize===40?"selected":""}>40</option>
                                                    <option value="41" ${e?.shoeSize==="41"||e?.shoeSize===41?"selected":""}>41</option>
                                                    <option value="42" ${e?.shoeSize==="42"||e?.shoeSize===42?"selected":""}>42</option>
                                                    <option value="43" ${e?.shoeSize==="43"||e?.shoeSize===43?"selected":""}>43</option>
                                                    <option value="44" ${e?.shoeSize==="44"||e?.shoeSize===44?"selected":""}>44</option>
                                                    <option value="45" ${e?.shoeSize==="45"||e?.shoeSize===45?"selected":""}>45</option>
                                                    <option value="46" ${e?.shoeSize==="46"||e?.shoeSize===46?"selected":""}>46</option>
                                                    <option value="47" ${e?.shoeSize==="47"||e?.shoeSize===47?"selected":""}>47</option>
                                                    <option value="48" ${e?.shoeSize==="48"||e?.shoeSize===48?"selected":""}>48</option>
                                                </select>
                                            </div>
                                            <div class="min-w-0">
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">
                                                    <i class="fas fa-sort-numeric-up text-amber-600 ml-1"></i>${p(i("module.ppe.label.qty","\u0627\u0644\u0643\u0645\u064A\u0629 *"))}
                                                </label>
                                                <div class="flex items-center gap-2">
                                                    <input type="number" id="ppe-quantity" required class="form-input ppe-quantity w-full border-slate-200 focus:border-amber-500 focus:ring-amber-500 rounded-lg min-w-0" min="1"
                                                        value="${e?.quantity||1}" placeholder="${p(i("module.ppe.table.quantity","\u0627\u0644\u0643\u0645\u064A\u0629"))}">
                                                    <button type="button" class="btn-secondary ppe-remove-item hidden text-xs px-3 py-2 whitespace-nowrap shrink-0 rounded-lg border-rose-200 text-rose-600 hover:bg-rose-50">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ppe-eligibility-info hidden border-t border-slate-100 p-4 pt-4 bg-white w-full min-w-0"></div>
                                    </div>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">
                                    ${p(i("module.ppe.items.hint",""))}
                                </p>
                            </div>

                            <div class="pt-1 border-t border-emerald-100"></div>
                            <div class="flex items-center gap-2 text-amber-900 mt-1">
                                <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><i class="fas fa-calendar-check"></i></span>
                                <h3 class="text-sm font-extrabold">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645</h3>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 rounded-xl border border-amber-200/70 bg-gradient-to-br from-amber-50/70 to-white">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">${p(i("module.ppe.label.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 *"))}</label>
                                    <input type="date" id="ppe-receipt-date" required class="form-input"
                                        value="${e?.receiptDate?new Date(e.receiptDate).toISOString().slice(0,10):""}">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">${p(i("module.ppe.label.status","\u0627\u0644\u062D\u0627\u0644\u0629 *"))}</label>
                                    <select id="ppe-status" required class="form-input">
                                        <option value="\u0645\u0633\u062A\u0644\u0645" ${e?.status==="\u0645\u0633\u062A\u0644\u0645"?"selected":""}>${p(y)}</option>
                                        <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645" ${e?.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"?"selected":""}>${p(h)}</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${p(i("module.ppe.label.notes","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</label>
                                <textarea id="ppe-notes" class="form-input" rows="3"
                                    placeholder="${p(i("module.ppe.placeholder.notes",""))}">${Utils.escapeHTML(e?.notes||"")}</textarea>
                            </div>
                        </div>
                        </section>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${p(i("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${p(t?i("module.common.saveChanges","\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A"):i("module.ppe.btn.saveReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(s),this.applyModuleI18n(s),setTimeout(()=>{const d=document.getElementById("ppe-employee-code"),f=document.getElementById("ppe-employee-name"),v=document.getElementById("ppe-employee-dropdown"),u=document.getElementById("ppe-search-code-btn"),m=document.getElementById("ppe-employee-department"),x=document.getElementById("ppe-employee-position"),w=document.getElementById("ppe-employee-branch"),E=document.getElementById("ppe-employee-location"),N=document.getElementById("ppe-employee-info-name"),C=document.getElementById("ppe-employee-info-department"),q=document.getElementById("ppe-employee-info-position"),$=document.getElementById("ppe-employee-info-branch"),L=document.getElementById("ppe-employee-info-location"),U=AppState.appData.employees||[],O=(b,g)=>PPE._t(b,g),K=(b={})=>{N&&(N.textContent=b.name||"\u2014"),C&&(C.textContent=b.department||"\u2014"),q&&(q.textContent=b.position||"\u2014"),$&&(b.branch?($.innerHTML=`<i class="fas fa-code-branch text-slate-400 ml-1"></i>${O("module.ppe.label.branch","\u0627\u0644\u0641\u0631\u0639")}: ${Utils.escapeHTML(b.branch)}`,$.classList.remove("hidden")):($.innerHTML="",$.classList.add("hidden"))),L&&(b.location?(L.innerHTML=`<i class="fas fa-map-marker-alt text-slate-400 ml-1"></i>${O("module.ppe.label.location","\u0627\u0644\u0645\u0648\u0642\u0639")}: ${Utils.escapeHTML(b.location)}`,L.classList.remove("hidden")):(L.innerHTML="",L.classList.add("hidden")))},ee=(b,{notifySuccess:g=!1,notifyFail:T=!1}={})=>{if(!b)return T&&Notification.warning(O("module.ppe.notify.employeeNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F")),K({name:f?.value?.trim()||"\u2014",department:m?.value||"",position:x?.value||"",branch:w?.value||"",location:E?.value||""}),!1;const P=b.employeeNumber||b.employeeCode||b.sapId||b.id||"";return d&&P&&(d.value=P),f&&(f.value=b.name||""),m&&(m.value=b.department||""),x&&(x.value=b.position||""),w&&(w.value=b.branch||""),E&&(E.value=b.location||""),K({name:b.name||"\u2014",department:b.department||"",position:b.position||"",branch:b.branch||"",location:b.location||""}),g&&Notification.success(O("module.ppe.notify.employeeLoaded","\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D")),!0},se=b=>{if(!b)return null;const g=b.trim().toLowerCase();if(!g)return null;let T=null;return typeof EmployeeHelper<"u"&&typeof EmployeeHelper.findByCode=="function"&&(T=EmployeeHelper.findByCode(b)||EmployeeHelper.findByCode(g)),T||U.find(P=>[P.employeeNumber,P.employeeCode,P.sapId,P.id,P.nationalId,P.cardId].some(M=>String(M||"").trim().toLowerCase()===g))||null},V=({notify:b=!0}={})=>{const g=d?.value?.trim();if(!g)return;const T=se(g);ee(T,{notifySuccess:b,notifyFail:b})};d&&(d.addEventListener("blur",()=>V({notify:!1})),d.addEventListener("keydown",b=>{b.key==="Enter"&&(b.preventDefault(),V({notify:!0}))})),u&&u.addEventListener("click",b=>{b.preventDefault(),V({notify:!0})}),f&&v&&f.addEventListener("input",b=>{const g=b.target.value.trim();if(v.innerHTML="",v.classList.add("hidden"),g.length<2)return;const T=g.toLowerCase(),P=U.filter(M=>[M.name,M.employeeNumber,M.employeeCode,M.sapId].some(R=>String(R||"").toLowerCase().includes(T))).slice(0,12);P.length&&(P.forEach(M=>{const _=document.createElement("button");_.type="button",_.className="w-full text-right p-3 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none border-b border-gray-100 last:border-b-0";const R=document.createElement("div");R.className="font-semibold text-gray-800",R.textContent=M.name||"\u0628\u062F\u0648\u0646 \u0627\u0633\u0645";const Z=document.createElement("div");Z.className="text-xs text-gray-500 mt-1",Z.textContent=[M.employeeNumber||M.employeeCode||M.sapId||"",M.department||"",M.position||""].filter(Boolean).join(" \u2022 "),_.appendChild(R),_.appendChild(Z),_.addEventListener("click",()=>{ee(M,{notifySuccess:!1,notifyFail:!1}),v.classList.add("hidden")}),v.appendChild(_)}),v.classList.remove("hidden"))});const ae=b=>{v&&!v.contains(b.target)&&f&&!f.contains(b.target)&&v.classList.add("hidden"),b.target===s&&s.remove()};s.addEventListener("click",ae),K({name:c.name||f?.value?.trim()||"\u2014",department:c.department||m?.value||"",position:c.position||x?.value||"",branch:c.branch||w?.value||"",location:c.location||E?.value||""});const D=document.getElementById("ppe-items-container"),k=document.getElementById("ppe-add-item-btn"),S=()=>{if(!D)return;const b=Array.from(D.querySelectorAll(".ppe-item-row"));b.forEach(g=>{const T=g.querySelector(".ppe-remove-item");if(!T)return;b.length===1||t?T.classList.add("hidden"):T.classList.remove("hidden")})},j=b=>{if(!D||!b)return;const g=b.querySelector(".ppe-remove-item");g&&g.addEventListener("click",()=>{Array.from(D.querySelectorAll(".ppe-item-row")).length<=1||(b.remove(),S())})},X=()=>{if(!D)return null;const b=D.querySelector(".ppe-item-row");if(!b)return null;const g=b.cloneNode(!0),T=g.querySelector(".ppe-equipment-type");T&&(T.value="",T.id==="ppe-equipment-type"&&T.removeAttribute("id"));const P=g.querySelector(".ppe-quantity");P&&(P.value="1",P.id==="ppe-quantity"&&P.removeAttribute("id"));const M=g.querySelector(".ppe-shoe-size");M&&(M.value="");const _=g.querySelector(".ppe-eligibility-info");_&&(_.innerHTML="",_.classList.add("hidden"),_.removeAttribute("data-eligible")),D.appendChild(g),j(g),S();const R=g.querySelector(".ppe-equipment-type");return R&&this.state.ppeItemsOptionsHTML?R.innerHTML=this.state.ppeItemsOptionsHTML:this.loadPPEItemsForDropdown(),g};D&&(Array.from(D.querySelectorAll(".ppe-item-row")).forEach(g=>j(g)),S()),k&&(t?k.classList.add("hidden"):k.addEventListener("click",b=>{b.preventDefault(),X()})),this.loadPPEItemsForDropdown(e?.equipmentType);const J=document.getElementById("ppe-receipt-date"),G=document.getElementById("ppe-employee-code"),le=t&&e?.id?e.id:null,z=()=>{if(!D)return;const b=Array.from(D.querySelectorAll(".ppe-item-row")),g=(G?.value||"").trim(),T=(J?.value||"").trim();b.forEach(P=>{const _=(P.querySelector(".ppe-equipment-type")?.value||"").trim(),R=P.querySelector(".ppe-eligibility-info");if(!R)return;const Z=PPE.computeEligibility(g,_,T,{excludeId:le});PPE.renderEligibilityInfo(R,Z)})};if(J&&(J.addEventListener("change",z),J.addEventListener("input",z)),G&&(G.addEventListener("change",z),G.addEventListener("blur",z)),D&&D.addEventListener("change",b=>{b.target&&b.target.classList&&b.target.classList.contains("ppe-equipment-type")&&z()}),s._refreshPPEEligibility=z,d&&(d.addEventListener("input",z),d.addEventListener("change",z)),d){let b=d.value;const g=setInterval(()=>{if(!document.body.contains(d)){clearInterval(g);return}d.value!==b&&(b=d.value,z())},300)}z(),setTimeout(z,300),setTimeout(z,1500);const re=s.querySelector("#ppe-form");re&&re.addEventListener("submit",async b=>{b.preventDefault();const g=re?.querySelector('button[type="submit"]')||b.target?.querySelector('button[type="submit"]');if(g&&g.disabled)return;let T="";g&&(T=g.innerHTML,g.disabled=!0,g.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const P=AppState.appData.ppe||[],M=new Date().getFullYear(),_=P.filter(F=>F.receiptNumber&&F.receiptNumber.startsWith(`PPE-${M}-`)).map(F=>{const W=F.receiptNumber.match(/\d+$/);return W?parseInt(W[0]):0}),R=_.length>0?Math.max(..._)+1:1,Z=t&&e?.receiptNumber?e.receiptNumber:`PPE-${M}-${String(R).padStart(4,"0")}`,pe=document.getElementById("ppe-employee-name"),ie=document.getElementById("ppe-employee-code"),de=document.getElementById("ppe-employee-department"),me=document.getElementById("ppe-employee-position"),ue=document.getElementById("ppe-employee-branch"),fe=document.getElementById("ppe-employee-location"),he=document.getElementById("ppe-items-container"),oe=document.getElementById("ppe-receipt-date"),ye=document.getElementById("ppe-status"),ge=document.getElementById("ppe-notes");if(!pe||!ie||!de||!me||!ue||!fe||!he||!oe||!ye){Notification.error(PPE._t("module.ppe.notify.fieldsMissing","\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")),g&&(g.disabled=!1,g.innerHTML=T);return}if(!oe.value){Notification.error(PPE._t("module.ppe.notify.dateRequired","\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.")),g&&(g.disabled=!1,g.innerHTML=T);return}const ce=Array.from(he.querySelectorAll(".ppe-item-row"));if(!ce.length){Notification.error(PPE._t("module.ppe.notify.itemsRequired","\u064A\u062C\u0628 \u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0642\u0628\u0644 \u062D\u0641\u0638 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.")),g&&(g.disabled=!1,g.innerHTML=T);return}const ne=[];for(const F of ce){const W=F.querySelector(".ppe-equipment-type"),Y=F.querySelector(".ppe-quantity"),A=F.querySelector(".ppe-shoe-size");if(!W||!Y){Notification.error(PPE._t("module.ppe.notify.rowsIncomplete","\u0628\u0639\u0636 \u0635\u0641\u0648\u0641 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0623\u0646 \u0643\u0644 \u0635\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0646\u0648\u0639 \u0648\u0643\u0645\u064A\u0629.")),g&&(g.disabled=!1,g.innerHTML=T);return}const I=(W.value||"").trim(),B=parseInt(Y.value,10)||0,H=A?(A.value||"").trim():"";if(!I){Notification.error(PPE._t("module.ppe.notify.selectEquipmentEachRow","\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629 \u0644\u0643\u0644 \u0635\u0641 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638.")),g&&(g.disabled=!1,g.innerHTML=T);return}if(B<=0){Notification.error(PPE._t("module.ppe.notify.qtyPositive","\u0627\u0644\u0643\u0645\u064A\u0629 \u0644\u0643\u0644 \u0635\u0646\u0641 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0631\u0642\u0645\u064B\u0627 \u0623\u0643\u0628\u0631 \u0645\u0646 \u0635\u0641\u0631.")),g&&(g.disabled=!1,g.innerHTML=T);return}ne.push({equipmentType:I,quantity:B,shoeSize:H})}{const F=ie.value.trim(),W=oe.value,Y=t&&e?.id?e.id:null,A=[];if(ne.forEach((I,B)=>{const H=PPE.computeEligibility(F,I.equipmentType,W,{excludeId:Y});if(H.hasRule&&H.hasPrevious&&!H.isEligible){A.push({index:B,item:I,result:H});const te=ce[B];if(te){const Q=te.querySelector(".ppe-eligibility-info");PPE.renderEligibilityInfo(Q,H)}}}),A.length>0){const I=A[0],B=PPE.formatMonthsDays(I.result.remaining?.months||0,I.result.remaining?.days||0),H=I.result.dueDate?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(I.result.dueDate):new Date(I.result.dueDate).toLocaleDateString("ar"):"",te=A.map(xe=>xe.item.equipmentType).join("\u060C "),Q=A.length===1?PPE._t("module.ppe.notify.notEligible",`\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645: \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0633\u062A\u062D\u0642 \u0644\u0635\u0646\u0641 \xAB${I.item.equipmentType}\xBB \u062D\u0627\u0644\u064A\u0627\u064B. \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642: ${H}\u060C \u0627\u0644\u0645\u062A\u0628\u0642\u064A: ${B}.`):PPE._t("module.ppe.notify.notEligibleMulti",`\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645: \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0633\u062A\u062D\u0642 \u0644\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062D\u0627\u0644\u064A\u0627\u064B (${te}). \u0623\u0642\u0631\u0628 \u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0628\u0639\u062F: ${B}.`);Notification.error(Q),g&&(g.disabled=!1,g.innerHTML=T);return}}const be={receiptNumber:Z,employeeName:pe.value.trim(),employeeCode:ie.value.trim(),employeeNumber:ie.value.trim(),employeeDepartment:de.value.trim(),employeePosition:me.value.trim(),employeeBranch:ue.value.trim(),employeeLocation:fe.value.trim(),receiptDate:new Date(oe.value).toISOString(),status:ye.value,notes:(ge?.value||"").trim()};try{const F=Array.isArray(AppState.appData.ppe)?[...AppState.appData.ppe]:[];let W=[],Y=null;if(t){const A=AppState.appData.ppe.findIndex(I=>I.id===e.id);if(A!==-1){const I=ne[0]||{equipmentType:"",quantity:0,shoeSize:""},B=AppState.appData.ppe[A]||{},H={...B,...be,equipmentType:I.equipmentType,quantity:I.quantity,shoeSize:I.shoeSize,createdAt:B.createdAt||e?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.ppe[A]=H,Y=H}}else{const A=AppState.appData.ppe||[],I=[];ne.forEach(B=>{const H=A.concat(I),Q={id:Utils.generateSequentialId("PPE",H),...be,equipmentType:B.equipmentType,quantity:B.quantity,shoeSize:B.shoeSize,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};I.push(Q),AppState.appData.ppe.push(Q)}),W=I}if(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)if(t){if(!Y)throw new Error("\u062A\u0639\u0630\u0631 \u062A\u062C\u0647\u064A\u0632 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0644\u0644\u062D\u0641\u0638 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645.");const A=await GoogleIntegration.sendToAppsScript("updatePPE",{ppeId:Y.id,updateData:Y});if(!A||A.success!==!0)throw new Error(A?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")}else for(const A of W){const I=await GoogleIntegration.sendToAppsScript("addPPE",A);if(!I||I.success!==!0)throw new Error(I?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),s.remove(),Notification.success(t?PPE._t("module.ppe.notify.updateSuccess","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D"):PPE._t("module.ppe.notify.saveSuccess","\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")),g&&(g.disabled=!1,g.innerHTML=T),this.refreshActiveTab({skipRemote:!0}),GoogleIntegration.autoSave("PPE",AppState.appData.ppe).catch(A=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",A)})}catch(F){typeof previousPpeSnapshot<"u"&&(AppState.appData.ppe=previousPpeSnapshot,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()),Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")+": "+(F.message||F)),g&&(g.disabled=!1,g.innerHTML=T)}})},200)},async loadPPEItemsForDropdown(e=null){const t=document.getElementById("ppe-equipment-type")||document.querySelector(".ppe-equipment-type");if(t)try{const s=Date.now(),a=this.state.ppeItemsListCache&&this.state.ppeItemsListCacheTime&&s-this.state.ppeItemsListCacheTime<this.state.ppeItemsListCacheExpiry;let o=[];if(a)o=Array.isArray(this.state.ppeItemsListCache)?this.state.ppeItemsListCache:[];else if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const c=await GoogleIntegration.sendToAppsScript("getPPEItemsList",{});c&&c.success&&c.data&&(o=c.data,this.state.ppeItemsListCache=o,this.state.ppeItemsListCacheTime=s)}if(o.length===0){const c=AppState.appData.ppe||[];o=[...new Set(c.map(i=>i.equipmentType).filter(Boolean))].map(i=>({itemName:i,itemCode:""}))}t.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>',o.forEach(c=>{const r=(c.itemName||"").trim();if(!r)return;const i=document.createElement("option");i.value=r,i.textContent=c.itemCode?`${c.itemCode} - ${r}`:r,e&&(r===e||c.itemCode===e)&&(i.selected=!0),t.appendChild(i)});const l=t.innerHTML;this.state.ppeItemsOptionsHTML=l,document.querySelectorAll(".ppe-equipment-type").forEach(c=>{if(c===t)return;const r=c.value;c.innerHTML=l,r&&(c.value=r)})}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629:",s),t.innerHTML=this.state.ppeItemsOptionsHTML||'<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>';const a=t.innerHTML;document.querySelectorAll(".ppe-equipment-type").forEach(l=>{if(l===t)return;const n=l.value;l.innerHTML=a,n&&(l.value=n)})}},async viewPPE(e){const t=AppState.appData.ppe.find(c=>c.id===e);if(!t)return;const s=(c,r)=>this._t(c,r),a=c=>Utils.escapeHTML(c),o=this.getDisplayStatus(t.status),l=document.createElement("div");l.className="modal-overlay";const n=String(t.id||"").replace(/\\/g,"\\\\").replace(/'/g,"\\'");l.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header" style="text-align: center; position: relative;">
                    <h2 class="modal-title" style="margin: 0 auto; text-align: center;">${a(s("module.ppe.title.viewReceipt","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%);">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.table.receiptNo","\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644"))}:</label>
                                <p class="text-gray-800 font-mono font-semibold text-lg">${Utils.escapeHTML(t.receiptNumber||t.id||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.table.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeName||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.table.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeCode||t.employeeNumber||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.label.department","\u0627\u0644\u0642\u0633\u0645"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeDepartment||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.label.position","\u0627\u0644\u0645\u0646\u0635\u0628"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeePosition||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.label.branch","\u0627\u0644\u0641\u0631\u0639"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeBranch||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.label.location","\u0627\u0644\u0645\u0648\u0642\u0639"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeLocation||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.table.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.equipmentType||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.table.quantity","\u0627\u0644\u0643\u0645\u064A\u0629"))}:</label>
                                <p class="text-gray-800">${t.quantity||0}</p>
                            </div>
                            ${t.shoeSize?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0642\u0627\u0633 \u0627\u0644\u062D\u0630\u0627\u0621:</label>
                                <p class="text-gray-800 font-bold"><i class="fas fa-shoe-prints text-blue-600 ml-1"></i>${Utils.escapeHTML(t.shoeSize)}</p>
                            </div>
                            `:""}
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.table.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}:</label>
                                <p class="text-gray-800">${t.receiptDate?Utils.formatDate(t.receiptDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}:</label>
                                <span class="badge badge-${this.isStatusReceived(t.status)?"success":"warning"}">
                                    ${a(o)}
                                </span>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="text-sm font-semibold text-gray-600">${a(s("module.ppe.label.notes","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}:</label>
                            <p class="text-gray-800 whitespace-pre-wrap">${Utils.escapeHTML(t.notes||s("module.ppe.notes.none","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="display: flex; justify-content: center; gap: 10px;">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${a(s("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}</button>
                    <button class="btn-success" onclick="PPE.exportPDF('${n}');">
                        <i class="fas fa-file-pdf ml-2"></i>${a(s("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF"))}
                    </button>
                    <button class="btn-primary" onclick="PPE.showPPEForm(${JSON.stringify(t).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>${a(s("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}
                    </button>
                    <button class="btn-danger" onclick="PPE.deletePPE('${n}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-trash ml-2"></i>${a(s("module.ppe.btn.deleteReceipt","\u062D\u0630\u0641"))}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(l),this.applyModuleI18n(l),l.addEventListener("click",c=>{c.target===l&&l.remove()})},async deletePPE(e){if(!e){Notification.error(this._t("module.ppe.notify.idMissing","\u0645\u0639\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}const t=AppState.appData.ppe.find(a=>a.id===e);if(!t){Notification.error(this._t("module.ppe.notify.receiptNotFound","\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}const s=`${this._t("module.ppe.confirm.delete","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u061F")}

${t.receiptNumber||t.id} \u2014 ${t.employeeName||""}`;if(confirm(s)){Loading.show();try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const a=await GoogleIntegration.sendToAppsScript("deletePPE",{ppeId:e});a&&a.success?(AppState.appData.ppe&&(AppState.appData.ppe=AppState.appData.ppe.filter(o=>o.id!==e)),Notification.success(this._t("module.ppe.notify.deleteSuccess","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")),await this.load()):Notification.error(a?.message||this._t("module.ppe.notify.deleteError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}else AppState.appData.ppe?(AppState.appData.ppe=AppState.appData.ppe.filter(a=>a.id!==e),Notification.success(this._t("module.ppe.notify.deleteSuccess","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")),await this.load()):Notification.error(this._t("module.ppe.empty.noReceipts","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A"))}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645:",a),Notification.error(this._t("module.ppe.notify.deleteError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645")+": "+(a.message||a))}finally{Loading.hide()}}},async exportPDF(e){const t=AppState.appData.ppe.find(s=>s.id===e);if(!t){Notification.error(this._t("module.ppe.notify.receiptNotFound","\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}try{Loading.show();const s=t.receiptNumber||`PPE-${t.id?.substring(0,8)||"UNKNOWN"}`,a=y=>Utils.escapeHTML(y||""),o=y=>y?Utils.formatDate(y):"-",l=`
                <table>
                    <tr><th>\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644</th><td>${a(t.receiptNumber||t.id)}</td></tr>
                    <tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th><td>${a(t.employeeName)}</td></tr>
                    <tr><th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><td>${a(t.employeeCode||t.employeeNumber)}</td></tr>
                    <tr><th>\u0627\u0644\u0642\u0633\u0645</th><td>${a(t.employeeDepartment)}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0646\u0635\u0628</th><td>${a(t.employeePosition)}</td></tr>
                    <tr><th>\u0627\u0644\u0641\u0631\u0639</th><td>${a(t.employeeBranch)}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639</th><td>${a(t.employeeLocation)}</td></tr>
                    <tr><th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629</th><td>${a(t.equipmentType)}</td></tr>
                    <tr><th>\u0627\u0644\u0643\u0645\u064A\u0629</th><td>${t.quantity||0}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645</th><td>${o(t.receiptDate)}</td></tr>
                    <tr><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><td>${a(t.status)}</td></tr>
                </table>
            `,n={type:"PPE",id:t.id,code:s,url:`${window.location.origin}/ppe/${t.id}`},c=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(s,this._t("module.ppe.pdf.receiptTitle","\u0625\u064A\u0635\u0627\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"),l,!1,!0,{version:"1.0",releaseDate:t.receiptDate||t.createdAt,revisionDate:t.updatedAt||t.receiptDate||t.createdAt,qrData:n},t.createdAt,t.updatedAt||t.receiptDate||t.createdAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>${Utils.escapeHTML(this._t("module.ppe.pdf.pageTitle","\u0625\u064A\u0635\u0627\u0644 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"))}</title></head><body>${l}</body></html>`,r=new Blob([c],{type:"text/html;charset=utf-8"}),i=URL.createObjectURL(r),p=window.open(i,"_blank");p?p.onload=()=>{setTimeout(()=>{p.print(),setTimeout(()=>{URL.revokeObjectURL(i),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error(this._t("module.ppe.notify.pdfBlocked","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")))}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645:",s),Notification.error(this._t("module.ppe.notify.pdfError","\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF")+": "+s.message)}},async showPPEMatrix(){const e=(l,n)=>this._t(l,n),t=l=>Utils.escapeHTML(l),s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 1400px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-table ml-2"></i>
                        ${t(e("module.ppe.title.matrix","\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0644\u0643\u0644 \u0645\u0648\u0638\u0641"))}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <div class="flex gap-2 items-center">
                            <input type="text" id="ppe-matrix-search" class="form-input" style="max-width: 400px;" 
                                placeholder="${t(e("module.ppe.matrix.searchPlaceholder",""))}">
                            <button id="add-ppe-matrix-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${t(e("module.ppe.matrix.addEdit","\u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 \u0645\u0635\u0641\u0648\u0641\u0629 \u0644\u0648\u0638\u064A\u0641\u0629"))}
                            </button>
                        </div>
                    </div>
                    <div id="ppe-matrix-content">
                        ${await this.renderPPEMatrix()}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t(e("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}</button>
                    <button class="btn-primary" onclick="PPE.exportPPEMatrix()">
                        <i class="fas fa-file-excel ml-2"></i>${t(e("module.ppe.matrix.exportExcel","\u062A\u0635\u062F\u064A\u0631 Excel"))}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(s),this.applyModuleI18n(s);const a=document.getElementById("ppe-matrix-search");a&&a.addEventListener("input",l=>{this.filterPPEMatrix(l.target.value.trim())});const o=document.getElementById("add-ppe-matrix-btn");o&&o.addEventListener("click",()=>{this.showAddPPEMatrixForm()}),s.addEventListener("click",l=>{l.target===s&&s.remove()})},async renderPPEMatrix(){const e=(n,c)=>this._t(n,c),t=n=>Utils.escapeHTML(n),s=AppState.appData.employees||[],a=AppState.appData.employeePPEMatrixByCode||{},o=AppState.appData.ppe||[];if(s.length===0)return`
                <div class="empty-state">
                    <i class="fas fa-table text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${t(e("module.ppe.empty.matrixNoEmployees","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646"))}</p>
                </div>
            `;const l=s.map(n=>{const c=n.employeeNumber||n.sapId||"",r=n.name||n.employeeName||"-",i=n.position||e("module.ppe.label.undefinedDept","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),p=n.department||"-",y=a[c]||[],h=o.filter(f=>f.employeeCode===c||f.employeeNumber===c),d=[...new Set(h.map(f=>f.equipmentType).filter(Boolean))];return{code:c,name:r,position:i,department:p,requiredPPE:y,receivedPPE:d}});return`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${t(e("module.ppe.table.matrix.code","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}</th>
                            <th>${t(e("module.ppe.table.matrix.name","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}</th>
                            <th>${t(e("module.ppe.table.matrix.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"))}</th>
                            <th>${t(e("module.ppe.table.matrix.dept","\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629"))}</th>
                            <th>${t(e("module.ppe.table.matrix.required","\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"))}</th>
                            <th>${t(e("module.ppe.table.matrix.received","\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629"))}</th>
                            <th>${t(e("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${l.map(n=>{const c=n.requiredPPE.length>0?n.requiredPPE.map(i=>`<span class="badge badge-success mr-1 mb-1">${Utils.escapeHTML(i)}</span>`).join(""):`<span class="text-gray-500 text-sm">${t(e("module.ppe.matrix.notSet","\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F"))}</span>`,r=n.receivedPPE.length>0?n.receivedPPE.map(i=>`<span class="badge badge-info mr-1 mb-1">${Utils.escapeHTML(i)}</span>`).join(""):`<span class="text-gray-500 text-sm">${t(e("module.ppe.matrix.noneReceived","\u0644\u0627 \u062A\u0648\u062C\u062F"))}</span>`;return`
                                <tr data-employee-code="${Utils.escapeHTML(n.code)}" data-employee-name="${Utils.escapeHTML(n.name)}" data-position="${Utils.escapeHTML(n.position)}">
                                    <td><strong class="font-mono">${Utils.escapeHTML(n.code||"-")}</strong></td>
                                    <td>${Utils.escapeHTML(n.name)}</td>
                                    <td>${Utils.escapeHTML(n.position)}</td>
                                    <td>${Utils.escapeHTML(n.department)}</td>
                                    <td>
                                        <div class="flex flex-wrap gap-1">
                                            ${c}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex flex-wrap gap-1">
                                            ${r}
                                        </div>
                                    </td>
                                    <td>
                                        <button onclick="PPE.editEmployeePPEMatrix('${Utils.escapeHTML(n.code)}')" class="btn-icon btn-icon-primary" title="${t(e("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},filterPPEMatrix(e){const t=document.querySelector("#ppe-matrix-content tbody");if(!t)return;t.querySelectorAll("tr[data-employee-code]").forEach(a=>{const o=a.getAttribute("data-employee-code")||"",l=a.getAttribute("data-employee-name")||"",n=a.getAttribute("data-position")||"",c=e.toLowerCase();!e||o.toLowerCase().includes(c)||l.toLowerCase().includes(c)||n.toLowerCase().includes(c)?a.style.display="":a.style.display="none"})},async showAddPPEMatrixForm(e=null){const t=!!e,s=AppState.appData.employeePPEMatrix||{},a=AppState.appData.ppe||[],o=[...new Set(a.map(m=>m.equipmentType).filter(Boolean))],l=AppState.appData.employees||[],n=[...new Set(l.map(m=>m.position).filter(Boolean))],c=e?s[e]:null,r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-plus-circle ml-2"></i>
                        ${t?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629":"\u0625\u0636\u0627\u0621\u0629 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0644\u0648\u0638\u064A\u0629"}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="ppe-matrix-form" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 *</label>
                                ${t?`
                                    <input type="text" id="ppe-matrix-position" value="${Utils.escapeHTML(e)}" class="form-input" readonly>
                                `:`
                                    <select id="ppe-matrix-position" required class="form-input">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629</option>
                                        ${n.map(m=>`
                                            <option value="${Utils.escapeHTML(m)}" ${s[m]?"disabled":""}>${Utils.escapeHTML(m)}${s[m]?" (\u0645\u0648\u062C\u0648\u062F\u0629 \u0628\u0627\u0644\u0641\u0639\u0644)":""}</option>
                                        `).join("")}
                                        <option value="__custom__">\u0625\u0636\u0627\u0641\u0629 \u0648\u0638\u064A\u0641\u0629 \u062C\u062F\u064A\u062F\u0629</option>
                                    </select>
                                    <input type="text" id="ppe-matrix-position-custom" class="form-input mt-2" style="display: none;" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                                `}
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 *</label>
                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    ${o.map((m,x)=>`
                                        <label class="flex items-center p-2 border rounded cursor-pointer hover:bg-blue-50 transition-colors">
                                            <input type="checkbox" name="ppe-type" value="${Utils.escapeHTML(m)}" 
                                                ${c&&c.requiredPPE&&c.requiredPPE.includes(m)?"checked":""}
                                                class="ml-2 rounded border-gray-300 text-blue-600">
                                            <span class="text-sm font-medium">${Utils.escapeHTML(m)}</span>
                                        </label>
                                    `).join("")}
                                    ${o.length===0?`
                                        <div class="col-span-3 text-center text-gray-500 py-4">
                                            \u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u0647\u0645\u0627\u062A \u0648\u0642\u0627\u064A\u0629 \u0645\u0633\u062C\u0644\u0629. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0645\u0647\u0645\u0627\u062A \u0648\u0642\u0627\u064A\u0629 \u0623\u0648\u0644\u0627\u064B.
                                        </div>
                                    `:""}
                                </div>
                                <div class="mt-4">
                                    <input type="text" id="ppe-matrix-custom-type" class="form-input" placeholder="\u0623\u0648 \u0623\u062F\u062E\u0644 \u0646\u0648\u0639 \u0645\u0647\u0645\u0629 \u0648\u0642\u0627\u064A\u0629 \u0645\u062E\u0635\u0635\u0629">
                                    <button type="button" onclick="
                                        const customType = document.getElementById('ppe-matrix-custom-type');
                                        if(customType && customType.value.trim()) {
                                            const container = document.querySelector('#ppe-matrix-form .grid');
                                            const newLabel = document.createElement('label');
                                            newLabel.className = 'flex items-center p-2 border rounded cursor-pointer hover:bg-blue-50 transition-colors';
                                            const typeValue = customType.value.trim();
                                            newLabel.innerHTML = '<input type=\\'checkbox\\' name=\\'ppe-type\\' value=\\'' + typeValue + '\\' checked class=\\'ml-2 rounded border-gray-300 text-blue-600\\'><span class=\\'text-sm font-medium\\'>' + typeValue + '</span>';
                                            container.appendChild(newLabel);
                                            customType.value = '';
                                        }
                                    " class="btn-secondary mt-2">
                                        <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p class="text-sm text-blue-800">
                                <i class="fas fa-info-circle ml-1"></i>
                                <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u0633\u064A\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0647\u0630\u0647 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0630\u064A\u0646 \u0644\u062F\u064A\u0647\u0645 \u0647\u0630\u0647 \u0627\u0644\u0648\u0638\u064A\u0641\u0629.
                            </p>
                        </div>
                        
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(r);let i=!1;const p=r.querySelector('[data-action="close"]'),y=r.querySelector(".modal-close"),h=()=>{i&&!u&&!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0644\u062F\u064A\u0643 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062F\u0648\u0646 \u062D\u0641\u0638\u061F`)||r.remove()};p&&p.addEventListener("click",h),y&&y.addEventListener("click",h);const d=document.getElementById("ppe-matrix-position"),f=document.getElementById("ppe-matrix-position-custom");d&&f&&d.addEventListener("change",()=>{d.value==="__custom__"?(f.style.display="block",f.required=!0):(f.style.display="none",f.required=!1)});const v=r.querySelector("#ppe-matrix-form");let u=!1;v.addEventListener("change",()=>{i=!0}),v.addEventListener("input",()=>{i=!0}),v.addEventListener("submit",async m=>{if(m.preventDefault(),u)return;const x=t?e:d?.value==="__custom__"?f?.value.trim():d?.value;if(!x){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u0629");return}const w=Array.from(v.querySelectorAll('input[name="ppe-type"]:checked')).map(C=>C.value);if(w.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0648\u0642\u0627\u064A\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}u=!0;const E=v.querySelector('button[type="submit"]'),N=E?.innerHTML;E&&(E.disabled=!0,E.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const C=l.filter($=>$.position===x).map($=>$.employeeNumber||$.sapId||"");AppState.appData.employeePPEMatrix||(AppState.appData.employeePPEMatrix={});const q=AppState.appData.employeePPEMatrix[x]||{};AppState.appData.employeePPEMatrix[x]={requiredPPE:w,employees:C,updatedAt:new Date().toISOString(),createdAt:q?.createdAt||new Date().toISOString()},AppState.appData.employeePPEMatrixByCode||(AppState.appData.employeePPEMatrixByCode={}),C.forEach($=>{$&&(AppState.appData.employeePPEMatrixByCode[$]||(AppState.appData.employeePPEMatrixByCode[$]=[]),w.forEach(L=>{AppState.appData.employeePPEMatrixByCode[$].includes(L)||AppState.appData.employeePPEMatrixByCode[$].push(L)}))}),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),i=!1,Notification.success("\u062A\u0645 "+(t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629")+' \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0644\u0644\u0648\u0638\u064A\u0641\u0629 "'+x+'" \u0628\u0646\u062C\u0627\u062D'),r.remove(),this.showPPEMatrix(),Promise.allSettled([GoogleIntegration.autoSave("PPEMatrix",AppState.appData.employeePPEMatrix).catch($=>(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",$),{success:!1,error:$})),GoogleIntegration.autoSave("EmployeePPEMatrixByCode",AppState.appData.employeePPEMatrixByCode).catch($=>(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A Google Sheets:",$),{success:!1,error:$}))]).then($=>{$.every(U=>U.status==="fulfilled")||Utils.safeWarn("\u26A0\uFE0F \u0628\u0639\u0636 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0645 \u062A\u0643\u062A\u0645\u0644 \u0628\u0646\u062C\u0627\u062D\u060C \u0644\u0643\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B")}).catch($=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",$)})}catch(C){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+C.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629:",C),E&&(E.disabled=!1,E.innerHTML=N),u=!1}}),r.addEventListener("click",m=>{if(m.target===r){if(i&&!u&&!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0644\u062F\u064A\u0643 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062F\u0648\u0646 \u062D\u0641\u0638\u061F`))return;r.remove()}})},async editPPEMatrix(e){this.showAddPPEMatrixForm(e)},async editEmployeePPEMatrix(e){const s=(AppState.appData.employees||[]).find(y=>(y.employeeNumber||y.sapId)===e);if(!s){Notification.error("\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=(AppState.appData.employeePPEMatrixByCode||{})[e]||[],l=AppState.appData.ppe||[],n=[...new Set(l.map(y=>y.equipmentType).filter(Boolean))],c=["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","\u0642\u0641\u0627\u0632\u0627\u062A","\u0623\u062D\u0630\u064A\u0629 \u0623\u0645\u0627\u0646","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0633\u062F\u0627\u062F\u0627\u062A \u0623\u0630\u0646","\u0643\u0645\u0627\u0645\u0629","\u0628\u062F\u0644\u0629 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u0645\u0639\u062F\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u062A\u0646\u0641\u0633\u064A\u0629"],r=[...new Set([...c,...n])],i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 - ${Utils.escapeHTML(s.name||e)}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4 p-3 bg-gray-50 rounded">
                        <p><strong>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</strong> ${Utils.escapeHTML(e)}</p>
                        <p><strong>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641:</strong> ${Utils.escapeHTML(s.name||"-")}</p>
                        <p><strong>\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</strong> ${Utils.escapeHTML(s.position||"-")}</p>
                        <p><strong>\u0627\u0644\u0642\u0633\u0645:</strong> ${Utils.escapeHTML(s.department||"-")}</p>
                    </div>
                    <form id="employee-ppe-matrix-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 *</label>
                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    ${r.map((y,h)=>`
                                        <label class="flex items-center p-2 border rounded cursor-pointer hover:bg-blue-50 transition-colors">
                                            <input type="checkbox" name="ppe-type" value="${Utils.escapeHTML(y)}" 
                                                ${o.includes(y)?"checked":""}
                                                class="ml-2 rounded border-gray-300 text-blue-600">
                                            <span class="text-sm font-medium">${Utils.escapeHTML(y)}</span>
                                        </label>
                                    `).join("")}
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(i);const p=i.querySelector("#employee-ppe-matrix-form");p.addEventListener("submit",async y=>{y.preventDefault();const h=p.querySelectorAll('input[name="ppe-type"]:checked'),d=Array.from(h).map(f=>f.value);try{AppState.appData.employeePPEMatrixByCode||(AppState.appData.employeePPEMatrixByCode={}),AppState.appData.employeePPEMatrixByCode[e]=d,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0644\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),i.remove();const f=document.getElementById("ppe-matrix-content");f&&(f.innerHTML=await this.renderPPEMatrix()),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&GoogleIntegration.autoSave("EmployeePPEMatrixByCode",AppState.appData.employeePPEMatrixByCode).catch(v=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",v)})}catch(f){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+f.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629:",f)}}),i.addEventListener("click",y=>{y.target===i&&i.remove()})},async viewPositionEmployees(e){const s=(AppState.appData.employeePPEMatrix||{})[e],o=(AppState.appData.employees||[]).filter(r=>r.position===e),l=document.createElement("div");l.className="modal-overlay";const n=s&&s.requiredPPE?s.requiredPPE.map(r=>`<span class="badge badge-success mr-2">${Utils.escapeHTML(r)}</span>`).join(""):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F";let c="";o.length>0?c=`
                <div class="table-wrapper" style="overflow-x: auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                                <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                                <th>\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                <th>\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${o.map(r=>{const i=r.employeeNumber||r.sapId||"",p=(AppState.appData.ppe||[]).filter(v=>v.employeeCode===i||v.employeeNumber===i),h=(AppState.appData.employeePPEMatrixByCode||{})[i]||[],d=p.length>0?p.map(v=>`<span class="badge badge-info">${Utils.escapeHTML(v.equipmentType||"")}</span>`).join(""):'<span class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F</span>',f=h.length>0?h.map(v=>`<span class="badge badge-success">${Utils.escapeHTML(v)}</span>`).join(""):'<span class="text-gray-500 text-sm">\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F</span>';return`
                                    <tr>
                                        <td><strong>${Utils.escapeHTML(i||"-")}</strong></td>
                                        <td>${Utils.escapeHTML(r.name||"-")}</td>
                                        <td>${Utils.escapeHTML(r.department||"-")}</td>
                                        <td>
                                            <div class="mb-2">
                                                <strong class="text-sm text-gray-600">\u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:</strong>
                                                <div class="flex flex-wrap gap-2 mt-1">
                                                    ${f}
                                                </div>
                                            </div>
                                            <div>
                                                <strong class="text-sm text-gray-600">\u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629:</strong>
                                                <div class="flex flex-wrap gap-2 mt-1">
                                                    ${d}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                `}).join("")}
                        </tbody>
                    </table>
                </div>
            `:c=`
                <div class="empty-state">
                    <i class="fas fa-users text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u064A\u0646 \u0628\u0647\u0630\u0647 \u0627\u0644\u0648\u0638\u064A\u0641\u0629</p>
                </div>
            `,l.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-users ml-2"></i>
                        \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u0648\u0638\u064A\u0641\u0629: ${Utils.escapeHTML(e)}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p class="text-sm text-blue-800">
                                <strong>\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:</strong>
                                ${n}
                            </p>
                        </div>
                    </div>
                    ${c}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(l),l.addEventListener("click",r=>{r.target===l&&l.remove()})},_ppeReceiptExcelFieldDefs(){return[{key:"id",ar:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0633\u062C\u0644",en:"id"},{key:"receiptNumber",ar:"\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644",en:"receiptNumber"},{key:"employeeName",ar:"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",en:"employeeName"},{key:"employeeCode",ar:"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A",en:"employeeCode"},{key:"employeeDepartment",ar:"\u0627\u0644\u0642\u0633\u0645",en:"employeeDepartment"},{key:"equipmentType",ar:"\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629",en:"equipmentType"},{key:"quantity",ar:"\u0627\u0644\u0643\u0645\u064A\u0629",en:"quantity"},{key:"receiptDate",ar:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",en:"receiptDate"},{key:"status",ar:"\u0627\u0644\u062D\u0627\u0644\u0629",en:"status"}]},_ppeStockExcelFieldDefs(){return[{key:"itemId",ar:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641",en:"itemId"},{key:"itemCode",ar:"\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641",en:"itemCode"},{key:"itemName",ar:"\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641",en:"itemName"},{key:"category",ar:"\u0627\u0644\u0641\u0626\u0629",en:"category"},{key:"stock_IN",ar:"\u0627\u0644\u0648\u0627\u0631\u062F",en:"stock_IN"},{key:"stock_OUT",ar:"\u0627\u0644\u0645\u0646\u0635\u0631\u0641",en:"stock_OUT"},{key:"balance",ar:"\u0627\u0644\u0631\u0635\u064A\u062F",en:"balance"},{key:"minThreshold",ar:"\u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628",en:"minThreshold"},{key:"supplier",ar:"\u0627\u0644\u0645\u0648\u0631\u062F",en:"supplier"}]},_ppeBuildHeaderAliasMap(e){const t={};return e.forEach(s=>{t[String(s.ar||"").trim()]=s.key,t[String(s.en||"").trim().toLowerCase()]=s.key}),t},_ppeFormatCellForExcel(e){if(e==null)return"";if(e instanceof Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}if(typeof e=="object"&&e!==null&&typeof e.toISOString=="function")try{const t=new Date(e);if(!isNaN(t.getTime()))return this._ppeFormatCellForExcel(t)}catch{}return e},async exportReceiptsExcel(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}Loading.show(this._t("module.ppe.excel.exportingReceipts","\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A\u2026"));const e=this._ppeReceiptExcelFieldDefs(),s=this.getFilteredPpeReceipts(AppState.appData.ppe||[]).map(n=>{const c={};return e.forEach(r=>{let i=n[r.key];r.key==="receiptDate"?i=this._ppeFormatCellForExcel(i||n.receiptDate):r.key==="quantity"&&(i=i!=null?Number(i):""),c[r.ar]=i??""}),c}),a=XLSX.utils.json_to_sheet(s.length?s:[e.reduce((n,c)=>(n[c.ar]="",n),{})]),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,a,this._t("module.ppe.excel.sheetReceipts","\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"));const l=new Date().toISOString().slice(0,10);XLSX.writeFile(o,`PPE_\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A_${l}.xlsx`),Loading.hide(),Notification.success(this._t("module.ppe.excel.exportReceiptsOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"))}catch(e){Loading.hide(),Utils.safeError("exportReceiptsExcel",e),Notification.error(this._t("module.ppe.excel.exportErr","\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")+": "+(e.message||e))}},downloadReceiptsExcelTemplate(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=this._ppeReceiptExcelFieldDefs().map(o=>o.ar),s=XLSX.utils.aoa_to_sheet([t]),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,s,this._t("module.ppe.excel.sheetReceipts","\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A")),XLSX.writeFile(a,`PPE_\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success(this._t("module.ppe.excel.templateDownloadOk","\u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}catch(e){Notification.error(this._t("module.ppe.excel.templateErr","\u0641\u0634\u0644 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628")+": "+e.message)}},async importReceiptsExcel(e){if(!e)return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=this._ppeReceiptExcelFieldDefs(),s=this._ppeBuildHeaderAliasMap(t);try{Loading.show(this._t("module.ppe.excel.importingReceipts","\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A\u2026"));const a=await e.arrayBuffer(),o=XLSX.read(a,{type:"array",cellDates:!0}),l=o.Sheets[o.SheetNames[0]],n=XLSX.utils.sheet_to_json(l,{header:1,defval:"",raw:!1});if(!n||n.length<2){Loading.hide(),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const r=(n[0]||[]).map(f=>String(f||"").trim()).map(f=>s[f]||s[String(f||"").trim().toLowerCase()]||""),i=Array.isArray(AppState.appData.ppe)?AppState.appData.ppe:[],p=new Set(i.map(f=>String(f&&(f.id||f.receiptNumber)||"").trim()).filter(Boolean));let y=0,h=0;const d=[];for(let f=1;f<n.length;f++){const v=n[f];if(!v||!v.some(x=>String(x||"").trim()!==""))continue;const u={};if(r.forEach((x,w)=>{if(!x)return;let E=v[w];if(E instanceof Date)u[x]=E.toISOString();else if(x==="quantity")u[x]=parseFloat(String(E).replace(/,/g,""))||0;else if(x==="receiptDate"&&E!==""&&E!==null&&E!==void 0){const N=E instanceof Date?E:new Date(E);u[x]=isNaN(N.getTime())?String(E):N.toISOString()}else u[x]=E!=null?String(E).trim():""}),!u.equipmentType||!u.employeeName){h++;continue}!u.quantity&&u.quantity!==0&&(u.quantity=1),u.status||(u.status="\u0645\u0633\u062A\u0644\u0645");const m=String(u.id||u.receiptNumber||"").trim();if(m&&p.has(m)){d.push({row:f+1,id:m,label:`${u.employeeName} \u2014 ${u.equipmentType}`});continue}try{const x={...u};delete x.id;const w=await GoogleIntegration.sendToAppsScript("addPPE",x);w&&w.success?(y++,m&&p.add(m)):h++}catch(x){h++,Utils.safeWarn("\u0635\u0641 \u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u0634\u0644:",x)}}Loading.hide(),this.clearCache(),await this.refreshActiveTab(),this._reportImportSummary({scope:"receipts",ok:y,fail:h,duplicates:d})}catch(a){Loading.hide(),Utils.safeError("importReceiptsExcel",a),Notification.error(this._t("module.ppe.excel.importErr","\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F")+": "+(a.message||a))}},async exportStockExcel(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}Loading.show(this._t("module.ppe.excel.exportingStock","\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"));const e=this._ppeStockExcelFieldDefs(),s=this.getFilteredStockItems(this._getCurrentStockItems()).map(l=>{const n={};return e.forEach(c=>{let r=l[c.key];c.key==="lastUpdate"?r=this._ppeFormatCellForExcel(r):["stock_IN","stock_OUT","balance","minThreshold"].includes(c.key)&&(r=r!=null&&r!==""?Number(r):""),n[c.ar]=r??""}),n}),a=XLSX.utils.json_to_sheet(s.length?s:[e.reduce((l,n)=>(l[n.ar]="",l),{})]),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,a,this._t("module.ppe.excel.sheetStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629")),XLSX.writeFile(o,`PPE_\u0645\u062E\u0632\u0648\u0646_${new Date().toISOString().slice(0,10)}.xlsx`),Loading.hide(),Notification.success(this._t("module.ppe.excel.exportStockOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0644\u0645\u062E\u0632\u0648\u0646"))}catch(e){Loading.hide(),Utils.safeError("exportStockExcel",e),Notification.error(this._t("module.ppe.excel.exportErr","\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")+": "+(e.message||e))}},downloadStockExcelTemplate(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=this._ppeStockExcelFieldDefs().filter(o=>!["stock_IN","stock_OUT","balance"].includes(o.key)).map(o=>o.ar),s=XLSX.utils.aoa_to_sheet([t]),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,s,this._t("module.ppe.excel.sheetStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629")),XLSX.writeFile(a,`PPE_\u0642\u0627\u0644\u0628_\u0645\u062E\u0632\u0648\u0646_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success(this._t("module.ppe.excel.templateDownloadOk","\u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}catch(e){Notification.error(this._t("module.ppe.excel.templateErr","\u0641\u0634\u0644 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628")+": "+e.message)}},async importStockExcel(e){if(!e)return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=this._ppeStockExcelFieldDefs(),s=this._ppeBuildHeaderAliasMap(t);try{Loading.show(this._t("module.ppe.excel.importingStock","\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"));const a=await e.arrayBuffer(),o=XLSX.read(a,{type:"array",cellDates:!0}),l=o.Sheets[o.SheetNames[0]],n=XLSX.utils.sheet_to_json(l,{header:1,defval:"",raw:!1});if(!n||n.length<2){Loading.hide(),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const r=(n[0]||[]).map(m=>String(m||"").trim()).map(m=>s[m]||s[String(m||"").trim().toLowerCase()]||"");let i=this._getCurrentStockItems();if(!Array.isArray(i)||i.length===0)try{i=await this.loadStockItems(!0)}catch{i=this._getCurrentStockItems()||[]}const p=m=>String(m??"").trim().toLowerCase(),y=new Set,h=new Set,d=new Set;(i||[]).forEach(m=>{m&&(m.itemCode&&y.add(p(m.itemCode)),m.itemName&&h.add(p(m.itemName)),m.itemId&&d.add(String(m.itemId).trim()))});let f=0,v=0;const u=[];for(let m=1;m<n.length;m++){const x=n[m];if(!x||!x.some(L=>String(L||"").trim()!==""))continue;const w={};if(r.forEach((L,U)=>{if(!L)return;let O=x[U];["stock_IN","stock_OUT","balance","minThreshold"].includes(L)?w[L]=parseFloat(String(O).replace(/,/g,""))||0:w[L]=O!=null?String(O).trim():""}),!w.itemCode||!w.itemName){v++;continue}const E=p(w.itemCode),N=p(w.itemName),C=w.itemId&&String(w.itemId).trim();let q="";if(C&&d.has(C)?q="itemId":y.has(E)?q="itemCode":h.has(N)&&(q="itemName"),q){u.push({row:m+1,code:w.itemCode,name:w.itemName,reason:q});continue}const $={itemCode:w.itemCode,itemName:w.itemName,category:w.category||"",minThreshold:w.minThreshold!==void 0?w.minThreshold:0,supplier:w.supplier||""};w.stock_IN!==void 0&&($.stock_IN=w.stock_IN),w.stock_OUT!==void 0&&($.stock_OUT=w.stock_OUT),w.balance!==void 0&&($.balance=w.balance);try{const L=await GoogleIntegration.sendToAppsScript("addOrUpdatePPEStockItem",$);if(L&&L.success)f++,y.add(E),h.add(N);else{const U=L&&L.message?String(L.message):"";/موجود|exists/i.test(U)?u.push({row:m+1,code:w.itemCode,name:w.itemName,reason:"backend"}):v++}}catch(L){v++,Utils.safeWarn("\u0635\u0641 \u0645\u062E\u0632\u0648\u0646 \u0641\u0634\u0644:",L)}}Loading.hide(),this.clearCache(),await this.refreshActiveTab(),this._reportImportSummary({scope:"stock",ok:f,fail:v,duplicates:u})}catch(a){Loading.hide(),Utils.safeError("importStockExcel",a),Notification.error(this._t("module.ppe.excel.importErr","\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F")+": "+(a.message||a))}},_reportImportSummary({scope:e,ok:t,fail:s,duplicates:a}){const o=(r,i)=>this._t(r,i),l=a&&a.length||0,c=`${e==="receipts"?this._t("module.ppe.excel.importReceiptsSummary","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"):this._t("module.ppe.excel.importStockSummary","\u0627\u0643\u062A\u0645\u0644 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646")}: ${t} ${this._t("module.ppe.excel.ok","\u0646\u062C\u0627\u062D")}\u060C ${l} ${this._t("module.ppe.excel.duplicates","\u0645\u0643\u0631\u0651\u0631 (\u062A\u0645 \u062A\u062C\u0627\u0648\u0632\u0647)")}\u060C ${s} ${this._t("module.ppe.excel.fail","\u062A\u062E\u0637\u064A/\u0641\u0634\u0644")}.`;if(l>0){try{Notification.warning(c)}catch{}this._showDuplicatesModal(e,a)}else if(t>0)try{Notification.success(c)}catch{}else try{Notification.warning(c)}catch{}},_showDuplicatesModal(e,t){const s=(p,y)=>this._t(p,y),a=p=>Utils.escapeHTML(p),o=e==="receipts",l=o?s("module.ppe.excel.duplicatesReceiptsTitle","\u0628\u0646\u0648\u062F \u0645\u0643\u0631\u0651\u0631\u0629 \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A (\u0644\u0645 \u062A\u064F\u0633\u062A\u0648\u0631\u062F)"):s("module.ppe.excel.duplicatesStockTitle","\u0623\u0635\u0646\u0627\u0641 \u0645\u0643\u0631\u0651\u0631\u0629 \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646 (\u0644\u0645 \u062A\u064F\u0633\u062A\u0648\u0631\u062F)"),n=p=>p==="itemCode"?s("module.ppe.excel.dupReasonCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"):p==="itemName"?s("module.ppe.excel.dupReasonName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"):p==="itemId"?s("module.ppe.excel.dupReasonId","\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"):p==="backend"?s("module.ppe.excel.dupReasonBackend","\u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644 (\u062A\u0645 \u0631\u0641\u0636\u0647 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645)"):s("module.ppe.excel.dupReasonGeneric","\u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"),c=(t||[]).map(p=>o?`<tr>
                    <td>${a(p.row)}</td>
                    <td>${a(p.id||"")}</td>
                    <td>${a(p.label||"")}</td>
                </tr>`:`<tr>
                <td>${a(p.row)}</td>
                <td class="font-mono font-semibold">${a(p.code||"")}</td>
                <td>${a(p.name||"")}</td>
                <td>${a(n(p.reason))}</td>
            </tr>`).join(""),r=o?`<tr><th>${a(s("module.ppe.excel.dupCol.row","\u0627\u0644\u0635\u0641"))}</th><th>${a(s("module.ppe.excel.dupCol.idOrReceipt","\u0627\u0644\u0645\u0639\u0631\u0641/\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644"))}</th><th>${a(s("module.ppe.excel.dupCol.summary","\u0627\u0644\u0645\u0648\u0638\u0641 \u2014 \u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}</th></tr>`:`<tr><th>${a(s("module.ppe.excel.dupCol.row","\u0627\u0644\u0635\u0641"))}</th><th>${a(s("module.ppe.excel.dupCol.code","\u0627\u0644\u0643\u0648\u062F"))}</th><th>${a(s("module.ppe.excel.dupCol.name","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641"))}</th><th>${a(s("module.ppe.excel.dupCol.reason","\u0627\u0644\u0633\u0628\u0628"))}</th></tr>`,i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 760px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-exclamation-triangle text-amber-500 ml-2"></i>${a(l)}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-sm text-gray-600 mb-3">
                        ${a(s("module.ppe.excel.dupHint","\u0644\u0645 \u064A\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0623\u064A \u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F\u061B \u062A\u0645 \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0641\u0642\u0637."))}
                    </p>
                    <div class="table-wrapper" style="max-height: 380px; overflow:auto;">
                        <table class="data-table">
                            <thead>${r}</thead>
                            <tbody>${c}</tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        ${a(s("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(i),i.addEventListener("click",p=>{p.target===i&&i.remove()})},_isPpeAdminUser(){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function")return!!Permissions.isCurrentUserEffectiveAdmin()}catch{}const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;if(!e)return!1;const t=String(e.role||"").toLowerCase();if(t==="admin"||t==="system_admin"||e.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645")return!0;const s=e.permissions||{};return s.admin===!0||s["manage-modules"]===!0},_buildExcelToolbarHtml(e){if(!this._isPpeAdminUser())return"";const t=(l,n)=>this._t(l,n),s=l=>Utils.escapeHTML(l),o=e==="receipts"?{exportBtn:"ppe-receipts-export-excel-btn",tplBtn:"ppe-receipts-template-btn",importBtn:"ppe-receipts-import-btn",exportTitleKey:"module.ppe.excel.exportReceiptsTitle",exportTitleFb:"\u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0625\u0644\u0649 Excel",tplTitleKey:"module.ppe.excel.downloadTemplateReceiptsTitle",tplTitleFb:"\u062A\u0646\u0632\u064A\u0644 \u0642\u0627\u0644\u0628 Excel \u0641\u0627\u0631\u063A",importTitleKey:"module.ppe.excel.importReceiptsTitle",importTitleFb:"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0635\u0641\u0648\u0641 \u0645\u0646 \u0645\u0644\u0641 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0642\u0627\u0644\u0628"}:{exportBtn:"ppe-stock-export-excel-btn",tplBtn:"ppe-stock-template-btn",importBtn:"ppe-stock-import-btn",exportTitleKey:"module.ppe.excel.exportStockTitle",exportTitleFb:"\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0625\u0644\u0649 Excel",tplTitleKey:"module.ppe.excel.downloadTemplateStockTitle",tplTitleFb:"\u062A\u0646\u0632\u064A\u0644 \u0642\u0627\u0644\u0628 Excel \u0644\u0644\u0623\u0635\u0646\u0627\u0641",importTitleKey:"module.ppe.excel.importStockTitle",importTitleFb:"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0635\u0646\u0627\u0641 \u0645\u0646 \u0645\u0644\u0641 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0642\u0627\u0644\u0628"};return`
            <div class="ppe-excel-toolbar flex flex-wrap items-center justify-end gap-2 mb-3">
                <button id="${o.exportBtn}" type="button" class="btn-secondary" title="${s(t(o.exportTitleKey,o.exportTitleFb))}">
                    <i class="fas fa-file-excel ml-2"></i>${s(t("module.ppe.excel.exportBtn","\u062A\u0635\u062F\u064A\u0631 Excel"))}
                </button>
                <button id="${o.tplBtn}" type="button" class="btn-secondary" title="${s(t(o.tplTitleKey,o.tplTitleFb))}">
                    <i class="fas fa-download ml-2"></i>${s(t("module.ppe.excel.downloadTemplateBtn","\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                </button>
                <button id="${o.importBtn}" type="button" class="btn-secondary" title="${s(t(o.importTitleKey,o.importTitleFb))}">
                    <i class="fas fa-file-import ml-2"></i>${s(t("module.ppe.excel.importBtn","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                </button>
            </div>
        `},showPpeReceiptsImportModal(){if(!this._isPpeAdminUser())return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}try{document.getElementById("ppe-receipts-import-modal")?.remove()}catch{}const e=(d,f)=>this._t(d,f),t=d=>Utils.escapeHTML(d),a=this._ppeReceiptExcelFieldDefs().map(d=>`<li><strong>${t(d.ar)}</strong> \u2014 <span class="font-mono text-xs">${t(d.en)}</span></li>`).join(""),o=document.createElement("div");o.className="modal-overlay",o.id="ppe-receipts-import-modal",o.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2 text-green-600"></i>${t(e("module.ppe.excel.importModalReceiptsTitle","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0645\u0646 Excel"))}</h2>
                    <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="${t(e("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p class="text-sm text-blue-900 font-semibold mb-2"><i class="fas fa-info-circle ml-2"></i>${t(e("module.ppe.excel.importModalIntro","\u062D\u0645\u0651\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0623\u0648 \u0627\u062A\u0628\u0639 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062B\u0645 \u0627\u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641. \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0643\u0631\u0631\u0629 \u062A\u064F\u062A\u062C\u0627\u0648\u064E\u0632 \u0645\u0639 \u062A\u0646\u0628\u064A\u0647."))}</p>
                        <button type="button" id="ppe-receipts-modal-download-template" class="btn-secondary btn-sm mb-3">
                            <i class="fas fa-file-download ml-2"></i>${t(e("module.ppe.excel.downloadTemplateBtn","\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                        </button>
                        <p class="text-sm text-blue-800 mb-2">${t(e("module.ppe.excel.importModalColumns","\u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u0629 \u0641\u064A \u0627\u0644\u0635\u0641 \u0627\u0644\u0623\u0648\u0644:"))}</p>
                        <ul class="text-sm text-blue-800 list-disc mr-6 space-y-1">${a}</ul>
                    </div>
                    <div>
                        <label for="ppe-receipts-modal-file" class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-file-excel ml-2"></i>${t(e("module.ppe.excel.chooseExcelFile","\u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx \u0623\u0648 .xls)"))}
                        </label>
                        <input type="file" id="ppe-receipts-modal-file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" class="form-input">
                    </div>
                    <div id="ppe-receipts-import-preview" class="hidden">
                        <h3 class="text-sm font-semibold text-gray-800 mb-2">${t(e("module.ppe.excel.previewTitle","\u0645\u0639\u0627\u064A\u0646\u0629 (\u0623\u0648\u0644 5 \u0635\u0641\u0648\u0641 \u0628\u064A\u0627\u0646\u0627\u062A):"))}</h3>
                        <div class="max-h-60 overflow-auto border rounded bg-white">
                            <table class="data-table text-xs">
                                <thead id="ppe-receipts-preview-head"></thead>
                                <tbody id="ppe-receipts-preview-body"></tbody>
                            </table>
                        </div>
                        <p id="ppe-receipts-preview-count" class="text-sm text-gray-600 mt-2"></p>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-2">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t(e("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button type="button" id="ppe-receipts-import-confirm" class="btn-primary" disabled>
                        <i class="fas fa-check ml-2"></i>${t(e("module.ppe.excel.confirmImport","\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"))}
                    </button>
                </div>
            </div>`,document.body.appendChild(o),this.applyModuleI18n(o);const l=o.querySelector("#ppe-receipts-modal-file"),n=o.querySelector("#ppe-receipts-modal-download-template"),c=o.querySelector("#ppe-receipts-import-preview"),r=o.querySelector("#ppe-receipts-preview-head"),i=o.querySelector("#ppe-receipts-preview-body"),p=o.querySelector("#ppe-receipts-preview-count"),y=o.querySelector("#ppe-receipts-import-confirm");let h=null;n&&(n.onclick=()=>this.downloadReceiptsExcelTemplate()),l.addEventListener("change",async d=>{const f=d.target.files&&d.target.files[0];if(h=f||null,y.disabled=!h,!f){c.classList.add("hidden");return}try{const v=await f.arrayBuffer(),u=XLSX.read(v,{type:"array",cellDates:!0}),m=XLSX.utils.sheet_to_json(u.Sheets[u.SheetNames[0]],{header:1,defval:"",raw:!1});if(!m||m.length<2){c.classList.add("hidden"),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const x=(m[0]||[]).map(E=>String(E||"").trim());r.innerHTML=`<tr>${x.map(E=>`<th>${t(E)}</th>`).join("")}</tr>`,i.innerHTML=m.slice(1,6).map(E=>`<tr>${x.map((N,C)=>`<td>${t(String(E[C]??""))}</td>`).join("")}</tr>`).join("");const w=Math.max(0,m.length-1);p.textContent=`${this._t("module.ppe.excel.previewRowCount","\u0639\u062F\u062F \u0635\u0641\u0648\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}: ${w}`,c.classList.remove("hidden")}catch(v){Utils.safeError("ppe receipts import preview",v),c.classList.add("hidden"),Notification.error(this._t("module.ppe.excel.previewErr","\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629"))}}),y.addEventListener("click",async()=>{h&&(o.remove(),await this.importReceiptsExcel(h))}),o.addEventListener("click",d=>{d.target===o&&o.remove()})},showPpeStockImportModal(){if(!this._isPpeAdminUser())return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}try{document.getElementById("ppe-stock-import-modal")?.remove()}catch{}const e=(d,f)=>this._t(d,f),t=d=>Utils.escapeHTML(d),a=this._ppeStockExcelFieldDefs().filter(d=>!["stock_IN","stock_OUT","balance"].includes(d.key)).map(d=>`<li><strong>${t(d.ar)}</strong> \u2014 <span class="font-mono text-xs">${t(d.en)}</span></li>`).join(""),o=document.createElement("div");o.className="modal-overlay",o.id="ppe-stock-import-modal",o.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2 text-green-600"></i>${t(e("module.ppe.excel.importModalStockTitle","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 Excel"))}</h2>
                    <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="${t(e("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p class="text-sm text-blue-900 font-semibold mb-2"><i class="fas fa-info-circle ml-2"></i>${t(e("module.ppe.excel.importStockIntro","\u062D\u0645\u0651\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u062B\u0645 \u0639\u0628\u0651\u0626 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0641\u0642\u0637. \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 (\u0643\u0648\u062F \u0623\u0648 \u0627\u0633\u0645 \u0623\u0648 \u0645\u0639\u0631\u0641) \u0644\u0646 \u062A\u064F\u0633\u062A\u0628\u062F\u0644 \u0648\u062A\u064F\u0639\u0631\u064E\u0636 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A."))}</p>
                        <button type="button" id="ppe-stock-modal-download-template" class="btn-secondary btn-sm mb-3">
                            <i class="fas fa-file-download ml-2"></i>${t(e("module.ppe.excel.downloadTemplateBtn","\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                        </button>
                        <p class="text-sm text-blue-800 mb-2">${t(e("module.ppe.excel.importModalColumnsStock","\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0642\u0627\u0644\u0628 (\u0635\u0641 \u0627\u0644\u0631\u0624\u0648\u0633):"))}</p>
                        <ul class="text-sm text-blue-800 list-disc mr-6 space-y-1">${a}</ul>
                    </div>
                    <div>
                        <label for="ppe-stock-modal-file" class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-file-excel ml-2"></i>${t(e("module.ppe.excel.chooseExcelFile","\u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx \u0623\u0648 .xls)"))}
                        </label>
                        <input type="file" id="ppe-stock-modal-file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" class="form-input">
                    </div>
                    <div id="ppe-stock-import-preview" class="hidden">
                        <h3 class="text-sm font-semibold text-gray-800 mb-2">${t(e("module.ppe.excel.previewTitle","\u0645\u0639\u0627\u064A\u0646\u0629 (\u0623\u0648\u0644 5 \u0635\u0641\u0648\u0641 \u0628\u064A\u0627\u0646\u0627\u062A):"))}</h3>
                        <div class="max-h-60 overflow-auto border rounded bg-white">
                            <table class="data-table text-xs">
                                <thead id="ppe-stock-preview-head"></thead>
                                <tbody id="ppe-stock-preview-body"></tbody>
                            </table>
                        </div>
                        <p id="ppe-stock-preview-count" class="text-sm text-gray-600 mt-2"></p>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-2">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t(e("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button type="button" id="ppe-stock-import-confirm" class="btn-primary" disabled>
                        <i class="fas fa-check ml-2"></i>${t(e("module.ppe.excel.confirmImport","\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"))}
                    </button>
                </div>
            </div>`,document.body.appendChild(o),this.applyModuleI18n(o);const l=o.querySelector("#ppe-stock-modal-file"),n=o.querySelector("#ppe-stock-modal-download-template"),c=o.querySelector("#ppe-stock-import-preview"),r=o.querySelector("#ppe-stock-preview-head"),i=o.querySelector("#ppe-stock-preview-body"),p=o.querySelector("#ppe-stock-preview-count"),y=o.querySelector("#ppe-stock-import-confirm");let h=null;n&&(n.onclick=()=>this.downloadStockExcelTemplate()),l.addEventListener("change",async d=>{const f=d.target.files&&d.target.files[0];if(h=f||null,y.disabled=!h,!f){c.classList.add("hidden");return}try{const v=await f.arrayBuffer(),u=XLSX.read(v,{type:"array",cellDates:!0}),m=XLSX.utils.sheet_to_json(u.Sheets[u.SheetNames[0]],{header:1,defval:"",raw:!1});if(!m||m.length<2){c.classList.add("hidden"),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const x=(m[0]||[]).map(E=>String(E||"").trim());r.innerHTML=`<tr>${x.map(E=>`<th>${t(E)}</th>`).join("")}</tr>`,i.innerHTML=m.slice(1,6).map(E=>`<tr>${x.map((N,C)=>`<td>${t(String(E[C]??""))}</td>`).join("")}</tr>`).join("");const w=Math.max(0,m.length-1);p.textContent=`${this._t("module.ppe.excel.previewRowCount","\u0639\u062F\u062F \u0635\u0641\u0648\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}: ${w}`,c.classList.remove("hidden")}catch(v){Utils.safeError("ppe stock import preview",v),c.classList.add("hidden"),Notification.error(this._t("module.ppe.excel.previewErr","\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629"))}}),y.addEventListener("click",async()=>{h&&(o.remove(),await this.importStockExcel(h))}),o.addEventListener("click",d=>{d.target===o&&o.remove()})},_bindPpeReceiptExcelToolbar(){const e=document.getElementById("ppe-receipts-export-excel-btn"),t=document.getElementById("ppe-receipts-template-btn"),s=document.getElementById("ppe-receipts-import-btn");e&&(e.onclick=()=>this.exportReceiptsExcel()),t&&(t.onclick=()=>this.downloadReceiptsExcelTemplate()),s&&(s.onclick=()=>this.showPpeReceiptsImportModal())},_bindPpeStockExcelToolbar(){const e=document.getElementById("ppe-stock-export-excel-btn"),t=document.getElementById("ppe-stock-template-btn"),s=document.getElementById("ppe-stock-import-btn");e&&(e.onclick=()=>this.exportStockExcel()),t&&(t.onclick=()=>this.downloadStockExcelTemplate()),s&&(s.onclick=()=>this.showPpeStockImportModal())},async exportPPEMatrix(){try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const e=AppState.appData.employeePPEMatrix||{},t=AppState.appData.employees||[],s=Object.keys(e).map(l=>{const n=e[l],c=t.filter(r=>r.position===l);return{\u0627\u0644\u0648\u0638\u064A\u0629:l,"\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u064A\u0646":c.length,"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629":n.requiredPPE?n.requiredPPE.join(", "):""}}),a=XLSX.utils.json_to_sheet(s),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,a,"\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"),XLSX.writeFile(o,"\u0645\u0635\u0648\u0629_\u0645\u0647\u0645\u0627\u062A_\u0627\u0644\u0648\u0642\u0627\u064A\u0629_"+new Date().toISOString().slice(0,10)+".xlsx"),Loading.hide(),Notification.success(this._t("module.ppe.notify.matrixExportOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"))}catch(e){Loading.hide(),Notification.error(this._t("module.ppe.notify.matrixExportErr","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+e.message)}},buildStockControlTabHtmlSync(e,t=""){const s=Array.isArray(e)?e:[],a=s.filter(l=>{if(!l)return!1;const n=parseFloat(l.balance||0),c=parseFloat(l.minThreshold||0);return n<c});return`
            <div class="space-y-6" id="ppe-stock-tab-root">
                ${t?`<div id="ppe-stock-hint-slot" class="mb-4">${t}</div>`:""}
                ${this.renderStockDashboard(s,a)}
                ${this.renderStockTable(s)}
            </div>
        `},async renderStockControlTab(){try{const e=await this.loadStockItems(),t=this.state.stockStaleWarningMsg?`<div role="status" class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex items-start gap-2">
                    <i class="fas fa-info-circle mt-0.5 text-amber-600"></i>
                    <span>${Utils.escapeHTML(this.state.stockStaleWarningMsg)}</span>
                   </div>`:"";this.state.stockStaleWarningMsg="";const s=this.state.stockLoadHardErrorMsg;if(this.state.stockLoadHardErrorMsg="",!Array.isArray(e))return Utils.safeWarn("\u26A0\uFE0F stockItems \u0644\u064A\u0633\u062A \u0645\u0635\u0641\u0648\u0641\u0629:",e),`
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                        <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadStockError","\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</p>
                        <button onclick="PPE.switchTab('stock-control')" class="btn-primary">
                            <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                        </button>
                    </div>
                `;if(e.length===0&&s)return`
                    <div class="empty-state">
                        <i class="fas fa-plug text-amber-600 text-4xl mb-4"></i>
                        <p class="text-gray-700 mb-2 font-semibold">${Utils.escapeHTML(s)}</p>
                        <p class="text-gray-500 text-sm mb-4">${Utils.escapeHTML(this._t("module.ppe.stock.hardErrorHint","\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629."))}</p>
                        <button onclick="PPE.switchTab('stock-control')" class="btn-primary">
                            <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                        </button>
                    </div>
                `;const a=e.filter(o=>{if(!o)return!1;const l=parseFloat(o.balance||0),n=parseFloat(o.minThreshold||0);return l<n});return`
            <div class="space-y-6">
                ${t}
                ${this.renderStockDashboard(e,a)}
                ${this.renderStockTable(e)}
            </div>
        `}catch(e){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A renderStockControlTab:",e),`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.stockErrorTab","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}: ${Utils.escapeHTML(String(e.message||e))}</p>
                    <button onclick="PPE.switchTab('stock-control')" class="btn-primary">
                        <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                    </button>
                </div>
            `}},renderStockDashboard(e,t){const s=(r,i)=>this._t(r,i),a=r=>Utils.escapeHTML(r),o=e.length,l=e.reduce((r,i)=>r+parseFloat(i.balance||0),0),n=e.reduce((r,i)=>r+parseFloat(i.stock_IN||0),0),c=e.reduce((r,i)=>r+parseFloat(i.stock_OUT||0),0);return`
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600">${a(s("module.ppe.stock.dashboard.totalItems","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0635\u0646\u0627\u0641"))}</p>
                            <p class="text-2xl font-bold text-gray-800">${o}</p>
                        </div>
                        <div class="text-3xl text-blue-500">
                            <i class="fas fa-boxes"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600">${a(s("module.ppe.stock.dashboard.totalBalance","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0635\u064A\u062F"))}</p>
                            <p class="text-2xl font-bold text-gray-800">${l.toFixed(0)}</p>
                        </div>
                        <div class="text-3xl text-green-500">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600">${a(s("module.ppe.stock.dashboard.totalIn","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0627\u0631\u062F"))}</p>
                            <p class="text-2xl font-bold text-gray-800">${n.toFixed(0)}</p>
                        </div>
                        <div class="text-3xl text-yellow-500">
                            <i class="fas fa-arrow-down"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600">${a(s("module.ppe.stock.dashboard.totalOut","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641"))}</p>
                            <p class="text-2xl font-bold text-gray-800">${c.toFixed(0)}</p>
                        </div>
                        <div class="text-3xl text-red-500">
                            <i class="fas fa-arrow-up"></i>
                        </div>
                    </div>
                </div>
            </div>
            ${t.length>0?`
                <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-red-500 text-2xl ml-3"></i>
                        <div>
                            <h3 class="font-bold text-red-800">${a(s("module.ppe.stock.lowTitle","\u062A\u062D\u0630\u064A\u0631: \u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636"))}</h3>
                            <p class="text-sm text-red-700 mt-1">${t.length} ${a(s("module.ppe.stock.lowDesc","\u0635\u0646\u0641/\u0623\u0635\u0646\u0627\u0641 \u062A\u062D\u062A \u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628"))}</p>
                        </div>
                    </div>
                    <div class="mt-3 flex flex-wrap gap-2">
                        ${t.slice(0,5).map(r=>`
                            <span class="badge badge-warning">
                                ${Utils.escapeHTML(r.itemName||r.itemCode)} (${parseFloat(r.balance||0).toFixed(0)})
                            </span>
                        `).join("")}
                    </div>
                </div>
            `:""}
        `},renderStockTable(e){const t=(r,i)=>this._t(r,i),s=r=>Utils.escapeHTML(r),a=Array.isArray(e)?e:[],o=this._buildExcelToolbarHtml("stock");if(a.length===0)return`
                <div id="ppe-stock-table-card" class="content-card">
                    <div class="card-body">
                        ${o}
                        <div class="empty-state">
                            <i class="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">${s(t("module.ppe.empty.noStock","\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</p>
                            <button onclick="PPE.showStockItemForm()" class="btn-primary mt-4">
                                <i class="fas fa-plus ml-2"></i>${s(t("module.ppe.btn.addStockItem","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}
                            </button>
                        </div>
                    </div>
                </div>
            `;const l=this.buildStockFilterRow(a),n=this.getFilteredStockItems(a),c=this.hasActiveStockFilters();return n.length===0&&c?`
                <div id="ppe-stock-table-card" class="content-card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-list ml-2"></i>${s(t("module.ppe.stock.tableTitle","\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</h3>
                    </div>
                    <div class="card-body">
                        ${o}
                        ${l}
                        <div class="empty-state">
                            <i class="fas fa-filter text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500 mb-2">${s(t("module.ppe.filter.noMatch","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629"))}</p>
                            <button type="button" id="ppe-stock-clear-empty-filters" class="btn-secondary mt-2">
                                <i class="fas fa-undo-alt ml-2"></i>${s(t("module.ppe.filter.clearEmpty","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                            </button>
                        </div>
                    </div>
                </div>
            `:`
            <div id="ppe-stock-table-card" class="content-card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-list ml-2"></i>${s(t("module.ppe.stock.tableTitle","\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</h3>
                </div>
                <div class="card-body">
                    ${o}
                    ${l}
                    <div class="table-wrapper" style="overflow-x: auto;">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>${s(t("module.ppe.stock.itemCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641"))}</th>
                                    <th>${s(t("module.ppe.stock.itemName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641"))}</th>
                                    <th>${s(t("module.ppe.stock.category","\u0627\u0644\u0641\u0626\u0629"))}</th>
                                    <th>${s(t("module.ppe.stock.in","\u0627\u0644\u0648\u0627\u0631\u062F"))}</th>
                                    <th>${s(t("module.ppe.stock.out","\u0627\u0644\u0645\u0646\u0635\u0631\u0641"))}</th>
                                    <th>${s(t("module.ppe.stock.balance","\u0627\u0644\u0631\u0635\u064A\u062F"))}</th>
                                    <th>${s(t("module.ppe.stock.reorder","\u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628"))}</th>
                                    <th>${s(t("module.ppe.stock.supplier","\u0627\u0644\u0645\u0648\u0631\u062F"))}</th>
                                    <th>${s(t("module.ppe.table.lastUpdate","\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B"))}</th>
                                    <th>${s(t("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}</th>
                                    <th>${s(t("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${n.map(r=>{const i=parseFloat(r.balance||0),p=parseFloat(r.minThreshold||0),y=i<p;return`
                                        <tr class="${y?"bg-red-50":""}" data-item-id="${r.itemId||""}">
                                            <td class="font-mono font-semibold">${Utils.escapeHTML(r.itemCode||"")}</td>
                                            <td>${Utils.escapeHTML(r.itemName||"")}</td>
                                            <td>${Utils.escapeHTML(r.category||"")}</td>
                                            <td>${parseFloat(r.stock_IN||0).toFixed(0)}</td>
                                            <td>${parseFloat(r.stock_OUT||0).toFixed(0)}</td>
                                            <td class="font-bold ${y?"text-red-600":"text-green-600"}">
                                                ${i.toFixed(0)}
                                            </td>
                                            <td>${p.toFixed(0)}</td>
                                            <td>${Utils.escapeHTML(r.supplier||"")}</td>
                                            <td>${r.lastUpdate?Utils.formatDate(r.lastUpdate):"-"}</td>
                                            <td>
                                                ${y?`
                                                    <span class="badge badge-warning">
                                                        <i class="fas fa-exclamation-triangle ml-1"></i>
                                                        ${s(t("module.ppe.status.lowStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636"))}
                                                    </span>
                                                `:`
                                                    <span class="badge badge-success">${s(t("module.ppe.status.available","\u0645\u062A\u0648\u0641\u0631"))}</span>
                                                `}
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button onclick="PPE.showStockItemForm('${r.itemId}')" class="btn-icon btn-icon-primary" title="${s(t("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button onclick="PPE.showStockTransactions('${r.itemId}')" class="btn-icon btn-icon-info" title="${s(t("module.ppe.btn.transactions","\u0627\u0644\u062D\u0631\u0643\u0627\u062A"))}">
                                                        <i class="fas fa-list"></i>
                                                    </button>
                                                    <button onclick="PPE.showTransactionForm('${r.itemId}')" class="btn-icon btn-icon-success" title="${s(t("module.ppe.btn.addMovement","\u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629"))}">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                    <button onclick="PPE.deleteStockItem('${r.itemId}')" class="btn-icon btn-icon-danger" title="${s(t("module.ppe.btn.deleteItem","\u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641"))}">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `}).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `},_getCurrentStockItems(){return this.state.stockItemsCache&&Array.isArray(this.state.stockItemsCache)&&this.state.stockItemsCache.length?this.state.stockItemsCache:Array.isArray(AppState.appData.ppeStock)?AppState.appData.ppeStock:[]},refreshStockListUI(){const e=document.getElementById("ppe-stock-table-card");if(!e)return;const t=this._getCurrentStockItems(),s=this.renderStockTable(t),a=document.createElement("div");a.innerHTML=s.trim();const o=a.firstElementChild;o&&(e.replaceWith(o),this.applyModuleI18n(o),this.bindStockFilters())},_stockFilterTimer:null,bindStockFilters(){if(this.state.activeTab!=="stock-control")return;this.state.filters||(this.state.filters={}),this.state.filters.stock||this.resetStockFilters();const e=i=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(i):setTimeout(i,0)},t=document.getElementById("ppe-stock-search");t&&t.addEventListener("input",i=>{this.state.filters.stock.search=i.target&&i.target.value||"",clearTimeout(this._stockFilterTimer),this._stockFilterTimer=setTimeout(()=>e(()=>this.refreshStockListUI()),220)});const s=document.getElementById("ppe-stock-filter-category");s&&s.addEventListener("change",i=>{this.state.filters.stock.category=i.target&&i.target.value||"",this.refreshStockListUI()});const a=document.getElementById("ppe-stock-filter-supplier");a&&a.addEventListener("change",i=>{this.state.filters.stock.supplier=i.target&&i.target.value||"",this.refreshStockListUI()});const o=document.getElementById("ppe-stock-filter-status");o&&o.addEventListener("change",i=>{this.state.filters.stock.status=i.target&&i.target.value||"",this.refreshStockListUI()});const l=document.getElementById("ppe-stock-date-from");l&&l.addEventListener("change",i=>{this.state.filters.stock.dateFrom=i.target&&i.target.value||"",this.refreshStockListUI()});const n=document.getElementById("ppe-stock-date-to");n&&n.addEventListener("change",i=>{this.state.filters.stock.dateTo=i.target&&i.target.value||"",this.refreshStockListUI()});const c=document.getElementById("ppe-stock-reset-filters");c&&c.addEventListener("click",()=>{this.resetStockFilters(),this.refreshStockListUI()});const r=document.getElementById("ppe-stock-clear-empty-filters");r&&r.addEventListener("click",()=>{this.resetStockFilters(),this.refreshStockListUI()})},async _fetchPPEStockRpcOnce(e){const t=GoogleIntegration.sendToAppsScript("getAllPPEStockItems",{filters:{}}),s=new Promise((a,o)=>setTimeout(()=>o(new Error(this._t("module.ppe.stock.timeoutRpc","\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u062E\u0627\u062F\u0645 \u0639\u0646\u062F \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646."))),e));return Promise.race([t,s])},_localStockFallbackArrays(){const e=this.state.stockItemsCache,t=Array.isArray(AppState.appData.ppeStock)?AppState.appData.ppeStock:[];return e&&e.length>0?e:t.length>0?t:[]},async loadStockItems(e=!1){try{const t=Date.now(),s=this.state.stockItemsCache&&this.state.stockItemsCacheTime&&t-this.state.stockItemsCacheTime<this.state.stockCacheExpiry;return!e&&s?(Utils.safeLog("\u2705 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 Cache"),this.state.stockItemsCache&&!AppState.appData.ppeStock&&(AppState.appData.ppeStock=this.state.stockItemsCache),this.state.stockItemsCache):this._stockLoadInflightPromise?(Utils.safeLog("\u23F3 \u0637\u0644\u0628 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u2014 \u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0640 Promise"),this._stockLoadInflightPromise):(this._stockLoadInflightPromise=(async()=>{try{return await this._loadStockItemsInternal(e)}finally{this._stockLoadInflightPromise=null}})(),this._stockLoadInflightPromise)}catch(t){return this._stockLoadInflightPromise=null,Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A loadStockItems wrapper:",t),[]}},async _loadStockItemsInternal(e=!1){try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){this.state.stockLoadHardErrorMsg="";try{let a=null,o=null;for(let r=0;r<2;r++)try{r>0&&await new Promise(i=>setTimeout(i,700)),a=await this._fetchPPEStockRpcOnce(3e4),o=null;break}catch(i){o=i,a=null}if(a&&a.success){const r=Array.isArray(a.data)?a.data:[];return AppState.appData.ppeStock||(AppState.appData.ppeStock=[]),AppState.appData.ppeStock=r,this.state.stockItemsCache=r,this.state.stockItemsCacheTime=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),r}const l=a&&a.message?String(a.message):"",n=this._localStockFallbackArrays();if(n.length>0)return this.state.stockStaleWarningMsg=l||this._t("module.ppe.stock.staleDataNotice","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u064A\u064F\u0639\u0631\u0636 \u0622\u062E\u0631 \u0645\u062E\u0632\u0651\u0646 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u064F\u0633\u062A\u062D\u0633\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644."),o?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0645\u062D\u0627\u0648\u0644\u0629\u060C \u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0634:",o):l&&Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0627\u062F\u0645 \u0631\u0641\u0636 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u060C \u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0634:",l),n;let c=l||o&&o.message||this._t("module.ppe.stock.loadFailedUnknown","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646.");return/Timeout|مهلة/i.test(c||"")&&(c=this._t("module.ppe.stock.loadFailedTimeout","\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0639\u0646\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0634\u0628\u0643\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B.")),this.state.stockLoadHardErrorMsg=c,Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0645\u062E\u0632\u0648\u0646\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0648\u0641\u0634\u0644 \u0627\u0644\u062C\u0644\u0628 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",c),[]}catch(a){const o=this._localStockFallbackArrays();return o.length>0?(this.state.stockStaleWarningMsg=this._t("module.ppe.stock.staleDataNotice","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u064A\u064F\u0639\u0631\u0636 \u0622\u062E\u0631 \u0645\u062E\u0632\u0651\u0646 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u064F\u0633\u062A\u062D\u0633\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644."),Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u060C \u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0634:",a),o):(this.state.stockLoadHardErrorMsg=String(a&&a.message?a.message:a),[])}}return this.state.stockItemsCache?(AppState.appData.ppeStock||(AppState.appData.ppeStock=this.state.stockItemsCache),this.state.stockItemsCache):AppState.appData.ppeStock||[]}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646:",t);const s=this._localStockFallbackArrays();return s.length>0?(this.state.stockStaleWarningMsg=this._t("module.ppe.stock.staleDataNotice","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u064A\u064F\u0639\u0631\u0636 \u0622\u062E\u0631 \u0645\u062E\u0632\u0651\u0646 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u064F\u0633\u062A\u062D\u0633\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644."),s):(this.state.stockLoadHardErrorMsg=String(t&&t.message?t.message:t),[])}},async showStockItemForm(e=null){const t=!!e;let s=null;t&&(s=(await this.loadStockItems()).find(r=>r.itemId===e));const a=(c,r)=>this._t(c,r),o=c=>Utils.escapeHTML(c),l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${o(t?a("module.ppe.title.stockItemEdit","\u062A\u0639\u062F\u064A\u0644 \u0635\u0646\u0641"):a("module.ppe.title.stockItemAdd","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="stock-item-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${o(a("module.ppe.stock.itemCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641"))} *</label>
                                <input type="text" id="stock-item-code" required class="form-input"
                                    value="${Utils.escapeHTML(s?.itemCode||"")}"
                                    placeholder="${o(a("module.ppe.placeholder.itemCode",""))}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${o(a("module.ppe.stock.itemName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641"))} *</label>
                                <input type="text" id="stock-item-name" required class="form-input"
                                    value="${Utils.escapeHTML(s?.itemName||"")}"
                                    placeholder="${o(a("module.ppe.placeholder.itemName",""))}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${o(a("module.ppe.label.category","\u0627\u0644\u0641\u0626\u0629"))}</label>
                                <input type="text" id="stock-item-category" class="form-input"
                                    value="${Utils.escapeHTML(s?.category||"")}"
                                    placeholder="${o(a("module.ppe.stock.category","\u0627\u0644\u0641\u0626\u0629"))}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${o(a("module.ppe.label.minThreshold","\u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628 *"))}</label>
                                <input type="number" id="stock-item-min-threshold" required class="form-input" min="0"
                                    value="${s?.minThreshold||0}"
                                    placeholder="${o(a("module.ppe.stock.reorder",""))}">
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${o(a("module.ppe.label.supplier","\u0627\u0644\u0645\u0648\u0631\u062F"))}</label>
                                <input type="text" id="stock-item-supplier" class="form-input"
                                    value="${Utils.escapeHTML(s?.supplier||"")}"
                                    placeholder="${o(a("module.ppe.label.supplier",""))}">
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${o(a("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${o(t?a("module.common.saveChanges","\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A"):a("module.ppe.btn.addItem","\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0635\u0646\u0641"))}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(l),this.applyModuleI18n(l),l.querySelector("#stock-item-form").addEventListener("submit",async c=>{c.preventDefault(),Loading.show();try{const r=document.getElementById("stock-item-code"),i=document.getElementById("stock-item-name"),p=document.getElementById("stock-item-category"),y=document.getElementById("stock-item-min-threshold"),h=document.getElementById("stock-item-supplier");if(!r||!i||!p||!y||!h){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.fieldsMissing","\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."));return}const d=r.value.trim(),f=i.value.trim();if(d&&(await this.loadStockItems()).find(x=>(t?x.itemId!==s.itemId:!0)&&x.itemCode&&String(x.itemCode).trim().toLowerCase()===d.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0643\u0648\u062F \u0622\u062E\u0631.")),r.focus(),r.style.borderColor="#ef4444";return}if(f&&(await this.loadStockItems()).find(x=>(t?x.itemId!==s.itemId:!0)&&x.itemName&&String(x.itemName).trim().toLowerCase()===f.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0633\u0645 \u0622\u062E\u0631.")),i.focus(),i.style.borderColor="#ef4444";return}const v={itemId:s?.itemId||Utils.generateId("STOCK"),itemCode:d,itemName:i.value.trim(),category:p.value.trim(),minThreshold:parseFloat(y.value)||0,supplier:h.value.trim(),stock_IN:s?.stock_IN||0,stock_OUT:s?.stock_OUT||0,balance:s?.balance||0,lastUpdate:new Date().toISOString(),createdAt:s?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const u=await GoogleIntegration.sendToAppsScript("addOrUpdatePPEStockItem",v);if(u&&u.success){this.clearCache(),l.remove(),Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629"} \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D`),this.refreshActiveTab();return}else{const m=u?.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0635\u0646\u0641";Notification.error(m),m.includes("\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F")?(r.style.borderColor="#ef4444",r.focus()):m.includes("\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F")&&(i.style.borderColor="#ef4444",i.focus())}}else{if(AppState.appData.ppeStock||(AppState.appData.ppeStock=[]),t){const u=AppState.appData.ppeStock.findIndex(m=>m.itemId===s.itemId);if(u!==-1){if(d&&AppState.appData.ppeStock.find((x,w)=>w!==u&&x.itemCode&&String(x.itemCode).trim().toLowerCase()===d.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0643\u0648\u062F \u0622\u062E\u0631.")),r.focus(),r.style.borderColor="#ef4444";return}if(f&&AppState.appData.ppeStock.find((x,w)=>w!==u&&x.itemName&&String(x.itemName).trim().toLowerCase()===f.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0633\u0645 \u0622\u062E\u0631.")),i.focus(),i.style.borderColor="#ef4444";return}AppState.appData.ppeStock[u]=v}}else{if(d&&AppState.appData.ppeStock.find(m=>m.itemCode&&String(m.itemCode).trim().toLowerCase()===d.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0643\u0648\u062F \u0622\u062E\u0631.")),r.focus(),r.style.borderColor="#ef4444";return}if(f&&AppState.appData.ppeStock.find(m=>m.itemName&&String(m.itemName).trim().toLowerCase()===f.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0633\u0645 \u0622\u062E\u0631.")),i.focus(),i.style.borderColor="#ef4444";return}AppState.appData.ppeStock.push(v)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.clearCache(),l.remove(),Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629"} \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D`),this.refreshActiveTab();return}}catch(r){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+r.message)}finally{Loading.hide()}}),l.addEventListener("click",c=>{c.target===l&&l.remove()})},async showTransactionForm(e=null){const t=await this.loadStockItems(),s=e?t.find(l=>l.itemId===e):null,a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629 (\u0648\u0627\u0631\u062F/\u0645\u0646\u0635\u0631\u0641)</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="transaction-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0635\u0646\u0641 *</label>
                            <select id="transaction-item-id" required class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641</option>
                                ${t.map(l=>`
                                    <option value="${l.itemId}" ${s&&s.itemId===l.itemId?"selected":""}>
                                        ${Utils.escapeHTML(l.itemCode||"")} - ${Utils.escapeHTML(l.itemName||"")}
                                    </option>
                                `).join("")}
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629 *</label>
                                <select id="transaction-action" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                    <option value="IN">\u0648\u0627\u0631\u062F</option>
                                    <option value="OUT">\u0645\u0646\u0635\u0631\u0641</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0645\u064A\u0629 *</label>
                                <input type="number" id="transaction-quantity" required class="form-input" min="1"
                                    placeholder="\u0627\u0644\u0643\u0645\u064A\u0629">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                                <input type="date" id="transaction-date" required class="form-input"
                                    value="${new Date().toISOString().slice(0,10)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0635\u0631\u0641 \u0625\u0644\u0649</label>
                                <input type="text" id="transaction-issued-to" class="form-input"
                                    placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0644\u0645 (\u0644\u0644\u0645\u0646\u0635\u0631\u0641)">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                            <textarea id="transaction-remarks" class="form-input" rows="3"
                                placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629"></textarea>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u062D\u0631\u0643\u0629
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(a),a.querySelector("#transaction-form").addEventListener("submit",async l=>{l.preventDefault(),Loading.show();try{const n=document.getElementById("transaction-item-id"),c=document.getElementById("transaction-action"),r=document.getElementById("transaction-quantity"),i=document.getElementById("transaction-date"),p=document.getElementById("transaction-issued-to"),y=document.getElementById("transaction-remarks");if(!n||!c||!r||!i||!p||!y){Loading.hide(),Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const h={itemId:n.value,action:c.value,quantity:parseFloat(r.value)||0,date:new Date(i.value).toISOString(),issuedTo:p.value.trim(),remarks:y.value.trim(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const d=await GoogleIntegration.sendToAppsScript("addPPETransaction",h);if(d&&d.success){this.clearCache(),a.remove(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshActiveTab();return}else Notification.error(d?.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0631\u0643\u0629")}else{h.id=Utils.generateId("TRANS"),AppState.appData.ppeTransactions||(AppState.appData.ppeTransactions=[]),AppState.appData.ppeTransactions.push(h),AppState.appData.ppeStock||(AppState.appData.ppeStock=[]);const d=AppState.appData.ppeStock.find(f=>f.itemId===h.itemId);d&&(h.action==="IN"?d.stock_IN=parseFloat(d.stock_IN||0)+h.quantity:d.stock_OUT=parseFloat(d.stock_OUT||0)+h.quantity,d.balance=parseFloat(d.stock_IN||0)-parseFloat(d.stock_OUT||0),d.lastUpdate=new Date().toISOString()),this.clearCache(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),a.remove(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshActiveTab();return}}catch(n){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+n.message)}finally{Loading.hide()}}),a.addEventListener("click",l=>{l.target===a&&a.remove()})},async showStockTransactions(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}Loading.show();try{let t=[];try{t=await this.loadStockItems(),Array.isArray(t)||(t=[])}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646:",i),t=AppState.appData.ppeStock||[]}const s=t.find(i=>i&&i.itemId===e);if(!s){Loading.hide(),Notification.error("\u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u0645\u064A\u0644\u0647");return}let a=[];if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const i=await GoogleIntegration.sendToAppsScript("getAllPPETransactions",{filters:{itemId:e}});i&&i.success?a=Array.isArray(i.data)?i.data:[]:(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062C\u0644\u0628 \u0627\u0644\u062D\u0631\u0643\u0627\u062A \u0645\u0646 Backend\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"),a=(AppState.appData.ppeTransactions||[]).filter(p=>p&&p.itemId===e))}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0640 Backend\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",i),a=(AppState.appData.ppeTransactions||[]).filter(p=>p&&p.itemId===e)}else a=(AppState.appData.ppeTransactions||[]).filter(i=>i&&i.itemId===e);Array.isArray(a)||(a=[]),Loading.hide();const o=document.createElement("div");o.className="modal-overlay",a.sort((i,p)=>{const y=new Date(i.date||i.createdAt||0);return new Date(p.date||p.createdAt||0)-y});const l=a.filter(i=>i.action==="IN").reduce((i,p)=>i+parseFloat(p.quantity||0),0),n=a.filter(i=>i.action==="OUT").reduce((i,p)=>i+parseFloat(p.quantity||0),0),c=l-n;let r="";a.length===0?r=`
                    <div class="empty-state py-8">
                        <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641</p>
                    </div>
                `:r=`
                    <div class="table-wrapper" style="overflow-x: auto;">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                    <th>\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629</th>
                                    <th>\u0627\u0644\u0643\u0645\u064A\u0629</th>
                                    <th>\u0635\u0627\u062F\u0631 \u0625\u0644\u0649</th>
                                    <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                    <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${a.map(i=>{const p=i.action==="IN"?"\u0648\u0627\u0631\u062F":"\u0645\u0646\u0635\u0631\u0641",y=i.action==="IN"?"badge-success":"badge-warning",h=i.action==="IN"?"fa-arrow-down":"fa-arrow-up";return`
                                        <tr>
                                            <td>${i.date?Utils.formatDate(i.date):"-"}</td>
                                            <td>
                                                <span class="badge ${y}">
                                                    <i class="fas ${h} ml-1"></i>
                                                    ${p}
                                                </span>
                                            </td>
                                            <td class="font-semibold">${parseFloat(i.quantity||0).toFixed(0)}</td>
                                            <td>${Utils.escapeHTML(i.issuedTo||"-")}</td>
                                            <td>${Utils.escapeHTML(i.remarks||"-")}</td>
                                            <td class="text-sm text-gray-500">${i.createdAt?Utils.formatDate(i.createdAt):"-"}</td>
                                        </tr>
                                    `}).join("")}
                            </tbody>
                        </table>
                    </div>
                `,o.innerHTML=`
                <div class="modal-content" style="max-width: 1000px;">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <i class="fas fa-list-alt ml-2"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A - ${Utils.escapeHTML(s.itemName||s.itemCode||"\u0635\u0646\u0641")}
                        </h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0635\u0646\u0641 -->
                        <div class="bg-gray-50 rounded-lg p-4 mb-6">
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641</p>
                                    <p class="font-semibold text-gray-800">${Utils.escapeHTML(s.itemCode||"-")}</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641</p>
                                    <p class="font-semibold text-gray-800">${Utils.escapeHTML(s.itemName||"-")}</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u062D\u0627\u0644\u064A</p>
                                    <p class="font-semibold text-green-600">${parseFloat(s.balance||0).toFixed(0)}</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0643\u0627\u062A</p>
                                    <p class="font-semibold text-gray-800">${a.length}</p>
                                </div>
                            </div>
                        </div>

                        <!-- \u0645\u0644\u062E\u0635 \u0627\u0644\u062D\u0631\u0643\u0627\u062A -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm text-green-700 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0627\u0631\u062F</p>
                                        <p class="text-2xl font-bold text-green-600">${l.toFixed(0)}</p>
                                    </div>
                                    <i class="fas fa-arrow-down text-green-500 text-2xl"></i>
                                </div>
                            </div>
                            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm text-orange-700 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641</p>
                                        <p class="text-2xl font-bold text-orange-600">${n.toFixed(0)}</p>
                                    </div>
                                    <i class="fas fa-arrow-up text-orange-500 text-2xl"></i>
                                </div>
                            </div>
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm text-blue-700 mb-1">\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062D\u0633\u0648\u0628</p>
                                        <p class="text-2xl font-bold text-blue-600">${c.toFixed(0)}</p>
                                    </div>
                                    <i class="fas fa-calculator text-blue-500 text-2xl"></i>
                                </div>
                            </div>
                        </div>

                        <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A -->
                        <div class="mb-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3">
                                <i class="fas fa-table ml-2"></i>
                                \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A
                            </h3>
                            ${r}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times ml-2"></i>
                            \u0625\u063A\u0644\u0627\u0642
                        </button>
                        <button class="btn-primary" onclick="PPE.showTransactionForm('${e}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629 \u062C\u062F\u064A\u062F\u0629
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(o),o.addEventListener("click",i=>{i.target===o&&o.remove()})}catch(t){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A: "+(t.message||t))}},async deleteStockItem(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=(await this.loadStockItems()).find(o=>o&&o.itemId===e);if(!s){Notification.error("\u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const a=`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 "${s.itemName||s.itemCode}"\u061F

\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 \u0625\u0630\u0627 \u0643\u0627\u0646 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u062D\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629.`;if(confirm(a)){Loading.show();try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const o=await GoogleIntegration.sendToAppsScript("deletePPEStockItem",{itemId:e});o&&o.success?(this.state.stockItemsCache=null,this.state.stockItemsCacheTime=null,Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D"),await this.load()):Notification.error(o?.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641")}else AppState.appData.ppeStock?(AppState.appData.ppeStock=AppState.appData.ppeStock.filter(o=>o.itemId!==e),this.state.stockItemsCache=null,this.state.stockItemsCacheTime=null,Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D"),await this.load()):Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0629 \u0644\u0644\u062D\u0630\u0641")}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641:",o),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641: "+(o.message||o))}finally{Loading.hide()}}},_ppeAnalyticsPeriod:"0",_ppeAnalyticsCharts:{},async renderPpeAnalysisTab(){return this._ppeEnsureChartJS().catch(()=>{}),`
        <div id="ppe-analytics-root" style="font-family:inherit;">

            <!-- \u2550\u2550\u2550 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u2550\u2550\u2550 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#0F766E 0%,#0E7490 50%,#1E3A8A 100%);border-radius:14px;color:#fff;box-shadow:0 8px 28px rgba(15,118,110,0.32);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;backdrop-filter: blur(8px);">
                        <i class="fas fa-hard-hat" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.9;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u2022 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u2022 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u2022 \u0627\u0644\u0641\u0626\u0627\u062A \u2022 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-inline-end:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((e,t)=>{const s=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],a=(this._ppeAnalyticsPeriod||"0")===e;return`<button class="ppe-period-btn" data-period="${e}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${a?"#fff":"rgba(255,255,255,0.15)"};color:${a?"#0F766E":"#fff"};">${s[t]}</button>`}).join("")}
                    </div>
                    <button id="ppe-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="ppe-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-inline-start:2px;">\u25CF</span>
                    </button>
                    <button id="ppe-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.25);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(0,0,0,0.4)'" onmouseout="this.style.background='rgba(0,0,0,0.25)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="ppe-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="\u062A\u062D\u062F\u064A\u062B">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u2550\u2550\u2550 -->
            <div id="ppe-filter-panel" style="display:none;background:#f0fdfa;border:1.5px solid #99f6e4;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#0F766E;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#0F766E;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</span>
                        <span id="ppe-filter-count" style="background:#ccfbf1;color:#115E59;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="ppe-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #99f6e4;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#f0fdfa';this.style.color='#0F766E'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times me-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                    ${[{id:"ppe-af-type",icon:"fas fa-hard-hat",color:"#0F766E",label:"\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"},{id:"ppe-af-dept",icon:"fas fa-building",color:"#f59e0b",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{id:"ppe-af-category",icon:"fas fa-tags",color:"#6366f1",label:"\u0627\u0644\u0641\u0626\u0629"},{id:"ppe-af-status",icon:"fas fa-flag",color:"#0891b2",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{id:"ppe-af-supplier",icon:"fas fa-truck",color:"#8b5cf6",label:"\u0627\u0644\u0645\u0648\u0631\u062F"}].map(e=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                <i class="${e.icon}" style="color:${e.color};margin-inline-end:4px;"></i>${e.label}
                            </label>
                            <select id="${e.id}" style="width:100%;padding:7px 10px;border:1.5px solid #99f6e4;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#0F766E'" onblur="this.style.borderColor='#99f6e4'">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                            </select>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- \u2550\u2550\u2550 KPI Cards \u2550\u2550\u2550 -->
            <div id="ppe-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- \u2550\u2550\u2550 Row 1: \u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629 + \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-hard-hat" style="color:#0F766E;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629 (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="ppe-chart-type"></canvas>
                        <div id="ppe-chart-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-chart-area" style="color:#8b5cf6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="ppe-chart-trend"></canvas>
                        <div id="ppe-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 2: \u0627\u0644\u0625\u062F\u0627\u0631\u0629 + \u0627\u0644\u062D\u0627\u0644\u0629 \u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:260px;">
                        <canvas id="ppe-chart-dept"></canvas>
                        <div id="ppe-chart-dept-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-flag" style="color:#0891b2;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:260px;">
                        <canvas id="ppe-chart-status"></canvas>
                        <div id="ppe-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 3: \u0627\u0644\u0645\u062E\u0632\u0648\u0646 - \u0641\u0626\u0629 + \u0645\u0648\u0631\u062F \u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tags" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:260px;">
                        <canvas id="ppe-chart-category"></canvas>
                        <div id="ppe-chart-category-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062E\u0632\u0648\u0646</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-truck" style="color:#8b5cf6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0631\u062F (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:260px;">
                        <canvas id="ppe-chart-supplier"></canvas>
                        <div id="ppe-chart-supplier-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062E\u0632\u0648\u0646</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 4: \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629 \u2550\u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-column" style="color:#0F766E;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629 \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A (\u0622\u062E\u0631 3 \u0633\u0646\u0648\u0627\u062A)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="ppe-chart-yearly"></canvas>
                    <div id="ppe-chart-yearly-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 \u062C\u062F\u0648\u0644 \u0623\u062D\u062F\u062B \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u2550\u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-list-ul" style="color:#0F766E;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u062D\u062F\u062B \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A</span>
                    </div>
                    <span id="ppe-recent-count" style="background:#f0fdfa;color:#0F766E;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                        <thead>
                            <tr style="background:#f0fdfa;">
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#0F766E;white-space:nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#0F766E;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#0F766E;">\u0627\u0644\u0643\u0648\u062F</th>
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#0F766E;">\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629</th>
                                <th style="padding:9px 12px;text-align:center;font-weight:700;color:#0F766E;">\u0627\u0644\u0643\u0645\u064A\u0629</th>
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#0F766E;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                <th style="padding:9px 12px;text-align:center;font-weight:700;color:#0F766E;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody id="ppe-recent-tbody">
                            <tr><td colspan="7" style="padding:24px;text-align:center;color:#94a3b8;">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `},async _ppeEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{let s=0;const a=setInterval(()=>{typeof Chart<"u"?(clearInterval(a),t(!0)):++s>50&&(clearInterval(a),t(!1))},100)}):new Promise(t=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",s.onload=()=>t(!0),s.onerror=()=>{const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",a.onload=()=>t(!0),a.onerror=()=>t(!1),document.head.appendChild(a)},document.head.appendChild(s)})},_getPpeReceiptsData(){return Array.isArray(AppState?.appData?.ppe)?AppState.appData.ppe:[]},_getPpeStockData(){return Array.isArray(AppState?.appData?.ppeStock)?AppState.appData.ppeStock:[]},_getPpeReceiptDate(e){if(!e)return null;const t=e.receiptDate||e.date||e.createdAt||e.timestamp||null;if(!t)return null;try{const s=new Date(t);return isNaN(s.getTime())?null:s}catch{return null}},_normalizePpeStatus(e){const t=String(e||"").trim().toLowerCase();return t==="\u0645\u0633\u062A\u0644\u0645"||t==="received"||t==="\u0645\u0643\u062A\u0645\u0644"?"received":t==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"||t==="pending"||t==="\u0628\u0627\u0646\u062A\u0638\u0627\u0631"?"pending":"other"},async updatePpeAnalyticsDashboard(){const e=document.getElementById("ppe-analytics-root");if(!e)return;const t=this._getPpeReceiptsData(),s=this._getPpeStockData(),a=parseInt(this._ppeAnalyticsPeriod||"0",10),o=a>0?(()=>{const k=new Date;return k.setDate(k.getDate()-a),k})():null,l=o?t.filter(k=>{const S=this._getPpeReceiptDate(k);return S&&S>=o}):t.slice();this._ppePopulateAnalyticsFilters(l,s);const{receipts:n,stock:c}=this._ppeApplyAnalyticsFilters(l,s),r=n.length,i=document.getElementById("ppe-filter-count");i&&(i.textContent=`${r} \u0627\u0633\u062A\u0644\u0627\u0645`);const p=n.reduce((k,S)=>k+(parseFloat(S.quantity)||0),0),y=n.filter(k=>this._normalizePpeStatus(k.status)==="received").length,h=n.filter(k=>this._normalizePpeStatus(k.status)==="pending").length,d=c.filter(k=>{const S=parseFloat(k.balance||0),j=parseFloat(k.minThreshold||0);return j>0&&S<j}),f=c.length,v=d.length,u=new Set(n.map(k=>k.employeeCode||k.employeeName).filter(Boolean)).size,m=new Date,x=n.filter(k=>{const S=this._getPpeReceiptDate(k);return S&&S.getFullYear()===m.getFullYear()&&S.getMonth()===m.getMonth()}).length,w=new Set(n.map(k=>{const S=this._getPpeReceiptDate(k);return S?`${S.getFullYear()}-${S.getMonth()}`:null}).filter(Boolean)),E=w.size>0?(r/w.size).toFixed(1):"0",N=document.getElementById("ppe-kpi-strip");if(N){const k=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A",value:r,icon:"fas fa-receipt",color:"#0F766E",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0627\u0644\u0645\u064F\u0633\u062A\u0644\u064E\u0645\u0629",value:p.toFixed(0),icon:"fas fa-cubes",color:"#0E7490",bg:"#ecfeff",border:"#a5f3fc"},{label:"\u0645\u0643\u062A\u0645\u0644\u0629 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",value:y,icon:"fas fa-circle-check",color:"#047857",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645",value:h,icon:"fas fa-hourglass-half",color:"#b45309",bg:"#fffbeb",border:"#fde68a"},{label:"\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646",value:f,icon:"fas fa-boxes",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u0646\u062E\u0641\u0636 \u0627\u0644\u0645\u062E\u0632\u0648\u0646",value:v,icon:"fas fa-triangle-exclamation",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646",value:u,icon:"fas fa-users",color:"#7c3aed",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:x,icon:"fas fa-calendar-day",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0634\u0647\u0631\u064A",value:E,icon:"fas fa-calendar-check",color:"#1E3A8A",bg:"#eef2ff",border:"#c7d2fe"}];N.innerHTML=k.map(S=>`
                <div style="background:${S.bg};border:1px solid ${S.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${S.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${S.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${S.color};line-height:1;" dir="ltr">${S.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${S.label}</div>
                    </div>
                </div>`).join("")}if(!await this._ppeEnsureChartJS()||typeof Chart>"u"){e.querySelector(".ppe-chart-load-warning")||e.insertAdjacentHTML("afterbegin",'<div class="ppe-chart-load-warning" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647 \u0645\u062A\u0627\u062D\u0629.</span></div>');return}const q=this._ppeGroupBy(n,k=>String(k.equipmentType||k.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),10);this._ppeHBar("ppe-chart-type",q.labels,q.data,"rgba(15,118,110,0.78)"),this._ppeTrend("ppe-chart-trend",t);const $=this._ppeGroupBy(n,k=>String(k.department||k.dept||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),8);this._ppeHBar("ppe-chart-dept",$.labels,$.data,"rgba(245,158,11,0.78)");const L={received:"\u0645\u0633\u062A\u0644\u0645",pending:"\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645",other:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},U={};n.forEach(k=>{const S=L[this._normalizePpeStatus(k?.status)]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";U[S]=(U[S]||0)+1});const O={\u0645\u0633\u062A\u0644\u0645:"rgba(5,150,105,0.85)","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645":"rgba(245,158,11,0.85)","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":"rgba(148,163,184,0.8)"};this._ppeDoughnut("ppe-chart-status",Object.keys(U),Object.values(U),Object.keys(U).map(k=>O[k]||"rgba(148,163,184,0.8)"));const K=this._ppeGroupBy(c,k=>String(k.category||"\u0628\u062F\u0648\u0646 \u0641\u0626\u0629").trim(),8),ee=["rgba(99,102,241,0.85)","rgba(15,118,110,0.85)","rgba(245,158,11,0.85)","rgba(244,63,94,0.85)","rgba(139,92,246,0.85)","rgba(8,145,178,0.85)","rgba(5,150,105,0.85)","rgba(217,119,6,0.85)"];this._ppeDoughnut("ppe-chart-category",K.labels,K.data,K.labels.map((k,S)=>ee[S%ee.length]));const se=this._ppeGroupBy(c,k=>String(k.supplier||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),8);this._ppeHBar("ppe-chart-supplier",se.labels,se.data,"rgba(139,92,246,0.78)"),this._ppeYearly("ppe-chart-yearly",t);const V=n.slice().sort((k,S)=>{const j=this._getPpeReceiptDate(k),X=this._getPpeReceiptDate(S);return(X?X.getTime():0)-(j?j.getTime():0)}).slice(0,20),ae=document.getElementById("ppe-recent-count");ae&&(ae.textContent=`${V.length} \u0627\u0633\u062A\u0644\u0627\u0645`);const D=document.getElementById("ppe-recent-tbody");if(D){const k=S=>{const j=this._normalizePpeStatus(S),X={received:["\u0645\u0633\u062A\u0644\u0645","#ecfdf5","#047857"],pending:["\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645","#fffbeb","#b45309"],other:["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","#f1f5f9","#475569"]},[J,G,le]=X[j]||X.other;return`<span style="background:${G};color:${le};padding:2px 9px;border-radius:12px;font-size:0.72rem;font-weight:700;">${J}</span>`};D.innerHTML=V.length===0?'<tr><td colspan="7" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629</td></tr>':V.map((S,j)=>{const X=this._getPpeReceiptDate(S),J=X?X.toLocaleDateString("ar-EG",{year:"numeric",month:"short",day:"numeric"}):"\u2014",G=j%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${G};" onmouseover="this.style.background='#f0fdfa'" onmouseout="this.style.background='${G}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;" dir="ltr">${J}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S.employeeName||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;font-family:monospace;" dir="ltr">${Utils.escapeHTML(S.employeeCode||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S.equipmentType||S.type||"\u2014")}</td>
                        <td style="padding:9px 12px;text-align:center;color:#374151;font-weight:700;" dir="ltr">${parseFloat(S.quantity||0).toFixed(0)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S.department||"\u2014")}</td>
                        <td style="padding:9px 12px;text-align:center;">${k(S.status)}</td>
                    </tr>`}).join("")}},_ppePopulateAnalyticsFilters(e,t){const s=(l,n)=>[...new Set(l.map(n).filter(Boolean))].sort(),a=(l,n)=>{const c=document.getElementById(l);if(!c)return;const r=c.value;c.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+n.map(i=>`<option value="${Utils.escapeHTML(String(i))}"${i===r?" selected":""}>${Utils.escapeHTML(String(i))}</option>`).join("")},o=document.getElementById("ppe-af-status");if(o){const l=o.value;o.innerHTML=`<option value="">\u0627\u0644\u0643\u0644</option>
                <option value="received"${l==="received"?" selected":""}>\u0645\u0633\u062A\u0644\u0645</option>
                <option value="pending"${l==="pending"?" selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645</option>`}a("ppe-af-type",s(e,l=>String(l.equipmentType||l.type||"").trim())),a("ppe-af-dept",s(e,l=>String(l.department||l.dept||"").trim())),a("ppe-af-category",s(t,l=>String(l.category||"").trim())),a("ppe-af-supplier",s(t,l=>String(l.supplier||"").trim()))},_ppeApplyAnalyticsFilters(e,t){const s=h=>{const d=document.getElementById(h);return d?d.value.trim():""},a=s("ppe-af-type"),o=s("ppe-af-dept"),l=s("ppe-af-category"),n=s("ppe-af-status"),c=s("ppe-af-supplier"),r=[a,o,l,n,c].some(h=>h!==""),i=document.getElementById("ppe-filter-badge");i&&(i.style.display=r?"inline":"none");const p=e.filter(h=>!(a&&String(h.equipmentType||h.type||"").trim()!==a||o&&String(h.department||h.dept||"").trim()!==o||n&&this._normalizePpeStatus(h?.status)!==n)),y=t.filter(h=>!(l&&String(h.category||"").trim()!==l||c&&String(h.supplier||"").trim()!==c));return{receipts:p,stock:y}},_ppeGroupBy(e,t,s=0){const a={};e.forEach(l=>{const n=t(l)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a[n]=(a[n]||0)+1});let o=Object.entries(a).sort((l,n)=>n[1]-l[1]);return s>0&&(o=o.slice(0,s)),{labels:o.map(l=>l[0]),data:o.map(l=>l[1])}},_ppeDoughnut(e,t,s,a){const o=document.getElementById(e),l=document.getElementById(e+"-empty");if(!o)return;if(!s.length||s.reduce((c,r)=>c+r,0)===0){o.style.display="none",l&&(l.style.display="flex");return}l&&(l.style.display="none"),o.style.display="";try{this._ppeAnalyticsCharts[e]&&this._ppeAnalyticsCharts[e].destroy()}catch{}const n=s.reduce((c,r)=>c+r,0);this._ppeAnalyticsCharts[e]=new Chart(o,{type:"doughnut",data:{labels:t,datasets:[{data:s,backgroundColor:a,borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:c=>` ${c.label}: ${c.parsed} (${n>0?(c.parsed/n*100).toFixed(1):0}%)`}}}}})},_ppeHBar(e,t,s,a){const o=document.getElementById(e),l=document.getElementById(e+"-empty");if(o){if(!s.length||s.reduce((n,c)=>n+c,0)===0){o.style.display="none",l&&(l.style.display="flex");return}l&&(l.style.display="none"),o.style.display="";try{this._ppeAnalyticsCharts[e]&&this._ppeAnalyticsCharts[e].destroy()}catch{}this._ppeAnalyticsCharts[e]=new Chart(o,{type:"bar",data:{labels:t,datasets:[{data:s,backgroundColor:a||"rgba(15,118,110,0.78)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${n.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:n=>String(t[n]).length>18?String(t[n]).slice(0,17)+"\u2026":t[n]}}}}})}},_ppeTrend(e,t){const s=document.getElementById(e),a=document.getElementById(e+"-empty");if(!s)return;const o=new Date,l=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],n=[];for(let i=11;i>=0;i--){const p=new Date(o.getFullYear(),o.getMonth()-i,1);n.push({y:p.getFullYear(),m:p.getMonth(),label:`${l[p.getMonth()]} ${p.getFullYear()}`})}const c=n.map(i=>t.filter(p=>{const y=this._getPpeReceiptDate(p);return y&&y.getFullYear()===i.y&&y.getMonth()===i.m}).length);if(c.reduce((i,p)=>i+p,0)===0){s.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),s.style.display="";try{this._ppeAnalyticsCharts[e]&&this._ppeAnalyticsCharts[e].destroy()}catch{}const r=Math.max(...c);this._ppeAnalyticsCharts[e]=new Chart(s,{type:"bar",data:{labels:n.map(i=>i.label),datasets:[{label:"\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A",data:c,backgroundColor:c.map(i=>i===r?"rgba(15,118,110,0.9)":"rgba(15,118,110,0.5)"),borderRadius:5,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:c,type:"line",borderColor:"rgba(30,58,138,0.9)",backgroundColor:"rgba(30,58,138,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#1E3A8A",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_ppeYearly(e,t){const s=document.getElementById(e),a=document.getElementById(e+"-empty");if(!s)return;const o=new Date().getFullYear(),l=[o-2,o-1,o],n=l.map(r=>t.filter(i=>{const p=this._getPpeReceiptDate(i);return p&&p.getFullYear()===r}).length),c=l.map(r=>t.filter(i=>{const p=this._getPpeReceiptDate(i);return p&&p.getFullYear()===r}).reduce((i,p)=>i+(parseFloat(p.quantity)||0),0));if(n.reduce((r,i)=>r+i,0)===0){s.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),s.style.display="";try{this._ppeAnalyticsCharts[e]&&this._ppeAnalyticsCharts[e].destroy()}catch{}this._ppeAnalyticsCharts[e]=new Chart(s,{type:"bar",data:{labels:l.map(String),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A",data:n,backgroundColor:"rgba(15,118,110,0.78)",borderRadius:5,borderSkipped:!1,yAxisID:"y"},{label:"\u0627\u0644\u0643\u0645\u064A\u0627\u062A",data:c,backgroundColor:"rgba(30,58,138,0.78)",borderRadius:5,borderSkipped:!1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:12}}},y:{beginAtZero:!0,position:"right",ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"},title:{display:!0,text:"\u0639\u062F\u062F",font:{size:10}}},y1:{beginAtZero:!0,position:"left",ticks:{precision:0,font:{size:11}},grid:{display:!1},title:{display:!0,text:"\u0643\u0645\u064A\u0629",font:{size:10}}}}}})},_ppeBindAnalyticsEvents(){const e=document.getElementById("ppe-analytics-root");if(!e)return;e.querySelectorAll(".ppe-period-btn").forEach(n=>{n.addEventListener("click",()=>{this._ppeAnalyticsPeriod=n.getAttribute("data-period"),e.querySelectorAll(".ppe-period-btn").forEach(c=>{const r=c===n;c.style.background=r?"#fff":"rgba(255,255,255,0.15)",c.style.color=r?"#0F766E":"#fff"}),this.updatePpeAnalyticsDashboard()})});const t=document.getElementById("ppe-analytics-refresh");t&&t.addEventListener("click",()=>this.updatePpeAnalyticsDashboard());const s=document.getElementById("ppe-export-pdf-btn");s&&s.addEventListener("click",()=>this._ppeExportAnalyticsPDF());const a=document.getElementById("ppe-toggle-filters-btn"),o=document.getElementById("ppe-filter-panel");a&&o&&a.addEventListener("click",()=>{const n=o.style.display!=="none";o.style.display=n?"none":"block",a.style.background=n?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"}),["ppe-af-type","ppe-af-dept","ppe-af-category","ppe-af-status","ppe-af-supplier"].forEach(n=>{const c=document.getElementById(n);c&&c.addEventListener("change",()=>this.updatePpeAnalyticsDashboard())});const l=document.getElementById("ppe-filter-reset-btn");l&&l.addEventListener("click",()=>{["ppe-af-type","ppe-af-dept","ppe-af-category","ppe-af-status","ppe-af-supplier"].forEach(n=>{const c=document.getElementById(n);c&&(c.value="")}),this.updatePpeAnalyticsDashboard()})},async _ppeExportAnalyticsPDF(){try{const e=document.getElementById("ppe-analytics-root");if(!e){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}if((typeof html2canvas>"u"||typeof window.jspdf>"u")&&(Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u0635\u062F\u064A\u0631\u2026"),await Promise.all([new Promise(r=>{if(typeof html2canvas<"u")return r();const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",i.onload=r,i.onerror=r,document.head.appendChild(i)}),new Promise(r=>{if(typeof window.jspdf<"u")return r();const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",i.onload=r,i.onerror=r,document.head.appendChild(i)})]),Loading.hide()),typeof html2canvas>"u"||typeof window.jspdf>"u"){Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631\u2026");const t=String(AppState?.companySettings?.name||"Americana HSE Management System").trim(),s=String(AppState?.companySettings?.secondaryName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629").trim(),a=typeof Utils<"u"&&typeof Utils.formatDateTime=="function"?Utils.formatDateTime(new Date):new Date().toLocaleString("ar-EG"),o=document.createElement("div");o.id="ppe-pdf-header-temp",o.style.cssText="background:linear-gradient(135deg,#0F766E 0%,#0E7490 50%,#1E3A8A 100%);color:#fff;padding:18px 24px;border-radius:14px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;font-family:Arial,sans-serif;",o.innerHTML=`
                <div>
                    <div style="font-size:18px;font-weight:800;margin-bottom:4px;white-space:nowrap;word-break:keep-all;">${Utils.escapeHTML(t)}</div>
                    <div style="font-size:13px;opacity:0.95;">${Utils.escapeHTML(s)}</div>
                </div>
                <div style="text-align:end;">
                    <div style="font-size:16px;font-weight:700;margin-bottom:4px;">\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</div>
                    <div style="font-size:12px;opacity:0.95;" dir="ltr">${Utils.escapeHTML(a)}</div>
                </div>
            `,e.insertBefore(o,e.firstChild);const l=await html2canvas(e,{scale:Utils.PdfExport.getOptimalCaptureScale(e.scrollWidth,e.scrollHeight,Utils.PdfExport.DEFAULT_CAPTURE_SCALE),useCORS:!0,backgroundColor:"#ffffff",logging:!1});o.remove();const n=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});if(!n)throw new Error("jsPDF unavailable");Utils.PdfExport.appendCanvasAsPdfPages(n,l,{marginMm:0});const c=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);Utils.PdfExport.savePdf(n,`PPE-Analytics-${c}.pdf`),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(e.message||e));const t=document.getElementById("ppe-pdf-header-temp");t&&t.remove()}}};(function(){"use strict";try{typeof window<"u"&&typeof PPE<"u"&&(window.PPE=PPE,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 PPE module loaded and available on window.PPE"))}catch{if(typeof window<"u"&&typeof PPE<"u")try{window.PPE=PPE}catch{}}})();
