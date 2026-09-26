(()=>{"use strict";if(!(typeof window>"u")&&!window.HseShiftHandoverInitialized){window.HseShiftHandoverInitialized=!0;try{let y=function(){if(document.getElementById("hseShiftHandoverModal"))return document.getElementById("hseShiftHandoverModal");const e=document.createElement("div");e.id="hseShiftHandoverModal",e.className="emergency-modal-overlay",e.style.display="none";const t=new Date().toISOString().slice(0,10),o=new Date().getHours();let n="\u0627\u0644\u0623\u0648\u0644\u0649 (07:00 - 15:00)";o>=15&&o<23?n="\u0627\u0644\u062B\u0627\u0646\u064A\u0629 (15:00 - 23:00)":(o>=23||o<7)&&(n="\u0627\u0644\u062B\u0627\u0644\u062B\u0629 (23:00 - 07:00)"),e.innerHTML=`
                <div class="emergency-modal-dialog" style="max-width: 720px; animation: fadeInModal 0.25s ease;" onclick="event.stopPropagation()">
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
                        <button type="button" class="emergency-modal-close-btn" id="btnCloseHandoverModal" title="\u0625\u063A\u0644\u0627\u0642">&times;</button>
                    </div>

                    <!-- Body -->
                    <div style="padding: 18px 20px; max-height: 76vh; overflow-y: auto; text-align: right; direction: rtl;">
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
                                        <option value="\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (07:00 - 15:00)" ${n.includes("\u0627\u0644\u0623\u0648\u0644\u0649")?"selected":""}>\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (07:00 - 15:00)</option>
                                        <option value="\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 (15:00 - 23:00)" ${n.includes("\u0627\u0644\u062B\u0627\u0646\u064A\u0629")?"selected":""}>\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 (15:00 - 23:00)</option>
                                        <option value="\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0644\u062B\u0629 (23:00 - 07:00)" ${n.includes("\u0627\u0644\u062B\u0627\u0644\u062B\u0629")?"selected":""}>\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0644\u062B\u0629 (23:00 - 07:00)</option>
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
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645:</label>
                                    <input type="text" id="hoOutgoingOfficer" placeholder="\u0627\u0633\u0645\u0643 / \u0631\u0642\u0645\u0643 \u0627\u0644\u0648\u0638\u064A\u0641\u064A..." style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;" />
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645:</label>
                                    <input type="text" id="hoIncomingOfficer" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0631\u0641 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645..." style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;" />
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
                                <div style="display: flex; gap: 8px;">
                                    <button type="button" onclick="HseShiftHandover.shareViaWhatsApp()" style="background: #25d366; color: #ffffff; border: none; padding: 10px 16px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);">
                                        <i class="fab fa-whatsapp fa-lg"></i> \u0645\u0634\u0627\u0631\u0643\u0629 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628
                                    </button>
                                    <button type="button" onclick="HseShiftHandover.printHandoverReport()" style="background: #334155; color: #ffffff; border: none; padding: 10px 16px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                        <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u062D\u0636\u0631
                                    </button>
                                </div>
                                <button type="button" id="btnCancelHandover" style="padding: 10px 16px; background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                    \u0625\u063A\u0644\u0627\u0642
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            `,document.body.appendChild(e),l=e,e.onclick=a=>{a.target===e&&p()};const d=e.querySelector("#btnCloseHandoverModal"),r=e.querySelector("#btnCancelHandover");return d&&(d.onclick=p),r&&(r.onclick=p),e},v=function(){const e=y();try{const t=sessionStorage.getItem("HSE_FIELD_SESSION")||localStorage.getItem("HSE_LAST_USER_NAME");if(t){let o=null;try{o=JSON.parse(t)}catch{}const n=o&&(o.userName||o.name)||(typeof t=="string"&&!t.startsWith("{")?t:""),d=e.querySelector("#hoOutgoingOfficer");d&&n&&!d.value&&(d.value=n)}}catch{}b(),e.style.display="flex",document.body.style.overflow="hidden"},p=function(){l&&(l.style.display="none",document.body.style.overflow="")},b=function(){let e=0,t=0,o=0,n=0;try{const s=localStorage.getItem("HSE_PUBLIC_OBS_LOCAL_HISTORY");if(s){const i=JSON.parse(s);Array.isArray(i)&&(e=i.length,i.forEach(g=>{const x=String(g.riskLevel||g.risk||"").toLowerCase();(x.includes("\u0639\u0627\u0644\u064A")||x.includes("high"))&&t++;const h=String(g.status||"").toLowerCase();(h.includes("\u0645\u063A\u0644\u0642")||h.includes("closed"))&&o++}))}if(window.rawObservationsAnalyticsData){const i=window.rawObservationsAnalyticsData;i.totalObservations&&(e=Math.max(e,i.totalObservations)),i.highRiskCount&&(t=Math.max(t,i.highRiskCount)),i.closedCount&&(o=Math.max(o,i.closedCount))}const f=document.getElementById("ptwSummaryCount");if(f){const i=parseInt(f.textContent,10);isNaN(i)||(n=i)}}catch{}const d=document.getElementById("hoKpiObsTotal"),r=document.getElementById("hoKpiObsHigh"),a=document.getElementById("hoKpiObsClosed"),c=document.getElementById("hoKpiPtwCount");d&&(d.textContent=e),r&&(r.textContent=t),a&&(a.textContent=o),c&&(c.textContent=n)},m=function(){const e=document.getElementById("hoDate")?.value||new Date().toISOString().slice(0,10),t=document.getElementById("hoShift")?.value||"\u0627\u0644\u0648\u0631\u062F\u064A\u0629",o=document.getElementById("hoSite")?.value||"\u0645\u0635\u0627\u0646\u0639 ICAPP",n=document.getElementById("hoOutgoingOfficer")?.value.trim()||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",d=document.getElementById("hoIncomingOfficer")?.value.trim()||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",r=document.getElementById("hoInstructions")?.value.trim()||"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0648\u062C\u064A\u0647\u0627\u062A \u062E\u0627\u0635\u0629 \u0645\u0633\u062C\u0644\u0629.",a=document.getElementById("hoKpiObsTotal")?.textContent||"0",c=document.getElementById("hoKpiObsHigh")?.textContent||"0",s=document.getElementById("hoKpiObsClosed")?.textContent||"0",f=document.getElementById("hoKpiPtwCount")?.textContent||"0";return`\u{1F4CB} *\u0645\u062D\u0636\u0631 \u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u2014 ICAPP HSE*
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4C5} *\u0627\u0644\u062A\u0627\u0631\u064A\u062E:* ${e}
\u23F0 *\u0627\u0644\u0648\u0631\u062F\u064A\u0629:* ${t}
\u{1F3ED} *\u0627\u0644\u0645\u0648\u0642\u0639:* ${o}
\u{1F464} *\u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645:* ${n}
\u{1F464} *\u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645:* ${d}
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4CA} *\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0646\u0634\u0627\u0637 \u0627\u0644\u0648\u0631\u062F\u064A\u0629:*
\u2022 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: ${a}
\u2022 \u0623\u062E\u0637\u0627\u0631 \u062D\u0631\u062C\u0629/\u0639\u0627\u0644\u064A\u0629: ${c} \u26A0\uFE0F
\u2022 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0645 \u0625\u063A\u0644\u0627\u0642\u0647\u0627: ${s} \u2705
\u2022 \u062A\u0635\u0627\u0631\u064A\u062D \u0639\u0645\u0644 \u0646\u0634\u0637\u0629 (PTW): ${f} \u{1F4DC}
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4DD} *\u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0648\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629:*
${r}
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u2705 *\u0645\u0639\u062A\u0645\u062F \u0637\u0628\u0642\u0627\u064B \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 ISO 45001*`},w=function(){const e=m(),t=`https://api.whatsapp.com/send?text=${encodeURIComponent(e)}`;window.open(t,"_blank")},S=function(){const e=m(),t=window.open("","_blank");t&&(t.document.write(`
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
                        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        .meta-table td { padding: 8px 12px; border: 1px solid #cbd5e1; font-size: 0.9rem; }
                        .meta-table td b { color: #1e3a8a; }
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
                    <div class="content-box">${I(e)}</div>
                    <div class="sig-grid">
                        <div class="sig-box">
                            <div>\u062A\u0648\u0642\u064A\u0639 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0650\u0645</div>
                            <div class="sig-line"></div>
                        </div>
                        <div class="sig-box">
                            <div>\u062A\u0648\u0642\u064A\u0639 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0650\u0645</div>
                            <div class="sig-line"></div>
                        </div>
                    </div>
                    <script>window.onload = () => { window.print(); };<\/script>
                </body>
                </html>
            `),t.document.close())},I=function(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""},l=null;const u={open:v,close:p,refreshKpis:b,shareViaWhatsApp:w,printHandoverReport:S};window.HseShiftHandover=u,window.HseHandover=u}catch{}}})();
