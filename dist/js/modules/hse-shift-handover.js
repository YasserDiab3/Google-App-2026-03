(()=>{"use strict";if(!(typeof window>"u")&&!window.HseShiftHandoverInitialized){window.HseShiftHandoverInitialized=!0;try{let B=function(){if(document.getElementById("hseShiftHandoverModal"))return document.getElementById("hseShiftHandoverModal");const t=document.createElement("div");t.id="hseShiftHandoverModal",t.className="emergency-modal-overlay",t.style.display="none";const e=new Date().toISOString().slice(0,10),i=new Date().getHours();let o="\u0627\u0644\u0623\u0648\u0644\u0649 (07:00 - 15:00)";i>=15&&i<23?o="\u0627\u0644\u062B\u0627\u0646\u064A\u0629 (15:00 - 23:00)":(i>=23||i<7)&&(o="\u0627\u0644\u062B\u0627\u0644\u062B\u0629 (23:00 - 07:00)"),t.innerHTML=`
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
                                    <input type="date" id="hoDate" value="${e}" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;" />
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
            `,document.body.appendChild(t),v=t,t.onclick=a=>{a.target===t&&I()};const n=t.querySelector("#btnCloseHandoverModal"),s=t.querySelector("#btnCancelHandover");n&&(n.onclick=I),s&&(s.onclick=I);const d=t.querySelector("#hoDate"),r=t.querySelector("#hoSite");return d&&(d.onchange=()=>{w(),y()}),r&&(r.onchange=()=>{w(),y()}),t},_=function(){const t=new Set;if(typeof window.getSystemSafetyTeamMembers=="function")try{const e=window.getSystemSafetyTeamMembers();Array.isArray(e)&&e.forEach(i=>i&&t.add(i.trim()))}catch{}try{const e=JSON.parse(localStorage.getItem("HSE_PUBLIC_OBS_CONFIG")||"{}");Array.isArray(e.safetyMembers)&&e.safetyMembers.forEach(i=>{const o=typeof i=="string"?i.trim():i&&i.name?i.name.trim():"";o&&t.add(o)})}catch{}try{const e=JSON.parse(localStorage.getItem("HSE_DAILY_SAFETY_MEMBERS")||"[]");Array.isArray(e)&&e.forEach(i=>{const o=typeof i=="string"?i.trim():i&&i.name?i.name.trim():"";o&&t.add(o)})}catch{}return t.size===0&&["\u0645/ \u0645\u062D\u0645\u062F \u0633\u0639\u064A\u062F","\u0645/ \u062D\u0633\u0627\u0645 \u0627\u0644\u0633\u064A\u062F","\u0623/ \u0623\u062D\u0645\u062F \u0641\u0624\u0627\u062F","\u0645/ \u0639\u0645\u0627\u062F \u0637\u0627\u0631\u0642","\u0645/ \u0645\u062D\u0645\u0648\u062F \u0639\u0644\u064A","\u0623/ \u0637\u0627\u0631\u0642 \u0645\u0635\u0637\u0641\u0649"].forEach(e=>t.add(e)),Array.from(t).sort((e,i)=>e.localeCompare(i,"ar"))},A=function(){const t=document.getElementById("hoOutgoingOfficer"),e=document.getElementById("hoIncomingOfficer");if(!t||!e)return;const i=_();let o="";try{const r=sessionStorage.getItem("HSE_FIELD_SESSION")||localStorage.getItem("HSE_LAST_USER_NAME");if(r){let a=null;try{a=JSON.parse(r)}catch{}o=a&&(a.userName||a.name||a.inspector)||(typeof r=="string"&&!r.startsWith("{")?r:""),o&&(o=o.trim())}}catch{}const n=t.value;t.innerHTML='<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0634\u0631\u0641 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645 \u2014</option>';let s=!1;if(i.forEach(r=>{o&&(r.toLowerCase().includes(o.toLowerCase())||o.toLowerCase().includes(r.toLowerCase()))&&(s=!0)}),o&&!s){const r=document.createElement("option");r.value=o,r.textContent=`\u{1F464} ${o} (\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u064A)`,t.appendChild(r)}if(i.forEach(r=>{const a=document.createElement("option");a.value=r,a.textContent=`\u{1F464} ${r}`,t.appendChild(a)}),n)t.value=n;else if(o)for(let r=0;r<t.options.length;r++){const a=t.options[r].value;if(a&&(a.toLowerCase().includes(o.toLowerCase())||o.toLowerCase().includes(a.toLowerCase()))){t.selectedIndex=r;break}}t.onchange=()=>{const r=document.getElementById("hoOutgoingBadge");r&&(o&&t.value&&(t.value.toLowerCase().includes(o.toLowerCase())||o.toLowerCase().includes(t.value.toLowerCase()))?(r.style.display="inline-block",r.textContent="\u0645\u062D\u062F\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",r.style.background="#e0f2fe",r.style.color="#0284c7"):t.value?(r.style.display="inline-block",r.textContent="\u0627\u062E\u062A\u064A\u0627\u0631 \u064A\u062F\u0648\u064A",r.style.background="#f1f5f9",r.style.color="#475569"):r.style.display="none")},t.onchange();const d=e.value;e.innerHTML='<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0634\u0631\u0641 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645 \u2014</option>',i.forEach(r=>{const a=document.createElement("option");a.value=r,a.textContent=`\u{1F465} ${r}`,e.appendChild(a)}),d&&(e.value=d)},P=function(){if(!f)return;const t=document.getElementById("hoInstructions");if(!t)return;const e=`\u2022 \u062A\u0645 \u062A\u0646\u0641\u064A\u0630 \u062C\u0644\u0633\u0629 \u062A\u0648\u0639\u064A\u0629 (TBT) \u0628\u0639\u0646\u0648\u0627\u0646: \xAB${f.topic}\xBB \u0628\u062D\u0636\u0648\u0631 (${f.attendees}) \u0639\u0627\u0645\u0644\u0627\u064B \u0628\u0642\u064A\u0627\u062F\u0629 (${f.trainer}).
`;t.value.includes(f.topic)||(t.value=e+t.value),x("\u2705 \u062A\u0645 \u0625\u062F\u0631\u0627\u062C \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u0644\u0633\u0629 \u0627\u0644\u0640 TBT \u0641\u064A \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0648\u062C\u064A\u0647\u0627\u062A")},H=function(){const t=document.getElementById("hoHistoryBadgeCount");if(t)try{const e=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]");t.textContent=Array.isArray(e)?e.length:0}catch{t.textContent="0"}},k=function(t){const e=document.getElementById("hoTabBtnCurrent"),i=document.getElementById("hoTabBtnHistory"),o=document.getElementById("frmShiftHandover"),n=document.getElementById("hoHistoryView");t==="history"?(e&&(e.style.background="transparent",e.style.color="#64748b",e.style.fontWeight="700",e.style.boxShadow="none"),i&&(i.style.background="#ffffff",i.style.color="#1e3a8a",i.style.fontWeight="800",i.style.boxShadow="0 1px 3px rgba(0,0,0,0.1)"),o&&(o.style.display="none"),n&&(n.style.display="block"),O()):(i&&(i.style.background="transparent",i.style.color="#64748b",i.style.fontWeight="700",i.style.boxShadow="none"),e&&(e.style.background="#ffffff",e.style.color="#1e3a8a",e.style.fontWeight="800",e.style.boxShadow="0 1px 3px rgba(0,0,0,0.1)"),n&&(n.style.display="none"),o&&(o.style.display="block"))},E=function(t=!0){const e=document.getElementById("hoDate")?.value||new Date().toISOString().slice(0,10),i=document.getElementById("hoShift")?.value||"\u0627\u0644\u0648\u0631\u062F\u064A\u0629",o=document.getElementById("hoSite")?.value||"\u0645\u0635\u0627\u0646\u0639 ICAPP",n=document.getElementById("hoOutgoingOfficer")?.value.trim()||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",s=document.getElementById("hoIncomingOfficer")?.value.trim()||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",d=document.getElementById("hoInstructions")?.value.trim()||"",r=document.getElementById("hoKpiObsTotal")?.textContent||"0",a=document.getElementById("hoKpiObsHigh")?.textContent||"0",g=document.getElementById("hoKpiObsClosed")?.textContent||"0",l=document.getElementById("hoKpiPtwCount")?.textContent||"0",u={id:"HO_"+Date.now(),createdAt:new Date().toISOString(),date:e,shift:i,site:o,outgoing:n,incoming:s,kpis:{total:r,high:a,closed:g,ptw:l},tbtInfo:f||null,instructions:d,fullSummaryText:T()};let p=[];try{p=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}return p.some(b=>b.date===e&&b.shift===i&&b.site===o&&Date.now()-new Date(b.createdAt).getTime()<6e4)||(p.unshift(u),p.length>50&&(p=p.slice(0,50)),localStorage.setItem("HSE_SHIFT_HANDOVERS_HISTORY",JSON.stringify(p))),H(),t&&x("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0641\u064A \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),u},O=function(t=""){const e=document.getElementById("hoHistoryCardsContainer");if(!e)return;let i=[];try{i=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}if(t){const o=t.toLowerCase();i=i.filter(n=>n.date&&n.date.includes(o)||n.shift&&n.shift.toLowerCase().includes(o)||n.site&&n.site.toLowerCase().includes(o)||n.outgoing&&n.outgoing.toLowerCase().includes(o)||n.incoming&&n.incoming.toLowerCase().includes(o)||n.instructions&&n.instructions.toLowerCase().includes(o))}if(i.length===0){e.innerHTML=`
                    <div style="text-align: center; padding: 36px 16px; color: #64748b;">
                        <i class="fas fa-folder-open" style="font-size: 2.2rem; opacity: 0.4; margin-bottom: 10px;"></i>
                        <div style="font-weight: 700; font-size: 0.9rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062D\u0627\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0645\u0633\u062C\u0644\u0629 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0633\u062C\u0644</div>
                        <div style="font-size: 0.78rem; opacity: 0.8; margin-top: 4px;">\u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0645\u062D\u0627\u0636\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0647\u0646\u0627 \u0639\u0646\u062F \u062D\u0641\u0638 \u0623\u0648 \u0627\u0639\u062A\u0645\u0627\u062F \u0623\u0648 \u0645\u0634\u0627\u0631\u0643\u0629 \u0623\u064A \u0645\u062D\u0636\u0631 \u0648\u0631\u062F\u064A\u0629.</div>
                    </div>
                `;return}e.innerHTML=i.map(o=>`
                <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                        <div>
                            <span style="font-weight: 800; color: #1e3a8a; font-size: 0.9rem;">${c(o.shift||"\u0627\u0644\u0648\u0631\u062F\u064A\u0629")}</span>
                            <span style="font-size: 0.75rem; color: #64748b; margin-right: 6px;">\u{1F4C5} ${c(o.date||"")}</span>
                            <span style="font-size: 0.75rem; color: #0284c7; background: #e0f2fe; padding: 1px 6px; border-radius: 4px; margin-right: 6px;">${c(o.site||"")}</span>
                        </div>
                        <div style="font-size: 0.72rem; color: #94a3b8;">
                            ${new Date(o.createdAt||Date.now()).toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"})}
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem; background: #f8fafc; padding: 8px 10px; border-radius: 8px; margin-bottom: 8px;">
                        <div><b>\u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645:</b> \u{1F464} ${c(o.outgoing||"\u2014")}</div>
                        <div><b>\u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645:</b> \u{1F465} ${c(o.incoming||"\u2014")}</div>
                    </div>

                    <!-- KPIs Badge Row -->
                    <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
                        <span style="background: #eff6ff; color: #1d4ed8; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A: ${o.kpis?.total||0}</span>
                        <span style="background: #fef2f2; color: #dc2626; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u0623\u062E\u0637\u0627\u0631 \u0639\u0627\u0644\u064A\u0629: ${o.kpis?.high||0}</span>
                        <span style="background: #ecfdf5; color: #059669; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u0645\u063A\u0644\u0642\u0629: ${o.kpis?.closed||0}</span>
                        <span style="background: #fefce8; color: #ca8a04; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u062A\u0635\u0627\u0631\u064A\u062D: ${o.kpis?.ptw||0}</span>
                        ${o.tbtInfo?.topic?`<span style="background: #f0fdf4; color: #15803d; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">\u{1F4E2} TBT: ${c(o.tbtInfo.topic.slice(0,24))}...</span>`:""}
                    </div>

                    <!-- Instructions snippet -->
                    <div style="font-size: 0.8rem; color: #334155; background: #fafafa; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 8px; margin-bottom: 10px; max-height: 60px; overflow: hidden; text-overflow: ellipsis; white-space: pre-line;">
                        ${c(o.instructions||"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0645\u0633\u062C\u0644\u0629")}
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
            `).join("")},D=function(t){let e=[];try{e=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}const i=e.find(n=>n.id===t);if(!i||!i.instructions){x("\u26A0\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u0636\u0631");return}const o=document.getElementById("hoInstructions");if(o){const n=`[\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0646 ${i.shift} \u2014 \u0645\u0633\u0644\u0651\u0650\u0645: ${i.outgoing}]:
`;o.value=n+i.instructions}k("current"),x("\u2705 \u062A\u0645 \u0646\u0633\u062E \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0644\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629")},S=function(t,e={}){const i=!!e.autoPrint,o=c(t.date||new Date().toISOString().slice(0,10)),n=c(t.shift||"\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0635\u0628\u0627\u062D\u064A\u0629"),s=c(t.site||"\u0643\u0627\u0641\u0629 \u0645\u0635\u0627\u0646\u0639 ICAPP"),d=c(t.outgoing||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645"),r=c(t.incoming||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645");let a=t.instructions||"";if(!a&&t.fullSummaryText){const m=t.fullSummaryText.match(/توجيهات وبنود المتابعة للوردية القادمة:[\r\n]+([\s\S]*?)(\r?\n─|\r?\n✅|$)/);m&&m[1]?a=m[1].trim():a=t.fullSummaryText}a||(a="\u062A\u0645 \u062A\u0633\u0644\u064A\u0645 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0648\u0641\u0642\u0627\u064B \u0644\u0644\u0636\u0648\u0627\u0628\u0637 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u062F\u0648\u0646 \u0648\u062C\u0648\u062F \u0645\u0639\u0648\u0642\u0627\u062A \u062D\u0631\u062C\u0629.");const g=t.kpis||{total:"0",high:"0",closed:"0",ptw:"0"},l=t.tbtInfo||null;let u="";try{const m=t.createdAt?new Date(t.createdAt):new Date;u=m.toLocaleDateString("ar-EG",{year:"numeric",month:"short",day:"numeric"})+" "+m.toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"})}catch{u=o}const p=typeof window<"u"&&window.location&&window.location.origin?window.location.origin:"",h=`${p}/icons/icapp-logo.png`,b=`${p}/icons/icon-192x192.png`,J=l&&l.topic?`
                <div class="tbt-banner">
                    <div>
                        <span style="font-size: 10px; background: #86198f; color: #fff; padding: 2px 7px; border-radius: 4px; font-weight: 800; margin-left: 6px;">TBT \u0645\u064F\u0639\u062A\u0645\u062F</span>
                        <span class="tbt-topic">\u{1F4E2} \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u0648\u0639\u064A\u0629: ${c(l.topic)}</span>
                    </div>
                    <div class="tbt-meta">
                        <span>\u{1F465} \u0627\u0644\u062D\u0636\u0648\u0631: <strong>${c(l.attendees||"0")} \u0639\u0627\u0645\u0644</strong></span>
                        <span>\u{1F464} \u0627\u0644\u0645\u0634\u0631\u0641/\u0627\u0644\u0645\u062F\u0631\u0628: <strong>${c(l.trainer||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}</strong></span>
                        ${l.category?`<span>\u{1F3F7}\uFE0F \u0627\u0644\u062A\u0635\u0646\u064A\u0641: <strong>${c(l.category)}</strong></span>`:""}
                    </div>
                </div>
            `:"";return`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u2014 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-primary: #1e3a8a;
            --brand-navy: #0f172a;
            --brand-green: #047857;
            --brand-red: #b91c1c;
            --border-color: #cbd5e1;
        }
        * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        body {
            font-family: 'Cairo', system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            background: #f8fafc;
            color: #0f172a;
            line-height: 1.5;
            direction: rtl;
        }
        
        .no-print-bar {
            position: sticky;
            top: 0;
            z-index: 9999;
            background: #0f172a;
            color: #ffffff;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
            border-bottom: 3px solid #2563eb;
        }
        .no-print-bar .brand-badge {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .no-print-bar .pill-tag {
            background: #2563eb;
            color: #ffffff;
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: 800;
            font-size: 11px;
            letter-spacing: 0.5px;
        }
        .no-print-bar .title-text {
            font-size: 13.5px;
            font-weight: 800;
        }
        .no-print-bar .action-buttons {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .btn-print {
            padding: 8px 20px;
            background: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-weight: 800;
            font-size: 13px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(37,99,235,0.4);
        }
        .btn-print:hover { background: #1d4ed8; }
        .btn-close {
            padding: 8px 18px;
            background: #475569;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-weight: 800;
            font-size: 13px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
        }
        .btn-close:hover { background: #334155; }

        .report-page-container {
            max-width: 900px;
            margin: 22px auto 40px auto;
            background: #ffffff;
            padding: 28px 34px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
        }

        .iso-print-header {
            display: grid;
            grid-template-columns: 240px 1fr 200px;
            border: 2px solid #0f172a;
            border-top: 5px solid #1e3a8a;
            border-radius: 8px;
            overflow: hidden;
            background: #ffffff;
            margin-bottom: 18px;
        }
        .iso-box-brand {
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-left: 1.5px solid #0f172a;
            background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
            gap: 4px;
            text-align: center;
        }
        .iso-print-logo {
            max-height: 46px;
            max-width: 130px;
            object-fit: contain;
            margin-bottom: 2px;
        }
        .iso-company-title {
            font-size: 10.5px;
            font-weight: 900;
            color: #0f172a;
            line-height: 1.3;
        }
        .iso-dept-title {
            font-size: 9.5px;
            font-weight: 800;
            color: #1e3a8a;
            line-height: 1.25;
        }
        
        .iso-box-title {
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: #ffffff;
        }
        .iso-main-title {
            margin: 0;
            font-size: 16px;
            font-weight: 900;
            color: #1e3a8a;
            line-height: 1.3;
        }
        .iso-sub-title {
            font-size: 10.5px;
            font-weight: 700;
            color: #475569;
            margin-top: 3px;
        }
        .iso-badge-std {
            display: inline-block;
            margin-top: 5px;
            background: #eff6ff;
            color: #1d4ed8;
            border: 1px solid #bfdbfe;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 9.5px;
            font-weight: 800;
        }

        .iso-box-meta {
            padding: 8px 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-right: 1.5px solid #0f172a;
            background: #f8fafc;
            gap: 3px;
        }
        .meta-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dashed #cbd5e1;
            padding-bottom: 2px;
            font-size: 10px;
        }
        .meta-row:last-child { border-bottom: none; }
        .meta-row span { color: #64748b; font-weight: 700; }
        .meta-row strong { color: #0f172a; font-family: monospace, inherit; font-size: 10px; }

        .handover-info-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 14px;
        }
        .info-card {
            background: #f8fafc;
            border: 1.5px solid #cbd5e1;
            border-radius: 6px;
            padding: 7px 10px;
        }
        .info-card .card-label {
            font-size: 9.5px;
            color: #64748b;
            font-weight: 700;
            margin-bottom: 2px;
        }
        .info-card .card-value {
            font-size: 11.5px;
            font-weight: 800;
            color: #0f172a;
        }

        .officers-bar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 14px;
        }
        .officer-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
            border: 1.5px solid #86efac;
            border-radius: 6px;
            padding: 8px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .officer-card.incoming-card {
            background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
            border-color: #93c5fd;
        }
        .officer-role {
            font-size: 10.5px;
            font-weight: 800;
            color: #166534;
        }
        .officer-card.incoming-card .officer-role {
            color: #1e40af;
        }
        .officer-name {
            font-size: 12.5px;
            font-weight: 900;
            color: #0f172a;
        }

        .kpi-section-title {
            font-size: 11.5px;
            font-weight: 800;
            color: #334155;
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 14px;
            text-align: center;
        }
        .kpi-box {
            border-radius: 6px;
            padding: 8px 6px;
            border: 1.5px solid #cbd5e1;
            background: #ffffff;
        }
        .kpi-box.total { background: #f8fafc; border-color: #cbd5e1; }
        .kpi-box.high { background: #fef2f2; border-color: #fca5a5; }
        .kpi-box.closed { background: #f0fdf4; border-color: #86efac; }
        .kpi-box.ptw { background: #fffbeb; border-color: #fde68a; }
        .kpi-num {
            font-size: 1.35rem;
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 2px;
        }
        .kpi-box.total .kpi-num { color: #0f172a; }
        .kpi-box.high .kpi-num { color: #dc2626; }
        .kpi-box.closed .kpi-num { color: #16a34a; }
        .kpi-box.ptw .kpi-num { color: #d97706; }
        .kpi-text {
            font-size: 10px;
            font-weight: 700;
            color: #475569;
        }

        .tbt-banner {
            background: #fdf4ff;
            border: 1.5px solid #f0abfc;
            border-radius: 6px;
            padding: 8px 12px;
            margin-bottom: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 6px;
        }
        .tbt-topic {
            font-weight: 900;
            font-size: 11.5px;
            color: #86198f;
        }
        .tbt-meta {
            font-size: 10.5px;
            font-weight: 700;
            color: #581c87;
            display: flex;
            gap: 10px;
        }

        .instructions-container {
            border: 1.5px solid #cbd5e1;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 18px;
        }
        .instructions-header {
            background: #f8fafc;
            border-bottom: 1.5px solid #cbd5e1;
            padding: 8px 12px;
            font-weight: 900;
            font-size: 11.5px;
            color: #1e3a8a;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .instructions-body {
            padding: 12px 14px;
            background: #ffffff;
            font-size: 11.5px;
            line-height: 1.65;
            color: #1e293b;
            white-space: pre-wrap;
            min-height: 90px;
        }

        .signatures-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            margin-top: 18px;
            page-break-inside: avoid;
        }
        .sig-card {
            border: 1.5px solid #cbd5e1;
            border-radius: 6px;
            padding: 10px;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 115px;
        }
        .sig-card-title {
            font-size: 10.5px;
            font-weight: 800;
            color: #1e3a8a;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 3px;
            margin-bottom: 5px;
            text-align: center;
        }
        .sig-card-name {
            font-size: 11px;
            font-weight: 900;
            color: #0f172a;
            text-align: center;
        }
        .sig-line-area {
            margin-top: 20px;
            border-top: 1.5px dashed #64748b;
            padding-top: 3px;
            text-align: center;
            font-size: 9.5px;
            color: #64748b;
            font-weight: 700;
        }

        .iso-footer-strip {
            margin-top: 18px;
            border: 1.5px solid #0f172a;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 12px;
            background: #f8fafc;
            font-size: 9.5px;
            font-weight: 800;
            color: #334155;
            page-break-inside: avoid;
        }
        .iso-footer-strip span strong {
            color: #0f172a;
            font-family: monospace, inherit;
        }

        .portal-unified-footer {
            margin-top: 10px;
            text-align: center;
            font-size: 9px;
            color: #64748b;
            line-height: 1.45;
            page-break-inside: avoid;
        }
        .portal-unified-footer strong {
            color: #1e3a8a;
            font-weight: 800;
        }

        @media print {
            body {
                background: #ffffff !important;
                padding: 0 !important;
            }
            .no-print-bar {
                display: none !important;
            }
            .report-page-container {
                max-width: 100% !important;
                margin: 0 !important;
                padding: 5px 8px !important;
                border: none !important;
                box-shadow: none !important;
            }
            @page {
                size: A4 portrait;
                margin: 8mm 10mm 8mm 10mm;
            }
        }
    </style>
</head>
<body>
    <div class="no-print-bar">
        <div class="brand-badge">
            <span class="pill-tag">ICAPP HSE</span>
            <span class="title-text">\u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</span>
        </div>
        <div class="action-buttons">
            <button type="button" onclick="window.print()" class="btn-print">
                \u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u062D\u0636\u0631
            </button>
            <button type="button" onclick="window.close()" class="btn-close">
                \u274C \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629
            </button>
        </div>
    </div>

    <div class="report-page-container">
        <!-- \u062A\u0631\u0648\u064A\u0633\u0629 ISO \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0648\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 -->
        <div class="iso-print-header">
            <div class="iso-box-brand">
                <img src="${h}" alt="\u0634\u0639\u0627\u0631 ICAPP" class="iso-print-logo" onerror="this.onerror=null; this.src='${b}';">
                <div class="iso-company-title">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</div>
                <div class="iso-dept-title">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0626\u0629</div>
            </div>

            <div class="iso-box-title">
                <h1 class="iso-main-title">\u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</h1>
                <div class="iso-sub-title">Shift Safety Handover & Briefing Report</div>
                <div class="iso-badge-std">\u0645\u0639\u062A\u0645\u062F \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0629 ISO 45001:2018 & OSHA 1910</div>
            </div>

            <div class="iso-box-meta">
                <div class="meta-row">
                    <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629:</span>
                    <strong>DOC-HSE-SHO-01</strong>
                </div>
                <div class="meta-row">
                    <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</span>
                    <strong>Rev. 02</strong>
                </div>
                <div class="meta-row">
                    <span>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</span>
                    <strong>2026-09</strong>
                </div>
                <div class="meta-row">
                    <span>\u062F\u0631\u062C\u0629 \u0627\u0644\u0633\u0631\u064A\u0629:</span>
                    <strong style="color: #047857;">\u0639\u0627\u0645 \u062F\u0627\u062E\u0644\u064A</strong>
                </div>
            </div>
        </div>

        <!-- \u0634\u0628\u0643\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 -->
        <div class="handover-info-grid">
            <div class="info-card">
                <div class="card-label">\u{1F4C5} \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0648\u0631\u062F\u064A\u0629</div>
                <div class="card-value">${o}</div>
            </div>
            <div class="info-card">
                <div class="card-label">\u23F0 \u0641\u062A\u0631\u0629 \u0627\u0644\u0648\u0631\u062F\u064A\u0629</div>
                <div class="card-value">${n}</div>
            </div>
            <div class="info-card">
                <div class="card-label">\u{1F3ED} \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639</div>
                <div class="card-value">${s}</div>
            </div>
            <div class="info-card">
                <div class="card-label">\u{1F552} \u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0625\u0635\u062F\u0627\u0631</div>
                <div class="card-value">${u}</div>
            </div>
        </div>

        <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0645 \u0648\u0627\u0644\u0645\u0633\u062A\u0644\u0645 -->
        <div class="officers-bar">
            <div class="officer-card">
                <div>
                    <div class="officer-role">\u{1F464} \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645 (Outgoing Officer):</div>
                    <div class="officer-name">${d}</div>
                </div>
                <div style="font-size: 18px;">\u{1F4E4}</div>
            </div>
            <div class="officer-card incoming-card">
                <div>
                    <div class="officer-role">\u{1F465} \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645 (Incoming Officer):</div>
                    <div class="officer-name">${r}</div>
                </div>
                <div style="font-size: 18px;">\u{1F4E5}</div>
            </div>
        </div>

        <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0648\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0644\u0644\u0648\u0631\u062F\u064A\u0629 -->
        <div class="kpi-section-title">
            <span>\u{1F4CA} \u0645\u0644\u062E\u0635 \u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0646\u0634\u0627\u0637 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629:</span>
        </div>
        <div class="kpi-grid">
            <div class="kpi-box total">
                <div class="kpi-num">${c(g.total||"0")}</div>
                <div class="kpi-text">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u0635\u0648\u062F\u0629</div>
            </div>
            <div class="kpi-box high">
                <div class="kpi-num">${c(g.high||"0")}</div>
                <div class="kpi-text">\u0623\u062E\u0637\u0627\u0631 \u062D\u0631\u062C\u0629 / \u0639\u0627\u0644\u064A\u0629 \u26A0\uFE0F</div>
            </div>
            <div class="kpi-box closed">
                <div class="kpi-num">${c(g.closed||"0")}</div>
                <div class="kpi-text">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0645 \u0625\u063A\u0644\u0627\u0642\u0647\u0627 \u2705</div>
            </div>
            <div class="kpi-box ptw">
                <div class="kpi-num">${c(g.ptw||"0")}</div>
                <div class="kpi-text">\u062A\u0635\u0627\u0631\u064A\u062D \u0639\u0645\u0644 \u0646\u0634\u0637\u0629 (PTW) \u{1F4DC}</div>
            </div>
        </div>

        <!-- \u0646\u0634\u0627\u0637 \u062A\u0648\u0639\u064A\u0629 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 TBT \u0625\u0646 \u0648\u062C\u062F -->
        ${J}

        <!-- \u0627\u0644\u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0648\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629 -->
        <div class="instructions-container">
            <div class="instructions-header">
                <span>\u{1F4DD} \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0648\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0648\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0644\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629:</span>
            </div>
            <div class="instructions-body">${c(a)}</div>
        </div>

        <!-- \u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0625\u0642\u0631\u0627\u0631 \u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0644\u062A\u0633\u0644\u0645 \u0627\u0644\u0631\u0633\u0645\u064A -->
        <div class="signatures-grid">
            <div class="sig-card">
                <div class="sig-card-title">\u0625\u0642\u0631\u0627\u0631 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645</div>
                <div class="sig-card-name">${d}</div>
                <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
            </div>
            <div class="sig-card">
                <div class="sig-card-title">\u0625\u0642\u0631\u0627\u0631 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645</div>
                <div class="sig-card-name">${r}</div>
                <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
            </div>
            <div class="sig-card">
                <div class="sig-card-title">\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629</div>
                <div class="sig-card-name">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                <div class="sig-line-area">\u0627\u0644\u062E\u062A\u0645 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0642\u0645\u064A</div>
            </div>
        </div>

        <!-- \u0634\u0631\u064A\u0637 \u0636\u0628\u0637 \u0648\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0648\u062B\u064A\u0642\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 (ISO Document Control) -->
        <div class="iso-footer-strip">
            <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629: <strong>DOC-HSE-SHO-01</strong></span>
            <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631: <strong>Rev. 02</strong></span>
            <span>\u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u062A\u0648\u062B\u064A\u0642: <strong>ISO 45001:2018 (Clause 8.1 & 7.4)</strong></span>
            <span>\u0646\u0638\u0627\u0645 \u0627\u0644\u062C\u0648\u062F\u0629: <strong>ICAPP HSE MS</strong></span>
        </div>

        <!-- \u0627\u0644\u0641\u0648\u062A\u0631 \u0627\u0644\u0645\u0648\u062D\u062F \u0644\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 -->
        <footer class="portal-unified-footer">
            <div><strong>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</strong> \u2022 \u0645\u0646\u0638\u0648\u0645\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629 \xA9 2026</div>
            <div>\u0648\u062B\u064A\u0642\u0629 \u0631\u0633\u0645\u064A\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0635\u0627\u062F\u0631\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP SafetyHub) \u2022 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629</div>
        </footer>
    </div>

    ${i?"<script>window.onload = function() { setTimeout(function() { window.print(); }, 350); };<\/script>":""}
</body>
</html>`},L=function(t){let e=[];try{e=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}const i=e.find(n=>n.id===t);if(!i)return;const o=window.open("","_blank");o&&(o.document.write(S(i,{autoPrint:!1,isArchive:!0})),o.document.close())},N=function(t){let e=[];try{e=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}const i=e.find(n=>n.id===t);if(!i)return;const o=window.open("","_blank");o&&(o.document.write(S(i,{autoPrint:!0,isArchive:!0})),o.document.close())},R=function(t){let e=[];try{e=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}const i=e.find(s=>s.id===t);if(!i)return;const o=i.fullSummaryText||i.instructions||"",n=`https://api.whatsapp.com/send?text=${encodeURIComponent(o)}`;window.open(n,"_blank")},M=function(t){if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u0636\u0631 \u0645\u0646 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u062D\u0644\u064A\u061F"))return;let e=[];try{e=JSON.parse(localStorage.getItem("HSE_SHIFT_HANDOVERS_HISTORY")||"[]")}catch{}e=e.filter(i=>i.id!==t),localStorage.setItem("HSE_SHIFT_HANDOVERS_HISTORY",JSON.stringify(e)),H(),O(),x("\u{1F5D1}\uFE0F \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062D\u0636\u0631 \u0645\u0646 \u0627\u0644\u0633\u062C\u0644")},x=function(t){let e=document.getElementById("hoTemporaryToast");e||(e=document.createElement("div"),e.id="hoTemporaryToast",e.style.cssText="position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; z-index: 100000; box-shadow: 0 4px 14px rgba(0,0,0,0.3); pointer-events: none; transition: opacity 0.3s ease; opacity: 0; direction: rtl;",document.body.appendChild(e)),e.textContent=t,e.style.opacity="1",setTimeout(()=>{e.style.opacity="0"},2800)},F=function(){const t=B();A(),y(),w(),C(),H(),k("current"),t.style.display="flex",document.body.style.overflow="hidden"},I=function(){v&&(v.style.display="none",document.body.style.overflow="")},y=function(){let t=0,e=0,i=0,o=0;try{const a=localStorage.getItem("HSE_PUBLIC_OBS_LOCAL_HISTORY");if(a){const l=JSON.parse(a);Array.isArray(l)&&(t=l.length,l.forEach(u=>{const p=String(u.riskLevel||u.risk||"").toLowerCase();(p.includes("\u0639\u0627\u0644\u064A")||p.includes("high"))&&e++;const h=String(u.status||"").toLowerCase();(h.includes("\u0645\u063A\u0644\u0642")||h.includes("closed"))&&i++}))}if(window.rawObservationsAnalyticsData){const l=window.rawObservationsAnalyticsData;l.totalObservations&&(t=Math.max(t,l.totalObservations)),l.highRiskCount&&(e=Math.max(e,l.highRiskCount)),l.closedCount&&(i=Math.max(i,l.closedCount))}const g=document.getElementById("ptwSummaryCount");if(g){const l=parseInt(g.textContent,10);isNaN(l)||(o=l)}}catch{}const n=document.getElementById("hoKpiObsTotal"),s=document.getElementById("hoKpiObsHigh"),d=document.getElementById("hoKpiObsClosed"),r=document.getElementById("hoKpiPtwCount");n&&(n.textContent=t),s&&(s.textContent=e),d&&(d.textContent=i),r&&(r.textContent=o)},T=function(){const t=document.getElementById("hoDate")?.value||new Date().toISOString().slice(0,10),e=document.getElementById("hoShift")?.value||"\u0627\u0644\u0648\u0631\u062F\u064A\u0629",i=document.getElementById("hoSite")?.value||"\u0645\u0635\u0627\u0646\u0639 ICAPP",o=document.getElementById("hoOutgoingOfficer")?.value.trim()||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",n=document.getElementById("hoIncomingOfficer")?.value.trim()||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",s=document.getElementById("hoInstructions")?.value.trim()||"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u062E\u0627\u0635\u0629 \u0645\u0633\u062C\u0644\u0629.",d=document.getElementById("hoKpiObsTotal")?.textContent||"0",r=document.getElementById("hoKpiObsHigh")?.textContent||"0",a=document.getElementById("hoKpiObsClosed")?.textContent||"0",g=document.getElementById("hoKpiPtwCount")?.textContent||"0";let l="";return f&&f.topic&&(l=`
\u{1F4E2} *\u062A\u0648\u0639\u064A\u0629 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 (TBT):* ${f.topic} (\u0627\u0644\u0639\u062F\u062F: ${f.attendees} | \u0627\u0644\u0645\u062F\u0631\u0628: ${f.trainer})`),`\u{1F4CB} *\u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u2014 ICAPP HSE*
\u{1F3E2} *\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)*
\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0626\u0629
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4C5} *\u0627\u0644\u062A\u0627\u0631\u064A\u062E:* ${t}
\u23F0 *\u0627\u0644\u0648\u0631\u062F\u064A\u0629:* ${e}
\u{1F3ED} *\u0627\u0644\u0645\u0648\u0642\u0639:* ${i}
\u{1F464} *\u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645:* ${o}
\u{1F464} *\u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645:* ${n}
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4CA} *\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0646\u0634\u0627\u0637 \u0627\u0644\u0648\u0631\u062F\u064A\u0629:*
\u2022 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: ${d}
\u2022 \u0623\u062E\u0637\u0627\u0631 \u062D\u0631\u062C\u0629/\u0639\u0627\u0644\u064A\u0629: ${r} \u26A0\uFE0F
\u2022 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0645 \u0625\u063A\u0644\u0627\u0642\u0647\u0627: ${a} \u2705
\u2022 \u062A\u0635\u0627\u0631\u064A\u062D \u0639\u0645\u0644 \u0646\u0634\u0637\u0629 (PTW): ${g} \u{1F4DC}${l}
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4DD} *\u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0648\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629:*
${s}
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u2705 *\u0645\u0639\u062A\u0645\u062F \u0637\u0628\u0642\u0627\u064B \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 ISO 45001:2018 & OSHA 1910*`},j=function(){E(!1);const t=T(),e=`https://api.whatsapp.com/send?text=${encodeURIComponent(t)}`;window.open(e,"_blank")},K=function(){const t=E(!1),e=document.getElementById("hoDate")?.value||new Date().toISOString().slice(0,10),i=document.getElementById("hoShift")?.value||"\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0635\u0628\u0627\u062D\u064A\u0629",o=document.getElementById("hoSite")?.value||"\u0645\u0635\u0627\u0646\u0639 ICAPP",n=document.getElementById("hoOutgoingOfficer")?.value.trim()||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",s=document.getElementById("hoIncomingOfficer")?.value.trim()||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",d=document.getElementById("hoInstructions")?.value.trim()||"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u062E\u0627\u0635\u0629 \u0645\u0633\u062C\u0644\u0629.",r=document.getElementById("hoKpiObsTotal")?.textContent||"0",a=document.getElementById("hoKpiObsHigh")?.textContent||"0",g=document.getElementById("hoKpiObsClosed")?.textContent||"0",l=document.getElementById("hoKpiPtwCount")?.textContent||"0",u={id:t?.id||"HO_"+Date.now(),createdAt:t?.createdAt||new Date().toISOString(),date:e,shift:i,site:o,outgoing:n,incoming:s,instructions:d,kpis:{total:r,high:a,closed:g,ptw:l},tbtInfo:f||null},p=window.open("","_blank");p&&(p.document.write(S(u,{autoPrint:!0,isArchive:!1})),p.document.close())},c=function(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""},v=null,f=null;async function C(){const t=document.getElementById("hoOfflineSyncNotice"),e=document.getElementById("hoOfflineSyncMsg"),i=document.getElementById("btnHoSyncNow");if(!t||!e)return;let o={total:0,obs:0,nm:0,ds:0,fe:0,tbt:0};if(window.HseOfflineStore&&typeof window.HseOfflineStore.getCounts=="function")try{o=await window.HseOfflineStore.getCounts()}catch{}else try{const n=JSON.parse(localStorage.getItem("HSE_OFFLINE_OBS_QUEUE")||"[]").length,s=JSON.parse(localStorage.getItem("HSE_OFFLINE_NEARMISS_QUEUE")||"[]").length,d=JSON.parse(localStorage.getItem("HSE_OFFLINE_DAILY_SAFETY_QUEUE")||"[]").length,r=JSON.parse(localStorage.getItem("HSE_OFFLINE_FIRE_INSPECTION_QUEUE")||"[]").length,a=JSON.parse(localStorage.getItem("HSE_OFFLINE_TBT_QUEUE")||"[]").length;o={obs:n,nm:s,ds:d,fe:r,tbt:a,total:n+s+d+r+a}}catch{}if(o.total>0){t.style.display="flex",t.style.background="#fefce8",t.style.borderColor="#fef08a",t.style.color="#854d0e";const n=[];o.obs&&n.push(`${o.obs} \u0645\u0644\u0627\u062D\u0638\u0627\u062A`),o.nm&&n.push(`${o.nm} \u0648\u0634\u064A\u0643`),o.ds&&n.push(`${o.ds} \u0645\u0631\u0648\u0631`),o.fe&&n.push(`${o.fe} \u0625\u0637\u0641\u0627\u0621`),o.tbt&&n.push(`${o.tbt} TBT`),e.innerHTML=`\u26A0\uFE0F <b>\u062A\u0646\u0628\u064A\u0647 \u0642\u0628\u0644 \u0627\u0644\u062A\u0633\u0644\u064A\u0645:</b> \u064A\u0648\u062C\u062F <b>(${o.total})</b> \u0633\u062C\u0644\u0627\u062A \u0645\u062D\u0641\u0648\u0638\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632 \u0644\u0645 \u062A\u064F\u0631\u0641\u0639 \u0628\u0639\u062F (${n.join("\u060C ")}). \u064A\u064F\u0648\u0635\u0649 \u0628\u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0642\u0628\u0644 \u0625\u0646\u0647\u0627\u0621 \u0627\u0644\u0648\u0631\u062F\u064A\u0629.`,i&&(i.style.display="inline-flex")}else t.style.display="flex",t.style.background="#f0fdf4",t.style.borderColor="#bbf7d0",t.style.color="#166534",e.innerHTML="\u2705 <b>\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0645\u062A\u0627\u0632\u0629:</b> \u0643\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0645\u062A\u0632\u0627\u0645\u0646\u0629 \u0633\u062D\u0627\u0628\u064A\u0627\u064B \u0648\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u0644\u0642\u0629 \u0623\u0648\u0641\u0644\u0627\u064A\u0646.",i&&(i.style.display="none")}async function $(){const t=document.getElementById("btnHoSyncNow");if(!navigator.onLine){alert("\u0627\u0644\u062C\u0647\u0627\u0632 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u062D\u0627\u0644\u064A\u0627\u064B. \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639 \u0623\u0648 \u0627\u0644\u0648\u0627\u064A \u0641\u0627\u064A \u0623\u0648\u0644\u0627\u064B \u0644\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629.");return}t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629...');try{typeof window.syncAllOfflineData=="function"?await window.syncAllOfflineData():window.HseOfflineSync&&typeof window.HseOfflineSync.syncAll=="function"&&await window.HseOfflineSync.syncAll()}catch{}await C(),y(),t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-rotate"></i> \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0622\u0646')}async function w(){const t=document.getElementById("hoDate")?.value||new Date().toISOString().slice(0,10);f=null;let e=null;if(window.HseOfflineStore&&typeof window.HseOfflineStore.getAll=="function")try{const s=await window.HseOfflineStore.getAll("tbt_records");Array.isArray(s)&&(e=s.find(d=>d.date===t||d.clientCreatedAt&&d.clientCreatedAt.slice(0,10)===t))}catch{}if(!e)try{const s=JSON.parse(localStorage.getItem("HSE_OFFLINE_TBT_QUEUE")||"[]");Array.isArray(s)&&(e=s.find(d=>d.date===t||d.clientCreatedAt&&d.clientCreatedAt.slice(0,10)===t))}catch{}if(!e)try{const s=JSON.parse(localStorage.getItem("HSE_TBT_RECORDS_CACHE")||"[]");Array.isArray(s)&&(e=s.find(d=>d.date===t||d.clientCreatedAt&&d.clientCreatedAt.slice(0,10)===t))}catch{}const i=document.getElementById("hoTbtBadge"),o=document.getElementById("hoTbtTitle"),n=document.getElementById("btnHoInsertTbt");if(e){const s=e.topic||e.employeePayload&&e.employeePayload.name||"\u062C\u0644\u0633\u0629 \u062A\u0648\u0639\u064A\u0629 \u0645\u064A\u062F\u0627\u0646\u064A\u0629",d=e.totalAttendees||e.participants&&e.participants.length||0,r=e.trainer||e.trainerVal||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629";f={topic:s,attendees:d,trainer:r,date:t},i&&(i.textContent="\u062C\u0644\u0633\u0629 \u0645\u0633\u062C\u0644\u0629 \u2705",i.style.background="#dcfce7",i.style.color="#15803d"),o&&(o.innerHTML=`\u{1F4CC} <b>${c(s)}</b> \u2014 \u0627\u0644\u062D\u0636\u0648\u0631: <span style="color:#16a34a; font-weight:800;">${d} \u0639\u0627\u0645\u0644\u0627\u064B</span> (\u0627\u0644\u0645\u062F\u0631\u0628: ${c(r)})`),n&&(n.style.display="inline-flex")}else i&&(i.textContent="\u0644\u0645 \u062A\u064F\u0633\u062C\u0644 \u0628\u0639\u062F",i.style.background="#f1f5f9",i.style.color="#64748b"),o&&(o.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062C\u0644\u0633\u0629 \u062A\u0648\u0639\u064A\u0629 (TBT) \u0645\u0633\u062C\u0644\u0629 \u0628\u0647\u0630\u0627 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u062D\u062A\u0649 \u0627\u0644\u0622\u0646."),n&&(n.style.display="none")}const z={open:F,close:I,refreshKpis:y,shareViaWhatsApp:j,printHandoverReport:K,triggerPreHandoverSync:$,loadTbtSummaryForShift:w,insertTbtToInstructions:P,switchTab:k,saveHandoverToHistory:E,renderHistoryList:O,copyInstructionsFromHistory:D,viewFullHistoryReport:L,printHistoryReport:N,shareHistoryWhatsApp:R,deleteHistoryItem:M,buildOfficialHandoverDocumentHtml:S};window.HseShiftHandover=z,window.HseHandover=z}catch{}}})();
