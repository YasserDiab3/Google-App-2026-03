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
                        <button type="button" class="btn" onclick="GateSecurity.printGateQrPoster()" style="font-weight: 800; background: #2563eb; color: #ffffff; border-color: #2563eb;">
                            <i class="fas fa-qrcode"></i> \u0628\u0648\u0633\u062A\u0631 QR \u0644\u0644\u0628\u0648\u0627\u0628\u0627\u062A (A4)
                        </button>
                        <button type="button" class="btn" onclick="GateSecurity.printMasterVisitorBadges()" style="font-weight: 800; background: #059669; color: #ffffff; border-color: #059669;">
                            <i class="fas fa-id-badge"></i> \u0643\u0627\u0631\u062A \u0648\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646 (A4)
                        </button>
                        <button type="button" class="btn btn-primary" onclick="GateSecurity.printEmergencyMusterList()" style="font-weight: 700; background: #dc2626; border-color: #dc2626;">
                            <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0643\u0634\u0641 \u0627\u0644\u0625\u062E\u0644\u0627\u0621
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
        `,this.loadVisitorsData(),this.startAutoRefresh()}getGatePortalUrl(){const t=window.location.origin||window.location.protocol+"//"+window.location.host,i=window.location.pathname;return i.includes("/Frontend/")?`${t}/Frontend/gate-visitor-entry.html`:i.includes("/dist/")?`${t}/dist/gate-visitor-entry.html`:`${t}/gate-visitor-entry.html`}copyGateLink(t){navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t).then(()=>{typeof Utils<"u"&&Utils.showNotification?Utils.showNotification("\u062A\u0645 \u0646\u0633\u062E \u0631\u0627\u0628\u0637 \u062A\u0633\u062C\u064A\u0644 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D \u2705","success"):alert("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0628\u0646\u062C\u0627\u062D: "+t)}):prompt("\u0627\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A \u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0623\u0645\u0646 \u0639\u0646\u062F \u0627\u0644\u0628\u0648\u0627\u0628\u0629:",t)}async loadVisitorsData(){try{const t=localStorage.getItem("HSE_GATE_VISITORS_REGISTRY");if(this.visitors=t?JSON.parse(t):[],navigator.onLine&&typeof GoogleIntegration<"u")try{const e=await(await fetch(this.getEffectiveApiUrl()+"?action=getActiveGateVisitors",{method:"GET",mode:"cors"})).json();if(e&&e.success&&Array.isArray(e.activeVisitors)){const o=e.activeVisitors.map(r=>({...r,entryTimestamp:new Date(r.entryDate+" "+r.entryTime).getTime()||Date.now()})),s=new Map;this.visitors.forEach(r=>s.set(r.id,r)),o.forEach(r=>s.set(r.id,r)),this.visitors=Array.from(s.values()).sort((r,a)=>(a.entryTimestamp||0)-(r.entryTimestamp||0)),localStorage.setItem("HSE_GATE_VISITORS_REGISTRY",JSON.stringify(this.visitors))}}catch{}this.applyFilters(),this.updateKpis()}catch{}}getEffectiveApiUrl(){const t="https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec";try{const i=localStorage.getItem("HSE_SETTINGS_CACHE");if(i){const e=JSON.parse(i);if(e&&e.scriptUrl&&e.scriptUrl.includes("script.google.com"))return e.scriptUrl}}catch{}return t}updateKpis(){const t=new Date().toISOString().split("T")[0],i=t.slice(0,7),e=this.visitors.filter(n=>n.entryDate===t),o=this.visitors.filter(n=>!n.exitTime),s=this.visitors.filter(n=>n.entryDate&&n.entryDate.startsWith(i)),r=Date.now(),a=o.filter(n=>(r-(n.entryTimestamp||0))/6e4>=240).length,d=document.getElementById("kpiActiveVisitors");d&&(d.textContent=o.length);const l=document.getElementById("kpiTodayVisitors");l&&(l.textContent=e.length);const c=document.getElementById("kpiOverstayVisitors");c&&(c.textContent=a);const f=document.getElementById("kpiMonthVisitors");f&&(f.textContent=s.length)}applyFilters(){let t=[...this.visitors];if(this.filterSite!=="all"&&(t=t.filter(i=>i.site===this.filterSite)),this.filterStatus==="active"?t=t.filter(i=>!i.exitTime):this.filterStatus==="exited"&&(t=t.filter(i=>!!i.exitTime)),this.searchQuery){const i=this.searchQuery.toLowerCase();t=t.filter(e=>e.name&&e.name.toLowerCase().includes(i)||e.org&&e.org.toLowerCase().includes(i)||e.badge&&e.badge.toLowerCase().includes(i)||e.host&&e.host.toLowerCase().includes(i)||e.phone&&e.phone.includes(i)||e.vehicle&&e.vehicle.toLowerCase().includes(i))}this.filteredVisitors=t,this.renderTable()}renderTable(){const t=document.getElementById("gateVisitorsTableBody");if(!t)return;if(this.filteredVisitors.length===0){t.innerHTML=`
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
                    <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
                        ${o?`
                            <button type="button" class="btn btn-sm" onclick="GateSecurity.adminForceCheckOut('${e.id}', '${e.badge}')" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; font-weight: 800; font-size: 0.75rem; border-radius: 6px; padding: 4px 10px;" title="\u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0625\u062F\u0627\u0631\u064A">
                                <i class="fas fa-door-open"></i> \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C
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
                            <strong>${e.toLocaleDateString("ar-EG")} ${e.toLocaleTimeString("ar-EG")}</strong>
                        </div>
                        <div class="meta-row">
                            <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062A\u0648\u0627\u062C\u062F\u064A\u0646:</span>
                            <strong style="color: #b91c1c; font-size: 11px;">${t.length} \u0641\u0631\u062F</strong>
                        </div>
                    </div>
                </div>

                ${t.length===0?`
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
        `),i.document.close()}printGateQrPoster(){const t=this.getGatePortalUrl(),i=`https://api.qrserver.com/v1/create-qr-code/?size=480x480&format=png&margin=0&data=${encodeURIComponent(t)}`,e=window.open("","_blank");if(!e){alert("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0628\u0648\u0633\u062A\u0631 (Pop-ups)");return}e.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0644\u0648\u062D\u0629 \u0631\u0645\u0632 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0633\u0631\u064A\u0639 QR - \u0645\u0646\u0638\u0648\u0645\u0629 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0632\u0648\u0627\u0631 - ICAPP</title>
                <style>
                    @page {
                        size: A4 portrait;
                        margin: 8mm 8mm 8mm 8mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
                        margin: 0;
                        padding: 10px;
                        direction: rtl;
                        color: #0f172a;
                        background: #ffffff;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .poster-wrapper {
                        border: 3px solid #1e3a8a;
                        border-radius: 12px;
                        padding: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: 96vh;
                        background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                    }
                    /* \u062A\u0631\u0648\u064A\u0633\u0629 ISO \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 */
                    .iso-print-header {
                        display: grid;
                        grid-template-columns: 160px 1fr 190px;
                        border: 2px solid #0f172a;
                        border-top: 5px solid #1e3a8a;
                        border-radius: 8px;
                        overflow: hidden;
                        background: #ffffff;
                        margin-bottom: 12px;
                    }
                    .iso-box-brand {
                        padding: 6px 10px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-left: 1.5px solid #0f172a;
                        background: #f8fafc;
                        gap: 3px;
                    }
                    .iso-print-logo {
                        max-height: 40px;
                        max-width: 95px;
                        object-fit: contain;
                    }
                    .iso-dept-title {
                        font-size: 10.5px;
                        font-weight: 800;
                        color: #1e3a8a;
                        text-align: center;
                        line-height: 1.2;
                    }
                    .iso-box-title {
                        padding: 6px 10px;
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
                        color: #1e3a8a;
                        line-height: 1.2;
                    }
                    .iso-sub-title {
                        font-size: 10px;
                        font-weight: 700;
                        color: #475569;
                        margin-top: 2px;
                    }
                    .iso-box-meta {
                        padding: 6px 8px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        border-right: 1.5px solid #0f172a;
                        background: #f8fafc;
                        font-size: 10px;
                        gap: 2px;
                    }
                    .meta-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px dashed #cbd5e1;
                        padding-bottom: 1px;
                    }
                    .meta-row:last-child { border-bottom: none; }
                    .meta-row span { color: #64748b; font-weight: 700; }
                    .meta-row strong { color: #0f172a; }

                    /* \u0642\u0633\u0645 \u0627\u0644\u0628\u0627\u0646\u0631 \u0627\u0644\u062A\u0648\u062C\u064A\u0647\u064A \u0627\u0644\u0631\u0626\u064A\u0633\u064A */
                    .hero-banner {
                        text-align: center;
                        background: #1e3a8a;
                        color: #ffffff;
                        padding: 10px 14px;
                        border-radius: 8px;
                        margin-bottom: 10px;
                    }
                    .hero-title {
                        font-size: 18px;
                        font-weight: 900;
                        margin: 0 0 3px;
                        letter-spacing: -0.2px;
                    }
                    .hero-sub {
                        font-size: 11px;
                        color: #93c5fd;
                        font-weight: 700;
                        margin: 0;
                    }

                    /* \u0628\u0637\u0627\u0642\u0629 \u0631\u0645\u0632 QR \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629 */
                    .qr-card-center {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: #ffffff;
                        border: 2px dashed #2563eb;
                        border-radius: 12px;
                        padding: 14px 10px;
                        margin-bottom: 12px;
                        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
                    }
                    .qr-frame {
                        background: #ffffff;
                        padding: 10px;
                        border: 3px solid #1e293b;
                        border-radius: 12px;
                        display: inline-block;
                        box-shadow: 0 6px 16px rgba(0,0,0,0.1);
                    }
                    .qr-img {
                        width: 220px;
                        height: 220px;
                        display: block;
                    }
                    .qr-tagline {
                        margin-top: 10px;
                        font-size: 11.5px;
                        font-weight: 800;
                        color: #0f172a;
                        background: #dbeafe;
                        padding: 4px 14px;
                        border-radius: 20px;
                        border: 1px solid #93c5fd;
                    }

                    /* \u0634\u0628\u0643\u0629 \u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0627\u0644\u0625\u0631\u0634\u0627\u062F\u064A\u0629 4 \u062E\u0637\u0648\u0627\u062A */
                    .steps-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 8px;
                        margin-bottom: 10px;
                    }
                    .step-box {
                        background: #ffffff;
                        border: 1.5px solid #cbd5e1;
                        border-top: 3.5px solid #2563eb;
                        border-radius: 8px;
                        padding: 8px;
                        text-align: center;
                    }
                    .step-num {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 24px;
                        height: 24px;
                        background: #2563eb;
                        color: #ffffff;
                        border-radius: 50%;
                        font-size: 12px;
                        font-weight: 900;
                        margin-bottom: 4px;
                    }
                    .step-title {
                        font-size: 11px;
                        font-weight: 800;
                        color: #0f172a;
                        margin-bottom: 2px;
                    }
                    .step-desc {
                        font-size: 9.5px;
                        color: #475569;
                        line-height: 1.25;
                    }

                    /* \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0623\u0645\u0646\u064A \u0648\u0627\u0644\u0628\u064A\u0626\u064A */
                    .safety-strip {
                        background: #fef2f2;
                        border: 1.5px solid #f87171;
                        border-radius: 8px;
                        padding: 6px 12px;
                        text-align: center;
                        font-size: 10.5px;
                        font-weight: 800;
                        color: #991b1b;
                        margin-bottom: 10px;
                    }

                    /* \u0641\u0648\u062A\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 */
                    .iso-print-footer {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 8px;
                    }
                    .footer-box {
                        border: 1.5px solid #334155;
                        border-radius: 6px;
                        padding: 6px 8px;
                        background: #f8fafc;
                    }
                    .footer-box-title {
                        font-size: 10px;
                        font-weight: 800;
                        color: #1e3a8a;
                        text-align: center;
                        border-bottom: 1px solid #cbd5e1;
                        padding-bottom: 3px;
                        margin-bottom: 5px;
                    }
                    .footer-sig-line {
                        font-size: 9.5px;
                        color: #334155;
                        margin-top: 4px;
                        font-weight: 600;
                    }

                    .print-btn-wrap {
                        text-align: center;
                        margin-top: 15px;
                    }
                    @media print {
                        .print-btn-wrap { display: none !important; }
                        body { padding: 0; }
                        .poster-wrapper { min-height: 98vh; }
                    }
                </style>
            </head>
            <body>
                <div class="poster-wrapper">
                    <!-- \u062A\u0631\u0648\u064A\u0633\u0629 ISO \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 -->
                    <div class="iso-print-header">
                        <div class="iso-box-brand">
                            <img src="icons/icapp-logo.png" alt="ICAPP" class="iso-print-logo" onerror="this.src='../icons/icapp-logo.png'">
                            <div class="iso-dept-title">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        </div>

                        <div class="iso-box-title">
                            <h1 class="iso-main-title">\u{1F6E1}\uFE0F \u0645\u0646\u0638\u0648\u0645\u0629 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0648\u0633\u062C\u0644 \u0627\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h1>
                            <div class="iso-sub-title">Gate Security Visitor & Contractor Control System</div>
                        </div>

                        <div class="iso-box-meta">
                            <div class="meta-row">
                                <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629:</span>
                                <strong>DOC-SEC-QR-01</strong>
                            </div>
                            <div class="meta-row">
                                <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</span>
                                <strong>Rev. 02</strong>
                            </div>
                            <div class="meta-row">
                                <span>\u062F\u0631\u062C\u0629 \u0627\u0644\u0633\u0631\u064A\u0629:</span>
                                <strong style="color: #047857;">\u0639\u0627\u0645 \u062F\u0627\u062E\u0644\u064A</strong>
                            </div>
                            <div class="meta-row">
                                <span>\u0646\u0638\u0627\u0645 \u0627\u0644\u062F\u062E\u0648\u0644:</span>
                                <strong>\u062A\u0633\u062C\u064A\u0644 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</strong>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0628\u0627\u0646\u0631 \u0627\u0644\u062A\u0648\u062C\u064A\u0647\u064A \u0627\u0644\u0631\u0626\u064A\u0633\u064A -->
                    <div class="hero-banner">
                        <div class="hero-title">\u{1F4F2} \u0627\u0645\u0633\u062D \u0631\u0645\u0632 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0641\u0648\u0631\u064A\u0627\u064B</div>
                        <div class="hero-sub">Scan QR Code with your smartphone camera to register your visit pass</div>
                    </div>

                    <!-- \u0628\u0637\u0627\u0642\u0629 QR \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629 -->
                    <div class="qr-card-center">
                        <div class="qr-frame">
                            <img src="${i}" alt="Gate Entry QR Code" class="qr-img" onerror="this.src='https://chart.googleapis.com/chart?cht=qr&chs=450x450&chl=${encodeURIComponent(t)}';">
                        </div>
                        <div class="qr-tagline">
                            \u{1F512} \u0645\u0633\u062D \u0622\u0645\u0646 \u0648\u0645\u0628\u0627\u0634\u0631 \u0639\u0628\u0631 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0645\u062D\u0645\u0648\u0644 | Direct Mobile Check-In
                        </div>
                    </div>

                    <!-- \u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 4 \u062E\u0637\u0648\u0627\u062A -->
                    <div class="steps-grid">
                        <div class="step-box">
                            <div class="step-num">1</div>
                            <div class="step-title">\u0627\u0641\u062A\u062D \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627</div>
                            <div class="step-desc">\u0648\u062C\u0651\u0647 \u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u0647\u0627\u062A\u0641 \u0646\u062D\u0648 \u0631\u0645\u0632 QR \u0623\u0639\u0644\u0627\u0647</div>
                        </div>
                        <div class="step-box">
                            <div class="step-num">2</div>
                            <div class="step-title">\u0627\u0641\u062A\u062D \u0627\u0644\u0631\u0627\u0628\u0637</div>
                            <div class="step-desc">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u0638\u0627\u0647\u0631 \u0644\u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C</div>
                        </div>
                        <div class="step-box">
                            <div class="step-num">3</div>
                            <div class="step-title">\u0633\u062C\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</div>
                            <div class="step-desc">\u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062C\u0647\u0629 \u0648\u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641 \u0648\u0627\u0644\u0633\u064A\u0627\u0631\u0629</div>
                        </div>
                        <div class="step-box">
                            <div class="step-num">4</div>
                            <div class="step-title">\u0627\u0633\u062A\u0644\u0645 \u0627\u0644\u0643\u0627\u0631\u062A</div>
                            <div class="step-desc">\u0627\u0633\u062A\u0644\u0645 \u0643\u0627\u0631\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0645\u0646 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0623\u0645\u0646</div>
                        </div>
                    </div>

                    <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0623\u0645\u0646 -->
                    <div class="safety-strip">
                        \u{1F6E1}\uFE0F \u062A\u0646\u0628\u064A\u0647 \u0623\u0645\u0646\u064A \u0648\u0625\u0644\u0632\u0627\u0645\u064A: \u064A\u064F\u0645\u0646\u0639 \u0627\u0644\u062A\u0648\u0627\u062C\u062F \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0628\u062F\u0648\u0646 \u062A\u0635\u0631\u064A\u062D \u0631\u0633\u0645\u064A\u060C \u0645\u0639 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0627\u0644\u062A\u0627\u0645 \u0628\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0631\u062A\u062F\u0627\u0621 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 (PPE).
                    </div>

                    <!-- \u0641\u0648\u062A\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 -->
                    <div class="iso-print-footer">
                        <div class="footer-box">
                            <div class="footer-box-title">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0623\u0645\u0646 \u0627\u0644\u0635\u0646\u0627\u0639\u064A \u0648\u0627\u0644\u062D\u0631\u0627\u0633\u0629</div>
                            <div class="footer-sig-line">\u0627\u0644\u0627\u0633\u0645: .......................................</div>
                            <div class="footer-sig-line">\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ....................................</div>
                        </div>
                        <div class="footer-box">
                            <div class="footer-box-title">\u0645\u062F\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                            <div class="footer-sig-line">\u0627\u0644\u0627\u0633\u0645: .......................................</div>
                            <div class="footer-sig-line">\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ....................................</div>
                        </div>
                        <div class="footer-box">
                            <div class="footer-box-title">\u0645\u062F\u064A\u0631 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0635\u0627\u0646\u0639</div>
                            <div class="footer-sig-line">\u0627\u0644\u0627\u0633\u0645: .......................................</div>
                            <div class="footer-sig-line">\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ....................................</div>
                        </div>
                    </div>
                </div>

                <div class="print-btn-wrap">
                    <button onclick="window.print()" style="padding: 12px 28px; background: #1e40af; color: #fff; border:none; border-radius:8px; cursor:pointer; font-weight: 900; font-size: 14px; box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);">\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0644\u0648\u062D\u0629 QR \u0627\u0644\u0622\u0646 (A4 Poster)</button>
                </div>
            </body>
            </html>
        `),e.document.close()}printMasterVisitorBadges(){const t=this.getGatePortalUrl(),i=window.open("","_blank");if(!i){alert("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0643\u0627\u0631\u062A \u0648\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646 (Pop-ups)");return}i.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0643\u0627\u0631\u062A \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646 \u0648\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 - ICAPP Safety Rules & Assembly Points</title>
                <style>
                    @page {
                        size: A4 landscape;
                        margin: 6mm 6mm 6mm 6mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
                        margin: 0;
                        padding: 8px;
                        direction: rtl;
                        color: #000000;
                        background: #f1f5f9;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .card-container {
                        width: 100%;
                        max-width: 285mm;
                        margin: 0 auto;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 12px;
                        background: #ffffff;
                        border: 2.5px solid #1e3a8a;
                        padding: 10px;
                        min-height: 188mm;
                    }
                    
                    /* ======================================================== */
                    /* \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0623\u064A\u0633\u0631: \u0631\u0633\u0645 \u062A\u0648\u0636\u064A\u062D\u064A \u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 (ASSEMBLY POINT) */
                    /* ======================================================== */
                    .left-panel {
                        border: 2px solid #0f172a;
                        border-radius: 4px;
                        padding: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background: #ffffff;
                    }
                    .left-header {
                        text-align: center;
                        margin-bottom: 8px;
                        border-bottom: 2px solid #0f172a;
                        padding-bottom: 6px;
                    }
                    .left-header h2 {
                        margin: 0;
                        font-size: 18px;
                        font-weight: 900;
                        color: #000000;
                    }
                    .left-header h3 {
                        margin: 2px 0 0;
                        font-size: 14px;
                        font-weight: 800;
                        color: #000000;
                        letter-spacing: 1px;
                    }
                    
                    /* \u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A \u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 */
                    .map-canvas-container {
                        flex: 1;
                        border: 1.5px dashed #475569;
                        border-radius: 6px;
                        background: #f8fafc;
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 12px;
                        min-height: 130mm;
                    }
                    .schematic-map {
                        width: 100%;
                        height: 100%;
                        max-height: 125mm;
                    }
                    .map-legend-bar {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        background: #e2e8f0;
                        border: 1px solid #94a3b8;
                        border-radius: 4px;
                        padding: 4px 8px;
                        font-size: 9.5px;
                        font-weight: 800;
                        margin-top: 6px;
                        flex-wrap: wrap;
                        gap: 6px;
                    }
                    .legend-item {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                    .legend-color {
                        width: 10px;
                        height: 10px;
                        border-radius: 2px;
                    }
                    .site-coordinates-box {
                        font-size: 9px;
                        color: #334155;
                        text-align: center;
                        margin-top: 4px;
                        font-weight: 700;
                        direction: ltr;
                    }

                    /* ======================================================== */
                    /* \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0623\u064A\u0645\u0646: \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646 (SAFETY RULES VISITORS) */
                    /* ======================================================== */
                    .right-panel {
                        border: 2px solid #1e3a8a;
                        border-radius: 4px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background: #ffffff;
                    }
                    .right-header {
                        text-align: center;
                        padding: 6px 10px;
                    }
                    .right-header h2 {
                        margin: 0;
                        font-size: 19px;
                        font-weight: 900;
                        color: #000000;
                    }
                    .right-header h3 {
                        margin: 1px 0 0;
                        font-size: 13px;
                        font-weight: 800;
                        color: #000000;
                        letter-spacing: 0.5px;
                    }

                    /* \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0623\u0632\u0631\u0642 \u0627\u0644\u0631\u0626\u064A\u0633\u064A */
                    .blue-priority-banner {
                        background: #1e40af;
                        color: #ffffff;
                        padding: 5px 8px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 10.5px;
                        font-weight: 800;
                    }
                    .blue-text-en {
                        text-align: left;
                        direction: ltr;
                        font-size: 9px;
                        line-height: 1.2;
                        width: 48%;
                    }
                    .blue-text-ar {
                        text-align: right;
                        direction: rtl;
                        font-size: 10.5px;
                        line-height: 1.25;
                        width: 48%;
                    }

                    /* \u0642\u0633\u0645 \u062D\u0638\u0631 \u0627\u0644\u062A\u062F\u062E\u064A\u0646 */
                    .smoking-section {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 5px 8px;
                        border-bottom: 1.5px solid #cbd5e1;
                        gap: 6px;
                    }
                    .smoke-en {
                        font-size: 8.5px;
                        direction: ltr;
                        text-align: left;
                        line-height: 1.2;
                        font-weight: 700;
                        width: 42%;
                        color: #000000;
                    }
                    .smoke-icon-box {
                        width: 48px;
                        height: 48px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .smoke-ar {
                        font-size: 9.5px;
                        direction: rtl;
                        text-align: right;
                        line-height: 1.25;
                        font-weight: 800;
                        width: 42%;
                        color: #000000;
                    }

                    /* \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 (\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0627\u062A \u0627\u0644\u062F\u0627\u0626\u0631\u064A\u0629) */
                    .basic-rules-section {
                        padding: 4px 6px;
                        border-bottom: 1.5px solid #cbd5e1;
                    }
                    .basic-rules-header {
                        display: flex;
                        justify-content: space-between;
                        font-size: 10px;
                        font-weight: 900;
                        color: #000000;
                        margin-bottom: 4px;
                        padding: 0 4px;
                    }
                    .rules-icons-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 2px 4px;
                    }
                    .rule-circle-icon {
                        width: 32px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    /* \u0634\u0631\u064A\u0637 \u0633\u0627\u0631\u064A\u0646\u0629 \u0627\u0644\u0625\u0646\u0630\u0627\u0631 \u0627\u0644\u0623\u062D\u0645\u0631 \u0648\u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0627\u0644\u0635\u0641\u0631\u0627\u0621 \u0627\u0644\u062B\u0644\u0627\u062B */
                    .siren-section {
                        border-bottom: 1.5px solid #cbd5e1;
                    }
                    .siren-red-bar {
                        background: #dc2626;
                        color: #ffffff;
                        padding: 4px 8px;
                        display: flex;
                        justify-content: space-between;
                        font-size: 10.5px;
                        font-weight: 900;
                    }
                    .siren-steps-container {
                        background: #facc15;
                        padding: 4px 6px;
                        display: flex;
                        flex-direction: column;
                        gap: 3px;
                    }
                    .siren-step-row {
                        display: grid;
                        grid-template-columns: 1fr 40px 1fr;
                        align-items: center;
                        gap: 4px;
                        background: #eab308;
                        padding: 2px 6px;
                        border-radius: 3px;
                    }
                    .s-text-en {
                        font-size: 8.5px;
                        font-weight: 800;
                        direction: ltr;
                        text-align: left;
                        color: #000000;
                    }
                    .s-icon-center {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .s-text-ar {
                        font-size: 9.5px;
                        font-weight: 900;
                        direction: rtl;
                        text-align: right;
                        color: #000000;
                    }

                    /* \u0642\u0633\u0645 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 PPE */
                    .ppe-section {
                        padding: 4px 6px;
                        border-bottom: 1.5px solid #cbd5e1;
                    }
                    .ppe-header-texts {
                        display: flex;
                        justify-content: space-between;
                        font-size: 9px;
                        font-weight: 800;
                        color: #000000;
                        margin-bottom: 4px;
                        padding: 0 2px;
                    }
                    .ppe-icons-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 4px;
                    }
                    .ppe-icon-circle {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: #0f172a;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #ffffff;
                    }

                    /* \u0641\u0648\u062A\u0631 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644 */
                    .emergency-footer {
                        padding: 4px 8px 6px;
                        text-align: center;
                    }
                    .emergency-top-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 11px;
                        font-weight: 900;
                        color: #000000;
                        margin-bottom: 2px;
                    }
                    .phone-icons-box {
                        display: flex;
                        gap: 6px;
                    }
                    .phone-pill {
                        width: 24px;
                        height: 24px;
                        border-radius: 4px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #ffffff;
                        font-size: 13px;
                    }
                    .emergency-call-line {
                        font-size: 10px;
                        font-weight: 900;
                        color: #000000;
                        margin-top: 2px;
                    }

                    /* \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0639\u0644\u0648\u064A\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629 */
                    .toolbar-top {
                        background: #ffffff;
                        border: 1px solid #cbd5e1;
                        border-radius: 8px;
                        padding: 8px 14px;
                        margin-bottom: 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 8px;
                    }
                    @media print {
                        .toolbar-top { display: none !important; }
                        body { padding: 0; background: #ffffff; }
                        .card-container { min-height: 98vh; max-width: 100%; border: 2px solid #1e3a8a; }
                    }
                </style>
            </head>
            <body>
                <div class="toolbar-top">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: 800; font-size: 12px; color: #1e3a8a;">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639:</span>
                        <select id="siteSelect" onchange="updateSiteMap(this.value)" style="padding: 4px 10px; border-radius: 6px; border: 1.5px solid #94a3b8; font-weight: 700; font-size: 12px;">
                            <option value="ICAPP-1">\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A (ICAPP-1 - \u062E\u0637\u0648\u0637 \u0627\u0644\u0641\u0627\u0643\u0647\u0629 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639)</option>
                            <option value="ICAPP-2">\u0645\u0635\u0646\u0639 \u0627\u0644\u062A\u062C\u0645\u064A\u062F \u0648\u0627\u0644\u062A\u0639\u0628\u0626\u0629 (ICAPP-2)</option>
                            <option value="ICAPP-3">\u0645\u0635\u0646\u0639 \u0627\u0644\u0645\u0631\u0643\u0632\u0627\u062A \u0648\u0627\u0644\u0639\u0635\u0627\u0626\u0631 (ICAPP-3)</option>
                            <option value="ICAPP-4">\u0645\u062D\u0637\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0641\u0646\u064A\u0629 (ICAPP-4)</option>
                            <option value="WH">\u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0639\u0627\u0645\u0629 (WH)</option>
                            <option value="\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A">\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A \u0648\u0645\u0628\u0646\u0649 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</option>
                            <option value="\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645" selected>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645 \u0644\u0643\u0627\u0641\u0629 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 (Master Site Layout)</option>
                        </select>
                    </div>

                    <div style="display: flex; gap: 8px; align-items: center;">
                        <input type="text" id="customCoords" placeholder="\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A GPS (\u0645\u062B\u0627\u0644: 30\xB024'12.4"N 31\xB018'45.2"E)" value="30\xB024'12.4&quot;N 31\xB018'45.2&quot;E" style="padding: 4px 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 11px; width: 250px;" oninput="document.getElementById('displayCoords').textContent = '\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639: ' + this.value">
                        <button onclick="window.print()" style="padding: 6px 18px; background: #1e40af; color: #fff; border:none; border-radius:6px; cursor:pointer; font-weight: 900; font-size: 12px;">\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0643\u0627\u0631\u062A \u0627\u0644\u0622\u0646</button>
                    </div>
                </div>

                <div class="card-container">
                    <!-- \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0623\u064A\u0633\u0631: \u0631\u0633\u0645 \u062A\u0648\u0636\u064A\u062D\u064A \u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 -->
                    <div class="left-panel">
                        <div class="left-header">
                            <h2>\u0631\u0633\u0645 \u062A\u0648\u0636\u064A\u062D\u064A \u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639</h2>
                            <h3>ASSEMBLY POINT</h3>
                        </div>

                        <div class="map-canvas-container">
                            <!-- \u0627\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A SVG \u0627\u0644\u0645\u0639\u064A\u0627\u0631\u064A \u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0625\u062E\u0644\u0627\u0621 -->
                            <svg class="schematic-map" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg">
                                <!-- \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0648\u0627\u0644\u0645\u062D\u064A\u0637 \u0627\u0644\u062E\u0627\u0631\u062C\u064A -->
                                <rect x="10" y="10" width="480" height="340" rx="8" fill="#f1f5f9" stroke="#334155" stroke-width="2.5" stroke-dasharray="6,4"/>
                                
                                <!-- \u0627\u0644\u0634\u0627\u0631\u0639 \u0627\u0644\u0645\u062D\u064A\u0637 \u0648\u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A -->
                                <rect x="20" y="20" width="460" height="320" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
                                <rect x="35" y="35" width="430" height="290" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>

                                <!-- \u0645\u0628\u0627\u0646\u064A \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 -->
                                <!-- \u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u0627\u0644\u0645\u062E\u062A\u0628\u0631 -->
                                <rect x="50" y="50" width="120" height="60" rx="4" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
                                <text x="110" y="85" font-size="11" font-weight="900" fill="#1e3a8a" text-anchor="middle" font-family="Segoe UI">\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A</text>

                                <!-- \u0645\u0635\u0646\u0639 ICAPP-1 -->
                                <rect x="190" y="50" width="160" height="120" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
                                <text x="270" y="110" font-size="13" font-weight="900" fill="#92400e" text-anchor="middle" font-family="Segoe UI">\u0645\u0635\u0646\u0639 ICAPP-1</text>
                                <text x="270" y="128" font-size="9" font-weight="700" fill="#b45309" text-anchor="middle" font-family="Segoe UI">\u062E\u0637\u0648\u0637 \u0627\u0644\u0641\u0627\u0643\u0647\u0629 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639</text>

                                <!-- \u0645\u0635\u0646\u0639 ICAPP-2 & ICAPP-3 -->
                                <rect x="190" y="190" width="160" height="115" rx="4" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
                                <text x="270" y="245" font-size="13" font-weight="900" fill="#5b21b6" text-anchor="middle" font-family="Segoe UI">\u0645\u0635\u0627\u0646\u0639 ICAPP-2 &amp; 3</text>
                                <text x="270" y="263" font-size="9" font-weight="700" fill="#6d28d9" text-anchor="middle" font-family="Segoe UI">\u0627\u0644\u062A\u062C\u0645\u064A\u062F \u0648\u0627\u0644\u0645\u0631\u0643\u0632\u0627\u062A</text>

                                <!-- \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0639\u0627\u0645\u0629 WH -->
                                <rect x="370" y="50" width="80" height="160" rx="4" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
                                <text x="410" y="130" font-size="11" font-weight="900" fill="#334155" text-anchor="middle" font-family="Segoe UI">\u0627\u0644\u0645\u062E\u0627\u0632\u0646</text>
                                <text x="410" y="148" font-size="9" font-weight="700" fill="#475569" text-anchor="middle" font-family="Segoe UI">WH</text>

                                <!-- \u0645\u062D\u0637\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A -->
                                <rect x="50" y="190" width="120" height="115" rx="4" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
                                <text x="110" y="245" font-size="11" font-weight="900" fill="#9d174d" text-anchor="middle" font-family="Segoe UI">\u0645\u062D\u0637\u0629 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0641\u0646\u064A\u0629</text>
                                <text x="110" y="263" font-size="9" font-weight="700" fill="#be185d" text-anchor="middle" font-family="Segoe UI">\u0648\u0627\u0644\u0637\u0627\u0642\u0629 (ICAPP-4)</text>

                                <!-- \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u062E\u0636\u0631\u0627\u0621 \u0648\u0627\u0644\u0623\u0633\u0647\u0645 -->
                                <path d="M 110 110 L 110 150 L 190 150" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 270 170 L 270 190" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 350 110 L 370 110" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 270 305 L 270 325" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 50 150 L 35 150" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>

                                <!-- \u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 \u0627\u0644\u0623\u0631\u0628\u0639 (Muster Points) -->
                                <!-- \u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639 1 -->
                                <g transform="translate(145, 140)">
                                    <rect x="-22" y="-14" width="44" height="28" rx="4" fill="#15803d" stroke="#ffffff" stroke-width="1.5"/>
                                    <text x="0" y="3" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="Segoe UI">\u0646\u0642\u0637\u0629 1</text>
                                </g>

                                <!-- \u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639 2 -->
                                <g transform="translate(410, 240)">
                                    <rect x="-22" y="-14" width="44" height="28" rx="4" fill="#15803d" stroke="#ffffff" stroke-width="1.5"/>
                                    <text x="0" y="3" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="Segoe UI">\u0646\u0642\u0637\u0629 2</text>
                                </g>

                                <!-- \u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639 3 -->
                                <g transform="translate(110, 310)">
                                    <rect x="-22" y="-14" width="44" height="28" rx="4" fill="#15803d" stroke="#ffffff" stroke-width="1.5"/>
                                    <text x="0" y="3" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="Segoe UI">\u0646\u0642\u0637\u0629 3</text>
                                </g>

                                <!-- \u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639 4 -->
                                <g transform="translate(270, 30)">
                                    <rect x="-22" y="-14" width="44" height="28" rx="4" fill="#15803d" stroke="#ffffff" stroke-width="1.5"/>
                                    <text x="0" y="3" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="Segoe UI">\u0646\u0642\u0637\u0629 4</text>
                                </g>

                                <!-- \u0628\u0648\u0627\u0628\u0627\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u0648\u0627\u0644\u0623\u0645\u0646 -->
                                <rect x="18" y="135" width="16" height="30" fill="#dc2626" rx="2"/>
                                <text x="26" y="154" font-size="8" font-weight="900" fill="#ffffff" text-anchor="middle" transform="rotate(-90 26 154)" font-family="Segoe UI">\u0628\u0648\u0627\u0628\u0629</text>

                                <!-- \u0628\u0648\u0635\u0644\u0629 \u0627\u0644\u0634\u0645\u0627\u0644 -->
                                <g transform="translate(450, 45)">
                                    <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
                                    <polygon points="0,-12 4,0 0,-2 -4,0" fill="#dc2626"/>
                                    <polygon points="0,12 4,0 0,2 -4,0" fill="#0f172a"/>
                                    <text x="0" y="-15" font-size="9" font-weight="900" fill="#dc2626" text-anchor="middle">N</text>
                                </g>
                            </svg>
                        </div>

                        <div class="map-legend-bar">
                            <div class="legend-item">
                                <div class="legend-color" style="background: #15803d;"></div>
                                <span>\u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639 (Muster Point)</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background: #16a34a;"></div>
                                <span>\u0645\u0633\u0627\u0631 \u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u0622\u0645\u0646 \u2794</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background: #dc2626;"></div>
                                <span>\u0628\u0648\u0627\u0628\u0627\u062A \u0648\u0645\u062E\u0627\u0631\u062C \u0627\u0644\u0637\u0648\u0627\u0631\u0626</span>
                            </div>
                        </div>

                        <div class="site-coordinates-box" id="displayCoords">
                            \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639: 30\xB024'12.4"N 31\xB018'45.2"E | DOC-HSE-MAP-01 Rev.02
                        </div>
                    </div>

                    <!-- \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0623\u064A\u0645\u0646: \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646 -->
                    <div class="right-panel">
                        <div class="right-header">
                            <h2>\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646</h2>
                            <h3>SAFETY RULES VISITORS</h3>
                        </div>

                        <!-- \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0623\u0632\u0631\u0642 \u0627\u0644\u0631\u0626\u064A\u0633\u064A -->
                        <div class="blue-priority-banner">
                            <div class="blue-text-en">
                                <strong>YOUR SAFETY IS OF OUR PRIORITY</strong><br>
                                All visitors are kindly requested to follow the safety instructions here
                            </div>
                            <div class="blue-text-ar">
                                <strong>\u0639\u0632\u064A\u0632\u064A \u0627\u0644\u0632\u0627\u0626\u0631 \u0633\u0644\u0627\u0645\u062A\u0643 \u062A\u0647\u0645\u0646\u0627</strong><br>
                                \u064A\u0631\u062C\u0649 \u0625\u062A\u0628\u0627\u0639 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0648\u0636\u062D\u0629
                            </div>
                        </div>

                        <!-- \u0627\u0644\u062A\u062F\u062E\u064A\u0646 \u063A\u064A\u0631 \u0645\u0633\u0645\u0648\u062D -->
                        <div class="smoking-section">
                            <div class="smoke-en">
                                Smoking is prohibited throughout the plant premises except in specially dedicated and adapted areas.
                            </div>
                            <div class="smoke-icon-box">
                                <svg width="44" height="44" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#dc2626" stroke-width="8"/>
                                    <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" stroke-width="8"/>
                                    <!-- \u0633\u064A\u062C\u0627\u0631\u0629 -->
                                    <rect x="25" y="45" width="40" height="10" fill="#ffffff" stroke="#000" stroke-width="1.5"/>
                                    <rect x="25" y="45" width="12" height="10" fill="#f59e0b"/>
                                    <path d="M 68 43 Q 72 38 76 43 T 80 43" fill="none" stroke="#64748b" stroke-width="2"/>
                                    <path d="M 70 57 Q 74 52 78 57 T 82 57" fill="none" stroke="#64748b" stroke-width="2"/>
                                </svg>
                            </div>
                            <div class="smoke-ar">
                                \u0627\u0644\u062A\u062F\u062E\u064A\u0646 \u063A\u064A\u0631 \u0645\u0633\u0645\u0648\u062D \u0628\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u062F\u0627\u062E\u0644 \u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0639\u0645\u0644 \u0628\u0625\u0633\u062A\u062B\u0646\u0627\u0621 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u062E\u0635\u0635\u0629 \u0648\u0627\u0644\u062A\u064A \u062A\u0645 \u062A\u062C\u0647\u064A\u0632\u0647\u0627 \u0644\u0630\u0644\u0643.
                            </div>
                        </div>

                        <!-- \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 7 \u0623\u064A\u0642\u0648\u0646\u0627\u062A -->
                        <div class="basic-rules-section">
                            <div class="basic-rules-header">
                                <span>SAFETY BASIC RULES</span>
                                <span>\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</span>
                            </div>

                            <div class="rules-icons-row">
                                <!-- 18 \u0645\u0645\u0646\u0648\u0639 -->
                                <div class="rule-circle-icon">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <text x="50" y="60" font-size="34" font-weight="900" fill="#000" text-anchor="middle" font-family="Arial">18</text>
                                    </svg>
                                </div>

                                <!-- \u0643\u062D\u0648\u0644\u064A\u0627\u062A -->
                                <div class="rule-circle-icon">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <path d="M 40 35 L 60 35 L 53 52 L 53 68 L 62 68 L 62 72 L 38 72 L 38 68 L 47 68 L 47 52 Z" fill="#000"/>
                                    </svg>
                                </div>

                                <!-- \u062A\u0635\u0648\u064A\u0631 -->
                                <div class="rule-circle-icon">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <rect x="30" y="40" width="40" height="28" rx="4" fill="#000"/>
                                        <circle cx="50" cy="54" r="8" fill="#fff"/>
                                        <rect x="42" y="34" width="16" height="6" fill="#000"/>
                                    </svg>
                                </div>

                                <!-- \u0623\u0633\u0644\u062D\u0629 \u0648\u0623\u062F\u0648\u0627\u062A \u062D\u0627\u062F\u0629 -->
                                <div class="rule-circle-icon">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <path d="M 35 65 L 65 35 L 70 40 L 40 70 Z" fill="#000"/>
                                    </svg>
                                </div>

                                <!-- \u0633\u0631\u0639\u0629 20 -->
                                <div class="rule-circle-icon">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <text x="50" y="52" font-size="28" font-weight="900" fill="#000" text-anchor="middle" font-family="Arial">20</text>
                                        <text x="50" y="68" font-size="14" font-weight="900" fill="#000" text-anchor="middle" font-family="Arial">km/h</text>
                                    </svg>
                                </div>

                                <!-- \u0643\u0644\u0627\u0631\u0643\u0627\u062A / \u0634\u0648\u0643\u0629 -->
                                <div class="rule-circle-icon">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <polygon points="50,15 88,80 12,80" fill="#facc15" stroke="#000" stroke-width="4"/>
                                        <rect x="35" y="55" width="25" height="15" fill="#000"/>
                                        <circle cx="42" cy="72" r="4" fill="#000"/>
                                        <circle cx="56" cy="72" r="4" fill="#000"/>
                                        <line x1="65" y1="45" x2="65" y2="72" stroke="#000" stroke-width="3"/>
                                        <line x1="65" y1="70" x2="75" y2="70" stroke="#000" stroke-width="3"/>
                                    </svg>
                                </div>

                                <!-- \u0645\u0645\u0631 \u0645\u0634\u0627\u0629 -->
                                <div class="rule-circle-icon">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="46" fill="#1d4ed8"/>
                                        <circle cx="50" cy="30" r="7" fill="#ffffff"/>
                                        <path d="M 45 42 L 55 42 L 58 60 L 65 75 L 58 75 L 53 62 L 48 75 L 42 75 L 47 56 L 40 60 Z" fill="#ffffff"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- \u0641\u064A \u062D\u0627\u0644\u0629 \u0633\u0645\u0627\u0639 \u0633\u0627\u0631\u064A\u0646\u0629 \u0627\u0644\u0625\u0646\u0630\u0627\u0631 -->
                        <div class="siren-section">
                            <div class="siren-red-bar">
                                <span>When you hear the emergency siren:</span>
                                <span>\u0641\u064A \u062D\u0627\u0644\u0629 \u0633\u0645\u0627\u0639 \u0633\u0627\u0631\u064A\u0646\u0629 \u0627\u0644\u0625\u0646\u0630\u0627\u0631 :</span>
                            </div>

                            <div class="siren-steps-container">
                                <!-- \u062E\u0637\u0648\u0629 1 -->
                                <div class="siren-step-row">
                                    <div class="s-text-en">1- Follow your escort's instructions</div>
                                    <div class="s-icon-center">
                                        <svg width="26" height="26" viewBox="0 0 100 100">
                                            <rect width="100" height="100" fill="#dc2626" rx="6"/>
                                            <circle cx="50" cy="50" r="16" fill="#ffffff"/>
                                            <path d="M 28 35 A 25 25 0 0 1 28 65" fill="none" stroke="#ffffff" stroke-width="6"/>
                                            <path d="M 72 35 A 25 25 0 0 0 72 65" fill="none" stroke="#ffffff" stroke-width="6"/>
                                        </svg>
                                    </div>
                                    <div class="s-text-ar">\u0661- \u0627\u062A\u0628\u0639 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0644\u0643 \u0623\u0648 \u0631\u0626\u064A\u0633 \u0627\u0644\u0642\u0633\u0645</div>
                                </div>

                                <!-- \u062E\u0637\u0648\u0629 2 -->
                                <div class="siren-step-row">
                                    <div class="s-text-en">2- Go to the nearest exit door</div>
                                    <div class="s-icon-center">
                                        <svg width="34" height="26" viewBox="0 0 140 100">
                                            <rect width="140" height="100" fill="#15803d" rx="6"/>
                                            <path d="M 35 50 L 15 50 L 25 35 M 15 50 L 25 65" stroke="#ffffff" stroke-width="7" fill="none"/>
                                            <circle cx="70" cy="30" r="9" fill="#ffffff"/>
                                            <path d="M 60 45 L 80 45 L 85 65 L 95 85 L 85 85 L 75 68 L 65 85 L 55 85 L 68 60 L 58 55 Z" fill="#ffffff"/>
                                            <rect x="100" y="20" width="25" height="60" fill="none" stroke="#ffffff" stroke-width="6"/>
                                        </svg>
                                    </div>
                                    <div class="s-text-ar">\u0662- \u0625\u062A\u062C\u0647 \u0625\u0644\u0649 \u0623\u0642\u0631\u0628 \u0628\u0627\u0628 \u062E\u0631\u0648\u062C</div>
                                </div>

                                <!-- \u062E\u0637\u0648\u0629 3 -->
                                <div class="siren-step-row">
                                    <div class="s-text-en">3- Go to the nearest assembly point</div>
                                    <div class="s-icon-center">
                                        <svg width="26" height="26" viewBox="0 0 100 100">
                                            <rect width="100" height="100" fill="#15803d" rx="6"/>
                                            <circle cx="50" cy="38" r="7" fill="#ffffff"/>
                                            <path d="M 42 50 L 58 50 L 58 68 L 42 68 Z" fill="#ffffff"/>
                                            <path d="M 20 20 L 35 35 M 35 20 L 35 35 L 20 35" stroke="#ffffff" stroke-width="5" fill="none"/>
                                            <path d="M 80 20 L 65 35 M 65 20 L 65 35 L 80 35" stroke="#ffffff" stroke-width="5" fill="none"/>
                                            <path d="M 20 80 L 35 65 M 35 80 L 35 65 L 20 65" stroke="#ffffff" stroke-width="5" fill="none"/>
                                            <path d="M 80 80 L 65 65 M 65 80 L 65 65 L 80 65" stroke="#ffffff" stroke-width="5" fill="none"/>
                                        </svg>
                                    </div>
                                    <div class="s-text-ar">\u0663- \u0625\u062A\u062C\u0647 \u0625\u0644\u0649 \u0623\u0642\u0631\u0628 \u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639</div>
                                </div>
                            </div>
                        </div>

                        <!-- \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 PPE -->
                        <div class="ppe-section">
                            <div class="ppe-header-texts">
                                <span>Use personal protective equipment suitable to the area you enter</span>
                                <span>\u064A\u062C\u0628 \u0627\u0644\u0625\u0644\u062A\u0632\u0627\u0645 \u0628\u0625\u0631\u062A\u062F\u0627\u0621 \u0645\u0644\u0627\u0628\u0633 \u0648\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0632\u064A\u0627\u0631\u0629</span>
                            </div>

                            <div class="ppe-icons-row">
                                <!-- \u0646\u0638\u0627\u0631\u0629 -->
                                <div class="ppe-icon-circle" title="Safety Glasses">
                                    <svg width="22" height="22" viewBox="0 0 100 100">
                                        <circle cx="32" cy="50" r="16" fill="none" stroke="#fff" stroke-width="6"/>
                                        <circle cx="68" cy="50" r="16" fill="none" stroke="#fff" stroke-width="6"/>
                                        <line x1="48" y1="50" x2="52" y2="50" stroke="#fff" stroke-width="6"/>
                                        <line x1="16" y1="50" x2="5" y2="40" stroke="#fff" stroke-width="6"/>
                                        <line x1="84" y1="50" x2="95" y2="40" stroke="#fff" stroke-width="6"/>
                                    </svg>
                                </div>

                                <!-- \u0648\u0627\u0642\u064A \u0648\u062C\u0647 -->
                                <div class="ppe-icon-circle" title="Face Shield">
                                    <svg width="22" height="22" viewBox="0 0 100 100">
                                        <circle cx="50" cy="40" r="18" fill="#fff"/>
                                        <path d="M 30 30 Q 50 20 70 30 L 70 65 Q 50 85 30 65 Z" fill="none" stroke="#fff" stroke-width="6"/>
                                    </svg>
                                </div>

                                <!-- \u0642\u0641\u0627\u0632\u0627\u062A -->
                                <div class="ppe-icon-circle" title="Safety Gloves">
                                    <svg width="22" height="22" viewBox="0 0 100 100">
                                        <path d="M 35 75 L 35 45 Q 35 38 42 38 Q 48 38 48 45 L 48 35 Q 48 28 55 28 Q 62 28 62 35 L 62 45 Q 62 38 68 38 Q 75 38 75 45 L 75 75 Z" fill="#fff"/>
                                    </svg>
                                </div>

                                <!-- \u0643\u0645\u0627\u0645\u0629 -->
                                <div class="ppe-icon-circle" title="Dust Mask">
                                    <svg width="22" height="22" viewBox="0 0 100 100">
                                        <path d="M 25 45 Q 50 35 75 45 L 68 70 Q 50 80 32 70 Z" fill="#fff"/>
                                        <line x1="25" y1="45" x2="10" y2="35" stroke="#fff" stroke-width="5"/>
                                        <line x1="75" y1="45" x2="90" y2="35" stroke="#fff" stroke-width="5"/>
                                    </svg>
                                </div>

                                <!-- \u0648\u0627\u0642\u064A \u0623\u0630\u0646 -->
                                <div class="ppe-icon-circle" title="Ear Protection">
                                    <svg width="22" height="22" viewBox="0 0 100 100">
                                        <path d="M 25 55 Q 25 20 50 20 Q 75 20 75 55" fill="none" stroke="#fff" stroke-width="6"/>
                                        <rect x="20" y="50" width="12" height="22" rx="4" fill="#fff"/>
                                        <rect x="68" y="50" width="12" height="22" rx="4" fill="#fff"/>
                                    </svg>
                                </div>

                                <!-- \u062E\u0648\u0630\u0629 -->
                                <div class="ppe-icon-circle" title="Safety Helmet">
                                    <svg width="22" height="22" viewBox="0 0 100 100">
                                        <path d="M 25 60 Q 25 25 50 25 Q 75 25 75 60 Z" fill="#fff"/>
                                        <rect x="18" y="58" width="64" height="8" rx="3" fill="#fff"/>
                                    </svg>
                                </div>

                                <!-- \u062D\u0630\u0627\u0621 \u0623\u0645\u0627\u0646 -->
                                <div class="ppe-icon-circle" title="Safety Boots">
                                    <svg width="22" height="22" viewBox="0 0 100 100">
                                        <path d="M 35 25 L 55 25 L 55 55 L 75 65 L 75 75 L 30 75 L 30 35 Z" fill="#fff"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- \u0641\u0648\u062A\u0631 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 -->
                        <div class="emergency-footer">
                            <div class="emergency-top-row">
                                <span>Emergency call</span>
                                <div class="phone-icons-box">
                                    <div class="phone-pill" style="background: #dc2626;">\u{1F4DE}</div>
                                    <div class="phone-pill" style="background: #16a34a;">\u{1F4F1}</div>
                                </div>
                                <span>\u0637\u0648\u0627\u0631\u0626 \u0627\u0644\u0645\u0635\u0646\u0639</span>
                            </div>
                            <div class="emergency-call-line">
                                \u0641\u064A \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u064A\u0631\u062C\u0649 \u0627\u0644\u0625\u062A\u0635\u0627\u0644 \u0639\u0644\u0649 \u0631\u0642\u0645: <strong>0100000000 / \u062F\u0627\u062E\u0644\u064A: 100</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <script>
                    function updateSiteMap(site) {
                        const coordsMap = {
                            'ICAPP-1': '30\xB024\\'12.4"N 31\xB018\\'45.2"E - \u0645\u0635\u0646\u0639 1 \u0627\u0644\u0641\u0627\u0643\u0647\u0629',
                            'ICAPP-2': '30\xB024\\'14.1"N 31\xB018\\'48.6"E - \u0645\u0635\u0646\u0639 2 \u0627\u0644\u062A\u062C\u0645\u064A\u062F',
                            'ICAPP-3': '30\xB024\\'15.8"N 31\xB018\\'50.1"E - \u0645\u0635\u0646\u0639 3 \u0627\u0644\u0645\u0631\u0643\u0632\u0627\u062A',
                            'ICAPP-4': '30\xB024\\'10.2"N 31\xB018\\'42.5"E - \u0645\u062D\u0637\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0627\u0644\u0637\u0627\u0642\u0629',
                            'WH': '30\xB024\\'18.0"N 31\xB018\\'52.3"E - \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0639\u0627\u0645\u0629',
                            '\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A': '30\xB024\\'08.5"N 31\xB018\\'40.1"E - \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629',
                            '\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645': '30\xB024\\'12.4"N 31\xB018\\'45.2"E - \u0645\u062C\u0645\u0639 \u0645\u0635\u0627\u0646\u0639 ICAPP'
                        };
                        const c = coordsMap[site] || '30\xB024\\'12.4"N 31\xB018\\'45.2"E';
                        document.getElementById('customCoords').value = c;
                        document.getElementById('displayCoords').textContent = '\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639: ' + c + ' | DOC-HSE-MAP-01 Rev.02';
                    }
                <\/script>
            </body>
            </html>
        `),i.document.close()}exportToExcel(){if(this.filteredVisitors.length===0){alert("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}let t=`\uFEFF\u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A,\u0627\u0633\u0645 \u0627\u0644\u0632\u0627\u0626\u0631,\u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0634\u0631\u0643\u0629,\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641,\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A,\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641,\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641,\u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641,\u063A\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629,\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062F\u062E\u0648\u0644,\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644,\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C,\u0627\u0644\u062D\u0627\u0644\u0629
`;this.filteredVisitors.forEach(s=>{t+=`"${s.badge||""}","${s.name||""}","${s.org||""}","${s.phone||""}","${s.idNumber||""}","${s.site||""}","${s.area||""}","${s.host||""}","${s.purpose||""}","${s.entryDate||""}","${s.entryTime||""}","${s.exitTime||""}","${s.exitTime?"\u062A\u0645 \u0627\u0644\u062E\u0631\u0648\u062C":"\u0628\u0627\u0644\u062F\u0627\u062E\u0644"}"
`});const i=new Blob([t],{type:"text/csv;charset=utf-8;"}),e=URL.createObjectURL(i),o=document.createElement("a");o.href=e,o.download=`Gate_Visitors_Log_${new Date().toISOString().slice(0,10)}.csv`,o.click(),URL.revokeObjectURL(e)}}new GateSecurityModule;
