(()=>{"use strict";if(!(typeof window>"u")&&!window.HseMyTasksInitialized){window.HseMyTasksInitialized=!0;try{let w=function(){try{const e=sessionStorage.getItem("HSE_FIELD_SESSION")||localStorage.getItem("HSE_LAST_USER_NAME");if(e){let t=null;try{t=JSON.parse(e)}catch{}return t&&(t.userName||t.name)||(typeof e=="string"&&!e.startsWith("{")?e:"")}}catch{}return""},h=function(){const e=new Map;try{const t=localStorage.getItem("HSE_PUBLIC_OBS_LOCAL_HISTORY");if(t){const o=JSON.parse(t);Array.isArray(o)&&o.forEach(s=>{const n=s.refCode||s.data&&s.data.instantRefCode||s.id;if(!n)return;const r=s.data||s,c=!!(s.status&&(s.status.includes("Closed")||s.status.includes("\u0645\u063A\u0644\u0642"))),p=r.site||r.siteName||"\u0645\u0635\u0646\u0639 ICAPP",a=r.place||r.locationName||"\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A",i=r.riskLevel||r.risk||"\u0645\u062A\u0648\u0633\u0637",l=r.details||r.description||"",g=r.observerName||s.observerName||w()||"\u0641\u0646\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629";e.set(n.toUpperCase(),{id:n,refCode:n,timestamp:s.timestamp||Date.now(),site:p,place:a,riskLevel:i,details:l,observerName:g,isClosed:c,isMine:!0,source:"local",raw:r})})}}catch{}try{const t=window.rawObservationsAnalyticsData&&window.rawObservationsAnalyticsData.criticalOpen||[],o=w().trim().toLowerCase();t.forEach(s=>{const n=s.isoCode||s.id||s.refCode;if(!n)return;const r=String(n).toUpperCase().trim(),c=String(s.observerName||"").trim(),p=s.status==="Closed"||s.status==="\u0645\u063A\u0644\u0642"||String(s.status).includes("\u0645\u063A\u0644\u0642"),a=o&&c.toLowerCase().includes(o);if(!e.has(r))e.set(r,{id:r,refCode:r,timestamp:s.date?new Date(s.date).getTime():Date.now(),site:s.site||s.siteName||"\u0645\u0635\u0646\u0639 ICAPP",place:s.place||s.locationName||"\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645",riskLevel:s.riskLevel||"\u0645\u062A\u0648\u0633\u0637",details:s.details||"",observerName:c||"\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",isClosed:p,isMine:!!a,source:"server",raw:s});else{const i=e.get(r);p&&!i.isClosed&&(i.isClosed=!0)}})}catch{}return Array.from(e.values()).sort((t,o)=>o.timestamp-t.timestamp)},u=function(){const e=h(),t=e.filter(n=>!n.isClosed&&n.isMine).length,o=e.filter(n=>!n.isClosed).length;document.querySelectorAll("#badgeMyTasksCount, .badge-my-tasks").forEach(n=>{t>0?(n.textContent=t,n.style.display="inline-flex",n.style.background="#ef4444",n.title=`${t} \u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0641\u062A\u0648\u062D\u0629 \u0645\u0633\u062C\u0644\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632`):o>0?(n.textContent=o,n.style.display="inline-flex",n.style.background="#f59e0b",n.title=`${o} \u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0641\u062A\u0648\u062D\u0629 \u0641\u064A \u0627\u0644\u0648\u0631\u062F\u064A\u0629`):n.style.display="none"})},C=function(){if(document.getElementById("hseMyTasksModal"))return document.getElementById("hseMyTasksModal");const e=document.createElement("div");e.id="hseMyTasksModal",e.className="emergency-modal-overlay",e.style.display="none",e.innerHTML=`
                <div class="emergency-modal-dialog" style="max-width: 680px; animation: fadeInModal 0.25s ease;" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #0284c7, #0369a1); color: #ffffff; padding: 16px 20px; border-radius: 16px 16px 0 0; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.15rem;">
                                <i class="fas fa-list-check"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800;">\u0644\u0648\u062D\u0629 \u0645\u0647\u0627\u0645\u064A \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u064A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629</h3>
                                <p style="margin: 2px 0 0; font-size: 0.75rem; opacity: 0.9;">\u0645\u062A\u0627\u0628\u0639\u0629 \u0648\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 \u0648\u0625\u063A\u0644\u0627\u0642\u0647\u0627 \u0628\u0635\u0648\u0631 \u0627\u0644\u0625\u062B\u0628\u0627\u062A (ISO 45001)</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <button type="button" id="btnRefreshMyTasks" onclick="HseMyTasks.refresh()" style="height: 36px; padding: 0 12px; color: #ffffff; border: 1px solid rgba(255,255,255,0.35); background: rgba(255,255,255,0.18); border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 800; outline: none; transition: all 0.2s ease;" title="\u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A">
                                <i class="fas fa-rotate"></i>
                                <span>\u062A\u062D\u062F\u064A\u062B</span>
                            </button>
                            <button type="button" class="emergency-modal-close-btn" id="btnCloseMyTasksModal" style="width: 36px; height: 36px; min-width: 36px; min-height: 36px; color: #ffffff; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.2); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; padding: 0; outline: none; transition: background 0.2s ease;" title="\u0625\u063A\u0644\u0627\u0642">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Body -->
                    <div style="padding: 18px 20px; max-height: 75vh; overflow-y: auto; text-align: right; direction: rtl;">
                        <!-- KPI Badges Strip -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; text-align: center;">
                            <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 10px; padding: 10px;">
                                <div style="font-size: 1.25rem; font-weight: 900; color: #1e40af;" id="myTasksKpiTotal">0</div>
                                <div style="font-size: 0.72rem; color: #1e3a8a; font-weight: 700;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062C\u0644 \u0627\u0644\u064A\u0648\u0645</div>
                            </div>
                            <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 10px; padding: 10px;">
                                <div style="font-size: 1.25rem; font-weight: 900; color: #dc2626;" id="myTasksKpiOpen">0</div>
                                <div style="font-size: 0.72rem; color: #991b1b; font-weight: 700;">\u0645\u0641\u062A\u0648\u062D\u0629 \u0642\u064A\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D \u23F3</div>
                            </div>
                            <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 10px; padding: 10px;">
                                <div style="font-size: 1.25rem; font-weight: 900; color: #166534;" id="myTasksKpiClosed">0</div>
                                <div style="font-size: 0.72rem; color: #14532d; font-weight: 700;">\u062A\u0645 \u0625\u063A\u0644\u0627\u0642\u0647\u0627 \u0628\u0646\u062C\u0627\u062D \u2705</div>
                            </div>
                        </div>

                        <!-- Filter Tabs & Search -->
                        <div style="margin-bottom: 14px; display: flex; flex-direction: column; gap: 10px;">
                            <div style="display: flex; gap: 6px; background: #f1f5f9; padding: 4px; border-radius: 10px;">
                                <button type="button" class="my-tasks-tab-btn active" data-tab="mine" onclick="HseMyTasks.setFilter('mine')"
                                        style="flex: 1; padding: 8px 12px; border: none; border-radius: 8px; font-weight: 800; font-size: 0.8rem; cursor: pointer; background: #ffffff; color: #0284c7; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
                                    \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u064A \u0627\u0644\u0645\u0633\u062C\u0644\u0629
                                </button>
                                <button type="button" class="my-tasks-tab-btn" data-tab="all" onclick="HseMyTasks.setFilter('all')"
                                        style="flex: 1; padding: 8px 12px; border: none; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; background: transparent; color: #64748b;">
                                    \u0643\u0627\u0641\u0629 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0648\u0631\u062F\u064A\u0629
                                </button>
                                <button type="button" class="my-tasks-tab-btn" data-tab="closed" onclick="HseMyTasks.setFilter('closed')"
                                        style="flex: 1; padding: 8px 12px; border: none; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; background: transparent; color: #64748b;">
                                    \u0627\u0644\u0645\u063A\u0644\u0642\u0629 \u062D\u062F\u064A\u062B\u0627\u064B \u2705
                                </button>
                            </div>

                            <div style="position: relative;">
                                <i class="fas fa-magnifying-glass" style="position: absolute; right: 12px; top: 12px; color: #94a3b8; font-size: 0.85rem;"></i>
                                <input type="text" id="myTasksSearchInput" placeholder="\u0628\u062D\u062B \u0628\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639\u060C \u0627\u0644\u0639\u0646\u0628\u0631\u060C \u0623\u0648 \u0643\u0648\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629..."
                                       oninput="HseMyTasks.handleSearch(this.value)"
                                       style="width: 100%; padding: 9px 36px 9px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.82rem; outline: none; box-sizing: border-box;" />
                            </div>
                        </div>

                        <!-- Cards Container -->
                        <div id="myTasksListContainer" style="display: flex; flex-direction: column; gap: 10px;">
                            <!-- Rendered dynamically -->
                        </div>
                    </div>
                </div>
            `,document.body.appendChild(e),d=e,e.onclick=o=>{o.target===e&&y()};const t=e.querySelector("#btnCloseMyTasksModal");return t&&(t.onclick=y),e},b=function(){const e=document.getElementById("myTasksListContainer");if(!e)return;const t=h(),o=t.length,s=t.filter(i=>!i.isClosed).length,n=t.filter(i=>i.isClosed).length,r=document.getElementById("myTasksKpiTotal"),c=document.getElementById("myTasksKpiOpen"),p=document.getElementById("myTasksKpiClosed");r&&(r.textContent=o),c&&(c.textContent=s),p&&(p.textContent=n);let a=t;if(f==="mine"?(a=t.filter(i=>!i.isClosed&&i.isMine),a.length===0&&s>0&&(a=t.filter(i=>!i.isClosed))):f==="all"?a=t.filter(i=>!i.isClosed):f==="closed"&&(a=t.filter(i=>i.isClosed)),x){const i=x.toLowerCase();a=a.filter(l=>l.refCode.toLowerCase().includes(i)||l.site.toLowerCase().includes(i)||l.place.toLowerCase().includes(i)||l.details.toLowerCase().includes(i))}if(a.length===0){e.innerHTML=`
                    <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 12px; padding: 28px 16px; text-align: center; color: #64748b;">
                        <i class="fas fa-clipboard-check fa-3x" style="color: #10b981; margin-bottom: 10px;"></i>
                        <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b; margin-bottom: 4px;">
                            ${f==="closed"?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u063A\u0644\u0642\u0629 \u0645\u0633\u062C\u0644\u0629 \u0627\u0644\u064A\u0648\u0645.":"\u0645\u0645\u062A\u0627\u0632! \u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629 \u0645\u0639\u0644\u0642\u0629."}
                        </div>
                        <div style="font-size: 0.78rem; color: #64748b;">
                            ${f==="closed"?"\u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0629 \u062A\u0642\u0648\u0645 \u0628\u0625\u063A\u0644\u0627\u0642\u0647\u0627 \u0633\u062A\u0638\u0647\u0631 \u0647\u0646\u0627 \u0645\u0639 \u0625\u062B\u0628\u0627\u062A \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629.":"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u0635\u0648\u062F\u0629 \u062A\u0645\u062A \u0645\u0639\u0627\u0644\u062C\u062A\u0647\u0627 \u0648\u0625\u063A\u0644\u0627\u0642\u0647\u0627 \u0645\u064A\u062F\u0627\u0646\u064A\u0627\u064B \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0645\u0639\u0627\u064A\u064A\u0631."}
                        </div>
                    </div>
                `;return}e.innerHTML=a.map(i=>{const l=i.isClosed,g=i.riskLevel||"\u0645\u062A\u0648\u0633\u0637";let v='<span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:12px; font-weight:800; font-size:0.72rem;">\u{1F7E1} \u0645\u062A\u0648\u0633\u0637</span>';g.includes("\u0639\u0627\u0644\u064A")||g.includes("high")?v='<span style="background:#fee2e2; color:#b91c1c; padding:2px 8px; border-radius:12px; font-weight:800; font-size:0.72rem;">\u{1F534} \u0639\u0627\u0644\u064A \u0627\u0644\u062E\u0637\u0648\u0631\u0629</span>':(g.includes("\u0645\u0646\u062E\u0641\u0636")||g.includes("low"))&&(v='<span style="background:#f0fdf4; color:#15803d; padding:2px 8px; border-radius:12px; font-weight:800; font-size:0.72rem;">\u{1F7E2} \u0645\u0646\u062E\u0641\u0636</span>');const L=new Date(i.timestamp).toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"});return`
                    <div style="background: #ffffff; border: 1.5px solid ${l?"#bbf7d0":"#e2e8f0"}; border-radius: 12px; padding: 12px 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: transform 0.15s ease;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 0.95rem; font-weight: 900; color: #0284c7;">${m(i.refCode)}</span>
                                ${v}
                                ${i.isMine?'<span style="background:#e0e7ff; color:#3730a3; padding:1px 6px; border-radius:6px; font-size:0.68rem; font-weight:700;">\u0645\u0644\u0627\u062D\u0638\u062A\u064A</span>':""}
                            </div>
                            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 600;">\u{1F552} ${L}</span>
                        </div>

                        <div style="font-size: 0.8rem; font-weight: 800; color: #334155; margin-bottom: 4px;">
                            \u{1F4CD} ${m(i.site)} \u2014 ${m(i.place)}
                        </div>

                        ${i.details?`
                        <div style="font-size: 0.78rem; color: #64748b; line-height: 1.4; margin-bottom: 10px; background: #f8fafc; padding: 6px 10px; border-radius: 8px; border-right: 3px solid #0284c7;">
                            ${m(i.details)}
                        </div>`:""}

                        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px dashed #e2e8f0; flex-wrap: wrap; gap: 8px;">
                            <span style="font-size: 0.72rem; color: #64748b;">
                                <i class="fas fa-user-shield"></i> \u0627\u0644\u0631\u0627\u0635\u062F: <b>${m(i.observerName)}</b>
                            </span>

                            ${l?`
                            <span style="background: #f0fdf4; color: #166534; padding: 4px 10px; border-radius: 20px; font-size: 0.74rem; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
                                <i class="fas fa-check-circle"></i> \u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642
                            </span>`:`
                            <button type="button" onclick="HseMyTasks.triggerClosure('${i.id}')"
                                    style="background: linear-gradient(135deg, #059669, #047857); color: #ffffff; border: none; padding: 7px 14px; border-radius: 8px; font-weight: 800; font-size: 0.78rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(5,150,105,0.2);">
                                <i class="fas fa-camera"></i>
                                <span>\u0625\u063A\u0644\u0627\u0642 \u0648\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0622\u0646 \u{1F512}</span>
                            </button>`}
                        </div>
                    </div>
                `}).join("")},T=function(e){f=e,d&&d.querySelectorAll(".my-tasks-tab-btn").forEach(o=>{o.getAttribute("data-tab")===e?(o.style.background="#ffffff",o.style.color="#0284c7",o.style.fontWeight="800",o.style.boxShadow="0 1px 3px rgba(0,0,0,0.06)"):(o.style.background="transparent",o.style.color="#64748b",o.style.fontWeight="700",o.style.boxShadow="none")}),b()},M=function(e){x=String(e||"").trim(),b()},S=function(){const e=C();x="";const t=e.querySelector("#myTasksSearchInput");t&&(t.value=""),b(),u(),e.style.display="flex",document.body.style.overflow="hidden"},y=function(){d&&(d.style.display="none",document.body.style.overflow="")},z=function(e){const o=h().find(s=>s.id===e||s.refCode===e);o&&window.HseActionClosure&&typeof window.HseActionClosure.open=="function"?(y(),window.HseActionClosure.open(e,o.raw)):window.HseActionClosure?(y(),window.HseActionClosure.open(e)):alert(`\u0643\u0648\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629: ${e}`)},m=function(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""},d=null,f="mine",x="";document.readyState==="loading"?document.addEventListener("DOMContentLoaded",u):setTimeout(u,500);const k={open:S,close:y,setFilter:T,handleSearch:M,refresh:()=>{const e=document.getElementById("btnRefreshMyTasks");if(e){const t=e.querySelector("i");t&&t.classList.add("fa-spin"),setTimeout(()=>{t&&t.classList.remove("fa-spin")},600)}u(),d&&d.style.display==="flex"&&b()},triggerClosure:z,updateBadgeCount:u};window.HseMyTasks=k,window.HseTasks=k}catch{}}})();
