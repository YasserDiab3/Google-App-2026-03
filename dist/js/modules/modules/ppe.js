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
        `,document.head.appendChild(e)},getDisplayStatus(e){const t=String(e||"").trim();return t==="\u0645\u0633\u062A\u0644\u0645"?this._t("module.ppe.status.received","\u0645\u0633\u062A\u0644\u0645"):t==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"?this._t("module.ppe.status.pending","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"):t||"\u2014"},isStatusReceived(e){return String(e||"").trim()==="\u0645\u0633\u062A\u0644\u0645"},getFilteredPpeReceipts(e){const t=Array.isArray(e)?e:[],s=this.state.filters?.receipts||{},i=(s.search||"").trim().toLowerCase(),a=s.equipmentType||"",r=s.status||"",n=s.dateFrom?new Date(s.dateFrom+"T00:00:00"):null,p=s.dateTo?new Date(s.dateTo+"T23:59:59.999"):null;return n&&isNaN(n.getTime())||p&&isNaN(p.getTime())?t:t.filter(l=>{if(a&&String(l.equipmentType||"")!==a||r&&String(l.status||"")!==r)return!1;if(n||p){if(!l.receiptDate)return!1;const o=new Date(l.receiptDate);if(isNaN(o.getTime())||n&&o<n||p&&o>p)return!1}return!(i&&![l.receiptNumber,l.id,l.employeeName,l.employeeCode,l.employeeNumber,l.equipmentType,l.status,l.employeeDepartment,l.createdBy,l.createdByUser,l.recordedBy,l.recorderName].map(d=>String(d||"").toLowerCase()).join(" | ").includes(i))})},hasActiveReceiptFilters(){const e=this.state.filters?.receipts||{};return!!(e.search||e.equipmentType||e.status||e.dateFrom||e.dateTo)},resetReceiptFilters(){this.state.filters||(this.state.filters={}),this.state.filters.receipts={search:"",equipmentType:"",status:"",dateFrom:"",dateTo:""}},getFilteredStockItems(e){const t=Array.isArray(e)?e:[],s=this.state.filters&&this.state.filters.stock||{},i=(s.search||"").trim().toLowerCase(),a=s.category||"",r=s.supplier||"",n=s.status||"",p=s.dateFrom?new Date(s.dateFrom+"T00:00:00"):null,l=s.dateTo?new Date(s.dateTo+"T23:59:59.999"):null;return p&&isNaN(p.getTime())||l&&isNaN(l.getTime())?t:t.filter(o=>{if(!o||a&&String(o.category||"")!==a||r&&String(o.supplier||"")!==r)return!1;if(n){const d=parseFloat(o.balance||0),u=parseFloat(o.minThreshold||0),y=d<u;if(n==="low"&&!y||n==="available"&&y)return!1}if(p||l){if(!o.lastUpdate)return!1;const d=new Date(o.lastUpdate);if(isNaN(d.getTime())||p&&d<p||l&&d>l)return!1}return!(i&&![o.itemCode,o.itemName,o.category,o.supplier].map(u=>String(u||"").toLowerCase()).join(" | ").includes(i))})},hasActiveStockFilters(){const e=this.state.filters&&this.state.filters.stock||{};return!!(e.search||e.category||e.supplier||e.status||e.dateFrom||e.dateTo)},resetStockFilters(){this.state.filters||(this.state.filters={}),this.state.filters.stock={search:"",category:"",supplier:"",status:"",dateFrom:"",dateTo:""}},buildStockFilterRow(e){const t=(o,d)=>this._t(o,d),s=o=>Utils.escapeHTML(o);this.ensurePpeFilterStyles();const i=Array.isArray(e)?e:[],a=this.state.filters&&this.state.filters.stock||{},r=this.getFilteredStockItems(i),n=typeof document<"u"&&(document.documentElement.getAttribute("dir")==="rtl"||window.AppI18n&&window.AppI18n.getCurrentLang&&window.AppI18n.getCurrentLang()==="ar"),p=[...new Set(i.map(o=>o&&o.category).filter(Boolean))].sort(),l=[...new Set(i.map(o=>o&&o.supplier).filter(Boolean))].sort();return`
            <div class="ppe-visits-filters-row visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 0 14px 0; width: 100%; direction: ${n?"rtl":"ltr"}; border-radius: 10px;">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <div class="filter-field" style="min-width: 180px;">
                        <label class="filter-label" for="ppe-stock-search">
                            <i class="fas fa-search ml-1"></i>${s(t("module.ppe.filter.search","\u0628\u062D\u062B"))}
                        </label>
                        <input type="text" id="ppe-stock-search" class="form-input pr-10 filter-input" placeholder="${s(t("module.ppe.stock.filter.searchPlaceholder","\u0643\u0648\u062F/\u0627\u0633\u0645/\u0641\u0626\u0629/\u0645\u0648\u0631\u062F"))}" value="${s(a.search||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-stock-filter-category">
                            <i class="fas fa-tags ml-1"></i>${s(t("module.ppe.stock.category","\u0627\u0644\u0641\u0626\u0629"))}
                            ${a.category?`<span class="filter-count-badge" title="${s(t("module.ppe.filter.badgeCount",""))}">${r.length}</span>`:""}
                        </label>
                        <select id="ppe-stock-filter-category" class="form-input filter-input">
                            <option value="">${s(t("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${p.map(o=>`<option value="${s(o)}" ${a.category===o?"selected":""}>${s(o)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-stock-filter-supplier">
                            <i class="fas fa-truck ml-1"></i>${s(t("module.ppe.stock.supplier","\u0627\u0644\u0645\u0648\u0631\u062F"))}
                            ${a.supplier?`<span class="filter-count-badge" title="${s(t("module.ppe.filter.badgeCount",""))}">${r.length}</span>`:""}
                        </label>
                        <select id="ppe-stock-filter-supplier" class="form-input filter-input">
                            <option value="">${s(t("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${l.map(o=>`<option value="${s(o)}" ${a.supplier===o?"selected":""}>${s(o)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-stock-filter-status">
                            <i class="fas fa-signal ml-1"></i>${s(t("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}
                            ${a.status?`<span class="filter-count-badge" title="${s(t("module.ppe.filter.badgeCount",""))}">${r.length}</span>`:""}
                        </label>
                        <select id="ppe-stock-filter-status" class="form-input filter-input">
                            <option value="">${s(t("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            <option value="available" ${a.status==="available"?"selected":""}>${s(t("module.ppe.status.available","\u0645\u062A\u0648\u0641\u0631"))}</option>
                            <option value="low" ${a.status==="low"?"selected":""}>${s(t("module.ppe.status.lowStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636"))}</option>
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-stock-date-from"><i class="fas fa-calendar-alt ml-1"></i>${s(t("module.ppe.stock.filter.dateFrom","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B"))}</label>
                        <input type="date" id="ppe-stock-date-from" class="form-input filter-input" value="${s(a.dateFrom||"")}">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-stock-date-to"><i class="fas fa-calendar-check ml-1"></i>${s(t("module.ppe.stock.filter.dateTo","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B"))}</label>
                        <input type="date" id="ppe-stock-date-to" class="form-input filter-input" value="${s(a.dateTo||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 170px;">
                        <button type="button" id="ppe-stock-reset-filters" class="filter-reset-btn" title="${s(t("module.ppe.filter.resetTitle",""))}">
                            <i class="fas fa-rotate-left ml-1"></i>${s(t("module.ppe.filter.reset","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                        </button>
                    </div>
                </div>
            </div>`},buildPPEListHtml(){const e=(c,x)=>this._t(c,x);this.ensurePpeFilterStyles();const t=AppState.appData.ppe||[],s=this.state.filters?.receipts||{},i=this.getFilteredPpeReceipts(t),a=this.hasActiveReceiptFilters(),r=typeof document<"u"&&(document.documentElement.getAttribute("dir")==="rtl"||window.AppI18n&&window.AppI18n.getCurrentLang&&window.AppI18n.getCurrentLang()==="ar"),n=c=>Utils.escapeHTML(c),p=[...new Set(t.map(c=>c.equipmentType).filter(Boolean))].sort(),l=["\u0645\u0633\u062A\u0644\u0645","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"],o=`
            <div class="kpi-grid mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="kpi-card kpi-primary">
                    <div class="kpi-icon"><i class="fas fa-receipt"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-label">${n(e("module.ppe.kpi.totalReceipts","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"))}</div>
                        <div class="kpi-value">${t.length}</div>
                        <div class="kpi-description">${n(e("module.ppe.kpi.totalReceiptsDesc","\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0633\u062C\u0644\u0629"))}</div>
                    </div>
                </div>
                <div class="kpi-card kpi-success">
                    <div class="kpi-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-label">${n(e("module.ppe.kpi.receivedItems","\u0645\u0647\u0645\u0627\u062A \u062A\u0645 \u062A\u0633\u0644\u064A\u0645\u0647\u0627"))}</div>
                        <div class="kpi-value">${t.filter(c=>c.status==="\u0645\u0633\u062A\u0644\u0645").length}</div>
                        <div class="kpi-description">${n(e("module.ppe.kpi.receivedItemsDesc","\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0645\u0643\u062A\u0645\u0644\u0629 \u0648\u0645\u0648\u062B\u0642\u0629"))}</div>
                    </div>
                </div>
                <div class="kpi-card kpi-warning">
                    <div class="kpi-icon"><i class="fas fa-clock"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-label">${n(e("module.ppe.kpi.pendingItems","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"))}</div>
                        <div class="kpi-value">${t.filter(c=>c.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645").length}</div>
                        <div class="kpi-description">${n(e("module.ppe.kpi.pendingItemsDesc","\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629"))}</div>
                    </div>
                </div>
                <div class="kpi-card kpi-info">
                    <div class="kpi-icon"><i class="fas fa-users"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-label">${n(e("module.ppe.kpi.uniqueEmployees","\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0648\u0646"))}</div>
                        <div class="kpi-value">${new Set(t.map(c=>c.employeeCode||c.employeeNumber).filter(Boolean)).size}</div>
                        <div class="kpi-description">${n(e("module.ppe.kpi.uniqueEmployeesDesc","\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F\u064A\u0646"))}</div>
                    </div>
                </div>
            </div>
        `,d=`
            <div class="ppe-visits-filters-row visits-filters-row" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 16px 20px; margin: 0 0 14px 0; width: 100%; border: 1px solid #e2e8f0; border-radius: 12px; direction: ${r?"rtl":"ltr"};">
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
                            ${s.equipmentType?`<span class="filter-count-badge" title="${n(e("module.ppe.filter.badgeCount",""))}">${i.length}</span>`:""}
                        </label>
                        <select id="ppe-receipts-filter-type" class="form-input filter-input">
                            <option value="">${n(e("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${p.map(c=>`<option value="${n(c)}" ${s.equipmentType===c?"selected":""}>${n(c)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-receipts-filter-status">
                            <i class="fas fa-signal ml-1"></i>${n(e("module.ppe.filter.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}
                            ${s.status?`<span class="filter-count-badge" title="${n(e("module.ppe.filter.badgeCount",""))}">${i.length}</span>`:""}
                        </label>
                        <select id="ppe-receipts-filter-status" class="form-input filter-input">
                            <option value="">${n(e("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${l.map(c=>`<option value="${n(c)}" ${s.status===c?"selected":""}>${n(this.getDisplayStatus(c))}</option>`).join("")}
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
            </div>`;if(t.length===0){const c=`<div class="empty-state"><p class="text-gray-500">${n(e("module.ppe.empty.noReceipts","\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0645\u0633\u062C\u0644\u0629"))}</p></div>`;return o+this._buildExcelToolbarHtml("receipts")+d+c}const u=a&&i.length===0?`
            <div class="empty-state">
                <i class="fas fa-filter text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 mb-2">${n(e("module.ppe.filter.noMatch","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629"))}</p>
                <button type="button" id="ppe-receipts-clear-empty-filters" class="btn-secondary mt-2">
                    <i class="fas fa-undo-alt ml-2"></i>${n(e("module.ppe.filter.clearEmpty","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                </button>
            </div>
        `:"";if(i.length===0)return o+this._buildExcelToolbarHtml("receipts")+d+u;const y=e("module.common.view","\u0639\u0631\u0636"),m=e("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF"),f=e("module.common.edit","\u062A\u0639\u062F\u064A\u0644"),b=e("module.ppe.btn.deleteReceipt","\u062D\u0630\u0641"),w=`
            <table class="data-table table-header-blue">
                <thead>
                    <tr>
                        <th>${n(e("module.ppe.table.receiptNo","\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644"))}</th>
                        <th>${n(e("module.ppe.table.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}</th>
                        <th>${n(e("module.ppe.table.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}</th>
                        <th>${n(e("module.ppe.table.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}</th>
                        <th>${n(e("module.ppe.table.quantity","\u0627\u0644\u0643\u0645\u064A\u0629"))}</th>
                        <th>${n(e("module.ppe.table.createdBy","\u0645\u0633\u062C\u0651\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</th>
                        <th>${n(e("module.ppe.table.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</th>
                        <th>${n(e("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}</th>
                        <th>${n(e("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                    </tr>
                </thead>
                <tbody>
                    ${i.map(c=>{const x=this.getDisplayStatus(c.status),v=String(c.id||"").replace(/\\/g,"\\\\").replace(/'/g,"\\'"),k=c.createdBy||c.createdByUser||c.recordedBy||c.recorderName||c.user||"\u2014";return`
                        <tr>
                            <td class="font-mono font-semibold">${n(c.receiptNumber||c.id||"")}</td>
                            <td>${n(c.employeeName||"")}</td>
                            <td>${n(c.employeeCode||c.employeeNumber||"")}</td>
                            <td>
                                ${n(c.equipmentType||"")}
                                ${c.shoeSize?`<span class="block text-[11px] text-blue-600 font-semibold mt-0.5"><i class="fas fa-shoe-prints ml-1 text-[10px]"></i>\u0645\u0642\u0627\u0633: ${n(c.shoeSize)}</span>`:""}
                            </td>
                            <td>${c.quantity||0}</td>
                            <td><span class="text-xs font-semibold text-slate-700"><i class="fas fa-user-edit text-blue-500 ml-1 text-[11px]"></i>${n(k)}</span></td>
                            <td>${c.receiptDate?Utils.formatDate(c.receiptDate):"-"}</td>
                            <td>
                                <span class="badge badge-${this.isStatusReceived(c.status)?"success":"warning"}">
                                    ${n(x)}
                                </span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button onclick="PPE.viewPPE('${v}')" class="btn-icon btn-icon-info" title="${n(y)}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="PPE.exportPDF('${v}')" class="btn-icon btn-icon-success" title="${n(m)}">
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                    <button onclick="PPE.showPPEForm(${JSON.stringify(c).replace(/"/g,"&quot;")});" class="btn-icon btn-icon-primary" title="${n(f)}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="PPE.deletePPE('${v}')" class="btn-icon btn-icon-danger" title="${n(b)}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>`}).join("")}
                </tbody>
            </table>
        `;return o+this._buildExcelToolbarHtml("receipts")+d+w},_receiptsFilterTimer:null,refreshReceiptsListUI(){const e=document.getElementById("ppe-list");e&&(e.innerHTML=this.buildPPEListHtml(),this.applyModuleI18n(e),this.bindReceiptsFilters())},bindReceiptsFilters(){if(this.state.activeTab!=="receipts")return;const e=l=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(l):setTimeout(l,0)},t=document.getElementById("ppe-receipts-search");if(t){const l=o=>{this.state.filters.receipts.search=o.target&&o.target.value||"",clearTimeout(this._receiptsFilterTimer),this._receiptsFilterTimer=setTimeout(()=>e(()=>this.refreshReceiptsListUI()),220)};t.addEventListener("input",l)}const s=document.getElementById("ppe-receipts-filter-type");s&&s.addEventListener("change",l=>{this.state.filters.receipts.equipmentType=l.target&&l.target.value||"",this.refreshReceiptsListUI()});const i=document.getElementById("ppe-receipts-filter-status");i&&i.addEventListener("change",l=>{this.state.filters.receipts.status=l.target&&l.target.value||"",this.refreshReceiptsListUI()});const a=document.getElementById("ppe-receipts-date-from");a&&a.addEventListener("change",l=>{this.state.filters.receipts.dateFrom=l.target&&l.target.value||"",this.refreshReceiptsListUI()});const r=document.getElementById("ppe-receipts-date-to");r&&r.addEventListener("change",l=>{this.state.filters.receipts.dateTo=l.target&&l.target.value||"",this.refreshReceiptsListUI()});const n=document.getElementById("ppe-receipts-reset-filters");n&&n.addEventListener("click",()=>{this.resetReceiptFilters(),this.refreshReceiptsListUI()});const p=document.getElementById("ppe-receipts-clear-empty-filters");p&&p.addEventListener("click",()=>{this.resetReceiptFilters(),this.refreshReceiptsListUI()})},clearCache(){this.state.stockItemsCache&&(AppState.appData.ppeStock=this.state.stockItemsCache,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()),this.state.stockItemsCache=null,this.state.stockItemsCacheTime=null,this.state.lastSyncTime=Date.now(),Utils.safeLog("\u{1F504} PPE: \u062A\u0645 \u0645\u0633\u062D Cache \u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},async preloadData(){try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const e=await GoogleIntegration.sendToAppsScript("getAllPPE",{});e&&e.success&&Array.isArray(e.data)&&(AppState.appData.ppe=e.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A:",e)}this.loadStockItems(!0).catch(e=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0633\u0628\u0642\u0627\u064B:",e))}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A preloadData:",e)}},renderActiveTabContentWithFallback(){try{switch(this.state.activeTab){case"stock-control":const e=AppState.appData.ppeStock||[];return e.length===0?`
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
            `}},renderPPEListSync(){return this.buildPPEListHtml()},renderStockTableSync(e){const t=(i,a)=>this._t(i,a),s=i=>Utils.escapeHTML(i);return!e||e.length===0?`
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
                        ${e.map(i=>{const a=parseFloat(i.balance||0),r=parseFloat(i.minThreshold||0),n=a<r;return`
                                <tr class="${n?"bg-red-50":""}">
                                    <td class="font-mono font-semibold">${Utils.escapeHTML(i.itemCode||"")}</td>
                                    <td>${Utils.escapeHTML(i.itemName||"")}</td>
                                    <td>${Utils.escapeHTML(i.category||"")}</td>
                                    <td class="text-green-600 font-semibold">${parseFloat(i.stock_IN||0).toFixed(0)}</td>
                                    <td class="text-red-600 font-semibold">${parseFloat(i.stock_OUT||0).toFixed(0)}</td>
                                    <td class="font-bold ${n?"text-red-600":"text-blue-600"}">${a.toFixed(0)}</td>
                                    <td>${r.toFixed(0)}</td>
                                    <td>${Utils.escapeHTML(i.supplier||"")}</td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button onclick="PPE.editStockItem('${i.itemId}')" class="btn-icon btn-icon-warning" title="${s(t("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button onclick="PPE.deleteStockItem('${i.itemId}')" class="btn-icon btn-icon-danger" title="${s(t("module.ppe.btn.deleteItem","\u062D\u0630\u0641"))}">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},async refreshActiveTab(e={}){try{const t=!!e.skipRemote;this.clearCache();const s=document.getElementById("ppe-tab-content");if(!s){Utils.safeWarn("\u26A0\uFE0F PPE: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0627\u0648\u064A\u0629 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628");return}try{if(this.state.activeTab==="stock-control")await this.loadStockItems(!0);else if(!t){if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const a=await GoogleIntegration.sendToAppsScript("getAllPPE",{});a&&a.success&&Array.isArray(a.data)&&(AppState.appData.ppe=a.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A:",a)}}}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u062B\u0646\u0627\u0621 refreshActiveTab:",a)}const i=s.innerHTML;s.style.opacity="0.6",s.style.pointerEvents="none";try{const a=await this.renderActiveTabContent(!1);s.innerHTML=a,this.applyModuleI18n(s),this.state.activeTab==="receipts"?(this.ensurePpeFilterStyles(),this.bindReceiptsFilters(),this._bindPpeReceiptExcelToolbar()):this.state.activeTab==="stock-control"&&(this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar()),Utils.safeLog("\u2705 PPE: \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0646\u0634\u0637 \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u274C PPE: \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",a),s.innerHTML=i}finally{s.style.opacity="1",s.style.pointerEvents="auto"}}catch(t){Utils.safeError("\u274C PPE: \u062E\u0637\u0623 \u0641\u064A refreshActiveTab:",t)}},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("ppe-section");if(!e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0642\u0633\u0645 ppe-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{(!AppState||!AppState.appData)&&(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F AppState \u063A\u064A\u0631 \u062C\u0627\u0647\u0632 - \u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631..."),await new Promise(t=>{let s=0;const i=50,a=setInterval(()=>{s++,AppState&&AppState.appData?(clearInterval(a),t()):s>=i&&(clearInterval(a),AppState||(AppState={}),AppState.appData||(AppState.appData={}),t())},50)}))}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 AppState:",t),AppState||(AppState={}),AppState.appData||(AppState.appData={})}try{AppState.appData.ppe||(AppState.appData.ppe=[]),AppState.appData.ppeStock||(AppState.appData.ppeStock=[]);const t=this.preloadData();let s="";try{const r=this.renderActiveTabContent(!1);s=await Utils.promiseWithTimeout(r,3e3,this._t("module.ppe.timeout.content","\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649"))}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",r),s=this.renderActiveTabContentWithFallback()}t.catch(r=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",r)});const i=(r,n)=>this._t(r,n),a=r=>Utils.escapeHTML(r);e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-hard-hat ml-3"></i>
                            ${a(i("module.ppe.title","\u0625\u062F\u0627\u0631\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"))}
                        </h1>
                        <p class="section-subtitle">${a(i("module.ppe.subtitle","\u062A\u0633\u062C\u064A\u0644 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"))}</p>
                    </div>
                    <div class="flex gap-2">
                        ${this.state.activeTab==="receipts"?`
                            <button id="view-ppe-matrix-btn" class="btn-secondary">
                                <i class="fas fa-table ml-2"></i>
                                ${a(i("module.ppe.btn.matrix","\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"))}
                            </button>
                            <button id="add-ppe-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${a(i("module.ppe.btn.newReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F"))}
                            </button>
                            <button id="ppe-refresh-btn" type="button" class="btn-secondary border-2 border-green-500 text-green-600 hover:bg-green-50" title="${a(i("module.ppe.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A"))}">
                                <i class="fas fa-sync-alt ml-2"></i>
                                ${a(i("module.ppe.btn.refresh","\u062A\u062D\u062F\u064A\u062B"))}
                            </button>
                        `:this.state.activeTab==="stock-control"?`
                            <button id="add-stock-item-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${a(i("module.ppe.btn.addStockItem","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}
                            </button>
                            <button id="add-transaction-btn" class="btn-secondary">
                                <i class="fas fa-exchange-alt ml-2"></i>
                                ${a(i("module.ppe.btn.addTransaction","\u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629"))}
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
                                ${a(i("module.ppe.tab.receipts","\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"))}
                            </button>
                            <button type="button" class="ppe-tab-btn ${this.state.activeTab==="stock-control"?"active":""}" data-tab="stock-control">
                                <i class="fas fa-boxes"></i>
                                ${a(i("module.ppe.tab.stock","\u0625\u062F\u0627\u0631\u0629 \u0645\u062E\u0632\u0648\u0646 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"))}
                            </button>
                            <button type="button" class="ppe-tab-btn ${this.state.activeTab==="analysis"?"active":""}" data-tab="analysis">
                                <i class="fas fa-chart-pie"></i>
                                ${a(i("module.ppe.tab.analysis","\u0627\u0644\u062A\u062D\u0644\u064A\u0644"))}
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
        `;try{this.ensurePpeFilterStyles(),this.setupEventListeners(),this.applyModuleI18n(e),this.state.activeTab==="receipts"?(this.bindReceiptsFilters(),this._bindPpeReceiptExcelToolbar()):this.state.activeTab==="stock-control"?(this.bindStockFilters(),this._bindPpeStockExcelToolbar()):this.state.activeTab==="analysis"&&(this._ppeBindAnalyticsEvents(),this.updatePpeAnalyticsDashboard())}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A setupEventListeners:",r)}}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629:",t);const s=(a,r)=>this._t(a,r),i=a=>Utils.escapeHTML(a);e.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-hard-hat ml-3"></i>
                            ${i(s("module.ppe.title","\u0625\u062F\u0627\u0631\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"))}
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${i(s("module.ppe.empty.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}</p>
                                <button onclick="PPE.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${i(s("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
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
        `},cleanupEventListeners(){this.state.eventListeners.forEach((e,t)=>{t&&t.removeEventListener&&t.removeEventListener(e.event,e.handler)}),this.state.eventListeners.clear()},setupEventListeners(){this.cleanupEventListeners(),setTimeout(()=>{document.querySelectorAll(".ppe-tab-btn").forEach(n=>{const p=()=>{const l=n.getAttribute("data-tab");l&&!this.state.isSwitchingTab&&this.switchTab(l)};n.addEventListener("click",p),this.state.eventListeners.set(n,{event:"click",handler:p})});const t=document.getElementById("add-ppe-btn"),s=document.getElementById("view-ppe-matrix-btn");if(t){const n=()=>this.showPPEForm();t.addEventListener("click",n),this.state.eventListeners.set(t,{event:"click",handler:n})}if(s){const n=()=>this.showPPEMatrix();s.addEventListener("click",n),this.state.eventListeners.set(s,{event:"click",handler:n})}const i=document.getElementById("ppe-refresh-btn");if(i){const n=()=>this.refreshActiveTab();i.addEventListener("click",n),this.state.eventListeners.set(i,{event:"click",handler:n})}const a=document.getElementById("add-stock-item-btn"),r=document.getElementById("add-transaction-btn");if(a){const n=()=>this.showStockItemForm();a.addEventListener("click",n),this.state.eventListeners.set(a,{event:"click",handler:n})}if(r){const n=()=>this.showTransactionForm();r.addEventListener("click",n),this.state.eventListeners.set(r,{event:"click",handler:n})}this._bindPpeReceiptExcelToolbar(),this._bindPpeStockExcelToolbar()},100)},updateHeaderButtons(){const e=document.querySelector("#ppe-section .section-header .flex.gap-2");if(!e)return;[document.getElementById("add-ppe-btn"),document.getElementById("view-ppe-matrix-btn"),document.getElementById("ppe-refresh-btn"),document.getElementById("add-stock-item-btn"),document.getElementById("add-transaction-btn")].filter(Boolean).forEach(o=>{if(this.state.eventListeners.has(o)){const d=this.state.eventListeners.get(o);o.removeEventListener(d.event,d.handler),this.state.eventListeners.delete(o)}});const s=(o,d)=>this._t(o,d),i=o=>Utils.escapeHTML(o);this.state.activeTab==="receipts"?e.innerHTML=`
                <button id="view-ppe-matrix-btn" class="btn-secondary">
                    <i class="fas fa-table ml-2"></i>
                    ${i(s("module.ppe.btn.matrix","\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"))}
                </button>
                <button id="add-ppe-btn" class="btn-primary">
                    <i class="fas fa-plus ml-2"></i>
                    ${i(s("module.ppe.btn.newReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F"))}
                </button>
                <button id="ppe-refresh-btn" type="button" class="btn-secondary border-2 border-green-500 text-green-600 hover:bg-green-50" title="${i(s("module.ppe.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A"))}">
                    <i class="fas fa-sync-alt ml-2"></i>
                    ${i(s("module.ppe.btn.refresh","\u062A\u062D\u062F\u064A\u062B"))}
                </button>
            `:e.innerHTML=`
                <button id="add-stock-item-btn" class="btn-primary">
                    <i class="fas fa-plus ml-2"></i>
                    ${i(s("module.ppe.btn.addStockItem","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}
                </button>
                <button id="add-transaction-btn" class="btn-secondary">
                    <i class="fas fa-exchange-alt ml-2"></i>
                    ${i(s("module.ppe.btn.addTransaction","\u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629"))}
                </button>
            `,this.applyModuleI18n(e);const a=document.getElementById("add-ppe-btn"),r=document.getElementById("view-ppe-matrix-btn"),n=document.getElementById("add-stock-item-btn"),p=document.getElementById("add-transaction-btn");if(a){const o=()=>this.showPPEForm();a.addEventListener("click",o),this.state.eventListeners.set(a,{event:"click",handler:o})}if(r){const o=()=>this.showPPEMatrix();r.addEventListener("click",o),this.state.eventListeners.set(r,{event:"click",handler:o})}const l=document.getElementById("ppe-refresh-btn");if(l){const o=()=>this.refreshActiveTab();l.addEventListener("click",o),this.state.eventListeners.set(l,{event:"click",handler:o})}if(n){const o=()=>this.showStockItemForm();n.addEventListener("click",o),this.state.eventListeners.set(n,{event:"click",handler:o})}if(p){const o=()=>this.showTransactionForm();p.addEventListener("click",o),this.state.eventListeners.set(p,{event:"click",handler:o})}this._bindPpeReceiptExcelToolbar(),this._bindPpeStockExcelToolbar()},async switchTab(e){if(this.state.isSwitchingTab){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0628\u064A\u0646 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0628\u0627\u0644\u0641\u0639\u0644");return}if(this.state.activeTab!==e)try{this.state.isSwitchingTab=!0,this.state.activeTab=e,document.querySelectorAll(".ppe-tab-btn").forEach(i=>{i.classList.remove("active"),i.getAttribute("data-tab")===e&&i.classList.add("active")});const s=document.getElementById("ppe-tab-content");if(s)try{if(e==="stock-control"){const a=this.state.stockItemsCache&&this.state.stockItemsCache.length?this.state.stockItemsCache:Array.isArray(AppState.appData.ppeStock)&&AppState.appData.ppeStock.length?AppState.appData.ppeStock:[],r=`<div role="status" class="rounded-lg border border-blue-100 bg-blue-50/90 px-4 py-2 text-sm text-blue-900 flex items-center gap-2">
                            <i class="fas fa-sync-alt fa-spin text-blue-600"></i>
                            <span>${Utils.escapeHTML(this._t("module.ppe.stock.syncingHint","\u062C\u0627\u0631\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0623\u062D\u062F\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"))}</span>
                        </div>`;s.innerHTML=a.length>0?this.buildStockControlTabHtmlSync(a,r):`<div class="space-y-4" id="ppe-stock-tab-root">${r}<div class="empty-state py-8"><p class="text-gray-600">${Utils.escapeHTML(this._t("module.ppe.loading.stockData","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"))}</p></div></div>`,s.style.opacity="1",s.style.pointerEvents="auto",a.length>0&&(this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar())}else s.style.opacity="0.92",s.style.pointerEvents="none";const i=await this.renderActiveTabContent(e!=="stock-control"&&e!=="analysis");s.innerHTML=i,this.applyModuleI18n(s),e==="receipts"?(this.ensurePpeFilterStyles(),this.bindReceiptsFilters(),this._bindPpeReceiptExcelToolbar()):e==="stock-control"?(this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar()):e==="analysis"&&(this._ppeBindAnalyticsEvents(),this.updatePpeAnalyticsDashboard()),Utils.safeLog(`\u2705 PPE: \u062A\u0645 \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u062A\u0628\u0648\u064A\u0628 ${e}`)}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",i),s.innerHTML=`
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}</p>
                            <button onclick="PPE.switchTab('${e}')" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                ${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                            </button>
                        </div>
                    `}finally{s.style.opacity="1",s.style.pointerEvents="auto"}this.updateHeaderButtons()}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0628\u064A\u0646 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:",t)}finally{this.state.isSwitchingTab=!1}},parseEligibilityRules(e){if(!e)return[];try{if(Array.isArray(e))return e;if(typeof e=="string"){const t=JSON.parse(e);return Array.isArray(t)?t:[]}}catch{return[]}return[]},getEligibilityRule(e){const t=typeof AppState<"u"&&AppState.companySettings?AppState.companySettings:{},s=this.parseEligibilityRules(t.ppeEligibilityRules),i=r=>(r||"").toString().trim().toLowerCase(),a=i(e);if(a){const r=s.find(n=>n&&i(n.equipmentType||n.itemName)===a);if(r){let n=parseInt(r.months,10),p=parseInt(r.days,10);return(isNaN(n)||n<0)&&(n=0),(isNaN(p)||p<0)&&(p=0),n=Math.min(120,n),p=Math.min(3650,p),{months:n,days:p,hasRule:n+p>0,equipmentType:r.equipmentType||r.itemName}}}return{months:0,days:0,hasRule:!1,equipmentType:e||null}},findLastReceiptForEmployeeItem(e,t,s={}){const i=(e||"").toString().trim().toLowerCase(),a=(t||"").toString().trim().toLowerCase();if(!i||!a)return null;const r=s.excludeId||null,n=typeof AppState<"u"&&Array.isArray(AppState.appData?.ppe)?AppState.appData.ppe:[];let p=null,l=null;for(const o of n){if(!o||r&&o.id===r)continue;const d=(o.employeeCode||o.employeeNumber||"").toString().trim().toLowerCase(),u=(o.equipmentType||"").toString().trim().toLowerCase();if(d!==i||u!==a)continue;const y=o.receiptDate?new Date(o.receiptDate):null;!y||isNaN(y.getTime())||(!l||y>l)&&(p=o,l=y)}return p},diffMonthsAndDays(e,t){const s=new Date(e),i=new Date(t);if(isNaN(s.getTime())||isNaN(i.getTime())||i<s)return{months:0,days:0,totalDays:0,isNegative:i<s};let a=(i.getFullYear()-s.getFullYear())*12+(i.getMonth()-s.getMonth()),r=i.getDate()-s.getDate();if(r<0){a-=1;const p=new Date(i.getFullYear(),i.getMonth(),0);r+=p.getDate()}a<0&&(a=0);const n=Math.floor((i-s)/(1e3*60*60*24));return{months:a,days:r,totalDays:n,isNegative:!1}},addMonthsAndDays(e,t,s){const i=new Date(e);if(isNaN(i.getTime()))return null;const a=new Date(i.getFullYear(),i.getMonth()+(t||0),i.getDate());return a.setDate(a.getDate()+(s||0)),a.setHours(i.getHours(),i.getMinutes(),i.getSeconds(),i.getMilliseconds()),a},computeEligibility(e,t,s,i={}){const a=this.getEligibilityRule(t),r={hasInputs:!1,hasPrevious:!1,hasRule:a.hasRule,ruleMonths:a.months,ruleDays:a.days,lastReceiptDate:null,currentDate:null,elapsed:null,dueDate:null,isEligible:!0,remaining:null};if(!e||!t)return r;r.hasInputs=!0;const n=this.findLastReceiptForEmployeeItem(e,t,i);if(!n||!n.receiptDate)return r;const p=new Date(n.receiptDate);if(isNaN(p.getTime()))return r;r.hasPrevious=!0,r.lastReceiptDate=p;const l=s?new Date(s):new Date;if(isNaN(l.getTime())?r.currentDate=new Date:r.currentDate=l,r.elapsed=this.diffMonthsAndDays(p,r.currentDate),a.hasRule){const o=this.addMonthsAndDays(p,a.months,a.days);r.dueDate=o,o&&r.currentDate<o&&(r.isEligible=!1,r.remaining=this.diffMonthsAndDays(r.currentDate,o))}return r},formatMonthsDays(e,t){const s=parseInt(e,10)||0,i=parseInt(t,10)||0,a=[];return s>0&&a.push(`${s} \u0634\u0647\u0631`),(i>0||s===0&&i===0)&&a.push(`${i} \u064A\u0648\u0645`),a.join(" \u0648 ")},renderEligibilityInfo(e,t){if(!e)return;const s=p=>p?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(p):new Date(p).toLocaleDateString("ar"):"-",i=(p,l,o,d,u)=>{const y={gray:{outer:"ring-1 ring-slate-200/80 shadow-xl shadow-slate-900/5",headerBar:"from-slate-700 via-slate-600 to-slate-700",headerIconBg:"bg-white/15 text-white ring-2 ring-white/30 shadow-md",tileSurface:"rounded-2xl border border-slate-200/75 bg-gradient-to-br from-white via-slate-50/30 to-white p-[1.1rem] sm:p-5 min-w-0 shadow-sm hover:shadow-md hover:border-slate-300/60 transition-all duration-200",iconBox:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-700 text-[15px] shadow-inner ring-1 ring-slate-300/35",labelClass:"text-[11px] font-bold tracking-wide text-slate-500",valueClass:"text-[1.05rem] sm:text-lg font-extrabold text-slate-900 tracking-tight tabular-nums",footerWrap:"bg-gradient-to-b from-slate-50 to-slate-100/80 border-t border-slate-200/90"},blue:{outer:"ring-1 ring-sky-200/85 shadow-xl shadow-sky-900/[0.06]",headerBar:"from-sky-700 via-sky-500 to-cyan-500",headerIconBg:"bg-white/15 text-white ring-2 ring-white/30 shadow-md",tileSurface:"rounded-2xl border border-sky-100/90 bg-gradient-to-br from-white via-sky-50/25 to-white p-[1.1rem] sm:p-5 min-w-0 shadow-sm hover:shadow-md hover:border-sky-200/80 transition-all duration-200",iconBox:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100/70 text-sky-700 text-[15px] shadow-inner ring-1 ring-sky-200/55",labelClass:"text-[11px] font-bold tracking-wide text-sky-700/70",valueClass:"text-[1.05rem] sm:text-lg font-extrabold text-slate-900 tracking-tight tabular-nums",footerWrap:"bg-gradient-to-b from-sky-50/90 to-sky-100/50 border-t border-sky-100"},green:{outer:"ring-1 ring-emerald-200/85 shadow-xl shadow-emerald-900/[0.05]",headerBar:"from-emerald-700 via-teal-600 to-emerald-500",headerIconBg:"bg-white/15 text-white ring-2 ring-white/30 shadow-md",tileSurface:"rounded-2xl border border-emerald-100/90 bg-gradient-to-br from-white via-emerald-50/20 to-white p-[1.1rem] sm:p-5 min-w-0 shadow-sm hover:shadow-md hover:border-emerald-200/70 transition-all duration-200",iconBox:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100/80 text-emerald-700 text-[15px] shadow-inner ring-1 ring-emerald-200/55",labelClass:"text-[11px] font-bold tracking-wide text-emerald-800/70",valueClass:"text-[1.05rem] sm:text-lg font-extrabold text-slate-900 tracking-tight tabular-nums",footerWrap:"bg-gradient-to-b from-emerald-50/95 to-teal-50/40 border-t border-emerald-100"},red:{outer:"ring-1 ring-rose-200/85 shadow-xl shadow-rose-900/[0.06]",headerBar:"from-rose-700 via-rose-500 to-red-500",headerIconBg:"bg-white/15 text-white ring-2 ring-white/30 shadow-md",tileSurface:"rounded-2xl border border-rose-100/90 bg-gradient-to-br from-white via-rose-50/25 to-white p-[1.1rem] sm:p-5 min-w-0 shadow-sm hover:shadow-md hover:border-rose-200/75 transition-all duration-200",iconBox:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-orange-50 text-rose-700 text-[15px] shadow-inner ring-1 ring-rose-200/55",labelClass:"text-[11px] font-bold tracking-wide text-rose-800/75",valueClass:"text-[1.05rem] sm:text-lg font-extrabold text-slate-900 tracking-tight tabular-nums",footerWrap:"bg-gradient-to-b from-rose-50/95 to-rose-100/35 border-t border-rose-100"}},m=y[p]||y.gray,f=d.length;let b="grid gap-3 md:gap-4 w-full ";f<=1?b+="grid-cols-1":f===2?b+="grid-cols-1 sm:grid-cols-2":f===3?b+="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3":b+="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";const w=f?`<div class="px-3 py-4 sm:px-6 sm:py-5 bg-gradient-to-br from-slate-50/90 via-white to-white">
                    <div class="${b}">
                    ${d.map(c=>{const v=typeof c.value=="string"&&c.value.includes("\u0628\u062F\u0648\u0646 \u0642\u0627\u0639\u062F\u0629")?"text-base sm:text-[1.0625rem] font-semibold text-slate-600 tracking-tight leading-snug":m.valueClass;return`
                        <div class="${m.tileSurface}">
                            <div class="flex items-center gap-3 sm:gap-4 text-start h-full">
                                <span class="${m.iconBox} shrink-0">
                                    <i class="${c.icon}"></i>
                                </span>
                                <div class="flex-1 min-w-0 flex flex-col gap-1.5 justify-center">
                                    <div class="${m.labelClass} text-xs sm:text-[11px] leading-snug">${c.label}</div>
                                    <p class="${v} leading-snug break-words hyphens-none">${c.value}</p>
                                </div>
                            </div>
                        </div>`}).join("")}
                    </div>
                </div>`:"";return`
                <div class="mt-1 w-full min-w-0 overflow-hidden rounded-2xl bg-white ${m.outer}">
                    <div class="flex items-center gap-4 bg-gradient-to-l ${m.headerBar} px-5 py-4 sm:px-6 text-white shadow-inner">
                        <span class="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl ${m.headerIconBg} text-lg sm:text-xl">
                            <i class="${l}"></i>
                        </span>
                        <div class="min-w-0 flex-1">
                            <p class="text-[11px] font-semibold tracking-wide text-white/85 mb-1">\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645</p>
                            <h4 class="text-base sm:text-lg font-extrabold leading-snug text-white break-words">${o}</h4>
                        </div>
                    </div>
                    ${w}
                    ${u?`<div class="${m.footerWrap} px-5 py-4 sm:px-6 text-sm sm:text-[0.9375rem] font-medium text-slate-700 leading-relaxed flex flex-wrap items-center gap-3 w-full">${u}</div>`:""}
                </div>
            `};if(!t||!t.hasInputs){e.innerHTML=i("gray","fas fa-info-circle","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629",[],'<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600 text-xs"><i class="fas fa-lightbulb"></i></span><span>\u0628\u0639\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0643\u0648\u062F \u0648\u0627\u0644\u0635\u0646\u0641 \u062A\u0638\u0647\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0622\u062E\u0631 \u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0627\u0644\u0645\u062F\u0629 \u0648\u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642.</span>'),e.classList.remove("hidden"),e.setAttribute("data-eligible","pending");return}if(!t.hasPrevious){const p=[];t.hasRule&&p.push({icon:"fas fa-shield-alt",label:"\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0635\u0646\u0641",value:this.formatMonthsDays(t.ruleMonths,t.ruleDays)}),e.innerHTML=i("blue","fas fa-box-open","\u0623\u0648\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641",p,'<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-200 text-sky-800 text-xs"><i class="fas fa-check"></i></span><span>\u0644\u0627 \u064A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0633\u0627\u0628\u0642 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641\u061B \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.</span>'),e.setAttribute("data-eligible","1"),e.classList.remove("hidden");return}const a=this.formatMonthsDays(t.elapsed?.months||0,t.elapsed?.days||0),r=t.hasRule?this.formatMonthsDays(t.ruleMonths,t.ruleDays):"\u0628\u062F\u0648\u0646 \u0642\u0627\u0639\u062F\u0629 \u0645\u062D\u062F\u062F\u0629",n=[{icon:"fas fa-history",label:"\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u0627\u0633\u062A\u0644\u0627\u0645",value:s(t.lastReceiptDate)},{icon:"fas fa-hourglass-half",label:"\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0645\u0646\u0642\u0636\u064A\u0629",value:a},{icon:"fas fa-shield-alt",label:"\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0635\u0646\u0641",value:r}];if(t.dueDate&&n.push({icon:"fas fa-calendar-check",label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642",value:s(t.dueDate)}),t.isEligible){const p=t.hasRule?'<span class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-200/95 text-emerald-900 text-xs shadow-sm"><i class="fas fa-check-double"></i></span><span class="font-semibold text-emerald-950">\u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F\u061B \u062A\u0645 \u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u062F\u0646\u064A\u0627 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641.</span>':'<span class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs shadow-sm"><i class="fas fa-unlock-alt"></i></span><span class="font-semibold text-slate-800">\u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F\u061B \u0644\u0645 \u062A\u064F\u0636\u0641 \u0645\u062F\u0629 \u062F\u0646\u064A\u0627 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641 \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A\u064F\u0633\u0645\u062D \u062F\u0648\u0646 \u0642\u064A\u062F \u0632\u0645\u0646\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639.</span>';e.innerHTML=i("green","fas fa-check-circle","\u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0633\u062A\u062D\u0642 \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645",n,p),e.setAttribute("data-eligible","1")}else{const p=this.formatMonthsDays(t.remaining?.months||0,t.remaining?.days||0);e.innerHTML=i("red","fas fa-ban","\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0633\u062A\u062D\u0642 \u062D\u0627\u0644\u064A\u0627\u064B",n,`<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-200 text-rose-800 text-xs"><i class="fas fa-clock"></i></span><span class="font-semibold text-rose-900">\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629 \u062D\u062A\u0649 \u064A\u0635\u0628\u062D \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0633\u0645\u0648\u062D\u0627\u064B: <strong class="text-rose-950">${p}</strong>.</span>`),e.setAttribute("data-eligible","0")}e.classList.remove("hidden")},async showPPEForm(e=null){const t=!!e,s=document.createElement("div");s.className="modal-overlay";const i=AppState.appData.employees||[],a=(e?.employeeCode||e?.employeeNumber||"").toString().trim(),r=a.length?a:"",n=r?i.find(m=>[m.employeeNumber,m.employeeCode,m.sapId,m.id,m.nationalId,m.cardId].map(b=>(b||"").toString().trim().toLowerCase()).includes(r.toLowerCase())):null,p={name:n?.name||e?.employeeName||"",department:n?.department||e?.employeeDepartment||"",position:n?.position||e?.employeePosition||"",branch:n?.branch||e?.employeeBranch||"",location:n?.location||e?.employeeLocation||""},l=m=>m?Utils.escapeHTML(m):"\u2014",o=(m,f)=>this._t(m,f),d=m=>Utils.escapeHTML(m),u=o("module.ppe.status.received","\u0645\u0633\u062A\u0644\u0645"),y=o("module.ppe.status.pending","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645");s.innerHTML=`
            <div class="modal-content" style="width: 100%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; background: #f8fafc; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); margin: auto;">
                
                <!-- Header -->
                <div style="background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                    <h2 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 10px;">
                        <span style="background: #eff6ff; color: #2563eb; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                            <i class="fas ${t?"fa-edit":"fa-clipboard-list"}"></i>
                        </span>
                        ${d(t?o("module.ppe.title.editReceipt","\u062A\u0639\u062F\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645"):o("module.ppe.title.newReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F"))}
                    </h2>
                    <button type="button" onclick="this.closest('.modal-overlay').remove()" style="background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 1.25rem; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: 0.2s;" onmouseover="this.style.background='#f1f5f9'; this.style.color='#475569'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <!-- Form Container -->
                <form id="ppe-form" style="display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden; margin: 0;">
                    <!-- Scrollable Body -->
                    <div style="padding: 20px; overflow-y: auto; flex: 1;">
                        
                        <!-- Employee Section -->
                        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); overflow: hidden;">
                            <div style="background: #f0f9ff; border-bottom: 1px solid #e0f2fe; padding: 10px 16px; color: #0369a1; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-user-circle"></i> \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641
                            </div>
                            <div style="padding: 16px;">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${d(o("module.ppe.label.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A *"))}</label>
                                        <div style="position: relative;">
                                            <input type="text" id="ppe-employee-code" required class="form-input" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px 8px 36px; font-size: 0.85rem; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#cbd5e1'"
                                                value="${Utils.escapeHTML(e?.employeeCode||e?.employeeNumber||"")}"
                                                placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F..." autocomplete="off">
                                            <button type="button" id="ppe-search-code-btn" style="position: absolute; top: 0; left: 0; bottom: 0; width: 36px; background: none; border: none; color: #94a3b8; cursor: pointer;">
                                                <i class="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${d(o("module.ppe.label.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}</label>
                                        <div style="position: relative;">
                                            <input type="text" id="ppe-employee-name" class="form-input" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 0.85rem; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#cbd5e1'"
                                                value="${Utils.escapeHTML(e?.employeeName||"")}"
                                                placeholder="\u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645..." autocomplete="off">
                                            <div id="ppe-employee-dropdown" style="position: absolute; z-index: 50; display: none; width: 100%; margin-top: 4px; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); max-height: 240px; overflow-y: auto;"></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Hidden Inputs -->
                                <input type="hidden" id="ppe-employee-department" value="${Utils.escapeHTML(p.department)}">
                                <input type="hidden" id="ppe-employee-position" value="${Utils.escapeHTML(p.position)}">
                                <input type="hidden" id="ppe-employee-branch" value="${Utils.escapeHTML(p.branch)}">
                                <input type="hidden" id="ppe-employee-location" value="${Utils.escapeHTML(p.location)}">

                                <!-- Summary Info Box -->
                                <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 12px 16px; margin-top: 16px; display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="background: #dbeafe; color: #2563eb; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;"><i class="fas fa-id-badge"></i></span>
                                        <div>
                                            <div style="font-size: 0.65rem; color: #64748b; font-weight: 600; margin-bottom: 2px;">\u0627\u0644\u0627\u0633\u0645</div>
                                            <div id="ppe-employee-info-name" style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">${l(p.name)}</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="background: #ccfbf1; color: #0d9488; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;"><i class="fas fa-building"></i></span>
                                        <div>
                                            <div style="font-size: 0.65rem; color: #64748b; font-weight: 600; margin-bottom: 2px;">\u0627\u0644\u0642\u0633\u0645</div>
                                            <div id="ppe-employee-info-department" style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">${l(p.department)}</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="background: #fef3c7; color: #d97706; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;"><i class="fas fa-briefcase"></i></span>
                                        <div>
                                            <div style="font-size: 0.65rem; color: #64748b; font-weight: 600; margin-bottom: 2px;">\u0627\u0644\u0645\u0646\u0635\u0628</div>
                                            <div id="ppe-employee-info-position" style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">${l(p.position)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Items Section -->
                        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); overflow: hidden;">
                            <div style="background: #f0fdf4; border-bottom: 1px solid #dcfce7; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center;">
                                <div style="color: #166534; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-boxes"></i> \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629 *
                                </div>
                                <button type="button" id="ppe-add-item-btn" style="background: #ffffff; border: 1px solid #bbf7d0; color: #166534; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#dcfce7'" onmouseout="this.style.background='#ffffff'">
                                    <i class="fas fa-plus"></i> \u0635\u0646\u0641 \u0622\u062E\u0631
                                </button>
                            </div>
                            <div style="padding: 16px;">
                                <div id="ppe-items-container" style="display: flex; flex-direction: column; gap: 12px;">
                                    <div class="ppe-item-row" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; position: relative;">
                                        <div class="grid grid-cols-1 md:grid-cols-12 gap-3" style="align-items: flex-end;">
                                            <div class="md:col-span-5">
                                                <label style="display: block; font-size: 0.7rem; font-weight: 700; color: #475569; margin-bottom: 4px;">\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629 *</label>
                                                <select id="ppe-equipment-type" required class="form-input ppe-equipment-type" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; font-size: 0.8rem; outline: none;">
                                                    <option value="">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</option>
                                                </select>
                                            </div>
                                            <div class="md:col-span-3">
                                                <label style="display: block; font-size: 0.7rem; font-weight: 700; color: #475569; margin-bottom: 4px;">\u0627\u0644\u0645\u0642\u0627\u0633</label>
                                                <select class="form-input ppe-shoe-size" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; font-size: 0.8rem; outline: none;">
                                                    <option value="">\u0627\u062E\u062A\u0631...</option>
                                                    ${[38,39,40,41,42,43,44,45,46,47,48].map(m=>`<option value="${m}" ${e?.shoeSize==m?"selected":""}>${m}</option>`).join("")}
                                                </select>
                                            </div>
                                            <div class="md:col-span-4" style="display: flex; gap: 8px; align-items: flex-end;">
                                                <div style="flex: 1;">
                                                    <label style="display: block; font-size: 0.7rem; font-weight: 700; color: #475569; margin-bottom: 4px;">\u0627\u0644\u0643\u0645\u064A\u0629 *</label>
                                                    <input type="number" id="ppe-quantity" required class="form-input ppe-quantity" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; font-size: 0.8rem; outline: none;" min="1"
                                                        value="${e?.quantity||1}">
                                                </div>
                                                <button type="button" class="ppe-remove-item hidden" style="background: #fff1f2; border: 1px solid #fecdd3; color: #e11d48; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#fecdd3'" onmouseout="this.style.background='#fff1f2'">
                                                    <i class="fas fa-trash-alt" style="font-size: 0.8rem;"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="ppe-eligibility-info hidden" style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #e2e8f0; font-size: 0.75rem;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Details Section -->
                        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); overflow: hidden;">
                            <div style="background: #fffbeb; border-bottom: 1px solid #fef3c7; padding: 10px 16px; color: #b45309; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-file-invoice"></i> \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645
                            </div>
                            <div style="padding: 16px;">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4" style="margin-bottom: 16px;">
                                    <div>
                                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${d(o("module.ppe.label.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 *"))}</label>
                                        <input type="date" id="ppe-receipt-date" required class="form-input" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 0.85rem; outline: none;"
                                            value="${e?.receiptDate?new Date(e.receiptDate).toISOString().slice(0,10):""}">
                                    </div>
                                    <div>
                                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${d(o("module.ppe.label.status","\u0627\u0644\u062D\u0627\u0644\u0629 *"))}</label>
                                        <select id="ppe-status" required class="form-input" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 0.85rem; outline: none;">
                                            <option value="\u0645\u0633\u062A\u0644\u0645" ${e?.status==="\u0645\u0633\u062A\u0644\u0645"?"selected":""}>${d(u)}</option>
                                            <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645" ${e?.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"?"selected":""}>${d(y)}</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${d(o("module.ppe.label.notes","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</label>
                                    <textarea id="ppe-notes" class="form-input" rows="2" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 0.85rem; outline: none; resize: vertical;"
                                        placeholder="\u0623\u0636\u0641 \u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0647\u0646\u0627...">${Utils.escapeHTML(e?.notes||"")}</textarea>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Fixed Footer -->
                    <div style="background: #ffffff; border-top: 1px solid #e2e8f0; padding: 14px 24px; display: flex; justify-content: flex-end; gap: 12px; flex-shrink: 0; z-index: 10;">
                        <button type="button" onclick="this.closest('.modal-overlay').remove()" style="background: #ffffff; border: 1px solid #cbd5e1; color: #475569; font-weight: 600; font-size: 0.85rem; padding: 8px 20px; border-radius: 6px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='#ffffff'">
                            ${d(o("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}
                        </button>
                        <button type="submit" style="background: #2563eb; border: none; color: #ffffff; font-weight: 600; font-size: 0.85rem; padding: 8px 24px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); transition: 0.2s;" onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
                            <i class="fas fa-save"></i> ${d(t?o("module.common.saveChanges","\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A"):o("module.ppe.btn.saveReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(s),this.applyModuleI18n(s),setTimeout(()=>{const m=document.getElementById("ppe-employee-code"),f=document.getElementById("ppe-employee-name"),b=document.getElementById("ppe-employee-dropdown"),w=document.getElementById("ppe-search-code-btn"),c=document.getElementById("ppe-employee-department"),x=document.getElementById("ppe-employee-position"),v=document.getElementById("ppe-employee-branch"),k=document.getElementById("ppe-employee-location"),B=document.getElementById("ppe-employee-info-name"),C=document.getElementById("ppe-employee-info-department"),q=document.getElementById("ppe-employee-info-position"),$=document.getElementById("ppe-employee-info-branch"),L=document.getElementById("ppe-employee-info-location"),R=AppState.appData.employees||[],z=(h,g)=>PPE._t(h,g),W=(h={})=>{B&&(B.textContent=h.name||"\u2014"),C&&(C.textContent=h.department||"\u2014"),q&&(q.textContent=h.position||"\u2014"),$&&(h.branch?($.innerHTML=`<i class="fas fa-code-branch text-slate-400 ml-1"></i>${z("module.ppe.label.branch","\u0627\u0644\u0641\u0631\u0639")}: ${Utils.escapeHTML(h.branch)}`,$.classList.remove("hidden")):($.innerHTML="",$.classList.add("hidden"))),L&&(h.location?(L.innerHTML=`<i class="fas fa-map-marker-alt text-slate-400 ml-1"></i>${z("module.ppe.label.location","\u0627\u0644\u0645\u0648\u0642\u0639")}: ${Utils.escapeHTML(h.location)}`,L.classList.remove("hidden")):(L.innerHTML="",L.classList.add("hidden")))},Q=(h,{notifySuccess:g=!1,notifyFail:T=!1}={})=>{if(!h)return T&&Notification.warning(z("module.ppe.notify.employeeNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F")),W({name:f?.value?.trim()||"\u2014",department:c?.value||"",position:x?.value||"",branch:v?.value||"",location:k?.value||""}),!1;const A=h.employeeNumber||h.employeeCode||h.sapId||h.id||"";return m&&A&&(m.value=A),f&&(f.value=h.name||""),c&&(c.value=h.department||""),x&&(x.value=h.position||""),v&&(v.value=h.branch||""),k&&(k.value=h.location||""),W({name:h.name||"\u2014",department:h.department||"",position:h.position||"",branch:h.branch||"",location:h.location||""}),g&&Notification.success(z("module.ppe.notify.employeeLoaded","\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D")),!0},te=h=>{if(!h)return null;const g=h.trim().toLowerCase();if(!g)return null;let T=null;return typeof EmployeeHelper<"u"&&typeof EmployeeHelper.findByCode=="function"&&(T=EmployeeHelper.findByCode(h)||EmployeeHelper.findByCode(g)),T||R.find(A=>[A.employeeNumber,A.employeeCode,A.sapId,A.id,A.nationalId,A.cardId].some(M=>String(M||"").trim().toLowerCase()===g))||null},E=({notify:h=!0}={})=>{const g=m?.value?.trim();if(!g)return;const T=te(g);Q(T,{notifySuccess:h,notifyFail:h})};m&&(m.addEventListener("blur",()=>E({notify:!1})),m.addEventListener("keydown",h=>{h.key==="Enter"&&(h.preventDefault(),E({notify:!0}))})),w&&w.addEventListener("click",h=>{h.preventDefault(),E({notify:!0})}),f&&b&&f.addEventListener("input",h=>{const g=h.target.value.trim();if(b.innerHTML="",b.classList.add("hidden"),g.length<2)return;const T=g.toLowerCase(),A=R.filter(M=>[M.name,M.employeeNumber,M.employeeCode,M.sapId].some(H=>String(H||"").toLowerCase().includes(T))).slice(0,12);A.length&&(A.forEach(M=>{const _=document.createElement("button");_.type="button",_.className="w-full text-right p-3 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none border-b border-gray-100 last:border-b-0";const H=document.createElement("div");H.className="font-semibold text-gray-800",H.textContent=M.name||"\u0628\u062F\u0648\u0646 \u0627\u0633\u0645";const K=document.createElement("div");K.className="text-xs text-gray-500 mt-1",K.textContent=[M.employeeNumber||M.employeeCode||M.sapId||"",M.department||"",M.position||""].filter(Boolean).join(" \u2022 "),_.appendChild(H),_.appendChild(K),_.addEventListener("click",()=>{Q(M,{notifySuccess:!1,notifyFail:!1}),b.classList.add("hidden")}),b.appendChild(_)}),b.classList.remove("hidden"))});const S=h=>{b&&!b.contains(h.target)&&f&&!f.contains(h.target)&&b.classList.add("hidden"),h.target===s&&s.remove()};s.addEventListener("click",S),W({name:p.name||f?.value?.trim()||"\u2014",department:p.department||c?.value||"",position:p.position||x?.value||"",branch:p.branch||v?.value||"",location:p.location||k?.value||""});const P=document.getElementById("ppe-items-container"),j=document.getElementById("ppe-add-item-btn"),Y=()=>{if(!P)return;const h=Array.from(P.querySelectorAll(".ppe-item-row"));h.forEach(g=>{const T=g.querySelector(".ppe-remove-item");if(!T)return;h.length===1||t?T.classList.add("hidden"):T.classList.remove("hidden")})},J=h=>{if(!P||!h)return;const g=h.querySelector(".ppe-remove-item");g&&g.addEventListener("click",()=>{Array.from(P.querySelectorAll(".ppe-item-row")).length<=1||(h.remove(),Y())})},re=()=>{if(!P)return null;const h=P.querySelector(".ppe-item-row");if(!h)return null;const g=h.cloneNode(!0),T=g.querySelector(".ppe-equipment-type");T&&(T.value="",T.id==="ppe-equipment-type"&&T.removeAttribute("id"));const A=g.querySelector(".ppe-quantity");A&&(A.value="1",A.id==="ppe-quantity"&&A.removeAttribute("id"));const M=g.querySelector(".ppe-shoe-size");M&&(M.value="");const _=g.querySelector(".ppe-eligibility-info");_&&(_.innerHTML="",_.classList.add("hidden"),_.removeAttribute("data-eligible")),P.appendChild(g),J(g),Y();const H=g.querySelector(".ppe-equipment-type");return H&&this.state.ppeItemsOptionsHTML?H.innerHTML=this.state.ppeItemsOptionsHTML:this.loadPPEItemsForDropdown(),g};P&&(Array.from(P.querySelectorAll(".ppe-item-row")).forEach(g=>J(g)),Y()),j&&(t?j.classList.add("hidden"):j.addEventListener("click",h=>{h.preventDefault(),re()})),this.loadPPEItemsForDropdown(e?.equipmentType);const se=document.getElementById("ppe-receipt-date"),ie=document.getElementById("ppe-employee-code"),xe=t&&e?.id?e.id:null,O=()=>{if(!P)return;const h=Array.from(P.querySelectorAll(".ppe-item-row")),g=(ie?.value||"").trim(),T=(se?.value||"").trim();h.forEach(A=>{const _=(A.querySelector(".ppe-equipment-type")?.value||"").trim(),H=A.querySelector(".ppe-eligibility-info");if(!H)return;const K=PPE.computeEligibility(g,_,T,{excludeId:xe});PPE.renderEligibilityInfo(H,K)})};if(se&&(se.addEventListener("change",O),se.addEventListener("input",O)),ie&&(ie.addEventListener("change",O),ie.addEventListener("blur",O)),P&&P.addEventListener("change",h=>{h.target&&h.target.classList&&h.target.classList.contains("ppe-equipment-type")&&O()}),s._refreshPPEEligibility=O,m&&(m.addEventListener("input",O),m.addEventListener("change",O)),m){let h=m.value;const g=setInterval(()=>{if(!document.body.contains(m)){clearInterval(g);return}m.value!==h&&(h=m.value,O())},300)}O(),setTimeout(O,300),setTimeout(O,1500);const le=s.querySelector("#ppe-form");le&&le.addEventListener("submit",async h=>{h.preventDefault();const g=le?.querySelector('button[type="submit"]')||h.target?.querySelector('button[type="submit"]');if(g&&g.disabled)return;let T="";g&&(T=g.innerHTML,g.disabled=!0,g.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const A=AppState.appData.ppe||[],M=new Date().getFullYear(),_=A.filter(U=>U.receiptNumber&&U.receiptNumber.startsWith(`PPE-${M}-`)).map(U=>{const X=U.receiptNumber.match(/\d+$/);return X?parseInt(X[0]):0}),H=_.length>0?Math.max(..._)+1:1,K=t&&e?.receiptNumber?e.receiptNumber:`PPE-${M}-${String(H).padStart(4,"0")}`,ce=document.getElementById("ppe-employee-name"),ae=document.getElementById("ppe-employee-code"),me=document.getElementById("ppe-employee-department"),fe=document.getElementById("ppe-employee-position"),ue=document.getElementById("ppe-employee-branch"),ye=document.getElementById("ppe-employee-location"),he=document.getElementById("ppe-items-container"),oe=document.getElementById("ppe-receipt-date"),ge=document.getElementById("ppe-status"),ve=document.getElementById("ppe-notes");if(!ce||!ae||!me||!fe||!ue||!ye||!he||!oe||!ge){Notification.error(PPE._t("module.ppe.notify.fieldsMissing","\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")),g&&(g.disabled=!1,g.innerHTML=T);return}if(!oe.value){Notification.error(PPE._t("module.ppe.notify.dateRequired","\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.")),g&&(g.disabled=!1,g.innerHTML=T);return}const pe=Array.from(he.querySelectorAll(".ppe-item-row"));if(!pe.length){Notification.error(PPE._t("module.ppe.notify.itemsRequired","\u064A\u062C\u0628 \u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0642\u0628\u0644 \u062D\u0641\u0638 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.")),g&&(g.disabled=!1,g.innerHTML=T);return}const ne=[];for(const U of pe){const X=U.querySelector(".ppe-equipment-type"),G=U.querySelector(".ppe-quantity"),D=U.querySelector(".ppe-shoe-size");if(!X||!G){Notification.error(PPE._t("module.ppe.notify.rowsIncomplete","\u0628\u0639\u0636 \u0635\u0641\u0648\u0641 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0623\u0646 \u0643\u0644 \u0635\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0646\u0648\u0639 \u0648\u0643\u0645\u064A\u0629.")),g&&(g.disabled=!1,g.innerHTML=T);return}const I=(X.value||"").trim(),N=parseInt(G.value,10)||0,F=D?(D.value||"").trim():"";if(!I){Notification.error(PPE._t("module.ppe.notify.selectEquipmentEachRow","\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629 \u0644\u0643\u0644 \u0635\u0641 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638.")),g&&(g.disabled=!1,g.innerHTML=T);return}if(N<=0){Notification.error(PPE._t("module.ppe.notify.qtyPositive","\u0627\u0644\u0643\u0645\u064A\u0629 \u0644\u0643\u0644 \u0635\u0646\u0641 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0631\u0642\u0645\u064B\u0627 \u0623\u0643\u0628\u0631 \u0645\u0646 \u0635\u0641\u0631.")),g&&(g.disabled=!1,g.innerHTML=T);return}ne.push({equipmentType:I,quantity:N,shoeSize:F})}{const U=ae.value.trim(),X=oe.value,G=t&&e?.id?e.id:null,D=[];if(ne.forEach((I,N)=>{const F=PPE.computeEligibility(U,I.equipmentType,X,{excludeId:G});if(F.hasRule&&F.hasPrevious&&!F.isEligible){D.push({index:N,item:I,result:F});const ee=pe[N];if(ee){const Z=ee.querySelector(".ppe-eligibility-info");PPE.renderEligibilityInfo(Z,F)}}}),D.length>0){const I=D[0],N=PPE.formatMonthsDays(I.result.remaining?.months||0,I.result.remaining?.days||0),F=I.result.dueDate?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(I.result.dueDate):new Date(I.result.dueDate).toLocaleDateString("ar"):"",ee=D.map(we=>we.item.equipmentType).join("\u060C "),Z=D.length===1?PPE._t("module.ppe.notify.notEligible",`\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645: \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0633\u062A\u062D\u0642 \u0644\u0635\u0646\u0641 \xAB${I.item.equipmentType}\xBB \u062D\u0627\u0644\u064A\u0627\u064B. \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642: ${F}\u060C \u0627\u0644\u0645\u062A\u0628\u0642\u064A: ${N}.`):PPE._t("module.ppe.notify.notEligibleMulti",`\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645: \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0633\u062A\u062D\u0642 \u0644\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062D\u0627\u0644\u064A\u0627\u064B (${ee}). \u0623\u0642\u0631\u0628 \u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0628\u0639\u062F: ${N}.`);Notification.error(Z),g&&(g.disabled=!1,g.innerHTML=T);return}}const de=typeof AppState<"u"&&AppState.currentUser?AppState.currentUser:{},V=de.name||de.username||de.email||"\u2014",be={receiptNumber:K,employeeName:ce.value.trim(),employeeCode:ae.value.trim(),employeeNumber:ae.value.trim(),employeeDepartment:me.value.trim(),employeePosition:fe.value.trim(),employeeBranch:ue.value.trim(),employeeLocation:ye.value.trim(),receiptDate:new Date(oe.value).toISOString(),status:ge.value,notes:(ve?.value||"").trim(),createdBy:t&&(e?.createdBy||e?.createdByUser)||V,createdByUser:t&&(e?.createdByUser||e?.createdBy)||V,recordedBy:t&&(e?.recordedBy||e?.createdBy)||V};try{const U=Array.isArray(AppState.appData.ppe)?[...AppState.appData.ppe]:[];let X=[],G=null;if(t){const D=AppState.appData.ppe.findIndex(I=>I.id===e.id);if(D!==-1){const I=ne[0]||{equipmentType:"",quantity:0,shoeSize:""},N=AppState.appData.ppe[D]||{},F={...N,...be,equipmentType:I.equipmentType,quantity:I.quantity,shoeSize:I.shoeSize,createdAt:N.createdAt||e?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.ppe[D]=F,G=F}}else{const D=AppState.appData.ppe||[],I=[];ne.forEach(N=>{const F=D.concat(I),Z={id:Utils.generateSequentialId("PPE",F),...be,equipmentType:N.equipmentType,quantity:N.quantity,shoeSize:N.shoeSize,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};I.push(Z),AppState.appData.ppe.push(Z)}),X=I}if(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)if(t){if(!G)throw new Error("\u062A\u0639\u0630\u0631 \u062A\u062C\u0647\u064A\u0632 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0644\u0644\u062D\u0641\u0638 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645.");const D=await GoogleIntegration.sendToAppsScript("updatePPE",{ppeId:G.id,updateData:G});if(!D||D.success!==!0)throw new Error(D?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")}else for(const D of X){const I=await GoogleIntegration.sendToAppsScript("addPPE",D);if(!I||I.success!==!0)throw new Error(I?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),s.remove(),Notification.success(t?PPE._t("module.ppe.notify.updateSuccess","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D"):PPE._t("module.ppe.notify.saveSuccess","\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")),g&&(g.disabled=!1,g.innerHTML=T),this.refreshActiveTab({skipRemote:!0}),GoogleIntegration.autoSave("PPE",AppState.appData.ppe).catch(D=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",D)})}catch(U){typeof previousPpeSnapshot<"u"&&(AppState.appData.ppe=previousPpeSnapshot,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()),Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")+": "+(U.message||U)),g&&(g.disabled=!1,g.innerHTML=T)}})},200)},async loadPPEItemsForDropdown(e=null){const t=document.getElementById("ppe-equipment-type")||document.querySelector(".ppe-equipment-type");if(t)try{const s=Date.now(),i=this.state.ppeItemsListCache&&this.state.ppeItemsListCacheTime&&s-this.state.ppeItemsListCacheTime<this.state.ppeItemsListCacheExpiry;let a=[];if(i)a=Array.isArray(this.state.ppeItemsListCache)?this.state.ppeItemsListCache:[];else if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const p=await GoogleIntegration.sendToAppsScript("getPPEItemsList",{});p&&p.success&&p.data&&(a=p.data,this.state.ppeItemsListCache=a,this.state.ppeItemsListCacheTime=s)}if(a.length===0){const p=AppState.appData.ppe||[];a=[...new Set(p.map(o=>o.equipmentType).filter(Boolean))].map(o=>({itemName:o,itemCode:""}))}t.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>',a.forEach(p=>{const l=(p.itemName||"").trim();if(!l)return;const o=document.createElement("option");o.value=l,o.textContent=p.itemCode?`${p.itemCode} - ${l}`:l,e&&(l===e||p.itemCode===e)&&(o.selected=!0),t.appendChild(o)});const r=t.innerHTML;this.state.ppeItemsOptionsHTML=r,document.querySelectorAll(".ppe-equipment-type").forEach(p=>{if(p===t)return;const l=p.value;p.innerHTML=r,l&&(p.value=l)})}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629:",s),t.innerHTML=this.state.ppeItemsOptionsHTML||'<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>';const i=t.innerHTML;document.querySelectorAll(".ppe-equipment-type").forEach(r=>{if(r===t)return;const n=r.value;r.innerHTML=i,n&&(r.value=n)})}},async viewPPE(e){const t=AppState.appData.ppe.find(l=>l.id===e);if(!t)return;const s=(l,o)=>this._t(l,o),i=l=>Utils.escapeHTML(l),a=this.getDisplayStatus(t.status),r=t.createdBy||t.createdByUser||t.recordedBy||t.recorderName||t.user||"\u2014",n=document.createElement("div");n.className="modal-overlay";const p=String(t.id||"").replace(/\\/g,"\\\\").replace(/'/g,"\\'");n.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header" style="text-align: center; position: relative;">
                    <h2 class="modal-title" style="margin: 0 auto; text-align: center;">${i(s("module.ppe.title.viewReceipt","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%);">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.receiptNo","\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644"))}:</label>
                                <p class="text-gray-800 font-mono font-semibold text-lg">${Utils.escapeHTML(t.receiptNumber||t.id||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeName||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeCode||t.employeeNumber||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.createdBy","\u0645\u0633\u062C\u0651\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}:</label>
                                <p class="text-gray-800 font-semibold text-blue-700"><i class="fas fa-user-edit text-blue-500 ml-1"></i>${Utils.escapeHTML(r)}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.department","\u0627\u0644\u0642\u0633\u0645"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeDepartment||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.position","\u0627\u0644\u0645\u0646\u0635\u0628"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeePosition||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.branch","\u0627\u0644\u0641\u0631\u0639"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeBranch||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.location","\u0627\u0644\u0645\u0648\u0642\u0639"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeLocation||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.equipmentType||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.quantity","\u0627\u0644\u0643\u0645\u064A\u0629"))}:</label>
                                <p class="text-gray-800">${t.quantity||0}</p>
                            </div>
                            ${t.shoeSize?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0642\u0627\u0633 \u0627\u0644\u062D\u0630\u0627\u0621:</label>
                                <p class="text-gray-800 font-bold"><i class="fas fa-shoe-prints text-blue-600 ml-1"></i>${Utils.escapeHTML(t.shoeSize)}</p>
                            </div>
                            `:""}
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}:</label>
                                <p class="text-gray-800">${t.receiptDate?Utils.formatDate(t.receiptDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}:</label>
                                <span class="badge badge-${this.isStatusReceived(t.status)?"success":"warning"}">
                                    ${i(a)}
                                </span>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.notes","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}:</label>
                            <p class="text-gray-800 whitespace-pre-wrap">${Utils.escapeHTML(t.notes||s("module.ppe.notes.none","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="display: flex; justify-content: center; gap: 10px;">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${i(s("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}</button>
                    <button class="btn-success" onclick="PPE.exportPDF('${p}');">
                        <i class="fas fa-file-pdf ml-2"></i>${i(s("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF"))}
                    </button>
                    <button class="btn-primary" onclick="PPE.showPPEForm(${JSON.stringify(t).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>${i(s("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}
                    </button>
                    <button class="btn-danger" onclick="PPE.deletePPE('${p}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-trash ml-2"></i>${i(s("module.ppe.btn.deleteReceipt","\u062D\u0630\u0641"))}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n),this.applyModuleI18n(n),n.addEventListener("click",l=>{l.target===n&&n.remove()})},async deletePPE(e){if(!e){Notification.error(this._t("module.ppe.notify.idMissing","\u0645\u0639\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}const t=AppState.appData.ppe.find(i=>i.id===e);if(!t){Notification.error(this._t("module.ppe.notify.receiptNotFound","\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}const s=`${this._t("module.ppe.confirm.delete","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u061F")}

${t.receiptNumber||t.id} \u2014 ${t.employeeName||""}`;if(confirm(s)){Loading.show();try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const i=await GoogleIntegration.sendToAppsScript("deletePPE",{ppeId:e});i&&i.success?(AppState.appData.ppe&&(AppState.appData.ppe=AppState.appData.ppe.filter(a=>a.id!==e)),Notification.success(this._t("module.ppe.notify.deleteSuccess","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")),await this.load()):Notification.error(i?.message||this._t("module.ppe.notify.deleteError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}else AppState.appData.ppe?(AppState.appData.ppe=AppState.appData.ppe.filter(i=>i.id!==e),Notification.success(this._t("module.ppe.notify.deleteSuccess","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")),await this.load()):Notification.error(this._t("module.ppe.empty.noReceipts","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A"))}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645:",i),Notification.error(this._t("module.ppe.notify.deleteError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645")+": "+(i.message||i))}finally{Loading.hide()}}},async exportPDF(e){const t=AppState.appData.ppe.find(s=>s.id===e);if(!t){Notification.error(this._t("module.ppe.notify.receiptNotFound","\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}try{Loading.show();const s=t.receiptNumber||`PPE-${t.id?.substring(0,8)||"UNKNOWN"}`,i=y=>Utils.escapeHTML(y||""),a=y=>y?Utils.formatDate(y):"-",r=t.createdBy||t.createdByUser||t.recordedBy||t.recorderName||t.user||"\u2014",n=`
                <table>
                    <tr><th>\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644</th><td>${i(t.receiptNumber||t.id)}</td></tr>
                    <tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th><td>${i(t.employeeName)}</td></tr>
                    <tr><th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><td>${i(t.employeeCode||t.employeeNumber)}</td></tr>
                    <tr><th>\u0627\u0644\u0642\u0633\u0645</th><td>${i(t.employeeDepartment)}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0646\u0635\u0628</th><td>${i(t.employeePosition)}</td></tr>
                    <tr><th>\u0627\u0644\u0641\u0631\u0639</th><td>${i(t.employeeBranch)}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639</th><td>${i(t.employeeLocation)}</td></tr>
                    <tr><th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629</th><td>${i(t.equipmentType)}</td></tr>
                    <tr><th>\u0627\u0644\u0643\u0645\u064A\u0629</th><td>${t.quantity||0}</td></tr>
                    <tr><th>\u0645\u0633\u062C\u0651\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645</th><td>${i(r)}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645</th><td>${a(t.receiptDate)}</td></tr>
                    <tr><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><td>${i(t.status)}</td></tr>
                </table>
            `,p={type:"PPE",id:t.id,code:s,url:`${window.location.origin}/ppe/${t.id}`},l=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(s,this._t("module.ppe.pdf.receiptTitle","\u0625\u064A\u0635\u0627\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"),n,!1,!0,{version:"1.0",releaseDate:t.receiptDate||t.createdAt,revisionDate:t.updatedAt||t.receiptDate||t.createdAt,qrData:p},t.createdAt,t.updatedAt||t.receiptDate||t.createdAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>${Utils.escapeHTML(this._t("module.ppe.pdf.pageTitle","\u0625\u064A\u0635\u0627\u0644 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"))}</title></head><body>${n}</body></html>`,o=new Blob([l],{type:"text/html;charset=utf-8"}),d=URL.createObjectURL(o),u=window.open(d,"_blank");u?u.onload=()=>{setTimeout(()=>{u.print(),setTimeout(()=>{URL.revokeObjectURL(d),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error(this._t("module.ppe.notify.pdfBlocked","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")))}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645:",s),Notification.error(this._t("module.ppe.notify.pdfError","\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF")+": "+s.message)}},async showPPEMatrix(){const e=(r,n)=>this._t(r,n),t=r=>Utils.escapeHTML(r),s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
        `,document.body.appendChild(s),this.applyModuleI18n(s);const i=document.getElementById("ppe-matrix-search");i&&i.addEventListener("input",r=>{this.filterPPEMatrix(r.target.value.trim())});const a=document.getElementById("add-ppe-matrix-btn");a&&a.addEventListener("click",()=>{this.showAddPPEMatrixForm()}),s.addEventListener("click",r=>{r.target===s&&s.remove()})},async renderPPEMatrix(){const e=(n,p)=>this._t(n,p),t=n=>Utils.escapeHTML(n),s=AppState.appData.employees||[],i=AppState.appData.employeePPEMatrixByCode||{},a=AppState.appData.ppe||[];if(s.length===0)return`
                <div class="empty-state">
                    <i class="fas fa-table text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${t(e("module.ppe.empty.matrixNoEmployees","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646"))}</p>
                </div>
            `;const r=s.map(n=>{const p=n.employeeNumber||n.sapId||"",l=n.name||n.employeeName||"-",o=n.position||e("module.ppe.label.undefinedDept","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),d=n.department||"-",u=i[p]||[],y=a.filter(f=>f.employeeCode===p||f.employeeNumber===p),m=[...new Set(y.map(f=>f.equipmentType).filter(Boolean))];return{code:p,name:l,position:o,department:d,requiredPPE:u,receivedPPE:m}});return`
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
                        ${r.map(n=>{const p=n.requiredPPE.length>0?n.requiredPPE.map(o=>`<span class="badge badge-success mr-1 mb-1">${Utils.escapeHTML(o)}</span>`).join(""):`<span class="text-gray-500 text-sm">${t(e("module.ppe.matrix.notSet","\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F"))}</span>`,l=n.receivedPPE.length>0?n.receivedPPE.map(o=>`<span class="badge badge-info mr-1 mb-1">${Utils.escapeHTML(o)}</span>`).join(""):`<span class="text-gray-500 text-sm">${t(e("module.ppe.matrix.noneReceived","\u0644\u0627 \u062A\u0648\u062C\u062F"))}</span>`;return`
                                <tr data-employee-code="${Utils.escapeHTML(n.code)}" data-employee-name="${Utils.escapeHTML(n.name)}" data-position="${Utils.escapeHTML(n.position)}">
                                    <td><strong class="font-mono">${Utils.escapeHTML(n.code||"-")}</strong></td>
                                    <td>${Utils.escapeHTML(n.name)}</td>
                                    <td>${Utils.escapeHTML(n.position)}</td>
                                    <td>${Utils.escapeHTML(n.department)}</td>
                                    <td>
                                        <div class="flex flex-wrap gap-1">
                                            ${p}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex flex-wrap gap-1">
                                            ${l}
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
        `},filterPPEMatrix(e){const t=document.querySelector("#ppe-matrix-content tbody");if(!t)return;t.querySelectorAll("tr[data-employee-code]").forEach(i=>{const a=i.getAttribute("data-employee-code")||"",r=i.getAttribute("data-employee-name")||"",n=i.getAttribute("data-position")||"",p=e.toLowerCase();!e||a.toLowerCase().includes(p)||r.toLowerCase().includes(p)||n.toLowerCase().includes(p)?i.style.display="":i.style.display="none"})},async showAddPPEMatrixForm(e=null){const t=!!e,s=AppState.appData.employeePPEMatrix||{},i=AppState.appData.ppe||[],a=[...new Set(i.map(c=>c.equipmentType).filter(Boolean))],r=AppState.appData.employees||[],n=[...new Set(r.map(c=>c.position).filter(Boolean))],p=e?s[e]:null,l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
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
                                        ${n.map(c=>`
                                            <option value="${Utils.escapeHTML(c)}" ${s[c]?"disabled":""}>${Utils.escapeHTML(c)}${s[c]?" (\u0645\u0648\u062C\u0648\u062F\u0629 \u0628\u0627\u0644\u0641\u0639\u0644)":""}</option>
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
                                    ${a.map((c,x)=>`
                                        <label class="flex items-center p-2 border rounded cursor-pointer hover:bg-blue-50 transition-colors">
                                            <input type="checkbox" name="ppe-type" value="${Utils.escapeHTML(c)}" 
                                                ${p&&p.requiredPPE&&p.requiredPPE.includes(c)?"checked":""}
                                                class="ml-2 rounded border-gray-300 text-blue-600">
                                            <span class="text-sm font-medium">${Utils.escapeHTML(c)}</span>
                                        </label>
                                    `).join("")}
                                    ${a.length===0?`
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
        `,document.body.appendChild(l);let o=!1;const d=l.querySelector('[data-action="close"]'),u=l.querySelector(".modal-close"),y=()=>{o&&!w&&!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0644\u062F\u064A\u0643 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062F\u0648\u0646 \u062D\u0641\u0638\u061F`)||l.remove()};d&&d.addEventListener("click",y),u&&u.addEventListener("click",y);const m=document.getElementById("ppe-matrix-position"),f=document.getElementById("ppe-matrix-position-custom");m&&f&&m.addEventListener("change",()=>{m.value==="__custom__"?(f.style.display="block",f.required=!0):(f.style.display="none",f.required=!1)});const b=l.querySelector("#ppe-matrix-form");let w=!1;b.addEventListener("change",()=>{o=!0}),b.addEventListener("input",()=>{o=!0}),b.addEventListener("submit",async c=>{if(c.preventDefault(),w)return;const x=t?e:m?.value==="__custom__"?f?.value.trim():m?.value;if(!x){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u0629");return}const v=Array.from(b.querySelectorAll('input[name="ppe-type"]:checked')).map(C=>C.value);if(v.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0648\u0642\u0627\u064A\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}w=!0;const k=b.querySelector('button[type="submit"]'),B=k?.innerHTML;k&&(k.disabled=!0,k.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const C=r.filter($=>$.position===x).map($=>$.employeeNumber||$.sapId||"");AppState.appData.employeePPEMatrix||(AppState.appData.employeePPEMatrix={});const q=AppState.appData.employeePPEMatrix[x]||{};AppState.appData.employeePPEMatrix[x]={requiredPPE:v,employees:C,updatedAt:new Date().toISOString(),createdAt:q?.createdAt||new Date().toISOString()},AppState.appData.employeePPEMatrixByCode||(AppState.appData.employeePPEMatrixByCode={}),C.forEach($=>{$&&(AppState.appData.employeePPEMatrixByCode[$]||(AppState.appData.employeePPEMatrixByCode[$]=[]),v.forEach(L=>{AppState.appData.employeePPEMatrixByCode[$].includes(L)||AppState.appData.employeePPEMatrixByCode[$].push(L)}))}),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),o=!1,Notification.success("\u062A\u0645 "+(t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629")+' \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0644\u0644\u0648\u0638\u064A\u0641\u0629 "'+x+'" \u0628\u0646\u062C\u0627\u062D'),l.remove(),this.showPPEMatrix(),Promise.allSettled([GoogleIntegration.autoSave("PPEMatrix",AppState.appData.employeePPEMatrix).catch($=>(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",$),{success:!1,error:$})),GoogleIntegration.autoSave("EmployeePPEMatrixByCode",AppState.appData.employeePPEMatrixByCode).catch($=>(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A Google Sheets:",$),{success:!1,error:$}))]).then($=>{$.every(R=>R.status==="fulfilled")||Utils.safeWarn("\u26A0\uFE0F \u0628\u0639\u0636 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0645 \u062A\u0643\u062A\u0645\u0644 \u0628\u0646\u062C\u0627\u062D\u060C \u0644\u0643\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B")}).catch($=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",$)})}catch(C){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+C.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629:",C),k&&(k.disabled=!1,k.innerHTML=B),w=!1}}),l.addEventListener("click",c=>{if(c.target===l){if(o&&!w&&!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0644\u062F\u064A\u0643 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062F\u0648\u0646 \u062D\u0641\u0638\u061F`))return;l.remove()}})},async editPPEMatrix(e){this.showAddPPEMatrixForm(e)},async editEmployeePPEMatrix(e){const s=(AppState.appData.employees||[]).find(u=>(u.employeeNumber||u.sapId)===e);if(!s){Notification.error("\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const a=(AppState.appData.employeePPEMatrixByCode||{})[e]||[],r=AppState.appData.ppe||[],n=[...new Set(r.map(u=>u.equipmentType).filter(Boolean))],p=["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","\u0642\u0641\u0627\u0632\u0627\u062A","\u0623\u062D\u0630\u064A\u0629 \u0623\u0645\u0627\u0646","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0633\u062F\u0627\u062F\u0627\u062A \u0623\u0630\u0646","\u0643\u0645\u0627\u0645\u0629","\u0628\u062F\u0644\u0629 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u0645\u0639\u062F\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u062A\u0646\u0641\u0633\u064A\u0629"],l=[...new Set([...p,...n])],o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
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
                                    ${l.map((u,y)=>`
                                        <label class="flex items-center p-2 border rounded cursor-pointer hover:bg-blue-50 transition-colors">
                                            <input type="checkbox" name="ppe-type" value="${Utils.escapeHTML(u)}" 
                                                ${a.includes(u)?"checked":""}
                                                class="ml-2 rounded border-gray-300 text-blue-600">
                                            <span class="text-sm font-medium">${Utils.escapeHTML(u)}</span>
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
        `,document.body.appendChild(o);const d=o.querySelector("#employee-ppe-matrix-form");d.addEventListener("submit",async u=>{u.preventDefault();const y=d.querySelectorAll('input[name="ppe-type"]:checked'),m=Array.from(y).map(f=>f.value);try{AppState.appData.employeePPEMatrixByCode||(AppState.appData.employeePPEMatrixByCode={}),AppState.appData.employeePPEMatrixByCode[e]=m,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0644\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),o.remove();const f=document.getElementById("ppe-matrix-content");f&&(f.innerHTML=await this.renderPPEMatrix()),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&GoogleIntegration.autoSave("EmployeePPEMatrixByCode",AppState.appData.employeePPEMatrixByCode).catch(b=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",b)})}catch(f){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+f.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629:",f)}}),o.addEventListener("click",u=>{u.target===o&&o.remove()})},async viewPositionEmployees(e){const s=(AppState.appData.employeePPEMatrix||{})[e],a=(AppState.appData.employees||[]).filter(l=>l.position===e),r=document.createElement("div");r.className="modal-overlay";const n=s&&s.requiredPPE?s.requiredPPE.map(l=>`<span class="badge badge-success mr-2">${Utils.escapeHTML(l)}</span>`).join(""):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F";let p="";a.length>0?p=`
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
                            ${a.map(l=>{const o=l.employeeNumber||l.sapId||"",d=(AppState.appData.ppe||[]).filter(b=>b.employeeCode===o||b.employeeNumber===o),y=(AppState.appData.employeePPEMatrixByCode||{})[o]||[],m=d.length>0?d.map(b=>`<span class="badge badge-info">${Utils.escapeHTML(b.equipmentType||"")}</span>`).join(""):'<span class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F</span>',f=y.length>0?y.map(b=>`<span class="badge badge-success">${Utils.escapeHTML(b)}</span>`).join(""):'<span class="text-gray-500 text-sm">\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F</span>';return`
                                    <tr>
                                        <td><strong>${Utils.escapeHTML(o||"-")}</strong></td>
                                        <td>${Utils.escapeHTML(l.name||"-")}</td>
                                        <td>${Utils.escapeHTML(l.department||"-")}</td>
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
                                                    ${m}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                `}).join("")}
                        </tbody>
                    </table>
                </div>
            `:p=`
                <div class="empty-state">
                    <i class="fas fa-users text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u064A\u0646 \u0628\u0647\u0630\u0647 \u0627\u0644\u0648\u0638\u064A\u0641\u0629</p>
                </div>
            `,r.innerHTML=`
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
                    ${p}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(r),r.addEventListener("click",l=>{l.target===r&&r.remove()})},_ppeReceiptExcelFieldDefs(){return[{key:"id",ar:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0633\u062C\u0644",en:"id"},{key:"receiptNumber",ar:"\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644",en:"receiptNumber"},{key:"employeeName",ar:"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",en:"employeeName"},{key:"employeeCode",ar:"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A",en:"employeeCode"},{key:"employeeDepartment",ar:"\u0627\u0644\u0642\u0633\u0645",en:"employeeDepartment"},{key:"equipmentType",ar:"\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629",en:"equipmentType"},{key:"quantity",ar:"\u0627\u0644\u0643\u0645\u064A\u0629",en:"quantity"},{key:"receiptDate",ar:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",en:"receiptDate"},{key:"status",ar:"\u0627\u0644\u062D\u0627\u0644\u0629",en:"status"}]},_ppeStockExcelFieldDefs(){return[{key:"itemId",ar:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641",en:"itemId"},{key:"itemCode",ar:"\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641",en:"itemCode"},{key:"itemName",ar:"\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641",en:"itemName"},{key:"category",ar:"\u0627\u0644\u0641\u0626\u0629",en:"category"},{key:"stock_IN",ar:"\u0627\u0644\u0648\u0627\u0631\u062F",en:"stock_IN"},{key:"stock_OUT",ar:"\u0627\u0644\u0645\u0646\u0635\u0631\u0641",en:"stock_OUT"},{key:"balance",ar:"\u0627\u0644\u0631\u0635\u064A\u062F",en:"balance"},{key:"minThreshold",ar:"\u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628",en:"minThreshold"},{key:"supplier",ar:"\u0627\u0644\u0645\u0648\u0631\u062F",en:"supplier"}]},_ppeBuildHeaderAliasMap(e){const t={};return e.forEach(s=>{t[String(s.ar||"").trim()]=s.key,t[String(s.en||"").trim().toLowerCase()]=s.key}),t},_ppeFormatCellForExcel(e){if(e==null)return"";if(e instanceof Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${i}`}if(typeof e=="object"&&e!==null&&typeof e.toISOString=="function")try{const t=new Date(e);if(!isNaN(t.getTime()))return this._ppeFormatCellForExcel(t)}catch{}return e},async exportReceiptsExcel(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}Loading.show(this._t("module.ppe.excel.exportingReceipts","\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A\u2026"));const e=this._ppeReceiptExcelFieldDefs(),s=this.getFilteredPpeReceipts(AppState.appData.ppe||[]).map(n=>{const p={};return e.forEach(l=>{let o=n[l.key];l.key==="receiptDate"?o=this._ppeFormatCellForExcel(o||n.receiptDate):l.key==="quantity"&&(o=o!=null?Number(o):""),p[l.ar]=o??""}),p}),i=XLSX.utils.json_to_sheet(s.length?s:[e.reduce((n,p)=>(n[p.ar]="",n),{})]),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,i,this._t("module.ppe.excel.sheetReceipts","\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"));const r=new Date().toISOString().slice(0,10);XLSX.writeFile(a,`PPE_\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A_${r}.xlsx`),Loading.hide(),Notification.success(this._t("module.ppe.excel.exportReceiptsOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"))}catch(e){Loading.hide(),Utils.safeError("exportReceiptsExcel",e),Notification.error(this._t("module.ppe.excel.exportErr","\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")+": "+(e.message||e))}},downloadReceiptsExcelTemplate(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=this._ppeReceiptExcelFieldDefs().map(a=>a.ar),s=XLSX.utils.aoa_to_sheet([t]),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,s,this._t("module.ppe.excel.sheetReceipts","\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A")),XLSX.writeFile(i,`PPE_\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success(this._t("module.ppe.excel.templateDownloadOk","\u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}catch(e){Notification.error(this._t("module.ppe.excel.templateErr","\u0641\u0634\u0644 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628")+": "+e.message)}},async importReceiptsExcel(e){if(!e)return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=this._ppeReceiptExcelFieldDefs(),s=this._ppeBuildHeaderAliasMap(t);try{Loading.show(this._t("module.ppe.excel.importingReceipts","\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A\u2026"));const i=await e.arrayBuffer(),a=XLSX.read(i,{type:"array",cellDates:!0}),r=a.Sheets[a.SheetNames[0]],n=XLSX.utils.sheet_to_json(r,{header:1,defval:"",raw:!1});if(!n||n.length<2){Loading.hide(),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const l=(n[0]||[]).map(f=>String(f||"").trim()).map(f=>s[f]||s[String(f||"").trim().toLowerCase()]||""),o=Array.isArray(AppState.appData.ppe)?AppState.appData.ppe:[],d=new Set(o.map(f=>String(f&&(f.id||f.receiptNumber)||"").trim()).filter(Boolean));let u=0,y=0;const m=[];for(let f=1;f<n.length;f++){const b=n[f];if(!b||!b.some(x=>String(x||"").trim()!==""))continue;const w={};if(l.forEach((x,v)=>{if(!x)return;let k=b[v];if(k instanceof Date)w[x]=k.toISOString();else if(x==="quantity")w[x]=parseFloat(String(k).replace(/,/g,""))||0;else if(x==="receiptDate"&&k!==""&&k!==null&&k!==void 0){const B=k instanceof Date?k:new Date(k);w[x]=isNaN(B.getTime())?String(k):B.toISOString()}else w[x]=k!=null?String(k).trim():""}),!w.equipmentType||!w.employeeName){y++;continue}!w.quantity&&w.quantity!==0&&(w.quantity=1),w.status||(w.status="\u0645\u0633\u062A\u0644\u0645");const c=String(w.id||w.receiptNumber||"").trim();if(c&&d.has(c)){m.push({row:f+1,id:c,label:`${w.employeeName} \u2014 ${w.equipmentType}`});continue}try{const x={...w};delete x.id;const v=await GoogleIntegration.sendToAppsScript("addPPE",x);v&&v.success?(u++,c&&d.add(c)):y++}catch(x){y++,Utils.safeWarn("\u0635\u0641 \u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u0634\u0644:",x)}}Loading.hide(),this.clearCache(),await this.refreshActiveTab(),this._reportImportSummary({scope:"receipts",ok:u,fail:y,duplicates:m})}catch(i){Loading.hide(),Utils.safeError("importReceiptsExcel",i),Notification.error(this._t("module.ppe.excel.importErr","\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F")+": "+(i.message||i))}},async exportStockExcel(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}Loading.show(this._t("module.ppe.excel.exportingStock","\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"));const e=this._ppeStockExcelFieldDefs(),s=this.getFilteredStockItems(this._getCurrentStockItems()).map(r=>{const n={};return e.forEach(p=>{let l=r[p.key];p.key==="lastUpdate"?l=this._ppeFormatCellForExcel(l):["stock_IN","stock_OUT","balance","minThreshold"].includes(p.key)&&(l=l!=null&&l!==""?Number(l):""),n[p.ar]=l??""}),n}),i=XLSX.utils.json_to_sheet(s.length?s:[e.reduce((r,n)=>(r[n.ar]="",r),{})]),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,i,this._t("module.ppe.excel.sheetStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629")),XLSX.writeFile(a,`PPE_\u0645\u062E\u0632\u0648\u0646_${new Date().toISOString().slice(0,10)}.xlsx`),Loading.hide(),Notification.success(this._t("module.ppe.excel.exportStockOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0644\u0645\u062E\u0632\u0648\u0646"))}catch(e){Loading.hide(),Utils.safeError("exportStockExcel",e),Notification.error(this._t("module.ppe.excel.exportErr","\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")+": "+(e.message||e))}},downloadStockExcelTemplate(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=this._ppeStockExcelFieldDefs().filter(a=>!["stock_IN","stock_OUT","balance"].includes(a.key)).map(a=>a.ar),s=XLSX.utils.aoa_to_sheet([t]),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,s,this._t("module.ppe.excel.sheetStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629")),XLSX.writeFile(i,`PPE_\u0642\u0627\u0644\u0628_\u0645\u062E\u0632\u0648\u0646_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success(this._t("module.ppe.excel.templateDownloadOk","\u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}catch(e){Notification.error(this._t("module.ppe.excel.templateErr","\u0641\u0634\u0644 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628")+": "+e.message)}},async importStockExcel(e){if(!e)return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=this._ppeStockExcelFieldDefs(),s=this._ppeBuildHeaderAliasMap(t);try{Loading.show(this._t("module.ppe.excel.importingStock","\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"));const i=await e.arrayBuffer(),a=XLSX.read(i,{type:"array",cellDates:!0}),r=a.Sheets[a.SheetNames[0]],n=XLSX.utils.sheet_to_json(r,{header:1,defval:"",raw:!1});if(!n||n.length<2){Loading.hide(),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const l=(n[0]||[]).map(c=>String(c||"").trim()).map(c=>s[c]||s[String(c||"").trim().toLowerCase()]||"");let o=this._getCurrentStockItems();if(!Array.isArray(o)||o.length===0)try{o=await this.loadStockItems(!0)}catch{o=this._getCurrentStockItems()||[]}const d=c=>String(c??"").trim().toLowerCase(),u=new Set,y=new Set,m=new Set;(o||[]).forEach(c=>{c&&(c.itemCode&&u.add(d(c.itemCode)),c.itemName&&y.add(d(c.itemName)),c.itemId&&m.add(String(c.itemId).trim()))});let f=0,b=0;const w=[];for(let c=1;c<n.length;c++){const x=n[c];if(!x||!x.some(L=>String(L||"").trim()!==""))continue;const v={};if(l.forEach((L,R)=>{if(!L)return;let z=x[R];["stock_IN","stock_OUT","balance","minThreshold"].includes(L)?v[L]=parseFloat(String(z).replace(/,/g,""))||0:v[L]=z!=null?String(z).trim():""}),!v.itemCode||!v.itemName){b++;continue}const k=d(v.itemCode),B=d(v.itemName),C=v.itemId&&String(v.itemId).trim();let q="";if(C&&m.has(C)?q="itemId":u.has(k)?q="itemCode":y.has(B)&&(q="itemName"),q){w.push({row:c+1,code:v.itemCode,name:v.itemName,reason:q});continue}const $={itemCode:v.itemCode,itemName:v.itemName,category:v.category||"",minThreshold:v.minThreshold!==void 0?v.minThreshold:0,supplier:v.supplier||""};v.stock_IN!==void 0&&($.stock_IN=v.stock_IN),v.stock_OUT!==void 0&&($.stock_OUT=v.stock_OUT),v.balance!==void 0&&($.balance=v.balance);try{const L=await GoogleIntegration.sendToAppsScript("addOrUpdatePPEStockItem",$);if(L&&L.success)f++,u.add(k),y.add(B);else{const R=L&&L.message?String(L.message):"";/موجود|exists/i.test(R)?w.push({row:c+1,code:v.itemCode,name:v.itemName,reason:"backend"}):b++}}catch(L){b++,Utils.safeWarn("\u0635\u0641 \u0645\u062E\u0632\u0648\u0646 \u0641\u0634\u0644:",L)}}Loading.hide(),this.clearCache(),await this.refreshActiveTab(),this._reportImportSummary({scope:"stock",ok:f,fail:b,duplicates:w})}catch(i){Loading.hide(),Utils.safeError("importStockExcel",i),Notification.error(this._t("module.ppe.excel.importErr","\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F")+": "+(i.message||i))}},_reportImportSummary({scope:e,ok:t,fail:s,duplicates:i}){const a=(l,o)=>this._t(l,o),r=i&&i.length||0,p=`${e==="receipts"?this._t("module.ppe.excel.importReceiptsSummary","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"):this._t("module.ppe.excel.importStockSummary","\u0627\u0643\u062A\u0645\u0644 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646")}: ${t} ${this._t("module.ppe.excel.ok","\u0646\u062C\u0627\u062D")}\u060C ${r} ${this._t("module.ppe.excel.duplicates","\u0645\u0643\u0631\u0651\u0631 (\u062A\u0645 \u062A\u062C\u0627\u0648\u0632\u0647)")}\u060C ${s} ${this._t("module.ppe.excel.fail","\u062A\u062E\u0637\u064A/\u0641\u0634\u0644")}.`;if(r>0){try{Notification.warning(p)}catch{}this._showDuplicatesModal(e,i)}else if(t>0)try{Notification.success(p)}catch{}else try{Notification.warning(p)}catch{}},_showDuplicatesModal(e,t){const s=(d,u)=>this._t(d,u),i=d=>Utils.escapeHTML(d),a=e==="receipts",r=a?s("module.ppe.excel.duplicatesReceiptsTitle","\u0628\u0646\u0648\u062F \u0645\u0643\u0631\u0651\u0631\u0629 \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A (\u0644\u0645 \u062A\u064F\u0633\u062A\u0648\u0631\u062F)"):s("module.ppe.excel.duplicatesStockTitle","\u0623\u0635\u0646\u0627\u0641 \u0645\u0643\u0631\u0651\u0631\u0629 \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646 (\u0644\u0645 \u062A\u064F\u0633\u062A\u0648\u0631\u062F)"),n=d=>d==="itemCode"?s("module.ppe.excel.dupReasonCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"):d==="itemName"?s("module.ppe.excel.dupReasonName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"):d==="itemId"?s("module.ppe.excel.dupReasonId","\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"):d==="backend"?s("module.ppe.excel.dupReasonBackend","\u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644 (\u062A\u0645 \u0631\u0641\u0636\u0647 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645)"):s("module.ppe.excel.dupReasonGeneric","\u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"),p=(t||[]).map(d=>a?`<tr>
                    <td>${i(d.row)}</td>
                    <td>${i(d.id||"")}</td>
                    <td>${i(d.label||"")}</td>
                </tr>`:`<tr>
                <td>${i(d.row)}</td>
                <td class="font-mono font-semibold">${i(d.code||"")}</td>
                <td>${i(d.name||"")}</td>
                <td>${i(n(d.reason))}</td>
            </tr>`).join(""),l=a?`<tr><th>${i(s("module.ppe.excel.dupCol.row","\u0627\u0644\u0635\u0641"))}</th><th>${i(s("module.ppe.excel.dupCol.idOrReceipt","\u0627\u0644\u0645\u0639\u0631\u0641/\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644"))}</th><th>${i(s("module.ppe.excel.dupCol.summary","\u0627\u0644\u0645\u0648\u0638\u0641 \u2014 \u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}</th></tr>`:`<tr><th>${i(s("module.ppe.excel.dupCol.row","\u0627\u0644\u0635\u0641"))}</th><th>${i(s("module.ppe.excel.dupCol.code","\u0627\u0644\u0643\u0648\u062F"))}</th><th>${i(s("module.ppe.excel.dupCol.name","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641"))}</th><th>${i(s("module.ppe.excel.dupCol.reason","\u0627\u0644\u0633\u0628\u0628"))}</th></tr>`,o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 760px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-exclamation-triangle text-amber-500 ml-2"></i>${i(r)}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-sm text-gray-600 mb-3">
                        ${i(s("module.ppe.excel.dupHint","\u0644\u0645 \u064A\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0623\u064A \u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F\u061B \u062A\u0645 \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0641\u0642\u0637."))}
                    </p>
                    <div class="table-wrapper" style="max-height: 380px; overflow:auto;">
                        <table class="data-table">
                            <thead>${l}</thead>
                            <tbody>${p}</tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        ${i(s("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(o),o.addEventListener("click",d=>{d.target===o&&o.remove()})},_isPpeAdminUser(){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function")return!!Permissions.isCurrentUserEffectiveAdmin()}catch{}const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;if(!e)return!1;const t=String(e.role||"").toLowerCase();if(t==="admin"||t==="system_admin"||e.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645")return!0;const s=e.permissions||{};return s.admin===!0||s["manage-modules"]===!0},_buildExcelToolbarHtml(e){if(!this._isPpeAdminUser())return"";const t=(r,n)=>this._t(r,n),s=r=>Utils.escapeHTML(r),a=e==="receipts"?{exportBtn:"ppe-receipts-export-excel-btn",tplBtn:"ppe-receipts-template-btn",importBtn:"ppe-receipts-import-btn",exportTitleKey:"module.ppe.excel.exportReceiptsTitle",exportTitleFb:"\u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0625\u0644\u0649 Excel",tplTitleKey:"module.ppe.excel.downloadTemplateReceiptsTitle",tplTitleFb:"\u062A\u0646\u0632\u064A\u0644 \u0642\u0627\u0644\u0628 Excel \u0641\u0627\u0631\u063A",importTitleKey:"module.ppe.excel.importReceiptsTitle",importTitleFb:"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0635\u0641\u0648\u0641 \u0645\u0646 \u0645\u0644\u0641 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0642\u0627\u0644\u0628"}:{exportBtn:"ppe-stock-export-excel-btn",tplBtn:"ppe-stock-template-btn",importBtn:"ppe-stock-import-btn",exportTitleKey:"module.ppe.excel.exportStockTitle",exportTitleFb:"\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0625\u0644\u0649 Excel",tplTitleKey:"module.ppe.excel.downloadTemplateStockTitle",tplTitleFb:"\u062A\u0646\u0632\u064A\u0644 \u0642\u0627\u0644\u0628 Excel \u0644\u0644\u0623\u0635\u0646\u0627\u0641",importTitleKey:"module.ppe.excel.importStockTitle",importTitleFb:"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0635\u0646\u0627\u0641 \u0645\u0646 \u0645\u0644\u0641 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0642\u0627\u0644\u0628"};return`
            <div class="ppe-excel-toolbar flex flex-wrap items-center justify-end gap-2 mb-3">
                <button id="${a.exportBtn}" type="button" class="btn-secondary" title="${s(t(a.exportTitleKey,a.exportTitleFb))}">
                    <i class="fas fa-file-excel ml-2"></i>${s(t("module.ppe.excel.exportBtn","\u062A\u0635\u062F\u064A\u0631 Excel"))}
                </button>
                <button id="${a.tplBtn}" type="button" class="btn-secondary" title="${s(t(a.tplTitleKey,a.tplTitleFb))}">
                    <i class="fas fa-download ml-2"></i>${s(t("module.ppe.excel.downloadTemplateBtn","\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                </button>
                <button id="${a.importBtn}" type="button" class="btn-secondary" title="${s(t(a.importTitleKey,a.importTitleFb))}">
                    <i class="fas fa-file-import ml-2"></i>${s(t("module.ppe.excel.importBtn","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                </button>
            </div>
        `},showPpeReceiptsImportModal(){if(!this._isPpeAdminUser())return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}try{document.getElementById("ppe-receipts-import-modal")?.remove()}catch{}const e=(m,f)=>this._t(m,f),t=m=>Utils.escapeHTML(m),i=this._ppeReceiptExcelFieldDefs().map(m=>`<li><strong>${t(m.ar)}</strong> \u2014 <span class="font-mono text-xs">${t(m.en)}</span></li>`).join(""),a=document.createElement("div");a.className="modal-overlay",a.id="ppe-receipts-import-modal",a.innerHTML=`
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
                        <ul class="text-sm text-blue-800 list-disc mr-6 space-y-1">${i}</ul>
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
            </div>`,document.body.appendChild(a),this.applyModuleI18n(a);const r=a.querySelector("#ppe-receipts-modal-file"),n=a.querySelector("#ppe-receipts-modal-download-template"),p=a.querySelector("#ppe-receipts-import-preview"),l=a.querySelector("#ppe-receipts-preview-head"),o=a.querySelector("#ppe-receipts-preview-body"),d=a.querySelector("#ppe-receipts-preview-count"),u=a.querySelector("#ppe-receipts-import-confirm");let y=null;n&&(n.onclick=()=>this.downloadReceiptsExcelTemplate()),r.addEventListener("change",async m=>{const f=m.target.files&&m.target.files[0];if(y=f||null,u.disabled=!y,!f){p.classList.add("hidden");return}try{const b=await f.arrayBuffer(),w=XLSX.read(b,{type:"array",cellDates:!0}),c=XLSX.utils.sheet_to_json(w.Sheets[w.SheetNames[0]],{header:1,defval:"",raw:!1});if(!c||c.length<2){p.classList.add("hidden"),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const x=(c[0]||[]).map(k=>String(k||"").trim());l.innerHTML=`<tr>${x.map(k=>`<th>${t(k)}</th>`).join("")}</tr>`,o.innerHTML=c.slice(1,6).map(k=>`<tr>${x.map((B,C)=>`<td>${t(String(k[C]??""))}</td>`).join("")}</tr>`).join("");const v=Math.max(0,c.length-1);d.textContent=`${this._t("module.ppe.excel.previewRowCount","\u0639\u062F\u062F \u0635\u0641\u0648\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}: ${v}`,p.classList.remove("hidden")}catch(b){Utils.safeError("ppe receipts import preview",b),p.classList.add("hidden"),Notification.error(this._t("module.ppe.excel.previewErr","\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629"))}}),u.addEventListener("click",async()=>{y&&(a.remove(),await this.importReceiptsExcel(y))}),a.addEventListener("click",m=>{m.target===a&&a.remove()})},showPpeStockImportModal(){if(!this._isPpeAdminUser())return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}try{document.getElementById("ppe-stock-import-modal")?.remove()}catch{}const e=(m,f)=>this._t(m,f),t=m=>Utils.escapeHTML(m),i=this._ppeStockExcelFieldDefs().filter(m=>!["stock_IN","stock_OUT","balance"].includes(m.key)).map(m=>`<li><strong>${t(m.ar)}</strong> \u2014 <span class="font-mono text-xs">${t(m.en)}</span></li>`).join(""),a=document.createElement("div");a.className="modal-overlay",a.id="ppe-stock-import-modal",a.innerHTML=`
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
                        <ul class="text-sm text-blue-800 list-disc mr-6 space-y-1">${i}</ul>
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
            </div>`,document.body.appendChild(a),this.applyModuleI18n(a);const r=a.querySelector("#ppe-stock-modal-file"),n=a.querySelector("#ppe-stock-modal-download-template"),p=a.querySelector("#ppe-stock-import-preview"),l=a.querySelector("#ppe-stock-preview-head"),o=a.querySelector("#ppe-stock-preview-body"),d=a.querySelector("#ppe-stock-preview-count"),u=a.querySelector("#ppe-stock-import-confirm");let y=null;n&&(n.onclick=()=>this.downloadStockExcelTemplate()),r.addEventListener("change",async m=>{const f=m.target.files&&m.target.files[0];if(y=f||null,u.disabled=!y,!f){p.classList.add("hidden");return}try{const b=await f.arrayBuffer(),w=XLSX.read(b,{type:"array",cellDates:!0}),c=XLSX.utils.sheet_to_json(w.Sheets[w.SheetNames[0]],{header:1,defval:"",raw:!1});if(!c||c.length<2){p.classList.add("hidden"),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const x=(c[0]||[]).map(k=>String(k||"").trim());l.innerHTML=`<tr>${x.map(k=>`<th>${t(k)}</th>`).join("")}</tr>`,o.innerHTML=c.slice(1,6).map(k=>`<tr>${x.map((B,C)=>`<td>${t(String(k[C]??""))}</td>`).join("")}</tr>`).join("");const v=Math.max(0,c.length-1);d.textContent=`${this._t("module.ppe.excel.previewRowCount","\u0639\u062F\u062F \u0635\u0641\u0648\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}: ${v}`,p.classList.remove("hidden")}catch(b){Utils.safeError("ppe stock import preview",b),p.classList.add("hidden"),Notification.error(this._t("module.ppe.excel.previewErr","\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629"))}}),u.addEventListener("click",async()=>{y&&(a.remove(),await this.importStockExcel(y))}),a.addEventListener("click",m=>{m.target===a&&a.remove()})},_bindPpeReceiptExcelToolbar(){const e=document.getElementById("ppe-receipts-export-excel-btn"),t=document.getElementById("ppe-receipts-template-btn"),s=document.getElementById("ppe-receipts-import-btn");e&&(e.onclick=()=>this.exportReceiptsExcel()),t&&(t.onclick=()=>this.downloadReceiptsExcelTemplate()),s&&(s.onclick=()=>this.showPpeReceiptsImportModal())},_bindPpeStockExcelToolbar(){const e=document.getElementById("ppe-stock-export-excel-btn"),t=document.getElementById("ppe-stock-template-btn"),s=document.getElementById("ppe-stock-import-btn");e&&(e.onclick=()=>this.exportStockExcel()),t&&(t.onclick=()=>this.downloadStockExcelTemplate()),s&&(s.onclick=()=>this.showPpeStockImportModal())},async exportPPEMatrix(){try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const e=AppState.appData.employeePPEMatrix||{},t=AppState.appData.employees||[],s=Object.keys(e).map(r=>{const n=e[r],p=t.filter(l=>l.position===r);return{\u0627\u0644\u0648\u0638\u064A\u0629:r,"\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u064A\u0646":p.length,"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629":n.requiredPPE?n.requiredPPE.join(", "):""}}),i=XLSX.utils.json_to_sheet(s),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,i,"\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"),XLSX.writeFile(a,"\u0645\u0635\u0648\u0629_\u0645\u0647\u0645\u0627\u062A_\u0627\u0644\u0648\u0642\u0627\u064A\u0629_"+new Date().toISOString().slice(0,10)+".xlsx"),Loading.hide(),Notification.success(this._t("module.ppe.notify.matrixExportOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"))}catch(e){Loading.hide(),Notification.error(this._t("module.ppe.notify.matrixExportErr","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+e.message)}},buildStockControlTabHtmlSync(e,t=""){const s=Array.isArray(e)?e:[],i=s.filter(r=>{if(!r)return!1;const n=parseFloat(r.balance||0),p=parseFloat(r.minThreshold||0);return n<p});return`
            <div class="space-y-6" id="ppe-stock-tab-root">
                ${t?`<div id="ppe-stock-hint-slot" class="mb-4">${t}</div>`:""}
                ${this.renderStockDashboard(s,i)}
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
                `;const i=e.filter(a=>{if(!a)return!1;const r=parseFloat(a.balance||0),n=parseFloat(a.minThreshold||0);return r<n});return`
            <div class="space-y-6">
                ${t}
                ${this.renderStockDashboard(e,i)}
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
            `}},renderStockDashboard(e,t){const s=(l,o)=>this._t(l,o),i=l=>Utils.escapeHTML(l),a=e.length,r=e.reduce((l,o)=>l+parseFloat(o.balance||0),0),n=e.reduce((l,o)=>l+parseFloat(o.stock_IN||0),0),p=e.reduce((l,o)=>l+parseFloat(o.stock_OUT||0),0);return`
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600">${i(s("module.ppe.stock.dashboard.totalItems","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0635\u0646\u0627\u0641"))}</p>
                            <p class="text-2xl font-bold text-gray-800">${a}</p>
                        </div>
                        <div class="text-3xl text-blue-500">
                            <i class="fas fa-boxes"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600">${i(s("module.ppe.stock.dashboard.totalBalance","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0635\u064A\u062F"))}</p>
                            <p class="text-2xl font-bold text-gray-800">${r.toFixed(0)}</p>
                        </div>
                        <div class="text-3xl text-green-500">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600">${i(s("module.ppe.stock.dashboard.totalIn","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0627\u0631\u062F"))}</p>
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
                            <p class="text-sm text-gray-600">${i(s("module.ppe.stock.dashboard.totalOut","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641"))}</p>
                            <p class="text-2xl font-bold text-gray-800">${p.toFixed(0)}</p>
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
                            <h3 class="font-bold text-red-800">${i(s("module.ppe.stock.lowTitle","\u062A\u062D\u0630\u064A\u0631: \u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636"))}</h3>
                            <p class="text-sm text-red-700 mt-1">${t.length} ${i(s("module.ppe.stock.lowDesc","\u0635\u0646\u0641/\u0623\u0635\u0646\u0627\u0641 \u062A\u062D\u062A \u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628"))}</p>
                        </div>
                    </div>
                    <div class="mt-3 flex flex-wrap gap-2">
                        ${t.slice(0,5).map(l=>`
                            <span class="badge badge-warning">
                                ${Utils.escapeHTML(l.itemName||l.itemCode)} (${parseFloat(l.balance||0).toFixed(0)})
                            </span>
                        `).join("")}
                    </div>
                </div>
            `:""}
        `},renderStockTable(e){const t=(l,o)=>this._t(l,o),s=l=>Utils.escapeHTML(l),i=Array.isArray(e)?e:[],a=this._buildExcelToolbarHtml("stock");if(i.length===0)return`
                <div id="ppe-stock-table-card" class="content-card">
                    <div class="card-body">
                        ${a}
                        <div class="empty-state">
                            <i class="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">${s(t("module.ppe.empty.noStock","\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</p>
                            <button onclick="PPE.showStockItemForm()" class="btn-primary mt-4">
                                <i class="fas fa-plus ml-2"></i>${s(t("module.ppe.btn.addStockItem","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}
                            </button>
                        </div>
                    </div>
                </div>
            `;const r=this.buildStockFilterRow(i),n=this.getFilteredStockItems(i),p=this.hasActiveStockFilters();return n.length===0&&p?`
                <div id="ppe-stock-table-card" class="content-card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-list ml-2"></i>${s(t("module.ppe.stock.tableTitle","\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</h3>
                    </div>
                    <div class="card-body">
                        ${a}
                        ${r}
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
                    ${a}
                    ${r}
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
                                ${n.map(l=>{const o=parseFloat(l.balance||0),d=parseFloat(l.minThreshold||0),u=o<d;return`
                                        <tr class="${u?"bg-red-50":""}" data-item-id="${l.itemId||""}">
                                            <td class="font-mono font-semibold">${Utils.escapeHTML(l.itemCode||"")}</td>
                                            <td>${Utils.escapeHTML(l.itemName||"")}</td>
                                            <td>${Utils.escapeHTML(l.category||"")}</td>
                                            <td>${parseFloat(l.stock_IN||0).toFixed(0)}</td>
                                            <td>${parseFloat(l.stock_OUT||0).toFixed(0)}</td>
                                            <td class="font-bold ${u?"text-red-600":"text-green-600"}">
                                                ${o.toFixed(0)}
                                            </td>
                                            <td>${d.toFixed(0)}</td>
                                            <td>${Utils.escapeHTML(l.supplier||"")}</td>
                                            <td>${l.lastUpdate?Utils.formatDate(l.lastUpdate):"-"}</td>
                                            <td>
                                                ${u?`
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
                                                    <button onclick="PPE.showStockItemForm('${l.itemId}')" class="btn-icon btn-icon-primary" title="${s(t("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button onclick="PPE.showStockTransactions('${l.itemId}')" class="btn-icon btn-icon-info" title="${s(t("module.ppe.btn.transactions","\u0627\u0644\u062D\u0631\u0643\u0627\u062A"))}">
                                                        <i class="fas fa-list"></i>
                                                    </button>
                                                    <button onclick="PPE.showTransactionForm('${l.itemId}')" class="btn-icon btn-icon-success" title="${s(t("module.ppe.btn.addMovement","\u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629"))}">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                    <button onclick="PPE.deleteStockItem('${l.itemId}')" class="btn-icon btn-icon-danger" title="${s(t("module.ppe.btn.deleteItem","\u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641"))}">
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
        `},_getCurrentStockItems(){return this.state.stockItemsCache&&Array.isArray(this.state.stockItemsCache)&&this.state.stockItemsCache.length?this.state.stockItemsCache:Array.isArray(AppState.appData.ppeStock)?AppState.appData.ppeStock:[]},refreshStockListUI(){const e=document.getElementById("ppe-stock-table-card");if(!e)return;const t=this._getCurrentStockItems(),s=this.renderStockTable(t),i=document.createElement("div");i.innerHTML=s.trim();const a=i.firstElementChild;a&&(e.replaceWith(a),this.applyModuleI18n(a),this.bindStockFilters())},_stockFilterTimer:null,bindStockFilters(){if(this.state.activeTab!=="stock-control")return;this.state.filters||(this.state.filters={}),this.state.filters.stock||this.resetStockFilters();const e=o=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(o):setTimeout(o,0)},t=document.getElementById("ppe-stock-search");t&&t.addEventListener("input",o=>{this.state.filters.stock.search=o.target&&o.target.value||"",clearTimeout(this._stockFilterTimer),this._stockFilterTimer=setTimeout(()=>e(()=>this.refreshStockListUI()),220)});const s=document.getElementById("ppe-stock-filter-category");s&&s.addEventListener("change",o=>{this.state.filters.stock.category=o.target&&o.target.value||"",this.refreshStockListUI()});const i=document.getElementById("ppe-stock-filter-supplier");i&&i.addEventListener("change",o=>{this.state.filters.stock.supplier=o.target&&o.target.value||"",this.refreshStockListUI()});const a=document.getElementById("ppe-stock-filter-status");a&&a.addEventListener("change",o=>{this.state.filters.stock.status=o.target&&o.target.value||"",this.refreshStockListUI()});const r=document.getElementById("ppe-stock-date-from");r&&r.addEventListener("change",o=>{this.state.filters.stock.dateFrom=o.target&&o.target.value||"",this.refreshStockListUI()});const n=document.getElementById("ppe-stock-date-to");n&&n.addEventListener("change",o=>{this.state.filters.stock.dateTo=o.target&&o.target.value||"",this.refreshStockListUI()});const p=document.getElementById("ppe-stock-reset-filters");p&&p.addEventListener("click",()=>{this.resetStockFilters(),this.refreshStockListUI()});const l=document.getElementById("ppe-stock-clear-empty-filters");l&&l.addEventListener("click",()=>{this.resetStockFilters(),this.refreshStockListUI()})},async _fetchPPEStockRpcOnce(e){const t=GoogleIntegration.sendToAppsScript("getAllPPEStockItems",{filters:{}}),s=new Promise((i,a)=>setTimeout(()=>a(new Error(this._t("module.ppe.stock.timeoutRpc","\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u062E\u0627\u062F\u0645 \u0639\u0646\u062F \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646."))),e));return Promise.race([t,s])},_localStockFallbackArrays(){const e=this.state.stockItemsCache,t=Array.isArray(AppState.appData.ppeStock)?AppState.appData.ppeStock:[];return e&&e.length>0?e:t.length>0?t:[]},async loadStockItems(e=!1){try{const t=Date.now(),s=this.state.stockItemsCache&&this.state.stockItemsCacheTime&&t-this.state.stockItemsCacheTime<this.state.stockCacheExpiry;return!e&&s?(Utils.safeLog("\u2705 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 Cache"),this.state.stockItemsCache&&!AppState.appData.ppeStock&&(AppState.appData.ppeStock=this.state.stockItemsCache),this.state.stockItemsCache):this._stockLoadInflightPromise?(Utils.safeLog("\u23F3 \u0637\u0644\u0628 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u2014 \u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0640 Promise"),this._stockLoadInflightPromise):(this._stockLoadInflightPromise=(async()=>{try{return await this._loadStockItemsInternal(e)}finally{this._stockLoadInflightPromise=null}})(),this._stockLoadInflightPromise)}catch(t){return this._stockLoadInflightPromise=null,Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A loadStockItems wrapper:",t),[]}},async _loadStockItemsInternal(e=!1){try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){this.state.stockLoadHardErrorMsg="";try{let i=null,a=null;for(let l=0;l<2;l++)try{l>0&&await new Promise(o=>setTimeout(o,700)),i=await this._fetchPPEStockRpcOnce(3e4),a=null;break}catch(o){a=o,i=null}if(i&&i.success){const l=Array.isArray(i.data)?i.data:[];return AppState.appData.ppeStock||(AppState.appData.ppeStock=[]),AppState.appData.ppeStock=l,this.state.stockItemsCache=l,this.state.stockItemsCacheTime=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),l}const r=i&&i.message?String(i.message):"",n=this._localStockFallbackArrays();if(n.length>0)return this.state.stockStaleWarningMsg=r||this._t("module.ppe.stock.staleDataNotice","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u064A\u064F\u0639\u0631\u0636 \u0622\u062E\u0631 \u0645\u062E\u0632\u0651\u0646 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u064F\u0633\u062A\u062D\u0633\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644."),a?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0645\u062D\u0627\u0648\u0644\u0629\u060C \u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0634:",a):r&&Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0627\u062F\u0645 \u0631\u0641\u0636 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u060C \u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0634:",r),n;let p=r||a&&a.message||this._t("module.ppe.stock.loadFailedUnknown","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646.");return/Timeout|مهلة/i.test(p||"")&&(p=this._t("module.ppe.stock.loadFailedTimeout","\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0639\u0646\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0634\u0628\u0643\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B.")),this.state.stockLoadHardErrorMsg=p,Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0645\u062E\u0632\u0648\u0646\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0648\u0641\u0634\u0644 \u0627\u0644\u062C\u0644\u0628 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",p),[]}catch(i){const a=this._localStockFallbackArrays();return a.length>0?(this.state.stockStaleWarningMsg=this._t("module.ppe.stock.staleDataNotice","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u064A\u064F\u0639\u0631\u0636 \u0622\u062E\u0631 \u0645\u062E\u0632\u0651\u0646 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u064F\u0633\u062A\u062D\u0633\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644."),Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u060C \u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0634:",i),a):(this.state.stockLoadHardErrorMsg=String(i&&i.message?i.message:i),[])}}return this.state.stockItemsCache?(AppState.appData.ppeStock||(AppState.appData.ppeStock=this.state.stockItemsCache),this.state.stockItemsCache):AppState.appData.ppeStock||[]}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646:",t);const s=this._localStockFallbackArrays();return s.length>0?(this.state.stockStaleWarningMsg=this._t("module.ppe.stock.staleDataNotice","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u064A\u064F\u0639\u0631\u0636 \u0622\u062E\u0631 \u0645\u062E\u0632\u0651\u0646 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u064F\u0633\u062A\u062D\u0633\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644."),s):(this.state.stockLoadHardErrorMsg=String(t&&t.message?t.message:t),[])}},async showStockItemForm(e=null){const t=!!e;let s=null;t&&(s=(await this.loadStockItems()).find(l=>l.itemId===e));const i=(p,l)=>this._t(p,l),a=p=>Utils.escapeHTML(p),r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${a(t?i("module.ppe.title.stockItemEdit","\u062A\u0639\u062F\u064A\u0644 \u0635\u0646\u0641"):i("module.ppe.title.stockItemAdd","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="stock-item-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${a(i("module.ppe.stock.itemCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641"))} *</label>
                                <input type="text" id="stock-item-code" required class="form-input"
                                    value="${Utils.escapeHTML(s?.itemCode||"")}"
                                    placeholder="${a(i("module.ppe.placeholder.itemCode",""))}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${a(i("module.ppe.stock.itemName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641"))} *</label>
                                <input type="text" id="stock-item-name" required class="form-input"
                                    value="${Utils.escapeHTML(s?.itemName||"")}"
                                    placeholder="${a(i("module.ppe.placeholder.itemName",""))}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${a(i("module.ppe.label.category","\u0627\u0644\u0641\u0626\u0629"))}</label>
                                <input type="text" id="stock-item-category" class="form-input"
                                    value="${Utils.escapeHTML(s?.category||"")}"
                                    placeholder="${a(i("module.ppe.stock.category","\u0627\u0644\u0641\u0626\u0629"))}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${a(i("module.ppe.label.minThreshold","\u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628 *"))}</label>
                                <input type="number" id="stock-item-min-threshold" required class="form-input" min="0"
                                    value="${s?.minThreshold||0}"
                                    placeholder="${a(i("module.ppe.stock.reorder",""))}">
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${a(i("module.ppe.label.supplier","\u0627\u0644\u0645\u0648\u0631\u062F"))}</label>
                                <input type="text" id="stock-item-supplier" class="form-input"
                                    value="${Utils.escapeHTML(s?.supplier||"")}"
                                    placeholder="${a(i("module.ppe.label.supplier",""))}">
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${a(i("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${a(t?i("module.common.saveChanges","\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A"):i("module.ppe.btn.addItem","\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0635\u0646\u0641"))}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(r),this.applyModuleI18n(r),r.querySelector("#stock-item-form").addEventListener("submit",async p=>{p.preventDefault(),Loading.show();try{const l=document.getElementById("stock-item-code"),o=document.getElementById("stock-item-name"),d=document.getElementById("stock-item-category"),u=document.getElementById("stock-item-min-threshold"),y=document.getElementById("stock-item-supplier");if(!l||!o||!d||!u||!y){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.fieldsMissing","\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."));return}const m=l.value.trim(),f=o.value.trim();if(m&&(await this.loadStockItems()).find(x=>(t?x.itemId!==s.itemId:!0)&&x.itemCode&&String(x.itemCode).trim().toLowerCase()===m.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0643\u0648\u062F \u0622\u062E\u0631.")),l.focus(),l.style.borderColor="#ef4444";return}if(f&&(await this.loadStockItems()).find(x=>(t?x.itemId!==s.itemId:!0)&&x.itemName&&String(x.itemName).trim().toLowerCase()===f.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0633\u0645 \u0622\u062E\u0631.")),o.focus(),o.style.borderColor="#ef4444";return}const b={itemId:s?.itemId||Utils.generateId("STOCK"),itemCode:m,itemName:o.value.trim(),category:d.value.trim(),minThreshold:parseFloat(u.value)||0,supplier:y.value.trim(),stock_IN:s?.stock_IN||0,stock_OUT:s?.stock_OUT||0,balance:s?.balance||0,lastUpdate:new Date().toISOString(),createdAt:s?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const w=await GoogleIntegration.sendToAppsScript("addOrUpdatePPEStockItem",b);if(w&&w.success){this.clearCache(),r.remove(),Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629"} \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D`),this.refreshActiveTab();return}else{const c=w?.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0635\u0646\u0641";Notification.error(c),c.includes("\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F")?(l.style.borderColor="#ef4444",l.focus()):c.includes("\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F")&&(o.style.borderColor="#ef4444",o.focus())}}else{if(AppState.appData.ppeStock||(AppState.appData.ppeStock=[]),t){const w=AppState.appData.ppeStock.findIndex(c=>c.itemId===s.itemId);if(w!==-1){if(m&&AppState.appData.ppeStock.find((x,v)=>v!==w&&x.itemCode&&String(x.itemCode).trim().toLowerCase()===m.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0643\u0648\u062F \u0622\u062E\u0631.")),l.focus(),l.style.borderColor="#ef4444";return}if(f&&AppState.appData.ppeStock.find((x,v)=>v!==w&&x.itemName&&String(x.itemName).trim().toLowerCase()===f.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0633\u0645 \u0622\u062E\u0631.")),o.focus(),o.style.borderColor="#ef4444";return}AppState.appData.ppeStock[w]=b}}else{if(m&&AppState.appData.ppeStock.find(c=>c.itemCode&&String(c.itemCode).trim().toLowerCase()===m.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0643\u0648\u062F \u0622\u062E\u0631.")),l.focus(),l.style.borderColor="#ef4444";return}if(f&&AppState.appData.ppeStock.find(c=>c.itemName&&String(c.itemName).trim().toLowerCase()===f.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0633\u0645 \u0622\u062E\u0631.")),o.focus(),o.style.borderColor="#ef4444";return}AppState.appData.ppeStock.push(b)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.clearCache(),r.remove(),Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629"} \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D`),this.refreshActiveTab();return}}catch(l){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+l.message)}finally{Loading.hide()}}),r.addEventListener("click",p=>{p.target===r&&r.remove()})},async showTransactionForm(e=null){const t=await this.loadStockItems(),s=e?t.find(r=>r.itemId===e):null,i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
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
                                ${t.map(r=>`
                                    <option value="${r.itemId}" ${s&&s.itemId===r.itemId?"selected":""}>
                                        ${Utils.escapeHTML(r.itemCode||"")} - ${Utils.escapeHTML(r.itemName||"")}
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
        `,document.body.appendChild(i),i.querySelector("#transaction-form").addEventListener("submit",async r=>{r.preventDefault(),Loading.show();try{const n=document.getElementById("transaction-item-id"),p=document.getElementById("transaction-action"),l=document.getElementById("transaction-quantity"),o=document.getElementById("transaction-date"),d=document.getElementById("transaction-issued-to"),u=document.getElementById("transaction-remarks");if(!n||!p||!l||!o||!d||!u){Loading.hide(),Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const y={itemId:n.value,action:p.value,quantity:parseFloat(l.value)||0,date:new Date(o.value).toISOString(),issuedTo:d.value.trim(),remarks:u.value.trim(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const m=await GoogleIntegration.sendToAppsScript("addPPETransaction",y);if(m&&m.success){this.clearCache(),i.remove(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshActiveTab();return}else Notification.error(m?.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0631\u0643\u0629")}else{y.id=Utils.generateId("TRANS"),AppState.appData.ppeTransactions||(AppState.appData.ppeTransactions=[]),AppState.appData.ppeTransactions.push(y),AppState.appData.ppeStock||(AppState.appData.ppeStock=[]);const m=AppState.appData.ppeStock.find(f=>f.itemId===y.itemId);m&&(y.action==="IN"?m.stock_IN=parseFloat(m.stock_IN||0)+y.quantity:m.stock_OUT=parseFloat(m.stock_OUT||0)+y.quantity,m.balance=parseFloat(m.stock_IN||0)-parseFloat(m.stock_OUT||0),m.lastUpdate=new Date().toISOString()),this.clearCache(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),i.remove(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshActiveTab();return}}catch(n){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+n.message)}finally{Loading.hide()}}),i.addEventListener("click",r=>{r.target===i&&i.remove()})},async showStockTransactions(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}Loading.show();try{let t=[];try{t=await this.loadStockItems(),Array.isArray(t)||(t=[])}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646:",o),t=AppState.appData.ppeStock||[]}const s=t.find(o=>o&&o.itemId===e);if(!s){Loading.hide(),Notification.error("\u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u0645\u064A\u0644\u0647");return}let i=[];if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const o=await GoogleIntegration.sendToAppsScript("getAllPPETransactions",{filters:{itemId:e}});o&&o.success?i=Array.isArray(o.data)?o.data:[]:(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062C\u0644\u0628 \u0627\u0644\u062D\u0631\u0643\u0627\u062A \u0645\u0646 Backend\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",o?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"),i=(AppState.appData.ppeTransactions||[]).filter(d=>d&&d.itemId===e))}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0640 Backend\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",o),i=(AppState.appData.ppeTransactions||[]).filter(d=>d&&d.itemId===e)}else i=(AppState.appData.ppeTransactions||[]).filter(o=>o&&o.itemId===e);Array.isArray(i)||(i=[]),Loading.hide();const a=document.createElement("div");a.className="modal-overlay",i.sort((o,d)=>{const u=new Date(o.date||o.createdAt||0);return new Date(d.date||d.createdAt||0)-u});const r=i.filter(o=>o.action==="IN").reduce((o,d)=>o+parseFloat(d.quantity||0),0),n=i.filter(o=>o.action==="OUT").reduce((o,d)=>o+parseFloat(d.quantity||0),0),p=r-n;let l="";i.length===0?l=`
                    <div class="empty-state py-8">
                        <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641</p>
                    </div>
                `:l=`
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
                                ${i.map(o=>{const d=o.action==="IN"?"\u0648\u0627\u0631\u062F":"\u0645\u0646\u0635\u0631\u0641",u=o.action==="IN"?"badge-success":"badge-warning",y=o.action==="IN"?"fa-arrow-down":"fa-arrow-up";return`
                                        <tr>
                                            <td>${o.date?Utils.formatDate(o.date):"-"}</td>
                                            <td>
                                                <span class="badge ${u}">
                                                    <i class="fas ${y} ml-1"></i>
                                                    ${d}
                                                </span>
                                            </td>
                                            <td class="font-semibold">${parseFloat(o.quantity||0).toFixed(0)}</td>
                                            <td>${Utils.escapeHTML(o.issuedTo||"-")}</td>
                                            <td>${Utils.escapeHTML(o.remarks||"-")}</td>
                                            <td class="text-sm text-gray-500">${o.createdAt?Utils.formatDate(o.createdAt):"-"}</td>
                                        </tr>
                                    `}).join("")}
                            </tbody>
                        </table>
                    </div>
                `,a.innerHTML=`
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
                                    <p class="font-semibold text-gray-800">${i.length}</p>
                                </div>
                            </div>
                        </div>

                        <!-- \u0645\u0644\u062E\u0635 \u0627\u0644\u062D\u0631\u0643\u0627\u062A -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm text-green-700 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0627\u0631\u062F</p>
                                        <p class="text-2xl font-bold text-green-600">${r.toFixed(0)}</p>
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
                                        <p class="text-2xl font-bold text-blue-600">${p.toFixed(0)}</p>
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
                            ${l}
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
            `,document.body.appendChild(a),a.addEventListener("click",o=>{o.target===a&&a.remove()})}catch(t){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A: "+(t.message||t))}},async deleteStockItem(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=(await this.loadStockItems()).find(a=>a&&a.itemId===e);if(!s){Notification.error("\u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 "${s.itemName||s.itemCode}"\u061F

\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 \u0625\u0630\u0627 \u0643\u0627\u0646 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u062D\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629.`;if(confirm(i)){Loading.show();try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const a=await GoogleIntegration.sendToAppsScript("deletePPEStockItem",{itemId:e});a&&a.success?(this.state.stockItemsCache=null,this.state.stockItemsCacheTime=null,Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D"),await this.load()):Notification.error(a?.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641")}else AppState.appData.ppeStock?(AppState.appData.ppeStock=AppState.appData.ppeStock.filter(a=>a.itemId!==e),this.state.stockItemsCache=null,this.state.stockItemsCacheTime=null,Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D"),await this.load()):Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0629 \u0644\u0644\u062D\u0630\u0641")}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641: "+(a.message||a))}finally{Loading.hide()}}},_ppeAnalyticsPeriod:"0",_ppeAnalyticsCharts:{},async renderPpeAnalysisTab(){return this._ppeEnsureChartJS().catch(()=>{}),`
        <div id="ppe-analytics-root" style="font-family:inherit;">

            <!-- \u2550\u2550\u2550 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u2550\u2550\u2550 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#0F766E 0%,#0E7490 50%,#1E3A8A 100%);border-radius:14px;color:#fff;box-shadow:0 8px 28px rgba(15,118,110,0.32);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;backdrop-filter: blur(8px);">
                        <i class="fas fa-hard-hat" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.9;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u2022 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u2022 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u2022 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u2022 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-inline-end:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((e,t)=>{const s=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],i=(this._ppeAnalyticsPeriod||"0")===e;return`<button class="ppe-period-btn" data-period="${e}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${i?"#fff":"rgba(255,255,255,0.15)"};color:${i?"#0F766E":"#fff"};">${s[t]}</button>`}).join("")}
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
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">
                    ${[{id:"ppe-af-status",icon:"fas fa-flag",color:"#0891b2",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{id:"ppe-af-type",icon:"fas fa-hard-hat",color:"#0F766E",label:"\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"},{id:"ppe-af-dept",icon:"fas fa-building",color:"#f59e0b",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{id:"ppe-af-category",icon:"fas fa-tags",color:"#6366f1",label:"\u0627\u0644\u0641\u0626\u0629"},{id:"ppe-af-supplier",icon:"fas fa-truck",color:"#8b5cf6",label:"\u0627\u0644\u0645\u0648\u0631\u062F"},{id:"ppe-af-factory",icon:"fas fa-industry",color:"#0284c7",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{id:"ppe-af-location",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:"\u0627\u0644\u0645\u0648\u0642\u0639"}].map(e=>`
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

            <!-- \u2550\u2550\u2550 Row: \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u2550\u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-industry" style="color:#0284c7;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062A\u0648\u0632\u064A\u0639 \u0648\u0646\u0633\u0628 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</span>
                    </div>
                    <span style="font-size:0.72rem;color:#64748b;">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064A \u0645\u0635\u0646\u0639 \u0644\u062A\u0635\u0641\u064A\u0629 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</span>
                </div>
                <div id="ppe-factories-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;padding:16px;background:#f8fafc;">
                    <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 1: \u0627\u0644\u062D\u0627\u0644\u0629 + \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
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
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-chart-area" style="color:#8b5cf6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:260px;">
                        <canvas id="ppe-chart-trend"></canvas>
                        <div id="ppe-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 2: \u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629 (\u0642\u0627\u0626\u0645\u0629) + \u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0642\u0627\u0626\u0645\u0629) \u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-hard-hat" style="color:#0F766E;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0639\u062F\u0627\u062A (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div id="ppe-types-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div id="ppe-depts-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 3: \u0627\u0644\u0645\u0648\u0631\u062F (\u0642\u0627\u0626\u0645\u0629) + \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A (\u0642\u0627\u0626\u0645\u0629) \u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-truck" style="color:#8b5cf6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0631\u062F (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div id="ppe-suppliers-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A \u0627\u0644\u0623\u0643\u062B\u0631 \u0646\u0634\u0627\u0637\u0627\u064B (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div id="ppe-locs-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550 Row 4: \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629 (Doughnut) + \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629 \u2550\u2550\u2550 -->
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
                        <i class="fas fa-chart-column" style="color:#0F766E;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629 \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A (\u0622\u062E\u0631 3 \u0633\u0646\u0648\u0627\u062A)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:260px;">
                        <canvas id="ppe-chart-yearly"></canvas>
                        <div id="ppe-chart-yearly-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
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
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#0F766E;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th style="padding:9px 12px;text-align:center;font-weight:700;color:#0F766E;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody id="ppe-recent-tbody">
                            <tr><td colspan="8" style="padding:24px;text-align:center;color:#94a3b8;">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `},async _ppeEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{let s=0;const i=setInterval(()=>{typeof Chart<"u"?(clearInterval(i),t(!0)):++s>50&&(clearInterval(i),t(!1))},100)}):new Promise(t=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",s.onload=()=>t(!0),s.onerror=()=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>t(!1),document.head.appendChild(i)},document.head.appendChild(s)})},_getPpeReceiptsData(){return(Array.isArray(AppState?.appData?.ppe)?AppState.appData.ppe:[]).map(t=>{if(t._factoryDisplay!==void 0)return t;const s=String(t.employeeLocation||t.location||"").trim();let i="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",a="";if(s){const r=s.indexOf(" - ");r>0?(i=s.substring(0,r).trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",a=s.substring(r+3).trim()):i=s}return t._factoryDisplay=i,t._locationDisplay=a||i,t._deptDisplay=String(t.employeeDepartment||t.department||t.dept||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",t})},_getPpeStockData(){return Array.isArray(AppState?.appData?.ppeStock)?AppState.appData.ppeStock:[]},_getPpeReceiptDate(e){if(!e)return null;const t=e.receiptDate||e.date||e.createdAt||e.timestamp||null;if(!t)return null;try{const s=new Date(t);return isNaN(s.getTime())?null:s}catch{return null}},_normalizePpeStatus(e){const t=String(e||"").trim().toLowerCase();return t==="\u0645\u0633\u062A\u0644\u0645"||t==="received"||t==="\u0645\u0643\u062A\u0645\u0644"?"received":t==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"||t==="pending"||t==="\u0628\u0627\u0646\u062A\u0638\u0627\u0631"?"pending":"other"},async updatePpeAnalyticsDashboard(){const e=document.getElementById("ppe-analytics-root");if(!e)return;const t=this._getPpeReceiptsData(),s=this._getPpeStockData(),i=parseInt(this._ppeAnalyticsPeriod||"0",10),a=i>0?(()=>{const E=new Date;return E.setDate(E.getDate()-i),E})():null,r=a?t.filter(E=>{const S=this._getPpeReceiptDate(E);return S&&S>=a}):t.slice();this._ppePopulateAnalyticsFilters(r,s);const{receipts:n,stock:p}=this._ppeApplyAnalyticsFilters(r,s),l=n.length,o=document.getElementById("ppe-filter-count");o&&(o.textContent=`${l} \u0627\u0633\u062A\u0644\u0627\u0645`);const d=n.reduce((E,S)=>E+(parseFloat(S.quantity)||0),0),u=n.filter(E=>this._normalizePpeStatus(E.status)==="received").length,y=n.filter(E=>this._normalizePpeStatus(E.status)==="pending").length,m=p.filter(E=>{const S=parseFloat(E.balance||0),P=parseFloat(E.minThreshold||0);return P>0&&S<P}),f=p.length,b=m.length,w=new Set(n.map(E=>E.employeeCode||E.employeeName).filter(Boolean)).size,c=new Date,x=n.filter(E=>{const S=this._getPpeReceiptDate(E);return S&&S.getFullYear()===c.getFullYear()&&S.getMonth()===c.getMonth()}).length,v=new Set(n.map(E=>{const S=this._getPpeReceiptDate(E);return S?`${S.getFullYear()}-${S.getMonth()}`:null}).filter(Boolean)),k=v.size>0?(l/v.size).toFixed(1):"0",B=document.getElementById("ppe-kpi-strip");if(B){const E=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A",value:l,icon:"fas fa-receipt",color:"#0F766E",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0627\u0644\u0645\u064F\u0633\u062A\u0644\u064E\u0645\u0629",value:d.toFixed(0),icon:"fas fa-cubes",color:"#0E7490",bg:"#ecfeff",border:"#a5f3fc"},{label:"\u0645\u0643\u062A\u0645\u0644\u0629 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",value:u,icon:"fas fa-circle-check",color:"#047857",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645",value:y,icon:"fas fa-hourglass-half",color:"#b45309",bg:"#fffbeb",border:"#fde68a"},{label:"\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646",value:f,icon:"fas fa-boxes",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u0646\u062E\u0641\u0636 \u0627\u0644\u0645\u062E\u0632\u0648\u0646",value:b,icon:"fas fa-triangle-exclamation",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646",value:w,icon:"fas fa-users",color:"#7c3aed",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:x,icon:"fas fa-calendar-day",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0634\u0647\u0631\u064A",value:k,icon:"fas fa-calendar-check",color:"#1E3A8A",bg:"#eef2ff",border:"#c7d2fe"}];B.innerHTML=E.map(S=>`
                <div style="background:${S.bg};border:1px solid ${S.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${S.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${S.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${S.color};line-height:1;" dir="ltr">${S.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${S.label}</div>
                    </div>
                </div>`).join("")}if(!await this._ppeEnsureChartJS()||typeof Chart>"u"){e.querySelector(".ppe-chart-load-warning")||e.insertAdjacentHTML("afterbegin",'<div class="ppe-chart-load-warning" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647 \u0645\u062A\u0627\u062D\u0629.</span></div>');return}const q={received:"\u0645\u0633\u062A\u0644\u0645",pending:"\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645",other:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},$={};n.forEach(E=>{const S=q[this._normalizePpeStatus(E?.status)]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";$[S]=($[S]||0)+1});const L={\u0645\u0633\u062A\u0644\u0645:"rgba(5,150,105,0.85)","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645":"rgba(245,158,11,0.85)","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":"rgba(148,163,184,0.8)"};this._ppeDoughnut("ppe-chart-status",Object.keys($),Object.values($),Object.keys($).map(E=>L[E]||"rgba(148,163,184,0.8)")),this._ppeTrend("ppe-chart-trend",t);const R=this._ppeGroupBy(p,E=>String(E.category||"\u0628\u062F\u0648\u0646 \u0641\u0626\u0629").trim(),8),z=["rgba(99,102,241,0.85)","rgba(15,118,110,0.85)","rgba(245,158,11,0.85)","rgba(244,63,94,0.85)","rgba(139,92,246,0.85)","rgba(8,145,178,0.85)","rgba(5,150,105,0.85)","rgba(217,119,6,0.85)"];this._ppeDoughnut("ppe-chart-category",R.labels,R.data,R.labels.map((E,S)=>z[S%z.length])),this._ppeYearly("ppe-chart-yearly",t),this._ppePopulateFactoryCards(n,l),this._ppePopulateAnalyticsLists(n,p,l);const W=n.slice().sort((E,S)=>{const P=this._getPpeReceiptDate(E),j=this._getPpeReceiptDate(S);return(j?j.getTime():0)-(P?P.getTime():0)}).slice(0,20),Q=document.getElementById("ppe-recent-count");Q&&(Q.textContent=`${W.length} \u0627\u0633\u062A\u0644\u0627\u0645`);const te=document.getElementById("ppe-recent-tbody");if(te){const E=S=>{const P=this._normalizePpeStatus(S),j={received:["\u0645\u0633\u062A\u0644\u0645","#ecfdf5","#047857"],pending:["\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645","#fffbeb","#b45309"],other:["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","#f1f5f9","#475569"]},[Y,J,re]=j[P]||j.other;return`<span style="background:${J};color:${re};padding:2px 9px;border-radius:12px;font-size:0.72rem;font-weight:700;">${Y}</span>`};te.innerHTML=W.length===0?'<tr><td colspan="8" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629</td></tr>':W.map((S,P)=>{const j=this._getPpeReceiptDate(S),Y=j?j.toLocaleDateString("ar-EG",{year:"numeric",month:"short",day:"numeric"}):"\u2014",J=P%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${J};" onmouseover="this.style.background='#f0fdfa'" onmouseout="this.style.background='${J}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;" dir="ltr">${Y}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S.employeeName||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;font-family:monospace;" dir="ltr">${Utils.escapeHTML(S.employeeCode||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S.equipmentType||S.type||"\u2014")}</td>
                        <td style="padding:9px 12px;text-align:center;color:#374151;font-weight:700;" dir="ltr">${parseFloat(S.quantity||0).toFixed(0)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S._deptDisplay||S.department||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S._factoryDisplay||"\u2014")}</td>
                        <td style="padding:9px 12px;text-align:center;">${E(S.status)}</td>
                    </tr>`}).join("")}},_ppePopulateAnalyticsFilters(e,t){const s=(r,n)=>[...new Set(r.map(n).filter(Boolean))].sort(),i=(r,n)=>{const p=document.getElementById(r);if(!p)return;const l=p.value;p.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+n.map(o=>`<option value="${Utils.escapeHTML(String(o))}"${o===l?" selected":""}>${Utils.escapeHTML(String(o))}</option>`).join("")},a=document.getElementById("ppe-af-status");if(a){const r=a.value;a.innerHTML=`<option value="">\u0627\u0644\u0643\u0644</option>
                <option value="received"${r==="received"?" selected":""}>\u0645\u0633\u062A\u0644\u0645</option>
                <option value="pending"${r==="pending"?" selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645</option>`}i("ppe-af-type",s(e,r=>String(r.equipmentType||r.type||"").trim())),i("ppe-af-dept",s(e,r=>(r._deptDisplay||"").trim())),i("ppe-af-category",s(t,r=>String(r.category||"").trim())),i("ppe-af-supplier",s(t,r=>String(r.supplier||"").trim())),i("ppe-af-factory",s(e,r=>(r._factoryDisplay||"").trim())),i("ppe-af-location",s(e,r=>(r._locationDisplay||"").trim()))},_ppeApplyAnalyticsFilters(e,t){const s=f=>{const b=document.getElementById(f);return b?b.value.trim():""},i=s("ppe-af-type"),a=s("ppe-af-dept"),r=s("ppe-af-category"),n=s("ppe-af-status"),p=s("ppe-af-supplier"),l=s("ppe-af-factory"),o=s("ppe-af-location"),d=[i,a,r,n,p,l,o].some(f=>f!==""),u=document.getElementById("ppe-filter-badge");u&&(u.style.display=d?"inline":"none");const y=e.filter(f=>!(i&&String(f.equipmentType||f.type||"").trim()!==i||a&&(f._deptDisplay||"").trim()!==a||n&&this._normalizePpeStatus(f?.status)!==n||l&&(f._factoryDisplay||"").trim()!==l||o&&(f._locationDisplay||"").trim()!==o)),m=t.filter(f=>!(r&&String(f.category||"").trim()!==r||p&&String(f.supplier||"").trim()!==p));return{receipts:y,stock:m}},_ppeGroupBy(e,t,s=0){const i={};e.forEach(r=>{const n=t(r)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i[n]=(i[n]||0)+1});let a=Object.entries(i).sort((r,n)=>n[1]-r[1]);return s>0&&(a=a.slice(0,s)),{labels:a.map(r=>r[0]),data:a.map(r=>r[1])}},_ppeDoughnut(e,t,s,i){const a=document.getElementById(e),r=document.getElementById(e+"-empty");if(!a)return;if(!s.length||s.reduce((p,l)=>p+l,0)===0){a.style.display="none",r&&(r.style.display="flex");return}r&&(r.style.display="none"),a.style.display="";try{this._ppeAnalyticsCharts[e]&&this._ppeAnalyticsCharts[e].destroy()}catch{}const n=s.reduce((p,l)=>p+l,0);this._ppeAnalyticsCharts[e]=new Chart(a,{type:"doughnut",data:{labels:t,datasets:[{data:s,backgroundColor:i,borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:p=>` ${p.label}: ${p.parsed} (${n>0?(p.parsed/n*100).toFixed(1):0}%)`}}}}})},_ppeHBar(e,t,s,i){const a=document.getElementById(e),r=document.getElementById(e+"-empty");if(a){if(!s.length||s.reduce((n,p)=>n+p,0)===0){a.style.display="none",r&&(r.style.display="flex");return}r&&(r.style.display="none"),a.style.display="";try{this._ppeAnalyticsCharts[e]&&this._ppeAnalyticsCharts[e].destroy()}catch{}this._ppeAnalyticsCharts[e]=new Chart(a,{type:"bar",data:{labels:t,datasets:[{data:s,backgroundColor:i||"rgba(15,118,110,0.78)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${n.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:n=>String(t[n]).length>18?String(t[n]).slice(0,17)+"\u2026":t[n]}}}}})}},_ppeTrend(e,t){const s=document.getElementById(e),i=document.getElementById(e+"-empty");if(!s)return;const a=new Date,r=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],n=[];for(let o=11;o>=0;o--){const d=new Date(a.getFullYear(),a.getMonth()-o,1);n.push({y:d.getFullYear(),m:d.getMonth(),label:`${r[d.getMonth()]} ${d.getFullYear()}`})}const p=n.map(o=>t.filter(d=>{const u=this._getPpeReceiptDate(d);return u&&u.getFullYear()===o.y&&u.getMonth()===o.m}).length);if(p.reduce((o,d)=>o+d,0)===0){s.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),s.style.display="";try{this._ppeAnalyticsCharts[e]&&this._ppeAnalyticsCharts[e].destroy()}catch{}const l=Math.max(...p);this._ppeAnalyticsCharts[e]=new Chart(s,{type:"bar",data:{labels:n.map(o=>o.label),datasets:[{label:"\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A",data:p,backgroundColor:p.map(o=>o===l?"rgba(15,118,110,0.9)":"rgba(15,118,110,0.5)"),borderRadius:5,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:p,type:"line",borderColor:"rgba(30,58,138,0.9)",backgroundColor:"rgba(30,58,138,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#1E3A8A",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_ppeYearly(e,t){const s=document.getElementById(e),i=document.getElementById(e+"-empty");if(!s)return;const a=new Date().getFullYear(),r=[a-2,a-1,a],n=r.map(l=>t.filter(o=>{const d=this._getPpeReceiptDate(o);return d&&d.getFullYear()===l}).length),p=r.map(l=>t.filter(o=>{const d=this._getPpeReceiptDate(o);return d&&d.getFullYear()===l}).reduce((o,d)=>o+(parseFloat(d.quantity)||0),0));if(n.reduce((l,o)=>l+o,0)===0){s.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),s.style.display="";try{this._ppeAnalyticsCharts[e]&&this._ppeAnalyticsCharts[e].destroy()}catch{}this._ppeAnalyticsCharts[e]=new Chart(s,{type:"bar",data:{labels:r.map(String),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A",data:n,backgroundColor:"rgba(15,118,110,0.78)",borderRadius:5,borderSkipped:!1,yAxisID:"y"},{label:"\u0627\u0644\u0643\u0645\u064A\u0627\u062A",data:p,backgroundColor:"rgba(30,58,138,0.78)",borderRadius:5,borderSkipped:!1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:12}}},y:{beginAtZero:!0,position:"right",ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"},title:{display:!0,text:"\u0639\u062F\u062F",font:{size:10}}},y1:{beginAtZero:!0,position:"left",ticks:{precision:0,font:{size:11}},grid:{display:!1},title:{display:!0,text:"\u0643\u0645\u064A\u0629",font:{size:10}}}}}})},_ppePopulateFactoryCards(e,t){const s=document.getElementById("ppe-factories-cards");if(!s)return;if(t===0){s.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>';return}const i=this._ppeGroupBy(e,r=>(r._factoryDisplay||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),0),a=[{primary:"#0F766E",light:"#f0fdfa",progress:"linear-gradient(90deg, #5eead4 0%, #0F766E 100%)"},{primary:"#0E7490",light:"#ecfeff",progress:"linear-gradient(90deg, #67e8f9 0%, #0E7490 100%)"},{primary:"#1E3A8A",light:"#eef2ff",progress:"linear-gradient(90deg, #93c5fd 0%, #1E3A8A 100%)"},{primary:"#f59e0b",light:"#fffbeb",progress:"linear-gradient(90deg, #fcd34d 0%, #f59e0b 100%)"},{primary:"#6366f1",light:"#eef2ff",progress:"linear-gradient(90deg, #a5b4fc 0%, #6366f1 100%)"}];s.innerHTML=i.labels.map((r,n)=>{const p=i.data[n],l=Math.round(p/t*100)||0,o=e.filter(y=>(y._factoryDisplay||"").trim()===r&&this._normalizePpeStatus(y.status)==="received").length,d=e.filter(y=>(y._factoryDisplay||"").trim()===r&&this._normalizePpeStatus(y.status)==="pending").length,u=a[n%a.length];return`
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all .2s;cursor:pointer;" 
                     onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';this.style.borderColor='${u.primary}'" 
                     onmouseout="this.style.transform='';this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)';this.style.borderColor='#e2e8f0'"
                     onclick="const el = document.getElementById('ppe-af-factory'); if(el){el.value='${Utils.escapeHTML(r)}'; el.dispatchEvent(new Event('change'));}">
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <div style="width:36px;height:36px;background:${u.light};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${u.primary};">
                                <i class="fas fa-industry" style="font-size:16px;"></i>
                            </div>
                            <span style="font-size:0.9rem;font-weight:800;color:#1e293b;">${Utils.escapeHTML(r)}</span>
                        </div>
                        <span style="font-size:1.15rem;font-weight:900;color:${u.primary};">${l}%</span>
                    </div>
                    
                    <div style="width:100%;height:8px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                        <div style="width:${l}%;height:100%;background:${u.progress};border-radius:9999px;"></div>
                    </div>
                    
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:4px;border-top:1px solid #f1f5f9;padding-top:12px;">
                        <div style="text-align:center;">
                            <div style="font-size:0.65rem;color:#64748b;margin-bottom:2px;">\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A</div>
                            <div style="font-size:0.85rem;font-weight:800;color:#1e293b;">${p}</div>
                        </div>
                        <div style="text-align:center;border-left:1px solid #f1f5f9;border-right:1px solid #f1f5f9;">
                            <div style="font-size:0.65rem;color:#047857;margin-bottom:2px;">\u0645\u0633\u062A\u0644\u0645\u0629</div>
                            <div style="font-size:0.85rem;font-weight:800;color:#047857;">${o}</div>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:0.65rem;color:#f59e0b;margin-bottom:2px;">\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645</div>
                            <div style="font-size:0.85rem;font-weight:800;color:#f59e0b;">${d}</div>
                        </div>
                    </div>
                </div>
            `}).join("")},_ppePopulateAnalyticsLists(e,t,s){const i=o=>Utils.escapeHTML(o),a=(o,d,u,y,m,f)=>o.labels.length?o.labels.map((b,w)=>{const c=o.data[w],x=d>0?Math.round(c/d*100):0,v=f?`onclick="const el = document.getElementById('${f}'); if(el){el.value=this.getAttribute('data-value'); el.dispatchEvent(new Event('change'));}"`:"";return`
                    <div style="display:flex;flex-direction:column;gap:5px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;cursor:pointer;transition:all .2s;" 
                         onmouseover="this.style.transform='translateX(-2px)';" onmouseout="this.style.transform='';"
                         data-value="${i(b)}"
                         ${v}>
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-size:0.78rem;font-weight:700;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${i(b)}">${i(b)}</span>
                            <span style="font-size:0.75rem;font-weight:700;color:${u};flex-shrink:0;">${c} (${x}%)</span>
                        </div>
                        <div style="width:100%;height:6px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                            <div style="width:${x}%;height:100%;background:linear-gradient(90deg, ${y} 0%, ${m} 100%);border-radius:9999px;"></div>
                        </div>
                    </div>
                `}).join(""):'<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>',r=document.getElementById("ppe-types-list");if(r){const o=this._ppeGroupBy(e,d=>String(d.equipmentType||d.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),10);r.innerHTML=a(o,s,"#0F766E","#5eead4","#0F766E","ppe-af-type")}const n=document.getElementById("ppe-depts-list");if(n){const o=this._ppeGroupBy(e,d=>(d._deptDisplay||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),10);n.innerHTML=a(o,s,"#f59e0b","#fcd34d","#f59e0b","ppe-af-dept")}const p=document.getElementById("ppe-suppliers-list");if(p){const o=this._ppeGroupBy(t,u=>String(u.supplier||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),8),d=t.length;p.innerHTML=a(o,d,"#8b5cf6","#c4b5fd","#8b5cf6","ppe-af-supplier")}const l=document.getElementById("ppe-locs-list");if(l){const o=this._ppeGroupBy(e,d=>(d._locationDisplay||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),10);l.innerHTML=a(o,s,"#3b82f6","#93c5fd","#3b82f6","ppe-af-location")}},_ppeBindAnalyticsEvents(){const e=document.getElementById("ppe-analytics-root");if(!e)return;e.querySelectorAll(".ppe-period-btn").forEach(n=>{n.addEventListener("click",()=>{this._ppeAnalyticsPeriod=n.getAttribute("data-period"),e.querySelectorAll(".ppe-period-btn").forEach(p=>{const l=p===n;p.style.background=l?"#fff":"rgba(255,255,255,0.15)",p.style.color=l?"#0F766E":"#fff"}),this.updatePpeAnalyticsDashboard()})});const t=document.getElementById("ppe-analytics-refresh");t&&t.addEventListener("click",()=>this.updatePpeAnalyticsDashboard());const s=document.getElementById("ppe-export-pdf-btn");s&&s.addEventListener("click",()=>this._ppeExportAnalyticsPDF());const i=document.getElementById("ppe-toggle-filters-btn"),a=document.getElementById("ppe-filter-panel");i&&a&&i.addEventListener("click",()=>{const n=a.style.display!=="none";a.style.display=n?"none":"block",i.style.background=n?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"}),["ppe-af-type","ppe-af-dept","ppe-af-category","ppe-af-status","ppe-af-supplier","ppe-af-factory","ppe-af-location"].forEach(n=>{const p=document.getElementById(n);p&&p.addEventListener("change",()=>this.updatePpeAnalyticsDashboard())});const r=document.getElementById("ppe-filter-reset-btn");r&&r.addEventListener("click",()=>{["ppe-af-type","ppe-af-dept","ppe-af-category","ppe-af-status","ppe-af-supplier","ppe-af-factory","ppe-af-location"].forEach(n=>{const p=document.getElementById(n);p&&(p.value="")}),this.updatePpeAnalyticsDashboard()})},async _ppeExportAnalyticsPDF(){try{const e=document.getElementById("ppe-analytics-root");if(!e){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}if((typeof html2canvas>"u"||typeof window.jspdf>"u")&&(Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u0635\u062F\u064A\u0631\u2026"),await Promise.all([new Promise(l=>{if(typeof html2canvas<"u")return l();const o=document.createElement("script");o.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",o.onload=l,o.onerror=l,document.head.appendChild(o)}),new Promise(l=>{if(typeof window.jspdf<"u")return l();const o=document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",o.onload=l,o.onerror=l,document.head.appendChild(o)})]),Loading.hide()),typeof html2canvas>"u"||typeof window.jspdf>"u"){Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631\u2026");const t=String(AppState?.companySettings?.name||"SafetyHub | ICAPP").trim(),s=String(AppState?.companySettings?.secondaryName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629").trim(),i=typeof Utils<"u"&&typeof Utils.formatDateTime=="function"?Utils.formatDateTime(new Date):new Date().toLocaleString("ar-EG"),a=document.createElement("div");a.id="ppe-pdf-header-temp",a.style.cssText="background:linear-gradient(135deg,#0F766E 0%,#0E7490 50%,#1E3A8A 100%);color:#fff;padding:18px 24px;border-radius:14px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;font-family:Arial,sans-serif;",a.innerHTML=`
                <div>
                    <div style="font-size:18px;font-weight:800;margin-bottom:4px;white-space:nowrap;word-break:keep-all;">${Utils.escapeHTML(t)}</div>
                    <div style="font-size:13px;opacity:0.95;">${Utils.escapeHTML(s)}</div>
                </div>
                <div style="text-align:end;">
                    <div style="font-size:16px;font-weight:700;margin-bottom:4px;">\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</div>
                    <div style="font-size:12px;opacity:0.95;" dir="ltr">${Utils.escapeHTML(i)}</div>
                </div>
            `,e.insertBefore(a,e.firstChild);const r=await html2canvas(e,{scale:Utils.PdfExport.getOptimalCaptureScale(e.scrollWidth,e.scrollHeight,Utils.PdfExport.DEFAULT_CAPTURE_SCALE),useCORS:!0,backgroundColor:"#ffffff",logging:!1});a.remove();const n=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});if(!n)throw new Error("jsPDF unavailable");Utils.PdfExport.appendCanvasAsPdfPages(n,r,{marginMm:0});const p=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);Utils.PdfExport.savePdf(n,`PPE-Analytics-${p}.pdf`),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(e.message||e));const t=document.getElementById("ppe-pdf-header-temp");t&&t.remove()}}};(function(){"use strict";try{typeof window<"u"&&typeof PPE<"u"&&(window.PPE=PPE,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 PPE module loaded and available on window.PPE"))}catch{if(typeof window<"u"&&typeof PPE<"u")try{window.PPE=PPE}catch{}}})();
