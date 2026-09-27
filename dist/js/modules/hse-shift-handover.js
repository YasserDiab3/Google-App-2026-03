(()=>{"use strict";if(!(typeof window>"u")&&!window.HseShiftHandoverInitialized){window.HseShiftHandoverInitialized=!0;try{let k=function(){if(document.getElementById("hseShiftHandoverModal"))return document.getElementById("hseShiftHandoverModal");const e=document.createElement("div");e.id="hseShiftHandoverModal",e.className="emergency-modal-overlay",e.style.display="none";const t=new Date().toISOString().slice(0,10),i=new Date().getHours();let o="\u0627\u0644\u0623\u0648\u0644\u0649 (07:00 - 15:00)";i>=15&&i<23?o="\u0627\u0644\u062B\u0627\u0646\u064A\u0629 (15:00 - 23:00)":(i>=23||i<7)&&(o="\u0627\u0644\u062B\u0627\u0644\u062B\u0629 (23:00 - 07:00)"),e.innerHTML=`
                <div class="emergency-modal-dialog" style="max-width: 760px; animation: fadeInModal 0.25s ease;" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #1e3a8a, #0284c7); color: #ffffff; padding: 16px 20px; border-radius: 16px 16px 0 0; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.15rem;">
                                <i class="fas fa-clipboard-user"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800;">\u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0631\u0642\u0645\u064A</h3>
                                <p style="margin: 2px 0 0; font-size: 0.75rem; opacity: 0.9;">\u0645\u0644\u062E\u0635 \u0646\u0634\u0627\u0637 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0628\u064A\u0646 \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A</p>
                            </div>
                        </div>
                        <button type="button" class="emergency-modal-close-btn" id="btnCloseHandoverModal" style="width: 36px; height: 36px; min-width: 36px; min-height: 36px; color: #ffffff; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.2); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; padding: 0; outline: none; transition: background 0.2s ease;" title="\u0625\u063A\u0644\u0627\u0642">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Navigation Tabs Header -->
                    <div style="background: #f1f5f9; padding: 8px 16px; display: flex; gap: 8px; border-bottom: 1px solid #e2e8f0; direction: rtl;">
                        <button type="button" id="hoTabBtnCurrent" onclick="HseShiftHandover.switchTab('current')" style="background: #ffffff; color: #1e3a8a; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s;">
                            <i class="fas fa-file-pen"></i> \u0645\u062D\u0636\u0631 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629
                        </button>
                        <button type="button" id="hoTabBtnHistory" onclick="HseShiftHandover.switchTab('history')" style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
                            <i class="fas fa-clock-rotate-left"></i> \u0633\u062C\u0644 \u0627\u0644\u0645\u062D\u0627\u0636\u0631 \u0627\u0644\u0633\u0627\u0628\u0642\u0629
                            <span id="hoHistoryBadgeCount" style="background: #e2e8f0; color: #1e293b; font-size: 0.7rem; padding: 1px 6px; border-radius: 10px; margin-right: 4px;">0</span>
                        </button>
                    </div>

                    <!-- Body -->
                    <div style="padding: 18px 20px; max-height: 74vh; overflow-y: auto; text-align: right; direction: rtl;">
                        <!-- Pre-Handover Offline Sync Notice Bar -->
                        <div id="hoOfflineSyncNotice" style="display: none; margin-bottom: 14px; padding: 10px 14px; border-radius: 10px; font-size: 0.8rem; border: 1.5px solid #fef08a; background: #fefce8; color: #854d0e; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 240px;">
                                <i class="fas fa-triangle-exclamation" style="font-size: 1.1rem; color: #d97706; flex-shrink: 0;"></i>
                                <span id="hoOfflineSyncMsg">\u064A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u062D\u0641\u0648\u0638\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632 \u0644\u0645 \u064A\u062A\u0645 \u0631\u0641\u0639\u0647\u0627 \u0628\u0639\u062F.</span>
                            </div>
                            <button type="button" id="btnHoSyncNow" onclick="HseShiftHandover.triggerPreHandoverSync()" style="background: #d97706; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; flex-shrink: 0;">
                                <i class="fas fa-rotate"></i> \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0622\u0646
                            </button>
                        </div>

                        <!-- VIEW 1: Current Handover Form -->
                        <form id="frmShiftHandover" onsubmit="event.preventDefault();">
                            <!-- Basic Shift Meta -->
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px;">
                                <div>
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0648\u0631\u062F\u064A\u0629:</label>
                                    <input type="date" id="hoDate" value="${t}" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;" />
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0645\u064F\u0633\u0644\u0651\u064E\u0645\u0629:</label>
                                    <select id="hoShift" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;">
                                        <option value="\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (07:00 - 15:00)" ${o.includes("\u0627\u0644\u0623\u0648\u0644\u0649")?"selected":""}>\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (07:00 - 15:00)</option>
                                        <option value="\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 (15:00 - 23:00)" ${o.includes("\u0627\u0644\u062B\u0627\u0646\u064A\u0629")?"selected":""}>\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 (15:00 - 23:00)</option>
                                        <option value="\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0644\u062B\u0629 (23:00 - 07:00)" ${o.includes("\u0627\u0644\u062B\u0627\u0644\u062B\u0629")?"selected":""}>\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0644\u062B\u0629 (23:00 - 07:00)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639:</label>
                                    <select id="hoSite" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;">
                                        <option value="\u0643\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639">\u0643\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 (ICAPP 1 + ICAPP 2)</option>
                                        <option value="\u0645\u0635\u0646\u0639 ICAPP 1">\u0645\u0635\u0646\u0639 ICAPP 1</option>
                                        <option value="\u0645\u0635\u0646\u0639 ICAPP 2">\u0645\u0635\u0646\u0639 ICAPP 2</option>
                                        <option value="\u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629">\u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Officers Info -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0;">
                                <div>
                                    <label style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">
                                        <span>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645:</span>
                                        <span id="hoOutgoingBadge" style="font-size: 0.68rem; color: #0284c7; background: #e0f2fe; padding: 1px 6px; border-radius: 4px; display: none;">\u0645\u062D\u062F\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</span>
                                    </label>
                                    <select id="hoOutgoingOfficer" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box; background: #ffffff; font-weight: 700; color: #1e293b;">
                                        <option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0634\u0631\u0641 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645 \u2014</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645: <span style="color:#ef4444;">*</span></label>
                                    <select id="hoIncomingOfficer" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box; background: #ffffff; font-weight: 700; color: #1e293b;">
                                        <option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0634\u0631\u0641 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645 \u2014</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Auto KPI Strip -->
                            <div style="margin-bottom: 16px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                    <span style="font-size: 0.82rem; font-weight: 800; color: #1e293b;">\u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0646\u0634\u0627\u0637 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0648\u0631\u062F\u064A\u0629:</span>
                                    <button type="button" onclick="HseShiftHandover.refreshKpis()" style="background: none; border: none; color: #0284c7; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
                                        <i class="fas fa-rotate"></i> \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A
                                    </button>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center;">
                                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 6px;">
                                        <div style="font-size: 1.25rem; font-weight: 900; color: #1d4ed8;" id="hoKpiObsTotal">0</div>
                                        <div style="font-size: 0.72rem; color: #1e40af; font-weight: 700;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0648\u0631\u062F\u064A\u0629</div>
                                    </div>
                                    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 6px;">
                                        <div style="font-size: 1.25rem; font-weight: 900; color: #dc2626;" id="hoKpiObsHigh">0</div>
                                        <div style="font-size: 0.72rem; color: #991b1b; font-weight: 700;">\u0623\u062E\u0637\u0627\u0631 \u0639\u0627\u0644\u064A\u0629</div>
                                    </div>
                                    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 10px 6px;">
                                        <div style="font-size: 1.25rem; font-weight: 900; color: #059669;" id="hoKpiObsClosed">0</div>
                                        <div style="font-size: 0.72rem; color: #065f46; font-weight: 700;">\u062A\u0645 \u0625\u063A\u0644\u0627\u0642\u0647\u0627</div>
                                    </div>
                                    <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 10px 6px;">
                                        <div style="font-size: 1.25rem; font-weight: 900; color: #ca8a04;" id="hoKpiPtwCount">0</div>
                                        <div style="font-size: 0.72rem; color: #854d0e; font-weight: 700;">\u062A\u0635\u0627\u0631\u064A\u062D \u0646\u0634\u0637\u0629 (PTW)</div>
                                    </div>
                                </div>
                            </div>

                            <!-- TBT Linkage Section -->
                            <div id="hoTbtSection" style="margin-bottom: 16px; background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 10px; padding: 10px 14px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 4px;">
                                    <span style="font-size: 0.8rem; font-weight: 800; color: #166534; display: flex; align-items: center; gap: 6px;">
                                        <i class="fas fa-bullhorn" style="color: #16a34a;"></i> \u062A\u0648\u0639\u064A\u0629 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 (Toolbox Talk - TBT):
                                    </span>
                                    <span id="hoTbtBadge" style="font-size: 0.7rem; font-weight: 700; color: #15803d; background: #dcfce7; padding: 2px 8px; border-radius: 6px;">
                                        \u062C\u0627\u0631\u064A \u0627\u0644\u0641\u062D\u0635...
                                    </span>
                                </div>
                                <div id="hoTbtContent" style="font-size: 0.82rem; color: #1e293b; display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
                                    <div id="hoTbtTitle" style="font-weight: 600;">\u0644\u0627 \u062A\u0648\u062C\u062F \u062C\u0644\u0633\u0629 TBT \u0645\u0633\u062C\u0644\u0629 \u0627\u0644\u064A\u0648\u0645 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646.</div>
                                    <button type="button" id="btnHoInsertTbt" onclick="HseShiftHandover.insertTbtToInstructions()" style="display: none; background: #16a34a; color: #fff; border: none; padding: 5px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; white-space: nowrap; align-items: center; gap: 5px;">
                                        <i class="fas fa-plus"></i> \u0625\u062F\u0631\u0627\u062C \u0628\u0627\u0644\u062A\u0648\u062C\u064A\u0647\u0627\u062A
                                    </button>
                                </div>
                            </div>

                            <!-- Critical Handover Instructions -->
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; font-size: 0.82rem; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                                    \u0628\u0646\u0648\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062D\u0631\u062C\u0629 \u0648\u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0644\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629: <span style="color:#ef4444;">*</span>
                                </label>
                                <textarea id="hoInstructions" rows="4" required placeholder="\u0645\u062B\u0627\u0644:
1. \u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0648\u0642\u0639 \u0627\u0644\u0644\u062D\u0627\u0645 \u0628\u0639\u0646\u0628\u0631 \u0627\u0644\u062A\u062C\u0645\u064A\u062F \u0648\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062E\u0644\u0648\u0647 \u0645\u0646 \u0623\u064A \u062F\u062E\u0627\u0646 \u0628\u0639\u062F \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0648\u0631\u062F\u064A\u0629.
2. \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u063A\u0644\u0642 \u0644\u0648\u062D\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0631\u0642\u0645 4 \u0628\u0639\u062F \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u064A\u0627\u0646\u0629.
3. \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u062C\u0648\u0644\u0629 \u0641\u062D\u0635 \u0627\u0644\u0637\u0641\u0627\u064A\u0627\u062A \u0641\u064A \u0645\u062E\u0632\u0646 \u0627\u0644\u0643\u0631\u062A\u0648\u0646..."
                                          style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.88rem; outline: none; box-sizing: border-box; resize: vertical; line-height: 1.5;"></textarea>
                            </div>

                            <!-- Buttons -->
                            <div style="display: flex; gap: 10px; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid #e2e8f0; flex-wrap: wrap;">
                                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                    <button type="button" onclick="HseShiftHandover.saveHandoverToHistory(true)" style="background: #0284c7; color: #ffffff; border: none; padding: 10px 15px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                        <i class="fas fa-floppy-disk"></i> \u062D\u0641\u0638 \u0628\u0627\u0644\u0633\u062C\u0644
                                    </button>
                                    <button type="button" onclick="HseShiftHandover.shareViaWhatsApp()" style="background: #25d366; color: #ffffff; border: none; padding: 10px 15px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);">
                                        <i class="fab fa-whatsapp fa-lg"></i> \u0645\u0634\u0627\u0631\u0643\u0629 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628
                                    </button>
                                    <button type="button" onclick="HseShiftHandover.printHandoverReport()" style="background: #334155; color: #ffffff; border: none; padding: 10px 15px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                        <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u062D\u0636\u0631
                                    </button>
                                </div>
                                <button type="button" id="btnCancelHandover" style="padding: 10px 16px; background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                    \u0625\u063A\u0644\u0627\u0642
                                </button>
                            </div>
                        </form>

                        <!-- VIEW 2: History View (initially hidden) -->
                        <div id="hoHistoryView" style="display: none;">
                            <div style="margin-bottom: 14px; position: relative;">
                                <input type="text" id="hoHistorySearch" placeholder="\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u062D\u0627\u0636\u0631 \u0627\u0644\u0633\u0627\u0628\u0642\u0629 (\u062A\u0627\u0631\u064A\u062E\u060C \u0648\u0631\u062F\u064A\u0629\u060C \u0645\u0634\u0631\u0641\u060C \u0645\u0648\u0642\u0639)..." oninput="HseShiftHandover.renderHistoryList(this.value)" style="width: 100%; padding: 8px 34px 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;" />
                                <i class="fas fa-search" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
                            </div>
                            <div id="hoHistoryCardsContainer"></div>
                        </div>
                    </div>
                </div>
            `,document.body.appendChild(e),x=e,e.onclick=d=>{d.target===e&&v()};const n=e.querySelector("#btnCloseHandoverModal"),s=e.querySelector("#btnCancelHandover");n&&(n.onclick=v),s&&(s.onclick=v);const a=e.querySelector("#hoDate"),r=e.querySelector("#hoSite");return a&&(a.onchange=()=>{h(),y()}),r&&(r.onchange=()=>{h(),y()}),e},_=function(){const e=new Set;if(typeof window.getSystemSafetyTeamMembers=="function")try{const t=window.getSystemSafetyTeamMembers();Array.isArray(t)&&t.forEach(i=>i&&e.add(i.trim()))}catch{}try{const t=JSON.parse(localStorage.getItem("HSE_PUBLIC_OBS_CONFIG")||"{}");Array.isArray(t.safetyMembers)&&t.safetyMembers.forEach(i=>{const o=typeof i=="string"?i.trim():i&&i.name?i.name.trim():"";o&&e.add(o)})}catch{}try{const t=JSON.parse(localStorage.getItem("HSE_DAILY_SAFETY_MEMBERS")||"[]");Array.isArray(t)&&t.forEach(i=>{const o=typeof i=="string"?i.trim():i&&i.name?i.name.trim():"";o&&e.add(o)})}catch{}return e.size===0&&["\u0645/ \u0645\u062D\u0645\u062F \u0633\u0639\u064A\u062F","\u0645/ \u062D\u0633\u0627\u0645 \u0627\u0644\u0633\u064A\u062F","\u0623/ \u0623\u062D\u0645\u062F \u0641\u0624\u0627\u062F","\u0645/ \u0639\u0645\u0627\u062F \u0637\u0627\u0631\u0642","\u0645/ \u0645\u062D\u0645\u0648\u062F \u0639\u0644\u064A","\u0623/ \u0637\u0627\u0631\u0642 \u0645\u0635\u0637\u0641\u0649"].forEach(t=>e.add(t)),Array.from(e).sort((t,i)=>t.localeCompare(i,"ar"))},B=function(){const e=document.getElementById("hoOutgoingOfficer"),t=document.getElementById("hoIncomingOfficer");if(!e||!t)return;const i=_();let o="";try{const r=sessionStorage.getItem("HSE_FIELD_SESSION")||localStorage.getItem("HSE_LAST_USER_NAME");if(r){let d=null;try{d=JSON.parse(r)}catch{}o=d&&(d.userName||d.name||d.inspector)||(typeof r=="string"&&!r.startsWith("{")?r:""),o&&(o=o.trim())}}catch{}const n=e.value;e.innerHTML='<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0634\u0631\u0641 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645 \u2014</option>';let s=!1;if(i.forEach(r=>{o&&(r.toLowerCase().includes(o.toLowerCase())||o.toLowerCase().includes(r.toLowerCase()))&&(s=!0)}),o&&!s){const r=document.createElement("option");r.value=o,r.textContent=`\u{1F464} ${o} (\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u064A)`,e.appendChild(r)}if(i.forEach(r=>{const d=document.createElement("option");d.value=r,d.textContent=`\u{1F464} ${r}`,e.appendChild(d)}),n)e.value=n;else if(o)for(let r=0;r<e.options.length;r++){const d=e.options[r].value;if(d&&(d.toLowerCase().includes(o.toLowerCase())||o.toLowerCase().includes(d.toLowerCase()))){e.selectedIndex=r;break}}e.onchange=()=>{const r=document.getElementById("hoOutgoingBadge");r&&(o&&e.value&&(e.value.toLowerCase().includes(o.toLowerCase())||o.toLowerCase().includes(e.value.toLowerCase()))?(r.style.display="inline-block",r.textContent="\u0645\u062D\u062F\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",r.style.background="#e0f2fe",r.style.color="#0284c7"):e.value?(r.style.display="inline-block",r.textContent="\u0627\u062E\u062A\u064A\u0627\u0631 \u064A\u062F\u0648\u064A",r.style.background="#f1f5f9",r.style.color="#475569"):r.style.display="none")},e.onchange();const a=t.value;t.innerHTML='<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0634\u0631\u0641 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645 \u2014</option>',i.forEach(r=>{const d=document.createElement("option");d.value=r,d.textContent=`\u{1F465} ${r}`,t.appendChild(d)}),a&&(t.value=a)},A=function(){if(!p)return;const e=document.getElementById("hoInstructions");if(!e)return;const t=`\u2022 \u062A\u0645 \u062A\u0646\u0641\u064A\u0630 \u062C\u0644\u0633\u0629 \u062A\u0648\u0639\u064A\u0629 (TBT) \u0628\u0639\u0646\u0648\u0627\u0646: \xAB${p.topic}\xBB \u0628\u062D\u0636\u0648\u0631 (${p.attendees}) \u0639\u0627\u0645\u0644\u0627\u064B \u0628\u0642\u064A\u0627\u062F\u0629 (${p.trainer}).
`;e.value.includes(p.topic)||(e.value=t+e.value),b("\u2705 \u062A\u0645 \u0625\u062F\u0631\u0627\u062C \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u0644\u0633\u0629 \u0627\u0644\u0640 TBT \u0641\u064A \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0648\u062C\u064A\u0647\u0627\u062A")},w=function(){const e=document.getElementById("hoHistoryBadgeCount");if(e)try{const t=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]");e.textContent=Array.isArray(t)?t.length:0}catch{e.textContent="0"}},S=function(e){const t=document.getElementById("hoTabBtnCurrent"),i=document.getElementById("hoTabBtnHistory"),o=document.getElementById("frmShiftHandover"),n=document.getElementById("hoHistoryView");e==="history"?(t&&(t.style.background="transparent",t.style.color="#64748b",t.style.fontWeight="700",t.style.boxShadow="none"),i&&(i.style.background="#ffffff",i.style.color="#1e3a8a",i.style.fontWeight="800",i.style.boxShadow="0 1px 3px rgba(0,0,0,0.1)"),o&&(o.style.display="none"),n&&(n.style.display="block"),I()):(i&&(i.style.background="transparent",i.style.color="#64748b",i.style.fontWeight="700",i.style.boxShadow="none"),t&&(t.style.background="#ffffff",t.style.color="#1e3a8a",t.style.fontWeight="800",t.style.boxShadow="0 1px 3px rgba(0,0,0,0.1)"),n&&(n.style.display="none"),o&&(o.style.display="block"))},H=function(e=!0){const t=document.getElementById("hoDate")?.value||new Date().toISOString().slice(0,10),i=document.getElementById("hoShift")?.value||"\u0627\u0644\u0648\u0631\u062F\u064A\u0629",o=document.getElementById("hoSite")?.value||"\u0645\u0635\u0627\u0646\u0639 ICAPP",n=document.getElementById("hoOutgoingOfficer")?.value.trim()||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",s=document.getElementById("hoIncomingOfficer")?.value.trim()||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",a=document.getElementById("hoInstructions")?.value.trim()||"",r=document.getElementById("hoKpiObsTotal")?.textContent||"0",d=document.getElementById("hoKpiObsHigh")?.textContent||"0",g=document.getElementById("hoKpiObsClosed")?.textContent||"0",c=document.getElementById("hoKpiPtwCount")?.textContent||"0",u={id:"HO_"+Date.now(),createdAt:new Date().toISOString(),date:t,shift:i,site:o,outgoing:n,incoming:s,kpis:{total:r,high:d,closed:g,ptw:c},tbtInfo:p||null,instructions:a,fullSummaryText:E()};let f=[];try{f=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}return f.some(m=>m.date===t&&m.shift===i&&m.site===o&&Date.now()-new Date(m.createdAt).getTime()<6e4)||(f.unshift(u),f.length>50&&(f=f.slice(0,50)),localStorage.setItem("HSE_SHIFT_HANDOVERS_HISTORY",JSON.stringify(f))),w(),e&&b("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0641\u064A \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),u},I=function(e=""){const t=document.getElementById("hoHistoryCardsContainer");if(!t)return;let i=[];try{i=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}if(e){const o=e.toLowerCase();i=i.filter(n=>n.date&&n.date.includes(o)||n.shift&&n.shift.toLowerCase().includes(o)||n.site&&n.site.toLowerCase().includes(o)||n.outgoing&&n.outgoing.toLowerCase().includes(o)||n.incoming&&n.incoming.toLowerCase().includes(o)||n.instructions&&n.instructions.toLowerCase().includes(o))}if(i.length===0){t.innerHTML=`
                    <div style="text-align: center; padding: 36px 16px; color: #64748b;">
                        <i class="fas fa-folder-open" style="font-size: 2.2rem; opacity: 0.4; margin-bottom: 10px;"></i>
                        <div style="font-weight: 700; font-size: 0.9rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062D\u0627\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0645\u0633\u062C\u0644\u0629 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0633\u062C\u0644</div>
                        <div style="font-size: 0.78rem; opacity: 0.8; margin-top: 4px;">\u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0645\u062D\u0627\u0636\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0647\u0646\u0627 \u0639\u0646\u062F \u062D\u0641\u0638 \u0623\u0648 \u0627\u0639\u062A\u0645\u0627\u062F \u0623\u0648 \u0645\u0634\u0627\u0631\u0643\u0629 \u0623\u064A \u0645\u062D\u0636\u0631 \u0648\u0631\u062F\u064A\u0629.</div>
                    </div>
                `;return}t.innerHTML=i.map(o=>`
                <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                        <div>
                            <span style="font-weight: 800; color: #1e3a8a; font-size: 0.9rem;">${l(o.shift||"\u0627\u0644\u0648\u0631\u062F\u064A\u0629")}</span>
                            <span style="font-size: 0.75rem; color: #64748b; margin-right: 6px;">\u{1F4C5} ${l(o.date||"")}</span>
                            <span style="font-size: 0.75rem; color: #0284c7; background: #e0f2fe; padding: 1px 6px; border-radius: 4px; margin-right: 6px;">${l(o.site||"")}</span>
                        </div>
                        <div style="font-size: 0.72rem; color: #94a3b8;">
                            ${new Date(o.createdAt||Date.now()).toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"})}
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem; background: #f8fafc; padding: 8px 10px; border-radius: 8px; margin-bottom: 8px;">
                        <div><b>\u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645:</b> \u{1F464} ${l(o.outgoing||"\u2014")}</div>
                        <div><b>\u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645:</b> \u{1F465} ${l(o.incoming||"\u2014")}</div>
                    </div>

                    <!-- KPIs Badge Row -->
                    <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
                        <span style="background: #eff6ff; color: #1d4ed8; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A: ${o.kpis?.total||0}</span>
                        <span style="background: #fef2f2; color: #dc2626; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u0623\u062E\u0637\u0627\u0631 \u0639\u0627\u0644\u064A\u0629: ${o.kpis?.high||0}</span>
                        <span style="background: #ecfdf5; color: #059669; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u0645\u063A\u0644\u0642\u0629: ${o.kpis?.closed||0}</span>
                        <span style="background: #fefce8; color: #ca8a04; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u062A\u0635\u0627\u0631\u064A\u062D: ${o.kpis?.ptw||0}</span>
                        ${o.tbtInfo?.topic?`<span style="background: #f0fdf4; color: #15803d; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u{1F4E2} TBT: ${l(o.tbtInfo.topic.slice(0,24))}...</span>`:""}
                    </div>

                    <!-- Instructions snippet -->
                    <div style="font-size: 0.8rem; color: #334155; background: #fafafa; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 8px; margin-bottom: 10px; max-height: 60px; overflow: hidden; text-overflow: ellipsis; white-space: pre-line;">
                        ${l(o.instructions||"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0645\u0633\u062C\u0644\u0629")}
                    </div>

                    <!-- Actions Row -->
                    <div style="display: flex; gap: 6px; justify-content: flex-end; flex-wrap: wrap;">
                        <button type="button" onclick="HseShiftHandover.copyInstructionsFromHistory('${o.id}')" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" title="\u0646\u0633\u062E \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0647\u0630\u0647 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627 \u0641\u064A \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629">
                            <i class="fas fa-copy"></i> \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062A\u0648\u062C\u064A\u0647\u0627\u062A
                        </button>
                        <button type="button" onclick="HseShiftHandover.viewFullHistoryReport('${o.id}')" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                            <i class="fas fa-eye"></i> \u0627\u0633\u062A\u0639\u0631\u0627\u0636
                        </button>
                        <button type="button" onclick="HseShiftHandover.printHistoryReport('${o.id}')" style="background: #334155; color: #ffffff; border: none; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                            <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629
                        </button>
                        <button type="button" onclick="HseShiftHandover.shareHistoryWhatsApp('${o.id}')" style="background: #25d366; color: #ffffff; border: none; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                            <i class="fab fa-whatsapp"></i> \u0648\u0627\u062A\u0633\u0627\u0628
                        </button>
                        <button type="button" onclick="HseShiftHandover.deleteHistoryItem('${o.id}')" style="background: #fff; color: #ef4444; border: 1px solid #fecaca; padding: 5px 8px; border-radius: 6px; font-size: 0.75rem; cursor: pointer;" title="\u062D\u0630\u0641 \u0645\u0646 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u062D\u0644\u064A">
                            <i class="fas fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `).join("")},$=function(e){let t=[];try{t=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}const i=t.find(n=>n.id===e);if(!i||!i.instructions){b("\u26A0\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u0636\u0631");return}const o=document.getElementById("hoInstructions");if(o){const n=`[\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0646 ${i.shift} \u2014 \u0645\u0633\u0644\u0651\u0650\u0645: ${i.outgoing}]:
`;o.value=n+i.instructions}S("current"),b("\u2705 \u062A\u0645 \u0646\u0633\u062E \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0644\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629")},N=function(e){let t=[];try{t=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}const i=t.find(s=>s.id===e);if(!i)return;const o=i.fullSummaryText||i.instructions||"",n=window.open("","_blank");n&&(n.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="utf-8">
                    <title>\u0623\u0631\u0634\u064A\u0641 \u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u2014 ${l(i.date)}</title>
                    <style>
                        body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; direction: rtl; color: #0f172a; line-height: 1.6; }
                        .report-header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 20px; }
                        .report-header h2 { margin: 0 0 6px 0; font-size: 1.4rem; color: #1e3a8a; }
                        .report-header p { margin: 0; font-size: 0.9rem; color: #64748b; }
                        .content-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px; white-space: pre-wrap; font-size: 0.95rem; margin-bottom: 30px; }
                        .sig-grid { display: flex; justify-content: space-between; margin-top: 40px; padding: 0 40px; }
                        .sig-box { text-align: center; font-size: 0.9rem; font-weight: bold; }
                        .sig-line { width: 180px; border-bottom: 1.5px dashed #475569; margin-top: 50px; }
                    </style>
                </head>
                <body>
                    <div class="report-header">
                        <h2>\u0634\u0631\u0643\u0629 \u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629 \u0644\u0644\u0635\u0646\u0627\u0639\u0627\u062A \u0627\u0644\u063A\u0630\u0627\u0626\u064A\u0629 (ICAPP)</h2>
                        <p>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 \u2022 \u0623\u0631\u0634\u064A\u0641 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0648\u0631\u062F\u064A\u0629</p>
                    </div>
                    <div class="content-box">${l(o)}</div>
                    <div class="sig-grid">
                        <div class="sig-box">
                            <div>\u062A\u0648\u0642\u064A\u0639 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645: ${l(i.outgoing)}</div>
                            <div class="sig-line"></div>
                        </div>
                        <div class="sig-box">
                            <div>\u062A\u0648\u0642\u064A\u0639 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645: ${l(i.incoming)}</div>
                            <div class="sig-line"></div>
                        </div>
                    </div>
                </body>
                </html>
            `),n.document.close())},L=function(e){let t=[];try{t=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}const i=t.find(s=>s.id===e);if(!i)return;const o=i.fullSummaryText||i.instructions||"",n=window.open("","_blank");n&&(n.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="utf-8">
                    <title>\u0637\u0628\u0627\u0639\u0629 \u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0648\u0631\u062F\u064A\u0629</title>
                    <style>
                        body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; direction: rtl; color: #0f172a; line-height: 1.6; }
                        .report-header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 20px; }
                        .report-header h2 { margin: 0 0 6px 0; font-size: 1.4rem; color: #1e3a8a; }
                        .report-header p { margin: 0; font-size: 0.9rem; color: #64748b; }
                        .content-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; white-space: pre-wrap; font-size: 0.95rem; margin-bottom: 30px; }
                        .sig-grid { display: flex; justify-content: space-between; margin-top: 40px; padding: 0 40px; }
                        .sig-box { text-align: center; font-size: 0.9rem; font-weight: bold; }
                        .sig-line { width: 180px; border-bottom: 1.5px dashed #475569; margin-top: 50px; }
                        @media print { body { padding: 0; } }
                    </style>
                </head>
                <body>
                    <div class="report-header">
                        <h2>\u0634\u0631\u0643\u0629 \u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629 \u0644\u0644\u0635\u0646\u0627\u0639\u0627\u062A \u0627\u0644\u063A\u0630\u0627\u0626\u064A\u0629 (ICAPP)</h2>
                        <p>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 \u2022 \u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0648\u0631\u062F\u064A\u0629</p>
                    </div>
                    <div class="content-box">${l(o)}</div>
                    <div class="sig-grid">
                        <div class="sig-box">
                            <div>\u062A\u0648\u0642\u064A\u0639 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645: ${l(i.outgoing)}</div>
                            <div class="sig-line"></div>
                        </div>
                        <div class="sig-box">
                            <div>\u062A\u0648\u0642\u064A\u0639 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645: ${l(i.incoming)}</div>
                            <div class="sig-line"></div>
                        </div>
                    </div>
                    <script>window.onload = () => { window.print(); };<\/script>
                </body>
                </html>
            `),n.document.close())},P=function(e){let t=[];try{t=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}const i=t.find(s=>s.id===e);if(!i)return;const o=i.fullSummaryText||i.instructions||"",n=`https://api.whatsapp.com/send?text=${encodeURIComponent(o)}`;window.open(n,"_blank")},D=function(e){if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u0636\u0631 \u0645\u0646 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u062D\u0644\u064A\u061F"))return;let t=[];try{t=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}t=t.filter(i=>i.id!==e),localStorage.setItem("HSE_SHIFT_HANDOVERS_HISTORY",JSON.stringify(t)),w(),I(),b("\u{1F5D1}\uFE0F \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062D\u0636\u0631 \u0645\u0646 \u0627\u0644\u0633\u062C\u0644")},b=function(e){let t=document.getElementById("hoTemporaryToast");t||(t=document.createElement("div"),t.id="hoTemporaryToast",t.style.cssText="position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; z-index: 100000; box-shadow: 0 4px 14px rgba(0,0,0,0.3); pointer-events: none; transition: opacity 0.3s ease; opacity: 0; direction: rtl;",document.body.appendChild(t)),t.textContent=e,t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},2800)},R=function(){const e=k();B(),y(),h(),T(),w(),S("current"),e.style.display="flex",document.body.style.overflow="hidden"},v=function(){x&&(x.style.display="none",document.body.style.overflow="")},y=function(){let e=0,t=0,i=0,o=0;try{const d=localStorage.getItem("HSE_PUBLIC_OBS_LOCAL_HISTORY");if(d){const c=JSON.parse(d);Array.isArray(c)&&(e=c.length,c.forEach(u=>{const f=String(u.riskLevel||u.risk||"").toLowerCase();(f.includes("\u0639\u0627\u0644\u064A")||f.includes("high"))&&t++;const O=String(u.status||"").toLowerCase();(O.includes("\u0645\u063A\u0644\u0642")||O.includes("closed"))&&i++}))}if(window.rawObservationsAnalyticsData){const c=window.rawObservationsAnalyticsData;c.totalObservations&&(e=Math.max(e,c.totalObservations)),c.highRiskCount&&(t=Math.max(t,c.highRiskCount)),c.closedCount&&(i=Math.max(i,c.closedCount))}const g=document.getElementById("ptwSummaryCount");if(g){const c=parseInt(g.textContent,10);isNaN(c)||(o=c)}}catch{}const n=document.getElementById("hoKpiObsTotal"),s=document.getElementById("hoKpiObsHigh"),a=document.getElementById("hoKpiObsClosed"),r=document.getElementById("hoKpiPtwCount");n&&(n.textContent=e),s&&(s.textContent=t),a&&(a.textContent=i),r&&(r.textContent=o)},E=function(){const e=document.getElementById("hoDate")?.value||new Date().toISOString().slice(0,10),t=document.getElementById("hoShift")?.value||"\u0627\u0644\u0648\u0631\u062F\u064A\u0629",i=document.getElementById("hoSite")?.value||"\u0645\u0635\u0627\u0646\u0639 ICAPP",o=document.getElementById("hoOutgoingOfficer")?.value.trim()||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",n=document.getElementById("hoIncomingOfficer")?.value.trim()||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",s=document.getElementById("hoInstructions")?.value.trim()||"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u062E\u0627\u0635\u0629 \u0645\u0633\u062C\u0644\u0629.",a=document.getElementById("hoKpiObsTotal")?.textContent||"0",r=document.getElementById("hoKpiObsHigh")?.textContent||"0",d=document.getElementById("hoKpiObsClosed")?.textContent||"0",g=document.getElementById("hoKpiPtwCount")?.textContent||"0";let c="";return p&&p.topic&&(c=`
\u{1F4E2} *\u062A\u0648\u0639\u064A\u0629 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 (TBT):* ${p.topic} (\u0627\u0644\u0639\u062F\u062F: ${p.attendees} | \u0627\u0644\u0645\u062F\u0631\u0628: ${p.trainer})`),`\u{1F4CB} *\u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u2014 ICAPP HSE*
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4C5} *\u0627\u0644\u062A\u0627\u0631\u064A\u062E:* ${e}
\u23F0 *\u0627\u0644\u0648\u0631\u062F\u064A\u0629:* ${t}
\u{1F3ED} *\u0627\u0644\u0645\u0648\u0642\u0639:* ${i}
\u{1F464} *\u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645:* ${o}
\u{1F464} *\u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645:* ${n}
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4CA} *\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0646\u0634\u0627\u0637 \u0627\u0644\u0648\u0631\u062F\u064A\u0629:*
\u2022 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: ${a}
\u2022 \u0623\u062E\u0637\u0627\u0631 \u062D\u0631\u062C\u0629/\u0639\u0627\u0644\u064A\u0629: ${r} \u26A0\uFE0F
\u2022 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0645 \u0625\u063A\u0644\u0627\u0642\u0647\u0627: ${d} \u2705
\u2022 \u062A\u0635\u0627\u0631\u064A\u062D \u0639\u0645\u0644 \u0646\u0634\u0637\u0629 (PTW): ${g} \u{1F4DC}${c}
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4DD} *\u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0648\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629:*
${s}
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u2705 *\u0645\u0639\u062A\u0645\u062F \u0637\u0628\u0642\u0627\u064B \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 ISO 45001*`},M=function(){H(!1);const e=E(),t=`https://api.whatsapp.com/send?text=${encodeURIComponent(e)}`;window.open(t,"_blank")},F=function(){H(!1);const e=E(),t=document.getElementById("hoOutgoingOfficer")?.value.trim()||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",i=document.getElementById("hoIncomingOfficer")?.value.trim()||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",o=window.open("","_blank");o&&(o.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="utf-8">
                    <title>\u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</title>
                    <style>
                        body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; direction: rtl; color: #0f172a; line-height: 1.6; }
                        .report-header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 20px; }
                        .report-header h2 { margin: 0 0 6px 0; font-size: 1.4rem; color: #1e3a8a; }
                        .report-header p { margin: 0; font-size: 0.9rem; color: #64748b; }
                        .content-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; white-space: pre-wrap; font-size: 0.95rem; margin-bottom: 30px; }
                        .sig-grid { display: flex; justify-content: space-between; margin-top: 40px; padding: 0 40px; }
                        .sig-box { text-align: center; font-size: 0.9rem; font-weight: bold; }
                        .sig-line { width: 180px; border-bottom: 1.5px dashed #475569; margin-top: 50px; }
                        @media print { body { padding: 0; } }
                    </style>
                </head>
                <body>
                    <div class="report-header">
                        <h2>\u0634\u0631\u0643\u0629 \u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629 \u0644\u0644\u0635\u0646\u0627\u0639\u0627\u062A \u0627\u0644\u063A\u0630\u0627\u0626\u064A\u0629 (ICAPP)</h2>
                        <p>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 \u2022 \u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0648\u0631\u062F\u064A\u0629</p>
                    </div>
                    <div class="content-box">${l(e)}</div>
                    <div class="sig-grid">
                        <div class="sig-box">
                            <div>\u062A\u0648\u0642\u064A\u0639 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645: ${l(t)}</div>
                            <div class="sig-line"></div>
                        </div>
                        <div class="sig-box">
                            <div>\u062A\u0648\u0642\u064A\u0639 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645: ${l(i)}</div>
                            <div class="sig-line"></div>
                        </div>
                    </div>
                    <script>window.onload = () => { window.print(); };<\/script>
                </body>
                </html>
            `),o.document.close())},l=function(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""},x=null,p=null;async function T(){const e=document.getElementById("hoOfflineSyncNotice"),t=document.getElementById("hoOfflineSyncMsg"),i=document.getElementById("btnHoSyncNow");if(!e||!t)return;let o={total:0,obs:0,nm:0,ds:0,fe:0,tbt:0};if(window.HseOfflineStore&&typeof window.HseOfflineStore.getCounts=="function")try{o=await window.HseOfflineStore.getCounts()}catch{}else try{const n=JSON.parse(localStorage.getItem("HSE_OFFLINE_OBS_QUEUE")||"[]").length,s=JSON.parse(localStorage.getItem("HSE_OFFLINE_NEARMISS_QUEUE")||"[]").length,a=JSON.parse(localStorage.getItem("HSE_OFFLINE_DAILY_SAFETY_QUEUE")||"[]").length,r=JSON.parse(localStorage.getItem("HSE_OFFLINE_FIRE_INSPECTION_QUEUE")||"[]").length,d=JSON.parse(localStorage.getItem("HSE_OFFLINE_TBT_QUEUE")||"[]").length;o={obs:n,nm:s,ds:a,fe:r,tbt:d,total:n+s+a+r+d}}catch{}if(o.total>0){e.style.display="flex",e.style.background="#fefce8",e.style.borderColor="#fef08a",e.style.color="#854d0e";const n=[];o.obs&&n.push(`${o.obs} \u0645\u0644\u0627\u062D\u0638\u0627\u062A`),o.nm&&n.push(`${o.nm} \u0648\u0634\u064A\u0643`),o.ds&&n.push(`${o.ds} \u0645\u0631\u0648\u0631`),o.fe&&n.push(`${o.fe} \u0625\u0637\u0641\u0627\u0621`),o.tbt&&n.push(`${o.tbt} TBT`),t.innerHTML=`\u26A0\uFE0F <b>\u062A\u0646\u0628\u064A\u0647 \u0642\u0628\u0644 \u0627\u0644\u062A\u0633\u0644\u064A\u0645:</b> \u064A\u0648\u062C\u062F <b>(${o.total})</b> \u0633\u062C\u0644\u0627\u062A \u0645\u062D\u0641\u0648\u0638\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632 \u0644\u0645 \u062A\u064F\u0631\u0641\u0639 \u0628\u0639\u062F (${n.join("\u060C ")}). \u064A\u064F\u0648\u0635\u0649 \u0628\u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0642\u0628\u0644 \u0625\u0646\u0647\u0627\u0621 \u0627\u0644\u0648\u0631\u062F\u064A\u0629.`,i&&(i.style.display="inline-flex")}else e.style.display="flex",e.style.background="#f0fdf4",e.style.borderColor="#bbf7d0",e.style.color="#166534",t.innerHTML="\u2705 <b>\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0645\u062A\u0627\u0632\u0629:</b> \u0643\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0645\u062A\u0632\u0627\u0645\u0646\u0629 \u0633\u062D\u0627\u0628\u064A\u0627\u064B \u0648\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u0644\u0642\u0629 \u0623\u0648\u0641\u0644\u0627\u064A\u0646.",i&&(i.style.display="none")}async function z(){const e=document.getElementById("btnHoSyncNow");if(!navigator.onLine){alert("\u0627\u0644\u062C\u0647\u0627\u0632 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u062D\u0627\u0644\u064A\u0627\u064B. \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639 \u0623\u0648 \u0627\u0644\u0648\u0627\u064A \u0641\u0627\u064A \u0623\u0648\u0644\u0627\u064B \u0644\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629.");return}e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629...');try{typeof window.syncAllOfflineData=="function"?await window.syncAllOfflineData():window.HseOfflineSync&&typeof window.HseOfflineSync.syncAll=="function"&&await window.HseOfflineSync.syncAll()}catch{}await T(),y(),e&&(e.disabled=!1,e.innerHTML='<i class="fas fa-rotate"></i> \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0622\u0646')}async function h(){const e=document.getElementById("hoDate")?.value||new Date().toISOString().slice(0,10);p=null;let t=null;if(window.HseOfflineStore&&typeof window.HseOfflineStore.getAll=="function")try{const s=await window.HseOfflineStore.getAll("tbt_records");Array.isArray(s)&&(t=s.find(a=>a.date===e||a.clientCreatedAt&&a.clientCreatedAt.slice(0,10)===e))}catch{}if(!t)try{const s=JSON.parse(localStorage.getItem("HSE_OFFLINE_TBT_QUEUE")||"[]");Array.isArray(s)&&(t=s.find(a=>a.date===e||a.clientCreatedAt&&a.clientCreatedAt.slice(0,10)===e))}catch{}if(!t)try{const s=JSON.parse(localStorage.getItem("HSE_TBT_RECORDS_CACHE")||"[]");Array.isArray(s)&&(t=s.find(a=>a.date===e||a.clientCreatedAt&&a.clientCreatedAt.slice(0,10)===e))}catch{}const i=document.getElementById("hoTbtBadge"),o=document.getElementById("hoTbtTitle"),n=document.getElementById("btnHoInsertTbt");if(t){const s=t.topic||t.employeePayload&&t.employeePayload.name||"\u062C\u0644\u0633\u0629 \u062A\u0648\u0639\u064A\u0629 \u0645\u064A\u062F\u0627\u0646\u064A\u0629",a=t.totalAttendees||t.participants&&t.participants.length||0,r=t.trainer||t.trainerVal||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629";p={topic:s,attendees:a,trainer:r,date:e},i&&(i.textContent="\u062C\u0644\u0633\u0629 \u0645\u0633\u062C\u0644\u0629 \u2705",i.style.background="#dcfce7",i.style.color="#15803d"),o&&(o.innerHTML=`\u{1F4CC} <b>${l(s)}</b> \u2014 \u0627\u0644\u062D\u0636\u0648\u0631: <span style="color:#16a34a; font-weight:800;">${a} \u0639\u0627\u0645\u0644\u0627\u064B</span> (\u0627\u0644\u0645\u062F\u0631\u0628: ${l(r)})`),n&&(n.style.display="inline-flex")}else i&&(i.textContent="\u0644\u0645 \u062A\u064F\u0633\u062C\u0644 \u0628\u0639\u062F",i.style.background="#f1f5f9",i.style.color="#64748b"),o&&(o.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062C\u0644\u0633\u0629 \u062A\u0648\u0639\u064A\u0629 (TBT) \u0645\u0633\u062C\u0644\u0629 \u0628\u0647\u0630\u0627 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u062D\u062A\u0649 \u0627\u0644\u0622\u0646."),n&&(n.style.display="none")}const C={open:R,close:v,refreshKpis:y,shareViaWhatsApp:M,printHandoverReport:F,triggerPreHandoverSync:z,loadTbtSummaryForShift:h,insertTbtToInstructions:A,switchTab:S,saveHandoverToHistory:H,renderHistoryList:I,copyInstructionsFromHistory:$,viewFullHistoryReport:N,printHistoryReport:L,shareHistoryWhatsApp:P,deleteHistoryItem:D};window.HseShiftHandover=C,window.HseHandover=C}catch{}}})();
