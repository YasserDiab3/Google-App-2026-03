const ClientErrorsAdmin={_data:[],_stats:null,_loading:!1,_pollTimer:null,_live:!1,_knownIds:new Set,_filters:{level:"",status:"new",q:"",limit:150},_rootId:null,_isAdmin(){try{if(typeof Permissions<"u"&&Permissions.isCurrentUserAdmin)return Permissions.isCurrentUserAdmin()}catch{}return String(AppState.currentUser?.role||"").toLowerCase()==="admin"},_esc(t){return typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(t??"")):String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])},_fmtTime(t){try{if(!t)return"\u2014";const e=new Date(t);return isNaN(e.getTime())?String(t):e.toLocaleString("ar-EG",{hour12:!1})}catch{return String(t||"\u2014")}},_levelBadge(t){const e=String(t||"error").toLowerCase(),s={error:{bg:"#fef2f2",color:"#b91c1c",label:"\u062E\u0637\u0623"},warning:{bg:"#fffbeb",color:"#b45309",label:"\u062A\u0646\u0628\u064A\u0647"},unhandled:{bg:"#f5f3ff",color:"#6d28d9",label:"\u063A\u064A\u0631 \u0645\u0639\u0627\u0644\u062C"},info:{bg:"#eff6ff",color:"#1d4ed8",label:"\u0645\u0639\u0644\u0648\u0645\u0629"}},i=s[e]||s.error;return`<span style="background:${i.bg};color:${i.color};border-radius:999px;padding:2px 8px;font-size:11px;font-weight:700;">${i.label}</span>`},_statusBadge(t){const e=String(t||"new").toLowerCase(),s={new:{bg:"#ecfeff",color:"#0e7490",label:"\u062C\u062F\u064A\u062F"},seen:{bg:"#f1f5f9",color:"#475569",label:"\u062A\u0645\u062A \u0627\u0644\u0645\u0634\u0627\u0647\u062F\u0629"},ignored:{bg:"#f8fafc",color:"#64748b",label:"\u0645\u062A\u062C\u0627\u0647\u0644"},resolved:{bg:"#ecfdf5",color:"#047857",label:"\u0645\u062D\u0644\u0648\u0644"}},i=s[e]||s.new;return`<span style="background:${i.bg};color:${i.color};border-radius:999px;padding:2px 8px;font-size:11px;font-weight:600;">${i.label}</span>`},async open(){if(!this._isAdmin()){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=document.getElementById("client-errors-admin-modal");t&&t.remove();const e=document.createElement("div");e.className="modal-overlay",e.id="client-errors-admin-modal",e.innerHTML=`
            <div class="modal-content" style="max-width: 1180px; max-height: 92vh; overflow-y: auto;">
                <div class="modal-header" style="background: linear-gradient(135deg, #b91c1c, #7f1d1d); color: #fff;">
                    <h2 class="modal-title" style="color:#fff;">
                        <i class="fas fa-bug ml-2"></i>
                        \u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color:#fff;" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="cea-modal-body"></div>
            </div>
        `,document.body.appendChild(e),e.addEventListener("click",s=>{s.target===e&&(this.stopLive(),e.remove())}),e.querySelector(".modal-close")?.addEventListener("click",()=>this.stopLive()),this.mount(e.querySelector("#cea-modal-body"),{liveDefault:!0})},async load(){if(!this._isAdmin()){const e=document.getElementById("client-errors-section");e&&(e.innerHTML='<div class="p-6 text-slate-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637.</div>');return}const t=document.getElementById("client-errors-section");t&&(t.innerHTML='<div id="cea-section-root" class="p-4"></div>',this.mount(t.querySelector("#cea-section-root"),{liveDefault:!0}))},mount(t,e={}){t&&(this._rootId=t.id||"cea-root-"+Date.now(),t.id||(t.id=this._rootId),t.innerHTML=this._shellHtml(!!e.liveDefault),this._bindShell(t),this.refresh(),e.liveDefault&&this.startLive())},_shellHtml(t){return`
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div class="text-sm text-slate-600">
                    <i class="fas fa-satellite-dish text-red-600 ml-1"></i>
                    \u0645\u0631\u0627\u0642\u0628\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0644\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062E\u0637\u0623 \u0627\u0644\u0638\u0627\u0647\u0631\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                    <span id="cea-live-indicator" class="mr-2" style="font-weight:700;color:${t?"#047857":"#64748b"};">
                        ${t?"\u25CF \u0645\u0628\u0627\u0634\u0631":"\u25CB \u0645\u062A\u0648\u0642\u0641"}
                    </span>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button type="button" id="cea-refresh-btn" class="btn-secondary"><i class="fas fa-sync-alt ml-2"></i>\u062A\u062D\u062F\u064A\u062B</button>
                    <button type="button" id="cea-live-btn" class="btn-primary" style="background:linear-gradient(135deg,#b91c1c,#7f1d1d);">
                        <i class="fas fa-broadcast-tower ml-2"></i>${t?"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0645\u0628\u0627\u0634\u0631":"\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631"}
                    </button>
                    <button type="button" id="cea-export-btn" class="btn-success"><i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631</button>
                </div>
            </div>

            <div id="cea-stats" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"></div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                <input id="cea-q" class="form-input" placeholder="\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0631\u0633\u0627\u0644\u0629 / \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645..." value="${this._esc(this._filters.q)}" />
                <select id="cea-level" class="form-input">
                    <option value="">\u0643\u0644 \u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A</option>
                    <option value="error" ${this._filters.level==="error"?"selected":""}>\u062E\u0637\u0623</option>
                    <option value="warning" ${this._filters.level==="warning"?"selected":""}>\u062A\u0646\u0628\u064A\u0647</option>
                    <option value="unhandled" ${this._filters.level==="unhandled"?"selected":""}>\u063A\u064A\u0631 \u0645\u0639\u0627\u0644\u062C</option>
                </select>
                <select id="cea-status" class="form-input">
                    <option value="">\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                    <option value="new" ${this._filters.status==="new"?"selected":""}>\u062C\u062F\u064A\u062F</option>
                    <option value="seen" ${this._filters.status==="seen"?"selected":""}>\u062A\u0645\u062A \u0627\u0644\u0645\u0634\u0627\u0647\u062F\u0629</option>
                    <option value="ignored" ${this._filters.status==="ignored"?"selected":""}>\u0645\u062A\u062C\u0627\u0647\u0644</option>
                    <option value="resolved" ${this._filters.status==="resolved"?"selected":""}>\u0645\u062D\u0644\u0648\u0644</option>
                </select>
                <button type="button" id="cea-apply-filters" class="btn-secondary"><i class="fas fa-filter ml-2"></i>\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u062A\u0631</button>
            </div>

            <div id="cea-table" class="overflow-x-auto"></div>
        `},_bindShell(t){t.querySelector("#cea-refresh-btn")?.addEventListener("click",()=>this.refresh()),t.querySelector("#cea-live-btn")?.addEventListener("click",()=>{this._live?this.stopLive():this.startLive();const e=t.querySelector("#cea-live-btn"),s=t.querySelector("#cea-live-indicator");e&&(e.innerHTML=`<i class="fas fa-broadcast-tower ml-2"></i>${this._live?"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0645\u0628\u0627\u0634\u0631":"\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631"}`),s&&(s.style.color=this._live?"#047857":"#64748b",s.textContent=this._live?"\u25CF \u0645\u0628\u0627\u0634\u0631":"\u25CB \u0645\u062A\u0648\u0642\u0641")}),t.querySelector("#cea-export-btn")?.addEventListener("click",()=>this.exportToExcel()),t.querySelector("#cea-apply-filters")?.addEventListener("click",()=>{this._filters.q=t.querySelector("#cea-q")?.value?.trim()||"",this._filters.level=t.querySelector("#cea-level")?.value||"",this._filters.status=t.querySelector("#cea-status")?.value||"",this.refresh()}),t.addEventListener("click",e=>{const s=e.target.closest("[data-cea-action]");if(!s)return;const i=s.getAttribute("data-id"),a=s.getAttribute("data-cea-action");a==="status"&&this.setStatus(i,s.getAttribute("data-status")),a==="report"&&this.reportIssue(i),a==="detail"&&this.showDetail(i)})},startLive(){this.stopLive(),this._live=!0,this._pollTimer=setInterval(()=>{document.visibilityState!=="hidden"&&this.refresh({silent:!0})},12e3)},stopLive(){this._live=!1,this._pollTimer&&(clearInterval(this._pollTimer),this._pollTimer=null)},async refresh(t={}){if(!this._loading){this._loading=!0;try{typeof GoogleIntegration<"u"&&GoogleIntegration.resetCircuitBreaker&&GoogleIntegration.resetCircuitBreaker();const e={...this._filters,__timeoutMs:45e3},[s,i]=await Promise.all([GoogleIntegration.sendToAppsScript("getAllClientErrorLogs",{filters:e,__timeoutMs:45e3}),GoogleIntegration.sendToAppsScript("getClientErrorStats",{filters:{},__timeoutMs:45e3})]),a=s&&s.success&&Array.isArray(s.data)?s.data:[];let l=0;a.forEach(r=>{r.id&&!this._knownIds.has(r.id)&&(this._knownIds.size>0&&(l+=1),this._knownIds.add(r.id))}),this._data=a,this._stats=i&&i.success?i:null,this._renderStats(),this._renderTable(l),!t.silent&&s&&s.success===!1&&Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u0623\u062E\u0637\u0627\u0621: "+(s.message||""))}catch(e){t.silent||Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u0623\u062E\u0637\u0627\u0621: "+(e.message||e))}finally{this._loading=!1}}},_renderStats(){const t=document.getElementById(this._rootId),e=t&&t.querySelector("#cea-stats");if(!e)return;const s=this._stats||{},i=s.byLevel||{},a=s.byStatus||{},l=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",value:s.total||0,color:"#0f766e",bg:"#f0fdfa"},{label:"\u0622\u062E\u0631 24 \u0633\u0627\u0639\u0629",value:s.last24h||0,color:"#b91c1c",bg:"#fef2f2"},{label:"\u062C\u062F\u064A\u062F",value:a.new||0,color:"#0e7490",bg:"#ecfeff"},{label:"\u0623\u062E\u0637\u0627\u0621",value:i.error||0,color:"#7f1d1d",bg:"#fff1f2"}];e.innerHTML=l.map(r=>`
            <div style="background:${r.bg};border:1px solid rgba(0,0,0,0.06);border-radius:12px;padding:12px;">
                <div style="font-size:1.4rem;font-weight:800;color:${r.color};" dir="ltr">${r.value}</div>
                <div style="font-size:0.75rem;color:#64748b;">${r.label}</div>
            </div>
        `).join("")},_renderTable(t){const e=document.getElementById(this._rootId),s=e&&e.querySelector("#cea-table");if(!s)return;if(!this._data.length){s.innerHTML='<div class="text-center text-slate-500 py-10">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062E\u0637\u0627\u0621 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u062A\u0631 \u062D\u0627\u0644\u064A\u0627\u064B.</div>';return}const i=t>0?`<div class="mb-3 p-2 rounded" style="background:#fef2f2;color:#b91c1c;font-weight:700;">\u0648\u0631\u062F ${t} \u062E\u0637\u0623 \u062C\u062F\u064A\u062F</div>`:"";s.innerHTML=i+`
            <table class="w-full text-sm" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f8fafc;text-align:right;">
                        <th class="p-2">\u0627\u0644\u0648\u0642\u062A</th>
                        <th class="p-2">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</th>
                        <th class="p-2">\u0627\u0644\u0631\u0633\u0627\u0644\u0629</th>
                        <th class="p-2">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th>
                        <th class="p-2">\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</th>
                        <th class="p-2">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        <th class="p-2">\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                    </tr>
                </thead>
                <tbody>
                    ${this._data.map(a=>`
                        <tr style="border-top:1px solid #e2e8f0;vertical-align:top;">
                            <td class="p-2 whitespace-nowrap" dir="ltr">${this._esc(this._fmtTime(a.createdAt))}</td>
                            <td class="p-2">${this._levelBadge(a.level)}</td>
                            <td class="p-2" style="max-width:340px;">
                                <div style="font-weight:600;">${this._esc(String(a.message||"").slice(0,160))}</div>
                                <div class="text-xs text-slate-500" dir="ltr">${this._esc(String(a.appVersion||""))} \xB7 ${this._esc(String(a.source||"").slice(0,60))}</div>
                            </td>
                            <td class="p-2">
                                <div>${this._esc(a.username||"\u2014")}</div>
                                <div class="text-xs text-slate-500" dir="ltr">${this._esc(a.userEmail||"")}</div>
                            </td>
                            <td class="p-2">${this._esc(a.module||"\u2014")}</td>
                            <td class="p-2">${this._statusBadge(a.status)}</td>
                            <td class="p-2 whitespace-nowrap">
                                <button type="button" class="btn-secondary text-xs mb-1" data-cea-action="detail" data-id="${this._esc(a.id)}">\u062A\u0641\u0627\u0635\u064A\u0644</button>
                                <button type="button" class="btn-secondary text-xs mb-1" data-cea-action="status" data-status="seen" data-id="${this._esc(a.id)}">\u0645\u0634\u0627\u0647\u062F\u0629</button>
                                <button type="button" class="btn-secondary text-xs mb-1" data-cea-action="status" data-status="resolved" data-id="${this._esc(a.id)}">\u062D\u0644</button>
                                <button type="button" class="btn-primary text-xs mb-1" data-cea-action="report" data-id="${this._esc(a.id)}">\u0625\u0628\u0644\u0627\u063A</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `},showDetail(t){const e=this._data.find(i=>String(i.id)===String(t));if(!e)return;const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width:720px;">
                <div class="modal-header"><h3 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062E\u0637\u0623</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body text-sm" style="white-space:pre-wrap;direction:ltr;text-align:left;">
${this._esc(JSON.stringify(e,null,2))}
                </div>
            </div>`,document.body.appendChild(s),s.addEventListener("click",i=>{i.target===s&&s.remove()})},async setStatus(t,e){try{const s=await GoogleIntegration.sendToAppsScript("updateClientErrorStatus",{id:t,status:e,__timeoutMs:3e4});s&&s.success?(Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629"),this.refresh({silent:!0})):Notification.error(s?.message||"\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629")}catch(s){Notification.error(s.message||"\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629")}},async reportIssue(t){const e=this._data.find(s=>String(s.id)===String(t));if(e)try{const s=("\u062E\u0637\u0623 \u0648\u0627\u062C\u0647\u0629: "+String(e.message||"").slice(0,80)).trim(),i=["\u0628\u0644\u0627\u063A \u062A\u0644\u0642\u0627\u0626\u064A \u0645\u0646 \u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u0627\u0621","Error ID: "+(e.id||""),"Level: "+(e.level||""),"Module: "+(e.module||""),"User: "+(e.username||"")+" <"+(e.userEmail||"")+">","Version: "+(e.appVersion||""),"Source: "+(e.source||""),"URL: "+(e.pageUrl||""),"","Message:",e.message||"","","Stack:",e.stack||"\u2014"].join(`
`),a={title:s,description:i,category:"technical",priority:String(e.level).toLowerCase()==="warning"?"Medium":"High",status:"New",module:e.module||"client-errors",reportedBy:AppState.currentUser?.email||"",sourceErrorId:e.id||"",__timeoutMs:45e3},l=await GoogleIntegration.sendToAppsScript("addIssue",a);l&&l.success?(await this.setStatus(t,"seen"),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0628\u0644\u0627\u063A \u0645\u0634\u0643\u0644\u0629 \u0645\u0646 \u0627\u0644\u062E\u0637\u0623")):Notification.error(l?.message||"\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0628\u0644\u0627\u063A")}catch(s){Notification.error(s.message||"\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0628\u0644\u0627\u063A")}},exportToExcel(){try{if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629");return}const t=this._data.map(i=>({id:i.id,createdAt:i.createdAt,level:i.level,status:i.status,message:i.message,module:i.module,username:i.username,userEmail:i.userEmail,appVersion:i.appVersion,source:i.source,pageUrl:i.pageUrl,fingerprint:i.fingerprint})),e=XLSX.utils.json_to_sheet(t),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,e,"ClientErrors"),XLSX.writeFile(s,"client-errors-"+new Date().toISOString().slice(0,10)+".xlsx"),Notification.success("\u062A\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")}catch(t){Notification.error(t.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")}}};typeof window<"u"&&(window.ClientErrorsAdmin=ClientErrorsAdmin);
