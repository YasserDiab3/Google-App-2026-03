class GateSecurityModule{constructor(){this.visitors=[],this.filteredVisitors=[],this.filterSite="all",this.filterStatus="all",this.searchQuery="",this.autoRefreshTimer=null,this.init()}init(){window.GateSecurity=this,document.addEventListener("DOMContentLoaded",()=>{this.checkAndApplyVisibility()})}checkAndApplyVisibility(){const e=this.isAdmin(),t=document.querySelector('a[data-section="gate-security"]');t&&(t.style.display=e?"flex":"none");const i=document.getElementById("gate-security-section");i&&!e&&(i.style.display="none")}isAdmin(){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"&&Permissions.isCurrentUserAdmin()||typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin())return!0;const e=AppState?.currentUser?.role;return e==="admin"||e==="hse_manager"||e==="general_manager"||e==="security_admin"}catch{return!1}}render(){const e=document.getElementById("gate-security-section");if(!e)return;if(!this.isAdmin()){e.innerHTML=`
                <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <i class="fas fa-lock text-rose-500" style="font-size: 3rem; margin-bottom: 12px; display:block;"></i>
                    <h3 style="font-size: 1.2rem; font-weight:800;">\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0645\u062E\u0635\u0635 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0623\u0645\u0646 \u0641\u0642\u0637</h3>
                </div>
            `;return}const t=this.getGatePortalUrl();e.innerHTML=`
            <div class="module-header" style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <h2 style="font-size: 1.4rem; font-weight: 900; color: var(--text-primary); display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-shield-halved text-blue-600"></i>
                            <span>\u0645\u0646\u0638\u0648\u0645\u0629 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0648\u0633\u062C\u0644 \u0627\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</span>
                            <span style="font-size: 0.72rem; background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 6px; font-weight: 800;">\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645</span>
                        </h2>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">
                            \u0625\u062F\u0627\u0631\u0629 \u0631\u0648\u0627\u0628\u0637 \u0623\u0641\u0631\u0627\u062F \u0627\u0644\u0623\u0645\u0646 \u0639\u0646\u062F \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A\u060C \u0631\u0635\u062F \u0627\u0644\u0645\u062A\u0648\u0627\u062C\u062F\u064A\u0646 \u062D\u0627\u0644\u064A\u0627\u064B\u060C \u0648\u0643\u0634\u0648\u0641 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 (ISO 45001).
                        </p>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button type="button" class="btn btn-outline-primary" onclick="GateSecurity.refreshData()" style="font-weight: 700;">
                            <i class="fas fa-rotate"></i> \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644
                        </button>
                        <button type="button" class="btn btn-primary" onclick="GateSecurity.printEmergencyMusterList()" style="font-weight: 700; background: #dc2626; border-color: #dc2626;">
                            <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0643\u0634\u0641 \u062D\u0635\u0631 \u0627\u0644\u0625\u062E\u0644\u0627\u0621
                        </button>
                    </div>
                </div>
            </div>

            <!-- \u0628\u0637\u0627\u0642\u0629 \u0631\u0627\u0628\u0637 \u062A\u0633\u062C\u064A\u0644 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0628\u0627\u0634\u0631 -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: #ffffff; border-radius: 14px; padding: 18px 22px; margin-bottom: 24px; box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.3);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                    <div style="max-width: 650px;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span style="background: #3b82f6; color: #fff; font-size: 0.72rem; font-weight: 900; padding: 2px 8px; border-radius: 20px;">\u0631\u0627\u0628\u0637 \u0645\u062E\u0635\u0635 \u0644\u0623\u0641\u0631\u0627\u062F \u0627\u0644\u0623\u0645\u0646</span>
                            <span style="font-size: 0.8rem; color: #bfdbfe; font-weight: 700;">\u0645\u0639\u0632\u0648\u0644 \u0648\u0645\u0633\u062A\u0642\u0644 \u062A\u0645\u0627\u0645\u0627\u064B</span>
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 900; margin-bottom: 4px;">\u0631\u0627\u0628\u0637 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0632\u0627\u0626\u0631\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 (Gate Security Portal)</h3>
                        <p style="color: #cbd5e1; font-size: 0.82rem; line-height: 1.4; margin-bottom: 0;">
                            \u0627\u0641\u062A\u062D \u0647\u0630\u0627 \u0627\u0644\u0631\u0627\u0628\u0637 \u0639\u0644\u0649 \u062C\u0647\u0627\u0632 \u062A\u0627\u0628\u0644\u062A / \u0647\u0627\u062A\u0641 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0623\u0645\u0646 \u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0627\u0644\u062E\u0631\u0648\u062C \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0631\u0642\u0645\u064A \u062F\u0648\u0646 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0628\u0627\u0642\u064A \u0627\u0644\u0646\u0638\u0627\u0645.
                        </p>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <a href="${t}" target="_blank" class="btn" style="background: #ffffff; color: #1e40af; font-weight: 800; font-size: 0.85rem; padding: 8px 16px; border-radius: 10px; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <i class="fas fa-external-link-alt"></i> \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0628\u0627\u0634\u0631
                        </a>
                        <button type="button" class="btn" onclick="GateSecurity.copyGateLink('${t}')" style="background: rgba(255,255,255,0.15); color: #ffffff; border: 1px solid rgba(255,255,255,0.3); font-weight: 700; font-size: 0.85rem; padding: 8px 14px; border-radius: 10px;">
                            <i class="fas fa-copy"></i> \u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637
                        </button>
                    </div>
                </div>
            </div>

            <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0629 (KPIs) -->
            <div class="grid-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px;">
                <div class="kpi-card" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; border-right: 4px solid #10b981;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">\u0627\u0644\u0645\u062A\u0648\u0627\u062C\u062F\u0648\u0646 \u062D\u0627\u0644\u064A\u0627\u064B \u0628\u0627\u0644\u0645\u0635\u0627\u0646\u0639</span>
                        <i class="fas fa-users text-emerald-500" style="font-size: 1.2rem;"></i>
                    </div>
                    <div id="kpiActiveVisitors" style="font-size: 1.8rem; font-weight: 900; color: #10b981; margin-top: 6px;">0</div>
                    <span style="font-size: 0.72rem; color: #059669; font-weight: 700;">\u{1F7E2} \u0628\u0627\u0644\u062F\u0627\u062E\u0644 \u0627\u0644\u0622\u0646 (Onsite)</span>
                </div>

                <div class="kpi-card" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; border-right: 4px solid #3b82f6;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">\u0625\u062C\u0645\u0627\u0644\u064A \u0632\u0648\u0627\u0631 \u0627\u0644\u064A\u0648\u0645</span>
                        <i class="fas fa-calendar-day text-blue-500" style="font-size: 1.2rem;"></i>
                    </div>
                    <div id="kpiTodayVisitors" style="font-size: 1.8rem; font-weight: 900; color: #3b82f6; margin-top: 6px;">0</div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700;">\u062D\u0631\u0643\u0627\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u0648\u062B\u0642\u0629</span>
                </div>

                <div class="kpi-card" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; border-right: 4px solid #f59e0b;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">\u062A\u0646\u0628\u064A\u0647 \u0645\u062F\u0629 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (+4 \u0633\u0627\u0639\u0627\u062A)</span>
                        <i class="fas fa-stopwatch text-amber-500" style="font-size: 1.2rem;"></i>
                    </div>
                    <div id="kpiOverstayVisitors" style="font-size: 1.8rem; font-weight: 900; color: #f59e0b; margin-top: 6px;">0</div>
                    <span style="font-size: 0.72rem; color: #d97706; font-weight: 700;">\u062A\u062D\u062A\u0627\u062C \u0645\u062A\u0627\u0628\u0639\u0629 \u0623\u0645\u0646\u064A\u0629</span>
                </div>

                <div class="kpi-card" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; border-right: 4px solid #6366f1;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">\u0625\u062C\u0645\u0627\u0644\u064A \u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0634\u0647\u0631</span>
                        <i class="fas fa-chart-line text-indigo-500" style="font-size: 1.2rem;"></i>
                    </div>
                    <div id="kpiMonthVisitors" style="font-size: 1.8rem; font-weight: 900; color: #6366f1; margin-top: 6px;">0</div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700;">\u0633\u062C\u0644 \u0634\u0647\u0631 ${new Date().toLocaleDateString("ar-EG",{month:"long"})}</span>
                </div>
            </div>

            <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0648\u0627\u0644\u0628\u062D\u062B -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 14px 18px; margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;">
                <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; flex: 1; min-width: 300px;">
                    <div style="position: relative; flex: 1; min-width: 200px;">
                        <i class="fas fa-search" style="position: absolute; right: 12px; top: 12px; color: var(--text-muted);"></i>
                        <input type="text" id="gateVisitorSearchInput" class="form-control" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0634\u0631\u0643\u0629\u060C \u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A\u060C \u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641..." style="padding-right: 34px; font-size: 0.85rem;" oninput="GateSecurity.handleSearch(this.value)">
                    </div>

                    <select id="gateFilterSite" class="form-select" style="width: auto; min-width: 150px; font-size: 0.85rem;" onchange="GateSecurity.handleFilterSite(this.value)">
                        <option value="all">\u{1F3E2} \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>
                        <option value="ICAPP-1">ICAPP-1</option>
                        <option value="ICAPP-2">ICAPP-2</option>
                        <option value="ICAPP-3">ICAPP-3</option>
                        <option value="ICAPP-4">ICAPP-4</option>
                        <option value="WH">\u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0639\u0627\u0645\u0629 (WH)</option>
                        <option value="\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A">\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A</option>
                        <option value="\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642</option>
                    </select>

                    <select id="gateFilterStatus" class="form-select" style="width: auto; min-width: 150px; font-size: 0.85rem;" onchange="GateSecurity.handleFilterStatus(this.value)">
                        <option value="all">\u26A1 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                        <option value="active" selected>\u{1F7E2} \u0628\u0627\u0644\u062F\u0627\u062E\u0644 \u062D\u0627\u0644\u064A\u0627\u064B (Onsite)</option>
                        <option value="exited">\u{1F6AA} \u062A\u0645 \u0627\u0644\u062E\u0631\u0648\u062C (Checked Out)</option>
                    </select>
                </div>

                <div style="display: flex; gap: 8px;">
                    <button type="button" class="btn btn-outline-secondary" onclick="GateSecurity.exportToExcel()" style="font-weight: 700; font-size: 0.82rem;">
                        <i class="fas fa-file-excel text-emerald-600"></i> \u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                </div>
            </div>

            <!-- \u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u0627\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="overflow-x: auto;">
                    <table class="table" style="width: 100%; margin-bottom: 0; font-size: 0.84rem; text-align: right;">
                        <thead style="background: var(--bg-card); color: var(--text-secondary); font-weight: 800; border-bottom: 2px solid var(--border-color);">
                            <tr>
                                <th style="padding: 12px 14px;">\u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A</th>
                                <th style="padding: 12px 14px;">\u0627\u0644\u0632\u0627\u0626\u0631 \u0648\u0627\u0644\u062C\u0647\u0629</th>
                                <th style="padding: 12px 14px;">\u0627\u0644\u0647\u0627\u062A\u0641 / \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A</th>
                                <th style="padding: 12px 14px;">\u0627\u0644\u0645\u0635\u0646\u0639 \u0648\u0627\u0644\u0635\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</th>
                                <th style="padding: 12px 14px;">\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641</th>
                                <th style="padding: 12px 14px;">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 / \u0627\u0644\u062E\u0631\u0648\u062C</th>
                                <th style="padding: 12px 14px;">\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0645\u0646\u0642\u0636\u064A\u0629</th>
                                <th style="padding: 12px 14px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th style="padding: 12px 14px; text-align: center;">\u0625\u062C\u0631\u0627\u0621</th>
                            </tr>
                        </thead>
                        <tbody id="gateVisitorsTableBody">
                            <tr>
                                <td colspan="9" style="text-align: center; padding: 30px; color: var(--text-muted);">
                                    <i class="fas fa-spinner fa-spin" style="margin-left: 6px;"></i> \u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `,this.loadVisitorsData(),this.startAutoRefresh()}getGatePortalUrl(){const e=window.location.origin||window.location.protocol+"//"+window.location.host,t=window.location.pathname;return t.includes("/Frontend/")?`${e}/Frontend/gate-visitor-entry.html`:t.includes("/dist/")?`${e}/dist/gate-visitor-entry.html`:`${e}/gate-visitor-entry.html`}copyGateLink(e){navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(e).then(()=>{typeof Utils<"u"&&Utils.showNotification?Utils.showNotification("\u062A\u0645 \u0646\u0633\u062E \u0631\u0627\u0628\u0637 \u062A\u0633\u062C\u064A\u0644 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D \u2705","success"):alert("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0628\u0646\u062C\u0627\u062D: "+e)}):prompt("\u0627\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A \u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0623\u0645\u0646 \u0639\u0646\u062F \u0627\u0644\u0628\u0648\u0627\u0628\u0629:",e)}async loadVisitorsData(){try{const e=localStorage.getItem("HSE_GATE_VISITORS_REGISTRY");if(this.visitors=e?JSON.parse(e):[],navigator.onLine&&typeof GoogleIntegration<"u")try{const i=await(await fetch(this.getEffectiveApiUrl()+"?action=getActiveGateVisitors",{method:"GET",mode:"cors"})).json();if(i&&i.success&&Array.isArray(i.activeVisitors)){const o=i.activeVisitors.map(r=>({...r,entryTimestamp:new Date(r.entryDate+" "+r.entryTime).getTime()||Date.now()})),s=new Map;this.visitors.forEach(r=>s.set(r.id,r)),o.forEach(r=>s.set(r.id,r)),this.visitors=Array.from(s.values()).sort((r,n)=>(n.entryTimestamp||0)-(r.entryTimestamp||0)),localStorage.setItem("HSE_GATE_VISITORS_REGISTRY",JSON.stringify(this.visitors))}}catch{}this.applyFilters(),this.updateKpis()}catch{}}getEffectiveApiUrl(){const e="https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec";try{const t=localStorage.getItem("HSE_SETTINGS_CACHE");if(t){const i=JSON.parse(t);if(i&&i.scriptUrl&&i.scriptUrl.includes("script.google.com"))return i.scriptUrl}}catch{}return e}updateKpis(){const e=new Date().toISOString().split("T")[0],t=e.slice(0,7),i=this.visitors.filter(a=>a.entryDate===e),o=this.visitors.filter(a=>!a.exitTime),s=this.visitors.filter(a=>a.entryDate&&a.entryDate.startsWith(t)),r=Date.now(),n=o.filter(a=>(r-(a.entryTimestamp||0))/6e4>=240).length,d=document.getElementById("kpiActiveVisitors");d&&(d.textContent=o.length);const l=document.getElementById("kpiTodayVisitors");l&&(l.textContent=i.length);const p=document.getElementById("kpiOverstayVisitors");p&&(p.textContent=n);const c=document.getElementById("kpiMonthVisitors");c&&(c.textContent=s.length)}applyFilters(){let e=[...this.visitors];if(this.filterSite!=="all"&&(e=e.filter(t=>t.site===this.filterSite)),this.filterStatus==="active"?e=e.filter(t=>!t.exitTime):this.filterStatus==="exited"&&(e=e.filter(t=>!!t.exitTime)),this.searchQuery){const t=this.searchQuery.toLowerCase();e=e.filter(i=>i.name&&i.name.toLowerCase().includes(t)||i.org&&i.org.toLowerCase().includes(t)||i.badge&&i.badge.toLowerCase().includes(t)||i.host&&i.host.toLowerCase().includes(t)||i.phone&&i.phone.includes(t)||i.vehicle&&i.vehicle.toLowerCase().includes(t))}this.filteredVisitors=e,this.renderTable()}renderTable(){const e=document.getElementById("gateVisitorsTableBody");if(!e)return;if(this.filteredVisitors.length===0){e.innerHTML=`
                <tr>
                    <td colspan="9" style="text-align: center; padding: 36px 12px; color: var(--text-muted);">
                        <i class="fas fa-folder-open" style="font-size: 2rem; color: #94a3b8; display:block; margin-bottom: 8px;"></i>
                        <span style="font-weight: 700;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0632\u0648\u0627\u0631 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062D\u0627\u0644\u064A\u0629</span>
                    </td>
                </tr>
            `;return}const t=Date.now();e.innerHTML=this.filteredVisitors.map(i=>{const o=!i.exitTime,s=Math.round((t-(i.entryTimestamp||t))/6e4),r=Math.floor(s/60),n=s%60,d=o&&s>=240,l=o?r>0?`${r}\u0633 ${n}\u062F`:`${n}\u062F`:i.durationMinutes?`${i.durationMinutes} \u062F\u0642\u064A\u0642\u0629`:"\u0645\u0643\u062A\u0645\u0644";return`
                <tr style="border-bottom: 1px solid var(--border-color); ${d?"background: rgba(254, 242, 242, 0.6);":""}">
                    <td style="padding: 10px 14px; font-weight: 900; color: #1e40af;">
                        <span style="background: #dbeafe; color: #1e40af; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem; border: 1px solid #bfdbfe;">
                            \u{1F3F7}\uFE0F ${i.badge||"\u0628\u062F\u0648\u0646"}
                        </span>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 800; color: var(--text-primary);">${i.name}</div>
                        <div style="font-size: 0.76rem; color: #2563eb; font-weight: 700;"><i class="fas fa-building"></i> ${i.org}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 700;"><a href="tel:${i.phone}" style="color: inherit; text-decoration: none;">${i.phone||"-"}</a></div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A: ${i.idNumber||"-"}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 800; color: var(--text-primary);">${i.site}</div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">${i.area}</div>
                    </td>
                    <td style="padding: 10px 14px; font-weight: 700; color: var(--text-secondary);">
                        <i class="fas fa-user-tie text-blue-500"></i> ${i.host}
                    </td>
                    <td style="padding: 10px 14px; font-size: 0.78rem;">
                        <div><strong style="color: #10b981;">\u062F\u062E\u0648\u0644:</strong> ${i.entryTime} (${i.entryDate})</div>
                        <div><strong style="color: #64748b;">\u062E\u0631\u0648\u062C:</strong> ${i.exitTime||"\u2014"}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <span style="font-weight: 800; font-size: 0.78rem; ${d?"color: #dc2626; font-weight: 900;":"color: var(--text-secondary);"}">
                            ${l}
                            ${d?'<span style="display:block; font-size: 0.68rem; color: #dc2626;">\u26A0\uFE0F \u062A\u0623\u062E\u064A\u0631 +4\u0633</span>':""}
                        </span>
                    </td>
                    <td style="padding: 10px 14px;">
                        ${o?`
                            <span style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 3px 8px; border-radius: 12px; font-weight: 800; font-size: 0.74rem; display: inline-flex; align-items: center; gap: 4px;">
                                <span style="width:6px; height:6px; border-radius:50%; background:#10b981;"></span> \u0628\u0627\u0644\u062F\u0627\u062E\u0644
                            </span>
                        `:`
                            <span style="background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; padding: 3px 8px; border-radius: 12px; font-weight: 700; font-size: 0.74rem;">
                                \u062A\u0645 \u0627\u0644\u062E\u0631\u0648\u062C
                            </span>
                        `}
                    </td>
                    <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
                        <button type="button" class="btn btn-sm" onclick="GateSecurity.printVisitorBadge('${i.id}')" style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-weight: 800; font-size: 0.75rem; border-radius: 6px; padding: 3px 8px; margin-left: 4px;" title="\u0637\u0628\u0627\u0639\u0629 \u0643\u0627\u0631\u062A \u0627\u0644\u0632\u0627\u0626\u0631">
                            <i class="fas fa-id-card"></i> \u0643\u0627\u0631\u062A
                        </button>
                        ${o?`
                            <button type="button" class="btn btn-sm" onclick="GateSecurity.adminForceCheckOut('${i.id}', '${i.badge}')" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; font-weight: 800; font-size: 0.75rem; border-radius: 6px; padding: 3px 8px;" title="\u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0625\u062F\u0627\u0631\u064A">
                                <i class="fas fa-door-open"></i> \u062E\u0631\u0648\u062C
                            </button>
                        `:""}
                    </td>
                </tr>
            `}).join("")}handleSearch(e){this.searchQuery=e.trim(),this.applyFilters()}handleFilterSite(e){this.filterSite=e,this.applyFilters()}handleFilterStatus(e){this.filterStatus=e,this.applyFilters()}async adminForceCheckOut(e,t){if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0647\u0630\u0627 \u0627\u0644\u0632\u0627\u0626\u0631 \u0625\u062F\u0627\u0631\u064A\u0627\u064B\u061F"))return;const i=this.visitors.findIndex(o=>o.id===e);if(i!==-1){const o=new Date,s=o.toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"});this.visitors[i].exitTime=s,this.visitors[i].exitTimestamp=o.getTime(),localStorage.setItem("HSE_GATE_VISITORS_REGISTRY",JSON.stringify(this.visitors)),this.applyFilters(),this.updateKpis();try{const r=this.getEffectiveApiUrl();await fetch(r,{method:"POST",mode:"cors",redirect:"follow",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action:"submitGateVisitorCheckOut",id:e,exitTime:s,badge:t})})}catch{}typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0627\u0644\u0632\u0627\u0626\u0631 \u0628\u0646\u062C\u0627\u062D \u2705","success")}}refreshData(){this.loadVisitorsData(),typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D \u{1F504}","info")}startAutoRefresh(){this.autoRefreshTimer&&clearInterval(this.autoRefreshTimer),this.autoRefreshTimer=setInterval(()=>{this.loadVisitorsData()},3e4)}printEmergencyMusterList(){const e=this.visitors.filter(o=>!o.exitTime),t=window.open("","_blank"),i=new Date;t.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0643\u0634\u0641 \u062D\u0635\u0631 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0644\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 - ICAPP</title>
                <style>
                    @page {
                        size: A4 portrait;
                        margin: 10mm 10mm 12mm 10mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
                        padding: 10px;
                        direction: rtl;
                        color: #0f172a;
                        background: #ffffff;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    /* \u062A\u0631\u0648\u064A\u0633\u0629 ISO \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 */
                    .iso-print-header {
                        display: grid;
                        grid-template-columns: 160px 1fr 200px;
                        border: 2px solid #0f172a;
                        border-top: 5px solid #1e3a8a;
                        border-radius: 8px;
                        margin-bottom: 16px;
                        overflow: hidden;
                        background: #ffffff;
                    }
                    .iso-box-brand {
                        padding: 8px 10px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-left: 1.5px solid #0f172a;
                        background: #f8fafc;
                        gap: 4px;
                    }
                    .iso-print-logo {
                        max-height: 44px;
                        max-width: 100px;
                        object-fit: contain;
                    }
                    .iso-dept-title {
                        font-size: 11px;
                        font-weight: 800;
                        color: #1e3a8a;
                        text-align: center;
                        line-height: 1.2;
                    }
                    .iso-box-title {
                        padding: 8px 12px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                    }
                    .iso-main-title {
                        margin: 0;
                        font-size: 15px;
                        font-weight: 900;
                        color: #b91c1c;
                        line-height: 1.25;
                    }
                    .iso-sub-title {
                        font-size: 10px;
                        font-weight: 700;
                        color: #475569;
                        margin-top: 3px;
                    }
                    .iso-box-meta {
                        padding: 6px 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        border-right: 1.5px solid #0f172a;
                        background: #f8fafc;
                        font-size: 10.5px;
                        gap: 3px;
                    }
                    .meta-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px dashed #cbd5e1;
                        padding-bottom: 2px;
                    }
                    .meta-row:last-child { border-bottom: none; }
                    .meta-row span { color: #64748b; font-size: 10px; font-weight: 700; }
                    .meta-row strong { color: #0f172a; font-size: 10px; }

                    table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 11.5px; }
                    th, td { border: 1.5px solid #334155; padding: 6px 8px; text-align: right; }
                    th { background: #f1f5f9; font-weight: 800; color: #0f172a; font-size: 11px; }

                    /* \u0641\u0648\u062A\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 */
                    .iso-print-footer {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 12px;
                        margin-top: 28px;
                        page-break-inside: avoid;
                    }
                    .footer-box {
                        border: 1.5px solid #334155;
                        border-radius: 6px;
                        padding: 8px 10px;
                        background: #f8fafc;
                    }
                    .footer-box-title {
                        font-size: 11px;
                        font-weight: 800;
                        color: #1e3a8a;
                        text-align: center;
                        border-bottom: 1px solid #cbd5e1;
                        padding-bottom: 5px;
                        margin-bottom: 8px;
                    }
                    .footer-sig-line {
                        font-size: 10.5px;
                        color: #334155;
                        margin-top: 6px;
                        font-weight: 600;
                    }
                    .print-btn-wrap { text-align: center; margin-top: 25px; }
                    @media print {
                        .print-btn-wrap { display: none !important; }
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                <!-- \u062A\u0631\u0648\u064A\u0633\u0629 ISO \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 -->
                <div class="iso-print-header">
                    <div class="iso-box-brand">
                        <img src="icons/icapp-logo.png" alt="ICAPP" class="iso-print-logo" onerror="this.src='icons/icapp-logo.png'">
                        <div class="iso-dept-title">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                    </div>

                    <div class="iso-box-title">
                        <h1 class="iso-main-title">\u{1F6A8} \u0643\u0634\u0641 \u062D\u0635\u0631 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u0641\u0648\u0631\u064A \u0644\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h1>
                        <div class="iso-sub-title">Emergency Visitor & Contractor Evacuation Headcount Sheet</div>
                    </div>

                    <div class="iso-box-meta">
                        <div class="meta-row">
                            <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629:</span>
                            <strong>DOC-HSE-EMR-VIS-01</strong>
                        </div>
                        <div class="meta-row">
                            <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</span>
                            <strong>Rev. 02</strong>
                        </div>
                        <div class="meta-row">
                            <span>\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0637\u0628\u0627\u0639\u0629:</span>
                            <strong>${i.toLocaleDateString("ar-EG")} ${i.toLocaleTimeString("ar-EG")}</strong>
                        </div>
                        <div class="meta-row">
                            <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062A\u0648\u0627\u062C\u062F\u064A\u0646:</span>
                            <strong style="color: #b91c1c; font-size: 11px;">${e.length} \u0641\u0631\u062F</strong>
                        </div>
                    </div>
                </div>

                ${e.length===0?`
                    <div style="text-align: center; padding: 30px 20px; border: 2px dashed #059669; border-radius: 8px; margin: 20px 0; background: #f0fdf4;">
                        <h3 style="color: #059669; margin: 0 0 6px; font-size: 15px;">\u2705 \u0625\u0641\u0627\u062F\u0629 \u062E\u0644\u0648 \u0627\u0644\u0645\u0646\u0634\u0623\u0629 \u0645\u0646 \u0623\u064A \u0632\u0648\u0627\u0631 \u0623\u0648 \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062E\u0627\u0631\u062C\u064A\u064A\u0646</h3>
                        <p style="color: #166534; margin: 0; font-size: 12px; font-weight: 600;">\u062A\u0645 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0644\u062D\u0638\u064A \u0644\u0633\u062C\u0644 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0648\u062A\u0623\u0643\u064A\u062F \u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0623\u064A \u0632\u0627\u0626\u0631 \u0623\u0648 \u0645\u0642\u0627\u0648\u0644 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0628\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0623\u0639\u0644\u0627\u0647.</p>
                    </div>
                `:`
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 25px; text-align: center;">#</th>
                                <th style="width: 70px;">\u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A</th>
                                <th>\u0627\u0633\u0645 \u0627\u0644\u0632\u0627\u0626\u0631 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                                <th>\u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0634\u0631\u0643\u0629</th>
                                <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                                <th>\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641</th>
                                <th style="width: 70px;">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th>
                                <th style="width: 140px; text-align: center;">\u0627\u0644\u062A\u062D\u0642\u0642 \u0639\u0646\u062F \u0646\u0642\u0637\u0629 \u0627\u0644\u062A\u062C\u0645\u0639 (Muster Point)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${e.map((o,s)=>`
                                <tr>
                                    <td style="text-align: center;">${s+1}</td>
                                    <td><strong>${o.badge||"-"}</strong></td>
                                    <td><strong>${o.name}</strong></td>
                                    <td>${o.org}</td>
                                    <td>${o.site}</td>
                                    <td>${o.area}</td>
                                    <td>${o.host}</td>
                                    <td>${o.entryTime}</td>
                                    <td style="text-align: center; font-size: 11px;">[ &nbsp; ] \u0622\u0645\u0646 / \u0633\u0644\u064A\u0645 &nbsp;&nbsp; [ &nbsp; ] \u0645\u0641\u0642\u0648\u062F</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                `}

                <!-- \u0641\u0648\u062A\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 -->
                <div class="iso-print-footer">
                    <div class="footer-box">
                        <div class="footer-box-title">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        <div class="footer-sig-line">\u0627\u0644\u0627\u0633\u0645: .......................................</div>
                        <div class="footer-sig-line">\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ....................................</div>
                    </div>
                    <div class="footer-box">
                        <div class="footer-box-title">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0648\u0646\u0642\u0637\u0629 \u0627\u0644\u062A\u062C\u0645\u0639</div>
                        <div class="footer-sig-line">\u0627\u0644\u0627\u0633\u0645: .......................................</div>
                        <div class="footer-sig-line">\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ....................................</div>
                    </div>
                    <div class="footer-box">
                        <div class="footer-box-title">\u0642\u0627\u0626\u062F \u0641\u0631\u064A\u0642 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 (Incident Commander)</div>
                        <div class="footer-sig-line">\u0627\u0644\u0627\u0633\u0645: .......................................</div>
                        <div class="footer-sig-line">\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ....................................</div>
                    </div>
                </div>

                <div class="print-btn-wrap">
                    <button onclick="window.print()" style="padding: 10px 24px; background: #1e40af; color: #fff; border:none; border-radius:8px; cursor:pointer; font-weight: 800; font-size: 13px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0643\u0634\u0641 \u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u0622\u0646</button>
                </div>
            </body>
            </html>
        `),t.document.close()}printVisitorBadge(e){const t=this.visitors.find(r=>r.id===e);if(!t){alert("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u0632\u0627\u0626\u0631");return}const i=window.open("","_blank");if(!i){alert("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0643\u0627\u0631\u062A \u0627\u0644\u0632\u0627\u0626\u0631 (Pop-ups)");return}const o=`ICAPP-VISITOR-PASS | Badge: ${t.badge} | Name: ${t.name} | Org: ${t.org} | Site: ${t.site} - ${t.area} | Date: ${t.entryDate} ${t.entryTime}`,s=`https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&margin=0&data=${encodeURIComponent(o)}`;i.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0643\u0627\u0631\u062A \u0648\u062A\u0635\u0631\u064A\u062D \u062F\u062E\u0648\u0644 \u0632\u0627\u0626\u0631 - ${t.badge} - ${t.name} - ICAPP</title>
                <style>
                    @page {
                        size: A4 portrait;
                        margin: 10mm 10mm 10mm 10mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
                        margin: 0;
                        padding: 15px;
                        direction: rtl;
                        color: #0f172a;
                        background: #f1f5f9;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .page-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 90vh;
                    }
                    /* \u0643\u0627\u0631\u062A \u0627\u0644\u0632\u0627\u0626\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F */
                    .visitor-badge-card {
                        width: 105mm;
                        min-height: 155mm;
                        background: #ffffff;
                        border: 2.5px solid #0f172a;
                        border-radius: 14px;
                        overflow: hidden;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                        display: flex;
                        flex-direction: column;
                        position: relative;
                    }
                    .lanyard-slot {
                        width: 16mm;
                        height: 3.5mm;
                        background: #e2e8f0;
                        border: 1.5px dashed #64748b;
                        border-radius: 4px;
                        margin: 4px auto 0;
                    }
                    .badge-header {
                        background: #1e3a8a;
                        color: #ffffff;
                        padding: 8px 12px;
                        text-align: center;
                        border-bottom: 3.5px solid #059669;
                    }
                    .badge-logo-row {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 4px;
                    }
                    .badge-logo {
                        max-height: 32px;
                        max-width: 80px;
                        object-fit: contain;
                        background: #ffffff;
                        padding: 2px 6px;
                        border-radius: 4px;
                    }
                    .badge-dept {
                        font-size: 9.5px;
                        font-weight: 800;
                        color: #93c5fd;
                        text-align: left;
                    }
                    .badge-main-type {
                        font-size: 13.5px;
                        font-weight: 900;
                        margin: 0;
                        letter-spacing: 0.2px;
                    }
                    .badge-sub-type {
                        font-size: 8.5px;
                        color: #cbd5e1;
                        font-weight: 700;
                    }
                    .badge-code-banner {
                        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                        color: #ffffff;
                        padding: 8px 12px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .badge-code-label {
                        font-size: 10px;
                        color: #94a3b8;
                        font-weight: 700;
                    }
                    .badge-code-val {
                        font-size: 19px;
                        font-weight: 900;
                        color: #34d399;
                        letter-spacing: 1px;
                        font-family: 'Courier New', monospace;
                    }
                    .badge-body {
                        padding: 10px 12px;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        gap: 6px;
                    }
                    .visitor-hero-box {
                        background: #f8fafc;
                        border: 1.5px solid #cbd5e1;
                        border-radius: 8px;
                        padding: 8px 10px;
                        text-align: center;
                    }
                    .visitor-hero-name {
                        font-size: 15px;
                        font-weight: 900;
                        color: #0f172a;
                        margin-bottom: 2px;
                    }
                    .visitor-hero-org {
                        font-size: 11px;
                        font-weight: 800;
                        color: #2563eb;
                    }
                    .badge-fields-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 5px;
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        border-radius: 6px;
                        padding: 6px 8px;
                        font-size: 9.5px;
                    }
                    .b-field {
                        display: flex;
                        flex-direction: column;
                    }
                    .b-field-full {
                        grid-column: span 2;
                    }
                    .b-key {
                        color: #64748b;
                        font-size: 8.5px;
                        font-weight: 700;
                    }
                    .b-val {
                        color: #0f172a;
                        font-weight: 800;
                    }
                    .badge-qr-row {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-top: 4px;
                        background: #ffffff;
                        border: 1px solid #cbd5e1;
                        border-radius: 6px;
                        padding: 6px;
                    }
                    .badge-qr-img {
                        width: 65px;
                        height: 65px;
                        border: 1px solid #94a3b8;
                        border-radius: 4px;
                        flex-shrink: 0;
                    }
                    .badge-rules {
                        font-size: 8px;
                        color: #334155;
                        line-height: 1.35;
                        font-weight: 600;
                    }
                    .badge-footer {
                        background: #f1f5f9;
                        border-top: 1.5px solid #cbd5e1;
                        padding: 6px 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 8.5px;
                        color: #475569;
                        font-weight: 700;
                    }
                    .badge-sig-text {
                        color: #0f172a;
                        font-weight: 800;
                    }
                    .print-btn-wrap {
                        margin-top: 16px;
                        text-align: center;
                    }
                    @media print {
                        body {
                            background: #ffffff;
                            padding: 0;
                        }
                        .page-container {
                            min-height: 0;
                        }
                        .print-btn-wrap {
                            display: none !important;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="page-container">
                    <div class="visitor-badge-card">
                        <div class="lanyard-slot"></div>
                        <div class="badge-header">
                            <div class="badge-logo-row">
                                <img src="icons/icapp-logo.png" alt="ICAPP" class="badge-logo" onerror="this.src='icons/icapp-logo.png'">
                                <div class="badge-dept">
                                    \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629<br>
                                    \u0645\u0646\u0638\u0648\u0645\u0629 \u0623\u0645\u0646 \u0648\u062D\u0631\u0627\u0633\u0629 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A
                                </div>
                            </div>
                            <div class="badge-main-type">\u{1FAAA} \u062A\u0635\u0631\u064A\u062D \u0648\u0634\u0627\u0631\u0629 \u062F\u062E\u0648\u0644 \u0632\u0627\u0626\u0631 / \u0645\u0642\u0627\u0648\u0644</div>
                            <div class="badge-sub-type">OFFICIAL VISITOR / CONTRACTOR PASS</div>
                        </div>

                        <div class="badge-code-banner">
                            <div class="badge-code-label">\u0631\u0642\u0645 \u0643\u0627\u0631\u062A / \u0634\u0627\u0631\u0629 \u0627\u0644\u0632\u0627\u0626\u0631:</div>
                            <div class="badge-code-val">\u{1F3F7}\uFE0F ${t.badge}</div>
                        </div>

                        <div class="badge-body">
                            <div class="visitor-hero-box">
                                <div class="visitor-hero-name">\u{1F464} ${t.name}</div>
                                <div class="visitor-hero-org">\u{1F3E2} ${t.org}</div>
                            </div>

                            <div class="badge-fields-grid">
                                <div class="b-field">
                                    <span class="b-key">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A / \u0627\u0644\u062C\u0648\u0627\u0632:</span>
                                    <span class="b-val">${t.idNumber||"-"}</span>
                                </div>
                                <div class="b-field">
                                    <span class="b-key">\u0627\u0644\u0647\u0627\u062A\u0641:</span>
                                    <span class="b-val">${t.phone||"-"}</span>
                                </div>
                                <div class="b-field-full">
                                    <span class="b-key">\u0627\u0644\u0645\u0635\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0635\u0631\u062D \u0628\u0647:</span>
                                    <span class="b-val" style="color: #1e40af;">\u{1F4CD} ${t.site} \u2014 ${t.area}</span>
                                </div>
                                <div class="b-field">
                                    <span class="b-key">\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641:</span>
                                    <span class="b-val">${t.host||"-"}</span>
                                </div>
                                <div class="b-field">
                                    <span class="b-key">\u0648\u0642\u062A \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062F\u062E\u0648\u0644:</span>
                                    <span class="b-val">\u23F1\uFE0F ${t.entryDate} | ${t.entryTime}</span>
                                </div>
                                <div class="b-field-full">
                                    <span class="b-key">\u0646\u0648\u0639 \u0648\u063A\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:</span>
                                    <span class="b-val">${t.purpose||"-"}</span>
                                </div>
                                ${t.vehicle?`
                                    <div class="b-field-full" style="background: #eff6ff; padding: 2px 4px; border-radius: 4px; border: 1px dashed #93c5fd;">
                                        <span class="b-key">\u{1F697} \u0645\u0631\u0643\u0628\u0629 \u0645\u0635\u0631\u062D\u0629 (\u0631\u0642\u0645 \u0627\u0644\u0644\u0648\u062D\u0629):</span>
                                        <span class="b-val" style="color: #1d4ed8; font-weight: 900;">${t.vehicle}</span>
                                    </div>
                                `:""}
                            </div>

                            <div class="badge-qr-row">
                                <img src="${s}" alt="Pass QR" class="badge-qr-img" onerror="this.src='https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${encodeURIComponent(o)}';">
                                <div class="badge-rules">
                                    \u26A0\uFE0F <strong>\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0623\u0645\u0646\u064A\u0629 \u0648\u0625\u0644\u0632\u0627\u0645\u064A\u0629:</strong><br>
                                    \u2022 \u062D\u0645\u0644 \u0647\u0630\u0627 \u0627\u0644\u0643\u0627\u0631\u062A \u0628\u0635\u0641\u0629 \u0638\u0627\u0647\u0631\u0629 \u0637\u0648\u0627\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629.<br>
                                    \u2022 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0631\u062A\u062F\u0627\u0621 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 (PPE).<br>
                                    \u2022 \u064A\u064F\u0645\u0646\u0639 \u0627\u0644\u062A\u062D\u0631\u0643 \u0627\u0644\u0641\u0631\u062F\u064A \u0628\u062F\u0648\u0646 \u0645\u0631\u0627\u0641\u0642 \u0631\u0633\u0645\u064A.<br>
                                    \u2022 \u064A\u064F\u0633\u0644\u0651\u0645 \u0647\u0630\u0627 \u0627\u0644\u0643\u0627\u0631\u062A \u0644\u0644\u0628\u0648\u0627\u0628\u0629 \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C.
                                </div>
                            </div>
                        </div>

                        <div class="badge-footer">
                            <div>\u0643\u0648\u062F: <strong>DOC-SEC-VIS-PASS-01</strong></div>
                            <div class="badge-sig-text">\u0627\u0639\u062A\u0645\u0627\u062F \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0629: ....................</div>
                        </div>
                    </div>

                    <div class="print-btn-wrap">
                        <button onclick="window.print()" style="padding: 10px 24px; background: #1e40af; color: #fff; border:none; border-radius:8px; cursor:pointer; font-weight: 800; font-size: 13px; box-shadow: 0 4px 12px rgba(30,64,175,0.25);">\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0643\u0627\u0631\u062A \u0627\u0644\u0632\u0627\u0626\u0631 \u0627\u0644\u0622\u0646</button>
                    </div>
                </div>
            </body>
            </html>
        `),i.document.close()}exportToExcel(){if(this.filteredVisitors.length===0){alert("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}let e=`\uFEFF\u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A,\u0627\u0633\u0645 \u0627\u0644\u0632\u0627\u0626\u0631,\u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0634\u0631\u0643\u0629,\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641,\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A,\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641,\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641,\u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641,\u063A\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629,\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062F\u062E\u0648\u0644,\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644,\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C,\u0627\u0644\u062D\u0627\u0644\u0629
`;this.filteredVisitors.forEach(s=>{e+=`"${s.badge||""}","${s.name||""}","${s.org||""}","${s.phone||""}","${s.idNumber||""}","${s.site||""}","${s.area||""}","${s.host||""}","${s.purpose||""}","${s.entryDate||""}","${s.entryTime||""}","${s.exitTime||""}","${s.exitTime?"\u062A\u0645 \u0627\u0644\u062E\u0631\u0648\u062C":"\u0628\u0627\u0644\u062F\u0627\u062E\u0644"}"
`});const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(t),o=document.createElement("a");o.href=i,o.download=`Gate_Visitors_Log_${new Date().toISOString().slice(0,10)}.csv`,o.click(),URL.revokeObjectURL(i)}}new GateSecurityModule;
