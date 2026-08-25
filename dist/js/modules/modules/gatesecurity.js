class GateSecurityModule{constructor(){this.visitors=[],this.filteredVisitors=[],this.filterSite="all",this.filterStatus="all",this.searchQuery="",this.autoRefreshTimer=null,this.init()}init(){window.GateSecurity=this,document.addEventListener("DOMContentLoaded",()=>{this.checkAndApplyVisibility()})}checkAndApplyVisibility(){const e=this.isAdmin(),i=document.querySelector('a[data-section="gate-security"]');i&&(i.style.display=e?"flex":"none");const t=document.getElementById("gate-security-section");t&&!e&&(t.style.display="none")}isAdmin(){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"&&Permissions.isCurrentUserAdmin()||typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin())return!0;const e=AppState?.currentUser?.role;return e==="admin"||e==="hse_manager"||e==="general_manager"||e==="security_admin"}catch{return!1}}render(){const e=document.getElementById("gate-security-section");if(!e)return;if(!this.isAdmin()){e.innerHTML=`
                <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <i class="fas fa-lock text-rose-500" style="font-size: 3rem; margin-bottom: 12px; display:block;"></i>
                    <h3 style="font-size: 1.2rem; font-weight:800;">\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0645\u062E\u0635\u0635 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0623\u0645\u0646 \u0641\u0642\u0637</h3>
                </div>
            `;return}const i=this.getGatePortalUrl();e.innerHTML=`
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
                        <button type="button" class="btn" onclick="GateSecurity.openMapEditorModal()" style="font-weight: 800; background: #8b5cf6; color: #ffffff; border-color: #8b5cf6;">
                            <i class="fas fa-map-marked-alt"></i> \u0645\u062D\u0631\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0648\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639
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

            <!-- \u2500\u2500 \u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0631\u0634\u064A\u0642\u0629 \u0627\u0644\u0645\u0646\u0645\u0642\u0629 (\u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628) \u2500\u2500 -->
            <div id="gate-kpi-strip" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 18px;">
                <!-- 1. \u0627\u0644\u0645\u062A\u0648\u0627\u062C\u062F\u0648\u0646 \u062D\u0627\u0644\u064A\u0627\u064B -->
                <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; transition: all .2s; cursor: default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width: 38px; height: 38px; background: #10b981; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i class="fas fa-users" style="color: #fff; font-size: 15px;"></i>
                    </div>
                    <div>
                        <div id="kpiActiveVisitors" style="font-size: 1.25rem; font-weight: 800; color: #047857; line-height: 1;">0</div>
                        <div style="font-size: 0.7rem; font-weight: 700; color: #065f46; margin-top: 3px; white-space: nowrap;">\u0627\u0644\u0645\u062A\u0648\u0627\u062C\u062F\u0648\u0646 \u062D\u0627\u0644\u064A\u0627\u064B \u0628\u0627\u0644\u0645\u0635\u0627\u0646\u0639</div>
                    </div>
                </div>

                <!-- 2. \u0632\u0648\u0627\u0631 \u0627\u0644\u064A\u0648\u0645 -->
                <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; transition: all .2s; cursor: default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width: 38px; height: 38px; background: #3b82f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i class="fas fa-calendar-day" style="color: #fff; font-size: 15px;"></i>
                    </div>
                    <div>
                        <div id="kpiTodayVisitors" style="font-size: 1.25rem; font-weight: 800; color: #1e40af; line-height: 1;">0</div>
                        <div style="font-size: 0.7rem; font-weight: 700; color: #1e3a8a; margin-top: 3px; white-space: nowrap;">\u0625\u062C\u0645\u0627\u0644\u064A \u0632\u0648\u0627\u0631 \u0627\u0644\u064A\u0648\u0645</div>
                    </div>
                </div>

                <!-- 3. \u062A\u0646\u0628\u064A\u0647 \u0645\u062F\u0629 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 -->
                <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; transition: all .2s; cursor: default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width: 38px; height: 38px; background: #f59e0b; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i class="fas fa-stopwatch" style="color: #fff; font-size: 15px;"></i>
                    </div>
                    <div>
                        <div id="kpiOverstayVisitors" style="font-size: 1.25rem; font-weight: 800; color: #b45309; line-height: 1;">0</div>
                        <div style="font-size: 0.7rem; font-weight: 700; color: #92400e; margin-top: 3px; white-space: nowrap;">\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (+4 \u0633\u0627\u0639\u0627\u062A)</div>
                    </div>
                </div>

                <!-- 4. \u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0634\u0647\u0631 -->
                <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; transition: all .2s; cursor: default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width: 38px; height: 38px; background: #6366f1; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i class="fas fa-chart-line" style="color: #fff; font-size: 15px;"></i>
                    </div>
                    <div>
                        <div id="kpiMonthVisitors" style="font-size: 1.25rem; font-weight: 800; color: #4338ca; line-height: 1;">0</div>
                        <div style="font-size: 0.7rem; font-weight: 700; color: #3730a3; margin-top: 3px; white-space: nowrap;">\u0625\u062C\u0645\u0627\u0644\u064A \u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0634\u0647\u0631</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 \u0634\u0631\u064A\u0637 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0648\u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0645\u0646\u0645\u0642 \u0627\u0644\u0623\u0646\u064A\u0642 (\u0628\u062F\u0648\u0646 \u062A\u0643\u0633\u064A\u0631) \u2500\u2500 -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 16px; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between;">
                    <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; flex: 1; min-width: 280px;">
                        <div style="position: relative; flex: 1; min-width: 200px;">
                            <i class="fas fa-search" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 0.85rem; pointer-events: none;"></i>
                            <input type="text" id="gateVisitorSearchInput" placeholder="\u0628\u062D\u062B \u0633\u0631\u064A\u0639 \u0628\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0634\u0631\u0643\u0629\u060C \u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A..." style="width: 100%; height: 38px; padding: 0 34px 0 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.84rem; font-weight: 700; color: #1e293b; background: #f8fafc; outline: none; box-sizing: border-box;" oninput="GateSecurity.handleSearch(this.value)" onfocus="this.style.borderColor='#4f46e5';this.style.background='#fff'" onblur="this.style.borderColor='#cbd5e1';this.style.background='#f8fafc'">
                        </div>

                        <select id="gateFilterSite" style="height: 38px; padding: 0 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.84rem; font-weight: 700; color: #1e293b; background: #f8fafc; cursor: pointer; outline: none; box-sizing: border-box;" onchange="GateSecurity.handleFilterSite(this.value)" onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='#cbd5e1'">
                            <option value="all">\u{1F3E2} \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>
                            <option value="ICAPP-1">ICAPP-1</option>
                            <option value="ICAPP-2">ICAPP-2</option>
                            <option value="ICAPP-3">ICAPP-3</option>
                            <option value="ICAPP-4">ICAPP-4</option>
                            <option value="WH">\u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0639\u0627\u0645\u0629 (WH)</option>
                            <option value="\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A">\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A</option>
                            <option value="\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642</option>
                        </select>

                        <select id="gateFilterStatus" style="height: 38px; padding: 0 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.84rem; font-weight: 700; color: #1e293b; background: #f8fafc; cursor: pointer; outline: none; box-sizing: border-box;" onchange="GateSecurity.handleFilterStatus(this.value)" onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='#cbd5e1'">
                            <option value="all">\u26A1 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                            <option value="active" selected>\u{1F7E2} \u0628\u0627\u0644\u062F\u0627\u062E\u0644 \u062D\u0627\u0644\u064A\u0627\u064B (Onsite)</option>
                            <option value="exited">\u{1F6AA} \u062A\u0645 \u0627\u0644\u062E\u0631\u0648\u062C (Checked Out)</option>
                        </select>
                    </div>

                    <div>
                        <button type="button" onclick="GateSecurity.exportToExcel()" style="height: 38px; padding: 0 16px; background: #10b981; color: #ffffff; border: none; border-radius: 8px; font-size: 0.84rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; box-shadow: 0 2px 5px rgba(16, 185, 129, 0.25); white-space: nowrap;">
                            <i class="fas fa-file-excel"></i> \u062A\u0635\u062F\u064A\u0631 Excel
                        </button>
                    </div>
                </div>
            </div>

            <!-- \u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u0627\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="overflow-x: auto;">
                    <table class="table" style="width: 100%; margin-bottom: 0; font-size: 0.84rem; text-align: right;">
                        <thead style="background: #1e3a8a; color: #ffffff; font-weight: 900; border-bottom: 2px solid #1e40af;">
                            <tr>
                                <th style="padding: 13px 14px; color: #ffffff;">\u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A</th>
                                <th style="padding: 13px 14px; color: #ffffff;">\u0627\u0644\u0632\u0627\u0626\u0631 \u0648\u0627\u0644\u062C\u0647\u0629</th>
                                <th style="padding: 13px 14px; color: #ffffff;">\u0627\u0644\u0647\u0627\u062A\u0641 / \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A</th>
                                <th style="padding: 13px 14px; color: #ffffff;">\u0627\u0644\u0645\u0635\u0646\u0639 \u0648\u0627\u0644\u0635\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</th>
                                <th style="padding: 13px 14px; color: #ffffff;">\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641</th>
                                <th style="padding: 13px 14px; color: #ffffff;">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 / \u0627\u0644\u062E\u0631\u0648\u062C</th>
                                <th style="padding: 13px 14px; color: #ffffff;">\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0645\u0646\u0642\u0636\u064A\u0629</th>
                                <th style="padding: 13px 14px; color: #ffffff;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th style="padding: 13px 14px; text-align: center; color: #ffffff;">\u0625\u062C\u0631\u0627\u0621</th>
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
        `,this.loadVisitorsData(),this.startAutoRefresh()}getGatePortalUrl(){const e=window.location.origin||window.location.protocol+"//"+window.location.host,i=window.location.pathname;return i.includes("/Frontend/")?`${e}/Frontend/gate-visitor-entry.html`:i.includes("/dist/")?`${e}/dist/gate-visitor-entry.html`:`${e}/gate-visitor-entry.html`}copyGateLink(e){navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(e).then(()=>{typeof Utils<"u"&&Utils.showNotification?Utils.showNotification("\u062A\u0645 \u0646\u0633\u062E \u0631\u0627\u0628\u0637 \u062A\u0633\u062C\u064A\u0644 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D \u2705","success"):alert("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0628\u0646\u062C\u0627\u062D: "+e)}):prompt("\u0627\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A \u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0623\u0645\u0646 \u0639\u0646\u062F \u0627\u0644\u0628\u0648\u0627\u0628\u0629:",e)}async loadVisitorsData(){try{const e=localStorage.getItem("HSE_GATE_VISITORS_REGISTRY");if(this.visitors=e?JSON.parse(e):[],navigator.onLine)try{const i=this.getEffectiveApiUrl();let t=null;try{t=await(await fetch(i,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action:"getActiveGateVisitors",data:{}})})).json()}catch{t=await(await fetch(i+"?action=getActiveGateVisitors",{method:"GET",mode:"cors"})).json()}if(t&&t.success&&Array.isArray(t.activeVisitors)){const r=t.activeVisitors.map(n=>({...n,entryTimestamp:new Date(n.entryDate+" "+n.entryTime).getTime()||Date.now()})),o=new Map;this.visitors.forEach(n=>o.set(n.id,n)),r.forEach(n=>{const d=o.get(n.id);d&&d.exitTime||o.set(n.id,n)}),this.visitors=Array.from(o.values()).sort((n,d)=>(d.entryTimestamp||0)-(n.entryTimestamp||0)),localStorage.setItem("HSE_GATE_VISITORS_REGISTRY",JSON.stringify(this.visitors))}}catch{}this.populateSiteFilterOptions(),this.applyFilters(),this.updateKpis()}catch{}}getEffectiveApiUrl(){const e="https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec";try{const i=localStorage.getItem("HSE_SETTINGS_CACHE");if(i){const t=JSON.parse(i);if(t&&t.scriptUrl&&t.scriptUrl.includes("script.google.com"))return t.scriptUrl}}catch{}return e}updateKpis(){const e=new Date().toISOString().split("T")[0],i=e.slice(0,7),t=this.visitors.filter(f=>f.entryDate===e),r=this.visitors.filter(f=>!f.exitTime),o=this.visitors.filter(f=>f.entryDate&&f.entryDate.startsWith(i)),n=Date.now(),d=r.filter(f=>(n-(f.entryTimestamp||0))/6e4>=240).length,s=document.getElementById("kpiActiveVisitors");s&&(s.textContent=r.length);const c=document.getElementById("kpiTodayVisitors");c&&(c.textContent=t.length);const p=document.getElementById("kpiOverstayVisitors");p&&(p.textContent=d);const l=document.getElementById("kpiMonthVisitors");l&&(l.textContent=o.length)}populateSiteFilterOptions(){const e=document.getElementById("gateFilterSite");if(!e)return;const i=this.filterSite||"all",t=new Set;(this.visitors||[]).forEach(n=>{n.site&&String(n.site).trim()&&t.add(String(n.site).trim())}),["ICAPP-1","ICAPP-2","ICAPP-3","ICAPP-4","\u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0639\u0627\u0645\u0629 (WH)","\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642"].forEach(n=>t.add(n));let o='<option value="all">\u{1F3E2} \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>';Array.from(t).sort().forEach(n=>{o+=`<option value="${n}" ${i===n?"selected":""}>${n}</option>`}),e.innerHTML=o,e.value=i}applyFilters(){let e=[...this.visitors];if(this.filterSite!=="all"&&(e=e.filter(i=>{const t=(i.site||"").trim();return t===this.filterSite.trim()||t.includes(this.filterSite.trim())||this.filterSite.trim().includes(t)})),this.filterStatus==="active"?e=e.filter(i=>!i.exitTime):this.filterStatus==="exited"&&(e=e.filter(i=>!!i.exitTime)),this.searchQuery){const i=this.searchQuery.toLowerCase();e=e.filter(t=>t.name&&t.name.toLowerCase().includes(i)||t.org&&t.org.toLowerCase().includes(i)||t.badge&&t.badge.toLowerCase().includes(i)||t.host&&t.host.toLowerCase().includes(i)||t.phone&&t.phone.includes(i)||t.vehicle&&t.vehicle.toLowerCase().includes(i))}this.filteredVisitors=e,this.renderTable()}renderTable(){const e=document.getElementById("gateVisitorsTableBody");if(!e)return;if(this.filteredVisitors.length===0){e.innerHTML=`
                <tr>
                    <td colspan="9" style="text-align: center; padding: 36px 12px; color: var(--text-muted);">
                        <i class="fas fa-folder-open" style="font-size: 2rem; color: #94a3b8; display:block; margin-bottom: 8px;"></i>
                        <span style="font-weight: 700;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0632\u0648\u0627\u0631 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062D\u0627\u0644\u064A\u0629</span>
                    </td>
                </tr>
            `;return}const i=Date.now();e.innerHTML=this.filteredVisitors.map(t=>{const r=!t.exitTime,o=Math.round((i-(t.entryTimestamp||i))/6e4),n=Math.floor(o/60),d=o%60,s=r&&o>=240,c=r?n>0?`${n}\u0633 ${d}\u062F`:`${d}\u062F`:t.durationMinutes?`${t.durationMinutes} \u062F\u0642\u064A\u0642\u0629`:"\u0645\u0643\u062A\u0645\u0644";return`
                <tr style="border-bottom: 1px solid var(--border-color); ${s?"background: rgba(254, 242, 242, 0.6);":""}">
                    <td style="padding: 10px 14px; font-weight: 900; color: #1e40af;">
                        <span style="background: #dbeafe; color: #1e40af; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem; border: 1px solid #bfdbfe;">
                            \u{1F3F7}\uFE0F ${t.badge||"\u0628\u062F\u0648\u0646"}
                        </span>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 800; color: var(--text-primary);">${t.name}</div>
                        <div style="font-size: 0.76rem; color: #2563eb; font-weight: 700;"><i class="fas fa-building"></i> ${t.org}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 700;"><a href="tel:${t.phone}" style="color: inherit; text-decoration: none;">${t.phone||"-"}</a></div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A: ${t.idNumber||"-"}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 800; color: var(--text-primary);">${t.site}</div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">${t.area}</div>
                    </td>
                    <td style="padding: 10px 14px; font-weight: 700; color: var(--text-secondary);">
                        <i class="fas fa-user-tie text-blue-500"></i> ${t.host}
                    </td>
                    <td style="padding: 10px 14px; font-size: 0.78rem;">
                        <div><strong style="color: #10b981;">\u062F\u062E\u0648\u0644:</strong> ${t.entryTime} (${t.entryDate})</div>
                        <div><strong style="color: #64748b;">\u062E\u0631\u0648\u062C:</strong> ${t.exitTime||"\u2014"}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <span style="font-weight: 800; font-size: 0.78rem; ${s?"color: #dc2626; font-weight: 900;":"color: var(--text-secondary);"}">
                            ${c}
                            ${s?'<span style="display:block; font-size: 0.68rem; color: #dc2626;">\u26A0\uFE0F \u062A\u0623\u062E\u064A\u0631 +4\u0633</span>':""}
                        </span>
                    </td>
                    <td style="padding: 10px 14px;">
                        ${r?`
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
                        <button type="button" class="btn btn-sm" onclick="GateSecurity.shareVisitorWhatsApp('${t.id}')" style="background: #25D366; color: #ffffff; border: none; font-weight: 800; font-size: 0.75rem; border-radius: 6px; padding: 4px 8px; margin-left: 4px;" title="\u0645\u0634\u0627\u0631\u0643\u0629 \u0643\u0627\u0631\u062A \u0627\u0644\u0632\u0627\u0626\u0631 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        ${r?`
                            <button type="button" class="btn btn-sm" onclick="GateSecurity.adminForceCheckOut('${t.id}', '${t.badge}')" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; font-weight: 800; font-size: 0.75rem; border-radius: 6px; padding: 4px 10px;" title="\u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0625\u062F\u0627\u0631\u064A">
                                <i class="fas fa-door-open"></i> \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C
                            </button>
                        `:`
                            <span style="color: #94a3b8; font-size: 0.75rem;">\u2014</span>
                        `}
                    </td>
                </tr>
            `}).join("")}handleSearch(e){this.searchQuery=e.trim(),this.applyFilters()}handleFilterSite(e){this.filterSite=e,this.applyFilters()}handleFilterStatus(e){this.filterStatus=e,this.applyFilters()}async adminForceCheckOut(e,i){if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0647\u0630\u0627 \u0627\u0644\u0632\u0627\u0626\u0631 \u0625\u062F\u0627\u0631\u064A\u0627\u064B\u061F"))return;const t=this.visitors.findIndex(r=>r.id===e);if(t!==-1){const r=new Date,o=r.toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"});this.visitors[t].exitTime=o,this.visitors[t].exitTimestamp=r.getTime(),localStorage.setItem("HSE_GATE_VISITORS_REGISTRY",JSON.stringify(this.visitors)),this.applyFilters(),this.updateKpis();try{const n=this.getEffectiveApiUrl();await fetch(n,{method:"POST",mode:"cors",redirect:"follow",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action:"submitGateVisitorCheckOut",id:e,exitTime:o,badge:i})})}catch{}typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C \u0627\u0644\u0632\u0627\u0626\u0631 \u0628\u0646\u062C\u0627\u062D \u2705","success")}}refreshData(){this.loadVisitorsData(),typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D \u{1F504}","info")}startAutoRefresh(){this.autoRefreshTimer&&clearInterval(this.autoRefreshTimer),this.autoRefreshTimer=setInterval(()=>{this.loadVisitorsData()},3e4)}printEmergencyMusterList(){const e=this.visitors.filter(r=>!r.exitTime),i=window.open("","_blank"),t=new Date;i.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0643\u0634\u0641 \u0627\u0633\u0645\u0627\u0621 \u0627\u0644\u0632\u0627\u0626\u0631\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 - ICAPP</title>
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
                            .no-print-bar { display: none !important; }
                        .print-btn-wrap { display: none !important; }
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                    <!-- \u0634\u0631\u064A\u0637 \u0623\u062F\u0648\u0627\u062A \u0639\u0644\u0648\u064A \u0644\u0644\u0637\u0628\u0627\u0639\u0629 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0648\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0646\u0645\u0648\u0630\u062C -->
                    <div class="no-print-bar" style="position: sticky; top: 0; z-index: 9999; background: #0f172a; color: #ffffff; padding: 12px 18px; margin: -10px -10px 18px -10px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.25); border-bottom: 2px solid #3b82f6;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="background: #dc2626; color: #ffffff; padding: 4px 10px; border-radius: 6px; font-weight: 900; font-size: 11px;">ICAPP EMERGENCY</span>
                            <span style="font-weight: 800; font-size: 13px;">\u{1F6A8} \u0643\u0634\u0641 \u062D\u0635\u0631 \u0648\u062A\u062A\u0628\u0639 \u0627\u0644\u0632\u0627\u0626\u0631\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639</span>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <button onclick="window.print()" style="padding: 8px 18px; background: #2563eb; color: #ffffff; border: none; border-radius: 8px; font-weight: 800; font-size: 12.5px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(37,99,235,0.4);">
                                \u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0643\u0634\u0641
                            </button>
                            <button onclick="window.close()" style="padding: 8px 18px; background: #dc2626; color: #ffffff; border: none; border-radius: 8px; font-weight: 800; font-size: 12.5px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(220,38,38,0.4);">
                                \u274C \u0639\u0648\u062F\u0629 / \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629
                            </button>
                        </div>
                    </div>
                <!-- \u062A\u0631\u0648\u064A\u0633\u0629 ISO \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 -->
                <div class="iso-print-header">
                    <div class="iso-box-brand">
                        <img src="icons/icapp-logo.png" alt="ICAPP" class="iso-print-logo" onerror="this.src='icons/icapp-logo.png'">
                        <div class="iso-dept-title">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                    </div>

                    <div class="iso-box-title">
                        <h1 class="iso-main-title">\u{1F6A8} \u0643\u0634\u0641 \u0627\u0633\u0645\u0627\u0621 \u0627\u0644\u0632\u0627\u0626\u0631\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h1>
                        <div class="iso-sub-title">Onsite Visitors & Contractors List</div>
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
                            <strong>${t.toLocaleDateString("ar-EG")} ${t.toLocaleTimeString("ar-EG")}</strong>
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
                            ${e.map((r,o)=>`
                                <tr>
                                    <td style="text-align: center;">${o+1}</td>
                                    <td><strong>${r.badge||"-"}</strong></td>
                                    <td><strong>${r.name}</strong></td>
                                    <td>${r.org}</td>
                                    <td>${r.site}</td>
                                    <td>${r.area}</td>
                                    <td>${r.host}</td>
                                    <td>${r.entryTime}</td>
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
        `),i.document.close()}printGateQrPoster(){const e=this.getGatePortalUrl(),i=`https://api.qrserver.com/v1/create-qr-code/?size=480x480&format=png&margin=0&data=${encodeURIComponent(e)}`,t=window.open("","_blank");if(!t){alert("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0628\u0648\u0633\u062A\u0631 (Pop-ups)");return}t.document.write(`
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
                            <img src="${i}" alt="Gate Entry QR Code" class="qr-img" onerror="this.src='https://chart.googleapis.com/chart?cht=qr&chs=450x450&chl=${encodeURIComponent(e)}';">
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
                            <div class="footer-box-title">\u0645\u062F\u064A\u0631 \u0627\u0644\u0623\u0645\u0646 - \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0623\u0645\u0646</div>
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
        `),t.document.close()}getMapConfig(){const e=localStorage.getItem("icapp_visitor_map_config");if(e)try{return JSON.parse(e)}catch{}return{coords:`30\xB024'12.4"N 31\xB018'45.2"E`,siteName:"\u0645\u062C\u0645\u0639 \u0645\u0635\u0627\u0646\u0639 ICAPP \u0627\u0644\u0645\u0639\u0627\u062F\u064A \u0648\u0627\u0644\u0625\u0633\u0645\u0627\u0639\u064A\u0644\u064A\u0629",frameScale:100,frameBg:"#f1f5f9",musterPoints:[{id:"m1",name:"\u0646\u0642\u0637\u0629 1",desc:"\u0627\u0644\u0633\u0627\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0623\u0645\u0627\u0645 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",x:145,y:140},{id:"m2",name:"\u0646\u0642\u0637\u0629 2",desc:"\u0633\u0627\u062D\u0629 \u0631\u0635\u064A\u0641 \u0627\u0644\u0634\u062D\u0646 \u0648\u0627\u0644\u0645\u062E\u0627\u0632\u0646",x:410,y:240},{id:"m3",name:"\u0646\u0642\u0637\u0629 3",desc:"\u0628\u062C\u0648\u0627\u0631 \u0645\u062D\u0637\u0629 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0648\u0627\u0644\u0641\u0646\u064A\u0629",x:110,y:310},{id:"m4",name:"\u0646\u0642\u0637\u0629 4",desc:"\u0627\u0644\u0633\u0627\u062D\u0629 \u0627\u0644\u0634\u0631\u0642\u064A\u0629 \u0644\u0644\u0645\u0635\u0646\u0639",x:270,y:30}],buildings:[{id:"b1",name:"\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A",sub:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u0627\u0644\u0645\u062E\u062A\u0628\u0631",x:50,y:50,w:120,h:60,fill:"#dbeafe",stroke:"#1d4ed8",color:"#1e3a8a"},{id:"b2",name:"\u0645\u0635\u0646\u0639 ICAPP-1",sub:"\u062E\u0637\u0648\u0637 \u0627\u0644\u0641\u0627\u0643\u0647\u0629 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639",x:190,y:50,w:160,h:120,fill:"#fef3c7",stroke:"#d97706",color:"#92400e"},{id:"b3",name:"\u0645\u0635\u0627\u0646\u0639 ICAPP-2 & 3",sub:"\u0627\u0644\u062A\u062C\u0645\u064A\u062F \u0648\u0627\u0644\u0645\u0631\u0643\u0632\u0627\u062A",x:190,y:190,w:160,h:115,fill:"#ede9fe",stroke:"#6d28d9",color:"#5b21b6"},{id:"b4",name:"\u0627\u0644\u0645\u062E\u0627\u0632\u0646 WH",sub:"\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0627\u0645 \u0648\u0627\u0644\u062A\u0639\u0628\u0626\u0629",x:370,y:50,w:80,h:160,fill:"#f1f5f9",stroke:"#475569",color:"#334155"},{id:"b5",name:"\u0645\u062D\u0637\u0629 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0641\u0646\u064A\u0629",sub:"\u0648\u0627\u0644\u0637\u0627\u0642\u0629 (ICAPP-4)",x:50,y:190,w:120,h:115,fill:"#fce7f3",stroke:"#be185d",color:"#9d174d"}],safetyIcons:[{id:"s1",name:"\u0645\u0637\u0641\u0623\u0629 \u062D\u0631\u064A\u0642",icon:"\u{1F9EF}",x:360,y:220,color:"#dc2626"},{id:"s2",name:"\u0645\u062E\u0631\u062C \u0637\u0648\u0627\u0631\u0626",icon:"\u{1F6AA}",x:18,y:135,color:"#16a34a"},{id:"s3",name:"\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0623\u0648\u0644\u064A\u0629",icon:"\u2795",x:160,y:60,color:"#16a34a"},{id:"s4",name:"\u0645\u0646\u0637\u0642\u0629 \u062E\u0637\u0631\u0629",icon:"\u26A0\uFE0F",x:60,y:200,color:"#d97706"}]}}saveMapConfig(e){localStorage.setItem("icapp_visitor_map_config",JSON.stringify(e)),alert("\u062A\u0645 \u062D\u0641\u0638 \u0645\u062E\u0637\u0637 \u0627\u0644\u062E\u0631\u064A\u0637\u0629\u060C \u0627\u0644\u0623\u0645\u0627\u0643\u0646\u060C \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0648\u062A\u0643\u0628\u064A\u0631 \u0627\u0644\u0625\u0637\u0627\u0631 \u0628\u0646\u062C\u0627\u062D! \u0633\u064A\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627 \u0641\u064A \u0643\u0627\u0641\u0629 \u0627\u0644\u0643\u0631\u0648\u062A \u0627\u0644\u0645\u0637\u0628\u0648\u0639\u0629.")}openMapEditorModal(){const e=this.getMapConfig();window._currentEditorConfig=JSON.parse(JSON.stringify(e)),window._selectedItem=null,window._drawMode=!1,window._resizeState=null,window._mapEditorKeyHandler&&window.removeEventListener("keydown",window._mapEditorKeyHandler),window._mapEditorKeyHandler=t=>{if(document.getElementById("mapEditorModal")&&(t.key==="Delete"||t.key==="Backspace")){if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;window._selectedItem&&(t.preventDefault(),GateSecurity.deleteSelectedItem())}},window.addEventListener("keydown",window._mapEditorKeyHandler);let i=`
            <div id="mapEditorModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.85); backdrop-filter: blur(6px); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 8px;">
                <div id="mapEditorContainer" style="background: #ffffff; width: 100%; max-width: 1250px; max-height: 96vh; transition: all 0.25s ease; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35); border: 1px solid #cbd5e1; direction: rtl; display: flex; flex-direction: column;">
                    <!-- Modal Header -->
                    <div style="background: #1e3a8a; color: #ffffff; padding: 10px 18px; border-top-left-radius: 16px; border-top-right-radius: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-drafting-compass" style="font-size: 1.4rem; color: #60a5fa;"></i>
                            <div>
                                <h3 style="margin: 0; font-size: 1.05rem; font-weight: 900;">\u0645\u0635\u0645\u0645 \u0648\u0645\u062D\u0631\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A (Interactive Canvas & Layout Designer)</h3>
                                <span style="font-size: 0.75rem; color: #bfdbfe;">\u0627\u0633\u062D\u0628 \u0628\u0627\u0644\u0645\u0627\u0648\u0633 \u0644\u0644\u062A\u062D\u0631\u064A\u0643 \u0648\u0627\u0644\u062A\u062D\u062C\u064A\u0645 | \u0632\u0631 Delete \u0628\u0627\u0644\u0643\u064A\u0628\u0648\u0631\u062F \u0644\u0644\u062D\u0630\u0641 | \u0633\u062D\u0628 \u0645\u0642\u0627\u0628\u0636 \u0627\u0644\u0632\u0648\u0627\u064A\u0627 \u0644\u062A\u0643\u0628\u064A\u0631 \u0648\u062A\u0635\u063A\u064A\u0631 \u0627\u0644\u0623\u0628\u0639\u0627\u062F</span>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; gap: 8px;">
                            <button type="button" id="toggleDrawModeBtn" onclick="GateSecurity.toggleDrawMode()" style="background: #0284c7; color: #ffffff; border: none; padding: 6px 14px; border-radius: 8px; font-weight: 800; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                                <i class="fas fa-pencil-alt"></i> <span id="drawModeBtnText">\u062A\u0641\u0639\u064A\u0644 \u0648\u0636\u0639 \u0631\u0633\u0645 \u0645\u0648\u0642\u0639 \u0628\u0627\u0644\u0645\u0627\u0648\u0633</span>
                            </button>
                            <button type="button" onclick="GateSecurity.toggleEditorFullscreen()" style="background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); color: #ffffff; padding: 6px 14px; border-radius: 8px; font-weight: 800; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                                <i id="fsIcon" class="fas fa-expand"></i> <span id="fsBtnText">\u0648\u0636\u0639 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629</span>
                            </button>
                            <button onclick="GateSecurity.closeMapEditorModal()" style="background: rgba(255,255,255,0.15); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-weight: 900; font-size: 1.1rem;">\u2715</button>
                        </div>
                    </div>

                    <!-- Modal Body Split Layout with FIXED SIDEBAR WIDTH -->
                    <div id="editorBodyGrid" style="padding: 12px; display: flex; gap: 14px; flex: 1; overflow: hidden; height: calc(100% - 60px);">
                        <!-- \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0623\u064A\u0645\u0646: \u0644\u0648\u062D\u0629 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 MOUSE CANVAS -->
                        <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; height: 100%;">
                            <!-- \u0634\u0631\u064A\u0637 \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u0643\u0628\u064A\u0631 \u0648\u0627\u0644\u062A\u0635\u063A\u064A\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0648\u0627\u0644\u0645\u062D\u0633\u0651\u0646 -->
                            <div style="display: flex; justify-content: space-between; align-items: center; background: #f1f5f9; padding: 6px 12px; border-radius: 8px; border: 1px solid #cbd5e1; flex-wrap: wrap; gap: 6px;">
                                <span style="font-weight: 900; font-size: 0.84rem; color: #1e3a8a;"><i class="fas fa-mouse-pointer"></i> \u0644\u0648\u062D\u0629 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 (\u0627\u0646\u0642\u0631 \u0648\u0627\u0633\u062D\u0628 \u0628\u0627\u0644\u0645\u0627\u0648\u0633):</span>
                                
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <button type="button" onclick="GateSecurity.stepEditorFrameScale(-10)" style="background: #ffffff; border: 1px solid #cbd5e1; padding: 2px 10px; border-radius: 4px; font-weight: 900; font-size: 0.85rem; cursor: pointer;">-</button>
                                    <input type="range" id="frameScaleRange" min="50" max="200" value="${e.frameScale||100}" oninput="GateSecurity.updateEditorFrameScale(this.value)" style="width: 110px; cursor: pointer;">
                                    <button type="button" onclick="GateSecurity.stepEditorFrameScale(10)" style="background: #ffffff; border: 1px solid #cbd5e1; padding: 2px 10px; border-radius: 4px; font-weight: 900; font-size: 0.85rem; cursor: pointer;">+</button>
                                    <button type="button" onclick="GateSecurity.updateEditorFrameScale(100)" style="background: #e2e8f0; border: 1px solid #cbd5e1; padding: 2px 8px; border-radius: 4px; font-weight: 800; font-size: 0.72rem; cursor: pointer;">100%</button>
                                    <span id="scaleValText" style="font-size: 0.8rem; font-weight: 900; color: #15803d; min-width: 45px; text-align: center;">${e.frameScale||100}%</span>
                                </div>
                            </div>

                            <!-- \u0627\u0644\u0640 SVG \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A \u0627\u0644\u0633\u062D\u0628 \u0648\u0627\u0644\u0625\u0641\u0644\u0627\u062A \u0648\u0627\u0644\u0631\u0633\u0645 \u0648\u0627\u0644\u062A\u062D\u062C\u064A\u0645 -->
                            <div id="canvasViewport" style="border: 2px solid #334155; border-radius: 10px; background: ${e.frameBg||"#f1f5f9"}; overflow: auto; position: relative; width: 100%; height: 440px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 2px 6px rgba(0,0,0,0.1); transition: height 0.25s ease;">
                                <svg id="interactiveCanvasSvg" viewBox="0 0 500 360" style="width: 100%; height: 100%; cursor: default; user-select: none;" onmousedown="GateSecurity.handleCanvasMouseDown(event)" onmousemove="GateSecurity.handleCanvasMouseMove(event)" onmouseup="GateSecurity.handleCanvasMouseUp(event)">
                                    <!-- background frame -->
                                    <rect x="10" y="10" width="480" height="340" rx="8" fill="#ffffff" stroke="#334155" stroke-width="2.5" stroke-dasharray="6,4"/>
                                    <rect x="20" y="20" width="460" height="320" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
                                    <rect x="35" y="35" width="430" height="290" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>

                                    <g id="svgBuildingsGroup"></g>
                                    <g id="svgMusterPointsGroup"></g>
                                    <g id="svgSafetyIconsGroup"></g>
                                    <g id="svgSelectionGroup"></g>
                                    <g id="svgDrawingPreviewGroup"></g>

                                    <!-- North compass -->
                                    <g transform="translate(450, 45)">
                                        <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
                                        <polygon points="0,-12 4,0 0,-2 -4,0" fill="#dc2626"/>
                                        <polygon points="0,12 4,0 0,2 -4,0" fill="#0f172a"/>
                                        <text x="0" y="-15" font-size="9" font-weight="900" fill="#dc2626" text-anchor="middle">N</text>
                                    </g>
                                </svg>
                            </div>
                            <div style="font-size: 0.74rem; color: #334155; text-align: center; font-weight: 800; background: #f8fafc; padding: 6px; border-radius: 6px; border: 1px solid #cbd5e1;">
                                \u{1F4A1} \u0633\u062D\u0628 \u0623\u064A \u0632\u0627\u0648\u064A\u0629 \u0632\u0631\u0642\u0627\u0621 \u0644\u0644\u0645\u0648\u0642\u0639 \u0644\u0644\u062A\u0643\u0628\u064A\u0631/\u0627\u0644\u062A\u0635\u063A\u064A\u0631 \u0628\u0627\u0644\u0645\u0627\u0648\u0633 | \u0627\u0636\u063A\u0637 <b style="color:#dc2626;">Delete</b> \u0628\u0627\u0644\u0643\u064A\u0628\u0648\u0631\u062F \u0644\u0644\u062D\u0630\u0641
                            </div>
                        </div>

                        <!-- \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0623\u064A\u0633\u0631: \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0648\u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 (Sidebar) \u0628\u0623\u0633\u0644\u0648\u0628 \u062B\u0627\u0628\u062A \u0648\u0648\u0627\u0636\u062D -->
                        <div id="editorSidebar" style="width: 380px; min-width: 340px; flex-shrink: 0; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; max-height: 100%; padding: 10px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px;">
                            <!-- \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0648\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0648\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 -->
                            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
                                    <div>
                                        <label style="font-size: 0.78rem; font-weight: 800; color: #1e3a8a; display: block; margin-bottom: 2px;">\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A GPS:</label>
                                        <input type="text" id="editMapCoords" value="${e.coords}" style="width: 100%; padding: 5px 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 700; font-size: 0.8rem;">
                                    </div>
                                    <div>
                                        <label style="font-size: 0.78rem; font-weight: 800; color: #1e3a8a; display: block; margin-bottom: 2px;">\u0644\u0648\u0646 \u0625\u0637\u0627\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:</label>
                                        <select id="editFrameBg" onchange="GateSecurity.updateEditorFrameBg(this.value)" style="width: 100%; padding: 5px 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 700; font-size: 0.8rem;">
                                            <option value="#f1f5f9" ${e.frameBg==="#f1f5f9"?"selected":""}>\u0631\u0645\u0627\u062F\u064A \u0641\u0627\u062A\u062D (\u0627\u0641\u062A\u0631\u0627\u0636\u064A)</option>
                                            <option value="#ffffff" ${e.frameBg==="#ffffff"?"selected":""}>\u0623\u0628\u064A\u0636 \u0646\u0627\u0635\u0639</option>
                                            <option value="#e2e8f0" ${e.frameBg==="#e2e8f0"?"selected":""}>\u0631\u0645\u0627\u062F\u064A \u062F\u0627\u0641\u0626</option>
                                            <option value="#ecfdf5" ${e.frameBg==="#ecfdf5"?"selected":""}>\u0623\u062E\u0636\u0631 \u0633\u0644\u0627\u0645\u0629 \u0647\u0627\u062F\u0626</option>
                                        </select>
                                    </div>
                                </div>
                                <div style="border-top: 1px dashed #cbd5e1; padding-top: 8px;">
                                    <label style="font-size: 0.78rem; font-weight: 900; color: #dc2626; display: block; margin-bottom: 4px;">
                                        <i class="fas fa-phone-alt"></i> \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0627\u0644\u0645\u0637\u0628\u0648\u0639\u0629 \u0639\u0644\u0649 \u0643\u0627\u0631\u062A \u0627\u0644\u0632\u0627\u0626\u0631:
                                    </label>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                                        <div>
                                            <span style="font-size: 0.7rem; color: #475569; font-weight: 700;">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641:</span>
                                            <input type="text" id="editEmergencyPhone" value="${e.emergencyPhone||"0100000000"}" placeholder="0100000000" style="width: 100%; padding: 4px 6px; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 700; font-size: 0.78rem;">
                                        </div>
                                        <div>
                                            <span style="font-size: 0.7rem; color: #475569; font-weight: 700;">\u0627\u0644\u062F\u0627\u062E\u0644\u064A (Ext):</span>
                                            <input type="text" id="editEmergencyExt" value="${e.emergencyExt||"100"}" placeholder="100" style="width: 100%; padding: 4px 6px; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 700; font-size: 0.78rem;">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0628\u0639 \u0631\u0633\u0645 \u0645\u0648\u0642\u0639 / \u0645\u0646\u0637\u0642\u0629 \u062C\u062F\u064A\u062F\u0629 -->
                            <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 10px; padding: 10px; max-width: 100%; box-sizing: border-box;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                                    <span style="font-size: 0.86rem; font-weight: 900; color: #1e3a8a;"><i class="fas fa-vector-square"></i> \u0631\u0633\u0645 \u0648\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0628\u0627\u0646\u064A:</span>
                                    <button type="button" onclick="GateSecurity.addEditorBuildingZone()" style="background: #2563eb; color: #fff; border: none; padding: 5px 12px; border-radius: 6px; font-weight: 800; font-size: 0.78rem; cursor: pointer; box-shadow: 0 2px 5px rgba(37,99,235,0.25);">
                                        + \u0631\u0633\u0645 \u0645\u0648\u0642\u0639 \u062C\u062F\u064A\u062F
                                    </button>
                                </div>
                                <div id="editorBuildingsList" style="display: flex; flex-direction: column; gap: 6px; max-height: 220px; overflow-y: auto; overflow-x: auto; max-width: 100%; box-sizing: border-box; padding: 2px;"></div>
                            </div>

                            <!-- \u0625\u0636\u0627\u0641\u0629 \u0639\u0644\u0627\u0645\u0627\u062A \u0648\u0623\u064A\u0642\u0648\u0646\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 -->
                            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px;">
                                <h4 style="margin: 0 0 6px; font-size: 0.84rem; font-weight: 900; color: #1e40af; display: flex; align-items: center; gap: 6px;">
                                    <i class="fas fa-plus-circle"></i> \u0625\u0636\u0627\u0641\u0629 \u0623\u064A\u0642\u0648\u0646\u0627\u062A \u0648\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Safety Signs)
                                </h4>
                                <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 6px;">
                                    <button type="button" onclick="GateSecurity.addEditorSafetyIcon('\u{1F9EF}', '\u0645\u0637\u0641\u0623\u0629 \u062D\u0631\u064A\u0642', '#dc2626')" style="background: #ffffff; border: 1px solid #fca5a5; color: #dc2626; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">\u{1F9EF} \u0645\u0637\u0641\u0623\u0629 \u062D\u0631\u064A\u0642</button>
                                    <button type="button" onclick="GateSecurity.addEditorSafetyIcon('\u{1F6AA}', '\u0645\u062E\u0631\u062C \u0637\u0648\u0627\u0631\u0626', '#16a34a')" style="background: #ffffff; border: 1px solid #86efac; color: #16a34a; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">\u{1F6AA} \u0645\u062E\u0631\u062C \u0637\u0648\u0627\u0631\u0626</button>
                                    <button type="button" onclick="GateSecurity.addEditorSafetyIcon('\u2795', '\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0623\u0648\u0644\u064A\u0629', '#16a34a')" style="background: #ffffff; border: 1px solid #86efac; color: #16a34a; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">\u2795 \u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0623\u0648\u0644\u064A\u0629</button>
                                    <button type="button" onclick="GateSecurity.addEditorSafetyIcon('\u26A0\uFE0F', '\u0639\u0644\u0627\u0645\u0629 \u062E\u0637\u0648\u0631\u0629', '#d97706')" style="background: #ffffff; border: 1px solid #fde68a; color: #b45309; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">\u26A0\uFE0F \u0645\u0646\u0637\u0642\u0629 \u062E\u0637\u0631\u0629</button>
                                    <button type="button" onclick="GateSecurity.addEditorSafetyIcon('\u{1F6AD}', '\u0645\u0645\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u062E\u064A\u0646', '#dc2626')" style="background: #ffffff; border: 1px solid #fca5a5; color: #dc2626; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">\u{1F6AD} \u0645\u0646\u0639 \u062A\u062F\u062E\u064A\u0646</button>
                                    <button type="button" onclick="GateSecurity.addEditorSafetyIcon('\u{1F4A7}', '\u062F\u0634 \u0637\u0648\u0627\u0631\u0626', '#0284c7')" style="background: #ffffff; border: 1px solid #7dd3fc; color: #0284c7; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">\u{1F4A7} \u062F\u0634 \u0637\u0648\u0627\u0631\u0626</button>
                                    <button type="button" onclick="GateSecurity.addEditorSafetyIcon('\u{1F97D}', '\u0645\u0647\u0645\u0627\u062A \u0648\u0642\u0627\u064A\u0629', '#4f46e5')" style="background: #ffffff; border: 1px solid #c7d2fe; color: #4338ca; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">\u{1F97D} \u0645\u0647\u0645\u0627\u062A PPE</button>
                                </div>
                                <div id="editorSafetyIconsList" style="display: flex; flex-direction: column; gap: 4px; max-height: 110px; overflow-y: auto;"></div>
                            </div>

                            <!-- \u0642\u0627\u0626\u0645\u0629 \u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 -->
                            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                    <span style="font-size: 0.84rem; font-weight: 900; color: #15803d;"><i class="fas fa-flag"></i> \u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 (Muster Points):</span>
                                    <button type="button" onclick="GateSecurity.addEditorMusterPoint()" style="background: #15803d; color: #fff; border: none; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">
                                        + \u0625\u0636\u0627\u0641\u0629 \u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639
                                    </button>
                                </div>
                                <div id="editorMusterList" style="display: flex; flex-direction: column; gap: 5px; max-height: 110px; overflow-y: auto;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div style="background: #f1f5f9; padding: 10px 18px; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0;">
                        <button type="button" onclick="GateSecurity.resetMapConfigToDefault()" style="background: #cbd5e1; color: #334155; border: none; padding: 6px 14px; border-radius: 8px; font-weight: 800; font-size: 0.8rem; cursor: pointer;">
                            <i class="fas fa-rotate-left"></i> \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A
                        </button>

                        <div style="display: flex; gap: 10px;">
                            <button type="button" onclick="GateSecurity.closeMapEditorModal()" style="background: #ffffff; border: 1.5px solid #cbd5e1; color: #475569; padding: 6px 14px; border-radius: 8px; font-weight: 800; font-size: 0.8rem; cursor: pointer;">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="button" onclick="GateSecurity.saveEditorMapConfig()" style="background: #15803d; color: #ffffff; border: none; padding: 8px 22px; border-radius: 8px; font-weight: 900; font-size: 0.88rem; cursor: pointer; box-shadow: 0 4px 12px rgba(21,128,61,0.25);">
                                <i class="fas fa-save"></i> \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0637\u0637 \u0648\u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0648\u0627\u0644\u0637\u0628\u0627\u0639\u0629
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;document.body.insertAdjacentHTML("beforeend",i),this.renderEditorCanvas()}closeMapEditorModal(){window._mapEditorKeyHandler&&(window.removeEventListener("keydown",window._mapEditorKeyHandler),window._mapEditorKeyHandler=null);const e=document.getElementById("mapEditorModal");e&&e.remove()}toggleDrawMode(){window._drawMode=!window._drawMode;const e=document.getElementById("toggleDrawModeBtn"),i=document.getElementById("drawModeBtnText"),t=document.getElementById("interactiveCanvasSvg");window._drawMode?(e&&(e.style.background="#dc2626"),i&&(i.textContent="\u0625\u064A\u0642\u0627\u0641 \u0648\u0636\u0639 \u0631\u0633\u0645 \u0645\u0648\u0642\u0639 (\u0627\u0646\u0642\u0631 \u0648\u0627\u0633\u062D\u0628 \u0644\u0631\u0633\u0645 \u0645\u0631\u0628\u0639)"),t&&(t.style.cursor="crosshair")):(e&&(e.style.background="#0284c7"),i&&(i.textContent="\u062A\u0641\u0639\u064A\u0644 \u0648\u0636\u0639 \u0631\u0633\u0645 \u0645\u0648\u0642\u0639 \u0628\u0627\u0644\u0645\u0627\u0648\u0633"),t&&(t.style.cursor="default"))}toggleEditorFullscreen(){const e=document.getElementById("mapEditorContainer"),i=document.getElementById("canvasViewport"),t=document.getElementById("editorSidebar"),r=document.getElementById("fsBtnText"),o=document.getElementById("fsIcon");e&&(e.classList.contains("is-fullscreen")?(e.classList.remove("is-fullscreen"),e.style.width="100%",e.style.height="auto",e.style.maxWidth="1250px",e.style.maxHeight="96vh",e.style.borderRadius="16px",i&&(i.style.height="440px"),t&&(t.style.width="380px",t.style.minWidth="340px"),r&&(r.textContent="\u0648\u0636\u0639 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"),o&&(o.className="fas fa-expand")):(e.classList.add("is-fullscreen"),e.style.width="99vw",e.style.height="98vh",e.style.maxWidth="100vw",e.style.maxHeight="100vh",e.style.borderRadius="0",i&&(i.style.height="calc(98vh - 160px)"),t&&(t.style.width="420px",t.style.minWidth="380px"),r&&(r.textContent="\u0625\u0644\u063A\u0627\u0621 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"),o&&(o.className="fas fa-compress")))}stepEditorFrameScale(e){if(!window._currentEditorConfig)return;const i=window._currentEditorConfig.frameScale||100,t=Math.max(50,Math.min(200,i+e)),r=document.getElementById("frameScaleRange");r&&(r.value=t),this.updateEditorFrameScale(t)}updateEditorFrameScale(e){if(!window._currentEditorConfig)return;window._currentEditorConfig.frameScale=parseInt(e)||100;const i=document.getElementById("scaleValText");i&&(i.textContent=e+"%"),this.renderEditorCanvas()}updateEditorFrameBg(e){if(!window._currentEditorConfig)return;window._currentEditorConfig.frameBg=e;const i=document.getElementById("canvasViewport");i&&(i.style.background=e)}deleteSelectedItem(){if(!window._selectedItem||!window._currentEditorConfig)return;const{type:e,idx:i}=window._selectedItem;e==="building"?this.removeBuilding(i):e==="muster"?this.removeMuster(i):e==="icon"&&this.removeSafetyIcon(i),window._selectedItem=null,this.renderEditorCanvas()}renderEditorCanvas(){const e=window._currentEditorConfig;if(!e)return;const i=(e.frameScale||100)/100,t=document.getElementById("interactiveCanvasSvg");t&&(t.style.transform=`scale(${i})`,t.style.transformOrigin="center center");const r=document.getElementById("svgBuildingsGroup");r&&(r.innerHTML=e.buildings.map((s,c)=>`
                <g class="draggable-item" data-type="building" data-idx="${c}" transform="translate(${s.x}, ${s.y})" style="cursor: move;">
                    <rect width="${s.w}" height="${s.h}" rx="4" fill="${s.fill}" stroke="${s.stroke}" stroke-width="2.5"/>
                    <text x="${s.w/2}" y="${s.h/2-(s.sub?4:0)}" font-size="11.5" font-weight="900" fill="${s.color}" text-anchor="middle" font-family="Segoe UI">${s.name}</text>
                    ${s.sub?`<text x="${s.w/2}" y="${s.h/2+12}" font-size="8.5" font-weight="700" fill="${s.stroke}" text-anchor="middle" font-family="Segoe UI">${s.sub}</text>`:""}
                </g>
            `).join(""));const o=document.getElementById("svgMusterPointsGroup");o&&(o.innerHTML=e.musterPoints.map((s,c)=>`
                <g class="draggable-item" data-type="muster" data-idx="${c}" transform="translate(${s.x}, ${s.y})" style="cursor: move;">
                    <rect x="-24" y="-14" width="48" height="28" rx="4" fill="#15803d" stroke="#ffffff" stroke-width="1.5"/>
                    <text x="0" y="3" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="Segoe UI">${s.name}</text>
                </g>
            `).join(""));const n=document.getElementById("svgSafetyIconsGroup");n&&(n.innerHTML=(e.safetyIcons||[]).map((s,c)=>`
                <g class="draggable-item" data-type="icon" data-idx="${c}" transform="translate(${s.x}, ${s.y})" style="cursor: move;">
                    <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="${s.color||"#dc2626"}" stroke-width="2"/>
                    <text x="0" y="5" font-size="14" text-anchor="middle">${s.icon}</text>
                </g>
            `).join(""));const d=document.getElementById("svgSelectionGroup");if(d)if(window._selectedItem){const{type:s,idx:c}=window._selectedItem,p=s==="building"?"buildings":s==="muster"?"musterPoints":"safetyIcons",l=e[p]?e[p][c]:null;l?s==="building"?d.innerHTML=`
                            <g transform="translate(${l.x}, ${l.y})">
                                <!-- Dashed selection outline -->
                                <rect x="-4" y="-4" width="${l.w+8}" height="${l.h+8}" rx="6" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,3"/>
                                
                                <!-- Delete button icon at top right -->
                                <circle cx="${l.w+4}" cy="-4" r="10" fill="#ef4444" cursor="pointer" onclick="GateSecurity.deleteSelectedItem()"/>
                                <text x="${l.w+4}" y="-1" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" cursor="pointer" onclick="GateSecurity.deleteSelectedItem()">\u2715</text>

                                <!-- Bottom-Right corner resize handle (SE) -->
                                <rect class="resize-handle" data-handle="se" x="${l.w-5}" y="${l.h-5}" width="12" height="12" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" style="cursor: nwse-resize;"/>
                                
                                <!-- Right edge resize handle (E) -->
                                <rect class="resize-handle" data-handle="e" x="${l.w-5}" y="${l.h/2-6}" width="12" height="12" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" style="cursor: ew-resize;"/>

                                <!-- Bottom edge resize handle (S) -->
                                <rect class="resize-handle" data-handle="s" x="${l.w/2-6}" y="${l.h-5}" width="12" height="12" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" style="cursor: ns-resize;"/>
                            </g>
                        `:s==="muster"?d.innerHTML=`
                            <g transform="translate(${l.x}, ${l.y})">
                                <rect x="-28" y="-18" width="56" height="36" rx="6" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,3"/>
                                <circle cx="28" cy="-18" r="10" fill="#ef4444" cursor="pointer" onclick="GateSecurity.deleteSelectedItem()"/>
                                <text x="28" y="-15" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" cursor="pointer" onclick="GateSecurity.deleteSelectedItem()">\u2715</text>
                            </g>
                        `:s==="icon"&&(d.innerHTML=`
                            <g transform="translate(${l.x}, ${l.y})">
                                <circle cx="0" cy="0" r="18" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,3"/>
                                <circle cx="14" cy="-14" r="9" fill="#ef4444" cursor="pointer" onclick="GateSecurity.deleteSelectedItem()"/>
                                <text x="14" y="-11" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle" cursor="pointer" onclick="GateSecurity.deleteSelectedItem()">\u2715</text>
                            </g>
                        `):d.innerHTML=""}else d.innerHTML="";this.renderEditorLists()}renderEditorLists(){const e=window._currentEditorConfig;if(!e)return;const i=document.getElementById("editorBuildingsList");i&&(i.innerHTML=e.buildings.map((o,n)=>{const d=window._selectedItem&&window._selectedItem.type==="building"&&window._selectedItem.idx===n;return`
                    <div style="display: flex; align-items: center; gap: 4px; background: ${d?"#fef2f2":"#ffffff"}; border: 1.5px solid ${d?"#ef4444":"#cbd5e1"}; border-radius: 8px; padding: 5px 7px; width: 100%; box-sizing: border-box; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.2s;">
                        <input type="text" value="${o.name}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0628\u0646\u0649" onchange="GateSecurity.updateBuildingProp(${n}, 'name', this.value)" style="flex: 2; min-width: 65px; font-weight: 800; font-size: 0.76rem; padding: 3px 6px; border: 1px solid #cbd5e1; border-radius: 5px; background: #f8fafc; color: #1e293b; box-sizing: border-box;" title="\u0627\u0633\u0645 \u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0631\u0626\u064A\u0633\u064A">
                        <input type="text" value="${o.sub||""}" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0641\u0631\u0639\u064A" onchange="GateSecurity.updateBuildingProp(${n}, 'sub', this.value)" style="flex: 1.5; min-width: 55px; font-size: 0.72rem; padding: 3px 6px; border: 1px solid #cbd5e1; border-radius: 5px; background: #ffffff; color: #475569; box-sizing: border-box;" title="\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0641\u0631\u0639\u064A">
                        <div style="display: flex; align-items: center; gap: 1px; flex-shrink: 0;"><span style="font-size: 0.64rem; font-weight: 900; color: #1e40af;">W:</span><input type="number" value="${o.w}" onchange="GateSecurity.updateBuildingProp(${n}, 'w', parseInt(this.value))" style="width: 32px; padding: 2px 2px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.72rem; text-align: center; font-weight: 800; background: #fff;" title="\u0627\u0644\u0639\u0631\u0636"></div>
                        <div style="display: flex; align-items: center; gap: 1px; flex-shrink: 0;"><span style="font-size: 0.64rem; font-weight: 900; color: #1e40af;">H:</span><input type="number" value="${o.h}" onchange="GateSecurity.updateBuildingProp(${n}, 'h', parseInt(this.value))" style="width: 32px; padding: 2px 2px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.72rem; text-align: center; font-weight: 800; background: #fff;" title="\u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639"></div>
                        <select onchange="GateSecurity.updateBuildingColor(${n}, this.value)" style="width: 62px; font-size: 0.68rem; padding: 2px 2px; border-radius: 5px; border: 1px solid #cbd5e1; font-weight: 800; background: #ffffff; cursor: pointer; flex-shrink: 0;" title="\u0644\u0648\u0646 \u0627\u0644\u0645\u0628\u0646\u0649">
                            <option value="#dbeafe" ${o.fill==="#dbeafe"?"selected":""}>\u{1F535} \u0623\u0632\u0631\u0642</option>
                            <option value="#fef3c7" ${o.fill==="#fef3c7"?"selected":""}>\u{1F7E1} \u0623\u0635\u0641\u0631</option>
                            <option value="#ede9fe" ${o.fill==="#ede9fe"?"selected":""}>\u{1F7E3} \u0628\u0646\u0641\u0633\u062C\u064A</option>
                            <option value="#fce7f3" ${o.fill==="#fce7f3"?"selected":""}>\u{1FA77} \u0648\u0631\u062F\u064A</option>
                            <option value="#dcfce7" ${o.fill==="#dcfce7"?"selected":""}>\u{1F7E2} \u0623\u062E\u0636\u0631</option>
                            <option value="#f1f5f9" ${o.fill==="#f1f5f9"?"selected":""}>\u26AA \u0631\u0645\u0627\u062F\u064A</option>
                        </select>
                        <button type="button" onclick="GateSecurity.removeBuilding(${n})" style="background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; border-radius: 5px; width: 23px; height: 23px; font-weight: 900; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0;" title="\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639">\u2715</button>
                    </div>
                `}).join(""));const t=document.getElementById("editorSafetyIconsList");t&&(t.innerHTML=(e.safetyIcons||[]).map((o,n)=>{const d=window._selectedItem&&window._selectedItem.type==="icon"&&window._selectedItem.idx===n;return`
                    <div style="display: flex; justify-content: space-between; align-items: center; background: ${d?"#fef2f2":"#ffffff"}; border: 1.5px solid ${d?"#ef4444":"#cbd5e1"}; border-radius: 6px; padding: 3px 8px;">
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 800;">
                            <span>${o.icon}</span>
                            <span>${o.name}</span>
                            <span style="font-size: 0.68rem; color: #64748b; font-weight: 600;">(${o.x}, ${o.y})</span>
                        </div>
                        <button type="button" onclick="GateSecurity.removeSafetyIcon(${n})" style="background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; border-radius: 4px; padding: 1px 6px; font-weight: 900; font-size: 0.72rem; cursor: pointer;">
                            \u2715 \u062D\u0630\u0641 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629
                        </button>
                    </div>
                `}).join(""));const r=document.getElementById("editorMusterList");r&&(r.innerHTML=e.musterPoints.map((o,n)=>{const d=window._selectedItem&&window._selectedItem.type==="muster"&&window._selectedItem.idx===n;return`
                    <div style="display: grid; grid-template-columns: 100px 1fr 24px; gap: 6px; align-items: center; background: ${d?"#fef2f2":"#fff"}; padding: 3px 6px; border: 1.5px solid ${d?"#ef4444":"#cbd5e1"}; border-radius: 6px;">
                        <input type="text" value="${o.name}" onchange="GateSecurity.updateMusterProp(${n}, 'name', this.value)" style="padding: 2px 4px; font-size: 0.74rem; font-weight: 800;">
                        <span style="font-size: 0.7rem; color: #64748b;">\u0645\u0648\u0642\u0639: (${o.x}, ${o.y})</span>
                        <button type="button" onclick="GateSecurity.removeMuster(${n})" style="color: #dc2626; border: none; background: #fee2e2; border-radius: 4px; cursor: pointer; font-weight: 900; font-size: 0.75rem;" title="\u062D\u0630\u0641 \u0646\u0642\u0637\u0629 \u0627\u0644\u062A\u062C\u0645\u0639">\u2715</button>
                    </div>
                `}).join(""))}updateBuildingColor(e,i){if(!window._currentEditorConfig||!window._currentEditorConfig.buildings[e])return;const t={"#dbeafe":{fill:"#dbeafe",stroke:"#1d4ed8",color:"#1e3a8a"},"#fef3c7":{fill:"#fef3c7",stroke:"#d97706",color:"#92400e"},"#ede9fe":{fill:"#ede9fe",stroke:"#6d28d9",color:"#5b21b6"},"#fce7f3":{fill:"#fce7f3",stroke:"#be185d",color:"#9d174d"},"#dcfce7":{fill:"#dcfce7",stroke:"#15803d",color:"#14532d"},"#f1f5f9":{fill:"#f1f5f9",stroke:"#475569",color:"#334155"}},r=t[i]||t["#dbeafe"];window._currentEditorConfig.buildings[e].fill=r.fill,window._currentEditorConfig.buildings[e].stroke=r.stroke,window._currentEditorConfig.buildings[e].color=r.color,this.renderEditorCanvas()}removeSafetyIcon(e){!window._currentEditorConfig||!window._currentEditorConfig.safetyIcons||(window._currentEditorConfig.safetyIcons.splice(e,1),window._selectedItem&&window._selectedItem.type==="icon"&&window._selectedItem.idx===e&&(window._selectedItem=null),this.renderEditorCanvas())}addEditorSafetyIcon(e,i,t){if(!window._currentEditorConfig)return;window._currentEditorConfig.safetyIcons||(window._currentEditorConfig.safetyIcons=[]);const r=window._currentEditorConfig.safetyIcons.length;window._currentEditorConfig.safetyIcons.push({id:"s_"+Date.now(),name:i,icon:e,x:220+r*15,y:180,color:t}),window._selectedItem={type:"icon",idx:r},this.renderEditorCanvas()}addEditorBuildingZone(){if(!window._currentEditorConfig)return;const e=window._currentEditorConfig.buildings.length+1,i=window._currentEditorConfig.buildings.length;window._currentEditorConfig.buildings.push({id:"b_"+Date.now(),name:`\u0645\u0648\u0642\u0639 ${e}`,sub:"\u0645\u0646\u0637\u0642\u0629 \u062C\u062F\u064A\u062F\u0629",x:180,y:150,w:120,h:60,fill:"#dbeafe",stroke:"#1d4ed8",color:"#1e3a8a"}),window._selectedItem={type:"building",idx:i},this.renderEditorCanvas()}addEditorMusterPoint(){if(!window._currentEditorConfig)return;const e=window._currentEditorConfig.musterPoints.length+1,i=window._currentEditorConfig.musterPoints.length;window._currentEditorConfig.musterPoints.push({id:"m_"+Date.now(),name:`\u0646\u0642\u0637\u0629 ${e}`,desc:"\u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639 \u0645\u062E\u0635\u0635\u0629",x:200,y:200}),window._selectedItem={type:"muster",idx:i},this.renderEditorCanvas()}updateBuildingProp(e,i,t){!window._currentEditorConfig||!window._currentEditorConfig.buildings[e]||(window._currentEditorConfig.buildings[e][i]=t,this.renderEditorCanvas())}updateMusterProp(e,i,t){!window._currentEditorConfig||!window._currentEditorConfig.musterPoints[e]||(window._currentEditorConfig.musterPoints[e][i]=t,this.renderEditorCanvas())}removeBuilding(e){window._currentEditorConfig&&(window._currentEditorConfig.buildings.splice(e,1),window._selectedItem&&window._selectedItem.type==="building"&&window._selectedItem.idx===e&&(window._selectedItem=null),this.renderEditorCanvas())}removeMuster(e){window._currentEditorConfig&&(window._currentEditorConfig.musterPoints.splice(e,1),window._selectedItem&&window._selectedItem.type==="muster"&&window._selectedItem.idx===e&&(window._selectedItem=null),this.renderEditorCanvas())}handleCanvasMouseDown(e){const i=document.getElementById("interactiveCanvasSvg");if(!i)return;const t=i.getBoundingClientRect(),r=Math.round((e.clientX-t.left)*(500/t.width)),o=Math.round((e.clientY-t.top)*(360/t.height));if(e.target.classList.contains("resize-handle")){const p=e.target.getAttribute("data-handle");if(window._selectedItem&&window._selectedItem.type==="building"){const l=window._selectedItem.idx,f=window._currentEditorConfig.buildings[l];window._resizeState={idx:l,handle:p,svgX:r,svgY:o,origW:f.w,origH:f.h};return}}if(window._drawMode){window._drawingState={startX:r,startY:o};return}const n=e.target.closest(".draggable-item");if(!n){window._selectedItem=null,this.renderEditorCanvas();return}const d=n.getAttribute("data-type"),s=parseInt(n.getAttribute("data-idx"));window._selectedItem={type:d,idx:s},this.renderEditorCanvas();const c=d==="building"?"buildings":d==="muster"?"musterPoints":"safetyIcons";window._dragState={type:d,idx:s,svgX:r,svgY:o,elemX:window._currentEditorConfig[c][s].x,elemY:window._currentEditorConfig[c][s].y}}handleCanvasMouseMove(e){const i=document.getElementById("interactiveCanvasSvg");if(!i)return;const t=i.getBoundingClientRect(),r=Math.round((e.clientX-t.left)*(500/t.width)),o=Math.round((e.clientY-t.top)*(360/t.height));if(window._resizeState){const{idx:x,handle:g,svgX:u,svgY:h,origW:m,origH:w}=window._resizeState,v=Math.round(r-u),k=Math.round(o-h),y=window._currentEditorConfig.buildings[x];y&&((g==="se"||g==="e")&&(y.w=Math.max(30,m+v)),(g==="se"||g==="s")&&(y.h=Math.max(20,w+k)),this.renderEditorCanvas());return}if(window._drawMode&&window._drawingState){const x=document.getElementById("svgDrawingPreviewGroup");if(x){const g=Math.min(window._drawingState.startX,r),u=Math.min(window._drawingState.startY,o),h=Math.max(15,Math.abs(r-window._drawingState.startX)),m=Math.max(15,Math.abs(o-window._drawingState.startY));x.innerHTML=`
                    <rect x="${g}" y="${u}" width="${h}" height="${m}" rx="4" fill="rgba(37,99,235,0.25)" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,3"/>
                    <text x="${g+h/2}" y="${u+m/2}" font-size="10" font-weight="900" fill="#1e3a8a" text-anchor="middle">\u0645\u0648\u0642\u0639 \u062C\u062F\u064A\u062F</text>
                `}return}if(!window._dragState)return;const{type:n,idx:d,svgX:s,svgY:c,elemX:p,elemY:l}=window._dragState,f=Math.round(r-s),a=Math.round(o-c),b=n==="building"?"buildings":n==="muster"?"musterPoints":"safetyIcons";window._currentEditorConfig[b][d].x=Math.max(15,Math.min(460,p+f)),window._currentEditorConfig[b][d].y=Math.max(15,Math.min(330,l+a)),this.renderEditorCanvas()}handleCanvasMouseUp(e){if(window._resizeState){window._resizeState=null;return}if(window._drawMode&&window._drawingState){const i=document.getElementById("interactiveCanvasSvg");if(i){const r=i.getBoundingClientRect(),o=Math.round((e.clientX-r.left)*(500/r.width)),n=Math.round((e.clientY-r.top)*(360/r.height)),d=Math.min(window._drawingState.startX,o),s=Math.min(window._drawingState.startY,n),c=Math.max(30,Math.abs(o-window._drawingState.startX)),p=Math.max(20,Math.abs(n-window._drawingState.startY)),l=window._currentEditorConfig.buildings.length+1,f=window._currentEditorConfig.buildings.length;window._currentEditorConfig.buildings.push({id:"b_"+Date.now(),name:`\u0645\u0648\u0642\u0639 ${l}`,sub:"\u0645\u0646\u0637\u0642\u0629 \u0645\u0631\u0633\u0648\u0645\u0629",x:d,y:s,w:c,h:p,fill:"#dbeafe",stroke:"#1d4ed8",color:"#1e3a8a"}),window._selectedItem={type:"building",idx:f}}window._drawingState=null;const t=document.getElementById("svgDrawingPreviewGroup");t&&(t.innerHTML=""),this.toggleDrawMode(),this.renderEditorCanvas();return}window._dragState=null}saveEditorMapConfig(){if(!window._currentEditorConfig)return;const e=document.getElementById("editMapCoords")?.value||window._currentEditorConfig.coords,i=document.getElementById("editEmergencyPhone")?.value||window._currentEditorConfig.emergencyPhone||"0100000000",t=document.getElementById("editEmergencyExt")?.value||window._currentEditorConfig.emergencyExt||"100";window._currentEditorConfig.coords=e,window._currentEditorConfig.emergencyPhone=i.trim(),window._currentEditorConfig.emergencyExt=t.trim(),this.saveMapConfig(window._currentEditorConfig);const r=document.getElementById("mapEditorModal");r&&r.remove()}resetMapConfigToDefault(){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u0647\u064A\u0643\u0644\u064A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0644\u0644\u062E\u0631\u064A\u0637\u0629 \u0648\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639\u061F")){localStorage.removeItem("icapp_visitor_map_config"),alert("\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u0647\u064A\u0643\u0644\u064A \u0644\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A.");const e=document.getElementById("mapEditorModal");e&&e.remove()}}printMasterVisitorBadges(e){const i=this.getGatePortalUrl(),t=this.getMapConfig(),r=this.visitors.length||0,o=parseInt(localStorage.getItem("icapp_last_visitor_badge_num")||"0"),n=o>0?o+1:r+1,d=e||`VIS-${new Date().getFullYear()}-${n.toString().padStart(3,"0")}`,s=window.open("","_blank");if(!s){alert("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0643\u0627\u0631\u062A \u0648\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646 (Pop-ups)");return}const c=t.musterPoints.map(a=>`
            <g transform="translate(${a.x}, ${a.y})">
                <rect x="-24" y="-14" width="48" height="28" rx="4" fill="#15803d" stroke="#ffffff" stroke-width="1.5"/>
                <text x="0" y="3" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="Segoe UI">${a.name}</text>
            </g>
        `).join(""),p=t.buildings.map(a=>`
            <rect x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" rx="4" fill="${a.fill}" stroke="${a.stroke}" stroke-width="2"/>
            <text x="${a.x+a.w/2}" y="${a.y+a.h/2-(a.sub?6:0)}" font-size="11.5" font-weight="900" fill="${a.color}" text-anchor="middle" font-family="Segoe UI">${a.name}</text>
            ${a.sub?`<text x="${a.x+a.w/2}" y="${a.y+a.h/2+12}" font-size="8.5" font-weight="700" fill="${a.stroke}" text-anchor="middle" font-family="Segoe UI">${a.sub}</text>`:""}
        `).join(""),l=(t.safetyIcons||[]).map(a=>`
            <g transform="translate(${a.x}, ${a.y})">
                <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="${a.color||"#dc2626"}" stroke-width="2"/>
                <text x="0" y="5" font-size="14" text-anchor="middle">${a.icon}</text>
            </g>
        `).join(""),f=`transform: scale(${(t.frameScale||100)/100}); transform-origin: center center;`;s.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0643\u0627\u0631\u062A \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646 \u0648\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 - ICAPP Safety Rules & Assembly Points</title>
                <style>
                    @page {
                        size: A4 landscape;
                        margin: 5mm 5mm 5mm 5mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
                        margin: 0;
                        padding: 6px;
                        direction: rtl;
                        color: #000000;
                        background: #f1f5f9;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .card-container {
                        width: 100%;
                        max-width: 287mm;
                        margin: 0 auto;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 10px;
                        background: #ffffff;
                        border: 2.5px solid #1e3a8a;
                        padding: 8px;
                        min-height: 190mm;
                    }
                    
                    /* ======================================================== */
                    /* \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0623\u064A\u0633\u0631: \u0631\u0633\u0645 \u062A\u0648\u0636\u064A\u062D\u064A \u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 (ASSEMBLY POINT) */
                    /* ======================================================== */
                    .left-panel {
                        border: 2px solid #0f172a;
                        border-radius: 4px;
                        padding: 8px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background: #ffffff;
                    }
                    .left-header {
                        text-align: center;
                        margin-bottom: 6px;
                        border-bottom: 2px solid #0f172a;
                        padding-bottom: 4px;
                    }
                    .left-header h2 {
                        margin: 0;
                        font-size: 18px;
                        font-weight: 900;
                        color: #000000;
                    }
                    .left-header h3 {
                        margin: 1px 0 0;
                        font-size: 13px;
                        font-weight: 800;
                        color: #000000;
                        letter-spacing: 1px;
                    }
                    
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
                        padding: 8px;
                        min-height: 132mm;
                    }
                    .schematic-map {
                        width: 100%;
                        height: 100%;
                        max-height: 128mm;
                    }
                    .map-legend-bar {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        background: #e2e8f0;
                        border: 1px solid #94a3b8;
                        border-radius: 4px;
                        padding: 4px 8px;
                        font-size: 9px;
                        font-weight: 800;
                        margin-top: 4px;
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
                        font-size: 8.5px;
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
                    .right-header-top {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 6px 10px;
                        border-bottom: 2px solid #1e3a8a;
                        background: #ffffff;
                    }
                    .brand-logo-img {
                        max-height: 38px;
                        max-width: 110px;
                        object-fit: contain;
                    }

                    /* \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0623\u0632\u0631\u0642 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u0645\u0639 \u0627\u0644\u0641\u0635\u0644 \u0627\u0644\u062A\u0627\u0645 RTL / LTR */
                    .blue-priority-banner {
                        background: #1e40af;
                        color: #ffffff;
                        padding: 5px 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .blue-text-ar {
                        text-align: right;
                        direction: rtl;
                        font-size: 10.5px;
                        font-weight: 900;
                        line-height: 1.25;
                        width: 48%;
                    }
                    .blue-text-en {
                        text-align: left;
                        direction: ltr;
                        font-size: 9px;
                        font-weight: 800;
                        line-height: 1.2;
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
                    .smoke-ar {
                        font-size: 9.5px;
                        direction: rtl;
                        text-align: right;
                        line-height: 1.25;
                        font-weight: 800;
                        width: 42%;
                        color: #000000;
                    }
                    .smoke-icon-box {
                        width: 44px;
                        height: 44px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
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
                    .s-text-ar {
                        font-size: 9.5px;
                        font-weight: 900;
                        direction: rtl;
                        text-align: right;
                        color: #000000;
                    }
                    .s-icon-center {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .s-text-en {
                        font-size: 8.5px;
                        font-weight: 800;
                        direction: ltr;
                        text-align: left;
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
                        width: 30px;
                        height: 30px;
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
                        direction: rtl;
                    }

                    /* \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0639\u0644\u0648\u064A\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629 \u0648\u0627\u0644\u062A\u0633\u0644\u0633\u0644 */
                    .toolbar-top {
                        background: #ffffff;
                        border: 1px solid #cbd5e1;
                        border-radius: 8px;
                        padding: 8px 14px;
                        margin-bottom: 8px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 8px;
                    }

                    /* \u0646\u0645\u0637 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u0632\u062F\u0648\u062C\u0629 \u0627\u0644\u0648\u062C\u0647\u064A\u0646 \u0644\u0644\u0631\u0642\u0628\u0629 */
                    .double-sided-mode {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                    .double-sided-mode .left-panel {
                        order: 2;
                        border: 2px solid #1e3a8a !important;
                        border-radius: 12px;
                        padding: 14px;
                    }
                    .double-sided-mode .right-panel {
                        order: 1;
                        border: 2px solid #1e3a8a !important;
                        border-radius: 12px;
                        padding: 14px;
                    }

                    @media print {
                        .toolbar-top { display: none !important; }
                        body { padding: 0; background: #ffffff; }
                        .card-container { min-height: 98vh; max-width: 100%; border: 2px solid #1e3a8a; }
                        .double-sided-mode .right-panel {
                            page-break-after: always !important;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="toolbar-top">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="font-weight: 800; font-size: 12px; color: #1e3a8a;">\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0643\u0627\u0631\u062A:</span>
                        <input type="text" id="badgeSerialInput" value="${d}" style="padding: 4px 8px; border-radius: 6px; border: 1.5px solid #059669; font-weight: 900; font-size: 12px; color: #047857; width: 130px; font-family: monospace;" oninput="document.getElementById('badgeSerialBox').textContent = 'Badge: ' + this.value">

                        <span style="font-weight: 800; font-size: 12px; color: #1e3a8a; margin-right: 4px;">\u0646\u0648\u0639 \u0627\u0644\u0632\u0627\u0626\u0631:</span>
                        <select id="visitorTypeSelect" onchange="updateVisitorTypeHeader(this.value)" style="padding: 4px 10px; border-radius: 6px; border: 1.5px solid #16a34a; font-weight: 900; font-size: 12px; background: #f0fdf4; color: #166534;">
                            <option value="visitor" selected>\u{1F7E2} \u0632\u0627\u0626\u0631 \u0639\u0627\u062F\u064A (VISITOR)</option>
                            <option value="contractor">\u{1F7E0} \u0645\u0642\u0627\u0648\u0644 / \u0635\u064A\u0627\u0646\u0629 (CONTRACTOR)</option>
                            <option value="vip">\u{1F534} \u0648\u0641\u062F \u0631\u0633\u0645\u064A / \u062A\u0641\u062A\u064A\u0634 (VIP)</option>
                        </select>

                        <span style="font-weight: 800; font-size: 12px; color: #1e3a8a; margin-right: 4px;">\u0646\u0645\u0637 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:</span>
                        <select id="doubleSidedSelect" onchange="toggleDoubleSidedLayout(this.value)" style="padding: 4px 10px; border-radius: 6px; border: 1.5px solid #d97706; font-weight: 900; font-size: 12px; background: #fffbeb; color: #92400e;">
                            <option value="single" selected>\u{1F4C4} \u0648\u062C\u0647 \u0648\u0627\u062D\u062F \u0645\u062F\u0645\u062C</option>
                            <option value="double">\u{1F4C4}\u{1F4C4} \u0648\u062C\u0647\u064A\u0646 \u0644\u0644\u0631\u0642\u0628\u0629 (Double-Sided)</option>
                        </select>

                        <span style="font-weight: 800; font-size: 12px; color: #1e3a8a; margin-right: 4px;">\u0627\u0644\u062D\u062C\u0645:</span>
                        <select id="cardSizeSelect" onchange="changeCardPrintSize(this.value)" style="padding: 4px 10px; border-radius: 6px; border: 1.5px solid #2563eb; font-weight: 800; font-size: 12px; background: #eff6ff; color: #1e40af;">
                            <option value="full" selected>A4 \u0643\u0627\u0645\u0644</option>
                            <option value="compact">\u0643\u0627\u0631\u062A \u062C\u064A\u0628 \u0645\u062F\u0645\u062C (Pocket)</option>
                            <option value="medium">\u062D\u062C\u0645 \u0645\u062A\u0648\u0633\u0637 (A5)</option>
                            <option value="custom-scale">\u062A\u062E\u0635\u064A\u0635 %</option>
                        </select>

                        <div id="customCardScaleWrap" style="display: none; align-items: center; gap: 4px;">
                            <input type="range" id="cardScaleRange" min="50" max="150" value="100" oninput="applyCustomCardScale(this.value)" style="width: 80px; cursor: pointer;">
                            <span id="cardScaleValText" style="font-size: 11px; font-weight: 900; color: #15803d;">100%</span>
                        </div>
                    </div>

                    <div style="display: flex; gap: 8px; align-items: center;">
                        <input type="text" id="customCoords" value="${t.coords}" style="padding: 4px 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 11px; width: 170px;" oninput="document.getElementById('displayCoords').textContent = '\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639: ' + this.value + ' | DOC-HSE-MAP-01 Rev.02'">
                        <button onclick="exportBatchCardsFromPrintWindow()" style="padding: 6px 14px; background: #059669; color: #fff; border:none; border-radius:6px; cursor:pointer; font-weight: 900; font-size: 12px; box-shadow: 0 2px 6px rgba(5,150,105,0.25);" title="\u062A\u0635\u062F\u064A\u0631 \u0648\u0637\u0628\u0627\u0639\u0629 \u0645\u062C\u0645\u0648\u0639\u0629 \u0643\u0631\u0648\u062A \u0645\u062A\u062A\u0627\u0644\u064A\u0629 \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629 \u0643\u0645\u0644\u0641 PDF">\u{1F5C2}\uFE0F \u062A\u0635\u062F\u064A\u0631 \u062F\u0641\u0639\u0629 PDF</button>
                        <button onclick="window.print()" style="padding: 6px 18px; background: #1e40af; color: #fff; border:none; border-radius:6px; cursor:pointer; font-weight: 900; font-size: 12px; box-shadow: 0 2px 6px rgba(30,64,175,0.25);">\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0643\u0627\u0631\u062A \u0627\u0644\u0622\u0646</button>
                    </div>
                </div>

                <div class="card-container">
                    <!-- \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0623\u064A\u0633\u0631: \u0631\u0633\u0645 \u062A\u0648\u0636\u064A\u062D\u064A \u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 -->
                    <div class="left-panel">
                        <div class="left-header">
                            <h2>\u0631\u0633\u0645 \u062A\u0648\u0636\u064A\u062D\u064A \u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639</h2>
                            <h3>ASSEMBLY POINT</h3>
                        </div>

                        <div class="map-canvas-container" style="${f}">
                            <svg class="schematic-map" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="10" width="480" height="340" rx="8" fill="${t.frameBg||"#f1f5f9"}" stroke="#334155" stroke-width="2.5" stroke-dasharray="6,4"/>
                                <rect x="20" y="20" width="460" height="320" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
                                <rect x="35" y="35" width="430" height="290" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>

                                <!-- \u0627\u0644\u0645\u0628\u0627\u0646\u064A \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0645\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 -->
                                ${p}

                                <!-- \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u062E\u0636\u0631\u0627\u0621 -->
                                <path d="M 110 110 L 110 150 L 190 150" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 270 170 L 270 190" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 350 110 L 370 110" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 270 305 L 270 325" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 50 150 L 35 150" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>

                                <!-- \u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0645\u0639 \u0627\u0644\u0645\u0635\u0645\u0645\u0629 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B -->
                                ${c}

                                <!-- \u0623\u064A\u0642\u0648\u0646\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u0645\u0635\u0645\u0645\u0629 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B -->
                                ${l}

                                <!-- \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0648\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626 -->
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
                            \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639: ${t.coords} | DOC-HSE-MAP-01 Rev.02
                        </div>
                    </div>

                    <!-- \u0627\u0644\u062C\u0627\u0646\u0628 \u0627\u0644\u0623\u064A\u0645\u0646: \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646 -->
                    <div class="right-panel">
                        <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0645\u064A\u064A\u0632 \u0627\u0644\u0628\u0635\u0631\u064A \u0627\u0644\u0645\u0644\u0648\u0646 \u0644\u0646\u0648\u0639 \u0627\u0644\u0632\u0627\u0626\u0631 -->
                        <div id="visitorTypeHeaderBanner" style="background: #16a34a; color: #ffffff; padding: 4px 10px; border-radius: 6px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center; font-weight: 900; font-size: 11px; border: 1.5px solid #15803d; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                            <span id="visitorTypeTitleAr" style="direction: rtl;">\u0643\u0627\u0631\u062A \u0632\u0627\u0626\u0631 \u0645\u0639\u062A\u0645\u062F</span>
                            <span id="visitorTypeTitleEn" style="direction: ltr;">VISITOR PASS</span>
                        </div>

                        <!-- \u062A\u0631\u0648\u064A\u0633\u0629 \u0627\u0644\u0643\u0627\u0631\u062A \u0645\u0639 \u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u062A\u0633\u0644\u0633\u0644 -->
                        <div class="right-header-top">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img src="icons/icapp-logo.png" alt="ICAPP Logo" class="brand-logo-img" onerror="this.src='../icons/icapp-logo.png';">
                                <div style="text-align: right; direction: rtl;">
                                    <div style="font-size: 17px; font-weight: 900; color: #000000;">\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0632\u0627\u0626\u0631\u064A\u0646</div>
                                    <div style="font-size: 9.5px; font-weight: 800; color: #1e3a8a;">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0623\u0645\u0646</div>
                                </div>
                            </div>
                            <div style="text-align: left; direction: ltr;">
                                <div style="font-size: 13px; font-weight: 900; color: #000000;">SAFETY RULES VISITORS</div>
                                <div id="badgeSerialBox" style="font-size: 11px; font-weight: 900; color: #047857; font-family: monospace; background: #ecfdf5; border: 1.5px solid #a7f3d0; padding: 2px 8px; border-radius: 6px; margin-top: 2px; display: inline-block;">
                                    Badge: ${d}
                                </div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0623\u0632\u0631\u0642 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u0645\u0639 \u0627\u0644\u062A\u0648\u062C\u064A\u0647 \u0627\u0644\u0645\u0636\u0628\u0648\u0637 LTR / RTL -->
                        <div class="blue-priority-banner">
                            <div class="blue-text-ar">
                                <strong>\u0639\u0632\u064A\u0632\u064A \u0627\u0644\u0632\u0627\u0626\u0631 \u0633\u0644\u0627\u0645\u062A\u0643 \u062A\u0647\u0645\u0646\u0627</strong><br>
                                \u064A\u0631\u062C\u0649 \u0625\u062A\u0628\u0627\u0639 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0648\u0636\u062D\u0629
                            </div>
                            <div class="blue-text-en">
                                <strong>YOUR SAFETY IS OF OUR PRIORITY</strong><br>
                                All visitors are kindly requested to follow the safety instructions here
                            </div>
                        </div>

                        <!-- \u0642\u0633\u0645 \u0627\u0644\u062A\u062F\u062E\u064A\u0646 -->
                        <div class="smoking-section">
                            <div class="smoke-ar">
                                \u0627\u0644\u062A\u062F\u062E\u064A\u0646 \u063A\u064A\u0631 \u0645\u0633\u0645\u0648\u062D \u0628\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u062F\u0627\u062E\u0644 \u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0639\u0645\u0644 \u0628\u0625\u0633\u062A\u062B\u0646\u0627\u0621 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u062E\u0635\u0635\u0629 \u0648\u0627\u0644\u062A\u064A \u062A\u0645 \u062A\u062C\u0647\u064A\u0632\u0647\u0627 \u0644\u0630\u0644\u0643.
                            </div>
                            <div class="smoke-icon-box">
                                <svg width="40" height="40" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#dc2626" stroke-width="8"/>
                                    <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" stroke-width="8"/>
                                    <rect x="25" y="45" width="40" height="10" fill="#ffffff" stroke="#000" stroke-width="1.5"/>
                                    <rect x="25" y="45" width="12" height="10" fill="#f59e0b"/>
                                    <path d="M 68 43 Q 72 38 76 43 T 80 43" fill="none" stroke="#64748b" stroke-width="2"/>
                                    <path d="M 70 57 Q 74 52 78 57 T 82 57" fill="none" stroke="#64748b" stroke-width="2"/>
                                </svg>
                            </div>
                            <div class="smoke-en">
                                Smoking is prohibited throughout the plant premises except in specially dedicated and adapted areas.
                            </div>
                        </div>

                        <!-- \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 7 \u0623\u064A\u0642\u0648\u0646\u0627\u062A \u062F\u0627\u0626\u0631\u064A\u0629 -->
                        <div class="basic-rules-section">
                            <div class="basic-rules-header">
                                <span style="direction: rtl; text-align: right;">\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</span>
                                <span style="direction: ltr; text-align: left;">SAFETY BASIC RULES</span>
                            </div>

                            <div class="rules-icons-row">
                                <!-- \u0645\u0645\u0631 \u0645\u0634\u0627\u0629 -->
                                <div class="rule-circle-icon" title="Pedestrian Walkway">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="46" fill="#1d4ed8"/>
                                        <circle cx="50" cy="30" r="7" fill="#ffffff"/>
                                        <path d="M 45 42 L 55 42 L 58 60 L 65 75 L 58 75 L 53 62 L 48 75 L 42 75 L 47 56 L 40 60 Z" fill="#ffffff"/>
                                    </svg>
                                </div>
                                <!-- \u0643\u0644\u0627\u0631\u0643\u0627\u062A -->
                                <div class="rule-circle-icon" title="Forklift Caution">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <polygon points="50,15 88,80 12,80" fill="#facc15" stroke="#000" stroke-width="4"/>
                                        <rect x="35" y="55" width="25" height="15" fill="#000"/>
                                        <circle cx="42" cy="72" r="4" fill="#000"/>
                                        <circle cx="56" cy="72" r="4" fill="#000"/>
                                        <line x1="65" y1="45" x2="65" y2="72" stroke="#000" stroke-width="3"/>
                                        <line x1="65" y1="70" x2="75" y2="70" stroke="#000" stroke-width="3"/>
                                    </svg>
                                </div>
                                <!-- \u0633\u0631\u0639\u0629 20 -->
                                <div class="rule-circle-icon" title="Speed Limit 20">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <text x="50" y="52" font-size="28" font-weight="900" fill="#000" text-anchor="middle" font-family="Arial">20</text>
                                        <text x="50" y="68" font-size="14" font-weight="900" fill="#000" text-anchor="middle" font-family="Arial">km/h</text>
                                    </svg>
                                </div>
                                <!-- \u0623\u0633\u0644\u062D\u0629 \u0648\u0623\u062F\u0648\u0627\u062A \u062D\u0627\u062F\u0629 -->
                                <div class="rule-circle-icon" title="No Weapons">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <path d="M 35 65 L 65 35 L 70 40 L 40 70 Z" fill="#000"/>
                                    </svg>
                                </div>
                                <!-- \u062A\u0635\u0648\u064A\u0631 -->
                                <div class="rule-circle-icon" title="No Photography">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <rect x="30" y="40" width="40" height="28" rx="4" fill="#000"/>
                                        <circle cx="50" cy="54" r="8" fill="#fff"/>
                                        <rect x="42" y="34" width="16" height="6" fill="#000"/>
                                    </svg>
                                </div>
                                <!-- \u0643\u062D\u0648\u0644\u064A\u0627\u062A -->
                                <div class="rule-circle-icon" title="No Alcohol">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <path d="M 40 35 L 60 35 L 53 52 L 53 68 L 62 68 L 62 72 L 38 72 L 38 68 L 47 68 L 47 52 Z" fill="#000"/>
                                    </svg>
                                </div>
                                <!-- 18 \u0645\u0645\u0646\u0648\u0639 -->
                                <div class="rule-circle-icon" title="No Minors">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <text x="50" y="60" font-size="34" font-weight="900" fill="#000" text-anchor="middle" font-family="Arial">18</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- \u0641\u064A \u062D\u0627\u0644\u0629 \u0633\u0645\u0627\u0639 \u0633\u0627\u0631\u064A\u0646\u0629 \u0627\u0644\u0625\u0646\u0630\u0627\u0631 -->
                        <div class="siren-section">
                            <div class="siren-red-bar">
                                <span style="direction: rtl; text-align: right;">\u0641\u064A \u062D\u0627\u0644\u0629 \u0633\u0645\u0627\u0639 \u0633\u0627\u0631\u064A\u0646\u0629 \u0627\u0644\u0625\u0646\u0630\u0627\u0631 :</span>
                                <span style="direction: ltr; text-align: left;">When you hear the emergency siren:</span>
                            </div>

                            <div class="siren-steps-container">
                                <div class="siren-step-row">
                                    <div class="s-text-ar">\u0661- \u0627\u062A\u0628\u0639 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0644\u0643 \u0623\u0648 \u0631\u0626\u064A\u0633 \u0627\u0644\u0642\u0633\u0645</div>
                                    <div class="s-icon-center">
                                        <svg width="26" height="26" viewBox="0 0 100 100">
                                            <rect width="100" height="100" fill="#dc2626" rx="6"/>
                                            <circle cx="50" cy="50" r="16" fill="#ffffff"/>
                                            <path d="M 28 35 A 25 25 0 0 1 28 65" fill="none" stroke="#ffffff" stroke-width="6"/>
                                            <path d="M 72 35 A 25 25 0 0 0 72 65" fill="none" stroke="#ffffff" stroke-width="6"/>
                                        </svg>
                                    </div>
                                    <div class="s-text-en">1- Follow your escort's instructions</div>
                                </div>

                                <div class="siren-step-row">
                                    <div class="s-text-ar">\u0662- \u0625\u062A\u062C\u0647 \u0625\u0644\u0649 \u0623\u0642\u0631\u0628 \u0628\u0627\u0628 \u062E\u0631\u0648\u062C</div>
                                    <div class="s-icon-center">
                                        <svg width="34" height="26" viewBox="0 0 140 100">
                                            <rect width="140" height="100" fill="#15803d" rx="6"/>
                                            <path d="M 35 50 L 15 50 L 25 35 M 15 50 L 25 65" stroke="#ffffff" stroke-width="7" fill="none"/>
                                            <circle cx="70" cy="30" r="9" fill="#ffffff"/>
                                            <path d="M 60 45 L 80 45 L 85 65 L 95 85 L 85 85 L 75 68 L 65 85 L 55 85 L 68 60 L 58 55 Z" fill="#ffffff"/>
                                            <rect x="100" y="20" width="25" height="60" fill="none" stroke="#ffffff" stroke-width="6"/>
                                        </svg>
                                    </div>
                                    <div class="s-text-en">2- Go to the nearest exit door</div>
                                </div>

                                <div class="siren-step-row">
                                    <div class="s-text-ar">\u0663- \u0625\u062A\u062C\u0647 \u0625\u0644\u0649 \u0623\u0642\u0631\u0628 \u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639</div>
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
                                    <div class="s-text-en">3- Go to the nearest assembly point</div>
                                </div>
                            </div>
                        </div>

                        <!-- \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 PPE -->
                        <div class="ppe-section">
                            <div class="ppe-header-texts">
                                <span style="direction: rtl; text-align: right;">\u064A\u062C\u0628 \u0627\u0644\u0625\u0644\u062A\u0632\u0627\u0645 \u0628\u0625\u0631\u062A\u062F\u0627\u0621 \u0645\u0644\u0627\u0628\u0633 \u0648\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0632\u064A\u0627\u0631\u0629</span>
                                <span style="direction: ltr; text-align: left;">Use personal protective equipment suitable to the area you enter</span>
                            </div>

                            <div class="ppe-icons-row">
                                <div class="ppe-icon-circle" title="Safety Boots">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 35 25 L 55 25 L 55 55 L 75 65 L 75 75 L 30 75 L 30 35 Z" fill="#fff"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Safety Helmet">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 25 60 Q 25 25 50 25 Q 75 25 75 60 Z" fill="#fff"/>
                                        <rect x="18" y="58" width="64" height="8" rx="3" fill="#fff"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Ear Protection">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 25 55 Q 25 20 50 20 Q 75 20 75 55" fill="none" stroke="#fff" stroke-width="6"/>
                                        <rect x="20" y="50" width="12" height="22" rx="4" fill="#fff"/>
                                        <rect x="68" y="50" width="12" height="22" rx="4" fill="#fff"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Dust Mask">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 25 45 Q 50 35 75 45 L 68 70 Q 50 80 32 70 Z" fill="#fff"/>
                                        <line x1="25" y1="45" x2="10" y2="35" stroke="#fff" stroke-width="5"/>
                                        <line x1="75" y1="45" x2="90" y2="35" stroke="#fff" stroke-width="5"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Safety Gloves">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 35 75 L 35 45 Q 35 38 42 38 Q 48 38 48 45 L 48 35 Q 48 28 55 28 Q 62 28 62 35 L 62 45 Q 62 38 68 38 Q 75 38 75 45 L 75 75 Z" fill="#fff"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Face Shield">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <circle cx="50" cy="40" r="18" fill="#fff"/>
                                        <path d="M 30 30 Q 50 20 70 30 L 70 65 Q 50 85 30 65 Z" fill="none" stroke="#fff" stroke-width="6"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Safety Glasses">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <circle cx="32" cy="50" r="16" fill="none" stroke="#fff" stroke-width="6"/>
                                        <circle cx="68" cy="50" r="16" fill="none" stroke="#fff" stroke-width="6"/>
                                        <line x1="48" y1="50" x2="52" y2="50" stroke="#fff" stroke-width="6"/>
                                        <line x1="16" y1="50" x2="5" y2="40" stroke="#fff" stroke-width="6"/>
                                        <line x1="84" y1="50" x2="95" y2="40" stroke="#fff" stroke-width="6"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- \u0641\u0648\u062A\u0631 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 -->
                        <div class="emergency-footer">
                            <div class="emergency-top-row">
                                <span style="direction: rtl; text-align: right;">\u0637\u0648\u0627\u0631\u0626 \u0627\u0644\u0645\u0635\u0646\u0639</span>
                                <div class="phone-icons-box">
                                    <div class="phone-pill" style="background: #dc2626;">\u{1F4DE}</div>
                                    <div class="phone-pill" style="background: #16a34a;">\u{1F4F1}</div>
                                </div>
                                <span style="direction: ltr; text-align: left;">Emergency call</span>
                            </div>
                            <div class="emergency-call-line">
                                \u0641\u064A \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u064A\u0631\u062C\u0649 \u0627\u0644\u0625\u062A\u0635\u0627\u0644 \u0639\u0644\u0649 \u0631\u0642\u0645: <strong>${t.emergencyPhone||"0100000000"} / \u062F\u0627\u062E\u0644\u064A: ${t.emergencyExt||"100"}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <script>
                    window.updateVisitorTypeHeader = function(type) {
                        const headerBanner = document.getElementById('visitorTypeHeaderBanner');
                        const badgeSerialBox = document.getElementById('badgeSerialBox');
                        const typeTitleAr = document.getElementById('visitorTypeTitleAr');
                        const typeTitleEn = document.getElementById('visitorTypeTitleEn');
                        
                        const configMap = {
                            visitor: { bg: '#16a34a', border: '#15803d', textAr: '\u0643\u0627\u0631\u062A \u0632\u0627\u0626\u0631 \u0645\u0639\u062A\u0645\u062F', textEn: 'VISITOR PASS', color: '#047857', badgeBg: '#ecfdf5', badgeBorder: '#a7f3d0' },
                            contractor: { bg: '#ea580c', border: '#c2410c', textAr: '\u062A\u0635\u0631\u064A\u062D \u0645\u0642\u0627\u0648\u0644 / \u0635\u064A\u0627\u0646\u0629', textEn: 'CONTRACTOR PASS', color: '#c2410c', badgeBg: '#fff7ed', badgeBorder: '#ffedd5' },
                            vip: { bg: '#dc2626', border: '#b91c1c', textAr: '\u062A\u0635\u0631\u064A\u062D \u0643\u0628\u0627\u0631 \u0627\u0644\u0632\u0648\u0627\u0631 / \u062A\u0641\u062A\u064A\u0634', textEn: 'VIP / INSPECTOR PASS', color: '#b91c1c', badgeBg: '#fef2f2', badgeBorder: '#fecaca' }
                        };
                        const cfg = configMap[type] || configMap.visitor;

                        if (headerBanner) {
                            headerBanner.style.backgroundColor = cfg.bg;
                            headerBanner.style.borderColor = cfg.border;
                        }
                        if (typeTitleAr) typeTitleAr.textContent = cfg.textAr;
                        if (typeTitleEn) typeTitleEn.textContent = cfg.textEn;
                        if (badgeSerialBox) {
                            badgeSerialBox.style.color = cfg.color;
                            badgeSerialBox.style.backgroundColor = cfg.badgeBg;
                            badgeSerialBox.style.borderColor = cfg.badgeBorder;
                        }
                    };

                    window.toggleDoubleSidedLayout = function(mode) {
                        const container = document.querySelector('.card-container');
                        if (!container) return;
                        if (mode === 'double') {
                            container.classList.add('double-sided-mode');
                        } else {
                            container.classList.remove('double-sided-mode');
                        }
                    };

                    window.changeCardPrintSize = function(sizeMode) {
                        const container = document.querySelector('.card-container');
                        const scaleWrap = document.getElementById('customCardScaleWrap');
                        if (!container) return;

                        if (sizeMode === 'compact') {
                            if (scaleWrap) scaleWrap.style.display = 'none';
                            container.style.maxWidth = '720px';
                            container.style.transform = 'scale(0.85)';
                            container.style.transformOrigin = 'top center';
                        } else if (sizeMode === 'medium') {
                            if (scaleWrap) scaleWrap.style.display = 'none';
                            container.style.maxWidth = '860px';
                            container.style.transform = 'scale(0.92)';
                            container.style.transformOrigin = 'top center';
                        } else if (sizeMode === 'custom-scale') {
                            if (scaleWrap) scaleWrap.style.display = 'inline-flex';
                            const val = document.getElementById('cardScaleRange')?.value || 100;
                            applyCustomCardScale(val);
                        } else {
                            if (scaleWrap) scaleWrap.style.display = 'none';
                            container.style.maxWidth = '100%';
                            container.style.transform = 'none';
                        }
                    };

                    window.applyCustomCardScale = function(val) {
                        const container = document.querySelector('.card-container');
                        const text = document.getElementById('cardScaleValText');
                        if (text) text.textContent = val + '%';
                        if (container) {
                            const scale = parseInt(val) / 100;
                            container.style.transform = 'scale(' + scale + ')';
                            container.style.transformOrigin = 'top center';
                        }
                    };

                    window.exportBatchCardsFromPrintWindow = function() {
                        const savedLastNum = parseInt(localStorage.getItem('icapp_last_visitor_badge_num') || '0');
                        const curSerialInput = document.getElementById('badgeSerialInput')?.value || 'VIS-2026-001';
                        const prefix = curSerialInput.substring(0, curSerialInput.lastIndexOf('-') + 1) || 'VIS-2026-';
                        const defaultStartNum = parseInt(curSerialInput.substring(curSerialInput.lastIndexOf('-') + 1)) || (savedLastNum + 1 || 1);

                        const qtyStr = prompt(
                            '\u062A\u0635\u062F\u064A\u0631 \u0648\u0637\u0628\u0627\u0639\u0629 \u062F\u0641\u0639\u0629 \u0643\u0631\u0648\u062A \u0632\u0648\u0627\u0631 (PDF / Batch Print):
' +
                            '\u2022 \u064A\u0645\u0643\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0646 1 \u0625\u0644\u0649 50 \u0643\u0627\u0631\u062A \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629.
' +
                            '\u2022 \u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0645\u0642\u062A\u0631\u062D: ' + prefix + defaultStartNum.toString().padStart(3, '0') + '

' +
                            '\u0623\u062F\u062E\u0644 \u0639\u062F\u062F \u0627\u0644\u0643\u0631\u0648\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0635\u062F\u0648\u0631\u0647\u0627 (1 \u0625\u0644\u0649 50):',
                            '10'
                        );
                        if (!qtyStr) return;
                        let num = parseInt(qtyStr);
                        if (isNaN(num) || num < 1) return;
                        if (num > 50) {
                            alert('\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 \u0641\u064A \u0627\u0644\u062F\u0641\u0639\u0629 \u0627\u0644\u0648\u0627\u062D\u062F\u0629 \u0647\u0648 50 \u0643\u0627\u0631\u062A. \u062A\u0645 \u0636\u0628\u0637 \u0627\u0644\u0639\u062F\u062F \u0639\u0644\u0649 50.');
                            num = 50;
                        }

                        const startNumStr = prompt(
                            '\u062A\u062D\u062F\u064A\u062F \u062A\u0633\u0644\u0633\u0644 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:
' +
                            '\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u062A\u0633\u0644\u0633\u0644 (\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0631\u0642\u064A\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B):',
                            defaultStartNum.toString()
                        );
                        const startNum = parseInt(startNumStr || defaultStartNum);
                        if (isNaN(startNum)) return;

                        const baseCard = document.querySelector('.card-container');
                        if (!baseCard) return;

                        let batchWrap = document.getElementById('batchWrapperContainer');
                        if (!batchWrap) {
                            batchWrap = document.createElement('div');
                            batchWrap.id = 'batchWrapperContainer';
                            baseCard.parentNode.insertBefore(batchWrap, baseCard);
                        }
                        batchWrap.innerHTML = '';
                        baseCard.style.display = 'none';

                        let lastGeneratedNum = startNum;
                        for (let i = 0; i < num; i++) {
                            lastGeneratedNum = startNum + i;
                            const clone = baseCard.cloneNode(true);
                            clone.style.display = '';
                            clone.style.pageBreakAfter = 'always';
                            clone.style.marginBottom = '30px';
                            
                            const cardSerial = prefix + lastGeneratedNum.toString().padStart(3, '0');
                            const serialBox = clone.querySelector('#badgeSerialBox');
                            if (serialBox) serialBox.textContent = 'Badge: ' + cardSerial;
                            
                            batchWrap.appendChild(clone);
                        }

                        // \u062D\u0641\u0638 \u0622\u062E\u0631 \u0631\u0642\u0645 \u062A\u0645 \u0637\u0628\u0627\u0639\u062A\u0647 \u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0627\u0644\u062A\u0633\u0644\u0633\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629
                        localStorage.setItem('icapp_last_visitor_badge_num', lastGeneratedNum.toString());
                        const nextNum = lastGeneratedNum + 1;
                        const nextSerialText = prefix + nextNum.toString().padStart(3, '0');
                        const inputElem = document.getElementById('badgeSerialInput');
                        if (inputElem) inputElem.value = nextSerialText;

                        alert(
                            '\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0648\u062A\u0648\u0644\u064A\u062F ' + num + ' \u0643\u0627\u0631\u062A \u0632\u0627\u0626\u0631 \u0645\u062A\u062A\u0627\u0644\u064A \u0628\u0646\u062C\u0627\u062D!
' +
                            '\u0627\u0644\u0646\u0637\u0627\u0642: \u0645\u0646 ' + prefix + startNum.toString().padStart(3, '0') + ' \u0625\u0644\u0649 ' + prefix + lastGeneratedNum.toString().padStart(3, '0') + '

' +
                            '\u062A\u0646\u0648\u064A\u0647: \u0627\u0644\u062F\u0641\u0639\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629 \u0633\u062A\u0633\u062A\u0643\u0645\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0643\u0627\u0631\u062A: ' + nextSerialText
                        );
                        window.print();
                    };

                    function updateSiteMap(site) {
                        const coordsMap = {
                            'ICAPP-1': '30\xB024\\'12.4"N 31\xB018\\'45.2"E - \u0645\u0635\u0646\u0639 1 \u0627\u0644\u0641\u0627\u0643\u0647\u0629',
                            'ICAPP-2': '30\xB024\\'14.1"N 31\xB018\\'48.6"E - \u0645\u0635\u0646\u0639 2 \u0627\u0644\u062A\u062C\u0645\u064A\u062F',
                            'ICAPP-3': '30\xB024\\'15.8"N 31\xB018\\'50.1"E - \u0645\u0635\u0646\u0639 3 \u0627\u0644\u0645\u0631\u0643\u0632\u0627\u062A',
                            'ICAPP-4': '30\xB024\\'10.2"N 31\xB018\\'42.5"E - \u0645\u062D\u0637\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0627\u0644\u0637\u0627\u0642\u0629',
                            'WH': '30\xB024\\'18.0"N 31\xB018\\'52.3"E - \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0639\u0627\u0645\u0629',
                            '\u0627\u0644\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u064A': '30\xB024\\'08.5"N 31\xB018\\'40.1"E - \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629',
                            '\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645': '${t.coords}'
                        };
                        const c = coordsMap[site] || '${t.coords}';
                        document.getElementById('customCoords').value = c;
                        document.getElementById('displayCoords').textContent = '\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639: ' + c + ' | DOC-HSE-MAP-01 Rev.02';
                    }
                <\/script>
            </body>
            </html>
        `),s.document.close()}exportToExcel(){if(this.filteredVisitors.length===0){alert("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}let e=`\uFEFF\u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A,\u0627\u0633\u0645 \u0627\u0644\u0632\u0627\u0626\u0631,\u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0634\u0631\u0643\u0629,\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641,\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A,\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641,\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641,\u0627\u0644\u0645\u0633\u062A\u0636\u064A\u0641,\u063A\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629,\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062F\u062E\u0648\u0644,\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644,\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C,\u0627\u0644\u062D\u0627\u0644\u0629
`;this.filteredVisitors.forEach(o=>{e+=`"${o.badge||""}","${o.name||""}","${o.org||""}","${o.phone||""}","${o.idNumber||""}","${o.site||""}","${o.area||""}","${o.host||""}","${o.purpose||""}","${o.entryDate||""}","${o.entryTime||""}","${o.exitTime||""}","${o.exitTime?"\u062A\u0645 \u0627\u0644\u062E\u0631\u0648\u062C":"\u0628\u0627\u0644\u062F\u0627\u062E\u0644"}"
`});const i=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(i),r=document.createElement("a");r.href=t,r.download=`Gate_Visitors_Log_${new Date().toISOString().slice(0,10)}.csv`,r.click(),URL.revokeObjectURL(t)}}new GateSecurityModule;
