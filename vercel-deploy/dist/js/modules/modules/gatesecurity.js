class GateSecurityModule{constructor(){this.visitors=[],this.filteredVisitors=[],this.filterSite="all",this.filterStatus="all",this.searchQuery="",this.autoRefreshTimer=null,this.init()}init(){window.GateSecurity=this,document.addEventListener("DOMContentLoaded",()=>{this.checkAndApplyVisibility()})}checkAndApplyVisibility(){const t=this.isAdmin(),i=document.querySelector('a[data-section="gate-security"]');i&&(i.style.display=t?"flex":"none");const e=document.getElementById("gate-security-section");e&&!t&&(e.style.display="none")}isAdmin(){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"&&Permissions.isCurrentUserAdmin()||typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin())return!0;const t=AppState?.currentUser?.role;return t==="admin"||t==="hse_manager"||t==="general_manager"||t==="security_admin"}catch{return!1}}render(){const t=document.getElementById("gate-security-section");if(!t)return;if(!this.isAdmin()){t.innerHTML=`
                <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <i class="fas fa-lock text-rose-500" style="font-size: 3rem; margin-bottom: 12px; display:block;"></i>
                    <h3 style="font-size: 1.2rem; font-weight:800;">\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0645\u062E\u0635\u0635 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0623\u0645\u0646 \u0641\u0642\u0637</h3>
                </div>
            `;return}const i=this.getGatePortalUrl();t.innerHTML=`
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
                        <a href="${i}" target="_blank" class="btn" style="background: #ffffff; color: #1e40af; font-weight: 800; font-size: 0.85rem; padding: 8px 16px; border-radius: 10px; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <i class="fas fa-external-link-alt"></i> \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0628\u0627\u0634\u0631
                        </a>
                        <button type="button" class="btn" onclick="GateSecurity.copyGateLink('${i}')" style="background: rgba(255,255,255,0.15); color: #ffffff; border: 1px solid rgba(255,255,255,0.3); font-weight: 700; font-size: 0.85rem; padding: 8px 14px; border-radius: 10px;">
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
        `,this.loadVisitorsData(),this.startAutoRefresh()}getGatePortalUrl(){const t=window.location.origin||window.location.protocol+"//"+window.location.host,i=window.location.pathname;return i.includes("/Frontend/")?`${t}/Frontend/gate-visitor-entry.html`:i.includes("/dist/")?`${t}/dist/gate-visitor-entry.html`:`${t}/gate-visitor-entry.html`}copyGateLink(t){navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t).then(()=>{typeof Utils<"u"&&Utils.showNotification?Utils.showNotification("\u062A\u0645 \u0646\u0633\u062E \u0631\u0627\u0628\u0637 \u062A\u0633\u062C\u064A\u0644 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D \u2705","success"):alert("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0628\u0646\u062C\u0627\u062D: "+t)}):prompt("\u0627\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A \u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0623\u0645\u0646 \u0639\u0646\u062F \u0627\u0644\u0628\u0648\u0627\u0628\u0629:",t)}async loadVisitorsData(){try{const t=localStorage.getItem("HSE_GATE_VISITORS_REGISTRY");if(this.visitors=t?JSON.parse(t):[],navigator.onLine&&typeof GoogleIntegration<"u")try{const e=await(await fetch(this.getEffectiveApiUrl()+"?action=getActiveGateVisitors",{method:"GET",mode:"cors"})).json();if(e&&e.success&&Array.isArray(e.activeVisitors)){const o=e.activeVisitors.map(r=>({...r,entryTimestamp:new Date(r.entryDate+" "+r.entryTime).getTime()||Date.now()})),s=new Map;this.visitors.forEach(r=>s.set(r.id,r)),o.forEach(r=>s.set(r.id,r)),this.visitors=Array.from(s.values()).sort((r,a)=>(a.entryTimestamp||0)-(r.entryTimestamp||0)),localStorage.setItem("HSE_GATE_VISITORS_REGISTRY",JSON.stringify(this.visitors))}}catch{}this.applyFilters(),this.updateKpis()}catch{}}getEffectiveApiUrl(){const t="https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec";try{const i=localStorage.getItem("HSE_SETTINGS_CACHE");if(i){const e=JSON.parse(i);if(e&&e.scriptUrl&&e.scriptUrl.includes("script.google.com"))return e.scriptUrl}}catch{}return t}updateKpis(){const t=new Date().toISOString().split("T")[0],i=t.slice(0,7),e=this.visitors.filter(n=>n.entryDate===t),o=this.visitors.filter(n=>!n.exitTime),s=this.visitors.filter(n=>n.entryDate&&n.entryDate.startsWith(i)),r=Date.now(),a=o.filter(n=>(r-(n.entryTimestamp||0))/6e4>=240).length,d=document.getElementById("kpiActiveVisitors");d&&(d.textContent=o.length);const l=document.getElementById("kpiTodayVisitors");l&&(l.textContent=e.length);const p=document.getElementById("kpiOverstayVisitors");p&&(p.textContent=a);const c=document.getElementById("kpiMonthVisitors");c&&(c.textContent=s.length)}applyFilters(){let t=[...this.visitors];if(this.filterSite!=="all"&&(t=t.filter(i=>i.site===this.filterSite)),this.filterStatus==="active"?t=t.filter(i=>!i.exitTime):this.filterStatus==="exited"&&(t=t.filter(i=>!!i.exitTime)),this.searchQuery){const i=this.searchQuery.toLowerCase();t=t.filter(e=>e.name&&e.name.toLowerCase().includes(i)||e.org&&e.org.toLowerCase().includes(i)||e.badge&&e.badge.toLowerCase().includes(i)||e.host&&e.host.toLowerCase().includes(i)||e.phone&&e.phone.includes(i)||e.vehicle&&e.vehicle.toLowerCase().includes(i))}this.filteredVisitors=t,this.renderTable()}renderTable(){const t=document.getElementById("gateVisitorsTableBody");if(!t)return;if(this.filteredVisitors.length===0){t.innerHTML=`
                <tr>
                    <td colspan="9" style="text-align: center; padding: 36px 12px; color: var(--text-muted);">
                        <i class="fas fa-folder-open" style="font-size: 2rem; color: #94a3b8; display:block; margin-bottom: 8px;"></i>
                        <span style="font-weight: 700;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0632\u0648\u0627\u0631 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062D\u0627\u0644\u064A\u0629</span>
                    </td>
                </tr>
            `;return}const i=Date.now();t.innerHTML=this.filteredVisitors.map(e=>{const o=!e.exitTime,s=Math.round((i-(e.entryTimestamp||i))/6e4),r=Math.floor(s/60),a=s%60,d=o&&s>=240,l=o?r>0?`${r}\u0633 ${a}\u062F`:`${a}\u062F`:e.durationMinutes?`${e.durationMinutes} \u062F\u0642\u064A\u0642\u0629`:"\u0645\u0643\u062A\u0645\u0644";return`
                <tr style="border-bottom: 1px solid var(--border-color); ${d?"background: rgba(254, 242, 242, 0.6);":""}">
                    <td style="padding: 10px 14px; font-weight: 900; color: #1e40af;">
                        <span style="background: #dbeafe; color: #1e40af; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem; border: 1px solid #bfdbfe;">
                            \u{1F3F7}\uFE0F ${e.badge||"\u0628\u062F\u0648\u0646"}
                        </span>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 800; color: var(--text-primary);">${e.name}</div>
                        <div style="font-size: 0.76rem; color: #2563eb; font-weight: 700;"><i class="fas fa-building"></i> ${e.org}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 700;"><a href="tel:${e.phone}" style="color: inherit; text-decoration: none;">${e.phone||"-"}</a></div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A: ${e.idNumber||"-"}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 800; color: var(--text-primary);">${e.site}</div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">${e.area}</div>
                    </td>
                    <td style="padding: 10px 14px; font-weight: 700; color: var(--text-secondary);">
                        <i class="fas fa-user-tie text-blue-500"></i> ${e.host}
                    </td>
                    <td style="padding: 10px 14px; font-size: 0.78rem;">
                        <div><strong style="color: #10b981;">\u062F\u062E\u0648\u0644:</strong> ${e.entryTime} (${e.entryDate})</div>
                        <div><strong style="color: #64748b;">\u062E\u0631\u0648\u062C:</strong> ${e.exitTime||"\u2014"}</div>
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
                    <td style="padding: 10px 14px; text-align: center;">
                        ${o?`
                            <button type="button" class="btn btn-sm" onclick="GateSecurity.adminForceCheckOut('${e.id}', '${e.badge}')" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; font-weight: 800; font-size: 0.75rem; border-radius: 6px; padding: 3px 8px;" title="\u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0625\u062F\u0627\u0631\u064A">
                                <i class="fas fa-door-open"></i> \u062E\u0631\u0648\u062C
                            </button>
                        `:`
                            <span style="color: #94a3b8; font-size: 0.75rem;">\u2014</span>
                        `}
                    </td>
                </tr>
            `}).join("")}handleSearch(t){this.searchQuery=t.trim(),this.applyFilters()}handleFilterSite(t){this.filterSite=t,this.applyFilters()}handleFilterStatus(t){this.filterStatus=t,this.applyFilters()}async adminForceCheckOut(t,i){if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0647\u0630\u0627 \u0627\u0644\u0632\u0627\u0626\u0631 \u0625\u062F\u0627\u0631\u064A\u0627\u064B\u061F"))return;const e=this.visitors.findIndex(o=>o.id===t);if(e!==-1){const o=new Date,s=o.toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"});this.visitors[e].exitTime=s,this.visitors[e].exitTimestamp=o.getTime(),localStorage.setItem("HSE_GATE_VISITORS_REGISTRY",JSON.stringify(this.visitors)),this.applyFilters(),this.updateKpis();try{const r=this.getEffectiveApiUrl();await fetch(r,{method:"POST",mode:"cors",redirect:"follow",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action:"submitGateVisitorCheckOut",id:t,exitTime:s,badge:i})})}catch{}typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0627\u0644\u0632\u0627\u0626\u0631 \u0628\u0646\u062C\u0627\u062D \u2705","success")}}refreshData(){this.loadVisitorsData(),typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D \u{1F504}","info")}startAutoRefresh(){this.autoRefreshTimer&&clearInterval(this.autoRefreshTimer),this.autoRefreshTimer=setInterval(()=>{this.loadVisitorsData()},3e4)}printEmergencyMusterList(){const t=this.visitors.filter(o=>!o.exitTime),i=window.open("","_blank"),e=new Date;i.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0643\u0634\u0641 \u062D\u0635\u0631 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0644\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 - ICAPP</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 25px; direction: rtl; color: #0f172a; }
                    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px; }
                    .header h2 { margin: 0 0 6px; color: #b91c1c; font-size: 18px; }
                    .header-sub { font-size: 13px; font-weight: bold; color: #1e3a8a; }
                    .meta-strip { margin-top: 6px; font-size: 11px; color: #475569; display: flex; justify-content: space-between; border-top: 1px dashed #cbd5e1; padding-top: 4px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 11.5px; }
                    th, td { border: 1px solid #334155; padding: 6px 8px; text-align: right; }
                    th { background: #f1f5f9; font-weight: bold; color: #0f172a; }
                    .footer { margin-top: 36px; display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; border-top: 1px solid #cbd5e1; padding-top: 15px; }
                    @media print { button { display: none !important; } body { padding: 10px; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>\u{1F6A8} \u0643\u0634\u0641 \u062D\u0635\u0631 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u0641\u0648\u0631\u064A \u0644\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h2>
                    <div class="header-sub">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP) \u2014 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                    <div class="meta-strip">
                        <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629: DOC-HSE-EMR-VIS-01 | Rev. 02</span>
                        <span>\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626 / \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ${e.toLocaleDateString("ar-EG")} - ${e.toLocaleTimeString("ar-EG")}</span>
                        <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062A\u0648\u0627\u062C\u062F\u064A\u0646 \u0628\u0627\u0644\u0645\u0646\u0634\u0623\u0629: <strong>${t.length}</strong></span>
                    </div>
                </div>

                ${t.length===0?`
                    <div style="text-align: center; padding: 30px; border: 1px dashed #94a3b8; border-radius: 8px; margin: 20px 0; background: #f8fafc;">
                        <h3 style="color: #059669; margin: 0 0 6px;">\u2705 \u0625\u0641\u0627\u062F\u0629 \u062E\u0644\u0648 \u0627\u0644\u0645\u0646\u0634\u0623\u0629 \u0645\u0646 \u0623\u064A \u0632\u0648\u0627\u0631 \u0623\u0648 \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062E\u0627\u0631\u062C\u064A\u064A\u0646</h3>
                        <p style="color: #64748b; margin: 0; font-size: 12px;">\u062A\u0645 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0644\u062D\u0638\u064A \u0644\u0633\u062C\u0644 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0648\u062A\u0623\u0643\u064A\u062F \u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0623\u064A \u0632\u0627\u0626\u0631 \u0623\u0648 \u0645\u0642\u0627\u0648\u0644 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0628\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0623\u0639\u0644\u0627\u0647.</p>
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
                            ${t.map((o,s)=>`
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

                <div class="footer">
                    <div>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629: ........................</div>
                    <div>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0648\u0646\u0642\u0637\u0629 \u0627\u0644\u062A\u062C\u0645\u0639: ........................</div>
                    <div>\u0642\u0627\u0626\u062F \u0641\u0631\u064A\u0642 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 (Incident Commander): ........................</div>
                </div>

                <div style="text-align: center; margin-top: 25px;">
                    <button onclick="window.print()" style="padding: 10px 22px; background: #1e40af; color: #fff; border:none; border-radius:8px; cursor:pointer; font-weight: bold; font-size: 13px;">\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0643\u0634\u0641 \u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u0622\u0646</button>
                </div>
            </body>
            </html>
        `),i.document.close()}exportToExcel(){if(this.filteredVisitors.length===0){alert("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}let t=`\uFEFF\u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A,\u0627\u0633\u0645 \u0627\u0644\u0632\u0627\u0626\u0631,\u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0634\u0631\u0643\u0629,\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641,\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A,\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641,\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641,\u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641,\u063A\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629,\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062F\u062E\u0648\u0644,\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644,\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C,\u0627\u0644\u062D\u0627\u0644\u0629
`;this.filteredVisitors.forEach(s=>{t+=`"${s.badge||""}","${s.name||""}","${s.org||""}","${s.phone||""}","${s.idNumber||""}","${s.site||""}","${s.area||""}","${s.host||""}","${s.purpose||""}","${s.entryDate||""}","${s.entryTime||""}","${s.exitTime||""}","${s.exitTime?"\u062A\u0645 \u0627\u0644\u062E\u0631\u0648\u062C":"\u0628\u0627\u0644\u062F\u0627\u062E\u0644"}"
`});const i=new Blob([t],{type:"text/csv;charset=utf-8;"}),e=URL.createObjectURL(i),o=document.createElement("a");o.href=e,o.download=`Gate_Visitors_Log_${new Date().toISOString().slice(0,10)}.csv`,o.click(),URL.revokeObjectURL(e)}}new GateSecurityModule;
