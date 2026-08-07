const PPE={state:{activeTab:"receipts",isSwitchingTab:!1,eventListeners:new Map,stockItemsCache:null,stockItemsCacheTime:null,stockCacheExpiry:3e5,ppeItemsListCache:null,ppeItemsListCacheTime:null,ppeItemsListCacheExpiry:12e4,ppeItemsOptionsHTML:"",stockStaleWarningMsg:"",stockLoadHardErrorMsg:"",lastSyncTime:null,filters:{receipts:{search:"",equipmentType:"",status:"",dateFrom:"",dateTo:""},stock:{search:"",category:"",supplier:"",status:"",dateFrom:"",dateTo:""}}},_t(t,e){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(t,e):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(t,e):e},applyModuleI18n(t){const e=t&&t.nodeType?t:document.getElementById("ppe-section");if(!e)return;const s=window.AppI18n&&typeof window.AppI18n.applyModuleI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyModuleI18n=="function"?window.I18n:null;s&&s.applyModuleI18n(e)},ensurePpeFilterStyles(){if(document.getElementById("ppe-module-filter-styles"))return;const t=document.createElement("style");t.id="ppe-module-filter-styles",t.textContent=`
            .ppe-visits-filters-row { position: relative; }
            .ppe-visits-filters-row .filters-grid { width: 100%; }
            .ppe-visits-filters-row .filter-field { display: flex; flex-direction: column; gap: 6px; }
            .ppe-visits-filters-row .filter-label {
                font-size: 12px; font-weight: 600; color: #4a5568; text-transform: uppercase;
                letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;
            }
            .ppe-visits-filters-row .filter-label i { font-size: 11px; color: #2563eb; }
            .ppe-visits-filters-row .filter-input {
                width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
                background: white; font-size: 14px; color: #2d3748; transition: all 0.2s ease;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }
            .ppe-visits-filters-row .filter-input:focus {
                outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
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
                padding: 2px 8px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
                color: white; border-radius: 12px; font-size: 11px; font-weight: 700; margin-inline-start: 4px;
            }
            .ppe-receipts-kpi { margin: 0 0 1.1rem; direction: rtl; }
            .ppe-receipts-kpi__intro {
                display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between;
                gap: 10px; margin-bottom: 12px;
            }
            .ppe-receipts-kpi__title {
                margin: 0; font-size: 0.95rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 8px;
            }
            .ppe-receipts-kpi__title i {
                width: 1.75rem; height: 1.75rem; border-radius: 8px; display: inline-flex; align-items: center;
                justify-content: center; background: rgba(37, 99, 235, 0.1); color: #2563eb; font-size: 0.85rem;
            }
            .ppe-receipts-kpi__sub { margin: 4px 0 0; font-size: 0.78rem; color: #64748b; line-height: 1.45; }
            .ppe-receipts-kpi__meta {
                display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px;
                background: #eff6ff; border: 1px solid #bfdbfe; color: #2563eb; font-size: 0.75rem; font-weight: 700;
            }
            .ppe-receipts-kpi__grid {
                display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; align-items: stretch;
            }
            .ppe-rk-card {
                position: relative; overflow: hidden; background: #fff; border: 1px solid #e2e8f0;
                border-radius: 14px; padding: 14px 14px 12px; min-height: 108px; box-sizing: border-box;
                box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); transition: transform 0.15s ease, box-shadow 0.15s ease;
            }
            .ppe-rk-card::before {
                content: ''; position: absolute; inset-inline-start: 0; top: 0; bottom: 0; width: 4px;
            }
            .ppe-rk-card:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08); }
            .ppe-rk-card__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
            .ppe-rk-card__icon {
                width: 40px; height: 40px; border-radius: 12px; display: inline-flex; align-items: center;
                justify-content: center; font-size: 1rem; flex-shrink: 0;
            }
            .ppe-rk-card__label { margin: 0; font-size: 0.78rem; font-weight: 700; color: #475569; line-height: 1.35; }
            .ppe-rk-card__value {
                margin: 8px 0 0; font-size: 1.65rem; font-weight: 900; line-height: 1; color: #0f172a;
                font-variant-numeric: tabular-nums;
            }
            .ppe-rk-card__desc { margin: 8px 0 0; font-size: 0.72rem; color: #64748b; line-height: 1.4; }
            .ppe-rk-card__chip {
                display: inline-flex; align-items: center; margin-top: 8px; padding: 3px 8px; border-radius: 999px;
                font-size: 0.68rem; font-weight: 700; background: #f8fafc; color: #475569; border: 1px solid #e2e8f0;
            }
            .ppe-rk-card--total::before { background: #2563eb; }
            .ppe-rk-card--total .ppe-rk-card__icon { background: #eff6ff; color: #2563eb; }
            .ppe-rk-card--received::before { background: #16a34a; }
            .ppe-rk-card--received .ppe-rk-card__icon { background: #f0fdf4; color: #16a34a; }
            .ppe-rk-card--pending::before { background: #d97706; }
            .ppe-rk-card--pending .ppe-rk-card__icon { background: #fffbeb; color: #d97706; }
            .ppe-rk-card--pending.is-attention { background: linear-gradient(180deg, #fffbeb 0%, #fff 70%); border-color: #fde68a; }
            .ppe-rk-card--employees::before { background: #2563eb; }
            .ppe-rk-card--employees .ppe-rk-card__icon { background: #eff6ff; color: #2563eb; }
            @media (max-width: 1100px) {
                .ppe-receipts-kpi__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }
            @media (max-width: 640px) {
                .ppe-receipts-kpi__grid { grid-template-columns: 1fr; }
            }
            /* ===== \u0628\u0637\u0627\u0642\u0629 \u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u2014 \u0647\u0648\u064A\u0629 HSE \u0627\u0644\u0632\u0631\u0642\u0627\u0621 ===== */
            .ppe-elig-outer { background: #fff; border: 1px solid #dbeafe; box-shadow: 0 10px 24px rgba(37, 99, 235, 0.08); }
            .ppe-elig--gray { border-color: #e2e8f0; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06); }
            .ppe-elig--green { border-color: #a7f3d0; box-shadow: 0 10px 24px rgba(4, 120, 87, 0.10); }
            .ppe-elig--red { border-color: #fecaca; box-shadow: 0 10px 24px rgba(185, 28, 28, 0.08); }
            .ppe-elig-head { background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); box-shadow: inset 0 -2px 8px rgba(0, 0, 0, 0.08); }
            .ppe-elig--gray .ppe-elig-head { background: linear-gradient(135deg, #334155 0%, #475569 100%); }
            .ppe-elig--green .ppe-elig-head { background: linear-gradient(135deg, #047857 0%, #16a34a 100%); }
            .ppe-elig--red .ppe-elig-head { background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%); }
            .ppe-elig-head-icon { background: rgba(255, 255, 255, 0.18); border: 2px solid rgba(255, 255, 255, 0.35); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12); }
            .ppe-elig-tile {
                border: 1px solid #dbeafe; background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
                padding: 0.9rem 1rem; min-width: 0; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
                transition: transform 0.15s ease, box-shadow 0.15s ease;
            }
            .ppe-elig-tile:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(37, 99, 235, 0.12); }
            .ppe-elig--gray .ppe-elig-tile { border-color: #e2e8f0; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); }
            .ppe-elig--green .ppe-elig-tile { border-color: #a7f3d0; background: linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%); }
            .ppe-elig--red .ppe-elig-tile { border-color: #fecaca; background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%); }
            .ppe-elig-tile-icon {
                display: inline-flex; align-items: center; justify-content: center; width: 2.75rem; height: 2.75rem;
                border-radius: 0.9rem; background: #dbeafe; color: #1e40af; font-size: 0.95rem; flex-shrink: 0;
            }
            .ppe-elig--gray .ppe-elig-tile-icon { background: #e2e8f0; color: #334155; }
            .ppe-elig--green .ppe-elig-tile-icon { background: #a7f3d0; color: #047857; }
            .ppe-elig--red .ppe-elig-tile-icon { background: #fecaca; color: #b91c1c; }
            .ppe-elig-label { font-size: 11px; font-weight: 700; letter-spacing: 0.02em; color: #3b82f6; line-height: 1.5; }
            .ppe-elig--gray .ppe-elig-label { color: #64748b; }
            .ppe-elig--green .ppe-elig-label { color: #047857; }
            .ppe-elig--red .ppe-elig-label { color: #b91c1c; }
            .ppe-elig-foot { border-top: 1px solid #dbeafe; background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%); }
            .ppe-elig--gray .ppe-elig-foot { border-top-color: #e2e8f0; background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 70%); }
            .ppe-elig--green .ppe-elig-foot { border-top-color: #a7f3d0; background: linear-gradient(180deg, #ecfdf5 0%, #d1fae5 70%); }
            .ppe-elig--red .ppe-elig-foot { border-top-color: #fecaca; background: linear-gradient(180deg, #fef2f2 0%, #fee2e2 70%); }
            @media print {
                .ppe-rk-card { box-shadow: none !important; break-inside: avoid; }
                .ppe-rk-card:hover { transform: none; }
                .ppe-elig-outer { box-shadow: none !important; }
            }
        `,document.head.appendChild(t)},computeReceiptsKpiStats(t,e){const s=Array.isArray(t)?t:[],i=Array.isArray(e)?e:s;let a=0,r=0;const n=new Set;for(let p=0;p<s.length;p++){const l=s[p];if(!l)continue;const o=String(l.status||"").trim();o==="\u0645\u0633\u062A\u0644\u0645"?a++:o==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"&&r++;const c=l.employeeCode||l.employeeNumber||l.employeeName;c&&n.add(String(c).trim().toLowerCase())}return{total:s.length,received:a,pending:r,employees:n.size,filteredCount:i.length,hasFilters:this.hasActiveReceiptFilters()}},buildReceiptsKpiHtml(t){const e=(p,l)=>this._t(p,l),s=p=>Utils.escapeHTML(p),i=t||this.computeReceiptsKpiStats(AppState.appData.ppe||[],[]),a=i.hasFilters?`${e("module.ppe.kpi.showingFiltered","\u0639\u0631\u0636")} ${i.filteredCount} ${e("module.ppe.kpi.ofTotal","\u0645\u0646")} ${i.total}`:`${e("module.ppe.kpi.liveSnapshot","\u0645\u0644\u062E\u0635 \u0641\u0648\u0631\u064A \u0644\u0644\u0633\u062C\u0644")}`,r=i.pending>0?`<span class="ppe-rk-card__chip"><i class="fas fa-exclamation-circle ml-1"></i>${s(e("module.ppe.kpi.needsFollowUp","\u062A\u062D\u062A\u0627\u062C \u0645\u062A\u0627\u0628\u0639\u0629"))}</span>`:`<span class="ppe-rk-card__chip">${s(e("module.ppe.kpi.noPending","\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0639\u0644\u0651\u0642"))}</span>`,n=i.total>0?Math.round(i.received/i.total*100):0;return`
            <section class="ppe-receipts-kpi" id="ppe-receipts-kpi" aria-label="${s(e("module.ppe.kpi.sectionLabel","\u0645\u0644\u062E\u0635 \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}">
                <div class="ppe-receipts-kpi__intro">
                    <div>
                        <h3 class="ppe-receipts-kpi__title">
                            <i class="fas fa-clipboard-list" aria-hidden="true"></i>
                            <span>${s(e("module.ppe.kpi.sectionTitle","\u0644\u0648\u062D\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"))}</span>
                        </h3>
                        <p class="ppe-receipts-kpi__sub">${s(e("module.ppe.kpi.sectionSub","\u0623\u0631\u0642\u0627\u0645 \u0633\u0631\u064A\u0639\u0629 \u062A\u0633\u0627\u0639\u062F\u0643 \u0639\u0644\u0649 \u0641\u0647\u0645 \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u062F\u0648\u0646 \u0641\u062A\u062D \u0643\u0644 \u0633\u062C\u0644."))}</p>
                    </div>
                    <span class="ppe-receipts-kpi__meta" id="ppe-receipts-kpi-meta">
                        <i class="fas fa-filter" aria-hidden="true"></i>${s(a)}
                    </span>
                </div>
                <div class="ppe-receipts-kpi__grid">
                    <article class="ppe-rk-card ppe-rk-card--total">
                        <div class="ppe-rk-card__head">
                            <div>
                                <p class="ppe-rk-card__label">${s(e("module.ppe.kpi.totalReceipts","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"))}</p>
                                <p class="ppe-rk-card__value" id="ppe-kpi-total">${i.total}</p>
                            </div>
                            <span class="ppe-rk-card__icon" aria-hidden="true"><i class="fas fa-receipt"></i></span>
                        </div>
                        <p class="ppe-rk-card__desc">${s(e("module.ppe.kpi.totalReceiptsDesc","\u0643\u0644 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0633\u062C\u0651\u0644\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645"))}</p>
                    </article>
                    <article class="ppe-rk-card ppe-rk-card--received">
                        <div class="ppe-rk-card__head">
                            <div>
                                <p class="ppe-rk-card__label">${s(e("module.ppe.kpi.receivedItems","\u0645\u0647\u0645\u0627\u062A \u062A\u0645 \u062A\u0633\u0644\u064A\u0645\u0647\u0627"))}</p>
                                <p class="ppe-rk-card__value" id="ppe-kpi-received">${i.received}</p>
                            </div>
                            <span class="ppe-rk-card__icon" aria-hidden="true"><i class="fas fa-check-circle"></i></span>
                        </div>
                        <p class="ppe-rk-card__desc">${s(e("module.ppe.kpi.receivedItemsDesc","\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0645\u0643\u062A\u0645\u0644\u0629 \u0648\u0645\u0648\u062B\u0651\u0642\u0629"))}</p>
                        <span class="ppe-rk-card__chip">${n}% ${s(e("module.ppe.kpi.ofAll","\u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A"))}</span>
                    </article>
                    <article class="ppe-rk-card ppe-rk-card--pending${i.pending>0?" is-attention":""}">
                        <div class="ppe-rk-card__head">
                            <div>
                                <p class="ppe-rk-card__label">${s(e("module.ppe.kpi.pendingItems","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"))}</p>
                                <p class="ppe-rk-card__value" id="ppe-kpi-pending">${i.pending}</p>
                            </div>
                            <span class="ppe-rk-card__icon" aria-hidden="true"><i class="fas fa-clock"></i></span>
                        </div>
                        <p class="ppe-rk-card__desc">${s(e("module.ppe.kpi.pendingItemsDesc","\u0633\u062C\u0644\u0627\u062A \u0644\u0645 \u062A\u064F\u063A\u0644\u0642 \u0628\u0639\u062F \u2014 \u0631\u0627\u062C\u0639\u0647\u0627 \u0623\u0648\u0644\u0627\u064B"))}</p>
                        ${r}
                    </article>
                    <article class="ppe-rk-card ppe-rk-card--employees">
                        <div class="ppe-rk-card__head">
                            <div>
                                <p class="ppe-rk-card__label">${s(e("module.ppe.kpi.uniqueEmployees","\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0648\u0646"))}</p>
                                <p class="ppe-rk-card__value" id="ppe-kpi-employees">${i.employees}</p>
                            </div>
                            <span class="ppe-rk-card__icon" aria-hidden="true"><i class="fas fa-users"></i></span>
                        </div>
                        <p class="ppe-rk-card__desc">${s(e("module.ppe.kpi.uniqueEmployeesDesc","\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F\u064A\u0646 \u0645\u0646 \u0627\u0644\u0645\u0647\u0645\u0627\u062A"))}</p>
                    </article>
                </div>
            </section>
        `},_ppeBindOnce(t,e,s){if(!t||!e||typeof s!="function")return;const i=`data-ppe-bound-${e}`;t.hasAttribute(i)||(t.setAttribute(i,"1"),t.addEventListener(e,s))},_ppeCaptureFocus(t){try{const e=document.activeElement;return!e||!t||!t.contains(e)||!e.id?null:{id:e.id,start:typeof e.selectionStart=="number"?e.selectionStart:null,end:typeof e.selectionEnd=="number"?e.selectionEnd:null}}catch{return null}},_ppeRestoreFocus(t){if(!(!t||!t.id))try{const e=document.getElementById(t.id);if(!e)return;if(e.focus({preventScroll:!0}),t.start!=null&&typeof e.setSelectionRange=="function"){const s=String(e.value||"").length,i=Math.min(t.start,s),a=Math.min(t.end!=null?t.end:i,s);e.setSelectionRange(i,a)}}catch{}},_ppeMatchesSearch(t,e){const s=String(e||"").trim().toLowerCase();if(!s)return!0;const i=(Array.isArray(t)?t:[t]).map(r=>String(r??"").toLowerCase()).join(" | "),a=s.split(/\s+/).filter(Boolean);return a.length?a.every(r=>i.includes(r)):!0},showPPEFormById(t){const s=(typeof AppState<"u"&&AppState.appData&&Array.isArray(AppState.appData.ppe)?AppState.appData.ppe:[]).find(i=>i&&String(i.id)===String(t));return this.showPPEForm(s||null)},getDisplayStatus(t){const e=String(t||"").trim();return e==="\u0645\u0633\u062A\u0644\u0645"?this._t("module.ppe.status.received","\u0645\u0633\u062A\u0644\u0645"):e==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"?this._t("module.ppe.status.pending","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"):e||"\u2014"},isStatusReceived(t){return String(t||"").trim()==="\u0645\u0633\u062A\u0644\u0645"},getFilteredPpeReceipts(t){const e=Array.isArray(t)?t:[],s=this.state.filters?.receipts||{},i=(s.search||"").trim().toLowerCase(),a=s.equipmentType||"",r=s.status||"",n=s.dateFrom?new Date(s.dateFrom+"T00:00:00"):null,p=s.dateTo?new Date(s.dateTo+"T23:59:59.999"):null;return n&&isNaN(n.getTime())||p&&isNaN(p.getTime())?e:e.filter(l=>{if(a&&String(l.equipmentType||"")!==a||r&&String(l.status||"")!==r)return!1;if(n||p){if(!l.receiptDate)return!1;const o=new Date(l.receiptDate);if(isNaN(o.getTime())||n&&o<n||p&&o>p)return!1}return!(i&&!this._ppeMatchesSearch([l.receiptNumber,l.id,l.employeeName,l.employeeCode,l.employeeNumber,l.equipmentType,l.status,l.employeeDepartment,l.department,l.createdBy,l.createdByUser,l.recordedBy,l.recorderName,l.shoeSize,l.quantity,l.notes,l.remarks,l.site,l.location],i))})},hasActiveReceiptFilters(){const t=this.state.filters?.receipts||{};return!!(t.search||t.equipmentType||t.status||t.dateFrom||t.dateTo)},resetReceiptFilters(){this.state.filters||(this.state.filters={}),this.state.filters.receipts={search:"",equipmentType:"",status:"",dateFrom:"",dateTo:""}},getFilteredStockItems(t){const e=Array.isArray(t)?t:[],s=this.state.filters&&this.state.filters.stock||{},i=(s.search||"").trim().toLowerCase(),a=s.category||"",r=s.supplier||"",n=s.status||"",p=s.dateFrom?new Date(s.dateFrom+"T00:00:00"):null,l=s.dateTo?new Date(s.dateTo+"T23:59:59.999"):null;return p&&isNaN(p.getTime())||l&&isNaN(l.getTime())?e:e.filter(o=>{if(!o||a&&String(o.category||"")!==a||r&&String(o.supplier||"")!==r)return!1;if(n){const c=parseFloat(o.balance||0),h=parseFloat(o.minThreshold||0),y=c<h;if(n==="low"&&!y||n==="available"&&y)return!1}if(p||l){if(!o.lastUpdate)return!1;const c=new Date(o.lastUpdate);if(isNaN(c.getTime())||p&&c<p||l&&c>l)return!1}return!(i&&!this._ppeMatchesSearch([o.itemCode,o.itemName,o.category,o.supplier,o.itemId,o.unit,o.notes,o.balance,o.minThreshold,o.location],i))})},hasActiveStockFilters(){const t=this.state.filters&&this.state.filters.stock||{};return!!(t.search||t.category||t.supplier||t.status||t.dateFrom||t.dateTo)},resetStockFilters(){this.state.filters||(this.state.filters={}),this.state.filters.stock={search:"",category:"",supplier:"",status:"",dateFrom:"",dateTo:""}},buildStockFilterRow(t){const e=(o,c)=>this._t(o,c),s=o=>Utils.escapeHTML(o);this.ensurePpeFilterStyles();const i=Array.isArray(t)?t:[],a=this.state.filters&&this.state.filters.stock||{},r=this.getFilteredStockItems(i),n=typeof document<"u"&&(document.documentElement.getAttribute("dir")==="rtl"||window.AppI18n&&window.AppI18n.getCurrentLang&&window.AppI18n.getCurrentLang()==="ar"),p=[...new Set(i.map(o=>o&&o.category).filter(Boolean))].sort(),l=[...new Set(i.map(o=>o&&o.supplier).filter(Boolean))].sort();return`
            <div class="ppe-visits-filters-row visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 0 14px 0; width: 100%; direction: ${n?"rtl":"ltr"}; border-radius: 10px;">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <div class="filter-field" style="min-width: 180px;">
                        <label class="filter-label" for="ppe-stock-search">
                            <i class="fas fa-search ml-1"></i>${s(e("module.ppe.filter.search","\u0628\u062D\u062B"))}
                        </label>
                        <input type="text" id="ppe-stock-search" class="form-input pr-10 filter-input" placeholder="${s(e("module.ppe.stock.filter.searchPlaceholder","\u0643\u0648\u062F/\u0627\u0633\u0645/\u0641\u0626\u0629/\u0645\u0648\u0631\u062F"))}" value="${s(a.search||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-stock-filter-category">
                            <i class="fas fa-tags ml-1"></i>${s(e("module.ppe.stock.category","\u0627\u0644\u0641\u0626\u0629"))}
                            ${a.category?`<span class="filter-count-badge" title="${s(e("module.ppe.filter.badgeCount",""))}">${r.length}</span>`:""}
                        </label>
                        <select id="ppe-stock-filter-category" class="form-input filter-input">
                            <option value="">${s(e("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${p.map(o=>`<option value="${s(o)}" ${a.category===o?"selected":""}>${s(o)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-stock-filter-supplier">
                            <i class="fas fa-truck ml-1"></i>${s(e("module.ppe.stock.supplier","\u0627\u0644\u0645\u0648\u0631\u062F"))}
                            ${a.supplier?`<span class="filter-count-badge" title="${s(e("module.ppe.filter.badgeCount",""))}">${r.length}</span>`:""}
                        </label>
                        <select id="ppe-stock-filter-supplier" class="form-input filter-input">
                            <option value="">${s(e("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${l.map(o=>`<option value="${s(o)}" ${a.supplier===o?"selected":""}>${s(o)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-stock-filter-status">
                            <i class="fas fa-signal ml-1"></i>${s(e("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}
                            ${a.status?`<span class="filter-count-badge" title="${s(e("module.ppe.filter.badgeCount",""))}">${r.length}</span>`:""}
                        </label>
                        <select id="ppe-stock-filter-status" class="form-input filter-input">
                            <option value="">${s(e("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            <option value="available" ${a.status==="available"?"selected":""}>${s(e("module.ppe.status.available","\u0645\u062A\u0648\u0641\u0631"))}</option>
                            <option value="low" ${a.status==="low"?"selected":""}>${s(e("module.ppe.status.lowStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636"))}</option>
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-stock-date-from"><i class="fas fa-calendar-alt ml-1"></i>${s(e("module.ppe.stock.filter.dateFrom","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B"))}</label>
                        <input type="date" id="ppe-stock-date-from" class="form-input filter-input" value="${s(a.dateFrom||"")}">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-stock-date-to"><i class="fas fa-calendar-check ml-1"></i>${s(e("module.ppe.stock.filter.dateTo","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B"))}</label>
                        <input type="date" id="ppe-stock-date-to" class="form-input filter-input" value="${s(a.dateTo||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 170px;">
                        <button type="button" id="ppe-stock-reset-filters" class="filter-reset-btn" title="${s(e("module.ppe.filter.resetTitle",""))}">
                            <i class="fas fa-rotate-left ml-1"></i>${s(e("module.ppe.filter.reset","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                        </button>
                    </div>
                </div>
            </div>`},buildPPEListHtml(){const t=(u,v)=>this._t(u,v);this.ensurePpeFilterStyles();const e=AppState.appData.ppe||[],s=this.state.filters?.receipts||{},i=this.getFilteredPpeReceipts(e),a=this.hasActiveReceiptFilters(),r=typeof document<"u"&&(document.documentElement.getAttribute("dir")==="rtl"||window.AppI18n&&window.AppI18n.getCurrentLang&&window.AppI18n.getCurrentLang()==="ar"),n=u=>Utils.escapeHTML(u),p=[...new Set(e.map(u=>u.equipmentType).filter(Boolean))].sort(),l=["\u0645\u0633\u062A\u0644\u0645","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"],o=this.computeReceiptsKpiStats(e,i),c=this.buildReceiptsKpiHtml(o),h=`
            <div class="ppe-visits-filters-row visits-filters-row" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 16px 20px; margin: 0 0 14px 0; width: 100%; border: 1px solid #e2e8f0; border-radius: 12px; direction: ${r?"rtl":"ltr"};">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <div class="filter-field" style="min-width: 180px;">
                        <label class="filter-label" for="ppe-receipts-search">
                            <i class="fas fa-search ml-1"></i>${n(t("module.ppe.filter.search","\u0628\u062D\u062B"))}
                        </label>
                        <input type="text" id="ppe-receipts-search" class="form-input pr-10 filter-input" placeholder="${n(t("module.ppe.filter.searchPlaceholder",""))}" value="${n(s.search||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-receipts-filter-type">
                            <i class="fas fa-hard-hat ml-1"></i>${n(t("module.ppe.filter.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}
                            ${s.equipmentType?`<span class="filter-count-badge" title="${n(t("module.ppe.filter.badgeCount",""))}">${i.length}</span>`:""}
                        </label>
                        <select id="ppe-receipts-filter-type" class="form-input filter-input">
                            <option value="">${n(t("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${p.map(u=>`<option value="${n(u)}" ${s.equipmentType===u?"selected":""}>${n(u)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="ppe-receipts-filter-status">
                            <i class="fas fa-signal ml-1"></i>${n(t("module.ppe.filter.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}
                            ${s.status?`<span class="filter-count-badge" title="${n(t("module.ppe.filter.badgeCount",""))}">${i.length}</span>`:""}
                        </label>
                        <select id="ppe-receipts-filter-status" class="form-input filter-input">
                            <option value="">${n(t("module.common.all","\u0627\u0644\u0643\u0644"))}</option>
                            ${l.map(u=>`<option value="${n(u)}" ${s.status===u?"selected":""}>${n(this.getDisplayStatus(u))}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-receipts-date-from"><i class="fas fa-calendar-alt ml-1"></i>${n(t("module.ppe.filter.dateFrom","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</label>
                        <input type="date" id="ppe-receipts-date-from" class="form-input filter-input" value="${n(s.dateFrom||"")}">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="ppe-receipts-date-to"><i class="fas fa-calendar-check ml-1"></i>${n(t("module.ppe.filter.dateTo","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</label>
                        <input type="date" id="ppe-receipts-date-to" class="form-input filter-input" value="${n(s.dateTo||"")}">
                    </div>
                    <div class="filter-field" style="min-width: 170px;">
                        <button type="button" id="ppe-receipts-reset-filters" class="filter-reset-btn" title="${n(t("module.ppe.filter.resetTitle",""))}">
                            <i class="fas fa-rotate-left ml-1"></i>${n(t("module.ppe.filter.reset","\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                        </button>
                    </div>
                </div>
            </div>`;if(e.length===0){const u=`<div class="empty-state"><p class="text-gray-500">${n(t("module.ppe.empty.noReceipts","\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0645\u0633\u062C\u0644\u0629"))}</p></div>`;return c+this._buildExcelToolbarHtml("receipts")+`<div id="ppe-receipts-filters-host">${h}</div><div id="ppe-receipts-results-host">${u}</div>`}const y=a&&i.length===0?`
            <div class="empty-state">
                <i class="fas fa-filter text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 mb-2">${n(t("module.ppe.filter.noMatch","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629"))}</p>
                <button type="button" id="ppe-receipts-clear-empty-filters" class="btn-secondary mt-2">
                    <i class="fas fa-undo-alt ml-2"></i>${n(t("module.ppe.filter.clearEmpty","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                </button>
            </div>
        `:"";if(i.length===0)return c+this._buildExcelToolbarHtml("receipts")+`<div id="ppe-receipts-filters-host">${h}</div><div id="ppe-receipts-results-host">${y}</div>`;const d=t("module.common.view","\u0639\u0631\u0636"),m=t("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF"),x=t("module.common.edit","\u062A\u0639\u062F\u064A\u0644"),k=t("module.ppe.btn.deleteReceipt","\u062D\u0630\u0641"),f=`
            <table class="data-table table-header-blue">
                <thead>
                    <tr>
                        <th>${n(t("module.ppe.table.receiptNo","\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644"))}</th>
                        <th>${n(t("module.ppe.table.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}</th>
                        <th>${n(t("module.ppe.table.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}</th>
                        <th>${n(t("module.ppe.table.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}</th>
                        <th>${n(t("module.ppe.table.quantity","\u0627\u0644\u0643\u0645\u064A\u0629"))}</th>
                        <th>${n(t("module.ppe.table.createdBy","\u0645\u0633\u062C\u0651\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</th>
                        <th>${n(t("module.ppe.table.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</th>
                        <th>${n(t("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}</th>
                        <th>${n(t("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                    </tr>
                </thead>
                <tbody>
                    ${i.map(u=>{const v=this.getDisplayStatus(u.status),w=String(u.id||"").replace(/\\/g,"\\\\").replace(/'/g,"\\'"),C=u.createdBy||u.createdByUser||u.recordedBy||u.recorderName||u.user||"\u2014";return`
                        <tr>
                            <td class="font-mono font-semibold">${n(u.receiptNumber||u.id||"")}</td>
                            <td>${n(u.employeeName||"")}</td>
                            <td>${n(u.employeeCode||u.employeeNumber||"")}</td>
                            <td>
                                ${n(u.equipmentType||"")}
                                ${u.shoeSize?`<span class="block text-[11px] text-blue-600 font-semibold mt-0.5"><i class="fas fa-shoe-prints ml-1 text-[10px]"></i>\u0645\u0642\u0627\u0633: ${n(u.shoeSize)}</span>`:""}
                            </td>
                            <td>${u.quantity||0}</td>
                            <td><span class="text-xs font-semibold text-gray-700"><i class="fas fa-user-edit text-blue-500 ml-1 text-[11px]"></i>${n(C)}</span></td>
                            <td>${u.receiptDate?Utils.formatDate(u.receiptDate):"-"}</td>
                            <td>
                                <span class="badge badge-${this.isStatusReceived(u.status)?"success":"warning"}">
                                    ${n(v)}
                                </span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button onclick="PPE.viewPPE('${w}')" class="btn-icon btn-icon-info" title="${n(d)}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="PPE.exportPDF('${w}')" class="btn-icon btn-icon-success" title="${n(m)}">
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                    <button onclick="PPE.showPPEFormById('${w}')" class="btn-icon btn-icon-primary" title="${n(x)}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="PPE.deletePPE('${w}')" class="btn-icon btn-icon-danger" title="${n(k)}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>`}).join("")}
                </tbody>
            </table>
        `;return c+this._buildExcelToolbarHtml("receipts")+`<div id="ppe-receipts-filters-host">${h}</div><div id="ppe-receipts-results-host">${f}</div>`},buildPPEReceiptsResultsHtml(){const t=(o,c)=>this._t(o,c),e=o=>Utils.escapeHTML(o),s=AppState.appData.ppe||[],i=this.getFilteredPpeReceipts(s),a=this.hasActiveReceiptFilters();if(s.length===0)return`<div class="empty-state"><p class="text-gray-500">${e(t("module.ppe.empty.noReceipts","\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0645\u0633\u062C\u0644\u0629"))}</p></div>`;if(i.length===0)return`
            <div class="empty-state">
                <i class="fas fa-filter text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 mb-2">${e(t("module.ppe.filter.noMatch","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629"))}</p>
                <button type="button" id="ppe-receipts-clear-empty-filters" class="btn-secondary mt-2">
                    <i class="fas fa-undo-alt ml-2"></i>${e(t("module.ppe.filter.clearEmpty","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                </button>
            </div>`;const r=t("module.common.view","\u0639\u0631\u0636"),n=t("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF"),p=t("module.common.edit","\u062A\u0639\u062F\u064A\u0644"),l=t("module.ppe.btn.deleteReceipt","\u062D\u0630\u0641");return`
            <table class="data-table table-header-blue">
                <thead>
                    <tr>
                        <th>${e(t("module.ppe.table.receiptNo","\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644"))}</th>
                        <th>${e(t("module.ppe.table.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}</th>
                        <th>${e(t("module.ppe.table.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}</th>
                        <th>${e(t("module.ppe.table.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}</th>
                        <th>${e(t("module.ppe.table.quantity","\u0627\u0644\u0643\u0645\u064A\u0629"))}</th>
                        <th>${e(t("module.ppe.table.createdBy","\u0645\u0633\u062C\u0651\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</th>
                        <th>${e(t("module.ppe.table.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}</th>
                        <th>${e(t("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}</th>
                        <th>${e(t("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                    </tr>
                </thead>
                <tbody>
                    ${i.map(o=>{const c=this.getDisplayStatus(o.status),h=String(o.id||"").replace(/\\/g,"\\\\").replace(/'/g,"\\'"),y=o.createdBy||o.createdByUser||o.recordedBy||o.recorderName||o.user||"\u2014";return`
                        <tr>
                            <td class="font-mono font-semibold">${e(o.receiptNumber||o.id||"")}</td>
                            <td>${e(o.employeeName||"")}</td>
                            <td>${e(o.employeeCode||o.employeeNumber||"")}</td>
                            <td>
                                ${e(o.equipmentType||"")}
                                ${o.shoeSize?`<span class="block text-[11px] text-blue-600 font-semibold mt-0.5"><i class="fas fa-shoe-prints ml-1 text-[10px]"></i>\u0645\u0642\u0627\u0633: ${e(o.shoeSize)}</span>`:""}
                            </td>
                            <td>${o.quantity||0}</td>
                            <td><span class="text-xs font-semibold text-gray-700"><i class="fas fa-user-edit text-blue-500 ml-1 text-[11px]"></i>${e(y)}</span></td>
                            <td>${o.receiptDate?Utils.formatDate(o.receiptDate):"-"}</td>
                            <td>
                                <span class="badge badge-${this.isStatusReceived(o.status)?"success":"warning"}">
                                    ${e(c)}
                                </span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button onclick="PPE.viewPPE('${h}')" class="btn-icon btn-icon-info" title="${e(r)}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="PPE.exportPDF('${h}')" class="btn-icon btn-icon-success" title="${e(n)}">
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                    <button onclick="PPE.showPPEFormById('${h}')" class="btn-icon btn-icon-primary" title="${e(p)}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="PPE.deletePPE('${h}')" class="btn-icon btn-icon-danger" title="${e(l)}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>`}).join("")}
                </tbody>
            </table>`},_receiptsFilterTimer:null,refreshReceiptsListUI(t={}){const e=document.getElementById("ppe-list");if(!e)return;const s=!!(t&&t.forceFull),i=this._ppeCaptureFocus(e),a=document.getElementById("ppe-receipts-results-host"),r=document.getElementById("ppe-receipts-filters-host");if(!s&&a&&r){const n=AppState.appData.ppe||[],p=this.getFilteredPpeReceipts(n),l=this.computeReceiptsKpiStats(n,p),o=document.getElementById("ppe-receipts-kpi");if(o){const c=document.createElement("div");c.innerHTML=this.buildReceiptsKpiHtml(l).trim();const h=c.firstElementChild;h&&o.replaceWith(h)}a.innerHTML=this.buildPPEReceiptsResultsHtml(),this.applyModuleI18n(a),this.bindReceiptsFilters(),this._ppeRestoreFocus(i);return}e.innerHTML=this.buildPPEListHtml(),this.applyModuleI18n(e),this.bindReceiptsFilters(),this._ppeRestoreFocus(i)},bindReceiptsFilters(){if(this.state.activeTab!=="receipts")return;const t=i=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(i):setTimeout(i,0)},e=document.getElementById("ppe-receipts-search");this._ppeBindOnce(e,"input",i=>{this.state.filters.receipts.search=i.target&&i.target.value||"",clearTimeout(this._receiptsFilterTimer),this._receiptsFilterTimer=setTimeout(()=>t(()=>this.refreshReceiptsListUI()),180)}),this._ppeBindOnce(document.getElementById("ppe-receipts-filter-type"),"change",i=>{this.state.filters.receipts.equipmentType=i.target&&i.target.value||"",this.refreshReceiptsListUI()}),this._ppeBindOnce(document.getElementById("ppe-receipts-filter-status"),"change",i=>{this.state.filters.receipts.status=i.target&&i.target.value||"",this.refreshReceiptsListUI()}),this._ppeBindOnce(document.getElementById("ppe-receipts-date-from"),"change",i=>{this.state.filters.receipts.dateFrom=i.target&&i.target.value||"",this.refreshReceiptsListUI()}),this._ppeBindOnce(document.getElementById("ppe-receipts-date-to"),"change",i=>{this.state.filters.receipts.dateTo=i.target&&i.target.value||"",this.refreshReceiptsListUI()}),this._ppeBindOnce(document.getElementById("ppe-receipts-reset-filters"),"click",()=>{this.resetReceiptFilters(),this.refreshReceiptsListUI({forceFull:!0})});const s=document.getElementById("ppe-receipts-clear-empty-filters");s&&(s.onclick=()=>{this.resetReceiptFilters(),this.refreshReceiptsListUI({forceFull:!0})})},clearCache(){this.state.stockItemsCache&&(AppState.appData.ppeStock=this.state.stockItemsCache,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()),this.state.stockItemsCache=null,this.state.stockItemsCacheTime=null,this.state.lastSyncTime=Date.now(),Utils.safeLog("\u{1F504} PPE: \u062A\u0645 \u0645\u0633\u062D Cache \u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},async preloadData(){try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const t=await GoogleIntegration.sendToAppsScript("getAllPPE",{});if(t&&t.success&&Array.isArray(t.data)){const e=Array.isArray(AppState.appData.ppe)?AppState.appData.ppe:[];t.data.length===0&&e.length>0?Utils.safeWarn(`\u26A0\uFE0F PPE preload: \u062A\u062C\u0627\u0647\u0644 \u0645\u0635\u0641\u0648\u0641\u0629 \u0641\u0627\u0631\u063A\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 ${e.length} \u0633\u062C\u0644 \u0645\u062D\u0644\u064A`):(AppState.appData.ppe=t.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A:",t)}this.loadStockItems(!0).catch(t=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0633\u0628\u0642\u0627\u064B:",t))}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A preloadData:",t)}},renderActiveTabContentWithFallback(){try{switch(this.state.activeTab){case"stock-control":const t=AppState.appData.ppeStock||[];return t.length===0?`
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
                            ${this.renderStockTableSync(t)}
                        </div>
                    `;case"receipts":default:return this.renderPPEListSync()}}catch(t){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A renderActiveTabContentWithFallback:",t),`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadContentError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649"))}</p>
                    <button onclick="PPE.load()" class="btn-primary">
                        <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                    </button>
                </div>
            `}},renderPPEListSync(){return this.buildPPEListHtml()},renderStockTableSync(t){const e=(i,a)=>this._t(i,a),s=i=>Utils.escapeHTML(i);return!t||t.length===0?`
                <div class="empty-state">
                    <i class="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${s(e("module.ppe.empty.noStock","\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</p>
                </div>
            `:`
            <div class="overflow-x-auto">
                <table class="data-table table-header-blue">
                    <thead>
                        <tr>
                            <th>${s(e("module.ppe.stock.itemCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641"))}</th>
                            <th>${s(e("module.ppe.stock.itemName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641"))}</th>
                            <th>${s(e("module.ppe.stock.category","\u0627\u0644\u0641\u0626\u0629"))}</th>
                            <th>${s(e("module.ppe.stock.in","\u0627\u0644\u0648\u0627\u0631\u062F"))}</th>
                            <th>${s(e("module.ppe.stock.out","\u0627\u0644\u0645\u0646\u0635\u0631\u0641"))}</th>
                            <th>${s(e("module.ppe.stock.balance","\u0627\u0644\u0631\u0635\u064A\u062F"))}</th>
                            <th>${s(e("module.ppe.stock.reorder","\u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628"))}</th>
                            <th>${s(e("module.ppe.stock.supplier","\u0627\u0644\u0645\u0648\u0631\u062F"))}</th>
                            <th>${s(e("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(i=>{const a=parseFloat(i.balance||0),r=parseFloat(i.minThreshold||0),n=a<r;return`
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
                                            <button onclick="PPE.editStockItem('${i.itemId}')" class="btn-icon btn-icon-warning" title="${s(e("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button onclick="PPE.deleteStockItem('${i.itemId}')" class="btn-icon btn-icon-danger" title="${s(e("module.ppe.btn.deleteItem","\u062D\u0630\u0641"))}">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},async refreshActiveTab(t={}){try{const e=!!t.skipRemote;this.clearCache();const s=document.getElementById("ppe-tab-content");if(!s){Utils.safeWarn("\u26A0\uFE0F PPE: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0627\u0648\u064A\u0629 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628");return}try{if(this.state.activeTab==="stock-control")await this.loadStockItems(!0);else if(!e){if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const a=await GoogleIntegration.sendToAppsScript("getAllPPE",{});if(a&&a.success&&Array.isArray(a.data)){const r=Array.isArray(AppState.appData.ppe)?AppState.appData.ppe:[];a.data.length===0&&r.length>0?Utils.safeWarn(`\u26A0\uFE0F PPE refresh: \u062A\u062C\u0627\u0647\u0644 \u0645\u0635\u0641\u0648\u0641\u0629 \u0641\u0627\u0631\u063A\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 ${r.length} \u0633\u062C\u0644 \u0645\u062D\u0644\u064A`):(AppState.appData.ppe=a.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A:",a)}}}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u062B\u0646\u0627\u0621 refreshActiveTab:",a)}const i=s.innerHTML;s.style.opacity="0.6",s.style.pointerEvents="none";try{const a=await this.renderActiveTabContent(!1);s.innerHTML=a,this.applyModuleI18n(s),this.state.activeTab==="receipts"?(this.ensurePpeFilterStyles(),this.bindReceiptsFilters(),this._bindPpeReceiptExcelToolbar()):this.state.activeTab==="stock-control"&&(this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar()),Utils.safeLog("\u2705 PPE: \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0646\u0634\u0637 \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u274C PPE: \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",a),s.innerHTML=i}finally{s.style.opacity="1",s.style.pointerEvents="auto"}}catch(e){Utils.safeError("\u274C PPE: \u062E\u0637\u0623 \u0641\u064A refreshActiveTab:",e)}},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);const t=document.getElementById("ppe-section");if(!t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0642\u0633\u0645 ppe-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{(!AppState||!AppState.appData)&&(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F AppState \u063A\u064A\u0631 \u062C\u0627\u0647\u0632 - \u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631..."),await new Promise(e=>{let s=0;const i=50,a=setInterval(()=>{s++,AppState&&AppState.appData?(clearInterval(a),e()):s>=i&&(clearInterval(a),AppState||(AppState={}),AppState.appData||(AppState.appData={}),e())},50)}))}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 AppState:",e),AppState||(AppState={}),AppState.appData||(AppState.appData={})}try{AppState.appData.ppe||(AppState.appData.ppe=[]),AppState.appData.ppeStock||(AppState.appData.ppeStock=[]);const e=this.preloadData();let s="";try{if(this.state.activeTab==="stock-control"){const r=this.state.stockItemsCache&&this.state.stockItemsCache.length?this.state.stockItemsCache:Array.isArray(AppState.appData.ppeStock)?AppState.appData.ppeStock:[];s=r.length?this.buildStockControlTabHtmlSync(r,""):`<div class="empty-state py-8"><p class="text-gray-500">${Utils.escapeHTML(this._t("module.ppe.loading.stockData","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"))}</p></div>`}else this.state.activeTab==="analysis"?s=await this.renderPpeAnalysisTab():s=await this.renderReceiptsTab()}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",r),s=this.renderActiveTabContentWithFallback()}e.then(()=>{if(this.state.activeTab==="receipts")document.getElementById("ppe-list")&&this.refreshReceiptsListUI();else if(this.state.activeTab==="stock-control"){const r=document.getElementById("ppe-tab-content");if(!r)return;this.renderActiveTabContent(!1).then(n=>{this.state.activeTab!=="stock-control"||!n||(r.innerHTML=n,this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar())}).catch(()=>{})}else if(this.state.activeTab==="analysis")try{this.updatePpeAnalyticsDashboard()}catch{}}).catch(r=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",r)});const i=(r,n)=>this._t(r,n),a=r=>Utils.escapeHTML(r);t.innerHTML=`
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
                            <button id="ppe-refresh-btn" type="button" class="btn-secondary border-2 border-blue-500 text-blue-600 hover:bg-blue-50" title="${a(i("module.ppe.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A"))}">
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
        `;try{this.ensurePpeFilterStyles(),this.setupEventListeners();const r=document.getElementById("ppe-tab-content")||t;this.applyModuleI18n(r),this.state.activeTab==="receipts"?(this.bindReceiptsFilters(),this._bindPpeReceiptExcelToolbar()):this.state.activeTab==="stock-control"?(this.bindStockFilters(),this._bindPpeStockExcelToolbar()):this.state.activeTab==="analysis"&&(this._ppeBindAnalyticsEvents(),requestAnimationFrame(()=>{try{this.updatePpeAnalyticsDashboard()}catch{}}))}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A setupEventListeners:",r)}}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629:",e);const s=(a,r)=>this._t(a,r),i=a=>Utils.escapeHTML(a);t.innerHTML=`
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
            `}},async renderActiveTabContent(t=!0){try{switch(this.state.activeTab){case"analysis":return await this.renderPpeAnalysisTab();case"stock-control":t&&Loading.show(this._t("module.ppe.loading.stock","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646..."));try{const e=await this.renderStockControlTab();return t&&Loading.hide(),e}catch(e){return t&&Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0645\u062E\u0632\u0648\u0646:",e),`
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadStockError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</p>
                                <button onclick="PPE.switchTab('stock-control')" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                                </button>
                            </div>
                        `}case"receipts":default:return await this.renderReceiptsTab()}}catch(e){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A renderActiveTabContent:",e),t&&Loading.hide(),`
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
        `},cleanupEventListeners(){this.state.eventListeners.forEach((t,e)=>{e&&e.removeEventListener&&e.removeEventListener(t.event,t.handler)}),this.state.eventListeners.clear()},setupEventListeners(){this.cleanupEventListeners(),setTimeout(()=>{document.querySelectorAll(".ppe-tab-btn").forEach(n=>{const p=()=>{const l=n.getAttribute("data-tab");l&&!this.state.isSwitchingTab&&this.switchTab(l)};n.addEventListener("click",p),this.state.eventListeners.set(n,{event:"click",handler:p})});const e=document.getElementById("add-ppe-btn"),s=document.getElementById("view-ppe-matrix-btn");if(e){const n=()=>this.showPPEForm();e.addEventListener("click",n),this.state.eventListeners.set(e,{event:"click",handler:n})}if(s){const n=()=>this.showPPEMatrix();s.addEventListener("click",n),this.state.eventListeners.set(s,{event:"click",handler:n})}const i=document.getElementById("ppe-refresh-btn");if(i){const n=()=>this.refreshActiveTab();i.addEventListener("click",n),this.state.eventListeners.set(i,{event:"click",handler:n})}const a=document.getElementById("add-stock-item-btn"),r=document.getElementById("add-transaction-btn");if(a){const n=()=>this.showStockItemForm();a.addEventListener("click",n),this.state.eventListeners.set(a,{event:"click",handler:n})}if(r){const n=()=>this.showTransactionForm();r.addEventListener("click",n),this.state.eventListeners.set(r,{event:"click",handler:n})}this._bindPpeReceiptExcelToolbar(),this._bindPpeStockExcelToolbar()},100)},updateHeaderButtons(){const t=document.querySelector("#ppe-section .section-header .flex.gap-2");if(!t)return;[document.getElementById("add-ppe-btn"),document.getElementById("view-ppe-matrix-btn"),document.getElementById("ppe-refresh-btn"),document.getElementById("add-stock-item-btn"),document.getElementById("add-transaction-btn")].filter(Boolean).forEach(o=>{if(this.state.eventListeners.has(o)){const c=this.state.eventListeners.get(o);o.removeEventListener(c.event,c.handler),this.state.eventListeners.delete(o)}});const s=(o,c)=>this._t(o,c),i=o=>Utils.escapeHTML(o);this.state.activeTab==="receipts"?t.innerHTML=`
                <button id="view-ppe-matrix-btn" class="btn-secondary">
                    <i class="fas fa-table ml-2"></i>
                    ${i(s("module.ppe.btn.matrix","\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"))}
                </button>
                <button id="add-ppe-btn" class="btn-primary">
                    <i class="fas fa-plus ml-2"></i>
                    ${i(s("module.ppe.btn.newReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F"))}
                </button>
                <button id="ppe-refresh-btn" type="button" class="btn-secondary border-2 border-blue-500 text-blue-600 hover:bg-blue-50" title="${i(s("module.ppe.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A"))}">
                    <i class="fas fa-sync-alt ml-2"></i>
                    ${i(s("module.ppe.btn.refresh","\u062A\u062D\u062F\u064A\u062B"))}
                </button>
            `:this.state.activeTab==="stock-control"?t.innerHTML=`
                <button id="add-stock-item-btn" class="btn-primary">
                    <i class="fas fa-plus ml-2"></i>
                    ${i(s("module.ppe.btn.addStockItem","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}
                </button>
                <button id="add-transaction-btn" class="btn-secondary">
                    <i class="fas fa-exchange-alt ml-2"></i>
                    ${i(s("module.ppe.btn.addTransaction","\u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629"))}
                </button>
            `:t.innerHTML=`
                <button id="ppe-refresh-btn" type="button" class="btn-secondary border-2 border-blue-500 text-blue-600 hover:bg-blue-50" title="${i(s("module.ppe.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A"))}">
                    <i class="fas fa-sync-alt ml-2"></i>
                    ${i(s("module.ppe.btn.refresh","\u062A\u062D\u062F\u064A\u062B"))}
                </button>
            `,this.applyModuleI18n(t);const a=document.getElementById("add-ppe-btn"),r=document.getElementById("view-ppe-matrix-btn"),n=document.getElementById("add-stock-item-btn"),p=document.getElementById("add-transaction-btn");if(a){const o=()=>this.showPPEForm();a.addEventListener("click",o),this.state.eventListeners.set(a,{event:"click",handler:o})}if(r){const o=()=>this.showPPEMatrix();r.addEventListener("click",o),this.state.eventListeners.set(r,{event:"click",handler:o})}const l=document.getElementById("ppe-refresh-btn");if(l){const o=()=>this.refreshActiveTab();l.addEventListener("click",o),this.state.eventListeners.set(l,{event:"click",handler:o})}if(n){const o=()=>this.showStockItemForm();n.addEventListener("click",o),this.state.eventListeners.set(n,{event:"click",handler:o})}if(p){const o=()=>this.showTransactionForm();p.addEventListener("click",o),this.state.eventListeners.set(p,{event:"click",handler:o})}this._bindPpeReceiptExcelToolbar(),this._bindPpeStockExcelToolbar()},async switchTab(t){if(this.state.isSwitchingTab){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0628\u064A\u0646 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0628\u0627\u0644\u0641\u0639\u0644");return}if(this.state.activeTab===t)return;const e=this._switchTabToken=(this._switchTabToken||0)+1;try{this.state.isSwitchingTab=!0,this.state.activeTab=t,document.querySelectorAll(".ppe-tab-btn").forEach(a=>{a.classList.remove("active"),a.getAttribute("data-tab")===t&&a.classList.add("active")});const i=document.getElementById("ppe-tab-content");if(i)try{if(i.style.opacity="1",i.style.pointerEvents="auto",t==="receipts")i.innerHTML=await this.renderReceiptsTab(),this.ensurePpeFilterStyles(),this.bindReceiptsFilters(),this._bindPpeReceiptExcelToolbar(),this.applyModuleI18n(i);else if(t==="stock-control"){const a=this.state.stockItemsCache&&this.state.stockItemsCache.length?this.state.stockItemsCache:Array.isArray(AppState.appData.ppeStock)&&AppState.appData.ppeStock.length?AppState.appData.ppeStock:[],r=`<div role="status" class="rounded-lg border border-blue-100 bg-blue-50/90 px-4 py-2 text-sm text-blue-900 flex items-center gap-2 mb-3">
                            <i class="fas fa-sync-alt fa-spin text-blue-600"></i>
                            <span>${Utils.escapeHTML(this._t("module.ppe.stock.syncingHint","\u062C\u0627\u0631\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0623\u062D\u062F\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"))}</span>
                        </div>`;i.innerHTML=a.length>0?this.buildStockControlTabHtmlSync(a,r):`<div class="space-y-4" id="ppe-stock-tab-root">${r}<div class="empty-state py-8"><p class="text-gray-600">${Utils.escapeHTML(this._t("module.ppe.loading.stockData","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"))}</p></div></div>`,a.length>0&&(this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar()),this.applyModuleI18n(i)}else if(t==="analysis"){i.innerHTML=await this.renderPpeAnalysisTab(),this._ppeBindAnalyticsEvents(),this.applyModuleI18n(i);const a=e;requestAnimationFrame(()=>{if(!(this._switchTabToken!==a||this.state.activeTab!=="analysis"))try{this.updatePpeAnalyticsDashboard()}catch{}})}if(this.state.isSwitchingTab=!1,this.updateHeaderButtons(),t==="stock-control"){const a=e;this.renderActiveTabContent(!1).then(r=>{if(this._switchTabToken!==a||this.state.activeTab!=="stock-control")return;const n=document.getElementById("ppe-tab-content");!n||!r||(n.innerHTML=r,this.ensurePpeFilterStyles(),this.bindStockFilters(),this._bindPpeStockExcelToolbar(),this.applyModuleI18n(n))}).catch(r=>{this._switchTabToken===a&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0645\u062E\u0632\u0648\u0646:",r)})}Utils.safeLog(`\u2705 PPE: \u062A\u0645 \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u062A\u0628\u0648\u064A\u0628 ${t}`)}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",a),i.innerHTML=`
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}</p>
                            <button onclick="PPE.switchTab('${t}')" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                ${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                            </button>
                        </div>
                    `,this.updateHeaderButtons()}finally{i.style.opacity="1",i.style.pointerEvents="auto"}else this.updateHeaderButtons()}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0628\u064A\u0646 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:",s)}finally{this.state.isSwitchingTab=!1}},parseEligibilityRules(t){if(!t)return[];try{if(Array.isArray(t))return t;if(typeof t=="string"){const e=JSON.parse(t);return Array.isArray(e)?e:[]}}catch{return[]}return[]},getEligibilityRule(t){const e=typeof AppState<"u"&&AppState.companySettings?AppState.companySettings:{},s=this.parseEligibilityRules(e.ppeEligibilityRules),i=r=>(r||"").toString().trim().toLowerCase(),a=i(t);if(a){const r=s.find(n=>n&&i(n.equipmentType||n.itemName)===a);if(r){let n=parseInt(r.months,10),p=parseInt(r.days,10);return(isNaN(n)||n<0)&&(n=0),(isNaN(p)||p<0)&&(p=0),n=Math.min(120,n),p=Math.min(3650,p),{months:n,days:p,hasRule:n+p>0,equipmentType:r.equipmentType||r.itemName}}}return{months:0,days:0,hasRule:!1,equipmentType:t||null}},findLastReceiptForEmployeeItem(t,e,s={}){const i=(t||"").toString().trim().toLowerCase(),a=(e||"").toString().trim().toLowerCase();if(!i||!a)return null;const r=s.excludeId||null,n=typeof AppState<"u"&&Array.isArray(AppState.appData?.ppe)?AppState.appData.ppe:[];let p=null,l=null;for(const o of n){if(!o||r&&o.id===r)continue;const c=(o.employeeCode||o.employeeNumber||"").toString().trim().toLowerCase(),h=(o.equipmentType||"").toString().trim().toLowerCase();if(c!==i||h!==a)continue;const y=o.receiptDate?new Date(o.receiptDate):null;!y||isNaN(y.getTime())||(!l||y>l)&&(p=o,l=y)}return p},diffMonthsAndDays(t,e){const s=new Date(t),i=new Date(e);if(isNaN(s.getTime())||isNaN(i.getTime())||i<s)return{months:0,days:0,totalDays:0,isNegative:i<s};let a=(i.getFullYear()-s.getFullYear())*12+(i.getMonth()-s.getMonth()),r=i.getDate()-s.getDate();if(r<0){a-=1;const p=new Date(i.getFullYear(),i.getMonth(),0);r+=p.getDate()}a<0&&(a=0);const n=Math.floor((i-s)/(1e3*60*60*24));return{months:a,days:r,totalDays:n,isNegative:!1}},addMonthsAndDays(t,e,s){const i=new Date(t);if(isNaN(i.getTime()))return null;const a=new Date(i.getFullYear(),i.getMonth()+(e||0),i.getDate());return a.setDate(a.getDate()+(s||0)),a.setHours(i.getHours(),i.getMinutes(),i.getSeconds(),i.getMilliseconds()),a},computeEligibility(t,e,s,i={}){const a=this.getEligibilityRule(e),r={hasInputs:!1,hasPrevious:!1,hasRule:a.hasRule,ruleMonths:a.months,ruleDays:a.days,lastReceiptDate:null,currentDate:null,elapsed:null,dueDate:null,isEligible:!0,remaining:null};if(!t||!e)return r;r.hasInputs=!0;const n=this.findLastReceiptForEmployeeItem(t,e,i);if(!n||!n.receiptDate)return r;const p=new Date(n.receiptDate);if(isNaN(p.getTime()))return r;r.hasPrevious=!0,r.lastReceiptDate=p;const l=s?new Date(s):new Date;if(isNaN(l.getTime())?r.currentDate=new Date:r.currentDate=l,r.elapsed=this.diffMonthsAndDays(p,r.currentDate),a.hasRule){const o=this.addMonthsAndDays(p,a.months,a.days);r.dueDate=o,o&&r.currentDate<o&&(r.isEligible=!1,r.remaining=this.diffMonthsAndDays(r.currentDate,o))}return r},formatMonthsDays(t,e){const s=parseInt(t,10)||0,i=parseInt(e,10)||0,a=[];return s>0&&a.push(`${s} \u0634\u0647\u0631`),(i>0||s===0&&i===0)&&a.push(`${i} \u064A\u0648\u0645`),a.join(" \u0648 ")},renderEligibilityInfo(t,e){if(!t)return;const s=p=>p?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(p):new Date(p).toLocaleDateString("ar"):"-",i=(p,l,o,c,h)=>{const y={gray:{outer:"ppe-elig-outer ppe-elig--gray",headerBar:"ppe-elig-head",headerIconBg:"ppe-elig-head-icon",tileSurface:"ppe-elig-tile",iconBox:"ppe-elig-tile-icon",labelClass:"ppe-elig-label",valueClass:"text-lg font-extrabold text-gray-900 tracking-tight tabular-nums",footerWrap:"ppe-elig-foot"},blue:{outer:"ppe-elig-outer ppe-elig--blue",headerBar:"ppe-elig-head",headerIconBg:"ppe-elig-head-icon",tileSurface:"ppe-elig-tile",iconBox:"ppe-elig-tile-icon",labelClass:"ppe-elig-label",valueClass:"text-lg font-extrabold text-gray-900 tracking-tight tabular-nums",footerWrap:"ppe-elig-foot"},green:{outer:"ppe-elig-outer ppe-elig--green",headerBar:"ppe-elig-head",headerIconBg:"ppe-elig-head-icon",tileSurface:"ppe-elig-tile",iconBox:"ppe-elig-tile-icon",labelClass:"ppe-elig-label",valueClass:"text-lg font-extrabold text-gray-900 tracking-tight tabular-nums",footerWrap:"ppe-elig-foot"},red:{outer:"ppe-elig-outer ppe-elig--red",headerBar:"ppe-elig-head",headerIconBg:"ppe-elig-head-icon",tileSurface:"ppe-elig-tile",iconBox:"ppe-elig-tile-icon",labelClass:"ppe-elig-label",valueClass:"text-lg font-extrabold text-gray-900 tracking-tight tabular-nums",footerWrap:"ppe-elig-foot"}},d=y[p]||y.gray,m=c.length;let x="grid gap-3 md:gap-4 w-full ";m<=1?x+="grid-cols-1":m===2?x+="grid-cols-1 sm:grid-cols-2":m===3?x+="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3":x+="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";const k=m?`<div class="px-3 py-4 sm:px-6 sm:py-5 bg-gray-50">
                    <div class="${x}">
                    ${c.map(f=>{const v=typeof f.value=="string"&&f.value.includes("\u0628\u062F\u0648\u0646 \u0642\u0627\u0639\u062F\u0629")?"text-base sm:text-[1.0625rem] font-semibold text-gray-600 tracking-tight leading-snug":d.valueClass;return`
                        <div class="${d.tileSurface}">
                            <div class="flex items-center gap-3 sm:gap-4 text-start h-full">
                                <span class="${d.iconBox} shrink-0">
                                    <i class="${f.icon}"></i>
                                </span>
                                <div class="flex-1 min-w-0 flex flex-col gap-1.5 justify-center">
                                    <div class="${d.labelClass} text-xs sm:text-[11px] leading-snug">${f.label}</div>
                                    <p class="${v} leading-snug break-words hyphens-none">${f.value}</p>
                                </div>
                            </div>
                        </div>`}).join("")}
                    </div>
                </div>`:"";return`
                <div class="mt-1 w-full min-w-0 overflow-hidden rounded-2xl bg-white ${d.outer}">
                    <div class="flex items-center gap-4 bg-gradient-to-l ${d.headerBar} px-5 py-4 sm:px-6 text-white shadow-inner">
                        <span class="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl ${d.headerIconBg} text-lg sm:text-xl">
                            <i class="${l}"></i>
                        </span>
                        <div class="min-w-0 flex-1">
                            <p class="text-[11px] font-semibold tracking-wide text-white/85 mb-1">\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645</p>
                            <h4 class="text-base sm:text-lg font-extrabold leading-snug text-white break-words">${o}</h4>
                        </div>
                    </div>
                    ${k}
                    ${h?`<div class="${d.footerWrap} px-5 py-4 sm:px-6 text-sm sm:text-[0.9375rem] font-medium text-gray-700 leading-relaxed flex flex-wrap items-center gap-3 w-full">${h}</div>`:""}
                </div>
            `};if(!e||!e.hasInputs){t.innerHTML=i("gray","fas fa-info-circle","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629",[],'<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 text-xs"><i class="fas fa-lightbulb"></i></span><span>\u0628\u0639\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0643\u0648\u062F \u0648\u0627\u0644\u0635\u0646\u0641 \u062A\u0638\u0647\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0622\u062E\u0631 \u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0627\u0644\u0645\u062F\u0629 \u0648\u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642.</span>'),t.classList.remove("hidden"),t.setAttribute("data-eligible","pending");return}if(!e.hasPrevious){const p=[];e.hasRule&&p.push({icon:"fas fa-shield-alt",label:"\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0635\u0646\u0641",value:this.formatMonthsDays(e.ruleMonths,e.ruleDays)}),t.innerHTML=i("blue","fas fa-box-open","\u0623\u0648\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641",p,'<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs"><i class="fas fa-check"></i></span><span>\u0644\u0627 \u064A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0633\u0627\u0628\u0642 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641\u061B \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.</span>'),t.setAttribute("data-eligible","1"),t.classList.remove("hidden");return}const a=this.formatMonthsDays(e.elapsed?.months||0,e.elapsed?.days||0),r=e.hasRule?this.formatMonthsDays(e.ruleMonths,e.ruleDays):"\u0628\u062F\u0648\u0646 \u0642\u0627\u0639\u062F\u0629 \u0645\u062D\u062F\u062F\u0629",n=[{icon:"fas fa-history",label:"\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u0627\u0633\u062A\u0644\u0627\u0645",value:s(e.lastReceiptDate)},{icon:"fas fa-hourglass-half",label:"\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0645\u0646\u0642\u0636\u064A\u0629",value:a},{icon:"fas fa-shield-alt",label:"\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0635\u0646\u0641",value:r}];if(e.dueDate&&n.push({icon:"fas fa-calendar-check",label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642",value:s(e.dueDate)}),e.isEligible){const p=e.hasRule?'<span class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs shadow-sm"><i class="fas fa-check-double"></i></span><span class="font-semibold text-green-700">\u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F\u061B \u062A\u0645 \u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u062F\u0646\u064A\u0627 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641.</span>':'<span class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 text-xs shadow-sm"><i class="fas fa-unlock-alt"></i></span><span class="font-semibold text-gray-800">\u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F\u061B \u0644\u0645 \u062A\u064F\u0636\u0641 \u0645\u062F\u0629 \u062F\u0646\u064A\u0627 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641 \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A\u064F\u0633\u0645\u062D \u062F\u0648\u0646 \u0642\u064A\u062F \u0632\u0645\u0646\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639.</span>';t.innerHTML=i("green","fas fa-check-circle","\u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0633\u062A\u062D\u0642 \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645",n,p),t.setAttribute("data-eligible","1")}else{const p=this.formatMonthsDays(e.remaining?.months||0,e.remaining?.days||0);t.innerHTML=i("red","fas fa-ban","\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0633\u062A\u062D\u0642 \u062D\u0627\u0644\u064A\u0627\u064B",n,`<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs"><i class="fas fa-clock"></i></span><span class="font-semibold text-red-600">\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629 \u062D\u062A\u0649 \u064A\u0635\u0628\u062D \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0633\u0645\u0648\u062D\u0627\u064B: <strong class="font-extrabold">${p}</strong>.</span>`),t.setAttribute("data-eligible","0")}t.classList.remove("hidden")},async showPPEForm(t=null){const e=!!t,s=document.createElement("div");s.className="modal-overlay";const i=AppState.appData.employees||[],a=(t?.employeeCode||t?.employeeNumber||"").toString().trim(),r=a.length?a:"",n=r?i.find(d=>[d.employeeNumber,d.employeeCode,d.sapId,d.id,d.nationalId,d.cardId].map(x=>(x||"").toString().trim().toLowerCase()).includes(r.toLowerCase())):null,p={name:n?.name||t?.employeeName||"",department:n?.department||t?.employeeDepartment||"",position:n?.position||t?.employeePosition||"",branch:n?.branch||t?.employeeBranch||"",location:n?.location||t?.employeeLocation||""},l=d=>d?Utils.escapeHTML(d):"\u2014",o=(d,m)=>this._t(d,m),c=d=>Utils.escapeHTML(d),h=o("module.ppe.status.received","\u0645\u0633\u062A\u0644\u0645"),y=o("module.ppe.status.pending","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645");s.innerHTML=`
            <div class="modal-content" style="width: 100%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; background: #f8fafc; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); margin: auto;">
                
                <!-- Header -->
                <div style="background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                    <h2 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 10px;">
                        <span style="background: #eff6ff; color: #2563eb; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                            <i class="fas ${e?"fa-edit":"fa-clipboard-list"}"></i>
                        </span>
                        ${c(e?o("module.ppe.title.editReceipt","\u062A\u0639\u062F\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645"):o("module.ppe.title.newReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u062C\u062F\u064A\u062F"))}
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
                                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${c(o("module.ppe.label.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A *"))}</label>
                                        <div style="position: relative;">
                                            <input type="text" id="ppe-employee-code" required class="form-input" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px 8px 36px; font-size: 0.85rem; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#cbd5e1'"
                                                value="${Utils.escapeHTML(t?.employeeCode||t?.employeeNumber||"")}"
                                                placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F..." autocomplete="off">
                                            <button type="button" id="ppe-search-code-btn" style="position: absolute; top: 0; left: 0; bottom: 0; width: 36px; background: none; border: none; color: #94a3b8; cursor: pointer;">
                                                <i class="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${c(o("module.ppe.label.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}</label>
                                        <div style="position: relative;">
                                            <input type="text" id="ppe-employee-name" class="form-input" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 0.85rem; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#cbd5e1'"
                                                value="${Utils.escapeHTML(t?.employeeName||"")}"
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
                                        <span style="background: #dbeafe; color: #1e40af; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;"><i class="fas fa-building"></i></span>
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
                                                    ${[38,39,40,41,42,43,44,45,46,47,48].map(d=>`<option value="${d}" ${t?.shoeSize==d?"selected":""}>${d}</option>`).join("")}
                                                </select>
                                            </div>
                                            <div class="md:col-span-4" style="display: flex; gap: 8px; align-items: flex-end;">
                                                <div style="flex: 1;">
                                                    <label style="display: block; font-size: 0.7rem; font-weight: 700; color: #475569; margin-bottom: 4px;">\u0627\u0644\u0643\u0645\u064A\u0629 *</label>
                                                    <input type="number" id="ppe-quantity" required class="form-input ppe-quantity" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; font-size: 0.8rem; outline: none;" min="1"
                                                        value="${t?.quantity||1}">
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
                                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${c(o("module.ppe.label.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 *"))}</label>
                                        <input type="date" id="ppe-receipt-date" required class="form-input" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 0.85rem; outline: none;"
                                            value="${t?.receiptDate?new Date(t.receiptDate).toISOString().slice(0,10):""}">
                                    </div>
                                    <div>
                                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${c(o("module.ppe.label.status","\u0627\u0644\u062D\u0627\u0644\u0629 *"))}</label>
                                        <select id="ppe-status" required class="form-input" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 0.85rem; outline: none;">
                                            <option value="\u0645\u0633\u062A\u0644\u0645" ${t?.status==="\u0645\u0633\u062A\u0644\u0645"?"selected":""}>${c(h)}</option>
                                            <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645" ${t?.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"?"selected":""}>${c(y)}</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 6px;">${c(o("module.ppe.label.notes","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</label>
                                    <textarea id="ppe-notes" class="form-input" rows="2" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 0.85rem; outline: none; resize: vertical;"
                                        placeholder="\u0623\u0636\u0641 \u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0647\u0646\u0627...">${Utils.escapeHTML(t?.notes||"")}</textarea>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Fixed Footer -->
                    <div style="background: #ffffff; border-top: 1px solid #e2e8f0; padding: 14px 24px; display: flex; justify-content: flex-end; gap: 12px; flex-shrink: 0; z-index: 10;">
                        <button type="button" onclick="this.closest('.modal-overlay').remove()" style="background: #ffffff; border: 1px solid #cbd5e1; color: #475569; font-weight: 600; font-size: 0.85rem; padding: 8px 20px; border-radius: 6px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='#ffffff'">
                            ${c(o("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}
                        </button>
                        <button type="submit" style="background: #2563eb; border: none; color: #ffffff; font-weight: 600; font-size: 0.85rem; padding: 8px 24px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); transition: 0.2s;" onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
                            <i class="fas fa-save"></i> ${c(e?o("module.common.saveChanges","\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A"):o("module.ppe.btn.saveReceipt","\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(s),this.applyModuleI18n(s),setTimeout(()=>{const d=document.getElementById("ppe-employee-code"),m=document.getElementById("ppe-employee-name"),x=document.getElementById("ppe-employee-dropdown"),k=document.getElementById("ppe-search-code-btn"),f=document.getElementById("ppe-employee-department"),u=document.getElementById("ppe-employee-position"),v=document.getElementById("ppe-employee-branch"),w=document.getElementById("ppe-employee-location"),C=document.getElementById("ppe-employee-info-name"),M=document.getElementById("ppe-employee-info-department"),R=document.getElementById("ppe-employee-info-position"),$=document.getElementById("ppe-employee-info-branch"),L=document.getElementById("ppe-employee-info-location"),q=AppState.appData.employees||[],z=(g,b)=>PPE._t(g,b),W=(g={})=>{C&&(C.textContent=g.name||"\u2014"),M&&(M.textContent=g.department||"\u2014"),R&&(R.textContent=g.position||"\u2014"),$&&(g.branch?($.innerHTML=`<i class="fas fa-code-branch text-gray-400 ml-1"></i>${z("module.ppe.label.branch","\u0627\u0644\u0641\u0631\u0639")}: ${Utils.escapeHTML(g.branch)}`,$.classList.remove("hidden")):($.innerHTML="",$.classList.add("hidden"))),L&&(g.location?(L.innerHTML=`<i class="fas fa-map-marker-alt text-gray-400 ml-1"></i>${z("module.ppe.label.location","\u0627\u0644\u0645\u0648\u0642\u0639")}: ${Utils.escapeHTML(g.location)}`,L.classList.remove("hidden")):(L.innerHTML="",L.classList.add("hidden")))},Q=(g,{notifySuccess:b=!1,notifyFail:T=!1}={})=>{if(!g)return T&&Notification.warning(z("module.ppe.notify.employeeNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F")),W({name:m?.value?.trim()||"\u2014",department:f?.value||"",position:u?.value||"",branch:v?.value||"",location:w?.value||""}),!1;const P=g.employeeNumber||g.employeeCode||g.sapId||g.id||"";return d&&P&&(d.value=P),m&&(m.value=g.name||""),f&&(f.value=g.department||""),u&&(u.value=g.position||""),v&&(v.value=g.branch||""),w&&(w.value=g.location||""),W({name:g.name||"\u2014",department:g.department||"",position:g.position||"",branch:g.branch||"",location:g.location||""}),b&&Notification.success(z("module.ppe.notify.employeeLoaded","\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D")),!0},te=g=>{if(!g)return null;const b=g.trim().toLowerCase();if(!b)return null;let T=null;return typeof EmployeeHelper<"u"&&typeof EmployeeHelper.findByCode=="function"&&(T=EmployeeHelper.findByCode(g)||EmployeeHelper.findByCode(b)),T||q.find(P=>[P.employeeNumber,P.employeeCode,P.sapId,P.id,P.nationalId,P.cardId].some(D=>String(D||"").trim().toLowerCase()===b))||null},E=({notify:g=!0}={})=>{const b=d?.value?.trim();if(!b)return;const T=te(b);Q(T,{notifySuccess:g,notifyFail:g})};d&&(d.addEventListener("blur",()=>E({notify:!1})),d.addEventListener("keydown",g=>{g.key==="Enter"&&(g.preventDefault(),E({notify:!0}))})),k&&k.addEventListener("click",g=>{g.preventDefault(),E({notify:!0})}),m&&x&&m.addEventListener("input",g=>{const b=g.target.value.trim();if(x.innerHTML="",x.classList.add("hidden"),b.length<2)return;const T=b.toLowerCase(),P=q.filter(D=>[D.name,D.employeeNumber,D.employeeCode,D.sapId].some(H=>String(H||"").toLowerCase().includes(T))).slice(0,12);P.length&&(P.forEach(D=>{const B=document.createElement("button");B.type="button",B.className="w-full text-right p-3 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none border-b border-gray-100 last:border-b-0";const H=document.createElement("div");H.className="font-semibold text-gray-800",H.textContent=D.name||"\u0628\u062F\u0648\u0646 \u0627\u0633\u0645";const J=document.createElement("div");J.className="text-xs text-gray-500 mt-1",J.textContent=[D.employeeNumber||D.employeeCode||D.sapId||"",D.department||"",D.position||""].filter(Boolean).join(" \u2022 "),B.appendChild(H),B.appendChild(J),B.addEventListener("click",()=>{Q(D,{notifySuccess:!1,notifyFail:!1}),x.classList.add("hidden")}),x.appendChild(B)}),x.classList.remove("hidden"))});const S=g=>{x&&!x.contains(g.target)&&m&&!m.contains(g.target)&&x.classList.add("hidden"),g.target===s&&s.remove()};s.addEventListener("click",S),W({name:p.name||m?.value?.trim()||"\u2014",department:p.department||f?.value||"",position:p.position||u?.value||"",branch:p.branch||v?.value||"",location:p.location||w?.value||""});const _=document.getElementById("ppe-items-container"),j=document.getElementById("ppe-add-item-btn"),Y=()=>{if(!_)return;const g=Array.from(_.querySelectorAll(".ppe-item-row"));g.forEach(b=>{const T=b.querySelector(".ppe-remove-item");if(!T)return;g.length===1||e?T.classList.add("hidden"):T.classList.remove("hidden")})},K=g=>{if(!_||!g)return;const b=g.querySelector(".ppe-remove-item");b&&b.addEventListener("click",()=>{Array.from(_.querySelectorAll(".ppe-item-row")).length<=1||(g.remove(),Y())})},re=()=>{if(!_)return null;const g=_.querySelector(".ppe-item-row");if(!g)return null;const b=g.cloneNode(!0),T=b.querySelector(".ppe-equipment-type");T&&(T.value="",T.id==="ppe-equipment-type"&&T.removeAttribute("id"));const P=b.querySelector(".ppe-quantity");P&&(P.value="1",P.id==="ppe-quantity"&&P.removeAttribute("id"));const D=b.querySelector(".ppe-shoe-size");D&&(D.value="");const B=b.querySelector(".ppe-eligibility-info");B&&(B.innerHTML="",B.classList.add("hidden"),B.removeAttribute("data-eligible")),_.appendChild(b),K(b),Y();const H=b.querySelector(".ppe-equipment-type");return H&&this.state.ppeItemsOptionsHTML?H.innerHTML=this.state.ppeItemsOptionsHTML:this.loadPPEItemsForDropdown(),b};_&&(Array.from(_.querySelectorAll(".ppe-item-row")).forEach(b=>K(b)),Y()),j&&(e?j.classList.add("hidden"):j.addEventListener("click",g=>{g.preventDefault(),re()})),this.loadPPEItemsForDropdown(t?.equipmentType);const se=document.getElementById("ppe-receipt-date"),ie=document.getElementById("ppe-employee-code"),xe=e&&t?.id?t.id:null,O=()=>{if(!_)return;const g=Array.from(_.querySelectorAll(".ppe-item-row")),b=(ie?.value||"").trim(),T=(se?.value||"").trim();g.forEach(P=>{const B=(P.querySelector(".ppe-equipment-type")?.value||"").trim(),H=P.querySelector(".ppe-eligibility-info");if(!H)return;const J=PPE.computeEligibility(b,B,T,{excludeId:xe});PPE.renderEligibilityInfo(H,J)})};if(se&&(se.addEventListener("change",O),se.addEventListener("input",O)),ie&&(ie.addEventListener("change",O),ie.addEventListener("blur",O)),_&&_.addEventListener("change",g=>{g.target&&g.target.classList&&g.target.classList.contains("ppe-equipment-type")&&O()}),s._refreshPPEEligibility=O,d&&(d.addEventListener("input",O),d.addEventListener("change",O)),d){let g=d.value;const b=setInterval(()=>{if(!document.body.contains(d)){clearInterval(b);return}d.value!==g&&(g=d.value,O())},300)}O(),setTimeout(O,300),setTimeout(O,1500);const le=s.querySelector("#ppe-form");le&&le.addEventListener("submit",async g=>{g.preventDefault();const b=le?.querySelector('button[type="submit"]')||g.target?.querySelector('button[type="submit"]');if(b&&b.disabled)return;let T="";b&&(T=b.innerHTML,b.disabled=!0,b.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const P=AppState.appData.ppe||[],D=new Date().getFullYear(),B=P.filter(U=>U.receiptNumber&&U.receiptNumber.startsWith(`PPE-${D}-`)).map(U=>{const X=U.receiptNumber.match(/\d+$/);return X?parseInt(X[0]):0}),H=B.length>0?Math.max(...B)+1:1,J=e&&t?.receiptNumber?t.receiptNumber:`PPE-${D}-${String(H).padStart(4,"0")}`,de=document.getElementById("ppe-employee-name"),ae=document.getElementById("ppe-employee-code"),me=document.getElementById("ppe-employee-department"),fe=document.getElementById("ppe-employee-position"),ue=document.getElementById("ppe-employee-branch"),he=document.getElementById("ppe-employee-location"),ye=document.getElementById("ppe-items-container"),oe=document.getElementById("ppe-receipt-date"),ge=document.getElementById("ppe-status"),ve=document.getElementById("ppe-notes");if(!de||!ae||!me||!fe||!ue||!he||!ye||!oe||!ge){Notification.error(PPE._t("module.ppe.notify.fieldsMissing","\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")),b&&(b.disabled=!1,b.innerHTML=T);return}if(!oe.value){Notification.error(PPE._t("module.ppe.notify.dateRequired","\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.")),b&&(b.disabled=!1,b.innerHTML=T);return}const pe=Array.from(ye.querySelectorAll(".ppe-item-row"));if(!pe.length){Notification.error(PPE._t("module.ppe.notify.itemsRequired","\u064A\u062C\u0628 \u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0642\u0628\u0644 \u062D\u0641\u0638 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.")),b&&(b.disabled=!1,b.innerHTML=T);return}const ne=[];for(const U of pe){const X=U.querySelector(".ppe-equipment-type"),G=U.querySelector(".ppe-quantity"),A=U.querySelector(".ppe-shoe-size");if(!X||!G){Notification.error(PPE._t("module.ppe.notify.rowsIncomplete","\u0628\u0639\u0636 \u0635\u0641\u0648\u0641 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0623\u0646 \u0643\u0644 \u0635\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0646\u0648\u0639 \u0648\u0643\u0645\u064A\u0629.")),b&&(b.disabled=!1,b.innerHTML=T);return}const I=(X.value||"").trim(),F=parseInt(G.value,10)||0,N=A?(A.value||"").trim():"";if(!I){Notification.error(PPE._t("module.ppe.notify.selectEquipmentEachRow","\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629 \u0644\u0643\u0644 \u0635\u0641 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638.")),b&&(b.disabled=!1,b.innerHTML=T);return}if(F<=0){Notification.error(PPE._t("module.ppe.notify.qtyPositive","\u0627\u0644\u0643\u0645\u064A\u0629 \u0644\u0643\u0644 \u0635\u0646\u0641 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0631\u0642\u0645\u064B\u0627 \u0623\u0643\u0628\u0631 \u0645\u0646 \u0635\u0641\u0631.")),b&&(b.disabled=!1,b.innerHTML=T);return}ne.push({equipmentType:I,quantity:F,shoeSize:N})}{const U=ae.value.trim(),X=oe.value,G=e&&t?.id?t.id:null,A=[];if(ne.forEach((I,F)=>{const N=PPE.computeEligibility(U,I.equipmentType,X,{excludeId:G});if(N.hasRule&&N.hasPrevious&&!N.isEligible){A.push({index:F,item:I,result:N});const ee=pe[F];if(ee){const Z=ee.querySelector(".ppe-eligibility-info");PPE.renderEligibilityInfo(Z,N)}}}),A.length>0){const I=A[0],F=PPE.formatMonthsDays(I.result.remaining?.months||0,I.result.remaining?.days||0),N=I.result.dueDate?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(I.result.dueDate):new Date(I.result.dueDate).toLocaleDateString("ar"):"",ee=A.map(ke=>ke.item.equipmentType).join("\u060C "),Z=A.length===1?PPE._t("module.ppe.notify.notEligible",`\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645: \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0633\u062A\u062D\u0642 \u0644\u0635\u0646\u0641 \xAB${I.item.equipmentType}\xBB \u062D\u0627\u0644\u064A\u0627\u064B. \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642: ${N}\u060C \u0627\u0644\u0645\u062A\u0628\u0642\u064A: ${F}.`):PPE._t("module.ppe.notify.notEligibleMulti",`\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645: \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0633\u062A\u062D\u0642 \u0644\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062D\u0627\u0644\u064A\u0627\u064B (${ee}). \u0623\u0642\u0631\u0628 \u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0628\u0639\u062F: ${F}.`);Notification.error(Z),b&&(b.disabled=!1,b.innerHTML=T);return}}const ce=typeof AppState<"u"&&AppState.currentUser?AppState.currentUser:{},V=ce.name||ce.username||ce.email||"\u2014",be={receiptNumber:J,employeeName:de.value.trim(),employeeCode:ae.value.trim(),employeeNumber:ae.value.trim(),employeeDepartment:me.value.trim(),employeePosition:fe.value.trim(),employeeBranch:ue.value.trim(),employeeLocation:he.value.trim(),receiptDate:new Date(oe.value).toISOString(),status:ge.value,notes:(ve?.value||"").trim(),createdBy:e&&(t?.createdBy||t?.createdByUser)||V,createdByUser:e&&(t?.createdByUser||t?.createdBy)||V,recordedBy:e&&(t?.recordedBy||t?.createdBy)||V};try{const U=Array.isArray(AppState.appData.ppe)?[...AppState.appData.ppe]:[];let X=[],G=null;if(e){const A=AppState.appData.ppe.findIndex(I=>I.id===t.id);if(A!==-1){const I=ne[0]||{equipmentType:"",quantity:0,shoeSize:""},F=AppState.appData.ppe[A]||{},N={...F,...be,equipmentType:I.equipmentType,quantity:I.quantity,shoeSize:I.shoeSize,createdAt:F.createdAt||t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.ppe[A]=N,G=N}}else{const A=AppState.appData.ppe||[],I=[];ne.forEach(F=>{const N=A.concat(I),Z={id:Utils.generateSequentialId("PPE",N),...be,equipmentType:F.equipmentType,quantity:F.quantity,shoeSize:F.shoeSize,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};I.push(Z),AppState.appData.ppe.push(Z)}),X=I}if(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)if(e){if(!G)throw new Error("\u062A\u0639\u0630\u0631 \u062A\u062C\u0647\u064A\u0632 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0644\u0644\u062D\u0641\u0638 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645.");const A=await GoogleIntegration.sendToAppsScript("updatePPE",{ppeId:G.id,updateData:G});if(!A||A.success!==!0)throw new Error(A?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")}else for(const A of X){const I=await GoogleIntegration.sendToAppsScript("addPPE",A);if(!I||I.success!==!0)throw new Error(I?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),s.remove(),Notification.success(e?PPE._t("module.ppe.notify.updateSuccess","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D"):PPE._t("module.ppe.notify.saveSuccess","\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")),b&&(b.disabled=!1,b.innerHTML=T),this.refreshActiveTab({skipRemote:!0}),GoogleIntegration.autoSave("PPE",AppState.appData.ppe).catch(A=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",A)})}catch(U){typeof previousPpeSnapshot<"u"&&(AppState.appData.ppe=previousPpeSnapshot,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()),Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")+": "+(U.message||U)),b&&(b.disabled=!1,b.innerHTML=T)}})},200)},async loadPPEItemsForDropdown(t=null){const e=document.getElementById("ppe-equipment-type")||document.querySelector(".ppe-equipment-type");if(e)try{const s=Date.now(),i=this.state.ppeItemsListCache&&this.state.ppeItemsListCacheTime&&s-this.state.ppeItemsListCacheTime<this.state.ppeItemsListCacheExpiry;let a=[];if(i)a=Array.isArray(this.state.ppeItemsListCache)?this.state.ppeItemsListCache:[];else if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const p=await GoogleIntegration.sendToAppsScript("getPPEItemsList",{});p&&p.success&&p.data&&(a=p.data,this.state.ppeItemsListCache=a,this.state.ppeItemsListCacheTime=s)}if(a.length===0){const p=AppState.appData.ppe||[];a=[...new Set(p.map(o=>o.equipmentType).filter(Boolean))].map(o=>({itemName:o,itemCode:""}))}e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>',a.forEach(p=>{const l=(p.itemName||"").trim();if(!l)return;const o=document.createElement("option");o.value=l,o.textContent=p.itemCode?`${p.itemCode} - ${l}`:l,t&&(l===t||p.itemCode===t)&&(o.selected=!0),e.appendChild(o)});const r=e.innerHTML;this.state.ppeItemsOptionsHTML=r,document.querySelectorAll(".ppe-equipment-type").forEach(p=>{if(p===e)return;const l=p.value;p.innerHTML=r,l&&(p.value=l)})}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629:",s),e.innerHTML=this.state.ppeItemsOptionsHTML||'<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>';const i=e.innerHTML;document.querySelectorAll(".ppe-equipment-type").forEach(r=>{if(r===e)return;const n=r.value;r.innerHTML=i,n&&(r.value=n)})}},async viewPPE(t){const e=AppState.appData.ppe.find(l=>l.id===t);if(!e)return;const s=(l,o)=>this._t(l,o),i=l=>Utils.escapeHTML(l),a=this.getDisplayStatus(e.status),r=e.createdBy||e.createdByUser||e.recordedBy||e.recorderName||e.user||"\u2014",n=document.createElement("div");n.className="modal-overlay";const p=String(e.id||"").replace(/\\/g,"\\\\").replace(/'/g,"\\'");n.innerHTML=`
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
                                <p class="text-gray-800 font-mono font-semibold text-lg">${Utils.escapeHTML(e.receiptNumber||e.id||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.employeeName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.employeeName||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.employeeCode||e.employeeNumber||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.createdBy","\u0645\u0633\u062C\u0651\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}:</label>
                                <p class="text-gray-800 font-semibold text-blue-700"><i class="fas fa-user-edit text-blue-500 ml-1"></i>${Utils.escapeHTML(r)}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.department","\u0627\u0644\u0642\u0633\u0645"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.employeeDepartment||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.position","\u0627\u0644\u0645\u0646\u0635\u0628"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.employeePosition||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.branch","\u0627\u0644\u0641\u0631\u0639"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.employeeBranch||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.location","\u0627\u0644\u0645\u0648\u0642\u0639"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.employeeLocation||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.equipmentType","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"))}:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.equipmentType||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.quantity","\u0627\u0644\u0643\u0645\u064A\u0629"))}:</label>
                                <p class="text-gray-800">${e.quantity||0}</p>
                            </div>
                            ${e.shoeSize?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0642\u0627\u0633 \u0627\u0644\u062D\u0630\u0627\u0621:</label>
                                <p class="text-gray-800 font-bold"><i class="fas fa-shoe-prints text-blue-600 ml-1"></i>${Utils.escapeHTML(e.shoeSize)}</p>
                            </div>
                            `:""}
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.receiptDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}:</label>
                                <p class="text-gray-800">${e.receiptDate?Utils.formatDate(e.receiptDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}:</label>
                                <span class="badge badge-${this.isStatusReceived(e.status)?"success":"warning"}">
                                    ${i(a)}
                                </span>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="text-sm font-semibold text-gray-600">${i(s("module.ppe.label.notes","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}:</label>
                            <p class="text-gray-800 whitespace-pre-wrap">${Utils.escapeHTML(e.notes||s("module.ppe.notes.none","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="display: flex; justify-content: center; gap: 10px;">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${i(s("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}</button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("ppe"):""}
                    <button class="btn-success" onclick="PPE.exportPDF('${p}');">
                        <i class="fas fa-file-pdf ml-2"></i>${i(s("module.kpi.exportPDF","\u062A\u0635\u062F\u064A\u0631 PDF"))}
                    </button>
                    <button class="btn-primary" onclick="PPE.showPPEForm(${JSON.stringify(e).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>${i(s("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}
                    </button>
                    <button class="btn-danger" onclick="PPE.deletePPE('${p}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-trash ml-2"></i>${i(s("module.ppe.btn.deleteReceipt","\u062D\u0630\u0641"))}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(n,{moduleKey:"ppe",record:e,recordId:e.id||e.isoCode||""}),this.applyModuleI18n(n),n.addEventListener("click",l=>{l.target===n&&n.remove()})},async deletePPE(t){if(!t){Notification.error(this._t("module.ppe.notify.idMissing","\u0645\u0639\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}const e=AppState.appData.ppe.find(i=>i.id===t);if(!e){Notification.error(this._t("module.ppe.notify.receiptNotFound","\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}const s=`${this._t("module.ppe.confirm.delete","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u061F")}

${e.receiptNumber||e.id} \u2014 ${e.employeeName||""}`;if(confirm(s)){Loading.show();try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const i=await GoogleIntegration.sendToAppsScript("deletePPE",{ppeId:t});i&&i.success?(AppState.appData.ppe&&(AppState.appData.ppe=AppState.appData.ppe.filter(a=>a.id!==t)),Notification.success(this._t("module.ppe.notify.deleteSuccess","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")),await this.load()):Notification.error(i?.message||this._t("module.ppe.notify.deleteError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645"))}else AppState.appData.ppe?(AppState.appData.ppe=AppState.appData.ppe.filter(i=>i.id!==t),Notification.success(this._t("module.ppe.notify.deleteSuccess","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0646\u062C\u0627\u062D")),await this.load()):Notification.error(this._t("module.ppe.empty.noReceipts","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A"))}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645:",i),Notification.error(this._t("module.ppe.notify.deleteError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645")+": "+(i.message||i))}finally{Loading.hide()}}},async exportPDF(t){const e=AppState.appData.ppe.find(s=>s.id===t);if(!e){Notification.error(this._t("module.ppe.notify.receiptNotFound","\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}try{Loading.show();const s=e.receiptNumber||`PPE-${e.id?.substring(0,8)||"UNKNOWN"}`,i=y=>Utils.escapeHTML(y||""),a=y=>y?Utils.formatDate(y):"-",r=e.createdBy||e.createdByUser||e.recordedBy||e.recorderName||e.user||"\u2014",n=`
                <table>
                    <tr><th>\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644</th><td>${i(e.receiptNumber||e.id)}</td></tr>
                    <tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th><td>${i(e.employeeName)}</td></tr>
                    <tr><th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><td>${i(e.employeeCode||e.employeeNumber)}</td></tr>
                    <tr><th>\u0627\u0644\u0642\u0633\u0645</th><td>${i(e.employeeDepartment)}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0646\u0635\u0628</th><td>${i(e.employeePosition)}</td></tr>
                    <tr><th>\u0627\u0644\u0641\u0631\u0639</th><td>${i(e.employeeBranch)}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639</th><td>${i(e.employeeLocation)}</td></tr>
                    <tr><th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629</th><td>${i(e.equipmentType)}</td></tr>
                    <tr><th>\u0627\u0644\u0643\u0645\u064A\u0629</th><td>${e.quantity||0}</td></tr>
                    <tr><th>\u0645\u0633\u062C\u0651\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645</th><td>${i(r)}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645</th><td>${a(e.receiptDate)}</td></tr>
                    <tr><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><td>${i(e.status)}</td></tr>
                </table>
            `,p={type:"PPE",id:e.id,code:s,url:`${window.location.origin}/ppe/${e.id}`},l=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(s,this._t("module.ppe.pdf.receiptTitle","\u0625\u064A\u0635\u0627\u0644 \u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"),n,!1,!0,{version:"1.0",releaseDate:e.receiptDate||e.createdAt,revisionDate:e.updatedAt||e.receiptDate||e.createdAt,qrData:p},e.createdAt,e.updatedAt||e.receiptDate||e.createdAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>${Utils.escapeHTML(this._t("module.ppe.pdf.pageTitle","\u0625\u064A\u0635\u0627\u0644 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629"))}</title></head><body>${n}</body></html>`,o=new Blob([l],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(o),h=window.open(c,"_blank");h?h.onload=()=>{setTimeout(()=>{h.print(),setTimeout(()=>{URL.revokeObjectURL(c),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error(this._t("module.ppe.notify.pdfBlocked","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631")))}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645:",s),Notification.error(this._t("module.ppe.notify.pdfError","\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF")+": "+s.message)}},async showPPEMatrix(){const t=(r,n)=>this._t(r,n),e=r=>Utils.escapeHTML(r),s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 1400px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-table ml-2"></i>
                        ${e(t("module.ppe.title.matrix","\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0644\u0643\u0644 \u0645\u0648\u0638\u0641"))}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <div class="flex gap-2 items-center">
                            <input type="text" id="ppe-matrix-search" class="form-input" style="max-width: 400px;" 
                                placeholder="${e(t("module.ppe.matrix.searchPlaceholder",""))}">
                            <button id="add-ppe-matrix-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${e(t("module.ppe.matrix.addEdit","\u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 \u0645\u0635\u0641\u0648\u0641\u0629 \u0644\u0648\u0638\u064A\u0641\u0629"))}
                            </button>
                        </div>
                    </div>
                    <div id="ppe-matrix-content">
                        ${await this.renderPPEMatrix()}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${e(t("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}</button>
                    <button class="btn-primary" onclick="PPE.exportPPEMatrix()">
                        <i class="fas fa-file-excel ml-2"></i>${e(t("module.ppe.matrix.exportExcel","\u062A\u0635\u062F\u064A\u0631 Excel"))}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(s),this.applyModuleI18n(s);const i=document.getElementById("ppe-matrix-search");i&&i.addEventListener("input",r=>{this.filterPPEMatrix(r.target.value.trim())});const a=document.getElementById("add-ppe-matrix-btn");a&&a.addEventListener("click",()=>{this.showAddPPEMatrixForm()}),s.addEventListener("click",r=>{r.target===s&&s.remove()})},async renderPPEMatrix(){const t=(n,p)=>this._t(n,p),e=n=>Utils.escapeHTML(n),s=AppState.appData.employees||[],i=AppState.appData.employeePPEMatrixByCode||{},a=AppState.appData.ppe||[];if(s.length===0)return`
                <div class="empty-state">
                    <i class="fas fa-table text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${e(t("module.ppe.empty.matrixNoEmployees","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646"))}</p>
                </div>
            `;const r=s.map(n=>{const p=n.employeeNumber||n.sapId||"",l=n.name||n.employeeName||"-",o=n.position||t("module.ppe.label.undefinedDept","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),c=n.department||"-",h=i[p]||[],y=a.filter(m=>m.employeeCode===p||m.employeeNumber===p),d=[...new Set(y.map(m=>m.equipmentType).filter(Boolean))];return{code:p,name:l,position:o,department:c,requiredPPE:h,receivedPPE:d}});return`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${e(t("module.ppe.table.matrix.code","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}</th>
                            <th>${e(t("module.ppe.table.matrix.name","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"))}</th>
                            <th>${e(t("module.ppe.table.matrix.job","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"))}</th>
                            <th>${e(t("module.ppe.table.matrix.dept","\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629"))}</th>
                            <th>${e(t("module.ppe.table.matrix.required","\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"))}</th>
                            <th>${e(t("module.ppe.table.matrix.received","\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629"))}</th>
                            <th>${e(t("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${r.map(n=>{const p=n.requiredPPE.length>0?n.requiredPPE.map(o=>`<span class="badge badge-success mr-1 mb-1">${Utils.escapeHTML(o)}</span>`).join(""):`<span class="text-gray-500 text-sm">${e(t("module.ppe.matrix.notSet","\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F"))}</span>`,l=n.receivedPPE.length>0?n.receivedPPE.map(o=>`<span class="badge badge-info mr-1 mb-1">${Utils.escapeHTML(o)}</span>`).join(""):`<span class="text-gray-500 text-sm">${e(t("module.ppe.matrix.noneReceived","\u0644\u0627 \u062A\u0648\u062C\u062F"))}</span>`;return`
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
                                        <button onclick="PPE.editEmployeePPEMatrix('${Utils.escapeHTML(n.code)}')" class="btn-icon btn-icon-primary" title="${e(t("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},filterPPEMatrix(t){const e=document.querySelector("#ppe-matrix-content tbody");if(!e)return;e.querySelectorAll("tr[data-employee-code]").forEach(i=>{const a=i.getAttribute("data-employee-code")||"",r=i.getAttribute("data-employee-name")||"",n=i.getAttribute("data-position")||"",p=this._ppeMatchesSearch([a,r,n],t);i.style.display=p?"":"none"})},async showAddPPEMatrixForm(t=null){const e=!!t,s=AppState.appData.employeePPEMatrix||{},i=AppState.appData.ppe||[],a=[...new Set(i.map(f=>f.equipmentType).filter(Boolean))],r=AppState.appData.employees||[],n=[...new Set(r.map(f=>f.position).filter(Boolean))],p=t?s[t]:null,l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-plus-circle ml-2"></i>
                        ${e?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629":"\u0625\u0636\u0627\u0621\u0629 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0644\u0648\u0638\u064A\u0629"}
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
                                ${e?`
                                    <input type="text" id="ppe-matrix-position" value="${Utils.escapeHTML(t)}" class="form-input" readonly>
                                `:`
                                    <select id="ppe-matrix-position" required class="form-input">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629</option>
                                        ${n.map(f=>`
                                            <option value="${Utils.escapeHTML(f)}" ${s[f]?"disabled":""}>${Utils.escapeHTML(f)}${s[f]?" (\u0645\u0648\u062C\u0648\u062F\u0629 \u0628\u0627\u0644\u0641\u0639\u0644)":""}</option>
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
                                    ${a.map((f,u)=>`
                                        <label class="flex items-center p-2 border rounded cursor-pointer hover:bg-blue-50 transition-colors">
                                            <input type="checkbox" name="ppe-type" value="${Utils.escapeHTML(f)}" 
                                                ${p&&p.requiredPPE&&p.requiredPPE.includes(f)?"checked":""}
                                                class="ml-2 rounded border-gray-300 text-blue-600">
                                            <span class="text-sm font-medium">${Utils.escapeHTML(f)}</span>
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
                            <p class="text-sm text-blue-700">
                                <i class="fas fa-info-circle ml-1"></i>
                                <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u0633\u064A\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0647\u0630\u0647 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0630\u064A\u0646 \u0644\u062F\u064A\u0647\u0645 \u0647\u0630\u0647 \u0627\u0644\u0648\u0638\u064A\u0641\u0629.
                            </p>
                        </div>
                        
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(l);let o=!1;const c=l.querySelector('[data-action="close"]'),h=l.querySelector(".modal-close"),y=()=>{o&&!k&&!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0644\u062F\u064A\u0643 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062F\u0648\u0646 \u062D\u0641\u0638\u061F`)||l.remove()};c&&c.addEventListener("click",y),h&&h.addEventListener("click",y);const d=document.getElementById("ppe-matrix-position"),m=document.getElementById("ppe-matrix-position-custom");d&&m&&d.addEventListener("change",()=>{d.value==="__custom__"?(m.style.display="block",m.required=!0):(m.style.display="none",m.required=!1)});const x=l.querySelector("#ppe-matrix-form");let k=!1;x.addEventListener("change",()=>{o=!0}),x.addEventListener("input",()=>{o=!0}),x.addEventListener("submit",async f=>{if(f.preventDefault(),k)return;const u=e?t:d?.value==="__custom__"?m?.value.trim():d?.value;if(!u){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u0629");return}const v=Array.from(x.querySelectorAll('input[name="ppe-type"]:checked')).map(M=>M.value);if(v.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0648\u0642\u0627\u064A\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}k=!0;const w=x.querySelector('button[type="submit"]'),C=w?.innerHTML;w&&(w.disabled=!0,w.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const M=r.filter($=>$.position===u).map($=>$.employeeNumber||$.sapId||"");AppState.appData.employeePPEMatrix||(AppState.appData.employeePPEMatrix={});const R=AppState.appData.employeePPEMatrix[u]||{};AppState.appData.employeePPEMatrix[u]={requiredPPE:v,employees:M,updatedAt:new Date().toISOString(),createdAt:R?.createdAt||new Date().toISOString()},AppState.appData.employeePPEMatrixByCode||(AppState.appData.employeePPEMatrixByCode={}),M.forEach($=>{$&&(AppState.appData.employeePPEMatrixByCode[$]||(AppState.appData.employeePPEMatrixByCode[$]=[]),v.forEach(L=>{AppState.appData.employeePPEMatrixByCode[$].includes(L)||AppState.appData.employeePPEMatrixByCode[$].push(L)}))}),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),o=!1,Notification.success("\u062A\u0645 "+(e?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629")+' \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0644\u0644\u0648\u0638\u064A\u0641\u0629 "'+u+'" \u0628\u0646\u062C\u0627\u062D'),l.remove(),this.showPPEMatrix(),Promise.allSettled([GoogleIntegration.autoSave("PPEMatrix",AppState.appData.employeePPEMatrix).catch($=>(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",$),{success:!1,error:$})),GoogleIntegration.autoSave("EmployeePPEMatrixByCode",AppState.appData.employeePPEMatrixByCode).catch($=>(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A Google Sheets:",$),{success:!1,error:$}))]).then($=>{$.every(q=>q.status==="fulfilled")||Utils.safeWarn("\u26A0\uFE0F \u0628\u0639\u0636 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0645 \u062A\u0643\u062A\u0645\u0644 \u0628\u0646\u062C\u0627\u062D\u060C \u0644\u0643\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B")}).catch($=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",$)})}catch(M){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+M.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629:",M),w&&(w.disabled=!1,w.innerHTML=C),k=!1}}),l.addEventListener("click",f=>{if(f.target===l){if(o&&!k&&!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0644\u062F\u064A\u0643 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062F\u0648\u0646 \u062D\u0641\u0638\u061F`))return;l.remove()}})},async editPPEMatrix(t){this.showAddPPEMatrixForm(t)},async editEmployeePPEMatrix(t){const s=(AppState.appData.employees||[]).find(h=>(h.employeeNumber||h.sapId)===t);if(!s){Notification.error("\u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const a=(AppState.appData.employeePPEMatrixByCode||{})[t]||[],r=AppState.appData.ppe||[],n=[...new Set(r.map(h=>h.equipmentType).filter(Boolean))],p=["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","\u0642\u0641\u0627\u0632\u0627\u062A","\u0623\u062D\u0630\u064A\u0629 \u0623\u0645\u0627\u0646","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0633\u062F\u0627\u062F\u0627\u062A \u0623\u0630\u0646","\u0643\u0645\u0627\u0645\u0629","\u0628\u062F\u0644\u0629 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u0645\u0639\u062F\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u062A\u0646\u0641\u0633\u064A\u0629"],l=[...new Set([...p,...n])],o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 - ${Utils.escapeHTML(s.name||t)}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4 p-3 bg-gray-50 rounded">
                        <p><strong>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</strong> ${Utils.escapeHTML(t)}</p>
                        <p><strong>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641:</strong> ${Utils.escapeHTML(s.name||"-")}</p>
                        <p><strong>\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</strong> ${Utils.escapeHTML(s.position||"-")}</p>
                        <p><strong>\u0627\u0644\u0642\u0633\u0645:</strong> ${Utils.escapeHTML(s.department||"-")}</p>
                    </div>
                    <form id="employee-ppe-matrix-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 *</label>
                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    ${l.map((h,y)=>`
                                        <label class="flex items-center p-2 border rounded cursor-pointer hover:bg-blue-50 transition-colors">
                                            <input type="checkbox" name="ppe-type" value="${Utils.escapeHTML(h)}" 
                                                ${a.includes(h)?"checked":""}
                                                class="ml-2 rounded border-gray-300 text-blue-600">
                                            <span class="text-sm font-medium">${Utils.escapeHTML(h)}</span>
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
        `,document.body.appendChild(o);const c=o.querySelector("#employee-ppe-matrix-form");c.addEventListener("submit",async h=>{h.preventDefault();const y=c.querySelectorAll('input[name="ppe-type"]:checked'),d=Array.from(y).map(m=>m.value);try{AppState.appData.employeePPEMatrixByCode||(AppState.appData.employeePPEMatrixByCode={}),AppState.appData.employeePPEMatrixByCode[t]=d,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0644\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),o.remove();const m=document.getElementById("ppe-matrix-content");m&&(m.innerHTML=await this.renderPPEMatrix()),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&GoogleIntegration.autoSave("EmployeePPEMatrixByCode",AppState.appData.employeePPEMatrixByCode).catch(x=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",x)})}catch(m){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+m.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629:",m)}}),o.addEventListener("click",h=>{h.target===o&&o.remove()})},async viewPositionEmployees(t){const s=(AppState.appData.employeePPEMatrix||{})[t],a=(AppState.appData.employees||[]).filter(l=>l.position===t),r=document.createElement("div");r.className="modal-overlay";const n=s&&s.requiredPPE?s.requiredPPE.map(l=>`<span class="badge badge-success mr-2">${Utils.escapeHTML(l)}</span>`).join(""):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F";let p="";a.length>0?p=`
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
                            ${a.map(l=>{const o=l.employeeNumber||l.sapId||"",c=(AppState.appData.ppe||[]).filter(x=>x.employeeCode===o||x.employeeNumber===o),y=(AppState.appData.employeePPEMatrixByCode||{})[o]||[],d=c.length>0?c.map(x=>`<span class="badge badge-info">${Utils.escapeHTML(x.equipmentType||"")}</span>`).join(""):'<span class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F</span>',m=y.length>0?y.map(x=>`<span class="badge badge-success">${Utils.escapeHTML(x)}</span>`).join(""):'<span class="text-gray-500 text-sm">\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F</span>';return`
                                    <tr>
                                        <td><strong>${Utils.escapeHTML(o||"-")}</strong></td>
                                        <td>${Utils.escapeHTML(l.name||"-")}</td>
                                        <td>${Utils.escapeHTML(l.department||"-")}</td>
                                        <td>
                                            <div class="mb-2">
                                                <strong class="text-sm text-gray-600">\u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:</strong>
                                                <div class="flex flex-wrap gap-2 mt-1">
                                                    ${m}
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
                        \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u0648\u0638\u064A\u0641\u0629: ${Utils.escapeHTML(t)}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p class="text-sm text-blue-700">
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
        `,document.body.appendChild(r),r.addEventListener("click",l=>{l.target===r&&r.remove()})},_ppeReceiptExcelFieldDefs(){return[{key:"id",ar:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0633\u062C\u0644",en:"id"},{key:"receiptNumber",ar:"\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644",en:"receiptNumber"},{key:"employeeName",ar:"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",en:"employeeName"},{key:"employeeCode",ar:"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A",en:"employeeCode"},{key:"employeeDepartment",ar:"\u0627\u0644\u0642\u0633\u0645",en:"employeeDepartment"},{key:"equipmentType",ar:"\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629",en:"equipmentType"},{key:"quantity",ar:"\u0627\u0644\u0643\u0645\u064A\u0629",en:"quantity"},{key:"receiptDate",ar:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",en:"receiptDate"},{key:"status",ar:"\u0627\u0644\u062D\u0627\u0644\u0629",en:"status"}]},_ppeStockExcelFieldDefs(){return[{key:"itemId",ar:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641",en:"itemId"},{key:"itemCode",ar:"\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641",en:"itemCode"},{key:"itemName",ar:"\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641",en:"itemName"},{key:"category",ar:"\u0627\u0644\u0641\u0626\u0629",en:"category"},{key:"stock_IN",ar:"\u0627\u0644\u0648\u0627\u0631\u062F",en:"stock_IN"},{key:"stock_OUT",ar:"\u0627\u0644\u0645\u0646\u0635\u0631\u0641",en:"stock_OUT"},{key:"balance",ar:"\u0627\u0644\u0631\u0635\u064A\u062F",en:"balance"},{key:"minThreshold",ar:"\u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628",en:"minThreshold"},{key:"supplier",ar:"\u0627\u0644\u0645\u0648\u0631\u062F",en:"supplier"}]},_ppeBuildHeaderAliasMap(t){const e={};return t.forEach(s=>{e[String(s.ar||"").trim()]=s.key,e[String(s.en||"").trim().toLowerCase()]=s.key}),e},_ppeFormatCellForExcel(t){if(t==null)return"";if(t instanceof Date){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${e}-${s}-${i}`}if(typeof t=="object"&&t!==null&&typeof t.toISOString=="function")try{const e=new Date(t);if(!isNaN(e.getTime()))return this._ppeFormatCellForExcel(e)}catch{}return t},async exportReceiptsExcel(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}Loading.show(this._t("module.ppe.excel.exportingReceipts","\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A\u2026"));const t=this._ppeReceiptExcelFieldDefs(),s=this.getFilteredPpeReceipts(AppState.appData.ppe||[]).map(n=>{const p={};return t.forEach(l=>{let o=n[l.key];l.key==="receiptDate"?o=this._ppeFormatCellForExcel(o||n.receiptDate):l.key==="quantity"&&(o=o!=null?Number(o):""),p[l.ar]=o??""}),p}),i=XLSX.utils.json_to_sheet(s.length?s:[t.reduce((n,p)=>(n[p.ar]="",n),{})]),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,i,this._t("module.ppe.excel.sheetReceipts","\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"));const r=new Date().toISOString().slice(0,10);XLSX.writeFile(a,`PPE_\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A_${r}.xlsx`),Loading.hide(),Notification.success(this._t("module.ppe.excel.exportReceiptsOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A"))}catch(t){Loading.hide(),Utils.safeError("exportReceiptsExcel",t),Notification.error(this._t("module.ppe.excel.exportErr","\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")+": "+(t.message||t))}},downloadReceiptsExcelTemplate(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const e=this._ppeReceiptExcelFieldDefs().map(a=>a.ar),s=XLSX.utils.aoa_to_sheet([e]),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,s,this._t("module.ppe.excel.sheetReceipts","\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A")),XLSX.writeFile(i,`PPE_\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success(this._t("module.ppe.excel.templateDownloadOk","\u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}catch(t){Notification.error(this._t("module.ppe.excel.templateErr","\u0641\u0634\u0644 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628")+": "+t.message)}},async importReceiptsExcel(t){if(!t)return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const e=this._ppeReceiptExcelFieldDefs(),s=this._ppeBuildHeaderAliasMap(e);try{Loading.show(this._t("module.ppe.excel.importingReceipts","\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A\u2026"));const i=await t.arrayBuffer(),a=XLSX.read(i,{type:"array",cellDates:!0}),r=a.Sheets[a.SheetNames[0]],n=XLSX.utils.sheet_to_json(r,{header:1,defval:"",raw:!1});if(!n||n.length<2){Loading.hide(),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const l=(n[0]||[]).map(m=>String(m||"").trim()).map(m=>s[m]||s[String(m||"").trim().toLowerCase()]||""),o=Array.isArray(AppState.appData.ppe)?AppState.appData.ppe:[],c=new Set(o.map(m=>String(m&&(m.id||m.receiptNumber)||"").trim()).filter(Boolean));let h=0,y=0;const d=[];for(let m=1;m<n.length;m++){const x=n[m];if(!x||!x.some(u=>String(u||"").trim()!==""))continue;const k={};if(l.forEach((u,v)=>{if(!u)return;let w=x[v];if(w instanceof Date)k[u]=w.toISOString();else if(u==="quantity")k[u]=parseFloat(String(w).replace(/,/g,""))||0;else if(u==="receiptDate"&&w!==""&&w!==null&&w!==void 0){const C=w instanceof Date?w:new Date(w);k[u]=isNaN(C.getTime())?String(w):C.toISOString()}else k[u]=w!=null?String(w).trim():""}),!k.equipmentType||!k.employeeName){y++;continue}!k.quantity&&k.quantity!==0&&(k.quantity=1),k.status||(k.status="\u0645\u0633\u062A\u0644\u0645");const f=String(k.id||k.receiptNumber||"").trim();if(f&&c.has(f)){d.push({row:m+1,id:f,label:`${k.employeeName} \u2014 ${k.equipmentType}`});continue}try{const u={...k};delete u.id;const v=await GoogleIntegration.sendToAppsScript("addPPE",u);v&&v.success?(h++,f&&c.add(f)):y++}catch(u){y++,Utils.safeWarn("\u0635\u0641 \u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u0634\u0644:",u)}}Loading.hide(),this.clearCache(),await this.refreshActiveTab(),this._reportImportSummary({scope:"receipts",ok:h,fail:y,duplicates:d})}catch(i){Loading.hide(),Utils.safeError("importReceiptsExcel",i),Notification.error(this._t("module.ppe.excel.importErr","\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F")+": "+(i.message||i))}},async exportStockExcel(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}Loading.show(this._t("module.ppe.excel.exportingStock","\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"));const t=this._ppeStockExcelFieldDefs(),s=this.getFilteredStockItems(this._getCurrentStockItems()).map(r=>{const n={};return t.forEach(p=>{let l=r[p.key];p.key==="lastUpdate"?l=this._ppeFormatCellForExcel(l):["stock_IN","stock_OUT","balance","minThreshold"].includes(p.key)&&(l=l!=null&&l!==""?Number(l):""),n[p.ar]=l??""}),n}),i=XLSX.utils.json_to_sheet(s.length?s:[t.reduce((r,n)=>(r[n.ar]="",r),{})]),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,i,this._t("module.ppe.excel.sheetStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629")),XLSX.writeFile(a,`PPE_\u0645\u062E\u0632\u0648\u0646_${new Date().toISOString().slice(0,10)}.xlsx`),Loading.hide(),Notification.success(this._t("module.ppe.excel.exportStockOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0644\u0645\u062E\u0632\u0648\u0646"))}catch(t){Loading.hide(),Utils.safeError("exportStockExcel",t),Notification.error(this._t("module.ppe.excel.exportErr","\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")+": "+(t.message||t))}},downloadStockExcelTemplate(){try{if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const e=this._ppeStockExcelFieldDefs().filter(a=>!["stock_IN","stock_OUT","balance"].includes(a.key)).map(a=>a.ar),s=XLSX.utils.aoa_to_sheet([e]),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,s,this._t("module.ppe.excel.sheetStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629")),XLSX.writeFile(i,`PPE_\u0642\u0627\u0644\u0628_\u0645\u062E\u0632\u0648\u0646_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success(this._t("module.ppe.excel.templateDownloadOk","\u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}catch(t){Notification.error(this._t("module.ppe.excel.templateErr","\u0641\u0634\u0644 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628")+": "+t.message)}},async importStockExcel(t){if(!t)return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const e=this._ppeStockExcelFieldDefs(),s=this._ppeBuildHeaderAliasMap(e);try{Loading.show(this._t("module.ppe.excel.importingStock","\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u2026"));const i=await t.arrayBuffer(),a=XLSX.read(i,{type:"array",cellDates:!0}),r=a.Sheets[a.SheetNames[0]],n=XLSX.utils.sheet_to_json(r,{header:1,defval:"",raw:!1});if(!n||n.length<2){Loading.hide(),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const l=(n[0]||[]).map(f=>String(f||"").trim()).map(f=>s[f]||s[String(f||"").trim().toLowerCase()]||"");let o=this._getCurrentStockItems();if(!Array.isArray(o)||o.length===0)try{o=await this.loadStockItems(!0)}catch{o=this._getCurrentStockItems()||[]}const c=f=>String(f??"").trim().toLowerCase(),h=new Set,y=new Set,d=new Set;(o||[]).forEach(f=>{f&&(f.itemCode&&h.add(c(f.itemCode)),f.itemName&&y.add(c(f.itemName)),f.itemId&&d.add(String(f.itemId).trim()))});let m=0,x=0;const k=[];for(let f=1;f<n.length;f++){const u=n[f];if(!u||!u.some(L=>String(L||"").trim()!==""))continue;const v={};if(l.forEach((L,q)=>{if(!L)return;let z=u[q];["stock_IN","stock_OUT","balance","minThreshold"].includes(L)?v[L]=parseFloat(String(z).replace(/,/g,""))||0:v[L]=z!=null?String(z).trim():""}),!v.itemCode||!v.itemName){x++;continue}const w=c(v.itemCode),C=c(v.itemName),M=v.itemId&&String(v.itemId).trim();let R="";if(M&&d.has(M)?R="itemId":h.has(w)?R="itemCode":y.has(C)&&(R="itemName"),R){k.push({row:f+1,code:v.itemCode,name:v.itemName,reason:R});continue}const $={itemCode:v.itemCode,itemName:v.itemName,category:v.category||"",minThreshold:v.minThreshold!==void 0?v.minThreshold:0,supplier:v.supplier||""};v.stock_IN!==void 0&&($.stock_IN=v.stock_IN),v.stock_OUT!==void 0&&($.stock_OUT=v.stock_OUT),v.balance!==void 0&&($.balance=v.balance);try{const L=await GoogleIntegration.sendToAppsScript("addOrUpdatePPEStockItem",$);if(L&&L.success)m++,h.add(w),y.add(C);else{const q=L&&L.message?String(L.message):"";/موجود|exists/i.test(q)?k.push({row:f+1,code:v.itemCode,name:v.itemName,reason:"backend"}):x++}}catch(L){x++,Utils.safeWarn("\u0635\u0641 \u0645\u062E\u0632\u0648\u0646 \u0641\u0634\u0644:",L)}}Loading.hide(),this.clearCache(),await this.refreshActiveTab(),this._reportImportSummary({scope:"stock",ok:m,fail:x,duplicates:k})}catch(i){Loading.hide(),Utils.safeError("importStockExcel",i),Notification.error(this._t("module.ppe.excel.importErr","\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F")+": "+(i.message||i))}},_reportImportSummary({scope:t,ok:e,fail:s,duplicates:i}){const a=(l,o)=>this._t(l,o),r=i&&i.length||0,p=`${t==="receipts"?this._t("module.ppe.excel.importReceiptsSummary","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"):this._t("module.ppe.excel.importStockSummary","\u0627\u0643\u062A\u0645\u0644 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646")}: ${e} ${this._t("module.ppe.excel.ok","\u0646\u062C\u0627\u062D")}\u060C ${r} ${this._t("module.ppe.excel.duplicates","\u0645\u0643\u0631\u0651\u0631 (\u062A\u0645 \u062A\u062C\u0627\u0648\u0632\u0647)")}\u060C ${s} ${this._t("module.ppe.excel.fail","\u062A\u062E\u0637\u064A/\u0641\u0634\u0644")}.`;if(r>0){try{Notification.warning(p)}catch{}this._showDuplicatesModal(t,i)}else if(e>0)try{Notification.success(p)}catch{}else try{Notification.warning(p)}catch{}},_showDuplicatesModal(t,e){const s=(c,h)=>this._t(c,h),i=c=>Utils.escapeHTML(c),a=t==="receipts",r=a?s("module.ppe.excel.duplicatesReceiptsTitle","\u0628\u0646\u0648\u062F \u0645\u0643\u0631\u0651\u0631\u0629 \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A (\u0644\u0645 \u062A\u064F\u0633\u062A\u0648\u0631\u062F)"):s("module.ppe.excel.duplicatesStockTitle","\u0623\u0635\u0646\u0627\u0641 \u0645\u0643\u0631\u0651\u0631\u0629 \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646 (\u0644\u0645 \u062A\u064F\u0633\u062A\u0648\u0631\u062F)"),n=c=>c==="itemCode"?s("module.ppe.excel.dupReasonCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"):c==="itemName"?s("module.ppe.excel.dupReasonName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"):c==="itemId"?s("module.ppe.excel.dupReasonId","\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"):c==="backend"?s("module.ppe.excel.dupReasonBackend","\u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644 (\u062A\u0645 \u0631\u0641\u0636\u0647 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645)"):s("module.ppe.excel.dupReasonGeneric","\u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"),p=(e||[]).map(c=>a?`<tr>
                    <td>${i(c.row)}</td>
                    <td>${i(c.id||"")}</td>
                    <td>${i(c.label||"")}</td>
                </tr>`:`<tr>
                <td>${i(c.row)}</td>
                <td class="font-mono font-semibold">${i(c.code||"")}</td>
                <td>${i(c.name||"")}</td>
                <td>${i(n(c.reason))}</td>
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
        `,document.body.appendChild(o),o.addEventListener("click",c=>{c.target===o&&o.remove()})},_isPpeAdminUser(){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function")return!!Permissions.isCurrentUserEffectiveAdmin()}catch{}const t=typeof AppState<"u"&&AppState?AppState.currentUser:null;if(!t)return!1;const e=String(t.role||"").toLowerCase();if(e==="admin"||e==="system_admin"||t.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645")return!0;const s=t.permissions||{};return s.admin===!0||s["manage-modules"]===!0},_buildExcelToolbarHtml(t){if(!this._isPpeAdminUser())return"";const e=(r,n)=>this._t(r,n),s=r=>Utils.escapeHTML(r),a=t==="receipts"?{exportBtn:"ppe-receipts-export-excel-btn",tplBtn:"ppe-receipts-template-btn",importBtn:"ppe-receipts-import-btn",exportTitleKey:"module.ppe.excel.exportReceiptsTitle",exportTitleFb:"\u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0625\u0644\u0649 Excel",tplTitleKey:"module.ppe.excel.downloadTemplateReceiptsTitle",tplTitleFb:"\u062A\u0646\u0632\u064A\u0644 \u0642\u0627\u0644\u0628 Excel \u0641\u0627\u0631\u063A",importTitleKey:"module.ppe.excel.importReceiptsTitle",importTitleFb:"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0635\u0641\u0648\u0641 \u0645\u0646 \u0645\u0644\u0641 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0642\u0627\u0644\u0628"}:{exportBtn:"ppe-stock-export-excel-btn",tplBtn:"ppe-stock-template-btn",importBtn:"ppe-stock-import-btn",exportTitleKey:"module.ppe.excel.exportStockTitle",exportTitleFb:"\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0625\u0644\u0649 Excel",tplTitleKey:"module.ppe.excel.downloadTemplateStockTitle",tplTitleFb:"\u062A\u0646\u0632\u064A\u0644 \u0642\u0627\u0644\u0628 Excel \u0644\u0644\u0623\u0635\u0646\u0627\u0641",importTitleKey:"module.ppe.excel.importStockTitle",importTitleFb:"\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0635\u0646\u0627\u0641 \u0645\u0646 \u0645\u0644\u0641 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0642\u0627\u0644\u0628"};return`
            <div class="ppe-excel-toolbar flex flex-wrap items-center justify-end gap-2 mb-3">
                <button id="${a.exportBtn}" type="button" class="btn-secondary" title="${s(e(a.exportTitleKey,a.exportTitleFb))}">
                    <i class="fas fa-file-excel ml-2"></i>${s(e("module.ppe.excel.exportBtn","\u062A\u0635\u062F\u064A\u0631 Excel"))}
                </button>
                <button id="${a.tplBtn}" type="button" class="btn-secondary" title="${s(e(a.tplTitleKey,a.tplTitleFb))}">
                    <i class="fas fa-download ml-2"></i>${s(e("module.ppe.excel.downloadTemplateBtn","\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                </button>
                <button id="${a.importBtn}" type="button" class="btn-secondary" title="${s(e(a.importTitleKey,a.importTitleFb))}">
                    <i class="fas fa-file-import ml-2"></i>${s(e("module.ppe.excel.importBtn","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                </button>
            </div>
        `},showPpeReceiptsImportModal(){if(!this._isPpeAdminUser())return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}try{document.getElementById("ppe-receipts-import-modal")?.remove()}catch{}const t=(d,m)=>this._t(d,m),e=d=>Utils.escapeHTML(d),i=this._ppeReceiptExcelFieldDefs().map(d=>`<li><strong>${e(d.ar)}</strong> \u2014 <span class="font-mono text-xs">${e(d.en)}</span></li>`).join(""),a=document.createElement("div");a.className="modal-overlay",a.id="ppe-receipts-import-modal",a.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2 text-green-600"></i>${e(t("module.ppe.excel.importModalReceiptsTitle","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0645\u0646 Excel"))}</h2>
                    <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="${e(t("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p class="text-sm text-blue-900 font-semibold mb-2"><i class="fas fa-info-circle ml-2"></i>${e(t("module.ppe.excel.importModalIntro","\u062D\u0645\u0651\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0623\u0648 \u0627\u062A\u0628\u0639 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062B\u0645 \u0627\u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641. \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0643\u0631\u0631\u0629 \u062A\u064F\u062A\u062C\u0627\u0648\u064E\u0632 \u0645\u0639 \u062A\u0646\u0628\u064A\u0647."))}</p>
                        <button type="button" id="ppe-receipts-modal-download-template" class="btn-secondary btn-sm mb-3">
                            <i class="fas fa-file-download ml-2"></i>${e(t("module.ppe.excel.downloadTemplateBtn","\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                        </button>
                        <p class="text-sm text-blue-700 mb-2">${e(t("module.ppe.excel.importModalColumns","\u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u0629 \u0641\u064A \u0627\u0644\u0635\u0641 \u0627\u0644\u0623\u0648\u0644:"))}</p>
                        <ul class="text-sm text-blue-700 list-disc mr-6 space-y-1">${i}</ul>
                    </div>
                    <div>
                        <label for="ppe-receipts-modal-file" class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-file-excel ml-2"></i>${e(t("module.ppe.excel.chooseExcelFile","\u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx \u0623\u0648 .xls)"))}
                        </label>
                        <input type="file" id="ppe-receipts-modal-file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" class="form-input">
                    </div>
                    <div id="ppe-receipts-import-preview" class="hidden">
                        <h3 class="text-sm font-semibold text-gray-800 mb-2">${e(t("module.ppe.excel.previewTitle","\u0645\u0639\u0627\u064A\u0646\u0629 (\u0623\u0648\u0644 5 \u0635\u0641\u0648\u0641 \u0628\u064A\u0627\u0646\u0627\u062A):"))}</h3>
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
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${e(t("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button type="button" id="ppe-receipts-import-confirm" class="btn-primary" disabled>
                        <i class="fas fa-check ml-2"></i>${e(t("module.ppe.excel.confirmImport","\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"))}
                    </button>
                </div>
            </div>`,document.body.appendChild(a),this.applyModuleI18n(a);const r=a.querySelector("#ppe-receipts-modal-file"),n=a.querySelector("#ppe-receipts-modal-download-template"),p=a.querySelector("#ppe-receipts-import-preview"),l=a.querySelector("#ppe-receipts-preview-head"),o=a.querySelector("#ppe-receipts-preview-body"),c=a.querySelector("#ppe-receipts-preview-count"),h=a.querySelector("#ppe-receipts-import-confirm");let y=null;n&&(n.onclick=()=>this.downloadReceiptsExcelTemplate()),r.addEventListener("change",async d=>{const m=d.target.files&&d.target.files[0];if(y=m||null,h.disabled=!y,!m){p.classList.add("hidden");return}try{const x=await m.arrayBuffer(),k=XLSX.read(x,{type:"array",cellDates:!0}),f=XLSX.utils.sheet_to_json(k.Sheets[k.SheetNames[0]],{header:1,defval:"",raw:!1});if(!f||f.length<2){p.classList.add("hidden"),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const u=(f[0]||[]).map(w=>String(w||"").trim());l.innerHTML=`<tr>${u.map(w=>`<th>${e(w)}</th>`).join("")}</tr>`,o.innerHTML=f.slice(1,6).map(w=>`<tr>${u.map((C,M)=>`<td>${e(String(w[M]??""))}</td>`).join("")}</tr>`).join("");const v=Math.max(0,f.length-1);c.textContent=`${this._t("module.ppe.excel.previewRowCount","\u0639\u062F\u062F \u0635\u0641\u0648\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}: ${v}`,p.classList.remove("hidden")}catch(x){Utils.safeError("ppe receipts import preview",x),p.classList.add("hidden"),Notification.error(this._t("module.ppe.excel.previewErr","\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629"))}}),h.addEventListener("click",async()=>{y&&(a.remove(),await this.importReceiptsExcel(y))}),a.addEventListener("click",d=>{d.target===a&&a.remove()})},showPpeStockImportModal(){if(!this._isPpeAdminUser())return;if(typeof XLSX>"u"){Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}try{document.getElementById("ppe-stock-import-modal")?.remove()}catch{}const t=(d,m)=>this._t(d,m),e=d=>Utils.escapeHTML(d),i=this._ppeStockExcelFieldDefs().filter(d=>!["stock_IN","stock_OUT","balance"].includes(d.key)).map(d=>`<li><strong>${e(d.ar)}</strong> \u2014 <span class="font-mono text-xs">${e(d.en)}</span></li>`).join(""),a=document.createElement("div");a.className="modal-overlay",a.id="ppe-stock-import-modal",a.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2 text-green-600"></i>${e(t("module.ppe.excel.importModalStockTitle","\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 Excel"))}</h2>
                    <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="${e(t("module.common.close","\u0625\u063A\u0644\u0627\u0642"))}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p class="text-sm text-blue-900 font-semibold mb-2"><i class="fas fa-info-circle ml-2"></i>${e(t("module.ppe.excel.importStockIntro","\u062D\u0645\u0651\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u062B\u0645 \u0639\u0628\u0651\u0626 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0641\u0642\u0637. \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 (\u0643\u0648\u062F \u0623\u0648 \u0627\u0633\u0645 \u0623\u0648 \u0645\u0639\u0631\u0641) \u0644\u0646 \u062A\u064F\u0633\u062A\u0628\u062F\u0644 \u0648\u062A\u064F\u0639\u0631\u064E\u0636 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0643\u0631\u0631\u0627\u062A."))}</p>
                        <button type="button" id="ppe-stock-modal-download-template" class="btn-secondary btn-sm mb-3">
                            <i class="fas fa-file-download ml-2"></i>${e(t("module.ppe.excel.downloadTemplateBtn","\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"))}
                        </button>
                        <p class="text-sm text-blue-700 mb-2">${e(t("module.ppe.excel.importModalColumnsStock","\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0642\u0627\u0644\u0628 (\u0635\u0641 \u0627\u0644\u0631\u0624\u0648\u0633):"))}</p>
                        <ul class="text-sm text-blue-700 list-disc mr-6 space-y-1">${i}</ul>
                    </div>
                    <div>
                        <label for="ppe-stock-modal-file" class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-file-excel ml-2"></i>${e(t("module.ppe.excel.chooseExcelFile","\u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx \u0623\u0648 .xls)"))}
                        </label>
                        <input type="file" id="ppe-stock-modal-file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" class="form-input">
                    </div>
                    <div id="ppe-stock-import-preview" class="hidden">
                        <h3 class="text-sm font-semibold text-gray-800 mb-2">${e(t("module.ppe.excel.previewTitle","\u0645\u0639\u0627\u064A\u0646\u0629 (\u0623\u0648\u0644 5 \u0635\u0641\u0648\u0641 \u0628\u064A\u0627\u0646\u0627\u062A):"))}</h3>
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
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${e(t("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button type="button" id="ppe-stock-import-confirm" class="btn-primary" disabled>
                        <i class="fas fa-check ml-2"></i>${e(t("module.ppe.excel.confirmImport","\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"))}
                    </button>
                </div>
            </div>`,document.body.appendChild(a),this.applyModuleI18n(a);const r=a.querySelector("#ppe-stock-modal-file"),n=a.querySelector("#ppe-stock-modal-download-template"),p=a.querySelector("#ppe-stock-import-preview"),l=a.querySelector("#ppe-stock-preview-head"),o=a.querySelector("#ppe-stock-preview-body"),c=a.querySelector("#ppe-stock-preview-count"),h=a.querySelector("#ppe-stock-import-confirm");let y=null;n&&(n.onclick=()=>this.downloadStockExcelTemplate()),r.addEventListener("change",async d=>{const m=d.target.files&&d.target.files[0];if(y=m||null,h.disabled=!y,!m){p.classList.add("hidden");return}try{const x=await m.arrayBuffer(),k=XLSX.read(x,{type:"array",cellDates:!0}),f=XLSX.utils.sheet_to_json(k.Sheets[k.SheetNames[0]],{header:1,defval:"",raw:!1});if(!f||f.length<2){p.classList.add("hidden"),Notification.warning(this._t("module.ppe.excel.importEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0631\u0624\u0648\u0633"));return}const u=(f[0]||[]).map(w=>String(w||"").trim());l.innerHTML=`<tr>${u.map(w=>`<th>${e(w)}</th>`).join("")}</tr>`,o.innerHTML=f.slice(1,6).map(w=>`<tr>${u.map((C,M)=>`<td>${e(String(w[M]??""))}</td>`).join("")}</tr>`).join("");const v=Math.max(0,f.length-1);c.textContent=`${this._t("module.ppe.excel.previewRowCount","\u0639\u062F\u062F \u0635\u0641\u0648\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}: ${v}`,p.classList.remove("hidden")}catch(x){Utils.safeError("ppe stock import preview",x),p.classList.add("hidden"),Notification.error(this._t("module.ppe.excel.previewErr","\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629"))}}),h.addEventListener("click",async()=>{y&&(a.remove(),await this.importStockExcel(y))}),a.addEventListener("click",d=>{d.target===a&&a.remove()})},_bindPpeReceiptExcelToolbar(){const t=document.getElementById("ppe-receipts-export-excel-btn"),e=document.getElementById("ppe-receipts-template-btn"),s=document.getElementById("ppe-receipts-import-btn");t&&(t.onclick=()=>this.exportReceiptsExcel()),e&&(e.onclick=()=>this.downloadReceiptsExcelTemplate()),s&&(s.onclick=()=>this.showPpeReceiptsImportModal())},_bindPpeStockExcelToolbar(){const t=document.getElementById("ppe-stock-export-excel-btn"),e=document.getElementById("ppe-stock-template-btn"),s=document.getElementById("ppe-stock-import-btn");t&&(t.onclick=()=>this.exportStockExcel()),e&&(e.onclick=()=>this.downloadStockExcelTemplate()),s&&(s.onclick=()=>this.showPpeStockImportModal())},async exportPPEMatrix(){try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error(this._t("module.ppe.notify.xlsxMissing","\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=AppState.appData.employeePPEMatrix||{},e=AppState.appData.employees||[],s=Object.keys(t).map(r=>{const n=t[r],p=e.filter(l=>l.position===r);return{\u0627\u0644\u0648\u0638\u064A\u0629:r,"\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u064A\u0646":p.length,"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629":n.requiredPPE?n.requiredPPE.join(", "):""}}),i=XLSX.utils.json_to_sheet(s),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,i,"\u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"),XLSX.writeFile(a,"\u0645\u0635\u0648\u0629_\u0645\u0647\u0645\u0627\u062A_\u0627\u0644\u0648\u0642\u0627\u064A\u0629_"+new Date().toISOString().slice(0,10)+".xlsx"),Loading.hide(),Notification.success(this._t("module.ppe.notify.matrixExportOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"))}catch(t){Loading.hide(),Notification.error(this._t("module.ppe.notify.matrixExportErr","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+t.message)}},buildStockControlTabHtmlSync(t,e=""){const s=Array.isArray(t)?t:[],i=s.filter(r=>{if(!r)return!1;const n=parseFloat(r.balance||0),p=parseFloat(r.minThreshold||0);return n<p});return`
            <div class="space-y-6" id="ppe-stock-tab-root">
                ${e?`<div id="ppe-stock-hint-slot" class="mb-4">${e}</div>`:""}
                ${this.renderStockDashboard(s,i)}
                ${this.renderStockTable(s)}
            </div>
        `},async renderStockControlTab(){try{const t=await this.loadStockItems(),e=this.state.stockStaleWarningMsg?`<div role="status" class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex items-start gap-2">
                    <i class="fas fa-info-circle mt-0.5 text-amber-600"></i>
                    <span>${Utils.escapeHTML(this.state.stockStaleWarningMsg)}</span>
                   </div>`:"";this.state.stockStaleWarningMsg="";const s=this.state.stockLoadHardErrorMsg;if(this.state.stockLoadHardErrorMsg="",!Array.isArray(t))return Utils.safeWarn("\u26A0\uFE0F stockItems \u0644\u064A\u0633\u062A \u0645\u0635\u0641\u0648\u0641\u0629:",t),`
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                        <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.loadStockError","\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</p>
                        <button onclick="PPE.switchTab('stock-control')" class="btn-primary">
                            <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                        </button>
                    </div>
                `;if(t.length===0&&s)return`
                    <div class="empty-state">
                        <i class="fas fa-plug text-amber-600 text-4xl mb-4"></i>
                        <p class="text-gray-700 mb-2 font-semibold">${Utils.escapeHTML(s)}</p>
                        <p class="text-gray-500 text-sm mb-4">${Utils.escapeHTML(this._t("module.ppe.stock.hardErrorHint","\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629."))}</p>
                        <button onclick="PPE.switchTab('stock-control')" class="btn-primary">
                            <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                        </button>
                    </div>
                `;const i=t.filter(a=>{if(!a)return!1;const r=parseFloat(a.balance||0),n=parseFloat(a.minThreshold||0);return r<n});return`
            <div class="space-y-6">
                ${e}
                ${this.renderStockDashboard(t,i)}
                ${this.renderStockTable(t)}
            </div>
        `}catch(t){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A renderStockControlTab:",t),`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500 mb-4">${Utils.escapeHTML(this._t("module.ppe.empty.stockErrorTab","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}: ${Utils.escapeHTML(String(t.message||t))}</p>
                    <button onclick="PPE.switchTab('stock-control')" class="btn-primary">
                        <i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                    </button>
                </div>
            `}},renderStockDashboard(t,e){const s=(l,o)=>this._t(l,o),i=l=>Utils.escapeHTML(l),a=t.length,r=t.reduce((l,o)=>l+parseFloat(o.balance||0),0),n=t.reduce((l,o)=>l+parseFloat(o.stock_IN||0),0),p=t.reduce((l,o)=>l+parseFloat(o.stock_OUT||0),0);return`
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
            ${e.length>0?`
                <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-red-500 text-2xl ml-3"></i>
                        <div>
                            <h3 class="font-bold text-red-800">${i(s("module.ppe.stock.lowTitle","\u062A\u062D\u0630\u064A\u0631: \u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636"))}</h3>
                            <p class="text-sm text-red-700 mt-1">${e.length} ${i(s("module.ppe.stock.lowDesc","\u0635\u0646\u0641/\u0623\u0635\u0646\u0627\u0641 \u062A\u062D\u062A \u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628"))}</p>
                        </div>
                    </div>
                    <div class="mt-3 flex flex-wrap gap-2">
                        ${e.slice(0,5).map(l=>`
                            <span class="badge badge-warning">
                                ${Utils.escapeHTML(l.itemName||l.itemCode)} (${parseFloat(l.balance||0).toFixed(0)})
                            </span>
                        `).join("")}
                    </div>
                </div>
            `:""}
        `},renderStockTable(t){const e=(l,o)=>this._t(l,o),s=l=>Utils.escapeHTML(l),i=Array.isArray(t)?t:[],a=this._buildExcelToolbarHtml("stock");if(i.length===0)return`
                <div id="ppe-stock-table-card" class="content-card">
                    <div class="card-body">
                        ${a}
                        <div class="empty-state">
                            <i class="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">${s(e("module.ppe.empty.noStock","\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</p>
                            <button onclick="PPE.showStockItemForm()" class="btn-primary mt-4">
                                <i class="fas fa-plus ml-2"></i>${s(e("module.ppe.btn.addStockItem","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}
                            </button>
                        </div>
                    </div>
                </div>
            `;const r=this.buildStockFilterRow(i),n=this.getFilteredStockItems(i),p=this.hasActiveStockFilters();return n.length===0&&p?`
                <div id="ppe-stock-table-card" class="content-card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-list ml-2"></i>${s(e("module.ppe.stock.tableTitle","\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</h3>
                    </div>
                    <div class="card-body">
                        ${a}
                        <div id="ppe-stock-filters-host">${r}</div>
                        <div id="ppe-stock-results-host">${this.buildStockResultsInnerHtml(i)}</div>
                    </div>
                </div>
            `:`
            <div id="ppe-stock-table-card" class="content-card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-list ml-2"></i>${s(e("module.ppe.stock.tableTitle","\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646"))}</h3>
                </div>
                <div class="card-body">
                    ${a}
                    <div id="ppe-stock-filters-host">${r}</div>
                    <div id="ppe-stock-results-host">${this.buildStockResultsInnerHtml(i)}</div>
                </div>
            </div>
        `},buildStockResultsInnerHtml(t){const e=(n,p)=>this._t(n,p),s=n=>Utils.escapeHTML(n),i=Array.isArray(t)?t:[],a=this.getFilteredStockItems(i),r=this.hasActiveStockFilters();return a.length===0&&r?`
                <div class="empty-state">
                    <i class="fas fa-filter text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 mb-2">${s(e("module.ppe.filter.noMatch","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629"))}</p>
                    <button type="button" id="ppe-stock-clear-empty-filters" class="btn-secondary mt-2">
                        <i class="fas fa-undo-alt ml-2"></i>${s(e("module.ppe.filter.clearEmpty","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                    </button>
                </div>`:`
                    <div class="table-wrapper" style="overflow-x: auto;">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>${s(e("module.ppe.stock.itemCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641"))}</th>
                                    <th>${s(e("module.ppe.stock.itemName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641"))}</th>
                                    <th>${s(e("module.ppe.stock.category","\u0627\u0644\u0641\u0626\u0629"))}</th>
                                    <th>${s(e("module.ppe.stock.in","\u0627\u0644\u0648\u0627\u0631\u062F"))}</th>
                                    <th>${s(e("module.ppe.stock.out","\u0627\u0644\u0645\u0646\u0635\u0631\u0641"))}</th>
                                    <th>${s(e("module.ppe.stock.balance","\u0627\u0644\u0631\u0635\u064A\u062F"))}</th>
                                    <th>${s(e("module.ppe.stock.reorder","\u062D\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628"))}</th>
                                    <th>${s(e("module.ppe.stock.supplier","\u0627\u0644\u0645\u0648\u0631\u062F"))}</th>
                                    <th>${s(e("module.ppe.table.lastUpdate","\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B"))}</th>
                                    <th>${s(e("module.ppe.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}</th>
                                    <th>${s(e("module.ppe.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${a.map(n=>{const p=parseFloat(n.balance||0),l=parseFloat(n.minThreshold||0),o=p<l;return`
                                        <tr class="${o?"bg-red-50":""}" data-item-id="${n.itemId||""}">
                                            <td class="font-mono font-semibold">${Utils.escapeHTML(n.itemCode||"")}</td>
                                            <td>${Utils.escapeHTML(n.itemName||"")}</td>
                                            <td>${Utils.escapeHTML(n.category||"")}</td>
                                            <td>${parseFloat(n.stock_IN||0).toFixed(0)}</td>
                                            <td>${parseFloat(n.stock_OUT||0).toFixed(0)}</td>
                                            <td class="font-bold ${o?"text-red-600":"text-green-600"}">
                                                ${p.toFixed(0)}
                                            </td>
                                            <td>${l.toFixed(0)}</td>
                                            <td>${Utils.escapeHTML(n.supplier||"")}</td>
                                            <td>${n.lastUpdate?Utils.formatDate(n.lastUpdate):"-"}</td>
                                            <td>
                                                ${o?`
                                                    <span class="badge badge-warning">
                                                        <i class="fas fa-exclamation-triangle ml-1"></i>
                                                        ${s(e("module.ppe.status.lowStock","\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636"))}
                                                    </span>
                                                `:`
                                                    <span class="badge badge-success">${s(e("module.ppe.status.available","\u0645\u062A\u0648\u0641\u0631"))}</span>
                                                `}
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button onclick="PPE.showStockItemForm('${n.itemId}')" class="btn-icon btn-icon-primary" title="${s(e("module.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button onclick="PPE.showStockTransactions('${n.itemId}')" class="btn-icon btn-icon-info" title="${s(e("module.ppe.btn.transactions","\u0627\u0644\u062D\u0631\u0643\u0627\u062A"))}">
                                                        <i class="fas fa-list"></i>
                                                    </button>
                                                    <button onclick="PPE.showTransactionForm('${n.itemId}')" class="btn-icon btn-icon-success" title="${s(e("module.ppe.btn.addMovement","\u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629"))}">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                    <button onclick="PPE.deleteStockItem('${n.itemId}')" class="btn-icon btn-icon-danger" title="${s(e("module.ppe.btn.deleteItem","\u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641"))}">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `}).join("")}
                            </tbody>
                        </table>
                    </div>`},_getCurrentStockItems(){return this.state.stockItemsCache&&Array.isArray(this.state.stockItemsCache)&&this.state.stockItemsCache.length?this.state.stockItemsCache:Array.isArray(AppState.appData.ppeStock)?AppState.appData.ppeStock:[]},refreshStockListUI(t={}){const e=document.getElementById("ppe-stock-table-card");if(!e)return;const s=!!(t&&t.forceFull),i=this._ppeCaptureFocus(e),a=this._getCurrentStockItems(),r=document.getElementById("ppe-stock-results-host"),n=document.getElementById("ppe-stock-filters-host");if(!s&&r&&n&&a.length>0){r.innerHTML=this.buildStockResultsInnerHtml(a),this.applyModuleI18n(r),this.bindStockFilters(),this._ppeRestoreFocus(i);return}const p=this.renderStockTable(a),l=document.createElement("div");l.innerHTML=p.trim();const o=l.firstElementChild;o&&(e.replaceWith(o),this.applyModuleI18n(o),this.bindStockFilters(),this._ppeRestoreFocus(i))},_stockFilterTimer:null,bindStockFilters(){if(this.state.activeTab!=="stock-control")return;this.state.filters||(this.state.filters={}),this.state.filters.stock||this.resetStockFilters();const t=i=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(i):setTimeout(i,0)},e=document.getElementById("ppe-stock-search");this._ppeBindOnce(e,"input",i=>{this.state.filters.stock.search=i.target&&i.target.value||"",clearTimeout(this._stockFilterTimer),this._stockFilterTimer=setTimeout(()=>t(()=>this.refreshStockListUI()),180)}),this._ppeBindOnce(document.getElementById("ppe-stock-filter-category"),"change",i=>{this.state.filters.stock.category=i.target&&i.target.value||"",this.refreshStockListUI()}),this._ppeBindOnce(document.getElementById("ppe-stock-filter-supplier"),"change",i=>{this.state.filters.stock.supplier=i.target&&i.target.value||"",this.refreshStockListUI()}),this._ppeBindOnce(document.getElementById("ppe-stock-filter-status"),"change",i=>{this.state.filters.stock.status=i.target&&i.target.value||"",this.refreshStockListUI()}),this._ppeBindOnce(document.getElementById("ppe-stock-date-from"),"change",i=>{this.state.filters.stock.dateFrom=i.target&&i.target.value||"",this.refreshStockListUI()}),this._ppeBindOnce(document.getElementById("ppe-stock-date-to"),"change",i=>{this.state.filters.stock.dateTo=i.target&&i.target.value||"",this.refreshStockListUI()}),this._ppeBindOnce(document.getElementById("ppe-stock-reset-filters"),"click",()=>{this.resetStockFilters(),this.refreshStockListUI({forceFull:!0})});const s=document.getElementById("ppe-stock-clear-empty-filters");s&&(s.onclick=()=>{this.resetStockFilters(),this.refreshStockListUI({forceFull:!0})})},async _fetchPPEStockRpcOnce(t){const e=GoogleIntegration.sendToAppsScript("getAllPPEStockItems",{filters:{}}),s=new Promise((i,a)=>setTimeout(()=>a(new Error(this._t("module.ppe.stock.timeoutRpc","\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u062E\u0627\u062F\u0645 \u0639\u0646\u062F \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646."))),t));return Promise.race([e,s])},_localStockFallbackArrays(){const t=this.state.stockItemsCache,e=Array.isArray(AppState.appData.ppeStock)?AppState.appData.ppeStock:[];return t&&t.length>0?t:e.length>0?e:[]},async loadStockItems(t=!1){try{const e=Date.now(),s=this.state.stockItemsCache&&this.state.stockItemsCacheTime&&e-this.state.stockItemsCacheTime<this.state.stockCacheExpiry;return!t&&s?(Utils.safeLog("\u2705 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 Cache"),this.state.stockItemsCache&&!AppState.appData.ppeStock&&(AppState.appData.ppeStock=this.state.stockItemsCache),this.state.stockItemsCache):this._stockLoadInflightPromise?(Utils.safeLog("\u23F3 \u0637\u0644\u0628 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u2014 \u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0640 Promise"),this._stockLoadInflightPromise):(this._stockLoadInflightPromise=(async()=>{try{return await this._loadStockItemsInternal(t)}finally{this._stockLoadInflightPromise=null}})(),this._stockLoadInflightPromise)}catch(e){return this._stockLoadInflightPromise=null,Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A loadStockItems wrapper:",e),[]}},async _loadStockItemsInternal(t=!1){try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){this.state.stockLoadHardErrorMsg="";try{let i=null,a=null;for(let l=0;l<2;l++)try{l>0&&await new Promise(o=>setTimeout(o,700)),i=await this._fetchPPEStockRpcOnce(3e4),a=null;break}catch(o){a=o,i=null}if(i&&i.success){const l=Array.isArray(i.data)?i.data:[];return AppState.appData.ppeStock||(AppState.appData.ppeStock=[]),AppState.appData.ppeStock=l,this.state.stockItemsCache=l,this.state.stockItemsCacheTime=Date.now(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),l}const r=i&&i.message?String(i.message):"",n=this._localStockFallbackArrays();if(n.length>0)return this.state.stockStaleWarningMsg=r||this._t("module.ppe.stock.staleDataNotice","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u064A\u064F\u0639\u0631\u0636 \u0622\u062E\u0631 \u0645\u062E\u0632\u0651\u0646 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u064F\u0633\u062A\u062D\u0633\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644."),a?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0645\u062D\u0627\u0648\u0644\u0629\u060C \u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0634:",a):r&&Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0627\u062F\u0645 \u0631\u0641\u0636 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u060C \u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0634:",r),n;let p=r||a&&a.message||this._t("module.ppe.stock.loadFailedUnknown","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646.");return/Timeout|مهلة/i.test(p||"")&&(p=this._t("module.ppe.stock.loadFailedTimeout","\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0639\u0646\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0634\u0628\u0643\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B.")),this.state.stockLoadHardErrorMsg=p,Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0645\u062E\u0632\u0648\u0646\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0648\u0641\u0634\u0644 \u0627\u0644\u062C\u0644\u0628 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",p),[]}catch(i){const a=this._localStockFallbackArrays();return a.length>0?(this.state.stockStaleWarningMsg=this._t("module.ppe.stock.staleDataNotice","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u064A\u064F\u0639\u0631\u0636 \u0622\u062E\u0631 \u0645\u062E\u0632\u0651\u0646 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u064F\u0633\u062A\u062D\u0633\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644."),Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646\u060C \u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0634:",i),a):(this.state.stockLoadHardErrorMsg=String(i&&i.message?i.message:i),[])}}return this.state.stockItemsCache?(AppState.appData.ppeStock||(AppState.appData.ppeStock=this.state.stockItemsCache),this.state.stockItemsCache):AppState.appData.ppeStock||[]}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646:",e);const s=this._localStockFallbackArrays();return s.length>0?(this.state.stockStaleWarningMsg=this._t("module.ppe.stock.staleDataNotice","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u064A\u064F\u0639\u0631\u0636 \u0622\u062E\u0631 \u0645\u062E\u0632\u0651\u0646 \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u064F\u0633\u062A\u062D\u0633\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644."),s):(this.state.stockLoadHardErrorMsg=String(e&&e.message?e.message:e),[])}},async showStockItemForm(t=null){const e=!!t;let s=null;e&&(s=(await this.loadStockItems()).find(l=>l.itemId===t));const i=(p,l)=>this._t(p,l),a=p=>Utils.escapeHTML(p),r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${a(e?i("module.ppe.title.stockItemEdit","\u062A\u0639\u062F\u064A\u0644 \u0635\u0646\u0641"):i("module.ppe.title.stockItemAdd","\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062C\u062F\u064A\u062F"))}</h2>
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
                                <i class="fas fa-save ml-2"></i>${a(e?i("module.common.saveChanges","\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A"):i("module.ppe.btn.addItem","\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0635\u0646\u0641"))}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(r),this.applyModuleI18n(r),r.querySelector("#stock-item-form").addEventListener("submit",async p=>{p.preventDefault(),Loading.show();try{const l=document.getElementById("stock-item-code"),o=document.getElementById("stock-item-name"),c=document.getElementById("stock-item-category"),h=document.getElementById("stock-item-min-threshold"),y=document.getElementById("stock-item-supplier");if(!l||!o||!c||!h||!y){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.fieldsMissing","\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."));return}const d=l.value.trim(),m=o.value.trim();if(d&&(await this.loadStockItems()).find(u=>(e?u.itemId!==s.itemId:!0)&&u.itemCode&&String(u.itemCode).trim().toLowerCase()===d.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0643\u0648\u062F \u0622\u062E\u0631.")),l.focus(),l.style.borderColor="#ef4444";return}if(m&&(await this.loadStockItems()).find(u=>(e?u.itemId!==s.itemId:!0)&&u.itemName&&String(u.itemName).trim().toLowerCase()===m.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0633\u0645 \u0622\u062E\u0631.")),o.focus(),o.style.borderColor="#ef4444";return}const x={itemId:s?.itemId||Utils.generateId("STOCK"),itemCode:d,itemName:o.value.trim(),category:c.value.trim(),minThreshold:parseFloat(h.value)||0,supplier:y.value.trim(),stock_IN:s?.stock_IN||0,stock_OUT:s?.stock_OUT||0,balance:s?.balance||0,lastUpdate:new Date().toISOString(),createdAt:s?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const k=await GoogleIntegration.sendToAppsScript("addOrUpdatePPEStockItem",x);if(k&&k.success){this.clearCache(),r.remove(),Loading.hide(),Notification.success(`\u062A\u0645 ${e?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629"} \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D`),this.refreshActiveTab();return}else{const f=k?.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0635\u0646\u0641";Notification.error(f),f.includes("\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F")?(l.style.borderColor="#ef4444",l.focus()):f.includes("\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F")&&(o.style.borderColor="#ef4444",o.focus())}}else{if(AppState.appData.ppeStock||(AppState.appData.ppeStock=[]),e){const k=AppState.appData.ppeStock.findIndex(f=>f.itemId===s.itemId);if(k!==-1){if(d&&AppState.appData.ppeStock.find((u,v)=>v!==k&&u.itemCode&&String(u.itemCode).trim().toLowerCase()===d.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0643\u0648\u062F \u0622\u062E\u0631.")),l.focus(),l.style.borderColor="#ef4444";return}if(m&&AppState.appData.ppeStock.find((u,v)=>v!==k&&u.itemName&&String(u.itemName).trim().toLowerCase()===m.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0633\u0645 \u0622\u062E\u0631.")),o.focus(),o.style.borderColor="#ef4444";return}AppState.appData.ppeStock[k]=x}}else{if(d&&AppState.appData.ppeStock.find(f=>f.itemCode&&String(f.itemCode).trim().toLowerCase()===d.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateCode","\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0643\u0648\u062F \u0622\u062E\u0631.")),l.focus(),l.style.borderColor="#ef4444";return}if(m&&AppState.appData.ppeStock.find(f=>f.itemName&&String(f.itemName).trim().toLowerCase()===m.toLowerCase())){Loading.hide(),Notification.error(PPE._t("module.ppe.notify.duplicateName","\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0633\u0645 \u0622\u062E\u0631.")),o.focus(),o.style.borderColor="#ef4444";return}AppState.appData.ppeStock.push(x)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.clearCache(),r.remove(),Loading.hide(),Notification.success(`\u062A\u0645 ${e?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629"} \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D`),this.refreshActiveTab();return}}catch(l){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+l.message)}finally{Loading.hide()}}),r.addEventListener("click",p=>{p.target===r&&r.remove()})},async showTransactionForm(t=null){const e=await this.loadStockItems(),s=t?e.find(r=>r.itemId===t):null,i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
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
                                ${e.map(r=>`
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
        `,document.body.appendChild(i),i.querySelector("#transaction-form").addEventListener("submit",async r=>{r.preventDefault(),Loading.show();try{const n=document.getElementById("transaction-item-id"),p=document.getElementById("transaction-action"),l=document.getElementById("transaction-quantity"),o=document.getElementById("transaction-date"),c=document.getElementById("transaction-issued-to"),h=document.getElementById("transaction-remarks");if(!n||!p||!l||!o||!c||!h){Loading.hide(),Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const y={itemId:n.value,action:p.value,quantity:parseFloat(l.value)||0,date:new Date(o.value).toISOString(),issuedTo:c.value.trim(),remarks:h.value.trim(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const d=await GoogleIntegration.sendToAppsScript("addPPETransaction",y);if(d&&d.success){this.clearCache(),i.remove(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshActiveTab();return}else Notification.error(d?.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0631\u0643\u0629")}else{y.id=Utils.generateId("TRANS"),AppState.appData.ppeTransactions||(AppState.appData.ppeTransactions=[]),AppState.appData.ppeTransactions.push(y),AppState.appData.ppeStock||(AppState.appData.ppeStock=[]);const d=AppState.appData.ppeStock.find(m=>m.itemId===y.itemId);d&&(y.action==="IN"?d.stock_IN=parseFloat(d.stock_IN||0)+y.quantity:d.stock_OUT=parseFloat(d.stock_OUT||0)+y.quantity,d.balance=parseFloat(d.stock_IN||0)-parseFloat(d.stock_OUT||0),d.lastUpdate=new Date().toISOString()),this.clearCache(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),i.remove(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshActiveTab();return}}catch(n){Notification.error(PPE._t("module.ppe.notify.saveRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623")+": "+n.message)}finally{Loading.hide()}}),i.addEventListener("click",r=>{r.target===i&&i.remove()})},async showStockTransactions(t){if(!t){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}Loading.show();try{let e=[];try{e=await this.loadStockItems(),Array.isArray(e)||(e=[])}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646:",o),e=AppState.appData.ppeStock||[]}const s=e.find(o=>o&&o.itemId===t);if(!s){Loading.hide(),Notification.error("\u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u0645\u064A\u0644\u0647");return}let i=[];if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const o=await GoogleIntegration.sendToAppsScript("getAllPPETransactions",{filters:{itemId:t}});o&&o.success?i=Array.isArray(o.data)?o.data:[]:(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062C\u0644\u0628 \u0627\u0644\u062D\u0631\u0643\u0627\u062A \u0645\u0646 Backend\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",o?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"),i=(AppState.appData.ppeTransactions||[]).filter(c=>c&&c.itemId===t))}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0640 Backend\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",o),i=(AppState.appData.ppeTransactions||[]).filter(c=>c&&c.itemId===t)}else i=(AppState.appData.ppeTransactions||[]).filter(o=>o&&o.itemId===t);Array.isArray(i)||(i=[]),Loading.hide();const a=document.createElement("div");a.className="modal-overlay",i.sort((o,c)=>{const h=new Date(o.date||o.createdAt||0);return new Date(c.date||c.createdAt||0)-h});const r=i.filter(o=>o.action==="IN").reduce((o,c)=>o+parseFloat(c.quantity||0),0),n=i.filter(o=>o.action==="OUT").reduce((o,c)=>o+parseFloat(c.quantity||0),0),p=r-n;let l="";i.length===0?l=`
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
                                ${i.map(o=>{const c=o.action==="IN"?"\u0648\u0627\u0631\u062F":"\u0645\u0646\u0635\u0631\u0641",h=o.action==="IN"?"badge-success":"badge-warning",y=o.action==="IN"?"fa-arrow-down":"fa-arrow-up";return`
                                        <tr>
                                            <td>${o.date?Utils.formatDate(o.date):"-"}</td>
                                            <td>
                                                <span class="badge ${h}">
                                                    <i class="fas ${y} ml-1"></i>
                                                    ${c}
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
                        <button class="btn-primary" onclick="PPE.showTransactionForm('${t}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062D\u0631\u0643\u0629 \u062C\u062F\u064A\u062F\u0629
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(a),a.addEventListener("click",o=>{o.target===a&&a.remove()})}catch(e){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A:",e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A: "+(e.message||e))}},async deleteStockItem(t){if(!t){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=(await this.loadStockItems()).find(a=>a&&a.itemId===t);if(!s){Notification.error("\u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 "${s.itemName||s.itemCode}"\u061F

\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 \u0625\u0630\u0627 \u0643\u0627\u0646 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u062D\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629.`;if(confirm(i)){Loading.show();try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const a=await GoogleIntegration.sendToAppsScript("deletePPEStockItem",{itemId:t});a&&a.success?(this.state.stockItemsCache=null,this.state.stockItemsCacheTime=null,Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D"),await this.load()):Notification.error(a?.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641")}else AppState.appData.ppeStock?(AppState.appData.ppeStock=AppState.appData.ppeStock.filter(a=>a.itemId!==t),this.state.stockItemsCache=null,this.state.stockItemsCacheTime=null,Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062C\u0627\u062D"),await this.load()):Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0629 \u0644\u0644\u062D\u0630\u0641")}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0635\u0646\u0641: "+(a.message||a))}finally{Loading.hide()}}},_ppeAnalyticsPeriod:"0",_ppeAnalyticsCharts:{},async renderPpeAnalysisTab(){return this._ppeEnsureChartJS().catch(()=>{}),`
        <div id="ppe-analytics-root" style="font-family:inherit;">

            <!-- \u2550\u2550\u2550 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u2550\u2550\u2550 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#2563EB 0%,#1D4ED8 50%,#1E3A8A 100%);border-radius:14px;color:#fff;box-shadow:0 8px 28px rgba(37, 99, 235, 0.32);">
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
                        ${["30","90","180","365","0"].map((t,e)=>{const s=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],i=(this._ppeAnalyticsPeriod||"0")===t;return`<button class="ppe-period-btn" data-period="${t}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${i?"#fff":"rgba(255,255,255,0.15)"};color:${i?"#2563EB":"#fff"};">${s[e]}</button>`}).join("")}
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
            <div id="ppe-filter-panel" style="display:none;background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#2563EB;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#2563EB;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</span>
                        <span id="ppe-filter-count" style="background:#dbeafe;color:#115E59;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="ppe-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #bfdbfe;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#eff6ff';this.style.color='#2563EB'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times me-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">
                    ${[{id:"ppe-af-status",icon:"fas fa-flag",color:"#0891b2",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{id:"ppe-af-type",icon:"fas fa-hard-hat",color:"#2563EB",label:"\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629"},{id:"ppe-af-dept",icon:"fas fa-building",color:"#f59e0b",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{id:"ppe-af-category",icon:"fas fa-tags",color:"#6366f1",label:"\u0627\u0644\u0641\u0626\u0629"},{id:"ppe-af-supplier",icon:"fas fa-truck",color:"#8b5cf6",label:"\u0627\u0644\u0645\u0648\u0631\u062F"},{id:"ppe-af-factory",icon:"fas fa-industry",color:"#3B82F6",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{id:"ppe-af-location",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:"\u0627\u0644\u0645\u0648\u0642\u0639"}].map(t=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                <i class="${t.icon}" style="color:${t.color};margin-inline-end:4px;"></i>${t.label}
                            </label>
                            <select id="${t.id}" style="width:100%;padding:7px 10px;border:1.5px solid #bfdbfe;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#2563EB'" onblur="this.style.borderColor='#bfdbfe'">
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
                        <i class="fas fa-industry" style="color:#3B82F6;"></i>
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
                        <i class="fas fa-hard-hat" style="color:#2563EB;"></i>
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
                        <i class="fas fa-chart-column" style="color:#2563EB;"></i>
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
                        <i class="fas fa-list-ul" style="color:#2563EB;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u062D\u062F\u062B \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A</span>
                    </div>
                    <span id="ppe-recent-count" style="background:#eff6ff;color:#2563EB;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                        <thead>
                            <tr style="background:#eff6ff;">
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#2563EB;white-space:nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#2563EB;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#2563EB;">\u0627\u0644\u0643\u0648\u062F</th>
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#2563EB;">\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629</th>
                                <th style="padding:9px 12px;text-align:center;font-weight:700;color:#2563EB;">\u0627\u0644\u0643\u0645\u064A\u0629</th>
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#2563EB;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                <th style="padding:9px 12px;text-align:start;font-weight:700;color:#2563EB;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th style="padding:9px 12px;text-align:center;font-weight:700;color:#2563EB;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody id="ppe-recent-tbody">
                            <tr><td colspan="8" style="padding:24px;text-align:center;color:#94a3b8;">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `},async _ppeEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(e=>{let s=0;const i=setInterval(()=>{typeof Chart<"u"?(clearInterval(i),e(!0)):++s>50&&(clearInterval(i),e(!1))},100)}):new Promise(e=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",s.onload=()=>e(!0),s.onerror=()=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",i.onload=()=>e(!0),i.onerror=()=>e(!1),document.head.appendChild(i)},document.head.appendChild(s)})},_getPpeReceiptsData(){return(Array.isArray(AppState?.appData?.ppe)?AppState.appData.ppe:[]).map(e=>{if(e._factoryDisplay!==void 0)return e;const s=String(e.employeeLocation||e.location||"").trim();let i="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",a="";if(s){const r=s.indexOf(" - ");r>0?(i=s.substring(0,r).trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",a=s.substring(r+3).trim()):i=s}return e._factoryDisplay=i,e._locationDisplay=a||i,e._deptDisplay=String(e.employeeDepartment||e.department||e.dept||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",e})},_getPpeStockData(){return Array.isArray(AppState?.appData?.ppeStock)?AppState.appData.ppeStock:[]},_getPpeReceiptDate(t){if(!t)return null;const e=t.receiptDate||t.date||t.createdAt||t.timestamp||null;if(!e)return null;try{const s=new Date(e);return isNaN(s.getTime())?null:s}catch{return null}},_normalizePpeStatus(t){const e=String(t||"").trim().toLowerCase();return e==="\u0645\u0633\u062A\u0644\u0645"||e==="received"||e==="\u0645\u0643\u062A\u0645\u0644"?"received":e==="\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645"||e==="pending"||e==="\u0628\u0627\u0646\u062A\u0638\u0627\u0631"?"pending":"other"},async updatePpeAnalyticsDashboard(){const t=document.getElementById("ppe-analytics-root");if(!t)return;const e=this._getPpeReceiptsData(),s=this._getPpeStockData(),i=parseInt(this._ppeAnalyticsPeriod||"0",10),a=i>0?(()=>{const E=new Date;return E.setDate(E.getDate()-i),E})():null,r=a?e.filter(E=>{const S=this._getPpeReceiptDate(E);return S&&S>=a}):e.slice();this._ppePopulateAnalyticsFilters(r,s);const{receipts:n,stock:p}=this._ppeApplyAnalyticsFilters(r,s),l=n.length,o=document.getElementById("ppe-filter-count");o&&(o.textContent=`${l} \u0627\u0633\u062A\u0644\u0627\u0645`);const c=n.reduce((E,S)=>E+(parseFloat(S.quantity)||0),0),h=n.filter(E=>this._normalizePpeStatus(E.status)==="received").length,y=n.filter(E=>this._normalizePpeStatus(E.status)==="pending").length,d=p.filter(E=>{const S=parseFloat(E.balance||0),_=parseFloat(E.minThreshold||0);return _>0&&S<_}),m=p.length,x=d.length,k=new Set(n.map(E=>E.employeeCode||E.employeeName).filter(Boolean)).size,f=new Date,u=n.filter(E=>{const S=this._getPpeReceiptDate(E);return S&&S.getFullYear()===f.getFullYear()&&S.getMonth()===f.getMonth()}).length,v=new Set(n.map(E=>{const S=this._getPpeReceiptDate(E);return S?`${S.getFullYear()}-${S.getMonth()}`:null}).filter(Boolean)),w=v.size>0?(l/v.size).toFixed(1):"0",C=document.getElementById("ppe-kpi-strip");if(C){const E=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A",value:l,icon:"fas fa-receipt",color:"#2563EB",bg:"#eff6ff",border:"#bfdbfe"},{label:"\u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0627\u0644\u0645\u064F\u0633\u062A\u0644\u064E\u0645\u0629",value:c.toFixed(0),icon:"fas fa-cubes",color:"#1D4ED8",bg:"#EFF6FF",border:"#BFDBFE"},{label:"\u0645\u0643\u062A\u0645\u0644\u0629 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",value:h,icon:"fas fa-circle-check",color:"#047857",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645",value:y,icon:"fas fa-hourglass-half",color:"#b45309",bg:"#fffbeb",border:"#fde68a"},{label:"\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0632\u0648\u0646",value:m,icon:"fas fa-boxes",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u0646\u062E\u0641\u0636 \u0627\u0644\u0645\u062E\u0632\u0648\u0646",value:x,icon:"fas fa-triangle-exclamation",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646",value:k,icon:"fas fa-users",color:"#7c3aed",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:u,icon:"fas fa-calendar-day",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0634\u0647\u0631\u064A",value:w,icon:"fas fa-calendar-check",color:"#1E3A8A",bg:"#eef2ff",border:"#c7d2fe"}];C.innerHTML=E.map(S=>`
                <div style="background:${S.bg};border:1px solid ${S.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${S.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${S.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${S.color};line-height:1;" dir="ltr">${S.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${S.label}</div>
                    </div>
                </div>`).join("")}if(!await this._ppeEnsureChartJS()||typeof Chart>"u"){t.querySelector(".ppe-chart-load-warning")||t.insertAdjacentHTML("afterbegin",'<div class="ppe-chart-load-warning" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647 \u0645\u062A\u0627\u062D\u0629.</span></div>');return}const R={received:"\u0645\u0633\u062A\u0644\u0645",pending:"\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645",other:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},$={};n.forEach(E=>{const S=R[this._normalizePpeStatus(E?.status)]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";$[S]=($[S]||0)+1});const L={\u0645\u0633\u062A\u0644\u0645:"rgba(5,150,105,0.85)","\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645":"rgba(245,158,11,0.85)","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":"rgba(148,163,184,0.8)"};this._ppeDoughnut("ppe-chart-status",Object.keys($),Object.values($),Object.keys($).map(E=>L[E]||"rgba(148,163,184,0.8)")),this._ppeTrend("ppe-chart-trend",e);const q=this._ppeGroupBy(p,E=>String(E.category||"\u0628\u062F\u0648\u0646 \u0641\u0626\u0629").trim(),8),z=["rgba(99,102,241,0.85)","rgba(37, 99, 235, 0.85)","rgba(245,158,11,0.85)","rgba(244,63,94,0.85)","rgba(139,92,246,0.85)","rgba(8,145,178,0.85)","rgba(5,150,105,0.85)","rgba(217,119,6,0.85)"];this._ppeDoughnut("ppe-chart-category",q.labels,q.data,q.labels.map((E,S)=>z[S%z.length])),this._ppeYearly("ppe-chart-yearly",e),this._ppePopulateFactoryCards(n,l),this._ppePopulateAnalyticsLists(n,p,l);const W=n.slice().sort((E,S)=>{const _=this._getPpeReceiptDate(E),j=this._getPpeReceiptDate(S);return(j?j.getTime():0)-(_?_.getTime():0)}).slice(0,20),Q=document.getElementById("ppe-recent-count");Q&&(Q.textContent=`${W.length} \u0627\u0633\u062A\u0644\u0627\u0645`);const te=document.getElementById("ppe-recent-tbody");if(te){const E=S=>{const _=this._normalizePpeStatus(S),j={received:["\u0645\u0633\u062A\u0644\u0645","#ecfdf5","#047857"],pending:["\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645","#fffbeb","#b45309"],other:["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","#f1f5f9","#475569"]},[Y,K,re]=j[_]||j.other;return`<span style="background:${K};color:${re};padding:2px 9px;border-radius:12px;font-size:0.72rem;font-weight:700;">${Y}</span>`};te.innerHTML=W.length===0?'<tr><td colspan="8" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629</td></tr>':W.map((S,_)=>{const j=this._getPpeReceiptDate(S),Y=j?j.toLocaleDateString("ar-EG",{year:"numeric",month:"short",day:"numeric"}):"\u2014",K=_%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${K};" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='${K}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;" dir="ltr">${Y}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S.employeeName||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;font-family:monospace;" dir="ltr">${Utils.escapeHTML(S.employeeCode||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S.equipmentType||S.type||"\u2014")}</td>
                        <td style="padding:9px 12px;text-align:center;color:#374151;font-weight:700;" dir="ltr">${parseFloat(S.quantity||0).toFixed(0)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S._deptDisplay||S.department||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(S._factoryDisplay||"\u2014")}</td>
                        <td style="padding:9px 12px;text-align:center;">${E(S.status)}</td>
                    </tr>`}).join("")}},_ppePopulateAnalyticsFilters(t,e){const s=(r,n)=>[...new Set(r.map(n).filter(Boolean))].sort(),i=(r,n)=>{const p=document.getElementById(r);if(!p)return;const l=p.value;p.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+n.map(o=>`<option value="${Utils.escapeHTML(String(o))}"${o===l?" selected":""}>${Utils.escapeHTML(String(o))}</option>`).join("")},a=document.getElementById("ppe-af-status");if(a){const r=a.value;a.innerHTML=`<option value="">\u0627\u0644\u0643\u0644</option>
                <option value="received"${r==="received"?" selected":""}>\u0645\u0633\u062A\u0644\u0645</option>
                <option value="pending"${r==="pending"?" selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645</option>`}i("ppe-af-type",s(t,r=>String(r.equipmentType||r.type||"").trim())),i("ppe-af-dept",s(t,r=>(r._deptDisplay||"").trim())),i("ppe-af-category",s(e,r=>String(r.category||"").trim())),i("ppe-af-supplier",s(e,r=>String(r.supplier||"").trim())),i("ppe-af-factory",s(t,r=>(r._factoryDisplay||"").trim())),i("ppe-af-location",s(t,r=>(r._locationDisplay||"").trim()))},_ppeApplyAnalyticsFilters(t,e){const s=m=>{const x=document.getElementById(m);return x?x.value.trim():""},i=s("ppe-af-type"),a=s("ppe-af-dept"),r=s("ppe-af-category"),n=s("ppe-af-status"),p=s("ppe-af-supplier"),l=s("ppe-af-factory"),o=s("ppe-af-location"),c=[i,a,r,n,p,l,o].some(m=>m!==""),h=document.getElementById("ppe-filter-badge");h&&(h.style.display=c?"inline":"none");const y=t.filter(m=>!(i&&String(m.equipmentType||m.type||"").trim()!==i||a&&(m._deptDisplay||"").trim()!==a||n&&this._normalizePpeStatus(m?.status)!==n||l&&(m._factoryDisplay||"").trim()!==l||o&&(m._locationDisplay||"").trim()!==o)),d=e.filter(m=>!(r&&String(m.category||"").trim()!==r||p&&String(m.supplier||"").trim()!==p));return{receipts:y,stock:d}},_ppeGroupBy(t,e,s=0){const i={};t.forEach(r=>{const n=e(r)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i[n]=(i[n]||0)+1});let a=Object.entries(i).sort((r,n)=>n[1]-r[1]);return s>0&&(a=a.slice(0,s)),{labels:a.map(r=>r[0]),data:a.map(r=>r[1])}},_ppeDoughnut(t,e,s,i){const a=document.getElementById(t),r=document.getElementById(t+"-empty");if(!a)return;if(!s.length||s.reduce((p,l)=>p+l,0)===0){a.style.display="none",r&&(r.style.display="flex");return}r&&(r.style.display="none"),a.style.display="";try{this._ppeAnalyticsCharts[t]&&this._ppeAnalyticsCharts[t].destroy()}catch{}const n=s.reduce((p,l)=>p+l,0);this._ppeAnalyticsCharts[t]=new Chart(a,{type:"doughnut",data:{labels:e,datasets:[{data:s,backgroundColor:i,borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:p=>` ${p.label}: ${p.parsed} (${n>0?(p.parsed/n*100).toFixed(1):0}%)`}}}}})},_ppeHBar(t,e,s,i){const a=document.getElementById(t),r=document.getElementById(t+"-empty");if(a){if(!s.length||s.reduce((n,p)=>n+p,0)===0){a.style.display="none",r&&(r.style.display="flex");return}r&&(r.style.display="none"),a.style.display="";try{this._ppeAnalyticsCharts[t]&&this._ppeAnalyticsCharts[t].destroy()}catch{}this._ppeAnalyticsCharts[t]=new Chart(a,{type:"bar",data:{labels:e,datasets:[{data:s,backgroundColor:i||"rgba(37, 99, 235, 0.78)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${n.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:n=>String(e[n]).length>18?String(e[n]).slice(0,17)+"\u2026":e[n]}}}}})}},_ppeTrend(t,e){const s=document.getElementById(t),i=document.getElementById(t+"-empty");if(!s)return;const a=new Date,r=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],n=[];for(let o=11;o>=0;o--){const c=new Date(a.getFullYear(),a.getMonth()-o,1);n.push({y:c.getFullYear(),m:c.getMonth(),label:`${r[c.getMonth()]} ${c.getFullYear()}`})}const p=n.map(o=>e.filter(c=>{const h=this._getPpeReceiptDate(c);return h&&h.getFullYear()===o.y&&h.getMonth()===o.m}).length);if(p.reduce((o,c)=>o+c,0)===0){s.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),s.style.display="";try{this._ppeAnalyticsCharts[t]&&this._ppeAnalyticsCharts[t].destroy()}catch{}const l=Math.max(...p);this._ppeAnalyticsCharts[t]=new Chart(s,{type:"bar",data:{labels:n.map(o=>o.label),datasets:[{label:"\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A",data:p,backgroundColor:p.map(o=>o===l?"rgba(37, 99, 235, 0.9)":"rgba(37, 99, 235, 0.5)"),borderRadius:5,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:p,type:"line",borderColor:"rgba(30,58,138,0.9)",backgroundColor:"rgba(30,58,138,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#1E3A8A",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_ppeYearly(t,e){const s=document.getElementById(t),i=document.getElementById(t+"-empty");if(!s)return;const a=new Date().getFullYear(),r=[a-2,a-1,a],n=r.map(l=>e.filter(o=>{const c=this._getPpeReceiptDate(o);return c&&c.getFullYear()===l}).length),p=r.map(l=>e.filter(o=>{const c=this._getPpeReceiptDate(o);return c&&c.getFullYear()===l}).reduce((o,c)=>o+(parseFloat(c.quantity)||0),0));if(n.reduce((l,o)=>l+o,0)===0){s.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),s.style.display="";try{this._ppeAnalyticsCharts[t]&&this._ppeAnalyticsCharts[t].destroy()}catch{}this._ppeAnalyticsCharts[t]=new Chart(s,{type:"bar",data:{labels:r.map(String),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645\u0627\u062A",data:n,backgroundColor:"rgba(37, 99, 235, 0.78)",borderRadius:5,borderSkipped:!1,yAxisID:"y"},{label:"\u0627\u0644\u0643\u0645\u064A\u0627\u062A",data:p,backgroundColor:"rgba(30,58,138,0.78)",borderRadius:5,borderSkipped:!1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:12}}},y:{beginAtZero:!0,position:"right",ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"},title:{display:!0,text:"\u0639\u062F\u062F",font:{size:10}}},y1:{beginAtZero:!0,position:"left",ticks:{precision:0,font:{size:11}},grid:{display:!1},title:{display:!0,text:"\u0643\u0645\u064A\u0629",font:{size:10}}}}}})},_ppePopulateFactoryCards(t,e){const s=document.getElementById("ppe-factories-cards");if(!s)return;if(e===0){s.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>';return}const i=this._ppeGroupBy(t,r=>(r._factoryDisplay||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),0),a=[{primary:"#2563EB",light:"#eff6ff",progress:"linear-gradient(90deg, #93c5fd 0%, #2563EB 100%)"},{primary:"#1D4ED8",light:"#EFF6FF",progress:"linear-gradient(90deg, #93C5FD 0%, #1D4ED8 100%)"},{primary:"#1E3A8A",light:"#eef2ff",progress:"linear-gradient(90deg, #93c5fd 0%, #1E3A8A 100%)"},{primary:"#f59e0b",light:"#fffbeb",progress:"linear-gradient(90deg, #fcd34d 0%, #f59e0b 100%)"},{primary:"#6366f1",light:"#eef2ff",progress:"linear-gradient(90deg, #a5b4fc 0%, #6366f1 100%)"}];s.innerHTML=i.labels.map((r,n)=>{const p=i.data[n],l=Math.round(p/e*100)||0,o=t.filter(y=>(y._factoryDisplay||"").trim()===r&&this._normalizePpeStatus(y.status)==="received").length,c=t.filter(y=>(y._factoryDisplay||"").trim()===r&&this._normalizePpeStatus(y.status)==="pending").length,h=a[n%a.length];return`
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all .2s;cursor:pointer;" 
                     onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';this.style.borderColor='${h.primary}'" 
                     onmouseout="this.style.transform='';this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)';this.style.borderColor='#e2e8f0'"
                     onclick="const el = document.getElementById('ppe-af-factory'); if(el){el.value='${Utils.escapeHTML(r)}'; el.dispatchEvent(new Event('change'));}">
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <div style="width:36px;height:36px;background:${h.light};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${h.primary};">
                                <i class="fas fa-industry" style="font-size:16px;"></i>
                            </div>
                            <span style="font-size:0.9rem;font-weight:800;color:#1e293b;">${Utils.escapeHTML(r)}</span>
                        </div>
                        <span style="font-size:1.15rem;font-weight:900;color:${h.primary};">${l}%</span>
                    </div>
                    
                    <div style="width:100%;height:8px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                        <div style="width:${l}%;height:100%;background:${h.progress};border-radius:9999px;"></div>
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
                            <div style="font-size:0.85rem;font-weight:800;color:#f59e0b;">${c}</div>
                        </div>
                    </div>
                </div>
            `}).join("")},_ppePopulateAnalyticsLists(t,e,s){const i=o=>Utils.escapeHTML(o),a=(o,c,h,y,d,m)=>o.labels.length?o.labels.map((x,k)=>{const f=o.data[k],u=c>0?Math.round(f/c*100):0,v=m?`onclick="const el = document.getElementById('${m}'); if(el){el.value=this.getAttribute('data-value'); el.dispatchEvent(new Event('change'));}"`:"";return`
                    <div style="display:flex;flex-direction:column;gap:5px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;cursor:pointer;transition:all .2s;" 
                         onmouseover="this.style.transform='translateX(-2px)';" onmouseout="this.style.transform='';"
                         data-value="${i(x)}"
                         ${v}>
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-size:0.78rem;font-weight:700;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${i(x)}">${i(x)}</span>
                            <span style="font-size:0.75rem;font-weight:700;color:${h};flex-shrink:0;">${f} (${u}%)</span>
                        </div>
                        <div style="width:100%;height:6px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                            <div style="width:${u}%;height:100%;background:linear-gradient(90deg, ${y} 0%, ${d} 100%);border-radius:9999px;"></div>
                        </div>
                    </div>
                `}).join(""):'<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>',r=document.getElementById("ppe-types-list");if(r){const o=this._ppeGroupBy(t,c=>String(c.equipmentType||c.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),10);r.innerHTML=a(o,s,"#2563EB","#93c5fd","#2563EB","ppe-af-type")}const n=document.getElementById("ppe-depts-list");if(n){const o=this._ppeGroupBy(t,c=>(c._deptDisplay||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),10);n.innerHTML=a(o,s,"#f59e0b","#fcd34d","#f59e0b","ppe-af-dept")}const p=document.getElementById("ppe-suppliers-list");if(p){const o=this._ppeGroupBy(e,h=>String(h.supplier||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),8),c=e.length;p.innerHTML=a(o,c,"#8b5cf6","#c4b5fd","#8b5cf6","ppe-af-supplier")}const l=document.getElementById("ppe-locs-list");if(l){const o=this._ppeGroupBy(t,c=>(c._locationDisplay||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),10);l.innerHTML=a(o,s,"#3b82f6","#93c5fd","#3b82f6","ppe-af-location")}},_ppeBindAnalyticsEvents(){const t=document.getElementById("ppe-analytics-root");if(!t||t.getAttribute("data-ppe-analytics-bound")==="1")return;t.setAttribute("data-ppe-analytics-bound","1"),t.querySelectorAll(".ppe-period-btn").forEach(n=>{n.addEventListener("click",()=>{this._ppeAnalyticsPeriod=n.getAttribute("data-period"),t.querySelectorAll(".ppe-period-btn").forEach(p=>{const l=p===n;p.style.background=l?"#fff":"rgba(255,255,255,0.15)",p.style.color=l?"#2563EB":"#fff"}),this.updatePpeAnalyticsDashboard()})});const e=document.getElementById("ppe-analytics-refresh");e&&e.addEventListener("click",()=>this.updatePpeAnalyticsDashboard());const s=document.getElementById("ppe-export-pdf-btn");s&&s.addEventListener("click",()=>this._ppeExportAnalyticsPDF());const i=document.getElementById("ppe-toggle-filters-btn"),a=document.getElementById("ppe-filter-panel");i&&a&&i.addEventListener("click",()=>{const n=a.style.display!=="none";a.style.display=n?"none":"block",i.style.background=n?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"}),["ppe-af-type","ppe-af-dept","ppe-af-category","ppe-af-status","ppe-af-supplier","ppe-af-factory","ppe-af-location"].forEach(n=>{const p=document.getElementById(n);p&&p.addEventListener("change",()=>this.updatePpeAnalyticsDashboard())});const r=document.getElementById("ppe-filter-reset-btn");r&&r.addEventListener("click",()=>{["ppe-af-type","ppe-af-dept","ppe-af-category","ppe-af-status","ppe-af-supplier","ppe-af-factory","ppe-af-location"].forEach(n=>{const p=document.getElementById(n);p&&(p.value="")}),this.updatePpeAnalyticsDashboard()})},async _ppeExportAnalyticsPDF(){try{const t=document.getElementById("ppe-analytics-root");if(!t){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}if((typeof html2canvas>"u"||typeof window.jspdf>"u")&&(Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u0635\u062F\u064A\u0631\u2026"),await Promise.all([new Promise(l=>{if(typeof html2canvas<"u")return l();const o=document.createElement("script");o.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",o.onload=l,o.onerror=l,document.head.appendChild(o)}),new Promise(l=>{if(typeof window.jspdf<"u")return l();const o=document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",o.onload=l,o.onerror=l,document.head.appendChild(o)})]),Loading.hide()),typeof html2canvas>"u"||typeof window.jspdf>"u"){Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631\u2026");const e=String(AppState?.companySettings?.name||"SafetyHub | ICAPP").trim(),s=String(AppState?.companySettings?.secondaryName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629").trim(),i=typeof Utils<"u"&&typeof Utils.formatDateTime=="function"?Utils.formatDateTime(new Date):new Date().toLocaleString("ar-EG"),a=document.createElement("div");a.id="ppe-pdf-header-temp",a.style.cssText="background:linear-gradient(135deg,#2563EB 0%,#1D4ED8 50%,#1E3A8A 100%);color:#fff;padding:18px 24px;border-radius:14px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;font-family:Arial,sans-serif;",a.innerHTML=`
                <div>
                    <div style="font-size:18px;font-weight:800;margin-bottom:4px;white-space:nowrap;word-break:keep-all;">${Utils.escapeHTML(e)}</div>
                    <div style="font-size:13px;opacity:0.95;">${Utils.escapeHTML(s)}</div>
                </div>
                <div style="text-align:end;">
                    <div style="font-size:16px;font-weight:700;margin-bottom:4px;">\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</div>
                    <div style="font-size:12px;opacity:0.95;" dir="ltr">${Utils.escapeHTML(i)}</div>
                </div>
            `,t.insertBefore(a,t.firstChild);const r=await html2canvas(t,{scale:Utils.PdfExport.getOptimalCaptureScale(t.scrollWidth,t.scrollHeight,Utils.PdfExport.DEFAULT_CAPTURE_SCALE),useCORS:!0,backgroundColor:"#ffffff",logging:!1});a.remove();const n=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});if(!n)throw new Error("jsPDF unavailable");Utils.PdfExport.appendCanvasAsPdfPages(n,r,{marginMm:0});const p=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);Utils.PdfExport.savePdf(n,`PPE-Analytics-${p}.pdf`),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(t.message||t));const e=document.getElementById("ppe-pdf-header-temp");e&&e.remove()}}};(function(){"use strict";try{typeof window<"u"&&typeof PPE<"u"&&(window.PPE=PPE,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 PPE module loaded and available on window.PPE"))}catch{if(typeof window<"u"&&typeof PPE<"u")try{window.PPE=PPE}catch{}}})();
