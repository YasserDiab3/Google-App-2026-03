const UserVersionsAdmin={_data:[],_stats:null,_loading:!1,async open(){if(!(()=>{try{if(typeof Permissions<"u"&&Permissions.isCurrentUserAdmin)return Permissions.isCurrentUserAdmin()}catch{}return(AppState.currentUser?.role||"").toLowerCase()==="admin"})()){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const s=document.createElement("div");s.className="modal-overlay",s.id="user-versions-admin-modal",s.innerHTML=`
            <div class="modal-content" style="max-width: 1200px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header" style="background: linear-gradient(135deg, #0F766E, #1E3A8A); color: #fff;">
                    <h2 class="modal-title" style="color: #fff;">
                        <i class="fas fa-code-branch ml-2"></i>
                        \u0645\u062A\u0627\u0628\u0639\u0629 \u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" title="\u0625\u063A\u0644\u0627\u0642" style="color: #fff;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A -->
                    <div class="flex items-center justify-between flex-wrap gap-2 mb-4">
                        <div class="text-sm text-slate-600">
                            <i class="fas fa-info-circle text-blue-600 ml-1"></i>
                            \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0623\u062D\u062F\u062B \u0627\u0644\u0645\u062A\u0627\u062D: <strong dir="ltr">${Utils.escapeHTML(AppState.appVersion||"-")}</strong>
                        </div>
                        <div class="flex gap-2 flex-wrap">
                            <button id="uva-refresh-btn" class="btn-secondary">
                                <i class="fas fa-sync-alt ml-2"></i>\u062A\u062D\u062F\u064A\u062B
                            </button>
                            <button id="uva-export-btn" class="btn-success">
                                <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                        </div>
                    </div>

                    <!-- \u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A (6 \u0643\u0631\u0648\u062A) -->
                    <div id="uva-stats-container" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-5">
                        <div class="text-center text-slate-400 col-span-full py-6">
                            <i class="fas fa-spinner fa-spin text-2xl"></i>
                            <p class="mt-2 text-sm">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>

                    <!-- \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A -->
                    <div id="uva-version-distribution" class="mb-5"></div>

                    <!-- \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A -->
                    <div id="uva-table-container">
                        <div class="text-center text-slate-400 py-6">
                            <i class="fas fa-spinner fa-spin text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(s),s.querySelector("#uva-refresh-btn")?.addEventListener("click",()=>this.refresh()),s.querySelector("#uva-export-btn")?.addEventListener("click",()=>this.exportToExcel()),s.addEventListener("click",i=>{i.target===s&&s.remove()}),await this.refresh()},async refresh(){if(!this._loading){this._loading=!0;try{typeof GoogleIntegration<"u"&&typeof GoogleIntegration.resetCircuitBreaker=="function"&&GoogleIntegration.resetCircuitBreaker();const s={latestVersion:AppState.appVersion||"",__timeoutMs:45e3};let i=null;try{i=await GoogleIntegration.sendToAppsScript("getUserVersionsDashboard",s)}catch(e){Utils.safeWarn("\u26A0\uFE0F getUserVersionsDashboard \u0641\u0634\u0644 \u2014 \u0645\u062D\u0627\u0648\u0644\u0629 fallback \u0628\u0625\u062C\u0631\u0627\u0621\u064A\u0646 \u0645\u0646\u0641\u0635\u0644\u064A\u0646:",e)}if(i&&i.success)this._data=Array.isArray(i.data)?i.data:[],this._stats=i.stats||null;else{const[e,n]=await Promise.all([GoogleIntegration.sendToAppsScript("getAllUserVersions",s),GoogleIntegration.sendToAppsScript("getUserVersionStats",s)]);if(this._data=e&&e.success&&Array.isArray(e.data)?e.data:[],this._stats=n&&n.success?n:null,i&&i.message&&!e?.success&&!n?.success)throw new Error(i.message)}this._renderStats(),this._renderVersionDistribution(),this._renderTable()}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A:",a),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(a.message||a))}finally{this._loading=!1}}},_renderStats(){const a=document.getElementById("uva-stats-container");if(!a)return;const s=this._stats||{},i=l=>{const p=Number(l),f=Number.isFinite(p)?p:0;return typeof Dashboard<"u"&&typeof Dashboard.formatNumber=="function"?Dashboard.formatNumber(f):String(f)},e=s.totalUsers||0,n=s.latestUsers||0,o=s.outdatedUsers||0,r=s.notReportedUsers||0,t=s.activeLast24h||0,d=s.activeLast7d||0,c=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646",value:i(e),icon:"fa-users",color:"#0F766E",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0639\u0644\u0649 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0623\u062D\u062F\u062B",value:i(n),icon:"fa-circle-check",color:"#047857",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0639\u0644\u0649 \u0625\u0635\u062F\u0627\u0631 \u0642\u062F\u064A\u0645",value:i(o),icon:"fa-triangle-exclamation",color:"#b91c1c",bg:"#fef2f2",border:"#fecaca"},{label:"\u0644\u0645 \u064A\u064F\u0633\u062C\u064E\u0651\u0644 \u0628\u0639\u062F",value:i(r),icon:"fa-user-clock",color:"#b45309",bg:"#fffbeb",border:"#fde68a"},{label:"\u0646\u0634\u0637 \u0622\u062E\u0631 24 \u0633\u0627\u0639\u0629",value:i(t),icon:"fa-bolt",color:"#7c3aed",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0646\u0634\u0637 \u0622\u062E\u0631 7 \u0623\u064A\u0627\u0645",value:i(d),icon:"fa-calendar-week",color:"#1E3A8A",bg:"#eef2ff",border:"#c7d2fe"}];a.innerHTML=c.map(l=>`
            <div class="uva-stat-card" style="background:${l.bg};border:1px solid ${l.border};border-radius:12px;padding:14px;display:flex;align-items:center;gap:10px;overflow:hidden;isolation:isolate;min-width:0;">
                <div style="width:42px;height:42px;background:${l.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="fas ${l.icon}" style="color:#fff;font-size:16px;"></i>
                </div>
                <div style="min-width:0;flex:1;">
                    <div class="uva-stat-card__value" style="font-size:1.5rem;font-weight:800;color:${l.color};line-height:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" dir="ltr">${l.value}</div>
                    <div style="font-size:0.72rem;color:#64748b;margin-top:3px;white-space:nowrap;">${l.label}</div>
                </div>
            </div>
        `).join("")},_renderVersionDistribution(){const a=document.getElementById("uva-version-distribution");if(!a)return;const s=this._stats&&Array.isArray(this._stats.byVersion)?this._stats.byVersion:[];if(s.length===0){a.innerHTML="";return}const i=s.reduce((o,r)=>o+(r.count||0),0)||1,e=AppState.appVersion||"",n=s.map(o=>{const r=Math.round(o.count/i*100),t=o.version===e,d=o.version==="\u0644\u0645 \u064A\u064F\u0633\u062C\u064E\u0651\u0644 \u0628\u0639\u062F";let c,l,p,f;return d?(c="#b45309",l="#fffbeb",p='<span style="background:#b45309;color:#fff;padding:2px 8px;border-radius:10px;font-size:0.65rem;font-weight:700;">\u0644\u0645 \u064A\u0641\u062A\u062D \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0639\u062F</span>',f=`<span style="font-weight:700;color:#1e293b;">\u23F3 ${Utils.escapeHTML(o.version)}</span>`):t?(c="#047857",l="#ecfdf5",p='<span style="background:#047857;color:#fff;padding:2px 8px;border-radius:10px;font-size:0.65rem;font-weight:700;">\u0627\u0644\u0623\u062D\u062F\u062B</span>',f=`<span style="font-family:monospace;font-weight:700;color:#1e293b;" dir="ltr">v${Utils.escapeHTML(o.version)}</span>`):(c="#dc2626",l="#fef2f2",p='<span style="background:#b91c1c;color:#fff;padding:2px 8px;border-radius:10px;font-size:0.65rem;font-weight:700;">\u0642\u062F\u064A\u0645</span>',f=`<span style="font-family:monospace;font-weight:700;color:#1e293b;" dir="ltr">v${Utils.escapeHTML(o.version)}</span>`),`
                <div style="background:${l};border:1px solid #e5e7eb;border-radius:10px;padding:10px 14px;margin-bottom:6px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            ${f}
                            ${p}
                        </div>
                        <div style="font-size:0.85rem;color:#64748b;">
                            <strong style="color:#1e293b;" dir="ltr">${o.count}</strong> \u0645\u0633\u062A\u062E\u062F\u0645
                            <span style="color:#94a3b8;" dir="ltr">(${r}%)</span>
                        </div>
                    </div>
                    <div style="width:100%;height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                        <div style="height:100%;background:${c};width:${r}%;transition:width 0.5s;"></div>
                    </div>
                </div>
            `}).join("");a.innerHTML=`
            <div class="content-card" style="padding:14px 18px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                    <i class="fas fa-chart-bar" style="color:#0F766E;"></i>
                    <strong style="font-size:0.95rem;">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A</strong>
                </div>
                ${n}
            </div>
        `},_renderTable(){const a=document.getElementById("uva-table-container");if(!a)return;if(!this._data||this._data.length===0){a.innerHTML=`
                <div class="empty-state" style="padding:30px;">
                    <i class="fas fa-inbox text-4xl text-gray-300 mb-2"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0628\u0639\u062F. \u0633\u062A\u0638\u0647\u0631 \u0647\u0646\u0627 \u0628\u0645\u062C\u0631\u062F \u0641\u062A\u062D \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0644\u0644\u062A\u0637\u0628\u064A\u0642.</p>
                </div>
            `;return}const s=e=>{if(!e)return"\u2014";try{const n=new Date(e);if(isNaN(n.getTime()))return"\u2014";const o=Date.now()-n.getTime(),r=Math.floor(o/6e4),t=Math.floor(o/36e5),d=Math.floor(o/864e5);return r<1?"\u0627\u0644\u0622\u0646":r<60?`\u0642\u0628\u0644 ${r} \u062F`:t<24?`\u0642\u0628\u0644 ${t} \u0633`:d<7?`\u0642\u0628\u0644 ${d} \u064A\u0648\u0645`:n.toLocaleDateString("ar-EG",{year:"numeric",month:"short",day:"numeric"})}catch{return"\u2014"}},i=this._data.map((e,n)=>{const o=n%2===0?"#fff":"#fafafa",r=e.hasReport!==!1;let t,d;r?e.isOutdated?(t='<span style="background:#fef2f2;color:#b91c1c;padding:2px 8px;border-radius:10px;font-size:0.7rem;font-weight:700;">\u0642\u062F\u064A\u0645</span>',d=`<span style="font-family:monospace;font-weight:700;color:#b91c1c;" dir="ltr">v${Utils.escapeHTML(e.currentVersion||"\u2014")}</span>`):(t='<span style="background:#ecfdf5;color:#047857;padding:2px 8px;border-radius:10px;font-size:0.7rem;font-weight:700;">\u0645\u062D\u062F\u0651\u062B</span>',d=`<span style="font-family:monospace;font-weight:700;color:#047857;" dir="ltr">v${Utils.escapeHTML(e.currentVersion||"\u2014")}</span>`):(t='<span style="background:#fffbeb;color:#b45309;padding:2px 8px;border-radius:10px;font-size:0.7rem;font-weight:700;">\u23F3 \u0644\u0645 \u064A\u064F\u0633\u062C\u064E\u0651\u0644</span>',d='<span style="color:#94a3b8;font-size:0.85rem;">\u2014</span>');const c=e.isMobile?"fa-mobile-screen":e.platform?"fa-desktop":"fa-question-circle",l=e.platform||(r?"\u2014":"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"),p=r?s(e.lastSeenAt):'<span style="color:#94a3b8;">\u0644\u0645 \u064A\u0641\u062A\u062D \u0628\u0639\u062F</span>',f=r?String(e.sessionCount||0):'<span style="color:#94a3b8;">0</span>';return`
                <tr style="border-bottom:1px solid #f1f5f9;background:${o};${r?"":"opacity:0.85;"}">
                    <td style="padding:10px 12px;">
                        <div style="font-weight:700;color:#1e293b;font-size:0.88rem;">${Utils.escapeHTML(e.userName||"\u2014")}</div>
                        <div style="font-size:0.72rem;color:#94a3b8;" dir="ltr">${Utils.escapeHTML(e.userEmail||"")}</div>
                    </td>
                    <td style="padding:10px 12px;font-size:0.82rem;color:#475569;">${Utils.escapeHTML(e.userRole||"\u2014")}</td>
                    <td style="padding:10px 12px;font-size:0.82rem;color:#475569;">${Utils.escapeHTML(e.userDepartment||"\u2014")}</td>
                    <td style="padding:10px 12px;text-align:center;">${d}</td>
                    <td style="padding:10px 12px;text-align:center;">${t}</td>
                    <td style="padding:10px 12px;text-align:center;font-size:0.82rem;color:#475569;" dir="ltr">${p}</td>
                    <td style="padding:10px 12px;text-align:center;font-size:0.82rem;color:#475569;" dir="ltr">${f}</td>
                    <td style="padding:10px 12px;text-align:center;color:#64748b;font-size:0.78rem;">
                        <i class="fas ${c}" title="${Utils.escapeHTML(e.platform||"")}"></i>
                        <span style="margin-inline-start:4px;">${Utils.escapeHTML(l)}</span>
                    </td>
                </tr>
            `}).join("");a.innerHTML=`
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:12px 16px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;">
                    <strong style="font-size:0.95rem;">
                        <i class="fas fa-list-ul" style="color:#0F766E;margin-inline-end:6px;"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                    </strong>
                    <span style="background:#f0fdfa;color:#0F766E;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;" dir="ltr">${this._data.length}</span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead>
                            <tr style="background:#f8fafc;">
                                <th style="padding:10px 12px;text-align:start;font-weight:700;color:#475569;white-space:nowrap;">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th>
                                <th style="padding:10px 12px;text-align:start;font-weight:700;color:#475569;">\u0627\u0644\u062F\u0648\u0631</th>
                                <th style="padding:10px 12px;text-align:start;font-weight:700;color:#475569;">\u0627\u0644\u0642\u0633\u0645</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#475569;">\u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#475569;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#475569;">\u0622\u062E\u0631 \u0645\u0634\u0627\u0647\u062F\u0629</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#475569;">\u062C\u0644\u0633\u0627\u062A</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#475569;">\u0627\u0644\u0645\u0646\u0635\u0629</th>
                            </tr>
                        </thead>
                        <tbody>${i}</tbody>
                    </table>
                </div>
            </div>
        `},exportToExcel(){if(!this._data||this._data.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const a=["\u0627\u0644\u0627\u0633\u0645","\u0627\u0644\u0625\u064A\u0645\u064A\u0644","\u0627\u0644\u062F\u0648\u0631","\u0627\u0644\u0642\u0633\u0645","\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A","\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0623\u0648\u0644","\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0628\u0642","\u0627\u0644\u062D\u0627\u0644\u0629","\u0622\u062E\u0631 \u0645\u0634\u0627\u0647\u062F\u0629","\u0623\u0648\u0644 \u0645\u0634\u0627\u0647\u062F\u0629","\u0639\u062F\u062F \u0627\u0644\u062C\u0644\u0633\u0627\u062A","\u0639\u062F\u062F \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631","\u0627\u0644\u0645\u0646\u0635\u0629","\u062C\u0648\u0627\u0644\u061F","\u0627\u0644\u062D\u062C\u0645","\u0627\u0644\u0644\u063A\u0629"],s=this._data.map(t=>{const c=t.hasReport!==!1?t.isOutdated?"\u0642\u062F\u064A\u0645":"\u0645\u062D\u062F\u0651\u062B":"\u0644\u0645 \u064A\u064F\u0633\u062C\u064E\u0651\u0644";return[t.userName||"",t.userEmail||"",t.userRole||"",t.userDepartment||"",t.currentVersion||"",t.firstSeenVersion||"",t.previousVersion||"",c,t.lastSeenAt||"",t.firstSeenAt||"",t.sessionCount||0,t.reportCount||0,t.platform||"",t.isMobile?"\u0646\u0639\u0645":"\u0644\u0627",t.screenSize||"",t.language||""]}),i="\uFEFF"+[a,...s].map(t=>t.map(d=>{const c=String(d??"").replace(/"/g,'""');return/[,;"\n]/.test(c)?`"${c}"`:c}).join(",")).join(`
`),e=new Blob([i],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(e),o=document.createElement("a"),r=new Date().toISOString().slice(0,19).replace(/:/g,"-");o.href=n,o.download=`user-versions-${r}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(n),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}};typeof window<"u"&&(window.UserVersionsAdmin=UserVersionsAdmin);
